const path = require('path');
const nrwlConfig = require('@nrwl/react/plugins/webpack.js');

module.exports = (config) => {
  nrwlConfig(config);
  console.log("my module");

  return {
    ...config,
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          loader: '@svgr/webpack',
          issuer: /\.[jt]sx?$/,
          options: {
            prettier: false,
            svgo: true,
            svgoConfig: {
              plugins: [{
                name: 'present-default',
                params: {
                  override: {
                    removeViewBox: false,
                  },
                },
              },],
            },
            titleProp: true,
          },
          test: /\.svg$/,
        },
      ],
    },
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        global: path.join(__dirname, 'libs/shared/styles/global.scss'),
      },
    },
  };
};
