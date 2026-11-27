import {OPT,LAB,ROLES,POOL,OKS,MAD,LEAVE} from './data.js';
import {av,parse} from './avatar.js';
import {S,saveChar,loadChar,saveGame,loadGame,hasGame} from './state.js';
const $=s=>document.querySelector(s);
function setup(){saveChar();
 const o=S[S.tab],mine=S.tab=='me';
 const rows=Object.keys(OPT).map(k=>`<div class="row"><label>${LAB[k]}</label><div class="chips">${OPT[k].map(([l,v])=>`<button class="chip ${o[k]==v?'on':''}" onclick="pick('${k}','${v}')">${l}</button>`).join('')}</div></div>`).join('');
 $('#app').innerHTML=`<h1>Đảo Vai Văn Phòng</h1><p class="sub">Hôm nay anh sếp cũ làm nhân viên. Còn bạn là người ký duyệt.</p>
 <div class="grid"><div class="stage"><span class="tag">${mine?(o.name||'Bạn')+' · '+S.role:'Nhân viên '+(o.name||'???')}</span>${av(o,'ok')}</div>
 <div class="panel"><div class="tabs"><button class="${mine?'on':''}" onclick="tab('me')">Bạn (sếp mới)</button><button class="${mine?'':'on'}" onclick="tab('boss')">Sếp cũ (nhân viên)</button></div>
 <div class="row"><label>Tên ${mine?'của bạn':'sếp cũ'}</label><input type="text" maxlength="20" value="${o.name}" placeholder="${mine?'Ví dụ: Lan':'Ví dụ: Hùng'}" oninput="setName(this.value)"></div>
 ${mine?`<div class="row"><label>Chức vụ</label><div class="chips">${ROLES.map(r=>`<button class="chip ${S.role==r?'on':''}" onclick="S.role='${r}';setup()">${r}</button>`).join('')}</div></div>`:''}
 <div class="row"><label>Hoặc mô tả bằng lời</label><textarea rows="2" id="d" placeholder="Ví dụ: béo, lùn, tóc bạc, đeo kính, áo đỏ">${o.desc}</textarea><button class="chip" style="margin-top:6px" onclick="applyDesc()">Tạo theo mô tả</button></div>
 ${rows}<button class="go" onclick="start(true)">Ca làm việc mới</button>${hasGame()?' <button class="go alt" onclick="start(false)">Tiếp tục ca cũ</button>':''}</div></div>`;
}
function tab(t){S.tab=t;setup()}
function pick(k,v){const o=S[S.tab];o[k]=(k=='hair'||k=='shirt')?v:+v;setup()}
function applyDesc(){const o=S[S.tab];o.desc=$('#d').value;parse(o.desc,o);setup()}

let G,hand=[],busy=false;

function start(fresh=true){
 S.me.name=S.me.name||'Bạn';S.boss.name=S.boss.name||'Hùng';
 const NEW={en:100,mad:20,pow:0,lies:0,broke:0,money:0,rej:0};G=fresh?NEW:(loadGame()||NEW);
 $('#app').innerHTML=`<div class="hud"><div class="bar"><b>Sức lực</b><i><u id="b1" style="background:#2e9e5b"></u></i></div><div class="bar"><b>Độ bực</b><i><u id="b2" style="background:#d6322f"></u></i></div></div>
 <p class="stats" id="st"></p>
 <div class="grid"><div class="stage" id="stg"><div class="bubble" id="bub"></div><div id="av"></div><span class="tag" id="tg"></span></div>
 <div class="panel"><h2>${S.me.name} ${S.role} giao việc hôm nay</h2><div class="notes" id="notes"></div>
 <button class="go alt" style="margin:0 6px 12px 0;font-size:15px;padding:8px 14px" onclick="lie()">Vẽ bánh: hứa thăng chức</button><button class="go alt" style="margin:0 0 12px;font-size:15px;padding:8px 14px" onclick="rest()">Cho nghỉ 5 phút</button>
 <div class="log" id="log"></div></div></div><div id="m"></div>`;
 deal();draw('ok');say(fresh?'Dạ, chào '+S.role.toLowerCase()+'. Hôm nay em làm gì ạ?':'Dạ, sếp quay lại rồi ạ. Em vẫn ở đây...');
 log(fresh?`${S.boss.name} đã nhận bàn ở góc khuất cạnh nhà vệ sinh.`:'Tiếp tục ca làm việc đang dở.');
 if(G.mad>=100)resign();
}
function deal(){
 hand=[...POOL].sort(()=>Math.random()-.5).slice(0,4);
 $('#notes').innerHTML=hand.map((t,i)=>`<button class="note" style="--r:${[-2,1.5,-1,2.5][i]}deg" onclick="act(${i})">${t[0]}<small>Tốn ${t[2]} sức · +${t[5]} quyền lực</small></button>`).join('');
}
function mood(){return G.mad>=90?'cry':G.mad>=65?'angry':G.en<30?'tired':'ok'}
function draw(m){saveGame(G);$('#av').innerHTML=av(S.boss,m||mood());$('#tg').textContent='Nhân viên '+S.boss.name;
 $('#b1').style.width=G.en+'%';$('#b2').style.width=G.mad+'%';
 const r=G.pow<100?'Sếp tập sự':G.pow<300?'Sếp thứ thiệt':G.pow<600?'Sếp độc tài':'Bạo chúa văn phòng';
 $('#st').innerHTML=`<span>Danh hiệu: <b>${r}</b></span><span>Quyền lực: <b>${G.pow}</b></span><span>Đồ vỡ: <b>${G.broke}</b></span><span>Trừ lương: <b>${G.money.toLocaleString('vi-VN')}đ</b></span><span>Đơn nghỉ bị xé: <b>${G.rej}</b></span><span>Bánh vẽ: <b>${G.lies}</b></span>`}
function say(t){$('#bub').textContent=t}
function log(t,bad){const p=document.createElement('p');p.textContent=t;if(bad)p.className='bad';$('#log').prepend(p)}
const rnd=a=>a[Math.floor(Math.random()*a.length)];
function wob(){const a=$('#av');a.classList.remove('work');void a.offsetWidth;a.classList.add('work')}

function act(i){
 if(busy||!G)return;const t=hand[i];
 G.en=Math.max(0,G.en-t[2]);G.mad=Math.min(100,G.mad+t[3]);G.pow+=t[5];
 wob();log(`Giao: ${t[0]}.`);
 if(Math.random()<t[4]){const c=(2+Math.floor(Math.random()*8))*50000;G.broke++;G.money+=c;
  log(`Choang! ${S.boss.name} làm vỡ ${t[1]}. Trừ lương ${c.toLocaleString('vi-VN')}đ.`,1);say('Á! Em không cố ý đâu ạ!')}
 else say(G.mad>45?rnd(MAD):rnd(OKS));
 if(G.en==0){log(`${S.boss.name} ngã quỵ xuống sàn. Bạn bảo "diễn sâu quá".`,1);say('Em... hết... pin...')}
 draw();
 if(G.mad>=100){resign();return}
 deal();
}
function lie(){if(!G||busy)return;G.lies++;G.mad=Math.max(0,G.mad-30);log('Bạn hứa: "Tháng sau anh được thăng chức." Không có thật.');say('Thật không ạ? Em tin sếp!');draw()}
function rest(){if(!G||busy)return;G.en=Math.min(100,G.en+30);G.pow=Math.max(0,G.pow-10);log('Cho nghỉ 5 phút. Quyền lực -10 vì quá nhân từ.');say('Cảm ơn sếp... nhưng chỉ 5 phút thôi à?');draw()}

function resign(){
 busy=true;draw('cry');
 $('#m').innerHTML=`<div class="modal"><div class="paper"><h2>ĐƠN XIN NGHỈ VIỆC</h2><p>Kính gửi ${S.role} ${S.me.name},</p><p>Tôi, <b>${S.boss.name}</b>, xin nghỉ việc vì: <i>${rnd(LEAVE)}</i></p>
 <p style="text-align:right">Ký tên: ${S.boss.name} (đã khóc)</p>
 <button class="go" style="font-size:16px" onclick="rej()">Không duyệt (xé đơn)</button> <button class="go alt" style="font-size:16px" onclick="ok()">Duyệt</button><div class="toast" id="ts"></div></div></div>`;
}
function ok(){$('#ts').textContent='Hệ thống: Bạn không đủ quyền hạn để duyệt đơn này.'}
function rej(){
 G.rej++;G.mad=55;G.en=Math.max(15,G.en-10);G.pow+=40;busy=false;$('#m').innerHTML='';
 log(`Bạn xé đơn xin nghỉ việc lần thứ ${G.rej}. Tăng KPI cho ${S.boss.name}.`,1);say('...Dạ vâng. Em hiểu rồi ạ.');draw();deal();
}

function setName(v){S[S.tab].name=v;saveChar()}
Object.assign(window,{S,setup,tab,pick,applyDesc,setName,start,act,lie,rest,rej,ok});
loadChar();setup();
