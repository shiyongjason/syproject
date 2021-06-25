// 计算每个sku后面有多少项
export function getLevels (tree) {
    let level = []
    for (let i = tree.length - 1; i >= 0; i--) {
        if (tree[i + 1] && tree[i + 1].optionValues) {
            level[i] = tree[i + 1].optionValues.length * level[i + 1] || 1
        } else {
            level[i] = 1
        }
    }
    return level
}

/**
 * 笛卡尔积运算
 * @param  {[type]} tree   [description]
 * @param  {Array}  stocks [description]
 * @return {[type]}        [description]
 */
export function flatten (tree, stocks = [], options) {
    let { optionValue = 'id', optionText = 'name' } = options || {}
    let result = []
    let skuLen = 0
    let stockMap = {} // 记录已存在的stock的数据
    const level = getLevels(tree)
    if (tree.length === 0) return result
    tree.forEach(sku => {
        const children = sku.optionValues
        if (!children || children.length === 0) return true
        skuLen = (skuLen || 1) * children.length
    })
    // 根据已有的stocks生成一个map
    stocks.forEach(stock => {
        let { skus, ...attr } = stock
        stockMap[skus.map(item => `${item.k_id}_${item.v_id}`).join('|')] = attr
    })
    for (let i = 0; i < skuLen; i++) {
        let optionValues = []
        let mapKey = []
        tree.forEach((sku, column) => {
            const children = sku.optionValues
            let item = {}
            if (!children || children.length === 0) return true
            if (children.length > 1) {
                let row = parseInt(i / level[column], 10) % children.length
                item = tree[column].optionValues[row]
            } else {
                item = tree[column].optionValues[0]
            }
            if (!sku[optionValue] || !item[optionValue]) return
            mapKey.push(`${sku[optionValue]}_${item[optionValue]}`)
            optionValues.push({
                optionTypeId: sku[optionValue],
                optionTypeName: sku[optionText],
                id: item[optionValue],
                name: item[optionText]
            })
        })
        let { ...data } = stockMap[mapKey.join('|')] || {}
        // 从map中找出存在的sku并保留其值
        result.push({ ...data, optionValues })
    }
    return result
}

// /**
//  * 判断两个sku是否相同
//  * @param  {[type]}  prevSKU [description]
//  * @param  {[type]}  nextSKU [description]
//  * @return {Boolean}         [description]
//  */
// export function isEqual (prevSKU, nextSKU, options) {
//     let { optionValue = 'id' } = options || {}
//     return (
//         nextSKU.length === prevSKU.length &&
//         nextSKU.every(({ optionValues = [] }, index) => {
//             let prevLeaf = prevSKU[index].optionValues || []
//             return (
//                 prevSKU[index][optionValue] === nextSKU[index][optionValue] &&
//                 optionValues.length === prevLeaf.length &&
//                 optionValues.map(item => item[optionValue]).join(',') ===
//                 prevLeaf.map(item => item[optionValue]).join(',')
//             )
//         })
//     )
// }

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr (arr) {
    return Array.from(new Set(arr))
}

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @returns {Array}
 */
export function diffArary (arr1, arr2) {
    arr1 = uniqueArr(arr1)
    arr2 = uniqueArr(arr2)
    return arr1.concat(arr2).filter(arg => !(arr1.includes(arg) && arr2.includes(arg)))
}
