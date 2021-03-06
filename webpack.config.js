var path = require('path')
var webpack = require('webpack')
var mode = 'development'

module.exports = {
	entry: './app/scripts/main.js',
	mode: 'none',
	output: {
		path: path.resolve(__dirname, './dist/scripts'),
		filename: 'main.js'
	},
	plugins: [
		new webpack.LoaderOptionsPlugin({
			options: {
				mode: mode
			}
		}),
		new webpack.ProvidePlugin({
			"$": "jquery",
			"jQuery": "jquery",
			"window.jQuery": "jquery"
		})
	],
	module: {
		rules: [{
			test: /\.css$/,
			use: [{
					loader: 'style-loader'
				},
				{
					loader: 'css-loader',
					options: {
						modules: true
					}
				}
			]
		}]
	}
}
