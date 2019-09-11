<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-input">
                        <el-input placeholder="请输入岗位名称进行检索" v-model="positionName" style="width: 415px" maxlength="25">
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
            <basicTable :tableLabel="tableLabel" :tableData="postList" :isAction="true" isShowIndex>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="onupdate(scope.data.row)">修改</el-button>
                    <el-button class="orangeBtn" @click="onDelete(scope.data.row)">删除</el-button>
                </template>
            </basicTable>
            <!--            新增岗位dialog-->
            <el-dialog title='新增岗位' :visible.sync="adddialogVisible" width="500px" height="400px" center>
                <el-form ref="form" :model="ruleForm" :rules="rules" label-position="right" label-width="150px">
                    <el-form-item label="岗位名称：" prop="addpositionName">
                        <el-input placeholder="请输入岗位名称" v-model="ruleForm.addpositionName" maxlength="40">
                        </el-input>
                        <p v-if="count" class="message">岗位名称已存在</p>
                    </el-form-item>
                    <el-form-item label="岗位code：" prop="addpositionCode">
                        <el-input placeholder="请输入岗位code" v-model="ruleForm.addpositionCode" maxlength="40">
                        </el-input>
                        <p v-if="count" class="message">岗位code已存在</p>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="adddialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addsave">保 存</el-button>
                </span>
            </el-dialog>
            <!--            修改岗位dialog-->
            <el-dialog title="修改岗位" :visible.sync="updatedialogVisible" width="500px" center>
                <el-form ref="form" :model="ruleForm" :rules="rules" label-position="right" label-width="150px">
                    <el-form-item label="岗位名称：" prop="updatepositionName">
                        <el-input placeholder="请输入岗位名称" v-model="ruleForm.updatepositionName" maxlength="40">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="岗位code：" prop="updatepositionCode">
                        <el-input placeholder="请输入岗位code" v-model="ruleForm.updatepositionCode" maxlength="40">
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
import { findpostList, addpostList, updatepostList, deletepostList } from './api/index'
import { mapState } from 'vuex'

export default {
    name: 'postset',
    data () {
        return {
            count: 0,
            tableLabel: [
                { label: '岗位名称', prop: 'positionName' },
                { label: '岗位code', prop: 'positionCode', icon: 'el-icon-question', content: 'code：实现岗位与后台数据相匹配' },
                { label: '更新时间', prop: 'updateTime' }
            ],
            postList: [],
            adddialogVisible: false,
            updatedialogVisible: false,
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
            const { data } = await findpostList(this.positionName)
            this.postList = data
            console.log(this.postList)
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
            this.$nextTick(() => {
                this.$refs['form'].clearValidate()
            })
            this.count = 0
        },
        async addsave () {
            this.$refs['form'].validate(async (validate) => {
                if (validate) {
                    await this.postList.map(value => {
                        if (value.positionName === this.ruleForm.addpositionName && value.positionCode === this.ruleForm.addpositionCode) {
                            this.count = 1
                        }
                    })
                    if (!this.count) {
                        const formData = {
                            createUid: this.userInfo.jobNumber,
                            positionName: this.ruleForm.addpositionName,
                            positionCode: this.ruleForm.addpositionCode
                        }
                        await addpostList(formData)
                        this.findList()
                        this.adddialogVisible = false
                        this.ruleForm.addpositionName = ''
                        this.ruleForm.addpositionCode = ''
                    } else {
                    }
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
            this.count = 0
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
                    await updatepostList(formData)
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
                await deletepostList(val.id)
                this.findList()
            }).catch(() => {
                // 取消删除
            })
        },
        renderHeader (h, { column }) {
            console.log(column)
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
        border: 1px solid #dddddd;

        td {
            border: 1px solid #dddddd;
        }
    }
}

/deep/ .el-dialog {
    .el-dialog__body {
        min-height: 0px;
    }
}

img {
    padding-left: 7px;
    margin-left: -7px;
    width: 12px;
    height: 12px;
    vertical-align: super;
}
/deep/ .el-icon-question {
    position: absolute;
    top: 5px;
    margin-left: 5px;
    font-size: 12px;
    color: $grayColor;
}
.message{
    color: #F56C6C;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left: 0;
}
</style>
