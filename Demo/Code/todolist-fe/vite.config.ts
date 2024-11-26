import react from "@vitejs/plugin-react"
import * as path from "path"
import { defineConfig } from "vite"
import "vitest/config"

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
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
      host: true,
      port: 3000,
    }
  })
}
