import { uploadToGoogleDrive } from '../services/googleDrive.js';
import { uploadToMediafire } from '../services/mediafire.js';
import logger from '../utils/logger.js';

export const mainMenuKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [{ text: '📤 Upload File', callback_data: 'upload_info' }],
      [{ text: '❓ Bantuan', callback_data: 'help' }],
      [{ text: '📊 Status', callback_data: 'status' }]
    ]
  }
};

export const uploadMenuKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: '📁 Google Drive', callback_data: 'upload_gdrive' },
        { text: '🔥 Mediafire', callback_data: 'upload_mediafire' }
      ],
      [{ text: '📤 Upload Keduanya', callback_data: 'upload_both' }],
      [{ text: '« Kembali', callback_data: 'main_menu' }]
    ]
  }
};

export const backToMainKeyboard = {
  reply_markup: {
    inline_keyboard: [[{ text: '« Menu Utama', callback_data: 'main_menu' }]]
  }
};

export default {
  mainMenuKeyboard,
  uploadMenuKeyboard,
  backToMainKeyboard
};