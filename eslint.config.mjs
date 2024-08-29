import antfu from "@antfu/eslint-config";

export default antfu(
  {
    stylistic: {
      jsx: true, // react
      indent: 2,
      semi: true,
      quotes: "double",
    },
    react: true, // react
    ignores: ["public/mockServiceWorker.js"],
  },
  // react
  {
    rules: {
      "unused-imports/no-unused-imports": "off",
      "unused-imports/no-unused-vars": "off",
      "react/prop-types": "off",
      "react-refresh/only-export-components": "off",
      "react-hooks/exhaustive-deps": "off",
      "react/no-duplicate-key": "off",
      "style/jsx-one-expression-per-line": "off",
      "style/jsx-sort-props": [
        "error",
        {
          ignoreCase: false,
          callbacksLast: true,
          reservedFirst: true,
          shorthandFirst: true,
          shorthandLast: false,
          noSortAlphabetically: false,
          multiline: "last",
        },
      ],
    },
  },
);
