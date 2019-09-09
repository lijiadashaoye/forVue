<template>
    <el-card class="box-card">

        <!-- <div class="card-item">
            <span class="item-text">*机构代码:</span>
            <div class="item-input">
                <el-input v-model="organizationCode" placeholder="请输入机构代码" :disabled="detailFlag"></el-input>
            </div>
        </div> -->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" label-position="left" class="demo-ruleForm">
            <el-form-item label="银行名称:" prop="prodectBankId">
                <el-select filterable v-model="ruleForm.prodectBankId" placeholder="请输入名称" :disabled="detailFlag">
                    <el-option
                    v-for="(item,ind) in options"
                    :key="ind"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="银行LOGO:" prop="LogoUrl">
                <el-upload
                    class="avatar-uploader"
                    action="customize"
                    :show-file-list="false"
                    :http-request="uploadLogo"
                    :disabled="detailFlag"
                    :on-change="uploadLogoProcess"
                    >
                    <img v-if="ruleForm.LogoUrl != '' && logoFlag == false" :src="ImgBaseUrl + ruleForm.LogoUrl" class="avatar">
                    <div v-else-if='ruleForm.LogoUrl == "" && logoFlag == false'>
                        <el-button>选择图片<br/><span style="font-size:12px;color:red">不能大于2M</span><br/><span style="font-size:12px;color:red">jpg/png/gif/jpeg格式</span></el-button>
                    </div>
                    <el-progress v-if="logoFlag == true" type="circle" :percentage="logoUploadPercent" style="margin-top:30px;"></el-progress>
                </el-upload>
            </el-form-item>
            <el-form-item label="银行背景图:" prop="bgUrl">
                <el-upload
                    class="avatar-uploader"
                    action="customize"
                    :show-file-list="false"
                    :http-request="uploadBgFile"
                    :disabled="detailFlag"
                    :on-change="uploadBgProcess"
                    >
                    <img v-if="ruleForm.bgUrl !='' && bgFlag == false" :src="ImgBaseUrl + ruleForm.bgUrl" class="avatar">
                    <div v-else-if="ruleForm.bgUrl =='' && bgFlag == false">
                        <el-button>选择图片<br/><span style="font-size:12px;color:red">不能大于2M</span><br/><span style="font-size:12px;color:red">jpg/png/gif/jpeg格式</span></el-button>
                    </div>
                    <el-progress v-if="bgFlag == true" type="circle" :percentage="bgUploadPercent" style="margin-top:30px;"></el-progress>
                </el-upload>
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
import { upLoadImg, institutionList } from '../../api/setting_use.js';
import { async } from 'q';
export default {
    name:'addBankDetail',
    props:['detailFlag', 'opts'],
    data() {
        return {
            closeFlag: true,//关闭按钮
            organizationCode: "",//机构代码
            logoFlag: false,
            logoUploadPercent: 0,
            bgFlag: false,
            bgUploadPercent: 0,
            options: [],
            bankName: '',//银行名称,
            ImgBaseUrl: '',
            ruleForm: {
                prodectBankId: "",//产品关联银行id
                LogoUrl: "",//logo路径
                bgUrl: "",//背景图路径
            },
            rules: {
                prodectBankId:[{ required: true, message: '请选择银行名称', trigger: 'blur' },],
                LogoUrl:[{ required: true, message: '请上传图片', trigger: 'blur' },],
                bgUrl:[{ required: true, message: '请上传图片', trigger: 'blur' },],
            }
        }
    },
    mounted() {
        this.ImgBaseUrl = this.$ImgBaseUrl;
        institutionList().then(async res=> {
            if(res && res.success) {
                this.options = [];
                res.data && res.data.forEach(v => {
                    this.options.push({
                        value: v.id,
                        label: v.name
                    })
                });
            }
        })
        if(this.opts){
            this.ruleForm.LogoUrl = this.opts.logoPhoto;
            this.ruleForm.bgUrl = this.opts.background;
            this.ruleForm.prodectBankId = this.opts.prodectBankId;
            this.bankName = this.opts.bankName;
        }

    },
    methods:{
        //点击取消
        cancel(){
            this.id = '';
            this.$refs[formName].resetFields();
            this.$emit('cancel')
        },
        //1--10000随机数，代替机构代码
        randomNum(){
            let num = Math.floor(Math.random()*(10000-1)+1);
            return num;
        },
        //logo图片
        uploadLogo(params){
            const _file = params.file;
            const isLt2M = _file.size / 1024 / 1024 < 2;
            const idJPG = _file.type === "image/jpeg" ||  _file.type === "image/gif" ||  _file.type === "image/png" ||  _file.type === "image/jpg";
            var formData = new FormData();
            formData.append("file", _file);
            if(!idJPG) {
                this.$message.error("只能上传jpg/png/gif/jpeg格式的图片");
                return false
            }
            if (!isLt2M) {
                this.$message.error("请上传2M以下的图片");
                return false;
            }
            upLoadImg(formData).then(res=> {
                if(res.success){
                    this.logoFlag = false;
                    this.ruleForm.LogoUrl = res.data
                }
            })
        },
        uploadLogoProcess(file, fileList){
            if(file.status === 'ready') {
                this.logoUploadPercent = 0;
                this.logoFlag = true;
                const interval = setInterval(() => {
                this.logoUploadPercent += 1;
                if(this.logoUploadPercent >= 99) {
                    window.clearInterval(interval)
                    return
                }
                }, 200);
            }
            if(file.status === 'success') {
                window.clearInterval(interval)
                this.logoFlag = false;
                this.logoUploadPercent = 100;
            }
        },
        //上传背景图
        uploadBgFile(params) {
            const _file = params.file;
            const isLt2M = _file.size / 1024 / 1024 < 2;
            const idJPG = _file.type === "image/jpeg" ||  _file.type === "image/gif" ||  _file.type === "image/png" ||  _file.type === "image/jpg";
            var formData = new FormData();
            formData.append("file", _file);
            if(!idJPG) {
                this.$message.error("只能上传jpg/png/gif/jpeg格式的图片");
                return false
            }
            if (!isLt2M) {
                this.$message.error("请上传2M以下的图片");
                return false;
            }
            upLoadImg(formData).then(res=> {
                if(res.success){
                    this.bgFlag = false;
                    this.ruleForm.bgUrl = res.data
                }
            })
        },
        uploadBgProcess(file,fileList) {
            if(file.status === 'ready') {
                this.bgUploadPercent = 0;
                this.bgFlag = true;
                const interval = setInterval(() => {
                this.bgUploadPercent += 1;
                if(this.bgUploadPercent >= 99) {
                    window.clearInterval(interval)
                    return
                }
                }, 200);
            }
            if(file.status === 'success') {
                window.clearInterval(interval)
                this.bgFlag = false;
                this.bgUploadPercent = 100;
            }
        },
        //点击保存
        save(formName){
            this.organizationCode = this.randomNum()
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.options && this.options.forEach(v=> {
                        if(this.ruleForm.prodectBankId == v.value) {
                            this.bankName = v.label
                        }
                    })
                    let obj = {
                        id: this.opts ? this.opts.id : '',
                        organizationCode: this.organizationCode,
                        prodectBankId: this.ruleForm.prodectBankId,
                        logoPhoto: this.ruleForm.LogoUrl,
                        background: this.ruleForm.bgUrl,
                        bankName: this.bankName
                    }
                    //向父组件传递数据
                    this.$emit('send',obj)
                } else {
                    return false;
                }
            });
        },
        //点击取消
        close(formName){
            this.$refs[formName].resetFields();
            this.$emit('cancel')
        },
        
    },
    watch: {
        'opts.id'() {
            this.ruleForm.LogoUrl = this.opts.logoPhoto;
            this.ruleForm.bgUrl = this.opts.background;
            this.ruleForm.prodectBankId = this.opts.prodectBankId;
            this.bankName = this.opts.bankName;
        }
    }
}
</script>

<style scoped="true" lang="scss">
    img{
        width:100%;
    }
</style>
