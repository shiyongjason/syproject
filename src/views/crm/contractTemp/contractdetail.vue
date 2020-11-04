<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="contract-temp">
                <div class="contract-temp_name">合同模板</div>

                <div class="contract-temp_flex"> 活动名称 <el-input v-model="keyName"></el-input>
                    <el-button type="primary" @click="onInsertInfo">插入 </el-button>
                    <el-button type="primary" @click="onClickDialog">对比 </el-button>

                </div>

                <div>
                    <RichEditor ref="RichEditor" v-model="content" :menus="menus" :uploadImgServer="uploadImgServer" :height="500" :uploadFileName="uploadImgName" :uploadImgParams="uploadImgParams" style="margin-bottom: 12px;width:100%"></RichEditor>
                </div>
            </div>
            <div>
                <el-button type="primary">保存</el-button>
                <el-button type="primary" @click="onPreview">预览</el-button>
            </div>
        </div>
        {{content}}
        <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
            <div class="contract-html" v-html="newContent">
            </div>
        </el-drawer>
        <diffDialog ref="diffDialog"></diffDialog>
    </div>

</template>
<script>
import { interfaceUrl } from '@/api/config'
import diffDialog from './components/diffDialog'
export default {
    name: 'contractdetail',
    components: { diffDialog },
    data () {
        return {
            diffHtml: '',
            content: '<p>甲方：{val} 乙方：{name}</p>',
            newContent: '',
            keyName: '',
            drawer: false,
            ruleForm: {
                name: '',
                val: ''
            },
            rules: {},
            options: [{
                value: 'val',
                label: '甲方'
            }, {
                value: 'name',
                label: '乙方'
            }],
            menus: [
                'head', // 标题
                'bold', // 粗体
                'fontSize', // 字号
                'fontName', // 字体
                'italic', // 斜体
                'underline', // 下划线
                'strikeThrough', // 删除线
                'foreColor', // 文字颜色
                'backColor', // 背景颜色
                'link', // 插入链接
                'list', // 列表
                'justify', // 对齐方式
                'quote', // 引用
                'emoticon', // 表情
                'image', // 插入图片
                'table', // 表格
                'undo', // 撤销
                'redo' // 重复
            ]
        }
    },
    mounted () {

        // var worker = new Worker(fuck())
        // worker.postMessage({
        //     'newVersion': newT,
        //     'oldVersion': oldT
        // })
        // worker.onmessage = function (evt) {
        //     diff.innerHTML = evt.data
        // }
        // console.log(worker)
    },
    computed: {
        /* TODO 富文本编辑器 */
        uploadImgServer () {
            return interfaceUrl + 'tms/files/upload-list'
        },
        uploadImgParams () {
            return {
                updateUid: ''
            }
        },
        uploadImgName () {
            return 'multiFile'
        }
    },
    methods: {
        onInsertInfo (val) {
            this.$refs.RichEditor.insertHtml(this.keyName)
        },
        onPreview () {
            this.drawer = true
        },
        onContract () {
            this.newContent = JSON.parse(JSON.stringify(this.content))
            this.options.map(val => {
                console.log(val, this.ruleForm)
                this.newContent = this.newContent.replace(`{${val.value}}`, this.ruleForm[`${val.value}`])
            })
        },
        onClickDialog () {
            this.$refs.diffDialog.onShowDiff()
        }
    }
}
</script>
<style lang="scss" scoped>
.contract-temp {
    &_flex {
        display: flex;
        .el-input {
            width: 180px;
        }
    }
}
/deep/.w-e-text-container {
    z-index: 100 !important;
}
/deep/.w-e-toolbar .w-e-menu {
    z-index: 100 !important;
}
</style>