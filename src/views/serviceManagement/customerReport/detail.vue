<template>
    <div class="attribute">
        <div class="page-body">
            <div class="page-body-cont query-cont">
                <template v-if="reportType == 1">
                    <div class="title">甲醛报告</div>
                    <el-table :data="params.formaldehyde" border ref="attributeTable" style="width: 80%" :span-method="arraySpanMethod">
                        <el-table-column type="index" label="采样点" align="center" width="60">
                            <template slot-scope="scope">
                                {{scope.$index+1}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="location" label="位置" align="center">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.location" :disabled="disabled"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="roomTemperature" label="室温℃" align="center">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.roomTemperature" :disabled="disabled"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="standardCondition" label="标况L" align="center">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.standardCondition" :disabled="disabled"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="measuredValue" label="测定值" align="center">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.measuredValue" :disabled="disabled"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="formaldehydeConcentration" label="甲醛浓度" align="center">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.formaldehydeConcentration" :disabled="disabled"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="标准限值" align="center">
                            <template>
                                ≤0.1mg/m³<br>轻度污染 0.1~0.2mg/m³<br>中度污染 0.2~0.5mg/m³<br>重度污染 ＞0.5mg/m³
                            </template>
                        </el-table-column>
                        <el-table-column prop="qualified" label="检测结果" align="center">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.qualified" style="width: 100px" :disabled="disabled">
                                    <el-option label="合格" :value="true"></el-option>
                                    <el-option label="不合格" :value="false"></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                    </el-table>
                    <p>主要污染物</p>
                    <template v-for="(item) in params.pollutionSources">
                        <el-checkbox v-model="item.checked" :key="item.id" :disabled="disabled">{{item.name}}</el-checkbox>
                    </template>
                    <p>建议</p>
                    <template v-for="(item) in params.suggests">
                        <el-checkbox v-model="item.checked" :key="item.id" :disabled="disabled">{{item.name}}</el-checkbox>
                    </template>
                    <div class="btn" v-if="action == 'edit'">
                        <el-button type="primary" @click="cancle">取消</el-button>
                        <el-button type="primary" @click="updata">修改</el-button>
                    </div>
                </template>
                <template v-else>
                    <div class="title">全面检测报告</div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import { findReportDetail, updataReportDetail } from './api/index'
import {
    Message
} from 'element-ui'
export default {
    name: 'customerReportDetail',
    data () {
        return {
            id: '',
            action: '',
            reportType: '',
            disabled: true,
            params: {}
        }
    },
    methods: {
        async findReportDetail (id) {
            const { data } = await findReportDetail(id)
            console.log(data)
            this.params = data
            this.reportType = data.reportType
        },
        arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 6) {
                if (rowIndex == 0) {
                    return [3, 1]
                } else {
                    return [0, 0]
                }
            }
        },
        cancle () {
            this.$router.push('customerReport')
        },
        async updata () {
            console.log(this.params)
            const { data } = await updataReportDetail(this.params)
            console.log(data)
            Message({ message: '修改成功', type: 'success' })
            this.$router.push('customerReport')
        }
    },
    async mounted () {
        this.id = this.$route.query.id
        this.action = this.$route.query.action
        this.findReportDetail(this.id)
        if (this.action == 'edit') {
            this.disabled = false
        } else {
            this.disabled = true
        }
    }
}
</script>

<style scoped>
.form-add-remove {
    font-size: 22px;
    color: #ff9c31;
    cursor: pointer;
    line-height: 40px;
    vertical-align: top;
}
.flex-wrap-row {
    max-width: 1350px;
}
.title {
    font-size: 18px;
    font-weight: 500;
}
.btn {
}
</style>
