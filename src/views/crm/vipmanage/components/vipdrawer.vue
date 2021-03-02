<template>
    <div>
        <el-drawer title="详情" :visible.sync="drawer" :before-close="handleClose" size="50%">
            <div class="drawer-wrap">
                <div class="drawer-wrap_title">{{companyName}}</div>
                <div class="drawer-wrap_btn">
                    <div class="drawer-wrap_btn-flex">VIP签约信息</div>
                    <div class="drawer-wrap_btn-flex">
                        <!-- <h-button type="create" @click="onEditVip()" v-if="hosAuthCheck(auths.CRM_ADD_DETAIL)">新增签约</h-button> -->
                    </div>
                </div>
                <basicTable :tableData="tableData" :tableLabel="tableLabel" :isMultiple="false" :isAction="true" :isShowIndex='true' :maxHeight=500>
                    <template slot="assignedUserName" slot-scope="scope">
                        {{scope.data.row.assignedUserName}} {{scope.data.row.assignedUserMobile}}
                    </template>

                    <template slot="status" slot-scope="scope">
                        <span :class="scope.data.row.status==1?'green':''">{{scope.data.row.status==1?'生效':scope.data.row.status==0?'失效':'-'}}</span>
                    </template>
                    <template slot="action" slot-scope="scope">
                        <h-button v-if="scope.data.row.contractId" table @click="onLookContract(scope.data.row.contractId)" >查看合同</h-button>
                    </template>
                    <!-- <template slot="action" slot-scope="scope">
                        <h-button table @click="onEditVip(scope.data.row.id)" v-if="hosAuthCheck(auths.CRM_EDIT_DETAIL)">修改</h-button>
                    </template> -->
                </basicTable>
            </div>
            <div class="drawer-footer">
                <div class="drawer-button">
                    <h-button @click="handleClose">取消</h-button>
                </div>
            </div>
        </el-drawer>
        <el-dialog title="签约" :visible.sync="dialogVisible" width="40%" :before-close="onCloseDrawer" :close-on-click-modal=false>
            <el-form :model="vipForm" :rules="rules" ref="vipForm" label-width="150px" class="demo-vipForm el-dialog__form">
                <el-form-item label="签约人（员工）：" prop="assignedUserId" ref="assignedUserId">
                    <el-autocomplete v-model="stateN" :fetch-suggestions="querySearchAsync" placeholder="请输入员工" :trigger-on-focus="false" @select="handleSelect">
                        <template slot-scope="{ item }">
                            <div class="autoflex">
                                <div class="name">{{ item.psnname }}</div>
                                <div class="addr">{{ item.mobile }}</div>
                            </div>
                        </template>
                    </el-autocomplete>
                </el-form-item>
                <el-form-item label="签约时间：" prop="signTime">
                    <el-date-picker v-model="vipForm.signTime" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="签约时间" :picker-options="pickerOptionsStart" type="date">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="签约年份：" prop="signYear">
                    <el-date-picker v-model="vipForm.signYear" type="year" value-format="yyyy" format="yyyy" :picker-options="pickerOptionsEnd" placeholder="选择签约年份">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="VIP等级：" prop="vipRuleId">
                    <el-select v-model="vipForm.vipRuleId" placeholder="请选择" :clearable=true>
                        <el-option :label="item.vipRule" :value="item.id" v-for="item in vipLevel" :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="次年服务费折扣：" prop="serviceFeeDiscount">
                    <el-input-number :value='vipForm.serviceFeeDiscount*10' @input="(val)=>{vipForm.serviceFeeDiscount=val*0.1}" controls-position="right" :min="0" :max="10" :precision=1></el-input-number>&nbsp; 折
                    <!-- <el-input v-model="vipForm.serviceFeeDiscount" maxlength='1' v-isNum:6="vipForm.serviceFeeDiscount"> <template slot="append"></template></el-input> -->
                </el-form-item>
                <el-form-item label="VIP目标：" prop="vipTarget">
                    <el-input v-model="vipForm.vipTarget" v-isNum:6> <template slot="append">万元</template></el-input>
                </el-form-item>
                <el-form-item label="说明" prop="">
                    <el-input type="textarea" v-model="vipForm.remark" maxlength="200" show-word-limit :rows="6"></el-input>
                </el-form-item>
                <el-form-item label="附件：" prop="" ref="projectUpload">
                    <OssFileHosjoyUpload v-model="vipForm.projectUpload" accept='.jpeg,.jpg,.png,.xls,.xlsx,.pdf,.docx,.doc,.ppt' :fileSize='2' :fileNum='9' :action='action' :uploadParameters='uploadParameters'>
                    </OssFileHosjoyUpload>
                    <p>2M以内，支持png、jpg，jpeg，pdf，excel、word、ppt等格式</p>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <h-button @click="onCloseDrawer">取消</h-button>
                <h-button type="primary" @click="submitForm()" :loading=isloading>{{isloading?'提交中...':'提交'}}</h-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import moment from 'moment'
import OssFileHosjoyUpload from '@/components/OssFileHosjoyUpload/OssFileHosjoyUpload'
import { ccpBaseUrl } from '@/api/config'
import { mapActions, mapGetters } from 'vuex'
import { postCompanyvip, putCompanyvip } from '../api/index'
import * as auths from '@/utils/auth_const'
export default {
    name: 'vipdrawer',
    data () {
        return {
            auths,
            moment,
            drawer: false,
            isloading: false,
            queryParams: {
                companyId: ''
            },
            companyName: '',
            tableData: [],
            tableLabel: [
                { label: '签约年份', prop: 'signYear' },
                { label: '信用评级', prop: 'vipCreditLevel' },
                { label: '服务费（%）', prop: 'vipServiceFee', width: '120px' },
                { label: '可代采额度（万元）', prop: 'vipPurchaseQuota', formatters: 'money', width: '120px' },
                { label: '单项目单笔最高金额（万元）', prop: 'vipObjectMaxAmount', width: '120px', formatters: 'money' },
                // { label: 'VIP等级', prop: 'vipRule' },
                // { label: 'VIP折扣（折）', prop: 'serviceFeeDiscount' },
                { label: 'VIP目标(万元)', prop: 'vipTarget', formatters: 'money' },
                { label: '次年服务费折扣（折）', prop: 'serviceFeeDiscount', width: '120px' },
                { label: '预付款比例（%）', prop: 'advancePaymentProportion' },
                { label: '签约人', prop: 'assignedUserName', width: '150' },
                { label: '签约时间', prop: 'signTime', formatters: 'date' },
                { label: '状态', prop: 'status' }
            ],
            dialogVisible: false,
            rules: {
                assignedUserId: [
                    { required: true, message: '请选择签约人', trigger: 'blur' }
                ],
                signTime: [
                    { required: true, message: '请选择签约时间', trigger: 'change' }
                ],
                signYear: [
                    { required: true, message: '请选择签约年份', trigger: 'change' }
                ],
                vipRuleId: [
                    { required: true, message: '请选择VIP等级', trigger: 'change' }
                ],
                serviceFeeDiscount: [
                    { required: true, message: '请输入次年服务费折扣', trigger: 'blur' },
                    {
                        validator: (r, v, callback) => {
                            if (!this.vipForm.serviceFeeDiscount && this.vipForm.serviceFeeDiscount !== 0) {
                                return callback(new Error('请输入次年服务费折扣'))
                            }
                            return callback()
                        }
                    }
                ],
                vipTarget: [
                    { required: true, message: '请输入VIP目标', trigger: 'blur' },
                    {
                        validator: (r, v, callback) => {
                            if (parseFloat(this.vipForm.vipTarget) > 100000000) {
                                return callback(new Error('VIP目标不得大于1千万'))
                            }
                            return callback()
                        }
                    }
                ]
            },
            vipForm: {
                id: '',
                signTime: '',
                serviceFeeDiscount: 0,
                signYear: '',
                vipRule: '',
                vipTarget: '',
                companyName: '',
                attachFile: '',
                assignedUserId: '',
                assignedUserMobile: '',
                projectUpload: []
            },
            copyVip: {},
            newVipForm: {},
            action: ccpBaseUrl + 'common/files/upload-old',
            uploadParameters: {
                updateUid: '',
                reservedName: false
            },
            stateN: '',
            stateItem: {}
        }
    },
    components: {
        OssFileHosjoyUpload
    },
    watch: {
        'stateN' (val) {
            console.log(this.stateItem.psnname, val)
            if (JSON.stringify(this.stateItem) == '{}') {
                return false
            } else if (this.stateItem.psnname !== val) {
                console.log(3, val, this.stateItem)
                this.vipForm.assignedUserId = ''
            }
        },
        'vipForm.assignedUserId' (val) {
            console.log(val)
            this.$nextTick(() => {
                if (val) this.$refs['assignedUserId'].clearValidate()
            })
        }
    },
    computed: {
        ...mapGetters({
            vipDetail: 'vipManage/vipDetail',
            vipPagedetail: 'vipManage/vipPagedetail',
            vipLevel: 'vipManage/vipLevel',
            contracts: 'vipApply/contracts'
        }),
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    return time.getTime() > new Date().getTime()
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    return time.getFullYear() < new Date().getFullYear()
                }
            }
        }
    },
    mounted () {
        this.copyVip = { ...this.vipForm }
    },
    methods: {
        ...mapActions({
            findVippage: 'vipManage/findVippage',
            findPagedetail: 'vipManage/findPagedetail',
            findContract: 'vipApply/findContract'
        }),
        onLookContract (id) {
            this.$router.push({ path: '/goodwork/contractSigningManagementDetail', query: { id: id } })
        },
        async onShowDrawerinfn (companyId, companyName) {
            this.queryParams.companyId = companyId
            this.companyName = companyName
            await this.findVippage(this.queryParams)
            this.tableData = this.vipDetail.companyVipList
            this.drawer = true
        },
        handleClose () {
            this.drawer = false
        },
        async onEditVip (val) {
            if (val) {
                this.stateN = ''
                await this.findPagedetail(val)
                this.vipForm = { ...this.vipPagedetail }
                this.vipForm.projectUpload = this.vipForm.attachFile ? JSON.parse(this.vipForm.attachFile) : []
                this.newVipForm = { ...this.vipForm }
                this.stateN = this.vipForm.assignedUserName
                this.stateItem.psnname = this.vipForm.assignedUserName
                console.log(this.newVipForm)
            } else {
                this.stateN = ''
                this.vipForm = { ...this.copyVip }
                this.vipForm.projectUpload = this.vipForm.attachFile ? JSON.parse(this.vipForm.attachFile) : []
                this.newVipForm = { ...this.vipForm }
            }
            this.dialogVisible = true
            this.$nextTick(() => {
                this.$refs.vipForm.clearValidate()
            })
        },
        submitForm () {
            this.isloading = true
            this.vipForm.attachFile = JSON.stringify(this.vipForm.projectUpload)
            // console.log(parseFloat(this.vipForm.serviceFeeDiscount) * 0.01, parseFloat(this.vipForm.serviceFeeDiscount))
            this.$refs.vipForm.validate(async (valid) => {
                if (valid) {
                    try {
                        if (this.vipForm.id) {
                            await putCompanyvip(this.vipForm)
                        } else {
                            this.vipForm.companyId = this.queryParams.companyId
                            await postCompanyvip(this.vipForm)
                        }
                        this.dialogVisible = false
                        this.isloading = false
                        this.$message({
                            message: `数据提交成功`,
                            type: 'success'
                        })
                        await this.findVippage(this.queryParams)
                        this.tableData = this.vipDetail.companyVipList
                        this.$emit('backEvent')
                    } catch (error) {
                        this.isloading = false
                    }
                } else {
                    this.isloading = false
                }
            })
        },
        onCloseDrawer () {
            // delete this.newVipForm.projectUpload
            // delete this.vipForm.projectUpload
            if (JSON.stringify(this.newVipForm) !== JSON.stringify(this.vipForm)) {
                this.$confirm('取消则不会保存修改的内容，你还要继续吗?', '是否确认取消修改', {
                    distinguishCancelAndClose: true,
                    cancelButtonText: '确认取消',
                    confirmButtonText: '返回'
                }).catch(action => {
                    if (action === 'cancel') {
                        this.dialogVisible = false
                    }
                })
            } else {
                this.dialogVisible = false
            }
        },
        async querySearchAsync (queryString, cb) {
            this.queryString = queryString
            if (queryString) {
                await this.findContract(queryString)
                var restaurants = this.contracts
                var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
                clearTimeout(this.timeout)
                this.timeout = setTimeout(() => {
                    cb(results)
                }, 3000 * Math.random())
            }
        },
        createStateFilter (queryString) {
            return (state) => {
                return (state.psnname.indexOf(queryString) === 0)
            }
        },
        handleSelect (item) {
            this.stateN = item.psnname
            this.stateItem = item
            this.vipForm.assignedUserId = item.psncode
        }
    }
}
</script>

<style lang="scss" scoped>
/deep/ .el-drawer__body {
    overflow-y: scroll;

    // position: relative;
}
/deep/.el-dialog__form {
    height: 500px;
    overflow-y: scroll;
}
.drawer-wrap {
    padding: 0 10px;
    &_title {
        background: #efeeee;
        height: 40px;
        line-height: 40px;
        margin-bottom: 10px;
        padding-left: 10px;
    }
    &_btn {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 50px;
        &-flex {
            flex: 1;
            &:nth-child(1) {
                color: #ff7a45;
            }
            &:nth-child(2) {
                text-align: right;
            }
        }
    }
    p {
        margin-top: 25px;
        font-size: 14px;
    }
    .green {
        color: #62b439;
    }
}
.drawer-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 12px 24px;
    border-top: 1px solid #e5e5ea;
    background: #fff;
    z-index: 1000;
    button {
        flex: 1;
    }
    .drawer-button {
        text-align: right;
    }
}

/deep/.el-dialog .el-input {
    width: 100%;
}
/deep/.el-form .el-input:not(:first-child) {
    margin-left: 0;
}
.autoflex {
    display: flex;
    justify-content: space-between;
}
</style>
