<template>
    <div class="collect-wrap">
        <el-form :model="colForm" :rules="rules" ref="colForm" class="demo-ruleForm">
            <div>
                <div class="collect-title">立项材料</div>
                <el-form-item label="" prop="type" label-width="30px">
                    <div class="collect-box">
                        <el-checkbox label="" name="type" size="medium"></el-checkbox>
                        <div class="collect-boxtxt">
                            <h3>三证正副本</h3>
                            <p>备注：原则上工商局打印（工商章）</p>
                            <p>规定格式：复印件</p>
                        </div>
                    </div>
                    <hosjoyUpload  v-model="fileList" showAsFileName :fileSize='100' :fileNum='100' :action='action' :uploadParameters='uploadParameters' @successCb="onSuccessCb('fileList','d-other')" style="margin-top:10px">
                        <el-button type="primary">上 传</el-button>
                    </hosjoyUpload>

                    <div class="collect-box">
                        <el-checkbox label="" name="type" size="medium"></el-checkbox>
                        <div class="collect-boxtxt">
                            <h3>三证正副本</h3>
                            <p>备注：原则上工商局打印（工商章）</p>
                            <p>规定格式：复印件</p>
                        </div>
                    </div>
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>
<script>
import hosjoyUpload from '@/components/HosJoyUpload/HosJoyUpload'
import { interfaceUrl } from '@/api/config'
export default {
    props: {
        // colForm: {
        //     type: Object,
        //     default: () => {}
        // }
    },
    components: {
        hosjoyUpload
    },
    data () {
        return {
            colForm: {},
            action: interfaceUrl + 'tms/files/upload',
            uploadParameters: {
                updateUid: '',
                reservedName: true
            },
            fileList: []
        }
    }
}
</script>
<style lang="scss" scoped>
.collect-wrap {
    padding: 0 10px 100px 10px;
}
.collect-title {
    font-size: 20px;
    color: #333333;
    border-bottom: 1px solid #e5e5e5;
    padding: 10px 0;
    font-weight: bold;
}
.collect-box {
    display: flex;
    .el-checkbox {
        margin-right: 10px;
    }
}
</style>