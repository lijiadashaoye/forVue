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

        <div class="card-item">
            <span class="item-text">*平台:</span>
            <div class="item-input">
                <el-radio-group v-model="platformCode">
                    <el-radio :label="'ios'">苹果</el-radio>
                    <el-radio :label="'android'">安卓</el-radio>
                </el-radio-group>
            </div>
        </div>

        <div class="card-item">
            <span class="item-text">*版本号:</span>
            <div class="item-input">
                <el-input v-model="versionNo" placeholder="只允许填入整数"></el-input>
            </div>
        </div> 

        <div class="card-item">
            <span class="item-text">*期限名称:</span>
            <div class="item-input">
                <el-input v-model="peroidName" placeholder="请输入期限名称"></el-input>
            </div>
        </div> 

        <div class="card-item">
            <span class="item-text">*期限编号:</span>
            <div class="item-input">
                <el-input v-model="peroidCode" placeholder="请输入期限编号"></el-input>
            </div>
        </div> 

        <div class="card-item">
            <span class="item-text">*期限类型:</span>
            <div class="item-input">
                <el-radio-group v-model="peroidType">
                    <el-radio :label="'PETTY'">小额</el-radio>
                    <el-radio :label="'FINANCING'">理财</el-radio>
                </el-radio-group>
            </div>
        </div>

        <div class="card-item">
            <span class="item-text">*显示类型:</span>
            <div class="item-input">
                <el-radio-group v-model="showType">
                    <el-radio :label="'TABLE'">表格</el-radio>
                    <el-radio :label="'PORTRAIT'">竖版</el-radio>
                </el-radio-group>
            </div>
        </div>

        <div class="card-item">
            <span class="item-text">*开始天:</span>
            <div class="item-input">
                <el-input v-model="startDay" min=0 type="number" placeholder="只允许填入数字"></el-input>
            </div>
        </div>

        <div class="card-item">
            <span class="item-text">*结束天:</span>
            <div class="item-input">
                <el-input v-model="endDay" min=0 type="number" placeholder="只允许填入数字"></el-input>
            </div>
        </div>

        <div class="card-item">
            <span class="item-text">*排序值:</span>
            <div class="item-input">
                <el-input v-model="sort" min=0 type="number" placeholder="只允许填入数字"></el-input>
            </div>
        </div>

        <div class="card-item">
            <span class="item-text">*每页条数:</span>
            <div class="item-input">
                <el-input v-model="indexPageSize" min=0 type="number" placeholder="只允许填入数字"></el-input>
            </div>
        </div>

        <div class="card-item">
            <span class="item-text">*总条数:</span>
            <div class="item-input">
                <el-input v-model="total" min=0 type="number" placeholder="只允许填入数字"></el-input>
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
    props: ['appChannel', 'params'],
    data() {
        return {
            pageName: '',
            id: '',
            appChannelCode: '',//app标识
            appChannelName: '',//app名字
            versionNo: '',//版本号
            peroidCode: '',//期限编号
            peroidName: '',//期限名称
            peroidType: '',//期限类型
            startDay: '',//开始天
            endDay: '',//结束天
            sort: '',//排序值
            indexPageSize: '',//每页限制条数
            total: '',//总条数
            showType: '',//显示类型
            platformCode: '',//平台
            platformName: '',
        }
    },
    mounted() {
        this.pageName = this.$route.name;
        if(this.params) {
            this.id = this.params.id;
            this.platformCode = this.params.platformCode;
            this.appChannelCode = this.params.appChannelCode;
            this.versionNo = this.params.versionNo;
            this.peroidCode = this.params.peroidCode;
            this.peroidName = this.params.peroidName;
            this.peroidType = this.params.peroidType;
            this.startDay = this.params.startDay;
            this.endDay = this.params.endDay;
            this.sort = this.params.sort;
            this.indexPageSize = this.params.indexPageSize;
            this.total = this.params.total;
            this.showType = this.params.showType;
        }
    },
    methods: {
        //点击取消
        cancel() {

        },
        //点击保存
        save() {
            if(this.appChannelCode && this.versionNo && this.peroidCode &&this.peroidName && this.peroidType && this.startDay && this.endDay && this.sort && this.sort && this.indexPageSize && this.total && this.showType && this.platformCode) {
                    //渠道
                this.appChannel.forEach(v=> {
                    if(this.appChannelCode == v.label){
                        this.appChannelName = v.value
                    }
                })
                if(this.platformCode == "ios") {
                    this.platformName = "苹果"
                } else if(this.platformCode == "android") {
                    this.platformName = "安卓"
                }
                let obj = {
                    id: this.id,
                    platformCode: this.platformCode,
                    platformName: this.platformName,
                    appChannelCode: this.appChannelCode,
                    appChannelName: this.appChannelName,
                    versionNo: this.versionNo,
                    peroidCode: this.peroidCode,
                    peroidName: this.peroidName,
                    peroidType: this.peroidType,
                    startDay: this.startDay,
                    endDay: this.endDay,
                    sort: this.sort,
                    indexPageSize: this.indexPageSize,
                    total: this.total,
                    showType: this.showType
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
            this.platformCode = this.params.platformCode;
            this.appChannelCode = this.params.appChannelCode;
            this.versionNo = this.params.versionNo;
            this.peroidCode = this.params.peroidCode;
            this.peroidName = this.params.peroidName;
            this.peroidType = this.params.peroidType;
            this.startDay = this.params.startDay;
            this.endDay = this.params.endDay;
            this.sort = this.params.sort;
            this.indexPageSize = this.params.indexPageSize;
            this.total = this.params.total;
            this.showType = this.params.showType;
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
    height:60px;
    padding:10px;
    box-sizing:border-box;
    display:flex;
    align-items: center;
    .item-text{
        width:200px;
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
