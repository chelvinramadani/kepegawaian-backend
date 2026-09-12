# SIMPEG — Backend

Backend aplikasi **Sistem Informasi Kepegawaian (SIMPEG)** merupakan REST API yang digunakan untuk menyediakan layanan pengelolaan data dan autentikasi aplikasi.

Backend dikembangkan menggunakan Node.js dan Express.js serta menggunakan Prisma sebagai ORM untuk berkomunikasi dengan database MySQL.

## Teknologi

| Teknologi  | Keterangan                    |
| ---------- | ----------------------------- |
| Node.js    | Runtime JavaScript            |
| Express.js | Framework REST API            |
| Prisma 7   | ORM untuk database            |
| MySQL      | Database relasional           |
| JWT        | Autentikasi berbasis token    |
| bcryptjs   | Hashing password              |
| dotenv     | Environment variable          |
| CORS       | Cross-Origin Resource Sharing |
| Nodemon    | Development server            |

## Spesifikasi

Sebelum menjalankan backend, pastikan perangkat telah memiliki:

- Node.js
- npm
- MySQL
- Database `db_kepegawaian`

Disarankan menggunakan versi **Node.js LTS**.

## Instalasi

Masuk ke folder backend:

```bash
cd backend
```

Install seluruh dependency:

```bash
npm install
```

## Konfigurasi Database

Pastikan MySQL telah berjalan.

Jika menggunakan XAMPP, aktifkan service **MySQL**.

Buat database:

```sql
CREATE DATABASE db_kepegawaian;
```

## Environment Variable

Buat file `.env` pada folder backend:

```env
DATABASE_URL="mysql://root:@localhost:3306/db_kepegawaian"

PORT=5000

JWT_SECRET="simpeg_secret_key_2026"

JWT_EXPIRES_IN="1d"
```

Jika MySQL menggunakan password, sesuaikan `DATABASE_URL`:

```env
DATABASE_URL="mysql://root:PASSWORD@localhost:3306/db_kepegawaian"
```

## Prisma

Setelah database tersedia, jalankan migration:

```bash
npx prisma migrate dev
```

Generate Prisma Client:

```bash
npx prisma generate
```

Untuk memeriksa status migration:

```bash
npx prisma migrate status
```

## Menjalankan Development Server

Jalankan:

```bash
npm run dev
```

Backend akan berjalan pada:

```text
http://localhost:5000
```

Base URL REST API:

```text
http://localhost:5000/api
```

## Autentikasi

Backend menggunakan **JSON Web Token (JWT)** untuk autentikasi pengguna.

Password pengguna diproses menggunakan **bcryptjs** sebelum disimpan ke database.

Request yang membutuhkan autentikasi harus menyertakan token pada header:

```http
Authorization: Bearer <JWT_TOKEN>
```

Backend juga menggunakan middleware untuk melakukan verifikasi token dan pembatasan akses berdasarkan role pengguna.

Role yang digunakan:

```text
admin
staff
```

## REST API

### Authentication

```http
POST /api/auth/login
```

Contoh request:

```json
{
  "username": "admin",
  "password": "admin123"
}
```

### Pegawai

```http
GET    /api/pegawai
GET    /api/pegawai/:id
POST   /api/pegawai
PUT    /api/pegawai/:id
DELETE /api/pegawai/:id
```

### Jabatan

```http
GET    /api/jabatan
GET    /api/jabatan/:id
POST   /api/jabatan
PUT    /api/jabatan/:id
DELETE /api/jabatan/:id
```

### Unit Kerja

```http
GET    /api/unit-kerja
GET    /api/unit-kerja/:id
POST   /api/unit-kerja
PUT    /api/unit-kerja/:id
DELETE /api/unit-kerja/:id
```

### Pendidikan

```http
GET    /api/pendidikan
GET    /api/pendidikan/:id
POST   /api/pendidikan
PUT    /api/pendidikan/:id
DELETE /api/pendidikan/:id
```

### Dashboard

```http
GET /api/dashboard
```

Endpoint dashboard digunakan untuk menyediakan data statistik kepegawaian dan membutuhkan autentikasi.

## Menjalankan Backend

Pastikan MySQL telah aktif dan database `db_kepegawaian` tersedia.

Kemudian jalankan:

```bash
npm run dev
```

Backend dapat diakses melalui:

```text
http://localhost:5000
```

Frontend dapat menggunakan API melalui:

```text
http://localhost:5000/api
```

## Catatan Keamanan

File `.env` berisi konfigurasi database dan secret JWT sehingga tidak boleh diunggah ke repository.

Tambahkan `.env` ke `.gitignore`:

```gitignore
.env
node_modules/
```
