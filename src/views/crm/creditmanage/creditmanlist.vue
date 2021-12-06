<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont__col">
                    <div class="query-col__label">企业名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.companyName" placeholder="请输入企业名称" maxlength="50"></el-input>
                    </div>
                </div>

                <div class="query-cont__col">
                    <div class="query-col__label">所属分部：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.pkDeptDoc" placeholder="请选择" :clearable=true>
                            <el-option :label="item.deptName" :value="item.pkDeptDoc" v-for="item in branchArr" :key="item.pkDeptDoc"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">信用评级 ：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.creditLevel" placeholder="请选择" :clearable=true>
                            <el-option v-for="item in droplists" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">服务费：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.minServiceFee" v-isNum:1 placeholder="请输入最小服务费" maxlength="50"></el-input>
                        ~
                        <el-input v-model="queryParams.maxServiceFee" v-isNum:1 placeholder="请输入最大服务费" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">可代采购额度：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.minPurchaseQuota" v-isNum:6 placeholder="请输入" maxlength="50"><template slot="append">万元</template></el-input>
                        ~
                        <el-input v-model="queryParams.maxPurchaseQuota" v-isNum:6 placeholder="请输入" maxlength="50"><template slot="append">万元</template></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">可用额度：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.minRemainPurchaseQuota" v-isNum:6 placeholder="请输入" maxlength="50"><template slot="append">万元</template></el-input>
                        ~
                        <el-input v-model="queryParams.maxRemainPurchaseQuota" v-isNum:6 placeholder="请输入" maxlength="50"><template slot="append">万元</template></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">信用到期时间：</div>
                    <div class="query-col__input">
                        <HDatePicker :start-change="onStartChange" :end-change="onEndChange" :options="options">
                        </HDatePicker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">首次评级时间：</div>
                    <div class="query-col__input">
                        <HDatePicker :start-change="handleChangeStart" :end-change="handleChangeEnd" :options="levelOptions">
                        </HDatePicker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">资料状态：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.documentStatus" placeholder="请选择" :clearable=true>
                            <el-option v-for="item in matelist" :key="item.key" :label="item.value" :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary" @click="searchList()">
                        查询
                    </h-button>
                    <h-button @click="onRest()">
                        重置
                    </h-button>
                </div>
            </div>

            <el-tag size="medium" class="eltagtop">已筛选 {{creditdata.total||0}} 项</el-tag>
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="true" :actionMinWidth=200 :isShowIndex='true'>
                <template slot="companyName" slot-scope="scope">
                    <span v-if="hosAuthCheck(auths.CREDITMANLIST_LINK_AUTHENLIST)" @click="onLinkCom(scope.data.row)" class="link-cell">{{scope.data.row.companyName}}</span>
                    <span v-else>{{scope.data.row.companyName}}</span>
                </template>
                <template slot="status" slot-scope="scope">
                    <span :class="scope.data.row.status?'colgry':'colred'">{{scope.data.row.status==true?'正常':scope.data.row.status==false?'过期':'-'}}</span>
                </template>
                <template slot="endTime" slot-scope="scope">
                    <span :class="scope.data.row.status?'colgry':'colred'">{{scope.data.row.endTime?moment(scope.data.row.endTime).format('YYYY-MM-DD'):'-'}}</span>
                </template>
                <template slot="documentStatus" slot-scope="scope">
                    {{scope.data.row.documentStatus>0?matelist[scope.data.row.documentStatus-1].value:'待提交'}}
                </template>
                <template slot="action" slot-scope="scope">
                    <h-button table @click="onDrawerinfo(scope.data.row)" v-if="hosAuthCheck(auths.CRM_CREDIT_DETAIL)">查看详情</h-button>
                    <h-button table @click="onEditproject(scope.data.row)" v-if="(scope.data.row.documentStatus==4||!scope.data.row.documentStatus||scope.data.row.documentStatus==1)&&hosAuthCheck(auths.CRM_CREDIT_ZL)">上传资料</h-button>
                    <h-button table @click="onLookproject(scope.data.row)" v-if="(scope.data.row.documentStatus==2||scope.data.row.documentStatus==3)&&hosAuthCheck(auths.CRM_CREDIT_LOOK)">查看资料</h-button>
                </template>
            </basicTable>
        </div>
        <creditdrawer ref="creditdrawer" @backEvent=searchList></creditdrawer>
        <el-dialog title="分配" :visible.sync="dialogVisible" width="30%" :before-close="()=>dialogVisible = false">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
                <el-form-item label="分配给（员工）" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="所属分部" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="说明" prop="name">
                    <el-input type="textarea" v-model="ruleForm.desc" maxlength="300" show-word-limit :rows="6"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <h-button @click="dialogVisible = false">取消</h-button>
                <h-button type="primary" @click="submitForm('ruleForm')">确定</h-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import moment from 'moment'
import { mapActions, mapGetters, mapState } from 'vuex'
import creditdrawer from './components/creditdrawer'
import { CREDITLEVEL, MATELIST } from '../const'
import * as auths from '@/utils/auth_const'
import { newCache } from '@/utils/index'
export default {
    name: 'creditManage',
    data () {
        return {
            auths,
            moment,
            queryParams: {
                companyName: '',
                creditLevel: '',
                maxEndTime: '',
                maxPurchaseQuota: '',
                maxRemainPurchaseQuota: '',
                maxServiceFee: '',
                minEndTime: '',
                minPurchaseQuota: '',
                minRemainPurchaseQuota: '',
                firstLevelStartTime: '',
                firstLevelEndTime: '',
                minServiceFee: '',
                pageNumber: 1,
                pageSize: 10,
                pkDeptDoc: '',
                documentStatus: '',
                authCode: '', // 菜单路由
                jobNumber: '' // 工号
            },
            copyParms: {},
            tableLabel: [
                { label: '企业名称', prop: 'companyName', width: '' },
                { label: '所属分部', prop: 'deptName' },
                { label: '信用评级', prop: 'creditLevel' },
                { label: '服务费', prop: 'serviceFee' },
                { label: '可代采购额度（万元）', prop: 'purchaseQuota', formatters: 'money' },
                { label: '剩余代采购金额（万元）', prop: 'remainPurchaseQuota', formatters: 'money' },
                { label: '信用到期时间', prop: 'endTime', formatters: 'date' },
                { label: '状态', prop: 'status' },
                { label: '资料状态', prop: 'documentStatus' },
                { label: '资料更新时间', prop: 'documentUpdateTime', formatters: 'dateTimes' },
                { label: '更新时间', prop: 'updateTime', formatters: 'dateTimes' },
                { label: '首次评级时间', prop: 'firstLevelTime', formatters: 'dateTimes' }
            ],
            tableData: [],
            branchArr: [],
            paginationInfo: {},
            droplist: CREDITLEVEL,
            matelist: MATELIST,
            dialogVisible: false,
            rules: {
                name: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ],
                des: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ]
            },
            ruleForm: {},
            droplists: []
        }
    },
    components: {
        creditdrawer
    },
    computed: {
        ...mapState({
            userInfo: 'userInfo'
        }),
        ...mapGetters({
            crmdepList: 'crmmanage/crmdepList',
            creditdata: 'creditManage/creditdata'

        }),
        options () {
            return {
                type: 'date',
                valueFormat: 'yyyy-MM-dd',
                format: 'yyyy-MM-dd',
                startTime: this.queryParams.minEndTime,
                endTime: this.queryParams.maxEndTime
            }
        },
        levelOptions () {
            return {
                type: 'datetime',
                valueFormat: 'yyyy-MM-ddTHH:mm',
                format: 'yyyy-MM-dd HH:mm',
                startTime: this.queryParams.firstLevelStartTime,
                endTime: this.queryParams.firstLevelEndTime
            }
        }
    },
    async mounted () {
        this.onGetbranch()
        this.searchList()
        this.copyParms = { ...this.queryParams }
        this.droplists = [...[{ key: 0, value: '无' }], ...this.droplist]
    },
    methods: {
        ...mapActions({
            findCrmdeplist: 'crmmanage/findCrmdeplist',
            findCreditManager: 'creditManage/findCreditManager',
            findCreditPage: 'creditManage/findCreditPage'
        }),
        onStartChange (val) {
            this.queryParams.minEndTime = val
        },
        onEndChange (val) {
            this.queryParams.maxEndTime = val
        },
        handleChangeStart (val) {
            this.queryParams.firstLevelStartTime = val
        },
        handleChangeEnd (val) {
            this.queryParams.firstLevelEndTime = val
        },
        onRest () {
            this.queryParams = { ...this.copyParms }
            this.searchList()
        },
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.searchList()
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.searchList()
        },
        async searchList () {
            this.queryParams.jobNumber = this.userInfo.jobNumber
            this.queryParams.authCode = sessionStorage.getItem('authCode') ? JSON.parse(sessionStorage.getItem('authCode')) : ''
            const { ...params } = this.queryParams
            await this.findCreditManager(params)
            this.tableData = this.creditdata.records || []
            this.paginationInfo = {
                pageNumber: this.creditdata.current,
                pageSize: this.creditdata.size,
                total: this.creditdata.total
            }
        },
        async onGetbranch () {
            await this.findCrmdeplist({ deptType: 'F', pkDeptDoc: this.userInfo.pkDeptDoc, jobNumber: this.userInfo.jobNumber, authCode: sessionStorage.getItem('authCode') ? JSON.parse(sessionStorage.getItem('authCode')) : '' })
            this.branchArr = this.crmdepList
        },
        onDrawerinfo (val) {
            this.$refs.creditdrawer.onShowDrawerinfn(val)
        },
        onLinkCom (val) {
            this.$router.push({ path: '/goodwork/authenlist', query: { name: val.companyName } })
        },
        onLookproject (row) {
            this.$router.push({ path: '/goodwork/creditApprove', query: { companyId: row.companyId } })
        },
        onEditproject (row) {
            this.$router.push({ path: '/goodwork/creditDetail', query: { companyId: row.companyId, documentStatus: row.documentStatus } })
        }
    },
    activated () {
        this.searchList()
    },
    // beforeRouteEnter (to, from, next) {
    //     newCache('creditManage')
    //     next()
    // },
    // beforeRouteLeave (to, from, next) {
    //     console.log(to.name)
    //     if (to.name != 'creditDetail') {

    //     } else if (to.name != 'creditApprove') {

    //     } else {
    //         clearCache('creditManage')
    //     }
    //     next()
    // },
    beforeUpdate () {
        newCache('creditManage')
    }
}
</script>
<style lang="scss" scoped>
.colred {
    color: #ff7a45;
}
.colgry {
    color: #62b439;
}
.eltagtop {
    margin-bottom: 10px;
}
</style>
