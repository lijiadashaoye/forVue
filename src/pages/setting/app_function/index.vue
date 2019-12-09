<template>
  <div class="componentWaper" style="overflow-y:auto;padding-bottom:20px">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
    </div>
    <div style="padding:0px 40px">
      <div class="buttonGroup">
        <el-button type="primary" @click="save('ruleForm','save')">{{saveShow?'保存':'编辑'}}</el-button>
        <el-button v-if="saveShow" @click="saveShow=false">取消</el-button>
      </div>
      <p class="titleName">菜单button</p>
      <el-row :gutter="1">
        <el-col :span="4">
          <div class="colHeader">名称</div>
        </el-col>
        <el-col :span="10">
          <div class="colHeader">未选中效果图</div>
        </el-col>
        <el-col :span="10">
          <div class="colHeader">选中效果图</div>
        </el-col>
        <!-- <el-col :span="4">
          <div class="colHeader">操作</div>
        </el-col>-->
      </el-row>
      <el-row :gutter="1" v-for="(item,index) of listInfo" :key="index">
        <el-col :span="4">
          <div class="colItem">{{item.buttonName}}</div>
        </el-col>
        <el-col :span="10">
          <div class="colItem">
            <el-upload
              action="image"
              :data="{type:'unSelectImageUrl',index:index}"
              class="avatar-uploader"
              :show-file-list="false"
              :http-request="uploadMapFile"
              :disabled="!saveShow"
            >
              <el-button
                :disabled="!saveShow"
                style="margin-right:10px"
                size="mini"
                type="primary"
              >点击上传</el-button>
              <img
                v-if="item.unSelectImageUrl !=''"
                :src="ImgBaseUrl + item.unSelectImageUrl"
                class="avatar"
              />
              <img v-else src="@/assets/2.png" height="50px" width="auto" alt />
            </el-upload>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="colItem">
            <el-upload
              action="image"
              :data="{type:'selectImageUrl',index:index}"
              class="avatar-uploader"
              :show-file-list="false"
              :http-request="uploadMapFile"
              :disabled="!saveShow"
            >
              <el-button
                :disabled="!saveShow"
                style="margin-right:10px"
                size="mini"
                type="primary"
              >点击上传</el-button>
              <img
                v-if="item.selectImageUrl !=''"
                :src="ImgBaseUrl + item.selectImageUrl"
                class="avatar"
              />
              <img v-else src="@/assets/2.png" height="50px" width="auto" alt />
            </el-upload>
          </div>
        </el-col>
        <!-- <el-col :span="4">
          <div class="colItem">
            <el-button size="mini" @click="goEdit(index)" type="primary">编辑</el-button>
          </div>
        </el-col>-->
      </el-row>
      <br />
      <el-row>
        <el-col :span="4">
          <div class="colItem">其他按钮设置</div>
        </el-col>
        <el-col :span="10">
          <div class="colItem">
            <el-input style="width:80%" v-model="anotherInfo.jumpUrl" placeholder="请输入跳转地址"></el-input>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="colItem">
            <el-radio-group v-model="anotherInfo.showFlag">
              <el-radio label="0">展示</el-radio>
              <el-radio label="1">不展示</el-radio>
            </el-radio-group>
          </div>
        </el-col>
      </el-row>
      <p class="titleName">导航条背景</p>
      <el-row>
        <el-col :span="4">
          <div class="colItem">导航条背景</div>
        </el-col>

        <el-col :span="10">
          <div class="colItem">
            <el-upload
              action="image"
              :data="{type:'bg'}"
              class="avatar-uploader"
              :show-file-list="false"
              :http-request="uploadMapFile"
              :disabled="!saveShow"
            >
              <el-button
                :disabled="!saveShow"
                style="margin-right:10px"
                size="mini"
                type="primary"
              >点击上传</el-button>

              <img v-if="bgUrl !=''" :src="ImgBaseUrl + bgUrl" class="avatar" />
              <img v-else src="@/assets/2.png" height="50px" width="auto" alt />
            </el-upload>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="colItem">
            <el-checkbox @change="save('ruleForm','change')" v-model="showImages">是否展示默认图片</el-checkbox>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- <handle-dialog :buttonType="buttonType"  @again="getList" v-model="centerDialogVisible"></handle-dialog> -->
  </div>
</template>
<script>
import { mapActions } from "vuex";
import HandleDialog from "./components/handleDialog.vue";
import { upLoadImg } from "@/api/setting_use.js";
export default {
  components: {
    HandleDialog
  },
  computed: {
    // 返回的数据是乱的定位到其他这个item数据
    anotherInfo: function() {
      for (let item of this.listInfo) {
        if (item.buttonName == "其他") {
          return item;
        }
      }
    }
  },
  data() {
    return {
      buttonType: "", //按钮类型
      centerDialogVisible: false, //dialog状态
      ImgBaseUrl: "", //地址baseurl
      bgUrl: "", //导航条背景url
      saveShow: false, //编辑/保存
      pageName: "",
      env: "",
      showImages: false,
      listInfo: [
        {
          buttonName: "首页",
          buttonType: "01",
          selectImageUrl: "", //选中图片地址
          unSelectImageUrl: "", //未选时的图片地址
          selectImageDescribe: "", //选中的图片描述
          unSelectImageDescribe: "", //未选中时的图片描述
          sysType: "", //终端类型
          menuType: 0, //菜单类型
          terminalType: "" //终端类型
        },
        {
          buttonName: "项目",
          buttonType: "02",
          selectImageUrl: "", //选中图片地址
          unSelectImageUrl: "", //未选时的图片地址
          selectImageDescribe: "", //选中的图片描述
          unSelectImageDescribe: "", //未选中时的图片描述
          sysType: "", //终端类型
          menuType: 0, //菜单类型
          terminalType: "" //终端类型
        },
        {
          buttonName: "我的",
          buttonType: "03",
          selectImageUrl: "", //选中图片地址
          unSelectImageUrl: "", //未选时的图片地址
          selectImageDescribe: "", //选中的图片描述
          unSelectImageDescribe: "", //未选中时的图片描述
          sysType: "", //终端类型
          menuType: 0, //菜单类型
          terminalType: "" //终端类型
        },
        {
          buttonName: "发现",
          buttonType: "04",
          selectImageUrl: "", //选中图片地址
          unSelectImageUrl: "", //未选时的图片地址
          selectImageDescribe: "", //选中的图片描述
          unSelectImageDescribe: "", //未选中时的图片描述
          sysType: "", //终端类型
          menuType: 0, //菜单类型
          terminalType: "" //终端类型
        },
        {
          showFlag: "1", //默认不展示
          // menuNo: "", //菜单编号
          jumpUrl: "", //跳转链接
          buttonName: "其他",
          buttonType: "05",
          selectImageUrl: "", //选中图片地址
          unSelectImageUrl: "", //未选时的图片地址
          selectImageDescribe: "", //选中的图片描述
          unSelectImageDescribe: "", //未选中时的图片描述
          sysType: "", //终端类型
          menuType: 0, //菜单类型
          terminalType: "" //终端类型
        }
      ]
    };
  },
  created() {
    // 图片baseurl
    this.ImgBaseUrl = this.$ImgBaseUrl;
    this.env = sessionStorage.getItem("env") === "development";
    //   二级title
    this.pageName = this.$route.name.trim();
    this.getList();
  },
  methods: {
    ...mapActions({
      bannerMenuList: "appConfig/bannerMenuList",
      bannerMenuAdd: "appConfig/bannerMenuAdd"
    }),
    getList() {
      this.bannerMenuList().then(res => {
        if (res.data.showImages == "02") {
          this.showImages = false;
        } else {
          this.showImages = true;
        }
        // 背景图地址
        if(res.data.menuInfos[0].backgroundImage){
          this.bgUrl = res.data.menuInfos[0].backgroundImage;
        }
        this.listInfo = res.data.menuButtons;
      });
    },
    // 去编辑
    goEdit(index) {
      this.buttonType = index;
      this.centerDialogVisible = true;
    },
    // 上传文件
    uploadMapFile(params) {
      const _file = params.file;
      const isLt2M = _file.size / 1024 / 1024 < 2;
      const idJPG =
        _file.type === "image/jpeg" ||
        _file.type === "image/gif" ||
        _file.type === "image/png" ||
        _file.type === "image/jpg";
      var formData = new FormData();
      formData.append("file", _file);
      if (!idJPG) {
        this.$message.error("只能上传jpg/png/gif/jpeg格式的图片");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("请上传2M以下的图片");
        return false;
      }
      upLoadImg(formData).then(res => {
        if (res.success) {
          let dataInfo = params.data;
          if (dataInfo.type == "bg") {
            this.bgUrl = res.data;
          } else {
            this.listInfo[dataInfo.index][dataInfo.type] = res.data;
          }
        }
      });
    },
    // 默认图片change
    checkChange() {
      console.log(this.showImages);
    },
    // 保存编辑
    save(ruleForm, type) {
      if (!this.saveShow && type == "save") {
        this.saveShow = true;
        return;
      }
       // 不必要的代码 /后台原因
      if (this.bgUrl) {
        for (let item of this.listInfo) {
          if (item.buttonName == "其他") {
            item['backgroundImage'] = this.bgUrl
          }
        }
      }
      // 为了区分 menu 和check 控制
      let obj = {};
      if (type == "save") {
        obj = {
          menus: this.listInfo
        };
      } else {
        obj = {
          showImages: this.showImages ? "01" : "02"
        };
      }

      this.bannerMenuAdd(obj).then(() => {
        // 避免check过渡调用接口
        if (type == "save") {
          this.getList();
          this.saveShow = false;
        }
        this.$message.success(`更改成功`);
      });
    }
  }
};
</script>
<style scoped lang="scss">
.buttonGroup {
  display: flex;
  justify-content: space-between;
  padding: 20px 20px;
  width: 300px;
}
.titleName {
  color: #409eff;
  padding: 20px 20px;
}
.colItem {
  height: 70px;
  // line-height: 70px;
  // text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ghostwhite;
  overflow: hidden;
}
.colHeader {
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: gainsboro;
}
</style>