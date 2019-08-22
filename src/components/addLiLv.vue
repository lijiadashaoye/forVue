<template>
  <el-form
    ref="lilvForm"
    size="normal"
    :model="lilvForm"
    label-width="150px"
    label-suffix=":"
    class="isForm"
    :rules="rules"
  >
    <el-form-item style="width:100%;" required label="新增利率">
      <el-button size="mini" type="warning" @click="addNewLilv">保存利率</el-button>
    </el-form-item>

    <el-form-item style="width:100%;" label="存期设置" required>
      <div :class="{hasError:hasError,setCunQi:true}">
        <el-select
          @change="isChange"
          placeholder="限制条件"
          v-model="lilvForm.min_symbol"
          style="width:15%;flex-shrink:0;"
        >
          <el-option
            v-for="item in cunqi_symbol.forMin"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>&nbsp;
        <el-input
          @input="isChange"
          type="number"
          style="width:15%;flex-shrink:0;"
          v-model="lilvForm.minDeadline"
          placeholder="最小期限"
        ></el-input>&nbsp;
        <el-select
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
        </el-select>
        <h3 style="width:8%;flex-shrink:0;text-align:center;">存期</h3>
        <el-select
          @change="isChange"
          placeholder="限制条件"
          v-model="lilvForm.max_symbol"
          style="width:15%;flex-shrink:0;"
        >
          <el-option
            v-for="item in cunqi_symbol.forMax"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>&nbsp;
        <el-input
          @input="isChange"
          type="number"
          style="width:15%;flex-shrink:0;"
          v-model="lilvForm.maxDeadline"
          placeholder="最大期限"
        ></el-input>&nbsp;
        <el-select
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
      <el-select placeholder="请选择" v-model="lilvForm.showList" @change="isChange">
        <el-option v-for="item in yes_no" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item prop="lockinPeriod" label="锁定期限">
      <el-input type="number" @input="isChange" v-model="lilvForm.lockinPeriod" placeholder="请输入"></el-input>
    </el-form-item>

    <el-form-item prop="lockinShowList" label="锁定期榜单展示">
      <el-select placeholder="请选择" v-model="lilvForm.lockinShowList" @change="isChange">
        <el-option v-for="item in yes_no" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item prop="remark" label="备注" style="width:100%;">
      <el-input
        type="textarea"
        autosize
        v-model="lilvForm.remark"
        @input="isChange"
        placeholder="请输入"
      ></el-input>
    </el-form-item>

    <el-form-item prop="homepageCopywriting" label="首页文案" style="width:100%;">
      <el-input
        type="textarea"
        autosize
        @input="isChange"
        v-model="lilvForm.homepageCopywriting"
        placeholder="请输入"
      ></el-input>
    </el-form-item>
    <el-form-item prop="detailCopywriting" label="详情页文案" style="width:100%;">
      <el-input
        type="textarea"
        autosize
        @input="isChange"
        v-model="lilvForm.detailCopywriting"
        placeholder="请输入"
      ></el-input>
    </el-form-item>

    <el-form-item prop="bankCopywriting" label="银行文案" style="width:100%;">
      <el-input
        type="textarea"
        autosize
        @input="isChange"
        v-model="lilvForm.bankCopywriting"
        placeholder="请输入"
      ></el-input>
    </el-form-item>

    <div class="suolueWap" v-if="addLiLvProp.lilv_data.length">
      <div v-for="tar of addLiLvProp.lilv_data" :key="tar.num" class="suolue">
        <p>
          期限:
          <span style="font-size:14px;">{{tar.minDeadline}}{{seeDanWei1(tar)}}</span>
          <span style="font-size:20px; letter-spacing:-5px;">{{seeFuHao1(tar)}}</span>
          &nbsp;存期
          <span style="font-size:20px;letter-spacing:-4px;">{{seeFuHao2(tar)}}</span>
          <span style="font-size:14px;">&nbsp;&nbsp;{{tar.maxDeadline}}{{seeDanWei2(tar)}}</span>
        </p>
        <p>利率: {{tar.lilv+' %'}}</p>
        <p>榜单展示: {{tar.showList=='YES'?'是':'否'}}</p>
        <p>锁定期限: {{tar.lockinPeriod=='YES'?'是':'否'}}</p>
        <p>锁定期榜单展示: {{tar.lockinShowList=='YES'?'是':'否'}}</p>
        <p v-if="tar.homepageCopywriting">备注: {{tar.remark}}</p>
        <p v-if="tar.homepageCopywriting">首页文案: {{tar.homepageCopywriting}}</p>
        <p v-if="tar.detailCopywriting">详情页文案: {{tar.detailCopywriting}}</p>
        <p v-if="tar.bankCopywriting">银行文案: {{tar.bankCopywriting}}</p>
        <el-button
          class="suolueBtn"
          size="mini"
          icon="el-icon-close"
          type="light"
          circle
          title="删除"
          @click="toShowProp(tar.num)"
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
      if (!value) {
        callback(new Error("请正确输入"));
      } else if (value < 0 || value >= 100) {
        callback(new Error("请输入0 ~ 100"));
      } else if (("" + value).length > 19 || ("" + value).length < 0) {
        callback(new Error("请输入1-19字符"));
      } else {
        callback();
      }
    };

    return {
      hasError: false, // 当利率表格的期限发生错误时使用
      cunqi_symbol: {
        forMin: [], // 最小期限限制条件
        forMax: [] // 最大期限限制条件
      },
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
        remark: "", // 备注
        homepageCopywriting: "", // 首页文案
        detailCopywriting: "", // 详情页文案
        bankCopywriting: "" //  银行文案
      },
      num: 0, // 利率列表是否有错误

      //表单验证
      rules: {
        lilv: [{ required: true, validator: checkNum6, trigger: "blur" }],
        showList: [
          { required: true, message: "请选择榜单展示", trigger: "change" }
        ],
        lockinPeriod: [
          { required: true, message: "请选择锁定期限", trigger: "change" }
        ],
        lockinShowList: [
          { required: true, message: "请选择锁定期榜单展示", trigger: "change" }
        ]
      }
    };
  },
  created() {
    this.num = this.addLiLvProp.num;
    this.dictData = JSON.parse(sessionStorage.getItem("dict"));
    this.dictData.rule_symbol.forEach(tar => {
      switch (tar.value) {
        case "&lt":
          this.cunqi_symbol.forMax.push({
            label: tar.label,
            fuhao: "<",
            value: tar.value
          });
          break;
        case "&le":
          this.cunqi_symbol.forMax.push({
            label: tar.label,
            fuhao: "<=",
            value: tar.value
          });
          break;
        case "&gt":
          this.cunqi_symbol.forMin.push({
            label: tar.label,
            fuhao: "<",
            value: tar.value
          });
          break;
        case "&ge":
          this.cunqi_symbol.forMin.push({
            label: tar.label,
            fuhao: "<=",
            value: tar.value
          });
          break;
        case "=":
          this.cunqi_symbol.forMax.push({
            label: tar.label,
            fuhao: "=",
            value: tar.value
          });
          this.cunqi_symbol.forMin.push({
            label: tar.label,
            fuhao: "=",
            value: tar.value
          });
          break;
      }
    });
  },
  methods: {
    isChange() {
      this.addLiLvProp.isInput = true;
    },
    // 显示预览的单位
    seeDanWei1(tar) {
      let danwei = this.dictData.deadline_type;
      return danwei.filter(item => item.value === tar.min_danwei)[0].label;
    },
    seeDanWei2(tar) {
      let danwei = this.dictData.deadline_type;
      return danwei.filter(item => item.value === tar.max_danwei)[0].label;
    },
    seeFuHao1(tar) {
      return this.cunqi_symbol.forMin.filter(
        item => item.value === tar.min_symbol
      )[0].fuhao;
    },
    seeFuHao2(tar) {
      return this.cunqi_symbol.forMax.filter(
        item => item.value === tar.max_symbol
      )[0].fuhao;
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
            console.log(this.addLiLvProp);
            this.addLiLvProp.lilv_data.push(obj);
            this.addLiLvProp.isInput = false;

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
              remark: "", // 备注
              homepageCopywriting: "", // 首页文案
              detailCopywriting: "", // 详情页文案
              bankCopywriting: "" //  银行文案
            };
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
      let min_value = this.lilvForm.minDeadline, // 最小期限值
        min_danwei = this.lilvForm.min_danwei, // 最小期限单位
        min_symbol = this.lilvForm.min_symbol, // 最小期限符号
        max_value = this.lilvForm.maxDeadline, // 最大期限值
        max_danwei = this.lilvForm.max_danwei, // 最大期限单位
        max_symbol = this.lilvForm.max_symbol; //  最大期限符号

      if (
        min_value &&
        min_danwei &&
        max_value &&
        max_danwei &&
        min_symbol &&
        max_symbol
      ) {
        if (+min_value * +min_danwei > +max_value * +max_danwei) {
          return false;
        }
        return true;
      } else {
        return false;
      }
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
    }
  }
};
</script>
<style scoped='true' >
.suolueWap {
  display: flex;
  flex-wrap: wrap;
}
.suolue {
  width: 180px;
  position: relative;
  margin: 0 5px 15px 0;
  padding: 5px;
  border-radius: 5px 0px 5px 5px;
  background: rgb(197, 243, 180);
  font-size: 14px;
}
.suolueBtn {
  position: absolute;
  top: -14px;
  right: 0px;
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
  content: "最小期限不能比最大期限大！";
  position: absolute;
  top: -35px;
  left: 30%;
  color: red;
  font-size: 16px;
}
</style>