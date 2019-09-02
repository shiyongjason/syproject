<template>
    <div class="search">
        <div class="search-head">
            <el-row :gutter="10" class="searchTable">
                <el-form :model="searchForm" ref="form" label-width="120px">
                    <el-col :span="6" >
                        <el-form-item label="姓名：" prop="name">
                            <el-input v-model="searchForm.name" clearable />
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="渠道名称：" prop="channelType">
                            <el-select v-model="searchForm.channelType" style="width: 100%">
                                <el-option label="总部" value="0"></el-option>
                                <el-option label="有赞" value="1"></el-option>
                                <el-option label="孩子王" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="客户身份：" prop="role">
                            <el-select v-model="searchForm.role" style="width: 100%">
                                <el-option label="员工" value="0"></el-option>
                                <el-option label="线下管家" value="1"></el-option>
                                <el-option label="线上管家" value="2"></el-option>
                                <el-option label="客户" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="手机号：" prop="mobile">
                            <el-input v-model="searchForm.mobile" clearable placeholder="请输入手机号" maxlength='11'/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="维护时间：">
                            <el-date-picker v-model="searchForm.beginCreateTime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="开始日期" :picker-options="pickerOptionsStart">
                            </el-date-picker>
                            <span class="ml10 mr10"> --</span>
                            <el-date-picker v-model="searchForm.endCreateTime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <div class="options">
                            <el-button type="primary" class="ml20" @click="$emit('search',searchForm)">
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
    props: ['value'],
    data () {
        return {
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