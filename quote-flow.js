(() => {
 const form=document.querySelector('#trip-form');if(!form)return;
 const field=name=>form.elements.namedItem(name);
 const status=document.createElement('p');status.className='quote-prefill-status full';status.setAttribute('role','status');form.querySelector('.quote-form-heading').after(status);
 document.querySelectorAll('.destination-content').forEach(content=>{
  const name=content.querySelector('h3').innerHTML.replace(/<br\s*\/?>(\s*)/gi,' ').replace(/<[^>]*>/g,'').trim();
  const a=document.createElement('a');a.href='#armatuviaje';a.className='destination-quote';a.textContent='Consultar viaje →';a.dataset.quoteService='Excursión';a.dataset.quoteDestination=name;content.append(a);
 });
 document.addEventListener('click',event=>{
  const a=event.target.closest('[data-quote-service]');if(!a)return;event.preventDefault();
  field('service').value=a.dataset.quoteService;
  if(a.dataset.quoteDestination)field('to').value=a.dataset.quoteDestination;
  const previous=form.dataset.eventNote;
  if(previous)field('note').value=field('note').value.split('\n').filter(line=>line!==previous).join('\n');
  const note=a.dataset.quoteEvent?'Evento: '+a.dataset.quoteEvent:'';form.dataset.eventNote=note;
  if(note)field('note').value=[field('note').value,note].filter(Boolean).join('\n');
  status.textContent='Consulta preparada'+(a.dataset.quoteEvent?' para '+a.dataset.quoteEvent:a.dataset.quoteDestination?' para '+a.dataset.quoteDestination:'')+'. Completá los datos de tu viaje.';
  form.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
  field(a.dataset.quoteDestination?'people':'to').focus({preventScroll:true});
 });
 const dialog=document.createElement('dialog');dialog.className='quote-review';dialog.setAttribute('aria-labelledby','quote-review-title');
 dialog.innerHTML='<h2 id="quote-review-title">Revisá tu consulta</h2><p>Comprobá los datos antes de continuar.</p><pre class="quote-review-data"></pre><div class="quote-review-actions"><button type="button" class="btn" autofocus>Corregir datos</button><a class="btn btn-red" target="_blank" rel="noopener">Continuar por WhatsApp ↗</a></div><p class="quote-review-note">La consulta no confirma una reserva. Podés revisar y enviar el mensaje en WhatsApp.</p>';
 document.body.append(dialog);let oldOverflow='';
 window.reviewQuote=message=>{dialog.querySelector('pre').textContent=message;dialog.querySelector('a').href='https://wa.me/5493541272605?text='+encodeURIComponent(message);oldOverflow=document.body.style.overflow;document.body.style.overflow='hidden';dialog.showModal();};
 dialog.querySelector('button').addEventListener('click',()=>dialog.close());dialog.querySelector('a').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});dialog.addEventListener('close',()=>{document.body.style.overflow=oldOverflow;form.querySelector('[type="submit"]').focus({preventScroll:true});});
})();
