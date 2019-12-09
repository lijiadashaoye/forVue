<template>
  <div class="AddTiaoJianPage">
    <div class="pageTop">
      <p>配置条件</p>
      <i class="el-icon-close" @click="close"></i>
    </div>
    <div style="height:calc(100% - 43px);overflow-y: auto;padding:15px;">
      <el-form ref="ruleForm" :rules="rules" :model="ruleForm" label-width="124px" label-suffix="：">
        <el-form-item label="配置可见条件" style="margin-bottom:5px;">
          <el-radio-group v-model="ruleForm.canSee">
            <el-radio label="可见条件"></el-radio>
            <el-radio label="不可见条件"></el-radio>
          </el-radio-group>
        </el-form-item>

        <p class="pagePart">用户管理配置</p>

        <el-form-item label="年龄">
          <div class="setCunQi">
            <p v-if="hasError.age.act" class="hasError">{{hasError.age.content}}</p>
            <el-select
              filterable
              size="mini"
              placeholder="限制条件"
              v-model="ruleForm.minAge_symbol"
              style="width:15%;flex-shrink:0;"
              @change="validAge"
            >
              <el-option
                v-for="item in dictData.forAge"
                :key="item.value"
                :label="item.fuhao +' '+ item.label"
                :value="item.value"
              ></el-option>
            </el-select>&nbsp;
            <el-input
              min="0"
              max="9999999999"
              size="mini"
              @input="validAge"
              type="number"
              style="width:15%;flex-shrink:0;"
              v-model="ruleForm.minAge"
              placeholder="请输入"
            ></el-input>
            <span class="ageBack">岁</span>
            <el-radio-group v-model="ruleForm.age_fuhao" size="mini" @change="validAge">
              <el-radio-button label="且"></el-radio-button>
              <el-radio-button label="或"></el-radio-button>
            </el-radio-group>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-select
              filterable
              size="mini"
              @change="validAge"
              placeholder="限制条件"
              v-model="ruleForm.maxAge_symbol"
              style="width:15%;flex-shrink:0;"
            >
              <el-option
                v-for="item in dictData.forAge"
                :key="item.value"
                :label="item.fuhao +' '+ item.label"
                :value="item.value"
              ></el-option>
            </el-select>&nbsp;
            <el-input
              min="0"
              max="9999999999"
              size="mini"
              @input="validAge"
              type="number"
              style="width:15%;flex-shrink:0;"
              v-model="ruleForm.maxAge"
              placeholder="最大期限"
            ></el-input>
            <span class="ageBack">岁</span>

            <el-button size="mini" type="info" @click="resetAge" class="resetBtn">重 置</el-button>
          </div>
        </el-form-item>

        <p style="font-size: 14px;color: #606266;padding-bottom:10px;">
          比财注册状态与时间:
          <el-button size="mini" type="info" @click="resetSta" class="resetBtn">重 置</el-button>
        </p>
        <div class="forSta">
          <el-form-item label="状态" style="margin-bottom:0;">
            <el-radio-group v-model="ruleForm.statue">
              <el-radio label="已注册"></el-radio>
              <el-radio label="未注册"></el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="配置时间" style="  position: relative;">
            <p v-if="hasError.time.act" class="hasError">{{hasError.time.content}}</p>

            <el-select
              :disabled="!ruleForm.statue"
              size="mini"
              placeholder="限制条件"
              v-model="ruleForm.time1_symbol"
              style="width:12%;flex-shrink:0;"
              @change="validStatue"
            >
              <el-option
                v-for="item in dictData.forAge"
                :key="item.value"
                :label="item.fuhao +' '+ item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-date-picker
              :disabled="!ruleForm.statue"
              v-model="ruleForm.time1"
              size="mini"
              type="datetime"
              @change="validStatue"
              placeholder="请选择时间"
            ></el-date-picker>&nbsp;&nbsp;&nbsp;&nbsp;
            <el-radio-group
              :disabled="!ruleForm.statue"
              v-model="ruleForm.time1_time2"
              size="mini"
              @change="validStatue"
            >
              <el-radio-button label="且"></el-radio-button>
              <el-radio-button label="或"></el-radio-button>
            </el-radio-group>&nbsp;&nbsp;&nbsp;&nbsp;
            <el-select
              filterable
              :disabled="!ruleForm.statue"
              size="mini"
              placeholder="限制条件"
              v-model="ruleForm.time2_symbol"
              style="width:12%;flex-shrink:0;"
              @change="validStatue"
            >
              <el-option
                v-for="item in dictData.forAge"
                :key="item.value"
                :label="item.fuhao +' '+ item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-date-picker
              :disabled="!ruleForm.statue"
              v-model="ruleForm.time2"
              @change="validStatue"
              size="mini"
              type="datetime"
              placeholder="请选择时间"
            ></el-date-picker>
          </el-form-item>
        </div>

        <el-form-item style="margin-bottom:5px;" label="比财实名状态">
          <el-radio-group v-model="ruleForm.realName">
            <el-radio label="已实名"></el-radio>
            <el-radio label="未实名"></el-radio>
          </el-radio-group>
          <el-button size="mini" type="info" @click="ruleForm.realName=''" class="resetBtn">重 置</el-button>
        </el-form-item>
        <el-form-item style="margin-bottom:5px;" label="比财开户状态">
          <el-radio-group v-model="ruleForm.kaihu">
            <el-radio label="已开户"></el-radio>
            <el-radio label="未开户"></el-radio>
          </el-radio-group>
          <el-button size="mini" type="info" @click="ruleForm.kaihu=''" class="resetBtn">重 置</el-button>
        </el-form-item>
        <el-form-item style="margin-bottom:5px;" label="比财投资状态">
          <el-radio-group v-model="ruleForm.touzi">
            <el-radio label="已投资"></el-radio>
            <el-radio label="未投资"></el-radio>
          </el-radio-group>
          <el-button size="mini" type="info" @click="ruleForm.touzi=''" class="resetBtn">重 置</el-button>
        </el-form-item>
        <el-form-item style="margin-bottom:5px;" label="比财持仓状态">
          <el-radio-group v-model="ruleForm.chicang">
            <el-radio label="已持仓"></el-radio>
            <el-radio label="未持仓"></el-radio>
          </el-radio-group>
          <el-button size="mini" type="info" @click="ruleForm.chicang=''" class="resetBtn">重 置</el-button>
        </el-form-item>

        <el-form-item label="比财持仓金额">
          <div class="setCunQi">
            <p v-if="hasError.chicang.act" class="hasError">{{hasError.chicang.content}}</p>
            <el-select
              filterable
              size="mini"
              placeholder="限制条件"
              v-model="ruleForm.minChiCang_symbol"
              style="width:15%;flex-shrink:0;"
              @change="validChiCang"
            >
              <el-option
                v-for="item in dictData.forAge"
                :key="item.value"
                :label="item.fuhao +' '+ item.label"
                :value="item.value"
              ></el-option>
            </el-select>&nbsp;
            <el-tooltip
              :content="danwei(ruleForm.minChiCang).content"
              placement="bottom"
              effect="light"
              manual
              :value="danwei(ruleForm.minChiCang).show"
            >
              <el-input
                min="0"
                max="9999999999"
                size="mini"
                @input="validChiCang"
                type="number"
                style="width:15%;flex-shrink:0;"
                v-model="ruleForm.minChiCang"
                placeholder="请输入金额"
              ></el-input>
            </el-tooltip>

            <span class="ageBack">元</span>
            <el-radio-group v-model="ruleForm.ChiCang_fuhao" size="mini" @change="validChiCang">
              <el-radio-button label="且"></el-radio-button>
              <el-radio-button label="或"></el-radio-button>
            </el-radio-group>&nbsp;&nbsp;&nbsp;&nbsp;
            <el-select
              filterable
              size="mini"
              @change="validChiCang"
              placeholder="限制条件"
              v-model="ruleForm.maxChiCang_symbol"
              style="width:15%;flex-shrink:0;"
            >
              <el-option
                v-for="item in dictData.forAge"
                :key="item.value"
                :label="item.fuhao +' '+ item.label"
                :value="item.value"
              ></el-option>
            </el-select>&nbsp;
            <el-tooltip
              :content="danwei(ruleForm.maxChiCang).content"
              placement="bottom"
              effect="light"
              manual
              :value="danwei(ruleForm.maxChiCang).show"
            >
              <el-input
                min="0"
                max="9999999999"
                size="mini"
                @input="validChiCang"
                type="number"
                style="width:15%;flex-shrink:0;"
                v-model="ruleForm.maxChiCang"
                placeholder="请输入金额"
              ></el-input>
            </el-tooltip>

            <span class="ageBack">元</span>
            <el-button size="mini" type="info" @click="resetChiCang" class="resetBtn">重 置</el-button>
          </div>
        </el-form-item>

        <p style="font-size: 14px;color: #606266;padding-bottom:10px;">
          本银行开户状态与时间:
          <el-button size="mini" type="info" @click="resetBank" class="resetBtn">重 置</el-button>
        </p>
        <div class="forSta">
          <el-form-item label="状态" style="margin-bottom:0;">
            <el-radio-group v-model="ruleForm.bankStatue">
              <el-radio label="已开户"></el-radio>
              <el-radio label="未开户"></el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="配置时间" style="  position: relative;">
            <p v-if="hasError.bank.act" class="hasError">{{hasError.bank.content}}</p>

            <el-select
              filterable
              :disabled="!ruleForm.bankStatue"
              size="mini"
              placeholder="限制条件"
              v-model="ruleForm.bank1_symbol"
              style="width:12%;flex-shrink:0;"
              @change="validBankStatue"
            >
              <el-option
                v-for="item in dictData.forAge"
                :key="item.value"
                :label="item.fuhao +' '+ item.label"
                :value="item.value"
              ></el-option>
            </el-select>&nbsp;
            <el-date-picker
              :disabled="!ruleForm.bankStatue"
              v-model="ruleForm.bank1"
              size="mini"
              type="datetime"
              @change="validBankStatue"
              placeholder="请选择时间"
            ></el-date-picker>&nbsp;&nbsp;&nbsp;&nbsp;
            <el-radio-group
              :disabled="!ruleForm.bankStatue"
              v-model="ruleForm.bank1_bank2"
              size="mini"
              @change="validBankStatue"
            >
              <el-radio-button label="且"></el-radio-button>
              <el-radio-button label="或"></el-radio-button>
            </el-radio-group>&nbsp;&nbsp;&nbsp;&nbsp;
            <el-select
              filterable
              :disabled="!ruleForm.bankStatue"
              size="mini"
              placeholder="限制条件"
              v-model="ruleForm.bank2_symbol"
              style="width:12%;flex-shrink:0;"
              @change="validBankStatue"
            >
              <el-option
                v-for="item in dictData.forAge"
                :key="item.value"
                :label="item.fuhao +' '+ item.label"
                :value="item.value"
              ></el-option>
            </el-select>&nbsp;
            <el-date-picker
              :disabled="!ruleForm.bankStatue"
              v-model="ruleForm.bank2"
              @change="validBankStatue"
              size="mini"
              type="datetime"
              placeholder="请选择时间"
            ></el-date-picker>
          </el-form-item>
        </div>

        <el-form-item style="margin-bottom:5px;" label="本银行投资状态">
          <el-radio-group v-model="ruleForm.bankTouZi">
            <el-radio label="已投资"></el-radio>
            <el-radio label="未投资"></el-radio>
          </el-radio-group>
          <el-button size="mini" type="info" @click="ruleForm.bankTouZi=''" class="resetBtn">重 置</el-button>
        </el-form-item>

        <el-form-item style="margin-bottom:5px;" label="本银行持仓状态">
          <el-radio-group v-model="ruleForm.bankChiCang">
            <el-radio label="有持仓"></el-radio>
            <el-radio label="无持仓"></el-radio>
          </el-radio-group>
          <el-button size="mini" type="info" @click="ruleForm.bankChiCang=''" class="resetBtn">重 置</el-button>
        </el-form-item>

        <el-form-item label="本银行持仓金额">
          <div class="setCunQi">
            <p v-if="hasError.bankChiCang.act" class="hasError">{{hasError.bankChiCang.content}}</p>
            <el-select
              filterable
              size="mini"
              placeholder="限制条件"
              v-model="ruleForm.minBankChiCang_symbol"
              style="width:15%;flex-shrink:0;"
              @change="validBankChiCang"
            >
              <el-option
                v-for="item in dictData.forAge"
                :key="item.value"
                :label="item.fuhao +' '+ item.label"
                :value="item.value"
              ></el-option>
            </el-select>&nbsp;
            <el-tooltip
              :content="danwei(ruleForm.minBankChiCang).content"
              placement="bottom"
              effect="light"
              manual
              :value="danwei(ruleForm.minBankChiCang).show"
            >
              <el-input
                min="0"
                max="9999999999"
                size="mini"
                @input="validBankChiCang"
                type="number"
                style="width:15%;flex-shrink:0;"
                v-model="ruleForm.minBankChiCang"
                placeholder="请输入金额"
              ></el-input>
            </el-tooltip>
            <span class="ageBack">元</span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <el-radio-group
              v-model="ruleForm.bankChiCang_fuhao"
              size="mini"
              @change="validBankChiCang"
            >
              <el-radio-button label="且"></el-radio-button>
              <el-radio-button label="或"></el-radio-button>
            </el-radio-group>&nbsp;&nbsp;&nbsp;&nbsp;
            <el-select
              filterable
              size="mini"
              @change="validBankChiCang"
              placeholder="限制条件"
              v-model="ruleForm.maxBankChiCang_symbol"
              style="width:15%;flex-shrink:0;"
            >
              <el-option
                v-for="item in dictData.forAge"
                :key="item.value"
                :label="item.fuhao +' '+ item.label"
                :value="item.value"
              ></el-option>
            </el-select>&nbsp;
            <el-tooltip
              :content="danwei(ruleForm.maxBankChiCang).content"
              placement="bottom"
              effect="light"
              manual
              :value="danwei(ruleForm.maxBankChiCang).show"
            >
              <el-input
                min="0"
                max="9999999999"
                size="mini"
                @input="validBankChiCang"
                type="number"
                style="width:15%;flex-shrink:0;"
                v-model="ruleForm.maxBankChiCang"
                placeholder="请输入金额"
              ></el-input>
            </el-tooltip>

            <span class="ageBack">元</span>
            <el-button size="mini" type="info" @click="resetBankChiCang" class="resetBtn">重 置</el-button>
          </div>
        </el-form-item>

        <p class="canDelete">
          限制地域:
          <span v-if="hasError.canDelete.act">{{hasError.canDelete.content}}</span>
        </p>
        <el-form-item prop="areaTJ" label-width="0" style="margin-bottom:0;">
          <Area
            @areaAction="areaAction"
            v-for="(tar,index) in ruleForm.areaTJ"
            :key="index"
            :data="tar"
            ref="child"
          />
        </el-form-item>
        <p class="add_new_area" @click="areaAction({type:'add'})">新增限制地域</p>

        <p class="pagePart">
          营销管理配置
          <span>(*以下条件至少配置一项)</span>
          <el-button size="mini" type="primary" @click="selectAll">全 选</el-button>
        </p>

        <p style="font-size: 14px;color: #606266;padding-bottom:10px;">
          产品展示位置与时间:
          <el-button size="mini" type="info" @click="resetSide" class="resetBtn">重 置</el-button>
        </p>

        <div class="forSta">
          <el-form-item label="位置" style="margin-bottom:0;">
            <el-select
              multiple
              filterable
              size="mini"
              placeholder="限制条件"
              v-model="ruleForm.side"
              style="width:50%"
              @change="timeAction({type:'new'})"
            >
              <el-option
                v-for="item in list"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="时间" style="  position: relative;">
            <div class="setTime">
              <TimeSide
                ref="sideTime"
                @timeaction="timeAction"
                v-for="tar in ruleForm.time"
                :key="tar.num"
                :data="tar"
              />
            </div>
            <p class="add_new_area" @click="timeAction({type:'add'})" style="padding:0;">新增限制位置时间</p>
          </el-form-item>
        </div>

        <el-form-item label="广告位">
          <el-select
            filterable
            multiple
            size="mini"
            placeholder="请选择广告位"
            v-model="ruleForm.ad_side"
            style="width:50%"
          >
            <el-option
              v-for="item in list"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-button size="mini" type="info" @click="ruleForm.ad_side=[]" class="resetBtn">重 置</el-button>
        </el-form-item>
        <el-form-item label="活动">
          <el-select
            filterable
            multiple
            size="mini"
            placeholder="请选择活动"
            v-model="ruleForm.active"
            style="width:50%;"
          >
            <el-option
              v-for="item in list"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-button size="mini" type="info" @click="ruleForm.active=[]" class="resetBtn">重 置</el-button>
        </el-form-item>
        <el-form-item label="内容">
          <el-select
            filterable
            multiple
            size="mini"
            placeholder="请选择内容"
            v-model="ruleForm.content"
            style="width:50%"
          >
            <el-option
              v-for="item in list"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-button size="mini" type="info" @click="ruleForm.content=[]" class="resetBtn">重 置</el-button>
        </el-form-item>

        <el-form-item label="创新层">
          <el-radio-group v-model="ruleForm.chuang" size="mini">
            <el-radio label="组合购买"></el-radio>
          </el-radio-group>
          <el-button size="mini" type="info" @click="ruleForm.chuang=''" class="resetBtn">重 置</el-button>
        </el-form-item>

        <el-form-item>
          <el-button size="mini" type="primary" @click="save">保存</el-button>
          <el-button size="mini" type="info" @click="close">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Area from "./area.vue";
import TimeSide from "./time_side.vue";
export default {
  components: { Area, TimeSide },
  data() {
    // 验证数字
    var check_areaTJ = (rule, value, callback) => {
      console.log(value);
      // if (+value < 0 || +value >= 10000000 || !value) {
      //   callback(new Error("请输入0--10000000正数"));
      // } else {
      //   this.ruleForm.purchaseAmount = (+value).toFixed(2);
      //   callback();
      // }
    };

    return {
      time: null,
      env: "",
      pageName: "",
      num: 1,
      hasError: {
        hasError: false,
        // 页面内各种验证的错误提示
        age: {
          // 年龄
          act: false,
          content: ""
        },
        time: {
          // 比财注册状态与时间
          act: false,
          content: ""
        },
        chicang: {
          // 比财持仓金额
          act: false,
          content: ""
        },
        bank: {
          // 本银行开户状态与时间
          act: false,
          content: ""
        },
        bankChiCang: {
          // 本银行持仓金额
          act: false,
          content: ""
        },
        canDelete: {
          // 限制地域的错误提示
          act: false,
          content: ""
        }
      },
      ruleForm: {
        canSee: "可见条件", // 可见条件
        minAge: "", // 左边年龄
        minAge_symbol: "", // 左边年龄的符号
        maxAge: "", // 右边年龄
        maxAge_symbol: "", // 右边年龄的符号
        age_fuhao: "", // 中间的且、或
        statue: "", // 状态
        time1: "", // 左边的时间
        time1_symbol: "", // 左边时间的符号
        time2: "", // 右边的时间
        time2_symbol: "", // 右边时间的符号
        time1_time2: "", // 时间中间的且或
        realName: "", //比财实名状态
        kaihu: "", //比财开户状态
        touzi: "", //比财投资状态
        chicang: "", //比财持仓状态
        minChiCang: "", // 左边持仓
        minChiCang_symbol: "", // 左边持仓的符号
        maxChiCang: "", // 右边持仓
        maxChiCang_symbol: "", // 右边持仓的符号
        ChiCang_fuhao: "", // 中间的且、或
        bankStatue: "", // 状态
        bank1: "", // 左边的时间
        bank1_symbol: "", // 左边时间的符号
        bank2: "", // 右边的时间
        bank2_symbol: "", // 右边时间的符号
        bank1_bank2: "", // 时间中间的且或
        minBankChiCang: "", // 左边持仓
        minBankChiCang_symbol: "", // 左边持仓的符号
        maxBankChiCang: "", // 右边持仓
        maxBankChiCang_symbol: "", // 右边持仓的符号
        bankChiCang_fuhao: "", // 中间的且、或
        bankTouZi: "", //本银行投资状态
        bankChiCang: "", //本银行持仓状态
        areaTJ: [], //地域限制条件
        side: [], // 位置
        time: [], // 时间数据
        ad_side: [], // 广告位
        active: [], // 活动
        content: [], // 内容
        chuang: "" // 创新层
      },

      list: [
        {
          value: "value1",
          label: "label1"
        },
        {
          value: "value2",
          label: "label3"
        }
      ],

      rules: {
        areaTJ: [{ required: true, validator: check_areaTJ, trigger: "blur" }]
      }
    };
  },
  created() {
    this.env = sessionStorage.getItem("env") === "development";
    this.pageName = sessionStorage.getItem("page"); // 获取页面名称
    this.dictData = JSON.parse(sessionStorage.getItem("dict"));

    this.$store.state.areaList = this.dictData.china;
    this.ruleForm.areaTJ.push({
      num: this.num++,
      sheng: "",
      shi: [],
      tiaojian: []
    });
  },
  methods: {
    deepCopy(data) {
      // 只接收数组
      let arr = [];
      for (let i = 0; i < data.length; i++) {
        let obj = {};
        Object.keys(data[i]).forEach(str => {
          if (
            typeof data[i][str] === "string" ||
            typeof data[i][str] === "number"
          ) {
            obj[str] = data[i][str];
          } else {
            obj[str] = []; // children
            data[i][str].forEach(tar => {
              let k = {};
              Object.keys(tar).forEach(str1 => {
                k[str1] = tar[str1];
              });
              obj[str].push(k);
            });
          }
        });
        arr.push(obj);
      }
      return arr;
    },
    // 过滤省市字典数据
    toFilterList() {
      let china = this.deepCopy(this.dictData.china), // 神拷贝一下
        hasSelect = this.ruleForm.areaTJ;
      for (let i = hasSelect.length; i--; ) {
        if (hasSelect[i].sheng) {
          let sheng = china.filter(tar => tar.adcode === hasSelect[i].sheng)[0]; // 获取省对应的字典列表数据
          let shi = hasSelect[i].shi; // 获取已经选择的市

          for (let j = china.length; j--; ) {
            // 遍历字典数据，将已使用的省、市排除，再重新生成给子组件使用的下拉数据
            if (shi.length && china[j].adcode === hasSelect[i].sheng) {
              china[j].children = china[j].children.filter(
                tar => !shi.includes(tar.adcode)
              );

              if (china[j].children.length === 0) {
                // 如果市全部选中，则清除省
                china = china.filter(tar => tar.adcode != hasSelect[i].sheng);
              }
            } else {
              china[j].children = china[j].children;
              continue;
            }
          }
        }
      }
      this.$store.state.areaList = china;
      this.$refs.child.forEach(tar => {
        setTimeout(() => {
          tar.regetList();
        });
      });
    },

    save() {
      if (
        this.ruleForm.side.length === 0 ||
        this.ruleForm.side.time === 0 ||
        this.ruleForm.side.ad_side === 0 ||
        this.ruleForm.side.active === 0 ||
        this.ruleForm.side.content === 0 ||
        this.ruleForm.side.chuang === ""
      ) {
        this.$message.error("营销管理配置至少配置一项!");
      } else {
        console.log(this.ruleForm);
        // this.$emit("TiaoJianEmit", { kk: 9 });
      }
    },
    close() {
      if (true) {
        this.$confirm("是否暂存已填写的数据?", "提示", {
          confirmButtonText: "是",
          cancelButtonText: "否",
          type: "warning"
        })
          .then(() => {
            this.$emit("TiaoJianEmit", this.ruleForm);
            setTimeout(this.resetAll, 2000);
          })
          .catch(() => {
            this.$emit("TiaoJianEmit");
            setTimeout(this.resetAll, 2000);
          });
      } else {
        this.$emit("TiaoJianEmit");
        setTimeout(this.resetAll, 2000);
      }
    },
    // 重置年龄
    resetAge() {
      this.ruleForm.minAge = "";
      this.ruleForm.minAge_symbol = "";
      this.ruleForm.maxAge = "";
      this.ruleForm.maxAge_symbol = "";
      this.ruleForm.age_fuhao = "";
      this.hasError.age.act = false;
      this.hasError.age.content = "";
    },
    // 对年龄设置进行验证
    validAge() {
      let obj = {
        left: this.ruleForm.minAge,
        left_symbol: this.ruleForm.minAge_symbol,
        right: this.ruleForm.maxAge,
        right_symbol: this.ruleForm.maxAge_symbol,
        fuhao: this.ruleForm.age_fuhao,
        errorObj: this.hasError.age
      };
      this.forValid(obj);
    },

    // 重置比财注册状态与时间
    resetSta() {
      this.ruleForm.statue = ""; // 状态
      this.ruleForm.time1 = ""; // 左边的时间
      this.ruleForm.time1_symbol = ""; // 左边时间的符号
      this.ruleForm.time2 = ""; // 右边的时间
      this.ruleForm.time2_symbol = ""; // 右边时间的符号
      this.ruleForm.time1_time2 = ""; // 时间中间的且或
      this.hasError.time.act = false;
      this.hasError.time.content = "";
    },
    validStatue() {
      let obj = {
        left: this.ruleForm.time1,
        left_symbol: this.ruleForm.time1_symbol,
        right: this.ruleForm.time2,
        right_symbol: this.ruleForm.time2_symbol,
        fuhao: this.ruleForm.time1_time2,
        errorObj: this.hasError.time
      };
      this.forValid(obj);
    },

    // 重置比财持仓状态与时间
    resetChiCang() {
      this.ruleForm.minChiCang = ""; // 左边持仓
      this.ruleForm.minChiCang_symbol = ""; // 左边持仓的符号
      this.ruleForm.maxChiCang = ""; // 右边的持仓
      this.ruleForm.maxChiCang_symbol = ""; // 右边持仓的符号
      this.ruleForm.ChiCang_fuhao = ""; // 持仓中间的且或
      this.hasError.chicang.act = false;
      this.hasError.chicang.content = "";
    },
    validChiCang() {
      let obj = {
        left: this.ruleForm.minChiCang,
        left_symbol: this.ruleForm.minChiCang_symbol,
        right: this.ruleForm.maxChiCang,
        right_symbol: this.ruleForm.maxChiCang_symbol,
        fuhao: this.ruleForm.ChiCang_fuhao,
        errorObj: this.hasError.chicang
      };
      this.forValid(obj);
    },

    // 本银行开户状态与时间
    resetBank() {
      this.ruleForm.bankStatue = ""; // 状态
      this.ruleForm.bank1 = ""; // 左边的时间
      this.ruleForm.bank1_symbol = ""; // 左边时间的符号
      this.ruleForm.bank2 = ""; // 右边的时间
      this.ruleForm.bank2_symbol = ""; // 右边时间的符号
      this.ruleForm.bank1_bank2 = ""; // 时间中间的且或
      this.hasError.bank.act = false;
      this.hasError.bank.content = "";
    },
    validBankStatue() {
      let obj = {
        left: this.ruleForm.bank1,
        left_symbol: this.ruleForm.bank1_symbol,
        right: this.ruleForm.bank2,
        right_symbol: this.ruleForm.bank2_symbol,
        fuhao: this.ruleForm.bank1_bank2,
        errorObj: this.hasError.bank
      };
      this.forValid(obj);
    },

    // 重置本银行持仓状态与时间
    resetBankChiCang() {
      this.ruleForm.minBankChiCang = ""; // 左边持仓
      this.ruleForm.minBankChiCang_symbol = ""; // 左边持仓的符号
      this.ruleForm.maxBankChiCang = ""; // 右边的持仓
      this.ruleForm.maxBankChiCang_symbol = ""; // 右边持仓的符号
      this.ruleForm.bankChiCang_fuhao = ""; // 持仓中间的且或
      this.hasError.bankChiCang.act = false;
      this.hasError.bankChiCang.content = "";
    },
    validBankChiCang() {
      let obj = {
        left: this.ruleForm.minBankChiCang,
        left_symbol: this.ruleForm.minBankChiCang_symbol,
        right: this.ruleForm.maxBankChiCang,
        right_symbol: this.ruleForm.maxBankChiCang_symbol,
        fuhao: this.ruleForm.bankChiCang_fuhao,
        errorObj: this.hasError.bankChiCang
      };
      this.forValid(obj);
    },

    // 封装验证
    forValid(obj) {
      let fuhao = obj.fuhao,
        left = obj.left,
        left_symbol = obj.left_symbol,
        right = obj.right,
        right_symbol = obj.right_symbol,
        errorObj = obj.errorObj;
      // 全部填入数据了
      if (fuhao && left !== "" && left_symbol && right !== "" && right_symbol) {
        if (fuhao === "且") {
          // 如果左边是小于或小于等于时
          if (left_symbol === "&lt" || left_symbol === "&le") {
            // 右边是小于或小于等于
            if (right_symbol === "&lt" || right_symbol === "&le") {
              errorObj.content = "包含重复区间！";
              errorObj.act = true;
            }
            // 右边是大于或大于等于
            else {
              if (+left <= +right) {
                errorObj.content = "无法同时满足两个区间！";
                errorObj.act = true;
              } else {
                errorObj.content = "";
                errorObj.act = false;
              }
            }
          }
          // 如果左边是大于或大于等于时
          else {
            // 右边是小于或小于等于
            if (right_symbol === "&lt" || right_symbol === "&le") {
              if (+left >= +right) {
                errorObj.content = "无法同时满足两个区间！";
                errorObj.act = true;
              } else {
                errorObj.content = "";
                errorObj.act = false;
              }
            }
            // 右边是大于或大于等于
            else {
              errorObj.content = "包含重复区间！";
              errorObj.act = true;
            }
          }
        } else {
          // 或的情况
          errorObj.content = "";
          errorObj.act = false;
        }
      } else {
        // 如果有一项已经填入数据
        if (
          fuhao ||
          left !== "" ||
          left_symbol ||
          right !== "" ||
          right_symbol
        ) {
          // 如果左边已经填写，右边未知时
          if (left !== "" && left_symbol) {
            // 选择了且、或
            if (fuhao) {
              if (right === "" || !right_symbol) {
                errorObj.content = "请将右侧设置数据填写完整！";
                errorObj.act = true;
              }
            } else {
              if (right !== "" || right_symbol) {
                errorObj.content = "请确定左侧和右侧的关系！";
                errorObj.act = true;
              }
            }
          } else {
            errorObj.content = "请将左侧填写完整的数据！";
            errorObj.act = true;
          }
        } else {
          errorObj.content = "";
          errorObj.act = false;
        }
      }
    },
    // 监听地域限制组件
    areaAction(data) {
      switch (data.type) {
        case "delete":
          if (this.ruleForm.areaTJ.length < 2) {
            this.hasError.canDelete.act = true;
            this.hasError.canDelete.content = "最少要有一条！";
            setTimeout(() => {
              this.hasError.canDelete.act = false;
              this.hasError.canDelete.content = "";
            }, 5000);
          } else {
            this.ruleForm.areaTJ = this.ruleForm.areaTJ.filter(
              tar => tar.num != data.data.num
            );
            this.toFilterList();
          }
          break;
        case "add":
          this.ruleForm.areaTJ.push({
            num: this.num++,
            sheng: "",
            shi: [],
            tiaojian: []
          });
          this.toFilterList();
          break;
        case "deleteShi":
          this.toFilterList();
          break;
      }
    },

    // 金额的单位格式化
    danwei(data) {
      let obj = {};
      if (data) {
        let num = data / 10000;
        if (num >= 1 && num < 10) {
          obj = {
            content: "万",
            show: true
          };
        } else if (num >= 10 && num < 100) {
          obj = {
            content: "十万",
            show: true
          };
        } else if (num >= 100 && num < 1000) {
          obj = {
            content: "百万",
            show: true
          };
        } else if (num >= 1000 && num < 10000) {
          obj = {
            content: "千万",
            show: true
          };
        } else if (num >= 10000) {
          obj = {
            content: "亿",
            show: true
          };
        } else {
          obj = {
            content: "",
            show: false
          };
        }
      } else {
        obj = {
          content: "",
          show: false
        };
      }
      return obj;
    },
    // 重置产品展示位置与时间
    resetSide() {
      this.ruleForm.side = []; // 位置
      this.ruleForm.time = []; // 时间
      this.ruleForm.ad_side = []; // 广告位
      this.ruleForm.active = []; // 活动
      this.ruleForm.content = []; // 内容
      this.ruleForm.chuang = ""; // 创新层
      this.timeType = "";
      this.timeData = "";
    },
    // 全选按钮
    selectAll() {
      console.log(9);
    },
    // 选择时间
    timeAction(obj) {
      switch (obj.type) {
        case "new":
          if (
            this.ruleForm.side.length === 1 &&
            this.ruleForm.time.length === 0
          ) {
            this.ruleForm.time.push({
              num: this.num++,
              type: "",
              time: []
            });
          }
          break;
        case "add":
          if (this.ruleForm.side.length > 0) {
            this.$refs.sideTime.forEach(tar => {
              tar.save();
            });
            let isOk = true;
            this.ruleForm.time.forEach(item => {
              if (!item.type || item.time.length === 0) {
                isOk = false;
              }
            });

            if (isOk) {
              this.ruleForm.time.push({
                num: this.num++,
                type: "",
                time: []
              });
            } else {
              this.$message.error("请先输入上一个数据！");
            }
          } else {
            this.$message.error("请先选择位置！");
          }

          break;
        case "delete":
          if (this.ruleForm.time.length > 1) {
            this.ruleForm.time = this.ruleForm.time.filter(tar => {
              tar.num != obj.data.num;
            });
          } else {
            this.$message.error("请至少保留一个或者完全重置！");
          }
          break;
      }
    },
    // 编写完数据重置
    resetAll() {
      this.$store.state.areaList = this.dictData.china;

      this.ruleForm = {
        canSee: "可见条件", // 可见条件
        minAge: "", // 左边年龄
        minAge_symbol: "", // 左边年龄的符号
        maxAge: "", // 右边年龄
        maxAge_symbol: "", // 右边年龄的符号
        age_fuhao: "", // 中间的且、或
        statue: "", // 状态
        time1: "", // 左边的时间
        time1_symbol: "", // 左边时间的符号
        time2: "", // 右边的时间
        time2_symbol: "", // 右边时间的符号
        time1_time2: "", // 时间中间的且或
        realName: "", //比财实名状态
        kaihu: "", //比财开户状态
        touzi: "", //比财投资状态
        chicang: "", //比财持仓状态
        minChiCang: "", // 左边持仓
        minChiCang_symbol: "", // 左边持仓的符号
        maxChiCang: "", // 右边持仓
        maxChiCang_symbol: "", // 右边持仓的符号
        ChiCang_fuhao: "", // 中间的且、或
        bankStatue: "", // 状态
        bank1: "", // 左边的时间
        bank1_symbol: "", // 左边时间的符号
        bank2: "", // 右边的时间
        bank2_symbol: "", // 右边时间的符号
        bank1_bank2: "", // 时间中间的且或
        minBankChiCang: "", // 左边持仓
        minBankChiCang_symbol: "", // 左边持仓的符号
        maxBankChiCang: "", // 右边持仓
        maxBankChiCang_symbol: "", // 右边持仓的符号
        bankChiCang_fuhao: "", // 中间的且、或
        bankTouZi: "", //本银行投资状态
        bankChiCang: "", //本银行持仓状态
        areaTJ: [], //地域限制条件
        side: [], // 位置
        time: [], // 时间数据
        ad_side: [], // 广告位
        active: [], // 活动
        content: [], // 内容
        chuang: "" // 创新层
      };

      this.hasError = {
        hasError: false,
        // 页面内各种验证的错误提示
        age: {
          // 年龄
          act: false,
          content: ""
        },
        time: {
          // 比财注册状态与时间
          act: false,
          content: ""
        },
        chicang: {
          // 比财持仓金额
          act: false,
          content: ""
        },
        bank: {
          // 本银行开户状态与时间
          act: false,
          content: ""
        },
        bankChiCang: {
          // 本银行持仓金额
          act: false,
          content: ""
        },
        canDelete: {
          // 限制地域
          act: false,
          content: ""
        }
      };
    }
  }
};
</script>
<style scoped>
.AddTiaoJianPage {
  background: rgb(253, 253, 253);
  box-shadow: 0px 5px 10px 5px rgb(167, 166, 166);
}

.pageTop {
  display: flex;
  font-weight: bold;
  align-items: center;
  padding: 10px 5px;
  border-bottom: 1px solid rgb(230, 228, 228);
}

.pageTop > p {
  width: 100%;
  font-size: 16px;
  color: rgb(78, 75, 75);
}

.pageTop > i {
  display: inline-block;
  width: 30px;
  color: rgb(145, 141, 141);
}

.pageTop > i:hover {
  cursor: pointer;
  color: rgb(12, 12, 12);
  font-weight: bold;
}

.pagePart {
  border-left: 5px solid #1a80df;
  font-size: 16px;
  padding: 3px 10px;
  margin-left: -15px;
}
.pagePart > span {
  font-size: 14px;
  color: red;
  padding: 0 30px 0 10px;
}
.setCunQi {
  display: flex;
  justify-content: flex-start;
  padding: 5px 4px 0 2px;
  position: relative;
  align-items: center;
}
.hasError {
  position: absolute;
  bottom: -28px;
  color: red;
  padding: 0 5px;
}

.ageBack {
  display: inline-block;
  padding: 0 20px 0 5px;
  color: rgb(197, 195, 195);
}
.forSta {
  background: rgb(221, 220, 220);
}
.canDelete {
  font-size: 14px;
  color: #606266;
  padding-bottom: 10px;
}
.canDelete > span {
  font-size: 14px;
  color: rgb(248, 18, 18);
  padding-left: 20px;
}
.resetBtn {
  margin-left: 30px;
}
.setTime {
  border: 1px solid rgb(161, 159, 159);
  padding: 0 10px;
  margin: 10px 0;
}
</style>
