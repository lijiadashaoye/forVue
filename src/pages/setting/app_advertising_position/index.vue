<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
      <el-form
        style="padding-left:20px;"
        :inline="true"
        :model="searchForm"
        label-suffix=":"
        label-position="right"
        size="mini"
        ref="searchForm"
      >
        <el-form-item label="展示位置编号" style="margin-bottom:5px;">
          <el-input v-model="searchForm.positionNo" placeholder="请输入位置编号"></el-input>
        </el-form-item>
        <el-form-item label="展示位置名称" style="margin-bottom:5px;">
          <el-input v-model="searchForm.positionTitle" placeholder="请输入位置名称"></el-input>
        </el-form-item>
        <el-form-item label="显示终端" style="margin-bottom:5px;">
          <el-select v-model="searchForm.terminalType" clearable placeholder="请选择">
            <el-option
              size="mini"
              v-for="item of terminalType"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="pageType!='double'" label="广告位类型" style="margin-bottom:5px;">
          <el-select v-model="searchForm.bannerType" clearable placeholder="请选择">
            <el-option
              size="mini"
              v-for="(item,index) in bannerTypeList"
              :key="index"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="广告位状态" style="margin-bottom:5px;">
          <el-select clearable placeholder="请选择" v-model="searchForm.status">
            <el-option
              size="mini"
              v-for="(item,index) in bannerStatus"
              :key="index"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="创建时间" style="margin-bottom:5px;">
          <el-date-picker
            v-model="timeArr"
            type="daterange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
            style="width:100%"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div
        class="headerButton"
        :style="{justifyContent:pageType=='position'?'space-between':'flex-end'}"
      >
        <el-button type="primary" @click="addInfo" v-if="pageType=='position'" size="mini">新增</el-button>
        <!-- userInfoArr.indexOf('position_add')>-1&& -->
        <div>
          <el-button size="mini" type="warning" @click="getList">查询</el-button>
          <el-button size="mini" type="info" @click="searchDefault">重置</el-button>
        </div>
      </div>
    </div>
    <div id="forTable">
      <isTable @tableEmit="tableEmit" :inputData="nowTableInfo" />
    </div>
    <handle-dialog
      @edit="dialogType='edit'"
      @again="getList"
      :dialogType="dialogType"
      v-model="centerDialogVisible"
    ></handle-dialog>
  </div>
</template>
<script>
import { bannerTypeList, bannerStatus, terminalType } from "@/constant.js";
import powerTableMixin from "@/mixin/powerTable.js";
import isTable from "@/components/isTable/isTable";
import { mapActions } from "vuex";
import HandleDialog from "./components/handleDialog.vue";
import { defaultChange } from "@/sets/changeLanguage.js";
import { setAdvertisement } from "@/sets/cookie.js";
export default {
  name: "AdvertisingMap",
  mixins: [powerTableMixin],
  components: {
    isTable,
    HandleDialog
  },
  data() {
    return {
      pageType: "position", //默认显示广告图位置列表页面
      centerDialogVisible: false, //dialog状态
      dialogType: "", //dialog显示状态/增加/详情/修改
      timeArr: [], //开始时间结束时间数组
      bannerStatus: [], //启用状态list
      bannerTypeList: [], //广告位类型list
      terminalType: [], //终端列表
      searchForm: {
        bannerTypes: [], //获取单图列表需要
        bannerType: "", //获取多图列表需要
        positionNo: "", //位置编号
        positionTitle: "", //位置名称
        terminalType: "", //显示终端
        bannerType: "", //广告位类型
        status: "", //启用状态
        createTimeStart: "", //起始创建时间
        createTimeEnd: "" //截止创建时间
      },
      listUser: [
        {
          userType: "advertising_map_add"
        },
        {
          userType: "advertising_map_upd"
        },
        {
          userType: "position_detail",
          text: "详情",
          type: "primary",
          size: "mini",
          emit: "detail"
        },
        {
          userType: "position_del",
          text: "删除",
          type: "danger",
          size: "mini",
          emit: "delete"
        }
      ],
      editUser: [
        {
          userType: "position_detail",
          text: "编辑",
          type: "primary",
          size: "mini",
          emit: "edit"
        }
      ],
      userArr: [],
      tableTitle: [
        {
          title: "展示位置编号",
          key: "positionNo",
          minWidth: "120"
        },
        {
          title: "展示位置名称",
          key: "positionTitle",
          minWidth: "120"
        },

        {
          title: "显示终端",
          key: "terminalType",
          minWidth: "120"
        },
        {
          title: "广告位状态",
          key: "status",
          minWidth: "120"
        },
        {
          title: "广告位类型",
          key: "bannerType",
          minWidth: "120"
        },
        {
          title: "创建时间",
          key: "gmtCreated",
          minWidth: "160"
        }
      ]
    };
  },
  created() {
    // 页面类型
    this.pageType = this.$route.params.type;
    // 广告位启用状态
    this.bannerStatus = bannerStatus;
    // 广告终端列表
    this.terminalType = terminalType;
    // 获取列表数据
    this.getList();
  },
  watch: {
    $route(to, from) {
      // 页面类型
      this.pageType = this.$route.params.type;
      this.getList();
    }
  },
  computed: {
    nowTableInfo: function() {
      this.tableInfo.data.list = this.tableInfo.data.list.map(item => {
        item.terminalType = defaultChange(
          item.terminalType,
          true,
          "terminalType"
        );
        item.status = defaultChange(item.status, true, "bannerStatus");
        item.bannerType = defaultChange(
          item.bannerType,
          true,
          "bannerTypeList"
        );
        return item;
      });
      return this.tableInfo;
    }
  },
  methods: {
    ...mapActions({
      positionMapList: "appConfig/positionMapList",
      positionMapDel: "appConfig/positionMapDel",
      positionMapDetail: "appConfig/positionMapDetail"
    }),

    // 新增广告位
    addInfo() {
      this.dialogType = "add";
      this.centerDialogVisible = true;
    },
    // 获取列表数据
    getList() {
      let sendInfo = Object.assign({}, this.searchForm);
      // 广告类型数据
      this.bannerTypeList = Object.assign([], bannerTypeList);
      // 判断是否是单图多图
      if (this.pageType == "single") {
        // 单图广告位类型只有弹框和单图
        this.bannerTypeList = this.bannerTypeList.slice(0, 3);
        sendInfo.bannerTypes = [0, 1];
        this.userArr = this.editUser;
      } else if (this.pageType == "double") {
        sendInfo.bannerType = "2";
        this.userArr = this.editUser;
      } else {
        this.userArr = this.listUser;
      }
      this.USERDO(this.userArr);
      if (this.timeArr.length > 0) {
        sendInfo.createTimeStart = this.timeArr[0] + " 00:00:00";
        sendInfo.createTimeEnd = this.timeArr[1] + " 23:59:59";
      }
      for (let item in sendInfo) {
        if (sendInfo[item] === "" || JSON.stringify(sendInfo[item]) == "[]") {
          delete sendInfo[item];
        }
      }
      this.positionMapList(sendInfo);
    },
    // 重置还原表单
    searchDefault() {
      this.timeArr = [];
      this.searchForm = {
        bannerTypes: [], //获取单图列表需要
        bannerType: "", //获取多图列表需要
        positionNo: "", //位置编号
        positionTitle: "", //位置名称
        terminalType: "", //显示终端
        bannerType: "", //广告位类型
        status: "", //启用状态
        createTimeStart: "", //起始创建时间
        createTimeEnd: "" //截止创建时间
      };
    },
    // table分发事件
    tableEmit(obj) {
      switch (obj.type) {
        case "detail": //详情
          this.dialogType = "detail";
          this.centerDialogVisible = true;
          // 保证详情数据已经存储
          this.positionMapDetail(obj.data.id).then(() => {
            this.centerDialogVisible = true;
          });
          break;
        case "delete": //单个删除
          let sendInfo = {
            positionId: obj.data.id,
            positionNo: obj.data.positionNo
          };
          this.deleteIndex(sendInfo);
          break;
        case "regetData": //条目更改
          this.getList();
          break;
        case "edit": //修改
          // 存储单条信息
          setAdvertisement(JSON.stringify(obj.data));
          this.$router.push({ path: `/home/banner/${this.pageType}/list` });
          break;
      }
    },
    // 删除事件
    startDelete(obj) {
      this.positionMapDel(obj).then(res => {
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        // 再次请求数据
        this.getList();
      });
    }
  }
};
</script>
<style scoped>
.headerButton {
  display: flex;

  margin-top: 5px;
  text-align: right;
  padding: 0px 20px;
}
</style>