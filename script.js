window.addEventListener("load", () => {
  setTimeout(
    () => document.getElementById("loader").classList.add("done"),
    2200,
  );
});

const cur = document.getElementById("cursor");
let mx = 0,
  my = 0;

document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  cur.style.left = mx + "px";
  cur.style.top = my + "px";
});

// Hover effect: enlarge the dot and add a soft glow instead of the ring
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
