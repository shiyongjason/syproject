<template>
    <div class="page-body B2b">
        <div class="contract-temp  page-component__scroll">
            <div class="page-body-cont">
                <div class="contract-temp_title">新增合同模版</div>
            </div>
            <div class="page-body-cont">
                <div class="contract-temp_name">合同模版设置</div>
                <el-form ref="form" :model="form" label-width="">
                    <el-form-item label="模版名称：">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="合同类型：">
                        <el-select v-model="form.region" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div class="page-body-cont">
                <div class="contract-temp_name">合同模版内容</div>
                <div class="contract-temp_flex">
                    <div class="contract-temp_rich">
                        <RichEditor ref="RichEditor" v-model="content" :menus="menus" :uploadImgServer="uploadImgServer" :height="500" :uploadFileName="uploadImgName" :uploadImgParams="uploadImgParams" style="margin-bottom: 12px;width:100%"></RichEditor>
                    </div>
                    {{content}}
                    <div class="contract-temp_txt">
                        <el-form ref="form" :model="form" label-width="200px">
                            <el-form-item label="请选择需要插入的字段：">
                                <el-select v-model="keyValue" placeholder="请选择">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item">
                                    </el-option>
                                </el-select>
                                <el-button type="primary" style="margin-left:20px" @click="onInsertInfo">插入当前位置</el-button>
                            </el-form-item>
                            <el-form-item label="自定义合同条款：">
                                <el-button type="primary" @click="onFindRef">插入当前位置</el-button>
                            </el-form-item>
                            <el-form-item label="平台签署区：">
                                <el-button type="primary">插入当前位置</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
            <div class="page-body-cont">
                <div class="contract-temp_head">
                    签署方
                    <h-button type="primary">添加签署方</h-button>
                </div>
                <hosJoyTable localName="V3.*" isShowIndex ref="hosjoyTable" align="center" collapseShow border stripe :column="tableLabel" :data="tableData" actionWidth='260' isAction :isActionFixed='tableData&&tableData.length>0'>
                    <template slot="action" slot-scope="scope">
                        <h-button table @click="onShowVer()">查看</h-button>
                        <h-button table @click="onShowVer()">预览</h-button>
                    </template>
                </hosJoyTable>
            </div>
            <div class="">
                <el-button type="primary">保存</el-button>
                <el-button type="primary" @click="onPreview">预览</el-button>
            </div>

        </div>
        <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
            <div class="contract-html" v-html="newContent">
            </div>
        </el-drawer>
        <el-dialog title="合同填充字段" :visible.sync="dialogVisible" width="300px" :before-close="handleClose">
            <el-select v-model="keyValue" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item">
                </el-option>
            </el-select>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onEditcon">确 定</el-button>
            </span>
        </el-dialog>
        <diffDialog ref="diffDialog"></diffDialog>

    </div>

</template>
<script>
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table'
import { interfaceUrl } from '@/api/config'
import diffDialog from './components/diffDialog'
export default {
    name: 'contractdetail',
    components: { diffDialog, hosJoyTable },
    data () {
        return {
            diffHtml: '',
            // content: '<p>甲方：<input class="inputCont newinput"  ref="newinput" value="newinput"  readonly></p> <p>乙方：</p>',
            content: '<p>甲方：</p> <p>乙方：</p>',
            newContent: '',
            keyValue: '',
            _keyValue: '',
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
                label: '乙方乙方乙方乙方乙方'
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
            ],
            form: {

            },
            dialogVisible: false,
            tableLabel: [
                { label: '企业名称', prop: 'companyName', width: '200' },
                { label: '管理员账号', prop: 'userAccount', width: '120' }
            ],
            tableData: []
        }
    },
    mounted () {
        this.$nextTick(() => {
        })
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
            let inputWidth = this.keyValue.label.length * 14
            const _temp = `<input class="inputCont ${this.keyValue.value}"  style="width:${inputWidth}px;"  value=${this.keyValue.label} readonly></input>`
            this.$refs.RichEditor.insertHtml(_temp)
            // document.getElementsByClassName('newinput')[1].click
            console.log(document.getElementsByClassName(`${this.keyValue.value}`))
            document.getElementsByClassName(`${this.keyValue.value}`)[0].onclick = () => {
                console.log('我测试一下')
                this._keyValue = JSON.parse(JSON.stringify(this.keyValue))
                this.dialogVisible = true
            }
        },
        handleClose () {

        },
        onEditcon () {
            document.getElementsByClassName(`${this._keyValue.value}`)[0].outerHTML = ''
            this.$nextTick(() => {
                let inputWidth = this.keyValue.label.length * 14
                const _temp = `<input class="inputCont ${this.keyValue.value}" style="width:${inputWidth}px;"  value=${this.keyValue.label} readonly></input>`
                this.$refs.RichEditor.insertHtml(_temp)
                this.dialogVisible = false
                document.getElementsByClassName(`${this.keyValue.value}`)[0].onclick = () => {
                    this._keyValue = JSON.parse(JSON.stringify(this.keyValue))
                    this.dialogVisible = true
                }
            })
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
        },
        onFindRef () {
            this.$nextTick(() => {
                console.log(this.$refs.hosjoyTable)
                console.log(document.getElementsByClassName('newinput')[0].value = 'xxxx')
                document.getElementsByClassName('newinput')[1].onclick = function () {
                    alert(1)
                }
                console.log(document.getElementsByClassName('newinput')[1].click)
            })
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
    &_title {
        font-size: 20px;
    }
    &_rich {
        margin-top: 20px;
        flex: 1;
    }
    &_txt {
        width: 700px;
    }
    ._flex {
        display: flex;
        justify-content: space-around;
    }
    &_head {
        margin-bottom: 10px;
    }
}
.page-body-cont {
    margin-bottom: 20px;
}
/deep/.w-e-text-container {
    z-index: 100 !important;
}
/deep/.inputCont {
    color: #ff7a45;
    display: inline-block;
    height: 22px;
    min-width: 20px;
    // max-width: 100px;
    // background: #efeeee;
    border: none;
    text-align: center;
    margin-right: 3px;
    border-radius: 5px;
    cursor: pointer;
}
.mention {
    background: rgba(0, 0, 0, 0.1);
    font-size: 0.8rem;
    font-weight: 700;
    border-radius: 5px;
    padding: 0.2rem 0.5rem;
    white-space: nowrap;
}
</style>