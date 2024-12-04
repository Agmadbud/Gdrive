import TelegramBot from 'node-telegram-bot-api';
import config from './config/config.js';
import { setupCommands } from './bot/commands.js';
import logger from './utils/logger.js';

const bot = new TelegramBot(config.telegram.token, { polling: true });

setupCommands(bot);

logger.info('Bot started successfully');