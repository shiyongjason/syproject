<template>
    <div class="signMaterials">
        <el-form-item>
            <template #label>
                <span class="labeldiy">实控人信息归档：</span>
            </template>
            <el-radio v-model="radio" label="1">是</el-radio>
            <el-radio v-model="radio" label="2">否</el-radio>
        </el-form-item>
        <template v-if="radio==='1'" >
            <el-form-item prop="num" label="实控人姓名：" label-width='160px'>
                <el-input v-model="signMaterials.num" placeholder="请输入姓名"></el-input>
                <span>{{signMaterials.num}}</span>
            </el-form-item>
            <el-form-item prop="num" label="联系方式：" label-width='160px'>
                <el-input v-model="signMaterials.num" placeholder="请输入联系方式"></el-input>
                <span>{{signMaterials.num}}</span>
            </el-form-item>
            <el-form-item prop="num" label="身份证号：" label-width='160px'>
                <el-input v-model="signMaterials.num" placeholder="请输入身份证号"></el-input>
                <span>{{signMaterials.num}}</span>
            </el-form-item>
            <el-form-item prop="num" label="实控人身份证归档：" label-width='160px'>
                <hosjoyUpload v-model="signMaterials.fileList" :action='action' :uploadParameters='uploadParameters' >
                    <!-- <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                </hosjoyUpload>
            </el-form-item>
        </template>
        <!-- 自然人股东信息归档 -->
        <el-form-item label-width='160px'>
            <template #label>
                <span class="labeldiy">自然人股东信息归档：</span>
            </template>
            <el-radio v-model="naturalRadio" label="1">是</el-radio>
            <el-radio v-model="naturalRadio" label="2">否</el-radio>
        </el-form-item>
        <template v-if="naturalRadio==='1'" >
            <el-form-item prop="num" label="自然人股东姓名：" label-width='160px'>
                <el-input v-model="signMaterials.num" placeholder="请输入姓名"></el-input>
                <span>{{signMaterials.num}}</span>
            </el-form-item>
            <el-form-item prop="num" label="自然人股东联系方式：" label-width='160px'>
                <el-input v-model="signMaterials.num" placeholder="请输入联系方式"></el-input>
                <span>{{signMaterials.num}}</span>
            </el-form-item>
            <el-form-item prop="num" label="自然人股东身份证号：" label-width='160px'>
                <el-input v-model="signMaterials.num" placeholder="请输入身份证号"></el-input>
                <span>{{signMaterials.num}}</span>
            </el-form-item>
        </template>
        <!-- 投资协议归档 -->
        <span class="labeldiy">投资协议归档：</span>
        <el-form-item>
            <div v-for="(item,index) in agreement" :key="index" style="margin-left: -140px;margin-top:10px">
                <span>{{index+1}}.0版本归档：</span>
                <span class="ab" style="margin-left:63px;">
                    <el-radio v-model="item.radio" label="1">是</el-radio>
                    <el-radio v-model="item.radio" label="2">否</el-radio>
                    <template v-if="item.radio==='1'" >
                        <el-form-item prop="num"  label-width='160px'>
                            <template #label>
                                <span style="margin-top: 16px;display: inline-block;">文件：</span>
                            </template>
                            <hosjoyUpload v-model="fileNameList" showAsFileName :action='action' :uploadParameters='uploadParameters' style="margin:15px 0">
                                <el-button size="small" type="primary">点击上传</el-button>
                            </hosjoyUpload>
                            <span>{{signMaterials.num}}</span>
                        </el-form-item>
                        <el-form-item prop="num" label="该文件签约人：" label-width='160px'>
                            <el-input v-model="signMaterials.num" placeholder="请输入姓名"></el-input>
                            <span>{{signMaterials.num}}</span>
                        </el-form-item>
                        <el-form-item prop="num" label="签约人联系方式：" label-width='160px'>
                            <el-input v-model="signMaterials.num" placeholder="请输入联系方式"></el-input>
                            <span>{{signMaterials.num}}</span>
                        </el-form-item>
                        <el-form-item prop="num" label="签约人身份证号：" label-width='160px'>
                            <el-input v-model="signMaterials.num" placeholder="请输入身份证号"></el-input>
                            <span>{{signMaterials.num}}</span>
                        </el-form-item>
                        <el-form-item prop="num" label="签约人身份证归档：" label-width='160px'>
                            <hosjoyUpload v-model="item.sfzList" :action='action' :uploadParameters='uploadParameters' showFileList >
                                <!-- <el-button size="small" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                            </hosjoyUpload>
                        </el-form-item>
                    </template>
                </span>
            </div>
            <div><el-button v-if="agreement.length>0&&agreement[0].radio==='1'" type="primary" style="width:130px; margin-left:20px" @click="onAdd" icon='el-icon-circle-plus-outline'>新增</el-button></div>
        </el-form-item>
        <!-- 投资履约担保函归档 -->
        <el-form-item label-width='160px'>
            <template #label>
                <span class="labeldiy">投资履约担保函归档：</span>
            </template>
            <el-radio v-model="assureRadio" label="1">是</el-radio>
            <el-radio v-model="assureRadio" label="2">否</el-radio>
        </el-form-item>
        <template v-if="assureRadio==='1'" >
            <el-form-item prop="num"  label-width='160px'>
                <template #label>
                    <span style="margin-top: 16px;display: inline-block;">担保函归档：</span>
                </template>
                <hosjoyUpload v-model="fileNameList" showAsFileName :action='action' :uploadParameters='uploadParameters' style="margin:15px 0">
                    <el-button size="small" type="primary">点击上传</el-button>
                </hosjoyUpload>
                <span>{{signMaterials.num}}</span>
            </el-form-item>
            <el-form-item prop="num" label="担保函签约人：" label-width='160px'>
                <el-input v-model="signMaterials.num" placeholder="请输入担保函签约人"></el-input>
                <span>{{signMaterials.num}}</span>
            </el-form-item>
        </template>
        <!-- 其余B档签约材料 -->
        <el-form-item label-width='160px'>
            <template #label>
                <span class="labeldiy">其余B档签约材料：</span>
            </template>
        </el-form-item>
        <el-form-item prop="num"  label-width='160px'>
            <template #label>
                <span style="display: inline-block;">文件：</span>
            </template>
            <hosjoyUpload v-model="fileNameList" showAsFileName :action='action' :uploadParameters='uploadParameters'>
                <el-button size="small" type="primary">点击上传</el-button>
            </hosjoyUpload>
            <span>{{signMaterials.num}}</span>
        </el-form-item>
    </div>
</template>

<script>
import hosjoyUpload from '@/components/HosJoyUpload/HosJoyUpload'
import { fileUploadUrl } from '@/api/config'
const _agreementForm = {
    radio: '2', // 1是 2否
    fileList: [], // 文件
    qyr: '', // 该文件签约人
    mobile: '', // 签约人联系方式
    sfz: '', // 签约人身份证号
    sfzList: []// 签约人身份证归档
}
export default {
    name: 'signMaterials',
    props: ['value'],
    components: { hosjoyUpload },
    data () {
        return {
            radio: '1',
            naturalRadio: '1',
            assureRadio: '1',
            agreementForm: JSON.parse(JSON.stringify(_agreementForm)),
            agreement: [],
            // fileList: [
            //     { name: 'demo1.jpg', url: 'https://hosjoy-oss-test.oss-cn-hangzhou.aliyuncs.com/images/20191017/e340708c-d4a8-4b69-a051-6e62b78e1fd4.png' }, { name: 'demo1.jpg', url: 'https://hosjoy-oss-test.oss-cn-hangzhou.aliyuncs.com/images/20191017/a9645dda-eb30-4304-8933-a542ed9a3396.png' }
            // ],
            action: fileUploadUrl + 'tms/files/upload',
            uploadParameters: {
                updateUid: '张功伟x'
            },
            fileNameList: [{ name: 'x.pdf', url: 'https://hosjoy-oss-test.oss-cn-hangzhou.aliyuncs.com/images/20191023/c453f100-9414-4c52-8dba-08b35ed32cdd.pdf' }, { name: 'x2.pdf', url: 'https://hosjoy-oss-test.oss-cn-hangzhou.aliyuncs.com/images/20191023/c453f100-9414-4c52-8dba-08b35ed32cdd.pdf' }]
        }
    },
    computed: {
        signMaterials: {
            get () {
                return this.value
            },
            set (val) {
                this.$emit('input', val)
            }
        }
    },
    methods: {
        onAdd () {
            this.agreement.push(JSON.parse(JSON.stringify(this.agreementForm)))
        }
    },
    watch: {
        fileList: {
            handler (val) {
                console.log(val)
            },
            deep: true
        },
        fileNameList: {
            handler (val) {
                console.log(val)
            },
            deep: true
        }
    },
    mounted () {
        this.onAdd()
    }
}
</script>

<style scoped>
.signMaterials{
    border: 1px solid #e4e7ed;
    border-top: none;
    padding: 70px;
}
.labeldiy{ color: #000; font-weight:bold;}
</style>