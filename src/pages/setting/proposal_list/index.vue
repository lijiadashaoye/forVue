<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
      <div class="adverAdd">
        <el-input
          style="width:200px;"
          placeholder="请输入建议内容"
          prefix-icon="el-icon-search"
          v-model="keyWords"
          size="mini"
          @input="search"
        ></el-input>
        <el-button type="primary" size="mini" @click="addProposal">新增</el-button>
      </div>
    </div>

    <div id="forTable">
      <isTable :inputData="this.$store.state.proposal.proposalList" @tableEmit="tableEmit" />
    </div>

    <el-dialog title="新增" :visible.sync="visible" width="400px" :before-close="handleClose">
      <el-form
        :model="addForm"
        :rules="rules"
        ref="addForm"
        label-width="60px"
        label-position="left"
      >
        <el-form-item label="昵称" prop="nickName">
          <el-input
            v-model.number="addForm.nickName"
            placeholder="请输入昵称"
            show-word-limit
            maxlength="8"
          ></el-input>
        </el-form-item>

        <el-form-item label="头像" prop="avatar">
          <el-upload
            class="avatar-uploader"
            action="customize"
            :show-file-list="false"
            :http-request="uploadfloatImage"
            v-loading="avatarLoading"
          >
            <img v-if="addForm.avatar" :src="$ImgBaseUrl + addForm.avatar" class="avatar" />
            <div v-else>
              <el-button>
                选择图片
                <br />
                <span style="font-size:12px;color:red">不能大于2M</span>
                <br />
                <span style="font-size:12px;color:red">jpg/png/gif/jpeg格式</span>
              </el-button>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="内容" prop="proposalContent">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="addForm.proposalContent"
            maxlength="100"
            show-word-limit
          ></el-input>
        </el-form-item>

        <div class="bottomBtn">
          <el-button type="primary" @click="save('addForm')">保存</el-button>
          <el-button @click="resetForm('addForm')">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
    <!-- 转发的弹框 -->
    <el-dialog :close-on-click-modal="false" :visible.sync="dialogVisible" width="60%" title="转发建议">
      <el-form ref="form" :model="ruleForm" :rules="rule" label-width="200px" label-position="left">
        <el-form-item label="邮箱地址" prop="emailAddr">
          <el-input type="email" v-model="ruleForm.emailAddr"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelFn">取 消</el-button>
        <el-button type="primary" @click="saveFn('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import isTable from "../../../components/isTable/isTable";
import {
  proposal_del,
  add_proposal,
  upLoadImg
} from "../../../api/setting_use";

export default {
  components: {
    isTable
  },
  data() {
    let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
    var testEmailFn = function(rule, value, callBack) {
      if (!reg.test(value)) {
        callBack(new Error("邮箱地址有误"));
      } else {
        callBack();
      }
    };
    return {
      env: null,
      dialogVisible: false,
      visible: false,
      avatarLoading: false,
      pageName: "",
      keyWords: "", // 建议者账号和内容检索
      ruleForm: {
        emailAddr: "" // 邮箱地址
      },
      rule: {
        emailAddr: [
          { required: true, message: "请输入邮箱地址 ", trigger: "blur" },
          { validator: testEmailFn, trigger: "blur" }
        ]
      },
      addForm: {
        proposalContent: "", //建议内容
        nickName: "", //姓名
        avatar: "" //头像
      },
      rules: {
        nickName: [{ required: true, message: "请输入昵称 ", trigger: "blur" }],
        proposalContent: [
          { required: true, message: "请输入内容", trigger: "blur" }
        ],
        avatar: [{ required: true, message: "请输入上传头像", trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.env = sessionStorage.getItem("env") === "development";

    this.userDo();
    this.pageName = this.$route.name;
    this.$store.state.proposal.proposalList.pageNum = 1;
    this.getList({
      pageNum: this.$store.state.proposal.proposalList.pageNum,
      pageSize: this.$store.state.proposal.proposalList.pageSize
    });
    this.$store.state.proposal.proposalList.data.title = [
      {
        title: "编号",
        key: "id",
        minWidth: "80",
        sortable: true
      },
      {
        title: "昵称",
        key: "nickName",
        minWidth: "120"
      },
      {
        title: "头像",
        key: "avatar",
        minWidth: "120",
        isImg: true
      },
      {
        title: "建议内容",
        key: "proposalContent",
        minWidth: "120"
      },
      {
        title: "有效标识",
        key: "validStatusText",
        minWidth: "120"
      },
      {
        title: "创建时间",
        key: "gmtCreated",
        minWidth: "120"
      }
    ];
  },
  methods: {
    ...mapMutations({
      userDo: "proposal/userDo"
    }),
    ...mapActions({
      getList: "proposal/getList"
    }),
    //新增
    addProposal() {
      this.visible = true;
    },
    handleClose() {
      this.visible = false;
      this.resetForm("addForm");
    },
    //上穿图片
    uploadfloatImage(params) {
      const _file = params.file;
      const isLt2M = _file.size / 1024 / 1024 < 2;
      const idJPG =
        _file.type === "image/jpeg" ||
        _file.type === "image/gif" ||
        _file.type === "image/png" ||
        _file.type === "image/jpg";
      var formData = new FormData();
      formData.append("file", _file);
      if (!idJPG) {
        this.$message.error("只能上传jpg/png/gif/jpeg格式的图片");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("请上传2M以下的图片");
        return false;
      }
      this.avatarLoading = true;
      upLoadImg(formData).then(res => {
        if (res && res.success) {
          this.avatarLoading = false;
          this.addForm.avatar = res.data;
        }
      });
    },
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          add_proposal(this.addForm).then(res => {
            if (res && res.success) {
              this.visible = false;
              this.resetForm("addForm");
              this.$store.state.proposal.proposalList.pageNum = 1;
              this.getList({
                pageNum: this.$store.state.proposal.proposalList.pageNum,
                pageSize: this.$store.state.proposal.proposalList.pageSize
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.visible = false;
      this.$refs[formName].resetFields();
    },
    // 搜索
    search() {
      this.$store.state.proposal.proposalList.pageNum = 1;
      this.getList({
        proposalContent: this.keyWords,
        pageNum: this.$store.state.proposal.proposalList.pageNum,
        pageSize: this.$store.state.proposal.proposalList.pageSize
      });
    },
    // 取消
    cancelFn() {
      this.ruleForm.emailAddr = "";
      this.dialogVisible = false;
    },
    // 确定
    saveFn(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.dialogVisible = false;
          this.$message.success("转发成功");
        }
      });
    },
    tableEmit(data) {
      switch (data.type) {
        case "regetData": // 分页的emit
          this.getList({
            pageNum: this.$store.state.proposal.proposalList.pageNum,
            pageSize: this.$store.state.proposal.proposalList.pageSize
          });
          break;
        case "delete": // 单独删除按钮
          this.delete(data.data.id);
          break;
        case "forward": // 转发
          this.dialogVisible = true;
      }
    },
    delete: function(id) {
      this.$confirm("确认要删除吗")
        .then(() => {
          proposal_del({ id: id }).then(res => {
            if (res && res.success) {
              this.$message.success("删除成功");
            } else {
              this.$message.error("删除失败");
            }
            this.getList({
              pageNum: this.$store.state.proposal.proposalList.pageNum,
              pageSize: this.$store.state.proposal.proposalList.pageSize
            });
          });
        })
        .catch(() => {});
    }
  }
};
</script>


