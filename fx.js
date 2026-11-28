// Hiệu ứng hạt (giấy bay, mảnh vỡ, tia sáng) vẽ trên canvas phủ lên cảnh
let cv=null,cx=null,P=[],raf=0,W=0,H=0;
const calm=()=>window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export function mount(stage){
 try{
  cv=document.createElement('canvas');cv.id='fx';cv.setAttribute('aria-hidden','true');stage.appendChild(cv);
  const r=stage.getBoundingClientRect(),d=window.devicePixelRatio||1;W=r.width;H=r.height;
  cv.width=W*d;cv.height=H*d;cx=cv.getContext('2d');cx.setTransform(d,0,0,d,0,0);P=[];
 }catch(e){cx=null}
}
const COL={paper:['#ffffff','#eef2f3','#ffe45e'],shard:['#e8f6ff','#9fd8f0','#ffffff'],spark:['#ffe45e','#ffffff','#ff9f1c']};
export function emit(kind,x,y,n=12){
 if(!cx||calm())return;
 for(let i=0;i<n;i++){
  const a=Math.random()*6.28,s=2+Math.random()*(kind=='paper'?3:6);
  P.push({k:kind,x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-(kind=='shard'?3:2),r:Math.random()*6.28,vr:(Math.random()-.5)*.4,w:4+Math.random()*(kind=='paper'?8:6),life:50+Math.random()*30,c:COL[kind][i%3],g:kind=='paper'?.08:.28});
 }
 if(!raf)raf=requestAnimationFrame(loop);
}
function loop(){
 cx.clearRect(0,0,W,H);P=P.filter(p=>p.life>0);
 for(const p of P){
  p.vy+=p.g;if(p.k=='paper')p.vx*=.97;p.x+=p.vx;p.y+=p.vy;p.r+=p.vr;p.life--;
  cx.save();cx.globalAlpha=Math.min(1,p.life/20);cx.translate(p.x,p.y);cx.rotate(p.r);
  cx.fillStyle=p.c;cx.strokeStyle='#1b2a41';cx.lineWidth=1;cx.beginPath();
  if(p.k=='shard'){cx.moveTo(0,-p.w);cx.lineTo(p.w*.6,p.w*.5);cx.lineTo(-p.w*.6,p.w*.4);cx.closePath();cx.fill();cx.stroke()}
  else if(p.k=='spark'){cx.moveTo(0,-p.w);cx.lineTo(p.w*.3,0);cx.lineTo(0,p.w);cx.lineTo(-p.w*.3,0);cx.closePath();cx.fill()}
  else cx.fillRect(-p.w/2,-p.w/3,p.w,p.w*.66);
  cx.restore();
 }
 raf=P.length?requestAnimationFrame(loop):0;if(!raf)cx.clearRect(0,0,W,H);
}
export function shake(el,ms=380){if(!el||calm())return;el.classList.remove('shake');void el.offsetWidth;el.classList.add('shake');setTimeout(()=>el.classList.remove('shake'),ms)}
export function flash(el,ms=650){if(!el||calm())return;el.classList.remove('flash');void el.offsetWidth;el.classList.add('flash');setTimeout(()=>el.classList.remove('flash'),ms)}
