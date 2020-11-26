<template>
    <el-dialog title="采购单确认" :visible.sync="dialogVisible" width="30%" :before-close="()=>dialogVisible = false">
        <div class="row-filed">
            <div class="content">
                <div class="col-info">
                    <div class="title">采购单信息</div>
                    <ul>
                        <li>
                            采购单金额： 12,000,000元
                        </li>
                        <li>
                            采购明细表： <img src="" alt="">
                        </li>
                        <li>采购批次： 一次性采购</li>
                        <li>经销商预付款比例： 50%</li>
                        <li>剩余货款支付周期： 6月</li>
                        <li>最迟发货日期： 2020年11月25日</li>
                        <li>收货地址： 江苏省南京市中山东路311-2号五星控股大厦江苏省南京市中山东路311-2号五星控股大厦</li>
                        <li>监管账户户名： 重庆新日日顺家电有限公司宁波大榭分公司</li>
                        <li>监管账户银行账号： 6227778888888888888</li>
                        <li>监管账户开户行： 中国银行(江宁科学园支行)</li>
                        <li>收款账户户名： 好享家舒适智能家居股份有限公司</li>
                        <li>收款账户银行账号： 6227778888888888888</li>
                        <li>收款账户开户行： 中国银行(江宁科学园支行)</li>
                    </ul>
                </div>
                <div class="col-info">
                    <div class="title">采购单信息</div>
                    <p>
                        项目： 佳源玖龙湾商业体空调
                    </p>
                    <p>
                        经销商： 扬州优创智能环境科技有限公司
                    </p>
                    <div class="title">相关合同</div>
                    <table>
                        <tr>
                            <th>合同</th>
                            <th>合同类型</th>
                        </tr>
                        <tr>
                            <td>合同</td>
                            <td>合同</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div class="row-filed">
            <div class="title">变更结果</div>
            <p>
                变更结果：
                <el-radio-group v-model="resultRadioGroup">
                    <el-radio :label="3">确认变更</el-radio>
                    <el-radio :label="6">驳回</el-radio>
                </el-radio-group>
            </p>
            <p>
                免息方式:
                <el-radio-group v-model="InterestFreeRadioGroup">
                    <el-radio :label="3">无</el-radio>
                    <el-radio :label="6">1个月</el-radio>
                    <el-radio :label="9">2个月</el-radio>
                    <el-radio :label="9">3个月</el-radio>
                    <el-radio :label="9">4个月</el-radio>
                    <el-radio :label="9">5个月</el-radio>
                    <el-radio :label="9">6个月</el-radio>
                </el-radio-group>
            </p>
            <p>变更结果：已驳回</p>
            <p>驳回原因：这里显示驳回的原因</p>
        </div>
        <span slot="footer" class="dialog-footer">
                <h-button @click="dialogVisible = false">取消</h-button>
                <h-button type="primary" @click="submitForm('ruleForm')">确定</h-button>
            </span>
    </el-dialog>
</template>

<script>
export default {
    name: 'purchaseOrderChangeDialog',
    data () {
        return {
            resultRadioGroup: [],
            InterestFreeRadioGroup: []
        }
    }
}
</script>

<style scoped>

</style>
