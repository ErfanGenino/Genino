// 📄 src/utils/metaSetter.js
export function setMetaTags({ title, description, keywords, image }) {
  if (typeof document === "undefined") return;

  // 🏷 عنوان صفحه
  if (title) {
    document.title = title;
  }

  const metaConfigs = [
    // ---- پایه
    { name: "description", content: description },
    { name: "keywords", content: keywords },

    // ---- Open Graph (برای واتساپ، تلگرام و ...)
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: image },
    { property: "og:type", content: "article" },
    { property: "og:locale", content: "fa_IR" },
    { property: "og:site_name", content: "Genino | ژنینو" },

    // ---- Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
  ];

  metaConfigs.forEach((cfg) => {
    if (!cfg.content) return;

    let selector = "";
    if (cfg.name) selector = `meta[name="${cfg.name}"]`;
    if (cfg.property) selector = `meta[property="${cfg.property}"]`;

    if (!selector) return;

    let el = document.querySelector(selector);
    if (!el) {
      el = document.createElement("meta");
      if (cfg.name) el.setAttribute("name", cfg.name);
      if (cfg.property) el.setAttribute("property", cfg.property);
      document.head.appendChild(el);
    }
    el.setAttribute("content", cfg.content);
  });
}
