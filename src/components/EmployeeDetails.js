import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteEmployee} from '../features/employees/employeeSlice';
import EditEmployeeDialog from './EditEmployeeDialog';
import { Button } from '@mui/material';

function EmployeeDetails({ employee }) {
  const dispatch = useDispatch();
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleEdit = () => {
    setEditDialogOpen(true);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${employee.name}?`)) {
      dispatch(deleteEmployee(employee.id));
    }
  };

  return (
    <div>
      <h4>{employee.name}</h4>
      <p>{employee.position} - {employee.department}</p>
      <Button onClick={handleEdit}>Edit</Button>
      <Button onClick={handleDelete}>Delete</Button>
      <EditEmployeeDialog
        employee={employee}
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
      />
    </div>
  );
}

export default EmployeeDetails;
