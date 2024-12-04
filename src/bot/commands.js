import { handleFileUpload } from './fileHandler.js';
import { mainMenuKeyboard, uploadMenuKeyboard, backToMainKeyboard } from './keyboard.js';
import logger from '../utils/logger.js';

export const setupCommands = (bot) => {
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const username = msg.from.first_name;
    
    bot.sendMessage(
      chatId,
      `Halo ${username}! 👋\n\n` +
      'Selamat datang di File Upload Bot.\n' +
      'Saya akan membantu Anda mengupload file ke Google Drive dan Mediafire.\n\n' +
      'Silakan pilih menu di bawah ini:',
      mainMenuKeyboard
    );
  });

  bot.on('callback_query', async (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;
    const messageId = callbackQuery.message.message_id;

    switch (callbackQuery.data) {
      case 'main_menu':
        await bot.editMessageText(
          'Menu Utama:\nSilakan pilih opsi di bawah ini:',
          {
            chat_id: chatId,
            message_id: messageId,
            ...mainMenuKeyboard
          }
        );
        break;

      case 'upload_info':
        await bot.editMessageText(
          '📤 *Upload File*\n\n' +
          'Pilih platform tujuan upload:\n\n' +
          '• *Google Drive* - Penyimpanan cloud dari Google\n' +
          '• *Mediafire* - Platform berbagi file populer\n' +
          '• *Upload Keduanya* - Upload ke kedua platform sekaligus',
          {
            chat_id: chatId,
            message_id: messageId,
            parse_mode: 'Markdown',
            ...uploadMenuKeyboard
          }
        );
        break;

      case 'help':
        await bot.editMessageText(
          '❓ *Bantuan*\n\n' +
          '*Cara Menggunakan Bot:*\n\n' +
          '1. Kirim file yang ingin diupload\n' +
          '2. Pilih platform tujuan upload\n' +
          '3. Tunggu proses upload selesai\n' +
          '4. Dapatkan link hasil upload\n\n' +
          '*Perintah Tersedia:*\n' +
          '/start - Memulai bot\n' +
          '/help - Menampilkan bantuan\n\n' +
          '*Catatan:*\n' +
          '• Maksimal ukuran file: 50MB\n' +
          '• Format file: Semua format didukung',
          {
            chat_id: chatId,
            message_id: messageId,
            parse_mode: 'Markdown',
            ...backToMainKeyboard
          }
        );
        break;

      case 'status':
        await bot.editMessageText(
          '📊 *Status Layanan*\n\n' +
          '• Google Drive: ✅ Aktif\n' +
          '• Mediafire: ✅ Aktif\n\n' +
          'Semua layanan berjalan normal.',
          {
            chat_id: chatId,
            message_id: messageId,
            parse_mode: 'Markdown',
            ...backToMainKeyboard
          }
        );
        break;
    }

    await bot.answerCallbackQuery(callbackQuery.id);
  });

  bot.on('document', handleFileUpload);

  bot.on('polling_error', (error) => {
    logger.error('Polling error:', error);
  });
};

export default setupCommands;