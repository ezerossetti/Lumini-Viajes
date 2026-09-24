const experiences = [
  {
    "title": "Festivales<br>y música",
    "label": "Festivales y música",
    "description": "Cosquín Rock, Folklore de Cosquín, Jesús María, Oktoberfest y recitales. Coordinamos el traslado para que disfrutes desde el primer momento.",
    "link": "https://wa.me/5493541272605?text=Hola%20Lumini%20Viajes%2C%20quiero%20consultar%20por%20traslados%20para%20festivales%20y%20m%C3%BAsica.",
    "image": "assets/images/experiencias/festivales.png?v=2",
    "alt": "Escenario de Cosquín Rock con público al aire libre"
  },
  {
    "title": "Música<br>electrónica",
    "label": "Música electrónica",
    "description": "Fiestas, festivales y eventos de música electrónica. Contanos a dónde vas, con quiénes viajás y qué horarios necesitás.",
    "link": "https://wa.me/5493541272605?text=Hola%20Lumini%20Viajes%2C%20quiero%20consultar%20por%20traslados%20para%20m%C3%BAsica%20electr%C3%B3nica.",
    "image": "assets/images/experiencias/electronica.png",
    "alt": "Evento de música electrónica con luces y láseres azules"
  },
  {
    "title": "Eventos<br>deportivos",
    "label": "Eventos deportivos",
    "description": "Partidos, torneos, competencias y carreras. Organizamos el viaje según el grupo, el destino y los horarios del evento.",
    "link": "https://wa.me/5493541272605?text=Hola%20Lumini%20Viajes%2C%20quiero%20consultar%20por%20traslados%20para%20eventos%20deportivos.",
    "image": "assets/images/experiencias/deportes.png",
    "alt": "Corredores participando en una carrera"
  },
  {
    "title": "Culturales<br>y especiales",
    "label": "Culturales y especiales",
    "description": "Fiestas populares, eventos estudiantiles, encuentros corporativos y celebraciones. Armamos una propuesta para tu grupo.",
    "link": "https://wa.me/5493541272605?text=Hola%20Lumini%20Viajes%2C%20quiero%20consultar%20por%20traslados%20para%20culturales%20y%20especiales.",
    "image": "assets/images/experiencias/cultura.png",
    "alt": "Celebración nocturna con fogata y público"
  }
];
(() => {
 const root=document.querySelector('.photo-carousel'); if(!root)return;
 const stage=root.querySelector('.experience-stage'),image=stage.querySelector('img'),pause=root.querySelector('.experience-pause');
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 let current=0,paused=motion.matches,hovering=false,focused=false,timer;
 const thumbs=[],dots=[];
 experiences.forEach((item,i)=>{
  const button=document.createElement('button');button.type='button';button.className='experience-thumb';button.setAttribute('aria-label',`Mostrar ${item.label}`);
  const img=document.createElement('img');img.src=item.image;img.alt='';img.loading='lazy';
  const title=document.createElement('span');title.textContent=item.label;
  const arrow=document.createElement('i');arrow.textContent='→';arrow.setAttribute('aria-hidden','true');
  button.append(img,title,arrow);button.addEventListener('click',()=>manual(i));root.querySelector('.experience-thumbnails').append(button);thumbs.push(button);
  const dot=document.createElement('button');dot.type='button';dot.setAttribute('aria-label',`Ir a ${item.label}`);dot.innerHTML='<span></span>';dot.addEventListener('click',()=>manual(i));root.querySelector('.experience-dots').append(dot);dots.push(dot);
 });
 function show(index,animate=true){
  current=(index+experiences.length)%experiences.length;const item=experiences[current];
  stage.setAttribute('aria-label',`${current+1} de ${experiences.length}: ${item.label}`);
  stage.querySelector('.stage-number b').textContent=String(current+1).padStart(2,'0');stage.querySelector('h3').innerHTML=item.title;
  stage.querySelector('.stage-description').textContent=item.description;stage.querySelector('a').href=item.link;image.src=item.image;image.alt=item.alt;
  thumbs.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===current)));dots.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===current)));
  stage.classList.remove('is-changing');if(animate&&!motion.matches){void stage.offsetWidth;stage.classList.add('is-changing');}
 }
 function updatePause(){pause.textContent=paused?'Reanudar':'Pausar';pause.setAttribute('aria-label',paused?'Reanudar rotación automática':'Pausar rotación automática');}
 function manual(i){paused=true;updatePause();show(i);restart();}
 function restart(){clearInterval(timer);timer=setInterval(()=>{if(!paused&&!hovering&&!focused&&!document.hidden)show(current+1);},7000);}
 root.querySelector('.experience-prev').addEventListener('click',()=>manual(current-1));root.querySelector('.experience-next').addEventListener('click',()=>manual(current+1));
 pause.addEventListener('click',()=>{paused=!paused;updatePause();restart();});
 root.addEventListener('mouseenter',()=>hovering=true);root.addEventListener('mouseleave',()=>{hovering=false;restart();});
 root.addEventListener('focusin',()=>focused=true);root.addEventListener('focusout',e=>focused=root.contains(e.relatedTarget));
 root.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();manual(current+(e.key==='ArrowLeft'?-1:1));}});
 motion.addEventListener('change',e=>{if(e.matches){paused=true;updatePause();}});
 show(0,false);updatePause();restart();
})();
