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
                main: path.resolve(__dirname, 'index.html'),
                home: path.resolve(__dirname, 'home.html'),
                zoom: path.resolve(__dirname, 'zoom.html')},
            },
        },
    }
})
