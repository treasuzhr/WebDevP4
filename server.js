require('dotenv').config();
const express = require('express');
const { db } = require('./db');
const { mahasiswaTable } = require('./schema');
const { eq } = require('drizzle-orm');

const app = express();
const PORT = 8080;

app.use(express.json());

// GET /mahasiswa — ambil semua data dari database
app.get('/mahasiswa', async (req, res) => {
  try {
    const data = await db.select().from(mahasiswaTable);
    res.json(data);
  } catch (err) {
    res.status(500).json({ pesan: 'Gagal mengambil data', error: err.message });
  }
});

// GET /mahasiswa/:nim — cari berdasarkan NIM
app.get('/mahasiswa/:nim', async (req, res) => {
  try {
    const { nim } = req.params;
    const data = await db.select().from(mahasiswaTable).where(eq(mahasiswaTable.nim, nim));

    if (data.length === 0) {
      return res.status(404).json({ pesan: 'Mahasiswa tidak ditemukan' });
    }

    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ pesan: 'Terjadi error', error: err.message });
  }
});

// POST /mahasiswa — tambah mahasiswa baru + validasi
app.post('/mahasiswa', async (req, res) => {
  try {
    const { nama, nim, umur, jurusan } = req.body;

    // Validasi nama
    if (!nama || nama.length < 3) {
      return res.status(400).json({ pesan: 'Nama tidak boleh kosong dan minimal 3 karakter' });
    }

    // Validasi NIM (harus string angka)
    if (!nim || !/^\d+$/.test(nim)) {
      return res.status(400).json({ pesan: 'NIM harus diisi dan wajib berupa angka' });
    }

    // Validasi umur
    if (!umur || typeof umur !== 'number' || umur < 15) {
      return res.status(400).json({ pesan: 'Umur harus diisi, berupa angka, dan minimal 15 tahun' });
    }

    if (!jurusan) {
      return res.status(400).json({ pesan: 'Jurusan tidak boleh kosong' });
    }

    // Simpan ke database
    await db.insert(mahasiswaTable).values({ nama, nim, umur, jurusan });

    res.status(201).json({ pesan: `Berhasil menambahkan mahasiswa baru bernama ${nama}` });
  } catch (err) {
    res.status(500).json({ pesan: 'Gagal menambahkan data', error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});