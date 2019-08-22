<template>
  <div class="componentWaper">
    <div id="forHeader">
      <h3 style="margin-bottom:10px">{{pageName}}</h3>
      <div class="explosiveAdd">
        <div>
          <router-link
            v-if="$store.state.message.newsList.data.quanxian.indexOf('push_message_add')>-1"
            :to="{path:'/setting/push/message/list/new-news'}"
          >
            <el-button type="primary" size="mini">新建消息</el-button>
          </router-link>
          <el-button
            style="margin-left:10px;"
            v-if="$store.state.message.newsList.data.quanxian.indexOf('push_message_del')>-1"
            type="danger"
            size="mini"
            @click="deleteIndex()"
          >删除选中</el-button>
        </div>
        <div>
          <el-input
            placeholder="请输入消息关键字"
            v-model="searchValue"
            prefix-icon="el-icon-search"
            size="mini"
          ></el-input>
          <el-button type="primary" size="mini" @click="searchChange" style="marginLeft:10px">查询</el-button>
        </div>
      </div>
    </div>
    <div id="forTable">
      <isTable @tableEmit="tableEmit" :inputData="this.$store.state.message.newsList" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import isTable from "../../../components/isTable/isTable";
export default {
  name: "message-management",
  components: {
    isTable
  },
  data() {
    return {
      pageName: "", //二级title
      searchValue: "", //查询的消息
      deleteArr: [], //多个删除的数组
    };
  },
  computed: {
    ...mapState({
      pageNum: ({ message }) => message.newsList.pageNum
    }),
    productForm: function(){
      return {
        pageNum: this.pageNum,
        pageSize: this.$store.state.message.newsList.pageSize,
        title: null
      };
    }
  },
  created() {
    // 将列表pagenum还原为1
    this.pageNumDefault("newsList");
    // 获取二级title
    this.pageName = this.$route.name.trim();
    // 获取按钮显示权限
    this.newsUserDo();
    // 获取推送列表
    this.getList();
  },
  mounted() {
    let arr = [
      {
        title: "标题",
        key: "title",
        minWidth: "160"
      },
      {
        title: "内容",
        key: "pushContent",
        minWidth: "160"
      },
      {
        title: "推送方式",
        key: "pushWay",
        minWidth: "100"
      },
      {
        title: "发送时间",
        key: "sendTime",
        minWidth: "160"
      },
      {
        title: "创建时间",
        key: "gmtCreated",
        minWidth: "160"
      },
      {
        title: "最后操作者",
        key: "creatorName",
        minWidth: "120"
      },
      {
        title: "发送状态",
        key: "sendStatus",
        minWidth: "120"
      }
    ];
    // 设置table显示title
    this.setTitleList({
      arr: arr,
      type: "newsList"
    });
  },
  methods: {
    ...mapActions({
      getNewsList: "message/getNewsList",
      deleteProduct: "message/deleteProduct"
    }),
    ...mapMutations({
      newsUserDo: "message/newsUserDo",
      pageNumDefault: "message/pageNumDefault",
      setTitleList: "message/setTitleList",
      listDefault: "message/listDefault"
    }),
    // 获取推送列表
    getList() {
      // 获取推送信息列表
      this.getNewsList(this.productForm);
    },
    // 查询信息
    searchChange() {
      // 恢复数据操作
      this.pageNumDefault("newsList");
      this.listDefault("newsList");
      // 获取推送信息列表
      this.searchValue == "" ? (this.searchValue = null) : "";
      this.productForm.title = this.searchValue;
      this.getList();
    },
    // 表单操作事件
    tableEmit(obj) {
      switch (obj.type) {
        case "detail": //详情
          this.$router.push({
            path: "/setting/push/message/list/message-details",
            query: { id: obj.data.id }
          });
          break;
        case "delete": //单个删除
          this.deleteIndex(obj.data.id);
          break;
        case "moreDelete": //多个选中
          this.deleteArr = obj.data;
          break;
        case "regetData": //条目更改
          // 重新获取列表数据
          this.getList();
          break;
      }
    },
    // 删除信息
    deleteIndex(id) {
      if(id==undefined&&this.deleteArr.length==0){
         this.$message({
          type: "error",
          message: "请选择删除项!"
        });
        return;
      }
      this.$confirm("此操作将永久删除该消息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let obj = {};
          if (id) {
            // 做删除操作
            obj = {
              ids: [id]
            };
          } else {
            let arr = [];
            for (let item of this.deleteArr) {
              arr.push(item.id);
            }
            obj = {
              ids: arr
            };
          }

          this.deleteMesssage(obj);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 删除信息操作
    deleteMesssage(obj) {
      this.deleteProduct(obj).then(() => {
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        // 再次请求数据
        this.getList();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.explosiveAdd {
  width: 100%;
  height: 68px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  .el-input {
    width: 200px;
  }
}
</style>