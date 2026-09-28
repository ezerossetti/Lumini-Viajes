/* Horizontal gestures keep native vertical scrolling and pinch zoom available. */
window.luminiSwipe = (surface, onSwipe) => {
 let gesture=null, suppressUntil=0;
 surface.addEventListener('pointerdown', e => {
  if(e.pointerType==='mouse')return;
  if(!e.isPrimary){gesture=null;return;}
  gesture={id:e.pointerId,x:e.clientX,y:e.clientY,vertical:false};
 });
 surface.addEventListener('pointermove', e => {
  if(!gesture||gesture.id!==e.pointerId)return;
  const dx=e.clientX-gesture.x,dy=e.clientY-gesture.y;
  if(Math.abs(dy)>12&&Math.abs(dy)>Math.abs(dx))gesture.vertical=true;
 });
 surface.addEventListener('pointerup', e => {
  if(!gesture||gesture.id!==e.pointerId)return;
  const g=gesture;gesture=null;
  const dx=e.clientX-g.x,dy=e.clientY-g.y;
  if(g.vertical||Math.abs(dx)<45||Math.abs(dx)<Math.abs(dy)*1.4)return;
  suppressUntil=Date.now()+500;
  onSwipe(dx<0?1:-1);
 });
 surface.addEventListener('pointercancel',()=>gesture=null);
 surface.addEventListener('click',e=>{if(Date.now()<suppressUntil){e.preventDefault();e.stopImmediatePropagation();}},true);
};
