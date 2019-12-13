<template>
  <div class="forDiYu">
    <div>
      <el-select
        filterable
        size="mini"
        placeholder="选择省"
        v-model="data.sheng"
        style="width:160px;flex-shrink:0;margin-right:10px;"
        @change="resetList"
      >
        <el-option
          v-for="item in $store.state.areaList"
          :key="item.adcode"
          :label="item.name"
          :value="item.adcode"
        ></el-option>
      </el-select>

      <el-select
        filterable
        size="mini"
        placeholder="选择市"
        v-model="data.shi"
        style="width:400px;flex-shrink:0;margin-right:10px;color:red;"
        multiple
      >
        <el-option
          v-for="item in sheng_shi"
          :key="item.adcode"
          :label="item.name"
          :value="item.adcode"
        ></el-option>
      </el-select>
      <div class="withSpan">
        <span>请选择限制条件：</span>
        <el-checkbox-group v-model="data.tiaojian" size="mini" @change="checkboxChange">
          <el-checkbox label="注册手机号归属地"></el-checkbox>
          <el-checkbox label="身份证地址"></el-checkbox>
          <el-checkbox label="GPS地理位置"></el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sheng_shi: null,
      data: {
        sheng: "",
        shi: [],
        tiaojian: []
      }
    };
  },
  methods: {
    checkboxChange() {
      // 限制条件产生数据后，要清除错误提示
      if (this.data.tiaojian.length) {
        this.$emit("areaAction", { type: "noError" });
      }
    },
    // 根据省，动态获取市
    resetList() {
      this.sheng_shi = this.$store.state.areaList.filter(
        tar => tar.adcode === this.data.sheng
      )[0].children;
    }
  }
};
</script>
<style scoped>
.forDiYu {
  background: rgb(221, 220, 220);
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 910px;
  width: 100%;
  margin-bottom: 2px;
  padding: 0 2px;
}
.forDiYu > div {
  display: flex;
}
.withSpan {
  min-width: 510px;
  display: flex;
  align-items: center;
  padding-left: 10px;
}

.withSpan > span {
  font-size: 12px;
  color: rgb(78, 75, 75);
}
.withSpan > div {
  display: flex;
  align-items: center;
}
</style>