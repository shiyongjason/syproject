<template>
    <div class="autocompleterow">
        <div class="query-cont-col" v-if="region&&showBranch">
            <div class="query-col-title">大区：</div>
            <div class="query-col-input">
                <el-autocomplete ref="autocomplete" :value='choosedItem.regionName' @input="(val)=>{choosedItem['regionName'] = val}" :fetch-suggestions="querySearchAsync" :placeholder="placeholder" :validate-event="true" @blur="(item)=>blurInput('regionDataSync',item)"
                    @focus="(item)=>focusInput('D',item)" :disabled="disabled" :maxlength='maxlength'>
                    <template slot-scope="{ item }">
                        <div class="name" @mousedown="()=>{onMousedown('regionDataSync',item)}">{{ item.value }}</div>
                    </template>
                </el-autocomplete>
            </div>
        </div>
        <div class="query-cont-col" v-if="branch&&showBranch">
            <div class="query-col-title">分部：</div>
            <div class="query-col-input">
                <el-autocomplete ref="autocomplete" :value='choosedItem.branchName' @input="(val)=>{choosedItem['branchName'] = val}" :fetch-suggestions="querySearchAsync" :placeholder="placeholder" :validate-event="true" @blur="(item)=>blurInput('branchDataSync',item)"
                    @focus="(item)=>focusInput('F',item)" :disabled="disabled" :maxlength='maxlength'>
                    <template slot-scope="{ item }">
                        <div class="name" @mousedown="()=>{onMousedown('branchDataSync',item)}">{{ item.value }}</div>
                    </template>
                </el-autocomplete>
            </div>
        </div>
        <div class="query-cont-col" v-if="showPlatCompany">
            <div class="query-col-title">平台公司：</div>
            <div class="query-col-input">
                <el-autocomplete ref="autocomplete" :value='choosedItem.platCompany' @input="(val)=>{choosedItem['platCompany'] = val}" :fetch-suggestions="querySearchAsync" :placeholder="placeholder" :validate-event="true" @blur="(item)=>blurInput('platCompanyDataSync',item)"
                    @focus="(item)=>focusInput('P',item)" :disabled="disabled" :maxlength='maxlength'>
                    <template slot-scope="{ item }">
                        <div class="name" @mousedown="()=>{onMousedown('platCompanyDataSync',item)}">{{ item.value }}</div>
                    </template>
                </el-autocomplete>
            </div>
        </div>
    </div>
</template>
<script>
/** 此组件仅用于大区、分部、平台公司的三级联动。 */
// <hosjoyAutoCompleteRbp showRegion showBranch showPlatCompany :regionData.sync='queryParams.regionCode' :branchData.sync='queryParams.subsectionCode' :platCompanyData.sync='queryParams.misCode'>
import { departmentAuth } from '@/mixins/userAuth'
import { mapState } from 'vuex'
export default {
    name: 'HAutocomplete',
    mixins: [departmentAuth], // 调用以前的权限逻辑。
    props: {
        regionData: { type: String, default: '' },
        branchData: { type: String, default: '' },
        platCompanyData: { type: String, default: '' },
        showRegion: { type: Boolean, default: true }, // 控制显示大区
        showBranch: { type: Boolean, default: true }, // 控制显示分部
        showPlatCompany: { type: Boolean, default: true }, // 控制显示平台公司
        canDoBlurMethos: {// 可保留手输值
            type: Boolean,
            default: true
        },
        placeholder: {
            type: String,
            default: '请输入内容'
        },
        disabled: {
            type: Boolean
        },
        maxlength: {
            type: Number,
            default: 15
        }
    },
    data () {
        return {
            selectItem: '',
            whichInput: 'D',
            choosedItem: {
                regionName: '',
                branchName: '',
                platCompany: ''
            },
            doBlurMethods: true,
            doGetList: true
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            regionList: state => state.regionList,
            branchList: state => state.branchList,
            areaList: state => state.areaList,
            platformData: state => state.platformData
        }),
        // 大区
        regionDataSync: {
            get () {
                return this.regionData
            },
            set (val) {
                this.$emit('update:regionData', val)
            }
        },
        // 分部
        branchDataSync: {
            get () {
                return this.branchData
            },
            set (val) {
                this.$emit('update:branchData', val)
            }
        },
        // 平台公司
        platCompanyDataSync: {
            get () {
                return this.platCompanyData
            },
            set (val) {
                this.$emit('update:platCompanyData', val)
            }
        },
        selectArray () {
            if (this.whichInput === 'D') {
                return this.regionList
            } else if (this.whichInput === 'F') {
                return this.branchList
            } else if (this.whichInput === 'P') {
                return this.platformData
            }
            return []
        }
    },
    watch: {
        regionData: {
            handler (val) {
                console.log('val: ', val)
                if (!val && !this.branchData && !this.platCompanyData) {
                    this.clearInput()
                }
            }
        },
        branchData: {
            handler (val) {
                if (!val && !this.regionData && !this.platCompanyData) {
                    this.clearInput()
                }
            }
        },
        platCompanyData: {
            handler (val) {
                if (!val && !this.regionData && !this.branchData) {
                    this.clearInput()
                }
            }
        },
        regionList: {
            handler (list) {
                // 实现反选
                list && this.regionDataSync && this.showNameByCode(list, 'regionDataSync', 'regionName')
            }
        },
        branchList: {
            handler (list) {
                // 实现反选
                list && this.branchDataSync && this.showNameByCode(list, 'branchDataSync', 'branchName')
            }
        },
        platformData: {
            handler (list) {
                // 实现反选
                list && this.platCompanyDataSync && this.showNameByCode(list, 'platCompanyDataSync', 'platCompany')
            }
        }
    },
    methods: {
        blurInput (key, item) {
            if (!this.doBlurMethods) return
            if (!this.canDoBlurMethos) {
                this[key] = item.target.value
                return false
            }
            const results = this.selectArray && this.selectArray.filter(v => {
                return (v.value === item.target.value)
            })
            if (results.length == 0) {
                if (this.whichInput === 'D') {
                    this.choosedItem.regionName = ''
                    this.choosedItem.branchName = ''
                    this.choosedItem.platCompany = ''
                    this.regionDataSync = ''
                    this.branchDataSync = ''
                    this.platCompanyDataSync = ''
                    // 大区框有数据清空后，重置之前的分部数据
                    // this.doBlurMethods && this.findAuthList({ deptType: 'F', pkDeptDoc: this.userInfo.pkDeptDoc }) // watch会触发
                }
                if (this.whichInput === 'F') {
                    this.platCompanyDataSync = ''
                    this.choosedItem.platCompany = ''
                    this.branchDataSync = ''
                    this.choosedItem.branchName = ''
                    this.doBlurMethods && this.findPlatformslist()
                }
                if (this.whichInput === 'P') {
                    this.choosedItem.platCompany = ''
                    this.platCompanyDataSync = ''// 给父组件赋值
                }
            }
        },
        // mousedown的触发会优先于blur，click的优先级低于blur，会导致触发一次无用请求。
        onMousedown (key, item) {
            if (key === 'platCompanyDataSync') {
                this.platCompanyDataSync = item.misCode// 给父组件赋值
            } else {
                this[key] = item.selectCode// 给父组件赋值
            }
            try {
                this.doBlurMethods = false
                if (this.whichInput === 'D') {
                    // 判断选择的是否和上一次一样,一样则无需再请求
                    if (this.choosedItem.regionName === item.value) return
                    if (this.selectItem != item.value) {
                        this.platCompanyDataSync = ''
                        this.branchDataSync = ''
                        this.choosedItem.branchName = ''
                        this.choosedItem.platCompany = ''
                        this.findAuthList({ deptType: 'F', pkDeptDoc: item.selectCode ? item.selectCode : this.userInfo.pkDeptDoc })
                    }
                }
                if (this.whichInput === 'F') {
                    // 判断选择的是否和上一次一样,一样则无需再请求
                    if (this.choosedItem.branchName === item.value) return
                    if (this.selectItem != item.value) {
                        this.platCompanyDataSync = ''
                        this.choosedItem.platCompany = ''
                    }
                    if (item.selectCode) {
                        this.findPlatformslist({ subsectionCode: item.selectCode })
                    } else {
                        !this.userInfo.deptType && this.findPlatformslist()
                    }
                }
                setTimeout(() => {
                    this.doBlurMethods = true
                }, 1000)
            } catch (error) {
                this.doBlurMethods = true
            }
        },
        showNameByCode (list, key, jey) {
            const res = list.filter(item => {
                return this[key] == (item.misCode || item.pkDeptDoc)
            })
            if (res && res.length > 0) {
                this.choosedItem[jey] = res[0].value
            }
        },
        focusInput (flag, item) {
            if (item) {
                this.selectItem = { value: item.target.value }
            }
            this.whichInput = flag// 标记选中的那个下拉
            if (this.$refs.autocomplete) {
                this.$refs.autocomplete.suggestions = []
            }
        },
        clearInput () { // 重置，无需父组件通过子组件实例获取来触发。当绑定的值为空时会触发。
            this.choosedItem.regionName = ''
            this.choosedItem.branchName = ''
            this.choosedItem.platCompany = ''
            this.regionDataSync = ''
            this.branchDataSync = ''
            this.platCompanyDataSync = ''
            this.newBossAuth(['D', 'F', 'P'])
        },
        querySearchAsync (queryString, callback) {
            let selectList = this.selectArray // 下拉集合
            let results = queryString ? selectList.filter(this.createStateFilter(queryString)) : selectList
            // 以下是一个260毫秒转圈圈的效果，可以避免新数据替换就数据的时候会看到一瞬间的旧数据。
            clearTimeout(this.timeout)
            this.timeout = setTimeout(() => {
                callback(results)
            }, 260)
        },
        createStateFilter (queryString) {
            return (state) => {
                return (state.value && state.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1)
            }
        }
    },
    mounted () {
        this.newBossAuth(['D', 'F', 'P'])
    }
}
</script>

<style lang="scss">
.autocompleterow {
    display: inline-flex;
    margin-right: 24px;
}
</style>
