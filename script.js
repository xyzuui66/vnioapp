import { syncChat, sendMsg } from './lib/chat.js';
import { initMusic } from './lib/music.js';
import { checkSession } from './lib/session.js';
import { loadStore } from './store.js';

window.tab = (t) => {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(`p-${t}`).classList.add('active');
};

document.getElementById('btn-send').onclick = sendMsg;

// Inisialisasi
checkSession();
syncChat();
initMusic();
loadStore();

