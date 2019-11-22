<template>
  <el-dialog
    :close-on-click-modal="true"
    :title="title"
    :visible.sync="centerType"
    width="600px"
    @close="cancel"
    center
  >
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" width="300px">
      <!-- 详情显示编辑按钮 -->
      <el-button
        v-if="dialogType=='detail' && $store.state.smsRuleTemplate.templateList.data.quanxian.indexOf('sms_template_upd')>-1"
        @click="infoChange"
        style="float:right;position:relative;z-index:2"
        type="primary"
        size="mini"
      >修改</el-button>
      <!-- 添加子模版和详情需要显示 -->
      <template v-if="dialogType=='detail'">
        <el-form-item prop="code" label="模版编码:">{{templateDetailInfo.code}}</el-form-item>
        <el-form-item prop="uuid" label="模版Id:">{{templateDetailInfo.uuid}}</el-form-item>
        <el-form-item prop="channelId" label="渠道类型:">{{channelIdName}}</el-form-item>
        <el-form-item prop="name" label="模版名称:">{{templateDetailInfo.name}}</el-form-item>
        <el-form-item prop="type" label="模版类型:">{{templateDetailInfo.type}}</el-form-item>
        <el-form-item prop="content" label="模版内容:">{{templateDetailInfo.content}}</el-form-item>
        <el-form-item prop="rules" label="规则选项:" v-if="templateDetailInfo.rules">
          <span
            style="padding-right:10px;"
            v-for="(item,index) of templateDetailInfo.rules"
            :key="index"
          >{{item.code}}</span>
        </el-form-item>
      </template>

      <!-- 详情页面不显示表单操作 -->
      <template v-if="dialogType!='detail'">
        <el-form-item label="模版编码:" prop="code">
          <el-input placeholder="请输入模版编码" v-model="ruleForm.code" type="text" clearable></el-input>
        </el-form-item>
        <el-form-item label="模版Id:" prop="uuid">
          <el-input placeholder="请输入模版Id" v-model="ruleForm.uuid" type="text" clearable></el-input>
        </el-form-item>
        <el-form-item label="渠道类型" prop="channelId">
          <el-select filterable v-model="ruleForm.channelId" placeholder="请选择" style="width:100%;">
            <el-option
              v-for="(item,index) in channelIdArr"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模版名称:" prop="name">
          <el-input placeholder="请输入模版名称" v-model="ruleForm.name" type="text" clearable></el-input>
        </el-form-item>
        <el-form-item label="模版类型:" prop="type">
          <el-input placeholder="请输入模版类型" v-model="ruleForm.type" clearable></el-input>
        </el-form-item>
        <el-form-item label="模版内容:" prop="content">
          <el-input
            placeholder="请输入模版内容"
            v-model="ruleForm.content"
            type="textarea"
            rowspan="2"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="规则选项:" prop="rules">
          <el-checkbox-group v-model="ruleForm.rules">
            <el-checkbox
              v-for="(rule,index) of rulesArr"
              :label="rule.id"
              :key="index"
            >{{rule.code}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </template>
    </el-form>

    <div class="bottomBtn" v-if="dialogType!='detail'">
      <el-button type="primary" @click="save('ruleForm')">保存</el-button>
      <el-button @click="cancel()">取消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  props: {
    centerDialogVisible: {
      type: Boolean,
      default: false
    },
    dialogType: {
      type: String,
      default: ""
    }
  },
  model: {
    prop: "centerDialogVisible",
    event: "returnBack"
  },
  watch: {
    // 监听dialog变化控制数据
    centerDialogVisible(value) {
      this.centerType = value;
      if (value) {
        // 用于展示详情里里面渠道id和渠道那么转换
        if (this.dialogType == "detail") {
          let itemInfo = this.channelIdArr.find(item => {
            return item.id == this.templateDetailInfo.channelId;
          });
          this.channelIdName = itemInfo.name;
        }

        // 获取rules列表
        this.getSmsRuleList();
        if (this.dialogType == "detail") {
          // 详情修改需要清空验证
          this.title = "模版详情";
          this.$nextTick(() => {
            this.$refs["ruleForm"].clearValidate();
          });
        } else {
          // 新增需要清空表单和验证
          this.$nextTick(() => {
            this.$refs["ruleForm"].resetFields();
          });
          this.title = "新增模版";
        }
      }
    }
  },
  computed: {
    ...mapState({
      templateDetailInfo: ({ smsRuleTemplate }) =>
        smsRuleTemplate.templateDetailInfo, //单条数据
      rulesArr: ({ smsRuleTemplate }) => smsRuleTemplate.ruleList.data.list,
      channelIdArr: ({ smsRuleTemplate }) => smsRuleTemplate.channelIdArr
    })
  },
  data() {
    return {
      channelIdName: "",
      centerType: this.centerDialogVisible, //dialog开关状态
      title: "新增权限",
      ruleForm: {
        channelId: "", //渠道类型
        uuid: "", //模版id
        code: "", //模版编码
        name: "", //模版名称
        type: "", //模版类型
        content: "", //模版内容
        rules: [] //规则多选
      }, //表单数据
      rules: {
        channelId: [{ required: true, message: "渠道类型不能为空" }],
        uuid: [{ required: true, message: "模版Id不能为空" }],
        code: [{ required: true, message: "模版编码不能为空" }],
        name: [{ required: true, message: "模版名称不能为空" }],
        type: [{ required: true, message: "模版类型不能为空" }],
        content: [{ required: true, message: "模版内容不能为空" }],
        rules: [{ required: true, message: "模版内容不能为空" }]
      }
    };
  },
  methods: {
    ...mapActions({
      addSmsTemplate: "smsRuleTemplate/addSmsTemplate",
      modifySmsTemplate: "smsRuleTemplate/modifySmsTemplate",
      getSmsChannel: "smsRuleTemplate/getSmsChannel",
      getSmsRuleList: "smsRuleTemplate/getSmsRuleList"
    }),
    cancel() {
      this.$emit("returnBack", false);
    },
    // 数据修改
    infoChange() {
      this.title = "权限修改";
      for (let key in this.ruleForm) {
        // 避免测试数据没有rules选项
        if (key == "rules") {
          let arr = [];
          if (this.templateDetailInfo[key]) {
            this.templateDetailInfo[key].forEach(item => {
              arr.push(item.id);
            });
          }
          this.ruleForm[key] = arr;
        } else {
          this.ruleForm[key] = this.templateDetailInfo[key];
        }
      }
      this.$emit("edit");
    },
    // 保存数据
    save(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          // 判断表单类型
          let formInfo = Object.assign({}, this.ruleForm);
          if (this.dialogType == "edit") {
            formInfo.id = this.templateDetailInfo.id;
            this.modifySmsTemplate(formInfo).then(() => {
              this.cancel();
              this.$message.success("修改成功");
              this.$emit("again");
            });
          } else {
            // 新增数据
            this.addSmsTemplate(formInfo).then(() => {
              this.cancel();
              this.$message.success("添加成功");
              this.$emit("again");
            });
          }
        }
      });
    }
  }
};
</script>
