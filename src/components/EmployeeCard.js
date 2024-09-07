import React, { useState } from 'react';
import EditEmployeeDialog from './EditEmployeeDialog';
import './EmployeeCard.css';

const EmployeeCard = ({ employee }) => {
  const [editOpen, setEditOpen] = useState(false);

  const handleEdit = () => {
    setEditOpen(true);
  };

  const handleCloseEdit = () => {
    setEditOpen(false);
  };

  return (
    <div className="employee-card">
      <h3>{employee.name}</h3>
      <p>Position: {employee.position}</p>
      <p>Department: {employee.department}</p>
      <p>Email: {employee.email}</p>
      <div className="actions">
        <button onClick={handleEdit}>Edit</button>
        <button>Delete</button>
      </div>
      <EditEmployeeDialog open={editOpen} handleClose={handleCloseEdit} employee={employee} />
    </div>
  );
};

export default EmployeeCard;
