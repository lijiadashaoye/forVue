
<template>
  <div class="componentWaper">
    <div id="forHeader">
      <h3 style="margin-bottom:10px">{{pageName}}</h3>
      <div class="adverAdd">
        <router-link
          v-if="$store.state.message.smsList.data.quanxian.indexOf('sms_manage_add')>-1"
          :to="{ path: '/setting/sms/manager/list/send-message' }"
        >
          <el-button type="primary" size="mini">新建消息</el-button>
        </router-link>
      </div>
    </div>
    <div id="forTable">
      <isTable @tableEmit="tableEmit" :inputData="$store.state.message.smsList" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import isTable from "../../../components/isTable/isTable";
export default {
  name: "short-message-list",
  components: {
    isTable
  },
  data() {
    return {
      pageName: "" //二级title
    };
  },
  methods: {
    ...mapActions({
      getSmsList: "message/getSmsList",
      deleteSmsManage: "message/deleteSmsManage"
    }),
    ...mapMutations({
      smsUserDo: "message/smsUserDo",
      pageNumDefault: "message/pageNumDefault",
      setTitleList: "message/setTitleList"
    }),
    // 获取数据列表
    getList() {
      this.getSmsList({
        pageNum: this.$store.state.message.smsList.pageNum,
        pageSize: this.$store.state.message.smsList.pageSize
      });
    },
    // 表单操作事件
    tableEmit(obj) {
      switch (obj.type) {
        case "detail": //详情
          break;
        case "delete": //单个删除
          this.deleteIndex(obj.data.id);
          break;
        case "regetData": //条目更改
          // 重新获取列表数据
          this.getList();
          break;
      }
    },
    // 删除信息
    deleteIndex(id) {
      this.$confirm("此操作将永久删除该消息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 做删除操作
          this.deleteSmsManage(id).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            // 再次请求数据
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  mounted() {
    // 将列表pagenum还原为1
    this.pageNumDefault("smsList");
    //   获取二级title
    this.pageName = this.$route.name.trim();
    let arr = [
      {
        title: "任务ID",
        key: "id",
        minWidth: "160"
      },
      {
        title: "发送目标",
        key: "sendTarget",
        minWidth: "160"
      },
      {
        title: "发送摘要",
        key: "smsContent",
        minWidth: "150"
      },
      {
        title: "发送方式",
        key: "sendType",
        minWidth: "120"
      },
      {
        title: "发送状态",
        key: "sendStatus",
        minWidth: "120"
      },
      {
        title: "链接类型",
        key: "",
        minWidth: "120"
      },
      {
        title: "活动名称",
        key: "",
        minWidth: "120"
      },
      {
        title: "地域推广方式",
        key: "",
        minWidth: "150"
      },
      {
        title: "推广城市",
        key: "sendLocation",
        minWidth: "120"
      },
      {
        title: "发送时间",
        key: "sendTime",
        minWidth: "160"
      },
      {
        title: "创建时间",
        key: "gmtCreated",
        minWidth: "160"
      }
    ];
    // 设置table显示title
    this.setTitleList({
      arr: arr,
      type: "smsList"
    });
    // 获取按钮权限
    this.smsUserDo();
    // 获取短信列表
    this.getList();
  }
};
</script>
<style lang="scss" scoped>
.adverAdd {
  width: 100%;
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
}
</style>