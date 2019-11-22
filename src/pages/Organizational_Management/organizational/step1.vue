<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
    </div>
    <div id="forTable">
      <el-form
        ref="ruleForm"
        size="normal"
        :model="ruleForm"
        label-width="150px"
        label-suffix=":"
        class="isForm"
        :rules="rules"
      >
        <el-form-item prop="name" label="机构名称" style="position:relative" class="isWith">
          <el-input clearable placeholder="请输入" v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="所属省市" style="margin-bottom:5px;" prop="locationId">
          <el-cascader
            v-model="ruleForm.locationId"
            :options="dictData.quyu"
            :props="{ expandTrigger: 'hover'}"
          ></el-cascader>
        </el-form-item>

        <el-form-item prop="type" label="银行类型" style="position:relative" class="isWith">
          <el-select filterable clearable placeholder="请选择" v-model="ruleForm.type">
            <el-option
              size="mini"
              v-for="item in dictData.bank_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="资产规模(亿)" prop="aum">
          <el-input type="number" clearable placeholder="请输入" v-model="ruleForm.aum"></el-input>
        </el-form-item>

        <el-form-item prop="parentId" label="隶属机构" style="position:relative" class="isWith">
          <el-select filterable clearable placeholder="请选择" v-model="ruleForm.parentId">
            <el-option
              size="mini"
              v-for="item in dictData.paren"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="热线电话" prop="hotLine">
          <el-input clearable placeholder="请输入" v-model="ruleForm.hotLine"></el-input>
        </el-form-item>

        <el-form-item label="银行logo" class="forLogo" v-if="this.hasImg" prop="logo">
          <div style="width:100px;">
            <imgUpload :datas="hasImg.logoUrl" @selectImg="getImg('logoUrl',$event)" />
          </div>
        </el-form-item>

        <el-form-item label="背景图" class="forLogo" v-if="this.hasImg">
          <div style="width:100px;">
            <imgUpload :datas="hasImg.backUrl" @selectImg="getImg('backUrl',$event)" />
          </div>
        </el-form-item>

        <el-form-item label="半圆背景图" class="forLogo" v-if="this.hasImg">
          <div style="width:100px;">
            <imgUpload :datas="hasImg.banyuanUrl" @selectImg="getImg('banyuanUrl',$event)" />
          </div>
        </el-form-item>
        <el-form-item label="文字商标" class="forLogo" v-if="this.hasImg">
          <div style="width:100px;">
            <imgUpload :datas="hasImg.shangbiao" @selectImg="getImg('shangbiao',$event)" />
          </div>
        </el-form-item>

        <el-form-item label="版本标识" prop="version">
          <el-input clearable placeholder="请输入" v-model="ruleForm.version"></el-input>
        </el-form-item>

        <el-form-item label="银行星级" prop="star">
          <el-select filterable v-model="ruleForm.star" clearable placeholder="请选择">
            <el-option
              size="mini"
              v-for="item in dictData.institution_star"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="维护时间">
          <el-time-picker value-format="HH:mm:ss" v-model="ruleForm.weihu[0]" placeholder="选择时间范围"></el-time-picker>&nbsp;~
          <el-time-picker value-format="HH:mm:ss" v-model="ruleForm.weihu[1]" placeholder="选择时间范围"></el-time-picker>
        </el-form-item>

        <el-form-item label="客服服务时间">
          <el-time-picker
            value-format="HH:mm:ss"
            v-model="ruleForm.serviceTime[0]"
            placeholder="选择时间范围"
          ></el-time-picker>&nbsp;~
          <el-time-picker
            value-format="HH:mm:ss"
            v-model="ruleForm.serviceTime[1]"
            placeholder="选择时间范围"
          ></el-time-picker>
        </el-form-item>

        <el-form-item label="星级评定描述" style="text-align:left;width:100%;" prop="starRatingDesc">
          <editor-bar v-model="ruleForm.starRatingDesc" :url="'admin/file/up/product'"></editor-bar>
        </el-form-item>

        <el-form-item label="银行描述" style="text-align:left;width:100%;" prop="description">
          <editor-bar v-model="ruleForm.description" :url="'admin/file/up/product'"></editor-bar>
        </el-form-item>

        <el-form-item label="银行简介" prop="synopsis" style="text-align:left;width:100%">
          <el-input clearable placeholder="请输入" type="textarea" v-model="ruleForm.synopsis"></el-input>
        </el-form-item>
      </el-form>
      <div class="nextButtons">
        <el-button size="mini" type="primary" @click="next">下一步</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button size="mini" type="info" @click="back">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import imgUpload from "@/components/upImg.vue";
import EditorBar from "@/components/wangEnduit";

export default {
  components: { imgUpload, EditorBar },
  data() {
    // 验证资产规模
    var checkNum = (rule, value, callback) => {
      if (value < 0) {
        callback(new Error("请输入正数"));
      } else if (("" + value).length > 19 || ("" + value).length <= 0) {
        callback(new Error("请输入1-19字符"));
      } else {
        callback();
      }
    };
    return {
      env: null,
      pageName: "", // 当前页面名字
      dictData: {}, // 字典数据
      hasImg: null, // 如果有图片数据，要显示出来
      ruleForm: {
        name: "", //  机构名称
        locationId: [], // 所属省/直辖市ID
        type: "", //  银行类型
        aum: "0", // 资产规模
        parentId: "", // 隶属机构ID
        hotLine: "", // 热线电话
        logo: "",
        star: "", // 星级
        starRatingDesc: "", // 星级评定描述
        description: "", // 银行描述
        backgroundImage: "", // 背景图
        semicircleBackgroundImage: "", // 半圆背景图
        textLogo: "", // 文字商标
        weihu: [],
        serviceTime: [], // 客服服务时间
        version: "", //版本标识
        synopsis: "" // 银行简介
      },

      //表单验证
      rules: {
        name: [
          { min: 1, max: 50, message: "最多输入50个字", trigger: "blur" },
          { required: true, message: "请选择机构名称", trigger: "blur" }
        ],
        synopsis: [
          { min: 1, max: 200, message: "最多输入200个字", trigger: "blur" }
        ],
        version: [
          { min: 1, max: 50, message: "最多输入50个字", trigger: "blur" }
        ],
        hotLine: [
          { min: 1, max: 100, message: "最多输入100个字", trigger: "blur" }
        ],
        aum: [{ validator: checkNum, trigger: "blur" }],
        locationId: [
          { required: true, message: "请选择所属省市", trigger: "change" }
        ],
        type: [
          { required: true, message: "请选择机构类型", trigger: "change" }
        ],
        star: [
          { required: true, message: "请选择银行星级", trigger: "change" }
        ],
        logo: [{ required: true, message: "请上传logo", trigger: "change" }]
      }
    };
  },
  created() {
    this.env = sessionStorage.getItem("env") === "development";
    this.hasImg = {
      logoUrl: {
        url: "admin/file/up/product",
        imgUrl: ""
      },
      backUrl: {
        url: "admin/file/up/product",
        imgUrl: ""
      },
      banyuanUrl: {
        url: "admin/file/up/product",
        imgUrl: ""
      },
      shangbiao: {
        url: "admin/file/up/product",
        imgUrl: ""
      }
    };
    let isEdit = sessionStorage.getItem("jigou_edit");
    if (isEdit) {
      this.pageName = sessionStorage.getItem("page") + " > 编辑机构第一步"; // 获取页面名称
    } else {
      this.pageName = sessionStorage.getItem("page") + " > 新增机构第一步"; // 获取页面名称
      this.setTime();
    }

    this.dictData = JSON.parse(sessionStorage.getItem("dict"));
    let step1 = sessionStorage.getItem("organizational_step1");
    if (step1) {
      this.ruleForm = JSON.parse(step1);

      this.hasImg.logoUrl.imgUrl = this.ruleForm.logo;
      this.hasImg.backUrl.imgUrl = this.ruleForm.backgroundImage;
      this.hasImg.banyuanUrl.imgUrl = this.ruleForm.semicircleBackgroundImage;
      this.hasImg.shangbiao.imgUrl = this.ruleForm.textLogo;
    }
  },
  methods: {
    setTime() {
      this.ruleForm.weihu = ["22:00:00", "00:00:00"];
      this.ruleForm.serviceTime = ["09:00:00", "18:00:00"];
    },
    next() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          sessionStorage.setItem(
            "organizational_step1",
            JSON.stringify(this.ruleForm)
          );
          this.$router.push({
            name: "organizational_step2"
          });
        }
      });
    },
    // 取消
    back() {
      this.$router.push({
        name: "organizational_mainPage"
      });
    },
    // 添加图标
    getImg(type, data) {
      switch (type) {
        case "logoUrl":
          this.ruleForm.logo = data.url;
          break;
        case "backUrl":
          this.ruleForm.backgroundImage = data.url;
          break;
        case "banyuanUrl":
          this.ruleForm.semicircleBackgroundImage = data.url;
          break;
        case "shangbiao":
          this.ruleForm.textLogo = data.url;
          break;
      }
    }
  }
};
</script>

