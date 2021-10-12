<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-input">
                        <el-input placeholder="请输入岗位名称进行检索" v-model="positionName" style="width: 415px" maxlength="25">
                        </el-input>
                    </div>
                    <el-button type="primary" @click="findList()">查询
                    </el-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <div class="table-cont-btn">
                <el-button type="primary" @click="onadd">新增岗位</el-button>
            </div>
            <!--岗位信息table-->
            <basicTable :tableLabel="tableLabel" :tableData="postList" :isAction="true" :actionMinWidth="300" isShowIndex>
                <template slot="action" slot-scope="scope">
                    <el-button v-if="scope.data.row.admin" class="orangeBtn" @click="onOperate(scope.data.row, 1)">配置人员</el-button>
                    <el-button class="orangeBtn" v-if="hosAuthCheck(Auths.AUTH_POSTSET_COPY)" @click="onOperate(scope.data.row, 2)">复制</el-button>
                    <el-button class="orangeBtn" v-if="hosAuthCheck(Auths.AUTH_POSTSET_UPDATE)" @click="onOperate(scope.data.row, 3)">修改</el-button>
                    <el-button class="orangeBtn" v-if="hosAuthCheck(Auths.AUTH_POSTSET_DELETE)" @click="onOperate(scope.data.row, 4)">删除</el-button>
                </template>
            </basicTable>
            <!-- 岗位配置人员 -->
            <el-dialog title="配置岗位人员" :visible.sync="postdialogVisible" width="500px" center>
                <el-form ref="form" :model="ruleForm" :rules="rules" label-position="right" label-width="150px">
                    <el-form-item label="岗位名称：">
                        <span>好橙工产品经理</span>
                    </el-form-item>
                    <el-form-item label="岗位人员：" prop="postPeople">
                        <employeeSelect v-model="ruleForm.postPeople" ref="postPersonRef" :postOptions="postOptions"></employeeSelect>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="onCancel">取 消</el-button>
                    <el-button type="primary" @click="updatesave">保 存</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { findpostList, postSave, deletepostList, postConfiguration } from './api/index'
import employeeSelect from './components/employeeSelect.vue'
import * as Auths from '@/utils/auth_const'
import { mapState } from 'vuex'
export default {
    name: 'postset',
    data () {
        return {
            Auths,
            tableLabel: [
                { label: '岗位名称', prop: 'positionName' },
                { label: '岗位code', prop: 'positionCode', icon: 'el-icon-question', content: 'code：实现岗位与后台数据相匹配' },
                { label: '岗位人员', prop: 'userName', icon: 'el-icon-question' },
                { label: '创建时间', prop: 'createTime' },
                { label: '更新时间', prop: 'updateTime' },
                { label: '操作人', prop: 'updateBy' }
            ],
            postList: [],
            postdialogVisible: false,
            positionName: '',
            id: Number,
            ruleForm: {
                postPeople: []
            },
            rules: {
                postPeople: [
                    { required: true, message: '请选择岗位人员', trigger: 'change' }
                ]
            },
            positionCode: '',
            postOptions: []
        }
    },
    components: {
        employeeSelect
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    methods: {
        // 查询岗位信息列表
        async findList () {
            const { data } = await findpostList(this.positionName)
            if (data.length > 0) {
                data.forEach(v => {
                    v.createTime = v.createTime && v.createTime.replace('T', ' ')
                    v.updateTime = v.updateTime && v.updateTime.replace('T', ' ')
                })
            }
            this.postList = data
        },
        // 新增岗位信息
        onadd () {
            this.$router.push({
                path: '/auth/postUpdate',
                query: {
                    type: 1
                }
            })
        },
        /**
         * @description: 列表操作
         * @param {type} 1 配置人员 2 修改 3 复制 4 删除
         */
        async onOperate (val, type) {
            switch (type) {
                case 1:
                    //  配置人员
                    this.postdialogVisible = true
                    this.positionCode = val.positionCode
                    const { data } = await postConfiguration(val.positionCode)
                    this.postOptions = []
                    this.ruleForm.postPeople = []
                    if (data && data.length > 0) {
                        this.postOptions = data.map(v => {
                            return {
                                psncode: v.jobNumber,
                                psnname: v.userName
                            }
                        })
                        this.ruleForm.postPeople = data.map(v => v.jobNumber)
                    }
                    break
                case 2:
                    // 修改
                    this.$router.push({
                        path: '/auth/postUpdate',
                        query: {
                            type: type,
                            id: val.id
                        }
                    })
                    break
                case 3:
                    // 复制
                    this.$router.push({
                        path: '/auth/postUpdate',
                        query: {
                            type: type,
                            id: val.id
                        }
                    })
                    break
                case 4:
                    // 删除
                    let text = ''
                    if (val.userName) {
                        text = `删除该岗位将影响 [ ${val.userName} ] 的权限，是否确认删除该岗位?`
                    } else {
                        text = '是否确认删除改岗位？'
                    }
                    this.$confirm(text, '确认删除', {
                        confirmButtonText: '确定删除',
                        cancelButtonText: '取消'
                    }).then(async () => {
                        await deletepostList(val.id)
                        this.findList()
                    }).catch(() => {
                        // 取消删除
                    })
                    break
                default: break
            }
        },
        // 岗位配置-取消
        onCancel () {
            this.postdialogVisible = false
            this.$refs['form'].clearValidate()
            this.$refs.postPersonRef.option = []
        },
        // 岗位配置-保存
        async updatesave () {
            this.$refs['form'].validate(async (validate) => {
                if (validate) {
                    const dataJson = {
                        positionCode: this.positionCode,
                        jobNumber: this.ruleForm.postPeople
                    }
                    await postSave(dataJson)
                    this.postdialogVisible = false
                    this.findList()
                }
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
.message {
    color: #f56c6c;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left: 0;
}
</style>
