export interface IDay {
  num: number;
  weekDay: string;
  active: boolean;
  today?: boolean;
}

export interface IYM {
  year: number;
  month: number;
}

export interface IDate {
  year: number;
  month: number;
  day: number;
}

export interface IEvent {
  id: string;
  title: string;
  descr: string;
  date: string;
  time: string;
  year: number;
  month: number;
  day: number;
}
