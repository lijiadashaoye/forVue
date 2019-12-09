<template>
  <router-view></router-view>
</template>

<script>
import topProduct from '../../stores/product/topProduct'; //榜单置顶
import promptMsg from '../../stores/product/promptMsg';
export default {
    data() {
        return {

        }
    },
    created() {
        this.$store.registerModule('topProduct', topProduct);
        this.$store.registerModule('promptMsg', promptMsg);
    },
    beforeDestroy() {
        this.$store.unregisterModule('topProduct');
        this.$store.unregisterModule('promptMsg');
    }
}
</script>