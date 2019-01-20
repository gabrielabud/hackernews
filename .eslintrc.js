module.exports = {
  "extends": "airbnb-base",
  "plugins": [
    "import"
  ],
  "rules": {
    "comma-dangle": [
      "error",
      "only-multiline"
    ],
    "no-underscore-dangle" : "off",
    "arrow-body-style": "off",
    "strict": "off",
    "complexity": ["warn", 10],
    "no-console": "off"
  },
  "env": {
    "browser": false,
    "commonjs": true,
    "es6": true,
    "mocha": true
  }
};