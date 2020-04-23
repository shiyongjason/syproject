import { mapState, mapActions } from 'vuex'
export const departmentAuth = {
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    data () {
        return {
            region: true,
            branch: true,
            district: true,
            platForm: true
        }
    },
    methods: {
        ...mapActions([
            'findPlatformslist', // 平台公司
            'findAuthList' // 大区、分部、区域
        ]),
        async oldBossAuth () {
            const p = [
                this.findAuthList({ deptType: 'D', pkDeptDoc: this.userInfo.deptDoc }),
                this.findAuthList({ deptType: 'F', pkDeptDoc: this.userInfo.deptDoc }),
                this.findAuthList({ deptType: 'Q', pkDeptDoc: this.userInfo.deptDoc })
            ]
            await Promise.all(p).then(res => {
                console.log(res)
                this.region = res[0].length > 0
                this.branch = res[1].length > 0
                this.district = res[2].length > 0
                // 0总部 1大区 2分部
                switch (this.userInfo.deptType) {
                    case 0:
                        this.findPlatformslist()
                        break
                    default:
                }
            }).catch(err => {
                this.$message.error(`error:${err}`)
            })
        }
    }
}