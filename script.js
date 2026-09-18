const events = [
  {day:12, month:"OCT", year:"2026", title:"Oktoberfest", place:"Villa General Belgrano · Córdoba", note:"Traslados disponibles", target:"traslados-oktoberfest", date:"2026-10-12T09:00:00"},
  {day:08, month:"ENE", year:"2027", title:"Festival Nacional de Jesús María", place:"Jesús María · Córdoba", note:"Traslados disponibles", target:"traslados-festival-jesus-maria", date:"2027-01-08T09:00:00"},
  {day:13, month:"FEB", year:"2027", title:"Cosquín Rock", place:"Córdoba", note:"Traslados disponibles", target:"traslados-cosquin-rock", date:"2027-02-13T09:00:00"}
];

const waBase = "https://wa.me/5493541272605?text=";
const list = document.querySelector("#events-list");

function countdownHTML(dateString) {
  const target = new Date(dateString).getTime();
  const id = `count-${Math.random().toString(36).slice(2,8)}`;
  setTimeout(() => {
    const box = document.getElementById(id);
    if (!box) return;
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      const d = Math.floor(diff / 86400000);
      const h = Math.floor(diff / 3600000) % 24;
      const m = Math.floor(diff / 60000) % 60;
      box.innerHTML = `<div><strong>${String(d).padStart(2,"0")}</strong><span>DÍAS</span></div><div><strong>${String(h).padStart(2,"0")}</strong><span>HRS</span></div><div><strong>${String(m).padStart(2,"0")}</strong><span>MIN</span></div>`;
    };
    tick();
    setInterval(tick, 60000);
  }, 0);
  return `<div class="countdown" id="${id}" aria-label="Cuenta regresiva"></div>`;
}

if (list) {
  list.innerHTML = events.map(e => `
    <article class="experience-card">
      <div class="experience-date"><strong>${e.day}</strong>${e.month}<br>${e.year}</div>
      <div class="experience-info"><h4>${e.title}</h4><p>${e.place}</p></div>
      ${countdownHTML(e.date)}
      <div class="experience-action"><small>${e.note}</small><a href="${waBase + encodeURIComponent(`Hola Lumini Viajes, quiero consultar por traslados para ${e.title}.`)}" target="_blank" rel="noopener">Consultar →</a></div>
    </article>
  `).join("");
}

// Menú móvil.
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
toggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
document.querySelectorAll(".main-nav a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

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
if (dateInput) dateInput.min = new Date().toISOString().split("T")[0];


// Mapa de Córdoba con recorridos visuales de Lumini (sin marcadores).
// Los puntos usan coordenadas geográficas reales; las polilíneas son recorridos
// visuales aproximados para comunicar cobertura (no navegación turn-by-turn).
const mapEl = document.getElementById('lumini-map');
if (mapEl && window.maptilersdk) {
  maptilersdk.config.apiKey = 'kp1RBqQVCNfhz1jY3LDo';

  const map = new maptilersdk.Map({
    container: 'lumini-map',
    style: maptilersdk.MapStyle.STREETS.PASTEL,
    language: 'es',
    center: [-64.58, -31.43],
    zoom: 7.95,
    minZoom: 7.15,
    maxZoom: 12.5,
    pitch: 0,
    bearing: 0,
    renderWorldCopies: false,
    navigationControl: false,
    attributionControl: true,
    scrollZoom: false,
    doubleClickZoom: false,
    dragRotate: false,
    touchZoomRotate: false,
    cooperativeGestures: true
  });

  map.addControl(new maptilersdk.NavigationControl({showCompass:false}), 'top-left');

  map.on('error', () => {
    mapEl.classList.add('map-load-error');
    mapEl.setAttribute('aria-label', 'No se pudo cargar el mapa interactivo.');
  });

  const base = {
    name:'Villa Carlos Paz', lng:-64.4978, lat:-31.4241,
    base:true, eyebrow:'BASE LUMINI', label:'right', type:'PUNTO DE PARTIDA'
  };

  // Coordenadas de los destinos. Los waypoints siguen corredores geográficos
  // plausibles para que las líneas no parezcan dibujadas a regla.
  const places = [
    {
      name:'Mina Clavero', lng:-65.0060, lat:-31.7286, type:'TRASLADO · SIERRAS', label:'left',
      route:[[-64.64,-31.47],[-64.79,-31.56],[-64.90,-31.66],[-64.96,-31.70]]
    },
    {
      name:'Villa General Belgrano', lng:-64.5560, lat:-31.9780, type:'EXCURSIÓN · SIERRAS', label:'right-down',
      route:[[-64.49,-31.58],[-64.49,-31.72],[-64.53,-31.87],[-64.55,-31.94]]
    },
    {
      name:'Capilla del Monte', lng:-64.5250, lat:-30.8620, type:'EXCURSIÓN · NORTE', label:'right-up',
      route:[[-64.49,-31.24],[-64.49,-31.08],[-64.51,-30.96],[-64.52,-30.90]]
    },
    {
      name:'Jesús María', lng:-64.0949, lat:-30.9815, type:'EVENTOS · NORTE', label:'right-up',
      route:[[-64.43,-31.31],[-64.27,-31.18],[-64.18,-31.07],[-64.12,-31.00]]
    }
  ];

  const sampleLine = (coords, samples=26) => {
    const out=[];
    for(let i=0;i<coords.length-1;i++){
      const [x1,y1]=coords[i], [x2,y2]=coords[i+1];
      for(let j=0;j<(i===coords.length-2?samples+1:samples);j++){
        const t=j/samples;
        const e=t*t*(3-2*t);
        out.push([x1+(x2-x1)*e, y1+(y2-y1)*e]);
      }
    }
    return out;
  };

  map.on('load', () => {
    const routeFeatures = places.map((p, i) => {
      // Cada recorrido termina EXACTAMENTE en la coordenada del marcador.
      // Usamos un único quiebre suave para darle lectura de trayecto sin
      // introducir desvíos que puedan separar visualmente la línea del punto.
      const midLng = (base.lng + p.lng) / 2;
      const midLat = (base.lat + p.lat) / 2;
      const bend = p.lat < base.lat ? -0.018 : 0.018;
      return {
        type:'Feature',
        properties:{id:i+1, name:p.name},
        geometry:{
          type:'LineString',
          coordinates:[
            [base.lng, base.lat],
            [midLng, midLat + bend],
            [p.lng, p.lat]
          ]
        }
      };
    });

    map.addSource('lumini-routes', {
      type:'geojson',
      data:{type:'FeatureCollection', features:routeFeatures}
    });

    // Halo + línea principal para que las rutas destaquen sin tapar las calles.
    map.addLayer({
      id:'lumini-route-halo', type:'line', source:'lumini-routes',
      layout:{'line-cap':'round','line-join':'round'},
      paint:{'line-color':'#a91924','line-width':9,'line-opacity':0.09,'line-blur':4}
    });
    map.addLayer({
      id:'lumini-route-main', type:'line', source:'lumini-routes',
      layout:{'line-cap':'round','line-join':'round'},
      paint:{'line-color':'#b51f2a','line-width':4.2,'line-opacity':0.94,'line-dasharray':[1.2,1.6]}
    });

    // Sin nodos intermedios: las rutas se leen limpias y terminan en su marcador.

    // Marcadores HTML sobre las coordenadas exactas.
    map.fitBounds([[-65.18,-32.28],[-63.88,-30.64]],{padding:{top:35,right:35,bottom:35,left:35},duration:950,maxZoom:8.2});
  });

  const badge = document.createElement('div');
  badge.className = 'map-cover-badge';
  badge.innerHTML = '<span>COBERTURA LUMINI</span><b>CÓRDOBA</b>';
  map.addControl({onAdd:()=>badge,onRemove:()=>{}}, 'top-right');

  window.addEventListener('resize', () => map.resize(), {passive:true});
}


// =========================================================
// LUMINI PRO · DESTINOS INTERACTIVOS
// Carga videos locales sólo cuando el usuario los previsualiza.
// En móvil se mantiene la foto para cuidar datos y rendimiento.
// =========================================================
const destinationCards = document.querySelectorAll('.destination-interactive');
const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
if (canHover) {
  destinationCards.forEach(card => {
    const video = card.querySelector('.destination-preview');
    const src = card.dataset.video;
    if (!video || !src) return;
    let tested = false;
    const loadPreview = () => {
      if (tested) return;
      tested = true;
      video.src = src;
      video.addEventListener('loadeddata', () => card.classList.add('has-video'), {once:true});
      video.addEventListener('error', () => { card.classList.remove('has-video'); }, {once:true});
      video.load();
    };
    card.addEventListener('mouseenter', () => {
      loadPreview();
      video.play().catch(()=>{});
    });
    card.addEventListener('mouseleave', () => {
      video.pause();
      try { video.currentTime = 0; } catch(e) {}
    });
  });
}


// Rotación de experiencias: pausa explícita, al enfocar y al pasar el cursor.
const carousel = document.querySelector('.event-carousel');
if (carousel) {
 const slides = [...carousel.querySelectorAll('.event-slide')];
 const dots = [...carousel.querySelectorAll('[data-slide]')];
 const pauseButton = carousel.querySelector('.carousel-pause');
 const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
 let current = 0, paused = motion.matches, hovering = false, focused = false;
 const show = index => { current=(index+slides.length)%slides.length; slides.forEach((slide,i)=>{slide.hidden=i!==current;}); dots.forEach((dot,i)=>dot.setAttribute('aria-pressed',String(i===current))); };
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
 setInterval(()=>{if(!paused&&!hovering&&!focused&&!document.hidden)show(current+1);},6500);
 updatePause();
}
