import axios from 'axios'
// 标签列表、搜索
export const findTagsList = (params) => axios.get('/merchant/api/members/boss/member-shop/page', { params })

// 新增标签
export function createTags (params) {
    return axios.post('/rest', params)
}
// 删除标签
export function deleteTags (params) {
    return axios.delete('/rest', params)
}
