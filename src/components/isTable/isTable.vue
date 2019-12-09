<template>
  <div id="isTable">
    <el-table
      ref="isTable"
      :stripe="true"
      :data="linshiArr"
      :max-height="setMaxHeight"
      :height="setMaxHeight"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange"
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
          <el-tooltip
            :content="`点击查看：${scope.row[inputData.actions['click']['from']]}`"
            placement="top"
          >
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
          <div v-if="!item.imgArr">
            <!-- 
            一张图片的，只需在表格内如此设置：看badgewall_info.vue组件
              {
            title: "LOGO",
            key: "logo",
            minWidth: "80",
            isImg: true
            }-->
            <img
              style="width:40px;"
              v-if="item.isImg"
              :src="scope.row[item.key] ? ImgBaseUrl + scope.row[item.key] : ''"
            />
            <p v-if="!item.isImg">
              <span
                v-if="!('fuWenBen' in item)"
                :style="{color:item.color?item.color:''}"
              >{{ scope.row[item.key] }}</span>
              <span v-if="'fuWenBen' in item" v-html="scope.row[item.fuWenBen]"></span>
            </p>
          </div>
          <!--活动管理配置管理设置素材 -->
          <ul v-if="item.imgArr" class="imgArr">
            <li
              v-for="tar of scope.row[item.key]"
              :key="tar.img"
              title="点击预览内容"
              @click="show_media(tar)"
            >
              <div class="forType">
                <img
                  style="width:40px;height:40px;"
                  :src="ImgBaseUrl + tar.img"
                  v-if="tar.type!='mp4'"
                />
                <video width="40" height="40" v-if="tar.type=='mp4'">
                  <source :src="ImgBaseUrl +tar.img" type="video/mp4" />
                </video>
                <div class="type_text">{{`( ${tar.type} )`}}</div>
              </div>
            </li>
          </ul>
          <div
            v-if="item.isColor"
            :style="{'background':scope.row[item.key],'width':'100px','padding':'4px 5px'}"
          ></div>
        </template>
      </el-table-column>
      <!-- 带颜色文字 -->
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
      <!-- 滑块 -->
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

    <div id="isFenYe" v-if="!inputData.fenye">
      <el-pagination
        :pager-count="5"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 40]"
        :current-page="inputData.pageNum"
        :page-size="inputData.pageSize"
        layout="total, sizes, prev, pager, next"
        :total="inputData.total"
        background
      ></el-pagination>
    </div>
    <el-dialog
      :title="yulan_dailog.title"
      :visible.sync="yulan_dailog.show"
      width="400px"
      :before-close="handleClose"
    >
      <div v-html="yulan_dailog.data"></div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleClose">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    inputData: Object
  },
  data() {
    return {
      dragTar: null,
      linshiArr: [],
      dragArr: [],
      setMaxHeight: null, // 设置表格的 maxHeight
      caozuoWith: 0, // 操作那一栏的宽度
      loadEnd: false,
      isJiaZai: null,
      ImgBaseUrl: "",
      yulan_dailog: {
        // 图片，视频预览窗口
        show: false,
        title: "",
        data: null
      }
    };
  },
  created() {
    this.ImgBaseUrl = this.$ImgBaseUrl;
  },
  watch: {
    inputData: {
      handler(newName) {
        this.linshiArr = [...newName.data.list];
      },
      deep: true,
      immediate: true
    }
  },

  methods: {
    // 图片，视频预览窗口
    show_media(item) {
      this.yulan_dailog.title = item.text;
      if (item.type != "mp4") {
        this.yulan_dailog.data = `<img style="width:100%" src="${this
          .ImgBaseUrl + item.img}"/>`;
      } else {
        this.yulan_dailog.data = `<video width="320" height="240" controls muted>
                                   <source src="${this.ImgBaseUrl +
                                     item.img}" type="video/mp4" />
                                  </video>`;
      }
      this.yulan_dailog.show = true;
    },
    // 关闭图片，视频预览窗口
    handleClose() {
      this.yulan_dailog = {
        show: false,
        title: "",
        data: null
      };
    },
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
            // fenye为true时，不显示分页栏
            if (this.inputData.fenye) {
              this.setMaxHeight = getH.offsetHeight;
            } else {
              this.setMaxHeight = getH.offsetHeight - 37;
            }
          } else {
            t();
          }
        }, 200);
      };
      t();
    }
  },
  mounted() {
    if (this.inputData.data.list.length === 0 && this.inputData.total > 0) {
      let num = this.inputData.pageNum - 1;
      this.handleCurrentChange(num);
    }
    setTimeout(() => {
      // 设置默认选中checkbox
      if (this.inputData.data.setCheck) {
        let digui = () => {
          let ref = this.$refs.isTable;
          if (ref) {
            this.inputData.data.setCheck.forEach(row => {
              ref.toggleRowSelection(row);
            });
          } else {
            digui();
          }
        };
        digui();
      }
      this.setWidth();
      this.setMaxHeightFn();
    }, 100);
    // 动态设置表格的 max-height，并防抖
    let isTimeOut;
    window.addEventListener("resize", () => {
      clearTimeout(isTimeOut);
      isTimeOut = setTimeout(() => {
        this.setMaxHeightFn();
      });
    });

    // 实现表格可拖动
    if (this.inputData.dragable) {
      let that = this;
      let digui2 = () => {
        let kk = document.querySelectorAll(".el-table__row"),
          tarH;
        if (kk.length) {
          kk.forEach(tar => {
            tar.draggable = true;
            tar.addEventListener("dragstart", e => {
              tarH = e.target.offsetHeight; // 取得一个tr的高
              that.dragArr = [...that.linshiArr];
              that.dragTar = that.dragArr.splice(e.target.rowIndex, 1)[0];
            });
            tar.addEventListener("dragend", e => {
              let offsetY = Math.floor(e.layerY / tarH); // layerY 为鼠标举例当前父元素top的距离
              if (offsetY >= 0 && offsetY <= that.linshiArr.length) {
                that.dragArr.splice(offsetY, 0, that.dragTar);
                that.linshiArr = [...that.dragArr];
                this.$emit("tableEmit", { type: "drag", data: that.dragTar });
              }
            });
          });
        } else {
          setTimeout(digui2, 300);
        }
      };
      digui2();
    }
  }
};
</script>

<style lang="scss">
@import "./isTable.scss";
.setColor {
  color: blueviolet;
}
.imgArr {
  display: flex;
  justify-content: space-between;
}
.imgArr > li {
  margin-right: 3px;
  position: relative;
  min-width: 80px;
  min-height: 60px;
  cursor: pointer;
}

.type_text {
  font-size: 12px;
  line-height: 10px;
  zoom: 0.5;
}
</style>
