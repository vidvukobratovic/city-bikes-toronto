import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.MAPBOX_ACCESS_TOKEN': JSON.stringify(process.env.MAPBOX_ACCESS_TOKEN)
  }
});
