<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px" :inline="true">
        <el-form-item label="产品名称" prop="productName" style="margin-bottom:0;">
          <!-- <el-select filterable v-model="ruleForm.productName" placeholder="请选择" filterable clearable> -->
          <!-- <el-option
                v-for="item in this.$store.state.explosive.explosiveList.productNameList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
          </!-->
          <el-input
            placeholder="请输入产品名称"
            prefix-icon="el-icon-search"
            v-model="ruleForm.productName"
            size="mini"
          ></el-input>
        </el-form-item>

        <el-form-item label="生效时间" prop="time" style="margin-bottom:0;">
          <el-date-picker
            v-model="ruleForm.time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="操作时间" prop="operationTime" style="margin-bottom:0;">
          <el-date-picker
            size="mini"
            v-model="ruleForm.operationTime"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>

        <el-form-item style="margin-bottom:0;">
          <el-button type="warning" @click="search('ruleForm')" size="mini">查询</el-button>
          <el-button @click="resetForm('ruleForm')" size="mini">清除</el-button>
          <el-button type="primary" size="mini" @click="addExplosive">新增爆款产品</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 列表 -->
    <div id="forTable">
      <isTable :inputData="this.$store.state.explosive.explosiveList" @tableEmit="tableEmit" />
    </div>
    <!-- 修改遮罩 -->
    <el-dialog :close-on-click-modal="false" title="修改" :visible.sync="flag" width="400px">
      <SettingExplosiveCommend
        :productTypeList="productTypeList"
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
// import datePicker from '../../../components/datePicker';
import {
  explosive_updata,
  explosive_delete
} from "../../../api/setting_use.js";
import { timestampToTime } from "../../../sets/timeFormat.js";
export default {
  props: {},
  components: {
    isTable,
    SettingExplosiveCommend //修改或者新增的组件
    // effectTime:datePicker,//生效日期
  },
  data() {
    return {
      env: null,

      pageName: "", // 当前页面名字
      searchVal: "",
      msg: "",
      flag: false,
      type: "EXPLOSIVE",
      ruleForm: {
        productName: "",
        time: [],
        operationTime: ""
      },
      searchOpt: [], //搜索列表
      list: [],
      rules: {},
      states: [],
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
      loading: true,
      effectTimeVal: "" //生效时间
    };
  },
  mounted() {
    this.env = sessionStorage.getItem("env") === "development";

    this.userDo();
    this.getExplosiveListData({
      pageNum: 1,
      pageSize: this.$store.state.explosive.explosiveList.pageSize,
      dataType: "EXPLOSIVE"
    });
    this.getProNameList();
    this.pageName = this.$route.name;
    this.$store.state.explosive.explosiveList.data.title = [
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
        minWidth: "200",
        sortable: true
      },
      {
        title: "结束时间",
        key: "endTime",
        minWidth: "200",
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
        minWidth: "100"
      }
    ];
  },
  methods: {
    ...mapMutations({
      getExplosiveListData: "explosive/getExplosiveListData",
      getProNameList: "explosive/getProNameList",
      userDo: "explosive/userDo"
    }),
    ...mapActions({}),
    //查询
    search(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.state.explosive.explosiveList.pageNum = 1;
          this.getExplosiveListData({
            dataType: "EXPLOSIVE",
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
            pageNum: this.$store.state.explosive.explosiveList.pageNum,
            pageSize: this.$store.state.explosive.explosiveList.pageSize,
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    cancel() {
      this.flag = false;
      //   this.opts = {};
    },
    addExplosive() {
      let jurisdiction = JSON.parse(
        sessionStorage.getItem("buttenpremissions")
      );
      //有权限  跳转到创建页面
      if (jurisdiction.indexOf("explosive_add") > -1) {
        this.$router.push(`/home/setting/explosive/add`);
      } else {
        //弹出消息提示用户
        this.$alert("您没有这个权限", {
          confirmButtonText: "确定"
        });
      }
    },
    //点击详情
    open() {
      this.$message.warning("您好，此项暂未开启!");
    },
    //点击删除
    delete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        // window.location.reload();
        explosive_delete(id)
          .then(res => {
            if (res && res.success) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getExplosiveListData({
                dataType: "EXPLOSIVE",
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
                pageNum: this.$store.state.explosive.explosiveList.pageNum,
                pageSize: this.$store.state.explosive.explosiveList.pageSize
              });
            }
          })
          .catch(res => {
            this.$message({
              type: "error",
              message: `${res.massage}`
            });
          });
      });
    },
    reqs(data) {
      this.opts = data;
      explosive_updata(data).then(res => {
        if (res && res.success) {
          this.flag = false;
          this.$message.success("保存成功");
          this.getExplosiveListData({
            dataType: "EXPLOSIVE",
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
            pageNum: this.$store.state.explosive.explosiveList.pageNum,
            pageSize: this.$store.state.explosive.explosiveList.pageSize
          });
        }
      });
    },
    //点击编辑
    edit(data) {
      this.flag = true;
      data.dataType = "EXPLOSIVE";
      this.opts = data;
    },
    // 监听表格的操作
    tableEmit(data) {
      switch (data.type) {
        case "regetData": // 分页的emit
          this.getExplosiveListData({
            dataType: "EXPLOSIVE",
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
            pageNum: this.$store.state.explosive.explosiveList.pageNum,
            pageSize: this.$store.state.explosive.explosiveList.pageSize
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
    }
  }
};
</script>
