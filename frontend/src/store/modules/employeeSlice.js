import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: [],
  isEmployeesLoaded: false,
};

export const AuthSlice = createSlice({
  name: "Employees",
  initialState,
  reducers: {
    setEmployees: (state, action) => {
      state.employees = action.payload;
      state.isEmployeesLoaded = true;
    },
    addEmployee: (state, action) => {
      state.employees = [...state.employees, action.payload];
    },
    updateEmployee: (state, action) => {
      for (const i in state.employees) {
        if (state.employees[i].id === action.payload.id) {
          state.employees[i] = action.payload;
        }
      }
    },
    removeEmployee: (state, action) => {
      state.employees = state.employees.filter((employee) => employee.id !== action.payload);
    },
  },
});

export const { setEmployees, addEmployee, removeEmployee, updateEmployee } = AuthSlice.actions;

export const selectEmployees = (state) => state.employee.employees;
export const isEmployeesLoaded = (state) => states.employee.isEmployeesLoaded;

export default AuthSlice.reducer;
