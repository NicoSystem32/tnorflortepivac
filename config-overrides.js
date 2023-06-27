const { override, addWebpackPlugin, addWebpackModuleRule, addWebpackAlias } = require('customize-cra');

const webpack = require('webpack');



module.exports = override(

  addWebpackAlias({

    process: 'process/browser',

    stream: 'stream-browserify',

    zlib: 'browserify-zlib',

  }),

  addWebpackPlugin(

    new webpack.ProvidePlugin({

      process: 'process/browser',

      Buffer: ['buffer', 'Buffer'],

    })

  ),

  addWebpackModuleRule({

    test: /restructure\/src\/[^w].js/,

    use: [

      {

        loader: 'imports-loader',

        options: {

          type: 'commonjs',

          imports: 'multiple ../../buffer/ Buffer Buffer',

        },

      },

    ],

  })

);