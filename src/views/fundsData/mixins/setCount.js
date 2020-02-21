import { setCount } from '../api'
export const setCountMixin = {
    data () {
        return {
            setCountParams: {
                'accountId': '', // 台账id，基础信息的id
                'capitalAmount': '', // 本金总额
                'capitalPaid': '', // 本次本金归还金额
                'capitalTime': '', // 本金归还时间
                'graceDay': '', // 宽限期时间
                'graceInterest': '', // 宽限期利率
                'interest': '', // 利率
                'interestTime': '', // 利息归还时间
                // 逾期利率计算集合
                'overDueInterestCountList': [
                    {
                        'overDueInterest': '', // 逾期利率
                        'overDueInterestTime': '' // 逾期时间
                    }
                ],
                'planId': '' // 还款计划id，就是还款列表planList里面的id
            }
        }
    },
    methods: {
        async onCount (row) {
            this.setCountParams = {
                'accountId': this.detailData[0].account_id, // 台账id，基础信息的id
                'capitalAmount': row.capitalAmount, // 本金总额
                'capitalPaid': row.capitalPaid, // 本次本金归还金额
                'capitalTime': row.capitalTime, // 本金归还时间
                'graceDay': row.graceDay, // 宽限期时间
                'graceInterest': row.graceInterest, // 宽限期利率
                'interest': row.graceInterest, // 利率
                'interestTime': row.thisPaidGraceInterestTime, // 利息归还时间
                // 逾期利率计算集合
                'overDueInterestCountList': [
                    {
                        'overDueInterest': '', // 逾期利率
                        'overDueInterestTime': '' // 逾期时间
                    }
                ],
                'planId': row.id // 还款计划id，就是还款列表planList里面的id
            }

            console.log('this.setCountParams: ', this.setCountParams)
            const { data } = await setCount(this.setCountParams)
            /* data格式: {
                "graceInterestAmount": '', // 宽限期利息
                "interestAmount": '', // 利息
                "overDueInterestList": [] // 逾期利息集合
            } */
            return data
        }
    }
}