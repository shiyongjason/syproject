<template>
    <div class="search page-body-cont query-cont">
        <div class="search-head">
            <div class="query-cont-row">
                <el-form :model="searchForm" ref="form">
                    <div class="query-cont-col">
                        <div class="query-col-title">订单搜索：</div>
                        <div class="query-col-input">
                            <el-select v-model="searchForm.searchKey" clearable>
                                <el-option label="全部" value=""></el-option>
                                <el-option label="订单号" value="orderNo"></el-option>
                                <el-option label="外部订单号" value="channelOrderNo"></el-option>
                                <el-option label="姓名" value="userName"></el-option>
                                <el-option label="手机号" value="mobile"></el-option>
                            </el-select>
                        </div>
                        <div class="m-l">
                            <el-input v-model="searchForm.searchValue" style="width:250px" clearable :placeholder="getPlaceholderText" :maxlength="inputLength" />
                        </div>
                    </div>
                    <div class="query-cont-col">
                        <div class="query-col-title">下单时间：</div>
                        <div class="query-col-input">
                            <el-date-picker v-model="searchForm.startTime" value-format='yyyy-MM-dd HH:mm:ss' type="datetime" placeholder="开始日期" :picker-options="pickerOptionsStart">
                            </el-date-picker>
                            <span class="ml10 mr10"> --</span>
                            <el-date-picker v-model="searchForm.endTime" value-format='yyyy-MM-dd HH:mm:ss' type="datetime" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="query-cont-col">
                        <div class="query-col-title">渠道名称：</div>
                        <div class="query-col-input">
                            <el-select v-model="searchForm.source" clearable>
                                <el-option label="全部" value=""></el-option>
                                <el-option label="有赞商城" value="1"></el-option>
                                <el-option label="孩子王" value="2"></el-option>
                                <el-option label="考拉买菜" value="3"></el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="query-cont-col">
                        <div class="query-col-input">
                            <el-button type="primary" @click="onSearch">
                                筛选
                            </el-button>
                        </div>
                        <div class="query-col-input">
                            <el-upload
                                class="upload-demo"
                                :show-file-list="false"
                                :action="interfaceUrl + 'service/api/orders/import'"
                                :on-success="isSuccess"
                                auto-upload
                            >
                                <el-button type="primary">
                                    导入外部订单
                                </el-button>
                            </el-upload>
                        </div>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import {interfaceUrl} from '@/api/config'
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
            },
            interfaceUrl: interfaceUrl
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
                disabledDate: time => {
                    let beginDateVal = this.searchForm.endTime
                    if (beginDateVal) {
                        return (
                            time.getTime() > new Date(beginDateVal).getTime()
                        )
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.searchForm.startTime
                    if (beginDateVal) {
                        return (
                            time.getTime() < new Date(beginDateVal).getTime()
                        )
                    }
                }
            }
        }
    },
    methods: {
        onSearch () {
            if (this.searchForm.searchKey) {
                this.$set(this.searchForm, this.searchForm.searchKey, this.searchForm.searchValue)
            } else {
                if (this.searchForm.searchValue) this.searchForm.searchValue = null
            }
            this.$emit('search', this.searchForm)
        },
        isSuccess (response) {
            console.log(response)
            this.$emit('search', this.searchForm)
            // if (response.code !== 200) {
            //     this.$message({
            //         message: '批量导入失败，' + response.message,
            //         type: 'error'
            //     })
            // } else {
            //     this.$message({
            //         message: '批量导入成功！',
            //         type: 'success'
            //     })
            //
            // }
        }
    }
}
</script>

<style lang="scss" scoped>
.m-l{ margin-left:5px}
</style>
