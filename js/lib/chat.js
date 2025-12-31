import { DB_URL } from './database.js';

export function syncChat() {
    const chatBox = document.getElementById('p-chat');
    
    // Gunakan EventSource (SSE) agar Firebase yang mengirim data, bukan HP yang minta
    const eventSource = new EventSource(`${DB_URL}global_chat.json?auth=YOUR_SECRET`);

    eventSource.addEventListener('put', async (e) => {
        const update = JSON.parse(e.data);
        if (update.data) {
            // Hanya render pesan baru, tidak perlu render ulang semua (Lebih Ringan!)
            renderNewMessage(update.data); 
        }
    });
}
