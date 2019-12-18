<template>
  <el-form
    :inline="true"
    :rules="rules"
    ref="inData"
    :model="inData"
    style="display:flex;padding-bottom:12px;"
  >
    <el-form-item prop="type">
      <el-radio-group v-model="inData.type" @change="hasChange" style="width:160px;">
        <el-radio label="日期"></el-radio>
        <el-radio label="周期"></el-radio>
      </el-radio-group>
    </el-form-item>

    <div v-if="inData.type==='日期'" style="width:100%;display:flex">
      <el-form-item prop="startTime" label-width="30px">
        <el-date-picker
          v-model="inData.startTime"
          size="mini"
          type="datetime"
          placeholder="开始时间(必填)"
          value-format="yyyy-MM-dd HH:mm:ss"
        ></el-date-picker>
      </el-form-item>
      <span style="padding-right:10px;">至</span>
      <el-form-item prop="endTime" label-width="0">
        <el-date-picker
          value-format="yyyy-MM-dd HH:mm:ss"
          v-model="inData.endTime"
          size="mini"
          type="datetime"
          placeholder="结束时间(选填)"
        ></el-date-picker>
      </el-form-item>
    </div>
    <el-form-item v-if="inData.type==='周期'" style="width:100%;" prop="zhouqi">
      <el-select
        multiple
        filterable
        size="mini"
        placeholder="选择时间"
        v-model="inData.zhouqi"
        style="width:440px"
      >
        <el-option v-for="item in list" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>

    <el-popover placement="top-end" width="160" v-model="visible">
      <p>确定删除吗？</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="visible = false">取消</el-button>
        <el-button type="primary" size="mini" @click="timeAction">确定</el-button>
      </div>
      <i class="el-icon-delete isI" slot="reference" title="删除"></i>
    </el-popover>
  </el-form>
</template>  
<script>
export default {
  props: {
    inData: Object
  },
  data() {
    var check_startTime = (rule, value, callback) => {
      if (this.inData.type === "日期") {
        let start = this.inData.startTime,
          end = this.inData.endTime;
        if (!start) {
          callback(new Error("请选择开始时间！"));
        } else if (end && end <= start) {
          callback(new Error("开始时间不能晚于结束时间！"));
        } else {
          callback();
        }
      }
    };
    var check_endTime = (rule, value, callback) => {
      if (this.inData.type === "日期") {
        let start = this.inData.startTime,
          end = this.inData.endTime;
        if (!end) {
          callback(new Error("请选择结束时间！"));
        } else if (start && end <= start) {
          callback(new Error("结束时间不能早于开始时间！"));
        } else {
          callback();
        }
      }
    };
    var check_zhouqi = (rule, value, callback) => {
      if (this.inData.type === "周期") {
        if (value.length === 0) {
          callback(new Error("请输入周期时间！"));
        } else {
          callback();
        }
      }
    };
    var check_type = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请选择时间类型！"));
      } else {
        callback();
      }
    };

    return {
      rules: {
        type: { validator: check_type, trigger: "blur" },
        startTime: { validator: check_startTime, trigger: "change" },
        endTime: { validator: check_endTime, trigger: "change" },
        zhouqi: { validator: check_zhouqi, trigger: "change" }
      },
      visible: false,
      list: [
        {
          value: 1,
          label: "周日"
        },
        {
          value: 2,
          label: "周一"
        },
        {
          value: 3,
          label: "周二"
        },
        {
          value: 4,
          label: "周三"
        },
        {
          value: 5,
          label: "周四"
        },
        {
          value: 6,
          label: "周五"
        },
        {
          value: 7,
          label: "周日"
        }
      ]
    };
  },
  methods: {
    timeAction(obj) {
      this.$emit("timeaction", { type: "delete", data: this.inData });
    },
    // 监听组件是否填入数据了
    hasChange() {
      this.$emit("timeaction", { type: "change" });
    }
  }
};
</script>
<style scoped>
.isI {
  font-size: 22px;
  color: rgb(78, 75, 75);
  padding: 2px;
  border-radius: 3px;
}
.isI:hover {
  font-size: 22px;
  cursor: pointer;
  background: rgb(134, 134, 134);
  color: #fff;
}
</style>