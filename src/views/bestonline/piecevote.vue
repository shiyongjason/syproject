<template>
    <div class="page-body">
        <div class="page-body-cont">
            <div class="page-header">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>尽调管理</el-breadcrumb-item>
                    <el-breadcrumb-item>一项否决</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <!-- <div class="page-wrap ">
                <div class="flex-wrap-row">
                    <div class="flex-wrap-box">
                        <div class="flex-wrap-title">指标：</div>
                        <div class="flex-wrap-cont">
                            <el-input
                                placeholder="请输入指标"
                                v-model="indicatorName"
                                maxlength="25"
                            >
                            </el-input>
                        </div>
                    </div>
                    <div class="flex-wrap-box">
                        <div class="flex-wrap-cont pl20">
                            <el-button
                                type="primary"
                                @click="getoneticketveto()"
                            >搜索</el-button>
                        </div>
                    </div>
                </div>
            </div> -->
            <div class="flex-wrap-row pt10">
                <div class="flex-wrap-box">
                    <div class="flex-wrap-cont">
                        <el-button
                            type="primary"
                            class="ml20"
                            @click="newDueFrom"
                        >
                            新增一票否决
                        </el-button>
                    </div>
                </div>
            </div>
            <div class="page-box">
                <div class="page-table">
                    <el-table
                        :data="testList"
                        style="width: 100%"
                        border
                    >
                        <el-table-column
                            type="index"
                            label="序号"
                            width="120"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="classifyName"
                            label="分类"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="indicatorName"
                            label="指标"
                        >
                        </el-table-column>
                        <el-table-column label="指标值">
                            <template slot-scope="scope">
                                {{scope.row.indicatorType}}{{scope.row.itemName}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="proposedPlan"
                            label="建议方案"
                        >
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <span
                                    class="pointer blue mr20"
                                    @click="updateDue(scope.row)"
                                >
                                    编辑
                                </span>
                                <span
                                    class="pointer blue mr20"
                                    @click="SureToDelete(scope.row)"
                                >
                                    删除
                                </span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <el-dialog
            title="配置"
            :visible.sync="dialogVisible"
            width="650px"
            center
             :close-on-click-modal=false
        >
            <el-form
                ref="dueform"
                :model="dueForm"
                label-width="80px"
            >
                <div class="flex-wrap-row">
                    <div class="flex-wrap-box">
                        <div class="flex-wrap-title">分类：</div>
                        <div class="flex-wrap-cont">
                            <el-select
                                v-model="dueForm.classifyId"
                                placeholder="请选择"
                                clearable
                                @change="changeTarget()"
                                :disabled="isdisabled"
                            >
                                <el-option
                                    v-for="item in options"
                                    :key="item.selectCode"
                                    :label="item.value"
                                    :value="item.selectCode"
                                >
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
                <div class="flex-wrap-row ">
                    <div class="flex-wrap-box">
                        <div class="flex-wrap-title">指标：</div>
                        <div class="flex-wrap-cont">
                            <HAutocomplete
                                ref="HAutocomplete"
                                :selectArr="targetArr"
                                 :selectObj="targetObj"
                                v-if="targetArr"
                                @back-event="backFindTarget"
                                :disabled="isdisabled"
                            ></HAutocomplete>
                        </div>
                    </div>
                </div>
                <div class="flex-wrap-row due-wrap">
                    <div class="flex-wrap-box">
                        <div class="flex-wrap-title">指标值：</div>
                        <div class="flex-wrap-cont ">
                            <el-select
                                v-model="dueForm.indicatorType"
                                placeholder="请选择"
                                clearable
                            >
                                <el-option
                                    v-for="item in dueArr"
                                    :key="item.label"
                                    :label="item.value"
                                    :value="item.label"
                                >
                                </el-option>
                            </el-select>
                        </div>
                        <div class="flex-wrap-cont">
                            <el-input
                                v-if="type === 0"
                                v-model="dueForm.indicatorVal"
                                placeholder="输入指标值"
                                maxlength="25"
                                @keyup.native="onDot"
                            >
                                <template slot="suffix">{{unit}}</template>
                            </el-input>
                            <el-select
                                v-if="type === 1"
                                v-model="dueForm.indicatorVal"
                                placeholder="选择指标值"
                                clearable
                            >
                                <el-option
                                    v-for="item in indicatorArr"
                                    :key="item.id"
                                    :label="item.itemName"
                                    :value="item.itemValue"
                                >
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
                <div class="flex-wrap-row">
                    <div class="flex-wrap-box">
                        <div class="flex-wrap-title">建议方案：</div>
                        <div class="flex-wrap-cont">
                            <el-input
                                v-model="dueForm.proposedPlan"
                                placeholder="请输入内容"
                                maxlength="25"
                            ></el-input>
                        </div>
                    </div>
                </div>
            </el-form>
            <span
                slot="footer"
                class="dialog-footer"
            >
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button
                    type="primary"
                    @click="addOnedue"
                >确 定</el-button>
            </span>
        </el-dialog>
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
            // console.log(data)
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
            if (!this.dueForm.indicatorType || !this.dueForm.indicatorVal || !this.dueForm.proposedPlan) {
                this.$message({
                    showClose: true,
                    message: '请填写指标值及建议方案',
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
            }).catch(() => {})
        },
        async deleteDue (val) {
            await deleteoneticketveto(val.id)
            this.getoneticketveto()
            this.$message({
                showClose: true,
                message: '删除成功',
                type: 'success',
                onClose: () => {

                }
            })
        },
        async updateDue (item) {
            this.isdisabled = true
            this.judgeTextOrPullDown(item.indicatorId)
            this.targetArr = await this.getDueconfig(item.classifyId)
            this.dialogVisible = true
            this.dueForm = {
                classifyId: item.classifyId,
                indicatorId: item.indicatorId,
                indicatorVal: item.indicatorVal,
                indicatorType: item.indicatorType,
                proposedPlan: item.proposedPlan
            }
            this.targetObj = {
                selectName: item.indicatorName,
                selectCode: item.indicatorId
            }
            this.id = item.id
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
<style lang="scss" >
.due-wrap {
    .flex-wrap-cont {
        width: 433px !important;
    }
}
.flex-wrap-box{
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
.el-select {
    width: 100%;
}
</style>
