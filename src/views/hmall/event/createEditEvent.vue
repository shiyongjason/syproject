<template>
    <div class="page-body">
        <div class="page-body-cont">
            <div class="forminfo">
                <h2>1.设置活动基本信息</h2>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <div class="query-col-title">活动名称：</div>
                        <div class="query-col-input">
                            <el-input v-model="form.name" placeholder="请输入活动名称" maxlength="255" clearable></el-input>
                        </div>
                    </div>
                </div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <div class="query-col-title">活动时间：</div>
                        <el-date-picker v-model="form.startDate" :clearable=false :editable=false :picker-options="pickerOptionsStart" type="month" format="yyyy-MM" value-format="yyyy-MM-dd" placeholder="开始时间">
                        </el-date-picker>
                        <div class="line ml5 mr5">-</div>
                        <el-date-picker v-model="form.endDate" :editable=false :clearable=false :picker-options="pickerOptionsEnd" type="month" format="yyyy-MM" value-format="yyyy-MM-dd" placeholder="结束时间">
                        </el-date-picker>
                    </div>
                </div>
            </div>
            <div class="forminfo">
                <h2>2.设置规则和优惠</h2>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <div class="query-col-title">优惠方式：</div>
                        <div class="query-col-input">
                            <el-radio v-model="form.radio" label="1">折扣</el-radio>
                            <el-radio v-model="form.radio" label="2">直降（平台补贴）</el-radio>
                        </div>
                    </div>
                </div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <div class="query-col-title">会员限制：</div>
                        <div class="query-col-input">
                            <el-radio v-model="form.radio2" label="1">所有会员</el-radio>
                            <el-radio v-model="form.radio2" label="2">首单会员（第一次购买）</el-radio>
                            <el-radio v-model="form.radio2" label="3">新注册会员</el-radio>
                        </div>
                    </div>
                </div>
            </div>
            <div class="forminfo">
                <h2>3.选择活动商品</h2>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <div class="query-col-title">活动商品：</div>
                        <div class="query-col-input">
                            <el-button type="primary">添加商品</el-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="page-table">
                <!-- table -->
                <hosJoyTable ref="hosjoyTable" border stripe :column="column" :data="tableData" align="center">
                </hosJoyTable>
            </div>
        </div>
    </div>
</template>

<script>
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table'
export default {
    name: 'createEditEvent',
    components: { hosJoyTable },
    data () {
        return {
            form: {
                name: '',
                startDate: '',
                endDate: '',
                radio: '1',
                radio2: '1'
            },
            tableData: [],
            column: []
        }
    },
    computed: {
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = new Date(this.form.endDate)
                    if (beginDateVal) {
                        return time.getTime() > beginDateVal
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = new Date(this.form.startDate)
                    if (beginDateVal) {
                        return time.getTime() < beginDateVal
                    }
                }
            }
        }
    },
    methods: {
        getList () {
            //
        }
    },
    mounted () {}
}
</script>

<style scoped>
.forminfo h2{font-size: 20px; margin:20px 0 15px;}
</style>
