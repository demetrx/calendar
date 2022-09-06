import { FC } from 'react';
import Cell from 'components/Cell/Cell';
import { getMonthData } from 'calc';
import { IEvent, IYM } from 'types';

interface CalendarProps {
  curYM: IYM;
  events: IEvent[];
  onEventClick: (e: IEvent | null) => void;
}

const Calendar: FC<CalendarProps> = ({ curYM, events, onEventClick }) => {
  return (
    <div className="calendar">
      {getMonthData(curYM).map((day, idx) => (
        <Cell
          key={idx}
          day={day}
          events={events.filter((e) => e.day === day.num)}
          onEventClick={onEventClick}
        />
      ))}
    </div>
  );
};

export default Calendar;
