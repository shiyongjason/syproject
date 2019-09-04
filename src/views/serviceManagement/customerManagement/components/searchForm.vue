<template>
    <div class="search">
        <div class="search-head">
            <el-row :gutter="10" class="searchTable">
                <el-form :model="searchForm" :rules="rulesValidate" ref="form" label-width="120px">
                    <el-col :span="6" >
                        <el-form-item label="姓名：" prop="name">
                            <el-input v-model="searchForm.name" clearable maxlength='20' />
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="渠道名称：" prop="channelType">
                            <el-select v-model="searchForm.channelType" clearable style="width: 100%">
                                <el-option v-for="(item,index) in channelType" :key="index" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="客户身份：" prop="role">
                            <el-select v-model="searchForm.role" clearable style="width: 100%">
                                <el-option v-for="(item,index) in role" :key="index" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="手机号：" prop="mobile">
                            <el-input v-model="searchForm.mobile" clearable placeholder="请输入手机号" maxlength='11'/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="创建时间：">
                            <el-date-picker v-model="searchForm.createTimeStart" type="datetime" value-format='yyyy-MM-dd HH:mm:ss' placeholder="开始日期" :picker-options="pickerOptionsStart">
                            </el-date-picker>
                            <span class="ml10 mr10"> --</span>
                            <el-date-picker v-model="searchForm.createTimeEnd" type="datetime" value-format='yyyy-MM-dd HH:mm:ss' placeholder="结束日期" :picker-options="pickerOptionsEnd">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <div class="options">
                            <el-button type="primary" class="ml20" @click="search('form')">
                                搜索
                            </el-button>
                            <el-button type="primary" class="ml20" @click="$emit('add')">
                                新增客户
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
    props: ['value', 'role', 'channelType'],
    data () {
        var validateMobile = (rule, value, callback) => {
            const Reg = /^1\d{10}$/
            if (!value) {
                callback(new Error('请输入手机号码'))
            } else if (Reg.test(value) === false) {
                callback(new Error('手机号码格式不正确'))
            } else {
                callback()
            }
        }
        return {
            rulesValidate: {
                mobile: [{ validator: validateMobile, trigger: 'blur' }]
            }
        }
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
        roles () {
            let temp = Object.values(this.getTypes('role'))
            temp.unshift('全部')
            console.log(temp)
            return temp
        },
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.searchForm.createTimeEnd
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.searchForm.createTimeStart
                    if (beginDateVal) {
                        return time.getTime() < new Date(beginDateVal).getTime()
                    }
                }
            }
        }
    },
    methods: {
        search (formName) {
            if (this.searchForm.mobile) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.$emit('search', this.searchForm)
                    }
                })
            } else {
                this.$emit('search', this.searchForm)
            }
        }
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
</style>