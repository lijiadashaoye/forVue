<template>
  <div style="overflow-y:auto" id="forTable">
    <!-- 纯债基金管理 -->
    <div class="buju" v-if="pageData.page==='pure_debt_fund'">
      <div>
        <div v-if="pageData.forProduct">
          <baseinfo :pageData="pageData" @toReGetData="toReGetData" />
        </div>

        <div v-if="pageData.forChart">
          <chart :pageData="pageData" />
        </div>

        <div>
          <div class="table_top" v-if="pageData.forLishi">
            <div>
              <span class="guizeTitle">历史业绩</span>
            </div>
            <el-button size="mini" @click="toUpdate">更新</el-button>
          </div>

          <div v-if="pageData.forForms">
            <forms :type="'lishi'" :pageData="pageData" />
          </div>
        </div>
      </div>
      <div>
        <simple :pageData="pageData" v-if="pageData.forSimple" />

        <div class="table_top" v-if="pageData.forForm">
          <div>
            <span class="guizeTitle">交易规则</span>
          </div>
          <el-button size="mini" @click="add_guize">新增规则</el-button>
        </div>
        <div>
          <!-- <forms  :pageData="rengou" />
          <forms :pageData="shengou" />
          <forms  :pageData="shuhui" />-->
        </div>
      </div>
    </div>

    <!-- 货币基金管理 -->
    <div class="buju" v-if="pageData.page==='money_fund'">
      <div>
        <div v-if="pageData.forProduct">
          <baseinfo :pageData="pageData" @toReGetData="toReGetData" />
        </div>
        <div></div>
      </div>

      <div>
        <simple :pageData="pageData" v-if="pageData.forSimple" />
        <chart :pageData="pageData" v-if="pageData.forChart" />
      </div>
    </div>

    <!-- 理财管理 -->
    <div class="buju" v-if="pageData.page==='manage_money_matters'">
      <div>
        <div v-if="pageData.forProduct">
          <baseinfo :pageData="pageData" @toReGetData="toReGetData" />
        </div>
        <div></div>
      </div>

      <div>
        <simple :pageData="pageData" v-if="pageData.forSimple" />
        <chart :pageData="pageData" v-if="pageData.forChart" />
      </div>
    </div>

    <!-- 活期存款管理 -->
    <div class="buju" v-if="pageData.page==='demand_deposit'&&pageData.datas">
      <div>
        <div>
          <baseinfo :pageData="pageData" @toReGetData="toReGetData" />
        </div>
        <div></div>
      </div>

      <div>
        <simple :pageData="pageData" v-if="pageData.forSimple" />
      </div>
    </div>

    <!-- 定期存款管理 -->
    <div class="buju" v-if="pageData.page==='time_deposit'&&pageData.datas">
      <div>
        <div>
          <baseinfo :pageData="pageData" @toReGetData="toReGetData" />
        </div>
        <div></div>
      </div>

      <div>
        <simple :pageData="pageData" />
        <div v-if="pageData.forForms">
          <!-- <forms @tableAct="tableAct" :type="'lilv'" :pageData="pageData" /> -->
        </div>
      </div>
    </div>

    <!-- 智能存款管理 -->
    <div class="buju" v-if="pageData.page=='intelligent_deposit'&&pageData.datas">
      <div>
        <div>
          <baseinfo :pageData="pageData" @toReGetData="toReGetData" />
        </div>
        <div></div>
      </div>

      <div>
        <simple :pageData="pageData" />
        <div v-if="pageData.forForms">
          <forms @tableAct="tableAct" :type="'lilv'" :pageData="pageData" />
        </div>
      </div>
    </div>

    <!-- 结构存款管理 -->
    <div class="buju" v-if="pageData.page==='structured_deposit'&&pageData.datas">
      <div>
        <div>
          <baseinfo :pageData="pageData" @toReGetData="toReGetData" />
        </div>
        <div></div>
      </div>

      <div>
        <simple :pageData="pageData" />
      </div>
    </div>

    <!-- 机构管理 -->
    <div v-if="pageData.page==='organizational'&&forJiGouCom.datas">
      <jigou :forJiGouInfo="forJiGouCom" @toReGetData="toReGetData" />

      <el-radio-group v-model="checkTable" size="mini" @change="changeFn">
        <el-radio-button v-for="(item,index) in checkList" :key="index" :label="item.name"></el-radio-button>
      </el-radio-group>
    </div>

    <!-- 基金公司管理 -->
    <div v-if="pageData.page==='fund_company'&&pageData.datas">
      <jigou :forJiGouInfo="pageData" />

      <el-radio-group v-model="checkTable" size="mini" @change="changeFn">
        <el-radio-button v-for="(item,index) in checkList" :key="index" :label="item.name"></el-radio-button>
      </el-radio-group>
    </div>

    <div id="forTable" v-if="loadEnd">
      <isTable :inputData="tableInputData" @tableEmit="tableEmit" />
    </div>

    <!-- 新增交易规则弹框 -->
    <el-dialog
      :close-on-click-modal="false"
      title="新增交易规则"
      :visible.sync="newGuiZe"
      width="600px"
      :before-close="toCloseNewGuiZeDialog"
    >
      <p style="margin:0 0 5px 0;font-weight:bold;">请选择添加的规则类型：</p>
      <el-form
        v-if="ruleForm"
        size="normal"
        :model="ruleForm"
        label-width="90px"
        class="demo-form-inline"
      >
        <el-form-item
          v-show="isToShow('feilvleixing')"
          size="mini"
          label="费率类型:"
          style="margin:0;width:100%;"
        >
          <el-radio-group v-model="ruleForm.feilvleixing" @change="toSetFormType">
            <el-radio-button label="认购"></el-radio-button>
            <el-radio-button label="申购"></el-radio-button>
            <el-radio-button label="赎回"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-show="isToShow('jine')" label="金额:" style="margin:0;">
          <div class="toInline">
            <el-input
              size="mini"
              clearable
              v-model="ruleForm.jine.num"
              placeholder="最小金额"
              @input="isChange=false"
            ></el-input>&nbsp;&nbsp;
            <el-select
              size="mini"
              v-model="ruleForm.jine.unit"
              clearable
              placeholder="请选择"
              @change="isChange=false"
            >
              <el-option
                size="mini"
                v-for="item in trade_rules.money"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>&nbsp;&nbsp;
            <el-select
              size="mini"
              clearable
              placeholder="请选择"
              v-model="ruleForm.jine.more"
              @change="isChange=false"
            >
              <el-option
                size="mini"
                v-for="item in trade_rules.limit"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-form-item>

        <el-form-item v-show="isToShow('jiaoyijine')" label="交易金额:" style="margin:0;">
          <div class="toInline">
            <el-select
              size="mini"
              clearable
              placeholder="请选择"
              v-model="ruleForm.jiaoyijine.more"
              @change="isChange=false"
            >
              <el-option
                size="mini"
                v-for="item in trade_rules.limit"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>&nbsp;&nbsp;
            <el-input
              size="mini"
              clearable
              v-model="ruleForm.jiaoyijine.num"
              placeholder="最大金额"
              @input="isChange=false"
            ></el-input>&nbsp;&nbsp;
            <el-select
              size="mini"
              clearable
              placeholder="请选择"
              v-model="ruleForm.jiaoyijine.unit"
              @change="isChange=false"
            >
              <el-option
                size="mini"
                v-for="item in trade_rules.money"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-form-item>

        <el-form-item v-show="isToShow('shuhui')" label="赎回期限:" style="margin:0;">
          <div class="toInline">
            <el-input
              size="mini"
              clearable
              v-model="ruleForm.shuhui.num"
              placeholder="最小天数"
              @input="isChange=false"
            ></el-input>&nbsp;&nbsp;
            <el-select
              size="mini"
              v-model="ruleForm.shuhui.unit"
              clearable
              placeholder="请选择"
              @change="isChange=false"
            >
              <el-option
                size="mini"
                v-for="item in trade_rules.money"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-form-item>

        <el-form-item v-show="isToShow('shuhuiTian')" label="赎回天数:" style="margin:0;">
          <div class="toInline">
            <el-select
              size="mini"
              clearable
              placeholder="请选择"
              v-model="ruleForm.shuhuiTian.num"
              @change="isChange=false"
            >
              <el-option
                size="mini"
                v-for="item in trade_rules.limit"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>&nbsp;&nbsp;
            <el-input
              size="mini"
              clearable
              v-model="ruleForm.shuhuiTian.unit"
              placeholder="最大金额"
              @input="isChange=false"
            ></el-input>
          </div>
        </el-form-item>

        <el-form-item v-show="isToShow('feilv')" label="费率:" style="margin:0;">
          <el-input
            size="mini"
            clearable
            placeholder="请输入"
            v-model="ruleForm.feilv"
            style="width:calc(100% - 15px);"
            @input="isChange=false"
          ></el-input>
          <span class="isAd"></span>
        </el-form-item>

        <el-form-item v-show="isToShow('zhekou')" label="费率折扣:" style="margin:0;">
          <el-input
            style="width:calc(100% - 15px);"
            size="mini"
            clearable
            placeholder="请输入"
            v-model="ruleForm.zhekou"
            @input="isChange=false"
          ></el-input>
          <span class="isAd"></span>
        </el-form-item>

        <el-form-item v-show="isToShow('danbi')" label="单笔费用:" style="margin:0;">
          <el-input
            size="mini"
            clearable
            placeholder="请输入"
            v-model="ruleForm.danbi"
            @input="isChange=false"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :disabled="isChange" @click="save()" type="primary">保 存</el-button>
        <el-button @click="toCloseNewGuiZeDialog">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 新增利率绩弹框 -->
    <el-dialog
      :close-on-click-modal="false"
      :title="newLiLvDia.title"
      :visible.sync="newLiLvDia.show"
      width="530px"
      :before-close="toCloseNewGuiZeDialog"
    >
      <el-form
        size="normal"
        :model="newLiLvDia.data"
        label-width="130px"
        label-suffix=":"
        :rules="rules"
        ref="lilvform"
      >
        <el-form-item label="期限" class="is50" prop="qixian">
          <el-input
            type="number"
            clearable
            v-model="newLiLvDia.data.qixian"
            placeholder="请输入"
            class="isInput"
          ></el-input>
        </el-form-item>

        <el-form-item prop="danwei" label="单位" class="is50">
          <el-select class="isInput" clearable placeholder="请选择" v-model="newLiLvDia.data.danwei">
            <el-option
              size="mini"
              v-for="item in dictData.deadline_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="利率" class="is50" prop="lilv">
          <el-input
            type="number"
            clearable
            v-model="newLiLvDia.data.lilv"
            placeholder="请输入"
            class="isInput"
          ></el-input>
          <a class="isA">%</a>
        </el-form-item>

        <el-form-item label="锁定期限" class="is50" prop="lockQiXian">
          <el-input type="number" v-model="newLiLvDia.data.lockQiXian"></el-input>
        </el-form-item>

        <el-form-item prop="bangdan" label="榜单展示" class="is50">
          <el-select placeholder="请选择" v-model="newLiLvDia.data.bangdan">
            <el-option
              size="mini"
              v-for="item in dictData.shelveList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="lockBangDan" label="锁定期榜单展示" class="is50">
          <el-select placeholder="请选择" v-model="newLiLvDia.data.lockBangDan">
            <el-option
              size="mini"
              v-for="item in dictData.shelveList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="备注" prop="beizhu" class="is50">
          <el-input type="textarea" v-model="newLiLvDia.data.beizhu"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="saveLiLv()" type="primary">保 存</el-button>
        <el-button @click="toCloseNewGuiZeDialog">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :close-on-click-modal="false"
      title="更新业绩"
      :visible.sync="newGuiZe1"
      width="450px"
      :before-close="toCloseNewGuiZeDialog"
    >
      <el-form v-if="ruleForm1" size="normal" :model="ruleForm1" label-width="110px">
        <el-form-item label="单日涨幅:" style="margin:0;">
          <el-input
            type="number"
            size="mini"
            clearable
            placeholder="请输入"
            v-model="ruleForm1.danri"
            style="width:calc(100% - 30px);"
            @input="isChange=false"
          ></el-input>
          <span class="isAd"></span>
        </el-form-item>

        <el-form-item label="近三个月涨幅:" style="margin:0;">
          <el-input
            type="number"
            size="mini"
            clearable
            placeholder="请输入"
            v-model="ruleForm1.sanyue"
            style="width:calc(100% - 30px);"
            @input="isChange=false"
          ></el-input>
          <span class="isAd"></span>
        </el-form-item>

        <el-form-item label="近六个月涨幅:" style="margin:0;">
          <el-input
            type="number"
            size="mini"
            clearable
            placeholder="请输入"
            v-model="ruleForm1.liuyue"
            style="width:calc(100% - 30px);"
            @input="isChange=false"
          ></el-input>
          <span class="isAd"></span>
        </el-form-item>

        <el-form-item label="近一年月涨幅:" style="margin:0;">
          <el-input
            type="number"
            size="mini"
            clearable
            placeholder="请输入"
            v-model="ruleForm1.yinian"
            style="width:calc(100% - 30px);"
            @input="isChange1=false"
          ></el-input>
          <span class="isAd"></span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :disabled="isChange" @click="save1()" type="primary">保 存</el-button>
        <el-button @click="toCloseNewGuiZeDialog">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import baseinfo from "./baseInfo.vue";
import chart from "./chart.vue";
import forms from "./forms.vue";
import simple from "./simple.vue";
import jigou from "./jigou.vue";
import isTable from "./isTable/isTable.vue";

export default {
  props: {
    pageData: Object
  },
  components: {
    baseinfo,
    chart,
    forms,
    simple,
    jigou,
    isTable
  },
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
      if (value > 100) {
        callback(new Error("利率不能超过100"));
      } else if (value < 0) {
        callback(new Error("请输入正数"));
      } else if (("" + value).length > 10 || ("" + value).length < 0) {
        callback(new Error("请输入1-10字符"));
      } else {
        callback();
      }
    };
    return {
      rengou: {},
      shengou: {},
      shuhui: {},
      loadEnd: false, // 控制表格的显示隐藏（机构管理详情底下的表）
      tableInputData: {
        // 传给table子组件的数据
        checkBox: true, // 判断需要不需要添加选择框
        pageSize: 10, // 分页相关
        pageNum: 1,
        total: null,
        actions: {},
        data: {
          list: [], // 给表格的数据
          quanxian: [], // 记录用户的权限，当前页面显示哪些按钮、表格是否显示操作列
          title: [], // 给表格表头
          custom: [] // 给表格按钮数量、类型（编辑、删除等）
        }
      },
      dictData: null, // 字典数据
      pageType: null,
      checkTable: null,
      checkList: [], // 用来切换表单
      newGuiZe: false, // 新增规则弹框
      newGuiZe1: false, // 历史业绩弹框
      newLiLv: false, // 新增利率弹框
      trade_rules: {}, // 交易规则里用到的
      ruleForm: {
        // 更新按钮弹出框
        feilvleixing: "",
        jine: {
          num: "",
          unit: "",
          more: ""
        },
        jiaoyijine: {
          num: "",
          unit: "",
          more: ""
        },
        shuhui: {
          num: "",
          unit: ""
        },
        shuhuiTian: {
          num: "",
          unit: ""
        },
        feilv: "",
        zhekou: "",
        danbi: ""
      },
      ruleForm1: {
        // 历史业绩的更新
        danri: "",
        sanyue: "",
        liuyue: "",
        yinian: ""
      },
      // 新增利率弹框
      newLiLvDia: {
        show: false,
        title: "",
        data: {
          qixian: "",
          lilv: "",
          beizhu: "",
          danwei: "",
          lockQiXian: "", // 锁定期限
          bangdan: "", // 榜单展示
          lockBangDan: "" // 锁定期榜单展示
        }
      },

      isChange: true, // 控制数据是否可以提交(保存按钮的可点击)
      show: ["feilvleixing"], // 用来控制显示哪些表单选项
      forJiGouCom: {}, // 传给机构组件的数据
      rules: {
        // 利率弹框的验证
        qixian: [
          { validator: checkNum2, trigger: "blur" },
          { required: true, message: "请输入期限", trigger: "blur" }
        ],
        lilv: [
          { validator: checkNum3, trigger: "blur" },
          { required: true, message: "请输入利率", trigger: "blur" }
        ],
        lockQiXian: [
          { validator: checkNum2, trigger: "blur" },
          { required: true, message: "请输入锁定期限", trigger: "blur" }
        ],
        beizhu: [
          { min: 1, max: 100, message: "字典值为1-100个字符", trigger: "blur" },
          { message: "请输入锁定期限", trigger: "blur" }
        ],
        danwei: [
          { required: true, message: "请选择期限单位", trigger: "blur" }
        ],
        lockBangDan: [
          { required: true, message: "请选锁定期榜单展示", trigger: "change" }
        ],
        bangdan: [
          { required: true, message: "请选择榜单展示", trigger: "change" }
        ]
      }
    };
  },
  created() {
    this.dictData = JSON.parse(sessionStorage.getItem("dict"));
  },
  mounted() {
    this.init(); // 页面初始化
  },
  methods: {
    // 监听表格的操作
    tableEmit(data) {
      switch (data.type) {
        case "regetData": // 分页的emit
          this.changeFn();
          break;
        case "delete": // 单独删除按钮
          this.toDelete(data.data.id);
          break;
        case "switch": // switch 变换
          this.switchAction(data.data);
          break;
      }
    },

    init() {
      let page = this.pageData.page;
      this.trade_rules = {
        money: this.dictData.currency_unit,
        limit: this.dictData.rule_symbol
      };

      switch (page) {
        case "pure_debt_fund": // 纯债基金管理
          this.get_chunzhai_xiangqing();
          break;
        case "money_fund": // 货币基金
          this.get_huobi_xiangqing();
          break;
        case "manage_money_matters": // 理财管理
          this.get_licai_xiangqing();
          break;
        case "organizational": // 机构管理
          this.checkList = [
            {
              id: "0",
              name: "纯债基金"
            },
            {
              id: "1",
              name: "货币基金"
            },
            {
              id: "2",
              name: "理财产品"
            },
            {
              id: "3",
              name: "存款产品"
            }
          ];
          this.checkTable = this.checkList[0].name;
          this.forJiGouCom = this.pageData;
          this.jigouguanli_data();
          this.changeFn();
          break;
        case "fund_company": // 基金管理
          this.checkList = [
            {
              id: "0",
              name: "纯债基金"
            },
            {
              id: "1",
              name: "货币基金"
            }
          ];
          this.checkTable = this.checkList[0].name;
          this.get_jijingongsi_xiangqing();
          this.changeFn();
          break;
        case "demand_deposit": // 活期存款管理
          this.get_huoqi_xiangqing();
          break;
        case "time_deposit": // 定期存款管理
          this.get_dingqi_xiangqing();
          break;
        case "intelligent_deposit": // 智能存款管理
          this.get_zhineng_xiangqing();
          break;
        case "structured_deposit": // 结构存款管理
          this.get_jiegou_xiangqing();
          break;
      }
    },
    // 监听表格的操作
    tableAct(data) {
      if (data.type === "add") {
        this.newLiLvDia.data.spuId = +data.data; // 存款ID
        this.newLiLvDia.title = "新增利率";
        this.newLiLvDia.type = data.type;
        this.newLiLvDia.show = true;
      } else if (data.type === "edit") {
        // 获取利率
        this.$api
          .get_lilv({
            vm: this,
            id: data.data.id
          })
          .then(res => {
            if (res) {
              this.newLiLvDia = {
                type: data.type,
                show: false,
                title: "编辑利率",
                data: {
                  id: res.data.id,
                  spuId: res.data.spuId,
                  qixian: res.data.deadline,
                  lilv: res.data.interestRate,
                  beizhu: res.data.remark,
                  danwei: res.data.timeUnitType,
                  lockQiXian: res.data.lockinPeriod, // 锁定期限
                  bangdan: res.data.showList, // 榜单展示
                  lockBangDan: res.data.lockinShowList // 锁定期榜单展示
                }
              };
              this.newLiLvDia.show = true;
            }
          });
      } else if (data.type === "delete") {
        this.$api
          .delete_lilv({
            vm: this,
            data: data.data.id
          })
          .then(res => {
            if (res) {
              this.$message.success("操作成功！");
              this.init();
              this.toCloseNewGuiZeDialog();
            }
          });
      }
    },
    // 新增利率弹框保存
    saveLiLv() {
      this.$refs.lilvform.validate(valid => {
        if (valid) {
          let datas = this.newLiLvDia.data,
            obj = {}, // 最终使用的数据
            httpType = ""; // 请求方式
          if (this.newLiLvDia.type === "edit") {
            // 编辑
            obj = {
              id: datas.id,
              spuId: datas.spuId,
              deadline: +datas.qixian,
              timeUnitType: datas.danwei,
              timeUnitLabel: "",
              interestRate: +datas.lilv,
              remark: datas.beizhu,
              lockinPeriod: +datas.lockQiXian,
              showList: datas.bangdan,
              lockinShowList: datas.lockBangDan
            };
            httpType = "put";
          } else {
            // 新增
            obj = {
              spuId: +datas.spuId,
              deadline: +datas.qixian,
              timeUnitType: datas.danwei,
              timeUnitLabel: "",
              interestRate: +datas.lilv,
              remark: datas.beizhu,
              lockinPeriod: +datas.lockQiXian,
              showList: datas.bangdan,
              lockinShowList: datas.lockBangDan
            };
            httpType = "post";
          }
          // 期限label
          obj.timeUnitLabel = obj.timeUnitType
            ? this.dictData.deadline_type.filter(
                item => item.value === obj.timeUnitType
              )[0].label
            : "";
          this.$api
            .lilv_list({
              vm: this,
              httpType: httpType,
              data: obj
            })
            .then(res => {
              if (res) {
                this.$message.success("操作成功！");
                this.init();
                this.toCloseNewGuiZeDialog();
              }
            });
        } else {
          this.$message.error("请输入必填数据！");
        }
      });
    },
    // 获取理财管理产品详情
    get_licai_xiangqing() {
      this.$api
        .get_licai_info_data({
          vm: this,
          data: this.pageData.id
        })
        .then(res => {
          if (res) {
            this.$set(this.pageData, "forProduct", null);
            this.$set(this.pageData, "forChart", null);
            let stepsTop = {
              // 步骤条数据
              table: [
                {
                  title: "起购金额",
                  num: res.data.appInfo.minAmount
                },
                {
                  title: "递增金额",
                  num: res.data.increaseAmount
                },
                {
                  title: "剩余额度",
                  num: res.data.surplusQuotaLabel
                }
              ],
              steps: [
                {
                  title: "募集开始",
                  text: new Date(res.data.raiseDate[0]).toLocaleDateString()
                },
                {
                  title: "募集结束",
                  text: new Date(res.data.raiseDate[1]).toLocaleDateString()
                },
                {
                  title: "起息日",
                  text: new Date(res.data.valueDate).toLocaleDateString()
                },
                {
                  title: "到期",
                  text: new Date(
                    res.data.managementDate[1]
                  ).toLocaleDateString()
                }
              ]
            };
            this.$nextTick(() => {
              this.$set(this.pageData, "forProduct", res.data);
              this.$set(this.pageData, "forChart", stepsTop);
            });
          }
        });
    },
    // 机构管理获取数据
    jigouguanli_data() {
      this.$api
        .get_jigouInfo({
          vm: this,
          id: this.pageData.id
        })
        .then(res => {
          if (res) {
            this.$set(this.forJiGouCom, "datas", null);
            this.$nextTick(() => {
              this.$set(this.forJiGouCom, "datas", res.data);
            });
          }
        });
    },
    // 活期存款数据
    get_huoqi_xiangqing() {
      this.$api
        .huoqi_info({
          vm: this,
          data: this.pageData.id
        })
        .then(res => {
          if (res) {
            this.$set(this.pageData, "datas", null);
            setTimeout(() => this.$set(this.pageData, "datas", res.data));
          }
        });
    },
    // 定期存款数据
    get_dingqi_xiangqing() {
      this.$api
        .dingqi_info({
          vm: this,
          data: this.pageData.id
        })
        .then(res => {
          if (res) {
            this.$set(this.pageData, "datas", null);
            this.$nextTick(() => {
              this.$set(this.pageData, "datas", res.data);
              // 利率表格的数据
              let forms = {
                topClick: true, // 表格上边的新增利率
                fenye: true, // 是否需要分页
                pageNum: 0, // 当前页妈
                // 表格头部的蓝点
                titleUp: {
                  pointName: "利率"
                },
                // 表格头部
                title: [
                  {
                    prop: "num", // 要显示的属性
                    label: "序号", // 要显示的文字
                    width: "100" // 当前项的宽度
                  },
                  {
                    prop: "qixian", // 要显示的属性
                    label: "期限", // 要显示的文字
                    width: "100" // 当前项的宽度
                  },
                  {
                    prop: "danwei", // 要显示的属性
                    label: "单位", // 要显示的文字
                    width: "100" // 当前项的宽度
                  },
                  {
                    prop: "lilv", // 要显示的属性
                    label: "利率 %", // 要显示的文字
                    width: "100" // 当前项的宽度
                  },
                  {
                    prop: "beizhu", // 要显示的属性
                    label: "备注", // 要显示的文字
                    width: "100" // 当前项的宽度
                  }
                ],
                handle: [
                  // 表格执行的操作
                  {
                    click: "edit", // 表格操作栏的点击事件
                    text: "编辑" // 表格操作栏的点击事件
                  },
                  {
                    click: "delete", // 表格操作栏的点击事件
                    text: "删除" // 表格操作栏的点击事件
                  }
                ],
                // 表格数据
                dataTotal: []
              };
              let arr = res.data.interestRates;

              if (arr.length > 0) {
                for (let i = 0; i < arr.length; i++) {
                  forms.dataTotal.push({
                    num: i + 1,
                    qixian: arr[i].deadline,
                    danwei: arr[i].timeUnitLabel,
                    lilv: arr[i].interestRate,
                    beizhu: arr[i].remark,
                    id: arr[i].id,
                    parentID: arr[i].spuId
                  });
                }
              }
              this.$set(this.pageData, "forForms", forms);
            });
          }
        });
    },
    // 智能存款数据
    get_zhineng_xiangqing() {
      this.$api
        .zhineng_info({
          vm: this,
          data: this.pageData.id
        })
        .then(res => {
          if (res) {
            this.$set(this.pageData, "datas", null);
            this.$nextTick(() => {
              this.$set(this.pageData, "datas", res.data);
              // 利率表格的数据
              let forms = {
                topClick: true, // 表格上边的新增利率
                fenye: true, // 是否需要分页
                pageNum: 0, // 当前页妈
                // 表格头部的蓝点
                titleUp: {
                  pointName: "利率"
                },
                // 表格头部
                title: [
                  {
                    prop: "num", // 要显示的属性
                    label: "序号", // 要显示的文字
                    width: "100" // 当前项的宽度
                  },
                  {
                    prop: "qixian", // 要显示的属性
                    label: "期限", // 要显示的文字
                    width: "100" // 当前项的宽度
                  },
                  {
                    prop: "danwei", // 要显示的属性
                    label: "单位", // 要显示的文字
                    width: "100" // 当前项的宽度
                  },
                  {
                    prop: "lilv", // 要显示的属性
                    label: "利率 %", // 要显示的文字
                    width: "100" // 当前项的宽度
                  },
                  {
                    prop: "beizhu", // 要显示的属性
                    label: "备注", // 要显示的文字
                    width: "100" // 当前项的宽度
                  }
                ],
                handle: [
                  // 表格执行的操作
                  {
                    click: "edit", // 表格操作栏的点击事件
                    text: "编辑" // 表格操作栏的点击事件
                  },
                  {
                    click: "delete", // 表格操作栏的点击事件
                    text: "删除" // 表格操作栏的点击事件
                  }
                ],
                // 表格数据
                dataTotal: []
              };
              let arr = res.data.interestRates;
              if (arr.length > 0) {
                for (let i = 0; i < arr.length; i++) {
                  forms.dataTotal.push({
                    num: i + 1,
                    qixian: arr[i].deadline,
                    danwei: arr[i].timeUnitLabel,
                    lilv: arr[i].interestRate,
                    beizhu: arr[i].remark,
                    id: arr[i].id,
                    parentID: arr[i].spuId
                  });
                }
              }
              this.$set(this.pageData, "forForms", forms);
            });
          }
        });
    },
    // 结构存款数据
    get_jiegou_xiangqing() {
      this.$api
        .jigou_info({
          vm: this,
          data: this.pageData.id
        })
        .then(res => {
          if (res) {
            this.$set(this.pageData, "datas", null);
            setTimeout(() => this.$set(this.pageData, "datas", res.data));
          }
        });
    },
    // 纯债基金详情页面的所有数据
    get_chunzhai_xiangqing() {
      this.$api // 获取详情 1
        .getChunZhaiInfoData({
          vm: this,
          data: this.pageData.id
        })
        .then(res => {
          if (res) {
            this.$set(this.pageData, "forProduct", null);
            this.$nextTick(() =>
              this.$set(this.pageData, "forProduct", res.data)
            );
          }
        });
    },
    // 货币基金详情页面的所有数据
    get_huobi_xiangqing() {
      this.$api
        .get_huobi_info_data({
          vm: this,
          data: this.pageData.id
        })
        .then(res => {
          if (res) {
            this.$set(this.pageData, "forProduct", null);
            setTimeout(() => this.$set(this.pageData, "forProduct", res.data));
          }
        });
    },
    get_jijingongsi_xiangqing() {
      this.$api
        .get_jijingongsi_info({
          vm: this,
          id: this.pageData.id
        })
        .then(res => {
          this.$set(this.pageData, "datas", null);
          this.$nextTick(() => (this.pageData.datas = res.data));
        });
    },

    // 各个子编辑完重新获取数据
    toReGetData(type) {
      switch (type) {
        case "chunzhai": // 纯债编辑完
          this.get_chunzhai_xiangqing();
          break;
        case "huoqi": // 活期存款管理编辑完
          this.get_huoqi_xiangqing();
          break;
        case "dingqi": // 定期存款管理编辑完
          this.get_dingqi_xiangqing();
          break;
        case "zhineng": // 智能存款管理编辑完
          this.get_zhineng_xiangqing();
          break;
        case "jiegou": // 结构存款管理编辑完
          this.get_jiegou_xiangqing();
          break;
        case "huobi": // 货币基金编辑完
          this.get_huobi_xiangqing();
          break;
        case "licai": // 理财管理编辑完
          this.get_licai_xiangqing();
          break;
        case "organizational": // 理财管理编辑完
          this.jigouguanli_data();
          break;
      }
    },
    /****************************************************************************/
    // 存款管理左侧系列里的新增、编辑按钮弹框
    add_guize() {
      this.newGuiZe = true;
    },
    // 关闭弹框
    toCloseNewGuiZeDialog() {
      this.newGuiZe = false;
      this.isChange = true;
      this.newLiLvDia = {
        // 新增利率弹框
        type: "",
        show: false,
        title: "",
        data: {
          qixian: "",
          lilv: "",
          beizhu: "",
          danwei: "",
          lockQiXian: "", // 锁定期限
          bangdan: "", // 榜单展示
          lockBangDan: "" // 锁定期榜单展示
        }
      };
      this.ruleForm = {
        feilvleixing: "",
        jine: {
          num: "",
          unit: "",
          more: ""
        },
        jiaoyijine: {
          num: "",
          unit: "",
          more: ""
        },
        shuhui: {
          num: "",
          unit: ""
        },
        shuhuiTian: {
          num: "",
          unit: ""
        },
        feilv: "",
        zhekou: "",
        danbi: ""
      };
      this.show = ["feilvleixing"];

      this.newGuiZe1 = false;
      this.isChange1 = true;
      this.ruleForm1 = {
        danri: "",
        sanyue: "",
        liuyue: "",
        yinian: ""
      };
      this.$refs["lilvform"].resetFields();
    },
    /*****************************************************/
    // 用来判断当前页需要显示的表单项
    isToShow(name) {
      return this.show.some(item => item === name);
    },
    // 切换表单
    changeFn() {
      let datas = {};
      datas.pageSize = this.tableInputData.pageSize;
      datas.pageNum = this.tableInputData.pageNum;
      datas.institutionId = this.pageData.id;
      switch (this.checkTable) {
        case "货币基金":
          this.huobi_list(datas);
          break;
        case "理财产品":
          this.licai_list(datas);
          break;
        case "存款产品":
          this.cunkuan_list(datas);
          break;
        case "纯债基金":
          this.chunzai_list(datas);
          break;
      }
    },
    /////////////////////////////////////////////////////////////////////////////
    // 获取纯债基金数据后的处理
    chunzhai_list_after(data) {
      this.loadEnd = false;
      this.tableInputData = {
        // 传给table子组件的数据
        checkBox: true, // 判断需要不需要添加选择框
        pageSize: 10, // 分页相关
        pageNum: 1,
        total: null,
        actions: {},
        data: {
          list: [], // 给表格的数据
          quanxian: [], // 记录用户的权限，当前页面显示哪些按钮、表格是否显示操作列
          title: [], // 给表格表头
          custom: [] // 给表格按钮数量、类型（编辑、删除等）
        }
      };
      new Promise(resolve => {
        this.tableInputData.total = data.total;
        this.tableInputData.pageSize = data.pageSize == 0 ? 10 : data.pageSize;
        this.tableInputData.pageNum = data.pageNum == 0 ? 1 : data.pageNum;
        this.tableInputData.data.list = data.list.map(item => {
          let obj = {},
            arr = Object.keys(item);
          arr.forEach(str => {
            obj[str] = item[str];
            // 将 shelfStatus 属性换成 action 属性
            if (str === "shelve") {
              delete obj[str];
              switch (item[str]) {
                case "YES":
                  obj["switch"] = true;
                  obj["action"] = "上架中";
                  break;
                case "NO":
                  obj["switch"] = false;
                  obj["action"] = "已下架";
                  break;
              }
            }
          });
          return obj;
        });
        // 需要额外设置字体颜色的
        this.tableInputData.actions.setColor = {
          label: "上架状态",
          minWidth: 70,
          from: "action", // 标注对应的属性
          with: "switch" // 关联到其他属性
        };
        // 设置需要的额外switch事件
        this.tableInputData.actions.switch = {
          label: "上架/下架",
          minWidth: 80,
          from: "shelve" // 记录这个交互操作的原数据属性
        };
        // // 设置字体点击事件
        this.tableInputData.actions.click = {
          label: "产品名称",
          minWidth: 180,
          from: "name" // 记录这个交互操作的原数据属性
        };
        this.tableInputData.data.title = [
          {
            title: "代码",
            key: "code",
            minWidth: "80"
          },
          {
            title: "机构",
            key: "institutionName",
            minWidth: "120"
          },
          {
            title: "交易状态",
            key: "statusName",
            minWidth: "100"
          },
          {
            title: "基金公司名称",
            key: "fundHouseName",
            minWidth: "180"
          },
          {
            title: "日涨幅%",
            key: "dailyIncrease",
            minWidth: "100",
            sortable: true
          },
          {
            title: "单位净值",
            key: "netAssetValue",
            minWidth: "100",
            sortable: true
          },
          {
            title: "累计净值",
            key: "netAccumulateValue",
            minWidth: "100",
            sortable: true
          },
          {
            title: "创建时间",
            key: "gmtCreated",
            minWidth: "140",
            sortable: true
          }
        ];
        this.tableInputData.data.custom.push({
          text: "删除",
          type: "danger",
          size: "mini",
          emit: "delete"
        });
        resolve();
      }).then(() => {
        this.loadEnd = true;
      });
    },
    // 获取纯债基金表格数据
    chunzai_list(datas) {
      this.$api
        .get_chunzhaiList({
          vm: this,
          data: datas
        })
        .then(res => {
          if (res) {
            this.chunzhai_list_after(res.data);
          }
        });
    },

    /////////////////////////////////////////////////////////////////////////////

    // 获取存款表格数据
    cunkuan_list(datas) {
      this.$api
        .get_cunkuanlistData({
          vm: this,
          data: datas
        })
        .then(res => {
          if (res) {
            this.cunkuan_list_after(res.data);
          }
        });
    },
    // 获取数据后的处理
    cunkuan_list_after(data) {
      this.loadEnd = false;
      this.tableInputData = {
        // 传给table子组件的数据
        checkBox: true, // 判断需要不需要添加选择框
        pageSize: 10, // 分页相关
        pageNum: 1,
        total: null,
        actions: {},
        data: {
          list: [], // 给表格的数据
          quanxian: [], // 记录用户的权限，当前页面显示哪些按钮、表格是否显示操作列
          title: [], // 给表格表头
          custom: [] // 给表格按钮数量、类型（编辑、删除等）
        }
      };
      new Promise(resolve => {
        this.tableInputData.total = data.total;
        this.tableInputData.pageSize = data.pageSize == 0 ? 10 : data.pageSize;
        this.tableInputData.pageNum = data.pageNum == 0 ? 1 : data.pageNum;
        this.tableInputData.data.list = data.list.map(item => {
          let obj = {},
            arr = Object.keys(item);

          arr.forEach(str => {
            obj[str] = item[str];
            // 将 shelfStatus 属性换成 action 属性
            if (str === "shelve") {
              delete obj[str];
              switch (item[str]) {
                case "YES":
                  obj["switch"] = true;
                  obj["action"] = "上架中";
                  break;
                case "NO":
                  obj["switch"] = false;
                  obj["action"] = "已下架";
                  break;
              }
            }
          });
          return obj;
        });
        // 设置需要的额外设置字体颜色的
        this.tableInputData.actions.setColor = {
          label: "上架状态",
          minWidth: 70,
          from: "action",
          with: "switch"
        };
        // 设置需要的额外switch事件
        this.tableInputData.actions.switch = {
          label: "上架/下架",
          minWidth: 80,
          from: "shelve" // 记录这个交互操作的原数据属性
        };
        // // 设置字体点击事件
        this.tableInputData.actions.click = {
          label: "产品名称",
          minWidth: 120,
          from: "name" // 记录这个交互操作的原数据属性
        };
        this.tableInputData.data.title = [
          {
            title: "机构",
            key: "institutionName",
            minWidth: "160"
          },

          {
            title: "产品系列",
            key: "seriesName",
            minWidth: "120"
          },
          {
            title: "存款类别",
            key: "productSubtypeLabel",
            minWidth: "140"
          },
          {
            title: "产品类型",
            key: "typeAlias",
            minWidth: "120"
          },

          {
            title: "创建时间",
            key: "gmtCreated",
            minWidth: "160",
            sortable: true
          }
        ];
        this.tableInputData.data.custom.push({
          text: "删除",
          type: "danger",
          size: "mini",
          emit: "delete"
        });
        resolve();
      }).then(() => {
        this.loadEnd = true;
      });
    },
    /////////////////////////////////////////////////////////////////////////////
    // 获取货币基金数据后的处理
    huobi_list_after(data) {
      this.loadEnd = false;
      this.tableInputData = {
        // 传给table子组件的数据
        checkBox: true, // 判断需要不需要添加选择框
        pageSize: 10, // 分页相关
        pageNum: 1,
        total: null,
        actions: {},
        data: {
          list: [], // 给表格的数据
          quanxian: [], // 记录用户的权限，当前页面显示哪些按钮、表格是否显示操作列
          title: [], // 给表格表头
          custom: [] // 给表格按钮数量、类型（编辑、删除等）
        }
      };
      new Promise(resolve => {
        this.tableInputData.total = data.total;
        this.tableInputData.pageSize = data.pageSize == 0 ? 10 : data.pageSize;
        this.tableInputData.pageNum = data.pageNum == 0 ? 1 : data.pageNum;
        this.tableInputData.data.list = data.list.map(item => {
          let obj = {},
            arr = Object.keys(item);
          arr.forEach(str => {
            obj[str] = item[str];
            // 将 shelfStatus 属性换成 action 属性
            if (str === "shelve") {
              delete obj[str];
              switch (item[str]) {
                case "YES":
                  obj["switch"] = true;
                  obj["action"] = "上架中";
                  break;
                case "NO":
                  obj["switch"] = false;
                  obj["action"] = "已下架";
                  break;
              }
            }
          });
          return obj;
        });
        // 设置需要的额外设置字体颜色的
        this.tableInputData.actions.setColor = {
          label: "上架状态",
          minWidth: 70,
          from: "action",
          with: "switch"
        };
        // 设置需要的额外switch事件
        this.tableInputData.actions.switch = {
          label: "上架/下架",
          minWidth: 80,
          from: "shelve" // 记录这个交互操作的原数据属性
        };
        // // 设置字体点击事件
        this.tableInputData.actions.click = {
          label: "产品名称",
          minWidth: 180,
          from: "name" // 记录这个交互操作的原数据属性
        };
        this.tableInputData.data.title = [
          {
            title: "机构名称",
            key: "institutionName",
            minWidth: "180"
          },
          {
            title: "基金公司名称",
            key: "fundHouseName",
            minWidth: "100"
          },
          {
            title: "七日年化收益率",
            key: "onThe7thOfTheYearYield",
            minWidth: "130",
            sortable: true
          },
          {
            title: "万份年化收益率",
            key: "thousandsOfYearsYields",
            minWidth: "130",
            sortable: true
          },
          {
            title: "起购金额",
            key: "minAmount",
            minWidth: "120",
            sortable: true
          },

          {
            title: "赎回到账日",
            key: "redemptionDate",
            minWidth: "120",
            sortable: true
          },
          {
            title: "创建时间",
            key: "gmtCreated",
            minWidth: "140",
            sortable: true
          }
        ];
        this.tableInputData.data.custom.push({
          text: "删除",
          type: "danger",
          size: "mini",
          emit: "delete"
        });
        resolve();
      }).then(() => {
        this.loadEnd = true;
      });
    },
    // 获取表格数据
    huobi_list(datas) {
      this.$api
        .get_huobiList({
          vm: this,
          data: datas
        })
        .then(res => {
          if (res) {
            this.huobi_list_after(res.data);
          }
        });
    },
    /////////////////////////////////////////////////////////////////////////////
    // 获取数据后的处理
    licai_list_after(data) {
      this.loadEnd = false;
      this.tableInputData = {
        // 传给table子组件的数据
        checkBox: true, // 判断需要不需要添加选择框
        pageSize: 10, // 分页相关
        pageNum: 1,
        total: null,
        actions: {},
        data: {
          list: [], // 给表格的数据
          quanxian: [], // 记录用户的权限，当前页面显示哪些按钮、表格是否显示操作列
          title: [], // 给表格表头
          custom: [] // 给表格按钮数量、类型（编辑、删除等）
        }
      };
      new Promise(resolve => {
        this.tableInputData.total = data.total;
        this.tableInputData.pageSize = data.pageSize == 0 ? 10 : data.pageSize;
        this.tableInputData.pageNum = data.pageNum == 0 ? 1 : data.pageNum;
        this.tableInputData.data.list = data.list.map(item => {
          let obj = {},
            arr = Object.keys(item);
          arr.forEach(str => {
            obj[str] = item[str];
            // 将 shelfStatus 属性换成 action 属性
            if (str === "shelve") {
              delete obj[str];
              switch (item[str]) {
                case "YES":
                  obj["switch"] = true;
                  obj["action"] = "上架中";
                  break;
                case "NO":
                  obj["switch"] = false;
                  obj["action"] = "已下架";
                  break;
              }
            }
          });
          return obj;
        });
        // 设置需要的额外设置字体颜色的
        this.tableInputData.actions.setColor = {
          label: "上架状态",
          minWidth: 70,
          from: "action",
          with: "switch"
        };
        // 设置需要的额外switch事件
        this.tableInputData.actions.switch = {
          label: "上架/下架",
          minWidth: 80,
          from: "shelve" // 记录这个交互操作的原数据属性
        };
        // // 设置字体点击事件
        this.tableInputData.actions.click = {
          label: "产品名称",
          minWidth: 180,
          from: "name" // 记录这个交互操作的原数据属性
        };
        this.tableInputData.data.title = [
          {
            title: "机构名称",
            key: "institutionName",
            minWidth: "180"
          },
          {
            title: "系列名称",
            key: "seriesName",
            minWidth: "100"
          },
          {
            title: "预期年化收益率",
            key: "interestRate",
            minWidth: "130",
            sortable: true
          },
          {
            title: "风险等级",
            key: "riskLevelLabel",
            minWidth: "130"
          },
          {
            title: "创建时间",
            key: "gmtCreated",
            minWidth: "140",
            sortable: true
          }
        ];
        this.tableInputData.data.custom.push({
          text: "删除",
          type: "danger",
          size: "mini",
          emit: "delete"
        });
        resolve();
      }).then(() => {
        this.loadEnd = true;
      });
    },
    // 获取理财表格数据
    licai_list(datas) {
      this.$api
        .get_licaiList({
          vm: this,
          data: datas
        })
        .then(res => {
          if (res) {
            this.licai_list_after(res.data);
          }
        });
    },
    /////////////////////////////////////////////////////////////////////////////
    // 表格里的switch事件
    switchAction(data) {
      this.$api
        .product_chunzhai_UpDown({
          vm: this,
          data: {
            id: data.productId,
            status: data.switch ? "YES" : "NO"
          }
        })
        .then(res => {
          this.changeFn();
        });
    },
    // 删除
    toDelete(id) {
      this.$confirm("确认删除吗？")
        .then(() => {
          let url = "";
          switch (this.checkTable) {
            case "货币基金":
              url = `/product/monetaryFund/${id}`; // 货币基金删除
              break;
            case "理财产品":
              url = `/product/pureDebtFund/${id}`; // 理财管理删除
              break;
            case "存款产品":
              url = `/product/deposit/demand/${id}`; // 存款删除
              break;
            case "纯债基金":
              url = `/product/pureDebtFund/${id}`; // 纯债删除
              break;
          }

          this.$api
            .product_all_delete({
              vm: this,
              url: url
            })
            .then(res => {
              if (res) {
                this.$message.success("删除成功！");
                this.changeFn();
              }
            });
        })
        .catch(() => {});
    },

    ////////////////////////////////////////////////////////////////////////////////////
    // 新增交易规则保存
    save() {
      console.log(this.ruleForm);
      // this.toCloseNewGuiZeDialog();
    },
    // 根据选择的表单类型决定显示的表单项
    toSetFormType() {
      let type = this.ruleForm.feilvleixing;
      switch (type) {
        case "认购":
        case "申购":
          this.show = [
            "feilvleixing",
            "jine",
            "jiaoyijine",
            "feilv",
            "zhekou",
            "danbi"
          ];
          break;
        case "赎回":
          this.show = [
            "feilvleixing",
            "shuhui",
            "shuhuiTian",
            "feilv",
            "zhekou",
            "danbi"
          ];
          break;
      }
    },
    // 历史业绩更新保存
    save1() {
      console.log(this.ruleForm1);
      this.toCloseNewGuiZeDialog();
    },
    // 历史业绩更新按钮
    toUpdate() {
      this.newGuiZe1 = true;
    }
  }
};
</script>
<style>
@import url("./allCss.scss");
</style>

