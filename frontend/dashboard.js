// Verificar que el usuario está logueado
window.addEventListener('load', () => {
    const usuario = localStorage.getItem('usuario');
    
    if (!usuario) {
        // Si no hay usuario, redirige al login
        window.location.href = 'index.html';
    } else {
        // Muestra el nombre del usuario
        document.getElementById('usuarioNombre').textContent = usuario;
    }
});

// Botón de logout
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('usuario');
    alert('Sesión cerrada');
    window.location.href = 'index.html';
});

// Aquí irán las funciones para cargar datos desde Google Sheets
// Por ahora son placeholders

async function cargarClientes() {
    // TODO: Llamar a Cloud Function
    console.log('Cargando clientes...');
}

async function cargarPagos() {
    // TODO: Llamar a Cloud Function
    console.log('Cargando pagos...');
}

// Cargar datos al iniciar
cargarClientes();
cargarPagos();