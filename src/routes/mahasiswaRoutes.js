const express = require('express');
const router = express.Router();
const { getAllMahasiswa, getMahasiswaByNim, addMahasiswa, updateMahasiswa, deleteMahasiswa } = require('../controllers/mahasiswaController');
const verifyToken = require('../middlewares/authMiddleware');

router.get('/', getAllMahasiswa);
router.get('/:nim', getMahasiswaByNim);
router.post('/', verifyToken, addMahasiswa);
router.put('/:nim', verifyToken, updateMahasiswa);
router.delete('/:nim', verifyToken, deleteMahasiswa);

module.exports = router;