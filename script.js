const b=document.querySelector('.menu-toggle'),n=document.querySelector('.nav');if(b&&n){b.addEventListener('click',()=>{const o=n.classList.toggle('open');b.setAttribute('aria-expanded',String(o));});n.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{n.classList.remove('open');b.setAttribute('aria-expanded','false');}));}const y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();
// Portfolio category filters
const portfolioFilters=document.querySelectorAll('.portfolio-filter');
const portfolioTiles=document.querySelectorAll('.photo-grid .tile[data-category]');
portfolioFilters.forEach(filter=>filter.addEventListener('click',()=>{
  const selected=filter.dataset.filter;
  portfolioFilters.forEach(button=>{const active=button===filter;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});
  portfolioTiles.forEach(tile=>{tile.hidden=selected!=='all'&&tile.dataset.category!==selected;});
}));


// Album-style hero page-turn slideshow.
const heroCarousel=document.querySelector('.hero-fade-carousel');
if(heroCarousel){
  const slides=[...heroCarousel.querySelectorAll('.hero-slide')];
  const dots=[...document.querySelectorAll('.hero-carousel-dot')];
  const prev=document.querySelector('.hero-carousel-prev'),next=document.querySelector('.hero-carousel-next');
  const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let index=0,timer=null,turnTimer=null,busy=false;
  const updateDots=()=>dots.forEach((d,i)=>{d.classList.toggle('active',i===index);d.setAttribute('aria-pressed',String(i===index));});
  const clearTurn=()=>{if(turnTimer){clearTimeout(turnTimer);turnTimer=null;}};
  const cleanup=()=>slides.forEach(s=>s.classList.remove('page-turning','page-under'));
  const show=(n)=>{
    if(busy||slides.length<2)return;
    const target=(n+slides.length)%slides.length;
    if(target===index)return;
    if(reduceMotion){index=target;slides.forEach((s,i)=>s.classList.toggle('active',i===index));updateDots();return;}
    busy=true;clearTurn();cleanup();
    const outgoing=slides[index],incoming=slides[target];
    incoming.classList.add('page-under','active');
    outgoing.classList.add('page-turning');
    index=target;updateDots();
    turnTimer=setTimeout(()=>{outgoing.classList.remove('active','page-turning');incoming.classList.remove('page-under');busy=false;},1100);
  };
  const stop=()=>{if(timer){clearInterval(timer);timer=null;}};
  const start=()=>{if(!reduceMotion&&!timer)timer=setInterval(()=>show(index+1),6500);};
  prev?.addEventListener('click',()=>{stop();show(index-1);start();});
  next?.addEventListener('click',()=>{stop();show(index+1);start();});
  dots.forEach((dot,i)=>dot.addEventListener('click',()=>{stop();show(i);start();}));
  heroCarousel.addEventListener('mouseenter',stop);heroCarousel.addEventListener('mouseleave',start);
  heroCarousel.addEventListener('focusin',stop);heroCarousel.addEventListener('focusout',start);
  show(0);start();
}
