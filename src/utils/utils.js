function isArray (object) {
    return Array.isArray(object)
}

function isObject (object) {
    return typeof object === 'object'
}

// 数组判断是否重复
export function isRepeat (arr) {
    var hash = {}
    for (var i in arr) {
        if (hash[arr[i]]) {
            return true
        }
        hash[arr[i]] = true
    }
    return false
}
export function deepCopy (object) {
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
export const ossDownload = (url, fileName, ext = '') => {
    let downDom = document.createElement('a')
    if (fileName.toLowerCase().indexOf('.png') !== -1 || fileName.toLowerCase().indexOf('.jpg') !== -1 || fileName.toLowerCase().indexOf('.jpeg') !== -1) {
        let canvas = document.createElement('canvas') // 创建canvas DOM元素
        let ctx = canvas.getContext('2d')
        let img = new Image()
        img.setAttribute('crossOrigin', 'anonymous')
        img.src = url
        img.onload = function () {
            canvas.height = img.height // 指定画板的高度,自定义
            canvas.width = img.width // 指定画板的宽度，自定义
            ctx.drawImage(img, 0, 0) // 参数可自定义
            let dataURL = canvas.toDataURL('image/' + ext) // 传递的自定义的参数
            canvas = null
            downDom.setAttribute('href', dataURL)
            downDom.setAttribute('download', fileName)
            downDom.click()
        }
    } else {
        downDom.setAttribute('href', url)
        downDom.setAttribute('download', fileName)
        downDom.setAttribute('target', '_blank')
        downDom.click()
    }
}
