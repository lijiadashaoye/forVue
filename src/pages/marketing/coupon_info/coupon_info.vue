<template>
  <div class="componentWaper">
    <div class="headerName">
        <p class="isPageName">
         <span :class="env?'lineSpan1':'lineSpan'">|</span>
       
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
      <el-button size="mini" type="warning" @click="back">返回</el-button>
    </div>
    <ul v-if="infoData" class="isUl">
      <li>
        <strong>{{infoData.typeText}}名称：</strong>
        {{infoData.name}}
      </li>
      <li>
        <strong>发放总数：</strong>
        {{infoData.totalCount}} 张
      </li>
      <li>
        <strong>领取张数：</strong>
        {{infoData.receivedCount}} 张
      </li>
      <li>
        <strong>使用张数：</strong>
        {{infoData.usedCount}} 张
      </li>
      <li>
        <strong>有效期计算方式：</strong>
        {{infoData.effectiveDays}}
      </li>
      <li>
        <strong>适用产品：</strong>
        {{infoData.applyChannel}}
      </li>
      <li>
        <strong>发放状态：</strong>
        {{infoData.statue}}
      </li>
    </ul>

    <div style="display:flex;margin-bottom:10px;width:300px">
      <el-input v-model="zengfaNum" type="number" placeholder="请输入补仓数量" size="mini"></el-input>
      <el-button size="mini" style="margin-left:20px;" type="primary" @click="zengfa">补仓</el-button>
    </div>

    <el-radio-group v-model="showPage" size="mini" @change="radioChage" class="setPage">
      <el-radio-button label="领用详情"></el-radio-button>
      <el-radio-button label="补仓记录"></el-radio-button>
      <el-radio-button label="操作记录"></el-radio-button>
    </el-radio-group>

    <!-- 领用详情 -->

    <el-form
      :inline="true"
      v-if="showPage==='领用详情'"
      :model="searchTable"
      ref="searchTable"
      size="mini"
      :rules="rules"
      class="setLingYong"
    >
      <el-form-item label="会员手机" prop="mobile">
        <el-input v-model="searchTable.mobile" type="number" placeholder="请输入"></el-input>
      </el-form-item>

      <el-form-item label="使用状态">
        <el-select filterable v-model="searchTable.status" placeholder="请选择">
          <el-option
            size="mini"
            v-for="item in statueList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="领取时间">
        <el-date-picker
          value-format="yyyy-MM-dd HH:mm:ss"
          v-model="searchTime"
          type="datetimerange"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-button size="mini" style="margin-left:5px;" type="primary" @click="toSearch(true)">查询</el-button>
      <el-button size="mini" style="margin-left:10px;" type="warning" @click="Reset()">重置</el-button>
      <el-button size="mini" style="margin-left:10px;" type="success" @click="outNow(false)">导出</el-button>
    </el-form>
    <div id="forTable" v-if="showPage==='领用详情'">
      <isTable v-if="info_table.show" :inputData="info_table" @tableEmit="tableEmit($event)" />
    </div>

    <!-- 补仓记录 -->
    <div v-if="showPage==='补仓记录'">
      <el-date-picker
        size="mini"
        value-format="yyyy-MM-dd HH:mm:ss"
        v-model="searchTime"
        type="daterange"
        range-separator="~"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>

      <el-button size="mini" style="margin-left:20px;" type="primary" @click="getBuCang(1)">查询</el-button>
      <el-button size="mini" style="margin-left:20px;" type="inof" @click="getBuCang(2)">重置</el-button>
    </div>
    <div id="forTable" v-if="showPage==='补仓记录'">
      <isTable v-if="bucang.show" :inputData="bucang" @tableEmit="bucangEmit($event)" />
    </div>

    <!-- 操作记录 -->
    <div v-if="showPage==='操作记录'">
      <el-date-picker
        size="mini"
        value-format="yyyy-MM-dd HH:mm:ss"
        v-model="searchTime"
        type="daterange"
        range-separator="~"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>

      <el-button size="mini" style="margin-left:20px;" type="primary" @click="getCaoZuo(1)">查询</el-button>
      <el-button size="mini" style="margin-left:20px;" type="inof" @click="getCaoZuo(2)">重置</el-button>
    </div>
    <div id="forTable" v-if="showPage==='操作记录'">
      <isTable v-if="caozuo.show" :inputData="caozuo" @tableEmit="caozuoEmit($event)" />
    </div>
  </div>
</template>

<script>
import isTable from "../../../components/isTable/isTable.vue";
export default {
  components: {
    isTable
  },
  data() {
    // 验证手机号
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        callback();
      } else if (!/^1[34578]\d{9}$/.test(value)) {
        callback(new Error("手机号码有误，请重填"));
      } else {
        callback();
      }
    };
    return {
      statueList: [
        {
          label: "使用中",
          value: "IN_USE"
        },
        {
          label: "已过期/无效",
          value: "INVALID"
        },
        {
          label: "未使用",
          value: "UNUSE"
        }
      ],
      pageName: "",
      infoData: null, // 保存服务器给的数据，已经格式化
      zengfaNum: "", // 增发数量
      outIds: [], // 保存导出的id
      // 传给table子组件的数据
      info_table: {
        checkBox: true,
        show: false,
        pageSize: 10, // 分页相关
        pageNum: 1,
        total: null,
        actions: {}, // 记录表格内需要额外添加的点击事件
        data: {
          list: [], // 给表格的数据
          title: [], // 给表格表头
          custom: [] // 给表格按钮数量、类型（编辑、删除等）
        }
      },
      // 传给补仓子组件的数据
      bucang: {
        checkBox: true,
        show: false,
        pageSize: 10, // 分页相关
        pageNum: 1,
        total: null,
        actions: {}, // 记录表格内需要额外添加的点击事件
        data: {
          list: [], // 给表格的数据
          title: [], // 给表格表头
          custom: [] // 给表格按钮数量、类型（编辑、删除等）
        }
      },
      // 传给操作记录组件的数据
      caozuo: {
        checkBox: true,
        show: false,
        pageSize: 10, // 分页相关
        pageNum: 1,
        total: null,
        actions: {}, // 记录表格内需要额外添加的点击事件
        data: {
          list: [], // 给表格的数据
          title: [], // 给表格表头
          custom: [] // 给表格按钮数量、类型（编辑、删除等）
        }
      },
      showPage: "领用详情", // 要显示的页面
      searchTime: [], // 领取时间
      searchTable: {
        // 领用详情表格的查询
        id: "",
        name: "",
        mobile: "",
        receivedTimeStart: "",
        receivedTimeEnd: "",
        status: ""
      },
      rules: {
        mobile: [{ validator: checkPhone, trigger: "blur" }]
      }
    };
  },
  created() {
    this.pageName = sessionStorage.getItem("page");
    this.setPageData();
    this.radioChage(); // 切换页面
  },
  methods: {
    Reset() {
      this.showPage = "领用详情";
      this.radioChage(); // 切换页面
    },
    // 设置页面数据
    setPageData() {
      let kk = JSON.parse(sessionStorage.getItem("couponItem"));
      this.infoData = {
        id: kk.id,
        name: kk.name, // 卡券名称
        type: kk.type, // 卡券类型
        typeText: kk.typeFrom,
        totalCount: kk.totalCount, // 总数量
        receivedCount: kk.receivedCount, // 已领取X
        usedCount: kk.usedCount, // 已使用X
        effectiveDays: `领取后${kk.effectiveDays}天有效`,
        applyChannel:
          kk.applyChannel === "ALL"
            ? "全部"
            : kk.type === "BICAI"
            ? "比财"
            : kk.type === "PINCAI"
            ? "拼财"
            : "亚财",
        statue: kk.statueText
      };
    },
    // 返回按钮
    back() {
      sessionStorage.setItem("page", "卡券列表");
      sessionStorage.removeItem("couponItem");
      window.history.back();
    },
    // 补仓
    zengfa() {
      let value = +this.zengfaNum;
      // 验证数字不包括小数
      let reg = /\./;
      if (reg.test(value)) {
        this.$message.error("请输入整数！");
      } else if (value <= 0) {
        this.$message.error("请输入正数！");
      } else if (("" + value).length > 11 || ("" + value).length < 0) {
        this.$message.error("请输入1-11字符！");
      } else {
        let obj = {
          id: this.infoData.id,
          supplementCount: value
        };
        this.$api
          .market_coupon_zengFa({
            vm: this,
            data: obj
          })
          .then(res => {
            if (res) {
              let kk = JSON.parse(sessionStorage.getItem("couponItem"));
              kk.totalCount += value;
              sessionStorage.setItem("couponItem", JSON.stringify(kk));
              return;
            }
          })
          .then(() => {
            this.$message.success("补仓成功！");
            this.zengfaNum = "";
            this.setPageData();
          });
      }
    },
    // 切换页面
    radioChage() {
      switch (this.showPage) {
        case "领用详情":
          this.info_table = {
            checkBox: true,
            show: false,
            pageSize: 10, // 分页相关
            pageNum: 1,
            total: null,
            actions: {}, // 记录表格内需要额外添加的点击事件
            data: {
              list: [], // 给表格的数据
              title: [], // 给表格表头
              custom: [] // 给表格按钮数量、类型（编辑、删除等）
            }
          };
          setTimeout(() => this.toSearch(false));
          break;
        case "补仓记录":
          this.bucang = {
            checkBox: true,
            show: false,
            pageSize: 10, // 分页相关
            pageNum: 1,
            total: null,
            actions: {}, // 记录表格内需要额外添加的点击事件
            data: {
              list: [], // 给表格的数据
              title: [], // 给表格表头
              custom: [] // 给表格按钮数量、类型（编辑、删除等）
            }
          };
          setTimeout(() => this.getBuCang(2));
          break;
        case "操作记录":
          this.caozuo = {
            checkBox: true,
            show: false,
            pageSize: 10, // 分页相关
            pageNum: 1,
            total: null,
            actions: {}, // 记录表格内需要额外添加的点击事件
            data: {
              list: [], // 给表格的数据
              title: [], // 给表格表头
              custom: [] // 给表格按钮数量、类型（编辑、删除等）
            }
          };
          setTimeout(() => this.getCaoZuo(2));
          break;
      }
    },

    /** 领用详情 *********************************/
    // 查询、重置
    toSearch(type) {
      if (type) {
        this.$refs.searchTable.validate(valid => {
          if (valid) {
            if (this.searchTime.length > 0) {
              this.searchTable.receivedTimeStart = this.searchTime[0];
              this.searchTable.receivedTimeEnd = this.searchTime[1];
            }
            this.getUserData(this.searchTable);
          } else {
            this.$message.error("请输入完整电话号码！");
          }
        });
      } else {
        this.searchTime = [];
        this.searchTable = {
          // 用来查询
          id: this.infoData.id,
          name: this.infoData.name,
          mobile: "",
          receivedTimeStart: "",
          receivedTimeEnd: "",
          status: ""
        };
        this.getUserData(this.searchTable);
      }
    },
    // 监听领用详情表格的 emit
    tableEmit(data) {
      switch (data.type) {
        case "regetData": // 分页的emit
          this.toSearch(true);
          break;
        case "moreDelete": // 分页的 checkbox
          this.outIds = data.data.map(item => item.id);
          break;
      }
    },
    // 获取详情数据
    getUserData(data) {
      let obj = {};
      let arr = Object.keys(data);
      arr.forEach(item => {
        if (data[item]) {
          obj[item] = data[item];
        }
      });
      obj.pageSize = this.info_table.pageSize;
      obj.pageNum = this.info_table.pageNum;

      this.$api
        .market_coupon_getInfoXianQing({
          vm: this,
          data: obj
        })
        .then(res => {
          if (res) {
            let datas = res.data;

            this.info_table.pageSize = datas.pageSize;
            this.info_table.pageNum = datas.pageNum;
            this.info_table.total = datas.total;

            this.info_table.data.list = datas.list.map(item => {
              let obj = { ...item };
              switch (item.status) {
                case "IN_USE":
                  obj.status = "使用中";
                  break;
                case "INVALID":
                  obj.status = "已过期/无效";
                  break;
                case "USED":
                  obj.status = "已使用";
                  break;
                case "UNUSE":
                  obj.status = "未使用";
                  break;
              }
              switch (item.hasGrantIncome) {
                case "NO":
                  obj.hasGrantIncome = "否";
                  break;
                case "YES":
                  obj.hasGrantIncome = "是";
                  break;
              }
              return obj;
            });
            // title 里显示的没有额外设置的表头，其他有额外设置的，需要另添加
            this.info_table.data.title = [
              {
                title: "会员id",
                key: "memberId",
                minWidth: "80"
              },
              {
                title: "会员手机",
                key: "mobile",
                minWidth: "120"
              },
              {
                title: "使用状态",
                key: "status",
                minWidth: "80"
              },
              {
                title: "累计收益",
                key: "cumulativeIncome",
                minWidth: "80"
              },
              {
                title: "领券时间",
                key: "receivedTime",
                minWidth: "120"
              },
              {
                title: "使用时间",
                key: "usedTime",
                minWidth: "120"
              },
              {
                title: "用券产品名称",
                key: "productName",
                minWidth: "140"
              },
              {
                title: "是否发放收益",
                key: "hasGrantIncome",
                minWidth: "100"
              }
            ];
            this.info_table.data.custom = [];
            this.info_table.show = true;
          }
        });
    },
    // 部分导出
    outNow() {
      let obj = {
        id: this.infoData.id,
        name: this.infoData.name
      };
      this.$api
        .market_coupon_downLoad({
          vm: this,
          data: obj
        })
        .then(res => {
          let url = window.URL.createObjectURL(
            new Blob([res], {
              type:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
            })
          );
          let link = document.createElement("a");
          link.style.display = "none";
          link.href = url;
          link.setAttribute(
            "download",
            `${new Date().toLocaleDateString()}导出卡券领取详情.xls`
          );
          document.body.appendChild(link);
          link.click();
        });
    },
    /** 补仓记录 *********************************/
    getBuCang(num) {
      let obj = {};
      switch (num) {
        case 1:
          if (this.searchTime.length > 0) {
            obj = {
              operateTimeStart: this.searchTime[0],
              operateTimeEnd: this.searchTime[1],
              pageSize: this.bucang.pageSize,
              pageNum: this.bucang.pageNum
            };
          } else {
            this.$message.error("请选择查询的时间段！");
            return;
          }
          break;
        case 2:
          this.searchTime = [];
          this.bucang.pageSize = 10;
          this.bucang.pageNum = 1;
          obj = {
            pageSize: this.bucang.pageSize,
            pageNum: this.bucang.pageNum
          };
          break;
        case 3:
          if (this.searchTime.length > 0) {
            obj = {
              operateTimeStart: this.searchTime[0],
              operateTimeEnd: this.searchTime[1],
              pageSize: this.bucang.pageSize,
              pageNum: this.bucang.pageNum
            };
          } else {
            obj = {
              pageSize: this.bucang.pageSize,
              pageNum: this.bucang.pageNum
            };
          }
          break;
      }

      this.$api
        .get_bucang({
          vm: this,
          id: this.infoData.id,
          data: obj
        })
        .then(res => {
          if (res) {
            let datas = res.data;
            this.bucang.pageSize = datas.pageSize;
            this.bucang.pageNum = datas.pageNum;
            this.bucang.total = datas.total;
            this.bucang.data.list = datas.list;
            // title 里显示的没有额外设置的表头，其他有额外设置的，需要另添加
            this.bucang.data.title = [
              {
                title: "操作人",
                key: "operatorName",
                minWidth: "120"
              },
              {
                title: "补仓数量",
                key: "supplementCount",
                minWidth: "120"
              },
              {
                title: "补仓时间",
                key: "supplementTime",
                minWidth: "120"
              }
            ];
            this.bucang.data.custom = [];
            this.bucang.show = true;
          }
        });
    },
    // 补仓表格的 emit
    bucangEmit(data) {
      switch (data.type) {
        case "regetData": // 分页的emit
          this.getBuCang(3);
          break;
      }
    },
    /** 操作记录 *********************************/
    // 操作记录表格的 emit
    caozuoEmit(data) {
      switch (data.type) {
        case "regetData": // 分页的emit
          this.getCaoZuo(3);
          break;
      }
    },
    getCaoZuo(num) {
      let obj = {};
      switch (num) {
        case 1: // 点查询
          if (this.searchTime.length > 0) {
            obj = {
              operateTimeStart: this.searchTime[0],
              operateTimeEnd: this.searchTime[1],
              pageSize: this.caozuo.pageSize,
              pageNum: this.caozuo.pageNum
            };
          } else {
            this.$message.error("请选择查询的时间段！");
            return;
          }
          break;
        case 2: // 点重置
          this.searchTime = [];
          this.caozuo.pageSize = 10;
          this.caozuo.pageNum = 1;
          obj = {
            pageSize: this.caozuo.pageSize,
            pageNum: this.caozuo.pageNum
          };
          break;
        case 3: // 分页带查询
          if (this.searchTime.length > 0) {
            obj = {
              operateTimeStart: this.searchTime[0],
              operateTimeEnd: this.searchTime[1],
              pageSize: this.caozuo.pageSize,
              pageNum: this.caozuo.pageNum
            };
          } else {
            obj = {
              pageSize: this.caozuo.pageSize,
              pageNum: this.caozuo.pageNum
            };
          }
          break;
      }
      this.$api
        .get_caozuo({
          vm: this,
          id: this.infoData.id,
          data: obj
        })
        .then(res => {
          if (res) {
            let datas = res.data;
            this.caozuo.pageSize = datas.pageSize;
            this.caozuo.pageNum = datas.pageNum;
            this.caozuo.total = datas.total;
            this.caozuo.data.list = datas.list.map(item => {
              let obj = { ...item };
              // BASE_DETAIL("卡券基本信息"),TYPE_DETAIL("卡券类型配置"),BANK_PRD("卡券关联产品")
              switch (item.type) {
                case "BASE_DETAIL":
                  obj["typeText"] = "卡券基本信息";
                  break;
                case "TYPE_DETAIL":
                  obj["typeText"] = "卡券类型配置";
                  break;
                case "BANK_PRD":
                  obj["typeText"] = "卡券关联产品";
                  break;
              }
              return obj;
            });
            this.caozuo.data.title = [
              {
                title: "操作人",
                key: "operatorName",
                minWidth: "120"
              },
              {
                title: "卡券操作类型",
                key: "typeText",
                minWidth: "120"
              },
              {
                title: "操作时间",
                key: "operateTime",
                minWidth: "120"
              }
            ];
            this.caozuo.data.custom = [];
            this.caozuo.show = true;
          }
        });
    }
  }
};
</script>

<style scoped='true' lang="scss">
ul {
  padding: 10px;
}
li {
  padding: 2px;
  font-size: 14px;
  color: rgb(65, 138, 255);
}
strong {
  color: black;
}
.headerName {
  display: flex;
  justify-content: space-between;
}

.headerName > span {
  font-size: 14px;
  padding-right: 10px;
  color: rgb(37, 196, 211);
  cursor: pointer;
}

.headerName > span:hover {
  color: rgb(68, 29, 240);
}
.isUl {
  display: flex;
  flex-wrap: wrap;
}
.isUl li {
  width: 20%;
}
.setPage {
  background: rgb(248, 252, 253);
  margin-bottom: 5px;
}
.setLingYong > div {
  margin-bottom: 0;
}
</style>
