import webpack              from 'webpack';
import assign               from 'object-assign';
import ExtractTextPlugin    from 'extract-text-webpack-plugin';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import prodCfg              from './webpack.prod.js';

Object.assign = assign;

const BABEL_QUERY = {
  presets: ['react', 'es2015'],
  plugins: [
    ['transform-object-rest-spread'],
    ['transform-class-properties'],
    [
      'react-transform',
      {
        transforms: [
          {
            transform: 'react-transform-hmr',
            imports:    ['react'],
            locals:     ['module']
          }
        ]
      }
    ]
  ]
};

export default function(app) {
  const config = Object.assign(prodCfg, {
    devtool: 'inline-source-map',
    entry:   [
      'webpack-hot-middleware/client',
      './client',
      './css'
    ],
    module: {
      loaders: [
        {
          test:    /\.jsx?$/,
          exclude: /node_modules/,
          loader:  'babel',
          query:   BABEL_QUERY
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        },
        { test: /\.(jpe?g|gif|png|svg.*|woff.*|eot.*|ttf.*|wav|mp3)$/, loader: "file" }
      ]
    },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new ExtractTextPlugin("style.css"),
      new webpack.EnvironmentPlugin(['NODE_ENV', 'GOOGLE_APPLICATION_CREDENTIALS'])
    ]
  });

  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, { noInfo: true }));
  app.use(webpackHotMiddleware(compiler));
}
