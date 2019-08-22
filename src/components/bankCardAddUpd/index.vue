<template>
    <el-card class="box-card">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" label-position="left" class="demo-ruleForm">
            <el-form-item label="银行名称:" prop="bankName">
                <el-select v-model="ruleForm.bankName" placeholder="请选择银行" filterable :disabled="detailFlag">
                    <el-option
                    v-for="(item,ind) in bankOption"
                    :key="ind"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="卡长度:" prop="cardLength">
                <el-input v-model.number="ruleForm.cardLength" placeholder="卡长度(最多8位纯数字)" :disabled="detailFlag" maxlength="8" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="卡前缀（卡bin）:" prop="cardPrefix">
                <el-input v-model.number="ruleForm.cardPrefix" placeholder="卡bin(1最多10位纯数字）" :disabled="detailFlag" maxlength="10" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="清算行行号:" prop="clearingBankNumber">
                <el-input v-model.number="ruleForm.clearingBankNumber" placeholder="清算行行号（12位纯数字）" :disabled="detailFlag" maxlength="12" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="卡类型:" prop="cardType">
                <el-select v-model="ruleForm.cardType" placeholder="请选择" :disabled="detailFlag">
                    <el-option
                    v-for="(item,ind) in cardTypeData"
                    :key="ind"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="!detailFlag">
                <el-button type="primary" @click="save('ruleForm')">保存</el-button>
                <el-button @click="cancel('ruleForm')">取消</el-button>
            </el-form-item>
            <el-form-item v-else>
                <el-button @click="close('ruleForm')">关闭</el-button>
            </el-form-item>
        </el-form>
        
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
    </el-card>
</template>

<script>
// import { upLoadImg } from '../../api/setting_use.js';
export default {
    name:'bankCardAddUpd',
    props: ['opts', 'detailFlag', 'list'],
    data() {
        return {
            ruleForm: {
                bankName: "",//银行名称
                cardPrefix: "",//卡bin
                cardLength: "",//卡长度
                clearingBankNumber: "",//清算行行号
                cardType: "",//卡类型
            },
            rules: {
                bankName: [{ required: true, message: '请选择银行', trigger: 'blur' }],
                cardPrefix: [
                    { required: true, message: '请输入卡bin', trigger: 'blur' },
                    { pattern: /^[+]{0,1}(\d+)$/,message: '只能输入正整数', trigger: 'blur' },
                ],
                cardLength: [
                    { required: true, message: '请输入卡长度', trigger: 'blur' },
                    { pattern: /^[+]{0,1}(\d+)$/,message: '只能输入正整数', trigger: 'blur' },    
                ],
                clearingBankNumber: [
                    { required: true, message: '请输入清算行行号', trigger: 'blur' },
                    { pattern: /^[+]{0,1}(\d+)$/,message: '只能输入正整数', trigger: 'blur' },    
                ],
                cardType: [{ required: true, message: '请选择卡类型', trigger: 'blur' }],
            },
            bankId: "",//银行id
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
            this.ruleForm.bankName = this.opts.bankName;
            this.ruleForm.cardLength = this.opts.cardLength;
            this.ruleForm.cardPrefix = this.opts.cardPrefix;
            this.ruleForm.clearingBankNumber = this.opts.clearingBankNumber;
            this.ruleForm.cardType = this.opts.cardType == '贷记卡' ? 'CREDIT' : 'DEBIT';
        }
    },
    methods: {
        //点击取消
        cancel(formName) {
            this.$refs[formName].resetFields();
            this.$emit('cancel')
        },
        //点击保存
        save(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$store.state.bank.bankList.data.list.forEach(v=> {
                        if(this.ruleForm.bankName == v.bankName){
                            this.bankId = v.id
                        }
                    })
                    let obj = {
                        id: this.opts ? this.opts.id : "",
                        bankId:this.bankId,
                        cardPrefix: this.ruleForm.cardPrefix,
                        cardLength: this.ruleForm.cardLength,
                        clearingBankNumber: this.ruleForm.clearingBankNumber,
                        cardType: this.ruleForm.cardType,
                    }
                    //向父组件传递
                    this.$emit('send',obj)
                } else {
                    return false;
                }
            });
        },
        //点击关闭
        close(formName) {
            this.$refs[formName].resetFields();
            this.$emit('close')
        },
    },
    watch: {
        //监听this.opts的变化  给初始化赋值
        'opts.id'() {
            this.ruleForm.bankName = this.opts.bankName;
            this.ruleForm.cardLength = this.opts.cardLength;
            this.ruleForm.cardPrefix = this.opts.cardPrefix;
            this.ruleForm.clearingBankNumber = this.opts.clearingBankNumber;
            this.ruleForm.cardType = this.opts.cardType == '贷记卡' ? 'CREDIT' : 'DEBIT';
        }
    }
}
</script>

<style scoped="true" lang="scss">
.el-input{
    width:220px!important;
}
</style>
