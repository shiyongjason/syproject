<template>
    <div class="tags-wrapper page-body">
        <div class="page-body-cont query-cont spanflex">
            <span>项目列表</span>
        </div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">项目名称：</div>
                <div class="query-col-input">
                    <el-input type="text" v-model="queryParams.brandName" maxlength="20" placeholder="请输入项目名称"></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">企业名称：</div>
                <div class="query-col-input">
                    <el-input type="text" v-model="queryParams.code" maxlength="20" placeholder="请输入企业名称"></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">管理员姓名：</div>
                <div class="query-col-input">
                    <el-input type="text" v-model="queryParams.code" maxlength="20" placeholder="请输入管理员手机号"></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">管理员手机号：</div>
                <div class="query-col-input">
                    <el-input type="text" v-model="queryParams.code" maxlength="20" placeholder="请输入管理员手机号"></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">创建时间：</div>
                <div class="query-col-input">
                    <el-date-picker v-model="queryParams.createStartTime" type="datetime" value-format='yyyy-MM-dd HH:mm:ss' placeholder="开始日期" :picker-options="pickerOptionsStart">
                    </el-date-picker>
                    <span class="ml10">-</span>
                    <el-date-picker v-model="queryParams.createEndTime" type="datetime" value-format='yyyy-MM-dd HH:mm:ss' placeholder="结束日期" :picker-options="pickerOptionsEnd">
                    </el-date-picker>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onQuery(queryParams)">查询</el-button>
                </div>
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="addNewProject">+新增项目</el-button>
                </div>
            </div>
        </div>
        <el-dialog title="新建项目" :visible.sync="addProject" width="695px" :close-on-click-modal="false">
            <el-form ref="form" :model="form" :rules="rules" label-width="150px" label-position="left">
                <el-form-item label="项目名称：" prop="contactNumber">
                    <el-input v-model.trim="form.contactNumber" @change='remoteMethod' show-word-limit placeholder="请输入代理商手机号" maxlength='50' class="newTitle"></el-input>
                </el-form-item>
                <el-form-item label="项目简称：" prop="companyName">
                    <el-input v-model.trim="form.companyName" show-word-limit placeholder="请输入代理商公司全称" maxlength='50' class="newTitle"></el-input>
                </el-form-item>
                <el-form-item label="项目地址" prop="provinceName">
                    <el-col :span="6">
                        <div class="query-col-input">
                            <el-cascader placeholder="" :options="areaOptions" v-model="optarr" :clearable=true :collapse-tags=true :show-all-levels="true" ref="myCascader" @change="cityChange" :props="{ multiple: false ,value:'countryId',label:'name',children:'cities'}" filterable>
                            </el-cascader>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="详细地址：" prop="contactAddress" label-width='100px' style="margin-bottom: 0px">
                            <el-input v-model.trim="form.contactAddress" show-word-limit placeholder="请输入详细地址" maxlength='50' style="width:350px"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="公司名称：" prop="companyName">
                    <el-input v-model.trim="form.companyName" show-word-limit placeholder="请输入代理商公司全称" maxlength='50' class="newTitle"></el-input>
                </el-form-item>
                <el-form-item label="管理员姓名：" prop="companyName">
                    <el-input v-model.trim="form.companyName" show-word-limit placeholder="请输入代理商公司全称" maxlength='50' class="newTitle"></el-input>
                </el-form-item>
                <el-form-item label="管理员手机号：" prop="companyName">
                    <el-input v-model.trim="form.companyName" show-word-limit placeholder="请输入代理商公司全称" maxlength='50' class="newTitle"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="faultEdit = false">取 消</el-button>
                <el-button type="primary" @click="onSaveFaultCode('faultCodeEdit')" :loading="loading">确 定</el-button>
            </span>
        </el-dialog>
        <div class="page-body-cont">
            <basicTable :isShowIndex="true" :tableLabel="tableLabel" :tableData="cloudEquipmentErrorList" :pagination="cloudEquipmentErrorPagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true" :actionMinWidth='80'>
                <template slot="source" slot-scope="scope">
                    {{scope.data.row.source === 1 ? '人工导入': '设备上报'}}
                </template>
                <template slot="code" slot-scope="scope">
                    <p class="colred" @click="openFaultEdit(scope.data.row, 'code')">{{scope.data.row.code}}</p>
                </template>
                <template slot="content" slot-scope="scope">
                    <p class="colred" @click="openFaultEdit(scope.data.row,'content')">{{scope.data.row.content}}</p>
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="deleteFault(scope.data.row.id)">删除</el-button>
                </template>
            </basicTable>
        </div>
    </div>
</template>

<script>
import { iotUrl } from '@/api/config'
import { mapActions, mapGetters, mapState } from 'vuex'
import { downloadEquipmentErrorList, updateCloudEquipment, deleteCloudEquipment } from '../api/index'
export default {
    name: 'projectManager',
    data () {
        return {
            queryParams: {
                createStartTime: '',
                createEndTime: '',
                createTimeSortType: '',
                categoryId: '',
                code: '',
                brandName: '',
                pageNumber: 1,
                pageSize: 10
            },
            tableData: [],
            pagination: {
                pageNumber: 1,
                pageSize: 10
            },
            tableLabel: [
                { label: '来源', prop: 'source' },
                { label: '品类', prop: 'categoryName' },
                { label: '品牌', prop: 'brandName' },
                { label: '故障代码', prop: 'code' },
                { label: '故障内容', prop: 'content' },
                { label: '创建时间', prop: 'createTime', formatters: 'dateTime', sortable: true }
            ],
            addProject: false,
            rules: {
                code: [
                    { required: true, message: '请输入故障代码', trigger: 'blur' }
                ],
                content: [
                    { required: true, message: '请输入故障内容', trigger: 'blur' }
                ]
            },
            loading: false
        }
    },
    computed: {
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.queryParams.createEndTime
                    if (beginDateVal) {
                        return (
                            time.getTime() > new Date(beginDateVal).getTime()
                        )
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.queryParams.createStartTime
                    if (beginDateVal) {
                        return (
                            time.getTime() < new Date(beginDateVal).getTime()
                        )
                    }
                }
            }
        },
        ...mapGetters({
            cloudEquipmentErrorList: 'cloudEquipmentErrorList',
            cloudEquipmentErrorPagination: 'cloudEquipmentErrorPagination',
            cloudDict: 'cloudDict'
        }),
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    methods: {
        ...mapActions({
            onQuery: 'findCloudEquipmentErrorList',
            findCloudDict: 'findCloudDict'
        }),
        onCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.onQuery(this.queryParams)
        },
        onSizeChange (val) {
            this.queryParams.pageSize = val
            this.onQuery(this.queryParams)
        },
        addNewProject () {
            this.addProject = true
        },
        deleteFault (id) {
            this.$confirm('确认要删除该条故障码', '删除提示').then(() => {
                deleteCloudEquipment({ id: id, operateUserName: this.userInfo.employeeName })
                this.onQuery(this.queryParams)
            })
        }
    },
    mounted () {
        this.onQuery(this.queryParams)
        this.findCloudDict({ item: 'category' })
    }
}
</script>

<style scoped lang="scss">
.spanflex {
    font-size: 16px;
    padding-bottom: 10px;
}
.upload-fault {
    margin-top: 30px;
    margin-bottom: 20px;
}
.download-template {
    margin-bottom: 30px;
}
.colred {
    color: #ff7a45;
    cursor: pointer;
}
</style>
