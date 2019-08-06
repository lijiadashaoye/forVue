<template>
    <el-card class="box-card">
        <!-- APP -->
        <div class="card-item">
            <span class="item-text">*APP标识:</span>
            <div class="item-input">
                <el-select v-model="appChannelCode" placeholder="请选择APP">
                    <el-option
                        v-for="(item,ind) in AppOpt"
                        :key="ind"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>
        <!-- 活动编号 -->
        <div class="card-item">
            <span class="item-text">*活动编号:</span>
            <div class="item-input">
                <el-input v-model.trim="activityNumber" placeholder="只能输入数字" type="number"></el-input>
            </div>
        </div>

        <!-- 活动名称 -->
        <div class="card-item">
            <span class="item-text">*活动名称:</span>
            <div class="item-input">
                <el-select v-model.trim="activityName" placeholder="请选择活动名称">
                    <el-option
                        v-for="(item,ind) in activityOpt"
                        :key="ind"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>

        <!-- 显示类型 -->
        <div class="card-item">
            <span class="item-text">*显示类型:</span>
            <div class="item-input">
                <el-select v-model="showTypeCode" placeholder="请选择显示类型">
                    <el-option
                        v-for="(item,ind) in showTypeOpt"
                        :key="ind"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>

        <!-- 按钮图片 -->
        <div class="card-item">
            <span class="item-text">*按钮图片:</span>
            <div class="item-img">
                <el-upload
                    class="avatar-uploader"
                    action="customize"
                    :show-file-list="false"
                    :http-request="uploadbuttonImage"
                    >
                    <img v-if="buttonImage" :src="ImgBaseUrl + buttonImage" class="avatar">
                    <div v-else>
                        <el-button>选择图片<br/><span style="font-size:12px;color:red">不能大于2M</span><br/><span style="font-size:12px;color:red">jpg/png/gif/jpeg格式</span></el-button>
                    </div>
                </el-upload>
            </div>
        </div>
        
        <!-- 选中后得图片 -->
        <div class="card-item">
            <span class="item-text">选中后按钮图片:</span>
            <div class="item-img">
                <el-upload
                    class="avatar-uploader"
                    action="customize"
                    :show-file-list="false"
                    :http-request="uploadshrinkImage"
                    >
                    <img v-if="shrinkImage" :src="ImgBaseUrl + shrinkImage" class="avatar">
                    <div v-else>
                        <el-button>选择图片<br/><span style="font-size:12px;color:red">不能大于2M</span><br/><span style="font-size:12px;color:red">jpg/png/gif/jpeg格式</span></el-button>
                    </div>
                </el-upload>
            </div>
        </div>

        <!-- 浮动图片 -->
        <div class="card-item">
            <span class="item-text">*浮动图片:</span>
            <div class="item-img">
                <el-upload
                    class="avatar-uploader"
                    action="customize"
                    :show-file-list="false"
                    :http-request="uploadfloatImage"
                    >
                    <img v-if="floatImage" :src="ImgBaseUrl + floatImage" class="avatar">
                    <div v-else>
                        <el-button>选择图片<br/><span style="font-size:12px;color:red">不能大于2M</span><br/><span style="font-size:12px;color:red">jpg/png/gif/jpeg格式</span></el-button>
                    </div>
                </el-upload>
            </div>
        </div>

        <!-- 标题照片 -->
        <div class="card-item">
            <span class="item-text">按钮标题图片:</span>
            <div class="item-img">
                <el-upload
                    class="avatar-uploader"
                    action="customize"
                    :show-file-list="false"
                    :http-request="uploadbuttonTitleImage"
                    >
                    <img v-if="buttonTitleImage" :src="ImgBaseUrl + buttonTitleImage" class="avatar">
                    <div v-else>
                        <el-button>选择图片<br/><span style="font-size:12px;color:red">不能大于2M</span><br/><span style="font-size:12px;color:red">jpg/png/gif/jpeg格式</span></el-button>
                    </div>
                </el-upload>
            </div>
        </div>

        <!-- 平台 -->
        <div class="card-item">
            <span class="item-text">*平台:</span>
            <div class="item-input">
                <el-radio-group v-model="platformCode">
                    <el-radio :label="'ios'">苹果</el-radio>
                    <el-radio :label="'android'">安卓</el-radio>
                </el-radio-group>
            </div>
        </div>

        <!-- 按钮文字 -->
        <div class="card-item">
            <span class="item-text">*按钮文字:</span>
            <div class="item-input">
                <el-input v-model.trim="buttonText" placeholder="请输入按钮名称"></el-input>
            </div>
        </div>

        <!-- 文字颜色 -->
        <div class="card-item">
            <span class="item-text">*文字颜色:</span>
            <div class="item-input item-color">
                <el-input
                    v-model="textColor"
                    :disabled="true">
                </el-input>
                <el-color-picker v-model="textColor"></el-color-picker>
            </div>
        </div>

        <!-- 显示顺序 -->
        <div class="card-item">
            <span class="item-text">*显示顺序:</span>
            <div class="item-input">
                <el-input v-model.trim="sort" type="number" placeholder="请输入数字"></el-input>
            </div>
        </div>
        
        <!-- 活动标题 -->
        <div class="card-item">
            <span class="item-text">*活动标题:</span>
            <div class="item-input">
                <el-input v-model.trim="activityTitle" placeholder="请输入活动标题"></el-input>
            </div>
        </div>

        <!-- 活动说明 -->
        <div class="card-item">
            <span class="item-text">*活动说明:</span>
            <div class="item-input">
                <el-input 
                    v-model.trim="activityExplain"
                    type="textarea"
                    :autosize="{ minRows: 6, maxRows: 6}"
                    placeholder="请输入活动标题">
                </el-input>
            </div>
        </div>  

        <!-- 链接地址 -->
        <div class="card-item">
            <span class="item-text">*链接地址:</span>
            <div class="item-input">
                <el-input v-model.trim="linkUrl" placeholder="请输入链接地址"></el-input>
            </div>
        </div>       
        
        <!-- 开奖时间 -->
        <div class="card-item">
            <span class="item-text">*开奖时间:</span>
            <div class="item-input">
                <el-date-picker
                    v-model="lotteryTime"
                    type="datetime"
                    placeholder="选择开奖时间">
                </el-date-picker>
            </div>
        </div>

        <div class="card-footer">
            <el-button @click="cancel">取消</el-button>
            <el-button @click="save">保存</el-button>
        </div>

    </el-card>
</template>

<script>
import { upLoadImg, activity_list } from '../../api/setting_use.js';
export default {
    name : 'activityButton',
    props: [ 'opts' ],
    data() {
        return {
            activityNumber: "",//活动编号 !!!
            activityName: "",//活动名称 !!!
            activityOpt: [],//活动列表
            showTypeCode: "",//显示类型code !!!
            showTypeName: "",//显示类型名称 !!!...
            showTypeOpt: [//显示类型列表
                {
                    label: "顶部显示",
                    value: "top"
                },{
                    label: "底部显示",
                    value: "bottom"
                },{
                    label: "仅浮动和底部显示",
                    value: "float_bottom"
                },{
                    label: "仅浮动显示",
                    value: "float"
                }
            ],
            appChannelCode: "",//app名字标识 !!!
            appChannelName: "",//app名称 !!!...
            AppOpt: [//app下拉列表数据
                {
                    label: "比财APP",
                    value: "bicai"
                },{
                    label: "拼财APP",
                    value: "pincai"
                }
            ],
            buttonImage: "",//按钮图片 !!!
            shrinkImage: "",//选中后后按钮图片
            floatImage: "",//浮动照片 !!!
            buttonTitleImage: "",//按钮标题照片
            platformCode: "",//平台标识 !!!
            platformName: "",//平台名称 !!!...
            buttonText: "",//按钮文字 !!!
            textColor: "#0015ff",//文字颜色 !!!
            activityTitle: "",//活动标题 !!!
            activityExplain: "",//活动说明 !!!
            linkUrl: "",//链接地址 !!!
            lotteryTime: "",//开奖时间 !!!
            sort: "",//排序 !!!
            ImgBaseUrl: '',
        }
    },
    mounted() {
        this.ImgBaseUrl =  this.$ImgBaseUrl
        //活动名称列表
        activity_list().then(res=> {
            this.activityOpt = res.data.list.map(v=> {
                return {value: v.activityName, label: v.activityName}
            })
        });
        if(this.opts) {
            this.activityName = this.opts.activityName;
            this.activityNumber = this.opts.activityNumber;
            this.appChannelCode = this.opts.appChannelCode;
            this.showTypeCode = this.opts.showTypeCode;
            this.showTypeName = this.opts.showTypeName;
            this.buttonImage = this.opts.buttonImage;
            this.shrinkImage = this.opts.shrinkImage;
            this.floatImage = this.opts.floatImage;
            this.buttonTitleImage = this.opts.buttonTitleImage;
            this.platformCode = this.opts.platformCode;
            this.platformName = this.opts.platformName;
            this.buttonText = this.opts.buttonText;
            this.textColor = this.opts.textColor;
            this.sort = this.opts.sort;
            this.activityTitle = this.opts.activityTitle;
            this.activityExplain = this.opts.activityExplain;
            this.linkUrl = this.opts.linkUrl;
            this.lotteryTime = new Date(this.opts.lotteryTime);
        }
    },
    methods: {
        //上传按钮图片
        uploadbuttonImage(params) {
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
                    this.buttonImage = res.data
                }
            })
        },
        //上传选中后得按钮图片
        uploadshrinkImage(params) {
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
                    this.shrinkImage = res.data
                }
            })
        },
        //上传浮动照片
        uploadfloatImage(params) {
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
                    this.floatImage = res.data
                }
            })
        },
        //上传按钮标题照片
        uploadbuttonTitleImage(params) {
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
                    this.buttonTitleImage = res.data
                }
            })
        },
        //点击取消
        cancel() {
            this.activityName = '';
            this.activityNumber = '';
            this.appChannelCode = '';
            this.showTypeCode = '';
            this.showTypeName = '';
            this.buttonImage = '';
            this.shrinkImage = '';
            this.floatImage = '';
            this.buttonTitleImage = '';
            this.platformCode = '';
            this.platformName = '';
            this.buttonText = '';
            this.textColor = '';
            this.sort = '';
            this.activityTitle = '';
            this.activityExplain = '';
            this.linkUrl = '';
            this.lotteryTime = '';
            this.$emit('cancel')
        },
        //点击保存
        save() {
            //*必填
            if(this.activityNumber && this.activityName && this.showTypeCode && this.appChannelCode && this.buttonImage && this.floatImage && this.platformCode && this.buttonText && this.textColor && this.activityTitle && this.activityExplain && this.linkUrl && this.lotteryTime && this.sort) {
                //取到showTypeName
                this.showTypeOpt.forEach(v=> {
                    if(this.showTypeCode == v.value) {
                        this.showTypeName = v.label
                    }
                })
                //取appChannelName
                this.AppOpt.forEach(v=> {
                    if(this.appChannelCode == v.value) {
                        this.appChannelName = v.label
                    }
                })
                //取platformName
                if(this.platformCode == "ios") {
                    this.platformName = "苹果"
                } else if(this.platformCode == "android") {
                    this.platformName = "安卓"
                }
                //整理params
                let obj ={
                    id: this.opts ? this.opts.id : "",
                    activityName: this.activityName,
                    activityNumber: this.activityNumber,
                    appChannelCode: this.appChannelCode,
                    appChannelName: this.appChannelName,
                    showTypeCode: this.showTypeCode,
                    showTypeName: this.showTypeName,
                    buttonImage: this.buttonImage,
                    shrinkImage: this.shrinkImage,
                    floatImage: this.floatImage,
                    buttonTitleImage: this.buttonTitleImage,
                    platformCode: this.platformCode,
                    platformName: this.platformName,
                    buttonText: this.buttonText,
                    textColor: this.textColor,
                    sort: this.sort,
                    activityTitle: this.activityTitle,
                    activityExplain: this.activityExplain,
                    linkUrl: this.linkUrl,
                    lotteryTime: this.lotteryTime.getTime()
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
        }
    },
    watch: {
        'opts.id'() {
            this.activityName = this.opts.activityName;
            this.activityNumber = this.opts.activityNumber;
            this.appChannelCode = this.opts.appChannelCode;
            this.showTypeCode = this.opts.showTypeCode;
            this.showTypeName = this.opts.showTypeName;
            this.buttonImage = this.opts.buttonImage;
            this.shrinkImage = this.opts.shrinkImage;
            this.floatImage = this.opts.floatImage;
            this.buttonTitleImage = this.opts.buttonTitleImage;
            this.platformCode = this.opts.platformCode;
            this.platformName = this.opts.platformName;
            this.buttonText = this.opts.buttonText;
            this.textColor = this.opts.textColor;
            this.sort = this.opts.sort;
            this.activityTitle = this.opts.activityTitle;
            this.activityExplain = this.opts.activityExplain;
            this.linkUrl = this.opts.linkUrl;
            this.lotteryTime = new Date(this.opts.lotteryTime);
        }
    }
}
</script>

<style lang="scss" scoped>
.card-item{
    width:100%;
    // height:50px;
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
.card-footer{
    width:100%;
    display:flex;
    justify-content: center;
    height:100px;
    align-items: center;
}
</style>
