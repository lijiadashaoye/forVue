<template>
  <quill-editor @change="changeFn" :options="editorOption" v-model="valueD" ref="refXingJi"></quill-editor>
</template>
<script>
export default {
  props: {
    url: String,
    values: String,
    video: Boolean
  },
  model: {
    prop: "values",
    event: "toEmit"
  },
  data() {
    const toolbarOptions = [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction
      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],
      ["link", "image"]
    ];
    if (this.video) {
      toolbarOptions.push(["video"]);
    }
    const thisVue = this;
    return {
      valueD: "",
      editorOption: {
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: {
              image: function(value) {
                if (value) {
                  let inputs = document.createElement("input");
                  inputs.setAttribute("type", "file");
                  inputs.click();
                  inputs.onchange = event => {
                    let data = event.path[0].files[0];
                    let type1 = String(data.type.split("/")[0]).toLowerCase();
                    let type2 = String(data.type.split("/")[1]).toLowerCase();

                    if (type1 === "image") {
                      let isLt2M = data.size / 1024 / 1024 > 2;
                      if (isLt2M) {
                        thisVue.$message.error("图片不能大于 2M");
                      } else if (
                        type2 == "png" ||
                        type2 == "jpeg" ||
                        type2 == "jpg" ||
                        type2 == "gif"
                      ) {
                        let formData = new FormData();
                        formData.append("file", data);
                        let refXingJi = thisVue.$refs.refXingJi.quill;
                        let zuobiao = refXingJi.selection.savedRange.index;

                        // 执行上传
                        thisVue.$api
                          .UPImg({
                            vm: thisVue,
                            data: formData,
                            url: thisVue.url
                          })
                          .then(res => {
                            if (res) {
                              let url = res.data; // 服务器返回的图片 url
                              refXingJi.insertEmbed(
                                zuobiao,
                                "image",
                                thisVue.$ImgBaseUrl + url,
                              );
                              refXingJi.setSelection(zuobiao + 1);
                              thisVue.$emit("toEmit", thisVue.valueD);
                            } else {
                              thisVue.$message.error(res.message);
                            }
                          });
                      } else {
                        thisVue.$message.error(
                          "请使用 png/jpeg/jpg/gif 类型图片！"
                        );
                      }
                    } else {
                      thisVue.$message.error("请选择图片类型文件！");
                    }
                  };
                } else {
                  thisVue.quill.format("image", false);
                }
              }
            }
          }
        }
      }
    };
  },
  created() {
    this.valueD = this.values;
  },
  methods: {
    changeFn() {
      this.$emit("toEmit", this.valueD);
    }
  },
  watch: {
    'values'() {
      this.valueD = this.values;
    }
  }
};
</script>
<style lang="scss" scoped>
.ql-snow .ql-editor img {
  width:100%!important;
}
</style>
