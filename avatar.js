// Vẽ nhân vật SVG nhiều lớp (phong cách hoạt hình phẳng, viền đậm) và đọc mô tả ngoại hình
export function av(o,mood){
 const bw=[24,32,46][o.body],sc=[.88,1,1.1][o.h],sk=o.skin||'#f6c9a0',sd='#dba27c',L='#1b2a41';
 const S=(w=2.4,c=L)=>`stroke="${c}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`,sw=S();
 const X=60-bw,lw=bw*.45;
 const front=`<path d="M38 44Q36 20 60 20Q84 20 82 44Q76 32 66 33Q58 28 50 34Q42 32 38 44Z" fill="${o.hair}" ${sw}/>`;
 let back='',hair=front;
 if(o.hs==1)hair=`<path d="M39 43Q34 52 40 59Q42 50 41 44Z" fill="${o.hair}" ${sw}/><path d="M81 43Q86 52 80 59Q78 50 79 44Z" fill="${o.hair}" ${sw}/><path d="M50 29Q58 25 66 29" stroke="#fff" stroke-opacity=".6" stroke-width="3" fill="none" stroke-linecap="round"/>`;
 if(o.hs==2)back=`<path d="M36 44Q36 16 60 16Q84 16 84 44L87 88Q60 96 33 88Z" fill="${o.hair}" ${sw}/>`;
 const ry=mood=='tired'?2.2:5;
 const eyes=[52,68].map(x=>`<ellipse cx="${x}" cy="47" rx="4.2" ry="${ry}" fill="#fff" ${S(1.6)}/><circle cx="${x+.6}" cy="47.5" r="${ry>3?2.4:1.6}" fill="${L}"/>${ry>3?`<circle cx="${x+1.4}" cy="46" r=".9" fill="#fff"/>`:''}`).join('');
 const brows={ok:'M46 39Q51 36 57 39M63 39Q69 36 74 39',angry:'M45 37L57 42M75 37L63 42',tired:'M46 40L57 38M74 40L63 38',cry:'M46 41L57 37M74 41L63 37'}[mood];
 const mouth={ok:'M52 59Q60 66 68 59',tired:'M53 62Q57 60 60 62Q63 64 67 62',angry:'M52 65Q60 57 68 65'}[mood];
 const mouthEl=mood=='cry'?`<path d="M53 67Q60 57 67 67Q60 64 53 67Z" fill="#7a2e2e" ${S(1.8)}/>`:`<path d="${mouth}" ${S(2.4,"#7a2e2e")} fill="none"/>`;
 const extra=(mood=='cry'?'<path d="M46 52q-3 6 0 9q3-3 0-9zM74 52q3 6 0 9q-3-3 0-9z" fill="#4aa3ff"/>':'')+(mood=='tired'?'<path d="M86 30q5 8 0 12q-5-4 0-12z" fill="#4aa3ff" stroke="#1b2a41" stroke-width="1.5"/>':'');
 return `<svg viewBox="0 0 120 200" role="img" aria-label="Nhân vật ${o.name||''}"><g transform="translate(60 196) scale(${sc}) translate(-60 -196)">
 <ellipse cx="60" cy="194" rx="${bw+16}" ry="5" fill="#000" opacity=".2"/>${back}
 <rect x="${60-bw*.5}" y="136" width="${lw}" height="54" rx="3" fill="#2b3350" ${sw}/><rect x="${60+bw*.05}" y="136" width="${lw}" height="54" rx="3" fill="#2b3350" ${sw}/>
 <ellipse cx="${60-bw*.5+lw/2-1}" cy="191" rx="${lw/2+5}" ry="5" fill="#15151c" ${sw}/><ellipse cx="${60+bw*.05+lw/2+1}" cy="191" rx="${lw/2+5}" ry="5" fill="#15151c" ${sw}/>
 <rect x="54" y="60" width="12" height="16" fill="${sd}" ${sw}/>
 <rect x="${X-10}" y="74" width="12" height="50" rx="6" fill="${o.shirt}" ${sw}/><circle cx="${X-4}" cy="128" r="6" fill="${sk}" ${sw}/>
 <rect x="${60+bw-2}" y="74" width="12" height="50" rx="6" fill="${o.shirt}" ${sw}/><circle cx="${60+bw+4}" cy="128" r="6" fill="${sk}" ${sw}/>
 <rect x="${X}" y="70" width="${bw*2}" height="74" rx="20" fill="${o.shirt}" ${sw}/>
 <path d="M${60+bw*.45} 74Q${60+bw-1} 80 ${60+bw-3} 138Q${60+bw*.6} 141 ${60+bw*.45} 139Z" fill="#000" opacity=".08"/>
 <rect x="${X+1}" y="128" width="${bw*2-2}" height="7" fill="#3a2a1d" ${S(1.8)}/><rect x="56" y="127" width="8" height="9" rx="1.5" fill="#e8b93a" ${S(1.6)}/>
 <path d="M51 70L60 83L69 70Z" fill="#fff" ${sw}/>${o.tie?`<path d="M56 79h8l-2 6h-4zM58 85h4l3 36-5 5-5-5z" fill="#d6322f" ${S(1.8)}/>`:''}
 <circle cx="39" cy="49" r="5" fill="${sk}" ${sw}/><circle cx="81" cy="49" r="5" fill="${sk}" ${sw}/>
 <ellipse cx="60" cy="46" rx="21" ry="22" fill="${sk}" ${sw}/>
 <ellipse cx="46" cy="57" rx="4.5" ry="3" fill="#f2828a" opacity=".4"/><ellipse cx="74" cy="57" rx="4.5" ry="3" fill="#f2828a" opacity=".4"/>
 ${eyes}<path d="${brows}" ${S(2.6)} fill="none"/><path d="M59 50Q63 54 59 56" stroke="${sd}" stroke-width="2" fill="none" stroke-linecap="round"/>${mouthEl}${extra}
 ${hair}
 ${o.gl?`<g fill="#fff" fill-opacity=".3" stroke="${L}" stroke-width="2.2"><circle cx="52" cy="47" r="8"/><circle cx="68" cy="47" r="8"/><path d="M60 47h0M44 46L39 45M76 46L81 45" fill="none" stroke-linecap="round"/></g>`:''}</g></svg>`;
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
}

