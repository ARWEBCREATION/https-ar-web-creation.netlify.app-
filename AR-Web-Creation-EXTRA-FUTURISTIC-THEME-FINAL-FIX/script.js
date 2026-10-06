const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.textContent = open ? '×' : '☰';
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.textContent = '☰';
}));
document.getElementById('year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Subtle 3D pointer parallax for the hero scene and cards.
const hero = document.querySelector('.hero');
const core = document.querySelector('.orb-core');
if (hero && core && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  hero.addEventListener('pointermove', (e) => {
    const r = hero.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    core.style.transform =
      `translate3d(${x * 12}px,${y * 12}px,0) rotateX(${13 - y * 8}deg) rotateY(${-19 + x * 12}deg) rotateZ(${-8 + x * 3}deg)`;
  });
  hero.addEventListener('pointerleave', () => {
    core.style.transform = '';
  });
}
document.querySelectorAll('.service-card,.price-card').forEach(card => {
  card.addEventListener('pointermove', (e) => {
    if (window.innerWidth < 900 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
    card.style.transform = `perspective(700px) rotateX(${(-y*4).toFixed(2)}deg) rotateY(${(x*5).toFixed(2)}deg) translateY(-5px)`;
  });
  card.addEventListener('pointerleave', () => { card.style.transform=''; });
});


// Extra futuristic cursor energy effect
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const glow = document.createElement('div');
  glow.className = 'cursor-energy';
  document.body.appendChild(glow);
  let mx = -100, my = -100, gx = -100, gy = -100;
  window.addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; });
  const animateGlow = () => {
    gx += (mx - gx) * .12;
    gy += (my - gy) * .12;
    glow.style.transform = `translate3d(${gx}px,${gy}px,0)`;
    requestAnimationFrame(animateGlow);
  };
  animateGlow();
}
