<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col" v-if="branch">
                    <div class="query-cont-title">分部：</div>
                    <div class="query-cont-input">
                        <HAutocomplete :selectArr="branchList" @back-event="backPlat($event,'F')" placeholder="请输入分部名称" :selectObj="selectAuth.branchObj" :maxlength='30' :canDoBlurMethos='true'></HAutocomplete>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title">公司简称：</div>
                    <div class="flex-wrap-cont">
                        <HAutocomplete :selectArr="platformData" @back-event="backPlat($event,'P')" :placeholder="'选择公司简称'" :selectObj="selectAuth.platformObj" :maxlength='30' :canDoBlurMethos='true' />
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title">所在城市：</div>
                    <div class="flex-wrap-cont">
                        <HAutocomplete :placeholder="'选择城市'" @back-event="backFindcitycode" :selectArr="cityList" v-if="cityList" />
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title">上线时间：</div>
                    <div class="flex-wrap-cont">
                        <el-date-picker v-model="searchParams.onlineTime" :editable="false" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择时间">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title">增量/存量：</div>
                    <div class="flex-wrap-cont">
                        <el-select v-model="searchParams.incremental" placeholder="请选择选择" :clearable=true>
                            <el-option v-for="item in incrementalList" :key="item.key" :label="item.value" :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title">mis编码：</div>
                    <div class="flex-wrap-cont">
                        <el-input v-model="searchParams.misCode" placeholder="请输入mis编码"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title">目标年份：</div>
                    <div class="flex-wrap-cont">
                        <el-date-picker type="year" :editable=false :clearable=false placeholder="选择年份" format="yyyy" value-format="yyyy" v-model="searchParams.targetDate">
                        </el-date-picker>
                    </div>
                    <el-button type="primary" @click="onFindTableList({...searchParams, pageNumber: 1})">搜索
                    </el-button>
                    <el-button v-if="hosAuthCheck(exportAuth)" type="primary" @click="onExport()">导出
                    </el-button>
                </div>
            </div>
            <div class="query-cont-col">
                <el-upload class="upload-demo" v-loading='uploadLoading' :show-file-list="false" :action="interfaceUrl + 'rms/api/company/target/import'" :data="{createUser: userInfo.employeeName}" :on-success="isSuccess" :on-error="isError" auto-upload :on-progress="uploadProcess">
                    <el-button type="primary" v-if="hosAuthCheck(importAuth)" style="margin-left:0">
                        批量导入
                    </el-button>
                </el-upload>
                <a class="ml20 blue isLink" v-if="hosAuthCheck(downTemplateAuth)" @click="downloadXlsx">
                    下载平台目标模板
                </a>
            </div>
        </div>
        <div class="page-body-cont">
            <div class="page-table">
                <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationData" @onCurrentChange="onCurrentChange" @onSizeChange="onSizeChange" :isMultiple="false" :isAction="false" :actionMinWidth=250 @field-change="onFieldChange">
                    <template slot="incremental" slot-scope="scope">
                        <span v-if="scope.data.row.onlineTime">{{scope.data.row.incremental == 1?'增量':'存量'}}</span>
                    </template>
                    <template slot="updateTime" slot-scope="scope">
                        {{scope.data.row.updateTime | formatDate('YYYY-MM-DD HH:mm:ss')}}
                    </template>
                </basicTable>
            </div>
        </div>
    </div>
</template>
<script>
import { findTableList, getCompany, getCityList, exportPlatTarget, findPlatformTargetPlat } from './api/index.js'
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import { departmentAuth } from '@/mixins/userAuth'
import { interfaceUrl } from '@/api/config'
import { mapState } from 'vuex'
import { DEPT_TYPE } from './store/const'
import { AUTH_WIXDOM_PLATFORM_TARGET_EXPORT, AUTH_WIXDOM_PLATFORM_TARGET_BULK_IMPORT, AUTH_WIXDOM_PLATFORM_TARGET_DOWN_TEMPLATE } from '@/utils/auth_const'
export default {
    mixins: [departmentAuth],
    data () {
        return {
            uploadLoading: false,
            exportAuth: AUTH_WIXDOM_PLATFORM_TARGET_EXPORT,
            importAuth: AUTH_WIXDOM_PLATFORM_TARGET_BULK_IMPORT,
            downTemplateAuth: AUTH_WIXDOM_PLATFORM_TARGET_DOWN_TEMPLATE,
            tableLabel: [
                { label: '公司简称', prop: 'companyShortName', choosed: true },
                { label: '公司编码', prop: 'misCode', choosed: true },
                { label: '分部', prop: 'subsectionName', choosed: true },
                { label: '所在城市', prop: 'cityName', choosed: true },
                { label: '上线时间', prop: 'onlineTime', choosed: true },
                { label: '增量/存量', prop: 'incremental', choosed: true },
                { label: '目标年份', prop: 'targetDate', choosed: true },
                { label: '履约目标/万', prop: 'performanceTarget', choosed: true, formatters: 'money' },
                { label: '冲刺目标/万', prop: 'sprintTarget', choosed: true, formatters: 'money' },
                { label: '最近操作人', prop: 'updateUser', choosed: true },
                { label: '最近操作时间', prop: 'updateTime', choosed: true }
            ],
            incrementalList: [{ key: '', value: '全部' }, { key: 1, value: '增量' }, { key: 0, value: '存量' }],
            searchParams: {
                subsectionCode: '',
                misCode: '',
                onlineTime: '',
                incremental: '',
                targetDate: `${(new Date()).getFullYear()}`,
                cityCode: '',
                pageNumber: 1,
                pageSize: 10
            },
            companyData: {
                url: interfaceUrl + 'rms/companyTarget/queryCompanyShortName',
                otherParams: {
                    keys: 'companyShortName',
                    keyName: 'companyShortName',
                    keyValue: 'misCode'
                },
                params: {
                    companyCode: ''
                }
            },
            cityData: {
                url: interfaceUrl + 'rms/companyTarget/queryCity',
                otherParams: {
                    keys: 'cityName',
                    keyName: 'cityName',
                    keyValue: 'cityCode'
                },
                params: {
                    companyCode: ''
                }
            },
            tableData: [],
            paginationData: {
                total: 0,
                pageNumber: 1,
                pageSize: 10
            },
            interfaceUrl: interfaceUrl,
            cityList: [],
            deptType: DEPT_TYPE,
            selectAuth: {
                branchObj: {
                    selectCode: '',
                    selectName: ''
                },
                platformObj: {
                    selectCode: '',
                    selectName: ''
                }
            },
            platformData: []
        }
    },
    components: {
        HAutocomplete
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            branchList: state => state.branchList
        })
    },
    async mounted () {
        if (this.userInfo.oldDeptCode !== 'top') {
            this.searchParams.subsectionCode = this.userInfo.oldDeptCode
        }
        this.companyData.params.companyCode = this.userInfo.oldDeptCode
        this.cityData.params.companyCode = this.userInfo.oldDeptCode
        this.onFindTableList(this.searchParams)
        this.getCompanyList()
        this.getCityList()
        await this.newBossAuth(['F', 'P'])
    },
    methods: {
        uploadProcess () {
            this.uploadLoading = true
        },
        isSuccess (response) {
            if (response.code !== 200) {
                this.$message({
                    message: '批量导入失败，' + response.message,
                    type: 'error'
                })
            } else {
                this.$message({
                    message: '批量导入成功！',
                    type: 'success'
                })
                this.onFindTableList(this.searchParams)
            }
            this.uploadLoading = false
        },
        isError (response) {
            this.$message({
                message: '批量导入失败，' + response.message,
                type: 'error'
            })
            this.uploadLoading = false
        },
        changeCellStyle ({ row, rowIndex, columnIndex }) {
            // 第八列添加 red 类
            if (columnIndex === 8) {
                return 'red'
            }
        },
        async onFindTableList (params) {
            this.queryParamsTemp = { ...params }
            const { data } = await findTableList(params)
            this.tableData = data.data.list
            this.paginationData = {
                pageSize: data.data.pageSize,
                pageNumber: data.data.pageNum,
                total: data.data.total
            }
        },
        backFindcitycode (val) {
            this.searchParams.cityCode = val.value ? val.value.cityCode : ''
        },
        handleSizeChange (val) {
            this.queryParamsTemp.pageSize = val
            this.onFindTableList(this.queryParamsTemp)
        },
        handleCurrentChange (val) {
            this.queryParamsTemp.pageNumber = val.pageNumber
            this.onFindTableList(this.queryParamsTemp)
        },
        onCurrentChange (val) {
            this.queryParamsTemp.pageNumber = val.pageNumber
            this.onFindTableList(this.queryParamsTemp)
        },
        onSizeChange (val) {
            this.queryParamsTemp.pageSize = val
            this.onFindTableList(this.queryParamsTemp)
        },
        onFieldChange (val) {
            this.$emit('onFieldChange', val)
        },
        onExport () {
            exportPlatTarget(this.searchParams)
        },
        downloadXlsx () {
            location.href = '/excelTemplate/平台目标导入模板.xlsx'
        },
        async  getCompanyList () {
            const { data } = await getCompany({ companyCode: this.userInfo.oldDeptCode })
            this.companyList = data.data
            this.companyList && this.companyList.map(item => {
                item.value = item.companyShortName
                item.selectCode = item.misCode
            })
        },
        async  getCityList () {
            const { data } = await getCityList()
            this.cityList = data.data
            this.cityList && this.cityList.map(item => {
                item.value = item.cityName
                item.selectCode = item.cityCode
            })
        },
        async findPlatformTargetPlat (subsectionCode) {
            const { data } = await findPlatformTargetPlat({ subsectionCode })
            for (let i of data.data) {
                i.value = i.companyShortName
                i.selectCode = i.ehrSubsectionCode
            }
            this.platformData = data.data
        },
        backPlat (val, dis) {
            if (dis === 'F') {
                this.searchParams.subsectionCode = val.value.pkDeptDoc ? val.value.pkDeptDoc : ''
                !val.value.pkDeptDoc && this.linkage()
                if (val.value.pkDeptDoc) {
                    this.findPlatformTargetPlat(val.value.pkDeptDoc)
                }
            } else if (dis === 'P') {
                this.searchParams.companyCode = val.value.companyCode ? val.value.companyCode : ''
                this.searchParams.misCode = val.value.misCode ? val.value.misCode : ''
            }
        },
        linkage () {
            this.searchParams.companyCode = ''
            this.selectAuth.platformObj = {
                selectCode: '',
                selectName: ''
            }
        }
    }
}
</script>
<style lang="scss" >
.red {
    color: red !important;
}
.download {
    text-decoration: none;
    color: #ffffff;
    background: #f88825;
    line-height: 38px;
    border-radius: 4px;
    padding: 0 12px;
}
</style>
