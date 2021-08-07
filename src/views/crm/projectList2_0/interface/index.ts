export interface ReqBossProjectRefund {
    /** 合同附件 */
    contractAttachments?: any[];
    /** 合同号 */
    contractNo?: string;
    /** 是否已回款,1=已回款 0=未回款 */
    hasRefunded?: number | string;
    /** 操作人名称 */
    operatorName?: string;
    /** 操作人手机号 */
    operatorPhone?: string;
    /** 项目id */
    projectId?: number | string;
    /** 回款金额 */
    refundAmount?: number | string;
    /** 回款支付方式 */
    refundPayType?: number | string;
    /** 支付凭证 */
    refundPics?: any[];
}