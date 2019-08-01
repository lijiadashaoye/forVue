<template>
  <div class="withTree">
    <div class="forTree">
      <h3>{{pageName}}</h3>

      <div class="treeTop">
        <span>存款系列</span>
        <el-button size="mini" @click="toAdd_xilie">新增</el-button>
      </div>

      <div class="forT">
        <p class="allPro" @click="getList('all',null)">全部存款产品</p>
        <ul>
          <li v-for="item of menuTree" :key="item.institutionId">
            <p @click="treeShow(item.institutionId);getList('father',item)" class="forTtitle">
              <i
                v-show="isShow(item.institutionId)"
                style="color:skyblue"
                :class="`myIcon12px icon-xiasanjiaoxiangxiamianxing`"
              ></i>
              <i
                v-show="!isShow(item.institutionId)"
                style="color:skyblue"
                :class="`myIcon12px icon-yousanjiaoxiangyoumianxing`"
              ></i>
              {{item.institutionName}}
            </p>
            <ul ref="forUl" class="forTList" v-show="isShow(item.institutionId)">
              <li>
                <p @click="useIt(item,$event);getList('none',item)" style="width:100%;">无系列</p>
              </li>
              <li v-for="child of item.seriesList" :key="child.id">
                <p
                  @click="useIt(child,$event);getList('child',child)"
                  style="width:100%;"
                >{{child.name}}</p>

                <el-dropdown size="mini" @command="handleCommand(child,$event)">
                  <span class="el-dropdown-link">
                    <i class="el-icon-edit el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="edit">编辑</el-dropdown-item>
                    <el-dropdown-item command="delete">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </li>
            </ul>
          </li>
        </ul>

        <el-dialog
          :close-on-click-modal="false"
          :title="addXiLieForm.title"
          :visible.sync="addXiLieForm.toShow"
          width="450px"
          :before-close="toCloseCunkuanDialog"
        >
          <el-form
            :model="addXiLieForm"
            label-width="110px"
            label-suffix=":"
            label-position="right"
          >
            <el-form-item label="* 机构">
              <el-select
                :disabled="addXiLieForm.type=='edit'"
                v-model="addXiLieForm.jigou"
                clearable
                placeholder="请选择"
                style="width:calc(100% - 40px);margin-right:3px;"
              >
                <el-option
                  size="mini"
                  v-for="item in dictData.jigou"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
              <a class="isAClick" @click="toJiGou">无机构？</a>
            </el-form-item>

            <el-form-item label="* 产品系列名称">
              <el-input v-model="addXiLieForm.xilie" placeholder="请输入产品关键字"></el-input>
            </el-form-item>
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="addXiLieSave" type="primary">保 存</el-button>
            <el-button @click="toCloseCunkuanDialog">取 消</el-button>
          </div>
        </el-dialog>
      </div>
    </div>

    <div class="forRight">
      <div style="margin-bottom:5px;">
        <el-button size="mini" type="primary" @click="addNew()">新增存款产品</el-button>
        <!-- v-if="tableInputData.data.quanxian.includes('sys_user_add')" -->
        <!-- <el-button
          size="mini"
          type="success"
          @click="outPut(true)"
        >导出</el-button>
        <el-button
          size="mini"
          type="warning"
          @click="inPut(true)"
        >导入</el-button>-->
        <el-button size="mini" type="warning" @click="seachClick('search')">查询</el-button>
        <el-button size="mini" type="info" @click="seachClick('reset')">重置</el-button>
        <el-button size="mini" type="danger" @click="toDelete('more')">批量删除</el-button>
      </div>

      <el-form
        :inline="true"
        :model="searchForm"
        label-width="80px"
        label-suffix=":"
        label-position="right"
        size="mini"
        ref="searchForm"
      >
        <el-form-item style="margin-bottom:5px;">
          <el-input v-model="searchForm.name" placeholder="请输入产品名称"></el-input>
        </el-form-item>

        <el-form-item label="是否上架" style="margin-bottom:5px;">
          <el-select v-model="searchForm.shelve" clearable placeholder="请选择">
            <el-option
              size="mini"
              v-for="item in shelveList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="产品类型" style="margin-bottom:5px;">
          <el-select v-model="searchForm.productSubtype" clearable placeholder="请选择">
            <el-option
              size="mini"
              v-for="item in dictData.deposit_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="创建时间" style="margin-bottom:5px;">
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="riqi"
            type="daterange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
            style="width:100%"
          ></el-date-picker>
        </el-form-item>
      </el-form>

      <div id="forTable">
        <isTable :inputData="tableInputData" @tableEmit="tableEmit" />
      </div>
    </div>

    <el-dialog
      :close-on-click-modal="false"
      title="选择存款类别"
      :visible.sync="cunkuanDialog"
      width="500px"
      :before-close="toCloseCunkuanDialog"
    >
      <div class="addCunkuan">
        <el-button type="primary" @click="toAdd_Cunkuan('活期')">活期存款</el-button>
        <el-button type="primary" @click="toAdd_Cunkuan('定期')">定期存款</el-button>
        <el-button type="primary" @click="toAdd_Cunkuan('智能')">智能存款</el-button>
        <el-button type="primary" @click="toAdd_Cunkuan('结构')">结构性存款</el-button>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="toCloseCunkuanDialog">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import isTable from "../../../../components/isTable/isTable.vue";

export default {
  props: {},
  data() {
    return {
      cunkuanDialog: false, // 控制新建存款弹框的显示隐藏
      addXiLieForm: {
        // tree 里面的新增弹框
        jigou: "",
        xilie: "",
        toShow: false,
        title: "",
        type: ""
      },
      menuTree: [], //  产品系列数据
      showArr: [], // 用来展开、收拢tree
      deleteData: [], // 储存需要删除的数据
      aloneDeleteData: [], // 储存需要单独删除的数据
      loadEnd: false, // 控制当表格的数据全部获取完才显示表格
      pageName: "", // 当前页面名字
      riqi: [], // 创建时间
      searchForm: {
        name: "", // 产品关键字
        shelve: "", // 是否上架
        productSubtype: "", // 产品类型
        createTimeStart: "", // 创建时间（开始）
        createTimeEnd: "" // 创建时间（结束）
      }, // 搜索表单
      dictData: {}, // 数据字典
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
      shelveList: [
        {
          label: "上架中",
          value: "YES"
        },
        {
          label: "已下架",
          value: "NO"
        }
      ]
    };
  },
  components: {
    isTable
  },
  mounted() {
    // step1里点击无系列
    let kk = this.$route.query.institutionId;
    if (kk) {
      this.toAdd_xilie(+kk);
    }

    this.loadEnd = false;
    this.pageName = sessionStorage.getItem("page"); // 获取页面名称
    // 获取当前页面使用的字典数据
    this.dictData = JSON.parse(sessionStorage.getItem("dict"));
    this.canDoWhat();
    this.getUserData();
    this.treeData();
    sessionStorage.removeItem("xilie_jigou");
    // 清空新增活期时用到的
    sessionStorage.removeItem("huoqi_step1");
    sessionStorage.removeItem("huoqi_step2");

    // 清空新增定期时用到的
    sessionStorage.removeItem("dingqi_step1");
    sessionStorage.removeItem("dingqi_step2");

    // 清空新增定期时用到的
    sessionStorage.removeItem("zhineng_step1");
    sessionStorage.removeItem("zhineng_step2");
    // 清空新增定期时用到的
    sessionStorage.removeItem("jiegou_step1");
    sessionStorage.removeItem("jiegou_step2");
  },
  methods: {
    // 获取tree，第二页需要用到的标签数据
    treeData() {
      this.$api.get_treeData({ vm: this }).then(res => {
        this.menuTree = res.data;
        sessionStorage.setItem("xilie_data", JSON.stringify(this.menuTree));
      });
    },
    // tree 的编辑、删除
    handleCommand(data, type) {
      if (type === "edit") {
        this.addXiLieForm.title = "编辑存款系列";
        this.addXiLieForm.toShow = true;
        this.addXiLieForm.jigou = data.institutionId; // 机构id
        this.addXiLieForm.xilie = data.name; // 系列名
        this.addXiLieForm.target = data; // 原来的系列数据
        this.addXiLieForm.type = "edit";
      }
      if (type === "delete") {
        // 删除
        this.$confirm("确认删除吗?")
          .then(() => {
            this.$api
              .left_xilie_delete({
                vm: this,
                id: data.id
              })
              .then(res => {
                if (res) {
                  this.treeData();
                }
              });
          })
          .catch(() => {});
      }
    },
    // 选择产品系列
    useIt(data, e) {
      let arr = Array.from(this.$refs.forUl);
      arr.forEach(item => {
        Array.from(item.children).forEach(
          child => (child.style = "background:none")
        );
      });
      if (e) {
        e.target.parentNode.style = "background:skyblue;color:#fff;";
      }
      sessionStorage.setItem("xilie_jigou", JSON.stringify(data));
    },
    // tree 切换展开收拢
    treeShow(id) {
      let isIn = this.showArr.some(item => item === id);
      if (isIn) {
        this.showArr = this.showArr.filter(item => item != id);
      } else {
        this.showArr.push(id);
      }
    },
    // 用来判断tree是否展开
    isShow(id) {
      return this.showArr.some(item => item === id);
    },
    //////////////////////////////////////////////////////
    // 监听表格的操作
    tableEmit(data) {
      switch (data.type) {
        case "regetData": // 分页的emit
          this.seachClick("fenye");
          break;
        case "copy": // 复制按钮
          sessionStorage.setItem(
            "xilie_jigou",
            JSON.stringify({
              institutionId: data.data.institutionId,
              id: data.data.seriesId
            })
          );
          switch (data.data.productSubtype) {
            case "demand_deposit": // 活期存款
              this.get_huoqi_xiangqing(data.data.id);
              break;
            case "time_deposit": // 定期存款
              this.get_dingqi_xiangqing(data.data.id);
              break;
            case "intelligent_deposit": // 智能存款
              this.get_zhineng_xiangqing(data.data.id);
              break;
            case "structured_deposit": // 结构存款
              this.get_jiegou_xiangqing(data.data.id);
              break;
          }
          break;
        case "delete": // 单独删除按钮
          this.aloneDeleteData = [];
          this.aloneDeleteData.push(data.data.id);
          this.toDelete("alone");
          break;
        case "moreDelete": // 批量删除按钮
          var arr = data.data.map(item => item.id);
          this.deleteData = arr;
          break;
        case "switch": // switch 变换
          this.switchAction(data.data);
          break;
        case "textClick": // 文字点击
          this.$router.push({
            name: "deposit_info",
            query: {
              id: data.data.id, // 产品 id
              name: data.data.name, // 产品名称
              type: data.data.productSubtype // 产品类型
            }
          });
          break;
      }
    },

    /////////////////////////////////////////////////////
    // 活期存款数据
    get_huoqi_xiangqing(id) {
      this.$api
        .huoqi_info({
          vm: this,
          data: id
        })
        .then(res => {
          if (res.success) {
            // 获取当前产品的详情数据
            let step1 = {
              deadlineAlias: res.data.deadlineAlias, // 期限别名
              description: res.data.description, // 产品描述
              increaseAmount: res.data.increaseAmount, // 递增金额
              institutionId: res.data.institutionId, // 机构id
              interestRate: res.data.interestRate, // 利率
              interestRateAlias: res.data.interestRateAlias, // 利率别名
              marks: res.data.productTags.map(tar => tar.id), // 标签
              minAmount: res.data.minAmount, // 起存金额
              name: res.data.name, // 产品名称
              seriesId: res.data.seriesId, // 产品系列ID
              typeAlias: res.data.typeAlias // 产品类型（类别别名）
            };
            let step2 = {
              sameProductFlag: res.data.appInfo.sameProductFlag, // 同一产品标识
              shelve: res.data.appInfo.shelve === "YES" ? "是" : "否", // 是否上架
              visaInterview:
                res.data.appInfo.visaInterview === "YES" ? "是" : "否", // 是否面签
              recommend: res.data.appInfo.recommend === "YES" ? "是" : "否", // 是否推荐
              homePage: res.data.appInfo.homePage === "YES" ? "是" : "否", // 是否首页排行
              defaultBuyNum: res.data.appInfo.defaultBuyNum, // 默认存款笔数
              defaultAmount: res.data.appInfo.defaultAmount, // 默认购买金额
              listAreaFlag: res.data.appInfo.listAreaFlag // 榜单专区标识
            };
            sessionStorage.setItem("huoqi_step1", JSON.stringify(step1));
            sessionStorage.setItem("huoqi_step2", JSON.stringify(step2));
            this.toAdd_Cunkuan("活期");
          }
        });
    },
    // 定期存款数据
    get_dingqi_xiangqing(id) {
      this.$api
        .dingqi_info({
          vm: this,
          data: id
        })
        .then(res => {
          if (res.success) {
            let step1 = {
              institutionId: res.data.institutionId, // 机构名称
              seriesId: res.data.seriesId, // 产品系列ID
              name: res.data.name, // 产品名称
              typeAlias: res.data.typeAlias, // 产品类型（类别别名）
              interestModeWay: res.data.interestModeWay, // 收益返还方式
              frequencyType: res.data.frequencyType, // 付息频率
              regulatoryProperty: res.data.regulatoryProperty, // 监管属性
              purchaseAmount: res.data.minAmount, // 起存金额
              increaseAmount: res.data.increaseAmount, // 递增金额
              marks: res.data.productTags.map(tar => tar.id), // 标签
              renewal: res.data.renewal === "YES" ? "是" : "否", // 到期是否转存
              payTime: res.data.withdrawalTime, // 支付时间
              description: res.data.description, // 产品描述
              area: res.data.appInfo.areaCode, // 所属区域
              lilv: []
            };
            let arr = res.data.interestRates;
            if (arr.length > 0) {
              for (let i = 0; i < arr.length; i++) {
                step1.lilv.push({
                  id: arr[i].id,
                  limit: arr[i].deadline, // 期限
                  danwei: arr[i].timeUnitType, // 单位
                  lilv: arr[i].interestRate, // 利率
                  lockinPeriod: arr[i].lockinPeriod, // 锁定期限
                  beizhu: arr[i].remark, // 备注
                  showList: arr[i].showList, // 榜单展示
                  lockinShowList: arr[i].lockinShowList // 锁定期榜单展示
                });
              }
            }
            let step2 = {
              sameProductFlag: res.data.appInfo.sameProductFlag, // 同一产品标识
              shelve: res.data.appInfo.shelve === "YES" ? "是" : "否", // 是否上架
              visaInterview:
                res.data.appInfo.visaInterview === "YES" ? "是" : "否", // 是否面签
              recommend: res.data.appInfo.recommend === "YES" ? "是" : "否", // 是否推荐
              homePage: res.data.appInfo.homePage === "YES" ? "是" : "否", // 是否首页排行
              defaultNum: res.data.appInfo.defaultBuyNum, // 默认购买数量
              defaultAmount: res.data.appInfo.defaultAmount, // 默认购买金额
              defaultFlowNum: res.data.appInfo.defaultFlowNum, // 默认关注数量
              listAreaFlag: res.data.appInfo.listAreaFlag, // 榜单专区标识
              yearRate: res.data.appInfo.yearRate, //  年收费率
              autoShelve: res.data.appInfo.autoShelve === "YES" ? "是" : "否", // 自动上架
              showBankPage: res.data.appInfo.showBankPage, //  显示银行过渡页
              connectionMode: res.data.appInfo.connectionMode, //  银行对接方式
              cooperationMode: res.data.appInfo.cooperationMode, //  合作方式
              H5Url: res.data.appInfo.h5Url, //  H5链接
              realNameAuth:
                res.data.appInfo.realNameAuth === "YES" ? "是" : "否", // 实名认证
              signed: res.data.appInfo.signed === "YES" ? "是" : "否" // 是否签约
            };
            sessionStorage.setItem("dingqi_step1", JSON.stringify(step1));
            sessionStorage.setItem("dingqi_step2", JSON.stringify(step2));
            this.toAdd_Cunkuan("定期");
          }
        });
    },
    // 智能存款数据
    get_zhineng_xiangqing(id) {
      this.$api
        .zhineng_info({
          vm: this,
          data: id
        })
        .then(res => {
          if (res.success) {
            let step1 = {
              institutionId: res.data.institutionId, // 机构名称
              seriesId: res.data.seriesId, // 产品系列ID
              name: res.data.name, // 产品名称
              typeAlias: res.data.typeAlias, // 产品类型（类别别名）
              interestMode: res.data.interestMode, // 计息方式
              purchaseAmount: res.data.minAmount, // 起存金额
              increaseAmount: res.data.increaseAmount, // 递增金额
              marks: res.data.productTags.map(tar => tar.id), // 标签
              renewal: res.data.renewal === "是" ? "YES" : "NO", // 到期是否转存
              payTime: res.data.withdrawalTime, // 支取时间
              description: res.data.description, // 产品描述
              lilv: [], // 利率表格
              interestRateAlias: res.data.interestRateAlias // 利率别名
            };
            let step2 = {
              sameProductFlag: res.data.appInfo.sameProductFlag, // 同一产品标识
              shelve: res.data.appInfo.shelve === "YES" ? "是" : "否", // 是否上架
              visaInterview:
                res.data.appInfo.visaInterview === "YES" ? "是" : "否", // 是否面签
              recommend: res.data.appInfo.recommend === "YES" ? "是" : "否", // 是否推荐
              homePage: res.data.appInfo.homePage === "YES" ? "是" : "否", // 是否首页排行
              defaultNum: res.data.appInfo.defaultBuyNum, // 默认购买数量
              defaultAmount: res.data.appInfo.defaultAmount, // 默认购买金额
              listAreaFlag: res.data.appInfo.listAreaFlag // 榜单专区标识
            };
            let arr = res.data.interestRates;
            if (arr.length > 0) {
              for (let i = 0; i < arr.length; i++) {
                step1.lilv.push({
                  id: arr[i].id,
                  limit: arr[i].deadline, // 期限
                  danwei: arr[i].timeUnitType, // 单位
                  lilv: arr[i].interestRate, // 利率
                  lockinPeriod: arr[i].lockinPeriod, // 锁定期限
                  beizhu: arr[i].remark, // 备注
                  showList: arr[i].showList, // 榜单展示
                  lockinShowList: arr[i].lockinShowList // 锁定期榜单展示
                });
              }
            }
            sessionStorage.setItem("zhineng_step1", JSON.stringify(step1));
            sessionStorage.setItem("zhineng_step2", JSON.stringify(step2));
            this.toAdd_Cunkuan("智能");
          }
        });
    },
    // 结构存款数据
    get_jiegou_xiangqing(id) {
      return this.$api
        .jigou_info({
          vm: this,
          data: id
        })
        .then(res => {
          if (res.success) {
            let step1 = {
              institutionId: res.data.institutionId, // 机构名称
              seriesId: res.data.seriesId, // 产品系列ID
              name: res.data.name, // 产品名称
              typeAlias: res.data.typeAlias, // 产品类型（类别别名）
              interestRate: res.data.interest.interestRate, // 利率
              interestRateAlias: res.data.interestRateAlias, // 利率别名
              max: res.data.interest.maxInterestRate, // 最高利率
              end: res.data.interest.expireInterestRate, // 到期利率
              purchaseAmount: res.data.minAmount, // 起存金额
              increaseAmount: res.data.increaseAmount, // 递增金额
              fengxian: res.data.riskLevel, // 风险等级
              surplusQuota: res.data.surplusQuota, // 剩余额度
              qixian: res.data.interest.deadline, // 投资期限
              deadlineAlias: res.data.deadlineAlias, // 期限别名
              regulatoryProperty: res.data.regulatoryProperty, // 监管属性
              qishou: res.data.sellingDate, // 起售日期
              qixi: res.data.valueDate, // 起息日期
              marks: res.data.productTags.map(tar => tar.id), // 标签
              description: res.data.description // 产品描述
            };
            let step2 = {
              sameProductFlag: res.data.appInfo.sameProductFlag, // 同一产品标识
              shelve: res.data.appInfo.shelve === "YES" ? "是" : "否", // 是否上架
              visaInterview:
                res.data.appInfo.visaInterview === "YES" ? "是" : "否", // 是否面签
              recommend: res.data.appInfo.recommend === "YES" ? "是" : "否", // 是否推荐
              homePage: res.data.appInfo.homePage === "YES" ? "是" : "否", // 是否首页排行
              defaultNum: res.data.appInfo.defaultBuyNum, // 默认购买数量
              defaultAmount: res.data.appInfo.defaultAmount, // 默认购买金额
              listAreaFlag: res.data.appInfo.listAreaFlag // 榜单专区标识
            };
            sessionStorage.setItem("jiegou_step1", JSON.stringify(step1));
            sessionStorage.setItem("jiegou_step2", JSON.stringify(step2));
            this.toAdd_Cunkuan("结构");
          }
        });
    },

    //////////////////////////////////////////////////////
    // 新增存款（活期，智能，结构）
    toAdd_Cunkuan(type) {
      let routeUrl = "";
      switch (type) {
        case "活期": // add_huoqi
          routeUrl = "huoqi_step1";
          break;
        case "定期": // add_dingqi
          routeUrl = "dingqi_step1";
          break;
        case "智能": // add_zhineng
          routeUrl = "zhineng_step1";
          break;
        case "结构": // add_jiegou
          routeUrl = "jiegou_step1";
          break;
      }
      this.$router.push({
        name: routeUrl
      });
    },
    // 表单左侧 tree 里的新增按钮
    toAdd_xilie(id) {
      this.addXiLieForm.title = "新增存款系列";
      this.addXiLieForm.toShow = true;
      this.addXiLieForm.type = "add";
      if (id && typeof id == "number") {
        // 通过点击：无产品系列？跳过来的
        this.addXiLieForm.jigou = id; // 机构id
      }
    },
    // tree 里的新增弹框保存
    addXiLieSave() {
      let obj = {},
        httpType = ""; // 最终返回的数据
      if (this.addXiLieForm.jigou != "" && this.addXiLieForm.xilie != "") {
        if (this.addXiLieForm.xilie.length < 50) {
          let jigou = this.dictData.jigou.filter(
            item => item.id == this.addXiLieForm.jigou
          )[0];
          if (this.addXiLieForm.type === "edit") {
            httpType = "put";
            // 编辑
            obj = {
              id: this.addXiLieForm.target.id,
              institutionId: jigou.id,
              institutionName: jigou.name,
              name: this.addXiLieForm.xilie,
              type: "deposit"
            };
          } else {
            httpType = "post";
            // 新增
            obj = {
              institutionId: jigou.id,
              institutionName: jigou.name,
              name: this.addXiLieForm.xilie,
              type: "deposit"
            };
          }

          this.$api
            .left_xilie({
              vm: this,
              httpType: httpType,
              data: obj
            })
            .then(res => {
              if (res) {
                this.treeData();
                this.toCloseCunkuanDialog();
              }
            });
        } else {
          this.$message.error("系列名字太长，请输入小于50字符！");
        }
      } else {
        this.$message.error("请填写必填数据！");
      }
    },
    // 关闭tree里 点击新增按钮的弹框
    toCloseCunkuanDialog() {
      this.cunkuanDialog = false;
      this.addXiLieForm = {
        jigou: "",
        xilie: "",
        toShow: false,
        title: "",
        type: ""
      };
      // 清除路由参数
      if (this.$route.query.institutionId) {
        this.$router.push({
          name: "deposit"
        });
      }
    },
    //////////////////////////////////////////////////////
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
          this.seachClick("upDown");
        });
    },
    // 删除、批量删除
    toDelete(type) {
      if (type === "alone") {
        this.$confirm("确认删除吗？")
          .then(() => {
            this.$api
              .product_cunkuan_delete({
                vm: this,
                data: this.aloneDeleteData[0]
              })
              .then(res => {
                if (res) {
                  this.$message.success("删除成功！");
                  this.seachClick("delete");
                }
              });
          })
          .catch(() => {});
      }
      if (type == "more") {
        if (this.deleteData.length == 0) {
          this.$message.warning("请选择要删除的！");
        } else {
          this.$confirm("确认删除吗？")
            .then(() => {
              let promiseArr = [];
              let tableData = this.tableInputData.data.list; // 获取表格的数据
              this.deleteData.forEach(item => {
                let del = this.$api
                  .product_cunkuan_delete({
                    vm: this,
                    data: item
                  })
                  .then(res => {
                    let obj;
                    if (res) {
                      obj = {
                        ok: true,
                        data: item
                      };
                    } else {
                      obj = {
                        ok: false,
                        data: tableData.filter(tar => tar.id == item)
                      };
                    }
                    return obj;
                  });
                promiseArr.push(del);
              });

              Promise.all(promiseArr).then(arr => {
                this.deleteData = [];
                // 拼接删除结果
                let numSucces = 0;
                let numFail = 0;
                let failName = "";
                let titleText = `失败的数据为：\n `;
                arr.forEach(item => {
                  if (item.ok) {
                    numSucces++;
                  } else {
                    numFail++;
                    failName += `名称：${item.data[0].name} \n`;
                  }
                });
                let str = `共操作 ${arr.length} 条数据，成功 ${numSucces} 个，失败 ${numFail} 个 \n`;

                if (numFail > 0) {
                  str += titleText + failName;
                }
                this.$alert(str, "操作结果提示", {
                  confirmButtonText: "确定",
                  callback: this.seachClick("delete")
                });
              });
            })
            .catch(() => {});
        }
      }
    },
    // 新增存款
    addNew() {
      let kk = sessionStorage.getItem("xilie_jigou");
      if (kk) {
        this.cunkuanDialog = true;
      } else {
        this.$message.error("请在左侧选择存款系列！");
      }
    },
    // 导出
    outPut() {},
    // 导入
    inPut() {},
    // 用户权限判定，之后表格右侧会有不同的操作按钮
    canDoWhat() {
      let quanxian = JSON.parse(localStorage.getItem("buttenpremissions"));
      // this.tableInputData.data.custom.push({
      //   text: "复制",
      //   type: "primary",
      //   size: "mini",
      //   emit: "copy"
      // });
      this.tableInputData.data.custom.push({
        text: "删除",
        type: "danger",
        size: "mini",
        emit: "delete"
      });
    },
    // 获取数据后的处理
    afterGetData(data) {
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
        resolve();
      }).then(() => {
        this.loadEnd = true;
      });
    },
    // 搜索框、重置
    seachClick(type) {
      // search  // 搜索
      // reset  // 重置
      // fenye  // 分页
      // upDown  // 上下架
      // delete // 删除
      let obj = {};
      switch (type) {
        case "search":
          if (this.riqi.length > 0) {
            this.searchForm.createTimeStart = this.riqi[0];
            this.searchForm.createTimeEnd = this.riqi[1];
          }
          // 过滤没有数据的属性
          Object.keys(this.searchForm).forEach(str => {
            if (this.searchForm[str]) {
              obj[str] = this.searchForm[str];
            }
          });
          this.tableInputData.pageSize = 10;
          this.tableInputData.pageNum = 1;
          obj.pageSize = this.tableInputData.pageSize;
          obj.pageNum = this.tableInputData.pageNum;
          this.getUserData(obj);
          break;
        case "reset":
          // 重置
          this.searchForm = {
            name: "", // 产品关键字
            shelve: "", // 是否上架
            productSubtype: "", // 产品类型
            createTimeStart: "", // 创建时间（开始）
            createTimeEnd: "" // 创建时间（结束）
          };
          this.riqi = [];
          this.tableInputData.pageSize = 10; // 分页相关
          this.tableInputData.pageNum = 1;
          this.getUserData();
          break;
        case "fenye":
        case "upDown":
        case "delete":
          if (this.riqi.length > 0) {
            this.searchForm.createTimeStart = this.riqi[0];
            this.searchForm.createTimeEnd = this.riqi[1];
          }
          // 过滤没有数据的属性
          Object.keys(this.searchForm).forEach(str => {
            if (this.searchForm[str]) {
              obj[str] = this.searchForm[str];
            }
          });
          obj.pageSize = this.tableInputData.pageSize;
          obj.pageNum = this.tableInputData.pageNum;
          this.getUserData(obj);
          break;
      }
    },
    // tree被点击时执行
    getList(type, item) {
      let obj = {};
      switch (type) {
        case "father":
        case "none":
          obj = {
            pageSize: 10,
            pageNum: 1,
            institutionId: item.institutionId
          };
          this.getUserData(obj);
          break;
        case "child":
          obj = {
            pageSize: 10,
            pageNum: 1,
            seriesId: item.id,
            institutionId: item.institutionId
          };
          this.getUserData(obj);
          break;
        case "all":
          obj = {
            pageSize: 10,
            pageNum: 1
          };
          this.getUserData(obj);
          break;
      }
    },
    // 获取表格数据
    getUserData(data) {
      let obj;
      if (data) {
        obj = data;
      } else {
        obj = {
          pageSize: this.tableInputData.pageSize,
          pageNum: this.tableInputData.pageNum
        };
      }
      this.$api
        .get_cunkuanlistData({
          vm: this,
          data: obj
        })
        .then(res => {
          if (res) {
            this.afterGetData(res.data);
          }
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

