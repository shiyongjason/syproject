import { getB2bUserInfo } from '../common/api'
import { findProductCategory } from '../spumanage/api/index'
export default {
    async getUserInfoMore ({ commit }) {
        const { data } = await getB2bUserInfo({ organizationCode: 'top' })
        const params = {
            organizationCode: data.data.organizationCode,
            organizationName: data.data.organizationName
        }
        commit('GET_USER_INFO_NAME_AND_CODE', params)
    },
    findCategoryList: async ({ commit }) => {
        const { data } = await findProductCategory()
        let productCategoryTemp = []
        productCategoryTemp = data.map((value) => {
            let obj = {
                value: value.id,
                label: value.categoryName,
                children: value.categoryList ? value.categoryList.map(value1 => {
                    let obj1 = {
                        value: value1.id,
                        label: value1.categoryName,
                        children: value1.categoryList ? value1.categoryList.map(value2 => {
                            let obj2 = {
                                value: value2.id,
                                label: value2.categoryName
                            }
                            return obj2
                        }) : null
                    }
                    return obj1
                }) : null
            }
            return obj
        })
        productCategoryTemp.splice(0, 0, {
            value: '',
            label: '全部'
        })
        console.log(1, productCategoryTemp)
        // this.productCategoryList = productCategoryTemp
        commit('CATEGORY_LIST', productCategoryTemp)
    }
}
