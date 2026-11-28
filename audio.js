// Âm thanh tạo bằng Web Audio (không cần file, không tốn dung lượng). Có thể thay bằng file CC0 sau này.
let ctx=null,master,sfxG,musG,timer=null,mood='ok',step=0;
const pref={sfx:true,mus:true};
try{Object.assign(pref,JSON.parse(localStorage.getItem('dvvp_audio')))}catch(e){}
export const prefs=()=>pref;
export function unlock(){
 if(!ctx){const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;
  ctx=new AC();master=ctx.createGain();master.gain.value=.8;master.connect(ctx.destination);
  sfxG=ctx.createGain();sfxG.gain.value=pref.sfx?1:0;sfxG.connect(master);
  musG=ctx.createGain();musG.gain.value=pref.mus?.5:0;musG.connect(master)}
 if(ctx.state=='suspended')ctx.resume();
}
export function toggle(k){
 pref[k]=!pref[k];try{localStorage.setItem('dvvp_audio',JSON.stringify(pref))}catch(e){}
 if(ctx)(k=='sfx'?sfxG:musG).gain.value=pref[k]?(k=='sfx'?1:.5):0;return pref[k];
}
function tone(f,d,type='sine',v=.2,to=null,t0=0,dest){
 if(!ctx)return;const t=ctx.currentTime+t0,o=ctx.createOscillator(),g=ctx.createGain();
 o.type=type;o.frequency.setValueAtTime(f,t);if(to)o.frequency.exponentialRampToValueAtTime(to,t+d);
 g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+d);
 o.connect(g);g.connect(dest||sfxG);o.start(t);o.stop(t+d+.05);
}
function noise(d,v=.2,type='lowpass',f=2000,to=null,t0=0){
 if(!ctx)return;const n=Math.floor(ctx.sampleRate*d),b=ctx.createBuffer(1,n,ctx.sampleRate),a=b.getChannelData(0);
 for(let i=0;i<n;i++)a[i]=Math.random()*2-1;
 const s=ctx.createBufferSource();s.buffer=b;const fl=ctx.createBiquadFilter();fl.type=type;const t=ctx.currentTime+t0;
 fl.frequency.setValueAtTime(f,t);if(to)fl.frequency.exponentialRampToValueAtTime(to,t+d);
 const g=ctx.createGain();g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);
 s.connect(fl);fl.connect(g);g.connect(sfxG);s.start(t);
}
const SFX={
 click:()=>tone(660,.06,'square',.08),
 pick:()=>tone(440,.08,'triangle',.12,660),
 give:()=>{noise(.18,.15,'bandpass',1200,300);tone(120,.15,'sine',.25,60,.05)},
 break:()=>{noise(.3,.3,'highpass',3000);for(let i=0;i<7;i++)tone(2000+Math.random()*3000,.25,'sine',.08,null,i*.04+Math.random()*.05)},
 sigh:()=>noise(.9,.18,'bandpass',900,200),
 'poke-head':()=>tone(300,.18,'sine',.3,80),
 'poke-body':()=>noise(.1,.12,'lowpass',600),
 'poke-legs':()=>{tone(150,.12,'square',.12,70);tone(110,.1,'square',.1,60,.1)},
 resign:()=>{noise(.35,.12,'highpass',4000,1500);tone(392,.4,'triangle',.15,null,.1);tone(330,.5,'triangle',.15,null,.4)},
 stamp:()=>{tone(90,.2,'sine',.5,40);noise(.08,.3,'lowpass',800)},
 bell:()=>{[880,1320,1760].forEach((f,i)=>tone(f,1.2,'sine',.12/(i+1)))},
 event:()=>{tone(523,.12,'triangle',.15);tone(784,.2,'triangle',.15,null,.1)},
 lie:()=>{[523,659,784,1046].forEach((f,i)=>tone(f,.15,'triangle',.1,null,i*.07))},
 relief:()=>{tone(392,.3,'sine',.12);tone(523,.4,'sine',.1,null,.15)}
};
export function sfx(n){if(ctx&&pref.sfx&&SFX[n])try{SFX[n]()}catch(e){}}
// Nhạc nền tự sinh: đổi thang âm và nhịp theo tâm trạng của sếp cũ
const SC={ok:[0,2,4,7,9],tired:[0,2,4,7,9],angry:[0,3,5,7,10],cry:[0,3,5,7,10]};
const BPM={ok:480,tired:640,angry:360,cry:560};
const hz=s=>220*Math.pow(2,s/12);
function tick(){
 if(!ctx||!pref.mus)return;const sc=SC[mood],p=mood=='tired'?.35:mood=='angry'?.8:.6;
 if(step%8==0)tone(hz(sc[0]-12),.95,'sine',.18,null,0,musG);
 if(step%8==0||step%8==4)[0,2,3].forEach(i=>tone(hz(sc[i]),1.6,'triangle',.035,null,0,musG));
 if(Math.random()<p)tone(hz(sc[Math.floor(Math.random()*5)]+(Math.random()<.4?12:0)),.45,'triangle',.07,null,0,musG);
 if(Math.random()<.12)noise(.03,.04,'highpass',3000);
 step++;
}
export function music(on){
 if(timer){clearInterval(timer);timer=null}
 if(on&&ctx){step=0;timer=setInterval(tick,BPM[mood]||480)}
}
export function setMood(m){if(m&&m!==mood){mood=m;if(timer)music(true)}}
// Giọng "ú ớ" kiểu game hoạt hình: mỗi từ một tiếng bíp, cao độ khác nhau theo nhân vật. Trả về thời lượng (ms).
export function babble(who,n){const base=who=='boss'?340:170;let t=0;for(let i=0;i<n;i++){tone(base*(.8+Math.random()*.7),.08,'square',.05,null,t/1000);t+=110}return t+100}
