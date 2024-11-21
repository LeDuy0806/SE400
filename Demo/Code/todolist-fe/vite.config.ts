import react from "@vitejs/plugin-react"
import * as path from "path"
import { defineConfig, loadEnv } from "vite"
import "vitest/config"

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    plugins: [react()],
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./src/setupTests.ts"]
    },
    resolve: {
      alias: [
        {
          find: "~",
          replacement: path.resolve(__dirname, "src")
        }
      ]
    },
    server: {
import react from "@vitejs/plugin-react"
import * as path from "path"
import { defineConfig, loadEnv } from "vite"
import "vitest/config"

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    plugins: [react()],
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./src/setupTests.ts"]
    },
    resolve: {
      alias: [
        {
          find: "~",
          replacement: path.resolve(__dirname, "src")
        }
      ]
    },
    server: {
      host: '0.0.0.0',
      port: parseInt(process.env.VITE_PORT || "3000")
    }
  })
}

      port: parseInt(process.env.VITE_PORT || "3000")
    }
  })
}
