<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
      <el-form style="padding-left:20px">
        <el-form-item label="位置编号" prop="positionNo">{{indexInfo.positionNo}}</el-form-item>
        <el-form-item label="位置描述" prop="positionTitle">{{indexInfo.positionTitle}}</el-form-item>
      </el-form>
      <el-form
        style="padding-left:20px;"
        :inline="true"
        :model="searchForm"
        label-suffix=":"
        label-position="right"
        size="mini"
        ref="searchForm"
      >
        <el-form-item label="广告图标题" style="margin-bottom:5px;">
          <el-input v-model="searchForm.bannerTitle" placeholder="请输入广告位标题"></el-input>
        </el-form-item>
        <!-- <el-form-item label="广告图编号" style="margin-bottom:5px;">
          <el-input v-model="searchForm.positionNo" placeholder="请输入广告图编号"></el-input>
        </el-form-item>-->
        <el-form-item label="显示系统" style="margin-bottom:5px;">
          <el-select v-model="searchForm.sysType" clearable placeholder="请选择">
            <el-option
              size="mini"
              v-for="item of sysTypeList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="显示时间" style="margin-bottom:5px;">
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
      <div class="headerButton">
        <el-button type="primary" @click="addInfo" size="mini">新增</el-button>
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
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { sysTypeList } from "@/constant.js";
import powerTableMixin from "@/mixin/powerTable.js";
import isTable from "@/components/isTable/isTable";
import { getAdvertisement } from "@/sets/cookie.js";

export default {
  mixins: [powerTableMixin],
  components: {
    isTable
  },
  data() {
    return {
      indexInfo: {}, //广告位置的单条信息
      timeArr: [], //日期选项
      sysTypeList: [], //显示系统
      tableTitle: [
        {
          title: "广告图编号",
          key: "id",
          minWidth: "100"
        },
        {
          title: "广告图标题",
          key: "bannerTitle",
          minWidth: "120"
        },

        {
          title: "投放状态",
          key: "putStatus",
          minWidth: "120"
        },
        {
          title: "显示系统",
          key: "sysType",
          minWidth: "120"
        },
        {
          title: "展示开始时间",
          key: "beginTime",
          minWidth: "160"
        },
        {
          title: "展示结束时间",
          key: "endTime",
          minWidth: "160"
        },
        {
          title: "创建时间",
          key: "gmtCreated",
          minWidth: "160"
        }
      ],
      userArr: [
        {
          userType: "banner_add"
        },
        {
          userType: "banner_upd",
          text: "修改",
          type: "primary",
          size: "mini",
          emit: "upd"
        },
        {
          userType: "banner_detail",
          text: "详情",
          type: "primary",
          size: "mini",
          emit: "detail"
        },
        {
          userType: "banner_del",
          text: "删除",
          type: "danger",
          size: "mini",
          emit: "delete"
        }
      ],
      searchForm: {
        bannerTitle: "", //广告标题
        positionNo: "", //广告图编号
        sysType: "", //显示系统
        createTimeStart: "", //起始创建时间
        createTimeEnd: "" //截止创建时间
      }
    };
  },
  created() {
    // 显示系统
    this.sysTypeList = sysTypeList;
    this.indexInfo = JSON.parse(getAdvertisement());
    this.searchForm.positionNo = this.indexInfo.positionNo;
    // 获取列表
    this.getList();
  },
  methods: {
    ...mapActions({
      activityMapList: "appConfig/activityMapList",
      activityMapDel: "appConfig/activityMapDel"
    }),
    // 删除事件
    startDelete(id) {
      this.activityMapDel(id).then(() => {
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        // 再次请求数据
        this.getList();
      });
    },
    // 获取列表数据
    getList() {
      let sendInfo = Object.assign({}, this.searchForm);
      if (this.timeArr.length > 0) {
        sendInfo.createTimeStart = this.timeArr[0] + " 00:00:00";
        sendInfo.createTimeEnd = this.timeArr[1] + " 23:59:59";
      }
      this.activityMapList(sendInfo);
    },
    // 新增数据
    addInfo() {
      let bannerType = "";
      if (this.indexInfo.bannerType == "单图广告位") {
        bannerType = 1;
      } else if (this.indexInfo.bannerType == "多图广告位") {
        bannerType = 2;
      } else {
        bannerType = 0;
      }
      let route = this.$route.path;
      this.$router.push({
        path:
          route +
          "/add?type=" +
          bannerType +
          "&positionNo=" +
          this.indexInfo["positionNo"]
      });
    },
    // 重置数据
    searchDefault() {
      this.timeArr = [];
      this.searchForm = {
        bannerTitle: "", //广告标题
        positionNo: "", //广告图编号
        sysType: "", //显示系统
        createTimeStart: "", //起始创建时间
        createTimeEnd: "" //截止创建时间
      };
    },
    // table分发事件
    tableEmit(obj) {
      switch (obj.type) {
        case "detail": //详情
          let route = this.$route.path;
          this.$router.push({ path: route + "/add?id=" + obj.data.id });
          break;
        case "delete": //单个删除
          this.deleteIndex(obj.data.id);
          break;
        case "regetData": //条目更改
          this.getList();
          break;
        case "upd": //修改
          let routePath = this.$route.path;
          this.$router.push({ path: routePath + "/add?id=" + obj.data.id+"&type=upd" });
          break;
      }
    }
  },
  computed: {
    nowTableInfo: function() {
      // this.tableInfo.data.list = this.tableInfo.data.list.map(item => {
      //   item.terminalType = defaultChange(
      //     item.terminalType,
      //     true,
      //     "terminalType"
      //   );
      //   item.status = defaultChange(item.status, true, "bannerStatus");
      //   return item;
      // });
      return this.tableInfo;
    }
  }
};
</script>
<style scoped>
.headerButton {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  text-align: right;
  padding: 0px 20px;
}
</style>