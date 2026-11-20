import { defineConfig } from 'vite';

const reactRoutes = new Set(['/search', '/messages', '/profile']);

export default defineConfig({
  plugins: [
    {
      name: 'startup-client-routes',
      configureServer(server) {
        server.middlewares.use((request, _response, next) => {
          const pathname = request.url.split('?')[0];
          if (request.method === 'GET' && reactRoutes.has(pathname)) {
            request.url = '/index.html';
          }
          next();
        });
      },
    },
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:4000',
    },
  },
});
