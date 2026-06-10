import React from "react";

export default function Page() {
  return (
    <div style={{ height: "100vh", width: "100vw", margin: 0 }}>
      <iframe
        src="/index.html"
        title="GitGallery (original)"
        style={{ border: 0, width: "100%", height: "100%" }}
      />
    </div>
  );
}
