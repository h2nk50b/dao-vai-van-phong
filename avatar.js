// Vẽ nhân vật SVG nhiều lớp (hoạt hình phẳng, viền đậm). Nhóm .bd = thân, .hd = đầu, .eyes = mắt để làm hoạt ảnh bằng CSS.
export const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const dk=(c,f=.14)=>{const n=parseInt(c.slice(1),16);return '#'+[n>>16&255,n>>8&255,n&255].map(v=>Math.round(v*(1-f)).toString(16).padStart(2,'0')).join('')};
export function av(o,mood){
 const bw=[24,32,46][o.body],sc=[.88,1,1.1][o.h],sk=o.skin||'#f1c9a0',sd=dk(sk),L='#1b2a41',hr=o.hair,tp=o.top||0,hs=o.hs;
 const S=(w=2.4,c=L)=>`stroke="${c}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`,sw=S();
 const X=60-bw,lw=bw*.45;
 const circ=a=>a.map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}"/>`).join('');
 const fr0=`<path d="M38 44Q36 20 60 20Q84 20 82 44Q76 32 66 33Q58 28 50 34Q42 32 38 44Z" fill="${hr}" ${sw}/>`;
 const fr5=`<path d="M38 45Q36 19 61 19Q85 20 82 45Q78 33 70 31Q52 36 38 45Z" fill="${hr}" ${sw}/><path d="M52 24Q62 21 72 25" stroke="#fff" stroke-opacity=".5" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
 let back='',hair=fr0;
 if(hs==1)hair=`<path d="M39 43Q34 52 40 59Q42 50 41 44Z" fill="${hr}" ${sw}/><path d="M81 43Q86 52 80 59Q78 50 79 44Z" fill="${hr}" ${sw}/><path d="M50 29Q58 25 66 29" stroke="#fff" stroke-opacity=".6" stroke-width="3" fill="none" stroke-linecap="round"/>`;
 if(hs==2)back=`<path d="M36 44Q36 16 60 16Q84 16 84 44L87 88Q60 96 33 88Z" fill="${hr}" ${sw}/>`;
 if(hs==3){back=`<g fill="${hr}" ${sw}>${circ([[42,30,10],[55,23,11],[68,23,11],[79,30,10],[37,42,8],[83,42,8]])}</g>`;hair=`<g fill="${hr}" ${sw}>${circ([[48,29,7],[60,26,8],[72,29,7]])}</g>`}
 if(hs==4)back=`<path d="M80 34Q110 34 100 82Q94 62 80 50Z" fill="${hr}" ${sw}/><circle cx="82" cy="37" r="3.2" fill="#d6322f" ${S(1.5)}/>`;
 if(hs==5)hair=fr5;
 const ry=mood=='tired'?2.2:5;
 const eyes=[52,68].map(x=>`<ellipse cx="${x}" cy="47" rx="4.2" ry="${ry}" fill="#fff" ${S(1.6)}/><circle cx="${x+.6}" cy="47.5" r="${ry>3?2.4:1.6}" fill="${L}"/>${ry>3?`<circle cx="${x+1.4}" cy="46" r=".9" fill="#fff"/>`:''}`).join('');
 const brows={ok:'M46 39Q51 36 57 39M63 39Q69 36 74 39',angry:'M45 37L57 42M75 37L63 42',tired:'M46 40L57 38M74 40L63 38',cry:'M46 41L57 37M74 41L63 37'}[mood];
 const mouth={ok:'M52 59Q60 66 68 59',tired:'M53 62Q57 60 60 62Q63 64 67 62',angry:'M52 65Q60 57 68 65'}[mood];
 const mouthEl=mood=='cry'?`<path d="M53 67Q60 57 67 67Q60 64 53 67Z" fill="#7a2e2e" ${S(1.8)}/>`:`<path d="${mouth}" ${S(2.4,'#7a2e2e')} fill="none"/>`;
 const extra=(mood=='cry'?'<g class="tear"><path d="M46 52q-3 6 0 9q3-3 0-9zM74 52q3 6 0 9q-3-3 0-9z" fill="#4aa3ff"/></g>':'')+(mood=='tired'?'<g class="sweat"><path d="M86 30q5 8 0 12q-5-4 0-12z" fill="#4aa3ff" stroke="#1b2a41" stroke-width="1.5"/></g>':'');
 const beard=o.beard==1?`<path d="M40 50Q40 76 60 77Q80 76 80 50Q76 63 60 63Q44 63 40 50Z" fill="${hr}" ${sw}/>`:o.beard==2?`<path d="M51 57Q55 54 60 56Q65 54 69 57Q64 60 60 58Q56 60 51 57Z" fill="${hr}" ${S(1.8)}/>`:'';
 const mask=o.acc==1?`<path d="M41 54Q60 52 79 54L77 70Q60 78 43 70Z" fill="#e8f1f4" ${sw}/><path d="M46 60h24M47 65h22" stroke="#b7c9cf" stroke-width="1.4"/>`:'';
 const cap=o.acc==2?`<path d="M37 41Q38 15 61 15Q84 15 83 41Q60 34 37 41Z" fill="#c9302c" ${sw}/><path d="M78 38Q100 35 101 42Q92 45 80 42Z" fill="#9e2220" ${sw}/><circle cx="61" cy="15.5" r="2.4" fill="#9e2220"/>`:'';
 const tie=o.tie&&tp!=1?`<path d="M56 79h8l-2 6h-4zM58 85h4l3 36-5 5-5-5z" fill="#d6322f" ${S(1.8)}/>`:'';
 let neck=`<path d="M51 70L60 83L69 70Z" fill="#fff" ${sw}/>`;
 if(tp==1)neck=`<path d="M51 70Q60 84 69 70Z" fill="${sd}" ${sw}/>`;
 if(tp==2)neck=`<path d="M51 70L60 100L69 70Z" fill="#fff" ${sw}/><path d="M51 70L58 104L44 88Z" fill="${dk(o.shirt,.25)}" ${sw}/><path d="M69 70L62 104L76 88Z" fill="${dk(o.shirt,.25)}" ${sw}/>`;
 const gl=o.gl?`<g fill="#fff" fill-opacity=".3" stroke="${L}" stroke-width="2.2"><circle cx="52" cy="47" r="8"/><circle cx="68" cy="47" r="8"/><path d="M44 46L39 45M76 46L81 45" fill="none" stroke-linecap="round"/></g>`:'';
 return `<svg viewBox="0 0 120 200" class="m-${mood}" role="img" aria-label="Nhân vật ${esc(o.name||'')}"><g transform="translate(60 196) scale(${sc}) translate(-60 -196)">
 <ellipse cx="60" cy="194" rx="${bw+16}" ry="5" fill="#000" opacity=".2"/><g class="fig">
 <g class="bd">
 <rect x="${60-bw*.5}" y="136" width="${lw}" height="54" rx="3" fill="#2b3350" ${sw}/><rect x="${60+bw*.05}" y="136" width="${lw}" height="54" rx="3" fill="#2b3350" ${sw}/>
 <ellipse cx="${60-bw*.5+lw/2-1}" cy="191" rx="${lw/2+5}" ry="5" fill="#15151c" ${sw}/><ellipse cx="${60+bw*.05+lw/2+1}" cy="191" rx="${lw/2+5}" ry="5" fill="#15151c" ${sw}/>
 <rect x="54" y="60" width="12" height="16" fill="${sd}" ${sw}/>
 <rect x="${X-10}" y="74" width="12" height="50" rx="6" fill="${o.shirt}" ${sw}/><circle cx="${X-4}" cy="128" r="6" fill="${sk}" ${sw}/>
 <rect x="${60+bw-2}" y="74" width="12" height="50" rx="6" fill="${o.shirt}" ${sw}/><circle cx="${60+bw+4}" cy="128" r="6" fill="${sk}" ${sw}/>
 <rect x="${X}" y="70" width="${bw*2}" height="74" rx="20" fill="${o.shirt}" ${sw}/>
 <path d="M${60+bw*.45} 74Q${60+bw-1} 80 ${60+bw-3} 138Q${60+bw*.6} 141 ${60+bw*.45} 139Z" fill="#000" opacity=".08"/>
 <rect x="${X+1}" y="128" width="${bw*2-2}" height="7" fill="#3a2a1d" ${S(1.8)}/><rect x="56" y="127" width="8" height="9" rx="1.5" fill="#e8b93a" ${S(1.6)}/>
 ${neck}${tie}</g>
 <g class="hd">${back}
 <circle cx="39" cy="49" r="5" fill="${sk}" ${sw}/><circle cx="81" cy="49" r="5" fill="${sk}" ${sw}/>
 <ellipse cx="60" cy="46" rx="21" ry="22" fill="${sk}" ${sw}/>
 <ellipse cx="46" cy="57" rx="4.5" ry="3" fill="#f2828a" opacity=".4"/><ellipse cx="74" cy="57" rx="4.5" ry="3" fill="#f2828a" opacity=".4"/>
 ${beard}<g class="eyes">${eyes}</g><path d="${brows}" ${S(2.6)} fill="none"/><path d="M59 50Q63 54 59 56" stroke="${sd}" stroke-width="2" fill="none" stroke-linecap="round"/>${mouthEl}${mask}${extra}
 ${hair}${gl}${cap}</g></g></g></svg>`;
}

export function parse(t,o){
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
 if(/xoăn|quăn/.test(t))o.hs=3;
 if(/đuôi ngựa|buộc tóc/.test(t))o.hs=4;
 if(/rẽ ngôi/.test(t))o.hs=5;
 if(/da (đen|nâu)/.test(t))o.skin='#8d5a3b';
 else if(/da ngăm/.test(t))o.skin='#c98f63';
 else if(/da (trắng|sáng)/.test(t))o.skin='#f9d5b4';
 if(/\bria\b/.test(t))o.beard=2;
 if(/râu|quai nón/.test(t))o.beard=1;
 if(/khẩu trang/.test(t))o.acc=1;
 else if(/(^|[\s,])(mũ|nón)([\s,.]|$)/.test(t))o.acc=2;
 if(/áo thun|áo phông/.test(t))o.top=1;
 if(/vest|com lê/.test(t))o.top=2;
 if(/sơ mi/.test(t))o.top=0;
}

