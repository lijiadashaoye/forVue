<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
      <div class="adverAdd">
        <el-input
          style="width:200px;"
          placeholder="请输入评论内容"
          size="mini"
          prefix-icon="el-icon-search"
          v-model.trim="content"
        ></el-input>

        <el-button type="warning" @click="search" size="mini">查询</el-button>
        <el-button @click="content='',search()" size="mini">重置</el-button>
      </div>
    </div>

    <div id="forTable">
      <isTable :inputData="this.$store.state.comment.commentList" @tableEmit="tableEmit" />
    </div>

    <el-dialog :close-on-click-modal="false" title="新增评论" :visible.sync="dialogFormVisible">
      <!-- <noticeAdd
            :params="params"
            :updata="updataFlag"
            :appChannel.sync="this.$store.state.protocol.appChannel"
      @send='send'/>-->
    </el-dialog>
  </div>
</template>

<script>
import isTable from "../../../components/isTable/isTable";
import { mapActions, mapMutations } from "vuex";
import {} from "../../../api/setting_use.js";

export default {
  components: {
    isTable
  },
  data() {
    return {
      env: null,

      pageName: "",
      dialogFormVisible: false,
      params: "",
      updataFlag: false,
      content: ""
    };
  },
  mounted() {
    this.env = sessionStorage.getItem("env") === "development";

    this.pageName = this.$route.name;
    this.userDo();
    this.getList({
      pageNum: 1,
      pageSize: this.$store.state.comment.commentList.pageSize
    });
    this.getAppChannel();
    this.$store.state.comment.commentList.data.title = [
      {
        title: "作品ID",
        key: "composeId",
        minWidth: "80"
      },
      {
        title: "作品类型",
        key: "composeTypeCN",
        minWidth: "100"
      },
      {
        title: "内容",
        key: "content",
        minWidth: "180"
      },
      {
        title: "评论者",
        key: "creatorName",
        minWidth: "120"
      },
      {
        title: "创建时间",
        key: "gmtCreated",
        minWidth: "120"
      }
    ];
  },
  methods: {
    ...mapActions({
      getList: "comment/getList",
      deleteList: "comment/deleteList"
    }),
    ...mapMutations({
      userDo: "comment/userDo",
      getAppChannel: "protocol/getAppChannel"
    }),
    //添加
    // addPeroid() {
    //     this.$alert("暂时没有这项功能哦", {
    //         confirmButtonText: "确定"
    //     });
    // },
    //删除
    delete(data) {
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
          this.deleteList(data);
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
      this.dialogFormVisible = true;
      this.params = data;
      this.updataFlag = true;
    },
    search() {
      this.getList({
        pageNum: 1,
        pageSize: this.$store.state.comment.commentList.pageSize,
        content: this.content
      });
    },
    //点击保存
    // send(data) {
    //   if (this.updataFlag) {
    //     notice_updata(data).then(res => {
    //       if (res && res.success) {
    //         this.dialogFormVisible = false;
    //         this.$message.success("保存成功");
    //         this.getList({
    //           pageNum: this.$store.state.comment.commentList.pageNum,
    //           pageSize: this.$store.state.comment.commentList.pageSize
    //         });
    //       }
    //     });
    //   } else {
    //     notice_add(data).then(res => {
    //       if (res) {
    //         this.getList({
    //           pageNum: this.$store.state.comment.commentList.pageNum,
    //           pageSize: this.$store.state.comment.commentList.pageSize
    //         });
    //       }
    //     });
    //   }
    // },
    // 监听表格的操作
    tableEmit(data) {
      switch (data.type) {
        case "regetData": // 分页的emit
          this.getList({
            pageNum: this.$store.state.comment.commentList.pageNum,
            pageSize: this.$store.state.comment.commentList.pageSize
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
