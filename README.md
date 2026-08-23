# WebDev P4 - REST API Mahasiswa

REST API dengan Node.js, Express, PostgreSQL, Drizzle ORM, JWT, dan Docker.

## Cara Menjalankan

### Prasyarat
- Docker Desktop sudah terinstall dan berjalan

### Langkah
1. Clone repositori ini
2. Salin `.env.example` menjadi `.env` dan sesuaikan isinya
3. Jalankan aplikasi:
```bash
   docker compose up --build
```
4. Jalankan migrasi database:
```bash
   npx drizzle-kit push
```

## Endpoint API

| Method | Endpoint | Auth | Keterangan |
|--------|----------|------|------------|
| POST | /api/auth/register | ❌ | Register user baru |
| POST | /api/auth/login | ❌ | Login dan dapatkan token |
| GET | /api/mahasiswa | ❌ | Ambil semua mahasiswa |
| GET | /api/mahasiswa/:nim | ❌ | Ambil mahasiswa by NIM |
| POST | /api/mahasiswa | ✅ | Tambah mahasiswa baru |
| PUT | /api/mahasiswa/:nim | ✅ | Update data mahasiswa |
| DELETE | /api/mahasiswa/:nim | ✅ | Hapus mahasiswa |

## Pengujian API

Import file `postman/collection.json` ke Postman, lalu ikuti urutan:
1. Register
2. Login -> copy token
3. Set Bearer Token di header
4. Test endpoint lainnya