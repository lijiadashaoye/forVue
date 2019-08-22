<template>
    <el-card class="box-card">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm" width='300px'>
            <el-form-item label="收益日期" prop="rateDate">
                <el-date-picker
                    type="date"
                    v-model="ruleForm.rateDate"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="七日年化" prop="onThe7thOfTheYearYield">
                <el-input
                    placeholder="请输入七日年化"
                    v-model="ruleForm.onThe7thOfTheYearYield"
                    type="text"
                    maxlength="7"
                    clearable
                    show-word-limit>
                </el-input>
            </el-form-item>
            <el-form-item label="万份收益" prop="thousandsOfYearsYields">
                <el-input
                    placeholder="请输入万份收益"
                    v-model="ruleForm.thousandsOfYearsYields"
                    type="text"
                    maxlength="7"
                    clearable
                    show-word-limit>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="save('ruleForm')">保存</el-button>
                <el-button @click="cancel('ruleForm')">取消</el-button>
            </el-form-item>
        </el-form>
        <!-- 产品类型 -->
        <!-- <div slot="header" class="clearfix">
            <div class="product-item">
                <span class="item-name">*收益日期:</span>
                <el-date-picker
                    type="date"
                    v-model="rateDate"
                    placeholder="选择日期">
                </el-date-picker>
            </div>
         
            <div class="product-item">
                <span class="item-name">*七日年化:</span>
                <el-input
                    placeholder="请输入七日年化"
                    v-model="onThe7thOfTheYearYield"
                    type="text"
                    maxlength="7"
                    clearable>
                </el-input>
            </div>

            <div class="product-item">
                <span class="item-name">*万份收益:</span>
                <el-input
                    placeholder="请输入万份收益"
                    v-model="thousandsOfYearsYields"
                    type="text"
                    maxlength="7"
                    clearable>
                </el-input>
            </div>

            <div class="product-bottom">
                <el-button @click="save">保存</el-button>
                <el-button @click='cancel'>取消</el-button>
            </div>
        </div> -->
    </el-card>
</template>

<script>
export default {
    name:'yuebaoAddorUpt',
    props:['options'],
    data() {
        return {
            ruleForm: {
                rateDate: new Date(),
                onThe7thOfTheYearYield: "",
                thousandsOfYearsYields: ""
            },
            rules: {
                rateDate: [
                    { required: true, message: '请输入收益日期', trigger: 'blur' },
                ],
                onThe7thOfTheYearYield: [
                    { required: true,message: '请输入七日年化', trigger: 'blur' },
                    { pattern: /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/,message: '七日年化不能小于0', trigger: 'blur' },
                ],
                thousandsOfYearsYields: [
                    { required: true, message: '请输入万份收益', trigger: 'blur' },
                    { pattern: /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/,message: '万份收益不能小于0', trigger: 'blur' },
                ],
            }
        }
    },
    mounted(){
        if(this.options){
            this.ruleForm.rateDate = this.options.rateDate;
            this.ruleForm.onThe7thOfTheYearYield = this.options.onThe7thOfTheYearYield;
            this.ruleForm.thousandsOfYearsYields = this.options.thousandsOfYearsYields;
        }
    },
    methods:{
        save(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let obj = {
                    id:this.options ? this.options.id : '',
                    rateDate : new Date(this.ruleForm.rateDate).getTime(),
                    onThe7thOfTheYearYield : this.ruleForm.onThe7thOfTheYearYield,
                    thousandsOfYearsYields : this.ruleForm.thousandsOfYearsYields
                }
                //向父组件传递 obj  父组件发送请求
                this.$emit('reqest',obj)
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        cancel(formName) {
            this.$refs[formName].resetFields();
        }
    },
    watch: {
        'options.rateDate'(){
           this.ruleForm.rateDate = this.options.rateDate;
        },
        'options.onThe7thOfTheYearYield'(){
            this.ruleForm.onThe7thOfTheYearYield = this.options.onThe7thOfTheYearYield;
        },
        'options.thousandsOfYearsYields'(){
            this.ruleForm.thousandsOfYearsYields = this.options.thousandsOfYearsYields;
        }
    }
}
</script>

<style lang="scss">
.el-input{
    width:220px;
}
</style>
