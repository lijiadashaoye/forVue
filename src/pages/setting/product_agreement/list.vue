<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
      <div style="display:inline-block;" v-if="getDict">
        <span style="font-size:14px;">产品类型: </span>
        <el-select filterable v-model="productType" size="mini" clearable placeholder="请选择">
          <el-option
            v-for="item in dictData.product_all_type"
            :key="item.id"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>&nbsp;
        <span style="font-size:14px;">产品区域: </span>
        <el-select filterable v-model="productArea" size="mini" clearable placeholder="请选择">
          <el-option
            v-for="item in dictData.product_area"
            :key="item.id"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>&nbsp;
        <span style="font-size:14px;">app名称: </span>
        <el-select filterable v-model="applicationType" size="mini" clearable placeholder="请选择">
          <el-option
            v-for="item in dictData.application_type"
            :key="item.id"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>

      <el-button size="mini" type="primary" style="margin-left:20px" @click="seachClick(true)">搜索</el-button>
      <el-button size="mini" type="info" @click="seachClick(false)">重置</el-button>
      <el-button
        size="mini"
        type="warning"
        v-if="tableInputData.data.quanxian.includes('sys_dict_add')"
        @click="buttonRowUpdata(true)"
      >添加</el-button>
      <el-button size="mini" type="danger" @click="toDelete('more')">批量删除</el-button>
    </div>
    <div id="forTable" v-if="loadEnd">
      <isTable :inputData="tableInputData" @tableEmit="tableEmit" />
    </div>

    <el-dialog
      :close-on-click-modal="false"
      title="查看"
      :visible.sync="forDialog.show"
      width="500px"
      :before-close="close"
    >
      <div class="bottomBtn" v-if="forDialog.show">
        <img :src="this.forDialog.data.logo" />
      </div>
      <div v-if="forDialog.show">
        <p v-if="forDialog.data.title">
          <span class="forDialog">标题：</span>
          {{forDialog.data.title}}
        </p>
        <p v-if="forDialog.data.area">
          <span class="forDialog">产品区域：</span>
          {{forDialog.data.area}}
        </p>
        <p v-if="forDialog.data.appName">
          <span class="forDialog">app名称：</span>
          {{forDialog.data.appName}}
        </p>
        <p v-if="forDialog.data.h5Link">
          <span class="forDialog">H5链接：</span>
          {{forDialog.data.h5Link}}
        </p>
        <div v-if="forDialog.data.productType">
          <span class="forDialog">内容：</span>
          <div v-html="forDialog.data.content"></div>
        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button
          size="mini"
          @click="buttonRowUpdata(false,forDialog.data.from)"
          type="primary"
        >编 辑</el-button>
        <el-button size="mini" @click="close" type="info">关 闭</el-button>
      </div>
    </el-dialog>
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

      productType: "", // 产品类型
      productArea: "", // 产品区域
      applicationType: "", // app名称
      forDialog: {
        show: false,
        data: {}
      },

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
    this.canDoWhat();

    let dict = sessionStorage.getItem("dict");
    if (dict) {
      let arr = Object.keys(JSON.parse(dict));
      if (!arr.includes("product_all_type")) {
        this.$store.dispatch("get_dict", this).then(res => {
          sessionStorage.setItem("dict", JSON.stringify(res));
          this.dictData = res;
          this.getDict = true;
          this.getUserData();
        });
      } else {
        this.dictData = JSON.parse(dict);
        this.getDict = true;
        this.getUserData();
      }
    } else {
      this.$store.dispatch("get_dict", this).then(res => {
        sessionStorage.setItem("dict", JSON.stringify(res));
        this.dictData = res;
        this.getDict = true;
        this.getUserData();
      });
    }
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
              .delete_product_agreement({
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
                  .delete_product_agreement({
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
                    failName += `<li>名称为：${item.data[0].title}</li>`;
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
        this.productType = "";
        this.productArea = "";
        this.applicationType = "";
      }
      this.getUserData();
    },
    see(inData) {
      // 查看
      this.forDialog.data[
        "productType"
      ] = this.dictData.product_all_type.filter(
        tar => tar.label === inData.productType
      )[0].label;

      this.forDialog.data["area"] = this.dictData.product_area.filter(
        tar => tar.label === inData.area
      )[0].label;

      this.forDialog.data["appName"] = this.dictData.application_type.filter(
        tar => tar.label === inData.appName
      )[0].label;

      this.forDialog.data.h5Link = inData.h5Link;
      this.forDialog.data.content = inData.content;
      this.forDialog.data.title = inData.title;
      this.forDialog.data.logo = this.$ImgBaseUrl + inData.logo;
      this.forDialog.data.from = inData;
      this.forDialog.show = true;
    },
    close() {
      this.forDialog.data = {};
      this.forDialog.show = false;
    },
    // 添加按钮、表格的编辑按钮
    buttonRowUpdata(type, inData) {
      if (type) {
        // 添加
        this.$router.push({
          name: "product_agreement_content"
        });
      } else {
        // 编辑
        this.$router.push({
          name: "product_agreement_content",
          query: {
            id: inData.id,
            type: "edit"
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

      this.tableInputData.data.custom.push({
        text: "查看",
        type: "primary",
        size: "mini",
        emit: "see"
      });
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
        this.tableInputData.total = data.total;
        this.tableInputData.pageSize = data.pageSize;
        this.tableInputData.pageNum = data.pageNum;

        this.tableInputData.data.list = data.list.map(item => {
          let arr = Object.keys(item);
          arr.forEach(str => {
            if (str === "area") {
              item[str] = this.dictData.product_area.filter(
                tar => tar.value === item[str]
              )[0].label;
            }
            if (str === "productType") {
              item[str] = this.dictData.product_all_type.filter(
                tar => tar.value === item[str]
              )[0].label;
            }
            if (str === "appName") {
              item[str] = this.dictData.application_type.filter(
                tar => tar.value === item[str]
              )[0].label;
            }
          });
          return item;
        });

        this.tableInputData.data.title = [
          {
            title: "标题",
            key: "title",
            minWidth: "120"
          },
          {
            title: "产品类型",
            key: "productType",
            minWidth: "120"
          },
          {
            title: "APP名称",
            key: "appName",
            minWidth: "120"
          },

          {
            title: "地区",
            key: "area",
            minWidth: "120"
          },
          {
            title: "LOGO",
            key: "logo",
            minWidth: "80",
            isImg: true
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
      if (this.productType) {
        // 产品类型
        obj.search.productType = this.productType;
      }
      if (this.productArea) {
        // 产品区域
        obj.search.area = this.productArea;
      }
      if (this.applicationType) {
        // app名称
        obj.search.appName = this.applicationType;
      }
      this.$api.product_agreement_list(obj).then(res => {
        if (res) {
          this.afterGetData(res.data);
        }
      });
    }
  }
};
</script>
