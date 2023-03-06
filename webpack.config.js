module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-transform-runtime'],
            ignore: [ './node_modules/mapbox-gl/dist/mapbox-gl.js' ]
        }
      }
    }
  ]
}
