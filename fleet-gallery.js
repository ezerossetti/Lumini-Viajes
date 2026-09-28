(() => {
 const trigger=document.querySelector('.services-photo');if(!trigger)return;
 const photos=[
  {src:'assets/images/lumini-sprinter-web.webp',alt:'Vista exterior de la Sprinter de Lumini',label:'Nuestra Sprinter'},
  {src:'assets/images/lumini-viajes-web.webp',alt:'Vehículo de Lumini durante una parada junto al lago San Roque',label:'En el camino'},
  {src:'assets/images/lumini-grupos.jpg',alt:'Vehículo de Lumini durante una parada en las sierras',label:'Viajes en grupo'}
 ];
 const dialog=document.createElement('dialog');dialog.className='fleet-gallery';dialog.setAttribute('aria-labelledby','fleet-gallery-title');
 dialog.innerHTML=`<div class="fleet-gallery-inner"><header><div><p>TRANSPORTE · LUMINI VIAJES</p><h2 id="fleet-gallery-title">Nuestra flota</h2></div><button class="fleet-close" type="button" aria-label="Cerrar galería" autofocus>✕</button></header><div class="fleet-gallery-view"><img alt="" draggable="false"><button class="fleet-prev" type="button" aria-label="Foto anterior">←</button><button class="fleet-next" type="button" aria-label="Foto siguiente">→</button></div><p class="fleet-caption" aria-live="polite" aria-atomic="true"></p><div class="fleet-thumbnails" aria-label="Elegir fotografía"></div></div>`;
 document.body.append(dialog);
 const image=dialog.querySelector('.fleet-gallery-view img'),caption=dialog.querySelector('.fleet-caption');
 let current=0,opener=null,oldOverflow='';
 const thumbnails=photos.map((p,i)=>{const b=document.createElement('button');b.type='button';b.setAttribute('aria-label',`Ver foto ${i+1}: ${p.label}`);const img=document.createElement('img');img.alt='';img.dataset.src=p.src;b.append(img);b.addEventListener('click',()=>show(i));dialog.querySelector('.fleet-thumbnails').append(b);return b;});
 function show(index){current=(index+photos.length)%photos.length;const p=photos[current];image.src=p.src;image.alt=p.alt;caption.textContent=`${String(current+1).padStart(2,'0')} / ${String(photos.length).padStart(2,'0')} · ${p.label}`;thumbnails.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===current)));}
 function open(e){e.preventDefault();opener=e.currentTarget;oldOverflow=document.body.style.overflow;document.body.style.overflow='hidden';thumbnails.forEach(b=>{const img=b.querySelector('img');if(!img.src)img.src=img.dataset.src;});show(0);dialog.showModal();}
 const photoButton=document.createElement('button');photoButton.type='button';photoButton.className='services-gallery-open';photoButton.setAttribute('aria-label','Abrir galería de la flota');photoButton.setAttribute('aria-haspopup','dialog');photoButton.addEventListener('click',open);trigger.append(photoButton);
 const link=trigger.querySelector('.services-photo-link');link.removeAttribute('target');link.setAttribute('aria-label','Ver nuestra flota: abrir galería');link.setAttribute('aria-haspopup','dialog');link.addEventListener('click',open);
 trigger.querySelector('.services-photo-arrows')?.remove();
 dialog.querySelector('.fleet-close').addEventListener('click',()=>dialog.close());
 dialog.querySelector('.fleet-prev').addEventListener('click',()=>show(current-1));dialog.querySelector('.fleet-next').addEventListener('click',()=>show(current+1));
 dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
 dialog.addEventListener('close',()=>{document.body.style.overflow=oldOverflow;opener?.focus({preventScroll:true});});
 dialog.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();show(current+(e.key==='ArrowRight'?1:-1));}});
 window.luminiSwipe(dialog.querySelector('.fleet-gallery-view'),delta=>show(current+delta));
})();
