<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
    </div>

    <div id="forTable" style="background:#fff;">
      <newsManager :success.sync="success" @save="save" />
    </div>
  </div>
</template>

<script>
import newsManager from "../../../components/newsManager";
import { news_manger_add } from "../../../api/setting_use";

export default {
  components: {
    newsManager
  },
  data() {
    return {
      env: null,

      pageName: "", //页面名称
      success: false
    };
  },
  mounted() {
    this.env = sessionStorage.getItem("env") === "development";

    this.pageName = this.$route.name;
  },
  methods: {
    save(data) {
      news_manger_add(data).then(res => {
        if (res && res.success) {
          this.success = true;
          this.$router.push(`/home/setting/news-manage/list`);
        }
      });
    }
  }
};
</script>

<style>
</style>
