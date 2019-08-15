<template>
<div>
    <template slot="title">
        <p class="titlt-p">销售业绩(含税)（万元）</p>
    </template>
    <table class="table-title">
        <thead>
            <tr>
                <td colspan="2" rowspan="2" width="120">月份</td>
                <td colspan="2" width="120">本年度</td>
                <td colspan="2" width="120">上年度</td>
                <td colspan="2" width="120">上上年度</td>
            </tr>
            <tr>
                <td width="120">销售</td>
                <td width="120">占比</td>
                <td width="120">销售</td>
                <td width="120">占比</td>
                <td width="120">销售</td>
                <td width="120">占比</td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in form.dueBusinessSaleCreateFormList" :key="index">
                <td colspan="2">{{item.month}}</td>
                <td>
                    <template v-if="index === 0">
                        <el-input placeholder="" maxlength="25" v-model="currentYearAllSales" @keyup.native="oninput('currentYearAllSales',$event)">
                        </el-input>
                    </template>
                    <template v-else>
                        <el-input placeholder="" maxlength="25" v-model="item.currentYearSales" @keyup.native="oninputSale(index,'currentYearSales',$event)">
                        </el-input>
                    </template>
                </td>
                <td>
                    <template v-if="index === 0"></template>
                    <template v-else>{{ item.currentYearSales/currentYearAllSales | keepTwoNum }}</template>
                </td>
                <td>
                    <template v-if="index === 0">
                        <el-input placeholder="" maxlength="25" v-model="lastYearAllSales" @keyup.native="oninput('lastYearAllSales',$event)">
                        </el-input>
                    </template>
                    <template v-else>
                        <el-input placeholder="" maxlength="25" v-model="item.lastYearSales" @keyup.native="oninputSale(index, 'lastYearSales', $event)">
                        </el-input>
                    </template>
                </td>
                <td>
                    <template v-if="index === 0"></template>
                    <template v-else>{{ item.lastYearSales/lastYearAllSales | keepTwoNum }}</template>
                </td>
                <td>
                    <template v-if="index === 0">
                        <el-input placeholder="" maxlength="25" v-model="lastTwoYearAllSales" @keyup.native="oninput('lastTwoYearAllSales',$event)">
                        </el-input>
                    </template>
                    <template v-else>
                        <el-input placeholder="" maxlength="25" v-model="item.lastTwoYearSales" @keyup.native="oninputSale(index, 'lastTwoYearSales', $event)">
                        </el-input>
                    </template>
                </td>
                <td>
                    <template v-if="index === 0"></template>
                    <template v-else>{{ item.lastTwoYearSales/lastTwoYearAllSales | keepTwoNum }}</template>
                </td>
            </tr>
        </tbody>
    </table>
    <el-form-item label="前10个月销售是否持续下滑：" label-width="200px" class="mt20">
        <el-select v-model="form.firstTenMonthsDown" placeholder="请选择">
            <el-option v-for="item in firstTenMonthsDownData" :key="item.key" :label="item.value" :value="item.key"></el-option>
        </el-select>
    </el-form-item>
</div>
</template>
