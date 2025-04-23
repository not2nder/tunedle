import { defineConfig, loadEnv } from 'vite'
import path from 'path'

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd())

    return {
    define: {
        __APP_ENV__: env.VITE_VERCEL_ENV,
    },
    build: {
        rollupOptions: {
            input: {
                home: path.resolve(__dirname, 'index.html'),
                game: path.resolve(__dirname, 'src/game/index.html')},
            },
        },
    }
})
