<template>
    <el-card class="box-card">
        
        <div class="card-item">
            <span class="item-text">*银行名称:</span>
            <div class="item-input">
                <el-select v-model="bankName" placeholder="请选择银行" filterable :disabled="detailFlag">
                    <el-option
                    v-for="(item,ind) in bankOption"
                    :key="ind"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>

        <div class="card-item">
            <span class="item-text">*卡长度:</span>
            <div class="item-input">
                <el-input v-model="cardLength" placeholder="卡长度(最多8位纯数字)" :disabled="detailFlag" maxlength="8"></el-input>
                <span class="msg" v-if="cardLengthFlag">{{cardLengthMsg}}</span>
            </div>
        </div>

        <div class="card-item">
            <span class="item-text">*卡前缀（卡bin）:</span>
            <div class="item-input">
                <el-input v-model="cardPrefix" placeholder="卡bin(1最多10位纯数字）" :disabled="detailFlag" maxlength="10"></el-input>
                <span class="msg" v-if="cardPrefixFlag">{{cardPrefixMsg}}</span>
            </div>
        </div>

        <div class="card-item">
            <span class="item-text">*清算行行号:</span>
            <div class="item-input">
                <el-input v-model="clearingBankNumber" placeholder="清算行行号（12位纯数字）" :disabled="detailFlag" maxlength="12"></el-input>
                <span class="msg" v-if="clearingBankNumberFlag">{{clearingBankNumberMsg}}</span>
            </div>
        </div>

        <div class="card-item">
            <span class="item-text">*卡类型:</span>
            <div class="item-input">
                <el-select v-model="cardType" placeholder="请选择" :disabled="detailFlag">
                    <el-option
                    v-for="(item,ind) in cardTypeData"
                    :key="ind"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>

        <!-- <div class="card-item">
            <span class="item-text">银行LOGO:</span>
            <div class="item-img">
                <el-upload
                    class="avatar-uploader"
                    action="customize"
                    :show-file-list="false"
                    :http-request="uploadLogo"
                    >
                    <img v-if="logoUrl" :src="logoUrl" class="avatar">
                    <el-button v-else>选择图片</el-button>
                </el-upload>
            </div>
        </div>

        <div class="card-item">
            <span class="item-text">银行背景图:</span>
            <div class="item-img">
                <el-upload
                    class="avatar-uploader"
                    action="customize"
                    :show-file-list="false"
                    :http-request="uploadBgFile"
                    >
                    <img v-if="bgUrl" :src="bgUrl" class="avatar">
                    <el-button v-else>选择图片</el-button>
                </el-upload>
            </div>
        </div> -->

        <div class="card-footer" v-if="!detailFlag">
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" @click="save">保存</el-button>
        </div>

        <div class="card-footer" v-else>
            <el-button @click="close">关闭</el-button>
        </div>
    </el-card>
</template>

<script>
// import { upLoadImg } from '../../api/setting_use.js';
export default {
    name:'bankCardAddUpd',
    props: ['opts', 'detailFlag', 'list'],
    data() {
        return {
            bankName: "",//银行名称
            cardPrefix: "",//卡bin
            cardLength: "",//卡长度
            clearingBankNumber: "",//清算行行号
            cardType: "",//卡类型
            bankId: "",//银行id
            clearingBankNumberFlag: false,//清算行行号开关
            clearingBankNumberMsg: "",//清算行行号信息
            cardPrefixFlag: false,
            cardPrefixMsg: '',
            cardLengthFlag: false,
            cardLengthMsg: "",
            cardTypeData: [{
                value: 'DEBIT',
                label: '借记卡'
            }, {
                value: 'CREDIT',
                label: '贷记卡'
            }],
            bankOption: [],//银行选项
            states:[],
        }
    },
    mounted() {
        //获取银行列表选项
        this.list.forEach((v)=>{
            this.states.push(v.bankName)
        })
        this.bankOption = this.states && this.states.map(item => {
            return { value: item, label: item };
        })
        //点击详情  编辑传入的对象
        if(this.opts) {
            this.bankName = this.opts.bankName;
            this.cardLength = this.opts.cardLength;
            this.cardPrefix = this.opts.cardPrefix;
            this.clearingBankNumber = this.opts.clearingBankNumber;
            this.cardType = this.opts.cardType == '贷记卡' ? 'CREDIT' : 'DEBIT';
        }
    },
    methods: {
        //点击取消
        cancel() {
            this.bankName = '';
            this.cardLength = '';
            this.cardPrefix = '';
            this.clearingBankNumber = '';
            this.cardType = '';
            this.$emit('cancel')
        },
        //点击保存
        save() {
            if(this.bankName && this.cardLength && this.cardPrefix && this.clearingBankNumber && this.cardType){
               //获取银行id
                this.$store.state.bank.bankList.data.list.forEach(v=> {
                    if(this.bankName == v.bankName){
                        this.bankId = v.id
                    }
                })
                //验证清算行行号长度
                if(/^[1-9]\d*$|^0$/.test(this.clearingBankNumber) == false){
                   this.clearingBankNumberFlag = true;
                   this.clearingBankNumberMsg = '清算行行号必须是12位数字';
                   return false;
                } else {
                   this.clearingBankNumberFlag = false;
                }
                if(/^[1-9]\d*$|^0$/.test(this.cardPrefix) == false){
                   this.cardPrefixFlag = true;
                   this.cardPrefixMsg = '卡bin必须是数字';
                   return false;
                } else {
                   this.cardPrefixFlag = false;
                }
                if(/^[1-9]\d*$|^0$/.test(this.cardLength) == false){
                   this.cardLengthFlag = true;
                   this.cardLengthMsg = '卡长度必须是纯数字';
                   return false;
                } else {
                   this.cardLengthFlag = false;
                }
                let obj = {
                    id: this.opts ? this.opts.id : "",
                    bankId:this.bankId,
                    cardPrefix: this.cardPrefix,
                    cardLength: this.cardLength,
                    clearingBankNumber: this.clearingBankNumber,
                    cardType: this.cardType,
                }
                //向父组件传递
                this.$emit('send',obj)
            } else {
                this.$alert('*号是必填项', '提交失败', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.$message({
                            type: 'info',
                            message: `action: ${ action }`
                        });
                    }
                })
           }
        },
        //点击关闭
        close() {
            this.$emit('close')
        },
        // //上传背景图
        // uploadBgFile(params) {
        //     const _file = params.file;
        //     const isLt5M = _file.size / 1024 / 1024 < 5;
        //     var formData = new FormData();
        //     formData.append("file", _file);
        //     if (!isLt5M) {
        //         this.$message.error("请上传5M以下的图片");
        //         return false;
        //     }
        //     upLoadImg(formData).then(res=> {
        //         if(res.success){
        //             this.bgUrl = this.$ImgBaseUrl + res.data
        //         }
        //     })
        // },
        // //上传logo
        // uploadLogo(params) {
        //     const _file = params.file;
        //     const isLt5M = _file.size / 1024 / 1024 < 5;
        //     var formData = new FormData();
        //     formData.append("file", _file);
        //     if (!isLt5M) {
        //         this.$message.error("请上传5M以下的图片");
        //         return false;
        //     }
        //     upLoadImg(formData).then(res=> {
        //         if(res.success){
        //             this.logoUrl = this.$ImgBaseUrl + res.data
        //         }
        //     })
        // }
    },
    watch: {
        //监听this.opts的变化  给初始化赋值
        'opts.id'() {
            this.bankName = this.opts.bankName;
            this.cardLength = this.opts.cardLength;
            this.cardPrefix = this.opts.cardPrefix;
            this.clearingBankNumber = this.opts.clearingBankNumber;
            this.cardType = this.opts.cardType == '贷记卡' ? 'CREDIT' : 'DEBIT';
        }
    }
}
</script>

<style scoped="true" lang="scss">
    .card-item{
        width:100%;
        // height:100px;
        padding:10px;
        box-sizing:border-box;
        display:flex;
        align-items: center;
        .item-text{
            width:200px;
        }
        .item-input{
            width:400px;
            .msg{
                width:100%;
                padding:10px;
                color:red;
            }
        }
        .item-img{
            width:100px;
            height:80px;
            display:flex;
            align-items: center;
            img{
                width:80px;
                height:80px;
            }
        }
    }
    .card-footer{
        width:100%;
        display:flex;
        justify-content: center;
        height:100px;
        align-items: center;
    }
</style>
