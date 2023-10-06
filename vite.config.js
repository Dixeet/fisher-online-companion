import { defineConfig, splitVendorChunkPlugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import vuetify from 'vite-plugin-vuetify';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Components from 'unplugin-vue-components/vite';

// https://vitejs.dev/config/
export default defineConfig({
  cacheDir: '.cache/',
  plugins: [
    splitVendorChunkPlugin(),
    vue(),
    vuetify({ autoImport: true }),
    Icons({
      compiler: 'vue3',
    }),
    Components({
      dirs: ['src/components', 'src/layouts'],
      dts: true,
      resolvers: [
        IconsResolver({
          alias: {
            game: 'game-icons',
          },
        }),
      ],
    }),
  ],
  build: {
    assetsInlineLimit: 512,
  },
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
      '@': fileURLToPath(new URL('./', import.meta.url)),
    },
  },
});
