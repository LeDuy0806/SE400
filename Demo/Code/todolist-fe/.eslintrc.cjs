/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path")

module.exports = {
  root: true,
  extends: [
    // Default rules
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:jsx-a11y/recommended",
    "plugin:@typescript-eslint/recommended",
    // Disable rules that eslint conflict with prettier.
    // Overwrite above config
    "eslint-config-prettier",
    "prettier"
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["prettier", "unused-imports", "react-refresh"],
  settings: {
    react: {
      version: "detect"
    },
    "import/resolver": {
      node: {
        paths: [path.resolve(__dirname, "")],
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      },
      typescript: {
        project: path.resolve(__dirname, "./tsconfig.json")
      }
    }
  },
  env: { browser: true, es2020: true, node: true }, // "node: true" is must to use __dirname, module features
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "react/react-in-jsx-scope": "off",
    "react/jsx-no-target-blank": "warn",
    "react/jsx-uses-react": "off",
    "no-trailing-spaces": "warn",
    "no-unreachable": "warn",
    "arrow-spacing": ["warn", { before: true, after: true }],
    "block-spacing": ["warn", "always"],
    "comma-spacing": ["warn", { before: false, after: true }],
    "eol-last": ["warn", "always"],
    "react/prop-types": "off",
    "@typescript-eslint/no-empty-object-type": "off",
    "jsx-a11y/click-events-have-key-events": [0],
    "jsx-a11y/no-static-element-interactions": [0],

    "jsx-a11y/alt-text": [0],
    "jsx-a11y/no-autofocus": [0],
    // Note: you must disable the base rule as it can report incorrect errors
    "no-empty-function": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-explicit-any": ["off"],
    "react-hooks/exhaustive-deps": 1,
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "warn",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_"
      }
    ],

    // prettier rules (from .prettierrc)
    "prettier/prettier": [
      "warn",
      {
        arrowParens: "always",
        semi: false,
        trailingComma: "none",
        tabWidth: 2,
        endOfLine: "auto",
        useTabs: false,
        singleQuote: false,
        printWidth: 120,
        jsxSingleQuote: true,
        organizeImportsSkipDestructiveCodeActions: true,
        plugins: ["prettier-plugin-organize-imports", "prettier-plugin-tailwindcss"]
      }
    ]
  }
}
