interface SampleUser {
  label: string;
  hint: string;
}

interface GitGalleryConfigDrawerProps {
  drawerOpen: boolean;
  username: string;
  onUsernameChange: (value: string) => void;
  onSave: () => void;
  sampleUsers: SampleUser[];
  onSelectSampleUser: (value: string) => void;
}

export default function GitGalleryConfigDrawer({
  drawerOpen,
  username,
  onUsernameChange,
  onSave,
  sampleUsers,
  onSelectSampleUser,
}: GitGalleryConfigDrawerProps) {
  return (
    <section
      id="config-drawer"
      className={`bg-linear-to-b from-slate-900 to-slate-950 border-b border-slate-800/80 transition-all duration-500 overflow-hidden ${
        drawerOpen ? "max-h-105" : "max-h-0"
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-6 shadow-2xl">
          <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
            ตั้งค่าบัญชี GitHub ของคุณ
          </h3>
          <p className="text-xs text-slate-400 mb-4 leading-relaxed">
            พิมพ์ Username บน GitHub ของคุณลงในช่องด้านล่างเพื่อแปลงโฉมหน้าเว็บพอร์ตโฟลิโอนี้ให้ดึงข้อมูลงานเขียนโค้ดและภาษาที่ใช้ของคุณมาแสดงแบบเรียลไทม์
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                id="username-input"
                value={username}
                onChange={(event) => onUsernameChange(event.target.value)}
                placeholder="พิมพ์ชื่อผู้ใช้ เช่น torvalds, octocat..."
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl pl-4 pr-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all duration-300"
              />
            </div>
            <button
              type="button"
              onClick={onSave}
              className="px-6 py-3 bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-cyan-500/20 active:scale-95 transition-all duration-200"
            >
              ดึงข้อมูลพอร์ต
            </button>
          </div>

          <div className="mt-3 flex gap-2 flex-wrap text-[11px] text-slate-500">
            <span>บัญชีแนะนำ:</span>
            {sampleUsers.map((user) => (
              <button
                key={user.label}
                type="button"
                onClick={() => onSelectSampleUser(user.label)}
                className="text-cyan-400/80 hover:text-cyan-400 transition font-medium"
              >
                {user.label} ({user.hint})
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
