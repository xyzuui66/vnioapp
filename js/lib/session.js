import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

export function checkSession() {
    const auth = getAuth();
    
    // Sistem ini menjaga akun agar TIDAK hilang saat web direfresh [cite: 2025-12-30]
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User sudah login, ambil datanya
            console.log("User aktif:", user.displayName);
            document.getElementById('user-avatar').src = user.photoURL || 'default-avatar.png';
        } else {
            // Jika tidak ada user, arahkan ke login.html
            window.location.href = 'login.html';
        }
    });
}

