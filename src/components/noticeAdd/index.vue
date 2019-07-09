<template>
    <el-card class="box-card">

        <div class="card-item">
            <span class="item-text">*APP标识:</span>
            <div class="item-input">
                <el-radio-group v-model="appChannelCode">
                    <el-radio v-for="(val,ind) in appChannel" :key="ind" :label="val.label">{{val.value}}</el-radio>
                </el-radio-group>
            </div>
        </div>

        <div class="card-item quill">
            <span class="item-text">*内容:</span>
            <div class="item-input input-quill">
                <el-input
                    type="textarea"
                    :autosize="{ minRows: 6, maxRows: 6}"
                    placeholder="请输入内容"
                    v-model="content">
                </el-input>
            </div>
        </div> 

        <div class="card-item">
            <span class="item-text">*系统:</span>
            <div class="item-input">
                <el-radio-group v-model="platformCode">
                    <el-radio :label="'ios'">苹果</el-radio>
                    <el-radio :label="'android'">安卓</el-radio>
                </el-radio-group>
            </div>
        </div>

        <div class="card-item">
            <span class="item-text">*公告时间:</span>
            <div class="item-input">
                <el-date-picker
                    v-model="noticeTime"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </div>
        </div>

        <div class="card-item">
            <span class="item-text">*排序值:</span>
            <div class="item-input">
                <el-input v-model="sort" type="number" placeholder="只允许填入数字"></el-input>
            </div>
        </div>

        <div class="card-footer">
            <el-button @click="cancel">取消</el-button>
            <el-button @click="save">保存</el-button>
        </div>

    </el-card>
</template>

<script>
export default {
    props: ['updata', 'params', 'appChannel'],
    data() {
        return {
            pageName: '',
            id: '',
            content: '',//内容
            appChannelCode: '',//app标识
            platformCode: '',//项目标识
            appChannelName: '',//app名称
            platformName: '',//app标识
            sort: '',//排序值
            noticeTime: [],
        }
    },
    mounted() {
        this.pageName = this.$route.name;
        if(this.params) {
            this.id = this.params.id;
            this.content = this.params.content;
            this.appChannelCode = this.params.appChannelCode;
            this.platformCode = this.params.platformCode;
            this.sort = this.params.sort;
            this.noticeTime = [this.params.startTime,this.params.endTime]
        } else {
            this.id = '';
            this.content = '';
            this.appChannelCode = '';
            this.platformCode = '';
            this.sort = '';
            this.noticeTime = [];
        }
    }, 
    methods: {
        //点击取消
        cancel() {
            this.id = '';
            this.content = '';
            this.appChannelCode = '';
            this.platformCode = '';
            this.sort = '';
            this.noticeTime = [];
            this.$emit('cancel')
        },
        //点击保存
        save() {
            if(this.appChannelCode && this.platformCode && this.sort && this.noticeTime && this.content) {
                    //  渠道
                this.appChannel.forEach(v=> {
                    if(this.appChannelCode == v.label){
                        this.appChannelName = v.value
                    }
                })
                //平台
                if(this.platformCode === 'android') {
                    this.platformName = '安卓'
                } else if(this.platformCode === 'ios') {
                    this.platformName = '苹果'
                }
                let obj = {
                    id: this.id,
                    content: this.content,
                    appChannelName: this.appChannelName,
                    platformCode: this.platformCode,
                    appChannelCode: this.appChannelCode,
                    platformName: this.platformName,
                    startTime: new Date(this.noticeTime[0]).getTime(),
                    endTime: new Date(this.noticeTime[1]).getTime(),
                    sort: this.sort
                }
                this.$emit('send',obj)
            } else {
                this.$alert('*号是必填项', '提交失败', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.$message({
                        type: 'info',
                        message: `action: ${ action }`
                        });
                    }
                })
            }
        }
    },
    watch: {
        'params.id'() {
            this.id = this.params.id;
            this.content = this.params.content;
            this.appChannelCode = this.params.appChannelCode;
            this.platformCode = this.params.platformCode;
            this.sort = this.params.sort;
            this.noticeTime = [this.params.startTime,this.params.endTime]
        }
    }
}
</script>

<style lang='scss' scoped>
.box-card{
    box-shadow:0 0 0 0 !important;
    border:0;
}
.card-item{
    width:100%;
    // height:60px;
    padding:10px;
    box-sizing:border-box;
    display:flex;
    align-items: center;
    .item-text{
        width:200px;
    }
    .input-quill{
        width:500px;
    }
    .item-input{
        width:400px;
        .msg{
            width:100%;
            padding:10px;
            color:red;
        }
        .el-select{
            width:100%;
        }
    }
    .item-color{
        display:flex;
    }
    .item-img{
        width:100px;
        height:80px;
        display:flex;
        align-items: center;
        img{
            width:80px;
            height:80px;
        }
    }
}
.quill{
    height:auto;
}
.card-img{
    height:auto;
    .item-img{
        width:auto;
        height:auto;
        display:flex;
        align-items: center;
        padding:10px 0;
        box-sizing:border-box;
        img{
            width:100%;
            height:auto;
        }
    }
}
.card-textarea{
  height:auto;
}
.card-footer{
    width:100%;
    display:flex;
    justify-content: center;
    height:100px;
    align-items: center;
}
</style>
