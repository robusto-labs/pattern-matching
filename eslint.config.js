import typescript from "@typescript-eslint/eslint-plugin";
import functional from "eslint-plugin-functional";
import parser from "@typescript-eslint/parser";
import { fileURLToPath } from "url";
import { dirname } from "path";
import eslintPrettier from "eslint-plugin-prettier/recommended";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default [
  eslintPrettier,
  {
    files: ["**/*.ts", "test/**/*.ts"],
    languageOptions: {
      parser: parser,
      sourceType: "module",
      parserOptions: {
        project: "tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      "@typescript-eslint": typescript,
      functional: functional,
    },
    ignores: ["dist/*", "node_modules/*"],
    rules: {
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/quotes": 0,
      "@typescript-eslint/no-unused-vars": "off",
      "array-callback-return": "error",
      "no-constructor-return": "error",
      "no-duplicate-imports": "off",
      "no-new-native-nonconstructor": "error",
      "@typescript-eslint/no-use-before-define": "off",
      "no-self-compare": "error",
      "no-template-curly-in-string": "error",
      "no-unused-private-class-members": "error",
      "class-methods-use-this": "off",
      "consistent-return": "off",
      "no-unused-vars": "off",
      "default-case": "error",
      "dot-notation": "error",
      eqeqeq: "error",
      "init-declarations": "error",
      "no-eq-null": "error",
      "no-extend-native": "error",
      "no-implicit-coercion": "error",
      "no-new-object": "error",
      "no-var": "error",
      "prefer-object-spread": "error",
      "require-await": "off",
      yoda: "error",
      "explicit-function-return-type": "off",
      "sort-keys": "off",
      "no-undef-init": "off",
      "no-restricted-syntax": [
        "error",
        {
          selector: "CallExpression[callee.name='Error']",
          message:
            "Error is deprecated, use Left instead because it complies the full type Error of the lib ts-belt.",
        },
        {
          selector: "CallExpression[callee.name='Ok']",
          message:
            "Ok is deprecated, use Right instead because it complies the full type Ok of the lib ts-belt.",
        },
      ],
    },
  },
];
