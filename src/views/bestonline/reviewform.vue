<template>
    <div class="page-body">
        <div class="page-body-cont">
            <div class="companyName">{{$route.query.companyName}}</div>
            <div class="reviewform">
                <el-tabs :tab-position="tabPosition" v-model="activeName">
                    <el-tab-pane label="合作目标" name="one">
                        <HCotarget v-if="activeName=='one'" :roleType='oneType' @parentFun='getCooperativetarget' />
                    </el-tab-pane>

                    <el-tab-pane label="调前信息" name="two">
                        <HInformation v-if="activeName=='two'" />
                    </el-tab-pane>

                    <template v-if="Cooperation">

                        <el-tab-pane label="商业尽调" name="three">
                            <HBusiness v-if="activeName=='three'" :roleType='twoType' />
                        </el-tab-pane>

                        <el-tab-pane label="财务尽调" name="four">
                            <HFinance v-if="activeName=='four'" :roleType='threeType' />
                        </el-tab-pane>

                        <el-tab-pane label="法务尽调" name="five">
                            <HJustice v-if="activeName=='five'" :roleType='fourType' />
                        </el-tab-pane>

                        <el-tab-pane label="组织尽调" name="six" :lazy="true">
                            <HOrganization v-if="activeName=='six'" :roleType='fiveType' />
                        </el-tab-pane>

                        <el-tab-pane label="附件上传" name="seven">
                            <HAccessory v-if="activeName=='seven'" :roleType='sixType' />
                        </el-tab-pane>
                        <el-tab-pane label="尽调评估及KPI" name="eight">
                            <HEvaluation v-if="activeName=='eight'" />
                        </el-tab-pane>
                    </template>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
import HInformation from './components/HInformation'
import HCotarget from './cotarget/index'
import HBusiness from './business/index'
import HFinance from './finance/index'
import HOrganization from './organization/index'
import HAccessory from './components/HAccessory'
import HJustice from './justice/index'
import HEvaluation from './components/HEvaluation'
import { getCooperativetarget } from './api/index.js'
import { mapState } from 'vuex'

export default {
    name: 'reviewform',
    data () {
        return {
            operationNode: '',
            tabPosition: 'left',
            activeName: 'one',
            applyId: '',
            Cooperation: true,
            oneType: false,
            twoType: false,
            threeType: false,
            fourType: false,
            fiveType: false,
            sixType: false,
            target: ''
        }
    },
    components: {
        HInformation,
        HCotarget,
        HBusiness,
        HFinance,
        HOrganization,
        HAccessory,
        HJustice,
        HEvaluation
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        companyName () {
            if (this.$store.state.dueDiligence.companyName === '') {
                return localStorage.getItem('companyName')
            }
            return this.$store.state.dueDiligence.companyName
        }
    },
    mounted () {
        this.applyId = this.$route.query.applyId
        this.target = this.$route.query.target
        // this.getCooperativetarget()
        this.getRoletype()
    },
    methods: {
        async getCooperativetarget () {
            console.log(this.userInfo)
            const { data } = await getCooperativetarget(this.$route.query.applyId)
            this.operationNode = data.data.operationNode
            console.log(this.operationNode)
            if (data.data.operationNode === 1) {
                this.Cooperation = true
                this.oneType = false
            } else {
                this.Cooperation = false
                this.oneType = true
            }
        },
        getRoletype () {
            if (this.$route.query.canEidt) {
                console.log(this.$route.query.status)
                const deptType = this.userInfo.deptType
                const role = this.userInfo.role
                // const target = this.target
                // 尽调管理员
                if (role.indexOf('JDmanager') !== -1) {
                }
                // 总部法务
                if (deptType === 0 && role.indexOf('JDgroup-LegalAffairs') !== -1) {
                    this.fourType = true
                    this.sixType = true
                }
                // 总部平台组织
                if (deptType === 0 && role.indexOf('JDgroup-PlatformOrganization') !== -1) {
                    this.fiveType = true
                    this.sixType = true
                }
                // 总部平台运营
                if (deptType === 0 && role.indexOf('JDgroup-ChiefOperation') !== -1) {
                    this.twoType = true
                    this.sixType = true
                }
                // 总部财务
                if (deptType === 0 && role.indexOf('JDgroup-ChiefFinance') !== -1) {
                    this.threeType = true
                    this.sixType = true
                }
                // 总部发展
                if (deptType === 0 && role.indexOf('JDgroup-ChiefBD') !== -1) {
                    this.getCooperativetarget()
                    this.sixType = true
                }
                // 分部发展
                if (deptType === 2 && role.indexOf('fenbufazhan') !== -1) {
                }
                // 分部财务
                if (deptType === 2 && role.indexOf('JDgroup-SegmentFinance') !== -1) {
                    this.twoType = true
                    this.threeType = true
                    this.fiveType = true
                    this.sixType = true
                }
                // 分部运营
                if (deptType === 2 && role.indexOf('JDgroup-SegmentOperation') !== -1) {
                    this.twoType = true
                    this.threeType = true
                    this.fiveType = true
                    this.sixType = true
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.jd-manage {
    margin-bottom: 200px;
    /deep/ .title-p {
        font-size: 18px;
        font-weight: 500;
        margin: 0;
    }
    .jd-bottom {
        position: fixed;
        bottom: 0;
        background: #ffffff;
        left: 0;
        right: 0;
        padding: 10px;
        text-align: center;
        z-index: 99;
    }
    .minLeft {
        left: 64px;
        transition: 0.3s;
    }
    .maxLeft {
        left: 200px;
        transition: 0.3s;
    }
    .small-title {
        padding: 10px;
        font-size: 17px;
        line-height: 40px;
        background: #fafafa;
    }
}
.assessmentTable {
    margin: 15px;
    td {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        /deep/ .el-select {
            width: 100%;
        }
        /deep/ .el-input {
            width: 100%;
        }
        /deep/ .el-input__inner {
            border: none;
        }
    }
}
.assessmentRow {
    width: calc(100% / 4);
    height: 36px;
}
.reviewform {
    background: #ffffff;
    height: 100%;
    overflow: hidden;
    padding: 10px 0;
    .flex-wrap-box {
        flex: 1 !important;
        max-width: 340px;
    }
    .flex-wrap-title {
        // min-width: 140px;
        word-break: normal;
        margin-right: 10px;
    }
}
.el-tabs--left .el-tabs__item.is-left {
    padding: 0 30px;
}
.table-flex {
    margin: 15px;
    display: flex;
    flex-direction: column;
    border: 1px solid #dddddd;
    border-left: none;
    line-height: 36px;
    .table-row {
        display: flex;
        flex-direction: row;
        // justify-content: space-between;
        border-bottom: 1px solid #dddddd;
        align-items: center;
        // line-height: 36px;
        border-left: 1px solid #dddddd;
        &:last-child {
            border-bottom: none;
        }
        &:not(:first-child) {
            .table-col {
                &:not(:first-child) {
                    display: flex;
                    justify-content: center;
                }
            }
        }
        .table-col {
            flex: 1;
            border-left: 1px solid #dddddd;
            text-align: center;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            /deep/ .el-input {
                width: 100%;
            }
            p {
                // line-height: 24px;
                margin: 0;
                padding: 0;
            }
            &:first-child {
                border-left: none;
            }
            .el-input__inner {
                border: none;
            }
            /deep/ .el-select {
                width: 100%;
            }
            .el-textarea__inner {
                border: none;
            }
        }
    }
}
.item-wrapper {
    width: 100%;
    margin: 20px 0 20px;
    td {
        // width: calc(100% / 3);
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        .el-input {
            width: 100%;
        }
        /deep/ .el-input__inner {
            border: none;
        }
        /deep/.el-textarea__inner {
            border: none;
            resize: none;
        }
        /deep/.el-select {
            width: 100%;
        }
    }
}
.el-collapse-item__header.is-active {
    // border-left:5px solid #eae8e8
}
.el-collapse-item__content {
    position: relative;
}
.el-input__suffix {
    line-height: 40px;
}
input:disabled {
    // background-color : #fff; // 修改默认灰色样式
    // color: #000;
    opacity: 1; // 默认的不透明级别为0.3
    -webkit-text-fill-color: #353638; // 字体颜色安卓与IOS适配】
    // -webkit-opacity: 1; // 不透明级别安卓与IOS适配
}
textarea:disabled {
    // background-color : #fff; // 修改默认灰色样式
    // color: #000;
    opacity: 1; // 默认的不透明级别为0.3
    -webkit-text-fill-color: #353638; // 字体颜色安卓与IOS适配】
    // -webkit-opacity: 1; // 不透明级别安卓与IOS适配
}
select:disabled {
    // background-color : #fff; // 修改默认灰色样式
    // color: #000;
    opacity: 1; // 默认的不透明级别为0.3
    -webkit-text-fill-color: #353638; // 字体颜色安卓与IOS适配】
    // -webkit-opacity: 1; // 不透明级别安卓与IOS适配
}
input:disabled::-webkit-input-placeholder {
    color: #cccccc;
    -webkit-text-fill-color: #ccc;
    opacity: 0.8;
    -webkit-opacity: 0.8;
}
textarea:disabled::-webkit-input-placeholder {
    color: #cccccc;
    -webkit-text-fill-color: #ccc;
    opacity: 0.8;
    -webkit-opacity: 0.8;
}
select:disabled::-webkit-input-placeholder {
    color: #cccccc;
    -webkit-text-fill-color: #ccc;
    opacity: 0.8;
    -webkit-opacity: 0.8;
}
.el-input.is-disabled .el-input__inner,
.el-textarea.is-disabled .el-textarea__inner {
    border: 0;
    background: #ffffff;
}
.el-input.is-disabled .el-input__inner:hover,
.el-textarea.is-disabled .el-textarea__inner:hover {
    cursor: default;
}
.el-input.is-disabled .el-input__icon {
    display: none;
}
.el-input.is-disabled .el-input__icon:hover {
    cursor: default;
}
.el-input.is-disabled .el-input__inner,
.el-textarea.is-disabled .el-textarea__inner {
    outline: none;
    resize: none;
}
.companyName {
    display: inline-block;
    font-size: 18px;
    font-weight: 600;
}
</style>
