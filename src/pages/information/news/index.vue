<template>
    <div class="componentWaper">
        <div id="forHeader">
            <p class="isPageName">
                <span :class="env?'lineSpan1':'lineSpan'">|</span>
                位置：{{$store.state.for_layout.titles}}{{pageName}}
            </p>
        </div>
        <div id="forTable">

        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                pageName: '',
                env: null,
            }
        },
        mounted() {
            this.pageName = this.$route.name
        },
        methods: {

        }
    }
</script>

<style>

</style>