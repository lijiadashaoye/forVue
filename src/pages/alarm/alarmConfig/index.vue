<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
      <div class="adverAdd">
        <el-button
          v-if="userInfoArr.indexOf('alarm_add')>-1"
          type="primary"
          @click="addInfo"
          size="mini"
        >新增预警</el-button>
        <div>
          <!-- <el-select filterable v-model="searchObj.searchType" placeholder="请选择搜索类型">
            <el-option
              v-for="(item,index) in searchTypeArr"
              :key="index"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-input placeholder="请输入搜索内容" v-model="searchObj.searchValue" type="text" clearable></el-input>
          <el-button
            v-if="$store.state.relation.relationList.data.quanxian.indexOf('parent_tree_list')>-1"
            type="primary"
            size="mini"
            @click="getList"
          >搜索</el-button>-->
        </div>
      </div>
    </div>
    <div id="forTable">
      <isTable @tableEmit="tableEmit" :inputData="tableInfo" />
    </div>
    <handle-dialog
      @edit="dialogType='edit'"
      @again="getList"
      :dialogType="dialogType"
      v-model="centerDialogVisible"
    ></handle-dialog>
  </div>
</template>
<script>
import powerTableMixin from "@/mixin/powerTable.js";
import isTable from "@/components/isTable/isTable";
import { mapState, mapMutations, mapActions } from "vuex";
import HandleDialog from "./components/handleDialog.vue";
export default {
  name: "AlarmConfig",
  components: {
    isTable,
    HandleDialog
  },
  mixins: [powerTableMixin],
  created() {
    // 获取列表数据
    this.getList();
  },
  data() {
    return {
      dialogType: "", //dialog显示状态/增加/详情/修改
      centerDialogVisible: false, //dialog状态
      tableTitle: [
        {
          title: "编码",
          key: "systemCode",
          minWidth: "100"
        },
        {
          title: "系统名称",
          key: "systemName",
          minWidth: "100"
        },

        {
          title: "负责人",
          key: "systemLeader",
          minWidth: "100"
        },
        {
          title: "邮箱",
          key: "leaderEmail",
          minWidth: "100"
        },
        {
          title: "电话",
          key: "leaderMobile",
          minWidth: "100"
        },
        {
          title: "通知类型",
          key: "notifyType",
          minWidth: "160"
        }
      ],
      userArr: [
        {
          userType: "alarm_add"
        },
        {
          userType: "alarm_upd"
        },
        {
          userType: "alarm_detail",
          text: "详情",
          type: "primary",
          size: "mini",
          emit: "detail"
        },
        {
          userType: "alarm_del",
          text: "删除",
          type: "danger",
          size: "mini",
          emit: "delete"
        }
      ]
    };
  },

  methods: {
    ...mapActions({
      getAlarmList: "alarmConfig/getAlarmList",
      deleteAlarm: "alarmConfig/deleteAlarm",
      detailAlarm: "alarmConfig/detailAlarm"
    }),
    // table分发事件
    tableEmit(obj) {
      switch (obj.type) {
        case "detail": //详情
          this.dialogType = "detail";
          // 保证详情数据已经存储
          this.detailAlarm(obj.data.id).then(() => {
            this.centerDialogVisible = true;
          });
          break;
        case "delete": //单个删除
          this.deleteIndex(obj.data.id);
          break;
        case "regetData": //条目更改
          this.getList();
          break;
      }
    },

    // 获取列表数据
    getList() {
      this.getAlarmList();
    },
    // 新建信息
    addInfo() {
      this.dialogType = "add";
      this.centerDialogVisible = true;
    },
    // 删除事件
    startDelete(id) {
      this.deleteAlarm(id).then(res => {
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
