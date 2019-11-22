<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>

      <el-form :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm" label-width="80px">
        <el-form-item label="期限名称" prop="peroidName" style="margin-bottom:5px">
          <el-input v-model="ruleForm.peroidName" placeholder="请输入期限名称" size="mini"></el-input>
        </el-form-item>

        <el-form-item label="期限类型" prop="peroidType" style="margin-bottom:5px">
          <el-select v-model="ruleForm.peroidType" placeholder="请选择" size="mini">
            <el-option
              v-for="(item,ind) in peroidTypeList"
              :key="ind"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item style="margin-bottom:5px">
          <el-button type="warning" @click="search('ruleForm')" size="mini">查询</el-button>
          <el-button type="danger" @click="resetForm('ruleForm')" size="mini">清除</el-button>
          <el-button type="primary" size="mini" @click="addPeroid">新 建</el-button>
          <el-button type="info" size="mini" @click="tongBu">同 步</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div id="forTable">
      <isTable :inputData="this.$store.state.peroid.peroidList" @tableEmit="tableEmit" />
    </div>

    <el-dialog
      :close-on-click-modal="false"
      width="400px"
      title="修改"
      :visible.sync="dialogFormVisible"
    >
      <peroid
        :appChannel.sync="this.$store.state.protocol.appChannel"
        :params="params"
        @cancel="cancel"
        @send="send"
      />
    </el-dialog>
  </div>
</template>

<script>
import isTable from "../../../components/isTable/isTable";
import { mapActions, mapMutations } from "vuex";
import peroid from "../../../components/peroid";
import { peroid_updata, peroid_delete } from "../../../api/setting_use.js";

export default {
  components: {
    isTable,
    peroid
  },
  data() {
    return {
      env: null,
      pageName: "",
      dialogFormVisible: false,
      params: "",
      ruleForm: {
        peroidName: "",
        peroidType: ""
      },
      rules: {},
      peroidTypeList: [
        {
          label: "中国",
          value: "PETTY"
        },
        {
          label: "香港",
          value: "FINANCING"
        }
      ]
    };
  },
  mounted() {
    this.env = sessionStorage.getItem("env") === "development";

    this.pageName = this.$route.name;
    this.userDo();
    this.$store.state.peroid.peroidList.pageNum = 1;
    this.getList({
      pageNum: 1,
      pageSize: this.$store.state.peroid.peroidList.pageSize
    });
    this.getAppChannel();
    this.$store.state.peroid.peroidList.data.title = [
      {
        title: "期限名称",
        key: "peroidName",
        minWidth: "120"
      },
      {
        title: "期限类型",
        key: "peroidTypeCN",
        minWidth: "100"
      },
      {
        title: "开始天",
        key: "startDay",
        minWidth: "120"
      },
      {
        title: "结束天",
        key: "endDay",
        minWidth: "120"
      },
      {
        title: "排序值",
        key: "sort",
        minWidth: "80"
      },
      {
        title: "有效标识",
        key: "validStatusCN",
        minWidth: "80"
      },
      {
        title: "限制条数",
        key: "pageSize",
        minWidth: "80"
      },
      {
        title: "总条数",
        key: "total",
        minWidth: "80"
      }
    ];
  },
  methods: {
    ...mapActions({
      getList: "peroid/getList"
    }),
    ...mapMutations({
      userDo: "peroid/userDo",
      getAppChannel: "protocol/getAppChannel"
    }),
    cancel() {
      this.dialogFormVisible = false;
      this.params = {};
    },
    tongBu() {
      this.$api
        .tongbu({
          vm: this
        })
        .then(res => {
          if (res) {
            this.$message.success("同步成功，榜单期限列的数据将会被重置！");
          }
        });
    },
    search(formName) {
      this.$refs[formName].validate(valid => {
        this.$store.state.peroid.peroidList.pageNum = 1;
        if (valid) {
          this.getList({
            pageNum: this.$store.state.peroid.peroidList.pageNum,
            pageSize: this.$store.state.peroid.peroidList.pageSize,
            peroidName:
              this.ruleForm.peroidName != "" ? this.ruleForm.peroidName : null,
            peroidType:
              this.ruleForm.peroidType != "" ? this.ruleForm.peroidType : null
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$store.state.peroid.peroidList.pageNum = 1;
      this.getList({
        pageNum: 1,
        pageSize: this.$store.state.peroid.peroidList.pageSize
      });
    },
    addPeroid() {
      let jurisdiction = JSON.parse(
        sessionStorage.getItem("buttenpremissions")
      );
      if (jurisdiction.indexOf("index_peroid_add") > -1) {
        this.$router.push({
          path: "/home/setting/index-peroid/add"
        });
      } else {
        //弹出消息提示用户
        this.$alert("您没有这个权限", {
          confirmButtonText: "确定"
        });
      }
    },
    //删除
    delete(data) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          peroid_delete(data).then(res => {
            if (res && res.success) {
              this.getList({
                pageNum: this.$store.state.peroid.peroidList.pageNum,
                pageSize: this.$store.state.peroid.peroidList.pageSize,
                peroidName:
                  this.ruleForm.peroidName != ""
                    ? this.ruleForm.peroidName
                    : null,
                peroidType:
                  this.ruleForm.peroidType != ""
                    ? this.ruleForm.peroidType
                    : null
              });
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //修改
    edit(data) {
      this.dialogFormVisible = true;
      this.params = data;
    },
    //点击保存
    send(data) {
      peroid_updata(data)
        .then(res => {
          if (res && res.success) {
            this.dialogFormVisible = false;
            this.$message.success("保存成功");
            this.getList({
              pageNum: this.$store.state.peroid.peroidList.pageNum,
              pageSize: this.$store.state.peroid.peroidList.pageSize,
              peroidName:
                this.ruleForm.peroidName != ""
                  ? this.ruleForm.peroidName
                  : null,
              peroidType:
                this.ruleForm.peroidType != "" ? this.ruleForm.peroidType : null
            });
          }
        })
        .catch(res => {
          //弹出消息提示用户
          this.$message({
            type: "info",
            message: `action: ${res.message}`
          });
        });
    },
    // 监听表格的操作
    tableEmit(data) {
      switch (data.type) {
        case "regetData": // 分页的emit
          this.getList({
            pageNum: this.$store.state.peroid.peroidList.pageNum,
            pageSize: this.$store.state.peroid.peroidList.pageSize,
            peroidName:
              this.ruleForm.peroidName != "" ? this.ruleForm.peroidName : null,
            peroidType:
              this.ruleForm.peroidType != "" ? this.ruleForm.peroidType : null
          });
          break;
        case "delete": // 删除按钮
          this.delete(data.data.id);
          break;
        case "edit": // 修改
          this.edit(data.data);
          break;
      }
    }
  }
};
</script>

