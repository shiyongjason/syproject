<template>
    <div class="search page-body-cont query-cont">
        <div class="search-head">
            <div class="query-cont-row">
                <el-form :model="value" ref="form">
                    <div class="query-cont-col">
                        <div class="query-col-title">订单搜索：</div>
                        <div class="query-col-input">
                            <el-select v-model="value.searchKey">
                                <el-option label="订单号" value="orderNo"></el-option>
                                <el-option label="外部订单号" value="channelOrderNo"></el-option>
                                <el-option label="姓名" value="userName"></el-option>
                                <el-option label="手机号" value="mobile"></el-option>
                            </el-select>
                        </div>
                        <div class="m-l">
                            <el-input v-model="value.searchValue" style="width:250px" clearable
                                      :placeholder="getPlaceholderText" :maxlength="inputLength"/>
                        </div>
                    </div>
                    <div class="query-cont-col">
                        <div class="query-col-title">下单时间：</div>
                        <div class="query-col-input">
                            <el-date-picker v-model="value.startTime" value-format='yyyy-MM-dd HH:mm:ss' type="datetime"
                                            placeholder="开始日期" :picker-options="pickerOptionsStart">
                            </el-date-picker>
                            <span class="ml10 mr10"> --</span>
                            <el-date-picker v-model="value.endTime" value-format='yyyy-MM-dd HH:mm:ss' type="datetime"
                                            placeholder="结束日期" :picker-options="pickerOptionsEnd">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="query-cont-col">
                        <div class="query-col-title">渠道名称：</div>
                        <div class="query-col-input">
                            <el-select v-model="value.source" clearable>
                                <el-option label="全部" value=""></el-option>
                                <el-option :label="item.name" :value="item.code" v-for="item in channelType" :key="item.code"></el-option>
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
                            <el-button type="primary" @click="onClear">
                                清空筛选条件
                            </el-button>
                        </div>
                        <div class="query-col-input">
                            <el-upload
                                class="upload-demo"
                                :show-file-list="false"
                                :action="interfaceUrl + 'service/api/orders/import'"
                                :on-success="isSuccess"
                                :on-error="isError"
                                auto-upload
                            >
                                <el-button type="primary">
                                    导入外部订单
                                </el-button>
                            </el-upload>
                        </div>
                        <div class="query-col-input">
                            <el-button type="primary" @click="downloadTemplate">
                                下载模板
                            </el-button>
                        </div>
                    </div>
                </el-form>
            </div>
        </div>
        <el-dialog title="导入错误订单列表" :visible.sync="dialog" :close-on-click-modal="false" :show-close="false" width="1100px">
            <importOrderError></importOrderError>
            <div slot="footer" class="dialog-footer">
                <el-button @click="onCancel">放弃错误重新导入</el-button>
                <el-button type="primary" @click="onSave">重新导入</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { interfaceUrl } from '@/api/config'
import { findChannelDict } from '../../common/dictApi'
import importOrderError from './importOrderError'
export default {
    name: 'searchForm',
    props: ['value'],
    components: {
        importOrderError
    },
    data () {
        return {
            type: {
                orderNo: '订单号',
                channelOrderNo: '外部订单号',
                userName: '姓名',
                mobile: '手机号'
            },
            interfaceUrl: interfaceUrl,
            channelType: [],
            dialog: false
        }
    },
    computed: {
        inputLength () {
            if (this.value.searchKey === 'mobile') {
                return '11'
            }
            return ''
        },
        getPlaceholderText () {
            if (this.value.searchKey) {
                return `请输入${this.type[this.value.searchKey]}`
            }
            return '请输入'
        },
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.value.endTime
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
                    let beginDateVal = this.value.startTime
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
        async findChannelDict () {
            const { data } = await findChannelDict()
            this.channelType = data
        },
        downloadTemplate () {
            console.log(1)
        },
        onClear () {
            this.$emit('onClear')
        },
        onSearch () {
            this.$emit('search')
        },
        isSuccess (response) {
            if (response) {
                this.$alert(`<span style="color: red">警告</span>：</br>${response.split(',').join('</br>')}`, '导入状态', {
                    confirmButtonText: '确定',
                    dangerouslyUseHTMLString: true,
                    showClose: false
                }).then(async () => {
                    this.$emit('search', this.value)
                })
            } else {
                this.$alert('导入成功', '导入状态', {
                    confirmButtonText: '确定',
                    showClose: false
                }).then(async () => {
                    this.$emit('search', this.value)
                })
            }
        },
        isError () {
            this.dialog = true
            //  订单导入字段格式错误，请您检查导入字段格式，重新上传
            // this.$message({
            //     type: 'error',
            //     message: '订单导入字段格式错误，请您检查导入字段格式，重新上传'
            // })
        },
        onCancel () {
            console.log(1)
        },
        onSave () {
            console.log(1)
        }
    },
    mounted () {
        this.findChannelDict()
    }
}
</script>

<style lang="scss" scoped>
    .m-l {
        margin-left: 5px
    }
</style>
