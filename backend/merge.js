// VULNERABILITY: Prototype Pollution

function merge(target, source) {
    for (let key in source) {
        // BAD: No check for __proto__, constructor, or prototype
        target[key] = source[key]; 
    }
    return target;
}

module.exports = merge;