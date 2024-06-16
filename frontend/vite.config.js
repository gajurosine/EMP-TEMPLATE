import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // server: {
  //   port: 5173, // Uncomment and change to the desired port number if needed
  // },
  // build: {
  //   rollupOptions: {
  //     input: './src/main.jsx', // Replace with your actual entry file path
  //   },
  // },
});
