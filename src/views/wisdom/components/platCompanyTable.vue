<template>
    <div class="wrapper">
        <div class="collapse">
            <img
                src="../../../assets/images/typeIcon.png"
                alt=""
                class="collapse"
                @click="collapse = !collapse"
            >
        </div>
        <el-collapse-transition>
            <div
                class="collapse-content"
                v-if="collapse"
            >
                <el-checkbox
                    :indeterminate="isIndeterminate"
                    v-model="checkAll"
                    @change="handleCheckAllChange"
                >全选</el-checkbox>
                <!-- <el-checkbox
                    :indeterminate="isIndeterminate"
                    v-model="checkAll"
                    @change="handleCheckAllChange"
                >全选</el-checkbox> -->
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group
                    v-model="selectTh"
                    @change="handleCheckedCitiesChange"
                >
                    <el-checkbox
                        v-for="item in defaultTh"
                        :label="item"
                        :key="item"
                    >{{item}}</el-checkbox>
                </el-checkbox-group>
            </div>
        </el-collapse-transition>
        <el-table
            :data="tableData"
            style="width: 100%"
        >
            <el-table-column
                prop="misCode"
                label="编码"
                width="60"
                align='center'
                v-if="selectTh.indexOf('编码')>-1"
            >
            </el-table-column>
            <el-table-column
                prop="companyShortName"
                label="公司简称"
                width="120"
                align='center'
                v-if="selectTh.indexOf('公司简称')>-1"
            >
            </el-table-column>
            <el-table-column
                prop="subsectionName"
                label="分部"
                width="120"
                align='center'
                v-if="selectTh.indexOf('分部')>-1"
            >
            </el-table-column>
            <el-table-column
                prop="provinceName"
                label="省份"
                width="120"
                align='center'
                v-if="selectTh.indexOf('省份')>-1"
            >
            </el-table-column>
            <el-table-column
                prop="cityName"
                label="城市"
                width="120"
                align='center'
                v-if="selectTh.indexOf('城市')>-1"
            >
            </el-table-column>
            <el-table-column
                label="上线信息"
                align='center'
                v-if="selectTh.indexOf('上线信息')>-1"
            >
                <el-table-column
                    label="上线时间"
                    width="120"
                    align='center'
                >
                    <template slot-scope="scope">
                        {{scope.row.companyOrderVo.confirmDate}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="最新签约规模/万"
                    label-class-name="red"
                    width="100"
                    align='center'
                >
                    <template slot-scope="scope">
                        <span
                            @click="findSignscale(scope.row.companyCode)"
                            class="pointer blue"
                        >{{scope.row.developSignInfoVo.signScale}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="销售规模增长"
                    label-class-name="red"
                    width="100"
                    align='center'
                >
                    <template slot-scope="scope">
                        {{scope.row.developSignInfoVo.salesVolume*100}}%
                    </template>
                </el-table-column>
                <el-table-column
                    label="注册资本/万"
                    label-class-name="red"
                    width="100"
                    align='center'
                >
                    <template slot-scope="scope">
                        {{scope.row.registeredFundChangeVo.sumRegisterFund}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="我方注册资金/万"
                    width="100"
                    label-class-name="red"
                    align='center'
                >
                    <template slot-scope="scope">
                        {{scope.row.developSignInfoVo.ourRegisteredFund}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="利润增长"
                    width="120"
                    align='center'
                >
                    <template slot-scope="scope">
                        {{scope.row.developSignInfoVo.profitGrowth*100}}%
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column
                label="往期销售"
                width="120"
                v-if="selectTh.indexOf('往期销售')>-1"
                align='center'
            >
                <el-table-column
                    label="上年度实际/万"
                    width="120"
                    align='center'
                >
                    <template slot-scope="scope">
                        {{scope.row.companyOrderVo ? scope.row.companyOrderVo.totalOrderFee : ''}}
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column
                label="关键人员"
                width="120"
                v-if="selectTh.indexOf('关键人员')>-1"
                align='center'
            >
                <el-table-column
                    prop="controllerName"
                    label="实际控制人"
                    width="120"
                    align='center'
                >
                </el-table-column>
                <el-table-column
                    label="新公司总经理"
                    width="120"
                    align='center'
                >
                    <template slot-scope="scope">
                        {{scope.row.developSignInfoVo.signerName}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="自然人股东"
                    width="120"
                    align='center'
                >
                    <template slot-scope="scope">
                        {{scope.row.developSignInfoVo.signerName}}
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column
                prop="name"
                label="业务形态"
                v-if="selectTh.indexOf('业务形态')>-1"
                align='center'
            >
                <el-table-column
                    prop="companyType"
                    label="公司类型"
                    width="120"
                    align='center'
                >
                </el-table-column>
                <el-table-column
                    label="主要业态"
                    width="120"
                    align='center'
                >
                    <template slot-scope="scope">
                        <span v-if="scope.row.mainFormat==0">零售</span>
                        <span v-if="scope.row.mainFormat==1">批发</span>
                        <span v-if="scope.row.mainFormat==2">工程</span>
                        <span v-if="scope.row.mainFormat==3">零售>批发、工程</span>
                        <span v-if="scope.row.mainFormat==4">批发>零售、工程</span>
                        <span v-if="scope.row.mainFormat==5">工程>批发、零售</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="mainSystem"
                    label="主营系统"
                    width="120"
                    align='center'
                >
                </el-table-column>
                <el-table-column
                    prop="mainBrand"
                    label="主设备品牌"
                    width="120"
                    align='center'
                >
                </el-table-column>
            </el-table-column>
            <el-table-column
                label="老公司"
                width="120"
                v-if="selectTh.indexOf('老公司')>-1"
                align='center'
            >
                <el-table-column
                    prop="originaCompanyName"
                    label="老公司名称"
                    width="120"
                    align='center'
                >
                </el-table-column>
                <el-table-column
                    label="老公司规模"
                    width="120"
                    align='center'
                >
                    <template slot-scope="scope">
                        {{scope.row.developSignInfoVo.oldCompanyScale}}
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column
                label="关联公司"
                width="120"
                v-if="selectTh.indexOf('关联公司')>-1"
                align='center'
            >
                <el-table-column
                    label="关联公司"
                    width="120"
                    align='center'
                >
                    <template slot-scope="scope">
                        <p v-if="scope.row.companyOrderVo">
                            <span
                                v-for="(item,index) in scope.row.companyOrderVo.misGlgsVoList"
                                :key="index"
                            >{{index>0?','+item.glgsGlgsmc:item.glgsGlgsmc}}</span>
                        </p>
                    </template>
                </el-table-column>

                <el-table-column
                    label="实际运作公司"
                    width="120"
                    align='center'
                >
                    <template slot-scope="scope">
                        <span v-if="scope.row.companyOrderVo">
                            {{scope.row.companyOrderVo.misKjdwVo.kjdwQc?scope.row.companyOrderVo.misKjdwVo.kjdwQc:''}}
                        </span>
                    </template>
                </el-table-column>
            </el-table-column>
               <el-table-column
                prop="classificationLevel"
                    label="分类"
                    width="120"
                     v-if="selectTh.indexOf('分类')>-1"
                     align='center'
                >
                </el-table-column>
            <el-table-column
                label="操作"
                width="120"
                align='center'
            >
                <template slot-scope="scope">
                    <span
                        class="blue"
                        @click="editType(scope.row)"
                    >
                        编辑
                    </span>
                </template>
            </el-table-column>
        </el-table>

        <div
            class="page clearfix"
            style="text-align: center"
        >
            <el-pagination
                class="el-page"
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="paginationData.pageNumber"
                :page-sizes="[10,20,30,40,50]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="paginationData.totalElements"
            >
            </el-pagination>
        </div>
        <PlatDialog
            ref="PlatDialog"
            :show.sync="show"
            :companyCode="companyCode"
            v-if="companyCode"
        />
        <el-dialog
            title="级别"
            :visible.sync="dialogVisible"
            width="500px"
            center
        >
            <el-form label-width="80px">
                <el-form-item label="分类:">
                    <el-select
                        v-model="updateForm.classificationLevel"
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="item in options"
                            :key="item.label"
                            :label="item.value"
                            :value="item.label"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="关联公司:">
                    <el-input
                        type="textarea"
                        v-model="updateForm.associatedCompanys"
                    ></el-input>
                </el-form-item>
            </el-form>
            <span
                slot="footer"
                class="dialog-footer"
            >
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button
                    type="primary"
                    @click="onUpdateBasicinfo"
                >确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import PlatDialog from '../components/platDialog'
import { updateBasicinfo } from '../api/index.js'
import { mapState } from 'vuex'
export default {
    name: 'platCompanyTable',
    props: {
        tableData: {
            type: Array,
            required: false,
            default () {
                return []
            }
        },
        paginationData: {
            type: Object,
            default () {
                return {
                    totalElements: 0,
                    pageSize: 10,
                    pageNumber: 1
                }
            }
        }
    },
    data () {
        return {
            defaultTh: [
                '编码',
                '公司简称',
                '分部',
                '省份',
                '城市',
                '上线信息',
                '往期销售',
                '关键人员',
                '业务形态',
                '老公司',
                '关联公司',
                '分类'
            ],
            selectTh: [],
            checkAll: true,
            checkedCities: [],
            isIndeterminate: true,
            collapse: false,
            platList: [],
            companyCode: '',
            show: false,
            dialogVisible: false,
            updateForm: {
                associatedCompanys: '',
                classificationLevel: '',
                companyCode: ''
            },
            options: [{ value: 'A', label: 'A' }, { value: 'B', label: 'B' }, { value: 'C', label: 'C' }, { value: 'D', label: 'D' }]
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    components: {
        PlatDialog
    },
    mounted () {
        const selectThObj = JSON.parse(localStorage.getItem('selectThObj'))
        if (selectThObj && (selectThObj.uid === this.userInfo.uid)) {
            this.selectTh = selectThObj.selectTh
            // console.log(this.selectTh.length === this.defaultTh.length)
            if (this.selectTh.length === this.defaultTh.length) {
                this.checkAll = true
                this.isIndeterminate = true
            } else {
                this.checkAll = false
                this.isIndeterminate = false
            }
        } else {
            this.selectTh = this.defaultTh
            this.checkAll = true
        }
    },
    methods: {
        findSignscale (value) {
            this.show = true
            this.companyCode = value
        },
        handleSizeChange (val) {
            this.loading = true
            this.$emit('onSizeChange', val)
        },
        handleCurrentChange (val) {
            this.loading = true
            this.$emit('onCurrentChange', val)
        },
        handleCheckAllChange (val) {
            this.selectTh = val ? this.defaultTh : []
            const selectThObj = {
                uid: this.userInfo.uid,
                selectTh: this.selectTh
            }
            localStorage.setItem('selectThObj', JSON.stringify(selectThObj))
            // this.isIndeterminate = false
        },
        handleCheckedCitiesChange (value) {
            const selectThObj = {
                uid: this.userInfo.uid,
                selectTh: value
            }
            // this.checkAll = false
            // this.isIndeterminate = false
            localStorage.setItem('selectThObj', JSON.stringify(selectThObj))
            let checkedCount = value.length
            this.checkAll = checkedCount === this.defaultTh.length
            // console.log(checkedCount, this.checkAll)
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.selectTh.length
        },
        editType (val) {
            this.dialogVisible = true
            this.updateForm.classificationLevel = val.classificationLevel
            this.updateForm.associatedCompanys = val.associatedCompanys
            this.updateForm.companyCode = val.companyCode
        },
        async onUpdateBasicinfo () {
            this.dialogVisible = false
            await updateBasicinfo(this.updateForm)
            this.$parent.findCompanyList()
            this.$message({
                showClose: true,
                message: '添加成功',
                type: 'success'

            })
        }
    }
}
</script>

<style scoped lang="scss">
.wrapper {
    position: relative;
}
.collapse {
    position: absolute;
    width: 20px;
    height: 20px;
    right: 10px;
    top: 2px;
    z-index: 100;
    cursor: pointer;
}
.collapse-content {
    position: absolute;
    width: 180px;
    top: 35px;
    right: 10px;
    background: #ffffff;
    z-index: 100;
    padding: 10px 18px;
    box-sizing: border-box;
}
.el-checkbox + .el-checkbox {
    margin-left: 0;
    float: left;
    width: 100%;
}
</style>
