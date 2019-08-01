<template>
  <div class="componentWaper">
    <div id="forHeader">
      <h3>{{pageName}}</h3>
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
        <el-form-item
          prop="institutionName"
          label="基金公司名称"
          style="position:relative"
          class="isWith"
        >
          <el-input clearable placeholder="请输入" v-model="ruleForm.institutionName"></el-input>
        </el-form-item>

        <el-form-item label="注册日期">
          <el-date-picker v-model="ruleForm.qixiri" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>

        <el-form-item label="公司logo" class="forLogo">
          <div style="width:100px;">
            <imgUpload
              :datas="{
                  url:'admin/file/up/member',
                  imgUrl:''
                }"
              @selectImg="getImg('actImg',$event)"
            />
          </div>
        </el-form-item>

        <el-form-item label="资产规模(亿)" prop="moneys">
          <el-input clearable placeholder="请输入" v-model="ruleForm.moneys"></el-input>
        </el-form-item>

        <el-form-item label="公司描述" prop="description">
          <quill-editor v-model="ruleForm.description"></quill-editor>
        </el-form-item>
      </el-form>
    </div>
    <div class="nextButtons" v-if="!isOk">
      <el-button size="mini" type="primary" @click="next" :disabled="isSaveIng">保存</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
      <el-button size="mini" type="info" @click="back">取消</el-button>
    </div>
    <hasSuccess @isOver="isOver" v-if="isOk" />
  </div>
</template>
<script>
import imgUpload from "../../../../components/upImg.vue";
import hasSuccess from "../../../../components/success.vue";

export default {
  components: { imgUpload, hasSuccess },
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
      isSaveIng: false, // 切换保存按钮的可点击状态
      isOk: false,
      pageName: "", // 当前页面名字
      dictData: {}, // 字典数据
      ruleForm: {
        suoshushengshi: [], //所属省市
        institutionName: "", // 机构名称
        institutionType: "", // 机构类型
        moneys: "", // 资产规模
        starDescription: "", // 星级评定描述
        description: "", // 银行描述
        starts: "", // 银行星级
        logo: ""
      },
      shelveList: [
        {
          label: "上架中",
          value: "YES"
        },
        {
          label: "已下架",
          value: "NO"
        }
      ],

      //表单验证
      rules: {
        institutionName: [
          { min: 1, max: 50, message: "请输入1-50个字符", trigger: "blur" },
          { required: true, message: "请输入机构名称", trigger: "blur" }
        ],
        suoshushengshi: [
          { required: true, message: "请选择所属省市", trigger: "blur" }
        ],
        institutionType: [
          { required: true, message: "请选择机构类型", trigger: "blur" }
        ],
        code: [
          { min: 1, max: 20, message: "请输入1-20个字符", trigger: "blur" },
          { required: true, message: "请输入基金代码", trigger: "blur" }
        ],
        status: [
          { required: true, message: "请选择交易状态", trigger: "blur" }
        ],
        dailyIncrease: [
          { required: true, message: "请输入日涨幅", trigger: "blur" }
        ],
        moneys: [{ validator: checkNum, trigger: "blur" }],
        description: [
          { min: 1, max: 2000, message: "最多输入2000个字", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    // console.log(this.$route.query["id"]);
    this.pageName = sessionStorage.getItem("page") + " > 新增基金公司第一步"; // 获取页面名称
    this.dictData = JSON.parse(sessionStorage.getItem("dict"));
  },

  methods: {
    next() {
      console.log(this.ruleForm);
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.isSaveIng = true;
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
      sessionStorage.setItem("page", "基金公司管理 ");
      if (type === "back") {
        this.$router.push({ name: `fund_company_mainPage` });
      } else {
        this.isOk = false;
      }
    }
  }
};
</script>
