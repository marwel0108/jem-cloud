const buildUrl = (baseUrl, pathToElement) => baseUrl 
                                                    + '/' + ((pathToElement === undefined) 
                                                    ? '' 
                                                    : pathToElement + '-');

module.exports = buildUrl;