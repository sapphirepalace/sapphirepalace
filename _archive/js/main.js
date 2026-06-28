const galleryImgs = [
  {src: 'assets/images/gallery-1.jpg', cap: 'Sabbi Grand Hall'},
  {src: 'assets/images/gallery-2.jpg', cap: 'Floral Elegance'},
  {src: 'assets/images/gallery-3.jpg', cap: 'Banquet Dining'},
  {src: 'assets/images/gallery-4.jpg', cap: 'Bridal Stage'},
  {src: 'assets/images/gallery-5.jpg', cap: 'Luxury Décor'},
  {src: 'assets/images/gallery-6.jpg', cap: 'Mehndi Setup'},
  {src: 'assets/images/gallery-7.jpg', cap: 'Garden Theme'},
  {src: 'assets/images/gallery-8.jpg', cap: 'Waterfall Feature'},
  {src: 'assets/images/gallery-9.jpg', cap: 'Traditional Art'},
  {src: 'assets/images/gallery-10.jpg', cap: 'VIP Lounge'}
];
let curImg = 0;
function openLightbox(i) {
  curImg = i;
  document.getElementById('lightboxImg').src = galleryImgs[i].src;
  document.getElementById('lightboxCaption').textContent = galleryImgs[i].cap;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
function changeLightbox(d) {
  curImg = (curImg + d + galleryImgs.length) % galleryImgs.length;
  document.getElementById('lightboxImg').src = galleryImgs[curImg].src;
  document.getElementById('lightboxCaption').textContent = galleryImgs[curImg].cap;
}
document.getElementById('lightbox').addEventListener('click', function(e) {
  if(e.target === this) closeLightbox();
});
document.addEventListener('keydown', function(e) {
  if(e.key === 'Escape') closeLightbox();
  if(e.key === 'ArrowLeft') changeLightbox(-1);
  if(e.key === 'ArrowRight') changeLightbox(1);
});
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 80);
  let cur = '';
  document.querySelectorAll('section[id]').forEach(s => { if(window.scrollY >= s.offsetTop - 120) cur = s.id; });
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
});
function toggleMenu() { document.getElementById('mobileMenu').classList.toggle('open'); }
function toggleFaq(el) {
  const item = el.parentElement;
  document.querySelectorAll('.faq-item').forEach(i => { if(i !== item) i.classList.remove('open'); });
  item.classList.toggle('open');
}
const obs = new IntersectionObserver(entries => entries.forEach(e => {
  if(e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
}), {threshold: 0.1, rootMargin: '0px 0px -40px 0px'});
document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => obs.observe(el));
function submitForm() {
  const name = document.getElementById('bName').value.trim();
  const phone = document.getElementById('bPhone').value.trim();
  const event = document.getElementById('bEvent').value;
  const hall = document.getElementById('bHall').value;
  const msg = document.getElementById('formMsg');
  if(!name || !phone || !event || !hall) { msg.textContent = '✦ Please fill in all required fields.'; msg.style.color = '#ff9090'; return; }
  msg.textContent = '✦ Thank you! Your inquiry has been received. We will contact you within 24 hours.';
  msg.style.color = 'var(--gold)';
  setTimeout(() => { msg.textContent = ''; }, 6000);
}
function openWA(e) {
  e.preventDefault();
  const name = document.getElementById('bName').value || 'Guest';
  const event = document.getElementById('bEvent').value || 'event';
  const hall = document.getElementById('bHall').value || 'hall';
  const date = document.getElementById('bDate').value || 'TBD';
  const guests = document.getElementById('bGuests').value || 'TBD';
  const msg = document.getElementById('bMsg').value || '';
  const text = `Assalamu Alaikum! I'm ${name} and I'd like to inquire about booking Sapphire Palace Event Complex.\n\nEvent: ${event}\nHall: ${hall}\nDate: ${date}\nGuests: ${guests}\n${msg ? 'Message: ' + msg : ''}`;
  window.open('https://wa.me/923210512345?text=' + encodeURIComponent(text), '_blank');
}
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if(t) { e.preventDefault(); t.scrollIntoView({behavior: 'smooth', block: 'start'}); }
  });
});