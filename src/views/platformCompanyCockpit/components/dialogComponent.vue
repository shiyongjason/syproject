<script lang='jsx'>
export default {
    name: 'dialogComponent',
    props: {
        item: Object,
        dialog: String
    },
    data () {
        return {
            remark: ''
        }
    },
    methods: {
        onSave () {
            // https://stackoverflow.com/questions/14011021/how-to-download-a-base64-encoded-image?lq=1
            let downloadImage = document.getElementById('downloadImage')
            console.log(downloadImage)
            this.$nextTick(() => {
                downloadImage.click()
            })
        }
    },
    render (h) {
        console.log(this.item, this.dialog)
        if (this.dialog === '档案编号') {
            return (
                <div class='box'>
                    <p><span>归档时间：</span>{this.item.t}</p>
                    <p><span>归档人：</span>{this.item.d}</p>
                    <p><span>档案位置：</span>{this.item.e}</p>
                </div>
            )
        }
        if (this.dialog === '档案归档') {
            return (
                <div class='box'>
                    <p><span>档案情况：</span>{this.item.b === 0 ? '档案缺失' : this.item.b === 1 ? '档案齐全' : ''}</p>
                    <p><span>备注：</span>{this.item.d}</p>
                </div>
            )
        }
        if (this.dialog === '借阅情况') {
            return (
                <div class='box'>
                    <p><span>借阅情况：</span>{this.item.c === 0 ? '未借出' : this.item.c === 1 ? '已借出' : ''}</p>
                    <p><span>备注：</span>{this.item.d}</p>
                </div>
            )
        }
        if (this.dialog === 'C档（工商）') {
            return (
                <div class='box'>
                    <div class='mb5'>工商材料归档情况</div>
                    <p>其余工商材料：</p>
                    <p>
                        <span class='filename'><a href='http://www.cnr.cn/junshi/jstp/201109/W020110921415866476639.jpg' target='_blank'>律其勇身份证1.jpg</a></span>
                        <a download="QRcode.png" href='http://www.cnr.cn/junshi/jstp/201109/W020110921415866476639.jpg' id="downloadImage" style="display:none">Export img</a>
                        <span class='download'><el-button type="primary" on-click={this.onSave} size='mini'>下载</el-button></span>
                    </p>
                </div>
            )
        }
        if (this.dialog === '借出档案管理') {
            return (
                <div class='box'>
                    <p><span>备注：</span></p>
                    <p style={{ marginTop: '12px' }}>
                        <el-input value={this.remark} on-input={(val) => (this.remark = val)} type="textarea" placeholder="请输入档案借出备注" maxlength="255" show-word-limit rows="7"></el-input>
                    </p>
                </div>
            )
        }
        return ''
    }
}
</script>
<style lang='scss' scoped>
.box{padding:0px 10px}
.box p{margin-bottom:6px}
.download{ float: right}
.filename a{ color: #FF7A45;}
</style>