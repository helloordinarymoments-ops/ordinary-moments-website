const b=document.querySelector('.menu-toggle'),n=document.querySelector('.nav');if(b&&n){b.addEventListener('click',()=>{const o=n.classList.toggle('open');b.setAttribute('aria-expanded',String(o));});n.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{n.classList.remove('open');b.setAttribute('aria-expanded','false');}));}const y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();
// Portfolio category filters
const portfolioFilters=document.querySelectorAll('.portfolio-filter');
const portfolioTiles=document.querySelectorAll('.photo-grid .tile[data-category]');
portfolioFilters.forEach(filter=>filter.addEventListener('click',()=>{
  const selected=filter.dataset.filter;
  portfolioFilters.forEach(button=>{const active=button===filter;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});
  portfolioTiles.forEach(tile=>{tile.hidden=selected!=='all'&&tile.dataset.category!==selected;});
}));
