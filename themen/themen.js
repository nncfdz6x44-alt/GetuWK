(() => {
  const topics = [...document.querySelectorAll('.programme-topic')];
  const status = document.querySelector('.programme-status');
  const tools = document.querySelector('.programme-tools');
  const header = document.querySelector('.site-header');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

  function setOpen(topic, open, animate = true, preservePosition = false) {
    const button = topic.querySelector('[data-topic-toggle]');
    const panel = document.getElementById(button.getAttribute('aria-controls'));
    const anchorTop = preservePosition && !open ? button.getBoundingClientRect().top : null;
    // When a panel closes while it contains focus, return focus to its control.
    if (!open && panel.contains(document.activeElement)) button.focus({ preventScroll: true });
    button.setAttribute('aria-expanded', String(open));
    topic.toggleAttribute('data-open', open);
    panel.hidden = !open;
    panel.classList.toggle('is-opening', open && animate && !reducedMotion.matches);
    // Closing a long chapter keeps its control at the same visible position.
    // Batch controls deliberately retain their own toolbar position instead.
    if (anchorTop !== null) {
      const difference = button.getBoundingClientRect().top - anchorTop;
      if (Math.abs(difference) > 1) window.scrollTo({ top: Math.max(0, window.scrollY + difference), behavior: 'instant' });
    }
  }

  function announce() {
    const count = topics.filter(topic => topic.hasAttribute('data-open')).length;
    status.textContent = `${count} von 13 Themen geöffnet.`;
  }

  function headerOffset() {
    const offset = Math.ceil(header.getBoundingClientRect().height + parseFloat(getComputedStyle(header).top) + 8);
    document.documentElement.style.setProperty('--programme-header-offset', `${offset}px`);
  }

  function openHash() {
    let slug;
    try { slug = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    const topic = topics.find(item => item.id === slug);
    if (!topic) return;
    setOpen(topic, true, false);
    // Only direct navigation scrolls. Ordinary accordion interactions never auto-scroll.
    requestAnimationFrame(() => {
      const offset = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--programme-header-offset')) || 112;
      window.scrollTo({ top: Math.max(0, topic.getBoundingClientRect().top + window.scrollY - offset - 8), behavior: 'instant' });
    });
    announce();
  }

  topics.forEach(topic => {
    const button = topic.querySelector('[data-topic-toggle]');
    button.disabled = false;
    setOpen(topic, false, false);
    button.addEventListener('click', () => { setOpen(topic, button.getAttribute('aria-expanded') !== 'true', true, true); announce(); });
    topic.querySelector('.programme-panel').addEventListener('animationend', event => event.currentTarget.classList.remove('is-opening'));
    topic.querySelector('.programme-permalink a').addEventListener('click', () => {
      // A repeated direct link has no hashchange event, but still opens its chapter.
      setOpen(topic, true, false);
    });
  });
  tools.hidden = false;
  tools.querySelector('[data-open-all]').addEventListener('click', () => { topics.forEach(topic => setOpen(topic, true, false)); announce(); });
  tools.querySelector('[data-close-all]').addEventListener('click', () => { topics.forEach(topic => setOpen(topic, false, false)); announce(); });
  headerOffset();
  if ('ResizeObserver' in window) new ResizeObserver(headerOffset).observe(header);
  window.addEventListener('resize', headerOffset);
  window.addEventListener('hashchange', openHash);
  window.addEventListener('pageshow', openHash);
  openHash();
})();
