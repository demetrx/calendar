import { IYM } from "types";

function getTodayYearAndMonth(): IYM {
  const today = new Date();
  return { year: today.getFullYear(), month: today.getMonth() };
}

export default getTodayYearAndMonth