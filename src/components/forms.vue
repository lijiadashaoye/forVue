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
          height="260"
          max-height="260"
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
          ></el-table-column>
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
                type="info"
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
      </div>
    </div>
    <div class="show_time2" v-if="pageData.type==='lishi'">
      <span class="isUpTime">
        更新时间：
        {{inputDatas.createTime}}
        &nbsp;
        {{inputDatas.who}}
      </span>
    </div>
  </div>
</template>
<script>
export default {
  props: ["pageData"],
  data() {
    return {
      inputDatas: null,
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
    // let forms = {
    //   topClick: true, // 表格上边的新增利率
    //   fenye: true, // 是否需要分页
    //   pageNum: 0, // 当前页妈
    //   // 表格头部的蓝点
    //   titleUp: {
    //     pointName: "认购规则"
    //   },
    //   // 表格头部
    //   title: [
    //     {
    //       prop: "num", // 要显示的属性
    //       label: "序号", // 要显示的文字
    //       width: "100" // 当前项的宽度
    //     },
    //     {
    //       prop: "id", // 要显示的属性
    //       label: "ID", // 要显示的文字
    //       width: "80" // 当前项的宽度
    //     },
    //     {
    //       prop: "rate", // 要显示的属性
    //       label: "费率 %", // 要显示的文字
    //       width: "100" // 当前项的宽度
    //     },
    //     {
    //       prop: "cost", // 要显示的属性
    //       label: "费用", // 要显示的文字
    //       width: "100" // 当前项的宽度
    //     },
    //     {
    //       prop: "rateDiscount", // 要显示的属性
    //       label: "费率折扣", // 要显示的文字
    //       width: "100" // 当前项的宽度
    //     }
    //   ],
    //   handle: [
    //     // 表格执行的操作
    //     {
    //       click: "edit", // 表格操作栏的点击事件
    //       text: "编辑" // 表格操作栏的点击事件
    //     },
    //     {
    //       click: "delete", // 表格操作栏的点击事件
    //       text: "删除" // 表格操作栏的点击事件
    //     }
    //   ],
    //   // 表格数据
    //   dataTotal: []
    // };
    // 表格 数据设置方式，看 pages\marketing\activity_create\step2\step2.vue 634行
    // 获取表格设置
    this.tableContent = this.pageData[this.pageData.type];
    this.tableContent.total = Math.ceil(this.tableContent.dataTotal.length / 5);
    this.tableContent.datas = this.tableContent.dataTotal.slice(0, 5); // 前端做分页
    let handleLen = this.tableContent.handle.length; // 获取操作按钮个数
    if (handleLen === 1) {
      this.setWidth = 60;
    } else {
      this.setWidth = 56 * handleLen + (handleLen - 1) * 10 + 20;
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
            let reg1 = /^\-/i;
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
    tableRowClassName({ row, rowIndex }) {
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
          .then(_ => {
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
    }
  }
};
</script>
<style>
@import url("./allCss.scss");
.el-table .warning-row {
  background: rgb(238, 236, 234);
}
</style>