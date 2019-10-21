import axios from 'axios'
// 标签列表、搜索
export const findTagsList = (params) => axios.get('/service/api/labels/search', { params })

// 新增标签
export function createTags (params) {
    return axios.post('/service/api/labels', params)
}
// 删除标签
export function deleteTags (params) {
    return axios.delete(`/service/api/labels/${params.id}`, { params })
}
