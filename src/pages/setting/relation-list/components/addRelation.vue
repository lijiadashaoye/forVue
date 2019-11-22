<template>
  <el-dialog
    :close-on-click-modal="true"
    :title="title"
    :visible.sync="centerType"
    width="500px"
    @close="cancel"
    center
  >
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <!-- 详情显示编辑按钮 -->
      <el-button
        v-if="dialogType=='detail' && this.$parent.userInfoArr.indexOf('parent_tree_upd')>-1"
        @click="infoChange"
        style="float:right;position:relative;z-index:2"
        type="primary"
        size="mini"
      >修改</el-button>
      <!-- 添加子关联和详情需要显示 -->
      <template v-if="dialogType=='addChild' || dialogType=='detail'">
        <el-form-item :label="`${dialogType=='addChild'?'父级Id':'Id'}:`" prop="id">{{indexInfo.id}}</el-form-item>
        <el-form-item
          :label="`${dialogType=='addChild'?'父级key值':'key值'}:`"
          prop="dataKey"
        >{{indexInfo.dataKey}}</el-form-item>
        <el-form-item
          :label="`${dialogType=='addChild'?'父级名称':'名称'}:`"
          prop="name"
        >{{indexInfo.name}}</el-form-item>
        <el-form-item
          :label="`${dialogType=='addChild'?'父级类型':'类型'}:`"
          prop="linkType"
        >{{indexInfo.linkType}}</el-form-item>
        <el-form-item v-if="dialogType=='detail'" label="备注:">{{indexInfo.remarks}}</el-form-item>
      </template>

      <!-- 详情页面不显示表单操作 -->
      <template v-if="dialogType!='detail'">
        <el-form-item label="关联key名:" prop="dataKey">
          <el-input placeholder="请输入key名称" v-model="ruleForm.dataKey" type="text" clearable></el-input>
        </el-form-item>
        <template v-if="dialogType=='addFather' || dialogType=='edit'">
          <el-form-item label="关联类型" prop="linkType">
            <el-select filterable v-model="ruleForm.linkType" placeholder="请选择">
              <el-option
                v-for="(item,index) in linkTypeArr"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </template>
        <el-form-item label="业务名称:" prop="name">
          <el-input placeholder="请输入业务名称" v-model="ruleForm.name" type="text" clearable></el-input>
        </el-form-item>
        <el-form-item label="备注:" prop="remarks">
          <el-input
            placeholder="请输入备注"
            v-model="ruleForm.remarks"
            type="textarea"
            rowspan="2"
            clearable
          ></el-input>
        </el-form-item>
      </template>
    </el-form>
    <div v-if="dialogType!='detail'" class="saveButton">
      <el-button type="primary" @click="save('ruleForm')">保存</el-button>
      <el-button @click="cancel()">取消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { linkTypeArr } from "@/constant.js";
import { defaultChange } from "@/sets/changeLanguage.js";
export default {
  props: {
    centerDialogVisible: {
      type: Boolean,
      default: false
    },
    dialogType: {
      type: String,
      default: ""
    },
    itemId: {
      type: Number,
      default: 0
    }
  },
  created() {
    this.linkTypeArr = linkTypeArr;
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
        if (this.dialogType == "detail") {
          // 详情修改需要清空验证
          this.$nextTick(() => {
            this.$refs["ruleForm"].clearValidate();
          });
          this.title = "关联详情";
        } else {
          if (this.dialogType == "addChild") {
            this.relationDetail(this.itemId).then(() => {
              this.$nextTick(() => {
                this.$refs["ruleForm"].resetFields();
                this.ruleForm.linkType = this.indexInfo.linkType;
                this.ruleForm.dataKey = "";
                this.ruleForm.name = "";
              });
            });
          }
          // 新增需要清空表单和验证
          this.$nextTick(() => {
            this.$refs["ruleForm"].resetFields();
          });
          this.title = "新增关联";
        }
      }
    }
  },
  computed: {
    ...mapState({
      indexInfo: ({ powerTable }) => {
        powerTable.indexInfo.linkType = defaultChange(
          powerTable.indexInfo.linkType,
          true,
          "linkTypeArr"
        );
        return powerTable.indexInfo;
      } //单条数据
    })
  },
  data() {
    return {
      centerType: this.centerDialogVisible,
      title: "新增关联",
      ruleForm: {
        dataKey: "", //数据key
        name: "", //业务名称
        linkType: "", //关联业务类型
        remarks: "" //备注
      }, //表单数据
      rules: {
        dataKey: [{ required: true, message: "数据key不能为空" }],
        name: [{ required: true, message: "业务名称不能为空" }],
        linkType: [{ required: true, message: "业务类型不能为空" }],
        remarks: [{ required: true, message: "备注不能为空" }]
      }
    };
  },
  methods: {
    ...mapActions({
      addRelation: "relation/addRelation",
      modifyRelation: "relation/modifyRelation",
      relationDetail: "relation/relationDetail"
    }),
    cancel() {
      this.$emit("returnBack", false);
    },
    // 数据修改
    infoChange() {
      this.title = "关联修改";
      for (let key in this.ruleForm) {
        this.ruleForm[key] = this.indexInfo[key];
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
            formInfo.id = this.indexInfo.id;
            formInfo.linkLevel = this.indexInfo.linkLevel;
            formInfo.parentId = this.indexInfo.parentId;
            this.modifyRelation(formInfo).then(() => {
              this.cancel();
              this.$message.success("修改成功");
              this.$emit("again");
            });
          } else {
            if (this.dialogType == "addFather") {
              // 添加顶层依赖
              formInfo.linkLevel = 0;
              formInfo.parentId = null;
            } else if (this.dialogType == "addChild") {
              // 添加子级依赖
              formInfo.linkLevel = +this.indexInfo.linkLevel + 1;
              formInfo.linkType = defaultChange(
                this.indexInfo.linkType,
                false,
                "linkTypeArr"
              );
              formInfo.parentId = this.indexInfo.id;
            }
            // 新增数据
            this.addRelation(formInfo).then(() => {
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
<style scoped>
.saveButton {
  display: flex;
  justify-content: center;
}
.el-select {
  width: 100%;
}
</style>