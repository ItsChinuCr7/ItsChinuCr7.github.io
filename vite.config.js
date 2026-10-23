import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// This is a user-site repository: https://ItsChinuCr7.github.io/
export default defineConfig({
  plugins: [react()],
  base: '/',
})
