module.exports = {
	entry:	['babel-polyfill', './src/main.js'],
	output: {
		path: "dist",
		filename: "bundle.js"
	},
	module: {
		preLoaders: [
			{ test: /\.js$/,exclude: /node_modules/, loader: "jshint-loader" },
		  { css: /\.css$/, test: /\.css/, loader: "style-loader!css-loader" },
			{ test: /\.html/, loader: 'htmlhint', exclude: /node_modules/ }
			//{ test: /\.js$/, loader: "source-map-loader" }
		],
		loaders: [
			{ test: /\.js$/, exclude:/node_modules/, loader: "babel-loader" },
			{ test: /\.json$/, exclude: /package.json/,  loader: "json" }
		]
	},

	jshint: {
		esversion: 6
	}
}
