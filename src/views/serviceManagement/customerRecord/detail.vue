<template>
    <div class="customerRecordDetail">
        <div class="page-body">
            <div class="page-body-cont query-cont">
                <div class="userInfo">
                    <h3>客户信息</h3>
                    <div class="query-cont-col">
                        <div class="query-col-title">档案ID：</div>
                        <div class="query-col-input">
                            <el-input type="text" maxlength="50" v-model="form.archiveTemplateId" placeholder="请输入档案ID" disabled>
                            </el-input>
                        </div>
                    </div>
                    <div class="query-cont-col">
                        <div class="query-col-title">姓名：</div>
                        <div class="query-col-input">
                            <el-input type="text" maxlength="50" v-model="form.name" placeholder="请输入姓名" disabled>
                            </el-input>
                        </div>
                    </div>
                    <div class="query-cont-col">
                        <div class="query-col-title">手机号：</div>
                        <div class="query-col-input">
                            <el-input type="text" maxlength="50" v-model="form.mobile" placeholder="请输入手机号" disabled>
                            </el-input>
                        </div>
                    </div>
                    <div class="query-cont-col">
                        <div class="query-col-title">地址：</div>
                        <div class="query-col-input">
                            <el-input type="text" maxlength="50" v-model="form.address" placeholder="请输入地址" :disabled='edit'>
                            </el-input>
                        </div>
                    </div>
                    <div class="query-cont-col">
                        <div class="query-col-title">户型：</div>
                        <div class="query-col-input">
                            <el-input type="text" maxlength="50" v-model="form.roomType" placeholder="请输入户型" :disabled='edit'>
                            </el-input>
                        </div>
                    </div>
                    <div class="query-cont-col">
                        <div class="query-col-title">人口：</div>
                        <div class="query-col-input">
                            <el-input type="text" maxlength="50" v-model="form.population" placeholder="请输入人口" :disabled='edit'>
                            </el-input>
                        </div>
                    </div>
                    <div class="query-cont-col">
                        <div class="query-col-title">创建时间：</div>
                        <div class="query-col-input">
                            <span>{{form.createTime | formatterTime}}</span>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="recordInfo">
                    <h3>档案信息</h3>
                    <table class="table-example el-table el-table--border">
                        <thead>
                            <tr>
                                <th>分类</th>
                                <th>区域</th>
                                <th>内容</th>
                                <th>品牌</th>
                                <th>类型</th>
                                <th>型号</th>
                                <th>是否过保</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="(item, index) in childArchiveNodes">
                                <template v-for="(titem, tindex) in item.childArchiveNodes">
                                    <tr v-for="(stItem, stIndex) in titem.childArchiveNodes" :key="(index +'' + tindex+ '' + stIndex)">
                                        <td :rowspan="computedRowspan(item.childArchiveNodes, 0)" v-if="tindex == 0 && stIndex == 0">{{item.name}}{{item.childArchiveNodes.length}}</td>
                                        <td :rowspan="computedRowspan(titem.childArchiveNodes,1)" v-if="stIndex == 0">{{titem.name}}</td>
                                        <td>{{stItem.name}}</td>
                                        <td>{{stItem.archiveDetail.brand}}</td>
                                        <td>{{stItem.archiveDetail.mold}}</td>
                                        <td>{{stItem.archiveDetail.model}}</td>
                                        <td>{{stItem.archiveDetail.isOverInsured == 0?'是':'否'}}</td>
                                    </tr>
                                </template>
                            </template>
                        </tbody>
                    </table>
                    <el-button type="primary" @click="amend()" v-if="!edit">修 改</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { findRecordDetail, updataReportDetail } from './api/index'
export default {
    name: '',
    data () {
        return {
            edit: false,
            form: {},
            childArchiveNodes: []
        }
    },
    async mounted () {
        const id = this.$route.query.id
        this.edit = this.$route.query.action != 'edit'
        const { data } = await findRecordDetail(id)
        console.log(data)
        this.form = data
        this.childArchiveNodes = data.archiveNode.childArchiveNodes
    },
    methods: {
        // 计算table合并行数
        computedRowspan (list, level) {
            if (level == 0) {
                let len = 0
                list.forEach(item => {
                    len += item.childArchiveNodes.length
                })
                return len
            }
            return list.length
        },
        async amend() {
            console.log(this)
            let houseArchiveDataList = []
            this.childArchiveNodes.map((item) => {
                item.childArchiveNodes.map((i) => {
                    i.childArchiveNodes.map((v) => {
                        houseArchiveDataList.push({...v.archiveDetail, propertyId: v.propertyId})
                    })
                })
            })
            const params = {
                houseArchiveId: this.form.id,
                reqHouseArchiveModify: {
                    address: this.form.address,
                    roomType: this.form.roomType,
                    population: this.form.population,
                    userId: this.form.userId,
                    houseArchiveDataList
                }
            }
            const {data} = await updataReportDetail(params)
            console.log(data)
        }
    }
}
</script>

<style lang="scss" scoped>
.customerRecordDetail {
    .userInfo {
        width: 80%;
        margin-left: 10px;
        h3 {
            margin-bottom: 30px;
            padding-left: 10px;
            border-left: 5px solid #ff7a45;
        }
    }
    .query-col-title {
        width: 80px;
    }
    .recordInfo {
        width: 80%;
        margin: 10px 0 0 10px;
        h3 {
            margin-bottom: 30px;
            padding-left: 10px;
            border-left: 5px solid #ff7a45;
        }
        table{
            th,td{
                text-align: center;
            }
        }
    }
}
</style>