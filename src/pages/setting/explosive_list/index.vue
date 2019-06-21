<template>
  <div class="componentWaper">
    <div id="forHeader">
      <h3>
        {{pageName}}
      </h3>
      <div class="explosiveAdd">
        <el-button
          type="primary"
          size="mini"
          @click="addExplosive"
        >
          新增爆款产品
        </el-button>
        <el-select
          v-model="searchVal"
          filterable
          clearable
          remote
          reserve-keyword
          placeholder="请输入产品名称"
          :remote-method="remoteMethod"
          :loading="loading"
          @change="search">
          <el-option
            v-for="item in searchOpt"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="filter">
          <!-- 暂时没有接口 -->
        <effectTime
          :title="'生效时间'"
          @timeSearch="effectTimeSearch"
        />
      </div>
    </div>
    <!-- 列表 -->
    <div
      id="forTable">
      <isTable
        :inputData='this.$store.state.explosive.explosiveList'
        @tableEmit='tableEmit'
      />
    </div>
    <!-- 修改遮罩 -->
    <el-dialog :close-on-click-modal='false' title="修改" :visible.sync="flag">
      <SettingExplosiveCommend
        :productTypeList="productTypeList"
        :productNameList="productNameList"
        :opts="opts"
        @reqs="reqs"/>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import isTable from "../../../components/isTable/isTable";
import SettingExplosiveCommend from "../../../components/SettingExplosiveCommend";
import datePicker from '../../../components/datePicker';
import { explosive_updata } from '../../../api/setting_use.js';
import { timestampToTime } from '../../../sets/timeFormat.js';
export default {
  props: {},
  components: {
    isTable,
    SettingExplosiveCommend,//修改或者新增的组件
    effectTime:datePicker,//生效日期
  },
  data() {
    return {
      pageName: "", // 当前页面名字
      searchVal: "",
      msg:"",
      flag: false,
      searchOpt: [],//搜索列表
      list: [],
      states: [],
      productTypeList:[{
        value: "货币基金",
        label: "货币基金"
      },{
        value: "理财产品",
        label: "理财产品"
      },{
        value: "纯债基金",
        label: "纯债基金"
      },{
        value: "存款产品",
        label: "存款产品"
      }],
      productNameList:[{
        id: 1,
        value: "美金",
        label: "美金"
      },{
        id: 2,
        value: "欧元",
        label: "欧元"
      },{
        id: 3,
        value: "卢比",
        label: "卢比"
      },{
        id: 4,
        value: "人民币",
        label: "人民币"
      }],
      opts:{

      },
      productList:[],
      loading: true,
      effectTimeVal: "",//生效时间
    };
  },
  created() {
    this.getExplosiveListData({
      pageNum: this.$store.state.explosive.explosiveList.pageNum,
      pageSize: this.$store.state.explosive.explosiveList.pageSize,
      dataType:"EXPLOSIVE"
    });
  },
  mounted() {
    this.userDo();
    this.getExplosiveListData();
    this.pageName = this.$route.name;
    this.productList = this.$store.state.explosive.explosiveList.data.list.length > 0 ? this.$store.state.explosive.explosiveList.data.list : JSON.parse(window.sessionStorage.getItem('explosiveList'));
    this.productList.forEach(v=> {
      if(this.states.indexOf(v.productName) === -1){
        this.states.push(v.productName)
      }
    })
    this.list = this.states.map(item => {
      return { value: item, label: item };
    });
    this.$store.state.explosive.explosiveList.data.title = [
      {
        title: "ID",
        key: "id",
        minWidth: "100",
        sortable: true
      },
      {
        title: "产品名称",
        key: "productName",
        minWidth: "120"
      },
      {
        title: "产品类型",
        key: "productTypeName",
        minWidth: "100"
      },
      {
        title: "开始时间",
        key: "startTime",
        minWidth: "200",
        sortable: true
      },
      {
        title: "结束时间",
        key: "endTime",
        minWidth: "200",
        sortable: true
      },
      {
        title: "操作时间",
        key: "gmtModified",
        minWidth: "200",
        sortable: true
      },
      {
        title: "操作人",
        key: "modifierName",
        minWidth: "100"
      }
    ];
  },
  methods: {
    ...mapMutations({
      getExplosiveListData: "explosive/getExplosiveListData",
      userDo: "explosive/userDo",
      deteleList: "explosive/deleteList"
    }),
    ...mapActions({
    }),
    addExplosive() {
      let jurisdiction = JSON.parse(localStorage.getItem("buttenpremissions"));
      //有权限  跳转到创建页面
      if (jurisdiction.indexOf("explosive_add") > -1) {
        this.$router.push(`/home/setting/explosive/add`);
      } else {
        //弹出消息提示用户
        this.$alert("您没有这个权限", {
          confirmButtonText: "确定"
        });
      }
    },
    //点击详情
    open() {
      this.$alert("您好，此项暂未开启", "产品详情", {
        confirmButtonText: "确定",
        callback: action => {
          this.$message({
            type: "info",
            message: `action: ${action}`
          });
        }
      });
    },
    //点击删除
    delete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // window.location.reload();
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.deteleList(id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    reqs(data){
      this.opts = data;
      this.flag = false;
      explosive_updata(data).then(res=> {
        if(res.success){
          this.flag = false;
          this.getExplosiveListData();
        }
      }).catch(()=>{
        this.$alert(`${res.message}`, '保存失败', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      })
    },
    //点击编辑
    edit(data){
      this.flag = true;
      this.opts = data;
    },
    // 监听表格的操作
    tableEmit(data) {
      switch (data.type) {
        case "regetData": // 分页的emit
           this.getExplosiveListData();
          break;
        case "edit": // 编辑按钮
          this.edit(data.data);
          break;
        case "delete": // 删除按钮
          this.delete(data.data.id);
          break;
        case "detail": // 详情
          this.open();
          break;
      }
    },
    //搜索
    search() {
      this.getExplosiveListData({
        dataType:"EXPLOSIVE",
        startTime: timestampToTime(this.effectTimeVal[0]),
        endTime: timestampToTime(this.effectTimeVal[1]),
        productName: this.searchVal,
      })
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.searchOpt = this.list.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.searchOpt = [];
      }
    },
    //时间筛选
    effectTimeSearch(val) {
      this.effectTimeVal = val;
      if(this.effectTimeVal){
        this.getExplosiveListData({
          dataType:"EXPLOSIVE",
          startTime: timestampToTime(this.effectTimeVal[0]),
          endTime: timestampToTime(this.effectTimeVal[1]),
          productName: this.searchVal,
        })
      } else {
        this.getExplosiveListData({
          dataType:"EXPLOSIVE",
          productName: this.searchVal,
        })
      }
    },
  }
};
</script>

<style scoped='true' lang="scss">
.explosiveAdd {
  width: 100%;
  height:68px;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  box-sizing: border-box;
  .el-input {
    width: 200px;
  }
  }
  .Dialog {
    width:100%;
    height:100%;
    background: rgba(0,0,0,.6);
    padding:100px;
    box-sizing:border-box;
  }
  .filter{
    display:flex;
    width:100%;
  }
</style>
