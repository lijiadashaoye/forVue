<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>

      <el-form inline :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
        <el-form-item label="平台:" prop="appChannelCode" style="margin-bottom:5px;">
          <el-select filterable v-model="ruleForm.appChannelCode" placeholder="请选择APP" size="mini">
            <el-option
              v-for="(item,ind) in AppOpt"
              :key="ind"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="显示类型:" prop="buttonTypeCode" style="margin-bottom:5px;">
          <el-select filterable v-model="ruleForm.buttonTypeCode" placeholder="请选择显示类型" size="mini">
            <el-option
              v-for="(item,ind) in buttonTypeOpt"
              :key="ind"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item style="margin-bottom:5px;">
          <el-button type="warning" @click="search('ruleForm')" size="mini">查询</el-button>
          <el-button @click="resetForm('ruleForm')" size="mini">清空</el-button>
          <el-button type="primary" size="mini" @click="addButton">新增按钮</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div id="forTable">
      <isTable :inputData="this.$store.state.app_button_add.tableMenu" @tableEmit="tableEmit" />
    </div>
    <!-- 修改/详情的弹框 -->
    <el-dialog :close-on-click-modal="false" :visible.sync="dialogVisible" width="500px" title="修改">
      <addButtonLeft
        :opts="opts"
        :upData.sync="upData"
        :isWxFlag="isWxFlag"
        @send="send"
        @cancel="cancel"
      />
    </el-dialog>
  </div>
</template>

<script>
import isTable from "../../../components/isTable/isTable";
import addButtonLeft from "../../../components/addButtonLeft";
import {
  app_button_upd,
  // app_button_status,
  app_button_del
} from "../../../api/setting_use.js";
import { mapMutations } from "vuex";
export default {
  props: {},
  components: {
    isTable,
    addButtonLeft
  },
  data() {
    return {
      env: null,
      pageName: "", // 当前页面名字
      flag: false,
      opts: {},
      dialogVisible: false, //弹框开关
      isWxFlag: true, //点击修改判断是不是wx
      upData: false,
      ruleForm: {
        appChannelCode: "",
        buttonTypeCode: ""
      },
      AppOpt: [
        //app下拉列表数据
        {
          label: "比财APP",
          value: "bicai"
        },
        {
          label: "拼财APP",
          value: "pincai"
        },
        {
          label: "拼财小程序",
          value: "pincaiwx"
        }
      ],
      buttonTypeOpt: [
        //button显示下拉列表
        {
          label: "顶部菜单显示",
          value: "top"
        },
        {
          label: "底部菜单显示",
          value: "bottom"
        },
        {
          label: "知道ICON按钮",
          value: "know"
        }
      ],
      rules: {}
    };
  },
  created() {
    this.env = sessionStorage.getItem("env") === "development";
    this.$store.state.app_button_add.tableMenu.pageNum = 1;
    this.canDoWhat();
    //请求表格数据
    this.getTableMenudata({
      pageNum: this.$store.state.app_button_add.tableMenu.pageNum,
      pageSize: this.$store.state.app_button_add.tableMenu.pageSize
    });
    this.pageName = this.$route.name;
    this.$store.state.app_button_add.tableMenu.data.title = [
      {
        title: "App",
        key: "appChannelName",
        minWidth: "120"
      },
      {
        title: "显示类型",
        key: "buttonTypeName",
        minWidth: "120"
      },
      {
        title: "按钮名称",
        key: "buttonText",
        minWidth: "100"
      },
      {
        title: "选中后按钮图片",
        key: "buttonSelectedIcon",
        minWidth: "120",
        isImg: true
      },
      {
        title: "未选中按钮图片",
        key: "buttonUnselectedIcon",
        minWidth: "120",
        isImg: true
      },
      {
        title: "选中后文字颜色",
        key: "buttonSelectedTextColor",
        minWidth: "120",
        isColor: true
      },
      {
        title: "未选中文字颜色",
        key: "buttonUnselectedTextColor",
        minWidth: "120",
        isColor: true
      },
      {
        title: "平台",
        key: "platformName",
        minWidth: "100"
      },
      {
        title: "创建时间",
        key: "gmtCreated",
        minWidth: "200",
        sortable: true
      },
      {
        title: "创建人",
        key: "modifierName",
        minWidth: "100"
      }
    ];
  },
  methods: {
    ...mapMutations({
      getTableMenudata: "app_button_add/getTableMenudata",
      canDoWhat: "app_button_add/canDoWhat"
    }),
    //点击  跳转
    addButton() {
      let jurisdiction = JSON.parse(
        sessionStorage.getItem("buttenpremissions")
      );
      if (jurisdiction.indexOf("app_button_add") > -1) {
        this.$router.push({
          path: "/home/setting/app-button/add"
        });
      } else {
        //弹出消息提示用户
        this.$alert("您没有这个权限", {
          confirmButtonText: "确定"
        });
      }
    },
    //查询
    search(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.state.app_button_add.tableMenu.pageNum = 1;
          this.getTableMenudata({
            pageNum: this.$store.state.app_button_add.tableMenu.pageNum,
            pageSize: this.$store.state.app_button_add.tableMenu.pageSize,
            appChannelCode:
              this.ruleForm.appChannelCode != "" &&
              this.ruleForm.appChannelCode != null
                ? this.ruleForm.appChannelCode
                : null,
            buttonTypeCode:
              this.ruleForm.buttonTypeCode != "" &&
              this.ruleForm.buttonTypeCode != null
                ? this.ruleForm.buttonTypeCode
                : null
          });
        } else {
          return false;
        }
      });
    },
    //查询清空
    resetForm(formName) {
      this.$store.state.app_button_add.tableMenu.pageNum = 1;
      this.$refs[formName].resetFields();
      this.getTableMenudata({
        pageNum: this.$store.state.app_button_add.tableMenu.pageNum,
        pageSize: this.$store.state.app_button_add.tableMenu.pageSize
      });
    },
    //点击编辑
    edit(data) {
      if (data.appChannelCode == "pincaiwx") {
        this.isWxFlag = false;
      } else {
        this.isWxFlag = true;
      }
      this.dialogVisible = true;
      this.upData = true;
      this.opts = data;
    },
    //点击取消
    cancel() {
      this.dialogVisible = false;
      this.upData = false;
      this.opts = {};
    },
    //编辑后  保存
    send(data) {
      app_button_upd(data).then(res => {
        if (res && res.success) {
          this.dialogVisible = false;
          this.$message.success("保存成功");
          this.getTableMenudata({
            pageNum: this.$store.state.app_button_add.tableMenu.pageNum,
            pageSize: this.$store.state.app_button_add.tableMenu.pageSize,
            appChannelCode:
              this.ruleForm.appChannelCode != "" &&
              this.ruleForm.appChannelCode != null
                ? this.ruleForm.appChannelCode
                : null,
            buttonTypeCode:
              this.ruleForm.buttonTypeCode != "" &&
              this.ruleForm.buttonTypeCode != null
                ? this.ruleForm.buttonTypeCode
                : null
          });
        }
      });
    },
    //点击删除
    delete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        app_button_del(id).then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.getTableMenudata({
              pageNum: this.$store.state.app_button_add.tableMenu.pageNum,
              pageSize: this.$store.state.app_button_add.tableMenu.pageSize,
              appChannelCode:
                this.ruleForm.appChannelCode != "" &&
                this.ruleForm.appChannelCode != null
                  ? this.ruleForm.appChannelCode
                  : null,
              buttonTypeCode:
                this.ruleForm.buttonTypeCode != "" &&
                this.ruleForm.buttonTypeCode != null
                  ? this.ruleForm.buttonTypeCode
                  : null
            });
          }
        });
      });
    },
    // 监听表格的操作
    tableEmit(data) {
      switch (data.type) {
        case "regetData": // 分页的emit
          this.getTableMenudata({
            pageNum: this.$store.state.app_button_add.tableMenu.pageNum,
            pageSize: this.$store.state.app_button_add.tableMenu.pageSize,
            appChannelCode:
              this.ruleForm.appChannelCode != "" &&
              this.ruleForm.appChannelCode != null
                ? this.ruleForm.appChannelCode
                : null,
            buttonTypeCode:
              this.ruleForm.buttonTypeCode != "" &&
              this.ruleForm.buttonTypeCode != null
                ? this.ruleForm.buttonTypeCode
                : null
          });
          break;
        case "edit": // 编辑按钮
          this.edit(data.data);
          break;
        case "delete": // 单独删除按钮
          this.delete(data.data.id);
          break;
        // case "switch": // switch 变换
        //   this.switchAction(data.data);
        //   break;
      }
    }
  }
};
</script>

<style scoped='true' lang="scss">
.app-menu {
  width: 100%;
  margin-top: 10px;
  padding: 0 10px;
  box-sizing: border-box;
}
</style>
