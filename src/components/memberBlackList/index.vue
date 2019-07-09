<template>
    <el-card class="box-card">
        <!-- <div class="card-item">
            <span class="item-text">*会员id:</span>
            <div class="item-input">
                <el-input v-model="memberId" placeholder="请输入会员ID"></el-input>
            </div>
        </div> -->

        <div class="card-item">
            <span class="item-text">*会员电话:</span>
            <div class="item-input">
                <el-input v-model="memberPhone" placeholder="请输入会员电话" :disabled="this.detailFlag" maxlength="11"></el-input>
            </div>
        </div>

        <div class="card-item">
            <span class="item-text">*加入类型:</span>
            <div class="item-input">
                <el-select v-model="joinType" placeholder="请选择被加入类型" filterable :disabled="this.detailFlag">
                    <el-option
                    v-for="(item,ind) in joinTypeOpt"
                    :key="ind"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>

        <div class="card-item">
            <span class="item-text">*处理类型:</span>
            <div class="item-input">
                <el-select v-model="dealType" placeholder="请选择处理类型" filterable :disabled="this.detailFlag">
                    <el-option
                    v-for="(item,ind) in dealTypeOpt"
                    :key="ind"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>

        <div class="card-item">
            <span class="item-text">*被加入的原因:</span>
            <div class="item-input input-quill">
                <el-input
                    type="textarea"
                    :autosize="{ minRows: 6, maxRows: 6}"
                    placeholder="请输入原因"
                    :disabled="this.detailFlag"
                    maxlength="100"
                    :show-word-limit='true'
                    v-model="reasonDescribe">
                </el-input>
            </div>
        </div>
        <div class="card-footer" v-if="!this.detailFlag">
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" @click="save">保存</el-button>
        </div>

        <div class="card-footer" v-else>
            <el-button @click="close">关闭</el-button>
        </div>
    </el-card>
</template>

<script>
export default {
    name: 'memberBlackList',
    props: [ 'opts', 'detailFlag' ],
    data() {
        return {
            id: "",//修改时的id
            memberId: "",//会员id
            memberPhone: "",//会员电话
            reasonDescribe: "",//原因描述
            joinType: "",//加入类型
            joinTypeOpt:[ //加入黑名单的类型
                {
                    label: 'ip',
                    value: 'IP'
                },
                {
                    label: '频次',
                    value: 'TIMES'
                },
                {
                    label: '操作行为',
                    value: 'OPERATE_ACTION'
                }
            ],
            dealType: "",//处理类型
            dealTypeOpt:[//处理类型
                {
                    label: '您的账户异常,登录失败',
                    value: 'SUSPEND'
                },
                {
                    label: '可登录,无法绑卡和提现',
                    value: 'NOT_HANDLE'
                }
            ]
        }
    },
    mounted() {
        if(this.opts) {
            this.id = this.opts.id;
            this.memberId = this.opts.memberId;
            this.memberPhone = this.opts.memberPhone;
            this.dealType = this.opts.dealType;
            this.joinType = this.opts.joinType;
            this.reasonDescribe = this.opts.reasonDescribe;
        }
    },
    methods: {
        //点击保存
        save() {
            //判断必传参数
            if( this.memberPhone && this.joinType && this.dealType && this.reasonDescribe) { 
                if(!(/^1[3456789]\d{9}$/.test(this.memberPhone))){ 
                    this.$message.error('请填写正确的手机号') 
                    return false; 
                } 
                let obj = {
                    id: this.opts ? this.opts.id : '',
                    memberId:this.memberId,
                    memberPhone: this.memberPhone,
                    joinType: this.joinType,
                    dealType: this.dealType,
                    reasonDescribe: this.reasonDescribe
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
            this.id = "";
            this.memberId = "";
            this.memberPhone = "";
            this.reasonDescribe = "";
            this.joinType = "";
            this.dealType = "";
            this.$emit('cancel')
        },
        close() {
            this.$emit('cancel')
        }
    },
    watch: {
        'opts.id'() {
            this.id = this.opts.id;
            this.memberId = this.opts.memberId;
            this.memberPhone = this.opts.memberPhone;
            this.dealType = this.opts.dealType;
            this.joinType = this.opts.joinType;
            this.reasonDescribe = this.opts.reasonDescribe;
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
        }
        .input-quill{
            width:500px;
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

