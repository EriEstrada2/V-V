const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Configuración de la conexión a la base de datos
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'db_dosificacion',
  password: 'dash',
  port: 5432,
});

// Middleware para parsear el cuerpo de las solicitudes POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Ruta para manejar la solicitud POST desde el formulario HTML
app.post('/guardarDatos', (req, res) => {
  // Obtener los datos del cuerpo de la solicitud
  const { asignatura, codigo, periodo, modalidad, fecha_elab, horas_docencia_sincrona, horas_docencia_asincrona, metodologia, correo_institucional, horas_practico_experimental, horas_autonomo, duracion_asignatura, profesores_autores } = req.body;

  // Realizar la inserción en la base de datos
  const query = `
    INSERT INTO ASIGNATURA (NOMBRE_ASIGNATURA, CODIGO, ID_PERIODO, MODALIDAD, FECHA_ELABORACION, HORAS_DOCENCIA_SINCRONA, HORAS_DOCENCIA_ASINCRONA, METODOLOGIA, CORREO_INSTITUCIONAL, HORAS_PRACTICO_EXPERIMENTAL, HORAS_AUTONOMO, DURACION_ASIGNATURA, PROFESORES_AUTORES)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    RETURNING ID_ASIGNATURA;
  `;

  pool.query(query, [asignatura, codigo, periodo, modalidad, fecha_elab, horas_docencia_sincrona, horas_docencia_asincrona, metodologia, correo_institucional, horas_practico_experimental, horas_autonomo, duracion_asignatura, profesores_autores])
    .then(result => {
      const asignaturaId = result.rows[0].ID_ASIGNATURA;

      // Continuar con la inserción en otras tablas según sea necesario
      // ...

      // Enviar una respuesta al cliente
      res.json({ success: true, message: `Datos insertados correctamente. ID de la asignatura: ${asignaturaId}` });
    })
    .catch(error => {
      console.error('Error al insertar datos:', error);

      // Modificación: Responder con el mensaje de error específico
      res.status(500).json({ success: false, message: error.message });
    });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
