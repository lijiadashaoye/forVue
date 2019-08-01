<template>
    <div class="componentWaper">
    <div id="forHeader">
      <h3>
        {{pageName}}
      </h3>
    </div>

    <div id="forTable">
     <newsManager
     :success.sync='success'
     @save="save"/>
    </div>
  </div>
</template>

<script>
import newsManager from '../../../components/newsManager';
import { news_manger_add } from '../../../api/setting_use';

export default {
  components: {
    newsManager
  },
  data() {
      return {
          pageName: "",//页面名称
          success: false
      }
  },
  mounted() {
      this.pageName = this.$route.name;
  },
  methods: {
    save(data) {
      news_manger_add(data).then(res=> {
        if(res && res.success) {
          this.success = true;
          this.$router.push(`/home/setting/news-manage/list`)
        }
      })
    }
  }
}
</script>

<style>

</style>
