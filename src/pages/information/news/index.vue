<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
      <el-form
        :inline="true"
        :model="searchForm"
        :rules="searchRules"
        ref="searchForm"
        class="demo-ruleForm"
      >
        <el-form-item label="页面数" prop="loadNum">
          <el-input v-model="searchForm.loadNum" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="风险提示" prop="riskStatus">
          <el-select v-model="searchForm.riskStatus" placeholder="请选择" size="mini">
            <el-option
              v-for="(item,ind) in riskStatusList"
              :key="ind"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推荐状态" prop="recommendStatus">
          <el-select v-model="searchForm.recommendStatus" placeholder="请选择" size="mini">
            <el-option
              v-for="(item,ind) in recommendStatusList"
              :key="ind"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推荐产品数量" prop="recommendNum">
          <el-input v-model="searchForm.recommendNum" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="审核状态" prop="examineStatus">
          <el-select v-model="searchForm.examineStatus" placeholder="请选择" size="mini">
            <el-option
              v-for="(item,ind) in examineStatusList"
              :key="ind"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="success" @click="search">查询</el-button>
          <el-button size="mini" type="info" @click="rest('searchForm')">清除</el-button>
          <el-button size="mini" type="primary" @click="addNes">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div id="forTable">
      <isTable :inputData="tableInputData" @tableEmit="tableEmit" />
    </div>
    <el-dialog
      :title="updateFlag ? '修改新闻' : '新增新闻'"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      :before-close="closeDialog"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        label-position="left"
        class="demo-ruleForm"
      >
        <el-form-item label="加载页面数" prop="loadNum">
          <el-input v-model="ruleForm.loadNum" maxlength="20" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="风险提示" prop="riskStatus">
          <el-select v-model="ruleForm.riskStatus" placeholder="请选择">
            <el-option
              v-for="(item,ind) in riskStatusList"
              :key="ind"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="提示内容" prop="riskWarning" v-if="ruleForm.riskStatus == 'yes'">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="ruleForm.riskWarning"
            maxlength="200"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="推荐状态" prop="recommendStatus">
          <el-select v-model="ruleForm.recommendStatus" placeholder="请选择">
            <el-option
              v-for="(item,ind) in recommendStatusList"
              :key="ind"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推荐产品数量" prop="recommendNum">
          <el-input v-model="ruleForm.recommendNum" maxlength="20" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="审核状态" prop="examineStatus">
          <el-select v-model="ruleForm.examineStatus" placeholder="请选择">
            <el-option
              v-for="(item,ind) in examineStatusList"
              :key="ind"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save('ruleForm')">保存</el-button>
          <el-button type="info" @click="restForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import isTable from "@/components/isTable/isTable";
import {
  newsList,
  addNews,
  deleteNews,
  updateNews
} from "@/api/informationApi";
let jurisdiction = JSON.parse(sessionStorage.getItem("buttenpremissions"));
export default {
  components: {
    isTable
  },
  data() {
    return {
      pageName: "",
      env: null,
      tableInputData: {
        // 传给table子组件的数据
        noIndex: true,
        checkBox: false, // 判断需要不需要添加选择框
        pageSize: 10, // 分页相关
        pageNum: 1,
        total: null,
        actions: {},
        data: {
          list: [], // 给表格的数据
          quanxian: [], // 记录用户的权限，当前页面显示哪些按钮、表格是否显示操作列
          title: [], // 给表格表头
          custom: [] // 给表格按钮数量、类型（编辑、删除等）
        }
      },
      updateFlag: false,
      dialogFormVisible: false,
      riskStatusList: [
        {
          label: "未开启",
          value: "no"
        },
        {
          label: "已开启",
          value: "yes"
        }
      ],
      recommendStatusList: [
        {
          label: "关闭",
          value: "no"
        },
        {
          label: "开启",
          value: "yes"
        }
      ],
      examineStatusList: [
        {
          label: "关闭",
          value: "no"
        },
        {
          label: "开启",
          value: "yes"
        }
      ],
      searchForm: {
        loadNum: "",
        riskStatus: "",
        recommendStatus: "",
        recommendNum: "",
        examineStatus: ""
      },
      searchRules: {},
      id: "",
      ruleForm: {
        riskWarning: "",
        loadNum: "",
        riskStatus: "",
        recommendStatus: "",
        recommendNum: "",
        examineStatus: ""
      },
      rules: {
        examineStatus: [
          { required: true, message: "请选择", trigger: "change" }
        ],
        riskStatus: [{ required: true, message: "请选择", trigger: "change" }],
        recommendStatus: [
          { required: true, message: "请选择", trigger: "change" }
        ],
        riskWarning: [{ required: true, message: "请输入", trigger: "blur" }],
        loadNum: [
          { required: true, message: "请输入", trigger: "blur" },
          {
            pattern: /^[+]{0,1}(\d+)$/,
            message: "只能输入正整数",
            trigger: "blur"
          }
        ],
        recommendNum: [
          { required: true, message: "请输入", trigger: "blur" },
          {
            pattern: /^[+]{0,1}(\d+)$/,
            message: "只能输入正整数",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    this.pageName = this.$route.name;
    this.getListData({
      pageNum: this.tableInputData.pageNum,
      pageSize: this.tableInputData.pageSize
    });
    this.userDo();
  },
  methods: {
    //权限认证
    userDo() {
      this.tableInputData.data.custom = [];
      if (jurisdiction.indexOf("essay_new_set_upd") > -1) {
        this.tableInputData.data.custom.push({
          text: "修改",
          type: "warning",
          size: "small",
          emit: "edit"
        });
      }
      if (jurisdiction.indexOf("essay_new_set_del") > -1) {
        this.tableInputData.data.custom.push({
          text: "删除",
          type: "danger",
          size: "mini",
          emit: "delete"
        });
      }
    },
    //列表数据
    getListData(data = {}) {
      newsList(data).then(res => {
        if (res && res.success) {
          this.tableInputData.data.list = res.data.list;
          this.tableInputData.total = res.data.total;
          this.tableInputData.data.list.forEach(v => {
            if (v.riskStatus == "no") {
              v.riskStatusCN = "未开启";
            } else {
              v.riskStatusCN = "开启";
            }
            if (v.recommendStatus == "no") {
              v.recommendStatusCN = "关闭";
            } else {
              v.recommendStatusCN = "开启";
            }
            if (v.examineStatus == "no") {
              v.examineStatusCN = "关闭";
            } else {
              v.examineStatusCN = "开启";
            }
          });
        }
      });
      this.tableInputData.data.title = [
        {
          title: "加载页面数",
          key: "loadNum",
          minWidth: "120"
        },
        {
          title: "风险提示",
          key: "riskStatusCN",
          minWidth: "120"
        },
        {
          title: "推荐状态",
          key: "recommendStatusCN",
          minWidth: "120"
        },
        {
          title: "推荐产品数量",
          key: "recommendNum",
          minWidth: "120"
        },
        {
          title: "审核状态",
          key: "examineStatusCN",
          minWidth: "120"
        },
        {
          title: "创建人",
          key: "creatorName",
          minWidth: "120"
        },
        {
          title: "添加时间",
          key: "gmtCreated",
          minWidth: "160"
        },
        {
          title: "更新时间",
          key: "gmtModified",
          minWidth: "160"
        }
      ];
    },
    //查询
    search() {
      let requireData = Object.assign(this.searchForm, {
        pageNum: this.tableInputData.pageNum,
        pageSize: this.tableInputData.pageSize
      });
      this.getListData(requireData);
    },
    //清楚查询条件
    rest(formName) {
      this.$refs[formName].resetFields();
      this.search();
    },
    //新增
    addNes() {
      if (jurisdiction.indexOf("essay_new_set_detail") > -1) {
        this.updateFlag = false;
        this.dialogFormVisible = true;
      } else {
        //弹出消息提示用户
        this.$alert("您没有这个权限", {
          confirmButtonText: "确定"
        });
      }
    },
    //修改
    edit(data) {
      this.updateFlag = true;
      this.dialogFormVisible = true;
      this.id = data.id;
      for (var item in this.ruleForm) {
        this.ruleForm[item] = data[item];
      }
    },
    //删除
    delete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteNews(id).then(res => {
            if (res && res.success) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.search();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //保存
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.updateFlag) {
            //新增
            addNews(this.ruleForm).then(res => {
              if (res && res.success) {
                this.$message.success("保存成功");
                this.restForm("ruleForm");
                this.search();
              }
            });
          } else {
            //修改
            let params = Object.assign(this.ruleForm, {
              id: this.id
            });
            updateNews(params).then(res => {
              if (res && res.success) {
                this.$message.success("保存成功");
                this.restForm("ruleForm");
                this.search();
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    restForm(formName) {
      this.ruleForm = {
        loadNum: "",
        riskStatus: "",
        recommendStatus: "",
        recommendNum: "",
        examineStatus: "",
        riskWarning: ""
      };
      this.$refs[formName].resetFields();
      this.dialogFormVisible = false;
    },
    //关闭弹窗
    closeDialog() {
      this.restForm("ruleForm");
    },
    //操作表格
    tableEmit(data) {
      switch (data.type) {
        case "regetData":
          this.search();
          break;
        case "edit":
          this.edit(data.data);
          break;
        case "delete":
          this.delete(data.data.id);
          break;
      }
    }
  }
};
</script>

<style>
</style>