const path = require("path");
const fs = require("fs");

function getDirectories(dir) {
  return fs.readdirSync(dir).filter(function (file) {
    return fs.statSync(path.join(dir, file)).isDirectory();
  });
}

const rootPath = __dirname;
const pathToPackages = path.join(rootPath, '..', '..', 'packages');
const packages = getDirectories(pathToPackages).map(package => require(path.join(pathToPackages, package, 'package.json')).name);

const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')(packages);

module.exports = withPlugins([
  withTM,
], {
  reactStrictMode: true,
  swcMinify: true,
});
