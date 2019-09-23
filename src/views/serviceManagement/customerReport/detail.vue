<template>
    <div class="attribute">
        <div class="page-body">
            <div class="page-body-cont query-cont">
                <template v-if="reportType == 1">
                    <h3 class="title">甲醛报告</h3>
                    <el-table :data="params.formaldehyde" border ref="attributeTable" style="width: 80%;margin-left: 20px;" :span-method="arraySpanMethod">
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
                    <div class="detailReport">
                        <div class="pollutant">
                            <h4>主要污染物</h4>
                            <template v-for="(item) in params.pollutionSources">
                                <el-checkbox v-model="item.checked" :key="item.id" :disabled="disabled" border>{{item.name}}</el-checkbox>
                            </template>
                        </div>
                        <div class="suggest">
                            <h4>建议</h4>
                            <template v-for="(item) in params.suggests">
                                <el-checkbox v-model="item.checked" :key="item.id" :disabled="disabled" border>{{item.name}}</el-checkbox>
                            </template>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="all-sided">
                        <h3 class="title">全面检测报告</h3>
                        <table class="table-example el-table el-table--border">
                            <thead>
                                <tr>
                                    <th rowspan="2">类目</th>
                                    <th rowspan="2">序号</th>
                                    <th rowspan="2">项目</th>
                                    <th rowspan="2">标准</th>
                                    <th rowspan="2">取样位置</th>
                                    <th colspan="2">结果</th>
                                </tr>
                                <tr>
                                    <th>检测结果</th>
                                    <th>是否超标</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(item, index) in params.overallProperties">
                                    <tr v-for="(titem, tindex) in item.children" :key="index+ '' + tindex">
                                        <td :rowspan="rowLength" v-if="index == 0 && tindex == 0" width='10px'>环境指标检测</td>
                                        <td :rowspan="item.children.length" v-if="tindex == 0">{{index + 1}}</td>
                                        <td :rowspan="item.children.length" v-if="tindex == 0">{{item.name}}</td>
                                        <template v-if="item.standard">
                                            <td :rowspan="item.children.length" v-if="tindex == 0">{{item.standard}}</td>
                                        </template>
                                        <template v-else>
                                            <td>{{titem.standard}}</td>
                                        </template>
                                        <td>{{titem.name}}</td>
                                        <td>
                                            <textarea v-model="titem.testResult" :disabled="disabled" cols="30" rows="3"></textarea>
                                            <!-- <el-input v-model="titem.testResult" :disabled="disabled"></el-input> -->
                                        </td>
                                        <td>
                                            <el-select v-model="titem.qualified" style="width: 100px" :disabled="disabled">
                                                <el-option label="是" :value="true"></el-option>
                                                <el-option label="否" :value="false"></el-option>
                                            </el-select>
                                        </td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </template>
                <div class="btn" v-if="action == 'edit'">
                    <el-button type="primary" @click="cancle">取消</el-button>
                    <el-button type="primary" @click="updata">保存</el-button>
                </div>
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
            params: {},
            rowLength: ''
        }
    },
    methods: {
        async findReportDetail (id) {
            const { data } = await findReportDetail(id)
            console.log(data)
            this.params = data
            this.reportType = data.reportType
            let nums = 0
            if (data.overallProperties) {
                data.overallProperties.map((item) => {
                    nums += item.children.length
                })
                this.rowLength = nums
            }
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
            if (this.reportType == 2) {
                let params = []
                this.params.overallProperties.map((item) => {
                    params = params.concat(item.children)
                })
                this.params.overallProperties = params
            }
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

<style lang='scss' scoped>
.page-body-cont {
    background-color: #fff;
}
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
    margin-bottom: 10px;
    padding-left: 10px;
    border-left: 5px solid #ff7a45;
}
table {
    border-collapse: collapse;
}
table th,
table td {
    text-align: center;
}
.detailReport {
    margin: 10px 0 0 20px;
    .pollutant {
        width: 80%;
        .el-checkbox {
            margin: 5px !important;
            width: 120px;
        }
    }
    .suggest {
        .el-checkbox {
            margin: 5px !important;
            width: 180px;
        }
    }
}
.all-sided{
    table{
        margin-left: 20px;
    }
}
.btn {
    margin: 10px 0 0 20px;
    padding-bottom: 20px;
}
</style>
