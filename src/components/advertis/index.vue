<template>
    <el-card class="box-card">
        <h4 v-if="this.showType != 'VIDEO'">广告内容</h4>
        <div class="card-item">
            <span class="item-text">*选择App：</span>
            <div class="item-input">
                <el-radio-group v-model="appChannelCode">
                    <el-radio v-for="(val,ind) in appChannel" :key="ind" :label="val.label">{{val.value}}</el-radio>
                </el-radio-group>
            </div>
        </div>

        <div class="card-item">
            <span class="item-text">*名称:</span>
            <div class="item-input">
                <el-input v-model="advertisName" placeholder="请输入名称"></el-input>
            </div>
        </div>
        
        <div class="card-item">
            <span class="item-text">*类型:</span>
            <div class="item-input">
                <el-radio-group v-model="showType" :disabled="showTypeFlag">
                    <el-radio label="OPENSCREEN">开屏</el-radio>
                    <el-radio label="FLASHSCREEN">闪屏</el-radio>
                    <el-radio label="VIDEO">视频</el-radio>
                </el-radio-group>
            </div>
        </div>

        <div class="card-item" v-if="this.showType == 'OPENSCREEN'">
            <span class="item-text">*状态:</span>
            <div class="item-input">
                <el-radio-group v-model="status">
                    <el-radio label="ENABLE">启用</el-radio>
                    <el-radio label="DISABLE">停用</el-radio>
                </el-radio-group>
            </div>
        </div>

        <div class="card-item">
            <span class="item-text">*适用平台:</span>
            <div class="item-input">
                <el-radio-group v-model="platformCode">
                    <el-radio label="android" :disabled='upDataFlag'>安卓</el-radio>
                    <el-radio label="ios" :disabled='upDataFlag'>IOS</el-radio>
                </el-radio-group>
            </div>
        </div>
        <!-- 开屏 -->
        <div v-if="this.showType === 'OPENSCREEN'">
            <div class="card-img-list">
                <span class="item-text">*广告图片:</span>
                <div class="item-imgList-up">
                    <el-upload
                        class="upload-demo"
                        auto-upload
                        action="http://gateway.bicai365.com/admin/file/up/setting"
                        :headers="myHeaders"
                        :limit='6'
                        :file-list="fileList"
                        :on-success="upImg"
                        :on-remove="handleRemove"
                        :on-exceed="exceed"
                        list-type="picture">
                        <el-button>点击上传</el-button>
                    </el-upload>
                </div>
            </div>
        </div>

        <div class="card-item" v-if="this.showType === 'FLASHSCREEN' || this.showType === 'VIDEO'">
                <span class="item-text">*分辨率:</span>
                <div class="item-input">
                   <el-select v-model="resolution" clearable placeholder="请选择">
                        <el-option
                            v-for="(item,ind) in resolutionOpt"
                            :key="ind"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>

        <!-- 闪屏 -->
        <div v-if="this.showType === 'FLASHSCREEN'">
            <div class="card-item">
                <span class="item-text">*闪屏时间:</span>
                <div class="item-input-time">
                    <span>
                        <el-input v-model="displayTime" placeholder="只能输入数字"></el-input>&nbsp;&nbsp;&nbsp;毫秒
                    </span>
                </div>
            </div>
            
            <div class="card-item">
                <span class="item-text">*点击效果连接位置:</span>
                <div class="item-input">
                    <el-select v-model="productType" clearable placeholder="请选择产品类型"  @change="typeSelect(productType)">
                        <el-option
                            v-for="(item,ind) in linkLocationOpt"
                            :key="ind"
                            :label="item.linkName"
                            :value="item.linkModel">
                            <span style="float: left">{{ item.linkName }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.linkUrl }}</span>
                        </el-option>
                    </el-select>
                </div>
            </div>

            <div class="card-item" v-if="inputFlag">
                <span class="item-text">网址链接:</span>
                <div class="item-input">
                    <el-input v-model="linkUrl" placeholder="请输入产品链接"></el-input>
                </div>
            </div>

            <div class="card-item" v-else>
                <span class="item-text">关联产品:</span>
                <div class="item-input">
                    <el-select
                        v-model="linkId"
                        filterable
                        clearable
                        :disabled="productCodeFlag"
                        v-loadmore='loadmore'
                        remote
                        reserve-keyword
                        :remote-method="fuzzySearch"
                        placeholder="请选择产品名称">
                        <el-option
                            v-for="(item,ind) in productOpt"
                            :key="ind"
                            :label="item.name"
                            :value="item.id">
                            <span style="float: left">{{ item.institutionName }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.name }}</span>
                        </el-option>
                    </el-select>

                </div>
            </div>

            <div class="card-item card-img">
                <span class="item-text">*广告:</span>
                <div class="item-img">
                    <el-upload
                        class="avatar-uploader"
                        action="customize"
                        :show-file-list="false"
                        :http-request="uploadAdvertis"
                        >
                        <img v-if="flashScreenUrl" :src="ImgBaseUrl + flashScreenUrl" class="avatar">
                        <div v-else>
                            <el-button>选择图片<br/><span style="font-size:12px;color:red">不能大于2M</span><br/><span style="font-size:12px;color:red">jpg/png/gif/jpeg格式</span></el-button>
                        </div>
                    </el-upload>
                </div>
            </div>

            <div class="card-item">
                <span class="item-text">*广告开始时间:</span>
                <div class="item-input">
                    <el-date-picker
                        v-model="startTime"
                        type="datetime"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </div>
            </div>

            <div class="card-item">
                <span class="item-text">*广告结束时间:</span>
                <div class="item-input">
                    <el-date-picker
                        v-model="endTime"
                        type="datetime"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </div>
            </div>

            <h4>推广用户</h4>

            <div class="card-item">
                <span class="item-text">用户选择:</span>
                <div class="item-input">
                    <el-radio-group v-model="pushUser">
                        <el-radio label="TOTAL">发送给全部用户</el-radio>
                        <el-radio label="PORTION">发送给部分用户</el-radio>
                    </el-radio-group>
                </div>
            </div>
            <!-- 部分用户地区 -->
            <div v-if="this.pushUser === 'PORTION'">
                <h4>推广地区选择</h4>

                <div class="card-item province">
                    <span class="item-text">选择省份:</span>
                    <div class="item-input">
                        <el-select
                            v-model="provinceList"
                            multiple
                            filterable
                            allow-create
                            default-first-option
                            placeholder="请选择省份">
                            <el-option
                                v-for="item in provinceOpt"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>

                <div class="card-item area">
                    <span class="area-text">已选省份:</span>
                    <div class="area-tag">
                        <el-tag
                            v-for="(tag,ind) in provinceList"
                            :key="ind"
                            closable
                            @close="handleClose(tag)"
                            >
                            {{tag}}
                        </el-tag>
                    </div>
                </div>

            </div>
        </div>
        <!-- 视频 -->
        <div v-if="this.showType === 'VIDEO'">
            <div class="card-item card-img">
                <span class="item-text">广告:</span>
                <div class="item-img">
                    <el-upload
                        class="avatar-uploader"
                        action="customize"
                        :show-file-list="false"
                        :http-request="uploadVideo"               
                        :on-progress="uploadVideoProcess">
                        <video
                            v-if="videoUrl !='' && videoFlag == false"
                            :src="ImgBaseUrl + videoUrl"
                            width="350"
                            height="180"
                            controls="controls"
                        ></video>
                        <el-button v-else-if="videoUrl =='' && videoFlag == false">选择视频</el-button>
                        <el-progress
                            v-if="videoFlag == true"
                            type="circle"
                            :percentage="videoUploadPercent"
                            style="margin-top:30px"
                        ></el-progress>
                    </el-upload>
                </div>
            </div>

            <div class="card-item card-img">
                <span class="item-text">首帧图片:</span>
                <div class="item-img">
                    <el-upload
                        class="avatar-uploader"
                        action="customize"
                        :show-file-list="false"
                        :http-request="uploadFrame"
                        >
                        <img v-if="frameUrl" :src="ImgBaseUrl + frameUrl" class="avatar">
                        <div v-else>
                            <el-button>选择图片<br/><span style="font-size:12px;color:red">不能大于2M</span><br/><span style="font-size:12px;color:red">jpg/png/gif/jpeg格式</span></el-button>
                        </div>
                    </el-upload>
                </div>
            </div>
            
        </div>

        <div class="card-footer">
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" @click="save">保存</el-button>
        </div>
    </el-card>
</template>

<script>
import { upLoadImg, adverdis_Page_add, productUrl_list, productList } from '../../api/setting_use.js';
import { AxiosGet } from '../../sets/axiosMethods';
import { mapActions } from 'vuex';
import { filter } from 'minimatch';
var token =  localStorage.getItem('token')
export default {
    props: ['appChannel', 'params'],
    data() {
        return {
            id: '',
            productId: '',
            inputFlag: false,
            upDataFlag: false,
            modelType: 'LAUNCHPAGE',
            productCodeFlag: true,
            showTypeFlag: false,
            productForm: {
                pageSize: 200,
                pageNum: 1,
                linkLocationEnum: '',
                name: null
            },
            productPageCount:1,
            fileList: [],//开屏列表
            appChannelName: '',//渠道名称
            appChannelCode: '',//渠道标识码
            advertisName: '',//名称
            showType: '',//显示类型
            status: 'ENABLE',//状态
            platformCode: '',//平台码
            platformName: '',//平台名称
            launchAdvertisingDetails: [],//广告详情
            productType: '',//点击效果链接位置
            displayTime: '',//闪屏时间
            linkId: '',//产品标识码
            linkUrl: '',
            productName: '',//产品名称
            resolution: '',//分辨率
            flashScreenUrl: '',//开屏图片地址
            startTime: '',//广告开始时间
            endTime: '',//广告结束时间
            pushUser: 'TOTAL',//推广用户
            locationManage: [],//推广用户地区列表
            provinceList: [],//已选省份列表
            videoUrl: '',//视频地址
            frameUrl: '',//首帧图片地址
            videoFlag:false,      //刚开始的时候显示为flase
            videoUploadPercent: '0%',  //进度条刚开始的时候为0%
            launchAdvertisId: '',
            linkLocationOpt: [],//点击效果连接列表,
            productOpt: [],//产品列表
            resolutionOpt: [//分辨率下拉列表
                {
                    label: '1242_2688',
                    value: '1242_2688'
                },
                {
                    label: '1242_2208',
                    value: '1242_2208'
                },
                {
                    label: '1125_2436',
                    value: '1125_2436'
                },
                {
                    label: '828_1792',
                    value: '828_1792'
                },
                {
                    label: '750_1334',
                    value: '750_1334'
                },
                {
                    label: '640_1136',
                    value: '640_1136'
                }
            ],
            provinceOpt: [
                {
                    label: '北京',
                    value: '北京'
                },
                {
                    label: '天津',
                    value: '天津'
                },
                {
                    label: '上海',
                    value: '上海'
                },
                {
                    label: '重庆',
                    value: '重庆'
                },
                {
                    label: '河北',
                    value: '河北'
                },
                {
                    label: '山西',
                    value: '山西'
                },
                {
                    label: '辽宁',
                    value: '辽宁'
                },
                {
                    label: '吉林',
                    value: '吉林'
                },
                {
                    label: '黑龙江',
                    value: '黑龙江'
                },
                {
                    label: '江苏',
                    value: '江苏'
                },
                {
                    label: '浙江',
                    value: '浙江'
                },
                {
                    label: '安徽',
                    value: '安徽'
                },
                {
                    label: '福建',
                    value: '福建'
                },
                {
                    label: '江西',
                    value: '江西'
                },
                {
                    label: '山东',
                    value: '山东'
                },
                {
                    label: '河南',
                    value: '河南'
                },
                {
                    label: '湖北',
                    value: '湖北'
                },
                {
                    label: '湖南',
                    value: '湖南'
                },
                {
                    label: '广东',
                    value: '广东'
                },
                {
                    label: '海南',
                    value: '海南'
                },
                {
                    label: '四川',
                    value: '四川'
                },
                {
                    label: '贵州',
                    value: '贵州'
                },
                {
                    label: '云南',
                    value: '云南'
                },
                {
                    label: '陕西',
                    value: '陕西'
                },
                {
                    label: '甘肃',
                    value: '甘肃'
                },
                {
                    label: '青海',
                    value: '青海'
                },
                {
                    label: '内蒙古',
                    value: '内蒙古'
                },
                {
                    label: '广西',
                    value: '广西'
                },
                {
                    label: '西藏',
                    value: '西藏'
                },
                {
                    label: '宁夏',
                    value: '宁夏'
                },
                {
                    label: '新疆维吾尔自治区',
                    value: '新疆维吾尔自治区'
                },
                {
                    label: '香港',
                    value: '香港'
                },
                {
                    label: '澳门',
                    value: '澳门'
                },
                {
                    label: '台湾',
                    value: '台湾'
                }
            ],
            myHeaders: {Authorization:'Bearer ' + token},
            ImgBaseUrl: '',
        }
    },
    mounted() {
        this.getChannelData();
        this.ImgBaseUrl = this.$ImgBaseUrl;
        if(this.params) {
            this.upDataFlag = true;
            if(this.params.showType == 'FLASHSCREEN') {
                this.productType = this.params.productRelationDetailsVo.productType;
                if(this.params.productRelationDetailsVo != null && this.params.productRelationDetailsVo.productType != '' && this.params.productRelationDetailsVo.productType != null && this.params.productRelationDetailsVo.productType == 'EXTERNAL_LINK') {
                    this.inputFlag = true;
                } else {
                    this.inputFlag = false;
                    this.productForm.pageNum = 1;
                    this.productForm.linkLocationEnum = this.params.productRelationDetailsVo.productType;
                    this.getproList(this.productForm)
                }
                if(this.params.productRelationDetailsVo != null && this.params.productRelationDetailsVo.productType != '' && this.params.productRelationDetailsVo.productType != null) {
                    this.productCodeFlag = false;
                } else {
                    this.productCodeFlag = true;
                }
                this.linkId = this.params.productRelationDetailsVo.linkId != null && this.params.productRelationDetailsVo.linkId != '' ? this.params.productRelationDetailsVo.linkId : null;
                this.linkUrl = this.params.productRelationDetailsVo.linkUrl != null && this.params.productRelationDetailsVo.linkUrl != '' ? this.params.productRelationDetailsVo.linkUrl : null;
                this.productId = this.params.productRelationDetailsVo.id != null && this.params.productRelationDetailsVo.id != '' ? this.params.productRelationDetailsVo.id : null;
            }
            this.showTypeFlag = true;
            this.id = this.params.id;
            this.appChannelName = this.params.appChannelName;
            this.appChannelCode = this.params.appChannelCode;
            this.advertisName = this.params.advertisName;
            this.showType = this.params.showType;
            this.status = this.params.status;
            this.platformCode = this.params.platformCode;
            this.platformName = this.params.platformName;
            this.displayTime = this.params.displayTime;
            this.resolution = this.params.resolution;
            this.productName = this.params.productName;
            this.startTime = this.params.startTime;
            this.endTime = this.params.endTime;
            this.pushUser = this.params.pushUser;
            if(this.params.showType == 'FLASHSCREEN' && this.params.pushUser === 'PORTION') {
                if(this.params.locationManage.length > 0){
                    this.provinceList = [];
                    this.params.locationManage.forEach(v=> {
                        this.provinceList.push(v.province)
                    })
                }
            }
            if(this.params.launchAdvertisingDetails.length>0) {
                this.fileList = [];
                this.params.launchAdvertisingDetails.forEach(v=> {
                    if(this.showType == 'FLASHSCREEN'){
                        this.flashScreenUrl = v.advertisUrl
                    } else if (this.showType == 'OPENSCREEN') {
                        this.fileList.push({
                            url:v.advertisUrl
                        })
                    } else if (this.showType === 'VIDEO'){
                        if(v.advertisType === 'VIDEO') {
                            this.videoUrl = v.advertisUrl
                        } else if (v.advertisType === 'FIRST_IMAGE') {
                            this.frameUrl = v.advertisUrl
                        }
                    }
                })
            };
            this.launchAdvertisingDetails = this.params.launchAdvertisingDetails;
            this.locationManage = this.params.locationManage;
        } else {
            this.id = null;
        }
    },
    methods: {
        ...mapActions({
            getList: 'productUrl/getList'
        }),
        cancel() {
            this.id = null;
            this.$emit('cancel');
        },
        //选择产品类型
        getChannelData() {
            productUrl_list().then(res=> {
                if(res && res.success) {
                    this.linkLocationOpt = res.data.list.filter(v=> {
                        return v.linkUrl != '' && v.linkUrl != null;
                    });
                }
            })
        },
        loadmore() {
            if(this.productForm.pageNum < this.productPageCount) {
                this.productForm.pageNum++;
                this.getproList(this.productForm);
            }
        },
        getproList(form) {
            productList(form).then(res=> {
                if(res && res.success) {
                    this.productPageCount = res.data && Math.ceil(res.data.total/this.productForm.pageSize)
                    if(res.data && res.data.list != null && res.data.list != []) {
                        const _res = res.data.list
                        this.productOpt = [...this.productOpt,..._res]
                    }
                }
            }).catch(res=> {
                this.$message.error(`${res.message}`)
            })
        },
        fuzzySearch(query) {
            if(query!= '' && this.productType != '') {
                this.productOpt = [];
                this.productForm.name = query;
                this.productForm.linkLocationEnum = this.productType;
                this.getproList(this.productForm)
            } else {
                this.productOpt = [];
                this.productForm.name = null;
                this.productForm.linkLocationEnum = this.productType;
                this.getproList(this.productForm)
            }
        },
        typeSelect(val) {
            this.linkId = '';
            this.productForm = {
                pageSize: 200,
                pageNum: 1,
                linkLocationEnum: '',
                name: null
            }
            this.productOpt = [];
            if(this.productType !="" && this.productType != null && this.productType != 'undefined'){
                this.productCodeFlag = false;
                if(val == 'EXTERNAL_LINK') {
                    this.inputFlag = true;
                } else {
                    this.inputFlag = false;
                    this.productForm.linkLocationEnum = val;
                    this.getproList(this.productForm)
                }
            } else {
                this.productCodeFlag = true;
            }
        },
        //点击保存
        save() {
            if(this.appChannelCode && this.advertisName && this.showType && this.status && this.platformCode){
                //渠道
                this.appChannel.forEach(v=> {
                    if(this.appChannelCode == v.label){
                        this.appChannelName = v.value
                    }
                })
                //平台
                if(this.platformCode === 'android') {
                    this.platformName = '安卓'
                } else if(this.platformCode === 'ios') {
                    this.platformName = '苹果'
                }
                //产品
                if(this.productType != 'EXTERNAL_LINK' && this.linkId != '' && this.linkId != null) {
                    this.productOpt.forEach(v=> {
                        if(this.linkId == v.id){
                            this.productName = v.name
                        }
                    })
                } else {
                    this.productName = '';
                }
                if(this.showType === "OPENSCREEN") {//开屏
                    if(this.launchAdvertisingDetails.length > 0) {
                        let obj = {
                            id:this.id != '' ? this.id : null,
                            advertisName: this.advertisName,
                            appChannelCode: this.appChannelCode,
                            appChannelName: this.appChannelName,
                            platformCode: this.platformCode,
                            platformName: this.platformName,
                            showType: this.showType,
                            launchAdvertisingDetails: this.launchAdvertisingDetails,
                            productRelationDetailsVo: {},
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
                } else if(this.showType === 'FLASHSCREEN') {//闪屏
                    if(this.resolution && this.displayTime && this.productType && this.startTime && this.endTime &&this.launchAdvertisingDetails.length > 0) {
                        this.provinceList.forEach(v=> {
                            this.locationManage.push({
                                province: v,
                                modelType: 'ADVERT_START'
                            })
                        })
                        let obj = {
                            id:this.id != '' && this.id != null ? this.id : null,
                            advertisName: this.advertisName,
                            appChannelCode: this.appChannelCode,
                            appChannelName: this.appChannelName,
                            platformCode: this.platformCode,
                            platformName: this.platformName,
                            showType: this.showType,
                            resolution: this.resolution,
                            displayTime: this.displayTime,
                            productRelationDetailsVo :{
                                productType: this.productType,
                                productName: this.productName != null && this.productName != '' ? this.productName : null,
                                linkUrl: this.linkUrl != null && this.linkUrl != '' ? this.linkUrl : null,
                                linkId: this.linkId != null && this.linkId != '' ? this.linkId : null,
                                modelType: 'LAUNCHPAGE',
                                id: this.productId != null && this.productId != '' ? this.productId : null,
                            },
                            startTime: new Date(this.startTime).getTime(),
                            endTime: new Date(this.endTime).getTime(),
                            pushUser: this.pushUser,
                            launchAdvertisingDetails: this.launchAdvertisingDetails,
                            locationManage: this.locationManage
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
                }else if(this.showType === 'VIDEO') {//视频
                    if(this.launchAdvertisingDetails.length > 0 && this.resolution) {
                        let obj = {
                            id:this.id,
                            advertisName: this.advertisName,
                            appChannelCode: this.appChannelCode,
                            appChannelName: this.appChannelName,
                            platformCode: this.platformCode,
                            platformName: this.platformName,
                            showType: this.showType,
                            resolution: this.resolution,
                            launchAdvertisingDetails: this.launchAdvertisingDetails,
                            productRelationDetailsVo: {},
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
        },

        //闪屏
        //上传闪屏图片
        uploadAdvertis(params) {
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
                    this.flashScreenUrl = res.data
                    this.launchAdvertisingDetails.push({
                        advertisType: 'IMAGE',
                        advertisUrl: this.flashScreenUrl,
                    })
                }
            })
        },
        //已选中区域删除
        handleClose(tag) {
            this.provinceList.forEach((v,i) => {
                if(v === tag) {
                    this.provinceList.splice(i,1)
                }
            })
        },

        //视频

        //上传视屏
        uploadVideo(params) {
            const _file = params.file;
            const isLt5M = _file.size / 1024 / 1024 < 10;
            var formData = new FormData();
            formData.append("file", _file);
            if (!isLt5M) {
                this.$message.error("请上传10M以下的视频");
                return false;
            }
            upLoadImg(formData).then(res=> {
                if(res && res.success){
                    this.videoFlag = false;
                    this.videoUploadPercent = 0;
                    this.videoUrl = res.data
                    this.launchAdvertisingDetails.push({
                        advertisType: 'VIDEO',
                        advertisUrl: this.videoUrl,
                    })
                }
            })
        },
        //上传视频进度条
        uploadVideoProcess(event, file, fileList) {
            this.videoFlag = true;
            this.videoUploadPercent = parseInt(file.percentage);
        },
        //上传首帧图片
        uploadFrame(params) {
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
                    this.frameUrl = res.data
                    this.launchAdvertisingDetails.push({
                        advertisType: 'IMAGE',
                        advertisUrl: this.frameUrl
                    })
                }
            })
        },

        //开屏

         //点击上传 开屏图片
        upImg(res,file,fileList) {
            this.launchAdvertisingDetails.push({
                advertisType: 'IMAGE',
                advertisUrl: this.$ImgBaseUrl + file.response.data
            })
        },
        //删除开屏图片
        handleRemove(file, fileList) {
            var url = file.response ? this.$ImgBaseUrl + file.response.data : file.url
            console.log(url)
            this.launchAdvertisingDetails.forEach((v,i)=> {
                if(v.advertisUrl == url){
                    this.launchAdvertisingDetails.splice(i,1)
                }
            })
        },
        //上传超过六个
        exceed(file,fileList) {
            if(fileList.length>=6) {
                this.$message({
                    message: '最多只能上传6张哦',
                    type: 'warning'
                });
            }
        }
    },
    watch: {
        'params.id'() {
            if(this.params != null && this.params.showType == 'FLASHSCREEN') {
                this.productType = this.params.productRelationDetailsVo.productType;
                if(this.params.productRelationDetailsVo != null && this.params.productRelationDetailsVo.productType != '' && this.params.productRelationDetailsVo.productType != null && this.params.productRelationDetailsVo.productType == 'EXTERNAL_LINK') {
                    this.inputFlag = true;
                } else {
                    this.inputFlag = false;
                    this.productForm.pageNum = 1;
                    this.productForm.linkLocationEnum = this.params.productRelationDetailsVo.productType;
                    this.getproList(this.productForm)
                }
                if(this.params.productRelationDetailsVo != null && this.params.productRelationDetailsVo.productType != '' && this.params.productRelationDetailsVo.productType != null) {
                    this.productCodeFlag = false;
                } else {
                    this.productCodeFlag = true;
                }
                this.linkId = this.params.productRelationDetailsVo.linkId != null && this.params.productRelationDetailsVo.linkId != '' ? this.params.productRelationDetailsVo.linkId : null;
                this.linkUrl = this.params.productRelationDetailsVo.linkUrl != null && this.params.productRelationDetailsVo.linkUrl != '' ? this.params.productRelationDetailsVo.linkUrl : null;
                this.productId = this.params.productRelationDetailsVo.id != null && this.params.productRelationDetailsVo.id != '' ? this.params.productRelationDetailsVo.id : null;
            }
            this.showTypeFlag = true;
            if(this.params != null) {
                this.id = this.params != null && this.params.id ? this.params.id : '';
                this.appChannelName = this.params != null && this.params.appChannelName ? this.params.appChannelName : '';
                this.appChannelCode = this.params != null && this.params.appChannelCode ? this.params.appChannelCode : '';
                this.advertisName = this.params.advertisName;
                this.showType = this.params.showType;
                this.status = this.params.status;
                this.platformCode = this.params.platformCode;
                this.platformName = this.params.platformName;
                this.displayTime = this.params.displayTime;
                this.resolution = this.params.resolution;
                this.productName = this.params.productName;
                this.startTime = this.params.startTime;
                this.endTime = this.params.endTime;
                this.pushUser = this.params.pushUser;
                if(this.params.showType == 'FLASHSCREEN' && this.params.pushUser === 'PORTION') {
                    if(this.params.locationManage.length > 0){
                        this.provinceList = [];
                        this.params.locationManage.forEach(v=> {
                            this.provinceList.push(v.province)
                        })
                    }
                }
                if(this.params.launchAdvertisingDetails.length>0) {
                    this.fileList = [];
                    this.params.launchAdvertisingDetails.forEach(v=> {
                        if(this.showType == 'FLASHSCREEN'){
                            this.flashScreenUrl = v.advertisUrl
                        } else if (this.showType == 'OPENSCREEN') {
                            this.fileList.push({
                                url:v.advertisUrl
                            })
                        } else if (this.showType === 'VIDEO'){
                            if(v.advertisType === 'VIDEO') {
                                this.videoUrl = v.advertisUrl
                            } else if (v.advertisType === 'FIRST_IMAGE') {
                                this.frameUrl = v.advertisUrl
                            }
                        }
                    })
                };
                this.launchAdvertisingDetails = this.params.launchAdvertisingDetails;
                this.locationManage = this.params.locationManage;
            }
        },
    },
}
</script>

<style lang="scss">
.box-card{
    // width:70%;
    border:0;
    box-shadow:0 0 0 0 !important;
    margin:0 auto;
    overflow-x: auto;
}
h4{
    height:60px;
    line-height: 60px;
}
.card-item{
    width:100%;
    // height:60px;
    padding:4px 10px;
    box-sizing:border-box;
    display:flex;
    align-items: center;
    .item-text{
        width:200px;
        flex-shrink: 0;
    }
    .item-input{
        width:400px;
        .el-radio-group{
            white-space: nowrap;
        }
        .el-select{
            width:100%;
        }
    }
    .item-input-time{
        width:400px;
        span{
            width:100%;
            white-space: nowrap;
        }
        .el-input{
            width:85%;
        }
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
.province{
    height:auto;
}

.area{
    width:100%;
    height:auto;
    flex-direction: column;
    margin-top:10px;
    padding:5px 10px;
    box-sizing:border-box;
    align-items: flex-start;
    .area-text{
        height:40px;
        line-height: 40px;
    }
    .area-tag{
        width:100%;
        max-width: 700px;
        min-height: 200px;
        border: 1px solid #ccc;
        .el-tag{
            margin:4px;
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
.card-img-list{
    width:100%;
    height:auto;
    padding:4px 10px;
    box-sizing:border-box;
    display:flex;
    align-items: center;
    .item-text{
        width:200px;
        flex-shrink: 0;
    }
    .item-imgList-up{
        flex:1;
        .upload-demo{
            width:100%;
            text-align: center;
            .el-upload,.el-upload--picture{
                width:120px;
                text-align: center;
            }
            .el-upload-list{
                width:100%;
                display:flex;
                justify-content: space-between;
                flex-wrap: wrap;
                padding:0 5px;
                box-sizing: border-box;
                .el-upload-list__item,.is-success{
                    width:45%;
                }
            }
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

