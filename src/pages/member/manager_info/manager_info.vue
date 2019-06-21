<template>
  <div class="componentWaper">
    <div id="forHeader" class="headerName">
      <h3>{{pageName}}</h3>
      <el-button size="mini" type="warning" @click="back">返回</el-button>
    </div>
    <div id="forTable">
      <ul>
        <li>
          <img class="isAvatar" :src="infoData.avatar">
        </li>
        <li class="forName">
          <p class="isName">{{infoData.name}}</p>
          <p>
            <strong style="text-align:right;">会员呢称：</strong>
            {{infoData.nickname}}
          </p>
          <p>
            <strong style="text-align:right;">会员状态：</strong>
            {{infoData.status}}
          </p>
          <el-button style="margin-left:20px;" size="mini" type="primary" @click="makeMark()">标签操作</el-button>
        </li>
        <li class="infoTitle">
          <span>基本信息</span>
        </li>
        <li class="infoContent">
          <div>
            <strong>性别：</strong>
            {{infoData.sex}}
          </div>
          <div>
            <strong>证件类型：</strong>
            {{infoData.certificateType}}
          </div>
        </li>
        <li class="infoContent">
          <div>
            <strong>年龄：</strong>
            {{infoData.age}}
          </div>
          <div>
            <strong>证件号：</strong>
            {{infoData.certificateNo}}
          </div>
        </li>
        <li class="infoContent">
          <div>
            <strong>生日：</strong>
            {{infoData.birthday}}
          </div>

          <div>
            <strong>联系地址：</strong>
            {{infoData.address}}
          </div>
        </li>
        <li class="infoContent">
          <div>
            <strong>QQ：</strong>
            {{infoData.qq}}
          </div>

          <div>
            <strong>会员手机号：</strong>
            {{infoData.phone}}
          </div>
        </li>
        <li class="infoContent">
          <div>
            <strong>微信：</strong>
            {{infoData.weChat}}
          </div>
          <div>
            <strong>来源：</strong>
            {{infoData.source}}
          </div>
        </li>
        <li class="infoContent">
          <div>
            <strong>等级：</strong>
            {{infoData.levelName}}
          </div>

          <div class="levelIcon">
            <strong>等级图标：</strong>
            <img :src="infoData.LevelIcon">
          </div>
        </li>
        <li class="infoTitle">
          <span>其他信息</span>
        </li>
        <li class="infoContent">
          <div>
            <strong>会员编号：</strong>
            {{infoData.no}}
          </div>
        </li>

        <li class="infoContent">
          <div>
            <strong>积分：</strong>
            {{infoData.integral}}
          </div>
          <div>
            <strong>累计积分：</strong>
            {{infoData.totalIntegral}}
          </div>
        </li>

        <li class="infoContent">
          <div>
            <strong>成长值：</strong>
            {{infoData.growth}}
          </div>
          <div>
            <strong>累计成长值：</strong>
            {{infoData.totalGrowth}}
          </div>
        </li>

        <li class="infoContent">
          <div>
            <strong>负责顾问id：</strong>
            {{infoData.responsibleConsultantId}}
          </div>
          <div>
            <strong>负责顾问名称：</strong>
            {{infoData.responsibleConsultantName}}
          </div>
        </li>

        <li class="infoContent">
          <div>
            <strong>注册时间：</strong>
            {{infoData.createTime}}
          </div>

          <div>
            <strong>最近登录时间：</strong>
            {{infoData.lastLoginTime}}
          </div>
        </li>

        <li>
          <strong>标签：</strong>
          <div class="isList">
            <p
              v-for="(tar,index) in infoData.memberLabelList"
              :key="index"
              :style="{background:makeStyle()}"
            >{{tar.labelName}}</p>
          </div>
        </li>
      </ul>

      <el-dialog
        :close-on-click-modal="false"
        :title="dialogMark.title"
        :visible.sync="dialogMark.show"
        width="500px"
        :before-close="markDialogClose"
        style="padding:0;"
      >
        <makeTag v-if="dialogMark.show" :inputData="forMark" @toSearch="getMarkList"/>

        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="markDialogAction(false)">取 消</el-button>
          <el-button size="mini" type="primary" @click="markDialogAction(true)">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import makeTag from "../../../components/makeTag.vue";

export default {
  components: {
    makeTag
  },
  data() {
    return {
      pageName: "",
      infoData: {}, // 保存服务器给的数据，已经格式化
      forMark: {
        // 标签组件使用的数据结构
        list: [], // 备选数据
        hasSelect: [], // 添加的标签
        willAdd: [], // 从已有的中准备删除的
        toDelete: [], // 彻底删除的
        name: "" // 搜索的内容
      },
      dialogMark: {
        show: false,
        title: ""
      }
    };
  },
  mounted() {
    this.pageName = sessionStorage.getItem("page");
    this.getUserData();
  },
  methods: {
    back() {
      window.history.back();
    },
    // 打标签
    makeMark() {
      this.getMarkList().then(res => {
        // 查询用户已经有哪些标签，并显示出来
        if (
          this.infoData.memberLabelList &&
          this.infoData.memberLabelList.length > 0
        ) {
          this.forMark.hasSelect = this.infoData.memberLabelList.map(item => {
            return {
              id: item.id,
              labelId: item.labelId,
              name: item.labelName,
              bkColor: this.makeStyle()
            };
          });
        }
        this.dialogMark.title = "标签";
        this.dialogMark.show = true;
      });
    },
    // 查询标签
    getMarkList() {
      return this.$api
        .member_manager_getMarkLise({
          vm: this,
          data: { name: this.forMark.name }
        })
        .then(res => {
          if (res) {
            this.forMark.list = res.data.list.map(item => {
              return {
                labelId: item.id,
                name: item.name,
                bkColor: this.makeStyle() 
              };
            });
          }
        });
    },
    // 随机设置背景色
    makeStyle() {
      let num1 = Math.random() * 255;
      let num2 = Math.random() * 255;
      let num3 = Math.random() * 255;
      let str = `rgba(${num1},${num2},${num3},.4)`;
      return str;
    },
    // 标签弹出框的取消、确定按钮
    markDialogAction(type) {
      if (type) {
        let promiseArr = [];
        // 删除标签
        if (this.forMark.toDelete.length > 0) {
          let arr = this.forMark.toDelete.map(item => item.id);
          arr.forEach(id => {
            promiseArr.push(
              this.$api.member_user_deleteMark({
                vm: this,
                data: id
              })
            );
          });
        }
        // 添加标签
        if (this.forMark.willAdd.length > 0) {
          let obj = {
            memberId: this.$route.query["id"],
            labelIds: this.forMark.willAdd.map(item => item.labelId)
          };
          promiseArr.push(
            this.$api.member_user_singleMark({
              // 打标签
              vm: this,
              data: obj
            })
          );
        }
        Promise.all(promiseArr).then(res => {
          this.markDialogClose();
          this.getUserData();
        });
      } else {
        // 修改
        this.markDialogClose();
      }
    },
    // 标签弹框的关闭
    markDialogClose() {
      this.forMark = {
        list: [], // 备选数据
        hasSelect: [], // 添加的标签
        willAdd: [], // 从已有的中准备删除的
        toDelete: [], // 彻底删除的
        name: "" // 搜索的内容
      };
      this.dialogMark = {
        show: false,
        title: ""
      };
    },
    // 获取详情数据
    getUserData() {
      this.$api
        .member_manager_getInfo({
          vm: this,
          data: this.$route.query["id"]
        })
        .then(res => {
          if (res) {
            let obj = {};
            let arr = Object.keys(res.data);
            arr.forEach(str => {
              obj[str] = res.data[str];
              // MAN:男 WOMAN:女 UNKNOW:未知)
              switch (res.data.sex) {
                case "MAN":
                  obj["sex"] = "男";
                  break;
                case "WOMAN":
                  obj["sex"] = "女";
                  break;
                case "UNKNOW":
                  obj["sex"] = "未知";
                  break;
              }
              switch (res.data.status) {
                // ENABLE:启用 DISABLE:停用)
                case "ENABLE":
                  obj["status"] = "启用";
                  break;
                case "DISABLE":
                  obj["status"] = "冻结";
                  break;
              }
              switch (res.data.certificateType) {
                // 证件类型(IDCARD:身份证 PASSPORT:护照 OFFICERCARD:军官证)
                case "IDCARD":
                  obj["certificateType"] = "身份证";
                  break;
                case "PASSPORT":
                  obj["certificateType"] = "护照";
                  break;
                case "OFFICERCARD":
                  obj["certificateType"] = "军官证";
                  break;
              }
            });
            this.infoData = obj;
          }
        });
    }
  }
};
</script>

<style scoped='true' lang="scss">
@import url("./managet_info.scss");
</style>
