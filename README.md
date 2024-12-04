<div align="center">

# 🤖 Telegram File Upload Bot

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Telegram](https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/lazydeven)
[![Google Drive](https://img.shields.io/badge/Google%20Drive-4285F4?style=for-the-badge&logo=googledrive&logoColor=white)](https://developers.google.com/drive)
[![Mediafire](https://img.shields.io/badge/Mediafire-1299F3?style=for-the-badge&logo=mediafire&logoColor=white)](https://www.mediafire.com/)

Bot Telegram yang memudahkan Anda mengupload file ke Google Drive dan Mediafire secara otomatis. 
Dibuat dengan ❤️ oleh [Akira](https://t.me/lazydeven).

[🚀 Fitur](#-fitur-utama) •
[📥 Instalasi](#-instalasi) •
[⚙️ Konfigurasi](#️-konfigurasi) •
[📖 Penggunaan](#-cara-penggunaan) •
[🤝 Kontribusi](#-kontribusi)

</div>

## 🎯 Tentang Bot

Bot ini dibuat untuk mempermudah proses upload file ke berbagai platform penyimpanan cloud secara bersamaan. Cukup kirim file ke bot, dan bot akan mengirimkan link download dari Google Drive dan Mediafire secara otomatis.

### ✨ Coba Sekarang!
👉 [Mulai Gunakan Bot](https://t.me/lazydeven)

## 🚀 Fitur Utama

- 📤 **Multi-Platform Upload**
  - Upload ke Google Drive ☁️
  - Upload ke Mediafire 🔥
  - Upload ke kedua platform sekaligus 🚀
  
- 🎯 **UI/UX Ramah Pengguna**
  - Menu tombol yang intuitif
  - Navigasi yang mudah
  - Status upload real-time
  
- 🛡️ **Keamanan & Stabilitas**
  - Autentikasi yang aman
  - Monitoring dengan logging
  - Auto-restart dengan PM2
  
- 💪 **Dukungan File**
  - Semua format file
  - Ukuran hingga 50MB
  - Preview otomatis

## 📥 Instalasi

### Prasyarat
Pastikan sistem Anda memiliki:
- 📦 Node.js v14+
- 📦 NPM
- 📦 PM2 (untuk production)
- 📦 Akun Google Cloud
- 📦 Akun Mediafire Developer

### Langkah Instalasi

1. **Clone Repository**
   ```bash
   git clone https://github.com/username/telegram-upload-bot.git
   cd telegram-upload-bot
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Setup Environment**
   ```bash
   cp .env.example .env
   ```

## ⚙️ Konfigurasi

### 1️⃣ Bot Telegram
1. Chat [@BotFather](https://t.me/botfather)
2. Kirim `/newbot`
3. Ikuti instruksi
4. Salin token ke `.env`:
   ```env
   BOT_TOKEN=your_telegram_bot_token
   ```

### 2️⃣ Google Drive API
1. Buka [Google Cloud Console](https://console.cloud.google.com)
2. Buat/pilih project
3. Aktifkan Drive API:
   ```
   APIs & Services → Library → Google Drive API → Enable
   ```
4. Buat OAuth credentials:
   ```
   APIs & Services → Credentials → Create → OAuth 2.0
   ```
5. Download JSON ke `credentials.json`
6. Update `.env`:
   ```env
   GOOGLE_CLIENT_ID=your_client_id
   GOOGLE_CLIENT_SECRET=your_client_secret
   GOOGLE_REDIRECT_URI=your_redirect_uri
   ```

### 3️⃣ Mediafire API
1. Daftar di [Mediafire Developer](https://www.mediafire.com/developers/)
2. Buat aplikasi baru
3. Update `.env`:
   ```env
   MEDIAFIRE_EMAIL=your_email
   MEDIAFIRE_PASSWORD=your_password
   MEDIAFIRE_APP_ID=your_app_id
   MEDIAFIRE_SIGNATURE=your_signature
   ```

## 🚀 Deployment

### Setup PM2

1. **Install PM2 Global**
   ```bash
   npm install -g pm2
   ```

2. **Siapkan Folder Log**
   ```bash
   mkdir -p logs/pm2
   ```

### Perintah PM2

#### 🟢 Start Bot
```bash
npm run pm2:start
# atau
pm2 start ecosystem.config.js --env production
```

#### 📊 Monitor Status
```bash
npm run pm2:status
# atau
pm2 status telegram-upload-bot
```

#### 📋 Lihat Log
```bash
npm run pm2:logs
# atau
pm2 logs telegram-upload-bot
```

#### 🔄 Restart Bot
```bash
npm run pm2:restart
# atau
pm2 restart telegram-upload-bot
```

#### 🛑 Stop Bot
```bash
npm run pm2:stop
# atau
pm2 stop telegram-upload-bot
```

### 🔍 Monitoring

1. **Dashboard**
   ```bash
   pm2 monit
   ```

2. **Status Detail**
   ```bash
   pm2 show telegram-upload-bot
   ```

3. **Log Real-time**
   ```bash
   pm2 logs telegram-upload-bot --lines 100
   ```

## 📖 Cara Penggunaan

1. **Start Bot**
   - Buka [@LazyDeven](https://t.me/lazydeven)
   - Klik "Start" atau ketik `/start`

2. **Upload File**
   - Kirim file ke bot
   - Pilih platform tujuan
   - Tunggu proses selesai
   - Dapatkan link download

3. **Perintah Tersedia**
   - `/start` - Mulai bot
   - `/help` - Bantuan
   - `/status` - Cek status layanan

## 🤝 Kontribusi

Kontribusi selalu welcome! Berikut cara berkontribusi:

1. Fork repository
2. Buat branch baru
3. Commit perubahan
4. Push ke branch
5. Buat Pull Request

## 📝 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

## 👨‍💻 Developer

**Akira** - [@LazyDeven](https://t.me/lazydeven)

---

<div align="center">
Made with ❤️ by <a href="https://t.me/lazydeven">Akira</a>
</div>