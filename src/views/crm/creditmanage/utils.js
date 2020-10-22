export const handleImgDownload = (url, fileName, ext = '') => {
    let canvas = document.createElement('canvas') // 创建canvas DOM元素
    let ctx = canvas.getContext('2d')
    let img = new Image()
    img.setAttribute('crossOrigin', 'anonymous')
    img.src = url + '?time=' + new Date().valueOf()
    img.onload = function () {
        canvas.height = img.height // 指定画板的高度,自定义
        canvas.width = img.width // 指定画板的宽度，自定义
        ctx.drawImage(img, 0, 0) // 参数可自定义
        let dataURL = canvas.toDataURL('image/' + ext) // 传递的自定义的参数
        canvas = null
        let downDom = document.createElement('a') // 创建DOM元素
        downDom.setAttribute('href', dataURL)
        downDom.setAttribute('download', fileName)
        downDom.click()
    }
}