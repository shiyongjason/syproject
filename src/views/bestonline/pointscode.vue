<template>
    <div class="page-body">
        <div class="page-body-cont">
            <div class="table-cont-btn">
                <el-button type="primary" @click="newDueFrom">
                    新增评分规则
                </el-button>
            </div>
            <table class="table-example" style="width: 100%">
                <thead>
                    <tr class="tableTitle">
                        <td width="180">序号</td>
                        <td width="180">分类</td>
                        <td width="180">指标</td>
                        <td width="180">指标值</td>
                        <td width="180">分数</td>
                        <td width="180">操作</td>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(item,pindex) in testList">
                        <!--  eslint-disable -->
                        <tr v-for="(seconditem,index) in item.dueScoreRuleVoList">
                            <td v-if="index == 0" :rowspan="item.dueScoreRuleVoList.length"> {{pindex+1}}
                            </td>
                            <td v-if="index == 0" :rowspan=" item.dueScoreRuleVoList.length">{{item.classifyName}}</td>
                            <td v-if="index == 0" :rowspan="item.dueScoreRuleVoList.length">{{item.indicatorName}}</td>
                            <td>{{seconditem.indicatorType}}{{seconditem.itemName}}</td>
                            <td>{{seconditem.score}}</td>
                            <td v-if="index == 0" :rowspan="item.dueScoreRuleVoList.length">
                                <el-button class="orangeBtn" @click="onEditScore(item)">编辑</el-button>
                                <el-button class="orangeBtn" @click="SureToDelete(item)">删除</el-button>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
            <el-dialog title="评分规则" :visible.sync="dialogVisible" width="650px" center :close-on-click-modal=false>
                <el-form ref="dueform" label-width="80px">
                    <el-form-item label="分类:">
                        <el-select v-model="dueForm.classifyId" placeholder="请选择" clearable @change="onChangeTarget()" :disabled="isdisabled">
                            <el-option v-for="item in options" :key="item.selectCode" :label="item.value" :value="item.selectCode">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="指标:">
                        <HAutocomplete ref="HAutocomplete" :selectArr="targetArr" :selectObj="targetObj" :disabled="isdisabled" v-if="targetArr" @back-event="backFindTarget"></HAutocomplete>
                    </el-form-item>
                    <div v-for="(item,index) in  dueForm.dueScoreRuleCreateFormList" :key=index class="indicator">
                        <el-form-item label="指标值:">
                            <el-select v-model="item.indicatorType" placeholder="请选择" clearable>
                                <el-option v-for="item in dueArr" :key="item.label" :label="item.value" :value="item.label">
                                </el-option>
                            </el-select>
                            <span class="line">-</span>
                            <el-input v-if="type === 0" v-model="item.indicatorVal" placeholder="输入指标值" maxlength="25" @keyup.native="onDot(index, $event, 'indicatorVal')">
                                <template slot="suffix">{{unit}}</template>
                            </el-input>
                            <el-select v-if="type === 1" v-model="item.indicatorVal" placeholder="选择指标值" clearable>
                                <el-option v-for="item in indicatorArr" :key="item.id" :label="item.itemName" :value="item.itemValue">
                                </el-option>
                            </el-select>
                            <span class="line">-</span>
                            <el-input v-model="item.score" placeholder="输入得分值" maxlength="25" @keyup.native="oninput(index, $event, 'score')"></el-input>
                            <span class="line"><i v-if="index==0" class="el-icon-circle-plus-outline" @click="onAddTarget"></i>
                                <i v-else class="el-icon-remove-outline" @click="onDeleteTarget(index)"></i>
                            </span>
                        </el-form-item>
                    </div>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="onAddscorerule">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import HAutocomplete from '@/components/HAutocomplete'
import { getScorerules, getDueconfig, addScorerules, putScorerules, deleteScorerules } from './api/index.js'
import { mapState } from 'vuex'
import { plusOrMinus, decimals } from '../../utils/rules.js'
export default {
    data () {
        return {
            type: 0,
            indicatorArr: [],
            unit: null,
            dialogVisible: false,
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
            clearForm: {
                classifyId: '', // 分类
                createUser: '', //
                indicatorId: '', // 指标
                dueScoreRuleCreateFormList: [{ indicatorType: '', indicatorVal: '', score: '' }]
            },
            dueForm: {
                classifyId: '', // 分类
                createUser: '', //
                indicatorId: '', // 指标
                dueScoreRuleCreateFormList: []
            },
            itemObj: {
                indicatorType: '',
                indicatorVal: '',
                score: ''
            },
            targetArr: [],
            scoreType: '',
            isdisabled: false
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
    async  mounted () {
        // 获取分类
        this.options = await this.getDueconfig(0)
        // this.dueForm.dueScoreRuleCreateFormList.push(this.itemObj)
        this.$set(this.dueForm.dueScoreRuleCreateFormList, this.dueForm.dueScoreRuleCreateFormList.length, this.itemObj)
        this.getScorerules()
    },
    methods: {
        oninput (v, e, i) {
            e.target.value = plusOrMinus(e.target.value.toString())
            this.dueForm.dueScoreRuleCreateFormList[v][i] = e.target.value
        },
        onDot (v, e, i) {
            e.target.value = decimals(e.target.value.toString())
            this.dueForm.dueScoreRuleCreateFormList[v][i] = e.target.value
        },
        newDueFrom () {
            this.isdisabled = false
            this.type = 0
            this.unit = null
            this.indicatorArr = []
            this.dialogVisible = true
            this.scoreType = 'new'
            this.$nextTick(() => {
                this.$refs.HAutocomplete.clearInput()
            })

            // const clearFrom = Object.assign({}, this.dueForm)
            // this.dueForm = {}
            this.dueForm = JSON.parse(JSON.stringify(this.clearForm))
        },
        async getScorerules () {
            const { data } = await getScorerules({ indicatorName: this.indicatorName })
            console.log(data)
            this.testList = data.data.pageContent
        },
        async onChangeTarget () {
            this.dueForm.indicatorId = ''
            this.dueForm.dueScoreRuleCreateFormList.map((item, index) => {
                item.indicatorVal = ''
                item.indicatorType = ''
                item.score = ''
            })
            this.$refs.HAutocomplete.clearInput()
            if (this.dueForm.classifyId) {
                this.targetArr = await this.getDueconfig(this.dueForm.classifyId)
            }
        },
        async getDueconfig (parentId) {
            const { data } = await getDueconfig({ parentId: parentId })
            const options = data.data.pageContent
            return options && options.map(value => {
                return {
                    selectCode: value.classifyId,
                    value: value.classifyName
                }
            })
        },
        async  onAddscorerule () {
            const formData = {
                classifyId: this.dueForm.classifyId,
                createUser: this.userInfo.name,
                indicatorId: this.dueForm.indicatorId,
                dueScoreRuleCreateFormList: this.dueForm.dueScoreRuleCreateFormList
            }
            if (!this.dueForm.classifyId) {
                this.$message({
                    showClose: true,
                    message: '请选择分类',
                    type: 'warning'
                })
                return false
            }
            if (!this.dueForm.indicatorId) {
                this.$message({
                    showClose: true,
                    message: '请选择指标',
                    type: 'warning'
                })
                return false
            }
            let errType
            let RegResult = formData.dueScoreRuleCreateFormList.every((item, index) => {
                if (item.indicatorType === '(x,y)' || item.indicatorType === '(x,y]' || item.indicatorType === '[x,y)' || item.indicatorType === '[x,y]') {
                    // eslint-disable-next-line
                    if (!(/^\d+(\,\d+)$/).test(item.indicatorVal)) errType = '区间'
                    // eslint-disable-next-line
                    return (/^\d+(\,\d+)$/).test(item.indicatorVal)
                } else {
                    if (!(/^\d+(\.\d+)?$/).test(item.indicatorVal)) errType = '数字'
                    return (/^\d+(\.\d+)?$/).test(item.indicatorVal)
                }
            })
            if (!RegResult) {
                this.$message({
                    showClose: true,
                    message: `指标值输入应为${errType}`,
                    type: 'warning'
                })
                return
            }
            let verifyResult = formData.dueScoreRuleCreateFormList.every((value, index) => {
                return value.indicatorType && value.indicatorVal && value.score
            })
            if (!verifyResult) {
                this.$message({
                    showClose: true,
                    message: '请填写指标值',
                    type: 'warning'
                })
                return
            }
            if (this.scoreType === 'new') {
                await addScorerules(formData)
                this.dialogVisible = false
                this.$message({
                    showClose: true,
                    message: '添加成功',
                    type: 'success'
                })
            } else {
                await putScorerules(this.dueForm)
                this.dialogVisible = false
                this.$message({
                    showClose: true,
                    message: '编辑成功',
                    type: 'success'
                })
            }
            this.getScorerules()
        },
        async backFindTarget (value) {
            this.dueForm.dueScoreRuleCreateFormList.map((item, index) => {
                item.indicatorVal = ''
                item.indicatorType = ''
                item.score = ''
            })
            this.dueForm.indicatorId = value.value.selectCode
            this.judgeTextOrPullDown(this.dueForm.indicatorId)
        },
        onAddTarget () {
            // let { ...itemObj } = this.itemObj
            const newObj = Object.assign({}, this.itemObj)
            this.dueForm.dueScoreRuleCreateFormList.push(newObj)
        },
        onDeleteTarget (index) {
            this.dueForm.dueScoreRuleCreateFormList.splice(index, 1)
        },
        onEditScore (item) {
            // const newObj = Object.assign({}, this.itemObj)
            this.isdisabled = true
            this.judgeTextOrPullDown(item.indicatorId)
            const arr = JSON.stringify(item.dueScoreRuleVoList)
            this.dialogVisible = true
            this.scoreType = 'edit'
            this.dueForm = {
                classifyId: item.classifyId, // 分类
                updateUser: this.userInfo.name, //
                indicatorId: item.indicatorId, // 指标
                dueScoreRuleCreateFormList: JSON.parse(arr)
            }
            this.targetObj = {
                selectName: item.indicatorName,
                selectCode: item.indicatorId
            }
        },
        SureToDelete (val) {
            this.$confirm('确定删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.onDeleteScore(val)
            }).catch(() => { })
        },
        async onDeleteScore (item) {
            await deleteScorerules(item.indicatorId)
            this.getScorerules()
            this.$message({
                showClose: true,
                message: '删除成功',
                type: 'success'
            })
        },
        async judgeTextOrPullDown (classifyId) {
            const { data } = await getDueconfig({ classifyId })
            if (data.data.pageContent.length === 1) {
                this.type = +data.data.pageContent[0].type
                this.unit = data.data.pageContent[0].unit
                if (this.type === 1) {
                    this.indicatorArr = data.data.pageContent[0].dueSelectItemVoList
                    this.indicatorArr.unshift({ id: -1, itemName: '请选择', itemId: '', itemValue: '' })
                }
            }
        }
    }
}
</script>
<style lang="scss" >
table {
    border-collapse: collapse;
    td {
        border: 1px solid #dddddd !important;
        text-align: center;
        line-height: 40px;
        position: relative;
    }
}
.line {
    margin: 0 10px;
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
.indicator {
    .el-form-item {
        .el-select {
            width: 130px;
        }
        .el-input {
            width: 130px;
        }
    }
}
.el-form .el-input:not(:first-child) {
    margin-left: 0px;
}
.el-dialog .el-form .el-form-item {
    margin-bottom: 20px !important;
}
.tableTitle{
    background:#f2f2f4;
}
</style>
