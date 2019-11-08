<template>
    <div class="business">
        <el-form-item label="工商登记时间：" prop="regTime" label-width='160px'>
            <el-date-picker v-if="isEdit" v-model="business.regTime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd" type="date" placeholder="请选择工商登记时间"></el-date-picker>
            <span v-else>{{business.regTime?formatDate(business.regTime):'-'}}</span>
        </el-form-item>
        <el-form-item label="工商状态：" prop="commercialStatus" label-width='150px'>
            <el-select v-if="isEdit" v-model="business.commercialStatus" clearable placeholder="请选择状态" style="margin:0 10px">
                <el-option label="存续" value="1"></el-option>
                <el-option label="吊销" value="2"></el-option>
                <el-option label="注销" value="3"></el-option>
                <el-option label="停业" value="4"></el-option>
                <el-option label="淘汰" value="5"></el-option>
            </el-select>
            <span style="margin-left:10px" v-else>
                {{
                    business.commercialStatus==='1'?'存续':business.commercialStatus==='2'?'吊销':business.commercialStatus==='3'?'注销':business.commercialStatus==='4'?'停业':business.commercialStatus==='5'?'淘汰':'-'
                }}
            </span>
        </el-form-item>
        <el-form-item label="工商登记最新股东：" prop="holderName" label-width='160px'>
            <el-input v-if="isEdit" v-model="business.holderName" placeholder="请输入姓名" maxlength='30'></el-input>
            <span v-else>{{business.holderName?business.holderName:'-'}}</span>
        </el-form-item>
        <el-form-item label="股东变更情况：" label-width='160px'>
            <el-input v-if="isEdit" v-model="business.holderChange" placeholder="变更情况描述" maxlength="200" show-word-limit  type='textarea' :rows="6" style="width:700px"></el-input>
            <span v-else>{{business.holderChange?business.holderChange:'-'}}</span>
        </el-form-item>
        <el-form-item label="工商登记注册资本：" prop="regCapital" label-width='160px' maxlength="200">
            <el-input v-if="isEdit" v-isNum="business.regCapital" v-model="business.regCapital" placeholder="请输入注册资本" maxlength='10'>
                <template slot="append">万</template>
            </el-input>
            <span v-else>{{business.regCapital?business.regCapital+'万':'-'}}</span>
        </el-form-item>
        <el-form-item label="资本变更情况：" label-width='160px'>
            <el-input v-if="isEdit" v-model="business.capitalChange" placeholder="资本变更情况描述" maxlength="200" show-word-limit  type='textarea' :rows="6" style="width:700px"></el-input>
            <span v-else>{{business.capitalChange?business.capitalChange:'-'}}</span>
        </el-form-item>
        <!-- 投资履约担保函归档 -->
        <el-form-item label-width='160px'>
            <template #label>
                <span>工商材料是否归档：</span>
            </template>
            <el-radio v-if="isEdit" v-model="business.commerialDocFlag" label="1">是</el-radio>
            <el-radio v-if="isEdit" v-model="business.commerialDocFlag" label="0">否</el-radio>
            <span v-if="!isEdit">{{business.commerialDocFlag==='0'?'否':business.commerialDocFlag==='1'?'是':'-'}}</span>
        </el-form-item>
        <template v-if="business.commerialDocFlag==='1'" >
            <el-form-item prop="num"  label-width='160px'>
                <template #label>
                    <span style="margin-top: 16px;display: inline-block;">其余工商材料归档：</span>
                </template>
                <hosjoyUpload v-if="isEdit" :fileSize='100' :fileNum='100' v-model="business.commercial" showAsFileName :action='action' :uploadParameters='uploadParameters' style="margin:15px 0 0" @successCb="onSuccessCb('commercial','c-commercial')">
                    <el-button size="small" type="primary">点击上传</el-button>
                </hosjoyUpload>
                <div class="filename" v-else>
                    <span v-if="business.commercial.length===0">-</span>
                    <template v-else>
                        <div class="fileItem" v-for="(item,index) in business.commercial" :key="index" >
                            <span class="posrtv">
                                <template v-if="item&&item.fileUrl">
                                    <i class="el-icon-document"></i>
                                    <a :href="item.fileUrl" target="_blank">
                                        <font>{{item.fileName}}</font>
                                    </a>
                                </template>
                            </span>
                            <font class="fileItemDownLoad" v-if="item.fileName.toLowerCase().indexOf('.png') != -1||item.fileName.toLowerCase().indexOf('.jpg') != -1||item.fileName.toLowerCase().indexOf('.jpeg') != -1" @click="getUrlBase64(item.fileUrl, item.fileName)">下载</font>
                            <font v-else><a class='fileItemDownLoad' :href="item.fileUrl" target='_blank'>下载</a></font>
                        </div>
                    </template>
                </div>
            </el-form-item>
            <el-form-item label-width='160px'>
                <template #label>
                    <span>增减资协议是否归档：</span>
                </template>
                <el-radio v-if="isEdit" v-model="business.capitalDocFlag" label="1">是</el-radio>
                <el-radio v-if="isEdit" v-model="business.capitalDocFlag" label="0">否</el-radio>
                <span v-if="!isEdit">{{business.capitalDocFlag==='0'?'否':business.capitalDocFlag==='1'?'是':'-'}}</span>
            </el-form-item>
            <template v-if="business.capitalDocFlag==='1'" >
                <el-form-item prop="num" label-width='160px'>
                    <template #label>
                        <span style="margin-top: 16px;display: inline-block;">增减资协议：</span>
                    </template>
                    <hosjoyUpload v-if="isEdit" v-model="business.capital" showAsFileName :fileSize='100' :fileNum='100' :action='action' :uploadParameters='uploadParameters' style="margin:15px 0 0" @successCb="onSuccessCb('capital','c-capital')">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </hosjoyUpload>
                    <div class="filename" v-else>
                        <span v-if="business.capital.length===0">-</span>
                        <template v-else>
                            <div class="fileItem" v-for="(item,index) in business.capital" :key="index" >
                                <span class="posrtv">
                                    <template v-if="item&&item.fileUrl">
                                        <i class="el-icon-document"></i>
                                        <a :href="item.fileUrl" target="_blank">
                                            <font>{{item.fileName}}</font>
                                        </a>
                                    </template>
                                </span>
                                <font class="fileItemDownLoad" v-if="item.fileName.toLowerCase().indexOf('.png') != -1||item.fileName.toLowerCase().indexOf('.jpg') != -1||item.fileName.toLowerCase().indexOf('.jpeg') != -1" @click="getUrlBase64(item.fileUrl, item.fileName)">下载</font>
                                <font v-else><a class='fileItemDownLoad' :href="item.fileUrl" target='_blank'>下载</a></font>
                            </div>
                        </template>
                    </div>
                </el-form-item>
            </template>
            <el-form-item label-width='160px'>
                <template #label>
                    <span>股转版协议是否归档：</span>
                </template>
                <el-radio v-if="isEdit" v-model="business.stocktransferDocFlag" label="1">是</el-radio>
                <el-radio v-if="isEdit" v-model="business.stocktransferDocFlag" label="0">否</el-radio>
                <span v-if="!isEdit">{{business.stocktransferDocFlag==='0'?'否':business.stocktransferDocFlag==='1'?'是':'-'}}</span>
            </el-form-item>
        <template v-if="business.stocktransferDocFlag==='1'" >
            <el-form-item prop="num" label-width='160px'>
                <template #label>
                    <span style="margin-top: 16px;display: inline-block;">股转版协议：</span>
                </template>
                <hosjoyUpload v-if="isEdit" v-model="business.stocktransfer" showAsFileName :fileSize='100' :fileNum='100' :action='action' :uploadParameters='uploadParameters' style="margin:15px 0 0" @successCb="onSuccessCb('stocktransfer','c-stocktransfer')">
                    <el-button size="small" type="primary">点击上传</el-button>
                </hosjoyUpload>
                <div class="filename" v-else>
                    <span v-if="business.stocktransfer.length===0">-</span>
                    <template v-else>
                        <div class="fileItem" v-for="(item,index) in business.stocktransfer" :key="index" >
                            <span class="posrtv">
                                <template v-if="item&&item.fileUrl">
                                    <i class="el-icon-document"></i>
                                    <a :href="item.fileUrl" target="_blank">
                                        <font>{{item.fileName}}</font>
                                    </a>
                                </template>
                            </span>
                            <font class="fileItemDownLoad" v-if="item.fileName.toLowerCase().indexOf('.png') != -1||item.fileName.toLowerCase().indexOf('.jpg') != -1||item.fileName.toLowerCase().indexOf('.jpeg') != -1" @click="getUrlBase64(item.fileUrl, item.fileName)">下载</font>
                            <font v-else><a class='fileItemDownLoad' :href="item.fileUrl" target='_blank'>下载</a></font>
                        </div>
                    </template>
                </div>
            </el-form-item>
        </template>
        </template>
    </div>
</template>

<script>
import moment from 'moment'
import hosjoyUpload from '@/components/HosJoyUpload/HosJoyUpload'
import { fileUploadUrl } from '@/api/config'
import { mapState } from 'vuex'
export default {
    name: 'business',
    props: ['value', 'isEdit'],
    components: { hosjoyUpload },
    data () {
        return {
            action: fileUploadUrl + 'tms/files/upload',
            uploadParameters: {
                updateUid: ''
            },
            radio: '', // 1
            fileNameList: [],
            otherRadio: ''
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        business () {
            return this.value
        }
    },
    methods: {
        getUrlBase64 (url, fileName, ext = '') {
            let _this = this
            var canvas = document.createElement('canvas') // 创建canvas DOM元素
            var ctx = canvas.getContext('2d')
            var img = new Image()
            img.setAttribute('crossOrigin', 'anonymous')
            img.src = url + '?time=' + new Date().valueOf()
            img.onload = function () {
                canvas.height = img.height // 指定画板的高度,自定义
                canvas.width = img.width // 指定画板的宽度，自定义
                ctx.drawImage(img, 0, 0) // 参数可自定义
                var dataURL = canvas.toDataURL('image/' + ext) // 传递的自定义的参数
                canvas = null
                var downDom = document.createElement('a') // 创建DOM元素
                downDom.setAttribute('href', dataURL)
                downDom.setAttribute('download', fileName)
                console.log(downDom)
                _this.$nextTick(() => {
                    downDom.click()
                })
            }
        },
        onSuccessCb (key, str) {
            this.business[key].map(item => {
                this.$set(item, 'docType', str)
            })
        },
        formatDate (val) {
            return moment(val).format('YYYY-MM-DD')
        }
    },
    mounted () {
        this.uploadParameters.updateUid = this.userInfo.employeeName
    }
}
</script>

<style scoped lang='scss'>
/deep/.el-input-group__append{ color:#909399}
.business {
    border: 1px solid #e4e7ed;
    border-top: none;
    padding: 70px;
}
.labeldiy{ color: #000; font-weight:bold;}
.filename{
    margin-top: 17px;
    color: #6e6f73;
    span{
            display: flex;
            align-items: center;
            margin-right: 15px;
        i {
            font-size: 21px;
            font-weight: bold;
        }
        a {color: #FF7A45; margin-left: 10px}
    }
    .posrtv{ position: relative;color: #FF7A45;}
}
.fileItem{ display: flex;justify-content: space-between;align-items: center;}
.fileItemDownLoad{font-size: 12px;border-radius: 3px;padding: 8px 16px;color: #fff;background-color: #ff7a45;border-color: #ff7a45;display:block;line-height: 13px;float: right;height: 13px; cursor: pointer;}
</style>