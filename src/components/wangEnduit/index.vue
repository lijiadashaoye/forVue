<template lang="html">
  <div class="editor">
    <div ref="toolbar" class="toolbar">
    </div>
    <div ref="editor" class="text" @click="getFoucs($event)">
    </div>
  </div>
</template>

<script>
import E from "wangeditor";

export default {
  name: "editoritem",
  data() {
    return {
      // uploadPath,
      editor: null,
      info_: null
    };
  },
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    isClear: {
      type: Boolean,
      default: false
    },
    url: String
  },
  watch: {
    isClear(val) {
      // 触发清除文本域内容
      if (val) {
        this.editor.txt.clear();
        this.info_ = null;
      }
    },
    value: function(value) {
      if (value !== this.editor.txt.html()) {
        this.editor.txt.html(this.value);
      }
    }
    //value为编辑框输入的内容，这里我监听了一下值，当父组件调用得时候，如果给value赋值了，子组件将会显示父组件赋给的值
  },
  mounted() {
    this.seteditor();
    this.editor.txt.html(this.value);
  },
  methods: {
    getFoucs(e) {
      let father = e.target.nodeName.toLowerCase() === "div";
      if (father) {
        e.target.children[0].focus();
      } else {
        e.target.focus();
      }
    },
    seteditor() {
      // http://192.168.2.125:8080/admin/storage/create
      this.editor = new E(this.$refs.toolbar, this.$refs.editor);
      this.editor.customConfig.uploadImgShowBase64 = false; // base 64 存储图片
      // this.editor.customConfig.uploadImgServer = 'https://develop-gateway.bicai365.com/admin/file/up/setting'// 配置服务器端地址
      this.editor.customConfig.uploadImgServer =
        "https://develop-gateway.bicai365.com/" + this.url;
      this.editor.customConfig.uploadImgHeaders = {
        Authorization: "Bearer " + sessionStorage.getItem("token")
      }; // 自定义 header
      this.editor.customConfig.uploadFileName = "file"; // 后端接受上传文件的参数名
      this.editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024; // 将图片大小限制为 2M
      this.editor.customConfig.uploadImgMaxLength = 6; // 限制一次最多上传 3 张图片
      this.editor.customConfig.uploadImgTimeout = 3 * 60 * 1000; // 设置超时时间

      // 配置菜单
      this.editor.customConfig.menus = [
        "head", // 标题
        "bold", // 粗体
        "fontSize", // 字号
        "fontName", // 字体
        "italic", // 斜体
        "underline", // 下划线
        "strikeThrough", // 删除线
        "foreColor", // 文字颜色
        "backColor", // 背景颜色
        "link", // 插入链接
        "list", // 列表
        "justify", // 对齐方式
        "quote", // 引用
        "emoticon", // 表情
        "image", // 插入图片
        "table", // 表格
        "video", // 插入视频
        "code", // 插入代码
        "undo", // 撤销
        "redo", // 重复
        "fullscreen" // 全屏
      ];

      this.editor.customConfig.uploadImgHooks = {
        fail: (xhr, editor, result) => {
          // 插入图片失败回调
        },
        success: (xhr, editor, result) => {
          // 图片上传成功回调
        },
        timeout: (xhr, editor) => {
          // 网络超时的回调
        },
        error: (xhr, editor) => {
          // 图片上传错误的回调
        },
        customInsert: (insertImg, result, editor) => {
          // 图片上传成功，插入图片的回调
          //result为上传图片成功的时候返回的数据，这里我打印了一下发现后台返回的是data：[{url:"路径的形式"},...]
          //insertImg()为插入图片的函数
          //循环插入图片
          if (result.success) {
            insertImg(this.$ImgBaseUrl + result.data);
          }
        }
      };
      this.editor.customConfig.onchange = html => {
        this.info_ = this.chec_content(html); // 绑定当前逐渐地值
        this.$emit("change", this.info_); // 将内容同步到父组件中
      };
      // 创建富文本编辑器
      this.editor.create();
    },
    chec_content(value) {
      let reg = /^\<p\>(&nbsp;(\s)?|\<br\>)+\<\/p\>$/g, // 判断只有一行数据时
        kk = reg.test(value),
        final = [];
      if (kk) {
        return "";
      } else {
        let str = value,
          arr = [],
          reg2 = /^\<p\>(.*?)\<\/p\>/g; // 多行数据拆分

        let digui = val => {
          str = val.replace(reg2, "");
          arr.push(val.match(reg2)[0]);
          if (str) {
            digui(str);
          }
        };
        digui(value);
        if (arr.length) {
          arr.forEach(str => {
            if (str.match(reg)) {
              final.push(reg.test(str.match(reg)[0]));
            } else {
              final.push(false);
            }
          });
        }
        if (final.every(t => t === true)) {
          return "";
        } else {
          return value;
        }
      }
    }
  }
};
</script>

<style lang="css">
.editor {
  width: 100%;
  position: relative;
  z-index: 0;
}
.toolbar {
  width: 100%;
  border: 1px solid #ccc;
  display: flex;
  flex-wrap: wrap;
}
.w-e-toolbar .w-e-menu {
  display: inline !important;
  z-index: inherit !important;
}
.w-e-toolbar .w-e-droplist {
  z-index: 10002 !important;
}
.text {
  border: 1px solid #ccc;
  min-height: 150px;
  max-height: 500px;
  overflow-y: auto;
  background: #fff;
}
</style>