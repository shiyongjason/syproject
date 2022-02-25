import { setCount } from '../api'
import { mapState } from 'vuex'
export const setCountMixin = {
    computed: {
        ...mapState({
            overdueList: state => state.fundsData.overdueList
        })
    },
    data () {
        return {
            setCountParams: {
                'accountId': '', // 台账id，基础信息的id
                'capitalPaid': '', // 本次本金归还金额
                'capitalTime': '', // 本金归还时间
                'graceDay': '', // 宽限期时间
                'graceInterest': '', // 宽限期利率
                // 逾期利率计算集合
                'overDueInterestCountList': [
                    {
                        'overDueInterest': '', // 逾期利率
                        'dateNum': '' // 逾期日期（月份）
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
                'capitalPaid': +row.thisPaidCapital || 0, // 本次本金归还金额
                'capitalTime': row.thisPaidCapitalTime || null, // 本金归还时间
                'graceDay': row.graceDay || 0, // 宽限期时间
                'graceInterest': row.graceInterest, // 宽限期利率
                // 逾期利率计算集合
                'overDueInterestCountList': [],
                'plan': row // 还款计划id，就是还款列表planList里面的id
            }
            if (row.isStepOverInterest == 0) {
                this.setCountParams.overDueInterestCountList.push({
                    overDueInterest: row.overDueInterest,
                    dateNum: 9999
                })
            } else if (row.overdueList.length > 0 && row.isStepOverInterest == 1) {
                row.overdueList.forEach((item) => {
                    let obj = {
                        overDueInterest: +item.overDueInterest,
                        dateNum: +item.dateNum
                    }
                    this.setCountParams.overDueInterestCountList.push(obj)
                })
            } else {
                this.setCountParams.overDueInterestCountList = this.overdueList
            }
            if (!row.exsitGrace) {
                this.setCountParams.graceDay = 0
                this.setCountParams.graceInterest = 0
            }
            const { data } = await setCount(this.setCountParams)
            /* data格式: {
                "graceInterestAmount": '', // 宽限期利息
                "interestAmount": '', // 利息
                "overDueInterestAmount": '' // 逾期利息
            } */
            return data
        }
    }
}