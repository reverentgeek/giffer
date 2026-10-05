import { defineConfig } from "eslint/config"; // eslint-disable-line n/no-unpublished-import
import rg from "eslint-config-reverentgeek";
import globals from "globals";

export default defineConfig( [ {
	extends: [ rg.configs["node-esm"] ],
	rules: {
		"n/no-unpublished-import": [ "error", {
			allowModules: [ "eslint-config-reverentgeek", "electron", "globals" ]
		} ],
		"n/no-unsupported-features/node-builtins": [ "error", {
			ignores: [ "import.meta.dirname" ]
		} ]
	}
}, {
	files: [ "**/*.cjs" ],
	languageOptions: {
		sourceType: "commonjs",
		globals: globals.node
	},
	rules: {
		"n/no-unpublished-require": [ "error", {
			allowModules: [ "electron" ]
		} ]
	}
}, {
	files: [ "app.js" ],
	languageOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		globals: globals.browser
	}
} ] );
