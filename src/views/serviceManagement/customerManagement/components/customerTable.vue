<template>
    <div class="page-body-cont">
        <el-table :data="tableData" border stripe style="width: 100%" size="small">
            <el-table-column type="index" :index="indexMethod" label="序号" align="center" width="60"></el-table-column>
            <el-table-column align="center" label="获客渠道">
                <template slot-scope="scope">
                    <span>{{channelName(scope.row.channelType)}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="name" align="center" label="姓名">
                <template slot-scope="scope">
                    <span class="name" @click="onEdit(scope.row,'detail')">{{scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="mobile" align="center" label="手机号"></el-table-column>
            <el-table-column
                align="center"
                label="微信昵称">
                <template slot-scope="scope">
                    {{ scope.row.nickname | isNotBlank}}
                </template>
            </el-table-column>
            <el-table-column  align="center" label="微信号">
                <template slot-scope="scope">
                    {{ scope.row.wechatId | isNotBlank}}
                </template>
            </el-table-column>
            <el-table-column prop="createTime" align="center" property="date" label="创建时间">
                <template slot-scope="scope">
                    {{ formatTime(scope.row.createTime) }}
                </template>
            </el-table-column>
            <el-table-column width="250px" prop="key" align="center" label="操作">
                <template slot-scope="scope">
                    <el-button type='primary' @click="onEdit(scope.row)" size="mini">修改</el-button>
                    <el-button type='primary' @click="onAddTag(scope.row)" size="mini">加标签</el-button>
                    <el-button type='primary' @click="goUserPower(scope.row)" size="mini">查看权益</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog class="add-tags" title="添加标签" :visible.sync="dialog" :close-on-click-modal="false" width="800px">
            <div class="add-tags-input">
                <el-select v-model="tagModel.id" multiple @focus="findTagList" filterable placeholder="请输入标签" remote :remote-method="searchTagList">
                    <el-option
                        v-for="item in tagList"
                        :key="item.id"
                        :label="item.labelName"
                        :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="onTagCancel">取 消</el-button>
                <el-button type="primary" @click="onSave">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import moment from 'moment'
import { findTagList, createTagWidthUser } from '../api/index'
export default {
    name: 'customerTable',
    props: {
        tableData: {
            type: Array,
            required: false,
            default () {
                return []
            }
        },
        pageSize: {
            type: Number
        },
        pageNumber: {
            type: Number
        },
        channelType: {
            type: Array
        }
    },
    data () {
        return {
            dialog: false,
            tagModel: {
                id: [],
                query: ''
            },
            tagList: [],
            tempUserId: {},
            lastTime: null,
            timeout: null,
            repeatValue: []
        }
    },
    methods: {
        channelName (id) {
            let tempName = ''
            this.channelType.forEach(value => {
                if (value.code === id) tempName = value.name
            })
            return tempName
        },
        goUserPower (row) {
            this.$router.push({
                path: '/serviceManagement/userPower',
                query: {
                    mobile: row.mobile ? row.mobile : '',
                    source: row.channelType ? row.channelType : ''
                }
            })
        },
        debounce (func, wait) {
            let _this = this
            return function () {
                let now = new Date()
                if (now - _this.lastTime - wait > 0) {
                    _this.timeout = setTimeout(() => {
                        func.apply(_this, arguments)
                    }, wait)
                } else {
                    if (_this.timeout) {
                        clearTimeout(_this.timeout)
                        _this.timeout = null
                    }
                    _this.timeout = setTimeout(() => {
                        func.apply(_this, arguments)
                    }, wait)
                }

                _this.lastTime = now
            }
        },
        async createTagWidthUser () {
            const params = {
                channelUserId: this.tempUserId.id,
                labelIdList: this.tagModel.id
            }
            await createTagWidthUser(params)
            this.$message({
                type: 'success',
                message: '添加的标签成功!'
            })
        },
        async findTagList () {
            const { data } = await findTagList({ laberName: this.tagModel.query, channelUserId: this.tempUserId.id })
            this.tagList = data
        },
        onAddTag (row) {
            this.dialog = true
            this.tempUserId.id = row.id
        },
        onTagCancel () {
            this.tagModel = {
                id: [],
                query: ''
            }
            this.dialog = false
        },
        searchTagList (query) {
            this.tagModel.query = query
            this.debounce(this.findTagList, 500)()
        },
        async onSave () {
            if (this.tagModel.id.length < 1) {
                this.$message({
                    type: 'error',
                    message: '请选择要添加的标签'
                })
                return
            }
            await this.createTagWidthUser()
            this.dialog = false
            this.tagModel = {
                id: [],
                query: ''
            }
        },
        indexMethod (index) {
            return this.pageSize * (this.pageNumber - 1) + index + 1
        },
        onEdit (row, type) {
            if (type) this.$emit('edit', row, type)
            else this.$emit('edit', row)
        },
        formatTime (time, type) {
            let dateType = 'YYYY-MM-DD HH:mm:ss'
            type && (dateType = type)
            return moment(time).format(dateType)
        }
    }
}
</script>

<style lang='scss' scoped>
.name{ color:#0099FF; cursor: pointer;}
    .add-tags-input{
        padding-top: 20px;
    }
/deep/.el-dialog .el-input, .el-dialog .el-select{
    width: 100%;
}
</style>
