// js/script.js

// Import tenaga dari laci 'lib'
import { checkSession } from './lib/session.js';
import { syncChat, sendMsg } from './lib/chat.js';
import { initMusic, searchMusic } from './lib/music.js';

// 1. Jalankan Penjaga Pintu (Agar akun tidak hilang saat refresh) [cite: 2025-12-30]
const user = checkSession();

if (user) {
    // 2. Jika user ada, nyalakan mesin Chat & Musik
    syncChat(); 
    initMusic();

    // 3. Hubungkan tombol di index.html ke fungsi di lib
    window.handleSend = () => sendMsg('text');
    window.handleSearchMusic = () => searchMusic();
}
