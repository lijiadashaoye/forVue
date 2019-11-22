<template>
  <router-view v-if="toShow"></router-view>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      toShow: false
    };
  },
  beforeMount() {
    this.checkDict();
  },
  created() {
    this.checkDict();

    
  },
  methods: {
    checkDict() {
      this.toShow = false;
      let dict = sessionStorage.getItem("dict");
      if (!dict) {
        this.$store.dispatch("get_dict", this).then(res => {
          sessionStorage.setItem("dict", JSON.stringify(res));
          this.toShow = true;
        });
      } else {
        this.toShow = true;
      }
    }
  }
};
</script>

