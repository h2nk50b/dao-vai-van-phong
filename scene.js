// Cảnh văn phòng nhiều lớp. h = giờ trong game (8–17), t = số việc đã giao (chồng giấy cao dần)
export function scene(h,t){
 const sky=h<10?'#bfe3f2':h<15?'#8fd0ee':h<17?'#f6c58a':'#26335f',night=h>=17,L='#1b2a41';
 const p=Math.min(1,Math.max(0,(h-8)/9)),sx=36+p*96,sy=122-Math.sin(p*Math.PI)*64;
 const ang=(h%12)*30,hx=270+Math.sin(ang*Math.PI/180)*14,hy=62-Math.cos(ang*Math.PI/180)*14;
 const bld=[[26,100,20,58],[50,84,26,74],[80,96,18,62],[102,78,24,80],[130,104,16,54]].map(([x,y,w,hh])=>`<rect x="${x}" y="${y+10}" width="${w}" height="${hh}" fill="${night?'#161f40':'#5f8a93'}" opacity=".85"/>`).join('');
 const lights=night?[[56,100],[60,112],[108,96],[112,110],[34,114]].map(([x,y])=>`<rect x="${x}" y="${y}" width="4" height="4" fill="#ffd34d"/>`).join(''):'';
 const stars=night?[[40,52],[80,60],[120,48],[100,72]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="1.3" fill="#fff"/>`).join(''):'';
 const papers=Array.from({length:Math.min(t,10)},(_,i)=>`<rect x="${296+(i%2?1.5:-1)}" y="${243-i*3.2}" width="30" height="3.2" fill="#fff" stroke="${L}" stroke-width="1"/>`).join('');
 return `<svg viewBox="0 0 340 400" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
 <defs><clipPath id="wc"><rect x="24" y="38" width="120" height="120"/></clipPath></defs>
 <rect width="340" height="300" fill="#cfe0e3"/><rect y="190" width="340" height="110" fill="#b9cfd3"/><rect y="188" width="340" height="4" fill="#fff" opacity=".7"/>
 <rect y="300" width="340" height="100" fill="#4d787c"/><path d="M0 330H340M0 365H340M110 300L60 400M230 300L280 400" stroke="#000" stroke-opacity=".12" stroke-width="2"/>
 <rect y="294" width="340" height="8" fill="#fff" stroke="${L}" stroke-width="2"/>
 <rect x="196" y="100" width="104" height="68" fill="#ffe45e" stroke="${L}" stroke-width="2.5" transform="rotate(-2 248 134)"/>
 <text x="248" y="124" text-anchor="middle" font-size="11" font-weight="800" fill="${L}" transform="rotate(-2 248 134)">KPI THÁNG NÀY</text><text x="248" y="146" text-anchor="middle" font-size="18" font-weight="800" fill="#d6322f" transform="rotate(-2 248 134)">+300%</text><text x="248" y="160" text-anchor="middle" font-size="8" fill="${L}" transform="rotate(-2 248 134)">(không có thưởng)</text>
 <circle cx="270" cy="62" r="26" fill="#fff" stroke="${L}" stroke-width="3"/><path d="M270 40v5M270 79v5M248 62h5M287 62h5" stroke="${L}" stroke-width="2"/><path d="M270 62L${hx} ${hy}" stroke="${L}" stroke-width="3.5" stroke-linecap="round"/><path d="M270 62V42" stroke="#d6322f" stroke-width="2.5" stroke-linecap="round"/><circle cx="270" cy="62" r="3" fill="${L}"/>
 <path d="M14 296h30l-3 -34h-24z" fill="#c9764a" stroke="${L}" stroke-width="2.5" stroke-linejoin="round"/>
 <g fill="#4b9a5a" stroke="${L}" stroke-width="2"><ellipse cx="29" cy="238" rx="7" ry="22"/><ellipse cx="16" cy="248" rx="6" ry="18" transform="rotate(-35 16 262)"/><ellipse cx="42" cy="248" rx="6" ry="18" transform="rotate(35 42 262)"/></g>
 <rect x="250" y="246" width="90" height="9" fill="#8a6a4a" stroke="${L}" stroke-width="2.5"/><rect x="258" y="255" width="7" height="44" fill="#6e5238" stroke="${L}" stroke-width="2"/><rect x="326" y="255" width="7" height="44" fill="#6e5238" stroke="${L}" stroke-width="2"/>
 <rect x="258" y="220" width="32" height="24" rx="2" fill="#2b3350" stroke="${L}" stroke-width="2"/><rect x="262" y="224" width="24" height="16" fill="${night?'#ffd34d':'#7fc8d8'}"/>
 <rect x="298" y="234" width="12" height="11" rx="2" fill="#fff" stroke="${L}" stroke-width="2" ${t>=10?'':'display="none"'}/>${papers}
 <path d="M170 0v26" stroke="${L}" stroke-width="2.5"/><path d="M150 40Q170 16 190 40Z" fill="#e8b93a" stroke="${L}" stroke-width="2.5"/>
 ${night?'<rect width="340" height="300" fill="#0b1630" opacity=".32"/><ellipse cx="170" cy="150" rx="80" ry="120" fill="#ffd34d" opacity=".08"/>':''}
 <g clip-path="url(#wc)"><rect x="24" y="38" width="120" height="120" fill="${sky}"/>${stars}<circle cx="${sx}" cy="${sy}" r="11" fill="${night?'#f4f1d0':'#ffd34d'}"/>${bld}${lights}</g>
 <rect x="24" y="38" width="120" height="120" fill="none" stroke="${L}" stroke-width="4"/><path d="M84 38V158M24 98H144" stroke="${L}" stroke-width="3"/>
 </svg>`;
}
