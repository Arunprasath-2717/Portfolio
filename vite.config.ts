import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2022',
    cssMinify: true,
    rollupOptions: {
      output: {
        // Separate long-lived vendor chunks so content edits do not bust the animation libraries' cache.
        manualChunks: (id) => {
          if (!id.includes('node_modules')) return;
          if (id.includes('gsap') || id.includes('lenis')) return 'gsap';
          if (id.includes('motion') || id.includes('animejs')) return 'motion';
          if (id.includes('react')) return 'react';
        },
      },
    },
  },
});
