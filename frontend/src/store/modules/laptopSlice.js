import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  laptops: { docs: [] },
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
      state.laptops.docs = [...state.laptops.docs, action.payload];
    },
    updateLaptop: (state, action) => {
      for (const i in state.laptops.docs) {
        if (state.laptops.docs[i]._id === action.payload._id) {
          state.laptops.docs[i] = action.payload;
        }
      }
    },
    removeLaptop: (state, action) => {
      state.laptops.docs = state.laptops.docs.filter((laptop) => laptop._id !== action.payload);
    },
  },
});

export const { setLaptops, addLaptop, removeLaptop, updateLaptop } = AuthSlice.actions;

export const selectLaptops = (state) => state.laptop.laptops.docs;
export const isLaptopsLoaded = (state) => states.laptop.isLaptopsLoaded;

export default AuthSlice.reducer;
