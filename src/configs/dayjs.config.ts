import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';

export function initDayjs() {
  dayjs.extend(utc);
  dayjs.extend(customParseFormat);
}
