import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk for fetching employees
export const fetchEmployees = createAsyncThunk(
  'employees/fetchEmployees',
  async () => {
    const response = await axios.get('http://localhost:3000/employees');
    return response.data;
  }
);

const initialState = {
  employees: [],
  loading: false,
  error: null,
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      const { managerId, newEmployee } = action.payload;
      const findManager = (employees) => {
        for (let employee of employees) {
          if (employee.id === managerId) {
            employee.directReports = employee.directReports || [];
            employee.directReports.push(newEmployee);
            return;
          }
          if (employee.directReports) {
            findManager(employee.directReports);
          }
        }
      };
      findManager(state.employees);
    },
    editEmployee: (state, action) => {
      const { id, updatedData } = action.payload;
      const findEmployee = (employees) => {
        for (let employee of employees) {
          if (employee.id === id) {
            Object.assign(employee, updatedData);
            return;
          }
          if (employee.directReports) {
            findEmployee(employee.directReports);
          }
        }
      };
      findEmployee(state.employees);
    },
    deleteEmployee: (state, action) => {
      const { id } = action.payload;
      const deleteRecursively = (employees) => {
        return employees.filter((employee) => {
          if (employee.directReports) {
            employee.directReports = deleteRecursively(employee.directReports);
          }
          return employee.id !== id;
        });
      };
      state.employees = deleteRecursively(state.employees);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addEmployee, editEmployee, deleteEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
