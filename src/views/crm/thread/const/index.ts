/** 线索来源 */
export const THREAD_ORIGIN: { label: string; value: number; }[] = [
    // { label: '好橙工', value: 1 },
    // { label: '享钱', value: 2 },
    // { label: '单分享', value: 3 },
    { label: 'CRM', value: 4 },
    { label: '第三方渠道', value: 5 }
]

/** 主营品类 */
export const DEVICE_CATEGORY: { label: string; value: string; }[] = [
    { label: '空调', value: '1' },
    { label: '采暖', value: '2' },
    { label: '新风', value: '3' },
    { label: '净水', value: '4' },
    { label: '智能化', value: '5' },
    { label: '辅材', value: '6' },
    { label: '电梯', value: '7' },
    { label: '电器', value: '9' },
    { label: '热水器', value: '10' },
    { label: '其他', value: '8' }
]

/** 婚姻状况 */
export const MARITAL_STATUS: { label: string; value: number; }[] = [
    { label: '未婚', value: 1 },
    { label: '已婚', value: 2 },
    { label: '离异', value: 3 }
]

/** 从业年限 */
export const EMPLOYED_AGE: { label: string; value: number; }[] = [
    { label: '3年以下', value: 1 },
    { label: '3-5年', value: 2 },
    { label: '5-8年', value: 3 },
    { label: '8-10年', value: 4 },
    { label: '10-15年', value: 5 },
    { label: '15-20年', value: 6 },
    { label: '20年以上', value: 7 }
]

/** 客户来源 */
export const CUSTOM_SOURCE: { label: string; value: number; }[] = [
    { label: '销售自拓', value: 1 },
    { label: '会销活动', value: 2 },
    { label: '厂商介绍', value: 3 },
    { label: '老客户转介绍', value: 4 },
    { label: '总部分配', value: 5 },
    { label: '客户继承', value: 6 },
    { label: '其他', value: 7 }
]

/** 跟进阶段 */
export const FOLLOW_UP_PHASE: { label: string; value: number;isShow:boolean }[] = [
    { label: '初步建立联系', value: 1, isShow: true },
    { label: '初步达成意向', value: 2, isShow: true },
    { label: '方案已推介', value: 3, isShow: true },
    { label: '客户已评级', value: 4, isShow: false },
    { label: '项目推进中', value: 5, isShow: true },
    { label: '首次交易成功', value: 6, isShow: false },
    { label: '合作关闭', value: 7, isShow: false }
]

/** 客户标签 */
export const CUSTOMER_TAG: { label: string; value: number;isShow:boolean }[] = [
    { label: '可发展为会员', value: 1, isShow: true },
    { label: '有集采PLUS机会', value: 2, isShow: false },
    { label: '有严选供应链机会', value: 3, isShow: false },
    { label: '可助力品牌合作', value: 4, isShow: false },
    { label: '可发展为区域KOL', value: 5, isShow: true },
    { label: '非暖通老板', value: 6, isShow: true }
]

export const NEXT_PLAN : { label: string; value: number;isShow:boolean }[] = [
    {
        label: '见到关键人',
        value: 1,
        isShow: true
    },
    {
        label: '初步达成意向',
        value: 2,
        isShow: true
    },
    {
        label: '推进评级',
        value: 3,
        isShow: true
    },
    {
        label: '等过会',
        value: 4,
        isShow: true
    },
    {
        label: '给报价',
        value: 5,
        isShow: true
    },
    {
        label: '给客户的需求清单（严选业务）',
        value: 6,
        isShow: true
    }
]

// 当前商机
export const CURRENT_OPPORTUNITY = [
    {
        label: '有已中标项目',
        value: 1,
        isShow: true
    },
    {
        label: '有未中标项目',
        value: 2,
        isShow: true
    },
    {
        label: '已从别处用过资',
        value: 3,
        isShow: true
    },
    {
        label: '从区域供货拿货',
        value: 4,
        isShow: true
    },
    {
        label: '从厂家拿货',
        value: 5,
        isShow: true
    }
]

export const CURRENT_VISITIES = [
    {
        label: '有集采线索项目',
        value: 1,
        isShow: true
    },
    {
        label: '有合作（严选）线索项目',
        value: 2,
        isShow: true
    },
    {
        label: '有合作（分润）线索项目',
        value: 3,
        isShow: true
    },
    {
        label: '线索商户，暂无项目',
        value: 4,
        isShow: true
    },
    {
        label: '此为KOL关键人',
        value: 5,
        isShow: true
    }
]

/** 常做项目类型 */
export const PROJECT_TYPE: { label: string; value: number; }[] = [
    { label: '居住建筑', value: 1 },
    { label: '市政建筑', value: 2 },
    { label: '企事业建筑', value: 3 },
    { label: '商业娱乐建筑', value: 4 },
    { label: '生产性建筑', value: 5 },
    { label: '其他', value: 6 }
]
export const USER_DEFAULT = 'https://hosjoy-hbp.oss-cn-hangzhou.aliyuncs.com/application/crm_wxapp/user-default.png'
