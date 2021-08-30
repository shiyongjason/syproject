<template>
   <div class="page-body">
        <div class="page-body-cont">
            <el-form ref="form" :model="form" :rules="rules" label-width="150px">
                <el-form-item label="智能化系统名称：" prop="schemeTitle">
                    <el-input v-model.trim="form.schemeTitle" show-word-limit placeholder="请输入工程方案标题" maxlength='50' class="newTitle"></el-input>
                </el-form-item>

                <el-form-item label="智能化系统介绍：" prop="schemeDetail">
                    <RichEditor :height="500" :menus="menus" :uploadFileName="uploadImgName" :uploadImgParams="uploadImgParams" :uploadImgServer="uploadImgServer" @change="$refs['form'].validateField('schemeDetail')" @blur="$refs['form'].validateField('schemeDetail')" hidefocus="true" ref="editors" style="outline: 0;margin-bottom: 12px;width:100%" tabindex="0" v-model="form.schemeDetail"></RichEditor>
                </el-form-item>
            <el-form-item label="关联的工程方案：" prop="schemeTitle">
                        <el-select placeholder="请选择" v-model="form.subsectionCode" :clearable='true'>
                            <el-option :label="item.deptName" :value="item.pkDeptDoc" v-for="item in crmdepList" :key="item.pkDeptDoc"></el-option>
                        </el-select>
            </el-form-item>
                <el-form-item style="text-align: center">
                    <el-button type="primary" @click="onSave" :loading="loading">{{ loading ? '提交中 ...' : '确定' }}</el-button>
                    <el-button @click="onBack()">返回</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>
<script lang="tsx">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { interfaceUrl } from '@/api/config'

@Component({
    name: 'Systemdetail'
})
export default class Systemdetail extends Vue {
    @State('userInfo') userInfo: any

    private form = {
        schemeTitle: '',
        schemeDetail: '',
        subsectionCode: ''
    }

    private menus= [
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        'emoticon', // 表情
        'image', // 插入图片
        'table', // 表格
        'undo', // 撤销
        'redo' // 重复
    ]
    rules = {
        schemeTitle: [
            { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        schemeImage: [
            { required: true, message: '请上传方案列表缩略图', trigger: 'change' }
        ],
        effectiveTime: [
            { required: true, message: '请选择生效时间', trigger: 'change' }
        ],
        schemeVideo: [
            { required: false, message: '请上传商品视频', trigger: 'change' }
        ],
        schemeDetail: [
            {
                validator: (rule, value, callback) => {
                    if (value.length <= 0 || value === '<p><br></p>') {
                        return callback(new Error('请输入方案详细内容'))
                    }
                    return callback()
                },
                trigger: 'blur'
            }
        ]
    }

    get uploadImgName () {
        return 'multiFile'
    }
    get uploadImgParams () {
        return {
            updateUid: JSON.parse(sessionStorage.getItem('userInfo') || '').employeeName
        }
    }
    get uploadImgServer () {
        return interfaceUrl + 'tms/files/upload-list'
    }
}
</script>