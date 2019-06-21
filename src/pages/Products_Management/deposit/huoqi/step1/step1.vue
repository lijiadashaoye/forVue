<template>
  <div class="componentWaper">
    <div id='forHeader'>
      <h3>{{pageName}}</h3>
    </div>
    <div
      style="overflow:auto;"
      id='forTable'
    >
      <el-form
        ref="ruleForm"
        size="normal"
        :model="ruleForm"
        label-width="150px"
        label-suffix=':'
        class="isForm"
        :rules="rules"
      >
        <el-form-item
          prop="institutionId"
          label="机构名称"
          style="position:relative"
          class="is50"
        >
          <el-select
            class="isInput"
            clearable
            placeholder="请选择"
            v-model="ruleForm.institutionId"
            @change="change_xilie(ruleForm.institutionId)"
          >
            <el-option
              size='mini'
              v-for="item in dictData.jigou"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>

          <a
            class="isA"
            @click="toJiGou"
          >无机构？</a>

        </el-form-item>

        <el-form-item
          label="产品系列"
          class="is50"
        >

          <el-select
            class="isInput"
            clearable
            placeholder="请选择"
            v-model="ruleForm.seriesId"
            @change="setXiLie(ruleForm.seriesId)"
          >
            <el-option
              size='mini'
              v-for="item in xilie"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <hr>

        <el-form-item
          label="产品名称"
          prop="name"
          class="is50"
        >
          <el-input
            class="isInput"
            clearable
            placeholder="请输入"
            v-model="ruleForm.name"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="产品别名"
          class="is50"
          prop="typeAlias"
        >
          <el-input
            class="isInput"
            clearable
            placeholder="请输入"
            v-model="ruleForm.typeAlias"
          ></el-input>

        </el-form-item>

        <el-form-item
          label="利率"
          prop="interestRate"
          class="is50"
        >
          <el-input
            class="isInput"
            type='number'
            clearable
            placeholder="请输入"
            v-model="ruleForm.interestRate"
          ></el-input>
          <span class="isA">%</span>
        </el-form-item>

        <el-form-item
          label="利率别名"
          class="is50"
          prop="interestRateAlias"
        >
          <el-input
            class="isInput"
            clearable
            placeholder="请输入"
            v-model="ruleForm.interestRateAlias"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="起存金额(元)"
          prop="minAmount"
          class="is50"
        >
          <el-input
            type='number'
            class="isInput"
            clearable
            v-model="ruleForm.minAmount"
            placeholder="请输入"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="递增金额(元)"
          prop="increaseAmount"
          class="is50"
        >
          <el-input
            class="isInput"
            clearable
            v-model="ruleForm.increaseAmount"
            placeholder="请输入"
            type='number'
          ></el-input>

        </el-form-item>

        <el-form-item
          label="期限别名"
          class="is50"
          prop="deadlineAlias"
        >
          <el-input
            class="isInput"
            clearable
            placeholder="请输入"
            v-model="ruleForm.deadlineAlias"
          ></el-input>

        </el-form-item>

        <el-form-item
          label="标签"
          class="is50"
        >
          <el-select
            class="isInput"
            v-model="ruleForm.marks"
            clearable
            placeholder="请选择"
            multiple
          >
            <el-option
              size='mini'
              v-for="item in dictData.marks"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <span class="isA">
            <i
              title="标签：标签默认在首页排行榜单显示，活期存款展示前两个标签，智能存款展示前四个标签"
              class="myIcon14px icon-wenhaoyuanyiwenxianxing"
            ></i>
          </span>
        </el-form-item>

        <el-form-item label="产品描述">
          <quill-editor
            class="isInput"
            v-model="ruleForm.description"
          >
          </quill-editor>
        </el-form-item>

      </el-form>
      <div class="nextButtons">
        <el-button
          size="mini"
          type="primary"
          @click="next"
        >下一步</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button
          size="mini"
          type="info"
          @click="back"
        >取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    // 验证数字
    var checkNum3 = (rule, value, callback) => {
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
      ruleForm: {
        institutionId: "", // 机构id
        seriesId: "", // 产品系列ID
        name: "", // 产品名称
        typeAlias: "", // 产品类型（类别别名）
        interestRate: "", // 利率
        interestRateAlias: "", // 利率别名
        deadlineAlias: "", // 期限别名
        minAmount: "", // 起存金额
        increaseAmount: "", // 递增金额
        marks: [], // 标签
        description: "" // 产品描述
      },
      xilie: [], // 从服务器返回的产品系列数据
      //表单验证
      rules: {
        institutionId: [
          { required: true, message: "请选择机构名称", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入产品名称", trigger: "blur" },
          { min: 1, max: 19, message: "最多输入19个字", trigger: "blur" }
        ],
        typeAlias: [
          { min: 1, max: 19, message: "最多输入19个字", trigger: "blur" }
        ],
        interestRateAlias: [
          { min: 1, max: 19, message: "最多输入19个字", trigger: "blur" }
        ],
        deadlineAlias: [
          { min: 1, max: 19, message: "最多输入19个字", trigger: "blur" }
        ],
        interestRate: [
          { validator: checkNum3, trigger: "blur" },
          { required: true, message: "请输入利率", trigger: "blur" }
        ],
        minAmount: [
          { validator: checkNum3, trigger: "blur" },
          { required: true, message: "请输入起购金额", trigger: "blur" }
        ],
        increaseAmount: [
          { validator: checkNum3, trigger: "blur" },
          { required: true, message: "请输入递增金额", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.pageName = sessionStorage.getItem("page") + " > 新增活期存款第一步"; // 获取页面名称
    this.dictData = JSON.parse(sessionStorage.getItem("dict"));

    // 如果有数据，则表示是编辑过的，如果没有，那就是从mainpage过来的
    let huoqi_step1 = sessionStorage.getItem("huoqi_step1");
    // 获取选定的机构
    let jigouData = JSON.parse(sessionStorage.getItem("xilie_jigou"));
    this.change_xilie(jigouData.institutionId);

    if (huoqi_step1) {
      this.ruleForm = JSON.parse(huoqi_step1);
    } else {
      this.ruleForm.institutionId = jigouData.institutionId;
      if (jigouData.id) {
        this.ruleForm.seriesId = jigouData.id;
      }
    }
  },

  methods: {
    // 变更产品系列后，要保存选择的系列，等回到当前页面后数据能对应上
    setXiLie(data) {
      let tar = this.xilie.filter(item => item.id === data);
      sessionStorage.setItem("xilie_jigou", JSON.stringify(tar[0]));
    },
    // 变更机构后，要对应调整系列
    change_xilie(id) {
      // 根据机构id，获取对应的产品系列
      let xilieData = JSON.parse(sessionStorage.getItem("xilie_data"));
      this.xilie = xilieData.filter(
        item => item.institutionId === id
      )[0].seriesList;
      if (this.ruleForm.seriesId != "") {
        this.ruleForm.seriesId = "";
      }
    },
    next() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          sessionStorage.setItem("huoqi_step1", JSON.stringify(this.ruleForm));
          this.$router.push({
            name: "huoqi_step2"
          });
        }
      });
    },
    // 取消
    back() {
      this.$router.push({
        name: "deposit_mainPage"
      });
    },
    toJiGou() {
      sessionStorage.setItem("page", "机构管理");
      this.$router.push({
        name: "organizational_step1"
      });
    }
  }
};
</script>
