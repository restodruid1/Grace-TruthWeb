import { defineConfig } from 'vite'

export default defineConfig({
  base: '/Grace-TruthWeb/',
  build: {
    rollupOptions: {
      input: {
        main:         'index.html',
        about:        'about.html',
        whatToExpect: 'what-to-expect.html',
        contact:      'contact.html',
      },
    },
  },
})
