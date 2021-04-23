
const fromRouteToPath = (pathToElement) => (pathToElement === undefined) ? '' : pathToElement.split('-').join('/');

module.exports = fromRouteToPath;