import logger from './logger.js';

export function handleError(bot, chatId, error) {
  const errorMessage = 'An error occurred while processing your request. Please try again later.';
  
  bot.sendMessage(chatId, errorMessage)
    .catch(err => {
      logger.error('Error sending error message:', err);
    });
    
  logger.error('Error details:', error);
}

export default { handleError };