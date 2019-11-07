<script lang='jsx'>
export default {
    name: 'dialogComponent',
    props: {
        item: Object,
        dialog: String
    },
    data () {
        return {
            remark: '',
            nameList: {
                'a-dd': '尽调材料归档情况',
                'b-realcontroller': '实控人身份证归档',
                'b-guarantee': '担保函归档',
                'b-other': '其余b档签约材料',
                'c-commercial': '其余工商材料',
                'c-capital': '增减资协议',
                'c-stocktransfer': '股转版协议',
                'd-other': '其他材料'
            }
        }
    },
    methods: {
        getUrlBase64 (url, dom, fileName, ext = '') {
            let _this = this
            var canvas = document.createElement('canvas') // 创建canvas DOM元素
            var ctx = canvas.getContext('2d')
            var img = new Image()
            img.setAttribute('crossOrigin', 'anonymous')
            img.src = url + '?time=' + new Date().valueOf()
            img.onload = function () {
                canvas.height = img.height // 指定画板的高度,自定义
                canvas.width = img.width // 指定画板的宽度，自定义
                ctx.drawImage(img, 0, 0) // 参数可自定义
                var dataURL = canvas.toDataURL('image/' + ext) // 传递的自定义的参数
                canvas = null
                var downDom = document.createElement('a') // 创建DOM元素
                downDom.setAttribute('href', dataURL)
                downDom.setAttribute('id', dom)
                downDom.setAttribute('download', fileName)
                console.log(downDom)
                _this.$nextTick(() => {
                    downDom.click()
                })
            }
        },
        formatSignBOs () {
            if (this.item.itemSignBOs && this.item.itemSignBOs.length === 5) {
                return false
            }
            let arr = []
            this.$set(this.item, 'itemSignBOs', [])
            for (let t = 0; t < 5; t++) {
                this.item.itemSignBOs.push([])
            }
            for (let i = 0; i < 5; i++) {
                let version = []
                arr = this.item.signBOs.filter(item => {
                    return item.archiveSignInvestPO.investVersion === `${i + 1}.0`
                })
                if (arr && arr.length > 0) {
                    let idCardList = []
                    let documentList = []
                    arr.map((item, index) => { // 某版本
                        idCardList = item.signDocPOs.filter(jtem => { // 筛选出每一版本的图片文件
                            return jtem.docType === '2'
                        })
                        documentList = item.signDocPOs.filter(jtem => { // 筛选出每一版本的文档文件
                            return jtem.docType === '1'
                        })
                        this.$set(item, 'idCardList', idCardList)
                        this.$set(item, 'documentList', documentList)
                        version.push(item)
                        let obj = {
                            radio: this.item[`v${i + 1}SignerFlag`] + '',
                            version: version // n份文件
                        }
                        arr[index] = obj
                    })
                    console.log(`v${i + 1}.0`, arr[arr.length - 1])
                    this.item.itemSignBOs.splice(i, 1, arr[arr.length - 1])
                }
            }
        },
        // 档案类型：a-dd：竞调材料； b-realcontroller:实控人身份证归档；b-guarantee:担保函归档；b-other:其余b档签约材料； c-commercial：其余工商材料；c-capital：增减资协议；c-stocktransfer：股转版协议； d-other：其他材料；
        getFile (type) {
            let temp = []
            if (type === 'c') {
                let arr = ['c-commercial', 'c-capital', 'c-stocktransfer']
                arr.map(item => {
                    temp.push(this.formatData(item))
                })
            }
            if (type === 'a') {
                let arr = ['a-dd']
                arr.map(item => {
                    temp.push(this.formatData(item))
                })
            }
            if (type === 'b') {
                let arr = ['b-realcontroller']
                arr.map(item => {
                    temp.push(this.formatData(item))
                })
            }
            if (type === 'b-guarantee') {
                let arr = ['b-guarantee']
                arr.map(item => {
                    temp.push(this.formatData(item))
                })
            }
            return temp
        },
        formatData (title) {
            const arr = this.item.commonDocPOs.filter(item => {
                return item.docType === title
            })
            return { title, file: arr }
        },
        getName (code) {
            return this.nameList[code] || '未知'
        }
    },
    render (h) {
        console.log(this.item, this.dialog)
        if (this.dialog === '档案编号') {
            return (
                <div class='box'>
                    <p><span>归档时间：</span>{this.item.createTime ? this.item.createTime : '-'}</p>
                    <p><span>归档人：</span>{this.item.createUser ? this.item.createUser : '-'}</p>
                    <p><span>档案位置：</span>{this.item.archiveLocation ? this.item.archiveLocation : '-'}</p>
                </div>
            )
        }
        if (this.dialog === '档案归档') {
            return (
                <div class='box'>
                    <p><span>档案情况：</span>{this.item.archiveStatus === '2' ? '档案缺失' : this.item.archiveStatus === '1' ? '档案齐全' : ''}</p>
                    <p><span>备注：</span>{this.item.remark ? this.item.remark : '-'}</p>
                </div>
            )
        }
        if (this.dialog === '借阅情况') {
            return (
                <div class='box'>
                    <p><span>借阅情况：</span>{this.item.borrowStatus === '1' ? '未借出' : this.item.borrowStatus === '2' ? '已借出' : ''}</p>
                    <p><span>备注：</span>{this.item.borrowRemark ? this.item.borrowRemark : '-'}</p>
                </div>
            )
        }
        if (this.dialog === 'C档（工商）') {
            let arr = this.getFile('c')
            return (
                <div class='box'>
                    <div class='mb5'>工商材料归档情况：</div>
                    {
                        arr.map(item => {
                            return (
                                <div>
                                    <p>{this.getName(item.title)} ：</p>
                                    {
                                        item.file.length === 0
                                            ? '-'
                                            : item.file.map((jtem, jndex) => {
                                                return (
                                                    <p>
                                                        <span class='filename'><a href={jtem.fileUrl} target='_blank'>{jtem.fileName}</a></span>
                                                        {
                                                            jtem.fileName.toLowerCase().indexOf('.png') != -1 || jtem.fileName.toLowerCase().indexOf('.jpg') != -1 || jtem.fileName.toLowerCase().indexOf('.jpeg') != -1
                                                                ? <span class='download'><el-button type="primary" on-click={() => {
                                                                    this.getUrlBase64(jtem.fileUrl, `dom${jndex}`, jtem.fileName)
                                                                }} size='mini'>下载</el-button></span>
                                                                : <span><a class='downloadfile' href={jtem.fileUrl} target='_blank'>下载</a></span>
                                                        }
                                                    </p>
                                                )
                                            })
                                    }

                                </div>
                            )
                        })
                    }

                </div>
            )
        }
        if (this.dialog === '担保函') {
            let arr = this.getFile('b-guarantee')
            console.log(arr)
            return (
                <div class='box'>
                    {
                        arr.map(item => {
                            return (
                                <div>
                                    <p>签约人：{this.item.guanranteeName}</p>
                                    {
                                        item.file.length === 0
                                            ? '-'
                                            : item.file.map((jtem, jndex) => {
                                                return (
                                                    <p>
                                                        <span class='filename'><a href={jtem.fileUrl} target='_blank'>{jtem.fileName}</a></span>
                                                        {
                                                            jtem.fileName.toLowerCase().indexOf('.png') != -1 || jtem.fileName.toLowerCase().indexOf('.jpg') != -1 || jtem.fileName.toLowerCase().indexOf('.jpeg') != -1
                                                                ? <span class='download'><el-button type="primary" on-click={() => {
                                                                    this.getUrlBase64(jtem.fileUrl, `dom${jndex}`, jtem.fileName)
                                                                }} size='mini'>下载</el-button></span>
                                                                : <span><a class='downloadfile' href={jtem.fileUrl} target='_blank'>下载</a></span>
                                                        }
                                                    </p>
                                                )
                                            })
                                    }

                                </div>
                            )
                        })
                    }

                </div>
            )
        }
        if (this.dialog === 'A档（尽调）') {
            let arr = this.getFile('a')
            console.log(arr)
            return (
                <div class='box'>
                    {
                        arr.map(item => {
                            return (
                                <div>
                                    <p>{this.getName(item.title)} ：</p>
                                    {
                                        item.file.length === 0
                                            ? '-'
                                            : item.file.map((jtem, jndex) => {
                                                return (
                                                    <p>
                                                        <span class='filename'><a href={jtem.fileUrl} target='_blank'>{jtem.fileName}</a></span>
                                                        {
                                                            jtem.fileName.toLowerCase().indexOf('.png') != -1 || jtem.fileName.toLowerCase().indexOf('.jpg') != -1 || jtem.fileName.toLowerCase().indexOf('.jpeg') != -1
                                                                ? <span class='download'><el-button type="primary" on-click={() => {
                                                                    this.getUrlBase64(jtem.fileUrl, `dom${jndex}`, jtem.fileName)
                                                                }} size='mini'>下载</el-button></span>
                                                                : <span><a class='downloadfile' href={jtem.fileUrl} target='_blank'>下载</a></span>
                                                        }
                                                    </p>
                                                )
                                            })
                                    }

                                </div>
                            )
                        })
                    }

                </div>
            )
        }
        if (this.dialog === '实控人') {
            let arr = this.getFile('b')
            console.log(arr)
            return (
                <div class='box'>
                    <div class='mb5'>姓名：{this.item.realControllerName}</div>
                    <div class='mb5'>身份证归档情况：</div>
                    {
                        arr.map(item => {
                            return (
                                <div>
                                    {
                                        item.file.length === 0
                                            ? '-'
                                            : item.file.map((jtem, jndex) => {
                                                return (
                                                    <p>
                                                        <span class='filename'><a href={jtem.fileUrl} target='_blank'>{jtem.fileName}</a></span>
                                                        {
                                                            jtem.fileName.toLowerCase().indexOf('.png') != -1 || jtem.fileName.toLowerCase().indexOf('.jpg') != -1 || jtem.fileName.toLowerCase().indexOf('.jpeg') != -1
                                                                ? <span class='download'><el-button type="primary" on-click={() => {
                                                                    this.getUrlBase64(jtem.fileUrl, `dom${jndex}`, jtem.fileName)
                                                                }} size='mini'>下载</el-button></span>
                                                                : <span><a class='downloadfile' href={jtem.fileUrl} target='_blank'>下载</a></span>
                                                        }
                                                    </p>
                                                )
                                            })
                                    }

                                </div>
                            )
                        })
                    }

                </div>
            )
        }
        if (this.dialog === '投资协议') {
            // this.formatSignBOs()
            return (
                <div class='sign'>
                    {
                        this.item.itemSignBOs.map((item, index) => {
                            return (
                                <div>
                                    <p style='font-weight:bold'>{index + 1}.0版本：</p>
                                    {
                                        this.item[`v${index + 1}SignerFlag`] === 1
                                            ? item.version.map(jtem => {
                                                return (
                                                    <div class='signbos'>
                                                        <p class='signname'>
                                                            签约人：{jtem.archiveSignInvestPO.signerName ? jtem.archiveSignInvestPO.signerName : '-'}
                                                        </p>
                                                        <div class='fileslist'>
                                                            <p class='fileslistt'>文件：</p>
                                                            <div class='signfile'>
                                                                {
                                                                    jtem.signDocPOs.length === 0
                                                                        ? '-'
                                                                        : jtem.signDocPOs.map((ktem, kndex) => {
                                                                            return (
                                                                                <font>
                                                                                    <span class='filename'><a href={ktem.fileUrl} target='_blank'>{ktem.fileName}</a></span>
                                                                                    {
                                                                                        ktem.fileName.toLowerCase().indexOf('.png') != -1 || ktem.fileName.toLowerCase().indexOf('.jpg') != -1 || ktem.fileName.toLowerCase().indexOf('.jpeg') != -1
                                                                                            ? <span class='download'><el-button type="primary" on-click={() => {
                                                                                                this.getUrlBase64(ktem.fileUrl, `dom${kndex}`, ktem.fileName)
                                                                                            }} size='mini'>下载</el-button></span>
                                                                                            : <span><a class='downloadfile' href={ktem.fileUrl} target='_blank'>下载</a></span>
                                                                                    }
                                                                                </font>
                                                                            )
                                                                        })
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                            : '-'
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            )
        }
        if (this.dialog === '借出档案管理') {
            return (
                <div class='box'>
                    <p><span>备注：</span></p>
                    <p style={{ marginTop: '12px' }}>
                        <el-input value={this.item.borrowRemark} on-input={(val) => (this.item.borrowRemark = val)} type="textarea" placeholder="请输入档案借出备注" maxlength="255" show-word-limit rows="7"></el-input>
                    </p>
                </div>
            )
        }
        return ''
    }
}
</script>
<style lang='scss' scoped>
.box {
    padding: 0px 10px;
}
.box p {
    margin-bottom: 6px;
}
.download {
    float: right;
}
.filename a {
    color: #ff7a45;
}
.dialogbox p {
    height: 34px;
    line-height: 34px;
}
.signbos {
    display: flex;
}
.signname {
    flex: 0 0 200px;
}
.signbos font {
    display: flex;
}
.fileslist {
    display: flex;
    flex: 1;
    align-items: baseline;
}
/deep/.fileslistt {
    flex: 0 0 49px;
}
.signfile {
    flex: 1;
}
.signfile .filename {
    display: inline-block;
}
.signfile font {
    display: flex;
    justify-content: space-between;
    margin-top: 4px;
}
/deep/.downloadfile {
    font-size: 12px;
    border-radius: 3px;
    padding: 8px 16px;
    color: #fff;
    background-color: #ff7a45;
    border-color: #ff7a45;
    display: inline-block;
    line-height: 1;
    float: right;
}
</style>