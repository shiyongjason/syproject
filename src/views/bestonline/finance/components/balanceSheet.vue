<template>
<el-collapse-item name="10">
    <template slot="title">
        <p class="titlt-p">资产负债表（必填一项）</p>
    </template>
    <div class="table-cont-tabs">
        <el-tabs type="card" v-model="tabName" @tab-click="onChangeYear">
            <el-tab-pane label="本年度" name="nowYear"></el-tab-pane>
            <el-tab-pane label="上年度" name="lastYear"></el-tab-pane>
            <el-tab-pane label="上上年度" name="lastLastYear"></el-tab-pane>
        </el-tabs>
    </div>
    <div class="form-cont-row">
        <div class="form-cont-col">
            <el-form-item label="编制单位：">
                <el-input v-model="form.assetsLiabilities.writer" placeholder="请输入编制单位"></el-input>
            </el-form-item>
        </div>
        <div class="form-cont-col">
            <el-form-item label="时间：">
                <el-date-picker v-model="form.assetsLiabilities.recordTime" type="date" placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
        </div>
        <div class="form-cont-col">
            <el-form-item label="单位：万">
            </el-form-item>
        </div>
    </div>
    <div class="double-table">
        <div class="table-flex">
            <div class="table-row">
                <div class="table-col table_h">资产</div>
                <div class="table-col table_h">期末余额</div>
                <div class="table-col table_h">年初余额</div>
            </div>
            <div class="table-row" v-for="(item,index) in form.assetsLiabilities.assetList" :key="index">
                <template v-if="index === 0 || index === 13">
                    <div class="table-col subtitle">{{item.typeName}}</div>
                </template>
                <template v-else>
                    <div class="table-col">{{item.typeName}}</div>
                    <div class="table-col">
                        <el-input v-model="item.endOrCurrent" placeholder="请输入内容" maxlength="25" @keyup.native="oninputAssets('assetList', index, 'endOrCurrent', $event)">
                            <template slot="suffix">万</template>
                        </el-input>
                    </div>
                    <div class="table-col">
                        <el-input v-model="item.beginOrPrior" placeholder="请输入内容" maxlength="25" @keyup.native="oninputAssets('assetList', index, 'beginOrPrior', $event)">
                            <template slot="suffix">万</template>
                        </el-input>
                    </div>
                </template>
            </div>
        </div>
        <div class="table-flex">
            <div class="table-row">
                <div class="table-col table_h">负债和所有者权益（或股东权益）</div>
                <div class="table-col table_h">期末余额</div>
                <div class="table-col table_h">年初余额</div>
            </div>
            <div class="table-row" v-for="(item,index) in form.assetsLiabilities.liabilitiesList" :key="index">
                <template v-if="index === 0 || index === 14 || index === 24">
                    <div class="table-col subtitle">{{item.typeName}}</div>
                </template>
                <template v-else>
                    <div class="table-col">{{item.typeName}}</div>
                    <div class="table-col">
                        <el-input v-model="item.endOrCurrent" placeholder="请输入内容" maxlength="25" @keyup.native="oninputAssets('liabilitiesList', index, 'endOrCurrent', $event)">
                            <template slot="suffix">万</template>
                        </el-input>
                    </div>
                    <div class="table-col">
                        <el-input v-model="item.beginOrPrior" placeholder="请输入内容" maxlength="25" @keyup.native="oninputAssets('liabilitiesList', index, 'beginOrPrior', $event)">
                            <template slot="suffix">万</template>
                        </el-input>
                    </div>
                </template>
            </div>
            <div class="table-row"></div>
        </div>
    </div>
</el-collapse-item>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data () {
        return {
            tabName: 'nowYear'
        }
    },
    computed: {
        ...mapState({
            form: state => state.dueDiligence.financeData
        })
    },
    methods: {
        onChangeYear () {}
    }
}
</script>

<style lang="scss" scoped>
.title-p {
    font-size: 18px;
    font-weight: 500;
    margin: 0;
}
.small-title {
    padding: 10px;
    font-size: 17px;
    line-height: 40px;
    background: #fafafa;
}
.item-wrapper {
    margin: 20px 0 20px;
}
table {
    border-collapse: collapse;
}
table, tr, td {
    border: 1px solid #dddddd;
    text-align: center;
    line-height: 40px;
}
/deep/ .el-collapse-item__wrap {
    padding: 15px 0;
}
</style>
