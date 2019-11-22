<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>

      <el-form inline :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item style="margin-bottom:0;" label="活动按钮名称:" prop="activityName">
          <el-input v-model="ruleForm.activityName" placeholder="请输入活动按钮名称" size="mini"></el-input>
        </el-form-item>

        <el-form-item style="margin-bottom:0;" label="活动标题:" prop="activityTitle">
          <el-input v-model="ruleForm.activityTitle" placeholder="请输入活动标题" size="mini"></el-input>
        </el-form-item>

        <el-form-item style="margin-bottom:0;" label="显示类型:" prop="showTypeCode">
          <el-select filterable v-model="ruleForm.showTypeCode" placeholder="请选择显示类型" size="mini">
            <el-option
              v-for="(item,ind) in showTypeOpt"
              :key="ind"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item style="margin-bottom:0;">
          <el-button type="warning" @click="search('ruleForm')" size="mini">查询</el-button>
          <el-button @click="resetForm('ruleForm')" size="mini">清空</el-button>
          <el-button type="primary" size="mini" @click="addActivityButton">新建活动按钮</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div id="forTable">
      <isTable
        :inputData="this.$store.state.activityButton.activityButtonList"
        @tableEmit="tableEmit"
      />
    </div>
    <!-- 修改/详情的弹框 -->
    <el-dialog :close-on-click-modal="false" :visible.sync="dialogVisible" width="500px" title="修改">
      <activityButton @send="send" @cancel="cancel" :opts="opts" />
    </el-dialog>
  </div>
</template>

<script>
import isTable from "../../../components/isTable/isTable";
import activityButton from "../../../components/activityButton";
import {
  activity_button_upd,
  activity_button_del
} from "../../../api/setting_use.js";
import { mapActions, mapMutations } from "vuex";
export default {
  components: {
    isTable,
    activityButton
  },
  data() {
    return {
      env: null,
      pageName: "", //页面名字
      dialogVisible: false,
      opts: {
        //编辑时传递得信息
      },
      upData: false,
      ruleForm: {
        activityName: "",
        showTypeCode: "",
        activityTitle: ""
      },
      showTypeOpt: [
        //显示类型列表
        {
          label: "顶部显示",
          value: "top"
        },
        {
          label: "底部显示",
          value: "bottom"
        },
        {
          label: "仅浮动和底部显示",
          value: "float_bottom"
        },
        {
          label: "仅浮动显示",
          value: "float"
        }
      ],
      rules: {}
    };
  },
  mounted() {
    this.env = sessionStorage.getItem("env") === "development";
    this.$store.state.activityButton.activityButtonList.pageNum = 1;
    this.pageName = this.$route.name;
    this.userDo();
    this.getList({
      pageNum: this.$store.state.activityButton.activityButtonList.pageNum,
      pageSize: this.$store.state.activityButton.activityButtonList.pageSize
    });
    this.$store.state.activityButton.activityButtonList.data.title = [
      {
        title: "活动编号",
        key: "activityNumber",
        minWidth: "100",
        sortable: true
      },
      {
        title: "活动名称",
        key: "activityName",
        minWidth: "160"
      },
      {
        title: "显示类型",
        key: "showTypeName",
        minWidth: "140"
      },
      {
        title: "按钮图片",
        key: "buttonImage",
        minWidth: "120",
        isImg: true
      },
      {
        title: "收缩后按钮图片",
        key: "shrinkImage",
        minWidth: "120",
        isImg: true
      },
      {
        title: "浮动图片",
        key: "floatImage",
        minWidth: "120",
        isImg: true
      },
      {
        title: "按钮标题图片",
        key: "buttonTitleImage",
        minWidth: "120",
        isImg: true
      },
      {
        title: "平台",
        key: "platformName",
        minWidth: "80"
      },
      {
        title: "按钮文字",
        key: "buttonText",
        minWidth: "120"
      },
      {
        title: "文字颜色",
        key: "textColor",
        minWidth: "100",
        isColor: true
      },
      {
        title: "活动标题",
        key: "activityTitle",
        minWidth: "160"
      },
      {
        title: "开奖时间",
        key: "lotteryTime",
        minWidth: "200"
      }
    ];
  },
  methods: {
    ...mapMutations({
      userDo: "activityButton/userDo"
    }),
    ...mapActions({
      getList: "activityButton/getList"
    }),
    //添加按钮
    addActivityButton() {
      let jurisdiction = JSON.parse(
        sessionStorage.getItem("buttenpremissions")
      );
      //有权限  跳转到创建页面
      if (jurisdiction.indexOf("activity_button_add") > -1) {
        this.$router.push(`/home/setting/activity-button/add`);
      } else {
        //弹出消息提示用户
        this.$alert("您没有这个权限", {
          confirmButtonText: "确定"
        });
      }
    },
    //查詢
    search(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.state.activityButton.activityButtonList.pageNum = 1;
          this.getList({
            pageNum: this.$store.state.activityButton.activityButtonList
              .pageNum,
            pageSize: this.$store.state.activityButton.activityButtonList
              .pageSize,
            activityName:
              this.ruleForm.activityName != "" &&
              this.ruleForm.activityName != null
                ? this.ruleForm.activityName
                : null,
            showTypeCode:
              this.ruleForm.showTypeCode != "" &&
              this.ruleForm.showTypeCode != null
                ? this.ruleForm.showTypeCode
                : null,
            activityTitle:
              this.ruleForm.activityTitle != "" &&
              this.ruleForm.activityTitle != null
                ? this.ruleForm.activityTitle
                : null
          });
        } else {
          return false;
        }
      });
    },
    //清空查询
    resetForm(formName) {
      this.$store.state.activityButton.activityButtonList.pageNum = 1;
      this.$refs[formName].resetFields();
      this.getList({
        pageNum: this.$store.state.activityButton.activityButtonList.pageNum,
        pageSize: this.$store.state.activityButton.activityButtonList.pageSize
      });
    },
    cancel() {
      this.opts = {};
      this.dialogVisible = false;
    },
    //点击删除
    delete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          activity_button_del(id).then(res1 => {
            if (res1 && res1.success) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
            this.getList({
              pageNum: this.$store.state.activityButton.activityButtonList
                .pageNum,
              pageSize: this.$store.state.activityButton.activityButtonList
                .pageSize,
              activityName:
                this.ruleForm.activityName != "" &&
                this.ruleForm.activityName != null
                  ? this.ruleForm.activityName
                  : null,
              showTypeCode:
                this.ruleForm.showTypeCode != "" &&
                this.ruleForm.showTypeCode != null
                  ? this.ruleForm.showTypeCode
                  : null,
              activityTitle:
                this.ruleForm.activityTitle != "" &&
                this.ruleForm.activityTitle != null
                  ? this.ruleForm.activityTitle
                  : null
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    //点击编辑
    edit(data) {
      this.dialogVisible = true;
      this.opts = data;
    },
    //编辑后  保存
    send(data) {
      this.dialogVisible = false;
      activity_button_upd(data).then(res => {
        if (res && res.success) {
          this.$message.success("保存成功");
          this.getList({
            pageNum: this.$store.state.activityButton.activityButtonList
              .pageNum,
            pageSize: this.$store.state.activityButton.activityButtonList
              .pageSize,
            activityName:
              this.ruleForm.activityName != "" &&
              this.ruleForm.activityName != null
                ? this.ruleForm.activityName
                : null,
            showTypeCode:
              this.ruleForm.showTypeCode != "" &&
              this.ruleForm.showTypeCode != null
                ? this.ruleForm.showTypeCode
                : null,
            activityTitle:
              this.ruleForm.activityTitle != "" &&
              this.ruleForm.activityTitle != null
                ? this.ruleForm.activityTitle
                : null
          });
        }
      });
    },
    // 监听表格的操作
    tableEmit(data) {
      switch (data.type) {
        case "regetData": // 分页的emit
          //再次请求列表数据
          this.getList({
            pageNum: this.$store.state.activityButton.activityButtonList
              .pageNum,
            pageSize: this.$store.state.activityButton.activityButtonList
              .pageSize,
            activityName:
              this.ruleForm.activityName != "" &&
              this.ruleForm.activityName != null
                ? this.ruleForm.activityName
                : null,
            showTypeCode:
              this.ruleForm.showTypeCode != "" &&
              this.ruleForm.showTypeCode != null
                ? this.ruleForm.showTypeCode
                : null,
            activityTitle:
              this.ruleForm.activityTitle != "" &&
              this.ruleForm.activityTitle != null
                ? this.ruleForm.activityTitle
                : null
          });
          break;
        case "edit": // 编辑按钮
          this.edit(data.data);
          break;
        case "delete": // 删除按钮
          this.delete(data.data.id);
          break;
      }
    }
  }
};
</script>

<style>
</style>
