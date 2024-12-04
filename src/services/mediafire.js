import axios from 'axios';
import FormData from 'form-data';
import logger from '../utils/logger.js';
import config from '../config/config.js';

export async function uploadToMediafire(filePath, fileName) {
  try {
    // Download file from Telegram
    const response = await axios({
      method: 'GET',
      url: `https://api.telegram.org/file/bot${config.telegram.token}/${filePath}`,
      responseType: 'stream'
    });

    // Create form data for Mediafire upload
    const formData = new FormData();
    formData.append('file', response.data, fileName);

    // Upload to Mediafire using their API
    const uploadResponse = await axios.post('https://www.mediafire.com/api/1.5/upload/simple.php', formData, {
      params: {
        session_token: await getMediafireToken(),
        response_format: 'json'
      },
      headers: {
        ...formData.getHeaders()
      }
    });

    if (uploadResponse.data.response.result === 'Success') {
      const quickkey = uploadResponse.data.response.dkey;
      const fileLink = `https://www.mediafire.com/file/${quickkey}/${fileName}`;
      
      logger.info(`File uploaded to Mediafire: ${fileName}`);
      return fileLink;
    } else {
      throw new Error('Mediafire upload failed');
    }
  } catch (error) {
    logger.error(`Mediafire upload error: ${error.message}`);
    throw new Error('Failed to upload to Mediafire: ' + error.message);
  }
}

async function getMediafireToken() {
  try {
    const response = await axios.post('https://www.mediafire.com/api/1.5/user/get_session_token.php', {
      email: config.mediafire.email,
      password: config.mediafire.password,
      application_id: config.mediafire.appId,
      signature: config.mediafire.signature,
      response_format: 'json'
    });

    if (response.data.response.result === 'Success') {
      return response.data.response.session_token;
    } else {
      throw new Error('Failed to get Mediafire session token');
    }
  } catch (error) {
    logger.error('Mediafire authentication error:', error);
    throw new Error('Mediafire authentication failed');
  }
}

export default { uploadToMediafire };