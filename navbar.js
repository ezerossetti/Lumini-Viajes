// Section indicator follows the existing navigation targets without changing them.
(() => {
  const header = document.querySelector('.navbar-editorial');
  if (!header) return;
  const links = [...header.querySelectorAll('.nav-link')];
  const entries = links.map(link => ({link, section: document.querySelector(link.getAttribute('href'))})).filter(item => item.section);
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let pending = false;
  function updateActive() {
    pending = false;
    const boundary = header.offsetHeight + 32;
    let current = entries[0];
    for (const entry of entries) {
      if (entry.section.getBoundingClientRect().top <= boundary) current = entry;
    }
    for (const entry of entries) {
      const active = entry === current;
      entry.link.classList.toggle('active', active);
      if (active) entry.link.setAttribute('aria-current','location');
      else entry.link.removeAttribute('aria-current');
    }
  }
  function queueUpdate() {if (!pending) {pending = true; requestAnimationFrame(updateActive);}}
  for (const {link, section} of entries) {
    link.addEventListener('click', event => {
      if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      history.pushState(null,'',link.getAttribute('href'));
      window.scrollTo({top:Math.max(0,window.scrollY + section.getBoundingClientRect().top - header.offsetHeight),behavior:reducedMotion.matches ? 'instant' : 'smooth'});
    });
  }
  addEventListener('scroll',queueUpdate,{passive:true});
  addEventListener('resize',queueUpdate);
  addEventListener('load',queueUpdate,{once:true});
  updateActive();
})();
