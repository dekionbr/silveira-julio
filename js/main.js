/* =========================================================
   Julio Silveira — Portfólio cinematográfico
   JavaScript puro, sem dependências
   ========================================================= */
(() => {
  "use strict";

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const body = document.body;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const clamp = (v, a, b) => Math.min(Math.max(v, a), b);

  /* ---------- Film grain (generated once on a canvas) ---------- */
  (function grain() {
    const c = document.createElement("canvas");
    const size = 180;
    c.width = c.height = size;
    const ctx = c.getContext("2d");
    const img = ctx.createImageData(size, size);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = Math.random() * 255;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
      img.data[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    $(".grain").style.backgroundImage = `url(${c.toDataURL("image/png")})`;
  })();

  /* ---------- Split text into characters ---------- */
  $$("[data-split]").forEach((el) => {
    const text = el.textContent;
    el.textContent = "";
    [...text].forEach((ch, i) => {
      const span = document.createElement("span");
      span.className = "char";
      span.textContent = ch === " " ? " " : ch;
      span.style.transitionDelay = `${0.9 + i * 0.045}s`;
      el.appendChild(span);
    });
  });

  /* ---------- Split paragraphs into words (scroll-lit) ---------- */
  $$("[data-words]").forEach((el) => {
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map((w) => `<span class="word">${w}</span>`).join(" ");
  });

  /* ---------- Film leader countdown ---------- */
  const leaderNum = $("#leaderNum");
  const sweep = $("#leaderSweep");
  const start = () => {
    body.classList.remove("is-loading");
    body.classList.add("is-ready");
    onScroll();
  };

  if (reduceMotion || sessionStorageGet("seenLeader")) {
    start();
  } else {
    let n = 3;
    const tick = () => {
      leaderNum.textContent = n;
      sweep.style.transition = "none";
      sweep.style.strokeDashoffset = "553";
      // force reflow, then animate the sweep for one "second" of film
      void sweep.getBoundingClientRect();
      sweep.style.transition = "stroke-dashoffset .62s linear";
      sweep.style.strokeDashoffset = "0";
      n -= 1;
      if (n > 0) setTimeout(tick, 650);
      else setTimeout(() => { sessionStorageSet("seenLeader", "1"); start(); }, 700);
    };
    // wait for fonts so the title split looks right
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => setTimeout(tick, 150));
  }

  function sessionStorageGet(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
  function sessionStorageSet(k, v) { try { sessionStorage.setItem(k, v); } catch (e) { /* ignore */ } }

  /* ---------- Timecode (REC) ---------- */
  const timecode = $("#timecode");
  const t0 = performance.now();
  const pad = (n) => String(n).padStart(2, "0");
  setInterval(() => {
    const ms = performance.now() - t0;
    const f = Math.floor((ms % 1000) / (1000 / 24));
    const s = Math.floor(ms / 1000);
    timecode.textContent = `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}:${pad(f)}`;
  }, 1000 / 24);

  /* ---------- Custom cursor ---------- */
  const cursor = $("#cursor");
  const cursorLabel = $("#cursorLabel");
  let mx = -100, my = -100, cx = -100, cy = -100;
  if (finePointer) {
    window.addEventListener("pointermove", (e) => { mx = e.clientX; my = e.clientY; }, { passive: true });
    const loop = () => {
      cx += (mx - cx) * 0.2;
      cy += (my - cy) * 0.2;
      cursor.style.transform = `translate3d(${cx - 5}px, ${cy - 5}px, 0)`;
      requestAnimationFrame(loop);
    };
    loop();

    document.addEventListener("pointerover", (e) => {
      const t = e.target.closest("[data-cursor], a, button");
      if (!t) return;
      cursor.classList.add("is-hover");
      cursorLabel.textContent = t.dataset.cursor || "";
    });
    document.addEventListener("pointerout", (e) => {
      const t = e.target.closest("[data-cursor], a, button");
      if (t && !t.contains(e.relatedTarget)) cursor.classList.remove("is-hover");
    });
  }

  /* ---------- Hero spotlight ---------- */
  const hero = $("#hero");
  const spot = $("#heroSpot");
  hero.addEventListener("pointermove", (e) => {
    const r = hero.getBoundingClientRect();
    spot.style.setProperty("--mx", `${e.clientX - r.left}px`);
    spot.style.setProperty("--my", `${e.clientY - r.top}px`);
  });

  /* ---------- Frame glow follows pointer ---------- */
  $$(".frame").forEach((f) => {
    f.addEventListener("pointermove", (e) => {
      const r = f.getBoundingClientRect();
      f.style.setProperty("--fx", `${e.clientX - r.left}px`);
      f.style.setProperty("--fy", `${e.clientY - r.top}px`);
    });
  });

  /* ---------- Mobile menu ---------- */
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

  /* ---------- Reveal on view ---------- */
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
  $$(".credits__title").forEach((el) => {
    $$(".char", el).forEach((c, i) => (c.style.transitionDelay = `${i * 0.03}s`));
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

  /* ---------- Active nav link ---------- */
  const sections = $$("main section[id]");
  const navLinks = $$(".header__nav a");
  const navIO = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${en.target.id}`));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach((s) => navIO.observe(s));

  /* ---------- Scroll-driven effects ---------- */
  const journey = $("#trajetoria");
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

      // letterbox bars while on the hero
      body.classList.toggle("at-hero", y < vh * 0.5);

      // hero parallax / fade
      if (!reduceMotion && y < vh * 1.2) {
        heroTitle.style.transform = `translate3d(0, ${y * 0.25}px, 0)`;
        heroTitle.style.opacity = String(clamp(1 - y / (vh * 0.9), 0, 1));
      }

      // horizontal journey
      if (isDesktop()) {
        const r = journey.getBoundingClientRect();
        const dist = track.scrollWidth - window.innerWidth;
        const p = clamp(-r.top / (r.height - vh || 1), 0, 1);
        track.style.transform = `translate3d(${-dist * p}px, 0, 0)`;
        bar.style.transform = `scaleX(${p})`;
      }

      // scroll-lit words
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

  /* ---------- Filmography hover preview ---------- */
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
      const rot = clamp((tx - px) * 0.05, -10, 10);
      preview.style.transform = `translate3d(${px + 40}px, ${py}px, 0) translate(-0%, -50%) rotate(${rot}deg) scale(${active ? 1 : 0.6})`;
      requestAnimationFrame(loop);
    };
    loop();
  }

  /* ---------- Year ---------- */
  $("#year").textContent = new Date().getFullYear();
})();
