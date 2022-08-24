const path = require('path');
const process = require('process');

const resolve_path = (() => {
  if (process.env.NODE_PATH === undefined) {
    return [
      'node_modules',
      path.resolve(__dirname, 'src/ts'),
    ];
  } else {
    return [
      'node_modules',
      path.resolve(process.env.NODE_PATH),
      path.resolve(__dirname, 'src/ts'),
    ];
  }
})();

const common = outfile => ({
  mode: 'production',
  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: resolve_path,
  },
  resolveLoader: {
    modules: resolve_path,
  },

  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
  output: {
    path: path.resolve(__dirname, './src/js/gen'),
    filename: outfile,
  },
});

module.exports = [
  {
    entry: './src/ts/entries/wireeater.tsx',
    ...common('wireeater.js')
  },
  {
    entry: './src/ts/entries/unthings.tsx',
    ...common('unthings.js')
  },
];
