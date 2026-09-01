import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import checker from 'vite-plugin-checker'
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
	server : {
		host: '127.0.0.1', // <-- Force l'écoute IPv4
    	port: 5173,
		watch : {
			usePolling : true,
		}
	},
	plugins: [
		react(),
		checker({
			typescript: true,
		}), svgr()
	],
})