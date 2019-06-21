<template>
  <div class="upImgWaper">
    <span
      class="uping"
      v-if="uping"
    >上传中...</span>
    <span
      @click="deleteImg"
      title='删除图片'
      class="myIcon20px icon-49shurushanchu-1 toDelete"
    ></span>
    <div
      class="showImg"
      @click="upImg"
      title='添加图片'
    >
      <img
        v-if="imgSrc"
        :src="imgSrc"
        class="isImg"
      >
      <div v-else>
        <p
          style="text-align:center"
          class="myIcon20px icon-add isIcon"
        >
        </p>
        <p>选择图片</p>
        <p>小于2M</p>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  props: { datas: Object },
  data() {
    return {
      imgSrc: "",
      uping: false
    };
  },
  mounted() {
    if (this.datas.imgUrl) {
      this.imgSrc = this.$ImgBaseUrl + this.datas.imgUrl;
    }
  },
  methods: {
    deleteImg() {
      // 删除图片
      this.imgSrc = "";
      this.$emit("selectImg", {
        url: "",
        base64: this.imgSrc
      });
    },
    // 执行上传，并生成本地预览
    upImg() {
      let inputs = document.createElement("input");
      inputs.setAttribute("type", "file");
      inputs.click();
      inputs.onchange = event => {
        let data = event.path[0].files[0];
        if (data.type.split("/")[0] === "image") {
          let isLt2M = data.size / 1024 / 1024 > 2;
          if (isLt2M) {
            this.$message.error("图片不能大于 2M");
          } else {
            this.uping = true;
            let formData = new FormData();
            formData.append("file", data);
            let ok = false;
            // 设置超时
            setTimeout(() => {
              if (!ok) {
                this.uping = false;
              }
            }, 6000);
            // 执行上传
            this.$api
              .UPImg({
                vm: this,
                data: formData,
                url: this.datas.url
              })
              .then(res => {
                ok = res.success;
                if (ok) {
                  let reader = new FileReader(); // 生成本地预览
                  reader.readAsDataURL(data);
                  reader.onload = event2 => {
                    this.uping = false;
                    this.imgSrc = event2.target.result;
                    this.$emit("selectImg", {
                      url: res.data, // 服务器返回的图片 url
                      base64: this.imgSrc // 本地预览用的数据
                    });
                  };
                } else {
                  this.$message.error(res.message);
                  this.uping = false;
                }
              });
          }
        } else {
          this.$message.error("请选择图片类型文件！");
        }
      };
    }
  }
};
</script>

<style scoped='true' lang="scss">
.isImg {
  display: block;
  width: 100%;
  height: 100%;
}
.upImgWaper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgb(245, 245, 245);
  border-radius: 5px;
  position: relative;
}
.showImg {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}
.showImg > div > p:nth-of-type(2) {
  padding: 0;
  font-size: 16px;
  line-height: 16px;
  color: rgb(209, 206, 206);
  text-align: center;
}
.showImg > div > p:nth-of-type(3) {
  padding: 0;
  font-size: 12px;
  line-height: 16px;
  color: rgb(209, 206, 206);
  text-align: center;
}
.toDelete {
  position: absolute;
  top: -6px;
  right: -5px;
  z-index: 5;
}
.toDelete:hover {
  cursor: pointer;
  color: red;
}
.uping {
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  text-align: center;
  line-height: 100px;
  background: rgb(230, 228, 228);
  font-size: 14px;
  font-weight: bold;
  color: rgb(107, 103, 103);
}
</style>
