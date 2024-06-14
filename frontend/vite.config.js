import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000, // Change to the desired port number
  },
  rollupOptions: {
    input: 'src/main.jsx', // Replace with your actual entry file
  },
});
