<template>
  <div class="componentWaper">
    <div id="forHeader">
      <h3>{{pageName}}</h3>
      <div class="search">
        <el-form
          :inline="true"
          :model="searchForm"
          :rules="rules"
          ref="searchForm"
          class="demo-form-inline"
        >
          <el-form-item label="币种" prop="currencyCode">
            <el-select filterable
              v-model="searchForm.currencyCode"
              placeholder="请选择"
              clearable
              
              size="mini"
            >
              <el-option
                v-for="(item,ind) in currencyList"
                :key="ind"
                :label="item.currencyName"
                :value="item.currencyCode"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="期限" prop="periodCode">
            <el-select filterable
              v-model="searchForm.periodCode"
              placeholder="请选择"
              clearable
              filterable
              size="mini"
            >
              <el-option
                v-for="(item,ind) in periodList"
                :key="ind"
                :label="item.peroidName"
                :value="item.peroidCode"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search('searchForm')" size="mini">查询</el-button>
            <el-button @click="reset('searchForm')" size="mini">清空</el-button>
            <el-button type="success" @click="add" size="mini">新增</el-button>
          </el-form-item>
        </el-form>
        <el-tabs v-model="currencyBigType" @tab-click="handleClick" type="card">
          <el-tab-pane label="内地" name="0"></el-tab-pane>
          <el-tab-pane label="香港" name="1"></el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <div id="forTable">
      <isTable :inputData="this.$store.state.topProduct.topProductList" @tableEmit="tableEmit" />
    </div>
    <!-- 产品列表弹框 -->
    <el-dialog
      title="产品列表"
      :visible.sync="dialogTableVisible"
      :close-on-click-modal="false"
      width="90%"
    >
      <div class="search">
        <el-form
          :inline="true"
          :model="proSearch"
          :rules="proRules"
          ref="proSearch"
          class="demo-form-inline"
        >
          <el-form-item label="期限" prop="periodCode">
            <el-select filterable
              v-model="proSearch.periodCode"
              placeholder="请选择"
              clearable
              filterable
              size="mini"
            >
              <el-option
                v-for="(item,ind) in periodList"
                :key="ind"
                :label="item.peroidName"
                :value="item.peroidCode"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="币种" prop="currencyCode">
            <el-select filterable
              v-model="proSearch.currencyCode"
              placeholder="请选择"
              clearable
              filterable
              size="mini"
            >
              <el-option
                v-for="(item,ind) in currencyList"
                :key="ind"
                :label="item.currencyName"
                :value="item.currencyCode"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品名称" prop="productName">
            <el-input v-model="proSearch.productName" placeholder="请输入" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="机构名称" prop="institutionName">
            <el-input v-model="proSearch.institutionName" placeholder="请输入" size="mini"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="proSubmit" size="mini">查询</el-button>
            <el-button @click="resetPro('proSearch')" size="mini">清空</el-button>
          </el-form-item>
        </el-form>
      </div>
      <productTable :inputData="this.$store.state.topProduct.pruductList" @tableEmit="topEmit" />
      <el-dialog
        title="置顶序号"
        :visible.sync="topProductVisible"
        :close-on-click-modal="false"
        append-to-body
      >
        <el-form :model="addTop" ref="addTop" class="demo-ruleForm" label-position="left">
          <el-form-item
            label="置顶序号:"
            label-width="100px"
            prop="index"
            :rules="[
                        { required: true, message: '置顶序号不能为空'},
                        { type: 'number', message: '置顶序号必须为数字值'},
                        { pattern: /^\+?[1-9]\d*$/, message: '置顶序号必须大于0' }
                    ]"
          >
            <el-input v-model.number="addTop.index" autocomplete="off" width="220px"></el-input>
          </el-form-item>
          <el-form-item
            label="期限:"
            label-width="100px"
            prop="periodCode"
            :rules="[
                        { required: true, message: '期限不能为空'},
                    ]"
          >
            <el-select filterable v-model="addTop.periodCode" placeholder="请选择" clearable filterable>
              <el-option
                v-for="(item,ind) in periodList"
                :key="ind"
                :label="item.peroidName"
                :value="item.peroidCode"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="sureAdd('addTop')">确 定</el-button>
        </div>
      </el-dialog>
    </el-dialog>

    <!-- 修改榜单弹框 -->
    <el-dialog title="修改置顶序号" :visible.sync="productVisible" :close-on-click-modal="false">
      <el-form :model="topPro" ref="topPro" class="demo-ruleForm">
        <el-form-item
          label="置顶序号:"
          label-width="100px"
          prop="index"
          :rules="[
                    { required: true, message: '置顶序号不能为空'},
                    { type: 'number', message: '置顶序号必须为数字值'},
                    { pattern: /^\+?[1-9]\d*$/, message: '置顶序号必须大于0' }
                ]"
        >
          <el-input v-model.number="topPro.index" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sureUpdata('topPro')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import isTable from "../../../components/isTable/isTable";
import { mapActions, mapMutations } from "vuex";
import {
  currency_Code,
  period_Code,
  top_product_delete,
  top_product_upData,
  top_product_add
} from "../../../api/setting_use";
export default {
  components: {
    isTable,
    productTable: isTable
  },
  data() {
    return {
      pageName: "",
      currencyBigType: "0",
      searchForm: {
        //榜单查询
        currencyCode: "", //币种
        periodCode: "" //期限
      },
      proSearch: {
        //
        periodCode: "", //期限编码
        currencyCode: "", //币种
        productName: "", //产品名称
        institutionName: "" //机构名称
      },
      topPro: {
        index: ""
      },
      addTop: {
        index: ""
      },
      currencyList: [],
      periodList: [],
      rules: {},
      proRules: {},
      dialogTableVisible: false,
      productVisible: false,
      topProductVisible: false,
      opts: {} //修改产品,
    };
  },
  mounted() {
    this.$store.state.topProduct.topProductList.pageNum = 1;
    this.$store.state.topProduct.pruductList.pageNum = 1;
    this.pageName = this.$route.name;
    this.userDo();
    //榜单
    this.getList({
      pageNum: this.$store.state.topProduct.topProductList.pageNum,
      pageSize: this.$store.state.topProduct.topProductList.pageSize,
      currencyBigType: this.currencyBigType
    });
    //产品列表
    this.getProList({
      pageNum: this.$store.state.topProduct.pruductList.pageNum,
      pageSize: this.$store.state.topProduct.pruductList.pageSize,
      areaCode: this.currencyBigType
    });
    // console.log(this.$store.state.topProduct.pruductList)
    this.$store.state.topProduct.topProductList.data.title = [
      {
        title: "置顶序号",
        key: "index",
        minWidth: "100",
        sortable: true
      },
      {
        title: "区域名称",
        key: "areaName",
        minWidth: "120"
      },
      {
        title: "机构名称",
        key: "institutionName",
        minWidth: "120"
      },
      {
        title: "产品名称",
        key: "productName",
        minWidth: "160"
      },
      {
        title: "期限",
        key: "periodName",
        minWidth: "140"
      },
      {
        title: "币种",
        key: "currencyName",
        minWidth: "120"
      },
      {
        title: "收益率",
        key: "rate",
        minWidth: "100"
      }
      // {
      //     title: "置顶",
      //     key: "label",
      //     minWidth: "120",
      // },
    ];
    this.$store.state.topProduct.pruductList.data.title = [
      {
        title: "区域名称",
        key: "areaName",
        minWidth: "100"
        // sortable: true
      },
      {
        title: "机构名称",
        key: "institutionName",
        minWidth: "100"
      },
      {
        title: "产品名称",
        key: "productName",
        minWidth: "160"
      },
      {
        title: "期限",
        key: "periodName",
        minWidth: "120"
      },
      {
        title: "币种",
        key: "currencyName",
        minWidth: "120"
      }
    ];
    currency_Code(this.currencyBigType).then(res => {
      //币种列表
      if (res && res.success) {
        this.currencyList = res.data;
      }
    });
    period_Code({
      appChannelCode: "bicai",
      peroidType: this.currencyBigType
    }).then(res => {
      //期限列表
      this.periodList = res.data;
    });
  },
  methods: {
    ...mapActions({
      getList: "topProduct/getList",
      getProList: "topProduct/getProList"
    }),
    ...mapMutations({
      userDo: "topProduct/userDo"
    }),
    //切换地区
    handleClick(tab) {
      this.currencyBigType = tab.name;
      this.$store.state.topProduct.topProductList.pageNum = 1;
      this.$store.state.topProduct.pruductList.pageNum = 1;
      period_Code({
        appChannelCode: "bicai",
        peroidType: this.currencyBigType
      }).then(res => {
        //期限列表

        this.periodList = res.data;
      });
      currency_Code(this.currencyBigType).then(res => {
        //币种列表
        if (res && res.success) {
          this.currencyList = res.data;
        }
      });
      this.getList({
        pageNum: this.$store.state.topProduct.topProductList.pageNum,
        pageSize: this.$store.state.topProduct.topProductList.pageSize,
        currencyBigType: this.currencyBigType,
        currencyCode:
          this.searchForm.currencyCode != "" &&
          this.searchForm.currencyCode != null
            ? this.searchForm.currencyCode
            : null,
        periodCode:
          this.searchForm.periodCode != "" && this.searchForm.periodCode != null
            ? this.searchForm.periodCode
            : null
      });
      this.getProList({
        pageNum: this.$store.state.topProduct.pruductList.pageNum,
        pageSize: this.$store.state.topProduct.pruductList.pageSize,
        areaCode: this.currencyBigType
      });
    },
    //查询
    search() {
      this.$store.state.topProduct.topProductList.pageNum = 1;
      this.getList({
        pageNum: this.$store.state.topProduct.topProductList.pageNum,
        pageSize: this.$store.state.topProduct.topProductList.pageSize,
        currencyBigType: this.currencyBigType,
        currencyCode:
          this.searchForm.currencyCode != "" &&
          this.searchForm.currencyCode != null
            ? this.searchForm.currencyCode
            : null,
        periodCode:
          this.searchForm.periodCode != "" && this.searchForm.periodCode != null
            ? this.searchForm.periodCode
            : null
      });
    },
    //榜单查询清空
    reset(formName) {
      this.$refs[formName].resetFields();
      this.getList({
        pageNum: this.$store.state.topProduct.topProductList.pageNum,
        pageSize: this.$store.state.topProduct.topProductList.pageSize,
        currencyBigType: this.currencyBigType,
        currencyCode:
          this.searchForm.currencyCode != "" &&
          this.searchForm.currencyCode != null
            ? this.searchForm.currencyCode
            : null,
        periodCode:
          this.searchForm.periodCode != "" && this.searchForm.periodCode != null
            ? this.searchForm.periodCode
            : null
      });
    },
    //产品查询表单清空
    resetPro(formName) {
      this.$refs[formName].resetFields();
      this.getProList({
        pageNum: this.$store.state.topProduct.pruductList.pageNum,
        pageSize: this.$store.state.topProduct.pruductList.pageSize,
        areaCode: this.currencyBigType
      });
    },
    //添加
    add() {
      let jurisdiction = JSON.parse(localStorage.getItem("buttenpremissions"));
      if (jurisdiction.indexOf("top_product_add") > -1) {
        this.dialogTableVisible = true;
      }
    },
    //确定修改
    sureUpdata(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          top_product_upData({
            id: this.opts.id,
            index: this.topPro.index,
            productId: this.opts.productId,
            rateId: this.opts.rateId
          }).then(res => {
            if (res && res.success) {
              this.productVisible = false;
              this.getList({
                pageNum: this.$store.state.topProduct.topProductList.pageNum,
                pageSize: this.$store.state.topProduct.topProductList.pageSize,
                currencyBigType: this.currencyBigType,
                currencyCode:
                  this.searchForm.currencyCode != "" &&
                  this.searchForm.currencyCode != null
                    ? this.searchForm.currencyCode
                    : null,
                periodCode:
                  this.searchForm.periodCode != "" &&
                  this.searchForm.periodCode != null
                    ? this.searchForm.periodCode
                    : null
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    //修改
    edit(data) {
      this.productVisible = true;
      this.topPro.index = data.index;
      this.opts = data;
    },
    //产品列表查询
    proSubmit() {
      this.getProList({
        pageNum: this.$store.state.topProduct.pruductList.pageNum,
        pageSize: this.$store.state.topProduct.pruductList.pageSize,
        periodCode:
          this.proSearch.periodCode != "" && this.proSearch.periodCode
            ? this.proSearch.periodCode
            : null,
        currencyCode:
          this.proSearch.currencyCode != "" && this.proSearch.currencyCode
            ? this.proSearch.currencyCode
            : null,
        productName:
          this.proSearch.productName != "" && this.proSearch.productName
            ? this.proSearch.productName
            : null,
        institutionName:
          this.proSearch.institutionName != "" && this.proSearch.institutionName
            ? this.proSearch.institutionName
            : null,
        areaCode: this.currencyBigType
      });
    },
    //置顶
    top(data) {
      this.topProductVisible = true;
      this.addTop.index = "";
      this.opts = data;
    },
    sureAdd(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          top_product_add({
            productId: this.opts.productId,
            rateId: this.opts.rateId,
            currencyBigType: this.currencyBigType,
            currencyCode: this.opts.currencyCode,
            periodCode: this.addTop.periodCode,
            index: this.addTop.index
          }).then(res => {
            if (res && res.success) {
              this.topProductVisible = false;
              this.dialogTableVisible = false;
              this.getList({
                pageNum: this.$store.state.topProduct.topProductList.pageNum,
                pageSize: this.$store.state.topProduct.topProductList.pageSize,
                currencyBigType: this.currencyBigType,
                currencyCode:
                  this.searchForm.currencyCode != "" &&
                  this.searchForm.currencyCode != null
                    ? this.searchForm.currencyCode
                    : null,
                periodCode:
                  this.searchForm.periodCode != "" &&
                  this.searchForm.periodCode != null
                    ? this.searchForm.periodCode
                    : null
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    //删除榜单列表
    delete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        top_product_delete(id).then(res => {
          if (res && res.success) {
            this.getList({
              pageNum: this.$store.state.topProduct.topProductList.pageNum,
              pageSize: this.$store.state.topProduct.topProductList.pageSize,
              currencyBigType: this.currencyBigType,
              currencyCode:
                this.searchForm.currencyCode != "" &&
                this.searchForm.currencyCode != null
                  ? this.searchForm.currencyCode
                  : null,
              periodCode:
                this.searchForm.periodCode != "" &&
                this.searchForm.periodCode != null
                  ? this.searchForm.periodCode
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
    // 监听表格的操作
    tableEmit(data) {
      switch (data.type) {
        case "regetData": // 分页的emit
          //再次请求列表数据
          this.getList({
            pageNum: this.$store.state.topProduct.topProductList.pageNum,
            pageSize: this.$store.state.topProduct.topProductList.pageSize,
            currencyBigType: this.currencyBigType,
            currencyCode:
              this.searchForm.currencyCode != "" &&
              this.searchForm.currencyCode != null
                ? this.searchForm.currencyCode
                : null,
            periodCode:
              this.searchForm.periodCode != "" &&
              this.searchForm.periodCode != null
                ? this.searchForm.periodCode
                : null
          });
          break;
        case "emit": // 编辑按钮
          this.edit(data.data);
          break;
        case "delete": // 删除按钮
          this.delete(data.data.id);
          break;
      }
    },
    //产品列表置顶操作
    topEmit(data) {
      switch (data.type) {
        case "regetData": // 分页的emit
          //再次请求列表数据
          this.getProList({
            pageNum: this.$store.state.topProduct.pruductList.pageNum,
            pageSize: this.$store.state.topProduct.pruductList.pageSize,
            areaCode: this.currencyBigType
          });
          break;
        case "top": // 编辑按钮
          this.top(data.data);
          break;
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.search {
  width: 100%;
  .demo-form-inline {
    margin: 0;
    padding: 0;
  }
}
</style>    
