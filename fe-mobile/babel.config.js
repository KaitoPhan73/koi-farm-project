module.exports = function (api) {
  api.cache(true);

  const presets = ['babel-preset-expo'];
  const plugins = ['nativewind/babel']; // Nếu bạn đang sử dụng NativeWind với Tailwind CSS

  return {
    presets,
    plugins,
  };
};
