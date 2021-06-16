<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="batch">
                <div class="batch_tit">批量确认账单</div>
                <div class="batch_msg mb20"><i>*</i>经销商：四川宏力达机电安装工程有限公司</div>
                <HosjoyTable localName="V1.*" ref="hosjoyTable" align="center"  :column="tableLabel"
                 :data="tableData" >
                </HosjoyTable>
                <div class="batch_msg">支付凭证：</div>
                <p>（最多支持上传数量为20个文件，单个文件大小不超过20M，上传格式为JPG/JPEG/PNG等主流格式图片）</p>

                <div class="batch_bot">
                    <span>待确认总金额(元)：20,000,000.00</span>
                    <div>
                    <el-button type="primary" @click="onNoReceived">并未收到</el-button>
                    <el-button type="primary" @click="onReceived">确认收到</el-button>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
import HosjoyTable from '@/components/HosJoyTable/hosjoy-table.vue'
import HosJoyUpload from '@/components/HosJoyUpload/HosJoyUpload.vue'
import { ccpBaseUrl } from '@/api/config'
import { getFundsPayBatch, payReceived, payNoReceived } from './api/index'
export default {
    name: 'batchpay',
    components: { HosjoyTable },
    data () {
        return {
            fileDialog: false,
            docPos: [],
            tableLabel: [
                { label: '姓名', prop: 'signerName' },
                { label: '手机号', prop: 'signerType', dicData: [{ value: 1, label: '企业' }, { value: 2, label: '个人' }] },
                { label: '所属分部', prop: 'paramGroupName' }
            ],
            tableData: [],
            queryParams: {
                pageSize: 10,
                pageNumber: 1,
                companyId: ''
            },
            paginationInfo: {

            }
        }
    },
    methods: {
        async onGetList () {
            this.queryParams.companyId = ''
            const { data } = await getFundsPayBatch()
        },
        onNoReceived () {
            this.$confirm('确定后，当前页面所有账单的状态将置为「支付失败」，重新上传', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await payNoReceived()
            }).catch(() => {
            })
        },
        onReceived () {
            this.$confirm('确定后，当前页面所有账单的状态将置为「已支付」，重新上传', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await payReceived()
            }).catch(() => {
            })
        }
    },
    mounted () {
        this.onGetList()
    }
}
</script>
<style lang="scss" scoped>
.batch {
    position: relative;
    width: 100%;
    &_tit {
        font-size: 18px;
    }
    &_msg {
        margin-top: 20px;
        i {
            color: red;
        }
    }
    p {
        color: #909399;
    }
    &_files {
        margin: 10px 0 0 0;
        display: flex;
        i {
            font-size: 18px;
            margin: 0 !important;
            color: #ff6600;
            padding-right: 5px;
        }
        span {
            width: 250px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: #ff6600;
        }
        em {
            display: block;
            font-style: normal;
            margin-left: 10px;
            color: #169bd5;
            cursor: pointer;
        }
    }
    &_bot {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        padding: 20px 0 ;
        border-top:1px solid #e5e5e5;
        span{
            font-size: 25px;
        }
    }
}
.file-icon {
    font-size: 18px;
    margin: 0 !important;
    line-height: 24px !important;
    color: #fff;
}
</style>