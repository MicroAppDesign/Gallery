import RemoteNavbar from "./components/RemoteNavbar";
import RemoteFooter from "./components/RemoteFooter";
import CookieBanner from "./components/CookieBanner";
import GalleryContent from "./components/GalleryContent";

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased flex flex-col">
      <RemoteNavbar />
      
      <main className="flex-1">
        <GalleryContent />
      </main>

      <RemoteFooter />
      <CookieBanner />
    </div>
  );
}
