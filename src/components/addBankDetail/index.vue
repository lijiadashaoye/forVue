<template>
    <el-card class="box-card">

        <!-- <div class="card-item">
            <span class="item-text">*机构代码:</span>
            <div class="item-input">
                <el-input v-model="organizationCode" placeholder="请输入机构代码" :disabled="detailFlag"></el-input>
            </div>
        </div> -->

        <div class="card-item">
            <span class="item-text">*银行名称:</span>
            <div class="item-input">
                <!-- <el-input v-model="prodectBankId" placeholder="请输入名称" :disabled="detailFlag"></el-input> -->
                <el-select v-model="prodectBankId" placeholder="请输入名称" :disabled="detailFlag">
                    <el-option
                    v-for="(item,ind) in options"
                    :key="ind"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
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
                    <div v-else>
                        <el-button>选择图片<br/><span style="font-size:12px;color:red">不能大于2M</span><br/><span style="font-size:12px;color:red">jpg/png/gif/jpeg格式</span></el-button>
                    </div>
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
                    <div v-else>
                        <el-button>选择图片<br/><span style="font-size:12px;color:red">不能大于2M</span><br/><span style="font-size:12px;color:red">jpg/png/gif/jpeg格式</span></el-button>
                    </div>
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
import { upLoadImg, institutionList } from '../../api/setting_use.js';
import { async } from 'q';
export default {
    name:'addBankDetail',
    props:['detailFlag', 'opts'],
    data() {
        return {
            prodectBankId: "",//产品关联银行id
            LogoUrl: "",//logo路径
            bgUrl: "",//背景图路径
            closeFlag: true,//关闭按钮
            organizationCode: "",//机构代码
            options: [],
            bankName: '',//银行名称
        }
    },
    mounted() {
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
            this.LogoUrl = this.opts.logoPhoto;
            this.bgUrl = this.opts.background;
            this.prodectBankId = this.opts.prodectBankId;
            this.bankName = this.opts.bankName;
        }

    },
    methods:{
        //点击取消
        cancel(){
            this.id = '';
            this.LogoUrl = '';
            this.bgUrl = '';
            this.prodectBankId = '';
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
            const idJPG = _file.type === "image/jpeg" || "image/gif" || "image/png" || "image/jpg";
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
                    this.LogoUrl = this.$ImgBaseUrl + res.data
                }
            })
        },
        //上传背景图
        uploadBgFile(params) {
            const _file = params.file;
            const isLt2M = _file.size / 1024 / 1024 < 2;
            const idJPG = _file.type === "image/jpeg" || "image/gif" || "image/png" || "image/jpg";
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
                    this.bgUrl = this.$ImgBaseUrl + res.data
                }
            })
        },
        //点击保存
        save(){
            this.organizationCode = this.randomNum()
            if(this.prodectBankId && this.LogoUrl && this.bgUrl){
                this.options && this.options.forEach(v=> {
                    if(this.prodectBankId == v.value) {
                        this.bankName = v.label
                    }
                })
                let obj = {
                    id: this.opts ? this.opts.id : '',
                    organizationCode: this.organizationCode,
                    prodectBankId: this.prodectBankId,
                    logoPhoto: this.LogoUrl,
                    background: this.bgUrl,
                    bankName: this.bankName
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
        close(){
            this.$emit('cancel')
        },
        
    },
    watch: {
        'opts.id'() {
            // this.id = this.opts.id;
            this.LogoUrl = this.opts.logoPhoto;
            this.bgUrl = this.opts.background;
            this.prodectBankId = this.opts.prodectBankId;
            this.bankName = this.opts.bankName
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
