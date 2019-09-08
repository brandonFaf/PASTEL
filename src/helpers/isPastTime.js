import moment from 'moment';
import 'moment-timezone';
export const isPastTime = game => {
  const gameTime = moment.tz(
    `${game.date} ${game.time}`,
    'YYYY-MM-DD HH:mm:ss',
    'America/New_York'
  );
  return moment().isAfter(gameTime);
};
