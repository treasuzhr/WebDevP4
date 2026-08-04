const express = require('express');
const router = express.Router();
const { getAllMahasiswa, getMahasiswaByNim, addMahasiswa } = require('../controllers/mahasiswaController');
const verifyToken = require('../middlewares/authMiddleware');

router.get('/', getAllMahasiswa);
router.get('/:nim', getMahasiswaByNim);
router.post('/', verifyToken, addMahasiswa); // proteksi JWT

module.exports = router;