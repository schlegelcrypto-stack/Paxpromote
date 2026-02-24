import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Fix for @walletconnect/relay-auth package.json exports issue
      '@walletconnect/relay-auth': '@walletconnect/relay-auth/dist/index.es.js',
    },
  },
  optimizeDeps: {
    include: ['@walletconnect/relay-auth'],
    esbuildOptions: {
      target: 'esnext',
    },
  },
  build: {
    target: 'esnext',
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
})
