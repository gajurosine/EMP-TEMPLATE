import { configureStore } from '@reduxjs/toolkit'
import authReducer from './modules/authSlice';
import employeeReducer from './modules/employeeSlice';
import laptopReducer from './modules/laptopSlice';
import laptopEmployeeReducer from './modules/laptopEmployeeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    employee: employeeReducer,
    laptop: laptopReducer,
    laptopEmployee: laptopEmployeeReducer,
  },
})