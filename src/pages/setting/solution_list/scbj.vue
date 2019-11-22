<template>
  <div class="componentWaper">
    <div id="forHeader">
      <div class="headerName">
        <p class="isPageName">
          <span :class="env?'lineSpan1':'lineSpan'">|</span>
          位置：{{$store.state.for_layout.titles}}{{pageName}}
        </p>
        <el-button size="mini" type="warning" @click="back">返回</el-button>
      </div>
    </div>

    <div id="forTable">
      <div class="toflex">
        <div class="toleft">
          <el-form
            ref="leftForm"
            :rules="rules"
            :inline="true"
            :model="leftForm"
            label-width="80px"
          >
            <el-form-item label="显示名称" prop="name" style="width:50%;margin-right:0;">
              <el-input v-model="leftForm.name" placeholder="APP标识+平台+登陆状态+描述信息"></el-input>
            </el-form-item>

            <el-form-item label="排序值" prop="paixu" style="width:50%;margin-right:0;">
              <el-input v-model="leftForm.paixu" type="number" placeholder="请输入整数"></el-input>
            </el-form-item>

            <el-form-item label="APP标识" prop="appMark" style="width:50%;margin-right:0;">
              <el-select filterable v-model="leftForm.appMark" placeholder="请选择">
                <el-option
                  v-for="item of selectData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="是否有效" prop="youxiao" style="width:50%;margin-right:0;">
              <el-select filterable v-model="leftForm.youxiao" placeholder="请选择">
                <el-option
                  v-for="item of shifou"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="配置点" prop="peizhi" style="width:50%;margin-right:0;">
              <el-select
                filterable
                v-model="leftForm.peizhi"
                placeholder="请选择"
                @change="set_peizhidian"
              >
                <el-option
                  v-for="item of peizhiList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="登录状态" prop="loginStatus" style="width:50%;margin-right:0;">
              <el-select filterable v-model="leftForm.loginStatus" placeholder="请选择">
                <el-option
                  v-for="item of dlzt"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="平台" prop="pingtai" style="width:50%;margin-right:0;">
              <el-select filterable v-model="leftForm.pingtai" placeholder="请选择">
                <el-option
                  v-for="item of pingtai"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="描述信息" style="width:50%;margin-right:0;">
              <el-input
                v-model="leftForm.miaoshu"
                type="textarea"
                rows="3"
                placeholder="请输入"
                style="width:116%"
              ></el-input>
            </el-form-item>
            <hr style="margin:0;" />
            <el-form-item label="其他条件">
              <el-button size="mini" @click="toAdd">+</el-button>
            </el-form-item>
            <el-form-item label=" ">
              <el-button type="primary" size="mini" @click="toSave">保存</el-button>
            </el-form-item>

            <ul>
              <li class="aline" v-for="data of leftForm.other" :key="data.num">
                <el-form-item size="mini">
                  <el-select filterable v-model="data.ruleType" placeholder="请选择" clearable>
                    <el-option
                      v-for="item of ruleTypeList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item size="mini">
                  <el-select
                    filterable
                    size="mini"
                    v-model="data.signType"
                    placeholder="请选择"
                    clearable
                  >
                    <el-option
                      v-for="item of fuhao"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item size="mini">
                  <el-input v-model="data.ruleValue" placeholder="请输入"></el-input>
                </el-form-item>

                <el-button
                  class="toDelete"
                  size="mini"
                  icon="el-icon-close"
                  type="danger"
                  circle
                  title="删除"
                  @click="toDelete(data)"
                ></el-button>
              </li>
            </ul>
          </el-form>
        </div>

        <div class="toright">
          <el-form :inline="true" ref="rightForm" :model="rightForm" label-width="80px">
            <el-form-item label="APP标识">
              <el-select filterable v-model="rightForm.appChannelCode" placeholder="请选择" clearable>
                <el-option
                  v-for="item of selectData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="平台">
              <el-select filterable v-model="rightForm.platformCode" placeholder="请选择" clearable>
                <el-option
                  v-for="item of pingtai"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button size="mini" type="primary" @click="getList">查询</el-button>
              <el-button size="mini" type="warning" @click="reset">重置</el-button>
            </el-form-item>
          </el-form>

          <div id="forTable" style="max-height:520px;">
            <isTable :inputData="tableInputData" @tableEmit="tableEmit" v-if="loadEnd" />
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      :visible.sync="show"
      width="30%"
      center
      :close-on-click-modal="false"
      :show-close="false"
    >
      <span>数据提交成功，请选择下一步执行步骤</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="toList(true)">去配置列表</el-button>
        <el-button type="primary" @click="toList(false)">{{ID?'再次编辑':'再次新增'}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import isTable from "../../../components/isTable/isTable.vue";
export default {
  props: {},
  components: {
    isTable
  },
  data() {
    // 验证数字，小数的
    var checkNum2 = (rule, value, callback) => {
      let reg = /\./;
      if (reg.test(value)) {
        callback(new Error("请输入整数"));
      } else if (value < 0) {
        callback(new Error("请输入正数"));
      } else if (("" + value).length > 10 || ("" + value).length < 0) {
        callback(new Error("请输入1-10字符"));
      } else {
        callback();
      }
    };
    return {
      ID: "",
      env: null,
      show: false, // 保存结束弹框
      loadEnd: false,
      tableInputData: {
        noIndex: true,
        // 传给table子组件的数据
        checkBox: true, // 判断需要不需要添加选择框
        pageSize: 10, // 分页相关
        pageNum: 1,
        total: null,
        actions: {},
        data: {
          list: [], // 给表格的数据
          quanxian: [], // 记录用户的权限，当前页面显示哪些按钮、表格是否显示操作列
          title: [
            { name: "Test one" },
            { name: "Test two" },
            { name: "Test three" }
          ], // 给表格表头
          custom: [] // 给表格按钮数量、类型（编辑、删除等）
        }
      },
      shifou: [
        { label: "非默认", value: "NO_DEFULT" },
        { label: "默认", value: "DEFAULT" }
      ],
      shenhe: [
        { label: "审核限制", value: "shxz" },
        { label: "正常素材", value: "zcsc" }
      ],
      dlzt: [
        { label: "全部", value: "ALL" },
        { label: "登陆", value: "LOGIN" },
        { label: "未登录", value: "LOGIN_OUT" }
      ],
      selectData: [
        { label: "全部", value: "ALL" },
        { label: "比财", value: "BICAI" },
        { label: "拼财", value: "PINCAI" },
        { label: "拼财小程序", value: "WECHAT_PINCAI" },
        { label: "亚财", value: "YACAI" }
      ],
      ruleTypeList: [
        { label: "是否审核", value: "ios_audit_flag" },
        { label: "APP版本", value: "app_version" },
        { label: "语言", value: "language" }
      ],
      fuhao: [
        { label: ">", value: ">" },
        { label: ">=", value: ">=" },
        { label: "!=", value: "!=" },
        { label: "=", value: "=" },
        { label: "<", value: "<" },
        { label: "<=", value: "<=" }
      ],
      pingtai: [
        { label: "全部", value: "ALL" },
        { label: "苹果", value: "IOS" },
        { label: "安卓", value: "ANDROID" }
      ],
      peizhiList: [
        {
          label: "侧边栏-左侧",
          value: "sidebar_left"
        },
        {
          label: "首页按钮",
          value: "button_top"
        },
        {
          label: "活动按钮",
          value: "activity_button_top"
        },
        {
          label: "启动页",
          value: "launch_advertis"
        },
        {
          label: "侧边栏广告",
          value: "sidebar_banner"
        },
        {
          label: "首页广告",
          value: "index_banner"
        }
      ],
      num: 0, // 其它条件添加时，前端用来计数
      pageName: "", // 当前页面名字,
      // 左侧表单
      leftForm: {
        name: "", // 显示名称
        appMark: "", // APP标识
        paixu: "", // 排序值
        youxiao: "", // 是否有效
        peizhi: "", // 配置点
        loginStatus: "", // 登录状态
        pingtai: "IOS", // 登录状态
        miaoshu: "", // 描述信息
        other: [], // 其他条件
        hasSelect: [] // 如果是编辑，保存已选择的
      },
      // 右边查询
      rightForm: {
        solutionGroup: "",
        appChannelCode: "", // APP标识
        platformCode: "" // 平台
      },
      beforeSelect: [], // 记录当前分页里，素材列表之前已选择的
      rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 1, max: 100, message: "最多输入100个字", trigger: "blur" }
        ],
        appMark: [
          { required: true, message: "请输选择APP标识", trigger: "change" }
        ],
        youxiao: [
          { required: true, message: "请输选择是否有效", trigger: "change" }
        ],
        peizhi: [
          { required: true, message: "请输选择配置点", trigger: "change" }
        ],
        loginStatus: [
          { required: true, message: "请输选择登录状态", trigger: "change" }
        ],
        pingtai: [
          { required: true, message: "请输选择平台", trigger: "change" }
        ],
        paixu: [
          { required: true, message: "请输入排序值", trigger: "blur" },
          { validator: checkNum2, trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.env = sessionStorage.getItem("env") === "development";

    this.pageName = sessionStorage.getItem("page");
    this.init();
  },
  methods: {
    init() {
      this.show = false;
      this.ID = this.$route.query["id"];
      this.leftForm.peizhi = this.$route.query["weizhi"];
      this.rightForm.solutionGroup = this.leftForm.peizhi;
      if (this.ID) {
        this.getUserData(this.ID);
      } else {
        this.getList();
      }
    },
    // 其它条件添加
    toAdd() {
      if (this.leftForm.other.length === 0) {
        this.leftForm.other.push({
          num: this.num++,
          ruleType: "",
          signType: "",
          ruleValue: ""
        });
      } else {
        let arr = this.leftForm.other
          .map(tar => tar.id)
          .filter(item => Boolean(item));

        if (!arr.includes(this.num)) {
          this.leftForm.other.push({
            num: this.num++,
            ruleType: "",
            signType: "",
            ruleValue: ""
          });
        } else {
          this.num++;
          this.toAdd();
        }
      }
    },
    // 左侧底下的删除
    toDelete(item) {
      this.leftForm.other = this.leftForm.other.filter(tar => {
        if (tar.id) {
          return tar.id != item.id;
        } else {
          return tar.num != item.num;
        }
      });
    },
    // 左侧的保存
    toSave() {
      this.$refs.leftForm.validate(valid => {
        if (valid) {
          let httpType = "",
            obj = {
              solutionGroup: this.leftForm.peizhi,
              solutionDesc: this.leftForm.name,
              platformType: this.leftForm.pingtai,
              appType: this.leftForm.appMark,
              loginType: this.leftForm.loginStatus,
              displayName: this.leftForm.miaoshu,
              defaultFlag: this.leftForm.youxiao,
              sortIndex: +this.leftForm.paixu,
              solutionCondition: this.leftForm.other.map(tar => {
                let obj = {
                  ruleType: tar.ruleType,
                  ruleValue: tar.ruleValue,
                  signType: tar.signType
                };
                if (tar.id) {
                  obj.id = tar.id;
                }
                return obj;
              }),
              resourceIdList: [...this.leftForm.hasSelect.map(tar => tar.id)]
            };
          if (this.leftForm.id) {
            httpType = "put";
            obj.id = this.leftForm.id;
          } else {
            httpType = "post";
          }
          this.$api
            .add_put({
              vm: this,
              data: obj,
              httpType: httpType
            })
            .then(res => {
              if (res) {
                if (res) {
                  this.show = true;
                }
              }
            });
        } else {
          this.$message.error("请输入完整数据！");
        }
      });
    },
    toList(type) {
      if (type) {
        this.$router.push({
          name: `pzgl`,
          query: {
            weizhi: this.$route.query["weizhi"]
          }
        });
      } else {
        if (!this.ID) {
          this.leftForm = {
            name: "", // 显示名称
            appMark: "", // APP标识
            paixu: "", // 排序值
            youxiao: "", // 是否有效
            peizhi: "", // 配置点
            loginStatus: "", // 登录状态
            pingtai: "IOS", // 登录状态
            miaoshu: "", // 描述信息
            other: [], // 其他条件
            hasSelect: [] // 如果是编辑，保存已选择的
          };
          // 右边查询
          this.rightForm = {
            solutionGroup: "",
            appChannelCode: "", // APP标识
            platformCode: "" // 平台
          };
          this.beforeSelect = []; // 记录当前分页里，素材列表之前已选择的
          this.$refs.leftForm.resetFields();
        }
        this.init();
      }
    },
    // 右侧的重置
    reset() {
      // 重置
      this.rightForm.solutionGroup = this.$route.query["weizhi"];
      this.rightForm.appChannelCode = ""; // APP标识
      this.rightForm.platformCode = ""; // 平台
      this.tableInputData.pageSize = 10;
      this.tableInputData.pageNum = 1;
      this.getList();
    },

    tableEmit(data) {
      switch (data.type) {
        case "regetData": // 分页的emit
          this.getList();
          break;
        case "moreDelete": // 从右侧添加使用的
          if (!this.beforeSelect.length) {
            this.beforeSelect = data.data;

            let arr = this.leftForm.hasSelect.map(kk => kk.id);
            for (let i = this.beforeSelect.length; i--; ) {
              if (!arr.includes(this.beforeSelect[i].id)) {
                this.leftForm.hasSelect.push(this.beforeSelect[i]);
              }
            }
          } else {
            // 如果 this.beforeSelect.length > data.data.length 表示是删除已选过的
            if (this.beforeSelect.length > data.data.length) {
              let arr = data.data.map(kk => kk.id); // 获取当前分页已选的素材
              for (let i = this.beforeSelect.length; i--; ) {
                if (!arr.includes(this.beforeSelect[i].id)) {
                  // 如果当前页选择的素材，不包含在hasSelect，就表示是取消选中状态，要
                  // 从 hasSelect 数组中删除

                  this.leftForm.hasSelect = this.leftForm.hasSelect.filter(
                    jj => jj.id != this.beforeSelect[i].id
                  );
                }
              }
            } else {
              // 添加新的
              data.data.forEach(item => {
                // 遍历当前页选中的，把新勾选的添加到 hasSelect
                let isIn = this.leftForm.hasSelect.some(
                  tar => tar.id === item.id
                );
                if (!isIn) {
                  this.leftForm.hasSelect.push(item);
                }
              });
            }
            this.beforeSelect = JSON.parse(JSON.stringify(data.data));
          }
          break;
      }
    },
    // 获取素材列表
    getList() {
      let obj = {
        pageSize: this.tableInputData.pageSize,
        pageNum: this.tableInputData.pageNum
      };
      for (let i in this.rightForm) {
        if (this.rightForm[i]) {
          obj[i] = this.rightForm[i];
        }
      }
      // 获取素材列表
      this.$api
        .get_sucai_list({
          vm: this,
          data: obj
        })
        .then(res => {
          if (res) {
            this.beforeSelect = [];
            this.afterGetData(res.data);
          }
        });
    },

    // 获取数据后的处理
    afterGetData(data1) {
      this.loadEnd = false;
      new Promise(resolve => {
        this.tableInputData.total = data1.total;
        this.tableInputData.pageSize =
          data1.pageSize == 0 ? 10 : data1.pageSize;
        this.tableInputData.pageNum = data1.pageNum == 0 ? 1 : data1.pageNum;
        this.tableInputData.data.list = data1.list.map(item => {
          let obj = {},
            arr = Object.keys(item);
          arr.forEach(str => {
            obj[str] = item[str];
            // 活动管理配置管理设置素材，属性名： sucai
            obj.sucai = [
              {
                text: item.title,
                img: item.imageUrl,
                type: item.imageUrl.split(".")[1]
              }
            ];
            obj.afterText = item.appChannelCode
              ? `${item.appChannelName + " / " + item.platformName}`
              : "";
          });
          return obj;
        });
        // 表示是编辑
        if (this.leftForm.id) {
          let hasSelect = this.leftForm.hasSelect.map(tar => tar.id);
          this.tableInputData.data.setCheck = this.tableInputData.data.list.filter(
            item => hasSelect.includes(item.id)
          );
        }
        this.tableInputData.data.title = [
          {
            title: "名称",
            key: "title",
            minWidth: "80"
          },
          {
            title: "素材预览",
            key: "sucai",
            minWidth: "100",
            imgArr: true // 展示图片数组
          },
          {
            title: "App标识/平台",
            key: "afterText",
            minWidth: "100"
          }
        ];
        resolve();
      }).then(() => {
        this.loadEnd = true;
      });
    },
    // 获取获取详情数据
    getUserData(id) {
      return this.$api
        .get_info({
          vm: this,
          data: id
        })
        .then(res => {
          if (res) {
            let datas = res.data;
            this.leftForm = {
              id: datas.id, // 编辑的产品的id
              name: datas.solutionDesc, // 显示名称
              appMark: datas.appType, // APP标识
              paixu: datas.sortIndex, // 排序值
              youxiao: datas.defaultFlag, // 是否有效
              peizhi: datas.solutionGroup, // 配置点
              loginStatus: datas.loginType, // 登录状态
              pingtai: datas.platformType, // 平台
              miaoshu: datas.displayName, // 描述信息
              other: datas.solutionCondition, // 其他条件
              hasSelect: datas.previewResourceListVos // 已经添加使用的素材
            };
            this.rightForm.solutionGroup = this.leftForm.peizhi;
            this.getList();
          }
        });
    },
    // 与配置点联动
    set_peizhidian() {
      this.rightForm.solutionGroup = this.leftForm.peizhi;
      this.tableInputData.pageSize = 10;
      this.tableInputData.pageNum = 1;
      this.getList();
    },
    // 返回按钮
    back() {
      sessionStorage.setItem("page", "卡券列表");
      this.$router.push({
        name: `pzgl`,
        query: {
          weizhi: this.$route.query["weizhi"]
        }
      });
    }
  }
};
</script>
<style scoped='true'>
.headerName {
  display: flex;
  justify-content: space-between;
}
.toflex {
  display: flex;
  justify-content: space-between;
  width: calc(100% - 20px);
}
.toleft {
  width: 50%;
  box-sizing: border-box;
  border-right: 1px solid rgb(228, 224, 224);
}
.toright {
  width: 48%;
}

#toleft > div {
  display: flex;
  justify-content: space-around;
}
.aline {
  display: flex;
  position: relative;
  padding: 5px 0;
  padding-right: 20px;
  background: rgba(165, 206, 230, 0.383);
}
.aline div {
  margin: 0 !important;
  padding: 0 2px;
}

.toDelete {
  position: absolute;
  top: 5px;
  right: 5px;
}
</style>

