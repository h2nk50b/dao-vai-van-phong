// Giọng nói nhân vật: (1) file thu sẵn trong voice/ nếu có, (2) giọng đọc tiếng Việt của trình duyệt, (3) giọng "ú ớ" nếu máy không có tiếng Việt.
import * as audio from './audio.js';
const synth=typeof speechSynthesis!='undefined'?speechSynthesis:null;
let voices=[],mode='auto',manifest={boss:{},me:{}},sid=0,curRes=null,curAudio=null,timer=0;
try{mode=localStorage.getItem('dvvp_voice')||'auto'}catch(e){}
export function init(){
 if(synth){const l=()=>{voices=synth.getVoices()||[]};l();synth.onvoiceschanged=l}
 if(typeof fetch=='function')fetch('voice/index.json').then(r=>r.ok?r.json():null).then(j=>{if(j)manifest=Object.assign(manifest,j)}).catch(()=>{});
}
const vi=()=>voices.filter(v=>/^vi/i.test(v.lang));
export const hasVN=()=>vi().length>0;
export const getMode=()=>mode=='auto'?(hasVN()?'tts':'babble'):mode;
export function cycle(){
 const order=hasVN()?['tts','babble','off']:['babble','off'];
 mode=order[(order.indexOf(getMode())+1)%order.length];
 try{localStorage.setItem('dvvp_voice',mode)}catch(e){}
 return getMode();
}
export function stop(){
 sid++;if(synth)try{synth.cancel()}catch(e){}
 if(curAudio){try{curAudio.pause()}catch(e){}curAudio=null}
 clearTimeout(timer);const r=curRes;curRes=null;if(r)r();
}
export function speak(who,text,mouth=()=>{}){
 return new Promise(res=>{
  const m=getMode();if(m=='off'){res();return}
  const my=++sid;curRes=res;
  const done=()=>{if(my===sid){mouth(false,who);curRes=null}res()};
  if(/\(/.test(text))audio.sfx('sigh');
  const clean=text.replace(/\([^)]*\)/g,' ').replace(/\.{2,}/g,', ').trim();
  const f=manifest[who]&&manifest[who][text];
  if(f){const a=new Audio('voice/'+f);curAudio=a;a.onplay=()=>{if(my===sid)mouth(true,who)};a.onended=a.onerror=done;a.play().catch(done);return}
  if(m=='tts'&&synth&&hasVN()&&clean){
   const L=vi(),u=new SpeechSynthesisUtterance(clean);
   u.lang='vi-VN';u.voice=(who=='me'&&L[1])?L[1]:L[0];u.pitch=who=='boss'?1.3:.7;u.rate=who=='boss'?1.05:.95;
   u.onstart=()=>{if(my===sid)mouth(true,who)};u.onend=u.onerror=done;
   synth.speak(u);timer=setTimeout(done,9000);return;
  }
  const d=audio.babble(who,Math.max(2,clean.split(/\s+/).length));
  mouth(true,who);timer=setTimeout(done,d);
 });
}
