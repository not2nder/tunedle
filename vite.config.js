import { defineConfig, loadEnv } from 'vite'
import path from 'path'

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd())

    return {
        base: '/',
        resolve : {
            alias: {
                '@': path.resolve(__dirname,'src'),
                '@assets': path.resolve(__dirname, 'src/assets'),
                '@styles': path.resolve(__dirname, 'src/styles'),
                '@pages': path.resolve(__dirname, 'src/pages'),
                '@js': path.resolve(__dirname, 'src/js'),
            },
        },
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
            cssCodeSplit: true,
            minify: 'esbuild',
        },
    }
})
