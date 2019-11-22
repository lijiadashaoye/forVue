<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
      <el-form
        :inline="true"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        label-position="right"
      >
        <el-form-item label="广告标题" prop="advertisTitle" style="margin-bottom:0;">
          <el-input
            placeholder="请输入广告标题"
            prefix-icon="el-icon-search"
            v-model="ruleForm.advertisTitle"
            size="mini"
          ></el-input>
        </el-form-item>

        <el-form-item label="广告位置" prop="advertisLocation" style="margin-bottom:0;">
          <el-select filterable v-model="ruleForm.advertisLocation" placeholder="请选择" size="mini">
            <el-option
              v-for="(item,ind) in advertisLocationList"
              :key="ind"
              :label="item.value"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="广告开始时间" prop="startTime" style="margin-bottom:0;">
          <el-date-picker
            size="mini"
            v-model="ruleForm.startTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="广告结束时间" prop="endTime" style="margin-bottom:0;">
          <el-date-picker
            size="mini"
            v-model="ruleForm.endTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>

        <el-form-item style="margin-bottom:0;">
          <el-button type="warning" @click="search('ruleForm')" size="mini">查询</el-button>
          <el-button @click="resetForm('ruleForm')" size="mini">清除</el-button>
          <el-button type="primary" size="mini" @click="addAdverFn">新增广告</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div id="forTable">
      <isTable
        :inputData="this.$store.state.advertisManager.advertisMangerList"
        @tableEmit="tableEmit"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import isTable from "../../../components/isTable/isTable";
import { adverdis_del } from "../../../api/setting_use";

export default {
  components: {
    isTable
  },
  data() {
    return {
      env: null,
      dialogVisible: false,
      pageName: "",
      ruleForm: {
        advertisTitle: "", // 广告关键词
        advertisLocation: "",
        startTime: "",
        endTime: ""
      },
      rules: {},
      advertisLocationList: [
        { label: "BANNER", value: "发现横幅广告" },
        { label: "FIND_FINANCING", value: "发现理财圈广告" },
        { label: "ADD_FINANCING", value: "理财圈列表广告" },
        { label: "ADD_RANKING", value: "排行榜横幅广告" },
        { label: "ADD_SIDE", value: "侧边栏Banner" },
        { label: "ADD_HOME", value: "首页Banner" }
      ]
    };
  },
  mounted() {
    this.env = sessionStorage.getItem("env") === "development";
    this.$store.state.advertisManager.advertisMangerList.pageNum = 1;
    this.userDo();
    this.pageName = this.$route.name;
    this.getList({
      pageSize: this.$store.state.advertisManager.advertisMangerList.pageSize,
      pageNum: this.$store.state.advertisManager.advertisMangerList.pageNum
    });
    this.$store.state.advertisManager.advertisMangerList.data.title = [
      {
        title: "编号",
        key: "id",
        minWidth: "80",
        sortable: true
      },
      {
        title: "广告标题",
        key: "advertisTitle",
        minWidth: "140"
      },
      {
        title: "广告位置",
        key: "adverLocText",
        minWidth: "140"
      },
      {
        title: "广告排序",
        key: "sort",
        minWidth: "80"
      },
      {
        title: "可见类型",
        key: "visualTypeText",
        minWidth: "120"
      },
      {
        title: "显示类型",
        key: "showTypeText",
        minWidth: "120"
      },
      {
        title: "App",
        key: "appChannelName",
        minWidth: "100"
      },
      {
        title: "开始时间",
        key: "startTime",
        minWidth: "200"
      },
      {
        title: "结束时间",
        key: "endTime",
        minWidth: "200",
        sortable: true
      },
      {
        title: "创建时间",
        key: "gmtCreated",
        minWidth: "200",
        sortable: true
      },
      {
        title: "创建人",
        key: "creatorName",
        minWidth: "100"
      }
    ];
  },
  methods: {
    ...mapMutations({
      userDo: "advertisManager/userDo"
    }),
    ...mapActions({
      getList: "advertisManager/getList"
    }),
    // 搜索
    search(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.state.advertisManager.advertisMangerList.pageNum = 1;
          this.getList({
            pageSize: this.$store.state.advertisManager.advertisMangerList
              .pageSize,
            pageNum: this.$store.state.advertisManager.advertisMangerList
              .pageNum,
            advertisTitle:
              this.ruleForm.advertisTitle != ""
                ? this.ruleForm.advertisTitle
                : null,
            advertisLocation:
              this.ruleForm.advertisLocation != "" &&
              this.ruleForm.advertisLocation != null
                ? this.ruleForm.advertisLocation
                : null,
            startTime:
              this.ruleForm.startTime != "" ? this.ruleForm.startTime : null,
            endTime: this.ruleForm.endTime != "" ? this.ruleForm.endTime : null
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$store.state.advertisManager.advertisMangerList.pageNum = 1;
      this.getList({
        pageNum: this.$store.state.advertisManager.advertisMangerList.pageNum,
        pageSize: this.$store.state.advertisManager.advertisMangerList.pageSize
      });
    },
    //跳转到创建页
    addAdverFn() {
      let jurisdiction = JSON.parse(
        sessionStorage.getItem("buttenpremissions")
      );
      if (jurisdiction.indexOf("advertis_manage_add") > -1) {
        this.$router.push({
          path: "/home/setting/advertis-manage/add"
        });
      } else {
        //弹出消息提示用户
        this.$alert("您没有这个权限", {
          confirmButtonText: "确定"
        });
      }
    },

    tableEmit(data) {
      switch (data.type) {
        case "regetData": // 分页的emit
          this.getList({
            pageSize: this.$store.state.advertisManager.advertisMangerList
              .pageSize,
            pageNum: this.$store.state.advertisManager.advertisMangerList
              .pageNum,
            advertisTitle:
              this.ruleForm.advertisTitle != ""
                ? this.ruleForm.advertisTitle
                : null,
            advertisLocation:
              this.ruleForm.advertisLocation != ""
                ? this.ruleForm.advertisLocation
                : null,
            startTime:
              this.ruleForm.startTime != "" ? this.ruleForm.startTime : null,
            endTime: this.ruleForm.endTime != "" ? this.ruleForm.endTime : null
          });
          break;
        case "edit": // 编辑按钮
          this.$router.push({
            path: "/home/setting/advertis-manage/add",
            query: {
              id: data.data.id
            }
          });
          break;
        case "delete": // 单独删除按钮
          this.delete(data.data.id);
          break;
        case "detail":
          this.$router.push({
            path: "/home/setting/advertis-manage/detail",
            query: { id: data.data.id }
          });
      }
    },
    delete: function(id) {
      this.$confirm("确认要删除吗").then(() => {
        adverdis_del({ id: id }).then(res => {
          if (res) {
            this.$message.success("删除成功");
          } else {
            this.$message.error("删除失败");
          }
          this.getList({
            pageSize: this.$store.state.advertisManager.advertisMangerList
              .pageSize,
            pageNum: this.$store.state.advertisManager.advertisMangerList
              .pageNum,
            advertisTitle: this.ruleForm.advertisTitle,
            advertisLocation:
              this.ruleForm.advertisLocation != ""
                ? this.ruleForm.advertisLocation
                : null,
            startTime:
              this.ruleForm.startTime != "" ? this.ruleForm.startTime : null,
            endTime: this.ruleForm.endTime != "" ? this.ruleForm.endTime : null
          });
        });
      });
    }
  }
};
</script>
