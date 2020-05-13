import { mapState, createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('fundsData')
export const departmentAuth = {
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    data () {
        return {
            platForm: true,
            branch: true
        }
    },
    methods: {
        ...mapActions([
            'findPlatformslist', // 平台公司
            'findBranchList' // 分部
        ]),
        async oldBossAuth () {
            const data = await this.findBranchList({
                deptType: 'F',
                pkDeptDoc: this.userInfo.pkDeptDoc
            })
            // 0总部 1大区 2分部
            switch (this.userInfo.deptType) {
                case 0:
                    this.findPlatformslist()
                    break
                case 2:
                    this.branch = false
                    data[0] && this.findPlatformslist({ subsectionCode: data[0].crmDeptCode })
                    break
                default:
            }
        }
    }
}