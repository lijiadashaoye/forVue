<template>
  <el-form
    ref="lilvForm"
    size="normal"
    :model="lilvForm"
    label-width="130px"
    label-suffix=":"
    class="isForm"
    :rules="rules"
    style="margin:0;width:91%"
  >
    <el-form-item style="width:100%;margin-bottom:0;" required label="新增利率">
      <el-button
        size="mini"
        type="warning"
        @click="addNewLilv"
      >{{addLiLvProp.isInput?'保存利率':'新增利率'}}</el-button>
    </el-form-item>

    <el-form-item style="width:100%;margin-bottom:5px;" label="存期设置" required>
      <div :class="{hasError:hasError,setCunQi:true}">
        <el-input
          @input="isChange"
          type="number"
          style="width:15%;flex-shrink:0;"
          v-model="lilvForm.minDeadline"
          :placeholder="placeHolder"
        ></el-input>&nbsp;
        <el-select
          filterable
          @change="isChange"
          placeholder="期限单位"
          v-model="lilvForm.min_danwei"
          style="width:15%;flex-shrink:0;"
        >
          <el-option
            v-for="item in dictData.deadline_type"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>&nbsp;
        <el-select
          filterable
          @change="isChange_tiaojian"
          placeholder="限制条件"
          v-model="lilvForm.min_symbol"
          style="width:15%;flex-shrink:0;"
        >
          <el-option
            v-for="item in dictData.forMax"
            :key="item.value"
            :label="item.fuhao"
            :value="item.value"
          ></el-option>
        </el-select>

        <h3 style="width:8%;flex-shrink:0;text-align:center;">存期</h3>

        <el-select
          :disabled="placeHolder == '期限'"
          filterable
          @change="isChange"
          placeholder="限制条件"
          v-model="lilvForm.max_symbol"
          style="width:15%;flex-shrink:0;"
        >
          <el-option
            v-for="item in dictData.forMax"
            :key="item.value"
            :label="item.fuhao"
            :value="item.value"
          ></el-option>
        </el-select>&nbsp;
        <el-input
          :disabled="placeHolder == '期限'"
          @input="isChange"
          type="number"
          style="width:15%;flex-shrink:0;"
          v-model="lilvForm.maxDeadline"
          placeholder="最大期限"
        ></el-input>&nbsp;
        <el-select
          :disabled="placeHolder == '期限'"
          filterable
          @change="isChange"
          placeholder="期限单位"
          style="width:15%;flex-shrink:0;"
          v-model="lilvForm.max_danwei"
        >
          <el-option
            v-for="item in dictData.deadline_type"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>&nbsp;
      </div>
    </el-form-item>

    <el-form-item prop="lilv" label="利率%">
      <el-input type="number" @input="isChange" v-model="lilvForm.lilv" placeholder="请输入"></el-input>
    </el-form-item>

    <el-form-item prop="showList" label="榜单展示">
      <el-select filterable placeholder="请选择" v-model="lilvForm.showList" @change="isChange">
        <el-option v-for="item in yes_no" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item prop="lockinPeriod" label="锁定期限">
      <el-input type="number" @input="isChange" v-model="lilvForm.lockinPeriod" placeholder="请输入"></el-input>
    </el-form-item>

    <el-form-item prop="lockinShowList" label="锁定期榜单展示">
      <el-select filterable placeholder="请选择" v-model="lilvForm.lockinShowList" @change="isChange">
        <el-option v-for="item in yes_no" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item prop="showProduct" label="产品展示">
      <el-select filterable placeholder="请选择" v-model="lilvForm.showProduct" @change="isChange">
        <el-option v-for="item in yes_no" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item prop="remark" label="备注" style="width:100%;margin-bottom:0;">
      <el-input
        type="textarea"
        autosize
        v-model="lilvForm.remark"
        @input="isChange"
        placeholder="请输入"
      ></el-input>
    </el-form-item>

    <el-form-item prop="homepageCopywriting" label="首页文案" style="width:100%;margin-bottom:0;">
      <el-input
        type="textarea"
        autosize
        @input="isChange"
        v-model="lilvForm.homepageCopywriting"
        placeholder="请输入"
      ></el-input>
    </el-form-item>
    <el-form-item prop="detailCopywriting" label="详情页文案" style="width:100%;margin-bottom:0;">
      <el-input
        type="textarea"
        autosize
        @input="isChange"
        v-model="lilvForm.detailCopywriting"
        placeholder="请输入"
      ></el-input>
    </el-form-item>

    <el-form-item prop="bankCopywriting" label="银行文案" style="width:100%;margin-bottom:0;">
      <el-input
        type="textarea"
        autosize
        @input="isChange"
        v-model="lilvForm.bankCopywriting"
        placeholder="请输入"
      ></el-input>
    </el-form-item>

    <el-form-item prop="bangdanWrite" label="榜单期限文案" style="width:100%">
      <el-input
        type="textarea"
        autosize
        v-model="lilvForm.bangdanWrite"
        @input="isChange"
        placeholder="请输入"
      ></el-input>
    </el-form-item>

    <div class="suolueWap" v-if="addLiLvProp.lilv_data.length">
      <div v-for="tar of addLiLvProp.lilv_data" :key="tar.num" class="suolue" title="点击进行编辑">
        <p>
          期限:
          <span
            v-if="tar.minDeadline!==''"
            style="font-size:14px;"
          >{{tar.minDeadline}}{{seeDanWei1(tar)}}</span>
          <span
            v-if="tar.minDeadline!==''"
            style="font-size:20px; letter-spacing:-5px;"
          >{{seeFuHao1(tar)}}</span>
          &nbsp;存期
          <span
            v-if="tar.maxDeadline!==''"
            style="font-size:20px;letter-spacing:-4px;"
          >{{seeFuHao2(tar)}}</span>
          <span
            v-if="tar.maxDeadline!==''"
            style="font-size:14px;"
          >&nbsp;&nbsp;{{tar.maxDeadline}}{{seeDanWei2(tar)}}</span>
        </p>
        <p>利率: {{tar.lilv+' %'}}</p>
        <p>榜单展示: {{tar.showList=='YES'?'是':'否'}}</p>
        <p>锁定期限: {{tar.lockinPeriod+'天'}}</p>
        <p>锁定期榜单展示: {{tar.lockinShowList=='YES'?'是':'否'}}</p>
        <p>产品展示: {{tar.showProduct=='YES'?'是':'否'}}</p>
        <p v-if="tar.remark">备注: {{tar.remark}}</p>
        <p v-if="tar.homepageCopywriting">首页文案: {{tar.homepageCopywriting}}</p>
        <p v-if="tar.detailCopywriting">详情页文案: {{tar.detailCopywriting}}</p>
        <p v-if="tar.bankCopywriting">银行文案: {{tar.bankCopywriting}}</p>
        <p v-if="tar.bangdanWrite">榜单期限文案: {{tar.bangdanWrite}}</p>

        <el-button
          class="suolueBtn"
          size="mini"
          icon="el-icon-close"
          type="light"
          circle
          title="删除"
          @click="toShowProp(tar.num)"
        ></el-button>

        <el-button
          class="suolueBtn1"
          size="mini"
          icon="el-icon-edit"
          type="light"
          circle
          title="编辑"
          @click.stop="toEdit(tar)"
        ></el-button>
      </div>
    </div>
  </el-form>
</template>
<script>
export default {
  props: {
    addLiLvProp: Object
  },
  data() {
    // 验证数字 0-100,19字长
    var checkNum6 = (rule, value, callback) => {
      let reg = /\./;
      if (value < 0 || value >= 100) {
        callback(new Error("请输入0 ~ 100之间"));
      } else if (reg.test(value)) {
        let str = ("" + value).split(".")[1].length;
        if (str > 4) {
          this.lilvForm.lilv = (+value).toFixed(4);
          callback(new Error("最多只能输入4位小数"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    var checkNum1 = (rule, value, callback) => {
      if (value < 0) {
        callback(new Error("请输入正数"));
      } else if (("" + value).length > 14 || ("" + value).length < 0) {
        callback(new Error("请输入1-14字符"));
      } else {
        callback();
      }
    };

    return {
      placeHolder: "最小期限",
      hasError: false, // 当利率表格的期限发生错误时使用
      dictData: {},
      yes_no: [{ label: "是", value: "YES" }, { label: "否", value: "NO" }],
      lilvForm: {
        minDeadline: "", // 最小期限
        min_danwei: "", // 最小期限单位
        min_symbol: "", // 最小单位符号
        maxDeadline: "", // 最大期限
        max_danwei: "", // 最大期限单位
        max_symbol: "", // 最小单位符号
        lilv: "", // 利率
        lockinPeriod: "", // 锁定期限
        showList: "", // 榜单展示
        lockinShowList: "", // 锁定期榜单展示
        showProduct: "", // 产品展示
        remark: "", // 备注
        homepageCopywriting: "", // 首页文案
        detailCopywriting: "", // 详情页文案
        bankCopywriting: "", //  银行文案
        bangdanWrite: "" // 榜单期限文案
      },
      num: 0, // 利率列表是否有错误

      //表单验证
      rules: {
        lilv: [
          { required: true, message: "请输入利率", trigger: "blur" },
          { required: true, validator: checkNum6, trigger: "blur" }
        ],
        showList: [
          { required: true, message: "请选择榜单展示", trigger: "change" }
        ],
        lockinPeriod: [
          { required: true, message: "请输入锁定期限", trigger: "blur" },
          { validator: checkNum1, trigger: "blur" }
        ],
        lockinShowList: [
          { required: true, message: "请选择锁定期榜单展示", trigger: "change" }
        ]
      }
    };
  },
  created() {
    this.num = this.addLiLvProp.num;
    if (this.addLiLvProp.lilv_data.length) {
      this.addLiLvProp.lilv_data.forEach(item => (item.num = this.num++));
    }

    this.dictData = JSON.parse(sessionStorage.getItem("dict"));
  },

  methods: {
    isChange() {
      this.addLiLvProp.isInput = true;
    },
    isChange_tiaojian() {
      this.addLiLvProp.isInput = true;
      if (this.lilvForm.min_symbol === "&eq") {
        this.placeHolder = "期限";
      } else {
        this.placeHolder = "最小期限";
      }
      this.lilvForm.max_symbol = "";
      this.lilvForm.maxDeadline = "";
      this.lilvForm.max_danwei = "";
    },
    // 显示预览的单位
    seeDanWei1(tar) {
      let danwei = this.dictData.deadline_type;
      let target = danwei.filter(item => item.value == tar.min_danwei)[0];
      if (target) {
        return target.label;
      }
      return "";
    },
    seeDanWei2(tar) {
      let danwei = this.dictData.deadline_type;
      let target = danwei.filter(item => item.value == tar.max_danwei)[0];
      if (target) {
        return target.label;
      }
      return "";
    },
    seeFuHao1(tar) {
      let target = this.dictData.forMax.filter(
        item => item.value == tar.min_symbol
      )[0];
      if (target) {
        return target.fuhao;
      }
      return "";
    },
    seeFuHao2(tar) {
      let target = this.dictData.forMax.filter(
        item => item.value == tar.max_symbol
      )[0];
      if (target) {
        return target.fuhao;
      }
      return "";
    },
    // 新增利率(点击添加)
    addNewLilv() {
      this.$refs.lilvForm.validate(valid => {
        if (valid) {
          if (this.yanzheng_cunqi()) {
            let obj = {
              num: this.num++,
              ...this.lilvForm
            };

            this.addLiLvProp.lilv_data.push(obj);
            this.addLiLvProp.isInput = false; // 修改为未填入数据的初始化状态

            this.lilvForm = {
              minDeadline: "", // 最小期限
              min_danwei: "", // 最小期限单位
              min_symbol: "", // 最小单位符号
              maxDeadline: "", // 最大期限
              max_danwei: "", // 最大期限单位
              max_symbol: "", // 最小单位符号
              lilv: "", // 利率
              lockinPeriod: "", // 锁定期限
              showList: "", // 榜单展示
              lockinShowList: "", // 锁定期榜单展示
              showProduct: "",
              remark: "", // 备注
              bangdanWrite: "",
              homepageCopywriting: "", // 首页文案
              detailCopywriting: "", // 详情页文案
              bankCopywriting: "" //  银行文案
            };
            this.placeHolder = "最小期限";
            this.$refs.lilvForm.resetFields();
          } else {
            this.hasError = true;
            setTimeout(() => (this.hasError = false), 5000);
          }
        } else {
          this.$message.error("请完整填写利率数据！");
        }
      });
    },
    // 验证存期设置
    yanzheng_cunqi() {
      let isOk = true,
        min_value = this.lilvForm.minDeadline, // 最小期限值
        min_danwei = this.lilvForm.min_danwei, // 最小期限单位
        min_symbol = this.lilvForm.min_symbol, // 最小期限符号
        max_value = this.lilvForm.maxDeadline, // 最大期限值
        max_danwei = this.lilvForm.max_danwei, // 最大期限单位
        max_symbol = this.lilvForm.max_symbol; //  最大期限符号

      // 验证最小区间
      if (min_value || min_danwei || min_symbol) {
        if (
          !(min_value >= 0 && min_danwei && min_symbol) ||
          min_value.length > 10
        ) {
          isOk = false;
        }
      }
      // 验证最大区间
      if (max_value || max_danwei || max_symbol) {
        if (
          !(max_value >= 0 && max_danwei && max_symbol) ||
          max_value.length > 10
        ) {
          isOk = false;
        }
      }

      if (
        !(
          min_value ||
          min_danwei ||
          min_symbol ||
          max_value ||
          max_danwei ||
          max_symbol
        )
      ) {
        isOk = false;
      }

      if (
        min_value >= 0 &&
        min_danwei &&
        min_symbol &&
        max_value >= 0 &&
        max_danwei &&
        max_symbol
      ) {
        if (+min_value * +min_danwei >= +max_value * +max_danwei) {
          isOk = false;
        }
        if (min_value.length > 10 || max_value.length > 10) {
          isOk = false;
        }
      }
      return isOk;
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
    toDelete(num) {
      let index = this.addLiLvProp.lilv_data.findIndex(tar => tar.num == num);
      this.addLiLvProp.lilv_data.splice(index, 1);
    },
    toEdit(item) {
      this.toDelete(item.num);
      this.lilvForm = { ...item };
      this.addLiLvProp.isInput = true;
      delete this.lilvForm.num;
    }
  }
};
</script>
<style scoped='true' >
.suolueBtn {
  position: absolute;
  top: -14px;
  right: 0px;
}
.suolueBtn1 {
  position: absolute;
  top: -15px;
  right: 32px;
}
.setCunQi {
  display: flex;
  justify-content: flex-start;
  padding: 5px 4px 0 2px;
  position: relative;
}
.hasError {
  animation: blingbling 2s infinite;
}
.hasError::after {
  content: "存期设置数据输入有误，且都不可以超过10个字符！";
  position: absolute;
  top: -35px;
  left: 30%;
  color: red;
  font-size: 16px;
}
</style>