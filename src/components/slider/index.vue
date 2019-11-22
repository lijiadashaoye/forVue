<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="140px"
    label-position="left"
  >
    <el-form-item label="APP标识:" prop="appChannelCode">
      <el-radio-group v-model="ruleForm.appChannelCode">
        <el-radio v-for="(val,ind) in appChannel" :key="ind" :label="val.label">{{val.value}}</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="栏目标题:" prop="title">
      <el-input v-model.trim="ruleForm.title" placeholder="请输入标题"></el-input>
    </el-form-item>

    <el-form-item label="栏目key:" prop="columnKey">
      <el-input
        v-model.trim="ruleForm.columnKey"
        placeholder="请输入唯一key"
        @input="e => ruleForm.columnKey = validForbid(ruleForm.columnKey)"
      ></el-input>
    </el-form-item>

    <el-form-item label="栏目图片:" prop="columnImage" style="height:auto">
      <el-upload
        class="avatar-uploader"
        action="customize"
        :show-file-list="false"
        :http-request="uploadColumnImage"
        v-loading="columnImageLoading"
      >
        <img v-if="ruleForm.columnImage" :src="ImgBaseUrl + ruleForm.columnImage" class="avatar" />
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

    <el-form-item label="是否显示:" prop="isShow">
      <el-radio-group v-model="ruleForm.isShow">
        <el-radio :label="'SHOW'">显示</el-radio>
        <el-radio :label="'HIDE'">不显示</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="显示类型:" prop="buttonTypeCode">
      <el-select filterable v-model="ruleForm.buttonTypeCode" placeholder="请选择显示类型">
        <el-option
          v-for="(item,ind) in buttonTypeOpt"
          :key="ind"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="栏目标题颜色:" prop="columnColor">
      <el-color-picker v-model="ruleForm.columnColor"></el-color-picker>
    </el-form-item>

    <el-form-item label="文字说明:" prop="textExplain">
      <el-input v-model.trim="ruleForm.textExplain" placeholder="请输入说明"></el-input>
    </el-form-item>

    <el-form-item label="文字说明颜色:" prop="textExplainColor">
      <el-color-picker v-model="ruleForm.textExplainColor"></el-color-picker>
    </el-form-item>

    <el-form-item label="排序值:" prop="sort">
      <el-input
        v-model.trim="ruleForm.sort"
        placeholder="只允许填入数字"
        @input="e => ruleForm.sort = validForbid(ruleForm.sort)"
      ></el-input>
    </el-form-item>

    <el-form-item label="链接地址:" prop="linkUrl">
      <el-input v-model.trim="ruleForm.linkUrl" placeholder="请输入链接地址"></el-input>
    </el-form-item>

    <el-form-item label="打点编号:" prop="dotNumber">
      <el-input
        v-model.trim="ruleForm.dotNumber"
        placeholder="请输入打点编号"
        @input="e => ruleForm.dotNumber = validForbid(ruleForm.dotNumber)"
      ></el-input>
    </el-form-item>

    <el-form-item label="备注:" prop="remark">
      <el-input
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 5}"
        placeholder="请输入内容"
        v-model="ruleForm.remark"
      ></el-input>
    </el-form-item>

    <el-form-item label="系统:" prop="platformCode">
      <el-radio-group v-model="ruleForm.platformCode">
        <el-radio :label="'ios'">苹果</el-radio>
        <el-radio :label="'android'">安卓</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="版本号:" prop="versionNo">
      <el-input
        v-model.trim="ruleForm.versionNo"
        placeholder="只允许填入数字"
        @input="e => ruleForm.versionNo = validForbid(ruleForm.versionNo)"
      ></el-input>
    </el-form-item>

    <div style="text-align:center">
      <el-button type="primary" @click="save('ruleForm')">保存</el-button>
      <el-button @click="cancel('ruleForm')">取消</el-button>
    </div>
  </el-form>
</template>

<script>
import { upLoadImg } from "../../api/setting_use.js";

export default {
  props: ["appChannel", "params", "dialogFormVisible"],
  data() {
    return {
      columnImageLoading: false,
      ruleForm: {
        appChannelCode: "", //app标示码
        buttonTypeCode: "", //显示位置比标识码
        title: "", //标题
        columnKey: "", //栏目key
        columnImage: "", //栏目图片
        isShow: "", //是否现实
        columnColor: "", //栏目标题颜色
        textExplain: "", //文字说明
        textExplainColor: "#333", //文字说明颜色
        sort: "", //排序
        linkUrl: "", //链接地址
        dotNumber: "", //打点编号
        remark: "", //备注
        platformCode: "", //系统标示
        versionNo: "" //版本号
      },
      rules: {
        appChannelCode: [
          { required: true, message: "请选择APP", trigger: "blur" }
        ],
        buttonTypeCode: [
          { required: true, message: "请选择显示类型", trigger: "blur" }
        ],
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        columnKey: [
          { required: true, message: "请输入栏目key", trigger: "blur" }
        ],
        columnImage: [
          { required: true, message: "请选择栏目图片", trigger: "blur" }
        ],
        isShow: [{ required: true, message: "请选择", trigger: "blur" }],
        columnColor: [
          { required: true, message: "请选择颜色", trigger: "blur" }
        ],
        sort: [
          { required: true, message: "请输入排序值", trigger: "blur" },
          {
            pattern: /^\+?[1-9]\d*$/,
            message: "只能输入大于0的正整数",
            trigger: "blur"
          }
        ],
        platformCode: [
          { required: true, message: "请选择系统", trigger: "blur" }
        ],
        versionNo: [
          { required: true, message: "请输入版本号", trigger: "blur" }
        ]
      },
      id: "",
      appChannelName: "", //app
      buttonTypeName: "", //显示位置
      platformName: "", //系统名字
      buttonTypeOpt: [
        //button显示下拉列表
        {
          label: "底部",
          value: "bottom"
        },
        {
          label: "居左",
          value: "left"
        }
      ],
      ImgBaseUrl: ""
    };
  },
  mounted() {
    this.ImgBaseUrl = this.$ImgBaseUrl;
    if (this.params) {
      this.id = this.params.id ? this.params.id : null;
      this.ruleForm.appChannelCode = this.params.appChannelCode;
      this.appChannelName = this.params.appChannelName;
      this.ruleForm.buttonTypeCode = this.params.buttonTypeCode;
      this.buttonTypeName = this.params.buttonTypeName;
      this.ruleForm.platformCode = this.params.platformCode;
      this.platformName = this.params.platformName;
      this.ruleForm.versionNo = this.params.versionNo;
      this.ruleForm.title = this.params.title;
      this.ruleForm.columnKey = this.params.columnKey;
      this.ruleForm.columnImage = this.params.columnImage;
      this.ruleForm.isShow = this.params.isShow;
      this.ruleForm.columnColor = this.params.columnColor;
      this.ruleForm.textExplain = this.params.textExplain;
      this.ruleForm.textExplainColor = this.params.textExplainColor
        ? this.params.textExplainColor
        : "#333";
      this.ruleForm.sort = this.params.sort;
      this.ruleForm.linkUrl = this.params.linkUrl;
      this.ruleForm.dotNumber = this.params.dotNumber;
      this.ruleForm.remark = this.params.remark;
    }
  },
  methods: {
    //取消
    cancel(formName) {
      this.$refs[formName].resetFields();
      this.$emit("cancel");
    },

    //保存
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.appChannel.forEach(v => {
            if (this.ruleForm.appChannelCode == v.label) {
              this.appChannelName = v.value;
            }
          });
          //渠道
          this.buttonTypeOpt.forEach(v => {
            if (this.ruleForm.buttonTypeCode == v.value) {
              this.buttonTypeName = v.label;
            }
          });
          //平台
          if (this.ruleForm.platformCode === "android") {
            this.platformName = "安卓";
          } else if (this.ruleForm.platformCode === "ios") {
            this.platformName = "苹果";
          }
          let obj = {
            id: this.id,
            appChannelCode: this.ruleForm.appChannelCode,
            appChannelName: this.appChannelName,
            buttonTypeCode: this.ruleForm.buttonTypeCode,
            buttonTypeName: this.buttonTypeName,
            platformCode: this.ruleForm.platformCode,
            platformName: this.platformName,
            versionNo: this.ruleForm.versionNo,
            title: this.ruleForm.title,
            columnKey: this.ruleForm.columnKey,
            columnImage: this.ruleForm.columnImage,
            isShow: this.ruleForm.isShow,
            columnColor: this.ruleForm.columnColor,
            textExplain: this.ruleForm.textExplain,
            textExplainColor: this.ruleForm.textExplainColor
              ? this.ruleForm.textExplainColor
              : "#333",
            sort: this.ruleForm.sort,
            linkUrl: this.ruleForm.linkUrl,
            dotNumber: this.ruleForm.dotNumber,
            remark: this.ruleForm.remark
          };
          this.$emit("send", obj);
        } else {
          return false;
        }
      });
    },
    //上传图片
    uploadColumnImage(params) {
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
      this.columnImageLoading = true;
      upLoadImg(formData).then(res => {
        if (res && res.success) {
          this.columnImageLoading = false;
          this.ruleForm.columnImage = res.data;
        }
      });
    }
  },
  watch: {
    dialogFormVisible() {
      if (this.dialogFormVisible) {
        this.id = this.params.id ? this.params.id : null;
        this.ruleForm.appChannelCode = this.params.appChannelCode;
        this.appChannelName = this.params.appChannelName;
        this.ruleForm.buttonTypeCode = this.params.buttonTypeCode;
        this.buttonTypeName = this.params.buttonTypeName;
        this.ruleForm.platformCode = this.params.platformCode;
        this.platformName = this.params.platformName;
        this.ruleForm.versionNo = this.params.versionNo;
        this.ruleForm.title = this.params.title;
        this.ruleForm.columnKey = this.params.columnKey;
        this.ruleForm.columnImage = this.params.columnImage;
        this.ruleForm.isShow = this.params.isShow;
        this.ruleForm.columnColor = this.params.columnColor;
        this.ruleForm.textExplain = this.params.textExplain;
        this.ruleForm.textExplainColor = this.params.textExplainColor
          ? this.params.textExplainColor
          : "#333";
        this.ruleForm.sort = this.params.sort;
        this.ruleForm.linkUrl = this.params.linkUrl;
        this.ruleForm.dotNumber = this.params.dotNumber;
        this.ruleForm.remark = this.params.remark;
      } else {
        this.cancel("ruleForm");
      }
    }
  }
};
</script>

<style lang='scss' scoped>
img {
  width: 100%;
  height: auto;
}
</style>
