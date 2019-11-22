<template>
  <div id="formsWap">
    <div class="formsListWaper">
      <!-- 表格头部蓝点 -->

      <div class="table_top1" v-if="tableContent.titleUp">
        <span class="isPoint"></span>
        <span style="font-size:12px;font-weight:bold;">{{tableContent.titleUp.pointName }}</span>
      </div>
      <!-- 显示数据的表格 -->
      <div>
        <div class="toaddlilv" v-if="tableContent.topClick">
          <span @click="toEmit('add',pageData.id) ">新增利率(点击添加,备注以外全必填)</span>
        </div>
        <el-table
          :data="tableContent.datas"
          style="width: 100%;background:none;"
          height="240"
          max-height="240"
          align="center"
          size="mini"
          :row-class-name="tableRowClassName"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            v-if="tableContent.checkBox"
            padding="5px"
            type="selection"
            width="30"
            fixed="left"
          ></el-table-column>

          <el-table-column
            v-for="(title,index) of tableContent.title"
            :key="index"
            :prop="title.prop"
            :label="title.label"
            :min-width="title.width"
            align="center"
          >
            <template slot-scope="scope">
              <span
                v-if="scope.row.color"
                :style="{color:scope.row.color}"
              >{{ scope.row[title.prop] }}</span>

              <span v-else>{{ scope.row[title.prop]}}</span>
            </template>
          </el-table-column>

          <el-table-column
            fixed="right"
            label="操作"
            :min-width="setWidth"
            align="center"
            v-if="tableContent.handle.length > 0"
          >
            <template slot-scope="scope">
              <el-button
                v-for="(handle,index) of tableContent.handle"
                :key="index"
                @click="toEmit(handle.click,scope.row)"
                type="primary"
                plain
                size="mini"
              >{{handle.text}}</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="nextPage" v-if="tableContent.fenye">
          <span>每页5条，总共 {{tableContent.total}} 页</span>
          <span>第{{tableContent.pageNum+1}}页</span>
          <span @click="pageStep(true)">上一页</span>
          <span @click="pageStep(false)">下一页</span>
        </div>
        <div class="nextPage" v-if="tableContent.fenye_other">
          <span>每页5条，总共 {{tableContent.total}} 条</span>
          <span>第{{pageData.pageNum}}页</span>
          <span @click="pageStep2(true)">上一页</span>
          <span @click="pageStep2(false)">下一页</span>
        </div>
      </div>
    </div>
    <div class="show_time2" v-if="pageData.type==='lishi'">
      <span class="isUpTime">
        更新时间：
        {{pageData.createTime}}
        &nbsp;
        {{pageData.who}}
      </span>
    </div>
  </div>
</template>
<script>
export default {
  props: ["pageData"],
  data() {
    return {
      total: null, // 分页总数
      pageSize: 5, // 一页显示数量
      pageNum: 1, // 当前显示的第几页
      toShow: true, // 确定页面是否显示蓝点
      // 传给表格子组件的数据
      tableContent: null, // 表格设置
      setWidth: "" // 设置表格操作栏的宽度
    };
  },
  created() {
    this.tableContent = this.pageData[this.pageData.type];
    // 表格 数据设置方式，看 pages\marketing\activity_create\step2\step2.vue 634行
    // 获取表格设置

    if (this.tableContent.fenye) {
      this.tableContent.total = Math.ceil(
        this.tableContent.dataTotal.length / 5
      );
      this.tableContent.datas = this.tableContent.dataTotal.slice(0, 5); // 前端做分页
    } else {
      this.tableContent.datas = this.tableContent.dataTotal;
    }

    let handleLen = this.tableContent.handle.length; // 获取操作按钮个数
    if (handleLen === 1) {
      this.setWidth = 60;
    } else {
      this.setWidth = 56 * handleLen + (handleLen - 1) * 10 + 22;
    }
  },
  mounted() {
    let kk = () => {
      // 修改表格内具体项的字体颜色
      let cell = document.getElementsByClassName("cell");
      setTimeout(() => {
        if (cell.length > 0) {
          Array.from(cell).forEach(ele => {
            let str = ele.innerText;
            let reg1 = /^-/i;
            let reg2 = /^\+/i;
            if (reg1.test(str)) {
              ele.style.color = "rgb(6, 221, 60)";
            }
            if (reg2.test(str)) {
              ele.style.color = "red";
            }
          });
        } else {
          kk();
        }
      }, 500);
    };
    kk();
  },
  methods: {
    // 进行批量删除时序号前边的 checkbox
    handleSelectionChange(selection) {
      this.$emit("tableAct", { type: "moreSelect", data: selection });
    },
    tableRowClassName({ rowIndex }) {
      if (rowIndex % 2 === 0) {
        return "";
      } else {
        return "warning-row";
      }
    },
    // 表格的操作向上传递
    toEmit(type, rows) {
      if (type === "delete") {
        this.$confirm(`确定要删除吗？`)
          .then(() => {
            this.$emit("tableAct", { type: type, data: rows });
          })
          .catch(() => {});
      } else {
        this.$emit("tableAct", { type: type, data: rows });
      }
    },
    // 上一页 true、下一页 false
    pageStep(type) {
      if (type) {
        if (this.tableContent.pageNum > 0) {
          this.tableContent.pageNum -= 1;
          this.tableContent.datas = this.tableContent.dataTotal.slice(
            this.tableContent.pageNum * 5,
            this.tableContent.pageNum * 5 + 5
          );
        }
      } else {
        let num1 = this.tableContent.dataTotal.length;
        let num2 = this.tableContent.pageNum + 1;

        if (num1 > 5 && num1 / 5 > num2) {
          this.tableContent.pageNum += 1;
          this.tableContent.datas = this.tableContent.dataTotal.slice(
            this.tableContent.pageNum * 5,
            this.tableContent.pageNum * 5 + 5
          );
        }
      }
    },
    // 费率表格的分页
    pageStep2(type) {
      if (type) {
        // 上一页
        if (this.pageData.pageNum > 1) {
          --this.pageData.pageNum;
        }
      } else {
        // 下一页
        let num = Math.ceil(this.tableContent.total / 5);
        if (this.pageData.pageNum < num) {
          this.pageData.pageNum++;
        }
      }
      this.$emit("tableAct", {
        type: "fenye",
        data: this.pageData.type
      });
    }
  }
};
</script>
<style>
.el-table .warning-row {
  background: rgb(238, 236, 234);
}
</style>