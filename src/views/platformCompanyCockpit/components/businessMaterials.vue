<template>
    <div class="business">
        <el-form-item label="工商登记时间：" prop="num" label-width='160px'>
            <el-date-picker v-model="business.date" type="date" placeholder="请选择工商登记时间"></el-date-picker>
            <span>{{business.date}}</span>
        </el-form-item>
        <el-form-item label="工商状态：" prop="num" label-width='150px'>
            <el-select v-model="value" clearable placeholder="请选状态" style="margin:0 10px">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="工商登记最新股东：" prop="num" label-width='160px'>
            <el-input v-isNum="business.num" v-model="business.num" placeholder="请输入姓名"></el-input>
            <span>{{business.num}}</span>
        </el-form-item>
        <el-form-item label="股东变更情况：" label-width='160px'>
            <el-input v-model="business.gg" placeholder="变更情况描述" type='textarea' :rows="6" style="width:700px"></el-input>
            <span>{{business.gg}}</span>
        </el-form-item>
        <el-form-item label="工商登记注册资本：" prop="num" label-width='160px'>
            <el-input v-isNum="business.num" v-model="business.num" placeholder="请输入注册资本">
                <template slot="append">万</template>
            </el-input>
            <span>{{business.num}}</span>
        </el-form-item>
        <!-- 投资履约担保函归档 -->
        <el-form-item label-width='160px'>
            <template #label>
                <span>工商材料是否归档：</span>
            </template>
            <el-radio v-model="otherRadio" label="1">是</el-radio>
            <el-radio v-model="otherRadio" label="2">否</el-radio>
        </el-form-item>
        <template v-if="otherRadio==='1'" >
            <el-form-item prop="num"  label-width='160px'>
                <template #label>
                    <span style="margin-top: 16px;display: inline-block;">其余工商材料归档：</span>
                </template>
                <hosjoyUpload v-model="fileNameList" showAsFileName :action='action' :uploadParameters='uploadParameters' style="margin:15px 0 0">
                    <el-button size="small" type="primary">点击上传</el-button>
                </hosjoyUpload>
                <span>{{business.num}}</span>
            </el-form-item>
            <el-form-item prop="num"  label-width='160px'>
                <template #label>
                    <span style="margin-top: 16px;display: inline-block;">增减资协议：</span>
                </template>
                <hosjoyUpload v-model="fileNameList" showAsFileName :action='action' :uploadParameters='uploadParameters' style="margin:15px 0 0">
                    <el-button size="small" type="primary">点击上传</el-button>
                </hosjoyUpload>
                <span>{{business.num}}</span>
            </el-form-item>
            <el-form-item prop="num"  label-width='160px'>
                <template #label>
                    <span style="margin-top: 16px;display: inline-block;">股转版协议：</span>
                </template>
                <hosjoyUpload v-model="fileNameList" showAsFileName :action='action' :uploadParameters='uploadParameters' style="margin:15px 0 0">
                    <el-button size="small" type="primary">点击上传</el-button>
                </hosjoyUpload>
                <span>{{business.num}}</span>
            </el-form-item>
        </template>
    </div>
</template>

<script>
import hosjoyUpload from '@/components/HosJoyUpload/HosJoyUpload'
import { fileUploadUrl } from '@/api/config'
export default {
    name: 'business',
    props: ['value'],
    components: { hosjoyUpload },
    data () {
        return {
            action: fileUploadUrl + 'tms/files/upload',
            uploadParameters: {
                updateUid: '张功伟x'
            },
            radio: '', // 1
            options: [],
            fileNameList: [],
            otherRadio: ''
        }
    },
    computed: {
        business: {
            get () {
                return this.value
            },
            set (val) {
                this.$emit('input', val)
            }
        }
    },
    methods: {

    },
    mounted () {

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

</style>