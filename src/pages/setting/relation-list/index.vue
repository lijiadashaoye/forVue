<template>
  <div class="componentWaper">
    <div id="forHeader">
      <h3 style="margin-bottom:10px">{{pageName}}</h3>
      <div class="adverAdd">
        <el-button
          v-if="$store.state.relation.relationList.data.quanxian.indexOf('parent_tree_add')>-1"
          type="primary"
          @click="addFatherRelation"
          size="mini"
        >新建依赖</el-button>

        <div>
          <el-select filterable v-model="searchObj.searchType" placeholder="请选择搜索类型">
            <el-option
              v-for="(item,index) in searchTypeArr"
              :key="index"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-input placeholder="请输入搜索内容" v-model="searchObj.searchValue" type="text" clearable></el-input>
          <el-button
            v-if="$store.state.relation.relationList.data.quanxian.indexOf('parent_tree_list')>-1"
            type="primary"
            size="mini"
            @click="getList"
          >搜索</el-button>
        </div>
      </div>
    </div>
    <div id="forTable">
      <isTable @tableEmit="tableEmit" :inputData="$store.state.relation.relationList" />
    </div>
    <addRelation
      @edit="fatherType='edit'"
      @again="getList"
      :fatherType="fatherType"
      v-model="centerDialogVisible"
    ></addRelation>
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from "vuex";
import isTable from "@/components/isTable/isTable";
import addRelation from "./components/addRelation";
export default {
  name: "relationList",
  components: {
    isTable,
    addRelation
  },
  data() {
    return {
      searchTypeArr: [
        {
          name: "关联名称",
          value: "dataKey"
        },
        {
          name: "业务名称",
          value: "name"
        },
        {
          name: "关联级别",
          value: "linkLevel"
        },
        {
          name: "父Id",
          value: "parentId"
        }
      ], //搜索条件列表
      searchObj: {
        searchType: "",
        searchValue: ""
      }, //搜索对象
      fatherType: "", //是否是新建父级依赖
      pageName: "", //二级title
      centerDialogVisible: false //model蒙版
    };
  },
  created() {
    // 将页码清1
    this.pageNumDefault();
    // 获取按钮权限
    this.relationUserDo();
    let arr = [
      {
        title: "key值",
        key: "dataKey",
        minWidth: "100"
      },
      {
        title: "Id",
        key: "id",
        minWidth: "80"
      },
      {
        title: "业务名称",
        key: "name",
        minWidth: "100"
      },
      {
        title: "业务类型",
        key: "linkType",
        minWidth: "100"
      },
      {
        title: "关联级别",
        key: "linkLevel",
        minWidth: "80"
      },
      {
        title: "父级Id",
        key: "parentId",
        minWidth: "80"
      },
      {
        title: "备注",
        key: "remarks",
        minWidth: "160"
      },
      {
        title: "创建人",
        key: "creator",
        minWidth: "100"
      },
      {
        title: "创建时间",
        key: "gmtCreated",
        minWidth: "160"
      }
    ];
    // 设置table显示title
    this.setTitleList(arr);
    //   二级title
    this.pageName = this.$route.name.trim();
    // 获取列表数据
    this.getList();
  },
  computed: {
    ...mapState({
      pageNum: ({ relation }) => relation.relationList.pageNum,
      pageSize: ({ relation }) => relation.relationList.pageSize
    })
  },
  methods: {
    ...mapActions({
      getRelationList: "relation/getRelationList",
      deleteRelation: "relation/deleteRelation"
    }),
    ...mapMutations({
      pageNumDefault: "relation/pageNumDefault",
      setTitleList: "relation/setTitleList",
      relationUserDo: "relation/relationUserDo",
      saveIndexInfo: "relation/saveIndexInfo"
    }),
    // 新建父级依赖
    addFatherRelation() {
      this.fatherType = "addFather";
      this.centerDialogVisible = true;
    },
    // 获取依赖列表
    getList() {
      let obj = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      if (this.searchObj.searchType) {
        obj[this.searchObj.searchType] = this.searchObj.searchValue;
      }
      this.getRelationList(obj);
    },
    // table抛出事件
    tableEmit(obj) {
      switch (obj.type) {
        case "add": //新增
          // 存储单条条目
          this.saveIndexInfo(obj.data);
          this.fatherType = "addChild";
          this.centerDialogVisible = true;
          break;
        case "detail": //详情
          this.saveIndexInfo(obj.data);
          this.fatherType = "detail";
          this.centerDialogVisible = true;
          break;
        case "delete": //单个删除
          this.deleteIndex(obj.data.id);
          break;
        case "regetData": //条目更改
          // 重新获取列表数据
          this.getList();
          break;
      }
    },
    // 删除信息
    deleteIndex(id) {
      this.$confirm("此操作将永久删除此关联, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 做删除操作
          this.deleteRelation(id).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            // 再次请求数据
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.adverAdd {
  width: 100%;
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  .el-input {
    width: 200px;
    margin-right: 20px;
  }
  .el-select {
    width: 200px;
    margin-right: 20px;
  }
}
</style>