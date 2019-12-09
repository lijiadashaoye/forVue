<template>
  <div class="forDiYu">
    <div>
      <el-select
        filterable
        size="mini"
        @change="setArea"
        placeholder="选择省"
        v-model="data.sheng"
        style="width:160px;flex-shrink:0;margin-right:10px;"
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
        style="width:220px;flex-shrink:0;margin-right:10px;"
        multiple
        @change="shiEmit"
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
        <el-checkbox-group v-model="data.tiaojian" size="mini">
          <el-checkbox label="注册手机号归属地"></el-checkbox>
          <el-checkbox label="身份证地址"></el-checkbox>
          <el-checkbox label="GPS地理位置"></el-checkbox>
        </el-checkbox-group>
      </div>
    </div>

    <el-popover placement="top-end" width="160" v-model="visible">
      <p>确定删除吗？</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="visible = false">取消</el-button>
        <el-button type="primary" size="mini" @click="action(data)">确定</el-button>
      </div>
      <i class="el-icon-delete isI" slot="reference" title="删除"></i>
    </el-popover>
  </div>
</template>

<script>
export default {
  props: {
    data: Object
  },
  data() {
    return {
      sheng_shi: null,
      visible: false,
      dictData: null,
      beforeDatas: [],
      china: null
    };
  },
  created() {
    this.china = JSON.parse(sessionStorage.getItem("dict")).china;
  },
  methods: {
    // 动态调整省市数据
    setArea() {
      this.data.shi = [];
      this.regetList();
    },
    // 删除地域限制
    action(tar) {
      this.$emit("areaAction", { type: "delete", data: tar });
      this.visible = false;
      let kk = this.china.filter(tar => tar.adcode === this.data.sheng)[0];
      if (kk) {
        this.sheng_shi = kk.children;
      }
    },
    // 市选项变更
    shiEmit(e) {
      let before = [...this.beforeDatas];
      if (before.length < e.length) {
        // 判断执行的操作类型，如果是添加数据，则正常刷新列表
        this.$emit("areaAction", { type: "deleteShi" });
      } else {
        // 如果是删除市数据，需要判断一下列表中是否有市对应的省数据
        let isIn = this.$store.state.areaList.filter(
          tar => tar.adcode === this.data.sheng
        )[0]; // 从store里查省

        if (!isIn) {
          let sheng = this.china.filter(
            tar => tar.adcode === this.data.sheng
          )[0]; // 从字典里查省
          this.$store.state.areaList.push(sheng);
        }
        this.$emit("areaAction", { type: "deleteShi" });
      }
      this.$nextTick(() => {
        this.beforeDatas = this.data.shi;
      });
    },
    // 重新获取市下拉数据
    regetList() {
      let kk = this.$store.state.areaList.filter(
        tar => tar.adcode === this.data.sheng
      )[0];

      if (kk) {
        this.sheng_shi = kk.children;
      } else {
        this.sheng_shi = [];
      }
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