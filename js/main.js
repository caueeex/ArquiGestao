(() => {
  const STORAGE_KEY = "arquigestao-lang";
  const supported = ["pt", "en"];

  function getLang() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (supported.includes(saved)) return saved;
    return "pt";
  }

  function applyLang(lang) {
    document.documentElement.lang = lang;
    localStorage.setItem(STORAGE_KEY, lang);

    document.querySelectorAll("[data-pt], [data-en]").forEach((el) => {
      const text = el.getAttribute(`data-${lang}`);
      if (text !== null) el.textContent = text;
    });

    document.querySelectorAll("[data-pt-html], [data-en-html]").forEach((el) => {
      const html = el.getAttribute(`data-${lang}-html`);
      if (html !== null) el.innerHTML = html;
    });

    const toggle = document.querySelector("[data-lang-toggle]");
    if (toggle) {
      toggle.textContent = lang === "pt" ? "EN" : "PT";
      toggle.setAttribute("aria-label", lang === "pt" ? "Switch to English" : "Mudar para português");
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    applyLang(getLang());

    const toggle = document.querySelector("[data-lang-toggle]");
    if (toggle) {
      toggle.addEventListener("click", () => {
        applyLang(getLang() === "pt" ? "en" : "pt");
      });
    }
  });
})();
