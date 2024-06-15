// @ts-check
 
/** @type {import('typedoc').TypeDocOptions & import('typedoc-plugin-markdown').PluginOptions} */
module.exports = {
	entryPoints: ['./src/*.ts'],
	out: 'doc',
	plugin: ['typedoc-plugin-markdown'],
	outputFileStrategy: "modules",
  };