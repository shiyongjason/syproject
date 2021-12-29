// 交易额明细table
export const transactionInfoTableLabel = [
    { label: 'SKU编码', prop: 'skuCode' },
    { label: 'SPU编码', prop: 'spuCode' },
    { label: '订单编号', prop: 'childOrderNo' },
    { label: '会员店', prop: 'memberName' },
    { label: '会员归属', prop: 'keyManName' },
    { label: '所属商家', prop: 'merchantName' },
    { label: '商品SKU名称', prop: 'skuName' },
    { label: '所属品牌', prop: 'brandName' },
    { label: '商品型号', prop: 'productSpecification' },
    { label: '数量', prop: 'quantity' },
    { label: '商品类目', prop: 'category' },
    { label: '销售价', prop: 'price' },
    { label: '实付金额', prop: 'finalTotalAmount' },
    { label: '订单渠道', prop: 'sourceDescribe' },
    { label: '下单时间', prop: 'createTime', formatters: 'dateTime' },
    { label: '支付时间', prop: 'payTime', formatters: 'dateTime' },
    { label: '订单状态', prop: 'childOrderStatusDescribe' },
    { label: '支付方式', prop: 'payWayDescribe' },
    { label: '售后单号', prop: 'refundOrderNo' }
]

// 会员注册明细table
export const memberRegistrationInfoTableLabel = [
    { label: '会员店', prop: 'memberName' },
    { label: '会员店账号', prop: 'username' },
    { label: '会员所在城市', prop: 'cityName' },
    { label: '所属商家', prop: 'merchantName' },
    { label: '注册时间', prop: 'createTime', formatters: 'dateTime' },
    { label: '认证时间', prop: 'authenticationTime', formatters: 'dateTime' },
    { label: '首次支付时间', prop: 'payTime', formatters: 'dateTime' },
    { label: '最近登录时间', prop: 'loginTime', formatters: 'dateTime' },
    { label: '最近购买时间', prop: 'orderTime', formatters: 'dateTime' },
    { label: '认证状态', prop: 'authenticationStatusDesc' },
    { label: '提交订单数', prop: 'orderNum' },
    { label: '提交订单金额', prop: 'orderTotalAmount' },
    { label: '支付订单数', prop: 'payNum' },
    { label: '支付订单金额', prop: 'payTotalAmount' }
]

// BI看板-商品明细table
export const biGoodDetailTableLabel = function (isHidden) {
    return [
        { label: '日期', prop: 'date' },
        { label: 'SKU编码', prop: 'skuCode' },
        { label: '商品名称', prop: 'skuName' },
        { label: 'SPU编码', prop: 'spuCode', isHidden },
        { label: '加购次数', prop: 'shoppingCartNum', isHidden },
        { label: '购买次数', prop: 'orderNum' }
    ]
}

export const CHILD_ORDER_TYPE = [
    { label: '全部', value: 0 },
    { label: '常规', value: 1 },
    { label: '售后', value: 2 }
]
