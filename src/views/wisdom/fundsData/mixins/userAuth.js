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
            shy: []
        }
    },
    methods: {
        ...mapActions([
            'findPlatformslist',
            'findBranchList'
        ]),
        async abc (code) {
            this.findPlatformslist({ subsectionCode: code })
        },
        oldAuth () {
            console.log(this.userInfo)
            switch (this.userInfo.deptType) {
                case 0:
                    this.findPlatformslist()
                    // this.findBranchList()
                    break
                case 1:
                    break
                case 2:
                    const code = this.userInfo.oldDeptCode
                    this.findPlatformslist({ subsectionCode: code })
                    break
                default:
            }
        }
    }
}