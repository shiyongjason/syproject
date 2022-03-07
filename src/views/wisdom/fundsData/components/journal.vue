<template>
    <div class="journal">
        <div class="journal-wrap" v-for="(item,index) in journalList" :key="index">
            <div class="journal-wrap_box">
                <span>状态：{{AuditStatus.get(item.auditStatus)}}</span>
                <el-button size="mini" type="primary" @click="onExamine(item.id)" v-if="item.auditStatus==1&&hosAuthCheck(WISDOM_LIST_SHENHE)">审核</el-button>
                <span  v-if="item.auditStatus!=1">审核备注：{{item.auditSpec}}</span>
            </div>
             <div class="journal-wrap_box" v-if="item.auditStatus!=1">
                <span>审核时间：{{moment(item.auditTime).format('YYYY-MM-DD HH:mm')}}</span>
                <span>审核人：{{item.auditBy}}</span>
            </div>
            <div class="journal-wrap_box">
                <span>申请时间：{{moment(item.createTime).format('YYYY-MM-DD HH:mm')}}</span>
                <span>申请人：{{item.createBy}}</span>
            </div>
            <div class="journal-wrap_box">
                内容：<ul>
                    <li v-for="(v,i) in item.contentList" :key="i">
                        <b style="font-weight:400;color:red">{{v.category}}：</b>
                        <template>{{v.desc}} 把 “<b style="font-weight:400;color:#409eff">{{v.oldValue}}</b>” 修改为 “<b style="font-weight:400;color:#409eff">{{v.newValue}}</b>”</template>
                    </li>
                </ul>
            </div>
        </div>
        <div class="block" v-if="journalList.length>0">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"  :page-sizes="[10,20]" layout="total, sizes, prev, pager, next, jumper" :total="page.total"
             :current-page="queryParams.pageNumber" :page-size="queryParams.pageZise"  >
            </el-pagination>
        </div>
        <el-dialog title="审核意见" :visible.sync="dialogVisible" width="30%" :modal-append-to-body=false :before-close="handleClose">
            <el-form ref="examineForm" :model="examineForm" :rules="examineRules" label-width="100px">
                <el-form-item label="审核结果" prop="approved">
                    <el-radio-group v-model="examineForm.approved">
                        <el-radio label=true>
                            审核通过
                        </el-radio>
                        <el-radio label=false>审核不通过</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="备注原因" prop="auditSpec">
                    <el-input type="textarea" v-model="examineForm.auditSpec"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onHandleSubmit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script lang='tsx'>
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { findAccountRecords, updateAccountRecords } from '../api/index'
import moment from 'moment'
import { WISDOM_LIST_SHENHE } from '@/utils/auth_const'
const AuditStatus = new Map([[1, '待审核'], [2, '审核通过'], [3, '审核未通过']])

@Component({
    name: 'journal'
})
export default class Journal extends Vue {
    @Prop({ default: false }) private isLevel !: boolean
    $refs!: {
        form: HTMLFormElement;
    };
    WISDOM_LIST_SHENHE = WISDOM_LIST_SHENHE
    AuditStatus = AuditStatus
    page = {
        total: 0
    }
    moment= moment
    private dialogVisible = false
    queryParams={
        accountId: '',
        pageSize: 10,
        pageNumber: 1
    }
    examineForm:Record<any, any> = {
        auditSpec: '',
        approved: '',
        id: ''
    }
    journalList:any[] = []

    get examineRules () {
        return {
            auditSpec: [
                { required: true, message: '请输入审核意见', trigger: 'blur' }
            ],
            approved: [
                { required: true, message: '请输入审核结果', trigger: 'change' }
            ]
        }
    }

    // emit 事件 装饰
    // @Emit()
    getName (val) {
        console.log('val: ', val)
        this.queryParams.accountId = val.account_id
        this.getList()
    }

    async getList () {
        const { data } = await findAccountRecords(this.queryParams)
        this.journalList = data.records
        this.page.total = data.total
        this.journalList.map(item => {
            // 排除掉oldValue为数组的部分
            const contentList = item.contentList.filter(fItem => !Array.isArray(fItem.oldValue))
            // 将数组拍平
            let flatArr = []
            item.contentList.map(jtem => {
                if (Array.isArray(jtem.oldValue)) {
                    console.log(1122222)
                    flatArr = flatArr.concat(this.onDelayerData(jtem.oldValue, jtem.newValue))
                }
            })
            item.contentList = contentList.concat(flatArr)
            console.log('----------------------')
            console.log(flatArr)
            console.log(item.contentList)
            console.log('----------------------')
        })
        console.log('this.journalList: ', this.journalList)
    }

    public onExamine (val) {
        this.examineForm.id = val
        this.dialogVisible = true
    }

    onDelayerData (oldVal, newVal) {
        const result = []
        oldVal.forEach((item, index) => {
            item.forEach((n, i) => {
                n.newValue = newVal[index][i].newValue
                result.push(n)
            })
        })
        console.log(result)
        console.log('==========')
        return result
    }

    handleCurrentChange (val) {
        this.queryParams.pageNumber = val
        this.getList()
        console.log('val: ', val)
    }

    handleSizeChange (val) {
        this.queryParams.pageSize = val
        this.getList()
        console.log('val: ', val)
    }

    public handleClose () {
        this.dialogVisible = false
        this.examineForm.auditSpec = ''
    }

    async onHandleSubmit () {
        this.$refs['examineForm'].validate(async vaild => {
            if (vaild) {
                await updateAccountRecords(this.examineForm)
                this.dialogVisible = false
                this.$emit('backEvent')
            }
        })
    }

    mounted () {

    }
}
</script>
<style lang="scss" scoped>
.journal {
    &-wrap {
        span {
            margin-right: 40px;
        }
        position: relative;
        &::after {
            content: "";
            position: absolute;
            bottom: -10px;
            left: 0;
            right: 0;
            border-bottom: 1px solid #e5e5e5;
        }
        &_box {
            margin-bottom: 15px;
        }
    }
}
</style>