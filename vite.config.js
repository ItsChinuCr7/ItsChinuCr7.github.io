import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Cloudflare Pages serves this project from the domain root.
// Keep base as '/' unless you later choose GitHub Project Pages.
export default defineConfig({
  plugins: [react()],
  base: '/',
})
