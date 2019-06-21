<template>
  <div class="pageWaper">
    <div class="formWaper">
      <div class="forms">
        <el-form
          size="small"
          ref="formData"
          :model="formData"
          :rules="rules"
          label-width="121px"
        >
          <div style="padding-bottom:10px;">
            <el-radio
              v-model="formData.type"
              label="EXPERIENCE"
              @change="couponType('EXPERIENCE')"
            >体验金券</el-radio>
            <el-radio
              v-model="formData.type"
              label="AWARD"
              @change="couponType('AWARD')"
            >奖励金券</el-radio>
          </div>

          <el-form-item
            :label="formTitle.title"
            prop="name"
            placeholder="请输入"
          >
            <el-input v-model="formData.name"></el-input>
          </el-form-item>

          <el-form-item
            label="卡券说明"
            prop="description"
          >
            <el-input
              placeholder="不显示在App端，可为空"
              rows='2'
              type='textarea'
              v-model="formData.description"
            ></el-input>
          </el-form-item>

          <el-form-item
            :label="formTitle.money"
            prop="money"
          >
            <el-input
              type="number"
              class='forMoney'
              placeholder="请输入"
              v-model="formData.money"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="持续时间"
            prop="days"
          >
            <el-input
              type="number"
              class="forDays"
              placeholder="请输入"
              v-model="formData.days"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="有效期计算方式"
            prop="useType"
          >
            <el-select
              v-model="formData.useType"
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
              >
              </el-option>
            </el-select>
          </el-form-item>

          <div v-if="formData.useType==='FIXATION'">
            <el-form-item
              label="固定时间"
              prop='gudingTime'
            >
              <el-date-picker
                style="width:100%;"
                v-model="formData.gudingTime"
                type="datetimerange"
                range-separator="~"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </el-form-item>

          </div>

          <div
            v-if="formData.useType==='GET'"
            style="display:flex;width:100%;"
          >
            <el-form-item
              label="自领取之后"
              prop='GET'
            >
              <el-select
                v-model="formData.afterGet"
                placeholder="请选择"
                style="width:100%;"
                clearable
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item
              prop='afterGetValue'
              label="有效期"
              label-width="70px"
            >
              <el-input
                class="forDays"
                type="number"
                placeholder="请输入"
                v-model="formData.afterGetValue"
              ></el-input>
            </el-form-item>
          </div>

          <div
            v-if="formData.useType==='USE'"
            style="display:flex;width:100%;"
          >
            <el-form-item
              label="自使用之后"
              prop='USE'
            >
              <el-select
                v-model="formData.afterUse"
                placeholder="请选择"
                style="width:100%;"
                clearable
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item
              label="有效期"
              prop='afterUseValue'
              label-width="70px"
            >
              <el-input
                type="number"
                class="forDays"
                placeholder="请输入"
                v-model="formData.afterUseValue"
              ></el-input>
            </el-form-item>
          </div>

          <el-form-item
            prop='limit'
            label="领券限制"
          >
            <el-input
              class="addDanWei"
              type="number"
              placeholder="请输入"
              v-model="formData.limit"
            ></el-input>
            <span>(每个用户领券上限，如不填默认为一张)</span>
          </el-form-item>

          <el-form-item
            label="使用须知"
            prop="toKnow"
          >
            <el-input
              type='textarea'
              placeholder="填写后，显示于APP端中的活动规则（最多输入800个字符）"
              v-model="formData.toKnow"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="发放总张数"
            prop="total"
          >
            <el-input
              class="addDanWei"
              type="number"
              placeholder="请输入"
              v-model="formData.total"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="使用条件"
            prop="how"
          >
            <el-select
              v-model="formData.how"
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
              >
              </el-option>
            </el-select>
          </el-form-item>

          <div v-if="jiangliKaQuan.length>0||jiangliHongBao.length>0">
            <p style="font-weight:bold;font-size:14px;margin-bottom:5px;">已使用的：(点击可以删除)</p>
            <div class="hasSelectJiangLi">
              <p
                v-for="(tar) in jiangliKaQuan"
                :key="tar.awardValue"
                @click="deleteJiangli(tar)"
                title="删除"
              >
                <span>卡券：</span>
                <span>{{tar.name}}</span>
              </p>
              <p
                v-for="(tars,ind2) in jiangliHongBao"
                :key="ind2+2"
                @click="deleteJiangli(tars)"
              >
                <span>红包：</span>
                <span>{{tars.name}}</span>
              </p>
            </div>
          </div>
        </el-form>
      </div>
      <div
        class="tables"
        v-if="formData.how==='SHARE'"
      >
        <!-- 卡券 -->
        <div>
          <div id='forHeader'>
            <el-form
              size="small"
              :model="COUPON_tableSearch"
              :rules="rules"
              label-width="80px"
              inline
            >
              <el-form-item
                style="margin-bottom:2px;"
                label="持续时间"
              >
                <el-date-picker
                  style="width:100%;"
                  v-model="COUPON_tableSearch.time"
                  type="daterange"
                  range-separator="~"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item
                style="margin-bottom:2px"
                label="卡券名称"
              >
                <el-input v-model="COUPON_tableSearch.name"></el-input>
              </el-form-item>
              <el-form-item
                style="margin-bottom:2px;"
                label="卡券说明"
              >
                <el-input v-model="COUPON_tableSearch.couponExplain"></el-input>
              </el-form-item>

              <el-form-item style="margin-bottom:2px;">
                <el-button
                  size="mini"
                  type="danger"
                  @click="toSearch('COUPON')"
                >查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div
            id='forHeader'
            style="height:240px;"
          >
            <isTable
              v-if="COUPON_table.show"
              :inputData='COUPON_table'
              @tableEmit='tableEmit($event,"coupon")'
            />
          </div>
        </div>
        <!-- 红包 -->
        <div>
          <div id='forHeader'>
            <el-form
              size="small"
              :model="PACKET_tableSearch"
              :rules="rules"
              label-width="80px"
              inline
            >
              <el-form-item
                style="margin-bottom:2px"
                label="红包名称"
              >
                <el-input v-model="PACKET_tableSearch.name"></el-input>
              </el-form-item>
              <el-form-item
                style="margin-bottom:2px;"
                label="红包说明"
              >
                <el-input v-model="PACKET_tableSearch.couponExplain"></el-input>
              </el-form-item>

              <el-form-item style="margin-bottom:2px;">
                <el-button
                  size="mini"
                  type="danger"
                  @click="toSearch('PACKET')"
                >查询</el-button>
              </el-form-item>

            </el-form>

          </div>
          <div
            id='forHeader'
            style="height:240px;"
          >
            <isTable
              v-if="PACKET_table.show"
              :inputData='PACKET_table'
              @tableEmit="tableEmit($event,'packet')"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="buttons">
      <el-button
        @click="step()"
        type="primary"
      >下一步</el-button>
      <el-button
        @click="reset"
        type="info"
      >重 置</el-button>
    </div>
  </div>
</template>
<script>
import isTable from "../../../../components/isTable/isTable.vue";

export default {
  components: {
    isTable
  },
  data() {
    // 验证发放总张数
    var checkTotalMoney = (rule, value, callback) => {
      let total = +this.formData.total; // 发放总张数
      let limit = +this.formData.limit; // 领券限制
      let reg = /\./;
      if (total < limit) {
        callback(new Error("总张数 >= 领券限制"));
      } else if (reg.test(value)) {
        callback(new Error("请输入整数"));
      } else if (value === "") {
        callback(new Error("请输入数据"));
      } else if (value < 0) {
        callback(new Error("请输入正数"));
      } else if (("" + value).length > 19 || ("" + value).length < 0) {
        callback(new Error("请输入1-19字符"));
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
      } else if (("" + value).length > 19 || ("" + value).length < 0) {
        callback(new Error("请输入1-19字符"));
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
    return {
      formData: {
        type: "EXPERIENCE",
        name: "", // 券名称
        description: "", // 卡券说明
        money: "", // 体验金额
        days: "", // 持续时间
        useType: "", // 有效期类型
        limit: "1", // 领券限制
        toKnow: "", // 使用须知
        total: "", // 发放总张数
        how: "", // 使用条件
        discountsList: [] // 共享类型列表
      },
      radio: "1", // 最上边的radio
      formTitle: {
        // 最上边的radio切换
        title: "体验金券名称",
        money: "体验金金额"
      },
      forHow: [
        // 使用条件的下拉数据
        {
          label: "不与其他优惠共享",
          value: "NOSHARE"
        },
        {
          label: "可与其他优惠共享",
          value: "SHARE"
        }
      ],

      methodData: [
        // 活动奖励选项数据
        {
          label: "固定时间",
          value: "FIXATION"
        },
        {
          label: "自领取后",
          value: "GET"
        },
        {
          label: "自使用后",
          value: "USE"
        }
      ],
      options: [
        // 自领取之后和字使用之后下拉
        {
          value: "ONE",
          label: "当天"
        },
        {
          value: "TWO",
          label: "两天"
        },
        {
          value: "THREE",
          label: "三天"
        },
        {
          value: "FOUR",
          label: "四天"
        },
        {
          value: "FIVE",
          label: "五天"
        }
      ],

      jiangliKaQuan: [], // 保存已经添加的卡券奖励
      jiangliHongBao: [], // 保存已经添加的红包奖励

      COUPON_table: {
        // 红包备选表格
        show: false,
        pageSize: 10, // 分页相关
        pageNum: 1,
        total: null,
        actions: {}, // 记录表格内需要额外添加的点击事件
        data: {
          list: [], // 给表格的数据
          quanxian: [], // 记录用户的权限，当前页面显示哪些按钮、表格是否显示操作列
          title: [], // 给表格表头
          custom: [] // 给表格按钮数量、类型（编辑、删除等）
        }
      },
      PACKET_table: {
        // 红包备选表格
        show: false,
        pageSize: 10, // 分页相关
        pageNum: 1,
        total: null,
        actions: {}, // 记录表格内需要额外添加的点击事件
        data: {
          list: [], // 给表格的数据
          quanxian: [], // 记录用户的权限，当前页面显示哪些按钮、表格是否显示操作列
          title: [], // 给表格表头
          custom: [] // 给表格按钮数量、类型（编辑、删除等）
        }
      },
      COUPON_tableSearch: {
        name: "",
        couponExplain: "",
        startTime: "",
        endTime: ""
      },
      // 红包列表的搜索
      PACKET_tableSearch: {
        name: "",
        couponExplain: ""
      },
      //表单验证
      rules: {
        name: [
          { required: true, message: "请输入券的名称", trigger: "blur" },
          { min: 1, max: 19, message: "最多输入19个字", trigger: "blur" }
        ],
        description: [
          { min: 1, max: 200, message: "最多输入200个字", trigger: "blur" }
        ],
        limit: [{ validator: checkNum2, trigger: "blur" }],
        money: [
          { validator: checkNum3, trigger: "blur" },
          { required: true, message: "请输入对应的体验金额", trigger: "blur" }
        ],
        days: [
          { validator: checkNum2, trigger: "blur" },
          { required: true, message: "请输入对应的持续时间", trigger: "blur" }
        ],
        useType: [
          { required: true, message: "请选择有效期类型", trigger: "blur" }
        ],
        toKnow: [
          { required: true, message: "请输入使用须知", trigger: "blur" },
          { min: 1, max: 200, message: "最多输入200个字", trigger: "blur" }
        ],
        total: [
          { validator: checkTotalMoney, trigger: "blur" },
          { required: true, message: "请输入发放总张数", trigger: "blur" }
        ],
        how: [{ required: true, message: "请输入使用条件", trigger: "change" }]
      }
    };
  },
  beforeDestroy() {
    this.$store.commit("set_asideState", { data: true });
  },
  mounted() {
    this.toInit();
  },

  methods: {
    toInit() {
      let datas = JSON.parse(sessionStorage.getItem("step1Data"));
      let id = this.$route.query["id"];
      if (datas || id != undefined) {
        // 如果有datas 表示曾经编辑过step1，或者是从列表点击修改
        if (id) {
          // 如果有id表示是编辑
          this.$api
            .market_coupon_getInfo({
              vm: this,
              data: id
            })
            .then(res => {
              if (res) {
                // 将服务器返回的数据保存。下一步用
                let httpData = res.data;

                sessionStorage.setItem("fromHttp", JSON.stringify(httpData));
                this.couponType(httpData.type);
                let obj={};
                
                 obj= {
                  id: httpData.id,
                  type: httpData.type,
                  name: httpData.name, // 券名称
                  description: httpData.couponExplain, // 卡券说明
                  money: httpData.money, // 体验金额
                  days: httpData.durationDay, // 持续时间
                  limit: httpData.getLimit, // 领券限制
                  toKnow: httpData.useNotice, // 使用须知
                  total: httpData.issueNum, // 发放总张数
                  how: httpData.useConditions // 使用条件
                };

                switch (httpData.expiryType) {
                  //  String 有效期类型(:固定时间 GET:自领取后 USE:自使用后)
                  // 有效期类型
                  case "FIXATION":
                    obj.useType = "FIXATION";
                    break;
                  case "GET":
                    obj.useType = "GET";
                    break;
                  case "USE":
                    obj.useType = "USE";
                    break;
                }
                if (httpData.useConditions === "SHARE") {
                  let couponList = httpData.couponList;
                  let packetList = httpData.packetList;
                  if (couponList.length > 0) {
                    // 使用条件中与其他共享
                    couponList.forEach(item => {
                      // 添加卡券
                      let obj = {
                        id: item.id,
                        shareType: "COUPON",
                        shareId: item.awardValue
                      };
                      if (!obj.discountsList) {
                        obj.discountsList = [];
                      }
                      obj.discountsList.push(obj);
                      let obj2 = {
                        // 用来显示已经添加了哪些卡券
                        type: "COUPON",
                        name: item.name,
                        num: item.awardValue
                      };
                      this.jiangliKaQuan.push(obj2);
                    });
                    this.toSearch("COUPON");
                  }
                  if (packetList.length > 0) {
                    // 使用条件中与其他共享
                    packetList.forEach(item => {
                      // 添加卡券
                      let obj = {
                        id: item.id,
                        shareType: "PACKET",
                        shareId: item.awardValue
                      };
                      if (!obj.discountsList) {
                        obj.discountsList = [];
                      }
                      obj.discountsList.push(obj);
                      let obj2 = {
                        // 用来显示已经添加了哪些卡券
                        type: "PACKET",
                        name: item.name,
                        num: item.awardValue
                      };
                      this.jiangliHongBao.push(obj2);
                    });
                    this.toSearch("PACKET");
                  }
                  this.$store.commit("set_asideState", { data: false });
                }
                switch (httpData.expiryType) {
                  case "FIXATION":
                    obj.gudingTime = [
                      new Date(httpData.startTime),
                      new Date(httpData.endTime)
                    ]; // 有效期时间值为固定时间的
                    this.rules.gudingTime = [
                      {
                        required: true,
                        message: "请输入固定期限",
                        trigger: "change"
                      }
                    ];
                    break;
                  case "GET":
                    obj.afterGet = httpData.dayType; // 自领取之后
                    obj.afterGetValue = httpData.expiryDay; // 自领取之后的值
                    this.rules.afterGet = [
                      {
                        required: true,
                        message: "请输入自领取之后",
                        trigger: "change"
                      }
                    ];
                    this.rules.afterGetValue = [
                      {
                        required: true,
                        message: "请输入自领取之后期限",
                        trigger: "change"
                      }
                    ];
                    break;
                  case "USE":
                    obj.afterUse = httpData.dayType; // 自使用之后
                    obj.afterUseValue = httpData.expiryDay; // 自使用之后的值
                    this.rules.afterUse = [
                      {
                        required: true,
                        message: "请输入自使用之后",
                        trigger: "change"
                      }
                    ];
                    this.rules.afterUseValue = [
                      {
                        required: true,
                        message: "请输入自领取之后期限",
                        trigger: "change"
                      }
                    ];
                    break;
                }
                this.formData=obj;
              }
            });
        } else {
          // 表示是曾经编辑过的step1
          this.formData = datas;
          if (sessionStorage.getItem("jiangliHongBao")) {
            this.jiangliHongBao = JSON.parse(
              sessionStorage.getItem("jiangliHongBao")
            );
            this.toSearch("PACKET");
            this.$store.commit("set_asideState", { data: false });
          }
          if (sessionStorage.getItem("jiangliKaQuan")) {
            this.jiangliKaQuan = JSON.parse(
              sessionStorage.getItem("jiangliKaQuan")
            );
            this.toSearch("COUPON");
            this.$store.commit("set_asideState", { data: false });
          }
        }
      }
    },
    // 有效期计算方式变更
    setUseType() {
      let type = this.formData["useType"];
      delete this.formData["gudingTime"];
      delete this.formData["afterGet"];
      delete this.formData["afterGetValue"];
      delete this.formData["afterUse"];
      delete this.formData["afterUseValue"];

      delete this.rules["gudingTime"];
      delete this.rules["afterGet"];
      delete this.rules["afterGetValue"];
      delete this.rules["afterUse"];
      delete this.rules["afterUseValue"];
      let obj = { ...this.formData };
      let rule = { ...this.rules };
      switch (type) {
        case "FIXATION":
          obj.gudingTime = []; // 有效期时间值为固定时间的
          rule.gudingTime = [
            { required: true, message: "请输入固定期限", trigger: "change" }
          ];
          break;
        case "GET":
          obj.afterGet = ""; // 自领取之后
          obj.afterGetValue = ""; // 自领取之后的值
          rule.afterGet = [
            { required: true, message: "请输入自领取之后", trigger: "change" }
          ];
          rule.afterGetValue = [
            { validator: this.checkNumFN, trigger: "blur" },
            {
              required: true,
              message: "请输入自领取之后期限",
              trigger: "blur"
            }
          ];
          break;
        case "USE":
          obj.afterUse = ""; // 自使用之后
          obj.afterUseValue = ""; // 自使用之后的值
          rule.afterUse = [
            { required: true, message: "请输入自使用之后", trigger: "change" }
          ];
          rule.afterUseValue = [
            { validator: this.checkNumFN, trigger: "blur" },
            {
              required: true,
              message: "请输入自使用之后期限",
              trigger: "blur"
            }
          ];
          break;
      }
      this.formData = obj;
      this.rules = rule;
    },

    checkNumFN(rule, value, callback) {
      let reg = /\./;
      if (reg.test(value)) {
        callback(new Error("请输入整数"));
      } else if (value < 0) {
        callback(new Error("请输入正数"));
      } else if (("" + value).length > 19 || ("" + value).length < 0) {
        callback(new Error("请输入1-19字符"));
      } else {
        callback();
      }
    },
    // 使用条件变更
    howChange() {
      delete this.formData.discountsList;
      if (this.formData.how === "SHARE") {
        this.formData.discountsList = [];
        let one = this.toSearch("COUPON");
        let two = this.toSearch("PACKET");
        Promise.all([one, two]);
        this.$store.commit("set_asideState", { data: false });
      } else {
        this.jiangliHongBao = [];
        this.jiangliKaQuan = [];
        this.formData.discountsList = [];
        this.$store.commit("set_asideState", { data: true });
      }
    },
    // 查看是体验金券还是奖励金券
    couponType(val) {
      if (val == "EXPERIENCE") {
        this.formTitle = {
          title: "体验金券名称",
          money: "体验金金额"
        };
      } else {
        this.formTitle = {
          title: "奖励金券名称",
          money: "奖励金金额"
        };
      }
    },
    // 备选表格的查询
    toSearch(type) {
      switch (type) {
        case "COUPON": // 卡券查询
          this.COUPON_Search(this.COUPON_tableSearch);
          break;
        case "PACKET": // 红包查询
          this.PACKET_Search(this.PACKET_tableSearch);
          break;
      }
    },
    // 监听表格的操作
    tableEmit(type, data) {
      switch (type.type) {
        case "regetData": // 分页的emit
          if (data === "coupon") {
            let obj = {
              pageNum: this.COUPON_table.pageNum,
              pageSize: this.COUPON_table.pageSize
            };
            this.COUPON_Search(obj);
          }
          if (data === "packet") {
            let obj = {
              pageNum: this.PACKET_table.pageNum,
              pageSize: this.PACKET_table.pageSize
            };
            this.PACKET_Search(obj);
          }
          break;
        case "toUse": // 添加活动奖励
          if (data === "coupon") {
            // 添加卡券
            if (this.formData.discountsList.length == 0) {
              let obj = {
                shareType: "COUPON",
                shareId: type.data.id
              };
              this.formData.discountsList.push(obj);
              let obj2 = {
                // 用来显示已经添加了哪些卡券
                type: "COUPON",
                name: type.data.name,
                num: type.data.id
              };
              this.jiangliKaQuan.push(obj2);
            } else {
              let isIn = this.formData.discountsList.some(item => {
                return (
                  item.shareType == "COUPON" && item.shareId == type.data.id
                );
              });
              if (!isIn) {
                let obj = {
                  shareType: "COUPON",
                  shareId: type.data.id
                };
                this.formData.discountsList.push(obj);
                let obj2 = {
                  // 用来显示已经添加了哪些卡券
                  type: "COUPON",
                  name: type.data.name,
                  num: type.data.id
                };
                this.jiangliKaQuan.push(obj2);
              } else {
                this.$message.warning("已经使用了！");
              }
            }
          }
          if (data === "packet") {
            // 添加红包
            if (this.formData.discountsList.length == 0) {
              let obj = {
                shareType: "PACKET",
                shareId: type.data.id
              };
              this.formData.discountsList.push(obj);
              let obj2 = {
                // 用来显示已经添加了哪些卡券
                type: "PACKET",
                name: type.data.name,
                num: type.data.id
              };
              this.jiangliHongBao.push(obj2);
            } else {
              let isIn = this.formData.discountsList.some(item => {
                return (
                  item.shareType == "PACKET" && item.shareId == type.data.id
                );
              });
              if (!isIn) {
                let obj = {
                  shareType: "PACKET",
                  shareId: type.data.id
                };
                this.formData.discountsList.push(obj);
                let obj2 = {
                  // 用来显示已经添加了哪些红包
                  type: "PACKET",
                  name: type.data.name,
                  num: type.data.id
                };
                this.jiangliHongBao.push(obj2);
              } else {
                this.$message.warning("已经使用了！");
              }
            }
          }
          break;
      }
    },
    // 删除奖励
    deleteJiangli(item) {
      if (item.type === "PACKET") {
        this.jiangliHongBao = this.jiangliHongBao.filter(tar => {
          return tar.num != item.num;
        });
      }
      if (item.type === "COUPON") {
        this.jiangliKaQuan = this.jiangliKaQuan.filter(tar => {
          return tar.num != item.num;
        });
      }
      // 红包和卡券有可能id相同，所以只能用删除项在awardList 的索引进行删除
      let num;
      for (let i = this.formData.discountsList.length; i--; ) {
        if (
          this.formData.discountsList[i].shareId == item.num &&
          this.formData.discountsList[i].shareType === item.type
        ) {
          num = i;
        }
      }
      this.formData.discountsList.splice(num, 1);
    },
    // 卡券表格的查询
    COUPON_Search(data) {
      this.$api
        .market_create_getCouponList({
          vm: this,
          data: data
        })
        .then(res => {
          this.COUPON_table.total = res.data.total > 0 ? res.data.total : 1;
          // title 里显示的没有额外设置的表头，其他有额外设置的，需要另添加
          this.COUPON_table.data.title = [
            {
              title: "卡券名称",
              key: "name",
              minWidth: "80"
            },
            {
              title: "卡券说明",
              key: "couponExplain",
              minWidth: "80"
            },
            {
              title: "持续时间",
              key: "durationDay",
              minWidth: "70"
            },
            {
              title: "有效期开始时间",
              key: "startTime",
              minWidth: "160"
            },
            {
              title: "有效期结束时间",
              key: "endTime",
              minWidth: "160"
            }
          ];
          this.COUPON_table.data.custom = [
            {
              text: "使用",
              type: "warning",
              size: "small",
              emit: "toUse"
            }
          ];
          this.COUPON_table.data.list = [...res.data.list];
          this.COUPON_table.data.quanxian = ["1"];
        })
        .then(() => {
          this.COUPON_table.show = true;
        });
    },
    // 红包表格的查询
    PACKET_Search(data) {
      this.$api
        .market_create_getPacketList({
          vm: this,
          data: data
        })
        .then(res => {
          this.PACKET_table.total = res.data.total > 0 ? res.data.total : 1;
          // title 里显示的没有额外设置的表头，其他有额外设置的，需要另添加
          this.PACKET_table.data.title = [
            {
              title: "红包名称",
              key: "name",
              minWidth: "80"
            },
            {
              title: "红包说明",
              key: "packetExplain",
              minWidth: "80"
            },
            {
              title: "总金额",
              key: "totalAmount",
              minWidth: "70"
            },
            {
              title: "总个数",
              key: "totalNum",
              minWidth: "60"
            },
            {
              title: "创建时间",
              key: "gmtCreated",
              minWidth: "160"
            }
          ];
          this.PACKET_table.data.custom = [
            {
              text: "使用",
              type: "warning",
              size: "small",
              emit: "toUse"
            }
          ];
          this.PACKET_table.data.quanxian = ["1"];
          this.PACKET_table.data.list = [...res.data.list];
        })
        .then(() => {
          this.PACKET_table.show = true;
        });
    },
    // 重置
    reset() {
      let id = this.$route.query["id"];

      new Promise(res => {
        this.$refs.formData.resetFields();
        this.jiangliKaQuan = []; // 保存已经添加的卡券奖励
        this.jiangliHongBao = []; // 保存已经添加的红包奖励
        this.COUPON_table = {
          // 卡券
          // 传给table子组件的数据
          pageSize: 10, // 分页相关
          pageNum: 1,
          total: null,
          actions: {}, // 记录表格内需要额外添加的点击事件
          data: {
            list: [], // 给表格的数据
            quanxian: [], // 记录用户的权限，当前页面显示哪些按钮、表格是否显示操作列
            title: [], // 给表格表头
            custom: [] // 给表格按钮数量、类型（编辑、删除等）
          }
        };
        this.PACKET_table = {
          // 红包
          // 传给table子组件的数据
          pageSize: 10, // 分页相关
          pageNum: 1,
          total: null,
          actions: {}, // 记录表格内需要额外添加的点击事件
          data: {
            list: [], // 给表格的数据
            quanxian: [], // 记录用户的权限，当前页面显示哪些按钮、表格是否显示操作列
            title: [], // 给表格表头
            custom: [] // 给表格按钮数量、类型（编辑、删除等）
          }
        };
        this.COUPON_tableSearch = {
          name: "",
          couponExplain: "",
          startTime: "",
          endTime: ""
        };
        // 红包列表的搜索
        this.PACKET_tableSearch = {
          name: "",
          couponExplain: ""
        };
        this.formData = {
          type: "EXPERIENCE",
          name: "", // 券名称
          description: "", // 卡券说明
          money: "", // 体验金额
          days: "", // 持续时间
          useType: "", // 有效期类型
          limit: "", // 领券限制
          toKnow: "", // 使用须知
          total: "", // 发放总张数
          how: "" // 使用条件
        };
        res();
      }).then(() => {
        if (id) {
          this.toInit();
        }
      });
    },
    // 下一步
    step() {
      this.$refs.formData.validate(valid => {
        if (valid) {
          if (
            this.formData.how === "SHARE" &&
            this.formData.discountsList.length == 0
          ) {
            this.$message.error(
              "请选择使用的卡券或红包，或者不与其他优惠共享！"
            );
            return;
          }

          sessionStorage.setItem("step1Data", JSON.stringify(this.formData));
          sessionStorage.setItem(
            "jiangliKaQuan",
            JSON.stringify(this.jiangliKaQuan)
          );
          sessionStorage.setItem(
            "jiangliHongBao",
            JSON.stringify(this.jiangliHongBao)
          );
          this.$router.push({ name: `coupon_add_step2` });
        } else {
          this.$message.error("请选择将数据正确填写完整！");
        }
      });
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
.addDanWei,
.forMoney,
.forDays {
  width: 180px;
  position: relative;
}
.addDanWei + span {
  position: absolute;
  right: 0px;
  top: 24px;
  display: inline-block;
  width: 220px;
  vertical-align: middle;
  color: rgb(231, 227, 227);
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
</style>
