<template>
    <div class="page-body B2b">
        <div class="page-body-cont ">
            <div class="query-cont__row">
                <div class="query-cont-col">
                    <div class="query-col-title">会员账号：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.phone" placeholder="请输入手机号" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title">会员来源：</div>
                    <div class="flex-wrap-cont">
                        <el-select v-model="queryParams.source">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="单分享" value="B2b"></el-option>
                            <el-option label="好橙工" value="hcg"></el-option>
                            <el-option label="第三方渠道" value="third"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">企业名称：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.companyName" placeholder="请输入企业名称" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">经营区域：</div>
                    <div class="query-cont-col-area">
                        <el-select v-model="queryParams.provinceId" @change="onProvince" placeholder="省" :clearable=true>
                            <el-option v-for="item in provinceList" :key="item.id" :label="item.name" :value="item.provinceId">
                            </el-option>
                        </el-select>
                        <span class="ml10 mr10">-</span>
                        <el-select v-model="queryParams.cityId" @change="onCity" placeholder="市" :clearable=true>
                            <el-option v-for="item in getCity" :key="item.id" :label="item.name" :value="item.cityId">
                            </el-option>
                        </el-select>
                        <span class="ml10 mr10">-</span>
                        <el-select v-model="queryParams.countryId" placeholder="区" :clearable=true>
                            <el-option v-for="item in getCountry" :key="item.id" :label="item.name" :value="item.countryId">
                            </el-option>
                        </el-select>
                    </div>
                </div>

                <div class="query-cont-col">
                    <div class="query-col-title">手动标签：</div>
                    <div class="query-col-cont">
                        <el-select v-model="queryParams.manualTags" multiple>
                            <el-option-group v-for="group in cloudMerchantTaglist" :key="group.tagCategory" :label="group.tagCategory">
                                <el-option v-for="item in group.tagDetailBos" :key="item" :label="item" :value="item">
                                </el-option>
                            </el-option-group>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">自动标签：</div>
                    <div class="flex-wrap-cont">
                        <el-select v-model="queryParams.autoTags" multiple collapse-tags>
                            <el-option v-for="item in this.allAutoTags" :key="item.tagId" :label="item.tagName" :value="item.tagId"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">注册时间： </div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.startTime" type="datetime" value-format='yyyy-MM-ddTHH:mm:ss' placeholder="开始日期" :picker-options="pickerOptionsStart" default-time="00:00:00">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.endTime" type="datetime" value-format='yyyy-MM-ddTHH:mm:ss' placeholder="结束日期" :picker-options="pickerOptionsEnd" default-time="23:59:59">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">
                        <el-button type="primary" class="ml20" @click="onSearch">查 询</el-button>
                        <el-button type="primary" class="ml20" @click="onInput">新增客户线索</el-button>
                    </div>
                </div>
            </div>

            <basicTable style="margin-top: 20px" :tableLabel="tableLabel" :tableData="tableData" :isShowIndex='false' :pagination="pagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true" :action-min-width="200">
                <template slot="source" slot-scope="scope">
                    {{ sourceName(scope.data.row.source) }}
                </template>
                <template slot="provinceName" slot-scope="scope">
                    {{ scope.data.row.provinceName + scope.data.row.cityName +scope.data.row.countryName }}
                </template>
                <template slot="isAppletUser" slot-scope="scope">
                    <div class="hand" v-if="scope.data.row.isAppletUser" @click="checkMember(scope.data.row)">是</div>
                    <div v-else>否</div>
                </template>
                <template slot="autoTag" slot-scope="scope">
                    <div class="tag-container" v-if="autoTag(scope.data.row.autoTag).length > 0">
                        <el-tag class="tag" size="mini" v-for="tag in autoTag(scope.data.row.autoTag)" :key='tag'>{{tag}}</el-tag>
                    </div>
                    <div v-else>-</div>
                </template>
                <template slot="manualTags" slot-scope="scope">
                    <div class="tag-container hand" @click="showDliag(scope.data.row)" v-if="scope.data.row.manualTags !== null">
                        <el-tag class="tag" v-for="item in scope.data.row.manualTags" :key="item">{{item}}</el-tag>
                    </div>
                    <div class="hand colred" @click="showDliag(scope.data.row)" v-else>添加标签</div>
                </template>
                <template slot="action" slot-scope="scope">
                    <div v-if="scope.data.row.autoTag && scope.data.row.autoTag.length > 0">
                        <el-button v-if="scope.data.row.source!=='hcg'" class="orangeBtn" @click="onOrderList(scope.data.row)">查看订单</el-button>
                        <el-button v-if="scope.data.row.autoTag" class="orangeBtn" @click="onDetail(scope.data.row,'enterpriseInfo')">会员详情</el-button>
                        <el-button class="orangeBtn" @click="onDetail(scope.data.row,'contact')">沟通记录</el-button>
                    </div>
                    <div v-else>-</div>
                    <el-button v-if="scope.data.row.source==='third'" class="orangeBtn" @click="deleteData(scope.data.row)">删除</el-button>
                </template>
            </basicTable>
            <el-dialog title="导入新增客户线索" :visible.sync="uploadShow" class="upload-show" width="800px" :close-on-click-modal="false" :before-close="onCloseDialog">
                <el-upload class="upload-fault" ref="upload" :file-list="fileList" :on-success="uploadSuccess" :on-error="uploadError" :before-upload="beforeAvatarUpload" v-bind="uploadData">
                    <el-button type="primary" slot="trigger">选择本地文件</el-button>
                    <p slot="tip" class="el-upload__tip">1.仅支持excel格式文件（大小在10M以内）</p>
                    <p slot="tip" class="el-upload__tip">2.请按照客户线索模板内容导入数据，否则可能会出现导入异常</p>
                </el-upload>
                <el-button class="errorBtn" v-if="errorData.failList.length > 0" @click="errorShow = true">上传失败数据</el-button>
                <div class="downloadExcel">
                    <a href="/excelTemplate/客户线索模板.xls" download="客户线索模板.xls">下载客户线索模板</a>
                </div>
                <div style="color: red">{{errMessage}}</div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="onImport" :loading="loading">上传</el-button>
                </span>

                <!-- <el-dialog width="800px" title="上传结果" :visible.sync="errorShow" append-to-body>
                    <div>
                        <span class="uploadTips">上传成功</span>
                    </div>
                </el-dialog> -->
                <el-dialog width="1000px" title="上传结果" :visible.sync="errorShow" append-to-body>
                    <div>
                        <span class="uploadTips">上传数据：{{errorData.count}}条</span>
                    </div>
                    <div>
                        <span class="uploadTips">上传成功：{{errorData.successCount}}条</span>
                    </div>
                    <div>
                        <span class="uploadTips uploadErr">上传失败：{{errorData.failCount}}条</span>
                    </div>
                    <div class="basic-table">
                        <basicTable :isShowIndex="true" :tableLabel="errTableLabel" :tableData="errorData.failList" :maxHeight='350'>
                        </basicTable>
                    </div>
                </el-dialog>
            </el-dialog>
            <el-dialog title="选择标签" :modal-append-to-body=false :append-to-body=false :visible.sync="dialogVisible" width="50%">
                <div v-for="item in cloudMerchantTaglist" :key="item.id">
                    <h1>{{item.tagCategory}}</h1>
                    <div class="tag-cont">
                        <span :class="tagSelect(tag)" v-for="tag in item.tagDetailBos" :key="tag" @click="addTag(tag)">{{tag}}</span>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addNewTag()">新增标签</el-button>
                    <el-button @click="tagCancel()">取消</el-button>
                    <el-button type="primary" @click="editConform()">确认</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import { getChiness } from '../../hmall/membership/api/index'
import { clearCache, newCache } from '../../../utils'
import { addMemberTag, editMemberTag, deleteThirdExernalMembersituation, getDictionary } from '../api'
import { mapState, mapGetters, mapActions } from 'vuex'
import { iotUrl } from '@/api/config'

export default {
    name: 'comfortcloudExternalMemeber',
    data () {
        return {
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                phone: '',
                companyName: '',
                source: '',
                provinceId: '',
                cityId: '',
                countryId: '',
                startTime: '',
                endTime: '',
                manualTags: [],
                autoTags: []
            },
            setTagUser: {},
            errMessage: '',
            loading: false,
            uploadShow: false,
            fileList: [],
            errorShow: false,
            errorData: {
                failList: []
            },
            uploadData: {
                accept: '.xlsx,.xls',
                action: `${iotUrl}/mall/boss/out-member/import`,
                limit: 1,
                autoUpload: false,
                headers: {
                    refreshToken: localStorage.getItem('refreshToken'),
                    token: `Bearer ` + localStorage.getItem('token'),
                    AccessKeyId: '5ksbfewexbfc'
                },
                data: {
                    operateUserName: ''
                }
            },
            tableData: [],
            tagStringList: [],
            provinceList: [],
            cityList: [],
            allAutoTags: [],
            pagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            tableLabel: [
                { label: '会员来源', prop: 'source' },
                { label: '企业名称', prop: 'companyName', width: '200' },
                { label: '认证状态', prop: 'authenticationStatus' },
                { label: '会员角色', prop: 'role' },
                { label: '会员账号', prop: 'phone' },
                { label: '会员昵称', prop: 'nickName' },
                { label: '经营区域', prop: 'provinceName' },
                { label: '门店地址', prop: 'storeAddress' },
                { label: '所属分部', prop: 'department' },
                { label: '主营品牌', prop: 'mainBrand' },
                { label: '主营品类', prop: 'mainCategory' },
                { label: '注册时间', prop: 'createTime', formatters: 'dateTime' },
                { label: '销售顾问姓名', prop: 'saleName' },
                { label: '销售顾问手机号', prop: 'salePhone' },
                { label: '是否注册享钱', prop: 'isAppletUser' },
                { label: '首次沟通日期', prop: 'firstCommunicationDate', formatters: 'date' },
                { label: '手动标签', prop: 'manualTags', width: '200' },
                { label: '自动标签', prop: 'autoTag', width: '150' }
            ],
            errTableLabel: [
                { label: '企业名称', prop: 'companyName' },
                { label: '会员账号', prop: 'phone' },
                { label: '会员昵称', prop: 'nickName' },
                { label: '所在省份', prop: 'provinceName' },
                { label: '所在城市', prop: 'cityName' },
                { label: '所在区县', prop: 'countryName' },
                { label: '详细地址', prop: 'storeAddress' },
                { label: '主营品类', prop: 'mainCategory' },
                { label: '主营品牌', prop: 'mainBrand' },
                { label: '所属分部', prop: 'department' },
                { label: '销售顾问姓名', prop: 'saleName' },
                { label: '销售顾问手机号', prop: 'salePhone' },
                { label: '失败原因', prop: 'error' }
            ],
            dialogVisible: false
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            merchantExernalMemberData: 'iotmerchantExternalMemberData',
            cloudMerchantTaglist: 'cloudMerchantTaglist'
        }),
        autoTag () {
            return function (tags) {
                if (tags && tags.length > 0) {
                    let auto = this.allAutoTags
                    let val = tags.split(',')
                    let newAuto = []
                    for (let i = 0; i < auto.length; i++) {
                        for (let j = 0; j < val.length; j++) {
                            if (auto[i].tagId == val[j]) {
                                newAuto.push(auto[i].tagName)
                            }
                        }
                    }
                    return newAuto
                } else {
                    return []
                }
            }
        },
        tagSelect () {
            return function (tag) {
                let selectTag = false
                let datas = this.tagStringList
                for (let j = 0; j < datas.length; j++) {
                    const element = datas[j]
                    if (tag === element) {
                        selectTag = true
                        break
                    }
                }
                return selectTag ? 'select hand' : 'unselect hand'
            }
        },
        sourceName () {
            return function (val) {
                if (val === 'B2b') {
                    return '单分享'
                } else if (val === 'hcg') {
                    return '好橙工'
                } else if (val === 'third') {
                    return '第三方渠道'
                }
                return ''
            }
        },
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    let endDateVal = this.queryParams.endTime
                    if (endDateVal) {
                        return time.getTime() > new Date(endDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.queryParams.startTime
                    if (beginDateVal) {
                        return time.getTime() <= new Date(beginDateVal).getTime() - 8.64e7
                    }
                }
            }
        },
        getCity () {
            const province = this.provinceList.filter(item => item.provinceId == this.queryParams.provinceId)
            if (province.length > 0) {
                return province[0].cities
            }
            return []
        },
        getCountry () {
            const city = this.cityList.filter(item => item.cityId == this.queryParams.cityId)
            if (city.length > 0) {
                return city[0].countries
            }
            return []
        }
    },
    watch: {
        getCity: {
            deep: true,
            handler: function (newVal) {
                this.cityList = newVal
            }
        }
    },
    async mounted () {
        this.onSearch()
        this.getAreacode()
        this.queryTags()
        const { data } = await getDictionary({
            item: 'out_store_water_member_auto_tag'
        })
        this.allAutoTags = data.data.map((v) => {
            return {
                tagType: 1,
                tagId: parseInt(v.dataKey),
                tagName: v.dataValue
            }
        })
    },
    activated () {
        this.onQuery()
    },
    beforeRouteEnter (to, from, next) {
        newCache('comfortcloudExternalMemeber')
        next()
    },
    beforeRouteLeave (to, from, next) {
        if (to.name != 'merchantExternalInvitation' && to.name != 'merchantOutOrderList') {
            clearCache('comfortcloudExternalMemeber')
        }
        next()
    },
    methods: {
        ...mapActions({
            findMerchantExternalMembersituation: 'findMerchantExternalMembersituation',
            findCloudMerchantTaglist: 'findCloudMerchantTaglist'
        }),
        async onQuery () {
            await this.findMerchantExternalMembersituation(this.searchParams)
            this.tableData = this.merchantExernalMemberData.records
            this.pagination = {
                pageNumber: this.merchantExernalMemberData.current,
                pageSize: this.merchantExernalMemberData.size,
                total: this.merchantExernalMemberData.total
            }
        },
        async queryTags () {
            await this.findCloudMerchantTaglist()
        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        async showDliag (val) {
            if (val !== undefined) {
                this.setTagUser = val
                this.tagStringList = val.manualTags ? [...val.manualTags] : []
            }
            this.queryTags()
            this.dialogVisible = true
        },
        async editConform () {
            if (this.tagStringList) {
                // 这里因为后台需要传递tagid 所以要加上再传递
                let tagMapList = []
                for (let i = 0; i < this.tagStringList.length; i++) {
                    const element = this.tagStringList[i]
                    tagMapList.push({ 'tagId': '', 'tagName': element })
                }
                if (this.setTagUser.manualTags) {
                    // 已经存在过 则是编辑
                    await editMemberTag({ 'phone': this.setTagUser.phone, 'tagNames': tagMapList })
                } else {
                    await addMemberTag({ 'phone': this.setTagUser.phone, 'tagNames': tagMapList })
                }
                this.onQuery()
            }
            this.clearData()
        },
        tagCancel () {
            this.clearData()
        },
        addNewTag () {
            this.clearData()
            this.$router.push({ path: '/comfortCloudMerchant/merchantVIP/merchantMemberTag' })
        },
        clearData () {
            this.tagStringList = []
            this.dialogVisible = false
            this.setTagUser = {}
        },
        checkMember (val) {
            this.$router.push({ path: '/comfortCloudMerchant/merchantVIP/merchantMemberManage', query: { 'phone': val.phone } })
        },
        onDetail (val, index) {
            this.$router.push({ path: '/comfortCloudMerchant/merchantVIP/merchantExternalInvitation', query: { 'phone': val.phone, 'name': index, 'companyId': val.companyId } })
        },
        async deleteData (val) {
            console.log(val)
            await deleteThirdExernalMembersituation(val.phone)
            this.onQuery()
        },
        onInput () {
            this.uploadShow = true
        },
        async onImport () {
            if (this.loading) return
            this.loading = true
            if (this.hasFile()) {
                this.uploadData.data.operateUserName = this.userInfo.employeeName
                try {
                    await this.$refs.upload.submit()
                } catch (e) {
                }
            } else {
                this.$message.error('请选择上传的文件')
                this.loading = false
            }
        },
        beforeAvatarUpload (file) {
            const isLt10M = file.size / (1024 * 1024 * 10) < 1
            // const isCsv = file.type === 'application/vnd.ms-excel'
            const isCsv = file.name.lastIndexOf('.') > 0 ? ['.xlsx', '.xls'].indexOf(file.name.slice(file.name.lastIndexOf('.'), file.name.length)) > -1 : false
            if (!isCsv) {
                // this.$message.error('上传文件只能是 excel 格式!')
                this.loading = true
                this.$message({
                    type: 'error',
                    message: '上传文件只能是 excel 格式!',
                    duration: 800,
                    onClose: () => {
                        this.loading = false
                    }
                })
            }
            if (!isLt10M) {
                // this.$message.error('上传文件大小不能超过 10MB!')
                this.loading = true
                this.$message({
                    type: 'error',
                    message: '上传文件大小不能超过 10MB!',
                    duration: 800,
                    onClose: () => {
                        this.loading = false
                    }
                })
            }
            return isCsv && isLt10M
        },
        uploadError (response) {
            console.log(response, 'error')
            const res = response
            console.log(JSON.parse(res.message).detail)
            this.$refs.upload.clearFiles()
            this.$message.error(JSON.parse(res.message).detail)
            this.loading = false
        },
        uploadSuccess (response) {
            console.log(response, 'success')
            this.$refs.upload.clearFiles()
            this.loading = false
            this.errorData = response
            this.errorShow = true
            this.onQuery(this.searchParams)
        },
        onCloseDialog () {
            if (this.hasFile()) {
                this.$confirm('是否确定取消选中的文件', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$refs.upload.clearFiles()
                    this.uploadShow = false
                    this.$message({
                        type: 'success',
                        message: '已取消选中的文件!'
                    })
                }).catch(() => {
                    this.$message({
                        type: 'success',
                        message: '已取消删除'
                    })
                })
            } else {
                this.$refs.upload.clearFiles()
                this.uploadShow = false
            }
        },
        hasFile () {
            return this.$refs.upload.uploadFiles.length > 0
        },
        onOrderList (val) {
            this.$router.push({ path: '/comfortCloudMerchant/merchantOrderManage/merchantOutOrderList', query: { 'phone': val.phone } })
        },
        onCurrentChange (val) {
            this.searchParams.pageNumber = val.pageNumber
            this.onQuery(this.searchParams)
        },
        onSizeChange (val) {
            this.searchParams.pageSize = val
            this.onQuery(this.searchParams)
        },
        async getAreacode () {
            const { data } = await getChiness()
            this.provinceList = data
        },
        onProvince (key) {
            this.queryParams.provinceId = key
            this.queryParams.cityId = ''
            this.queryParams.countryId = ''
        },
        onCity (key) {
            this.queryParams.cityId = key
            this.queryParams.countryId = ''
        },
        onArea (key) {
            this.queryParams.countryId = key
        },
        addTag (tag) {
            let selectTag = false
            let index = 0
            let datas = this.tagStringList
            for (let j = 0; j < datas.length; j++) {
                const element = datas[j]
                if (tag === element) {
                    index = j
                    selectTag = true
                    break
                }
            }
            if (selectTag) {
                // 存在则删除
                datas.splice(index, 1)
            } else {
                // 不存在则添加
                datas.push(tag)
            }
        }
    }
}
</script>

<style lang='scss' scoped>
.spanflex {
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    span {
        flex: 1;
        &:first-child {
            font-size: 16px;
        }
        &:last-child {
            text-align: right;
        }
    }
}

.hand {
    cursor: pointer !important;
}

.orangeBtn {
    padding: 5px;
    margin: 5px;
}

.query-cont-col-area {
    position: relative;
    display: inline-flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-right: 24px;
}
.topTitle {
    margin-right: 2rem;
    font-weight: bold;
}

.tag-cont {
    display: flex;
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
}

.unselect {
    display: inline-block;
    padding: 5px 10px;
    margin: 10px;
    border: 1px solid #606266;
    border-radius: 5px;
}

.select {
    display: inline-block;
    padding: 5px 10px;
    margin: 10px;
    background-color: #ff7a45;
    border: 1px solid #ff7a45;
    color: white;
    border-radius: 5px;
}
.tag-container {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
}
.tag {
    margin: 5px;
}
.colred {
    color: #ff7a45;
    cursor: pointer;
}
.topColred {
    color: #ff7a45;
    cursor: pointer;
}
/deep/.el-dialog__body {
    padding-top: 10px;
}
</style>
