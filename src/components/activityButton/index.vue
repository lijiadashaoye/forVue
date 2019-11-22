<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="120px"
    label-position="right"
    label-suffix=":"
  >
    <el-form-item label="APP标识" prop="appChannelCode">
      <el-select
        filterable
        v-model="ruleForm.appChannelCode"
        placeholder="请选择APP"
        style="width:100%;"
      >
        <el-option v-for="(item,ind) in AppOpt" :key="ind" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="活动编号" prop="activityNumber">
      <el-input v-model.number="ruleForm.activityNumber" style="width:100%" placeholder="只能输入数字"></el-input>
    </el-form-item>

    <el-form-item label="活动名称" prop="activityName">
      <el-select
        filterable
        v-model="ruleForm.activityName"
        style="width:100%"
        placeholder="请选择活动名称"
      >
        <el-option
          v-for="(item,ind) in activityOpt"
          :key="ind"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="显示类型" prop="showTypeCode">
      <el-select
        filterable
        v-model="ruleForm.showTypeCode"
        style="width:100%"
        placeholder="请选择显示类型"
      >
        <el-option
          v-for="(item,ind) in showTypeOpt"
          :key="ind"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <div style="display:flex;flex-wrap:wrap;">
      <el-form-item label="按钮图片" prop="buttonImage" style="width:50%">
        <el-upload
          class="avatar-uploader"
          action="customize"
          :show-file-list="false"
          :http-request="uploadbuttonImage"
          v-loading="butttonImageLoading"
          style="width:100%"
        >
          <img v-if="ruleForm.buttonImage" :src="ImgBaseUrl + ruleForm.buttonImage" class="avatar" />
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

      <el-form-item label="收缩后按钮图片" prop="shrinkImage" style="width:50%">
        <el-upload
          class="avatar-uploader"
          action="customize"
          :show-file-list="false"
          :http-request="uploadshrinkImage"
          v-loading="shrinkImageLoading"
        >
          <img v-if="ruleForm.shrinkImage" :src="ImgBaseUrl + ruleForm.shrinkImage" class="avatar" />
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

      <el-form-item label="浮动图片" prop="floatImage" style="width:50%">
        <el-upload
          class="avatar-uploader"
          action="customize"
          :show-file-list="false"
          :http-request="uploadfloatImage"
          v-loading="floatImageLoading"
        >
          <img v-if="ruleForm.floatImage" :src="ImgBaseUrl + ruleForm.floatImage" class="avatar" />
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

      <el-form-item label="按钮标题图片" prop="buttonTitleImage" style="width:50%">
        <el-upload
          class="avatar-uploader"
          action="customize"
          :show-file-list="false"
          :http-request="uploadbuttonTitleImage"
          v-loading="buttonTitLoading"
        >
          <img
            v-if="ruleForm.buttonTitleImage"
            :src="ImgBaseUrl + ruleForm.buttonTitleImage"
            class="avatar"
          />
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
    </div>
    <el-form-item label="平台" prop="platformCode">
      <el-radio-group v-model="ruleForm.platformCode">
        <el-radio :label="'ios'">苹果</el-radio>
        <el-radio :label="'android'">安卓</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="按钮文字" prop="buttonText">
      <el-input v-model.trim="ruleForm.buttonText" placeholder="请输入按钮名称"></el-input>
    </el-form-item>

    <el-form-item label="文字颜色" prop="textColor">
      <el-color-picker v-model="ruleForm.textColor"></el-color-picker>
    </el-form-item>

    <el-form-item label="显示顺序" prop="sort">
      <el-input v-model.number="ruleForm.sort" placeholder="请输入数字"></el-input>
    </el-form-item>

    <el-form-item label="活动标题" prop="activityTitle">
      <el-input v-model.trim="ruleForm.activityTitle" placeholder="请输入活动标题"></el-input>
    </el-form-item>

    <el-form-item label="活动说明" prop="activityExplain">
      <el-input
        v-model.trim="ruleForm.activityExplain"
        type="textarea"
        :autosize="{ minRows: 6, maxRows: 6}"
        placeholder="请输入活动标题"
      ></el-input>
    </el-form-item>

    <el-form-item label="链接地址" prop="linkUrl">
      <el-input v-model.trim="ruleForm.linkUrl" placeholder="请输入链接地址"></el-input>
    </el-form-item>

    <el-form-item label="开奖时间" prop="lotteryTime">
      <el-date-picker v-model="ruleForm.lotteryTime" type="datetime" placeholder="选择开奖时间"></el-date-picker>
    </el-form-item>

    <div class="bottomBtn">
      <el-button type="primary" @click="save('ruleForm')">保存</el-button>
      <el-button @click="cancel('ruleForm')">取消</el-button>
    </div>
  </el-form>
</template>

<script>
import { upLoadImg, activity_list } from "../../api/setting_use.js";
export default {
  name: "activityButton",
  props: ["opts"],
  data() {
    return {
      butttonImageLoading: false,
      shrinkImageLoading: false,
      floatImageLoading: false,
      buttonTitLoading: false,
      ruleForm: {
        appChannelCode: "", //app名字标识 !!!
        activityNumber: "", //活动编号 !!!
        activityName: "", //活动名称 !!!
        showTypeCode: "", //显示类型code !!!
        buttonImage: "",
        shrinkImage: "", //选中后后按钮图片
        floatImage: "", //浮动照片 !!!
        buttonTitleImage: "", //按钮标题照片
        platformCode: "", //平台标识 !!!
        buttonText: "", //按钮文字 !!!
        textColor: "#0015ff", //文字颜色 !!!
        sort: "", //排序 !!!
        activityTitle: "", //活动标题 !!!
        activityExplain: "", //活动说明 !!!
        linkUrl: "", //链接地址 !!!
        lotteryTime: "" //开奖时间 !!!
      },
      rules: {
        appChannelCode: [
          { required: true, message: "请选择App名称", trigger: "blur" }
        ],
        activityNumber: [
          { required: true, message: "请输入活动编号", trigger: "blur" },
          {
            pattern: /^\+?[1-9]\d*$/,
            message: "只能输入大于0的正整数",
            trigger: "blur"
          }
        ],
        activityName: [
          { required: true, message: "请选择活动名称", trigger: "blur" }
        ],
        showTypeCode: [
          { required: true, message: "请选择显示类型", trigger: "blur" }
        ],
        buttonImage: [
          { required: true, message: "请上传图片", trigger: "submit" }
        ],
        floatImage: [
          { required: true, message: "请上传图片", trigger: "submit" }
        ],
        platformCode: [
          { required: true, message: "请选择系统平台", trigger: "submit" }
        ],
        buttonText: [
          { required: true, message: "请输入按钮文字", trigger: "blur" }
        ],
        textColor: [
          { required: true, message: "请选择文字颜色", trigger: "blur" }
        ],
        activityTitle: [
          { required: true, message: "请输入活动标题", trigger: "blur" }
        ],
        activityExplain: [
          { required: true, message: "请输入活动说明", trigger: "blur" }
        ],
        linkUrl: [
          { required: true, message: "请输入链接地址", trigger: "blur" }
        ],
        lotteryTime: [
          { required: true, message: "请选择开奖时间", trigger: "blur" }
        ]
      },
      activityOpt: [], //活动列表
      showTypeName: "", //显示类型名称 !!!...
      appChannelName: "", //app名称 !!!...
      platformName: "", //平台名称 !!!...
      ImgBaseUrl: "",
      showTypeOpt: [
        //显示类型列表
        {
          label: "顶部显示",
          value: "top"
        },
        {
          label: "底部显示",
          value: "bottom"
        },
        {
          label: "仅浮动和底部显示",
          value: "float_bottom"
        },
        {
          label: "仅浮动显示",
          value: "float"
        }
      ],
      AppOpt: [
        //app下拉列表数据
        {
          label: "比财APP",
          value: "bicai"
        },
        {
          label: "拼财APP",
          value: "pincai"
        }
      ]
    };
  },
  mounted() {
    this.ImgBaseUrl = this.$ImgBaseUrl;
    //活动名称列表
    activity_list().then(res => {
      this.activityOpt = res.data.list.map(v => {
        return { value: v.activityName, label: v.activityName };
      });
    });
    if (this.opts) {
      this.ruleForm.activityName = this.opts.activityName;
      this.ruleForm.activityNumber = this.opts.activityNumber;
      this.ruleForm.appChannelCode = this.opts.appChannelCode;
      this.ruleForm.showTypeCode = this.opts.showTypeCode;
      this.showTypeName = this.opts.showTypeName;
      this.ruleForm.buttonImage = this.opts.buttonImage;
      this.ruleForm.shrinkImage = this.opts.shrinkImage;
      this.ruleForm.floatImage = this.opts.floatImage;
      this.ruleForm.buttonTitleImage = this.opts.buttonTitleImage;
      this.ruleForm.platformCode = this.opts.platformCode;
      this.platformName = this.opts.platformName;
      this.ruleForm.buttonText = this.opts.buttonText;
      this.ruleForm.textColor = this.opts.textColor;
      this.ruleForm.sort = this.opts.sort;
      this.ruleForm.activityTitle = this.opts.activityTitle;
      this.ruleForm.activityExplain = this.opts.activityExplain;
      this.ruleForm.linkUrl = this.opts.linkUrl;
      this.ruleForm.lotteryTime = new Date(this.opts.lotteryTime);
    }
  },
  methods: {
    //上传按钮图片
    uploadbuttonImage(params) {
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
      this.butttonImageLoading = true;
      upLoadImg(formData).then(res => {
        if (res && res.success) {
          this.butttonImageLoading = false;
          this.ruleForm.buttonImage = res.data;
        }
      });
    },
    //上传选中后得按钮图片
    uploadshrinkImage(params) {
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
      this.shrinkImageLoading = true;
      upLoadImg(formData).then(res => {
        if (res && res.success) {
          this.shrinkImageLoading = false;
          this.ruleForm.shrinkImage = res.data;
        }
      });
    },
    //上传浮动照片
    uploadfloatImage(params) {
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
      this.floatImageLoading = true;
      upLoadImg(formData).then(res => {
        if (res && res.success) {
          this.floatImageLoading = false;
          this.ruleForm.floatImage = res.data;
        }
      });
    },
    //上传按钮标题照片
    uploadbuttonTitleImage(params) {
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
      this.buttonTitLoading = true;
      upLoadImg(formData).then(res => {
        if (res && res.success) {
          this.buttonTitLoading = false;
          this.ruleForm.buttonTitleImage = res.data;
        }
      });
    },
    //点击取消
    cancel(formName) {
      this.$refs[formName].resetFields();
      this.showTypeName = "";
      this.platformName = "";
      this.appChannelName = "";
      this.$emit("cancel");
    },
    //点击保存
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //取到showTypeName
          this.showTypeOpt.forEach(v => {
            if (this.ruleForm.showTypeCode == v.value) {
              this.showTypeName = v.label;
            }
          });
          //取appChannelName
          this.AppOpt.forEach(v => {
            if (this.ruleForm.appChannelCode == v.value) {
              this.appChannelName = v.label;
            }
          });
          //取platformName
          if (this.ruleForm.platformCode == "ios") {
            this.platformName = "苹果";
          } else if (this.ruleForm.platformCode == "android") {
            this.platformName = "安卓";
          }
          let obj = {
            id: this.opts ? this.opts.id : "",
            activityName: this.ruleForm.activityName,
            activityNumber: this.ruleForm.activityNumber,
            appChannelCode: this.ruleForm.appChannelCode,
            appChannelName: this.appChannelName,
            showTypeCode: this.ruleForm.showTypeCode,
            showTypeName: this.showTypeName,
            buttonImage: this.ruleForm.buttonImage,
            shrinkImage: this.ruleForm.shrinkImage,
            floatImage: this.ruleForm.floatImage,
            buttonTitleImage: this.ruleForm.buttonTitleImage,
            platformCode: this.ruleForm.platformCode,
            platformName: this.platformName,
            buttonText: this.ruleForm.buttonText,
            textColor: this.ruleForm.textColor,
            sort: this.ruleForm.sort,
            activityTitle: this.ruleForm.activityTitle,
            activityExplain: this.ruleForm.activityExplain,
            linkUrl: this.ruleForm.linkUrl,
            lotteryTime: this.ruleForm.lotteryTime.getTime()
          };
          this.$emit("send", obj);
        } else {
          return false;
        }
      });
    }
  },
  watch: {
    "opts.id"() {
      this.ruleForm.activityName = this.opts.activityName;
      this.ruleForm.activityNumber = this.opts.activityNumber;
      this.ruleForm.appChannelCode = this.opts.appChannelCode;
      this.ruleForm.showTypeCode = this.opts.showTypeCode;
      this.showTypeName = this.opts.showTypeName;
      this.ruleForm.buttonImage = this.opts.buttonImage;
      this.ruleForm.shrinkImage = this.opts.shrinkImage;
      this.ruleForm.floatImage = this.opts.floatImage;
      this.ruleForm.buttonTitleImage = this.opts.buttonTitleImage;
      this.ruleForm.platformCode = this.opts.platformCode;
      this.platformName = this.opts.platformName;
      this.ruleForm.buttonText = this.opts.buttonText;
      this.ruleForm.textColor = this.opts.textColor;
      this.ruleForm.sort = this.opts.sort;
      this.ruleForm.activityTitle = this.opts.activityTitle;
      this.ruleForm.activityExplain = this.opts.activityExplain;
      this.ruleForm.linkUrl = this.opts.linkUrl;
      this.ruleForm.lotteryTime = new Date(this.opts.lotteryTime);
    }
  }
};
</script>
