<template>
  <div id="isTable">
    <div v-if="loadEnd">
      <el-table
        :stripe="true"
        :data="inputData.data.list"
        :max-height="setMaxHeight"
        :height="setMaxHeight"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
        @select="handleSelectionChange"
        v-loading="inputData.loading"
        size="mini"
      >
        <!-- checkbox -->
        <el-table-column
          v-if="inputData.checkBox"
          padding="5px"
          type="selection"
          width="30"
          fixed="left"
        ></el-table-column>

        <el-table-column v-if="!inputData.noIndex" label="序号" type="index" width="50" order="2"></el-table-column>

        <el-table-column
          v-if="inputData.actions['click']"
          :label="inputData.actions['click'].label"
          :min-width="inputData.actions['click'].minWidth"
        >
          <template slot-scope="scope">
            <el-tooltip :content="`点击查看：${scope.row[inputData.actions['click']['from']]}`" placement="top">
              <el-button
                @click="caozuo('textClick',scope.row)"
                type="text"
              >{{scope.row[inputData.actions['click']['from']]}}</el-button>
            </el-tooltip>
          </template>
        </el-table-column>

        <!-- 每一列表格数据 -->

        <el-table-column
          v-for="(item,index) in inputData.data.title"
          :key="index"
          :sortable="item.sortable"
          :label="item.title"
          :minWidth="item.minWidth"
          :prop="item.key"
        >
          <template slot-scope="scope">
            <img style="width:40px;" v-if="item.isImg" :src="scope.row[item.key]">
            <span
              :style="{color:item.color?item.color:''}"
              v-if="!item.isImg"
            >{{ scope.row[item.key] }}</span>
          </template>
        </el-table-column>

        <el-table-column
          v-if="inputData.actions['setColor']"
          :label="inputData.actions['setColor'].label"
          :min-width="inputData.actions['setColor'].minWidth"
        >
          <template slot-scope="scope">
            <p
              :style="{color:scope.row[inputData.actions['setColor'].with]?'#13ce66':'#ff4949'}"
            >{{scope.row[inputData.actions['setColor']['from']]}}</p>
          </template>
        </el-table-column>

        <el-table-column
          v-if="inputData.actions['switch']"
          :label="inputData.actions['switch'].label"
          :min-width="inputData.actions['switch'].minWidth"
        >
          <template slot-scope="scope">
            <el-tooltip :content="''+scope.row.action" placement="top">
              <el-switch
                v-model="scope.row.switch"
                active-color="#13ce66"
                inactive-color="#909399"
                @change="caozuo('switch',scope.row)"
              ></el-switch>
            </el-tooltip>
          </template>
        </el-table-column>

        <!--操作 -->
        <el-table-column
          v-if="inputData.data.custom.length>0"
          fixed="right"
          label="操作"
          :width="caozuoWith"
        >
          <template slot-scope="scope">
            <el-button
              v-for="(item,index) in inputData.data.custom"
              :key="index"
              :disabled="seeWhichButton(scope.row,item)"
              @click.native.prevent="caozuo(item.emit,scope.row)"
              :type="item.type"
              :plain="seeWhichButton(scope.row,item)"
              size="mini"
            >{{item.text}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div id="isFenYe" v-if="!inputData.fenye">
      <el-pagination
        :pager-count="5"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 40]"
        :current-page="inputData.pageNum"
        :page-size="inputData.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="inputData.total"
        background
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    inputData: Object
  },
  data() {
    return {
      setMaxHeight: null, // 设置表格的 maxHeight
      caozuoWith: 0, // 操作那一栏的宽度
      loadEnd: false
    };
  },
  created() {
    // console.log(this.inputData);
  },
  methods: {
    // 用来判断按钮是否可用
    seeWhichButton(scope, item) {
      let arr = this.inputData.data.custom.map(tar => tar.emit);
      let seeArr = scope.show; // 查看显示数组，定义按钮的可用状态
      if (seeArr) {
        return !seeArr.includes(item.emit);
      } else {
        return !arr.includes(item.emit);
      }
    },
    // 设置操作那一栏的宽度
    setWidth() {
      let custom = this.inputData.data.custom;
      let len = [];
      custom.forEach(item => len.push(item.text));
      let num = 0;
      len.forEach(ele => {
        let n = 35 + ele.length * 12;
        num += n;
      });
      let marginLeft = 10 * (len.length - 1) > 0 ? 10 * (len.length - 1) : 0;
      let kk = num + 20 + marginLeft;
      this.caozuoWith = kk;
      this.loadEnd = true;
    },
    // 操作
    caozuo(type, row) {
      this.$emit("tableEmit", { type: type, data: row });
    },
    // 分页变更单页显示数量
    handleSizeChange(pageSize) {
      this.inputData.pageSize = pageSize;
      this.inputData.pageNum = 1;
      this.$emit("tableEmit", { type: "regetData" });
    },
    // 变更第几页数字
    handleCurrentChange(pageNum) {
      this.inputData.pageNum = pageNum;
      this.$emit("tableEmit", { type: "regetData" });
    },
    // 进行批量删除时序号前边的 checkbox
    handleSelectionChange(selection) {
      this.$emit("tableEmit", { type: "moreDelete", data: selection });
    },
    // 动态设置表格的 max-height
    setMaxHeightFn() {
      let t = () => {
        setTimeout(() => {
          let getH = document.querySelector("#isTable");
          if (getH) {
            this.setMaxHeight = getH.offsetHeight - 35;
          } else {
            t();
          }
        }, 100);
      };
      t();
    }
  },
  mounted() {
    if (this.inputData.data.list.length === 0 && this.inputData.total > 0) {
      let num = this.inputData.pageNum - 1;
      this.handleCurrentChange(num);
    }
    let isLiShi = sessionStorage.getItem("lishi");
    setTimeout(() => {
      this.setWidth();
      if (!isLiShi) {
        this.setMaxHeightFn();
      }
    });
    // 动态设置表格的 max-height，并防抖
    let isTimeOut;
    window.addEventListener("resize", () => {
      clearTimeout(isTimeOut);
      isTimeOut = setTimeout(() => {
        if (!isLiShi) {
          this.setMaxHeightFn();
        }
      }, 1000);
    });
  }
};
</script>

<style lang="scss">
@import "./isTable.scss";
.setColor {
  color: blueviolet;
}
</style>
