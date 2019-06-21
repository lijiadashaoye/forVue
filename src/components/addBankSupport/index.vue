<template>
    <el-card class="box-card">
        
        <div class="card-item">
            <span class="item-text">*开户银行:</span>
            <div class="item-input">
                <el-select v-model="bankName" filterable placeholder="请选择银行" :disabled="detailFlag" >
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
            <span class="item-text">*直销银行:</span>
            <div class="item-input">
                <el-select v-model="directName" filterable placeholder="选择直销银行" :disabled="detailFlag" >
                    <el-option
                    v-for="(item,ind) in directOption"
                    :key="ind"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>

        <div class="card-item">
            <span class="item-text">*日累计限额:</span>
            <div class="item-input">
                <el-input v-model="dailyCumulativeLimit" min="0" placeholder="输入每日额度" type="number" :disabled="detailFlag" ></el-input>
            </div>
        </div>

        <div class="card-item">
            <span class="item-text">*单笔额度:</span>
            <div class="item-input">
                <el-input v-model="eachQuota" min="0" placeholder="输入单笔额度" type="number" :disabled="detailFlag" ></el-input>
            </div>
        </div>

        <div class="card-item">
            <span class="item-text">*绑卡时是否输入取款密码:</span>
            <div class="item-input">
                <el-radio-group v-model="bindingCardIsPassword" :disabled="detailFlag">
                    <el-radio :label="'YES'">YES</el-radio>
                    <el-radio :label="'NO'">NO</el-radio>
                </el-radio-group>
            </div>
        </div>

        <div class="card-item">
            <span class="item-text">*充值时是否输入取款密码:</span>
            <div class="item-input">
                <el-radio-group v-model="transactionIsPassword" :disabled="detailFlag" >
                    <el-radio :label="'YES'">YES</el-radio>
                    <el-radio :label="'NO'">NO</el-radio>
                </el-radio-group>
            </div>
        </div>

        <div class="card-item">
            <span class="item-text">*是否本行卡:</span>
            <div class="item-input">
                <el-radio-group v-model="nowBankCard" :disabled="detailFlag">
                    <el-radio :label="'YES'">YES</el-radio>
                    <el-radio :label="'NO'">NO</el-radio>
                </el-radio-group>
            </div>
        </div>

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
import { mapActions } from 'vuex';
export default {
    name: 'addBankSupport',
    props: [ 'opts', 'detailFlag', 'list' ],
    data() {
        return {
            states: [],
            bankOption: [],//开户行列表
            bankName: "",//开户行名称 !!!
            directName: "",//直销银行名称 !!!
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
            dailyCumulativeLimit: "",//日限额 !!!
            eachQuota: "",//单笔限额 !!!
            bindingCardIsPassword: "YES",//绑卡是否要密码 !!!
            transactionIsPassword: "YES",//充值时是否要密码 !!!
            nowBankCard: "YES",//是否是本行卡 !!!
        }
    },
    mounted() {
        //获取开户银行列表
        this.list.forEach((v)=>{
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
            this.bankName = this.opts.bankName;
            this.directName = this.opts.directName;
            this.dailyCumulativeLimit = this.opts.dailyCumulativeLimit;
            this.eachQuota =this.opts.eachQuota;
            this.bindingCardIsPassword = this.opts.bindingCardIsPassword;
            this.transactionIsPassword = this.opts.transactionIsPassword;
            this.nowBankCard = this.opts.nowBankCard;
        }
    },
    // computed: {
    //     'this.list'() {
    //         return this.$store.state.bankCard.bankCardList.data.list;
    //     }
    // },
    methods: {
        //点击保存
        save() {
            if(this.bankName && this.directName && this.dailyCumulativeLimit &&
            this.eachQuota && this.bindingCardIsPassword && this.transactionIsPassword &&
            this.nowBankCard){
                //取bankCardId
                this.bankOption.forEach(v=> {
                    if(v.value === this.bankName) {
                        this.bankCardId = v.id
                    }
                })
                //取directId
                this.directBankLIst.forEach(v=> {
                    if(this.directName === v.name){
                        this.directId = v.id
                    }
                })
                //整理params
                let obj = {
                    id: this.opts ? this.opts.id : "",
                    bankCardId: this.bankCardId,
                    directId: this.directId,
                    directName: this.directName,
                    dailyCumulativeLimit: this.dailyCumulativeLimit,
                    eachQuota: this.eachQuota,
                    bindingCardIsPassword: this.bindingCardIsPassword,
                    transactionIsPassword: this.transactionIsPassword,
                    nowBankCard: this.nowBankCard
                }
                
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

        //点击取消
        cancel() {
            this.$emit('cancel')
        },
        //点击关闭
        close() {
            this.$emit('close')
        },
    },
    watch: {
        'opts.id'() {
            this.bankName = this.opts.bankName;
            this.directName = this.opts.directName;
            this.dailyCumulativeLimit = this.opts.dailyCumulativeLimit;
            this.eachQuota =this.opts.eachQuota;
            this.bindingCardIsPassword = this.opts.bindingCardIsPassword;
            this.transactionIsPassword = this.opts.transactionIsPassword;
            this.nowBankCard = this.opts.nowBankCard;
        }
    }
}
</script>

<style scoped="true" lang="scss">
.card-item{
        width:100%;
        height:100px;
        padding:10px;
        box-sizing:border-box;
        display:flex;
        align-items: center;
        .item-text{
            width:220px;
        }
        .item-input{
            width:400px;
            .msg{
                width:100%;
                padding:10px;
                color:red;
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
