const DB = "https://ceziroom-default-rtdb.asia-southeast1.firebasedatabase.app/";
let me = JSON.parse(localStorage.getItem('cezi_v12_user')) || { name: "Guest", phone: "000", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=guest" };

// --- FUNGSI NAVIGASI ---
function tab(t) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(`p-${t}`).classList.add('active');
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.replace('text-blue-500', 'text-zinc-500'));
    document.querySelector(`[data-tab="${t}"]`).classList.replace('text-zinc-500', 'text-blue-500');
    document.getElementById('input-area').style.display = t === 'chat' ? 'flex' : 'none';
    if(t === 'music' && document.getElementById('res-music').innerHTML === "") fetchSpotifyClone();
}

// --- FUNGSI CHAT GLOBAL (REAL-TIME ANTI HILANG) ---
async function sendMsg() {
    const input = document.getElementById('m-input');
    const m = input.value.trim();
    if(!m) return;
    await fetch(`${DB}global_chat.json`, {
        method: 'POST',
        body: JSON.stringify({ n: me.name, p: me.phone, m, t: Date.now(), type: 'text' })
    });
    input.value = "";
}

const syncChat = async () => {
    try {
        const r = await fetch(`${DB}global_chat.json?orderBy="t"&limitToLast=50`);
        const data = await r.json();
        if (!data) return;
        const sorted = Object.values(data).sort((a,b) => a.t - b.t);
        document.getElementById('chat-box').innerHTML = sorted.map(c => `
            <div class="flex flex-col ${c.p === me.phone ? 'items-end' : 'items-start'}">
                <span class="text-[7px] text-zinc-600 mb-1 uppercase font-black">${c.n}</span>
                <div class="${c.type === 'sticker' ? '' : 'p-4 rounded-2xl ' + (c.p === me.phone ? 'bg-blue-600' : 'bg-zinc-900 border border-white/5')} text-xs font-bold max-w-[85%]">
                    ${c.type === 'sticker' ? `<img src="${c.m}" class="w-24 h-24">` : c.m}
                </div>
            </div>
        `).join('');
    } catch(e) {}
};

// --- FUNGSI STIKER ---
const stickers = ["https://cdn-icons-png.flaticon.com/512/4730/4730417.png", "https://cdn-icons-png.flaticon.com/512/4730/4730453.png", "https://cdn-icons-png.flaticon.com/512/4730/4730457.png", "https://cdn-icons-png.flaticon.com/512/4730/4730461.png"];
function toggleStickers() {
    const p = document.getElementById('sticker-panel');
    p.classList.toggle('hidden');
    p.innerHTML = stickers.map(s => `<img src="${s}" onclick="sendSticker('${s}')" class="w-full p-2 hover:bg-white/5 rounded-xl cursor-pointer">`).join('');
}
async function sendSticker(url) {
    await fetch(`${DB}global_chat.json`, { method: 'POST', body: JSON.stringify({ n: me.name, p: me.phone, m: url, t: Date.now(), type: 'sticker' }) });
    toggleStickers();
}

// --- FUNGSI MUSIK (SPOTIFY CLONE) ---
async function fetchSpotifyClone() {
    const res = await fetch(`https://itunes.apple.com/search?term=indonesia&entity=song&limit=10`);
    const d = await res.json();
    renderMusic(d.results);
}
async function searchMusic() {
    const q = document.getElementById('music-search-input').value;
    const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(q)}&entity=song&limit=20`);
    const d = await res.json();
    renderMusic(d.results);
}
function renderMusic(songs) {
    document.getElementById('res-music').innerHTML = songs.map(s => `
        <div onclick="playMusic('${s.previewUrl}', '${s.trackName}', '${s.artistName}')" class="bg-zinc-900 p-3 rounded-3xl border border-white/5">
            <img src="${s.artworkUrl100.replace('100x100','400x400')}" class="w-full aspect-square rounded-2xl mb-2 object-cover">
            <p class="text-[10px] font-black truncate">${s.trackName}</p>
            <p class="text-[7px] text-zinc-500 font-bold uppercase">${s.artistName}</p>
        </div>`).join('');
}
function playMusic(u, j, a) {
    const p = document.getElementById('player'); p.src = u; p.play();
    fetch(`${DB}status_musik/${me.phone}.json`, { method: 'PUT', body: JSON.stringify({ user: me.name, judul: j, artis: a, t: Date.now() }) });
}

// --- FUNGSI GRUP & CARI TEMAN ---
async function createGroupPrompt() {
    const n = prompt("Nama Grup:"); if(!n) return;
    const id = "GRP"+Date.now();
    await fetch(`${DB}groups/${id}.json`, { method: 'PUT', body: JSON.stringify({ name: n, creator: me.name, t: Date.now() }) });
}
async function searchUser() {
    const q = document.getElementById('f-search').value;
    const r = await fetch(`${DB}users.json`); const u = await r.json();
    document.getElementById('res-friends').innerHTML = Object.values(u).filter(x => x.phone === q || x.name.includes(q)).map(x => `
        <div class="p-4 bg-zinc-900 rounded-3xl flex justify-between items-center border border-white/5">
            <div class="flex items-center gap-3"><img src="${x.avatar}" class="w-10 h-10 rounded-full"><p class="font-bold text-sm">${x.name}</p></div>
            <button class="bg-blue-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase">Add</button>
        </div>`).join('');
}

// --- RUNNER ---
setInterval(() => { syncChat(); }, 3000);
window.onload = () => { document.getElementById('user-avatar').src = me.avatar; tab('chat'); };
                                                      
