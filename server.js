const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const moment = require('moment-timezone'); // Importar moment-timezone

const app = express();
const PORT = 4000;

// Conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: 'calendario.cvhpxwifv1ft.us-east-1.rds.amazonaws.com',
    user: 'admin', // Reemplaza con tu usuario de MySQL
    password: 'jhonbrayansilva', // Reemplaza con tu contraseña de MySQL
    database: 'CelebracionesPeru'
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos.');
});

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para obtener celebraciones según la fecha actual
app.get('/celebraciones', (req, res) => {
    // Obtener la fecha actual en el horario peruano
    const today = moment().tz('America/Lima').format('YYYY-MM-DD'); // Fecha en formato YYYY-MM-DD
    const query = `SELECT * FROM celebraciones WHERE fecha = ?`;
    db.query(query, [today], (err, results) => {
        if (err) {
            console.error('Error al obtener celebraciones:', err);
            res.status(500).json({ error: 'Error al obtener celebraciones' });
            return;
        }
        res.json(results);
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});