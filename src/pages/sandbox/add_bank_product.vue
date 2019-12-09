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
            @change="setProduct"
            filterable
            v-model="ruleForm.bank"
            clearable
            placeholder="请选择"
            style="width:480px;"
          >
            <el-option-group v-for="group in kkk" :key="group.label" :label="group.label">
              <el-option
                v-for="item in group.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
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
              :key="item.value"
              :label="item.label"
              :value="item.value"
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
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="至" prop="endTime" label-width="40px">
            <el-date-picker
              v-model="ruleForm.endTime"
              size="mini"
              type="datetime"
              placeholder="结束时间(选填)"
            ></el-date-picker>
          </el-form-item>
        </div>

        <el-form-item label="配置条件：" size="mini" prop="peizhi">
          <div class="everyTJ" v-for="(tar,index) in ruleForm.peizhi.one" :key="tar.num">
            <div>
              <p class="canseeTitle" v-if="tar.type===1">可见条件：</p>
              <p class="notseeTitle" v-if="tar.type===2">不可见条件：</p>
              <ul>
                <p class="everyTJ_kong" v-if="!tar.tiaojian.length" @click="action(1)">编辑限制条件</p>
                <li v-for="can in tar.tiaojian" :key="can">{{can}}</li>
              </ul>
              <div class="icon5" v-if="!!tar.tiaojian.length">
                <i class="el-icon-edit" title="编辑" @click="action(2,tar)"></i>
                <i class="el-icon-delete" title="删除" @click="action(3,tar)"></i>
              </div>
            </div>
            <el-radio-group v-if="index!== 1" v-model="tar.howOne" size="mini" class="howCan_Not">
              <el-radio-button label="且"></el-radio-button>
              <el-radio-button label="或"></el-radio-button>
            </el-radio-group>
          </div>
          <p class="add_new_guize" v-if="ruleForm.peizhi.one.length < 2">
            <span @click="addOne">新增条件</span>
          </p>

          <!-- 一类条件和二类条件中间 -->
          <el-radio-group v-model="ruleForm.peizhi.one_two" size="mini" class="howCan_Not">
            <el-radio-button label="且"></el-radio-button>
            <el-radio-button label="或"></el-radio-button>
          </el-radio-group>

          <div class="everyTJ" v-for="(tar,index) in ruleForm.peizhi.two" :key="tar.num">
            <div>
              <p class="canseeTitle" v-if="tar.type===1">可见条件：</p>
              <p class="notseeTitle" v-if="tar.type===2">不可见条件：</p>
              <ul>
                <p class="everyTJ_kong" v-if="!tar.tiaojian.length" @click="action(4)">编辑限制条件</p>
                <li v-for="can in tar.tiaojian" :key="can">{{can}}</li>
              </ul>
              <div class="icon5" v-if="!!tar.tiaojian.length">
                <i class="el-icon-edit" title="编辑" @click="action(2,tar)"></i>
                <i class="el-icon-delete" title="删除" @click="action(3,tar)"></i>
              </div>
            </div>

            <el-radio-group
              v-if="index<ruleForm.peizhi.two.length-1"
              v-model="tar.howTwo"
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
        </el-form-item>
      </el-form>
    </div>
    <addTiaoJian
      @TiaoJianEmit="TiaoJianEmit"
      :class="{'AddTiaoJian':true,'addTiaoJian':toAdd,'notAddTiaoJian':!toAdd}"
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
      env: "",
      pageName: "",
      kkk: [
        {
          label: "未配置过",
          options: [
            {
              value: "Shanghai",
              label: "上海"
            },
            {
              value: "Beijing",
              label: "北京"
            }
          ]
        },
        {
          label: "已配置过",
          options: [
            {
              value: "Chengdu",
              label: "成都"
            },
            {
              value: "Shenzhen",
              label: "深圳"
            },
            {
              value: "Guangzhou",
              label: "广州"
            },
            {
              value: "Dalian",
              label: "大连"
            }
          ]
        }
      ],
      productList: [], // 银行产品
      ruleForm: {},
      rules: {},
      num: 1 // 用于计数
    };
  },
  created() {
    this.env = sessionStorage.getItem("env") === "development";
    this.pageType = this.$route.query.from;
    switch (this.pageType) {
      case "bank":
        this.ruleForm = {
          bank: "",
          peizhi: {
            one: [
              {
                num: this.num,
                tiaojian: [],
                howOne: "",
                type: 3 // 可见
              }
            ],
            one_two: "且",
            two: []
          },
          startTime: "",
          endTime: ""
        };
        this.rules = {
          bank: [{ required: true, message: "请选择银行", trigger: "change" }],
          peizhi: [
            { required: true, validator: this.check_peizhi, trigger: "blur" }
          ],
          startTime: [
            { required: true, message: "请选择生效开始时间", trigger: "change" }
          ],
          endTime: [
            {
              validator: this.check_endTime,
              message: "结束时间不得早于或等于开始时间",
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
      case "bank_product":
        this.ruleForm = {
          bank: "",
          product: "",
          peizhi: {
            one: [
              {
                num: this.num,
                tiaojian: [],
                howOne: "",
                type: 3 // 可见
              }
            ],
            one_two: "或",
            two: []
          },
          startTime: "",
          endTime: ""
        };
        this.rules = {
          bank: [{ required: true, message: "请选择银行", trigger: "change" }],
          peizhi: [
            { required: true, validator: this.check_peizhi, trigger: "blur" }
          ],
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
    check_startTime() {
      if (!this.ruleForm.startTime) {
        arguments[2](new Error("请输入开始时间"));
      } else if (
        this.ruleForm.endTime &&
        this.ruleForm.startTime >= this.ruleForm.endTime
      ) {
        arguments[2](new Error("结束时间不得早于或等于开始时间"));
      } else {
        arguments[2]();
      }
    },
    check_endTime() {
      if (this.ruleForm.startTime >= this.ruleForm.endTime) {
        arguments[2](new Error("结束时间不得早于或等于开始时间"));
      } else {
        arguments[2]();
      }
    },
    check_peizhi(rule, value, callback) {
      console.log(rule);

      console.log(value);
      console.log(callback);

      // if (value.length) {
      //   callback();
      // } else {
      //   callback(new Error("请输入配置内容！"));
      // }
    },
    addOne() {
      if (this.ruleForm.peizhi.one.length < 2) {
        this.num++;
        this.ruleForm.peizhi.one.push({
          num: this.num,
          tiaojian: ["≥22岁", "本银行已开户", "辽宁省-沈阳市"],
          howOne: "且",
          type: 1 // 可见
        });
      }
    },
    addTwo() {
      this.num++;
      this.ruleForm.peizhi.two.push({
        num: this.num * 1000,
        tiaojian: ["≥22岁", "本银行已开户", "辽宁省-沈阳市", "1218理财节"],
        howTwo: "且",
        type: 2 // 可见
      });
    },
    // 编辑、删除图标
    action(num, tar) {
      switch (num) {
        case 1: // 首次添加一类条件
          this.toAdd = true;
          break;
        case 2: // 编辑
          this.toAdd = true;
          console.log(tar);
          break;
        case 3: // 删除
          this.$confirm("确定放弃已经添加好的条件吗？")
            .then(() => {
              console.log(tar);
            })
            .catch(() => {});
          break;
        case 4: // 首次添加二类条件
          this.toAdd = true;
          break;
      }
    },
    TiaoJianEmit(data) {
      if (data) {
        console.log(data);
      }
      this.toAdd = false;
    },
    // 根据银行获取产品
    setProduct() {
      this.productList = [
        {
          value: "Shanghai",
          label: "上海"
        },
        {
          value: "Beijing",
          label: "北京"
        }
      ];
    },
    // 提交
    save() {
      console.log(9);
    },

    back() {
      this.$confirm("确定放弃已经添加好的条件吗？")
        .then(() => {})
        .catch(() => {});
    }
  }
};
</script>
