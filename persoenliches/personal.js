(() => {
  const menu = document.querySelector('.chapter-menu');
  const mobile = matchMedia('(max-width:760px)');
  const links = [...document.querySelectorAll('[data-chapter-link]')];
  function syncMenu(){ menu.open = !mobile.matches; }
  syncMenu();
  mobile.addEventListener('change',syncMenu);
  function mark(id){links.forEach(a=>a.hash==='#'+id?a.setAttribute('aria-current','location'):a.removeAttribute('aria-current'));}
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>{
    const target=document.getElementById(a.hash.slice(1));
    if(!target)return;
    if(a.hasAttribute('data-chapter-link')&&mobile.matches)menu.open=false;
    const heading=target.querySelector('h2');
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
  addEventListener('hashchange',()=>mark(location.hash.slice(1)));
  if(location.hash)mark(location.hash.slice(1));
})();
