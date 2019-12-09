<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" label-position="left" class="demo-ruleForm">
        <el-form-item v-show="this.ruleForm.showType != 'VIDEO'" label-width="0">
            <h4>广告内容</h4>
        </el-form-item>

        <el-form-item label="选择App" prop="appChannelCode">
            <el-radio-group v-model="ruleForm.appChannelCode">
            <el-radio v-for="(val,ind) in appChannel" :key="ind" :label="val.label">{{val.value}}</el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item label="名称" prop="advertisName">
            <el-input v-model="ruleForm.advertisName" placeholder="请输入名称"></el-input>
        </el-form-item>

        <el-form-item label="类型" prop="showType">
            <el-radio-group v-model="ruleForm.showType" :disabled="showTypeFlag" @change.native='showTypeChange(ruleForm.showType)'>
                <el-radio label="OPENSCREEN">开屏</el-radio>
                <el-radio label="FLASHSCREEN">闪屏</el-radio>
                <el-radio label="VIDEO">视频</el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item label="适用平台" prop="platformCode">
            <el-radio-group v-model="ruleForm.platformCode">
                <el-radio label="android" :disabled="upDataFlag">安卓</el-radio>
                <el-radio label="ios" :disabled="upDataFlag">IOS</el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item label="状态" prop="status" v-if="this.ruleForm.showType == 'OPENSCREEN'">
            <el-radio-group v-model="ruleForm.status">
                <el-radio label="ENABLE">启用</el-radio>
                <el-radio label="DISABLE">停用</el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item label="广告图片" prop="launchAdvertisingDetails" v-if="this.ruleForm.showType == 'OPENSCREEN'">
            <el-upload
                class="upload-demo"
                auto-upload
                action="https://develop-gateway.bicai365.com/admin/file/up/setting"
                :headers="myHeaders"
                :limit="6"
                :file-list="fileList"
                :on-success="upImg"
                :on-remove="handleRemove"
                :before-upload="beforeAvatarUpload"
                :on-exceed="exceed"
                list-type="picture"
            >
                <el-button>点击上传</el-button>
            </el-upload>
        </el-form-item>
        
        <el-form-item label="分辨率" prop="resolution" v-if="this.ruleForm.showType === 'FLASHSCREEN' || this.ruleForm.showType === 'VIDEO'">
            <el-select filterable v-model="ruleForm.resolution" clearable placeholder="请选择">
            <el-option
                v-for="(item,ind) in resolutionOpt"
                :key="ind"
                :label="item.label"
                :value="item.value"
            ></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="闪屏时间" prop="displayTime" v-if="this.ruleForm.showType === 'FLASHSCREEN'">
            <el-input v-model="ruleForm.displayTime" placeholder="只能输入数字"><template slot="append">毫秒</template></el-input>
        </el-form-item>

        <el-form-item label="点击效果连接位置" prop="productType" v-if="this.ruleForm.showType === 'FLASHSCREEN'">
            <el-select
                filterable
                v-model="ruleForm.productType"
                clearable
                placeholder="请选择产品类型"
                @change="typeSelect(ruleForm.productType)"
            >
                <el-option
                v-for="(item,ind) in linkLocationOpt"
                :key="ind"
                :label="item.linkName"
                :value="item.linkModel"
                >
                <span style="float: left">{{ item.linkName }}</span>
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="网址链接" prop="linkUrl" v-if="this.ruleForm.showType === 'FLASHSCREEN' && this.inputFlag">
            <el-input v-model="ruleForm.linkUrl" placeholder="请输入产品链接"></el-input>
        </el-form-item>

        <el-form-item label="关联产品" prop="linkId" v-else-if="this.ruleForm.showType === 'FLASHSCREEN'">
            <el-select
                filterable
                v-model="ruleForm.linkId"
                clearable
                :disabled="productCodeFlag"
                v-loadmore="loadmore"
                remote
                reserve-keyword
                :remote-method="fuzzySearch"
                placeholder="请选择产品名称"
            >
                <el-option
                v-for="(item,ind) in productOpt"
                :key="ind"
                :label="item.name"
                :value="item.id"
                >
                <span style="float: left">{{ item.institutionName }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.name }}</span>
                </el-option>
            </el-select>
        </el-form-item>
    
        <el-form-item label="广告" prop="flashScreenUrl" v-if="this.ruleForm.showType === 'FLASHSCREEN'">
            <el-upload
                class="avatar-uploader"
                action="customize"
                :show-file-list="false"
                :http-request="uploadAdvertis"
                v-loading="advertisLoading"
            >
                <img v-if="ruleForm.flashScreenUrl" :src="ImgBaseUrl + ruleForm.flashScreenUrl" class="avatar" />
                <div v-else>
                <el-button>
                    选择图片
                    <br />
                    <span style="font-size:12px;color:red">不能大于2M</span>
                    <br />
                    <span style="font-size:12px;color:red">jpg/png/gif/jpeg格式</span>
                </el-button>
                </div>
            </el-upload>
        </el-form-item>
        
        <el-form-item label="广告开始时间" prop="startTime" v-if="this.ruleForm.showType === 'FLASHSCREEN'">
            <el-date-picker v-model="ruleForm.startTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        
        <el-form-item label="广告结束时间" prop="endTime" v-if="this.ruleForm.showType === 'FLASHSCREEN'">
            <el-date-picker v-model="ruleForm.endTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>

        <el-form-item v-show="this.ruleForm.showType === 'FLASHSCREEN'" label-width="0">
            <h4>推广用户</h4>
        </el-form-item>

        <el-form-item label="用户选择" prop="pushUser" v-if="this.ruleForm.showType === 'FLASHSCREEN'">
            <el-radio-group v-model="ruleForm.pushUser">
                <el-radio label="TOTAL">发送给全部用户</el-radio>
                <el-radio label="PORTION">发送给部分用户</el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item v-show="this.ruleForm.showType === 'FLASHSCREEN' && this.ruleForm.pushUser == 'PORTION'" label-width="0">
            <h4>推广地区选择</h4>
        </el-form-item>

        <el-form-item label="选择省份" prop="provinceList" v-if="this.ruleForm.showType === 'FLASHSCREEN' && this.ruleForm.pushUser === 'PORTION'">
            <el-select
                filterable
                v-model="ruleForm.provinceList"
                multiple
                allow-create
                default-first-option
                placeholder="请选择省份"
            >
                <el-option
                v-for="(item,ind) in provinceOpt"
                :key="ind"
                :label="item.label"
                :value="item.value"
                ></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="广告" prop="videoUrl" v-if="this.ruleForm.showType === 'VIDEO'">
            <el-upload
                class="avatar-uploader"
                action="customize"
                :show-file-list="false"
                :http-request="uploadVideo"
                v-loading="videoLoading"
            >
                <video
                v-if="ruleForm.videoUrl !==''"
                :src="ImgBaseUrl + ruleForm.videoUrl"
                width="350"
                height="180"
                controls="controls"
                ></video>
                <el-button v-else-if="ruleForm.videoUrl ==''">选择视频</el-button>
            </el-upload>
        </el-form-item>

        <el-form-item label="首帧图片" prop="frameUrl" v-if="this.ruleForm.showType === 'VIDEO'">
            <el-upload
                class="avatar-uploader"
                action="customize"
                :show-file-list="false"
                :http-request="uploadFrame"
                v-loading="frameLoading"
            >
                <img v-if="ruleForm.frameUrl" :src="ImgBaseUrl + ruleForm.frameUrl" class="avatar" />
                <el-button v-else>
                    选择图片
                    <br />
                    <span style="font-size:12px;color:red">不能大于2M</span>
                    <br />
                    <span style="font-size:12px;color:red">jpg/png/gif/jpeg格式</span>
                </el-button>
            </el-upload>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="save('ruleForm')">保存</el-button>
            <el-button @click="cancel('ruleForm')">取消</el-button>
        </el-form-item>
    
    </el-form>
</template>

<script>
import {
  upLoadImg,
  productUrl_list,
  productList,
  bigFileUpload
} from "../../api/setting_use.js";
import { mapActions } from "vuex";
var token = sessionStorage.getItem("token");
export default {
  props: ["appChannel", "params", "dialogFormVisible"],
  data() {
    return {
        ruleForm: {
            appChannelCode: "", //渠道标识码
            advertisName: "", //名称
            showType: null, //显示类型
            platformCode: "", //平台码
            status: "ENABLE", //状态
            resolution: "", //分辨率
            displayTime: "", //闪屏时间
            productType: "", //点击效果链接位置
            launchAdvertisingDetails: [], //广告详情
            linkId: "", //产品标识码
            linkUrl: "",
            flashScreenUrl: "", //开屏图片地址
            startTime: "", //广告开始时间
            endTime: "", //广告结束时间
            pushUser: "TOTAL", //推广用户
            provinceList: [], //已选省份列表
            videoUrl: "", //视频地址
            frameUrl: "", //首帧图片地址
        },
        fileList: [],
        rules: {
            appChannelCode: [{ required: true, message: '请选择App', trigger: 'blur' }],
            advertisName: [{ required: true, message: '请填写名称', trigger: 'blur' }],
            showType: [{ required: true, message: '请选择类型', trigger: 'blur' }],
            platformCode: [{ required: true, message: '请选择适用平台', trigger: 'blur' }],
            status: [{ required: true, message: '请选择状态', trigger: 'blur' }],
            launchAdvertisingDetails: [{ required: true, message: '请上传开屏图片', trigger: 'change' }],
            resolution: [{ required: true, message: '请选择分辨率', trigger: 'change' }],
            displayTime: [{ required: true, message: '请输入闪屏时间', trigger: 'blur' }],
            productType: [{required: true, message: '请选择效果链接位置', trigger: 'blur'}],
            linkUrl: [{required: true, message: '请填写天传地址', trigger: 'blur'}],
            flashScreenUrl: [{required: true, message: '请上传图片', trigger: 'blur'}],
            startTime: [{required: true, message: '请选择时间', trigger: 'blur'}],
            endTime: [{required: true, message: '请选择时间', trigger: 'blur'}],
            pushUser: [{required: true, message: '请选择推广用户', trigger: 'change'}],
            // provinceList: [{required: true, message: '请选择省份', trigger: 'change'}],
            videoUrl: [{required: true, message: '请上传视频', trigger: 'change'}],
            frameUrl: [{required: true, message: '请上传图片', trigger: 'change'}]
        },
      id: "",
      productId: "",
      inputFlag: false,
      upDataFlag: false,
      modelType: "LAUNCHPAGE",
      productCodeFlag: true,
      showTypeFlag: false,
      advertisLoading: false, //闪屏上传loading开关
      videoLoading: false,
      frameLoading: false,
      productForm: {
        pageSize: 200,
        pageNum: 1,
        linkModel: "",
        name: null
      },
      productPageCount: 1,
      appChannelName: "", //渠道名称
      platformName: "", //平台名称
      
      productName: "", //产品名称
      locationManage: [], //推广用户地区列表
      launchAdvertisId: "",
      linkLocationOpt: [], //点击效果连接列表,
      productOpt: [], //产品列表
      resolutionOpt: [
        //分辨率下拉列表
        {
          label: "1242*2688",
          value: "1242*2688"
        },
        {
          label: "1242*2208",
          value: "1242*2208"
        },
        {
          label: "1125*2436",
          value: "1125*2436"
        },
        {
          label: "828*1792",
          value: "828*1792"
        },
        {
          label: "750*1334",
          value: "750*1334"
        },
        {
          label: "640*1136",
          value: "640*1136"
        }
      ],
      provinceOpt: [
        {
          label: "北京",
          value: "北京"
        },
        {
          label: "天津",
          value: "天津"
        },
        {
          label: "上海",
          value: "上海"
        },
        {
          label: "重庆",
          value: "重庆"
        },
        {
          label: "河北",
          value: "河北"
        },
        {
          label: "山西",
          value: "山西"
        },
        {
          label: "辽宁",
          value: "辽宁"
        },
        {
          label: "吉林",
          value: "吉林"
        },
        {
          label: "黑龙江",
          value: "黑龙江"
        },
        {
          label: "江苏",
          value: "江苏"
        },
        {
          label: "浙江",
          value: "浙江"
        },
        {
          label: "安徽",
          value: "安徽"
        },
        {
          label: "福建",
          value: "福建"
        },
        {
          label: "江西",
          value: "江西"
        },
        {
          label: "山东",
          value: "山东"
        },
        {
          label: "河南",
          value: "河南"
        },
        {
          label: "湖北",
          value: "湖北"
        },
        {
          label: "湖南",
          value: "湖南"
        },
        {
          label: "广东",
          value: "广东"
        },
        {
          label: "海南",
          value: "海南"
        },
        {
          label: "四川",
          value: "四川"
        },
        {
          label: "贵州",
          value: "贵州"
        },
        {
          label: "云南",
          value: "云南"
        },
        {
          label: "陕西",
          value: "陕西"
        },
        {
          label: "甘肃",
          value: "甘肃"
        },
        {
          label: "青海",
          value: "青海"
        },
        {
          label: "内蒙古",
          value: "内蒙古"
        },
        {
          label: "广西",
          value: "广西"
        },
        {
          label: "西藏",
          value: "西藏"
        },
        {
          label: "宁夏",
          value: "宁夏"
        },
        {
          label: "新疆维吾尔自治区",
          value: "新疆维吾尔自治区"
        },
        {
          label: "香港",
          value: "香港"
        },
        {
          label: "澳门",
          value: "澳门"
        },
        {
          label: "台湾",
          value: "台湾"
        }
      ],
      myHeaders: { Authorization: "Bearer " + token },
      ImgBaseUrl: ""
    };
  },
  mounted() {
    this.getChannelData();
    this.ImgBaseUrl = this.$ImgBaseUrl;
    if (this.params != null && this.dialogFormVisible) {
      this.upDataFlag = true;
      if (this.params.showType == "FLASHSCREEN") {
        this.ruleForm.productType = this.params.productRelationDetailsVo.productType;
        if (
          this.params.productRelationDetailsVo != null &&
          this.params.productRelationDetailsVo.productType != "" &&
          this.params.productRelationDetailsVo.productType != null &&
          this.params.productRelationDetailsVo.productType == "EXTERNAL_LINK"
        ) {
          this.inputFlag = true;
        } else {
          this.inputFlag = false;
          this.productForm.pageNum = 1;
          this.productForm.linkModel = this.params.productRelationDetailsVo.productType;
          this.getproList(this.productForm);
        }
        if (
          this.params.productRelationDetailsVo != null &&
          this.params.productRelationDetailsVo.productType != "" &&
          this.params.productRelationDetailsVo.productType != null
        ) {
          this.productCodeFlag = false;
        } else {
          this.productCodeFlag = true;
        }
        this.ruleForm.linkId =
          this.params.productRelationDetailsVo.linkId != null &&
          this.params.productRelationDetailsVo.linkId != ""
            ? this.params.productRelationDetailsVo.linkId
            : null;
        this.ruleForm.linkUrl =
          this.params.productRelationDetailsVo.linkUrl != null &&
          this.params.productRelationDetailsVo.linkUrl != ""
            ? this.params.productRelationDetailsVo.linkUrl
            : null;
        this.productId =
          this.params.productRelationDetailsVo.id != null &&
          this.params.productRelationDetailsVo.id != ""
            ? this.params.productRelationDetailsVo.id
            : null;
      }
      this.showTypeFlag = true;
      this.id = this.params.id;
      this.appChannelName = this.params.appChannelName;
      this.ruleForm.appChannelCode = this.params.appChannelCode;
      this.ruleForm.advertisName = this.params.advertisName;
      this.ruleForm.showType = this.params.showType;
      this.ruleForm.status = this.params.status;
      this.ruleForm.platformCode = this.params.platformCode;
      this.platformName = this.params.platformName;
      this.ruleForm.displayTime = this.params.displayTime;
      this.ruleForm.resolution = this.params.resolution;
      this.productName = this.params.productName;
      this.ruleForm.startTime = this.params.startTime;
      this.ruleForm.endTime = this.params.endTime;
      this.ruleForm.pushUser = this.params.pushUser;
      if (
        this.params.showType == "FLASHSCREEN" &&
        this.params.pushUser === "PORTION"
      ) {
        if (this.params.locationManage.length > 0) {
          this.ruleForm.provinceList = [];
          this.params.locationManage.forEach(v => {
            this.ruleForm.provinceList.push(v.province);
          });
        } else {
          this.ruleForm.provinceList = [];
        }
      } else {
        this.ruleForm.provinceList = [];
      }
      if (this.params.launchAdvertisingDetails.length > 0) {
        this.fileList = [];
        this.params.launchAdvertisingDetails.forEach(v => {
          if (this.ruleForm.showType == "FLASHSCREEN") {
            this.ruleForm.flashScreenUrl = v.advertisUrl;
          } else if (this.ruleForm.showType == "OPENSCREEN") {
            this.fileList.push({
              url: this.$ImgBaseUrl + v.advertisUrl
            });
          } else if (this.ruleForm.showType === "VIDEO") {
            if (v.advertisType === "VIDEO") {
              this.ruleForm.videoUrl = v.advertisUrl;
            } else if (v.advertisType === "FIRST_IMAGE") {
              this.ruleForm.frameUrl = v.advertisUrl;
            } else {
              this.ruleForm.frameUrl = "";
            }
          }
        });
      } else {
        this.fileList = [];
      }
      this.ruleForm.launchAdvertisingDetails = this.params.launchAdvertisingDetails;
      this.locationManage = this.params.locationManage;
    } else {
      this.id = null;
    }
  },
  methods: {
    ...mapActions({
      getList: "productUrl/getList"
    }),
    cancel(formName) {
        this.id = null;
        this.$emit("cancel");
        this.id = null;
        this.fileList = [];
        this.appChannelName = "";
        this.platformName = "";
        this.productName = "";
        this.locationManage = [];
        this.launchAdvertisId = "";
        this.linkLocationOpt = [];
        this.productOpt = [];
        this.$nextTick(() => {
            this.$refs[formName].resetFields();
        });
    },
    //选择产品类型
    getChannelData() {
      productUrl_list().then(res => {
        if (res && res.success) {
          this.linkLocationOpt = res.data.list.filter(v => {
            return v.linkUrl != "" && v.linkUrl != null;
          });
        }
      });
    },
    loadmore() {
      if (this.productForm.pageNum < this.productPageCount) {
        this.productForm.pageNum++;
        this.getproList(this.productForm);
      }
    },
    getproList(form) {
      productList(form).then(res => {
        if (res && res.success) {
          this.productPageCount =
            res.data && Math.ceil(res.data.total / this.productForm.pageSize);
          if (res.data && res.data.list != null && res.data.list != []) {
            const _res = res.data.list;
            this.productOpt = [...this.productOpt, ..._res];
          }
        }
      });
    },
    fuzzySearch(query) {
      if (query != "" && this.ruleForm.productType != "") {
        this.productOpt = [];
        this.productForm.linkName = query;
        this.productForm.linkModel = this.ruleForm.productType;
        this.getproList(this.productForm);
      } else {
        this.productOpt = [];
        this.productForm.linkName = null;
        this.productForm.linkModel = this.ruleForm.productType;
        this.getproList(this.productForm);
      }
    },
    typeSelect(val) {
      this.ruleForm.linkId = "";
      this.productForm = {
        pageSize: 200,
        pageNum: 1,
        linkModel: "",
        name: null
      };
      this.productOpt = [];
      if ( this.ruleForm.productType != "" && this.ruleForm.productType != null && this.ruleForm.productType != "undefined" ) {
        this.productCodeFlag = false;
        if (val == "EXTERNAL_LINK") {
          this.inputFlag = true;
        } else {
          this.inputFlag = false;
          this.productForm.linkModel = val;
          this.ruleForm.linkUrl = "";
          this.getproList(this.productForm);
        }
      } else {
        this.productCodeFlag = true;
      }
    },
    showTypeChange() {
        this.$refs.ruleForm.clearValidate();
    },
    //点击保存
    save(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
            //渠道
                this.appChannel.forEach(v => {
                    if (this.ruleForm.appChannelCode == v.label) {
                        this.appChannelName = v.value;
                    }
                });
                //平台
                if (this.ruleForm.platformCode === "android") {
                    this.platformName = "安卓";
                } else if (this.ruleForm.platformCode === "ios") {
                    this.platformName = "苹果";
                }
                //产品
                if ( this.ruleForm.productType != "EXTERNAL_LINK" && this.ruleForm.linkId != "" && this.ruleForm.linkId != null ) {
                    this.productOpt.forEach(v => {
                        if (this.ruleForm.linkId == v.id) {
                            this.productName = v.name;
                        }
                    });
                } else {
                    this.productName = "";
                }

                if (this.ruleForm.showType === "OPENSCREEN") {
                    let obj = {
                        id: this.id != "" ? this.id : null,
                        advertisName: this.ruleForm.advertisName,
                        appChannelCode: this.ruleForm.appChannelCode,
                        appChannelName: this.appChannelName,
                        platformCode: this.ruleForm.platformCode,
                        platformName: this.platformName,
                        showType: this.ruleForm.showType,
                        launchAdvertisingDetails: this.ruleForm.launchAdvertisingDetails,
                        productRelationDetailsVo: {}
                    };
                    this.$emit("send", obj);
                } else if(this.ruleForm.showType === "FLASHSCREEN" ) {
                    if (this.ruleForm.pushUser == "PORTION") {
                        this.locationManage = [];
                        this.ruleForm.provinceList.forEach(v => {
                            this.locationManage.push({
                                province: v,
                                modelType: "ADVERT_START"
                            });
                        });
                    } else {
                        this.locationManage = [];
                    }
                    let obj = {
                        id: this.id != "" && this.id != null ? this.id : null,
                        advertisName: this.ruleForm.advertisName,
                        appChannelCode: this.ruleForm.appChannelCode,
                        appChannelName: this.appChannelName,
                        platformCode: this.ruleForm.platformCode,
                        platformName: this.platformName,
                        showType: this.ruleForm.showType,
                        resolution: this.ruleForm.resolution,
                        displayTime: this.ruleForm.displayTime,
                        productRelationDetailsVo: {
                            productType: this.ruleForm.productType,
                            productName: this.productName != null && this.productName != "" ? this.productName : null,
                            linkUrl: this.ruleForm.linkUrl != null && this.ruleForm.linkUrl != "" ? this.ruleForm.linkUrl : null,
                            linkId: this.ruleForm.linkId != null && this.ruleForm.linkId != "" ? this.ruleForm.linkId : null,
                            modelType: "LAUNCHPAGE",
                            id: this.productId != null && this.productId != "" ? this.productId : null
                        },
                        startTime: new Date(this.ruleForm.startTime).getTime(),
                        endTime: new Date(this.ruleForm.endTime).getTime(),
                        pushUser: this.ruleForm.pushUser,
                        launchAdvertisingDetails: this.ruleForm.launchAdvertisingDetails,
                        locationManage: this.locationManage
                        };
                    this.$emit("send", obj);
                } else if (this.ruleForm.showType === "VIDEO") {
                    let obj = {
                        id: this.id,
                        advertisName: this.ruleForm.advertisName,
                        appChannelCode: this.ruleForm.appChannelCode,
                        appChannelName: this.appChannelName,
                        platformCode: this.ruleForm.platformCode,
                        platformName: this.platformName,
                        showType: this.ruleForm.showType,
                        resolution: this.ruleForm.resolution,
                        launchAdvertisingDetails: this.ruleForm.launchAdvertisingDetails,
                        productRelationDetailsVo: {}
                    };
                    this.$emit("send", obj);
                }
            } else {
                this.$message.error("保存失败")
                return false;
            }
        });
    },

    //闪屏
    //上传闪屏图片
    uploadAdvertis(params) {
      const _file = params.file;
      const isLt2M = _file.size / 1024 / 1024 < 2;
      const idJPG =
        _file.type === "image/jpeg" ||
        _file.type === "image/gif" ||
        _file.type === "image/png" ||
        _file.type === "image/jpg";
      var formData = new FormData();
      formData.append("file", _file);
      if (!idJPG) {
        this.$message.error("只能上传jpg/png/gif/jpeg格式的图片");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("请上传2M以下的图片");
        return false;
      }
      this.advertisLoading = true;
      upLoadImg(formData).then(res => {
        if (res.success) {
          this.advertisLoading = false;
          this.ruleForm.launchAdvertisingDetails = [];
          this.ruleForm.flashScreenUrl = res.data;
          this.ruleForm.launchAdvertisingDetails.push({
            advertisType: "IMAGE",
            advertisUrl: this.ruleForm.flashScreenUrl
          });
        }
      });
    },
    //已选中区域删除
    handleClose(tag) {
      this.ruleForm.provinceList.forEach((v, i) => {
        if (v === tag) {
          this.ruleForm.provinceList.splice(i, 1);
        }
      });
    },

    //视频

    //上传视屏
    uploadVideo(params) {
      this.ruleForm.launchAdvertisingDetails = this.ruleForm.launchAdvertisingDetails.filter(
        (v, i) => {
          return v.advertisType != "VIDEO";
        }
      );
      console.log(this.ruleForm.launchAdvertisingDetails, "946");
      const _file = params.file;
      const isLt5M = _file.size / 1024 / 1024 < 10;
      var formData = new FormData();
      formData.append("file", _file);
      if (!isLt5M) {
        this.$message.error("请上传10M以下的视频");
        return false;
      }
      this.videoLoading = true;
      bigFileUpload(formData).then(res => {
        if (res && res.success) {
          this.videoLoading = false;
          this.ruleForm.videoUrl = res.data;

          this.ruleForm.launchAdvertisingDetails.push({
            advertisType: "VIDEO",
            advertisUrl: this.ruleForm.videoUrl
          });
        }
      });
    },
    //上传首帧图片
    uploadFrame(params) {
      const _file = params.file;
      const isLt2M = _file.size / 1024 / 1024 < 2;
      const idJPG =
        _file.type === "image/jpeg" ||
        _file.type === "image/gif" ||
        _file.type === "image/png" ||
        _file.type === "image/jpg";
      var formData = new FormData();
      formData.append("file", _file);
      if (!idJPG) {
        this.$message.error("只能上传jpg/png/gif/jpeg格式的图片");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("请上传2M以下的图片");
        return false;
      }
      this.frameLoading = true;
      upLoadImg(formData).then(res => {
        if (res && res.success) {
          this.frameLoading = false;
          this.ruleForm.frameUrl = res.data;
          this.ruleForm.launchAdvertisingDetails = this.ruleForm.launchAdvertisingDetails.filter(
            (v, i) => {
              return v.advertisType != "FIRST_IMAGE";
            }
          );
          this.ruleForm.launchAdvertisingDetails.push({
            advertisType: "FIRST_IMAGE",
            advertisUrl: this.ruleForm.frameUrl
          });
        }
      });
    },

    //开屏
    //上传限制
    beforeAvatarUpload(_file) {
      const isLt2M = _file.size / 1024 / 1024 < 2;
      const idJPG =
        _file.type === "image/jpeg" ||
        _file.type === "image/gif" ||
        _file.type === "image/png" ||
        _file.type === "image/jpg";
      if (!idJPG) {
        this.$message.error("只能上传jpg/png/gif/jpeg格式的图片");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("请上传2M以下的图片");
        return false;
      }
    },
    //点击上传 开屏图片
    upImg(res, file) {
      this.ruleForm.launchAdvertisingDetails.push({
        advertisType: "IMAGE",
        advertisUrl: file.response.data
      });
    },
    //删除开屏图片
    handleRemove(file) {
      var url = file.response
        ? this.$ImgBaseUrl + file.response.data
        : file.url;
      this.ruleForm.launchAdvertisingDetails.forEach((v, i) => {
        if (this.$ImgBaseUrl + v.advertisUrl == url) {
          this.ruleForm.launchAdvertisingDetails.splice(i, 1);
        }
      });
    },
    //上传超过六个
    exceed(file, fileList) {
      if (fileList.length >= 6) {
        this.$message({
          message: "最多只能上传6张哦",
          type: "warning"
        });
      }
    }
  },
  watch: {
    dialogFormVisible() {
      this.getChannelData();
      if (
        this.dialogFormVisible &&
        this.params != null &&
        this.params.showType == "FLASHSCREEN"
      ) {
        this.ruleForm.productType = this.params.productRelationDetailsVo.productType;
        if (
          this.params.productRelationDetailsVo != null &&
          this.params.productRelationDetailsVo.productType != "" &&
          this.params.productRelationDetailsVo.productType != null &&
          this.params.productRelationDetailsVo.productType == "EXTERNAL_LINK"
        ) {
          this.inputFlag = true;
        } else {
          this.inputFlag = false;
          this.productForm.pageNum = 1;
          this.productForm.linkModel = this.params.productRelationDetailsVo.productType;
          this.getproList(this.productForm);
        }
        if (
          this.params.productRelationDetailsVo != null &&
          this.params.productRelationDetailsVo.productType != "" &&
          this.params.productRelationDetailsVo.productType != null
        ) {
          this.productCodeFlag = false;
        } else {
          this.productCodeFlag = true;
        }
        this.ruleForm.linkId =
          this.params.productRelationDetailsVo.linkId != null &&
          this.params.productRelationDetailsVo.linkId != ""
            ? this.params.productRelationDetailsVo.linkId
            : null;
        this.ruleForm.linkUrl =
          this.params.productRelationDetailsVo.linkUrl != null &&
          this.params.productRelationDetailsVo.linkUrl != ""
            ? this.params.productRelationDetailsVo.linkUrl
            : null;
        this.productId =
          this.params.productRelationDetailsVo.id != null &&
          this.params.productRelationDetailsVo.id != ""
            ? this.params.productRelationDetailsVo.id
            : null;
      }
      this.showTypeFlag = true;
      if (this.params != null && this.dialogFormVisible) {
        this.id = this.params != null && this.params.id ? this.params.id : "";
        this.appChannelName =
          this.params != null && this.params.appChannelName
            ? this.params.appChannelName
            : "";
        this.ruleForm.appChannelCode =
          this.params != null && this.params.appChannelCode
            ? this.params.appChannelCode
            : "";
        this.ruleForm.advertisName = this.params.advertisName;
        this.ruleForm.showType = this.params.showType;
        this.ruleForm.status = this.params.status;
        this.ruleForm.platformCode = this.params.platformCode;
        this.platformName = this.params.platformName;
        this.ruleForm.displayTime = this.params.displayTime;
        this.ruleForm.resolution = this.params.resolution;
        this.productName = this.params.productName;
        this.ruleForm.startTime = this.params.startTime;
        this.ruleForm.endTime = this.params.endTime;
        this.ruleForm.pushUser = this.params.pushUser;

        if (
          this.params.showType == "FLASHSCREEN" &&
          this.params.pushUser === "PORTION"
        ) {
          if (this.params.locationManage.length > 0) {
            this.ruleForm.provinceList = [];
            this.params.locationManage.forEach(v => {
              this.ruleForm.provinceList.push(v.province);
            });
          } else {
            this.ruleForm.provinceList = [];
          }
        }
        if (
          this.params.launchAdvertisingDetails &&
          this.params.launchAdvertisingDetails.length > 0
        ) {
          this.fileList = [];
          this.params.launchAdvertisingDetails.forEach(v => {
            if (this.ruleForm.showType == "FLASHSCREEN") {
              this.ruleForm.flashScreenUrl = v.advertisUrl;
            } else if (this.ruleForm.showType == "OPENSCREEN") {
              this.fileList.push({
                url: this.$ImgBaseUrl + v.advertisUrl
              });
            } else if (this.ruleForm.showType === "VIDEO") {
              if (v.advertisType === "VIDEO") {
                this.ruleForm.videoUrl = v.advertisUrl;
              } else if (v.advertisType === "FIRST_IMAGE") {
                this.ruleForm.frameUrl = v.advertisUrl;
              } else {
                this.ruleForm.frameUrl = "";
              }
            }
          });
        } else {
          this.fileList = [];
        }
        this.ruleForm.launchAdvertisingDetails = this.params.launchAdvertisingDetails;
        this.locationManage = this.params.locationManage;
      } else {
        this.cancel("rouleFOrm")
      }
    }
  }
};
</script>

<style lang="scss">

h4 {
  height: 60px;
  line-height: 60px;
}
</style>

