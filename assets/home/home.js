(() => {
  const strings = {
    zh: ["骨盆外固定", "胫骨结节骨牵引", "跟骨骨牵引", "颅骨牵引"],
    en: ["Pelvic external fixation", "Proximal tibial traction", "Calcaneal traction", "Cranial traction"]
  };
  const root = document.documentElement;
  const languageButton = document.querySelector("#languageToggle");
  const video = document.querySelector("#showreel");
  const videoButton = document.querySelector("#videoToggle");
  const title = document.querySelector("#showcaseTitle");
  const number = document.querySelector("#showcaseNumber");
  const tabs = [...document.querySelectorAll(".showcase-tab")];
  let language = localStorage.getItem("trauma-atlas-language") || "zh";

  function applyLanguage(next) {
    language = next;
    root.lang = language === "zh" ? "zh-CN" : "en";
    document.querySelectorAll("[data-zh][data-en]").forEach((element) => {
      element.textContent = element.dataset[language];
    });
    languageButton.textContent = language === "zh" ? "EN" : "中文";
    languageButton.setAttribute("aria-label", language === "zh" ? "Switch to English" : "切换到中文");
    localStorage.setItem("trauma-atlas-language", language);
    updateCaption(activeIndex());
  }

  function activeIndex() {
    return Math.min(3, Math.floor((video.currentTime || 0) / 3.2));
  }

  function updateCaption(index) {
    tabs.forEach((tab, i) => tab.classList.toggle("active", i === index));
    number.textContent = String(index + 1).padStart(2, "0");
    title.textContent = strings[language][index];
  }

  languageButton.addEventListener("click", () => applyLanguage(language === "zh" ? "en" : "zh"));
  tabs.forEach((tab) => tab.addEventListener("click", () => {
    video.currentTime = Number(tab.dataset.time);
    updateCaption(Number(tab.dataset.index));
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) video.play().catch(() => {});
  }));
  video.addEventListener("timeupdate", () => updateCaption(activeIndex()));
  videoButton.addEventListener("click", () => {
    if (video.paused) {
      video.play().then(() => { videoButton.textContent = "Ⅱ"; videoButton.setAttribute("aria-label", language === "zh" ? "暂停视频" : "Pause video"); }).catch(() => {});
    } else {
      video.pause(); videoButton.textContent = "▶"; videoButton.setAttribute("aria-label", language === "zh" ? "播放视频" : "Play video");
    }
  });
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    video.pause(); videoButton.textContent = "▶";
  }
  applyLanguage(language);
})();
