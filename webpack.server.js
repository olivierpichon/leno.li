const nodeExternals = require('webpack-node-externals')
const extensions = {
  css: [
    'css'
  ],
  json: [
    'json'
  ],
  js: [
    'js',
    'jsx'
  ],
  images: [
    'gif',
    'jpg',
    'jpeg',
    'png',
    'svg'
  ],
  fonts: [
    'eot',
    'ttf',
    'woff'
  ],
  video: [
    'webm',
    'mp4',
    'ogg'
  ],
  audio: [
    'mp3',
    'wav'
  ]
}

const extensionTest = (exts, omitable) => (
  new RegExp(`.(${exts.join('|')})$`)
)

const fileLoaderTest = extensionTest(
  [].concat(
    extensions['audio'],
    extensions['fonts'],
    extensions['images'],
    extensions['video']
  )
)

const rules = [
  {
    test: /\.css$/,
    loader: 'null-loader'
  },
  {
    test: /\.(js|jsx)?$/,
    loaders: ['babel'],
    exclude: /node_modules/
  },
  {
    test: fileLoaderTest,
    use: 'file-loader'
  }
]

const plugins = []

const entry = {
  server: './server.jsx'
}

const externals = [nodeExternals({
  whitelist: [/\.(?!(?:jsx?|json)$).{1,5}$/i]
})]

module.exports = {
  stats: { children: false },
  module: { rules },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  entry,
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  externals,
  plugins,
  output: {
    libraryTarget: 'commonjs',
    filename: 'compiled_server.js',
    publicPath: '/'
  },
  module: { loaders: rules }
}
