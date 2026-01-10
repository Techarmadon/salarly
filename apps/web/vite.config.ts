// vite.config.ts
import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { devtools } from '@tanstack/devtools-vite'
import { nitro } from 'nitro/vite'

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    devtools(),
    nitro(),
    tailwindcss(),
    // Enables Vite to resolve imports using path aliases.
    tsconfigPaths({ projects: ['./tsconfig.json'] }),
    tanstackStart({
      srcDirectory: 'src', // This is the default
      router: {
        // Specifies the directory TanStack Router uses for your routes.
        routesDirectory: 'app', // Defaults to "routes", relative to srcDirectory
      },
    }),
    viteReact({ babel: { plugins: ['babel-plugin-react-compiler'] } }),
  ],
})
