import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

export type TemplateContent = {
  description?: string;
  longDescription?: string;
  features?: string[];
  useCases?: string[];
  paymentLink?: string;
  vercelLink?: string;
  githubLink?: string;
};

export type TemplateInfo = {
  slug: string;
  filename: string;
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  useCases: string[];
  imageSrc: string;
  paymentLink: string;
  vercelLink: string;
  githubLink: string;
};

const imageExtensions = new Set([".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif"]);
const excludedImageNames = new Set(["next16-P0A-API.png", "next16-P0A.png"]);

function slugToTitle(slug: string) {
  return slug
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

async function loadTemplateContent(slug: string): Promise<TemplateContent> {
  const contentPath = path.join(process.cwd(), "content", "templates", `${slug}.json`);

  try {
    const raw = await readFile(contentPath, "utf8");
    return JSON.parse(raw) as TemplateContent;
  } catch {
    return {};
  }
}

async function createTemplateInfo(filename: string): Promise<TemplateInfo> {
  const ext = path.extname(filename).toLowerCase();
  const slug = path.basename(filename, ext);
  const title = slugToTitle(slug);
  const content = await loadTemplateContent(slug);

  const defaultFeatures = [
    "หน้า Landing page Animation ที่สวยงาม",
    "ดีไซน์ Responsive รองรับมือถือแท็บเล็ตเดสก์ท็อป",
    "โครงสร้างสวยงาม พร้อมแก้ไขได้ทันที",
  ];
  const defaultUseCases = [
    "เว็บไซต์เสนอขายสินค้าและบริการ",
    "โปรโมทคอร์สออนไลน์และเวิร์กช็อป",
    "หน้าแสดงผลงานและแบรนด์บริษัท",
  ];

  return {
    slug,
    filename,
    title,
    description: content.description ?? `Template ${title} พร้อมระบบชำระเงินราคา 5,000 บาท`,
    longDescription:
      content.longDescription ??
      `เทมเพลต ${title} ออกแบบมาเพื่อสร้างหน้า Landing Page ที่เข้าใจง่าย โฟกัสลูกค้าด้วยปุ่มชำระเงินและส่วนแสดงรายละเอียดสินค้าอย่างมืออาชีพ.`,
    features: content.features ?? defaultFeatures,
    useCases: content.useCases ?? defaultUseCases,
    imageSrc: `/${filename}`,
    paymentLink: content.paymentLink ?? "https://microtronic-thailand.github.io/micro-payment/",
    vercelLink: content.vercelLink ?? `https://${slug}.vercel.app/`,
    githubLink: content.githubLink ?? `https://github.com/Ex2-Axon/${slug}`,
  };
}

export async function getTemplateImages(): Promise<TemplateInfo[]> {
  const publicDir = path.join(process.cwd(), "public");
  const entries = await readdir(publicDir, { withFileTypes: true });

  const templates = await Promise.all(
    entries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((name) => imageExtensions.has(path.extname(name).toLowerCase()))
      .filter((name) => !excludedImageNames.has(name))
      .map(createTemplateInfo)
  );

  return templates.sort((a, b) => a.title.localeCompare(b.title, "th"));
}

export async function getTemplateBySlug(slug: string): Promise<TemplateInfo | undefined> {
  const templates = await getTemplateImages();
  return templates.find((template) => template.slug === slug);
}
