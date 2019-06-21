<template>

  <div>
    <div
      class="formWaper"
      v-if="!isOk"
    >
      <el-form
        size="small"
        ref="formData"
        :model="formData"
        :rules="rules"
        label-width="130px"
      >
        <el-form-item
          label="启动/关闭时间"
          required
        >
          <el-date-picker
            v-model="formData.actTimes"
            type="daterange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item
          label="活动说明"
          prop="text"
        >
          <el-input
            rows='3'
            type='textarea'
            v-model="formData.text"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="操作人"
          v-for="(tar,index) in who"
          :key='index'
        >
          <span v-if="tar.creator">{{'ID：'+tar.creator}}<br></span>
          <span v-if="tar.creatorName">{{'名字：'+tar.creatorName}}<br></span>
          <span v-if="tar.gmtCreated"> {{'时间：'+tar.gmtCreated}}</span>
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
          :disabled="isSaveIng"
        >保存</el-button>
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
import hasSuccess from "../../../../components/success.vue";

export default {
  components: { hasSuccess },
  data() {
    return {
      isSaveIng: false, // 切换保存按钮的可点击状态
      isOk: false,
      formData: {},
      who: [], // 操作人
      //表单验证
      rules: {
        actTimes: [
          { required: true, message: "请输入活动时间", trigger: "blur" }
        ],
        text: [
          { min: 1, max: 800, message: "最多输入800个字", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    let fromHttp = sessionStorage.getItem("fromHttp");
    let step3Data = sessionStorage.getItem("step3Data");
    if (fromHttp && !step3Data) {
      let datas = JSON.parse(fromHttp);
      // 只是通过点击编辑过来
      this.formData = {
        actTimes: [datas.onTime, datas.offTime],
        text: datas.remark
      };
      this.who = datas.operationRecordList;
    }
    // 如果编辑过页面，再回到这个页面，数据要继续赋上
    else if (step3Data) {
      this.formData = JSON.parse(step3Data);
      this.who = JSON.parse(sessionStorage.getItem("who"));
    }
  },
  methods: {
    reset() {
      this.formData = {
        actTimes: "",
        text: ""
      };
    },
    isOver(type) {
      sessionStorage.clear();
      if (type === "back") {
        sessionStorage.setItem("page", "活动列表");
        this.$router.push({ name: `activity_list` });
      } else {
        sessionStorage.setItem("page", "创建活动");
        this.$router.push({ name: `activity_create` });
      }
    },

    step(type) {
      if (type) {
        // 上一步
        sessionStorage.setItem("step3Data", JSON.stringify(this.formData));
        this.$router.push({ name: `activity_create_step2` });
      } else {
        // 下一步
        this.$refs.formData.validate(valid => {
          if (valid) {
            let step1 = JSON.parse(sessionStorage.getItem("step1Data"));
            let step2 = JSON.parse(sessionStorage.getItem("step2Data"));
            let step3 = this.formData;

            let httpType = "";
            let obj = {};
            let fromHttp = sessionStorage.getItem("fromHttp");

            if (fromHttp) {
              // 编辑
              obj.activityNo = step1.activityNo;
              obj.id = step1.id;
              httpType = "put";

              // 弹窗
              let arr1 = [];
              if (step2.tanchuanForm.length > 0) {
                step2.tanchuanForm.forEach(item => {
                  let obj = {
                    id: item.id
                  };
                  if (item.urlImg) {
                    obj.picture = item.urlImg;
                  }
                  if (item.jumpUrlText) {
                    obj.link = item.jumpUrlText;
                  }

                  if (item.unLogin) {
                    item.noNeed.forEach(tar => {
                      let objs = {
                        id: tar.id,
                        need: "NONEED",
                        memberType: tar.value
                      };
                      if (!obj.detailDtoList) {
                        obj.detailDtoList = [];
                      }
                      obj.detailDtoList.push(objs);
                    });
                  }
                  if (item.hanLogin) {
                    item.hanLoginSelect.forEach(tar => {
                      let objs = {
                        id: tar.id,
                        need: "NEED",
                        memberType: tar.value
                      };
                      if (!obj.detailDtoList) {
                        obj.detailDtoList = [];
                      }
                      obj.detailDtoList.push(objs);
                    });
                  }
                  arr1.push(obj);
                });
              }
              let arr2 = [];
              if (step2.shareForm.length > 0) {
                step2.shareForm.forEach(item => {
                  let obj = {
                    type: item.shareWay,
                    title: item.title,
                    content: item.text
                  };
                  if (item.urlImg) {
                    obj.picture = item.urlImg;
                  }
                  if (item.jumpUrlText) {
                    obj.link = item.jumpUrlText;
                  }
                  arr2.push(obj);
                });
              }
              obj = {
                id: step1.id,
                activityNo: step1.activityNo, // 活动编号
                activityName: step1.activityName, // 活动名称
                startTime: new Date(step1.time[0]).getTime(), // 开始时间
                endTime: new Date(step1.time[1]).getTime(), // 结束时间
                description: step1.description, // 活动规则说明
                link: step1.link, // 活动链接
                platformType: step2.showWay, // 渠道显示
                remark: step3.text, // 备注
                onTime: new Date(step3.actTimes[0]).getTime(), // 启动时间
                offTime: new Date(step3.actTimes[1]).getTime(), // 关闭时间
                popupList: arr1, // 活动弹窗显示列表
                shareList: arr2, // 活动分享显示列表
                awardList: step1.awardList // 活动奖励显示列表
              };
            } else {
              // 新建
              httpType = "post";
              // 弹窗
              let arr1 = [];
              if (step2.tanchuanForm.length > 0) {
                step2.tanchuanForm.forEach(item => {
                  let obj = {};
                  if (item.urlImg) {
                    obj.picture = item.urlImg;
                  }
                  if (item.jumpUrlText) {
                    obj.link = item.jumpUrlText;
                  }

                  if (item.unLogin) {
                    item.noNeed.forEach(tar => {
                      let objs = {
                        needLogin: "NONEED",
                        memberType: tar.value
                      };
                      if (!obj.detailDtoList) {
                        obj.detailDtoList = [];
                      }
                      obj.detailDtoList.push(objs);
                    });
                  }
                  if (item.login) {
                    item.need.forEach(tar => {
                      let objs = {
                        needLogin: "NEED",
                        memberType: tar.value
                      };
                      if (!obj.detailDtoList) {
                        obj.detailDtoList = [];
                      }
                      obj.detailDtoList.push(objs);
                    });
                  }
                  arr1.push(obj);
                });
              }
              // 分享页

              let arr2 = [];
              if (step2.shareForm.length > 0) {
                step2.shareForm.forEach(item => {
                  let obj = {
                    type: item.shareWay,
                    title: item.title,
                    content: item.text
                  };
                  if (item.urlImg) {
                    obj.picture = item.urlImg;
                  }
                  if (item.jumpUrlText) {
                    obj.link = item.jumpUrlText;
                  }
                  arr2.push(obj);
                });
              }

              obj = {
                activityNo: "",
                activityName: step1.activityName,
                startTime: new Date(step1.time[0]).getTime(),
                endTime: new Date(step1.time[1]).getTime(),
                description: step1.description,
                link: step1.link,
                platformType: step2.showWay,
                remark: step3.text,
                onTime: new Date(step3.actTimes[0]).getTime(),
                offTime: new Date(step3.actTimes[1]).getTime(),
                popupList: arr1,
                shareList: arr2,
                awardList: step1.awardList
              };
            }
            this.isSaveIng = true;
            this.$api
              .market_create_upFinalData({
                vm: this,
                method: httpType,
                data: obj
              })
              .then(res => {
                this.isSaveIng = false;
                if (res) {
                  this.isOk = true;
                }
              });
          }
        });
      }
    }
  }
};
</script>

<style scoped='true' lang="scss">
.formWaper {
  width: 50%;
  min-width: 400px;
  padding: 20px;
  margin: 0 auto;
  margin-left: 20%;
}
.buttons {
  display: flex;
  justify-content: space-between;
  margin: 20px auto;
  padding-left: 60px;
  width: 60%;
}
</style>
