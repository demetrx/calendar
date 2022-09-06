import { FC, useState } from 'react';
import years from './years';
import months from './months';
import { IYM } from 'types';

// MUI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// Max select height
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 300,
    },
  },
};

interface DatePickerProps {
  curYM: IYM;
  onPick: (YM: IYM) => void;
}

const DatePicker: FC<DatePickerProps> = ({ curYM, onPick }) => {
  const [open, setOpen] = useState(false);
  const [year, setYear] = useState(curYM.year);
  const [month, setMonth] = useState(curYM.month);

  const handleClose = () => {
    setOpen(false);
  };

  const handlePick = () => {
    handleClose();
    onPick({ year, month });
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="date-picker">
        <CalendarTodayIcon fontSize="small" />
      </button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Choose year and month</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel htmlFor="year-select">Year</InputLabel>
              <Select
                id="year-select"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                input={<OutlinedInput label="Year" />}
                MenuProps={MenuProps}
              >
                {years.map((y) => (
                  <MenuItem key={y} value={y}>
                    {y}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel htmlFor="month-select">Month</InputLabel>
              <Select
                id="month-select"
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
                input={<OutlinedInput label="Month" />}
                MenuProps={MenuProps}
              >
                {months.map((m, idx) => (
                  <MenuItem key={m} value={idx}>
                    {m}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handlePick}>Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DatePicker;
