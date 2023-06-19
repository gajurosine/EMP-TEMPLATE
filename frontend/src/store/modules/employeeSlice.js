import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: { docs: [] },
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
      state.employees.docs = [...state.employees.docs, action.payload];
    },
    updateEmployee: (state, action) => {
      for (const i in state.employees.docs) {
        if (state.employees.docs[i]._id === action.payload._id) {
          state.employees.docs[i] = action.payload;
        }
      }
    },
    removeEmployee: (state, action) => {
      state.employees.docs = state.employees.docs.filter((employee) => employee._id !== action.payload);
    },
  },
});

export const { setEmployees, addEmployee, removeEmployee, updateEmployee } = AuthSlice.actions;

export const selectEmployees = (state) => state.employee.employees.docs;
export const isEmployeesLoaded = (state) => states.employee.isEmployeesLoaded;

export default AuthSlice.reducer;
