import { google } from 'googleapis';
import { authenticate } from '@google-cloud/local-auth';
import { promises as fs } from 'fs';
import axios from 'axios';
import config from '../config/config.js';
import logger from '../utils/logger.js';

let drive;

async function initializeGoogleDrive() {
  try {
    const auth = await authenticate({
      keyfilePath: config.paths.credentials,
      scopes: config.google.scopes,
    });

    drive = google.drive({ version: 'v3', auth });
    logger.info('Google Drive API initialized successfully');
  } catch (error) {
    logger.error('Failed to initialize Google Drive:', error);
    throw error;
  }
}

export async function uploadToGoogleDrive(filePath, fileName) {
  try {
    if (!drive) {
      await initializeGoogleDrive();
    }

    const response = await axios({
      method: 'GET',
      url: `https://api.telegram.org/file/bot${config.telegram.token}/${filePath}`,
      responseType: 'stream'
    });

    const fileMetadata = {
      name: fileName,
    };

    const media = {
      mimeType: 'application/octet-stream',
      body: response.data
    };

    const file = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id, webViewLink'
    });

    await drive.permissions.create({
      fileId: file.data.id,
      requestBody: {
        role: 'reader',
        type: 'anyone'
      }
    });

    logger.info(`File uploaded to Google Drive: ${fileName}`);
    return file.data.webViewLink;
  } catch (error) {
    logger.error(`Google Drive upload error: ${error.message}`);
    throw new Error('Failed to upload to Google Drive: ' + error.message);
  }
}

export default { uploadToGoogleDrive };