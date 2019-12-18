<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
      <el-button type="primary" size="mini" @click="add">新增产品支取提示信息</el-button>
    </div>

    <div id="forTable">
      <isTable :inputData="this.$store.state.promptMsg.promptMsgList" @tableEmit="tableEmit" />
    </div>

    <el-dialog
      :title="`${addFlag?'新增':'修改'}产品支取提示信息`"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      :before-close="close"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="140px"
        label-position="left"
      >
        <el-form-item label="产品所属银行:" prop="institutionId">
          <el-select
            filterable
            v-model="ruleForm.institutionId"
            placeholder="请选择"
            clearable
            @change="getProductName"
          >
            <el-option
              v-for="(item,ind) in institutionList"
              :key="ind"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品名称:" prop="productId">
          <el-select filterable v-model="ruleForm.productId" placeholder="请选择" clearable>
            <el-option
              v-for="(item,ind) in productList"
              :key="ind"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="提示类型:" prop="promptType">
          <el-select filterable v-model="ruleForm.promptType" placeholder="请选择" clearable>
            <el-option
              v-for="(item,ind) in promptTypeList"
              :key="ind"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="存期:"
          prop="deadline"
          :rules="[{required: ruleForm.promptType == 3 ? true : false, message: '请输入存期', trigger: 'blur'},{ pattern: /^\+?[1-9]\d*$/,message: '只能输入大于0的正整数', trigger: 'blur' }]"
        >
          <el-input type="number" v-model.number="ruleForm.deadline" min="0" placeholder="请输入存期"></el-input>
        </el-form-item>
        <el-form-item
          label="存期单位:"
          prop="timeUnitType"
          :rules="{ required: this.ruleForm.promptType == 3 ? true : false, message: '请选择存期单位', trigger: 'blur' }"
        >
          <el-select filterable v-model="ruleForm.timeUnitType" placeholder="请选择">
            <el-option
              v-for="(item,ind) in timeUnitTypeList"
              :key="ind"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="提示内容:" prop="promptMessage">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 6}"
            placeholder="请输入内容"
            v-model="ruleForm.promptMessage"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="saveAdd">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import isTable from "../../../components/isTable/isTable";
import {
  productBank,
  prompt_add,
  prompt_upd,
  prompt_delete,
  getProList
} from "../../../api/setting_use";
import { mapActions, mapMutations } from "vuex";
export default {
  components: {
    isTable
  },
  data() {
    return {
      env: null,
      pageName: "",
      id: "",
      dialogFormVisible: false,
      institutionList: [], //机构列表
      institutionName: "", //机构名称
      productList: [], //产品列表,
      productName: "", //产品名称
      addFlag: false,
      promptTypeList: [
        {
          label: "未到锁定期",
          value: 1
        },
        {
          label: "活动未到期",
          value: 2
        },
        {
          label: "产品未到期",
          value: 3
        }
      ], //类型列表
      timeUnitTypeList: [
        //存期类型列表
        {
          label: "天",
          value: 1
        },
        {
          label: "月",
          value: 2
        },
        {
          label: "年",
          value: 3
        }
      ],
      ruleForm: {
        institutionId: "", //机构id
        productId: "", //产品id
        promptType: "", //提示类型
        deadline: "", //存期
        timeUnitType: "", //存期单位
        promptMessage: "" //提示内容
      },
      rules: {
        institutionId: [
          { required: true, message: "请选择产品所属银行", trigger: "blur" }
        ],
        productId: [{ required: true, message: "请选择产品", trigger: "blur" }],
        promptType: [
          { required: true, message: "请选择提示类型", trigger: "blur" }
        ],
        promptMessage: [
          { required: true, message: "请输入提示内容", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.env = sessionStorage.getItem("env") === "development";
    this.pageName = this.$route.name;
    this.userDo();
    productBank().then(async res => {
      if (res && res.success) {
        this.institutionList = res.data.list;
      }
    });
    this.$store.state.promptMsg.promptMsgList.pageNum = 1;
    this.getList({
      pageNum: this.$store.state.promptMsg.promptMsgList.pageNum,
      pageSize: this.$store.state.promptMsg.promptMsgList.pageSize
    });
    this.$store.state.promptMsg.promptMsgList.data.title = [
      {
        title: "机构名称",
        key: "institutionName",
        minWidth: "200"
      },
      {
        title: "产品名称",
        key: "productName",
        minWidth: "160"
      },
      {
        title: "提示类型",
        key: "promptType",
        minWidth: "160"
      },
      {
        title: "提示信息",
        key: "promptMessage",
        minWidth: "400"
      }
    ];
  },
  methods: {
    ...mapActions({
      getList: "promptMsg/getList"
    }),
    ...mapMutations({
      userDo: "promptMsg/userDo"
    }),
    //新增
    add() {
      let jurisdiction = JSON.parse(
        sessionStorage.getItem("buttenpremissions")
      );
      if (jurisdiction.indexOf("prompt_message_add") > -1) {
        this.addFlag = true;
        this.dialogFormVisible = true;
      } else {
        this.$message.error("您暂无权限添加");
        this.addFlag = false;
      }
    },
    getProductName() {
      if (
        this.ruleForm.institutionId != null &&
        this.ruleForm.institutionId != ""
      ) {
        getProList(this.ruleForm.institutionId).then(res => {
          this.productList = res.data;
        });
      }
    },
    //关闭弹窗
    close() {
      this.$refs.ruleForm.resetFields();
      this.addFlag = false;
      this.id = "";
      this.ruleForm.institutionId = "";
      this.institutionName = "";
      this.ruleForm.productId = "";
      this.productName = "";
      this.ruleForm.promptType = "";
      this.ruleForm.deadline = "";
      this.ruleForm.timeUnitType = "";
      this.ruleForm.promptMessage = "";

      this.dialogFormVisible = false;
    },
    //保存
    saveAdd() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.institutionList.forEach(v => {
            if (this.ruleForm.institutionId == v.id) {
              this.institutionName = v.name;
            }
          });
          this.productList.forEach(v => {
            if (this.ruleForm.productId == v.id) {
              this.productName = v.name;
            }
          });
          let obj = {
            institutionId: this.ruleForm.institutionId,
            institutionName: this.institutionName,
            productId: this.ruleForm.productId,
            productName: this.productName,
            promptType: this.ruleForm.promptType,
            deadline: this.ruleForm.deadline ? this.ruleForm.deadline : null,
            timeUnitType: this.ruleForm.timeUnitType
              ? this.ruleForm.timeUnitType
              : null,
            promptMessage: this.ruleForm.promptMessage
          };
          if (this.id !== "") {
            obj.id = this.id;
          }

          if (this.addFlag) {
            //新增
            prompt_add(obj).then(res => {
              if (res && res.success) {
                this.$message.success("保存成功");
                this.close();
                this.getList({
                  pageNum: this.$store.state.promptMsg.promptMsgList.pageNum,
                  pageSize: this.$store.state.promptMsg.promptMsgList.pageSize
                });
              }
            });
          } else {
            //修改
            prompt_upd(obj).then(res => {
              if (res && res.success) {
                this.$message.success("保存成功");
                this.close();
                this.getList({
                  pageNum: this.$store.state.promptMsg.promptMsgList.pageNum,
                  pageSize: this.$store.state.promptMsg.promptMsgList.pageSize
                });
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    //修改
    edit(data) {
      this.addFlag = false;
      this.id = data.id;
      this.ruleForm.institutionId = data.institutionId;
      this.institutionName = data.institutionName;
      this.ruleForm.productId = data.productId;
      this.productName = data.productName;
      this.ruleForm.promptType = data.promptType;
      this.ruleForm.deadline = data.deadline;
      this.ruleForm.timeUnitType = data.timeUnitType;
      this.ruleForm.promptMessage = data.promptMessage;
      this.dialogFormVisible = true;
    },
    //删除
    delete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        prompt_delete(id).then(res => {
          if (res && res.success) {
            this.getList({
              pageNum: this.$store.state.promptMsg.promptMsgList.pageNum,
              pageSize: this.$store.state.promptMsg.promptMsgList.pageSize
            });
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          }
        });
      });
    },
    //操作表格
    tableEmit(data) {
      switch (data.type) {
        case "regetData": // 分页的emit
          //再次请求列表数据
          this.getList({
            pageNum: this.$store.state.topProduct.promptMsgList.pageNum,
            pageSize: this.$store.state.topProduct.promptMsgList.pageSize
          });
          break;
        case "emit": // 编辑按钮
          this.edit(data.data);
          break;
        case "delete": // 删除按钮
          this.delete(data.data.id);
          break;
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.el-input {
  width: 220px !important;
}
</style>