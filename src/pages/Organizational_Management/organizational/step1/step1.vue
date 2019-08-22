<template>
  <div class="componentWaper">
    <div id="forHeader">
      <h3>{{pageName}}</h3>
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

        <el-form-item label="所属省市" style="margin-bottom:5px;">
          <el-cascader
            v-model="location"
            :options="dictData.quyu"
            :props="{ expandTrigger: 'hover'}"
          ></el-cascader>
        </el-form-item>

        <el-form-item prop="type" label="银行类型" style="position:relative" class="isWith">
          <el-select clearable placeholder="请选择" v-model="ruleForm.type">
            <el-option
              size="mini"
              v-for="item in dictData.bank_type"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="资产规模(亿)" prop="aum">
          <el-input type="number" clearable placeholder="请输入" v-model="ruleForm.aum"></el-input>
        </el-form-item>

        <el-form-item prop="parentId" label="隶属机构" style="position:relative" class="isWith">
          <el-select clearable placeholder="请选择" v-model="ruleForm.parentId">
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

        <el-form-item label="银行logo" class="forLogo" v-if="this.hasImg">
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

        <el-form-item label="维护时间" style="margin-bottom:5px;">
          <el-time-picker
            size="mini"
            value-format="HH:mm:ss"
            is-range
            arrow-control
            v-model="weihu"
            range-separator="~"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="版本标识" prop="version">
          <el-input clearable placeholder="请输入" v-model="ruleForm.version"></el-input>
        </el-form-item>

        <el-form-item label="客服服务时间" style="margin-bottom:5px;">
          <el-time-picker
            size="mini"
            value-format="HH:mm:ss"
            is-range
            arrow-control
            v-model="ruleForm.serviceTime"
            range-separator="~"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
          ></el-time-picker>
        </el-form-item>

        <el-form-item label="银行星级" style="margin-bottom:5px;">
          <el-select v-model="ruleForm.star" clearable placeholder="请选择">
            <el-option
              size="mini"
              v-for="item in dictData.institution_star"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="星级评定描述" style="text-align:left;" prop="starRatingDesc">
          <isQuill :url="'admin/file/up/setting'" v-model="ruleForm.starRatingDesc"></isQuill>
        </el-form-item>

        <el-form-item label="银行描述" style="text-align:left;" prop="description">
          <isQuill :url="'admin/file/up/setting'" v-model="ruleForm.description"></isQuill>
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
import imgUpload from "../../../../components/upImg.vue";
import isQuill from "@/components/quill.vue";

export default {
  components: { imgUpload, isQuill },
  data() {
    // 验证资产规模
    var checkNum = (rule, value, callback) => {
      if (value < 0) {
        callback(new Error("请输入正数"));
      } else if (("" + value).length > 19 || ("" + value).length < 0) {
        callback(new Error("请输入1-19字符"));
      } else {
        callback();
      }
    };
    return {
      pageName: "", // 当前页面名字
      dictData: {}, // 字典数据
      hasImg: null, // 如果有图片数据，要显示出来
      location: [], // 所属区域
      weihu: [], // 保存维护时间
      ruleForm: {
        name: "", //  机构名称
        locationId: [], // 所属省/直辖市ID
        type: "", //  机构类型
        aum: "", // 资产规模
        parentId: "", // 隶属机构ID
        hotLine: "", // 热线电话
        logo: "",
        star: "", // 星级
        starRatingDesc: "", // 星级评定描述
        description: "", // 银行描述

        backgroundImage: "", // 背景图
        semicircleBackgroundImage: "", // 半圆背景图
        textLogo: "", // 文字商标
        maintainStartTime: "", // 维护开始时间
        maintainEndTime: "", // 维护结束时间
        serviceTime: [], // 客服服务时间
        version: "" //版本标识
      },

      //表单验证
      rules: {
        name: [
          { min: 1, max: 50, message: "最多输入50个字", trigger: "blur" },
          { required: true, message: "请选择机构名称", trigger: "blur" }
        ],
        version: [
          { min: 1, max: 50, message: "最多输入50个字", trigger: "blur" }
        ],
        hotLine: [
          { min: 1, max: 100, message: "最多输入100个字", trigger: "blur" }
        ],
        aum: [{ validator: checkNum, trigger: "blur" }],
        locationId: [
          { required: true, message: "请选择所属省市", trigger: "blur" }
        ],
        type: [{ required: true, message: "请选择机构类型", trigger: "blur" }]
      }
    };
  },
  created() {
    this.hasImg = {
      logoUrl: {
        url: "admin/file/up/setting",
        imgUrl: ""
      },
      backUrl: {
        url: "admin/file/up/setting",
        imgUrl: ""
      },
      banyuanUrl: {
        url: "admin/file/up/setting",
        imgUrl: ""
      },
      shangbiao: {
        url: "admin/file/up/setting",
        imgUrl: ""
      }
    };
    let isEdit = sessionStorage.getItem("jigou_edit");
    if (isEdit) {
      this.pageName = sessionStorage.getItem("page") + " > 编辑机构第一步"; // 获取页面名称
    } else {
      this.pageName = sessionStorage.getItem("page") + " > 新增机构第一步"; // 获取页面名称
    }

    this.dictData = JSON.parse(sessionStorage.getItem("dict"));
    let step1 = sessionStorage.getItem("organizational_step1");
    if (step1) {
      this.ruleForm = JSON.parse(step1);
      this.weihu = this.ruleForm.weihu;

      this.hasImg.logoUrl.imgUrl = this.ruleForm.logo;
      this.hasImg.backUrl.imgUrl = this.ruleForm.backgroundImage;
      this.hasImg.banyuanUrl.imgUrl = this.ruleForm.semicircleBackgroundImage;
      this.hasImg.shangbiao.imgUrl = this.ruleForm.textLogo;

      if (this.ruleForm.maintainStartTime) {
        this.weihu = [
          this.ruleForm.maintainStartTime,
          this.ruleForm.maintainEndTime
        ];
      }

      // 查询区域数据，填充location数组
      if (this.ruleForm.locationId) {
        wap: for (let i = this.dictData.quyu.length; i--; ) {
          if (this.dictData.quyu[i].value == this.ruleForm.locationId) {
            this.location = ["" + this.ruleForm.locationId];
            break wap;
          } else {
            let child = this.dictData.quyu[i].children;
            if (child) {
              for (let j = child.length; j--; ) {
                if (child[j].value == this.ruleForm.locationId) {
                  this.location = [
                    "" + child[j].paren,
                    "" + this.ruleForm.locationId
                  ];
                  break wap;
                }
              }
            }
          }
        }
      }
     
    }
  },
  methods: {
    next() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.location.length > 0) {
            this.ruleForm.locationId = this.location[this.location.length - 1];
          }
          if (this.weihu.length > 0) {
            this.ruleForm.maintainStartTime = this.weihu[0];
            this.ruleForm.maintainEndTime = this.weihu[1];
          }
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

<style scoped='true' lang="scss">
.isA {
  display: inline-block;
  width: 75px;
  height: 100%;
  font-size: 12px;
  text-align: left;
  padding-left: 5px;
  vertical-align: -5px;
  position: absolute;
  z-index: 2;
}
.isA:hover {
  color: red;
}

.isForm {
  margin: 0 auto;
  width: 75%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  text-align: center;
  padding-top: 20px;
}
.nextButtons {
  width: 300px;
  padding-bottom: 30px;
  padding-left: 80px;
  margin: 0 auto;
}
.forLogo {
  width: 367px;
}
</style>
