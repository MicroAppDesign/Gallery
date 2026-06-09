#!/usr/bin/env python3
import json
import os
import sys
import urllib.error
import urllib.parse
import urllib.request

ORG_NAME = "MicroAppDesign"
OUTPUT_PATH = os.path.join("assets", "cards", "projects.md")
PER_PAGE = 100


def build_request(url: str, token: str | None = None) -> urllib.request.Request:
    headers = {
        "Accept": "application/vnd.github+json",
        "User-Agent": "GitGallery-Repo-Fetcher/1.0",
    }
    if token:
        headers["Authorization"] = f"Bearer {token}"
    return urllib.request.Request(url, headers=headers)


def fetch_page(url: str, token: str | None = None) -> tuple[list[dict], str | None]:
    request = build_request(url, token)
    with urllib.request.urlopen(request, timeout=30) as response:
        raw = response.read().decode("utf-8")
        data = json.loads(raw)
        link_header = response.getheader("Link")
        next_url = None
        if link_header:
            for part in link_header.split(","):
                section = part.strip().split(";")
                if len(section) < 2:
                    continue
                url_part = section[0].strip()
                rel_part = section[1].strip()
                if rel_part == 'rel="next"':
                    next_url = url_part.strip("<>")
                    break
        return data, next_url


def slugify(text: str) -> str:
    return "-".join(
        part for part in text.lower().replace(" ", "-").split("-") if part
    )


def escape_value(value: str) -> str:
    lines = value.strip().splitlines() if value else [""]
    escaped = []
    for line in lines:
        escaped_line = line.replace("\n", " ").replace("\r", " ")
        escaped.append(escaped_line)
    return "\n".join(escaped)


def format_markdown_entry(repo: dict) -> str:
    name = repo.get("name") or "Unnamed Repo"
    description = repo.get("description") or "ไม่มีคำอธิบายสำหรับโครงการนี้"
    language = repo.get("language") or "Unknown"
    html_url = repo.get("html_url") or "#"

    body = ["---"]
    body.append(f"name: {name}")

    description_lines = escape_value(description).splitlines() or [""]
    body.append(f"description: {description_lines[0]}")
    for line in description_lines[1:]:
        body.append(f"  {line}")

    body.append(f"language: {language}")
    body.append(f"html_url: {html_url}")
    return "\n".join(body)


def fetch_all_repos(token: str | None = None) -> list[dict]:
    repos = []
    org_url = (
        f"https://api.github.com/orgs/{urllib.parse.quote(ORG_NAME)}/repos"
        f"?per_page={PER_PAGE}&type=public&sort=updated"
    )
    user_url = (
        f"https://api.github.com/users/{urllib.parse.quote(ORG_NAME)}/repos"
        f"?per_page={PER_PAGE}&type=public&sort=updated"
    )

    for url in (org_url, user_url):
        try:
            next_url = url
            while next_url:
                print(f"Fetching: {next_url}")
                page_repos, next_url = fetch_page(next_url, token)
                if not isinstance(page_repos, list):
                    raise ValueError("Unexpected GitHub API response format")
                repos.extend(page_repos)
            if repos:
                return repos
        except urllib.error.HTTPError as err:
            if err.code == 404:
                continue
            raise

    raise ValueError(f"Could not find repositories for '{ORG_NAME}' as either organization or user.")


def write_output(repos: list[dict]) -> None:
    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    entries = [format_markdown_entry(repo) for repo in repos]
    with open(OUTPUT_PATH, "w", encoding="utf-8") as writer:
        writer.write("\n".join(entries))
        writer.write("\n")
    print(f"Saved {len(repos)} repos to {OUTPUT_PATH}")


def main() -> int:
    token = os.environ.get("GITHUB_TOKEN")
    try:
        repos = fetch_all_repos(token)
        if not repos:
            print("No repositories found for organization.")
            return 1
        write_output(repos)
        return 0
    except urllib.error.HTTPError as err:
        print(f"GitHub API error: {err.code} {err.reason}")
        print(err.read().decode("utf-8", errors="ignore"))
        return 1
    except Exception as exc:
        print(f"Failed to fetch repositories: {exc}")
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
