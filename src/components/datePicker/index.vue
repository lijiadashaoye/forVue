<template>
    <div class="datePicker">
        <span>{{title}}：</span>
        <el-date-picker
        v-model="Val"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="~"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="Timeopt"
        @change="selectTime">
        </el-date-picker>
    </div>
</template>

<script>
export default {
    name:'datePicker',
    props:['title'],
    data(){
        return {
            Timeopt: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                    }
                }]
            },
            Val: ""
        }
    },
    methods: {
        selectTime() {
            this.$emit('timeSearch',this.Val)
        }
    }
}
</script>

<style scoped='true' lang="scss">
    .datePicker{
        flex:1;
        display:flex;
        align-items: center;
        padding:10px;
        box-sizing:border-box;
        span{
            width:120px;
        }
        .el-range-editor{
            width:40%;
        }
    }
</style>
