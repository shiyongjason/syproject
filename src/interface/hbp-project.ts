interface JsonNode{}
/**
*
* @export
* @interface ReqPurchaseOrder
*/
export interface ReqPurchaseOrder {

    /**
     * 主键id
     * @type {number | string}
     * @memberof ReqPurchaseOrder
     */
    id?: number | string

    /**
     * 采购单名称
     * @type {string}
     * @memberof ReqPurchaseOrder
     */
    poName?: string

    /**
     * 项目Id
     * @type {number | string}
     * @memberof ReqPurchaseOrder
     */
    projectId: number | string

    /**
     * 项目编号
     * @type {string}
     * @memberof ReqPurchaseOrder
     */
    projectNo?: string

    /**
     * 项目名称
     * @type {string}
     * @memberof ReqPurchaseOrder
     */
    projectName?: string

    /**
     * 经销商公司Id
     * @type {number | string}
     * @memberof ReqPurchaseOrder
     */
    companyId: number | string

    /**
     * 经销商名称
     * @type {string}
     * @memberof ReqPurchaseOrder
     */
    companyName: string

    /**
     * 采购单金额
     * @type {number | string}
     * @memberof ReqPurchaseOrder
     */
    poAmount?: number | string

    /**
     * 状态：1-待提交;2-采购单待确认;3-变更待确认;4-采购中;5-采购单完成;6-采购单关闭
     * @type {number | string}
     * @memberof ReqPurchaseOrder
     */
    status?: number | string

    /**
     * 免息方式：0-无;1-1个月;2-2个月;3-3个月;4-4个月;5-5个月;6-6个月
     * @type {number | string}
     * @memberof ReqPurchaseOrder
     */
    freeInterestType?: number | string

    /**
     * 签约结果：0-未知;1-确认签约完成;2-驳回
     * @type {number | string}
     * @memberof ReqPurchaseOrder
     */
    signResult?: number | string

    /**
     * 签约结果备注
     * @type {string}
     * @memberof ReqPurchaseOrder
     */
    remark?: string

    /**
     * 提交时间
     * @type {string}
     * @memberof ReqPurchaseOrder
     */
    submitTime?: string

    /**
     * 提交人
     * @type {string}
     * @memberof ReqPurchaseOrder
     */
    submitBy?: string

    /**
     * 提交人手机号
     * @type {string}
     * @memberof ReqPurchaseOrder
     */
    submitMobile?: string

    /**
     * 创建人
     * @type {string}
     * @memberof ReqPurchaseOrder
     */
    createBy?: string

    /**
     * 创建人手机号
     * @type {string}
     * @memberof ReqPurchaseOrder
     */
    createPhone?: string

    /**
     * 更新人
     * @type {string}
     * @memberof ReqPurchaseOrder
     */
    updateBy?: string

}

/**
*
* @export
* @interface ReqPurchaseOrderConfirm
*/
export interface ReqPurchaseOrderConfirm {

    /**
     * 采购订单主键Id
     * @type {number | string}
     * @memberof ReqPurchaseOrderConfirm
     */
    poId: number | string

    /**
     * 签约结果：0-未知;1-确认签约完成;2-驳回
     * @type {number | string}
     * @memberof ReqPurchaseOrderConfirm
     */
    signResult: number | string

    /**
     * 签约结果备注
     * @type {string}
     * @memberof ReqPurchaseOrderConfirm
     */
    remark?: string

    /**
     * 免息方式
     * @type {number | string}
     * @memberof ReqPurchaseOrderConfirm
     */
    freeInterestType?: number | string

}

/**
*
* @export
* @interface ReqPurchaseOrderContract
*/
export interface ReqPurchaseOrderContract {

    /**
     * 关联id
     * @type {number | string}
     * @memberof ReqPurchaseOrderContract
     */
    id?: number | string

    /**
     * 采购单id
     * @type {number | string}
     * @memberof ReqPurchaseOrderContract
     */
    purchaseOrderId: number | string

    /**
     * 合同id
     * @type {number | string}
     * @memberof ReqPurchaseOrderContract
     */
    contractId: number | string

    /**
     * 生效状态：0-待生效;1-生效中;2-已失效
     * @type {number | string}
     * @memberof ReqPurchaseOrderContract
     */
    effectiveState?: number | string

    /**
     * 创建人
     * @type {string}
     * @memberof ReqPurchaseOrderContract
     */
    createBy?: string

    /**
     * 更新人
     * @type {string}
     * @memberof ReqPurchaseOrderContract
     */
    updateBy?: string

}

/**
*
* @export
* @interface PrepaymentCancelResponse
*/
export interface PrepaymentCancelResponse {

    /**
     * 取消人，当前操作人名称
     * @type {string}
     * @memberof PrepaymentCancelResponse
     */
    cancelUser: string

    /**
     *
     * @type {number | string}
     * @memberof PrepaymentCancelResponse
     */
    id?: number | string

}

/**
*
* @export
* @interface ReqLoanTransferUpdate
*/
export interface ReqLoanTransferUpdate {

    /**
     * 放款交接id
     * @type {number | string}
     * @memberof ReqLoanTransferUpdate
     */
    loanTransferId: number | string

    /**
     * 备注
     * @type {string}
     * @memberof ReqLoanTransferUpdate
     */
    remark?: string

    /**
     * 放款交接更新人
     * @type {string}
     * @memberof ReqLoanTransferUpdate
     */
    updateBy: string

    /**
     * 银行转账方式 1：司库线上转账 2：线下网银转账 注：银行转账必填
     * @type {number | string}
     * @memberof ReqLoanTransferUpdate
     */
    bankTransferMethod?: number | string

}

/**
*
* @export
* @interface ReqLoanTransferChange
*/
export interface ReqLoanTransferChange {

    /**
     * 放款交接id
     * @type {number | string}
     * @memberof ReqLoanTransferChange
     */
    loanTransferId: number | string

    /**
     * 变更交接状态 1：运营部 2：资金部
     * @type {number | string}
     * @memberof ReqLoanTransferChange
     */
    changeType: number | string

    /**
     * 备注
     * @type {string}
     * @memberof ReqLoanTransferChange
     */
    remark: string

    /**
     * 放款交接变更人
     * @type {string}
     * @memberof ReqLoanTransferChange
     */
    updateBy: string

}

/**
*
* @export
* @interface FundDetailConfirmRequest
*/
export interface FundDetailConfirmRequest {

    /**
     * 账单明细Id
     * @type {number | string}
     * @memberof FundDetailConfirmRequest
     */
    fundDetailId: number | string

    /**
     * 确认类型：1-确认；2-未确认；
     * @type {number | string}
     * @memberof FundDetailConfirmRequest
     */
    confirmType: number | string

    /**
     * 修改人
     * @type {string}
     * @memberof FundDetailConfirmRequest
     */
    updateBy: string

    /**
     * 更新人手机号
     * @type {string}
     * @memberof FundDetailConfirmRequest
     */
    updatePhone: string

    /**
     * 收款方misCode
     * @type {string}
     * @memberof FundDetailConfirmRequest
     */
    misCode?: string

    /**
     * 收款方名称
     * @type {string}
     * @memberof FundDetailConfirmRequest
     */
    payeeName?: string

    /**
     * 收款银行名称
     * @type {string}
     * @memberof FundDetailConfirmRequest
     */
    payeeBankName?: string

    /**
     * 收款方银行账号
     * @type {string}
     * @memberof FundDetailConfirmRequest
     */
    payeeBankAccount?: string

    /**
     * 账单类型
     * @type {number | string}
     * @memberof FundDetailConfirmRequest
     */
    fundType?: number | string

    /**
     * 收款银行账户id
     * @type {number | string}
     * @memberof FundDetailConfirmRequest
     */
    payeeAccountId?: number | string

}

/**
*
* @export
* @interface ReqContract
*/
export interface ReqContract {

    /**
     * 合同id
     * @type {number | string}
     * @memberof ReqContract
     */
    id?: number | string

    /**
     * 采购单id
     * @type {number | string}
     * @memberof ReqContract
     */
    purchaseOrderId?: number | string

    /**
     * 变更合同时必传 原合同id
     * @type {number | string}
     * @memberof ReqContract
     */
    originalContractId?: number | string

    /**
     * 变更合同时必传 状态：1-新增;2-变更
     * @type {number | string}
     * @memberof ReqContract
     */
    changeStatus?: number | string

    /**
     * 项目id
     * @type {number | string}
     * @memberof ReqContract
     */
    projectId?: number | string

    /**
     * 合同类型
     * @type {number | string}
     * @memberof ReqContract
     */
    contractTypeId?: number | string

    /**
     * 合同名称
     * @type {string}
     * @memberof ReqContract
     */
    contractName?: string

    /**
     * 工程名称
     * @type {string}
     * @memberof ReqContract
     */
    projectName?: string

    /**
     * 合同内容
     * @type {string}
     * @memberof ReqContract
     */
    contractContent?: string

    /**
     * 合同字段键值对
     * @type {string}
     * @memberof ReqContract
     */
    contractFieldsList?: string

    /**
     * 合同编号
     * @type {string}
     * @memberof ReqContract
     */
    contractNo?: string

    /**
     * 合同模板版本id
     * @type {number | string}
     * @memberof ReqContract
     */
    contractTemplateVersionId?: number | string

    /**
     * 合同状态：1：草稿 2：待分财审核 3：分财审核未通过 4：待风控审核/待运营审核 5：风控审核未通过/运营审核未通过 6：待法务审核 7：法务审核未通过 8：待客户签署 9：客户拒签 10：待平台签署 11：平台签署未通过 12：合同已签署 13：异常关闭 14：超时关闭 15：用印发起失败 16：发起线上待客户签署 17：合同废止
     * @type {number | string}
     * @memberof ReqContract
     */
    contractStatus?: number | string

    /**
     * 合同签署类型 1：线上 2：线下
     * @type {number | string}
     * @memberof ReqContract
     */
    contractSignType?: number | string

    /**
     * 合同签署流程id
     * @type {string}
     * @memberof ReqContract
     */
    flowId?: string

    /**
     * 创建人
     * @type {string}
     * @memberof ReqContract
     */
    createBy?: string

    /**
     * 创建人手机号
     * @type {string}
     * @memberof ReqContract
     */
    createPhone?: string

    /**
     * 更新人
     * @type {string}
     * @memberof ReqContract
     */
    updateBy?: string

    /**
     * 合同文件附件集合
     * @type {Array<ReqPicture>}
     * @memberof ReqContract
     */
    picUrls?: Array<ReqPicture>

    /**
     * 提交人手机号
     * @type {string}
     * @memberof ReqContract
     */
    submitterMobile?: string

}

/**
* 合同文件附件集合
* @export
* @interface ReqPicture
*/
export interface ReqPicture {

    /**
     * 图片id
     * @type {number | string}
     * @memberof ReqPicture
     */
    id?: number | string

    /**
     * 图片链接
     * @type {string}
     * @memberof ReqPicture
     */
    picUrl?: string

    /**
     * 图片名称
     * @type {string}
     * @memberof ReqPicture
     */
    picName?: string

}

/**
*
* @export
* @interface Contract
*/
export interface Contract {

    /**
     * 合同id
     * @type {number | string}
     * @memberof Contract
     */
    id: number | string

    /**
     * 项目id
     * @type {number | string}
     * @memberof Contract
     */
    projectId: number | string

    /**
     * 项目名称
     * @type {string}
     * @memberof Contract
     */
    projectName: string

    /**
     * 合同名称
     * @type {string}
     * @memberof Contract
     */
    contractName: string

    /**
     * 合同编号
     * @type {string}
     * @memberof Contract
     */
    contractNo: string

    /**
     * 合同内容
     * @type {string}
     * @memberof Contract
     */
    contractContent: string

    /**
     * 合同类型id 备注：10000：其他合同 10001：担保合同 10002：应收账款质押合同 10003：销售合同 10005：采购合同
     * @type {number | string}
     * @memberof Contract
     */
    contractTypeId: number | string

    /**
     * 合同字段键值对
     * @type {string}
     * @memberof Contract
     */
    contractFieldsList: string

    /**
     * 合同模板版本id
     * @type {number | string}
     * @memberof Contract
     */
    contractTemplateVersionId: number | string

    /**
     * 合同状态：1：草稿 2：待分财审核 3：分财审核未通过 4：待风控审核/待运营审核 5：风控审核未通过/运营审核未通过 6：待法务审核 7：法务审核未通过 8：待客户签署 9：客户拒签 10：待平台签署 11：平台签署未通过 12：合同已签署 13：异常关闭 14：超时关闭 15：用印发起失败 16：发起线上待客户签署 17：合同废止
     * @type {number | string}
     * @memberof Contract
     */
    contractStatus: number | string

    /**
     * 合同文件url
     * @type {string}
     * @memberof Contract
     */
    contractUrl: string

    /**
     * 合同签署类型 1：线上 2：线下
     * @type {number | string}
     * @memberof Contract
     */
    contractSignType: number | string

    /**
     * 合同签署流程id
     * @type {string}
     * @memberof Contract
     */
    flowId: string

    /**
     * 合同签署完成时间
     * @type {string}
     * @memberof Contract
     */
    signedTime: string

    /**
     * 创建人
     * @type {string}
     * @memberof Contract
     */
    createBy: string

    /**
     * 创建人手机号
     * @type {string}
     * @memberof Contract
     */
    createPhone: string

    /**
     * 创建时间
     * @type {string}
     * @memberof Contract
     */
    createTime: string

    /**
     * 更新人
     * @type {string}
     * @memberof Contract
     */
    updateBy: string

    /**
     * 更新时间
     * @type {string}
     * @memberof Contract
     */
    updateTime: string

    /**
     * 删除标识
     * @type {boolean}
     * @memberof Contract
     */
    deleted: boolean

    /**
     * 转换前合同内容
     * @type {string}
     * @memberof Contract
     */
    contractContentBeforeTransfer: string

    /**
     * 合同转换前字段键值对
     * @type {string}
     * @memberof Contract
     */
    contractFieldsListBeforeTransfer: string

    /**
     * 合同是否归档 true：已归档 false：未归档
     * @type {boolean}
     * @memberof Contract
     */
    archive: boolean

}

/**
*
* @export
* @interface ReqVipContract
*/
export interface ReqVipContract {

    /**
     * 合同id
     * @type {number | string}
     * @memberof ReqVipContract
     */
    id?: number | string

    /**
     * 合同内容
     * @type {string}
     * @memberof ReqVipContract
     */
    contractContent: string

    /**
     * 合同字段键值对
     * @type {string}
     * @memberof ReqVipContract
     */
    contractFieldsList: string

    /**
     * 合同状态：1：草稿 2：待分财审核 3：分财审核未通过 4：待风控审核/待运营审核 5：风控审核未通过/运营审核未通过 6：待法务审核 7：法务审核未通过 8：待客户签署 9：客户拒签 10：待平台签署 11：平台签署未通过 12：合同已签署 13：异常关闭 14：超时关闭 15：用印发起失败 16：发起线上待客户签署 17：合同废止
     * @type {number | string}
     * @memberof ReqVipContract
     */
    contractStatus?: number | string

    /**
     * 合同签署类型 1：线上 2：线下
     * @type {number | string}
     * @memberof ReqVipContract
     */
    contractSignType?: number | string

    /**
     * 创建人 注：创建时必填
     * @type {string}
     * @memberof ReqVipContract
     */
    createBy: string

    /**
     * 创建人手机号 注：创建时必填
     * @type {string}
     * @memberof ReqVipContract
     */
    createPhone: string

    /**
     * 更新人 注：更新时必填
     * @type {string}
     * @memberof ReqVipContract
     */
    updateBy: string

    /**
     * 更新人手机号 注：更新时必填
     * @type {string}
     * @memberof ReqVipContract
     */
    updatePhone: string

    /**
     * 公司id
     * @type {number | string}
     * @memberof ReqVipContract
     */
    companyId: number | string

    /**
     * 签约年份
     * @type {string}
     * @memberof ReqVipContract
     */
    signYear: string

}

/**
*
* @export
* @interface RespContract
*/
export interface RespContract {

    /**
     * 合同id
     * @type {number | string}
     * @memberof RespContract
     */
    id: number | string

    /**
     * 企业id
     * @type {number | string}
     * @memberof RespContract
     */
    companyId: number | string

    /**
     * 项目id
     * @type {number | string}
     * @memberof RespContract
     */
    projectId: number | string

    /**
     * 采购单id
     * @type {number | string}
     * @memberof RespContract
     */
    purchaseOrderId: number | string

    /**
     * 项目名称
     * @type {string}
     * @memberof RespContract
     */
    projectName: string

    /**
     * 采购单名称
     * @type {string}
     * @memberof RespContract
     */
    purchaseOrderName: string

    /**
     * 经销商名称
     * @type {string}
     * @memberof RespContract
     */
    supplierCompanyName: string

    /**
     * 分部名称标识
     * @type {string}
     * @memberof RespContract
     */
    subsectionCode: string

    /**
     * 分部名称
     * @type {string}
     * @memberof RespContract
     */
    subsectionName: string

    /**
     * 合同名称
     * @type {string}
     * @memberof RespContract
     */
    contractName: string

    /**
     * 合同链接
     * @type {string}
     * @memberof RespContract
     */
    contractUrl: string

    /**
     * 合同编号
     * @type {string}
     * @memberof RespContract
     */
    contractNo: string

    /**
     * 合同类型id
     * @type {number | string}
     * @memberof RespContract
     */
    contractTypeId: number | string

    /**
     * 合同类型名称
     * @type {string}
     * @memberof RespContract
     */
    contractTypeName: string

    /**
     * 合同模板版本id
     * @type {number | string}
     * @memberof RespContract
     */
    contractTemplateVersionId: number | string

    /**
     * 合同模板名称
     * @type {string}
     * @memberof RespContract
     */
    templateName: string

    /**
     * 合同模板编号
     * @type {string}
     * @memberof RespContract
     */
    templateId: string

    /**
     * 合同模板版本号
     * @type {string}
     * @memberof RespContract
     */
    versionNo: string

    /**
     * 合同模板类型标识
     * @type {number | string}
     * @memberof RespContract
     */
    contractTemplateType: number | string

    /**
     * 合同模板类型
     * @type {string}
     * @memberof RespContract
     */
    contractTemplateTypeName: string

    /**
     * 合同内容
     * @type {string}
     * @memberof RespContract
     */
    contractContent: string

    /**
     * 合同字段键值对
     * @type {string}
     * @memberof RespContract
     */
    contractFieldsList: string

    /**
     * 合同状态：1：草稿 2：待分财审核 3：分财审核未通过 4：待风控审核/待运营审核 5：风控审核未通过/运营审核未通过 6：待法务审核 7：法务审核未通过 8：待客户签署 9：客户拒签 10：待平台签署 11：平台签署未通过 12：合同已签署 13：异常关闭 14：超时关闭 15：用印发起失败 16：发起线上待客户签署 17：合同废止
     * @type {number | string}
     * @memberof RespContract
     */
    contractStatus: number | string

    /**
     * 合同签署类型 1：线上 2：线下
     * @type {number | string}
     * @memberof RespContract
     */
    contractSignType: number | string

    /**
     * 合同签署流程id
     * @type {string}
     * @memberof RespContract
     */
    flowId: string

    /**
     * 创建人
     * @type {string}
     * @memberof RespContract
     */
    createBy: string

    /**
     * 创建时间
     * @type {string}
     * @memberof RespContract
     */
    createTime: string

    /**
     * 更新人
     * @type {string}
     * @memberof RespContract
     */
    updateBy: string

    /**
     * 更新时间
     * @type {string}
     * @memberof RespContract
     */
    updateTime: string

    /**
     * 推荐签署方式:1线上，2线下
     * @type {number | string}
     * @memberof RespContract
     */
    recommendSigner: number | string

    /**
     * 线下合同附件
     * @type {Array<RespPicture>}
     * @memberof RespContract
     */
    picUrls: Array<RespPicture>

    /**
     * 转换前合同内容
     * @type {string}
     * @memberof RespContract
     */
    contractContentBeforeTransfer: string

    /**
     * 合同转换前字段键值对
     * @type {string}
     * @memberof RespContract
     */
    contractFieldsListBeforeTransfer: string

    /**
     * 合同是否归档 true：已归档 false：未归档
     * @type {boolean}
     * @memberof RespContract
     */
    archive: boolean

}

/**
* 线下合同附件
* @export
* @interface RespPicture
*/
export interface RespPicture {

    /**
     * 图片id
     * @type {number | string}
     * @memberof RespPicture
     */
    id?: number | string

    /**
     * 图片链接
     * @type {string}
     * @memberof RespPicture
     */
    picUrl?: string

    /**
     * 图片名称
     * @type {string}
     * @memberof RespPicture
     */
    picName?: string

}

/**
*
* @export
* @interface ReqTemplateContractOffLineUpdate
*/
export interface ReqTemplateContractOffLineUpdate {

    /**
     * 合同id
     * @type {number | string}
     * @memberof ReqTemplateContractOffLineUpdate
     */
    id?: number | string

    /**
     * 更新人
     * @type {string}
     * @memberof ReqTemplateContractOffLineUpdate
     */
    updateBy?: string

    /**
     * 合同文件附件集合
     * @type {Array<ReqPicture>}
     * @memberof ReqTemplateContractOffLineUpdate
     */
    picUrls?: Array<ReqPicture>

    /**
     * 提交人手机号
     * @type {string}
     * @memberof ReqTemplateContractOffLineUpdate
     */
    submitterMobile?: string

}

/**
*
* @export
* @interface ReqContractTemplate
*/
export interface ReqContractTemplate {

    /**
     * 模板id(修改时传)
     * @type {number | string}
     * @memberof ReqContractTemplate
     */
    id?: number | string

    /**
     * 类型id
     * @type {number | string}
     * @memberof ReqContractTemplate
     */
    typeId: number | string

    /**
     * 模板编码(修改时传)
     * @type {string}
     * @memberof ReqContractTemplate
     */
    templateNo?: string

    /**
     * 模板名称
     * @type {string}
     * @memberof ReqContractTemplate
     */
    templateName: string

    /**
     * 模板描述
     * @type {string}
     * @memberof ReqContractTemplate
     */
    describe: string

    /**
     * 状态：0.禁用 1.启用（默认禁用）
     * @type {number | string}
     * @memberof ReqContractTemplate
     */
    status?: number | string

    /**
     * 内容
     * @type {string}
     * @memberof ReqContractTemplate
     */
    content: string

    /**
     * 属性参数（json对象数组）
     * @type {Array<ReqParam>}
     * @memberof ReqContractTemplate
     */
    reqParam?: Array<ReqParam>

    /**
     * 签署方设置（json对象数组）
     * @type {Array<ReqTemplateSigner>}
     * @memberof ReqContractTemplate
     */
    signerSetting?: Array<ReqTemplateSigner>

    /**
     * 推荐签署方式：1线上签，2线下签
     * @type {number | string}
     * @memberof ReqContractTemplate
     */
    recommendSigner: number | string

    /**
     * 操作人
     * @type {string}
     * @memberof ReqContractTemplate
     */
    operatorBy: string

    /**
     * 操作人账号（登录账号）
     * @type {string}
     * @memberof ReqContractTemplate
     */
    operatorAccount: string

}

/**
* 属性参数（json对象数组）
* @export
* @interface ReqParam
*/
export interface ReqParam {

    /**
     * 参数id
     * @type {number | string}
     * @memberof ReqParam
     */
    id?: number | string

    /**
     * 参数key
     * @type {string}
     * @memberof ReqParam
     */
    paramKey?: string

    /**
     * 参数默认值（内容）
     * @type {string}
     * @memberof ReqParam
     */
    paramValue?: string

    /**
     * 参数名称（描述）
     * @type {string}
     * @memberof ReqParam
     */
    paramName?: string

}

/**
* 签署方设置（json对象数组）
* @export
* @interface ReqTemplateSigner
*/
export interface ReqTemplateSigner {

    /**
     * 类型：1平台，2签署方
     * @type {number | string}
     * @memberof ReqTemplateSigner
     */
    type?: number | string

    /**
     * 签署方类型：1企业，2个人
     * @type {number | string}
     * @memberof ReqTemplateSigner
     */
    signerType?: number | string

    /**
     * 签署方名称
     * @type {string}
     * @memberof ReqTemplateSigner
     */
    signerName?: string

    /**
     * 参数id
     * @type {number | string}
     * @memberof ReqTemplateSigner
     */
    paramId?: number | string

    /**
     * 企业CAid
     * @type {number | string}
     * @memberof ReqTemplateSigner
     */
    caId?: number | string

    /**
     * 企业、个人参数分组名称 / 企业名称
     * @type {string}
     * @memberof ReqTemplateSigner
     */
    paramGroupName?: string

    /**
     * 经办人
     * @type {string}
     * @memberof ReqTemplateSigner
     */
    agent?: string

    /**
     * 签署要求：1.企业章，2.法定代表人章，3.手绘章，4.模板章
     * @type {string}
     * @memberof ReqTemplateSigner
     */
    signerDemand?: string

    /**
     * 签署参数(多个英文逗号隔开)
     * @type {Array<string>}
     * @memberof ReqTemplateSigner
     */
    signatureParam?: Array<string>

    /**
     * 平台签署方来源 1：指定企业 2：合同企业
     * @type {number | string}
     * @memberof ReqTemplateSigner
     */
    platformSignSource?: number | string

    /**
     * 指定企业关联企业CA
     * @type {number | string}
     * @memberof ReqTemplateSigner
     */
    caOrgId?: number | string

    /**
     * 合同企业签署方名称
     * @type {string}
     * @memberof ReqTemplateSigner
     */
    platformSigner?: string

}

/**
*
* @export
* @interface BankClaimFundCancelRequest
*/
export interface BankClaimFundCancelRequest {

    /**
     * 银行收款清单id
     * @type {number | string}
     * @memberof BankClaimFundCancelRequest
     */
    bankBillId: number | string

    /**
     * 账单明细id
     * @type {number | string}
     * @memberof BankClaimFundCancelRequest
     */
    fundDetailId: number | string

    /**
     * 操作人
     * @type {string}
     * @memberof BankClaimFundCancelRequest
     */
    updateBy: string

    /**
     * 操作人手机号
     * @type {string}
     * @memberof BankClaimFundCancelRequest
     */
    updatePhone: string

}

/**
*
* @export
* @interface ServiceInvoiceSubmitRequest
*/
export interface ServiceInvoiceSubmitRequest {

    /**
     * 保存或提交 1 保存 2 提交
     * @type {number | string}
     * @memberof ServiceInvoiceSubmitRequest
     */
    saveOrSubmit: number | string

    /**
     * 发票id
     * @type {number | string}
     * @memberof ServiceInvoiceSubmitRequest
     */
    invoiceId?: number | string

    /**
     * 项目编码
     * @type {string}
     * @memberof ServiceInvoiceSubmitRequest
     */
    projectNo: string

    /**
     * 项目名称
     * @type {string}
     * @memberof ServiceInvoiceSubmitRequest
     */
    projectName: string

    /**
     * 所属分部编码
     * @type {string}
     * @memberof ServiceInvoiceSubmitRequest
     */
    deptCode: string

    /**
     * 所属分部
     * @type {string}
     * @memberof ServiceInvoiceSubmitRequest
     */
    deptName: string

    /**
     * 发票金额
     * @type {number | string}
     * @memberof ServiceInvoiceSubmitRequest
     */
    invoiceAmount: number | string

    /**
     * 收票人
     * @type {string}
     * @memberof ServiceInvoiceSubmitRequest
     */
    receiver: string

    /**
     * 收票人手机
     * @type {string}
     * @memberof ServiceInvoiceSubmitRequest
     */
    receiverMobile: string

    /**
     * 收票地址
     * @type {string}
     * @memberof ServiceInvoiceSubmitRequest
     */
    receiverAddress: string

    /**
     * 经销商
     * @type {string}
     * @memberof ServiceInvoiceSubmitRequest
     */
    companyName: string

    /**
     * 备注
     * @type {string}
     * @memberof ServiceInvoiceSubmitRequest
     */
    remark?: string

    /**
     * 账单id
     * @type {Array<string>}
     * @memberof ServiceInvoiceSubmitRequest
     */
    resourceIds: Array<string>

}

/**
* 上游支付凭证列表
* @export
* @interface PayVoucher
*/
export interface PayVoucher {

    /**
     * 上游支付凭证文件路径url
     * @type {string}
     * @memberof PayVoucher
     */
    fileUrl?: string

    /**
     * 上游支付凭证文件名称
     * @type {string}
     * @memberof PayVoucher
     */
    fileName?: string

    /**
     * 带token的上游支付凭证文件路径
     * @type {string}
     * @memberof PayVoucher
     */
    tokenUrl?: string

}

/**
*
* @export
* @interface ReqSupplierSubmit
*/
export interface ReqSupplierSubmit {

    /**
     * 上游支付Id
     * @type {number | string}
     * @memberof ReqSupplierSubmit
     */
    id?: number | string

    /**
     * 支付单Id
     * @type {number | string}
     * @memberof ReqSupplierSubmit
     */
    paymentOrderId?: number | string

    /**
     * 采购单Id
     * @type {number | string}
     * @memberof ReqSupplierSubmit
     */
    poId?: number | string

    /**
     * 上游支付金额
     * @type {number | string}
     * @memberof ReqSupplierSubmit
     */
    payAmount?: number | string

    /**
     * 上游支付日期
     * @type {string}
     * @memberof ReqSupplierSubmit
     */
    payDate?: string

    /**
     * 上游支付凭证列表
     * @type {Array<PayVoucher>}
     * @memberof ReqSupplierSubmit
     */
    payVouchers?: Array<PayVoucher>

}

/**
* 上游支付凭证
* @export
* @interface AttachDocRequest
*/
export interface AttachDocRequest {

    /**
     * id
     * @type {number | string}
     * @memberof AttachDocRequest
     */
    id?: number | string

    /**
     * 附件地址
     * @type {string}
     * @memberof AttachDocRequest
     */
    fileUrl?: string

    /**
     * 附件名称
     * @type {string}
     * @memberof AttachDocRequest
     */
    fileName?: string

}

/**
*
* @export
* @interface PrepaymentSupplierOnlineBankTransferConfirmRequest
*/
export interface PrepaymentSupplierOnlineBankTransferConfirmRequest {

    /**
     * 上游预付款单id
     * @type {number | string}
     * @memberof PrepaymentSupplierOnlineBankTransferConfirmRequest
     */
    prepaymentOrderId: number | string

    /**
     * 网银支付时间
     * @type {string}
     * @memberof PrepaymentSupplierOnlineBankTransferConfirmRequest
     */
    paymentTime: string

    /**
     * 上游支付凭证
     * @type {Array<AttachDocRequest>}
     * @memberof PrepaymentSupplierOnlineBankTransferConfirmRequest
     */
    attachDocRequestList: Array<AttachDocRequest>

}

/**
*
* @export
* @interface PrepaymentSupplierSubmitResponse
*/
export interface PrepaymentSupplierSubmitResponse {

    /**
     * 上游预付款单Id
     * @type {number | string}
     * @memberof PrepaymentSupplierSubmitResponse
     */
    prepaymentOrderId: number | string

    /**
     * 上游支付金额
     * @type {number | string}
     * @memberof PrepaymentSupplierSubmitResponse
     */
    payAmount: number | string

    /**
     * 上游支付日期
     * @type {string}
     * @memberof PrepaymentSupplierSubmitResponse
     */
    payDate: string

    /**
     * 上游支付凭证列表
     * @type {Array<PayVoucher>}
     * @memberof PrepaymentSupplierSubmitResponse
     */
    payVouchers: Array<PayVoucher>

}

/**
*
* @export
* @interface SupplierOnlineBankTransferConfirmRequest
*/
export interface SupplierOnlineBankTransferConfirmRequest {

    /**
     * 支付单id
     * @type {number | string}
     * @memberof SupplierOnlineBankTransferConfirmRequest
     */
    paymentOrderId: number | string

    /**
     * 网银支付时间
     * @type {string}
     * @memberof SupplierOnlineBankTransferConfirmRequest
     */
    paymentTime: string

    /**
     * 上游支付凭证
     * @type {Array<AttachDocRequest>}
     * @memberof SupplierOnlineBankTransferConfirmRequest
     */
    attachDocRequestList: Array<AttachDocRequest>

}

/**
*
* @export
* @interface ReqUpPaymentLoanHandoverConfirm
*/
export interface ReqUpPaymentLoanHandoverConfirm {

    /**
     * 放款交接id
     * @type {number | string}
     * @memberof ReqUpPaymentLoanHandoverConfirm
     */
    upPaymentLoanHandoverId: number | string

    /**
     * 更新人
     * @type {string}
     * @memberof ReqUpPaymentLoanHandoverConfirm
     */
    updateBy: string

}

/**
*
* @export
* @interface ReqSealApproval
*/
export interface ReqSealApproval {

    /**
     * 合同id
     * @type {number | string}
     * @memberof ReqSealApproval
     */
    contractId: number | string

    /**
     * 签署流程id
     * @type {string}
     * @memberof ReqSealApproval
     */
    flowId?: string

    /**
     * 审批人
     * @type {string}
     * @memberof ReqSealApproval
     */
    approver?: string

    /**
     * 审核状态 1：待审核 2：审核通过 3：审核不通过
     * @type {number | string}
     * @memberof ReqSealApproval
     */
    approvalStatus?: number | string

    /**
     * 审批角色
     * @type {number | string}
     * @memberof ReqSealApproval
     */
    approvalRole?: number | string

    /**
     * 审批备注
     * @type {string}
     * @memberof ReqSealApproval
     */
    approvalRemark?: string

    /**
     * 创建人
     * @type {string}
     * @memberof ReqSealApproval
     */
    createBy?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof ReqSealApproval
     */
    createTime?: string

}

/**
* 表单详情列表
* @export
* @interface FormComponentValue
*/
export interface FormComponentValue {

    /**
     * 标签名
     * @type {string}
     * @memberof FormComponentValue
     */
    name?: string

    /**
     * 标签值
     * @type {string}
     * @memberof FormComponentValue
     */
    value?: string

    /**
     * 标签扩展值
     * @type {string}
     * @memberof FormComponentValue
     */
    extValue?: string

    /**
     * 组件ID
     * @type {string}
     * @memberof FormComponentValue
     */
    id?: string

    /**
     * 组件类型
     * @type {string}
     * @memberof FormComponentValue
     */
    componentType?: string

}

/**
*
* @export
* @interface ReqDingCallbackApproval
*/
export interface ReqDingCallbackApproval {

    /**
     * 变更类型 1-代表审批节点任务变更 2-审批实例状态变更
     * @type {number | string}
     * @memberof ReqDingCallbackApproval
     */
    type?: number | string

    /**
     * 钉钉审批实例id
     * @type {string}
     * @memberof ReqDingCallbackApproval
     */
    processInstanceId: string

    /**
     * 审批状态 10：NEW（新创建）。20：RUNNING(运行中) 30：TERMINATED（终止）40：COMPLETED（完成）
     * @type {string}
     * @memberof ReqDingCallbackApproval
     */
    status?: string

    /**
     * 审批结果 AGREE - 同意， REFUSE - 拒绝， NONE - 无操作
     * @type {string}
     * @memberof ReqDingCallbackApproval
     */
    result?: string

    /**
     * 审批标题
     * @type {string}
     * @memberof ReqDingCallbackApproval
     */
    title?: string

    /**
     * 完成时间
     * @type {string}
     * @memberof ReqDingCallbackApproval
     */
    finishTime?: string

    /**
     * 钉钉审核任务流水
     * @type {Array<ReqDingCallbackTask>}
     * @memberof ReqDingCallbackApproval
     */
    tasks?: Array<ReqDingCallbackTask>

    /**
     * 钉钉审核流水
     * @type {Array<ReqDingCallbackOperationRecord>}
     * @memberof ReqDingCallbackApproval
     */
    records?: Array<ReqDingCallbackOperationRecord>

    /**
     * 钉钉编号
     * @type {string}
     * @memberof ReqDingCallbackApproval
     */
    businessId?: string

    /**
     * 表单详情列表
     * @type {Array<FormComponentValue>}
     * @memberof ReqDingCallbackApproval
     */
    formComponentValues?: Array<FormComponentValue>

    /**
     * 采购单提交审批类型 1：采购单提交 2：采购单变更提交 注：仅限采购单钉钉审批
     * @type {number | string}
     * @memberof ReqDingCallbackApproval
     */
    purchaseOrderApprovalType?: number | string

}

/**
* 钉钉审核流水
* @export
* @interface ReqDingCallbackOperationRecord
*/
export interface ReqDingCallbackOperationRecord {

    /**
     * 操作人DingId
     * @type {string}
     * @memberof ReqDingCallbackOperationRecord
     */
    userId?: string

    /**
     * 操作人姓名
     * @type {string}
     * @memberof ReqDingCallbackOperationRecord
     */
    userName?: string

    /**
     * 操作人角色
     * @type {string}
     * @memberof ReqDingCallbackOperationRecord
     */
    userRole?: string

    /**
     * 操作人备注
     * @type {string}
     * @memberof ReqDingCallbackOperationRecord
     */
    remark?: string

    /**
     * 操作状态： EXECUTE_TASK_NORMAL（正常执行任务） EXECUTE_TASK_AGENT（代理人执行任务）  APPEND_TASK_BEFORE（前加签任务） APPEND_TASK_AFTER（后加签任务）
 REDIRECT_TASK（转交任务） START_PROCESS_INSTANCE（发起流程实例） TERMINATE_PROCESS_INSTANCE（终止(撤销)流程实例） FINISH_PROCESS_INSTANCE（结束流程实例）
 ADD_REMARK（添加评论） PROCESS_CC：添加抄送人
     * @type {string}
     * @memberof ReqDingCallbackOperationRecord
     */
    operationType?: string

    /**
     * 操作处理结果 AGREE - 同意， REFUSE - 拒绝， NONE - 无操作
     * @type {string}
     * @memberof ReqDingCallbackOperationRecord
     */
    operationResult?: string

    /**
     * 操作时间
     * @type {string}
     * @memberof ReqDingCallbackOperationRecord
     */
    date?: string

}

/**
* 钉钉审核任务流水
* @export
* @interface ReqDingCallbackTask
*/
export interface ReqDingCallbackTask {

    /**
     * 处理人DingId
     * @type {string}
     * @memberof ReqDingCallbackTask
     */
    userId?: string

    /**
     * 处理人姓名
     * @type {string}
     * @memberof ReqDingCallbackTask
     */
    userName?: string

    /**
     * 处理人角色
     * @type {string}
     * @memberof ReqDingCallbackTask
     */
    userRole?: string

    /**
     * 备注
     * @type {string}
     * @memberof ReqDingCallbackTask
     */
    approvalRemark?: string

    /**
     * 任务Id
     * @type {string}
     * @memberof ReqDingCallbackTask
     */
    taskId?: string

    /**
     * 任务状态 10：NEW（新创建）。20：RUNNING(运行中) 30：TERMINATED（终止）40：COMPLETED（完成）50：CANCELLED（取消）
     * @type {string}
     * @memberof ReqDingCallbackTask
     */
    taskStatus?: string

    /**
     * 任务处理结果 AGREE - 同意， REFUSE - 拒绝， NONE - 无操作
     * @type {string}
     * @memberof ReqDingCallbackTask
     */
    taskResult?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof ReqDingCallbackTask
     */
    createTime?: string

    /**
     * 完成时间
     * @type {string}
     * @memberof ReqDingCallbackTask
     */
    finishTime?: string

    /**
     * 下一个节点审批人
     * @type {string}
     * @memberof ReqDingCallbackTask
     */
    nextApprover?: string

}

/**
*
* @export
* @interface ResolutionDingInitRequest
*/
export interface ResolutionDingInitRequest {

    /**
     * 所属大区/分部
     * @type {string}
     * @memberof ResolutionDingInitRequest
     */
    deptName: string

    /**
     * 合作次数
     * @type {number | string}
     * @memberof ResolutionDingInitRequest
     */
    cooperationNumber: number | string

    /**
     * 经销商
     * @type {string}
     * @memberof ResolutionDingInitRequest
     */
    companyName: string

    /**
     * 客户经理
     * @type {string}
     * @memberof ResolutionDingInitRequest
     */
    userManager: string

    /**
     * 客户经理手机号
     * @type {string}
     * @memberof ResolutionDingInitRequest
     */
    userManagerPhone: string

    /**
     * 可代采购额度(元)
     * @type {number | string}
     * @memberof ResolutionDingInitRequest
     */
    purchaseQuota: number | string

    /**
     * 可用额度(元)
     * @type {number | string}
     * @memberof ResolutionDingInitRequest
     */
    purchaseBalance: number | string

    /**
     * 经销商评级
     * @type {string}
     * @memberof ResolutionDingInitRequest
     */
    companyLevel: string

    /**
     * 项目id
     * @type {number | string}
     * @memberof ResolutionDingInitRequest
     */
    projectId: number | string

    /**
     * 项目名称
     * @type {string}
     * @memberof ResolutionDingInitRequest
     */
    projectName: string

    /**
     * 项目评级
     * @type {string}
     * @memberof ResolutionDingInitRequest
     */
    levels: string

    /**
     * 项目合同总额
     * @type {number | string}
     * @memberof ResolutionDingInitRequest
     */
    contractAmount: number | string

    /**
     * 申请代付金额(元)
     * @type {number | string}
     * @memberof ResolutionDingInitRequest
     */
    predictLoanAmount: number | string

    /**
     * 首付款比例%
     * @type {number | string}
     * @memberof ResolutionDingInitRequest
     */
    advancePaymentRate: number | string

    /**
     * 设备款总额
     * @type {number | string}
     * @memberof ResolutionDingInitRequest
     */
    deviceAmount: number | string

    /**
     * 剩余货款支付周期（月）
     * @type {number | string}
     * @memberof ResolutionDingInitRequest
     */
    remainPaymentCycle: number | string

    /**
     * 执行费率(银行转账)
     * @type {number | string}
     * @memberof ResolutionDingInitRequest
     */
    transferBankRate: number | string

    /**
     * 执行费率(银行承兑)
     * @type {number | string}
     * @memberof ResolutionDingInitRequest
     */
    acceptBankRate: number | string

    /**
     * 专项额度（元）
     * @type {number | string}
     * @memberof ResolutionDingInitRequest
     */
    projectQuotaAmount: number | string

    /**
     * 项目采购信息
     * @type {Array<ResolutionPurchaseRequest>}
     * @memberof ResolutionDingInitRequest
     */
    resolutionPurchaseList: Array<ResolutionPurchaseRequest>

    /**
     * 评审决议
     * @type {string}
     * @memberof ResolutionDingInitRequest
     */
    remark: string

    /**
     * 发起人手机号
     * @type {string}
     * @memberof ResolutionDingInitRequest
     */
    applierMobile: string

    /**
     * 销售毛利率(%)
     * @type {number | string}
     * @memberof ResolutionDingInitRequest
     */
    salesGrossMargin?: number | string

    /**
     * 销售总额(元)
     * @type {number | string}
     * @memberof ResolutionDingInitRequest
     */
    salesTotalAmount?: number | string

}

/**
* 项目采购信息
* @export
* @interface ResolutionPurchaseRequest
*/
export interface ResolutionPurchaseRequest {

    /**
     * 项目采购信息id
     * @type {number | string}
     * @memberof ResolutionPurchaseRequest
     */
    id?: number | string

    /**
     * 所属项目id/发起决议变更快照id
     * @type {number | string}
     * @memberof ResolutionPurchaseRequest
     */
    ascriptionId?: number | string

    /**
     * 设备品类
     * @type {string}
     * @memberof ResolutionPurchaseRequest
     */
    deviceCategory?: string

    /**
     * 设备品牌
     * @type {string}
     * @memberof ResolutionPurchaseRequest
     */
    deviceBrand?: string

    /**
     * 上游供应商类型 1：厂商 2：代理商 3：经销商
     * @type {number | string}
     * @memberof ResolutionPurchaseRequest
     */
    upstreamSupplierType?: number | string

    /**
     * 上游供应商
     * @type {string}
     * @memberof ResolutionPurchaseRequest
     */
    upstreamSupplierName?: string

    /**
     * 上游接受的付款方式  1：银行转账 2：银行承兑
     * @type {Array<number | string>}
     * @memberof ResolutionPurchaseRequest
     */
    upstreamPayType?: Array<number | string>

    /**
     * 银行转账费率类型 1：执行费率 2：自定义费率
     * @type {number | string}
     * @memberof ResolutionPurchaseRequest
     */
    transferRateType?: number | string

    /**
     * 银行转账自定义费率
     * @type {number | string}
     * @memberof ResolutionPurchaseRequest
     */
    transferRate?: number | string

    /**
     * 银行承兑费率类型 1：执行费率 2：自定义费率
     * @type {number | string}
     * @memberof ResolutionPurchaseRequest
     */
    acceptanceRateType?: number | string

    /**
     * 银行承兑自定义费率
     * @type {number | string}
     * @memberof ResolutionPurchaseRequest
     */
    acceptanceRate?: number | string

    /**
     * 上游货款方式 1：先款后货 2：先货后款
     * @type {number | string}
     * @memberof ResolutionPurchaseRequest
     */
    upstreamLoanType?: number | string

    /**
     * 采购折让(%)
     * @type {number | string}
     * @memberof ResolutionPurchaseRequest
     */
    purchaseDiscountRate?: number | string

}

/**
* 变更字段对比 注：发起类型是采购单变更提交才会传
* @export
* @interface PoChangeFields
*/
export interface PoChangeFields {

    /**
     * 主键id
     * @type {number | string}
     * @memberof PoChangeFields
     */
    id?: number | string

    /**
     * 变更单Id
     * @type {number | string}
     * @memberof PoChangeFields
     */
    changeId?: number | string

    /**
     * 业务字段
     * @type {string}
     * @memberof PoChangeFields
     */
    fieldName?: string

    /**
     * 原值
     * @type {string}
     * @memberof PoChangeFields
     */
    originalValue?: string

    /**
     * 更新后的值
     * @type {string}
     * @memberof PoChangeFields
     */
    changedValue?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof PoChangeFields
     */
    createTime?: string

    /**
     * 创建人
     * @type {string}
     * @memberof PoChangeFields
     */
    createBy?: string

    /**
     * 修改时间
     * @type {string}
     * @memberof PoChangeFields
     */
    updateTime?: string

    /**
     * 修改人
     * @type {string}
     * @memberof PoChangeFields
     */
    updateBy?: string

    /**
     * 是否删除 0：否 1：是
     * @type {boolean}
     * @memberof PoChangeFields
     */
    deleted?: boolean

}

/**
* 采购单采购信息 注：发起类型是采购单提交才会传
* @export
* @interface PoInfo
*/
export interface PoInfo {

    /**
     * 主键id
     * @type {number | string}
     * @memberof PoInfo
     */
    id?: number | string

    /**
     * 采购订单主键Id
     * @type {number | string}
     * @memberof PoInfo
     */
    poId?: number | string

    /**
     * 采购单金额
     * @type {number | string}
     * @memberof PoInfo
     */
    poAmount?: number | string

    /**
     *
     * @type {JsonNode}
     * @memberof PoInfo
     */
    poDetail?: JsonNode

    /**
     * 采购批次
     * @type {number | string}
     * @memberof PoInfo
     */
    poNumber?: number | string

    /**
     * 最迟发货日期
     * @type {string}
     * @memberof PoInfo
     */
    lastGoodsDate?: string

    /**
     * 收货地址
     * @type {string}
     * @memberof PoInfo
     */
    goodsAddress?: string

    /**
     * 经销商预付款比例
     * @type {number | string}
     * @memberof PoInfo
     */
    prePercent?: number | string

    /**
     * 剩余货款支付周期
     * @type {number | string}
     * @memberof PoInfo
     */
    restPaymentPeriod?: number | string

    /**
     * 收款账户户名
     * @type {string}
     * @memberof PoInfo
     */
    receiverAccountName?: string

    /**
     * 收款账户银行账号
     * @type {string}
     * @memberof PoInfo
     */
    receiverAccountNo?: string

    /**
     * 收款账户开户行
     * @type {string}
     * @memberof PoInfo
     */
    receiverAccountBank?: string

    /**
     * 监管账户户名
     * @type {string}
     * @memberof PoInfo
     */
    regulatorAccountName?: string

    /**
     * 监管账户银行账号
     * @type {string}
     * @memberof PoInfo
     */
    regulatorAccountNo?: string

    /**
     * 监管账户开户行
     * @type {string}
     * @memberof PoInfo
     */
    regulatorAccountBank?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof PoInfo
     */
    createTime?: string

    /**
     * 确认类型 1：待确认 2：已确认
     * @type {number | string}
     * @memberof PoInfo
     */
    confirmType?: number | string

    /**
     * 创建人
     * @type {string}
     * @memberof PoInfo
     */
    createBy?: string

    /**
     * 修改时间
     * @type {string}
     * @memberof PoInfo
     */
    updateTime?: string

    /**
     * 修改人
     * @type {string}
     * @memberof PoInfo
     */
    updateBy?: string

    /**
     * 是否删除 0：否 1：是
     * @type {boolean}
     * @memberof PoInfo
     */
    deleted?: boolean

}

/**
*
* @export
* @interface ReqPurchaseOrderDingInitApproval
*/
export interface ReqPurchaseOrderDingInitApproval {

    /**
     * 采购单id
     * @type {number | string}
     * @memberof ReqPurchaseOrderDingInitApproval
     */
    purchaseOrderId: number | string

    /**
     * 发起人手机号
     * @type {string}
     * @memberof ReqPurchaseOrderDingInitApproval
     */
    applierMobile: string

    /**
     * 发起人
     * @type {string}
     * @memberof ReqPurchaseOrderDingInitApproval
     */
    applier?: string

    /**
     * 发起人钉钉Id
     * @type {string}
     * @memberof ReqPurchaseOrderDingInitApproval
     */
    applierDingId?: string

    /**
     * 发起类型 1：采购单提交 2：采购单变更提交
     * @type {number | string}
     * @memberof ReqPurchaseOrderDingInitApproval
     */
    initiateType: number | string

    /**
     *
     * @type {PoInfo}
     * @memberof ReqPurchaseOrderDingInitApproval
     */
    poInfo?: PoInfo

    /**
     * 变更字段对比 注：发起类型是采购单变更提交才会传
     * @type {Array<PoChangeFields>}
     * @memberof ReqPurchaseOrderDingInitApproval
     */
    poChangeFieldsList?: Array<PoChangeFields>

}

/**
*
* @export
* @interface PrepaymentsDingInitRequest
*/
export interface PrepaymentsDingInitRequest {

    /**
     * 预付款支付单id
     * @type {number | string}
     * @memberof PrepaymentsDingInitRequest
     */
    prepaymentOrderId: number | string

}

/**
*
* @export
* @interface PaymentOrderDingInitRequest
*/
export interface PaymentOrderDingInitRequest {

    /**
     * 支付单id
     * @type {number | string}
     * @memberof PaymentOrderDingInitRequest
     */
    paymentOrderId: number | string

}

/**
*
* @export
* @interface ReqDingInitApproval
*/
export interface ReqDingInitApproval {

    /**
     * 合同id
     * @type {number | string}
     * @memberof ReqDingInitApproval
     */
    contractId?: number | string

    /**
     * 发起人手机号
     * @type {string}
     * @memberof ReqDingInitApproval
     */
    applierMobile?: string

    /**
     * 发起人
     * @type {string}
     * @memberof ReqDingInitApproval
     */
    applier?: string

    /**
     * 发起人钉钉Id
     * @type {string}
     * @memberof ReqDingInitApproval
     */
    applierDingId?: string

    /**
     * 所属项目名称
     * @type {string}
     * @memberof ReqDingInitApproval
     */
    projectName?: string

    /**
     * 合同类型
     * @type {string}
     * @memberof ReqDingInitApproval
     */
    contractTemplateType?: string

    /**
     * 合同名称
     * @type {string}
     * @memberof ReqDingInitApproval
     */
    contractName?: string

    /**
     * 用章类型 1 - 企业公章
     * @type {number | string}
     * @memberof ReqDingInitApproval
     */
    sealType?: number | string

    /**
     * 合同附件URL
     * @type {string}
     * @memberof ReqDingInitApproval
     */
    contractUrl?: string

}

/**
*
* @export
* @interface RespPurchaseOrderPrompt
*/
export interface RespPurchaseOrderPrompt {

    /**
     * 状态提示 1：该项目合作已关闭，不可添加采购单 2：该项目终审未通过，不可添加采购单 注：针对于采购单对应项目状态判断提示
     * @type {number | string}
     * @memberof RespPurchaseOrderPrompt
     */
    statusPrompt: number | string

    /**
     *
     * @type {boolean}
     * @memberof RespPurchaseOrderPrompt
     */
    prompt: boolean

}

/**
*
* @export
* @interface ReqPurchaseOrderSubmit
*/
export interface ReqPurchaseOrderSubmit {

    /**
     * 采购单主键id
     * @type {number | string}
     * @memberof ReqPurchaseOrderSubmit
     */
    purchaseOrderId: number | string

    /**
     * 用户名称
     * @type {string}
     * @memberof ReqPurchaseOrderSubmit
     */
    userName: string

    /**
     * 用户手机号
     * @type {string}
     * @memberof ReqPurchaseOrderSubmit
     */
    phone: string

}

/**
*
* @export
* @interface ReqPurchaseOrderChange
*/
export interface ReqPurchaseOrderChange {

    /**
     * 采购单主键id
     * @type {number | string}
     * @memberof ReqPurchaseOrderChange
     */
    purchaseOrderId: number | string

    /**
     * 用户名称
     * @type {string}
     * @memberof ReqPurchaseOrderChange
     */
    userName: string

    /**
     * 用户手机号
     * @type {string}
     * @memberof ReqPurchaseOrderChange
     */
    phone: string

    /**
     * 变更原因
     * @type {string}
     * @memberof ReqPurchaseOrderChange
     */
    changeReason: string

}

/**
* 共管户截图
* @export
* @interface ReqAttachDoc
*/
export interface ReqAttachDoc {

    /**
     * 附件地址
     * @type {string}
     * @memberof ReqAttachDoc
     */
    fileUrl?: string

    /**
     * 附件名称
     * @type {string}
     * @memberof ReqAttachDoc
     */
    fileName?: string

}

/**
*
* @export
* @interface ReqContractCoManager
*/
export interface ReqContractCoManager {

    /**
     * 采购单id
     * @type {number | string}
     * @memberof ReqContractCoManager
     */
    id?: number | string

    /**
     * 网银盾照片
     * @type {Array<ReqAttachDoc>}
     * @memberof ReqContractCoManager
     */
    onlineBankingShields?: Array<ReqAttachDoc>

    /**
     * 共管户截图
     * @type {Array<ReqAttachDoc>}
     * @memberof ReqContractCoManager
     */
    screenshots?: Array<ReqAttachDoc>

}

/**
*
* @export
* @interface ProjectPurchaseOrderRequest
*/
export interface ProjectPurchaseOrderRequest {

    /**
     * 项目Id
     * @type {number | string}
     * @memberof ProjectPurchaseOrderRequest
     */
    projectId: number | string

}

/**
*
* @export
* @interface ReqPurchaseOrderContractSave
*/
export interface ReqPurchaseOrderContractSave {

    /**
     * 采购单id
     * @type {number | string}
     * @memberof ReqPurchaseOrderContractSave
     */
    purchaseOrderId: number | string

    /**
     * 合同id,多选用逗号隔开
     * @type {string}
     * @memberof ReqPurchaseOrderContractSave
     */
    contractIds: string

    /**
     * 创建人
     * @type {string}
     * @memberof ReqPurchaseOrderContractSave
     */
    createBy?: string

    /**
     * 合同类型id
     * @type {number | string}
     * @memberof ReqPurchaseOrderContractSave
     */
    contractTypeId: number | string

    /**
     * 变更合同时必传 状态：1-新增;2-变更
     * @type {number | string}
     * @memberof ReqPurchaseOrderContractSave
     */
    changeStatus?: number | string

}

/**
*
* @export
* @interface PrepaymentOrderRequest
*/
export interface PrepaymentOrderRequest {

    /**
     * 项目id
     * @type {number | string}
     * @memberof PrepaymentOrderRequest
     */
    projectId: number | string

    /**
     * 项目名称
     * @type {string}
     * @memberof PrepaymentOrderRequest
     */
    projectName: string

    /**
     * 申请金额
     * @type {number | string}
     * @memberof PrepaymentOrderRequest
     */
    applyAmount: number | string

    /**
     * 请备注
     * @type {string}
     * @memberof PrepaymentOrderRequest
     */
    applyRemark?: string

    /**
     * 申请人
     * @type {string}
     * @memberof PrepaymentOrderRequest
     */
    applyUser?: string

    /**
     * 申请人手机号
     * @type {string}
     * @memberof PrepaymentOrderRequest
     */
    applyUserPhone: string

    /**
     * 上游供应商名称
     * @type {string}
     * @memberof PrepaymentOrderRequest
     */
    supplierCompanyName: string

    /**
     * 银行联行号
     * @type {string}
     * @memberof PrepaymentOrderRequest
     */
    supplierBankNo: string

    /**
     * 供应商开户行名称
     * @type {string}
     * @memberof PrepaymentOrderRequest
     */
    supplierAccountName: string

    /**
     * 供应商银行账号
     * @type {string}
     * @memberof PrepaymentOrderRequest
     */
    supplierAccountNo: string

    /**
     * 期望上游支付日期
     * @type {string}
     * @memberof PrepaymentOrderRequest
     */
    expectSupplierPaymentDate: string

    /**
     * 上游支付方式:1-银行转帐;2-银行承兑
     * @type {number | string}
     * @memberof PrepaymentOrderRequest
     */
    supplierPaymentType: number | string

    /**
     * 付款主体misCode
     * @type {string}
     * @memberof PrepaymentOrderRequest
     */
    paymentMisCode: string

    /**
     * 支付类型
     * @type {number | string}
     * @memberof PrepaymentOrderRequest
     */
    paymentType: number | string

    /**
     * 附件信息
     * @type {Array<AttachDocRequest>}
     * @memberof PrepaymentOrderRequest
     */
    attachDocRequestList: Array<AttachDocRequest>

}

/**
*
* @export
* @interface ReqServiceFeePayment
*/
export interface ReqServiceFeePayment {

    /**
     * 账单id
     * @type {number | string}
     * @memberof ReqServiceFeePayment
     */
    fundId: number | string

    /**
     * 支付单Id
     * @type {number | string}
     * @memberof ReqServiceFeePayment
     */
    paymentOrderId?: number | string

    /**
     * 支付凭证
     * @type {Array<ReqAttachDoc>}
     * @memberof ReqServiceFeePayment
     */
    attachDocList?: Array<ReqAttachDoc>

    /**
     * 修改人
     * @type {string}
     * @memberof ReqServiceFeePayment
     */
    updateBy?: string

    /**
     * 支付金额
     * @type {number | string}
     * @memberof ReqServiceFeePayment
     */
    paidAmount?: number | string

}

/**
*
* @export
* @interface PaymentOrderSegmentFinanceApprovalRequest
*/
export interface PaymentOrderSegmentFinanceApprovalRequest {

    /**
     * 支付单id
     * @type {number | string}
     * @memberof PaymentOrderSegmentFinanceApprovalRequest
     */
    paymentOrderId: number | string

    /**
     * 账户信息是否已确认
     * @type {boolean}
     * @memberof PaymentOrderSegmentFinanceApprovalRequest
     */
    supplierAccountConfirm: boolean

    /**
     * 共管户是否已监管
     * @type {boolean}
     * @memberof PaymentOrderSegmentFinanceApprovalRequest
     */
    coManagerSupervision: boolean

    /**
     * 分财审核备注
     * @type {string}
     * @memberof PaymentOrderSegmentFinanceApprovalRequest
     */
    approvalRemark?: string

}

/**
*
* @export
* @interface ReqGoodsConfirm
*/
export interface ReqGoodsConfirm {

    /**
     * 支付单Id
     * @type {number | string}
     * @memberof ReqGoodsConfirm
     */
    orderId?: number | string

    /**
     * 货物Id
     * @type {number | string}
     * @memberof ReqGoodsConfirm
     */
    goodsId?: number | string

    /**
     * 到货金额
     * @type {number | string}
     * @memberof ReqGoodsConfirm
     */
    goodsAmount?: number | string

    /**
     * 应到货金额
     * @type {number | string}
     * @memberof ReqGoodsConfirm
     */
    totalAmount?: number | string

    /**
     * 备注
     * @type {string}
     * @memberof ReqGoodsConfirm
     */
    goodsRemark?: string

    /**
     * 收货凭证
     * @type {Array<ReqAttachDoc>}
     * @memberof ReqGoodsConfirm
     */
    reqAttachDocs?: Array<ReqAttachDoc>

    /**
     * 创建人
     * @type {string}
     * @memberof ReqGoodsConfirm
     */
    createBy?: string

    /**
     * 创建人手机号
     * @type {string}
     * @memberof ReqGoodsConfirm
     */
    createPhone?: string

}

/**
*
* @export
* @interface ReqConfirmPayment
*/
export interface ReqConfirmPayment {

    /**
     * 支付单id
     * @type {number | string}
     * @memberof ReqConfirmPayment
     */
    paymentOrderId?: number | string

    /**
     * 账单id
     * @type {number | string}
     * @memberof ReqConfirmPayment
     */
    fundId?: number | string

    /**
     * 支付状态(后台设置，前端不用穿)
     * @type {number | string}
     * @memberof ReqConfirmPayment
     */
    status?: number | string

    /**
     * 支付金额
     * @type {number | string}
     * @memberof ReqConfirmPayment
     */
    paidAmount?: number | string

    /**
     * 支付凭证
     * @type {Array<ReqAttachDoc>}
     * @memberof ReqConfirmPayment
     */
    attachDocList?: Array<ReqAttachDoc>

    /**
     * 修改人
     * @type {string}
     * @memberof ReqConfirmPayment
     */
    updateBy?: string

}

/**
*
* @export
* @interface ReqFundCancel
*/
export interface ReqFundCancel {

    /**
     * 支付单Id
     * @type {number | string}
     * @memberof ReqFundCancel
     */
    orderId?: number | string

    /**
     * 备注
     * @type {string}
     * @memberof ReqFundCancel
     */
    remark?: string

    /**
     * 修改人
     * @type {string}
     * @memberof ReqFundCancel
     */
    updateBy?: string

    /**
     * 修改人账号（手机号）
     * @type {string}
     * @memberof ReqFundCancel
     */
    updatePhone?: string

    /**
     * 取消来源：1, 支付单审核未通过，交易关闭
2, 用户拒签订单及服务费确认函
3, 用户主动取消 ，4：客户经理主动取消
     * @type {number | string}
     * @memberof ReqFundCancel
     */
    cancelSource?: number | string

}

/**
*
* @export
* @interface PaymentOrderCancelRequest
*/
export interface PaymentOrderCancelRequest {

    /**
     * 支付单id
     * @type {number | string}
     * @memberof PaymentOrderCancelRequest
     */
    paymentOrderId?: number | string

    /**
     * 关闭原因
     * @type {string}
     * @memberof PaymentOrderCancelRequest
     */
    closeReason?: string

    /**
     * 取消凭证
     * @type {Array<AttachDocRequest>}
     * @memberof PaymentOrderCancelRequest
     */
    attachDocRequestList?: Array<AttachDocRequest>

}

/**
* 票面金额
* @export
* @interface BillAmountRequest
*/
export interface BillAmountRequest {

    /**
     * 票面章数
     * @type {number | string}
     * @memberof BillAmountRequest
     */
    number?: number | string

    /**
     * 票面金额
     * @type {number | string}
     * @memberof BillAmountRequest
     */
    amount?: number | string

}

/**
*
* @export
* @interface ReqPaymentOrderApply
*/
export interface ReqPaymentOrderApply {

    /**
     * 项目Id
     * @type {number | string}
     * @memberof ReqPaymentOrderApply
     */
    projectId: number | string

    /**
     * 项目名称
     * @type {string}
     * @memberof ReqPaymentOrderApply
     */
    projectName: string

    /**
     * 采购单Id
     * @type {number | string}
     * @memberof ReqPaymentOrderApply
     */
    poId: number | string

    /**
     * 上游供应商名称
     * @type {string}
     * @memberof ReqPaymentOrderApply
     */
    supplierCompanyName?: string

    /**
     *
     * @type {JsonNode}
     * @memberof ReqPaymentOrderApply
     */
    paymentDetail?: JsonNode

    /**
     * 最迟发货日期
     * @type {string}
     * @memberof ReqPaymentOrderApply
     */
    lastGoodsDate?: string

    /**
     * 收货地址
     * @type {string}
     * @memberof ReqPaymentOrderApply
     */
    goodsAddress?: string

    /**
     * 申请类型：1-一次性 2-分批
     * @type {number | string}
     * @memberof ReqPaymentOrderApply
     */
    applyType?: number | string

    /**
     * 申请金额
     * @type {number | string}
     * @memberof ReqPaymentOrderApply
     */
    applyAmount?: number | string

    /**
     * 创建人
     * @type {string}
     * @memberof ReqPaymentOrderApply
     */
    createBy?: string

    /**
     * 申请人的手机号
     * @type {string}
     * @memberof ReqPaymentOrderApply
     */
    createPhone?: string

    /**
     * 修改人
     * @type {string}
     * @memberof ReqPaymentOrderApply
     */
    updateBy?: string

    /**
     * 上游支付方式:1-银行转帐;2-银行承兑
     * @type {number | string}
     * @memberof ReqPaymentOrderApply
     */
    supplierPaymentType: number | string

    /**
     * 银行联行号
     * @type {string}
     * @memberof ReqPaymentOrderApply
     */
    supplierBankNo: string

    /**
     * 供应商开户行名称
     * @type {string}
     * @memberof ReqPaymentOrderApply
     */
    supplierAccountName: string

    /**
     * 供应商银行账号
     * @type {string}
     * @memberof ReqPaymentOrderApply
     */
    supplierAccountNo: string

    /**
     * 期望上游支付日期
     * @type {string}
     * @memberof ReqPaymentOrderApply
     */
    expectSupplierPaymentDate: string

    /**
     * 特殊说明
     * @type {string}
     * @memberof ReqPaymentOrderApply
     */
    specialRemark?: string

    /**
     * 票面金额有无要求 0：无要求 1：有要求
     * @type {number | string}
     * @memberof ReqPaymentOrderApply
     */
    billClaim?: number | string

    /**
     * 票面金额
     * @type {Array<BillAmountRequest>}
     * @memberof ReqPaymentOrderApply
     */
    billAmount?: Array<BillAmountRequest>

    /**
     * 预付款订单id (选择核销的预付款订单)
     * @type {Array<number | string>}
     * @memberof ReqPaymentOrderApply
     */
    prepaymentId?: Array<number | string>

    /**
     * 上游货款方式 1.先款后货 2.先货后款
     * @type {number | string}
     * @memberof ReqPaymentOrderApply
     */
    supplierPaymentMethod: number | string

    /**
     * 合作方式:1-垫资代采;2-代收代付
     * @type {number | string}
     * @memberof ReqPaymentOrderApply
     */
    dealerCooperationMethod: number | string

    /**
     * 首付款金额
     * @type {number | string}
     * @memberof ReqPaymentOrderApply
     */
    downPaymentAmount: number | string

    /**
     * 费率（上游支付方式费率）
     * @type {number | string}
     * @memberof ReqPaymentOrderApply
     */
    serviceFeeRate: number | string

    /**
     * 经销商id
     * @type {number | string}
     * @memberof ReqPaymentOrderApply
     */
    distributorId: number | string

    /**
     * 销售毛利率(%)
     * @type {number | string}
     * @memberof ReqPaymentOrderApply
     */
    salesGrossMargin?: number | string

    /**
     * 采购折让(%)
     * @type {number | string}
     * @memberof ReqPaymentOrderApply
     */
    purchaseDiscountRate?: number | string

}

/**
*
* @export
* @interface PaymentOrderSyncOaRequest
*/
export interface PaymentOrderSyncOaRequest {

    /**
     * 支付单编号集合
     * @type {Array<string>}
     * @memberof PaymentOrderSyncOaRequest
     */
    paymentOrderNoList?: Array<string>

}

/**
*
* @export
* @interface LoanTransferSupplierRequest
*/
export interface LoanTransferSupplierRequest {

    /**
     * 支付单id
     * @type {number | string}
     * @memberof LoanTransferSupplierRequest
     */
    id?: number | string

    /**
     * 上游供应商【收款人名称】
     * @type {string}
     * @memberof LoanTransferSupplierRequest
     */
    supplierCompanyName?: string

    /**
     * 供应商开户行名称
     * @type {string}
     * @memberof LoanTransferSupplierRequest
     */
    supplierAccountName?: string

    /**
     * 供应商银行账号
     * @type {string}
     * @memberof LoanTransferSupplierRequest
     */
    supplierAccountNo?: string

    /**
     * 银行联行号
     * @type {string}
     * @memberof LoanTransferSupplierRequest
     */
    supplierBankNo?: string

}

/**
*
* @export
* @interface PledgeRequest
*/
export interface PledgeRequest {

    /**
     * 采购单id
     * @type {number | string}
     * @memberof PledgeRequest
     */
    purchaseOrderId?: number | string

    /**
     * 支付单id
     * @type {number | string}
     * @memberof PledgeRequest
     */
    paymentOrderId?: number | string

    /**
     * 质押信息
     * @type {string}
     * @memberof PledgeRequest
     */
    pledgeNo: string

}

/**
*
* @export
* @interface LoanTransferRequest
*/
export interface LoanTransferRequest {

    /**
     * 支付单放款交接id
     * @type {number | string}
     * @memberof LoanTransferRequest
     */
    id: number | string

    /**
     * 支付单id
     * @type {number | string}
     * @memberof LoanTransferRequest
     */
    paymentOrderId: number | string

    /**
     * 质押信息
     * @type {string}
     * @memberof LoanTransferRequest
     */
    pledgeNo: string

    /**
     * OA货款支付流程
     * @type {string}
     * @memberof LoanTransferRequest
     */
    oaNo: string

    /**
     * OA货款支付流程状态 1已完结
     * @type {number | string}
     * @memberof LoanTransferRequest
     */
    oaStatus: number | string

}

/**
*
* @export
* @interface LoanTransferDocRequest
*/
export interface LoanTransferDocRequest {

    /**
     * 支付单id
     * @type {number | string}
     * @memberof LoanTransferDocRequest
     */
    paymentOrderId?: number | string

    /**
     * 采购合同（合同归档合同文件）20
     * @type {Array<AttachDocRequest>}
     * @memberof LoanTransferDocRequest
     */
    contractArchiveDocs?: Array<AttachDocRequest>

    /**
     * 采购合同（放款交接文件）21
     * @type {Array<AttachDocRequest>}
     * @memberof LoanTransferDocRequest
     */
    loanTransferArchiveDocs?: Array<AttachDocRequest>

    /**
     * 单次采购明细文件（采购合同归档合同文件）22
     * @type {Array<AttachDocRequest>}
     * @memberof LoanTransferDocRequest
     */
    purchaseDetailsDocs?: Array<AttachDocRequest>

}

/**
*
* @export
* @interface LoanTransferConfirm
*/
export interface LoanTransferConfirm {

    /**
     * 支付单id
     * @type {number | string}
     * @memberof LoanTransferConfirm
     */
    paymentOrderId: number | string

    /**
     * 备注
     * @type {string}
     * @memberof LoanTransferConfirm
     */
    remark?: string

}

/**
*
* @export
* @interface ReqFundUpdate
*/
export interface ReqFundUpdate {

    /**
     * 账单Id
     * @type {number | string}
     * @memberof ReqFundUpdate
     */
    id: number | string

    /**
     * 支付金额
     * @type {number | string}
     * @memberof ReqFundUpdate
     */
    paymentAmount?: number | string

    /**
     * 应支付日期
     * @type {string}
     * @memberof ReqFundUpdate
     */
    schedulePaymentDate?: string

    /**
     * 修改人
     * @type {string}
     * @memberof ReqFundUpdate
     */
    updateBy?: string

}

/**
*
* @export
* @interface ReqFundGenerate
*/
export interface ReqFundGenerate {

    /**
     * 支付单
     * @type {number | string}
     * @memberof ReqFundGenerate
     */
    orderId?: number | string

    /**
     * 总额款
     * @type {number | string}
     * @memberof ReqFundGenerate
     */
    totalAmount?: number | string

    /**
     * 首付款
     * @type {number | string}
     * @memberof ReqFundGenerate
     */
    downpaymentAmount?: number | string

    /**
     * 费率
     * @type {number | string}
     * @memberof ReqFundGenerate
     */
    serviceFeeRate?: number | string

    /**
     * 申请日期
     * @type {string}
     * @memberof ReqFundGenerate
     */
    applyDate?: string

    /**
     * 免息方式：0-无;1-1个月;2-2个月;3-3个月;4-4个月;5-5个月;6-6个月;
     * @type {number | string}
     * @memberof ReqFundGenerate
     */
    freeInterestType?: number | string

    /**
     * 创建人
     * @type {string}
     * @memberof ReqFundGenerate
     */
    createBy?: string

    /**
     * 支付周期（月）;
     * @type {number | string}
     * @memberof ReqFundGenerate
     */
    terms?: number | string

}

/**
*
* @export
* @interface RemainPaymentFundRequest
*/
export interface RemainPaymentFundRequest {

    /**
     * 账单id
     * @type {number | string}
     * @memberof RemainPaymentFundRequest
     */
    fundId: number | string

    /**
     * 本次支付金额
     * @type {number | string}
     * @memberof RemainPaymentFundRequest
     */
    paidAmount: number | string

    /**
     * 凭证链接
     * @type {Array<AttachDocRequest>}
     * @memberof RemainPaymentFundRequest
     */
    urlList: Array<AttachDocRequest>

    /**
     * 创建人
     * @type {string}
     * @memberof RemainPaymentFundRequest
     */
    createBy: string

    /**
     * 创建人手机号
     * @type {string}
     * @memberof RemainPaymentFundRequest
     */
    createPhone: string

}

/**
*
* @export
* @interface ReqFundConfirm
*/
export interface ReqFundConfirm {

    /**
     * 账单Id
     * @type {number | string}
     * @memberof ReqFundConfirm
     */
    id: number | string

    /**
     * 确认类型：1-确认；2-未确认；
     * @type {number | string}
     * @memberof ReqFundConfirm
     */
    confirmType?: number | string

    /**
     * 修改人
     * @type {string}
     * @memberof ReqFundConfirm
     */
    updateBy?: string

}

/**
* 凭证链接
* @export
* @interface AttachDoc
*/
export interface AttachDoc {

    /**
     * 主键id
     * @type {number | string}
     * @memberof AttachDoc
     */
    id: number | string

    /**
     * 业务Id
     * @type {number | string}
     * @memberof AttachDoc
     */
    bizId: number | string

    /**
     * 业务类型：1-票据；2-货物；3-上游支付凭证；4-还款支付凭证；5-采购单；6:合同审核 7:网银盾照片附件 8:共管户截图附件 9：取消支付单关闭凭证 10：账单支付明细凭证 20：合同=归档合同文件 21：放款交接=采购归档合同文件 22：放款交接=单次采购明细附件
     * @type {number | string}
     * @memberof AttachDoc
     */
    bizType: number | string

    /**
     * 附件地址
     * @type {string}
     * @memberof AttachDoc
     */
    fileUrl: string

    /**
     * 附件名称
     * @type {string}
     * @memberof AttachDoc
     */
    fileName: string

    /**
     * 创建人
     * @type {string}
     * @memberof AttachDoc
     */
    createBy: string

    /**
     * 创建时间
     * @type {string}
     * @memberof AttachDoc
     */
    createTime: string

    /**
     * 更新人
     * @type {string}
     * @memberof AttachDoc
     */
    updateBy: string

    /**
     * 更新时间
     * @type {string}
     * @memberof AttachDoc
     */
    updateTime: string

    /**
     * 删除标识
     * @type {boolean}
     * @memberof AttachDoc
     */
    deleted: boolean

}

/**
*
* @export
* @interface ReqFund
*/
export interface ReqFund {

    /**
     * 账单Id
     * @type {number | string}
     * @memberof ReqFund
     */
    id: number | string

    /**
     * 支付单Id
     * @type {number | string}
     * @memberof ReqFund
     */
    orderId?: number | string

    /**
     * 还款类型：1-首付款；2-剩余货款；3-服务费；
     * @type {number | string}
     * @memberof ReqFund
     */
    repaymentType?: number | string

    /**
     * 服务费期数
     * @type {number | string}
     * @memberof ReqFund
     */
    feeRepaymentOrder?: number | string

    /**
     * 备注
     * @type {string}
     * @memberof ReqFund
     */
    remark?: string

    /**
     * 支付方式:1-银行转帐;2-银行承兑
     * @type {number | string}
     * @memberof ReqFund
     */
    paymentType?: number | string

    /**
     * 实际支付金额
     * @type {number | string}
     * @memberof ReqFund
     */
    paidAmount?: number | string

    /**
     * 实际支付日期
     * @type {string}
     * @memberof ReqFund
     */
    paidDate?: string

    /**
     * 付款人
     * @type {string}
     * @memberof ReqFund
     */
    paymentBy?: string

    /**
     * 修改时间
     * @type {string}
     * @memberof ReqFund
     */
    updateTime?: string

    /**
     * 修改人
     * @type {string}
     * @memberof ReqFund
     */
    updateBy?: string

    /**
     * 凭证链接
     * @type {Array<AttachDoc>}
     * @memberof ReqFund
     */
    urlList?: Array<AttachDoc>

}

/**
*
* @export
* @interface ReqContractExport
*/
export interface ReqContractExport {

    /**
     * 合同id
     * @type {number | string}
     * @memberof ReqContractExport
     */
    contractId?: number | string

    /**
     * 企业微信用户id
     * @type {string}
     * @memberof ReqContractExport
     */
    corpUserId?: string

    /**
     * 发送的邮箱
     * @type {string}
     * @memberof ReqContractExport
     */
    email?: string

}

/**
*
* @export
* @interface ReqOfflineContract
*/
export interface ReqOfflineContract {

    /**
     * 合同Id
     * @type {number | string}
     * @memberof ReqOfflineContract
     */
    id?: number | string

    /**
     * 合同名称
     * @type {string}
     * @memberof ReqOfflineContract
     */
    contractName?: string

    /**
     * 工程项目id
     * @type {number | string}
     * @memberof ReqOfflineContract
     */
    projectId?: number | string

    /**
     * 工程项目名称
     * @type {string}
     * @memberof ReqOfflineContract
     */
    projectName?: string

    /**
     * 采购单id
     * @type {number | string}
     * @memberof ReqOfflineContract
     */
    purchaseOrderId?: number | string

    /**
     * 变更合同时必传 原合同id
     * @type {number | string}
     * @memberof ReqOfflineContract
     */
    originalContractId?: number | string

    /**
     * 变更合同时必传 状态：1-新增;2-变更
     * @type {number | string}
     * @memberof ReqOfflineContract
     */
    changeStatus?: number | string

    /**
     * 合同类型
     * @type {number | string}
     * @memberof ReqOfflineContract
     */
    contractTypeId?: number | string

    /**
     * 合同签署类型 1：线上 2：线下
     * @type {number | string}
     * @memberof ReqOfflineContract
     */
    contractSignType?: number | string

    /**
     * 合同模板版本id
     * @type {number | string}
     * @memberof ReqOfflineContract
     */
    contractTemplateVersionId?: number | string

    /**
     * 合同状态
     * @type {number | string}
     * @memberof ReqOfflineContract
     */
    contractStatus?: number | string

    /**
     * 创建人
     * @type {string}
     * @memberof ReqOfflineContract
     */
    createBy?: string

    /**
     * 创建人手机号
     * @type {string}
     * @memberof ReqOfflineContract
     */
    createPhone?: string

    /**
     * 更新人
     * @type {string}
     * @memberof ReqOfflineContract
     */
    updateBy?: string

    /**
     * 合同文件附件集合
     * @type {Array<ReqPicture>}
     * @memberof ReqOfflineContract
     */
    picUrls?: Array<ReqPicture>

    /**
     * 提交人手机号
     * @type {string}
     * @memberof ReqOfflineContract
     */
    submitterMobile?: string

}

/**
*
* @export
* @interface ReqContractSubmitApprove
*/
export interface ReqContractSubmitApprove {

    /**
     * 合同id
     * @type {number | string}
     * @memberof ReqContractSubmitApprove
     */
    contractId?: number | string

    /**
     * 合同审批人
     * @type {string}
     * @memberof ReqContractSubmitApprove
     */
    approver?: string

    /**
     * 合同审批角色 0：客户经理 1：分财 2：风控 3：法务
     * @type {number | string}
     * @memberof ReqContractSubmitApprove
     */
    approverRole?: number | string

    /**
     * 审批备注
     * @type {string}
     * @memberof ReqContractSubmitApprove
     */
    approvalRemark?: string

    /**
     * 合同文件附件集合
     * @type {Array<ReqPicture>}
     * @memberof ReqContractSubmitApprove
     */
    picUrls?: Array<ReqPicture>

}

/**
*
* @export
* @interface ReqContractUrlExport
*/
export interface ReqContractUrlExport {

    /**
     * 合同名称
     * @type {string}
     * @memberof ReqContractUrlExport
     */
    contractName: string

    /**
     * 合同链接
     * @type {string}
     * @memberof ReqContractUrlExport
     */
    url: string

    /**
     * 发送的邮箱
     * @type {string}
     * @memberof ReqContractUrlExport
     */
    email?: string

    /**
     * 企业微信用户id
     * @type {string}
     * @memberof ReqContractUrlExport
     */
    corpUserId?: string

}

/**
*
* @export
* @interface AppletContractDownLoadRequest
*/
export interface AppletContractDownLoadRequest {

    /**
     * 合同id
     * @type {number | string}
     * @memberof AppletContractDownLoadRequest
     */
    contractId?: number | string

    /**
     * 企业微信用户id或者小程序用户id
     * @type {string}
     * @memberof AppletContractDownLoadRequest
     */
    userId?: string

    /**
     * 发送的邮箱
     * @type {string}
     * @memberof AppletContractDownLoadRequest
     */
    email?: string

}

/**
*
* @export
* @interface ReqContractAbolish
*/
export interface ReqContractAbolish {

    /**
     * 合同id
     * @type {number | string}
     * @memberof ReqContractAbolish
     */
    contractId?: number | string

    /**
     * 操作人手机号
     * @type {string}
     * @memberof ReqContractAbolish
     */
    phone?: string

    /**
     * 操作人
     * @type {string}
     * @memberof ReqContractAbolish
     */
    createBy?: string

}

/**
* 签署人信息
* @export
* @interface ReqContractSign
*/
export interface ReqContractSign {

    /**
     * 合同签署id
     * @type {number | string}
     * @memberof ReqContractSign
     */
    id?: number | string

    /**
     * 合同id
     * @type {number | string}
     * @memberof ReqContractSign
     */
    contractId?: number | string

    /**
     * 签署流程id
     * @type {string}
     * @memberof ReqContractSign
     */
    flowId?: string

    /**
     * 签署人名称
     * @type {string}
     * @memberof ReqContractSign
     */
    signName: string

    /**
     * 签署方key值
     * @type {string}
     * @memberof ReqContractSign
     */
    signKey: string

    /**
     * 签署人身份证号
     * @type {string}
     * @memberof ReqContractSign
     */
    signIdNo: string

    /**
     * 签署人手机号
     * @type {string}
     * @memberof ReqContractSign
     */
    signPhone: string

    /**
     * 经办人类型 1：经办人 2：法人
     * @type {number | string}
     * @memberof ReqContractSign
     */
    managerType?: number | string

    /**
     * 企业名称
     * @type {string}
     * @memberof ReqContractSign
     */
    companyName?: string

    /**
     * 统一社会信用代码证
     * @type {string}
     * @memberof ReqContractSign
     */
    unifiedSocialCreditCode?: string

    /**
     * 法人名称
     * @type {string}
     * @memberof ReqContractSign
     */
    legalRepName?: string

    /**
     * 法人身份证号
     * @type {string}
     * @memberof ReqContractSign
     */
    legalRepIdNo?: string

    /**
     * 签署类型 1：个人 2：签署方企业 3：平台
     * @type {number | string}
     * @memberof ReqContractSign
     */
    signType: number | string

    /**
     * 签署时间
     * @type {string}
     * @memberof ReqContractSign
     */
    signTime?: string

    /**
     * 签署状态 1：未签署 2：签署中 3：签署完成 4：已拒签 5：签署失败
     * @type {number | string}
     * @memberof ReqContractSign
     */
    signStatus?: number | string

    /**
     * 签署备注
     * @type {string}
     * @memberof ReqContractSign
     */
    signRemark?: string

    /**
     * 签署关键字
     * @type {string}
     * @memberof ReqContractSign
     */
    signKeyword?: string

    /**
     * 签署区id
     * @type {string}
     * @memberof ReqContractSign
     */
    signFieldId?: string

    /**
     * 签署方式 0：手绘 1：模板章 2:手绘+模板章
     * @type {number | string}
     * @memberof ReqContractSign
     */
    signMethod: number | string

    /**
     * 创建人
     * @type {string}
     * @memberof ReqContractSign
     */
    createBy?: string

    /**
     * 创建人手机号
     * @type {string}
     * @memberof ReqContractSign
     */
    createPhone: string

    /**
     * 更新人
     * @type {string}
     * @memberof ReqContractSign
     */
    updateBy?: string

}

/**
*
* @export
* @interface ReqContractSignPerfect
*/
export interface ReqContractSignPerfect {

    /**
     * 合同id
     * @type {number | string}
     * @memberof ReqContractSignPerfect
     */
    contractId: number | string

    /**
     * 签署人信息
     * @type {Array<ReqContractSign>}
     * @memberof ReqContractSignPerfect
     */
    reqContractSignList: Array<ReqContractSign>

    /**
     * 创建人
     * @type {string}
     * @memberof ReqContractSignPerfect
     */
    createBy?: string

}

/**
* 个人信息集合
* @export
* @interface Individual
*/
export interface Individual {

    /**
     * 姓名
     * @type {string}
     * @memberof Individual
     */
    name?: string

    /**
     * 身份证号
     * @type {string}
     * @memberof Individual
     */
    idNo?: string

}

/**
*
* @export
* @interface PersonAuthenticationRequest
*/
export interface PersonAuthenticationRequest {

    /**
     * 个人信息集合
     * @type {Array<Individual>}
     * @memberof PersonAuthenticationRequest
     */
    individualList?: Array<Individual>

}

/**
*
* @export
* @interface ReqInitiateContractSigning
*/
export interface ReqInitiateContractSigning {

    /**
     * 合同id
     * @type {number | string}
     * @memberof ReqInitiateContractSigning
     */
    contractId: number | string

    /**
     * 创建人
     * @type {string}
     * @memberof ReqInitiateContractSigning
     */
    createBy: string

    /**
     * 创建人手机号
     * @type {string}
     * @memberof ReqInitiateContractSigning
     */
    createPhone: string

    /**
     * 创建人工号
     * @type {string}
     * @memberof ReqInitiateContractSigning
     */
    createCode?: string

    /**
     * 合同内容【发起确认函签署必填】
     * @type {string}
     * @memberof ReqInitiateContractSigning
     */
    contractContent?: string

    /**
     * 支付单id【发起确认函签署必填】
     * @type {number | string}
     * @memberof ReqInitiateContractSigning
     */
    paymentOrderId?: number | string

}

/**
*
* @export
* @interface ReqContractArchive
*/
export interface ReqContractArchive {

    /**
     * 合同id
     * @type {number | string}
     * @memberof ReqContractArchive
     */
    contractId?: number | string

    /**
     * 创建人
     * @type {string}
     * @memberof ReqContractArchive
     */
    createBy?: string

    /**
     * 合同归档附件信息
     * @type {Array<ReqAttachDoc>}
     * @memberof ReqContractArchive
     */
    attachDocs?: Array<ReqAttachDoc>

}

/**
*
* @export
* @interface ReqConfirmationSign
*/
export interface ReqConfirmationSign {

    /**
     * 支付单id
     * @type {number | string}
     * @memberof ReqConfirmationSign
     */
    paymentOrderId: number | string

    /**
     * 创建人
     * @type {string}
     * @memberof ReqConfirmationSign
     */
    createBy: string

    /**
     * 创建人手机号
     * @type {string}
     * @memberof ReqConfirmationSign
     */
    createPhone: string

    /**
     * 签署人信息
     * @type {Array<ReqContractSign>}
     * @memberof ReqConfirmationSign
     */
    reqContractSignList: Array<ReqContractSign>

}

/**
* 确认函合同模板版本
* @export
* @interface ContractTemplateVersion
*/
export interface ContractTemplateVersion {

    /**
     *
     * @type {number | string}
     * @memberof ContractTemplateVersion
     */
    id: number | string

    /**
     *
     * @type {number | string}
     * @memberof ContractTemplateVersion
     */
    templateId: number | string

    /**
     *
     * @type {string}
     * @memberof ContractTemplateVersion
     */
    templateName: string

    /**
     *
     * @type {string}
     * @memberof ContractTemplateVersion
     */
    versionNo: string

    /**
     *
     * @type {string}
     * @memberof ContractTemplateVersion
     */
    describe: string

    /**
     *
     * @type {string}
     * @memberof ContractTemplateVersion
     */
    content: string

    /**
     *
     * @type {Array<ReqParam>}
     * @memberof ContractTemplateVersion
     */
    param: Array<ReqParam>

    /**
     *
     * @type {string}
     * @memberof ContractTemplateVersion
     */
    pdfUrl: string

    /**
     *
     * @type {number | string}
     * @memberof ContractTemplateVersion
     */
    recommendSigner: number | string

    /**
     *
     * @type {string}
     * @memberof ContractTemplateVersion
     */
    createTime: string

    /**
     *
     * @type {string}
     * @memberof ContractTemplateVersion
     */
    createBy: string

    /**
     *
     * @type {string}
     * @memberof ContractTemplateVersion
     */
    createAccount: string

}

/**
*
* @export
* @interface RespConfirmation
*/
export interface RespConfirmation {

    /**
     * 签署链接
     * @type {string}
     * @memberof RespConfirmation
     */
    signUrl: string

    /**
     *
     * @type {Contract}
     * @memberof RespConfirmation
     */
    contract: Contract

    /**
     *
     * @type {ContractTemplateVersion}
     * @memberof RespConfirmation
     */
    contractTemplateVersion: ContractTemplateVersion

    /**
     *
     * @type {boolean}
     * @memberof RespConfirmation
     */
    sign: boolean

}

/**
*
* @export
* @interface ReqContractEditRecord
*/
export interface ReqContractEditRecord {

    /**
     * 合同编辑记录id
     * @type {number | string}
     * @memberof ReqContractEditRecord
     */
    id?: number | string

    /**
     * 合同id
     * @type {number | string}
     * @memberof ReqContractEditRecord
     */
    contractId?: number | string

    /**
     * 合同审批id
     * @type {number | string}
     * @memberof ReqContractEditRecord
     */
    approvalId?: number | string

    /**
     * 合同审批角色 0：客户经理 1：分财 2：风控 3：法务
     * @type {number | string}
     * @memberof ReqContractEditRecord
     */
    approverRole?: number | string

    /**
     * 类型 1：提交合同 2：编辑合同内容 3：编辑合同条款 4：审核通过 5：驳回
     * @type {number | string}
     * @memberof ReqContractEditRecord
     */
    type?: number | string

    /**
     * 编辑字段
     * @type {string}
     * @memberof ReqContractEditRecord
     */
    fieldName?: string

    /**
     * 编辑前内容
     * @type {string}
     * @memberof ReqContractEditRecord
     */
    fieldOriginalContent?: string

    /**
     * 编辑内容
     * @type {string}
     * @memberof ReqContractEditRecord
     */
    fieldContent?: string

    /**
     * 合同字段键值对
     * @type {string}
     * @memberof ReqContractEditRecord
     */
    contractFieldsList?: string

    /**
     * 合同内容
     * @type {string}
     * @memberof ReqContractEditRecord
     */
    contractContent?: string

    /**
     * 创建人【编辑人】
     * @type {string}
     * @memberof ReqContractEditRecord
     */
    createBy?: string

}

/**
*
* @export
* @interface ReqContractReject
*/
export interface ReqContractReject {

    /**
     * 合同id
     * @type {number | string}
     * @memberof ReqContractReject
     */
    contractId?: number | string

    /**
     * 合同审批人
     * @type {string}
     * @memberof ReqContractReject
     */
    approver?: string

    /**
     * 合同审批角色 0：客户经理 1：分财 2：风控 3：法务
     * @type {number | string}
     * @memberof ReqContractReject
     */
    approverRole?: number | string

    /**
     * 审批备注
     * @type {string}
     * @memberof ReqContractReject
     */
    approvalRemark?: string

}

/**
*
* @export
* @interface ReqContractApproval
*/
export interface ReqContractApproval {

    /**
     * 合同审批id
     * @type {number | string}
     * @memberof ReqContractApproval
     */
    id?: number | string

    /**
     * 合同id
     * @type {number | string}
     * @memberof ReqContractApproval
     */
    contractId?: number | string

    /**
     * 合同名称
     * @type {string}
     * @memberof ReqContractApproval
     */
    contractName?: string

    /**
     * 合同审批人
     * @type {string}
     * @memberof ReqContractApproval
     */
    approver?: string

    /**
     * 合同审批角色 0：客户经理 1：分财 2：风控 3：法务
     * @type {number | string}
     * @memberof ReqContractApproval
     */
    approverRole?: number | string

    /**
     * 审批状态 1：待审核 2：审核通过 3：审核不通过
     * @type {number | string}
     * @memberof ReqContractApproval
     */
    approvalStatus?: number | string

    /**
     * 审批备注
     * @type {string}
     * @memberof ReqContractApproval
     */
    approvalRemark?: string

    /**
     * 合同内容
     * @type {string}
     * @memberof ReqContractApproval
     */
    contractContent?: string

    /**
     * 转换前合同内容
     * @type {string}
     * @memberof ReqContractApproval
     */
    contractContentBeforeTransfer?: string

    /**
     * 合同转换前字段键值对
     * @type {string}
     * @memberof ReqContractApproval
     */
    contractFieldsListBeforeTransfer?: string

    /**
     * 平台签署方名称
     * @type {string}
     * @memberof ReqContractApproval
     */
    caOrgName?: string

}

/**
*
* @export
* @interface ReqContractRecord
*/
export interface ReqContractRecord {

    /**
     * 合同内容记录id
     * @type {number | string}
     * @memberof ReqContractRecord
     */
    id?: number | string

    /**
     * 合同id
     * @type {number | string}
     * @memberof ReqContractRecord
     */
    contractId?: number | string

    /**
     * 合同名称
     * @type {string}
     * @memberof ReqContractRecord
     */
    contractName?: string

    /**
     * 合同内容
     * @type {string}
     * @memberof ReqContractRecord
     */
    contractContent?: string

    /**
     * 合同文件附件集合
     * @type {Array<ReqPicture>}
     * @memberof ReqContractRecord
     */
    picUrls?: Array<ReqPicture>

    /**
     * 创建人
     * @type {string}
     * @memberof ReqContractRecord
     */
    createBy?: string

}

/**
*
* @export
* @interface ReqRealStatus
*/
export interface ReqRealStatus {

    /**
     * 签署人CA账号id
     * @type {string}
     * @memberof ReqRealStatus
     */
    accountId: string

    /**
     * 授权CA账号id
     * @type {string}
     * @memberof ReqRealStatus
     */
    authorizedAccountId: string

    /**
     * 更新者
     * @type {string}
     * @memberof ReqRealStatus
     */
    updateBy?: string

}

/**
*
* @export
* @interface SaveBillAmountRequest
*/
export interface SaveBillAmountRequest {

    /**
     *
     * @type {string}
     * @memberof SaveBillAmountRequest
     */
    createBy: string

    /**
     * 支付单id
     * @type {number | string}
     * @memberof SaveBillAmountRequest
     */
    paymentOrderId: number | string

    /**
     * 票面金额
     * @type {Array<BillAmountRequest>}
     * @memberof SaveBillAmountRequest
     */
    billAmount?: Array<BillAmountRequest>

    /**
     *
     * @type {boolean}
     * @memberof SaveBillAmountRequest
     */
    sendMessage?: boolean

}

/**
*
* @export
* @interface PaymentOrderVoucherRequest
*/
export interface PaymentOrderVoucherRequest {

    /**
     * 支付单id
     * @type {number | string}
     * @memberof PaymentOrderVoucherRequest
     */
    paymentOrderId: number | string

    /**
     * 文件（上传凭证返回的文件名和文件url）
     * @type {Array<ReqAttachDoc>}
     * @memberof PaymentOrderVoucherRequest
     */
    attachDocs: Array<ReqAttachDoc>

    /**
     * 经销商id
     * @type {number | string}
     * @memberof PaymentOrderVoucherRequest
     */
    companyId?: number | string

}

/**
*
* @export
* @interface FundPayVoucherRequest
*/
export interface FundPayVoucherRequest {

    /**
     * 账单id
     * @type {number | string}
     * @memberof FundPayVoucherRequest
     */
    fundId: number | string

    /**
     * 文件（上传凭证返回的文件名和文件url）
     * @type {Array<ReqAttachDoc>}
     * @memberof FundPayVoucherRequest
     */
    attachDocs: Array<ReqAttachDoc>

    /**
     * 经销商id
     * @type {number | string}
     * @memberof FundPayVoucherRequest
     */
    companyId?: number | string

}

/**
* 批量支付账单信息
* @export
* @interface FundBatch
*/
export interface FundBatch {

    /**
     * 账单id
     * @type {number | string}
     * @memberof FundBatch
     */
    fundId?: number | string

    /**
     * 支付金额
     * @type {number | string}
     * @memberof FundBatch
     */
    paymentAmount?: number | string

}

/**
*
* @export
* @interface FundPayVoucherBatchRequest
*/
export interface FundPayVoucherBatchRequest {

    /**
     * 批量支付账单信息
     * @type {Array<FundBatch>}
     * @memberof FundPayVoucherBatchRequest
     */
    fundBatchList: Array<FundBatch>

    /**
     * 文件（上传凭证返回的文件名和文件url）
     * @type {Array<ReqAttachDoc>}
     * @memberof FundPayVoucherBatchRequest
     */
    attachDocs: Array<ReqAttachDoc>

    /**
     * 经销商id
     * @type {number | string}
     * @memberof FundPayVoucherBatchRequest
     */
    companyId: number | string

}

/**
*
* @export
* @interface CommonBankFlowRequest
*/
export interface CommonBankFlowRequest {

    /**
     *
     * @type {string}
     * @memberof CommonBankFlowRequest
     */
    date?: string

    /**
     *
     * @type {string}
     * @memberof CommonBankFlowRequest
     */
    startTime?: string

    /**
     *
     * @type {string}
     * @memberof CommonBankFlowRequest
     */
    endTime?: string

    /**
     *
     * @type {string}
     * @memberof CommonBankFlowRequest
     */
    account?: string

    /**
     *
     * @type {string}
     * @memberof CommonBankFlowRequest
     */
    receiptName?: string

    /**
     *
     * @type {number | string}
     * @memberof CommonBankFlowRequest
     */
    bankType?: number | string

    /**
     *
     * @type {string}
     * @memberof CommonBankFlowRequest
     */
    bankName?: string

    /**
     *
     * @type {string}
     * @memberof CommonBankFlowRequest
     */
    bankCode?: string

}

/**
* 银行账户流水清单
* @export
* @interface BankBillReceiptRequest
*/
export interface BankBillReceiptRequest {

    /**
     * 银行出账清id
     * @type {number | string}
     * @memberof BankBillReceiptRequest
     */
    id?: number | string

    /**
     * 银行出账清单编码
     * @type {string}
     * @memberof BankBillReceiptRequest
     */
    billNo?: string

    /**
     * 收款方
     * @type {string}
     * @memberof BankBillReceiptRequest
     */
    receiptName?: string

    /**
     * 收款方账户
     * @type {string}
     * @memberof BankBillReceiptRequest
     */
    receiptBankAccount?: string

    /**
     * 付款方银行
     * @type {string}
     * @memberof BankBillReceiptRequest
     */
    payeeBankName?: string

    /**
     * 付款方账户
     * @type {string}
     * @memberof BankBillReceiptRequest
     */
    payeeBankAccount?: string

    /**
     * 总金额
     * @type {number | string}
     * @memberof BankBillReceiptRequest
     */
    totalAmount?: number | string

    /**
     * 可认领金额
     * @type {number | string}
     * @memberof BankBillReceiptRequest
     */
    noReceiptAmount?: number | string

    /**
     * 本次认领金额
     * @type {number | string}
     * @memberof BankBillReceiptRequest
     */
    currentReceiptAmount?: number | string

    /**
     * 付款方
     * @type {string}
     * @memberof BankBillReceiptRequest
     */
    payeeName?: string

    /**
     * 收款银行
     * @type {string}
     * @memberof BankBillReceiptRequest
     */
    receiptBankName?: string

}

/**
*
* @export
* @interface FundReceiptBankBillRequest
*/
export interface FundReceiptBankBillRequest {

    /**
     * 账单id
     * @type {number | string}
     * @memberof FundReceiptBankBillRequest
     */
    fundId?: number | string

    /**
     * 账单明细id  （认领流水时必传）
     * @type {number | string}
     * @memberof FundReceiptBankBillRequest
     */
    fundDetailId?: number | string

    /**
     * 银行账户流水清单
     * @type {Array<BankBillReceiptRequest>}
     * @memberof FundReceiptBankBillRequest
     */
    bankBillReceiptList: Array<BankBillReceiptRequest>

}

/**
* 账单列表
* @export
* @interface Fund
*/
export interface Fund {

    /**
     * 主键id
     * @type {number | string}
     * @memberof Fund
     */
    id?: number | string

    /**
     * 支付单Id
     * @type {number | string}
     * @memberof Fund
     */
    orderId?: number | string

    /**
     * 支付金额
     * @type {number | string}
     * @memberof Fund
     */
    paymentAmount?: number | string

    /**
     * 还款类型：1-首付款；2-剩余货款；3-服务费；4-预付款
     * @type {number | string}
     * @memberof Fund
     */
    repaymentType?: number | string

    /**
     * 服务费期数
     * @type {number | string}
     * @memberof Fund
     */
    feeRepaymentOrder?: number | string

    /**
     * 备注
     * @type {string}
     * @memberof Fund
     */
    remark?: string

    /**
     * 支付方式:1-银行转帐;2-银行承兑
     * @type {number | string}
     * @memberof Fund
     */
    paymentType?: number | string

    /**
     * 支付状态：0-待支付；1-支付待确认；2-已支付；3-支付失败；4-已取消
     * @type {number | string}
     * @memberof Fund
     */
    paymentFlag?: number | string

    /**
     * 应支付日期
     * @type {string}
     * @memberof Fund
     */
    schedulePaymentDate?: string

    /**
     * 实际支付金额
     * @type {number | string}
     * @memberof Fund
     */
    paidAmount?: number | string

    /**
     * 实际支付日期
     * @type {string}
     * @memberof Fund
     */
    paidDate?: string

    /**
     * 支付（成功/失败）时间
     * @type {string}
     * @memberof Fund
     */
    paidTime?: string

    /**
     * 付款人
     * @type {string}
     * @memberof Fund
     */
    paymentBy?: string

    /**
     * 创建人
     * @type {string}
     * @memberof Fund
     */
    createBy?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof Fund
     */
    createTime?: string

    /**
     * 更新人
     * @type {string}
     * @memberof Fund
     */
    updateBy?: string

    /**
     * 更新时间
     * @type {string}
     * @memberof Fund
     */
    updateTime?: string

    /**
     * 删除标识
     * @type {boolean}
     * @memberof Fund
     */
    deleted?: boolean

    /**
     * (应还3日前)邮件状态 1:待投递 2：已投递 3：投递失败
     * @type {number | string}
     * @memberof Fund
     */
    threeDayEmailStatus?: number | string

    /**
     * (应还当日) 1:待投递 2：已投递 3：投递失败
     * @type {number | string}
     * @memberof Fund
     */
    currDayEmailStatus?: number | string

    /**
     * 是否批量支付 0否1是
     * @type {boolean}
     * @memberof Fund
     */
    payBatch?: boolean

    /**
     * 预计应收金额
     * @type {number | string}
     * @memberof Fund
     */
    receivableAmount?: number | string

}

/**
*
* @export
* @interface FundBatchReceiptBankBillRequest
*/
export interface FundBatchReceiptBankBillRequest {

    /**
     * 账单列表
     * @type {Array<Fund>}
     * @memberof FundBatchReceiptBankBillRequest
     */
    fundList?: Array<Fund>

    /**
     * 支付凭证
     * @type {Array<AttachDoc>}
     * @memberof FundBatchReceiptBankBillRequest
     */
    attachDocList?: Array<AttachDoc>

    /**
     * 银行账户流水清单
     * @type {Array<BankBillReceiptRequest>}
     * @memberof FundBatchReceiptBankBillRequest
     */
    bankBillReceiptList?: Array<BankBillReceiptRequest>

    /**
     * 已选总金额
     * @type {number | string}
     * @memberof FundBatchReceiptBankBillRequest
     */
    totalReceiptAmount?: number | string

}

/**
*
* @export
* @interface BankClaimFundRequest
*/
export interface BankClaimFundRequest {

    /**
     * 银行收款清单id
     * @type {number | string}
     * @memberof BankClaimFundRequest
     */
    bankBillId: number | string

    /**
     * 认领明细
     * @type {Array<ClaimFundRequest>}
     * @memberof BankClaimFundRequest
     */
    claimFundRequestList: Array<ClaimFundRequest>

    /**
     * 认领人
     * @type {string}
     * @memberof BankClaimFundRequest
     */
    createBy: string

    /**
     * 认领人手机号
     * @type {string}
     * @memberof BankClaimFundRequest
     */
    createPhone: string

    /**
     * 收款银行
     * @type {string}
     * @memberof BankClaimFundRequest
     */
    receiptBankName?: string

}

/**
* 认领明细
* @export
* @interface ClaimFundRequest
*/
export interface ClaimFundRequest {

    /**
     * 账单id
     * @type {number | string}
     * @memberof ClaimFundRequest
     */
    fundId?: number | string

    /**
     * 待支付金额
     * @type {number | string}
     * @memberof ClaimFundRequest
     */
    unPaidAmount?: number | string

    /**
     * 本次认领金额
     * @type {number | string}
     * @memberof ClaimFundRequest
     */
    claimAmount?: number | string

}

/**
*
* @export
* @interface ServiceInvoiceRejectRequest
*/
export interface ServiceInvoiceRejectRequest {

    /**
     * 发票id
     * @type {number | string}
     * @memberof ServiceInvoiceRejectRequest
     */
    id: number | string

    /**
     * 驳回原因
     * @type {string}
     * @memberof ServiceInvoiceRejectRequest
     */
    rejectReason: string

}

/**
*
* @export
* @interface ServiceInvoiceOpenRequest
*/
export interface ServiceInvoiceOpenRequest {

    /**
     * 发票id
     * @type {number | string}
     * @memberof ServiceInvoiceOpenRequest
     */
    invoiceId?: number | string

    /**
     * 发票号码
     * @type {string}
     * @memberof ServiceInvoiceOpenRequest
     */
    invoiceNumber?: string

    /**
     * 快递公司
     * @type {string}
     * @memberof ServiceInvoiceOpenRequest
     */
    deliveryCompanyName?: string

    /**
     * 快递单号
     * @type {string}
     * @memberof ServiceInvoiceOpenRequest
     */
    deliveryNo?: string

}

/**
*
* @export
* @interface PrepaymentExamineFailResponse
*/
export interface PrepaymentExamineFailResponse {

    /**
     * 审核失败备注原因
     * @type {string}
     * @memberof PrepaymentExamineFailResponse
     */
    remark: string

}

/**
*
* @export
* @interface ReqExaminePass
*/
export interface ReqExaminePass {

    /**
     * 审核备注 ((备注信息： 上游出票备注：)纯文本编辑框，最多输入500个字符。)
     * @type {string}
     * @memberof ReqExaminePass
     */
    approvalRemark?: string

    /**
     * 采购单更新时间 （监测采购单）
     * @type {string}
     * @memberof ReqExaminePass
     */
    updateTime: string

}

/**
*
* @export
* @interface ReqExamineFail
*/
export interface ReqExamineFail {

    /**
     * 审核备注
     * @type {string}
     * @memberof ReqExamineFail
     */
    approvalRemark: string

    /**
     * 更新时间
     * @type {string}
     * @memberof ReqExamineFail
     */
    updateTime: string

}

/**
*
* @export
* @interface ReqPaymentOrderFundConfirm
*/
export interface ReqPaymentOrderFundConfirm {

    /**
     * 支付单id
     * @type {number | string}
     * @memberof ReqPaymentOrderFundConfirm
     */
    paymentOrderId: number | string

    /**
     * 账单Id
     * @type {number | string}
     * @memberof ReqPaymentOrderFundConfirm
     */
    fundId: number | string

}

/**
*
* @export
* @interface FundPayReceiveRequest
*/
export interface FundPayReceiveRequest {

    /**
     * 账单id
     * @type {Array<number | string>}
     * @memberof FundPayReceiveRequest
     */
    fundId: Array<number | string>

    /**
     * 收款方misCode
     * @type {string}
     * @memberof FundPayReceiveRequest
     */
    misCode?: string

    /**
     * 收款方名称
     * @type {string}
     * @memberof FundPayReceiveRequest
     */
    payeeName?: string

    /**
     * 收款银
     * @type {string}
     * @memberof FundPayReceiveRequest
     */
    payeeBankName?: string

    /**
     * 收款方银行账号
     * @type {string}
     * @memberof FundPayReceiveRequest
     */
    payeeBankAccount?: string

    /**
     * 收款方银行账号id
     * @type {number | string}
     * @memberof FundPayReceiveRequest
     */
    payeeAccountId?: number | string

}

/**
*
* @export
* @interface ServiceInvoicePageRequest
*/
export interface ServiceInvoicePageRequest {

    /**
     * 申请单号
     * @type {string}
     * @memberof ServiceInvoicePageRequest
     */
    invoiceNo?: string

    /**
     * 所属分部编码
     * @type {string}
     * @memberof ServiceInvoicePageRequest
     */
    deptCode?: string

    /**
     * 经销商
     * @type {string}
     * @memberof ServiceInvoicePageRequest
     */
    companyName?: string

    /**
     * 发票号码
     * @type {string}
     * @memberof ServiceInvoicePageRequest
     */
    invoiceNumber?: string

    /**
     * 项目名称
     * @type {string}
     * @memberof ServiceInvoicePageRequest
     */
    projectName?: string

    /**
     * 发票状态，10:申请中，20:已提交 30:已开票
     * @type {number | string}
     * @memberof ServiceInvoicePageRequest
     */
    invoiceStatus?: number | string

    /**
     * 快递单号
     * @type {string}
     * @memberof ServiceInvoicePageRequest
     */
    deliveryNo?: string

    /**
     * 发票金额
     * @type {number | string}
     * @memberof ServiceInvoicePageRequest
     */
    invoiceAmount?: number | string

    /**
     * 申请人
     * @type {string}
     * @memberof ServiceInvoicePageRequest
     */
    createBy?: string

    /**
     *
     * @type {number | string}
     * @memberof ServiceInvoicePageRequest
     */
    minInvoiceAmount?: number | string

    /**
     *
     * @type {number | string}
     * @memberof ServiceInvoicePageRequest
     */
    maxInvoiceAmount?: number | string

    /**
     * 申请时间(起始)
     * @type {string}
     * @memberof ServiceInvoicePageRequest
     */
    createTimeStart?: string

    /**
     * 申请时间(终止)
     * @type {string}
     * @memberof ServiceInvoicePageRequest
     */
    createTimeEnd?: string

}

/**
*
* @export
* @interface IPageServiceInvoicePageResponse
*/
export interface IPageServiceInvoicePageResponse {

    /**
     *
     * @type {Array<ServiceInvoicePageResponse>}
     * @memberof IPageServiceInvoicePageResponse
     */
    records: Array<ServiceInvoicePageResponse>

    /**
     *
     * @type {number | string}
     * @memberof IPageServiceInvoicePageResponse
     */
    total: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageServiceInvoicePageResponse
     */
    pages: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageServiceInvoicePageResponse
     */
    current: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageServiceInvoicePageResponse
     */
    size: number | string

}

/**
*
* @export
* @interface ServiceInvoicePageResponse
*/
export interface ServiceInvoicePageResponse {

    /**
     * 发票状态，10:申请中，20:已提交 30:已开票
     * @type {number | string}
     * @memberof ServiceInvoicePageResponse
     */
    invoiceStatus?: number | string

    /**
     * 申请单号
     * @type {string}
     * @memberof ServiceInvoicePageResponse
     */
    invoiceNo?: string

    /**
     * 项目编号
     * @type {string}
     * @memberof ServiceInvoicePageResponse
     */
    projectNo?: string

    /**
     * 项目名称
     * @type {string}
     * @memberof ServiceInvoicePageResponse
     */
    projectName?: string

    /**
     * 所属分部
     * @type {string}
     * @memberof ServiceInvoicePageResponse
     */
    deptName?: string

    /**
     * 经销商
     * @type {string}
     * @memberof ServiceInvoicePageResponse
     */
    companyName?: string

    /**
     * 申请人
     * @type {string}
     * @memberof ServiceInvoicePageResponse
     */
    createBy?: string

    /**
     * 申请时间
     * @type {string}
     * @memberof ServiceInvoicePageResponse
     */
    createTime?: string

    /**
     * 发票金额
     * @type {number | string}
     * @memberof ServiceInvoicePageResponse
     */
    invoiceAmount?: number | string

    /**
     * 发票号码
     * @type {string}
     * @memberof ServiceInvoicePageResponse
     */
    invoiceNumber?: string

    /**
     * 寄送快递单号
     * @type {string}
     * @memberof ServiceInvoicePageResponse
     */
    deliveryNo?: string

}

/**
* 发票明细
* @export
* @interface InvoiceFund
*/
export interface InvoiceFund {

    /**
     * 服务流水号
     * @type {number | string}
     * @memberof InvoiceFund
     */
    billId?: number | string

    /**
     * 支付单号
     * @type {string}
     * @memberof InvoiceFund
     */
    paymentOrderNo?: string

    /**
     * 期数
     * @type {number | string}
     * @memberof InvoiceFund
     */
    qishu?: number | string

    /**
     * 金额
     * @type {number | string}
     * @memberof InvoiceFund
     */
    amount?: number | string

    /**
     * 支付成功时间
     * @type {string}
     * @memberof InvoiceFund
     */
    paySuccessTime?: string

}

/**
* 操作信息
* @export
* @interface OperationLog
*/
export interface OperationLog {

    /**
     * 资源id
     * @type {number | string}
     * @memberof OperationLog
     */
    resourceId?: number | string

    /**
     * 资源类型 1 服务费发票 2 设备发票
     * @type {number | string}
     * @memberof OperationLog
     */
    resourceType?: number | string

    /**
     * 操作人
     * @type {string}
     * @memberof OperationLog
     */
    operator?: string

    /**
     * 操作类型 1 申请 2 提交 3 驳回 4 开票
     * @type {number | string}
     * @memberof OperationLog
     */
    operationType?: number | string

    /**
     * 操作描述
     * @type {string}
     * @memberof OperationLog
     */
    operationDesc?: string

    /**
     * 备注
     * @type {string}
     * @memberof OperationLog
     */
    note?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof OperationLog
     */
    createTime?: string

}

/**
*
* @export
* @interface ServiceInvoiceDetailResponse
*/
export interface ServiceInvoiceDetailResponse {

    /**
     * 发票id
     * @type {number | string}
     * @memberof ServiceInvoiceDetailResponse
     */
    invoiceId: number | string

    /**
     * 项目id
     * @type {number | string}
     * @memberof ServiceInvoiceDetailResponse
     */
    projectId: number | string

    /**
     * 项目名称
     * @type {string}
     * @memberof ServiceInvoiceDetailResponse
     */
    projectName: string

    /**
     * 所属分部
     * @type {string}
     * @memberof ServiceInvoiceDetailResponse
     */
    deptName: string

    /**
     * 发票金额
     * @type {number | string}
     * @memberof ServiceInvoiceDetailResponse
     */
    invoiceAmount: number | string

    /**
     * 收票人
     * @type {string}
     * @memberof ServiceInvoiceDetailResponse
     */
    receiver: string

    /**
     * 收票人手机
     * @type {string}
     * @memberof ServiceInvoiceDetailResponse
     */
    receiverMobile: string

    /**
     * 收票地址
     * @type {string}
     * @memberof ServiceInvoiceDetailResponse
     */
    receiverAddress: string

    /**
     * 申请单号
     * @type {string}
     * @memberof ServiceInvoiceDetailResponse
     */
    invoiceNo: string

    /**
     * 寄送快递单号
     * @type {string}
     * @memberof ServiceInvoiceDetailResponse
     */
    deliveryNo: string

    /**
     * 经销商
     * @type {string}
     * @memberof ServiceInvoiceDetailResponse
     */
    companyName: string

    /**
     * 备注
     * @type {string}
     * @memberof ServiceInvoiceDetailResponse
     */
    remark: string

    /**
     * 开票日期
     * @type {string}
     * @memberof ServiceInvoiceDetailResponse
     */
    openTime: string

    /**
     * 发票明细
     * @type {Array<InvoiceFund>}
     * @memberof ServiceInvoiceDetailResponse
     */
    resourceList: Array<InvoiceFund>

    /**
     * 操作信息
     * @type {Array<OperationLog>}
     * @memberof ServiceInvoiceDetailResponse
     */
    logs: Array<OperationLog>

}

/**
* 支付凭证
* @export
* @interface Download
*/
export interface Download {

    /**
     *
     * @type {string}
     * @memberof Download
     */
    name?: string

    /**
     *
     * @type {string}
     * @memberof Download
     */
    url?: string

}

/**
*
* @export
* @interface RespSupplierPayment
*/
export interface RespSupplierPayment {

    /**
     * 本次上游支付金额
     * @type {number | string}
     * @memberof RespSupplierPayment
     */
    paidAmount: number | string

    /**
     * 支付凭证
     * @type {Array<Download>}
     * @memberof RespSupplierPayment
     */
    picList: Array<Download>

    /**
     * 支付时间
     * @type {string}
     * @memberof RespSupplierPayment
     */
    paidTime: string

    /**
     * 支付凭证上传时间
     * @type {string}
     * @memberof RespSupplierPayment
     */
    createTime: string

}

/**
*
* @export
* @interface RespSupplier
*/
export interface RespSupplier {

    /**
     * 上游支付方式:1-银行转帐;2-银行承兑
     * @type {number | string}
     * @memberof RespSupplier
     */
    supplierPaymentType: number | string

    /**
     * 上游货款方式 1.先款后货 2.先货后款
     * @type {number | string}
     * @memberof RespSupplier
     */
    supplierPaymentMethod: number | string

    /**
     * 应支付金额
     * @type {number | string}
     * @memberof RespSupplier
     */
    totalAmount: number | string

    /**
     * 已支付金额
     * @type {number | string}
     * @memberof RespSupplier
     */
    paidAmount: number | string

    /**
     * 是否展示上游支付按钮
     * @type {boolean}
     * @memberof RespSupplier
     */
    showButton: boolean

    /**
     * 支付明细
     * @type {Array<RespSupplierDetail>}
     * @memberof RespSupplier
     */
    supplierDetails: Array<RespSupplierDetail>

    /**
     * 进度
     * @type {number | string}
     * @memberof RespSupplier
     */
    progress: number | string

    /**
     * 司库上游支付
     * @type {boolean}
     * @memberof RespSupplier
     */
    showSaasButton: boolean

}

/**
* 支付明细
* @export
* @interface RespSupplierDetail
*/
export interface RespSupplierDetail {

    /**
     *
     * @type {number | string}
     * @memberof RespSupplierDetail
     */
    id: number | string

    /**
     * 支付金额
     * @type {number | string}
     * @memberof RespSupplierDetail
     */
    payAmount: number | string

    /**
     * 支付日期
     * @type {string}
     * @memberof RespSupplierDetail
     */
    payDate: string

    /**
     * 创建时间
     * @type {string}
     * @memberof RespSupplierDetail
     */
    createTime: string

    /**
     * 创建人
     * @type {string}
     * @memberof RespSupplierDetail
     */
    createBy: string

    /**
     * 创建人账号
     * @type {string}
     * @memberof RespSupplierDetail
     */
    createPhone: string

    /**
     * 支付凭证
     * @type {Array<PayVoucher>}
     * @memberof RespSupplierDetail
     */
    payVouchers: Array<PayVoucher>

    /**
     * 1:支付单，2:上游预付款订单
     * @type {number | string}
     * @memberof RespSupplierDetail
     */
    orderType: number | string

}

/**
*
* @export
* @interface RespSupplierInfo
*/
export interface RespSupplierInfo {

    /**
     * 项目名称
     * @type {string}
     * @memberof RespSupplierInfo
     */
    projectName: string

    /**
     * 经销商名称
     * @type {string}
     * @memberof RespSupplierInfo
     */
    companyName: string

    /**
     * 所属分部名称
     * @type {string}
     * @memberof RespSupplierInfo
     */
    deptName: string

    /**
     * 应支付金额
     * @type {number | string}
     * @memberof RespSupplierInfo
     */
    totalAmount: number | string

    /**
     * 剩余应支付金额
     * @type {number | string}
     * @memberof RespSupplierInfo
     */
    surplusAmount: number | string

    /**
     * 已支付金额
     * @type {number | string}
     * @memberof RespSupplierInfo
     */
    paidAmount: number | string

    /**
     * 上游供应商名称
     * @type {string}
     * @memberof RespSupplierInfo
     */
    supplierCompanyName: string

    /**
     * 上游支付方式:1-银行转帐;2-银行承兑
     * @type {number | string}
     * @memberof RespSupplierInfo
     */
    supplierPaymentType: number | string

    /**
     * 上游货款方式 1.先款后货 2.先货后款
     * @type {number | string}
     * @memberof RespSupplierInfo
     */
    supplierPaymentMethod: number | string

    /**
     * 收货进度
     * @type {number | string}
     * @memberof RespSupplierInfo
     */
    goodsProgress: number | string

    /**
     *
     * @type {JsonNode}
     * @memberof RespSupplierInfo
     */
    poDetail: JsonNode

    /**
     *
     * @type {JsonNode}
     * @memberof RespSupplierInfo
     */
    paymentDetail: JsonNode

    /**
     * 采购单id
     * @type {number | string}
     * @memberof RespSupplierInfo
     */
    purchaseOrderId: number | string

}

/**
*
* @export
* @interface RespLoanHandoverInfo
*/
export interface RespLoanHandoverInfo {

    /**
     * 项目id
     * @type {number | string}
     * @memberof RespLoanHandoverInfo
     */
    projectId: number | string

    /**
     * 项目名称
     * @type {string}
     * @memberof RespLoanHandoverInfo
     */
    projectName: string

    /**
     * 经销商
     * @type {string}
     * @memberof RespLoanHandoverInfo
     */
    companyName: string

    /**
     * 上游供应商【收款人名称】
     * @type {string}
     * @memberof RespLoanHandoverInfo
     */
    supplierCompanyName: string

    /**
     * 所属分部
     * @type {string}
     * @memberof RespLoanHandoverInfo
     */
    deptName: string

    /**
     * 采购单金额
     * @type {number | string}
     * @memberof RespLoanHandoverInfo
     */
    poAmount: number | string

    /**
     * 剩余应支付金额
     * @type {number | string}
     * @memberof RespLoanHandoverInfo
     */
    noPayAmount: number | string

    /**
     * 支付单金额
     * @type {number | string}
     * @memberof RespLoanHandoverInfo
     */
    applyAmount: number | string

    /**
     * 上游支付方式 1-银行转帐;2-银行承兑
     * @type {number | string}
     * @memberof RespLoanHandoverInfo
     */
    supplierPaymentType: number | string

    /**
     * 首付款比例
     * @type {number | string}
     * @memberof RespLoanHandoverInfo
     */
    prePercent: number | string

    /**
     * 剩余货款支付周期
     * @type {number | string}
     * @memberof RespLoanHandoverInfo
     */
    restPaymentPeriod: number | string

    /**
     * 申请人
     * @type {string}
     * @memberof RespLoanHandoverInfo
     */
    applyBy: string

    /**
     * 申请时间
     * @type {string}
     * @memberof RespLoanHandoverInfo
     */
    createTime: string

    /**
     * 供应商开户行名称
     * @type {string}
     * @memberof RespLoanHandoverInfo
     */
    supplierAccountName: string

    /**
     * 银行联行号
     * @type {string}
     * @memberof RespLoanHandoverInfo
     */
    supplierBankNo: string

    /**
     * 供应商银行账号
     * @type {string}
     * @memberof RespLoanHandoverInfo
     */
    supplierAccountNo: string

    /**
     * 期望上游支付日期
     * @type {string}
     * @memberof RespLoanHandoverInfo
     */
    expectSupplierPaymentDate: string

    /**
     * 备注说明【特殊说明】
     * @type {string}
     * @memberof RespLoanHandoverInfo
     */
    specialRemark: string

    /**
     * 上游支付状态 1：待支付 2：部分支付
     * @type {number | string}
     * @memberof RespLoanHandoverInfo
     */
    paymentStatus: number | string

    /**
     * 放款交接确认信息
     * @type {Array<RespUpPaymentLoanHandover>}
     * @memberof RespLoanHandoverInfo
     */
    upPaymentLoanHandoverList: Array<RespUpPaymentLoanHandover>

}

/**
* 放款交接确认信息
* @export
* @interface RespUpPaymentLoanHandover
*/
export interface RespUpPaymentLoanHandover {

    /**
     * 放款交接id
     * @type {number | string}
     * @memberof RespUpPaymentLoanHandover
     */
    id?: number | string

    /**
     * 支付单id
     * @type {number | string}
     * @memberof RespUpPaymentLoanHandover
     */
    paymentOrderId?: number | string

    /**
     * 岗位 1：业财风控岗 2：资金部放款审核岗 3：资金部放款操作岗
     * @type {number | string}
     * @memberof RespUpPaymentLoanHandover
     */
    positionType?: number | string

    /**
     * 备注
     * @type {string}
     * @memberof RespUpPaymentLoanHandover
     */
    remark?: string

    /**
     * 确认状态 0：待确认 1：已确认
     * @type {number | string}
     * @memberof RespUpPaymentLoanHandover
     */
    status?: number | string

    /**
     * 确认人
     * @type {string}
     * @memberof RespUpPaymentLoanHandover
     */
    confirmBy?: string

    /**
     * 确认日期
     * @type {string}
     * @memberof RespUpPaymentLoanHandover
     */
    confirmTime?: string

    /**
     * 放款交接属性字段
     * @type {Array<RespUpPaymentLoanHandoverParam>}
     * @memberof RespUpPaymentLoanHandover
     */
    upPaymentLoanHandoverParamList?: Array<RespUpPaymentLoanHandoverParam>

}

/**
* 放款交接属性字段
* @export
* @interface RespUpPaymentLoanHandoverParam
*/
export interface RespUpPaymentLoanHandoverParam {

    /**
     * 主键id
     * @type {number | string}
     * @memberof RespUpPaymentLoanHandoverParam
     */
    id?: number | string

    /**
     * 属性key
     * @type {string}
     * @memberof RespUpPaymentLoanHandoverParam
     */
    paramKey?: string

    /**
     * 属性值
     * @type {string}
     * @memberof RespUpPaymentLoanHandoverParam
     */
    paramValue?: string

    /**
     * 属性描述
     * @type {string}
     * @memberof RespUpPaymentLoanHandoverParam
     */
    paramDescription?: string

    /**
     * 属性所属组 1：业财风控确认 2：资金部放款审核岗确认 3：资金部放款操作岗确认
     * @type {number | string}
     * @memberof RespUpPaymentLoanHandoverParam
     */
    paramGroup?: number | string

    /**
     * 备注
     * @type {string}
     * @memberof RespUpPaymentLoanHandoverParam
     */
    remark?: string

}

/**
*
* @export
* @interface ReqUpStreamPaymentQuery
*/
export interface ReqUpStreamPaymentQuery {

    /**
     * 页码
     * @type {number | string}
     * @memberof ReqUpStreamPaymentQuery
     */
    pageNumber?: number | string

    /**
     * 每页大小
     * @type {number | string}
     * @memberof ReqUpStreamPaymentQuery
     */
    pageSize?: number | string

    /**
     *
     * @type {Sort}
     * @memberof ReqUpStreamPaymentQuery
     */
    sort?: Sort

    /**
     * 支付单编号
     * @type {string}
     * @memberof ReqUpStreamPaymentQuery
     */
    paymentOrderNo?: string

    /**
     * 所属分部
     * @type {string}
     * @memberof ReqUpStreamPaymentQuery
     */
    deptName?: string

    /**
     * 经销商
     * @type {string}
     * @memberof ReqUpStreamPaymentQuery
     */
    companyName?: string

    /**
     * 上游支付方式
     * @type {number | string}
     * @memberof ReqUpStreamPaymentQuery
     */
    supplierPaymentType?: number | string

    /**
     * 上游供应商
     * @type {string}
     * @memberof ReqUpStreamPaymentQuery
     */
    supplierCompanyName?: string

    /**
     * 项目名称
     * @type {string}
     * @memberof ReqUpStreamPaymentQuery
     */
    projectName?: string

    /**
     * 支付状态 1：待支付 2：部分支付
     * @type {number | string}
     * @memberof ReqUpStreamPaymentQuery
     */
    paymentStatus?: number | string

    /**
     * 剩余应支付金额起始金额
     * @type {number | string}
     * @memberof ReqUpStreamPaymentQuery
     */
    startNoPayAmount?: number | string

    /**
     * 剩余应支付金额结束金额
     * @type {number | string}
     * @memberof ReqUpStreamPaymentQuery
     */
    endNoPayAmount?: number | string

    /**
     * 首付款确认时间起始时间
     * @type {string}
     * @memberof ReqUpStreamPaymentQuery
     */
    startDownPaymentConfirmTime?: string

    /**
     * 首付款确认时间结束时间
     * @type {string}
     * @memberof ReqUpStreamPaymentQuery
     */
    endDownPaymentConfirmTime?: string

    /**
     * 期望上游支付日期起始日期
     * @type {string}
     * @memberof ReqUpStreamPaymentQuery
     */
    startExpectSupplierPaymentDate?: string

    /**
     * 期望上游支付日期结束日期
     * @type {string}
     * @memberof ReqUpStreamPaymentQuery
     */
    endExpectSupplierPaymentDate?: string

    /**
     * 放款交接状态 1：:待对接 2：已对接
     * @type {number | string}
     * @memberof ReqUpStreamPaymentQuery
     */
    loanTransferStatus?: number | string

    /**
     * 菜单code
     * @type {string}
     * @memberof ReqUpStreamPaymentQuery
     */
    authCode?: string

    /**
     * 工号
     * @type {string}
     * @memberof ReqUpStreamPaymentQuery
     */
    jobNumber?: string

    /**
     * 分部code
     * @type {string}
     * @memberof ReqUpStreamPaymentQuery
     */
    subsectionCode?: string

    /**
     * 运营确认时间起始时间
     * @type {string}
     * @memberof ReqUpStreamPaymentQuery
     */
    startInitiateTime?: string

    /**
     * 运营确认时间结束时间
     * @type {string}
     * @memberof ReqUpStreamPaymentQuery
     */
    endInitiateTime?: string

    /**
     * 付款主体
     * @type {string}
     * @memberof ReqUpStreamPaymentQuery
     */
    paymentMain?: string

}

/**
* 排序规则
* @export
* @interface Sort
*/
export interface Sort {

    /**
     * 排序属性
     * @type {string}
     * @memberof Sort
     */
    property?: string

    /**
     * 升序ASC, 降序DESC, 注意大写,排序必填
     * @type {string}
     * @memberof Sort
     */
    direction?: string

}

/**
*
* @export
* @interface IPageRespUpStreamPayment
*/
export interface IPageRespUpStreamPayment {

    /**
     *
     * @type {Array<RespUpStreamPayment>}
     * @memberof IPageRespUpStreamPayment
     */
    records: Array<RespUpStreamPayment>

    /**
     *
     * @type {number | string}
     * @memberof IPageRespUpStreamPayment
     */
    total: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageRespUpStreamPayment
     */
    pages: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageRespUpStreamPayment
     */
    current: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageRespUpStreamPayment
     */
    size: number | string

}

/**
*
* @export
* @interface RespUpStreamPayment
*/
export interface RespUpStreamPayment {

    /**
     * 支付单id
     * @type {number | string}
     * @memberof RespUpStreamPayment
     */
    paymentOrderId?: number | string

    /**
     * 支付单编号
     * @type {string}
     * @memberof RespUpStreamPayment
     */
    paymentOrderNo?: string

    /**
     * 所属分部
     * @type {string}
     * @memberof RespUpStreamPayment
     */
    deptName?: string

    /**
     * 经销商
     * @type {string}
     * @memberof RespUpStreamPayment
     */
    companyName?: string

    /**
     * 上游供应商
     * @type {string}
     * @memberof RespUpStreamPayment
     */
    supplierCompanyName?: string

    /**
     * 项目名称
     * @type {string}
     * @memberof RespUpStreamPayment
     */
    projectName?: string

    /**
     * 采购单金额
     * @type {number | string}
     * @memberof RespUpStreamPayment
     */
    poAmount?: number | string

    /**
     * 上游支付状态 1：待支付 2：部分支付
     * @type {number | string}
     * @memberof RespUpStreamPayment
     */
    paymentStatus?: number | string

    /**
     * 支付次数
     * @type {number | string}
     * @memberof RespUpStreamPayment
     */
    paymentNumber?: number | string

    /**
     * 已支付金额
     * @type {number | string}
     * @memberof RespUpStreamPayment
     */
    paidAmount?: number | string

    /**
     * 应支付总额
     * @type {number | string}
     * @memberof RespUpStreamPayment
     */
    totalAmount?: number | string

    /**
     * 剩余应支付金额
     * @type {number | string}
     * @memberof RespUpStreamPayment
     */
    noPayAmount?: number | string

    /**
     * 首付款确认时间
     * @type {string}
     * @memberof RespUpStreamPayment
     */
    downPaymentConfirmTime?: string

    /**
     * 运营确认时间
     * @type {string}
     * @memberof RespUpStreamPayment
     */
    initiateTime?: string

    /**
     * 期望上游支付日期
     * @type {string}
     * @memberof RespUpStreamPayment
     */
    expectSupplierPaymentDate?: string

    /**
     * 上游支付方式 1-银行转帐;2-银行承兑
     * @type {number | string}
     * @memberof RespUpStreamPayment
     */
    supplierPaymentType?: number | string

    /**
     * 放款交接状态 1：:待对接 2：已对接
     * @type {number | string}
     * @memberof RespUpStreamPayment
     */
    loanTransferStatus?: number | string

    /**
     * 放款交接日期
     * @type {string}
     * @memberof RespUpStreamPayment
     */
    loanTransferDate?: string

    /**
     * 放款交接id
     * @type {number | string}
     * @memberof RespUpStreamPayment
     */
    loanTransferId?: number | string

    /**
     * 是否展示变更放款交接按钮
     * @type {boolean}
     * @memberof RespUpStreamPayment
     */
    showChangeButton?: boolean

    /**
     * 首付款账单id
     * @type {number | string}
     * @memberof RespUpStreamPayment
     */
    downPaymentFundId?: number | string

    /**
     * 支付单状态 0-待项目运营审核;1-首付款待支付;2-首付款待确认;3-上游支付确认中;4-上游支付中;5--待出票;6-正在出票;7-待发货;8-待收货;9-尾款待支付;10-尾款待确认;11-支付单完成;12-支付单关闭;14-待分财审核;15-支付单审核中
     * @type {number | string}
     * @memberof RespUpStreamPayment
     */
    status?: number | string

    /**
     * 银行转账网银支付id
     * @type {number | string}
     * @memberof RespUpStreamPayment
     */
    supplierOnlineBankTransferId?: number | string

    /**
     * 网银支付按钮展示
     * @type {boolean}
     * @memberof RespUpStreamPayment
     */
    showOnlineBank?: boolean

    /**
     * 付款主体
     * @type {string}
     * @memberof RespUpStreamPayment
     */
    paymentMain?: string

}

/**
*
* @export
* @interface SaasTradeQueryResponse
*/
export interface SaasTradeQueryResponse {

    /**
     *
     * @type {number | string}
     * @memberof SaasTradeQueryResponse
     */
    billStatus?: number | string

    /**
     *
     * @type {string}
     * @memberof SaasTradeQueryResponse
     */
    failureReason?: string

    /**
     *
     * @type {string}
     * @memberof SaasTradeQueryResponse
     */
    payAccountName?: string

    /**
     *
     * @type {string}
     * @memberof SaasTradeQueryResponse
     */
    payAccountNo?: string

    /**
     *
     * @type {string}
     * @memberof SaasTradeQueryResponse
     */
    payAccountBank?: string

    /**
     *
     * @type {string}
     * @memberof SaasTradeQueryResponse
     */
    payBankType?: string

    /**
     *
     * @type {string}
     * @memberof SaasTradeQueryResponse
     */
    payBankCnaps?: string

    /**
     *
     * @type {number | string}
     * @memberof SaasTradeQueryResponse
     */
    payAmount?: number | string

    /**
     *
     * @type {string}
     * @memberof SaasTradeQueryResponse
     */
    payTime?: string

    /**
     *
     * @type {string}
     * @memberof SaasTradeQueryResponse
     */
    supplierAccountName?: string

    /**
     *
     * @type {string}
     * @memberof SaasTradeQueryResponse
     */
    supplierAccountNo?: string

    /**
     *
     * @type {string}
     * @memberof SaasTradeQueryResponse
     */
    supplierAccountBank?: string

    /**
     *
     * @type {string}
     * @memberof SaasTradeQueryResponse
     */
    supplierBankType?: string

    /**
     *
     * @type {string}
     * @memberof SaasTradeQueryResponse
     */
    supplierBankCnaps?: string

    /**
     *
     * @type {string}
     * @memberof SaasTradeQueryResponse
     */
    remark?: string

}

/**
*
* @export
* @interface SupplierAccountPageRequest
*/
export interface SupplierAccountPageRequest {

    /**
     * 页码
     * @type {number | string}
     * @memberof SupplierAccountPageRequest
     */
    pageNumber?: number | string

    /**
     * 每页大小
     * @type {number | string}
     * @memberof SupplierAccountPageRequest
     */
    pageSize?: number | string

    /**
     *
     * @type {Sort}
     * @memberof SupplierAccountPageRequest
     */
    sort?: Sort

    /**
     * 供应商名称
     * @type {string}
     * @memberof SupplierAccountPageRequest
     */
    supplierName?: string

    /**
     * 创建人
     * @type {string}
     * @memberof SupplierAccountPageRequest
     */
    createBy?: string

    /**
     * 查询开始日期
     * @type {string}
     * @memberof SupplierAccountPageRequest
     */
    startTime?: string

    /**
     * 查询结束日期
     * @type {string}
     * @memberof SupplierAccountPageRequest
     */
    endTime?: string

}

/**
*
* @export
* @interface IPageSupplierAccountResponse
*/
export interface IPageSupplierAccountResponse {

    /**
     *
     * @type {Array<SupplierAccountResponse>}
     * @memberof IPageSupplierAccountResponse
     */
    records: Array<SupplierAccountResponse>

    /**
     *
     * @type {number | string}
     * @memberof IPageSupplierAccountResponse
     */
    total: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageSupplierAccountResponse
     */
    pages: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageSupplierAccountResponse
     */
    current: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageSupplierAccountResponse
     */
    size: number | string

}

/**
*
* @export
* @interface SupplierAccountResponse
*/
export interface SupplierAccountResponse {

    /**
     * id
     * @type {number | string}
     * @memberof SupplierAccountResponse
     */
    id?: number | string

    /**
     * 供应商编号【MIS返回的编号】
     * @type {string}
     * @memberof SupplierAccountResponse
     */
    supplierCode?: string

    /**
     * 供应商名称
     * @type {string}
     * @memberof SupplierAccountResponse
     */
    supplierName?: string

    /**
     * 供应商简称
     * @type {string}
     * @memberof SupplierAccountResponse
     */
    supplierShortName?: string

    /**
     * 供应商开户行名称
     * @type {string}
     * @memberof SupplierAccountResponse
     */
    supplierAccountName?: string

    /**
     * 供应商银行账号
     * @type {string}
     * @memberof SupplierAccountResponse
     */
    supplierAccountNo?: string

    /**
     * 银行联行行号
     * @type {string}
     * @memberof SupplierAccountResponse
     */
    supplierBankNo?: string

    /**
     * 创建人
     * @type {string}
     * @memberof SupplierAccountResponse
     */
    createBy?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof SupplierAccountResponse
     */
    createTime?: string

}

/**
*
* @export
* @interface SupplierResponse
*/
export interface SupplierResponse {

    /**
     * 供应商开户行名称
     * @type {Array<string>}
     * @memberof SupplierResponse
     */
    supplierAccountName: Array<string>

    /**
     * 供应商银行账号
     * @type {Array<string>}
     * @memberof SupplierResponse
     */
    supplierAccountNo: Array<string>

    /**
     * 银行联行行号
     * @type {Array<string>}
     * @memberof SupplierResponse
     */
    supplierBankNo: Array<string>

}

/**
* 变更后合同附件
* @export
* @interface ContractPic
*/
export interface ContractPic {

    /**
     * 主键id
     * @type {number | string}
     * @memberof ContractPic
     */
    id: number | string

    /**
     * 合同id
     * @type {number | string}
     * @memberof ContractPic
     */
    contractId: number | string

    /**
     * 图片名称
     * @type {string}
     * @memberof ContractPic
     */
    picName: string

    /**
     * 图片链接
     * @type {string}
     * @memberof ContractPic
     */
    picUrl: string

    /**
     * 创建时间
     * @type {string}
     * @memberof ContractPic
     */
    createTime: string

    /**
     * 创建人
     * @type {string}
     * @memberof ContractPic
     */
    createBy: string

    /**
     * 是否删除 0：是 1：否
     * @type {number | string}
     * @memberof ContractPic
     */
    deleted: number | string

}

/**
*
* @export
* @interface RespPurchaseDetailDing
*/
export interface RespPurchaseDetailDing {

    /**
     * 采购单钉钉展示类型 1：提交 2：变更
     * @type {number | string}
     * @memberof RespPurchaseDetailDing
     */
    purchaseOrderDingType: number | string

    /**
     *
     * @type {RespPurchaseDetailDingSubmit}
     * @memberof RespPurchaseDetailDing
     */
    respPurchaseDetailDingSubmit: RespPurchaseDetailDingSubmit

    /**
     *
     * @type {RespPurchaseDetailDingChange}
     * @memberof RespPurchaseDetailDing
     */
    respPurchaseDetailDingChange: RespPurchaseDetailDingChange

}

/**
* 变更确认信息展示【采购明细表与合同信息】
* @export
* @interface RespPurchaseDetailDingChange
*/
export interface RespPurchaseDetailDingChange {

    /**
     * 变更前采购明细
     * @type {string}
     * @memberof RespPurchaseDetailDingChange
     */
    originalPoDetail?: string

    /**
     * 变更后采购明细
     * @type {string}
     * @memberof RespPurchaseDetailDingChange
     */
    changePoDetail?: string

    /**
     * 销售合同信息
     * @type {Array<RespPurchaseOrderContractDingChange>}
     * @memberof RespPurchaseDetailDingChange
     */
    saleContractDingList?: Array<RespPurchaseOrderContractDingChange>

    /**
     * 变更前销售合同份数
     * @type {number | string}
     * @memberof RespPurchaseDetailDingChange
     */
    originalSaleContractNumber?: number | string

    /**
     * 变更后销售合同份数
     * @type {number | string}
     * @memberof RespPurchaseDetailDingChange
     */
    changeSaleContractNumber?: number | string

    /**
     * 采购合同信息
     * @type {Array<RespPurchaseOrderContractDingChange>}
     * @memberof RespPurchaseDetailDingChange
     */
    purchaseContractDingList?: Array<RespPurchaseOrderContractDingChange>

    /**
     * 变更前采购合同份数
     * @type {number | string}
     * @memberof RespPurchaseDetailDingChange
     */
    originalPurchaseContractNumber?: number | string

    /**
     * 变更后采购合同份数
     * @type {number | string}
     * @memberof RespPurchaseDetailDingChange
     */
    changePurchaseContractNumber?: number | string

    /**
     * 应收账款质押合同信息
     * @type {Array<RespPurchaseOrderContractDingChange>}
     * @memberof RespPurchaseDetailDingChange
     */
    pledgeContractDingList?: Array<RespPurchaseOrderContractDingChange>

    /**
     * 变更前应收账款质押合同份数
     * @type {number | string}
     * @memberof RespPurchaseDetailDingChange
     */
    originalPledgeContractNumber?: number | string

    /**
     * 变更后应收账款质押合同份数
     * @type {number | string}
     * @memberof RespPurchaseDetailDingChange
     */
    changePledgeContractNumber?: number | string

    /**
     * 担保合同信息
     * @type {Array<RespPurchaseOrderContractDingChange>}
     * @memberof RespPurchaseDetailDingChange
     */
    guaranteeContractDingList?: Array<RespPurchaseOrderContractDingChange>

    /**
     * 变更前担保合同份数
     * @type {number | string}
     * @memberof RespPurchaseDetailDingChange
     */
    originalGuaranteeContractNumber?: number | string

    /**
     * 变更后担保合同份数
     * @type {number | string}
     * @memberof RespPurchaseDetailDingChange
     */
    changeGuaranteeContractNumber?: number | string

    /**
     * 其它合同信息
     * @type {Array<RespPurchaseOrderContractDingChange>}
     * @memberof RespPurchaseDetailDingChange
     */
    otherContractDingList?: Array<RespPurchaseOrderContractDingChange>

    /**
     * 变更前其它合同份数
     * @type {number | string}
     * @memberof RespPurchaseDetailDingChange
     */
    originalOtherContractNumber?: number | string

    /**
     * 变更后其它合同份数
     * @type {number | string}
     * @memberof RespPurchaseDetailDingChange
     */
    changeOtherContractNumber?: number | string

}

/**
* 初次提交信息展示【采购明细表与合同信息】
* @export
* @interface RespPurchaseDetailDingSubmit
*/
export interface RespPurchaseDetailDingSubmit {

    /**
     *
     * @type {JsonNode}
     * @memberof RespPurchaseDetailDingSubmit
     */
    poDetail?: JsonNode

    /**
     * 销售合同信息
     * @type {Array<RespPurchaseOrderContractDingSubmit>}
     * @memberof RespPurchaseDetailDingSubmit
     */
    saleContractDingList?: Array<RespPurchaseOrderContractDingSubmit>

    /**
     * 销售合同份数
     * @type {number | string}
     * @memberof RespPurchaseDetailDingSubmit
     */
    saleContractNumber?: number | string

    /**
     * 采购合同信息
     * @type {Array<RespPurchaseOrderContractDingSubmit>}
     * @memberof RespPurchaseDetailDingSubmit
     */
    purchaseContractDingList?: Array<RespPurchaseOrderContractDingSubmit>

    /**
     * 采购合同份数
     * @type {number | string}
     * @memberof RespPurchaseDetailDingSubmit
     */
    purchaseContractNumber?: number | string

    /**
     * 应收账款质押合同信息
     * @type {Array<RespPurchaseOrderContractDingSubmit>}
     * @memberof RespPurchaseDetailDingSubmit
     */
    pledgeContractDingList?: Array<RespPurchaseOrderContractDingSubmit>

    /**
     * 应收账款质押合同份数
     * @type {number | string}
     * @memberof RespPurchaseDetailDingSubmit
     */
    pledgeContractNumber?: number | string

    /**
     * 担保合同信息
     * @type {Array<RespPurchaseOrderContractDingSubmit>}
     * @memberof RespPurchaseDetailDingSubmit
     */
    guaranteeContractDingList?: Array<RespPurchaseOrderContractDingSubmit>

    /**
     * 担保合同份数
     * @type {number | string}
     * @memberof RespPurchaseDetailDingSubmit
     */
    guaranteeContractNumber?: number | string

    /**
     * 其它合同信息
     * @type {Array<RespPurchaseOrderContractDingSubmit>}
     * @memberof RespPurchaseDetailDingSubmit
     */
    otherContractDingList?: Array<RespPurchaseOrderContractDingSubmit>

    /**
     * 其它合同份数
     * @type {number | string}
     * @memberof RespPurchaseDetailDingSubmit
     */
    otherContractNumber?: number | string

}

/**
* 其它合同信息
* @export
* @interface RespPurchaseOrderContractDingChange
*/
export interface RespPurchaseOrderContractDingChange {

    /**
     * 变更前合同名称
     * @type {string}
     * @memberof RespPurchaseOrderContractDingChange
     */
    originalContractName?: string

    /**
     * 变更前合同id
     * @type {number | string}
     * @memberof RespPurchaseOrderContractDingChange
     */
    originalContractId?: number | string

    /**
     * 变更前合同内容
     * @type {string}
     * @memberof RespPurchaseOrderContractDingChange
     */
    originalContractContent?: string

    /**
     * 变更前是否是有模板合同线下签署
     * @type {boolean}
     * @memberof RespPurchaseOrderContractDingChange
     */
    originalTemplateDownSign?: boolean

    /**
     * 变更前是否是电子签署【线上签署】
     * @type {boolean}
     * @memberof RespPurchaseOrderContractDingChange
     */
    originalOnlineSign?: boolean

    /**
     * 变更前合同附件
     * @type {Array<ContractPic>}
     * @memberof RespPurchaseOrderContractDingChange
     */
    originalContractPicList?: Array<ContractPic>

    /**
     * 变更后合同名称
     * @type {string}
     * @memberof RespPurchaseOrderContractDingChange
     */
    changeContractName?: string

    /**
     * 变更后合同id
     * @type {number | string}
     * @memberof RespPurchaseOrderContractDingChange
     */
    changeContractId?: number | string

    /**
     * 变更后合同内容
     * @type {string}
     * @memberof RespPurchaseOrderContractDingChange
     */
    changeContractContent?: string

    /**
     * 变更后是否是有模板合同线下签署
     * @type {boolean}
     * @memberof RespPurchaseOrderContractDingChange
     */
    changeTemplateDownSign?: boolean

    /**
     * 变更后是否是电子签署【线上签署】
     * @type {boolean}
     * @memberof RespPurchaseOrderContractDingChange
     */
    changeOnlineSign?: boolean

    /**
     * 变更后合同附件
     * @type {Array<ContractPic>}
     * @memberof RespPurchaseOrderContractDingChange
     */
    changeContractPicList?: Array<ContractPic>

}

/**
* 其它合同信息
* @export
* @interface RespPurchaseOrderContractDingSubmit
*/
export interface RespPurchaseOrderContractDingSubmit {

    /**
     * 合同名称
     * @type {string}
     * @memberof RespPurchaseOrderContractDingSubmit
     */
    contractName?: string

    /**
     * 合同id
     * @type {number | string}
     * @memberof RespPurchaseOrderContractDingSubmit
     */
    contractId?: number | string

    /**
     * 合同内容
     * @type {string}
     * @memberof RespPurchaseOrderContractDingSubmit
     */
    contractContent?: string

    /**
     * 是否是有模板合同线下签署
     * @type {boolean}
     * @memberof RespPurchaseOrderContractDingSubmit
     */
    templateDownSign?: boolean

    /**
     * 是否是电子签署【线上签署】
     * @type {boolean}
     * @memberof RespPurchaseOrderContractDingSubmit
     */
    onlineSign?: boolean

    /**
     * 合同附件
     * @type {Array<ContractPic>}
     * @memberof RespPurchaseOrderContractDingSubmit
     */
    contractPicList?: Array<ContractPic>

}

/**
*
* @export
* @interface RespCrmPurchaseOrderDetail
*/
export interface RespCrmPurchaseOrderDetail {

    /**
     * 采购单id
     * @type {number | string}
     * @memberof RespCrmPurchaseOrderDetail
     */
    id: number | string

    /**
     * 采购单编号
     * @type {string}
     * @memberof RespCrmPurchaseOrderDetail
     */
    purchaseOrderNo: string

    /**
     * 采购单名称
     * @type {string}
     * @memberof RespCrmPurchaseOrderDetail
     */
    poName: string

    /**
     * 企业id
     * @type {number | string}
     * @memberof RespCrmPurchaseOrderDetail
     */
    companyId: number | string

    /**
     * 项目Id
     * @type {number | string}
     * @memberof RespCrmPurchaseOrderDetail
     */
    projectId: number | string

    /**
     * 项目名称
     * @type {string}
     * @memberof RespCrmPurchaseOrderDetail
     */
    projectName: string

    /**
     * 更新时间
     * @type {string}
     * @memberof RespCrmPurchaseOrderDetail
     */
    updateTime: string

    /**
     * 采购单金额
     * @type {number | string}
     * @memberof RespCrmPurchaseOrderDetail
     */
    poAmount: number | string

    /**
     * 剩余采购额度
     * @type {number | string}
     * @memberof RespCrmPurchaseOrderDetail
     */
    poBalance: number | string

    /**
     * 最迟发货日期
     * @type {string}
     * @memberof RespCrmPurchaseOrderDetail
     */
    lastGoodsDate: string

    /**
     * 收货地址
     * @type {string}
     * @memberof RespCrmPurchaseOrderDetail
     */
    goodsAddress: string

    /**
     * 免息方式：0-无;1-1个月;2-2个月;3-3个月;4-4个月;5-5个月;6-6个月
     * @type {number | string}
     * @memberof RespCrmPurchaseOrderDetail
     */
    freeInterestType: number | string

    /**
     * 状态：1-待提交;2-采购单待确认;3-变更待确认;4-采购中;5-采购单完成;6-采购单关闭
     * @type {number | string}
     * @memberof RespCrmPurchaseOrderDetail
     */
    status: number | string

    /**
     * 签约结果：0-默认状态;1-确认签约完成;2-驳回
     * @type {number | string}
     * @memberof RespCrmPurchaseOrderDetail
     */
    signResult: number | string

    /**
     * 驳回原因
     * @type {string}
     * @memberof RespCrmPurchaseOrderDetail
     */
    remark: string

    /**
     * 合同信息
     * @type {Array<RespCrmPurchaseOrderDetail$Contract>}
     * @memberof RespCrmPurchaseOrderDetail
     */
    contracts: Array<RespCrmPurchaseOrderDetail$Contract>

}

/**
* 合同信息
* @export
* @interface RespCrmPurchaseOrderDetail$Contract
*/
export interface RespCrmPurchaseOrderDetail$Contract {

    /**
     * 合同id
     * @type {number | string}
     * @memberof RespCrmPurchaseOrderDetail$Contract
     */
    id?: number | string

    /**
     *
     * @type {RespCrmPurchaseOrderDetail$Contract}
     * @memberof RespCrmPurchaseOrderDetail$Contract
     */
    originalContract?: RespCrmPurchaseOrderDetail$Contract

    /**
     *
     * @type {RespCrmPurchaseOrderDetail$Contract}
     * @memberof RespCrmPurchaseOrderDetail$Contract
     */
    changeContract?: RespCrmPurchaseOrderDetail$Contract

    /**
     * 合同名称
     * @type {string}
     * @memberof RespCrmPurchaseOrderDetail$Contract
     */
    contractName?: string

    /**
     * 合同修改时间
     * @type {string}
     * @memberof RespCrmPurchaseOrderDetail$Contract
     */
    updateTime?: string

    /**
     * 合同状态：1：草稿 2：待分财审核 3：分财审核未通过 4：待风控审核/待运营审核 5：风控审核未通过/运营审核未通过 6：待法务审核 7：法务审核未通过 8：待客户签署 9：客户拒签 10：待平台签署 11：平台签署未通过 12：合同已签署 13：异常关闭 14：超时关闭 15：用印发起失败 16：发起线上待客户签署 17：合同废止
     * @type {number | string}
     * @memberof RespCrmPurchaseOrderDetail$Contract
     */
    contractStatus?: number | string

    /**
     * 生效状态：0-待生效;1-生效中;2-已失效
     * @type {number | string}
     * @memberof RespCrmPurchaseOrderDetail$Contract
     */
    effectiveState?: number | string

    /**
     * 合同类型id 备注：10000：其他合同 10001：担保合同 10002：应收账款质押合同 10003：销售合同 10005：采购合同
     * @type {number | string}
     * @memberof RespCrmPurchaseOrderDetail$Contract
     */
    contractTypeId?: number | string

}

/**
*
* @export
* @interface RespPoInfo
*/
export interface RespPoInfo {

    /**
     * 主键id
     * @type {number | string}
     * @memberof RespPoInfo
     */
    id: number | string

    /**
     * 采购订单主键Id
     * @type {number | string}
     * @memberof RespPoInfo
     */
    poId: number | string

    /**
     * 采购单金额
     * @type {number | string}
     * @memberof RespPoInfo
     */
    poAmount: number | string

    /**
     *
     * @type {JsonNode}
     * @memberof RespPoInfo
     */
    poDetail: JsonNode

    /**
     * 采购批次
     * @type {number | string}
     * @memberof RespPoInfo
     */
    poNumber: number | string

    /**
     * 最迟发货日期
     * @type {string}
     * @memberof RespPoInfo
     */
    lastGoodsDate: string

    /**
     * 收货地址
     * @type {string}
     * @memberof RespPoInfo
     */
    goodsAddress: string

    /**
     * 经销商预付款比例
     * @type {number | string}
     * @memberof RespPoInfo
     */
    prePercent: number | string

    /**
     * 剩余货款支付周期
     * @type {number | string}
     * @memberof RespPoInfo
     */
    restPaymentPeriod: number | string

    /**
     * 收款账户户名
     * @type {string}
     * @memberof RespPoInfo
     */
    receiverAccountName: string

    /**
     * 收款账户银行账号
     * @type {string}
     * @memberof RespPoInfo
     */
    receiverAccountNo: string

    /**
     * 收款账户开户行
     * @type {string}
     * @memberof RespPoInfo
     */
    receiverAccountBank: string

    /**
     * 监管账户户名
     * @type {string}
     * @memberof RespPoInfo
     */
    regulatorAccountName: string

    /**
     * 监管账户银行账号
     * @type {string}
     * @memberof RespPoInfo
     */
    regulatorAccountNo: string

    /**
     * 监管账户开户行
     * @type {string}
     * @memberof RespPoInfo
     */
    regulatorAccountBank: string

    /**
     * 创建时间
     * @type {string}
     * @memberof RespPoInfo
     */
    createTime: string

    /**
     * 确认类型 1：待确认 2：已确认
     * @type {number | string}
     * @memberof RespPoInfo
     */
    confirmType: number | string

    /**
     * 创建人
     * @type {string}
     * @memberof RespPoInfo
     */
    createBy: string

    /**
     * 修改时间
     * @type {string}
     * @memberof RespPoInfo
     */
    updateTime: string

    /**
     * 修改人
     * @type {string}
     * @memberof RespPoInfo
     */
    updateBy: string

    /**
     * 是否删除 0：否 1：是
     * @type {boolean}
     * @memberof RespPoInfo
     */
    deleted: boolean

}

/**
*
* @export
* @interface RespPurchaseOrderSubmit
*/
export interface RespPurchaseOrderSubmit {

    /**
     * 项目id
     * @type {number | string}
     * @memberof RespPurchaseOrderSubmit
     */
    projectId: number | string

    /**
     * 经销商名称
     * @type {string}
     * @memberof RespPurchaseOrderSubmit
     */
    companyName: string

    /**
     * 生效合同
     * @type {Array<RespPurchaseOrderSubmit$Contract>}
     * @memberof RespPurchaseOrderSubmit
     */
    effectiveContracts: Array<RespPurchaseOrderSubmit$Contract>

    /**
     * 待删除合同
     * @type {Array<RespPurchaseOrderSubmit$Contract>}
     * @memberof RespPurchaseOrderSubmit
     */
    toDeleteContracts: Array<RespPurchaseOrderSubmit$Contract>

}

/**
* 待删除合同
* @export
* @interface RespPurchaseOrderSubmit$Contract
*/
export interface RespPurchaseOrderSubmit$Contract {

    /**
     * 合同id
     * @type {number | string}
     * @memberof RespPurchaseOrderSubmit$Contract
     */
    id?: number | string

    /**
     * 合同名称
     * @type {string}
     * @memberof RespPurchaseOrderSubmit$Contract
     */
    contractName?: string

    /**
     * 合同修改时间
     * @type {string}
     * @memberof RespPurchaseOrderSubmit$Contract
     */
    updateTime?: string

    /**
     * 合同状态：1：草稿 2：待分财审核 3：分财审核未通过 4：待风控审核/待运营审核 5：风控审核未通过/运营审核未通过 6：待法务审核 7：法务审核未通过 8：待客户签署 9：客户拒签 10：待平台签署 11：平台签署未通过 12：合同已签署 13：异常关闭 14：超时关闭 15：用印发起失败 16：发起线上待客户签署 17：合同废止
     * @type {number | string}
     * @memberof RespPurchaseOrderSubmit$Contract
     */
    contractStatus?: number | string

    /**
     * 合同类型id 备注：10000：其他合同 10001：担保合同 10002：应收账款质押合同 10003：销售合同 10005：采购合同
     * @type {number | string}
     * @memberof RespPurchaseOrderSubmit$Contract
     */
    contractTypeId?: number | string

    /**
     * 生效状态：0-待生效;1-生效中;2-已失效
     * @type {number | string}
     * @memberof RespPurchaseOrderSubmit$Contract
     */
    effectiveState?: number | string

}

/**
*
* @export
* @interface RespPurchaseOrderChangeFields
*/
export interface RespPurchaseOrderChangeFields {

    /**
     * 业务字段
     * @type {string}
     * @memberof RespPurchaseOrderChangeFields
     */
    fieldName: string

    /**
     * 字段描述
     * @type {string}
     * @memberof RespPurchaseOrderChangeFields
     */
    fieldDescription: string

    /**
     * 原值
     * @type {string}
     * @memberof RespPurchaseOrderChangeFields
     */
    originalValue: string

    /**
     * 更新后的值
     * @type {string}
     * @memberof RespPurchaseOrderChangeFields
     */
    changedValue: string

    /**
     * 单位
     * @type {string}
     * @memberof RespPurchaseOrderChangeFields
     */
    unit: string

    /**
     *
     * @type {boolean}
     * @memberof RespPurchaseOrderChangeFields
     */
    change: boolean

}

/**
* 合同变更关系表
* @export
* @interface RespContractChangeRelationship
*/
export interface RespContractChangeRelationship {

    /**
     * 合同类别id
     * @type {number | string}
     * @memberof RespContractChangeRelationship
     */
    contractTypeId?: number | string

    /**
     * 原合同Id
     * @type {number | string}
     * @memberof RespContractChangeRelationship
     */
    originalContractId?: number | string

    /**
     * 变更后的合同Id
     * @type {number | string}
     * @memberof RespContractChangeRelationship
     */
    changedContractId?: number | string

    /**
     * 状态：1-新增;2-变更;0-未变更
     * @type {number | string}
     * @memberof RespContractChangeRelationship
     */
    status?: number | string

    /**
     *
     * @type {RespPurchaseOrderSubmit$Contract}
     * @memberof RespContractChangeRelationship
     */
    originalContractInfo?: RespPurchaseOrderSubmit$Contract

    /**
     *
     * @type {RespPurchaseOrderSubmit$Contract}
     * @memberof RespContractChangeRelationship
     */
    changedContractInfo?: RespPurchaseOrderSubmit$Contract

}

/**
*
* @export
* @interface RespPurchaseOrderChangeConfirmInfo
*/
export interface RespPurchaseOrderChangeConfirmInfo {

    /**
     * 项目id
     * @type {number | string}
     * @memberof RespPurchaseOrderChangeConfirmInfo
     */
    projectId: number | string

    /**
     * 经销商名称
     * @type {string}
     * @memberof RespPurchaseOrderChangeConfirmInfo
     */
    companyName: string

    /**
     * 变更前生效合同
     * @type {Array<RespPurchaseOrderSubmit$Contract>}
     * @memberof RespPurchaseOrderChangeConfirmInfo
     */
    originalContracts: Array<RespPurchaseOrderSubmit$Contract>

    /**
     * 变更后生效合同
     * @type {Array<RespPurchaseOrderSubmit$Contract>}
     * @memberof RespPurchaseOrderChangeConfirmInfo
     */
    effectiveContracts: Array<RespPurchaseOrderSubmit$Contract>

    /**
     * 待删除合同
     * @type {Array<RespPurchaseOrderSubmit$Contract>}
     * @memberof RespPurchaseOrderChangeConfirmInfo
     */
    toDeleteContracts: Array<RespPurchaseOrderSubmit$Contract>

    /**
     * 合同变更关系表
     * @type {Array<RespContractChangeRelationship>}
     * @memberof RespPurchaseOrderChangeConfirmInfo
     */
    contractsRelationship: Array<RespContractChangeRelationship>

}

/**
* 采购订单主信息
* @export
* @interface PurchaseOrder
*/
export interface PurchaseOrder {

    /**
     * 主键id
     * @type {number | string}
     * @memberof PurchaseOrder
     */
    id?: number | string

    /**
     * 采购单编号
     * @type {string}
     * @memberof PurchaseOrder
     */
    purchaseOrderNo?: string

    /**
     * 采购单名称
     * @type {string}
     * @memberof PurchaseOrder
     */
    poName?: string

    /**
     * 用户id
     * @type {number | string}
     * @memberof PurchaseOrder
     */
    userId?: number | string

    /**
     * 项目Id
     * @type {number | string}
     * @memberof PurchaseOrder
     */
    projectId?: number | string

    /**
     * 项目编号
     * @type {string}
     * @memberof PurchaseOrder
     */
    projectNo?: string

    /**
     * 项目名称
     * @type {string}
     * @memberof PurchaseOrder
     */
    projectName?: string

    /**
     * 经销商公司Id
     * @type {number | string}
     * @memberof PurchaseOrder
     */
    companyId?: number | string

    /**
     * 经销商名称
     * @type {string}
     * @memberof PurchaseOrder
     */
    companyName?: string

    /**
     * 采购单金额
     * @type {number | string}
     * @memberof PurchaseOrder
     */
    poAmount?: number | string

    /**
     * 剩余可支付额度
     * @type {number | string}
     * @memberof PurchaseOrder
     */
    poBalance?: number | string

    /**
     * 状态：1-待提交;2-采购单待确认;3-变更待确认;4-采购中;5-采购单完成;6-采购单关闭
     * @type {number | string}
     * @memberof PurchaseOrder
     */
    status?: number | string

    /**
     * 免息方式：0-无;1-1个月;2-2个月;3-3个月;4-4个月;5-5个月;6-6个月
     * @type {number | string}
     * @memberof PurchaseOrder
     */
    freeInterestType?: number | string

    /**
     * 签约结果：0-未知;1-确认签约完成;2-驳回
     * @type {number | string}
     * @memberof PurchaseOrder
     */
    signResult?: number | string

    /**
     * 签约结果备注
     * @type {string}
     * @memberof PurchaseOrder
     */
    remark?: string

    /**
     * 提交时间
     * @type {string}
     * @memberof PurchaseOrder
     */
    submitTime?: string

    /**
     * 提交人
     * @type {string}
     * @memberof PurchaseOrder
     */
    submitBy?: string

    /**
     * 提交人手机号
     * @type {string}
     * @memberof PurchaseOrder
     */
    submitPhone?: string

    /**
     * 确认人
     * @type {string}
     * @memberof PurchaseOrder
     */
    confirmBy?: string

    /**
     * 确认人手机号
     * @type {string}
     * @memberof PurchaseOrder
     */
    confirmPhone?: string

    /**
     * 确认时间
     * @type {string}
     * @memberof PurchaseOrder
     */
    confirmTime?: string

    /**
     * 创建人
     * @type {string}
     * @memberof PurchaseOrder
     */
    createBy?: string

    /**
     * 创建人手机号
     * @type {string}
     * @memberof PurchaseOrder
     */
    createPhone?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof PurchaseOrder
     */
    createTime?: string

    /**
     * 更新人
     * @type {string}
     * @memberof PurchaseOrder
     */
    updateBy?: string

    /**
     * 更新时间
     * @type {string}
     * @memberof PurchaseOrder
     */
    updateTime?: string

    /**
     * 更新人手机号
     * @type {string}
     * @memberof PurchaseOrder
     */
    updatePhone?: string

    /**
     * 删除标识
     * @type {boolean}
     * @memberof PurchaseOrder
     */
    deleted?: boolean

    /**
     * 公管户信息 true：已确认 false：未确认
     * @type {boolean}
     * @memberof PurchaseOrder
     */
    coManager?: boolean

    /**
     * 质押编号
     * @type {string}
     * @memberof PurchaseOrder
     */
    pledgeNo?: string

}

/**
* 合同信息
* @export
* @interface RespPurchaseOrderContract
*/
export interface RespPurchaseOrderContract {

    /**
     * 关联id
     * @type {number | string}
     * @memberof RespPurchaseOrderContract
     */
    purchaseOrderContractId: number | string

    /**
     * 采购单id
     * @type {number | string}
     * @memberof RespPurchaseOrderContract
     */
    purchaseOrderId: number | string

    /**
     * 采购单名称
     * @type {string}
     * @memberof RespPurchaseOrderContract
     */
    purchaseOrderName: string

    /**
     * 生效状态：0-待生效;1-生效中;2-已失效
     * @type {number | string}
     * @memberof RespPurchaseOrderContract
     */
    effectiveState: number | string

    /**
     * 合同id
     * @type {number | string}
     * @memberof RespPurchaseOrderContract
     */
    contractId: number | string

    /**
     * 项目id
     * @type {number | string}
     * @memberof RespPurchaseOrderContract
     */
    projectId: number | string

    /**
     * 项目名称
     * @type {string}
     * @memberof RespPurchaseOrderContract
     */
    projectName: string

    /**
     * 公司id
     * @type {number | string}
     * @memberof RespPurchaseOrderContract
     */
    companyId: number | string

    /**
     * 合同名称
     * @type {string}
     * @memberof RespPurchaseOrderContract
     */
    contractName: string

    /**
     * 合同编号
     * @type {string}
     * @memberof RespPurchaseOrderContract
     */
    contractNo: string

    /**
     * 合同内容
     * @type {string}
     * @memberof RespPurchaseOrderContract
     */
    contractContent: string

    /**
     * 合同类型id 备注：10000：其他合同 10001：担保合同 10002：应收账款质押合同 10003：销售合同 10005：采购合同
     * @type {number | string}
     * @memberof RespPurchaseOrderContract
     */
    contractTypeId: number | string

    /**
     * 合同字段键值对
     * @type {string}
     * @memberof RespPurchaseOrderContract
     */
    contractFieldsList: string

    /**
     * 合同模板版本id
     * @type {number | string}
     * @memberof RespPurchaseOrderContract
     */
    contractTemplateVersionId: number | string

    /**
     * 合同状态：1：草稿 2：待分财审核 3：分财审核未通过 4：待风控审核/待运营审核 5：风控审核未通过/运营审核未通过 6：待法务审核 7：法务审核未通过 8：待客户签署 9：客户拒签 10：待平台签署 11：平台签署未通过 12：合同已签署 13：异常关闭 14：超时关闭 15：用印发起失败 16：发起线上待客户签署 17：合同废止
     * @type {number | string}
     * @memberof RespPurchaseOrderContract
     */
    contractStatus: number | string

    /**
     * 合同文件url
     * @type {string}
     * @memberof RespPurchaseOrderContract
     */
    contractUrl: string

    /**
     * 合同签署类型 1：线上 2：线下
     * @type {number | string}
     * @memberof RespPurchaseOrderContract
     */
    contractSignType: number | string

    /**
     * 合同签署流程id
     * @type {string}
     * @memberof RespPurchaseOrderContract
     */
    flowId: string

    /**
     * 合同签署完成时间
     * @type {string}
     * @memberof RespPurchaseOrderContract
     */
    signedTime: string

    /**
     * 创建人
     * @type {string}
     * @memberof RespPurchaseOrderContract
     */
    createBy: string

    /**
     * 创建人手机号
     * @type {string}
     * @memberof RespPurchaseOrderContract
     */
    createPhone: string

    /**
     * 创建时间
     * @type {string}
     * @memberof RespPurchaseOrderContract
     */
    createTime: string

    /**
     * 更新人
     * @type {string}
     * @memberof RespPurchaseOrderContract
     */
    updateBy: string

    /**
     * 更新时间
     * @type {string}
     * @memberof RespPurchaseOrderContract
     */
    updateTime: string

}

/**
*
* @export
* @interface RespPurchaseOrderCrm
*/
export interface RespPurchaseOrderCrm {

    /**
     *
     * @type {PurchaseOrder}
     * @memberof RespPurchaseOrderCrm
     */
    purchaseOrder: PurchaseOrder

    /**
     *
     * @type {PoInfo}
     * @memberof RespPurchaseOrderCrm
     */
    poInfo: PoInfo

    /**
     * 合同信息
     * @type {Array<RespPurchaseOrderContract>}
     * @memberof RespPurchaseOrderCrm
     */
    contractList: Array<RespPurchaseOrderContract>

    /**
     *
     * @type {JsonNode}
     * @memberof RespPurchaseOrderCrm
     */
    salePoDetailUrl: JsonNode

}

/**
*
* @export
* @interface RespProjectPurchase
*/
export interface RespProjectPurchase {

    /**
     * id
     * @type {number | string}
     * @memberof RespProjectPurchase
     */
    id: number | string

    /**
     * 上游供应商
     * @type {string}
     * @memberof RespProjectPurchase
     */
    upstreamSupplierName: string

    /**
     * 上游付款方式 1：银行转账 2：银行承兑 （预付款申请）
     * @type {Array<number | string>}
     * @memberof RespProjectPurchase
     */
    upstreamPayType: Array<number | string>

    /**
     * 上游付款方式 - 货款申请
     * @type {Array<UpstreamPayTypeResponse>}
     * @memberof RespProjectPurchase
     */
    upstreamPayTypes: Array<UpstreamPayTypeResponse>

    /**
     * 所属项目id/发起决议变更快照id
     * @type {number | string}
     * @memberof RespProjectPurchase
     */
    ascriptionId: number | string

    /**
     * 设备品类类型 1：空调 2：采暖 3：新风 4：净水 5：智能化 6：辅材 7：电梯 8：其他 9:电器 10:热水器
     * @type {string}
     * @memberof RespProjectPurchase
     */
    deviceCategoryType: string

    /**
     * 设备品类
     * @type {string}
     * @memberof RespProjectPurchase
     */
    deviceCategory: string

    /**
     * 设备品类类型其他：设备品类名称
     * @type {string}
     * @memberof RespProjectPurchase
     */
    otherDeviceCategory: string

    /**
     * 设备品牌
     * @type {string}
     * @memberof RespProjectPurchase
     */
    deviceBrand: string

    /**
     * 上游供应商类型 1：厂商 2：代理商 3：经销商
     * @type {number | string}
     * @memberof RespProjectPurchase
     */
    upstreamSupplierType: number | string

    /**
     * 上游接受的付款方式
     * @type {Array<string>}
     * @memberof RespProjectPurchase
     */
    upstreamPayTypeName: Array<string>

    /**
     * 银行转账费率类型 1：执行费率 2：自定义费率
     * @type {number | string}
     * @memberof RespProjectPurchase
     */
    transferRateType: number | string

    /**
     * 银行转账自定义费率
     * @type {number | string}
     * @memberof RespProjectPurchase
     */
    transferRate: number | string

    /**
     * 银行承兑费率类型 1：执行费率 2：自定义费率
     * @type {number | string}
     * @memberof RespProjectPurchase
     */
    acceptanceRateType: number | string

    /**
     * 银行承兑自定义费率
     * @type {number | string}
     * @memberof RespProjectPurchase
     */
    acceptanceRate: number | string

    /**
     * 上游货款方式 1：先款后货 2：先货后款
     * @type {number | string}
     * @memberof RespProjectPurchase
     */
    upstreamLoanType: number | string

    /**
     * 采购折让
     * @type {number | string}
     * @memberof RespProjectPurchase
     */
    purchaseDiscountRate: number | string

}

/**
* 上游付款方式 - 货款申请
* @export
* @interface UpstreamPayTypeResponse
*/
export interface UpstreamPayTypeResponse {

    /**
     * 上游支付方式
     * @type {number | string}
     * @memberof UpstreamPayTypeResponse
     */
    upstreamPayType?: number | string

    /**
     * 费率
     * @type {number | string}
     * @memberof UpstreamPayTypeResponse
     */
    rate?: number | string

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
* @interface ReqPurchaseOrderCrmSearch
*/
export interface ReqPurchaseOrderCrmSearch {

    /**
     * 页码
     * @type {number | string}
     * @memberof ReqPurchaseOrderCrmSearch
     */
    pageNumber?: number | string

    /**
     * 每页大小
     * @type {number | string}
     * @memberof ReqPurchaseOrderCrmSearch
     */
    pageSize?: number | string

    /**
     *
     * @type {Sort}
     * @memberof ReqPurchaseOrderCrmSearch
     */
    sort?: Sort

    /**
     * 项目Id
     * @type {number | string}
     * @memberof ReqPurchaseOrderCrmSearch
     */
    projectId?: number | string

    /**
     * 客户经理企业微信id
     * @type {string}
     * @memberof ReqPurchaseOrderCrmSearch
     */
    corpUserId: string

    /**
     * 合同id
     * @type {number | string}
     * @memberof ReqPurchaseOrderCrmSearch
     */
    contractId?: number | string

}

/**
*
* @export
* @interface IPageRespPurchaseOrderCrmPage
*/
export interface IPageRespPurchaseOrderCrmPage {

    /**
     *
     * @type {Array<RespPurchaseOrderCrmPage>}
     * @memberof IPageRespPurchaseOrderCrmPage
     */
    records: Array<RespPurchaseOrderCrmPage>

    /**
     *
     * @type {number | string}
     * @memberof IPageRespPurchaseOrderCrmPage
     */
    total: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageRespPurchaseOrderCrmPage
     */
    pages: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageRespPurchaseOrderCrmPage
     */
    current: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageRespPurchaseOrderCrmPage
     */
    size: number | string

}

/**
* 合同份数
* @export
* @interface RespContractTypeNumber
*/
export interface RespContractTypeNumber {

    /**
     * 合同类型id
     * @type {number | string}
     * @memberof RespContractTypeNumber
     */
    contractTypeId?: number | string

    /**
     * 合同类型名称
     * @type {string}
     * @memberof RespContractTypeNumber
     */
    contractTypeName?: string

    /**
     * 合同类型数量
     * @type {number | string}
     * @memberof RespContractTypeNumber
     */
    contractTypeNumber?: number | string

}

/**
*
* @export
* @interface RespPurchaseOrderCrmPage
*/
export interface RespPurchaseOrderCrmPage {

    /**
     * 主键id
     * @type {number | string}
     * @memberof RespPurchaseOrderCrmPage
     */
    id?: number | string

    /**
     * 采购单编号
     * @type {string}
     * @memberof RespPurchaseOrderCrmPage
     */
    purchaseOrderNo?: string

    /**
     * 采购单名称
     * @type {string}
     * @memberof RespPurchaseOrderCrmPage
     */
    poName?: string

    /**
     * 采购单-角标
     * @type {string}
     * @memberof RespPurchaseOrderCrmPage
     */
    purchaseOrderMark?: string

    /**
     * 用户id
     * @type {number | string}
     * @memberof RespPurchaseOrderCrmPage
     */
    userId?: number | string

    /**
     * 项目Id
     * @type {number | string}
     * @memberof RespPurchaseOrderCrmPage
     */
    projectId?: number | string

    /**
     * 项目编号
     * @type {string}
     * @memberof RespPurchaseOrderCrmPage
     */
    projectNo?: string

    /**
     * 项目名称
     * @type {string}
     * @memberof RespPurchaseOrderCrmPage
     */
    projectName?: string

    /**
     * 经销商公司Id
     * @type {number | string}
     * @memberof RespPurchaseOrderCrmPage
     */
    companyId?: number | string

    /**
     * 经销商名称
     * @type {string}
     * @memberof RespPurchaseOrderCrmPage
     */
    companyName?: string

    /**
     * 采购单金额
     * @type {number | string}
     * @memberof RespPurchaseOrderCrmPage
     */
    poAmount?: number | string

    /**
     * 剩余采购额度 、可申请金额（可申请支付单金额）
     * @type {number | string}
     * @memberof RespPurchaseOrderCrmPage
     */
    poBalance?: number | string

    /**
     * 状态：1-待提交;2-采购单待确认;3-变更待确认;4-采购中;5-采购单完成;6-采购单关闭
     * @type {number | string}
     * @memberof RespPurchaseOrderCrmPage
     */
    status?: number | string

    /**
     * 免息方式：0-无;1-1个月;2-2个月;3-3个月;4-4个月;5-5个月;6-6个月
     * @type {number | string}
     * @memberof RespPurchaseOrderCrmPage
     */
    freeInterestType?: number | string

    /**
     * 签约结果：0-未知;1-确认签约完成;2-驳回
     * @type {number | string}
     * @memberof RespPurchaseOrderCrmPage
     */
    signResult?: number | string

    /**
     * 签约结果备注
     * @type {string}
     * @memberof RespPurchaseOrderCrmPage
     */
    remark?: string

    /**
     * 提交时间
     * @type {string}
     * @memberof RespPurchaseOrderCrmPage
     */
    submitTime?: string

    /**
     * 提交人
     * @type {string}
     * @memberof RespPurchaseOrderCrmPage
     */
    submitBy?: string

    /**
     * 提交人手机号
     * @type {string}
     * @memberof RespPurchaseOrderCrmPage
     */
    submitPhone?: string

    /**
     * 确认人
     * @type {string}
     * @memberof RespPurchaseOrderCrmPage
     */
    confirmBy?: string

    /**
     * 确认人手机号
     * @type {string}
     * @memberof RespPurchaseOrderCrmPage
     */
    confirmPhone?: string

    /**
     * 确认时间
     * @type {string}
     * @memberof RespPurchaseOrderCrmPage
     */
    confirmTime?: string

    /**
     * 创建人
     * @type {string}
     * @memberof RespPurchaseOrderCrmPage
     */
    createBy?: string

    /**
     * 创建人手机号
     * @type {string}
     * @memberof RespPurchaseOrderCrmPage
     */
    createPhone?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof RespPurchaseOrderCrmPage
     */
    createTime?: string

    /**
     * 更新人
     * @type {string}
     * @memberof RespPurchaseOrderCrmPage
     */
    updateBy?: string

    /**
     * 更新时间
     * @type {string}
     * @memberof RespPurchaseOrderCrmPage
     */
    updateTime?: string

    /**
     * 更新人手机号
     * @type {string}
     * @memberof RespPurchaseOrderCrmPage
     */
    updatePhone?: string

    /**
     * 采购批次 1：一次性采购 2：分批采购
     * @type {number | string}
     * @memberof RespPurchaseOrderCrmPage
     */
    poNumber?: number | string

    /**
     * 合同份数
     * @type {Array<RespContractTypeNumber>}
     * @memberof RespPurchaseOrderCrmPage
     */
    contractTypeNumberList?: Array<RespContractTypeNumber>

}

/**
* 支付单关闭时上传的凭证
* @export
* @interface AttachDocResponse
*/
export interface AttachDocResponse {

    /**
     * id
     * @type {number | string}
     * @memberof AttachDocResponse
     */
    id?: number | string

    /**
     * 附件地址
     * @type {string}
     * @memberof AttachDocResponse
     */
    fileUrl?: string

    /**
     * 附件名称
     * @type {string}
     * @memberof AttachDocResponse
     */
    fileName?: string

}

/**
* 采购单变更记录
* @export
* @interface PoChange
*/
export interface PoChange {

    /**
     * 主键id
     * @type {number | string}
     * @memberof PoChange
     */
    id?: number | string

    /**
     * 采购订单主键Id
     * @type {number | string}
     * @memberof PoChange
     */
    purchaseOrderId?: number | string

    /**
     * 0:变更记录待生效 1:变更记录生效,后台过滤数据使用
     * @type {number | string}
     * @memberof PoChange
     */
    status?: number | string

    /**
     * 变更前免息方式：0-无;1-1个月;2-2个月;3-3个月;4-4个月;5-5个月;6-6个月
     * @type {number | string}
     * @memberof PoChange
     */
    lastFreeInterestType?: number | string

    /**
     * 免息方式：0-无;1-1个月;2-2个月;3-3个月;4-4个月;5-5个月;6-6个月
     * @type {number | string}
     * @memberof PoChange
     */
    freeInterestType?: number | string

    /**
     * 变更结果：0:待确认 1-确认变更；2-驳回
     * @type {number | string}
     * @memberof PoChange
     */
    changeResult?: number | string

    /**
     * 变更结果备注
     * @type {string}
     * @memberof PoChange
     */
    remark?: string

    /**
     * 变更原因
     * @type {string}
     * @memberof PoChange
     */
    changeReason?: string

    /**
     * 修改人
     * @type {string}
     * @memberof PoChange
     */
    updateBy?: string

    /**
     * 修改人手机号
     * @type {string}
     * @memberof PoChange
     */
    updatePhone?: string

    /**
     * 修改时间
     * @type {string}
     * @memberof PoChange
     */
    updateTime?: string

    /**
     * 提交时间
     * @type {string}
     * @memberof PoChange
     */
    submitTime?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof PoChange
     */
    createTime?: string

    /**
     * 提交人
     * @type {string}
     * @memberof PoChange
     */
    submitBy?: string

    /**
     * 提交人手机号
     * @type {string}
     * @memberof PoChange
     */
    submitPhone?: string

    /**
     * 是否删除 0：否 1：是
     * @type {boolean}
     * @memberof PoChange
     */
    deleted?: boolean

}

/**
* 支付单
* @export
* @interface RespPayOrderDetail
*/
export interface RespPayOrderDetail {

    /**
     * id
     * @type {number | string}
     * @memberof RespPayOrderDetail
     */
    id?: number | string

    /**
     * 采购单Id
     * @type {number | string}
     * @memberof RespPayOrderDetail
     */
    poId?: number | string

    /**
     * 订单及服务费确认函合同id
     * @type {number | string}
     * @memberof RespPayOrderDetail
     */
    paymentOrderContractId?: number | string

    /**
     * 上游供应商公司Id
     * @type {number | string}
     * @memberof RespPayOrderDetail
     */
    supplierCompanyId?: number | string

    /**
     * 上游供应商名称
     * @type {string}
     * @memberof RespPayOrderDetail
     */
    supplierCompanyName?: string

    /**
     *
     * @type {JsonNode}
     * @memberof RespPayOrderDetail
     */
    paymentDetail?: JsonNode

    /**
     * 最迟发货日期
     * @type {string}
     * @memberof RespPayOrderDetail
     */
    lastGoodsDate?: string

    /**
     * 收货地址
     * @type {string}
     * @memberof RespPayOrderDetail
     */
    goodsAddress?: string

    /**
     * 申请类型：1-一次性 2-分批
     * @type {number | string}
     * @memberof RespPayOrderDetail
     */
    applyType?: number | string

    /**
     * 申请金额
     * @type {number | string}
     * @memberof RespPayOrderDetail
     */
    applyAmount?: number | string

    /**
     * 申请日期(时间)
     * @type {string}
     * @memberof RespPayOrderDetail
     */
    applyDate?: string

    /**
     * 首付款
     * @type {number | string}
     * @memberof RespPayOrderDetail
     */
    downPaymentAmount?: number | string

    /**
     * 剩余货款
     * @type {number | string}
     * @memberof RespPayOrderDetail
     */
    arrearAmount?: number | string

    /**
     * 预计 服务费
     * @type {number | string}
     * @memberof RespPayOrderDetail
     */
    feeAmount?: number | string

    /**
     * 预计 每期服务费
     * @type {number | string}
     * @memberof RespPayOrderDetail
     */
    feeAmountPer?: number | string

    /**
     * 还款方式：1-一次性还本付息； 默认1 (暂时用不到)
     * @type {number | string}
     * @memberof RespPayOrderDetail
     */
    paymentType?: number | string

    /**
     * 计息方式：1-按日计息；默认1 (暂时用不到)
     * @type {number | string}
     * @memberof RespPayOrderDetail
     */
    interestType?: number | string

    /**
     * 状态：0-待项目运营审核;
	1-首付款待支付;
	2-首付款待确认;
	3-上游支付确认中;
	4-上游支付中;
	5--待出票;
	6-正在出票;
	7-待发货;
	8-待收货;
	9-剩余货款待支付;
	10-剩余货款待确认;
	11-支付单完成;
	12-支付单关闭;
	13-支付单取消;
	14-待分财审核;
	15-支付单审核中;

     * @type {number | string}
     * @memberof RespPayOrderDetail
     */
    status?: number | string

    /**
     * 应收账款质押:
	 * 1-已质押;
	 * 2-放款前质押;
	 * 3-其他
     * @type {number | string}
     * @memberof RespPayOrderDetail
     */
    accountReceivablePledgeType?: number | string

    /**
     * 上游支付方式:1-银行转帐;2-银行承兑
     * @type {number | string}
     * @memberof RespPayOrderDetail
     */
    supplierPaymentType?: number | string

    /**
     * 上游货款方式 1.先款后货 2.先货后款
     * @type {number | string}
     * @memberof RespPayOrderDetail
     */
    supplierPaymentMethod?: number | string

    /**
     * 订单及服务费确认函url
     * @type {string}
     * @memberof RespPayOrderDetail
     */
    orderLetterUrl?: string

    /**
     * 订单及服务费确认函状态 0未签约，1已签约
     * @type {number | string}
     * @memberof RespPayOrderDetail
     */
    orderLetterStatus?: number | string

    /**
     * 审核结果:1-通过;2-不通过
     * @type {number | string}
     * @memberof RespPayOrderDetail
     */
    approvalStatus?: number | string

    /**
     * 审核人
     * @type {string}
     * @memberof RespPayOrderDetail
     */
    approvalUser?: string

    /**
     * 审核人手机号
     * @type {string}
     * @memberof RespPayOrderDetail
     */
    approvalPhone?: string

    /**
     * 审核时间
     * @type {string}
     * @memberof RespPayOrderDetail
     */
    approvalTime?: string

    /**
     * 审核备注
     * @type {string}
     * @memberof RespPayOrderDetail
     */
    approvalRemark?: string

    /**
     * 支付单关闭原因对应code
1,支付单审核不通过,
2,用户拒签订单及服务费确认函,
3,用户主动取消;
     * @type {number | string}
     * @memberof RespPayOrderDetail
     */
    closeReasonCode?: number | string

    /**
     * 支付单关闭原因
     * @type {string}
     * @memberof RespPayOrderDetail
     */
    closeReason?: string

    /**
     * 支付单关闭时上传的凭证
     * @type {Array<AttachDocResponse>}
     * @memberof RespPayOrderDetail
     */
    closeAttachDocResponseList?: Array<AttachDocResponse>

    /**
     * 支付单关闭时间
     * @type {string}
     * @memberof RespPayOrderDetail
     */
    closeTime?: string

    /**
     * 申请人
     * @type {string}
     * @memberof RespPayOrderDetail
     */
    createBy?: string

    /**
     * 申请账号
     * @type {string}
     * @memberof RespPayOrderDetail
     */
    createPhone?: string

    /**
     * 支付单编号
     * @type {string}
     * @memberof RespPayOrderDetail
     */
    paymentOrderNo?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof RespPayOrderDetail
     */
    createTime?: string

    /**
     * 修改时间
     * @type {string}
     * @memberof RespPayOrderDetail
     */
    updateTime?: string

    /**
     * 关闭人
     * @type {string}
     * @memberof RespPayOrderDetail
     */
    closeBy?: string

    /**
     * 关闭账号
     * @type {string}
     * @memberof RespPayOrderDetail
     */
    closePhone?: string

    /**
     * 下游合作方式:1-垫资代采;2-代收代付
     * @type {number | string}
     * @memberof RespPayOrderDetail
     */
    dealerCooperationMethod?: number | string

    /**
     * 银行联行号
     * @type {string}
     * @memberof RespPayOrderDetail
     */
    supplierBankNo?: string

    /**
     * 供应商开户行名称
     * @type {string}
     * @memberof RespPayOrderDetail
     */
    supplierAccountName?: string

    /**
     * 供应商银行账号
     * @type {string}
     * @memberof RespPayOrderDetail
     */
    supplierAccountNo?: string

    /**
     * 期望上游支付日期
     * @type {string}
     * @memberof RespPayOrderDetail
     */
    expectSupplierPaymentDate?: string

    /**
     * 特殊说明
     * @type {string}
     * @memberof RespPayOrderDetail
     */
    specialRemark?: string

    /**
     * 网银盾照片
     * @type {Array<AttachDoc>}
     * @memberof RespPayOrderDetail
     */
    shieldFiles?: Array<AttachDoc>

    /**
     * 共管户截图
     * @type {Array<AttachDoc>}
     * @memberof RespPayOrderDetail
     */
    managedFiles?: Array<AttachDoc>

    /**
     * 质押编号
     * @type {string}
     * @memberof RespPayOrderDetail
     */
    pledgeNo?: string

    /**
     * OA审批编号
     * @type {string}
     * @memberof RespPayOrderDetail
     */
    oaNo?: string

    /**
     * 放款单下载显示
     * @type {boolean}
     * @memberof RespPayOrderDetail
     */
    isShowDownloadLoan?: boolean

    /**
     * 票面金额有无要求 0：无要求 1：有要求
     * @type {number | string}
     * @memberof RespPayOrderDetail
     */
    billClaim?: number | string

    /**
     * 费率（上游支付方式费率）
     * @type {number | string}
     * @memberof RespPayOrderDetail
     */
    serviceFeeRate?: number | string

    /**
     * 毛利总额
     * @type {number | string}
     * @memberof RespPayOrderDetail
     */
    salesGrossTotalAmount?: number | string

    /**
     * 销售毛利率
     * @type {number | string}
     * @memberof RespPayOrderDetail
     */
    salesGrossMargin?: number | string

    /**
     * 采购折让
     * @type {number | string}
     * @memberof RespPayOrderDetail
     */
    purchaseDiscountRate?: number | string

    /**
     * 销售金额
     * @type {number | string}
     * @memberof RespPayOrderDetail
     */
    salesTotalAmount?: number | string

    /**
     * 采购金额（折让后）
     * @type {number | string}
     * @memberof RespPayOrderDetail
     */
    purchaseDiscountAmount?: number | string

}

/**
*
* @export
* @interface RespPurchaseOrderInfo
*/
export interface RespPurchaseOrderInfo {

    /**
     *
     * @type {PurchaseOrder}
     * @memberof RespPurchaseOrderInfo
     */
    purchaseOrder: PurchaseOrder

    /**
     *
     * @type {PoInfo}
     * @memberof RespPurchaseOrderInfo
     */
    poInfo: PoInfo

    /**
     * 采购单合同信息
     * @type {Array<RespPurchaseOrderContract>}
     * @memberof RespPurchaseOrderInfo
     */
    contracts: Array<RespPurchaseOrderContract>

    /**
     * 采购单变更记录
     * @type {Array<PoChange>}
     * @memberof RespPurchaseOrderInfo
     */
    poChanges: Array<PoChange>

    /**
     * 支付单
     * @type {Array<RespPayOrderDetail>}
     * @memberof RespPurchaseOrderInfo
     */
    payOrderDetails: Array<RespPayOrderDetail>

    /**
     * 网银盾照片
     * @type {Array<AttachDoc>}
     * @memberof RespPurchaseOrderInfo
     */
    onlineBankingShields: Array<AttachDoc>

    /**
     * 共管户截图
     * @type {Array<AttachDoc>}
     * @memberof RespPurchaseOrderInfo
     */
    screenshots: Array<AttachDoc>

}

/**
*
* @export
* @interface RespPurchaseOrderConfirm
*/
export interface RespPurchaseOrderConfirm {

    /**
     *
     * @type {PurchaseOrder}
     * @memberof RespPurchaseOrderConfirm
     */
    purchaseOrder: PurchaseOrder

    /**
     *
     * @type {PoInfo}
     * @memberof RespPurchaseOrderConfirm
     */
    poInfo: PoInfo

    /**
     * 采购单合同信息
     * @type {Array<RespPurchaseOrderContract>}
     * @memberof RespPurchaseOrderConfirm
     */
    contracts: Array<RespPurchaseOrderContract>

}

/**
* 采购单变更合同信息
* @export
* @interface RespPoChangeContract
*/
export interface RespPoChangeContract {

    /**
     * 主键id
     * @type {number | string}
     * @memberof RespPoChangeContract
     */
    id?: number | string

    /**
     * 变更单Id
     * @type {number | string}
     * @memberof RespPoChangeContract
     */
    changeId?: number | string

    /**
     * 合同类别id
     * @type {number | string}
     * @memberof RespPoChangeContract
     */
    contractTypeId?: number | string

    /**
     * 原合同Id
     * @type {number | string}
     * @memberof RespPoChangeContract
     */
    originalContractId?: number | string

    /**
     * 原合同名称
     * @type {string}
     * @memberof RespPoChangeContract
     */
    originalContractName?: string

    /**
     * 变更后的合同Id
     * @type {number | string}
     * @memberof RespPoChangeContract
     */
    changedContractId?: number | string

    /**
     * 变更后的合同名称
     * @type {string}
     * @memberof RespPoChangeContract
     */
    changedContractName?: string

    /**
     * 状态：1-新增;2-变更
     * @type {number | string}
     * @memberof RespPoChangeContract
     */
    status?: number | string

    /**
     * 变更备注
     * @type {string}
     * @memberof RespPoChangeContract
     */
    remark?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof RespPoChangeContract
     */
    createTime?: string

    /**
     * 创建人
     * @type {string}
     * @memberof RespPoChangeContract
     */
    createBy?: string

    /**
     * 修改时间
     * @type {string}
     * @memberof RespPoChangeContract
     */
    updateTime?: string

    /**
     * 修改人
     * @type {string}
     * @memberof RespPoChangeContract
     */
    updateBy?: string

    /**
     * 是否删除 0：否 1：是
     * @type {number | string}
     * @memberof RespPoChangeContract
     */
    deleted?: number | string

}

/**
*
* @export
* @interface RespPurchaseOrderChangeConfirm
*/
export interface RespPurchaseOrderChangeConfirm {

    /**
     *
     * @type {PurchaseOrder}
     * @memberof RespPurchaseOrderChangeConfirm
     */
    purchaseOrder: PurchaseOrder

    /**
     *
     * @type {PoChange}
     * @memberof RespPurchaseOrderChangeConfirm
     */
    poChange: PoChange

    /**
     * 采购单变更字段内容信息
     * @type {Array<RespPurchaseOrderChangeFields>}
     * @memberof RespPurchaseOrderChangeConfirm
     */
    poChangeFields: Array<RespPurchaseOrderChangeFields>

    /**
     * 采购单变更合同信息
     * @type {Array<RespPoChangeContract>}
     * @memberof RespPurchaseOrderChangeConfirm
     */
    poChangeContracts: Array<RespPoChangeContract>

}

/**
*
* @export
* @interface ReqPurchaseOrderSearch
*/
export interface ReqPurchaseOrderSearch {

    /**
     * 页码
     * @type {number | string}
     * @memberof ReqPurchaseOrderSearch
     */
    pageNumber?: number | string

    /**
     * 每页大小
     * @type {number | string}
     * @memberof ReqPurchaseOrderSearch
     */
    pageSize?: number | string

    /**
     *
     * @type {Sort}
     * @memberof ReqPurchaseOrderSearch
     */
    sort?: Sort

    /**
     * 采购单编号
     * @type {string}
     * @memberof ReqPurchaseOrderSearch
     */
    purchaseOrderNo?: string

    /**
     * 采购单名称
     * @type {string}
     * @memberof ReqPurchaseOrderSearch
     */
    poName?: string

    /**
     * 项目Id
     * @type {number | string}
     * @memberof ReqPurchaseOrderSearch
     */
    projectId?: number | string

    /**
     * 项目编号
     * @type {string}
     * @memberof ReqPurchaseOrderSearch
     */
    projectNo?: string

    /**
     * 项目名称
     * @type {string}
     * @memberof ReqPurchaseOrderSearch
     */
    projectName?: string

    /**
     * 经销商公司Id
     * @type {number | string}
     * @memberof ReqPurchaseOrderSearch
     */
    companyId?: number | string

    /**
     * 经销商名称
     * @type {string}
     * @memberof ReqPurchaseOrderSearch
     */
    companyName?: string

    /**
     * 状态：1-待提交;2-采购单待确认;3-变更待确认;4-采购中;5-采购单完成;6-采购单关闭
     * @type {string}
     * @memberof ReqPurchaseOrderSearch
     */
    status?: string

    /**
     * 查询开始时间
     * @type {string}
     * @memberof ReqPurchaseOrderSearch
     */
    startTime?: string

    /**
     * 查询结束时间
     * @type {string}
     * @memberof ReqPurchaseOrderSearch
     */
    endTime?: string

    /**
     * 菜单code
     * @type {string}
     * @memberof ReqPurchaseOrderSearch
     */
    authCode: string

    /**
     * 工号
     * @type {string}
     * @memberof ReqPurchaseOrderSearch
     */
    jobNumber: string

    /**
     * 分部code
     * @type {string}
     * @memberof ReqPurchaseOrderSearch
     */
    subsectionCode?: string

    /**
     * 创建时间排序方式asc/desc
     * @type {string}
     * @memberof ReqPurchaseOrderSearch
     */
    createTimeOrder?: string

    /**
     * 更新时间排序方式asc/desc
     * @type {string}
     * @memberof ReqPurchaseOrderSearch
     */
    updateTimeOrder?: string

    /**
     * 公管户信息 true：已确认 false：未确认
     * @type {boolean}
     * @memberof ReqPurchaseOrderSearch
     */
    coManager?: boolean

    /**
     * 提交人
     * @type {string}
     * @memberof ReqPurchaseOrderSearch
     */
    submitBy?: string

}

/**
*
* @export
* @interface IPageRespPurchaseOrder
*/
export interface IPageRespPurchaseOrder {

    /**
     *
     * @type {Array<RespPurchaseOrder>}
     * @memberof IPageRespPurchaseOrder
     */
    records: Array<RespPurchaseOrder>

    /**
     *
     * @type {number | string}
     * @memberof IPageRespPurchaseOrder
     */
    total: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageRespPurchaseOrder
     */
    pages: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageRespPurchaseOrder
     */
    current: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageRespPurchaseOrder
     */
    size: number | string

}

/**
*
* @export
* @interface RespPurchaseOrder
*/
export interface RespPurchaseOrder {

    /**
     * 主键id
     * @type {number | string}
     * @memberof RespPurchaseOrder
     */
    id?: number | string

    /**
     * 采购单编号
     * @type {string}
     * @memberof RespPurchaseOrder
     */
    purchaseOrderNo?: string

    /**
     * 采购单名称
     * @type {string}
     * @memberof RespPurchaseOrder
     */
    poName?: string

    /**
     * 项目Id
     * @type {number | string}
     * @memberof RespPurchaseOrder
     */
    projectId?: number | string

    /**
     * 项目编号
     * @type {string}
     * @memberof RespPurchaseOrder
     */
    projectNo?: string

    /**
     * 项目名称
     * @type {string}
     * @memberof RespPurchaseOrder
     */
    projectName?: string

    /**
     * 分部名称
     * @type {string}
     * @memberof RespPurchaseOrder
     */
    subsectionName?: string

    /**
     * 经销商公司Id
     * @type {number | string}
     * @memberof RespPurchaseOrder
     */
    companyId?: number | string

    /**
     * 经销商名称
     * @type {string}
     * @memberof RespPurchaseOrder
     */
    companyName?: string

    /**
     * 采购单金额
     * @type {number | string}
     * @memberof RespPurchaseOrder
     */
    poAmount?: number | string

    /**
     * 剩余可采购额度
     * @type {number | string}
     * @memberof RespPurchaseOrder
     */
    poBalance?: number | string

    /**
     * 状态：1-待提交;2-采购单待确认;3-变更待确认;4-采购中;5-采购单完成;6-采购单关闭
     * @type {number | string}
     * @memberof RespPurchaseOrder
     */
    status?: number | string

    /**
     * 免息方式：0-无;1-1个月;2-2个月;3-3个月;4-4个月;5-5个月;6-6个月
     * @type {number | string}
     * @memberof RespPurchaseOrder
     */
    freeInterestType?: number | string

    /**
     * 签约结果：0-未知;1-确认签约完成;2-驳回
     * @type {number | string}
     * @memberof RespPurchaseOrder
     */
    signResult?: number | string

    /**
     * 签约结果备注
     * @type {string}
     * @memberof RespPurchaseOrder
     */
    remark?: string

    /**
     * 提交时间
     * @type {string}
     * @memberof RespPurchaseOrder
     */
    submitTime?: string

    /**
     * 提交人
     * @type {string}
     * @memberof RespPurchaseOrder
     */
    submitBy?: string

    /**
     * 提交人手机号
     * @type {string}
     * @memberof RespPurchaseOrder
     */
    submitPhone?: string

    /**
     * 确认人
     * @type {string}
     * @memberof RespPurchaseOrder
     */
    confirmBy?: string

    /**
     * 确认人手机号
     * @type {string}
     * @memberof RespPurchaseOrder
     */
    confirmPhone?: string

    /**
     * 确认时间
     * @type {string}
     * @memberof RespPurchaseOrder
     */
    confirmTime?: string

    /**
     * 创建人
     * @type {string}
     * @memberof RespPurchaseOrder
     */
    createBy?: string

    /**
     * 创建人手机号
     * @type {string}
     * @memberof RespPurchaseOrder
     */
    createPhone?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof RespPurchaseOrder
     */
    createTime?: string

    /**
     * 更新人
     * @type {string}
     * @memberof RespPurchaseOrder
     */
    updateBy?: string

    /**
     * 更新人手机号
     * @type {string}
     * @memberof RespPurchaseOrder
     */
    updatePhone?: string

    /**
     * 更新时间
     * @type {string}
     * @memberof RespPurchaseOrder
     */
    updateTime?: string

    /**
     * 采购批次 1：一次性采购 2：分批采购
     * @type {number | string}
     * @memberof RespPurchaseOrder
     */
    poNumber?: number | string

    /**
     * 收货地址【项目地址】
     * @type {string}
     * @memberof RespPurchaseOrder
     */
    goodsAddress?: string

    /**
     * 公管户信息 true：已确认 false：未确认
     * @type {boolean}
     * @memberof RespPurchaseOrder
     */
    coManager?: boolean

    /**
     * 质押编号
     * @type {string}
     * @memberof RespPurchaseOrder
     */
    pledgeNo?: string

}

/**
*
* @export
* @interface ApplyPaymentOrderResponse
*/
export interface ApplyPaymentOrderResponse {

    /**
     * 评审决议上游供应商，没有 则自动带出最近一次项目下支付单上游供应商数据
     * @type {Array<RespProjectPurchase>}
     * @memberof ApplyPaymentOrderResponse
     */
    respProjectPurchases: Array<RespProjectPurchase>

    /**
     * 预估借款时间(期望上游支付日期)
     * @type {string}
     * @memberof ApplyPaymentOrderResponse
     */
    estimatedLoanTime: string

    /**
     * 银行联行号
     * @type {string}
     * @memberof ApplyPaymentOrderResponse
     */
    supplierBankNo: string

    /**
     * 供应商开户行名称
     * @type {string}
     * @memberof ApplyPaymentOrderResponse
     */
    supplierAccountName: string

    /**
     * 供应商银行账号
     * @type {string}
     * @memberof ApplyPaymentOrderResponse
     */
    supplierAccountNo: string

    /**
     * 上游供应商名称
     * @type {string}
     * @memberof ApplyPaymentOrderResponse
     */
    supplierCompanyName: string

    /**
     * 上游支付方式1：转账 2：承兑
     * @type {number | string}
     * @memberof ApplyPaymentOrderResponse
     */
    supplierPaymentType: number | string

    /**
     * 费率
     * @type {number | string}
     * @memberof ApplyPaymentOrderResponse
     */
    rate: number | string

    /**
     * 剩余可支付额度
     * @type {number | string}
     * @memberof ApplyPaymentOrderResponse
     */
    poBalance: number | string

    /**
     * 最迟发货日期
     * @type {string}
     * @memberof ApplyPaymentOrderResponse
     */
    lastGoodsDate: string

    /**
     *
     * @type {JsonNode}
     * @memberof ApplyPaymentOrderResponse
     */
    salePoDetailUrl: JsonNode

    /**
     * 经销商公司Id
     * @type {number | string}
     * @memberof ApplyPaymentOrderResponse
     */
    companyId: number | string

    /**
     * 项目id
     * @type {number | string}
     * @memberof ApplyPaymentOrderResponse
     */
    projectId: number | string

    /**
     * 项目名称
     * @type {string}
     * @memberof ApplyPaymentOrderResponse
     */
    projectName: string

    /**
     * 收货地址
     * @type {string}
     * @memberof ApplyPaymentOrderResponse
     */
    goodsAddress: string

    /**
     * 采购单Id
     * @type {number | string}
     * @memberof ApplyPaymentOrderResponse
     */
    poId: number | string

    /**
     * 采购批次
     * @type {number | string}
     * @memberof ApplyPaymentOrderResponse
     */
    poNumber: number | string

    /**
     * 销售毛利率
     * @type {number | string}
     * @memberof ApplyPaymentOrderResponse
     */
    salesGrossMargin: number | string

    /**
     * 最近一次支付单的采购折让(%)
     * @type {number | string}
     * @memberof ApplyPaymentOrderResponse
     */
    purchaseDiscountRate: number | string

    /**
     * 项目采购信息配置是否空
     * @type {boolean}
     * @memberof ApplyPaymentOrderResponse
     */
    projectPurchasesIsNull: boolean

}

/**
*
* @export
* @interface ReqPurchaseOrderAppletsSearch
*/
export interface ReqPurchaseOrderAppletsSearch {

    /**
     * 页码
     * @type {number | string}
     * @memberof ReqPurchaseOrderAppletsSearch
     */
    pageNumber?: number | string

    /**
     * 每页大小
     * @type {number | string}
     * @memberof ReqPurchaseOrderAppletsSearch
     */
    pageSize?: number | string

    /**
     *
     * @type {Sort}
     * @memberof ReqPurchaseOrderAppletsSearch
     */
    sort?: Sort

    /**
     * 用户id
     * @type {number | string}
     * @memberof ReqPurchaseOrderAppletsSearch
     */
    userId: number | string

    /**
     * 公司id
     * @type {number | string}
     * @memberof ReqPurchaseOrderAppletsSearch
     */
    companyId: number | string

}

/**
*
* @export
* @interface ReqPurchaseOrderContractQuery
*/
export interface ReqPurchaseOrderContractQuery {

    /**
     * 采购单id
     * @type {number | string}
     * @memberof ReqPurchaseOrderContractQuery
     */
    purchaseOrderId?: number | string

    /**
     * 合同id
     * @type {number | string}
     * @memberof ReqPurchaseOrderContractQuery
     */
    contractId?: number | string

    /**
     * 生效状态：0-待生效;1-生效中;2-已失效
     * @type {number | string}
     * @memberof ReqPurchaseOrderContractQuery
     */
    effectiveState?: number | string

    /**
     * 生效状态集合：0-待生效;1-生效中;2-已失效
     * @type {Array<number | string>}
     * @memberof ReqPurchaseOrderContractQuery
     */
    effectiveStatus?: Array<number | string>

    /**
     * 采购单id集合
     * @type {Array<number | string>}
     * @memberof ReqPurchaseOrderContractQuery
     */
    purchaseOrderIds?: Array<number | string>

    /**
     * 合同状态
     * @type {number | string}
     * @memberof ReqPurchaseOrderContractQuery
     */
    contractStatus?: number | string

    /**
     * 当前合同id，用于查询非当前合同id的其它合同列表
     * @type {number | string}
     * @memberof ReqPurchaseOrderContractQuery
     */
    neContractId?: number | string

    /**
     * 合同类型
     * @type {number | string}
     * @memberof ReqPurchaseOrderContractQuery
     */
    contractTypeId?: number | string

    /**
     * 合同id集合
     * @type {Array<number | string>}
     * @memberof ReqPurchaseOrderContractQuery
     */
    contractIds?: Array<number | string>

}

/**
* 合同统计信息
* @export
* @interface ContractTotalResponse
*/
export interface ContractTotalResponse {

    /**
     * 合同总数
     * @type {number | string}
     * @memberof ContractTotalResponse
     */
    contractTotal?: number | string

    /**
     * 合同生效中
     * @type {number | string}
     * @memberof ContractTotalResponse
     */
    effectNumber?: number | string

    /**
     * 提醒客户签署合同
     * @type {boolean}
     * @memberof ContractTotalResponse
     */
    contractSign?: boolean

}

/**
* 支付单与账单统计信息
* @export
* @interface PaymentOrderAndFundTotalResponse
*/
export interface PaymentOrderAndFundTotalResponse {

    /**
     * 支付单已申请金额（元）
     * @type {number | string}
     * @memberof PaymentOrderAndFundTotalResponse
     */
    applyAmount?: number | string

    /**
     * 支付单已采购金额（元）[已经上游支付的金额]
     * @type {number | string}
     * @memberof PaymentOrderAndFundTotalResponse
     */
    upstreamPaidAmount?: number | string

    /**
     * 支付单今日有付款[当系统日期当天有上游支付时]
     * @type {boolean}
     * @memberof PaymentOrderAndFundTotalResponse
     */
    upstreamPay?: boolean

    /**
     * 账单待支付金额（元）
     * @type {number | string}
     * @memberof PaymentOrderAndFundTotalResponse
     */
    unPaidAmount?: number | string

    /**
     * 账单已支付金额（元）
     * @type {number | string}
     * @memberof PaymentOrderAndFundTotalResponse
     */
    paidAmount?: number | string

    /**
     * 近三天有待支付账单
     * @type {boolean}
     * @memberof PaymentOrderAndFundTotalResponse
     */
    threeDaysPay?: boolean

}

/**
*
* @export
* @interface ProjectTotalResponse
*/
export interface ProjectTotalResponse {

    /**
     *
     * @type {ContractTotalResponse}
     * @memberof ProjectTotalResponse
     */
    contractTotalResponse: ContractTotalResponse

    /**
     *
     * @type {PurchaseOrderSignTotalResponse}
     * @memberof ProjectTotalResponse
     */
    purchaseOrderSignTotalResponse: PurchaseOrderSignTotalResponse

    /**
     *
     * @type {PaymentOrderAndFundTotalResponse}
     * @memberof ProjectTotalResponse
     */
    paymentOrderAndFundTotalResponse: PaymentOrderAndFundTotalResponse

}

/**
* 采购单统计信息
* @export
* @interface PurchaseOrderSignTotalResponse
*/
export interface PurchaseOrderSignTotalResponse {

    /**
     * 采购单已签约金额（元）
     * @type {number | string}
     * @memberof PurchaseOrderSignTotalResponse
     */
    signAmount?: number | string

    /**
     * 采购单已签约（笔）
     * @type {number | string}
     * @memberof PurchaseOrderSignTotalResponse
     */
    signNumber?: number | string

    /**
     * 有待采购订单
     * @type {boolean}
     * @memberof PurchaseOrderSignTotalResponse
     */
    purchaseOrderSign?: boolean

}

/**
*
* @export
* @interface IPagePrepaymentResponse
*/
export interface IPagePrepaymentResponse {

    /**
     *
     * @type {Array<PrepaymentResponse>}
     * @memberof IPagePrepaymentResponse
     */
    records: Array<PrepaymentResponse>

    /**
     *
     * @type {number | string}
     * @memberof IPagePrepaymentResponse
     */
    total: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPagePrepaymentResponse
     */
    pages: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPagePrepaymentResponse
     */
    current: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPagePrepaymentResponse
     */
    size: number | string

}

/**
*
* @export
* @interface PrepaymentResponse
*/
export interface PrepaymentResponse {

    /**
     * 上游预付款id
     * @type {number | string}
     * @memberof PrepaymentResponse
     */
    id?: number | string

    /**
     * 上游预付款编号
     * @type {string}
     * @memberof PrepaymentResponse
     */
    prepaymentNo?: string

    /**
     * 项目名称
     * @type {string}
     * @memberof PrepaymentResponse
     */
    projectName?: string

    /**
     * 经销商
     * @type {string}
     * @memberof PrepaymentResponse
     */
    distributor?: string

    /**
     * 分部编码
     * @type {string}
     * @memberof PrepaymentResponse
     */
    subsectionCode?: string

    /**
     * 分部名称
     * @type {string}
     * @memberof PrepaymentResponse
     */
    subsectionName?: string

    /**
     * 1待项目运营审核、2流程审批中 3上游预付款待支付 4 上游预付款单完成 5上游预付款待核销 6 上游预付款已核销 7上游预付款单关闭
     * @type {number | string}
     * @memberof PrepaymentResponse
     */
    status?: number | string

    /**
     * 核销采购单编号
     * @type {string}
     * @memberof PrepaymentResponse
     */
    purchaseOrderNo?: string

    /**
     * 申请金额
     * @type {number | string}
     * @memberof PrepaymentResponse
     */
    applyAmount?: number | string

    /**
     * 申请人
     * @type {string}
     * @memberof PrepaymentResponse
     */
    applyUser?: string

    /**
     * 申请人手机号
     * @type {string}
     * @memberof PrepaymentResponse
     */
    applyUserPhone?: string

    /**
     * 申请时间
     * @type {string}
     * @memberof PrepaymentResponse
     */
    applyTime?: string

    /**
     * 更新时间
     * @type {string}
     * @memberof PrepaymentResponse
     */
    updateTime?: string

    /**
     * 下一节点审批人
     * @type {string}
     * @memberof PrepaymentResponse
     */
    nextApprover?: string

    /**
     * 网银支付按钮展示
     * @type {boolean}
     * @memberof PrepaymentResponse
     */
    showOnlineBank?: boolean

    /**
     * 支付类型
     * @type {number | string}
     * @memberof PrepaymentResponse
     */
    paymentType?: number | string

    /**
     * 账单id
     * @type {number | string}
     * @memberof PrepaymentResponse
     */
    fundId?: number | string

    /**
     * 已支付金额
     * @type {number | string}
     * @memberof PrepaymentResponse
     */
    paidAmount?: number | string

    /**
     * 支付待确认金额
     * @type {number | string}
     * @memberof PrepaymentResponse
     */
    confirmAmount?: number | string

    /**
     * 账单支付方式:1-银行转帐;2-银行承兑
     * @type {number | string}
     * @memberof PrepaymentResponse
     */
    fundPaymentType?: number | string

    /**
     * 上游支付方式 1-银行转帐;2-银行承兑
     * @type {number | string}
     * @memberof PrepaymentResponse
     */
    supplierPaymentType?: number | string

}

/**
*
* @export
* @interface ProjectInfoResponse
*/
export interface ProjectInfoResponse {

    /**
     * 项目id
     * @type {number | string}
     * @memberof ProjectInfoResponse
     */
    projectId: number | string

    /**
     * 项目名称
     * @type {string}
     * @memberof ProjectInfoResponse
     */
    projectName: string

    /**
     * 经销商id
     * @type {number | string}
     * @memberof ProjectInfoResponse
     */
    companyId: number | string

    /**
     * 经销商
     * @type {string}
     * @memberof ProjectInfoResponse
     */
    companyName: string

    /**
     * 项目终审采购信息-上游供应商
     * @type {Array<RespProjectPurchase>}
     * @memberof ProjectInfoResponse
     */
    respProjectPurchases: Array<RespProjectPurchase>

    /**
     * 预估借款时间(期望上游支付日期)
     * @type {string}
     * @memberof ProjectInfoResponse
     */
    estimatedLoanTime: string

    /**
     * 银行联行号
     * @type {string}
     * @memberof ProjectInfoResponse
     */
    supplierBankNo: string

    /**
     * 供应商开户行名称
     * @type {string}
     * @memberof ProjectInfoResponse
     */
    supplierAccountName: string

    /**
     * 供应商银行账号
     * @type {string}
     * @memberof ProjectInfoResponse
     */
    supplierAccountNo: string

    /**
     * 上游供应商名称
     * @type {string}
     * @memberof ProjectInfoResponse
     */
    supplierCompanyName: string

    /**
     * 上游支付方式1：转账 2：承兑
     * @type {number | string}
     * @memberof ProjectInfoResponse
     */
    supplierPaymentType: number | string

}

/**
* 预付款账单
* @export
* @interface FundClaimResponse
*/
export interface FundClaimResponse {

    /**
     * 账单id
     * @type {number | string}
     * @memberof FundClaimResponse
     */
    fundId: number | string

    /**
     * 账单金额
     * @type {number | string}
     * @memberof FundClaimResponse
     */
    fundAmount: number | string

    /**
     * 实际支付金额（已支付金额）
     * @type {number | string}
     * @memberof FundClaimResponse
     */
    paidAmount: number | string

    /**
     * 支付待确认金额
     * @type {number | string}
     * @memberof FundClaimResponse
     */
    unconfirmedAmount: number | string

    /**
     * 待支付金额
     * @type {number | string}
     * @memberof FundClaimResponse
     */
    unpaidAmount: number | string

    /**
     * 预计应收金额
     * @type {number | string}
     * @memberof FundClaimResponse
     */
    receivableAmount: number | string

    /**
     * 还款类型：1-首付款；2-剩余货款；3-服务费；4-预付款
     * @type {number | string}
     * @memberof FundClaimResponse
     */
    repaymentType: number | string

    /**
     * 支付状态：0-待支付；1-支付待确认；2-已支付；3-支付失败；4-已取消
     * @type {number | string}
     * @memberof FundClaimResponse
     */
    paymentFlag: number | string

    /**
     * 实际支付日期
     * @type {string}
     * @memberof FundClaimResponse
     */
    paidDate: string

    /**
     * 支付（成功/失败）时间
     * @type {string}
     * @memberof FundClaimResponse
     */
    paidTime: string

    /**
     * 项目
     * @type {string}
     * @memberof FundClaimResponse
     */
    projectName: string

    /**
     * 经销商
     * @type {string}
     * @memberof FundClaimResponse
     */
    companyName: string

    /**
     * 经销商id
     * @type {number | string}
     * @memberof FundClaimResponse
     */
    companyId: number | string

    /**
     * 应支付日期
     * @type {string}
     * @memberof FundClaimResponse
     */
    schedulePaymentDate: string

    /**
     *
     * @type {number | string}
     * @memberof FundClaimResponse
     */
    orderId: number | string

}

/**
*
* @export
* @interface PrepaymentDetailResponse
*/
export interface PrepaymentDetailResponse {

    /**
     * 上游预付款id
     * @type {number | string}
     * @memberof PrepaymentDetailResponse
     */
    id: number | string

    /**
     * 上游预付款编号
     * @type {string}
     * @memberof PrepaymentDetailResponse
     */
    prepaymentNo: string

    /**
     * 付款主体MisCode
     * @type {string}
     * @memberof PrepaymentDetailResponse
     */
    paymentMisCode: string

    /**
     * 付款主体名称
     * @type {string}
     * @memberof PrepaymentDetailResponse
     */
    paymentCompanyName: string

    /**
     * 项目id
     * @type {number | string}
     * @memberof PrepaymentDetailResponse
     */
    projectId: number | string

    /**
     * 项目名称
     * @type {string}
     * @memberof PrepaymentDetailResponse
     */
    projectName: string

    /**
     * 经销商
     * @type {string}
     * @memberof PrepaymentDetailResponse
     */
    distributor: string

    /**
     * 分部编码
     * @type {string}
     * @memberof PrepaymentDetailResponse
     */
    subsectionCode: string

    /**
     * 分部名称
     * @type {string}
     * @memberof PrepaymentDetailResponse
     */
    subsectionName: string

    /**
     *  -1待分财审核, 0预付款待支付(下游)，1.待项目运营审核、2流程审批中 3预付款待支付（上游） 4 上游预付款单完成 5上游预付款待核销 6 上游预付款已核销 7上游预付款单关闭
     * @type {number | string}
     * @memberof PrepaymentDetailResponse
     */
    status: number | string

    /**
     * 核销采购单id
     * @type {number | string}
     * @memberof PrepaymentDetailResponse
     */
    purchaseOrderId: number | string

    /**
     * 申请金额
     * @type {number | string}
     * @memberof PrepaymentDetailResponse
     */
    applyAmount: number | string

    /**
     * 申请备注
     * @type {string}
     * @memberof PrepaymentDetailResponse
     */
    applyRemark: string

    /**
     * 申请人
     * @type {string}
     * @memberof PrepaymentDetailResponse
     */
    applyUser: string

    /**
     *
     * @type {string}
     * @memberof PrepaymentDetailResponse
     */
    applyUserPhone: string

    /**
     * 申请时间
     * @type {string}
     * @memberof PrepaymentDetailResponse
     */
    applyTime: string

    /**
     * 核销状态 1.未核销，2.部分核销，3.已核销
     * @type {number | string}
     * @memberof PrepaymentDetailResponse
     */
    writeOffStatus: number | string

    /**
     * 核销时间
     * @type {string}
     * @memberof PrepaymentDetailResponse
     */
    writeOffTime: string

    /**
     * 核销原因（备注）
     * @type {string}
     * @memberof PrepaymentDetailResponse
     */
    writeOffRemark: string

    /**
     * 核销人
     * @type {string}
     * @memberof PrepaymentDetailResponse
     */
    writeOffUser: string

    /**
     * 上游供应商公司Id
     * @type {number | string}
     * @memberof PrepaymentDetailResponse
     */
    supplierCompanyId: number | string

    /**
     * 上游供应商名称
     * @type {string}
     * @memberof PrepaymentDetailResponse
     */
    supplierCompanyName: string

    /**
     * 银行联行号
     * @type {string}
     * @memberof PrepaymentDetailResponse
     */
    supplierBankNo: string

    /**
     * 供应商开户行名称
     * @type {string}
     * @memberof PrepaymentDetailResponse
     */
    supplierAccountName: string

    /**
     * 供应商银行账号
     * @type {string}
     * @memberof PrepaymentDetailResponse
     */
    supplierAccountNo: string

    /**
     * 期望上游支付日期
     * @type {string}
     * @memberof PrepaymentDetailResponse
     */
    expectSupplierPaymentDate: string

    /**
     * 上游支付方式:1-银行转帐;2-银行承兑
     * @type {number | string}
     * @memberof PrepaymentDetailResponse
     */
    supplierPaymentType: number | string

    /**
     * 项目运营审核结果:1-通过;2-不通过
     * @type {number | string}
     * @memberof PrepaymentDetailResponse
     */
    approvalStatus: number | string

    /**
     * 项目运营审核人
     * @type {string}
     * @memberof PrepaymentDetailResponse
     */
    approvalUser: string

    /**
     * 项目运营审核人手机号
     * @type {string}
     * @memberof PrepaymentDetailResponse
     */
    approvalPhone: string

    /**
     * 项目运营审核时间
     * @type {string}
     * @memberof PrepaymentDetailResponse
     */
    approvalTime: string

    /**
     * 项目运营审核备注
     * @type {string}
     * @memberof PrepaymentDetailResponse
     */
    approvalRemark: string

    /**
     * 应支付金额
     * @type {number | string}
     * @memberof PrepaymentDetailResponse
     */
    totalAmount: number | string

    /**
     * 剩余应支付金额
     * @type {number | string}
     * @memberof PrepaymentDetailResponse
     */
    surplusAmount: number | string

    /**
     * 已支付金额
     * @type {number | string}
     * @memberof PrepaymentDetailResponse
     */
    paidAmount: number | string

    /**
     * 上游支付明细
     * @type {Array<RespSupplierDetail>}
     * @memberof PrepaymentDetailResponse
     */
    supplierDetails: Array<RespSupplierDetail>

    /**
     * 预付款支付明细
     * @type {Array<RespSupplierDetail>}
     * @memberof PrepaymentDetailResponse
     */
    prepaymentDetails: Array<RespSupplierDetail>

    /**
     * 分财审核结果:1-通过;2-不通过
     * @type {number | string}
     * @memberof PrepaymentDetailResponse
     */
    financeApprovalStatus: number | string

    /**
     * 分财审核人
     * @type {string}
     * @memberof PrepaymentDetailResponse
     */
    financeApprovalUser: string

    /**
     * 分财审核人手机号
     * @type {string}
     * @memberof PrepaymentDetailResponse
     */
    financeApprovalPhone: string

    /**
     * 分财审核时间
     * @type {string}
     * @memberof PrepaymentDetailResponse
     */
    financeApprovalTime: string

    /**
     * 分财审核备注
     * @type {string}
     * @memberof PrepaymentDetailResponse
     */
    financeApprovalRemark: string

    /**
     * 下一节点审批人
     * @type {string}
     * @memberof PrepaymentDetailResponse
     */
    nextApprover: string

    /**
     * 支付类型
     * @type {number | string}
     * @memberof PrepaymentDetailResponse
     */
    paymentType: number | string

    /**
     * 司库上游支付
     * @type {boolean}
     * @memberof PrepaymentDetailResponse
     */
    showSaasButton: boolean

    /**
     * 上游预付款附件信息
     * @type {Array<AttachDoc>}
     * @memberof PrepaymentDetailResponse
     */
    attachDocList: Array<AttachDoc>

    /**
     * 实际支付时间（支付成功时间）
     * @type {string}
     * @memberof PrepaymentDetailResponse
     */
    paidTime: string

    /**
     * 账单fundId
     * @type {number | string}
     * @memberof PrepaymentDetailResponse
     */
    fundId: number | string

    /**
     *
     * @type {FundClaimResponse}
     * @memberof PrepaymentDetailResponse
     */
    fund: FundClaimResponse

}

/**
*
* @export
* @interface PrepaymentWriteOffResponse
*/
export interface PrepaymentWriteOffResponse {

    /**
     * 上游预付款id
     * @type {number | string}
     * @memberof PrepaymentWriteOffResponse
     */
    id: number | string

    /**
     * 上游预付款编号
     * @type {string}
     * @memberof PrepaymentWriteOffResponse
     */
    prepaymentNo: string

    /**
     * 申请金额
     * @type {number | string}
     * @memberof PrepaymentWriteOffResponse
     */
    applyAmount: number | string

}

/**
*
* @export
* @interface PrepaymentConditionRequest
*/
export interface PrepaymentConditionRequest {

    /**
     * 预付款编号
     * @type {string}
     * @memberof PrepaymentConditionRequest
     */
    prepaymentNo?: string

    /**
     * 项目名称
     * @type {string}
     * @memberof PrepaymentConditionRequest
     */
    projectName?: string

    /**
     * 经销商
     * @type {string}
     * @memberof PrepaymentConditionRequest
     */
    distributorName?: string

    /**
     * 分部编码
     * @type {string}
     * @memberof PrepaymentConditionRequest
     */
    subsectionCode?: string

    /**
     * -1. 待分财审核，
1. 待项目运营审核，
2. 流程审批中 ，
0. 预付款待支付(下游),
8. 支付待确认(下游)，
3. 预付款待支付(上游)，
4. 预付款支付单完成 ，
5. 预付款待核销 ，
6. 预付款已核销 ，
7. 预付款支付单关闭 ，
PS: 状态流转按照以上顺序
     * @type {number | string}
     * @memberof PrepaymentConditionRequest
     */
    status?: number | string

    /**
     * 申请人
     * @type {string}
     * @memberof PrepaymentConditionRequest
     */
    applyUser?: string

    /**
     * 申请时间(开始)
     * @type {string}
     * @memberof PrepaymentConditionRequest
     */
    applyTimeStart?: string

    /**
     * 申请时间(结束)
     * @type {string}
     * @memberof PrepaymentConditionRequest
     */
    applyTimeEnd?: string

    /**
     * 权限code
     * @type {string}
     * @memberof PrepaymentConditionRequest
     */
    authCode?: string

    /**
     * 工号
     * @type {string}
     * @memberof PrepaymentConditionRequest
     */
    jobNumber?: string

    /**
     * 当前登录人的分部编码
     * @type {string}
     * @memberof PrepaymentConditionRequest
     */
    deptCode?: string

    /**
     * 支付类型 1.货款，2.费用
     * @type {number | string}
     * @memberof PrepaymentConditionRequest
     */
    paymentType?: number | string

}

/**
*
* @export
* @interface ReqBasePage
*/
export interface ReqBasePage {

    /**
     * 页码
     * @type {number | string}
     * @memberof ReqBasePage
     */
    pageNumber?: number | string

    /**
     * 每页大小
     * @type {number | string}
     * @memberof ReqBasePage
     */
    pageSize?: number | string

    /**
     *
     * @type {Sort}
     * @memberof ReqBasePage
     */
    sort?: Sort

}

/**
*
* @export
* @interface ReqPaymentOrderQuery
*/
export interface ReqPaymentOrderQuery {

    /**
     *
     * @type {string}
     * @memberof ReqPaymentOrderQuery
     */
    startApplyDate?: string

    /**
     *
     * @type {string}
     * @memberof ReqPaymentOrderQuery
     */
    endApplyDate?: string

    /**
     *
     * @type {string}
     * @memberof ReqPaymentOrderQuery
     */
    paymentOrderNo?: string

    /**
     *
     * @type {string}
     * @memberof ReqPaymentOrderQuery
     */
    purchaseOrderNo?: string

    /**
     *
     * @type {string}
     * @memberof ReqPaymentOrderQuery
     */
    purchaseOrderName?: string

    /**
     *
     * @type {string}
     * @memberof ReqPaymentOrderQuery
     */
    dealerCompanyName?: string

    /**
     *
     * @type {string}
     * @memberof ReqPaymentOrderQuery
     */
    deptName?: string

    /**
     *
     * @type {Array<number | string>}
     * @memberof ReqPaymentOrderQuery
     */
    status?: Array<number | string>

    /**
     *
     * @type {number | string}
     * @memberof ReqPaymentOrderQuery
     */
    userId?: number | string

    /**
     *
     * @type {number | string}
     * @memberof ReqPaymentOrderQuery
     */
    companyId?: number | string

    /**
     *
     * @type {string}
     * @memberof ReqPaymentOrderQuery
     */
    customerUserId?: string

    /**
     *
     * @type {Array<number | string>}
     * @memberof ReqPaymentOrderQuery
     */
    userIdList?: Array<number | string>

    /**
     * 菜单code
     * @type {string}
     * @memberof ReqPaymentOrderQuery
     */
    authCode?: string

    /**
     * 工号
     * @type {string}
     * @memberof ReqPaymentOrderQuery
     */
    jobNumber?: string

    /**
     * 分部code
     * @type {string}
     * @memberof ReqPaymentOrderQuery
     */
    subsectionCode?: string

    /**
     * 工程id列表
     * @type {Array<number | string>}
     * @memberof ReqPaymentOrderQuery
     */
    projectIds?: Array<number | string>

    /**
     * 下游合作方式:1-垫资代采;2-代收代付
     * @type {number | string}
     * @memberof ReqPaymentOrderQuery
     */
    dealerCooperationMethod?: number | string

    /**
     * 确认函是否已签署0=false,1=true
     * @type {boolean}
     * @memberof ReqPaymentOrderQuery
     */
    sign?: boolean

    /**
     * 申请人
     * @type {string}
     * @memberof ReqPaymentOrderQuery
     */
    applyName?: string

    /**
     *
     * @type {string}
     * @memberof ReqPaymentOrderQuery
     */
    startApprovalTime?: string

    /**
     *
     * @type {string}
     * @memberof ReqPaymentOrderQuery
     */
    endApprovalTime?: string

    /**
     * 项目名称
     * @type {string}
     * @memberof ReqPaymentOrderQuery
     */
    projectName?: string

    /**
     * 放款交接状态 1：:待对接 2：已对接
     * @type {number | string}
     * @memberof ReqPaymentOrderQuery
     */
    loanTransferStatus?: number | string

    /**
     * 上游支付进度 1：待支付 2：部分支付 3：已支付
     * @type {number | string}
     * @memberof ReqPaymentOrderQuery
     */
    paymentStatus?: number | string

    /**
     * 付款主体
     * @type {string}
     * @memberof ReqPaymentOrderQuery
     */
    paymentMain?: string

}

/**
*
* @export
* @interface IPageRespPaymentOrders
*/
export interface IPageRespPaymentOrders {

    /**
     *
     * @type {Array<RespPaymentOrders>}
     * @memberof IPageRespPaymentOrders
     */
    records: Array<RespPaymentOrders>

    /**
     *
     * @type {number | string}
     * @memberof IPageRespPaymentOrders
     */
    total: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageRespPaymentOrders
     */
    pages: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageRespPaymentOrders
     */
    current: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageRespPaymentOrders
     */
    size: number | string

}

/**
*
* @export
* @interface RespPaymentOrders
*/
export interface RespPaymentOrders {

    /**
     * 支付单id
     * @type {number | string}
     * @memberof RespPaymentOrders
     */
    id?: number | string

    /**
     * 项目id
     * @type {string}
     * @memberof RespPaymentOrders
     */
    projectId?: string

    /**
     * 项目名称
     * @type {string}
     * @memberof RespPaymentOrders
     */
    projectName?: string

    /**
     * 申请金额
     * @type {string}
     * @memberof RespPaymentOrders
     */
    applyAmount?: string

    /**
     * 更新时间
     * @type {string}
     * @memberof RespPaymentOrders
     */
    updateTime?: string

    /**
     * 采购单id
     * @type {string}
     * @memberof RespPaymentOrders
     */
    poId?: string

    /**
     * 申请日期时间
     * @type {string}
     * @memberof RespPaymentOrders
     */
    applyDate?: string

    /**
     * 支付单编号
     * @type {string}
     * @memberof RespPaymentOrders
     */
    paymentOrderNo?: string

    /**
     * 采购单编号
     * @type {string}
     * @memberof RespPaymentOrders
     */
    purchaseOrderNo?: string

    /**
     * 采购单名称
     * @type {string}
     * @memberof RespPaymentOrders
     */
    purchaseOrderName?: string

    /**
     * 经销商名称（企业名称）
     * @type {string}
     * @memberof RespPaymentOrders
     */
    dealerCompanyName?: string

    /**
     * 所属分部名称
     * @type {string}
     * @memberof RespPaymentOrders
     */
    deptName?: string

    /**
     * 状态：
	 * 状态：0-待项目运营审核;
	 * 1-首付款待支付;
	 * 2-首付款待确认;
	 * 3-上游支付确认中;
	 * 4-上游支付中;
	 * 5--待出票;
	 * 6-正在出票;
	 * 7-待发货;
	 * 8-待收货;
	 * 9-剩余货款待支付;
	 * 10-剩余货款待确认;
	 * 11-支付单完成;
	 * 12-支付单关闭;
	 * 13-支付单取消;
	 * 14-待分财审核;
	 * 15-支付单审核中;

     * @type {number | string}
     * @memberof RespPaymentOrders
     */
    status?: number | string

    /**
     * 上游可支付标识：0-不可支付，1-可支付
     * @type {number | string}
     * @memberof RespPaymentOrders
     */
    supplierPayFlag?: number | string

    /**
     * 确认收货标识：0-不可收货，1-可收货
     * @type {number | string}
     * @memberof RespPaymentOrders
     */
    goodsConfirmFlag?: number | string

    /**
     * 下游合作方式:1-垫资代采;2-代收代付
     * @type {number | string}
     * @memberof RespPaymentOrders
     */
    dealerCooperationMethod?: number | string

    /**
     * 确认函合同是否已签署
     * @type {boolean}
     * @memberof RespPaymentOrders
     */
    sign?: boolean

    /**
     * 操作按钮 1.发起放款交接，2.查看放款交接
     * @type {number | string}
     * @memberof RespPaymentOrders
     */
    operateStatus?: number | string

    /**
     * 申请人
     * @type {string}
     * @memberof RespPaymentOrders
     */
    applyName?: string

    /**
     * 申请人手机号
     * @type {string}
     * @memberof RespPaymentOrders
     */
    applyPhone?: string

    /**
     * 公司id
     * @type {number | string}
     * @memberof RespPaymentOrders
     */
    companyId?: number | string

    /**
     *
     * @type {string}
     * @memberof RespPaymentOrders
     */
    approvalTime?: string

    /**
     * 放款交接状态 1：:待对接 2：已对接
     * @type {number | string}
     * @memberof RespPaymentOrders
     */
    loanTransferStatus?: number | string

    /**
     * 放款交接日期
     * @type {string}
     * @memberof RespPaymentOrders
     */
    loanTransferDate?: string

    /**
     * 上游支付状态 1：待支付 2：部分支付 3：已支付 4：已取消
     * @type {number | string}
     * @memberof RespPaymentOrders
     */
    paymentStatus?: number | string

    /**
     * 已支付金额
     * @type {number | string}
     * @memberof RespPaymentOrders
     */
    paidAmount?: number | string

    /**
     * 应支付总额
     * @type {number | string}
     * @memberof RespPaymentOrders
     */
    totalAmount?: number | string

    /**
     * 是否展示取消支付单
     * @type {boolean}
     * @memberof RespPaymentOrders
     */
    showCancel?: boolean

    /**
     * 钉钉审批流下一节点审批人
     * @type {string}
     * @memberof RespPaymentOrders
     */
    dingNextApprover?: string

    /**
     * 付款主体
     * @type {string}
     * @memberof RespPaymentOrders
     */
    paymentMain?: string

    /**
     * 首付款账单id
     * @type {number | string}
     * @memberof RespPaymentOrders
     */
    advanceId?: number | string

    /**
     * 尾款账单id
     * @type {number | string}
     * @memberof RespPaymentOrders
     */
    arreaFundId?: number | string

    /**
     * 上游支付同步Saas处理结果
     * @type {number | string}
     * @memberof RespPaymentOrders
     */
    syncSaasTrade?: number | string

}

/**
* 票面金额详情
* @export
* @interface BillAmountDetail
*/
export interface BillAmountDetail {

    /**
     *
     * @type {number | string}
     * @memberof BillAmountDetail
     */
    id?: number | string

    /**
     *
     * @type {number | string}
     * @memberof BillAmountDetail
     */
    billAmountId?: number | string

    /**
     *
     * @type {number | string}
     * @memberof BillAmountDetail
     */
    number?: number | string

    /**
     *
     * @type {number | string}
     * @memberof BillAmountDetail
     */
    amount?: number | string

}

/**
* 票面金额
* @export
* @interface BillAmountResponse
*/
export interface BillAmountResponse {

    /**
     * 票面金额提交人
     * @type {string}
     * @memberof BillAmountResponse
     */
    billAmountCreateBy: string

    /**
     * 票面金额提交时间
     * @type {string}
     * @memberof BillAmountResponse
     */
    billAmountCreateTime: string

    /**
     * 票面金额详情
     * @type {Array<BillAmountDetail>}
     * @memberof BillAmountResponse
     */
    billAmountDetail: Array<BillAmountDetail>

    /**
     * 合计
     * @type {number | string}
     * @memberof BillAmountResponse
     */
    totalAmount: number | string

}

/**
* 认领记录
* @export
* @interface FundBankReceiptRecord
*/
export interface FundBankReceiptRecord {

    /**
     * 主键id
     * @type {number | string}
     * @memberof FundBankReceiptRecord
     */
    id: number | string

    /**
     * 账单id
     * @type {number | string}
     * @memberof FundBankReceiptRecord
     */
    fundId: number | string

    /**
     * 银行清单id
     * @type {number | string}
     * @memberof FundBankReceiptRecord
     */
    receiptId: number | string

    /**
     * 收款账号
     * @type {string}
     * @memberof FundBankReceiptRecord
     */
    bankAccountNo: string

    /**
     * 账单明细id
     * @type {number | string}
     * @memberof FundBankReceiptRecord
     */
    fundDetailId: number | string

    /**
     * 账单类型 1：首付款 2：尾款 3：服务费 4：预付款
     * @type {number | string}
     * @memberof FundBankReceiptRecord
     */
    fundType: number | string

    /**
     * 收款方
     * @type {string}
     * @memberof FundBankReceiptRecord
     */
    receiptName: string

    /**
     * 认领人
     * @type {string}
     * @memberof FundBankReceiptRecord
     */
    receiptUser: string

    /**
     * 认领时间/取消认领时间
     * @type {string}
     * @memberof FundBankReceiptRecord
     */
    receiptTime: string

    /**
     * 认领手机号/取消认领手机号
     * @type {string}
     * @memberof FundBankReceiptRecord
     */
    receiptPhone: string

    /**
     * 认领账单流水号/取消认领流水号
     * @type {string}
     * @memberof FundBankReceiptRecord
     */
    billNo: string

    /**
     * 认领的金额/取消认领金额
     * @type {number | string}
     * @memberof FundBankReceiptRecord
     */
    receiptAmount: number | string

    /**
     * 认领方式 1:凭证线下审核 2：手动认领流水 3：系统自动认领 4：手动认领 5：手动取消 6：支付单/预付款支付单取消
     * @type {number | string}
     * @memberof FundBankReceiptRecord
     */
    receiptType: number | string

    /**
     * 付款方
     * @type {string}
     * @memberof FundBankReceiptRecord
     */
    payeeName: string

    /**
     * 付款方公司id
     * @type {number | string}
     * @memberof FundBankReceiptRecord
     */
    payeeCompanyId: number | string

    /**
     * 付款公司管理员手机号
     * @type {string}
     * @memberof FundBankReceiptRecord
     */
    payeeCompanyMobile: string

    /**
     * 付款公司地址
     * @type {string}
     * @memberof FundBankReceiptRecord
     */
    payeeCompanyAddress: string

    /**
     * 付款公司银行
     * @type {string}
     * @memberof FundBankReceiptRecord
     */
    payeeBank: string

    /**
     * 付款公司银行账号
     * @type {string}
     * @memberof FundBankReceiptRecord
     */
    payeeBankAccount: string

    /**
     * 付款公司编码
     * @type {string}
     * @memberof FundBankReceiptRecord
     */
    deptcode: string

    /**
     * 收款银行
     * @type {string}
     * @memberof FundBankReceiptRecord
     */
    receiptBankName: string

}

/**
* 服务费明细
* @export
* @interface FundDetailResponse
*/
export interface FundDetailResponse {

    /**
     * 主键id
     * @type {number | string}
     * @memberof FundDetailResponse
     */
    id: number | string

    /**
     * 账单id
     * @type {number | string}
     * @memberof FundDetailResponse
     */
    fundId: number | string

    /**
     * 支付金额
     * @type {number | string}
     * @memberof FundDetailResponse
     */
    paymentAmount: number | string

    /**
     * 支付状态 1：支付待确认 2：已支付 3：支付并未收到
     * @type {number | string}
     * @memberof FundDetailResponse
     */
    paymentFlag: number | string

    /**
     * 支付确认时间
     * @type {string}
     * @memberof FundDetailResponse
     */
    paymentConfirmTime: string

    /**
     * 是否批量支付
     * @type {boolean}
     * @memberof FundDetailResponse
     */
    payBatch: boolean

    /**
     * 支付凭证
     * @type {Array<AttachDocResponse>}
     * @memberof FundDetailResponse
     */
    attachDocResponseList: Array<AttachDocResponse>

    /**
     * 创建人
     * @type {string}
     * @memberof FundDetailResponse
     */
    createBy: string

    /**
     * 创建时间
     * @type {string}
     * @memberof FundDetailResponse
     */
    createTime: string

    /**
     * 创建人手机号
     * @type {string}
     * @memberof FundDetailResponse
     */
    createPhone: string

    /**
     * 更新人
     * @type {string}
     * @memberof FundDetailResponse
     */
    updateBy: string

    /**
     * 更新时间
     * @type {string}
     * @memberof FundDetailResponse
     */
    updateTime: string

    /**
     * 更新人手机号
     * @type {string}
     * @memberof FundDetailResponse
     */
    updatePhone: string

    /**
     * 认领记录
     * @type {Array<FundBankReceiptRecord>}
     * @memberof FundDetailResponse
     */
    bankReceiptRecordList: Array<FundBankReceiptRecord>

}

/**
*
* @export
* @interface PaymentOrderInfo
*/
export interface PaymentOrderInfo {

    /**
     * 状态：0-支付单待审核;
	1-首付款待支付;
	2-首付款待确认;
	3-上游支付确认中;
	4-上游支付中;
	5--待出票;
	6-正在出票;
	7-待发货;
	8-待收货;
	9-剩余货款待支付;
	10-剩余货款待确认;
	11-支付单完成;
	12-支付单关闭;

     * @type {number | string}
     * @memberof PaymentOrderInfo
     */
    status?: number | string

    /**
     * 申请金额
     * @type {number | string}
     * @memberof PaymentOrderInfo
     */
    applyAmount?: number | string

    /**
     * 支付单编号
     * @type {string}
     * @memberof PaymentOrderInfo
     */
    paymentOrderNo?: string

    /**
     * 销售毛利率
     * @type {number | string}
     * @memberof PaymentOrderInfo
     */
    salesGrossMargin?: number | string

    /**
     * 采购折让
     * @type {number | string}
     * @memberof PaymentOrderInfo
     */
    purchaseDiscountRate?: number | string

    /**
     * 销售金额
     * @type {number | string}
     * @memberof PaymentOrderInfo
     */
    salesTotalAmount?: number | string

    /**
     * 采购金额（折让后）
     * @type {number | string}
     * @memberof PaymentOrderInfo
     */
    purchaseDiscountAmount?: number | string

}

/**
* 分财审核信息
* @export
* @interface PaymentOrderSegmentFinanceApprovalResponse
*/
export interface PaymentOrderSegmentFinanceApprovalResponse {

    /**
     * id
     * @type {number | string}
     * @memberof PaymentOrderSegmentFinanceApprovalResponse
     */
    id?: number | string

    /**
     * 支付单id
     * @type {number | string}
     * @memberof PaymentOrderSegmentFinanceApprovalResponse
     */
    paymentOrderId?: number | string

    /**
     * 账户信息是否已确认
     * @type {boolean}
     * @memberof PaymentOrderSegmentFinanceApprovalResponse
     */
    supplierAccountConfirm?: boolean

    /**
     * 共管户是否已监管
     * @type {boolean}
     * @memberof PaymentOrderSegmentFinanceApprovalResponse
     */
    coManagerSupervision?: boolean

    /**
     * 分财审核结果:1-通过;2-不通过
     * @type {number | string}
     * @memberof PaymentOrderSegmentFinanceApprovalResponse
     */
    approvalStatus?: number | string

    /**
     * 分财审核人
     * @type {string}
     * @memberof PaymentOrderSegmentFinanceApprovalResponse
     */
    approvalUser?: string

    /**
     * 分财审核人手机号
     * @type {string}
     * @memberof PaymentOrderSegmentFinanceApprovalResponse
     */
    approvalPhone?: string

    /**
     * 分财审核时间
     * @type {string}
     * @memberof PaymentOrderSegmentFinanceApprovalResponse
     */
    approvalTime?: string

    /**
     * 分财审核备注
     * @type {string}
     * @memberof PaymentOrderSegmentFinanceApprovalResponse
     */
    approvalRemark?: string

}

/**
* 账单列表
* @export
* @interface RespFundDetailResult
*/
export interface RespFundDetailResult {

    /**
     *
     * @type {FundClaimResponse}
     * @memberof RespFundDetailResult
     */
    downpaymentFund?: FundClaimResponse

    /**
     * 服务费账单列表
     * @type {Array<ServiceFundClaimResponse>}
     * @memberof RespFundDetailResult
     */
    serviceFund?: Array<ServiceFundClaimResponse>

    /**
     * 当前服务费合计
     * @type {number | string}
     * @memberof RespFundDetailResult
     */
    totalServiceAmount?: number | string

    /**
     * 已成功支付服务费合计
     * @type {number | string}
     * @memberof RespFundDetailResult
     */
    totalPaidAmount?: number | string

    /**
     *
     * @type {FundClaimResponse}
     * @memberof RespFundDetailResult
     */
    arrearFund?: FundClaimResponse

}

/**
* 到货金额
* @export
* @interface RespGoodsAmount
*/
export interface RespGoodsAmount {

    /**
     * 应到货金额
     * @type {number | string}
     * @memberof RespGoodsAmount
     */
    totalAmount?: number | string

    /**
     * 已到货金额
     * @type {number | string}
     * @memberof RespGoodsAmount
     */
    goodsAmount?: number | string

}

/**
* 采购单详情
* @export
* @interface RespPayOrderPoDetail
*/
export interface RespPayOrderPoDetail {

    /**
     * 主键id
     * @type {number | string}
     * @memberof RespPayOrderPoDetail
     */
    id?: number | string

    /**
     * 采购单金额
     * @type {number | string}
     * @memberof RespPayOrderPoDetail
     */
    poAmount?: number | string

    /**
     *
     * @type {JsonNode}
     * @memberof RespPayOrderPoDetail
     */
    poDetail?: JsonNode

    /**
     * 采购批次
     * @type {number | string}
     * @memberof RespPayOrderPoDetail
     */
    poNumber?: number | string

    /**
     * 最迟发货日期
     * @type {string}
     * @memberof RespPayOrderPoDetail
     */
    lastGoodsDate?: string

    /**
     * 收货地址
     * @type {string}
     * @memberof RespPayOrderPoDetail
     */
    goodsAddress?: string

    /**
     * 经销商预付款比例
     * @type {number | string}
     * @memberof RespPayOrderPoDetail
     */
    prePercent?: number | string

    /**
     * 剩余货款支付周期
     * @type {number | string}
     * @memberof RespPayOrderPoDetail
     */
    restPaymentPeriod?: number | string

    /**
     * 免息方式：0-无;1-1个月;2-2个月;3-3个月;4-4个月;5-5个月;6-6个月
     * @type {number | string}
     * @memberof RespPayOrderPoDetail
     */
    freeInterestType?: number | string

    /**
     * 更新时间
     * @type {string}
     * @memberof RespPayOrderPoDetail
     */
    updateTime?: string

    /**
     * 付款主体
     * @type {string}
     * @memberof RespPayOrderPoDetail
     */
    paymentMain?: string

    /**
     *
     * @type {Array<PaymentOrderInfo>}
     * @memberof RespPayOrderPoDetail
     */
    paymentOrderInfos?: Array<PaymentOrderInfo>

}

/**
*
* @export
* @interface RespPaymentOrderDetail
*/
export interface RespPaymentOrderDetail {

    /**
     *
     * @type {RespProjectInfo}
     * @memberof RespPaymentOrderDetail
     */
    projectInfo: RespProjectInfo

    /**
     *
     * @type {RespPayOrderDetail}
     * @memberof RespPaymentOrderDetail
     */
    payOrderDetail: RespPayOrderDetail

    /**
     *
     * @type {RespPayOrderPoDetail}
     * @memberof RespPaymentOrderDetail
     */
    payOrderPoDetail: RespPayOrderPoDetail

    /**
     *
     * @type {RespFundDetailResult}
     * @memberof RespPaymentOrderDetail
     */
    respFundResults: RespFundDetailResult

    /**
     *
     * @type {RespGoodsAmount}
     * @memberof RespPaymentOrderDetail
     */
    respGoodsAmount: RespGoodsAmount

    /**
     *
     * @type {RespSupplierAmount}
     * @memberof RespPaymentOrderDetail
     */
    respSupplierAmount: RespSupplierAmount

    /**
     * 上游可支付标识：0-不可支付，1-可支付
     * @type {number | string}
     * @memberof RespPaymentOrderDetail
     */
    supplierPayFlag: number | string

    /**
     * 确认收货标识：0-不可收货，1-可收货
     * @type {number | string}
     * @memberof RespPaymentOrderDetail
     */
    goodsConfirmFlag: number | string

    /**
     *
     * @type {BillAmountResponse}
     * @memberof RespPaymentOrderDetail
     */
    billAmountResponse: BillAmountResponse

    /**
     *
     * @type {PaymentOrderSegmentFinanceApprovalResponse}
     * @memberof RespPaymentOrderDetail
     */
    paymentOrderSegmentFinanceApprovalResponse: PaymentOrderSegmentFinanceApprovalResponse

}

/**
* 项目信息
* @export
* @interface RespProjectInfo
*/
export interface RespProjectInfo {

    /**
     * 项目名称
     * @type {string}
     * @memberof RespProjectInfo
     */
    projectName?: string

    /**
     * 公司名称
     * @type {string}
     * @memberof RespProjectInfo
     */
    companyName?: string

    /**
     * 所属分部名称
     * @type {string}
     * @memberof RespProjectInfo
     */
    deptName?: string

    /**
     * 银行承兑执行费率
     * @type {number | string}
     * @memberof RespProjectInfo
     */
    acceptBankRate?: number | string

    /**
     * 银行转账执行费率
     * @type {number | string}
     * @memberof RespProjectInfo
     */
    transferBankRate?: number | string

}

/**
* 上游支付金额
* @export
* @interface RespSupplierAmount
*/
export interface RespSupplierAmount {

    /**
     *
     * @type {number | string}
     * @memberof RespSupplierAmount
     */
    totalAmount?: number | string

    /**
     *
     * @type {number | string}
     * @memberof RespSupplierAmount
     */
    paidAmount?: number | string

}

/**
* 服务费账单列表
* @export
* @interface ServiceFundClaimResponse
*/
export interface ServiceFundClaimResponse {

    /**
     * 账单id
     * @type {number | string}
     * @memberof ServiceFundClaimResponse
     */
    fundId?: number | string

    /**
     * 账单金额
     * @type {number | string}
     * @memberof ServiceFundClaimResponse
     */
    fundAmount?: number | string

    /**
     * 实际支付金额（已支付金额）
     * @type {number | string}
     * @memberof ServiceFundClaimResponse
     */
    paidAmount?: number | string

    /**
     * 支付待确认金额
     * @type {number | string}
     * @memberof ServiceFundClaimResponse
     */
    unconfirmedAmount?: number | string

    /**
     * 待支付金额
     * @type {number | string}
     * @memberof ServiceFundClaimResponse
     */
    unpaidAmount?: number | string

    /**
     * 预计应收金额
     * @type {number | string}
     * @memberof ServiceFundClaimResponse
     */
    receivableAmount?: number | string

    /**
     * 还款类型：1-首付款；2-剩余货款；3-服务费；4-预付款
     * @type {number | string}
     * @memberof ServiceFundClaimResponse
     */
    repaymentType?: number | string

    /**
     * 支付状态：0-待支付；1-支付待确认；2-已支付；3-支付失败；4-已取消
     * @type {number | string}
     * @memberof ServiceFundClaimResponse
     */
    paymentFlag?: number | string

    /**
     * 实际支付日期
     * @type {string}
     * @memberof ServiceFundClaimResponse
     */
    paidDate?: string

    /**
     * 支付（成功/失败）时间
     * @type {string}
     * @memberof ServiceFundClaimResponse
     */
    paidTime?: string

    /**
     * 应支付日期
     * @type {string}
     * @memberof ServiceFundClaimResponse
     */
    schedulePaymentDate?: string

    /**
     * 服务费明细
     * @type {Array<FundDetailResponse>}
     * @memberof ServiceFundClaimResponse
     */
    fundDetails?: Array<FundDetailResponse>

}

/**
*
* @export
* @interface RespPaymentOrderPicDetail
*/
export interface RespPaymentOrderPicDetail {

    /**
     * 经销商名称
     * @type {string}
     * @memberof RespPaymentOrderPicDetail
     */
    supplierCompanyName: string

    /**
     * 项目名称
     * @type {string}
     * @memberof RespPaymentOrderPicDetail
     */
    projectName: string

    /**
     * 支付单编号
     * @type {string}
     * @memberof RespPaymentOrderPicDetail
     */
    paymentOrderNo: string

    /**
     * 采购单图片详情
     * @type {Array<Download>}
     * @memberof RespPaymentOrderPicDetail
     */
    purchaseOrderDetailPics: Array<Download>

}

/**
* 采购明细
* @export
* @interface Detailed
*/
export interface Detailed {

    /**
     *
     * @type {string}
     * @memberof Detailed
     */
    fileUrl?: string

    /**
     *
     * @type {string}
     * @memberof Detailed
     */
    fileName?: string

}

/**
*
* @export
* @interface RespGoodsInfo
*/
export interface RespGoodsInfo {

    /**
     * 货物id
     * @type {number | string}
     * @memberof RespGoodsInfo
     */
    id: number | string

    /**
     * 项目名称
     * @type {string}
     * @memberof RespGoodsInfo
     */
    projectName: string

    /**
     * 经销商名称
     * @type {string}
     * @memberof RespGoodsInfo
     */
    companyName: string

    /**
     * 应到货金额
     * @type {number | string}
     * @memberof RespGoodsInfo
     */
    totalAmount: number | string

    /**
     * 剩余金额
     * @type {number | string}
     * @memberof RespGoodsInfo
     */
    surplusAmount: number | string

    /**
     * 已到货金额
     * @type {number | string}
     * @memberof RespGoodsInfo
     */
    goodsAmount: number | string

    /**
     * 上游供应商名称
     * @type {string}
     * @memberof RespGoodsInfo
     */
    supplierCompanyName: string

    /**
     * 采购明细
     * @type {Array<Detailed>}
     * @memberof RespGoodsInfo
     */
    detailed: Array<Detailed>

}

/**
* 货物凭证
* @export
* @interface GoodsVoucher
*/
export interface GoodsVoucher {

    /**
     *
     * @type {string}
     * @memberof GoodsVoucher
     */
    fileUrl?: string

    /**
     *
     * @type {string}
     * @memberof GoodsVoucher
     */
    fileName?: string

}

/**
*
* @export
* @interface RespGoods
*/
export interface RespGoods {

    /**
     * 货物id
     * @type {number | string}
     * @memberof RespGoods
     */
    id: number | string

    /**
     * 应到货金额
     * @type {number | string}
     * @memberof RespGoods
     */
    totalAmount: number | string

    /**
     * 已到货金额
     * @type {number | string}
     * @memberof RespGoods
     */
    goodsAmount: number | string

    /**
     * 到货明细
     * @type {Array<RespGoodsDetail>}
     * @memberof RespGoods
     */
    respGoodsDetailList: Array<RespGoodsDetail>

    /**
     * 进度
     * @type {number | string}
     * @memberof RespGoods
     */
    progress: number | string

}

/**
* 到货明细
* @export
* @interface RespGoodsDetail
*/
export interface RespGoodsDetail {

    /**
     * 货物明细id
     * @type {number | string}
     * @memberof RespGoodsDetail
     */
    id?: number | string

    /**
     * 到货金额
     * @type {number | string}
     * @memberof RespGoodsDetail
     */
    goodsAmount?: number | string

    /**
     * 创建时间
     * @type {string}
     * @memberof RespGoodsDetail
     */
    createTime?: string

    /**
     * 创建人
     * @type {string}
     * @memberof RespGoodsDetail
     */
    createBy?: string

    /**
     * 创建人账号
     * @type {string}
     * @memberof RespGoodsDetail
     */
    createPhone?: string

    /**
     * 收货备注
     * @type {string}
     * @memberof RespGoodsDetail
     */
    goodsRemark?: string

    /**
     * 货物凭证
     * @type {Array<GoodsVoucher>}
     * @memberof RespGoodsDetail
     */
    goodsVouchers?: Array<GoodsVoucher>

}

/**
*
* @export
* @interface RespAppPaymentOrder
*/
export interface RespAppPaymentOrder {

    /**
     * 支付单id
     * @type {number | string}
     * @memberof RespAppPaymentOrder
     */
    id: number | string

    /**
     * 项目id
     * @type {number | string}
     * @memberof RespAppPaymentOrder
     */
    projectId: number | string

    /**
     * 项目名称
     * @type {string}
     * @memberof RespAppPaymentOrder
     */
    projectName: string

    /**
     * 状态：0-支付单待审核;1-首付款待支付;2-首付款待确认;3-上游支付确认中;4-上游支付中;5--待出票;6-正在出票;7-待发货;8-待收货;9-剩余货款待支付;10-剩余货款待确认;12-支付单完成;12-支付单关闭;13-支付单取消
     * @type {number | string}
     * @memberof RespAppPaymentOrder
     */
    status: number | string

    /**
     * 采购批次：1-一次性 2-分批
     * @type {number | string}
     * @memberof RespAppPaymentOrder
     */
    applyType: number | string

    /**
     * 支付单编号
     * @type {string}
     * @memberof RespAppPaymentOrder
     */
    paymentOrderNo: string

    /**
     *
     * @type {JsonNode}
     * @memberof RespAppPaymentOrder
     */
    paymentDetail: JsonNode

    /**
     * 采购单编号
     * @type {string}
     * @memberof RespAppPaymentOrder
     */
    purchaseOrderNo: string

    /**
     * 采购单金额
     * @type {number | string}
     * @memberof RespAppPaymentOrder
     */
    poAmount: number | string

    /**
     * 剩余货款支付id
     * @type {number | string}
     * @memberof RespAppPaymentOrder
     */
    arrearFundId: number | string

    /**
     * 剩余货款（尾款）
     * @type {number | string}
     * @memberof RespAppPaymentOrder
     */
    arrearAmount: number | string

    /**
     * 剩余货款支付时间
     * @type {string}
     * @memberof RespAppPaymentOrder
     */
    arrearPayTime: string

    /**
     * 首付款支付id
     * @type {number | string}
     * @memberof RespAppPaymentOrder
     */
    downFundId: number | string

    /**
     * 首付款
     * @type {number | string}
     * @memberof RespAppPaymentOrder
     */
    downPaymentAmount: number | string

    /**
     * 首付款应支付时间
     * @type {string}
     * @memberof RespAppPaymentOrder
     */
    downPaymentPayTime: string

    /**
     * 经销商预付款比例
     * @type {number | string}
     * @memberof RespAppPaymentOrder
     */
    prePercent: number | string

    /**
     * 剩余货款支付周期
     * @type {number | string}
     * @memberof RespAppPaymentOrder
     */
    restPaymentPeriod: number | string

    /**
     *
     * @type {JsonNode}
     * @memberof RespAppPaymentOrder
     */
    poDetail: JsonNode

    /**
     * 经销商名称（企业名称）
     * @type {string}
     * @memberof RespAppPaymentOrder
     */
    dealerCompanyName: string

    /**
     * 所属分部名称
     * @type {string}
     * @memberof RespAppPaymentOrder
     */
    deptName: string

    /**
     * 账单信息
     * @type {Array<Fund>}
     * @memberof RespAppPaymentOrder
     */
    funds: Array<Fund>

    /**
     * 采购单申请时间
     * @type {string}
     * @memberof RespAppPaymentOrder
     */
    purchaseApplyTime: string

    /**
     * 审核备注
     * @type {string}
     * @memberof RespAppPaymentOrder
     */
    approvalRemark: string

    /**
     * 支付单关闭原因
     * @type {string}
     * @memberof RespAppPaymentOrder
     */
    closeReason: string

    /**
     * 上游供应商
     * @type {string}
     * @memberof RespAppPaymentOrder
     */
    supplierCompanyName: string

    /**
     * 最迟发货日期
     * @type {string}
     * @memberof RespAppPaymentOrder
     */
    lastGoodsDate: string

    /**
     * 收货地址
     * @type {string}
     * @memberof RespAppPaymentOrder
     */
    goodsAddress: string

    /**
     * 时间
     * @type {string}
     * @memberof RespAppPaymentOrder
     */
    createTime: string

    /**
     * 申请支付金额
     * @type {number | string}
     * @memberof RespAppPaymentOrder
     */
    applyAmount: number | string

    /**
     * 采购单是否签署 true：已签署 false：未签署
     * @type {boolean}
     * @memberof RespAppPaymentOrder
     */
    signPurchaseOrder: boolean

    /**
     * 下游合作方式:1-垫资代采;2-代收代付
     * @type {number | string}
     * @memberof RespAppPaymentOrder
     */
    dealerCooperationMethod: number | string

    /**
     * 上游货款方式 1.先款后货 2.先货后款
     * @type {number | string}
     * @memberof RespAppPaymentOrder
     */
    supplierPaymentMethod: number | string

    /**
     * 费率（上游支付方式费率）
     * @type {number | string}
     * @memberof RespAppPaymentOrder
     */
    serviceFeeRate: number | string

    /**
     * 首付款账单id
     * @type {number | string}
     * @memberof RespAppPaymentOrder
     */
    fundId: number | string

    /**
     * 首付款凭证
     * @type {Array<AttachDoc>}
     * @memberof RespAppPaymentOrder
     */
    downPaymentAttachDocs: Array<AttachDoc>

    /**
     * 剩余货款凭证
     * @type {Array<AttachDoc>}
     * @memberof RespAppPaymentOrder
     */
    arrearAttachDocs: Array<AttachDoc>

    /**
     *
     * @type {RespGoodsAmount}
     * @memberof RespAppPaymentOrder
     */
    respGoodsAmount: RespGoodsAmount

    /**
     *
     * @type {RespSupplierAmount}
     * @memberof RespAppPaymentOrder
     */
    respSupplierAmount: RespSupplierAmount

    /**
     * 票面金额有无要求 0：无要求 1：有要求
     * @type {number | string}
     * @memberof RespAppPaymentOrder
     */
    billClaim: number | string

    /**
     *
     * @type {BillAmountResponse}
     * @memberof RespAppPaymentOrder
     */
    billAmountResponse: BillAmountResponse

    /**
     * 审批实例业务编号
     * @type {string}
     * @memberof RespAppPaymentOrder
     */
    businessId: string

    /**
     * 毛利总额
     * @type {number | string}
     * @memberof RespAppPaymentOrder
     */
    salesGrossTotalAmount: number | string

    /**
     * 销售毛利率
     * @type {number | string}
     * @memberof RespAppPaymentOrder
     */
    salesGrossMargin: number | string

    /**
     * 采购折让
     * @type {number | string}
     * @memberof RespAppPaymentOrder
     */
    purchaseDiscountRate: number | string

    /**
     * 销售金额
     * @type {number | string}
     * @memberof RespAppPaymentOrder
     */
    salesTotalAmount: number | string

    /**
     * 采购金额（折让后）
     * @type {number | string}
     * @memberof RespAppPaymentOrder
     */
    purchaseDiscountAmount: number | string

    /**
     * 银行联行号
     * @type {string}
     * @memberof RespAppPaymentOrder
     */
    supplierBankNo: string

    /**
     * 供应商开户行名称
     * @type {string}
     * @memberof RespAppPaymentOrder
     */
    supplierAccountName: string

    /**
     * 供应商银行账号
     * @type {string}
     * @memberof RespAppPaymentOrder
     */
    supplierAccountNo: string

    /**
     * 上游支付方式:1-银行转帐;2-银行承兑
     * @type {number | string}
     * @memberof RespAppPaymentOrder
     */
    supplierPaymentType: number | string

    /**
     * 期望上游支付日期
     * @type {string}
     * @memberof RespAppPaymentOrder
     */
    expectSupplierPaymentDate: string

    /**
     * 特殊说明
     * @type {string}
     * @memberof RespAppPaymentOrder
     */
    specialRemark: string

    /**
     * 剩余应支付账单金额
     * @type {number | string}
     * @memberof RespAppPaymentOrder
     */
    noPayAmount: number | string

    /**
     * 最近应该支付日期
     * @type {string}
     * @memberof RespAppPaymentOrder
     */
    payableDate: string

    /**
     * 账单状态 1：无账单 2：进行中 3：已结清
     * @type {number | string}
     * @memberof RespAppPaymentOrder
     */
    billStatus: number | string

    /**
     * 钉钉审批流下一节点审批人
     * @type {string}
     * @memberof RespAppPaymentOrder
     */
    dingNextApprover: string

}

/**
*
* @export
* @interface RespFundCheck
*/
export interface RespFundCheck {

    /**
     * 账单id
     * @type {number | string}
     * @memberof RespFundCheck
     */
    fundId: number | string

    /**
     * 账单金额
     * @type {number | string}
     * @memberof RespFundCheck
     */
    fundAmount: number | string

}

/**
*
* @export
* @interface RespUserCurMonFundStatic
*/
export interface RespUserCurMonFundStatic {

    /**
     * 当前月份
     * @type {number | string}
     * @memberof RespUserCurMonFundStatic
     */
    month: number | string

    /**
     * 首付款待支付金额
     * @type {number | string}
     * @memberof RespUserCurMonFundStatic
     */
    downPaymentAmount: number | string

    /**
     * 首付款待支付笔数
     * @type {number | string}
     * @memberof RespUserCurMonFundStatic
     */
    downPaymentNum: number | string

    /**
     * 剩余货款待支付金额
     * @type {number | string}
     * @memberof RespUserCurMonFundStatic
     */
    arrearAmount: number | string

    /**
     * 剩余货款待支付笔数
     * @type {number | string}
     * @memberof RespUserCurMonFundStatic
     */
    arrearNum: number | string

    /**
     * 服务费待支付金额
     * @type {number | string}
     * @memberof RespUserCurMonFundStatic
     */
    feeAmount: number | string

    /**
     * 服务费待支付笔数
     * @type {number | string}
     * @memberof RespUserCurMonFundStatic
     */
    feeNum: number | string

    /**
     * 当月开始时间
     * @type {string}
     * @memberof RespUserCurMonFundStatic
     */
    monthFirstDay: string

    /**
     * 当月开始时间
     * @type {string}
     * @memberof RespUserCurMonFundStatic
     */
    monthEndDay: string

}

/**
*
* @export
* @interface ReqServiceFeeQuery
*/
export interface ReqServiceFeeQuery {

    /**
     * 支付单
     * @type {number | string}
     * @memberof ReqServiceFeeQuery
     */
    orderId?: number | string

    /**
     * 总额款
     * @type {number | string}
     * @memberof ReqServiceFeeQuery
     */
    totalAmount?: number | string

    /**
     * 首付款
     * @type {number | string}
     * @memberof ReqServiceFeeQuery
     */
    downpaymentAmount?: number | string

    /**
     * 费率
     * @type {number | string}
     * @memberof ReqServiceFeeQuery
     */
    serviceFeeRate?: number | string

    /**
     * 申请日期
     * @type {string}
     * @memberof ReqServiceFeeQuery
     */
    applyDate?: string

    /**
     * 免息方式：0-无;1-1个月;2-2个月;3-3个月;4-4个月;5-5个月;6-6个月;
     * @type {number | string}
     * @memberof ReqServiceFeeQuery
     */
    freeInterestType?: number | string

    /**
     * 支付周期（月）;
     * @type {number | string}
     * @memberof ReqServiceFeeQuery
     */
    terms?: number | string

    /**
     * 销售毛利率(%)
     * @type {number | string}
     * @memberof ReqServiceFeeQuery
     */
    salesGrossMargin?: number | string

}

/**
*
* @export
* @interface RespServiceFeeResult
*/
export interface RespServiceFeeResult {

    /**
     * 服务费
     * @type {number | string}
     * @memberof RespServiceFeeResult
     */
    feeAmount: number | string

    /**
     * 每期服务费
     * @type {number | string}
     * @memberof RespServiceFeeResult
     */
    feeAmountPer: number | string

    /**
     * 剩余货款
     * @type {number | string}
     * @memberof RespServiceFeeResult
     */
    arrearAmount: number | string

    /**
     * 销售毛利率(%)
     * @type {number | string}
     * @memberof RespServiceFeeResult
     */
    salesGrossMargin: number | string

}

/**
*
* @export
* @interface RespFundDetailPage
*/
export interface RespFundDetailPage {

    /**
     *
     * @type {Fund}
     * @memberof RespFundDetailPage
     */
    downpaymentFund: Fund

    /**
     * 服务费账单列表
     * @type {Array<ServiceFundResponse>}
     * @memberof RespFundDetailPage
     */
    serviceFund: Array<ServiceFundResponse>

    /**
     * 当前服务费合计
     * @type {number | string}
     * @memberof RespFundDetailPage
     */
    totalServiceAmount: number | string

    /**
     * 已成功支付服务费合计
     * @type {number | string}
     * @memberof RespFundDetailPage
     */
    totalPaidAmount: number | string

    /**
     *
     * @type {Fund}
     * @memberof RespFundDetailPage
     */
    arrearFund: Fund

}

/**
* 服务费账单列表
* @export
* @interface ServiceFundResponse
*/
export interface ServiceFundResponse {

    /**
     * id
     * @type {number | string}
     * @memberof ServiceFundResponse
     */
    id?: number | string

    /**
     * 支付单Id
     * @type {number | string}
     * @memberof ServiceFundResponse
     */
    orderId?: number | string

    /**
     * 支付金额
     * @type {number | string}
     * @memberof ServiceFundResponse
     */
    paymentAmount?: number | string

    /**
     * 服务费期数
     * @type {number | string}
     * @memberof ServiceFundResponse
     */
    feeRepaymentOrder?: number | string

    /**
     * 支付方式:1-银行转帐;2-银行承兑
     * @type {number | string}
     * @memberof ServiceFundResponse
     */
    paymentType?: number | string

    /**
     * 还款类型：1-首付款；2-剩余货款；3-服务费；
     * @type {number | string}
     * @memberof ServiceFundResponse
     */
    repaymentType?: number | string

    /**
     * 备注
     * @type {string}
     * @memberof ServiceFundResponse
     */
    remark?: string

    /**
     * 支付状态：0-待支付；1-支付待确认；2-已支付；3-支付失败；4-已取消
     * @type {number | string}
     * @memberof ServiceFundResponse
     */
    paymentFlag?: number | string

    /**
     * 应支付日期
     * @type {string}
     * @memberof ServiceFundResponse
     */
    schedulePaymentDate?: string

    /**
     * 实际支付金额
     * @type {number | string}
     * @memberof ServiceFundResponse
     */
    paidAmount?: number | string

    /**
     * 实际支付日期
     * @type {string}
     * @memberof ServiceFundResponse
     */
    paidDate?: string

    /**
     * 支付（成功/失败）时间
     * @type {string}
     * @memberof ServiceFundResponse
     */
    paidTime?: string

    /**
     * 付款人
     * @type {string}
     * @memberof ServiceFundResponse
     */
    paymentBy?: string

    /**
     * 创建人
     * @type {string}
     * @memberof ServiceFundResponse
     */
    createBy?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof ServiceFundResponse
     */
    createTime?: string

    /**
     * 更新人
     * @type {string}
     * @memberof ServiceFundResponse
     */
    updateBy?: string

    /**
     * 更新时间
     * @type {string}
     * @memberof ServiceFundResponse
     */
    updateTime?: string

    /**
     * (应还3日前)邮件状态 1:待投递 2：已投递 3：投递失败
     * @type {number | string}
     * @memberof ServiceFundResponse
     */
    threeDayEmailStatus?: number | string

    /**
     * (应还当日) 1:待投递 2：已投递 3：投递失败
     * @type {number | string}
     * @memberof ServiceFundResponse
     */
    currDayEmailStatus?: number | string

    /**
     * 是否批量支付 0否1是
     * @type {boolean}
     * @memberof ServiceFundResponse
     */
    payBatch?: boolean

    /**
     * 服务费明细
     * @type {Array<FundDetailResponse>}
     * @memberof ServiceFundResponse
     */
    fundDetails?: Array<FundDetailResponse>

    /**
     * 预计应收金额
     * @type {number | string}
     * @memberof ServiceFundResponse
     */
    receivableAmount?: number | string

}

/**
*
* @export
* @interface ReqFundStatisticsQuery
*/
export interface ReqFundStatisticsQuery {

    /**
     * 支付单
     * @type {number | string}
     * @memberof ReqFundStatisticsQuery
     */
    orderId?: number | string

    /**
     * 统计月份
     * @type {string}
     * @memberof ReqFundStatisticsQuery
     */
    statisticsMonth?: string

    /**
     * 客户经理电话
     * @type {string}
     * @memberof ReqFundStatisticsQuery
     */
    customerManagerMobile?: string

    /**
     * 客户经理名称
     * @type {string}
     * @memberof ReqFundStatisticsQuery
     */
    customerManager?: string

    /**
     * 会员Id
     * @type {number | string}
     * @memberof ReqFundStatisticsQuery
     */
    userId?: number | string

}

/**
*
* @export
* @interface RespFundStatisticsResult
*/
export interface RespFundStatisticsResult {

    /**
     * 统计月份
     * @type {string}
     * @memberof RespFundStatisticsResult
     */
    statisticsMonth: string

    /**
     * 首付款汇总额
     * @type {number | string}
     * @memberof RespFundStatisticsResult
     */
    totalDownpaymentAmount: number | string

    /**
     * 服务费汇总额
     * @type {number | string}
     * @memberof RespFundStatisticsResult
     */
    totalServiceFeeAmount: number | string

    /**
     * 剩余货款汇总额
     * @type {number | string}
     * @memberof RespFundStatisticsResult
     */
    totalArrearAmount: number | string

    /**
     * 首付款笔数
     * @type {number | string}
     * @memberof RespFundStatisticsResult
     */
    countDownpaymentAmount: number | string

    /**
     * 服务费笔数
     * @type {number | string}
     * @memberof RespFundStatisticsResult
     */
    countServiceFeeAmount: number | string

    /**
     * 剩余货款笔数
     * @type {number | string}
     * @memberof RespFundStatisticsResult
     */
    countArrearAmount: number | string

}

/**
*
* @export
* @interface ReqFundQuery
*/
export interface ReqFundQuery {

    /**
     * 页码
     * @type {number | string}
     * @memberof ReqFundQuery
     */
    pageNumber?: number | string

    /**
     * 每页大小
     * @type {number | string}
     * @memberof ReqFundQuery
     */
    pageSize?: number | string

    /**
     *
     * @type {Sort}
     * @memberof ReqFundQuery
     */
    sort?: Sort

    /**
     * 账单Id
     * @type {number | string}
     * @memberof ReqFundQuery
     */
    fundId?: number | string

    /**
     * 项目Id
     * @type {Array<number | string>}
     * @memberof ReqFundQuery
     */
    projectIds?: Array<number | string>

    /**
     * 支付单id
     * @type {number | string}
     * @memberof ReqFundQuery
     */
    orderId?: number | string

    /**
     * 支付单编号
     * @type {string}
     * @memberof ReqFundQuery
     */
    paymentOrderNo?: string

    /**
     * 账单类型：1-首付款；2-剩余货款；3-服务费；多个状态用逗号分隔
     * @type {string}
     * @memberof ReqFundQuery
     */
    repaymentTypeArrays?: string

    /**
     * 账单支付状态：0-待支付；1-支付待确认；2-已支付；3-支付失败；4-已取消  多个状态用逗号分隔
     * @type {string}
     * @memberof ReqFundQuery
     */
    paymentFlagArrays?: string

    /**
     * 项目名称
     * @type {string}
     * @memberof ReqFundQuery
     */
    projectName?: string

    /**
     * 经销商名称
     * @type {string}
     * @memberof ReqFundQuery
     */
    companyName?: string

    /**
     * 经销商ID
     * @type {number | string}
     * @memberof ReqFundQuery
     */
    companyId?: number | string

    /**
     * 所属分部编号
     * @type {string}
     * @memberof ReqFundQuery
     */
    subsectionCode?: string

    /**
     * 工号
     * @type {string}
     * @memberof ReqFundQuery
     */
    jobNumber?: string

    /**
     * 菜单code
     * @type {string}
     * @memberof ReqFundQuery
     */
    authCode?: string

    /**
     * 菜单code
     * @type {string}
     * @memberof ReqFundQuery
     */
    deptCodeList?: string

    /**
     * 创建人
     * @type {string}
     * @memberof ReqFundQuery
     */
    createBy?: string

    /**
     * 应支付开始时间
     * @type {string}
     * @memberof ReqFundQuery
     */
    scheduleStartTime?: string

    /**
     * 应支付结束时间
     * @type {string}
     * @memberof ReqFundQuery
     */
    scheduleEndTime?: string

    /**
     * 支付成功开始时间
     * @type {string}
     * @memberof ReqFundQuery
     */
    paidStartTime?: string

    /**
     * 支成功结束时间
     * @type {string}
     * @memberof ReqFundQuery
     */
    paidEndTime?: string

    /**
     * 客户经理电话
     * @type {string}
     * @memberof ReqFundQuery
     */
    customerManagerMobile?: string

    /**
     * 客户经理名称
     * @type {string}
     * @memberof ReqFundQuery
     */
    customerManager?: string

    /**
     * 会员Id
     * @type {number | string}
     * @memberof ReqFundQuery
     */
    userId?: number | string

    /**
     * 会员Id列表
     * @type {Array<number | string>}
     * @memberof ReqFundQuery
     */
    userIdList?: Array<number | string>

    /**
     * 客户经理id
     * @type {string}
     * @memberof ReqFundQuery
     */
    customerUserId?: string

    /**
     * 最小已支付金额
     * @type {number | string}
     * @memberof ReqFundQuery
     */
    minPaidAmount?: number | string

    /**
     * 最大已支付金额
     * @type {number | string}
     * @memberof ReqFundQuery
     */
    maxPaidAmount?: number | string

    /**
     * 最小支付待确认金额
     * @type {number | string}
     * @memberof ReqFundQuery
     */
    minUnconfirmedAmount?: number | string

    /**
     * 最大支付待确认金额
     * @type {number | string}
     * @memberof ReqFundQuery
     */
    maxUnconfirmedAmount?: number | string

    /**
     * 最小待支付金额
     * @type {number | string}
     * @memberof ReqFundQuery
     */
    minUnpaidAmount?: number | string

    /**
     * 最大待支付金额
     * @type {number | string}
     * @memberof ReqFundQuery
     */
    maxUnpaidAmount?: number | string

}

/**
*
* @export
* @interface IPageRespFundResult
*/
export interface IPageRespFundResult {

    /**
     *
     * @type {Array<RespFundResult>}
     * @memberof IPageRespFundResult
     */
    records: Array<RespFundResult>

    /**
     *
     * @type {number | string}
     * @memberof IPageRespFundResult
     */
    total: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageRespFundResult
     */
    pages: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageRespFundResult
     */
    current: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageRespFundResult
     */
    size: number | string

}

/**
*
* @export
* @interface RespFundResult
*/
export interface RespFundResult {

    /**
     * 账单Id
     * @type {number | string}
     * @memberof RespFundResult
     */
    id: number | string

    /**
     * 支付单Id
     * @type {number | string}
     * @memberof RespFundResult
     */
    orderId: number | string

    /**
     * 支付单状态：0-待项目运营审核;1-首付款待支付;2-首付款待确认;8-待收货;9-尾款待支付;10-尾款待确认;11-支付单完成;12-支付单关闭;13-支付单取消;14-待分财审核;15-支付单审核中;
     * @type {number | string}
     * @memberof RespFundResult
     */
    paymentOrderStatus: number | string

    /**
     * 支付单编号
     * @type {string}
     * @memberof RespFundResult
     */
    paymentOrderNo: string

    /**
     * 支付单金额
     * @type {number | string}
     * @memberof RespFundResult
     */
    paymentOrderAmount: number | string

    /**
     * 还款类型：1-首付款；2-剩余货款；3-服务费；
     * @type {number | string}
     * @memberof RespFundResult
     */
    repaymentType: number | string

    /**
     * 服务费期数
     * @type {number | string}
     * @memberof RespFundResult
     */
    feeRepaymentOrder: number | string

    /**
     * 备注
     * @type {string}
     * @memberof RespFundResult
     */
    remark: string

    /**
     * 支付方式:1-银行转帐;2-银行承兑
     * @type {number | string}
     * @memberof RespFundResult
     */
    paymentType: number | string

    /**
     * 实际支付金额
     * @type {number | string}
     * @memberof RespFundResult
     */
    paidAmount: number | string

    /**
     * 实际支付日期
     * @type {string}
     * @memberof RespFundResult
     */
    paidDate: string

    /**
     * 支付（成功/失败）时间
     * @type {string}
     * @memberof RespFundResult
     */
    paidTime: string

    /**
     * 付款人
     * @type {string}
     * @memberof RespFundResult
     */
    paymentBy: string

    /**
     * 支付状态：0-待支付；1-支付待确认；2-已支付；3-支付失败；4-已取消
     * @type {number | string}
     * @memberof RespFundResult
     */
    paymentFlag: number | string

    /**
     * 应支付金额
     * @type {number | string}
     * @memberof RespFundResult
     */
    paymentAmount: number | string

    /**
     * 应支付日期
     * @type {string}
     * @memberof RespFundResult
     */
    schedulePaymentDate: string

    /**
     * 项目名称
     * @type {string}
     * @memberof RespFundResult
     */
    projectName: string

    /**
     * 经销商id
     * @type {string}
     * @memberof RespFundResult
     */
    companyId: string

    /**
     * 经销商名称
     * @type {string}
     * @memberof RespFundResult
     */
    companyName: string

    /**
     * 所属分部编号
     * @type {string}
     * @memberof RespFundResult
     */
    subsectionCode: string

    /**
     * 所属分部名称
     * @type {string}
     * @memberof RespFundResult
     */
    subsectionName: string

    /**
     * 创建时间
     * @type {string}
     * @memberof RespFundResult
     */
    createTime: string

    /**
     * 创建人
     * @type {string}
     * @memberof RespFundResult
     */
    createBy: string

    /**
     * 修改时间
     * @type {string}
     * @memberof RespFundResult
     */
    updateTime: string

    /**
     * 修改人
     * @type {string}
     * @memberof RespFundResult
     */
    updateBy: string

    /**
     * 收款账户户名
     * @type {string}
     * @memberof RespFundResult
     */
    receiverAccountName: string

    /**
     * 收款账户银行账号
     * @type {string}
     * @memberof RespFundResult
     */
    receiverAccountNo: string

    /**
     * 收款账户开户行
     * @type {string}
     * @memberof RespFundResult
     */
    receiverAccountBank: string

    /**
     * 凭证信息
     * @type {Array<AttachDoc>}
     * @memberof RespFundResult
     */
    attachDocList: Array<AttachDoc>

    /**
     * (应还3日前)邮件状态 1:待投递 2：已投递 3：投递失败
     * @type {number | string}
     * @memberof RespFundResult
     */
    threeDayEmailStatus: number | string

    /**
     * (应还当日) 1:待投递 2：已投递 3：投递失败
     * @type {number | string}
     * @memberof RespFundResult
     */
    currDayEmailStatus: number | string

    /**
     * 是否批量支付 0否1是
     * @type {boolean}
     * @memberof RespFundResult
     */
    payBatch: boolean

    /**
     * 客户经理
     * @type {string}
     * @memberof RespFundResult
     */
    customerName: string

    /**
     * 客户经理手机号
     * @type {string}
     * @memberof RespFundResult
     */
    customerMobile: string

    /**
     * 支付待确认金额
     * @type {number | string}
     * @memberof RespFundResult
     */
    unconfirmedAmount: number | string

    /**
     * 待支付金额
     * @type {number | string}
     * @memberof RespFundResult
     */
    unpaidAmount: number | string

    /**
     * 是否展示支付确认
     * @type {boolean}
     * @memberof RespFundResult
     */
    showPayConfirm: boolean

    /**
     * 是否展示批量确认
     * @type {boolean}
     * @memberof RespFundResult
     */
    showPayBatchConfirm: boolean

}

/**
*
* @export
* @interface LoanTransferAttachDocRequest
*/
export interface LoanTransferAttachDocRequest {

    /**
     * 支付单id
     * @type {number | string}
     * @memberof LoanTransferAttachDocRequest
     */
    paymentOrderId: number | string

}

/**
*
* @export
* @interface IPageLoanTransferAttachDocResponse
*/
export interface IPageLoanTransferAttachDocResponse {

    /**
     *
     * @type {Array<LoanTransferAttachDocResponse>}
     * @memberof IPageLoanTransferAttachDocResponse
     */
    records: Array<LoanTransferAttachDocResponse>

    /**
     *
     * @type {number | string}
     * @memberof IPageLoanTransferAttachDocResponse
     */
    total: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageLoanTransferAttachDocResponse
     */
    pages: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageLoanTransferAttachDocResponse
     */
    current: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageLoanTransferAttachDocResponse
     */
    size: number | string

}

/**
*
* @export
* @interface LoanTransferAttachDocResponse
*/
export interface LoanTransferAttachDocResponse {

    /**
     * 文件名称
     * @type {string}
     * @memberof LoanTransferAttachDocResponse
     */
    fileName?: string

    /**
     * 文件路径
     * @type {string}
     * @memberof LoanTransferAttachDocResponse
     */
    fileUrl?: string

    /**
     * 文件上传时间
     * @type {string}
     * @memberof LoanTransferAttachDocResponse
     */
    createTime?: string

}

/**
*
* @export
* @interface LoanTransferRecordResponse
*/
export interface LoanTransferRecordResponse {

    /**
     * 操作人
     * @type {string}
     * @memberof LoanTransferRecordResponse
     */
    operator: string

    /**
     * 操作内容
     * @type {string}
     * @memberof LoanTransferRecordResponse
     */
    operationContent: string

    /**
     * 操作类型 1：正常流转 2：驳回 3：变更
     * @type {number | string}
     * @memberof LoanTransferRecordResponse
     */
    type: number | string

    /**
     * 备注
     * @type {string}
     * @memberof LoanTransferRecordResponse
     */
    remark: string

    /**
     * 操作时间
     * @type {string}
     * @memberof LoanTransferRecordResponse
     */
    operatorTime: string

}

/**
*
* @export
* @interface LoanTransferInfoResponse
*/
export interface LoanTransferInfoResponse {

    /**
     * 支付单id
     * @type {number | string}
     * @memberof LoanTransferInfoResponse
     */
    paymentOrderId: number | string

    /**
     * 项目id
     * @type {number | string}
     * @memberof LoanTransferInfoResponse
     */
    projectId: number | string

    /**
     * 项目名称
     * @type {string}
     * @memberof LoanTransferInfoResponse
     */
    projectName: string

    /**
     * 经销商
     * @type {string}
     * @memberof LoanTransferInfoResponse
     */
    companyName: string

    /**
     * 所属分部
     * @type {string}
     * @memberof LoanTransferInfoResponse
     */
    deptName: string

    /**
     * 采购单金额
     * @type {number | string}
     * @memberof LoanTransferInfoResponse
     */
    poAmount: number | string

    /**
     * 剩余应支付金额
     * @type {number | string}
     * @memberof LoanTransferInfoResponse
     */
    noPayAmount: number | string

    /**
     * 支付单金额
     * @type {number | string}
     * @memberof LoanTransferInfoResponse
     */
    applyAmount: number | string

    /**
     * 首付款比例
     * @type {number | string}
     * @memberof LoanTransferInfoResponse
     */
    prePercent: number | string

    /**
     * 剩余货款支付周期
     * @type {number | string}
     * @memberof LoanTransferInfoResponse
     */
    restPaymentPeriod: number | string

    /**
     * 上游支付方式 1-银行转帐;2-银行承兑
     * @type {number | string}
     * @memberof LoanTransferInfoResponse
     */
    supplierPaymentType: number | string

    /**
     * 监管账户账号
     * @type {string}
     * @memberof LoanTransferInfoResponse
     */
    regulatorAccountNo: string

    /**
     * 监管账户户名
     * @type {string}
     * @memberof LoanTransferInfoResponse
     */
    regulatorAccountName: string

    /**
     * 监管账户开户行
     * @type {string}
     * @memberof LoanTransferInfoResponse
     */
    regulatorAccountBank: string

    /**
     * 网银盾照片
     * @type {Array<AttachDoc>}
     * @memberof LoanTransferInfoResponse
     */
    onlineBankingShields: Array<AttachDoc>

    /**
     * 共管户截图
     * @type {Array<AttachDoc>}
     * @memberof LoanTransferInfoResponse
     */
    screenshots: Array<AttachDoc>

    /**
     * 申请人
     * @type {string}
     * @memberof LoanTransferInfoResponse
     */
    applyBy: string

    /**
     * 申请时间
     * @type {string}
     * @memberof LoanTransferInfoResponse
     */
    applyTime: string

    /**
     * 上游供应商【收款人名称】
     * @type {string}
     * @memberof LoanTransferInfoResponse
     */
    supplierCompanyName: string

    /**
     * 供应商开户行名称
     * @type {string}
     * @memberof LoanTransferInfoResponse
     */
    supplierAccountName: string

    /**
     * 供应商银行账号
     * @type {string}
     * @memberof LoanTransferInfoResponse
     */
    supplierAccountNo: string

    /**
     * 银行联行号
     * @type {string}
     * @memberof LoanTransferInfoResponse
     */
    supplierBankNo: string

    /**
     * 期望上游支付日期
     * @type {string}
     * @memberof LoanTransferInfoResponse
     */
    expectSupplierPaymentDate: string

    /**
     * 备注说明【货款申请时的说明】
     * @type {string}
     * @memberof LoanTransferInfoResponse
     */
    specialRemark: string

    /**
     * 上游货款方式 1.先款后货 2.先货后款
     * @type {number | string}
     * @memberof LoanTransferInfoResponse
     */
    supplierPaymentMethod: number | string

    /**
     * 下游合作方式:1-垫资代采;2-代收代付
     * @type {number | string}
     * @memberof LoanTransferInfoResponse
     */
    dealerCooperationMethod: number | string

    /**
     * 放款交接id
     * @type {number | string}
     * @memberof LoanTransferInfoResponse
     */
    loanTransferId: number | string

    /**
     * 放款交接-发起人
     * @type {string}
     * @memberof LoanTransferInfoResponse
     */
    initiateBy: string

    /**
     * 放款交接-发起时间
     * @type {string}
     * @memberof LoanTransferInfoResponse
     */
    initiateTime: string

    /**
     * 预付款id
     * @type {number | string}
     * @memberof LoanTransferInfoResponse
     */
    fundId: number | string

    /**
     * 预付款金额
     * @type {number | string}
     * @memberof LoanTransferInfoResponse
     */
    advancePaymentAmount: number | string

    /**
     * 确认到账时间
     * @type {string}
     * @memberof LoanTransferInfoResponse
     */
    confirmArrivalTime: string

    /**
     * 确认到账人
     * @type {string}
     * @memberof LoanTransferInfoResponse
     */
    confirmArrivalBy: string

    /**
     * 预付款支付凭证
     * @type {Array<AttachDoc>}
     * @memberof LoanTransferInfoResponse
     */
    advancePaymentVouchers: Array<AttachDoc>

    /**
     * 质押信息
     * @type {string}
     * @memberof LoanTransferInfoResponse
     */
    pledgeNo: string

    /**
     * 评审决议流程
     * @type {string}
     * @memberof LoanTransferInfoResponse
     */
    reviewResolutionNo: string

    /**
     * OA货款支付流程
     * @type {string}
     * @memberof LoanTransferInfoResponse
     */
    oaNo: string

    /**
     * 上游采购合同
     * @type {Array<AttachDocResponse>}
     * @memberof LoanTransferInfoResponse
     */
    archiveContractFiles: Array<AttachDocResponse>

    /**
     * 采购明细附件
     * @type {Array<AttachDoc>}
     * @memberof LoanTransferInfoResponse
     */
    purchaseDetailFiles: Array<AttachDoc>

    /**
     *
     * @type {BillAmountResponse}
     * @memberof LoanTransferInfoResponse
     */
    billAmountResponse: BillAmountResponse

    /**
     * 放款交接备注
     * @type {string}
     * @memberof LoanTransferInfoResponse
     */
    remark: string

    /**
     * 放款交接状态：1-未确认【待交接】；2-已确认【已交接】
     * @type {number | string}
     * @memberof LoanTransferInfoResponse
     */
    loanTransferStatus: number | string

    /**
     * 支付状态 1：待支付 2：部分支付
     * @type {number | string}
     * @memberof LoanTransferInfoResponse
     */
    paymentStatus: number | string

    /**
     * 评审决议流程状态：1已完结
     * @type {number | string}
     * @memberof LoanTransferInfoResponse
     */
    reviewResolutionStatus: number | string

    /**
     * 货款支付流程状态：1已完结
     * @type {number | string}
     * @memberof LoanTransferInfoResponse
     */
    oaStatus: number | string

    /**
     * 预付款核销金额
     * @type {number | string}
     * @memberof LoanTransferInfoResponse
     */
    prepaymentWriteOffAmount: number | string

    /**
     * 银行转账方式 1：司库线上转账 2：线下网银转账
     * @type {number | string}
     * @memberof LoanTransferInfoResponse
     */
    bankTransferMethod: number | string

    /**
     * 付款主体
     * @type {string}
     * @memberof LoanTransferInfoResponse
     */
    paymentMain: string

}

/**
*
* @export
* @interface ReviewResolutionResponse
*/
export interface ReviewResolutionResponse {

    /**
     * 支付单放款交接id
     * @type {number | string}
     * @memberof ReviewResolutionResponse
     */
    id: number | string

    /**
     * 质押信息
     * @type {string}
     * @memberof ReviewResolutionResponse
     */
    pledgeNo: string

    /**
     * OA货款支付流程
     * @type {string}
     * @memberof ReviewResolutionResponse
     */
    oaNo: string

    /**
     * OA货款支付流程状态 1 已完结 2.审批中
     * @type {number | string}
     * @memberof ReviewResolutionResponse
     */
    oaStatus: number | string

    /**
     * 放款交接备注信息
     * @type {string}
     * @memberof ReviewResolutionResponse
     */
    remark: string

    /**
     * 放款交接状态 0：待发起 1：已发起 2：已确认
     * @type {number | string}
     * @memberof ReviewResolutionResponse
     */
    status: number | string

}

/**
*
* @export
* @interface LoanTransferDocResponse
*/
export interface LoanTransferDocResponse {

    /**
     * 采购合同（合同归档合同文件）20
     * @type {Array<AttachDocResponse>}
     * @memberof LoanTransferDocResponse
     */
    contractArchiveDocs: Array<AttachDocResponse>

    /**
     * 采购合同（放款交接文件）21
     * @type {Array<AttachDocResponse>}
     * @memberof LoanTransferDocResponse
     */
    loanTransferArchiveDocs: Array<AttachDocResponse>

    /**
     * 单次采购明细文件（采购合同归档合同文件）22
     * @type {Array<AttachDocResponse>}
     * @memberof LoanTransferDocResponse
     */
    purchaseDetailsDocs: Array<AttachDocResponse>

}

/**
*
* @export
* @interface LoanTransferResponse
*/
export interface LoanTransferResponse {

    /**
     *
     * @type {ReviewResolutionResponse}
     * @memberof LoanTransferResponse
     */
    reviewResolutionResponse: ReviewResolutionResponse

    /**
     * 采购合同（合同归档合同文件）20 & 21
     * @type {Array<AttachDocResponse>}
     * @memberof LoanTransferResponse
     */
    contractArchiveDocs: Array<AttachDocResponse>

    /**
     * 单次采购明细文件（采购合同归档合同文件）22
     * @type {Array<AttachDocResponse>}
     * @memberof LoanTransferResponse
     */
    purchaseDetailsDocs: Array<AttachDocResponse>

    /**
     *
     * @type {BillAmountResponse}
     * @memberof LoanTransferResponse
     */
    billAmountResponse: BillAmountResponse

    /**
     * 更多票面金额（总数）
     * @type {number | string}
     * @memberof LoanTransferResponse
     */
    billAmountNumber: number | string

    /**
     * 支付单申请金额
     * @type {number | string}
     * @memberof LoanTransferResponse
     */
    applyAmount: number | string

    /**
     * 上游支付方式:1-银行转帐;2-银行承兑
     * @type {number | string}
     * @memberof LoanTransferResponse
     */
    supplierPaymentType: number | string

    /**
     * 上游供应商【收款人名称】
     * @type {string}
     * @memberof LoanTransferResponse
     */
    supplierCompanyName: string

    /**
     * 供应商开户行名称
     * @type {string}
     * @memberof LoanTransferResponse
     */
    supplierAccountName: string

    /**
     * 供应商银行账号
     * @type {string}
     * @memberof LoanTransferResponse
     */
    supplierAccountNo: string

    /**
     * 银行联行号
     * @type {string}
     * @memberof LoanTransferResponse
     */
    supplierBankNo: string

    /**
     * 采购金额
     * @type {number | string}
     * @memberof LoanTransferResponse
     */
    purchaseAmount: number | string

}

/**
*
* @export
* @interface InterfaceCompensationMechanismResponse
*/
export interface InterfaceCompensationMechanismResponse {

    /**
     * id
     * @type {number | string}
     * @memberof InterfaceCompensationMechanismResponse
     */
    id: number | string

    /**
     * 支付单编号
     * @type {string}
     * @memberof InterfaceCompensationMechanismResponse
     */
    paymentOrderNo: string

    /**
     * 对接系统 1：司库 2：MIS 3：OA
     * @type {number | string}
     * @memberof InterfaceCompensationMechanismResponse
     */
    systemType: number | string

    /**
     * 业务id
     * @type {number | string}
     * @memberof InterfaceCompensationMechanismResponse
     */
    bizId: number | string

    /**
     * 接口 1：供应商创建接口 2：上游支付同步司库 3：上游支付同步OA 4：查询上游支付同步司库结果 5：查询预付款司库结果
     * @type {number | string}
     * @memberof InterfaceCompensationMechanismResponse
     */
    interfaceType: number | string

    /**
     * 报错原因
     * @type {string}
     * @memberof InterfaceCompensationMechanismResponse
     */
    remark: string

    /**
     * 是否解决
     * @type {boolean}
     * @memberof InterfaceCompensationMechanismResponse
     */
    resolved: boolean

    /**
     * 创建人
     * @type {string}
     * @memberof InterfaceCompensationMechanismResponse
     */
    createBy: string

    /**
     * 创建时间
     * @type {string}
     * @memberof InterfaceCompensationMechanismResponse
     */
    createTime: string

    /**
     * 删除标识
     * @type {boolean}
     * @memberof InterfaceCompensationMechanismResponse
     */
    deleted: boolean

}

/**
*
* @export
* @interface InterfaceCompensationMechanismPageRequest
*/
export interface InterfaceCompensationMechanismPageRequest {

    /**
     * 页码
     * @type {number | string}
     * @memberof InterfaceCompensationMechanismPageRequest
     */
    pageNumber?: number | string

    /**
     * 每页大小
     * @type {number | string}
     * @memberof InterfaceCompensationMechanismPageRequest
     */
    pageSize?: number | string

    /**
     *
     * @type {Sort}
     * @memberof InterfaceCompensationMechanismPageRequest
     */
    sort?: Sort

    /**
     * 对接系统 1：司库 2：MIS 3：OA
     * @type {number | string}
     * @memberof InterfaceCompensationMechanismPageRequest
     */
    systemType?: number | string

    /**
     * 接口 1：供应商创建接口 2：上游支付同步司库 3：上游支付同步OA
     * @type {number | string}
     * @memberof InterfaceCompensationMechanismPageRequest
     */
    interfaceType?: number | string

    /**
     * 调用开始日期
     * @type {string}
     * @memberof InterfaceCompensationMechanismPageRequest
     */
    startDate?: string

    /**
     * 调用结束日期
     * @type {string}
     * @memberof InterfaceCompensationMechanismPageRequest
     */
    endDate?: string

}

/**
*
* @export
* @interface IPageInterfaceCompensationMechanismResponse
*/
export interface IPageInterfaceCompensationMechanismResponse {

    /**
     *
     * @type {Array<InterfaceCompensationMechanismResponse>}
     * @memberof IPageInterfaceCompensationMechanismResponse
     */
    records: Array<InterfaceCompensationMechanismResponse>

    /**
     *
     * @type {number | string}
     * @memberof IPageInterfaceCompensationMechanismResponse
     */
    total: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageInterfaceCompensationMechanismResponse
     */
    pages: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageInterfaceCompensationMechanismResponse
     */
    current: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageInterfaceCompensationMechanismResponse
     */
    size: number | string

}

/**
*
* @export
* @interface IPageRespYear
*/
export interface IPageRespYear {

    /**
     *
     * @type {Array<RespYear>}
     * @memberof IPageRespYear
     */
    records: Array<RespYear>

    /**
     *
     * @type {number | string}
     * @memberof IPageRespYear
     */
    total: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageRespYear
     */
    pages: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageRespYear
     */
    current: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageRespYear
     */
    size: number | string

}

/**
*
* @export
* @interface RespYear
*/
export interface RespYear {

    /**
     * 年份
     * @type {number | string}
     * @memberof RespYear
     */
    year?: number | string

    /**
     * 工作日天数
     * @type {number | string}
     * @memberof RespYear
     */
    workingDayNum?: number | string

    /**
     * 非工作日天数
     * @type {number | string}
     * @memberof RespYear
     */
    holidayNum?: number | string

    /**
     * 维护人
     * @type {string}
     * @memberof RespYear
     */
    updateBy?: string

    /**
     * 维护时间
     * @type {string}
     * @memberof RespYear
     */
    updateTime?: string

}

/**
*
* @export
* @interface HolidayRecord
*/
export interface HolidayRecord {

    /**
     * id
     * @type {number | string}
     * @memberof HolidayRecord
     */
    id?: number | string

    /**
     * 年
     * @type {number | string}
     * @memberof HolidayRecord
     */
    year?: number | string

    /**
     * 记录明细
     * @type {string}
     * @memberof HolidayRecord
     */
    operationDetails?: string

    /**
     * 操作人
     * @type {string}
     * @memberof HolidayRecord
     */
    createBy?: string

    /**
     * 操作时间
     * @type {string}
     * @memberof HolidayRecord
     */
    createTime?: string

}

/**
*
* @export
* @interface IPageHolidayRecord
*/
export interface IPageHolidayRecord {

    /**
     *
     * @type {Array<HolidayRecord>}
     * @memberof IPageHolidayRecord
     */
    records: Array<HolidayRecord>

    /**
     *
     * @type {number | string}
     * @memberof IPageHolidayRecord
     */
    total: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageHolidayRecord
     */
    pages: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageHolidayRecord
     */
    current: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageHolidayRecord
     */
    size: number | string

}

/**
*
* @export
* @interface RespPaymentFundDetail
*/
export interface RespPaymentFundDetail {

    /**
     * 采购单名称
     * @type {string}
     * @memberof RespPaymentFundDetail
     */
    purchaseOrderName: string

    /**
     * 支付单编号
     * @type {string}
     * @memberof RespPaymentFundDetail
     */
    paymentOrderNo: string

    /**
     * 状态：
	 * 状态：0-支付单待审核;
	 * 1-首付款待支付;
	 * 2-首付款待确认;
	 * 3-上游支付确认中;
	 * 4-上游支付中;
	 * 5--待出票;
	 * 6-正在出票;
	 * 7-待发货;
	 * 8-待收货;
	 * 9-剩余货款待支付;
	 * 10-剩余货款待确认;
	 * 11-支付单完成;
	 * 12-支付单关闭;
	 * 13-支付单取消;

     * @type {number | string}
     * @memberof RespPaymentFundDetail
     */
    status: number | string

    /**
     * 账单状态 1：无账单 2：进行中 3：已结清
     * @type {number | string}
     * @memberof RespPaymentFundDetail
     */
    billStatus: number | string

    /**
     * 已支付金额
     * @type {number | string}
     * @memberof RespPaymentFundDetail
     */
    payAmount: number | string

    /**
     * 待支付金额
     * @type {number | string}
     * @memberof RespPaymentFundDetail
     */
    noPayAmount: number | string

    /**
     * 支付进度
     * @type {number | string}
     * @memberof RespPaymentFundDetail
     */
    payProcess: number | string

    /**
     * 最近应支付日期
     * @type {string}
     * @memberof RespPaymentFundDetail
     */
    payableDate: string

    /**
     * 账单流水
     * @type {Array<Fund>}
     * @memberof RespPaymentFundDetail
     */
    fundList: Array<Fund>

}

/**
*
* @export
* @interface FundResponse
*/
export interface FundResponse {

    /**
     * 主键id
     * @type {number | string}
     * @memberof FundResponse
     */
    id: number | string

    /**
     * 支付单Id/预付款单id
     * @type {number | string}
     * @memberof FundResponse
     */
    orderId: number | string

    /**
     * 预计应收金额
     * @type {number | string}
     * @memberof FundResponse
     */
    receivableAmount: number | string

    /**
     * 支付金额
     * @type {number | string}
     * @memberof FundResponse
     */
    paymentAmount: number | string

    /**
     * 还款类型：1-首付款；2-剩余货款；3-服务费；4-预付款
     * @type {number | string}
     * @memberof FundResponse
     */
    repaymentType: number | string

    /**
     * 服务费期数
     * @type {number | string}
     * @memberof FundResponse
     */
    feeRepaymentOrder: number | string

    /**
     * 备注
     * @type {string}
     * @memberof FundResponse
     */
    remark: string

    /**
     * 支付状态：0-待支付；1-支付待确认；2-已支付；3-支付失败；4-已取消
     * @type {number | string}
     * @memberof FundResponse
     */
    paymentFlag: number | string

    /**
     * 应支付日期
     * @type {string}
     * @memberof FundResponse
     */
    schedulePaymentDate: string

    /**
     * 实际支付金额
     * @type {number | string}
     * @memberof FundResponse
     */
    paidAmount: number | string

    /**
     * 待支付金额
     * @type {number | string}
     * @memberof FundResponse
     */
    unPaidAmount: number | string

    /**
     * 支付待确认金额
     * @type {number | string}
     * @memberof FundResponse
     */
    unConfirmedAmount: number | string

    /**
     * 创建人
     * @type {string}
     * @memberof FundResponse
     */
    createBy: string

    /**
     * 创建时间
     * @type {string}
     * @memberof FundResponse
     */
    createTime: string

    /**
     * 更新人
     * @type {string}
     * @memberof FundResponse
     */
    updateBy: string

    /**
     * 更新时间
     * @type {string}
     * @memberof FundResponse
     */
    updateTime: string

    /**
     * 是否批量支付 0否1是
     * @type {boolean}
     * @memberof FundResponse
     */
    payBatch: boolean

}

/**
*
* @export
* @interface ReqFundListQuery
*/
export interface ReqFundListQuery {

    /**
     * 页码
     * @type {number | string}
     * @memberof ReqFundListQuery
     */
    pageNumber?: number | string

    /**
     * 每页大小
     * @type {number | string}
     * @memberof ReqFundListQuery
     */
    pageSize?: number | string

    /**
     *
     * @type {Sort}
     * @memberof ReqFundListQuery
     */
    sort?: Sort

    /**
     * 账单Id
     * @type {number | string}
     * @memberof ReqFundListQuery
     */
    fundId?: number | string

    /**
     * 项目Id
     * @type {Array<number | string>}
     * @memberof ReqFundListQuery
     */
    projectIds?: Array<number | string>

    /**
     * 支付单
     * @type {number | string}
     * @memberof ReqFundListQuery
     */
    orderId?: number | string

    /**
     * 公司id
     * @type {number | string}
     * @memberof ReqFundListQuery
     */
    companyId?: number | string

    /**
     * 账单类型：1-首付款；2-剩余货款；3-服务费；多个状态用逗号分隔
     * @type {string}
     * @memberof ReqFundListQuery
     */
    repaymentTypeArrays?: string

    /**
     * 账单支付状态：0-待支付；1-支付待确认；2-已支付；3-支付失败；4-已取消  多个状态用逗号分隔
     * @type {string}
     * @memberof ReqFundListQuery
     */
    paymentFlagArrays?: string

    /**
     * 客户经理电话
     * @type {string}
     * @memberof ReqFundListQuery
     */
    customerManagerMobile?: string

    /**
     * 客户经理名称
     * @type {string}
     * @memberof ReqFundListQuery
     */
    customerManager?: string

    /**
     * 会员Id
     * @type {number | string}
     * @memberof ReqFundListQuery
     */
    userId?: number | string

    /**
     * 应支付开始时间
     * @type {string}
     * @memberof ReqFundListQuery
     */
    scheduleStartTime?: string

    /**
     * 应支付结束时间
     * @type {string}
     * @memberof ReqFundListQuery
     */
    scheduleEndTime?: string

    /**
     * 客户经理id
     * @type {string}
     * @memberof ReqFundListQuery
     */
    customerUserId?: string

    /**
     * 项目名称
     * @type {string}
     * @memberof ReqFundListQuery
     */
    projectName?: string

}

/**
*
* @export
* @interface ReqFundSimpleQuery
*/
export interface ReqFundSimpleQuery {

    /**
     * 账单Id
     * @type {number | string}
     * @memberof ReqFundSimpleQuery
     */
    id?: number | string

    /**
     * 支付单Id
     * @type {number | string}
     * @memberof ReqFundSimpleQuery
     */
    orderId?: number | string

}

/**
*
* @export
* @interface ReqFundAttachDetail
*/
export interface ReqFundAttachDetail {

    /**
     * 业务Id
     * @type {number | string}
     * @memberof ReqFundAttachDetail
     */
    bizId?: number | string

    /**
     * 业务类型：1-票据；2-货物；3-上游支付凭证；4-还款支付凭证；5-采购单；
     * @type {number | string}
     * @memberof ReqFundAttachDetail
     */
    bizType?: number | string

}

/**
*
* @export
* @interface PrepaymentFundRequest
*/
export interface PrepaymentFundRequest {

    /**
     * 页码
     * @type {number | string}
     * @memberof PrepaymentFundRequest
     */
    pageNumber?: number | string

    /**
     * 每页大小
     * @type {number | string}
     * @memberof PrepaymentFundRequest
     */
    pageSize?: number | string

    /**
     *
     * @type {Sort}
     * @memberof PrepaymentFundRequest
     */
    sort?: Sort

    /**
     * 预付款Id
     * @type {number | string}
     * @memberof PrepaymentFundRequest
     */
    prepaymentOrderId?: number | string

    /**
     * 预付款编号
     * @type {string}
     * @memberof PrepaymentFundRequest
     */
    prepaymentNo?: string

    /**
     * 支付状态：0-待支付；1-支付待确认；2-已支付；3-支付失败；4-已取消
     * @type {number | string}
     * @memberof PrepaymentFundRequest
     */
    paymentFlag?: number | string

    /**
     * 项目名称
     * @type {string}
     * @memberof PrepaymentFundRequest
     */
    projectName?: string

    /**
     * 经销商名称
     * @type {string}
     * @memberof PrepaymentFundRequest
     */
    companyName?: string

    /**
     * 经销商ID
     * @type {number | string}
     * @memberof PrepaymentFundRequest
     */
    companyId?: number | string

    /**
     * 所属分部编号
     * @type {string}
     * @memberof PrepaymentFundRequest
     */
    subsectionCode?: string

    /**
     * 工号
     * @type {string}
     * @memberof PrepaymentFundRequest
     */
    jobNumber?: string

    /**
     * 菜单code
     * @type {string}
     * @memberof PrepaymentFundRequest
     */
    authCode?: string

    /**
     * 菜单code
     * @type {string}
     * @memberof PrepaymentFundRequest
     */
    deptCodeList?: string

    /**
     * 应支付开始日期
     * @type {string}
     * @memberof PrepaymentFundRequest
     */
    scheduleStartTime?: string

    /**
     * 应支付结束日期
     * @type {string}
     * @memberof PrepaymentFundRequest
     */
    scheduleEndTime?: string

    /**
     * 支付成功开始时间
     * @type {string}
     * @memberof PrepaymentFundRequest
     */
    paidStartTime?: string

    /**
     * 支成功结束时间
     * @type {string}
     * @memberof PrepaymentFundRequest
     */
    paidEndTime?: string

    /**
     * 会员Id 小程序数据权限
     * @type {number | string}
     * @memberof PrepaymentFundRequest
     */
    userId?: number | string

    /**
     * 客户经理id CRM数据权限
     * @type {string}
     * @memberof PrepaymentFundRequest
     */
    customerUserId?: string

    /**
     * 最小已支付金额
     * @type {number | string}
     * @memberof PrepaymentFundRequest
     */
    minPaidAmount?: number | string

    /**
     * 最大已支付金额
     * @type {number | string}
     * @memberof PrepaymentFundRequest
     */
    maxPaidAmount?: number | string

    /**
     * 最小待支付确认金额
     * @type {number | string}
     * @memberof PrepaymentFundRequest
     */
    minUnconfirmedAmount?: number | string

    /**
     * 最大待支付确认金额
     * @type {number | string}
     * @memberof PrepaymentFundRequest
     */
    maxUnconfirmedAmount?: number | string

    /**
     * 最小未支付金额
     * @type {number | string}
     * @memberof PrepaymentFundRequest
     */
    minUnpaidAmount?: number | string

    /**
     * 最大未支付金额
     * @type {number | string}
     * @memberof PrepaymentFundRequest
     */
    maxUnpaidAmount?: number | string

    /**
     * 账单支付状态：0-待支付；1-支付待确认；2-已支付；3-支付失败；4-已取消  多个状态用逗号分隔
     * @type {string}
     * @memberof PrepaymentFundRequest
     */
    paymentFlagArrays?: string

}

/**
*
* @export
* @interface IPagePrepaymentFundResponse
*/
export interface IPagePrepaymentFundResponse {

    /**
     *
     * @type {Array<PrepaymentFundResponse>}
     * @memberof IPagePrepaymentFundResponse
     */
    records: Array<PrepaymentFundResponse>

    /**
     *
     * @type {number | string}
     * @memberof IPagePrepaymentFundResponse
     */
    total: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPagePrepaymentFundResponse
     */
    pages: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPagePrepaymentFundResponse
     */
    current: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPagePrepaymentFundResponse
     */
    size: number | string

}

/**
*
* @export
* @interface PrepaymentFundResponse
*/
export interface PrepaymentFundResponse {

    /**
     * 账单Id
     * @type {number | string}
     * @memberof PrepaymentFundResponse
     */
    id?: number | string

    /**
     * 预付款Id
     * @type {number | string}
     * @memberof PrepaymentFundResponse
     */
    prepaymentOrderId?: number | string

    /**
     * 预付款编号
     * @type {string}
     * @memberof PrepaymentFundResponse
     */
    prepaymentNo?: string

    /**
     * 预付款（账单）金额
     * @type {number | string}
     * @memberof PrepaymentFundResponse
     */
    paymentAmount?: number | string

    /**
     * 支付成功时间
     * @type {string}
     * @memberof PrepaymentFundResponse
     */
    paidTime?: string

    /**
     * 支付状态：0-待支付；1-支付待确认；2-已支付；3-支付失败；4-已取消
     * @type {number | string}
     * @memberof PrepaymentFundResponse
     */
    paymentFlag?: number | string

    /**
     * 应支付日期
     * @type {string}
     * @memberof PrepaymentFundResponse
     */
    schedulePaymentDate?: string

    /**
     * 项目名称
     * @type {string}
     * @memberof PrepaymentFundResponse
     */
    projectName?: string

    /**
     * 经销商名称
     * @type {string}
     * @memberof PrepaymentFundResponse
     */
    companyName?: string

    /**
     * 所属分部名称
     * @type {string}
     * @memberof PrepaymentFundResponse
     */
    subsectionName?: string

    /**
     * 修改时间
     * @type {string}
     * @memberof PrepaymentFundResponse
     */
    updateTime?: string

    /**
     * 客户经理
     * @type {string}
     * @memberof PrepaymentFundResponse
     */
    customerName?: string

    /**
     * 客户经理手机号
     * @type {string}
     * @memberof PrepaymentFundResponse
     */
    customerMobile?: string

    /**
     * 是否展示[支付确认]
     * @type {boolean}
     * @memberof PrepaymentFundResponse
     */
    showPayConfirm?: boolean

    /**
     * 已支付金额
     * @type {number | string}
     * @memberof PrepaymentFundResponse
     */
    paidAmount?: number | string

    /**
     * 支付待确认金额
     * @type {number | string}
     * @memberof PrepaymentFundResponse
     */
    unconfirmedAmount?: number | string

    /**
     * 未支付金额
     * @type {number | string}
     * @memberof PrepaymentFundResponse
     */
    unpaidAmount?: number | string

}

/**
*
* @export
* @interface FundDetailListQueryRequest
*/
export interface FundDetailListQueryRequest {

    /**
     * 账单id
     * @type {number | string}
     * @memberof FundDetailListQueryRequest
     */
    fundId: number | string

    /**
     * 支付状态 1：支付待确认 2：已支付 3：支付并未收到
     * @type {Array<number | string>}
     * @memberof FundDetailListQueryRequest
     */
    paymentFlagList: Array<number | string>

}

/**
*
* @export
* @interface FundDetailClaimResponse
*/
export interface FundDetailClaimResponse {

    /**
     * 账单id
     * @type {number | string}
     * @memberof FundDetailClaimResponse
     */
    fundId: number | string

    /**
     * 账单金额
     * @type {number | string}
     * @memberof FundDetailClaimResponse
     */
    fundAmount: number | string

    /**
     * 支付金额(本次)
     * @type {number | string}
     * @memberof FundDetailClaimResponse
     */
    paymentAmount: number | string

    /**
     * 还款类型：1-首付款；2-剩余货款；3-服务费；4-预付款
     * @type {number | string}
     * @memberof FundDetailClaimResponse
     */
    repaymentType: number | string

    /**
     * 支付状态 1：支付待确认 2：已支付 3：支付并未收到
     * @type {number | string}
     * @memberof FundDetailClaimResponse
     */
    paymentFlag: number | string

    /**
     * 项目
     * @type {string}
     * @memberof FundDetailClaimResponse
     */
    projectName: string

    /**
     * 经销商
     * @type {string}
     * @memberof FundDetailClaimResponse
     */
    companyName: string

    /**
     * 经销商id
     * @type {number | string}
     * @memberof FundDetailClaimResponse
     */
    companyId: number | string

    /**
     * 应支付日期
     * @type {string}
     * @memberof FundDetailClaimResponse
     */
    schedulePaymentDate: string

}

/**
*
* @export
* @interface RemainPaymentDetailResponse
*/
export interface RemainPaymentDetailResponse {

    /**
     * 收款账户户名
     * @type {string}
     * @memberof RemainPaymentDetailResponse
     */
    receiverAccountName: string

    /**
     * 收款账户银行账号
     * @type {string}
     * @memberof RemainPaymentDetailResponse
     */
    receiverAccountNo: string

    /**
     * 收款账户开户行
     * @type {string}
     * @memberof RemainPaymentDetailResponse
     */
    receiverAccountBank: string

    /**
     * 剩余货款总金额
     * @type {number | string}
     * @memberof RemainPaymentDetailResponse
     */
    totalAmount: number | string

    /**
     * 已支付金额
     * @type {number | string}
     * @memberof RemainPaymentDetailResponse
     */
    paidAmount: number | string

    /**
     * 支付待确认金额
     * @type {number | string}
     * @memberof RemainPaymentDetailResponse
     */
    unconfirmedAmount: number | string

    /**
     * 待支付金额
     * @type {number | string}
     * @memberof RemainPaymentDetailResponse
     */
    unpaidAmount: number | string

}

/**
*
* @export
* @interface CompanyFundUnPaidResponse
*/
export interface CompanyFundUnPaidResponse {

    /**
     * 账户余额：取该企业对应的未认领的流水金额之和
     * @type {number | string}
     * @memberof CompanyFundUnPaidResponse
     */
    companyBalance: number | string

    /**
     * 待回款：取该企业待支付和支付待确认、支付失败状态的尾款和服务费金额中待支付和支付待确认的金额之和
     * @type {number | string}
     * @memberof CompanyFundUnPaidResponse
     */
    pendPayment: number | string

}

/**
*
* @export
* @interface RemainPaymentFundDetailResponse
*/
export interface RemainPaymentFundDetailResponse {

    /**
     * 账单id
     * @type {number | string}
     * @memberof RemainPaymentFundDetailResponse
     */
    fundId: number | string

    /**
     * 公司id
     * @type {number | string}
     * @memberof RemainPaymentFundDetailResponse
     */
    companyId: number | string

    /**
     * 应支付金额 （账单总金额）
     * @type {number | string}
     * @memberof RemainPaymentFundDetailResponse
     */
    paymentAmount: number | string

    /**
     * 实际支付金额（已支付金额）
     * @type {number | string}
     * @memberof RemainPaymentFundDetailResponse
     */
    paidAmount: number | string

    /**
     * 支付待确认金额
     * @type {number | string}
     * @memberof RemainPaymentFundDetailResponse
     */
    unconfirmedAmount: number | string

    /**
     * 待支付金额
     * @type {number | string}
     * @memberof RemainPaymentFundDetailResponse
     */
    unpaidAmount: number | string

    /**
     * 应支付日期
     * @type {string}
     * @memberof RemainPaymentFundDetailResponse
     */
    schedulePaymentDate: string

    /**
     * 剩余货款支付明细
     * @type {Array<FundDetailResponse>}
     * @memberof RemainPaymentFundDetailResponse
     */
    fundDetailResponseList: Array<FundDetailResponse>

    /**
     * 付款主体
     * @type {string}
     * @memberof RemainPaymentFundDetailResponse
     */
    paymentMain: string

    /**
     * 付款主体银行账号
     * @type {string}
     * @memberof RemainPaymentFundDetailResponse
     */
    payeeBankAccount: string

}

/**
*
* @export
* @interface ReqFundMonthBill
*/
export interface ReqFundMonthBill {

    /**
     * 年月 格式：yyyy-MM
     * @type {string}
     * @memberof ReqFundMonthBill
     */
    month: string

    /**
     * 企业id
     * @type {number | string}
     * @memberof ReqFundMonthBill
     */
    companyId: number | string

    /**
     * 客户id
     * @type {number | string}
     * @memberof ReqFundMonthBill
     */
    userId: number | string

}

/**
*
* @export
* @interface RespFundBill
*/
export interface RespFundBill {

    /**
     * 账单状态 1：无账单 2：进行中 3：已结清
     * @type {number | string}
     * @memberof RespFundBill
     */
    billStatus: number | string

    /**
     * 账单总金额
     * @type {number | string}
     * @memberof RespFundBill
     */
    totalAmount: number | string

    /**
     * 已支付金额
     * @type {number | string}
     * @memberof RespFundBill
     */
    payAmount: number | string

    /**
     * 待支付金额
     * @type {number | string}
     * @memberof RespFundBill
     */
    noPayAmount: number | string

    /**
     * 最近应支付日期
     * @type {string}
     * @memberof RespFundBill
     */
    payableDate: string

    /**
     * 账单流水
     * @type {Array<RespMonthStaticFundDetail>}
     * @memberof RespFundBill
     */
    fundList: Array<RespMonthStaticFundDetail>

    /**
     * 支付进度
     * @type {number | string}
     * @memberof RespFundBill
     */
    payProcess: number | string

}

/**
* 账单流水
* @export
* @interface RespMonthStaticFundDetail
*/
export interface RespMonthStaticFundDetail {

    /**
     * 账单Id
     * @type {number | string}
     * @memberof RespMonthStaticFundDetail
     */
    id?: number | string

    /**
     * 支付单Id
     * @type {number | string}
     * @memberof RespMonthStaticFundDetail
     */
    orderId?: number | string

    /**
     * 支付单状态：0-待项目运营审核;1-首付款待支付;2-首付款待确认;8-待收货;9-尾款待支付;10-尾款待确认;11-支付单完成;12-支付单关闭;13-支付单取消;14-待分财审核;15-支付单审核中;
     * @type {number | string}
     * @memberof RespMonthStaticFundDetail
     */
    paymentOrderStatus?: number | string

    /**
     * 支付单编号
     * @type {string}
     * @memberof RespMonthStaticFundDetail
     */
    paymentOrderNo?: string

    /**
     * 还款类型：1-首付款；2-剩余货款；3-服务费；
     * @type {number | string}
     * @memberof RespMonthStaticFundDetail
     */
    repaymentType?: number | string

    /**
     * 服务费期数
     * @type {number | string}
     * @memberof RespMonthStaticFundDetail
     */
    feeRepaymentOrder?: number | string

    /**
     * 备注
     * @type {string}
     * @memberof RespMonthStaticFundDetail
     */
    remark?: string

    /**
     * 支付方式:1-银行转帐;2-银行承兑
     * @type {number | string}
     * @memberof RespMonthStaticFundDetail
     */
    paymentType?: number | string

    /**
     * 实际支付金额
     * @type {number | string}
     * @memberof RespMonthStaticFundDetail
     */
    paidAmount?: number | string

    /**
     * 实际支付日期
     * @type {string}
     * @memberof RespMonthStaticFundDetail
     */
    paidDate?: string

    /**
     * 支付（成功/失败）时间
     * @type {string}
     * @memberof RespMonthStaticFundDetail
     */
    paidTime?: string

    /**
     * 支付状态：0-待支付；1-支付待确认；2-已支付；3-支付失败；4-已取消
     * @type {number | string}
     * @memberof RespMonthStaticFundDetail
     */
    paymentFlag?: number | string

    /**
     * 应支付金额
     * @type {number | string}
     * @memberof RespMonthStaticFundDetail
     */
    paymentAmount?: number | string

    /**
     * 应支付日期
     * @type {string}
     * @memberof RespMonthStaticFundDetail
     */
    schedulePaymentDate?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof RespMonthStaticFundDetail
     */
    createTime?: string

    /**
     * 创建人
     * @type {string}
     * @memberof RespMonthStaticFundDetail
     */
    createBy?: string

    /**
     * 修改时间
     * @type {string}
     * @memberof RespMonthStaticFundDetail
     */
    updateTime?: string

    /**
     * 修改人
     * @type {string}
     * @memberof RespMonthStaticFundDetail
     */
    updateBy?: string

}

/**
*
* @export
* @interface ReqFundCurrentMonthBill
*/
export interface ReqFundCurrentMonthBill {

    /**
     * 企业id
     * @type {number | string}
     * @memberof ReqFundCurrentMonthBill
     */
    companyId: number | string

    /**
     * 客户id
     * @type {number | string}
     * @memberof ReqFundCurrentMonthBill
     */
    userId: number | string

}

/**
*
* @export
* @interface RespCurrentMonthFundStatic
*/
export interface RespCurrentMonthFundStatic {

    /**
     * 当前月份
     * @type {number | string}
     * @memberof RespCurrentMonthFundStatic
     */
    month: number | string

    /**
     * 账单状态 1：有账单 2：无账单
     * @type {number | string}
     * @memberof RespCurrentMonthFundStatic
     */
    fundStatus: number | string

}

/**
*
* @export
* @interface RespContractStatusStatic
*/
export interface RespContractStatusStatic {

    /**
     * 待分财审核数量
     * @type {number | string}
     * @memberof RespContractStatusStatic
     */
    financeManagerWaitingNum: number | string

    /**
     * 待运营审核数量
     * @type {number | string}
     * @memberof RespContractStatusStatic
     */
    riskManagerWaitingNum: number | string

    /**
     * 待法务审核数量
     * @type {number | string}
     * @memberof RespContractStatusStatic
     */
    lawManagerWaitingNum: number | string

}

/**
*
* @export
* @interface ReqContractPageQuery
*/
export interface ReqContractPageQuery {

    /**
     * 页码
     * @type {number | string}
     * @memberof ReqContractPageQuery
     */
    pageNumber?: number | string

    /**
     * 每页大小
     * @type {number | string}
     * @memberof ReqContractPageQuery
     */
    pageSize?: number | string

    /**
     *
     * @type {Sort}
     * @memberof ReqContractPageQuery
     */
    sort?: Sort

    /**
     * 合同名称/编号
     * @type {string}
     * @memberof ReqContractPageQuery
     */
    contractNoOrName?: string

    /**
     * 合同Id
     * @type {number | string}
     * @memberof ReqContractPageQuery
     */
    contractId?: number | string

    /**
     * 所属分部编号
     * @type {string}
     * @memberof ReqContractPageQuery
     */
    subsectionCode?: string

    /**
     * 企业名称
     * @type {string}
     * @memberof ReqContractPageQuery
     */
    companyName?: string

    /**
     * 项目名称
     * @type {string}
     * @memberof ReqContractPageQuery
     */
    projectName?: string

    /**
     * 合同类型列表，逗号分隔
     * @type {string}
     * @memberof ReqContractPageQuery
     */
    contractTypeIdArrays?: string

    /**
     * 合同状态列表，逗号分隔：1：草稿 2：待分财审核 3：分财审核未通过 4：待风控审核/待运营审核 5：风控审核未通过/运营审核未通过 6：待法务审核 7：法务审核未通过 8：待客户签署 9：客户拒签 10：待平台签署 11：平台签署未通过 12：合同已签署 13：异常关闭 14：超时关闭 15：用印发起失败 16：发起线上待客户签署 17：合同废止
     * @type {string}
     * @memberof ReqContractPageQuery
     */
    contractStatusArrays?: string

    /**
     * 发起人
     * @type {string}
     * @memberof ReqContractPageQuery
     */
    createBy?: string

    /**
     * 发起人手机号
     * @type {string}
     * @memberof ReqContractPageQuery
     */
    createPhone?: string

    /**
     * 发起开始时间
     * @type {string}
     * @memberof ReqContractPageQuery
     */
    createStartTime?: string

    /**
     * 发起结束时间
     * @type {string}
     * @memberof ReqContractPageQuery
     */
    createEndTime?: string

    /**
     * 更新开始时间
     * @type {string}
     * @memberof ReqContractPageQuery
     */
    updateStartTime?: string

    /**
     * 更新结束时间
     * @type {string}
     * @memberof ReqContractPageQuery
     */
    updateEndTime?: string

    /**
     * 工程列表id
     * @type {Array<number | string>}
     * @memberof ReqContractPageQuery
     */
    projectIds?: Array<number | string>

    /**
     * 创建时间排序方式asc/desc
     * @type {string}
     * @memberof ReqContractPageQuery
     */
    createTimeOrder?: string

    /**
     * 更新时间排序方式asc/desc
     * @type {string}
     * @memberof ReqContractPageQuery
     */
    updateTimeOrder?: string

    /**
     * 工号
     * @type {string}
     * @memberof ReqContractPageQuery
     */
    jobNumber?: string

    /**
     * 菜单code
     * @type {string}
     * @memberof ReqContractPageQuery
     */
    authCode?: string

    /**
     * 合同是否归档 true：已归档 false：未归档
     * @type {boolean}
     * @memberof ReqContractPageQuery
     */
    archive?: boolean

}

/**
*
* @export
* @interface IPageRespContract
*/
export interface IPageRespContract {

    /**
     *
     * @type {Array<RespContract>}
     * @memberof IPageRespContract
     */
    records: Array<RespContract>

    /**
     *
     * @type {number | string}
     * @memberof IPageRespContract
     */
    total: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageRespContract
     */
    pages: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageRespContract
     */
    current: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageRespContract
     */
    size: number | string

}

/**
*
* @export
* @interface ReqContractListQuery
*/
export interface ReqContractListQuery {

    /**
     * 合同名称
     * @type {string}
     * @memberof ReqContractListQuery
     */
    contractName?: string

    /**
     * 合同类型id
     * @type {number | string}
     * @memberof ReqContractListQuery
     */
    contractTypeId?: number | string

    /**
     * 公司id
     * @type {number | string}
     * @memberof ReqContractListQuery
     */
    companyId?: number | string

    /**
     * 采购单id
     * @type {number | string}
     * @memberof ReqContractListQuery
     */
    purchaseOrderId?: number | string

    /**
     * 合同状态：1：草稿 2：待分财审核 3：分财审核未通过 4：待风控审核/待运营审核 5：风控审核未通过/运营审核未通过 6：待法务审核 7：法务审核未通过 8：待客户签署 9：客户拒签 10：待平台签署 11：平台签署未通过 12：合同已签署 13：异常关闭 14：超时关闭 15：用印发起失败 16：发起线上待客户签署 17：合同废止
     * @type {Array<number | string>}
     * @memberof ReqContractListQuery
     */
    contractStatusList?: Array<number | string>

}

/**
*
* @export
* @interface RespContractEditNumber
*/
export interface RespContractEditNumber {

    /**
     * 分财修订数量
     * @type {number | string}
     * @memberof RespContractEditNumber
     */
    subFinanceEditNumber: number | string

    /**
     * 运营修订数量
     * @type {number | string}
     * @memberof RespContractEditNumber
     */
    windControlEditNumber: number | string

    /**
     * 法务修订数量
     * @type {number | string}
     * @memberof RespContractEditNumber
     */
    legalAffairsEditNumber: number | string

}

/**
*
* @export
* @interface ReqCrmContractPageQuery
*/
export interface ReqCrmContractPageQuery {

    /**
     * 页码
     * @type {number | string}
     * @memberof ReqCrmContractPageQuery
     */
    pageNumber?: number | string

    /**
     * 每页大小
     * @type {number | string}
     * @memberof ReqCrmContractPageQuery
     */
    pageSize?: number | string

    /**
     *
     * @type {Sort}
     * @memberof ReqCrmContractPageQuery
     */
    sort?: Sort

    /**
     * 合同名称
     * @type {string}
     * @memberof ReqCrmContractPageQuery
     */
    contractName?: string

    /**
     * 合同类型列表，逗号分隔
     * @type {string}
     * @memberof ReqCrmContractPageQuery
     */
    contractTypeIdArrays?: string

    /**
     * 合同状态列表，逗号分隔：1：草稿 2：待分财审核 3：分财审核未通过 4：待风控审核/待运营审核 5：风控审核未通过/运营审核未通过 6：待法务审核 7：法务审核未通过 8：待客户签署 9：客户拒签 10：待平台签署 11：平台签署未通过 12：合同已签署 13：异常关闭 14：超时关闭 15：用印发起失败 16：发起线上待客户签署 17：合同废止
     * @type {string}
     * @memberof ReqCrmContractPageQuery
     */
    contractStatusArrays?: string

    /**
     * 更新开始时间
     * @type {string}
     * @memberof ReqCrmContractPageQuery
     */
    updateStartTime?: string

    /**
     * 更新结束时间
     * @type {string}
     * @memberof ReqCrmContractPageQuery
     */
    updateEndTime?: string

    /**
     * 创建时间排序方式asc/desc
     * @type {string}
     * @memberof ReqCrmContractPageQuery
     */
    createTimeOrder?: string

    /**
     * 更新时间排序方式asc/desc
     * @type {string}
     * @memberof ReqCrmContractPageQuery
     */
    updateTimeOrder?: string

    /**
     * crm企业微信id
     * @type {string}
     * @memberof ReqCrmContractPageQuery
     */
    corpUserId?: string

    /**
     * 项目id
     * @type {number | string}
     * @memberof ReqCrmContractPageQuery
     */
    projectId?: number | string

}

/**
*
* @export
* @interface AppletContractPageRequest
*/
export interface AppletContractPageRequest {

    /**
     * 合同名称
     * @type {string}
     * @memberof AppletContractPageRequest
     */
    contractName?: string

    /**
     * 公司id
     * @type {number | string}
     * @memberof AppletContractPageRequest
     */
    companyId: number | string

}

/**
*
* @export
* @interface AppletContractResponse
*/
export interface AppletContractResponse {

    /**
     * 合同id
     * @type {number | string}
     * @memberof AppletContractResponse
     */
    id?: number | string

    /**
     * 项目id
     * @type {number | string}
     * @memberof AppletContractResponse
     */
    projectId?: number | string

    /**
     * 合同名称
     * @type {string}
     * @memberof AppletContractResponse
     */
    contractName?: string

    /**
     * 合同链接
     * @type {string}
     * @memberof AppletContractResponse
     */
    contractUrl?: string

    /**
     * 合同编号
     * @type {string}
     * @memberof AppletContractResponse
     */
    contractNo?: string

    /**
     * 合同类型id 10000：其他合同 10001：担保合同 10002：应收账款质押合同 10003：销售合同 10005：采购合同 10010：VIP战略合作协议
     * @type {number | string}
     * @memberof AppletContractResponse
     */
    contractTypeId?: number | string

    /**
     * 合同内容
     * @type {string}
     * @memberof AppletContractResponse
     */
    contractContent?: string

    /**
     * 合同字段键值对
     * @type {string}
     * @memberof AppletContractResponse
     */
    contractFieldsList?: string

    /**
     * 合同状态：1：草稿 2：待分财审核 3：分财审核未通过 4：待风控审核/待运营审核 5：风控审核未通过/运营审核未通过 6：待法务审核 7：法务审核未通过 8：待客户签署 9：客户拒签 10：待平台签署 11：平台签署未通过 12：合同已签署 13：异常关闭 14：超时关闭 15：用印发起失败 16：发起线上待客户签署 17：合同废止
     * @type {number | string}
     * @memberof AppletContractResponse
     */
    contractStatus?: number | string

    /**
     * 合同签署类型 1：线上 2：线下
     * @type {number | string}
     * @memberof AppletContractResponse
     */
    contractSignType?: number | string

    /**
     * 合同签署流程id
     * @type {string}
     * @memberof AppletContractResponse
     */
    flowId?: string

    /**
     * 创建人
     * @type {string}
     * @memberof AppletContractResponse
     */
    createBy?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof AppletContractResponse
     */
    createTime?: string

    /**
     * 更新人
     * @type {string}
     * @memberof AppletContractResponse
     */
    updateBy?: string

    /**
     * 更新时间
     * @type {string}
     * @memberof AppletContractResponse
     */
    updateTime?: string

    /**
     * 签署完成时间
     * @type {string}
     * @memberof AppletContractResponse
     */
    signedTime?: string

}

/**
*
* @export
* @interface IPageAppletContractResponse
*/
export interface IPageAppletContractResponse {

    /**
     *
     * @type {Array<AppletContractResponse>}
     * @memberof IPageAppletContractResponse
     */
    records: Array<AppletContractResponse>

    /**
     *
     * @type {number | string}
     * @memberof IPageAppletContractResponse
     */
    total: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageAppletContractResponse
     */
    pages: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageAppletContractResponse
     */
    current: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageAppletContractResponse
     */
    size: number | string

}

/**
*
* @export
* @interface ReqTemplateQuery
*/
export interface ReqTemplateQuery {

    /**
     * 合同类型权限 1：系统 2：业务
     * @type {number | string}
     * @memberof ReqTemplateQuery
     */
    typeAuth?: number | string

    /**
     * 类型id
     * @type {number | string}
     * @memberof ReqTemplateQuery
     */
    typeId?: number | string

    /**
     * 模板名称or编码
     * @type {string}
     * @memberof ReqTemplateQuery
     */
    templateName?: string

    /**
     * 状态：0.禁用 1.启用（默认禁用）
     * @type {number | string}
     * @memberof ReqTemplateQuery
     */
    status?: number | string

    /**
     * 签署方式 1：电子签 2：线下签
     * @type {number | string}
     * @memberof ReqTemplateQuery
     */
    recommendSigner?: number | string

    /**
     * 平台签署方来源 1：指定企业 2：合同企业
     * @type {number | string}
     * @memberof ReqTemplateQuery
     */
    platformSignSource?: number | string

}

/**
*
* @export
* @interface IPageRespContractTemplate
*/
export interface IPageRespContractTemplate {

    /**
     *
     * @type {Array<RespContractTemplate>}
     * @memberof IPageRespContractTemplate
     */
    records: Array<RespContractTemplate>

    /**
     *
     * @type {number | string}
     * @memberof IPageRespContractTemplate
     */
    total: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageRespContractTemplate
     */
    pages: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageRespContractTemplate
     */
    current: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageRespContractTemplate
     */
    size: number | string

}

/**
*
* @export
* @interface RespContractTemplate
*/
export interface RespContractTemplate {

    /**
     * 模板id
     * @type {number | string}
     * @memberof RespContractTemplate
     */
    id?: number | string

    /**
     * 类型
     * @type {string}
     * @memberof RespContractTemplate
     */
    typeName?: string

    /**
     * 模板编码
     * @type {string}
     * @memberof RespContractTemplate
     */
    templateNo?: string

    /**
     * 模板名称
     * @type {string}
     * @memberof RespContractTemplate
     */
    templateName?: string

    /**
     * 模板描述
     * @type {string}
     * @memberof RespContractTemplate
     */
    describe?: string

    /**
     * 状态：0.禁用 1.启用
     * @type {number | string}
     * @memberof RespContractTemplate
     */
    status?: number | string

    /**
     * 启用或禁用时间
     * @type {string}
     * @memberof RespContractTemplate
     */
    enableTime?: string

    /**
     * 维护时间
     * @type {string}
     * @memberof RespContractTemplate
     */
    updateTime?: string

    /**
     * 维护人
     * @type {string}
     * @memberof RespContractTemplate
     */
    updateBy?: string

    /**
     * 维护人账号
     * @type {string}
     * @memberof RespContractTemplate
     */
    updateAccount?: string

    /**
     * 合同类型权限 1：系统 2：业务
     * @type {number | string}
     * @memberof RespContractTemplate
     */
    typeAuth?: number | string

    /**
     * 签署方式 1：电子签 2：线下签
     * @type {string}
     * @memberof RespContractTemplate
     */
    recommendSigner?: string

    /**
     * 平台签署方来源 1：指定企业 2：合同企业
     * @type {number | string}
     * @memberof RespContractTemplate
     */
    platformSignSource?: number | string

}

/**
*
* @export
* @interface RespContractTemplateList
*/
export interface RespContractTemplateList {

    /**
     * id
     * @type {number | string}
     * @memberof RespContractTemplateList
     */
    id: number | string

    /**
     * 模板名称
     * @type {string}
     * @memberof RespContractTemplateList
     */
    templateName: string

    /**
     * 推荐签署类型：1线上签，2线下签
     * @type {number | string}
     * @memberof RespContractTemplateList
     */
    recommendSigner: number | string

    /**
     * 平台签署方来源 1：指定企业 2：合同企业
     * @type {number | string}
     * @memberof RespContractTemplateList
     */
    platformSignSource: number | string

    /**
     * 指定企业关联企业CA
     * @type {number | string}
     * @memberof RespContractTemplateList
     */
    caOrgId: number | string

    /**
     * 指定企业关联企业CA名称
     * @type {string}
     * @memberof RespContractTemplateList
     */
    caOrgName: string

    /**
     * 合同企业签署方名称
     * @type {string}
     * @memberof RespContractTemplateList
     */
    platformSigner: string

    /**
     * 模板描述
     * @type {string}
     * @memberof RespContractTemplateList
     */
    describe: string

}

/**
* 属性参数（json数组）
* @export
* @interface ContractTemplateTypeParam
*/
export interface ContractTemplateTypeParam {

    /**
     *
     * @type {number | string}
     * @memberof ContractTemplateTypeParam
     */
    id?: number | string

    /**
     *
     * @type {string}
     * @memberof ContractTemplateTypeParam
     */
    paramKey?: string

    /**
     *
     * @type {string}
     * @memberof ContractTemplateTypeParam
     */
    paramValue?: string

    /**
     *
     * @type {string}
     * @memberof ContractTemplateTypeParam
     */
    paramName?: string

    /**
     *
     * @type {number | string}
     * @memberof ContractTemplateTypeParam
     */
    signerType?: number | string

    /**
     *
     * @type {boolean}
     * @memberof ContractTemplateTypeParam
     */
    required?: boolean

    /**
     *
     * @type {boolean}
     * @memberof ContractTemplateTypeParam
     */
    modify?: boolean

    /**
     *
     * @type {boolean}
     * @memberof ContractTemplateTypeParam
     */
    have?: boolean

    /**
     *
     * @type {number | string}
     * @memberof ContractTemplateTypeParam
     */
    dataSources?: number | string

    /**
     *
     * @type {number | string}
     * @memberof ContractTemplateTypeParam
     */
    calculationRules?: number | string

    /**
     *
     * @type {number | string}
     * @memberof ContractTemplateTypeParam
     */
    inputStyle?: number | string

    /**
     *
     * @type {string}
     * @memberof ContractTemplateTypeParam
     */
    unit?: string

    /**
     *
     * @type {number | string}
     * @memberof ContractTemplateTypeParam
     */
    maxLength?: number | string

    /**
     *
     * @type {string}
     * @memberof ContractTemplateTypeParam
     */
    groupName?: string

    /**
     *
     * @type {number | string}
     * @memberof ContractTemplateTypeParam
     */
    groupId?: number | string

    /**
     *
     * @type {string}
     * @memberof ContractTemplateTypeParam
     */
    checkRule?: string

    /**
     *
     * @type {string}
     * @memberof ContractTemplateTypeParam
     */
    checkNote?: string

    /**
     *
     * @type {string}
     * @memberof ContractTemplateTypeParam
     */
    remark?: string

    /**
     *
     * @type {string}
     * @memberof ContractTemplateTypeParam
     */
    describe?: string

    /**
     *
     * @type {number | string}
     * @memberof ContractTemplateTypeParam
     */
    decimal?: number | string

    /**
     *
     * @type {string}
     * @memberof ContractTemplateTypeParam
     */
    createTime?: string

    /**
     *
     * @type {string}
     * @memberof ContractTemplateTypeParam
     */
    createBy?: string

    /**
     *
     * @type {number | string}
     * @memberof ContractTemplateTypeParam
     */
    relationId?: number | string

}

/**
*
* @export
* @interface RespContractTemplateInfo
*/
export interface RespContractTemplateInfo {

    /**
     * 模板id(修改时传)
     * @type {number | string}
     * @memberof RespContractTemplateInfo
     */
    id: number | string

    /**
     * 类型id
     * @type {number | string}
     * @memberof RespContractTemplateInfo
     */
    typeId: number | string

    /**
     * 模板编码
     * @type {string}
     * @memberof RespContractTemplateInfo
     */
    templateNo: string

    /**
     * 模板名称
     * @type {string}
     * @memberof RespContractTemplateInfo
     */
    templateName: string

    /**
     * 状态：0.禁用 1.启用
     * @type {number | string}
     * @memberof RespContractTemplateInfo
     */
    status: number | string

    /**
     * 描述
     * @type {string}
     * @memberof RespContractTemplateInfo
     */
    describe: string

    /**
     * 内容
     * @type {string}
     * @memberof RespContractTemplateInfo
     */
    content: string

    /**
     * 推荐签署类型：1线上签，2线下签
     * @type {number | string}
     * @memberof RespContractTemplateInfo
     */
    recommendSigner: number | string

    /**
     * 属性参数（json数组）
     * @type {Array<ContractTemplateTypeParam>}
     * @memberof RespContractTemplateInfo
     */
    param: Array<ContractTemplateTypeParam>

    /**
     * 签署方设置
     * @type {Array<RespContractTemplateSigner>}
     * @memberof RespContractTemplateInfo
     */
    signerSetting: Array<RespContractTemplateSigner>

}

/**
* 签署方设置
* @export
* @interface RespContractTemplateSigner
*/
export interface RespContractTemplateSigner {

    /**
     * id
     * @type {number | string}
     * @memberof RespContractTemplateSigner
     */
    id?: number | string

    /**
     * 合同模板-版本id
     * @type {number | string}
     * @memberof RespContractTemplateSigner
     */
    templateVersionId?: number | string

    /**
     * 类型：1平台，2签署方
     * @type {number | string}
     * @memberof RespContractTemplateSigner
     */
    type?: number | string

    /**
     * 签署方类型：1企业，2个人
     * @type {number | string}
     * @memberof RespContractTemplateSigner
     */
    signerType?: number | string

    /**
     * 签署方名称
     * @type {string}
     * @memberof RespContractTemplateSigner
     */
    signerName?: string

    /**
     * 参数id
     * @type {number | string}
     * @memberof RespContractTemplateSigner
     */
    paramId?: number | string

    /**
     * 企业caid
     * @type {number | string}
     * @memberof RespContractTemplateSigner
     */
    caId?: number | string

    /**
     * 企业、个人参数分组名称 / 企业名称
     * @type {string}
     * @memberof RespContractTemplateSigner
     */
    paramGroupName?: string

    /**
     * 经办人
     * @type {string}
     * @memberof RespContractTemplateSigner
     */
    agent?: string

    /**
     * 签署要求：1.企业章，2.法定代表人章，3.手绘章，4.模板章
     * @type {string}
     * @memberof RespContractTemplateSigner
     */
    signerDemand?: string

    /**
     * 签署参数
     * @type {Array<string>}
     * @memberof RespContractTemplateSigner
     */
    signatureParam?: Array<string>

    /**
     * 创建时间
     * @type {string}
     * @memberof RespContractTemplateSigner
     */
    createTime?: string

    /**
     * 创建人
     * @type {string}
     * @memberof RespContractTemplateSigner
     */
    createBy?: string

    /**
     * 平台签署方来源 1：指定企业 2：合同企业 注：平台签署方设置
     * @type {number | string}
     * @memberof RespContractTemplateSigner
     */
    platformSignSource?: number | string

    /**
     * 指定企业关联企业CA
     * @type {number | string}
     * @memberof RespContractTemplateSigner
     */
    caOrgId?: number | string

    /**
     * 指定企业关联企业CA名称
     * @type {string}
     * @memberof RespContractTemplateSigner
     */
    caOrgName?: string

    /**
     * 合同企业签署方名称
     * @type {string}
     * @memberof RespContractTemplateSigner
     */
    platformSigner?: string

}

/**
*
* @export
* @interface IPageRespContractTemplateVersion
*/
export interface IPageRespContractTemplateVersion {

    /**
     *
     * @type {Array<RespContractTemplateVersion>}
     * @memberof IPageRespContractTemplateVersion
     */
    records: Array<RespContractTemplateVersion>

    /**
     *
     * @type {number | string}
     * @memberof IPageRespContractTemplateVersion
     */
    total: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageRespContractTemplateVersion
     */
    pages: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageRespContractTemplateVersion
     */
    current: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageRespContractTemplateVersion
     */
    size: number | string

}

/**
*
* @export
* @interface RespContractTemplateVersion
*/
export interface RespContractTemplateVersion {

    /**
     * 版本id
     * @type {number | string}
     * @memberof RespContractTemplateVersion
     */
    id?: number | string

    /**
     * 版本号
     * @type {string}
     * @memberof RespContractTemplateVersion
     */
    versionNo?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof RespContractTemplateVersion
     */
    createTime?: string

    /**
     * 创建人
     * @type {string}
     * @memberof RespContractTemplateVersion
     */
    createBy?: string

    /**
     * 创建人账号
     * @type {string}
     * @memberof RespContractTemplateVersion
     */
    createAccount?: string

}

/**
*
* @export
* @interface RespTemplateVersionParam
*/
export interface RespTemplateVersionParam {

    /**
     * 内容
     * @type {string}
     * @memberof RespTemplateVersionParam
     */
    content: string

    /**
     * 参数
     * @type {Array<ContractTemplateTypeParam>}
     * @memberof RespTemplateVersionParam
     */
    contractTemplateTypeParams: Array<ContractTemplateTypeParam>

}

/**
*
* @export
* @interface RespTemplateStatus
*/
export interface RespTemplateStatus {

    /**
     * 状态0禁用，1启用
     * @type {number | string}
     * @memberof RespTemplateStatus
     */
    status: number | string

    /**
     * 最新版本id
     * @type {number | string}
     * @memberof RespTemplateStatus
     */
    versionId: number | string

}

/**
*
* @export
* @interface RespContractTemplateType
*/
export interface RespContractTemplateType {

    /**
     * 类型id
     * @type {number | string}
     * @memberof RespContractTemplateType
     */
    id: number | string

    /**
     * 类型名称
     * @type {string}
     * @memberof RespContractTemplateType
     */
    name: string

    /**
     * 类型权限
     * @type {number | string}
     * @memberof RespContractTemplateType
     */
    typeAuth: number | string

}

/**
*
* @export
* @interface RespContractTemplateTypeParam
*/
export interface RespContractTemplateTypeParam {

    /**
     * 参数id
     * @type {string}
     * @memberof RespContractTemplateTypeParam
     */
    id: string

    /**
     * 参数key字段
     * @type {string}
     * @memberof RespContractTemplateTypeParam
     */
    paramKey: string

    /**
     * 参数默认值
     * @type {string}
     * @memberof RespContractTemplateTypeParam
     */
    paramValue: string

    /**
     * 参数名称
     * @type {string}
     * @memberof RespContractTemplateTypeParam
     */
    paramName: string

    /**
     * 签署类型 1.企业，2.个人
     * @type {number | string}
     * @memberof RespContractTemplateTypeParam
     */
    signerType: number | string

    /**
     * 是否必选 0否，1是
     * @type {boolean}
     * @memberof RespContractTemplateTypeParam
     */
    select: boolean

    /**
     * 是否必填 0不必填，1必填
     * @type {boolean}
     * @memberof RespContractTemplateTypeParam
     */
    required: boolean

    /**
     * 能否修改 0不可修改，1可修改
     * @type {boolean}
     * @memberof RespContractTemplateTypeParam
     */
    modify: boolean

    /**
     * 数据来源1.企业数据，2个人数据，3项目数据，4计算数据，5默认数据
     * @type {number | string}
     * @memberof RespContractTemplateTypeParam
     */
    dataSources: number | string

    /**
     * 字段数据 - 计算规则参考excel
     * @type {number | string}
     * @memberof RespContractTemplateTypeParam
     */
    calculationRules: number | string

    /**
     * 1.单行输入框,
     2.单选框,
     3.单选选择项(下拉),
     4.多行输入框,
     5.邮箱,
     6.数字选择器,
     7.单选拨轮,
     8.日期选择器,
     9.上传,
     10.年份下拉
     * @type {number | string}
     * @memberof RespContractTemplateTypeParam
     */
    inputStyle: number | string

    /**
     * 单位
     * @type {string}
     * @memberof RespContractTemplateTypeParam
     */
    unit: string

    /**
     * 最大长度限制
     * @type {number | string}
     * @memberof RespContractTemplateTypeParam
     */
    maxLength: number | string

    /**
     * 分组名称
     * @type {string}
     * @memberof RespContractTemplateTypeParam
     */
    groupName: string

    /**
     * 分组id
     * @type {number | string}
     * @memberof RespContractTemplateTypeParam
     */
    groupId: number | string

    /**
     * 校验规则（正则表达式）
     * @type {string}
     * @memberof RespContractTemplateTypeParam
     */
    checkRule: string

    /**
     * 校验注释
     * @type {string}
     * @memberof RespContractTemplateTypeParam
     */
    checkNote: string

    /**
     * 描述
     * @type {string}
     * @memberof RespContractTemplateTypeParam
     */
    describe: string

    /**
     * 小数（小数保留位数）
     * @type {number | string}
     * @memberof RespContractTemplateTypeParam
     */
    decimal: number | string

}

/**
*
* @export
* @interface RespConfirmationSignDetail
*/
export interface RespConfirmationSignDetail {

    /**
     * 签署链接
     * @type {string}
     * @memberof RespConfirmationSignDetail
     */
    signUrl: string

    /**
     * 首付款id
     * @type {number | string}
     * @memberof RespConfirmationSignDetail
     */
    fundId: number | string

    /**
     *
     * @type {boolean}
     * @memberof RespConfirmationSignDetail
     */
    sign: boolean

    /**
     *
     * @type {boolean}
     * @memberof RespConfirmationSignDetail
     */
    confirmation: boolean

}

/**
*
* @export
* @interface ContractSign
*/
export interface ContractSign {

    /**
     * 合同签署id
     * @type {number | string}
     * @memberof ContractSign
     */
    id: number | string

    /**
     * 合同id
     * @type {number | string}
     * @memberof ContractSign
     */
    contractId: number | string

    /**
     * 签署流程id
     * @type {string}
     * @memberof ContractSign
     */
    flowId: string

    /**
     * 签署人名称
     * @type {string}
     * @memberof ContractSign
     */
    signName: string

    /**
     * 签署方key值
     * @type {string}
     * @memberof ContractSign
     */
    signKey: string

    /**
     * 签署人身份证号
     * @type {string}
     * @memberof ContractSign
     */
    signIdNo: string

    /**
     * 签署人手机号
     * @type {string}
     * @memberof ContractSign
     */
    signPhone: string

    /**
     * 经办人类型 1：经办人 2：法人
     * @type {number | string}
     * @memberof ContractSign
     */
    managerType: number | string

    /**
     * 企业名称
     * @type {string}
     * @memberof ContractSign
     */
    companyName: string

    /**
     * 统一社会信用代码证
     * @type {string}
     * @memberof ContractSign
     */
    unifiedSocialCreditCode: string

    /**
     * 法人名称
     * @type {string}
     * @memberof ContractSign
     */
    legalRepName: string

    /**
     * 法人身份证号
     * @type {string}
     * @memberof ContractSign
     */
    legalRepIdNo: string

    /**
     * 签署类型 1：个人 2：签署方企业 3：平台
     * @type {number | string}
     * @memberof ContractSign
     */
    signType: number | string

    /**
     * 签署时间
     * @type {string}
     * @memberof ContractSign
     */
    signTime: string

    /**
     * 签署状态 1：未签署 2：签署中 3：签署完成 4：已拒签 5：签署失败
     * @type {number | string}
     * @memberof ContractSign
     */
    signStatus: number | string

    /**
     * 签署备注
     * @type {string}
     * @memberof ContractSign
     */
    signRemark: string

    /**
     * 签署关键字
     * @type {string}
     * @memberof ContractSign
     */
    signKeyword: string

    /**
     * 签署区id
     * @type {string}
     * @memberof ContractSign
     */
    signFieldId: string

    /**
     * 签署方式 0：手绘 1：模板章 2:手绘+模板章
     * @type {number | string}
     * @memberof ContractSign
     */
    signMethod: number | string

    /**
     * 创建人
     * @type {string}
     * @memberof ContractSign
     */
    createBy: string

    /**
     * 创建人手机号
     * @type {string}
     * @memberof ContractSign
     */
    createPhone: string

    /**
     * 创建时间
     * @type {string}
     * @memberof ContractSign
     */
    createTime: string

    /**
     * 更新人
     * @type {string}
     * @memberof ContractSign
     */
    updateBy: string

    /**
     * 更新时间
     * @type {string}
     * @memberof ContractSign
     */
    updateTime: string

    /**
     * 删除标识
     * @type {boolean}
     * @memberof ContractSign
     */
    deleted: boolean

}

/**
*
* @export
* @interface RespConfirmationContractSign
*/
export interface RespConfirmationContractSign {

    /**
     * 合同id
     * @type {number | string}
     * @memberof RespConfirmationContractSign
     */
    contractId: number | string

    /**
     * 签署方名称
     * @type {string}
     * @memberof RespConfirmationContractSign
     */
    signKey: string

    /**
     * 签署人名称
     * @type {string}
     * @memberof RespConfirmationContractSign
     */
    signName: string

    /**
     * 签署人身份证号
     * @type {string}
     * @memberof RespConfirmationContractSign
     */
    signIdNo: string

    /**
     * 签署人手机号
     * @type {string}
     * @memberof RespConfirmationContractSign
     */
    signPhone: string

    /**
     * 经办人类型 1：经办人 2：法人
     * @type {number | string}
     * @memberof RespConfirmationContractSign
     */
    managerType: number | string

    /**
     * 企业名称
     * @type {string}
     * @memberof RespConfirmationContractSign
     */
    companyName: string

    /**
     * 统一社会信用代码证
     * @type {string}
     * @memberof RespConfirmationContractSign
     */
    unifiedSocialCreditCode: string

    /**
     * 法人名称
     * @type {string}
     * @memberof RespConfirmationContractSign
     */
    legalRepName: string

    /**
     * 法人身份证号
     * @type {string}
     * @memberof RespConfirmationContractSign
     */
    legalRepIdNo: string

    /**
     * 签署类型 1：个人 2：签署方企业 3：平台
     * @type {number | string}
     * @memberof RespConfirmationContractSign
     */
    signType: number | string

    /**
     * 签署关键字
     * @type {string}
     * @memberof RespConfirmationContractSign
     */
    signKeyword: string

    /**
     * 签署方式 0：手绘 1：模板章 2：手绘+模板章
     * @type {number | string}
     * @memberof RespConfirmationContractSign
     */
    signMethod: number | string

}

/**
*
* @export
* @interface ContractPlatformAccountListRequest
*/
export interface ContractPlatformAccountListRequest {

    /**
     * 企业名称
     * @type {string}
     * @memberof ContractPlatformAccountListRequest
     */
    companyName?: string

}

/**
*
* @export
* @interface ContractPlatformAccount
*/
export interface ContractPlatformAccount {

    /**
     * 主键id
     * @type {number | string}
     * @memberof ContractPlatformAccount
     */
    id: number | string

    /**
     * misCode编码
     * @type {string}
     * @memberof ContractPlatformAccount
     */
    misCode: string

    /**
     * 企业名称
     * @type {string}
     * @memberof ContractPlatformAccount
     */
    companyName: string

    /**
     * 收款账户户名
     * @type {string}
     * @memberof ContractPlatformAccount
     */
    accountName: string

    /**
     * 收款账户开户行
     * @type {string}
     * @memberof ContractPlatformAccount
     */
    accountBank: string

    /**
     * 收款账户账号
     * @type {string}
     * @memberof ContractPlatformAccount
     */
    accountNumber: string

    /**
     * 部门编码
     * @type {string}
     * @memberof ContractPlatformAccount
     */
    deptCode: string

    /**
     * 部门名称
     * @type {string}
     * @memberof ContractPlatformAccount
     */
    deptName: string

    /**
     * 创建人
     * @type {string}
     * @memberof ContractPlatformAccount
     */
    createBy: string

    /**
     * 创建时间
     * @type {string}
     * @memberof ContractPlatformAccount
     */
    createTime: string

}

/**
*
* @export
* @interface RespContractCrmSignHistory
*/
export interface RespContractCrmSignHistory {

    /**
     * 操作人员
     * @type {string}
     * @memberof RespContractCrmSignHistory
     */
    operator: string

    /**
     * 操作行为
     * @type {string}
     * @memberof RespContractCrmSignHistory
     */
    operationName: string

    /**
     * 合同名称
     * @type {string}
     * @memberof RespContractCrmSignHistory
     */
    contractName: string

    /**
     * 操作内容
     * @type {string}
     * @memberof RespContractCrmSignHistory
     */
    operationContent: string

    /**
     * 操作url
     * @type {string}
     * @memberof RespContractCrmSignHistory
     */
    operationUrl: string

    /**
     * 签署状态 1：未签署 2：签署中 3：签署完成 4：已拒签 5：签署失败
     * @type {number | string}
     * @memberof RespContractCrmSignHistory
     */
    signStatus: number | string

    /**
     * 操作时间
     * @type {string}
     * @memberof RespContractCrmSignHistory
     */
    operationTime: string

    /**
     * 操作人员手机号
     * @type {string}
     * @memberof RespContractCrmSignHistory
     */
    operatorMobile: string

    /**
     * 签署的企业
     * @type {string}
     * @memberof RespContractCrmSignHistory
     */
    companyName: string

    /**
     * 签署信息id
     * @type {number | string}
     * @memberof RespContractCrmSignHistory
     */
    contractSignId: number | string

    /**
     * 签署类型 1：个人 2：签署方企业 3：平台
     * @type {number | string}
     * @memberof RespContractCrmSignHistory
     */
    signType: number | string

    /**
     * 审核状态 1：待审核 2：审核通过 3：审核不通过
     * @type {number | string}
     * @memberof RespContractCrmSignHistory
     */
    approvalStatus: number | string

    /**
     * 审核角色 1：分财 2：风控 3：法务
     * @type {number | string}
     * @memberof RespContractCrmSignHistory
     */
    approveRole: number | string

    /**
     * 操作类型 1：审核 2：签署 3：用印
     * @type {number | string}
     * @memberof RespContractCrmSignHistory
     */
    operatorType: number | string

    /**
     * 合同编辑记录
     * @type {Array<RespContractSignHistory>}
     * @memberof RespContractCrmSignHistory
     */
    editHistory: Array<RespContractSignHistory>

    /**
     * 审批备注
     * @type {string}
     * @memberof RespContractCrmSignHistory
     */
    approvalRemark: string

    /**
     * 审批合同附件
     * @type {Array<AttachDoc>}
     * @memberof RespContractCrmSignHistory
     */
    attachDocs: Array<AttachDoc>

    /**
     * 钉钉流程id
     * @type {string}
     * @memberof RespContractCrmSignHistory
     */
    processInstanceId: string

    /**
     * 钉钉流程编号
     * @type {string}
     * @memberof RespContractCrmSignHistory
     */
    dingCode: string

}

/**
* 合同编辑记录
* @export
* @interface RespContractSignHistory
*/
export interface RespContractSignHistory {

    /**
     * 操作人员
     * @type {string}
     * @memberof RespContractSignHistory
     */
    operator: string

    /**
     * 操作行为
     * @type {string}
     * @memberof RespContractSignHistory
     */
    operationName: string

    /**
     * 操作内容
     * @type {string}
     * @memberof RespContractSignHistory
     */
    operationContent: string

    /**
     * 操作url
     * @type {string}
     * @memberof RespContractSignHistory
     */
    operationUrl: string

    /**
     * 签署状态 1：未签署 2：签署中 3：签署完成 4：已拒签 5：签署失败
     * @type {number | string}
     * @memberof RespContractSignHistory
     */
    signStatus: number | string

    /**
     * 操作时间
     * @type {string}
     * @memberof RespContractSignHistory
     */
    operationTime: string

    /**
     * 操作人员手机号
     * @type {string}
     * @memberof RespContractSignHistory
     */
    operatorMobile: string

    /**
     * 签署的企业
     * @type {string}
     * @memberof RespContractSignHistory
     */
    companyName: string

    /**
     * 签署信息id
     * @type {number | string}
     * @memberof RespContractSignHistory
     */
    contractSignId: number | string

    /**
     * 签署类型 1：个人 2：签署方企业 3：平台
     * @type {number | string}
     * @memberof RespContractSignHistory
     */
    signType: number | string

    /**
     * 操作类型 1：审核 2：签署 3：用印
     * @type {number | string}
     * @memberof RespContractSignHistory
     */
    operatorType: number | string

    /**
     * 审核备注
     * @type {string}
     * @memberof RespContractSignHistory
     */
    approvalRemark: string

    /**
     * 审核状态: 1-提交；2-审核通过；3-审核拒绝；6-审批中；7-评论；8-其他
     * @type {number | string}
     * @memberof RespContractSignHistory
     */
    approvalStatus: number | string

    /**
     * 审核图片
     * @type {Array<AttachDoc>}
     * @memberof RespContractSignHistory
     */
    attachDocs: Array<AttachDoc>

    /**
     * 钉钉审批id
     * @type {string}
     * @memberof RespContractSignHistory
     */
    processInstanceId: string

    /**
     * 钉钉流程编号
     * @type {string}
     * @memberof RespContractSignHistory
     */
    dingCode: string

}

/**
*
* @export
* @interface ContractSealApprovalNextApproverRequest
*/
export interface ContractSealApprovalNextApproverRequest {

    /**
     * 业务类型id：合同id/采购单id/项目id/支付单id/预付款订单id
     * @type {number | string}
     * @memberof ContractSealApprovalNextApproverRequest
     */
    bizId: number | string

    /**
     * 钉钉审批类型：1：合同审批 2：采购单审批 3：评审决议审批 4：支付单货款支付审批 5：预付款单审批
     * @type {number | string}
     * @memberof ContractSealApprovalNextApproverRequest
     */
    approvalType: number | string

}

/**
*
* @export
* @interface RespCRMContractSignHistory
*/
export interface RespCRMContractSignHistory {

    /**
     * 审核记录
     * @type {Array<RespContractCrmSignHistory>}
     * @memberof RespCRMContractSignHistory
     */
    approveHistory: Array<RespContractCrmSignHistory>

    /**
     * 经销商名称
     * @type {string}
     * @memberof RespCRMContractSignHistory
     */
    dealerCompanyName: string

}

/**
* 合同归档信息列表
* @export
* @interface RespContractArchive
*/
export interface RespContractArchive {

    /**
     * 归档人
     * @type {string}
     * @memberof RespContractArchive
     */
    createBy?: string

    /**
     * 归档时间
     * @type {string}
     * @memberof RespContractArchive
     */
    createTime?: string

    /**
     * 归档文件
     * @type {Array<AttachDoc>}
     * @memberof RespContractArchive
     */
    attachDocList?: Array<AttachDoc>

}

/**
*
* @export
* @interface RespContractRecord
*/
export interface RespContractRecord {

    /**
     * 合同id
     * @type {number | string}
     * @memberof RespContractRecord
     */
    contractId: number | string

    /**
     * 合同内容
     * @type {string}
     * @memberof RespContractRecord
     */
    contractContent: string

    /**
     * 合同内容url
     * @type {string}
     * @memberof RespContractRecord
     */
    contractUrl: string

    /**
     * 合同字段键值对
     * @type {string}
     * @memberof RespContractRecord
     */
    contractFieldsList: string

    /**
     * 合同状态：1：草稿 2：待分财审核 3：分财审核未通过 4：待风控审核/待运营审核 5：风控审核未通过/运营审核未通过 6：待法务审核 7：法务审核未通过 8：待客户签署 9：客户拒签 10：待平台签署 11：平台签署未通过 12：合同已签署 13：异常关闭 14：超时关闭 15：用印发起失败 16：发起线上待客户签署 17：合同废止
     * @type {number | string}
     * @memberof RespContractRecord
     */
    contractStatus: number | string

    /**
     * 附件列表
     * @type {Array<ContractPic>}
     * @memberof RespContractRecord
     */
    attachementList: Array<ContractPic>

    /**
     * 合同签署类型 1：线上 2：线下
     * @type {number | string}
     * @memberof RespContractRecord
     */
    contractSignType: number | string

    /**
     * 合同下载地址
     * @type {string}
     * @memberof RespContractRecord
     */
    downloadUrl: string

    /**
     * 合同类型: 10000：其他合同 10001：担保合同 10002：应收账款质押合同 10003：销售合同 10005：采购合同
     * @type {number | string}
     * @memberof RespContractRecord
     */
    contractTypeId: number | string

    /**
     * 合同归档信息列表
     * @type {Array<RespContractArchive>}
     * @memberof RespContractRecord
     */
    contractArchives: Array<RespContractArchive>

}

/**
*
* @export
* @interface ReqCompareContractRecord
*/
export interface ReqCompareContractRecord {

    /**
     * 最新合同内容记录id
     * @type {number | string}
     * @memberof ReqCompareContractRecord
     */
    currentId?: number | string

    /**
     * 上次合同内容记录id
     * @type {number | string}
     * @memberof ReqCompareContractRecord
     */
    lastId?: number | string

}

/**
*
* @export
* @interface RespCompareContractRecord
*/
export interface RespCompareContractRecord {

    /**
     * 当前合同内容
     * @type {string}
     * @memberof RespCompareContractRecord
     */
    contractContent: string

    /**
     * 上次合同内容
     * @type {string}
     * @memberof RespCompareContractRecord
     */
    lastContractContent: string

}

/**
*
* @export
* @interface RespContractCheckHistoryRecord
*/
export interface RespContractCheckHistoryRecord {

    /**
     * 合同id
     * @type {number | string}
     * @memberof RespContractCheckHistoryRecord
     */
    contractId: number | string

    /**
     *
     * @type {Array<RespContractSignHistory>}
     * @memberof RespContractCheckHistoryRecord
     */
    signHistory: Array<RespContractSignHistory>

}

/**
*
* @export
* @interface ReqCaSealUrl
*/
export interface ReqCaSealUrl {

    /**
     * 账号Id
     * @type {string}
     * @memberof ReqCaSealUrl
     */
    caId: string

    /**
     * 印章Id
     * @type {string}
     * @memberof ReqCaSealUrl
     */
    sealId?: string

    /**
     * 类型：1-个人，2-企业
     * @type {number | string}
     * @memberof ReqCaSealUrl
     */
    caType?: number | string

}

/**
*
* @export
* @interface ReqCaQuery
*/
export interface ReqCaQuery {

    /**
     * 页码
     * @type {number | string}
     * @memberof ReqCaQuery
     */
    pageNumber?: number | string

    /**
     * 每页大小
     * @type {number | string}
     * @memberof ReqCaQuery
     */
    pageSize?: number | string

    /**
     *
     * @type {Sort}
     * @memberof ReqCaQuery
     */
    sort?: Sort

    /**
     * 个人姓名/企业名称
     * @type {string}
     * @memberof ReqCaQuery
     */
    name?: string

    /**
     * 是否实名：0-未实名，1-已实名
     * @type {number | string}
     * @memberof ReqCaQuery
     */
    isReal?: number | string

    /**
     * 验证方式：1：人脸识别 2-对公打款 3-企业支付宝
     * @type {number | string}
     * @memberof ReqCaQuery
     */
    realType?: number | string

    /**
     * CA企业-机构类型 1：平台方 2：经销商 3：供应商
     * @type {number | string}
     * @memberof ReqCaQuery
     */
    orgType?: number | string

    /**
     * 创建人
     * @type {string}
     * @memberof ReqCaQuery
     */
    createBy?: string

    /**
     * 实名查询开始时间
     * @type {string}
     * @memberof ReqCaQuery
     */
    realStartTime?: string

    /**
     * 实名查询结束时间
     * @type {string}
     * @memberof ReqCaQuery
     */
    realEndTime?: string

    /**
     * 创建开始时间
     * @type {string}
     * @memberof ReqCaQuery
     */
    createStartTime?: string

    /**
     * 创建结束时间
     * @type {string}
     * @memberof ReqCaQuery
     */
    createEndTime?: string

    /**
     * 创建时间排序方式asc/desc
     * @type {string}
     * @memberof ReqCaQuery
     */
    createTimeOrder?: string

    /**
     * 实名时间排序方式asc/desc
     * @type {string}
     * @memberof ReqCaQuery
     */
    realTimeOrder?: string

}

/**
*
* @export
* @interface IPageRespCAOrg
*/
export interface IPageRespCAOrg {

    /**
     *
     * @type {Array<RespCAOrg>}
     * @memberof IPageRespCAOrg
     */
    records: Array<RespCAOrg>

    /**
     *
     * @type {number | string}
     * @memberof IPageRespCAOrg
     */
    total: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageRespCAOrg
     */
    pages: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageRespCAOrg
     */
    current: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageRespCAOrg
     */
    size: number | string

}

/**
*
* @export
* @interface RespCAOrg
*/
export interface RespCAOrg {

    /**
     * 企业CA认证id
     * @type {number | string}
     * @memberof RespCAOrg
     */
    id: number | string

    /**
     * 企业名称
     * @type {string}
     * @memberof RespCAOrg
     */
    companyName: string

    /**
     * 统一社会信用代码证
     * @type {string}
     * @memberof RespCAOrg
     */
    unifiedSocialCreditCode: string

    /**
     * 企业账户id
     * @type {string}
     * @memberof RespCAOrg
     */
    orgId: string

    /**
     * 法人名称
     * @type {string}
     * @memberof RespCAOrg
     */
    legalRepName: string

    /**
     * 法人身份证号
     * @type {string}
     * @memberof RespCAOrg
     */
    legalRepIdNo: string

    /**
     * 个人账户id【e签宝创建机构账号时传的个人账号】
     * @type {string}
     * @memberof RespCAOrg
     */
    accountId: string

    /**
     * 经办人【个人CA认证id】
     * @type {number | string}
     * @memberof RespCAOrg
     */
    accountCaId: number | string

    /**
     * 经办人类型 1-经办人 2-法人
     * @type {number | string}
     * @memberof RespCAOrg
     */
    managerType: number | string

    /**
     * 机构类型 1：平台方 2：经销商 3：供应商
     * @type {number | string}
     * @memberof RespCAOrg
     */
    orgType: number | string

    /**
     * CA状态 1：未认证 2：未实名 3：已实名
     * @type {number | string}
     * @memberof RespCAOrg
     */
    status: number | string

    /**
     * 实名方式
     * @type {number | string}
     * @memberof RespCAOrg
     */
    realType: number | string

    /**
     * 印章id
     * @type {string}
     * @memberof RespCAOrg
     */
    sealId: string

    /**
     * 创建人
     * @type {string}
     * @memberof RespCAOrg
     */
    createBy: string

    /**
     * 创建时间
     * @type {string}
     * @memberof RespCAOrg
     */
    createTime: string

    /**
     * 企业账号创建时间
     * @type {string}
     * @memberof RespCAOrg
     */
    orgCreateTime: string

    /**
     * 更新人
     * @type {string}
     * @memberof RespCAOrg
     */
    updateBy: string

    /**
     * 更新时间
     * @type {string}
     * @memberof RespCAOrg
     */
    updateTime: string

    /**
     * 实名认证时间
     * @type {string}
     * @memberof RespCAOrg
     */
    realNameTime: string

    /**
     * 删除标识
     * @type {boolean}
     * @memberof RespCAOrg
     */
    deleted: boolean

    /**
     * 平台方签署区设置 1：作为签署方参与签署 【注：为空默认作为平台方参与签署，只限于机构类型为平台方】
     * @type {number | string}
     * @memberof RespCAOrg
     */
    platformSignArea: number | string

}

/**
*
* @export
* @interface CaOrgQueryRequest
*/
export interface CaOrgQueryRequest {

    /**
     * 机构类型 1：平台方 2：签署方
     * @type {number | string}
     * @memberof CaOrgQueryRequest
     */
    orgType: number | string

}

/**
*
* @export
* @interface IPageRespCAAccount
*/
export interface IPageRespCAAccount {

    /**
     *
     * @type {Array<RespCAAccount>}
     * @memberof IPageRespCAAccount
     */
    records: Array<RespCAAccount>

    /**
     *
     * @type {number | string}
     * @memberof IPageRespCAAccount
     */
    total: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageRespCAAccount
     */
    pages: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageRespCAAccount
     */
    current: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageRespCAAccount
     */
    size: number | string

}

/**
*
* @export
* @interface RespCAAccount
*/
export interface RespCAAccount {

    /**
     * CA认证id
     * @type {number | string}
     * @memberof RespCAAccount
     */
    id?: number | string

    /**
     * 姓名
     * @type {string}
     * @memberof RespCAAccount
     */
    name?: string

    /**
     * 手机号
     * @type {string}
     * @memberof RespCAAccount
     */
    phone?: string

    /**
     * 身份证号
     * @type {string}
     * @memberof RespCAAccount
     */
    idNo?: string

    /**
     * 个人账户ID
     * @type {string}
     * @memberof RespCAAccount
     */
    accountId?: string

    /**
     * 状态 1：未认证 2：已认证【未实名】 3：已实名
     * @type {number | string}
     * @memberof RespCAAccount
     */
    status?: number | string

    /**
     * 实名方式 1：人脸识别
     * @type {number | string}
     * @memberof RespCAAccount
     */
    realType?: number | string

    /**
     * 印章id
     * @type {string}
     * @memberof RespCAAccount
     */
    sealId?: string

    /**
     * 创建人
     * @type {string}
     * @memberof RespCAAccount
     */
    createBy?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof RespCAAccount
     */
    createTime?: string

    /**
     * 个人账号创建时间
     * @type {string}
     * @memberof RespCAAccount
     */
    accountCreateTime?: string

    /**
     * 更新人
     * @type {string}
     * @memberof RespCAAccount
     */
    updateBy?: string

    /**
     * 更新时间
     * @type {string}
     * @memberof RespCAAccount
     */
    updateTime?: string

    /**
     * 实名认证时间
     * @type {string}
     * @memberof RespCAAccount
     */
    realNameTime?: string

    /**
     * 删除标识
     * @type {boolean}
     * @memberof RespCAAccount
     */
    deleted?: boolean

}

/**
* 账单批量操作列表
* @export
* @interface BatchFundResponse
*/
export interface BatchFundResponse {

    /**
     * 账单Id
     * @type {number | string}
     * @memberof BatchFundResponse
     */
    id?: number | string

    /**
     * 支付单Id
     * @type {number | string}
     * @memberof BatchFundResponse
     */
    orderId?: number | string

    /**
     * 支付状态：0-待支付；1-支付待确认；2-已支付；3-支付失败；4-已取消
     * @type {number | string}
     * @memberof BatchFundResponse
     */
    paymentFlag?: number | string

    /**
     * 还款类型：1-首付款；2-剩余货款；3-服务费；
     * @type {number | string}
     * @memberof BatchFundResponse
     */
    repaymentType?: number | string

    /**
     * 应支付金额
     * @type {number | string}
     * @memberof BatchFundResponse
     */
    paymentAmount?: number | string

    /**
     * 应支付日期
     * @type {string}
     * @memberof BatchFundResponse
     */
    schedulePaymentDate?: string

    /**
     * 项目id
     * @type {string}
     * @memberof BatchFundResponse
     */
    projectId?: string

    /**
     * 项目名称
     * @type {string}
     * @memberof BatchFundResponse
     */
    projectName?: string

    /**
     * 经销商名称
     * @type {string}
     * @memberof BatchFundResponse
     */
    companyName?: string

    /**
     * 经销商id
     * @type {number | string}
     * @memberof BatchFundResponse
     */
    companyId?: number | string

    /**
     * 支付时间
     * @type {string}
     * @memberof BatchFundResponse
     */
    paidTime?: string

}

/**
*
* @export
* @interface FundPayBatchResponse
*/
export interface FundPayBatchResponse {

    /**
     * 账单批量操作列表
     * @type {Array<BatchFundResponse>}
     * @memberof FundPayBatchResponse
     */
    batchFunds: Array<BatchFundResponse>

    /**
     * 进销商企业名称
     * @type {string}
     * @memberof FundPayBatchResponse
     */
    companyName: string

    /**
     * 进销商企业id
     * @type {number | string}
     * @memberof FundPayBatchResponse
     */
    companyId: number | string

    /**
     * 总金额
     * @type {number | string}
     * @memberof FundPayBatchResponse
     */
    totalAmount: number | string

    /**
     * 支付凭证文件
     * @type {Array<AttachDocResponse>}
     * @memberof FundPayBatchResponse
     */
    attachDocs: Array<AttachDocResponse>

    /**
     * 付款主体
     * @type {string}
     * @memberof FundPayBatchResponse
     */
    paymentMain: string

    /**
     * 付款主体银行账号
     * @type {string}
     * @memberof FundPayBatchResponse
     */
    payeeBankAccount: string

}

/**
* 收款方账号列表
* @export
* @interface PayeeAccount
*/
export interface PayeeAccount {

    /**
     * 主键id
     * @type {number | string}
     * @memberof PayeeAccount
     */
    id?: number | string

    /**
     * 收款方misCode
     * @type {string}
     * @memberof PayeeAccount
     */
    misCode?: string

    /**
     * 收款方名称
     * @type {string}
     * @memberof PayeeAccount
     */
    payeeName?: string

    /**
     * 收款银行名称
     * @type {string}
     * @memberof PayeeAccount
     */
    payeeBankName?: string

    /**
     * 收款方银行账号
     * @type {string}
     * @memberof PayeeAccount
     */
    payeeBankAccount?: string

    /**
     * 是否默认账号
     * @type {boolean}
     * @memberof PayeeAccount
     */
    defaultAccount?: boolean

    /**
     * 是否删除
     * @type {boolean}
     * @memberof PayeeAccount
     */
    deleted?: boolean

}

/**
*
* @export
* @interface PayeeAccountResponse
*/
export interface PayeeAccountResponse {

    /**
     * 收款方名称
     * @type {string}
     * @memberof PayeeAccountResponse
     */
    payeeName: string

    /**
     * 收款方账号列表
     * @type {Array<PayeeAccount>}
     * @memberof PayeeAccountResponse
     */
    payeeAccountList: Array<PayeeAccount>

}

/**
* 认领明细
* @export
* @interface BankBillFundReceiptResponse
*/
export interface BankBillFundReceiptResponse {

    /**
     * 主键id
     * @type {number | string}
     * @memberof BankBillFundReceiptResponse
     */
    id?: number | string

    /**
     * 账单明细id
     * @type {number | string}
     * @memberof BankBillFundReceiptResponse
     */
    fundDetailId?: number | string

    /**
     * 银行收款清单id
     * @type {number | string}
     * @memberof BankBillFundReceiptResponse
     */
    receiptId?: number | string

    /**
     * 认领金额
     * @type {number | string}
     * @memberof BankBillFundReceiptResponse
     */
    claimAmount?: number | string

    /**
     * 项目id
     * @type {number | string}
     * @memberof BankBillFundReceiptResponse
     */
    projectId?: number | string

    /**
     * 项目名称
     * @type {string}
     * @memberof BankBillFundReceiptResponse
     */
    projectName?: string

    /**
     * 账单id
     * @type {number | string}
     * @memberof BankBillFundReceiptResponse
     */
    fundId?: number | string

    /**
     * 账单类型 还款类型：1-首付款；2-尾款；3-服务费；4-预付款
     * @type {number | string}
     * @memberof BankBillFundReceiptResponse
     */
    fundType?: number | string

    /**
     * 支付单id/预付款单id
     * @type {number | string}
     * @memberof BankBillFundReceiptResponse
     */
    orderId?: number | string

    /**
     * 支付单编号/预付款单编号
     * @type {string}
     * @memberof BankBillFundReceiptResponse
     */
    orderNo?: string

    /**
     * 应支付日期
     * @type {string}
     * @memberof BankBillFundReceiptResponse
     */
    schedulePaymentDate?: string

    /**
     * 认领时间
     * @type {string}
     * @memberof BankBillFundReceiptResponse
     */
    createTime?: string

}

/**
*
* @export
* @interface BankBillFundResponse
*/
export interface BankBillFundResponse {

    /**
     * 主键id
     * @type {number | string}
     * @memberof BankBillFundResponse
     */
    id: number | string

    /**
     * 认领状态 0 未认领 1：部分认领 2：全部认领
     * @type {number | string}
     * @memberof BankBillFundResponse
     */
    receiptStatus: number | string

    /**
     * 入账金额
     * @type {number | string}
     * @memberof BankBillFundResponse
     */
    totalAmount: number | string

    /**
     * 认领金额
     * @type {number | string}
     * @memberof BankBillFundResponse
     */
    receiptAmount: number | string

    /**
     * 认领明细
     * @type {Array<BankBillFundReceiptResponse>}
     * @memberof BankBillFundResponse
     */
    receiptResponseList: Array<BankBillFundReceiptResponse>

}

/**
*
* @export
* @interface BankBillFundDetailResponse
*/
export interface BankBillFundDetailResponse {

    /**
     * 主键id
     * @type {number | string}
     * @memberof BankBillFundDetailResponse
     */
    id: number | string

    /**
     * 入账流水号
     * @type {string}
     * @memberof BankBillFundDetailResponse
     */
    billNo: string

    /**
     * 入账金额
     * @type {number | string}
     * @memberof BankBillFundDetailResponse
     */
    totalAmount: number | string

    /**
     * 认领金额
     * @type {number | string}
     * @memberof BankBillFundDetailResponse
     */
    receiptAmount: number | string

    /**
     * 未认领金额
     * @type {number | string}
     * @memberof BankBillFundDetailResponse
     */
    unReceiptAmount: number | string

    /**
     * 收款方
     * @type {string}
     * @memberof BankBillFundDetailResponse
     */
    receiptName: string

    /**
     * 银企直连银行
     * @type {string}
     * @memberof BankBillFundDetailResponse
     */
    receiptBankName: string

    /**
     * 银企直连账户
     * @type {string}
     * @memberof BankBillFundDetailResponse
     */
    receiptBankAccount: string

    /**
     * 付款方
     * @type {string}
     * @memberof BankBillFundDetailResponse
     */
    payeeName: string

    /**
     * 付款银行
     * @type {string}
     * @memberof BankBillFundDetailResponse
     */
    payeeBankName: string

    /**
     * 付款方银行账号
     * @type {string}
     * @memberof BankBillFundDetailResponse
     */
    payeeBankAccount: string

    /**
     * 收款日期/入账时间
     * @type {string}
     * @memberof BankBillFundDetailResponse
     */
    receiptTime: string

    /**
     * 待支付账单集合
     * @type {Array<ClaimFundResponse>}
     * @memberof BankBillFundDetailResponse
     */
    claimFundResponseList: Array<ClaimFundResponse>

}

/**
* 待支付账单集合
* @export
* @interface ClaimFundResponse
*/
export interface ClaimFundResponse {

    /**
     * 账单id
     * @type {number | string}
     * @memberof ClaimFundResponse
     */
    fundId?: number | string

    /**
     * 支付单id/预付款id
     * @type {number | string}
     * @memberof ClaimFundResponse
     */
    orderId?: number | string

    /**
     * 支付单编号/预付款编号
     * @type {string}
     * @memberof ClaimFundResponse
     */
    orderNo?: string

    /**
     * 项目id
     * @type {number | string}
     * @memberof ClaimFundResponse
     */
    projectId?: number | string

    /**
     * 还款类型：1-首付款；2-尾款；3-服务费；4-预付款
     * @type {number | string}
     * @memberof ClaimFundResponse
     */
    fundType?: number | string

    /**
     * 支付金额
     * @type {number | string}
     * @memberof ClaimFundResponse
     */
    paymentAmount?: number | string

    /**
     * 应支付日期
     * @type {string}
     * @memberof ClaimFundResponse
     */
    schedulePaymentDate?: string

    /**
     * 已支付金额
     * @type {number | string}
     * @memberof ClaimFundResponse
     */
    paidAmount?: number | string

    /**
     * 待支付金额
     * @type {number | string}
     * @memberof ClaimFundResponse
     */
    unPaidAmount?: number | string

    /**
     * 支付待确认金额
     * @type {number | string}
     * @memberof ClaimFundResponse
     */
    unConfirmedAmount?: number | string

    /**
     * 支付状态：1-待支付 2-部分支付
     * @type {number | string}
     * @memberof ClaimFundResponse
     */
    paymentStatus?: number | string

}

/**
*
* @export
* @interface ClaimFundQueryRequest
*/
export interface ClaimFundQueryRequest {

    /**
     * 公司id
     * @type {number | string}
     * @memberof ClaimFundQueryRequest
     */
    companyId?: number | string

}

/**
*
* @export
* @interface IPageClaimFundResponse
*/
export interface IPageClaimFundResponse {

    /**
     *
     * @type {Array<ClaimFundResponse>}
     * @memberof IPageClaimFundResponse
     */
    records: Array<ClaimFundResponse>

    /**
     *
     * @type {number | string}
     * @memberof IPageClaimFundResponse
     */
    total: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageClaimFundResponse
     */
    pages: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageClaimFundResponse
     */
    current: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageClaimFundResponse
     */
    size: number | string

}

/**
*
* @export
* @interface BankBillPageRequest
*/
export interface BankBillPageRequest {

    /**
     * 入账流水号
     * @type {string}
     * @memberof BankBillPageRequest
     */
    billNo?: string

    /**
     * 收款方
     * @type {string}
     * @memberof BankBillPageRequest
     */
    receiptName?: string

    /**
     * 最小入账日期
     * @type {string}
     * @memberof BankBillPageRequest
     */
    minReceiptTime?: string

    /**
     * 最大入账日期
     * @type {string}
     * @memberof BankBillPageRequest
     */
    maxReceiptTime?: string

    /**
     * 银企直连银行
     * @type {string}
     * @memberof BankBillPageRequest
     */
    receiptBankName?: string

    /**
     * 付款方
     * @type {string}
     * @memberof BankBillPageRequest
     */
    payeeName?: string

    /**
     * 最小入账金额
     * @type {number | string}
     * @memberof BankBillPageRequest
     */
    minTotalAmount?: number | string

    /**
     * 最大入账金额
     * @type {number | string}
     * @memberof BankBillPageRequest
     */
    maxTotalAmount?: number | string

    /**
     * 认领状态 0 未认领 1：部分认领 2：全部认领
     * @type {number | string}
     * @memberof BankBillPageRequest
     */
    receiptStatus?: number | string

    /**
     * 最小可认领金额
     * @type {number | string}
     * @memberof BankBillPageRequest
     */
    minNoReceiptAmount?: number | string

    /**
     * 最大可认领金额
     * @type {number | string}
     * @memberof BankBillPageRequest
     */
    maxNoReceiptAmount?: number | string

    /**
     * 工号
     * @type {string}
     * @memberof BankBillPageRequest
     */
    jobNumber?: string

    /**
     * 菜单code
     * @type {string}
     * @memberof BankBillPageRequest
     */
    authCode?: string

}

/**
*
* @export
* @interface BankBillPageResponse
*/
export interface BankBillPageResponse {

    /**
     * 主键id
     * @type {number | string}
     * @memberof BankBillPageResponse
     */
    id: number | string

    /**
     * 入账流水号
     * @type {string}
     * @memberof BankBillPageResponse
     */
    billNo: string

    /**
     * 收款方
     * @type {string}
     * @memberof BankBillPageResponse
     */
    receiptName: string

    /**
     * 收款日期
     * @type {string}
     * @memberof BankBillPageResponse
     */
    receiptTime: string

    /**
     * 银企直连银行
     * @type {string}
     * @memberof BankBillPageResponse
     */
    receiptBankName: string

    /**
     * 银企直连账户
     * @type {string}
     * @memberof BankBillPageResponse
     */
    receiptBankAccount: string

    /**
     * 付款方
     * @type {string}
     * @memberof BankBillPageResponse
     */
    payeeName: string

    /**
     * 付款银行
     * @type {string}
     * @memberof BankBillPageResponse
     */
    payeeBankName: string

    /**
     * 付款方银行账号
     * @type {string}
     * @memberof BankBillPageResponse
     */
    payeeBankAccount: string

    /**
     * 入账金额
     * @type {number | string}
     * @memberof BankBillPageResponse
     */
    totalAmount: number | string

    /**
     * 认领状态 0 未认领 1：部分认领 2：全部认领
     * @type {number | string}
     * @memberof BankBillPageResponse
     */
    receiptStatus: number | string

    /**
     * 已认领金额
     * @type {number | string}
     * @memberof BankBillPageResponse
     */
    receiptAmount: number | string

    /**
     * 可认领金额
     * @type {number | string}
     * @memberof BankBillPageResponse
     */
    noReceiptAmount: number | string

}

/**
*
* @export
* @interface IPageBankBillPageResponse
*/
export interface IPageBankBillPageResponse {

    /**
     *
     * @type {Array<BankBillPageResponse>}
     * @memberof IPageBankBillPageResponse
     */
    records: Array<BankBillPageResponse>

    /**
     *
     * @type {number | string}
     * @memberof IPageBankBillPageResponse
     */
    total: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageBankBillPageResponse
     */
    pages: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageBankBillPageResponse
     */
    current: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageBankBillPageResponse
     */
    size: number | string

}

/**
*
* @export
* @interface BankBillRequest
*/
export interface BankBillRequest {

    /**
     * 入账流水号
     * @type {string}
     * @memberof BankBillRequest
     */
    billNo?: string

    /**
     * 收款方
     * @type {string}
     * @memberof BankBillRequest
     */
    receiptName?: string

    /**
     * 最小入账日期
     * @type {string}
     * @memberof BankBillRequest
     */
    minReceiptTime?: string

    /**
     * 最大入账日期
     * @type {string}
     * @memberof BankBillRequest
     */
    maxReceiptTime?: string

    /**
     * 银企直连银行
     * @type {string}
     * @memberof BankBillRequest
     */
    receiptBankName?: string

    /**
     * 付款方
     * @type {string}
     * @memberof BankBillRequest
     */
    payeeName?: string

    /**
     * 付款方公司id
     * @type {number | string}
     * @memberof BankBillRequest
     */
    payeeCompanyId?: number | string

    /**
     * 最小入账金额
     * @type {number | string}
     * @memberof BankBillRequest
     */
    minTotalAmount?: number | string

    /**
     * 最大入账金额
     * @type {number | string}
     * @memberof BankBillRequest
     */
    maxTotalAmount?: number | string

    /**
     * 认领状态 0 未认领 1：部分认领 2：全部认领
     * @type {number | string}
     * @memberof BankBillRequest
     */
    receiptStatus?: number | string

    /**
     * 认领状态 0 未认领 1：部分认领 2：全部认领
     * @type {string}
     * @memberof BankBillRequest
     */
    receiptStatusArray?: string

    /**
     * 最小可认领金额
     * @type {number | string}
     * @memberof BankBillRequest
     */
    minNoReceiptAmount?: number | string

    /**
     * 最大可认领金额
     * @type {number | string}
     * @memberof BankBillRequest
     */
    maxNoReceiptAmount?: number | string

    /**
     * 工号
     * @type {string}
     * @memberof BankBillRequest
     */
    jobNumber?: string

    /**
     * 菜单code
     * @type {string}
     * @memberof BankBillRequest
     */
    authCode?: string

}

/**
*
* @export
* @interface BankReceiptAmountStaticResponse
*/
export interface BankReceiptAmountStaticResponse {

    /**
     * 已认领金额
     * @type {number | string}
     * @memberof BankReceiptAmountStaticResponse
     */
    receiptAmount: number | string

    /**
     * 可认领金额
     * @type {number | string}
     * @memberof BankReceiptAmountStaticResponse
     */
    noReceiptAmount: number | string

}
