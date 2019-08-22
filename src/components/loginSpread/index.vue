<template>
    <el-card class="box-card">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm" label-position="left">
            <el-form-item label="选择App:" prop="appChannelCode">
                <el-radio-group v-model="ruleForm.appChannelCode">
                    <el-radio v-for="(val,ind) in appChannel" :key="ind" :label="val.label" :disabled="!updataFlag">{{val.value}}</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="推广内容:" prop="spreadContent">
                <el-input
                    type="textarea"
                    :autosize="{ minRows: 6, maxRows: 6}"
                    placeholder="请输入推广内容"
                    v-model="ruleForm.spreadContent"
                    :disabled="detailFlag">
                </el-input>
            </el-form-item>

            <el-form-item label="内容显示字号:" prop="fontSize">
                <el-input-number v-model="ruleForm.fontSize" :min="14" :max="30" placeholder="请输入标题" :disabled="detailFlag"></el-input-number>
            </el-form-item>

            <el-form-item label="内容显示颜色:" prop="fontColor">
                 <el-color-picker v-model="ruleForm.fontColor" :disabled="detailFlag"></el-color-picker>
            </el-form-item>
            
            <el-form-item v-if="!detailFlag">
                <el-button type="primary" @click="save('ruleForm')">保存</el-button>
                <el-button @click="cancel('ruleForm')">取消</el-button>
            </el-form-item>
            <el-form-item v-else>
                <el-button @click="close('ruleForm')">关闭</el-button>
            </el-form-item>
        </el-form>
        

    </el-card>
</template>

<script>
export default {
    name:'loginSpread',
    props: [ 'appChannel', 'opts', 'updataFlag', 'detailFlag', 'addFlag'],
    data(){
        return {
            ruleForm: {
                spreadContent: "",//推广内容
                fontSize: "",//显示字体大小
                fontColor: "",//显示字体颜色
                appChannelVal: "",//App渠道名称
                appChannelCode: "",
            },
            rules: {
                spreadContent:[{ required: true, message: '请输入推广内容', trigger: 'blur' }],
                fontSize:[{ required: true, message: '请选择字号', trigger: 'blur' }],
                fontColor:[{ required: true, message: '请选择字体颜色', trigger: 'blur' }],
                appChannelCode:[{ required: true, message: '请选择App', trigger: 'blur' }],
            },
            flag: true
        }
    },
    mounted(){
        //加载时显示
        if(this.addFlag){
            this.flag = true
        }else{
            this.flag = false
        }
        //更改  详情  传入初始化数据
        if(this.opts){
            this.ruleForm.spreadContent = this.opts.spreadContent;
            this.ruleForm.fontSize = this.opts.fontSize;
            this.ruleForm.fontColor = this.opts.fontColor;
            this.ruleForm.appChannelVal = this.opts.appChannelName
            this.ruleForm.appChannelCode = this.opts.appChannelCode
        }
            
    },
    methods:{
        //点击保存
        save(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.appChannel && this.appChannel.forEach(v=> {
                        if(this.ruleForm.appChannelCode == v.label) {
                            this.ruleForm.appChannelVal = v.value;
                        }
                    })
                    let obj = {
                        id: this.opts ? this.opts.id : '',
                        appChannelCode: this.ruleForm.appChannelCode,
                        appChannelName: this.ruleForm.appChannelVal,
                        spreadContent: this.ruleForm.spreadContent,
                        fontSize: this.ruleForm.fontSize,
                        fontColor: this.ruleForm.fontColor
                    }
                        
                    //向父组件传递params
                    this.$emit('req',obj)
                } else {
                    return false;
                }
            });
        },

        //点击取消 数据回归初始化
        cancel(formName) {
            this.$refs[formName].resetFields();
            this.$emit('cancel',false)
        },
 
        //点击关闭
        close(formName) {
            this.$refs[formName].resetFields();
           this.$emit('close',false)
        }
    },
    watch: {//监听传入的参数变化   data变化
        'opts.id'(){
            this.ruleForm.spreadContent = this.opts.spreadContent;
            this.ruleForm.fontSize = this.opts.fontSize;
            this.ruleForm.fontColor = this.opts.fontColor;
            this.ruleForm.appChannelVal = this.opts.appChannelName;
            this.ruleForm.appChannelCode = this.opts.appChannelCode;
        },
        'addFlag'() {
            if(this.addFlag){
                this.flag = true
            }else{
                this.flag = false
            }
        }
    }

}
</script>

<style scoped="true" lang="scss">
    .card-item{
        width:100%;
        padding:10px;
        box-sizing:border-box;
        display:flex;
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

