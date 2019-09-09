<template>
    <el-card class="box-card">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" label-position="left" class="demo-ruleForm">
            <el-form-item label="APP标识:" prop="appChannelCode">
                <el-radio-group v-model="ruleForm.appChannelCode">
                    <el-radio v-for="(val,ind) in appChannel" :key="ind" :label="val.label">{{val.value}}</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="版本号:" prop="versionNo">
                <el-input v-model="ruleForm.versionNo" placeholder="只允许填入整数"></el-input>
            </el-form-item>

            <el-form-item label="期限名称:" prop="peroidName">
                <el-input v-model="ruleForm.peroidName" placeholder="请输入期限名称"></el-input>
            </el-form-item>

            <el-form-item label="期限编号:" prop="peroidCode">
                <el-input v-model="ruleForm.peroidCode" placeholder="请输入期限编号"></el-input>
            </el-form-item>
            
            <el-form-item label="地区:" prop="peroidType">
                <el-radio-group v-model="ruleForm.peroidType">
                    <el-radio :label="0">内地</el-radio>
                    <el-radio :label="1">香港</el-radio>
                </el-radio-group>
            </el-form-item>
            
            <el-form-item label="开始天:" prop="startDay">
                <el-input v-model.number="ruleForm.startDay" min=0 placeholder="只允许填入数字"></el-input>
            </el-form-item>
            
            <el-form-item label="结束天:" prop="endDay">
                <el-input v-model.number="ruleForm.endDay" min=0 placeholder="只允许填入数字"></el-input>
            </el-form-item>
            
            <el-form-item label="排序值:" prop="sort">
                <el-input v-model.number="ruleForm.sort" min=0 placeholder="只允许填入数字"></el-input>
            </el-form-item>
            
            <el-form-item label="每页条数:" prop="indexPageSize">
                <el-input v-model.number="ruleForm.indexPageSize" min=0 placeholder="只允许填入数字"></el-input>
            </el-form-item>
            
            <el-form-item label="总条数:" prop="total">
                <el-input v-model.number="ruleForm.total" min=0 placeholder="只允许填入数字"></el-input>
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
    props: ['appChannel', 'params'],
    data() {
        return {
            pageName: '',
            id: '',
            ruleForm: {
                appChannelCode: '',//app标识
                versionNo: '',//版本号
                peroidName: '',//期限名称
                peroidCode: '',//期限编号
                peroidType: '',//期限类型
                startDay: '',//开始天
                endDay: '',//结束天
                sort: '',//排序值
                indexPageSize: '',//每页限制条数
                total: '',//总条数
            },
            rules: {
                appChannelCode: [
                    {required: true, message: '请选择App', trigger: 'blur'},
                ],
                versionNo: [
                    {required: true, message: '请输入版本号', trigger: 'blur'},
                    { pattern: /^\+?[1-9]\d*$/,message: '只能输入大于0的正整数', trigger: 'blur' },
                ],
                peroidName: [
                    {required: true, message: '请输入期限名称', trigger: 'blur'},
                ],
                peroidCode: [
                    {required: true, message: '请输入期限编号', trigger: 'blur'},
                ],
                peroidType: [
                    {required: true, message: '请选择地区', trigger: 'blur'},
                ],
                startDay: [
                    {required: true, message: '请输入开始天', trigger: 'blur'},
                    { pattern: /^\+?[1-9]\d*$/,message: '只能输入大于0的正整数', trigger: 'blur' },
                ],
                endDay: [
                    {required: true, message: '请输入结束天', trigger: 'blur'},
                    { pattern: /^\+?[1-9]\d*$/,message: '只能输入大于0的正整数', trigger: 'blur' },
                ],
                sort: [
                    {required: true, message: '请输入排序值', trigger: 'blur'},
                    { pattern: /^\+?[1-9]\d*$/,message: '只能输入大于0的正整数', trigger: 'blur' },
                ],
                indexPageSize: [
                    {required: true, message: '请输入每页条数', trigger: 'blur'},
                    { pattern: /^\+?[1-9]\d*$/,message: '只能输入大于0的正整数', trigger: 'blur' },
                ],
                total: [
                    {required: true, message: '请输入总条数', trigger: 'blur'},
                    { pattern: /^\+?[1-9]\d*$/,message: '只能输入大于0的正整数', trigger: 'blur' },
                ],
            },
            appChannelName: '',//app名字
        }
    },
    mounted() {
        this.pageName = this.$route.name;
        if(this.params) {
            this.id = this.params.id;
            this.ruleForm.appChannelCode = this.params.appChannelCode;
            this.ruleForm.versionNo = this.params.versionNo;
            this.ruleForm.peroidCode = this.params.peroidCode;
            this.ruleForm.peroidName = this.params.peroidName;
            this.ruleForm.peroidType = this.params.peroidType;
            this.ruleForm.startDay = this.params.startDay;
            this.ruleForm.endDay = this.params.endDay;
            this.ruleForm.sort = this.params.sort;
            this.ruleForm.indexPageSize = this.params.indexPageSize;
            this.ruleForm.total = this.params.total;
            // this.showType = this.params.showType;
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
                    this.appChannel.forEach(v=> {
                        if(this.appChannelCode == v.label){
                            this.appChannelName = v.value
                        }
                    })
                    let obj = {
                        id: this.id,
                        appChannelCode: this.ruleForm.appChannelCode,
                        appChannelName: this.appChannelName,
                        versionNo: this.ruleForm.versionNo,
                        peroidCode: this.ruleForm.peroidCode,
                        peroidName: this.ruleForm.peroidName,
                        peroidType: this.ruleForm.peroidType,
                        startDay: this.ruleForm.startDay,
                        endDay: this.ruleForm.endDay,
                        sort: this.ruleForm.sort,
                        indexPageSize: this.ruleForm.indexPageSize,
                        total: this.ruleForm.total,
                    }
                    this.$emit('send',obj)
                } else {
                    return false;
                }
            });
        }
    },
    watch: {
        'params.id'() {
            this.id = this.params.id;
            this.ruleForm.appChannelCode = this.params.appChannelCode;
            this.ruleForm.versionNo = this.params.versionNo;
            this.ruleForm.peroidCode = this.params.peroidCode;
            this.ruleForm.peroidName = this.params.peroidName;
            this.ruleForm.peroidType = this.params.peroidType;
            this.ruleForm.startDay = this.params.startDay;
            this.ruleForm.endDay = this.params.endDay;
            this.ruleForm.sort = this.params.sort;
            this.ruleForm.indexPageSize = this.params.indexPageSize;
            this.ruleForm.total = this.params.total;
            // this.showType = this.params.showType;
        }
    }
}
</script>

<style lang='scss' scoped>
.box-card{
    box-shadow:0 0 0 0 !important;
    border:0;
}
img{
    width:100%;
}
.el-input{
    width:220px!important;
}
</style>
