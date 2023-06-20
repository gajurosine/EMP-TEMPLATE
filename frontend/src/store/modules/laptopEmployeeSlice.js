import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  laptopEmployeeEmployees: { items: [] },
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
      state.laptopEmployeeEmployees.items = [...state.laptopEmployeeEmployees.items, action.payload];
    },
    updateLaptopEmployee: (state, action) => {
      for (const i in state.laptopEmployeeEmployees.items) {
        if (state.laptopEmployeeEmployees.items[i].id === action.payload.id) {
          state.laptopEmployeeEmployees.items[i] = action.payload;
        }
      }
    },
    removeLaptopEmployee: (state, action) => {
      state.laptopEmployeeEmployees.items = state.laptopEmployeeEmployees.items.filter((laptopEmployee) => laptopEmployee.id !== action.payload);
    },
  },
});

export const { setLaptopEmployees, addLaptopEmployee, removeLaptopEmployee, updateLaptopEmployee } = AuthSlice.actions;

export const selectLaptopEmployees = (state) => state.laptopEmployee.laptopEmployeeEmployees.items;
export const isLaptopEmployeesLoaded = (state) => state.laptopEmployee.isLaptopEmployeesLoaded;

export default AuthSlice.reducer;
