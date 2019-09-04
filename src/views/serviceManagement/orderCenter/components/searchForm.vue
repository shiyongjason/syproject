<template>
    <div class="search">
        <div class="search-head">
            <el-row :gutter="10" class="searchTable">
                <el-form :model="searchForm" ref="form" label-width="120px">
                    <el-col :span="11" >
                        <div class="row-flex">
                            <div>
                                <el-form-item label="订单搜索：" prop="a">
                                    <el-select v-model="searchForm.searchKey" clearable>
                                        <el-option label="全部" value=""></el-option>
                                        <el-option label="订单号" value="orderNo"></el-option>
                                        <el-option label="外部订单号" value="channelOrderNo"></el-option>
                                        <el-option label="姓名" value="userName"></el-option>
                                        <el-option label="手机号" value="mobile"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="m-l">
                                <el-input v-model="searchForm.searchValue" style="width:100%" clearable :placeholder="getPlaceholderText" :maxlength="inputLength" />
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="下单时间：">
                            <el-date-picker v-model="searchForm.startTime" value-format='yyyy-MM-dd HH:mm:ss' type="datetime" placeholder="开始日期" :picker-options="pickerOptionsStart">
                            </el-date-picker>
                            <span class="ml10 mr10"> --</span>
                            <el-date-picker v-model="searchForm.endTime" value-format='yyyy-MM-dd HH:mm:ss' type="datetime" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2">
                        <div class="options">
                            <el-button type="primary" class="ml20" @click="onSearch">
                                筛选
                            </el-button>
                        </div>
                    </el-col>
                </el-form>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    name: 'searchForm',
    props: ['value'],
    data () {
        return {
            type: {
                orderNo: '订单号',
                channelOrderNo: '外部订单号',
                userName: '姓名',
                mobile: '手机号'
            }
        }
    },
    computed: {
        inputLength () {
            if (this.searchForm.searchKey === 'mobile') {
                return '11'
            }
            return ''
        },
        getPlaceholderText () {
            if (this.searchForm.searchKey) {
                return `请输入${this.type[this.searchForm.searchKey]}`
            }
            return '请输入'
        },
        searchForm: {
            get () {
                return this.value
            },
            set (val) {
                this.$emit('input', val)
            }
        },
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.searchForm.endTime
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.searchForm.startTime
                    if (beginDateVal) {
                        return time.getTime() < new Date(beginDateVal).getTime()
                    }
                }
            }
        }
    },
    methods: {
        onSearch () {
            if (this.searchForm.searchKey) {
                this.$set(this.searchForm, this.searchForm.searchKey, this.searchForm.searchValue)
            }
            if (!this.searchForm.searchKey) {
                this.searchForm = {
                    searchKey: ''
                }
            }
            this.$emit('search', this.searchForm)
        }
    },
    mounted () {

    }
}
</script>

<style lang="scss" scoped>
.search{min-width: 1400px}
.searchTable{ width: 1400px;}
.search-head {
    box-shadow: 0px 1px 0px 0px #e5e5ea;
    background: #fafafa;
    padding: 20px 0 10px 0;
    box-sizing: border-box;
}
.el-col {
    margin-bottom: 20px
}
.row-flex{ display: flex}
.m-l{ margin-left: 10px;flex: 0 0 263px;}
</style>