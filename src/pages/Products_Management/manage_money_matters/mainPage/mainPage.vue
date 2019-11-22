<template>
  <div class="withTree">
    <div class="forTree">
      <div class="treeTop">
        <span>理财系列</span>
        <el-button size="mini" @click="toAdd_xilie">新增</el-button>
      </div>
      <div class="forT">
        <p class="allPro" @click="getList('all',null)">全部理财产品</p>
        <ul>
          <li v-for="item of menuTree" :key="item.institutionId">
            <p @click="treeShow(item.institutionId);getList('none',item)" class="forTtitle">
              <i
                v-show="isShow(item.institutionId)"
                style="color:skyblue"
                :class="`myIcon12px icon-xiasanjiaoxiangxiamianxing`"
              ></i>
              <i
                v-show="!isShow(item.institutionId)"
                style="color:skyblue"
                :class="`myIcon12px icon-yousanjiaoxiangyoumianxing`"
              ></i>
              {{item.institutionName}}
            </p>
            <ul ref="forUl" class="forTList" v-show="isShow(item.institutionId)">
              <li>
                <p @click="useIt(item,$event);getList('none',item)" style="width:100%;">无系列</p>
              </li>
              <li v-for="child of item.seriesList" :key="child.name">
                <p
                  @click="useIt(child,$event);getList('child',child)"
                  style="width:100%;"
                >{{child.name}}</p>

                <el-dropdown size="mini" @command="handleCommand(child,$event)">
                  <span class="el-dropdown-link hoverI">
                    <i class="el-icon-edit el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="edit">编辑</el-dropdown-item>
                    <el-dropdown-item command="delete">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </li>
            </ul>
          </li>
        </ul>
        <el-dialog
          :close-on-click-modal="false"
          :title="addXiLieForm.title"
          :visible.sync="addXiLieForm.toShow"
          width="400px"
          :before-close="toCloseCunkuanDialog"
        >
          <el-form
            :model="addXiLieForm"
            label-width="110px"
            label-suffix=":"
            label-position="right"
          >
            <el-form-item label="* 机构">
              <el-select
                filterable
                :disabled="addXiLieForm.type=='edit'"
                v-model="addXiLieForm.jigou"
                clearable
                placeholder="请选择"
                style="width:calc(100% - 40px);margin-right:3px;"
              >
                <el-option
                  size="mini"
                  v-for="item in dictData.jigou"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>

              <a class="isAClick" @click="toJiGou">无机构？</a>
            </el-form-item>

            <el-form-item label="* 产品系列名称">
              <el-input v-model="addXiLieForm.xilie" placeholder="请输入产品关键字"></el-input>
            </el-form-item>
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="addXiLieSave" type="primary">保 存</el-button>
            <el-button @click="toCloseCunkuanDialog">取 消</el-button>
          </div>
        </el-dialog>
      </div>
    </div>

    <div class="forRight">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
      <div style="margin-bottom:5px;">
        <el-button size="mini" type="primary" @click="addNew()">新增产品</el-button>
        <el-button size="mini" type="warning" @click="seachClick('search')">查询</el-button>
        <el-button size="mini" type="info" @click="seachClick('reset')">重置</el-button>
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
          <el-input v-model="searchForm.name" placeholder="请输入产品名称"></el-input>
        </el-form-item>

        <el-form-item label="机构" style="margin-bottom:5px;">
          <el-select filterable v-model="searchForm.institutionId" clearable placeholder="请选择">
            <el-option
              size="mini"
              v-for="item in dictData.jigou"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否上架" style="margin-bottom:5px;">
          <el-select
            filterable
            class="isInput"
            clearable
            placeholder="请选择"
            v-model="searchForm.shelveStatus"
          >
            <el-option
              size="mini"
              v-for="item in dictData.shelve_status"
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
            value-format="yyyy-MM-dd"
            style="width:100%"
          ></el-date-picker>
        </el-form-item>
      </el-form>

      <el-dialog
        :close-on-click-modal="false"
        title="选择产品类别"
        :visible.sync="licaiDialog"
        width="300px"
        :before-close="toCloseCunkuanDialog"
      >
        <div class="addCunkuan">
          <el-button type="primary" @click="toAdd_LiCai('理财')">理财产品</el-button>
          <el-button type="primary" @click="toAdd_LiCai('保险')">保险产品</el-button>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="toCloseCunkuanDialog">取 消</el-button>
        </div>
      </el-dialog>
      <div id="forTable" v-if="loadEnd">
        <isTable :inputData="tableInputData" @tableEmit="tableEmit" />
      </div>
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
      licaiDialog: false, // 控制新建理财弹框的显示隐藏
      addXiLieForm: {
        // tree 里面的新增弹框
        jigou: "",
        xilie: "",
        toShow: false,
        title: ""
      },
      menuTree: [], // tree 数据
      showArr: [], // 用来展开、收拢tree
      deleteType: "", // 存储要删除的产品的类型
      deleteData: [], // 储存需要删除的数据
      aloneDeleteData: [], // 储存需要单独删除的数据
      loadEnd: false, // 控制当表格的数据全部获取完才显示表格
      pageName: "", // 当前页面名字
      riqi: [], // 创建时间
      // 搜索表单
      searchForm: {
        seriesId: "",

        name: "", // 产品关键字
        institutionId: "", // 机构ID
        shelveStatus: "", // 是否上架
        createTimeStart: "", // 创建时间（开始）
        createTimeEnd: "" // 创建时间（结束）
      },
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
    let kk = this.$route.query.institutionId;
    if (kk) {
      this.toAdd_xilie(+kk);
    }
    this.pageName = sessionStorage.getItem("page"); // 获取页面名称
    // 获取当前页面使用的字典数据
    this.dictData = JSON.parse(sessionStorage.getItem("dict"));
    this.organizationList = this.dictData.jigou.map(v => {
      return { id: v.id, label: v.name, value: v.name };
    });
    this.canDoWhat();
    this.seachClick("reset");
    this.treeData(true);

    sessionStorage.removeItem("select_xilie");
    // 清空新增理财时用到的
    sessionStorage.removeItem("licai_step1");
    sessionStorage.removeItem("licai_step2");
    // 清空新增保险时用到的
    sessionStorage.removeItem("baoxian_step1");
    sessionStorage.removeItem("baoxian_step2");
  },
  methods: {
    // 获取tree数据,type=true时，为页面初始化
    treeData(type) {
      let xilie = sessionStorage.getItem("xilie_licai");

      if (!type || !xilie) {
        gettree(this);
      } else {
        this.menuTree = JSON.parse(xilie);
      }
      function gettree(t) {
        t.$api.get_licaiTree({ vm: t, type: "wmp" }).then(res => {
          if (res) {
            t.menuTree = res.data;
            sessionStorage.setItem("xilie_licai", JSON.stringify(t.menuTree));
          }
        });
      }
    },
    // tree 的编辑、删除
    handleCommand(data, type) {
      if (type === "edit") {
        this.addXiLieForm.title = "编辑存款系列";
        this.addXiLieForm.toShow = true;
        this.addXiLieForm.jigou = data.institutionId; // 机构id
        this.addXiLieForm.xilie = data.name; // 系列名
        this.addXiLieForm.target = data; // 原来的系列数据
        this.addXiLieForm.type = "edit";
      }
      if (type === "delete") {
        // 删除
        this.$confirm("确认删除吗?")
          .then(() => {
            this.$api
              .check_type({
                vm: this,
                id: data.id,
                type: 3
              })
              .then(res => {
                if (res) {
                  this.$api
                    .left_xilie_delete({
                      vm: this,
                      id: data.id
                    })
                    .then(res => {
                      if (res) {
                        this.$message.success("删除成功！");
                        this.treeData(false);
                      }
                    });
                }
              });
          })
          .catch(() => {});
      }
    },
    // 选择产品系列
    useIt(data, e) {
      let arr = Array.from(this.$refs.forUl);
      arr.forEach(item => {
        Array.from(item.children).forEach(
          child => (child.style = "background:none")
        );
      });
      if (e) {
        e.target.parentNode.style = "background:skyblue;color:#fff;";
      }
      sessionStorage.setItem("select_xilie", JSON.stringify(data)); // 保存系列数据
    },
    // tree 切换展开收拢
    treeShow(id) {
      let isIn = this.showArr.some(item => item === id);
      if (isIn) {
        this.showArr = this.showArr.filter(item => item != id);
      } else {
        this.showArr.push(id);
      }
    },
    // 用来判断tree是否展开
    isShow(id) {
      return this.showArr.some(item => item === id);
    },
    ///////////////////////////////////////////////////////////////////////////////////
    // 监听表格的操作
    tableEmit(data) {
      switch (data.type) {
        case "regetData": // 分页的emit
          this.seachClick("search");
          break;
        case "copy": // 复制按钮
          this.$api
            .getLiCaiInfoData({
              vm: this,
              data: data.data.id
            })
            .then(res => {
              if (res) {
                let step1 = {
                  institutionId: res.data.institutionId, // 机构名称
                  seriesId: res.data.seriesId, // 产品系列ID
                  name: res.data.name, // 产品名称
                  increaseAmount: res.data.increaseAmount, // 递增金额
                  interestRate: res.data.interestRate, // 预期年化收益率
                  riskLevel: res.data.riskLevel, // 风险等级
                  surplusQuota: res.data.surplusQuota, // 剩余额度
                  valueDate: res.data.valueDate, // 起息日
                  timeLimit: res.data.deadline, // 期限
                  managementDate: res.data.managementDate, // 理财日期
                  raiseDate: res.data.raiseDate, // 募集日期
                  description: res.data.description //  产品描述
                };
                let step2 = {
                  sameProductFlag: res.data.appInfo.sameProductFlag, // 同一产品标识
                  flowNum: res.data.appInfo.defaultFlowNum, // 默认关注数量
                  shelveStatus: res.data.appInfo.shelve, // 是否上架
                  visaInterview:
                    res.data.appInfo.visaInterview === "NO" ? "否" : "是", // 是否面签
                  recommend: res.data.appInfo.recommend === "NO" ? "否" : "是", // 是否推荐
                  homePage: res.data.appInfo.homePage === "NO" ? "否" : "是", // 是否首页排行
                  defaultNum: res.data.appInfo.defaultBuyNum, // 默认购买数量
                  defaultAmount: res.data.appInfo.defaultAmount, // 默认购买金额
                  listAreaFlag: res.data.appInfo.listAreaFlag, // 榜单专区标识
                  regulatoryProperty: res.data.regulatoryProperty // 监管属性
                };
                sessionStorage.setItem("licai_step1", JSON.stringify(step1));
                sessionStorage.setItem("licai_step2", JSON.stringify(step2));
                // 获取理财系列数据
                JSON.parse(sessionStorage.getItem("xilie_licai")).filter(
                  item => item.institutionId == res.data.institutionId
                )[0];
                let obj = {
                  institutionId: data.data.institutionId,
                  id: res.data.seriesId ? res.data.seriesId : ""
                };

                sessionStorage.setItem("select_xilie", JSON.stringify(obj));

                this.$router.push({
                  name: "manage_money_matters_step1"
                });
              }
            });

          break;
        case "delete": // 单独删除按钮
          this.aloneDeleteData = [];
          data.data.productSubtype === "wmp"
            ? this.aloneDeleteData.push({ type: "", id: data.data.id })
            : this.aloneDeleteData.push({
                type: "insurance/",
                id: data.data.id
              });
          this.toDelete("alone");
          break;
        case "moreDelete": // 批量删除按钮
          this.deleteData = data.data.map(item => {
            let kk = null;
            item.productSubtype === "wmp"
              ? (kk = { type: "", id: item.id })
              : (kk = { type: "insurance/", id: item.id }); // 保险的删除
            return kk;
          });
          break;
        case "switch": // switch 变换
          this.switchAction(data.data);
          break;
        case "textClick": // 文字点击
          this.$router.push({
            name: "manage_money_matters_info",
            query: {
              id: data.data.id,
              name: data.data.name, // 产品名称
              type: data.data.productSubtype // 产品类型
            }
          });
          break;
      }
    },
    // 表单左侧 tree 里的新增按钮
    toAdd_xilie(id) {
      this.addXiLieForm.title = "新增理财系列";
      this.addXiLieForm.toShow = true;
      this.addXiLieForm.type = "add";
      if (id && typeof id == "number") {
        // 通过点击：无产品系列？跳过来的
        this.addXiLieForm.jigou = id; // 机构id
      }
    },

    // tree 里的新增弹框保存
    addXiLieSave() {
      if (this.addXiLieForm.jigou != "" && this.addXiLieForm.xilie != "") {
        if (this.addXiLieForm.xilie.length < 20) {
          // 获取机构
          let jigou = this.dictData.jigou.filter(
            v => v.id == this.addXiLieForm.jigou
          )[0];
          let obj = {},
            httpType = "";
          if (this.addXiLieForm.type === "add") {
            obj = {
              // 最终返回的数据
              institutionId: this.addXiLieForm.jigou,
              institutionName: jigou.name,
              name: this.addXiLieForm.xilie,
              type: "wmp"
            };
            httpType = "post";
          } else {
            obj = {
              id: this.addXiLieForm.target.id,
              institutionId: this.addXiLieForm.target.institutionId,
              institutionName: this.addXiLieForm.target.institutionName,
              name: this.addXiLieForm.xilie,
              type: "wmp"
            };
            httpType = "put";
          }

          this.$api
            .add_xilie({
              vm: this,
              data: obj,
              httpType: httpType
            })
            .then(res => {
              if (res) {
                this.$message.success(
                  `${httpType === "post" ? "新增" : "修改"}成功！`
                );
                this.toCloseCunkuanDialog();
                this.treeData(false);
              }
            });
        } else {
          this.$message.error("系列名字太长，请输入小于20字符！");
        }
      } else {
        this.$message.error("请填写必填数据！");
      }
    },
    // 关闭tree里 点击新增按钮的弹框
    toCloseCunkuanDialog() {
      this.licaiDialog = false;
      this.cunkuanDialog = false;
      this.addXiLieForm = {
        jigou: "",
        xilie: "",
        toShow: false,
        title: ""
      };
      // 清除路由参数
      if (this.$route.query.institutionId) {
        this.$router.push({
          name: "manage_money_matters_mainPage"
        });
      }
    },
    // 表格里的switch事件
    switchAction(data) {
      this.$api
        .product_chunzhai_UpDown({
          vm: this,
          data: {
            id: data.productId,
            status: data.switch ? "YES" : "NO"
          }
        })
        .then(res => {
          if (res) {
            this.seachClick("search");
          }
        });
    },
    // 删除、批量删除
    toDelete(type) {
      if (type === "alone") {
        this.$confirm("确认删除吗？")
          .then(() => {
            this.$api
              .product_licai_delete({
                vm: this,
                type: this.aloneDeleteData[0].type,
                data: this.aloneDeleteData[0].id
              })
              .then(res => {
                if (res) {
                  this.$message.success("删除成功！");
                  this.seachClick("search");
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
                  .product_licai_delete({
                    vm: this,
                    data: item.id,
                    type: item.type
                  })
                  .then(res => {
                    let obj;
                    if (res) {
                      obj = {
                        ok: true,
                        data: item.id
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
                this.deleteData = [];
                // 拼接删除结果
                let numSucces = 0;
                let numFail = 0;
                let failName = "";
                arr.forEach(item => {
                  if (item.ok) {
                    numSucces++;
                  } else {
                    numFail++;
                    failName += `<li>名称：${item.data[0].name}</li>`;
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
                  confirmButtonText: "确定",
                  dangerouslyUseHTMLString: true,
                  callback: this.seachClick("reset")
                });
              });
            })
            .catch(() => {});
        }
      }
    },
    // 搜索框、重置
    seachClick(type) {
      let obj = {};
      switch (type) {
        case "search":
          if (this.riqi) {
            this.searchForm.createTimeStart = this.riqi[0];
            this.searchForm.createTimeEnd = this.riqi[1];
          } else {
            this.searchForm.createTimeStart = "";
            this.searchForm.createTimeEnd = "";
          }
          Object.keys(this.searchForm).forEach(str => {
            if (this.searchForm[str]) {
              obj[str] = this.searchForm[str];
            }
          });
          break;
        case "reset":
          // 重置
          this.riqi = []; // 创建时间
          // 搜索表单
          this.searchForm = {
            seriesId: "",
            name: "", // 产品关键字
            institutionId: "", // 机构ID
            shelveStatus: "", // 是否上架
            createTimeStart: "", // 创建时间（开始）
            createTimeEnd: "" // 创建时间（结束）
          };
          this.tableInputData.pageSize = 10; // 分页相关
          this.tableInputData.pageNum = 1;
          break;
      }
      if (this.riqi.length > 0) {
        this.searchForm.createTimeStart = this.riqi[0];
        this.searchForm.createTimeEnd = this.riqi[1];
      }
      obj.pageSize = this.tableInputData.pageSize;
      obj.pageNum = this.tableInputData.pageNum;
      this.getUserData(obj);
    },
    // 新增理财、保险
    addNew() {
      let kk = sessionStorage.getItem("select_xilie");
      if (kk) {
        this.licaiDialog = true;
      } else {
        this.$message.error("请在左侧选择产品系列！");
      }
    },
    toAdd_LiCai(type) {
      let routeUrl = "";
      switch (type) {
        case "理财":
          routeUrl = "manage_money_matters_step1";
          break;
        case "保险": // add_dingqi
          routeUrl = "baoxian_step1";
          break;
      }
      this.$router.push({
        name: routeUrl
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
    shelveStatus(data) {
      this.loadEnd = false;
      new Promise(resolve => {
        this.tableInputData.total = data.total;
        this.tableInputData.pageSize = data.pageSize == 0 ? 10 : data.pageSize;
        this.tableInputData.pageNum = data.pageNum == 0 ? 1 : data.pageNum;
        this.tableInputData.data.list = data.list.map(item => {
          let arr = Object.keys(item);
          arr.forEach(str => {
            if (str === "interestRate") {
              if (+item[str] > 0) {
                item[str] = `+${(+item[str]).toFixed(4)}%`;
              } else {
                item[str] = `${(+item[str]).toFixed(4)}%`;
              }
            }
          });
          return item;
        });

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
            key: "interestRate",
            minWidth: "150",
            sortable: true
          },
          {
            title: "风险等级",
            key: "riskLevelLabel",
            minWidth: "130"
          },
          {
            title: "上架状态",
            key: "shelveStatusLabel",
            minWidth: "80"
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
    // tree被点击时执行
    getList(type, item) {
      let obj = {};
      switch (type) {
        case "none":
          obj = {
            pageSize: 10,
            pageNum: 1,
            institutionId: item.institutionId
          };
          break;
        case "child":
          obj = {
            pageSize: 10,
            pageNum: 1,
            seriesId: item.id,
            institutionId: item.institutionId
          };
          break;
        case "all":
          obj = {
            pageSize: 10,
            pageNum: 1
          };
          break;
      }
      this.getUserData(obj);
    },
    // 获取表格数据
    getUserData(obj) {
      this.$api
        .get_licaiList({
          vm: this,
          data: obj
        })
        .then(res => {
          if (res) {
            this.shelveStatus(res.data);
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
