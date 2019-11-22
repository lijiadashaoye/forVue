<template>
  <div class="componentWaper">
    <div class="headerName">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
      <el-button size="mini" type="warning" @click="back">返回</el-button>
    </div>

    <div class="contents">
      <div style="width:100%;">
        <ul>
          <li v-if="infoData.name">
            <strong>红包名称：</strong>
            {{infoData.name}}
          </li>
          <li v-if="infoData.packetExplain">
            <strong>红包说明：</strong>
            {{infoData.packetExplain}}
          </li>
          <li v-if="infoData.amountType">
            <strong>红包类型：</strong>
            {{infoData.amountType}}
          </li>
          <li v-if="infoData.amountMin">
            <strong>红包类型-随机-显示最小值：</strong>
            {{infoData.amountMin}}
          </li>
          <li v-if="infoData.amountMax">
            <strong>红包类型-随机 显示最大值：</strong>
            {{infoData.amountMax}}
          </li>
          <li v-if="infoData.grantType">
            <strong>发放类型：</strong>
            {{infoData.grantType}}
          </li>
          <li v-if="infoData.totalAmount">
            <strong>红包总金额：</strong>
            {{infoData.totalAmount}}
          </li>

          <li v-if="infoData.totalNum">
            <strong>红包总个数：</strong>
            {{infoData.totalNum}}
          </li>
          <li v-if="infoData.maxAmount">
            <strong>上限金额：</strong>
            {{infoData.maxAmount}}
          </li>
          <li v-if="infoData.maxNum">
            <strong>上限个数：</strong>
            {{infoData.maxNum}}
          </li>
        </ul>
        <div id="forTable" style="width:100%;">
          <isTable v-if="info_table.show" :inputData="info_table" @tableEmit="tableEmit($event)" />
        </div>
      </div>
      <div v-if="Actor.length>0" class="actors">
        <p>操作人:</p>
        <div v-for="(tar,index) in Actor" :key="index">
          <span v-if="tar.creator">
            {{'ID：'+tar.creator}}
            <br />
          </span>
          <span v-if="tar.creatorName">
            {{'名字：'+tar.creatorName}}
            <br />
          </span>
          <span v-if="tar.gmtCreated">{{'时间：'+tar.gmtCreated}}</span>
        </div>
      </div>
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
      env: null,
      Actor: [], // 操作人
      pageName: "",
      infoData: {}, // 保存服务器给的数据，已经格式化
      info_table: {
        checkBox: false,
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
      searchTime: []
    };
  },
  mounted() {
    this.env = sessionStorage.getItem("env") === "development";
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
      }
    },
    // 获取详情数据
    getUserData() {
      this.$api
        .market_packet_getInfo({
          vm: this,
          data: this.$route.query["id"]
        })
        .then(res => {
          if (res) {
            let obj = {};
            let arr = Object.keys(res.data);

            arr.forEach(str => {
              if (res.data[str]) {
                obj[str] = res.data[str];
                switch (res.data.amountType) {
                  case "FIXATION":
                    obj["amountType"] = "固定金额";
                    break;
                  case "RANDOM":
                    obj["amountType"] = "随机金额";
                    break;
                }
                switch (res.data.grantType) {
                  case "REALTIME":
                    obj["grantType"] = "实时发放";
                    break;
                  case "MANUALWORK":
                    obj["grantType"] = "人工发放";
                    break;
                }
              }
            });

            this.infoData = obj;
            this.Actor = res.data.operationRecordList;
            this.info_table.total = res.data.operationRecordList
              ? res.data.operationRecordList.length
              : 0;
            // title 里显示的没有额外设置的表头，其他有额外设置的，需要另添加
            this.info_table.data.title = [
              {
                title: "概率id",
                key: "id",
                minWidth: "80"
              },
              {
                title: "领取金额",
                key: "getAmount",
                minWidth: "100"
              },
              {
                title: "金额概率",
                key: "amountProb",
                minWidth: "80"
              }
            ];
            this.info_table.data.custom = [];
            this.info_table.data.quanxian = [];
            let arrData = [
              // 假数据
              {
                id: 1,
                getAmount: 1,
                amountProb: 10
              },
              {
                id: 2,
                getAmount: 2,
                amountProb: 30
              }
            ];
            // this.info_table.data.list = res.data.probabilityList;
            this.info_table.data.list = arrData;
            this.info_table.show = true;
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
  color: rgb(128, 124, 124);
}
strong {
  color: black;
}
.contents {
  display: flex;
  justify-content: flex-start;
}
.actors {
  padding: 5px;
  width: 200px;
  flex-shrink: 0;
  box-shadow: 0 0 5px rgb(218, 216, 216) inset;
}
.actors > div {
  padding: 10px;
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
</style>
