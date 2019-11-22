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
        label-width="80px"
      >
        <el-form-item label="问题标题:" prop="title" style="margin-bottom:5px;">
          <el-input v-model="searchForm.title" size="mini" placeholder="请输入问题标题"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom:5px;">
          <el-button type="warning" @click="search('searchForm')" size="mini">查询</el-button>
          <el-button type="info" @click="resetForm('searchForm')" size="mini">清除</el-button>
          <el-button type="primary" @click="addProblem" size="mini">新建问题</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div id="forTable">
      <isTable :inputData="this.$store.state.problemInfo.problemInfoList" @tableEmit="tableEmit" />
    </div>

    <el-dialog
      :title="addFlag ? '新建问题信息' : '修改问题信息'"
      :visible.sync="dialogFormVisible"
      width="700px"
      :close-on-click-modal="false"
      :before-close="close"
    >
      <el-form :model="addForm" :rules="addRules" ref="addForm" label-width="100px">
        <el-form-item label="问题标题：" prop="title">
          <el-input v-model="addForm.title" placeholder="请输入问题标题"></el-input>
        </el-form-item>
        <el-form-item label="问题内容：" prop="content">
          <editor-bar v-model="addForm.content" :url="'admin/file/up/setting'" :isClear="false"></editor-bar>
        </el-form-item>
        <el-form-item label="上下架：" prop="status">
          <el-radio-group v-model="addForm.status">
            <el-radio :label="'SHOW'">上架</el-radio>
            <el-radio :label="'HIDE'">下架</el-radio>
          </el-radio-group>
        </el-form-item>
        <div class="bottomBtn">
          <el-button type="primary" size="mini" @click="save('addForm')">保存</el-button>
          <el-button type="info" size="mini" @click="reset('addForm')">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import isTable from "../../../components/isTable/isTable";
import EditorBar from "../../../components/wangEnduit";
import { mapActions, mapMutations } from "vuex";
import {
  problemInfo_add,
  problemInfo_update,
  problemInfo_delete
} from "../../../api/setting_use";
export default {
  name: "question",
  components: {
    isTable,
    EditorBar
  },
  data() {
    return {
      env: null,
      pageName: "",
      id: "",
      searchForm: {
        title: ""
      },
      rules: {},
      dialogFormVisible: false,
      addFlag: false,
      addForm: {
        title: "",
        content: "",
        status: ""
      },
      addRules: {
        title: [{ required: true, message: "请输入问题标题", trigger: "blur" }],
        content: [
          { required: true, message: "请输入问题内容", trigger: "submit" }
        ],
        status: [
          { required: true, message: "请选择是否上下架", trigger: "change" }
        ]
      }
    };
  },
  mounted() {
    this.env = sessionStorage.getItem("env") === "development";
    this.pageName = this.$route.name;
    this.userDo();
    this.$store.state.problemInfo.problemInfoList.pageNum = 1;
    this.getList({
      pageSize: this.$store.state.problemInfo.problemInfoList.pageSize,
      pageNum: this.$store.state.problemInfo.problemInfoList.pageNum
    });
    this.$store.state.problemInfo.problemInfoList.data.title = [
      {
        title: "Id",
        key: "id",
        minWidth: "80"
      },
      {
        title: "问题标题",
        key: "title",
        minWidth: "240"
      },
      {
        title: "问题内容",
        key: "content",
        minWidth: "240",
        fuWenBen: 'content'
      },
      {
        title: "上下架",
        key: "statusCN",
        minWidth: "120"
      }
    ];
  },
  methods: {
    ...mapActions({
      getList: "problemInfo/getList"
    }),
    ...mapMutations({
      userDo: "problemInfo/userDo"
    }),
    //查询
    search(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.state.problemInfo.problemInfoList.pageNum = 1;
          this.getList({
            pageSize: this.$store.state.problemInfo.problemInfoList.pageSize,
            pageNum: this.$store.state.problemInfo.problemInfoList.pageNum,
            title:
              this.searchForm.title != "" && this.searchForm.title != null
                ? this.searchForm.title
                : null
          });
        } else {
          return false;
        }
      });
    },
    //清楚查询
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.getList({
        pageSize: this.$store.state.problemInfo.problemInfoList.pageSize,
        pageNum: this.$store.state.problemInfo.problemInfoList.pageNum,
        title:
          this.searchForm.title != "" && this.searchForm.title != null
            ? this.searchForm.title
            : null
      });
    },
    //保存
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            id: this.id != "" && this.id != null ? this.id : null,
            title: this.addForm.title,
            content: this.addForm.content,
            status: this.addForm.status
          };
          if (this.addFlag) {
            //添加
            problemInfo_add(params).then(res => {
              if (res && res.success) {
                this.dialogFormVisible = false;
                this.reset("addForm");
                this.$store.state.problemInfo.problemInfoList.pageNum = 1;
                this.getList({
                  pageSize: this.$store.state.problemInfo.problemInfoList
                    .pageSize,
                  pageNum: this.$store.state.problemInfo.problemInfoList
                    .pageNum,
                  title:
                    this.searchForm.title != "" && this.searchForm.title != null
                      ? this.searchForm.title
                      : null
                });
              }
            });
          } else {
            //修改
            problemInfo_update(params).then(res => {
              if (res && res.success) {
                this.dialogFormVisible = false;
                this.reset("addForm");
                this.$store.state.problemInfo.problemInfoList.pageNum = 1;
                this.getList({
                  pageSize: this.$store.state.problemInfo.problemInfoList
                    .pageSize,
                  pageNum: this.$store.state.problemInfo.problemInfoList
                    .pageNum,
                  title:
                    this.searchForm.title != "" && this.searchForm.title != null
                      ? this.searchForm.title
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
    //弹窗关闭之前
    close() {
      this.reset("addForm");
    },
    //取消
    reset(formName) {
      this.dialogFormVisible = false;
      this.$refs[formName].resetFields();
    },
    //新建问题
    addProblem() {
      this.dialogFormVisible = true;
      this.addFlag = true;
      this.id = null;
    },
    //修改
    edit(data) {
      this.dialogFormVisible = true;
      this.addFlag = false;
      this.id = data.id;
      this.addForm.title = data.title;
      this.addForm.content = data.content;
      this.addForm.status = data.status;
    },
    //删除
    delete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        problemInfo_delete(id).then(res => {
          if (res && res.success) {
            this.getList({
              pageSize: this.$store.state.problemInfo.problemInfoList.pageSize,
              pageNum: this.$store.state.problemInfo.problemInfoList.pageNum,
              title:
                this.searchForm.title != "" && this.searchForm.title != null
                  ? this.searchForm.title
                  : null
            });
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          }
        });
      });
    },
    //操作表格
    tableEmit(data) {
      switch (data.type) {
        case "regetData": // 分页的emit
          this.getList({
            pageSize: this.$store.state.problemInfo.problemInfoList.pageSize,
            pageNum: this.$store.state.problemInfo.problemInfoList.pageNum,
            title:
              this.searchForm.title != "" && this.searchForm.title != null
                ? this.searchForm.title
                : null
          });
          break;
        case "edit": // 修改
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
