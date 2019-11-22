<template>
  <div class="withTree">
    <div class="forTree">
      <div class="treeTop">
        <span>投融资系列</span>
        <el-button size="mini" @click="toAdd_xilie">新增</el-button>
      </div>
      <div class="forT">
        <p class="allPro" @click="getList('all',null)">全部投融资产品</p>
        <ul>
          <li v-for="item of menuTree" :key="item.institutionId">
            <div @click="treeShow(item.institutionId);getList('none',item)" class="forTtitle">
              <p>
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
              </p>
              <p>{{item.institutionName}}</p>
            </div>
            <ul ref="forUl" class="forTList" v-show="isShow(item.institutionId)">
              <li>
                <p @click="useIt(item,$event);getList('none',item)" style="width:100%;">无系列</p>
              </li>
              <li v-for="child of item.seriesList" :key="child.id">
                <p
                  @click="useIt(child,$event);getList('child',child)"
                  style="width:100%;"
                >{{child.name}}</p>

                <el-dropdown size="mini" @command="handleCommand(child,$event)">
                  <span class="el-dropdown-link">
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
          width="450px"
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
        <el-button size="mini" type="primary" @click="addNew(true)">创建产品</el-button>
        <el-button size="mini" type="warning" @click="seachClick('search')">查询</el-button>
        <el-button size="mini" type="info" @click="seachClick('reset')">重置</el-button>
        <el-button size="mini" type="danger" @click="toDelete('more')">批量删除</el-button>
      </div>
      <el-form
        :inline="true"
        :model="searchForm"
        label-width="100px"
        label-suffix=":"
        label-position="right"
        size="mini"
        ref="searchForm"
      >
        <el-form-item style="margin-bottom:5px;" label="产品名称 ">
          <el-input v-model="searchForm.name" placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="银行名称" style="margin-bottom:5px;">
          <el-select
            filterable
            @change="change_xilie(searchForm.institutionId)"
            v-model="searchForm.institutionId"
            clearable
            placeholder="请选择"
          >
            <el-option
              size="mini"
              v-for="item in xilieData.yinhang "
              :key="item.institutionId"
              :label="item.institutionName"
              :value="item.institutionId"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="产品系列" style="margin-bottom:5px;">
          <el-select filterable v-model="searchForm.seriesId" clearable placeholder="请选择">
            <el-option
              size="mini"
              v-for="item in xilieData.xilie"
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

        <el-form-item label="银行对接方式" style="margin-bottom:5px;">
          <el-select
            filterable
            class="isInput"
            clearable
            placeholder="请选择"
            v-model="searchForm.connectionMode"
          >
            <el-option
              size="mini"
              v-for="item in dictData.bank_connection_mode"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <isTable v-if="loadEnd" :inputData="tableInputData" @tableEmit="tableEmit" />
      <el-dialog
        :close-on-click-modal="false"
        title="查看详情"
        :visible.sync="seeFinancingDialog.show"
        width="700px"
        :before-close="closeSeeFinancing"
      >
        <h2
          v-if="seeFinancingDialog.data"
          style="text-align:center;color:#188FFF;"
        >{{seeFinancingDialog.data.name}}</h2>
        <table class="financing" v-if="seeFinancingDialog.data">
          <tr>
            <th>首页排行标志</th>
            <td>{{seeFinancingDialog.data.appInfo.homePage==='YES'?'是':'否'}}</td>
          </tr>
          <tr>
            <th>风险等级</th>
            <td>{{seeFinancingDialog.data.riskLevelLabel}}</td>
          </tr>
          <tr>
            <th>面签标志</th>
            <td>{{seeFinancingDialog.data.appInfo.visaInterviewLabel}}</td>
          </tr>
          <tr>
            <th>实名认证标志</th>
            <td>{{seeFinancingDialog.data.appInfo.realNameAuth==='YES'?'是':'否'}}</td>
          </tr>
          <tr>
            <th>是否显示银行页面</th>
            <td>{{seeFinancingDialog.data.appInfo.showBankPage==='YES'?'是':'否'}}</td>
          </tr>
          <tr>
            <th>监管属性</th>
            <td>{{seeFinancingDialog.data.regulatoryPropertyLabel}}</td>
          </tr>
          <tr>
            <th>默认购买笔数</th>
            <td>{{seeFinancingDialog.data.appInfo.defaultBuyNum}}</td>
          </tr>
          <tr>
            <th>默认购买金额</th>
            <td>{{seeFinancingDialog.data.appInfo.defaultAmount}}</td>
          </tr>
          <tr>
            <th>默认关注数量</th>
            <td>{{seeFinancingDialog.data.appInfo.defaultFlowNum}}</td>
          </tr>
          <tr>
            <th>同一产品标识</th>
            <td>{{seeFinancingDialog.data.appInfo.sameProductFlag}}</td>
          </tr>
          <tr>
            <th>是否签约</th>
            <td>{{seeFinancingDialog.data.appInfo.signed}}</td>
          </tr>
          <tr>
            <th>合作方式</th>
            <td>{{seeFinancingDialog.data.appInfo.cooperationModeLabel}}</td>
          </tr>
          <tr>
            <th>年收益率</th>
            <td>{{seeFinancingDialog.data.interestRate?seeFinancingDialog.data.interestRate+'%':''}}</td>
          </tr>
          <tr>
            <th>自动下架</th>
            <td>{{seeFinancingDialog.data.appInfo.autoShelve==='YES'?'是':'否'}}</td>
          </tr>
          <tr>
            <th>银行提示页</th>
            <td>{{seeFinancingDialog.data.appInfo.showBankPage==='YES'?'是':'否'}}</td>
          </tr>
          <tr>
            <th>产品版本标识</th>
            <td>{{seeFinancingDialog.data.contentVersion}}</td>
          </tr>
        </table>

        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="closeSeeFinancing">关 闭</el-button>
        </div>
      </el-dialog>
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
      cunkuanDialog: false, // 控制新建存款弹框的显示隐藏
      addXiLieForm: {
        // tree 里面的新增弹框
        jigou: "",
        xilie: "",
        toShow: false,
        title: "",
        type: ""
      },
      menuTree: [], //  产品系列数据
      showArr: [], // 用来展开、收拢tree
      deleteData: [], // 储存需要删除的数据
      aloneDeleteData: [], // 储存需要单独删除的数据
      loadEnd: false, // 控制当表格的数据全部获取完才显示表格
      pageName: "", // 当前页面名字
      searchForm: {
        name: "", // 产品名称
        institutionId: "", // 银行名称
        seriesId: "", // 银行对应的系列
        shelveStatus: "", // 上下架
        connectionMode: "" // open api
      }, // 搜索表单
      dictData: {}, // 数据字典
      seeFinancingDialog: {
        show: false,
        data: null
      },
      xilieData: {
        // 查询时的系列数据
        yinhang: [],
        xilie: []
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
  mounted() {
    this.loadEnd = false;
    this.env = sessionStorage.getItem("env") === "development";
    // step1里点击'无系列?'
    let kk = this.$route.query.institutionId;
    if (kk) {
      this.toAdd_xilie(+kk);
    }
    this.pageName = sessionStorage.getItem("page"); // 获取页面名称
    // 获取当前页面使用的字典数据
    this.dictData = JSON.parse(sessionStorage.getItem("dict"));

    this.treeData(true);
    sessionStorage.removeItem("financing_step1");
    sessionStorage.removeItem("financing_step2");
    sessionStorage.removeItem("select_xilie");
    sessionStorage.removeItem("financing_http");

    this.canDoWhat();
    this.seachClick("reset");
  },
  methods: {
    // 变更机构后，要对应调整系列
    change_xilie(id) {
      // 根据机构id，获取对应的产品系列
      this.xilieData.xilie = id
        ? this.xilieData.yinhang.filter(item => item.institutionId === id)[0]
            .seriesList
        : [];

      if (!id || typeof this.searchForm.seriesId != "string") {
        this.searchForm.seriesId = "";
      }
    },
    // 获取tree数据,type=true时，为页面初始化
    treeData(type) {
      let xilie = sessionStorage.getItem("xilie_touzi");
      if (!xilie || !type) {
        getTree(this);
      } else {
        this.menuTree = JSON.parse(xilie);
        this.xilieData.yinhang = this.menuTree;
      }
      function getTree(t) {
        t.$api.get_licaiTree({ vm: t, type: "investment" }).then(res => {
          if (res) {
            t.menuTree = res.data;
            sessionStorage.setItem("xilie_touzi", JSON.stringify(t.menuTree));
            t.xilieData.yinhang = t.menuTree;
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
    //////////////////////////////////////////////////////
    // 监听表格的操作
    tableEmit(data) {
      switch (data.type) {
        case "regetData": // 分页的emit
          this.seachClick("search");
          break;
        case "copy": // 复制按钮
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
        case "edit": // 编辑产品
          this.seeFinancing(data.data.id, data.type);
          break;
      }
    },

    // 查看详情
    seeFinancing(id, type) {
      this.$api
        .getFinancing({
          vm: this,
          id: id
        })
        .then(res => {
          if (res) {
            if (type === "textClick") {
              this.seeFinancingDialog.data = res.data;
              this.seeFinancingDialog.show = true;
            } else {
              sessionStorage.setItem(
                "financing_http",
                JSON.stringify(res.data)
              );

              let jigou = this.menuTree.filter(
                tar => tar.institutionId === res.data.institutionId
              )[0];

              if (typeof res.data.seriesId === "number") {
                let xilie = jigou.seriesList.filter(
                  tar => tar.id === res.data.seriesId
                )[0];
                sessionStorage.setItem("select_xilie", JSON.stringify(xilie));
              } else {
                sessionStorage.setItem(
                  "select_xilie",
                  JSON.stringify({
                    institutionId: jigou.institutionId,
                    institutionName: jigou.institutionName
                  })
                );
              }
              this.$router.push({
                name: "financing_step1"
              });
            }
          }
        });
    },
    // 关闭弹框
    closeSeeFinancing() {
      this.seeFinancingDialog.show = false;
      this.seeFinancingDialog.data = null;
    },

    // 表单左侧 tree 里的新增按钮
    toAdd_xilie(id) {
      this.addXiLieForm.title = "新增投融资系列";
      this.addXiLieForm.toShow = true;
      this.addXiLieForm.type = "add";
      if (id && typeof id == "number") {
        // 通过点击：无产品系列？跳过来的
        this.addXiLieForm.jigou = id; // 机构id
      }
    },
    // tree 里的新增弹框保存
    addXiLieSave() {
      let obj = {},
        httpType = ""; // 最终返回的数据
      if (this.addXiLieForm.jigou != "" && this.addXiLieForm.xilie != "") {
        if (this.addXiLieForm.xilie.length < 50) {
          let jigou = this.dictData.jigou.filter(
            item => item.id == this.addXiLieForm.jigou
          )[0];
          if (this.addXiLieForm.type === "edit") {
            httpType = "put";
            // 编辑
            obj = {
              id: this.addXiLieForm.target.id,
              institutionId: jigou.id,
              institutionName: jigou.name,
              name: this.addXiLieForm.xilie,
              type: "investment"
            };
          } else {
            httpType = "post";
            // 新增
            obj = {
              institutionId: jigou.id,
              institutionName: jigou.name,
              name: this.addXiLieForm.xilie,
              type: "investment"
            };
          }

          this.$api
            .add_xilie({
              vm: this,
              httpType: httpType,
              data: obj
            })
            .then(res => {
              if (res) {
                this.treeData(false);
                this.toCloseCunkuanDialog();
              }
            });
        } else {
          this.$message.error("系列名字太长，请输入小于50字符！");
        }
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
        title: "",
        type: ""
      };
      // 清除路由参数
      if (this.$route.query.institutionId) {
        this.$router.push({
          name: "deposit"
        });
      }
    },
    //////////////////////////////////////////////////////
    // 删除、批量删除
    toDelete(type) {
      if (type === "alone") {
        this.$confirm("确认删除吗？")
          .then(() => {
            this.$api
              .financing_delete({
                vm: this,
                data: this.aloneDeleteData[0]
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
                        .financing_delete({
                          vm: this,
                          data: num
                        })
                        .then(res => {
                          if (res) {
                            sussce.push(item);
                            successName += `<li>产品名称：${item.name}</li>`;
                            resolve();
                          } else {
                            fails.push(item);
                            failName += `<li>产品名称：${item.name}</li>`;
                            resolve();
                          }
                        });
                    })
                  );
                });

                await Promise.all(proArr);
                this.seachClick("reset");
                let str = `<p style="font-weight:bold">共操作 ${this.deleteData.length} 条数据，成功 ${sussce.length} 个，失败 ${fails.length} 个</p>`;
                if (sussce.length) {
                  str += `<p style="font-weight:bold">成功删除的数据为：</p>
                      <ul class="alertUl">
                        ${successName}
                      </ul>`;
                }
                if (fails.length) {
                  str += `<p  style="font-weight:bold">未能删除的数据为：</p>
                      <ul class="alertUl">
                        ${failName}
                      </ul>`;
                }
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
    // 新增投融资产品
    addNew() {
      let kk = sessionStorage.getItem("select_xilie");
      if (kk) {
        this.$router.push({
          name: "financing_step1"
        });
      } else {
        this.$message.error("请在左侧选择存款系列！");
      }
    },
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
        text: "编辑",
        type: "primary",
        size: "mini",
        emit: "edit"
      });
      this.tableInputData.data.custom.push({
        text: "删除",
        type: "danger",
        size: "mini",
        emit: "delete"
      });
    },

    // 搜索框、重置
    seachClick(type) {
      // search  // 搜索
      // reset  // 重置
      // delete // 删除
      let obj = {};
      switch (type) {
        case "search":
          // 过滤没有数据的属性
          Object.keys(this.searchForm).forEach(str => {
            if (this.searchForm[str]) {
              obj[str] = this.searchForm[str];
            }
          });
          this.tableInputData.pageSize = 10;
          this.tableInputData.pageNum = 1;
          break;
        case "reset":
          // 重置
          this.searchForm = {
            name: "", // 产品名称
            institutionId: "", // 银行名称
            seriesId: "", // 银行对应的系列
            shelveStatus: "" // 上下架
          };
          this.xilieData.xilie = [];

          this.tableInputData.pageSize = 10; // 分页相关
          this.tableInputData.pageNum = 1;
          break;
        case "delete":
          // 过滤没有数据的属性
          Object.keys(this.searchForm).forEach(str => {
            if (this.searchForm[str]) {
              obj[str] = this.searchForm[str];
            }
          });
          break;
      }
      obj.pageSize = this.tableInputData.pageSize;
      obj.pageNum = this.tableInputData.pageNum;
      this.getUserData(obj);
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
    getUserData(data) {
      this.$api
        .get_financingList({
          vm: this,
          data: data
        })
        .then(res => {
          if (res) {
            this.afterGetData(res.data);
          }
        });
    },
    // 获取数据后的处理
    afterGetData(data) {
      this.loadEnd = false;
      new Promise(resolve => {
        this.tableInputData.total = data.total;
        this.tableInputData.pageSize = data.pageSize == 0 ? 10 : data.pageSize;
        this.tableInputData.pageNum = data.pageNum == 0 ? 1 : data.pageNum;
        this.tableInputData.data.list = data.list.map(item => {
          let arr = Object.keys(item),
            obj = {};
          arr.forEach(str => {
            obj[str] = item[str];
            if (str === "interestRate") {
              if (+item[str] > 0) {
                obj[str] = `+${(+item[str]).toFixed(4)}%`;
              } else {
                obj[str] = `${(+item[str]).toFixed(4)}%`;
              }
            }
            if (str === "appInfo") {
              obj["homePage"] = item.appInfo.homePage === "YES" ? "是" : "否";
              obj["visaInterviewLabel"] = item.appInfo.visaInterviewLabel;
              obj["realNameAuth"] =
                item.appInfo.realNameAuth === "YES" ? "是" : "否";
              obj["showBankPage"] =
                item.appInfo.showBankPage === "YES" ? "是" : "否";
            }
          });

          return obj;
        });
        // // 设置字体点击事件
        this.tableInputData.actions.click = {
          label: "产品名称",
          minWidth: 120,
          from: "name" // 记录这个交互操作的原数据属性
        };

        this.tableInputData.data.title = [
          {
            title: "产品ID",
            key: "id",
            minWidth: "80"
          },
          {
            title: "机构",
            key: "institutionName",
            minWidth: "140"
          },
          {
            title: "产品系列",
            key: "seriesName",
            minWidth: "120"
          },
          {
            title: "预期年化收益率",
            key: "interestRate",
            minWidth: "110"
          },
          {
            title: "上架状态",
            key: "shelveStatusLabel",
            minWidth: "80"
          },
          {
            title: "首页排行标志",
            key: "homePage",
            minWidth: "100"
          },
          {
            title: "风险等级",
            key: "riskLevelLabel",
            minWidth: "100"
          },
          {
            title: "面签标志",
            key: "visaInterviewLabel",
            minWidth: "80"
          },
          {
            title: "实名认证",
            key: "realNameAuth",
            minWidth: "80"
          },
          {
            title: "显示银行页面",
            key: "showBankPage",
            minWidth: "100"
          },
          {
            title: "监管属性",
            key: "regulatoryPropertyLabel",
            minWidth: "110"
          }
        ];
        resolve();
      }).then(() => {
        this.loadEnd = true;
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

