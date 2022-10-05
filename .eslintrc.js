module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "overrides": [
        {
            "files": ["*.test.js"],
            "env": {
                "jest": true
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "rules": {
    }
}
