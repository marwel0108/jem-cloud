const splitFileName = (element) => {
    
    const [name, extension] = element.split('.');

    return (!extension) ? [name, 'folder'] : [name, 'file', extension];
}

module.exports = splitFileName;