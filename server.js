const express = require('express');
const app = express();
const PORT = 8080;

// Middleware biar bisa baca JSON dari body request
app.use(express.json());

// Data dummy mahasiswa
const mahasiswa = [
  { nim: '2410501130', nama: 'Ukhti Zahra Isyana', jurusan: 'Sistem Informasi' },
  { nim: '2410501127', nama: 'Gizza Anandita Fallah', jurusan: 'Sistem Informasi' },
  { nim: '2410501137', nama: 'Nasyia Wulandari', jurusan: 'Sistem Informasi' },
];

// GET /mahasiswa
app.get('/mahasiswa', (req, res) => {
  res.json(mahasiswa);
});

// GET /mahasiswa/:nim
app.get('/mahasiswa/:nim', (req, res) => {
  const { nim } = req.params;
  const found = mahasiswa.find((m) => m.nim === nim);

  if (!found) {
    return res.status(404).json({ pesan: 'Mahasiswa tidak ditemukan' });
  }

  res.json(found);
});

// POST /mahasiswa
app.post('/mahasiswa', (req, res) => {
  const { nama, nim } = req.body;

  if (!nama || !nim) {
    return res.status(400).json({ pesan: 'Field nama dan nim wajib diisi' });
  }

  res.status(201).json({
    pesan: `Berhasil menambahkan mahasiswa baru bernama ${nama}`,
  });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});