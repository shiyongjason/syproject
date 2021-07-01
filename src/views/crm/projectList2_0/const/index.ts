/** 支付方式 */
export const PAYMENTMETHOD: { label: string; value: number; }[] = [
    { label: '对公打款', value: 1 },
    { label: '银行转账', value: 2 },
    { label: '支付宝转账', value: 3 },
    { label: '微信转账', value: 4 },
    { label: '现金支付', value: 5 },
    { label: '其他', value: 6 }
]
/** 销售阶段 */
export const SALESPHASE: { value: string; key: number; }[] = [
    { value: '首次沟通', key: 1 },
    { value: '需求确认', key: 2 },
    { value: '提供方案/报价', key: 3 },
    { value: '商务洽谈，待签约', key: 4 },
    // { value: '已签约', key: 5 },
    // { value: '已回款', key: 6 },
    { value: '无需跟进', key: 7 }
]
/** 建筑类型 */
export const BUILDINGTYPE: { label: string; value: number; }[] = [
    { label: '医院', value: 1 },
    { label: '酒店', value: 2 },
    { label: '学校', value: 3 },
    { label: '政府公建项目', value: 4 },
    { label: '商用写字楼', value: 5 },
    { label: '商场购物中心', value: 6 },
    { label: '地产项目', value: 7 },
    { label: '厂房（含养殖业）', value: 8 },
    { label: '其他', value: 9 }
]
/** 项目角色 */
export const PROJECTROLE: { label: string; value: number; }[] = [
    { label: '设备供应商', value: 1 },
    { label: '辅材供应商', value: 2 },
    { label: '安装服务商', value: 3 },
    { label: '系统集成商', value: 4 },
    { label: '总包', value: 5 },
    { label: '分包', value: 6 },
    { label: '其他', value: 7 }
]
/** 所处的阶段 */
export const ATTHESTAGE: { label: string; value: number; }[] = [
    { label: '采购阶段——辅材未定', value: 1 },
    { label: '采购阶段——辅材已定', value: 2 },
    { label: '项目跟踪阶段——方案未定', value: 3 },
    { label: '项目跟踪阶段——方案已定', value: 4 },
    { label: '招投标阶段', value: 5 },
    { label: '无在谈/在投项目', value: 6 }
]
/** 可从总部采购产品 */
export const PURCHASEPRODUCTS: { label: string; value: number; }[] = [
    { label: '冷暖辅材', value: 1 },
    { label: '电线电缆', value: 2 },
    { label: '管材管件', value: 3 },
    { label: '热水设备', value: 4 },
    { label: '高端厨电', value: 5 },
    { label: '智能化产品', value: 6 }
]
/** 工程项目智能化需求 */
export const INTELLIGENTDEMAND: { label: string; value: number; }[] = [
    { label: '需集控方案', value: 1 },
    { label: '需能源监测功能', value: 2 },
    { label: '需节能计费功能', value: 3 },
    { label: '需智控面板', value: 4 },
    { label: '其他', value: 5 }
]
// 主营品类 1：空调 2：采暖 3：新风 4：净水 5：智能化 6：辅材 7：电梯 8：其他
export const MAINCATEGORY: { key: string; value: string | ''; }[] = [
    { value: '空调', key: '1' },
    { value: '采暖', key: '2' },
    { value: '新风', key: '3' },
    { value: '净水', key: '4' },
    { value: '智能化', key: '5' },
    { value: '辅材', key: '6' },
    { value: '电梯', key: '7' },
    { value: '电器', key: '9' },
    { value: '热水器', key: '10' },
    { value: '其他', key: '8' }
]
/** 角色 1：老板 2：操盘手 3：业务 4：财务 5：仓管 6：普通员工 */
export const ROLE: { value: string; key: number; }[] = [
    { value: '老板', key: 1 },
    { value: '操盘手', key: 2 },
    { value: '业务', key: 3 },
    { value: '财务', key: 4 },
    { value: '仓管', key: 5 },
    { value: '普通员工', key: 6 }
]
export const USER_DEFAULT = 'https://hosjoy-hbp.oss-cn-hangzhou.aliyuncs.com/application/crm_wxapp/user-default.png'
