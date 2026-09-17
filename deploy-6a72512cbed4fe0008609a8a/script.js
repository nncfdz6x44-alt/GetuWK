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
