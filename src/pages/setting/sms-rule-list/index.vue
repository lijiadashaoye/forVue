<template>
  <div class="componentWaper">
    <div id="forHeader">
      <h3 style="margin-bottom:10px">{{pageName}}</h3>
      <div class="adverAdd">
        <el-button
          type="primary"
          @click="addSmsRule"
          size="mini"
          v-if="$store.state.smsRuleTemplate.ruleList.data.quanxian.indexOf('sms_rule_add')>-1"
        >新建规则</el-button>
        <div>
          <!-- <el-input placeholder="请输入搜索内容" v-model="searchObj.searchValue" type="text" clearable></el-input>
          <el-button
            v-if="$store.state.relation.relationList.data.quanxian.indexOf('parent_tree_list')>-1"
            type="primary"
            size="mini"
            @click="getList"
          >搜索</el-button> -->
        </div>
      </div>
    </div>
    <div id="forTable">
      <isTable @tableEmit="tableEmit" :inputData="$store.state.smsRuleTemplate.ruleList" />
    </div>
    <addRelation
      @edit="dialogType='edit'"
      @again="getList"
      :dialogType="dialogType"
      v-model="centerDialogVisible"
    ></addRelation>
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from "vuex";
import isTable from "@/components/isTable/isTable";
import addRelation from "./components/addSmsRule";
export default {
  name: "smsRuleList",
  components: {
    isTable,
    addRelation
  },
  data() {
    return {
      searchObj: {
        searchType: "",
        searchValue: ""
      }, //搜索对象
      dialogType: "", //dialog显示状态/增加/详情/修改
      pageName: "", //二级title
      centerDialogVisible: false //model蒙版
    };
  },
  created() {
    // 将页码清1
    this.pageNumDefault("ruleList");
    // 获取按钮权限
    this.ruleUserDo();
    let arr = [
      {
        title: "Id",
        key: "id",
        minWidth: "80"
      },
      {
        title: "规则编码",
        key: "code",
        minWidth: "100"
      },
      {
        title: "类型",
        key: "type",
        minWidth: "100"
      },
      {
        title: "限制周期",
        key: "cycle",
        minWidth: "80"
      },
      {
        title: "限制次数",
        key: "limit",
        minWidth: "80"
      },
      {
        title: "备注",
        key: "memo",
        minWidth: "160"
      }
    ];
    // 设置table显示title
    this.setTitleList({ type: "ruleList", arr: arr });
    //   二级title
    this.pageName = this.$route.name.trim();
    // 获取列表数据
    this.getList();
  },
  computed: {
    ...mapState({
      pageNum: ({ smsRuleTemplate }) => smsRuleTemplate.ruleList.pageNum,
      pageSize: ({ smsRuleTemplate }) => smsRuleTemplate.ruleList.pageSize
    })
  },
  methods: {
    ...mapActions({
      getSmsRuleList: "smsRuleTemplate/getSmsRuleList",
      deleteSmsRule: "smsRuleTemplate/deleteSmsRule",
      smsRuleDetail: "smsRuleTemplate/smsRuleDetail",
    }),
    ...mapMutations({
      pageNumDefault: "smsRuleTemplate/pageNumDefault",
      ruleUserDo: "smsRuleTemplate/ruleUserDo",
      setTitleList: "smsRuleTemplate/setTitleList"
    }),
    // 新建短信权限
    addSmsRule() {
      this.dialogType = "add";
      this.centerDialogVisible = true;
    },
      // 获取短信权限列表
    getList() {
      let obj = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      this.getSmsRuleList(obj);
    },
    
    // table抛出事件
    tableEmit(obj) {
      switch (obj.type) {
        case "detail": //详情
          this.dialogType = "detail";
          this.smsRuleDetail(obj.data.id);
          this.centerDialogVisible = true;
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
    // 删除单条短信权限
    deleteIndex(id) {
      this.$confirm("此操作将永久删除此条短信权限, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 做删除操作
          this.deleteSmsRule(id).then(() => {
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
  .el-input {
    width: 200px;
    margin-right: 20px;
  }
  .el-select {
    width: 200px;
    margin-right: 20px;
  }
}
</style>