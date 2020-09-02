module.exports = {
	module:{
		rules:[
			{
				test:/\.(js|jsx|tsx)$/,
				exclude:/node_modules/,
				use:{
					loader:"babel-loader"
				}
			},
			{
				test:/\.(css|scss)$/i,
				exclude:/node_modules/,
				use:[
		          // Creates `style` nodes from JS strings
		          'style-loader',
		          // Translates CSS into CommonJS
		          'css-loader',
		          // Compiles Sass to CSS
		          'sass-loader'
		          //css file
		        ]
			}
		]
	}
}