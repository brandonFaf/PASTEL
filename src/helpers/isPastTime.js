import moment from 'moment'
import 'moment-timezone'
export const isPastTime = game => {
  const gameTime = moment(`${game.date} ${game.time}`, 'YYYY-MM-DD HH:mm:ss')
  const gameStart = gameTime.tz('America/New_York')
  return moment().isAfter(gameStart)
}
