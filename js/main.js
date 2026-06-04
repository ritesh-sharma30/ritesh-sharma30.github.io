const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Theme toggle & color theme cycler controls
const themeToggle = document.querySelector("#themeToggle");
const colorThemeToggle = document.querySelector("#colorThemeToggle");

if (themeToggle) {
  const modeText = themeToggle.querySelector(".btn-text");
  themeToggle.addEventListener("click", () => {
    const isLight = document.documentElement.classList.toggle("light");
    if (modeText) modeText.textContent = isLight ? "Light Mode" : "Dark Mode";
    localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");
  });
}

const colorThemes = ["default", "emerald", "gold", "orange", "magenta", "indigo"];
const themeNames = {
  default: "Cyan",
  emerald: "Emerald",
  gold: "Gold",
  orange: "Orange",
  magenta: "Magenta",
  indigo: "Indigo"
};
let currentThemeIndex = 0;

if (colorThemeToggle) {
  const themeText = colorThemeToggle.querySelector(".btn-text");
  colorThemeToggle.addEventListener("click", () => {
    const currentTheme = colorThemes[currentThemeIndex];
    if (currentTheme !== "default") {
      document.documentElement.classList.remove(`theme-${currentTheme}`);
    }

    currentThemeIndex = (currentThemeIndex + 1) % colorThemes.length;
    const nextTheme = colorThemes[currentThemeIndex];

    if (nextTheme !== "default") {
      document.documentElement.classList.add(`theme-${nextTheme}`);
    }

    if (themeText) themeText.textContent = `${themeNames[nextTheme]} Theme`;
    localStorage.setItem("portfolio-color-theme", nextTheme);
  });
}

// Restore saved user preferences
const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "light") {
  document.documentElement.classList.add("light");
  if (themeToggle) {
    const modeText = themeToggle.querySelector(".btn-text");
    if (modeText) modeText.textContent = "Light Mode";
  }
} else {
  if (themeToggle) {
    const modeText = themeToggle.querySelector(".btn-text");
    if (modeText) modeText.textContent = "Dark Mode";
  }
}

const savedColorTheme = localStorage.getItem("portfolio-color-theme");
if (savedColorTheme && colorThemes.includes(savedColorTheme)) {
  currentThemeIndex = colorThemes.indexOf(savedColorTheme);
  if (savedColorTheme !== "default") {
    document.documentElement.classList.add(`theme-${savedColorTheme}`);
  }
  if (colorThemeToggle) {
    const themeText = colorThemeToggle.querySelector(".btn-text");
    if (themeText) themeText.textContent = `${themeNames[savedColorTheme]} Theme`;
  }
}

const roles = [
  "Software Engineer",
  "QA Analyst",
  "LeetCode Knight",
  "Full-Stack Developer",
  "NLP Enthusiast"
];

const typewriter = document.querySelector("#typewriter");
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function runTypewriter() {
  if (!typewriter || prefersReducedMotion) return;
  const word = roles[roleIndex];
  typewriter.textContent = word.slice(0, charIndex);

  if (!deleting && charIndex < word.length) {
    charIndex += 1;
    setTimeout(runTypewriter, 45); // Speeded up from 75
    return;
  }

  if (!deleting && charIndex === word.length) {
    deleting = true;
    setTimeout(runTypewriter, 1200);
    return;
  }

  if (deleting && charIndex > 0) {
    charIndex -= 1;
    setTimeout(runTypewriter, 22); // Speeded up from 42
    return;
  }

  deleting = false;
  roleIndex = (roleIndex + 1) % roles.length;
  setTimeout(runTypewriter, 180);
}

runTypewriter();

const header = document.querySelector("#siteHeader");
const progressBar = document.querySelector("#progressBar");

function updateScrollState() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  header?.classList.toggle("scrolled", scrollTop > 30);
  if (progressBar) progressBar.style.width = `${progress}%`;
}

window.addEventListener("scroll", updateScrollState, { passive: true });
updateScrollState();

const navToggle = document.querySelector("#navToggle");
const navLinks = document.querySelector("#navLinks");

navToggle?.addEventListener("click", () => {
  const isOpen = navLinks?.classList.toggle("open");
  navToggle.classList.toggle("active", isOpen);
  navToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
  document.body.classList.toggle("menu-open", Boolean(isOpen));
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle?.classList.remove("active");
    navToggle?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  },
  { rootMargin: "-8% 0px -8% 0px", threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

const printableElements = document.querySelectorAll(
  [
    ".section-heading h2",
    ".about-copy p",
    ".timeline-card h3",
    ".timeline-card p",
    ".timeline-card li",
    ".project-body h3",
    ".project-body > p:not(.project-date)",
    ".project-body li",
    ".badge-card strong",
    ".badge-card span",
    ".education-card h3",
    ".education-card p",
    ".contact-panel > a",
    ".contact-panel > span"
  ].join(",")
);

function printText(element) {
  if (element.classList.contains("is-printing")) return;
  const visibleSpan = element.querySelector(".print-visible");
  if (!visibleSpan) return;
  const text = element.dataset.printText || "";
  const token = Number(element.dataset.printToken || 0) + 1;
  let index = 0;
  element.dataset.printToken = String(token);
  element.dataset.printed = "false";
  visibleSpan.textContent = "";
  element.classList.add("is-printing");
  element.classList.remove("printed");

  function typeNext() {
    if (element.dataset.printToken !== String(token)) return;
    visibleSpan.textContent = text.slice(0, index);
    index += 1;
    if (index <= text.length) {
      setTimeout(typeNext, 6); // Speeded up from 13
      return;
    }
    element.classList.remove("is-printing");
    element.classList.add("printed");
    element.dataset.printed = "true";
  }

  typeNext();
}

function resetPrintedText(element) {
  if (!element.dataset.printText) return;
  element.dataset.printToken = String(Number(element.dataset.printToken || 0) + 1);
  element.dataset.printed = "false";
  const visibleSpan = element.querySelector(".print-visible");
  if (visibleSpan) visibleSpan.textContent = "";
  element.classList.remove("is-printing", "printed");
}

if (!prefersReducedMotion) {
  const printObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          printText(entry.target);
        } else {
          resetPrintedText(entry.target);
        }
      });
    },
    { rootMargin: "-8% 0px -8% 0px", threshold: 0 }
  );

  const initPrintable = () => {
    printableElements.forEach((element) => {
      const originalText = element.textContent.trim();
      if (!originalText) return;
      element.dataset.printText = originalText;
      element.innerHTML = `
        <span class="print-container">
          <span class="print-ghost">${originalText}</span>
          <span class="print-visible"></span>
        </span>
      `;
      element.classList.add("print-on-scroll");
      printObserver.observe(element);
    });
  };

  if (document.fonts) {
    document.fonts.ready.then(initPrintable);
  } else {
    setTimeout(initPrintable, 300);
  }
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const element = entry.target;
      const target = Number(element.getAttribute("data-counter"));
      const duration = 1200;
      const formatCounter = (value) =>
        target === 1 ? `${Math.max(value, 1)}+` : `${value}${target === 50 ? "+" : ""}`;

      if (!entry.isIntersecting) {
        element.dataset.countToken = String(Number(element.dataset.countToken || 0) + 1);
        element.dataset.counting = "false";
        element.textContent = "0";
        return;
      }

      if (element.dataset.counting === "true") return;
      const token = Number(element.dataset.countToken || 0) + 1;
      const start = performance.now();
      element.dataset.countToken = String(token);
      element.dataset.counting = "true";

      function tick(now) {
        if (element.dataset.countToken !== String(token)) return;
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.floor(eased * target);
        element.textContent = formatCounter(value);
        if (progress < 1) requestAnimationFrame(tick);
        else element.dataset.counting = "false";
      }

      requestAnimationFrame(tick);
    });
  },
  { rootMargin: "-10% 0px -10% 0px", threshold: 0.38 }
);

document.querySelectorAll("[data-counter]").forEach((el) => counterObserver.observe(el));

const ringObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const card = entry.target;
      const percent = Number(card.getAttribute("data-percent"));
      const circle = card.querySelector(".ring-progress");
      const circumference = 301.59;
      if (!circle) return;
      circle.style.strokeDashoffset = entry.isIntersecting
        ? `${circumference - (circumference * percent) / 100}`
        : `${circumference}`;
    });
  },
  { rootMargin: "-10% 0px -10% 0px", threshold: 0.4 }
);

document.querySelectorAll(".skill-ring").forEach((card) => ringObserver.observe(card));

const codeTyper = document.querySelector("#codeTyper");
const codeLines = [
  "function ship(product) {",
  "  validate(requirements);",
  "  design(databaseSchema);",
  "  test(criticalPaths);",
  "  return release.withConfidence();",
  "}"
].join("\n");

const codeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!codeTyper) return;
      const visibleSpan = codeTyper.querySelector(".print-visible");
      if (!visibleSpan) return;

      if (!entry.isIntersecting) {
        codeTyper.dataset.codeToken = String(Number(codeTyper.dataset.codeToken || 0) + 1);
        visibleSpan.textContent = "";
        codeTyper.dataset.typing = "false";
        return;
      }
      if (codeTyper.dataset.typing === "true") return;
      const token = Number(codeTyper.dataset.codeToken || 0) + 1;
      let index = 0;
      codeTyper.dataset.codeToken = String(token);
      codeTyper.dataset.typing = "true";
      visibleSpan.textContent = "";
      const interval = setInterval(() => {
        if (codeTyper.dataset.codeToken !== String(token)) {
          clearInterval(interval);
          return;
        }
        visibleSpan.textContent = codeLines.slice(0, index);
        index += 1;
        if (index > codeLines.length) {
          codeTyper.dataset.typing = "false";
          clearInterval(interval);
        }
      }, prefersReducedMotion ? 1 : 12); // Speeded up from 28
    });
  },
  { rootMargin: "-10% 0px -10% 0px", threshold: 0 } // Changed threshold to 0 for responsive resets
);

if (codeTyper) {
  codeTyper.innerHTML = `
    <span class="print-container">
      <span class="print-ghost">${codeLines}</span>
      <span class="print-visible"></span>
    </span>
  `;
  codeObserver.observe(codeTyper);
}

document.querySelectorAll(".tilt-card").forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    if (prefersReducedMotion) return;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 12;
    const rotateX = ((y / rect.height) - 0.5) * -12;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

const cursorDot = document.querySelector("#cursorDot");
const cursorRing = document.querySelector("#cursorRing");
let ringX = 0;
let ringY = 0;
let mouseX = 0;
let mouseY = 0;

if (cursorDot && cursorRing && !prefersReducedMotion) {
  window.addEventListener(
    "mousemove",
    (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    },
    { passive: true }
  );

  function animateCursor() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateCursor);
  }

  animateCursor();
}

function hexToRgb(hex) {
  let cleaned = hex.replace("#", "").trim();
  if (cleaned.length === 3) {
    cleaned = cleaned.split("").map((c) => c + c).join("");
  }
  const r = parseInt(cleaned.substring(0, 2), 16) || 0;
  const g = parseInt(cleaned.substring(2, 4), 16) || 0;
  const b = parseInt(cleaned.substring(4, 6), 16) || 0;
  return { r, g, b };
}

function setupMatrixCanvas() {
  const canvas = document.querySelector("#matrixCanvas");
  if (!canvas || prefersReducedMotion) return;
  const ctx = canvas.getContext("2d");
  let columns = [];
  const fontSize = 14;

  function resize() {
    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;
    ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    columns = Array.from({ length: Math.ceil(window.innerWidth / fontSize) }, () =>
      Math.floor(Math.random() * -window.innerHeight)
    );
  }

  function draw() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.font = `${fontSize}px "JetBrains Mono", Consolas, monospace`;

    const style = getComputedStyle(document.documentElement);
    const greenHex = style.getPropertyValue("--green").trim() || "#00ff88";
    const greenRgb = hexToRgb(greenHex);

    columns.forEach((y, index) => {
      const trailLength = 7;
      for (let i = 0; i < trailLength; i++) {
        const trailY = y - i * fontSize;
        if (trailY < 0 || trailY > window.innerHeight) continue;

        const opacity = (1 - i / trailLength) * 0.75;
        ctx.fillStyle = `rgba(${greenRgb.r}, ${greenRgb.g}, ${greenRgb.b}, ${opacity})`;

        const text = Math.random() > 0.5 ? "1" : "0";
        const x = index * fontSize;
        ctx.fillText(text, x, trailY);
      }

      if (y > window.innerHeight && Math.random() > 0.98) {
        columns[index] = 0;
      } else {
        columns[index] = y + fontSize;
      }
    });

    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener("resize", resize);
  draw();
}

function setupParticleCanvas() {
  const canvas = document.querySelector("#particleCanvas");
  if (!canvas || prefersReducedMotion) return;
  const ctx = canvas.getContext("2d");
  let particles = [];

  function resize() {
    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;
    ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    const count = Math.min(85, Math.max(34, Math.floor(window.innerWidth / 18)));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45
    }));
  }

  function draw() {
    const style = getComputedStyle(document.documentElement);
    const greenHex = style.getPropertyValue("--green").trim() || "#00ff88";
    const blueHex = style.getPropertyValue("--blue").trim() || "#00d4ff";
    const greenRgb = hexToRgb(greenHex);
    const blueRgb = hexToRgb(blueHex);

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    particles.forEach((particle, index) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1;
      if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -1;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${blueRgb.r}, ${blueRgb.g}, ${blueRgb.b}, 0.55)`;
      ctx.fill();

      for (let next = index + 1; next < particles.length; next += 1) {
        const other = particles[next];
        const dx = particle.x - other.x;
        const dy = particle.y - other.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 130) {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = `rgba(${greenRgb.r}, ${greenRgb.g}, ${greenRgb.b}, ${0.16 * (1 - distance / 130)})`;
          ctx.stroke();
        }
      }
    });

    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener("resize", resize);
  draw();
}

setupMatrixCanvas();
setupParticleCanvas();

const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = encodeURIComponent(formData.get("name") || "");
  const email = encodeURIComponent(formData.get("email") || "");
  const message = encodeURIComponent(formData.get("message") || "");
  const subject = `Portfolio message from ${name}`;
  const body = `Name: ${name}%0AEmail: ${email}%0A%0A${message}`;
  if (formStatus) formStatus.textContent = "Opening your email client...";
  window.location.href = `mailto:riteshsharma200106@gmail.com?subject=${subject}&body=${body}`;
});

const year = document.querySelector("#year");
if (year) year.textContent = String(new Date().getFullYear());
