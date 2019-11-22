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
        <el-form-item label="币种大类" class="is50" prop="currencyBigType">
          <el-select filterable v-model="ruleForm.currencyBigType" clearable placeholder="请选择">
            <el-option
              v-for="item in dictData.product_area"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="币种名称" class="is50" prop="currencyName">
          <el-input clearable v-model="ruleForm.currencyName" placeholder="请输入" class="isInput"></el-input>
        </el-form-item>

        <el-form-item label="币种简称" class="is50" prop="currencyCode">
          <el-input
            :disabled="!!ruleForm.id"
            clearable
            v-model="ruleForm.currencyCode"
            placeholder="请输入"
            class="isInput"
          ></el-input>
        </el-form-item>
        <el-form-item label="币种单位" class="is50" prop="currencyUnit">
          <el-input clearable v-model="ruleForm.currencyUnit" placeholder="请输入" class="isInput"></el-input>
        </el-form-item>
        <el-form-item label="语种" class="is50" prop="currencyLanguage">
          <el-input clearable v-model="ruleForm.currencyLanguage" placeholder="请输入" class="isInput"></el-input>
        </el-form-item>
        <el-form-item label="币种符号" class="is50" prop="symbol">
          <el-input clearable v-model="ruleForm.symbol" placeholder="请输入" class="isInput"></el-input>
        </el-form-item>
        <el-form-item label="币种分类" class="is50" prop="currencyType">
          <el-select
            filterable
            class="isInput"
            clearable
            placeholder="请选择"
            v-model="ruleForm.currencyType"
          >
            <el-option
              v-for="item in dictData.continent_type"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="币种排序" class="is50" prop="currencyIndex">
          <el-input
            clearable
            v-model="ruleForm.currencyIndex"
            placeholder="请输入"
            type="number"
            class="isInput"
          ></el-input>
        </el-form-item>

        <el-form-item size="mini" label="默认选中" class="is50">
          <el-radio-group v-model="ruleForm.currencySelected" class="isInput">
            <el-radio-button label="是" class="isRadio"></el-radio-button>
            <el-radio-button label="否" class="isRadio"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item size="mini" label="是否热门" class="is50">
          <el-radio-group v-model="ruleForm.currencyHot" class="isInput">
            <el-radio-button label="是" class="isRadio"></el-radio-button>
            <el-radio-button label="否" class="isRadio"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item size="mini" label="是否显示" class="is50">
          <el-radio-group v-model="ruleForm.currencyShow" class="isInput">
            <el-radio-button label="是" class="isRadio"></el-radio-button>
            <el-radio-button label="否" class="isRadio"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="币种图片" class="forLogo" prop="currencyImage">
          <div style="width:100px;" v-if="hasImg">
            <imgUpload :datas="hasImg" @selectImg="getImg($event)" />
          </div>
        </el-form-item>

        <el-form-item label="备注" prop="currencyRemark" style="width:100%;">
          <el-input
            type="textarea"
            clearable
            v-model="ruleForm.currencyRemark"
            placeholder="请输入"
            class="isInput"
          ></el-input>
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
import hasSuccess from "@/components/success.vue";
export default {
  components: {
    hasSuccess,
    imgUpload
  },

  data() {
    // 验证数字
    var checkNum1 = (rule, value, callback) => {
      if (+value < 0) {
        callback(new Error("请输入正数"));
      } else if (("" + value).length > 19) {
        callback(new Error("请输入1-19字符"));
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
        currencyName: "", // 币种名称
        currencyBigType: "", // 币种大类
        currencyCode: "", // 币种简称
        currencyUnit: "", // 币种单位
        currencyLanguage: "", //  语种
        currencySelected: "否", // 默认选中
        currencyHot: "否", // 是否热门
        currencyShow: "否", // 是否显示
        currencyType: "", // 币种分类
        currencyIndex: "", //  币种排序
        currencyImage: "", //  币种图片
        currencyRemark: "", //  备注
        symbol: "" // 币种符号
      },

      rules: {
        currencyBigType: [
          { required: true, message: "请选择币种大类", trigger: "change" }
        ],
        currencyType: [
          { required: true, message: "请选择币种分类", trigger: "change" }
        ],
        currencyName: [
          { required: true, message: "请输入币种名称", trigger: "blur" }
        ],
        currencyCode: [
          { required: true, message: "请输入币种简称", trigger: "blur" }
        ],
        currencyUnit: [
          { required: true, message: "请输入币种单位", trigger: "blur" }
        ],
        currencyLanguage: [
          { required: true, message: "请输入语种", trigger: "blur" }
        ],
        currencyIndex: [
          [{ validator: checkNum1, trigger: "blur" }],
          { required: true, message: "请输入币种排序", trigger: "blur" }
        ],
        currencyImage: [
          { required: true, message: "请输入币种图片", trigger: "change" }
        ],
        symbol: [{ required: true, message: "请输入币种符号", trigger: "blur" }]
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
        this.pageName = sessionStorage.getItem("page") + " > 修改币种"; // 获取页面名称
        this.$api
          .coin_info({
            vm: this,
            data: this.$route.query.id
          })
          .then(res => {
            this.ruleForm = {
              id: res.data.id,
              currencyName: res.data.currencyName,
              currencyBigType:
                res.data.currencyBigType == 1 ? "hk" : "mainland", // 币种大类
              currencyCode: res.data.currencyCode, // 币种简称
              currencyUnit: res.data.currencyUnit, // 币种单位
              currencyLanguage: res.data.currencyLanguage, //  语种
              currencySelected:
                res.data.currencySelected === "NO" ? "否" : "是", // 默认选中
              currencyHot: res.data.currencyHot === "NO" ? "否" : "是", // 是否热门
              currencyShow: res.data.currencyShow === "NO" ? "否" : "是", // 是否显示
              currencyType: res.data.currencyType, // 币种分类
              currencyIndex: "" + res.data.currencyIndex, //  币种排序
              currencyImage: res.data.currencyImage, //  币种图片
              currencyRemark: res.data.currencyRemark, //  备注
              symbol: res.data.symbol // 币种符号
            };

            this.hasImg = {
              url: "admin/file/up/product",
              imgUrl: this.ruleForm.currencyImage
            };
            this.isOk = false;
          });
      } else {
        this.pageName = sessionStorage.getItem("page") + " > 新增币种"; // 获取页面名称
        this.hasImg = {
          url: "admin/file/up/product",
          imgUrl: ""
        };
        this.isOk = false;
      }
    },
    getImg(data) {
      this.ruleForm.currencyImage = data.url;
    },
    next() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let obj = {
              currencyName: this.ruleForm.currencyName,
              currencyBigType: this.ruleForm.currencyBigType === "hk" ? 1 : 0, // 币种大类
              currencyCode: this.ruleForm.currencyCode, // 币种简称
              currencyUnit: this.ruleForm.currencyUnit, // 币种单位
              currencyLanguage: this.ruleForm.currencyLanguage, //  语种
              currencySelected:
                this.ruleForm.currencySelected === "否" ? "NO" : "YES", // 默认选中
              currencyHot: this.ruleForm.currencyHot === "否" ? "NO" : "YES", // 是否热门
              currencyShow: this.ruleForm.currencyShow === "否" ? "NO" : "YES", // 是否显示
              currencyType: this.ruleForm.currencyType, // 币种分类
              currencyIndex: +this.ruleForm.currencyIndex, //  币种排序
              currencyImage: this.ruleForm.currencyImage, //  币种图片
              currencyRemark: this.ruleForm.currencyRemark, //  备注
              symbol: this.ruleForm.symbol // 币种符号
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
            .coin_add({
              vm: this,
              data: obj,
              httpType: httpType
            })
            .then(res => {
              if (res) {
                this.isOk = true;
                this.$store.dispatch("get_dict", this).then(res => {
                  sessionStorage.setItem("dict", JSON.stringify(res));
                });
              }
            });
        }
      });
    },
    isOver(type) {
      sessionStorage.setItem("page", "产品协议配置 ");
      if (type === "back") {
        this.$router.push({ name: `coin_manage` });
      } else {
        this.ruleForm = {
          currencyName: "", // 币种名称
          currencyBigType: "", // 币种大类
          currencyCode: "", // 币种简称
          currencyUnit: "", // 币种单位
          currencyLanguage: "", //  语种
          currencySelected: "否", // 默认选中
          currencyHot: "否", // 是否热门
          currencyShow: "否", // 是否显示
          currencyType: "", // 币种分类
          currencyIndex: "", //  币种排序
          currencyImage: "", //  币种图片
          currencyRemark: "", //  备注
          symbol: "" // 币种符号
        };
        window.location.href = location.href.split("?")[0];
        this.init();
      }
    },
    // 取消
    back() {
      this.$router.push({
        name: "coin_manage"
      });
    }
  }
};
</script>
