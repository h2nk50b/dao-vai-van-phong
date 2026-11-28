import {OPT,LAB,ROLES,POOL,OKS,MAD,LEAVE,DAYS,SCHEDULE,BYE} from './data.js';
import {av,parse,esc} from './avatar.js';
import {scene} from './scene.js';
import {S,clearAll,saveChar,loadChar,saveGame,loadGame,hasGame} from './state.js';
const $=s=>document.querySelector(s);
function setup(){saveChar();
 const o=S[S.tab],mine=S.tab=='me';
 const rows=Object.keys(OPT).map(k=>`<div class="row"><label>${LAB[k]}</label><div class="chips">${OPT[k].map(([l,v])=>`<button class="chip ${o[k]==v?'on':''}" onclick="pick('${k}','${v}')">${l}</button>`).join('')}</div></div>`).join('');
 $('#app').innerHTML=`<h1>Đảo Vai Văn Phòng</h1><p class="sub">Hôm nay anh sếp cũ làm nhân viên. Còn bạn là người ký duyệt.</p>
 <div class="grid"><div class="stage"><div class="scene">${scene(10,0)}</div><span class="tag">${esc(mine?(o.name||'Bạn')+' · '+S.role:'Nhân viên '+(o.name||'???'))}</span>${av(o,'ok')}</div>
 <div class="panel"><div class="tabs"><button class="${mine?'on':''}" onclick="tab('me')">Bạn (sếp mới)</button><button class="${mine?'':'on'}" onclick="tab('boss')">Sếp cũ (nhân viên)</button></div>
 <div class="row"><label>Tên ${mine?'của bạn':'sếp cũ'}</label><input type="text" maxlength="20" value="${esc(o.name)}" placeholder="${mine?'Ví dụ: Lan':'Ví dụ: Hùng'}" oninput="setName(this.value)"></div>
 ${mine?`<div class="row"><label>Chức vụ</label><div class="chips">${ROLES.map(r=>`<button class="chip ${S.role==r?'on':''}" onclick="S.role='${r}';setup()">${r}</button>`).join('')}</div></div>`:''}
 <div class="row"><label>Hoặc mô tả bằng lời</label><textarea rows="2" id="d" placeholder="Ví dụ: béo, lùn, tóc bạc, đeo kính, áo đỏ">${o.desc}</textarea><button class="chip" style="margin-top:6px" onclick="applyDesc()">Tạo theo mô tả</button></div>
 <div class="row"><button class="chip" onclick="randomize()">Ngẫu nhiên cả bộ</button></div>${rows}<div class="row"><button class="chip" onclick="wipe()">Xóa dữ liệu đã lưu</button></div><button class="go" onclick="start(true)">Ca làm việc mới</button>${hasGame()?' <button class="go alt" onclick="start(false)">Tiếp tục ca cũ</button>':''}</div></div>`;
}
function tab(t){S.tab=t;setup()}
function pick(k,v){const o=S[S.tab];o[k]=['hair','shirt','skin'].includes(k)?v:+v;setup()}
function applyDesc(){const o=S[S.tab];o.desc=$('#d').value;parse(o.desc,o);setup()}

let G,hand=[],busy=false;
const NEWG=()=>({en:100,mad:20,pow:0,lies:0,broke:0,money:0,rej:0,day:1,hour:8,td:0,fired:[],snap:{b:0,m:0,r:0,p:0}});
const wd=()=>(G.day-1)%5,wk=()=>Math.floor((G.day-1)/5)+1;
const clamp=(v,a=0,b=100)=>Math.max(a,Math.min(b,v));
const eff=t=>{const W=DAYS[wd()];return{e:t[2]+(W.em||0),b:Math.max(0,t[3]+(W.md||0)),p:Math.round(t[5]*(W.pm||1)),h:t[2]>=18?2:1}};

function start(fresh=true){
 S.me.name=S.me.name||'Bạn';S.boss.name=S.boss.name||'Hùng';
 G=Object.assign(NEWG(),fresh?{}:(loadGame()||{}));
 $('#app').innerHTML=`<div class="hud"><div class="bar"><b>Sức lực</b><i><u id="b1" style="background:#2e9e5b"></u></i></div><div class="bar"><b>Độ bực</b><i><u id="b2" style="background:#d6322f"></u></i></div><div class="bar"><b id="tm">Giờ</b><i><u id="b3" style="background:#3b73c4"></u></i></div></div>
 <p class="stats" id="st"></p>
 <div class="grid gg"><div class="stage" id="stg"><div class="scene" id="sc"></div><div class="bubble" id="bub" aria-live="polite"></div><div id="av"></div><span class="tag" id="tg"></span></div>
 <div class="panel"><h2>${esc(S.me.name)} ${S.role} giao việc hôm nay</h2><div class="banner" id="bn"></div><div class="notes" id="notes"></div>
 <button class="go alt" style="margin:0 6px 12px 0;font-size:15px;padding:8px 14px" onclick="lie()">Vẽ bánh: hứa thăng chức</button><button class="go alt" style="margin:0 0 12px;font-size:15px;padding:8px 14px" onclick="rest()">Cho nghỉ 5 phút</button><button class="go alt" style="margin:0 0 12px 6px;font-size:15px;padding:8px 14px" onclick="menu()">Về menu</button>
 <div class="log" id="log" role="log"></div></div></div><div id="m"></div>`;
 busy=false;deal();draw('ok');say(fresh?'Dạ, chào '+S.role.toLowerCase()+'. Hôm nay em làm gì ạ?':'Dạ, sếp quay lại rồi ạ. Em vẫn ở đây...');
 log(fresh?`${S.boss.name} đã nhận bàn ở góc khuất cạnh nhà vệ sinh.`:'Tiếp tục ca làm việc đang dở.');
 if(G.mad>=100)resign();else if(G.hour>=17)endDay();
}
function deal(){
 hand=[...POOL].sort(()=>Math.random()-.5).slice(0,4);
 $('#notes').innerHTML=hand.map((t,i)=>{const x=eff(t);return `<button class="note" style="--r:${[-2,1.5,-1,2.5][i]}deg" onclick="act(${i})">${t[0]}<small>Tốn ${x.e} sức · ${x.h} giờ · +${x.p} quyền lực</small></button>`}).join('');
}
function mood(){return G.mad>=90?'cry':G.mad>=65?'angry':G.en<30?'tired':'ok'}
function draw(m){saveGame(G);$('#sc').innerHTML=scene(G.hour,G.td);$('#av').innerHTML=av(S.boss,m||mood());$('#tg').textContent='Nhân viên '+S.boss.name;
 $('#b1').style.width=G.en+'%';$('#b2').style.width=G.mad+'%';$('#b3').style.width=((G.hour-8)/9*100)+'%';$('#tm').textContent='Giờ: '+G.hour+':00';
 $('#bn').textContent=DAYS[wd()].name+': '+DAYS[wd()].note;
 const r=G.pow<100?'Sếp tập sự':G.pow<300?'Sếp thứ thiệt':G.pow<600?'Sếp độc tài':'Bạo chúa văn phòng';
 $('#st').innerHTML=`<span>Tuần <b>${wk()}</b> · <b>${DAYS[wd()].name}</b></span><span>Danh hiệu: <b>${r}</b></span><span>Quyền lực: <b>${G.pow}</b></span><span>Đồ vỡ: <b>${G.broke}</b></span><span>Trừ lương: <b>${G.money.toLocaleString('vi-VN')}đ</b></span><span>Đơn nghỉ bị xé: <b>${G.rej}</b></span><span>Bánh vẽ: <b>${G.lies}</b></span>`}
function say(t){$('#bub').textContent=t}
function log(t,bad){const p=document.createElement('p');p.textContent=t;if(bad)p.className='bad';$('#log').prepend(p)}
const rnd=a=>a[Math.floor(Math.random()*a.length)];
function wob(){const a=$('#av');a.classList.add('bowing');setTimeout(()=>a.classList.remove('bowing'),900)}

function act(i){
 if(busy||!G)return;const t=hand[i],x=eff(t),h0=G.hour;
 G.en=clamp(G.en-x.e);G.mad=clamp(G.mad+x.b);G.pow+=x.p;G.td++;G.hour=Math.min(17,G.hour+x.h);
 wob();log(`[${h0}h] Giao: ${t[0]}.`);
 if(Math.random()<t[4]){const c=(2+Math.floor(Math.random()*8))*50000;G.broke++;G.money+=c;
  log(`Choang! ${S.boss.name} làm vỡ ${t[1]}. Trừ lương ${c.toLocaleString('vi-VN')}đ.`,1);say('Á! Em không cố ý đâu ạ!')}
 else say(G.mad>45?rnd(MAD):rnd(OKS));
 if(G.en==0){log(`${S.boss.name} ngã quỵ xuống sàn. Bạn bảo "diễn sâu quá".`,1);say('Em... hết... pin...')}
 sched();draw();after();
}
function sched(){for(const ev of SCHEDULE[wd()]||[]){const k=G.day+':'+ev.h;if(!G.fired.includes(k)&&G.hour>=ev.h){G.fired.push(k);G.en=clamp(G.en+ev.e);G.mad=clamp(G.mad+ev.m);G.pow+=ev.p;log(`[${ev.h}h] ${ev.t}`,1);say(ev.say)}}}
function after(){if(G.mad>=100){resign();return}if(G.hour>=17){endDay();return}deal()}
function lie(){if(!G||busy)return;G.lies++;G.mad=Math.max(0,G.mad-30);log('Bạn hứa: "Tháng sau anh được thăng chức." Không có thật.');say('Thật không ạ? Em tin sếp!');draw()}
function rest(){if(!G||busy)return;G.en=Math.min(100,G.en+30);G.pow=Math.max(0,G.pow-10);log('Cho nghỉ 5 phút. Quyền lực -10 vì quá nhân từ.');say('Cảm ơn sếp... nhưng chỉ 5 phút thôi à?');draw()}

function endDay(){
 busy=true;draw();
 const s=G.snap,fri=wd()==4;
 $('#m').innerHTML=`<div class="modal"><div class="paper"><h2>HẾT NGÀY LÀM VIỆC</h2><p style="text-align:center"><b>Tuần ${wk()} · ${DAYS[wd()].name}</b></p>
 <p>Việc đã giao: <b>${G.td}</b><br>Đồ vỡ: <b>${G.broke-s.b}</b><br>Trừ lương: <b>${(G.money-s.m).toLocaleString('vi-VN')}đ</b><br>Đơn nghỉ bị xé: <b>${G.rej-s.r}</b><br>Quyền lực: <b>+${G.pow-s.p}</b></p>
 <p><i>${esc(S.boss.name)}: "${rnd(BYE)}"</i></p>${fri?'<p><b>Cuối tuần:</b> sếp cũ được nghỉ 2 ngày. Bạn vẫn nhắn Zalo giao việc "đọc cho biết".</p>':''}
 <button class="go" style="font-size:16px" onclick="nextDay()">${fri?'Chốt tuần, sang tuần mới':'Sang ngày mới'}</button></div></div>`;
}
function nextDay(){
 const fri=wd()==4;G.day++;G.hour=8;G.td=0;G.fired=[];G.snap={b:G.broke,m:G.money,r:G.rej,p:G.pow};
 G.en=clamp(G.en+(fri?100:55));G.mad=clamp(G.mad-(fri?35:20));busy=false;$('#m').innerHTML='';
 log(`— Tuần ${wk()} · ${DAYS[wd()].name} —`);say('Dạ, lại một ngày mới ạ...');draw();deal();
}

function resign(){
 busy=true;draw('cry');
 $('#m').innerHTML=`<div class="modal"><div class="paper"><h2>ĐƠN XIN NGHỈ VIỆC</h2><p>Kính gửi ${S.role} ${esc(S.me.name)},</p><p>Tôi, <b>${esc(S.boss.name)}</b>, xin nghỉ việc vì: <i>${rnd(LEAVE)}</i></p>
 <p style="text-align:right">Ký tên: ${esc(S.boss.name)} (đã khóc)</p>
 <button class="go" style="font-size:16px" onclick="rej()">Không duyệt (xé đơn)</button> <button class="go alt" style="font-size:16px" onclick="ok()">Duyệt</button><div class="toast" id="ts"></div></div></div>`;
}
function ok(){$('#ts').textContent='Hệ thống: Bạn không đủ quyền hạn để duyệt đơn này.'}
function rej(){
 G.rej++;G.mad=55;G.en=Math.max(15,G.en-10);G.pow+=40;busy=false;$('#m').innerHTML='';
 log(`Bạn xé đơn xin nghỉ việc lần thứ ${G.rej}. Tăng KPI cho ${S.boss.name}.`,1);say('...Dạ vâng. Em hiểu rồi ạ.');draw();after();
}

function randomize(){const o=S[S.tab];for(const k of Object.keys(OPT)){const a=OPT[k];o[k]=a[Math.floor(Math.random()*a.length)][1]}setup()}
function menu(){busy=false;$('#m')&&($('#m').innerHTML='');setup()}
function wipe(){if(confirm('Xóa nhân vật và ca làm việc đã lưu?')){clearAll();location.reload()}}
function setName(v){S[S.tab].name=v;saveChar()}
Object.assign(window,{nextDay,menu,wipe,randomize,S,setup,tab,pick,applyDesc,setName,start,act,lie,rest,rej,ok});
loadChar();setup();
