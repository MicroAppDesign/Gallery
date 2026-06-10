# 🚀 GitGallery - พอร์ตโฟลิโออัจฉริยะสำหรับนักพัฒนา

GitGallery คือแอปพลิเคชันเว็บแบบหน้าเดียว (Single-Page Application) ที่เปลี่ยนคลังเก็บโค้ด (GitHub Repositories) ของคุณให้กลายเป็นแกลเลอรี่ผลงานที่สวยงาม ทันสมัย และอ่านง่าย เหมาะสำหรับการนำไปแสดงให้ผู้สรรหาว่าจ้าง (Recruiters) หรือลูกค้าดู

## ✨ คุณสมบัติเด่น

* **Interactive Gallery:** แสดงผลงานในรูปแบบการ์ดที่สะอาดตา พร้อมระบบคัดกรองตามภาษาที่ใช้
* **Data Visualization:** วิเคราะห์สัดส่วนทักษะทางภาษาโปรแกรมด้วยกราฟวงกลม (Chart.js)
* **Responsive Design:** รองรับการใช้งานทั้งบนมือถือ แท็บเล็ต และคอมพิวเตอร์
* **AI Integration Ready:** รองรับการเชื่อมต่อกับ Gemini API เพื่อวิเคราะห์พอร์ตโฟลิโออัตโนมัติ
* **Fast & Light:** เขียนด้วย HTML, Tailwind CSS และ Vanilla JS โดยไม่ต้องใช้ Framework หนักๆ

## 🛠️ วิธีการใช้งาน

1.  ดาวน์โหลดไฟล์ `index.html` ไปไว้ในโปรเจกต์ของคุณ
2.  เปิดไฟล์ด้วยโปรแกรมแก้ไขข้อความ (เช่น VS Code)
3.  ค้นหาตัวแปร `currentUsername` ในส่วน JavaScript และเปลี่ยนเป็น **ชื่อผู้ใช้ GitHub ของคุณ**
4.  บันทึกไฟล์และเปิดใช้งานผ่านเว็บเบราว์เซอร์

## 🎨 เทคโนโลยีที่ใช้

* **Styling:** Tailwind CSS (via CDN)
* **Charts:** Chart.js
* **Icons:** FontAwesome
* **Data Source:** GitHub REST API

---
*พัฒนาเพื่อนักพัฒนาโดย GitGallery*

---

Read [](file:///c%3A/Users/User/Documents/GitHub/Neon13/Gallery/.github/workflows/deploy.yml)

## รายการไฟล์ `Gallery` ที่ระบุลิงก์ / เส้นทาง

### 1) AnimatedHero.tsx
- `https://microtronic-thailand.github.io/micro-payment/` 

### 2) RemoteFooter.tsx
- `https://microtronic-thailand.github.io/privacy-policy/?lang=en` 
- `https://microtronic-thailand.github.io/terms-conditions/` 
- `https://microtronic.biz/` 
- `mailto:grids@microtronic.biz` 
- `https://www.facebook.com/MicrotronicTH` 
- `https://github.com/microtronic-thailand` 
- `https://discord.gg/ZBu8ARCW` 
- `https://lin.ee/nHRMd36` 
- `https://microtronic.biz/` (copyright link)

### 3) RemoteNavbar.tsx
- `https://microtronic-thailand.github.io/micro-payment/` 
- `#schedule-section` 

### 4) image-utils.ts
- local content path:
  - `content/templates/${slug}.json` 
- default links:
  - `https://microtronic-thailand.github.io/micro-payment/` 
  - `https://${slug}.vercel.app/` 
  - `https://github.com/MicroAppDesign/${slug}` 

### 5) server-api.ts
- `https://next16-p0-a-api.vercel.app` 

### 6) page.tsx
- `src="/index.html"` 

### 7) projects.md
- `https://github.com/MicroAppDesign/py_get_price_crypto` 
- `https://github.com/MicroAppDesign/separate_sound` 
- `https://github.com/MicroAppDesign/Gallery` 
- `https://github.com/MicroAppDesign/key_generator_tools` 
- `https://github.com/MicroAppDesign/key_generator_tools_src` 
- `https://github.com/MicroAppDesign/html_to_tsx` 
- `https://github.com/MicroAppDesign/Neon13` 
- `https://github.com/MicroAppDesign/website-builder` 
- `https://github.com/MicroAppDesign/website-consult` 
- `https://github.com/MicroAppDesign/ad-checklist` 

### 8) projects.md
(ซ้ำเนื้อหาเดียวกับ projects.md)
- same 10 GitHub URLs ข้างต้น

### 9) index.html
- Local assets:
  - tailwind.js
  - fontawesome.css
  - fonts.css
  - placeholder.svg
- Project data sources:
  - projects.md
  - `./assets/cards/projects.txt` 
- GitHub API / GitHub URL patterns:
  - `https://api.github.com/repos/${owner}/${name}` 
  - `https://github.com/${owner}.png?size=460` 
  - `https://api.github.com/users/${owner}` 
  - `https://github.com/${owner}` 
  - `https://api.github.com/users/${currentUsername}` 
  - `https://api.github.com/users/${currentUsername}/repos?per_page=100&sort=updated` 
  - dynamic `https://${webLink}` when user blog is not absolute URL
- Gemini API endpoints:
  - `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}` 
  - `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}` 

### 10) index.html
- CDN / external assets:
  - `https://cdn.tailwindcss.com` 
  - `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css` 
  - `https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700&family=Sarabun:wght@400;700&display=swap` 
- Local asset paths:
  - placeholder.svg
  - projects.md
  - `/assets/cards/projects.txt` 
- GitHub API / URL patterns:
  - same `api.github.com` and `https://github.com/${owner}.png?size=460` patterns as index.html

### 11) master-index.html
- same local and GitHub path patterns as index.html
- same candidate files:
  - projects.md
  - `./assets/cards/projects.txt` 

### 12) deploy.yml
- checks index.html for `<!DOCTYPE html>` via shell command
- path reference: index.html

### 13) fix-run-dev.py
- `http://localhost:3000` 

### 14) fix_screenshot.py
- `https://{folder_name}.vercel.app` 

### 15) setup_and_run.py
- `https://nodejs.org/` 
- file path strings:
  - input.css
  - output.css
  - .gitignore
  - index.html

### 16) GitHub helper scripts
- github_pull.py
- github_push.py
- github_sync.py
- github_update.py
- github_create.py
- remote URL templates:
  - `https://{token}@github.com/{owner}/{repo}.git` 
  - `https://github.com/{owner}/{repo}.git` 

---

## สรุป
- ลิงก์หลักที่พบอยู่ใน: components, lib, index.html, index.html, master-index.html, projects.md
- เส้นทางไฟล์ local ที่ระบุอยู่ใน: image-utils.ts, page.tsx, fix-run-dev.py, setup_and_run.py, deploy.yml

ถ้าต้องการให้ผมสกัดเฉพาะ “ลิงก์ภายนอก (http/https/mailto)” แบบเดียว ก็แจ้งได้ครับ.
