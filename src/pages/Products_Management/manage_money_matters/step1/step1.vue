<template>
  <div class="componentWaper">
    <div id='forHeader'>
      <h3>{{pageName}}</h3>
    </div>
    <div style="overflow:auto;">
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
          prop="institutionName"
          label="机构名称"
          style="position:relative"
          class="is50"
        >
          <el-select
            class="isInput"
            clearable
            placeholder="请选择"
            v-model="ruleForm.institutionName"
          >
            <el-option
              size='mini'
              v-for="item in dictData.jigou"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>

          <a
            class="isA"
            @click="toJiGou"
          >无机构？</a>

        </el-form-item>

        <el-form-item label="产品系列" class="is50">
          <el-cascader
            class="isInput"
            v-model="ruleForm.seriesId"
            :options="options"
            change-on-select
          ></el-cascader>
          <a
            class="isA"
            @click="toChanPin"
          >无产品系列？</a>
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
        <el-form-item class="is50"
          label="预期年化收益率"
          prop="expectAnnualisedReturn"
        >
          <el-input
            class="isInput"
            type='number'
            clearable
            v-model="ruleForm.expectAnnualisedReturn"
            placeholder="请输入"
          ></el-input>
          <span class="isA">%</span>
        </el-form-item>

        <el-form-item
          label="风险等级"
          prop="riskLevel"
          class="is50"
        >
          <el-select
            class="isInput"
            clearable
            placeholder="请选择"
            v-model="ruleForm.riskLevel"
          >
            <el-option
              size='mini'
              v-for="item in dictData.risk_level"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="剩余额度"
          prop="surplusQuota"
          class="is50"
        >
          <el-input
            class="isInput"
            type='number'
            clearable
            v-model="ruleForm.surplusQuota"
            placeholder="请输入"
          ></el-input>
          <span class="isA"></span>
        </el-form-item>
        <el-form-item
          label="期限"
          prop="timeLimit"
          class="is50"
        >
          <el-input
            class="isInput"
            clearable
            v-model="ruleForm.timeLimit"
            placeholder="请输入"
          ></el-input>
        </el-form-item>

        <el-form-item label="起息日期" class="is50">
          <el-date-picker
            class="isInput"
            v-model="ruleForm.valueDate"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="理财日期">
          <el-date-picker
            class="isInput"
            v-model="ruleForm.managementDate"
            type="daterange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size='mini'
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="募集日期">
          <el-date-picker
            v-model="ruleForm.raiseDate"
            type="daterange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size='mini'
            class="isInput"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="产品描述">
          <quill-editor
            class="isInput"
            v-model="ruleForm.description"
          >
          </quill-editor>
        </el-form-item>

      </el-form>
    </div>
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
</template>
<script>
export default {
  props: {},
  data() {
    return {
      pageName: "", // 当前页面名字
      dictData: {}, // 字典数据
      ruleForm: {
        institutionName: "", // 机构名称
        seriesId: [], // 产品系列ID
        name: "", // 产品名称
        increaseAmount: "", // 递增金额
        expectAnnualisedReturn: "", // 预期年化收益率
        riskLevel: "", // 风险等级
        surplusQuota: "", // 剩余额度
        valueDate: "", // 起息日
        timeLimit: "", // 期限
        managementDate: "", // 理财日期
        raiseDate: "", // 募集日期
        description: "" //  产品描述
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
      //表单验证
      rules: {
        institutionName: [
          { required: true, message: "请选择机构名称", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入产品名称", trigger: "blur" }
          // { min: 1, max: 800, message: "最多输入800个字", trigger: "blur" }
        ],
        increaseAmount: [
          { required: true, message: "请输入递增金额", trigger: "blur" }
        ],
        expectAnnualisedReturn: [
          { required: true, message: "请输入预期年化收益率", trigger: "blur" }
        ],
        riskLevel: [
          { required: true, message: "请选择风险等级", trigger: "blur" }
        ],
        surplusQuota: [
          { required: true, message: "请输入剩余额度", trigger: "blur" }
        ],
        timeLimit: [{ required: true, message: "请输入期限", trigger: "blur" }]
      },
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
  mounted() {
    this.pageName = sessionStorage.getItem("page") + " > 新增理财产品第一步"; // 获取页面名称
    this.dictData = JSON.parse(sessionStorage.getItem("dict"));
    if (sessionStorage.getItem("licai_step1")) {
      this.ruleForm = JSON.parse(sessionStorage.getItem("licai_step1"));
    }
  },

  methods: {
    next() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          sessionStorage.setItem("licai_step1", JSON.stringify(this.ruleForm));
          this.$router.push({
            name: "manage_money_matters_step2"
          });
        }
      });
    },
    // 取消
    back() {
      this.$router.push({
        name: "manage_money_matters_mainPage"
      });
    },
    toJiGou() {
      sessionStorage.setItem("page", "机构管理");
      this.$router.push({
        name: "organizational_step1"
      });
    },
    toChanPin() {}
  }
};
</script>
