<template>
    <div class="page-body">
        <div class="page-body-cont">
            <el-card class="box-card">
                <el-tabs type="card">
                    <el-tab-pane label="初审">
                        <tabPreliminaryReview />
                    </el-tab-pane>
                    <el-tab-pane label="项目资料清单">
                        <tabChecklist />
                    </el-tab-pane>
                    <el-tab-pane label="立项">
                        <tabLetterTrial />
                    </el-tab-pane>
                    <el-tab-pane label="终审">
                        <tabFinalReview />
                    </el-tab-pane>
                </el-tabs>
                <!-- bottom button -->
                <div class="bottom-button">
                    <p>
                        <el-button style="width:130px;background:#ccc;color:#fff" @click="onBack">返回</el-button>
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
export default {
    name: 'approvalDetails',
    components: {
        tabPreliminaryReview: () => import('./components/tabPreliminaryReview'),
        tabChecklist: () => import('./components/tabChecklist'),
        tabLetterTrial: () => import('./components/tabLetterTrial'),
        tabFinalReview: () => import('./components/tabFinalReview')
    },
    data () {
        return {
            tabPosition: 'left'
        }
    },
    methods: {
        onBack () {
            this.$router.go(-1)
        }

    },
    mounted () {
        console.log('parent')
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