<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
    </div>
    <div v-if="!isOk" style="overflow:auto;">
      <el-form
        ref="ruleForm"
        size="normal"
        :model="ruleForm"
        label-width="150px"
        label-suffix=":"
        class="isForm"
        :rules="rules"
      >
        <el-form-item label="产品类型" class="is50" prop="productType">
          <el-select
            filterable
            class="isInput"
            clearable
            placeholder="请选择"
            v-model="ruleForm.productType"
          >
            <el-option
              v-for="item in dictData.product_all_type"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="APP名称" class="is50" prop="appName">
          <el-select
            filterable
            class="isInput"
            clearable
            placeholder="请选择"
            v-model="ruleForm.appName"
          >
            <el-option
              v-for="item in dictData.application_type"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="地区" class="is50" prop="area">
          <el-select filterable class="isInput" clearable placeholder="请选择" v-model="ruleForm.area">
            <el-option
              v-for="item in dictData.product_area"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="标题" class="is50" prop="title">
          <el-input clearable v-model="ruleForm.title" placeholder="请输入" class="isInput"></el-input>
        </el-form-item>

        <el-form-item label="LOGO" class="forLogo" prop="logo">
          <div style="width:100px;" v-if="hasImg">
            <imgUpload :datas="hasImg" @selectImg="getImg($event)" />
          </div>
        </el-form-item>

        <el-form-item label="H5链接" prop="h5Link" style="width:100%;">
          <el-input clearable v-model="ruleForm.h5Link" placeholder="请输入" class="isInput"></el-input>
        </el-form-item>

        <el-form-item label="描述" style="width:100%;margin-right:30px;" prop="content">
          <editor-bar v-model="ruleForm.content" :url="'admin/file/up/product'"></editor-bar>
        </el-form-item>
      </el-form>
      <div v-if="!isOk" class="nextButtons">
        <el-button size="mini" type="primary" @click="next">保存</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button size="mini" type="info" @click="back">取消</el-button>
      </div>
    </div>

    <hasSuccess @isOver="isOver" v-if="isOk" />
  </div>
</template>
<script>
import imgUpload from "@/components/upImg.vue";
import EditorBar from "@/components/wangEnduit";
import hasSuccess from "@/components/success.vue";
export default {
  components: { hasSuccess, imgUpload, EditorBar },

  data() {
    // 验证数字
    var chec_content = (rule, value, callback) => {
      if (!value) {
        callback(new Error("描述不能为空"));
      } else {
        callback();
      }
    };

    return {
      env: null,
      dictData: {}, // 字典数据
      isOk: false,
      hasImg: null, // 如果有图片数据，要显示出来
      pageName: "", // 当前页面名字
      ruleForm: {
        productType: "", // 产品类型
        appName: "", // APP名称
        area: "", // 地区
        title: "", // 标题
        logo: "", // LOGO
        h5Link: "", // H5链接
        content: "" // 描述
      },

      rules: {
        productType: [
          { required: true, message: "请选择产品类型", trigger: "change" }
        ],
        area: [{ required: true, message: "请选择地区", trigger: "change" }],
        appName: [
          { required: true, message: "请选择APP名称", trigger: "change" }
        ],
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        logo: [{ required: true, message: "请上传logo", trigger: "change" }],
        content: [{ required: true, validator: chec_content, trigger: "blur" }],
        h5Link: [
          { min: 0, max: 250, message: "做多输入250个字符！", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.env = sessionStorage.getItem("env") === "development";
    this.dictData = JSON.parse(sessionStorage.getItem("dict"));
    this.init();
  },

  methods: {
    init() {
      this.hasImg = null;
      if (this.$route.query.id) {
        this.pageName = sessionStorage.getItem("page") + " > 修改产品协议"; // 获取页面名称
        this.$api
          .product_agreement_single({
            vm: this,
            data: this.$route.query.id
          })
          .then(res => {
            this.ruleForm = { ...res.data };
            this.hasImg = {
              url: "admin/file/up/setting",
              imgUrl: this.ruleForm.logo
            };
            this.isOk = false;
          });
      } else {
        this.pageName = sessionStorage.getItem("page") + " > 新增产品协议"; // 获取页面名称
        this.hasImg = {
          url: "admin/file/up/setting",
          imgUrl: ""
        };
        this.isOk = false;
      }
    },
    getImg(data) {
      this.ruleForm.logo = data.url;
    },
    next() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let obj = {
              productType: this.ruleForm.productType,
              appName: this.ruleForm.appName,
              area: this.ruleForm.area,
              title: this.ruleForm.title,
              logo: this.ruleForm.logo,
              h5Link: this.ruleForm.h5Link,
              content: this.ruleForm.content
            },
            httpType = "";
          if (this.$route.query.id) {
            // 编辑
            obj.id = this.$route.query.id;
            httpType = "put";
          } else {
            httpType = "post";
          }
          this.$api
            .add_product_agreement({
              vm: this,
              data: obj,
              httpType: httpType
            })
            .then(res => {
              if (res) {
                this.isOk = true;
              }
            });
        }
      });
    },
    isOver(type) {
      sessionStorage.setItem("page", "产品协议配置 ");
      if (type === "back") {
        this.$router.push({ name: `product_agreement_list` });
      } else {
        this.ruleForm = {
          productType: "", // 产品类型
          appName: "", // APP名称
          area: "", // 地区
          title: "", // 标题
          logo: "", // LOGO
          h5Link: "", // H5链接
          content: "" // 描述
        };
        window.location.href = location.href.split("?")[0];

        this.init();
      }
    },
    // 取消
    back() {
      this.$router.push({
        name: "product_agreement_list"
      });
    }
  }
};
</script>
