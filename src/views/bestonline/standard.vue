<template>
    <div class="page-body">
        <div class="page-body-cont">
            <div class="table-cont-title">
                <span class="table-title-name">标准评分</span>
                <el-button type="info" @click="newDueFrom" v-if="testList.length<1">
                    新增标准分数项
                </el-button>
            </div>
            <div style="margin-left: 20px" v-if="testList.length<1"><i class="el-icon-warning"></i>请先配置标准分数，若未配置，则默认标准分数为-。</div>
            <div style="margin-left: 20px" v-if="platformLevel"><i class="el-icon-warning"></i>请先配置总分区间，若未配置，则默认平台等级、辅导期、注资方式皆为-。</div>
            <div class="page-box ">
                <table class="table-example el-table el-table--border">
                    <thead>
                        <tr class="tableTitle">
                            <th width="80" class="is-leaf">序号</th>
                            <th width="180" class="is-leaf">分类</th>
                            <th width="180" class="is-leaf">指标</th>
                            <th width="180" class="is-leaf">指标值</th>
                            <th width="180" class="is-leaf">标准分数</th>
                            <th width="180" class="is-leaf">分数区间</th>
                            <th width="180" class="is-leaf">平台等级</th>
                            <th width="180" class="is-leaf">辅导期</th>
                            <th width="180" class="is-leaf">注资方式</th>
                            <th width="200" class="is-leaf">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(item,index) in testList">
                            <template v-for="(sitem) in item.dueStandardScoreVoList">
                                <tr v-for="(titem,tindex) in sitem.dueStandardScoreVoList" :key="titem.total">
                                    <td :rowspan="item.total" v-if="titem.sindex ==0 ">{{index + 1}}</td>
                                    <td :rowspan="item.total" v-if="titem.sindex ==0 ">{{item.classifyName}}</td>
                                    <td :rowspan="item.total" v-if="titem.sindex ==0 ">{{item.indicatorName}}</td>
                                    <td :rowspan="sitem.total" v-if='tindex==0'>{{titem.indicatorType}}{{titem.itemName}}</td>
                                    <td :rowspan="sitem.total" v-if='tindex==0'>{{titem.standardScore}}</td>
                                    <td>{{titem.scoresType}}{{titem.scoresRange}}</td>
                                    <td>{{titem.platformLevel}}</td>
                                    <td>{{titem.coachPeriod}}</td>
                                    <td>{{titem.capitalInjectionWay}}</td>
                                    <td :rowspan="item.total" v-if="titem.sindex ==0 ">
                                        <el-button class="orangeBtn" @click="onEditStand(item)">编辑</el-button>
                                        <el-button class="orangeBtn" @click="ondeleteStandard(item)">删除</el-button>
                                    </td>
                                </tr>
                            </template>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>
        <el-dialog title="标准分数" :visible.sync="dialogVisible" width="880px" center :close-on-click-modal=false>
            <el-form ref="dueform" label-width="80px" v-show="stepSecond">
                <div class="reset">
                    <el-form-item label="分类:">
                        <el-select v-model="classifyId" placeholder="请选择" clearable @change="onChangeTarget()" :disabled="isdisabled">
                            <el-option v-for="item in options" :key="item.selectCode" :label="item.value" :value="item.selectCode">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="target" label="指标:">
                        <HAutocomplete ref="HAutocomplete" :selectArr="targetArr" :selectObj="targetObj" v-if="targetArr" @back-event="backFindTarget" :disabled="isdisabled"></HAutocomplete>
                    </el-form-item>
                </div>
                <div v-for="(item,index) in  dueStandardScoreCreateFormList" :key=index class="indicator">
                    <el-form-item label="指标值:">
                        <el-select v-model="item.indicatorType" placeholder="请选择" clearable>
                            <el-option v-for="item in dueArr" :key="item.label" :label="item.value" :value="item.label">
                            </el-option>
                        </el-select>
                        <span class="line" :span="1" v-if="type === '0'">-</span>
                        <el-input v-model="item.indicatorVal" placeholder="输入指标值" maxlength="25" @keyup.native="onDot(index, $event, 'dueStandardScoreCreateFormList', 'indicatorVal')" v-if="type ==='0'">
                            <template slot="suffix" v-if="unit">{{unit}}</template>
                        </el-input>
                        <span class="line" :span="1" v-if="type === '1'">-</span>
                        <el-select v-model="item.indicatorVal" placeholder="请选择" clearable v-if="type === '1'">
                            <el-option v-for="item in selectList" :key="item.itemValue" :label="item.itemName" :value="item.itemValue">
                            </el-option>
                        </el-select>
                        <span class="line" :span="1">-</span>
                        <el-input v-model="item.standardScore" placeholder="输入标准分数" maxlength="25" @keyup.native="oninput(index, $event, 'dueStandardScoreCreateFormList', 'standardScore')"></el-input>
                        <span class="line" :span="2"><i v-if="index==0" class="el-icon-circle-plus-outline" @click="onAddTarget"></i>
                            <i v-else class="el-icon-remove-outline" @click="onDeleteTarget(index)"></i>
                        </span>
                    </el-form-item>
                </div>
            </el-form>
            <el-form class="standardpoint" label-width="10px" v-show="!stepSecond">
                <div v-for="(sitem,sindex) in dueStandardScoreCreateFormList" :key="sindex">
                    <p>{{sindex+1}}、指标值</p>
                    <template v-for="(item,index) in sitem.dueStandardScoreCreateFormList">
                        <el-form-item :key="index">

                            <el-select v-model="item.scoresType" placeholder="请选择" clearable>
                                <el-option v-for="item in dueArr" :key="item.label" :label="item.value" :value="item.label">
                                </el-option>
                            </el-select>
                            <span class="line" :span="1">-</span>
                            <el-input v-model="item.scoresRange" placeholder="分数" maxlength="25" @keyup.native="onDot2(sindex, index, $event)"></el-input>
                            <span class="line" :span="1">-</span>
                            <el-input v-model="item.platformLevel" placeholder="等级" maxlength="25"></el-input>
                            <span class="line" :span="1">-</span>
                            <el-input v-model="item.coachPeriod" placeholder="辅导期" maxlength="25"></el-input>
                            <span class="line" :span="1">-</span>
                            <el-input v-model="item.capitalInjectionWay" placeholder="注资方式" maxlength="25"></el-input>
                            <span class="line" :span="1">
                                <i v-if="index==0" class="el-icon-circle-plus-outline" @click="onAddStand(sindex)"></i>
                                <i v-else class="el-icon-remove-outline" @click="onDeleteStand(sindex,index)"></i>
                            </span>
                        </el-form-item>
                    </template>
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer" v-show="stepSecond">
                <el-button type="primary" @click="onNext">下一步</el-button>
            </span>
            <span slot="footer" class="dialog-footer" v-show="!stepSecond">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onAddstandardscore">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import HAutocomplete from '@/components/HAutocomplete'
import { getStandardscore, getDueconfig, addStandardscore, updateStandardscore, deleteStandardscore } from './api/index.js'
import { mapState } from 'vuex'
import { deepCopy } from '@/utils/index'
import { plusOrMinus, decimals } from '../../utils/rules.js'
export default {
    data () {
        return {
            dialogVisible: false,
            stepSecond: true,
            type: '0',
            unit: '',
            options: [],
            targetObj: {
                selectName: '',
                selectCode: ''
            },
            dueArr: [
                {
                    value: '==',
                    label: '=='
                },
                {
                    value: '!=',
                    label: '!='
                },
                {
                    value: '<',
                    label: '<'
                },
                {
                    value: '>',
                    label: '>'
                },
                {
                    value: '>=',
                    label: '>='
                },
                {
                    value: '<=',
                    label: '<='
                }, {
                    value: '[x,y]',
                    label: '[x,y]'
                }, {
                    value: '(x,y)',
                    label: '(x,y)'
                }, {
                    value: '(x,y]',
                    label: '(x,y]'
                }, {
                    value: '[x,y)',
                    label: '[x,y)'
                }
            ],
            testList: [],
            classifyId: '',
            createUser: '',
            indicatorId: '',
            dueStandardScoreCreateFormList: [], // 配置层级1
            dueForm: {
                indicatorVal: '', // 指标
                dueStandardScoreCreateFormList: [{
                    capitalInjectionWay: '',
                    coachPeriod: '',
                    platformLevel: '',
                    scoresRange: '',
                    scoresType: ''
                }], // 配置层级2
                indicatorType: '',
                standardScore: ''

            },
            dueclearForm: {
                indicatorVal: '', // 指标
                dueStandardScoreCreateFormList: [{
                    capitalInjectionWay: '',
                    coachPeriod: '',
                    platformLevel: '',
                    scoresRange: '',
                    scoresType: ''
                }], // 配置层级2
                indicatorType: '',
                standardScore: ''

            },
            standObj: {
                capitalInjectionWay: '',
                coachPeriod: '',
                platformLevel: '',
                scoresRange: '',
                scoresType: ''
            },
            standClearForm: {
                capitalInjectionWay: '',
                coachPeriod: '',
                platformLevel: '',
                scoresRange: '',
                scoresType: ''
            },
            targetArr: [],
            scoreType: '',
            selectList: [],
            isdisabled: false,
            platformLevel: false,
            tableLabel: [
                { label: '财务尽调', prop: 'classifyName' },
                { label: '指标', prop: 'indicatorName' },
                { label: '财务尽调', prop: 'classifyName' },
                { label: '财务尽调', prop: 'classifyName' },
                { label: '财务尽调', prop: 'classifyName' },
                { label: '财务尽调', prop: 'classifyName' },
                { label: '财务尽调', prop: 'classifyName' },
                { label: '财务尽调', prop: 'classifyName' }
            ],
            tableData: []
        }
    },
    components: {
        HAutocomplete
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    async mounted () {
        // 获取分类
        this.options = await this.getDulist({ parentId: 0 })
        this.dueStandardScoreCreateFormList.push(this.dueForm)
        this.getStandardscore()
    },
    methods: {
        oninput (i, e, v, d) {
            e.target.value = plusOrMinus(e.target.value.toString())
            this[v][i][d] = e.target.value
        },
        onDot (i, e, v, d) {
            e.target.value = decimals(e.target.value.toString())
            this[v][i][d] = e.target.value
        },
        onDot2 (sindex, index, e) {
            e.target.value = decimals(e.target.value.toString())
            this.dueStandardScoreCreateFormList[sindex].dueStandardScoreCreateFormList[index].scoresRange = e.target.value
        },
        newDueFrom () {
            this.isdisabled = false
            this.stepSecond = true
            this.dialogVisible = true
            this.scoreType = 'new'
            this.$nextTick(() => {
                this.$refs.HAutocomplete.clearInput()
            })
            this.dueStandardScoreCreateFormList = []
            this.dueStandardScoreCreateFormList.push(Object.assign({}, this.dueclearForm))
            this.dueForm.dueStandardScoreCreateFormList = [{
                capitalInjectionWay: '',
                coachPeriod: '',
                platformLevel: '',
                scoresRange: ''
            }]
            // this.dueStandardScoreCreateFormList = JSON.parse(JSON.stringify(this.clearForm))
            // console.log(this.dueStandardScoreCreateFormList)
        },
        onNext () {
            if (!this.classifyId) {
                this.$message({
                    showClose: true,
                    message: '请选择分类',
                    type: 'warning'
                })
                return false
            }
            if (!this.indicatorId) {
                this.$message({
                    showClose: true,
                    message: '请选择指标',
                    type: 'warning'
                })
                return false
            }
            for (let i = 0;i < this.dueStandardScoreCreateFormList.length;i++) {
                if (!this.dueStandardScoreCreateFormList[i].indicatorType || !this.dueStandardScoreCreateFormList[i].indicatorVal || !this.dueStandardScoreCreateFormList[i].standardScore) {
                    this.$message({
                        showClose: true,
                        message: '请选择/输入标准分数',
                        type: 'warning'
                    })
                    return false
                }
                if (this.dueStandardScoreCreateFormList[i].indicatorType === '(x,y)' || this.dueStandardScoreCreateFormList[i].indicatorType === '(x,y]' || this.dueStandardScoreCreateFormList[i].indicatorType === '[x,y)' || this.dueStandardScoreCreateFormList[i].indicatorType === '[x,y]') {
                    // eslint-disable-next-line
                    const regex = /^\d+(\,\d+)$/.test(this.dueStandardScoreCreateFormList[i].indicatorVal)
                    if (!regex) {
                        this.$message({
                            showClose: true,
                            message: '指标值输入应为区间',
                            type: 'warning'
                        })
                        return false
                    }
                } else {
                    // eslint-disable-next-line
                    const regex = /^\d+(\.\d+)?$/.test(this.dueStandardScoreCreateFormList[i].indicatorVal)
                    if (!regex) {
                        this.$message({
                            showClose: true,
                            message: '指标值输入应为数字',
                            type: 'warning'
                        })
                        return false
                    }
                }
            }
            this.stepSecond = !this.stepSecond
            // let { ...obj } = this.standObj
            // this.dueForm.dueStandardScoreCreateFormList.push(JSON.parse(JSON.stringify(this.standObj)))
        },
        async getStandardscore () {
            const { data } = await getStandardscore()
            this.testList = data.data.pageContent
            this.platformLevel = this.testList[0].dueStandardScoreVoList.some((val, index) => {
                return val.dueStandardScoreVoList.some((v, i) => {
                    return !v.platformLevel || !v.coachPeriod || !v.capitalInjectionWay
                })
            })
            console.log(data)
            this.tableData = data.data.pageContent
        },
        async onChangeTarget () {
            this.$refs.HAutocomplete.clearInput()
            this.dueStandardScoreCreateFormList = []
            this.dueStandardScoreCreateFormList.push(Object.assign({}, this.dueclearForm))
            this.dueForm.dueStandardScoreCreateFormList = [{
                capitalInjectionWay: '',
                coachPeriod: '',
                platformLevel: '',
                scoresRange: ''
            }]
            if (this.classifyId) {
                this.targetArr = await this.getDulist({ parentId: this.classifyId })
            }
        },
        async getDulist (newObj) {
            const { data } = await getDueconfig(newObj)
            const options = data.data.pageContent
            return options && options.map(value => {
                return {
                    selectCode: value.classifyId,
                    value: value.classifyName
                }
            })
        },
        async onAddstandardscore () {
            let result = this.dueStandardScoreCreateFormList.every((val, index) => {
                return val.dueStandardScoreCreateFormList.every((v, i) => {
                    return v.scoresRange && v.scoresType
                })
            })
            if (!result) {
                this.$message({
                    showClose: true,
                    message: '请选择指标范围及分数',
                    type: 'warning'
                })
                return false
            }
            let errType
            let result1 = this.dueStandardScoreCreateFormList.every((val, index) => {
                return val.dueStandardScoreCreateFormList.every((v, i) => {
                    if (v.scoresType === '(x,y)' || v.scoresType === '(x,y]' || v.scoresType === '[x,y)' || v.scoresType === '[x,y]') {
                        // eslint-disable-next-line
                        if (!(/^\d+(\,\d+)$/).test(v.scoresRange)) errType = '区间'
                        // eslint-disable-next-line
                        return (/^\d+(\,\d+)$/).test(v.scoresRange)
                    } else {
                        if (!(/^\d+(\.\d+)?$/).test(v.scoresRange)) errType = '数字'
                        return (/^\d+(\.\d+)?$/).test(v.scoresRange)
                    }
                })
            })
            if (!result1) {
                this.$message({
                    showClose: true,
                    message: `指标值输入应为${errType}`,
                    type: 'warning'
                })
                return false
            }
            const formData = {
                classifyId: this.classifyId,
                indicatorId: this.indicatorId,
                dueStandardScoreCreateFormList: this.dueStandardScoreCreateFormList
            }
            if (this.scoreType === 'new') {
                formData.createUser = this.userInfo.name
                await addStandardscore(formData)
                this.$message({
                    showClose: true,
                    message: '新增成功',
                    type: 'success'
                })
            } else {
                formData.updateUser = this.userInfo.name
                await updateStandardscore(formData)
                this.$message({
                    showClose: true,
                    message: '编辑成功',
                    type: 'success'
                })
            }
            this.dialogVisible = false
            this.getStandardscore()
        },
        async backFindTarget (value) {
            this.dueStandardScoreCreateFormList = []
            this.dueStandardScoreCreateFormList.push(Object.assign({}, this.dueclearForm))
            this.dueForm.dueStandardScoreCreateFormList = [{
                capitalInjectionWay: '',
                coachPeriod: '',
                platformLevel: '',
                scoresRange: ''
            }]
            this.indicatorId = value.value.selectCode
            if (this.indicatorId) {
                const { data: newData } = await getDueconfig({ classifyId: this.indicatorId })
                const data = newData.data.pageContent[0]
                this.selectList = data.dueSelectItemVoList
                this.type = data.type
                this.unit = data.unit
            }
        },
        onAddTarget () {
            this.dueStandardScoreCreateFormList.push(JSON.parse(JSON.stringify(this.dueForm)))
        },
        onDeleteTarget (index) {
            this.dueStandardScoreCreateFormList.splice(index, 1)
        },
        onAddStand (index) {
            const arr = this.dueStandardScoreCreateFormList[index].dueStandardScoreCreateFormList
            // this.$set(arr, arr.length, this.standObj)
            arr.push(JSON.parse(JSON.stringify(this.standObj)))
        },
        onDeleteStand (sindex, index) {
            this.dueStandardScoreCreateFormList[sindex].dueStandardScoreCreateFormList.splice(index, 1)
        },
        async  onEditStand (obj) {
            this.isdisabled = true
            const item = deepCopy(obj)
            // const item = JSON.parse(JSON.stringify(obj))
            // 有问题
            this.stepSecond = true
            this.dialogVisible = true
            this.scoreType = 'edit'
            this.classifyId = item.classifyId
            if (this.classifyId) {
                this.targetArr = await this.getDulist({ parentId: this.classifyId })
            }
            this.updateUser = this.userInfo.name
            this.indicatorId = item.indicatorId
            if (this.indicatorId) {
                const { data: newData } = await getDueconfig({ classifyId: this.indicatorId })
                const data = newData.data.pageContent[0]
                this.selectList = data.dueSelectItemVoList
                this.type = data.type
                this.unit = data.unit
            }
            item.dueStandardScoreCreateFormList = item.dueStandardScoreVoList
            item.dueStandardScoreCreateFormList.map(value => {
                value.dueStandardScoreCreateFormList = value.dueStandardScoreVoList
            })
            this.dueStandardScoreCreateFormList = item.dueStandardScoreCreateFormList
            this.targetObj = {
                selectName: item.indicatorName,
                selectCode: item.indicatorId
            }
        },
        ondeleteStandard (item) {
            this.$confirm('确定删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await deleteStandardscore(item.indicatorId)
                this.getStandardscore()
                this.$message({
                    showClose: true,
                    message: '删除成功',
                    type: 'success'
                })
            }).catch(() => { })
        }
    }
}
</script>
<style lang="scss" scoped >
table {
    border-collapse: collapse;
    td {
        text-align: center;
    }
}
.el-table th {
    color: #000000;
    font-size: 12px;
    font-weight: 400;
    text-align: center;
    background: #f2f2f4;
}
.el-select {
    width: 100%;
}
.el-input {
    width: 100%;
}
.el-autocomplete {
    width: 100%;
}
.tableTitle {
    background: #f2f2f4;
}
.line {
    margin: 0 15px;
}
.el-form .el-input:not(:first-child) {
    margin-left: 0px;
}
.el-dialog .el-form .el-form-item {
    margin: 20px 0 !important;
}
.reset {
    .el-form-item {
        .el-select {
            width: 750px;
        }
        .el-input {
            width: 750px;
        }
    }
}
.indicator {
    /deep/ .el-form-item {
        .el-select {
            width: 140px;
            .el-input {
                width: 140px;
            }
        }
        .el-input {
            width: 140px;
        }
    }
}
.standardpoint {
    .el-form-item {
        .el-select {
            width: 120px;
        }
        .el-input {
            width: 120px;
        }
    }
}
</style>
