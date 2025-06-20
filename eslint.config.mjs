import { dirname } from "path";
import { fileURLToPath } from "url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const eslintConfig = [
  ...fixupConfigRules(
    ...compat.extends("next/core-web-vitals", "next/typescript")
  ),
  {
    ignores: [
      "**/<rootDir>cypress",
      "<rootDir>/**/*.\\(test|spec).\\(ts|js)?\\(x)",
    ],
  },
  {
    plugins: {
      "@typescript-eslint": fixupPluginRules(typescriptEslint),
      prettier: fixupPluginRules(prettier),
      import: fixupPluginRules(_import),
      "jsx-a11y": fixupPluginRules(jsxA11Y),
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 12,
      sourceType: "module",

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      react: {
        version: "detect",
      },

      "import/resolver": {
        typescript: {
          project: ".",
        },
      },
    },

    rules: {
      quotes: ["error", "single"],
      "no-console": "error",
      "no-shadow": "off",
      "@typescript-eslint/no-shadow": "off",
      "consistent-return": "off",
      "import/no-named-as-default": "off",
      "prettier/prettier": ["error", { singleQuote: true }],
      "react/react-in-jsx-scope": "off",
      "react/jsx-filename-extension": "off",
      "space-before-function-paren": "off",
      "react/prop-types": "off",
      "react/require-default-props": "off",
      "react/jsx-props-no-spreading": "off",
      "no-use-before-define": "off",
      "no-empty-function": "off",
      "@typescript-eslint/no-empty-function": "error",
      "jsx-a11y/accessible-emoji": "off",
      "import/extensions": "off",
      "import/no-unresolved": "error",
      "import/prefer-default-export": "off",
      "@typescript-eslint/no-explicit-any": "warn",

      "react/function-component-definition": [
        "error",
        {
          namedComponents: ["function-declaration", "arrow-function"],
          unnamedComponents: "arrow-function",
        },
      ],

      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "object", "index"],
          ],

          pathGroups: [
            {
              pattern: "react",
              group: "external",
              position: "before",
            },
          ],

          pathGroupsExcludedImportTypes: ["react"],
          "newlines-between": "ignore",

          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },
];

export default eslintConfig;
