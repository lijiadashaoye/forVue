<template>
  <div class="componentWaper">
    <div id='forHeader'>
      <h3>{{pageName}}</h3>

      <div style="margin-bottom:5px;">
        <el-button
          size="mini"
          type="primary"
          @click="addNew(true)"
        >新增基金公司</el-button>
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
            placeholder="请输入机构关键字"
          ></el-input>
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
    </div>
    <div
      id='forTable'
      v-if="loadEnd"
    >
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
      deleteData: [], // 储存需要删除的数据
      aloneDeleteData: [], // 储存需要单独删除的数据
      loadEnd: false, // 控制当表格的数据全部获取完才显示表格
      pageName: "", // 当前页面名字
      riqi: [], // 创建时间
      searchForm: {
        name: "", // 产品关键字
        status: "", // 交易状态
        institutionId: "", // 机构ID
        fundHouseId: "", // 基金公司ID
        status: "", // 交易状态
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
      shelveList: [
        {
          label: "上架中",
          value: "YES"
        },
        {
          label: "已下架",
          value: "NO"
        }
      ],
      options: [
        // 所属省市级联数据
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致"
                },
                {
                  value: "fankui",
                  label: "反馈"
                },
                {
                  value: "xiaolv",
                  label: "效率"
                },
                {
                  value: "kekong",
                  label: "可控"
                }
              ]
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航"
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航"
                }
              ]
            }
          ]
        },
        {
          value: "zujian",
          label: "组件",
          children: [
            {
              value: "basic",
              label: "Basic",
              children: [
                {
                  value: "layout",
                  label: "Layout 布局"
                },
                {
                  value: "color",
                  label: "Color 色彩"
                },
                {
                  value: "typography",
                  label: "Typography 字体"
                },
                {
                  value: "icon",
                  label: "Icon 图标"
                },
                {
                  value: "button",
                  label: "Button 按钮"
                }
              ]
            },
            {
              value: "form",
              label: "Form",
              children: [
                {
                  value: "radio",
                  label: "Radio 单选框"
                },
                {
                  value: "checkbox",
                  label: "Checkbox 多选框"
                },
                {
                  value: "input",
                  label: "Input 输入框"
                },
                {
                  value: "input-number",
                  label: "InputNumber 计数器"
                },
                {
                  value: "select",
                  label: "Select 选择器"
                },
                {
                  value: "cascader",
                  label: "Cascader 级联选择器"
                },
                {
                  value: "switch",
                  label: "Switch 开关"
                },
                {
                  value: "slider",
                  label: "Slider 滑块"
                },
                {
                  value: "time-picker",
                  label: "TimePicker 时间选择器"
                },
                {
                  value: "date-picker",
                  label: "DatePicker 日期选择器"
                },
                {
                  value: "datetime-picker",
                  label: "DateTimePicker 日期时间选择器"
                },
                {
                  value: "upload",
                  label: "Upload 上传"
                },
                {
                  value: "rate",
                  label: "Rate 评分"
                },
                {
                  value: "form",
                  label: "Form 表单"
                }
              ]
            },
            {
              value: "data",
              label: "Data",
              children: [
                {
                  value: "table",
                  label: "Table 表格"
                },
                {
                  value: "tag",
                  label: "Tag 标签"
                },
                {
                  value: "progress",
                  label: "Progress 进度条"
                },
                {
                  value: "tree",
                  label: "Tree 树形控件"
                },
                {
                  value: "pagination",
                  label: "Pagination 分页"
                },
                {
                  value: "badge",
                  label: "Badge 标记"
                }
              ]
            },
            {
              value: "notice",
              label: "Notice",
              children: [
                {
                  value: "alert",
                  label: "Alert 警告"
                },
                {
                  value: "loading",
                  label: "Loading 加载"
                },
                {
                  value: "message",
                  label: "Message 消息提示"
                },
                {
                  value: "message-box",
                  label: "MessageBox 弹框"
                },
                {
                  value: "notification",
                  label: "Notification 通知"
                }
              ]
            },
            {
              value: "navigation",
              label: "Navigation",
              children: [
                {
                  value: "menu",
                  label: "NavMenu 导航菜单"
                },
                {
                  value: "tabs",
                  label: "Tabs 标签页"
                },
                {
                  value: "breadcrumb",
                  label: "Breadcrumb 面包屑"
                },
                {
                  value: "dropdown",
                  label: "Dropdown 下拉菜单"
                },
                {
                  value: "steps",
                  label: "Steps 步骤条"
                }
              ]
            },
            {
              value: "others",
              label: "Others",
              children: [
                {
                  value: "dialog",
                  label: "Dialog 对话框"
                },
                {
                  value: "tooltip",
                  label: "Tooltip 文字提示"
                },
                {
                  value: "popover",
                  label: "Popover 弹出框"
                },
                {
                  value: "card",
                  label: "Card 卡片"
                },
                {
                  value: "carousel",
                  label: "Carousel 走马灯"
                },
                {
                  value: "collapse",
                  label: "Collapse 折叠面板"
                }
              ]
            }
          ]
        },
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components"
            },
            {
              value: "sketch",
              label: "Sketch Templates"
            },
            {
              value: "jiaohu",
              label: "组件交互文档"
            }
          ]
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
    this.canDoWhat();
    this.getUserData();
  },
  methods: {
    test() {
      if (this.riqi.length > 0) {
        this.searchForm.createTimeStart = this.riqi[0];
        this.searchForm.createTimeEnd = this.riqi[1];
      }
      // console.log(this.searchForm);
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
      if (type) {
        if (this.riqi.length > 0) {
          this.searchForm.createTimeStart = this.riqi[0];
          this.searchForm.createTimeEnd = this.riqi[1];
        }
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
          suoshushengshi: [], // 所属省市
          name: "", // 产品关键字
          status: "", // 交易状态
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
    // 新增纯债基金 pure_debt_fund
    addNew() {
      this.$router.push({
        name: "fund_company_step1"
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
          label: "机构名称",
          minWidth: 180,
          from: "institutionName" // 记录这个交互操作的原数据属性
        };
        this.tableInputData.data.title = [
          {
            title: "代码",
            key: "code",
            minWidth: "80"
          },
          {
            title: "交易状态",
            key: "statusName",
            minWidth: "100"
          },
          {
            title: "基金公司名称",
            key: "fundHouseName",
            minWidth: "180"
          },
          {
            title: "产品名称",
            key: "name",
            minWidth: "120"
          },

          {
            title: "日涨幅%",
            key: "dailyIncrease",
            minWidth: "100",
            sortable: true
          },
          {
            title: "单位净值",
            key: "netAssetValue",
            minWidth: "100",
            sortable: true
          },
          {
            title: "累计净值",
            key: "netAccumulateValue",
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
    getUserData() {
      this.$api
        .get_chunzhaiList({
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
