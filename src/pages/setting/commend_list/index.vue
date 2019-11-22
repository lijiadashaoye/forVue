<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>

      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        label-suffix=":"
        :inline="true"
      >
        <el-form-item label="产品名称" prop="productName" style="margin-bottom:5px;">
          <el-input
            placeholder="请输入产品名称"
            prefix-icon="el-icon-search"
            v-model="ruleForm.productName"
            size="mini"
          ></el-input>
        </el-form-item>

        <el-form-item label="生效时间" prop="time" style="margin-bottom:5px;">
          <el-date-picker
            v-model="ruleForm.time"
            type="datetimerange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="操作时间" prop="operationTime" style="margin-bottom:5px;">
          <el-date-picker
            size="mini"
            v-model="ruleForm.operationTime"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>

        <el-form-item style="margin-bottom:5px;">
          <el-button type="warning" @click="search" size="mini">查询</el-button>
          <el-button @click="resetForm" size="mini">清除</el-button>
          <el-button type="primary" size="mini" @click="addCommend">新增新手专享</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 列表 -->
    <div id="forTable">
      <isTable :inputData="this.$store.state.commend.commendList" @tableEmit="tableEmit" />
    </div>
    <!-- 修改遮罩 -->
    <el-dialog :close-on-click-modal="false" title="修改" :visible.sync="flag" width="400px">
      <SettingExplosiveCommend
        :productTypeList="productTypeList"
        :productNameList="productNameList"
        :opts="opts"
        @reqs="reqs"
        :flag="flag"
        :dataType="type"
        @cancel="cancel"
      />
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import isTable from "../../../components/isTable/isTable";
import SettingExplosiveCommend from "../../../components/SettingExplosiveCommend";
// import datePicker from "../../../components/datePicker";
import { commend_updata } from "../../../api/setting_use.js";
import { timestampToTime } from "../../../sets/timeFormat.js";
export default {
  props: {},
  components: {
    isTable,
    SettingExplosiveCommend
    // effectTime: datePicker
  },
  data() {
    return {
      env: null,
      pageName: "", // 当前页面名字
      searchVal: "",
      msg: "",
      flag: false,
      type: "RECOMMEND",
      ruleForm: {
        productName: "",
        time: [],
        operationTime: ""
      },
      rules: {},
      productTypeList: [
        {
          value: "货币基金",
          label: "货币基金"
        },
        {
          value: "理财产品",
          label: "理财产品"
        },
        {
          value: "纯债基金",
          label: "纯债基金"
        },
        {
          value: "存款产品",
          label: "存款产品"
        }
      ],
      productNameList: [
        {
          id: 1,
          value: "美金",
          label: "美金"
        },
        {
          id: 2,
          value: "欧元",
          label: "欧元"
        },
        {
          id: 3,
          value: "卢比",
          label: "卢比"
        },
        {
          id: 4,
          value: "人民币",
          label: "人民币"
        }
      ],
      opts: {},
      searchOpt: [], //搜索列表
      list: [],
      states: [],
      productList: [],
      loading: true,
      effectTimeVal: "" //生效时间
    };
  },
  mounted() {
    this.env = sessionStorage.getItem("env") === "development";

    this.getCommendList({
      pageNum: 1,
      pageSize: this.$store.state.commend.commendList.pageSize,
      dataType: "RECOMMEND"
    });
    this.getProNameList();
    this.userDo();
    this.pageName = this.$route.name;
    this.$store.state.commend.commendList.data.title = [
      {
        title: "ID",
        key: "id",
        minWidth: "100",
        sortable: true
      },
      {
        title: "产品名称",
        key: "productName",
        minWidth: "120"
      },
      {
        title: "类别别名",
        key: "productTypeName",
        minWidth: "100"
      },
      {
        title: "开始时间",
        key: "startTime",
        minWidth: "180",
        sortable: true
      },
      {
        title: "结束时间",
        key: "endTime",
        minWidth: "180",
        sortable: true
      },
      {
        title: "操作时间",
        key: "gmtModified",
        minWidth: "180",
        sortable: true
      },
      {
        title: "操作人",
        key: "modifierName",
        minWidth: "100"
      }
    ];
  },
  methods: {
    ...mapMutations({
      getCommendList: "commend/getCommendList",
      getProNameList: "commend/getProNameList",
      userDo: "commend/userDo",
      deteleList: "commend/deleteList"
    }),
    ...mapActions({}),
    addCommend() {
      let jurisdiction = JSON.parse(
        sessionStorage.getItem("buttenpremissions")
      );
      //有权限  跳转到创建页面
      if (jurisdiction.indexOf("commend_add") > -1) {
        this.$router.push(`/home/setting/commend/add`);
      } else {
        //弹出消息提示用户
        this.$alert("您没有这个权限", {
          confirmButtonText: "确定"
        });
      }
    },
    //点击详情
    open() {
      this.$alert("您好，此项暂未开启", "产品详情", {
        confirmButtonText: "确定"
      });
    },
    //点击删除
    delete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.deteleList(id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    cancel() {
      this.flag = false;
    },
    //修改后点击保存
    reqs(data) {
      this.opts = data;
      commend_updata(data).then(res => {
        if (res && res.success) {
          this.flag = false;
          this.$message.success("保存成功");
          this.getCommendList({
            dataType: "RECOMMEND",
            startTime: this.ruleForm.time[0]
              ? timestampToTime(this.ruleForm.time[0])
              : null,
            endTime: this.ruleForm.time[1]
              ? timestampToTime(this.ruleForm.time[1])
              : null,
            productName:
              this.ruleForm.productName != ""
                ? this.ruleForm.productName
                : null,
            pageNum: this.$store.state.commend.commendList.pageNum,
            pageSize: this.$store.state.commend.commendList.pageSize
          });
        }
      });
    },
    //点击编辑
    edit(data) {
      this.flag = true;
      data.dataType = "RECOMMEND";
      this.opts = data;
    },
    // 监听表格的操作
    tableEmit(data) {
      switch (data.type) {
        case "regetData": // 分页的emit
          this.getCommendList({
            dataType: "RECOMMEND",
            startTime: this.ruleForm.time[0]
              ? timestampToTime(this.ruleForm.time[0])
              : null,
            endTime: this.ruleForm.time[1]
              ? timestampToTime(this.ruleForm.time[1])
              : null,
            productName:
              this.ruleForm.productName != ""
                ? this.ruleForm.productName
                : null,
            pageNum: this.$store.state.commend.commendList.pageNum,
            pageSize: this.$store.state.commend.commendList.pageSize
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
    search() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.getCommendList({
            dataType: "RECOMMEND",
            startTime: this.ruleForm.time[0]
              ? timestampToTime(this.ruleForm.time[0])
              : null,
            endTime: this.ruleForm.time[1]
              ? timestampToTime(this.ruleForm.time[1])
              : null,
            productName:
              this.ruleForm.productName != ""
                ? this.ruleForm.productName
                : null,
            pageNum: 1,
            pageSize: this.$store.state.commend.commendList.pageSize,
            operationEndTime:
              this.ruleForm.operationTime != "" &&
              this.ruleForm.operationTime != null
                ? this.ruleForm.operationTime
                : null
          });
        } else {
          return false;
        }
      });
    },
    //清除
    resetForm() {
      this.$refs.ruleForm.resetFields();
    }
  }
};
</script>
