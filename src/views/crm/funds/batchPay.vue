<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
    <div class="batch">
        <div class="batch_tit">批量支付账单</div>
        <div class="batch_msg mb20"><i>*</i>经销商：四川宏力达机电安装工程有限公司</div>
        <HosjoyTable localName="V1.*" ref="hosjoyTable" align="center" isShowselection @selectable="selectable" :column="tableLabel" :data="tableData"  :total="paginationInfo.total">
        </HosjoyTable>
        <div class="batch_msg"><i>*</i>对应账单的付款凭证：</div>
        <p>（最多支持上传数量为20个文件，单个文件大小不超过20M，上传格式为JPG/JPEG/PNG等主流格式图片）</p>
                <div class="batch_files" v-for="(item,index) in docPos" :key='index'>
                    <i class="el-icon-paperclip"></i><span>{{item.fileName}}</span>
                    <em> <a :href="item.fileUrl" target="_blank">预览</a></em>
                    <em @click="onDelete(item,index)">删除</em>
                </div>
        <HosJoyUpload v-model="docPos" :showPreView=false :fileSize=20 :action='action' :fileNum='20' :uploadParameters='uploadParameters' @successCb="()=>{handleSuccessCb()}" accept='.jpg,.png,.jpeg' style="margin:10px 0 0 5px">
            <el-button  size="medium" type="primary"><i class="el-icon-upload file-icon"></i>上 传 文 件</el-button>
        </HosJoyUpload>
    </div>
        </div>
    </div>
</template>
<script>
import HosjoyTable from '@/components/HosJoyTable/hosjoy-table.vue'
import HosJoyUpload from '@/components/HosJoyUpload/HosJoyUpload.vue'
import { ccpBaseUrl } from '@/api/config'
export default {
    name: 'batchpay',
    components: { HosjoyTable, HosJoyUpload },
    data () {
        return {
            action: ccpBaseUrl + 'common/files/upload-old',
            uploadParameters: {
                updateUid: '',
                reservedName: true
            },
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
                pageNumber: 1
            },
            paginationInfo: {

            }
        }
    },
    methods: {

    },
    mounted () {

    }
}
</script>
<style lang="scss" scoped>
.batch {
    &_tit{
        font-size: 18px;
    }
    &_msg{
        margin-top: 20px;
        i{
            color: red;
        }
    }
    p{
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
}
.file-icon {
    font-size: 18px;
    margin: 0 !important;
    line-height: 24px !important;
    color: #fff;
}
</style>