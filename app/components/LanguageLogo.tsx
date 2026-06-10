'use client'

import { useState } from 'react'

// Helper to get the correct Devicon icon name for a given GitHub language
const getDeviconName = (language: string): string => {
  const lowerLang = language.toLowerCase();

  // Simple mappings from GitHub language names to Devicon icon names
  const mappings: Record<string, string> = {
    "html": "html5",
    "css": "css3",
    "scss": "sass",
    "javascript": "javascript",
    "typescript": "typescript",
    "python": "python",
    "php": "php",
    "ruby": "ruby",
    "java": "java",
    "c++": "cplusplus",
    "c": "c",
    "c#": "csharp",
    "go": "go",
    "golang": "go",
    "rust": "rust",
    "swift": "swift",
    "kotlin": "kotlin",
    "dart": "dart",
    "shell": "bash",
    "bash": "bash",
    "powershell": "powershell",
    "batchfile": "windows8",
    "dockerfile": "docker",
    "makefile": "docker",
    "json": "json",
    "yaml": "yaml",
    "xml": "xml",
    "markdown": "markdown",
    "graphql": "graphql",
    "sql": "postgresql",
    "postgresql": "postgresql",
    "mysql": "mysql",
    "mongodb": "mongodb",
    "redis": "redis",
    "vue": "vuejs",
    "react": "react",
    "next.js": "nextjs",
    "node.js": "nodejs",
    "express": "express",
    "nestjs": "nestjs",
    "flask": "flask",
    "django": "django",
    "spring": "spring",
    "laravel": "laravel",
    "symfony": "symfony",
    "rails": "rails",
    "ruby on rails": "rails",
    "flutter": "flutter",
    "svelte": "svelte",
    "angular": "angularjs",
    "git": "git",
    "git hub actions": "github",
    "aws": "amazonwebservices",
    "azure": "azure",
    "gcp": "googlecloud",
    "vercel": "vercel",
    "netlify": "netlify",
    "heroku": "heroku",
    "firebase": "firebase",
    "supabase": "supabase",
    "figma": "figma",
    "adobe xd": "xd",
    "photoshop": "photoshop",
    "illustrator": "illustrator",
    "blender": "blender",
    "unity": "unity",
    "unreal": "unreal",
    "godot": "godot",
  };

  return mappings[lowerLang] || lowerLang;
};

const languageLogoMap: Record<string, string> = {
  // Local files (prioritized first)
  "HTML": "/assets/HTML5_logo_and_wordmark.svg",
  "Python": "/assets/Python-logo-notext.svg",
  "TypeScript": "/assets/Typescript_logo_2020.svg",
  "JavaScript": "/assets/Unofficial_JavaScript_logo_2.svg",
};

// Helper to get logo with multiple fallback suffixes for Devicon
const getDeviconUrls = (deviconName: string): string[] => {
  return [
    `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${deviconName}/${deviconName}-original.svg`,
    `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${deviconName}/${deviconName}-plain.svg`,
    `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${deviconName}/${deviconName}-original-wordmark.svg`,
    `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${deviconName}/${deviconName}-plain-wordmark.svg`,
  ]
}

// Component that tries multiple logo URLs in sequence
export default function LanguageLogo({
  language,
  className,
}: {
  language: string | null;
  className?: string;
}) {
  if (!language) return null;

  // Check local files first
  if (languageLogoMap[language]) {
    return (
      <img
        src={languageLogoMap[language]}
        alt={`${language} logo`}
        className={className}
        onError={(e) => {
      // If local fails, try Devicon chain
      e.currentTarget.style.display = 'none'
    }}
      />
    )
  }

  const deviconName = getDeviconName(language);
  const urls = getDeviconUrls(deviconName);
  
  return <DeviconFallback urls={urls} alt={`${language} logo`} className={className} />
}

function DeviconFallback({
  urls,
  alt,
  className,
}: {
  urls: string[];
  alt: string;
  className?: string;
}) {
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);

  if (currentUrlIndex >= urls.length) {
    return null
  }

  const handleError = () => {
    setCurrentUrlIndex(prev => prev + 1)
  }

  return (
    <img
      src={urls[currentUrlIndex]}
      alt={alt}
      className={className}
      onError={handleError}
      onLoad={() => { /* Do nothing on load */ }}
    />
  )
}
