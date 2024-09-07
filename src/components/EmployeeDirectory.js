import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import EmployeeDetails from './EmployeeDetails';
import AddEmployeeDialog from './AddEmployeeDialog';
import { Button } from '@mui/material';

function EmployeeDirectory() {
  const employees = useSelector((state) => state.employees.employees);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedManagerId, setSelectedManagerId] = useState(null);

  const handleAddEmployee = (managerId) => {
    setSelectedManagerId(managerId);
    setAddDialogOpen(true);
  };

  const renderEmployeeTree = (employees) => {
    return employees.map((employee) => (
      <li key={employee.id}>
        <EmployeeDetails employee={employee} />
        <Button onClick={() => handleAddEmployee(employee.id)}>Add Employee</Button>
        {employee.directReports && employee.directReports.length > 0 && (
          <ul>{renderEmployeeTree(employee.directReports)}</ul>
        )}
      </li>
    ));
  };

  return (
    <div>
      <ul>{renderEmployeeTree(employees)}</ul>
      <AddEmployeeDialog
        managerId={selectedManagerId}
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
      />
    </div>
  );
}

export default EmployeeDirectory;
