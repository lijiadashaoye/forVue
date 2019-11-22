<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>

      <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
        <el-form-item label="栏目标题" prop="title" style="margin-bottom:5px;">
          <el-input v-model="ruleForm.title" placeholder="请输入栏目标题" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="显示状态" prop="isShow" style="margin-bottom:5px;">
          <el-select v-model="ruleForm.isShow" placeholder="请选择" size="mini">
            <el-option
              v-for="(item,ind) in isShowList"
              :key="ind"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item style="margin-bottom:5px;">
          <el-button type="warning" @click="search('ruleForm')" size="mini">查询</el-button>
          <el-button @click="resetForm('ruleForm')" size="mini">清除</el-button>
          <el-button type="primary" size="mini" @click="addSlider">新建</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div id="forTable">
      <isTable :inputData="this.$store.state.slider.sliderList" @tableEmit="tableEmit" />
    </div>

    <el-dialog
      :close-on-click-modal="false"
      title="修改"
      :visible.sync="dialogFormVisible"
      :before-close="cancel"
    >
      <slider
        :appChannel.sync="this.$store.state.protocol.appChannel"
        :params="params"
        :dialogFormVisible="dialogFormVisible"
        @send="send"
        @cancel="cancel"
      />
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import isTable from "../../../components/isTable/isTable";
import slider from "../../../components/slider";
import { slider_updata, slider_delete } from "../../../api/setting_use.js";

export default {
  components: {
    isTable,
    slider
  },
  data() {
    return {
      env: null,

      pageName: "",
      dialogFormVisible: false, //修改弹窗开关
      params: "", //修改传递的数据
      ruleForm: {
        title: "",
        isShow: ""
      },
      rules: {},
      isShowList: [
        {
          label: "显示",
          value: "SHOW"
        },
        {
          label: "不显示",
          value: "HIDE"
        }
      ]
    };
  },
  mounted() {
    this.env = sessionStorage.getItem("env") === "development";

    this.pageName = this.$route.name;
    this.$store.state.slider.sliderList.pageNum = 1;
    this.userDo();
    this.getList({
      pageNum: this.$store.state.slider.sliderList.pageNum,
      pageSize: this.$store.state.slider.sliderList.pageSize
    });
    this.getAppChannel();
    this.$store.state.slider.sliderList.data.title = [
      {
        title: "App",
        key: "appChannelName",
        minWidth: "80"
      },
      {
        title: "栏目标题",
        key: "title",
        minWidth: "100"
      },
      {
        title: "栏目图片",
        key: "columnImage",
        minWidth: "120",
        isImg: true
      },
      {
        title: "栏目key",
        key: "columnKey",
        minWidth: "120"
      },
      {
        title: "标题颜色",
        key: "columnColor",
        minWidth: "100",
        isColor: true
      },
      {
        title: "文字说明",
        key: "textExplain",
        minWidth: "160"
      },
      {
        title: "文字颜色",
        key: "textExplainColor",
        minWidth: "100"
      },
      {
        title: "显示状态",
        key: "isShowCN",
        minWidth: "100"
      },
      {
        title: "显示位置",
        key: "buttonTypeName",
        minWidth: "100"
      },
      {
        title: "系统",
        key: "platformName",
        minWidth: "80"
      },
      {
        title: "排序值",
        key: "sort",
        minWidth: "80",
        sortable: true
      }
    ];
  },
  methods: {
    ...mapActions({
      getList: "slider/getList"
    }),
    ...mapMutations({
      userDo: "slider/userDo",
      getAppChannel: "protocol/getAppChannel"
    }),
    //查询
    search(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.state.slider.sliderList.pageNum = 1;
          this.getList({
            pageNum: this.$store.state.slider.sliderList.pageNum,
            pageSize: this.$store.state.slider.sliderList.pageSize,
            title: this.ruleForm.title != "" ? this.ruleForm.title : null,
            isShow: this.ruleForm.isShow != "" ? this.ruleForm.isShow : null
          });
        } else {
          return false;
        }
      });
    },
    //清除
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$store.state.slider.sliderList.pageNum = 1;
      this.getList({
        pageNum: this.$store.state.slider.sliderList.pageNum,
        pageSize: this.$store.state.slider.sliderList.pageSize,
        title: this.ruleForm.title != "" ? this.ruleForm.title : null,
        isShow: this.ruleForm.isShow != "" ? this.ruleForm.isShow : null
      });
    },
    //修改保存
    send(data) {
      slider_updata(data).then(res => {
        if (res && res.success) {
          this.dialogFormVisible = false;
          this.$message({
            type: "success",
            message: `保存成功`
          });
          this.getList({
            pageNum: this.$store.state.slider.sliderList.pageNum,
            pageSize: this.$store.state.slider.sliderList.pageSize,
            title: this.ruleForm.title != "" ? this.ruleForm.title : null,
            isShow: this.ruleForm.isShow != "" ? this.ruleForm.isShow : null
          });
        }
      });
    },
    //取消
    cancel() {
      this.params = {};
      this.dialogFormVisible = false;
    },
    //修改
    edit(data) {
      this.dialogFormVisible = true;
      this.params = data;
    },
    //删除
    delete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(res => {
          if (res) {
            slider_delete(id).then(res => {
              if (res && res.success) {
                this.$message.success("删除成功");
                this.getList({
                  pageNum: this.$store.state.slider.sliderList.pageNum,
                  pageSize: this.$store.state.slider.sliderList.pageSize,
                  title: this.ruleForm.title != "" ? this.ruleForm.title : null,
                  isShow:
                    this.ruleForm.isShow != "" ? this.ruleForm.isShow : null
                });
              }
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 监听表格的操作
    tableEmit(data) {
      switch (data.type) {
        case "regetData": // 分页的emit
          this.getList({
            pageNum: this.$store.state.slider.sliderList.pageNum,
            pageSize: this.$store.state.slider.sliderList.pageSize,
            title: this.ruleForm.title != "" ? this.ruleForm.title : null,
            isShow: this.ruleForm.isShow != "" ? this.ruleForm.isShow : null
          });
          break;
        case "edit": // 修改
          this.edit(data.data);
          break;
        case "delete":
          this.delete(data.data.id);
          break;
      }
    },
    //新增侧边栏
    addSlider() {
      let jurisdiction = JSON.parse(
        sessionStorage.getItem("buttenpremissions")
      );
      if (jurisdiction.indexOf("sidebar_add") > -1) {
        this.$router.push({
          path: "/home/setting/sidebar/add"
        });
      } else {
        //弹出消息提示用户
        this.$alert("您没有这个权限", {
          confirmButtonText: "确定"
        });
      }
    }
  }
};
</script>

<style>
</style>
