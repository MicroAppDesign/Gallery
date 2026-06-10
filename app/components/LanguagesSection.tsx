type LanguageStat = {
  language: string;
  size: number;
  percentage: number;
};

type LanguagesSectionProps = {
  profileUrl: string;
  copyPortfolioLink: () => void;
  languageStats: LanguageStat[];
};

const languageLogoMap: Record<string, string> = {
  "HTML": "/assets/HTML5_logo_and_wordmark.svg",
  "Python": "/assets/Python-logo-notext.svg",
  "TypeScript": "/assets/Typescript_logo_2020.svg",
  "JavaScript": "/assets/Unofficial_JavaScript_logo_2.svg",
};

export default function LanguagesSection({ profileUrl, copyPortfolioLink, languageStats }: LanguagesSectionProps) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
      <div className="lg:col-span-2 bg-surface/40 border border-border/80 rounded-2xl p-5 md:p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
            ความถนัดทางภาษาคอมพิวเตอร์ (Top Languages)
          </h3>
          <div id="languages-bars" className="space-y-3.5">
            {languageStats.length === 0 ? (
              <div className="text-center text-slate-500 text-xs py-8">ไม่มีข้อมูลสถิติภาษา</div>
            ) : (
              languageStats.map(({ language, percentage }) => {
                const logoUrl = languageLogoMap[language];
                return (
                  <div key={language} className="flex items-center gap-3">
                    {logoUrl && (
                      <img 
                        src={logoUrl} 
                        alt={`${language} logo`}
                        className="h-6 w-6 object-contain flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-slate-200">{language}</span>
                        <span className="text-xs font-bold text-primary">{percentage.toFixed(1)}%</span>
                      </div>
                      <div className="h-2 bg-surface-muted/50 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all duration-700 ease-out"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div className="text-[11px] text-slate-500 mt-4 pt-4 border-t border-border/60">
          *คำนวณจากสัดส่วนประเภทโค้ดใน 100 Repository ล่าสุดที่จัดเก็บไว้
        </div>
      </div>

      <div className="bg-linear-to-br from-surface/70 to-background/70 border border-border/80 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute -right-4 -bottom-4 text-9xl text-slate-800/10 pointer-events-none">G</div>
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">ลิงก์เชื่อมต่อด่วน</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            เปิดดูพอร์ตโฟลิโอต้นฉบับในแพลตฟอร์มหลักของ GitHub เพื่อเช็คความเคลื่อนไหวล่าสุดหรือเล่าเรื่องโปรเจกต์ของคุณ
          </p>
        </div>
        <div className="space-y-2 mt-6">
          <a
            id="btn-visit-github"
            href={profileUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-extrabold text-xs tracking-wider uppercase rounded-xl flex items-center justify-center gap-2 transition duration-300"
          >
            เปิดดูบน GitHub
          </a>
          <button
            type="button"
            onClick={copyPortfolioLink}
            className="w-full py-2.5 bg-surface hover:bg-border text-slate-200 font-bold text-xs tracking-wider uppercase rounded-xl border border-border/60 transition duration-300"
          >
            คัดลอกลิงก์พอร์ตโฟลิโอนี้
          </button>
        </div>
      </div>
    </section>
  );
}
