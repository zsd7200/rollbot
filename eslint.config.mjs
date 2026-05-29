// eslint.config.js
import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
	{
		files: ["**/*.js"],
		languageOptions: {
			globals: {
				...globals.node
			}
		},
		plugins: {
			js,
		},
		extends: ["js/recommended", tseslint.configs.recommended],
		rules: {
			"no-unused-vars": "warn",
			"semi": ["error", "always"],
			"max-len": ["error", { "code": 180, "tabWidth": 4, "ignoreComments": true }],
		},
	},
]);
