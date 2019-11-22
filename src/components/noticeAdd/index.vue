<template>
    <el-card class="box-card">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" label-position="left" >
            <el-form-item label="APP标识:" prop="appChannelCode">
                 <el-radio-group v-model="ruleForm.appChannelCode">
                    <el-radio v-for="(val,ind) in appChannel" :key="ind" :label="val.label">{{val.value}}</el-radio>
                </el-radio-group>
            </el-form-item>
            
            <el-form-item label="内容:" prop="content">
                <el-input
                    type="textarea"
                    :autosize="{ minRows: 6, maxRows: 6}"
                    placeholder="请输入内容"
                    v-model="ruleForm.content">
                </el-input>
            </el-form-item>
            
            <el-form-item label="系统:" prop="platformCode">
                <el-radio-group v-model="ruleForm.platformCode">
                    <el-radio :label="'ios'">苹果</el-radio>
                    <el-radio :label="'android'">安卓</el-radio>
                </el-radio-group>
            </el-form-item>
            
            <el-form-item label="公告时间:" prop="noticeTime">
                <el-date-picker
                    v-model="ruleForm.noticeTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            
            <el-form-item label="排序值:" prop="sort">
                <el-input v-model.number="ruleForm.sort"  placeholder="只允许填入数字"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="save('ruleForm')">保存</el-button>
                <el-button @click="cancel('ruleForm')">取消</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
export default {
    props: ['updata', 'params', 'appChannel', 'flag'],
    data() {
        return {
            pageName: '',
            id: '',
            appChannelName: '',//app名称
            platformName: '',//app标识
            ruleForm: {
                content: '',//内容
                appChannelCode: '',//app标识
                platformCode: '',//项目标识
                sort: '',//排序值
                noticeTime: [],
            },
            rules: {
                appChannelCode: [{required: true, message: '请选择App', trigger: 'blur'}],
                platformCode: [{required: true, message: '请选择系统', trigger: 'blur'}],
                sort: [
                    {required: true, message: '请输入排序值', trigger: 'blur'},
                    { pattern: /^\+?[1-9]\d*$/,message: '只能输入大于0的正整数', trigger: 'blur' },
                ],
                noticeTime: [{required: true, message: '请选择时间', trigger: 'blur'}],
                content: [{required: true, message: '请输入内容', trigger: 'blur'}],
            },
        }
    },
    mounted() {
        this.pageName = this.$route.name;
        if(this.params) {
            this.id = this.params.id ? this.params.id : null;
            this.ruleForm.content = this.params.content;
            this.ruleForm.appChannelCode = this.params.appChannelCode;
            this.ruleForm.platformCode = this.params.platformCode;
            this.ruleForm.sort = this.params.sort;
            this.ruleForm.noticeTime = [this.params.startTime,this.params.endTime]
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
                    //  渠道
                    this.appChannel.forEach(v=> {
                        if(this.ruleForm.appChannelCode == v.label){
                            this.appChannelName = v.value
                        }
                    })
                    //平台
                    if(this.ruleForm.platformCode === 'android') {
                        this.platformName = '安卓'
                    } else if(this.ruleForm.platformCode === 'ios') {
                        this.platformName = '苹果'
                    }
                    let obj = {
                        id: this.id,
                        content: this.ruleForm.content,
                        appChannelName: this.appChannelName,
                        platformCode: this.ruleForm.platformCode,
                        appChannelCode: this.ruleForm.appChannelCode,
                        platformName: this.platformName,
                        startTime: new Date(this.ruleForm.noticeTime[0]).getTime(),
                        endTime: new Date(this.ruleForm.noticeTime[1]).getTime(),
                        sort: this.ruleForm.sort
                    }
                    this.$emit('send',obj)
                } else {
                    return false;
                }
            });
        }
    },
    watch: {
        'flag'() {
            if(this.flag) {
                this.id = this.params.id ? this.params.id : null;
                this.ruleForm.content = this.params.content;
                this.ruleForm.appChannelCode = this.params.appChannelCode;
                this.ruleForm.platformCode = this.params.platformCode;
                this.ruleForm.sort = this.params.sort;
                this.ruleForm.noticeTime = [this.params.startTime,this.params.endTime]
            }
        },
    }
}
</script>

<style lang='scss' scoped>
.box-card{
    box-shadow:0 0 0 0 !important;
    border:0;
}
.card-item{
    width:100%;
    // height:60px;
    padding:10px;
    box-sizing:border-box;
    display:flex;
    align-items: center;
    .item-text{
        width:200px;
    }
    .input-quill{
        width:500px;
    }
    .item-input{
        width:400px;
        .msg{
            width:100%;
            padding:10px;
            color:red;
        }
        .el-select{
            width:100%;
        }
    }
    .item-color{
        display:flex;
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
.quill{
    height:auto;
}
.card-img{
    height:auto;
    .item-img{
        width:auto;
        height:auto;
        display:flex;
        align-items: center;
        padding:10px 0;
        box-sizing:border-box;
        img{
            width:100%;
            height:auto;
        }
    }
}
.card-textarea{
  height:auto;
}
.card-footer{
    width:100%;
    display:flex;
    justify-content: center;
    height:100px;
    align-items: center;
}
</style>
