const path = require('path');


module.exports = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    webpack: (config, options) => {
      let loaders = 
      config.module.rules.push({
        test: /\.(png|jp(e*)g|gif)$/,
        use: [
          options.defaultLoaders.babel,
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash]-[name].[ext]',
            },
          },
        ],
      }, 
      {
        test: /\.svg$/,
        use: [
          options.defaultLoaders.babel,
          '@svgr/webpack'
        ],
      },
      )
  
      return config
    },
    async redirects() {
      return [
        {
          source: '/',
          destination: '/Auth/Signin',
          permanent: true,
        },
      ]
    },
}