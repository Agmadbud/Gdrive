import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const config = {
  telegram: {
    token: process.env.BOT_TOKEN
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: process.env.GOOGLE_REDIRECT_URI,
    scopes: ['https://www.googleapis.com/auth/drive.file']
  },
  mediafire: {
    email: process.env.MEDIAFIRE_EMAIL,
    password: process.env.MEDIAFIRE_PASSWORD,
    appId: process.env.MEDIAFIRE_APP_ID,
    signature: process.env.MEDIAFIRE_SIGNATURE
  },
  paths: {
    root: join(__dirname, '../..'),
    credentials: join(__dirname, '../../credentials.json'),
    token: join(__dirname, '../../token.json')
  }
};

export default config;