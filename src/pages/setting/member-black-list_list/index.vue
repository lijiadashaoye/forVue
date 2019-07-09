<template>
  <div class="componentWaper">
    <div id="forHeader">
      <h3>{{pageName}}</h3>
      <div class="explosiveAdd">
        <el-button
          type="primary"
          size="mini"
          @click="addBlackList"
        >
          添加黑名单
        </el-button>
      </div>

      <div class='search'>

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm searchForm">
          <el-form-item label="加入类型" prop="joinType">
            <el-select v-model="ruleForm.joinType" placeholder="请选择">
              <el-option
                v-for="item in joinTypeOpt"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="手机号" prop="memberPhone">
            <el-input v-model="ruleForm.memberPhone" placeholder="请输入手机号"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="search('ruleForm')">查询</el-button>
            <el-button @click="resetForm('ruleForm')">清除</el-button>
          </el-form-item>
        </el-form>

      </div>

    </div>

    <div id="forTable">
      <isTable
      :inputData="this.$store.state.blackList.blackNameList"
      @tableEmit='tableEmit'/>
    </div>
    <!-- 修改/详情的弹框 -->
    <el-dialog :close-on-click-modal='false' :visible.sync="dialogVisible">
      <memberBlackList
      :opts="opts"
      :detailFlag="detailFlag"
      @send="send"
      @cancel="cancel"/>
    </el-dialog>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { black_list_upd } from '../../../api/setting_use.js'
import isTable from '../../../components/isTable/isTable';
import memberBlackList from '../../../components/memberBlackList';
export default {
  props: {},
  components: {
    isTable,
    memberBlackList
  },
  data() {
    return {
      pageName: "",// 当前页面名字
      detailFlag: false,//判断点击的是详情 编辑
      dialogVisible: false,//弹框开关
      opts: {

      },
      rules:{},
      ruleForm:{
        joinType: '',
        memberPhone: ''
      },
      joinTypeOpt:[ //加入黑名单的类型
                {
                    label: 'ip',
                    value: 'IP'
                },
                {
                    label: '频次',
                    value: 'TIMES'
                },
                {
                    label: '操作行为',
                    value: 'OPERATE_ACTION'
                }
            ],
    };
  },
  mounted() {
    this.userDo();
    this.getBlackNameListData({
      pageNum : this.$store.state.blackList.blackNameList.pageNum,
      pageSize : this.$store.state.blackList.blackNameList.pageSize
    });
    this.pageName = this.$route.name;
    this.$store.state.blackList.blackNameList.data.title = [
      {
        title: "手机号",
        key: "memberPhone",
        minWidth: "120",
      },{
        title: "加入类型",
        key: "joinTypeCN",
        minWidth: "120",
      },{
        title: "处理类型",
        key: "dealTypeCN",
        minWidth: "120",
      },{
        title: "创建时间",
        key: "gmtCreated",
        minWidth: "200",
      }
    ]
  },

  methods: {
    ...mapMutations({
      userDo : 'blackList/userDo',
      getBlackNameListData : 'blackList/getBlackNameListData',
      deleteList: 'blackList/deleteList'
    }),

    addBlackList() {
      let jurisdiction = JSON.parse(localStorage.getItem("buttenpremissions"));
      //有权限  跳转到创建页面
      if (jurisdiction.indexOf("black_list_add") > -1) {
        this.$router.push(`/home/setting/member-black-list/add`);
      } else {
        //弹出消息提示用户
        this.$alert("您没有这个权限", {
          confirmButtonText: "确定"
        });
      }
    },

    //点击删除
    delete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.deleteList(id,{
            pageNum : this.$store.state.blackList.blackNameList.pageNum,
            pageSize : this.$store.state.blackList.blackNameList.pageSize,
            joinType: this.ruleForm.joinType != ''? this.ruleForm.joinType : null,
            memberPhone: this.ruleForm.memberPhone != '' ? this.ruleForm.memberPhone : null,
          });
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
      });
    },
    //修改点击取消
    cancel() {
      this.opts = {};
      this.dialogVisible = false;
    },
    //修改点击保存
    send(data){
      black_list_upd(data).then(res=> {
        if(res) {
          this.dialogVisible = false;
          this.getBlackNameListData({
            pageNum: this.$store.state.protocol.protocolList.pageNum,
            pageSize: this.$store.state.protocol.protocolList.pageSize,
            joinType: this.ruleForm.joinType != ''? this.ruleForm.joinType : null,
            memberPhone: this.ruleForm.memberPhone != '' ? this.ruleForm.memberPhone : null,
          })
        }
      }).catch(()=> {
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
  //  点击修改
    edit(data) {
      this.opts = data;
      this.dialogVisible = true;
      this.detailFlag = false;
    },
    //点击详情
    detail(data) {
      this.opts = data;
      this.dialogVisible = true;
      this.detailFlag = true;
    },
    // 监听表格的操作
    tableEmit(data) {
      switch (data.type) {
        case "regetData": // 分页的emit
           //再次请求列表数据
          this.getBlackNameListData({
            pageNum : this.$store.state.blackList.blackNameList.pageNum,
            pageSize : this.$store.state.blackList.blackNameList.pageSize,
            joinType: this.ruleForm.joinType != ''? this.ruleForm.joinType : null,
            memberPhone: this.ruleForm.memberPhone != '' ? this.ruleForm.memberPhone : null,
          });
          break;
        case "edit": // 编辑按钮
          this.edit(data.data);
          break;
        case "delete": // 删除按钮
          this.delete(data.data.id);
          break;
        case "detail": // 详情
          this.detail(data.data);
          break;
      }
    },
    //查询
    search(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.getBlackNameListData({
              pageNum : 1,
              pageSize : this.$store.state.blackList.blackNameList.pageSize,
              joinType: this.ruleForm.joinType != ''? this.ruleForm.joinType : null,
              memberPhone: this.ruleForm.memberPhone != '' ? this.ruleForm.memberPhone : null,
            });
          } else {
            return false;
          }
        });
    },
    //清除
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped='true' lang="scss">
  .search{
    width:100%;
  }
  .searchForm{
    display:flex;
    flex-wrap: nowrap;
  }
</style>
