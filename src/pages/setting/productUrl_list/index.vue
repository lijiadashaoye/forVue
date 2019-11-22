<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
      <div>
        <el-button type="primary" size="mini" @click="addUrl">添加地址</el-button>
      </div>
    </div>

    <div id="forTable">
      <isTable :inputData="this.$store.state.productUrl.productUrlList" @tableEmit="tableEmit" />
    </div>

    <el-dialog
      :title="addDialogTitle ? '添加地址' : '修改地址'"
      :visible.sync="dialogFormVisible"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        
      >
        <el-form-item label="地址类型" prop="linkModel">
          <el-select
            filterable
            v-model="ruleForm.linkModel"
            placeholder="请选择"
            :disabled="linkModelFlag"
          >
            <el-option
              v-for="item in channelData"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="链接地址" prop="linkUrl">
          <el-input v-model="ruleForm.linkUrl"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
          <el-button @click="cancle('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import isTable from "../../../components/isTable/isTable";
import { mapActions, mapMutations } from "vuex";
import {
  getAppChannel,
  productUrl_add,
  productUrl_uopdate
} from "../../../api/setting_use";
export default {
  components: {
    isTable
  },
  data() {
    return {
      env: null,

      id: "",
      pageName: "",
      linkModelFlag: false,
      dialogFormVisible: false,
      addDialogTitle: "true",
      linkName: "",
      rules: {
        linkModel: [
          { required: true, message: "请选择产品类型", trigger: "blur" }
        ]
      },
      channelData: [],
      ruleForm: {
        linkModel: "",
        linkUrl: ""
      }
    };
  },
  mounted() {
    this.env = sessionStorage.getItem("env") === "development";

    this.pageName = this.$route.name;
    this.getList({
      pageNum: 1,
      pageSize: this.$store.state.productUrl.productUrlList.pageSize
    });
    this.userDo();
    this.getChannelData();
    // console.log(this.$store.state.productUrl.productUrlList.data)
    this.$store.state.productUrl.productUrlList.data.title = [
      {
        title: "地址类型",
        key: "linkName",
        minWidth: "120"
      },
      {
        title: "产品地址",
        key: "linkUrl",
        minWidth: "200"
      },
      {
        title: "创建人",
        key: "creatorName",
        minWidth: "100"
      },
      {
        title: "创建时间",
        key: "gmtCreated",
        minWidth: "120"
      },
      {
        title: "修改人",
        key: "modifierName",
        minWidth: "100"
      },
      {
        title: "修改时间",
        key: "gmtModified",
        minWidth: "120"
      }
    ];
  },
  methods: {
    ...mapMutations({
      userDo: "productUrl/userDo"
    }),
    ...mapActions({
      getList: "productUrl/getList",
      deleteList: "productUrl/deleteList"
    }),
    addUrl() {
      this.dialogFormVisible = true;
      this.addDialogTitle = true;
      this.linkModelFlag = false;
      this.ruleForm = {
        linkModel: "",
        linkUrl: ""
      };
    },
    getChannelData() {
      getAppChannel("product_url").then(res => {
        this.channelData = res.data;
      });
    },
    //提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.channelData.forEach(v => {
            if (this.ruleForm.linkModel == v.value) {
              this.linkName = v.label;
            }
          });
          if (this.addDialogTitle) {
            productUrl_add({
              linkModel: this.ruleForm.linkModel,
              linkName: this.linkName,
              linkUrl: this.ruleForm.linkUrl
            }).then(res => {
              if (res && res.success) {
                this.dialogFormVisible = false;
                this.$refs.ruleForm.resetFields();
                this.$message.success("保存成功");
                this.getList({
                  pageNum: this.$store.state.productUrl.productUrlList.pageNum,
                  pageSize: this.$store.state.productUrl.productUrlList.pageSize
                });
              }
            });
          } else {
            productUrl_uopdate({
              id: this.id,
              linkModel: this.ruleForm.linkModel,
              linkName: this.linkName,
              linkUrl: this.ruleForm.linkUrl
            }).then(res => {
              if (res && res.success) {
                this.dialogFormVisible = false;
                this.$refs.ruleForm.resetFields();
                this.$message.success("保存成功");
                this.getList({
                  pageNum: this.$store.state.productUrl.productUrlList.pageNum,
                  pageSize: this.$store.state.productUrl.productUrlList.pageSize
                });
              }
            });
          }
        } else {
          return false;
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
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.deleteList(id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //修改
    edit(data) {
      this.id = data.id;
      this.dialogFormVisible = true;
      this.addDialogTitle = false;
      this.linkModelFlag = true;
      this.ruleForm.linkModel = data.linkModel;
      this.ruleForm.linkUrl = data.linkUrl;
    },
    //取消
    cancle(formName) {
      this.dialogFormVisible = false;
      this.$refs[formName].resetFields();
    },
    tableEmit(data) {
      switch (data.type) {
        case "regetData": // 分页的emit
          this.getList({
            pageNum: this.$store.state.productUrl.productUrlList.pageNum,
            pageSize: this.$store.state.productUrl.productUrlList.pageSize
          });
          break;
        case "delete": // 删除按钮
          this.delete(data.data.id);
          break;
        case "edit": // 修改
          this.edit(data.data);
          break;
      }
    }
  }
};
</script>

<style>
</style>
