module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
		node: true,
	},
	extends: [
		"airbnb",
		"eslint:recommended",
		"plugin:import/recommended",
		"plugin:prettier/recommended",
		"plugin:jsx-a11y/recommended",
	],
	plugins: ["prettier", "import", "jsx-a11y"],
	parserOptions: {
		ecmaVersion: 12,
		sourceType: "module",
	},
	globals: {
		Atomics: "readonly",
		SharedArrayBuffer: "readonly",
	},
	rules: {
		"react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
		"new-cap": "error",
		"no-invalid-this": "error",
		"prefer-const": "error",
		"no-new-func": "error",
		"prettier/prettier": "error",
		"no-unused-vars": "warn",
		"no-console": "warn",
		"func-names": "warn",
		"no-process-exit": "warn",
		"object-shorthand": "warn",
		"class-methods-use-this": "error",
		"no-param-reassign": "error",
		"no-var": "error",
		"prefer-arrow-callback": "warn",
		"prefer-rest-params": "warn",
		"arrow-parens": ["error", "always"],
		"arrow-body-style": ["error", "as-needed"],
		"no-eval": "error",
		"no-implied-eval": "error",
		eqeqeq: "error",
		"no-with": "error",
		"no-plusplus": "error",
		"jsx-a11y/label-has-for": "error",
		"jsx-a11y/label-has-associated-control": "always",
	},
};
