<template>
    <el-drawer title="项目详情" :visible.sync="drawer" :before-close="handleClose" :modal-append-to-body='false' size='680px'>
        <div class="ProjectList2Detail">
            <div class="radio-group">
                <el-radio-group v-model="radio">
                    <el-radio-button label="跟进记录"></el-radio-button>
                    <el-radio-button label="项目信息"></el-radio-button>
                </el-radio-group>
            </div>
            <div class="ProjectList2Detail-ctx" :style="radio=='跟进记录'?'bottom:0':'bottom:60px'">
                <div v-if="radio=='跟进记录'">
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
                <div v-if="radio=='项目信息'">
                    <el-form id='elform' :model="signForm" :rules="formRules"  label-width="140px"  label-position='right' ref="purchaseConclusionForm" class="list2">
                        <div class="project-detail-item">
                            <el-form-item  prop='fundMoneys' label="甲方名称：">
                                <el-input  placeholder="请输入甲方名称" v-model='signForm.name'></el-input>
                            </el-form-item>
                        </div>
                        <div class="project-detail-item">
                            <el-form-item  prop='fundMoneys' label="项目名称：">
                                <el-input  placeholder="请输入项目名称" v-model='signForm.name'></el-input>
                            </el-form-item>
                        </div>
                        <div class="project-detail-item">
                            <el-form-item  label="">
                                <div slot="label" style="line-height: 20px;">项目建筑类型<br/>（可多选）：</div>
                                <el-select v-model="signForm.name" multiple placeholder="请选择">
                                    <el-option v-for="item in buildingType" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="project-detail-item">
                            <el-form-item  label="">
                                <div slot="label" style="line-height: 20px;"><font style="padding-right:10px">项目角色</font><br/>（可多选）：</div>
                                <el-select v-model="signForm.name" multiple placeholder="请选择">
                                    <el-option v-for="item in role" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="project-detail-item">
                            <el-form-item  label="">
                                <div slot="label">项目所处的阶段：</div>
                                <el-select v-model="signForm.name" multiple placeholder="请选择">
                                    <el-option v-for="item in atthestage" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="project-detail-item">
                            <el-form-item  label="">
                                <div slot="label" style="line-height: 20px;"><font>可从总部采购产品</font><br/>（可多选）：</div>
                                <el-select v-model="signForm.name" multiple placeholder="请选择">
                                    <el-option v-for="item in purchaseproducts" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="project-detail-item">
                            <el-form-item  label="">
                                <div slot="label" style="line-height: 20px;"><font>工程项目智能化需求</font><br/>（可多选）：</div>
                                <el-select v-model="signForm.name" multiple placeholder="请选择">
                                    <el-option v-for="item in intelligentdemand" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="form-item">
                            <el-form-item  prop='name' label="项目预计交付时间：">
                                <el-date-picker v-model="signForm.name" type="date" placeholder="选择日期"></el-date-picker>
                            </el-form-item>
                        </div>
                    </el-form>
                    <div style="color:#606266;line-height:23px">创建时间：2020年02月03日 00:00:00</div>
                    <div style="color:#606266;line-height:23px">创建人：赵娟（15134214045</div>
                    <div style="color:#606266;line-height:23px">最近维护时间：2021-06-03 09:22:23</div>
                    <div style="color:#606266;line-height:23px">最近维护人：李磊 (15950469951)</div>
                </div>

            </div>
            <div class="bottom-line" v-if="radio=='项目信息'"></div>
            <div class="fixed-btn" v-if="radio=='项目信息'"><h-button type="primary" >保存</h-button></div>
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
    radio: string = '跟进记录';
    url = 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    srcList = [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg'
    ]
    signForm = {
        name: ''
    }

    handleClose () {
        this.$emit('backEvent')
    }
}
</script>
<style lang='scss' scoped>
@import "./css/detail.scss";
</style>