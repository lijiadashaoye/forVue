<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
      <div class="toCreateBtn">
        <el-button
          v-if="tableInputData.data.quanxian.includes('market_coupon_add')"
          size="mini"
          type="warning"
          @click="buttonRowUpdata(true)"
        >创建卡券</el-button>
      </div>
      <div>
        <!-- 搜索 -->
        <el-form
          :inline="true"
          :model="ruleForm"
          label-width="100px"
          label-suffix=":"
          label-position="right"
          size="mini"
          ref="ruleForm"
        >
          <el-form-item label="卡券名称">
            <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
          </el-form-item>

          <el-form-item label="卡券类别">
            <el-select filterable v-model="ruleForm.type" clearable placeholder="请选择">
              <el-option
                size="mini"
                v-for="item in typeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="关联的活动">
            <el-select filterable v-model="ruleForm.activityId" clearable placeholder="请选择">
              <el-option
                size="mini"
                v-for="item in activityIdList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="关联银行">
            <el-select filterable v-model="ruleForm.bankId" clearable placeholder="请选择">
              <el-option
                size="mini"
                v-for="item in bankList_search"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="关联产品">
            <el-select filterable v-model="ruleForm.productId" clearable placeholder="请选择">
              <el-option
                size="mini"
                v-for="item in productList_search"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="是否为补发券">
            <el-select filterable v-model="ruleForm.isReplacement" clearable placeholder="请选择">
              <el-option
                size="mini"
                v-for="item in isReplacementList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="是否达到预警">
            <el-select filterable v-model="ruleForm.isWarning" clearable placeholder="请选择">
              <el-option
                size="mini"
                v-for="item in isReplacementList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="状态">
            <el-select filterable v-model="ruleForm.status" clearable placeholder="请选择">
              <el-option
                size="mini"
                v-for="item in statueList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button size="mini" type="primary" @click="seachClick('search')">查 询</el-button>
            <el-button size="mini" type="info" @click="seachClick('reset')">重 置</el-button>
            <el-button size="mini" type="warning" @click="addGroup()">分组操作</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div id="forTable" v-if="loadEnd">
      <isTable :inputData="tableInputData" @tableEmit="tableEmit" />
    </div>
    <!-- 更改状态弹出框 -->
    <el-dialog
      :close-on-click-modal="false"
      title="修改卡券状态"
      :visible.sync="changeStateForm.show"
      width="500px"
      :before-close="dialogClose"
    >
      <el-form size="small" :model="changeStateForm.data" label-width="110px">
        <el-form-item label="修改状态">
          <el-select filterable v-model="changeStateForm.data.status" clearable placeholder="请选择">
            <el-option
              size="mini"
              v-for="item in statueList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="changeStatue(false)">取 消</el-button>
        <el-button size="mini" type="primary" @click="changeStatue(true)">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑弹出框 -->
    <el-dialog
      :close-on-click-modal="false"
      title="编辑卡券"
      :visible.sync="editForm.show"
      width="500px"
      :before-close="dialogClose"
    >
      <el-form :rules="rules" size="small" ref="editForm" :model="editForm" label-width="130px">
        <el-form-item label="券名称" prop="name" placeholder="请输入">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>

        <el-form-item label="卡券说明" prop="explains">
          <el-input placeholder="不显示在App端，可为空" rows="2" type="textarea" v-model="editForm.explains"></el-input>
        </el-form-item>

        <el-form-item label="领取后有效天数" prop="effectiveDays">
          <el-input
            type="number"
            class="forDays"
            placeholder="请输入"
            v-model="editForm.effectiveDays"
          ></el-input>
        </el-form-item>

        <el-form-item label="预警数量" prop="warningCount">
          <el-input
            class="addDanWei"
            type="number"
            placeholder="请输入"
            v-model="editForm.warningCount"
          ></el-input>
        </el-form-item>

        <el-form-item label="预警通知手机号" prop="notifyMobile">
          <el-input v-model="editForm.notifyMobile"></el-input>
        </el-form-item>

        <el-form-item prop="receiveLimit" label="领券限制">
          <el-input
            class="addDanWei"
            type="number"
            placeholder="请输入"
            v-model="editForm.receiveLimit"
          ></el-input>
          <span>(每个用户领券上限，如不填默认为一张)</span>
        </el-form-item>

        <el-form-item label="收益发放类型" prop="incomeGrantType">
          <el-select
            filterable
            v-model="editForm.incomeGrantType"
            placeholder="请选择收益发放类型"
            style="width:100%;"
            clearable
          >
            <el-option
              v-for="item in fafangType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="起投金额" prop="initialAmount">
          <el-input
            type="number"
            class="forMoney"
            placeholder="请输入"
            v-model="editForm.initialAmount"
          ></el-input>
          <span>(满足一定金额才可使用,如不填则跟随产品起投金额)</span>
        </el-form-item>

        <el-form-item label="适用渠道" prop="applyChannel">
          <el-select
            filterable
            v-model="editForm.applyChannel"
            placeholder="请选择适用渠道"
            style="width:100%;"
            clearable
          >
            <el-option
              v-for="item in qudaoList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" placeholder="app不展示（最多输入500个字符）" v-model="editForm.remark"></el-input>
        </el-form-item>

        <el-form-item label="编辑卡券类型">
          <el-checkbox v-model="editForm.setType"></el-checkbox>
        </el-form-item>

        <div v-if="editForm.setType">
          <!-- 体验金券 -->
          <el-form-item
            label="体验金金额"
            prop="experienceAmount"
            placeholder="请输入"
            v-if="editForm.type==='EXPERIENCE'"
          >
            <el-input v-model="editForm.experienceAmount" type="number"></el-input>
          </el-form-item>
          <el-form-item
            label="体验金持续天数"
            prop="experienceDays"
            placeholder="请输入"
            v-if="editForm.type==='EXPERIENCE'"
          >
            <el-input v-model="editForm.experienceDays" type="number"></el-input>
          </el-form-item>

          <!-- 加息券 -->
          <el-form-item
            label="加息天数"
            prop="increasesDays"
            placeholder="请输入"
            v-if="editForm.type==='INCREASE'"
          >
            <el-input v-model="editForm.increasesDays" type="number"></el-input>
          </el-form-item>
          <el-form-item
            label="计息上限金额"
            prop="increasesAmount"
            placeholder="请输入"
            v-if="editForm.type==='INCREASE'"
          >
            <el-input v-model="editForm.increasesAmount" type="number"></el-input>
          </el-form-item>
          <el-form-item
            label="加息率"
            prop="increasesRate"
            placeholder="请输入"
            v-if="editForm.type==='INCREASE'"
          >
            <el-input v-model="editForm.increasesRate" class="addDanWei forBaiFenHao" type="number"></el-input>
            <span>(加息率只保留两位小数)</span>
          </el-form-item>

          <!-- 定购券 -->
          <el-form-item
            label="定购金额"
            prop="orderAmount"
            placeholder="请输入"
            v-if="editForm.type==='ORDER'"
          >
            <el-input v-model="editForm.orderAmount" type="number"></el-input>
          </el-form-item>
          <el-form-item
            label="定购返现金额"
            prop="orderReturnAmount"
            placeholder="请输入"
            v-if="editForm.type==='ORDER'"
          >
            <el-input v-model="editForm.orderReturnAmount" type="number"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="editFormAction(false)">取 消</el-button>
        <el-button size="mini" type="primary" @click="editFormAction(true)">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改关联弹出框 -->
    <el-dialog
      :close-on-click-modal="false"
      title="修改关联产品or银行"
      :visible.sync="guanlianForm.show"
      width="920px"
      :before-close="dialogClose"
    >
      <div style="display:flex;justify-content:space-between;">
        <div id="forHeader" style="width:49%;">
          <h3 v-if="guanlianForm.guanlian.dataTotal.length===0">暂时没有任何关联的数据，您可以从右侧添加关联</h3>
          <forms
            @tableAct="tableAct"
            :pageData="guanlianForm"
            v-if="guanlianForm.guanlian.dataTotal.length>0"
          />
        </div>
        <div style="width:50%;">
          <!-- 产品列表 -->
          <div>
            <div id="forHeader">
              <el-form size="small" :model="productListSearch" label-width="80px" inline>
                <el-form-item style="margin-bottom:2px" label="产品名称">
                  <el-input v-model="productListSearch.name" @change="inputChange('product')"></el-input>
                </el-form-item>

                <el-form-item style="margin-bottom:2px;">
                  <el-button size="mini" type="danger" @click="toSearch('product')">查询</el-button>
                  <el-button size="mini" type="info" @click="resetSearch('product')">重置</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div id="forHeader" style="height:240px;">
              <isTable
                v-if="productList.show"
                :inputData="productList"
                @tableEmit="tableEmitEdit($event,'product')"
              />
            </div>
          </div>
          <!-- 银行列表 -->
          <div>
            <div id="forHeader">
              <el-form size="small" :model="bankListSearch" label-width="80px" inline>
                <el-form-item style="margin-bottom:2px" label="银行名称">
                  <el-input v-model="bankListSearch.name" @change="inputChange('bank')"></el-input>
                </el-form-item>

                <el-form-item style="margin-bottom:2px;">
                  <el-button size="mini" type="danger" @click="toSearch('bank')">查询</el-button>
                  <el-button size="mini" type="info" @click="resetSearch('bank')">重置</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div id="forHeader" style="height:240px;">
              <isTable
                v-if="bankList.show"
                :inputData="bankList"
                @tableEmit="tableEmitEdit($event,'bank')"
              />
            </div>
          </div>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="guanlianDia(false)">取 消</el-button>
        <el-button size="mini" type="primary" @click="guanlianDia(true)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import isTable from "../../../components/isTable/isTable.vue";
import forms from "../../../components/forms.vue";

export default {
  data() {
    // 验证数字不包括小数
    var checkNum2 = (rule, value, callback) => {
      let reg = /\./;
      if (reg.test(value)) {
        callback(new Error("请输入整数"));
      } else if (value < 0) {
        callback(new Error("请输入正数"));
      } else if (("" + value).length > 11 || ("" + value).length < 0) {
        callback(new Error("请输入1-11字符"));
      } else {
        callback();
      }
    };
    // 验证数字，可以有小数
    var checkNum3 = (rule, value, callback) => {
      if (value < 0) {
        callback(new Error("请输入正数"));
      } else if (("" + value).length > 19 || ("" + value).length < 0) {
        callback(new Error("请输入1-19字符"));
      } else {
        callback();
      }
    };
    // 验证手机号
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        callback();
      } else if (!/^1[34578]\d{9}$/.test(value)) {
        callback(new Error("手机号码有误，请重填"));
      } else {
        callback();
      }
    };
    // 验证数字，可以有小数，不能大于100
    var checkNum4 = (rule, value, callback) => {
      if (value < 0 || +value >= 100) {
        callback(new Error("请输入正数且小于100"));
      } else if (("" + value).length > 19 || ("" + value).length < 0) {
        callback(new Error("请输入1-19字符"));
      } else {
        callback();
      }
    };
    return {
      env: null,
      fafangType: [], // 发放类型
      // 表单上边搜索部分的数据
      ruleForm: {
        name: "", // 卡券名称
        type: "", // 卡券类别
        activityId: "", //关联的活动
        bankId: "", // 关联的银行
        status: "", // 券状态
        productId: "", // 关联产品
        isReplacement: "", // 是否为补发券
        isWarning: "" // 是否达到预警
      },
      // 关联的活动
      activityIdList: [],
      // 关联的银行
      bankList_search: [
        {
          label: "关联的银行 id",
          value: 2
        }
      ],
      // 关联的产品
      productList_search: [
        {
          label: "关联的产品 id",
          value: 2
        }
      ],
      // 卡券使用类型
      typeList: [
        {
          label: "通用券",
          value: "CURRENCY"
        },
        {
          label: "产品券",
          value: "PRODUCT"
        },
        {
          label: "拼团券",
          value: "PINTUAN"
        }
      ],
      // 是否为补发券、是否达到预警
      isReplacementList: [
        {
          label: "是",
          value: "YES"
        },
        {
          label: "否",
          value: "NO"
        }
      ],
      // 适用渠道
      qudaoList: [
        {
          label: "全部",
          value: "ALL"
        },
        {
          label: "比财",
          value: "BICAI"
        },
        {
          label: "拼财",
          value: "PINCAI"
        },
        {
          label: "亚财",
          value: "YACAI"
        }
      ],
      loadEnd: false, // 控制当表格的数据全部获取完才显示表格
      pageName: "", // 当前页面名字
      tableInputData: {
        // 传给table子组件的数据
        checkBox: true, // 判断需要不需要添加选择框
        pageSize: 10, // 分页相关
        pageNum: 1,
        total: null,
        actions: {}, // 记录表格内需要额外添加的点击事件
        data: {
          list: [], // 给表格的数据
          quanxian: [], // 记录用户的权限，当前页面显示哪些按钮、表格是否显示操作列
          title: [], // 给表格表头
          custom: [] // 给表格按钮数量、类型（编辑、删除等）
        }
      },
      // 修改状态弹框
      changeStateForm: {
        show: false,
        data: {
          id: "",
          status: ""
        }
      },
      // 是否为补发券、是否达到预警
      statueList: [
        {
          label: "停止发放",
          value: "STOP"
        },
        {
          label: "发放中",
          value: "GRANTING"
        },
        {
          label: "作废",
          value: "CANCEL"
        }
      ],
      // 编辑弹框
      editForm: {
        show: false
      },
      // 关联弹出框
      guanlianForm: {
        id: "",
        // 弹出框的控制
        show: false,
        type: "guanlian",
        guanlian: {
          fenye: true, // 是否需要分页
          pageNum: 0, // 当前页码
          titleUp: {
            pointName: "已关联的产品or银行"
          },
          // 表格头部
          title: [
            {
              prop: "name", // 要显示的属性
              label: "名称", // 要显示的文字
              width: "100" // 当前项的宽度
            },
            {
              prop: "type", // 要显示的属性
              label: "类型", // 要显示的文字
              width: "100" // 当前项的宽度
            }
          ],
          handle: [
            {
              click: "delete", // 表格操作栏的点击事件
              text: "删除" // 表格操作栏的点击事件
            }
          ],
          // 表格数据
          dataTotal: []
        }
      },
      ////////////////////////////////////////////////////////
      // 关联产品的服务器数据列表
      productList: {
        // 红包备选表格
        show: false,
        pageSize: 10, // 分页相关
        pageNum: 1,
        total: null,
        actions: {}, // 记录表格内需要额外添加的点击事件
        datas: {
          list: [], // 给表格的数据
          quanxian: [], // 记录用户的权限，当前页面显示哪些按钮、表格是否显示操作列
          title: [], // 给表格表头
          custom: [] // 给表格按钮数量、类型（编辑、删除等）
        }
      },
      // 关联产品表格的查询
      productListSearch: {
        name: ""
      },
      // 关联银行的服务器数据列表
      bankList: {
        // 红包备选表格
        show: false,
        pageSize: 10, // 分页相关
        pageNum: 1,
        total: null,
        actions: {}, // 记录表格内需要额外添加的点击事件
        datas: {
          list: [], // 给表格的数据
          quanxian: [], // 记录用户的权限，当前页面显示哪些按钮、表格是否显示操作列
          title: [], // 给表格表头
          custom: [] // 给表格按钮数量、类型（编辑、删除等）
        }
      },
      // 关联银行表格的查询
      bankListSearch: {
        name: ""
      },
      ////////////////////////////////////////////////////////
      rules: {
        name: [{ min: 1, max: 64, message: "最多输入64个字", trigger: "blur" }],
        explains: [
          { min: 1, max: 100, message: "最多输入100个字", trigger: "blur" }
        ],
        effectiveDays: [
          { validator: checkNum3, trigger: "blur" },
          { required: true, message: "请输入自领取之后天数", trigger: "blur" }
        ],
        warningCount: [{ validator: checkNum2, trigger: "blur" }],
        notifyMobile: [{ validator: checkPhone, trigger: "blur" }],
        receiveLimit: [{ validator: checkNum2, trigger: "blur" }],
        incomeGrantType: [{ message: "请选择收益发放类型", trigger: "change" }],
        applyChannel: [{ message: "适用渠道", trigger: "change" }],
        initialAmount: [{ validator: checkNum2, trigger: "blur" }],
        experienceAmount: [
          {
            required: true,
            message: "请输入体验金金额(整数)",
            trigger: "blur"
          },
          { validator: checkNum2, trigger: "blur" }
        ],
        experienceDays: [
          {
            required: true,
            message: "请输入体验金持续天数",
            trigger: "blur"
          },
          { validator: checkNum2, trigger: "blur" }
        ],
        increasesDays: [
          { required: true, message: "请输入加息天数", trigger: "blur" },
          { validator: checkNum3, trigger: "blur" }
        ],
        increasesAmount: [
          { required: true, message: "请输入计息上限金额", trigger: "blur" },
          { validator: checkNum3, trigger: "blur" }
        ],
        increasesRate: [
          { required: true, message: "请输入加息率", trigger: "blur" },
          { validator: checkNum4, trigger: "blur" }
        ],
        orderAmount: [
          {
            required: true,
            message: "请输入定购金额(整数)",
            trigger: "blur"
          },
          { validator: checkNum2, trigger: "blur" }
        ],
        orderReturnAmount: [
          { required: true, message: "请输入定购返现金额", trigger: "blur" },
          { validator: checkNum3, trigger: "blur" }
        ]
      }
    };
  },
  components: {
    isTable,
    forms
  },
  mounted() {
    this.env = sessionStorage.getItem("env") === "development";
    this.loadEnd = false;
    let page = sessionStorage.getItem("page"); // 获取页面名称
    this.pageName = page;
    this.canDoWhat();
    this.getUserData();
    this.getHuoDong();
  },
  methods: {
    // 获取关联的活动数据
    getHuoDong() {
      this.$api
        .market_list_getListData({
          vm: this,
          data: {}
        })
        .then(res => {
          if (res) {
            this.activityIdList = res.data.list.map(item => {
              return {
                label: item.activityName,
                value: item.id
              };
            });
          }
        });
    },
    // 检查数字
    checkNum(value) {
      let reg = /\./;
      if (reg.test(value)) {
        return true;
      } else if (!value) {
        return true;
      } else if (value < 0) {
        return true;
      } else {
        return false;
      }
    },
    // 关闭弹框
    dialogClose() {
      this.changeStateForm = {
        show: false,
        data: {
          id: "",
          status: ""
        }
      };
      this.editForm = {
        show: false
      };
      this.guanlianForm.id = "";
      this.guanlianForm.show = false;
      this.guanlianForm.forForms.dataTotal = [];
    },
    // 监听表格的操作
    tableEmit(data) {
      switch (data.type) {
        case "regetData": // 分页的emit
          this.seachClick("fenye");
          break;
        case "edit": // 编辑按钮
          this.buttonRowUpdata(false, data.data);
          break;
        case "guanlian": // 修改关联
          this.editGuanLian(data.data);
          break;
        case "xiangqing": //  详情
          this.xiangqing(data.data);
          break;
        case "changeStatue": // 修改状态
          this.changeStateForm.data = {
            id: data.data.id,
            status: data.data.statue
          };
          this.changeStateForm.show = true;
          break;
      }
    },
    // 修改状态
    changeStatue(data) {
      if (data) {
        this.$api
          .market_coupon_UpDown({
            vm: this,
            data: this.changeStateForm.data
          })
          .then(res => {
            if (res) {
              this.$message.success("修改成功！");
              this.dialogClose();
            }
          });
      } else {
        this.dialogClose();
      }
    },
    // 分组操作
    addGroup() {
      sessionStorage.setItem("page", "分组操作");
      this.$router.push({
        name: "coupon_group"
      });
    },
    // 创建卡券按钮、表格的编辑按钮
    buttonRowUpdata(type, inData) {
      if (type) {
        sessionStorage.setItem("page", "创建卡券");
        this.$router.push({
          name: "coupon_add"
        });
      } else {
        switch (inData.type) {
          case "EXPERIENCE":
            this.$set(this, "fafangType", [
              {
                label: "赎回时发放",
                value: "WHEN_REDEEM"
              },
              {
                label: "加息时间结束时发放",
                value: "WHEN_END"
              }
            ]);

            break;
          case "INCREASE":
            this.$set(this, "fafangType", [
              {
                label: "赎回时发放",
                value: "WHEN_REDEEM"
              },
              {
                label: "加息时间结束时发放",
                value: "WHEN_END"
              }
            ]);
            break;
          case "ORDER":
            this.$set(this, "fafangType", [
              {
                label: "购买时发放",
                value: "WHEN_BUY"
              },
              {
                label: "赎回时发放",
                value: "WHEN_REDEEM"
              },
              {
                label: "加息时间结束时发放",
                value: "WHEN_END"
              }
            ]);
            break;
        }
        this.editForm = {
          show: true,
          id: inData.id,
          name: inData.name, // 券名称
          explains: inData.explains, // 使用说明
          effectiveDays: inData.effectiveDays, // 领取后有效天数
          warningCount: inData.warningCount, // 预警数量
          notifyMobile: inData.notifyMobile, // 预警通知手机号
          receiveLimit: inData.receiveLimit, // 领取限制:X张(默认1张)
          initialAmount: inData.initialAmount, // 起投金额
          incomeGrantType: inData.incomeGrantType, // 收益(现金)发放类型
          applyChannel: inData.applyChannel, // 适用渠道
          remark: inData.remark, // 备注(app不展示)
          setType: false, // 是否编辑类型数据
          type: inData.type,
          ...inData.typeDetail
        }; // 类型数据
        // INCREASE("加息券"),EXPERIENCE("体验金券"),ORDER("定购券")
      }
    },
    // 编辑弹框的保存、取消
    editFormAction(type) {
      if (type) {
        this.$refs.editForm.validate(valid => {
          if (valid) {
            let proArr = [];
            let jiben = {
              id: this.editForm.id,
              name: this.editForm.name, // 券名称
              explains: this.editForm.explains, // 使用说明
              effectiveDays: this.editForm.effectiveDays, // 领取后有效天数
              warningCount: this.editForm.warningCount, // 预警数量
              notifyMobile: this.editForm.notifyMobile, // 预警通知手机号
              receiveLimit: this.editForm.receiveLimit, // 领取限制:X张(默认1张)
              initialAmount: this.editForm.initialAmount, // 起投金额
              incomeGrantType: this.editForm.incomeGrantType, // 收益(现金)发放类型
              applyChannel: this.editForm.applyChannel, // 适用渠道
              remark: this.editForm.remark // 备注(app不展示)
            };
            // 基本信息编辑的保存
            proArr.push(
              this.$api.market_coupon_upCoupon({
                vm: this,
                httpType: "put",
                data: jiben
              })
            );

            if (this.editForm.setType) {
              let leixing = {};
              switch (this.editForm.type) {
                case "EXPERIENCE":
                  leixing = {
                    id: this.editForm.id,
                    type: this.editForm.type,
                    experienceAmount: this.editForm.experienceAmount,
                    experienceDays: this.editForm.experienceDays
                  };
                  break;
                case "INCREASE":
                  leixing = {
                    id: this.editForm.id,
                    type: this.editForm.type,
                    increasesDays: this.editForm.increasesDays,
                    increasesAmount: this.editForm.increasesAmount,
                    increasesRate: this.jieQu(
                      this.editForm.type,
                      this.editForm.increasesRate
                    )
                  };
                  break;
                case "ORDER":
                  leixing = {
                    id: this.editForm.id,
                    type: this.editForm.type,
                    orderAmount: this.editForm.orderAmount,
                    orderReturnAmount: this.jieQu(
                      this.editForm.type,
                      this.editForm.orderReturnAmount
                    )
                  };
                  break;
              }
              // 类型信息编辑的保存
              proArr.push(
                this.$api.market_change_type({
                  vm: this,
                  data: leixing
                })
              );
            }

            Promise.all(proArr).then(res => {
              if (this.editForm.setType) {
                if (res[0] && res[1]) {
                  this.$message.success("修改成功！");
                  this.seachClick("search");
                  this.dialogClose();
                } else {
                  if (!res[0]) {
                    this.$message.success("基本信息未成功修改！");
                  }
                  if (!res[1]) {
                    this.$message.success("卡券类型未成功修改！");
                  }
                }
              } else {
                if (res[0]) {
                  this.$message.success("修改成功！");
                  this.seachClick("search");
                  this.dialogClose();
                }
              }
            });
          }
        });
      } else {
        this.dialogClose();
      }
    },
    // 对加息率、定购返现金额数据进行截取格式化
    jieQu(type, num) {
      let reg = /\./gi;
      if (reg.test(num)) {
        // 有小数点
        let arr = num.split(".");

        if (type === "ORDER") {
          // 定购券
          return `${arr[0]}.${arr[1].slice(0, 2)}`;
        } else {
          // 加息
          return `${arr[0]}.${arr[1].slice(0, 1)}`;
        }
      } else {
        if (type === "ORDER") {
          // 定购券
          return (+num).toFixed(2);
        } else {
          // 加息
          return (+num).toFixed(1);
        }
      }
    },
    // 详情
    xiangqing(data) {
      sessionStorage.setItem("page", "卡券详情");
      sessionStorage.setItem("couponItem", JSON.stringify(data));
      this.$router.push({
        name: "coupon_info"
      });
    },
    ///////////////////////////////////////////////////////////
    // 右侧产品、银行表格里的操作
    tableEmitEdit(data, type) {
      console.log(data);
      console.log(type);

      let obj = {
        data: []
      };
      this.setTable(obj);
    },
    // 右侧列表的搜索
    toSearch(type) {
      let obj = {};
      if (type === "bank") {
        if (this.bankListSearch.name) {
          obj.name = this.bankListSearch.name;
        }
        obj.pageSize = this.bankList.pageSize;
        obj.pageNum = this.bankList.pageNum;

        // this.bankList.total = res.data.total > 0 ? res.data.total : 1;
        // this.bankList.data.title = [
        //   {
        //     title: "卡券名称",
        //     key: "name",
        //     minWidth: "80"
        //   }
        // ];
        // this.bankList.data.custom = [
        //   {
        //     text: "使用",
        //     type: "warning",
        //     size: "small",
        //     emit: "toUse"
        //   }
        // ];
        // this.bankList.data.list = [...res.data.list];
      }
      if (type === "product") {
        if (this.productListSearch.name) {
          obj.name = this.productListSearch.name;
        }
        obj.pageSize = this.productList.pageSize;
        obj.pageNum = this.productList.pageNum;

        // this.productList.total = res.data.total > 0 ? res.data.total : 1;
        // this.productList.data.title = [
        //   {
        //     title: "卡券名称",
        //     key: "name",
        //     minWidth: "80"
        //   }
        // ];
        // this.productList.data.custom = [
        //   {
        //     text: "使用",
        //     type: "warning",
        //     size: "small",
        //     emit: "toUse"
        //   }
        // ];
        // this.productList.data.list = [...res.data.list];
      }
    },
    // 右侧列表的重置
    resetSearch(type) {
      if (type === "bank") {
        this.bankListSearch = {
          name: ""
        };
        this.bankList.pageSize = 10;
        this.bankList.pageNum = 1;
      }
      if (type === "product") {
        this.productListSearch = {
          name: ""
        };
        this.productList.pageSize = 10;
        this.productList.pageNum = 1;
      }
      this.toSearch(type);
    },
    // 当重新输入查询字段时，重置分页
    inputChange(type) {
      if (type === "bank") {
        this.bankList.pageSize = 10;
        this.bankList.pageNum = 1;
      }
      if (type === "product") {
        this.productList.pageSize = 10;
        this.productList.pageNum = 1;
      }
    },
    // 修改关联
    editGuanLian(data) {
      this.$api
        .get_guanlian({
          vm: this,
          data: data.id
        })
        .then(res => {
          if (res) {
            this.guanlianForm.id = data.id;
            this.setTable(res);
          }
        });
    },
    // 设置已添加表格
    setTable(res) {
      this.guanlianForm.guanlian.dataTotal = res.data.map(item => {
        item.type = item.type === "PRD" ? "产品" : "银行";
        return item;
      });
      this.guanlianForm.show = true;
    },
    // 已关联的产品、银行表格的操作
    tableAct(data) {
      let arr = JSON.parse(
        JSON.stringify(this.guanlianForm.forForms.dataTotal)
      );
      this.guanlianForm.forForms.dataTotal = [];
      arr = arr.filter(item => item.targetId != data.data.targetId);
      this.$nextTick(() => {
        this.guanlianForm.forForms.dataTotal = arr;
      });
    },
    // 关联弹框的保存、取消按钮
    guanlianDia(type) {
      if (type) {
        if (this.guanlianForm.forForms.dataTotal.length > 0) {
          let arr = this.guanlianForm.forForms.dataTotal.map(item => {
            let obj = {
              type: item.type === "产品" ? "PRD" : "BANK",
              name: item.name,
              targetId: item.targetId
            };
            return obj;
          });

          let obj = {
            id: this.guanlianForm.id,
            bankPrdList: arr
          };
          this.$api
            .put_guanlian({
              vm: this,
              data: obj
            })
            .then(res => {
              if (res) {
                this.$message.success("修改关联成功！");
                this.dialogClose();
              }
            });
        } else {
          this.$message.error("没有关联数据可上传！");
        }
      } else {
        this.dialogClose();
      }
    },
    //////////////////////////////////////////////////////////////////////
    // 用户权限判定，之后表格右侧会有不同的操作按钮
    canDoWhat() {
      let quanxian = JSON.parse(sessionStorage.getItem("buttenpremissions"));
      let market_coupon_add = quanxian.includes("market_coupon_add");
      // let market_coupon_del = quanxian.includes("market_coupon_del");
      let market_coupon_upd = quanxian.includes("market_coupon_upd");
      let market_coupon_detail = quanxian.includes("market_coupon_detail");
      // let market_coupon_upd_num = quanxian.includes("market_coupon_upd_num");
      if (market_coupon_add) {
        this.tableInputData.data.quanxian.push("market_coupon_add");
      }
      if (market_coupon_upd) {
        this.tableInputData.data.quanxian.push("market_coupon_upd");
        this.tableInputData.data.custom.push({
          text: "修改",
          type: "warning",
          size: "small",
          emit: "edit"
        });
      }
      if (market_coupon_detail) {
        this.tableInputData.data.quanxian.push("market_coupon_detail");
        this.tableInputData.data.custom.push({
          text: "卡券详情",
          type: "success",
          size: "small",
          emit: "xiangqing"
        });
      }
      this.tableInputData.data.custom.push({
        text: "更改状态",
        type: "info",
        size: "small",
        emit: "changeStatue"
      });
      this.tableInputData.data.custom.push({
        text: "更改关联",
        type: "primary",
        size: "small",
        emit: "guanlian"
      });
    },
    // 获取数据后的处理
    afterGetData(data) {
      new Promise(resolve => {
        this.tableInputData.total = data.total;
        this.tableInputData.pageSize = data.pageSize;
        this.tableInputData.pageNum = data.pageNum;
        // title 里显示的没有额外设置的表头，其他有额外设置的，需要另添加
        this.tableInputData.data.title = [
          {
            title: "卡券名称",
            key: "name",
            minWidth: "120"
          },
          {
            title: "卡券使用类型",
            key: "typeFrom",
            minWidth: "140"
          },
          {
            title: "领取后有效时间(天)",
            key: "effectiveDays",
            minWidth: "170"
          },
          {
            title: "已领取数",
            key: "receivedCount",
            minWidth: "80",
            color: "blue"
          },
          {
            title: "已使用数",
            key: "usedCount",
            minWidth: "80",
            color: "green"
          },
          {
            title: "剩余",
            key: "surplusCount",
            minWidth: "80",
            color: "grey"
          },
          {
            title: "领取限制(张)",
            key: "receiveLimit",
            minWidth: "100",
            color: "grey"
          },
          {
            title: "发放总数",
            key: "totalCount",
            minWidth: "80",
            color: "red"
          },
          {
            title: "创建时间",
            key: "gmtCreated",
            minWidth: "170"
          },
          {
            title: "创建人",
            key: "creatorName",
            minWidth: "100"
          },
          {
            title: "状态",
            key: "statueText",
            minWidth: "100"
          }
        ];

        // 设置表格有额外设置的数据
        // table里是读取 actions 里是否有 switch 属性决定是否显示switch模块
        // 同时，switch 有固定的属性要求，所以需要把服务器返回的属性换个名字
        this.tableInputData.data.list = data.list.map(item => {
          let obj = {},
            arr = Object.keys(item);
          arr.forEach(str => {
            obj[str] = item[str];
            //
            // 将 shelfStatus 属性换成 action 属性
            if (str === "status") {
              delete obj[str];
              // GRANTING("发放中"),STOP("停止发放"),CANCEL("作废")
              switch (item[str]) {
                case "CANCEL":
                  obj["statue"] = item[str];
                  obj["statueText"] = "作废";
                  obj.show = [];
                  break;
                case "GRANTING":
                  obj["statue"] = item[str];
                  obj["statueText"] = "发放中";
                  break;
                case "STOP":
                  obj["statue"] = item[str];
                  obj["statueText"] = "已停止";
                  break;
              }
            }
            if (str === "type") {
              // 卡券类型:INCREASE("加息券"),EXPERIENCE("体验金券"),ORDER("定购券")
              switch (item[str]) {
                case "INCREASE":
                  obj["typeFrom"] = "加息券";
                  break;
                case "EXPERIENCE":
                  obj["typeFrom"] = "体验金券";
                  break;
                case "ORDER":
                  obj["typeFrom"] = "定购券";
                  break;
              }
            }
          });
          return obj;
        });
        resolve(data);
      }).then(() => {
        this.loadEnd = true;
        return true;
      });
    },
    // 查询、重置
    seachClick(type) {
      // search  查询
      // reset  重置
      // fenye  分页
      let obj = {};
      switch (type) {
        case "search":
          Object.keys(this.ruleForm).forEach(str => {
            if (this.ruleForm[str]) {
              obj[str] = this.ruleForm[str];
            }
          });

          this.tableInputData.pageSize = 10;
          this.tableInputData.pageNum = 1;
          obj.pageSize = this.tableInputData.pageSize;
          obj.pageNum = this.tableInputData.pageNum;
          this.getUserData(obj);
          break;
        case "reset":
          this.ruleForm = {
            name: "", // 卡券名称
            type: "", // 卡券类别
            activityId: "", //关联的活动
            bankId: "", // 关联的银行
            status: "", // 券状态
            productId: "", // 关联产品
            isReplacement: "", // 是否为补发券
            isWarning: "" // 是否达到预警
          };
          this.tableInputData.pageSize = 10;
          this.tableInputData.pageNum = 1;
          this.getUserData();
          break;
        case "fenye":
          if (this.ruleForm.name) {
            obj.name = this.ruleForm.name;
          }
          if (this.ruleForm.type) {
            obj.type = this.ruleForm.type;
          }
          if (this.ruleForm.status) {
            obj.status = this.ruleForm.status;
          }
          obj.pageSize = this.tableInputData.pageSize;
          obj.pageNum = this.tableInputData.pageNum;
          this.getUserData(obj);
          break;
      }
    },
    // 获取用户表格数据
    getUserData(data) {
      let obj;
      if (data) {
        obj = data;
      } else {
        obj = {
          pageSize: this.tableInputData.pageSize,
          pageNum: this.tableInputData.pageNum
        };
      }
      this.$api
        .market_create_getCouponList({
          vm: this,
          data: obj
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

<style lang="scss" scoped>
.toCreateBtn {
  padding-bottom: 5px;
}
.forBaiFenHao,
.addDanWei {
  width: 250px;
  position: relative;
}
.addDanWei::after {
  content: "张";
  position: absolute;
  right: -20px;
  top: 2px;
  font-weight: bold;
  font-size: 14px;
}
.forMoney,
.forDays {
  width: 180px;
  position: relative;
}
.forDays::after {
  content: "天";
  position: absolute;
  right: -20px;
  top: 0;
  font-weight: bold;
  font-size: 14px;
  color: rgb(99, 97, 97);
}
.forMoney + span,
.addDanWei + span {
  position: absolute;
  right: 0px;
  top: 24px;
  display: inline-block;
  vertical-align: middle;
  color: rgb(189, 184, 184);
  font-size: 12px;
}
.forBaiFenHao::after {
  content: "%";
  position: absolute;
  right: -20px;
  top: 0;
  font-weight: bold;
  font-size: 14px;
  color: rgb(99, 97, 97);
}
</style>

