import { FC } from 'react';
import { IEvent } from 'types';
import { useForm } from 'react-hook-form';

// MUI
import NotesIcon from '@mui/icons-material/Notes';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { v4 } from 'uuid';

interface EventDialogProps {
  heading: string;
  isOpened: boolean;
  onClose: () => void;
  onSave: (eventData: IEvent) => void;
  event?: IEvent | null;
  onDelete?: (eventData: IEvent) => void;
}

interface FormInputs {
  title: string;
  descr: string;
  date: string;
  time: string;
}

const EventDialog: FC<EventDialogProps> = ({
  heading,
  isOpened,
  onClose,
  onSave,
  event,
  onDelete,
}) => {
  // React-Hook-Form
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      title: event?.title || '',
      descr: event?.descr || '',
      date: event?.date || new Date().toISOString().split('T')[0],
      time: event?.time || '',
    },
  });

  const handleSave = ({ date, descr, title, time }: FormInputs) => {
    const [year, month, day] = date.split('-').map((i) => Number(i));

    onSave({
      id: event?.id || v4(),
      title,
      descr,
      date,
      time,
      year,
      month: month - 1,
      day,
    });
    reset();
    onClose();
  };

  const handleDelete = () => {
    onDelete!(event!);
    reset();
    onClose();
  };

  return (
    <>
      <Dialog open={isOpened} onClose={onClose}>
        <DialogTitle m={'10px 20px'}>{heading}</DialogTitle>
        <form className="form" onSubmit={handleSubmit(handleSave)}>
          <TextField
            value={event?.title}
            margin="dense"
            error={!!errors.title}
            label="Title *"
            variant="standard"
            placeholder="Title goes here"
            helperText={errors.title?.message}
            {...register('title', {
              required: 'Title is required',
              minLength: { value: 3, message: 'Min 3 characters' },
              maxLength: { value: 17, message: 'Max 17 characters' },
            })}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="end"
                  style={{ position: 'absolute', right: 5 }}
                >
                  <NotesIcon />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            value={event?.descr}
            margin="dense"
            label="Description"
            variant="standard"
            multiline
            InputLabelProps={{
              shrink: true,
            }}
            rows={4}
            {...register('descr')}
          />

          <TextField
            value={event?.date}
            margin="dense"
            error={!!errors.date}
            label="Date *"
            variant="standard"
            helperText={!!errors.title && 'Date is required'}
            type="date"
            {...register('date', { required: true })}
          />

          <TextField
            value={event?.time}
            margin="dense"
            label="Begin time"
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
            type="time"
            {...register('time')}
          />

          <Box display="flex" justifyContent="flex-end" mb="15px" mt="20px">
            {onDelete && (
              <IconButton onClick={handleDelete} size="medium" color="error">
                <DeleteIcon />
              </IconButton>
            )}

            <Button
              disabled={!!errors.date || !!errors.title}
              variant="contained"
              type="submit"
            >
              Save
            </Button>
          </Box>
        </form>

        <Box position="absolute" top="5px" right="5px">
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Dialog>
    </>
  );
};

export default EventDialog;
