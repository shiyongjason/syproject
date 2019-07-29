<template>
    <div class="page-body">
        <div class="page-body-cont">
            <div class="page-header">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item >尽调管理</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{path:'/bestonline/review'}">现场尽调</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{path:'/bestonline/evaluation',query:{applyId}}">{{companyName}}</el-breadcrumb-item>
                    <el-breadcrumb-item >管理</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="reviewform">
                <el-tabs :tab-position="tabPosition"  v-model="activeName">
                    <el-tab-pane label="合作目标" name="one">
                        <HCootarget v-if="activeName=='one'" :roleType='oneType' @parentFun = 'getCooperativetarget'/>
                    </el-tab-pane>

                    <el-tab-pane label="调前信息" name="two">
                        <HInformation   v-if="activeName=='two'"/>
                    </el-tab-pane>

                    <template v-if="Cooperation">

                        <el-tab-pane label="商业尽调" name="three" >
                            <HBusiness v-if="activeName=='three'"  :roleType='twoType' />
                        </el-tab-pane>

                        <el-tab-pane label="财务尽调" name="four" >
                            <HFinance v-if="activeName=='four'" :roleType='threeType'/>
                        </el-tab-pane>

                        <el-tab-pane label="法务尽调" name="five" >
                            <HJustice v-if="activeName=='five'" :roleType='fourType'/>
                        </el-tab-pane>

                        <el-tab-pane label="组织尽调" name="six" :lazy="true">
                            <HOrganization v-if="activeName=='six'" :roleType='fiveType'/>
                        </el-tab-pane>

                        <el-tab-pane label="附件上传" name="seven" >
                            <HAccessory v-if="activeName=='seven'"/>
                        </el-tab-pane>
                        <!-- <el-tab-pane label="尽调评估及KPI" name="eight" >
                            <HEvaluation v-if="activeName=='eight'"/>
                        </el-tab-pane> -->
                    </template>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
import HInformation from './components/HInformation'
import HCootarget from './components/HCootarget'
import HBusiness from './components/HBusiness'
import HFinance from './components/HFinance'
import HOrganization from './components/HOrganization'
import HAccessory from './components/HAccessory'
import HJustice from './components/HJustice'
import { getCooperativetarget } from './api/index.js'
import { mapState } from 'vuex'

export default {
    name: 'reviewform',
    data () {
        return {
            tabPosition: 'left',
            activeName: 'one',
            applyId: '',
            Cooperation: '',
            oneType: false,
            twoType: false,
            threeType: false,
            fourType: false,
            fiveType: false,
            target: ''
        }
    },
    components: {
        HInformation,
        HCootarget,
        HBusiness,
        HFinance,
        HOrganization,
        HAccessory,
        HJustice
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
        this.getCooperativetarget()
        this.getRoletype()
    },
    methods: {
        async getCooperativetarget () {
            const { data } = await getCooperativetarget(this.applyId)
            if (data.data.operationNode === 1) {
                this.Cooperation = true
            } else {
                this.Cooperation = false
            }
        },
        getRoletype () {
            const role = this.userInfo.positionCode
            const target = this.target
            if (target >= 3000) {
                if (role === 'JDgroup-ChiefOperation') { // 尽调规模>=3000W 时，只有“尽调小组-总部平台运营”  = >商业
                    this.twoType = true
                } else if (role === 'JDgroup-ChiefFinance') { //  尽调小组-财务 = > 财务
                    this.threeType = true
                } else if (role === 'JDgroup-LegalAffairs') { //  尽调小组-法务 = > 法务
                    this.fourType = true
                } else if (role === 'JDgroup-PlatformOrganization') { //  尽调小组-平台组织 = > 组织
                    this.fiveType = true
                }
            } else if (target < 3000 && target > 0) {
                if (role === 'JDgroup-SegmentFinance' || role === 'JDgroup-SegmentOperation') { // 分部财务 分部运营
                    // this.oneType = true
                    this.twoType = true
                    this.threeType = true
                    this.fourType = true
                    this.fiveType = true
                } else if (role === 'JDgroup-LegalAffairs') {
                    this.fourType = true
                }
            }
            if (role === 'JDmanager' || role === 'JDgroup-ChiefBD') { // “尽调管理员”“总部发展”  合作目标
                this.oneType = true
            } else {
                this.oneType = false
            }
        }
    }
}
</script>
<style lang="scss">
.jd-manage {
    margin-bottom: 200px;
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
            // overflow: hidden;
            text-overflow: ellipsis;
            white-space: normal;
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
            .el-select {
                width: 100%;
            }
            .el-textarea__inner{
                border: none
            }
        }
    }
}

.titlt-p {
    font-size: 18px;
    color: #409eff;
    font-weight: 500;
    margin: 0;
}
.small-title {
    font-size: 16px;
    margin-top: 0;
    border-bottom: 1px solid #dddddd;
}
.el-collapse-item__wrap {
    padding: 15px;
}
.el-collapse-item__header.is-active {
    // border-left:5px solid #eae8e8
}
.el-input__suffix{
    line-height: 40px;
}input:disabled{
    // background-color : #fff; // 修改默认灰色样式
    // color: #000;
    opacity:1; // 默认的不透明级别为0.3
    -webkit-text-fill-color: #353638 // 字体颜色安卓与IOS适配】
    // -webkit-opacity: 1; // 不透明级别安卓与IOS适配
}
textarea:disabled{
    // background-color : #fff; // 修改默认灰色样式
    // color: #000;
    opacity:1; // 默认的不透明级别为0.3
    -webkit-text-fill-color: #353638 // 字体颜色安卓与IOS适配】
    // -webkit-opacity: 1; // 不透明级别安卓与IOS适配
}
select:disabled{
    // background-color : #fff; // 修改默认灰色样式
    // color: #000;
    opacity:1; // 默认的不透明级别为0.3
    -webkit-text-fill-color: #353638 // 字体颜色安卓与IOS适配】
    // -webkit-opacity: 1; // 不透明级别安卓与IOS适配
}
input:disabled::-webkit-input-placeholder{
  color: #cccccc;
  -webkit-text-fill-color: #ccc;
  opacity: 0.8;
  -webkit-opacity:0.8;
}
textarea:disabled::-webkit-input-placeholder{
  color: #cccccc;
  -webkit-text-fill-color: #ccc;
  opacity: 0.8;
  -webkit-opacity:0.8;
}
select:disabled::-webkit-input-placeholder{
  color: #cccccc;
  -webkit-text-fill-color: #ccc;
  opacity: 0.8;
  -webkit-opacity:0.8;
}
    .el-input.is-disabled .el-input__inner,.el-textarea.is-disabled .el-textarea__inner{
        border: 0;
        background: #ffffff;
    }
    .el-input.is-disabled .el-input__inner:hover,.el-textarea.is-disabled .el-textarea__inner:hover{
        cursor: default;
    }
    .el-input.is-disabled .el-input__icon{
        display: none;
    }
    .el-input.is-disabled .el-input__icon:hover{
        cursor: default;
    }
    .el-input.is-disabled .el-input__inner, .el-textarea.is-disabled .el-textarea__inner{
        outline: none;
        resize:none
    }

</style>
