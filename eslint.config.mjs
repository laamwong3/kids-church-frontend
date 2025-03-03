import { fixupConfigRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import tailwind from "eslint-plugin-tailwindcss";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const eslintConfig = [
  {
    ignores: [
      "**/index.d.ts",
      "**/tailwind.config.ts",
      "**/src/components/ui/**",
    ],
  },
  ...tailwind.configs["flat/recommended"],
  ...fixupConfigRules(
    compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  ),
  {
    rules: {
      "react-hooks/exhaustive-deps": "off",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
];

export default eslintConfig;
