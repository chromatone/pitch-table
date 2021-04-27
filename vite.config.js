import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteComponents from 'vite-plugin-components'
import WindiCSS from 'vite-plugin-windicss'
import ViteIcons, { ViteIconsResolver } from 'vite-plugin-icons'
import { getAliases } from 'vite-aliases'

const aliases = getAliases()

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: aliases,
  },
  plugins: [
    vue(),
    WindiCSS(),
    ViteIcons(),
    ViteComponents({
      // relative paths to the directory to search for components.
      dirs: ['src/components'],
      //for icons
      customComponentResolvers: ViteIconsResolver({
        componentPrefix: '',
      }),
      // valid file extensions for components.
      extensions: ['vue'],
      // search for subdirectories
      deep: true,

      // Allow subdirectories as namespace prefix for components.
      directoryAsNamespace: true,
      // Subdirectory paths for ignoring namespace prefixes
      // works when `directoryAsNamespace: true`
      globalNamespaces: [],
    }),
  ],
})
