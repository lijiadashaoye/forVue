<template>
    <div class="componentWaper">
    <div id="forHeader">
      <h3>
        {{pageName}}
      </h3>
    </div>

    <div id="forTable">
     <newsManager/>
    </div>
  </div>
</template>

<script>
import newsManager from '../../../components/newsManager';


export default {
  components: {
    newsManager
  },
  data() {
      return {
          pageName: "",//页面名称
      }
  },
  mounted() {
      this.pageName = this.$route.name;
  },
  methods: {

  }
}
</script>

<style>

</style>
