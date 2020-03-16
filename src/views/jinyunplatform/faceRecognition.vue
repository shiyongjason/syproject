<template>
    <div class="tags-wrapper page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <h3>人脸识别验证</h3>
            </div><br>
            <div class="query-cont-col">
                <div class="query-col-title">姓名：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="50" v-model="queryParams.name" placeholder="请输入姓名">
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">身份证号：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="50" v-model="queryParams.idCardNumber" placeholder="请输入身份证号">
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onSearch">搜索</el-button>
                </div>
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onReset">重置</el-button>
                </div>
            </div>
            <basicTable :tableLabel="tableLabel" :tableData="tableData" :pagination='pagination' @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true" isShowIndex>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="onupdate(scope.data.row)">确认认证</el-button>
                </template>
            </basicTable>
            <el-dialog title="人脸识别确认验证详情页" :visible.sync="dialogPicture" width='50%' :close-on-click-modal='false'>
                <div class="detail">
                    <div class="title">身份证验证</div>
                    <el-row :gutter="10">
                        <el-col :span="12"><span class="detail-name">姓名：</span>{{formFace.name}}</el-col>
                        <el-col :span="12"><span class="detail-name">身份证号码：</span>{{formFace.number}}</el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="12"><span class="detail-name">性别：</span>{{formFace.gender}}</el-col>
                        <el-col :span="12"><span class="detail-name">民族：</span>{{formFace.nation}}</el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="12"><span class="detail-name">生日：</span>{{formFace.birthday}}</el-col>
                        <el-col :span="12">
                            <span class="detail-name">地址：</span>
                            <span>{{formFace.address}}</span>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="12"><span class="detail-name">身份证正来源：</span>{{formFace.frontTypeN}}</el-col>
                        <el-col :span="12"><span class="detail-name">身份证反来源：</span>{{formFace.backTypeN}}</el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="12"><span class="detail-name">身份证正面照：</span>
                            <a :href="formFace.frontPhoto" target='_blank'>
                                <img class="idImg" :src="formFace.frontPhoto" alt="">
                            </a>
                        </el-col>
                        <el-col :span="12"><span class="detail-name">身份证反面照：</span>
                            <a :href="formFace.backPhoto" target='_blank'>
                                <img class="idImg" :src="formFace.backPhoto" alt="">
                            </a>
                        </el-col>
                    </el-row>
                    <div class="bot"></div>
                    <div class="title">人脸识别验证</div>
                    <el-row :gutter="10">
                        <el-col :span="12"><span class="detail-name">人脸认证视频：</span>
                            <video id="video" width="320" height="240" controls>
                                <!--                                <source :src="formFace.faceVideo" type="video/mp4">-->
                                您的浏览器不支持 HTML5 video 标签。
                            </video>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="12"><span class="detail-name">人脸对比得分：</span>{{formFace.faceScore}}</el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="12"><span class="detail-name">人脸认证结果：</span>
                            {{formFace.faceVerification ? '通过认证' : '未通过认证'}}
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="12"><span class="detail-name">人工验证：</span>
                            <el-button type="primary" @click="onPass">验证通过</el-button>
                            <el-button type="primary" @click="dialogPicture = false">取消验证</el-button>
                        </el-col>
                    </el-row>
                </div>
                <!-- <span slot="footer" class="dialog-footer">
                    <el-button @click="onCancle">取 消</el-button>
                </span> -->
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { getRecognitions, getRecognitionsDetail, artifVali } from './api/index'
import { tableLabelFaceRecognition } from './const'
export default {
    name: 'faceRecognition',
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            pagination: state => state.jinyunplatform.pagination
        }),
        ...mapGetters({
            tableData: 'jinyunplatform/tableLabelFaceRecognition',
        })
    },
    data () {
        return {
            tableLabel: tableLabelFaceRecognition,
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                idCardNumber: '',
                name: ''
            },
            searchParams: {},
            dialogPicture: false,
            formFace: {}
        }
    },
    mounted () {
        this.onSearch()
    },
    methods: {
        ...mapActions({
            getRecognitions: 'jinyunplatform/getRecognitions'
        }),
        tracking (event) {
            this.$store.dispatch('tracking', {
                type: 9,
                event,
                page: 5,
                page_name: '人脸识别',
                page_path_name: 'faceRecognition'
            })
        },
        async onQuery () {
            this.getRecognitions(this.queryParams)
        },
        onSearch (val) {
            this.tracking(2)
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        onReset () {
            this.$set(this.queryParams, 'idCardNumber', '')
            this.$set(this.queryParams, 'name', '')
            this.onSearch()
        },
        onCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        onSizeChange (val) {
            this.queryParams.pageSize = val
            this.onQuery()
        },
        async onupdate (row) {
            const { data } = await getRecognitionsDetail(row)
            this.formFace = data
            if (this.formFace.frontType == 'normal') this.formFace.frontTypeN = '正常拍摄'
            else if (this.formFace.frontType == 'photocopy') this.formFace.frontTypeN = '复印件'
            else if (this.formFace.frontType == 'photocopy') this.formFace.frontTypeN = '复印件'
            else if (this.formFace.frontType == 'reversion') this.formFace.frontTypeN = '屏幕翻拍'
            else if (this.formFace.frontType == 'other') this.formFace.frontTypeN = '其他'
            else if (this.formFace.frontType == 'unknown') this.formFace.frontTypeN = '未知（识别失败）'
            else if (this.formFace.frontType == 'ps') this.formFace.frontTypeN = 'PS'
            else this.formFace.frontTypeN = '不知名错误'
            if (this.formFace.backType == 'normal') this.formFace.backTypeN = '正常拍摄'
            else if (this.formFace.backType == 'photocopy') this.formFace.backTypeN = '复印件'
            else if (this.formFace.backType == 'photocopy') this.formFace.backTypeN = '复印件'
            else if (this.formFace.backType == 'reversion') this.formFace.backTypeN = '屏幕翻拍'
            else if (this.formFace.backType == 'other') this.formFace.backTypeN = '其他'
            else if (this.formFace.backType == 'unknown') this.formFace.backTypeN = '未知（识别失败）'
            else if (this.formFace.backType == 'ps') this.formFace.backTypeN = 'PS'
            else this.formFace.backTypeN = '不知名错误'
            // console.log(this.formFace)
            this.dialogPicture = true
            // 动态修改视频地址
            this.$nextTick(() => {
                let vdo = document.getElementById('video')
                vdo.src = data.faceVideo
                vdo.play()
            })
        },
        async onPass () {
            this.tracking(7)
            const params = {
                id: this.formFace.id,
                updateBy: this.userInfo.jobNumber // 员工工号
            }
            await artifVali(params)
            this.dialogPicture = false
            this.onQuery()
        }
    }
}
</script>

<style lang='scss' scoped>
.detail {
    font-size: 14px;
    padding-bottom: 10px;
    .title {
        font-weight: 700;
        padding: 10px 0;
    }
    .bot {
        padding: 10px 0;
        border-bottom: 1px solid #999999;
    }
    .detail-name {
        padding-bottom: 5px;
        display: inline-block;
        vertical-align: top;
        width: 120px;
        text-align: right;
    }
    .idImg {
        width: 200px;
        height: 200px;
    }
    #video {
        margin-left: 120px;
        user-select: none;
    }
}
/deep/ .el-dialog {
    min-width: 720px;
}
.dialogLayout {
    padding: 20px 24px;
}
/deep/ .el-dialog__body {
    min-height: 256px;
    max-height: 600px;
    overflow: scroll;
}
.add-tags-dialog {
    padding-top: 20px;
}
.el-dialog .el-input {
    width: 300px;
}
</style>
