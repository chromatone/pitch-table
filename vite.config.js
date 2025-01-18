import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import Icons from 'unplugin-icons/vite'
import { ViteAliases } from 'vite-aliases'
import { viteSingleFile } from "vite-plugin-singlefile"
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({

  plugins: [
    vue(),
    ViteAliases({

    }),
    viteSingleFile(),
    WindiCSS(),
    Icons({ /* options */ }),
    Components({
      // relative paths to the directory to search for components.
      dirs: ['src/components'],

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
