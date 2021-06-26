<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="balance-cont-row">
                <div class="balance-cont-col">
                    <div class="balance-col-icon">
                        <i class="icon iconfont hosjoy_money"></i>
                    </div>
                    <div class="balance-col-money">
                        <p>总回款<span>（元）</span></p>
                        <p>{{info.totalBalance}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'behalfManage',
    data () {
        return {
            info: {}
        }
    },
    computed: {
        ...mapGetters('finance', {
            bankInfo: 'bankInfo'
        })
    },
    mounted () {
        this.init()
    },
    methods: {
        ...mapActions('finance', {
            findBankInfo: 'findBankInfo'
        }),
        async init () {
            this.getBankInfo()
        },
        async getBankInfo () {
            await this.findBankInfo()
            this.info = { ...this.bankInfo }
        }
    }
}
</script>

<style lang="scss" scoped>
.balance-cont-row {
    display: flex;
    padding: 10px 10px 40px 10px;
}
.balance-cont-col {
    display: inline-flex;
    flex: 1;
    align-items: center;

    .balance-col-icon {
        display: inline-block;
        width: 64px;
        height: 64px;
        line-height: 64px;
        text-align: center;
        border-radius: 50%;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.08);

        i {
            font-size: 30px;
            color: $whiteColor;
        }
    }

    &:nth-child(1) {
        .balance-col-icon {
            background: linear-gradient(
                135deg,
                rgba(255, 120, 117, 1) 0%,
                rgba(255, 77, 79, 1) 100%
            );
        }
    }
    &:nth-child(2) {
        .balance-col-icon {
            background: linear-gradient(
                135deg,
                rgba(255, 120, 117, 1) 0%,
                rgba(255, 77, 79, 1) 100%
            );
        }
    }
    &:nth-child(3) {
        .balance-col-icon {
            background: linear-gradient(
                135deg,
                rgba(153, 153, 153, 1) 0%,
                rgba(102, 102, 102, 1) 100%
            );
        }
    }
    &:nth-child(4) {
        .balance-col-icon {
            background: linear-gradient(
                135deg,
                rgba(105, 192, 255, 1) 0%,
                rgba(24, 144, 255, 1) 100%
            );
        }
    }

    .balance-col-money {
        margin-left: 16px;
        display: inline-block;

        p:last-child {
            line-height: 45px;
            font-size: 32px;
        }
        p:first-child {
            line-height: 20px;
            span {
                color: #666;
            }
        }
    }
}
</style>
