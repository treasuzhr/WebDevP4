const { db } = require('../config/db');
const { mahasiswaTable } = require('../models/schema');
const { eq } = require('drizzle-orm');

const getAllMahasiswa = async (req, res) => {
  try {
    const data = await db.select().from(mahasiswaTable);
    res.json(data);
  } catch (err) {
    res.status(500).json({ pesan: 'Gagal mengambil data', error: err.message });
  }
};

const getMahasiswaByNim = async (req, res) => {
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
};

const addMahasiswa = async (req, res) => {
  try {
    const { nama, nim, umur, jurusan } = req.body;

    if (!nama || nama.length < 3) {
      return res.status(400).json({ pesan: 'Nama minimal 3 karakter' });
    }
    if (!nim || !/^\d+$/.test(nim)) {
      return res.status(400).json({ pesan: 'NIM harus berupa angka' });
    }
    if (!umur || typeof umur !== 'number' || umur < 15) {
      return res.status(400).json({ pesan: 'Umur minimal 15 tahun' });
    }
    if (!jurusan) {
      return res.status(400).json({ pesan: 'Jurusan tidak boleh kosong' });
    }

    await db.insert(mahasiswaTable).values({ nama, nim, umur, jurusan });

    res.status(201).json({ pesan: `Berhasil menambahkan mahasiswa baru bernama ${nama}` });
  } catch (err) {
    res.status(500).json({ pesan: 'Gagal menambahkan data', error: err.message });
  }
};

module.exports = { getAllMahasiswa, getMahasiswaByNim, addMahasiswa };