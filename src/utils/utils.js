function isArray (object) {
    return Array.isArray(object)
}

function isObject (object) {
    return typeof object === 'object'
}

function deepCopy (object) {
    let resultObject = {}
    // 如果是数组
    if (isArray(object)) {
        return object.map(item => {
            if (isArray(item) || isObject(item)) {
                return deepCopy(item)
            }
            return item
        })
    } else if (isObject(object)) {
        Object.entries(object).map(([key, value]) => {
            if (value && (isArray(value) || isObject(value))) {
                resultObject[key] = deepCopy(value)
            } else {
                resultObject[key] = value
            }
        })
    }
    return resultObject
}

export {
    deepCopy
}
