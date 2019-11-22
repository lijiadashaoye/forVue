<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>

      <el-form
        :model="searchForm"
        inline
        :rules="searchRules"
        ref="searchForm"
        label-width="100px"
        
      >
        <el-form-item label="加入类型" prop="joinType">
          <el-select filterable v-model="searchForm.joinType" placeholder="请选择" size="mini">
            <el-option
              v-for="item in joinTypeOpt"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="会员ID" prop="memberId">
          <el-input v-model="searchForm.memberId" placeholder="请输入会员账号" size="mini"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="search('searchForm')" size="mini">查询</el-button>
          <el-button @click="resetForm('searchForm')" size="mini">清除</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div id="forTable">
      <isTable :inputData="this.$store.state.blackList.blackNameList" @tableEmit="tableEmit" />
    </div>
    <!-- 修改/详情的弹框 -->
    <el-dialog :close-on-click-modal="false" :visible.sync="dialogVisible" :before-close="close">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="140px"
        label-position="left"
        
      >
        <el-form-item label="加入类型" prop="joinType">
          <el-select
            filterable
            v-model="ruleForm.joinType"
            placeholder="请选择被加入类型"
            :disabled="this.detailFlag"
          >
            <el-option
              v-for="(item,ind) in joinTypeOpt"
              :key="ind"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="处理类型" prop="dealType">
          <el-select
            filterable
            v-model="ruleForm.dealType"
            placeholder="请选择处理类型"
            :disabled="this.detailFlag"
          >
            <el-option
              v-for="(item,ind) in dealTypeOpt"
              :key="ind"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="被加入的原因" prop="reasonDescribe">
          <el-input
            type="textarea"
            :autosize="{ minRows: 6, maxRows: 6}"
            placeholder="请输入原因"
            :disabled="this.detailFlag"
            maxlength="100"
            :show-word-limit="true"
            v-model="ruleForm.reasonDescribe"
          ></el-input>
        </el-form-item>

        <el-form-item v-if="!this.detailFlag">
          <el-button @click="cancel('ruleForm')">取消</el-button>
          <el-button type="primary" @click="save('ruleForm')">保存</el-button>
        </el-form-item>

        <el-form-item v-else>
          <el-button @click="close">关闭</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { black_list_upd } from "../../../api/setting_use.js";
import isTable from "../../../components/isTable/isTable";
export default {
  props: {},
  components: {
    isTable
  },
  data() {
    return {
      env: null,

      id: "",
      pageName: "", // 当前页面名字
      detailFlag: false, //判断点击的是详情 编辑
      dialogVisible: false, //弹框开关
      opts: {},
      searchRules: {},
      searchForm: {
        joinType: "",
        memberId: ""
      },
      ruleForm: {
        reasonDescribe: "", //原因描述
        joinType: "", //加入类型
        dealType: "" //处理类型
      },
      rules: {
        reasonDescribe: [
          { required: true, message: "请填写原因", trigger: "blur" }
        ],
        joinType: [
          { required: true, message: "请选择加入类型", trigger: "blur" }
        ],
        dealType: [
          { required: true, message: "请选择处理类型", trigger: "blur" }
        ]
      },
      joinTypeOpt: [
        //加入黑名单的类型
        {
          label: "ip",
          value: "IP"
        },
        {
          label: "频次",
          value: "TIMES"
        },
        {
          label: "操作行为",
          value: "OPERATE_ACTION"
        }
      ],
      dealTypeOpt: [
        //处理类型
        {
          label: "您的账户异常,登录失败",
          value: "SUSPEND"
        },
        {
          label: "可登录,无法绑卡和提现",
          value: "NOT_HANDLE"
        }
      ]
    };
  },
  mounted() {
    this.env = sessionStorage.getItem("env") === "development";

    this.userDo();
    this.getBlackNameListData({
      pageNum: 1,
      pageSize: this.$store.state.blackList.blackNameList.pageSize
    });
    this.pageName = this.$route.name;
    this.$store.state.blackList.blackNameList.data.title = [
      {
        title: "会员ID",
        key: "memberId",
        minWidth: "120"
      },
      {
        title: "加入类型",
        key: "joinTypeCN",
        minWidth: "120"
      },
      {
        title: "处理类型",
        key: "dealTypeCN",
        minWidth: "120"
      },
      {
        title: "创建时间",
        key: "gmtCreated",
        minWidth: "200"
      }
    ];
  },

  methods: {
    ...mapMutations({
      userDo: "blackList/userDo",
      getBlackNameListData: "blackList/getBlackNameListData",
      deleteList: "blackList/deleteList"
    }),

    //点击删除
    delete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.deleteList(id, {
            pageNum: this.$store.state.blackList.blackNameList.pageNum,
            pageSize: this.$store.state.blackList.blackNameList.pageSize,
            joinType: this.searchForm.joinType != "" ? this.searchForm.joinType : null,
            memberId: this.searchForm.memberId != "" ? this.searchForm.memberId : null
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    close() {
      this.cancel("ruleForm");
    },
    //修改点击取消
    cancel(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false;
    },
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let obj = {
            ids: this.id,
            joinType: this.ruleForm.joinType,
            dealType: this.ruleForm.dealType,
            reasonDescribe: this.ruleForm.reasonDescribe
          };
          black_list_upd(obj).then(res => {
            if (res && res.success) {
              this.dialogVisible = false;
              this.$message.success("保存成功");
              this.getBlackNameListData({
                pageNum: this.$store.state.protocol.protocolList.pageNum,
                pageSize: this.$store.state.protocol.protocolList.pageSize,
                joinType:
                  this.searchForm.joinType != ""
                    ? this.searchForm.joinType
                    : null,
                memberId:
                  this.searchForm.memberId != ""
                    ? this.searchForm.memberId
                    : null
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    //  点击修改
    edit(data) {
      this.id = [data.id];
      this.ruleForm.joinType = data.joinType;
      this.ruleForm.dealType = data.dealType;
      this.ruleForm.reasonDescribe = data.reasonDescribe;
      this.dialogVisible = true;
      this.detailFlag = false;
    },
    //点击详情
    detail(data) {
      this.id = [data.id];
      this.ruleForm.joinType = data.joinType;
      this.ruleForm.dealType = data.dealType;
      this.ruleForm.reasonDescribe = data.reasonDescribe;
      this.dialogVisible = true;
      this.detailFlag = true;
    },
    // 监听表格的操作
    tableEmit(data) {
      switch (data.type) {
        case "regetData": // 分页的emit
          //再次请求列表数据
          this.getBlackNameListData({
            pageNum: this.$store.state.blackList.blackNameList.pageNum,
            pageSize: this.$store.state.blackList.blackNameList.pageSize,
            joinType:
              this.searchForm.joinType != "" ? this.searchForm.joinType : null,
            memberId:
              this.searchForm.memberId != "" ? this.searchForm.memberId : null
          });
          break;
        case "edit": // 编辑按钮
          this.edit(data.data);
          break;
        case "delete": // 删除按钮
          this.delete(data.data.id);
          break;
        case "detail": // 详情
          this.detail(data.data);
          break;
      }
    },
    //查询
    search(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.getBlackNameListData({
            pageNum: 1,
            pageSize: this.$store.state.blackList.blackNameList.pageSize,
            joinType:
              this.searchForm.joinType != "" ? this.searchForm.joinType : null,
            memberId:
              this.searchForm.memberId != "" ? this.searchForm.memberId : null
          });
        } else {
          return false;
        }
      });
    },
    //清除
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>