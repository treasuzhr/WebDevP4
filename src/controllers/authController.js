const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { db } = require('../config/db');
const { usersTable } = require('../models/schema');
const { eq } = require('drizzle-orm');

const register = async (req, res) => {
  try {
    const { nama, email, password } = req.body;

    if (!nama || !email || !password) {
      return res.status(400).json({ success: false, message: 'Semua field wajib diisi!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(usersTable).values({ nama, email, password: hashedPassword });

    res.status(201).json({ success: true, message: 'Registrasi berhasil!' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal register', error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email dan password wajib diisi!' });
    }

    const users = await db.select().from(usersTable).where(eq(usersTable.email, email));

    if (users.length === 0) {
      return res.status(401).json({ success: false, message: 'Email atau password salah!' });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Email atau password salah!' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, nama: user.nama },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ success: true, message: 'Login berhasil!', token });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal login', error: err.message });
  }
};

module.exports = { register, login };