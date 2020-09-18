import axios from 'axios'
//

export const findCrmdep = (params) => axios.get(`/uaa/department/general/${params.pkDeptDoc}/${params.deptType}/${params.jobNumber}/${params.authCode}`)
