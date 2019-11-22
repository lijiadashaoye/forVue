<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
      <div style="margin-bottom:5px;">
        <el-button size="mini" type="primary" @click="addNew(true)">新增基金公司</el-button>
        <el-button size="mini" type="warning" @click="seachClick(true)">查询</el-button>
        <el-button size="mini" type="info" @click="seachClick(false)">重置</el-button>
        <el-button size="mini" type="danger" @click="toDelete('more')">批量删除</el-button>
      </div>
      <el-form
        :inline="true"
        :model="searchForm"
        label-width="85px"
        label-suffix=":"
        label-position="right"
        size="mini"
        ref="searchForm"
      >
        <el-form-item style="margin-bottom:5px;">
          <el-input v-model="searchForm.name" placeholder="请输入机构关键字"></el-input>
        </el-form-item>

        <el-form-item label="创建时间" style="margin-bottom:5px;">
          <el-date-picker
            v-model="riqi"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
            style="width:100%"
          ></el-date-picker>
        </el-form-item>
      </el-form>
    </div>
    <div id="forTable" v-if="loadEnd">
      <isTable :inputData="tableInputData" @tableEmit="tableEmit" />
    </div>
  </div>
</template>
<script>
import isTable from "@/components/isTable/isTable.vue";

export default {
  props: {},
  data() {
    return {
      env: null,
      deleteData: [], // 储存需要删除的数据
      aloneDeleteData: [], // 储存需要单独删除的数据
      loadEnd: false, // 控制当表格的数据全部获取完才显示表格
      pageName: "", // 当前页面名字
      riqi: [], // 创建时间
      searchForm: {
        name: "", // 产品关键字
        createTimeStart: "", // 创建时间（开始）
        createTimeEnd: "" // 创建时间（结束）
      }, // 搜索表单
      dictData: {}, // 数据字典
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
  mounted() {
    this.env = sessionStorage.getItem("env") === "development";
    this.loadEnd = false;
    this.pageName = sessionStorage.getItem("page"); // 获取页面名称
    sessionStorage.removeItem("jijin_edit_data");

    // 获取当前页面使用的字典数据
    this.dictData = JSON.parse(sessionStorage.getItem("dict"));
    this.canDoWhat();
    this.seachClick(true);
  },
  methods: {
    // 监听表格的操作
    tableEmit(data) {
      switch (data.type) {
        case "regetData": // 分页的emit
          this.seachClick(true);
          break;
        case "delete": // 单独删除按钮
          this.aloneDeleteData = [];
          this.aloneDeleteData.push(data.data.id);
          this.toDelete("alone");
          break;
        case "moreDelete": // 批量删除按钮
          var arr = data.data.map(item => item.id);
          this.deleteData = arr;
          break;
        case "textClick": // 文字点击
          this.$router.push({
            name: "fund_company_info",
            query: {
              id: data.data.id,
              name: data.data.name
            }
          });
          break;
      }
    },
    // 删除、批量删除
    toDelete(type) {
      if (type === "alone") {
        this.$confirm("确认删除吗？")
          .then(() => {
            this.$api
              .check_type({
                vm: this,
                id: this.aloneDeleteData[0],
                type: 2
              })
              .then(res => {
                if (res) {
                  this.$api
                    .product_jijin_delete({
                      vm: this,
                      data: this.aloneDeleteData[0]
                    })
                    .then(res => {
                      if (res) {
                        this.$message.success("删除成功！");
                        this.seachClick(false);
                      }
                    });
                }
              });
          })
          .catch(() => {});
      }
      if (type == "more") {
        if (this.deleteData.length == 0) {
          this.$message.warning("请选择要删除的！");
        } else {
          this.$confirm("确认删除吗？")
            .then(() => {
              let proArr = [],
                fails = [], // 未能删除的
                sussce = [], // 可以删除的
                successName = "",
                failName = "",
                tableData = this.tableInputData.data.list; // 获取表格的数据

              (async () => {
                // 检查哪些可以删除
                this.deleteData.forEach(num => {
                  let item = tableData.filter(tar => tar.id == num)[0];
                  proArr.push(
                    new Promise(resolve => {
                      this.$api
                        .check_type({
                          vm: this,
                          id: num,
                          type: 2
                        })
                        .then(async res => {
                          if (res) {
                            sussce.push(item);
                            await this.$api.product_jijin_delete({
                              vm: this,
                              data: item.id
                            });
                            successName += `<li>机构名称：${item.name}</li>`;
                            resolve();
                          } else {
                            fails.push(item);
                            failName += `<li>机构名称：${item.name}</li>`;
                            resolve();
                          }
                        });
                    })
                  );
                });

                await Promise.all(proArr);
                let str = `<p style="font-weight:bold;">共操作 ${this.deleteData.length} 条数据，成功 ${sussce.length} 个，失败 ${fails.length} 个</p>`;

                if (sussce.length) {
                  str += `<p style="font-weight:bold;">可以成功删除的数据为：</p>
                      <ul>
                        ${successName}
                      </ul>`;
                }
                if (fails.length) {
                  str += `<p style="font-weight:bold;">不能删除的数据为：</p>
                      <ul>
                        ${failName}
                      </ul>`;
                }
                this.$store.dispatch("get_dict", this).then(res => {
                  sessionStorage.setItem("dict", JSON.stringify(res));
                  this.getUserData();
                });
                this.$alert(str, "操作结果提示", {
                  confirmButtonText: "确定",
                  dangerouslyUseHTMLString: true
                });
              })();
            })
            .catch(() => {});
        }
      }
    },
    // 搜索框、重置
    seachClick(type) {
      let serarchObj = {};
      if (type) {
        if (this.riqi) {
          this.searchForm.createTimeStart = this.riqi[0];
          this.searchForm.createTimeEnd = this.riqi[1];
        } else {
          this.searchForm.createTimeStart = "";
          this.searchForm.createTimeEnd = "";
        }
        for (let i in this.searchForm) {
          if (this.searchForm[i]) {
            serarchObj[i] = this.searchForm[i];
          }
        }
      } else {
        // 重置
        this.searchForm = {
          name: "", // 产品关键字
          createTimeStart: "", // 创建时间（开始）
          createTimeEnd: "" // 创建时间（结束）
        };
        this.tableInputData.pageSize = 10; // 分页相关
        this.tableInputData.pageNum = 1;
      }
      serarchObj.pageNum = this.tableInputData.pageNum;
      serarchObj.pageSize = this.tableInputData.pageSize;
      this.getUserData(serarchObj);
    },
    // 新增纯债基金 pure_debt_fund
    addNew() {
      this.$router.push({
        name: "fund_company_step1"
      });
    },
    // 用户权限判定，之后表格右侧会有不同的操作按钮
    canDoWhat() {
      // let quanxian = JSON.parse(sessionStorage.getItem("buttenpremissions"));
      // if (sys_user_upd) {
      //   this.tableInputData.data.quanxian.push("sys_user_upd");
      //   this.tableInputData.data.custom.push({
      //     text: "编辑",
      //     type: "warning",
      //     size: "small",
      //     emit: "edit"
      //   });
      // }
      // this.tableInputData.data.custom.push({
      //   text: "复制",
      //   type: "primary",
      //   size: "mini",
      //   emit: "copy"
      // });
      this.tableInputData.data.custom.push({
        text: "删除",
        type: "danger",
        size: "mini",
        emit: "delete"
      });
    },
    // 获取数据后的处理
    afterGetData(data) {
      this.loadEnd = false;
      new Promise(resolve => {
        this.tableInputData.total = data.total;
        this.tableInputData.pageSize = data.pageSize == 0 ? 10 : data.pageSize;
        this.tableInputData.pageNum = data.pageNum == 0 ? 1 : data.pageNum;
        this.tableInputData.data.list = data.list;
        // // 设置字体点击事件
        this.tableInputData.actions.click = {
          label: "基金公司",
          minWidth: 140,
          from: "name" // 记录这个交互操作的原数据属性
        };
        this.tableInputData.data.title = [
          {
            title: "注册日期",
            key: "registrationDate",
            minWidth: "100"
          },
          {
            title: "旗下基金数",
            key: "fundQuantity",
            minWidth: "100",
            sortable: true
          },
          {
            title: "资产规模(亿元)",
            key: "aum",
            minWidth: "100",
            sortable: true
          },
          {
            title: "创建时间",
            key: "gmtCreated",
            minWidth: "140",
            sortable: true
          }
        ];
        resolve();
      }).then(() => {
        this.loadEnd = true;
      });
    },
    // 获取表格数据
    getUserData(data) {
      this.$api
        .get_jijingongsi({
          vm: this,
          data: data
        })
        .then(res => {
          if (res) {
            this.afterGetData(res.data);
          }
        });
    }
  }
};
</script>
