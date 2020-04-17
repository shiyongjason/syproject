<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <h2>2019年线下台账导入</h2>
            <div class="query-cont-col">
                <a class="downloadExcel" href="/excelTemplate/资金台账-还款信息导入模板.xls" download="资金台账-还款信息导入模板.xls">
                    还款明细表模板导出
                </a>
            </div>
            <div class="query-cont-col">
                <a class="downloadExcel" href="/excelTemplate/资金台账-借款信息导入模板.xlsx" download="资金台账-借款信息导入模板.xlsx">
                    借款模板导出
                </a>
            </div>
            <div class="query-cont-col">
                <el-upload class="upload-demo" :show-file-list="false" :headers='headersData' :action="interfaceUrl + 'backend/api/account/import'" :on-success="isSuccess" :on-error="isError" :before-upload="handleUpload" auto-upload>
                    <el-button type="primary" class='m0' :loading='loading'>
                        借款信息导入
                    </el-button>
                </el-upload>
            </div>
            <div class="query-cont-col">
                <el-upload class="upload-demo" :show-file-list="false" :headers='headersData' :action="interfaceUrl + 'backend/api/account/repay/import'" :on-success="isSuccess" :on-error="isError" :before-upload="handleUpload" auto-upload>
                    <el-button type="primary" class="m0" :loading='loading'>
                        还款明细表信息导入
                    </el-button>
                </el-upload>
            </div>

            <h2>注资占用</h2>
            <div class="query-cont-col">
                <a class="downloadExcel" href="/excelTemplate/注资信息导入.xls" download="注资信息导入.xls">
                    注资模板导出
                </a>
            </div>
            <div class="query-cont-col">
                <el-upload class="upload-demo" :show-file-list="false" :headers='headersData' :action="interfaceUrl + 'backend/api/efficiency/import'" :on-success="isSuccess" :on-error="isError" :before-upload="handleUpload" auto-upload>
                    <el-button type="primary" class="m0" :loading='loading'>
                        注资信息导入
                    </el-button>
                </el-upload>
            </div>
        </div>
    </div>
</template>

<script>
import { interfaceUrl } from '@/api/config'
import { mapState } from 'vuex'
export default {
    name: 'brandSale',
    data: function () {
        return {
            interfaceUrl: interfaceUrl,
            accept: '.xlsx,.xls',
            loading: false,
            headersData: {
                'refreshToken': sessionStorage.getItem('refreshToken'),
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    methods: {
        isSuccess (response) {
            this.$message({
                message: '批量导入成功！',
                type: 'success'
            })
            this.loading = false
            this.onSearch()
        },
        isError (response) {
            this.$message({
                message: '批量导入失败，' + JSON.parse(response.message).message,
                type: 'error'
            })
            this.loading = false
        },
        handleUpload (file) {
            console.log(file)
            console.log(file.name.lastIndexOf('.'))
            console.log(file.name.substring(file.name.lastIndexOf('.')))
            // TODO: 目前只有一个文件,待优化
            if (file.size / (1024 * 1024) > 100) {
                this.$message({
                    message: '附件要保持100M以内',
                    type: 'warning'
                })
                return false
            }
            const fileSuffix = file.name.substring(file.name.lastIndexOf('.'))
            if (this.accept.lastIndexOf(fileSuffix) == -1) {
                this.$message.error('格式不正确！')
                return false
            }
            this.loading = true
        }
    },
    async mounted () {

    }
}
</script>

<style lang="scss" scoped>
.downloadExcel {
    padding: 12px 20px;
    border-radius: 4px;
    background-color: #ff7a45;
    color: #fff;
}
</style>
