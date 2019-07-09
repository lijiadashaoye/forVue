<template>
  <div class="componentWaper">
    <div id="forHeader">
      <h3>{{pageName}}</h3>
      <div style="margin-bottom:5px;">
        <el-button size="mini" type="primary" @click="addNew(true)">新增货币基金</el-button>
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

        <el-form-item label="机构" style="margin-bottom:5px;">
          <el-select v-model="searchForm.institutionId" clearable placeholder="请选择">
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
          <el-select v-model="searchForm.fundHouseId" clearable placeholder="请选择">
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

        <el-form-item label="创建时间" style="margin-bottom:5px;">
          <el-date-picker
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
    </div>
    <div id="forTable" v-if="loadEnd">
      <isTable :inputData="tableInputData" @tableEmit="tableEmit" />
    </div>
  </div>
</template>
<script>
import isTable from "../../../../components/isTable/isTable.vue";

export default {
  props: {},
  data() {
    return {
      deleteData: [], // 储存需要删除的数据
      aloneDeleteData: [], // 储存需要单独删除的数据
      loadEnd: false, // 控制当表格的数据全部获取完才显示表格
      pageName: "", // 当前页面名字
      riqi: [], // 创建时间
      searchForm: {
        name: "", // 产品关键字
        institutionId: "", // 机构ID
        fundHouseId: "", // 基金公司ID
        status: "", // 交易状态
        shelve: "", // 是否上架
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
    this.loadEnd = false;
    this.pageName = sessionStorage.getItem("page"); // 获取页面名称
    // 获取当前页面使用的字典数据
    this.dictData = JSON.parse(sessionStorage.getItem("dict"));
    this.canDoWhat();
    this.getUserData(null);
    sessionStorage.removeItem("huobijijin_step1");
    sessionStorage.removeItem("huobijijin_step2");
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
            .get_huobi_edit_data({
              vm: this,
              data: data.data.id
            })
            .then(res => {
              let step1 = {
                institutionName: res.data.institutionId, // 机构名称
                fundHouseId: res.data.fundHouseId, // 基金公司ID
                name: res.data.name, // 产品名称
                purchaseAmount: res.data.minAmount, // 起购金额
                redemptionDate: res.data.redemptionDate, // 赎回到账日
                lockinPeriod: res.data.lockinPeriod, // 锁定期
                buyIn: res.data.buyIn, // 买入
                commission: res.data.commission, // 手续费
                description: res.data.description, // 描述
                yieldRule: res.data.yieldRule, //  收益规则
                onThe7thOfTheYearYield: res.data.yield.onThe7thOfTheYearYield, // 七日年化收益率
                thousandsOfYearsYields: res.data.yield.thousandsOfYearsYields // 万份年化收益率
              };
              let step2 = {
                sameProductFlag: res.data.appInfo.sameProductFlag, // 同一产品标识
                flowNum: res.data.appInfo.defaultFlowNum, // 默认关注数量
                shelve: res.data.appInfo.shelve === "YES" ? "是" : "否", // 是否上架
                visaInterview:
                  res.data.appInfo.visaInterview === "YES" ? "是" : "否", // 是否面签
                recommend: res.data.appInfo.recommend === "YES" ? "是" : "否", // 是否推荐
                homePage: res.data.appInfo.homePage === "YES" ? "是" : "否", // 是否首页排行
                defaultNum: res.data.appInfo.defaultBuyNum, // 默认购买数量
                defaultAmount: res.data.appInfo.defaultAmount, // 默认购买金额
                listAreaFlag: res.data.appInfo.listAreaFlag // 榜单专区标识
              };
              sessionStorage.setItem("huobijijin_step1", JSON.stringify(step1));
              sessionStorage.setItem("huobijijin_step2", JSON.stringify(step2));
              this.$router.push({
                name: "money_fund_step1"
              });
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
            name: "money_fund_info",
            query: {
              id: data.data.id,
              institutionName: data.data.institutionName
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
            id: data.id,
            status: data.switch ? "YES" : "NO"
          }
        })
        .then(res => {
          this.seachClick("search");
        });
    },
    // 删除、批量删除
    toDelete(type) {
      if (type === "alone") {
        this.$confirm("确认删除吗？")
          .then(() => {
            this.$api
              .product_huobi_delete({
                vm: this,
                data: this.aloneDeleteData[0]
              })
              .then(res => {
                if (res) {
                  this.$message.success("删除成功！");
                  this.seachClick("search");
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
                  .product_huobi_delete({
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
                    failName += `名称：${item.data[0].institutionName} \n`;
                  }
                });
                let str = `共操作 ${arr.length} 条数据，成功 ${numSucces} 个，失败 ${numFail} 个 \n`;

                if (numFail > 0) {
                  str += titleText + failName;
                }
                this.$alert(str, "操作结果提示", {
                  confirmButtonText: "确定",
                  callback: this.seachClick("search")
                });
              });
            })
            .catch(() => {});
        }
      }
    },
    // 搜索框、重置
    seachClick(type) {
      let obj = {};
      switch (type) {
        case "search":
          if (this.riqi.length > 0) {
            this.searchForm.createTimeStart = this.riqi[0];
            this.searchForm.createTimeEnd = this.riqi[1];
          }
          let arr = Object.keys(this.searchForm);
          arr.forEach(str => {
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
            shelve: "", // 是否上架
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
    // 新增货币基金 money_fund
    addNew(type) {
      this.$router.push({
        name: "money_fund_step1"
        // query: { id: id }
      });
    },
    // 导出
    outPut() {},
    // 导入
    inPut() {},
    // 用户权限判定
    canDoWhat() {
      let quanxian = JSON.parse(localStorage.getItem("buttenpremissions"));
      this.tableInputData.data.custom.push({
        text: "复制",
        type: "primary",
        size: "mini",
        emit: "copy"
      });
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
        .get_huobiList({
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
