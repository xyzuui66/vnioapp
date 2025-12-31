// js/lib/session.js
export function checkSession() {
    // Mengambil data dari localStorage untuk akses cepat agar akun tidak hilang [cite: 2025-12-30]
    const savedUser = localStorage.getItem('cezi_v12_user');

    if (savedUser) {
        const user = JSON.parse(savedUser);
        console.log("Sesi aktif: " + user.name);
        
        // Update avatar di header secara otomatis
        const avatarImg = document.getElementById('user-avatar');
        if (avatarImg) avatarImg.src = user.avatar;
        
        return user;
    } else {
        // Jika tidak ada sesi, paksa login kembali
        window.location.href = 'login.html';
        return null;
    }
}

