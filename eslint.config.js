import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

export default [
  {ignores: ["arc/assets"]},
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},

  {languageOptions: {globals: globals.browser}},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },

  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/display-name": "off",
    },
  },
];
