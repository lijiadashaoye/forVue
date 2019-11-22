<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="140px"
    label-position="left"
  >
    <el-form-item label="APP标识:" prop="appChannelCode">
      <el-select
        style="width:100%;"
        filterable
        v-model="ruleForm.appChannelCode"
        placeholder="请选择APP"
        @change="appSelect(ruleForm.appChannelCode)"
      >
        <el-option v-for="(item,ind) in AppOpt" :key="ind" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="显示类型:" prop="buttonTypeCode">
      <el-select
        filterable
        v-model="ruleForm.buttonTypeCode"
        placeholder="请选择显示类型"
        style="width:100%;"
      >
        <el-option
          v-for="(item,ind) in buttonTypeOpt"
          :key="ind"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="选中按钮图片:" prop="buttonSelectedIcon">
      <el-upload
        class="avatar-uploader"
        action="customize"
        :show-file-list="false"
        :http-request="uploadCheckImg"
        v-loading="CheckImgLoading"
      >
        <img
          v-if="ruleForm.buttonSelectedIcon"
          :src="ImgBaseUrl + ruleForm.buttonSelectedIcon"
          class="avatar"
          style="width:100%;
        height: auto;"
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

    <el-form-item label="未选中按钮图片:" prop="buttonUnselectedIcon">
      <el-upload
        class="avatar-uploader"
        action="customize"
        :show-file-list="false"
        :http-request="uploadUnCheckImg"
        v-loading="unCheckImgLoading"
      >
        <img
          v-if="ruleForm.buttonUnselectedIcon"
          :src="ImgBaseUrl + ruleForm.buttonUnselectedIcon"
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

    <el-form-item label="按钮名称:" prop="buttonText">
      <el-input v-model="ruleForm.buttonText" placeholder="请输入按钮名称"></el-input>
    </el-form-item>

    <div style="display:flex;">
      <el-form-item label="未选中文字颜色:" prop="buttonUnselectedTextColor" style="width:50%;">
        <el-color-picker v-model="ruleForm.buttonUnselectedTextColor"></el-color-picker>
      </el-form-item>

      <el-form-item label="选中后文字颜色:" prop="buttonSelectedTextColor" style="width:50%;">
        <el-color-picker v-model="ruleForm.buttonSelectedTextColor"></el-color-picker>
      </el-form-item>
    </div>

    <el-form-item label="平台:" prop="platformCode" v-if="platformFlag">
      <el-radio-group v-model="ruleForm.platformCode" :disabled="upData">
        <el-radio :label="'ios'">苹果</el-radio>
        <el-radio :label="'android'">安卓</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="按钮key:" prop="buttonKey">
      <el-input v-model="ruleForm.buttonKey" placeholder="请输入按钮key，例如：排行榜phb"></el-input>
    </el-form-item>

    <el-form-item label="显示顺序:" prop="sort">
      <el-input-number v-model="ruleForm.sort" controls-position="right" :min="1" :max="5"></el-input-number>
    </el-form-item>

    <el-form-item label="版本号:" prop="versionNo">
      <el-input v-model="ruleForm.versionNo" placeholder="请输入版本号，只能输入正整数"></el-input>
    </el-form-item>

   <div class="bottomBtn">
      <el-button type="primary" @click="save('ruleForm')">保存</el-button>
      <el-button @click="cancel('ruleForm')">取消</el-button>
    </div>
  </el-form>
</template>

<script>
import { upLoadImg } from "../../api/setting_use.js";
export default {
  name: "addButtonLeft",
  props: ["opts", "isWxFlag", "upData"],
  data() {
    return {
      CheckImgLoading: false,
      unCheckImgLoading: false,
      ruleForm: {
        appChannelCode: "", //app名字标识
        buttonTypeCode: "", //button显示标识
        buttonSelectedIcon: "", //选中的图片
        buttonUnselectedIcon: "", //未选中的图片
        buttonText: "", //按钮名称
        buttonUnselectedTextColor: "#409EFF", //未选中的字体颜色
        buttonSelectedTextColor: "#409EFF", //选中的颜色
        platformCode: "", //平台
        buttonKey: "", //按钮索引标识
        sort: "", //显示顺序
        versionNo: "" //版本号
      },
      rules: {
        appChannelCode: [
          { required: true, message: "请选择App", trigger: "blur" }
        ],
        buttonTypeCode: [
          { required: true, message: "请选择显示类型", trigger: "blur" }
        ],
        buttonSelectedIcon: [
          { required: true, message: "请上传图片", trigger: "blur" }
        ],
        buttonUnselectedIcon: [
          { required: true, message: "请上传图片", trigger: "blur" }
        ],
        buttonText: [
          { required: true, message: "请输入按钮名称", trigger: "blur" }
        ],
        buttonUnselectedTextColor: [
          { required: true, message: "请选择颜色", trigger: "blur" }
        ],
        buttonSelectedTextColor: [
          { required: true, message: "请选择颜色", trigger: "blur" }
        ],
        platformCode: [
          { required: true, message: "请选择平台", trigger: "blur" }
        ],
        buttonKey: [
          { required: true, message: "请输入按钮key", trigger: "blur" }
        ],
        sort: [{ required: true, message: "请输入显示顺序", trigger: "blur" }],
        versionNo: [
          { required: true, message: "请输入版本号", trigger: "blur" },
          {
            pattern: /^\+?[1-9]\d*$/,
            message: "只能输入大于0的正整数",
            trigger: "blur"
          }
        ]
      },
      platformName: "", //平台名称
      platformFlag: true, //平台是否可选
      appChannelName: "", //app名称
      AppOpt: [
        //app下拉列表数据
        {
          label: "比财APP",
          value: "bicai"
        },
        {
          label: "拼财APP",
          value: "pincai"
        },
        {
          label: "拼财小程序",
          value: "pincaiwx"
        }
      ],
      buttonTypeName: "", //button类型名称
      buttonTypeOpt: [
        //button显示下拉列表
        {
          label: "顶部菜单显示",
          value: "top"
        },
        {
          label: "底部菜单显示",
          value: "bottom"
        },
        {
          label: "知道ICON按钮",
          value: "know"
        }
      ],
      ImgBaseUrl: ""
    };
  },
  mounted() {
    this.ImgBaseUrl = this.$ImgBaseUrl;
    //修改时传入当前要修改得值
    if (this.opts) {
      this.platformFlag = this.isWxFlag;
      this.ruleForm.appChannelCode = this.opts.appChannelCode;
      this.ruleForm.buttonKey = this.opts.buttonKey;
      this.ruleForm.buttonSelectedIcon = this.opts.buttonSelectedIcon;
      this.ruleForm.buttonUnselectedIcon = this.opts.buttonUnselectedIcon;
      this.ruleForm.buttonTypeCode = this.opts.buttonTypeCode;
      this.ruleForm.platformCode = this.opts.platformCode;
      this.ruleForm.versionNo = this.opts.versionNo;
      this.ruleForm.sort = this.opts.sort;
      this.ruleForm.buttonSelectedTextColor = this.opts.buttonSelectedTextColor;
      this.ruleForm.buttonUnselectedTextColor = this.opts.buttonUnselectedTextColor;
      this.ruleForm.buttonText = this.opts.buttonText;
    }
  },
  methods: {
    //选择app渠道
    appSelect(val) {
      if (val == "pincaiwx") {
        this.platformFlag = false;
      } else {
        this.platformFlag = true;
      }
    },
    //上传未选中的照片
    uploadUnCheckImg(params) {
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
      this.unCheckImgLoading = true;
      upLoadImg(formData).then(res => {
        this.unCheckImgLoading = false;
        if (res && res.success) {
          this.ruleForm.buttonUnselectedIcon = res.data;
        }
      });
    },

    //上传选中的图片
    uploadCheckImg(params) {
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
      this.CheckImgLoading = true;
      upLoadImg(formData).then(res => {
        if (res.success) {
          this.CheckImgLoading = false;
          this.ruleForm.buttonSelectedIcon = res.data;
        }
      });
    },
    cancel(formName) {
      this.$refs[formName].resetFields();
      this.$emit("cancel");
    },

    //点击保存
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (this.ruleForm.appChannelCode == "pincaiwx") {
          this.ruleForm.platformCode = "pincaiwx";
        }
        if (valid) {
          //取到选中的appChannelname
          this.AppOpt.forEach(v => {
            if (this.ruleForm.appChannelCode == v.value) {
              this.appChannelName = v.label;
            }
          });
          //渠道选中的buttonTupeName
          this.buttonTypeOpt.forEach(v => {
            if (this.ruleForm.buttonTypeCode == v.value) {
              this.buttonTypeName = v.label;
            }
          });
          if (this.ruleForm.platformCode == "ios") {
            this.platformName = "苹果";
          } else if (this.ruleForm.platformCode == "android") {
            this.platformName = "安卓";
          } else {
            this.ruleForm.platformCode = "pincaiwx";
          }
          let obj = {
            id: this.opts ? this.opts.id : null,
            buttonKey: this.ruleForm.buttonKey,
            appChannelCode: this.ruleForm.appChannelCode,
            appChannelName: this.appChannelName,
            buttonTypeCode: this.ruleForm.buttonTypeCode,
            buttonTypeName: this.buttonTypeName,
            platformCode: this.ruleForm.platformCode,
            platformName: this.platformName,
            versionNo: Number(this.ruleForm.versionNo),
            buttonSelectedIcon: this.ruleForm.buttonSelectedIcon,
            buttonUnselectedIcon: this.ruleForm.buttonUnselectedIcon,
            buttonText: this.ruleForm.buttonText,
            buttonSelectedTextColor: this.ruleForm.buttonSelectedTextColor,
            buttonUnselectedTextColor: this.ruleForm.buttonUnselectedTextColor,
            sort: this.ruleForm.sort
          };
          this.$emit("send", obj);
        } else {
          return false;
        }
      });
    }
  },
  watch: {
    //监听传入opts  id  变化
    "opts.id"() {
      this.platformFlag = this.isWxFlag;
      this.ruleForm.appChannelCode = this.opts.appChannelCode;
      this.ruleForm.buttonKey = this.opts.buttonKey;
      this.ruleForm.buttonSelectedIcon = this.opts.buttonSelectedIcon;
      this.ruleForm.buttonUnselectedIcon = this.opts.buttonUnselectedIcon;
      this.ruleForm.buttonTypeCode = this.opts.buttonTypeCode;
      this.ruleForm.platformCode = this.opts.platformCode;
      this.ruleForm.versionNo = this.opts.versionNo;
      this.ruleForm.sort = this.opts.sort;
      this.ruleForm.buttonSelectedTextColor = this.opts.buttonSelectedTextColor;
      this.ruleForm.buttonUnselectedTextColor = this.opts.buttonUnselectedTextColor;
      this.ruleForm.buttonText = this.opts.buttonText;
    }
  }
};
</script>
