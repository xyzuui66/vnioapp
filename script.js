// js/script.js
import { checkSession } from './lib/session.js';
import { syncChat, sendMsg } from './lib/chat.js';
import { initMusic, searchMusic } from './lib/music.js';

// 1. Cek Sesi agar Akun Tidak Hilang
const me = checkSession(); 

if (me) {
    // 2. Aktifkan Fitur Real-time
    syncChat();
    initMusic();

    // 3. Hubungkan ke Tombol HTML agar bisa diklik
    window.handleSend = () => sendMsg('text');
    window.handleSearchMusic = () => searchMusic();
    window.tab = (t) => {
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById(`p-${t}`).classList.add('active');
    };
}
