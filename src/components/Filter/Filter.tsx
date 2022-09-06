import { FC } from 'react';
import { IYM } from 'types';

interface FilterProps {
  curYM: IYM;
  onChangeMonth: (month: number) => void;
}

const Filter: FC<FilterProps> = ({ onChangeMonth, curYM: { year, month } }) => {
  const date = new Date(year, month).toLocaleString('en-GB', {
    year: 'numeric',
    month: 'long',
  });

  return (
    <div className="filter">
      <button className="arrow" onClick={() => onChangeMonth(month - 1)}>
        {'<'}
      </button>
      <p className="curYM">{date}</p>
      <button className="arrow" onClick={() => onChangeMonth(month + 1)}>
        {'>'}
      </button>
    </div>
  );
};

export default Filter;
