(() => {
  // Explicitly authorized preview-only text enlargement check; no browser preferences or local files.
  if(new URLSearchParams(location.search).get('text-scale')==='200')document.documentElement.style.fontSize='200%';
  const menu = document.querySelector('.chapter-menu');
  const mobile = matchMedia('(max-width:760px)');
  const links = [...document.querySelectorAll('[data-chapter-link]')];
  const header=document.querySelector('.site-header');
  function syncHeaderOffset(){
    const top=parseFloat(getComputedStyle(header).top)||0;
    document.documentElement.style.setProperty('--personal-header-offset',Math.ceil(header.getBoundingClientRect().height+top+24)+'px');
  }
  syncHeaderOffset();
  if('ResizeObserver' in window)new ResizeObserver(syncHeaderOffset).observe(header);
  const summary=menu.querySelector('summary');
  function syncMenu(){ menu.open = !mobile.matches;summary.tabIndex=mobile.matches?0:-1;summary.setAttribute('aria-disabled',String(!mobile.matches)); }
  summary.addEventListener('click',e=>{if(!mobile.matches)e.preventDefault();});
  syncMenu();
  mobile.addEventListener('change',syncMenu);
  function mark(id){links.forEach(a=>a.hash==='#'+id?a.setAttribute('aria-current','location'):a.removeAttribute('aria-current'));}
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
    const target=document.getElementById(a.hash.slice(1));
    if(!target)return;
    e.preventDefault();
    if(a.hasAttribute('data-chapter-link')&&mobile.matches)menu.open=false;
    history.pushState(null,'',a.hash);
    target.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});
    const heading=target.querySelector('h1,h2');
    if(heading)heading.focus({preventScroll:true});
    mark(target.id);
  }));
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>{
      const top=entries.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top)[0];
      if(top)mark(top.target.id);
    },{rootMargin:'-18% 0px -55% 0px',threshold:0});
    document.querySelectorAll('.story-chapter').forEach(s=>observer.observe(s));
  }
  function alignDirectLink(){
    const target=document.getElementById(location.hash.slice(1));
    if(!target?.classList.contains('story-chapter'))return;
    syncHeaderOffset();
    target.scrollIntoView({block:'start',behavior:'instant'});
    target.querySelector('h2')?.focus({preventScroll:true});
    mark(target.id);
  }
  addEventListener('hashchange',alignDirectLink);
  if(location.hash)(document.fonts?.ready||Promise.resolve()).then(alignDirectLink);
})();
