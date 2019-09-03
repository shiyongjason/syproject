<template>
    <div class="search">
        <div class="search-head">
            <el-row :gutter="10" class="searchTable">
                <el-form :model="searchForm" ref="form" label-width="120px">
                    <el-col :span="11" >
                        <div class="row-flex">
                            <div>
                                <el-form-item label="订单搜索：" prop="a">
                                    <el-select v-model="searchForm.a">
                                        <el-option label="订单号" value="1"></el-option>
                                        <el-option label="外部订单号" value="2"></el-option>
                                        <el-option label="收货人姓名" value="3"></el-option>
                                        <el-option label="收货人手机号后四位" value="4"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="m-l">
                                <el-input v-model="searchForm.d" style="width:100%" clearable placeholder="请输入手机号" maxlength='11'/>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="维护时间：">
                            <el-date-picker v-model="searchForm.startDate" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="开始日期" :picker-options="pickerOptionsStart">
                            </el-date-picker>
                            <span class="ml10 mr10"> --</span>
                            <el-date-picker v-model="searchForm.endDate" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2">
                        <div class="options">
                            <el-button type="primary" class="ml20" @click="$emit('search',searchForm)">
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
            searchForm: {
                a: '',
                b: '',
                c: '',
                d: '',
                startDate: '',
                endDate: ''
            }
        }
    },
    computed: {
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.searchForm.endDate
                    if (beginDateVal) {
                        return time.getTime() > beginDateVal
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.searchForm.startDate
                    if (beginDateVal) {
                        return time.getTime() < beginDateVal
                    }
                }
            }
        }
    },
    methods: {
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