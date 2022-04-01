
/**
*
* @export
* @interface AddressResponse
*/
export interface AddressResponse {

    /**
     * 当前位置
     * @type {string}
     * @memberof AddressResponse
     */
    address?: string

    /**
     * 当前日期
     * @type {string}
     * @memberof AddressResponse
     */
    date?: string

    /**
     * 当前时间
     * @type {LocalTime}
     * @memberof AddressResponse
     */
    time?: LocalTime

}

/**
*
* @export
* @interface AppletStaffInfoResponse
*/
export interface AppletStaffInfoResponse {

    /**
     * 其它员工信息列表
     * @type {Array<StaffInfoResponse>}
     * @memberof AppletStaffInfoResponse
     */
    appletStaffInfos?: Array<StaffInfoResponse>

    /**
     * 待审核加入 数量
     * @type {number | string}
     * @memberof AppletStaffInfoResponse
     */
    applyNumber?: number | string

    /**
     * 管理员 待审核信息列表
     * @type {Array<StaffInfoResponse>}
     * @memberof AppletStaffInfoResponse
     */
    applyStaffInfos?: Array<StaffInfoResponse>

    /**
     * 员工本人信息
     * @type {StaffInfoResponse}
     * @memberof AppletStaffInfoResponse
     */
    userInfo?: StaffInfoResponse

}

/**
*
* @export
* @interface Assistant
*/
export interface Assistant {

    /**
     * 客户经理工号
     * @type {string}
     * @memberof Assistant
     */
    assignedUserId?: string

    /**
     * 客户经理手机号
     * @type {string}
     * @memberof Assistant
     */
    assignedUserMobile?: string

    /**
     * 客户经理姓名
     * @type {string}
     * @memberof Assistant
     */
    assignedUserName?: string

}

/**
*
* @export
* @interface Attr
*/
export interface Attr {

    /**
     *
     * @type {string}
     * @memberof Attr
     */
    name?: string

    /**
     *
     * @type {string}
     * @memberof Attr
     */
    value?: string

}

/**
*
* @export
* @interface BoosStaffInfoResponse
*/
export interface BoosStaffInfoResponse {

    /**
     * 其它员工信息列表
     * @type {Array<StaffInfoResponse>}
     * @memberof BoosStaffInfoResponse
     */
    appletStaffInfos?: Array<StaffInfoResponse>

    /**
     * 管理员信息信息
     * @type {StaffInfoResponse}
     * @memberof BoosStaffInfoResponse
     */
    userInfo?: StaffInfoResponse

}

/**
* 营业执照信息
* @export
* @interface BusinessLicense
*/
export interface BusinessLicense {

    /**
     * 企业开户号地址
     * @type {string}
     * @memberof BusinessLicense
     */
    enterpriseBankAddress?: string

    /**
     * 企业开户行所在城市
     * @type {string}
     * @memberof BusinessLicense
     */
    enterpriseBankCity?: string

    /**
     * 企业开户行所在地国家行政编码
     * @type {string}
     * @memberof BusinessLicense
     */
    enterpriseBankCountryId?: string

    /**
     * 企业开户行所在区域
     * @type {string}
     * @memberof BusinessLicense
     */
    enterpriseBankDistrict?: string

    /**
     * 企业对公账户号
     * @type {string}
     * @memberof BusinessLicense
     */
    enterpriseBankId?: string

    /**
     * 企业开户行名称
     * @type {string}
     * @memberof BusinessLicense
     */
    enterpriseBankName?: string

    /**
     * 企业开户行所在省份
     * @type {string}
     * @memberof BusinessLicense
     */
    enterpriseBankProvince?: string

    /**
     * 企业注册资本
     * @type {string}
     * @memberof BusinessLicense
     */
    enterpriseCapital?: string

    /**
     * 企业所在城市
     * @type {string}
     * @memberof BusinessLicense
     */
    enterpriseCity?: string

    /**
     * 企业所在地国家行政编码
     * @type {string}
     * @memberof BusinessLicense
     */
    enterpriseCountryId?: string

    /**
     * 企业所在区域
     * @type {string}
     * @memberof BusinessLicense
     */
    enterpriseDistrict?: string

    /**
     * 企业统一社会信用编码
     * @type {string}
     * @memberof BusinessLicense
     */
    enterpriseId?: string

    /**
     * 企业所属行业
     * @type {string}
     * @memberof BusinessLicense
     */
    enterpriseIndustry?: string

    /**
     * 企业缴纳社会保险人数
     * @type {string}
     * @memberof BusinessLicense
     */
    enterpriseInsured?: string

    /**
     * 企业名称
     * @type {string}
     * @memberof BusinessLicense
     */
    enterpriseNameCh?: string

    /**
     * 企业英文名称
     * @type {string}
     * @memberof BusinessLicense
     */
    enterpriseNameEn?: string

    /**
     * 企业所属市场管理机构
     * @type {string}
     * @memberof BusinessLicense
     */
    enterpriseOrganization?: string

    /**
     * 企业法人
     * @type {string}
     * @memberof BusinessLicense
     */
    enterpriseOwner?: string

    /**
     * 企业人数
     * @type {string}
     * @memberof BusinessLicense
     */
    enterprisePeople?: string

    /**
     * 企业所在省份
     * @type {string}
     * @memberof BusinessLicense
     */
    enterpriseProvince?: string

    /**
     * 企业注册地址
     * @type {string}
     * @memberof BusinessLicense
     */
    enterpriseRegisterAddress?: string

    /**
     * 企业注册地址所在城市
     * @type {string}
     * @memberof BusinessLicense
     */
    enterpriseRegisterAddressCity?: string

    /**
     * 企业注册地址所在区域
     * @type {string}
     * @memberof BusinessLicense
     */
    enterpriseRegisterAddressDistrict?: string

    /**
     * 企业注册地址格式标准化
     * @type {string}
     * @memberof BusinessLicense
     */
    enterpriseRegisterAddressFormatAddress?: string

    /**
     * 企业注册地址GPS
     * @type {string}
     * @memberof BusinessLicense
     */
    enterpriseRegisterAddressGps?: string

    /**
     * 企业注册地址所在省份
     * @type {string}
     * @memberof BusinessLicense
     */
    enterpriseRegisterAddressProvince?: string

    /**
     * 企业经营范围
     * @type {string}
     * @memberof BusinessLicense
     */
    enterpriseScope?: string

    /**
     * 企业税务登记号
     * @type {string}
     * @memberof BusinessLicense
     */
    enterpriseTaxpayerRegisterId?: string

    /**
     * 企业联系电话
     * @type {string}
     * @memberof BusinessLicense
     */
    enterpriseTel?: string

    /**
     * 企业注册时间
     * @type {string}
     * @memberof BusinessLicense
     */
    enterpriseTime?: string

    /**
     * 企业类型
     * @type {string}
     * @memberof BusinessLicense
     */
    enterpriseType?: string

    /**
     * 企业组织机构代码号
     * @type {string}
     * @memberof BusinessLicense
     */
    enterpriseUniversalCreditIdAgencyCode?: string

    /**
     * 企业曾用名
     * @type {string}
     * @memberof BusinessLicense
     */
    enterpriseUsedName?: string

    /**
     * 企业营业期限结束时间
     * @type {string}
     * @memberof BusinessLicense
     */
    enterpriseValidDateEnd?: string

    /**
     * 企业营业期限开始时间
     * @type {string}
     * @memberof BusinessLicense
     */
    enterpriseValidDateStart?: string

}

/**
*
* @export
* @interface ClueFlowUpRequest
*/
export interface ClueFlowUpRequest {

    /**
     * 跟进事件id 线索id/客户id/1.0项目id/2.0项目id
     * @type {number | string}
     * @memberof ClueFlowUpRequest
     */
    bizId?: number | string

    /**
     * 跟进内容
     * @type {string}
     * @memberof ClueFlowUpRequest
     */
    content?: string

    /**
     * 创建人
     * @type {string}
     * @memberof ClueFlowUpRequest
     */
    createBy?: string

    /**
     * 创建人手机号
     * @type {string}
     * @memberof ClueFlowUpRequest
     */
    createPhone?: string

    /**
     * 当前商机 1：有已中标项目 2：有尚未中标项目 3：已从别处用过资 4：从区域供货商拿货 5：从厂家拿货 6：以上信息均无
     * @type {string}
     * @memberof ClueFlowUpRequest
     */
    currentBusinessOpportunities?: string

    /**
     * 本次拜访价值 1：有集采线索项目 2：有合作（严选）线索项目 3：有合作（分润）线索项目 4：线索商户，暂无项目 5：此为KOL关键人
     * @type {string}
     * @memberof ClueFlowUpRequest
     */
    currentVisitValue?: string

    /**
     * 跟进阶段 1：初步建立联系 2：初步达成意向 3：方案已推介 4：客户已评级 5：项目推进中 6：首次交易成功 7：合作关闭
     * @type {number | string}
     * @memberof ClueFlowUpRequest
     */
    flowUpProcess?: number | string

    /**
     * 主键id
     * @type {number | string}
     * @memberof ClueFlowUpRequest
     */
    id?: number | string

    /**
     * 下次跟进时间
     * @type {string}
     * @memberof ClueFlowUpRequest
     */
    nextFlowTime?: string

    /**
     * 下一步计划 1：见到关键人 2：初步达成意向 3：推进评级 4：等过会 5：给报价 6：给客户的需求清单（严选业务）
     * @type {number | string}
     * @memberof ClueFlowUpRequest
     */
    nextStepPlan?: number | string

    /**
     * 随访人员
     * @type {Array<FlowUpPartnerRequest>}
     * @memberof ClueFlowUpRequest
     */
    partners?: Array<FlowUpPartnerRequest>

    /**
     * 当面拜访->现场图片        电话/微信沟通/邮件->附件
     * @type {Array<string>}
     * @memberof ClueFlowUpRequest
     */
    picUrls?: Array<string>

    /**
     * 备注
     * @type {string}
     * @memberof ClueFlowUpRequest
     */
    remark?: string

    /**
     * 跟进类型 1：当面拜访 2：电话/微信沟通/邮件等
     * @type {number | string}
     * @memberof ClueFlowUpRequest
     */
    type?: number | string

    /**
     * 客户标签(逗号隔开)：1：可发展为集采会员 2：有集采PLUS机会: 3：有严选供应链机会 4：可助力品牌合作 5：可发展为区域KOL
     * @type {string}
     * @memberof ClueFlowUpRequest
     */
    userTag?: string

    /**
     * 拜访目标
     * @type {string}
     * @memberof ClueFlowUpRequest
     */
    visitTarget?: string

}

/**
*
* @export
* @interface Company
*/
export interface Company {

    /**
     * 详细地址
     * @type {string}
     * @memberof Company
     */
    addressName?: string

    /**
     * 认证状态 1：未认证 2：认证中 3：认证成功 4：认证失败
     * @type {number | string}
     * @memberof Company
     */
    authenticationStatus?: number | string

    /**
     * 认证时间
     * @type {string}
     * @memberof Company
     */
    authenticationTime?: string

    /**
     * 城市id
     * @type {string}
     * @memberof Company
     */
    cityId?: string

    /**
     * 市名称
     * @type {string}
     * @memberof Company
     */
    cityName?: string

    /**
     * 企业编码
     * @type {string}
     * @memberof Company
     */
    companyCode?: string

    /**
     * 企业全称
     * @type {string}
     * @memberof Company
     */
    companyName?: string

    /**
     * 区id
     * @type {string}
     * @memberof Company
     */
    countryId?: string

    /**
     * 区/县名称
     * @type {string}
     * @memberof Company
     */
    countryName?: string

    /**
     * 创建人id
     * @type {number | string}
     * @memberof Company
     */
    createBy?: number | string

    /**
     * 创建时间
     * @type {string}
     * @memberof Company
     */
    createTime?: string

    /**
     * 主键id
     * @type {number | string}
     * @memberof Company
     */
    id?: number | string

    /**
     * 是否删除
     * @type {boolean}
     * @memberof Company
     */
    isDeleted?: boolean

    /**
     * 省id
     * @type {string}
     * @memberof Company
     */
    provinceId?: string

    /**
     * 省名称
     * @type {string}
     * @memberof Company
     */
    provinceName?: string

    /**
     * 企业来源 1 B2B 2 CRM
     * @type {number | string}
     * @memberof Company
     */
    source?: number | string

    /**
     * 维护人id
     * @type {number | string}
     * @memberof Company
     */
    updateBy?: number | string

    /**
     * 更新时间
     * @type {string}
     * @memberof Company
     */
    updateTime?: string

}

/**
*
* @export
* @interface CompanyContactRequest
*/
export interface CompanyContactRequest {

    /**
     * 公司id
     * @type {string}
     * @memberof CompanyContactRequest
     */
    companyId: string

    /**
     * 联系人手机
     * @type {string}
     * @memberof CompanyContactRequest
     */
    contactMobile: string

    /**
     * 联系人姓名
     * @type {string}
     * @memberof CompanyContactRequest
     */
    contactName: string

    /**
     * 联系人id
     * @type {number | string}
     * @memberof CompanyContactRequest
     */
    id?: number | string

    /**
     * 操作人企业微信id CRM端必填
     * @type {string}
     * @memberof CompanyContactRequest
     */
    operateCorpUserId?: string

    /**
     * 操作人
     * @type {string}
     * @memberof CompanyContactRequest
     */
    operator: string

    /**
     * 角色,多个,连接
     * @type {Array<number | string>}
     * @memberof CompanyContactRequest
     */
    roleCodes: Array<number | string>

}

/**
*
* @export
* @interface CompanyContactResponse
*/
export interface CompanyContactResponse {

    /**
     * 公司id
     * @type {string}
     * @memberof CompanyContactResponse
     */
    companyId?: string

    /**
     * 联系人手机
     * @type {string}
     * @memberof CompanyContactResponse
     */
    contactMobile?: string

    /**
     * 联系人姓名
     * @type {string}
     * @memberof CompanyContactResponse
     */
    contactName?: string

    /**
     * 联系人id
     * @type {number | string}
     * @memberof CompanyContactResponse
     */
    id?: number | string

    /**
     * 角色编码
     * @type {Array<number | string>}
     * @memberof CompanyContactResponse
     */
    roleCodes?: Array<number | string>

    /**
     * 角色名称
     * @type {string}
     * @memberof CompanyContactResponse
     */
    roleNames?: string

}

/**
*
* @export
* @interface CompanyCreditBossDetailResponse
*/
export interface CompanyCreditBossDetailResponse {

    /**
     * 公司id
     * @type {number | string}
     * @memberof CompanyCreditBossDetailResponse
     */
    companyId?: number | string

    /**
     * 公司名称
     * @type {string}
     * @memberof CompanyCreditBossDetailResponse
     */
    companyName?: string

    /**
     * 公司类型 0:无标签 1：主企业 2：子企业
     * @type {number | string}
     * @memberof CompanyCreditBossDetailResponse
     */
    companyType?: number | string

    /**
     * 信用是否冻结
     * @type {boolean}
     * @memberof CompanyCreditBossDetailResponse
     */
    creditFreeze?: boolean

    /**
     * 信用等级
     * @type {string}
     * @memberof CompanyCreditBossDetailResponse
     */
    creditLevel?: string

    /**
     * 信用到期时间
     * @type {string}
     * @memberof CompanyCreditBossDetailResponse
     */
    endTime?: string

    /**
     * 通用额度（冻结）
     * @type {number | string}
     * @memberof CompanyCreditBossDetailResponse
     */
    freezeAmount?: number | string

    /**
     * 信用冻结开始时间
     * @type {string}
     * @memberof CompanyCreditBossDetailResponse
     */
    freezeEndTime?: string

    /**
     * 信用冻结开始时间
     * @type {string}
     * @memberof CompanyCreditBossDetailResponse
     */
    freezeStartTime?: string

    /**
     * 信用id
     * @type {number | string}
     * @memberof CompanyCreditBossDetailResponse
     */
    id?: number | string

    /**
     * 主企业id 注：子企业才返回
     * @type {number | string}
     * @memberof CompanyCreditBossDetailResponse
     */
    mainCompanyId?: number | string

    /**
     * 主企业名称 注：子企业才返回
     * @type {string}
     * @memberof CompanyCreditBossDetailResponse
     */
    mainCompanyName?: string

    /**
     * 占用中额度
     * @type {number | string}
     * @memberof CompanyCreditBossDetailResponse
     */
    occupyAmount?: number | string

    /**
     * 可代采额度(累计)
     * @type {number | string}
     * @memberof CompanyCreditBossDetailResponse
     */
    purchaseAmount?: number | string

    /**
     * 可代采额度(冻结)
     * @type {number | string}
     * @memberof CompanyCreditBossDetailResponse
     */
    purchaseFreezeAmount?: number | string

    /**
     * 通用额度 (累计)
     * @type {number | string}
     * @memberof CompanyCreditBossDetailResponse
     */
    purchaseQuota?: number | string

    /**
     * 剩余代采购额度【可代采额度-冻结中额度】
     * @type {number | string}
     * @memberof CompanyCreditBossDetailResponse
     */
    purchaseUsableAmount?: number | string

    /**
     * 服务费
     * @type {number | string}
     * @memberof CompanyCreditBossDetailResponse
     */
    serviceFee?: number | string

    /**
     * 信用状态
     * @type {boolean}
     * @memberof CompanyCreditBossDetailResponse
     */
    status?: boolean

    /**
     * 临时额度（冻结）
     * @type {number | string}
     * @memberof CompanyCreditBossDetailResponse
     */
    temporaryFreezeAmount?: number | string

    /**
     * 临时额度(累计)
     * @type {number | string}
     * @memberof CompanyCreditBossDetailResponse
     */
    temporaryQuotaAmount?: number | string

}

/**
*
* @export
* @interface CompanyCreditChangeRecordDetail
*/
export interface CompanyCreditChangeRecordDetail {

    /**
     * 变更后内容
     * @type {string}
     * @memberof CompanyCreditChangeRecordDetail
     */
    contentAfterChange?: string

    /**
     * 变更前内容
     * @type {string}
     * @memberof CompanyCreditChangeRecordDetail
     */
    contentBeforeChange?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof CompanyCreditChangeRecordDetail
     */
    createTime?: string

    /**
     * 字段名称
     * @type {string}
     * @memberof CompanyCreditChangeRecordDetail
     */
    fieldName?: string

    /**
     * 主键
     * @type {number | string}
     * @memberof CompanyCreditChangeRecordDetail
     */
    id?: number | string

    /**
     * 企业信用id
     * @type {number | string}
     * @memberof CompanyCreditChangeRecordDetail
     */
    recordId?: number | string

    /**
     * 保存值
     * @type {string}
     * @memberof CompanyCreditChangeRecordDetail
     */
    saveValue?: string

    /**
     * 类型 1：变更 2：保存
     * @type {number | string}
     * @memberof CompanyCreditChangeRecordDetail
     */
    type?: number | string

}

/**
*
* @export
* @interface CompanyCreditChangeRecordResponse
*/
export interface CompanyCreditChangeRecordResponse {

    /**
     * 企业信用修改记录详情
     * @type {Array<CompanyCreditChangeRecordDetail>}
     * @memberof CompanyCreditChangeRecordResponse
     */
    companyCreditChangeRecordDetailList?: Array<CompanyCreditChangeRecordDetail>

    /**
     * 企业信用id
     * @type {number | string}
     * @memberof CompanyCreditChangeRecordResponse
     */
    companyCreditId?: number | string

    /**
     * 创建人
     * @type {string}
     * @memberof CompanyCreditChangeRecordResponse
     */
    createBy?: string

    /**
     * 创建人手机号
     * @type {string}
     * @memberof CompanyCreditChangeRecordResponse
     */
    createPhone?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof CompanyCreditChangeRecordResponse
     */
    createTime?: string

    /**
     * 主键
     * @type {number | string}
     * @memberof CompanyCreditChangeRecordResponse
     */
    id?: number | string

    /**
     * 标签字段
     * @type {string}
     * @memberof CompanyCreditChangeRecordResponse
     */
    labelField?: string

    /**
     * 类型 1：关联了当前企业 2：和当前企业取消了关联 3：当前企业和A进行关联 4：当前企业和A取消了关联 5：通用额度设置 6：新增临时额度 7：临时额度手动设置 8：临时额度自动失效 9：开启风控冻结 10：解除风控冻结 11：风控冻结自动解除
     * @type {number | string}
     * @memberof CompanyCreditChangeRecordResponse
     */
    type?: number | string

}

/**
*
* @export
* @interface CompanyCreditFreezeRequest
*/
export interface CompanyCreditFreezeRequest {

    /**
     * 公司id
     * @type {number | string}
     * @memberof CompanyCreditFreezeRequest
     */
    companyId?: number | string

    /**
     * 操作人
     * @type {string}
     * @memberof CompanyCreditFreezeRequest
     */
    createBy?: string

    /**
     * 操作人手机号
     * @type {string}
     * @memberof CompanyCreditFreezeRequest
     */
    createPhone?: string

    /**
     * 状态 true：冻结 false：解冻
     * @type {boolean}
     * @memberof CompanyCreditFreezeRequest
     */
    creditFreeze?: boolean

    /**
     * 信用冻结结束时间
     * @type {string}
     * @memberof CompanyCreditFreezeRequest
     */
    freezeEndTime?: string

    /**
     * 冻结说明
     * @type {string}
     * @memberof CompanyCreditFreezeRequest
     */
    freezeRemark?: string

    /**
     * 信用冻结开始时间
     * @type {string}
     * @memberof CompanyCreditFreezeRequest
     */
    freezeStartTime?: string

}

/**
*
* @export
* @interface CompanyCreditResponse
*/
export interface CompanyCreditResponse {

    /**
     * 公司id
     * @type {number | string}
     * @memberof CompanyCreditResponse
     */
    companyId?: number | string

    /**
     * 公司名称
     * @type {string}
     * @memberof CompanyCreditResponse
     */
    companyName?: string

    /**
     * 信用等级
     * @type {string}
     * @memberof CompanyCreditResponse
     */
    creditLevel?: string

    /**
     * 资料状态 1：待提交 2：已提交 3：已通过 4：已打回
     * @type {number | string}
     * @memberof CompanyCreditResponse
     */
    documentStatus?: number | string

    /**
     * 评级到期时间
     * @type {string}
     * @memberof CompanyCreditResponse
     */
    endTime?: string

    /**
     * 可代采额度(累计)
     * @type {number | string}
     * @memberof CompanyCreditResponse
     */
    purchaseAmount?: number | string

    /**
     * 可代采额度(冻结)
     * @type {number | string}
     * @memberof CompanyCreditResponse
     */
    purchaseFreezeAmount?: number | string

    /**
     * 通用额度 (累计)
     * @type {number | string}
     * @memberof CompanyCreditResponse
     */
    purchaseQuota?: number | string

    /**
     * 可代采额度(可用)
     * @type {number | string}
     * @memberof CompanyCreditResponse
     */
    purchaseUsableAmount?: number | string

    /**
     * 服务费
     * @type {number | string}
     * @memberof CompanyCreditResponse
     */
    serviceFee?: number | string

    /**
     * 临时额度（冻结）
     * @type {number | string}
     * @memberof CompanyCreditResponse
     */
    temporaryFreezeAmount?: number | string

    /**
     * 临时额度明细
     * @type {Array<临时额度明细>}
     * @memberof CompanyCreditResponse
     */
    temporaryQuota?: Array<临时额度明细>

    /**
     * 临时额度(累计)
     * @type {number | string}
     * @memberof CompanyCreditResponse
     */
    temporaryQuotaAmount?: number | string

    /**
     * 临时额度(可用)
     * @type {number | string}
     * @memberof CompanyCreditResponse
     */
    temporaryUsableAmount?: number | string

    /**
     * 通用额度（冻结）
     * @type {number | string}
     * @memberof CompanyCreditResponse
     */
    universalFreezeAmount?: number | string

    /**
     * 通用额度(可用)
     * @type {number | string}
     * @memberof CompanyCreditResponse
     */
    universalUsableAmount?: number | string

}

/**
*
* @export
* @interface CompanyCreditShareRequest
*/
export interface CompanyCreditShareRequest {

    /**
     * 子公司id
     * @type {number | string}
     * @memberof CompanyCreditShareRequest
     */
    childCompanyId?: number | string

    /**
     * 主公司id
     * @type {number | string}
     * @memberof CompanyCreditShareRequest
     */
    mainCompanyId?: number | string

}

/**
*
* @export
* @interface CompanyLabelResponse
*/
export interface CompanyLabelResponse {

    /**
     * 详细地址
     * @type {string}
     * @memberof CompanyLabelResponse
     */
    addressName?: string

    /**
     * 认证状态 1：未认证 2：认证中 3：认证成功 4：认证失败
     * @type {number | string}
     * @memberof CompanyLabelResponse
     */
    authenticationStatus?: number | string

    /**
     * 认证时间
     * @type {string}
     * @memberof CompanyLabelResponse
     */
    authenticationTime?: string

    /**
     * 城市id
     * @type {string}
     * @memberof CompanyLabelResponse
     */
    cityId?: string

    /**
     * 市名称
     * @type {string}
     * @memberof CompanyLabelResponse
     */
    cityName?: string

    /**
     * 企业编码
     * @type {string}
     * @memberof CompanyLabelResponse
     */
    companyCode?: string

    /**
     * 企业标签 0：未关联任何企业 1：已关联其他主企业 2：已被其他企业关联 3：当前企业 4：已关联当前企业
     * @type {number | string}
     * @memberof CompanyLabelResponse
     */
    companyLabel?: number | string

    /**
     * 企业全称
     * @type {string}
     * @memberof CompanyLabelResponse
     */
    companyName?: string

    /**
     * 区id
     * @type {string}
     * @memberof CompanyLabelResponse
     */
    countryId?: string

    /**
     * 区/县名称
     * @type {string}
     * @memberof CompanyLabelResponse
     */
    countryName?: string

    /**
     * 创建人id
     * @type {number | string}
     * @memberof CompanyLabelResponse
     */
    createBy?: number | string

    /**
     * 创建时间
     * @type {string}
     * @memberof CompanyLabelResponse
     */
    createTime?: string

    /**
     * 主键id
     * @type {number | string}
     * @memberof CompanyLabelResponse
     */
    id?: number | string

    /**
     * 是否删除
     * @type {boolean}
     * @memberof CompanyLabelResponse
     */
    isDeleted?: boolean

    /**
     * 省id
     * @type {string}
     * @memberof CompanyLabelResponse
     */
    provinceId?: string

    /**
     * 省名称
     * @type {string}
     * @memberof CompanyLabelResponse
     */
    provinceName?: string

    /**
     * 企业来源 1 B2B 2 CRM
     * @type {number | string}
     * @memberof CompanyLabelResponse
     */
    source?: number | string

    /**
     * 维护人id
     * @type {number | string}
     * @memberof CompanyLabelResponse
     */
    updateBy?: number | string

    /**
     * 更新时间
     * @type {string}
     * @memberof CompanyLabelResponse
     */
    updateTime?: string

}

/**
*
* @export
* @interface CompanyQuotaChangeResponse
*/
export interface CompanyQuotaChangeResponse {

    /**
     * 变更后冻结额度
     * @type {number | string}
     * @memberof CompanyQuotaChangeResponse
     */
    afterFreezeQuotaAmount?: number | string

    /**
     * 变更后总额度
     * @type {number | string}
     * @memberof CompanyQuotaChangeResponse
     */
    afterTotalQuotaAmount?: number | string

    /**
     * 变更前冻结额度
     * @type {number | string}
     * @memberof CompanyQuotaChangeResponse
     */
    beforeFreezeQuotaAmount?: number | string

    /**
     * 变更前总额度
     * @type {number | string}
     * @memberof CompanyQuotaChangeResponse
     */
    beforeTotalQuotaAmount?: number | string

    /**
     * 变动额度
     * @type {number | string}
     * @memberof CompanyQuotaChangeResponse
     */
    changeAmount?: number | string

    /**
     * 变动类型 1：增加 2：扣减 3：冻结 4：释放
     * @type {number | string}
     * @memberof CompanyQuotaChangeResponse
     */
    changedType?: number | string

    /**
     * 企业公司id
     * @type {number | string}
     * @memberof CompanyQuotaChangeResponse
     */
    companyId?: number | string

    /**
     * 企业公司名称
     * @type {string}
     * @memberof CompanyQuotaChangeResponse
     */
    companyName?: string

    /**
     * 创建人
     * @type {string}
     * @memberof CompanyQuotaChangeResponse
     */
    createBy?: string

    /**
     * 创建人手机号
     * @type {string}
     * @memberof CompanyQuotaChangeResponse
     */
    createPhone?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof CompanyQuotaChangeResponse
     */
    createTime?: string

    /**
     * 分部名称
     * @type {string}
     * @memberof CompanyQuotaChangeResponse
     */
    deptName?: string

    /**
     * 事件类型 1：通用额度设置 2：客户临时额度设置 3：评审决议通过 4：评审决议变更通过 5：临时额度自动失效 6：临时额度手动失效 7: 提交支付单 8：尾款支付成功 9：支付单取消
     * @type {number | string}
     * @memberof CompanyQuotaChangeResponse
     */
    eventType?: number | string

    /**
     * 主键id
     * @type {number | string}
     * @memberof CompanyQuotaChangeResponse
     */
    id?: number | string

    /**
     * 支付单编码
     * @type {string}
     * @memberof CompanyQuotaChangeResponse
     */
    paymentOrderNo?: string

    /**
     * 项目编码
     * @type {string}
     * @memberof CompanyQuotaChangeResponse
     */
    projectNo?: string

    /**
     * 额度类型 1：通用额度 2：客户临时额度 3：项目专项额度
     * @type {number | string}
     * @memberof CompanyQuotaChangeResponse
     */
    quotaType?: number | string

}

/**
*
* @export
* @interface CompanyTemporaryQuotaPageResp
*/
export interface CompanyTemporaryQuotaPageResp {

    /**
     * 公司id
     * @type {number | string}
     * @memberof CompanyTemporaryQuotaPageResp
     */
    companyId?: number | string

    /**
     * 创建人
     * @type {string}
     * @memberof CompanyTemporaryQuotaPageResp
     */
    createBy?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof CompanyTemporaryQuotaPageResp
     */
    createTime?: string

    /**
     * 失效时间
     * @type {string}
     * @memberof CompanyTemporaryQuotaPageResp
     */
    expireTime?: string

    /**
     * 冻结额度金额（万）
     * @type {number | string}
     * @memberof CompanyTemporaryQuotaPageResp
     */
    freezeAmount?: number | string

    /**
     * 主键id
     * @type {number | string}
     * @memberof CompanyTemporaryQuotaPageResp
     */
    id?: number | string

    /**
     * 临时额度金额（万）
     * @type {number | string}
     * @memberof CompanyTemporaryQuotaPageResp
     */
    quotaAmount?: number | string

    /**
     * 说明
     * @type {string}
     * @memberof CompanyTemporaryQuotaPageResp
     */
    remark?: string

    /**
     * 状态 0：生效 1：失效
     * @type {number | string}
     * @memberof CompanyTemporaryQuotaPageResp
     */
    status?: number | string

    /**
     * 修改人
     * @type {string}
     * @memberof CompanyTemporaryQuotaPageResp
     */
    updateBy?: string

    /**
     * 修改时间
     * @type {string}
     * @memberof CompanyTemporaryQuotaPageResp
     */
    updateTime?: string

}

/**
*
* @export
* @interface CompanyTemporaryQuotaRequest
*/
export interface CompanyTemporaryQuotaRequest {

    /**
     * 公司id
     * @type {number | string}
     * @memberof CompanyTemporaryQuotaRequest
     */
    companyId?: number | string

    /**
     * 创建人
     * @type {string}
     * @memberof CompanyTemporaryQuotaRequest
     */
    createBy?: string

    /**
     * 创建人手机号
     * @type {string}
     * @memberof CompanyTemporaryQuotaRequest
     */
    createPhone?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof CompanyTemporaryQuotaRequest
     */
    createTime?: string

    /**
     * 失效时间
     * @type {string}
     * @memberof CompanyTemporaryQuotaRequest
     */
    expireTime?: string

    /**
     * 主键id
     * @type {number | string}
     * @memberof CompanyTemporaryQuotaRequest
     */
    id?: number | string

    /**
     * 临时额度金额
     * @type {number | string}
     * @memberof CompanyTemporaryQuotaRequest
     */
    quotaAmount?: number | string

    /**
     * 说明
     * @type {string}
     * @memberof CompanyTemporaryQuotaRequest
     */
    remark?: string

    /**
     * 修改人
     * @type {string}
     * @memberof CompanyTemporaryQuotaRequest
     */
    updateBy?: string

    /**
     * 修改时间
     * @type {string}
     * @memberof CompanyTemporaryQuotaRequest
     */
    updateTime?: string

}

/**
*
* @export
* @interface CompanyTemporaryQuotaStatusRequest
*/
export interface CompanyTemporaryQuotaStatusRequest {

    /**
     * 操作人
     * @type {string}
     * @memberof CompanyTemporaryQuotaStatusRequest
     */
    createBy?: string

    /**
     * 操作人手机号
     * @type {string}
     * @memberof CompanyTemporaryQuotaStatusRequest
     */
    createPhone?: string

    /**
     * 主键id
     * @type {number | string}
     * @memberof CompanyTemporaryQuotaStatusRequest
     */
    id?: number | string

}

/**
*
* @export
* @interface CompanyVipApplyPo
*/
export interface CompanyVipApplyPo {

    /**
     *
     * @type {string}
     * @memberof CompanyVipApplyPo
     */
    applyTime?: string

    /**
     *
     * @type {string}
     * @memberof CompanyVipApplyPo
     */
    assignedTime?: string

    /**
     *
     * @type {string}
     * @memberof CompanyVipApplyPo
     */
    assignedUserId?: string

    /**
     *
     * @type {number | string}
     * @memberof CompanyVipApplyPo
     */
    companyId?: number | string

    /**
     *
     * @type {string}
     * @memberof CompanyVipApplyPo
     */
    createBy?: string

    /**
     *
     * @type {string}
     * @memberof CompanyVipApplyPo
     */
    createTime?: string

    /**
     *
     * @type {number | string}
     * @memberof CompanyVipApplyPo
     */
    id?: number | string

    /**
     *
     * @type {number | string}
     * @memberof CompanyVipApplyPo
     */
    received?: number | string

    /**
     *
     * @type {string}
     * @memberof CompanyVipApplyPo
     */
    updateBy?: string

    /**
     *
     * @type {string}
     * @memberof CompanyVipApplyPo
     */
    updateTime?: string

}

/**
*
* @export
* @interface CreditDocument
*/
export interface CreditDocument {

    /**
     * 公司标识
     * @type {number | string}
     * @memberof CreditDocument
     */
    companyId?: number | string

    /**
     * 创建人
     * @type {string}
     * @memberof CreditDocument
     */
    createBy?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof CreditDocument
     */
    createTime?: string

    /**
     * 授信资料标识
     * @type {number | string}
     * @memberof CreditDocument
     */
    creditDocumentId?: number | string

    /**
     * 删除标识
     * @type {number | string}
     * @memberof CreditDocument
     */
    deleted?: number | string

    /**
     * 附件资料名称
     * @type {string}
     * @memberof CreditDocument
     */
    fileName?: string

    /**
     * 附件资料链接
     * @type {string}
     * @memberof CreditDocument
     */
    fileUrl?: string

    /**
     * 模板id
     * @type {number | string}
     * @memberof CreditDocument
     */
    templateId?: number | string

    /**
     * 更新人
     * @type {string}
     * @memberof CreditDocument
     */
    updateBy?: string

    /**
     * 更新时间
     * @type {string}
     * @memberof CreditDocument
     */
    updateTime?: string

}

/**
*
* @export
* @interface CreditShareCompanyResponse
*/
export interface CreditShareCompanyResponse {

    /**
     * 企业id
     * @type {number | string}
     * @memberof CreditShareCompanyResponse
     */
    companyId?: number | string

    /**
     * 企业名称
     * @type {string}
     * @memberof CreditShareCompanyResponse
     */
    companyName?: string

    /**
     * 关联日期
     * @type {string}
     * @memberof CreditShareCompanyResponse
     */
    shareTime?: string

}

/**
*
* @export
* @interface CrmCompanyDetailReponse
*/
export interface CrmCompanyDetailReponse {

    /**
     * 代理级别 1：一级代理商 2：经销商 3：其他
     * @type {number | string}
     * @memberof CrmCompanyDetailReponse
     */
    agentLevel?: number | string

    /**
     * 认证时间
     * @type {string}
     * @memberof CrmCompanyDetailReponse
     */
    authenticationTime?: string

    /**
     * 业务类型及比例
     * @type {string}
     * @memberof CrmCompanyDetailReponse
     */
    businessType?: string

    /**
     * 橙工采标签：0-未激活， 1-初级，2-橙级
     * @type {number | string}
     * @memberof CrmCompanyDetailReponse
     */
    chengGongCaiLable?: number | string

    /**
     * 市id
     * @type {string}
     * @memberof CrmCompanyDetailReponse
     */
    cityId?: string

    /**
     * 市名称
     * @type {string}
     * @memberof CrmCompanyDetailReponse
     */
    cityName?: string

    /**
     * 企业code
     * @type {string}
     * @memberof CrmCompanyDetailReponse
     */
    companyCode?: string

    /**
     * 企业id
     * @type {number | string}
     * @memberof CrmCompanyDetailReponse
     */
    companyId?: number | string

    /**
     * 企业名称
     * @type {string}
     * @memberof CrmCompanyDetailReponse
     */
    companyName?: string

    /**
     * 企业类型 1：体系内 2：体系外
     * @type {number | string}
     * @memberof CrmCompanyDetailReponse
     */
    companyType?: number | string

    /**
     * 联系地址
     * @type {string}
     * @memberof CrmCompanyDetailReponse
     */
    contactAddress?: string

    /**
     * 区id
     * @type {string}
     * @memberof CrmCompanyDetailReponse
     */
    countryId?: string

    /**
     * 区名称
     * @type {string}
     * @memberof CrmCompanyDetailReponse
     */
    countryName?: string

    /**
     * 创建人手机号
     * @type {number | string}
     * @memberof CrmCompanyDetailReponse
     */
    createBy?: number | string

    /**
     * 创建人工号
     * @type {string}
     * @memberof CrmCompanyDetailReponse
     */
    createCode?: string

    /**
     * 创建人姓名
     * @type {string}
     * @memberof CrmCompanyDetailReponse
     */
    createName?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof CrmCompanyDetailReponse
     */
    createTime?: string

    /**
     * 企业信用
     * @type {string}
     * @memberof CrmCompanyDetailReponse
     */
    creditLevel?: string

    /**
     * 客户分类：1黑名单 2白名单 3待审核
     * @type {number | string}
     * @memberof CrmCompanyDetailReponse
     */
    customerType?: number | string

    /**
     * 发展在线公司编码
     * @type {string}
     * @memberof CrmCompanyDetailReponse
     */
    developOnlineCompanyCode?: string

    /**
     * 发展在线公司名称
     * @type {string}
     * @memberof CrmCompanyDetailReponse
     */
    developOnlineCompanyName?: string

    /**
     * 主营品牌
     * @type {string}
     * @memberof CrmCompanyDetailReponse
     */
    deviceBrand?: string

    /**
     * 主营品类 1：空调 2：采暖 3：新风 4：净水 5：智能化 6：辅材 7：电梯 8：其他 9:电器 10:热水器
     * @type {number | string}
     * @memberof CrmCompanyDetailReponse
     */
    deviceCategory?: number | string

    /**
     * 企业邮箱
     * @type {string}
     * @memberof CrmCompanyDetailReponse
     */
    email?: string

    /**
     * 成立日期
     * @type {string}
     * @memberof CrmCompanyDetailReponse
     */
    estiblishTime?: string

    /**
     * 是否隐藏
     * @type {boolean}
     * @memberof CrmCompanyDetailReponse
     */
    hidden?: boolean

    /**
     * 主键id
     * @type {number | string}
     * @memberof CrmCompanyDetailReponse
     */
    id?: number | string

    /**
     * 是否认证
     * @type {boolean}
     * @memberof CrmCompanyDetailReponse
     */
    isAuthentication?: boolean

    /**
     * 是否关联平台公司
     * @type {number | string}
     * @memberof CrmCompanyDetailReponse
     */
    isRelated?: number | string

    /**
     * 法人证件号
     * @type {string}
     * @memberof CrmCompanyDetailReponse
     */
    legalCardNumber?: string

    /**
     * 法人姓名
     * @type {string}
     * @memberof CrmCompanyDetailReponse
     */
    legalName?: string

    /**
     * 主辅材品牌
     * @type {string}
     * @memberof CrmCompanyDetailReponse
     */
    materialsBrand?: string

    /**
     * 主辅材渠道 1：厂商直采 2：一节囤货商采购 3：经销商采购
     * @type {string}
     * @memberof CrmCompanyDetailReponse
     */
    materialsChannel?: string

    /**
     * 1.一般会员
2.认证会员
3.评级会员
4.签约会员
5.交易会员
     * @type {number | string}
     * @memberof CrmCompanyDetailReponse
     */
    memberTag?: number | string

    /**
     * 姓名
     * @type {string}
     * @memberof CrmCompanyDetailReponse
     */
    name?: string

    /**
     * 认证人姓名
     * @type {string}
     * @memberof CrmCompanyDetailReponse
     */
    openName?: string

    /**
     * 认证人手机号
     * @type {string}
     * @memberof CrmCompanyDetailReponse
     */
    openPhone?: string

    /**
     * 手机号
     * @type {string}
     * @memberof CrmCompanyDetailReponse
     */
    phone?: string

    /**
     * EHR分部主键
     * @type {string}
     * @memberof CrmCompanyDetailReponse
     */
    pkDeptdoc?: string

    /**
     * 项目列表
     * @type {Array<RespProject>}
     * @memberof CrmCompanyDetailReponse
     */
    projects?: Array<RespProject>

    /**
     * 省id
     * @type {string}
     * @memberof CrmCompanyDetailReponse
     */
    provinceId?: string

    /**
     * 省名称
     * @type {string}
     * @memberof CrmCompanyDetailReponse
     */
    provinceName?: string

    /**
     * 采购额度
     * @type {number | string}
     * @memberof CrmCompanyDetailReponse
     */
    purchaseQuota?: number | string

    /**
     * 建筑资质
     * @type {Array<TianyanCompanyQualification>}
     * @memberof CrmCompanyDetailReponse
     */
    qualification?: Array<TianyanCompanyQualification>

    /**
     * 注册资本
     * @type {string}
     * @memberof CrmCompanyDetailReponse
     */
    regCapital?: string

    /**
     * 经营状态
     * @type {string}
     * @memberof CrmCompanyDetailReponse
     */
    regStatus?: string

    /**
     * 服务能力 1：有 2：无
     * @type {number | string}
     * @memberof CrmCompanyDetailReponse
     */
    serviceCapability?: number | string

    /**
     * 服务能力
     * @type {string}
     * @memberof CrmCompanyDetailReponse
     */
    serviceCapabilityDetail?: string

    /**
     * 服务费
     * @type {number | string}
     * @memberof CrmCompanyDetailReponse
     */
    serviceFee?: number | string

    /**
     * 次年服务费折扣
     * @type {number | string}
     * @memberof CrmCompanyDetailReponse
     */
    serviceFeeDiscount?: number | string

    /**
     * 纳税人识别号
     * @type {string}
     * @memberof CrmCompanyDetailReponse
     */
    taxpayerIdNumber?: string

    /**
     * 近3年的年度工程规模 1：1000万以内 2：1001-3000万 3：3001-5000万 4:5001-1亿 5：1亿-2亿 6:2亿以上
     * @type {number | string}
     * @memberof CrmCompanyDetailReponse
     */
    threeYearProjectScale?: number | string

    /**
     * 天眼查公司id
     * @type {number | string}
     * @memberof CrmCompanyDetailReponse
     */
    tyCompanyId?: number | string

    /**
     * 项目类别 1：地产项目 2：政府共建项目 3：市政项目 3：办公楼 4：厂房 5：其他
     * @type {number | string}
     * @memberof CrmCompanyDetailReponse
     */
    type?: number | string

    /**
     *
     * @type {number | string}
     * @memberof CrmCompanyDetailReponse
     */
    unClaimTotalAmount?: number | string

    /**
     *
     * @type {number | string}
     * @memberof CrmCompanyDetailReponse
     */
    unPaidTotalAmount?: number | string

    /**
     * 会员id
     * @type {number | string}
     * @memberof CrmCompanyDetailReponse
     */
    userId?: number | string

    /**
     * 企业vip等级
     * @type {string}
     * @memberof CrmCompanyDetailReponse
     */
    vipRule?: string

    /**
     * vip目标
     * @type {number | string}
     * @memberof CrmCompanyDetailReponse
     */
    vipTarget?: number | string

}

/**
* crm用户隐藏工程项目信息response
* @export
* @interface CrmHiddenProjectResponse
*/
export interface CrmHiddenProjectResponse {

    /**
     * 公司id
     * @type {number | string}
     * @memberof CrmHiddenProjectResponse
     */
    companyId?: number | string

    /**
     * 公司名称
     * @type {string}
     * @memberof CrmHiddenProjectResponse
     */
    companyName?: string

    /**
     * 过会金额
     * @type {number | string}
     * @memberof CrmHiddenProjectResponse
     */
    deviceAmount?: number | string

    /**
     * 主键id
     * @type {number | string}
     * @memberof CrmHiddenProjectResponse
     */
    id?: number | string

    /**
     * 项目级别
     * @type {string}
     * @memberof CrmHiddenProjectResponse
     */
    levels?: string

    /**
     * 项目名称
     * @type {string}
     * @memberof CrmHiddenProjectResponse
     */
    projectName?: string

    /**
     * 项目编号
     * @type {string}
     * @memberof CrmHiddenProjectResponse
     */
    projectNo?: string

    /**
     * 已采购金额
     * @type {number | string}
     * @memberof CrmHiddenProjectResponse
     */
    purchaseAmount?: number | string

    /**
     * 状态 1：待提交2：初审中 3：资料收集中 12：资料待审核 4：待立项  5：审核未通过 11：待终审 6：待签约 7：待放款 8：贷中 9：项目完成 10:信息待完善 13: 终审通过 14：终审未通过
     * @type {number | string}
     * @memberof CrmHiddenProjectResponse
     */
    status?: number | string

    /**
     * 提交时间,格式为:yyyy-MM-dd HH:mm:ss
     * @type {string}
     * @memberof CrmHiddenProjectResponse
     */
    submitTime?: string

}

/**
* crm用户工程项目信息response
* @export
* @interface CrmProjectResponse
*/
export interface CrmProjectResponse {

    /**
     * 公司id
     * @type {number | string}
     * @memberof CrmProjectResponse
     */
    companyId?: number | string

    /**
     * 公司名称
     * @type {string}
     * @memberof CrmProjectResponse
     */
    companyName?: string

    /**
     * 过会金额
     * @type {number | string}
     * @memberof CrmProjectResponse
     */
    deviceAmount?: number | string

    /**
     * 是否隐藏 true:隐藏 false：没有隐藏
     * @type {boolean}
     * @memberof CrmProjectResponse
     */
    hidden?: boolean

    /**
     * 主键id
     * @type {number | string}
     * @memberof CrmProjectResponse
     */
    id?: number | string

    /**
     * 项目级别
     * @type {string}
     * @memberof CrmProjectResponse
     */
    levels?: string

    /**
     * 项目名称
     * @type {string}
     * @memberof CrmProjectResponse
     */
    projectName?: string

    /**
     * 项目编号
     * @type {string}
     * @memberof CrmProjectResponse
     */
    projectNo?: string

    /**
     * 已采购金额
     * @type {number | string}
     * @memberof CrmProjectResponse
     */
    purchaseAmount?: number | string

    /**
     * 状态 1：待提交2：初审中 3：资料收集中 12：资料待审核 4：待立项  5：审核未通过 11：待终审 6：待签约 7：待放款 8：贷中 9：项目完成 10:信息待完善 13: 终审通过 14：终审未通过
     * @type {number | string}
     * @memberof CrmProjectResponse
     */
    status?: number | string

    /**
     * 提交时间,格式为:yyyy-MM-dd HH:mm:ss
     * @type {string}
     * @memberof CrmProjectResponse
     */
    submitTime?: string

}

/**
*
* @export
* @interface CrmUserHideRequest
*/
export interface CrmUserHideRequest {

    /**
     * 业务id（客户id或公司id或项目id）
     * @type {number | string}
     * @memberof CrmUserHideRequest
     */
    bizId?: number | string

    /**
     * 企业微信用户id
     * @type {string}
     * @memberof CrmUserHideRequest
     */
    userId?: string

}

/**
*
* @export
* @interface CrmWhiteListRecord
*/
export interface CrmWhiteListRecord {

    /**
     * 企业code
     * @type {string}
     * @memberof CrmWhiteListRecord
     */
    companyCode?: string

    /**
     * 客户分类 1:黑名单 2:白名单 3:待审核
     * @type {number | string}
     * @memberof CrmWhiteListRecord
     */
    customerType?: number | string

    /**
     * 失效时间
     * @type {string}
     * @memberof CrmWhiteListRecord
     */
    failureTime?: string

    /**
     * 主键id
     * @type {number | string}
     * @memberof CrmWhiteListRecord
     */
    id?: number | string

    /**
     * 说明
     * @type {string}
     * @memberof CrmWhiteListRecord
     */
    note?: string

    /**
     * 操作时间
     * @type {string}
     * @memberof CrmWhiteListRecord
     */
    operateTime?: string

    /**
     * 操作人姓名
     * @type {string}
     * @memberof CrmWhiteListRecord
     */
    operator?: string

    /**
     * 操作人手机号
     * @type {string}
     * @memberof CrmWhiteListRecord
     */
    operatorPhone?: string

}

/**
*
* @export
* @interface CustomerBackLogWork
*/
export interface CustomerBackLogWork {

    /**
     * 分配的客户经理工号
     * @type {string}
     * @memberof CustomerBackLogWork
     */
    assignedUserId?: string

    /**
     * 分配的客户经理手机号
     * @type {string}
     * @memberof CustomerBackLogWork
     */
    assignedUserMobile?: string

    /**
     * 分配的客户经理姓名
     * @type {string}
     * @memberof CustomerBackLogWork
     */
    assignedUserName?: string

    /**
     * 创建人
     * @type {string}
     * @memberof CustomerBackLogWork
     */
    createBy?: string

    /**
     * crm创建人企业微信id
     * @type {string}
     * @memberof CustomerBackLogWork
     */
    createCorpUserId?: string

    /**
     * 创建人手机号
     * @type {string}
     * @memberof CustomerBackLogWork
     */
    createPhone?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof CustomerBackLogWork
     */
    createTime?: string

    /**
     * 事件id
     * @type {number | string}
     * @memberof CustomerBackLogWork
     */
    eventId?: number | string

    /**
     * 主键id
     * @type {number | string}
     * @memberof CustomerBackLogWork
     */
    id?: number | string

    /**
     * 是否接受 0：否 1：是
     * @type {number | string}
     * @memberof CustomerBackLogWork
     */
    received?: number | string

    /**
     * 拒绝原因
     * @type {string}
     * @memberof CustomerBackLogWork
     */
    refuseReason?: string

    /**
     * 说明
     * @type {string}
     * @memberof CustomerBackLogWork
     */
    remark?: string

    /**
     * 事件类型 1：分配人员 2：老客户跟进提醒 3：1.0项目跟进提醒 4：1.0项目合同签约跟进提醒 5:2.0项目分配
     * @type {number | string}
     * @memberof CustomerBackLogWork
     */
    type?: number | string

    /**
     * 修改人
     * @type {string}
     * @memberof CustomerBackLogWork
     */
    updateBy?: string

    /**
     * 修改时间
     * @type {string}
     * @memberof CustomerBackLogWork
     */
    updateTime?: string

}

/**
*
* @export
* @interface CustomerManagerRequest
*/
export interface CustomerManagerRequest {

    /**
     * 企业id
     * @type {number | string}
     * @memberof CustomerManagerRequest
     */
    companyId?: number | string

    /**
     * 分部编码
     * @type {string}
     * @memberof CustomerManagerRequest
     */
    deptDoc?: string

    /**
     * 分部名称
     * @type {string}
     * @memberof CustomerManagerRequest
     */
    deptName?: string

    /**
     * 姓名
     * @type {string}
     * @memberof CustomerManagerRequest
     */
    name?: string

    /**
     * 手号
     * @type {string}
     * @memberof CustomerManagerRequest
     */
    phone?: string

    /**
     * 员工编号（工号）
     * @type {string}
     * @memberof CustomerManagerRequest
     */
    userCode?: string

}

/**
*
* @export
* @interface ExternalAttribute
*/
export interface ExternalAttribute {

    /**
     *
     * @type {string}
     * @memberof ExternalAttribute
     */
    appid?: string

    /**
     *
     * @type {string}
     * @memberof ExternalAttribute
     */
    name?: string

    /**
     *
     * @type {string}
     * @memberof ExternalAttribute
     */
    pagePath?: string

    /**
     *
     * @type {string}
     * @memberof ExternalAttribute
     */
    title?: string

    /**
     *
     * @type {number | string}
     * @memberof ExternalAttribute
     */
    type?: number | string

    /**
     *
     * @type {string}
     * @memberof ExternalAttribute
     */
    url?: string

    /**
     *
     * @type {string}
     * @memberof ExternalAttribute
     */
    value?: string

}

/**
*
* @export
* @interface FlowUpCountResponse
*/
export interface FlowUpCountResponse {

    /**
     * 当面拜访次数
     * @type {number | string}
     * @memberof FlowUpCountResponse
     */
    directCount?: number | string

    /**
     * 累计跟进次数
     * @type {number | string}
     * @memberof FlowUpCountResponse
     */
    total?: number | string

}

/**
*
* @export
* @interface FlowUpDynamic
*/
export interface FlowUpDynamic {

    /**
     * 跟进记录id
     * @type {number | string}
     * @memberof FlowUpDynamic
     */
    flowUpId?: number | string

    /**
     * 主键id
     * @type {number | string}
     * @memberof FlowUpDynamic
     */
    id?: number | string

    /**
     * 企业微信消息体(文本消息直接保存,文件转oss存链接)
     * @type {object}
     * @memberof FlowUpDynamic
     */
    msgContent?: object

    /**
     * 企业微信消息id
     * @type {string}
     * @memberof FlowUpDynamic
     */
    msgId?: string

    /**
     * 企业微信消息序号
     * @type {number | string}
     * @memberof FlowUpDynamic
     */
    msgSeq?: number | string

    /**
     * 企业微信消息时间
     * @type {string}
     * @memberof FlowUpDynamic
     */
    msgTime?: string

    /**
     * 企业微信消息类型
     * @type {string}
     * @memberof FlowUpDynamic
     */
    msgType?: string

}

/**
*
* @export
* @interface FlowUpPartner
*/
export interface FlowUpPartner {

    /**
     * 随访人员工号
     * @type {string}
     * @memberof FlowUpPartner
     */
    assignedUserId?: string

    /**
     * 随访人员手机号
     * @type {string}
     * @memberof FlowUpPartner
     */
    assignedUserMobile?: string

    /**
     * 随访人员名称
     * @type {string}
     * @memberof FlowUpPartner
     */
    assignedUserName?: string

    /**
     * 线索id
     * @type {number | string}
     * @memberof FlowUpPartner
     */
    flowUpId?: number | string

    /**
     * 主键id
     * @type {number | string}
     * @memberof FlowUpPartner
     */
    id?: number | string

}

/**
*
* @export
* @interface FlowUpPartnerRequest
*/
export interface FlowUpPartnerRequest {

    /**
     * 客户经理工号
     * @type {string}
     * @memberof FlowUpPartnerRequest
     */
    assignedUserId?: string

    /**
     * 客户经理手机号
     * @type {string}
     * @memberof FlowUpPartnerRequest
     */
    assignedUserMobile?: string

    /**
     * 客户经理姓名
     * @type {string}
     * @memberof FlowUpPartnerRequest
     */
    assignedUserName?: string

}

/**
*
* @export
* @interface FlowUpRequest
*/
export interface FlowUpRequest {

    /**
     * 协助内容
     * @type {string}
     * @memberof FlowUpRequest
     */
    assistantRemark?: string

    /**
     * (2.0项目)协助人员列表
     * @type {Array<Assistant>}
     * @memberof FlowUpRequest
     */
    assistants?: Array<Assistant>

    /**
     * 跟进事件id 线索id/客户id/1.0项目id/2.0项目id
     * @type {string}
     * @memberof FlowUpRequest
     */
    bizId?: string

    /**
     * 事件类型 1：线索  2：客户 3：1.0项目 4: 2.0项目
     * @type {number | string}
     * @memberof FlowUpRequest
     */
    bizType?: number | string

    /**
     * (2.0项目)客户联系人手机号
     * @type {string}
     * @memberof FlowUpRequest
     */
    contactMobile?: string

    /**
     * (2.0项目)客户联系人姓名
     * @type {string}
     * @memberof FlowUpRequest
     */
    contactName?: string

    /**
     * 跟进内容
     * @type {string}
     * @memberof FlowUpRequest
     */
    content?: string

    /**
     * 创建人
     * @type {string}
     * @memberof FlowUpRequest
     */
    createBy?: string

    /**
     * 创建人企业微信id
     * @type {string}
     * @memberof FlowUpRequest
     */
    createCorpUserId?: string

    /**
     * 创建人手机号
     * @type {string}
     * @memberof FlowUpRequest
     */
    createPhone?: string

    /**
     * (2.0项目)跟进节点 1：首次沟通 2：需求确认 3：提供方案/报价 4：商务洽谈，待签约 5：已签约 6：已回款 7：无需跟进
     * @type {number | string}
     * @memberof FlowUpRequest
     */
    flowUpProcess?: number | string

    /**
     * 主键id
     * @type {number | string}
     * @memberof FlowUpRequest
     */
    id?: number | string

    /**
     * 下次跟进时间
     * @type {string}
     * @memberof FlowUpRequest
     */
    nextFlowTime?: string

    /**
     * (2.0项目)无需跟进原因
     * @type {string}
     * @memberof FlowUpRequest
     */
    noNeedFlowReason?: string

    /**
     * 随访人员
     * @type {Array<FlowUpPartnerRequest>}
     * @memberof FlowUpRequest
     */
    partners?: Array<FlowUpPartnerRequest>

    /**
     * 当面拜访->现场图片        电话/微信沟通/邮件->附件
     * @type {Array<string>}
     * @memberof FlowUpRequest
     */
    picUrls?: Array<string>

    /**
     * 备注
     * @type {string}
     * @memberof FlowUpRequest
     */
    remark?: string

    /**
     * 跟进类型 1：当面拜访 2：电话/微信沟通/邮件等
     * @type {number | string}
     * @memberof FlowUpRequest
     */
    type?: number | string

}

/**
*
* @export
* @interface FlowUpResponse
*/
export interface FlowUpResponse {

    /**
     * 跟进事件id 线索id/客户id/1.0项目id/2.0项目id
     * @type {number | string}
     * @memberof FlowUpResponse
     */
    bizId?: number | string

    /**
     * 事件类型 1：线索  2：客户 3：1.0项目 4: 2.0项目
     * @type {number | string}
     * @memberof FlowUpResponse
     */
    bizType?: number | string

    /**
     * 公司名称
     * @type {string}
     * @memberof FlowUpResponse
     */
    companyName?: string

    /**
     * 跟进内容
     * @type {string}
     * @memberof FlowUpResponse
     */
    content?: string

    /**
     * 创建人微信头像
     * @type {string}
     * @memberof FlowUpResponse
     */
    createAvatar?: string

    /**
     * 创建人
     * @type {string}
     * @memberof FlowUpResponse
     */
    createBy?: string

    /**
     * 创建人手机号
     * @type {string}
     * @memberof FlowUpResponse
     */
    createPhone?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof FlowUpResponse
     */
    createTime?: string

    /**
     * 协助代办信息
     * @type {Array<CustomerBackLogWork>}
     * @memberof FlowUpResponse
     */
    customerBackLogWorks?: Array<CustomerBackLogWork>

    /**
     * 企业微信消息
     * @type {FlowUpDynamic}
     * @memberof FlowUpResponse
     */
    flowUpDynamic?: FlowUpDynamic

    /**
     * 主键id
     * @type {number | string}
     * @memberof FlowUpResponse
     */
    id?: number | string

    /**
     * 下次跟进时间
     * @type {string}
     * @memberof FlowUpResponse
     */
    nextFlowTime?: string

    /**
     * 现场图片
     * @type {Array<string>}
     * @memberof FlowUpResponse
     */
    picUrls?: Array<string>

    /**
     * 项目名称
     * @type {string}
     * @memberof FlowUpResponse
     */
    projectName?: string

    /**
     * 2.0项目详情
     * @type {ProjectSupplyFlowUp}
     * @memberof FlowUpResponse
     */
    projectSupplyFlowUp?: ProjectSupplyFlowUp

    /**
     * 备注
     * @type {string}
     * @memberof FlowUpResponse
     */
    remark?: string

    /**
     * 跟进类型 1：当面拜访 2：电话/微信沟通/邮件等
     * @type {number | string}
     * @memberof FlowUpResponse
     */
    type?: number | string

    /**
     * 更新人
     * @type {string}
     * @memberof FlowUpResponse
     */
    updateBy?: string

    /**
     * 更新人手机号
     * @type {string}
     * @memberof FlowUpResponse
     */
    updatePhone?: string

    /**
     * 更新时间
     * @type {string}
     * @memberof FlowUpResponse
     */
    updateTime?: string

}

/**
*
* @export
* @interface IPageCompanyQuotaChangeResponse
*/
export interface IPageCompanyQuotaChangeResponse {

    /**
     *
     * @type {number | string}
     * @memberof IPage«CompanyQuotaChangeResponse»
     */
    current?: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPage«CompanyQuotaChangeResponse»
     */
    pages?: number | string

    /**
     *
     * @type {Array<CompanyQuotaChangeResponse>}
     * @memberof IPage«CompanyQuotaChangeResponse»
     */
    records?: Array<CompanyQuotaChangeResponse>

    /**
     *
     * @type {boolean}
     * @memberof IPage«CompanyQuotaChangeResponse»
     */
    searchCount?: boolean

    /**
     *
     * @type {number | string}
     * @memberof IPage«CompanyQuotaChangeResponse»
     */
    size?: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPage«CompanyQuotaChangeResponse»
     */
    total?: number | string

}

/**
*
* @export
* @interface IPageCompanyTemporaryQuotaPageResp
*/
export interface IPageCompanyTemporaryQuotaPageResp {

    /**
     *
     * @type {number | string}
     * @memberof IPage«CompanyTemporaryQuotaPageResp»
     */
    current?: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPage«CompanyTemporaryQuotaPageResp»
     */
    pages?: number | string

    /**
     *
     * @type {Array<CompanyTemporaryQuotaPageResp>}
     * @memberof IPage«CompanyTemporaryQuotaPageResp»
     */
    records?: Array<CompanyTemporaryQuotaPageResp>

    /**
     *
     * @type {boolean}
     * @memberof IPage«CompanyTemporaryQuotaPageResp»
     */
    searchCount?: boolean

    /**
     *
     * @type {number | string}
     * @memberof IPage«CompanyTemporaryQuotaPageResp»
     */
    size?: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPage«CompanyTemporaryQuotaPageResp»
     */
    total?: number | string

}

/**
*
* @export
* @interface IPageCrmHiddenProjectResponse
*/
export interface IPageCrmHiddenProjectResponse {

    /**
     *
     * @type {number | string}
     * @memberof IPage«CrmHiddenProjectResponse»
     */
    current?: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPage«CrmHiddenProjectResponse»
     */
    pages?: number | string

    /**
     *
     * @type {Array<CrmHiddenProjectResponse>}
     * @memberof IPage«CrmHiddenProjectResponse»
     */
    records?: Array<CrmHiddenProjectResponse>

    /**
     *
     * @type {boolean}
     * @memberof IPage«CrmHiddenProjectResponse»
     */
    searchCount?: boolean

    /**
     *
     * @type {number | string}
     * @memberof IPage«CrmHiddenProjectResponse»
     */
    size?: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPage«CrmHiddenProjectResponse»
     */
    total?: number | string

}

/**
*
* @export
* @interface IPageCrmProjectResponse
*/
export interface IPageCrmProjectResponse {

    /**
     *
     * @type {number | string}
     * @memberof IPage«CrmProjectResponse»
     */
    current?: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPage«CrmProjectResponse»
     */
    pages?: number | string

    /**
     *
     * @type {Array<CrmProjectResponse>}
     * @memberof IPage«CrmProjectResponse»
     */
    records?: Array<CrmProjectResponse>

    /**
     *
     * @type {boolean}
     * @memberof IPage«CrmProjectResponse»
     */
    searchCount?: boolean

    /**
     *
     * @type {number | string}
     * @memberof IPage«CrmProjectResponse»
     */
    size?: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPage«CrmProjectResponse»
     */
    total?: number | string

}

/**
*
* @export
* @interface IPageFlowUpResponse
*/
export interface IPageFlowUpResponse {

    /**
     *
     * @type {number | string}
     * @memberof IPage«FlowUpResponse»
     */
    current?: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPage«FlowUpResponse»
     */
    pages?: number | string

    /**
     *
     * @type {Array<FlowUpResponse>}
     * @memberof IPage«FlowUpResponse»
     */
    records?: Array<FlowUpResponse>

    /**
     *
     * @type {boolean}
     * @memberof IPage«FlowUpResponse»
     */
    searchCount?: boolean

    /**
     *
     * @type {number | string}
     * @memberof IPage«FlowUpResponse»
     */
    size?: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPage«FlowUpResponse»
     */
    total?: number | string

}

/**
*
* @export
* @interface IPageProjectFlowUpResponse
*/
export interface IPageProjectFlowUpResponse {

    /**
     *
     * @type {number | string}
     * @memberof IPage«ProjectFlowUpResponse»
     */
    current?: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPage«ProjectFlowUpResponse»
     */
    pages?: number | string

    /**
     *
     * @type {Array<ProjectFlowUpResponse>}
     * @memberof IPage«ProjectFlowUpResponse»
     */
    records?: Array<ProjectFlowUpResponse>

    /**
     *
     * @type {boolean}
     * @memberof IPage«ProjectFlowUpResponse»
     */
    searchCount?: boolean

    /**
     *
     * @type {number | string}
     * @memberof IPage«ProjectFlowUpResponse»
     */
    size?: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPage«ProjectFlowUpResponse»
     */
    total?: number | string

}

/**
*
* @export
* @interface IPageProjectPunchRecord
*/
export interface IPageProjectPunchRecord {

    /**
     *
     * @type {number | string}
     * @memberof IPage«ProjectPunchRecord»
     */
    current?: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPage«ProjectPunchRecord»
     */
    pages?: number | string

    /**
     *
     * @type {Array<ProjectPunchRecord>}
     * @memberof IPage«ProjectPunchRecord»
     */
    records?: Array<ProjectPunchRecord>

    /**
     *
     * @type {boolean}
     * @memberof IPage«ProjectPunchRecord»
     */
    searchCount?: boolean

    /**
     *
     * @type {number | string}
     * @memberof IPage«ProjectPunchRecord»
     */
    size?: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPage«ProjectPunchRecord»
     */
    total?: number | string

}

/**
*
* @export
* @interface IPageProjectSchemeResponse
*/
export interface IPageProjectSchemeResponse {

    /**
     *
     * @type {number | string}
     * @memberof IPage«ProjectSchemeResponse»
     */
    current?: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPage«ProjectSchemeResponse»
     */
    pages?: number | string

    /**
     *
     * @type {Array<ProjectSchemeResponse>}
     * @memberof IPage«ProjectSchemeResponse»
     */
    records?: Array<ProjectSchemeResponse>

    /**
     *
     * @type {boolean}
     * @memberof IPage«ProjectSchemeResponse»
     */
    searchCount?: boolean

    /**
     *
     * @type {number | string}
     * @memberof IPage«ProjectSchemeResponse»
     */
    size?: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPage«ProjectSchemeResponse»
     */
    total?: number | string

}

/**
*
* @export
* @interface IPageRespBossCluePage
*/
export interface IPageRespBossCluePage {

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespBossCluePage»
     */
    current?: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespBossCluePage»
     */
    pages?: number | string

    /**
     *
     * @type {Array<RespBossCluePage>}
     * @memberof IPage«RespBossCluePage»
     */
    records?: Array<RespBossCluePage>

    /**
     *
     * @type {boolean}
     * @memberof IPage«RespBossCluePage»
     */
    searchCount?: boolean

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespBossCluePage»
     */
    size?: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespBossCluePage»
     */
    total?: number | string

}

/**
*
* @export
* @interface IPageRespBossCrmCompanyPage
*/
export interface IPageRespBossCrmCompanyPage {

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespBossCrmCompanyPage»
     */
    current?: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespBossCrmCompanyPage»
     */
    pages?: number | string

    /**
     *
     * @type {Array<RespBossCrmCompanyPage>}
     * @memberof IPage«RespBossCrmCompanyPage»
     */
    records?: Array<RespBossCrmCompanyPage>

    /**
     *
     * @type {boolean}
     * @memberof IPage«RespBossCrmCompanyPage»
     */
    searchCount?: boolean

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespBossCrmCompanyPage»
     */
    size?: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespBossCrmCompanyPage»
     */
    total?: number | string

}

/**
*
* @export
* @interface IPageRespCRMUser
*/
export interface IPageRespCRMUser {

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespCRMUser»
     */
    current?: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespCRMUser»
     */
    pages?: number | string

    /**
     *
     * @type {Array<RespCRMUser>}
     * @memberof IPage«RespCRMUser»
     */
    records?: Array<RespCRMUser>

    /**
     *
     * @type {boolean}
     * @memberof IPage«RespCRMUser»
     */
    searchCount?: boolean

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespCRMUser»
     */
    size?: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespCRMUser»
     */
    total?: number | string

}

/**
*
* @export
* @interface IPageRespCompanyCreditManager
*/
export interface IPageRespCompanyCreditManager {

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespCompanyCreditManager»
     */
    current?: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespCompanyCreditManager»
     */
    pages?: number | string

    /**
     *
     * @type {Array<RespCompanyCreditManager>}
     * @memberof IPage«RespCompanyCreditManager»
     */
    records?: Array<RespCompanyCreditManager>

    /**
     *
     * @type {boolean}
     * @memberof IPage«RespCompanyCreditManager»
     */
    searchCount?: boolean

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespCompanyCreditManager»
     */
    size?: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespCompanyCreditManager»
     */
    total?: number | string

}

/**
*
* @export
* @interface IPageRespCompanyVipApply
*/
export interface IPageRespCompanyVipApply {

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespCompanyVipApply»
     */
    current?: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespCompanyVipApply»
     */
    pages?: number | string

    /**
     *
     * @type {Array<RespCompanyVipApply>}
     * @memberof IPage«RespCompanyVipApply»
     */
    records?: Array<RespCompanyVipApply>

    /**
     *
     * @type {boolean}
     * @memberof IPage«RespCompanyVipApply»
     */
    searchCount?: boolean

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespCompanyVipApply»
     */
    size?: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespCompanyVipApply»
     */
    total?: number | string

}

/**
*
* @export
* @interface IPageRespCompanyVipManager
*/
export interface IPageRespCompanyVipManager {

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespCompanyVipManager»
     */
    current?: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespCompanyVipManager»
     */
    pages?: number | string

    /**
     *
     * @type {Array<RespCompanyVipManager>}
     * @memberof IPage«RespCompanyVipManager»
     */
    records?: Array<RespCompanyVipManager>

    /**
     *
     * @type {boolean}
     * @memberof IPage«RespCompanyVipManager»
     */
    searchCount?: boolean

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespCompanyVipManager»
     */
    size?: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespCompanyVipManager»
     */
    total?: number | string

}

/**
*
* @export
* @interface IPageRespCrmCluePage
*/
export interface IPageRespCrmCluePage {

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespCrmCluePage»
     */
    current?: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespCrmCluePage»
     */
    pages?: number | string

    /**
     *
     * @type {Array<RespCrmCluePage>}
     * @memberof IPage«RespCrmCluePage»
     */
    records?: Array<RespCrmCluePage>

    /**
     *
     * @type {boolean}
     * @memberof IPage«RespCrmCluePage»
     */
    searchCount?: boolean

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespCrmCluePage»
     */
    size?: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespCrmCluePage»
     */
    total?: number | string

}

/**
*
* @export
* @interface IPageRespCrmCompanyPage
*/
export interface IPageRespCrmCompanyPage {

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespCrmCompanyPage»
     */
    current?: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespCrmCompanyPage»
     */
    pages?: number | string

    /**
     *
     * @type {Array<RespCrmCompanyPage>}
     * @memberof IPage«RespCrmCompanyPage»
     */
    records?: Array<RespCrmCompanyPage>

    /**
     *
     * @type {boolean}
     * @memberof IPage«RespCrmCompanyPage»
     */
    searchCount?: boolean

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespCrmCompanyPage»
     */
    size?: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespCrmCompanyPage»
     */
    total?: number | string

}

/**
*
* @export
* @interface IPageRespCrmCustomerBackLogWork
*/
export interface IPageRespCrmCustomerBackLogWork {

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespCrmCustomerBackLogWork»
     */
    current?: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespCrmCustomerBackLogWork»
     */
    pages?: number | string

    /**
     *
     * @type {Array<RespCrmCustomerBackLogWork>}
     * @memberof IPage«RespCrmCustomerBackLogWork»
     */
    records?: Array<RespCrmCustomerBackLogWork>

    /**
     *
     * @type {boolean}
     * @memberof IPage«RespCrmCustomerBackLogWork»
     */
    searchCount?: boolean

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespCrmCustomerBackLogWork»
     */
    size?: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespCrmCustomerBackLogWork»
     */
    total?: number | string

}

/**
*
* @export
* @interface IPageRespCrmUserRegisterRecommend
*/
export interface IPageRespCrmUserRegisterRecommend {

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespCrmUserRegisterRecommend»
     */
    current?: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespCrmUserRegisterRecommend»
     */
    pages?: number | string

    /**
     *
     * @type {Array<RespCrmUserRegisterRecommend>}
     * @memberof IPage«RespCrmUserRegisterRecommend»
     */
    records?: Array<RespCrmUserRegisterRecommend>

    /**
     *
     * @type {boolean}
     * @memberof IPage«RespCrmUserRegisterRecommend»
     */
    searchCount?: boolean

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespCrmUserRegisterRecommend»
     */
    size?: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespCrmUserRegisterRecommend»
     */
    total?: number | string

}

/**
*
* @export
* @interface IPageRespCustomerBackLogWork
*/
export interface IPageRespCustomerBackLogWork {

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespCustomerBackLogWork»
     */
    current?: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespCustomerBackLogWork»
     */
    pages?: number | string

    /**
     *
     * @type {Array<RespCustomerBackLogWork>}
     * @memberof IPage«RespCustomerBackLogWork»
     */
    records?: Array<RespCustomerBackLogWork>

    /**
     *
     * @type {boolean}
     * @memberof IPage«RespCustomerBackLogWork»
     */
    searchCount?: boolean

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespCustomerBackLogWork»
     */
    size?: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespCustomerBackLogWork»
     */
    total?: number | string

}

/**
*
* @export
* @interface IPageRespDepartmentMemberStatics
*/
export interface IPageRespDepartmentMemberStatics {

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespDepartmentMemberStatics»
     */
    current?: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespDepartmentMemberStatics»
     */
    pages?: number | string

    /**
     *
     * @type {Array<RespDepartmentMemberStatics>}
     * @memberof IPage«RespDepartmentMemberStatics»
     */
    records?: Array<RespDepartmentMemberStatics>

    /**
     *
     * @type {boolean}
     * @memberof IPage«RespDepartmentMemberStatics»
     */
    searchCount?: boolean

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespDepartmentMemberStatics»
     */
    size?: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespDepartmentMemberStatics»
     */
    total?: number | string

}

/**
*
* @export
* @interface IPageRespProject
*/
export interface IPageRespProject {

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespProject»
     */
    current?: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespProject»
     */
    pages?: number | string

    /**
     *
     * @type {Array<RespProject>}
     * @memberof IPage«RespProject»
     */
    records?: Array<RespProject>

    /**
     *
     * @type {boolean}
     * @memberof IPage«RespProject»
     */
    searchCount?: boolean

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespProject»
     */
    size?: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespProject»
     */
    total?: number | string

}

/**
*
* @export
* @interface IPageRespRecommendCompanys
*/
export interface IPageRespRecommendCompanys {

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespRecommendCompanys»
     */
    current?: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespRecommendCompanys»
     */
    pages?: number | string

    /**
     *
     * @type {Array<RespRecommendCompanys>}
     * @memberof IPage«RespRecommendCompanys»
     */
    records?: Array<RespRecommendCompanys>

    /**
     *
     * @type {boolean}
     * @memberof IPage«RespRecommendCompanys»
     */
    searchCount?: boolean

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespRecommendCompanys»
     */
    size?: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespRecommendCompanys»
     */
    total?: number | string

}

/**
*
* @export
* @interface IPageRespRecommendReward
*/
export interface IPageRespRecommendReward {

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespRecommendReward»
     */
    current?: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespRecommendReward»
     */
    pages?: number | string

    /**
     *
     * @type {Array<RespRecommendReward>}
     * @memberof IPage«RespRecommendReward»
     */
    records?: Array<RespRecommendReward>

    /**
     *
     * @type {boolean}
     * @memberof IPage«RespRecommendReward»
     */
    searchCount?: boolean

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespRecommendReward»
     */
    size?: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespRecommendReward»
     */
    total?: number | string

}

/**
*
* @export
* @interface IPageRespUserMemberStatics
*/
export interface IPageRespUserMemberStatics {

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespUserMemberStatics»
     */
    current?: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespUserMemberStatics»
     */
    pages?: number | string

    /**
     *
     * @type {Array<RespUserMemberStatics>}
     * @memberof IPage«RespUserMemberStatics»
     */
    records?: Array<RespUserMemberStatics>

    /**
     *
     * @type {boolean}
     * @memberof IPage«RespUserMemberStatics»
     */
    searchCount?: boolean

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespUserMemberStatics»
     */
    size?: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespUserMemberStatics»
     */
    total?: number | string

}

/**
*
* @export
* @interface IPageRespWxCompanyMember
*/
export interface IPageRespWxCompanyMember {

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespWxCompanyMember»
     */
    current?: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespWxCompanyMember»
     */
    pages?: number | string

    /**
     *
     * @type {Array<RespWxCompanyMember>}
     * @memberof IPage«RespWxCompanyMember»
     */
    records?: Array<RespWxCompanyMember>

    /**
     *
     * @type {boolean}
     * @memberof IPage«RespWxCompanyMember»
     */
    searchCount?: boolean

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespWxCompanyMember»
     */
    size?: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPage«RespWxCompanyMember»
     */
    total?: number | string

}

/**
*
* @export
* @interface IPageUserFlowUpResp
*/
export interface IPageUserFlowUpResp {

    /**
     *
     * @type {number | string}
     * @memberof IPage«UserFlowUpResp»
     */
    current?: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPage«UserFlowUpResp»
     */
    pages?: number | string

    /**
     *
     * @type {Array<UserFlowUpResp>}
     * @memberof IPage«UserFlowUpResp»
     */
    records?: Array<UserFlowUpResp>

    /**
     *
     * @type {boolean}
     * @memberof IPage«UserFlowUpResp»
     */
    searchCount?: boolean

    /**
     *
     * @type {number | string}
     * @memberof IPage«UserFlowUpResp»
     */
    size?: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPage«UserFlowUpResp»
     */
    total?: number | string

}

/**
*
* @export
* @interface IntelligentRequest
*/
export interface IntelligentRequest {

    /**
     *
     * @type {string}
     * @memberof IntelligentRequest
     */
    intelligentSystemDetail?: string

    /**
     *
     * @type {string}
     * @memberof IntelligentRequest
     */
    intelligentSystemName?: string

    /**
     *
     * @type {Array<number | string>}
     * @memberof IntelligentRequest
     */
    schemeId?: Array<number | string>

}

/**
*
* @export
* @interface LiveRoomEnableRequest
*/
export interface LiveRoomEnableRequest {

    /**
     * 品牌logo_url
     * @type {string}
     * @memberof LiveRoomEnableRequest
     */
    brandLogoUrl?: string

    /**
     * 品牌视频url
     * @type {string}
     * @memberof LiveRoomEnableRequest
     */
    brandVideoUrl?: string

    /**
     * 产品介绍
     * @type {string}
     * @memberof LiveRoomEnableRequest
     */
    productIntroduc?: string

    /**
     * 直播间id(微信直播房间id)
     * @type {number | string}
     * @memberof LiveRoomEnableRequest
     */
    roomId?: number | string

    /**
     * 落地页名称(直播房间名称)
     * @type {string}
     * @memberof LiveRoomEnableRequest
     */
    roomName?: string

}

/**
*
* @export
* @interface LiveRoomResponse
*/
export interface LiveRoomResponse {

    /**
     * 主播名
     * @type {string}
     * @memberof LiveRoomResponse
     */
    anchorName?: string

    /**
     * 品牌logo_url
     * @type {string}
     * @memberof LiveRoomResponse
     */
    brandLogoUrl?: string

    /**
     * 品牌视频url
     * @type {string}
     * @memberof LiveRoomResponse
     */
    brandVideoUrl?: string

    /**
     * 是否关闭评论 【0：开启，1：关闭】（若关闭，观众端将隐藏评论入口，直播开始后不允许开启）
     * @type {number | string}
     * @memberof LiveRoomResponse
     */
    closeComment?: number | string

    /**
     * 是否关闭货架 【0：开启，1：关闭】（若关闭，观众端将隐藏商品货架，直播开始后不允许开启）
     * @type {number | string}
     * @memberof LiveRoomResponse
     */
    closeGoods?: number | string

    /**
     * 是否关闭客服 【0：开启，1：关闭】 默认关闭客服（直播开始后允许开启）
     * @type {number | string}
     * @memberof LiveRoomResponse
     */
    closeKf?: number | string

    /**
     * 是否关闭点赞 【0：开启，1：关闭】（若关闭，观众端将隐藏点赞按钮，直播开始后不允许开启）
     * @type {number | string}
     * @memberof LiveRoomResponse
     */
    closeLike?: number | string

    /**
     * 是否关闭回放 【0：开启，1：关闭】默认关闭回放（直播开始后允许开启）
     * @type {number | string}
     * @memberof LiveRoomResponse
     */
    closeReplay?: number | string

    /**
     * 直播间背景图链接
     * @type {string}
     * @memberof LiveRoomResponse
     */
    coverImg?: string

    /**
     * 创建人
     * @type {string}
     * @memberof LiveRoomResponse
     */
    createBy?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof LiveRoomResponse
     */
    createTime?: string

    /**
     * 直播计划结束时间
     * @type {string}
     * @memberof LiveRoomResponse
     */
    endTime?: string

    /**
     * 官方收录封面
     * @type {string}
     * @memberof LiveRoomResponse
     */
    feedsImg?: string

    /**
     * 是否放在首页 0 否 1是
     * @type {boolean}
     * @memberof LiveRoomResponse
     */
    homePage?: boolean

    /**
     * id
     * @type {number | string}
     * @memberof LiveRoomResponse
     */
    id?: number | string

    /**
     * 是否开启官方收录，1 开启，0 关闭
     * @type {number | string}
     * @memberof LiveRoomResponse
     */
    isFeedsPublic?: number | string

    /**
     * 直播间状态。101：直播中，102：未开始，103已结束，104禁播，105：暂停，106：异常，107：已过期
     * @type {number | string}
     * @memberof LiveRoomResponse
     */
    liveStatus?: number | string

    /**
     * 直播类型，1 推流 0 手机直播
     * @type {number | string}
     * @memberof LiveRoomResponse
     */
    liveType?: number | string

    /**
     * 房间名称
     * @type {string}
     * @memberof LiveRoomResponse
     */
    name?: string

    /**
     * 产品介绍
     * @type {string}
     * @memberof LiveRoomResponse
     */
    productIntroduc?: string

    /**
     * 直播间商品列表
     * @type {Array<RespRoomGoods>}
     * @memberof LiveRoomResponse
     */
    roomGoodsList?: Array<RespRoomGoods>

    /**
     * 直播间id(微信直播房间id)
     * @type {number | string}
     * @memberof LiveRoomResponse
     */
    roomId?: number | string

    /**
     * 落地页名称(直播房间名称)
     * @type {string}
     * @memberof LiveRoomResponse
     */
    roomName?: string

    /**
     * 直播间分享图链接
     * @type {string}
     * @memberof LiveRoomResponse
     */
    shareImg?: string

    /**
     * 直播间开始时间，列表按照start_time降序排列
     * @type {string}
     * @memberof LiveRoomResponse
     */
    startTime?: string

    /**
     * 状态1.启用 2.禁用（落地页启用/禁用）
     * @type {number | string}
     * @memberof LiveRoomResponse
     */
    status?: number | string

    /**
     * 更新人
     * @type {string}
     * @memberof LiveRoomResponse
     */
    updateBy?: string

    /**
     * 更新时间
     * @type {string}
     * @memberof LiveRoomResponse
     */
    updateTime?: string

}

/**
*
* @export
* @interface LiveRoomSaveRequest
*/
export interface LiveRoomSaveRequest {

    /**
     * 品牌logo_url
     * @type {string}
     * @memberof LiveRoomSaveRequest
     */
    brandLogoUrl?: string

    /**
     * 品牌视频url
     * @type {string}
     * @memberof LiveRoomSaveRequest
     */
    brandVideoUrl?: string

    /**
     * 产品介绍
     * @type {string}
     * @memberof LiveRoomSaveRequest
     */
    productIntroduc?: string

    /**
     * 直播间id(微信直播房间id)
     * @type {number | string}
     * @memberof LiveRoomSaveRequest
     */
    roomId?: number | string

    /**
     * 落地页名称(直播房间名称)
     * @type {string}
     * @memberof LiveRoomSaveRequest
     */
    roomName?: string

}

/**
*
* @export
* @interface LocalTime
*/
export interface LocalTime {

    /**
     *
     * @type {number | string}
     * @memberof LocalTime
     */
    hour?: number | string

    /**
     *
     * @type {number | string}
     * @memberof LocalTime
     */
    minute?: number | string

    /**
     *
     * @type {number | string}
     * @memberof LocalTime
     */
    nano?: number | string

    /**
     *
     * @type {number | string}
     * @memberof LocalTime
     */
    second?: number | string

}

/**
*
* @export
* @interface ModelAndView
*/
export interface ModelAndView {

    /**
     *
     * @type {boolean}
     * @memberof ModelAndView
     */
    empty?: boolean

    /**
     *
     * @type {object}
     * @memberof ModelAndView
     */
    model?: object

    /**
     *
     * @type {object}
     * @memberof ModelAndView
     */
    modelMap?: object

    /**
     *
     * @type {boolean}
     * @memberof ModelAndView
     */
    reference?: boolean

    /**
     *
     * @type {string}
     * @memberof ModelAndView
     */
    status?: string

    /**
     *
     * @type {View}
     * @memberof ModelAndView
     */
    view?: View

    /**
     *
     * @type {string}
     * @memberof ModelAndView
     */
    viewName?: string

}

/**
*
* @export
* @interface OrderItem
*/
export interface OrderItem {

    /**
     *
     * @type {boolean}
     * @memberof OrderItem
     */
    asc?: boolean

    /**
     *
     * @type {string}
     * @memberof OrderItem
     */
    column?: string

}

/**
*
* @export
* @interface PageRespBossProjectSupply
*/
export interface PageRespBossProjectSupply {

    /**
     *
     * @type {number | string}
     * @memberof Page«RespBossProjectSupply»
     */
    current?: number | string

    /**
     *
     * @type {Array<OrderItem>}
     * @memberof Page«RespBossProjectSupply»
     */
    orders?: Array<OrderItem>

    /**
     *
     * @type {number | string}
     * @memberof Page«RespBossProjectSupply»
     */
    pages?: number | string

    /**
     *
     * @type {Array<RespBossProjectSupply>}
     * @memberof Page«RespBossProjectSupply»
     */
    records?: Array<RespBossProjectSupply>

    /**
     *
     * @type {boolean}
     * @memberof Page«RespBossProjectSupply»
     */
    searchCount?: boolean

    /**
     *
     * @type {number | string}
     * @memberof Page«RespBossProjectSupply»
     */
    size?: number | string

    /**
     *
     * @type {number | string}
     * @memberof Page«RespBossProjectSupply»
     */
    total?: number | string

}

/**
*
* @export
* @interface PageRespBossRecommenderList
*/
export interface PageRespBossRecommenderList {

    /**
     *
     * @type {number | string}
     * @memberof Page«RespBossRecommenderList»
     */
    current?: number | string

    /**
     *
     * @type {Array<OrderItem>}
     * @memberof Page«RespBossRecommenderList»
     */
    orders?: Array<OrderItem>

    /**
     *
     * @type {number | string}
     * @memberof Page«RespBossRecommenderList»
     */
    pages?: number | string

    /**
     *
     * @type {Array<RespBossRecommenderList>}
     * @memberof Page«RespBossRecommenderList»
     */
    records?: Array<RespBossRecommenderList>

    /**
     *
     * @type {boolean}
     * @memberof Page«RespBossRecommenderList»
     */
    searchCount?: boolean

    /**
     *
     * @type {number | string}
     * @memberof Page«RespBossRecommenderList»
     */
    size?: number | string

    /**
     *
     * @type {number | string}
     * @memberof Page«RespBossRecommenderList»
     */
    total?: number | string

}

/**
*
* @export
* @interface PageRespCrmProjectSupply
*/
export interface PageRespCrmProjectSupply {

    /**
     *
     * @type {number | string}
     * @memberof Page«RespCrmProjectSupply»
     */
    current?: number | string

    /**
     *
     * @type {Array<OrderItem>}
     * @memberof Page«RespCrmProjectSupply»
     */
    orders?: Array<OrderItem>

    /**
     *
     * @type {number | string}
     * @memberof Page«RespCrmProjectSupply»
     */
    pages?: number | string

    /**
     *
     * @type {Array<RespCrmProjectSupply>}
     * @memberof Page«RespCrmProjectSupply»
     */
    records?: Array<RespCrmProjectSupply>

    /**
     *
     * @type {boolean}
     * @memberof Page«RespCrmProjectSupply»
     */
    searchCount?: boolean

    /**
     *
     * @type {number | string}
     * @memberof Page«RespCrmProjectSupply»
     */
    size?: number | string

    /**
     *
     * @type {number | string}
     * @memberof Page«RespCrmProjectSupply»
     */
    total?: number | string

}

/**
* 身份证人像面信息
* @export
* @interface PersonIdEntity
*/
export interface PersonIdEntity {

    /**
     * 公民身份证发证机关
     * @type {string}
     * @memberof PersonIdEntity
     */
    organization?: string

    /**
     * 公民身份证发证机关城市与城市辖区
     * @type {string}
     * @memberof PersonIdEntity
     */
    organizationCity?: string

    /**
     * 公民身份证发证机关国家行政编码
     * @type {string}
     * @memberof PersonIdEntity
     */
    organizationCountryId?: string

    /**
     * 公民身份证发证机关城市区域
     * @type {string}
     * @memberof PersonIdEntity
     */
    organizationDistrict?: string

    /**
     * 公民身份证发证机关省份与直辖市
     * @type {string}
     * @memberof PersonIdEntity
     */
    organizationProvince?: string

    /**
     * 公民居住地址
     * @type {string}
     * @memberof PersonIdEntity
     */
    personAddress?: string

    /**
     * 公民属相
     * @type {string}
     * @memberof PersonIdEntity
     */
    personAnimal?: string

    /**
     * 公民出生年月
     * @type {string}
     * @memberof PersonIdEntity
     */
    personBirth?: string

    /**
     * 公民出生城市与城市辖区
     * @type {string}
     * @memberof PersonIdEntity
     */
    personBirthCity?: string

    /**
     * 公民出生地国家行政编码
     * @type {string}
     * @memberof PersonIdEntity
     */
    personBirthCountryId?: string

    /**
     * 公民出生城市区域
     * @type {string}
     * @memberof PersonIdEntity
     */
    personBirthDistrict?: string

    /**
     * 公民出生省份与直辖市
     * @type {string}
     * @memberof PersonIdEntity
     */
    personBirthProvince?: string

    /**
     * 公民出生农历年
     * @type {string}
     * @memberof PersonIdEntity
     */
    personChineseBirth?: string

    /**
     * 公民身份号码
     * @type {string}
     * @memberof PersonIdEntity
     */
    personId?: string

    /**
     * 公民居住城市与城市辖区
     * @type {string}
     * @memberof PersonIdEntity
     */
    personLivingCity?: string

    /**
     * 公民居住地国家行政编码
     * @type {string}
     * @memberof PersonIdEntity
     */
    personLivingCountryId?: string

    /**
     * 公民居住城市区域
     * @type {string}
     * @memberof PersonIdEntity
     */
    personLivingDistrict?: string

    /**
     * 公民居住省份与直辖市
     * @type {string}
     * @memberof PersonIdEntity
     */
    personLivingProvince?: string

    /**
     * 公民姓名
     * @type {string}
     * @memberof PersonIdEntity
     */
    personName?: string

    /**
     * 公民民族
     * @type {string}
     * @memberof PersonIdEntity
     */
    personNation?: string

    /**
     * 公民性别
     * @type {string}
     * @memberof PersonIdEntity
     */
    personSex?: string

    /**
     * 公民星座
     * @type {string}
     * @memberof PersonIdEntity
     */
    personSign?: string

    /**
     * 公民身份证有效期
     * @type {string}
     * @memberof PersonIdEntity
     */
    timeZone?: string

}

/**
*
* @export
* @interface Project
*/
export interface Project {

    /**
     * 银行承兑执行费率
     * @type {number | string}
     * @memberof Project
     */
    acceptBankRate?: number | string

    /**
     * 验收款比例
     * @type {number | string}
     * @memberof Project
     */
    acceptancePaymentProportion?: number | string

    /**
     * 项目地址
     * @type {string}
     * @memberof Project
     */
    address?: string

    /**
     * 预付款比例
     * @type {number | string}
     * @memberof Project
     */
    advancePaymentProportion?: number | string

    /**
     * 首付款比例
     * @type {number | string}
     * @memberof Project
     */
    advancePaymentRate?: number | string

    /**
     * 附件地址
     * @type {string}
     * @memberof Project
     */
    attachmentUrl?: string

    /**
     * 审计结算款比例
     * @type {number | string}
     * @memberof Project
     */
    auditCalculationPaymentProportion?: number | string

    /**
     * 公司id
     * @type {number | string}
     * @memberof Project
     */
    companyId?: number | string

    /**
     * 公司名称
     * @type {string}
     * @memberof Project
     */
    companyName?: string

    /**
     * 合同金额
     * @type {number | string}
     * @memberof Project
     */
    contractAmount?: number | string

    /**
     * 合作机会分析
     * @type {string}
     * @memberof Project
     */
    cooperationAnalyse?: string

    /**
     * 创建人
     * @type {string}
     * @memberof Project
     */
    createBy?: string

    /**
     * 创建时间,格式为:yyyy-MM-dd HH:mm:ss
     * @type {string}
     * @memberof Project
     */
    createTime?: string

    /**
     * 客户角色
     * @type {string}
     * @memberof Project
     */
    customerRole?: string

    /**
     * 是否删除 0：否 1：是
     * @type {string}
     * @memberof Project
     */
    deleted?: string

    /**
     * 货到付款比例
     * @type {number | string}
     * @memberof Project
     */
    deliveryPaymentProportion?: number | string

    /**
     * 所属分部名称
     * @type {string}
     * @memberof Project
     */
    deptName?: string

    /**
     * 采购总额(元)
     * @type {number | string}
     * @memberof Project
     */
    deviceAmount?: number | string

    /**
     * 设备品牌
     * @type {string}
     * @memberof Project
     */
    deviceBrand?: string

    /**
     * 设备品类 1：空调 2：采暖 3：新风 4：净水 5：智能化 6：辅材 7：电梯 8：其他 9:电器 10:热水器
     * @type {number | string}
     * @memberof Project
     */
    deviceCategory?: number | string

    /**
     * 预估签约时间
     * @type {string}
     * @memberof Project
     */
    estimateSignTime?: string

    /**
     * 预估借款时间,格式为:yyyy-MM-dd
     * @type {string}
     * @memberof Project
     */
    estimatedLoanTime?: string

    /**
     * 甲方名称
     * @type {string}
     * @memberof Project
     */
    firstPartName?: string

    /**
     * 主键id
     * @type {number | string}
     * @memberof Project
     */
    id?: number | string

    /**
     * 安装进度款比例
     * @type {number | string}
     * @memberof Project
     */
    installProgressPaymentProportion?: number | string

    /**
     * 项目级别
     * @type {string}
     * @memberof Project
     */
    levels?: string

    /**
     * 借款周期
     * @type {number | string}
     * @memberof Project
     */
    loanMonth?: number | string

    /**
     * 回款方式 1：预付款 2：货到付款 3：安装进度款 4：验收 5：交付 6：审计结算 7：其他
     * @type {number | string}
     * @memberof Project
     */
    loanPayType?: number | string

    /**
     * 最大采购金额
     * @type {number | string}
     * @memberof Project
     */
    maxPurchaseAmount?: number | string

    /**
     * 其他客户角色
     * @type {string}
     * @memberof Project
     */
    otherCustomerRole?: string

    /**
     * 承兑备注
     * @type {string}
     * @memberof Project
     */
    payAcceptanceRemark?: string

    /**
     * 其他回款方式内容
     * @type {string}
     * @memberof Project
     */
    payOtherText?: string

    /**
     * 回款比例
     * @type {number | string}
     * @memberof Project
     */
    payProportion?: number | string

    /**
     * EHR部门主键
     * @type {string}
     * @memberof Project
     */
    pkDeptDoc?: string

    /**
     * 预估借款金额
     * @type {number | string}
     * @memberof Project
     */
    predictLoanAmount?: number | string

    /**
     * 项目进度 1：项目跟踪阶段 2：招投标 3：合同已签订 4：项目已开工
     * @type {number | string}
     * @memberof Project
     */
    progress?: number | string

    /**
     * 项目专项额冻结
     * @type {number | string}
     * @memberof Project
     */
    projectFreezeAmount?: number | string

    /**
     * 项目名称
     * @type {string}
     * @memberof Project
     */
    projectName?: string

    /**
     * 项目编号
     * @type {string}
     * @memberof Project
     */
    projectNo?: string

    /**
     * 项目专项额度
     * @type {number | string}
     * @memberof Project
     */
    projectQuotaAmount?: number | string

    /**
     * 项目专项额度可用
     * @type {number | string}
     * @memberof Project
     */
    projectQuotaUsableAmount?: number | string

    /**
     * 交付款比例
     * @type {number | string}
     * @memberof Project
     */
    realPaymentProportion?: number | string

    /**
     * 剩余货款支付周期（月）
     * @type {number | string}
     * @memberof Project
     */
    remainPaymentCycle?: number | string

    /**
     * 评审决议备注
     * @type {string}
     * @memberof Project
     */
    resolutionRemark?: string

    /**
     * 评审决议状态 1：待提交 2：审批中 3：审批未通过 4：审批通过 5：变更决议待发起 6：变更决议审批中 7：变更决议审批未通过 8：变更决议审批通过
     * @type {number | string}
     * @memberof Project
     */
    resolutionStatus?: number | string

    /**
     * 销售毛利率(%)
     * @type {number | string}
     * @memberof Project
     */
    salesGrossMargin?: number | string

    /**
     * 销售总额(元)
     * @type {number | string}
     * @memberof Project
     */
    salesTotalAmount?: number | string

    /**
     * 项目服务费
     * @type {number | string}
     * @memberof Project
     */
    serviceCharge?: number | string

    /**
     * 状态 1：待提交2：初审中 3：资料收集中 12：资料待审核 4：待立项  5：审核未通过 11：待终审 6：待签约 7：待放款 8：贷中 9：项目完成 10:信息待完善 13: 终审通过 14：终审未通过
     * @type {number | string}
     * @memberof Project
     */
    status?: number | string

    /**
     * 提交时间,格式为:yyyy-MM-dd HH:mm:ss
     * @type {string}
     * @memberof Project
     */
    submitTime?: string

    /**
     * 所属分部编码
     * @type {string}
     * @memberof Project
     */
    subsectionCode?: string

    /**
     * 银行转账执行费率
     * @type {number | string}
     * @memberof Project
     */
    transferBankRate?: number | string

    /**
     * 项目类别 1：地产项目 2：政府共建项目 3：市政项目 4：办公楼 5：厂房 6：其他
     * @type {number | string}
     * @memberof Project
     */
    type?: number | string

    /**
     * 修改人
     * @type {string}
     * @memberof Project
     */
    updateBy?: string

    /**
     * 修改时间,格式为:yyyy-MM-dd HH:mm:ss
     * @type {string}
     * @memberof Project
     */
    updateTime?: string

    /**
     * 上游接受的付款方式 1：现金 2：承兑
     * @type {string}
     * @memberof Project
     */
    upstreamPayType?: string

    /**
     * 上游供应商承诺兑现时间（月）
     * @type {number | string}
     * @memberof Project
     */
    upstreamPromiseMonth?: number | string

    /**
     * 上游供应商名称
     * @type {string}
     * @memberof Project
     */
    upstreamSupplierName?: string

    /**
     * 上游供应商类型 1：厂商 2：代理商 3：经销商
     * @type {number | string}
     * @memberof Project
     */
    upstreamSupplierType?: number | string

}

/**
*
* @export
* @interface ProjectAudit
*/
export interface ProjectAudit {

    /**
     * 审核后的状态
     * @type {number | string}
     * @memberof ProjectAudit
     */
    afterStatus?: number | string

    /**
     * 附件
     * @type {string}
     * @memberof ProjectAudit
     */
    attachment?: string

    /**
     * 审核前的状态
     * @type {number | string}
     * @memberof ProjectAudit
     */
    beforeStatus?: number | string

    /**
     * 审批人
     * @type {string}
     * @memberof ProjectAudit
     */
    createBy?: string

    /**
     * 审批人手机号
     * @type {string}
     * @memberof ProjectAudit
     */
    createByMobile?: string

    /**
     * 审批时间,格式为:yyyy-MM-dd HH:mm:ss
     * @type {string}
     * @memberof ProjectAudit
     */
    createTime?: string

    /**
     * 主键id
     * @type {number | string}
     * @memberof ProjectAudit
     */
    id?: number | string

    /**
     * 工程项目id
     * @type {number | string}
     * @memberof ProjectAudit
     */
    projectId?: number | string

    /**
     * 审核备注
     * @type {string}
     * @memberof ProjectAudit
     */
    remark?: string

    /**
     * 审核结果 0：不通过 1：通过
     * @type {number | string}
     * @memberof ProjectAudit
     */
    result?: number | string

    /**
     * 1：审核  2： 立项 3：重置
     * @type {number | string}
     * @memberof ProjectAudit
     */
    type?: number | string

}

/**
*
* @export
* @interface ProjectFlowUpDetailResponse
*/
export interface ProjectFlowUpDetailResponse {

    /**
     * 跟进事件id
     * @type {number | string}
     * @memberof ProjectFlowUpDetailResponse
     */
    bizId?: number | string

    /**
     * 事件类型 1：线索  2：客户 3：1.0项目 4: 2.0项目
     * @type {number | string}
     * @memberof ProjectFlowUpDetailResponse
     */
    bizType?: number | string

    /**
     * 经销商
     * @type {string}
     * @memberof ProjectFlowUpDetailResponse
     */
    companyName?: string

    /**
     * 跟进内容
     * @type {string}
     * @memberof ProjectFlowUpDetailResponse
     */
    content?: string

    /**
     * 创建人
     * @type {string}
     * @memberof ProjectFlowUpDetailResponse
     */
    createBy?: string

    /**
     * 创建人手机号
     * @type {string}
     * @memberof ProjectFlowUpDetailResponse
     */
    createPhone?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof ProjectFlowUpDetailResponse
     */
    createTime?: string

    /**
     * 协助人员列表
     * @type {Array<CustomerBackLogWork>}
     * @memberof ProjectFlowUpDetailResponse
     */
    customerBackLogWorks?: Array<CustomerBackLogWork>

    /**
     * 主键id
     * @type {number | string}
     * @memberof ProjectFlowUpDetailResponse
     */
    id?: number | string

    /**
     * 下次跟进时间
     * @type {string}
     * @memberof ProjectFlowUpDetailResponse
     */
    nextFlowTime?: string

    /**
     * 随访人员
     * @type {Array<FlowUpPartner>}
     * @memberof ProjectFlowUpDetailResponse
     */
    partners?: Array<FlowUpPartner>

    /**
     * 现场图片
     * @type {Array<string>}
     * @memberof ProjectFlowUpDetailResponse
     */
    picUrls?: Array<string>

    /**
     * 项目名称
     * @type {string}
     * @memberof ProjectFlowUpDetailResponse
     */
    projectName?: string

    /**
     * 备注
     * @type {string}
     * @memberof ProjectFlowUpDetailResponse
     */
    remark?: string

    /**
     * 跟进类型 1：当面拜访 2：电话/微信沟通/邮件等
     * @type {number | string}
     * @memberof ProjectFlowUpDetailResponse
     */
    type?: number | string

    /**
     * 更新人
     * @type {string}
     * @memberof ProjectFlowUpDetailResponse
     */
    updateBy?: string

    /**
     * 更新人手机号
     * @type {string}
     * @memberof ProjectFlowUpDetailResponse
     */
    updatePhone?: string

    /**
     * 更新时间
     * @type {string}
     * @memberof ProjectFlowUpDetailResponse
     */
    updateTime?: string

}

/**
*
* @export
* @interface ProjectFlowUpResponse
*/
export interface ProjectFlowUpResponse {

    /**
     * 跟进事件id 线索id/客户id/1.0项目id/2.0项目id
     * @type {number | string}
     * @memberof ProjectFlowUpResponse
     */
    bizId?: number | string

    /**
     * 事件类型 1：线索  2：客户 3：1.0项目 4: 2.0项目
     * @type {number | string}
     * @memberof ProjectFlowUpResponse
     */
    bizType?: number | string

    /**
     * 经销商名称
     * @type {string}
     * @memberof ProjectFlowUpResponse
     */
    companyName?: string

    /**
     * 跟进内容
     * @type {string}
     * @memberof ProjectFlowUpResponse
     */
    content?: string

    /**
     * 创建人微信头像
     * @type {string}
     * @memberof ProjectFlowUpResponse
     */
    createAvatar?: string

    /**
     * 创建人
     * @type {string}
     * @memberof ProjectFlowUpResponse
     */
    createBy?: string

    /**
     * 创建人手机号
     * @type {string}
     * @memberof ProjectFlowUpResponse
     */
    createPhone?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof ProjectFlowUpResponse
     */
    createTime?: string

    /**
     * 协助代办信息
     * @type {Array<CustomerBackLogWork>}
     * @memberof ProjectFlowUpResponse
     */
    customerBackLogWorks?: Array<CustomerBackLogWork>

    /**
     * 企业微信消息
     * @type {FlowUpDynamic}
     * @memberof ProjectFlowUpResponse
     */
    flowUpDynamic?: FlowUpDynamic

    /**
     * 主键id
     * @type {number | string}
     * @memberof ProjectFlowUpResponse
     */
    id?: number | string

    /**
     * 下次跟进时间
     * @type {string}
     * @memberof ProjectFlowUpResponse
     */
    nextFlowTime?: string

    /**
     * 随访人员
     * @type {Array<FlowUpPartner>}
     * @memberof ProjectFlowUpResponse
     */
    partners?: Array<FlowUpPartner>

    /**
     * 现场图片
     * @type {Array<string>}
     * @memberof ProjectFlowUpResponse
     */
    picUrls?: Array<string>

    /**
     * 项目名称
     * @type {string}
     * @memberof ProjectFlowUpResponse
     */
    projectName?: string

    /**
     * 备注
     * @type {string}
     * @memberof ProjectFlowUpResponse
     */
    remark?: string

    /**
     * 跟进类型 1：当面拜访 2：电话/微信沟通/邮件等
     * @type {number | string}
     * @memberof ProjectFlowUpResponse
     */
    type?: number | string

    /**
     * 更新人
     * @type {string}
     * @memberof ProjectFlowUpResponse
     */
    updateBy?: string

    /**
     * 更新人手机号
     * @type {string}
     * @memberof ProjectFlowUpResponse
     */
    updatePhone?: string

    /**
     * 更新时间
     * @type {string}
     * @memberof ProjectFlowUpResponse
     */
    updateTime?: string

}

/**
*
* @export
* @interface ProjectProcessNode
*/
export interface ProjectProcessNode {

    /**
     * 2.0项目进度节点-节点key
     * @type {number | string}
     * @memberof ProjectProcessNode
     */
    nodeKey?: number | string

    /**
     * 2.0项目进度节点-节点名称
     * @type {string}
     * @memberof ProjectProcessNode
     */
    nodeName?: string

    /**
     * 2.0项目进度节点-节点状态,0=置灰 1=点亮
     * @type {number | string}
     * @memberof ProjectProcessNode
     */
    nodeStatus?: number | string

}

/**
*
* @export
* @interface ProjectPunchRecord
*/
export interface ProjectPunchRecord {

    /**
     * 审批人
     * @type {string}
     * @memberof ProjectPunchRecord
     */
    createBy?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof ProjectPunchRecord
     */
    createTime?: string

    /**
     * 主键ID
     * @type {number | string}
     * @memberof ProjectPunchRecord
     */
    id?: number | string

    /**
     * 工程ID
     * @type {number | string}
     * @memberof ProjectPunchRecord
     */
    projectId?: number | string

    /**
     * 打卡图片地址
     * @type {string}
     * @memberof ProjectPunchRecord
     */
    punchImageUrl?: string

}

/**
*
* @export
* @interface ProjectPurchaseRequest
*/
export interface ProjectPurchaseRequest {

    /**
     * 银行承兑自定义费率
     * @type {number | string}
     * @memberof ProjectPurchaseRequest
     */
    acceptanceRate?: number | string

    /**
     * 银行承兑费率类型 1：执行费率 2：自定义费率
     * @type {number | string}
     * @memberof ProjectPurchaseRequest
     */
    acceptanceRateType?: number | string

    /**
     * 设备品牌
     * @type {string}
     * @memberof ProjectPurchaseRequest
     */
    deviceBrand?: string

    /**
     * 设备品类类型 1：空调 2：采暖 3：新风 4：净水 5：智能化 6：辅材 7：电梯 8：其他 9:电器 10:热水器
     * @type {Array<number | string>}
     * @memberof ProjectPurchaseRequest
     */
    deviceCategoryType?: Array<number | string>

    /**
     * 项目采购信息id
     * @type {number | string}
     * @memberof ProjectPurchaseRequest
     */
    id?: number | string

    /**
     * 其他：设备品类
     * @type {string}
     * @memberof ProjectPurchaseRequest
     */
    otherDeviceCategory?: string

    /**
     * 采购折让(%)
     * @type {number | string}
     * @memberof ProjectPurchaseRequest
     */
    purchaseDiscountRate?: number | string

    /**
     * 银行转账自定义费率
     * @type {number | string}
     * @memberof ProjectPurchaseRequest
     */
    transferRate?: number | string

    /**
     * 银行转账费率类型 1：执行费率 2：自定义费率
     * @type {number | string}
     * @memberof ProjectPurchaseRequest
     */
    transferRateType?: number | string

    /**
     * 上游货款方式 1：先款后货 2：先货后款
     * @type {number | string}
     * @memberof ProjectPurchaseRequest
     */
    upstreamLoanType?: number | string

    /**
     * 上游接受的付款方式 1：现金 2：承兑 , 多个逗号隔开
     * @type {Array<number | string>}
     * @memberof ProjectPurchaseRequest
     */
    upstreamPayType?: Array<number | string>

    /**
     * 上游供应商名称
     * @type {string}
     * @memberof ProjectPurchaseRequest
     */
    upstreamSupplierName?: string

    /**
     * 上游供应商类型 1：厂商 2：代理商 3：经销商
     * @type {number | string}
     * @memberof ProjectPurchaseRequest
     */
    upstreamSupplierType?: number | string

}

/**
*
* @export
* @interface ProjectPurchaseResponse
*/
export interface ProjectPurchaseResponse {

    /**
     * 银行承兑自定义费率
     * @type {number | string}
     * @memberof ProjectPurchaseResponse
     */
    acceptanceRate?: number | string

    /**
     * 银行承兑费率类型 1：执行费率 2：自定义费率
     * @type {number | string}
     * @memberof ProjectPurchaseResponse
     */
    acceptanceRateType?: number | string

    /**
     * 所属项目id/发起决议变更快照id
     * @type {number | string}
     * @memberof ProjectPurchaseResponse
     */
    ascriptionId?: number | string

    /**
     * 设备品牌
     * @type {string}
     * @memberof ProjectPurchaseResponse
     */
    deviceBrand?: string

    /**
     * 设备品类
     * @type {string}
     * @memberof ProjectPurchaseResponse
     */
    deviceCategory?: string

    /**
     * 设备品类类型 1：空调 2：采暖 3：新风 4：净水 5：智能化 6：辅材 7：电梯 8：其他 9:电器 10:热水器
     * @type {string}
     * @memberof ProjectPurchaseResponse
     */
    deviceCategoryType?: string

    /**
     * 项目采购信息id
     * @type {number | string}
     * @memberof ProjectPurchaseResponse
     */
    id?: number | string

    /**
     * 设备品类类型其他：设备品类名称
     * @type {string}
     * @memberof ProjectPurchaseResponse
     */
    otherDeviceCategory?: string

    /**
     * 采购折让(%)
     * @type {number | string}
     * @memberof ProjectPurchaseResponse
     */
    purchaseDiscountRate?: number | string

    /**
     * 银行转账自定义费率
     * @type {number | string}
     * @memberof ProjectPurchaseResponse
     */
    transferRate?: number | string

    /**
     * 银行转账费率类型 1：执行费率 2：自定义费率
     * @type {number | string}
     * @memberof ProjectPurchaseResponse
     */
    transferRateType?: number | string

    /**
     * 上游货款方式 1：先款后货 2：先货后款
     * @type {number | string}
     * @memberof ProjectPurchaseResponse
     */
    upstreamLoanType?: number | string

    /**
     * 上游接受的付款方式 1：现金 2：承兑 , 多个逗号隔开
     * @type {Array<number | string>}
     * @memberof ProjectPurchaseResponse
     */
    upstreamPayType?: Array<number | string>

    /**
     * 上游接受的付款方式
     * @type {Array<string>}
     * @memberof ProjectPurchaseResponse
     */
    upstreamPayTypeName?: Array<string>

    /**
     * 上游支付方式
     * @type {Array<UpstreamPayTypeResponse>}
     * @memberof ProjectPurchaseResponse
     */
    upstreamPayTypeResponseList?: Array<UpstreamPayTypeResponse>

    /**
     * 上游供应商
     * @type {string}
     * @memberof ProjectPurchaseResponse
     */
    upstreamSupplierName?: string

    /**
     * 上游供应商类型 1：厂商 2：代理商 3：经销商
     * @type {number | string}
     * @memberof ProjectPurchaseResponse
     */
    upstreamSupplierType?: number | string

}

/**
*
* @export
* @interface ProjectResolutionRecordDetail
*/
export interface ProjectResolutionRecordDetail {

    /**
     * 变更名称
     * @type {string}
     * @memberof ProjectResolutionRecordDetail
     */
    changeName?: string

    /**
     * 变更后内容
     * @type {string}
     * @memberof ProjectResolutionRecordDetail
     */
    contentAfterChange?: string

    /**
     * 变更前内容
     * @type {string}
     * @memberof ProjectResolutionRecordDetail
     */
    contentBeforeChange?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof ProjectResolutionRecordDetail
     */
    createTime?: string

    /**
     * 主键ID
     * @type {number | string}
     * @memberof ProjectResolutionRecordDetail
     */
    id?: number | string

    /**
     * 决议记录主表id
     * @type {number | string}
     * @memberof ProjectResolutionRecordDetail
     */
    resolutionRecordId?: number | string

}

/**
*
* @export
* @interface ProjectSchemeDetailResponse
*/
export interface ProjectSchemeDetailResponse {

    /**
     * 创建时间
     * @type {string}
     * @memberof ProjectSchemeDetailResponse
     */
    createTime?: string

    /**
     * 生效时间
     * @type {string}
     * @memberof ProjectSchemeDetailResponse
     */
    effectiveTime?: string

    /**
     *
     * @type {number | string}
     * @memberof ProjectSchemeDetailResponse
     */
    id?: number | string

    /**
     * 方案详情
     * @type {string}
     * @memberof ProjectSchemeDetailResponse
     */
    schemeDetail?: string

    /**
     * 方案图片
     * @type {string}
     * @memberof ProjectSchemeDetailResponse
     */
    schemeImage?: string

    /**
     * 方案标题
     * @type {string}
     * @memberof ProjectSchemeDetailResponse
     */
    schemeTitle?: string

    /**
     * 方案视频
     * @type {string}
     * @memberof ProjectSchemeDetailResponse
     */
    schemeVideo?: string

}

/**
*
* @export
* @interface ProjectSchemeRequest
*/
export interface ProjectSchemeRequest {

    /**
     * 创建人手机号，创建时必填
     * @type {string}
     * @memberof ProjectSchemeRequest
     */
    createPhone?: string

    /**
     * 生效时间
     * @type {string}
     * @memberof ProjectSchemeRequest
     */
    effectiveTime: string

    /**
     * 方案id
     * @type {number | string}
     * @memberof ProjectSchemeRequest
     */
    id?: number | string

    /**
     * 操作人
     * @type {string}
     * @memberof ProjectSchemeRequest
     */
    operator: string

    /**
     * 方案详情
     * @type {string}
     * @memberof ProjectSchemeRequest
     */
    schemeDetail: string

    /**
     * 方案缩略图
     * @type {string}
     * @memberof ProjectSchemeRequest
     */
    schemeImage: string

    /**
     * 方案标题
     * @type {string}
     * @memberof ProjectSchemeRequest
     */
    schemeTitle: string

    /**
     * 方案视频
     * @type {string}
     * @memberof ProjectSchemeRequest
     */
    schemeVideo?: string

}

/**
*
* @export
* @interface ProjectSchemeResponse
*/
export interface ProjectSchemeResponse {

    /**
     * 创建人
     * @type {string}
     * @memberof ProjectSchemeResponse
     */
    createBy?: string

    /**
     * 创建人手机号
     * @type {string}
     * @memberof ProjectSchemeResponse
     */
    createPhone?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof ProjectSchemeResponse
     */
    createTime?: string

    /**
     * 生效时间
     * @type {string}
     * @memberof ProjectSchemeResponse
     */
    effectiveTime?: string

    /**
     *
     * @type {number | string}
     * @memberof ProjectSchemeResponse
     */
    id?: number | string

    /**
     * 方案图片
     * @type {string}
     * @memberof ProjectSchemeResponse
     */
    schemeImage?: string

    /**
     * 方案标题
     * @type {string}
     * @memberof ProjectSchemeResponse
     */
    schemeTitle?: string

}

/**
*
* @export
* @interface ProjectSupplyFlowUp
*/
export interface ProjectSupplyFlowUp {

    /**
     * 客户联系人手机号
     * @type {string}
     * @memberof ProjectSupplyFlowUp
     */
    contactMobile?: string

    /**
     * 客户联系人名字
     * @type {string}
     * @memberof ProjectSupplyFlowUp
     */
    contactName?: string

    /**
     * 跟进记录id
     * @type {number | string}
     * @memberof ProjectSupplyFlowUp
     */
    flowUpId?: number | string

    /**
     * 跟进节点 1：首次沟通 2：需求确认 3：提供方案/报价 4：商务洽谈，待签约 5：已签约 6：已回款 7：无需跟进
     * @type {number | string}
     * @memberof ProjectSupplyFlowUp
     */
    flowUpProcess?: number | string

    /**
     * 主键id
     * @type {number | string}
     * @memberof ProjectSupplyFlowUp
     */
    id?: number | string

    /**
     * 无需跟进原因
     * @type {string}
     * @memberof ProjectSupplyFlowUp
     */
    noNeedFlowReason?: string

    /**
     * 项目id
     * @type {number | string}
     * @memberof ProjectSupplyFlowUp
     */
    projectId?: number | string

}

/**
*
* @export
* @interface QuotaFreezeRequest
*/
export interface QuotaFreezeRequest {

    /**
     *
     * @type {number | string}
     * @memberof QuotaFreezeRequest
     */
    arrearAmount?: number | string

    /**
     *
     * @type {number | string}
     * @memberof QuotaFreezeRequest
     */
    companyId?: number | string

    /**
     *
     * @type {string}
     * @memberof QuotaFreezeRequest
     */
    createBy?: string

    /**
     *
     * @type {string}
     * @memberof QuotaFreezeRequest
     */
    createPhone?: string

    /**
     *
     * @type {number | string}
     * @memberof QuotaFreezeRequest
     */
    paymentOrderId?: number | string

    /**
     *
     * @type {string}
     * @memberof QuotaFreezeRequest
     */
    paymentOrderNo?: string

    /**
     *
     * @type {number | string}
     * @memberof QuotaFreezeRequest
     */
    poId?: number | string

    /**
     *
     * @type {number | string}
     * @memberof QuotaFreezeRequest
     */
    projectId?: number | string

}

/**
* 工地打卡相关信息
* @export
* @interface ReqAddWatermark
*/
export interface ReqAddWatermark {

    /**
     * base64字符串
     * @type {string}
     * @memberof ReqAddWatermark
     */
    base64?: string

    /**
     * 纬度
     * @type {string}
     * @memberof ReqAddWatermark
     */
    latitude?: string

    /**
     * 经度
     * @type {string}
     * @memberof ReqAddWatermark
     */
    longitude?: string

    /**
     * url图片
     * @type {string}
     * @memberof ReqAddWatermark
     */
    url?: string

}

/**
*
* @export
* @interface ReqAppletsCompanyUserDelete
*/
export interface ReqAppletsCompanyUserDelete {

    /**
     * 当前用户id
     * @type {number | string}
     * @memberof ReqAppletsCompanyUserDelete
     */
    userId: number | string

}

/**
*
* @export
* @interface ReqAppletsUserName
*/
export interface ReqAppletsUserName {

    /**
     * 用户名称
     * @type {string}
     * @memberof ReqAppletsUserName
     */
    name: string

    /**
     * 用户id
     * @type {number | string}
     * @memberof ReqAppletsUserName
     */
    userId: number | string

}

/**
*
* @export
* @interface ReqAppletsUserPhone
*/
export interface ReqAppletsUserPhone {

    /**
     * 验证码
     * @type {string}
     * @memberof ReqAppletsUserPhone
     */
    code: string

    /**
     * 手机号
     * @type {string}
     * @memberof ReqAppletsUserPhone
     */
    phone: string

    /**
     * 用户id
     * @type {number | string}
     * @memberof ReqAppletsUserPhone
     */
    userId: number | string

}

/**
*
* @export
* @interface ReqAssignmentCustomer
*/
export interface ReqAssignmentCustomer {

    /**
     * 线索id
     * @type {Array<number | string>}
     * @memberof ReqAssignmentCustomer
     */
    clueId?: Array<number | string>

    /**
     * 客户经理分部
     * @type {string}
     * @memberof ReqAssignmentCustomer
     */
    customerDeptName?: string

    /**
     * 客户经理手机号
     * @type {string}
     * @memberof ReqAssignmentCustomer
     */
    customerMobile?: string

    /**
     * 客户经理名称
     * @type {string}
     * @memberof ReqAssignmentCustomer
     */
    customerName?: string

}

/**
*
* @export
* @interface ReqAuthenticationRecord
*/
export interface ReqAuthenticationRecord {

    /**
     * 认证人
     * @type {string}
     * @memberof ReqAuthenticationRecord
     */
    authenticationBy?: string

    /**
     * 认证人（手机号）
     * @type {string}
     * @memberof ReqAuthenticationRecord
     */
    authenticationPhone?: string

    /**
     * 营业执照
     * @type {string}
     * @memberof ReqAuthenticationRecord
     */
    businessLicensePhoto?: string

    /**
     * 身份证人像面
     * @type {string}
     * @memberof ReqAuthenticationRecord
     */
    certPhotoA?: string

    /**
     * 身份证国徽面
     * @type {string}
     * @memberof ReqAuthenticationRecord
     */
    certPhotoB?: string

    /**
     * 公司编码
     * @type {string}
     * @memberof ReqAuthenticationRecord
     */
    companyCode?: string

    /**
     * 企业全称
     * @type {string}
     * @memberof ReqAuthenticationRecord
     */
    corporationName?: string

    /**
     * 身份证有效期
     * @type {string}
     * @memberof ReqAuthenticationRecord
     */
    idCardValidity?: string

    /**
     * 法人身份证号
     * @type {string}
     * @memberof ReqAuthenticationRecord
     */
    legalCredentialNumber?: string

    /**
     * 法人姓名
     * @type {string}
     * @memberof ReqAuthenticationRecord
     */
    legalPersonName?: string

    /**
     * 企业数据
     * @type {ReqCrmCompany}
     * @memberof ReqAuthenticationRecord
     */
    reqCrmCompany?: ReqCrmCompany

    /**
     * 社会统一信用代码
     * @type {string}
     * @memberof ReqAuthenticationRecord
     */
    unifiedSocialCreditCode?: string

}

/**
*
* @export
* @interface ReqBossCompanyUserTransferAdmin
*/
export interface ReqBossCompanyUserTransferAdmin {

    /**
     * 公司编码
     * @type {string}
     * @memberof ReqBossCompanyUserTransferAdmin
     */
    companyCode: string

    /**
     * 更新人账号
     * @type {string}
     * @memberof ReqBossCompanyUserTransferAdmin
     */
    updateBy: string

    /**
     * 更新人名称
     * @type {string}
     * @memberof ReqBossCompanyUserTransferAdmin
     */
    updateName?: string

    /**
     * 用户id
     * @type {number | string}
     * @memberof ReqBossCompanyUserTransferAdmin
     */
    userId: number | string

}

/**
*
* @export
* @interface ReqBossCrmCompany
*/
export interface ReqBossCrmCompany {

    /**
     * 区ids
     * @type {string}
     * @memberof ReqBossCrmCompany
     */
    areaIds?: string

    /**
     * 当前菜单的路由（boss专用）
     * @type {string}
     * @memberof ReqBossCrmCompany
     */
    authCode?: string

    /**
     * 认证结束时间
     * @type {string}
     * @memberof ReqBossCrmCompany
     */
    authenticationEndTime?: string

    /**
     * 认证开始时间
     * @type {string}
     * @memberof ReqBossCrmCompany
     */
    authenticationStartTime?: string

    /**
     * 认证状态 1：已认证 2：未认证 3：全部
     * @type {number | string}
     * @memberof ReqBossCrmCompany
     */
    authenticationStatus?: number | string

    /**
     * 认证时间排序
     * @type {string}
     * @memberof ReqBossCrmCompany
     */
    authenticationTimeOrder?: string

    /**
     * 橙工采标签：0-未激活， 1-初级，2-橙级
     * @type {number | string}
     * @memberof ReqBossCrmCompany
     */
    chengGongCaiLable?: number | string

    /**
     * 企业名称
     * @type {string}
     * @memberof ReqBossCrmCompany
     */
    companyName?: string

    /**
     * 企业类型 1：体系内 2：体系外
     * @type {number | string}
     * @memberof ReqBossCrmCompany
     */
    companyType?: number | string

    /**
     * 创建时间排序
     * @type {string}
     * @memberof ReqBossCrmCompany
     */
    createTimeOrder?: string

    /**
     * 客户经理
     * @type {string}
     * @memberof ReqBossCrmCompany
     */
    customerManager?: string

    /**
     * 客户分类：1黑名单 2白名单 3待审核
     * @type {number | string}
     * @memberof ReqBossCrmCompany
     */
    customerType?: number | string

    /**
     * 客户分类排序
     * @type {string}
     * @memberof ReqBossCrmCompany
     */
    customerTypeOrder?: string

    /**
     * EHR部门主键
     * @type {string}
     * @memberof ReqBossCrmCompany
     */
    deptDoc?: string

    /**
     * 当前登录人的岗位（boss专用）
     * @type {string}
     * @memberof ReqBossCrmCompany
     */
    jobNumber?: string

    /**
     * 1.一般会员
2.认证会员
3.评级会员
4.签约会员
5.交易会员
     * @type {number | string}
     * @memberof ReqBossCrmCompany
     */
    memberTag?: number | string

    /**
     *
     * @type {number | string}
     * @memberof ReqBossCrmCompany
     */
    pageNumber?: number | string

    /**
     *
     * @type {number | string}
     * @memberof ReqBossCrmCompany
     */
    pageSize?: number | string

    /**
     * 排序规则
     * @type {Sort}
     * @memberof ReqBossCrmCompany
     */
    sort?: Sort

    /**
     * 分部编码
     * @type {string}
     * @memberof ReqBossCrmCompany
     */
    subsectionCode?: string

    /**
     * 管理员账号
     * @type {string}
     * @memberof ReqBossCrmCompany
     */
    userAccount?: string

    /**
     * 管理员姓名
     * @type {string}
     * @memberof ReqBossCrmCompany
     */
    userName?: string

}

/**
*
* @export
* @interface ReqBossProjectRefund
*/
export interface ReqBossProjectRefund {

    /**
     * 合同附件
     * @type {Array<string>}
     * @memberof ReqBossProjectRefund
     */
    contractAttachments?: Array<string>

    /**
     * 合同号
     * @type {string}
     * @memberof ReqBossProjectRefund
     */
    contractNo?: string

    /**
     * 是否已回款,1=已回款 0=未回款
     * @type {number | string}
     * @memberof ReqBossProjectRefund
     */
    hasRefunded?: number | string

    /**
     * 操作人名称
     * @type {string}
     * @memberof ReqBossProjectRefund
     */
    operatorName?: string

    /**
     * 操作人手机号
     * @type {string}
     * @memberof ReqBossProjectRefund
     */
    operatorPhone?: string

    /**
     * 项目id
     * @type {number | string}
     * @memberof ReqBossProjectRefund
     */
    projectId?: number | string

    /**
     * 回款金额
     * @type {number | string}
     * @memberof ReqBossProjectRefund
     */
    refundAmount?: number | string

    /**
     * 回款支付方式
     * @type {number | string}
     * @memberof ReqBossProjectRefund
     */
    refundPayType?: number | string

    /**
     * 支付凭证
     * @type {Array<string>}
     * @memberof ReqBossProjectRefund
     */
    refundPics?: Array<string>

}

/**
*
* @export
* @interface ReqBusinessLicense
*/
export interface ReqBusinessLicense {

    /**
     *
     * @type {string}
     * @memberof ReqBusinessLicense
     */
    image?: string

}

/**
*
* @export
* @interface ReqChenggongcaiOperation
*/
export interface ReqChenggongcaiOperation {

    /**
     * 公司id
     * @type {number | string}
     * @memberof ReqChenggongcaiOperation
     */
    companyId?: number | string

    /**
     * 创建人
     * @type {string}
     * @memberof ReqChenggongcaiOperation
     */
    createBy?: string

    /**
     * 创建人手机号
     * @type {string}
     * @memberof ReqChenggongcaiOperation
     */
    createByMobile?: string

    /**
     * 操作模式 1-初级，2-橙级
     * @type {number | string}
     * @memberof ReqChenggongcaiOperation
     */
    operateFlag?: number | string

    /**
     * 推荐客户经理Id
     * @type {string}
     * @memberof ReqChenggongcaiOperation
     */
    recommendCustomerId?: string

    /**
     * userId
     * @type {number | string}
     * @memberof ReqChenggongcaiOperation
     */
    userId?: number | string

}

/**
*
* @export
* @interface ReqClueAdd
*/
export interface ReqClueAdd {

    /**
     * 详细地址
     * @type {string}
     * @memberof ReqClueAdd
     */
    address?: string

    /**
     * 中标信息
     * @type {string}
     * @memberof ReqClueAdd
     */
    bidInfo?: string

    /**
     * 市id
     * @type {string}
     * @memberof ReqClueAdd
     */
    cityId?: string

    /**
     * 市名称
     * @type {string}
     * @memberof ReqClueAdd
     */
    cityName?: string

    /**
     * 企业名称
     * @type {string}
     * @memberof ReqClueAdd
     */
    companyName?: string

    /**
     * 已合作甲方
     * @type {string}
     * @memberof ReqClueAdd
     */
    cooperatedFirstParty?: string

    /**
     * 区id
     * @type {string}
     * @memberof ReqClueAdd
     */
    countryId?: string

    /**
     * 区名称
     * @type {string}
     * @memberof ReqClueAdd
     */
    countryName?: string

    /**
     * 创建者名称
     * @type {string}
     * @memberof ReqClueAdd
     */
    createBy?: string

    /**
     * 创建者手机号
     * @type {string}
     * @memberof ReqClueAdd
     */
    createPhone?: string

    /**
     * 创建者企业微信id（boss创建为空）
     * @type {string}
     * @memberof ReqClueAdd
     */
    customerCorpUserId?: string

    /**
     * 客户经理所属分部
     * @type {string}
     * @memberof ReqClueAdd
     */
    customerDeptName?: string

    /**
     * 客户经理手机号
     * @type {string}
     * @memberof ReqClueAdd
     */
    customerMobile?: string

    /**
     * 客户经理名称
     * @type {string}
     * @memberof ReqClueAdd
     */
    customerName?: string

    /**
     * 主营品牌
     * @type {string}
     * @memberof ReqClueAdd
     */
    deviceBrand?: string

    /**
     * 主营品类 1：空调 2：采暖 3：新风 4：净水 5：智能化 6：辅材 7：电梯 8：其他
     * @type {string}
     * @memberof ReqClueAdd
     */
    deviceCategory?: string

    /**
     * 厂商信息
     * @type {string}
     * @memberof ReqClueAdd
     */
    manufacturer?: string

    /**
     * 婚姻状态 1：未婚 2：已婚 3：离异
     * @type {number | string}
     * @memberof ReqClueAdd
     */
    maritalStatus?: number | string

    /**
     * 老客户信息
     * @type {string}
     * @memberof ReqClueAdd
     */
    oldCompanyName?: string

    /**
     * 来源 1：好橙工 2：享钱 3：单分享 4：crm 5：第三方渠道
     * @type {number | string}
     * @memberof ReqClueAdd
     */
    origin?: number | string

    /**
     * 合作伙伴
     * @type {string}
     * @memberof ReqClueAdd
     */
    partner?: string

    /**
     * 省id
     * @type {string}
     * @memberof ReqClueAdd
     */
    provinceId?: string

    /**
     * 省名称
     * @type {string}
     * @memberof ReqClueAdd
     */
    provinceName?: string

    /**
     * 客户座机号
     * @type {string}
     * @memberof ReqClueAdd
     */
    telephone?: string

    /**
     * 客户手机号
     * @type {string}
     * @memberof ReqClueAdd
     */
    userMobile?: string

    /**
     * 客户姓名
     * @type {string}
     * @memberof ReqClueAdd
     */
    userName?: string

    /**
     * 客户来源 1：销售自拓 2：会销活动 3：厂商介绍 4:老客户转介绍 5:总部分配 6: 客户继承 7：其他
     * @type {number | string}
     * @memberof ReqClueAdd
     */
    userSource?: number | string

    /**
     * 常做项目类型 1:居住建筑 2:市政建筑 3:企事业建筑 4:商业娱乐建筑 5:生产性建筑 6:其他
     * @type {string}
     * @memberof ReqClueAdd
     */
    usualProjectType?: string

    /**
     * 常用区域品牌名称
     * @type {string}
     * @memberof ReqClueAdd
     */
    usualRegionBrand?: string

    /**
     * 从业年限 1:3年以下 2: 3-5年 3: 5-8年 4: 8-10年 5：10-15年 6:15-20年 7：20年以上
     * @type {number | string}
     * @memberof ReqClueAdd
     */
    workingYears?: number | string

}

/**
*
* @export
* @interface ReqClueUpdate
*/
export interface ReqClueUpdate {

    /**
     * 详细地址
     * @type {string}
     * @memberof ReqClueUpdate
     */
    address?: string

    /**
     * 中标信息
     * @type {string}
     * @memberof ReqClueUpdate
     */
    bidInfo?: string

    /**
     * 市id
     * @type {string}
     * @memberof ReqClueUpdate
     */
    cityId?: string

    /**
     * 市名称
     * @type {string}
     * @memberof ReqClueUpdate
     */
    cityName?: string

    /**
     * 企业名称
     * @type {string}
     * @memberof ReqClueUpdate
     */
    companyName?: string

    /**
     * 已合作甲方
     * @type {string}
     * @memberof ReqClueUpdate
     */
    cooperatedFirstParty?: string

    /**
     * 区id
     * @type {string}
     * @memberof ReqClueUpdate
     */
    countryId?: string

    /**
     * 区名称
     * @type {string}
     * @memberof ReqClueUpdate
     */
    countryName?: string

    /**
     * 客户经理所属分部
     * @type {string}
     * @memberof ReqClueUpdate
     */
    customerDeptName?: string

    /**
     * 客户经理手机号
     * @type {string}
     * @memberof ReqClueUpdate
     */
    customerMobile?: string

    /**
     * 客户经理名称
     * @type {string}
     * @memberof ReqClueUpdate
     */
    customerName?: string

    /**
     * 主营品牌
     * @type {string}
     * @memberof ReqClueUpdate
     */
    deviceBrand?: string

    /**
     * 主营品类 1：空调 2：采暖 3：新风 4：净水 5：智能化 6：辅材 7：电梯 8：其他
     * @type {string}
     * @memberof ReqClueUpdate
     */
    deviceCategory?: string

    /**
     * 主键id
     * @type {number | string}
     * @memberof ReqClueUpdate
     */
    id?: number | string

    /**
     * 厂商信息
     * @type {string}
     * @memberof ReqClueUpdate
     */
    manufacturer?: string

    /**
     * 婚姻状态 1：未婚 2：已婚 3：离异
     * @type {number | string}
     * @memberof ReqClueUpdate
     */
    maritalStatus?: number | string

    /**
     * 老客户信息
     * @type {string}
     * @memberof ReqClueUpdate
     */
    oldCompanyName?: string

    /**
     * 来源 1：好橙工 2：享钱 3：单分享 4：crm 5：第三方渠道
     * @type {number | string}
     * @memberof ReqClueUpdate
     */
    origin?: number | string

    /**
     * 合作伙伴
     * @type {string}
     * @memberof ReqClueUpdate
     */
    partner?: string

    /**
     * 省id
     * @type {string}
     * @memberof ReqClueUpdate
     */
    provinceId?: string

    /**
     * 省名称
     * @type {string}
     * @memberof ReqClueUpdate
     */
    provinceName?: string

    /**
     * 客户座机号
     * @type {string}
     * @memberof ReqClueUpdate
     */
    telephone?: string

    /**
     * 更新人
     * @type {string}
     * @memberof ReqClueUpdate
     */
    updateBy?: string

    /**
     * 客户手机号
     * @type {string}
     * @memberof ReqClueUpdate
     */
    userMobile?: string

    /**
     * 客户姓名
     * @type {string}
     * @memberof ReqClueUpdate
     */
    userName?: string

    /**
     * 客户来源 1：销售自拓 2：会销活动 3：厂商介绍 4:老客户转介绍 5:总部分配 6: 客户继承 7：其他
     * @type {number | string}
     * @memberof ReqClueUpdate
     */
    userSource?: number | string

    /**
     * 常做项目类型 1:居住建筑 2:市政建筑 3:企事业建筑 4:商业娱乐建筑 5:生产性建筑 6:其他
     * @type {string}
     * @memberof ReqClueUpdate
     */
    usualProjectType?: string

    /**
     * 常用区域品牌名称
     * @type {string}
     * @memberof ReqClueUpdate
     */
    usualRegionBrand?: string

    /**
     * 从业年限 1:3年以下 2: 3-5年 3: 5-8年 4: 8-10年 5：10-15年 6:15-20年 7：20年以上
     * @type {number | string}
     * @memberof ReqClueUpdate
     */
    workingYears?: number | string

}

/**
*
* @export
* @interface ReqCompanyCreditDetail
*/
export interface ReqCompanyCreditDetail {

    /**
     * 附件
     * @type {string}
     * @memberof ReqCompanyCreditDetail
     */
    attachments?: string

    /**
     * 公司id
     * @type {number | string}
     * @memberof ReqCompanyCreditDetail
     */
    companyId?: number | string

    /**
     * 公司名称
     * @type {string}
     * @memberof ReqCompanyCreditDetail
     */
    companyName?: string

    /**
     * 信用等级
     * @type {string}
     * @memberof ReqCompanyCreditDetail
     */
    creditLevel?: string

    /**
     * 资料状态 1：待提交 2：已提交 3：已通过 4：已打回
     * @type {number | string}
     * @memberof ReqCompanyCreditDetail
     */
    documentStatus?: number | string

    /**
     * 信用结束日期
     * @type {string}
     * @memberof ReqCompanyCreditDetail
     */
    endTime?: string

    /**
     * 主键id
     * @type {number | string}
     * @memberof ReqCompanyCreditDetail
     */
    id?: number | string

    /**
     * 采购额度
     * @type {number | string}
     * @memberof ReqCompanyCreditDetail
     */
    purchaseQuota?: number | string

    /**
     * 说明
     * @type {string}
     * @memberof ReqCompanyCreditDetail
     */
    remark?: string

    /**
     * 服务费
     * @type {number | string}
     * @memberof ReqCompanyCreditDetail
     */
    serviceFee?: number | string

    /**
     * 信用开始日期
     * @type {string}
     * @memberof ReqCompanyCreditDetail
     */
    startTime?: string

}

/**
*
* @export
* @interface ReqCompanyDocumentUpdate
*/
export interface ReqCompanyDocumentUpdate {

    /**
     * 已提交公司id列表
     * @type {Array<number | string>}
     * @memberof ReqCompanyDocumentUpdate
     */
    companyIds?: Array<number | string>

    /**
     * 新模板id
     * @type {number | string}
     * @memberof ReqCompanyDocumentUpdate
     */
    newTemplateId?: number | string

    /**
     * 老模板id
     * @type {number | string}
     * @memberof ReqCompanyDocumentUpdate
     */
    templateId?: number | string

    /**
     * 修改人
     * @type {string}
     * @memberof ReqCompanyDocumentUpdate
     */
    updateBy?: string

}

/**
*
* @export
* @interface ReqCompanyFourElements
*/
export interface ReqCompanyFourElements {

    /**
     * 认证人
     * @type {string}
     * @memberof ReqCompanyFourElements
     */
    authenticationBy: string

    /**
     * 认证人工号
     * @type {string}
     * @memberof ReqCompanyFourElements
     */
    authenticationCode: string

    /**
     * 认证人手机号
     * @type {string}
     * @memberof ReqCompanyFourElements
     */
    authenticationPhone: string

    /**
     * 企业名称
     * @type {string}
     * @memberof ReqCompanyFourElements
     */
    companyName: string

    /**
     * 法人身份证号
     * @type {string}
     * @memberof ReqCompanyFourElements
     */
    legalRepIdNo: string

    /**
     * 法人名称
     * @type {string}
     * @memberof ReqCompanyFourElements
     */
    legalRepName: string

    /**
     * 统一社会信用代码证
     * @type {string}
     * @memberof ReqCompanyFourElements
     */
    unifiedSocialCreditCode: string

}

/**
*
* @export
* @interface ReqCompanySign
*/
export interface ReqCompanySign {

    /**
     * 分配员工id
     * @type {string}
     * @memberof ReqCompanySign
     */
    assignedUserId?: string

    /**
     * 签约申请id
     * @type {number | string}
     * @memberof ReqCompanySign
     */
    companyVipId?: number | string

    /**
     * 公司所属分部编码
     * @type {string}
     * @memberof ReqCompanySign
     */
    pkDeptDoc?: string

    /**
     * 说明
     * @type {string}
     * @memberof ReqCompanySign
     */
    remark?: string

    /**
     * 修改人
     * @type {string}
     * @memberof ReqCompanySign
     */
    updateBy?: string

}

/**
*
* @export
* @interface ReqCompanyUser
*/
export interface ReqCompanyUser {

    /**
     * 创建人用户id
     * @type {number | string}
     * @memberof ReqCompanyUser
     */
    adminUserId?: number | string

    /**
     * 公司编码
     * @type {string}
     * @memberof ReqCompanyUser
     */
    companyCode: string

    /**
     * 创建人账号
     * @type {string}
     * @memberof ReqCompanyUser
     */
    createBy: string

    /**
     * 创建人名称
     * @type {string}
     * @memberof ReqCompanyUser
     */
    createName?: string

    /**
     * 昵称
     * @type {string}
     * @memberof ReqCompanyUser
     */
    nickName: string

    /**
     * 角色Code集合
     * @type {Array<number | string>}
     * @memberof ReqCompanyUser
     */
    roleCodes: Array<number | string>

    /**
     * 用户id
     * @type {number | string}
     * @memberof ReqCompanyUser
     */
    userId: number | string

}

/**
*
* @export
* @interface ReqCompanyUserTransferAdmin
*/
export interface ReqCompanyUserTransferAdmin {

    /**
     * 公司编码
     * @type {string}
     * @memberof ReqCompanyUserTransferAdmin
     */
    companyCode: string

    /**
     * 手机号
     * @type {string}
     * @memberof ReqCompanyUserTransferAdmin
     */
    phone: string

    /**
     * 更新人账号
     * @type {string}
     * @memberof ReqCompanyUserTransferAdmin
     */
    updateBy: string

    /**
     * 当前用户id
     * @type {number | string}
     * @memberof ReqCompanyUserTransferAdmin
     */
    updateId: number | string

    /**
     * 更新人名称
     * @type {string}
     * @memberof ReqCompanyUserTransferAdmin
     */
    updateName?: string

    /**
     * 被转让用户id
     * @type {number | string}
     * @memberof ReqCompanyUserTransferAdmin
     */
    userId: number | string

    /**
     * 验证码
     * @type {string}
     * @memberof ReqCompanyUserTransferAdmin
     */
    verificationCode: string

}

/**
*
* @export
* @interface ReqCompanyUserUpdate
*/
export interface ReqCompanyUserUpdate {

    /**
     * CRM企业与用户关联id
     * @type {number | string}
     * @memberof ReqCompanyUserUpdate
     */
    companyUserId: number | string

    /**
     * 昵称
     * @type {string}
     * @memberof ReqCompanyUserUpdate
     */
    nickName?: string

    /**
     * 角色
     * @type {Array<number | string>}
     * @memberof ReqCompanyUserUpdate
     */
    roleCodes?: Array<number | string>

    /**
     * 更新人账号
     * @type {string}
     * @memberof ReqCompanyUserUpdate
     */
    updateBy: string

    /**
     * 更新人名称
     * @type {string}
     * @memberof ReqCompanyUserUpdate
     */
    updateName: string

    /**
     * 当前用户userId
     * @type {number | string}
     * @memberof ReqCompanyUserUpdate
     */
    userId?: number | string

}

/**
*
* @export
* @interface ReqCompanyVip
*/
export interface ReqCompanyVip {

    /**
     * 经销商预付款比例
     * @type {number | string}
     * @memberof ReqCompanyVip
     */
    advancePaymentProportion?: number | string

    /**
     * 公司id
     * @type {number | string}
     * @memberof ReqCompanyVip
     */
    companyId?: number | string

    /**
     * VIP战略合作协议id
     * @type {number | string}
     * @memberof ReqCompanyVip
     */
    contractId?: number | string

    /**
     * 创建人
     * @type {string}
     * @memberof ReqCompanyVip
     */
    createBy?: string

    /**
     * 创建人手机号
     * @type {string}
     * @memberof ReqCompanyVip
     */
    createByMobile?: string

    /**
     * id
     * @type {number | string}
     * @memberof ReqCompanyVip
     */
    id?: number | string

    /**
     * 次年服务费折扣
     * @type {number | string}
     * @memberof ReqCompanyVip
     */
    serviceFeeDiscount?: number | string

    /**
     * 签约时间
     * @type {string}
     * @memberof ReqCompanyVip
     */
    signTime?: string

    /**
     * 签约年份
     * @type {string}
     * @memberof ReqCompanyVip
     */
    signYear?: string

    /**
     * 修改人
     * @type {string}
     * @memberof ReqCompanyVip
     */
    updateBy?: string

    /**
     * 更新人手机号
     * @type {string}
     * @memberof ReqCompanyVip
     */
    updateByMobile?: string

    /**
     * 信用评级
     * @type {string}
     * @memberof ReqCompanyVip
     */
    vipCreditLevel?: string

    /**
     * 单项目单笔最高金额 (万元)
     * @type {number | string}
     * @memberof ReqCompanyVip
     */
    vipObjectMaxAmount?: number | string

    /**
     * 可代采购额度 (万元)
     * @type {number | string}
     * @memberof ReqCompanyVip
     */
    vipPurchaseQuota?: number | string

    /**
     * 服务费
     * @type {number | string}
     * @memberof ReqCompanyVip
     */
    vipServiceFee?: number | string

    /**
     * VIP目标
     * @type {number | string}
     * @memberof ReqCompanyVip
     */
    vipTarget?: number | string

}

/**
*
* @export
* @interface ReqCompanyVipApply
*/
export interface ReqCompanyVipApply {

    /**
     * 公司id
     * @type {number | string}
     * @memberof ReqCompanyVipApply
     */
    companyId?: number | string

    /**
     * 申请人
     * @type {string}
     * @memberof ReqCompanyVipApply
     */
    createBy?: string

}

/**
*
* @export
* @interface ReqConfirmPunch
*/
export interface ReqConfirmPunch {

    /**
     * 创建人
     * @type {string}
     * @memberof ReqConfirmPunch
     */
    createBy?: string

    /**
     * 工程ID
     * @type {number | string}
     * @memberof ReqConfirmPunch
     */
    projectId?: number | string

    /**
     * 打卡图片地址
     * @type {string}
     * @memberof ReqConfirmPunch
     */
    punchImageUrl?: string

}

/**
*
* @export
* @interface ReqCorpWeixinMessageSend
*/
export interface ReqCorpWeixinMessageSend {

    /**
     * 推送消息的内容
     * @type {string}
     * @memberof ReqCorpWeixinMessageSend
     */
    content?: string

    /**
     * 推送消息的人员
     * @type {Array<string>}
     * @memberof ReqCorpWeixinMessageSend
     */
    userIds?: Array<string>

}

/**
*
* @export
* @interface ReqCreditApproveRecord
*/
export interface ReqCreditApproveRecord {

    /**
     * 公司标识
     * @type {number | string}
     * @memberof ReqCreditApproveRecord
     */
    companyId?: number | string

    /**
     * 创建人
     * @type {string}
     * @memberof ReqCreditApproveRecord
     */
    createBy?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof ReqCreditApproveRecord
     */
    createTime?: string

    /**
     * 授信资料打回记录标识
     * @type {number | string}
     * @memberof ReqCreditApproveRecord
     */
    creditApproveRecordId?: number | string

    /**
     * 备注
     * @type {string}
     * @memberof ReqCreditApproveRecord
     */
    remark?: string

    /**
     * 模板ids
     * @type {string}
     * @memberof ReqCreditApproveRecord
     */
    templateIds?: string

}

/**
*
* @export
* @interface ReqCreditDocument
*/
export interface ReqCreditDocument {

    /**
     * 公司标识
     * @type {number | string}
     * @memberof ReqCreditDocument
     */
    companyId: number | string

    /**
     * 授信资料集合
     * @type {Array<CreditDocument>}
     * @memberof ReqCreditDocument
     */
    creditDocumentList?: Array<CreditDocument>

    /**
     * 模板id【单个模板保存必填】
     * @type {number | string}
     * @memberof ReqCreditDocument
     */
    templateId?: number | string

}

/**
*
* @export
* @interface ReqCreditDocumentSubmit
*/
export interface ReqCreditDocumentSubmit {

    /**
     * 公司id
     * @type {number | string}
     * @memberof ReqCreditDocumentSubmit
     */
    companyId: number | string

    /**
     * 信用评级
     * @type {ReqCompanyCreditDetail}
     * @memberof ReqCreditDocumentSubmit
     */
    reqCompanyCreditDetail?: ReqCompanyCreditDetail

    /**
     * 提交状态 1：提交 2：审核通过 3：审核通过并提交评级
     * @type {number | string}
     * @memberof ReqCreditDocumentSubmit
     */
    submitStatus: number | string

}

/**
* 企业
* @export
* @interface ReqCrmCompany
*/
export interface ReqCrmCompany {

    /**
     * 代理级别 1：一级代理商 2：经销商 3：其他
     * @type {number | string}
     * @memberof ReqCrmCompany
     */
    agentLevel?: number | string

    /**
     * 业务类型及比例
     * @type {string}
     * @memberof ReqCrmCompany
     */
    businessType?: string

    /**
     * 城市id
     * @type {string}
     * @memberof ReqCrmCompany
     */
    cityId?: string

    /**
     * 市名称
     * @type {string}
     * @memberof ReqCrmCompany
     */
    cityName?: string

    /**
     * 企业编码
     * @type {string}
     * @memberof ReqCrmCompany
     */
    companyCode?: string

    /**
     * 企业简称
     * @type {string}
     * @memberof ReqCrmCompany
     */
    companyName?: string

    /**
     * 企业类型 1：体系内 2：体系外
     * @type {number | string}
     * @memberof ReqCrmCompany
     */
    companyType?: number | string

    /**
     * 区id
     * @type {string}
     * @memberof ReqCrmCompany
     */
    countryId?: string

    /**
     * 区/县名称
     * @type {string}
     * @memberof ReqCrmCompany
     */
    countryName?: string

    /**
     * 创建人
     * @type {string}
     * @memberof ReqCrmCompany
     */
    createBy?: string

    /**
     * 客户经理id
     * @type {string}
     * @memberof ReqCrmCompany
     */
    customerManagerId?: string

    /**
     * 发展在线公司编码
     * @type {string}
     * @memberof ReqCrmCompany
     */
    developOnlineCompanyCode?: string

    /**
     * 发展在线公司名称
     * @type {string}
     * @memberof ReqCrmCompany
     */
    developOnlineCompanyName?: string

    /**
     * 主营品牌
     * @type {string}
     * @memberof ReqCrmCompany
     */
    deviceBrand?: string

    /**
     * 主营品类 1：空调 2：采暖 3：新风 4：净水 5：智能化 6：辅材 7：电梯 8：其他 9:电器 10:热水器
     * @type {number | string}
     * @memberof ReqCrmCompany
     */
    deviceCategory?: number | string

    /**
     * 是否关联平台公司
     * @type {boolean}
     * @memberof ReqCrmCompany
     */
    isRelated?: boolean

    /**
     * 主辅材品牌
     * @type {string}
     * @memberof ReqCrmCompany
     */
    materialsBrand?: string

    /**
     * 主辅材渠道 1：厂商直采 2：一节囤货商采购 3：经销商采购
     * @type {string}
     * @memberof ReqCrmCompany
     */
    materialsChannel?: string

    /**
     * 省id
     * @type {string}
     * @memberof ReqCrmCompany
     */
    provinceId?: string

    /**
     * 省名称
     * @type {string}
     * @memberof ReqCrmCompany
     */
    provinceName?: string

    /**
     * 服务能力 1：有 2：无
     * @type {number | string}
     * @memberof ReqCrmCompany
     */
    serviceCapability?: number | string

    /**
     * 服务能力明细
     * @type {string}
     * @memberof ReqCrmCompany
     */
    serviceCapabilityDetail?: string

    /**
     * 企业来源 1 B2B 2 CRM
     * @type {number | string}
     * @memberof ReqCrmCompany
     */
    source?: number | string

    /**
     * 近3年的年度工程规模 1：1000万以内 2：1001-3000万 3：3001-5000万 4:5001-1亿 5：1亿-2亿 6:2亿以上
     * @type {number | string}
     * @memberof ReqCrmCompany
     */
    threeYearProjectScale?: number | string

    /**
     * 天眼查公司id
     * @type {number | string}
     * @memberof ReqCrmCompany
     */
    tyCompanyId?: number | string

    /**
     * 项目类别 1：地产项目 2：政府共建项目 3：市政项目 3：办公楼 4：厂房 5：其他
     * @type {number | string}
     * @memberof ReqCrmCompany
     */
    type?: number | string

    /**
     * 维护人
     * @type {string}
     * @memberof ReqCrmCompany
     */
    updateBy?: string

    /**
     * 维护人手机号
     * @type {string}
     * @memberof ReqCrmCompany
     */
    updatePhone?: string

    /**
     * 会员id
     * @type {number | string}
     * @memberof ReqCrmCompany
     */
    userId?: number | string

}

/**
*
* @export
* @interface ReqCrmCompanyContact
*/
export interface ReqCrmCompanyContact {

    /**
     * 企业id
     * @type {number | string}
     * @memberof ReqCrmCompanyContact
     */
    companyId?: number | string

    /**
     * 联系地址
     * @type {string}
     * @memberof ReqCrmCompanyContact
     */
    contactAddress?: string

    /**
     * 电子邮箱
     * @type {string}
     * @memberof ReqCrmCompanyContact
     */
    email?: string

}

/**
*
* @export
* @interface ReqCrmCompanyUpdate
*/
export interface ReqCrmCompanyUpdate {

    /**
     * 代理级别 1：一级代理商 2：经销商 3：其他
     * @type {number | string}
     * @memberof ReqCrmCompanyUpdate
     */
    agentLevel?: number | string

    /**
     * 业务类型及比例
     * @type {string}
     * @memberof ReqCrmCompanyUpdate
     */
    businessType?: string

    /**
     * 城市id
     * @type {string}
     * @memberof ReqCrmCompanyUpdate
     */
    cityId?: string

    /**
     * 市名称
     * @type {string}
     * @memberof ReqCrmCompanyUpdate
     */
    cityName?: string

    /**
     * 企业编码
     * @type {string}
     * @memberof ReqCrmCompanyUpdate
     */
    companyCode?: string

    /**
     * 企业类型 1：体系内 2：体系外
     * @type {number | string}
     * @memberof ReqCrmCompanyUpdate
     */
    companyType?: number | string

    /**
     * 区id
     * @type {string}
     * @memberof ReqCrmCompanyUpdate
     */
    countryId?: string

    /**
     * 区/县名称
     * @type {string}
     * @memberof ReqCrmCompanyUpdate
     */
    countryName?: string

    /**
     * 发展在线公司编码
     * @type {string}
     * @memberof ReqCrmCompanyUpdate
     */
    developOnlineCompanyCode?: string

    /**
     * 发展在线公司名称
     * @type {string}
     * @memberof ReqCrmCompanyUpdate
     */
    developOnlineCompanyName?: string

    /**
     * 主营品牌
     * @type {string}
     * @memberof ReqCrmCompanyUpdate
     */
    deviceBrand?: string

    /**
     * 主营品类 1：空调 2：采暖 3：新风 4：净水 5：智能化 6：辅材 7：电梯 8：其他 9:电器 10:热水器
     * @type {number | string}
     * @memberof ReqCrmCompanyUpdate
     */
    deviceCategory?: number | string

    /**
     * 是否关联平台公司
     * @type {boolean}
     * @memberof ReqCrmCompanyUpdate
     */
    isRelated?: boolean

    /**
     * 主辅材品牌
     * @type {string}
     * @memberof ReqCrmCompanyUpdate
     */
    materialsBrand?: string

    /**
     * 主辅材渠道 1：厂商直采 2：一节囤货商采购 3：经销商采购
     * @type {string}
     * @memberof ReqCrmCompanyUpdate
     */
    materialsChannel?: string

    /**
     * EHR部门主键
     * @type {string}
     * @memberof ReqCrmCompanyUpdate
     */
    pkDeptDoc?: string

    /**
     * 省id
     * @type {string}
     * @memberof ReqCrmCompanyUpdate
     */
    provinceId?: string

    /**
     * 省名称
     * @type {string}
     * @memberof ReqCrmCompanyUpdate
     */
    provinceName?: string

    /**
     * 关联公司编码
     * @type {string}
     * @memberof ReqCrmCompanyUpdate
     */
    relationCompanyCode?: string

    /**
     * 关联公司名称
     * @type {string}
     * @memberof ReqCrmCompanyUpdate
     */
    relationCompanyName?: string

    /**
     * 服务能力 1：有 2：无
     * @type {number | string}
     * @memberof ReqCrmCompanyUpdate
     */
    serviceCapability?: number | string

    /**
     * 服务能力
     * @type {string}
     * @memberof ReqCrmCompanyUpdate
     */
    serviceCapabilityDetail?: string

    /**
     * 分部编码
     * @type {string}
     * @memberof ReqCrmCompanyUpdate
     */
    subsectionCode?: string

    /**
     * 分部名称
     * @type {string}
     * @memberof ReqCrmCompanyUpdate
     */
    subsectionName?: string

    /**
     * 近3年的年度工程规模 1：1000万以内 2：1001-3000万 3：3001-5000万 4:5001-1亿 5：1亿-2亿 6:2亿以上
     * @type {number | string}
     * @memberof ReqCrmCompanyUpdate
     */
    threeYearProjectScale?: number | string

    /**
     * 项目类别 1：地产项目 2：政府共建项目 3：市政项目 3：办公楼 4：厂房 5：其他
     * @type {number | string}
     * @memberof ReqCrmCompanyUpdate
     */
    type?: number | string

    /**
     * 维护人姓名
     * @type {string}
     * @memberof ReqCrmCompanyUpdate
     */
    updateBy?: string

    /**
     * 维护人手机号
     * @type {string}
     * @memberof ReqCrmCompanyUpdate
     */
    updatePhone?: string

}

/**
*
* @export
* @interface ReqCrmMember
*/
export interface ReqCrmMember {

    /**
     * 会员微信头像
     * @type {string}
     * @memberof ReqCrmMember
     */
    avatarUrl?: string

    /**
     * 企业微信用户id
     * @type {string}
     * @memberof ReqCrmMember
     */
    corpUserId?: string

    /**
     * 创建人
     * @type {string}
     * @memberof ReqCrmMember
     */
    createBy?: string

    /**
     * 会员手机号
     * @type {string}
     * @memberof ReqCrmMember
     */
    mobile?: string

    /**
     * 会员名称
     * @type {string}
     * @memberof ReqCrmMember
     */
    name?: string

    /**
     * 微信unionId
     * @type {string}
     * @memberof ReqCrmMember
     */
    unionId?: string

    /**
     * 企业微信客户经理的userId
     * @type {string}
     * @memberof ReqCrmMember
     */
    userId?: string

}

/**
*
* @export
* @interface ReqCrmUserName
*/
export interface ReqCrmUserName {

    /**
     * 企业微信id
     * @type {string}
     * @memberof ReqCrmUserName
     */
    corpUserId?: string

    /**
     * 客户经理的用户id
     * @type {string}
     * @memberof ReqCrmUserName
     */
    customerManagerId?: string

    /**
     * 头像地址
     * @type {string}
     * @memberof ReqCrmUserName
     */
    name?: string

    /**
     * userId
     * @type {number | string}
     * @memberof ReqCrmUserName
     */
    userId?: number | string

}

/**
*
* @export
* @interface ReqCrmWhiteListRecord
*/
export interface ReqCrmWhiteListRecord {

    /**
     * 企业编码
     * @type {string}
     * @memberof ReqCrmWhiteListRecord
     */
    companyCode?: string

    /**
     * 企业名称
     * @type {string}
     * @memberof ReqCrmWhiteListRecord
     */
    companyName?: string

    /**
     * 客户分类 1:黑名单 2:白名单 3:待审核
     * @type {number | string}
     * @memberof ReqCrmWhiteListRecord
     */
    customerType?: number | string

    /**
     * 说明
     * @type {string}
     * @memberof ReqCrmWhiteListRecord
     */
    note?: string

    /**
     * 操作人姓名
     * @type {string}
     * @memberof ReqCrmWhiteListRecord
     */
    operator?: string

    /**
     * 操作人手机号
     * @type {string}
     * @memberof ReqCrmWhiteListRecord
     */
    operatorPhone?: string

}

/**
*
* @export
* @interface ReqCustomerReceivedBackLog
*/
export interface ReqCustomerReceivedBackLog {

    /**
     * 修改人
     * @type {string}
     * @memberof ReqCustomerReceivedBackLog
     */
    createBy?: string

    /**
     * 修改人手机号
     * @type {string}
     * @memberof ReqCustomerReceivedBackLog
     */
    createPhone?: string

    /**
     * 主键id
     * @type {number | string}
     * @memberof ReqCustomerReceivedBackLog
     */
    id?: number | string

    /**
     * 是否接受 0：否  1：是
     * @type {number | string}
     * @memberof ReqCustomerReceivedBackLog
     */
    received?: number | string

    /**
     * 拒绝原因
     * @type {string}
     * @memberof ReqCustomerReceivedBackLog
     */
    refuseReason?: string

}

/**
*
* @export
* @interface ReqIotAppletUser
*/
export interface ReqIotAppletUser {

    /**
     * 小程序头像
     * @type {string}
     * @memberof ReqIotAppletUser
     */
    avatarUrl?: string

    /**
     * 创建人手机号
     * @type {number | string}
     * @memberof ReqIotAppletUser
     */
    createBy?: number | string

    /**
     * 创建时间
     * @type {string}
     * @memberof ReqIotAppletUser
     */
    createTime?: string

    /**
     * 会员id
     * @type {number | string}
     * @memberof ReqIotAppletUser
     */
    id?: number | string

    /**
     * iot小程序openId
     * @type {string}
     * @memberof ReqIotAppletUser
     */
    iotOpenId?: string

    /**
     * 手机号
     * @type {string}
     * @memberof ReqIotAppletUser
     */
    mobile?: string

    /**
     * 微信名称
     * @type {string}
     * @memberof ReqIotAppletUser
     */
    name?: string

    /**
     * 小程序昵称
     * @type {string}
     * @memberof ReqIotAppletUser
     */
    nickName?: string

    /**
     * 密码
     * @type {string}
     * @memberof ReqIotAppletUser
     */
    password?: string

    /**
     * 来源 14：iot
     * @type {number | string}
     * @memberof ReqIotAppletUser
     */
    source?: number | string

    /**
     * 微信unionId
     * @type {string}
     * @memberof ReqIotAppletUser
     */
    unionId?: string

    /**
     * 会员用户名（手机号）
     * @type {string}
     * @memberof ReqIotAppletUser
     */
    username?: string

}

/**
* 项目级别&服务费设置
* @export
* @interface ReqLevelsServiceCharge
*/
export interface ReqLevelsServiceCharge {

    /**
     * 项目id
     * @type {number | string}
     * @memberof ReqLevelsServiceCharge
     */
    id?: number | string

    /**
     * 项目级别
     * @type {string}
     * @memberof ReqLevelsServiceCharge
     */
    levels?: string

    /**
     * 项目服务费
     * @type {number | string}
     * @memberof ReqLevelsServiceCharge
     */
    serviceCharge?: number | string

    /**
     * 修改人
     * @type {string}
     * @memberof ReqLevelsServiceCharge
     */
    updateBy?: string

}

/**
*
* @export
* @interface ReqPhoneVerificationCode
*/
export interface ReqPhoneVerificationCode {

    /**
     * 手机号
     * @type {string}
     * @memberof ReqPhoneVerificationCode
     */
    phone: string

    /**
     * 获取类型 1：登录获取验证码 2：更换手机号获取验证码 3：业务推荐官
     * @type {number | string}
     * @memberof ReqPhoneVerificationCode
     */
    type?: number | string

}

/**
* 工程项目信息表
* @export
* @interface ReqProject
*/
export interface ReqProject {

    /**
     * 银行承兑执行费率
     * @type {number | string}
     * @memberof ReqProject
     */
    acceptBankRate?: number | string

    /**
     * 验收款比例
     * @type {number | string}
     * @memberof ReqProject
     */
    acceptancePaymentProportion?: number | string

    /**
     * 项目地址
     * @type {string}
     * @memberof ReqProject
     */
    address?: string

    /**
     * 预付款比例
     * @type {number | string}
     * @memberof ReqProject
     */
    advancePaymentProportion?: number | string

    /**
     * 首付款比例
     * @type {number | string}
     * @memberof ReqProject
     */
    advancePaymentRate?: number | string

    /**
     * 附件地址
     * @type {string}
     * @memberof ReqProject
     */
    attachmentUrl?: string

    /**
     * 审计结算款比例
     * @type {number | string}
     * @memberof ReqProject
     */
    auditCalculationPaymentProportion?: number | string

    /**
     * 公司id
     * @type {number | string}
     * @memberof ReqProject
     */
    companyId?: number | string

    /**
     * 公司名称
     * @type {string}
     * @memberof ReqProject
     */
    companyName?: string

    /**
     * 合同金额
     * @type {number | string}
     * @memberof ReqProject
     */
    contractAmount?: number | string

    /**
     * 合作机会分析
     * @type {string}
     * @memberof ReqProject
     */
    cooperationAnalyse?: string

    /**
     * 创建人
     * @type {string}
     * @memberof ReqProject
     */
    createBy?: string

    /**
     * 创建人手机号
     * @type {string}
     * @memberof ReqProject
     */
    createByMobile?: string

    /**
     * 创建时间,格式为:yyyy-MM-dd HH:mm:ss
     * @type {string}
     * @memberof ReqProject
     */
    createTime?: string

    /**
     * 客户角色
     * @type {string}
     * @memberof ReqProject
     */
    customerRole?: string

    /**
     * 货到付款比例
     * @type {number | string}
     * @memberof ReqProject
     */
    deliveryPaymentProportion?: number | string

    /**
     * 所属分部名称
     * @type {string}
     * @memberof ReqProject
     */
    deptName?: string

    /**
     * 设备款总额
     * @type {number | string}
     * @memberof ReqProject
     */
    deviceAmount?: number | string

    /**
     * 设备品牌
     * @type {string}
     * @memberof ReqProject
     */
    deviceBrand?: string

    /**
     * 设备品类 1：空调 2：采暖 3：新风 4：净水 5：智能化 6：辅材 7：电梯 8：其他 9:电器 10:热水器
     * @type {number | string}
     * @memberof ReqProject
     */
    deviceCategory?: number | string

    /**
     * 预估签约时间
     * @type {string}
     * @memberof ReqProject
     */
    estimateSignTime?: string

    /**
     * 预估借款时间,格式为:yyyy-MM-dd
     * @type {string}
     * @memberof ReqProject
     */
    estimatedLoanTime?: string

    /**
     * 甲方名称
     * @type {string}
     * @memberof ReqProject
     */
    firstPartName?: string

    /**
     * 工程项目id
     * @type {number | string}
     * @memberof ReqProject
     */
    id?: number | string

    /**
     * 安装进度款比例
     * @type {number | string}
     * @memberof ReqProject
     */
    installProgressPaymentProportion?: number | string

    /**
     * 借款周期
     * @type {number | string}
     * @memberof ReqProject
     */
    loanMonth?: number | string

    /**
     * 回款方式 1：预付款 2：货到付款 3：安装进度款 4：验收 5：交付 6：审计结算 7：其他
     * @type {number | string}
     * @memberof ReqProject
     */
    loanPayType?: number | string

    /**
     * 最大采购金额
     * @type {number | string}
     * @memberof ReqProject
     */
    maxPurchaseAmount?: number | string

    /**
     * 其他客户角色
     * @type {string}
     * @memberof ReqProject
     */
    otherCustomerRole?: string

    /**
     * 承兑备注
     * @type {string}
     * @memberof ReqProject
     */
    payAcceptanceRemark?: string

    /**
     * 其他回款方式内容
     * @type {string}
     * @memberof ReqProject
     */
    payOtherText?: string

    /**
     * 回款比例
     * @type {number | string}
     * @memberof ReqProject
     */
    payProportion?: number | string

    /**
     * EHR部门主键
     * @type {string}
     * @memberof ReqProject
     */
    pkDeptDoc?: string

    /**
     * 预估借款金额
     * @type {number | string}
     * @memberof ReqProject
     */
    predictLoanAmount?: number | string

    /**
     * 项目进度 1：项目跟踪阶段 2：招投标 3：合同已签订 4：项目已开工
     * @type {number | string}
     * @memberof ReqProject
     */
    progress?: number | string

    /**
     * 工程名称
     * @type {string}
     * @memberof ReqProject
     */
    projectName?: string

    /**
     * 工程项目编号
     * @type {string}
     * @memberof ReqProject
     */
    projectNo?: string

    /**
     * 交付款比例
     * @type {number | string}
     * @memberof ReqProject
     */
    realPaymentProportion?: number | string

    /**
     * 剩余货款支付周期（月）
     * @type {number | string}
     * @memberof ReqProject
     */
    remainPaymentCycle?: number | string

    /**
     * 状态 1：待提交2：初审中 3：资料收集中 12：资料待审核 4：待立项  5：审核未通过 11：待终审 6：待签约 7：待放款 8：贷中 9：项目完成 10:信息待完善 13: 终审通过 14：终审未通过
     * @type {number | string}
     * @memberof ReqProject
     */
    status?: number | string

    /**
     * 提交时间,格式为:yyyy-MM-dd HH:mm:ss
     * @type {string}
     * @memberof ReqProject
     */
    submitTime?: string

    /**
     * 银行转账执行费率
     * @type {number | string}
     * @memberof ReqProject
     */
    transferBankRate?: number | string

    /**
     * 项目类别 1：地产项目 2：政府共建项目 3：市政项目 3：办公楼 4：厂房 5：其他
     * @type {number | string}
     * @memberof ReqProject
     */
    type?: number | string

    /**
     * 修改人
     * @type {string}
     * @memberof ReqProject
     */
    updateBy?: string

    /**
     * 修改人手机号
     * @type {string}
     * @memberof ReqProject
     */
    updateByMobile?: string

    /**
     * 上游接受的付款方式 1：现金 2：承兑 多选入参：1,2
     * @type {string}
     * @memberof ReqProject
     */
    upstreamPayType?: string

    /**
     * 上游供应商承诺兑现时间（月）
     * @type {number | string}
     * @memberof ReqProject
     */
    upstreamPromiseMonth?: number | string

    /**
     * 上游供应商名称
     * @type {string}
     * @memberof ReqProject
     */
    upstreamSupplierName?: string

    /**
     * 上游供应商类型 1：厂商 2：代理商 3：经销商
     * @type {number | string}
     * @memberof ReqProject
     */
    upstreamSupplierType?: number | string

}

/**
*
* @export
* @interface ReqProjectAudit
*/
export interface ReqProjectAudit {

    /**
     * 审核后状态 1：待提交2：初审中 3：资料收集中 12：资料待审核 4：待立项  5：审核未通过 11：待终审 6：待签约 7：待放款 8：贷中 9：项目完成 10:信息待完善 13: 终审通过 14：终审未通过
     * @type {number | string}
     * @memberof ReqProjectAudit
     */
    afterStatus?: number | string

    /**
     * 审核前状态 1：待提交2：初审中 3：资料收集中 12：资料待审核 4：待立项  5：审核未通过 11：待终审 6：待签约 7：待放款 8：贷中 9：项目完成 10:信息待完善 13: 终审通过 14：终审未通过
     * @type {number | string}
     * @memberof ReqProjectAudit
     */
    beforeStatus?: number | string

    /**
     * 创建人
     * @type {string}
     * @memberof ReqProjectAudit
     */
    createBy?: string

    /**
     * 审核人手机号
     * @type {string}
     * @memberof ReqProjectAudit
     */
    createByMobile?: string

    /**
     * 项目工程id
     * @type {number | string}
     * @memberof ReqProjectAudit
     */
    projectId?: number | string

    /**
     * 说明
     * @type {string}
     * @memberof ReqProjectAudit
     */
    remark?: string

    /**
     * 是否重置
     * @type {boolean}
     * @memberof ReqProjectAudit
     */
    reset?: boolean

    /**
     * 审核结果 0：不通过 1：通过 2：退回
     * @type {number | string}
     * @memberof ReqProjectAudit
     */
    result?: number | string

    /**
     * 审核时间,格式为:yyyy-MM-dd HH:mm:ss
     * @type {string}
     * @memberof ReqProjectAudit
     */
    submitTime?: string

}

/**
*
* @export
* @interface ReqProjectDocApprove
*/
export interface ReqProjectDocApprove {

    /**
     *
     * @type {string}
     * @memberof ReqProjectDocApprove
     */
    createBy?: string

    /**
     *
     * @type {string}
     * @memberof ReqProjectDocApprove
     */
    createMobile?: string

    /**
     *
     * @type {number | string}
     * @memberof ReqProjectDocApprove
     */
    productId?: number | string

    /**
     *
     * @type {string}
     * @memberof ReqProjectDocApprove
     */
    remark?: string

    /**
     *
     * @type {number | string}
     * @memberof ReqProjectDocApprove
     */
    status?: number | string

}

/**
*
* @export
* @interface ReqProjectDocRefuse
*/
export interface ReqProjectDocRefuse {

    /**
     *
     * @type {string}
     * @memberof ReqProjectDocRefuse
     */
    createBy?: string

    /**
     *
     * @type {string}
     * @memberof ReqProjectDocRefuse
     */
    createMobile?: string

    /**
     *
     * @type {number | string}
     * @memberof ReqProjectDocRefuse
     */
    productId?: number | string

    /**
     *
     * @type {string}
     * @memberof ReqProjectDocRefuse
     */
    remark?: string

}

/**
*
* @export
* @interface ReqProjectFinalAudit
*/
export interface ReqProjectFinalAudit {

    /**
     * 银行承兑执行费率
     * @type {number | string}
     * @memberof ReqProjectFinalAudit
     */
    acceptBankRate?: number | string

    /**
     * 首付款比例
     * @type {number | string}
     * @memberof ReqProjectFinalAudit
     */
    advancePaymentRate?: number | string

    /**
     * 创建人
     * @type {string}
     * @memberof ReqProjectFinalAudit
     */
    createBy?: string

    /**
     * 创建人手机号
     * @type {string}
     * @memberof ReqProjectFinalAudit
     */
    createPhone?: string

    /**
     * 工程项目id
     * @type {number | string}
     * @memberof ReqProjectFinalAudit
     */
    id?: number | string

    /**
     * 最大采购金额
     * @type {number | string}
     * @memberof ReqProjectFinalAudit
     */
    maxPurchaseAmount?: number | string

    /**
     * 剩余货款支付周期（月）
     * @type {number | string}
     * @memberof ReqProjectFinalAudit
     */
    remainPaymentCycle?: number | string

    /**
     * 说明
     * @type {string}
     * @memberof ReqProjectFinalAudit
     */
    remark?: string

    /**
     * 审核结果 1：通过 0：不通过
     * @type {number | string}
     * @memberof ReqProjectFinalAudit
     */
    result?: number | string

    /**
     * 工程项目资料信息表
     * @type {Array<RiskCheckProjectDocPo>}
     * @memberof ReqProjectFinalAudit
     */
    riskCheckProjectDocPoList?: Array<RiskCheckProjectDocPo>

    /**
     * 银行转账执行费率
     * @type {number | string}
     * @memberof ReqProjectFinalAudit
     */
    transferBankRate?: number | string

}

/**
*
* @export
* @interface ReqProjectIdQuery
*/
export interface ReqProjectIdQuery {

    /**
     * 公司id
     * @type {number | string}
     * @memberof ReqProjectIdQuery
     */
    companyId?: number | string

    /**
     * 经销商
     * @type {string}
     * @memberof ReqProjectIdQuery
     */
    companyName?: string

    /**
     * EHR部门主键列表
     * @type {Array<string>}
     * @memberof ReqProjectIdQuery
     */
    deptDocList?: Array<string>

    /**
     * 甲方名称
     * @type {string}
     * @memberof ReqProjectIdQuery
     */
    firstPartName?: string

    /**
     * 分部编码
     * @type {string}
     * @memberof ReqProjectIdQuery
     */
    pkDeptDoc?: string

    /**
     * 项目名称
     * @type {string}
     * @memberof ReqProjectIdQuery
     */
    projectName?: string

    /**
     * 项目编号
     * @type {string}
     * @memberof ReqProjectIdQuery
     */
    projectNo?: string

    /**
     * 合作进度 1：待提交2：初审中 3：资料收集中 4：待立项 5：合作关闭 11：待终审 6：待签约 7：待放款 8：贷中 9：合作完成 10:信息待完善
     * @type {string}
     * @memberof ReqProjectIdQuery
     */
    statusList?: string

    /**
     * 项目类别 1：地产项目 2：政府共建项目 3：市政项目 3：办公楼 4：厂房 5：其他
     * @type {string}
     * @memberof ReqProjectIdQuery
     */
    typeList?: string

}

/**
*
* @export
* @interface ReqProjectIds
*/
export interface ReqProjectIds {

    /**
     *
     * @type {Array<number | string>}
     * @memberof ReqProjectIds
     */
    projectIds?: Array<number | string>

}

/**
*
* @export
* @interface ReqProjectPerformance
*/
export interface ReqProjectPerformance {

    /**
     * 公司id
     * @type {number | string}
     * @memberof ReqProjectPerformance
     */
    companyId?: number | string

    /**
     * 用户评价类型 1：满意，帮分享 2：继续加油 3：不满意 4：再看看
     * @type {number | string}
     * @memberof ReqProjectPerformance
     */
    performanceType?: number | string

    /**
     * 用户id
     * @type {number | string}
     * @memberof ReqProjectPerformance
     */
    userId?: number | string

}

/**
*
* @export
* @interface ReqProjectSignAudit
*/
export interface ReqProjectSignAudit {

    /**
     * 附件
     * @type {string}
     * @memberof ReqProjectSignAudit
     */
    attachment?: string

    /**
     * 创建人
     * @type {string}
     * @memberof ReqProjectSignAudit
     */
    createBy?: string

    /**
     * 审核人手机号
     * @type {string}
     * @memberof ReqProjectSignAudit
     */
    createByMobile?: string

    /**
     * 项目工程id
     * @type {number | string}
     * @memberof ReqProjectSignAudit
     */
    projectId?: number | string

    /**
     * 说明
     * @type {string}
     * @memberof ReqProjectSignAudit
     */
    remark?: string

    /**
     * 审核结果  1：确认签约或确认放款 0：合作关闭
     * @type {number | string}
     * @memberof ReqProjectSignAudit
     */
    result?: number | string

}

/**
*
* @export
* @interface ReqProjectStatus
*/
export interface ReqProjectStatus {

    /**
     * 审批人手机号
     * @type {string}
     * @memberof ReqProjectStatus
     */
    createByMobile?: string

    /**
     * 项目工程id
     * @type {string}
     * @memberof ReqProjectStatus
     */
    projectId?: string

    /**
     * 备注
     * @type {string}
     * @memberof ReqProjectStatus
     */
    remark?: string

    /**
     * 状态 1：待提交2：初审中 3：资料收集中 12：资料待审核 4：待立项  5：审核未通过 11：待终审 6：待签约 7：待放款 8：贷中 9：项目完成 10:信息待完善 13: 终审通过 14：终审未通过
     * @type {number | string}
     * @memberof ReqProjectStatus
     */
    status?: number | string

    /**
     * 提交时间,格式为:yyyy-MM-dd HH:mm:ss
     * @type {string}
     * @memberof ReqProjectStatus
     */
    submitTime?: string

    /**
     * 修改人
     * @type {string}
     * @memberof ReqProjectStatus
     */
    updateBy?: string

}

/**
* 2.0项目
* @export
* @interface ReqProjectSupply
*/
export interface ReqProjectSupply {

    /**
     * 地址
     * @type {string}
     * @memberof ReqProjectSupply
     */
    address?: string

    /**
     * 市编码
     * @type {string}
     * @memberof ReqProjectSupply
     */
    cityId?: string

    /**
     * 市
     * @type {string}
     * @memberof ReqProjectSupply
     */
    cityName?: string

    /**
     * 企业编码-不用传
     * @type {string}
     * @memberof ReqProjectSupply
     */
    companyCode?: string

    /**
     * 企业id
     * @type {number | string}
     * @memberof ReqProjectSupply
     */
    companyId?: number | string

    /**
     * 企业名称
     * @type {string}
     * @memberof ReqProjectSupply
     */
    companyName?: string

    /**
     * 区编码
     * @type {string}
     * @memberof ReqProjectSupply
     */
    countryId?: string

    /**
     * 区
     * @type {string}
     * @memberof ReqProjectSupply
     */
    countryName?: string

    /**
     * 创建人-不用传
     * @type {string}
     * @memberof ReqProjectSupply
     */
    createBy?: string

    /**
     * 创建人手机号-不用传
     * @type {string}
     * @memberof ReqProjectSupply
     */
    createPhone?: string

    /**
     * 创建时间-不用传
     * @type {string}
     * @memberof ReqProjectSupply
     */
    createTime?: string

    /**
     * 客户经理手机号
     * @type {string}
     * @memberof ReqProjectSupply
     */
    customerMobile?: string

    /**
     * 客户经理名称
     * @type {string}
     * @memberof ReqProjectSupply
     */
    customerName?: string

    /**
     * 分部名称
     * @type {string}
     * @memberof ReqProjectSupply
     */
    deptName?: string

    /**
     * 预计交付时间
     * @type {string}
     * @memberof ReqProjectSupply
     */
    estimatedDeliverTime?: string

    /**
     * 项目预计交付时间-字符串,如：2021-06-18-不用传
     * @type {string}
     * @memberof ReqProjectSupply
     */
    estimatedDeliverTimeString?: string

    /**
     * 预估签约金额
     * @type {number | string}
     * @memberof ReqProjectSupply
     */
    estimatedSignAmount?: number | string

    /**
     * 甲方名称
     * @type {string}
     * @memberof ReqProjectSupply
     */
    firstPartName?: string

    /**
     * 可从总部采购的产品 1：冷暖辅材 2：电线电缆 3：管材管件 4：热水设备 5：高端厨电 6：智能化产品
     * @type {Array<number | string>}
     * @memberof ReqProjectSupply
     */
    generalGoodsList?: Array<number | string>

    /**
     * 可从总部采购的产品列表字符串,以逗号间隔-不用传
     * @type {string}
     * @memberof ReqProjectSupply
     */
    generalGoodsNames?: string

    /**
     * 是否已回款 1=是 0=否
     * @type {number | string}
     * @memberof ReqProjectSupply
     */
    hasRefunded?: number | string

    /**
     * 项目id,编辑时必传
     * @type {number | string}
     * @memberof ReqProjectSupply
     */
    id?: number | string

    /**
     * 操作人姓名
     * @type {string}
     * @memberof ReqProjectSupply
     */
    operateUserName?: string

    /**
     * 操作人手机号
     * @type {string}
     * @memberof ReqProjectSupply
     */
    operateUserPhone?: string

    /**
     * 项目建筑类型 1：医院 2：酒店 3：学校 4：政府公建项目 5：商用写字楼 6：商场购物中心 7：地产项目 8：厂房（含养殖业）9：其他
     * @type {Array<number | string>}
     * @memberof ReqProjectSupply
     */
    projectBuildingTypeList?: Array<number | string>

    /**
     * 项目建筑类型列表字符串,以逗号间隔-不用传
     * @type {string}
     * @memberof ReqProjectSupply
     */
    projectBuildingTypeNames?: string

    /**
     * 工程项目智能化需求 1：需集控方案 2：需能源监测功能 3：需节能计费功能 4：需智能面板 5：其他
     * @type {Array<number | string>}
     * @memberof ReqProjectSupply
     */
    projectIntelligentNeedsList?: Array<number | string>

    /**
     * 工程项目智能化需求列表字符串,以逗号间隔-不用传
     * @type {string}
     * @memberof ReqProjectSupply
     */
    projectIntelligentNeedsNames?: string

    /**
     * 项目名称
     * @type {string}
     * @memberof ReqProjectSupply
     */
    projectName?: string

    /**
     * 客户角色 1：设备供应商 2：辅材供应商 3：安装供应商 4：系统集成商 5：总包 6：分包 7：其他
     * @type {Array<number | string>}
     * @memberof ReqProjectSupply
     */
    projectRoleList?: Array<number | string>

    /**
     * 项目角色列表字符串,以逗号间隔-不用传
     * @type {string}
     * @memberof ReqProjectSupply
     */
    projectRoleNames?: string

    /**
     * 供应链产品所处阶段 1：采购阶段-辅材未定 2：采购阶段-辅材已定 3：项目跟踪阶段-方案未定 4：项目跟踪阶段-方案已定 5：招投标阶段 6：无在谈在投项目
     * @type {number | string}
     * @memberof ReqProjectSupply
     */
    projectStep?: number | string

    /**
     * 项目所处的阶段,返回如: 采购阶段-辅材未定-不用传
     * @type {string}
     * @memberof ReqProjectSupply
     */
    projectStepString?: string

    /**
     * 省编码
     * @type {string}
     * @memberof ReqProjectSupply
     */
    provinceId?: string

    /**
     * 省
     * @type {string}
     * @memberof ReqProjectSupply
     */
    provinceName?: string

    /**
     * 最近更新人-不用传
     * @type {string}
     * @memberof ReqProjectSupply
     */
    updateBy?: string

    /**
     * 最近更新人手机号-不用传
     * @type {string}
     * @memberof ReqProjectSupply
     */
    updatePhone?: string

    /**
     * 最近更新时间-不用传
     * @type {string}
     * @memberof ReqProjectSupply
     */
    updateTime?: string

}

/**
*
* @export
* @interface ReqRecommendReward
*/
export interface ReqRecommendReward {

    /**
     * 认证时间
     * @type {string}
     * @memberof ReqRecommendReward
     */
    authenticationTime?: string

    /**
     * 企业id
     * @type {number | string}
     * @memberof ReqRecommendReward
     */
    companyId: number | string

    /**
     * 企业名称
     * @type {string}
     * @memberof ReqRecommendReward
     */
    companyName?: string

    /**
     * 信用评审时间
     * @type {string}
     * @memberof ReqRecommendReward
     */
    creditApprovedTime?: string

    /**
     * 推荐人Id
     * @type {number | string}
     * @memberof ReqRecommendReward
     */
    recommenderUserId: number | string

    /**
     * 推荐人手机号
     * @type {string}
     * @memberof ReqRecommendReward
     */
    recommenderUserMobile: string

}

/**
*
* @export
* @interface ReqRecommendRewardBase
*/
export interface ReqRecommendRewardBase {

    /**
     * 企业id
     * @type {number | string}
     * @memberof ReqRecommendRewardBase
     */
    companyId: number | string

    /**
     * 信用等级
     * @type {string}
     * @memberof ReqRecommendRewardBase
     */
    creditLevel?: string

    /**
     * 推荐人Id
     * @type {number | string}
     * @memberof ReqRecommendRewardBase
     */
    recommendUserId?: number | string

    /**
     * 状态
     * @type {number | string}
     * @memberof ReqRecommendRewardBase
     */
    sendStatus?: number | string

}

/**
*
* @export
* @interface ReqRecommender
*/
export interface ReqRecommender {

    /**
     * 来源 1：客户经理分享 2：用户自主
     * @type {number | string}
     * @memberof ReqRecommender
     */
    source: number | string

    /**
     * 会员id
     * @type {number | string}
     * @memberof ReqRecommender
     */
    userId: number | string

    /**
     * 客户经理企业微信id
     * @type {string}
     * @memberof ReqRecommender
     */
    wxCorpUserId?: string

}

/**
*
* @export
* @interface ReqUserAuthenticationNotify
*/
export interface ReqUserAuthenticationNotify {

    /**
     * 用户id
     * @type {number | string}
     * @memberof ReqUserAuthenticationNotify
     */
    userId?: number | string

}

/**
*
* @export
* @interface ReqUserBasic
*/
export interface ReqUserBasic {

    /**
     * 已合作甲方
     * @type {string}
     * @memberof ReqUserBasic
     */
    cooperatedFirstParty?: string

    /**
     * 厂商信息
     * @type {string}
     * @memberof ReqUserBasic
     */
    manufacturer?: string

    /**
     * 婚姻状态 1：未婚 2：已婚 3：离异
     * @type {number | string}
     * @memberof ReqUserBasic
     */
    maritalStatus?: number | string

    /**
     * 老客户信息
     * @type {string}
     * @memberof ReqUserBasic
     */
    oldCompanyName?: string

    /**
     * 合作伙伴
     * @type {string}
     * @memberof ReqUserBasic
     */
    partner?: string

    /**
     * 修改人
     * @type {string}
     * @memberof ReqUserBasic
     */
    updateBy?: string

    /**
     * 用户id
     * @type {number | string}
     * @memberof ReqUserBasic
     */
    userId?: number | string

    /**
     * 客户来源 1：销售自拓 2：会销活动 3：厂商介绍 4:老客户转介绍 5:总部分配 6: 客户继承 7：其他
     * @type {number | string}
     * @memberof ReqUserBasic
     */
    userSource?: number | string

    /**
     * 常做项目类型 1:居住建筑 2:市政建筑 3:企事业建筑 4:商业娱乐建筑 5:生产性建筑 6:其他
     * @type {string}
     * @memberof ReqUserBasic
     */
    usualProjectType?: string

    /**
     * 常用区域品牌名称
     * @type {string}
     * @memberof ReqUserBasic
     */
    usualRegionBrand?: string

    /**
     * 从业年限 1:3年以下 2: 3-5年 3: 5-8年 4: 8-10年 5：10-15年 6:15-20年 7：20年以上
     * @type {number | string}
     * @memberof ReqUserBasic
     */
    workingYears?: number | string

}

/**
*
* @export
* @interface ReqWeiXinShare
*/
export interface ReqWeiXinShare {

    /**
     * locationUrl
     * @type {string}
     * @memberof ReqWeiXinShare
     */
    locationUrl?: string

}

/**
*
* @export
* @interface ResolutionApproveRequest
*/
export interface ResolutionApproveRequest {

    /**
     * 项目id
     * @type {number | string}
     * @memberof ResolutionApproveRequest
     */
    projectId?: number | string

    /**
     * 评审要求
     * @type {string}
     * @memberof ResolutionApproveRequest
     */
    remark?: string

    /**
     * 更新人
     * @type {string}
     * @memberof ResolutionApproveRequest
     */
    updateBy?: string

    /**
     * 更新人手机号
     * @type {string}
     * @memberof ResolutionApproveRequest
     */
    updateByMobile?: string

}

/**
*
* @export
* @interface ResolutionChangeConfirmRequest
*/
export interface ResolutionChangeConfirmRequest {

    /**
     * 当前登录的用户
     * @type {string}
     * @memberof ResolutionChangeConfirmRequest
     */
    userName?: string

}

/**
*
* @export
* @interface ResolutionCustomerRequest
*/
export interface ResolutionCustomerRequest {

    /**
     * 项目合同总额
     * @type {number | string}
     * @memberof ResolutionCustomerRequest
     */
    contractAmount?: number | string

    /**
     * 项目评级
     * @type {string}
     * @memberof ResolutionCustomerRequest
     */
    levels?: string

    /**
     * 项目id
     * @type {number | string}
     * @memberof ResolutionCustomerRequest
     */
    projectId?: number | string

    /**
     * 项目名称
     * @type {string}
     * @memberof ResolutionCustomerRequest
     */
    projectName?: string

    /**
     * 操作人
     * @type {string}
     * @memberof ResolutionCustomerRequest
     */
    updateBy?: string

}

/**
*
* @export
* @interface ResolutionDetailResponse
*/
export interface ResolutionDetailResponse {

    /**
     * 银行承兑执行费率
     * @type {number | string}
     * @memberof ResolutionDetailResponse
     */
    acceptBankRate?: number | string

    /**
     * 首付款比例%
     * @type {number | string}
     * @memberof ResolutionDetailResponse
     */
    advancePaymentRate?: number | string

    /**
     * 经销商id
     * @type {number | string}
     * @memberof ResolutionDetailResponse
     */
    companyId?: number | string

    /**
     * 经销商评级
     * @type {string}
     * @memberof ResolutionDetailResponse
     */
    companyLevel?: string

    /**
     * 经销商名称
     * @type {string}
     * @memberof ResolutionDetailResponse
     */
    companyName?: string

    /**
     * 项目合同总额
     * @type {number | string}
     * @memberof ResolutionDetailResponse
     */
    contractAmount?: number | string

    /**
     * 分部名称
     * @type {string}
     * @memberof ResolutionDetailResponse
     */
    deptName?: string

    /**
     * 设备款总额
     * @type {number | string}
     * @memberof ResolutionDetailResponse
     */
    deviceAmount?: number | string

    /**
     * 项目评级
     * @type {string}
     * @memberof ResolutionDetailResponse
     */
    levels?: string

    /**
     * 预估借款金额/申请代付金额(元)
     * @type {number | string}
     * @memberof ResolutionDetailResponse
     */
    predictLoanAmount?: number | string

    /**
     * 项目id
     * @type {number | string}
     * @memberof ResolutionDetailResponse
     */
    projectId?: number | string

    /**
     * 项目名称
     * @type {string}
     * @memberof ResolutionDetailResponse
     */
    projectName?: string

    /**
     * 项目编号
     * @type {string}
     * @memberof ResolutionDetailResponse
     */
    projectNo?: string

    /**
     * 专项额度（元）
     * @type {number | string}
     * @memberof ResolutionDetailResponse
     */
    projectQuotaAmount?: number | string

    /**
     * 可用额度(元)
     * @type {number | string}
     * @memberof ResolutionDetailResponse
     */
    purchaseBalance?: number | string

    /**
     * 可代采购额度(元)
     * @type {number | string}
     * @memberof ResolutionDetailResponse
     */
    purchaseQuota?: number | string

    /**
     * 剩余货款支付周期（月）
     * @type {number | string}
     * @memberof ResolutionDetailResponse
     */
    remainPaymentCycle?: number | string

    /**
     * 评审要求
     * @type {string}
     * @memberof ResolutionDetailResponse
     */
    remark?: string

    /**
     * 项目采购信息
     * @type {Array<ProjectPurchaseResponse>}
     * @memberof ResolutionDetailResponse
     */
    resolutionPurchaseList?: Array<ProjectPurchaseResponse>

    /**
     * 评审决议状态 1：待提交 2：审批中 3：审批未通过 4：审批通过 5：变更决议待发起 6：变更决议审批中 7：变更决议审批未通过 8：变更决议审批通过
     * @type {number | string}
     * @memberof ResolutionDetailResponse
     */
    resolutionStatus?: number | string

    /**
     * 销售毛利率(%)
     * @type {number | string}
     * @memberof ResolutionDetailResponse
     */
    salesGrossMargin?: number | string

    /**
     * 销售总额(元)
     * @type {number | string}
     * @memberof ResolutionDetailResponse
     */
    salesTotalAmount?: number | string

    /**
     * 项目状态 1：待提交 2：初审中 3：资料收集中 4：待立项 5：审核未通过 6：待签约 7：待放款 8：贷中 9：合作完成 10：信息待完善 11：待终审 12：资料待审核 13：终审通过 14：终审不通过
     * @type {number | string}
     * @memberof ResolutionDetailResponse
     */
    status?: number | string

    /**
     * 银行转账执行费率
     * @type {number | string}
     * @memberof ResolutionDetailResponse
     */
    transferBankRate?: number | string

    /**
     * 客户经理
     * @type {string}
     * @memberof ResolutionDetailResponse
     */
    userManager?: string

    /**
     * 客户经理手机号
     * @type {string}
     * @memberof ResolutionDetailResponse
     */
    userManagerPhone?: string

}

/**
*
* @export
* @interface ResolutionDingCallBackRequest
*/
export interface ResolutionDingCallBackRequest {

    /**
     * 项目id
     * @type {number | string}
     * @memberof ResolutionDingCallBackRequest
     */
    projectId?: number | string

    /**
     * 审批结果 1：审批通过 2：审批拒绝
     * @type {number | string}
     * @memberof ResolutionDingCallBackRequest
     */
    result?: number | string

}

/**
*
* @export
* @interface ResolutionPurchaseRequest
*/
export interface ResolutionPurchaseRequest {

    /**
     * 银行承兑执行费率
     * @type {number | string}
     * @memberof ResolutionPurchaseRequest
     */
    acceptBankRate?: number | string

    /**
     * 首付款比例%
     * @type {number | string}
     * @memberof ResolutionPurchaseRequest
     */
    advancePaymentRate?: number | string

    /**
     * 发起人手机号 注：评审决议变更时必填
     * @type {string}
     * @memberof ResolutionPurchaseRequest
     */
    applierMobile?: string

    /**
     * 采购总额
     * @type {number | string}
     * @memberof ResolutionPurchaseRequest
     */
    deviceAmount?: number | string

    /**
     * 预估借款金额/申请代付金额(元)
     * @type {number | string}
     * @memberof ResolutionPurchaseRequest
     */
    predictLoanAmount?: number | string

    /**
     * 项目id
     * @type {number | string}
     * @memberof ResolutionPurchaseRequest
     */
    projectId?: number | string

    /**
     * 项目采购信息
     * @type {Array<ProjectPurchaseRequest>}
     * @memberof ResolutionPurchaseRequest
     */
    projectPurchaseList?: Array<ProjectPurchaseRequest>

    /**
     * 专项额度（元）
     * @type {number | string}
     * @memberof ResolutionPurchaseRequest
     */
    projectQuotaAmount?: number | string

    /**
     * 剩余货款支付周期（月）
     * @type {number | string}
     * @memberof ResolutionPurchaseRequest
     */
    remainPaymentCycle?: number | string

    /**
     * 评审要求 注：评审决议变更时必填
     * @type {string}
     * @memberof ResolutionPurchaseRequest
     */
    remark?: string

    /**
     * 销售毛利率(%)
     * @type {number | string}
     * @memberof ResolutionPurchaseRequest
     */
    salesGrossMargin?: number | string

    /**
     * 银行转账执行费率
     * @type {number | string}
     * @memberof ResolutionPurchaseRequest
     */
    transferBankRate?: number | string

    /**
     * 更新人
     * @type {string}
     * @memberof ResolutionPurchaseRequest
     */
    updateBy?: string

}

/**
*
* @export
* @interface ResolutionRecordResponse
*/
export interface ResolutionRecordResponse {

    /**
     * 审核结果 1：待审核 2：审核通过 3：审核不通过
     * @type {number | string}
     * @memberof ResolutionRecordResponse
     */
    approvalStatus?: number | string

    /**
     * 创建人
     * @type {string}
     * @memberof ResolutionRecordResponse
     */
    createBy?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof ResolutionRecordResponse
     */
    createTime?: string

    /**
     * 钉钉流程id
     * @type {string}
     * @memberof ResolutionRecordResponse
     */
    dingId?: string

    /**
     * 是否查看
     * @type {boolean}
     * @memberof ResolutionRecordResponse
     */
    lookOver?: boolean

    /**
     * 项目id
     * @type {number | string}
     * @memberof ResolutionRecordResponse
     */
    projectId?: number | string

    /**
     * 最新采购信息
     * @type {Array<ProjectPurchaseResponse>}
     * @memberof ResolutionRecordResponse
     */
    projectPurchaseList?: Array<ProjectPurchaseResponse>

    /**
     * 修改记录详情
     * @type {Array<ProjectResolutionRecordDetail>}
     * @memberof ResolutionRecordResponse
     */
    projectResolutionRecordDetailList?: Array<ProjectResolutionRecordDetail>

    /**
     * 标题
     * @type {string}
     * @memberof ResolutionRecordResponse
     */
    recordTitle?: string

    /**
     * 记录类型 1：编辑 2：发起评审决议流程 3：评审决议钉钉流程节点审批 4：评审决议钉钉审批结果 5：发起评审决议变更流程 6：评审决议变更钉钉流程节点审批 7：评审决议变更钉钉审批结果
     * @type {number | string}
     * @memberof ResolutionRecordResponse
     */
    recordType?: number | string

    /**
     * 评审要求
     * @type {string}
     * @memberof ResolutionRecordResponse
     */
    remark?: string

}

/**
*
* @export
* @interface RespAccountDetailInfo
*/
export interface RespAccountDetailInfo {

    /**
     * 头像
     * @type {string}
     * @memberof RespAccountDetailInfo
     */
    avatarUrl?: string

    /**
     * B2b企业
     * @type {Array<RespCompany>}
     * @memberof RespAccountDetailInfo
     */
    b2bCompanyList?: Array<RespCompany>

    /**
     * 已合作甲方
     * @type {string}
     * @memberof RespAccountDetailInfo
     */
    cooperatedFirstParty?: string

    /**
     * 企业微信id
     * @type {string}
     * @memberof RespAccountDetailInfo
     */
    corpUserId?: string

    /**
     * 注册时间
     * @type {string}
     * @memberof RespAccountDetailInfo
     */
    createTime?: string

    /**
     * 1.0企业
     * @type {Array<RespCompany>}
     * @memberof RespAccountDetailInfo
     */
    crmCompanyList?: Array<RespCompany>

    /**
     * 基础信息是否填写完整 true：是 false：否
     * @type {boolean}
     * @memberof RespAccountDetailInfo
     */
    finishResult?: boolean

    /**
     * 跟进阶段 1：初步建立联系 2：初步达成意向 3：方案已推介 4：客户已评级 5：项目推进中 6：首次交易成功 7：合作关闭
     * @type {number | string}
     * @memberof RespAccountDetailInfo
     */
    flowUpProcess?: number | string

    /**
     * 是否隐藏
     * @type {boolean}
     * @memberof RespAccountDetailInfo
     */
    hidden?: boolean

    /**
     * 客户分级
     * @type {string}
     * @memberof RespAccountDetailInfo
     */
    level?: string

    /**
     * 厂商信息
     * @type {string}
     * @memberof RespAccountDetailInfo
     */
    manufacturer?: string

    /**
     * 婚姻状态 1：未婚 2：已婚 3：离异
     * @type {number | string}
     * @memberof RespAccountDetailInfo
     */
    maritalStatus?: number | string

    /**
     * 姓名
     * @type {string}
     * @memberof RespAccountDetailInfo
     */
    name?: string

    /**
     * 老客户信息
     * @type {string}
     * @memberof RespAccountDetailInfo
     */
    oldCompanyName?: string

    /**
     * 合作伙伴
     * @type {string}
     * @memberof RespAccountDetailInfo
     */
    partner?: string

    /**
     * 账号来源
     * @type {string}
     * @memberof RespAccountDetailInfo
     */
    source?: string

    /**
     * 客户分类
     * @type {string}
     * @memberof RespAccountDetailInfo
     */
    userClass?: string

    /**
     * 用户id
     * @type {string}
     * @memberof RespAccountDetailInfo
     */
    userId?: string

    /**
     * 客户来源 1：销售自拓 2：会销活动 3：厂商介绍 4:老客户转介绍 5:总部分配 6: 客户继承 7：其他
     * @type {number | string}
     * @memberof RespAccountDetailInfo
     */
    userSource?: number | string

    /**
     * 客户标签(逗号隔开)：1：可发展为集采会员 2：有集采PLUS机会: 3：有严选供应链机会 4：可助力品牌合作 5：可发展为区域KOL
     * @type {string}
     * @memberof RespAccountDetailInfo
     */
    userTag?: string

    /**
     * 账号
     * @type {string}
     * @memberof RespAccountDetailInfo
     */
    username?: string

    /**
     * 常做项目类型 1:居住建筑 2:市政建筑 3:企事业建筑 4:商业娱乐建筑 5:生产性建筑 6:其他
     * @type {string}
     * @memberof RespAccountDetailInfo
     */
    usualProjectType?: string

    /**
     * 常做项目类型名称
     * @type {string}
     * @memberof RespAccountDetailInfo
     */
    usualProjectTypeName?: string

    /**
     * 常用区域品牌名称
     * @type {string}
     * @memberof RespAccountDetailInfo
     */
    usualRegionBrand?: string

    /**
     * 从业年限 1:3年以下 2: 3-5年 3: 5-8年 4: 8-10年 5：10-15年 6:15-20年 7：20年以上
     * @type {number | string}
     * @memberof RespAccountDetailInfo
     */
    workingYears?: number | string

    /**
     * 关联的微信用户
     * @type {Array<UserWeixin>}
     * @memberof RespAccountDetailInfo
     */
    wxUserList?: Array<UserWeixin>

}

/**
*
* @export
* @interface RespAuthCompany
*/
export interface RespAuthCompany {

    /**
     * 企业code
     * @type {string}
     * @memberof RespAuthCompany
     */
    companyCode?: string

    /**
     * 企业id
     * @type {number | string}
     * @memberof RespAuthCompany
     */
    companyId?: number | string

    /**
     * 企业名称
     * @type {string}
     * @memberof RespAuthCompany
     */
    companyName?: string

    /**
     * 社会统一信用代码
     * @type {string}
     * @memberof RespAuthCompany
     */
    unifiedSocialCreditCode?: string

}

/**
*
* @export
* @interface RespAuthenticationRecord
*/
export interface RespAuthenticationRecord {

    /**
     * 认证人
     * @type {string}
     * @memberof RespAuthenticationRecord
     */
    authenticationBy?: string

    /**
     * 认证人工号
     * @type {string}
     * @memberof RespAuthenticationRecord
     */
    authenticationCode?: string

    /**
     * 认证人手机号
     * @type {string}
     * @memberof RespAuthenticationRecord
     */
    authenticationPhone?: string

    /**
     * e签宝四要素认证结果code 0：成功
     * @type {number | string}
     * @memberof RespAuthenticationRecord
     */
    authenticationResultCode?: number | string

    /**
     * e签宝四要素认证结果描述
     * @type {string}
     * @memberof RespAuthenticationRecord
     */
    authenticationResultMessage?: string

    /**
     * 认证状态 1：未认证 2：认证中 3：认证成功 4：认证失败
     * @type {string}
     * @memberof RespAuthenticationRecord
     */
    authenticationStatus?: string

    /**
     * 认证时间
     * @type {string}
     * @memberof RespAuthenticationRecord
     */
    authenticationTime?: string

    /**
     * 认证方式 1：中金-开户 2：e签宝-企业四要素
     * @type {number | string}
     * @memberof RespAuthenticationRecord
     */
    authenticationType?: number | string

    /**
     * 营业执照
     * @type {string}
     * @memberof RespAuthenticationRecord
     */
    businessLicensePhoto?: string

    /**
     * 身份证人像面
     * @type {string}
     * @memberof RespAuthenticationRecord
     */
    certPhotoA?: string

    /**
     * 身份证国徽面
     * @type {string}
     * @memberof RespAuthenticationRecord
     */
    certPhotoB?: string

    /**
     * 公司编码
     * @type {string}
     * @memberof RespAuthenticationRecord
     */
    companyCode?: string

    /**
     * 企业名称
     * @type {string}
     * @memberof RespAuthenticationRecord
     */
    corporationName?: string

    /**
     * 实名流程Id
     * @type {string}
     * @memberof RespAuthenticationRecord
     */
    flowId?: string

    /**
     * 主键id
     * @type {number | string}
     * @memberof RespAuthenticationRecord
     */
    id?: number | string

    /**
     * 身份证有效期
     * @type {string}
     * @memberof RespAuthenticationRecord
     */
    idCardValidity?: string

    /**
     * 法人身份证号
     * @type {string}
     * @memberof RespAuthenticationRecord
     */
    legalCredentialNumber?: string

    /**
     * 法人姓名
     * @type {string}
     * @memberof RespAuthenticationRecord
     */
    legalPersonName?: string

    /**
     * 社会统一信用代码
     * @type {string}
     * @memberof RespAuthenticationRecord
     */
    unifiedSocialCreditCode?: string

}

/**
*
* @export
* @interface RespAuthenticationResult
*/
export interface RespAuthenticationResult {

    /**
     * 认证状态 1：未认证 2：认证中 3：认证成功 4：认证失败
     * @type {number | string}
     * @memberof RespAuthenticationResult
     */
    authenticationStatus?: number | string

    /**
     * 响应结果码
     * @type {number | string}
     * @memberof RespAuthenticationResult
     */
    code?: number | string

    /**
     * 企业编码
     * @type {string}
     * @memberof RespAuthenticationResult
     */
    companyCode?: string

    /**
     * 企业Id
     * @type {number | string}
     * @memberof RespAuthenticationResult
     */
    companyId?: number | string

    /**
     * 企业名称
     * @type {string}
     * @memberof RespAuthenticationResult
     */
    companyName?: string

    /**
     * 响应结果描述
     * @type {string}
     * @memberof RespAuthenticationResult
     */
    message?: string

}

/**
*
* @export
* @interface RespBossCluePage
*/
export interface RespBossCluePage {

    /**
     * 市名称
     * @type {string}
     * @memberof RespBossCluePage
     */
    cityName?: string

    /**
     * 企业名称
     * @type {string}
     * @memberof RespBossCluePage
     */
    companyName?: string

    /**
     * 创建者名称
     * @type {string}
     * @memberof RespBossCluePage
     */
    createBy?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof RespBossCluePage
     */
    createTime?: string

    /**
     * 客户经理所属分部
     * @type {string}
     * @memberof RespBossCluePage
     */
    customerDeptName?: string

    /**
     * 客户经理手机号
     * @type {string}
     * @memberof RespBossCluePage
     */
    customerMobile?: string

    /**
     * 客户经理名称
     * @type {string}
     * @memberof RespBossCluePage
     */
    customerName?: string

    /**
     * 主营品牌
     * @type {string}
     * @memberof RespBossCluePage
     */
    deviceBrand?: string

    /**
     * 主营品类 1：空调 2：采暖 3：新风 4：净水 5：智能化 6：辅材 7：电梯 8：其他
     * @type {string}
     * @memberof RespBossCluePage
     */
    deviceCategory?: string

    /**
     * 主键id
     * @type {number | string}
     * @memberof RespBossCluePage
     */
    id?: number | string

    /**
     * 省名称
     * @type {string}
     * @memberof RespBossCluePage
     */
    provinceName?: string

    /**
     * 更新时间
     * @type {string}
     * @memberof RespBossCluePage
     */
    updateTime?: string

    /**
     * 客户手机号
     * @type {string}
     * @memberof RespBossCluePage
     */
    userMobile?: string

    /**
     * 客户姓名
     * @type {string}
     * @memberof RespBossCluePage
     */
    userName?: string

}

/**
*
* @export
* @interface RespBossCrmCompanyPage
*/
export interface RespBossCrmCompanyPage {

    /**
     * 认证时间
     * @type {string}
     * @memberof RespBossCrmCompanyPage
     */
    authenticationTime?: string

    /**
     * 橙工采标签：0-未激活， 1-初级，2-橙级
     * @type {number | string}
     * @memberof RespBossCrmCompanyPage
     */
    chengGongCaiLable?: number | string

    /**
     * 城市id
     * @type {string}
     * @memberof RespBossCrmCompanyPage
     */
    cityId?: string

    /**
     * 市名称
     * @type {string}
     * @memberof RespBossCrmCompanyPage
     */
    cityName?: string

    /**
     * 企业编码
     * @type {string}
     * @memberof RespBossCrmCompanyPage
     */
    companyCode?: string

    /**
     * 企业主键id
     * @type {number | string}
     * @memberof RespBossCrmCompanyPage
     */
    companyId?: number | string

    /**
     * 企业名称
     * @type {string}
     * @memberof RespBossCrmCompanyPage
     */
    companyName?: string

    /**
     * 企业类型 1：体系内 2：体系外
     * @type {number | string}
     * @memberof RespBossCrmCompanyPage
     */
    companyType?: number | string

    /**
     * 区id
     * @type {string}
     * @memberof RespBossCrmCompanyPage
     */
    countryId?: string

    /**
     * 区/县名称
     * @type {string}
     * @memberof RespBossCrmCompanyPage
     */
    countryName?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof RespBossCrmCompanyPage
     */
    createTime?: string

    /**
     * 客户经理
     * @type {string}
     * @memberof RespBossCrmCompanyPage
     */
    customerManager?: string

    /**
     * 客户经理手机号
     * @type {string}
     * @memberof RespBossCrmCompanyPage
     */
    customerManagerPhone?: string

    /**
     * 客户分类：1黑名单 2白名单 3待审核
     * @type {number | string}
     * @memberof RespBossCrmCompanyPage
     */
    customerType?: number | string

    /**
     * 是否认证
     * @type {boolean}
     * @memberof RespBossCrmCompanyPage
     */
    isAuthentication?: boolean

    /**
     * 1.一般会员
2.认证会员
3.评级会员
4.签约会员
5.交易会员
     * @type {number | string}
     * @memberof RespBossCrmCompanyPage
     */
    memberTag?: number | string

    /**
     * 省id
     * @type {string}
     * @memberof RespBossCrmCompanyPage
     */
    provinceId?: string

    /**
     * 省名称
     * @type {string}
     * @memberof RespBossCrmCompanyPage
     */
    provinceName?: string

    /**
     * 分部编码
     * @type {string}
     * @memberof RespBossCrmCompanyPage
     */
    subsectionCode?: string

    /**
     * 分部名称
     * @type {string}
     * @memberof RespBossCrmCompanyPage
     */
    subsectionName?: string

    /**
     * 管理员账号
     * @type {string}
     * @memberof RespBossCrmCompanyPage
     */
    userAccount?: string

    /**
     * 管理员姓名
     * @type {string}
     * @memberof RespBossCrmCompanyPage
     */
    userName?: string

}

/**
*
* @export
* @interface RespBossProjectInfo
*/
export interface RespBossProjectInfo {

    /**
     * 分页列表数据
     * @type {Page«RespBossProjectSupply»}
     * @memberof RespBossProjectInfo
     */
    projectPage?: string

    /**
     * 已筛选&项目数
     * @type {number | string}
     * @memberof RespBossProjectInfo
     */
    totalProjectNum?: number | string

    /**
     * 已回款金额
     * @type {number | string}
     * @memberof RespBossProjectInfo
     */
    totalRefundAmount?: number | string

    /**
     * 已回款
     * @type {number | string}
     * @memberof RespBossProjectInfo
     */
    totalRefundNum?: number | string

    /**
     * 已签约
     * @type {number | string}
     * @memberof RespBossProjectInfo
     */
    totalSignedNum?: number | string

}

/**
*
* @export
* @interface RespBossProjectSupply
*/
export interface RespBossProjectSupply {

    /**
     * 项目地址
     * @type {string}
     * @memberof RespBossProjectSupply
     */
    address?: string

    /**
     * 管理员手机号
     * @type {string}
     * @memberof RespBossProjectSupply
     */
    adminPhoneNumber?: string

    /**
     * 管理员姓名
     * @type {string}
     * @memberof RespBossProjectSupply
     */
    adminUserName?: string

    /**
     * BOSS端展示按钮类型,0=不展示 1=展示签约按钮 2=展示回款按钮
     * @type {number | string}
     * @memberof RespBossProjectSupply
     */
    buttonShowType?: number | string

    /**
     *
     * @type {string}
     * @memberof RespBossProjectSupply
     */
    cityName?: string

    /**
     * 公司名称
     * @type {string}
     * @memberof RespBossProjectSupply
     */
    companyName?: string

    /**
     *
     * @type {string}
     * @memberof RespBossProjectSupply
     */
    countryName?: string

    /**
     *
     * @type {string}
     * @memberof RespBossProjectSupply
     */
    createBy?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof RespBossProjectSupply
     */
    createTime?: string

    /**
     *
     * @type {string}
     * @memberof RespBossProjectSupply
     */
    createTimeString?: string

    /**
     * 客户经理
     * @type {string}
     * @memberof RespBossProjectSupply
     */
    customerName?: string

    /**
     * 主营品牌
     * @type {string}
     * @memberof RespBossProjectSupply
     */
    deviceBrand?: string

    /**
     * 主营品类,返回如: 净水
     * @type {string}
     * @memberof RespBossProjectSupply
     */
    deviceCategoryName?: string

    /**
     * 项目预计交付时间
     * @type {string}
     * @memberof RespBossProjectSupply
     */
    estimatedDeliverTime?: string

    /**
     * 项目预计交付时间-字符串,如：2021-06-18 12:00:00
     * @type {string}
     * @memberof RespBossProjectSupply
     */
    estimatedDeliverTimeString?: string

    /**
     * 项目预估签约额
     * @type {number | string}
     * @memberof RespBossProjectSupply
     */
    estimatedSignAmount?: number | string

    /**
     * 甲方名称
     * @type {string}
     * @memberof RespBossProjectSupply
     */
    firstPartName?: string

    /**
     * 销售阶段, hidden = true
     * @type {number | string}
     * @memberof RespBossProjectSupply
     */
    flowUpProcess?: number | string

    /**
     * 销售阶段,返回如: 已签约
     * @type {string}
     * @memberof RespBossProjectSupply
     */
    flowUpProcessString?: string

    /**
     * 可从总部采购的产品列表,返回名称列表
     * @type {Array<string>}
     * @memberof RespBossProjectSupply
     */
    generalGoodsList?: Array<string>

    /**
     * 可从总部采购的产品列表字符串,以逗号间隔
     * @type {string}
     * @memberof RespBossProjectSupply
     */
    generalGoodsNames?: string

    /**
     * 项目建筑类型列表,返回名称列表
     * @type {Array<string>}
     * @memberof RespBossProjectSupply
     */
    projectBuildingTypeList?: Array<string>

    /**
     * 项目建筑类型列表字符串,以逗号间隔
     * @type {string}
     * @memberof RespBossProjectSupply
     */
    projectBuildingTypeNames?: string

    /**
     * 项目id
     * @type {number | string}
     * @memberof RespBossProjectSupply
     */
    projectId?: number | string

    /**
     * 工程项目智能化需求列表,返回名称列表
     * @type {Array<string>}
     * @memberof RespBossProjectSupply
     */
    projectIntelligentNeedsList?: Array<string>

    /**
     * 工程项目智能化需求列表字符串,以逗号间隔
     * @type {string}
     * @memberof RespBossProjectSupply
     */
    projectIntelligentNeedsNames?: string

    /**
     * 项目名称
     * @type {string}
     * @memberof RespBossProjectSupply
     */
    projectName?: string

    /**
     * 客户角色列表,返回名称列表
     * @type {Array<string>}
     * @memberof RespBossProjectSupply
     */
    projectRoleList?: Array<string>

    /**
     * 客户角色列表字符串,以逗号间隔
     * @type {string}
     * @memberof RespBossProjectSupply
     */
    projectRoleNames?: string

    /**
     * 项目所处的阶段,返回如: 采购阶段-辅材未定
     * @type {string}
     * @memberof RespBossProjectSupply
     */
    projectStepString?: string

    /**
     *
     * @type {string}
     * @memberof RespBossProjectSupply
     */
    provinceName?: string

    /**
     * 签约回款额
     * @type {number | string}
     * @memberof RespBossProjectSupply
     */
    refundAmont?: number | string

    /**
     * 所属分部
     * @type {string}
     * @memberof RespBossProjectSupply
     */
    subsectionName?: string

    /**
     *
     * @type {string}
     * @memberof RespBossProjectSupply
     */
    updateBy?: string

    /**
     * 最近维护时间
     * @type {string}
     * @memberof RespBossProjectSupply
     */
    updateTime?: string

    /**
     *
     * @type {string}
     * @memberof RespBossProjectSupply
     */
    updateTimeString?: string

}

/**
* 推荐官列表数据
* @export
* @interface RespBossRecommenderList
*/
export interface RespBossRecommenderList {

    /**
     * 已认证
     * @type {number | string}
     * @memberof RespBossRecommenderList
     */
    certifiedNumber?: number | string

    /**
     * 推荐官创建时间//激活时间
     * @type {string}
     * @memberof RespBossRecommenderList
     */
    createTime?: string

    /**
     * 客户经理
     * @type {string}
     * @memberof RespBossRecommenderList
     */
    customerName?: string

    /**
     * 推荐官id
     * @type {number | string}
     * @memberof RespBossRecommenderList
     */
    id?: number | string

    /**
     * 已失效
     * @type {number | string}
     * @memberof RespBossRecommenderList
     */
    invalidNumber?: number | string

    /**
     * 姓名
     * @type {string}
     * @memberof RespBossRecommenderList
     */
    name?: string

    /**
     * 已评级
     * @type {number | string}
     * @memberof RespBossRecommenderList
     */
    ratedNumber?: number | string

    /**
     * 已注册
     * @type {number | string}
     * @memberof RespBossRecommenderList
     */
    registeredNumber?: number | string

    /**
     * 以获得奖励
     * @type {number | string}
     * @memberof RespBossRecommenderList
     */
    rewardAmount?: number | string

    /**
     * 来源
     * @type {string}
     * @memberof RespBossRecommenderList
     */
    source?: string

    /**
     * 用户id
     * @type {number | string}
     * @memberof RespBossRecommenderList
     */
    userId?: number | string

    /**
     * 登录账号
     * @type {string}
     * @memberof RespBossRecommenderList
     */
    username?: string

}

/**
* 推荐官列表数据统计
* @export
* @interface RespBossRecommenderStatistics
*/
export interface RespBossRecommenderStatistics {

    /**
     * 已认证
     * @type {number | string}
     * @memberof RespBossRecommenderStatistics
     */
    certifiedNumber?: number | string

    /**
     * 已失效
     * @type {number | string}
     * @memberof RespBossRecommenderStatistics
     */
    invalidNumber?: number | string

    /**
     * 已评级
     * @type {number | string}
     * @memberof RespBossRecommenderStatistics
     */
    ratedNumber?: number | string

    /**
     * 已注册
     * @type {number | string}
     * @memberof RespBossRecommenderStatistics
     */
    registeredNumber?: number | string

    /**
     * 以获得奖励
     * @type {number | string}
     * @memberof RespBossRecommenderStatistics
     */
    rewardAmount?: number | string

}

/**
*
* @export
* @interface RespCRMUser
*/
export interface RespCRMUser {

    /**
     * 微信用户头像
     * @type {string}
     * @memberof RespCRMUser
     */
    avatarUrl?: string

    /**
     * 公司列表
     * @type {Array<string>}
     * @memberof RespCRMUser
     */
    companies?: Array<string>

    /**
     * 注册时间
     * @type {string}
     * @memberof RespCRMUser
     */
    createTime?: string

    /**
     * 客户姓名
     * @type {string}
     * @memberof RespCRMUser
     */
    name?: string

    /**
     * unionId
     * @type {string}
     * @memberof RespCRMUser
     */
    unionId?: string

    /**
     * 用户id
     * @type {number | string}
     * @memberof RespCRMUser
     */
    userId?: number | string

    /**
     * 账号
     * @type {string}
     * @memberof RespCRMUser
     */
    username?: string

}

/**
*
* @export
* @interface RespChart
*/
export interface RespChart {

    /**
     * 属性名称
     * @type {string}
     * @memberof RespChart
     */
    name?: string

    /**
     * 属性值
     * @type {string}
     * @memberof RespChart
     */
    value?: string

}

/**
*
* @export
* @interface RespCompany
*/
export interface RespCompany {

    /**
     * 橙工采标签：0-未激活， 1-初级，2-橙级
     * @type {number | string}
     * @memberof RespCompany
     */
    chengGongCaiLable?: number | string

    /**
     * 企业code
     * @type {string}
     * @memberof RespCompany
     */
    companyCode?: string

    /**
     * 企业id
     * @type {number | string}
     * @memberof RespCompany
     */
    companyId?: number | string

    /**
     * 企业名称
     * @type {string}
     * @memberof RespCompany
     */
    companyName?: string

    /**
     * 信用到期时间
     * @type {string}
     * @memberof RespCompany
     */
    creditEndTime?: string

    /**
     * 企业信用
     * @type {string}
     * @memberof RespCompany
     */
    creditLevel?: string

    /**
     * 客户分类：1黑名单 2白名单 3待审核
     * @type {number | string}
     * @memberof RespCompany
     */
    customerType?: number | string

    /**
     * 已采购规模
     * @type {number | string}
     * @memberof RespCompany
     */
    hasPurchaseQuota?: number | string

    /**
     * 已采购规模内容
     * @type {string}
     * @memberof RespCompany
     */
    hasPurchaseQuotaContent?: string

    /**
     * 认证状态 0：未认证 1：已认证
     * @type {boolean}
     * @memberof RespCompany
     */
    isAuthentication?: boolean

    /**
     * 1.一般会员
2.认证会员
3.评级会员
4.签约会员
5.交易会员
     * @type {number | string}
     * @memberof RespCompany
     */
    memberTag?: number | string

    /**
     *
     * @type {boolean}
     * @memberof RespCompany
     */
    performance?: boolean

    /**
     * 项目数量
     * @type {number | string}
     * @memberof RespCompany
     */
    projectNum?: number | string

    /**
     * 项目列表
     * @type {Array<RespProject>}
     * @memberof RespCompany
     */
    projects?: Array<RespProject>

    /**
     * 采购额度
     * @type {number | string}
     * @memberof RespCompany
     */
    purchaseQuota?: number | string

    /**
     * 剩余采购额度
     * @type {number | string}
     * @memberof RespCompany
     */
    remainPurchaseQuota?: number | string

    /**
     * 角色信息
     * @type {string}
     * @memberof RespCompany
     */
    roleNames?: string

    /**
     * 角色
     * @type {Array<string>}
     * @memberof RespCompany
     */
    roles?: Array<string>

    /**
     * 服务费
     * @type {number | string}
     * @memberof RespCompany
     */
    serviceFee?: number | string

    /**
     * 次年服务费折扣
     * @type {number | string}
     * @memberof RespCompany
     */
    serviceFeeDiscount?: number | string

    /**
     * 2.0项目数量
     * @type {number | string}
     * @memberof RespCompany
     */
    supplyProjectNum?: number | string

    /**
     *
     * @type {number | string}
     * @memberof RespCompany
     */
    unClaimTotalAmount?: number | string

    /**
     *
     * @type {number | string}
     * @memberof RespCompany
     */
    unPaidTotalAmount?: number | string

    /**
     * 企业vip
     * @type {string}
     * @memberof RespCompany
     */
    vipRule?: string

    /**
     * 企业vip等级
     * @type {number | string}
     * @memberof RespCompany
     */
    vipRuleId?: number | string

    /**
     * vip服务费
     * @type {number | string}
     * @memberof RespCompany
     */
    vipServiceFee?: number | string

    /**
     * vip目标金额
     * @type {number | string}
     * @memberof RespCompany
     */
    vipTarget?: number | string

}

/**
*
* @export
* @interface RespCompanyAuthInfo
*/
export interface RespCompanyAuthInfo {

    /**
     *
     * @type {string}
     * @memberof RespCompanyAuthInfo
     */
    companyCode?: string

    /**
     *
     * @type {string}
     * @memberof RespCompanyAuthInfo
     */
    companyName?: string

    /**
     *
     * @type {string}
     * @memberof RespCompanyAuthInfo
     */
    legalRepIdNo?: string

    /**
     *
     * @type {string}
     * @memberof RespCompanyAuthInfo
     */
    legalRepName?: string

    /**
     *
     * @type {string}
     * @memberof RespCompanyAuthInfo
     */
    unifiedSocialCreditCode?: string

}

/**
*
* @export
* @interface RespCompanyCredit
*/
export interface RespCompanyCredit {

    /**
     * 信用等级
     * @type {string}
     * @memberof RespCompanyCredit
     */
    creditLevel?: string

    /**
     * 信用到期日期
     * @type {string}
     * @memberof RespCompanyCredit
     */
    endTime?: string

    /**
     * id
     * @type {number | string}
     * @memberof RespCompanyCredit
     */
    id?: number | string

    /**
     * 采购额度
     * @type {number | string}
     * @memberof RespCompanyCredit
     */
    purchaseQuota?: number | string

    /**
     * 剩余采购额度
     * @type {number | string}
     * @memberof RespCompanyCredit
     */
    remainPurchaseQuota?: number | string

    /**
     * 服务费
     * @type {number | string}
     * @memberof RespCompanyCredit
     */
    serviceFee?: number | string

    /**
     * 状态 true：正常 false：过期
     * @type {boolean}
     * @memberof RespCompanyCredit
     */
    status?: boolean

}

/**
*
* @export
* @interface RespCompanyCreditDetail
*/
export interface RespCompanyCreditDetail {

    /**
     * 附件
     * @type {string}
     * @memberof RespCompanyCreditDetail
     */
    attachments?: string

    /**
     * 公司id
     * @type {number | string}
     * @memberof RespCompanyCreditDetail
     */
    companyId?: number | string

    /**
     * 公司名称
     * @type {string}
     * @memberof RespCompanyCreditDetail
     */
    companyName?: string

    /**
     * 企业共享类型 1：主企业 2：子企业
     * @type {number | string}
     * @memberof RespCompanyCreditDetail
     */
    companyShareType?: number | string

    /**
     * 冻结状态
     * @type {boolean}
     * @memberof RespCompanyCreditDetail
     */
    creditFreeze?: boolean

    /**
     * 信用等级
     * @type {string}
     * @memberof RespCompanyCreditDetail
     */
    creditLevel?: string

    /**
     * 资料状态 1：待提交 2：已提交 3：已通过 4：已打回
     * @type {number | string}
     * @memberof RespCompanyCreditDetail
     */
    documentStatus?: number | string

    /**
     * 信用结束日期
     * @type {string}
     * @memberof RespCompanyCreditDetail
     */
    endTime?: string

    /**
     * 冻结额度
     * @type {number | string}
     * @memberof RespCompanyCreditDetail
     */
    freezeQuota?: number | string

    /**
     * 主键id
     * @type {number | string}
     * @memberof RespCompanyCreditDetail
     */
    id?: number | string

    /**
     * 占用额度
     * @type {number | string}
     * @memberof RespCompanyCreditDetail
     */
    occupyQuota?: number | string

    /**
     * 通用额度
     * @type {number | string}
     * @memberof RespCompanyCreditDetail
     */
    purchaseQuota?: number | string

    /**
     * 额度共享企业列表
     * @type {Array<RespCrmCompany>}
     * @memberof RespCompanyCreditDetail
     */
    quotaShareCompanies?: Array<RespCrmCompany>

    /**
     * 剩余代采额度
     * @type {number | string}
     * @memberof RespCompanyCreditDetail
     */
    remainQuota?: number | string

    /**
     * 说明
     * @type {string}
     * @memberof RespCompanyCreditDetail
     */
    remark?: string

    /**
     * 服务费
     * @type {number | string}
     * @memberof RespCompanyCreditDetail
     */
    serviceFee?: number | string

    /**
     * 信用开始日期
     * @type {string}
     * @memberof RespCompanyCreditDetail
     */
    startTime?: string

    /**
     * 临时额度
     * @type {number | string}
     * @memberof RespCompanyCreditDetail
     */
    temporaryQuota?: number | string

}

/**
*
* @export
* @interface RespCompanyCreditDocumentStatus
*/
export interface RespCompanyCreditDocumentStatus {

    /**
     * 授信资料状态 1：待提交 2：已提交 3：已通过 4：已打回
     * @type {number | string}
     * @memberof RespCompanyCreditDocumentStatus
     */
    documentStatus?: number | string

    /**
     * 打回原因
     * @type {string}
     * @memberof RespCompanyCreditDocumentStatus
     */
    remark?: string

}

/**
*
* @export
* @interface RespCompanyCreditList
*/
export interface RespCompanyCreditList {

    /**
     * 公司信用列表
     * @type {Array<RespCompanyCredit>}
     * @memberof RespCompanyCreditList
     */
    companyCreditList?: Array<RespCompanyCredit>

    /**
     * 最近更新人
     * @type {string}
     * @memberof RespCompanyCreditList
     */
    updateBy?: string

    /**
     * 最近更新人手机号
     * @type {string}
     * @memberof RespCompanyCreditList
     */
    updateByMobile?: string

    /**
     * 最近更新时间
     * @type {string}
     * @memberof RespCompanyCreditList
     */
    updateTime?: string

}

/**
*
* @export
* @interface RespCompanyCreditManager
*/
export interface RespCompanyCreditManager {

    /**
     * 公司id
     * @type {number | string}
     * @memberof RespCompanyCreditManager
     */
    companyId?: number | string

    /**
     * 公司名称
     * @type {string}
     * @memberof RespCompanyCreditManager
     */
    companyName?: string

    /**
     * 信用等级
     * @type {string}
     * @memberof RespCompanyCreditManager
     */
    creditLevel?: string

    /**
     * 所属分部
     * @type {string}
     * @memberof RespCompanyCreditManager
     */
    deptName?: string

    /**
     * 资料状态 1：待提交 2：已提交 3：已通过 4：已打回
     * @type {number | string}
     * @memberof RespCompanyCreditManager
     */
    documentStatus?: number | string

    /**
     * 资料更新时间
     * @type {string}
     * @memberof RespCompanyCreditManager
     */
    documentUpdateTime?: string

    /**
     * 信用到期日期
     * @type {string}
     * @memberof RespCompanyCreditManager
     */
    endTime?: string

    /**
     * 首次评级时间
     * @type {string}
     * @memberof RespCompanyCreditManager
     */
    firstLevelTime?: string

    /**
     * 采购额度
     * @type {number | string}
     * @memberof RespCompanyCreditManager
     */
    purchaseQuota?: number | string

    /**
     * 剩余采购额度
     * @type {number | string}
     * @memberof RespCompanyCreditManager
     */
    remainPurchaseQuota?: number | string

    /**
     * 服务费
     * @type {number | string}
     * @memberof RespCompanyCreditManager
     */
    serviceFee?: number | string

    /**
     * 状态 true：正常 false：过期
     * @type {boolean}
     * @memberof RespCompanyCreditManager
     */
    status?: boolean

    /**
     * 更新时间
     * @type {string}
     * @memberof RespCompanyCreditManager
     */
    updateTime?: string

}

/**
*
* @export
* @interface RespCompanyEntity
*/
export interface RespCompanyEntity {

    /**
     * 企业编码
     * @type {string}
     * @memberof RespCompanyEntity
     */
    companyCode?: string

    /**
     * 企业id
     * @type {number | string}
     * @memberof RespCompanyEntity
     */
    companyId?: number | string

    /**
     * 企业名称
     * @type {string}
     * @memberof RespCompanyEntity
     */
    companyName?: string

}

/**
*
* @export
* @interface RespCompanyProjectInfo
*/
export interface RespCompanyProjectInfo {

    /**
     * 管理员姓名
     * @type {string}
     * @memberof RespCompanyProjectInfo
     */
    adminUserName?: string

    /**
     * 管理员手机号
     * @type {string}
     * @memberof RespCompanyProjectInfo
     */
    adminUserPhone?: string

    /**
     * 客户经理姓名
     * @type {string}
     * @memberof RespCompanyProjectInfo
     */
    customerName?: string

    /**
     * 客户经理手机号
     * @type {string}
     * @memberof RespCompanyProjectInfo
     */
    customerPhone?: string

    /**
     * 分部编码
     * @type {string}
     * @memberof RespCompanyProjectInfo
     */
    subsectionCode?: string

    /**
     * 分部名称
     * @type {string}
     * @memberof RespCompanyProjectInfo
     */
    subsectionName?: string

}

/**
*
* @export
* @interface RespCompanySign
*/
export interface RespCompanySign {

    /**
     * 企业名称
     * @type {string}
     * @memberof RespCompanySign
     */
    companyName: string

    /**
     * 法人身份证号
     * @type {string}
     * @memberof RespCompanySign
     */
    legalCredentialNumber?: string

    /**
     * 法人姓名
     * @type {string}
     * @memberof RespCompanySign
     */
    legalPersonName?: string

    /**
     * 统一社会信用代码证
     * @type {string}
     * @memberof RespCompanySign
     */
    unifiedSocialCreditCode: string

}

/**
*
* @export
* @interface RespCompanyStatus
*/
export interface RespCompanyStatus {

    /**
     * 企业code
     * @type {string}
     * @memberof RespCompanyStatus
     */
    companyCode?: string

    /**
     * 是否认证
     * @type {boolean}
     * @memberof RespCompanyStatus
     */
    isAuthentication?: boolean

}

/**
*
* @export
* @interface RespCompanyVipApply
*/
export interface RespCompanyVipApply {

    /**
     * 申请时间
     * @type {string}
     * @memberof RespCompanyVipApply
     */
    applyTime?: string

    /**
     * 分配的员工ID
     * @type {string}
     * @memberof RespCompanyVipApply
     */
    assignedUserId?: string

    /**
     * 分配的员工名称手机号
     * @type {string}
     * @memberof RespCompanyVipApply
     */
    assignedUserMobile?: string

    /**
     * 分配的员工名称
     * @type {string}
     * @memberof RespCompanyVipApply
     */
    assignedUserName?: string

    /**
     * 经营区域
     * @type {string}
     * @memberof RespCompanyVipApply
     */
    businessArea?: string

    /**
     * 公司id
     * @type {number | string}
     * @memberof RespCompanyVipApply
     */
    companyId?: number | string

    /**
     * 公司名称
     * @type {string}
     * @memberof RespCompanyVipApply
     */
    companyName?: string

    /**
     * 联系人
     * @type {string}
     * @memberof RespCompanyVipApply
     */
    contract?: string

    /**
     * 联系人手机号
     * @type {string}
     * @memberof RespCompanyVipApply
     */
    contractMobile?: string

    /**
     * 部门名称
     * @type {string}
     * @memberof RespCompanyVipApply
     */
    deptName?: string

    /**
     * id
     * @type {number | string}
     * @memberof RespCompanyVipApply
     */
    id?: number | string

    /**
     * 部门编码
     * @type {string}
     * @memberof RespCompanyVipApply
     */
    pkDeptDoc?: string

    /**
     * 是否接受
     * @type {boolean}
     * @memberof RespCompanyVipApply
     */
    received?: boolean

    /**
     * 更新时间
     * @type {string}
     * @memberof RespCompanyVipApply
     */
    updateTime?: string

}

/**
*
* @export
* @interface RespCompanyVipDetail
*/
export interface RespCompanyVipDetail {

    /**
     * 经销商预付款比例
     * @type {number | string}
     * @memberof RespCompanyVipDetail
     */
    advancePaymentProportion?: number | string

    /**
     * 签约用户id
     * @type {string}
     * @memberof RespCompanyVipDetail
     */
    assignedUserId?: string

    /**
     * 签约用户手机号
     * @type {string}
     * @memberof RespCompanyVipDetail
     */
    assignedUserMobile?: string

    /**
     * 签约用户名称
     * @type {string}
     * @memberof RespCompanyVipDetail
     */
    assignedUserName?: string

    /**
     * 附件
     * @type {string}
     * @memberof RespCompanyVipDetail
     */
    attachFile?: string

    /**
     * 公司id
     * @type {number | string}
     * @memberof RespCompanyVipDetail
     */
    companyId?: number | string

    /**
     * 公司名称
     * @type {string}
     * @memberof RespCompanyVipDetail
     */
    companyName?: string

    /**
     * 合同id
     * @type {number | string}
     * @memberof RespCompanyVipDetail
     */
    contractId?: number | string

    /**
     * 主键id
     * @type {number | string}
     * @memberof RespCompanyVipDetail
     */
    id?: number | string

    /**
     * 1.一般会员
2.认证会员
3.评级会员
4.签约会员
5.交易会员
     * @type {number | string}
     * @memberof RespCompanyVipDetail
     */
    memberTag?: number | string

    /**
     * 说明
     * @type {string}
     * @memberof RespCompanyVipDetail
     */
    remark?: string

    /**
     * 次年服务费折扣
     * @type {number | string}
     * @memberof RespCompanyVipDetail
     */
    serviceFeeDiscount?: number | string

    /**
     * 签约时间
     * @type {string}
     * @memberof RespCompanyVipDetail
     */
    signTime?: string

    /**
     * 签约年份
     * @type {string}
     * @memberof RespCompanyVipDetail
     */
    signYear?: string

    /**
     * 状态 0：失效 1：生效
     * @type {number | string}
     * @memberof RespCompanyVipDetail
     */
    status?: number | string

    /**
     * 信用评级
     * @type {string}
     * @memberof RespCompanyVipDetail
     */
    vipCreditLevel?: string

    /**
     * 单项目单笔最高金额 (万元)
     * @type {number | string}
     * @memberof RespCompanyVipDetail
     */
    vipObjectMaxAmount?: number | string

    /**
     * 可代采购额度 (万元)
     * @type {number | string}
     * @memberof RespCompanyVipDetail
     */
    vipPurchaseQuota?: number | string

    /**
     * vip规则
     * @type {string}
     * @memberof RespCompanyVipDetail
     */
    vipRule?: string

    /**
     * vip规则id
     * @type {number | string}
     * @memberof RespCompanyVipDetail
     */
    vipRuleId?: number | string

    /**
     * 服务费
     * @type {number | string}
     * @memberof RespCompanyVipDetail
     */
    vipServiceFee?: number | string

    /**
     * vip目标
     * @type {number | string}
     * @memberof RespCompanyVipDetail
     */
    vipTarget?: number | string

}

/**
*
* @export
* @interface RespCompanyVipList
*/
export interface RespCompanyVipList {

    /**
     * 公司vip列表
     * @type {Array<RespCompanyVipDetail>}
     * @memberof RespCompanyVipList
     */
    companyVipList?: Array<RespCompanyVipDetail>

    /**
     * 最新修改人
     * @type {string}
     * @memberof RespCompanyVipList
     */
    updateBy?: string

    /**
     * 最新修改人手机号
     * @type {string}
     * @memberof RespCompanyVipList
     */
    updateByMobile?: string

    /**
     * 最新修改时间
     * @type {string}
     * @memberof RespCompanyVipList
     */
    updateTime?: string

}

/**
*
* @export
* @interface RespCompanyVipManager
*/
export interface RespCompanyVipManager {

    /**
     * 经销商预付款比例
     * @type {number | string}
     * @memberof RespCompanyVipManager
     */
    advancePaymentProportion?: number | string

    /**
     * 公司id
     * @type {number | string}
     * @memberof RespCompanyVipManager
     */
    companyId?: number | string

    /**
     * 公司名称
     * @type {string}
     * @memberof RespCompanyVipManager
     */
    companyName?: string

    /**
     * 签约人
     * @type {string}
     * @memberof RespCompanyVipManager
     */
    createBy?: string

    /**
     * 所属分部
     * @type {string}
     * @memberof RespCompanyVipManager
     */
    deptName?: string

    /**
     * 次年服务费折扣
     * @type {number | string}
     * @memberof RespCompanyVipManager
     */
    serviceFeeDiscount?: number | string

    /**
     * 更新时间
     * @type {string}
     * @memberof RespCompanyVipManager
     */
    updateTime?: string

    /**
     * 信用评级
     * @type {string}
     * @memberof RespCompanyVipManager
     */
    vipCreditLevel?: string

    /**
     * 单项目单笔最高金额 (万元)
     * @type {number | string}
     * @memberof RespCompanyVipManager
     */
    vipObjectMaxAmount?: number | string

    /**
     * 可代采购额度 (万元)
     * @type {number | string}
     * @memberof RespCompanyVipManager
     */
    vipPurchaseQuota?: number | string

    /**
     * vip规则
     * @type {string}
     * @memberof RespCompanyVipManager
     */
    vipRule?: string

    /**
     * 服务费
     * @type {number | string}
     * @memberof RespCompanyVipManager
     */
    vipServiceFee?: number | string

    /**
     * vip目标
     * @type {number | string}
     * @memberof RespCompanyVipManager
     */
    vipTarget?: number | string

}

/**
*
* @export
* @interface RespCompanyVipManagerLoan
*/
export interface RespCompanyVipManagerLoan {

    /**
     * 筛选的数量
     * @type {number | string}
     * @memberof RespCompanyVipManagerLoan
     */
    count?: number | string

    /**
     * 筛选vip总额
     * @type {number | string}
     * @memberof RespCompanyVipManagerLoan
     */
    totalTarget?: number | string

    /**
     * 筛选的VIP数量
     * @type {number | string}
     * @memberof RespCompanyVipManagerLoan
     */
    vipCount?: number | string

}

/**
*
* @export
* @interface RespCreditApproveRecord
*/
export interface RespCreditApproveRecord {

    /**
     * 公司标识
     * @type {number | string}
     * @memberof RespCreditApproveRecord
     */
    companyId?: number | string

    /**
     * 创建人
     * @type {string}
     * @memberof RespCreditApproveRecord
     */
    createBy?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof RespCreditApproveRecord
     */
    createTime?: string

    /**
     * 授信资料打回记录标识
     * @type {number | string}
     * @memberof RespCreditApproveRecord
     */
    creditApproveRecordId?: number | string

    /**
     * 备注
     * @type {string}
     * @memberof RespCreditApproveRecord
     */
    remark?: string

    /**
     * 二级类目名称集合
     * @type {string}
     * @memberof RespCreditApproveRecord
     */
    secondCategoryNames?: string

    /**
     * 模板ids
     * @type {string}
     * @memberof RespCreditApproveRecord
     */
    templateIds?: string

}

/**
*
* @export
* @interface RespCrmClue
*/
export interface RespCrmClue {

    /**
     * 详细地址
     * @type {string}
     * @memberof RespCrmClue
     */
    address?: string

    /**
     * 线索头像
     * @type {string}
     * @memberof RespCrmClue
     */
    avatarUrl?: string

    /**
     * 中标信息
     * @type {string}
     * @memberof RespCrmClue
     */
    bidInfo?: string

    /**
     * 市id
     * @type {string}
     * @memberof RespCrmClue
     */
    cityId?: string

    /**
     * 市名称
     * @type {string}
     * @memberof RespCrmClue
     */
    cityName?: string

    /**
     * 企业名称
     * @type {string}
     * @memberof RespCrmClue
     */
    companyName?: string

    /**
     * 已合作甲方
     * @type {string}
     * @memberof RespCrmClue
     */
    cooperatedFirstParty?: string

    /**
     * 区id
     * @type {string}
     * @memberof RespCrmClue
     */
    countryId?: string

    /**
     * 区名称
     * @type {string}
     * @memberof RespCrmClue
     */
    countryName?: string

    /**
     * 创建者名称
     * @type {string}
     * @memberof RespCrmClue
     */
    createBy?: string

    /**
     * 创建者手机号
     * @type {string}
     * @memberof RespCrmClue
     */
    createPhone?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof RespCrmClue
     */
    createTime?: string

    /**
     * 客户经理所属分部
     * @type {string}
     * @memberof RespCrmClue
     */
    customerDeptName?: string

    /**
     * 客户经理手机号
     * @type {string}
     * @memberof RespCrmClue
     */
    customerMobile?: string

    /**
     * 客户经理名称
     * @type {string}
     * @memberof RespCrmClue
     */
    customerName?: string

    /**
     * 主营品牌
     * @type {string}
     * @memberof RespCrmClue
     */
    deviceBrand?: string

    /**
     * 主营品类 1：空调 2：采暖 3：新风 4：净水 5：智能化 6：辅材 7：电梯 8：其他
     * @type {string}
     * @memberof RespCrmClue
     */
    deviceCategory?: string

    /**
     * 跟进记录列表
     * @type {Array<RespFlowUpRecord>}
     * @memberof RespCrmClue
     */
    flowUpRecordList?: Array<RespFlowUpRecord>

    /**
     * 主键id
     * @type {number | string}
     * @memberof RespCrmClue
     */
    id?: number | string

    /**
     * 厂商信息
     * @type {string}
     * @memberof RespCrmClue
     */
    manufacturer?: string

    /**
     * 婚姻状态 1：未婚 2：已婚 3：离异
     * @type {number | string}
     * @memberof RespCrmClue
     */
    maritalStatus?: number | string

    /**
     * 老客户信息
     * @type {string}
     * @memberof RespCrmClue
     */
    oldCompanyName?: string

    /**
     * 来源 1：好橙工 2：享钱 3：单分享 4：crm 5：第三方渠道
     * @type {number | string}
     * @memberof RespCrmClue
     */
    origin?: number | string

    /**
     * 合作伙伴
     * @type {string}
     * @memberof RespCrmClue
     */
    partner?: string

    /**
     * 省id
     * @type {string}
     * @memberof RespCrmClue
     */
    provinceId?: string

    /**
     * 省名称
     * @type {string}
     * @memberof RespCrmClue
     */
    provinceName?: string

    /**
     * 客户座机号
     * @type {string}
     * @memberof RespCrmClue
     */
    telephone?: string

    /**
     * 更新人
     * @type {string}
     * @memberof RespCrmClue
     */
    updateBy?: string

    /**
     * 更新时间
     * @type {string}
     * @memberof RespCrmClue
     */
    updateTime?: string

    /**
     * 客户手机号
     * @type {string}
     * @memberof RespCrmClue
     */
    userMobile?: string

    /**
     * 客户姓名
     * @type {string}
     * @memberof RespCrmClue
     */
    userName?: string

    /**
     * 客户来源 1：销售自拓 2：会销活动 3：厂商介绍 4:老客户转介绍 5:总部分配 6: 客户继承 7：其他
     * @type {number | string}
     * @memberof RespCrmClue
     */
    userSource?: number | string

    /**
     * 常做项目类型 1:居住建筑 2:市政建筑 3:企事业建筑 4:商业娱乐建筑 5:生产性建筑 6:其他
     * @type {string}
     * @memberof RespCrmClue
     */
    usualProjectType?: string

    /**
     * 常做项目类型名称
     * @type {string}
     * @memberof RespCrmClue
     */
    usualProjectTypeName?: string

    /**
     * 常用区域品牌名称
     * @type {string}
     * @memberof RespCrmClue
     */
    usualRegionBrand?: string

    /**
     * 从业年限 1:3年以下 2: 3-5年 3: 5-8年 4: 8-10年 5：10-15年 6:15-20年 7：20年以上
     * @type {number | string}
     * @memberof RespCrmClue
     */
    workingYears?: number | string

}

/**
*
* @export
* @interface RespCrmCluePage
*/
export interface RespCrmCluePage {

    /**
     * 线索头像
     * @type {string}
     * @memberof RespCrmCluePage
     */
    avatarUrl?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof RespCrmCluePage
     */
    createTime?: string

    /**
     * 是否是好友
     * @type {boolean}
     * @memberof RespCrmCluePage
     */
    friend?: boolean

    /**
     * 主键id
     * @type {number | string}
     * @memberof RespCrmCluePage
     */
    id?: number | string

    /**
     * 是否注册
     * @type {boolean}
     * @memberof RespCrmCluePage
     */
    register?: boolean

    /**
     * 客户手机号
     * @type {string}
     * @memberof RespCrmCluePage
     */
    userMobile?: string

    /**
     * 客户姓名
     * @type {string}
     * @memberof RespCrmCluePage
     */
    userName?: string

}

/**
*
* @export
* @interface RespCrmCompany
*/
export interface RespCrmCompany {

    /**
     * 代理级别 1：一级代理商 2：经销商 3：其他
     * @type {number | string}
     * @memberof RespCrmCompany
     */
    agentLevel?: number | string

    /**
     * 认证时间
     * @type {string}
     * @memberof RespCrmCompany
     */
    authenticationTime?: string

    /**
     * 业务类型及比例
     * @type {string}
     * @memberof RespCrmCompany
     */
    businessType?: string

    /**
     * 橙工采标签：0-未激活， 1-初级，2-橙级
     * @type {number | string}
     * @memberof RespCrmCompany
     */
    chengGongCaiLable?: number | string

    /**
     * 市id
     * @type {string}
     * @memberof RespCrmCompany
     */
    cityId?: string

    /**
     * 市名称
     * @type {string}
     * @memberof RespCrmCompany
     */
    cityName?: string

    /**
     * 企业code
     * @type {string}
     * @memberof RespCrmCompany
     */
    companyCode?: string

    /**
     * 企业id
     * @type {number | string}
     * @memberof RespCrmCompany
     */
    companyId?: number | string

    /**
     * 企业名称
     * @type {string}
     * @memberof RespCrmCompany
     */
    companyName?: string

    /**
     * 企业类型 1：体系内 2：体系外
     * @type {number | string}
     * @memberof RespCrmCompany
     */
    companyType?: number | string

    /**
     * 联系地址
     * @type {string}
     * @memberof RespCrmCompany
     */
    contactAddress?: string

    /**
     * 区id
     * @type {string}
     * @memberof RespCrmCompany
     */
    countryId?: string

    /**
     * 区名称
     * @type {string}
     * @memberof RespCrmCompany
     */
    countryName?: string

    /**
     * 创建人手机号
     * @type {number | string}
     * @memberof RespCrmCompany
     */
    createBy?: number | string

    /**
     * 创建人工号
     * @type {string}
     * @memberof RespCrmCompany
     */
    createCode?: string

    /**
     * 创建人姓名
     * @type {string}
     * @memberof RespCrmCompany
     */
    createName?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof RespCrmCompany
     */
    createTime?: string

    /**
     * 客户分类：1黑名单 2白名单 3待审核
     * @type {number | string}
     * @memberof RespCrmCompany
     */
    customerType?: number | string

    /**
     * 发展在线公司编码
     * @type {string}
     * @memberof RespCrmCompany
     */
    developOnlineCompanyCode?: string

    /**
     * 发展在线公司名称
     * @type {string}
     * @memberof RespCrmCompany
     */
    developOnlineCompanyName?: string

    /**
     * 主营品牌
     * @type {string}
     * @memberof RespCrmCompany
     */
    deviceBrand?: string

    /**
     * 主营品类 1：空调 2：采暖 3：新风 4：净水 5：智能化 6：辅材 7：电梯 8：其他 9:电器 10:热水器
     * @type {number | string}
     * @memberof RespCrmCompany
     */
    deviceCategory?: number | string

    /**
     * 企业邮箱
     * @type {string}
     * @memberof RespCrmCompany
     */
    email?: string

    /**
     * 主键id
     * @type {number | string}
     * @memberof RespCrmCompany
     */
    id?: number | string

    /**
     * 是否认证
     * @type {boolean}
     * @memberof RespCrmCompany
     */
    isAuthentication?: boolean

    /**
     * 是否关联平台公司
     * @type {number | string}
     * @memberof RespCrmCompany
     */
    isRelated?: number | string

    /**
     * 主辅材品牌
     * @type {string}
     * @memberof RespCrmCompany
     */
    materialsBrand?: string

    /**
     * 主辅材渠道 1：厂商直采 2：一节囤货商采购 3：经销商采购
     * @type {string}
     * @memberof RespCrmCompany
     */
    materialsChannel?: string

    /**
     * 1.一般会员
2.认证会员
3.评级会员
4.签约会员
5.交易会员
     * @type {number | string}
     * @memberof RespCrmCompany
     */
    memberTag?: number | string

    /**
     * EHR分部主键
     * @type {string}
     * @memberof RespCrmCompany
     */
    pkDeptdoc?: string

    /**
     * 省id
     * @type {string}
     * @memberof RespCrmCompany
     */
    provinceId?: string

    /**
     * 省名称
     * @type {string}
     * @memberof RespCrmCompany
     */
    provinceName?: string

    /**
     * 服务能力 1：有 2：无
     * @type {number | string}
     * @memberof RespCrmCompany
     */
    serviceCapability?: number | string

    /**
     * 服务能力
     * @type {string}
     * @memberof RespCrmCompany
     */
    serviceCapabilityDetail?: string

    /**
     * 近3年的年度工程规模 1：1000万以内 2：1001-3000万 3：3001-5000万 4:5001-1亿 5：1亿-2亿 6:2亿以上
     * @type {number | string}
     * @memberof RespCrmCompany
     */
    threeYearProjectScale?: number | string

    /**
     * 天眼查公司id
     * @type {number | string}
     * @memberof RespCrmCompany
     */
    tyCompanyId?: number | string

    /**
     * 项目类别 1：地产项目 2：政府共建项目 3：市政项目 3：办公楼 4：厂房 5：其他
     * @type {number | string}
     * @memberof RespCrmCompany
     */
    type?: number | string

    /**
     * 会员id
     * @type {number | string}
     * @memberof RespCrmCompany
     */
    userId?: number | string

}

/**
*
* @export
* @interface RespCrmCompanyBossDetail
*/
export interface RespCrmCompanyBossDetail {

    /**
     * 经销商预付款比例
     * @type {number | string}
     * @memberof RespCrmCompanyBossDetail
     */
    advancePaymentProportion?: number | string

    /**
     * 代理级别 1：一级代理商 2：经销商 3：其他
     * @type {number | string}
     * @memberof RespCrmCompanyBossDetail
     */
    agentLevel?: number | string

    /**
     * 认证人姓名
     * @type {string}
     * @memberof RespCrmCompanyBossDetail
     */
    authenticationBy?: string

    /**
     * 认证人工号
     * @type {string}
     * @memberof RespCrmCompanyBossDetail
     */
    authenticationCode?: string

    /**
     * 认证人手机号
     * @type {string}
     * @memberof RespCrmCompanyBossDetail
     */
    authenticationPhone?: string

    /**
     * 认证时间
     * @type {string}
     * @memberof RespCrmCompanyBossDetail
     */
    authenticationTime?: string

    /**
     * 业务类型及比例
     * @type {string}
     * @memberof RespCrmCompanyBossDetail
     */
    businessType?: string

    /**
     * 橙工采标签：0-未激活， 1-初级，2-橙级
     * @type {number | string}
     * @memberof RespCrmCompanyBossDetail
     */
    chengGongCaiLable?: number | string

    /**
     * 城市id
     * @type {string}
     * @memberof RespCrmCompanyBossDetail
     */
    cityId?: string

    /**
     * 市名称
     * @type {string}
     * @memberof RespCrmCompanyBossDetail
     */
    cityName?: string

    /**
     * 企业编码
     * @type {string}
     * @memberof RespCrmCompanyBossDetail
     */
    companyCode?: string

    /**
     * 企业主键id
     * @type {number | string}
     * @memberof RespCrmCompanyBossDetail
     */
    companyId?: number | string

    /**
     * 企业名称
     * @type {string}
     * @memberof RespCrmCompanyBossDetail
     */
    companyName?: string

    /**
     * 企业类型 1：体系内 2：体系外
     * @type {number | string}
     * @memberof RespCrmCompanyBossDetail
     */
    companyType?: number | string

    /**
     * 签约合同id
     * @type {number | string}
     * @memberof RespCrmCompanyBossDetail
     */
    contractId?: number | string

    /**
     * 区id
     * @type {string}
     * @memberof RespCrmCompanyBossDetail
     */
    countryId?: string

    /**
     * 区/县名称
     * @type {string}
     * @memberof RespCrmCompanyBossDetail
     */
    countryName?: string

    /**
     * 创建人
     * @type {string}
     * @memberof RespCrmCompanyBossDetail
     */
    createBy?: string

    /**
     * 创建人工号
     * @type {string}
     * @memberof RespCrmCompanyBossDetail
     */
    createCode?: string

    /**
     * 创建人手机号
     * @type {string}
     * @memberof RespCrmCompanyBossDetail
     */
    createPhone?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof RespCrmCompanyBossDetail
     */
    createTime?: string

    /**
     * 企业信用
     * @type {string}
     * @memberof RespCrmCompanyBossDetail
     */
    creditLevel?: string

    /**
     * 客户经理
     * @type {string}
     * @memberof RespCrmCompanyBossDetail
     */
    customerManager?: string

    /**
     * 客户分类：1黑名单 2白名单 3待审核
     * @type {number | string}
     * @memberof RespCrmCompanyBossDetail
     */
    customerType?: number | string

    /**
     * 发展在线公司编码
     * @type {string}
     * @memberof RespCrmCompanyBossDetail
     */
    developOnlineCompanyCode?: string

    /**
     * 发展在线公司名称
     * @type {string}
     * @memberof RespCrmCompanyBossDetail
     */
    developOnlineCompanyName?: string

    /**
     * 主营品牌
     * @type {string}
     * @memberof RespCrmCompanyBossDetail
     */
    deviceBrand?: string

    /**
     * 主营品类 1：空调 2：采暖 3：新风 4：净水 5：智能化 6：辅材 7：电梯 8：其他 9:电器 10:热水器
     * @type {number | string}
     * @memberof RespCrmCompanyBossDetail
     */
    deviceCategory?: number | string

    /**
     * 资料状态 1：待提交 2：已提交 3：已通过 4：已打回
     * @type {number | string}
     * @memberof RespCrmCompanyBossDetail
     */
    documentStatus?: number | string

    /**
     * 成立日期
     * @type {string}
     * @memberof RespCrmCompanyBossDetail
     */
    estiblishTime?: string

    /**
     * 是否认证
     * @type {boolean}
     * @memberof RespCrmCompanyBossDetail
     */
    isAuthentication?: boolean

    /**
     * 是否关联平台公司
     * @type {boolean}
     * @memberof RespCrmCompanyBossDetail
     */
    isRelated?: boolean

    /**
     * 主辅材品牌
     * @type {string}
     * @memberof RespCrmCompanyBossDetail
     */
    materialsBrand?: string

    /**
     * 主辅材渠道 1：厂商直采 2：一节囤货商采购 3：经销商采购
     * @type {string}
     * @memberof RespCrmCompanyBossDetail
     */
    materialsChannel?: string

    /**
     * 1.一般会员
2.认证会员
3.评级会员
4.签约会员
5.交易会员
     * @type {number | string}
     * @memberof RespCrmCompanyBossDetail
     */
    memberTag?: number | string

    /**
     * EHR部门主键
     * @type {string}
     * @memberof RespCrmCompanyBossDetail
     */
    pkDeptDoc?: string

    /**
     * 项目列表
     * @type {Array<Project>}
     * @memberof RespCrmCompanyBossDetail
     */
    projects?: Array<Project>

    /**
     * 省id
     * @type {string}
     * @memberof RespCrmCompanyBossDetail
     */
    provinceId?: string

    /**
     * 省名称
     * @type {string}
     * @memberof RespCrmCompanyBossDetail
     */
    provinceName?: string

    /**
     * 采购额度
     * @type {number | string}
     * @memberof RespCrmCompanyBossDetail
     */
    purchaseQuota?: number | string

    /**
     * 建筑资质
     * @type {Array<TianyanCompanyQualification>}
     * @memberof RespCrmCompanyBossDetail
     */
    qualification?: Array<TianyanCompanyQualification>

    /**
     * 成立日期
     * @type {string}
     * @memberof RespCrmCompanyBossDetail
     */
    regCapital?: string

    /**
     * 成立日期
     * @type {string}
     * @memberof RespCrmCompanyBossDetail
     */
    regStatus?: string

    /**
     * 关联公司编码
     * @type {string}
     * @memberof RespCrmCompanyBossDetail
     */
    relationCompanyCode?: string

    /**
     * 关联公司名称
     * @type {string}
     * @memberof RespCrmCompanyBossDetail
     */
    relationCompanyName?: string

    /**
     * 服务能力 1：有 2：无
     * @type {number | string}
     * @memberof RespCrmCompanyBossDetail
     */
    serviceCapability?: number | string

    /**
     * 服务能力
     * @type {string}
     * @memberof RespCrmCompanyBossDetail
     */
    serviceCapabilityDetail?: string

    /**
     * 服务费
     * @type {number | string}
     * @memberof RespCrmCompanyBossDetail
     */
    serviceFee?: number | string

    /**
     * 次年服务费折扣
     * @type {number | string}
     * @memberof RespCrmCompanyBossDetail
     */
    serviceFeeDiscount?: number | string

    /**
     * 签约年份
     * @type {string}
     * @memberof RespCrmCompanyBossDetail
     */
    signYear?: string

    /**
     * 分部编码
     * @type {string}
     * @memberof RespCrmCompanyBossDetail
     */
    subsectionCode?: string

    /**
     * 分部名称
     * @type {string}
     * @memberof RespCrmCompanyBossDetail
     */
    subsectionName?: string

    /**
     * 近3年的年度工程规模 1：1000万以内 2：1001-3000万 3：3001-5000万 4:5001-1亿 5：1亿-2亿 6:2亿以上
     * @type {number | string}
     * @memberof RespCrmCompanyBossDetail
     */
    threeYearProjectScale?: number | string

    /**
     * 天眼查公司id
     * @type {string}
     * @memberof RespCrmCompanyBossDetail
     */
    tyCompanyId?: string

    /**
     * 项目类别 1：地产项目 2：政府共建项目 3：市政项目 3：办公楼 4：厂房 5：其他
     * @type {number | string}
     * @memberof RespCrmCompanyBossDetail
     */
    type?: number | string

    /**
     * 维护人姓名
     * @type {string}
     * @memberof RespCrmCompanyBossDetail
     */
    updateBy?: string

    /**
     * 维护人
     * @type {string}
     * @memberof RespCrmCompanyBossDetail
     */
    updatePhone?: string

    /**
     * 维护时间
     * @type {string}
     * @memberof RespCrmCompanyBossDetail
     */
    updateTime?: string

    /**
     * 管理员账号
     * @type {string}
     * @memberof RespCrmCompanyBossDetail
     */
    userAccount?: string

    /**
     * 管理员姓名
     * @type {string}
     * @memberof RespCrmCompanyBossDetail
     */
    userName?: string

    /**
     * 信用评级
     * @type {string}
     * @memberof RespCrmCompanyBossDetail
     */
    vipCreditLevel?: string

    /**
     * vipId
     * @type {number | string}
     * @memberof RespCrmCompanyBossDetail
     */
    vipId?: number | string

    /**
     * 单项目单笔最高金额 (万元)
     * @type {number | string}
     * @memberof RespCrmCompanyBossDetail
     */
    vipObjectMaxAmount?: number | string

    /**
     * 可代采购额度 (万元)
     * @type {number | string}
     * @memberof RespCrmCompanyBossDetail
     */
    vipPurchaseQuota?: number | string

    /**
     * 企业vip等级
     * @type {string}
     * @memberof RespCrmCompanyBossDetail
     */
    vipRule?: string

    /**
     * 企业vipId
     * @type {number | string}
     * @memberof RespCrmCompanyBossDetail
     */
    vipRuleId?: number | string

    /**
     * 服务费
     * @type {number | string}
     * @memberof RespCrmCompanyBossDetail
     */
    vipServiceFee?: number | string

    /**
     * vip目标
     * @type {number | string}
     * @memberof RespCrmCompanyBossDetail
     */
    vipTarget?: number | string

}

/**
*
* @export
* @interface RespCrmCompanyContact
*/
export interface RespCrmCompanyContact {

    /**
     * 企业id
     * @type {number | string}
     * @memberof RespCrmCompanyContact
     */
    companyId?: number | string

    /**
     * 企业名称
     * @type {string}
     * @memberof RespCrmCompanyContact
     */
    companyName?: string

    /**
     * 联系地址
     * @type {string}
     * @memberof RespCrmCompanyContact
     */
    contactAddress?: string

    /**
     * 电子邮箱
     * @type {string}
     * @memberof RespCrmCompanyContact
     */
    email?: string

}

/**
*
* @export
* @interface RespCrmCompanyDetail
*/
export interface RespCrmCompanyDetail {

    /**
     * 代理级别 1：一级代理商 2：经销商 3：其他
     * @type {number | string}
     * @memberof RespCrmCompanyDetail
     */
    agentLevel?: number | string

    /**
     * 认证时间
     * @type {string}
     * @memberof RespCrmCompanyDetail
     */
    authenticationTime?: string

    /**
     * 业务类型及比例
     * @type {string}
     * @memberof RespCrmCompanyDetail
     */
    businessType?: string

    /**
     * 橙工采标签：0-未激活， 1-初级，2-橙级
     * @type {number | string}
     * @memberof RespCrmCompanyDetail
     */
    chengGongCaiLable?: number | string

    /**
     * 市id
     * @type {string}
     * @memberof RespCrmCompanyDetail
     */
    cityId?: string

    /**
     * 市名称
     * @type {string}
     * @memberof RespCrmCompanyDetail
     */
    cityName?: string

    /**
     * 企业code
     * @type {string}
     * @memberof RespCrmCompanyDetail
     */
    companyCode?: string

    /**
     * 企业id
     * @type {number | string}
     * @memberof RespCrmCompanyDetail
     */
    companyId?: number | string

    /**
     * 企业名称
     * @type {string}
     * @memberof RespCrmCompanyDetail
     */
    companyName?: string

    /**
     * 企业类型 1：体系内 2：体系外
     * @type {number | string}
     * @memberof RespCrmCompanyDetail
     */
    companyType?: number | string

    /**
     * 联系地址
     * @type {string}
     * @memberof RespCrmCompanyDetail
     */
    contactAddress?: string

    /**
     * 区id
     * @type {string}
     * @memberof RespCrmCompanyDetail
     */
    countryId?: string

    /**
     * 区名称
     * @type {string}
     * @memberof RespCrmCompanyDetail
     */
    countryName?: string

    /**
     * 创建人手机号
     * @type {number | string}
     * @memberof RespCrmCompanyDetail
     */
    createBy?: number | string

    /**
     * 创建人工号
     * @type {string}
     * @memberof RespCrmCompanyDetail
     */
    createCode?: string

    /**
     * 创建人姓名
     * @type {string}
     * @memberof RespCrmCompanyDetail
     */
    createName?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof RespCrmCompanyDetail
     */
    createTime?: string

    /**
     * 企业信用
     * @type {string}
     * @memberof RespCrmCompanyDetail
     */
    creditLevel?: string

    /**
     * 客户分类：1黑名单 2白名单 3待审核
     * @type {number | string}
     * @memberof RespCrmCompanyDetail
     */
    customerType?: number | string

    /**
     * 发展在线公司编码
     * @type {string}
     * @memberof RespCrmCompanyDetail
     */
    developOnlineCompanyCode?: string

    /**
     * 发展在线公司名称
     * @type {string}
     * @memberof RespCrmCompanyDetail
     */
    developOnlineCompanyName?: string

    /**
     * 主营品牌
     * @type {string}
     * @memberof RespCrmCompanyDetail
     */
    deviceBrand?: string

    /**
     * 主营品类 1：空调 2：采暖 3：新风 4：净水 5：智能化 6：辅材 7：电梯 8：其他 9:电器 10:热水器
     * @type {number | string}
     * @memberof RespCrmCompanyDetail
     */
    deviceCategory?: number | string

    /**
     * 企业邮箱
     * @type {string}
     * @memberof RespCrmCompanyDetail
     */
    email?: string

    /**
     * 成立日期
     * @type {string}
     * @memberof RespCrmCompanyDetail
     */
    estiblishTime?: string

    /**
     * 主键id
     * @type {number | string}
     * @memberof RespCrmCompanyDetail
     */
    id?: number | string

    /**
     * 是否认证
     * @type {boolean}
     * @memberof RespCrmCompanyDetail
     */
    isAuthentication?: boolean

    /**
     * 是否关联平台公司
     * @type {number | string}
     * @memberof RespCrmCompanyDetail
     */
    isRelated?: number | string

    /**
     * 法人证件号
     * @type {string}
     * @memberof RespCrmCompanyDetail
     */
    legalCardNumber?: string

    /**
     * 法人姓名
     * @type {string}
     * @memberof RespCrmCompanyDetail
     */
    legalName?: string

    /**
     * 主辅材品牌
     * @type {string}
     * @memberof RespCrmCompanyDetail
     */
    materialsBrand?: string

    /**
     * 主辅材渠道 1：厂商直采 2：一节囤货商采购 3：经销商采购
     * @type {string}
     * @memberof RespCrmCompanyDetail
     */
    materialsChannel?: string

    /**
     * 1.一般会员
2.认证会员
3.评级会员
4.签约会员
5.交易会员
     * @type {number | string}
     * @memberof RespCrmCompanyDetail
     */
    memberTag?: number | string

    /**
     * 姓名
     * @type {string}
     * @memberof RespCrmCompanyDetail
     */
    name?: string

    /**
     * 认证人姓名
     * @type {string}
     * @memberof RespCrmCompanyDetail
     */
    openName?: string

    /**
     * 认证人手机号
     * @type {string}
     * @memberof RespCrmCompanyDetail
     */
    openPhone?: string

    /**
     * 手机号
     * @type {string}
     * @memberof RespCrmCompanyDetail
     */
    phone?: string

    /**
     * EHR分部主键
     * @type {string}
     * @memberof RespCrmCompanyDetail
     */
    pkDeptdoc?: string

    /**
     * 项目列表
     * @type {Array<RespProject>}
     * @memberof RespCrmCompanyDetail
     */
    projects?: Array<RespProject>

    /**
     * 省id
     * @type {string}
     * @memberof RespCrmCompanyDetail
     */
    provinceId?: string

    /**
     * 省名称
     * @type {string}
     * @memberof RespCrmCompanyDetail
     */
    provinceName?: string

    /**
     * 采购额度
     * @type {number | string}
     * @memberof RespCrmCompanyDetail
     */
    purchaseQuota?: number | string

    /**
     * 建筑资质
     * @type {Array<TianyanCompanyQualification>}
     * @memberof RespCrmCompanyDetail
     */
    qualification?: Array<TianyanCompanyQualification>

    /**
     * 注册资本
     * @type {string}
     * @memberof RespCrmCompanyDetail
     */
    regCapital?: string

    /**
     * 经营状态
     * @type {string}
     * @memberof RespCrmCompanyDetail
     */
    regStatus?: string

    /**
     * 服务能力 1：有 2：无
     * @type {number | string}
     * @memberof RespCrmCompanyDetail
     */
    serviceCapability?: number | string

    /**
     * 服务能力
     * @type {string}
     * @memberof RespCrmCompanyDetail
     */
    serviceCapabilityDetail?: string

    /**
     * 服务费
     * @type {number | string}
     * @memberof RespCrmCompanyDetail
     */
    serviceFee?: number | string

    /**
     * 次年服务费折扣
     * @type {number | string}
     * @memberof RespCrmCompanyDetail
     */
    serviceFeeDiscount?: number | string

    /**
     * 纳税人识别号
     * @type {string}
     * @memberof RespCrmCompanyDetail
     */
    taxpayerIdNumber?: string

    /**
     * 近3年的年度工程规模 1：1000万以内 2：1001-3000万 3：3001-5000万 4:5001-1亿 5：1亿-2亿 6:2亿以上
     * @type {number | string}
     * @memberof RespCrmCompanyDetail
     */
    threeYearProjectScale?: number | string

    /**
     * 天眼查公司id
     * @type {number | string}
     * @memberof RespCrmCompanyDetail
     */
    tyCompanyId?: number | string

    /**
     * 项目类别 1：地产项目 2：政府共建项目 3：市政项目 3：办公楼 4：厂房 5：其他
     * @type {number | string}
     * @memberof RespCrmCompanyDetail
     */
    type?: number | string

    /**
     * 会员id
     * @type {number | string}
     * @memberof RespCrmCompanyDetail
     */
    userId?: number | string

    /**
     * 企业vip等级
     * @type {string}
     * @memberof RespCrmCompanyDetail
     */
    vipRule?: string

    /**
     * vip目标
     * @type {number | string}
     * @memberof RespCrmCompanyDetail
     */
    vipTarget?: number | string

}

/**
*
* @export
* @interface RespCrmCompanyPage
*/
export interface RespCrmCompanyPage {

    /**
     * 代理级别 1：一级代理商 2：经销商 3：其他
     * @type {number | string}
     * @memberof RespCrmCompanyPage
     */
    agentLevel?: number | string

    /**
     * 认证时间
     * @type {string}
     * @memberof RespCrmCompanyPage
     */
    authenticationTime?: string

    /**
     * 业务类型及比例
     * @type {string}
     * @memberof RespCrmCompanyPage
     */
    businessType?: string

    /**
     * 橙工采标签：0-未激活， 1-初级，2-橙级
     * @type {number | string}
     * @memberof RespCrmCompanyPage
     */
    chengGongCaiLable?: number | string

    /**
     * 市id
     * @type {string}
     * @memberof RespCrmCompanyPage
     */
    cityId?: string

    /**
     * 市名称
     * @type {string}
     * @memberof RespCrmCompanyPage
     */
    cityName?: string

    /**
     * 企业code
     * @type {string}
     * @memberof RespCrmCompanyPage
     */
    companyCode?: string

    /**
     * 企业id
     * @type {number | string}
     * @memberof RespCrmCompanyPage
     */
    companyId?: number | string

    /**
     * 企业名称
     * @type {string}
     * @memberof RespCrmCompanyPage
     */
    companyName?: string

    /**
     * 企业类型 1：体系内 2：体系外
     * @type {number | string}
     * @memberof RespCrmCompanyPage
     */
    companyType?: number | string

    /**
     * 联系地址
     * @type {string}
     * @memberof RespCrmCompanyPage
     */
    contactAddress?: string

    /**
     * 区id
     * @type {string}
     * @memberof RespCrmCompanyPage
     */
    countryId?: string

    /**
     * 区名称
     * @type {string}
     * @memberof RespCrmCompanyPage
     */
    countryName?: string

    /**
     * 创建人手机号
     * @type {number | string}
     * @memberof RespCrmCompanyPage
     */
    createBy?: number | string

    /**
     * 创建人工号
     * @type {string}
     * @memberof RespCrmCompanyPage
     */
    createCode?: string

    /**
     * 创建人姓名
     * @type {string}
     * @memberof RespCrmCompanyPage
     */
    createName?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof RespCrmCompanyPage
     */
    createTime?: string

    /**
     * 信用到期时间
     * @type {string}
     * @memberof RespCrmCompanyPage
     */
    creditEndTime?: string

    /**
     * 企业信用
     * @type {string}
     * @memberof RespCrmCompanyPage
     */
    creditLevel?: string

    /**
     * 客户分类：1黑名单 2白名单 3待审核
     * @type {number | string}
     * @memberof RespCrmCompanyPage
     */
    customerType?: number | string

    /**
     * 发展在线公司编码
     * @type {string}
     * @memberof RespCrmCompanyPage
     */
    developOnlineCompanyCode?: string

    /**
     * 发展在线公司名称
     * @type {string}
     * @memberof RespCrmCompanyPage
     */
    developOnlineCompanyName?: string

    /**
     * 主营品牌
     * @type {string}
     * @memberof RespCrmCompanyPage
     */
    deviceBrand?: string

    /**
     * 主营品类 1：空调 2：采暖 3：新风 4：净水 5：智能化 6：辅材 7：电梯 8：其他 9:电器 10:热水器
     * @type {number | string}
     * @memberof RespCrmCompanyPage
     */
    deviceCategory?: number | string

    /**
     * 企业邮箱
     * @type {string}
     * @memberof RespCrmCompanyPage
     */
    email?: string

    /**
     * 已采购规模
     * @type {number | string}
     * @memberof RespCrmCompanyPage
     */
    hasPurchaseQuota?: number | string

    /**
     * 已采购规模内容
     * @type {string}
     * @memberof RespCrmCompanyPage
     */
    hasPurchaseQuotaContent?: string

    /**
     * 主键id
     * @type {number | string}
     * @memberof RespCrmCompanyPage
     */
    id?: number | string

    /**
     * 是否认证
     * @type {boolean}
     * @memberof RespCrmCompanyPage
     */
    isAuthentication?: boolean

    /**
     * 是否关联平台公司
     * @type {number | string}
     * @memberof RespCrmCompanyPage
     */
    isRelated?: number | string

    /**
     * 法人证件号
     * @type {string}
     * @memberof RespCrmCompanyPage
     */
    legalCardNumber?: string

    /**
     * 法人姓名
     * @type {string}
     * @memberof RespCrmCompanyPage
     */
    legalName?: string

    /**
     * 主辅材品牌
     * @type {string}
     * @memberof RespCrmCompanyPage
     */
    materialsBrand?: string

    /**
     * 主辅材渠道 1：厂商直采 2：一节囤货商采购 3：经销商采购
     * @type {string}
     * @memberof RespCrmCompanyPage
     */
    materialsChannel?: string

    /**
     * 1.一般会员
2.认证会员
3.评级会员
4.签约会员
5.交易会员
     * @type {number | string}
     * @memberof RespCrmCompanyPage
     */
    memberTag?: number | string

    /**
     * 姓名
     * @type {string}
     * @memberof RespCrmCompanyPage
     */
    name?: string

    /**
     * 开户人姓名
     * @type {string}
     * @memberof RespCrmCompanyPage
     */
    openName?: string

    /**
     * 开户人手机号
     * @type {string}
     * @memberof RespCrmCompanyPage
     */
    openPhone?: string

    /**
     * 手机号
     * @type {string}
     * @memberof RespCrmCompanyPage
     */
    phone?: string

    /**
     * EHR分部主键
     * @type {string}
     * @memberof RespCrmCompanyPage
     */
    pkDeptdoc?: string

    /**
     * 项目数量
     * @type {number | string}
     * @memberof RespCrmCompanyPage
     */
    projectNum?: number | string

    /**
     * 省id
     * @type {string}
     * @memberof RespCrmCompanyPage
     */
    provinceId?: string

    /**
     * 省名称
     * @type {string}
     * @memberof RespCrmCompanyPage
     */
    provinceName?: string

    /**
     * 可代采购额度
     * @type {number | string}
     * @memberof RespCrmCompanyPage
     */
    purchaseQuota?: number | string

    /**
     * 剩余采购额度
     * @type {number | string}
     * @memberof RespCrmCompanyPage
     */
    remainPurchaseQuota?: number | string

    /**
     * 服务能力 1：有 2：无
     * @type {number | string}
     * @memberof RespCrmCompanyPage
     */
    serviceCapability?: number | string

    /**
     * 服务能力
     * @type {string}
     * @memberof RespCrmCompanyPage
     */
    serviceCapabilityDetail?: string

    /**
     * 2.0项目数量
     * @type {number | string}
     * @memberof RespCrmCompanyPage
     */
    supplyProjectNum?: number | string

    /**
     * 纳税人识别号
     * @type {string}
     * @memberof RespCrmCompanyPage
     */
    taxpayerIdNumber?: string

    /**
     * 近3年的年度工程规模 1：1000万以内 2：1001-3000万 3：3001-5000万 4:5001-1亿 5：1亿-2亿 6:2亿以上
     * @type {number | string}
     * @memberof RespCrmCompanyPage
     */
    threeYearProjectScale?: number | string

    /**
     * 天眼查公司id
     * @type {number | string}
     * @memberof RespCrmCompanyPage
     */
    tyCompanyId?: number | string

    /**
     * 项目类别 1：地产项目 2：政府共建项目 3：市政项目 3：办公楼 4：厂房 5：其他
     * @type {number | string}
     * @memberof RespCrmCompanyPage
     */
    type?: number | string

    /**
     * 会员id
     * @type {number | string}
     * @memberof RespCrmCompanyPage
     */
    userId?: number | string

    /**
     * 企业vip等级
     * @type {string}
     * @memberof RespCrmCompanyPage
     */
    vipRule?: string

    /**
     * vip目标
     * @type {number | string}
     * @memberof RespCrmCompanyPage
     */
    vipTarget?: number | string

}

/**
*
* @export
* @interface RespCrmCompanyStatistics
*/
export interface RespCrmCompanyStatistics {

    /**
     * 黑名单
     * @type {number | string}
     * @memberof RespCrmCompanyStatistics
     */
    blackListNum?: number | string

    /**
     * 体系内
     * @type {number | string}
     * @memberof RespCrmCompanyStatistics
     */
    inSystemNum?: number | string

    /**
     * 体系外
     * @type {number | string}
     * @memberof RespCrmCompanyStatistics
     */
    outSystemNum?: number | string

    /**
     * 待审核
     * @type {number | string}
     * @memberof RespCrmCompanyStatistics
     */
    waitToAuditNum?: number | string

    /**
     * 白名单
     * @type {number | string}
     * @memberof RespCrmCompanyStatistics
     */
    whiteListNum?: number | string

}

/**
*
* @export
* @interface RespCrmCpAuthentication
*/
export interface RespCrmCpAuthentication {

    /**
     * 认证状态 1：未认证 2：认证中 3：认证成功 4：认证失败
     * @type {number | string}
     * @memberof RespCrmCpAuthentication
     */
    authenticationStatus?: number | string

    /**
     * 失败原因
     * @type {string}
     * @memberof RespCrmCpAuthentication
     */
    failureReason?: string

}

/**
*
* @export
* @interface RespCrmCustomerBackLogWork
*/
export interface RespCrmCustomerBackLogWork {

    /**
     * 分配的客户经理工号
     * @type {string}
     * @memberof RespCrmCustomerBackLogWork
     */
    assignedUserId?: string

    /**
     * 分配的客户经理手机号
     * @type {string}
     * @memberof RespCrmCustomerBackLogWork
     */
    assignedUserMobile?: string

    /**
     * 分配的客户经理姓名
     * @type {string}
     * @memberof RespCrmCustomerBackLogWork
     */
    assignedUserName?: string

    /**
     * vip所属分部
     * @type {string}
     * @memberof RespCrmCustomerBackLogWork
     */
    companyName?: string

    /**
     * 创建人
     * @type {string}
     * @memberof RespCrmCustomerBackLogWork
     */
    createBy?: string

    /**
     * crm创建人企业微信id
     * @type {string}
     * @memberof RespCrmCustomerBackLogWork
     */
    createCorpUserId?: string

    /**
     * 创建人所属分部
     * @type {string}
     * @memberof RespCrmCustomerBackLogWork
     */
    createDeptName?: string

    /**
     * 创建人手机号
     * @type {string}
     * @memberof RespCrmCustomerBackLogWork
     */
    createPhone?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof RespCrmCustomerBackLogWork
     */
    createTime?: string

    /**
     * 事件id
     * @type {number | string}
     * @memberof RespCrmCustomerBackLogWork
     */
    eventId?: number | string

    /**
     * 主键id
     * @type {number | string}
     * @memberof RespCrmCustomerBackLogWork
     */
    id?: number | string

    /**
     * 是否接受 0：否 1：是
     * @type {number | string}
     * @memberof RespCrmCustomerBackLogWork
     */
    received?: number | string

    /**
     * 拒绝原因
     * @type {string}
     * @memberof RespCrmCustomerBackLogWork
     */
    refuseReason?: string

    /**
     * 说明
     * @type {string}
     * @memberof RespCrmCustomerBackLogWork
     */
    remark?: string

    /**
     * 2.0项目所属客户经理
     * @type {string}
     * @memberof RespCrmCustomerBackLogWork
     */
    supplyProjectCustomerName?: string

    /**
     * 2.0项目所属分部
     * @type {string}
     * @memberof RespCrmCustomerBackLogWork
     */
    supplyProjectDeptName?: string

    /**
     * 事件类型 1：分配人员 2：老客户跟进提醒 3：1.0项目跟进提醒 4：1.0项目合同签约跟进提醒 5:2.0项目分配
     * @type {number | string}
     * @memberof RespCrmCustomerBackLogWork
     */
    type?: number | string

    /**
     * 修改人
     * @type {string}
     * @memberof RespCrmCustomerBackLogWork
     */
    updateBy?: string

    /**
     * 修改时间
     * @type {string}
     * @memberof RespCrmCustomerBackLogWork
     */
    updateTime?: string

}

/**
*
* @export
* @interface RespCrmListCount
*/
export interface RespCrmListCount {

    /**
     * 线索个数
     * @type {number | string}
     * @memberof RespCrmListCount
     */
    clueCount?: number | string

    /**
     * 项目数量
     * @type {number | string}
     * @memberof RespCrmListCount
     */
    companyProjectCount?: number | string

    /**
     * 公司数量
     * @type {number | string}
     * @memberof RespCrmListCount
     */
    crmCompanyCount?: number | string

    /**
     * 2.0项目数量
     * @type {number | string}
     * @memberof RespCrmListCount
     */
    supplyProjectCount?: number | string

    /**
     * 客户数量
     * @type {number | string}
     * @memberof RespCrmListCount
     */
    userCount?: number | string

}

/**
*
* @export
* @interface RespCrmNoHandlerBackLogWork
*/
export interface RespCrmNoHandlerBackLogWork {

    /**
     * 未处理事项值
     * @type {Array<RespCrmCustomerBackLogWork>}
     * @memberof RespCrmNoHandlerBackLogWork
     */
    customerBackLogWorkList?: Array<RespCrmCustomerBackLogWork>

    /**
     * 未处理事项数量
     * @type {number | string}
     * @memberof RespCrmNoHandlerBackLogWork
     */
    number?: number | string

}

/**
* 工程项目信息表
* @export
* @interface RespCrmProject
*/
export interface RespCrmProject {

    /**
     * 银行承兑执行费率
     * @type {number | string}
     * @memberof RespCrmProject
     */
    acceptBankRate?: number | string

    /**
     * 验收款比例
     * @type {number | string}
     * @memberof RespCrmProject
     */
    acceptancePaymentProportion?: number | string

    /**
     * 项目地址
     * @type {string}
     * @memberof RespCrmProject
     */
    address?: string

    /**
     * 预付款比例
     * @type {number | string}
     * @memberof RespCrmProject
     */
    advancePaymentProportion?: number | string

    /**
     * 首付款比例
     * @type {number | string}
     * @memberof RespCrmProject
     */
    advancePaymentRate?: number | string

    /**
     * 附件地址
     * @type {string}
     * @memberof RespCrmProject
     */
    attachmentUrl?: string

    /**
     * 审计结算款比例
     * @type {number | string}
     * @memberof RespCrmProject
     */
    auditCalculationPaymentProportion?: number | string

    /**
     * 企业code
     * @type {string}
     * @memberof RespCrmProject
     */
    companyCode?: string

    /**
     * 公司id
     * @type {number | string}
     * @memberof RespCrmProject
     */
    companyId?: number | string

    /**
     * 公司名称
     * @type {string}
     * @memberof RespCrmProject
     */
    companyName?: string

    /**
     * 联系地址
     * @type {string}
     * @memberof RespCrmProject
     */
    contactAddress?: string

    /**
     * 项目合同金额
     * @type {number | string}
     * @memberof RespCrmProject
     */
    contractAmount?: number | string

    /**
     * 合作机会分析
     * @type {string}
     * @memberof RespCrmProject
     */
    cooperationAnalyse?: string

    /**
     * 创建人
     * @type {string}
     * @memberof RespCrmProject
     */
    createBy?: string

    /**
     * 创建人手机号
     * @type {string}
     * @memberof RespCrmProject
     */
    createByMobile?: string

    /**
     * 创建时间,格式为:yyyy-MM-dd HH:mm:ss
     * @type {string}
     * @memberof RespCrmProject
     */
    createTime?: string

    /**
     * 客户角色
     * @type {string}
     * @memberof RespCrmProject
     */
    customerRole?: string

    /**
     * 客户角色名称
     * @type {string}
     * @memberof RespCrmProject
     */
    customerRoleName?: string

    /**
     * 企业顾客类型
     * @type {number | string}
     * @memberof RespCrmProject
     */
    customerType?: number | string

    /**
     * 货到付款比例
     * @type {number | string}
     * @memberof RespCrmProject
     */
    deliveryPaymentProportion?: number | string

    /**
     * 所属分部名称
     * @type {string}
     * @memberof RespCrmProject
     */
    deptName?: string

    /**
     * 设备总额
     * @type {number | string}
     * @memberof RespCrmProject
     */
    deviceAmount?: number | string

    /**
     * 设备品牌
     * @type {string}
     * @memberof RespCrmProject
     */
    deviceBrand?: string

    /**
     * 设备品类 1：空调 2：采暖 3：新风 4：净水 5：智能化 6：辅材 7：电梯 8：其他 9:电器 10:热水器
     * @type {number | string}
     * @memberof RespCrmProject
     */
    deviceCategory?: number | string

    /**
     * 资料审核状态 1：待提交 2：已提交 3：审核通过 4：审核驳回
     * @type {number | string}
     * @memberof RespCrmProject
     */
    docAfterStatus?: number | string

    /**
     * 项目待完善进度
     * @type {number | string}
     * @memberof RespCrmProject
     */
    docProgress?: number | string

    /**
     * 企业邮箱
     * @type {string}
     * @memberof RespCrmProject
     */
    email?: string

    /**
     * 预估签约时间
     * @type {string}
     * @memberof RespCrmProject
     */
    estimateSignTime?: string

    /**
     * 预估借款时间,格式为:yyyy-MM-dd
     * @type {string}
     * @memberof RespCrmProject
     */
    estimatedLoanTime?: string

    /**
     * 甲方名称
     * @type {string}
     * @memberof RespCrmProject
     */
    firstPartName?: string

    /**
     * 是否隐藏
     * @type {boolean}
     * @memberof RespCrmProject
     */
    hidden?: boolean

    /**
     * 主键id
     * @type {number | string}
     * @memberof RespCrmProject
     */
    id?: number | string

    /**
     * 安装进度款比例
     * @type {number | string}
     * @memberof RespCrmProject
     */
    installProgressPaymentProportion?: number | string

    /**
     * 是否认证
     * @type {boolean}
     * @memberof RespCrmProject
     */
    isAuthentication?: boolean

    /**
     * 项目级别
     * @type {string}
     * @memberof RespCrmProject
     */
    levels?: string

    /**
     * 借款周期
     * @type {number | string}
     * @memberof RespCrmProject
     */
    loanMonth?: number | string

    /**
     * 回款方式 1：预付款 2：货到付款 3：安装进度款 4：验收 5：交付 6：审计结算 7：其他
     * @type {number | string}
     * @memberof RespCrmProject
     */
    loanPayType?: number | string

    /**
     * 最大采购金额
     * @type {number | string}
     * @memberof RespCrmProject
     */
    maxPurchaseAmount?: number | string

    /**
     * 其他客户角色
     * @type {string}
     * @memberof RespCrmProject
     */
    otherCustomerRole?: string

    /**
     * 承兑备注
     * @type {string}
     * @memberof RespCrmProject
     */
    payAcceptanceRemark?: string

    /**
     * 其他回款方式内容
     * @type {string}
     * @memberof RespCrmProject
     */
    payOtherText?: string

    /**
     * 回款比例
     * @type {number | string}
     * @memberof RespCrmProject
     */
    payProportion?: number | string

    /**
     * EHR部门主键
     * @type {string}
     * @memberof RespCrmProject
     */
    pkDeptDoc?: string

    /**
     * 赊销金额
     * @type {number | string}
     * @memberof RespCrmProject
     */
    predictLoanAmount?: number | string

    /**
     * 工程项目进度 1：项目跟踪阶段 2：招投标 3：合同已签订 4：项目已开工
     * @type {number | string}
     * @memberof RespCrmProject
     */
    progress?: number | string

    /**
     * 提交资料数量
     * @type {number | string}
     * @memberof RespCrmProject
     */
    projectDocCount?: number | string

    /**
     * 项目名称
     * @type {string}
     * @memberof RespCrmProject
     */
    projectName?: string

    /**
     * 项目编号
     * @type {string}
     * @memberof RespCrmProject
     */
    projectNo?: string

    /**
     * 项目提交人
     * @type {string}
     * @memberof RespCrmProject
     */
    projectSubmitName?: string

    /**
     * 项目提交人手机号
     * @type {string}
     * @memberof RespCrmProject
     */
    projectSubmitPhone?: string

    /**
     * 是否有打卡记录
     * @type {boolean}
     * @memberof RespCrmProject
     */
    pushRecord?: boolean

    /**
     * 交付款比例
     * @type {number | string}
     * @memberof RespCrmProject
     */
    realPaymentProportion?: number | string

    /**
     * 剩余货款支付周期（月）
     * @type {number | string}
     * @memberof RespCrmProject
     */
    remainPaymentCycle?: number | string

    /**
     * 项目服务费
     * @type {number | string}
     * @memberof RespCrmProject
     */
    serviceCharge?: number | string

    /**
     * 状态 1：待提交2：初审中 3：资料收集中 12：资料待审核 4：待立项  5：审核未通过 11：待终审 6：待签约 7：待放款 8：贷中 9：项目完成 10:信息待完善 13: 终审通过 14：终审未通过
     * @type {number | string}
     * @memberof RespCrmProject
     */
    status?: number | string

    /**
     * 提交时间,格式为:yyyy-MM-dd HH:mm:ss
     * @type {string}
     * @memberof RespCrmProject
     */
    submitTime?: string

    /**
     * 提交人
     * @type {string}
     * @memberof RespCrmProject
     */
    submitUser?: string

    /**
     * 资料模板总数
     * @type {number | string}
     * @memberof RespCrmProject
     */
    templateCount?: number | string

    /**
     * 银行转账执行费率
     * @type {number | string}
     * @memberof RespCrmProject
     */
    transferBankRate?: number | string

    /**
     * 项目类别 1：地产项目 2：政府共建项目 3：市政项目 3：办公楼 4：厂房 5：其他
     * @type {number | string}
     * @memberof RespCrmProject
     */
    type?: number | string

    /**
     * 修改人
     * @type {string}
     * @memberof RespCrmProject
     */
    updateBy?: string

    /**
     * 修改时间,格式为:yyyy-MM-dd HH:mm:ss
     * @type {string}
     * @memberof RespCrmProject
     */
    updateTime?: string

    /**
     * 上游接受的付款方式 1：现金 2：承兑
     * @type {string}
     * @memberof RespCrmProject
     */
    upstreamPayType?: string

    /**
     * 上游供应商承诺兑现时间（月）
     * @type {number | string}
     * @memberof RespCrmProject
     */
    upstreamPromiseMonth?: number | string

    /**
     * 上游供应商名称
     * @type {string}
     * @memberof RespCrmProject
     */
    upstreamSupplierName?: string

    /**
     * 上游供应商类型 1：厂商 2：代理商 3：经销商
     * @type {number | string}
     * @memberof RespCrmProject
     */
    upstreamSupplierType?: number | string

}

/**
*
* @export
* @interface RespCrmProjectSupply
*/
export interface RespCrmProjectSupply {

    /**
     * 企业名称
     * @type {string}
     * @memberof RespCrmProjectSupply
     */
    companyName?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof RespCrmProjectSupply
     */
    createTime?: string

    /**
     * 跟进节点 1：首次沟通 2：产品介绍演示 3：代理政策沟通 4：商务洽谈，待签约 5：已签约 6：已回款 7：无需跟进
     * @type {number | string}
     * @memberof RespCrmProjectSupply
     */
    flowUpProcess?: number | string

    /**
     * 项目id
     * @type {number | string}
     * @memberof RespCrmProjectSupply
     */
    projectId?: number | string

    /**
     * 项目名称
     * @type {string}
     * @memberof RespCrmProjectSupply
     */
    projectName?: string

}

/**
*
* @export
* @interface RespCrmUserRegisterRecommend
*/
export interface RespCrmUserRegisterRecommend {

    /**
     * 头像
     * @type {string}
     * @memberof RespCrmUserRegisterRecommend
     */
    avatarUrl?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof RespCrmUserRegisterRecommend
     */
    createTime?: string

    /**
     * 会员用户手机号
     * @type {string}
     * @memberof RespCrmUserRegisterRecommend
     */
    mobile?: string

    /**
     * 注册来源 1：好橙工推荐官 2：推荐官推荐
     * @type {number | string}
     * @memberof RespCrmUserRegisterRecommend
     */
    registerOrigin?: number | string

    /**
     * 会员用户id
     * @type {string}
     * @memberof RespCrmUserRegisterRecommend
     */
    userId?: string

    /**
     * 会员用户名称
     * @type {string}
     * @memberof RespCrmUserRegisterRecommend
     */
    userName?: string

}

/**
*
* @export
* @interface RespCustomerBackLogWork
*/
export interface RespCustomerBackLogWork {

    /**
     * 分配的签约人信息
     * @type {string}
     * @memberof RespCustomerBackLogWork
     */
    assignedUserId?: string

    /**
     * 分配的签约人手机号
     * @type {string}
     * @memberof RespCustomerBackLogWork
     */
    assignedUserMobile?: string

    /**
     * 分配的签约人名称
     * @type {string}
     * @memberof RespCustomerBackLogWork
     */
    assignedUserName?: string

    /**
     * 企业名称
     * @type {string}
     * @memberof RespCustomerBackLogWork
     */
    companyName?: string

    /**
     * 创建人
     * @type {string}
     * @memberof RespCustomerBackLogWork
     */
    createBy?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof RespCustomerBackLogWork
     */
    createTime?: string

    /**
     * 事件id
     * @type {number | string}
     * @memberof RespCustomerBackLogWork
     */
    eventId?: number | string

    /**
     * 主键id
     * @type {number | string}
     * @memberof RespCustomerBackLogWork
     */
    id?: number | string

    /**
     * 是否接受 0：否 1：是 2：失效
     * @type {number | string}
     * @memberof RespCustomerBackLogWork
     */
    received?: number | string

    /**
     * 说明
     * @type {string}
     * @memberof RespCustomerBackLogWork
     */
    remark?: string

    /**
     * 事件类型 1：分配人员 2：老客户跟进提醒 3：项目跟进提醒 4：项目合同签约跟进提醒 5:2.0项目分配 6:项目分配同意 7：项目分配拒绝
     * @type {number | string}
     * @memberof RespCustomerBackLogWork
     */
    type?: number | string

}

/**
*
* @export
* @interface RespDepartmentMemberStatics
*/
export interface RespDepartmentMemberStatics {

    /**
     * 注册转化率
     * @type {number | string}
     * @memberof RespDepartmentMemberStatics
     */
    conversionRate?: number | string

    /**
     * 分部名称
     * @type {string}
     * @memberof RespDepartmentMemberStatics
     */
    deptName?: string

    /**
     * 企业微信客户数
     * @type {number | string}
     * @memberof RespDepartmentMemberStatics
     */
    memberNum?: number | string

    /**
     * 注册用户数
     * @type {number | string}
     * @memberof RespDepartmentMemberStatics
     */
    registerMemberNum?: number | string

}

/**
*
* @export
* @interface RespDictionary
*/
export interface RespDictionary {

    /**
     * key
     * @type {string}
     * @memberof RespDictionary
     */
    key?: string

    /**
     * value
     * @type {string}
     * @memberof RespDictionary
     */
    value?: string

}

/**
*
* @export
* @interface RespDictionaryList
*/
export interface RespDictionaryList {

    /**
     * item对应的字典表
     * @type {Array<RespDictionary>}
     * @memberof RespDictionaryList
     */
    dictionaryList?: Array<RespDictionary>

    /**
     * item值
     * @type {string}
     * @memberof RespDictionaryList
     */
    item?: string

}

/**
*
* @export
* @interface RespFlowUpRecord
*/
export interface RespFlowUpRecord {

    /**
     * 跟进事件id
     * @type {number | string}
     * @memberof RespFlowUpRecord
     */
    bizId?: number | string

    /**
     * 事件类型 1：线索  2：客户 3：1.0项目 4:2.0项目
     * @type {number | string}
     * @memberof RespFlowUpRecord
     */
    bizType?: number | string

    /**
     * 跟进内容
     * @type {string}
     * @memberof RespFlowUpRecord
     */
    content?: string

    /**
     * 创建人
     * @type {string}
     * @memberof RespFlowUpRecord
     */
    createBy?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof RespFlowUpRecord
     */
    createTime?: string

    /**
     * 主键id
     * @type {number | string}
     * @memberof RespFlowUpRecord
     */
    id?: number | string

    /**
     * 下次跟进时间
     * @type {string}
     * @memberof RespFlowUpRecord
     */
    nextFlowTime?: string

    /**
     * 现场图片
     * @type {string}
     * @memberof RespFlowUpRecord
     */
    picUrls?: string

    /**
     * 备注
     * @type {string}
     * @memberof RespFlowUpRecord
     */
    remark?: string

    /**
     * 跟进类型 1：当面拜访 2：电话/微信沟通/邮件等
     * @type {number | string}
     * @memberof RespFlowUpRecord
     */
    type?: number | string

}

/**
*
* @export
* @interface RespIndustryAll
*/
export interface RespIndustryAll {

    /**
     *  国民经济行业分类门类
     * @type {string}
     * @memberof RespIndustryAll
     */
    category?: string

    /**
     *  国民经济行业分类大类
     * @type {string}
     * @memberof RespIndustryAll
     */
    categoryBig?: string

    /**
     * 	国民经济行业分类中类
     * @type {string}
     * @memberof RespIndustryAll
     */
    categoryMiddle?: string

    /**
     *  国民经济行业分类小类（未使用）
     * @type {string}
     * @memberof RespIndustryAll
     */
    categorySmall?: string

}

/**
*
* @export
* @interface RespLiveInfo
*/
export interface RespLiveInfo {

    /**
     * 房间列表
     * @type {Array<RespLiveRoom>}
     * @memberof RespLiveInfo
     */
    liveRooms?: Array<RespLiveRoom>

}

/**
*
* @export
* @interface RespLiveReplay
*/
export interface RespLiveReplay {

    /**
     * 视频创建时间
     * @type {number | string}
     * @memberof RespLiveReplay
     */
    createTime?: number | string

    /**
     * 视频失效时间
     * @type {number | string}
     * @memberof RespLiveReplay
     */
    expireTime?: number | string

    /**
     * 回放视频链接
     * @type {string}
     * @memberof RespLiveReplay
     */
    mediaUrl?: string

}

/**
*
* @export
* @interface RespLiveRoom
*/
export interface RespLiveRoom {

    /**
     * 主播名
     * @type {string}
     * @memberof RespLiveRoom
     */
    anchorName?: string

    /**
     * 是否关闭评论 【0：开启，1：关闭】（若关闭，观众端将隐藏评论入口，直播开始后不允许开启）
     * @type {number | string}
     * @memberof RespLiveRoom
     */
    closeComment?: number | string

    /**
     * 是否关闭货架 【0：开启，1：关闭】（若关闭，观众端将隐藏商品货架，直播开始后不允许开启）
     * @type {number | string}
     * @memberof RespLiveRoom
     */
    closeGoods?: number | string

    /**
     * 是否关闭客服 【0：开启，1：关闭】 默认关闭客服（直播开始后允许开启）
     * @type {number | string}
     * @memberof RespLiveRoom
     */
    closeKf?: number | string

    /**
     * 是否关闭点赞 【0：开启，1：关闭】（若关闭，观众端将隐藏点赞按钮，直播开始后不允许开启）
     * @type {number | string}
     * @memberof RespLiveRoom
     */
    closeLike?: number | string

    /**
     * 是否关闭回放 【0：开启，1：关闭】默认关闭回放（直播开始后允许开启）
     * @type {number | string}
     * @memberof RespLiveRoom
     */
    closeReplay?: number | string

    /**
     * 直播间背景图链接
     * @type {string}
     * @memberof RespLiveRoom
     */
    coverImg?: string

    /**
     * 直播计划结束时间
     * @type {string}
     * @memberof RespLiveRoom
     */
    endTime?: string

    /**
     * 官方收录封面
     * @type {string}
     * @memberof RespLiveRoom
     */
    feedsImg?: string

    /**
     * 是否开启官方收录，1 开启，0 关闭
     * @type {number | string}
     * @memberof RespLiveRoom
     */
    isFeedsPublic?: number | string

    /**
     * 直播间状态。101：直播中，102：未开始，103已结束，104禁播，105：暂停，106：异常，107：已过期
     * @type {number | string}
     * @memberof RespLiveRoom
     */
    liveStatus?: number | string

    /**
     * 直播类型，1 推流 0 手机直播
     * @type {number | string}
     * @memberof RespLiveRoom
     */
    liveType?: number | string

    /**
     * 房间名称
     * @type {string}
     * @memberof RespLiveRoom
     */
    name?: string

    /**
     * 直播间商品列表
     * @type {Array<RespRoomGoods>}
     * @memberof RespLiveRoom
     */
    roomGoodsList?: Array<RespRoomGoods>

    /**
     * 房间id
     * @type {number | string}
     * @memberof RespLiveRoom
     */
    roomId?: number | string

    /**
     * 直播间分享图链接
     * @type {string}
     * @memberof RespLiveRoom
     */
    shareImg?: string

    /**
     * 直播间开始时间，列表按照start_time降序排列
     * @type {string}
     * @memberof RespLiveRoom
     */
    startTime?: string

}

/**
*
* @export
* @interface RespLoanAmount
*/
export interface RespLoanAmount {

    /**
     * 设备款总额
     * @type {number | string}
     * @memberof RespLoanAmount
     */
    totalDeviceAmount?: number | string

    /**
     * 贷款总额
     * @type {number | string}
     * @memberof RespLoanAmount
     */
    totalLoanAmount?: number | string

}

/**
*
* @export
* @interface RespMemberUserInfo
*/
export interface RespMemberUserInfo {

    /**
     * 微信头像
     * @type {string}
     * @memberof RespMemberUserInfo
     */
    avatarUrl?: string

    /**
     * 名称
     * @type {string}
     * @memberof RespMemberUserInfo
     */
    name?: string

    /**
     * 微信昵称
     * @type {string}
     * @memberof RespMemberUserInfo
     */
    nickName?: string

    /**
     * 会员用户手机号
     * @type {string}
     * @memberof RespMemberUserInfo
     */
    phone?: string

    /**
     * 会员用户id
     * @type {number | string}
     * @memberof RespMemberUserInfo
     */
    userId?: number | string

    /**
     * 会员账号
     * @type {string}
     * @memberof RespMemberUserInfo
     */
    userName?: string

}

/**
* 工程项目信息表
* @export
* @interface RespProject
*/
export interface RespProject {

    /**
     * 银行承兑执行费率
     * @type {number | string}
     * @memberof RespProject
     */
    acceptBankRate?: number | string

    /**
     * 验收款比例
     * @type {number | string}
     * @memberof RespProject
     */
    acceptancePaymentProportion?: number | string

    /**
     * 项目地址
     * @type {string}
     * @memberof RespProject
     */
    address?: string

    /**
     * 预付款比例
     * @type {number | string}
     * @memberof RespProject
     */
    advancePaymentProportion?: number | string

    /**
     * 首付款比例
     * @type {number | string}
     * @memberof RespProject
     */
    advancePaymentRate?: number | string

    /**
     * 附件地址
     * @type {string}
     * @memberof RespProject
     */
    attachmentUrl?: string

    /**
     * 审计结算款比例
     * @type {number | string}
     * @memberof RespProject
     */
    auditCalculationPaymentProportion?: number | string

    /**
     * 企业code
     * @type {string}
     * @memberof RespProject
     */
    companyCode?: string

    /**
     * 公司id
     * @type {number | string}
     * @memberof RespProject
     */
    companyId?: number | string

    /**
     * 公司名称
     * @type {string}
     * @memberof RespProject
     */
    companyName?: string

    /**
     * 联系地址
     * @type {string}
     * @memberof RespProject
     */
    contactAddress?: string

    /**
     * 项目合同金额
     * @type {number | string}
     * @memberof RespProject
     */
    contractAmount?: number | string

    /**
     * 合作机会分析
     * @type {string}
     * @memberof RespProject
     */
    cooperationAnalyse?: string

    /**
     * 创建人
     * @type {string}
     * @memberof RespProject
     */
    createBy?: string

    /**
     * 创建人手机号
     * @type {string}
     * @memberof RespProject
     */
    createByMobile?: string

    /**
     * 创建时间,格式为:yyyy-MM-dd HH:mm:ss
     * @type {string}
     * @memberof RespProject
     */
    createTime?: string

    /**
     * 客户角色
     * @type {string}
     * @memberof RespProject
     */
    customerRole?: string

    /**
     * 客户角色名称
     * @type {string}
     * @memberof RespProject
     */
    customerRoleName?: string

    /**
     * 企业顾客类型
     * @type {number | string}
     * @memberof RespProject
     */
    customerType?: number | string

    /**
     * 货到付款比例
     * @type {number | string}
     * @memberof RespProject
     */
    deliveryPaymentProportion?: number | string

    /**
     * 所属分部名称
     * @type {string}
     * @memberof RespProject
     */
    deptName?: string

    /**
     * 设备总额
     * @type {number | string}
     * @memberof RespProject
     */
    deviceAmount?: number | string

    /**
     * 设备品牌
     * @type {string}
     * @memberof RespProject
     */
    deviceBrand?: string

    /**
     * 设备品类 1：空调 2：采暖 3：新风 4：净水 5：智能化 6：辅材 7：电梯 8：其他 9:电器 10:热水器
     * @type {number | string}
     * @memberof RespProject
     */
    deviceCategory?: number | string

    /**
     * 钉钉审批人
     * @type {string}
     * @memberof RespProject
     */
    dingApprover?: string

    /**
     * 资料审核状态 1：待提交 2：已提交 3：审核通过 4：审核驳回
     * @type {number | string}
     * @memberof RespProject
     */
    docAfterStatus?: number | string

    /**
     * 项目待完善进度
     * @type {number | string}
     * @memberof RespProject
     */
    docProgress?: number | string

    /**
     * 企业邮箱
     * @type {string}
     * @memberof RespProject
     */
    email?: string

    /**
     * 预估签约时间
     * @type {string}
     * @memberof RespProject
     */
    estimateSignTime?: string

    /**
     * 预估借款时间,格式为:yyyy-MM-dd
     * @type {string}
     * @memberof RespProject
     */
    estimatedLoanTime?: string

    /**
     * 终审通过时间
     * @type {string}
     * @memberof RespProject
     */
    finalReviewPassTime?: string

    /**
     * 甲方名称
     * @type {string}
     * @memberof RespProject
     */
    firstPartName?: string

    /**
     * 主键id
     * @type {number | string}
     * @memberof RespProject
     */
    id?: number | string

    /**
     * 安装进度款比例
     * @type {number | string}
     * @memberof RespProject
     */
    installProgressPaymentProportion?: number | string

    /**
     * 是否认证
     * @type {boolean}
     * @memberof RespProject
     */
    isAuthentication?: boolean

    /**
     * 项目级别
     * @type {string}
     * @memberof RespProject
     */
    levels?: string

    /**
     * 借款周期
     * @type {number | string}
     * @memberof RespProject
     */
    loanMonth?: number | string

    /**
     * 回款方式 1：预付款 2：货到付款 3：安装进度款 4：验收 5：交付 6：审计结算 7：其他
     * @type {number | string}
     * @memberof RespProject
     */
    loanPayType?: number | string

    /**
     * 最大采购金额
     * @type {number | string}
     * @memberof RespProject
     */
    maxPurchaseAmount?: number | string

    /**
     * 其他客户角色
     * @type {string}
     * @memberof RespProject
     */
    otherCustomerRole?: string

    /**
     * 承兑备注
     * @type {string}
     * @memberof RespProject
     */
    payAcceptanceRemark?: string

    /**
     * 其他回款方式内容
     * @type {string}
     * @memberof RespProject
     */
    payOtherText?: string

    /**
     * 回款比例
     * @type {number | string}
     * @memberof RespProject
     */
    payProportion?: number | string

    /**
     * EHR部门主键
     * @type {string}
     * @memberof RespProject
     */
    pkDeptDoc?: string

    /**
     * 赊销金额
     * @type {number | string}
     * @memberof RespProject
     */
    predictLoanAmount?: number | string

    /**
     * 工程项目进度 1：项目跟踪阶段 2：招投标 3：合同已签订 4：项目已开工
     * @type {number | string}
     * @memberof RespProject
     */
    progress?: number | string

    /**
     * 提交资料数量
     * @type {number | string}
     * @memberof RespProject
     */
    projectDocCount?: number | string

    /**
     * 项目专项额冻结
     * @type {number | string}
     * @memberof RespProject
     */
    projectFreezeAmount?: number | string

    /**
     * 项目名称
     * @type {string}
     * @memberof RespProject
     */
    projectName?: string

    /**
     * 项目编号
     * @type {string}
     * @memberof RespProject
     */
    projectNo?: string

    /**
     * 项目专项额度
     * @type {number | string}
     * @memberof RespProject
     */
    projectQuotaAmount?: number | string

    /**
     * 项目专项额度可用
     * @type {number | string}
     * @memberof RespProject
     */
    projectQuotaUsableAmount?: number | string

    /**
     * 项目提交人
     * @type {string}
     * @memberof RespProject
     */
    projectSubmitName?: string

    /**
     * 项目提交人手机号
     * @type {string}
     * @memberof RespProject
     */
    projectSubmitPhone?: string

    /**
     * 已采购金额
     * @type {number | string}
     * @memberof RespProject
     */
    purchaseAmount?: number | string

    /**
     * 是否有打卡记录
     * @type {boolean}
     * @memberof RespProject
     */
    pushRecord?: boolean

    /**
     * 交付款比例
     * @type {number | string}
     * @memberof RespProject
     */
    realPaymentProportion?: number | string

    /**
     * 剩余货款支付周期（月）
     * @type {number | string}
     * @memberof RespProject
     */
    remainPaymentCycle?: number | string

    /**
     * 评审决议状态
     * @type {number | string}
     * @memberof RespProject
     */
    resolutionStatus?: number | string

    /**
     * 销售毛利率(%)
     * @type {number | string}
     * @memberof RespProject
     */
    salesGrossMargin?: number | string

    /**
     * 销售总额(元)
     * @type {number | string}
     * @memberof RespProject
     */
    salesTotalAmount?: number | string

    /**
     * 项目服务费
     * @type {number | string}
     * @memberof RespProject
     */
    serviceCharge?: number | string

    /**
     * 状态 1：待提交2：初审中 3：资料收集中 12：资料待审核 4：待立项  5：审核未通过 11：待终审 6：待签约 7：待放款 8：贷中 9：项目完成 10:信息待完善 13: 终审通过 14：终审未通过
     * @type {number | string}
     * @memberof RespProject
     */
    status?: number | string

    /**
     * 提交时间,格式为:yyyy-MM-dd HH:mm:ss
     * @type {string}
     * @memberof RespProject
     */
    submitTime?: string

    /**
     * 提交人
     * @type {string}
     * @memberof RespProject
     */
    submitUser?: string

    /**
     * 资料模板总数
     * @type {number | string}
     * @memberof RespProject
     */
    templateCount?: number | string

    /**
     * 银行转账执行费率
     * @type {number | string}
     * @memberof RespProject
     */
    transferBankRate?: number | string

    /**
     * 项目类别 1：地产项目 2：政府共建项目 3：市政项目 3：办公楼 4：厂房 5：其他
     * @type {number | string}
     * @memberof RespProject
     */
    type?: number | string

    /**
     * 修改人
     * @type {string}
     * @memberof RespProject
     */
    updateBy?: string

    /**
     * 修改时间,格式为:yyyy-MM-dd HH:mm:ss
     * @type {string}
     * @memberof RespProject
     */
    updateTime?: string

    /**
     * 上游接受的付款方式 1：现金 2：承兑
     * @type {string}
     * @memberof RespProject
     */
    upstreamPayType?: string

    /**
     * 上游供应商承诺兑现时间（月）
     * @type {number | string}
     * @memberof RespProject
     */
    upstreamPromiseMonth?: number | string

    /**
     * 上游供应商名称
     * @type {string}
     * @memberof RespProject
     */
    upstreamSupplierName?: string

    /**
     * 上游供应商类型 1：厂商 2：代理商 3：经销商
     * @type {number | string}
     * @memberof RespProject
     */
    upstreamSupplierType?: number | string

}

/**
*
* @export
* @interface RespProjectAccount
*/
export interface RespProjectAccount {

    /**
     * 合作关闭数值
     * @type {string}
     * @memberof RespProjectAccount
     */
    cooperCloseValue?: string

    /**
     * 资料收集数值
     * @type {string}
     * @memberof RespProjectAccount
     */
    dataCollectValue?: string

    /**
     * 资料初审值
     * @type {string}
     * @memberof RespProjectAccount
     */
    docAuditValue?: string

    /**
     * 终审不通过数值
     * @type {string}
     * @memberof RespProjectAccount
     */
    finalApproveNoValue?: string

    /**
     * 终审数值
     * @type {string}
     * @memberof RespProjectAccount
     */
    finalApproveValue?: string

    /**
     * 终审通过数值
     * @type {string}
     * @memberof RespProjectAccount
     */
    finalApproveYesValue?: string

    /**
     * 信息待完善数值
     * @type {string}
     * @memberof RespProjectAccount
     */
    infoToBeImprovedValue?: string

    /**
     * 蓄水数值
     * @type {string}
     * @memberof RespProjectAccount
     */
    retainValue?: string

    /**
     * 合计数值
     * @type {string}
     * @memberof RespProjectAccount
     */
    totalValue?: string

    /**
     * 立项阶段数值
     * @type {string}
     * @memberof RespProjectAccount
     */
    trustTrialValue?: string

    /**
     * 类型 1：项目数量 2：工程项目总额 3：设备金额 4：赊销总金额
     * @type {number | string}
     * @memberof RespProjectAccount
     */
    type?: number | string

}

/**
*
* @export
* @interface RespProjectApproveDoc
*/
export interface RespProjectApproveDoc {

    /**
     * 银行承兑执行费率
     * @type {number | string}
     * @memberof RespProjectApproveDoc
     */
    acceptBankRate?: number | string

    /**
     * 首付款比例
     * @type {number | string}
     * @memberof RespProjectApproveDoc
     */
    advancePaymentRate?: number | string

    /**
     * 审核结果
     * @type {boolean}
     * @memberof RespProjectApproveDoc
     */
    approveResult?: boolean

    /**
     * 公司认证状态 1：未认证 2：认证中 3：认证成功 4：认证失败
     * @type {number | string}
     * @memberof RespProjectApproveDoc
     */
    companyAuthenticationStatus?: number | string

    /**
     * 公司资料状态 1：待提交 2：已提交 3：已通过 4：已打回
     * @type {number | string}
     * @memberof RespProjectApproveDoc
     */
    companyDocumentStatus?: number | string

    /**
     * 工程所属公司的id
     * @type {number | string}
     * @memberof RespProjectApproveDoc
     */
    companyId?: number | string

    /**
     * 工程所属公司的名称
     * @type {string}
     * @memberof RespProjectApproveDoc
     */
    companyName?: string

    /**
     * 最大采购金额
     * @type {number | string}
     * @memberof RespProjectApproveDoc
     */
    maxPurchaseAmount?: number | string

    /**
     * 工程项目资料列表
     * @type {Array<RespRiskCheckProjectDetail>}
     * @memberof RespProjectApproveDoc
     */
    projectDocList?: Array<RespRiskCheckProjectDetail>

    /**
     * 工程id
     * @type {number | string}
     * @memberof RespProjectApproveDoc
     */
    projectId?: number | string

    /**
     * 剩余货款支付周期（月）
     * @type {number | string}
     * @memberof RespProjectApproveDoc
     */
    remainPaymentCycle?: number | string

    /**
     * 说明
     * @type {string}
     * @memberof RespProjectApproveDoc
     */
    remark?: string

    /**
     * 银行转账执行费率
     * @type {number | string}
     * @memberof RespProjectApproveDoc
     */
    transferBankRate?: number | string

}

/**
*
* @export
* @interface RespProjectLevel
*/
export interface RespProjectLevel {

    /**
     * 经销商级别
     * @type {string}
     * @memberof RespProjectLevel
     */
    companyCreditLevel?: string

    /**
     * 公司资料状态 1：待提交 2：已提交 3：已通过 4：已打回
     * @type {number | string}
     * @memberof RespProjectLevel
     */
    companyDocumentStatus?: number | string

    /**
     * 经销商服务费
     * @type {number | string}
     * @memberof RespProjectLevel
     */
    companyServiceCharge?: number | string

    /**
     * 信用结束日期
     * @type {string}
     * @memberof RespProjectLevel
     */
    endTime?: string

    /**
     *
     * @type {boolean}
     * @memberof RespProjectLevel
     */
    expired?: boolean

    /**
     * 项目级别
     * @type {string}
     * @memberof RespProjectLevel
     */
    levels?: string

    /**
     * 工程id
     * @type {number | string}
     * @memberof RespProjectLevel
     */
    projectId?: number | string

    /**
     * 项目服务费
     * @type {number | string}
     * @memberof RespProjectLevel
     */
    serviceCharge?: number | string

    /**
     * 信用开始日期
     * @type {string}
     * @memberof RespProjectLevel
     */
    startTime?: string

}

/**
*
* @export
* @interface RespProjectSupplyProcess
*/
export interface RespProjectSupplyProcess {

    /**
     * 2.0项目进度节点列表,无需跟进原因
     * @type {string}
     * @memberof RespProjectSupplyProcess
     */
    noFlowReason?: string

    /**
     * 2.0项目进度节点列表,顺序展示即可
     * @type {Array<ProjectProcessNode>}
     * @memberof RespProjectSupplyProcess
     */
    projectProcessNodes?: Array<ProjectProcessNode>

}

/**
*
* @export
* @interface RespRecommendCompanys
*/
export interface RespRecommendCompanys {

    /**
     * 认证时间
     * @type {string}
     * @memberof RespRecommendCompanys
     */
    authenticationTime?: string

    /**
     * 企业id
     * @type {number | string}
     * @memberof RespRecommendCompanys
     */
    companyId?: number | string

    /**
     * 企业名称
     * @type {string}
     * @memberof RespRecommendCompanys
     */
    companyName?: string

    /**
     * 信用评审时间
     * @type {string}
     * @memberof RespRecommendCompanys
     */
    creditApprovedTime?: string

    /**
     * 会员用户手机号
     * @type {string}
     * @memberof RespRecommendCompanys
     */
    mobile?: string

    /**
     * 状态 1：已认证 2：已评级 3：已失效
     * @type {number | string}
     * @memberof RespRecommendCompanys
     */
    status?: number | string

    /**
     * 会员用户id
     * @type {string}
     * @memberof RespRecommendCompanys
     */
    userId?: string

    /**
     * 会员用户名称
     * @type {string}
     * @memberof RespRecommendCompanys
     */
    userName?: string

}

/**
*
* @export
* @interface RespRecommendReward
*/
export interface RespRecommendReward {

    /**
     * 认证时间
     * @type {string}
     * @memberof RespRecommendReward
     */
    authenticationTime?: string

    /**
     * 企业id
     * @type {number | string}
     * @memberof RespRecommendReward
     */
    companyId?: number | string

    /**
     * 企业名称
     * @type {string}
     * @memberof RespRecommendReward
     */
    companyName?: string

    /**
     * 信用评审时间
     * @type {string}
     * @memberof RespRecommendReward
     */
    creditApprovedTime?: string

    /**
     * 信用评级
     * @type {string}
     * @memberof RespRecommendReward
     */
    creditLevel?: string

    /**
     * 推荐人Id
     * @type {number | string}
     * @memberof RespRecommendReward
     */
    recommenderUserId?: number | string

    /**
     * 推荐人手机号
     * @type {string}
     * @memberof RespRecommendReward
     */
    recommenderUserMobile?: string

    /**
     * 推荐人姓名
     * @type {string}
     * @memberof RespRecommendReward
     */
    recommenderUserName?: string

    /**
     * 应奖励金额
     * @type {number | string}
     * @memberof RespRecommendReward
     */
    rewardAmount?: number | string

    /**
     * 发放状态
     * @type {number | string}
     * @memberof RespRecommendReward
     */
    sendStatus?: number | string

    /**
     * 发放时间
     * @type {string}
     * @memberof RespRecommendReward
     */
    sendTime?: string

    /**
     * 发放登记人姓名
     * @type {string}
     * @memberof RespRecommendReward
     */
    senderName?: string

}

/**
*
* @export
* @interface RespRecommendRewardStatis
*/
export interface RespRecommendRewardStatis {

    /**
     * 已发放数量
     * @type {number | string}
     * @memberof RespRecommendRewardStatis
     */
    paidNum?: number | string

    /**
     * 待发放数量
     * @type {number | string}
     * @memberof RespRecommendRewardStatis
     */
    payingNum?: number | string

}

/**
* 模板分页数据
* @export
* @interface RespRiskCheckDocTemplate
*/
export interface RespRiskCheckDocTemplate {

    /**
     * 业务Id
     * @type {number | string}
     * @memberof RespRiskCheckDocTemplate
     */
    bizId?: number | string

    /**
     * 业务名称
     * @type {string}
     * @memberof RespRiskCheckDocTemplate
     */
    bizName?: string

    /**
     * 授信材料
     * @type {Array<CreditDocument>}
     * @memberof RespRiskCheckDocTemplate
     */
    creditDocuments?: Array<CreditDocument>

    /**
     * 一级类目id
     * @type {number | string}
     * @memberof RespRiskCheckDocTemplate
     */
    firstCatagoryId?: number | string

    /**
     * 一级类目名称
     * @type {string}
     * @memberof RespRiskCheckDocTemplate
     */
    firstCatagoryName?: string

    /**
     * 格式Id
     * @type {number | string}
     * @memberof RespRiskCheckDocTemplate
     */
    formatId?: number | string

    /**
     * 格式名称
     * @type {string}
     * @memberof RespRiskCheckDocTemplate
     */
    formatName?: string

    /**
     * 功能Id
     * @type {number | string}
     * @memberof RespRiskCheckDocTemplate
     */
    functionId?: number | string

    /**
     * 功能名称
     * @type {string}
     * @memberof RespRiskCheckDocTemplate
     */
    functionName?: string

    /**
     * 必填标志 0：非必填 1：必填
     * @type {number | string}
     * @memberof RespRiskCheckDocTemplate
     */
    mondatoryFlag?: number | string

    /**
     * 是否有打回记录
     * @type {boolean}
     * @memberof RespRiskCheckDocTemplate
     */
    refuse?: boolean

    /**
     * 备注
     * @type {string}
     * @memberof RespRiskCheckDocTemplate
     */
    remark?: string

    /**
     * 样例
     * @type {Array<RiskCheckDocTemplateSamplePo>}
     * @memberof RespRiskCheckDocTemplate
     */
    riskCheckDocTemplateSamplePos?: Array<RiskCheckDocTemplateSamplePo>

    /**
     * 项目材料
     * @type {Array<RiskCheckProjectDocPo>}
     * @memberof RespRiskCheckDocTemplate
     */
    riskCheckProjectDocPos?: Array<RiskCheckProjectDocPo>

    /**
     * 二级类目Id
     * @type {number | string}
     * @memberof RespRiskCheckDocTemplate
     */
    secondCatagoryId?: number | string

    /**
     * 二级类目名称
     * @type {string}
     * @memberof RespRiskCheckDocTemplate
     */
    secondCatagoryName?: string

    /**
     * 模板id
     * @type {number | string}
     * @memberof RespRiskCheckDocTemplate
     */
    templateId?: number | string

}

/**
*
* @export
* @interface RespRiskCheckProjectDetail
*/
export interface RespRiskCheckProjectDetail {

    /**
     * 一级类目id
     * @type {number | string}
     * @memberof RespRiskCheckProjectDetail
     */
    firstCatagoryId?: number | string

    /**
     * 一级类目名称
     * @type {string}
     * @memberof RespRiskCheckProjectDetail
     */
    firstCatagoryName?: string

    /**
     * 模板数据
     * @type {Array<RespRiskCheckDocTemplate>}
     * @memberof RespRiskCheckProjectDetail
     */
    respRiskCheckDocTemplateList?: Array<RespRiskCheckDocTemplate>

}

/**
*
* @export
* @interface RespRoomGoods
*/
export interface RespRoomGoods {

    /**
     * 商品封面图链接
     * @type {string}
     * @memberof RespRoomGoods
     */
    coverImg?: string

    /**
     * 商品id
     * @type {number | string}
     * @memberof RespRoomGoods
     */
    goodsId?: number | string

    /**
     * 商品名称
     * @type {string}
     * @memberof RespRoomGoods
     */
    name?: string

    /**
     * 商品价格（分）
     * @type {number | string}
     * @memberof RespRoomGoods
     */
    price?: number | string

    /**
     * 商品价格，使用方式看price_type
     * @type {number | string}
     * @memberof RespRoomGoods
     */
    price2?: number | string

    /**
     * 价格类型，1：一口价（只需要传入price，price2不传） 2：价格区间（price字段为左边界，price2字段为右边界，price和price2必传） 3：显示折扣价（price字段为原价，price2字段为现价， price和price2必传）
     * @type {number | string}
     * @memberof RespRoomGoods
     */
    priceType?: number | string

    /**
     * 第三方商品appid ,当前小程序商品则为空
3.获取直播间回放
     * @type {string}
     * @memberof RespRoomGoods
     */
    thirdPartyAppid?: string

    /**
     * 商品小程序路径
     * @type {string}
     * @memberof RespRoomGoods
     */
    url?: string

}

/**
*
* @export
* @interface RespRoomLiveReplay
*/
export interface RespRoomLiveReplay {

    /**
     * 回放视频列表
     * @type {Array<RespLiveReplay>}
     * @memberof RespRoomLiveReplay
     */
    respLiveReplayList?: Array<RespLiveReplay>

}

/**
* 企业基本信息（含企业联系方式）
* @export
* @interface RespTianyanchaBaseInfo
*/
export interface RespTianyanchaBaseInfo {

    /**
     * 实收注册资金
     * @type {string}
     * @memberof RespTianyanchaBaseInfo
     */
    actualCapital?: string

    /**
     * 实收注册资本币种 人民币 美元 欧元 等（暂未使用）
     * @type {string}
     * @memberof RespTianyanchaBaseInfo
     */
    actualCapitalCurrency?: string

    /**
     * 简称
     * @type {string}
     * @memberof RespTianyanchaBaseInfo
     */
    alias?: string

    /**
     * (核准时间)
     * @type {string}
     * @memberof RespTianyanchaBaseInfo
     */
    approvedTime?: string

    /**
     * 省份简称
     * @type {string}
     * @memberof RespTianyanchaBaseInfo
     */
    base?: string

    /**
     * 股票名
     * @type {string}
     * @memberof RespTianyanchaBaseInfo
     */
    bondName?: string

    /**
     * 股票号
     * @type {string}
     * @memberof RespTianyanchaBaseInfo
     */
    bondNum?: string

    /**
     * 股票类型
     * @type {string}
     * @memberof RespTianyanchaBaseInfo
     */
    bondType?: string

    /**
     * 经营范围
     * @type {string}
     * @memberof RespTianyanchaBaseInfo
     */
    businessScope?: string

    /**
     * 注销日期
     * @type {string}
     * @memberof RespTianyanchaBaseInfo
     */
    cancelDate?: string

    /**
     * 注销原因
     * @type {string}
     * @memberof RespTianyanchaBaseInfo
     */
    cancelReason?: string

    /**
     * 企业类型
     * @type {string}
     * @memberof RespTianyanchaBaseInfo
     */
    companyOrgType?: string

    /**
     * 统一社会信用代码
     * @type {string}
     * @memberof RespTianyanchaBaseInfo
     */
    creditCode?: string

    /**
     * 邮箱
     * @type {string}
     * @memberof RespTianyanchaBaseInfo
     */
    email?: string

    /**
     * (成立日期)
     * @type {string}
     * @memberof RespTianyanchaBaseInfo
     */
    estiblishTime?: string

    /**
     * (经营开始时间)
     * @type {string}
     * @memberof RespTianyanchaBaseInfo
     */
    fromTime?: string

    /**
     * 曾用名
     * @type {string}
     * @memberof RespTianyanchaBaseInfo
     */
    historyNames?: string

    /**
     * 企业id
     * @type {number | string}
     * @memberof RespTianyanchaBaseInfo
     */
    id?: number | string

    /**
     * 行业
     * @type {string}
     * @memberof RespTianyanchaBaseInfo
     */
    industry?: string

    /**
     * 国民经济行业分类
     * @type {RespIndustryAll}
     * @memberof RespTianyanchaBaseInfo
     */
    industryAll?: RespIndustryAll

    /**
     * 是否是小微企业0不是1是
     * @type {number | string}
     * @memberof RespTianyanchaBaseInfo
     */
    isMicroEnt?: number | string

    /**
     * 法人
     * @type {string}
     * @memberof RespTianyanchaBaseInfo
     */
    legalPersonName?: string

    /**
     * 企业名
     * @type {string}
     * @memberof RespTianyanchaBaseInfo
     */
    name?: string

    /**
     * 组织机构代码
     * @type {string}
     * @memberof RespTianyanchaBaseInfo
     */
    orgNumber?: string

    /**
     * 万分制(企业评分)
     * @type {number | string}
     * @memberof RespTianyanchaBaseInfo
     */
    percentileScore?: number | string

    /**
     * 企业联系方式
     * @type {string}
     * @memberof RespTianyanchaBaseInfo
     */
    phoneNumber?: string

    /**
     * 英文名
     * @type {string}
     * @memberof RespTianyanchaBaseInfo
     */
    property3?: string

    /**
     * 注册资本
     * @type {string}
     * @memberof RespTianyanchaBaseInfo
     */
    regCapital?: string

    /**
     * 注册资本币种人民币 美元 欧元 等（暂未使用）
     * @type {string}
     * @memberof RespTianyanchaBaseInfo
     */
    regCapitalCurrency?: string

    /**
     * 登记机关
     * @type {string}
     * @memberof RespTianyanchaBaseInfo
     */
    regInstitute?: string

    /**
     * 注册地址
     * @type {string}
     * @memberof RespTianyanchaBaseInfo
     */
    regLocation?: string

    /**
     * 注册号
     * @type {string}
     * @memberof RespTianyanchaBaseInfo
     */
    regNumber?: string

    /**
     * 企业状态
     * @type {string}
     * @memberof RespTianyanchaBaseInfo
     */
    regStatus?: string

    /**
     * 吊销日期
     * @type {string}
     * @memberof RespTianyanchaBaseInfo
     */
    revokeDate?: string

    /**
     * 吊销原因
     * @type {string}
     * @memberof RespTianyanchaBaseInfo
     */
    revokeReason?: string

    /**
     * 参保人数
     * @type {number | string}
     * @memberof RespTianyanchaBaseInfo
     */
    socialStaffNum?: number | string

    /**
     * 人员规模
     * @type {string}
     * @memberof RespTianyanchaBaseInfo
     */
    staffNumRange?: string

    /**
     * 企业标签
     * @type {string}
     * @memberof RespTianyanchaBaseInfo
     */
    tags?: string

    /**
     * 纳税人识别号
     * @type {string}
     * @memberof RespTianyanchaBaseInfo
     */
    taxNumber?: string

    /**
     * (经营结束时间)
     * @type {string}
     * @memberof RespTianyanchaBaseInfo
     */
    toTime?: string

    /**
     * 法人类型1人2公司
     * @type {number | string}
     * @memberof RespTianyanchaBaseInfo
     */
    type?: number | string

    /**
     * 股票曾用名
     * @type {string}
     * @memberof RespTianyanchaBaseInfo
     */
    usedBondName?: string

    /**
     * 网址
     * @type {string}
     * @memberof RespTianyanchaBaseInfo
     */
    websiteList?: string

}

/**
* 天眼查搜索返回参数
* @export
* @interface RespTianyanchaSearch
*/
export interface RespTianyanchaSearch {

    /**
     * 省份
     * @type {string}
     * @memberof RespTianyanchaSearch
     */
    base?: string

    /**
     * 公司类型 1-公司，2-香港公司，3-社会组织，4-律所，5-事业单位，6-基金会
     * @type {string}
     * @memberof RespTianyanchaSearch
     */
    companyType?: string

    /**
     * 统一社会信用代码
     * @type {string}
     * @memberof RespTianyanchaSearch
     */
    creditCode?: string

    /**
     * 成立日期
     * @type {string}
     * @memberof RespTianyanchaSearch
     */
    estiblishTime?: string

    /**
     * 公司id
     * @type {string}
     * @memberof RespTianyanchaSearch
     */
    id?: string

    /**
     * 法人
     * @type {string}
     * @memberof RespTianyanchaSearch
     */
    legalPersonName?: string

    /**
     * 公司名
     * @type {string}
     * @memberof RespTianyanchaSearch
     */
    name?: string

    /**
     * 组织机构代码
     * @type {string}
     * @memberof RespTianyanchaSearch
     */
    orgNumber?: string

    /**
     * 注册资本
     * @type {string}
     * @memberof RespTianyanchaSearch
     */
    regCapital?: string

    /**
     * 注册号
     * @type {string}
     * @memberof RespTianyanchaSearch
     */
    regNumber?: string

    /**
     * 经营状态
     * @type {string}
     * @memberof RespTianyanchaSearch
     */
    regStatus?: string

    /**
     * 1-公司 2-人
     * @type {string}
     * @memberof RespTianyanchaSearch
     */
    type?: string

}

/**
*
* @export
* @interface RespUserMemberStatics
*/
export interface RespUserMemberStatics {

    /**
     * 注册转化率
     * @type {number | string}
     * @memberof RespUserMemberStatics
     */
    conversionRate?: number | string

    /**
     * 企业微信客户数
     * @type {number | string}
     * @memberof RespUserMemberStatics
     */
    memberNum?: number | string

    /**
     * 员工名称
     * @type {string}
     * @memberof RespUserMemberStatics
     */
    psnname?: string

    /**
     * 注册用户数
     * @type {number | string}
     * @memberof RespUserMemberStatics
     */
    registerMemberNum?: number | string

}

/**
*
* @export
* @interface RespUserPhone
*/
export interface RespUserPhone {

    /**
     *
     * @type {number | string}
     * @memberof RespUserPhone
     */
    userId?: number | string

    /**
     *
     * @type {string}
     * @memberof RespUserPhone
     */
    userName?: string

}

/**
*
* @export
* @interface RespUserRecommenderDetail
*/
export interface RespUserRecommenderDetail {

    /**
     * 头像
     * @type {string}
     * @memberof RespUserRecommenderDetail
     */
    avatarUrl?: string

    /**
     * 激活时间
     * @type {string}
     * @memberof RespUserRecommenderDetail
     */
    createTime?: string

    /**
     * 会员手机号
     * @type {string}
     * @memberof RespUserRecommenderDetail
     */
    mobile?: string

    /**
     * 奖励列表
     * @type {Array<RespUserRecommonReward>}
     * @memberof RespUserRecommenderDetail
     */
    rewardList?: Array<RespUserRecommonReward>

    /**
     * 奖励总额
     * @type {number | string}
     * @memberof RespUserRecommenderDetail
     */
    rewards?: number | string

    /**
     * 来源 1：客户经理分享 2：小程序自主
     * @type {number | string}
     * @memberof RespUserRecommenderDetail
     */
    source?: number | string

    /**
     * 配置的奖励标准
     * @type {number | string}
     * @memberof RespUserRecommenderDetail
     */
    standardRewards?: number | string

    /**
     * 会员id
     * @type {number | string}
     * @memberof RespUserRecommenderDetail
     */
    userId?: number | string

    /**
     * 会员名称
     * @type {string}
     * @memberof RespUserRecommenderDetail
     */
    userName?: string

}

/**
*
* @export
* @interface RespUserRecommonReward
*/
export interface RespUserRecommonReward {

    /**
     * 公司名称
     * @type {string}
     * @memberof RespUserRecommonReward
     */
    companyName?: string

    /**
     * 信用评审时间
     * @type {string}
     * @memberof RespUserRecommonReward
     */
    creditApprovedTime?: string

    /**
     * 应奖励金额
     * @type {number | string}
     * @memberof RespUserRecommonReward
     */
    rewardAmount?: number | string

    /**
     * 发放时间
     * @type {string}
     * @memberof RespUserRecommonReward
     */
    sendTime?: string

}

/**
*
* @export
* @interface RespWxCompanyMember
*/
export interface RespWxCompanyMember {

    /**
     * 添加时间
     * @type {string}
     * @memberof RespWxCompanyMember
     */
    createTime?: string

    /**
     * 所属分部
     * @type {string}
     * @memberof RespWxCompanyMember
     */
    deptName?: string

    /**
     * 会员企业微信id
     * @type {string}
     * @memberof RespWxCompanyMember
     */
    externalUserid?: string

    /**
     * 性别 1：男 2：女
     * @type {number | string}
     * @memberof RespWxCompanyMember
     */
    gender?: number | string

    /**
     * 注册账号
     * @type {string}
     * @memberof RespWxCompanyMember
     */
    mobile?: string

    /**
     * 姓名
     * @type {string}
     * @memberof RespWxCompanyMember
     */
    name?: string

    /**
     * 添加人手机号
     * @type {string}
     * @memberof RespWxCompanyMember
     */
    psnMobile?: string

    /**
     * 添加人
     * @type {string}
     * @memberof RespWxCompanyMember
     */
    psnname?: string

    /**
     * 是否注册
     * @type {boolean}
     * @memberof RespWxCompanyMember
     */
    register?: boolean

    /**
     * 类型 1：微信 2：企业微信
     * @type {number | string}
     * @memberof RespWxCompanyMember
     */
    type?: number | string

    /**
     * 客户经理id
     * @type {string}
     * @memberof RespWxCompanyMember
     */
    wxCorpUserId?: string

}

/**
*
* @export
* @interface RespWxCompanyMemberDetail
*/
export interface RespWxCompanyMemberDetail {

    /**
     * 头像
     * @type {string}
     * @memberof RespWxCompanyMemberDetail
     */
    avatar?: string

    /**
     * 企业
     * @type {string}
     * @memberof RespWxCompanyMemberDetail
     */
    corpFullName?: string

    /**
     * 添加时间
     * @type {string}
     * @memberof RespWxCompanyMemberDetail
     */
    createTime?: string

    /**
     * 性别 1：男 2：女
     * @type {number | string}
     * @memberof RespWxCompanyMemberDetail
     */
    gender?: number | string

    /**
     * 注册账号
     * @type {string}
     * @memberof RespWxCompanyMemberDetail
     */
    mobile?: string

    /**
     * 姓名
     * @type {string}
     * @memberof RespWxCompanyMemberDetail
     */
    name?: string

    /**
     * 添加人
     * @type {string}
     * @memberof RespWxCompanyMemberDetail
     */
    psnname?: string

    /**
     * 是否注册
     * @type {boolean}
     * @memberof RespWxCompanyMemberDetail
     */
    register?: boolean

    /**
     * 电话
     * @type {Array<string>}
     * @memberof RespWxCompanyMemberDetail
     */
    remarkMobile?: Array<string>

    /**
     * 标签
     * @type {Array<RespWxCorpMemberTag>}
     * @memberof RespWxCompanyMemberDetail
     */
    tagList?: Array<RespWxCorpMemberTag>

    /**
     * 类型 1：微信 2：企业微信
     * @type {number | string}
     * @memberof RespWxCompanyMemberDetail
     */
    type?: number | string

}

/**
*
* @export
* @interface RespWxCompanyMemberStatic
*/
export interface RespWxCompanyMemberStatic {

    /**
     * 已经注册客户数量
     * @type {number | string}
     * @memberof RespWxCompanyMemberStatic
     */
    registerUserNum?: number | string

    /**
     * 筛选项总数
     * @type {number | string}
     * @memberof RespWxCompanyMemberStatic
     */
    totalNum?: number | string

    /**
     * 未注册客户数量
     * @type {number | string}
     * @memberof RespWxCompanyMemberStatic
     */
    waitRegisterUserNum?: number | string

}

/**
*
* @export
* @interface RespWxCorpMemberStatics
*/
export interface RespWxCorpMemberStatics {

    /**
     * 注册转化率
     * @type {number | string}
     * @memberof RespWxCorpMemberStatics
     */
    conversionRate?: number | string

    /**
     * 企业微信客户数
     * @type {number | string}
     * @memberof RespWxCorpMemberStatics
     */
    memberNum?: number | string

    /**
     * 注册用户数
     * @type {number | string}
     * @memberof RespWxCorpMemberStatics
     */
    registerMemberNum?: number | string

}

/**
*
* @export
* @interface RespWxCorpMemberTag
*/
export interface RespWxCorpMemberTag {

    /**
     * 标签分组名称
     * @type {string}
     * @memberof RespWxCorpMemberTag
     */
    groupName?: string

    /**
     * 标签名称
     * @type {string}
     * @memberof RespWxCorpMemberTag
     */
    tagName?: string

}

/**
*
* @export
* @interface RespWxCorpUser
*/
export interface RespWxCorpUser {

    /**
     * 头像
     * @type {string}
     * @memberof RespWxCorpUser
     */
    avatar?: string

    /**
     * 联系我二维码按钮id
     * @type {string}
     * @memberof RespWxCorpUser
     */
    configId?: string

    /**
     * 部门名称
     * @type {string}
     * @memberof RespWxCorpUser
     */
    deptName?: string

    /**
     * 手机号
     * @type {string}
     * @memberof RespWxCorpUser
     */
    mobile?: string

    /**
     * 微信昵称
     * @type {string}
     * @memberof RespWxCorpUser
     */
    name?: string

    /**
     * boss用户工号
     * @type {string}
     * @memberof RespWxCorpUser
     */
    psncode?: string

    /**
     * boss用户名称
     * @type {string}
     * @memberof RespWxCorpUser
     */
    psnname?: string

    /**
     * 企业微信账号id
     * @type {string}
     * @memberof RespWxCorpUser
     */
    wxCorpUserId?: string

}

/**
*
* @export
* @interface RespWxCpIds
*/
export interface RespWxCpIds {

    /**
     * 外部成员id集合
     * @type {Array<string>}
     * @memberof RespWxCpIds
     */
    cropUserIds?: Array<string>

    /**
     * unionId集合
     * @type {Array<string>}
     * @memberof RespWxCpIds
     */
    unionIds?: Array<string>

}

/**
*
* @export
* @interface Result
*/
export interface Result {

    /**
     *
     * @type {Array<RespTianyanchaSearch>}
     * @memberof Result
     */
    items?: Array<RespTianyanchaSearch>

    /**
     *
     * @type {number | string}
     * @memberof Result
     */
    total?: number | string

}

/**
* 业务审核文档模板样例
* @export
* @interface RiskCheckDocTemplateSamplePo
*/
export interface RiskCheckDocTemplateSamplePo {

    /**
     * 创建操作人
     * @type {string}
     * @memberof RiskCheckDocTemplateSamplePo
     */
    createBy?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof RiskCheckDocTemplateSamplePo
     */
    createTime?: string

    /**
     * 是否删除：0-正常；1-已删除
     * @type {number | string}
     * @memberof RiskCheckDocTemplateSamplePo
     */
    deleted?: number | string

    /**
     * 附件名称
     * @type {string}
     * @memberof RiskCheckDocTemplateSamplePo
     */
    fileName?: string

    /**
     * 附件地址
     * @type {string}
     * @memberof RiskCheckDocTemplateSamplePo
     */
    fileUrl?: string

    /**
     * 示例标识
     * @type {number | string}
     * @memberof RiskCheckDocTemplateSamplePo
     */
    sampleId?: number | string

    /**
     * 模板标识
     * @type {number | string}
     * @memberof RiskCheckDocTemplateSamplePo
     */
    templateId?: number | string

    /**
     * 更新操作人
     * @type {string}
     * @memberof RiskCheckDocTemplateSamplePo
     */
    updateBy?: string

    /**
     * 最近修改时间
     * @type {string}
     * @memberof RiskCheckDocTemplateSamplePo
     */
    updateTime?: string

}

/**
* 工程项目资料信息表
* @export
* @interface RiskCheckProjectDocPo
*/
export interface RiskCheckProjectDocPo {

    /**
     * 审批人
     * @type {string}
     * @memberof RiskCheckProjectDocPo
     */
    createBy?: string

    /**
     * 审批时间
     * @type {string}
     * @memberof RiskCheckProjectDocPo
     */
    createTime?: string

    /**
     * 附件名称
     * @type {string}
     * @memberof RiskCheckProjectDocPo
     */
    fileName: string

    /**
     * 附件地址
     * @type {string}
     * @memberof RiskCheckProjectDocPo
     */
    fileUrl: string

    /**
     * 资料主键id
     * @type {number | string}
     * @memberof RiskCheckProjectDocPo
     */
    projectDocId?: number | string

    /**
     * 工程项目id
     * @type {number | string}
     * @memberof RiskCheckProjectDocPo
     */
    projectId?: number | string

    /**
     * 模板id
     * @type {number | string}
     * @memberof RiskCheckProjectDocPo
     */
    templateId: number | string

    /**
     * 更新操作人
     * @type {string}
     * @memberof RiskCheckProjectDocPo
     */
    updateBy?: string

    /**
     * 最近修改时间
     * @type {string}
     * @memberof RiskCheckProjectDocPo
     */
    updateTime?: string

}

/**
*
* @export
* @interface Sort
*/
export interface Sort {

    /**
     * 升序ASC, 降序DESC, 注意大写,排序必填
     * @type {string}
     * @memberof Sort
     */
    direction?: string

    /**
     * 排序属性
     * @type {string}
     * @memberof Sort
     */
    property?: string

}

/**
*
* @export
* @interface StaffInfoResponse
*/
export interface StaffInfoResponse {

    /**
     * 管理员
     * @type {boolean}
     * @memberof StaffInfoResponse
     */
    admin?: boolean

    /**
     * 申请时间（申请加入企业的时间）
     * @type {string}
     * @memberof StaffInfoResponse
     */
    applyTime?: string

    /**
     * 头像
     * @type {string}
     * @memberof StaffInfoResponse
     */
    avatarUrl?: string

    /**
     * companyCode
     * @type {string}
     * @memberof StaffInfoResponse
     */
    companyCode?: string

    /**
     * 当前企业
     * @type {string}
     * @memberof StaffInfoResponse
     */
    companyName?: string

    /**
     * id
     * @type {number | string}
     * @memberof StaffInfoResponse
     */
    id?: number | string

    /**
     * 加入时间（加入企业的时间）
     * @type {string}
     * @memberof StaffInfoResponse
     */
    joinTime?: string

    /**
     * 昵称
     * @type {string}
     * @memberof StaffInfoResponse
     */
    nickName?: string

    /**
     * 手机号码
     * @type {string}
     * @memberof StaffInfoResponse
     */
    phoneNumber?: string

    /**
     * 角色code
     * @type {Array<string>}
     * @memberof StaffInfoResponse
     */
    roleCode?: Array<string>

    /**
     * 角色
     * @type {string}
     * @memberof StaffInfoResponse
     */
    roleName?: string

    /**
     * 用户id
     * @type {number | string}
     * @memberof StaffInfoResponse
     */
    userId?: number | string

}

/**
*
* @export
* @interface TianyanCompanyQualification
*/
export interface TianyanCompanyQualification {

    /**
     *
     * @type {string}
     * @memberof TianyanCompanyQualification
     */
    businessId?: string

    /**
     *
     * @type {string}
     * @memberof TianyanCompanyQualification
     */
    certDate?: string

    /**
     *
     * @type {string}
     * @memberof TianyanCompanyQualification
     */
    certNo?: string

    /**
     *
     * @type {string}
     * @memberof TianyanCompanyQualification
     */
    certificateNum?: string

    /**
     *
     * @type {string}
     * @memberof TianyanCompanyQualification
     */
    companyName?: string

    /**
     *
     * @type {string}
     * @memberof TianyanCompanyQualification
     */
    effectiveTime?: string

    /**
     *
     * @type {string}
     * @memberof TianyanCompanyQualification
     */
    issuingCertificateTime?: string

    /**
     *
     * @type {string}
     * @memberof TianyanCompanyQualification
     */
    organ?: string

    /**
     *
     * @type {string}
     * @memberof TianyanCompanyQualification
     */
    qualificationName?: string

    /**
     *
     * @type {string}
     * @memberof TianyanCompanyQualification
     */
    qualificationRange?: string

    /**
     *
     * @type {number | string}
     * @memberof TianyanCompanyQualification
     */
    tyCompanyId?: number | string

    /**
     *
     * @type {string}
     * @memberof TianyanCompanyQualification
     */
    type?: string

    /**
     *
     * @type {string}
     * @memberof TianyanCompanyQualification
     */
    validityPeriod?: string

}

/**
*
* @export
* @interface UpstreamPayTypeResponse
*/
export interface UpstreamPayTypeResponse {

    /**
     * 费率
     * @type {number | string}
     * @memberof UpstreamPayTypeResponse
     */
    rate?: number | string

    /**
     * 上游支付方式
     * @type {number | string}
     * @memberof UpstreamPayTypeResponse
     */
    upstreamPayType?: number | string

    /**
     * 上游支付方式名称
     * @type {string}
     * @memberof UpstreamPayTypeResponse
     */
    upstreamPayTypeName?: string

}

/**
*
* @export
* @interface UserBasicResp
*/
export interface UserBasicResp {

    /**
     * 已合作甲方
     * @type {string}
     * @memberof UserBasicResp
     */
    cooperatedFirstParty?: string

    /**
     * 信息是否完整
     * @type {boolean}
     * @memberof UserBasicResp
     */
    finishResult?: boolean

    /**
     * 厂商信息
     * @type {string}
     * @memberof UserBasicResp
     */
    manufacturer?: string

    /**
     * 婚姻状态 1：未婚 2：已婚 3：离异
     * @type {number | string}
     * @memberof UserBasicResp
     */
    maritalStatus?: number | string

    /**
     * 老客户信息
     * @type {string}
     * @memberof UserBasicResp
     */
    oldCompanyName?: string

    /**
     * 合作伙伴
     * @type {string}
     * @memberof UserBasicResp
     */
    partner?: string

    /**
     * 修改人
     * @type {string}
     * @memberof UserBasicResp
     */
    updateBy?: string

    /**
     * 用户id
     * @type {number | string}
     * @memberof UserBasicResp
     */
    userId?: number | string

    /**
     * 客户来源 1：销售自拓 2：会销活动 3：厂商介绍 4:老客户转介绍 5:总部分配 6: 客户继承 7：其他
     * @type {number | string}
     * @memberof UserBasicResp
     */
    userSource?: number | string

    /**
     * 常做项目类型 1:居住建筑 2:市政建筑 3:企事业建筑 4:商业娱乐建筑 5:生产性建筑 6:其他
     * @type {string}
     * @memberof UserBasicResp
     */
    usualProjectType?: string

    /**
     * 常做项目类型名称
     * @type {string}
     * @memberof UserBasicResp
     */
    usualProjectTypeName?: string

    /**
     * 常用区域品牌名称
     * @type {string}
     * @memberof UserBasicResp
     */
    usualRegionBrand?: string

    /**
     * 从业年限 1:3年以下 2: 3-5年 3: 5-8年 4: 8-10年 5：10-15年 6:15-20年 7：20年以上
     * @type {number | string}
     * @memberof UserBasicResp
     */
    workingYears?: number | string

}

/**
*
* @export
* @interface UserBusinessInfoAddReq
*/
export interface UserBusinessInfoAddReq {

    /**
     * 是否有其他子公司 false：无 true：有
     * @type {boolean}
     * @memberof UserBusinessInfoAddReq
     */
    affiliatedSubsidiary?: boolean

    /**
     * 经营区域（多选） 1：华东 2：华中 3：华北 4：西北 5：西南 6：全国
     * @type {string}
     * @memberof UserBusinessInfoAddReq
     */
    businessArea?: string

    /**
     * 业务类型和比例
     * @type {string}
     * @memberof UserBusinessInfoAddReq
     */
    businessType?: string

    /**
     * 城市id
     * @type {string}
     * @memberof UserBusinessInfoAddReq
     */
    cityId?: string

    /**
     * 城市名称
     * @type {string}
     * @memberof UserBusinessInfoAddReq
     */
    cityName?: string

    /**
     * 公司规模：1：1000万以下 2：1000万-2000万 3：2000万-3000万 4：3000万-5000万 5：5000万-1亿 6：1亿以上
     * @type {number | string}
     * @memberof UserBusinessInfoAddReq
     */
    companyScale?: number | string

    /**
     * 已合作甲方
     * @type {string}
     * @memberof UserBusinessInfoAddReq
     */
    cooperatedFirstParty?: string

    /**
     * 区id
     * @type {string}
     * @memberof UserBusinessInfoAddReq
     */
    countryId?: string

    /**
     * 区名称
     * @type {string}
     * @memberof UserBusinessInfoAddReq
     */
    countryName?: string

    /**
     * 创建人
     * @type {string}
     * @memberof UserBusinessInfoAddReq
     */
    createBy?: string

    /**
     * 主设备品牌
     * @type {string}
     * @memberof UserBusinessInfoAddReq
     */
    deviceBrand?: string

    /**
     * 主设备品类 1：中央空调系统 2：供暖系统 3：热水器 4：净水系统 5：新风系统 6：智能系统 7：整装木做 8：电梯 9：其他
     * @type {string}
     * @memberof UserBusinessInfoAddReq
     */
    deviceCategory?: string

    /**
     * 主辅材品牌
     * @type {string}
     * @memberof UserBusinessInfoAddReq
     */
    materialsBrand?: string

    /**
     * 主辅材采购渠道 1：厂商 2：一级囤货商 3：经销
     * @type {number | string}
     * @memberof UserBusinessInfoAddReq
     */
    materialsChannel?: number | string

    /**
     * 合作伙伴
     * @type {string}
     * @memberof UserBusinessInfoAddReq
     */
    partner?: string

    /**
     * 工程专业人员 1：项目经理 2：预决算 3：图纸设计 4：工程技术 5：施工安装 6：售后维保
     * @type {string}
     * @memberof UserBusinessInfoAddReq
     */
    projectProfessionals?: string

    /**
     * 工程资质 1：建筑工程施工总承包 2：机电工程施工总承包 3：电子与智能化工程专业承包 4：建筑机电安装工程专业承包 5：建筑装修装饰工程专业承包
     * @type {string}
     * @memberof UserBusinessInfoAddReq
     */
    projectQualification?: string

    /**
     * 工程获取方式 1：单项目投标 2：政府集采大盘 3：总包方合作 4：设计院合作 5：厂商合作 6：其他
     * @type {string}
     * @memberof UserBusinessInfoAddReq
     */
    projectSourceType?: string

    /**
     * 工程类型 1： 居住建筑 2：市政建筑 3：企事业建筑 4：商业娱乐建筑 5：生产性建筑 6：其他
     * @type {string}
     * @memberof UserBusinessInfoAddReq
     */
    projectType?: string

    /**
     * 省id
     * @type {string}
     * @memberof UserBusinessInfoAddReq
     */
    provinceId?: string

    /**
     * 省名称
     * @type {string}
     * @memberof UserBusinessInfoAddReq
     */
    provinceName?: string

    /**
     * 近期工程项目名称
     * @type {string}
     * @memberof UserBusinessInfoAddReq
     */
    recentProjectName?: string

    /**
     * 工程服务能力 false：无 true：有
     * @type {boolean}
     * @memberof UserBusinessInfoAddReq
     */
    serviceCapability?: boolean

    /**
     * 子公司主要经营类型 1：批发商 2：零售商 3：服务商 4：工程商
     * @type {string}
     * @memberof UserBusinessInfoAddReq
     */
    subsidiaryRunType?: string

    /**
     * 用户id
     * @type {number | string}
     * @memberof UserBusinessInfoAddReq
     */
    userId?: number | string

    /**
     * 有无工程资质 0：无工程资质 1：有工程资质
     * @type {number | string}
     * @memberof UserBusinessInfoAddReq
     */
    withProjectQualification?: number | string

}

/**
*
* @export
* @interface UserBusinessInfoResp
*/
export interface UserBusinessInfoResp {

    /**
     * 是否有其他子公司 false：无 true：有
     * @type {boolean}
     * @memberof UserBusinessInfoResp
     */
    affiliatedSubsidiary?: boolean

    /**
     * 经营区域（多选） 1：华东 2：华中 3：华北 4：西北 5：西南 6：全国
     * @type {string}
     * @memberof UserBusinessInfoResp
     */
    businessArea?: string

    /**
     * 经营区域名称（多选） 1：华东 2：华中 3：华北 4：西北 5：西南 6：全国
     * @type {string}
     * @memberof UserBusinessInfoResp
     */
    businessAreaName?: string

    /**
     * 业务类型和比例
     * @type {string}
     * @memberof UserBusinessInfoResp
     */
    businessType?: string

    /**
     * 城市id
     * @type {string}
     * @memberof UserBusinessInfoResp
     */
    cityId?: string

    /**
     * 城市名称
     * @type {string}
     * @memberof UserBusinessInfoResp
     */
    cityName?: string

    /**
     * 公司规模：1：1000万以下 2：1000万-2000万 3：2000万-3000万 4：3000万-5000万 5：5000万-1亿 6：1亿以上
     * @type {number | string}
     * @memberof UserBusinessInfoResp
     */
    companyScale?: number | string

    /**
     * 公司规模名称
     * @type {string}
     * @memberof UserBusinessInfoResp
     */
    companyScaleName?: string

    /**
     * 已合作甲方
     * @type {string}
     * @memberof UserBusinessInfoResp
     */
    cooperatedFirstParty?: string

    /**
     * 区id
     * @type {string}
     * @memberof UserBusinessInfoResp
     */
    countryId?: string

    /**
     * 区名称
     * @type {string}
     * @memberof UserBusinessInfoResp
     */
    countryName?: string

    /**
     * 创建人
     * @type {string}
     * @memberof UserBusinessInfoResp
     */
    createBy?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof UserBusinessInfoResp
     */
    createTime?: string

    /**
     * 主设备品牌
     * @type {string}
     * @memberof UserBusinessInfoResp
     */
    deviceBrand?: string

    /**
     * 主设备品类 1：中央空调系统 2：供暖系统 3：热水器 4：净水系统 5：新风系统 6：智能系统 7：整装木做 8：电梯 9：其他
     * @type {string}
     * @memberof UserBusinessInfoResp
     */
    deviceCategory?: string

    /**
     * 主设备品类名称
     * @type {string}
     * @memberof UserBusinessInfoResp
     */
    deviceCategoryName?: string

    /**
     * 已填字段数量
     * @type {number | string}
     * @memberof UserBusinessInfoResp
     */
    finishNumber?: number | string

    /**
     * 主键id
     * @type {number | string}
     * @memberof UserBusinessInfoResp
     */
    id?: number | string

    /**
     * 主辅材品牌
     * @type {string}
     * @memberof UserBusinessInfoResp
     */
    materialsBrand?: string

    /**
     * 主辅材采购渠道 1：厂商 2：一级囤货商 3：经销
     * @type {number | string}
     * @memberof UserBusinessInfoResp
     */
    materialsChannel?: number | string

    /**
     * 主辅材采购渠道名称
     * @type {string}
     * @memberof UserBusinessInfoResp
     */
    materialsChannelName?: string

    /**
     * 合作伙伴
     * @type {string}
     * @memberof UserBusinessInfoResp
     */
    partner?: string

    /**
     * 工程专业人员名称
     * @type {string}
     * @memberof UserBusinessInfoResp
     */
    projectProfessionalNames?: string

    /**
     * 工程专业人员 1：项目经理 2：预决算 3：图纸设计 4：工程技术 5：施工安装 6：售后维保
     * @type {string}
     * @memberof UserBusinessInfoResp
     */
    projectProfessionals?: string

    /**
     * 工程资质 1：建筑工程施工总承包 2：机电工程施工总承包 3：电子与智能化工程专业承包 4：建筑机电安装工程专业承包 5：建筑装修装饰工程专业承包
     * @type {string}
     * @memberof UserBusinessInfoResp
     */
    projectQualification?: string

    /**
     * 工程资质名称
     * @type {string}
     * @memberof UserBusinessInfoResp
     */
    projectQualificationName?: string

    /**
     * 工程获取方式 1：单项目投标 2：政府集采大盘 3：总包方合作 4：设计院合作 5：厂商合作 6：其他
     * @type {string}
     * @memberof UserBusinessInfoResp
     */
    projectSourceType?: string

    /**
     * 工程获取方式名称
     * @type {string}
     * @memberof UserBusinessInfoResp
     */
    projectSourceTypeName?: string

    /**
     * 工程类型 1： 居住建筑 2：市政建筑 3：企事业建筑 4：商业娱乐建筑 5：生产性建筑 6：其他
     * @type {string}
     * @memberof UserBusinessInfoResp
     */
    projectType?: string

    /**
     * 工程类型名称
     * @type {string}
     * @memberof UserBusinessInfoResp
     */
    projectTypeName?: string

    /**
     * 省id
     * @type {string}
     * @memberof UserBusinessInfoResp
     */
    provinceId?: string

    /**
     * 省名称
     * @type {string}
     * @memberof UserBusinessInfoResp
     */
    provinceName?: string

    /**
     * 近期工程项目名称
     * @type {string}
     * @memberof UserBusinessInfoResp
     */
    recentProjectName?: string

    /**
     * 工程服务能力 false：无 true：有
     * @type {boolean}
     * @memberof UserBusinessInfoResp
     */
    serviceCapability?: boolean

    /**
     * 子公司主要经营类型 1：批发商 2：零售商 3：服务商 4：工程商
     * @type {string}
     * @memberof UserBusinessInfoResp
     */
    subsidiaryRunType?: string

    /**
     * 子公司主要经营类型 1：批发商 2：零售商 3：服务商 4：工程商
     * @type {string}
     * @memberof UserBusinessInfoResp
     */
    subsidiaryRunTypeName?: string

    /**
     * 字段总数
     * @type {number | string}
     * @memberof UserBusinessInfoResp
     */
    totalNumber?: number | string

    /**
     * 修改人
     * @type {string}
     * @memberof UserBusinessInfoResp
     */
    updateBy?: string

    /**
     * 修改时间
     * @type {string}
     * @memberof UserBusinessInfoResp
     */
    updateTime?: string

    /**
     * 用户id
     * @type {number | string}
     * @memberof UserBusinessInfoResp
     */
    userId?: number | string

    /**
     * 有无工程资质 0：无工程资质 1：有工程资质
     * @type {number | string}
     * @memberof UserBusinessInfoResp
     */
    withProjectQualification?: number | string

}

/**
*
* @export
* @interface UserBusinessInfoUpdateReq
*/
export interface UserBusinessInfoUpdateReq {

    /**
     * 是否有其他子公司 false：无 true：有
     * @type {boolean}
     * @memberof UserBusinessInfoUpdateReq
     */
    affiliatedSubsidiary?: boolean

    /**
     * 经营区域（多选） 1：华东 2：华中 3：华北 4：西北 5：西南 6：全国
     * @type {string}
     * @memberof UserBusinessInfoUpdateReq
     */
    businessArea?: string

    /**
     * 业务类型和比例
     * @type {string}
     * @memberof UserBusinessInfoUpdateReq
     */
    businessType?: string

    /**
     * 城市id
     * @type {string}
     * @memberof UserBusinessInfoUpdateReq
     */
    cityId?: string

    /**
     * 城市名称
     * @type {string}
     * @memberof UserBusinessInfoUpdateReq
     */
    cityName?: string

    /**
     * 公司规模：1：1000万以下 2：1000万-2000万 3：2000万-3000万 4：3000万-5000万 5：5000万-1亿 6：1亿以上
     * @type {number | string}
     * @memberof UserBusinessInfoUpdateReq
     */
    companyScale?: number | string

    /**
     * 已合作甲方
     * @type {string}
     * @memberof UserBusinessInfoUpdateReq
     */
    cooperatedFirstParty?: string

    /**
     * 区id
     * @type {string}
     * @memberof UserBusinessInfoUpdateReq
     */
    countryId?: string

    /**
     * 区名称
     * @type {string}
     * @memberof UserBusinessInfoUpdateReq
     */
    countryName?: string

    /**
     * 创建人
     * @type {string}
     * @memberof UserBusinessInfoUpdateReq
     */
    createBy?: string

    /**
     * 主设备品牌
     * @type {string}
     * @memberof UserBusinessInfoUpdateReq
     */
    deviceBrand?: string

    /**
     * 主设备品类 1：中央空调系统 2：供暖系统 3：热水器 4：净水系统 5：新风系统 6：智能系统 7：整装木做 8：电梯 9：其他
     * @type {string}
     * @memberof UserBusinessInfoUpdateReq
     */
    deviceCategory?: string

    /**
     * 主键id
     * @type {number | string}
     * @memberof UserBusinessInfoUpdateReq
     */
    id?: number | string

    /**
     * 主辅材品牌
     * @type {string}
     * @memberof UserBusinessInfoUpdateReq
     */
    materialsBrand?: string

    /**
     * 主辅材采购渠道 1：厂商 2：一级囤货商 3：经销
     * @type {number | string}
     * @memberof UserBusinessInfoUpdateReq
     */
    materialsChannel?: number | string

    /**
     * 合作伙伴
     * @type {string}
     * @memberof UserBusinessInfoUpdateReq
     */
    partner?: string

    /**
     * 工程专业人员 1：项目经理 2：预决算 3：图纸设计 4：工程技术 5：施工安装 6：售后维保
     * @type {string}
     * @memberof UserBusinessInfoUpdateReq
     */
    projectProfessionals?: string

    /**
     * 工程资质 1：建筑工程施工总承包 2：机电工程施工总承包 3：电子与智能化工程专业承包 4：建筑机电安装工程专业承包 5：建筑装修装饰工程专业承包
     * @type {string}
     * @memberof UserBusinessInfoUpdateReq
     */
    projectQualification?: string

    /**
     * 工程获取方式 1：单项目投标 2：政府集采大盘 3：总包方合作 4：设计院合作 5：厂商合作 6：其他
     * @type {string}
     * @memberof UserBusinessInfoUpdateReq
     */
    projectSourceType?: string

    /**
     * 工程类型 1： 居住建筑 2：市政建筑 3：企事业建筑 4：商业娱乐建筑 5：生产性建筑 6：其他
     * @type {string}
     * @memberof UserBusinessInfoUpdateReq
     */
    projectType?: string

    /**
     * 省id
     * @type {string}
     * @memberof UserBusinessInfoUpdateReq
     */
    provinceId?: string

    /**
     * 省名称
     * @type {string}
     * @memberof UserBusinessInfoUpdateReq
     */
    provinceName?: string

    /**
     * 近期工程项目名称
     * @type {string}
     * @memberof UserBusinessInfoUpdateReq
     */
    recentProjectName?: string

    /**
     * 工程服务能力 false：无 true：有
     * @type {boolean}
     * @memberof UserBusinessInfoUpdateReq
     */
    serviceCapability?: boolean

    /**
     * 子公司主要经营类型 1：批发商 2：零售商 3：服务商 4：工程商
     * @type {string}
     * @memberof UserBusinessInfoUpdateReq
     */
    subsidiaryRunType?: string

    /**
     * 用户id
     * @type {number | string}
     * @memberof UserBusinessInfoUpdateReq
     */
    userId?: number | string

    /**
     * 有无工程资质 0：无工程资质 1：有工程资质
     * @type {number | string}
     * @memberof UserBusinessInfoUpdateReq
     */
    withProjectQualification?: number | string

}

/**
*
* @export
* @interface UserFlowUpRequest
*/
export interface UserFlowUpRequest {

    /**
     * 跟进事件id 线索id/客户id/1.0项目id/2.0项目id
     * @type {number | string}
     * @memberof UserFlowUpRequest
     */
    bizId?: number | string

    /**
     * 跟进内容
     * @type {string}
     * @memberof UserFlowUpRequest
     */
    content?: string

    /**
     * 创建人
     * @type {string}
     * @memberof UserFlowUpRequest
     */
    createBy?: string

    /**
     * 创建人手机号
     * @type {string}
     * @memberof UserFlowUpRequest
     */
    createPhone?: string

    /**
     * 当前商机 1：有已中标项目 2：有尚未中标项目 3：已从别处用过资 4：从区域供货商拿货 5：从厂家拿货 6：以上信息均无
     * @type {string}
     * @memberof UserFlowUpRequest
     */
    currentBusinessOpportunities?: string

    /**
     * 本次拜访价值 1：有集采线索项目 2：有合作（严选）线索项目 3：有合作（分润）线索项目 4：线索商户，暂无项目 5：此为KOL关键人
     * @type {string}
     * @memberof UserFlowUpRequest
     */
    currentVisitValue?: string

    /**
     * 当前阶段 1：初步建立联系 2：初步达成意向 3：方案已推介 4：客户已评级 5：项目推进中 6：首次交易成功 7：合作关闭
     * @type {number | string}
     * @memberof UserFlowUpRequest
     */
    flowUpProcess?: number | string

    /**
     * 主键id
     * @type {number | string}
     * @memberof UserFlowUpRequest
     */
    id?: number | string

    /**
     * 下次跟进时间
     * @type {string}
     * @memberof UserFlowUpRequest
     */
    nextFlowTime?: string

    /**
     * 下一步计划 1：见到关键人 2：初步达成意向 3：推进评级 4：等过会 5：给报价 6：给客户的需求清单（严选业务）
     * @type {number | string}
     * @memberof UserFlowUpRequest
     */
    nextStepPlan?: number | string

    /**
     * 随访人员
     * @type {Array<FlowUpPartnerRequest>}
     * @memberof UserFlowUpRequest
     */
    partners?: Array<FlowUpPartnerRequest>

    /**
     * 当面拜访->现场图片        电话/微信沟通/邮件->附件
     * @type {Array<string>}
     * @memberof UserFlowUpRequest
     */
    picUrls?: Array<string>

    /**
     * 备注
     * @type {string}
     * @memberof UserFlowUpRequest
     */
    remark?: string

    /**
     * 跟进类型 1：当面拜访 2：电话/微信沟通/邮件等
     * @type {number | string}
     * @memberof UserFlowUpRequest
     */
    type?: number | string

    /**
     * 客户标签(逗号隔开)：1：可发展为集采会员 2：有集采PLUS机会: 3：有严选供应链机会 4：可助力品牌合作 5：可发展为区域KOL
     * @type {string}
     * @memberof UserFlowUpRequest
     */
    userTag?: string

    /**
     * 拜访目标
     * @type {string}
     * @memberof UserFlowUpRequest
     */
    visitTarget?: string

}

/**
*
* @export
* @interface UserFlowUpResp
*/
export interface UserFlowUpResp {

    /**
     * 头像
     * @type {string}
     * @memberof UserFlowUpResp
     */
    avatarUrl?: string

    /**
     * 跟进事件id 线索id/客户id/1.0项目id/2.0项目id
     * @type {number | string}
     * @memberof UserFlowUpResp
     */
    bizId?: number | string

    /**
     * 事件类型 1：线索  2：客户 3：1.0项目 4: 2.0项目
     * @type {number | string}
     * @memberof UserFlowUpResp
     */
    bizType?: number | string

    /**
     * 企业名称
     * @type {string}
     * @memberof UserFlowUpResp
     */
    companyName?: string

    /**
     * 跟进内容
     * @type {string}
     * @memberof UserFlowUpResp
     */
    content?: string

    /**
     * 头像
     * @type {string}
     * @memberof UserFlowUpResp
     */
    createAvatar?: string

    /**
     * 跟进人
     * @type {string}
     * @memberof UserFlowUpResp
     */
    createBy?: string

    /**
     * 跟进人手机号
     * @type {string}
     * @memberof UserFlowUpResp
     */
    createPhone?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof UserFlowUpResp
     */
    createTime?: string

    /**
     * 当前商机 1：有已中标项目 2：有尚未中标项目 3：已从别处用过资 4：从区域供货商拿货 5：从厂家拿货 6：以上信息均无
     * @type {string}
     * @memberof UserFlowUpResp
     */
    currentBusinessOpportunities?: string

    /**
     * 当前商机名称
     * @type {string}
     * @memberof UserFlowUpResp
     */
    currentBusinessOpportunitiesName?: string

    /**
     * 本次拜访价值 1：有集采线索项目 2：有合作（严选）线索项目 3：有合作（分润）线索项目 4：线索商户，暂无项目 5：此为KOL关键人
     * @type {string}
     * @memberof UserFlowUpResp
     */
    currentVisitValue?: string

    /**
     * 本次拜访价值名称
     * @type {string}
     * @memberof UserFlowUpResp
     */
    currentVisitValueName?: string

    /**
     * 企业微信消息
     * @type {FlowUpDynamic}
     * @memberof UserFlowUpResp
     */
    flowUpDynamic?: FlowUpDynamic

    /**
     * 跟进阶段 1：初步建立联系 2：初步达成意向 3：方案已推介 4：客户已评级 5：项目推进中 6：首次交易成功 7：合作关闭
     * @type {number | string}
     * @memberof UserFlowUpResp
     */
    flowUpProcess?: number | string

    /**
     * 主键id
     * @type {number | string}
     * @memberof UserFlowUpResp
     */
    id?: number | string

    /**
     * 下次跟进时间
     * @type {string}
     * @memberof UserFlowUpResp
     */
    nextFlowTime?: string

    /**
     * 下一步计划 1：见到关键人 2：初步达成意向 3：推进评级 4：等过会 5：给报价 6：给客户的需求清单（严选业务）
     * @type {number | string}
     * @memberof UserFlowUpResp
     */
    nextStepPlan?: number | string

    /**
     * 下一步计划名称
     * @type {string}
     * @memberof UserFlowUpResp
     */
    nextStepPlanName?: string

    /**
     * 随访人员
     * @type {Array<FlowUpPartner>}
     * @memberof UserFlowUpResp
     */
    partners?: Array<FlowUpPartner>

    /**
     * 当面拜访->现场图片        电话/微信沟通/邮件->附件
     * @type {Array<string>}
     * @memberof UserFlowUpResp
     */
    picUrls?: Array<string>

    /**
     * 备注
     * @type {string}
     * @memberof UserFlowUpResp
     */
    remark?: string

    /**
     * 跟进类型 1：当面拜访 2：电话/微信沟通/邮件等
     * @type {number | string}
     * @memberof UserFlowUpResp
     */
    type?: number | string

    /**
     * 修改人
     * @type {string}
     * @memberof UserFlowUpResp
     */
    updateBy?: string

    /**
     * 修改人手机号
     * @type {string}
     * @memberof UserFlowUpResp
     */
    updatePhone?: string

    /**
     * 更新时间
     * @type {string}
     * @memberof UserFlowUpResp
     */
    updateTime?: string

    /**
     * 用户id
     * @type {number | string}
     * @memberof UserFlowUpResp
     */
    userId?: number | string

    /**
     * 客户姓名
     * @type {string}
     * @memberof UserFlowUpResp
     */
    userName?: string

    /**
     * 客户标签(逗号隔开)：1：可发展为集采会员 2：有集采PLUS机会: 3：有严选供应链机会 4：可助力品牌合作 5：可发展为区域KOL
     * @type {string}
     * @memberof UserFlowUpResp
     */
    userTag?: string

    /**
     * 拜访目标
     * @type {string}
     * @memberof UserFlowUpResp
     */
    visitTarget?: string

}

/**
*
* @export
* @interface UserRole
*/
export interface UserRole {

    /**
     * 主键id
     * @type {number | string}
     * @memberof UserRole
     */
    id?: number | string

    /**
     * 角色编码 1：老板 2：操盘手 3：业务 4：财务 5：仓管 6：普通员工
     * @type {string}
     * @memberof UserRole
     */
    roleCode?: string

    /**
     * 角色名称
     * @type {string}
     * @memberof UserRole
     */
    roleName?: string

}

/**
*
* @export
* @interface UserWeixin
*/
export interface UserWeixin {

    /**
     *
     * @type {string}
     * @memberof UserWeixin
     */
    avatarUrl?: string

    /**
     *
     * @type {string}
     * @memberof UserWeixin
     */
    corpUserId?: string

    /**
     *
     * @type {string}
     * @memberof UserWeixin
     */
    createTime?: string

    /**
     *
     * @type {string}
     * @memberof UserWeixin
     */
    hcgOpenId?: string

    /**
     *
     * @type {number | string}
     * @memberof UserWeixin
     */
    id?: number | string

    /**
     *
     * @type {string}
     * @memberof UserWeixin
     */
    iotOpenId?: string

    /**
     *
     * @type {string}
     * @memberof UserWeixin
     */
    mobile?: string

    /**
     *
     * @type {string}
     * @memberof UserWeixin
     */
    nickName?: string

    /**
     *
     * @type {string}
     * @memberof UserWeixin
     */
    openId?: string

    /**
     *
     * @type {string}
     * @memberof UserWeixin
     */
    sessionKey?: string

    /**
     *
     * @type {string}
     * @memberof UserWeixin
     */
    unionId?: string

    /**
     *
     * @type {string}
     * @memberof UserWeixin
     */
    updateTime?: string

    /**
     *
     * @type {number | string}
     * @memberof UserWeixin
     */
    userId?: number | string

}

/**
*
* @export
* @interface View
*/
export interface View {

    /**
     *
     * @type {string}
     * @memberof View
     */
    contentType?: string

}

/**
*
* @export
* @interface VipRulePo
*/
export interface VipRulePo {

    /**
     *
     * @type {number | string}
     * @memberof VipRulePo
     */
    id?: number | string

    /**
     *
     * @type {number | string}
     * @memberof VipRulePo
     */
    serviceFeeDiscount?: number | string

    /**
     *
     * @type {string}
     * @memberof VipRulePo
     */
    vipRule?: string

    /**
     *
     * @type {string}
     * @memberof VipRulePo
     */
    vipTarget?: string

}

/**
*
* @export
* @interface WxCorpUser
*/
export interface WxCorpUser {

    /**
     *
     * @type {string}
     * @memberof WxCorpUser
     */
    createTime?: string

    /**
     *
     * @type {number | string}
     * @memberof WxCorpUser
     */
    deleted?: number | string

    /**
     *
     * @type {string}
     * @memberof WxCorpUser
     */
    deptName?: string

    /**
     *
     * @type {number | string}
     * @memberof WxCorpUser
     */
    id?: number | string

    /**
     *
     * @type {string}
     * @memberof WxCorpUser
     */
    mobile?: string

    /**
     *
     * @type {string}
     * @memberof WxCorpUser
     */
    pkDeptDoc?: string

    /**
     *
     * @type {string}
     * @memberof WxCorpUser
     */
    psncode?: string

    /**
     *
     * @type {string}
     * @memberof WxCorpUser
     */
    psnname?: string

    /**
     *
     * @type {string}
     * @memberof WxCorpUser
     */
    updateTime?: string

    /**
     *
     * @type {string}
     * @memberof WxCorpUser
     */
    wxCorpUserId?: string

}

/**
*
* @export
* @interface WxCpUser
*/
export interface WxCpUser {

    /**
     *
     * @type {string}
     * @memberof WxCpUser
     */
    address?: string

    /**
     *
     * @type {string}
     * @memberof WxCpUser
     */
    alias?: string

    /**
     *
     * @type {string}
     * @memberof WxCpUser
     */
    avatar?: string

    /**
     *
     * @type {string}
     * @memberof WxCpUser
     */
    avatarMediaId?: string

    /**
     *
     * @type {Array<number | string>}
     * @memberof WxCpUser
     */
    departIds?: Array<number | string>

    /**
     *
     * @type {string}
     * @memberof WxCpUser
     */
    email?: string

    /**
     *
     * @type {number | string}
     * @memberof WxCpUser
     */
    enable?: number | string

    /**
     *
     * @type {string}
     * @memberof WxCpUser
     */
    englishName?: string

    /**
     *
     * @type {Array<Attr>}
     * @memberof WxCpUser
     */
    extAttrs?: Array<Attr>

    /**
     *
     * @type {Array<ExternalAttribute>}
     * @memberof WxCpUser
     */
    externalAttrs?: Array<ExternalAttribute>

    /**
     *
     * @type {string}
     * @memberof WxCpUser
     */
    gender?: string

    /**
     *
     * @type {number | string}
     * @memberof WxCpUser
     */
    hideMobile?: number | string

    /**
     *
     * @type {number | string}
     * @memberof WxCpUser
     */
    isLeader?: number | string

    /**
     *
     * @type {Array<number | string>}
     * @memberof WxCpUser
     */
    isLeaderInDept?: Array<number | string>

    /**
     *
     * @type {string}
     * @memberof WxCpUser
     */
    mobile?: string

    /**
     *
     * @type {string}
     * @memberof WxCpUser
     */
    name?: string

    /**
     *
     * @type {Array<number | string>}
     * @memberof WxCpUser
     */
    orders?: Array<number | string>

    /**
     *
     * @type {string}
     * @memberof WxCpUser
     */
    position?: string

    /**
     *
     * @type {string}
     * @memberof WxCpUser
     */
    qrCode?: string

    /**
     *
     * @type {number | string}
     * @memberof WxCpUser
     */
    status?: number | string

    /**
     *
     * @type {string}
     * @memberof WxCpUser
     */
    telephone?: string

    /**
     *
     * @type {string}
     * @memberof WxCpUser
     */
    thumbAvatar?: string

    /**
     *
     * @type {boolean}
     * @memberof WxCpUser
     */
    toInvite?: boolean

    /**
     *
     * @type {string}
     * @memberof WxCpUser
     */
    userId?: string

}

/**
*
* @export
* @interface 临时额度明细
*/
export interface 临时额度明细 {

    /**
     * 到期时间(失效时间)
     * @type {string}
     * @memberof 临时额度明细
     */
    expireTime?: string

    /**
     * 冻结总额
     * @type {number | string}
     * @memberof 临时额度明细
     */
    freezeAmount?: number | string

    /**
     * 临时额度
     * @type {number | string}
     * @memberof 临时额度明细
     */
    quotaAmount?: number | string

}

/**
* 企业
* @export
* @interface 企业
*/
export interface 企业 {

    /**
     * 详细地址
     * @type {string}
     * @memberof 企业
     */
    addressName?: string

    /**
     * 认证状态 1：未认证 2：认证中 3：认证成功 4：认证失败
     * @type {number | string}
     * @memberof 企业
     */
    authenticationStatus?: number | string

    /**
     * 认证时间
     * @type {string}
     * @memberof 企业
     */
    authenticationTime?: string

    /**
     * 城市id
     * @type {string}
     * @memberof 企业
     */
    cityId?: string

    /**
     * 市名称
     * @type {string}
     * @memberof 企业
     */
    cityName?: string

    /**
     * 企业编码
     * @type {string}
     * @memberof 企业
     */
    companyCode?: string

    /**
     * 企业简称
     * @type {string}
     * @memberof 企业
     */
    companyName?: string

    /**
     * 区id
     * @type {string}
     * @memberof 企业
     */
    countryId?: string

    /**
     * 区/县名称
     * @type {string}
     * @memberof 企业
     */
    countryName?: string

    /**
     * 创建人
     * @type {number | string}
     * @memberof 企业
     */
    createBy?: number | string

    /**
     * 省id
     * @type {string}
     * @memberof 企业
     */
    provinceId?: string

    /**
     * 省名称
     * @type {string}
     * @memberof 企业
     */
    provinceName?: string

    /**
     * 企业来源 1 B2B 2 CRM
     * @type {number | string}
     * @memberof 企业
     */
    source?: number | string

    /**
     * 维护人
     * @type {number | string}
     * @memberof 企业
     */
    updateBy?: number | string

    /**
     * 会员id
     * @type {number | string}
     * @memberof 企业
     */
    userId?: number | string

}

/**
*
* @export
* @interface 小程序展示智能化系统列表
*/
export interface 小程序展示智能化系统列表 {

    /**
     * id
     * @type {number | string}
     * @memberof 小程序展示智能化系统列表
     */
    id?: number | string

    /**
     * 智能化系统详情
     * @type {string}
     * @memberof 小程序展示智能化系统列表
     */
    intelligentSystemDetail?: string

    /**
     * 智能化系统名称
     * @type {string}
     * @memberof 小程序展示智能化系统列表
     */
    intelligentSystemName?: string

    /**
     *
     * @type {string}
     * @memberof 小程序展示智能化系统列表
     */
    schemeName?: string

    /**
     * 是否有关联工程案例
     * @type {boolean}
     * @memberof 小程序展示智能化系统列表
     */
    schemeRelation?: boolean

}

/**
*
* @export
* @interface 工程方案
*/
export interface 工程方案 {

    /**
     * 创建时间
     * @type {string}
     * @memberof 工程方案
     */
    createTime?: string

    /**
     * id
     * @type {number | string}
     * @memberof 工程方案
     */
    id?: number | string

    /**
     * 方案详情
     * @type {string}
     * @memberof 工程方案
     */
    schemeDetail?: string

    /**
     * 缩略图
     * @type {string}
     * @memberof 工程方案
     */
    schemeImage?: string

    /**
     * 方案名称
     * @type {string}
     * @memberof 工程方案
     */
    schemeTitle?: string

}

/**
*
* @export
* @interface 智能化系统关联方案列表
*/
export interface 智能化系统关联方案列表 {

    /**
     * id
     * @type {number | string}
     * @memberof 智能化系统关联方案列表
     */
    id?: number | string

    /**
     * 方案名称
     * @type {string}
     * @memberof 智能化系统关联方案列表
     */
    schemeTitle?: string

}

/**
*
* @export
* @interface 智能化系统列表
*/
export interface 智能化系统列表 {

    /**
     * 创建人
     * @type {string}
     * @memberof 智能化系统列表
     */
    createBy?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof 智能化系统列表
     */
    createTime?: string

    /**
     * id
     * @type {number | string}
     * @memberof 智能化系统列表
     */
    id?: number | string

    /**
     * 智能化系统名称
     * @type {string}
     * @memberof 智能化系统列表
     */
    intelligentSystemName?: string

    /**
     * 工程方案名称
     * @type {string}
     * @memberof 智能化系统列表
     */
    schemeName?: string

    /**
     * 更新人
     * @type {string}
     * @memberof 智能化系统列表
     */
    updateBy?: string

    /**
     * 更新时间
     * @type {string}
     * @memberof 智能化系统列表
     */
    updateTime?: string

}

/**
*
* @export
* @interface 智能化系统详情
*/
export interface 智能化系统详情 {

    /**
     * id
     * @type {number | string}
     * @memberof 智能化系统详情
     */
    id?: number | string

    /**
     * 智能化系统详情
     * @type {string}
     * @memberof 智能化系统详情
     */
    intelligentSystemDetail?: string

    /**
     * 智能化系统名称
     * @type {string}
     * @memberof 智能化系统详情
     */
    intelligentSystemName?: string

    /**
     * 工程方案ID
     * @type {Array<number | string>}
     * @memberof 智能化系统详情
     */
    schemeId?: Array<number | string>

    /**
     * 是否有关联工程案例
     * @type {boolean}
     * @memberof 智能化系统详情
     */
    schemeRelation?: boolean

}
