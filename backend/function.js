const { google } = require('googleapis');
const { GoogleAuth } = require('google-auth-library');

// ID de tu Google Sheet (lo obtendremos después)
const SPREADSHEET_ID = '1WRUYKJpg66kyAMoDZ7I-l8U8TOYV7R-E2-opbcX8mNU';
// Credenciales (se configuran en Cloud Functions)
const auth = new GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

const sheets = google.sheets({ version: 'v4', auth });

// Función HTTP principal
exports.crm = async (req, res) => {
    // CORS headers
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        res.status(204).send('');
        return;
    }

    try {
        const { action, data } = req.body;

        if (action === 'login') {
            return loginUsuario(req, res, data);
        } else if (action === 'getClientes') {
            return obtenerClientes(req, res);
        } else if (action === 'addCliente') {
            return agregarCliente(req, res, data);
        } else {
            res.status(400).json({ error: 'Acción no reconocida' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
};

// Login simple (después conectaremos con Google Sheets)
async function loginUsuario(req, res, data) {
    const { usuario, password } = data;
    
    const usuarios = {
        'admin': 'admin123',
        'user1': '@123456',
        'user2': '@123456'
    };

    if (usuarios[usuario] && usuarios[usuario] === password) {
        res.json({ ok: true, message: 'Login exitoso', usuario });
    } else {
        res.status(401).json({ ok: false, error: 'Credenciales inválidas' });
    }
}

// Obtener clientes desde Google Sheets
async function obtenerClientes(req, res) {
    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: 'Clientes!A:F'
        });

        const rows = response.data.values || [];
        const headers = rows[0] || [];
        const clientes = rows.slice(1).map(row => ({
            id: row[0],
            nombre: row[1],
            email: row[2],
            telefono: row[3],
            estado: row[4],
            fecha: row[5]
        }));

        res.json({ ok: true, clientes });
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
}

// Agregar cliente a Google Sheets
async function agregarCliente(req, res, data) {
    try {
        const { nombre, email, telefono } = data;
        const fecha = new Date().toISOString().split('T')[0];
        
        await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: 'Clientes!A:F',
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: [[null, nombre, email, telefono, 'Activo', fecha]]
            }
        });

        res.json({ ok: true, message: 'Cliente agregado' });
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
}