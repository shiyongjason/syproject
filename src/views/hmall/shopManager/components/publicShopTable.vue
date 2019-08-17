<template>
    <div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <el-button type="primary" class="ml20" @click="openMark()">
                    添加共享商品类目
                </el-button>
                <el-button type="primary" class="ml20" @click="deleteCategory(false)">批量删除</el-button>
            </div>
        </div>
        <div class="page-body-cont">
            <el-table :data="tableData"
                      border
                      style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column
                    type="selection"
                    align="center"
                    width="55">
                </el-table-column>
                <el-table-column
                    prop="merchantName"
                    align="left"
                    label="平台公司名称">
                </el-table-column>
                <el-table-column
                    prop="shareMerchantName"
                    align="left"
                    label="共享平台公司名称">
                </el-table-column>
                <el-table-column
                    prop="shareCategoryName"
                    align="left"
                    label="共享类目名称">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="状态">
                    <template  slot-scope="scope">
                        <span v-text="scope.row.isEnable === 0 ? '停用' : '启用'"></span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="modifyOperator"
                    align="left"
                    label="维护人">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="维护时间">
                    <template slot-scope="scope">
                        {{scope.row.modifyTime | formatterTime}}
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.isEnable === 0" class="orangeBtn"
                                   @click="updatePublicShop(scope.row, 1)">启用
                        </el-button>
                        <el-button v-if="scope.row.isEnable === 1" class="orangeBtn"
                                   @click="updatePublicShop(scope.row, 0)">停用
                        </el-button>
                        <el-button class="orangeBtn"
                                   @click="deleteCategory(scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page clearfix" style="text-align: center;margin-top: 20px">
                <el-pagination
                    class="el-page"
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="paginationData.pageNumber"
                    :page-sizes="[10,20,30,40,50]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :onQuery="onQuery"
                    :total="paginationData.totalElements">
                </el-pagination>
            </div>
        </div>
        <el-dialog title="添加共享商品类目" :visible.sync="addCategoryDialog" width="780px">
            <div class="dialog-query">
                <div class="dialog-query-cont-col">
                    <div class="query-col-title">选择平台公司：</div>
                    <div class="query-col-input">
                        <el-select ref="companyLeft" v-model="dialogSearch.company" :filterable="true" placeholder="请选择" @change="handleCompany">
                            <el-option
                                v-for="item in companyListLeft"
                                :key="item.organizationCode"
                                :label="item.organizationShortName"
                                :value="item.organizationCode">
                            </el-option>
                        </el-select>
                        <!--<el-autocomplete-->
                            <!--v-model="dialogSearch.company"-->
                            <!--:fetch-suggestions="querySearchCompany"-->
                            <!--placeholder="请选择"-->
                            <!--@select="handleCompany"-->
                        <!--&gt;</el-autocomplete>-->
                    </div>
                </div>
                <div class="dialog-query-cont-col">
                    <div class="query-col-title">选择共享平台公司：</div>
                    <div class="query-col-input">
                        <el-select ref="companyRight" v-model="dialogSearch.publicCompany" :filterable="true" placeholder="请选择" @change="handleCompany">
                            <el-option
                                v-for="item in companyListRight"
                                :key="item.organizationCode"
                                :label="item.organizationShortName"
                                :value="item.organizationCode">
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </div>
            <el-transfer v-model="publicModel" :data="publicData" class="transfer"
                         :titles="['已添加的类目', '可添加的类目']"
                         filter-placeholder="请输入类目"
                         filterable
            ></el-transfer>
            <span slot="footer" class="dialog-footer">
                <el-button name="hosjoy-color"  @click="onSave">确认</el-button>
                <el-button name="hosjoy-color" @click="reset">重置</el-button>
                <el-button name="white-color" @click="cancel">取消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { updatePublicShop, findCompanyList, findPublicShopCategory, createPublicShop, deleteCategory } from '../api'
import { mapState } from 'vuex'

export default {
    name: 'publicShopTable',
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
            addCategoryDialog: false,
            publicModel: [],
            publicDataTemp: [],
            dialogSearch: {
                company: '',
                publicCompany: ''
            },
            companyList: [],
            targetCompanyCode: '',
            selectList: []
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        companyListLeft () {
            return this.companyList.filter((value) => {
                return value.organizationCode !== this.dialogSearch.publicCompany
            })
        },
        companyListRight () {
            return this.companyList.filter((value) => {
                return value.organizationCode !== this.dialogSearch.company
            })
        },
        publicData () {
            return this.publicDataTemp.map(value => {
                return {
                    key: value.shareCategoryId,
                    label: value.shareCategoryName
                }
            })
        }
    },
    methods: {
        onSave () {
            // publicModel 为可添加的 小于0 是取数组里面已添加的
            const temp = this.publicDataTemp.filter(value => this.publicModel.indexOf(value.shareCategoryId) < 0)
            if (temp.length < 1) {
                this.$message({
                    type: 'warn',
                    message: '未选择添加类目'
                })
                return
            }
            const params = {
                merchantCode: this.dialogSearch.company,
                merchantName: this.$refs.companyLeft.query,
                modifyOperator: this.userInfo.employeeName,
                reqCategoryList: temp,
                shareMerchantCode: this.dialogSearch.publicCompany,
                shareMerchantName: this.$refs.companyRight.query
            }
            this.createPublicShop(params)
        },
        reset () {
            this.dialogSearch = {
                company: '',
                publicCompany: ''
            }
            this.publicModel = []
            this.publicDataTemp = []
        },
        cancel () {
            this.addCategoryDialog = false
            this.reset()
        },
        onQuery () {
            this.$emit('onQuery')
        },
        handleSizeChange (val) {
            this.$emit('onSizeChange', val)
        },
        handleCurrentChange (val) {
            this.$emit('onCurrentChange', val)
        },
        openMark () {
            this.addCategoryDialog = true
            this.findCompanyList()
        },
        handleSelectionChange (val) {
            this.selectList = val
        },
        async updatePublicShop (row, turnOnOff) {
            await updatePublicShop({
                id: row.id,
                isEnable: turnOnOff,
                updateBy: this.userInfo.employeeName
            })
            this.onQuery()
            let tips = ''
            if (turnOnOff === 1) {
                tips = '启用成功！'
            } else {
                tips = '停用成功！'
            }
            this.$message({
                type: 'success',
                message: tips
            })
        },
        handleCompany (item) {
            // 1 表示全选 2表示共享选 3表示 已选择平台公司
            if (this.dialogSearch.company && this.dialogSearch.publicCompany) {
                this.makeSelectList(1)
            } else if (!this.dialogSearch.company && this.dialogSearch.publicCompany) {
                this.makeSelectList(2)
            } else if (this.dialogSearch.company && !this.dialogSearch.publicCompany) {
                this.makeSelectList(3)
            }
        },
        async makeSelectList (type) {
            if (type === 1) {
                const temp = await this.findPublicShopCategory(1)
                const temp2 = await this.findPublicShopCategory(2)
                const totalTemp = temp.concat(temp2)
                this.publicModel = temp2.map(value => {
                    return value.shareCategoryId
                })
                this.publicDataTemp = totalTemp
            } else if (type === 2) {
                const temp2 = await this.findPublicShopCategory(2)
                this.publicDataTemp = temp2
                this.publicModel = temp2.map(value => {
                    return value.shareCategoryId
                })
            } else if (type === 3) {
                const temp = await this.findPublicShopCategory(1)
                this.publicDataTemp = temp
            }
        },
        createStateFilter (queryString) {
            return (state) => {
                return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
            }
        },
        async findCompanyList () {
            const { data } = await findCompanyList()
            this.companyList = data.data
        },
        async findPublicShopCategory (type) {
            let params = {
                merchantCode: this.dialogSearch.company,
                shareMerchantCode: this.dialogSearch.publicCompany
            }
            params.type = type
            const { data } = await findPublicShopCategory(params)
            return data
        },
        async createPublicShop (params) {
            await createPublicShop(params)
            this.$message({
                type: 'success',
                message: '添加共享商品类目成功'
            })
            this.addCategoryDialog = false
            this.reset()
            this.onQuery()
        },
        async deleteCategory (params) {
            if (params) {
                await deleteCategory({ ids: params.id })
            } else {
                if (this.selectList.length < 1) {
                    this.$message({
                        type: 'error',
                        message: '请选择删除商品类目'
                    })
                } else {
                    const temp = this.selectList.map(value => value.id)
                    await deleteCategory({ ids: temp.join(',') })
                }
            }
            this.onQuery()
        }
    },
    mounted () {
    }
}
</script>

<style lang="scss" scoped>
.dialog-query {
    display: flex;
    justify-content: space-around;
    .dialog-query-cont-col{
        display: flex;
        padding: 20px 0;
        .query-col-title{
            line-height: 40px;
        }
        .el-input{
            width: 160px;
        }
    }
}
.transfer{
    margin-bottom: 20px;
}
</style>
<style>
    .el-transfer-panel{
        width: 312px;
    }
    .el-transfer-panel__item.el-checkbox{
        width: 100%;
    }
</style>
