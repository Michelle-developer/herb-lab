import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [tailwindcss(), react()],
// });

export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // 開發中因Cookie不被瀏覽器接受問題，暫把前端發的請求轉給後端發出
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
