"use client";

import { useEffect, useMemo, useState } from "react";
import GitGalleryConfigDrawer from "./GitGalleryConfigDrawer";
import ProfileSection from "./ProfileSection";
import LanguagesSection from "./LanguagesSection";
import AiInsightSection from "./AiInsightSection";
import RepoFilterSection from "./RepoFilterSection";
import GalleryGridSection from "./GalleryGridSection";

type GitHubProfile = {
  login: string;
  name: string | null;
  bio: string | null;
  location: string | null;
  html_url: string;
  avatar_url: string;
  created_at: string;
  public_repos: number;
  followers: number;
  following: number;
};

type GitHubRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  size: number;
};

const sampleUsers = [
  { label: "taylorotwell", hint: "Laravel" },
  { label: "yyx990803", hint: "Vue" },
  { label: "kennethreitz", hint: "Python" },
];

export default function GalleryContent() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [username, setUsername] = useState("MicroAppDesign");
  const [savedUsername, setSavedUsername] = useState("MicroAppDesign");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("stars");
  const [activeFilter, setActiveFilter] = useState("All");
  const [toastMessage, setToastMessage] = useState("");
  const [aiOutputVisible, setAiOutputVisible] = useState(false);
  const [aiAnalysisText, setAiAnalysisText] = useState("");
  const [inspectorOpen, setInspectorOpen] = useState(false);
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [githubError, setGithubError] = useState("");
  const hasVoiceSupport = false;

  useEffect(() => {
    if (!toastMessage) {
      return;
    }

    const timer = window.setTimeout(() => setToastMessage(""), 2400);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadGitHubData() {
      setGithubError("");
      setLoadingProfile(true);
      setLoadingRepos(true);

      try {
        const profileResponse = await fetch(
          `https://api.github.com/users/${savedUsername}`,
          { signal: controller.signal }
        );

        if (!profileResponse.ok) {
          throw new Error(`ไม่พบผู้ใช้ GitHub: ${savedUsername}`);
        }

        const profileData: GitHubProfile = await profileResponse.json();
        setProfile(profileData);

        const reposResponse = await fetch(
          `https://api.github.com/users/${savedUsername}/repos?per_page=100&sort=updated`,
          { signal: controller.signal }
        );

        if (!reposResponse.ok) {
          throw new Error("ไม่สามารถดึงรายการ repository จาก GitHub ได้");
        }

        const reposData = (await reposResponse.json()) as GitHubRepo[];
        setRepos(
          reposData.map((repo) => ({
            id: repo.id,
            name: repo.name,
            html_url: repo.html_url,
            description: repo.description,
            language: repo.language,
            stargazers_count: repo.stargazers_count,
            forks_count: repo.forks_count,
            updated_at: repo.updated_at,
            size: repo.size,
          }))
        );
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        const message =
          error instanceof Error
            ? error.message
            : "เกิดข้อผิดพลาดในการเชื่อมต่อ GitHub";
        setGithubError(message);
        setProfile(null);
        setRepos([]);
      } finally {
        setLoadingProfile(false);
        setLoadingRepos(false);
      }
    }

    loadGitHubData();
    return () => controller.abort();
  }, [savedUsername]);

  const filteredRepos = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return repos
      .filter((repo) => {
        const matchesFilter =
          activeFilter === "All" || repo.language === activeFilter;
        const matchesSearch =
          !normalizedSearch ||
          repo.name.toLowerCase().includes(normalizedSearch) ||
          (repo.description ?? "").toLowerCase().includes(normalizedSearch);

        return matchesFilter && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "stars") {
          return b.stargazers_count - a.stargazers_count;
        }
        if (sortBy === "updated") {
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        }
        if (sortBy === "name") {
          return a.name.localeCompare(b.name);
        }
        if (sortBy === "size") {
          return b.size - a.size;
        }
        return 0;
      });
  }, [repos, searchQuery, sortBy, activeFilter]);

  const profileUrl = profile?.html_url ?? `https://github.com/${savedUsername}`;
  const galleryCount = filteredRepos.length;
  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

  // Calculate language statistics
  const languageStats = useMemo(() => {
    const stats: Record<string, number> = {};
    let totalSize = 0;

    repos.forEach(repo => {
      if (repo.language && repo.size > 0) {
        stats[repo.language] = (stats[repo.language] || 0) + repo.size;
        totalSize += repo.size;
      }
    });

    const sortedLanguages = Object.entries(stats)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 6) // Show top 6 languages
      .map(([language, size]) => ({
        language,
        size,
        percentage: totalSize > 0 ? (size / totalSize) * 100 : 0,
      }));

    return { sortedLanguages, totalSize };
  }, [repos]);

  const handleSaveUsername = () => {
    const trimmed = username.trim() || "MicroAppDesign";
    setSavedUsername(trimmed);
    setToastMessage("บันทึกชื่อผู้ใช้สำเร็จ");
    setDrawerOpen(false);
  };

  const copyPortfolioLink = () => {
    const portfolioLink = `${window.location.origin}/?user=${savedUsername}`;
    void navigator.clipboard
      .writeText(portfolioLink)
      .then(() => setToastMessage("คัดลอกลิงก์พอร์ตโฟลิโอแล้ว"))
      .catch(() => setToastMessage("ไม่สามารถคัดลอกได้"));
  };

  const setSampleUser = (value: string) => {
    setUsername(value);
  };

  const dynamicLanguageFilters = useMemo(() => {
    const langs = new Set<string>();
    langs.add("All");
    repos.forEach((repo) => {
      if (repo.language) {
        langs.add(repo.language);
      }
    });
    return Array.from(langs).sort();
  }, [repos]);

  const runAIProfileAnalysis = () => {
    setAiAnalysisText(
      `AI วิเคราะห์สไตล์การเขียนโค้ดของ ${savedUsername} แล้ว แนะนำให้เน้นการแสดงผลทางฝั่ง front-end และการจัดโครงสร้าง repository ให้ชัดเจน.`
    );
    setAiOutputVisible(true);
  };

  const speakAIAnalysis = () => {
    if (!hasVoiceSupport) {
      setToastMessage("ฟีเจอร์เสียงยังไม่เปิดใช้งาน");
      return;
    }
    setToastMessage("กำลังเล่นเสียงวิเคราะห์... กรุณารอสักครู่");
  };

  const languageFilterButtons = dynamicLanguageFilters.map((filter) => (
    <button
      key={filter}
      type="button"
      onClick={() => setActiveFilter(filter)}
      className={`lang-filter-btn px-3 py-1 text-xs font-semibold rounded-lg transition ${
        activeFilter === filter
          ? "bg-primary text-primary-foreground"
          : "bg-surface text-slate-200 hover:bg-border"
      }`}
    >
      {filter}
    </button>
  ));

  return (
    <>
      <GitGalleryConfigDrawer
        drawerOpen={drawerOpen}
        username={username}
        onUsernameChange={setUsername}
        onSave={handleSaveUsername}
        sampleUsers={sampleUsers}
        onSelectSampleUser={setSampleUser}
      />

      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
        {toastMessage ? (
          <div className="pointer-events-auto rounded-2xl bg-slate-900/95 border border-slate-700 px-4 py-3 text-xs text-slate-100 shadow-xl shadow-slate-950/40">
            {toastMessage}
          </div>
        ) : null}
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <ProfileSection
          profile={profile}
          savedUsername={savedUsername}
          profileUrl={profileUrl}
          loading={loadingProfile}
          totalStars={totalStars}
          onToggleDrawer={() => setDrawerOpen((current) => !current)}
        />
        <LanguagesSection 
          profileUrl={profileUrl} 
          copyPortfolioLink={copyPortfolioLink} 
          languageStats={languageStats.sortedLanguages} 
        />
        <AiInsightSection
          aiOutputVisible={aiOutputVisible}
          aiAnalysisText={aiAnalysisText}
          hasVoiceSupport={hasVoiceSupport}
          onAnalyze={runAIProfileAnalysis}
          onSpeak={speakAIAnalysis}
        />
        <RepoFilterSection
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          languageFilterButtons={languageFilterButtons}
          galleryCount={galleryCount}
        />
        <GalleryGridSection
          repos={filteredRepos}
          loading={loadingRepos}
          error={githubError}
          onResetFilters={() => {
            setSearchQuery("");
            setActiveFilter("All");
            setToastMessage("ล้างการค้นหาแล้ว");
          }}
        />
      </main>

      {inspectorOpen ? (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="max-w-3xl w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
            <div className="bg-slate-950 p-6 border-b border-slate-800/80 relative">
              <button
                type="button"
                onClick={() => setInspectorOpen(false)}
                className="absolute right-6 top-6 w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-white transition"
              >
                ✕
              </button>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-cyan-900/40 text-cyan-400 border border-cyan-800/50">
                LANG
              </span>
              <h3 className="text-xl font-extrabold text-white mt-3 tracking-tight truncate">
                Project Repository Name
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                No description for this repository.
              </p>
            </div>
            <div className="p-6 space-y-6">
              <div className="bg-slate-950 border border-cyan-500/10 p-4 rounded-xl space-y-3">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white uppercase tracking-wider">
                    ✨
                    <span>AI Elevator Pitch</span>
                  </div>
                  <button
                    type="button"
                    className="px-3 py-1.5 bg-cyan-500/10 hover:bg-cyan-500 hover:text-black border border-cyan-500/25 text-cyan-400 text-[10px] font-bold uppercase rounded-lg tracking-wider transition duration-300"
                  >
                    สร้างคำโปรยโปรเจกต์
                  </button>
                </div>
                <div className="hidden text-xs text-slate-300 leading-relaxed italic border-l-2 border-cyan-500 pl-3 py-1" id="ai-pitch-output">
                  {/* AI pitch output placeholder */}
                </div>
                <div className="hidden text-[10px] text-slate-500 gap-1.5" id="ai-pitch-loader">
                  <span className="animate-ping w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>กำลังใช้ Gemini AI ช่วยเขียนคำบรรยายอย่างเฉียบคม...</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Stars", value: "0" },
                  { label: "Forks", value: "0" },
                  { label: "Watchers", value: "0" },
                  { label: "Size KB", value: "0" },
                ].map((item) => (
                  <div key={item.label} className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/50 text-center">
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">{item.label}</p>
                    <p className="text-sm font-bold text-white mt-0.5">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3.5 bg-slate-950/40 p-4 rounded-xl border border-slate-800/40 text-xs">
                {[
                  ["License ของโค้ด:", "None"],
                  ["วันที่สร้างครั้งแรก:", "--"],
                  ["อัปเดตระบบล่าสุด:", "--"],
                  ["สถานะกิ่ง (Default Branch):", "main"],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-slate-500">{label}</span>
                    <span className="font-semibold text-slate-300">{value}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-2">
                <a
                  id="modal-github-link"
                  href={profileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-extrabold uppercase tracking-wider rounded-xl text-center shadow-lg shadow-cyan-500/15 transition duration-300"
                >
                  ตรวจสอบโค้ดบน GitHub
                </a>
                <button
                  type="button"
                  onClick={() => setInspectorOpen(false)}
                  className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition"
                >
                  ปิดหน้าต่าง
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
