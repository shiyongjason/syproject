<template>
    <div class="page-body">
        <div class="page-body-cont">
            <div class="table-cont-btn">
                <el-button type="primary" @click="newDueFrom">
                    新增一票否决
                </el-button>
            </div>
            <basicTable :tableLabel="tableLabel" :tableData="tableData" :isAction="true" :isShowIndex='true'>
                <template slot="indicatorType" slot-scope="scope">
                    <span>{{scope.data.row.indicatorType+scope.data.row.itemName}}</span>
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="onUpdate(scope.data.row)">编辑</el-button>
                    <el-button class="orangeBtn" @click="onDelete(scope.data.row.id)">删除</el-button>
                </template>
            </basicTable>
            <el-dialog title="配置" :visible.sync="dialogVisible" width="650px" center :close-on-click-modal=false>
                <el-form ref="dueform" :model="dueForm" label-width="80px">
                    <el-form-item label="分类:">
                        <el-select v-model="dueForm.classifyId" placeholder="请选择" clearable @change="changeTarget()" :disabled="isdisabled">
                            <el-option v-for="item in options" :key="item.selectCode" :label="item.value" :value="item.selectCode">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="指标:">
                        <HAutocomplete ref="HAutocomplete" :selectArr="targetArr" :selectObj="targetObj" v-if="targetArr" @back-event="backFindTarget" :disabled="isdisabled"></HAutocomplete>
                    </el-form-item>
                    <el-form-item label="指标值:">
                        <el-select v-model="dueForm.indicatorType" placeholder="请选择" clearable>
                            <el-option v-for="item in dueArr" :key="item.label" :label="item.value" :value="item.label">
                            </el-option>
                        </el-select>
                        <el-input v-if="type === 0" v-model="dueForm.indicatorVal" placeholder="输入指标值" maxlength="25" @keyup.native="onDot">
                            <template slot="suffix">{{unit}}</template>
                        </el-input>
                        <el-select v-if="type === 1" v-model="dueForm.indicatorVal" placeholder="选择指标值" clearable>
                            <el-option v-for="item in indicatorArr" :key="item.id" :label="item.itemName" :value="item.itemValue">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="建议方案:">
                        <el-input v-model="dueForm.proposedPlan" placeholder="请输入内容" maxlength="25"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addOnedue">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import HAutocomplete from '@/components/HAutocomplete'
import { getoneticketveto, getDueconfig, addoneticketveto, deleteoneticketveto, updateoneticketveto } from './api/index.js'
import { mapState } from 'vuex'
import { decimals } from '../../utils/rules'
export default {
    data () {
        return {
            type: 0,
            indicatorArr: [],
            unit: null,
            dialogVisible: false,
            duetype: '',
            targetObj: {
                selectName: '',
                selectCode: ''
            },
            classifyId: '',
            indicatorName: '',
            id: '',
            options: [],
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
            dueForm: {
                indicatorVal: '',
                indicatorType: '',
                proposedPlan: '',
                indicatorId: '', // 返回的指标id
                classifyId: '' // 分类ID
            },
            clearForm: {
                indicatorVal: '',
                indicatorType: '',
                proposedPlan: '',
                indicatorId: '', // 返回的指标id
                classifyId: '' // 分类ID
            },
            targetArr: [],
            isdisabled: false,
            tableLabel: [
                { label: '分类', prop: 'classifyName' },
                { label: '指标', prop: 'indicatorName' },
                { label: '指标值', prop: 'indicatorType' },
                { label: '建议方案', prop: 'proposedPlan' }
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
        this.getoneticketveto()
        this.options = await this.getDueconfig(0)
    },
    methods: {
        onDot (e) {
            e.target.value = decimals(e.target.value.toString())
            this.dueForm.indicatorVal = e.target.value
        },
        newDueFrom () {
            this.isdisabled = false
            this.type = 0
            this.unit = null
            this.indicatorArr = []
            this.dialogVisible = true
            this.duetype = 'new'
            this.$nextTick(() => {
                this.$refs.HAutocomplete.clearInput()
            })

            // const clearFrom = Object.assign({}, this.dueForm)
            // this.dueForm = {}
            this.dueForm = JSON.parse(JSON.stringify(this.clearForm))
        },
        async getoneticketveto () {
            const { data } = await getoneticketveto({ indicatorName: this.indicatorName })
            this.testList = data.data.pageContent
            console.log(data)
            this.tableData = data.data.pageContent
        },
        async changeTarget () {
            this.dueForm.indicatorVal = ''
            this.dueForm.indicatorId = ''
            this.dueForm.indicatorType = ''
            this.dueForm.proposedPlan = ''
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
        async  addOnedue () {
            const formData = {
                classifyId: this.dueForm.classifyId,
                // createUser: this.userInfo.name,
                indicatorId: this.dueForm.indicatorId,
                indicatorType: this.dueForm.indicatorType,
                indicatorVal: this.dueForm.indicatorVal,
                proposedPlan: this.dueForm.proposedPlan,
                updateUser: this.userInfo.name
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
            if (!this.dueForm.indicatorType || !this.dueForm.indicatorVal) {
                this.$message({
                    showClose: true,
                    message: '请填写指标值',
                    type: 'warning'
                })
                return false
            }
            if (!this.dueForm.proposedPlan) {
                this.$message({
                    showClose: true,
                    message: '请填写建议方案',
                    type: 'warning'
                })
                return false
            }
            if (this.dueForm.indicatorType === '(x,y)' || this.dueForm.indicatorType === '(x,y]' || this.dueForm.indicatorType === '[x,y)' || this.dueForm.indicatorType === '[x,y]') {
                // eslint-disable-next-line
                const regex = /^\d+(\,\d+)$/.test(this.dueForm.indicatorVal)
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
                const regex = /^\d+(\.\d+)?$/.test(this.dueForm.indicatorVal)
                if (!regex) {
                    this.$message({
                        showClose: true,
                        message: '指标值输入应为数字',
                        type: 'warning'
                    })
                    return false
                }
            }
            if (this.duetype === 'new') {
                formData.createUser = this.userInfo.name
                await addoneticketveto(formData)
                this.getoneticketveto()
                this.$message({
                    showClose: true,
                    message: '添加成功',
                    type: 'success'
                })
            } else {
                formData.id = this.id
                await updateoneticketveto(formData)
                this.getoneticketveto()
                this.$message({
                    showClose: true,
                    message: '编辑成功',
                    type: 'success'
                })
            }
            this.dialogVisible = false
        },
        SureToDelete (val) {
            this.$confirm('确定删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteDue(val)
            }).catch(() => { })
        },
        async onDelete (id) {
            await deleteoneticketveto(id)
            this.getoneticketveto()
            this.$message({
                showClose: true,
                message: '删除成功',
                type: 'success',
                onClose: () => {

                }
            })
        },
        async onUpdate (row) {
            this.isdisabled = true
            this.judgeTextOrPullDown(row.indicatorId)
            this.targetArr = await this.getDueconfig(row.classifyId)
            this.dialogVisible = true
            this.dueForm = {
                classifyId: row.classifyId,
                indicatorId: row.indicatorId,
                indicatorVal: row.indicatorVal,
                indicatorType: row.indicatorType,
                proposedPlan: row.proposedPlan
            }
            this.targetObj = {
                selectName: row.indicatorName,
                selectCode: row.indicatorId
            }
            this.id = row.id
            this.duetype = 'update'
        },
        backFindTarget (value) {
            this.dueForm.indicatorVal = ''
            this.dueForm.indicatorType = ''
            this.dueForm.proposedPlan = ''
            this.dueForm.indicatorId = value.value.selectCode
            this.judgeTextOrPullDown(this.dueForm.indicatorId)
        },
        async judgeTextOrPullDown (classifyId) {
            const { data } = await getDueconfig({ classifyId })
            if (data.data.pageContent.length === 1) {
                console.log(data)
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
<style lang="scss" scoped>
.due-wrap {
    .flex-wrap-cont {
        width: 433px !important;
    }
}
.flex-wrap-box {
    margin-bottom: 22px !important;
}
.flex-wrap-cont {
    .el-autocomplete {
        width: 100%;
    }
}
.el-input__suffix {
    line-height: 40px;
}
.flex-wrap-box {
    width: 100%;
}
</style>
