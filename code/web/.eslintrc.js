module.exports = {
  root: true,
  env: {
    node: true,
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "plugin:vue/vue3-essential",
    "@vue/standard",
    "@vue/typescript/recommended",
    "prettier",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "comma-dangle": ["error", "only-multiline"],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["off"],
  },
  globals: {
    defineProps: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly",
    withDefaults: "readonly",
  },
};
