<template>
    <el-drawer title="项目详情" :visible.sync="drawer" :before-close="handleClose" :modal-append-to-body='false' size='680px'>
        <div class="ProjectList2Detail">
            <el-radio-group v-model="radio1">
                <el-radio-button label="跟进记录"></el-radio-button>
                <el-radio-button label="项目信息"></el-radio-button>
            </el-radio-group>
            <div class="ProjectList2Detail-ctx">
                <div>
                    <b>项目类型：</b>项目植入供应链产品
                </div>
                <!-- 流程 -->
                <div class="process" style="height:138px">
                    <div class="process-item isActive">首次接触</div>
                    <div class="step_arrow"></div>
                    <div class="process-item isActive">需求确认</div>
                    <div class="step_arrow"></div>
                    <div class="process-item isActive">提供方案/报价</div>
                    <div class="step_arrow"></div>
                    <div class="process-item isActive">商务洽谈，待签约</div>
                    <div class="step_arrow down"></div>
                    <div class="process-item pos5">已签约</div>
                    <div class="step_arrow left"></div>
                    <div class="process-item pos6">已回款</div>
                    <div class="step_arrow left pos7"></div>
                    <div class="process-item pos8">无需跟进</div>
                </div>
                <h-button type='assist'> + 新增跟进记录</h-button>
                <div style="margin-top:20px">
                    <b>跟进动态</b>
                </div>
                <div class="follow-records">
                    <div class="follow-cell">
                        <div class="info"><img src="" class="avatar">
                            <div class="name-container">
                                <div class="follow-tag">跟进人</div>
                                <div class="name">王小二xxxxxxxx</div>
                            </div>
                            <div class="time">2021/06/10 11:20</div>
                        </div>
                        <div class="content-container">
                            <div class="line"></div>
                            <div class="content">
                                <div class="title-tag" >语音通话</div>
                                <div class="audio-player-container">
                                    <div class="crm-audio-player" >
                                        <audio controls>
                                            <source src="https://chattovideofile-1256749994.cos.ap-chengdu.myqcloud.com/ctv202012002498abf1f447dd840e5dcaeb9855212.mp3" type="audio/mpeg">
                                            您的浏览器不支持 音频 插件，请使用谷歌浏览器。
                                        </audio>
                                    </div>
                                </div>
                                <div class="watch-audio-text" >查看语音文本</div>
                                <div class="desc">xxxxxxxx您收到我们的样品箱了，使用中有什么问题呢？您收到我们的样品箱了，使用中有什么问题呢？</div>
                            </div>
                        </div>
                    </div>
                    <div class="follow-cell">
                        <div class="info"><img src="" class="avatar">
                            <div class="name-container">
                                <div class="follow-tag">跟进人2</div>
                                <div class="name">王小二xxxxxxxx</div>
                            </div>
                            <div class="time">2021/06/10 11:20</div>
                        </div>
                        <div class="content-container">
                            <div class="line"></div>
                            <div class="content">
                                <div class="title-tag" >当面拜访</div>
                                <div class="audio-player-container">
                                    <div class="crm-audio-player" >
                                        <el-image style="width: 100px; height: 100px;margin-right:5px" :src="url" :preview-src-list="srcList"></el-image>
                                        <el-image style="width: 100px; height: 100px;margin-right:5px" :src="url" :preview-src-list="srcList"></el-image>
                                        <el-image style="width: 100px; height: 100px;margin-right:5px" :src="url" :preview-src-list="srcList"></el-image>
                                        <el-image style="width: 100px; height: 100px;margin-right:5px" :src="url" :preview-src-list="srcList"></el-image>
                                        <el-image style="width: 100px; height: 100px;margin-right:5px" :src="url" :preview-src-list="srcList"></el-image>
                                        <el-image style="width: 100px; height: 100px;margin-right:5px" :src="url" :preview-src-list="srcList"></el-image>
                                        <el-image style="width: 100px; height: 100px;margin-right:5px" :src="url" :preview-src-list="srcList"></el-image>
                                        <el-image style="width: 100px; height: 100px;margin-right:5px" :src="url" :preview-src-list="srcList"></el-image>
                                    </div>
                                </div>
                                <div style="margin-top:10px">跟进节点<font style="margin-left:52px;">提供方案/报价</font></div>
                                <div style="margin-top:10px;display: flex;"><font style="flex:0 0 58px">跟进内容</font><span style="margin-left:50px;">上门拜访，并进行产品演示，需带样品箱上门拜访，并进行产品演示，需带样品箱上门拜访，并进行产品演示，需带样品箱上门拜访，并进行产品演示，需带样品箱</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </el-drawer>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component({
    name: 'ProjectList2Detail',
    components: {}
})
export default class ProjectList2Detail extends Vue {
    @Prop({ type: Boolean, required: true, default: true }) drawer: any;
    radio1: string = '跟进记录';
    url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    srcList: [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
    ]

    handleClose () {
        this.$emit('backEvent')
    }
}
</script>
<style lang='scss' scoped>
@import "./css/detail.scss";
</style>