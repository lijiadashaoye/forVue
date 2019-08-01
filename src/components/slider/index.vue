<template>
    <el-card class="box-card">

        <div class="card-item">
            <span class="item-text">*APP标识:</span>
            <div class="item-input">
                <el-radio-group v-model="appChannelCode">
                    <el-radio v-for="(val,ind) in appChannel" :key="ind" :label="val.label">{{val.value}}</el-radio>
                </el-radio-group>
            </div>
        </div>

        <div class="card-item">
            <span class="item-text">*栏目标题:</span>
            <div class="item-input">
                <el-input v-model.trim="title" placeholder="请输入标题"></el-input>
            </div>
        </div> 

        <div class="card-item">
            <span class="item-text">*栏目key:</span>
            <div class="item-input">
                <el-input v-model.trim="columnKey" placeholder="请输入唯一key" @input="e => columnKey = validForbid(columnKey)"></el-input>
            </div>
        </div> 

        <div class="card-item card-img">
            <span class="item-text">*栏目图片:</span>
            <div class="item-img">
                <el-upload
                    class="avatar-uploader"
                    action="customize"
                    :show-file-list="false"
                    :http-request="uploadColumnImage"
                    >
                    <img v-if="columnImage" :src="columnImage" class="avatar">
                    <div v-else>
                        <el-button>选择图片<br/><span style="font-size:12px;color:red">不能大于2M</span><br/><span style="font-size:12px;color:red">jpg/png/gif/jpeg格式</span></el-button>
                    </div>
                </el-upload>
            </div>
        </div>
        
        <div class="card-item">
            <span class="item-text">*是否显示:</span>
            <div class="item-input">
                <el-radio-group v-model="isShow">
                    <el-radio :label="'SHOW'">显示</el-radio>
                    <el-radio :label="'HIDE'">不显示</el-radio>
                </el-radio-group>
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
            <span class="item-text">*栏目标题颜色:</span>
            <div class="item-input item-color">
                <el-input
                    v-model="columnColor"
                    :disabled="true">
                </el-input>
                <el-color-picker v-model="columnColor"></el-color-picker>
            </div>
        </div>

        <div class="card-item">
            <span class="item-text">文字说明:</span>
            <div class="item-input">
                <el-input v-model.trim="textExplain" placeholder="请输入说明"></el-input>
            </div>
        </div>

        <div class="card-item">
            <span class="item-text">文字说明颜色:</span>
            <div class="item-input item-color">
                <el-input
                    v-model="textExplainColor"
                    :disabled="true">
                </el-input>
                <el-color-picker v-model="textExplainColor"></el-color-picker>
            </div>
        </div>

        <div class="card-item">
            <span class="item-text">*排序值:</span>
            <div class="item-input">
                <el-input v-model.trim="sort" type="number" placeholder="只允许填入数字" @input="e => sort = validForbid(sort)"></el-input>
            </div>
        </div>

        <div class="card-item">
            <span class="item-text">链接地址:</span>
            <div class="item-input">
                <el-input v-model.trim="linkUrl" placeholder="请输入链接地址"></el-input>
            </div>
        </div>

        <div class="card-item">
            <span class="item-text">打点编号:</span>
            <div class="item-input">
                <el-input v-model.trim="dotNumber" placeholder="请输入打点编号" @input="e => dotNumber = validForbid(dotNumber)"></el-input>
            </div>
        </div>

        <div class="card-item card-textarea">
            <span class="item-text">备注:</span>
            <div class="item-input">
                <el-input
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 5}"
                placeholder="请输入内容"
                v-model.trim="remark"
                ></el-input>
            </div>
        </div>

        <div class="card-item">
            <span class="item-text">*系统:</span>
            <div class="item-input">
                <el-radio-group v-model="platformCode">
                    <el-radio :label="'ios'">苹果</el-radio>
                    <el-radio :label="'android'">安卓</el-radio>
                </el-radio-group>
            </div>
        </div>

        <div class="card-item">
            <span class="item-text">*版本号:</span>
            <div class="item-input">
                <el-input v-model.trim="versionNo" placeholder="只允许填入数字" @input="e => versionNo = validForbid(versionNo)"></el-input>
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
    props: ['appChannel', 'params'],
    data() {
        return {
            id: '',
            appChannelCode: '',//app标示码
            appChannelName: '',//app
            buttonTypeCode: '',//显示位置比标识码
            buttonTypeName: '',//显示位置
            title: '',//标题
            columnKey: '',//栏目key
            columnImage: '',//栏目图片
            isShow: '',//是否现实
            columnColor:'',//栏目标题颜色
            textExplain: '',//文字说明
            textExplainColor: '',//文字说明颜色
            sort: '',//排序
            linkUrl: '',//链接地址
            dotNumber: '',//打点编号
            remark: '',//备注
            platformCode: '',//系统标示
            platformName: '',//系统名字
            versionNo: '',//版本号
            buttonTypeOpt: [//button显示下拉列表
                {
                    label: "底部",
                    value: "bottom"
                },{
                    label: "居左",
                    value: "left"
                }
            ],
        }
    },
    mounted() {
        if(this.params) {
            this.id = this.params.id;
            this.appChannelCode = this.params.appChannelCode;
            this.appChannelName = this.params.appChannelName;
            this.buttonTypeCode = this.params.buttonTypeCode;
            this.buttonTypeName = this.params.buttonTypeName;
            this.platformCode = this.params.platformCode;
            this.platformName = this.params.platformName;
            this.versionNo = this.params.versionNo;
            this.title = this.params.title;
            this.columnKey = this.params.columnKey;
            this.columnImage = this.params.columnImage;
            this.isShow = this.params.isShow;
            this.columnColor = this.params.columnColor;
            this.textExplain = this.params.textExplain;
            this.textExplainColor = this.params.textExplainColor;
            this.sort = this.params.sort;
            this.linkUrl = this.params.linkUrl;
            this.dotNumber = this.params.dotNumber;
            this.remark = this.params.remark;
        }
    },
    methods: {
        //取消
        cancel() {
            this.id = '';
            this.appChannelCode = '';
            this.appChannelName = '';
            this.buttonTypeCode = '';
            this.buttonTypeName = '';
            this.platformCode = '';
            this.platformName = '';
            this.versionNo = '';
            this.title = '';
            this.columnKey = '';
            this.columnImage = '';
            this.isShow = '';
            this.columnColor = '';
            this.textExplain = '';
            this.textExplainColor = '';
            this.sort = '';
            this.linkUrl = '';
            this.dotNumber = '';
            this.remark = '';
            this.$emit('cancel')
        },

        //保存
        save() {
            if(this.appChannelCode && this.buttonTypeCode && this.platformCode && this.versionNo && this.title && this.columnKey && this.columnImage && this.isShow && this.columnColor && this.sort) {
                //渠道
                this.appChannel.forEach(v=> {
                    if(this.appChannelCode == v.label){
                        this.appChannelName = v.value
                    }
                })
                //渠道
                this.buttonTypeOpt.forEach(v=> {
                    if(this.buttonTypeCode == v.value){
                        this.buttonTypeName = v.label
                    }
                })
                //平台
                if(this.platformCode === 'android') {
                    this.platformName = '安卓'
                } else if(this.platformCode === 'ios') {
                    this.platformName = '苹果'
                }
                let obj = {
                    id: this.id,
                    appChannelCode: this.appChannelCode,
                    appChannelName: this.appChannelName,
                    buttonTypeCode: this.buttonTypeCode,
                    buttonTypeName: this.buttonTypeName,
                    platformCode: this.platformCode,
                    platformName: this.platformName,
                    versionNo: this.versionNo,
                    title: this.title,
                    columnKey: this.columnKey,
                    columnImage: this.columnImage,
                    isShow: this.isShow,
                    columnColor: this.columnColor,
                    textExplain: this.textExplain,
                    textExplainColor: this.textExplainColor,
                    sort: this.sort,
                    linkUrl: this.linkUrl,
                    dotNumber: this.dotNumber,
                    remark: this.remark
                }
                this.$emit('send',obj)

            } else {
                this.$alert("*号是必填项", "提交失败", {
                    confirmButtonText: "确定",
                    callback: action => {
                        this.$message({
                        type: "info",
                        message: `action: ${action}`
                        });
                    }
                });
            }
        },
        //上传图片
        uploadColumnImage(params) {
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
                    this.columnImage = this.$ImgBaseUrl + res.data
                }
            })
        },
    },
    watch: {
        'params.id'() {
            this.id = this.params.id;
            this.appChannelCode = this.params.appChannelCode;
            this.appChannelName = this.params.appChannelName;
            this.buttonTypeCode = this.params.buttonTypeCode;
            this.buttonTypeName = this.params.buttonTypeName;
            this.platformCode = this.params.platformCode;
            this.platformName = this.params.platformName;
            this.versionNo = this.params.versionNo;
            this.title = this.params.title;
            this.columnKey = this.params.columnKey;
            this.columnImage = this.params.columnImage;
            this.isShow = this.params.isShow;
            this.columnColor = this.params.columnColor;
            this.textExplain = this.params.textExplain;
            this.textExplainColor = this.params.textExplainColor;
            this.sort = this.params.sort;
            this.linkUrl = this.params.linkUrl;
            this.dotNumber = this.params.dotNumber;
            this.remark = this.params.remark;
        }
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
