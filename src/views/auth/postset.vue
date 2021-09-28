<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-input">
                        <el-input placeholder="请输入岗位名称进行检索" v-model="positionName" style="width: 415px" maxlength="25">
                        </el-input>
                    </div>
                    <el-button type="primary" @click="searchpositionName()">查询
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
                    <el-button class="orangeBtn" @click="onOperate(scope.data.row, 1)">配置人员</el-button>
                    <el-button class="orangeBtn" @click="onOperate(scope.data.row, 2)">复制</el-button>
                    <el-button class="orangeBtn" @click="onOperate(scope.data.row, 3)">修改</el-button>
                    <el-button class="orangeBtn" @click="onOperate(scope.data.row, 4)">删除</el-button>
                </template>
            </basicTable>
            <!-- 岗位配置人员 -->
            <el-dialog title="配置岗位人员" :visible.sync="postdialogVisible" width="500px" center>
                <el-form ref="form" :model="ruleForm" :rules="rules" label-position="right" label-width="150px">
                    <el-form-item label="岗位名称：">
                        <span>好橙工产品经理</span>
                    </el-form-item>
                    <el-form-item label="岗位人员：" prop="postPeople">
                        <el-select class="change-style" v-model="ruleForm.postPeople" multiple filterable remote reserve-keyword placeholder="请输入员工姓名检索" :remote-method="remotePostPeoMethod" :loading="postPeopleObj.loading">
                            <el-option v-for="item in postPeopleObj.option" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="postdialogVisible = false">取 消</el-button>
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
            // count: 0,
            tableLabel: [
                { label: '岗位名称', prop: 'positionName' },
                { label: '岗位code', prop: 'positionCode', icon: 'el-icon-question', content: 'code：实现岗位与后台数据相匹配' },
                { label: '岗位人员', prop: 'positionPeople', icon: 'el-icon-question' },
                { label: '创建时间', prop: 'creatTime' },
                { label: '更新时间', prop: 'updateTime' },
                { label: '操作人', prop: 'people' }
            ],
            postList: [{
                positionName: '11111'
            }],
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
            postPeopleObj: {
                option: [],
                list: [],
                loading: false
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
            // this.postList.map(value => {
            //     value.updateTime = this.datetimeFormat(value.updateTime)
            // })
        },
        // 根据岗位名称搜索
        searchpositionName () {
            this.findList()
        },
        // 新增岗位信息
        onadd () {
            this.$router.push({
                path: '/auth/postUpdate'
            })
        },
        /**
         * @description: 列表操作
         * @param {type} 1 配置人员 2 修改 3 复制 4 删除
         */
        onOperate (val, type) {
            switch (type) {
                case 1:
                    this.postdialogVisible = true
                    break
                case 2:
                    this.$router.push({
                        path: '/auth/postUpdate',
                        query: {
                            type: type
                        }
                    })
                    break
                case 3:
                    this.$router.push({
                        path: '/auth/postUpdate',
                        query: {
                            type: type
                        }
                    })
                    break
                case 4:
                    this.$confirm(`删除该岗位将影响xxx、xxx、xxx的权限，是否确认删除该岗位?`, '确认删除', {
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
        // 修改岗位信息
        // onupdate (val) {
        //     this.ruleForm.updatepositionName = val.positionName
        //     this.ruleForm.updatepositionCode = val.positionCode
        //     this.id = val.id
        //     this.postdialogVisible = true
        //     this.$refs['form'].clearValidate()
        //     // this.count = 0
        // },
        async updatesave () {
            this.$refs['form'].validate(async (validate) => {
                if (validate) {
                    // const formData = {
                    //     id: this.id,
                    //     positionCode: this.ruleForm.updatepositionCode,
                    //     positionName: this.ruleForm.updatepositionName,
                    //     updateUid: this.userInfo.jobNumber
                    // }
                    // await updatepostList(formData)
                    // this.postdialogVisible = false
                    // this.findList()
                }
            })
        },
        // 配置人员=>岗位人员检索
        remotePostPeoMethod (val) {
            if (val !== '') {
                this.postPeopleObj.loading = true
                setTimeout(() => {
                    this.postPeopleObj.loading = false
                    this.postPeopleObj.option = this.postPeopleObj.list.filter(item => {
                        return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
                    })
                }, 500)
            } else {
                this.postPeopleObj.option = []
            }
        }
    },
    mounted () {
        // this.findList()
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

/deep/.change-style .el-input:not(:first-child) {
    margin-left: 0px;
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
