import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// https://github.com/vitejs/vite/tree/main/packages/plugin-vue-jsx
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
})
