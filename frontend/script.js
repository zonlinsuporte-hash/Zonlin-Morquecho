document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const usuario = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('error');
    
    // Usuarios de prueba (después usaremos Google Sheets)
    const usuarios = {
        'admin': 'admin123',
        'user1': '@123456',
        'user2': '@123456'
    };
    
    if (usuarios[usuario] && usuarios[usuario] === password) {
        // Login exitoso
        localStorage.setItem('usuario', usuario);
        alert('¡Bienvenido ' + usuario + '!');
        // Aquí iremos al dashboard
        window.location.href = 'dashboard.html';
    } else {
        // Login fallido
        errorDiv.textContent = 'Usuario o contraseña incorrectos';
        errorDiv.classList.add('show');
    }
});