<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-title">SPU编码：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.spuCode" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">SKU编码：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.spuCode" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">子订单编号：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.spuCode" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">订单来源：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.spuCode" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">商品所属：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.spuCode" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">商品名称：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.spuCode" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">商品数量：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.spuCode" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">商品类目：</div>
                    <div class="query-col-input">
                        <el-cascader v-model="queryParamsProductTotal.categoryId" :options="categoryOptions" :change-on-select="true" @change="productCategoryChange" style="width: 100%"></el-cascader>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">订单状态：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.integrity">
                            <el-option v-for="item in orderStatusOptions" :label="item.label" :value="item.value" :key="item.key"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">订单渠道：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.integrity">
                            <el-option v-for="item in orderChannelOptions" :label="item.label" :value="item.value" :key="item.key"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">支付时间：</div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.orderTimeStart" type="date" format="yyyy-MM-dd" placeholder="开始日期" :picker-options="pickerOptionsStart">
                        </el-date-picker>
                        <span class="ml10 mr10">-</span>
                        <el-date-picker v-model="queryParams.orderTimeEnd" type="date" format="yyyy-MM-dd" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-input">
                        <el-button type="primary" class="ml20" @click="searchList()">
                            查询
                        </el-button>
                        <el-button type="primary" class="ml20" @click="onRest()">
                            重置
                        </el-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <!-- <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" :multiSelection.sync="multiSelection" :isMultiple="true" :isAction="true" :actionMinWidth=250 ::rowKey="rowKey"
                :isShowIndex='true'>
                <template slot="brandName" slot-scope="scope">
                    {{scope.data.row.brandName}}{{scope.data.row.brandNameEn}}
                </template>
                <template slot="status" slot-scope="scope">
                    <span :class="scope.data.row.status==1?'colred':'colgry'">{{scope.data.row.status==1?'启用':'禁用'}}</span>
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button type="success" size="mini" plain @click="onEditSpu(scope.data.row)">编辑</el-button>
                    <el-button :type="scope.data.row.status ==1?'primary':''" size="mini" plain @click="onChangeSpu(scope.data.row)" v-text="scope.data.row.status === 1 ? '禁用' : '启用'">
                    </el-button>
                </template>
            </basicTable> -->
        </div>
    </div>   
</template>

<script>
import { ORDER_STATUS_OPTIONS, ORDER_CHANNERL_OPTIONS, SELF_SUPPORT_OPTIONS } from './const'
import { PAY_METHOD_OPTIONS } from '@/utils/const'
export default {
    data () {
        return {
            orderStatusOptions: ORDER_STATUS_OPTIONS,
            paymethodOptions: PAY_METHOD_OPTIONS,
            orderChannelOptions: ORDER_CHANNERL_OPTIONS,
            selfSupportOptions: SELF_SUPPORT_OPTIONS,
            queryParams: {}
        }
    },
    computed: {
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.orderTimeEnd
                    if (beginDateVal) {
                        return time.getTime() >= new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.orderTimeStart
                    if (beginDateVal) {
                        return time.getTime() <= new Date(beginDateVal).getTime() - 8.64e7
                    }
                }
            }
        }
    },
    mounted () {
        console.log(this.orderStatusOptions)
    }
}
</script>