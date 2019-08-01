<template>
    <div>
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        props: {},
        data() {
            return {
                pageName: "" // 当前页面名字
            };
        },
        created() {

        },

        methods: {}
    };
</script>

<style scoped='true' lang="scss">

</style>
