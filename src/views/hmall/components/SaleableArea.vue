<template>
    <el-cascader class="area-cascader" :append-to-body="false" v-model="salesAreaList" :options="provinceData" :props="provinceProps" @change="onChangeProvince" :disabled='disabled'></el-cascader>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
const keyMap = new Map([
    [0, ['city']],
    [2, ['area']]
])
export default {
    name: 'saleableArea',
    props: {
        areaList: {
            type: Array,
            default: () => {
                return {}
            }
        },
        disabled: {
            type: Boolean
        }
    },
    data () {
        return {
            salesAreaList: [],
            provinceData: [],
            preAreas: [],
            result: [],
            provinceProps: {
                multiple: true,
                checkStrictly: true
            }
        }
    },
    computed: {
        ...mapState({
            provinceOptions: state => state.provinceOptions,
            brandAuthValue: state => state.goodsModules.brandAuthValue,
            userInfo: state => state.userInfo.principal
        }),
        ...mapGetters({
            activityAreaData: 'marketManage/activityAreaData'
        })
    },
    methods: {
        async init () {
            await this.getProvinceOptions()
            this.$emit('update:areaList', this.salesAreaList)
            this.salesAreaList = this.dyadicArrToObjArr(this.salesAreaList)
        },
        onChangeProvince (value) {
            let selectedValue = []
            // 删除的情况不做处理
            if (this.preAreas.length > this.salesAreaList.length) {
                this.preAreas = this.salesAreaList.map(item => item.join('-'))
            } else {
                // 获取本次选中的值
                selectedValue = this.salesAreaList.filter(item => !this.preAreas.includes(item.slice().join('-')))
            }
            selectedValue.forEach(item => {
                const len = item.length
                const strItem = item.slice().join('-')
                const parent = item.slice(0, len - 1).join('-')
                // 如果有子元素被选中，删除父元素
                this.preAreas = this.preAreas.filter(i => {
                    return parent.indexOf(i) == -1
                })
                // 如果该元素是其他元素的父元素，删除其他子元素
                this.preAreas = this.preAreas.filter(i => {
                    return i.indexOf(strItem) == -1
                })
                this.preAreas.push(strItem)
            })
            value = this.preAreas.map(item => item.split('-'))
            // 处理组件删除索引不对应的问题
            const arr = []
            value.map((item, index) => {
                const valueIndex = this.salesAreaList.findIndex(it => JSON.stringify(it) === JSON.stringify(item))
                if (valueIndex >= 0) {
                    arr[valueIndex] = item
                }
            })
            // 去掉数组中empty
            value = arr.filter(d => d)
            this.salesAreaList = value
            this.$emit('formSalesAreaList', this.objArrToDyadicArr(value))
        },
        objArrToDyadicArr (value) {
            const flatProvince = new Map()
            this.resolveAreaInfo(this.provinceData, {}, ['province'], flatProvince)
            return value.map(item => {
                return flatProvince.get(item[item.length - 1])
            })
        },
        /**
         * 拍平整个省市区，并将其存储在map中
         * @param areaData 省市区信息
         * @param parenValue 父元素相关的数据
         * @param keys 不同的层级key值不同
         * @param resultMap 最后存储数据的地方
         */
        resolveAreaInfo (areaData, parenValue, keys, resultMap) {
            areaData.map(item => {
                if (!parenValue) {
                    parenValue = {}
                }
                const keyInfos = keys.reduce((prevObj, key) => {
                    return {
                        ...prevObj,
                        [`${key}Id`]: item.value,
                        [`${key}Name`]: item.label
                    }
                }, {})
                resultMap.set(item.value, { ...parenValue, ...keyInfos })
                if (item.children) {
                    this.resolveAreaInfo(item.children, { ...parenValue, ...keyInfos }, keyMap.get(Object.keys(parenValue).length), resultMap)
                }
            })
        },
        dyadicArrToObjArr (value) {
            const result = []
            value.forEach(item => {
                let thisResult = []
                if (item.provinceId != null && item.provinceId != '0') {
                    thisResult = thisResult.concat([item.provinceId])
                }
                if (item.cityId != null && item.cityId != '0') {
                    thisResult = thisResult.concat(item.cityId)
                }
                result.push(thisResult)
            })
            return result
        },
        async getProvinceOptions () {
            await this.findActivityArea()
            this.provinceData = this.activityAreaData
        },
        ...mapActions({
            findActivityArea: 'marketManage/findActivityArea'
        })
    },
    watch: {
        areaList: {
            immediate: true,
            handler (val) {
                this.salesAreaList = val
            }
        }
    },
    mounted () {
        this.init()
    }
}
</script>
<style lang="scss" scoped>
.area-cascader {
    /deep/ .el-cascader__tags {
        max-height: 100px;
        overflow-y: auto;
    }
    /deep/ .el-cascader {
        max-height: 100px;
    }
    /deep/ .el-input {
        width: 375px;
    }
}
</style>
