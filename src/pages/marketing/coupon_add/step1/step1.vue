<template>
  <div class="pageWaper">
    <div class="formWaper" v-if="!isOk">
      <div class="forms">
        <el-form
          size="small"
          label-suffix=":"
          ref="formData"
          :model="formData"
          :rules="rules"
          label-width="130px"
        >
          <el-form-item label="卡券类型">
            <el-radio
              v-for="type of kaquanType"
              :key="type.type"
              v-model="formData.type"
              :label="type.type"
              @change="couponType(type.type)"
            >{{type.name}}</el-radio>
          </el-form-item>
          <!-- 体验金券 -->
          <div v-if="formTitle.type==='tiyan'">
            <el-form-item label="体验金金额" prop="experienceAmount" placeholder="请输入">
              <el-input v-model="formData.experienceAmount" type="number"></el-input>
            </el-form-item>
            <el-form-item label="体验金持续天数" prop="experienceDays" placeholder="请输入">
              <el-input v-model="formData.experienceDays" type="number"></el-input>
            </el-form-item>
          </div>

          <div v-if="formTitle.type==='jiaxi'">
            <!-- 加息券 -->
            <el-form-item label="加息天数" prop="increasesDays" placeholder="请输入">
              <el-input v-model="formData.increasesDays" type="number"></el-input>
            </el-form-item>
            <el-form-item label="计息上限金额" prop="increasesAmount" placeholder="请输入">
              <el-input v-model="formData.increasesAmount" type="number"></el-input>
            </el-form-item>
            <el-form-item label="加息率" prop="increasesRate" placeholder="请输入">
              <el-input
                v-model="formData.increasesRate"
                class="addDanWei forBaiFenHao"
                type="number"
              ></el-input>
              <span>(加息率只保留两位小数)</span>
            </el-form-item>
          </div>

          <div v-if="formTitle.type==='dinggou'">
            <!-- 定购券 -->
            <el-form-item label="定购金额" prop="orderAmount" placeholder="请输入">
              <el-input v-model="formData.orderAmount" type="number"></el-input>
            </el-form-item>
            <el-form-item label="定购返现金额" prop="orderReturnAmount" placeholder="请输入">
              <el-input v-model="formData.orderReturnAmount" type="number"></el-input>
            </el-form-item>
          </div>

          <el-form-item :label="formTitle.title" prop="name" placeholder="请输入">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>

          <el-form-item label="卡券说明" prop="explains">
            <el-input
              placeholder="不显示在App端，可为空"
              rows="2"
              type="textarea"
              v-model="formData.explains"
            ></el-input>
          </el-form-item>

          <!-- <el-form-item label="有效期计算方式" prop="YXQJStype">
            <el-select filterable
              v-model="formData.YXQJStype"
              placeholder="请选择有效期计算方式"
              style="width:100%;"
              clearable
              @change="setUseType"
            >
              <el-option
                v-for="item in methodData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>-->

          <!-- <div v-if="formData.YXQJStype==='FIXED'">
            <el-form-item label="固定时间" prop="gudingTime">
              <el-date-picker
                style="width:100%;"
                v-model="formData.gudingTime"
                type="datetimerange"
                range-separator="~"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
          </div>-->

          <!-- <div v-if="formData.YXQJStype==='AFTER_GET'"> -->
          <el-form-item label="自领取之后" prop="effectiveDays">
            <el-input
              type="number"
              class="forDays"
              placeholder="请输入"
              v-model="formData.effectiveDays"
            ></el-input>
          </el-form-item>
          <!-- </div> -->

          <el-form-item label="卡券使用类型" prop="useType">
            <el-select filterable
              v-model="formData.useType"
              placeholder="请选择卡券使用类型"
              style="width:100%;"
              clearable
            >
              <el-option
                v-for="item in kaquanUseType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="发放总张数" prop="totalCount">
            <el-input
              class="addDanWei"
              type="number"
              placeholder="请输入"
              v-model="formData.totalCount"
            ></el-input>
          </el-form-item>

          <el-form-item label="预警数量" prop="warningCount">
            <el-input
              class="addDanWei"
              type="number"
              placeholder="请输入"
              v-model="formData.warningCount"
            ></el-input>
          </el-form-item>

          <el-form-item label="预警通知手机号" prop="notifyMobile">
            <el-input v-model="formData.notifyMobile"></el-input>
          </el-form-item>

          <el-form-item prop="receiveLimit" label="领券限制">
            <el-input
              class="addDanWei"
              type="number"
              placeholder="请输入"
              v-model="formData.receiveLimit"
            ></el-input>
            <span>(每个用户领券上限，如不填默认为一张)</span>
          </el-form-item>

          <el-form-item :label="formTitle.money" prop="initialAmount">
            <el-input
              type="number"
              class="forMoney"
              placeholder="请输入"
              v-model="formData.initialAmount"
            ></el-input>
            <span>(满足一定金额才可使用,如不填则跟随产品起投金额)</span>
          </el-form-item>

          <el-form-item prop="holdDays" label="持有天数限制">
            <el-input class="forDays" type="number" placeholder="请输入" v-model="formData.holdDays"></el-input>
            <span>(达到一定天数才可发放收益)</span>
          </el-form-item>

          <el-form-item label="收益发放类型" prop="incomeGrantType">
            <el-select filterable
              v-model="formData.incomeGrantType"
              placeholder="请选择收益发放类型"
              style="width:100%;"
              clearable
            >
              <el-option
                v-for="item in fafangType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="适用渠道" prop="applyChannel">
            <el-select filterable
              v-model="formData.applyChannel"
              placeholder="请选择适用渠道"
              style="width:100%;"
              clearable
            >
              <el-option
                v-for="item in qudaoList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item size="mini" label="是否为补发券" class="is50">
            <el-radio-group v-model="formData.isReplacement">
              <el-radio-button label="是"></el-radio-button>
              <el-radio-button label="否"></el-radio-button>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="排序" prop="seq">
            <el-input class="onlyText" type="number" placeholder="请输入" v-model="formData.seq"></el-input>
            <span>(影响卡券中心展示,数值越大越靠上,0表示没有限制)</span>
          </el-form-item>

          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" placeholder="app不展示（最多输入500个字符）" v-model="formData.remark"></el-input>
          </el-form-item>

          <el-form-item label="是否做关联" prop="isLink">
            <el-select filterable
              v-model="formData.isLink"
              placeholder="请选择"
              style="width:100%;"
              clearable
              @change="howChange"
            >
              <el-option
                v-for="item in forHow"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="tables" v-if="formData.isLink">
        <!-- 产品列表 -->
        <div>
          <div id="forHeader">
            <el-form size="small" :model="productListSearch" label-width="80px" inline>
              <!-- <el-form-item style="margin-bottom:2px;" label="持续时间">
                    <el-date-picker
                      style="width:100%;"
                      v-model="productList.time"
                      type="datetimerange"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      range-separator="~"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                    ></el-date-picker>
              </el-form-item>-->

              <el-form-item style="margin-bottom:2px" label="产品名称">
                <el-input v-model="productListSearch.name" @change="inputChange('product')"></el-input>
              </el-form-item>

              <el-form-item style="margin-bottom:2px;">
                <el-button size="mini" type="danger" @click="toSearch('product')">查询</el-button>
                <el-button size="mini" type="info" @click="resetSearch('product')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div id="forHeader" style="height:240px;">
            <isTable
              v-if="productList.show"
              :inputData="productList"
              @tableEmit="tableEmit($event,'product')"
            />
          </div>
        </div>
        <!-- 银行列表 -->
        <div>
          <div id="forHeader">
            <el-form size="small" :model="bankListSearch" label-width="80px" inline>
              <el-form-item style="margin-bottom:2px" label="银行名称">
                <el-input v-model="bankListSearch.name" @change="inputChange('bank')"></el-input>
              </el-form-item>

              <el-form-item style="margin-bottom:2px;">
                <el-button size="mini" type="danger" @click="toSearch('bank')">查询</el-button>
                <el-button size="mini" type="info" @click="resetSearch('bank')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div id="forHeader" style="height:240px;">
            <isTable
              v-if="bankList.show"
              :inputData="bankList"
              @tableEmit="tableEmit($event,'bank')"
            />
          </div>
        </div>
        <div id="forHeader">
          <forms @tableAct="tableAct" :pageData="forForms" />
        </div>
      </div>
    </div>

    <div class="buttons" v-if="!isOk">
      <el-button @click="save()" type="primary" :disabled="isUping">保 存</el-button>
      <el-button @click="reset" type="info">重 置</el-button>
    </div>
    <hasSuccess @isOver="isOver" v-if="isOk" />
  </div>
</template>

<script>
import isTable from "../../../../components/isTable/isTable.vue";
import hasSuccess from "../../../../components/success.vue";
import forms from "../../../../components/forms.vue";

export default {
  components: {
    isTable,
    hasSuccess,
    forms
  },
  data() {
    // 验证发放总张数
    var checkTotalMoney = (rule, value, callback) => {
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
    // 验证数字不包括小数
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
    // 验证手机号
    var checkPhone = (rule, value, callback) => {
      if (value === "") {
        callback();
      } else if (!/^1[34578]\d{9}$/.test(value)) {
        callback(new Error("手机号码有误，请重填"));
      } else {
        callback();
      }
    };

    // 验证数字，可以有小数
    var checkNum3 = (rule, value, callback) => {
      if (value < 0) {
        callback(new Error("请输入正数"));
      } else if (("" + value).length > 19 || ("" + value).length < 0) {
        callback(new Error("请输入1-19字符"));
      } else {
        callback();
      }
    };
    // 验证数字，可以有小数，不能大于100
    var checkNum4 = (rule, value, callback) => {
      if (value < 0 || +value >= 100) {
        callback(new Error("请输入正数且小于100"));
      } else if (("" + value).length > 19 || ("" + value).length < 0) {
        callback(new Error("请输入1-19字符"));
      } else {
        callback();
      }
    };
    // 验证数字不包括小数
    var checkNum5 = (rule, value, callback) => {
      let total = +this.formData.totalCount;
      let reg = /\./;
      if (reg.test(value)) {
        callback(new Error("请输入整数"));
      } else if (value < 0) {
        callback(new Error("请输入正数"));
      } else if (("" + value).length > 11 || ("" + value).length < 0) {
        callback(new Error("请输入1-11字符"));
      } else if (+value > total) {
        callback(new Error("预警数量不能大于发放总量！"));
      } else {
        callback();
      }
    };

    return {
      forForms: {}, // 如果关联了银行、产品，显示表格
      isUping: false, // 控制上传按钮
      isOk: false, // 上传数据控制
      formData: {
        type: "EXPERIENCE",
        name: "", // 券名称
        explains: "", // 卡券说明

        effectiveDays: "", // 自领取之后
        useType: "", // 卡券使用类型
        totalCount: "", // 发放总张数
        warningCount: "", // 发放总张数
        notifyMobile: "", // 预警通知手机号
        receiveLimit: "1", // 领取限制
        initialAmount: "", // 起投金额
        holdDays: "", // 持有天数
        incomeGrantType: "", // 收益(现金)发放类型
        applyChannel: "ALL", // 适用渠道
        isReplacement: "否", // 是否为补发券
        seq: "0", // 排序
        remark: "", // 备注
        isLink: false, // 是否做关联
        bankPrdList: [], // 关联产品、银行列表
        experienceAmount: "", // 体验金金额(整数)
        experienceDays: "" // 体验金持续天数
      },
      formTitle: {
        // 最上边的radi 换
        title: "体验金券名称",
        money: "体验金起投金额",
        type: "tiyan"
      },
      // 卡券类型:INCREASE("加息券"),EXPERIENCE("体验金券"),ORDER("定购券")
      kaquanType: [
        {
          name: "体验金券",
          type: "EXPERIENCE"
        },
        {
          name: "加息券",
          type: "INCREASE"
        },
        {
          name: "定购券",
          type: "ORDER"
        }
      ],
      // 卡券使用类型:CURRENCY("通用券"),PRODUCT("产品券"),PINTUAN("拼团券")
      kaquanUseType: [
        {
          label: "通用券",
          value: "CURRENCY"
        },
        {
          label: "产品券",
          value: "PRODUCT"
        },
        {
          label: "拼团券",
          value: "PINTUAN"
        }
      ],
      // 有效期计算方式
      methodData: [
        // 有效期类型:FIXED("固定时间段"),AFTER_GET("领取后开始计算")
        // {
        //   label: "固定时间段",
        //   value: "FIXED"
        // },
        {
          label: "领取后开始计算",
          value: "AFTER_GET"
        }
      ],
      // 收益(现金)发放类型:WHEN_BUY("购买时发放"),
      // WHEN_REDEEM("赎回时发放"),WHEN_END("加息时间结束时发放")
      fafangType: [
        {
          label: "赎回时发放",
          value: "WHEN_REDEEM"
        },
        {
          label: "加息时间结束时发放",
          value: "WHEN_END"
        }
      ],
      // 适用渠道:ALL("all"),BICAI("bicai"),PINCAI("pincai"),YACAI("yacai")
      qudaoList: [
        {
          label: "全部",
          value: "ALL"
        },
        {
          label: "比财",
          value: "BICAI"
        },
        {
          label: "拼财",
          value: "PINCAI"
        },
        {
          label: "亚财",
          value: "YACAI"
        }
      ],
      // 是否关联产品、银行
      forHow: [
        {
          label: "不做关联",
          value: false
        },
        {
          label: "关联银行or产品",
          value: true
        }
      ],
      // 关联产品的服务器数据列表
      productList: {
        // 红包备选表格
        show: false,
        pageSize: 10, // 分页相关
        pageNum: 1,
        total: null,
        actions: {}, // 记录表格内需要额外添加的点击事件
        datas: {
          list: [], // 给表格的数据
          quanxian: [], // 记录用户的权限，当前页面显示哪些按钮、表格是否显示操作列
          title: [], // 给表格表头
          custom: [] // 给表格按钮数量、类型（编辑、删除等）
        }
      },
      // 关联产品表格的查询
      productListSearch: {
        name: ""
      },
      // 关联银行的服务器数据列表
      bankList: {
        // 红包备选表格
        show: false,
        pageSize: 10, // 分页相关
        pageNum: 1,
        total: null,
        actions: {}, // 记录表格内需要额外添加的点击事件
        datas: {
          list: [], // 给表格的数据
          quanxian: [], // 记录用户的权限，当前页面显示哪些按钮、表格是否显示操作列
          title: [], // 给表格表头
          custom: [] // 给表格按钮数量、类型（编辑、删除等）
        }
      },
      // 关联银行表格的查询
      bankListSearch: {
        name: ""
      },
      //表单验证
      rules: {
        name: [
          { required: true, message: "请输入券的名称", trigger: "blur" },
          { min: 1, max: 64, message: "最多输入64个字", trigger: "blur" }
        ],
        explains: [
          { min: 1, max: 100, message: "最多输入100个字", trigger: "blur" }
        ],

        useType: [
          { required: true, message: "请选择有效期时间", trigger: "change" }
        ],
        totalCount: [
          { required: true, validator: checkTotalMoney, trigger: "blur" }
        ],
        warningCount: [
          { required: true, message: "请输入预警数量", trigger: "blur" },
          { validator: checkNum5, trigger: "blur" }
        ],
        notifyMobile: [
          { required: true, message: "请输入预警手机号", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" }
        ],
        receiveLimit: [
          { required: true, validator: checkNum2, trigger: "blur" }
        ],
        initialAmount: [
          { required: true, validator: checkNum2, trigger: "blur" }
        ],
        holdDays: [{ required: true, validator: checkNum2, trigger: "blur" }],
        remark: [
          { min: 1, max: 500, message: "最多输入500个字", trigger: "blur" }
        ],
        incomeGrantType: [
          { required: true, message: "请选择收益发放类型", trigger: "change" }
        ],
        applyChannel: [
          { required: true, message: "适用渠道", trigger: "change" }
        ],
        seq: [{ validator: checkNum2, trigger: "blur" }],

        experienceAmount: [
          {
            required: true,
            message: "请输入体验金金额(整数)",
            trigger: "blur"
          },
          { validator: checkNum2, trigger: "blur" }
        ],
        experienceDays: [
          {
            required: true,
            message: "请输入体验金持续天数",
            trigger: "blur"
          },
          { validator: checkNum2, trigger: "blur" }
        ],

        increasesDays: [
          { required: true, message: "请输入加息天数", trigger: "blur" },
          { validator: checkNum3, trigger: "blur" }
        ],
        increasesAmount: [
          { required: true, message: "请输入计息上限金额", trigger: "blur" },
          { validator: checkNum3, trigger: "blur" }
        ],
        increasesRate: [
          { required: true, message: "请输入加息率", trigger: "blur" },
          { validator: checkNum4, trigger: "blur" }
        ],
        orderAmount: [
          {
            required: true,
            message: "请输入定购金额(整数)",
            trigger: "blur"
          },
          { validator: checkNum2, trigger: "blur" }
        ],
        orderReturnAmount: [
          { required: true, message: "请输入定购返现金额", trigger: "blur" },
          { validator: checkNum3, trigger: "blur" }
        ],

        effectiveDays: [
          { validator: checkNum3, trigger: "blur" },
          { required: true, message: "请输入自领取之后天数", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.toInit();
  },

  methods: {
    // 页面初始化
    toInit() {
      // let step1 = sessionStorage.getItem("step1Data");
      // if (step1) {
      //   this.formData = JSON.parse(step1);
      //   this.howChange();
      // }
    },
    // 查看是体验金券还是奖励金券
    couponType(val) {
      let formObj = { ...this.formData };

      delete formObj.increasesDays;
      delete formObj.increasesAmount;
      delete formObj.increasesRate;
      delete formObj.experienceAmount;
      delete formObj.experienceDays;
      delete formObj.orderAmount;
      delete formObj.orderReturnAmount;

      switch (val) {
        case "EXPERIENCE":
          this.formTitle = {
            title: "体验金券券名称",
            money: "体验金起投金额",
            type: "tiyan"
          };
          formObj.experienceAmount = ""; // 体验金金额(整数)
          formObj.experienceDays = ""; // 体验金持续天数
          this.$set(this, "fafangType", [
            {
              label: "赎回时发放",
              value: "WHEN_REDEEM"
            },
            {
              label: "加息时间结束时发放",
              value: "WHEN_END"
            }
          ]);

          break;
        case "INCREASE":
          this.formTitle = {
            title: "加息券券名称",
            money: "加息券起投金额",
            type: "jiaxi"
          };
          formObj.increasesDays = ""; // 加息天数(-1表示跟随产品计息天数)
          formObj.increasesAmount = ""; // 计息上限金额(整数,-1表示无上限,投多少算多少)
          formObj.increasesRate = ""; // 加息率(保存到小数点后一位:3.3%)
          this.$set(this, "fafangType", [
            {
              label: "赎回时发放",
              value: "WHEN_REDEEM"
            },
            {
              label: "加息时间结束时发放",
              value: "WHEN_END"
            }
          ]);
          break;
        case "ORDER":
          this.formTitle = {
            title: "定购券券名称",
            money: "定购券起投金额",
            type: "dinggou"
          };
          formObj.orderAmount = ""; // 定购金额(整数)
          formObj.orderReturnAmount = ""; // 定购返现金额(保存到小数点后两位:9.99)
          this.$set(this, "fafangType", [
            {
              label: "购买时发放",
              value: "WHEN_BUY"
            },
            {
              label: "赎回时发放",
              value: "WHEN_REDEEM"
            },
            {
              label: "加息时间结束时发放",
              value: "WHEN_END"
            }
          ]);
          break;
      }
      this.formData = formObj;
    },
    // // 有效期计算方式变更时执行
    // setUseType() {
    //   let obj = { ...this.formData };
    //   delete obj.effectiveDays;
    //   delete obj.gudingTime;
    //   if (this.formData.YXQJStype === "FIXED") {
    //     obj.gudingTime = "";
    //   } else {
    //     obj.effectiveDays = "";
    //   }
    //   this.formData = obj;
    // },

    // 使用条件变更
    howChange() {
      this.formData.bankPrdList = [];
      if (this.formData.isLink) {
        let one = this.toSearch("bank");
        let two = this.toSearch("product");
        this.setForForms();
        Promise.all([one, two]).then(datas => {
          // 收缩导航
          this.$store.commit("set_asideState", { data: false });
        });
      } else {
        this.$store.commit("set_asideState", { data: true });
      }
    },
    // 关联银行、产品后显示已经添加哪些关联
    setForForms() {
      let forms = {
        fenye: true, // 是否需要分页
        pageNum: 0, // 当前页妈
        // 表格头部的蓝点
        titleUp: {
          pointName: "已关联的银行or产品"
        },
        // 表格头部
        title: [
          {
            prop: "name", // 要显示的属性
            label: "名称", // 要显示的文字
            width: "100" // 当前项的宽度
          },
          {
            prop: "type", // 要显示的属性
            label: "类型", // 要显示的文字
            width: "100" // 当前项的宽度
          }
        ],
        handle: [
          {
            click: "delete", // 表格操作栏的点击事件
            text: "删除" // 表格操作栏的点击事件
          }
        ],
        // 表格数据
        dataTotal: [
          {
            type: "BANK",
            name: "XX银行",
            targetId: 1
          }
        ]
      };
      this.forForms.type = "guanlianchanpin"; // 添加关联产品
      this.$set(this.forForms, "guanlianchanpin", forms);
    },
    ///////////////////////////////////////////////
    // 右侧列表的搜索
    toSearch(type) {
      let obj = {};
      if (type === "bank") {
        if (this.bankListSearch.name) {
          obj.name = this.bankListSearch.name;
        }
        obj.pageSize = this.bankList.pageSize;
        obj.pageNum = this.bankList.pageNum;

        // this.bankList.total = res.data.total > 0 ? res.data.total : 1;
        // this.bankList.data.title = [
        //   {
        //     title: "卡券名称",
        //     key: "name",
        //     minWidth: "80"
        //   }
        // ];
        // this.bankList.data.custom = [
        //   {
        //     text: "使用",
        //     type: "warning",
        //     size: "small",
        //     emit: "toUse"
        //   }
        // ];
        // this.bankList.data.list = [...res.data.list];
      }
      if (type === "product") {
        if (this.productListSearch.name) {
          obj.name = this.productListSearch.name;
        }
        obj.pageSize = this.productList.pageSize;
        obj.pageNum = this.productList.pageNum;

        // this.productList.total = res.data.total > 0 ? res.data.total : 1;
        // this.productList.data.title = [
        //   {
        //     title: "卡券名称",
        //     key: "name",
        //     minWidth: "80"
        //   }
        // ];
        // this.productList.data.custom = [
        //   {
        //     text: "使用",
        //     type: "warning",
        //     size: "small",
        //     emit: "toUse"
        //   }
        // ];
        // this.productList.data.list = [...res.data.list];
      }
      return obj;
    },
    // 当重新输入查询字段时，重置分页
    inputChange(type) {
      if (type === "bank") {
        this.bankList.pageSize = 10;
        this.bankList.pageNum = 1;
      }
      if (type === "product") {
        this.productList.pageSize = 10;
        this.productList.pageNum = 1;
      }
    },
    // 右侧列表的重置
    resetSearch(type) {
      if (type === "bank") {
        this.bankListSearch = {
          name: ""
        };
        this.bankList.pageSize = 10;
        this.bankList.pageNum = 1;
      }
      if (type === "product") {
        this.productListSearch = {
          name: ""
        };
        this.productList.pageSize = 10;
        this.productList.pageNum = 1;
      }
      this.toSearch(type);
    },
    ///////////////////////////////////////////////
    // 右侧产品、银行表格里的操作
    tableEmit(data, type) {
      console.log(data);
      console.log(type);
    },
    // 已关联的产品、银行表格的操作
    tableAct(data) {
      this.formData.bankPrdList = this.formData.bankPrdList.filter(
        item => item.targetId != data.data.targetId
      );
    },
    //////////////////////////////////////////////////////
    // 重置
    reset() {
      this.$refs.formData.resetFields();
      this.formData = {
        type: "EXPERIENCE",
        name: "", // 券名称
        explains: "", // 卡券说明
        effectiveDays: "", // 自领取之后
        useType: "", // 卡券使用类型
        totalCount: "", // 发放总张数
        warningCount: "", // 预警数量
        notifyMobile: "", // 预警通知手机号
        receiveLimit: "1", // 领取限制
        initialAmount: "", // 起投金额
        holdDays: "", // 持有天数
        incomeGrantType: "", // 收益(现金)发放类型
        applyChannel: "ALL", // 适用渠道
        isReplacement: "否", // 是否为补发券
        seq: "0", // 排序
        remark: "", // 备注
        isLink: false, // 是否做关联
        bankPrdList: [], // 关联产品、银行列表
        experienceAmount: "", // 体验金金额(整数)
        experienceDays: "" // 体验金持续天数
      };
      this.$store.commit("set_asideState", { data: true });
      this.toInit();
    },
    // 保存
    save() {
      this.$refs.formData.validate(valid => {
        if (valid) {
          if (this.formData.isLink && this.formData.bankPrdList.length === 0) {
            this.$message.error("请选择关联产品、银行！");
            return;
          }

          let obj = {
            name: this.formData.name,
            type: this.formData.type,
            explains: this.formData.explains,

            useType: this.formData.useType,
            effectiveDays: this.formData.effectiveDays,
            totalCount: this.formData.totalCount,
            warningCount: this.formData.warningCount,
            notifyMobile: this.formData.notifyMobile,
            receiveLimit: this.formData.receiveLimit,
            initialAmount: this.formData.initialAmount,
            holdDays: this.formData.holdDays,
            incomeGrantType: this.formData.incomeGrantType,
            applyChannel: this.formData.applyChannel,
            isReplacement: this.formData.isReplacement === "是" ? "YES" : "NO",
            remark: this.formData.remark ? this.formData.remark : "",
            seq: this.formData.seq ? this.formData.seq : null,
            typeDetail: {},
            bankPrdList: this.formData.bankPrdList
          };
          switch (this.formData.type) {
            case "EXPERIENCE": // 体验金券
              obj.typeDetail = {
                experienceAmount: this.formData.experienceAmount,
                experienceDays: this.formData.experienceDays
              };
              break;
            case "INCREASE": // 加息券
              obj.typeDetail = {
                increasesDays: this.formData.increasesDays,
                increasesAmount: this.formData.increasesAmount,
                increasesRate: this.jieQu(
                  this.formData.type,
                  this.formData.increasesRate
                )
              };
              break;
            case "ORDER": // 定购券
              obj.typeDetail = {
                orderAmount: this.formData.orderAmount,
                orderReturnAmount: this.jieQu(
                  this.formData.type,
                  this.formData.orderReturnAmount
                )
              };
              break;
          }
          this.isUping = true;
          this.$api
            .market_coupon_upCoupon({
              vm: this,
              httpType: "post",
              data: obj
            })
            .then(res => {
              if (res) {
                this.isOk = true;
              } else {
                setTimeout(() => (this.isUping = false), 3000);
              }
            });
        } else {
          this.$message.error("请将数据正确填写完整！");
        }
      });
    },
    // 对加息率、定购返现金额数据进行截取格式化
    jieQu(type, num) {
      let reg = /\./gi;
      if (reg.test(num)) {
        // 有小数点
        let arr = num.split(".");
        let str = "";

        if (type === "ORDER") {
          // 定购券
          return `${arr[0]}.${arr[1].slice(0, 2)}`;
        } else {
          // 加息
          return `${arr[0]}.${arr[1].slice(0, 1)}`;
        }
      } else {
        if (type === "ORDER") {
          // 定购券
          return (+num).toFixed(2);
        } else {
          // 加息
          return (+num).toFixed(1);
        }
      }
    },
    // 提交成功
    isOver(type) {
      this.isUping = false;
      sessionStorage.setItem("page", "创建卡券 ");
      if (type === "back") {
        this.$router.push({ name: `coupon_list` });
      } else {
        this.$router.push({ name: `coupon_add` });
      }
    }
  }
};
</script>

<style scoped='true' lang="scss">
.pageWaper {
  min-width: 400px;
  padding: 20px;
  margin: 0 auto;
}
.formWaper {
  display: flex;
  justify-content: center;
}
.buttons {
  display: flex;
  justify-content: space-between;
  margin: 20px auto;
  padding-left: 60px;
  width: 30%;
}
.forms {
  width: 100%;
  max-width: 500px;
  min-width: 400px;
}
.tables {
  max-width: 700px;
  margin-left: 30px;
}
.hasSelectJiangLi {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  border-collapse: collapse;
  font-size: 14px;
  margin-bottom: 5px;
}
.hasSelectJiangLi p {
  border: 1px solid rgb(235, 233, 233);
  padding: 2px 5px;
  margin: 0 2px 2px 0;
  cursor: pointer;
}
.hasSelectJiangLi p:hover {
  background: rgb(209, 208, 208);
}
.forBaiFenHao,
.addDanWei,
.forMoney,
.forDays,
.onlyText {
  width: 180px;
  position: relative;
}
.onlyText + span,
.addDanWei + span,
.forMoney + span,
.forDays + span {
  position: absolute;
  right: 0px;
  top: 24px;
  display: inline-block;
  vertical-align: middle;
  color: rgb(189, 184, 184);
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
  content: "天";
  position: absolute;
  right: -20px;
  top: 0;
  font-weight: bold;
  font-size: 14px;
  color: rgb(99, 97, 97);
}
.forBaiFenHao::after {
  content: "%";
  position: absolute;
  right: -20px;
  top: 0;
  font-weight: bold;
  font-size: 14px;
  color: rgb(99, 97, 97);
}
</style>
