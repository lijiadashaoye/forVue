<template>
  <div class="componentWaper">
    <div id="forHeader">
      <h3>{{pageName}}</h3>
    </div>
    <div id="forTable">
      <el-form
        ref="ruleForm"
        size="normal"
        :model="ruleForm"
        label-width="150px"
        label-suffix=":"
        class="isForm"
        :rules="rules"
      >
        <el-form-item prop="name" label="机构名称" style="position:relative" class="isWith">
          <el-input clearable placeholder="请输入" v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="所属省市" style="margin-bottom:5px;">
          <el-select v-model="ruleForm.locationId" clearable placeholder="请选择">
            <el-option
              size="mini"
              v-for="item in dictData.institution_star"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="type" label="机构类型" style="position:relative" class="isWith">
          <el-select clearable placeholder="请选择" v-model="ruleForm.type">
            <el-option
              size="mini"
              v-for="item in dictData.institution_type"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="资产规模(亿)" prop="aum">
          <el-input type="number" clearable placeholder="请输入" v-model="ruleForm.aum"></el-input>
        </el-form-item>

        <el-form-item prop="parentId" label="隶属机构" style="position:relative" class="isWith">
          <el-select clearable placeholder="请选择" v-model="ruleForm.parentId">
            <el-option
              size="mini"
              v-for="item in dictData.paren"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="热线电话" prop="hotLine">
          <el-input clearable placeholder="请输入" v-model="ruleForm.hotLine"></el-input>
        </el-form-item>

        <el-form-item label="银行logo" class="forLogo" v-if="this.hasImg">
          <div style="width:100px;">
            <imgUpload :datas="hasImg" @selectImg="getImg('actImg',$event)" />
          </div>
        </el-form-item>

        <el-form-item label="银行星级" style="margin-bottom:5px;">
          <el-select v-model="ruleForm.star" clearable placeholder="请选择">
            <el-option
              size="mini"
              v-for="item in dictData.institution_star"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="星级评定描述" style="text-align:left;" prop="starRatingDesc">
          <quill-editor v-model="ruleForm.starRatingDesc"></quill-editor>
        </el-form-item>

        <el-form-item label="银行描述" style="text-align:left;" prop="description">
          <quill-editor v-model="ruleForm.description"></quill-editor>
        </el-form-item>
      </el-form>
      <div class="nextButtons">
        <el-button size="mini" type="primary" @click="next">下一步</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button size="mini" type="info" @click="back">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import imgUpload from "../../../../components/upImg.vue";

export default {
  components: { imgUpload },
  data() {
    // 验证资产规模
    var checkNum = (rule, value, callback) => {
      if (value < 0) {
        callback(new Error("请输入正数"));
      } else if (("" + value).length > 19 || ("" + value).length < 0) {
        callback(new Error("请输入1-19字符"));
      } else {
        callback();
      }
    };
    return {
      pageName: "", // 当前页面名字
      dictData: {}, // 字典数据
      hasImg: null,
      ruleForm: {
        name: "", //  机构名称
        locationId: [], // 所属省/直辖市ID
        type: "", //  机构类型
        aum: "", // 资产规模
        parentId: "", // 隶属机构ID
        hotLine: "", // 热线电话
        logo: "",
        star: "", // 星级
        starRatingDesc: "", // 星级评定描述
        description: "" // 银行描述
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
      ],
      //表单验证
      rules: {
        name: [
          { min: 1, max: 50, message: "最多输入50个字", trigger: "blur" },
          { required: true, message: "请选择机构名称", trigger: "blur" }
        ],
        hotLine: [
          { min: 1, max: 100, message: "最多输入100个字", trigger: "blur" }
        ],
        starRatingDesc: [
          { min: 1, max: 2000, message: "最多输入2000个字", trigger: "blur" }
        ],
        description: [
          { min: 1, max: 2000, message: "最多输入2000个字", trigger: "blur" }
        ],
        aum: [{ validator: checkNum, trigger: "blur" }],
        locationId: [
          { required: true, message: "请选择所属省市", trigger: "blur" }
        ],
        type: [{ required: true, message: "请选择机构类型", trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.hasImg = {
      url: "admin/file/up/member",
      imgUrl: ""
    };
    this.pageName = sessionStorage.getItem("page") + " > 新增机构第一步"; // 获取页面名称
    this.dictData = JSON.parse(sessionStorage.getItem("dict"));
    let step1 = sessionStorage.getItem("organizational_step1");
    if (step1) {
      this.ruleForm = JSON.parse(step1);
      this.hasImg.imgUrl = this.ruleForm.logo;
    }
  },

  methods: {
    next() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          sessionStorage.setItem(
            "organizational_step1",
            JSON.stringify(this.ruleForm)
          );
          this.$router.push({
            name: "organizational_step2"
          });
        }
      });
    },
    // 取消
    back() {
      this.$router.push({
        name: "organizational_mainPage"
      });
    },
    // 添加图标
    getImg(type, data) {
      this.ruleForm.logo = data.url;
    }
  }
};
</script>

<style scoped='true' lang="scss">
.isA {
  display: inline-block;
  width: 75px;
  height: 100%;
  font-size: 12px;
  text-align: left;
  padding-left: 5px;
  vertical-align: -5px;
  position: absolute;
  z-index: 2;
}
.isA:hover {
  color: red;
}

.isForm {
  margin: 0 auto;
  width: 75%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  text-align: center;
  padding-top: 20px;
}
.nextButtons {
  width: 300px;
  padding-bottom: 30px;
  padding-left: 80px;
  margin: 0 auto;
}
.forLogo {
  width: 367px;
}
</style>
