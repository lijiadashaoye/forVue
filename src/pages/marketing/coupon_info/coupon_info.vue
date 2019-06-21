<template>
  <div class="componentWaper">
    <div class="headerName">
      <h3>{{pageName}}</h3>
      <el-button
        size="mini"
        type="warning"
        @click="back"
      >返回</el-button>
    </div>
    <ul>
      <li>
        <strong> {{infoData.type==='EXPERIENCE'?'体验金券':'奖励金券(加息券))'}}名称：</strong>
        {{infoData.name}}
      </li>
      <li> <strong>金额： </strong>{{infoData.money}} 元</li>
      <li> <strong>发放总数： </strong>{{infoData.issueNum}} 张</li>
      <li> <strong>领取张数： </strong>{{infoData.getNum}} 张</li>
      <li> <strong>使用张数： </strong>{{infoData.useNum}} 张</li>
      <li> <strong>有效期计算方式：</strong>{{ExpiryType}}
        <span>{{ExpiryDay}} </span>
      </li>
      <li> <strong>适用产品：</strong>{{infoData.applyProductType==='ALL'?'全部':'部分产品(自定义)'}}</li>
      <li> <strong>卡券状态：</strong>{{statue}}</li>
    </ul>
    <div style="padding:0 10px;">
      <el-form
        :inline="true"
        :model="searchTable"
        size="mini"
      >
        <el-form-item label="活动名称">
          <el-input
            v-model="searchTable.activityName"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="领取用户">
          <el-input
            v-model="searchTable.userPhone"
            placeholder="请输入用户电话"
          ></el-input>
        </el-form-item>

        <el-form-item label="使用状态">
          <el-select
            v-model="searchTable.useStatus"
            placeholder="请选择"
          >
            <el-option
              label="未使用"
              value="UNUSED"
            ></el-option>
            <el-option
              label="已使用"
              value="USED"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="领取时间">
          <el-date-picker
            v-model="searchTime"
            type="daterange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
          <el-button
            style="margin-left:20px;"
            type="primary"
            @click="toSearch(true)"
          >查询</el-button>
          <el-button
            style="margin-left:15px;"
            type="warning"
            @click="outAll()"
          >全部导出</el-button>
          <el-button
            style="margin-left:15px;"
            type="success"
            @click="outNow(false)"
          >导出</el-button>
          <el-button
            style="margin-left:15px;"
            type="info"
            @click="toSearch(false)"
          >重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div id='forTable'>
      <isTable
        v-if="info_table.show"
        :inputData='info_table'
        @tableEmit="tableEmit($event)"
      />
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
    return {
      pageName: "",
      ExpiryDay: "", // 有效期类型(FIXATION:固定时间 GET:自领取后 USE:自使用后)
      ExpiryType: "",
      statue: "",
      infoData: {}, // 保存服务器给的数据，已经格式化
      paginationData: {},
      outIds: [], // 保存导出的id
      info_table: {
        checkBox: true,
        show: false,
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
      },
      searchTime: [],
      searchTable: {
        // 用来查询
        id: "",
        activityName: "",
        userPhone: "",
        queryBeginTime: "",
        queryEndTime: "",
        useStatus: "",
        pageNum: 1,
        pageSize: 10
      }
    };
  },
  mounted() {
    this.pageName = sessionStorage.getItem("page");
    this.getUserData();
  },
  methods: {
    // 返回按钮
    back() {
      window.history.back();
    },
    tableEmit(data) {
      switch (data.type) {
        case "regetData": // 分页的emit
          this.getUserData();
          break;
        case "moreDelete": // 导出
          this.outIds = [];
          this.outIds = data.data.map(item => item.id);
          break;
      }
    },
    // 获取详情数据
    getUserData() {
      this.searchTable.id = this.$route.query["id"];
      this.$api
        .market_coupon_getInfoXianQing({
          vm: this,
          data: this.searchTable
        })
        .then(res => {
          if (res) {
            this.paginationData = res.data.pagination;
            this.infoData = res.data.receiveCouponInfoRes;
            switch (this.infoData.expiryType) {
              case "FIXATION":
                this.ExpiryType = "固定时间：";
                this.ExpiryDay = `开始：${this.infoData.startTime}  结束：${
                  this.infoData.endTime
                }`;
                break;
              case "GET":
                this.ExpiryType = "自领取后：";
                this.ExpiryDay = `${this.infoData.expiryDay} 天`;
                break;
              case "USE":
                this.ExpiryType = "自使用后：";
                this.ExpiryDay = `${this.infoData.expiryDay} 天`;
                break;
            }
            switch (this.infoData.status) {
              case "WAITGRANT":
                this.statue = "待发放";
                break;
              case "GRANTING":
                this.statue = "发放中";
                break;
              case "STOPGRANT":
                this.statue = "已停止";
                break;
            }

            this.info_table.total =
              this.paginationData.total > 0 ? this.paginationData.total : 1;
            // title 里显示的没有额外设置的表头，其他有额外设置的，需要另添加
            this.info_table.data.title = [
              {
                title: "活动名称",
                key: "activityName",
                minWidth: "80"
              },
              {
                title: "产品名称",
                key: "productName",
                minWidth: "100"
              },
              {
                title: "领取id",
                key: "id",
                minWidth: "80"
              },
              {
                title: "会员电话",
                key: "memberPhone",
                minWidth: "120"
              },
              {
                title: "使用状态",
                key: "useStatus",
                minWidth: "65"
              },
              {
                title: "使用时间",
                key: "useTime",
                minWidth: "160"
              }
            ];
            this.info_table.data.custom = [];
            this.info_table.data.quanxian = [];

            this.info_table.data.list = [];
            //
            this.paginationData.list.forEach(item => {
              let arr1 = Object.keys(item);
              let obj = {};
              arr1.forEach(str => {
                obj[str] = item[str];
                if (str === "useStatus") {
                  if (item[str] === "UNUSED") {
                    obj[str] = "未使用";
                  } else {
                    obj[str] = "已使用";
                  }
                }
              });
              this.info_table.data.list.push(obj);
            });
            this.info_table.show = true;
          }
        });
    },
    // 查询、重置
    toSearch(type) {
      if (type) {
        if (this.searchTime.length > 0) {
          this.searchTable.queryBeginTime = new Date(
            this.searchTime[0]
          ).getTime();
          this.searchTable.queryEndTime = new Date(
            this.searchTime[1]
          ).getTime();
        }
        if (
          this.searchTable.userPhone.length > 0 &&
          this.searchTable.userPhone.length < 11
        ) {
          this.$message.error("请输入完整电话号码！");
          return;
        }
        this.getUserData();
      } else {
        this.searchTime = [];
        this.searchTable = {
          // 用来查询
          id: "",
          activityName: "",
          userPhone: "",
          queryBeginTime: "",
          queryEndTime: "",
          useStatus: "",
          pageNum: 1,
          pageSize: 10
        };
        this.getUserData();
      }
    },
    outAll() {
      this.outIds = this.info_table.data.list.map(item => item.id);
      this.outNow();
    },
    outNow() {
      let obj = {
        selectIds: this.outIds.join(","),
        id: this.searchTable.id
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
  color: rgb(128, 124, 124);
}
strong {
  color: black;
}
.headerName {
    display: flex;
    justify-content: space-between;
}

.headerName>span {
    font-size: 14px;
    padding-right: 10px;
    color: rgb(37, 196, 211);
    cursor: pointer;
}

.headerName>span:hover {
    color: rgb(68, 29, 240);
}
</style>
