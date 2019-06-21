<template>
  <div class="withTree">
    <div class="forTree">
      <h3>{{pageName}}</h3>
      <div class="treeTop">
        <span>理财系列</span>
        <el-button
          size='mini'
          @click="toAdd_xilie"
          z
        >新增</el-button>
      </div>
      <div>

        <el-dialog :close-on-click-modal='false'
          :title="addXiLieForm.title"
          :visible.sync="addXiLieForm.toShow"
          width="400px"
          :before-close="toCloseCunkuanDialog"
        >

          <el-form
            :model="addXiLieForm"
            label-width="120px"
            label-suffix=':'
            label-position='right'
          >
            <el-form-item label="* 机构">
              <el-select
                v-model="addXiLieForm.jigou"
                clearable
                placeholder="请选择"
                style="width:calc(100% - 60px);margin-right:3px;"
              >
                <el-option
                  size='mini'
                  v-for="item in organizationList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>

              </el-select>

              <a
                class="isA"
                @click="toJiGou"
              >无机构？</a>

            </el-form-item>

            <el-form-item label="产品系列名称">
              <el-input
                v-model="addXiLieForm.xilie"
                placeholder="请输入产品关键字"
              ></el-input>
            </el-form-item>

          </el-form>

          <div
            slot="footer"
            class="dialog-footer"
          >
            <el-button
              @click="addXiLieSave"
              type="primary"
            >保 存</el-button>
            <el-button @click="toCloseCunkuanDialog">取 消</el-button>
          </div>
        </el-dialog>

      </div>

    </div>

    <div class="forRight">
      <div style="margin-bottom:5px;">
        <el-button
          size="mini"
          type="primary"
          @click="addNew(true)"
        >新增理财产品</el-button>
        <!-- v-if="tableInputData.data.quanxian.includes('sys_user_add')" -->
        <!-- <el-button
          size="mini"
          type="success"
          @click="outPut(true)"
        >导出</el-button>
        <el-button
          size="mini"
          type="warning"
          @click="inPut(true)"
        >导入</el-button> -->
        <el-button
          size="mini"
          type="primary"
          @click="seachClick(true)"
        >查询</el-button>
        <el-button
          size="mini"
          type="info"
          @click="seachClick(false)"
        >重置</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="toDelete('more')"
        >批量删除</el-button>
      </div>
      <el-form
        :inline="true"
        :model="searchForm"
        label-width="80px"
        label-suffix=':'
        label-position='right'
        size='mini'
        ref="searchForm"
      >
        <el-form-item style="margin-bottom:5px;">
          <el-input
            v-model="searchForm.name"
            placeholder="请输入产品名称"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="是否上架"
          style="margin-bottom:5px;"
        >
          <el-select
            v-model="searchForm.shelve"
            clearable
            placeholder="请选择"
          >
            <el-option
              size='mini'
              v-for="item in shelveList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>

        </el-form-item>

        <el-form-item
          label="创建时间"
          style="margin-bottom:5px;"
        >
          <el-date-picker
            v-model="riqi"
            type="daterange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size='mini'
            style="width:100%"
          >
          </el-date-picker>

        </el-form-item>
      </el-form>

      <isTable
        :inputData='tableInputData'
        @tableEmit='tableEmit'
      />
    </div>
    
  </div>
</template>
<script>
import isTable from "../../../../components/isTable/isTable.vue";

export default {
  props: {},
  data() {
    return {
      addXiLieForm: {
        // tree 里面的新增弹框
        jigou: "",
        xilie: "",
        toShow: false,
        title: ""
      },
      menuTree: [], // tree 数据
      deleteData: [], // 储存需要删除的数据
      aloneDeleteData: [], // 储存需要单独删除的数据
      loadEnd: false, // 控制当表格的数据全部获取完才显示表格
      pageName: "", // 当前页面名字
      riqi: [], // 创建时间
      searchForm: {
        name: "", // 产品关键字
        shelve: "", // 是否上架
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
      },
      organizationList: [
        {
          id: 1,
          label: "",
          value: ""
        }
      ],
      shelveList: [
        {
          id: "",
          label: "上架中",
          value: "YES"
        },
        {
          label: "已下架",
          value: "NO"
        }
      ]
    };
  },
  components: {
    isTable
  },
  mounted() {
    this.loadEnd = false;
    this.pageName = sessionStorage.getItem("page"); // 获取页面名称
    // 获取当前页面使用的字典数据
    this.dictData = JSON.parse(sessionStorage.getItem("dict"));
    this.organizationList = this.dictData.jigou.map(v => {
      return { id: v.id, label: v.name, value: v.name };
    });
    this.canDoWhat();
    this.getUserData();
    this.treeData();
  },
  methods: {
    test() {
      console.log(this.searchForm);
    },
    // 获取tree数据
    treeData() {
      this.$api.get_treeData({ vm: this }).then(res => {
        
      });
    },
    // 监听表格的操作
    tableEmit(data) {
      switch (data.type) {
        case "regetData": // 分页的emit
          this.getUserData();
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
            name: "pure_debt_fund_info",
            query: {
              id: data.data.id,
              institutionName: data.data.institutionName
            }
          });
          break;
      }
    },
    // 表单左侧 tree 里的新增按钮
    toAdd_xilie() {
      if (this.pageName === "manage_money_matters") {
        this.addXiLieForm.title = "新增理财系列";
      } else {
        this.addXiLieForm.title = "新增存款系列";
      }
      this.addXiLieForm.toShow = true;
    },
    // tree 被点击时触发，获得相应的数据
    handleNodeClick_tree(data) {
      this.buttonType = false;
      this.seeMenuInfo({
        vm: this,
        id: data.id
      }).then(res => {
        console.log(res);
      });
    },
    // tree 里的新增弹框保存
    addXiLieSave() {
      if (this.addXiLieForm.jigou != "") {
        let institutionId;
        this.dictData.jigou.forEach(v => {
          if (this.addXiLieForm.jigou == v.name) {
            institutionId = v.id;
          }
        });
        let obj = {
          // 最终返回的数据
          institutionId: institutionId,
          institutionName: this.addXiLieForm.jigou,
          name: this.addXiLieForm.xilie,
          type: "wmp"
        };
        this.$api
          .add_productSeries({
            vm: this,
            data: obj
          })
          .then(res => {
            this.toCloseCunkuanDialog();
            this.treeData();
          });
      } else {
        this.$message.error("请填写必填数据！");
      }
    },
    // 关闭tree里 点击新增按钮的弹框
    toCloseCunkuanDialog() {
      this.cunkuanDialog = false;
      this.addXiLieForm = {
        jigou: "",
        xilie: "",
        toShow: false,
        title: ""
      };
      //
    },
    // 表格里的switch事件
    switchAction(data) {
      this.$api
        .product_chunzhai_UpDown({
          vm: this,
          data: {
            id: data.id,
            status: data.switch ? "YES" : "NO"
          }
        })
        .then(res => {
          this.getUserData();
        });
    },
    // 删除、批量删除
    toDelete(type) {
      if (type === "alone") {
        this.$confirm("确认删除吗？")
          .then(() => {
            this.$api
              .product_chunzhai_delete({
                vm: this,
                data: this.aloneDeleteData[0]
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
      if (type == "more") {
        if (this.deleteData.length == 0) {
          this.$message.warning("请选择要删除的！");
        } else {
          this.$confirm("确认删除吗？")
            .then(() => {
              let promiseArr = [];
              let tableData = this.tableInputData.data.list; // 获取表格的数据
              this.deleteData.forEach(item => {
                let del = this.$api
                  .product_chunzhai_delete({
                    vm: this,
                    data: item
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
                        data: tableData.filter(tar => tar.id == item)
                      };
                    }
                    return obj;
                  });
                promiseArr.push(del);
              });

              Promise.all(promiseArr).then(arr => {
                this.deleteData = [];
                // 拼接删除结果
                let numSucces = 0;
                let numFail = 0;
                let failName = "";
                let titleText = `失败的数据为：\n `;
                arr.forEach(item => {
                  if (item.ok) {
                    numSucces++;
                  } else {
                    numFail++;
                    failName += `名称：${item.data[0].institutionName} \n`;
                  }
                });
                let str = `共操作 ${
                  arr.length
                } 条数据，成功 ${numSucces} 个，失败 ${numFail} 个 \n`;

                if (numFail > 0) {
                  str += titleText + failName;
                }
                this.$alert(str, "操作结果提示", {
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
      if (this.riqi.length > 0) {
        this.searchForm.createTimeStart = this.riqi[0];
        this.searchForm.createTimeEnd = this.riqi[1];
      }
      if (type) {
        // 查询用户
        this.$api
          .admin_user_searchUser({
            vm: this,
            data: searchText
          })
          .then(res => {
            if (res) {
              this.afterGetData(res.data);
            }
          });
      } else {
        // 重置
        this.searchForm = {
          name: "", // 产品关键字
          institutionId: "", // 机构ID
          fundHouseId: "", // 基金公司ID
          status: "", // 交易状态
          shelve: "", // 是否上架
          createTimeStart: "", // 创建时间（开始）
          createTimeEnd: "" // 创建时间（结束）
        };
        this.tableInputData.pageSize = 10; // 分页相关
        this.tableInputData.pageNum = 1;
        this.getUserData();
      }
    },
    // 新增货币基金 manage_money_matters
    addNew(type) {
      this.$router.push({
        name: "manage_money_matters_step1"
        // query: { id: id }
      });
    },
    // 导出
    outPut() {},
    // 导入
    inPut() {},
    // 用户权限判定
    canDoWhat() {
      let quanxian = JSON.parse(localStorage.getItem("buttenpremissions"));
      // if (sys_user_upd) {
      //   this.tableInputData.data.quanxian.push("sys_user_upd");
      //   this.tableInputData.data.custom.push({
      //     text: "编辑",
      //     type: "warning",
      //     size: "small",
      //     emit: "edit"
      //   });
      // }
      this.tableInputData.data.custom.push({
        text: "复制",
        type: "primary",
        size: "mini",
        emit: "copy"
      });
      this.tableInputData.data.custom.push({
        text: "删除",
        type: "danger",
        size: "mini",
        emit: "delete"
      });
    },
    // 获取数据后的处理
    afterGetData(data) {
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
            if (str === "shelve") {
              delete obj[str];
              switch (item[str]) {
                case "YES":
                  obj["switch"] = true;
                  obj["action"] = "上架中";
                  break;
                case "NO":
                  obj["switch"] = false;
                  obj["action"] = "已下架";
                  break;
              }
            }
          });
          return obj;
        });
        // 设置需要的额外设置字体颜色的
        this.tableInputData.actions.setColor = {
          label: "上架状态",
          minWidth: 70,
          from: "action",
          with: "switch"
        };
        // 设置需要的额外switch事件
        this.tableInputData.actions.switch = {
          label: "上架/下架",
          minWidth: 80,
          from: "shelve" // 记录这个交互操作的原数据属性
        };
        // // 设置字体点击事件
        this.tableInputData.actions.click = {
          label: "产品名称",
          minWidth: 180,
          from: "name" // 记录这个交互操作的原数据属性
        };
        this.tableInputData.data.title = [
          {
            title: "机构名称",
            key: "institutionName",
            minWidth: "180"
          },
          {
            title: "系列名称",
            key: "seriesName",
            minWidth: "100"
          },
          {
            title: "预期年化收益率",
            key: "expectAnnualisedReturn",
            minWidth: "130",
            sortable: true
          },
          {
            title: "风险等级",
            key: "riskLevelLabel",
            minWidth: "130"
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
    getUserData() {
      this.$api
        .get_licaiList({
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
    },
    toJiGou() {
      sessionStorage.setItem("page", "机构管理");
      this.$router.push({
        name: "organizational_step1"
      });
    }
  }
};
</script>
