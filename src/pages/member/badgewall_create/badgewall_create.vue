<template>
  <div class="pageWaper">
    <div id='forHeader'>
      <h3>{{pageName}}</h3>
    </div>
    <div v-if="!isOk">
      <div class="formWaper">
        <el-form
          size="small"
          ref="formData"
          :model="formData"
          :rules="rules"
          label-width="100px"
        >
          <el-form-item
            label="徽章墙图标"
            required
            class="isImgd"
          >
            <imgUpload
              v-if="show"
              :datas="{
                  url:'admin/file/up/market',
                  imgUrl:''
                }"
              @selectImg='getImg("actImg",$event)'
            />
          </el-form-item>

          <el-form-item
            label="徽章墙名称"
            prop="badgeWallName"
            class="forName"
          >
            <el-input v-model="formData.badgeWallName"></el-input>
          </el-form-item>
          <el-form-item
            label="徽章墙说明"
            prop="badgeWallExplain"
          >
            <el-input
              rows='3'
              type='textarea'
              v-model="formData.badgeWallExplain"
            ></el-input>
          </el-form-item>

          <el-form-item label="模块介绍">
            <el-input
              rows='3'
              type='textarea'
              v-model="formData.moduleExplain"
            ></el-input>
          </el-form-item>

          <el-form-item label="礼品介绍">
            <el-input
              rows='3'
              type='textarea'
              v-model="formData.giftExplain"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="H5 链接"
            prop="webUrl"
          >
            <el-input
              rows='2'
              type='textarea'
              v-model="formData.webUrl"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="点亮规则类型"
            prop="ruleType"
          >
            <el-select
              v-model="formData.ruleType"
              clearable
              placeholder="请选择"
            >
              <el-option
                size='mini'
                v-for="item in outList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

        </el-form>
      </div>
      <div class="buttons">
        <el-button
          @click="step()"
          type="primary"
        >保 存</el-button>
        <el-button
          @click="reset"
          type="info"
        >重 置</el-button>
      </div>
    </div>
    <hasSuccess
      @isOver="isOver"
      v-if="isOk"
    />
  </div>
</template>
<script>
import imgUpload from "../../../components/upImg.vue";
import hasSuccess from "../../../components/success.vue";

export default {
  components: { imgUpload, hasSuccess },
  data() {
    return {
      isOk: false, // 控制表单填写完毕的显示
      show: true, // 控制上传图片组件的显示隐藏
      pageName: "", // 当前页面名字
      formData: {
        badgeWallName: "",
        badgeWallExplain: "",
        moduleExplain: "",
        giftExplain: "",
        webUrl: "",
        ruleType: "",
        badgeWallIcon: ""
      },
      //表单验证
      rules: {
        badgeWallName: [
          { required: true, message: "请输入徽章墙名称", trigger: "blur" }
        ],
        badgeWallExplain: [
          { required: true, message: "请输入徽章墙说明", trigger: "blur" }
        ]
      },

      outList: [
        // 活动奖励选项数据
        {
          label: "默认(直接就给)",
          value: "DIRECT"
        },
        {
          label: "多少次数的任务",
          value: "TIMES"
        },
        {
          label: "固定任务",
          value: "FIXED"
        }
      ]
    };
  },
  created() {
    this.pageName = sessionStorage.getItem("page");
  },
  mounted() {
    let id = this.$route.query["id"];
    if (id) {
    }
  },
  methods: {
    reset() {
      this.show = false;
      this.formData = {
        badgeWallName: "",
        badgeWallExplain: "",
        moduleExplain: "",
        giftExplain: "",
        webUrl: "",
        ruleType: "",
        badgeWallIcon: ""
      };
      setTimeout(() => (this.show = true), 100);
    },
    // 添加图标
    getImg(type, data) {
      this.formData.badgeWallIcon = data.url;
    },
    isOver(type) {
      if (type === "back") {
        sessionStorage.setItem("page", "徽章列表");
        this.$router.push({ name: `badgewall_list` });
      } else {
        this.isOk = false;
      }
    },
    step(num) {
      this.$refs.formData.validate(valid => {
        if (valid) {
          if (this.formData.badgeWallIcon) {
            // isOk
            let httpType = "";
            if (this.$route.query["id"]) {
              httpType = "put";
            } else {
              httpType = "post";
            }
            this.$api
              .member_badgeWall_upFinalData({
                vm: this,
                data: this.formData,
                method: httpType
              })
              .then(res => {
                if (res) {
                  this.isOk = true;
                  this.reset();
                }
              });
          } else {
            this.$message.error("请选择上传图标！");
          }
        } else {
          this.$message.error("请选择将数据填写完整！");
        }
      });
    }
  }
};
</script>

<style scoped='true' lang="scss">
.formWaper {
  width: 60%;
  margin: 0 auto;
  margin-top: 30px;
}
.buttons {
  display: flex;
  justify-content: space-between;
  margin: 20px auto;
  padding-left: 60px;
  width: 30%;
}
.forImg {
  display: flex;
}
.isImgd {
  width: 240px;
}
</style>
