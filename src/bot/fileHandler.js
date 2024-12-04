import { uploadToGoogleDrive } from '../services/googleDrive.js';
import { uploadToMediafire } from '../services/mediafire.js';
import { handleError } from '../utils/errorHandler.js';
import logger from '../utils/logger.js';

export const handleFileUpload = async (msg, bot) => {
  const chatId = msg.chat.id;
  const file = msg.document;

  try {
    const statusMessage = await bot.sendMessage(
      chatId,
      '🔄 Memproses file...',
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: '❌ Batalkan', callback_data: 'cancel_upload' }]
          ]
        }
      }
    );

    const fileInfo = await bot.getFile(file.file_id);
    const filePath = fileInfo.file_path;

    await bot.editMessageText(
      '📤 Mengupload file ke Google Drive dan Mediafire...\n\n' +
      '⏳ Progress:\n' +
      '▫️ Google Drive: Menunggu...\n' +
      '▫️ Mediafire: Menunggu...',
      {
        chat_id: chatId,
        message_id: statusMessage.message_id,
        parse_mode: 'Markdown'
      }
    );
    
    const [googleDriveLink, mediafireLink] = await Promise.all([
      uploadToGoogleDrive(filePath, file.file_name),
      uploadToMediafire(filePath, file.file_name)
    ]);

    const successMessage = '✅ *File berhasil diupload!*\n\n' +
      `📁 *Google Drive:*\n${googleDriveLink}\n\n` +
      `🔥 *Mediafire:*\n${mediafireLink}`;

    await bot.editMessageText(successMessage, {
      chat_id: chatId,
      message_id: statusMessage.message_id,
      parse_mode: 'Markdown',
      disable_web_page_preview: true,
      reply_markup: {
        inline_keyboard: [
          [
            { text: '📁 Google Drive', url: googleDriveLink },
            { text: '🔥 Mediafire', url: mediafireLink }
          ],
          [{ text: '« Menu Utama', callback_data: 'main_menu' }]
        ]
      }
    });

    logger.info(`File "${file.file_name}" berhasil diupload ke kedua layanan untuk chat ${chatId}`);
  } catch (error) {
    handleError(bot, chatId, error);
    logger.error(`Error saat memproses file "${file.file_name}": ${error.message}`);
  }
};

export default handleFileUpload;