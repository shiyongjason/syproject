<template>
    <div class="page-body">
        <div class="page-body-cont">
            <div class="errormessage">
                <el-alert center title="资料待补充" effect="dark" style="background: #ff0000;height:40px" :closable='false' />
            </div>
            <div>
                <div class="firstclass">经销商</div>
                <div class="secondclass">
                    <div class="secondclass-title">
                        <span class="secondclass-start">*</span>
                        <font class="secondclass-title_font">三证正副本<span>待补充，点击查看原因</span></font>
                    </div>
                    <p class="secondclass-remark">备注：原则上工商局打印（工商章）</p>
                    <div class="secondclass-documents">
                        <p class="secondclass-documents_title">样例：</p>
                        <div class="secondclass-documents_case">
                            <div class="secondclass-documents_case_box">
                                <el-image style="width: 100px; height: 100px" src="https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg" :preview-src-list="srcList" />
                            </div>
                            <div class="secondclass-documents_case_box">
                                <el-image style="width: 100px; height: 100px" src="https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg" :preview-src-list="srcList" />
                            </div>
                            <div class="secondclass-documents_case_box">
                                <el-image style="width: 100px; height: 100px" src="https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg" :preview-src-list="srcList" />
                            </div>
                            <div class="secondclass-documents_case_box">
                                <el-image style="width: 100px; height: 100px" src="https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg" :preview-src-list="srcList" />
                            </div>
                        </div>
                        <p class="secondclass-documents_title">规定格式：复印件</p>
                        <div class="secondclass-documents_case_documents" v-for="(item,index) in dd" :key="index">
                            <p>
                                <span class="posrtv">
                                    <template v-if="item&&item.fileUrl">
                                        <i class="el-icon-document"></i>
                                        <a :href="item.fileUrl" target="_blank">
                                            <font>{{item.fileName}}</font>
                                        </a>
                                    </template>
                                </span>
                            </p>
                            <p style="flex:0.5">{{item.date}}</p>
                            <p>
                                <font class="fileItemDownLoad" @click="onDelete">删除</font>
                                <font class="fileItemDownLoad" v-if="item.fileName.toLowerCase().indexOf('.png') != -1||item.fileName.toLowerCase().indexOf('.jpg') != -1||item.fileName.toLowerCase().indexOf('.jpeg') != -1" @click="handleImgDownload(item.fileUrl, item.fileName)">下载</font>
                                <font v-else><a class='fileItemDownLoad' :href="item.fileUrl" target='_blank'>下载</a></font>
                            </p>
                        </div>
                        <div class="secondclass-documents_upload">
                            <hosjoyUpload :fileSize='20' :fileNum='100' v-model="upload" showAsFileName :action='action' :uploadParameters='uploadParameters'>
                                <el-button type="primary" style="width:130px">上传</el-button>
                            </hosjoyUpload>
                        </div>
                    </div>
                </div>
            </div>

            <!-- bottom button -->
            <div class="bottom-button">
                <p>
                    <el-button style="width:130px;" @click="onBack">返回</el-button>
                </p>
                <p>
                    <el-button type="primary" style="width:130px">保存</el-button>
                </p>
                <p>
                    <el-button type="primary" style="width:130px">提交</el-button>
                </p>
            </div>
        </div>
        <!--  -->
        <el-dialog title="补充原因" :visible.sync="dialogVisible" width="35%" center>
            <div class="dialog-box">
                <p>2020-04-28 打回操作人：张三</p>
                <p>待补充类目：三证正副本</p>
                <p>待补充原因：</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                    Namfermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.
                </p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { interfaceUrl } from '@/api/config'
import { handleImgDownload } from './utils'

export default {
    name: 'detail',
    components: {
        hosjoyUpload: () => import('@/components/HosJoyUpload/HosJoyUpload')
    },
    data () {
        return {
            handleImgDownload,
            dialogVisible: true,
            action: interfaceUrl + 'tms/files/upload',
            // 上传时附带的额外参数同el-upload 的 data
            uploadParameters: {
                updateUid: '',
                reservedName: true
            },
            upload: [],
            srcList: [
                'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
            ],
            dd: [
                { fileUrl: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg', fileName: '备注：原则上工商局打印（工商章）.jpg', date: '2020-05-22 14:29:00' }
            ]
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            // informationDetail: 'projectInformation/informationDetail'
        })
    },
    methods: {
        ...mapActions({
            // findProjectInformationDetail: 'projectInformation/findProjectInformationDetail'
        }),
        onDelete () {
            this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            })
        },
        onBack () {
            this.$confirm('如信息发生修改，退出后信息将不会保存', '确认退出', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$router.go(-1)
            }).catch(() => {
                // do nothing
            })
        }
    },
    mounted () {
        this.uploadParameters.updateUid = this.userInfo.employeeName
    }
}
</script>

<style lang="scss" scoped>
.firstclass {
    font-size: 23px;
    font-weight: bold;
    margin-bottom: 10px;
}
.secondclass {
    margin: 10px 0 40px 70px;
    font-weight: 700;
    &-title {
        display: flex;
        align-items: center;
    }
    &-start {
        margin: 0 15px 0 0;
        color: #ff0000;
        font-size: 16px;
    }
    &-title_font {
        font-size: 19px;
        display: flex;
        align-items: center;
        span {
            color: #fff;
            background: #ff0000;
            display: inline-block;
            margin-left: 15px;
            padding: 0 15px;
            border-radius: 5px;
            font-size: 14px;
            cursor: pointer;
        }
    }
    &-remark {
        font-size: 14px;
        margin: 10px 0;
    }
    &-documents_title {
        margin: 10px 0;
    }
    &-documents_case {
        display: flex;
        &_box {
            margin-right: 16px;
        }
        &_documents {
            display: flex;
            font-weight: normal;
            color: #504f4f;
            p {
                flex: 1;
            }
        }
    }
    &-documents_upload {
        width: 150px;
        margin-top: 5px;
    }
    .fileItemDownLoad {
        font-size: 12px;
        border-radius: 3px;
        padding: 8px 16px;
        color: #fff;
        background-color: #ff7a45;
        border-color: #ff7a45;
        display: block;
        line-height: 13px;
        float: left;
        height: 13px;
        cursor: pointer;
        margin-left: 10px;
    }
    .posrtv {
        position: relative;
        color: #ff7a45;
        a {
            color: #ff7a45;
            margin-left: 10px;
        }
        font {
            font-size: 14px;
        }
    }
}
.errormessage {
    margin-bottom: 15px;
}
.bottom-button {
    display: flex;
    width: 628px;
    margin-left: 50px;
    margin-top: 20px;
    p {
        flex: 1;
        margin-left: 20px;
    }
}
.dialog-box {
    margin-top: 10px;
    p {
        line-height: 2;
    }
}
</style>