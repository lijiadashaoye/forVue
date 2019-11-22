<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
    </div>
    <div style="overflow:auto;" v-if="!isOk">
      <el-form
        ref="ruleForm"
        size="normal"
        :model="ruleForm"
        label-width="150px"
        label-suffix=":"
        class="isForm"
        :rules="rules"
      >
        <el-form-item prop="name" label="基金公司名称" style="position:relative" class="isWith">
          <el-input clearable placeholder="请输入" v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="注册日期" prop="registrationDate">
          <el-date-picker v-model="ruleForm.registrationDate" type="date" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>

        <el-form-item label="公司logo" class="forLogo" prop="logo">
          <div style="width:100px;">
            <imgUpload :datas="hasImg" @selectImg="getImg('actImg',$event)" />
          </div>
        </el-form-item>

        <el-form-item label="资产规模(亿)" prop="aum">
          <el-input clearable placeholder="请输入" v-model="ruleForm.aum"></el-input>
        </el-form-item>

        <el-form-item label="公司描述" prop="description" style="width:100%;margin-right:30px;">
          <editor-bar v-model="ruleForm.description" :url="'admin/file/up/product'"></editor-bar>
        </el-form-item>
        <el-form-item label="公司简介" prop="synopsis" style="width:100%;margin-right:30px;">
          <el-input clearable placeholder="请输入" type="textarea" v-model="ruleForm.synopsis"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="nextButtons" v-if="!isOk">
      <el-button size="mini" type="primary" @click="next" :disabled="isSaveIng">保存</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
      <el-button size="mini" type="danger" @click="back">取消</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
      <el-button size="mini" type="info" @click="to_xiangqing" v-if="fromHttp">到详情</el-button>
    </div>

    <div id="forTable" v-if="isOk&&!editOver">
      <hasSuccess @isOver="isOver" />
    </div>

    <div id="forTable" v-if="isOk&&editOver">
      <div class="successWaper">
        <div class="isOk">
          <span class="myIcon icon-success setText"></span>
          <p class="okText">完成！</p>
        </div>
        <div class="buttons">
          <el-button size="mini" type="primary" @click="to_xiangqing">到详情</el-button>
          <el-button size="mini" type="warning" @click="back">到列表</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import imgUpload from "@/components/upImg.vue";
import hasSuccess from "@/components/success.vue";
import EditorBar from "@/components/wangEnduit";

export default {
  components: { imgUpload, hasSuccess, EditorBar },
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
      env: null,
      fromHttp: null, // 保存编辑的产品数据
      editOver: false, // 如果是编辑，则要退回到详情页面
      hasImg: null,
      isSaveIng: false, // 切换保存按钮的可点击状态
      isOk: false,
      pageName: "", // 当前页面名字
      dictData: {}, // 字典数据
      ruleForm: {
        name: "", // 基金公司名称
        registrationDate: "", // 注册日期
        aum: "0", // 资产规模
        description: "", // 银行描述
        logo: "",
        synopsis: "" // 简介
      },

      //表单验证
      rules: {
        synopsis: [
          { min: 1, max: 200, message: "最多输入200个字", trigger: "blur" }
        ],
        name: [
          { min: 1, max: 50, message: "请输入1-50个字符", trigger: "blur" },
          { required: true, message: "请输入基金公司名称", trigger: "blur" }
        ],
        registrationDate: [
          { required: true, message: "请选择注册日期", trigger: "change" }
        ],
        logo: [{ required: true, message: "请上传logo" }],
        aum: [
          { required: true, message: "请输入资产规模", trigger: "blur" },
          { validator: checkNum, trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.env = sessionStorage.getItem("env") === "development";
    this.hasImg = {
      url: "admin/file/up/product",
      imgUrl: ""
    };
    this.dictData = JSON.parse(sessionStorage.getItem("dict"));
    this.fromHttp = sessionStorage.getItem("jijin_edit_data");
    if (this.fromHttp) {
      let data = JSON.parse(this.fromHttp);
      this.ruleForm = {
        id: data.id,
        name: data.name, // 基金公司名称
        registrationDate: data.registrationDate, // 注册日期
        aum: data.aum, // 资产规模
        description: data.description, // 银行描述
        logo: data.logo,
        synopsis: data.synopsis
      };
      this.hasImg.imgUrl = this.ruleForm.logo;
      this.pageName = sessionStorage.getItem("page") + " > 编辑基金公司"; // 获取页面名称
    } else {
      this.pageName = sessionStorage.getItem("page") + " > 新增基金公司"; // 获取页面名称
    }
  },

  methods: {
    next() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.isSaveIng = true;
          if (this.fromHttp) {
            // 编辑
            this.$api
              .put_jijingonsi({
                vm: this,
                data: this.ruleForm
              })
              .then(res => {
                if (res) {
                  this.$store.dispatch("get_dict", this).then(res => {
                    sessionStorage.setItem("dict", JSON.stringify(res));
                    this.isOk = true;
                    this.editOver = true;
                  });
                  sessionStorage.removeItem("jijin_edit_data");
                }
                this.isSaveIng = false;
              });
          } else {
            this.$api
              .save_jijingonsi({
                vm: this,
                data: this.ruleForm
              })
              .then(res => {
                if (res) {
                  this.$store.dispatch("get_dict", this).then(res => {
                    sessionStorage.setItem("dict", JSON.stringify(res));
                    this.isOk = true;
                  });
                }
                this.isSaveIng = false;
              });
          }
        }
      });
    },

    // 返回到详情页
    to_xiangqing() {
      this.$router.push({
        name: "fund_company_info",
        query: {
          id: this.ruleForm.id,
          name: this.ruleForm.name
        }
      });
    },

    // 取消
    back() {
      this.$router.push({
        name: "fund_company_mainPage"
      });
    },
    // 添加图标
    getImg(type, data) {
      this.ruleForm.logo = data.url;
    },
    isOver(type) {
      // 只有新增时才会用到
      if (type === "back") {
        // 到列表
        sessionStorage.setItem("page", "基金公司管理 ");
        this.$router.push({ name: `fund_company_mainPage` });
      } else {
        this.ruleForm = {
          name: "", // 基金公司名称
          registrationDate: "", // 注册日期
          aum: "", // 资产规模
          description: "", // 银行描述
          logo: ""
        };
        this.isOk = false;
      }
    }
  }
};
</script>
