module.exports = {
    extends: ["plugin:prettier/recommended", "eslint-config-react-app"],
    plugins: ["prettier"],
    rules: {
        "prettier/prettier": "error",
        "quotes": [2, "single"]
    }
}   