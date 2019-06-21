<template>
  <div class="componentWaper">
    <div id='forHeader'>
      <h3>{{pageName}}</h3>
    </div>
    <div
      style="overflow:auto;"
      id="forTable"
    >
      <el-form
        ref="ruleForm"
        size="normal"
        :model="ruleForm"
        label-width="150px"
        label-suffix=':'
        class="isForm"
        :rules="rules"
      >
        <el-form-item
          prop="institutionId"
          label="机构名称"
          style="position:relative"
          class="is50"
        >
          <el-select
            class="isInput"
            clearable
            placeholder="请选择"
            v-model="ruleForm.institutionId"
            @change="change_xilie(ruleForm.institutionId)"
          >
            <el-option
              size='mini'
              v-for="item in dictData.jigou"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>

          <a
            class="isA"
            @click="toJiGou"
          >无机构？</a>

        </el-form-item>

        <el-form-item
          label="产品系列"
          class="is50"
        >

          <el-select
            class="isInput"
            clearable
            placeholder="请选择"
            v-model="ruleForm.seriesId"
            @change="setXiLie(ruleForm.seriesId)"
          >
            <el-option
              size='mini'
              v-for="item in xilie"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <hr>

        <el-form-item
          label="产品名称"
          prop="name"
          class="is50"
        >
          <el-input
            class="isInput"
            clearable
            placeholder="请输入"
            v-model="ruleForm.name"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="产品别名"
          class="is50"
          prop="typeAlias"
        >
          <el-input
            class="isInput"
            clearable
            placeholder="请输入"
            v-model="ruleForm.typeAlias"
          ></el-input>

        </el-form-item>

        <el-form-item
          label="收益返还方式"
          style="position:relative"
          class="is50"
        >
          <el-select
            class="isInput"
            clearable
            placeholder="请选择"
            v-model="ruleForm.interestModeWay"
          >
            <el-option
              size='mini'
              v-for="item in dictData.income_return_way"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="付息频率"
          style="position:relative"
          class="is50"
        >
          <el-select
            class="isInput"
            clearable
            placeholder="请选择"
            v-model="ruleForm.frequencyType"
          >
            <el-option
              size='mini'
              v-for="item in dictData.frequency_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="所属区域"
          style="position:relative"
          class="is50"
        >
          <el-select
            class="isInput"
            clearable
            placeholder="请选择"
            v-model="ruleForm.area"
          >
            <el-option
              size='mini'
              v-for="item in dictData.quyu"
              :key="item.adcode"
              :label="item.name"
              :value="item.adcode"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="监管属性"
          style="position:relative"
          class="is50"
        >
          <el-select
            class="isInput"
            clearable
            placeholder="请选择"
            v-model="ruleForm.regulatoryProperty"
          >
            <el-option
              size='mini'
              v-for="item in dictData.regulatory_property"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="起存金额"
          prop="purchaseAmount"
          class="is50"
        >
          <el-input
            type="number"
            class="isInput"
            clearable
            v-model="ruleForm.purchaseAmount"
            placeholder="请输入"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="递增金额"
          prop="increaseAmount"
          class="is50"
        >
          <el-input
            class="isInput"
            clearable
            v-model="ruleForm.increaseAmount"
            placeholder="请输入"
            type='number'
          ></el-input>

        </el-form-item>

        <el-form-item
          label="标签"
          class="is50"
        >
          <el-select
            class="isInput"
            v-model="ruleForm.marks"
            clearable
            placeholder="请选择"
            multiple
          >
            <el-option
              size='mini'
              v-for="item in dictData.marks"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <span class="isA">
            <i
              title="标签：标签默认在首页排行榜单显示，活期存款展示前两个标签，智能存款展示前四个标签"
              class="myIcon14px icon-wenhaoyuanyiwenxianxing"
            ></i>
          </span>
        </el-form-item>

        <el-form-item
          size="mini"
          label="到期是否转存"
          class="is50"
          prop="renewal"
        >
          <el-radio-group
            v-model="ruleForm.renewal"
            class="isInput"
          >
            <el-radio-button
              label="是"
              class="isRadio"
            ></el-radio-button>
            <el-radio-button
              label="否"
              class="isRadio"
            ></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="支取时间"
          class="is50"
        >
          <el-select
            class="isInput"
            v-model="ruleForm.payTime"
            clearable
            placeholder="请选择"
          >
            <el-option
              size='mini'
              v-for="item in dictData.pay_time"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>

        </el-form-item>

        <el-form-item
          prop="description"
          label="产品描述"
        >
          <quill-editor
            class="isInput"
            v-model="ruleForm.description"
          >
          </quill-editor>
        </el-form-item>

        <el-form-item
          style="width:100%;"
          label="利率"
        >
          <div class="toaddlilv">
            <span @click="addNewLilv">新增利率(点击添加)</span>
          </div>
          <ul class="isTable">
            <li class="isLi">
              <span
                v-for="(tit,ind) in addLilvTable.title"
                :key='ind'
              >
                {{tit}}
              </span>
            </li>
            <li
              class="isLi2"
              :class="index%2!==0?'isOdd':''"
              v-for="(data,index) in addLilvTable.datas"
              :key='index'
            >
              <span style="width:150px;">{{index+1}}</span>
              <span>
                <el-input
                  type="number"
                  v-model="data.limit"
                  size="mini"
                  placeholder="请输入"
                ></el-input>
              </span>
              <span>
                <el-select
                  size="mini"
                  placeholder="请选择"
                  v-model="data.danwei"
                >
                  <el-option
                    size='mini'
                    v-for="item in dictData.deadline_type"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </span>
              <span>
                <el-input
                  type='number'
                  v-model="data.lilv"
                  size="mini"
                  placeholder="请输入"
                ></el-input>
              </span>
              <span>
                <el-input
                  type="number"
                  v-model="data.lockinPeriod"
                  size="mini"
                  placeholder="请输入"
                ></el-input>
              </span>

              <span>
                <el-input
                  v-model="data.beizhu"
                  size="mini"
                  placeholder="请输入"
                ></el-input>
              </span>

              <span>
                <el-select
                  size="mini"
                  placeholder="请选择"
                  v-model="data.showList"
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
              </span>
              <span>
                <el-select
                  size="mini"
                  placeholder="请选择"
                  v-model="data.lockinShowList"
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
              </span>

              <div
                style="width:30px;cursor: pointer;flex-shrink: 0"
                @click="toShowProp(data)"
              >
                删除
              </div>

            </li>
            <li class="nextPage">
              <span>总共：{{addLilvTable.total}} </span>
              <span>第{{addLilvTable.pageNum+1}}页</span>
              <span @click="pageStep(true)">上一页</span>
              <span @click="pageStep(false)">下一页</span>
            </li>
          </ul>
        </el-form-item>

      </el-form>

      <div class="nextButtons">
        <el-button
          size="mini"
          type="primary"
          @click="next"
        >下一步</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button
          size="mini"
          type="info"
          @click="back"
        >取消</el-button>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  props: {},
  data() {
    // 验证数字
    var checkNum3 = (rule, value, callback) => {
      if (value < 0) {
        callback(new Error("请输入正数"));
      } else if (("" + value).length > 19 || ("" + value).length < 0) {
        callback(new Error("请输入1-19字符"));
      } else {
        callback();
      }
    };
    return {
      xilie: [], // 从服务器返回的产品系列数据
      pageName: "", // 当前页面名字
      dictData: {}, // 字典数据
      ruleForm: {
        institutionId: "", // 机构名称
        seriesId: "", // 产品系列ID
        name: "", // 产品名称
        typeAlias: "", // 产品类型（类别别名）
        interestModeWay: "", // 收益返还方式
        frequencyType: "", // 付息频率
        regulatoryProperty: "", // 监管属性
        purchaseAmount: "", // 起存金额
        increaseAmount: "", // 递增金额
        marks: [], // 标签
        renewal: "", // 到期是否转存
        payTime: "", // 支付时间
        description: "", // 产品描述
        area: "", // 所属区域
        lilv: []
      },
      shelveList: [
        {
          label: "是",
          value: "YES"
        },
        {
          label: "否",
          value: "NO"
        }
      ],
      // 新建智能存款底下的利率选项
      addLilvTable: {
        pageNum: 0,
        total: 0,
        title: [
          "序号",
          "* 期限",
          "* 期限单位",
          "* 利率%",
          "* 锁定期限",
          "备注",
          "榜单展示",
          "锁定期榜单展示",
          "操作"
        ],
        dataTotal: [], //
        datas: [] // 用来进行分页展示时的当前展示数据
      },
      //表单验证
      rules: {
        institutionId: [
          { required: true, message: "请选择机构名称", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入产品名称", trigger: "blur" },
          { min: 1, max: 19, message: "最多输入32个字", trigger: "blur" }
        ],
        typeAlias: [
          { min: 1, max: 19, message: "最多输入32个字", trigger: "blur" }
        ],
        description: [
          { min: 1, max: 200, message: "最多输入200个字", trigger: "blur" }
        ],
        purchaseAmount: [{ validator: checkNum3, trigger: "blur" }],
        increaseAmount: [{ validator: checkNum3, trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.pageName = sessionStorage.getItem("page") + " > 新增定期存款第一步"; // 获取页面名称
    this.dictData = JSON.parse(sessionStorage.getItem("dict"));
    // 如果有数据，则表示是编辑过的，如果没有，那就是从mainpage过来的
    let dingqi_step1 = sessionStorage.getItem("dingqi_step1");
    // 获取选定的机构
    let jigouData = JSON.parse(sessionStorage.getItem("xilie_jigou"));
    this.change_xilie(jigouData.institutionId);

    if (dingqi_step1) {
      this.ruleForm = JSON.parse(dingqi_step1);
      this.addLilvTable.total = this.ruleForm.lilv.length;
      this.addLilvTable.dataTotal = this.ruleForm.lilv;
      this.addLilvTable.datas = this.ruleForm.lilv.slice(0, 5);
    } else {
      this.ruleForm.institutionId = jigouData.institutionId;
      if (jigouData.id) {
        this.ruleForm.seriesId = jigouData.id;
      }
    }
  },

  methods: {
    // 变更产品系列后，要保存选择的系列，等回到当前页面后数据能对应上
    setXiLie(data) {
      let tar = this.xilie.filter(item => item.id === data);
      sessionStorage.setItem("xilie_jigou", JSON.stringify(tar[0]));
    },
    // 变更机构后，要对应调整系列
    change_xilie(id) {
      // 根据机构id，获取对应的产品系列
      let xilieData = JSON.parse(sessionStorage.getItem("xilie_data"));
      this.xilie = xilieData.filter(
        item => item.institutionId === id
      )[0].seriesList;

      if (this.ruleForm.seriesId != "") {
        this.ruleForm.seriesId = "";
      }
    },
    /*****************************************************************************************************/
    // 下一步
    next() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.addLilvTable.dataTotal.length) {
            let arr = [];
            // 检查利率列表是否必填项已经填写
            this.addLilvTable.dataTotal.forEach(item => {
              if (item.limit && item.danwei && item.lilv && item.lockinPeriod) {
                arr.push(item);
              }
            });

            if (this.addLilvTable.total != arr.length) {
              this.$confirm(
                `利率列表里有些必填项没有数据，将不被保存，是否继续下一步？`
              )
                .then(() => {
                  this.ruleForm.lilv = this.geshihua(arr);
                  sessionStorage.setItem(
                    "dingqi_step1",
                    JSON.stringify(this.ruleForm)
                  );
                  this.$router.push({
                    name: "dingqi_step2"
                  });
                })
                .catch(() => {});
            } else {
              this.ruleForm.lilv = this.geshihua(arr);
              sessionStorage.setItem(
                "dingqi_step1",
                JSON.stringify(this.ruleForm)
              );
              this.$router.push({
                name: "dingqi_step2"
              });
            }
          } else {
            this.$message.error("请填写利率数据！");
          }
        }
      });
    },
    // 对利率表格数据进行格式化
    geshihua(arr) {
      let newArr = [];
      arr.forEach(tar => {
        let strArr = Object.keys(tar),
          obj = {};
        strArr.forEach(item => {
          if (item === "limit" || item === "lilv" || item === "lockinPeriod") {
            obj[item] = +tar[item];
          } else {
            obj[item] = tar[item];
          }
        });
        newArr.push(obj);
      });
      return newArr;
    },
    // 取消
    back() {
      this.$router.push({
        name: "deposit_mainPage"
      });
    },

    // 新增利率(点击添加)
    addNewLilv() {
      let i = this.addLilvTable.total;
      let obj = {
        id: i,
        limit: "", // 期限
        danwei: "", // 单位
        lilv: "", // 利率
        lockinPeriod: "", // 锁定期限
        beizhu: "", // 备注
        showList: "", // 榜单展示
        lockinShowList: "" // 锁定期榜单展示
      };

      this.addLilvTable.dataTotal.unshift(obj);
      this.addLilvTable.total += 1;
      let num = this.addLilvTable.dataTotal.length;
      if (num <= 5) {
        this.addLilvTable.datas = this.addLilvTable.dataTotal.slice();
      } else {
        this.addLilvTable.datas = this.addLilvTable.dataTotal.slice(0, 5);
      }
    },
    // 显示删除确认框
    toShowProp(tar) {
      this.$confirm(`确定要删除吗？`)
        .then(() => {
          this.toDelete(tar);
        })
        .catch(() => {});
    },
    // 删除利率
    toDelete(item) {
      let num = item;
      let obj = this.addLilvTable;

      obj.dataTotal = obj.dataTotal.filter(item => item.id != num.id); // 从总数据中删除要删除的
      obj.datas = obj.datas.filter(item => item.id != num.id); // 更新当前页显示的
      obj.total = obj.dataTotal.length; // 更新总量数

      let arr = [];
      let isShowd = obj.datas;
      // 如果总数大于当前显示的数量，将删除项后边一位的数据补充到datas进行显示
      if (obj.dataTotal.length > isShowd.length) {
        for (let i = isShowd.length; i--; ) {
          arr.push(isShowd[i].id);
        }

        let ids = Math.max(...arr) + 1; // 旧的显示列表id最大的一项的后一项，以索引评判
        let item = null;
        for (let i = obj.dataTotal.length; i--; ) {
          if (obj.dataTotal[i].id === ids) {
            item = obj.dataTotal[i]; // 找到要进行补位的项
          }
        }
        if (item) {
          obj.datas.push(item);
        }
      }
    },
    // 上一页 true、下一页 false
    pageStep(type) {
      if (type) {
        if (this.addLilvTable.pageNum > 0) {
          this.addLilvTable.pageNum -= 1;
          this.addLilvTable.datas = this.addLilvTable.dataTotal.slice(
            this.addLilvTable.pageNum * 5,
            this.addLilvTable.pageNum * 5 + 5
          );
        }
      } else {
        let num1 = this.addLilvTable.total / 5;
        let num2 = this.addLilvTable.pageNum + 1;

        if (this.addLilvTable.total > 5 && num1 > num2) {
          this.addLilvTable.pageNum += 1;
          this.addLilvTable.datas = this.addLilvTable.dataTotal.slice(
            this.addLilvTable.pageNum * 5,
            this.addLilvTable.pageNum * 5 + 5
          );
        }
      }
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
