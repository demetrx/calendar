import { FC } from 'react';
import { IDay, IEvent } from 'types';

interface CellProps {
  day: IDay;
  events: IEvent[];
  onEventClick: (e: IEvent | null) => void;
}

const Cell: FC<CellProps> = ({ day, events, onEventClick }) => {
  const className = `cell ${day.active ? '' : 'other-month'} ${
    day.today ? 'today' : ''
  }`;

  return (
    <div className={className}>
      <div className="week-day">{day.weekDay}</div>
      <div className="day">{day.num}</div>
      <div className="events">
        {events.slice(0, 4).map((e) => (
          <p onClick={() => onEventClick(e)} key={e.id}>
            {e.title}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Cell;
