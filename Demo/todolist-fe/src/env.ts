// env.ts
import { defineConfig, Schema } from "@julr/vite-plugin-validate-env"

export default defineConfig({
  validator: "builtin",
  schema: {
    // Read more: https://github.com/Julien-R44/vite-plugin-validate-env#built-in-validator
    VITE_PORT: Schema.number(),
    VITE_API_ENDPOINT: Schema.string()
  }
})
