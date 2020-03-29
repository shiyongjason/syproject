import axios from 'axios'

// 家庭概况
export function getProject (params) {
    return axios.get('http://192.168.20.176:40601' + `/project/page`, { params })
}
