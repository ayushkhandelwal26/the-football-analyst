import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const GH_BASE = process.env.VITE_BASE_PATH || '/the-football-analyst/'

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? GH_BASE : '/',
})