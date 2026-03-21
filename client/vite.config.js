import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/proxy/leetcode': {
        target: 'https://leetcode.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/proxy\/leetcode/, ''),
        headers: {
          'Referer': 'https://leetcode.com',
          'Origin':  'https://leetcode.com',
        },
      },
      '/proxy/hackerrank': {
        target: 'https://www.hackerrank.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/proxy\/hackerrank/, ''),
        headers: {
          'Referer': 'https://www.hackerrank.com',
          'Origin':  'https://www.hackerrank.com',
        },
      },
      '/proxy/gfg': {
        target: 'https://geeks-for-geeks-stats-api.vercel.app',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/proxy\/gfg/, ''),
        headers: {
          'Referer': 'https://www.geeksforgeeks.org',
          'Origin':  'https://www.geeksforgeeks.org',
        },
      },
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
