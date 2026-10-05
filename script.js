const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
  }
);

document
  .querySelectorAll(".profile-card, .issue-card, .voice-card, .event-card, .agenda-panel, .agenda-list, .support-card")
  .forEach((element) => observer.observe(element));


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
