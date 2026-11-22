const b=document.querySelector('.menu-toggle'),n=document.querySelector('.nav');if(b&&n){b.addEventListener('click',()=>{const o=n.classList.toggle('open');b.setAttribute('aria-expanded',String(o));});n.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{n.classList.remove('open');b.setAttribute('aria-expanded','false');}));}const y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();
// Portfolio category filters
const portfolioFilters=document.querySelectorAll('.portfolio-filter');
const portfolioTiles=document.querySelectorAll('.photo-grid .tile[data-category]');
portfolioFilters.forEach(filter=>filter.addEventListener('click',()=>{
  const selected=filter.dataset.filter;
  portfolioFilters.forEach(button=>{const active=button===filter;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});
  portfolioTiles.forEach(tile=>{tile.hidden=selected!=='all'&&tile.dataset.category!==selected;});
}));

// Hero photo carousel: advance gently, pause while hovered or focused.
const heroRail=document.querySelector('.hero-photo-rail');
if(heroRail){
  const heroSlides=heroRail.querySelectorAll('.hero-slide');
  const prefersReducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let heroIndex=0,heroTimer=null;
  const advanceHero=()=>{heroIndex=(heroIndex+1)%heroSlides.length;heroRail.scrollTo({left:heroSlides[heroIndex].offsetLeft-heroRail.offsetLeft,behavior:'smooth'});};
  const startHero=()=>{if(!prefersReducedMotion&&!heroTimer)heroTimer=setInterval(advanceHero,6500);};
  const stopHero=()=>{if(heroTimer){clearInterval(heroTimer);heroTimer=null;}};
  heroRail.addEventListener('mouseenter',stopHero);
  heroRail.addEventListener('mouseleave',startHero);
  heroRail.addEventListener('focusin',stopHero);
  heroRail.addEventListener('focusout',startHero);
  heroRail.addEventListener('scroll',()=>{let closest=0,dist=Infinity;heroSlides.forEach((slide,i)=>{const d=Math.abs(slide.offsetLeft-heroRail.offsetLeft-heroRail.scrollLeft);if(d<dist){dist=d;closest=i;}});heroIndex=closest;},{passive:true});
  startHero();
}
