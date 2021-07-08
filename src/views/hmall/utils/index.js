import { Message } from 'element-ui'
// 批量操作
export const batchOperator = (multiSelection, callback) => {
    multiSelection = multiSelection.map(item => {
        return item.id
    })
    if (multiSelection.length < 1) {
        Message.warning('请选择！')
        return false
    } else {
        callback(multiSelection)
    }
}
