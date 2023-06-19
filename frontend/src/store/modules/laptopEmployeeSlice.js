import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  laptopEmployeeEmployees: { docs: [] },
  isLaptopEmployeesLoaded: false,
};

export const AuthSlice = createSlice({
  name: "LaptopEmployees",
  initialState,
  reducers: {
    setLaptopEmployees: (state, action) => {
      state.laptopEmployeeEmployees = action.payload;
      state.isLaptopEmployeesLoaded = true;
    },
    addLaptopEmployee: (state, action) => {
      state.laptopEmployeeEmployees.docs = [...state.laptopEmployeeEmployees.docs, action.payload];
    },
    updateLaptopEmployee: (state, action) => {
      for (const i in state.laptopEmployeeEmployees.docs) {
        if (state.laptopEmployeeEmployees.docs[i]._id === action.payload._id) {
          state.laptopEmployeeEmployees.docs[i] = action.payload;
        }
      }
    },
    removeLaptopEmployee: (state, action) => {
      state.laptopEmployeeEmployees.docs = state.laptopEmployeeEmployees.docs.filter((laptopEmployee) => laptopEmployee._id !== action.payload);
    },
  },
});

export const { setLaptopEmployees, addLaptopEmployee, removeLaptopEmployee, updateLaptopEmployee } = AuthSlice.actions;

export const selectLaptopEmployees = (state) => state.laptopEmployee.laptopEmployeeEmployees.docs;
export const isLaptopEmployeesLoaded = (state) => states.laptopEmployee.isLaptopEmployeesLoaded;

export default AuthSlice.reducer;
