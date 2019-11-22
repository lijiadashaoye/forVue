<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>

      <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="收益时间" prop="rateTime" style="margin-bottom:5px;">
          <el-date-picker
            v-model="ruleForm.rateTime"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="操作时间" prop="operationTime" style="margin-bottom:5px;">
          <el-date-picker
            v-model="ruleForm.operationTime"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
          ></el-date-picker>
        </el-form-item>
        <el-form-item style="margin-bottom:5px;">
          <el-button type="warning" @click="search('ruleForm')" size="mini">查询</el-button>
          <el-button @click="resetForm('ruleForm')" size="mini">清除</el-button>
          <el-button type="primary" size="mini" @click="addYuEBao">新增余额宝收益</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div id="forTable">
      <isTable :inputData="this.$store.state.yuebaoRate.yuebaoRateList" @tableEmit="tableEmit" />
    </div>

    <el-dialog
      :close-on-click-modal="false"
      title="修改余额宝收益"
      :visible.sync="centerDialogVisible"
      width="360px"
      center
    >
      <yuebaoAddorUpt 
        @reqest="reqest"
        @cancel="cancel"
        @toClose="centerDialogVisible=false"
        v-if="centerDialogVisible"
        :options="obj"
      />
    </el-dialog>
  </div>
</template>
<script>
import { yuebao_updata } from "../../../api/setting_use.js";
import { mapMutations } from "vuex";
import isTable from "../../../components/isTable/isTable";
import yuebaoAddorUpt from "../../../components/yuebaoAddorUpt";
// import { timestampToTime } from "../../../sets/timeFormat.js";
export default {
  props: {},
  components: {
    isTable,
    yuebaoAddorUpt
  },
  data() {
    return {
      env: null,

      pageName: "", // 当前页面名字
      searchVal: "",
      centerDialogVisible: false,
      obj: {},
      ruleForm: {
        rateTime: [],
        operationTime: []
      },
      rules: {}
    };
  },
  created() {
    this.env = sessionStorage.getItem("env") === "development";
  },
  mounted() {
    this.userDo();
    this.pageName = this.$route.name;
    this.$store.state.yuebaoRate.yuebaoRateList.pageNum = 1;
    this.getYebaoRateListData({
      pageNum: this.$store.state.yuebaoRate.yuebaoRateList.pageNum,
      pageSize: this.$store.state.yuebaoRate.yuebaoRateList.pageSize
    });
    this.$store.state.yuebaoRate.yuebaoRateList.data.title = [
      {
        title: "收益日期",
        key: "rateDate",
        minWidth: "120",
        sortable: true
      },
      {
        title: "七日年化(%)",
        key: "onThe7thOfTheYearYield",
        minWidth: "120",
        sortable: true
      },
      {
        title: "万份收益",
        key: "thousandsOfYearsYields",
        minWidth: "120",
        sortable: true
      },
      {
        title: "操作时间",
        key: "gmtModified",
        minWidth: "200",
        sortable: true
      },
      {
        title: "操作人",
        key: "modifierName",
        minWidth: "120"
      }
    ];
  },

  methods: {
    ...mapMutations({
      getYebaoRateListData: "yuebaoRate/getYebaoRateListData",
      userDo: "yuebaoRate/userDo",
      deteleList: "yuebaoRate/deteleList"
    }),
    //点击添加
    addYuEBao() {
      let jurisdiction = JSON.parse(
        sessionStorage.getItem("buttenpremissions")
      );
      //有权限  跳转到创建页面
      if (jurisdiction.indexOf("yuebao_rate_add") > -1) {
        this.$router.push(`/home/setting/yuebao-rate/add`);
      } else {
        //弹出消息提示用户
        this.$alert("您没有这个权限", {
          confirmButtonText: "确定"
        });
      }
    },
    cancel() {
      this.centerDialogVisible = false;
    },
    //点击详情
    open() {
      this.$alert("您好，此项暂未开启", "产品详情", {
        confirmButtonText: "确定",
        callback: action => {
          this.$message({
            type: "info",
            message: `action: ${action}`
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
      })
        .then(res => {
          if (res) {
            this.deteleList(id);
          }
          // window.location.reload();
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
      this.obj = data;
      this.centerDialogVisible = true;
    },
    //编辑后的处理
    reqest(data) {
      this.obj = data;
      yuebao_updata(data).then(res => {
        if (res && res.success) {
          this.centerDialogVisible = false;
          this.$message.success("保存成功");
          this.getYebaoRateListData({
            pageNum: this.$store.state.yuebaoRate.yuebaoRateList.pageNum,
            pageSize: this.$store.state.yuebaoRate.yuebaoRateList.pageSize,
            rateStartTime:
              this.ruleForm.rateTime[0] != "" &&
              this.ruleForm.rateTime[0] != undefined
                ? this.ruleForm.rateTime[0]
                : null,
            rateEndTime:
              this.ruleForm.rateTime[1] != "" &&
              this.ruleForm.rateTime[1] != undefined
                ? this.ruleForm.rateTime[1]
                : null,
            operationStartTime:
              this.ruleForm.operationTime[0] != "" &&
              this.ruleForm.operationTime[0] != undefined
                ? this.ruleForm.operationTime[0]
                : null,
            operationEndTime:
              this.ruleForm.operationTime[1] != "" &&
              this.ruleForm.operationTime[1] != undefined
                ? this.ruleForm.operationTime[1]
                : null
          });
        }
      });
    },
    // 监听表格的操作
    tableEmit(data) {
      switch (data.type) {
        case "regetData": // 分页的emit
          this.getYebaoRateListData({
            pageNum: this.$store.state.yuebaoRate.yuebaoRateList.pageNum,
            pageSize: this.$store.state.yuebaoRate.yuebaoRateList.pageSize,
            rateStartTime:
              this.ruleForm.rateTime[0] != "" &&
              this.ruleForm.rateTime[0] != undefined
                ? this.ruleForm.rateTime[0]
                : null,
            rateEndTime:
              this.ruleForm.rateTime[1] != "" &&
              this.ruleForm.rateTime[1] != undefined
                ? this.ruleForm.rateTime[1]
                : null,
            operationStartTime:
              this.ruleForm.operationTime[0] != "" &&
              this.ruleForm.operationTime[0] != undefined
                ? this.ruleForm.operationTime[0]
                : null,
            operationEndTime:
              this.ruleForm.operationTime[1] != "" &&
              this.ruleForm.operationTime[1] != undefined
                ? this.ruleForm.operationTime[1]
                : null
          });
          break;
        case "edit": // 编辑按钮
          this.edit(data.data);
          break;
        case "delete": // 删除按钮
          this.delete(data.data.id);
          break;
        case "detail": // 详情
          this.open();
          break;
      }
    },
    search(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.state.yuebaoRate.yuebaoRateList.pageNum = 1;
          this.getYebaoRateListData({
            pageNum: this.$store.state.yuebaoRate.yuebaoRateList.pageNum,
            pageSize: this.$store.state.yuebaoRate.yuebaoRateList.pageSize,
            rateStartTime:
              this.ruleForm.rateTime[0] != "" &&
              this.ruleForm.rateTime[0] != undefined
                ? this.ruleForm.rateTime[0]
                : null,
            rateEndTime:
              this.ruleForm.rateTime[1] != "" &&
              this.ruleForm.rateTime[1] != undefined
                ? this.ruleForm.rateTime[1]
                : null,
            operationStartTime:
              this.ruleForm.operationTime[0] != "" &&
              this.ruleForm.operationTime[0] != undefined
                ? this.ruleForm.operationTime[0]
                : null,
            operationEndTime:
              this.ruleForm.operationTime[1] != "" &&
              this.ruleForm.operationTime[1] != undefined
                ? this.ruleForm.operationTime[1]
                : null
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$store.state.yuebaoRate.yuebaoRateList.pageNum = 1;
      this.getYebaoRateListData({
        pageNum: this.$store.state.yuebaoRate.yuebaoRateList.pageNum,
        pageSize: this.$store.state.yuebaoRate.yuebaoRateList.pageSize
      });
    }
  }
};
</script>
