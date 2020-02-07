<template>
    <div class="search page-body-cont query-cont">
        <div class="search-head">
            <div class="query-cont-row">
                <el-form :model="searchForm" ref="form">
                    <div class="query-cont-col">
                        <div class="query-col-title">姓名：</div>
                        <div class="query-col-input">
                            <el-input v-model="searchForm.name" placeholder="请输入姓名" clearable maxlength='20' />
                        </div>
                    </div>
                    <div class="query-cont-col">
                        <div class="query-col-title">获客渠道：</div>
                        <div class="query-col-input">
                            <el-select v-model="searchForm.channelType" clearable style="width: 100%">
                                <el-option v-for="(item,index) in channelType" :key="index" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="query-cont-col">
                        <div class="query-col-title">手机号：</div>
                        <div class="query-col-input">
                            <el-input v-model="searchForm.mobile" clearable placeholder="请输入手机号" maxlength='11' />
                        </div>
                    </div>
                    <div class="query-cont-col">
                        <div class="query-col-title">创建时间：</div>
                        <div class="query-col-input">
                            <el-date-picker v-model="searchForm.createTimeStart" type="datetime" value-format='yyyy-MM-dd HH:mm:ss' placeholder="开始日期" :picker-options="pickerOptionsStart">
                            </el-date-picker>
                            <span class="ml10 mr10"> --</span>
                            <el-date-picker v-model="searchForm.createTimeEnd" type="datetime" value-format='yyyy-MM-dd HH:mm:ss' placeholder="结束日期" :picker-options="pickerOptionsEnd">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="query-cont-col">
                        <el-button type="primary" @click="search('form')">
                            搜索
                        </el-button>
                        <!--<el-button type="primary" @click="$emit('add')">-->
                            <!--新增客户-->
                        <!--</el-button>-->
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'searchForm',
    props: ['value', 'channelType'],
    data () {
        return {}
    },
    computed: {
        searchForm: {
            get () {
                return this.value
            },
            set (val) {
                this.$emit('input', val)
            }
        },
        channelTypes () {
            return this.getTypes('channelType')
        },
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.searchForm.createTimeEnd
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
                    let beginDateVal = this.searchForm.createTimeStart
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
        search (formName) {
            if (this.searchForm.mobile) {
                const Reg = /^1\d{10}$/
                if (Reg.test(this.searchForm.mobile) === false) {
                    this.$message.error('手机号码格式不正确')
                } else {
                    this.$emit('search', this.searchForm)
                }
            } else {
                this.$emit('search', this.searchForm)
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
