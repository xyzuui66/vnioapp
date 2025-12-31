export function checkSession() {
    const savedUser = localStorage.getItem('cezi_v12_user');
    if (savedUser) {
        const user = JSON.parse(savedUser);
        const avatarImg = document.getElementById('user-avatar');
        if(avatarImg) avatarImg.src = user.avatar;
        return user;
    } else {
        window.location.href = 'login.html';
        return null;
    }
}
