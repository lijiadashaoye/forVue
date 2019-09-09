<template>
  <div class="componentWaper">
    <div id="forHeader">
      <h3 style="margin-bottom:10px">{{pageName}}</h3>
      <el-form
        :inline="true"
        :model="searchForm"
        :rules="searchRules"
        ref="searchForm"
        class="demo-form-inline"
      >
        <el-form-item label="创建起始时间:" prop="createTime">
          <el-date-picker
            v-model="searchForm.createTime"
            size="mini"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="更新起始时间:" prop="updateTime">
          <el-date-picker
            v-model="searchForm.updateTime"
            size="mini"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="交易状态" prop="newestStatus">
          <el-select
            filterable
            v-model="searchForm.newestStatus"
            placeholder="请选择"
            size="mini"
            clearable
          >
            <el-option
              v-for="(item,ind) in neweStatusOpt"
              :key="ind"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="比财流水号" prop="serialNum">
          <el-input v-model="searchForm.serialNum" placeholder="请输入" size="mini"></el-input>
        </el-form-item>

        <el-form-item label="收款帐号" prop="receivingCard">
          <el-input v-model="searchForm.receivingCard" placeholder="请输入" size="mini"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="search('searchForm')" size="mini">查询</el-button>
          <el-button @click="resetForm('searchForm')" size="mini" type="info" plain>清除</el-button>
          <el-button @click="exportForm" size="mini" type="success">导出</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div id="forTable">
      <isTable :inputData="this.$store.state.cashOut.cashList" @tableEmit="tableEmit" />
    </div>
  </div>
</template>

<script>
import isTable from "../../../components/isTable/isTable";
import Axios from "../../../sets/axios_set";
import { mapActions, mapMutations } from "vuex";
import utilMethod from "../../../sets/util-method";
import {
  cash_out_payment,
  cash_out_applyFor,
  cash_out_turnDown,
  cash_out_operation,
  cash_out_export
} from "../../../api/setting_use";
export default {
  components: {
    isTable
  },
  data() {
    return {
      pageName: "",
      searchForm: {
        //查询表单
        createTime: [], //创建起始时间
        updateTime: [], //更新起始时间
        newestStatus: "", //交易状态
        serialNum: "", //比财流水帐号
        receivingCard: "" //收款帐号
      },
      searchRules: {},
      neweStatusOpt: [
        //交易状态
        {
          value: 0,
          label: "提现成功"
        },
        {
          value: 1,
          label: "提现失败"
        },
        {
          value: 2,
          label: "处理中"
        },
        {
          value: 3,
          label: "提现申请成功"
        },
        {
          value: 4,
          label: "驳回"
        }
      ]
    };
  },
  mounted() {
    this.pageName = this.$route.name;
    this.getList({
      pageNum: 1,
      pageSize: this.$store.state.cashOut.cashList.pageSize
    });
    this.userDo();
    this.$store.state.cashOut.cashList.data.title = [
      {
        title: "比财流水号",
        key: "serialNum",
        minWidth: "260"
      },
      {
        title: "支付订单号",
        key: "lianlianNum",
        minWidth: "160"
      },
      {
        title: "收款人姓名",
        key: "payeeName",
        minWidth: "100"
      },
      {
        title: "收款银行卡",
        key: "receivingCard",
        minWidth: "160"
      },
      {
        title: "提款创建时间",
        key: "gmtCreated",
        minWidth: "160"
      },
      {
        title: "付款状态更新时间",
        key: "newestStatusDate",
        minWidth: "160"
      },
      {
        title: "交易金额(元)",
        key: "amount",
        minWidth: "120"
      },
      {
        title: "交易状态",
        key: "newestStatus",
        minWidth: "140"
      }
    ];
  },
  methods: {
    ...mapActions({
      getList: "cashOut/getList"
    }),
    ...mapMutations({
      userDo: "cashOut/userDo"
    }),
    //确认付款
    payment(data) {
      const obj = {
        memberId: data.memberId,
        recordId: data.id,
        money_order: data.amount,
        confirmCode: data.confirmCode
      };
      this.$confirm("确认要通过该笔交易吗？", "确认付款", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          cash_out_payment(obj).then(res => {
            if (res && res.success) {
              this.getList({
                pageNum: this.$store.state.cashOut.cashList.pageNum,
                pageSize: this.$store.state.cashOut.cashList.pageSize,
                createStart:
                  this.searchForm.createTime[0] != null &&
                  this.searchForm.createTime[0] != ""
                    ? this.searchForm.createTime[0]
                    : null,
                createEnd:
                  this.searchForm.createTime[1] != null &&
                  this.searchForm.createTime[1] != ""
                    ? this.searchForm.createTime[1]
                    : null,
                updateStart:
                  this.searchForm.updateTime[0] != null &&
                  this.searchForm.updateTime[0] != ""
                    ? this.searchForm.updateTime[0]
                    : null,
                updateEnd:
                  this.searchForm.updateTime[1] != null &&
                  this.searchForm.updateTime[1] != ""
                    ? this.searchForm.updateTime[1]
                    : null,
                serialNum:
                  this.searchForm.serialNum != "" &&
                  this.searchForm.serialNum != null
                    ? this.searchForm.serialNum
                    : null,
                receivingCard:
                  this.searchForm.receivingCard != "" &&
                  this.searchForm.receivingCard != null
                    ? this.searchForm.receivingCard
                    : null,
                newestStatus:
                  this.searchForm.newestStatus != "" &&
                  this.searchForm.newestStatus != null
                    ? this.searchForm.newestStatus
                    : null
              });
              this.$message({
                type: "success",
                message: "交易成功!"
              });
            }
          });
        })
        .catch(() => {
          return;
        });
    },
    //申请付款
    applyFor(data) {
      this.$confirm("确认要申请付款吗？", "申请付款", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(res => {
          cash_out_applyFor(data.id).then(res => {
            if (res && res.success) {
              this.getList({
                pageNum: this.$store.state.cashOut.cashList.pageNum,
                pageSize: this.$store.state.cashOut.cashList.pageSize,
                createStart:
                  this.searchForm.createTime[0] != null &&
                  this.searchForm.createTime[0] != ""
                    ? this.searchForm.createTime[0]
                    : null,
                createEnd:
                  this.searchForm.createTime[1] != null &&
                  this.searchForm.createTime[1] != ""
                    ? this.searchForm.createTime[1]
                    : null,
                updateStart:
                  this.searchForm.updateTime[0] != null &&
                  this.searchForm.updateTime[0] != ""
                    ? this.searchForm.updateTime[0]
                    : null,
                updateEnd:
                  this.searchForm.updateTime[1] != null &&
                  this.searchForm.updateTime[1] != ""
                    ? this.searchForm.updateTime[1]
                    : null,
                serialNum:
                  this.searchForm.serialNum != "" &&
                  this.searchForm.serialNum != null
                    ? this.searchForm.serialNum
                    : null,
                receivingCard:
                  this.searchForm.receivingCard != "" &&
                  this.searchForm.receivingCard != null
                    ? this.searchForm.receivingCard
                    : null,
                newestStatus:
                  this.searchForm.newestStatus != "" &&
                  this.searchForm.newestStatus != null
                    ? this.searchForm.newestStatus
                    : null
              });
              this.$message({
                type: "success",
                message: "申请成功!"
              });
            }
          });
        })
        .catch(() => {
          return;
        });
    },
    //驳回申请
    turnDown(data) {
      this.$confirm("确认要驳回申请吗？", "驳回申请", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(res => {
          cash_out_turnDown(data.id).then(res => {
            if (res && res.success) {
              this.getList({
                pageNum: this.$store.state.cashOut.cashList.pageNum,
                pageSize: this.$store.state.cashOut.cashList.pageSize,
                createStart:
                  this.searchForm.createTime[0] != null &&
                  this.searchForm.createTime[0] != ""
                    ? this.searchForm.createTime[0]
                    : null,
                createEnd:
                  this.searchForm.createTime[1] != null &&
                  this.searchForm.createTime[1] != ""
                    ? this.searchForm.createTime[1]
                    : null,
                updateStart:
                  this.searchForm.updateTime[0] != null &&
                  this.searchForm.updateTime[0] != ""
                    ? this.searchForm.updateTime[0]
                    : null,
                updateEnd:
                  this.searchForm.updateTime[1] != null &&
                  this.searchForm.updateTime[1] != ""
                    ? this.searchForm.updateTime[1]
                    : null,
                serialNum:
                  this.searchForm.serialNum != "" &&
                  this.searchForm.serialNum != null
                    ? this.searchForm.serialNum
                    : null,
                receivingCard:
                  this.searchForm.receivingCard != "" &&
                  this.searchForm.receivingCard != null
                    ? this.searchForm.receivingCard
                    : null,
                newestStatus:
                  this.searchForm.newestStatus != "" &&
                  this.searchForm.newestStatus != null
                    ? this.searchForm.newestStatus
                    : null
              });
              this.$message({
                type: "success",
                message: "操作成功!"
              });
            }
          });
        })
        .catch(() => {
          return;
        });
    },
    //手动查单
    operation(data) {
      this.$confirm("确认要手动查单吗？", "手动查单", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          cash_out_operation(data.id).then(res => {
            if (res && res.success) {
              this.getList({
                pageNum: this.$store.state.cashOut.cashList.pageNum,
                pageSize: this.$store.state.cashOut.cashList.pageSize,
                createStart:
                  this.searchForm.createTime[0] != null &&
                  this.searchForm.createTime[0] != ""
                    ? this.searchForm.createTime[0]
                    : null,
                createEnd:
                  this.searchForm.createTime[1] != null &&
                  this.searchForm.createTime[1] != ""
                    ? this.searchForm.createTime[1]
                    : null,
                updateStart:
                  this.searchForm.updateTime[0] != null &&
                  this.searchForm.updateTime[0] != ""
                    ? this.searchForm.updateTime[0]
                    : null,
                updateEnd:
                  this.searchForm.updateTime[1] != null &&
                  this.searchForm.updateTime[1] != ""
                    ? this.searchForm.updateTime[1]
                    : null,
                serialNum:
                  this.searchForm.serialNum != "" &&
                  this.searchForm.serialNum != null
                    ? this.searchForm.serialNum
                    : null,
                receivingCard:
                  this.searchForm.receivingCard != "" &&
                  this.searchForm.receivingCard != null
                    ? this.searchForm.receivingCard
                    : null,
                newestStatus:
                  this.searchForm.newestStatus != "" &&
                  this.searchForm.newestStatus != null
                    ? this.searchForm.newestStatus
                    : null
              });
              this.$message({
                type: "success",
                message: "操作成功!"
              });
            }
          });
        })
        .catch(() => {
          return;
        });
    },
    tableEmit(data) {
      switch (data.type) {
        case "regetData": // 分页的emit
          this.getList({
            pageNum: this.$store.state.cashOut.cashList.pageNum,
            pageSize: this.$store.state.cashOut.cashList.pageSize
          });
          break;
        case "payment": // 确认付款
          this.payment(data.data);
          break;
        case "applyFor": // 申请付款
          this.applyFor(data.data);
          break;
        case "turnDown": // 驳回申请
          this.turnDown(data.data);
          break;
        case "operation": // 手动查单
          this.operation(data.data);
          break;
      }
    },
    search(formName) {
      this.getList({
        pageNum: 1,
        pageSize: this.$store.state.cashOut.cashList.pageSize,
        createStart:
          this.searchForm.createTime[0] != null &&
          this.searchForm.createTime[0] != ""
            ? this.searchForm.createTime[0]
            : null,
        createEnd:
          this.searchForm.createTime[1] != null &&
          this.searchForm.createTime[1] != ""
            ? this.searchForm.createTime[1]
            : null,
        updateStart:
          this.searchForm.updateTime[0] != null &&
          this.searchForm.updateTime[0] != ""
            ? this.searchForm.updateTime[0]
            : null,
        updateEnd:
          this.searchForm.updateTime[1] != null &&
          this.searchForm.updateTime[1] != ""
            ? this.searchForm.updateTime[1]
            : null,
        serialNum:
          this.searchForm.serialNum != "" && this.searchForm.serialNum != null
            ? this.searchForm.serialNum
            : null,
        receivingCard:
          this.searchForm.receivingCard != "" &&
          this.searchForm.receivingCard != null
            ? this.searchForm.receivingCard
            : null,
        newestStatus:
          this.searchForm.newestStatus != "" &&
          this.searchForm.newestStatus != null
            ? this.searchForm.newestStatus
            : null
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.getList({
        pageNum: 1,
        pageSize: this.$store.state.cashOut.cashList.pageSize,
        createStart:
          this.searchForm.createTime[0] != null &&
          this.searchForm.createTime[0] != ""
            ? this.searchForm.createTime[0]
            : null,
        createEnd:
          this.searchForm.createTime[1] != null &&
          this.searchForm.createTime[1] != ""
            ? this.searchForm.createTime[1]
            : null,
        updateStart:
          this.searchForm.updateTime[0] != null &&
          this.searchForm.updateTime[0] != ""
            ? this.searchForm.updateTime[0]
            : null,
        updateEnd:
          this.searchForm.updateTime[1] != null &&
          this.searchForm.updateTime[1] != ""
            ? this.searchForm.updateTime[1]
            : null,
        serialNum:
          this.searchForm.serialNum != "" && this.searchForm.serialNum != null
            ? this.searchForm.serialNum
            : null,
        receivingCard:
          this.searchForm.receivingCard != "" &&
          this.searchForm.receivingCard != null
            ? this.searchForm.receivingCard
            : null,
        newestStatus:
          this.searchForm.newestStatus != "" &&
          this.searchForm.newestStatus != null
            ? this.searchForm.newestStatus
            : null
      });
    },
    //导出
    exportForm() {
      let params = {
        createStart:
          this.searchForm.createTime[0] != null &&
          this.searchForm.createTime[0] != ""
            ? this.searchForm.createTime[0]
            : null,
        createEnd:
          this.searchForm.createTime[1] != null &&
          this.searchForm.createTime[1] != ""
            ? this.searchForm.createTime[1]
            : null,
        updateStart:
          this.searchForm.updateTime[0] != null &&
          this.searchForm.updateTime[0] != ""
            ? this.searchForm.updateTime[0]
            : null,
        updateEnd:
          this.searchForm.updateTime[1] != null &&
          this.searchForm.updateTime[1] != ""
            ? this.searchForm.updateTime[1]
            : null,
        serialNum:
          this.searchForm.serialNum != "" && this.searchForm.serialNum != null
            ? this.searchForm.serialNum
            : null,
        receivingCard:
          this.searchForm.receivingCard != "" &&
          this.searchForm.receivingCard != null
            ? this.searchForm.receivingCard
            : null,
        newestStatus:
          this.searchForm.newestStatus != "" &&
          this.searchForm.newestStatus != null
            ? this.searchForm.newestStatus
            : null
      };
      Axios({
        method: "post",
        url: "member/manager/member-wallet/cash-orders/excel",
        data: params,
        responseType: "blob"
      }).then(res => {
        var reader = new FileReader();
        reader.onload = e => {
          let url = window.URL.createObjectURL(new Blob([res]));
          let link = document.createElement("a");
          link.style.display = "none";
          link.href = url;
          link.setAttribute(
            "download",
            "提现管理_" + utilMethod.nowTime() + ".xls"
          );
          document.body.appendChild(link);
          link.click();
        };
        reader.readAsText(res);
      });
    }
  }
};
</script>

<style>
</style>
