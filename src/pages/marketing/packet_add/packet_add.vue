<template>
  <div class="componentWaper">
    <div id="forHeader">
      <h3>{{pageName}}</h3>
    </div>

    <div id="forTable">
      <div class="formWaper" style="width:70%;margin-bottom:30px" v-if="!isOk">
        <el-form size="small" ref="formData" :model="formData" :rules="rules" label-width="80px">
          <el-form-item label="红包名称" prop="name">
            <el-input placeholder="请输入" v-model="formData.name"></el-input>
          </el-form-item>

          <el-form-item label="红包说明" prop="packetExplain">
            <el-input
              placeholder="红包说明，不显示在APP端，可为空"
              rows="3"
              type="textarea"
              v-model="formData.packetExplain"
            ></el-input>
          </el-form-item>

          <el-form-item label="红包类型" prop="amountType">
            <el-select
              v-model="formData.amountType"
              clearable
              placeholder="请选择"
              @change="howChange"
            >
              <el-option
                size="mini"
                v-for="item in typeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="总金额" prop="totalAmount">
            <el-input
              type="number"
              @input="clearNum"
              placeholder="请输入"
              v-model="formData.totalAmount"
            ></el-input>
          </el-form-item>

          <el-form-item label="总个数" prop="totalNum">
            <el-input
              type="number"
              @input="totalNumFn"
              class="forDays"
              placeholder="请输入"
              v-model="formData.totalNum"
            ></el-input>
          </el-form-item>

          <div v-if="formData.amountType==='FIXATION'">
            <el-form-item label="金额设置" prop="amountFixed">
              <el-input
                @input="moneyFn"
                type="number"
                class="forMoney"
                placeholder="请输入"
                v-model="formData.amountFixed"
              ></el-input>
            </el-form-item>
          </div>

          <div v-if="formData.amountType=== 'RANDOM'" class="setBetween">
            <el-form-item label="金额区间" prop="amountMin">
              <el-input
                type="number"
                class="setSize"
                placeholder="最低金额"
                v-model="formData.amountMin"
              ></el-input>
            </el-form-item>

            <el-form-item label-width="0" prop="amountMax">
              <el-input
                type="number"
                class="forMoney"
                placeholder="最高金额"
                v-model="formData.amountMax"
              ></el-input>
            </el-form-item>
          </div>

          <div v-if="formData.amountType=== 'RANDOM'">
            <div style="display:flex;">
              <el-form-item label="用户领取" prop="min">
                <el-input type="number" class="setGaiLv1" placeholder="最低金额" v-model="formData.min"></el-input>
              </el-form-item>
              <el-form-item label="-" label-width="30px" prop="max">
                <el-input type="number" class="setGaiLv" placeholder="最高金额" v-model="formData.max"></el-input>
              </el-form-item>

              <el-form-item label-width="0" prop="amountProb">
                <el-input
                  type="number"
                  class="forGaiLv"
                  placeholder="概率"
                  v-model="formData.amountProb"
                ></el-input>
              </el-form-item>
              <el-button
                class="addButton"
                :class="isAddGL?'hasAddTitleTip':''"
                @click="addGailv"
                type="danger"
                title="点击使用"
              >+</el-button>
            </div>
            <p class="hasAddTitle" :class="isAddGL?'hasAddTitleTip':''">已添加：累计概率为 {{+this.gailv}} %</p>
          </div>

          <div v-if=" showList.length>0" style="margin-bottom:10px;">
            <p @click="toDelete(item)" class="hasAdd" v-for="(item,index) in showList" :key="index">
              {{index+1}}：用户领取
              {{item.min}} ~
              {{item.max}}元的概率为：{{item.amountProb}}%
            </p>
          </div>

          <el-form-item label="发放类型" prop="grantType">
            <el-select v-model="formData.grantType" clearable placeholder="请选择">
              <el-option
                size="mini"
                v-for="item in outList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <div class="setBetween">
            <el-form-item prop="maxAmount" label="领取限制">
              <el-input
                type="number"
                class="setSize1"
                placeholder="最高金额"
                v-model="formData.maxAmount"
              ></el-input>
            </el-form-item>

            <el-form-item label-width="0" prop="maxNum">
              <el-input
                type="number"
                class="addDanWei"
                placeholder="最高数量"
                v-model="formData.maxNum"
              ></el-input>
              <span>(每个用户领券上限，如不填默认为一张)</span>
            </el-form-item>
          </div>
        </el-form>
        <div class="buttons">
          <el-button @click="step()" type="primary" :disabled="isSaveIng">保存</el-button>
          <el-button @click="reset" type="info">重 置</el-button>
        </div>
      </div>
      <hasSuccess @isOver="isOver" v-if="isOk" />
    </div>
  </div>
</template>
<script>
import hasSuccess from "../../../components/success.vue";

export default {
  components: { hasSuccess },
  data() {
    // 验证总金额
    var checkTotalMoney = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入数据"));
      } else if (value < 0) {
        callback(new Error("请输入正数"));
      } else if (("" + value).length > 23 || ("" + value).length < 0) {
        callback(new Error("请输入1-23字符"));
      } else {
        callback();
      }
    };
    // 验证数字
    var checkamountFixed = (rule, value, callback) => {
      let reg = /\./;
      if (reg.test(value)) {
        callback(new Error("请输入整数"));
      } else if (value === "") {
        callback(new Error("请输入数据"));
      } else if (value < 0) {
        callback(new Error("请输入正数"));
      } else if (("" + value).length > 11 || ("" + value).length < 0) {
        callback(new Error("请输入1-11字符"));
      } else {
        callback();
      }
    };
    // 验证数字
    var checkNum = (rule, value, callback) => {
      let reg = /\./;
      if (reg.test(value)) {
        callback(new Error("请输入整数"));
      } else if (value === "") {
        callback(new Error("请输入数据"));
      } else if (value < 0) {
        callback(new Error("请输入正数"));
      } else if (("" + value).length > 20 || ("" + value).length < 0) {
        callback(new Error("请输入1-20字符"));
      } else {
        callback();
      }
    };
    // 验证数字
    var checkNum2 = (rule, value, callback) => {
      let reg = /\./;
      if (reg.test(value)) {
        callback(new Error("请输入整数"));
      } else if (value < 0) {
        callback(new Error("请输入正数"));
      } else if (("" + value).length > 11 || ("" + value).length < 0) {
        callback(new Error("请输入1-11字符"));
      } else {
        callback();
      }
    };
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
      // 验证总金额
    var checkMaxAmount = (rule, value, callback) => {
     if (value < 0) {
        callback(new Error("请输入正数"));
      } else if (("" + value).length > 23 || ("" + value).length < 0) {
        callback(new Error("请输入1-23字符"));
      } else {
        callback();
      }
    };
    // 金额设置
    var checkMax = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入金额"));
      } else if (+value < +this.formData.amountMin) {
        callback(new Error("金额不能比最低金额小！"));
      } else if (("" + value).length > 23 || ("" + value).length < 0) {
        callback(new Error("请输入1-23字符"));
      } else {
        callback();
      }
    };
    // 用户领取最小金额、最大金额区间验证
    var checkBetween = (rule, value, callback) => {
      if (this.formData.min || this.formData.max) {
        if (+value < +this.formData.amountMin) {
          callback(new Error("金额不能小于最小金额！"));
        } else if (+value > +this.formData.amountMax) {
          callback(new Error("金额不能大于最大金额！"));
        } else if (
          this.formData.min &&
          this.formData.max &&
          +this.formData.min > +this.formData.max
        ) {
          callback(new Error("最小金额不能比最大金额大！"));
        } else if (("" + value).length > 23 || ("" + value).length < 0) {
          callback(new Error("请输入1-23字符"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    // 概率的检查
    var checkNumber = (rule, value, callback) => {
      let reg = /\./;
      if (reg.test(value)) {
        callback(new Error("请输入整数"));
      } else if (Number(this.gailv) + Number(value) > 100) {
        callback(new Error("累计概率不能高于 100%"));
      } else if (("" + value).length > 11 || ("" + value).length < 0) {
        callback(new Error("请输入1-11字符"));
      } else if (+value < 0) {
        callback(new Error("概率不能为负数！"));
      } else {
        callback();
      }
    };
    var checkBelow = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入金额"));
      } else if (Number(value) < 0) {
        callback(new Error("数值不能为负数"));
      } else if (("" + value).length > 23 || ("" + value).length < 0) {
        callback(new Error("请输入1-23字符"));
      } else {
        callback();
      }
    };

    return {
      inputTarget: false, // 用来确定是那个输入框
      timer: null, // 计算总个数和总金额
      isAddGL: false, // 如果没有添加概率，执行此项
      isSaveIng: false, // 切换保存按钮的可点击状态
      gailv: 0, // 已使用的累计概率
      showList: [],
      pageName: "",
      count: 1,
      isOk: false, // 表单填写完毕
      formData: {
        name: "", // 红包名称
        packetExplain: "", // 红包说明
        amountType: "", // 红包类型
        grantType: "", // 发放类型
        totalAmount: "", // 红包总金额
        totalNum: "", // 红包总个数
        maxAmount: "", // 上限金额
        maxNum: "1" // 上限个数
      },
      who: [], // 操作人
      typeList: [
        {
          label: "固定金额",
          value: "FIXATION"
        },
        {
          label: "随机金额",
          value: "RANDOM"
        }
      ],
      outList: [
        {
          label: "实时发放",
          value: "REALTIME"
        },
        {
          label: "人工发放",
          value: "MANUALWORK"
        }
      ],

      //表单验证
      rules: {
        name: [
          { min: 1, max: 64, message: "请输入1-64个字符", trigger: "blur" },
          { required: true, message: "请输入红包名称", trigger: "blur" }
        ],
        packetExplain: [
          { min: 1, max: 15, message: "请输入1-15个字符", trigger: "blur" }
        ],
        totalAmount: [{ validator: checkTotalMoney, trigger: "blur" }],
        totalNum: [{ validator: checkNum, trigger: "blur" }],
        maxAmount: [{ validator: checkMaxAmount, trigger: "blur" }],
        maxNum: [{ validator: checkNum2, trigger: "blur" }],
        amountType: [
          { required: true, message: "请输入红包类型", trigger: "blur" }
        ],
        grantType: [
          { required: true, message: "请输入发放类型", trigger: "change" }
        ],
        amountFixed: [{ validator: checkamountFixed, trigger: "blur" }], // 金额设置
        amountMin: [{ validator: checkBelow, trigger: "blur" }], // 最低金额
        amountMax: [{ validator: checkMax, trigger: "blur" }], // 最高金额
        min: [{ validator: checkBetween, trigger: "blur" }], // 最小金额
        max: [{ validator: checkBetween, trigger: "blur" }], // 最大金额
        amountProb: [{ validator: checkNumber, trigger: "blur" }] // 概率
      }
    };
  },
  watch: {
    // 实时动态显示已添加的概率
    showList(e) {
      this.gailv = 0;
      e.forEach(item => {
        this.gailv += Number(item.amountProb);
      });
    },
    $route() {
      if (!this.$route.query["id"]) {
        this.reset();
        this.isOk = false;
        this.pageName = sessionStorage.getItem("page");
      }
    }
  },
  mounted() {
    this.toInit();
  },
  methods: {
    clearNum() {
      this.$set(this.formData, "amountFixed", "");
      this.$set(this.formData, "totalNum", "");
    },
    // 固定金额，总个数变化后执行
    totalNumFn() {
      if (
        this.formData.amountType === "FIXATION" &&
        this.formData.totalAmount &&
        !this.inputTarget
      ) {
        this.inputTarget = true;
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          let jinE = +this.formData.totalAmount; // 总金额
          let geshu = +this.formData.totalNum; // 总个数
          let num = (jinE / geshu).toFixed(2);
          this.$set(this.formData, "amountFixed", num);
          this.inputTarget = false;
        }, 500);
      }
    },
    moneyFn() {
      if (
        this.formData.amountType === "FIXATION" &&
        this.formData.totalAmount &&
        !this.inputTarget
      ) {
        this.inputTarget = true;
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          let jinE = +this.formData.totalAmount; // 总金额
          let totalMoney = +this.formData.amountFixed; // 金额设置
          let num = Math.floor(jinE / totalMoney);
          this.$set(this.formData, "totalNum", num);
          this.inputTarget = false;
        }, 500);
      }
    },
    toInit() {
      this.pageName = sessionStorage.getItem("page");
      let id = this.$route.query["id"];
      if (id) {
        this.$api
          .market_packet_getInfo({
            vm: this,
            data: this.$route.query["id"]
          })
          .then(res => {
            let obj = {
              id: res.data.id,
              name: res.data.name,
              packetExplain: res.data.packetExplain,
              amountType: res.data.amountType,
              grantType: res.data.grantType,
              totalAmount: res.data.totalAmount,
              totalNum: res.data.totalNum,
              maxAmount: res.data.maxAmount,
              maxNum: res.data.maxNum
            };
            if (obj.amountType === "FIXATION") {
              obj.amountFixed = res.data.amountFixed;
            } else {
              obj.amountMin = res.data.amountMin;
              obj.amountMax = res.data.amountMax;
              obj.min = ""; // 暂存的最低值
              obj.max = ""; // 暂存的最高值
              obj.amountProb = ""; // 暂存的概率
              this.setShowList(res.data);
            }
            this.formData = { ...this.formData, ...obj };
          });
      }
    },
    // 设置累计使用的概率
    setShowList(data) {
      let arrs = [];
      if (data.probabilityList.length > 0) {
        let num = data.probabilityList.length - 1;
        for (let i = 0; i < data.probabilityList.length; i++) {
          let item = data.probabilityList[i];
          let index = i;
          if (index == 0) {
            arrs.push({
              min: data.amountMin,
              max: item.getAmount,
              amountProb: item.amountProb,
              num: this.count++
            });
          } else if (index == num) {
            arrs.push({
              min: arrs[index - 1]["max"],
              max: data.amountMax,
              amountProb: item.amountProb,
              num: this.count++
            });
          } else {
            arrs.push({
              min: arrs[index - 1]["max"],
              max: item.getAmount,
              amountProb: item.amountProb,
              num: this.count++
            });
          }
        }
      } else {
        arrs.push({
          min: data.amountMin,
          max: data.amountMax,
          amountProb: 100,
          num: this.count++
        });
      }
      this.showList = arrs;
    },
    reset() {
      let id = this.$route.query["id"];

      new Promise(res => {
        this.formData = {
          name: "",
          packetExplain: "",
          amountType: "",
          grantType: "",
          totalAmount: "",
          totalNum: "",
          maxAmount: "",
          maxNum: "1"
        };
        this.showList = [];
        res();
      }).then(() => {
        if (id) {
          this.toInit();
        }
      });
    },
    isOver(type) {
      sessionStorage.clear();
      if (type === "back") {
        sessionStorage.setItem("page", "活动列表");
        this.$router.push({ name: `packet_list` });
      } else {
        sessionStorage.setItem("page", "创建红包");
        this.$router.push({ name: `packet_add` });
        this.isOk = false;
      }
    },
    // 金额类型设置
    howChange() {
      delete this.formData.amountFixed;
      delete this.formData.amountMin;
      delete this.formData.amountMax;
      delete this.formData.min;
      delete this.formData.max;
      delete this.formData.amountProb;
      delete this.formData.probabilityList;

      let obj = { ...this.formData };
      if (this.formData.amountType === "FIXATION") {
        obj.amountFixed = "";
      } else {
        obj.amountMin = "";
        obj.amountMax = "";
        obj.min = "";
        obj.max = "";
        obj.amountProb = "";
        obj.probabilityList = [];
        this.formData = obj;
      }
      this.showList = [];
    },
    // 添加概率
    addGailv() {
      if (this.formData.max && this.formData.min && this.formData.amountProb) {
        if (
          +this.formData.max <= +this.formData.amountMax &&
          +this.formData.min >= +this.formData.amountMin
        ) {
          let nums = Number(this.gailv) + Number(this.formData.amountProb);
          if (nums <= 100) {
            this.showList.push({
              min: this.formData.min,
              max: this.formData.max,
              amountProb: this.formData.amountProb,
              num: this.count++
            });
            this.formData.min = "";
            this.formData.max = "";
            this.formData.amountProb = "";
          } else {
            this.$message.error("累计概率大于100%了！");
          }
        } else {
          this.$message.error(
            `用户可领取的金额应在${this.formData.amountMin} - ${this.formData.amountMax}之间！`
          );
        }
      } else {
        this.$message.error("请输入完数据再添加新的！");
      }
    },
    // 删除已添加的概率
    toDelete(item) {
      this.showList = this.showList.filter(tar => tar.num != item.num);
    },
    step() {
      this.$refs.formData.validate(valid => {
        if (valid) {
          let httpType = "";
          let obj = {};
          let id = this.$route.query["id"];

          if (id) {
            httpType = "put";
            obj = {
              id: this.formData.id,
              name: this.formData.name,
              packetExplain: this.formData.packetExplain,
              amountType: this.formData.amountType,
              amountFixed: this.formData.amountFixed,
              amountMin: this.formData.amountMin
                ? this.formData.amountMin
                : null,
              amountMax: this.formData.amountMax
                ? this.formData.amountMax
                : null,
              grantType: this.formData.grantType,
              totalAmount: this.formData.totalAmount,
              totalNum: this.formData.totalNum,
              maxAmount: this.formData.maxAmount,
              maxNum: this.formData.maxNum
            };
          } else {
            httpType = "post";
            obj = {
              name: this.formData.name,
              packetExplain: this.formData.packetExplain,
              amountType: this.formData.amountType,
              amountFixed: +this.formData.amountFixed,
              amountMin: this.formData.amountMin
                ? this.formData.amountMin
                : null,
              amountMax: this.formData.amountMax
                ? this.formData.amountMax
                : null,
              grantType: this.formData.grantType,
              totalAmount: +this.formData.totalAmount,
              totalNum: +this.formData.totalNum,
              maxAmount: +this.formData.maxAmount,
              maxNum: +this.formData.maxNum
            };
            if (this.formData.amountType === "FIXATION") {
              delete obj.amountMin;
              delete obj.amountMax;
              delete obj.probabilityList;
            } else {
              delete obj.amountFixed;
              if (this.showList.length === 0) {
                this.$message.error("请添加随机概率！");
                this.isAddGL = true;
                setTimeout(() => (this.isAddGL = false), 6000);
                return;
              }
            }
          }
          if (this.formData.amountType !== "FIXATION") {
            obj.probabilityList = [];
            this.showList.forEach(item => {
              let obj1 = {
                getAmount: item.max,
                amountProb: item.amountProb
              };
              obj.probabilityList.push(obj1);
            });
          }
          this.isSaveIng = true;
          this.$api
            .market_packet_upPacket({
              vm: this,
              method: httpType,
              data: obj
            })
            .then(res => {
              this.isSaveIng = false;
              if (res) {
                this.isOk = true;
              }
            });
        } else {
          this.$message.error("请输入完整的信息！");
        }
      });
    }
  }
};
</script>

<style scoped='true' lang="scss">
.formWaper {
  width: 50%;
  min-width: 500px;
  padding: 20px;
  margin: 0 auto;
  margin-left: 20%;
  overflow: auto;
}
.buttons {
  display: flex;
  justify-content: space-between;
  margin: 20px auto;
  padding-left: 60px;
  width: 60%;
}
.addDanWei,
.setSize,
.setSize1,
.forMoney,
.forGaiLv,
.setGaiLv,
.setGaiLv1,
.forDays {
  width: 134px;
  position: relative;
}
.addDanWei + span {
  position: absolute;
  left: 0px;
  top: 40px;
  display: inline-block;
  width: 220px;
  vertical-align: middle;
  color: rgb(182, 180, 180);
  font-size: 12px;
}
.addDanWei::after {
  content: "张";
  position: absolute;
  right: -20px;
  top: 0;
  font-weight: bold;
  font-size: 14px;
  color: rgb(99, 97, 97);
}
.forMoney::after {
  content: "元";
  position: absolute;
  right: -20px;
  top: 0;
  font-weight: bold;
  font-size: 14px;
  color: rgb(99, 97, 97);
}
.forDays::after {
  content: "个";
  position: absolute;
  right: -20px;
  top: 0;
  font-weight: bold;
  font-size: 14px;
  color: rgb(99, 97, 97);
}
.setBetween {
  display: flex;
}
.setSize {
  margin-right: 30px;
}
.setSize::after {
  content: "-";
  position: absolute;
  right: -18px;
  top: 0;
  font-weight: bold;
  font-size: 14px;
  color: rgb(99, 97, 97);
}
.setSize1 {
  margin-right: 30px;
}
.setSize1::after {
  content: "元";
  position: absolute;
  right: -18px;
  top: 0;
  font-weight: bold;
  font-size: 14px;
  color: rgb(99, 97, 97);
}
.forGaiLv::after {
  content: "%";
  position: absolute;
  right: -18px;
  top: 0;
  font-weight: bold;
  font-size: 14px;
  color: rgb(99, 97, 97);
}
.setGaiLv {
  margin-right: 60px;
}
.setGaiLv::after {
  content: "元 的概率";
  position: absolute;
  right: -55px;
  top: 0;
  font-weight: bold;
  font-size: 12px;
  color: rgb(99, 97, 97);
}
.addButton {
  width: 30px;
  height: 25px;
  margin: 5px 0 0 25px;
  padding: 0 8px;
}
.hasAdd {
  font-size: 12px;
  padding: 3px 0 3px 60px;
  color: rgb(105, 104, 104);
  letter-spacing: 1px;
  position: relative;
  margin-bottom: 2px;
}
.hasAdd:hover {
  background: rgb(238, 238, 238);
  cursor: pointer;
}
.hasAdd:hover::before {
  content: "可以点击删除";
  font-size: 12px;
  color: rgb(105, 104, 104);
  position: absolute;
  right: 5px;
  top: 3px;
}
</style>
