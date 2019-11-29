// 商品库列表pageNumber
export const CHANGE_MANAGE_PAGE_NUMBER = 'CHANGE_MANAGE_PAGE_NUMBER'
// 商品审核pageNumber
export const CHANGE_REVIEW_LIST_PAGE_NUMBER = 'CHANGE_REVIEW_LIST_PAGE_NUMBER'
// 获取用户机构名字和code
export const GET_USER_INFO_NAME_AND_CODE = 'GET_USER_INFO_NAME_AND_CODE'
// 公用的三级类目格式 categoryList
export const CATEGORY_LIST = 'CATEGORY_LIST'

export const ATTRIBUTE_TYPE = [
    { label: '全部', value: '' },
    { label: '下拉框', value: '2' },
    { label: '输入框', value: '1' }
]

export const ATTRIBUTE_SET = [
    { label: '全部', value: '' },
    { label: '生效', value: '1' },
    { label: '失效', value: '2' }
]
export const EVENT_LIST = [
    {
        value: '',
        label: '全部'
    }, {
        value: 1,
        label: '待发布'
    }, {
        value: 2,
        label: '预热中'
    }, {
        value: 3,
        label: '进行中'
    }, {
        value: 4,
        label: '已结束'
    }, {
        value: 5,
        label: '已取消'
    }
]