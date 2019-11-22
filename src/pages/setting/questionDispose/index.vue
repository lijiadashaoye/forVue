<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>

      <el-form
        :model="searchForm"
        :inline="true"
        :rules="rules"
        ref="searchForm"
        label-width="75px"
        label-position="right"
        size="mini"
        label-suffix=":"
      >
        <el-form-item label="入口名称" prop="entryName" style="margin-bottom:5px;">
          <el-input v-model="searchForm.entryName" size="mini" placeholder="请输入入口名称"></el-input>
        </el-form-item>
        <el-form-item label="平台" prop="platformName" style="margin-bottom:5px;">
          <el-select v-model="searchForm.platformName" placeholder="请选择" size="mini">
            <el-option
              v-for="(item,ind) in platFormList"
              :key="ind"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="问题类型" prop="questionName" style="margin-bottom:5px;">
          <el-input v-model="searchForm.questionName" size="mini" placeholder="请输入问题类型"></el-input>
        </el-form-item>
        <el-form-item label="上下架" prop="status" style="margin-bottom:5px;">
          <el-select v-model="searchForm.status" placeholder="请选择" size="mini">
            <el-option
              v-for="(item,ind) in statusList"
              :key="ind"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="margin-bottom:5px;">
          <el-button type="warning" @click="search" size="mini">查询</el-button>
          <el-button type="info" @click="resetForm" size="mini">清除</el-button>
          <el-button type="primary" @click="add" size="mini" style="margin-top:6px">新增</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div id="forTable">
      <isTable :inputData="this.$store.state.questionDispose.questionList" @tableEmit="tableEmit" />
    </div>

    <el-dialog
      :title="addFlag ? '新建分类' : '修改分类'"
      :visible.sync="dialogFormVisible"
      :before-close="closeDialog"
      width="500px"
    >
      <el-form
        :model="addForm"
        :rules="addRules"
        ref="addForm"
        label-width="120px"
        label-position="left"
      >
        <el-form-item label="渠道" prop="appChannelCode">
          <el-select v-model="addForm.appChannelCode" placeholder="请选择" style="width:100%;">
            <el-option
              v-for="(item,ind) in appList"
              :key="ind"
              :label="item.value"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="平台" prop="platformCode">
          <el-select v-model="addForm.platformCode" placeholder="请选择" style="width:100%;">
            <el-option
              v-for="(item,ind) in platFormList"
              :key="ind"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入口" prop="entry">
          <el-select
            style="width:100%;"
            v-model="addForm.entry"
            placeholder="请选择"
            @change="entryChange"
            filterable
          >
            <el-option
              v-for="(item,ind) in entryTypeList"
              :key="ind"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入口名称" prop="entryType">
          <el-select
            style="width:100%;"
            v-model="addForm.entryType"
            placeholder="请选择"
            @focus="entryNameSelect"
            filterable
          >
            <el-option
              v-for="(item,ind) in entryNameList"
              :key="ind"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="问题类型" prop="questionType">
          <el-select
            v-model="addForm.questionType"
            placeholder="请选择"
            filterable
            style="width:100%;"
          >
            <el-option
              v-for="(item,ind) in questionTypeList"
              :key="ind"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上下架" prop="status">
          <el-select v-model="addForm.status" placeholder="请选择" style="width:100%;">
            <el-option
              v-for="(item,ind) in statusList"
              :key="ind"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="显示数量" prop="showNum">
          <el-input-number size="mini" v-model="addForm.showNum" :min="0" :max="10"></el-input-number>
        </el-form-item>
        <el-form-item label="显示问题" prop="questionInfoListIds">
          <el-select
            v-model="addForm.questionInfoListIds"
            multiple
            filterable
            placeholder="请选择"
            style="width:100%;"
          >
            <el-option
              v-for="item in problemList"
              :key="item.value"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <div class="bottomBtn">
          <el-button type="primary" @click="save('addForm')" size="mini">保存</el-button>
          <el-button type="info" @click="cancel('addForm')" size="mini">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import isTable from "../../../components/isTable/isTable";
import { mapActions, mapMutations } from "vuex";
import {
  getAppChannel,
  problemInfo_list,
  questionDispose_add,
  questionDispose_isTop,
  questionDispose_detail,
  questionDispose_updata,
  questionDispose_delete
} from "../../../api/setting_use";
export default {
  name: "questionDispose",
  components: {
    isTable
  },
  data() {
    return {
      pageName: "",
      env: null,
      dialogFormVisible: false,
      searchForm: {
        questionName: "",
        entryName: "",
        platformName: "",
        status: ""
      },
      rules: {},
      appChannelName: "",
      platformName: "",
      questionName: "",
      entryName: "",
      id: "",
      addFlag: true,
      addForm: {
        appChannelCode: "",
        platformCode: "",
        entry: "",
        entryType: "",
        questionType: "",
        status: "",
        showNum: 0,
        questionInfoListIds: []
      },
      addRules: {
        appChannelCode: [
          { required: true, message: "请选择渠道", trigger: "blur" }
        ],
        platformCode: [
          { required: true, message: "请选择平台", trigger: "blur" }
        ],
        entry: [{ required: true, message: "请选择入口类型", trigger: "blur" }],
        entryType: [
          { required: true, message: "请选择入口名称", trigger: "blur" }
        ],
        questionType: [
          { required: true, message: "请选择问题类型", trigger: "blur" }
        ],
        status: [{ required: true, message: "请选择上下架", trigger: "blur" }],
        showNum: [
          { required: true, message: "请选择显示数量", trigger: "blur" }
        ]
      },
      appList: [],
      entryTypeList: [],
      entryNameList: [],
      questionTypeList: [],
      problemList: [],
      statusList: [
        {
          label: "上架",
          value: "SHOW"
        },
        {
          label: "下架",
          value: "HIDE"
        }
      ],
      platFormList: [
        {
          label: "通用",
          value: "all"
        },
        {
          label: "安卓",
          value: "android"
        },
        {
          label: "IOS",
          value: "ios"
        }
      ]
    };
  },
  mounted() {
    this.env = sessionStorage.getItem("env") === "development";
    this.pageName = this.$route.name;
    this.userDo();
    this.getAppList();
    this.getEntryTypeLIst();
    this.getQuestionTypeList();
    this.getProblemList();
    this.$store.state.questionDispose.questionList.pageNum = 1;
    this.getList({
      pageSize: this.$store.state.questionDispose.questionList.pageSize,
      pageNum: this.$store.state.questionDispose.questionList.pageNum
    });
    this.$store.state.questionDispose.questionList.data.title = [
      {
        title: "Id",
        key: "id",
        minWidth: "80"
      },
      {
        title: "渠道",
        key: "appChannelName",
        minWidth: "100"
      },
      {
        title: "平台",
        key: "platformName",
        minWidth: "100"
      },
      {
        title: "入口名称",
        key: "entryName",
        minWidth: "120"
      },
      {
        title: "问题类型",
        key: "questionName",
        minWidth: "160"
      },
      {
        title: "上下架",
        key: "statusCN",
        minWidth: "100"
      },
      {
        title: "创建时间",
        key: "gmtCreated",
        minWidth: "160"
      },
      {
        title: "修改时间",
        key: "gmtModified",
        minWidth: "160"
      }
    ];
  },
  methods: {
    ...mapActions({
      getList: "questionDispose/getList"
    }),
    ...mapMutations({
      userDo: "questionDispose/userDo"
    }),
    //获取app
    getAppList() {
      getAppChannel("channel_type").then(res => {
        if (res && res.success) {
          this.appList = res.data;
        }
      });
    },
    //获取入口类型
    getEntryTypeLIst() {
      getAppChannel("question").then(res => {
        if (res && res.success) {
          this.entryTypeList = res.data;
        }
      });
    },
    //获取问题类型
    getQuestionTypeList() {
      getAppChannel("question_type").then(res => {
        if (res && res.success) {
          this.questionTypeList = res.data;
        }
      });
    },
    //获取问题列表
    getProblemList() {
      problemInfo_list().then(res => {
        if (res && res.success) {
          this.problemList = res.data.list;
        }
      });
    },
    entryChange() {
      this.addForm.entryType = "";
    },
    entryNameSelect() {
      if (this.addForm.entry != "" && this.addForm.entry != null) {
        getAppChannel(this.addForm.entry).then(res => {
          if (res && res.success) {
            this.entryNameList = res.data;
          }
        });
      }
    },
    //新增
    add() {
      let jurisdiction = JSON.parse(
        sessionStorage.getItem("buttenpremissions")
      );
      if (jurisdiction.indexOf("question_classify_add") > -1) {
        this.id = "";
        this.addFlag = true;
        this.dialogFormVisible = true;
      } else {
        this.$alert("你没有权限添加", "暂无权限", {
          confirmButtonText: "确定"
        });
      }
    },
    //查询
    search() {
      this.$store.state.questionDispose.questionList.pageNum = 1;
      this.getList({
        pageSize: this.$store.state.questionDispose.questionList.pageSize,
        pageNum: this.$store.state.questionDispose.questionList.pageNum,
        questionName:
          this.searchForm.questionName != "" &&
          this.searchForm.questionName != null
            ? this.searchForm.questionName
            : null,
        entryName:
          this.searchForm.entryName != "" && this.searchForm.entryName != null
            ? this.searchForm.entryName
            : null,
        platformName:
          this.searchForm.platformName != "" &&
          this.searchForm.platformName != null
            ? this.searchForm.platformName
            : null,
        status:
          this.searchForm.status != "" && this.searchForm.status != null
            ? this.searchForm.status
            : null
      });
    },
    //清除查询
    resetForm() {
      this.$refs.searchForm.resetFields();
      this.$store.state.questionDispose.questionList.pageNum = 1;
      this.getList({
        pageSize: this.$store.state.questionDispose.questionList.pageSize,
        pageNum: this.$store.state.questionDispose.questionList.pageNum
      });
    },
    //点击修改
    edit(data) {
      this.addFlag = false;
      this.dialogFormVisible = true;
      this.id = data.id;
      getAppChannel(data.entry).then(res => {
        if (res && res.success) {
          this.entryNameList = res.data;
        }
      });
      questionDispose_detail(data.id).then(res => {
        if (res && res.success) {
          (this.addForm.appChannelCode = res.data.appChannelCode),
            (this.addForm.platformCode = res.data.platformCode),
            (this.addForm.entry = res.data.entry),
            (this.addForm.entryType = res.data.entryType),
            (this.addForm.questionType = res.data.questionType),
            (this.addForm.status = res.data.status),
            (this.addForm.showNum = res.data.showNum),
            (this.addForm.questionInfoListIds = []);
          res.data.infoListVos &&
            res.data.infoListVos.forEach(v => {
              this.addForm.questionInfoListIds.push(v.id);
            });
          // this.addForm.questionInfoListIds = res.data.infoListVos != [] && res.data.infoListVos != null ? res.data.infoListVos : [];
        }
      });
    },
    //保存
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.appList &&
            this.appList.forEach(v => {
              if (this.addForm.appChannelCode == v.label) {
                this.appChannelName = v.value;
              }
            });
          this.platFormList.forEach(v => {
            if (this.addForm.platformCode == v.value) {
              this.platformName = v.label;
            }
          });
          this.questionTypeList &&
            this.questionTypeList.forEach(v => {
              if (this.addForm.questionType == v.value) {
                this.questionName = v.label;
              }
            });
          this.entryNameList &&
            this.entryNameList.forEach(v => {
              if (v.value == this.addForm.entryType) {
                this.entryName = v.label;
              }
            });
          let params = {
            id: this.id != "" && this.id != null ? this.id : null,
            appChannelCode: this.addForm.appChannelCode,
            appChannelName: this.appChannelName,
            platformCode: this.addForm.platformCode,
            platformName: this.platformName,
            entry: this.addForm.entry,
            entryType: this.addForm.entryType,
            entryName: this.entryName,
            questionType: this.addForm.questionType,
            questionName: this.questionName,
            status: this.addForm.status,
            showNum: this.addForm.showNum,
            questionInfoListIds: this.addForm.questionInfoListIds
          };
          if (this.addFlag) {
            //新建
            questionDispose_add(params).then(res => {
              if (res && res.success) {
                this.dialogFormVisible = false;
                this.cancel("addForm");
                this.$store.state.questionDispose.questionList.pageNum = 1;
                this.getList({
                  pageSize: this.$store.state.questionDispose.questionList
                    .pageSize,
                  pageNum: this.$store.state.questionDispose.questionList
                    .pageNum
                });
              }
            });
          } else {
            //修改
            questionDispose_updata(params).then(res => {
              if (res && res.success) {
                this.dialogFormVisible = false;
                this.cancel("addForm");
                this.getList({
                  pageSize: this.$store.state.questionDispose.questionList
                    .pageSize,
                  pageNum: this.$store.state.questionDispose.questionList
                    .pageNum,
                  questionName:
                    this.searchForm.questionName != "" &&
                    this.searchForm.questionName != null
                      ? this.searchForm.questionName
                      : null,
                  entryName:
                    this.searchForm.entryName != "" &&
                    this.searchForm.entryName != null
                      ? this.searchForm.entryName
                      : null,
                  platformName:
                    this.searchForm.platformName != "" &&
                    this.searchForm.platformName != null
                      ? this.searchForm.platformName
                      : null,
                  status:
                    this.searchForm.status != "" &&
                    this.searchForm.status != null
                      ? this.searchForm.status
                      : null
                });
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    //取消
    cancel(formName) {
      this.dialogFormVisible = false;
      this.$refs[formName].resetFields();
    },
    //关闭弹窗
    closeDialog() {
      this.cancel("addForm");
    },
    //置顶不置顶
    switchAction(data) {
      let params = {};
      if (data.isTop == "TOP") {
        params = {
          id: data.id,
          isTop: "NOTOP"
        };
      } else {
        params = {
          id: data.id,
          isTop: "TOP"
        };
      }
      questionDispose_isTop(params).then(res => {
        if (res && res.success) {
          this.getList({
            pageSize: this.$store.state.questionDispose.questionList.pageSize,
            pageNum: this.$store.state.questionDispose.questionList.pageNum,
            questionName:
              this.searchForm.questionName != "" &&
              this.searchForm.questionName != null
                ? this.searchForm.questionName
                : null,
            entryName:
              this.searchForm.entryName != "" &&
              this.searchForm.entryName != null
                ? this.searchForm.entryName
                : null,
            platformName:
              this.searchForm.platformName != "" &&
              this.searchForm.platformName != null
                ? this.searchForm.platformName
                : null,
            status:
              this.searchForm.status != "" && this.searchForm.status != null
                ? this.searchForm.status
                : null
          });
        }
      });
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
            questionDispose_delete(id).then(res => {
              if (res && res.success) {
                this.$message.success("删除成功");
                this.getList({
                  pageSize: this.$store.state.questionDispose.questionList
                    .pageSize,
                  pageNum: this.$store.state.questionDispose.questionList
                    .pageNum,
                  questionName:
                    this.searchForm.questionName != "" &&
                    this.searchForm.questionName != null
                      ? this.searchForm.questionName
                      : null,
                  entryName:
                    this.searchForm.entryName != "" &&
                    this.searchForm.entryName != null
                      ? this.searchForm.entryName
                      : null,
                  platformName:
                    this.searchForm.platformName != "" &&
                    this.searchForm.platformName != null
                      ? this.searchForm.platformName
                      : null,
                  status:
                    this.searchForm.status != "" &&
                    this.searchForm.status != null
                      ? this.searchForm.status
                      : null
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
    //操作table
    tableEmit(data) {
      switch (data.type) {
        case "regetData": // 分页的emit
          this.getList({
            pageSize: this.$store.state.questionDispose.questionList.pageSize,
            pageNum: this.$store.state.questionDispose.questionList.pageNum,
            questionName:
              this.searchForm.questionName != "" &&
              this.searchForm.questionName != null
                ? this.searchForm.questionName
                : null,
            entryName:
              this.searchForm.entryName != "" &&
              this.searchForm.entryName != null
                ? this.searchForm.entryName
                : null,
            platformName:
              this.searchForm.platformName != "" &&
              this.searchForm.platformName != null
                ? this.searchForm.platformName
                : null,
            status:
              this.searchForm.status != "" && this.searchForm.status != null
                ? this.searchForm.status
                : null
          });
          break;
        case "delete": // 删除按钮
          this.delete(data.data.id);
          break;
        case "edit": // 修改
          this.edit(data.data);
          break;
        case "switch": // switch 变换
          this.switchAction(data.data);
          break;
      }
    }
  }
};
</script>
