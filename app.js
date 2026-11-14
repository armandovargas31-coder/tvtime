const track=document.getElementById('appTrack');
const prev=document.getElementById('prev'), next=document.getElementById('next');
const dots=document.getElementById('carouselDots');
const cards=[...document.querySelectorAll('.app-card')];
const visibleCount=()=>window.innerWidth<760?1:window.innerWidth<1100?2:4;
function cardStep(){const c=cards.find(x=>x.offsetParent!==null);return c?c.getBoundingClientRect().width+12:267}
function updateDots(){const count=Math.max(1,Math.ceil(track.scrollWidth/Math.max(1,track.clientWidth)));dots.innerHTML='';for(let i=0;i<count;i++){const b=document.createElement('button');b.setAttribute('aria-label','Ir al grupo '+(i+1));b.className=i===Math.round(track.scrollLeft/Math.max(1,track.clientWidth))?'active':'';b.onclick=()=>track.scrollTo({left:i*track.clientWidth,behavior:'smooth'});dots.appendChild(b)}}
prev.addEventListener('click',()=>track.scrollBy({left:-cardStep()*visibleCount(),behavior:'smooth'}));
next.addEventListener('click',()=>track.scrollBy({left:cardStep()*visibleCount(),behavior:'smooth'}));
track.addEventListener('scroll',()=>{const i=Math.round(track.scrollLeft/Math.max(1,track.clientWidth));[...dots.children].forEach((d,n)=>d.classList.toggle('active',n===i))});
window.addEventListener('resize',updateDots);updateDots();

document.querySelectorAll('.nav-link[href="#aplicaciones"],.btn-primary').forEach(a=>a.addEventListener('click',()=>{document.querySelectorAll('.category-card').forEach(x=>x.classList.remove('selected'));document.querySelector('.category-card[data-category="TV"]').classList.add('selected');cards.forEach(c=>c.style.display='flex');document.getElementById('filterNote').textContent='';}));
const searchPanel=document.getElementById('searchPanel'), searchInput=document.getElementById('searchInput');
document.getElementById('searchToggle').onclick=()=>{searchPanel.classList.toggle('open');if(searchPanel.classList.contains('open'))searchInput.focus()};
document.getElementById('closeSearch').onclick=()=>searchPanel.classList.remove('open');
searchInput.addEventListener('input',()=>{const q=searchInput.value.toLowerCase();cards.forEach(c=>c.style.display=c.dataset.name.toLowerCase().includes(q)?'flex':'none');document.getElementById('filterNote').textContent=q?'Resultados de búsqueda: '+cards.filter(c=>c.style.display!=='none').length:'';track.scrollTo({left:0,behavior:'smooth'});updateDots()});
document.getElementById('mobileMenu').onclick=()=>document.querySelector('.main-nav').classList.toggle('open');
document.querySelectorAll('.main-nav a').forEach(a=>a.addEventListener('click',()=>document.querySelector('.main-nav').classList.remove('open')));


// Navegación superior: desplazamiento suave y resaltado de la sección elegida.
document.querySelectorAll('.main-nav a.nav-link[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    if (link.id === 'codesOpen') {
      openCodesModal();
      return;
    }
    document.querySelectorAll('.main-nav .nav-link').forEach(item => item.classList.remove('active'));
    link.classList.add('active');
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    target.classList.remove('section-highlight');
    void target.offsetWidth;
    target.classList.add('section-highlight');
    window.setTimeout(() => target.classList.remove('section-highlight'), 1900);
    document.getElementById('mobileMenu')?.classList.remove('open');
    document.querySelector('.main-nav')?.classList.remove('open');
  });
});


// Ventana emergente con la guía de instalación.
const howModal = document.getElementById('howModal');
const howOpen = document.getElementById('howToOpen');
const closeHowModal = () => {
  howModal.classList.remove('visible');
  howModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  howOpen?.focus();
};
howOpen?.addEventListener('click', () => {
  howModal.classList.add('visible');
  howModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  howModal.querySelector('.how-modal-close')?.focus();
});
howModal?.querySelectorAll('[data-how-close]').forEach(el => el.addEventListener('click', closeHowModal));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && howModal?.classList.contains('visible')) closeHowModal();
});

// Ventana de códigos de descarga.
const codesModal = document.getElementById('codigos-descarga');
const codesOpen = document.getElementById('codesOpen');
const closeCodesModal = () => {
  codesModal?.classList.remove('visible');
  codesModal?.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  codesOpen?.focus();
};
const openCodesModal = () => {
  if (!codesModal) return;
  codesModal.classList.add('visible');
  codesModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  codesModal.querySelector('.how-modal-close')?.focus();
};
codesOpen?.addEventListener('click', event => {
  event.preventDefault();
  document.querySelectorAll('.main-nav .nav-link').forEach(item => item.classList.remove('active'));
  codesOpen.classList.add('active');
  document.querySelector('.main-nav')?.classList.remove('open');
  openCodesModal();
});
codesModal?.querySelectorAll('[data-codes-close]').forEach(el => el.addEventListener('click', closeCodesModal));
codesModal?.querySelectorAll('[data-copy-code]').forEach(button => {
  button.addEventListener('click', async () => {
    const code = button.dataset.copyCode;
    try {
      await navigator.clipboard.writeText(code);
      button.textContent = '¡Copiado!';
      window.setTimeout(() => button.textContent = 'Copiar', 1400);
    } catch {
      button.textContent = code;
    }
  });
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && codesModal?.classList.contains('visible')) closeCodesModal();
});
