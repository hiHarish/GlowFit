const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const modal = document.getElementById('bookingModal');
const form = document.getElementById('bookingForm');

menuBtn?.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.mobile-menu a').forEach(a => {
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuBtn?.setAttribute('aria-expanded','false');
  });
});

function openBooking(){
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
  setTimeout(()=>modal.querySelector('input')?.focus(),80);
}
function closeBooking(){
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}
document.querySelectorAll('[data-open-booking]').forEach(b => b.addEventListener('click', openBooking));
document.querySelectorAll('[data-close-booking]').forEach(b => b.addEventListener('click', closeBooking));
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeBooking(); });

form?.addEventListener('submit', e => {
  e.preventDefault();
  const btn = form.querySelector('button[type=submit]');
  btn.textContent = 'Thank you — we will call you →';
  btn.disabled = true;
  setTimeout(() => {
    form.reset();
    btn.textContent = 'Request Consultation →';
    btn.disabled = false;
    closeBooking();
  }, 1700);
});

const track = document.getElementById('treatmentTrack');
document.querySelector('[data-slide="next"]')?.addEventListener('click', () => {
  track.scrollBy({left: track.clientWidth * .72, behavior:'smooth'});
});
document.querySelector('[data-slide="prev"]')?.addEventListener('click', () => {
  track.scrollBy({left: -track.clientWidth * .72, behavior:'smooth'});
});

// Small premium interaction: highlight the current desktop navigation section.
const sections = [...document.querySelectorAll('main section[id], footer[id]')];
const navLinks = [...document.querySelectorAll('.desktop-nav a')];
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#'+entry.target.id));
    }
  });
},{rootMargin:'-35% 0px -55% 0px'});
sections.forEach(s => observer.observe(s));
