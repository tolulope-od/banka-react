module.exports = {
  "extends": [
    "airbnb-base",
    "prettier",
    "prettier/react",
    "plugin:react/recommended"
  ],
  "plugins": [
    "react",
    "prettier"
  ],
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "prettier/prettier": [
      "error"
    ],
    "class-methods-use-this": [ 0 ]
  },
  "env": {
    "es6": true, 
    "browser": true
  },
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": { "jsx": true }
  }
};