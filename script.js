// Event dates verified against organizers on 2026-09-28. Dates describe the event, not a confirmed departure.
const events = [
 {day:"2–12",month:"OCT",year:"2026",title:"Oktoberfest",place:"Villa General Belgrano · Córdoba",detail:"Programación del 2 al 4 y del 9 al 12 de octubre.",end:"2026-10-13T06:00:00-03:00",source:"https://oktoberfestargentina.com.ar/grilla2026/"},
 {day:"—",month:"2027",year:"",title:"Festival Nacional de Jesús María",place:"Jesús María · Córdoba",detail:"Fecha 2027 pendiente de confirmación oficial.",end:null,source:"https://festival.org.ar/"},
 {day:"6–7",month:"FEB",year:"2027",title:"Cosquín Rock",place:"Santa María de Punilla · Córdoba",detail:"6 y 7 de febrero de 2027.",end:"2027-02-08T06:00:00-03:00",source:"https://cosquinrock.net/preguntas-frecuentes/"}
];
const waBase="https://wa.me/5493541272605?text=";
const list=document.querySelector("#events-list");
function renderEvents(now=Date.now()){
 if(!list)return;
 const upcoming=events.filter(e=>!e.end||new Date(e.end).getTime()>now);
 list.innerHTML=upcoming.map(e=>`<article class="experience-card">
 <div class="experience-date"><strong>${e.day}</strong>${e.month}<br>${e.year}</div>
 <div class="experience-info"><h4>${e.title}</h4><p>${e.place}</p><a class="event-source" href="${e.source}" target="_blank" rel="noopener">Información oficial ↗</a></div>
 <p class="events-status">${e.detail}</p>
 <div class="experience-action"><small>Consultar disponibilidad</small><a href="${waBase+encodeURIComponent(`Hola Lumini Viajes, quiero consultar disponibilidad y presupuesto de traslado para ${e.title}.`)}" target="_blank" rel="noopener">Consultar →</a></div></article>`).join('')||'<p class="events-status">Consultanos por los próximos eventos.</p>';
}
renderEvents();


// Menú móvil: el mismo control de apertura, con estado accesible sincronizado.
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
if (toggle && nav) {
  const setMenuOpen = open => {
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  };
  toggle.addEventListener("click", () => setMenuOpen(!nav.classList.contains("open")));
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => setMenuOpen(false)));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && nav.classList.contains("open")) {
      setMenuOpen(false);
      toggle.focus();
    }
  });
  document.addEventListener("click", event => {
    if (nav.classList.contains("open") && !event.target.closest(".site-header")) setMenuOpen(false);
  });
  matchMedia(document.querySelector('.navbar-editorial') ? '(min-width:1201px)' : '(min-width:901px)').addEventListener('change', event => {
    if (event.matches) setMenuOpen(false);
  });
}

// Aparición suave de secciones.
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold:.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Formulario "Armá tu viaje" -> consulta lista para WhatsApp.
const tripForm = document.querySelector("#trip-form");
tripForm?.addEventListener("submit", event => {
  event.preventDefault();
  if(dateInput) dateInput.min=localDateISO();
  for(const name of ['from','to']){const field=tripForm.elements.namedItem(name);field.value=field.value.trim();}
  if(!tripForm.reportValidity())return;
  const data = new FormData(tripForm);
  const message = [
    "Hola Lumini Viajes, quiero cotizar un viaje.",
    `Servicio: ${data.get("service")}`,
    `Origen: ${data.get("from")}`,
    `Destino: ${data.get("to")}`,
    `Pasajeros: ${data.get("people")}`,
    data.get("date") ? `Fecha: ${data.get("date")}` : "",
    data.get("note") ? `Detalles: ${data.get("note")}` : ""
  ].filter(Boolean).join("\n");
  window.open(waBase + encodeURIComponent(message), "_blank", "noopener");
});

// Fecha mínima del formulario: hoy.
const dateInput = document.querySelector('input[name="date"]');
function localDateISO(){const d=new Date();return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');}
if(dateInput){dateInput.min=localDateISO();dateInput.addEventListener('focus',()=>dateInput.min=localDateISO());}


// =========================================================
// LUMINI PRO · DESTINOS INTERACTIVOS
// Carga videos locales sólo cuando el usuario los previsualiza.
// En móvil se mantiene la foto para cuidar datos y rendimiento.
// =========================================================
// Asignar únicamente material confirmado para cada localidad.
// Ejemplo: 'viajes-a-villa-general-belgrano': 'assets/videos/villa-general-belgrano.mp4'
const destinationVideos = {
 'viajes-a-la-cumbrecita': '',
 'viajes-a-villa-general-belgrano': '',
 'excursiones-villa-carlos-paz': '',
 'viajes-a-mina-clavero': '',
 'excursiones-cordoba': '',
 'viajes-a-capilla-del-monte': ''
};
const destinationHover = window.matchMedia('(hover: hover) and (pointer: fine)');
const destinationMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const stopDestinationPreviews = [];
document.querySelectorAll('.destination-interactive').forEach(card => {
 const video = card.querySelector('.destination-preview');
 const src = destinationVideos[card.dataset.destination];
 const label = card.querySelector('.destination-preview-label');
 if (!video || !src) return; // Sin asignación: no se solicita ningún archivo.
 if (label) label.textContent = 'MANTENÉ EL MOUSE PARA VER';
 let active = false, ticket = 0;
 const stop = () => {
  active = false; ticket++;
  card.classList.remove('has-video'); video.pause();
  try { video.currentTime = 0; } catch (_) {}
 };
 const start = () => {
  if (!destinationHover.matches || destinationMotion.matches || document.hidden) return;
  active = true; const request = ++ticket;
  video.muted = true;
  if (!video.getAttribute('src')) { video.src = src; video.load(); }
  video.play().then(() => {
   if (active && request === ticket) card.classList.add('has-video');
   else if (!active) { video.pause(); try {video.currentTime=0;} catch (_) {} }
  }).catch(() => { if (request === ticket) card.classList.remove('has-video'); });
 };
 card.addEventListener('mouseenter',start);
 card.addEventListener('mouseleave',stop);
 video.addEventListener('error',()=>{stop();if(label)label.textContent='VIDEO NO DISPONIBLE';});
 new IntersectionObserver(entries=>{if(!entries[0].isIntersecting)stop();}).observe(card);
 stopDestinationPreviews.push(stop);
});
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopDestinationPreviews.forEach(stop=>stop());});
destinationHover.addEventListener('change',()=>stopDestinationPreviews.forEach(stop=>stop()));
destinationMotion.addEventListener('change',()=>stopDestinationPreviews.forEach(stop=>stop()));

// Rotación de experiencias: pausa explícita, al enfocar y al pasar el cursor.
const carousel = document.querySelector('.event-carousel');
if (carousel) {
 const slides = [...carousel.querySelectorAll('.event-slide')];
 const dots = [...carousel.querySelectorAll('[data-slide]')];
 const pauseButton = carousel.querySelector('.carousel-pause');
 const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
 let current = 0, paused = motion.matches, hovering = false, focused = false;
 const show = index => { current=(index+slides.length)%slides.length; slides.forEach((slide,i)=>{slide.hidden=i!==current; if(i!==current) slide.querySelectorAll("video").forEach(v=>v.pause());}); dots.forEach((dot,i)=>dot.setAttribute('aria-pressed',String(i===current))); };
 const updatePause = () => { pauseButton.textContent=paused?'Reanudar':'Pausar'; pauseButton.setAttribute('aria-label',paused?'Reanudar rotación automática':'Pausar rotación automática'); };
 const manual = index => { paused=true;updatePause();show(index); };
 carousel.querySelector('.carousel-prev').addEventListener('click',()=>manual(current-1));
 carousel.querySelector('.carousel-next').addEventListener('click',()=>manual(current+1));
 dots.forEach((dot,i)=>dot.addEventListener('click',()=>manual(i)));
 pauseButton.addEventListener('click',()=>{paused=!paused;updatePause();});
 carousel.addEventListener('mouseenter',()=>{hovering=true;});
 carousel.addEventListener('mouseleave',()=>{hovering=false;});
 carousel.addEventListener('focusin',()=>{focused=true;});
 carousel.addEventListener('focusout',e=>{focused=carousel.contains(e.relatedTarget);});
 motion.addEventListener('change',e=>{if(e.matches){paused=true;updatePause();}});
 setInterval(()=>{if(!paused&&!hovering&&!focused&&!document.hidden&&![...carousel.querySelectorAll("video")].some(v=>!v.paused))show(current+1);},6500);
 updatePause();
}

