import moment from 'moment';
const getCurrentWeek = () => {
  let now = moment();
  const w = now.subtract(2, 'd').week() - 35;
  return w > 0 ? w : 2;
};
export default getCurrentWeek;
