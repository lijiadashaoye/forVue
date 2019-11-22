<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>

      <div style="margin-bottom:5px;">
        <el-button size="mini" type="primary" @click="addNew(true)">新增机构</el-button>
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
          <el-input v-model="searchForm.name" placeholder="请输入机构名称"></el-input>
        </el-form-item>

        <el-form-item label="所属省市" v-if="dictData.quyu">
          <el-cascader
            v-model="location"
            :options="dictData.quyu"
            :props="{ expandTrigger: 'hover'}"
          ></el-cascader>
        </el-form-item>

        <el-form-item label="机构类型" style="margin-bottom:5px;">
          <el-select filterable v-model="searchForm.subType" clearable placeholder="请选择">
            <el-option
              size="mini"
              v-for="item in dictData.bank_type "
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="银行星级" style="margin-bottom:5px;">
          <el-select filterable v-model="searchForm.star" clearable placeholder="请选择">
            <el-option
              size="mini"
              v-for="item in dictData.institution_star"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否签约" style="margin-bottom:5px;">
          <el-select filterable v-model="searchForm.signedUp" clearable placeholder="请选择">
            <el-option
              size="mini"
              v-for="item in dictData.qianyueList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="创建时间" style="margin-bottom:5px;">
          <el-date-picker
            v-model="riqi"
            type="daterange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
            style="width:100%"
            value-format="yyyy-MM-dd"
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
      location: [], // 所属区域
      searchForm: {
        name: "", // 机构名称
        locationId: "", // 所属地/直辖市ID
        subType: "", // 机构ID
        star: "", // 星级
        signedUp: "", // 是否签约
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
    // 获取当前页面使用的字典数据
    this.dictData = JSON.parse(sessionStorage.getItem("dict"));
    this.canDoWhat();
    this.getUserData();
    sessionStorage.removeItem("organizational_step1");
    sessionStorage.removeItem("organizational_step2");
    sessionStorage.removeItem("organizational_http");
    sessionStorage.removeItem("jigou_edit");
  },
  methods: {
    // 监听表格的操作
    tableEmit(data) {
      switch (data.type) {
        case "regetData": // 分页的emit
          this.seachClick(true);
          break;
        case "copy": // 复制按钮
          sessionStorage.setItem("copy", JSON.stringify(data.data));
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
        case "switch": // switch 变换
          this.switchAction(data.data);
          break;
        case "textClick": // 文字点击
          this.$router.push({
            name: "organizational_info",
            query: {
              id: data.data.id,
              institutionName: data.data.name
            }
          });
          break;
      }
    },
    // 表格里的switch事件
    switchAction(data) {
      this.$api
        .product_jigou_qianyue({
          vm: this,
          data: {
            id: data.uuid,
            status: data.switch ? "YES" : "NO" // NO 为从已签约变成解约
          }
        })
        .then(res => {
          setTimeout(this.getUserData, 500);
        });
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
                type: 1
              })
              .then(res => {
                if (res) {
                  this.$api
                    .product_jigou_delete({
                      vm: this,
                      data: this.aloneDeleteData[0]
                    })
                    .then(res => {
                      if (res) {
                        this.$message.success("删除成功！");
                        this.getUserData();
                        // 更新字典
                        this.$store.dispatch("get_dict", this).then(res => {
                          sessionStorage.setItem("dict", JSON.stringify(res));
                        });
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
                          type: 1
                        })
                        .then(async res => {
                          if (res) {
                            sussce.push(item);
                            await this.$api.product_jigou_delete({
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
                let str = `<p  style="font-weight:bold">共操作 ${this.deleteData.length} 条数据，成功 ${sussce.length} 个，失败 ${fails.length} 个</p>`;
                if (sussce.length) {
                  str += `<p  style="font-weight:bold">可以成功删除的数据为：</p>
                      <ul class="alertUl">
                        ${successName}
                      </ul>`;
                }
                if (fails.length) {
                  str += `<p  style="font-weight:bold">不能删除的数据为：</p>
                      <ul class="alertUl">
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
      if (type) {
        if (this.riqi) {
          this.searchForm.createTimeStart = this.riqi[0];
          this.searchForm.createTimeEnd = this.riqi[1];
        } else {
          this.searchForm.createTimeStart = "";
          this.searchForm.createTimeEnd = "";
        }
        if (this.location.length > 0) {
          this.searchForm.locationId = this.location[this.location.length - 1];
        }
        let arr = Object.keys(this.searchForm),
          obj = {
            pageSize: this.tableInputData.pageSize,
            pageNum: this.tableInputData.pageNum
          };
        arr.forEach(tar => {
          if (this.searchForm[tar]) {
            obj[tar] = this.searchForm[tar];
          }
        });

        // 查询机构
        this.$api
          .get_jigouList({
            vm: this,
            data: obj
          })
          .then(res => {
            if (res) {
              this.afterGetData(res.data);
            }
          });
      } else {
        // 重置
        this.riqi = []; // 创建时间
        this.location = []; // 所属区域
        this.searchForm = {
          name: "", // 机构名称
          locationId: "", // 所属地/直辖市ID
          subType: "", // 机构ID
          star: "", // 星级
          signedUp: "", // 是否签约
          createTimeStart: "", // 创建时间（开始）
          createTimeEnd: "" // 创建时间（结束）
        };
        this.tableInputData.pageSize = 10; // 分页相关
        this.tableInputData.pageNum = 1;
        this.getUserData();
      }
    },
    // 新增纯债基金 pure_debt_fund
    addNew() {
      this.$router.push({
        name: "organizational_step1"
        // query: { id: id }
      });
    },
    // 导出
    outPut() {},
    // 导入
    inPut() {},
    // 用户权限判定，之后表格右侧会有不同的操作按钮
    canDoWhat() {
      // let quanxian = JSON.parse(sessionStorage.getItem("buttenpremissions"));
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
      // console.log(data.list)
      new Promise(resolve => {
        this.tableInputData.total = data.total;
        this.tableInputData.pageSize = data.pageSize == 0 ? 10 : data.pageSize;
        this.tableInputData.pageNum = data.pageNum == 0 ? 1 : data.pageNum;
        this.tableInputData.data.list = data.list.map(item => {
          let obj = {},
            arr = Object.keys(item);
          arr.forEach(str => {
            obj[str] = item[str];
            // 将 shelfStatus 属性换成 action 属性
            if (str === "signedUp") {
              delete obj[str];
              switch (item[str]) {
                case "YES":
                  obj["switch"] = true;
                  obj["action"] = "已签约";
                  break;
                case "NO":
                  obj["switch"] = false;
                  obj["action"] = "未签约";
                  break;
              }
            }
          });
          return obj;
        });
        // 设置需要的额外设置字体颜色的
        this.tableInputData.actions.setColor = {
          label: "签约状态",
          minWidth: 70,
          from: "action",
          with: "switch"
        };
        // 设置需要的额外switch事件
        this.tableInputData.actions.switch = {
          label: "签约/解约",
          minWidth: 80,
          from: "signedUp" // 记录这个交互操作的原数据属性
        };
        // // 设置字体点击事件
        this.tableInputData.actions.click = {
          label: "机构名称",
          minWidth: 180,
          from: "name" // 记录这个交互操作的原数据属性
        };

        this.tableInputData.data.title = [
          {
            title: "所属省/直辖市",
            key: "locationName",
            minWidth: "140"
          },
          {
            title: "银行星级",
            key: "starLabel",
            minWidth: "100",
            sortable: true
          },
          {
            title: "机构类型",
            key: "subTypeLabel",
            minWidth: "160"
          },
          {
            title: "产品数量(个)",
            key: "productQuantity",
            minWidth: "120",
            sortable: true
          },
          {
            title: "创建时间",
            key: "gmtCreated",
            minWidth: "160",
            sortable: true
          }
        ];
        resolve();
      }).then(() => {
        this.loadEnd = true;
      });
    },
    // 获取表格数据
    getUserData() {
      this.$api
        .get_jigouList({
          vm: this,
          data: {
            pageSize: this.tableInputData.pageSize,
            pageNum: this.tableInputData.pageNum
          }
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
