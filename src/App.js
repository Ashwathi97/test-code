import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchEmployees } from './features/employees/employeeSlice';
import EmployeeDirectory from './components/EmployeeDirectory';
import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  return (
    <div className="App">
      <h1>Employee Management</h1>
      <EmployeeDirectory />
    </div>
  );
}

export default App;

