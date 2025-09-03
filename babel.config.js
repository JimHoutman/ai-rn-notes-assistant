module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    // No custom plugins needed for Expo env support
  };
};
