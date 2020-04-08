import { mapState, createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('fundsData')
export const shy = {
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
        async abc (params) {
            console.log(params)
        },
        async oldAuth () {
            console.log(this.userInfo)
            // 0总部 1大区 2分部
            switch (this.userInfo.deptType) {
                case 0:
                    this.findPlatformslist()
                    this.findBranchList()
                    break
                case 1:
                    this.findBranchList({ crmDeptCode: this.userInfo.oldDeptCode })
                    break
                case 2:
                    this.branch = false
                    this.findBranchList({ crmDeptCode: this.userInfo.oldDeptCode })
                    this.findPlatformslist({ subsectionCode: this.userInfo.oldDeptCode })
                    break
                default:
            }
        }
    }
}