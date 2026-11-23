const b=document.querySelector('.menu-toggle'),n=document.querySelector('.nav');if(b&&n){b.addEventListener('click',()=>{const o=n.classList.toggle('open');b.setAttribute('aria-expanded',String(o));});n.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{n.classList.remove('open');b.setAttribute('aria-expanded','false');}));}const y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();
// Portfolio category filters
const portfolioFilters=document.querySelectorAll('.portfolio-filter');
const portfolioTiles=document.querySelectorAll('.photo-grid .tile[data-category]');
portfolioFilters.forEach(filter=>filter.addEventListener('click',()=>{
  const selected=filter.dataset.filter;
  portfolioFilters.forEach(button=>{const active=button===filter;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});
  portfolioTiles.forEach(tile=>{tile.hidden=selected!=='all'&&tile.dataset.category!==selected;});
}));


// Soft fade hero slideshow, with controls and hover/focus pause.
const heroCarousel=document.querySelector('.hero-fade-carousel');
if(heroCarousel){
  const slides=[...heroCarousel.querySelectorAll('.hero-slide')];
  const dots=[...document.querySelectorAll('.hero-carousel-dot')];
  const prev=document.querySelector('.hero-carousel-prev'),next=document.querySelector('.hero-carousel-next');
  const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let index=0,timer=null;
  const show=(n)=>{index=(n+slides.length)%slides.length;slides.forEach((s,i)=>s.classList.toggle('active',i===index));dots.forEach((d,i)=>{d.classList.toggle('active',i===index);d.setAttribute('aria-pressed',String(i===index));});};
  const stop=()=>{if(timer){clearInterval(timer);timer=null;}};
  const start=()=>{if(!reduceMotion&&!timer)timer=setInterval(()=>show(index+1),6500);};
  prev?.addEventListener('click',()=>{stop();show(index-1);start();});
  next?.addEventListener('click',()=>{stop();show(index+1);start();});
  dots.forEach((dot,i)=>dot.addEventListener('click',()=>{stop();show(i);start();}));
  heroCarousel.addEventListener('mouseenter',stop);heroCarousel.addEventListener('mouseleave',start);
  heroCarousel.addEventListener('focusin',stop);heroCarousel.addEventListener('focusout',start);
  show(0);start();
}
