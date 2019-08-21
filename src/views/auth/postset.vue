<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-input">
                        <el-input
                            placeholder="请输入岗位名称进行检索"
                            v-model="positionName"
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
                <el-button type="primary" @click="dialogVisible = true">新增岗位</el-button>
                <el-dialog
                    title="新增岗位"
                    :visible.sync="dialogVisible"
                    width="500px"
                    center>
                    <div class="block">
                        <el-form label-position="right" label-width="150px" :rules="rules">
                            <el-form-item label="岗位名称：" prop="addpositionName">
                                <el-input
                                    placeholder="请输入岗位名称"
                                    v-model="addpositionName"
                                    maxlength="25">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="岗位code：" prop="addpositionCode">
                                <el-input
                                    placeholder="请输入岗位code"
                                    v-model="addpositionCode"
                                    maxlength="25">
                                </el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="onsave">保 存</el-button>
                    </span>
                </el-dialog>
            </div>
            <table>
                <thead>
                <tr>
                    <td>序号</td>
                    <td>岗位名称</td>
                    <td>
                        岗位code
                        <el-tooltip effect="dark" content="code：实现岗位与后台数据相匹配" placement="top-start">
                            <i class="el-icon-question"></i>
                        </el-tooltip>
                    </td>
                    <td>更新时间</td>
                    <td width="200px">操作</td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in postList" :key="index">
                    <td>{{index + 1}}</td>
                    <td>{{item.positionName}}</td>
                    <td>{{item.positionCode}}</td>
                    <td>{{item.updateTime}}</td>
                    <td>
                        <el-button class="orangeBtn">修改</el-button>
                        <el-button class="orangeBtn" @click="onDelete">删除</el-button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { findList, addList } from './api/index'

export default {
    name: 'postset',
    data () {
        return {
            dialogVisible: false,
            rules: {
                // addpositionName: [{ required: true, message: '请输入岗位名称', trigger: 'blur' }],
                // addpositionCode: [{ required: true, message: '请输入岗位code', trigger: 'blur' }]
            },
            postList: [],
            positionName: '',
            addpositionName: '',
            addpositionCode: ''
        }
    },
    methods: {
        async findList () {
            const { data } = await findList(this.positionName)
            this.postList = data
        },
        // 根据岗位名称搜索
        searchpositionName () {
            this.findList()
        },
        async onsave () {
            const formData = {
                createUid: '1111111',
                positionName: this.addpositionName,
                positionCode: this.addpositionCode
            }
            await addList(formData)
            this.findList()
            this.dialogVisible = false
            this.addpositionName = ''
            this.addpositionCode = ''
        },
        onDelete (val) {
            this.$confirm(`是否确认删除该公司平台?`, '确认删除', {
                confirmButtonText: '确定删除',
                cancelButtonText: '取消'
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
            height: 40px;
            border: 1px solid #DDDDDD;

            td {
                border: 1px solid #DDDDDD;
            }
        }
    }
</style>
