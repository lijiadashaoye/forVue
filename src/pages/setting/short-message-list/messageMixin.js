export default {
    methods: {
        // 时间选择器发生改变时触发并拼接数组
        timeChange() {
            if (
                this.sendType &&
                this.ruleForm.selectTime &&
                this.ruleForm.sendTimeList.indexOf(this.ruleForm.selectTime) == -1
            ) {
                this.ruleForm.sendTimeList.push(this.ruleForm.selectTime);
            } else {
                this.$message({
                    message: "不能重复添加已经存在的时间",
                    type: "warning"
                });
            }
        },
        // 删除时间选项
        deleteTimeIndex(index) {
            this.ruleForm.sendTimeList.splice(index, 1);
            // 如果数组为空需要将中转数据也清空
            if (this.ruleForm.sendTimeList.length == 0) {
                this.ruleForm.selectTime = "";
            }
        },
    }
};