<template>
    <div>
        <el-dialog title="提示" :visible.sync="diff_visible" width="30%" :before-close="handleClose">
            <div class="diff_wrap">
                <div class="diff_wrap-left">
                    <p>上一版</p>
                    <div id="oldT">
                        <p>人应该趁着年轻去流浪，只要记得回家的路。。。。</p>
                        <div>100</div>
                        <p>军哥吃饭</p>
                        <p>$ 2020-10-5</p>
                        <p>合同金额：2,100,200</p>
                        <table border="1">
                            <tr>
                                <th>Month</th>
                                <th>空调</th>
                            </tr>
                            <tr>
                                <td>January</td>
                                <td>$100</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="diff_wrap-right">
                    <p>新版</p>
                    <div id="newT">
                        <p> 人应该趁着年吃轻去流浪，只要记得回家的路。。。。</p>
                        <div>1000</div>
                        <p>军哥吃饭</p>
                        <p># 2020-10-10</p>
                        <p>合同金额：2,000,000</p>
                        <table border="1">
                            <tr>
                                <th>Month</th>
                                <th>中央空调</th>
                            </tr>
                            <tr>
                                <td>January</td>
                                <td>$1001</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="diff_wrap-right">
                    <p>对比</p>
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
import fuckDiff from '../htmldiff.js'
export default {
    data () {
        return {
            diff_visible: false,
            diffHtml: ''
        }
    },
    methods: {
        onShowDiff () {
            this.diff_visible = true
            // var diffBtn = document.getElementById('diffBtn')
            this.$nextTick(() => {
                var oldT = document.getElementById('oldT').innerHTML
                var newT = document.getElementById('newT').innerHTML
                fuckDiff({ newVersion: newT, oldVersion: oldT }, res => {
                    if (res) {
                        this.diffHtml = res
                    }
                })
            })
        },
        handleClose () {

        }
    }
}
</script>
<style lang="scss" scoped>
.diff_wrap {
    display: flex;
    justify-content: space-between;
    &-left {
        border: 1px solid #e5e5e5;
    }
    &-right {
        border: 1px solid #e5e5e5;
    }
}
</style>