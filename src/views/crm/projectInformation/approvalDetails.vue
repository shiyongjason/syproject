<template>
    <div class="page-body">
        <div class="page-body-cont">
            <el-card class="box-card">
                <el-tabs type="card" @tab-click="handleClick">
                    <el-tab-pane label="初审">
                        <tabPreliminaryReview :tabPreliminaryReview=tabPreliminaryReviewData v-if="tabPreliminaryReviewData" />
                    </el-tab-pane>
                    <el-tab-pane label="项目资料清单">
                        <tabChecklist :informationDetail=informationDetail v-if="informationDetail" />
                    </el-tab-pane>
                    <el-tab-pane label="立项">
                        <tabLetterTrial :informationDetail=informationDetail v-if="informationDetail" />
                    </el-tab-pane>
                    <el-tab-pane label="终审">
                        <tabFinalReview :informationDetail=informationDetail v-if="informationDetail" />
                    </el-tab-pane>
                </el-tabs>
                <!-- bottom button -->
                <div class="bottom-button">
                    <p>
                        <el-button style="width:130px;" @click="onBack">返回</el-button>
                    </p>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
/*
    初审阶段：
    （1）项目资料清单、立项、终审 的tab页隐藏
    资料搜集阶段：
    （1）立项、终审 的tab页隐藏
    （3）项目资料清单tab下展示文案“资料审核通过后展示”
    立项阶段：
    （1）终审 的tab页隐藏
    （3）立项 的tab页下面展示文案“待立项”，如右图
    终审阶段：
    （1）初审、项目资料清单、立项 tab页下为展示状态
    （2）终审 的tab页下面展示文案“待终审”
    终审结束：
    （1）初审、项目资料清单、立项、终审  tab页为查看状态
 */
import { mapState, mapGetters, mapActions } from 'vuex'
import tabPreliminaryReview from './components/tabPreliminaryReview'
import tabChecklist from './components/tabChecklist'
import tabLetterTrial from './components/tabLetterTrial'
import tabFinalReview from './components/tabFinalReview'
export default {
    name: 'approvalDetails',
    components: {
        tabPreliminaryReview,
        tabChecklist,
        tabLetterTrial,
        tabFinalReview
    },
    data () {
        return {
            tabPosition: 'left',
            tabPreliminaryReviewData: '',
            informationDetailData: ''
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            tabPreliminaryReview: 'projectInformation/tabPreliminaryReview',
            informationDetail: 'projectInformation/informationDetail'
        })
    },
    methods: {
        ...mapActions({
            findProjectInformationDetail: 'projectInformation/findProjectInformationDetail',
            findInformationDetail: 'projectInformation/findInformationDetail'
        }),
        onBack () {
            this.$router.go(-1)
        },
        async getProjectInformationDetail () {
            await this.findProjectInformationDetail(this.$route.query.projectId)
            this.tabPreliminaryReviewData = this.tabPreliminaryReview
        },
        async getInformationDetail (index) {
            let query = {
                bizType: index, // 业务类型 1：项目材料 2：立项材料 3：终审材料
                projectId: this.$route.query.projectId,
                status: this.tabPreliminaryReviewData.status// 工程状态
            }
            await this.findInformationDetail(query)
            this.informationDetailData = this.informationDetail
        },
        handleClick (tab, event) {
            if (tab.index == 0) return
            this.getInformationDetail(tab.index)
        }

    },
    mounted () {
        this.getProjectInformationDetail()
    }
}
</script>

<style lang="scss" scoped>
.bottom-button {
    display: flex;
    margin-left: 50px;
    margin-bottom: 10px;
    p {
        flex: 1;
    }
}
</style>