// Enhance visible content only when motion is supported and requested.
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll(".profile-card, .issue-card, .agenda-panel, .agenda-list, .support-card")
    .forEach((element) => {
      element.classList.add("reveal-pending");
      observer.observe(element);
    });
}

const newsletterDialog = document.querySelector("#newsletter-dialog");
const newsletterOpeners = document.querySelectorAll("[data-newsletter-open]");
const newsletterCloser = newsletterDialog?.querySelector("[data-newsletter-close]");
let newsletterLastTrigger = null;

const openNewsletterDialog = (trigger) => {
  if (!newsletterDialog) return;

  newsletterLastTrigger = trigger;

  if (typeof newsletterDialog.showModal === "function") {
    newsletterDialog.showModal();
  } else {
    newsletterDialog.setAttribute("open", "");
  }

  window.requestAnimationFrame(() => {
    newsletterDialog.querySelector("input")?.focus();
  });
};

const closeNewsletterDialog = () => {
  if (!newsletterDialog) return;

  if (typeof newsletterDialog.close === "function") {
    newsletterDialog.close();
  } else {
    newsletterDialog.removeAttribute("open");
    newsletterLastTrigger?.focus();
  }
};

newsletterOpeners.forEach((trigger) => {
  trigger.addEventListener("click", () => openNewsletterDialog(trigger));
});

newsletterCloser?.addEventListener("click", closeNewsletterDialog);

newsletterDialog?.addEventListener("click", (event) => {
  if (event.target === newsletterDialog) {
    closeNewsletterDialog();
  }
});

newsletterDialog?.addEventListener("close", () => {
  newsletterLastTrigger?.focus();
});


// Compact navigation shares the same behavior across all website pages.
const siteHeader = document.querySelector(".site-header");
const menuToggle = siteHeader?.querySelector(".menu-toggle");
const siteNavigation = siteHeader?.querySelector(".site-nav");

if (siteHeader && menuToggle && siteNavigation) {
  const compactNavigation = window.matchMedia("(max-width: 980px)");
  const setMenuOpen = (open) => {
    siteHeader.toggleAttribute("data-menu-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
  };

  siteHeader.setAttribute("data-menu-ready", "");
  menuToggle.addEventListener("click", () => {
    setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
  });
  siteNavigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenuOpen(false);
  });
  siteHeader.querySelector("[zeffy-form-link]")?.addEventListener("click", () => setMenuOpen(false));
  document.addEventListener("click", (event) => {
    if (!siteHeader.contains(event.target)) setMenuOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false);
      menuToggle.focus();
    }
  });
  siteHeader.addEventListener("focusout", (event) => {
    if (!siteHeader.contains(event.relatedTarget)) setMenuOpen(false);
  });
  compactNavigation.addEventListener("change", () => {
    if (!compactNavigation.matches && document.activeElement === menuToggle) {
      siteNavigation.querySelector("a")?.focus();
    }
    setMenuOpen(false);
  });
}
