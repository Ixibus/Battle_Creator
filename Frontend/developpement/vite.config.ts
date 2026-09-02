import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import checker from 'vite-plugin-checker'
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
	server : {
		host: true, // Écoute sur toutes les interfaces (IPv4/IPv6)
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