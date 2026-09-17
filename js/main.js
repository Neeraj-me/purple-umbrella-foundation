// Purple Umbrella Foundation — shared site behavior

document.addEventListener("DOMContentLoaded", function () {
  /* Mobile nav toggle */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var isOpen = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    links.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Mark active nav link based on current page */
  var current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(function (link) {
    var href = link.getAttribute("href");
    if (href === current || (current === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });

  /* Simple accordion (used on Resources / FAQ sections) */
  document.querySelectorAll("[data-accordion-trigger]").forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      var item = trigger.closest(".accordion-item");
      var body = item.querySelector("[data-accordion-body]");
      var isOpen = item.classList.toggle("is-open");
      if (body) {
        body.style.display = isOpen ? "block" : "none";
      }
    });
  });

  /* Demo form handling — these forms have no backend yet.
     Swap the fetch/action below for a real endpoint (Formspree, Netlify Forms,
     your CRM, etc.) — see README.md for details. */
  document.querySelectorAll("[data-demo-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = form.querySelector("[data-form-status]");
      if (note) {
        note.textContent =
          "Thanks! This form isn't connected to a backend yet — see README.md to hook it up so submissions actually reach you.";
        note.style.display = "block";
      }
      form.reset();
    });
  });

  /* Footer year */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* Subtle scroll-reveal so sections feel alive as you scroll, instead of
     the whole page appearing at once. Applies automatically to existing
     component classes — no per-page markup changes needed. */
  var revealTargets = document.querySelectorAll(
    ".card, .section-head, .cta-banner, .theme-banner, .stepper-item, .journey-item, .impact-panel, .sdg-chip"
  );
  if (revealTargets.length) {
    revealTargets.forEach(function (el) { el.classList.add("reveal"); });
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      revealTargets.forEach(function (el) { io.observe(el); });
    } else {
      revealTargets.forEach(function (el) { el.classList.add("is-visible"); });
    }
  }
});
