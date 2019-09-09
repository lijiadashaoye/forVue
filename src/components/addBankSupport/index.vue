<template>
    <el-card class="box-card">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="180px" label-position="left" class="demo-ruleForm">
            <el-form-item label="开户银行:" prop="bankName">
                <el-select filterable v-model="ruleForm.bankName"  placeholder="请选择银行" :disabled="detailFlag" >
                    <el-option
                    v-for="(item,ind) in bankOption"
                    :key="ind"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="直销银行:" prop="directName">
                <el-select filterable v-model="ruleForm.directName"  placeholder="选择直销银行" :disabled="detailFlag" >
                    <el-option
                    v-for="(item,ind) in directOption"
                    :key="ind"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            
            <el-form-item label="日累计限额:" prop="dailyCumulativeLimit">
                <el-input v-model.number="ruleForm.dailyCumulativeLimit" min="0" placeholder="输入每日额度" :disabled="detailFlag" maxlength="10" show-word-limit></el-input>
            </el-form-item>

            <el-form-item label="单笔额度:" prop="eachQuota">
                <el-input v-model="ruleForm.eachQuota" min="0" placeholder="输入单笔额度" :disabled="detailFlag"  maxlength="10" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="绑卡时是否输入取款密码:" prop="bindingCardIsPassword">
                <el-radio-group v-model="ruleForm.bindingCardIsPassword" :disabled="detailFlag">
                    <el-radio :label="'YES'">YES</el-radio>
                    <el-radio :label="'NO'">NO</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="充值时是否输入取款密码:" prop="transactionIsPassword">
                <el-radio-group v-model="ruleForm.transactionIsPassword" :disabled="detailFlag" >
                    <el-radio :label="'YES'">YES</el-radio>
                    <el-radio :label="'NO'">NO</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="是否本行卡:" prop="nowBankCard">
                <el-radio-group v-model="ruleForm.nowBankCard" :disabled="detailFlag">
                    <el-radio :label="'YES'">YES</el-radio>
                    <el-radio :label="'NO'">NO</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item v-if="!detailFlag">
                <el-button type="primary" @click="save('ruleForm')">保存</el-button>
                <el-button @click="cancel('ruleForm')">取消</el-button>
            </el-form-item>
            <el-form-item  v-else>
                <el-button @click="close('ruleForm')">关闭</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: 'addBankSupport',
    props: [ 'opts', 'detailFlag', 'list' ],
    data() {
        return {
            states: [],
            bankOption: [],//开户行列表
            directOption: [],//直销银行
            directId: "",//直销银行id ===
            bankCardId: "",//开户银行id ===
            directBankLIst:[{
                id: 1,
                name: "1Q Bank"
            },{
                id: 2,
                name: "99银行"
            },{
                id: 3,
                name: "D+Bank"
            },{
                id: 4,
                name: "e千金"
            },{
                id: 5,
                name: "三叶草银行"
            }],
            
            ruleForm: {
                bankName: "",//开户行名称 !!!
                directName: "",//直销银行名称 !!!
                dailyCumulativeLimit: "",//日限额 !!!
                eachQuota: "",//单笔限额 !!!
                bindingCardIsPassword: "YES",//绑卡是否要密码 !!!
                transactionIsPassword: "YES",//充值时是否要密码 !!!
                nowBankCard: "YES",//是否是本行卡 !!!,
            },
            rules: {
                bankName: [{ required: true, message: '请选择开户行', trigger: 'blur' },],
                directName: [{ required: true, message: '请选择直销银行', trigger: 'blur' },],
                dailyCumulativeLimit: [
                    { required: true, message: '请填写日限额', trigger: 'blur' },
                    { pattern: /^\+?[1-9]\d*$/,message: '只能输入大于0的正整数', trigger: 'blur' },
                ],
                eachQuota: [
                    { required: true, message: '请填写单笔限额', trigger: 'blur' },
                    { pattern: /^\+?[1-9]\d*$/,message: '只能输入大于0的正整数', trigger: 'blur' },
                ],
                bindingCardIsPassword: [{ required: true, message: '请选择', trigger: 'blur' },],
                transactionIsPassword: [{ required: true, message: '请选择', trigger: 'blur' },],
                nowBankCard: [{ required: true, message: '请选择', trigger: 'blur' },],
            }
        }
    },
    mounted() {
        //获取开户银行列表
        this.list && this.list.forEach((v)=>{
            this.states.push({
                id:v.id,
                bankName:v.bankName,
                cardPrefix: v.cardPrefix
            })
        })
        this.bankOption = this.states && this.states.map(item => {
            return { value: `${item.bankName}(${item.cardPrefix})`, label: `${item.bankName}(${item.cardPrefix})`, id:item.id };
        })
        //直销银行下拉列表
        this.directOption = this.directBankLIst.map(v => {
            return {value: v.name, label: v.name}
        })

        //编辑  详情传入opts数据  初始化
        if(this.opts){
            this.ruleForm.bankName = this.opts.bankName;
            this.bankCardId = this.opts.bankCardId;
            this.ruleForm.directName = this.opts.directName;
            this.ruleForm.dailyCumulativeLimit = this.opts.dailyCumulativeLimit;
            this.ruleForm.eachQuota =this.opts.eachQuota;
            this.ruleForm.bindingCardIsPassword = this.opts.bindingCardIsPassword;
            this.ruleForm.transactionIsPassword = this.opts.transactionIsPassword;
            this.ruleForm.nowBankCard = this.opts.nowBankCard;
        }
    },
    methods: {
        //点击保存
        save(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                        //取bankCardId
                    this.bankOption && this.bankOption.forEach(v=> {
                        if(v.value === this.ruleForm.bankName) {
                            this.bankCardId = v.id
                        }
                    })
                    //取directId
                    this.directBankLIst.forEach(v=> {
                        if(this.ruleForm.directName === v.name){
                            this.directId = v.id
                        }
                    })
                    //整理params
                    let obj = {
                        id: this.opts ? this.opts.id : null,
                        bankCardId: this.bankCardId,
                        directId: this.directId,
                        directName: this.ruleForm.directName,
                        dailyCumulativeLimit: this.ruleForm.dailyCumulativeLimit,
                        eachQuota: this.ruleForm.eachQuota,
                        bindingCardIsPassword: this.ruleForm.bindingCardIsPassword,
                        transactionIsPassword: this.ruleForm.transactionIsPassword,
                        nowBankCard: this.ruleForm.nowBankCard
                    }
                    this.$emit('send',obj)
                } else {
                    return false;
                }
            });
        },

        //点击取消
        cancel(formName) {
            this.$refs[formName].resetFields();
            this.$emit('cancel')
        },
        //点击关闭
        close(formName) {
            this.$refs[formName].resetFields();
            this.$emit('close')
        },
    },
    watch: {
        'opts.id'() {
            this.ruleForm.bankName = this.opts.bankName;
            this.bankCardId = this.opts.bankCardId;
            this.ruleForm.directName = this.opts.directName;
            this.ruleForm.dailyCumulativeLimit = this.opts.dailyCumulativeLimit;
            this.ruleForm.eachQuota =this.opts.eachQuota;
            this.ruleForm.bindingCardIsPassword = this.opts.bindingCardIsPassword;
            this.ruleForm.transactionIsPassword = this.opts.transactionIsPassword;
            this.ruleForm.nowBankCard = this.opts.nowBankCard;
        }
    }
}
</script>

<style scoped="true" lang="scss">
.el-input{
    width:220px!important;
}
</style>
