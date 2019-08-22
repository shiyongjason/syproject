<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-input">
                        <el-input
                            placeholder="请输入岗位名称进行检索"
                            v-model="positionName"
                            style="width: 415px"
                            maxlength="25">
                        </el-input>
                    </div>
                    <el-button type="primary" @click="searchpositionName()">搜索
                    </el-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <div class="table-cont-btn">
                <el-button type="primary" @click="onadd">新增岗位</el-button>
            </div>
            <!--            岗位信息table-->
            <table>
                <thead>
                <tr>
                    <td>序号</td>
                    <td>岗位名称</td>
                    <td>
                        岗位code
                        <el-tooltip effect="dark" content="code：实现岗位与后台数据相匹配" placement="top-start">
                                <img src="../../assets/images/icon_tx_white.png"/>
                        </el-tooltip>
                    </td>
                    <td width="250px">更新时间</td>
                    <td width="250px">操作</td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in postList" :key="index">
                    <td>{{index + 1}}</td>
                    <td>{{item.positionName}}</td>
                    <td>{{item.positionCode}}</td>
                    <td>{{item.updateTime}}</td>
                    <td>
                        <el-button class="orangeBtn" @click="onupdate(item)">修改</el-button>
                        <el-button class="orangeBtn" @click="onDelete(item)">删除</el-button>
                    </td>
                </tr>
                </tbody>
            </table>
            <!--            新增岗位dialog-->
            <el-dialog
                title='新增岗位'
                :visible.sync="adddialogVisible"
                width="500px"
                height="400px"
                center>
                <el-form ref="form" :model="ruleForm" :rules="rules" label-position="right" label-width="150px">
                    <el-form-item
                        label="岗位名称："
                        prop="addpositionName">
                        <el-input
                            placeholder="请输入岗位名称"
                            v-model="ruleForm.addpositionName"
                            maxlength="25">
                        </el-input>
                    </el-form-item>
                    <el-form-item
                        label="岗位code："
                        prop="addpositionCode">
                        <el-input
                            placeholder="请输入岗位code"
                            v-model="ruleForm.addpositionCode"
                            maxlength="25">
                        </el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                        <el-button @click="adddialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addsave">保 存</el-button>
                    </span>
            </el-dialog>
            <!--            修改岗位dialog-->
            <el-dialog
                title="修改岗位"
                :visible.sync="updatedialogVisible"
                width="500px"
                center>
                <el-form ref="form" :model="ruleForm" :rules="rules" label-position="right" label-width="150px">
                    <el-form-item
                        label="岗位名称："
                        prop="updatepositionName">
                        <el-input
                            placeholder="请输入岗位名称"
                            v-model="ruleForm.updatepositionName"
                            maxlength="25">
                        </el-input>
                    </el-form-item>
                    <el-form-item
                        label="岗位code："
                        prop="updatepositionCode">
                        <el-input
                            placeholder="请输入岗位code"
                            v-model="ruleForm.updatepositionCode"
                            maxlength="25">
                        </el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                        <el-button @click="updatedialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="updatesave">保 存</el-button>
                    </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { findList, addList, updateList, deleteList } from './api/index'
import { mapState } from 'vuex'

export default {
    name: 'postset',
    data () {
        return {
            adddialogVisible: false,
            updatedialogVisible: false,
            postList: [],
            positionName: '',
            id: Number,
            ruleForm: {
                addpositionName: '',
                addpositionCode: '',
                updatepositionName: '',
                updatepositionCode: ''
            },
            rules: {
                addpositionName: [
                    { required: true, message: '请输入岗位名称', trigger: 'blur' }
                ],
                addpositionCode: [
                    { required: true, message: '请输入岗位code', trigger: 'blur' }
                ],
                updatepositionName: [
                    { required: true, message: '请输入岗位名称', trigger: 'blur' }
                ],
                updatepositionCode: [
                    { required: true, message: '请输入岗位code', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    methods: {
        // 日期格式转换
        datetimeFormat (longTypeDate) {
            var datetimeType = ''
            var date = new Date()
            date.setTime(longTypeDate)
            let year = date.getFullYear()
            let month = date.getMonth() + 1
            if (month < 10) {
                month = '0' + month
            }
            let day = date.getDate()
            if (day < 10) {
                day = '0' + day
            }
            let hours = date.getHours()
            if (hours < 10) {
                hours = '0' + hours
            }
            let minute = date.getMinutes()
            if (minute < 10) {
                minute = '0' + minute
            }
            let second = date.getSeconds()
            if (second < 10) {
                second = '0' + second
            }
            datetimeType = year + '-' + month + '-' + day + ' ' + hours + ':' + minute + ':' + second// yyyy-MM-dd 00:00:00格式日期
            return datetimeType
        },
        // 查询岗位信息列表
        async findList () {
            const { data } = await findList(this.positionName)
            this.postList = data
            this.postList.map(value => {
                value.updateTime = this.datetimeFormat(value.updateTime)
            })
        },
        // 根据岗位名称搜索
        searchpositionName () {
            this.findList()
        },
        // 新增岗位信息
        onadd () {
            this.adddialogVisible = true
            this.$refs['form'].clearValidate()
        },
        async addsave () {
            this.$refs['form'].validate(async (validate) => {
                if (validate) {
                    const formData = {
                        createUid: this.userInfo.jobNumber,
                        positionName: this.ruleForm.addpositionName,
                        positionCode: this.ruleForm.addpositionCode
                    }
                    await addList(formData)
                    this.findList()
                    this.adddialogVisible = false
                    this.ruleForm.addpositionName = ''
                    this.ruleForm.addpositionCode = ''
                }
            })
        },
        // 修改岗位信息
        onupdate (val) {
            this.ruleForm.updatepositionName = val.positionName
            this.ruleForm.updatepositionCode = val.positionCode
            this.id = val.id
            this.updatedialogVisible = true
            this.$refs['form'].clearValidate()
        },
        async updatesave () {
            this.$refs['form'].validate(async (validate) => {
                if (validate) {
                    const formData = {
                        id: this.id,
                        positionCode: this.ruleForm.updatepositionCode,
                        positionName: this.ruleForm.updatepositionName,
                        updateUid: this.userInfo.jobNumber
                    }
                    await updateList(formData)
                    this.updatedialogVisible = false
                    this.findList()
                }
            })
        },
        // 删除岗位信息
        onDelete (val) {
            this.$confirm(`是否确认删除该公司平台?`, '确认删除', {
                confirmButtonText: '确定删除',
                cancelButtonText: '取消'
            }).then(async () => {
                await deleteList(val.id)
                this.findList()
            }).catch(() => {
                // 取消删除
            })
        }
    },
    mounted () {
        this.findList()
    }
}
</script>

<style lang="scss" scoped>
    table {
        border-collapse: collapse;
        margin-top: 11px;
        width: 100%;
        text-align: center;

        tr {
            line-height: 29px;
            height: 50px;
            border: 1px solid #DDDDDD;

            td {
                border: 1px solid #DDDDDD;
            }
        }
    }

    /deep/ .el-dialog {
        .el-dialog__body {
            min-height: 0px;
        }
    }

    img{
        padding-left: 7px;
        margin-left: -7px;
        width: 12px;
        height: 12px;
        vertical-align: super;
    }
</style>
