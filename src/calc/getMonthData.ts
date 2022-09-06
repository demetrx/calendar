import { IDay, IYM } from 'types';
import getTodayYearAndMonth from './getTodayYM';

function getMonthData({ year, month }: IYM): IDay[] {
  const days: IDay[] = [];

  // Add current month
  const daysInCurMonth = new Date(year, month + 1, 0).getDate();
  for (let i = 1; i <= daysInCurMonth; i++) {
    const weekDay = getWeekDay(year, month, i);

    days.push({ num: i, weekDay, active: true });
  }

  // Add missing days of first week from prev month
  const lastDayOfPrevMonth = new Date(year, month, 0).getDate(); // 28, 30 or 31
  let lackingDaysStart = (new Date(year, month, 1).getDay() + 7) % 7 - 1; // day of the week (3-Wed) - 1
  // check if month starts with sunday (idx === 0, -1 => 6)
  if (lackingDaysStart === -1) {
    lackingDaysStart = 6;
  }
  for (let i = lastDayOfPrevMonth; lackingDaysStart > 0; i--) {
    const weekDay = getWeekDay(year, month - 1, i);

    days.unshift({ num: i, weekDay, active: false });

    lackingDaysStart--;
  }

  // Add missing days of last week from next month
  let lackingDaysEnd = 7 - new Date(year, month + 1, 0).getDay(); // 4
  if (lackingDaysEnd < 7) {
    for (let i = 1; i <= lackingDaysEnd; i++) {
      const weekDay = getWeekDay(year, month + 1, i);

      days.push({ num: i, weekDay, active: false });
    }
  }

  // Mark today
  const todayYM = getTodayYearAndMonth();
  
  if (todayYM.month === month && todayYM.year === year) {
    const today = new Date().getDate();
    days.find((i) => i.num === today)!.today = true;
  }

  return days;
}

function getWeekDay(year: number, month: number, day: number) {
  return new Date(year, month, day)
    .toLocaleString('en-GB', { weekday: 'short' })
    .slice(0, 2);
}

export default getMonthData;
