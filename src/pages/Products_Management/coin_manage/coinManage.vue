<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
      <div style="display:inline-block;" v-if="getDict">
        <span style="font-size:14px;">币种分类:</span>
        <el-select filterable v-model="currencyType" size="mini" clearable placeholder="请选择">
          <el-option
            v-for="item in dictData.continent_type"
            :key="item.id"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>&nbsp;
        <span style="font-size:14px;">区域分类:</span>
        <el-select filterable v-model="currencyBigType" size="mini" clearable placeholder="请选择">
          <el-option
            v-for="item in dictData.product_area"
            :key="item.id"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>&nbsp;
        <span style="font-size:14px;">币种名称:</span>
        <el-input
          size="mini"
          class="isInput"
          style="width:150px!important;"
          clearable
          placeholder="请输入"
          v-model="currencyName"
        ></el-input>
      </div>

      <el-button size="mini" type="primary" style="margin-left:20px" @click="seachClick(true)">搜索</el-button>
      <el-button size="mini" type="info" @click="seachClick(false)">重置</el-button>
      <el-button size="mini" type="warning" @click="buttonRowUpdata(true)">添加</el-button>
      <el-button size="mini" type="danger" @click="toDelete('more')">批量删除</el-button>
    </div>
    <div id="forTable" v-if="loadEnd">
      <isTable :inputData="tableInputData" @tableEmit="tableEmit" />
    </div>
  </div>
</template>
<script>
import isTable from "../../../components/isTable/isTable.vue";

export default {
  props: {},
  data() {
    return {
      env: null,
      dictData: null,
      deleteData: [], // 储存需要删除的数据
      aloneDeleteData: [], // 储存需要单独删除的数据
      loadEnd: false, // 控制当表格的数据全部获取完才显示表格
      getDict: false, // 控制获取字典
      pageName: "", // 当前页面名字

      currencyType: "", // 币种分类
      currencyBigType: "", // 区域分类
      currencyName: "", // 币种名称
      tableInputData: {
        // 传给table子组件的数据
        checkBox: true, // 判断需要不需要添加选择框
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
      }
    };
  },
  components: {
    isTable
  },
  created() {
    this.env = sessionStorage.getItem("env") === "development";
    this.pageName = sessionStorage.getItem("page"); // 获取页面名称

    let dict = sessionStorage.getItem("dict");
    if (dict) {
      let arr = Object.keys(JSON.parse(dict));
      if (!arr.includes("product_all_type")) {
        this.$store.dispatch("get_dict", this).then(res => {
          sessionStorage.setItem("dict", JSON.stringify(res));
          this.dictData = res;
        });
      } else {
        this.dictData = JSON.parse(dict);
      }
    } else {
      this.$store.dispatch("get_dict", this).then(res => {
        sessionStorage.setItem("dict", JSON.stringify(res));
        this.dictData = res;
      });
    }
    setTimeout(() => {
      this.getDict = true;
      this.canDoWhat();
      this.getUserData();
    });
  },
  methods: {
    // 监听表格的操作
    tableEmit(data) {
      this.deleteData = [];
      switch (data.type) {
        case "regetData": // 分页的emit
          this.getUserData();
          break;
        case "edit": // 编辑按钮
          this.buttonRowUpdata(false, data.data);
          break;
        case "see": // 编辑按钮
          this.see(data.data);
          break;
        case "delete": // 单独删除按钮
          this.aloneDeleteData = [];
          this.aloneDeleteData.push(data.data);
          this.toDelete("alone");
          break;
        case "moreDelete": // 批量删除按钮
          this.deleteData = data.data;
          break;
      }
    },
    // 删除、批量删除
    toDelete(type) {
      if (type === "alone") {
        this.$confirm("确认删除吗？")
          .then(() => {
            // 单独删除
            this.$api
              .coin_delete({
                vm: this,
                id: this.aloneDeleteData[0].id
              })
              .then(res => {
                if (res) {
                  this.$message.success("删除成功！");
                  this.getUserData();
                }
              });
          })
          .catch(() => {});
      }
      if (type === "more") {
        if (this.deleteData.length == 0) {
          this.$message.warning("请选择要删除的！");
        } else {
          this.$confirm("确认删除吗？")
            .then(() => {
              let promiseArr = [];
              let tableData = this.tableInputData.data.list; // 获取表格的数据
              this.deleteData.forEach(item => {
                let del = this.$api
                  .coin_delete({
                    vm: this,
                    id: item.id
                  })
                  .then(res => {
                    let obj;
                    if (res) {
                      obj = {
                        ok: true,
                        data: item
                      };
                    } else {
                      obj = {
                        ok: false,
                        data: tableData.filter(tar => tar.id == item.id)
                      };
                    }
                    return obj;
                  });
                promiseArr.push(del);
              });
              Promise.all(promiseArr).then(arr => {
                // 拼接删除结果
                let numSucces = 0;
                let numFail = 0;
                let failName = "";

                arr.forEach(item => {
                  if (item.ok) {
                    numSucces++;
                  } else {
                    numFail++;
                    failName += `<li>币种名称为：${item.data[0].currencyName}</li>`;
                  }
                });
                let str = `<p>共操作 ${arr.length} 条数据，成功 ${numSucces} 个，失败 ${numFail} 个</p>`;

                if (numFail > 0) {
                  str += `<p>失败的数据为：</p>
                    <ul>
                      ${failName}
                    </ul>`;
                }
                this.$alert(str, "操作结果提示", {
                  dangerouslyUseHTMLString: true,
                  confirmButtonText: "确定",
                  callback: this.getUserData
                });
              });
            })
            .catch(() => {});
        }
      }
    },

    // 搜索框、重置
    seachClick(type) {
      this.tableInputData.pageSize = 10;
      this.tableInputData.pageNum = 1;
      if (!type) {
        this.currencyType = "";
        this.currencyBigType = "";
        this.currencyName = "";
      }
      this.getUserData();
    },
    // 添加按钮、表格的编辑按钮
    buttonRowUpdata(type, inData) {
      if (type) {
        // 添加
        this.$router.push({
          name: "coin_content"
        });
      } else {
        // 编辑
        this.$router.push({
          name: "coin_content",
          query: {
            id: inData.id
          }
        });
      }
    },
    // 用户权限判定，之后表格右侧会有不同的操作按钮
    canDoWhat() {
      let quanxian = JSON.parse(sessionStorage.getItem("buttenpremissions"));
      let sys_dict_edit = quanxian.includes("sys_dict_edit");
      let sys_dict_del = quanxian.includes("sys_dict_del");

      let sys_dict_add = quanxian.includes("sys_dict_add");
      if (sys_dict_add) {
        this.tableInputData.data.quanxian.push("sys_dict_add");
      }
      if (sys_dict_edit) {
        this.tableInputData.data.quanxian.push("sys_dict_edit");
        this.tableInputData.data.custom.push({
          text: "编辑",
          type: "warning",
          size: "small",
          emit: "edit"
        });
      }

      if (sys_dict_del) {
        this.tableInputData.data.quanxian.push("sys_dict_del");
        this.tableInputData.data.custom.push({
          text: "删除",
          type: "danger",
          size: "mini",
          emit: "delete"
        });
      }
    },
    // 获取数据后的处理
    afterGetData(data) {
      new Promise(resolve => {
        this.tableInputData.noIndex = true;
        this.tableInputData.total = data.total;
        this.tableInputData.pageSize = data.pageSize;
        this.tableInputData.pageNum = data.pageNum;
        this.tableInputData.data.list = data.list.map(item => {
          let arr = Object.keys(item);
          arr.forEach(str => {
            if (str === "currencyBigType") {
              item[str] = item[str] == 0 ? "内地" : "香港";
            }
            if (str === "currencySelected") {
              item[str] = item[str] == "YES" ? "是" : "否";
            }
            if (str === "currencyHot") {
              item[str] = item[str] == "YES" ? "是" : "否";
            }
            if (str === "currencyShow") {
              item[str] = item[str] == "YES" ? "是" : "否";
            }
          });
          return item;
        });
        this.tableInputData.data.title = [
          {
            title: "币种排序",
            key: "currencyIndex",
            minWidth: "80",
            sortable: true
          },
          {
            title: "币种名称",
            key: "currencyName",
            minWidth: "120"
          },
          {
            title: "符号",
            key: "symbol",
            minWidth: "80"
          },
          {
            title: "币种图片",
            key: "currencyImage",
            minWidth: "80",
            isImg: true
          },
          {
            title: "币种分类",
            key: "currencyType",
            minWidth: "120"
          },
          {
            title: "币种大类",
            key: "currencyBigType",
            minWidth: "120"
          },
          {
            title: "币种单位",
            key: "currencyUnit",
            minWidth: "120"
          },
          {
            title: "默认选中",
            key: "currencySelected",
            minWidth: "80"
          },
          {
            title: "是否热门",
            key: "currencyHot",
            minWidth: "80"
          },
          {
            title: "是否显示",
            key: "currencyShow",
            minWidth: "80"
          }
        ];
        resolve();
      }).then(() => {
        this.loadEnd = true;
      });
    },
    // 获取用户表格数据
    getUserData() {
      this.loadEnd = false;
      let obj = {
        vm: this,
        method: "get",
        search: {
          pageSize: this.tableInputData.pageSize,
          pageNum: this.tableInputData.pageNum
        }
      };
      if (this.currencyType) {
        // 产品类型
        obj.search.currencyType = this.currencyType;
      }
      if (this.currencyBigType) {
        // 区域分类
        obj.search.currencyBigType = this.currencyBigType === "hk" ? 1 : 0;
      }
      if (this.currencyName) {
        // app名称
        obj.search.currencyName = this.currencyName;
      }
      this.$api.coin_list(obj).then(res => {
        if (res) {
          this.afterGetData(res.data);
        }
      });
    }
  }
};
</script>
