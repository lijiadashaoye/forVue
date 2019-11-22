<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
      <div class="adverAdd">
        <el-select filterable v-model="searchObj.searchType" placeholder="请选择搜索类型" size="mini">
          <el-option
            v-for="(item,index) in searchTypeArr"
            :key="index"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>&nbsp;&nbsp;
        <el-input
          size="mini"
          style="width:200px;"
          placeholder="请输入搜索内容"
          v-model="searchObj.searchValue"
          type="text"
          clearable
        ></el-input>&nbsp;
        <el-button type="warning" size="mini" @click="getList">搜索</el-button>
        <el-button
          v-if="userInfoArr.indexOf('parent_tree_add')>-1"
          type="primary"
          @click="addFatherRelation"
          size="mini"
        >新建依赖</el-button>
      </div>
    </div>
    <div id="forTable">
      <isTable @tableEmit="tableEmit" :inputData="nowTableInfo" />
    </div>
    <addRelation
      :itemId="itemId"
      @edit="dialogType='edit'"
      @again="getList"
      :dialogType="dialogType"
      v-model="centerDialogVisible"
    ></addRelation>
  </div>
</template>
<script>
import { mapActions, mapMutations } from "vuex";
import isTable from "@/components/isTable/isTable";
import addRelation from "./components/addRelation";
import powerTableMixin from "@/mixin/powerTable.js";
import { defaultChange } from "@/sets/changeLanguage.js";

export default {
  name: "relationList",
  components: {
    isTable,
    addRelation
  },
  mixins: [powerTableMixin],
  data() {
    return {
      itemId: 0,
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
      tableTitle: [
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
          title: "修改人",
          key: "modifierName",
          minWidth: "100"
        },
        {
          title: "创建时间",
          key: "gmtCreated",
          minWidth: "160"
        }
      ],
      userArr: [
        {
          userType: "parent_tree_add",
          text: "新建",
          type: "primary",
          size: "mini",
          emit: "add"
        },
        {
          userType: "parent_tree_upd"
        },
        {
          userType: "parent_tree_detail",
          text: "详情",
          type: "warning",
          size: "mini",
          emit: "detail"
        },
        {
          userType: "parent_tree_del",
          text: "删除",
          type: "danger",
          size: "mini",
          emit: "delete"
        }
      ],
      searchObj: {
        searchType: "",
        searchValue: ""
      }, //搜索对象
      dialogType: "", //是否是新建父级依赖
      centerDialogVisible: false //model蒙版
    };
  },
  created() {
    // 获取列表数据
    this.getList();
  },
  computed: {
    nowTableInfo: () => {
      this.tableInfo.data.list = this.tableInfo.data.list.map(item => {
        item.linkType = defaultChange(item.linkType, true, "linkTypeArr");
        return item;
      });
      return this.tableInfo;
    }
  },
  methods: {
    ...mapActions({
      getRelationList: "relation/getRelationList",
      relationDetail: "relation/relationDetail",
      deleteRelation: "relation/deleteRelation"
    }),
    ...mapMutations({
      pageNumDefault: "relation/pageNumDefault",
      setTitleList: "relation/setTitleList",
      relationUserDo: "relation/relationUserDo"
      // saveIndexInfo: "relation/saveIndexInfo"
    }),
    // 新建父级依赖
    addFatherRelation() {
      this.dialogType = "addFather";
      this.centerDialogVisible = true;
    },
    // 获取依赖列表
    getList() {
      let obj = {};
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
          // this.saveIndexInfo(obj.data);
          this.itemId = obj.data.id;
          this.dialogType = "addChild";
          this.centerDialogVisible = true;
          break;
        case "detail": //详情
          this.dialogType = "detail";
          // 保证详情数据已经存储
          this.relationDetail(obj.data.id).then(() => {
            this.centerDialogVisible = true;
          });
          // this.saveIndexInfo(obj.data);
          // this.dialogType = "detail";
          // this.centerDialogVisible = true;
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
    // 删除事件
    startDelete(id) {
      this.deleteRelation(id).then(() => {
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
