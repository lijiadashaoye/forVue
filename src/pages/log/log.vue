<template>
    <div>
        <router-view></router-view>
    </div>
</template>
<script>
import devicePosition from '../../stores/log/devicePosition';//log 设备定位
import pointLocation from '../../stores/log/pointLocation';//log 点位
    export default {
        props: {},
        data() {
            return {
                pageName: "" // 当前页面名字
            };
        },
        created() {
            this.$store.registerModule('devicePosition', devicePosition);
            this.$store.registerModule('pointLocation', pointLocation);
        },
        beforeDestroy() {
            this.$store.unregisterModule('devicePosition');
            this.$store.unregisterModule('pointLocation');
        },
        methods: {}
    };
</script>

<style scoped='true' lang="scss">

</style>
