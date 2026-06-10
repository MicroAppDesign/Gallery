type ProfileSectionProps = {
  profile: {
    login: string;
    name: string | null;
    bio: string | null;
    location: string | null;
    html_url: string;
    avatar_url: string;
    created_at: string;
    public_repos: number;
    followers: number;
  } | null;
  savedUsername: string;
  profileUrl: string;
  loading: boolean;
  totalStars: number;
  onToggleDrawer?: () => void;
};

function formatJoinedDate(createdAt: string | null) {
  if (!createdAt) {
    return "เข้าร่วม --";
  }

  return new Date(createdAt).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
  });
}

export default function ProfileSection({
  profile,
  savedUsername,
  profileUrl,
  loading,
  totalStars,
  onToggleDrawer,
}: ProfileSectionProps) {
  const displayName = profile?.name ?? (loading ? "กำลังโหลดโปรไฟล์..." : "GitHub Profile");
  const displayBio =
    profile?.bio ??
    "ดูข้อมูลโปรไฟล์จาก GitHub เพื่อให้แสดงรายละเอียด เช่น ชื่อ, คำอธิบาย, สถานที่ และจำนวน repository ที่เกี่ยวข้อง";

  return (
    <section className="relative mb-12 overflow-hidden rounded-3xl border border-slate-800/85 bg-linear-to-br from-slate-900/60 via-slate-900 to-slate-950/80 p-6 sm:p-8 md:p-10 shadow-2xl">
      <div className="absolute -top-12 -left-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-violet-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="relative group">
          <div className="absolute -inset-1 rounded-2xl bg-linear-to-tr from-cyan-500 to-violet-600 opacity-60 group-hover:opacity-100 transition duration-500 blur-sm"></div>
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
            <img
              id="profile-avatar"
              src={profile?.avatar_url ?? "/assets/placeholder.svg"}
              alt="GitHub Profile"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-3 justify-center md:justify-start">
            <h1 id="profile-name" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {displayName}
            </h1>
            <span id="profile-login" className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700/60 text-slate-300 w-fit mx-auto md:mx-0">
              @{savedUsername}
            </span>
            {onToggleDrawer && (
              <button
                type="button"
                onClick={onToggleDrawer}
                className="text-[10px] font-bold px-3 py-1 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-full transition-all"
              >
                สลับบัญชี
              </button>
            )}
          </div>

          <p id="profile-bio" className="text-sm sm:text-base text-slate-400 mt-3 max-w-2xl leading-relaxed">
            {displayBio}
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-5 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="text-slate-500">📍</span>
              <span>{profile?.location ?? "ไม่ระบุสถานที่"}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-slate-500">🔗</span>
              <a id="profile-url" href={profileUrl} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition">
                {profileUrl}
              </a>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-slate-500">📅</span>
              <span id="profile-joined">{formatJoinedDate(profile?.created_at ?? null)}</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-6">
            <div className="px-4 py-2 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center gap-2">
              <span className="text-cyan-400">📁</span>
              <div className="text-left">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest leading-none">Public Repos</p>
                <span id="metric-repos" className="text-sm font-bold text-white">
                  {profile?.public_repos ?? 0}
                </span>
              </div>
            </div>
            <div className="px-4 py-2 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center gap-2">
              <span className="text-violet-400">👥</span>
              <div className="text-left">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest leading-none">Followers</p>
                <span id="metric-followers" className="text-sm font-bold text-white">
                  {profile?.followers ?? 0}
                </span>
              </div>
            </div>
            <div className="px-4 py-2 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center gap-2">
              <span className="text-amber-400">⭐</span>
              <div className="text-left">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest leading-none">Total Stars</p>
                <span id="metric-stars" className="text-sm font-bold text-white">
                  {totalStars}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
