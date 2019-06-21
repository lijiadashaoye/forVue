<template>
  <div>
    <div class="formWaper">
      <!-- 此功能已变更，目前不需要
       formData={
        // bottomBtn: "",
        // btnImg: "",
        // btnText: "",
        // btnColor: "#000",
        // bottomBtnUrl: "",
        // bottomBtnUrlText: "",
        // topBtn: "",
        // topImg: "",
        // topBtnText: "",
        // topBtnColor: "#000",
        // topBtnUrl: "",
        // topBtnUrlText: "",
        // floatBtn: "",
        // floatImg: "",
        // floatUrl: "",
        // floatUrlText: "",
       }
        <el-form
        size="small"
        ref="formData"
        :model="formData"
        label-width="80px"
        label-suffix=':'
        :rules="rules"
        >
        <el-form-item label="活动图片">
          <div class="actImg">
            <div style="width:80px;">
              <el-checkbox v-model="formData.bottomBtn">底部按钮</el-checkbox>
            </div>
            <div class="upimg">
              <imgUpload @selectImg='getImg("actImg",$event)' />
            </div>
            <div class="toFlexImgRight">
              <el-form-item
                style="margin-bottom:17px;"
                label="按钮文字"
                prop="btnText"
              >
                <el-input
                  placeholder="不填则不显示，最多4个字符"
                  v-model="formData.btnText"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="文字颜色"
                style="margin:0;"
              >
                <el-color-picker
                  :disabled='!formData.btnText'
                  v-model="formData.btnColor"
                ></el-color-picker>
                <span class="cre-color">不选择默认为黑色</span>
              </el-form-item>
              <el-form-item
                label="跳转链接"
                style="position:relative;margin:0;"
              >
                <el-checkbox
                  v-model="formData.bottomBtnUrl"
                  class="urlCheckbox"
                ></el-checkbox>
                <el-input
                  placeholder="勾选后同步基本信息链接地址，可修改"
                  :disabled="!formData.bottomBtnUrl"
                  v-model="formData.bottomBtnUrlText"
                ></el-input>
              </el-form-item>

            </div>
          </div>

          <div class="actImg">
            <div style="width:80px;">
              <el-checkbox v-model="formData.topBtn">顶部按钮</el-checkbox>
            </div>
            <div class="upimg">
              <imgUpload @selectImg='getImg("topBtn",$event)' />
            </div>
            <div class="toFlexImgRight">
              <el-form-item
                style="margin-bottom:17px;"
                label="按钮文字"
                prop="topBtnText"
              >
                <el-input
                  placeholder="不填则不显示，最多4个字符"
                  v-model="formData.topBtnText"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="文字颜色"
                style="margin:0px;"
              >
                <el-color-picker
                  :disabled='!formData.topBtnText'
                  v-model="formData.topBtnColor"
                ></el-color-picker>
                <span class="cre-color">不选择默认为黑色</span>
              </el-form-item>
              <el-form-item
                label="跳转链接"
                style="position:relative;margin:0;"
              >
                <el-checkbox
                  v-model="formData.topBtnUrl"
                  class="urlCheckbox"
                ></el-checkbox>
                <el-input
                  placeholder="勾选后同步基本信息链接地址，可修改"
                  :disabled="!formData.topBtnUrl"
                  v-model="formData.topBtnUrlText"
                ></el-input>
              </el-form-item>

            </div>
          </div>

          <div class="actImg">
            <div style="width:80px;">
              <el-checkbox v-model="formData.floatBtn">浮窗设置</el-checkbox>
            </div>
            <div class="upimg">
              <imgUpload @selectImg='getImg("float",$event)' />
            </div>
            <div style="display:flex;align-items:flex-end;width:100%;">
              <el-form-item
                label="跳转链接"
                style="position:relative;margin:0;width:100%;"
              >
                <el-checkbox
                  v-model="formData.floatUrl"
                  class="urlCheckbox"
                ></el-checkbox>
                <el-input
                  placeholder="勾选后同步基本信息链接地址，可修改"
                  :disabled="!formData.floatUrl"
                  v-model="formData.floatUrlText"
                ></el-input>
              </el-form-item>

            </div>
          </div>
        </el-form-item>
      </el-form> -->
      <div style="display:flex;justify-content:space-between;margin-bottom:20px;">
        <div>
          <h4><span class="isPoints">*</span>请选择图片使用的场景：</h4>
          <el-select
            v-model="other"
            placeholder="请选择"
            multiple
            @change="showChuang"
          >
            <el-option
              v-for="item in otherList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>

        <div>
          <h4><span class="isPoints">*</span>请选显示渠道：</h4>
          <el-select
            v-model="showWay"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="tar in qudaoList"
              :key="tar.value"
              :label="tar.label"
              :value="tar.value"
            >
            </el-option>
          </el-select>
        </div>

      </div>
      <el-form
        v-if='other.includes("1")'
        size="small"
        label-width="80px"
        label-suffix=':'
      >

        <div style="padding-bottom:10px;display:flex;justify-content:space-between;">
          <p class="otherTitle">弹窗设置</p>
          <div>
            <el-button
              type="primary"
              size="mini"
              plain
              @click="addTanChuang('')"
            >继续添加弹窗图</el-button>
          </div>
        </div>

        <el-form-item
          v-for='(item,index) in tanchuanForm'
          :key='index'
        >
          <div style="display:flex;justify-content:flex-end;">
            <el-button
              size="mini"
              icon="el-icon-delete"
              type="danger"
              circle
              title="删除"
              @click="toDeleteTanchuang(item)"
            ></el-button>
          </div>
          <div class="actImg">
            <div class="upimg">
              <imgUpload
                :datas="{
                   url:'admin/file/up/market',
                  imgUrl:item.img
                }"
                @selectImg='tanChuangImg(item.id,$event)'
              />
            </div>
            <div class="imgRight">
              <div style="display:flex;">
                <div style="display:flex;margin-right:30px;">
                  <el-checkbox
                    @change='check(item)'
                    style="width:90px;"
                    v-model="item.unLogin"
                  >未登录</el-checkbox>
                  <el-select
                    :disabled="!item.unLogin"
                    v-model="item.noNeed"
                    placeholder="请选择"
                    multiple
                  >
                    <el-option
                      v-for="tar in loginList"
                      :key="tar.value"
                      :label="tar.label"
                      :value="tar"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div style="display:flex;">
                  <el-checkbox
                    @change='check(item)'
                    v-model="item.login"
                  >已登录</el-checkbox>
                  <el-select
                    v-model="item.need"
                    placeholder="请选择"
                    multiple
                    :disabled="!item.login"
                  >
                    <el-option
                      v-for="tar in loginList"
                      :key="tar.value"
                      :label="tar.label"
                      :value="tar"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div style="display:flex;">
                <el-checkbox
                  @change='check(item)'
                  v-model="item.jumpUrl"
                >跳转链接</el-checkbox>
                <el-input
                  :disabled="!item.jumpUrl"
                  v-model="item.jumpUrlText"
                ></el-input>
              </div>
            </div>

          </div>
        </el-form-item>
      </el-form>

      <el-form
        v-if='other.includes("2")'
        size="small"
        label-width="80px"
        label-suffix=':'
      >
        <div style="padding-bottom:10px;display:flex;justify-content:space-between;">
          <p class="otherTitle">分享页设置</p>
          <div>
            <el-button
              type="primary"
              size="mini"
              plain
              @click="addSharePage('')"
            >继续添加分享页图</el-button>
          </div>
        </div>

        <el-form-item
          v-for='(item,index) in shareForm'
          :key='index'
          :model="item"
        >
          <div style="display:flex;justify-content:flex-end;">
            <el-button
              size="mini"
              icon="el-icon-delete"
              type="danger"
              circle
              title="删除"
              @click="toDeleteShareForm(item)"
            ></el-button>
          </div>
          <div class="actImg">
            <div class="upimg">
              <imgUpload
                :datas="{
                  url:'admin/file/up/market',
                  imgUrl:item.img
                }"
                @selectImg='sharePageImg(item.id,$event)'
              />
            </div>
            <div class="imgRight">

              <el-form-item
                required
                label="分享途径"
                label-width="90px"
              >
                <el-select
                  v-model="item.shareWay"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in shareList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                required
                label="分享标题"
                label-width="90px"
                :rules='[{ min: 1, max: 19, message: "最多输入19个字", trigger: "blur" }]'
              >
                <el-input v-model="item.title"></el-input>
              </el-form-item>
              <el-form-item
                required
                label="分享内容"
                label-width="90px"
              >
                <el-input
                  type='textarea'
                  rows="3"
                  v-model="item.text"
                  :rules='[{ min: 1, max: 100, message: "最多输入100个字", trigger: "blur" }]'
                ></el-input>
              </el-form-item>
              <div style="display:flex;">
                <el-checkbox
                  style="text-indent:-2px;margin-right:12px;"
                  @change='checkShare(item)'
                  v-model="item.jumpUrl"
                >跳转链接:</el-checkbox>
                <el-input
                  :disabled="!item.jumpUrl"
                  v-model="item.jumpUrlText"
                ></el-input>
              </div>
            </div>

          </div>
        </el-form-item>
      </el-form>

      <div class="buttons">
        <el-button
          @click="step('before')"
          type="primary"
        >上一步</el-button>
        <el-button
          @click="step()"
          type="primary"
        >下一步</el-button>
        <el-button
          @click="reset"
          type="info"
        >重 置</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import imgUpload from "../../../../components/upImg.vue";

export default {
  props: {
    inputData: Object
  },
  components: { imgUpload },
  data() {
    return {
      otherList: [
        //  选择图片使用场景
        // {
        //   label: "弹窗",
        //   value: "1"
        // },
        {
          label: "分享页",
          value: "2"
        }
      ],
      loginList: [
        // 弹窗的未登录、已登录选项
        {
          value: "GENERAL",
          label: "通用"
        },
        {
          value: "NEWUSER",
          label: "新用户"
        },
        {
          value: "OLDUSER",
          label: "老用户"
        }
      ],
      shareList: [
        // 分享
        {
          label: "微信",
          value: "WECHAT"
        },
        {
          label: "朋友圈",
          value: "MOMENTS"
        },
        {
          label: "QQ",
          value: "QQ"
        },
        {
          label: "qq空间",
          value: "QQ_SPACE"
        }
      ],
      qudaoList: [
        // 显示渠道
        {
          label: "H5",
          value: "H5"
        },
        {
          label: "ios",
          value: "IOS"
        },
        {
          label: "Android",
          value: "ANDROID"
        },
        {
          label: "Web",
          value: " WEB"
        }
      ],
      other: [], // 显示是否需要设置的弹窗、分享页
      showWay: "", // 显示渠道
      tanchuanForm: [], // 弹窗的数据
      shareForm: [] // 分享页的数据
    };
  },
  mounted() {
    let fromHttp = sessionStorage.getItem("fromHttp");
    let step2Data = sessionStorage.getItem("step2Data");

    if (fromHttp && !step2Data) {
      // 只是通过点击编辑过来
      let fromHttpData = JSON.parse(fromHttp);
      // let couponList = fromHttpData.couponList; // 弹窗
      let shareList = fromHttpData.shareList; // 分享页
      this.showWay = fromHttpData.platformType;
      // if (couponList.length > 0) {
      //   this.other.push("1");
      //   couponList.forEach(item => this.addTanChuang(item));
      // }
      if (shareList.length > 0) {
        this.other.push("2");
        shareList.forEach(item => this.addSharePage(item));
      }
    }
    // 如果编辑过页面，再回到这个页面，数据要继续赋上（新建）
    else if (step2Data) {
      let step2 = JSON.parse(sessionStorage.getItem("step2Data"));
      this.other = step2.other;
      this.showWay = step2.showWay;
      this.tanchuanForm = step2.tanchuanForm;
      this.shareForm = step2.shareForm;
      this.showChuang();
    }
  },
  methods: {
    // 整个页面的验证
    toValid() {
      let shareFormValid = true; // 分享页
      let tanchuanFormValid = true; // 弹窗
      let pageData = false; // 当前页面是否已有数据
      if (this.other.length > 0 && this.showWay) {
        pageData = true;
      }
      // 分享页的验证
      if (this.shareForm.length != 0) {
        this.shareForm.forEach(item => {
          if (item.jumpUrl && !item.jumpUrlText) {
            shareFormValid = false;
          }
          if (item.title == "" || item.text == "" || item.shareWay == "") {
            shareFormValid = false;
          }
        });
      }
      // 弹窗的验证
      if (this.tanchuanForm.length != 0) {
        this.tanchuanForm.forEach(item => {
          if (item.unLogin && item.noNeed.length == 0) {
            tanchuanFormValid = false;
          }
          if (item.login && item.need.length == 0) {
            tanchuanFormValid = false;
          }
          if (item.jumpUrl && !item.jumpUrlText) {
            tanchuanFormValid = false;
          }
        });
      }
      return shareFormValid && tanchuanFormValid && pageData;
    },
    // 弹窗设置的检查
    check(item) {
      if (!item.unLogin) {
        item.noNeed = [];
      }
      if (!item.login) {
        item.need = [];
      }
      if (!item.jumpUrl) {
        item.jumpUrlText = "";
      }
    },
    // 分享页的设置
    checkShare(item) {
      if (!item.jumpUrl) {
        item.jumpUrlText = "";
      }
    },
    // 删除弹窗
    toDeleteTanchuang(tar) {
      this.tanchuanForm = this.tanchuanForm.filter(item => item.id != tar.id);
    },
    // 删除分享页
    toDeleteShareForm(tar) {
      this.shareForm = this.shareForm.filter(item => item.id != tar.id);
    },
    // 继续添加弹窗
    addTanChuang(data) {
      let obj = {
        id: this.tanchuanForm.length + 1, // 前端使用，不会给服务器
        img: "", // 本地显示用
        urlImg: "", // 服务器保存用
        unLogin: "", // 是否有未登录的
        noNeed: [], // 未登录的用户类型
        login: "", // 是否有登录的
        need: [], // 登录的用户类型
        jumpUrl: "", // 是否加链接
        jumpUrlText: "" // 链接地址
      };
      if (data) {
        obj.id = data.id;
        obj.img = data.picture;
        obj.urlImg = data.picture;

        if (data.link) {
          obj.jumpUrl = true;
          obj.jumpUrlText = data.link;
        }
        if (data.detailDtoList.length > 0) {
          data.detailDtoList.forEach(tar => {
            if (tar.needLogin === "NONEED") {
              obj.unLogin = true; // 是否有未登录的
              let sele = {
                id: tar.id,
                value: tar.memberType
              };
              switch (tar.memberType) {
                case "GENERAL":
                  sele.label = "通用";
                  break;
                case "NEWUSER":
                  sele.label = "新用户";
                  break;
                case "OLDUSER":
                  sele.label = "老用户";
                  break;
              }
              obj.noNeed.push(sele); // 不需要
            }
            if (tar.needLogin === "NEED") {
              obj.login = true; //需要登录
              let sele = {
                id: tar.id,
                value: tar.memberType
              };
              switch (tar.memberType) {
                case "GENERAL":
                  sele.label = "通用";
                  break;
                case "NEWUSER":
                  sele.label = "新用户";
                  break;
                case "OLDUSER":
                  sele.label = "老用户";
                  break;
              }
              obj.need.push(sele);
            }
          });
        }
      }
      this.tanchuanForm.push(obj);
    },
    // 继续添加分享页
    addSharePage(data) {
      let obj = {
        id: this.shareForm.length + 1, // 前端使用，不会给服务器
        img: "", // 本地显示用
        urlImg: "", // 服务器保存用
        title: "", // "分享标题"
        text: "", // "分享内容"
        shareWay: "", // 分享途径
        jumpUrl: "", // 是否加链接
        jumpUrlText: "" // 链接地址
      };
      if (data) {
        obj.id = data.id;
        obj.img = data.picture;
        obj.urlImg = data.picture;
        obj.text = data.content;
        obj.title = data.title;
        obj.shareWay = data.type;
        if (data.link) {
          obj.jumpUrl = true; // 是否加链接
          obj.jumpUrlText = data.link; // 链接地址
        }
      }
      this.shareForm.push(obj);
    },
    // 监听是否添加浮窗和分享页
    showChuang() {
      if (this.other.includes("1")) {
        if (this.tanchuanForm.length === 0) {
          this.addTanChuang("");
        }
      } else {
        this.tanchuanForm = [];
      }
      if (this.other.includes("2")) {
        if (this.shareForm.length === 0) {
          this.addSharePage("");
        }
      } else {
        this.shareForm = [];
      }
    },
    // 弹窗设置的图片上传
    tanChuangImg(id, data) {
      let obj = this.tanchuanForm.filter(item => item.id == id)[0];
      obj.img = data.base64;
      obj.urlImg = data.url;
    },
    // 分享页设置的图片上传
    sharePageImg(id, data) {
      // 修改对象里的数据，直接改即可
      let obj = this.shareForm.filter(item => item.id == id)[0];
      obj.img = data.base64;
      obj.urlImg = data.url;
    },
    // 重置
    reset() {
      this.showChuang();
      this.other = [];
    },
    // 下一步
    step(type) {
      if (type === "before") {
        this.$router.push({ name: `activity_create_step1` });
      } else {
        if (this.toValid()) {
          let obj = {
            showWay: this.showWay,
            other: this.other, // 显示是否需要设置的弹窗、分享页
            tanchuanForm: this.tanchuanForm, // 弹窗的数据
            shareForm: this.shareForm // 分享页的数据
          };
          sessionStorage.setItem("step2Data", JSON.stringify(obj));
          this.$router.push({ name: `activity_create_step3` });
        } else {
          this.$message.error(
            "请填写必要的数据（星号标注的，以及已经勾选的）！"
          );
        }
      }
    }
  }
};
</script>

<style scoped='true' lang="scss">
.formWaper {
  width: 80%;
  min-width: 600px;
  padding: 20px;
  margin: 0 auto;
  margin-left: 10%;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin: 20px auto;
  padding-left: 60px;
  width: 50%;
}
.actImg {
  display: flex;
  margin-bottom: 30px;
}
.upimg {
  width: 100px;
  height: 100px;
  margin: 0 30px;
  flex-shrink: 0;
}
.urlCheckbox {
  position: absolute;
  left: -90px;
  padding-right: 70px;
}
.otherTitle {
  font-size: 18px;
  font-weight: bold;
}
.imgRight {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.toFlexImgRight {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
}
.cre-color {
  color: #ccc;
  line-height: 10px;
  padding-left: 10px;
}
.isPoints {
  font-size: 22px;
  color: red;
  line-height: 12px;
  padding: 0 4px;
  vertical-align: middle;
}
</style>
