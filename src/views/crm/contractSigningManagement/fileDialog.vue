<template>
    <div>
        <el-dialog title="归档该合同" :visible.sync="fileDialog" width="40%" :close-on-click-modal="false" :before-close="()=>{fileDialog=false}">
            <div class="file_scroll">
                <div>(请上传双方盖章后的采购合同或采购明细附件，上传格式为PDF，单个文件最大允许20M )</div>
                <div class="file_tit"><i>*</i>上传合同附件：</div>
                <HosJoyUpload v-model="riskCheckProjectDocPos" :showPreView=false :fileSize=20 :action='action' :uploadParameters='uploadParameters' @successCb="()=>{handleSuccessCb()}" style="margin:10px 0 0 5px">
                    <el-button type="primary"><i class="el-icon-upload file-icon"></i>上 传 文 件</el-button>
                </HosJoyUpload>
                <div class="file_box"><i class="el-icon-paperclip"></i><span>ff6600ppppppppppppppp.png</span>
                    <em>预览</em>
                    <em>删除</em>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="onCancelFileDialog">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import HosJoyUpload from '@/components/HosJoyUpload/HosJoyUpload'
import { ccpBaseUrl } from '@/api/config'

export default {
    components: { HosJoyUpload },
    data () {
        return {
            action: ccpBaseUrl + 'common/files/upload-old',
            uploadParameters: {
                updateUid: '',
                reservedName: false
            },
            fileDialog: false
        }
    },
    methods: {
        onGetfile () {
            // 新增归档 操作
            this.fileDialog = true
        },
        onCancelFileDialog () {
            this.fileDialog = false
        },
        onDelete (item, index) {
            console.log(item)
            this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                item.riskCheckProjectDocPos.splice(index, 1)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
            }).catch(() => {
                // do nothing
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.file_tit {
    margin-top: 15px;
    i {
        color: red;
    }
}
.file-icon {
    font-size: 18px;
    margin: 0 !important;
    line-height: 24px !important;
    color: #fff;
}
.file_scroll {
    height: 400px;
    overflow-y: scroll;
}
.file_box {
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
    }
}
</style>