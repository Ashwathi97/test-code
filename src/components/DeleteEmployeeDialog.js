import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteEmployee } from '../features/employees/employeeSlice';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const DeleteEmployeeDialog = ({ employeeId }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    dispatch(deleteEmployee({ id: employeeId }));
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" color="error" onClick={handleOpen}>
        Delete Employee
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Employee</DialogTitle>
        <DialogContent>Are you sure you want to delete this employee?</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteEmployeeDialog;
