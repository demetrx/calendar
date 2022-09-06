import { FC } from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

interface AddBtnProps {
  onClick: () => void;
}

const AddBtn: FC<AddBtnProps> = ({ onClick }) => {
  return (
    <Fab size="small" color="primary" aria-label="add" onClick={onClick}>
      <AddIcon />
    </Fab>
  );
};

export default AddBtn;
