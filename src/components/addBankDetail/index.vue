<template>
    <el-card class="box-card">

        <div class="card-item">
            <span class="item-text">*银行名称:</span>
            <div class="item-input">
                <el-input v-model="bankName" placeholder="请输入名称" :disabled="detailFlag"></el-input>
            </div>
        </div>

        <div class="card-item">
            <span class="item-text">*银行LOGO:</span>
            <div class="item-img">
                <!-- <upImg
                    :datas="logoOpt"
                    @selectImg="upLogoImg($event)"
                /> -->
                
                <el-upload
                    class="avatar-uploader"
                    action="customize"
                    :show-file-list="false"
                    :http-request="uploadLogo"
                    :disabled="detailFlag"
                    >
                    <img v-if="LogoUrl" :src="LogoUrl" class="avatar">
                    <el-button v-else>选择图片</el-button>
                </el-upload>
            </div>
        </div>


        <div class="card-item">
            <span class="item-text">*银行背景图:</span>
            <div class="item-img">
                <el-upload
                    class="avatar-uploader"
                    action="customize"
                    :show-file-list="false"
                    :http-request="uploadBgFile"
                    :disabled="detailFlag"
                    >
                    <img v-if="bgUrl" :src="bgUrl" class="avatar">
                    <el-button v-else>选择图片</el-button>
                </el-upload>
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
import { upLoadImg } from '../../api/setting_use.js';
export default {
    name:'addBankDetail',
    props:['detailFlag', 'opts'],
    data() {
        return {
            bankName: "",//银行名称
            LogoUrl: "",//logo路径
            bgUrl: "",//背景图路径
            closeFlag: true,//关闭按钮
            organizationCode: "",
        }
    },
    mounted() {
        if(this.opts){
            this.LogoUrl = this.opts.logoPhoto;
            this.bgUrl = this.opts.background;
            this.bankName = this.opts.bankName;
        }

    },
    methods:{
        //点击取消
        cancel(){},
        //1--10000随机数，代替机构代码
        randomNum(){
            let num = Math.floor(Math.random()*(10000-1)+1);
            return num;
        },
        //logo图片
        uploadLogo(params){
            const _file = params.file;
            const isLt5M = _file.size / 1024 / 1024 < 5;
            var formData = new FormData();
            formData.append("file", _file);
            if (!isLt5M) {
                this.$message.error("请上传5M以下的图片");
                return false;
            }
            upLoadImg(formData).then(res=> {
                if(res.success){
                    this.LogoUrl = this.$ImgBaseUrl + res.data
                }
            })
        },
        //上传背景图
        uploadBgFile(params) {
            const _file = params.file;
            const isLt5M = _file.size / 1024 / 1024 < 5;
            var formData = new FormData();
            formData.append("file", _file);
            if (!isLt5M) {
                this.$message.error("请上传5M以下的图片");
                return false;
            }
            upLoadImg(formData).then(res=> {
                if(res.success){
                    this.bgUrl = this.$ImgBaseUrl + res.data
                }
            })
        },
        //点击保存
        save(){
            this.organizationCode = this.randomNum()
            if(this.bankName && this.LogoUrl && this.bgUrl){
                let obj = {
                    id: this.opts ? this.opts.id : '',
                    organizationCode: this.organizationCode,
                    bankName: this.bankName,
                    logoPhoto: this.LogoUrl,
                    background: this.bgUrl
                }
                //向父组件传递数据
                this.$emit('send',obj)
            }else{
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
        close(){},
        
    },
    watch: {
        'opts.id'() {
            this.LogoUrl = this.opts.logoPhoto;
            this.bgUrl = this.opts.background;
            this.bankName = this.opts.bankName;
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
            width:200px;
        }
        .item-input{
            width:400px;
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
