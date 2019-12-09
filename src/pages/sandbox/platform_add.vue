<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
    </div>

    <div id="forTable">
      <div class="sandow1">
        <el-form
          ref="ruleForm"
          :rules="rules"
          :model="ruleForm"
          label-width="90px"
          label-suffix=" :"
        >
          <el-form-item label="银行" size="mini" prop="bank">
            <el-select
              filterable
              v-model="ruleForm.bank"
              clearable
              placeholder="请选择"
              style="width:508px;"
            >
              <el-option-group v-for="group in kkk" :key="group.label" :label="group.label">
                <el-option
                  v-for="item in group.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-option-group>
            </el-select>
          </el-form-item>

          <el-form-item label="渠道" size="mini" prop="qudao">
            <div class="sandow_radioGrop">
              <el-form-item label="内部渠道">
                <el-checkbox
                  style="display:inline-block;margin:0 20px 0 13px;"
                  :indeterminate="isIndeterminate1"
                  v-model="checkAll1"
                  @change="handleCheckAllChange1"
                >全部</el-checkbox>
                <el-checkbox-group
                  style="display:inline-block;"
                  v-model="ruleForm.qudao.inset"
                  @change="handleCheckedCitiesChange1"
                >
                  <el-checkbox v-for="t in insetList" :label="t" :key="t">{{t}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="外部渠道">
                <el-checkbox
                  style="display:inline-block;margin:0 20px 0 13px;"
                  :indeterminate="isIndeterminate2"
                  v-model="checkAll2"
                  @change="handleCheckAllChange2"
                >全部</el-checkbox>
                <el-checkbox-group
                  style="display:inline-block;"
                  v-model="ruleForm.qudao.outset"
                  @change="handleCheckedCitiesChange2"
                >
                  <el-checkbox v-for="t in outsetList" :label="t" :key="t">{{t}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </div>
          </el-form-item>
        </el-form>
        <div class="addPlatformButton">
          <el-button size="mini" type="primary" @click="next">提交</el-button>
          <el-button size="mini" type="info" @click="back">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    var check_qudao = (rule, value, callback) => {
      if (value.inset.length || value.outset.length) {
        callback();
      } else {
        callback(new Error("请选择渠道！"));
      }
    };
    return {
      kkk: [
        {
          label: "未配置过",
          options: [
            {
              value: "Shanghai",
              label: "上海"
            },
            {
              value: "Beijing",
              label: "北京"
            }
          ]
        },
        {
          label: "已配置过",
          options: [
            {
              value: "Chengdu",
              label: "成都"
            },
            {
              value: "Shenzhen",
              label: "深圳"
            },
            {
              value: "Guangzhou",
              label: "广州"
            },
            {
              value: "Dalian",
              label: "大连"
            }
          ]
        }
      ],
      env: "",
      pageName: "",
      dictData: "",
      pageType: "",
      isIndeterminate1: false,
      checkAll1: false,
      isIndeterminate2: false,
      checkAll2: false,
      ruleForm: {
        bank: "",
        qudao: {
          inset: [],
          outset: []
        }
      },
      insetList: ["比财APP", "拼财APP", "拼财小程序"],
      outsetList: ["异业", "同业", "直投"],
      rules: {
        bank: [{ required: true, message: "请选择银行", trigger: "change" }],
        qudao: [{ required: true, validator: check_qudao, trigger: "blur" }]
      }
    };
  },
  created() {
    this.env = sessionStorage.getItem("env") === "development";
    this.pageType = this.$route.query.type;
    switch (this.pageType) {
      case undefined:
      case "copy":
        this.pageName = sessionStorage.getItem("page") + " > 新增银行配置"; // 获取页面名称
        break;
      case "edit":
        this.pageName = sessionStorage.getItem("page") + " > 编辑银行配置"; // 获取页面名称
        break;
    }
    this.dictData = JSON.parse(sessionStorage.getItem("dict"));
  },
  methods: {
    // 内部渠道checkbox
    handleCheckAllChange1(val) {
      this.ruleForm.qudao.inset = val ? this.insetList : [];
      this.isIndeterminate1 = false;
    },
    handleCheckedCitiesChange1(value) {
      let checkedCount = value.length;
      this.checkAll1 = checkedCount === this.insetList.length;
      this.isIndeterminate1 =
        checkedCount > 0 && checkedCount < this.insetList.length;
    },
    // 内部渠道checkbox
    handleCheckAllChange2(val) {
      this.ruleForm.qudao.outset = val ? this.outsetList : [];
      this.isIndeterminate2 = false;
    },
    handleCheckedCitiesChange2(value) {
      let checkedCount = value.length;
      this.checkAll2 = checkedCount === this.outsetList.length;
      this.isIndeterminate2 =
        checkedCount > 0 && checkedCount < this.outsetList.length;
    },
    next() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          console.log(this.ruleForm);
          this.reset();
        }
      });
    },
    back() {
      this.$router.push({
        name: "platform"
      });
    },
    reset() {
      this.$refs.ruleForm.resetFields();
      this.isIndeterminate1 = false;
      this.checkAll1 = false;
      this.isIndeterminate2 = false;
      this.checkAll2 = false;
      this.ruleForm.bank = "";
      this.ruleForm.qudao.inset = [];
      this.ruleForm.qudao.outset = [];
    }
  }
};
</script>
