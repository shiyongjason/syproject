<template>
    <div class="search">
        <div class="search-head">
            <el-row :gutter="10" class="searchTable">
                <el-form :model="searchForm" ref="form" label-width="120px">
                    <el-col :span="6" >
                        <el-form-item label="姓名：" prop="name">
                            <el-input v-model="searchForm.name" placeholder="请输入姓名" clearable />
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="渠道名称：" prop="channelType">
                            <el-select v-model="searchForm.channelType" style="width: 100%">
                                <el-option label="有赞商城" value="1"></el-option>
                                <el-option label="孩子王成长家" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="预约状态：" prop="role">
                            <el-select v-model="searchForm.role" style="width: 100%">
                                <el-option label="全部" value="0"></el-option>
                                <el-option label="已预约（未确认）" value="1"></el-option>
                                <el-option label="已预约（已确认）" value="2"></el-option>
                                <el-option label="已完成" value="3"></el-option>
                                <el-option label="取消" value="4"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="预约方式：" prop="mobile">
                            <el-select v-model="searchForm.role" style="width: 100%">
                                <el-option label="全部" value="0"></el-option>
                                <el-option label="公众号预约" value="1"></el-option>
                                <el-option label="电话预约" value="2"></el-option>
                                <el-option label="管家预约" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="手机号：" prop="mobile">
                            <el-input v-model="searchForm.mobile" clearable placeholder="请输入手机号" maxlength='11'/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="订单号：" prop="mobile">
                            <el-input v-model="searchForm.mobile" clearable placeholder="请输入订单号" maxlength='20'/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="预约时间：">
                            <el-date-picker v-model="searchForm.beginCreateTime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="请选择日期" :picker-options="pickerOptionsStart">
                            </el-date-picker>
                            <span class="ml10 mr10">--</span>
                            <el-date-picker v-model="searchForm.endCreateTime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="请选择日期" :picker-options="pickerOptionsEnd">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="1">
                        <div class="options">
                            <el-button type="primary" class="ml20" @click="$emit('search',searchForm)">
                                查询
                            </el-button>
                            <!-- <el-button type="primary" class="ml20" @click="$emit('add')">
                                新增
                            </el-button> -->
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