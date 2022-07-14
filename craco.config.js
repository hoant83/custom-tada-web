// const CracoAntDesignPlugin = require('craco-antd');
// const CracoLessPlugin = require('craco-less');
const path = require('path');
const { ESLINT_MODES } = require('@craco/craco');

module.exports = ({ env, paths }) => {
  return {
    eslint: {
      mode: ESLINT_MODES.file,
    },
    webpack: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    // plugins: [
    //   {
    //     plugin: CracoAntDesignPlugin,
    //   },
    //   {
    //     plugin: CracoLessPlugin,
    //   },
    // ],
  };
};
