const express = require('express');
const app = express();

app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const mahasiswaRoutes = require('./routes/mahasiswaRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/mahasiswa', mahasiswaRoutes);

module.exports = app;