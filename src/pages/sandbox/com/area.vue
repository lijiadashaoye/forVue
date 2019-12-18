<template>
  <div class="forDiYu">
    <div>
      <el-select
        filterable
        clearable
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
        placeholder="默认为全部"
        v-model="data.shi"
        style="width:300px;flex-shrink:0;"
        multiple
        @change="checkChange"
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
        <el-checkbox-group v-model="data.tiaojian" size="mini" @change="checkChange">
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
    checkChange() {
      if (
        !this.data.sheng &&
        this.data.shi.length === 0 &&
        this.data.tiaojian.length === 0
      ) {
        this.$emit("areaAction", { type: "isAdd", data: true });
      } else {
        this.$emit("areaAction", { type: "isAdd", data: false });
      }
    },
    // 根据省，动态获取市
    resetList() {
      if (this.data.sheng) {
        this.sheng_shi = this.$store.state.areaList.filter(
          tar => tar.adcode === this.data.sheng
        )[0].children;
        this.$emit("areaAction", { type: "noError" });
      } else {
        this.sheng_shi = [];
      }
      this.checkChange();
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