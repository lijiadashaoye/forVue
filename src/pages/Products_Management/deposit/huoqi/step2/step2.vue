 <template>
  <div class="componentWaper">
    <div id='forHeader'>
      <h3>{{pageName}}</h3>
    </div>
    <div
      v-if="!isOk"
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
          label="同一产品标识"
          class="is50"
          prop="sameProductFlag"
        >
          <el-input
            clearable
            v-model="ruleForm.sameProductFlag"
            placeholder="请输入"
            class="isInput"
          ></el-input>

        </el-form-item>

        <el-form-item
          size="mini"
          label="是否上架"
          class="is50"
        >
          <el-radio-group
            v-model="ruleForm.shelve"
            class="isInput"
          >
            <el-radio-button
              label="是"
              class="isRadio"
            ></el-radio-button>
            <el-radio-button
              label="否"
              class="isRadio"
            ></el-radio-button>
          </el-radio-group>

        </el-form-item>

        <el-form-item
          size="mini"
          label="是否面签"
          class="is50"
        >
          <el-radio-group
            v-model="ruleForm.visaInterview"
            class="isInput"
          >
            <el-radio-button
              label="是"
              class="isRadio"
            ></el-radio-button>
            <el-radio-button
              label="否"
              class="isRadio"
            ></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          size="mini"
          label="是否推荐"
          class="is50"
        >
          <el-radio-group
            v-model="ruleForm.recommend"
            class="isInput"
          >
            <el-radio-button
              label="是"
              class="isRadio"
            ></el-radio-button>
            <el-radio-button
              label="否"
              class="isRadio"
            ></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          size="mini"
          label="是否首页排行"
          class="is50"
        >
          <el-radio-group
            v-model="ruleForm.homePage"
            class="isInput"
          >
            <el-radio-button
              label="是"
              class="isRadio"
            ></el-radio-button>
            <el-radio-button
              label="否"
              class="isRadio"
            ></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="默认存款笔数"
          class="is50"
          prop="defaultBuyNum"
        >
          <el-input
            clearable
            v-model="ruleForm.defaultBuyNum"
            placeholder="请输入"
            class="isInput"
            type='number'
          ></el-input>
          <span class="isA">
            笔
            <i class="myIcon14px icon-wenhaoyuanyiwenxianxing"></i>
          </span>
        </el-form-item>

        <el-form-item
          label="默认存款金额"
          class="is50"
          prop="defaultAmount"
        >
          <el-input
            type='number'
            clearable
            v-model="ruleForm.defaultAmount"
            placeholder="请输入"
            class="isInput"
          ></el-input>
          <span class="isA">
            元
            <i class="myIcon14px icon-wenhaoyuanyiwenxianxing"></i>
          </span>
        </el-form-item>

        <el-form-item
          prop="listAreaFlag"
          label="榜单专区标识"
          class="is50"
        >
          <el-select
            class="isInput"
            clearable
            placeholder="请选择"
            v-model="ruleForm.listAreaFlag"
          >
            <el-option
              size='mini'
              v-for="item in dictData.list_area_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label=""
          class="is50"
        >
        </el-form-item>
      </el-form>
      <div class="nextButtons">
        <el-button
          size="mini"
          type="primary"
          @click="before"
        >上一步</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button
          size="mini"
          type="primary"
          @click="next"
          :disabled="isSaveIng"
        >保存</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button
          size="mini"
          type="info"
          @click="back"
        >取消</el-button>
      </div>
    </div>

    <div
      id='forTable'
      v-if="isOk"
    >
      <hasSuccess @isOver="isOver" />
    </div>
  </div>
</template>
<script>
import hasSuccess from "../../../../../components/success.vue";
export default {
  components: { hasSuccess },
  data() {
    // 验证数字
    var checkNum2 = (rule, value, callback) => {
      let reg = /\./;
      if (reg.test(value)) {
        callback(new Error("请输入整数"));
      } else if (value < 0) {
        callback(new Error("请输入正数"));
      } else if (("" + value).length > 10 || ("" + value).length < 0) {
        callback(new Error("请输入1-10字符"));
      } else {
        callback();
      }
    };
    // 验证数字
    var checkNum3 = (rule, value, callback) => {
      if (value < 0) {
        callback(new Error("请输入正数"));
      } else if (("" + value).length > 10 || ("" + value).length < 0) {
        callback(new Error("请输入1-10字符"));
      } else {
        callback();
      }
    };
    return {
      isSaveIng: false, // 切换保存按钮的可点击状态
      isOk: false,
      dictData: {}, // 字典数据
      pageName: "", // 当前页面名字
      ruleForm: {
        sameProductFlag: "", // 同一产品标识
        shelve: "否", // 是否上架
        visaInterview: "否", // 是否面签
        recommend: "否", // 是否推荐
        homePage: "否", // 是否首页排行
        defaultBuyNum: "", // 默认存款笔数
        defaultAmount: "", // 默认购买金额
        listAreaFlag: "" // 榜单专区标识
      },
      //表单验证
      rules: {
        sameProductFlag: [
          { min: 1, max: 100, message: "最多输入100个字", trigger: "blur" }
        ],
        defaultBuyNum: [{ validator: checkNum2, trigger: "blur" }],
        defaultAmount: [{ validator: checkNum3, trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.pageName = sessionStorage.getItem("page") + " > 新增活期存款第二步"; // 获取页面名称
    this.dictData = JSON.parse(sessionStorage.getItem("dict"));
    let huoqi_step2 = sessionStorage.getItem("huoqi_step2");
    if (huoqi_step2) {
      this.ruleForm = JSON.parse(huoqi_step2);
    }
  },

  methods: {
    next() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let step1 = JSON.parse(sessionStorage.getItem("huoqi_step1"));
          let type = JSON.parse(
            sessionStorage.getItem("dict")
          ).deposit_type.filter(item => {
            return item.value === "demand_deposit";
          })[0];
          let xilieData = JSON.parse(sessionStorage.getItem("xilie_data"));

          let obj = {
            institutionId: step1.institutionId,
            institutionName: "",
            seriesId: step1.seriesId,
            seriesName: "",
            productSubtype: type.value,
            productSubtypeLabel: type.label,
            typeAlias: step1.typeAlias,
            name: step1.name,
            minAmount: +step1.minAmount,
            increaseAmount: +step1.increaseAmount,
            interestRateAlias: step1.interestRateAlias,
            deadlineAlias: step1.deadlineAlias,
            description: step1.description,
            interest: {
              interestRate: +step1.interestRate
            },
            productTags: [],
            appInfo: {
              shelve: this.ruleForm.shelve === "是" ? "YES" : "NO",
              visaInterview:
                this.ruleForm.visaInterview === "是" ? "YES" : "NO",
              recommend: this.ruleForm.recommend === "是" ? "YES" : "NO",
              homePage: this.ruleForm.homePage === "是" ? "YES" : "NO",
              defaultBuyNum: +this.ruleForm.defaultBuyNum,
              defaultAmount: +this.ruleForm.defaultAmount,
              listAreaFlag: this.ruleForm.listAreaFlag,
              listAreaFlagLabel: "",
              sameProductFlag: this.ruleForm.sameProductFlag
            }
          };
          let jigou_d = xilieData.filter(
            item => item.institutionId === obj.institutionId
          )[0];

          obj.institutionName = jigou_d.institutionName;
          if (obj.seriesId != "") {
            obj.seriesName = jigou_d.seriesList.filter(
              item => item.id === obj.seriesId
            )[0].institutionName;
          }

          obj.appInfo.listAreaFlagLabel = obj.appInfo.listAreaFlag
            ? this.dictData.list_area_type.filter(
                item => item.value === obj.appInfo.listAreaFlag
              )[0].label
            : "";
          // 获取标签
          if (step1.marks.length > 0) {
            this.dictData.marks.forEach(item => {
              step1.marks.forEach(tar => {
                if (item.id === tar) {
                  obj.productTags.push({
                    id: tar,
                    name: item.name
                  });
                }
              });
            });
          }

          this.isSaveIng = true;
          this.$api
            .add_newHuoQi({
              vm: this,
              data: obj
            })
            .then(res => {
              this.isSaveIng = false;
              if (res.success) {
                this.isOk = true;
              }
            });
        } else {
          this.$message.error("请更正数据输入错误！");
        }
      });
    },
    isOver(type) {
      sessionStorage.setItem("page", "存款管理 ");
      if (type === "back") {
        this.$router.push({ name: `deposit_mainPage` });
      } else {
        sessionStorage.removeItem("huoqi_step1");
        sessionStorage.removeItem("huoqi_step2");
        this.$router.push({ name: `huoqi_step1` });
      }
    },
    // 取消
    back() {
      this.$router.push({
        name: "deposit_mainPage"
      });
    },
    // 上一步
    before() {
      sessionStorage.setItem("huoqi_step2", JSON.stringify(this.ruleForm));
      this.$router.push({
        name: "huoqi_step1"
      });
    }
  }
};
</script>