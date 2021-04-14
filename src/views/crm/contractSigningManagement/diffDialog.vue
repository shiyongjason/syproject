<template>
    <div>
        <el-dialog title="合同对比" :visible.sync="diff_visible" width="80%" :before-close="handleClose">
            <div class="diff_wrap">
                <div class="diff_wrap-left">
                    <p style="color:#169bd5">上一版：</p>
                    <div id="oldT" v-if="lastContent" v-html="lastContent">

                    </div>
                </div>
                <div class="diff_wrap-right">
                    <p style="color:#169bd5">新版：</p>
                    <div id="newT" v-if="currentContent" v-html="currentContent">

                    </div>
                </div>
                <div class="diff_wrap-right">
                    <p style="color:#169bd5">对比：</p>
                    <div id="diff" v-html="diffHtml" v-if="diffHtml">
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="diff_visible = false">取 消</el-button>
                <el-button type="primary" @click="diff_visible = false">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
import fuckDiff from './htmldiff.js'
export default {
    props: {
        currentContent: {
            type: String,
            defaule: ''
        },
        lastContent: {
            type: String,
            defaule: ''
        }
    },
    data () {
        return {
            diff_visible: false,
            diffHtml: '',
            currentContentDiv: '',
            lastContentDiv: ''
        }
    },
    methods: {
        forMat (tag, cb) {
            let spanList = document.getElementById('oldT').getElementsByTagName(tag)
            let spanList2 = document.getElementById('newT').getElementsByTagName(tag)
            Array.from(spanList).map(item => {
                if (item.dataset && item.dataset.mceStyle) {
                    item.removeAttribute('data-mce-style')
                }
                if (item.dataset && item.dataset.mceSrc) {
                    item.removeAttribute('data-mce-src')
                }
                if (item.dataset && item.dataset.mceSelected) {
                    item.removeAttribute('data-mce-selected')
                }
            })
            Array.from(spanList2).map(item => {
                if (item.dataset && item.dataset.mceStyle) {
                    item.removeAttribute('data-mce-style')
                }
                if (item.dataset && item.dataset.mceSrc) {
                    item.removeAttribute('data-mce-src')
                }
                if (item.dataset && item.dataset.mceSelected) {
                    item.removeAttribute('data-mce-selected')
                }
            })
            cb && cb()
        },
        onShowDiff () {
            this.diff_visible = true
            this.$nextTick(() => {
                this.forMat('span')
                this.forMat('img', () => {
                    this.$nextTick(() => {
                        //
                        let oldT = document.getElementById('oldT').innerHTML
                        let newT = document.getElementById('newT').innerHTML
                        fuckDiff({ newVersion: newT, oldVersion: oldT }, res => {
                            if (res) {
                                this.diffHtml = res
                            }
                        })
                    })
                })
            })
        },
        handleClose () {
            this.diff_visible = false
        }
    },
    beforeMount () {
        // console.log(11)
        // this.$nextTick(() => {
        //     let currentContentInput = document.getElementById('newT').getElementsByTagName('input')
        //     console.log('currentContentInput: ', currentContentInput)
        // })

        // this.detailRes = res.data
        // this.contractContentDiv = res.data.contractContent // Div版的合同
        // this.contractContentHidden = res.data.contractContent // input版的合同
        // this.originalContentFieldsList = JSON.parse(res.data.contractFieldsList) // 保存最初的键值对
        // this.contractFieldsList = JSON.parse(JSON.stringify(this.originalContentFieldsList)) // 可修改的键值对
        // this.$nextTick(() => {
        //     let inputDomList = document.getElementsByClassName('approvalcontract-content')[0].getElementsByTagName('input')
        //     let firstKsy = inputDomList[0].className
        //     this.currentKey = this.contractFieldsList.filter(item => item.paramKey === firstKsy)[0]
        //     Array.from(inputDomList).map((item, index) => {
        //         item.outerHTML = `<div class="${item.className}" style="display:inline;color:rgb(255, 122, 69);cursor: pointer;">${item.value}</div>`
        //         let fields = this.contractFieldsList.filter(jtem => jtem.paramKey === item.className)[0]
        //         // 给div绑定事件
        //         let doms = document.getElementsByClassName('approvalcontract-content')[0].getElementsByClassName(item.className)
        //         Array.from(doms).map(jtem => {
        //             if (!jtem.onclick) {
        //                 jtem.onclick = () => {
        //                     this.currentKey = { ...fields }
        //                 }
        //             }
        //         })
        //     })
        // })
    }
}
</script>
<style lang="scss" scoped>
.diff_wrap {
    max-height: 600px;
    overflow-y: scroll;
    display: flex;
    justify-content: space-between;
    &-left {
        border: 1px solid #e5e5e5;
        width: 40%;
        padding: 10px;
        box-sizing: border-box;
        height: 100%;
        // overflow-y: scroll;
    }
    &-right {
        border: 1px solid #e5e5e5;
        width: 40%;
        padding: 10px;
        box-sizing: border-box;
        height: 100%;
        // overflow-y: scroll;
        #diff {
            font-size: 14px;
        }
    }
    /deep/.purch_service_fee_form {
        width: 100% !important;
        div {
            display: flex;
        }
        span {
            font-size: 12px !important;
            width: 100% !important;
            flex: 1;
            display: flex;
            align-items: center;
            line-height: unset !important;
            justify-content: center;
        }
    }
}
</style>