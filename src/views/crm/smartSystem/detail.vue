<template>
    <div class="page-body">
        <div class="page-body-cont">
            <el-form ref="form" :model="form" :rules="rules" label-width="150px">
                <el-form-item label="智能化系统名称：" prop="intelligentSystemName">
                    <el-input v-model.trim="form.intelligentSystemName" show-word-limit placeholder="请输入智能化系统名称" maxlength='20' class="newTitle"></el-input>
                </el-form-item>

                <el-form-item label="智能化系统介绍：" prop="intelligentSystemDetail">
                    <RichEditor :height="500" :menus="menus" :uploadFileName="uploadImgName" :uploadImgParams="uploadImgParams" :uploadImgServer="uploadImgServer" @change="$refs['form'].validateField('intelligentSystemDetail')" hidefocus="true" ref="editors"
                        style="outline: 0;margin-bottom: 12px;width:100%;position:relative;z-index:0" tabindex="0" v-model="form.intelligentSystemDetail"></RichEditor>
                </el-form-item>
                <el-form-item label="关联的工程方案：">
                    <el-select placeholder="请选择" v-model="form.schemeId" multiple :clearable='true' style="margin-left: -10px;">
                        <el-option v-for=" item in params" :label="item.schemeTitle" :value="item.id" :key="item.id">
                        </el-option>
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
import { saveIntelligent, addIntelligent, getIntelligent, getSchemeList } from './api/index'
import { clearCache } from '@/utils/index'

@Component({
    name: 'Systemdetail'
})
export default class Systemdetail extends Vue {
    [x: string]: any
    @State('userInfo') userInfo: any
    @Action('setNewTags') setNewTags!: Function

    $refs!: {
        form: HTMLFormElement
    }
    private form = {
        intelligentSystemName: '',
        intelligentSystemDetail: '',
        schemeId: []
    }
    private loading: boolean = false
    private engineList: Array<any> = []

    menus = [
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
    private params = {
        id: '',
        schemeTitle: ''
    }
    rules = {
        intelligentSystemName: [
            { required: true, message: '请输入智能化系统名称', trigger: 'blur' }
        ],
        intelligentSystemDetail: [
            {
                required: true,
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
        const { data: params } = await getSchemeList(this.params.id)
        console.log(params)
        this.params = params
    }
    // 查询详情
    public async getIntelligentDetail () {
        const { data: form } = await getIntelligent(this.$route.query.id)
        this.form = form
    }
    // 取消
    public onBack (): void {
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
            this.$refs['form'].validate(async (valid) => {
                if (valid) {
                    this.loading = true
                    this.$confirm('确定后，该智能化系统信息将在小程序端展示，是否要保存？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(async () => {
                        if (this.$route.query.id) {
                            let form = {
                                ...this.form,
                                id: this.$route.query.id
                            }
                            await saveIntelligent(form)
                        } else {
                            await addIntelligent(this.form)
                        }
                        this.loading = false
                        this.$router.go(-1)
                        this.setNewTags((this.$route.fullPath).split('?')[0])
                    }).catch(() => {
                        this.loading = false
                    })
                }
            })
        } catch (error) {
            this.loading = false
        }
    }
    public mounted () {
        // this.$nextTick(() => {
        // this.$refs['form'].clearValidate()
        // this.$refs['form'].resetFields()
        // })
        console.log(this.form)
        this.onGetScheme()
        if (this.$route.query.id) {
            this.getIntelligentDetail()
        }
    }
    beforeRouteEnter (to, from, next) {
        clearCache('systemDetail')
        // console.log(to)
        // if (from.name == 'systemDetail') {
        console.log('111')
        next()
        //     // this.$refs['form'].resetFields()
        // }
    }
}
</script>
<style scoped>
/deep/ .el-select__tags {
    margin-left: 10px;
}
</style>
