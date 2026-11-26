const $=s=>document.querySelector(s);
const OPT={
 body:[['Gầy',0],['Vừa',1],['Béo',2]],
 h:[['Thấp',0],['Vừa',1],['Cao',2]],
 hs:[['Tóc ngắn',0],['Hói',1],['Tóc dài',2]],
 hair:[['Đen','#222'],['Bạc','#cfd3d8'],['Nâu','#6b4226'],['Đỏ','#b3382c'],['Vàng','#d9a93a']],
 gl:[['Không kính',0],['Đeo kính',1]],
 shirt:[['Trắng','#f4f4f0'],['Xanh','#3b73c4'],['Hồng','#e58aa9'],['Đen','#26272b'],['Đỏ','#c9302c'],['Vàng','#e8b93a']],
 tie:[['Không',0],['Cà vạt',1]]
};
const LAB={body:'Dáng người',h:'Chiều cao',hs:'Kiểu tóc',hair:'Màu tóc',gl:'Kính',shirt:'Màu áo',tie:'Cà vạt'};
const ROLES=['Giám đốc','Tổng giám đốc','Trưởng phòng','Phó phòng','Chủ tịch'];
const S={tab:'me',role:'Giám đốc',
 me:{name:'',body:1,h:1,hs:0,hair:'#222',gl:0,shirt:'#f4f4f0',tie:1,desc:''},
 boss:{name:'Hùng',body:2,h:0,hs:1,hair:'#cfd3d8',gl:1,shirt:'#f4f4f0',tie:1,desc:''}};

function av(o,mood){
 const bw=[24,32,46][o.body],sc=[.88,1,1.1][o.h],sk='#f1c9a5';
 let hair='';
 if(o.hs==0)hair=`<path d="M38 46Q38 22 60 22Q82 22 82 46Q70 34 60 34Q50 34 38 46Z" fill="${o.hair}"/>`;
 if(o.hs==1)hair=`<ellipse cx="38" cy="52" rx="4" ry="9" fill="${o.hair}"/><ellipse cx="82" cy="52" rx="4" ry="9" fill="${o.hair}"/>`;
 if(o.hs==2)hair=`<path d="M38 46Q38 22 60 22Q82 22 82 46Q70 34 60 34Q50 34 38 46Z" fill="${o.hair}"/><rect x="36" y="40" width="8" height="42" rx="4" fill="${o.hair}"/><rect x="76" y="40" width="8" height="42" rx="4" fill="${o.hair}"/>`;
 const mouth={ok:'M52 60Q60 67 68 60',tired:'M53 63L67 63',angry:'M52 65Q60 57 68 65',cry:'M52 65Q60 57 68 65'}[mood];
 const brow=mood=='angry'||mood=='cry'?'<path d="M47 41L57 44M73 41L63 44" stroke="#222" stroke-width="2.5"/>':'';
 const extra=(mood=='cry'?'<circle cx="47" cy="58" r="3" fill="#4aa3ff"/><circle cx="73" cy="58" r="3" fill="#4aa3ff"/>':'')+(mood=='tired'?'<path d="M84 34q4 7 0 10q-4-3 0-10z" fill="#4aa3ff"/>':'');
 return `<svg viewBox="0 0 120 200" role="img" aria-label="Nhân vật ${o.name||''}"><g transform="translate(60 196) scale(${sc}) translate(-60 -196)">
 <rect x="${60-bw*.5}" y="128" width="${bw*.42}" height="62" fill="#2b3350"/><rect x="${60+bw*.08}" y="128" width="${bw*.42}" height="62" fill="#2b3350"/>
 <ellipse cx="${60-bw*.3}" cy="192" rx="${bw*.3+4}" ry="5" fill="#111"/><ellipse cx="${60+bw*.3}" cy="192" rx="${bw*.3+4}" ry="5" fill="#111"/>
 <rect x="${60-bw-8}" y="76" width="10" height="52" rx="5" fill="${o.shirt}" stroke="#0003"/><rect x="${60+bw-2}" y="76" width="10" height="52" rx="5" fill="${o.shirt}" stroke="#0003"/>
 <rect x="${60-bw}" y="70" width="${bw*2}" height="72" rx="18" fill="${o.shirt}" stroke="#0003"/>
 ${o.tie?'<path d="M60 72L55 80L60 112L65 80Z" fill="#c9302c"/>':''}
 <circle cx="60" cy="48" r="22" fill="${sk}"/>${hair}
 <circle cx="52" cy="49" r="2.5" fill="#222"/><circle cx="68" cy="49" r="2.5" fill="#222"/>${brow}
 ${o.gl?'<g fill="#fff6" stroke="#222" stroke-width="2"><circle cx="52" cy="49" r="7"/><circle cx="68" cy="49" r="7"/><path d="M59 49h2"/></g>':''}
 <path d="${mouth}" stroke="#7a2e2e" stroke-width="2.5" fill="none" stroke-linecap="round"/>${extra}</g></svg>`;
}

function parse(t,o){
 t=t.toLowerCase();
 if(/béo|mập|bự|phì/.test(t))o.body=2;
 if(/gầy|ốm|còm|mảnh/.test(t))o.body=0;
 if(/cao|lêu/.test(t))o.h=2;
 if(/thấp|lùn|bé tí/.test(t))o.h=0;
 if(/hói|trọc|sói/.test(t))o.hs=1;
 if(/tóc dài|tóc xõa/.test(t))o.hs=2;
 if(/tóc ngắn/.test(t))o.hs=0;
 if(/bạc|trắng xóa/.test(t)&&/tóc|bạc/.test(t)){o.hair='#cfd3d8';}
 if(/tóc (đen)/.test(t))o.hair='#222';
 if(/tóc nâu/.test(t))o.hair='#6b4226';
 if(/tóc đỏ/.test(t))o.hair='#b3382c';
 if(/tóc vàng/.test(t))o.hair='#d9a93a';
 if(/kính/.test(t))o.gl=/không.*kính/.test(t)?0:1;
 if(/cà vạt|vest/.test(t))o.tie=1;
 const c={'trắng':'#f4f4f0','xanh':'#3b73c4','hồng':'#e58aa9','đen':'#26272b','đỏ':'#c9302c','vàng':'#e8b93a'};
 const m=t.match(/áo\s+(?:màu\s+)?(trắng|xanh|hồng|đen|đỏ|vàng)/);
 if(m)o.shirt=c[m[1]];
}

function setup(){
 const o=S[S.tab],mine=S.tab=='me';
 const rows=Object.keys(OPT).map(k=>`<div class="row"><label>${LAB[k]}</label><div class="chips">${OPT[k].map(([l,v])=>`<button class="chip ${o[k]==v?'on':''}" onclick="pick('${k}','${v}')">${l}</button>`).join('')}</div></div>`).join('');
 $('#app').innerHTML=`<h1>Đảo Vai Văn Phòng</h1><p class="sub">Hôm nay anh sếp cũ làm nhân viên. Còn bạn là người ký duyệt.</p>
 <div class="grid"><div class="stage"><span class="tag">${mine?(o.name||'Bạn')+' · '+S.role:'Nhân viên '+(o.name||'???')}</span>${av(o,'ok')}</div>
 <div class="panel"><div class="tabs"><button class="${mine?'on':''}" onclick="tab('me')">Bạn (sếp mới)</button><button class="${mine?'':'on'}" onclick="tab('boss')">Sếp cũ (nhân viên)</button></div>
 <div class="row"><label>Tên ${mine?'của bạn':'sếp cũ'}</label><input type="text" maxlength="20" value="${o.name}" placeholder="${mine?'Ví dụ: Lan':'Ví dụ: Hùng'}" oninput="S[S.tab].name=this.value"></div>
 ${mine?`<div class="row"><label>Chức vụ</label><div class="chips">${ROLES.map(r=>`<button class="chip ${S.role==r?'on':''}" onclick="S.role='${r}';setup()">${r}</button>`).join('')}</div></div>`:''}
 <div class="row"><label>Hoặc mô tả bằng lời</label><textarea rows="2" id="d" placeholder="Ví dụ: béo, lùn, tóc bạc, đeo kính, áo đỏ">${o.desc}</textarea><button class="chip" style="margin-top:6px" onclick="applyDesc()">Tạo theo mô tả</button></div>
 ${rows}<button class="go" onclick="start()">Vào ca làm việc</button></div></div>`;
}
function tab(t){S.tab=t;setup()}
function pick(k,v){const o=S[S.tab];o[k]=(k=='hair'||k=='shirt')?v:+v;setup()}
function applyDesc(){const o=S[S.tab];o.desc=$('#d').value;parse(o.desc,o);setup()}

const POOL=[
 ['Pha cà phê, chê nhạt, bắt pha lại','ly',12,10,.15,12],
 ['Photo 300 tờ rồi xé đi photo lại','máy photo',14,12,.2,15],
 ['Đi mua trà sữa lúc 11 giờ đêm','ly trà sữa',16,10,.15,12],
 ['Bê chậu cây ra ban công rồi bê vào','chậu cây',18,12,.3,15],
 ['Lau bàn của tôi bằng chính cà vạt của anh','cà vạt',8,15,.1,15],
 ['Sửa máy in (nó không hỏng)','máy in',15,14,.25,18],
 ['Viết báo cáo doanh thu bằng thơ lục bát','bút',12,12,.05,12],
 ['Gọi 50 khách hàng để chúc ngủ ngon','điện thoại',16,14,.15,18],
 ['Đứng quạt cho tôi suốt buổi họp','quạt',14,10,.2,12],
 ['Tìm file final_final_v9_thật_sự_final.docx','laptop',12,16,.2,15],
 ['Dắt chó của tôi đi dạo (nó đang ở Vũng Tàu)','dây dắt chó',20,16,.1,20],
 ['Rót trà đúng 70 độ, không hơn không kém','ấm trà',10,10,.25,12],
 ['Xếp lại ghế phòng họp theo thứ tự chiều cao','ghế',15,12,.3,15],
 ['Khiêng bình nước 20 lít lên tầng 5 (không thang máy)','bình nước',22,12,.3,20]
];
const OKS=['Dạ... vâng ạ.','Em làm ngay, thưa sếp.','(thở dài thườn thượt) Vâng...','Dạ, đang làm... đang làm...','Hôm qua em cũng làm cái này mà...'];
const MAD=['Chỗ này đáng lương hơn chứ nhỉ...','Em là nhân viên chứ không phải con quay ạ!','Hồi em làm sếp em đâu có thế này!','Sếp có biết tay em sắp rụng không?','Thế này là bóc lột sức lao động!'];
const LEAVE=['Tôi đau lưng, đau tay, và đau cả lòng.','Tôi muốn đi trồng rau.','Tôi cần thời gian để tìm lại chính mình.','Công ty này sai khiến tôi hơn cả mẹ tôi.'];
let G,hand=[],busy=false;

function start(){
 S.me.name=S.me.name||'Bạn';S.boss.name=S.boss.name||'Hùng';
 G={en:100,mad:20,pow:0,lies:0,broke:0,money:0,rej:0};
 $('#app').innerHTML=`<div class="hud"><div class="bar"><b>Sức lực</b><i><u id="b1" style="background:#2e9e5b"></u></i></div><div class="bar"><b>Độ bực</b><i><u id="b2" style="background:#d6322f"></u></i></div></div>
 <p class="stats" id="st"></p>
 <div class="grid"><div class="stage" id="stg"><div class="bubble" id="bub"></div><div id="av"></div><span class="tag" id="tg"></span></div>
 <div class="panel"><h2>${S.me.name} ${S.role} giao việc hôm nay</h2><div class="notes" id="notes"></div>
 <button class="go alt" style="margin:0 6px 12px 0;font-size:15px;padding:8px 14px" onclick="lie()">Vẽ bánh: hứa thăng chức</button><button class="go alt" style="margin:0 0 12px;font-size:15px;padding:8px 14px" onclick="rest()">Cho nghỉ 5 phút</button>
 <div class="log" id="log"></div></div></div><div id="m"></div>`;
 deal();draw('ok');say('Dạ, chào '+S.role.toLowerCase()+'. Hôm nay em làm gì ạ?');
 log(`${S.boss.name} đã nhận bàn ở góc khuất cạnh nhà vệ sinh.`);
}
function deal(){
 hand=[...POOL].sort(()=>Math.random()-.5).slice(0,4);
 $('#notes').innerHTML=hand.map((t,i)=>`<button class="note" style="--r:${[-2,1.5,-1,2.5][i]}deg" onclick="act(${i})">${t[0]}<small>Tốn ${t[2]} sức · +${t[5]} quyền lực</small></button>`).join('');
}
function mood(){return G.mad>=90?'cry':G.mad>=65?'angry':G.en<30?'tired':'ok'}
function draw(m){$('#av').innerHTML=av(S.boss,m||mood());$('#tg').textContent='Nhân viên '+S.boss.name;
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
setup();
