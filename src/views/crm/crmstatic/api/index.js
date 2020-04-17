import axios from 'axios'

export const getProjectAccount = (params) => axios.get(`/memeber/openapi/project/account`)

export const getProjectStatic = (params) => axios.get(`/memeber/openapi/project/static/${params}`)
