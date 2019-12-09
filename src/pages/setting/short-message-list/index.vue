
<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
      <div class="adverAdd">
        <router-link
          v-if="userInfoArr.indexOf('sms_manage_add')>-1"
          :to="{ path: '/home/setting/sms/manager/list/send-message' }"
        >
          <el-button type="primary" size="mini">新建消息</el-button>
        </router-link>
      </div>
    </div>

    <div id="forTable">
      <isTable @tableEmit="tableEmit" :inputData="nowTableInfo" />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import isTable from "../../../components/isTable/isTable";
import powerTableMixin from "@/mixin/powerTable.js";
import { defaultChange } from "@/sets/changeLanguage.js";
export default {
  name: "short-message-list",
  components: {
    isTable
  },
  mixins: [powerTableMixin],
  data() {
    return {
      tableTitle: [
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
          title: "手机号",
          key: "sendPhone",
          minWidth: "120"
        },
        {
          title: "活动名称",
          key: "title",
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
      ],
      userArr: [
        {
          userType: "sms_manage_add"
        },
        {
          userType: "sms_manage_upd"
        },
        {
          userType: "sms_manage_detail",
          text: "详情",
          type: "primary",
          size: "mini",
          emit: "detail"
        },
        {
          userType: "sms_manage_del",
          text: "删除",
          type: "danger",
          size: "mini",
          emit: "delete"
        }
      ]
    };
  },
  created() {
    this.getList();
  },
  computed: {
    nowTableInfo: function (){
        this.tableInfo.data.list = this.tableInfo.data.list.map(item => {
            item.sendTarget = defaultChange(
            item.sendTarget,
            true,
            "sendTargetType"
            );
            item.sendType = defaultChange(item.sendType, true, "sendType");
            item.sendStatus = defaultChange(item.sendStatus, true, "sendTargetArr");
            return item;
        });
        return this.tableInfo;
    }
  },
  methods: {
    ...mapActions({
      getSmsList: "message/getSmsList",
      deleteSmsManage: "message/deleteSmsManage"
    }),
    // 获取数据列表
    getList() {
      this.getSmsList();
    },
    // 表单操作事件
    tableEmit(obj) {
      switch (obj.type) {
        case "detail": //详情
          this.$router.push({
            path: "/home/setting/sms/manager/list/sms-details",
            query: { id: obj.data.id }
          });
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
    // 删除事件
    startDelete(id) {
      this.deleteSmsManage(id).then(() => {
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        // 再次请求数据
        this.getList();
      });
    }
  }
};
</script>
