<template>
    <div class="search">
        <div class="search-head">
            <el-row :gutter="10" class="searchTable">
                <el-form :model="searchForm" ref="form" label-width="120px">
                    <el-col :span="6" >
                        <el-form-item label="姓名：" prop="a">
                            <el-input v-model="searchForm.a" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="渠道名称：" prop="b">
                            <el-select v-model="searchForm.b" style="width: 100%">
                                <el-option label="好享家" value="1"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="客户身份：" prop="c">
                            <el-select v-model="searchForm.c" style="width: 100%">
                                <el-option label="客户" value="1"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="手机号：" prop="a">
                            <el-input v-model="searchForm.a" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="维护时间：">
                            <el-date-picker v-model="searchForm.startDate" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="开始日期" :picker-options="pickerOptionsStart">
                            </el-date-picker>
                            <span class="ml10 mr10">-</span>
                            <el-date-picker v-model="searchForm.endDate" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <div class="options">
                            <el-button type="primary" class="ml20" @click="onSearch()">
                                搜索
                            </el-button>
                            <el-button type="primary" class="ml20" @click="onExport()">
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
    props: ['searchForm'],
    data () {
        return {

        }
    },
    methods: {
        onSearch () {
            console.log(this.searchForm)
        }
    },
    mounted () {

    }
}
</script>

<style lang="scss" scoped>
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