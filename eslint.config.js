import { defineConfig } from "eslint/config"; // eslint-disable-line n/no-unpublished-import
import rg from "eslint-config-reverentgeek";
import globals from "globals";

export default defineConfig( [ {
	extends: [ rg.configs["node-esm"] ],
	rules: {
		"n/no-unpublished-import": [ "error", {
			allowModules: [ "eslint-config-reverentgeek", "electron" ]
		} ],
		"n/no-extraneous-import": [ "error", {
			allowModules: [ "globals" ]
		} ]
	}
}, {
	files: [ "app*.js", "app*.mjs" ],
	languageOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		globals: globals.browser
	}
} ] );

// import rg from "eslint-config-reverentgeek";

// export default [
//     ...rg.configs[ "node-esm" ],
//     {
//         rules: {
//             "n/no-unpublished-import": [ "error", {
//                 allowModules: [ "eslint-config-reverentgeek", "electron" ]
//             } ],
//             "n/no-extraneous-import": [ "error", {
//                 allowModules: [ "globals" ]
//             } ]
//         }
//     }, {
//         files: [ "app*.js", "app*.mjs" ],
//         languageOptions: {
//             ecmaVersion: "latest",
//             sourceType: "module",
//             globals: globals.browser
//         }
//     }
// ];
