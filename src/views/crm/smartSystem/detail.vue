<template>
   <div class="page-body">
        <div class="page-body-cont">
            <el-form ref="form" :model="form" :rules="rules" label-width="150px">
                <el-form-item label="智能化系统名称：" prop="schemeTitle">
                    <el-input v-model.trim="form.schemeTitle" show-word-limit placeholder="请输入工程方案标题" maxlength='20' class="newTitle"></el-input>
                </el-form-item>

                <el-form-item label="智能化系统介绍：" prop="schemeTitle">
                    <RichEditor :height="500" :menus="menus" :uploadFileName="uploadImgName" :uploadImgParams="uploadImgParams" :uploadImgServer="uploadImgServer" @change="$refs['form'].validateField('schemeDetail')" @blur="$refs['form'].validateField('schemeDetail')" hidefocus="true" ref="editors" style="outline: 0;margin-bottom: 12px;width:100%" tabindex="0" v-model="form.schemeDetail"></RichEditor>
                </el-form-item>
            <el-form-item label="关联的工程方案：" >
                        <el-select placeholder="请选择" v-model="form.subsectionCode" :clearable='true'>
                            <el-option :label="item.deptName" :value="item.pkDeptDoc" v-for="item in engineList" :key="item.pkDeptDoc"></el-option>
                        </el-select>
            </el-form-item>
                <el-form-item>
                    <el-button @click="onBack()">取消</el-button>
                    <el-button type="primary" @click="onSave" :loading="loading">{{ loading ? '提交中 ...' : '确定' }}</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>
<script lang="tsx">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'
import { interfaceUrl } from '@/api/config'
import { saveIntelligent, getIntelligent, getSchemeList } from './api/index'

@Component({
    name: 'Systemdetail'
})
export default class Systemdetail extends Vue {
    @State('userInfo') userInfo: any
    @Action('setNewTags') setNewTags!: Function

    $refs!: {
        form: HTMLFormElement
    }
    private form = {
        schemeTitle: '',
        schemeDetail: '',
        subsectionCode: ''
    }
    private loading:boolean = false
    private engineList:Array<any> = []

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
                        return callback(new Error('请输入智能化系统介绍'))
                    }
                    return callback()
                },
                trigger: 'change'
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
    // 查询方案
    public async onGetScheme () {
        const params = {

        }
        const data = await getSchemeList(params)
    }
    // 查询详情
    public async getIntelligentDetail () {
        const data = await getIntelligent(this.$route.query.id)
    }
    // 取消
    public onBack ():void {
        this.$confirm('取消后，文本将不被保存', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            this.$router.go(-1)
            this.setNewTags((this.$route.fullPath).split('?')[0])
        }).catch(() => {

        })
    }
    // 保存
    public onSave () {
        try {
            this.loading = true
            this.$refs['form'].validate(async (valid) => {
                if (valid) {
                    this.$confirm('确定后，该智能化系统信息将在小程序端展示，是否要保存？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(async () => {
                        await saveIntelligent(this.form)
                        this.$router.go(-1)
                        this.setNewTags((this.$route.fullPath).split('?')[0])
                    }).catch(() => {

                    })
                }
            })
        } catch (error) {
            this.loading = false
        }
    }
    public mounted () {
        this.onGetScheme()
        if (this.$route.query.id) {
            this.getIntelligentDetail()
        }
    }
}
</script>