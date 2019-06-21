<template>

  <div class="componentWaper">
    <div id='forHeader'>
      <h3>{{pageName}}</h3>
    </div>
    <div class="contents">
      <div style="width:100%;">
        <ul>
          <li v-if="infoData.badgeWallName"><strong>徽章墙名称：</strong>
            {{infoData.badgeWallName}}
          </li>
          <li v-if="infoData.badgeWallExplain"><strong>徽章墙说明(介绍)：</strong>
            {{infoData.packetExplain}}
          </li>
          <li v-if="infoData.badgeWallIcon"><strong>徽章墙图标：</strong>
            <img
              :src='infoData.badgeWallIcon'
              style="width:50px;"
            >
          </li>
          <li v-if="infoData.moduleExplain"><strong>模块介绍：</strong>
            {{infoData.moduleExplain}}
          </li>
          <li v-if="infoData.giftExplain"><strong>礼品介绍：</strong>
            {{infoData.giftExplain}}
          </li>
          <li v-if="infoData.ruleType"><strong>点亮规则类型：</strong>
            {{infoData.ruleType}}
          </li>
          <li v-if="infoData.status"><strong>状态：</strong>
            {{infoData.status}}
          </li>

          <li v-if="infoData.webUrl"><strong>app->h5url链接：</strong>
            {{infoData.webUrl}}
          </li>
        </ul>
        <div
          id='forTable'
          style="width:100%;"
        >
          <isTable
            v-if="info_table.show"
            :inputData='info_table'
            @tableEmit="tableEmit($event)"
          />
        </div>
      </div>
      <div
        v-if="Actor.length>0"
        class="actors"
      >
        <p>操作人:</p>
        <div
          v-for="(tar,index) in Actor"
          :key='index'
        >
          <span v-if="tar.createUserId">{{'ID：'+tar.createUserId}}<br></span>
          <span v-if="tar.createUserName">{{'名字：'+tar.createUserName}}<br></span>
          <span v-if="tar.createTime"> {{'时间：'+tar.createTime}}</span>
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
    this.pageName = sessionStorage.getItem("page");
    this.getUserData();
  },
  methods: {
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
        .member_badgeWall_getInfo({
          vm: this,
          data: this.$route.query["id"]
        })
        .then(res => {
          res = {
            code: 0,
            msg: "SUCCESS",
            data: {
              id: 1,
              badgeWallName: "凤凰展翅",
              badgeWallExplain:
                "末年初，寓意“凤凰展翅”的北京大兴国际机场航站楼外立面装修工程全面完成，正式对外完整亮相。3日，北京市发展改革委对外公布北京大兴国际机场及其配套设施建设的最新进展。",
              badgeWallIcon:
                "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=19939332,1097806373&fm=26&gp=0.jpg",
              moduleExplain: "2019到了，来看看武大靖怎么说",
              giftExplain: "vasdvasd",
              ruleType: "FIXED",
              status: "DISABLE",
              webUrl: "http://api.bicai365.com/data/",
              createUserId: 1,
              createUserName: "admin",
              createTime: "2019-01-02 14:03:29",
              ruleList: [
                {
                  id: 1,
                  missionId: 32,
                  ruleName: "V那肯定是发",
                  ruleDescription: "本文由百家号作者上传并发布",
                  goodsId: 20190103,
                  goodsName: "新华社视频",
                  goodsIcon:
                    "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=19939332,1097806373&fm=26&gp=0.jpg",
                  goodsCode: "vnvnvnvnvn",
                  goodsExplain: "泸州市政协八届三次会议1月7日至1月9日召开",
                  createTime: "2019-01-03 14:25:45"
                }
              ]
            }
          };

          if (res) {
            let obj = {};
            let arr = Object.keys(res.data);

            arr.forEach(str => {
              if (res.data[str]) {
                obj[str] = res.data[str];
                // DIRECT:默认(直接就给) TIMES:多少个次数的任务 FIXED:固定任务)
                switch (res.data.ruleType) {
                  case "DIRECT":
                    obj["ruleType"] = "默认(直接就给)";
                    break;
                  case "TIMES":
                    obj["ruleType"] = "多少个次数的任务";
                    break;
                  case "FIXED":
                    obj["ruleType"] = "固定任务";
                    break;
                }
                switch (res.data.status) {
                  // ENABLE:启用 DISABLE:停用)
                  case "ENABLE":
                    obj["status"] = "启用";
                    break;
                  case "DISABLE":
                    obj["status"] = "停用";
                    break;
                }
                if (str === "goodsIcon") {
                  obj[str] = this.$ImgBaseUrl + res.data[str];
                }
              }
            });

            this.infoData = obj;
            this.Actor = [
              {
                createUserId: res.data.createUserId,
                createUserName: res.data.createUserName,
                createTime: res.data.createTime
              }
            ];
            this.info_table.total = res.data.ruleList
              ? res.data.ruleList.length
              : 0;
            // title 里显示的没有额外设置的表头，其他有额外设置的，需要另添加
            this.info_table.data.title = [
              {
                title: "任务id",
                key: "missionId",
                minWidth: "80"
              },
              {
                title: "规则名称",
                key: "ruleName",
                minWidth: "100"
              },
              {
                title: "规则描述",
                key: "ruleDescription",
                minWidth: "80"
              },
              {
                title: "礼品/商品id",
                key: "goodsId",
                minWidth: "80"
              },
              {
                title: "商品名称",
                key: "goodsName",
                minWidth: "80"
              },
              {
                title: "商品图标",
                key: "goodsIcon",
                minWidth: "80",
                isImg: true
              },
              {
                title: "商品码",
                key: "goodsCode",
                minWidth: "80"
              },
              {
                title: "商品介绍",
                key: "goodsExplain",
                minWidth: "80"
              },
              {
                title: "创建时间",
                key: "createTime",
                minWidth: "80"
              }
            ];
            this.info_table.data.custom = [];
            this.info_table.data.quanxian = [];
            this.info_table.data.list = res.data.ruleList;
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
</style>
