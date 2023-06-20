import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  laptops: { rows: [] },
  isLaptopsLoaded: false,
};

export const AuthSlice = createSlice({
  name: "Laptops",
  initialState,
  reducers: {
    setLaptops: (state, action) => {
      state.laptops = action.payload;
      state.isLaptopsLoaded = true;
    },
    addLaptop: (state, action) => {
      state.laptops.rows = [...state.laptops.rows, action.payload];
    },
    updateLaptop: (state, action) => {
      for (const i in state.laptops.rows) {
        if (state.laptops.rows[i].id === action.payload.id) {
          state.laptops.rows[i] = action.payload;
        }
      }
    },
    removeLaptop: (state, action) => {
      state.laptops.rows = state.laptops.rows.filter((laptop) => laptop.id !== action.payload);
    },
  },
});

export const { setLaptops, addLaptop, removeLaptop, updateLaptop } = AuthSlice.actions;

export const selectLaptops = (state) => state.laptop.laptops.rows;
export const isLaptopsLoaded = (state) => states.laptop.isLaptopsLoaded;

export default AuthSlice.reducer;
