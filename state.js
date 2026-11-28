// Trạng thái nhân vật và lưu tiến trình bằng localStorage
export const S={tab:'me',role:'Giám đốc',
 me:{name:'',body:1,h:1,hs:0,hair:'#222',gl:0,shirt:'#f4f4f0',tie:1,skin:'#f1c9a0',beard:0,acc:0,top:0,desc:''},
 boss:{name:'Hùng',body:2,h:0,hs:1,hair:'#cfd3d8',gl:1,shirt:'#f4f4f0',tie:1,skin:'#f1c9a0',beard:0,acc:0,top:0,desc:''}};

const K='dvvp_v1';
export function saveChar(){try{localStorage.setItem(K+'_char',JSON.stringify({role:S.role,me:S.me,boss:S.boss}))}catch(e){}}
export function loadChar(){try{const d=JSON.parse(localStorage.getItem(K+'_char'));if(d){S.role=d.role||S.role;Object.assign(S.me,d.me);Object.assign(S.boss,d.boss)}}catch(e){}}
export function saveGame(G){try{localStorage.setItem(K+'_game',JSON.stringify(G))}catch(e){}}
export function loadGame(){try{return JSON.parse(localStorage.getItem(K+'_game'))}catch(e){return null}}
export function hasGame(){return !!loadGame()}
export function clearAll(){try{localStorage.removeItem(K+'_char');localStorage.removeItem(K+'_game')}catch(e){}}
