/* =========================================================
   Julio Silveira — Portfólio
   JavaScript puro, sem dependências
   ========================================================= */
(() => {
  "use strict";

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const root = document.documentElement;
  const body = document.body;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const clamp = (v, a, b) => Math.min(Math.max(v, a), b);

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignorado */ } },
  };

  /* ---------- Tema claro / escuro ---------- */
  const themeBtn = $("#themeToggle");
  const themeMeta = $('meta[name="theme-color"]');
  const applyTheme = (t) => {
    root.setAttribute("data-theme", t);
    themeMeta.setAttribute("content", t === "light" ? "#f4f6fb" : "#060c1a");
    themeBtn.setAttribute("aria-label", t === "light" ? "Ativar tema escuro" : "Ativar tema claro");
    themeBtn.setAttribute("aria-pressed", String(t === "light"));
  };
  applyTheme(root.getAttribute("data-theme") || "dark");
  themeBtn.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    applyTheme(next);
    store.set("theme", next);
  });
  // acompanha o sistema enquanto o usuário não escolher manualmente
  const mq = window.matchMedia("(prefers-color-scheme: light)");
  const onSystem = (e) => { if (!store.get("theme")) applyTheme(e.matches ? "light" : "dark"); };
  if (mq.addEventListener) mq.addEventListener("change", onSystem);

  /* ---------- Divide texto em letras ---------- */
  $$("[data-split]").forEach((el) => {
    const text = el.textContent;
    el.textContent = "";
    [...text].forEach((ch, i) => {
      const span = document.createElement("span");
      span.className = "char";
      span.textContent = ch === " " ? " " : ch;
      span.style.transitionDelay = `${0.35 + i * 0.04}s`;
      el.appendChild(span);
    });
  });

  /* ---------- Divide parágrafos em palavras ---------- */
  $$("[data-words]").forEach((el) => {
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map((w) => `<span class="word">${w}</span>`).join(" ");
  });

  /* ---------- Intro ---------- */
  const start = () => {
    body.classList.remove("is-loading");
    body.classList.add("is-ready");
    onScroll();
  };
  let introSeen = false;
  try { introSeen = sessionStorage.getItem("introSeen") === "1"; sessionStorage.setItem("introSeen", "1"); } catch (e) { /* ignorado */ }
  if (reduceMotion || introSeen) {
    start();
  } else {
    const fonts = document.fonts ? document.fonts.ready : Promise.resolve();
    Promise.all([fonts, new Promise((r) => setTimeout(r, 1250))]).then(start);
  }

  /* ---------- Luz do hero segue o ponteiro ---------- */
  const hero = $("#hero");
  const spot = $("#heroSpot");
  hero.addEventListener("pointermove", (e) => {
    const r = hero.getBoundingClientRect();
    spot.style.setProperty("--mx", `${e.clientX - r.left}px`);
    spot.style.setProperty("--my", `${e.clientY - r.top}px`);
  });

  /* ---------- Brilho dos cards de experiência ---------- */
  $$(".card-xp").forEach((f) => {
    f.addEventListener("pointermove", (e) => {
      const r = f.getBoundingClientRect();
      f.style.setProperty("--fx", `${e.clientX - r.left}px`);
      f.style.setProperty("--fy", `${e.clientY - r.top}px`);
    });
  });

  /* ---------- Menu mobile ---------- */
  const menuBtn = $("#menuBtn");
  const nav = $("#nav");
  const setMenu = (open) => {
    nav.classList.toggle("is-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    body.style.overflow = open ? "hidden" : "";
  };
  menuBtn.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
  $$("a", nav).forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  /* ---------- Revelação ao entrar na tela ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add("is-in");
      if (en.target.dataset.count) countUp(en.target);
      io.unobserve(en.target);
    });
  }, { threshold: 0.2, rootMargin: "0px 0px -8% 0px" });

  $$(".fade-up").forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 0.08}s`;
    io.observe(el);
  });
  $$("[data-count]").forEach((el) => io.observe(el));
  $$(".contact__title").forEach((el) => {
    $$(".char", el).forEach((c, i) => (c.style.transitionDelay = `${i * 0.025}s`));
    io.observe(el);
  });

  function countUp(el) {
    const target = +el.dataset.count;
    const pre = el.dataset.prefix || "";
    const suf = el.dataset.suffix || "";
    if (reduceMotion) { el.textContent = pre + target + suf; return; }
    const dur = 1600;
    const t = performance.now();
    const step = (now) => {
      const p = clamp((now - t) / dur, 0, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      el.textContent = pre + Math.round(target * eased) + suf;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* ---------- Link ativo no menu ---------- */
  const navLinks = $$(".header__nav a");
  const navIO = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${en.target.id}`));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  $$("main section[id]").forEach((s) => navIO.observe(s));

  /* ---------- Efeitos de rolagem ---------- */
  const header = $("#header");
  const journey = $("#experiencia");
  const track = $("#journeyTrack");
  const bar = $("#journeyBar");
  const wordBlocks = $$("[data-words]");
  const heroTitle = $(".hero__title");
  const isDesktop = () => window.innerWidth > 860;

  function sizeJourney() {
    if (!isDesktop()) { journey.style.height = ""; track.style.transform = ""; return; }
    const dist = track.scrollWidth - window.innerWidth;
    journey.style.height = `${window.innerHeight + Math.max(dist, 0)}px`;
  }

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      const vh = window.innerHeight;
      const y = window.scrollY;

      header.classList.toggle("is-scrolled", y > 40);

      if (!reduceMotion && y < vh * 1.2) {
        heroTitle.style.transform = `translate3d(0, ${y * 0.25}px, 0)`;
        heroTitle.style.opacity = String(clamp(1 - y / (vh * 0.9), 0, 1));
      }

      if (isDesktop()) {
        const r = journey.getBoundingClientRect();
        const dist = track.scrollWidth - window.innerWidth;
        const p = clamp(-r.top / (r.height - vh || 1), 0, 1);
        track.style.transform = `translate3d(${-dist * p}px, 0, 0)`;
        bar.style.transform = `scaleX(${p})`;
      }

      wordBlocks.forEach((block) => {
        const r = block.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        const words = block.children;
        const p = clamp((vh * 0.85 - r.top) / (r.height + vh * 0.35), 0, 1);
        const lit = Math.round(p * words.length);
        for (let i = 0; i < words.length; i++) words[i].classList.toggle("is-lit", i < lit || reduceMotion);
      });
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", () => { sizeJourney(); onScroll(); });
  window.addEventListener("load", () => { sizeJourney(); onScroll(); });
  sizeJourney();

  /* ---------- Prévia flutuante dos projetos ---------- */
  const preview = $("#workPreview");
  const pTag = $("#workPreviewTag");
  const pTitle = $("#workPreviewTitle");
  const list = $("#workList");
  if (finePointer && preview) {
    let px = 0, py = 0, tx = 0, ty = 0, active = false;
    list.addEventListener("pointermove", (e) => { tx = e.clientX; ty = e.clientY; });
    $$(".work__item", list).forEach((item) => {
      item.addEventListener("pointerenter", () => {
        preview.style.setProperty("--h", item.dataset.hue);
        pTag.textContent = item.dataset.tag;
        pTitle.textContent = $(".work__name", item).textContent;
        preview.classList.add("is-visible");
        active = true;
      });
    });
    list.addEventListener("pointerleave", () => { preview.classList.remove("is-visible"); active = false; });
    const loop = () => {
      px += (tx - px) * 0.12;
      py += (ty - py) * 0.12;
      const rot = clamp((tx - px) * 0.05, -8, 8);
      preview.style.transform = `translate3d(${px + 40}px, ${py}px, 0) translateY(-50%) rotate(${rot}deg) scale(${active ? 1 : 0.6})`;
      requestAnimationFrame(loop);
    };
    loop();
  }

  /* ---------- Ano ---------- */
  $("#year").textContent = new Date().getFullYear();
})();
