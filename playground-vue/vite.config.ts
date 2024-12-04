import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImports from 'unplugin-auto-import/vite'
import VueComponents from 'unplugin-vue-components'

import bootvue from '../src/vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    fs: {
      allow: ['..']
    }
  },
  plugins: [
    vue(),
    // FIXME: default config for the plugin
    bootvue({ prefix: 'B' }),
    // these are required as we share the component pages with the Nuxt playground
    AutoImports({ imports: ['vue'] }),
    VueComponents.vite({
      dirs: ['../playground/app/components']
    })
  ]
})
