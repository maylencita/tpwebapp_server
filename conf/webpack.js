const path = require('path')
const nodeExternals = require('webpack-node-externals')

const root = path.resolve(__dirname , '..')

const conf = {  
  tsconfig: path.resolve(__dirname, 'tsconfig.json'),
  output: path.resolve(root, 'bin'),
  sources: path.resolve(root, 'src'),
}

module.exports = {
  context: conf.sources,
  
  entry: {
    app: './app.ts'     
  },

  output: {
    path: conf.output,
    filename: '[name].js',
    libraryTarget: "commonjs2"
  },

  module: {
    loaders: [
      {test: /\.ts(x?)$/, loader: `awesome-typescript-loader?configFileName=${conf.tsconfig}`}
    ]
  },

  resolve: {
    modules: [conf.sources, 'node_modules'],
    extensions: ['.js', '.ts', '.tsx']
  },
  
  target: 'node',

  externals: [nodeExternals()],

  devtool: 'source-map'

}