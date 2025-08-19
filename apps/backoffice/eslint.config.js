import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      import: importPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-unused-vars": "off",

      // 🚀 Import Order Rule
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",        // Node built-ins
            "external",       // npm packages
            "internal",       // @/... aliases
            ["parent", "sibling", "index"], // relative imports
            "object",
            "type"
          ],
          pathGroups: [
            { pattern: "react", group: "external", position: "before" },
            { pattern: "lucide-react", group: "external", position: "after" },

            { pattern: "@/components/**", group: "internal", position: "after" },
            { pattern: "@/hooks/**", group: "internal", position: "after" },
            { pattern: "@/store/**", group: "internal", position: "after" },
            { pattern: "@/types/**", group: "internal", position: "after" }
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          "newlines-between": "always",   // Blank line between each group
          alphabetize: { order: "asc", caseInsensitive: true },
          distinctGroup: true,
          warnOnUnassignedImports: false
        }
      ]
    },
  }
);
