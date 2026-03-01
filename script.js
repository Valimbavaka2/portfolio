window.addEventListener("load", () => {
  setTimeout(
    () => document.getElementById("loader").classList.add("done"),
    2200,
  );
});

const cur = document.getElementById("cursor");
let mx = 0,
  my = 0;

const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

if (!isTouch && cur) {
  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    cur.style.left = mx + "px";
    cur.style.top = my + "px";
  });

  // Hover effect: enlarge the dot and add a soft glow
  document
    .querySelectorAll("a, button, .proj-row, .bento-card, .tool-chip")
    .forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cur.classList.add("hover");
      });
      el.addEventListener("mouseleave", () => {
        cur.classList.remove("hover");
      });
    });
} else {
  // On touch devices hide the custom cursor and set body class
  document.documentElement.classList.add("no-cursor");
}

window.addEventListener("scroll", () =>
  document
    .getElementById("header")
    .classList.toggle("scrolled", window.scrollY > 60),
);

const revObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("on");
        revObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll(".reveal").forEach((el) => revObs.observe(el));

const skillObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("on");
        const fill = e.target.querySelector(".skill-bar-fill");
        setTimeout(() => (fill.style.width = e.target.dataset.w + "%"), 100);
        skillObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.2 },
);
document.querySelectorAll(".skill-block").forEach((el) => skillObs.observe(el));

const html = document.documentElement;
const btn = document.getElementById("themeBtn");
const icon = document.getElementById("themeIcon");
const label = document.getElementById("themeLabel");
let isDark = false;

const saved = localStorage.getItem("theme");
if (saved === "dark") {
  isDark = true;
  html.setAttribute("data-theme", "dark");
  icon.textContent = "🌙";
  label.textContent = "Sombre";
}

btn.addEventListener("click", () => {
  isDark = !isDark;
  html.setAttribute("data-theme", isDark ? "dark" : "light");
  icon.textContent = isDark ? "🌙" : "☀️";
  label.textContent = isDark ? "Sombre" : "Clair";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Mobile menu toggle with accessibility (focus trap + Esc)
const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");
const closeMenuBtn = document.getElementById("closeMenuBtn");
let _prevFocus = null;
let _onKeyDown = null;

function openMenu() {
  _prevFocus = document.activeElement;
  document.documentElement.classList.add("menu-open");
  menuBtn.setAttribute("aria-expanded", "true");
  mobileNav.setAttribute("aria-hidden", "false");
  // focus first focusable element in nav
  const focusable = mobileNav.querySelectorAll(
    'a, button, [tabindex]:not([tabindex="-1"])',
  );
  if (focusable.length) focusable[0].focus();

  _onKeyDown = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      closeMenu();
      return;
    }
    if (e.key === "Tab") {
      const nodes = Array.from(focusable).filter(
        (n) => !n.hasAttribute("disabled"),
      );
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  };

  document.addEventListener("keydown", _onKeyDown);
}

function closeMenu() {
  document.documentElement.classList.remove("menu-open");
  menuBtn.setAttribute("aria-expanded", "false");
  mobileNav.setAttribute("aria-hidden", "true");
  if (_onKeyDown) document.removeEventListener("keydown", _onKeyDown);
  _onKeyDown = null;
  if (_prevFocus && typeof _prevFocus.focus === "function") _prevFocus.focus();
}

if (menuBtn && mobileNav) {
  menuBtn.addEventListener("click", () => {
    const open = document.documentElement.classList.toggle("menu-open");
    if (open) openMenu();
    else closeMenu();
  });
  // Close menu when a link is clicked
  mobileNav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      closeMenu();
    }),
  );
  if (closeMenuBtn) closeMenuBtn.addEventListener("click", closeMenu);
}
