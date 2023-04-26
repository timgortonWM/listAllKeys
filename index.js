(function listStringVariables(obj = window, path = '', visited = new Set()) {
    const ignoreKeyList = [
        'localName',
        'namespaceURI',
        'tagName',
        'href',
        'appName',
        'nodeName',
        'URL',
        'platform',
        'appCodeName',
        'className',
        'host',
        'cssText'
    ];// Add the keys you want to ignore here
    const ignorePathSubstrings = [
        'byteToHex',
        'rtlLangs',
        'plugins',
        'classList',
        'style',
        'chrome.app',
        'cssRules',
        '.walkMe_wm',
        'wmTest'
    ];// Add the path substrings you want to ignore here
    const ignoreStringSubstrings = [
        'display: block;',
        'display: none;',
        '</a>',
        '<a>',
        '<div>',
        '</div>',
        '<li>',
        '</li>',
        '<head>',
        '</head>',
        '<body>',
        '</body>',
        'plugins',
        '.svg'

    ]; // Add the string substrings you want to ignore here

    if (visited.has(obj) || path.length > 100) {
        return;
    }

    visited.add(obj);

    for (const key in obj) {
        const newPath = path ? `${path}.${key}` : key;
        try {
            const shouldIgnorePath = ignorePathSubstrings.some(substring => newPath.includes(substring));

            if (typeof obj[key] === 'string') {
                const shouldIgnoreString = ignoreStringSubstrings.some(substring => obj[key].includes(substring));

                if (obj[key].length > 0 &&
                    obj[key].length <= 1000 &&
                    !ignoreKeyList.includes(key) &&
                    !obj[key].includes('\n') &&
                    !shouldIgnorePath &&
                    !shouldIgnoreString
                ) {
                    console.log(`${newPath} = "${obj[key]}"`);
                }
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                listStringVariables(obj[key], newPath, visited);
            }
        } catch (e) {
        
        }
    }
})();
