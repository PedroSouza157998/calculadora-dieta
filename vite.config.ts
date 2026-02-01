import path from "path"
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), {
    name: 'middleware',
    configureServer: (server) => {
      server.middlewares.use(async (req, res, next) => {
        if (req.url?.startsWith('/api')) {
          const { default: app } = await import('./server');
          app(req, res, next);
        } else {
          next();
        }
      });
    }
  }],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
