<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
      <div style="margin-bottom:5px;">
        <el-button size="mini" type="primary" @click="addNew()">新增纯债基金</el-button>
        <el-button size="mini" type="warning" @click="seachClick('search')">查询</el-button>
        <el-button size="mini" type="info" @click="seachClick('reset')">重置</el-button>
        <el-button size="mini" type="danger" @click="toDelete('more')">批量删除</el-button>
      </div>
      <el-form
        :inline="true"
        :model="searchForm"
        label-width="85px"
        label-suffix=":"
        label-position="right"
        size="mini"
        ref="searchForm"
      >
        <el-form-item style="margin-bottom:5px;">
          <el-input v-model="searchForm.name" placeholder="请输入产品名称"></el-input>
        </el-form-item>
        <el-form-item label="交易状态" style="margin-bottom:5px;">
          <el-select filterable v-model="searchForm.status" clearable placeholder="请选择">
            <el-option
              size="mini"
              v-for="item in dictData.transaction_state"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="机构" style="margin-bottom:5px;">
          <el-select filterable v-model="searchForm.institutionId" clearable placeholder="请选择">
            <el-option
              size="mini"
              v-for="item in dictData.jigou"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="基金公司" style="margin-bottom:5px;">
          <el-select filterable v-model="searchForm.fundHouseId" clearable placeholder="请选择">
            <el-option
              size="mini"
              v-for="item in dictData.jijin"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否上架" style="margin-bottom:5px;">
          <el-select
            filterable
            class="isInput"
            clearable
            placeholder="请选择"
            v-model="searchForm.shelveStatus"
          >
            <el-option
              size="mini"
              v-for="item in dictData.shelve_status"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="创建时间" style="margin-bottom:5px;">
          <el-date-picker
            v-model="riqi"
            type="daterange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
            style="width:100%"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-form>
    </div>
    <div id="forTable" v-if="loadEnd">
      <isTable :inputData="tableInputData" @tableEmit="tableEmit" />
    </div>
  </div>
</template>
<script>
import isTable from "@/components/isTable/isTable.vue";

export default {
  components: {
    isTable
  },
  data() {
    return {
      env: null,
      deleteData: [], // 储存需要删除的数据
      aloneDeleteData: [], // 储存需要单独删除的数据
      loadEnd: false, // 控制当表格的数据全部获取完才显示表格
      pageName: "", // 当前页面名字
      riqi: [], // 创建时间
      // 搜索表单
      searchForm: {
        name: "", // 产品关键字
        institutionId: "", // 机构ID
        fundHouseId: "", // 基金公司ID
        status: "", // 交易状态
        shelveStatus: "", // 是否上架
        createTimeStart: "", // 创建时间（开始）
        createTimeEnd: "" // 创建时间（结束）
      },
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
      }
    };
  },
  created() {
    this.env = sessionStorage.getItem("env") === "development";
    this.pageName = sessionStorage.getItem("page"); // 获取页面名称
    // 获取当前页面使用的字典数据
    this.dictData = JSON.parse(sessionStorage.getItem("dict"));
    sessionStorage.removeItem("chunzhai_step1");
    sessionStorage.removeItem("chunzhai_step2");
    sessionStorage.removeItem("chunzhai_step3");
    this.canDoWhat();
    this.getUserData(null);
  },
  methods: {
    // 监听表格的操作
    tableEmit(data) {
      switch (data.type) {
        case "regetData": // 分页的emit
          this.seachClick("search");
          break;
        case "copy": // 复制按钮
          this.$api
            .getChunZhaiInfoData({
              vm: this,
              data: data.data.id
            })
            .then(res => {
              if (res) {
                let step1 = {
                  institutionId: res.data.institutionId, // 机构ID
                  fundHouseId: res.data.fundHouseId, // 基金公司ID
                  name: res.data.name, // 产品名称
                  code: res.data.code, // 代码
                  status: +res.data.status, // 交易状态
                  netValue: {
                    netAssetValue: res.data.netValueList[0].netAssetValue, // 单位净值
                    netAccumulateValue:
                      res.data.netValueList[0].netAccumulateValue // 累计净值
                  },
                  performance: {
                    oneDayIncrease: res.data.performanceList[0].oneDayIncrease, // 单日涨幅
                    threeMonthIncrease:
                      res.data.performanceList[0].threeMonthIncrease, // 近三个月涨幅
                    sixMonthIncrease:
                      res.data.performanceList[0].sixMonthIncrease, // 近六个月涨幅
                    oneYearIncrease: res.data.performanceList[0].oneYearIncrease // 近一年涨幅
                  }
                };
                let step2 = {
                  shelveStatus: res.data.appInfo.shelveStatus, // 是否上架
                  recommend: res.data.appInfo.recommend == "YES" ? "是" : "否", // 是否推荐
                  visaInterview:
                    res.data.appInfo.visaInterview == "YES" ? "是" : "否", // 是否面签
                  homePage: res.data.appInfo.homePage == "YES" ? "是" : "否", // 是否首页排行
                  defaultNum: res.data.appInfo.defaultBuyNum, // 默认购买数量
                  defaultAmount: res.data.appInfo.defaultAmount // 默认购买金额
                };
                let step3 = {
                  type: "认购", // 类型（认购/申购）
                  // 认购
                  rate: res.data.subscribeList[0].rate, // 费率
                  rateDiscount: res.data.subscribeList[0].rateDiscount, // 费率折扣
                  cost: res.data.subscribeList[0].cost, // 单笔费用
                  amount: res.data.subscribeList[0].amount, // 金额
                  amountUnit: res.data.subscribeList[0].amountUnit, // 金额单位
                  amountSymbol: res.data.subscribeList[0].amountSymbol, // 金额符号标识
                  transaction: res.data.subscribeList[0].transaction, // 交易金额
                  transactionUnit: res.data.subscribeList[0].transactionUnit, // 交易金额单位
                  transactionSymbol:
                    res.data.subscribeList[0].transactionSymbol, // 交易金额符号标识
                  // 申购
                  rate2: res.data.applyForPurchaseList[0].rate, // 费率
                  rateDiscount2: res.data.applyForPurchaseList[0].rateDiscount, // 费率折扣
                  cost2: res.data.applyForPurchaseList[0].cost, // 单笔费用
                  amount2: res.data.applyForPurchaseList[0].amount, // 金额
                  amountUnit2: res.data.applyForPurchaseList[0].amountUnit, // 金额单位
                  amountSymbol2: res.data.applyForPurchaseList[0].amountSymbol, // 金额符号标识
                  transaction2: res.data.applyForPurchaseList[0].transaction, // 交易金额
                  transactionUnit2:
                    res.data.applyForPurchaseList[0].transactionUnit, // 交易金额单位
                  transactionSymbol2:
                    res.data.applyForPurchaseList[0].transactionSymbol, // 交易金额符号标识
                  // 赎回
                  rate3: res.data.redemptionList[0].rate, // 费率
                  rateDiscount3: res.data.redemptionList[0].rateDiscount, // 费率折扣
                  cost3: res.data.redemptionList[0].cost, // 单笔费用
                  timeLimit: res.data.redemptionList[0].timeLimit, // 期限
                  timeLimitSymbol: res.data.redemptionList[0].timeSymbol, // 期限符号标识
                  days: res.data.redemptionList[0].days, // 天数
                  daysSymbol: res.data.redemptionList[0].daysSymbol // 天数符号标识
                };
                sessionStorage.setItem("chunzhai_step1", JSON.stringify(step1));
                sessionStorage.setItem("chunzhai_step2", JSON.stringify(step2));
                sessionStorage.setItem("chunzhai_step3", JSON.stringify(step3));
                this.$router.push({
                  name: "pure_debt_fund_step1"
                });
              }
            });
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
            name: "pure_debt_fund_info",
            query: {
              id: data.data.id,
              name: data.data.name
            }
          });
          break;
      }
    },
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
          if (res) {
            this.seachClick("search");
          }
        });
    },
    // 删除、批量删除
    toDelete(type) {
      if (type === "alone") {
        this.$confirm("确认删除吗？")
          .then(() => {
            this.$api
              .product_chunzhai_delete({
                vm: this,
                data: this.aloneDeleteData[0]
              })
              .then(res => {
                if (res) {
                  this.$message.success("删除成功！");
                  this.seachClick("reset");
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
                  .product_chunzhai_delete({
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
                arr.forEach(item => {
                  if (item.ok) {
                    numSucces++;
                  } else {
                    numFail++;
                    failName += `<li>名称：${item.data[0].failName}</li>`;
                  }
                });
                let str = `<p>共操作 ${arr.length} 条数据，成功 ${numSucces} 个，失败 ${numFail} 个</p>`;

                if (numFail > 0) {
                  str += `<p>失败的数据为：</p>
                    <ul>
                      ${failName}
                    </ul>`;
                }
                this.$alert(str, "操作结果提示", {
                  confirmButtonText: "确定",
                  dangerouslyUseHTMLString: true,
                  callback: this.seachClick("reset")
                });
              });
            })
            .catch(() => {});
        }
      }
    },
    // 搜索框、重置
    seachClick(type) {
      // search
      // reset
      let obj = {};
      switch (type) {
        case "search":
          if (this.riqi) {
            this.searchForm.createTimeStart = this.riqi[0];
            this.searchForm.createTimeEnd = this.riqi[1];
          } else {
            this.searchForm.createTimeStart = "";
            this.searchForm.createTimeEnd = "";
          }
          Object.keys(this.searchForm).forEach(str => {
            if (this.searchForm[str]) {
              obj[str] = this.searchForm[str];
            }
          });
          break;
        case "reset":
          // 重置
          this.searchForm = {
            name: "", // 产品关键字
            institutionId: "", // 机构ID
            fundHouseId: "", // 基金公司ID
            status: "", // 交易状态
            shelveStatus: "", // 是否上架
            createTimeStart: "", // 创建时间（开始）
            createTimeEnd: "" // 创建时间（结束）
          };
          this.riqi = [];
          this.tableInputData.pageSize = 10; // 分页相关
          this.tableInputData.pageNum = 1;
          break;
      }
      obj.pageSize = this.tableInputData.pageSize;
      obj.pageNum = this.tableInputData.pageNum;
      this.getUserData(obj);
    },
    // 新增纯债基金 pure_debt_fund
    addNew() {
      this.$router.push({
        name: "pure_debt_fund_step1"
      });
    },
    // 导出
    outPut() {},
    // 导入
    inPut() {},
    // 用户权限判定，之后表格右侧会有不同的操作按钮
    canDoWhat() {
      // let quanxian = JSON.parse(sessionStorage.getItem("buttenpremissions"));
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
      this.loadEnd = false;
      new Promise(resolve => {
        this.tableInputData.total = data.total;
        this.tableInputData.pageSize = data.pageSize == 0 ? 10 : data.pageSize;
        this.tableInputData.pageNum = data.pageNum == 0 ? 1 : data.pageNum;
        this.tableInputData.data.list = data.list.map(item => {
          let arr = Object.keys(item);
          arr.forEach(str => {
            if (str === "dailyIncrease") {
              if (Number(item[str]) > 0) {
                item[str] = `+${(+item[str]).toFixed(2)}%`;
              } else {
                item[str] = `${(+item[str]).toFixed(2)}%`;
              }
            }
            if (str === "netAssetValue") {
              item[str] = `${(+item[str]).toFixed(4)}`;
            }
            if (str === "netAccumulateValue") {
              item[str] = `${(+item[str]).toFixed(4)}`;
            }
          });
          return item;
        });
        // // 设置字体点击事件
        this.tableInputData.actions.click = {
          label: "产品名称",
          minWidth: 180,
          from: "name" // 记录这个交互操作的原数据属性
        };
        this.tableInputData.data.title = [
          {
            title: "基金代码",
            key: "code",
            minWidth: "80"
          },
          {
            title: "机构",
            key: "institutionName",
            minWidth: "130"
          },
          {
            title: "交易状态",
            key: "statusName",
            minWidth: "90"
          },
          {
            title: "基金公司",
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
            title: "上架状态",
            key: "shelveStatusLabel",
            minWidth: "80"
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
    // 获取表格数据
    getUserData(obj) {
      let datas = {};
      if (obj) {
        datas = obj;
      } else {
        datas.pageSize = this.tableInputData.pageSize;
        datas.pageNum = this.tableInputData.pageNum;
      }
      this.$api
        .get_chunzhaiList({
          vm: this,
          data: datas
        })
        .then(res => {
          if (res) {
            this.afterGetData(res.data);
          }
        });
    }
  }
};
</script>
