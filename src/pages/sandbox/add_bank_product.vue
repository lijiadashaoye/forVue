<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
    </div>
    <div id="forTable" style="padding-bottom:0; background: #fff;padding:25px 15px;">
      <el-form ref="ruleForm" :rules="rules" :model="ruleForm" label-width="100px">
        <el-form-item label="银行：" size="mini" prop="bank">
          <el-select
            filterable
            v-model="ruleForm.bank"
            clearable
            placeholder="请选择"
            style="width:480px;"
            @visible-change="bankBlur($event)"
            @clear="bankBlur"
          >
            <el-option-group v-for="group in bankList" :key="group.label" :label="group.label">
              <el-option
                v-for="item in group.options"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                :disabled="item.use"
              ></el-option>
            </el-option-group>
          </el-select>
        </el-form-item>

        <el-form-item label="银行产品：" size="mini" prop="product" v-if="pageType==='bank_product'">
          <el-select
            :disabled="!productList.length"
            filterable
            v-model="ruleForm.product"
            clearable
            placeholder="请选择"
            style="width:480px;"
          >
            <el-option
              v-for="item in productList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <div style="display:flex;">
          <el-form-item label="生效时间：" prop="startTime">
            <el-date-picker
              v-model="ruleForm.startTime"
              size="mini"
              type="datetime"
              placeholder="开始时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="至" prop="endTime" label-width="40px">
            <el-date-picker
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="ruleForm.endTime"
              size="mini"
              type="datetime"
              placeholder="结束时间(选填)"
            ></el-date-picker>
          </el-form-item>
        </div>

        <el-form-item label="配置条件：" size="mini">
          <div class="everyTJ" v-for="(tar,index) in ruleForm.peizhi.one" :key="tar.num">
            <div>
              <p class="canseeTitle" v-if="tar.type===1">可见条件：</p>
              <p class="notseeTitle" v-if="tar.type===2">不可见条件：</p>
              <ul>
                <p
                  class="everyTJ_kong"
                  v-if="!tar.tiaojian.length"
                  @click="action({num:1,data:tar})"
                >编辑限制条件</p>
                <li v-for="can in tar.tiaojian" :key="can.num">
                  <div
                    v-if="can.showDatas.length>0&&can.text!=='限制地域'&&can.text!=='产品展示位置与时间'"
                    class="showSheng1"
                  >
                    <span style="font-weight:bold;">{{can.text+'：'}}</span>
                    <span v-for="t in can.showDatas" :key="t.num">{{t}}</span>
                  </div>

                  <div
                    v-if="can.showDatas.length>0&&can.text!=='限制地域'&&can.text==='产品展示位置与时间'"
                    class="showSheng3"
                  >
                    <div v-for="t in can.showDatas" :key="t.num">
                      <p>
                        <span style="font-weight:bold;">位置：</span>
                        <span>{{t.side}}</span>
                      </p>
                      <p>
                        <span style="font-weight:bold;">时间：</span>
                        <span>{{t.time}}</span>
                      </p>
                    </div>
                  </div>

                  <div
                    v-if="can.showDatas.length>0&&can.text==='限制地域'&&can.text!=='产品展示位置与时间'"
                    class="showSheng2"
                  >
                    <div v-for="t in can.showDatas" :key="t.num">
                      <p>
                        <span style="font-weight:bold;">省名称：</span>
                        <span>{{t.sheng.name}}</span>
                      </p>
                      <p>
                        <span style="font-weight:bold;">市名称：</span>
                        <span v-for="(shi,index) in t.shi" :key="shi+index">{{shi.name}}</span>
                      </p>
                      <p>
                        <span style="font-weight:bold;">限制条件：</span>
                        <span v-for="(j,index) in t.tiaojian" :key="j+index">{{j}}</span>
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
              <div class="icon5" v-if="!!tar.tiaojian.length">
                <i class="el-icon-edit" title="编辑" @click="action({num:1,data:tar})"></i>
                <i class="el-icon-delete" title="删除" @click="action({num:2,data:tar,from:'one'})"></i>
              </div>
            </div>
            <el-radio-group v-if="index!== 1" v-model="tar.how" size="mini" class="howCan_Not">
              <el-radio-button label="且"></el-radio-button>
              <el-radio-button label="或"></el-radio-button>
            </el-radio-group>
          </div>
          <p class="add_new_guize" v-if="ruleForm.peizhi.one.length < 2">
            <span @click="addOne">新增条件</span>
          </p>

          <!-- 一类条件和二类条件中间 -->
          <el-radio-group
            v-model="ruleForm.peizhi.one_two"
            size="mini"
            class="howCan_Not"
            v-if="ruleForm.peizhi.two.length>0"
          >
            <el-radio-button label="且"></el-radio-button>
            <el-radio-button label="或"></el-radio-button>
          </el-radio-group>

          <!-- 二类条件 -->
          <div class="everyTJ" v-for="(tar,index) in ruleForm.peizhi.two" :key="tar.num">
            <div>
              <p class="canseeTitle" v-if="tar.type===1">可见条件：</p>
              <p class="notseeTitle" v-if="tar.type===2">不可见条件：</p>
              <ul>
                <p
                  class="everyTJ_kong"
                  v-if="!tar.tiaojian.length"
                  @click="action({num:1,data:tar})"
                >编辑限制条件</p>

                <li v-for="can in tar.tiaojian" :key="can.num">
                  <div
                    v-if="can.showDatas.length>0&&can.text!=='限制地域'&&can.text!=='产品展示位置与时间'"
                    class="showSheng1"
                  >
                    <span style="font-weight:bold;">{{can.text+'：'}}</span>
                    <span v-for="t in can.showDatas" :key="t.num">{{t}}</span>
                  </div>

                  <div
                    v-if="can.showDatas.length>0&&can.text!=='限制地域'&&can.text==='产品展示位置与时间'"
                    class="showSheng3"
                  >
                    <div v-for="t in can.showDatas" :key="t.num">
                      <p>
                        <span style="font-weight:bold;">位置：</span>
                        <span>{{t.side}}</span>
                      </p>
                      <p>
                        <span style="font-weight:bold;">时间：</span>
                        <span>{{t.time}}</span>
                      </p>
                    </div>
                  </div>

                  <div
                    v-if="can.showDatas.length>0&&can.text==='限制地域'&&can.text!=='产品展示位置与时间'"
                    class="showSheng2"
                  >
                    <div v-for="t in can.showDatas" :key="t.num">
                      <p>
                        <span style="font-weight:bold;">省名称：</span>
                        <span>{{t.sheng.name}}</span>
                      </p>
                      <p>
                        <span style="font-weight:bold;">市名称：</span>
                        <span v-for="(shi,index) in t.shi" :key="shi+index">{{shi.name}}</span>
                      </p>
                      <p>
                        <span style="font-weight:bold;">限制条件：</span>
                        <span v-for="(j,index) in t.tiaojian" :key="j+index">{{j}}</span>
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
              <div class="icon5" v-if="!!tar.tiaojian.length">
                <i class="el-icon-edit" title="编辑" @click="action({num:1,data:tar})"></i>
                <i class="el-icon-delete" title="删除" @click="action({num:2,data:tar,from:'two'})"></i>
              </div>
            </div>

            <el-radio-group
              v-if="index<ruleForm.peizhi.two.length-1"
              v-model="tar.how"
              size="mini"
              class="howCan_Not"
            >
              <el-radio-button label="且"></el-radio-button>
              <el-radio-button label="或"></el-radio-button>
            </el-radio-group>
          </div>
          <p class="add_new_guize" v-if="!!ruleForm.peizhi.two.length">
            <span @click="addTwo">新增条件</span>
          </p>
          <p class="everyTJ_kong1" v-if="!ruleForm.peizhi.two.length" @click="addTwo">新增条件</p>
        </el-form-item>

        <el-form-item>
          <el-button size="mini" type="primary" @click="save">提交</el-button>
          <el-button size="mini" type="info" @click="back">取消</el-button>

          <el-button size="mini" type="info" @click="fuzhi">fuzhi</el-button>
        </el-form-item>
      </el-form>
    </div>
    <addTiaoJian
      v-if="toAdd2"
      @TiaoJianEmit="action"
      :class="{'AddTiaoJian':true,'addTiaoJian':toAdd,'notAddTiaoJian':!toAdd}"
      :type="pageType"
      :forEdit="editWhitch"
    />
  </div>
</template>

<script>
import addTiaoJian from "./com/set_tiaojian";
export default {
  components: { addTiaoJian },
  data() {
    return {
      toAdd: false, // 控制添加条件页面的显示
      toAdd2: false, // 控制添加条件页面的显示
      env: "",
      pageName: "",
      bankList: [],
      productList: [], // 银行产品
      ruleForm: {},
      rules: {},
      num: 1, // 用于计数
      editWhitch: null // 用于记录编辑条件时传递给子组件的数据
    };
  },
  created() {
    this.env = sessionStorage.getItem("env") === "development";
    this.pageType = this.$route.query.from;
    this.bankList = JSON.parse(this.$route.query.bankList);
    switch (this.pageType) {
      case "bank": // 银行管理
        this.ruleForm = {
          bank: "",
          peizhi: {
            one: [
              {
                num: ++this.num,
                tiaojian: [], // 对象数组
                how: "",
                type: 3 //  可见条件、不可见条件
              }
            ],
            one_two: "",
            two: []
          },
          startTime: "",
          endTime: ""
        };
        this.rules = {
          bank: [{ required: true, message: "请选择银行", trigger: "change" }],
          startTime: [
            {
              required: true,
              validator: this.check_startTime,
              trigger: "change"
            }
          ],
          endTime: [
            {
              validator: this.check_endTime,
              trigger: "change"
            }
          ]
        };

        if (this.$route.query.type === "edit") {
          this.pageName = sessionStorage.getItem("page") + " > 编辑配置-银行"; // 获取页面名称
        } else {
          this.pageName = sessionStorage.getItem("page") + " > 新增配置-银行"; // 获取页面名称
        }
        break;
      case "bank_product": // 银行产品管理
        this.ruleForm = {
          bank: "",
          product: "",
          peizhi: {
            one: [
              {
                num: ++this.num,
                tiaojian: [], // 对象数据
                how: "",
                type: 3 // 可见条件、不可见条件
              }
            ],
            one_two: "",
            two: []
          },
          startTime: "",
          endTime: ""
        };
        this.rules = {
          bank: [{ required: true, message: "请选择银行", trigger: "change" }],
          product: [
            { required: true, message: "请选择银行产品", trigger: "change" }
          ],
          startTime: [
            {
              required: true,
              validator: this.check_startTime,
              trigger: "change"
            }
          ],
          endTime: [
            {
              validator: this.check_endTime,
              trigger: "change"
            }
          ]
        };

        if (this.$route.query.type === "edit") {
          this.pageName = sessionStorage.getItem("page") + " > 编辑配置-产品"; // 获取页面名称
        } else {
          this.pageName = sessionStorage.getItem("page") + " > 新增配置-产品"; // 获取页面名称
        }
        break;
    }
  },

  methods: {
    // 选择银行的事件监听
    bankBlur(e) {
      if (e === false && this.ruleForm.bank !== "") {
        this.getProductList();
      } else {
        this.productList = [];
        this.ruleForm.product = "";
      }
    },
    // 根据银行选取产品
    getProductList() {
      this.$api
        .getProductList({
          vm: this,
          data: {
            ids: [this.ruleForm.bank]
          }
        })
        .then(res => {
          if (res) {
            this.productList = res.data[0].sandBoxProducts.map(item => ({
              id: item.productId,
              name: item.productName
            }));
          }
        });
    },
    // 选择时间的验证函数
    check_startTime() {
      if (!this.ruleForm.startTime) {
        arguments[2](new Error("请输入开始时间"));
      } else if (
        this.ruleForm.endTime &&
        this.ruleForm.startTime >= this.ruleForm.endTime
      ) {
        arguments[2](new Error("开始时间不得晚于或等于结束时间"));
      } else {
        arguments[2]();
      }
    },
    check_endTime() {
      if (!this.ruleForm.startTime) {
        arguments[2](new Error("没有开始时间，结束时间无效"));
        setTimeout(() => {
          this.ruleForm.endTime = "";
        }, 2000);
      } else {
        if (this.ruleForm.startTime >= this.ruleForm.endTime) {
          arguments[2](new Error("结束时间不得早于或等于开始时间"));
        } else {
          arguments[2]();
        }
      }
    },
    // 添加一类条件
    addOne() {
      if (this.ruleForm.peizhi.one.length < 2) {
        this.ruleForm.peizhi.one.push({
          num: ++this.num,
          tiaojian: [],
          how: "",
          type: 3 // 1可见，2不可见
        });
      } else {
        if (this.ruleForm.peizhi.one[0].tiaojian.length === 0) {
          this.$message.error("请先编辑好当前的条件!");
        } else {
          this.ruleForm.peizhi.one.push({
            num: ++this.num,
            tiaojian: [],
            how: "",
            type: 3 // 1可见，2不可见
          });
        }
      }
    },
    // 添加二类条件
    addTwo() {
      if (this.ruleForm.peizhi.two.length === 0) {
        this.ruleForm.peizhi.two.push({
          num: ++this.num,
          tiaojian: [],
          how: "",
          type: 3 // 1可见，2不可见
        });
        if (!this.ruleForm.peizhi.one_two) {
          this.ruleForm.peizhi.one_two = "或";
        }
      } else {
        let isHasEdit = ""; // 用来查看是否已添加好条件
        this.ruleForm.peizhi.two.forEach((tar, index) => {
          if (tar.tiaojian.length === 0) {
            isHasEdit = "请先编辑好当前的条件!";
          } else if (index > 0 && !this.ruleForm.peizhi.two[index - 1].how) {
            isHasEdit = "请先确认好条件之间的关系（且、或）！";
          }
        });
        if (isHasEdit !== "") {
          this.$message.error(isHasEdit);
        } else {
          this.ruleForm.peizhi.two.push({
            num: ++this.num,
            tiaojian: [],
            how: "",
            type: 3 // 1可见，2不可见
          });
        }
      }
    },
    // 新增、编辑、删除图标
    action(data) {
      switch (data.num) {
        case 1: // 编辑条件
          this.editWhitch = data.data;
          this.toAdd2 = true;
          setTimeout(() => {
            this.toAdd = true;
          }, 100);
          break;
        case 2: // 删除
          this.$confirm("确定放弃已经添加好的条件吗？")
            .then(() => {
              this.ruleForm.peizhi[data.from] = this.ruleForm.peizhi[
                data.from
              ].filter(ter => ter.num !== data.data.num);
            })
            .catch(() => {});
          break;
        case 3: // 什么也不做，只是关闭添加条件页面
          this.num = ++data.data;
          this.toAdd = false;
          setTimeout(() => {
            this.toAdd2 = false;
            this.editWhitch = null;
          }, 850);
          break;
      }
    },
    // 提交
    save() {
      sessionStorage.setItem("add_bank", JSON.stringify(this.ruleForm));
    },
    fuzhi() {
      this.ruleForm = JSON.parse(sessionStorage.getItem("add_bank"));
      console.log(this.ruleForm);
    },

    back() {
      this.$confirm("确定放弃已经添加好的条件吗？")
        .then(() => {})
        .catch(() => {});
    }
  }
};
</script>
