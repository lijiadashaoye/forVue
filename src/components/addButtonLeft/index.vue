<template>
    <el-card class="box-card">

        <div class="card-item">
            <span class="item-text">*APP标识:</span>
            <div class="item-input">
                <el-select v-model="appChannelCode" placeholder="请选择APP" @change="appSelect(appChannelCode)">
                    <el-option
                        v-for="(item,ind) in AppOpt"
                        :key="ind"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>

        <div class="card-item">
            <span class="item-text">*显示类型:</span>
            <div class="item-input">
                <el-select v-model="buttonTypeCode" placeholder="请选择显示类型">
                    <el-option
                        v-for="(item,ind) in buttonTypeOpt"
                        :key="ind"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>

        <div class="card-item">
            <span class="item-text">*选中按钮图片:</span>
            <div class="item-img">
                <el-upload
                    class="avatar-uploader"
                    action="customize"
                    :show-file-list="false"
                    :http-request="uploadCheckImg"
                    >
                    <img v-if="buttonSelectedIcon" :src="buttonSelectedIcon" class="avatar">
                    <el-button v-else>选择图片</el-button>
                </el-upload>
            </div>
        </div>
        
        <div class="card-item">
            <span class="item-text">*未选中按钮图片:</span>
            <div class="item-img">
                <el-upload
                    class="avatar-uploader"
                    action="customize"
                    :show-file-list="false"
                    :http-request="uploadUnCheckImg"
                    >
                    <img v-if="buttonUnselectedIcon" :src="buttonUnselectedIcon" class="avatar">
                    <el-button v-else>选择图片</el-button>
                </el-upload>
            </div>
        </div>

        <div class="card-item">
            <span class="item-text">*按钮名称:</span>
            <div class="item-input">
                <el-input v-model="buttonText" placeholder="请输入按钮名称"></el-input>
            </div>
        </div>

        <div class="card-item">
            <span class="item-text">*未选中文字颜色:</span>
            <div class="item-input item-color">
                <el-input
                    v-model="buttonUnselectedTextColor"
                    :disabled="true">
                </el-input>
                <el-color-picker v-model="buttonUnselectedTextColor"></el-color-picker>
            </div>
        </div>

        <div class="card-item">
            <span class="item-text">*选中后文字颜色:</span>
            <div class="item-input item-color">
                <el-input
                    v-model="buttonSelectedTextColor"
                    :disabled="true">
                </el-input>
                <el-color-picker v-model="buttonSelectedTextColor"></el-color-picker>
            </div>
        </div>

        <div class="card-item" v-if="platformFlag">
            <span class="item-text">*平台:</span>
            <div class="item-input">
                <el-radio-group v-model="platformCode" :disabled="upData">
                    <el-radio :label="'all'">全部</el-radio>
                    <el-radio :label="'ios'">苹果</el-radio>
                    <el-radio :label="'android'">安卓</el-radio>
                </el-radio-group>
            </div>
        </div>

        <div class="card-item">
            <span class="item-text">*按钮key:</span>
            <div class="item-input">
                <el-input v-model="buttonKey" placeholder="请输入按钮key，例如：排行榜phb"></el-input>
            </div>
        </div>

        <div class="card-item">
            <span class="item-text">*显示顺序:</span>
            <div class="item-input">
                <el-input v-model="sort" min="1" max="5" type="number" placeholder="请输入1~5"></el-input>
            </div>
        </div>


        <div class="card-item">
            <span class="item-text">*版本号:</span>
            <div class="item-input">
                <el-input v-model="versionNo" placeholder="请输入版本号，只能输入数字"></el-input>
            </div>
        </div>
        
        <div class="card-item">
            <span class="item-text">*是否启用:</span>
            <div class="item-input">
                <el-radio-group v-model="StartFlag">
                    <el-radio :label="'true'">启用</el-radio>
                    <el-radio :label="'false'">未启用</el-radio>
                </el-radio-group>
            </div>
        </div>

        <div class="card-footer">
            <el-button @click="cancel">取消</el-button>
            <el-button @click="save">保存</el-button>
        </div>

    </el-card>
    
</template>

<script>
import { upLoadImg } from '../../api/setting_use.js';
export default {
    name:'addButtonLeft',
    props:['opts', 'isWxFlag', 'upData'],
    data(){
        return {
            buttonSelectedIcon: '',//选中的图片
            buttonUnselectedIcon: '',//未选中的图片
            buttonText: "",//按钮名称
            buttonUnselectedTextColor: '#409EFF',//未选中的字体颜色
            buttonSelectedTextColor: '#409EFF',//选中的颜色
            platformCode: '',//平台
            platformName: "",//平台名称
            platformFlag: true,//平台是否可选
            StartFlag: 'true',//是否启用
            appChannelCode: "",//app名字标识
            appChannelName: "",//app名称
            AppOpt: [//app下拉列表数据
                {
                    label: "比财APP",
                    value: "bicai"
                },{
                    label: "拼财APP",
                    value: "pincai"
                },{
                    label: "拼财小程序",
                    value: "pincaiwx"
                }
            ],
            buttonTypeCode: "",//button显示标识
            buttonTypeName: "",//button类型名称
            buttonTypeOpt: [//button显示下拉列表
                {
                    label: "顶部菜单显示",
                    value: "top"
                },{
                    label: "底部菜单显示",
                    value: "bottom"
                },{
                    label: "居中显示",
                    value: "center"
                },{
                    label: "仅浮动和底部显示",
                    value: "float_bottom"
                }
            ],
            versionNo: "",//版本号
            sort: "",//显示顺序
            buttonKey: "",//按钮索引标识
        }
    },
    mounted() {
        //修改时传入当前要修改得值
        if(this.opts) {
            this.platformFlag = this.isWxFlag;
            this.appChannelCode = this.opts.appChannelCode;
            this.buttonKey = this.opts.buttonKey;
            this.buttonSelectedIcon = this.opts.buttonSelectedIcon;
            this.buttonUnselectedIcon = this.opts.buttonUnselectedIcon;
            this.buttonTypeCode = this.opts.buttonTypeCode;
            this.platformCode = this.opts.platformCode;
            this.versionNo = this.opts.versionNo;
            this.sort = this.opts.sort;
            this.buttonSelectedTextColor = this.opts.buttonSelectedTextColor;
            this.buttonUnselectedTextColor = this.opts.buttonUnselectedTextColor;
            this.buttonText = this.opts.buttonText;
        }
    },
    methods:{
        //选择app渠道
        appSelect(val) {
            if(val == "pincaiwx"){
                this.platformFlag = false;
            }else{
                this.platformFlag = true;
            }
        },
        //上传未选中的照片
        uploadUnCheckImg(params) {
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
                    this.buttonUnselectedIcon = this.$ImgBaseUrl + res.data
                }
            })
        },

        //上传选中的图片
        uploadCheckImg(params) {
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
                    this.buttonSelectedIcon = this.$ImgBaseUrl + res.data
                }
            })
        },
        cancel(){
            this.$emit('cancel')
        },

        //点击保存
        save(){
            //判断sort值
            if(this.sort < 1 || this.sort > 5){
                this.$alert('显示顺序只能是1~5之间', '提交失败', {
                    confirmButtonText: '确定',
                    callback: action => {
                    this.sort = "";
                        this.$message({
                            type: 'info',
                            message: `action: ${ action }`
                        });
                    }
                })
                return false;
            }
            //*必填项
            if(this.buttonKey && this.appChannelCode && this.buttonTypeCode &&  this.versionNo && this.buttonSelectedIcon && this.buttonUnselectedIcon && this.buttonText && this.buttonSelectedTextColor && this.buttonUnselectedTextColor && this.sort && this.platformCode){
                //取到选中的appChannelname
                this.AppOpt.forEach(v=> {
                    if(this.appChannelCode == v.value) {
                        this.appChannelName = v.label
                    }
                })
                //渠道选中的buttonTupeName
                this.buttonTypeOpt.forEach(v=> {
                    if(this.buttonTypeCode == v.value) {
                        this.buttonTypeName = v.label
                    }
                })
                if(this.platformCode == "all") {
                    this.platformName = "全部"
                } else if(this.platformCode == "ios") {
                    this.platformName = "苹果"
                } else if(this.platformCode == "android") {
                    this.platformName = "安卓"
                }
                let obj = {
                    id: this.opts ? this.opts.id : "",
                    buttonKey: this.buttonKey,
                    appChannelCode: this.appChannelCode,
                    appChannelName: this.appChannelName,
                    buttonTypeCode: this.buttonTypeCode,
                    buttonTypeName: this.buttonTypeName,
                    platformCode: this.platformCode,
                    platformName: this.platformName,
                    versionNo: Number(this.versionNo),
                    buttonSelectedIcon: this.buttonSelectedIcon,
                    buttonUnselectedIcon: this.buttonUnselectedIcon,
                    buttonText: this.buttonText,
                    buttonSelectedTextColor: this.buttonSelectedTextColor,
                    buttonUnselectedTextColor: this.buttonUnselectedTextColor,
                    sort: this.sort
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
        //监听传入opts  id  变化
        'opts.id'() {
            this.platformFlag = this.isWxFlag;
            this.appChannelCode = this.opts.appChannelCode;
            this.buttonKey = this.opts.buttonKey;
            this.buttonSelectedIcon = this.opts.buttonSelectedIcon;
            this.buttonUnselectedIcon = this.opts.buttonUnselectedIcon;
            this.buttonTypeCode = this.opts.buttonTypeCode;
            this.platformCode = this.opts.platformCode;
            this.versionNo = this.opts.versionNo;
            this.sort = this.opts.sort;
            this.buttonSelectedTextColor = this.opts.buttonSelectedTextColor;
            this.buttonUnselectedTextColor = this.opts.buttonUnselectedTextColor;
            this.buttonText = this.opts.buttonText;
        }
    }
}
</script>

<style lang="scss" scoped>
    .box-card{
        flex:1;
        height:100%;
        overflow-y: auto;
    }
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
            .msg{
                width:100%;
                padding:10px;
                color:red;
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
    .card-footer{
        width:100%;
        display:flex;
        justify-content: center;
        height:100px;
        align-items: center;
    }
</style>
