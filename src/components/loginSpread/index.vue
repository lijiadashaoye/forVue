<template>
    <el-card class="box-card">

        <div class="card-item" v-if="flag">
            <span class="item-text">*选择App：</span>
            <div class="item-input">
                <el-radio-group v-model="appChannelCode">
                    <el-radio v-for="(val,ind) in appChannel" :key="ind" :label="val.label" :disabled="!updataFlag">{{val.value}}</el-radio>
                </el-radio-group>
            </div>
        </div>
        
        <div class="card-item">
            <span class="item-text">*推广内容:</span>
            <div class="item-input input-quill">
                <el-input
                    type="textarea"
                    :autosize="{ minRows: 6, maxRows: 6}"
                    placeholder="请输入推广内容"
                    v-model="spreadContent"
                    :disabled="detailFlag">
                </el-input>
            </div>
        </div>

        <div class="card-item">
            <span class="item-text">*内容显示字号:</span>
            <div class="item-input">
                <el-input type='number' v-model="fontSize" placeholder="请输入标题" :disabled="detailFlag"></el-input>
            </div>
        </div>

        <div class="card-item">
            <span class="item-text">*内容显示颜色:</span>
            <div class="item-input">
                <el-color-picker v-model="fontColor" :disabled="detailFlag"></el-color-picker>
            </div>
        </div>

        <div class="card-footer" v-if="!detailFlag">
            <el-button @click="cancel(false)">取消</el-button>
            <el-button type="primary" @click="save">保存</el-button>
        </div>

        <div class="card-footer" v-else>
            <el-button @click="close(false)">关闭</el-button>
        </div>
    </el-card>
</template>

<script>
export default {
    name:'loginSpread',
    props: [ 'appChannel', 'opts', 'updataFlag', 'detailFlag' ],
    data(){
        return {
            spreadContent: "",//推广内容
            fontSize: "",//显示字体大小
            fontColor: "",//显示字体颜色
            appChannelVal: "",//App渠道名称
            appChannelCode: "",
            flag: true
        }
    },
    mounted(){
        //加载时显示
        if(this.updataFlag){
            this.flag = false
        }else{
            this.flag = true
        }
        //更改  详情  传入初始化数据
        if(this.opts){
            this.spreadContent = this.opts.spreadContent;
            this.fontSize = this.opts.fontSize;
            this.fontColor = this.opts.fontColor;
            this.appChannelVal = this.opts.appChannelName
            this.appChannelCode = this.opts.appChannelCode
        }
            
    },
    methods:{
        //点击保存
        save(){
            if(this.spreadContent && this.fontSize && this.fontColor && this.appChannelCode){
                if(this.fontSize > 10000) {
                    this.$alert('显示字号不能大于10000', '提交失败', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'info',
                                message: `action: ${ action }`
                            });
                        }
                    })
                    return
                }
                this.appChannel && this.appChannel.forEach(v=> {
                    if(this.appChannelCode == v.label) {
                        this.appChannelVal = v.value;
                    }
                })
                //整理params
                let obj = {
                    id: this.opts ? this.opts.id : '',
                    appChannelCode: this.appChannelCode,
                    appChannelName: this.appChannelVal,
                    spreadContent: this.spreadContent,
                    fontSize: this.fontSize,
                    fontColor: this.fontColor
                }
                    
                //向父组件传递params
                this.$emit('req',obj)

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
        },

        //点击取消 数据回归初始化
        cancel(flag) {
            this.spreadContent = '';
            this.fontSize = '';
            this.fontColor = '';
            this.appChannelVal = '';
            this.appChannelCode = '';
            this.$emit('cancel',flag)
        },
 
        //点击关闭
        close(flag) {
           this.$emit('close',flag)
        }
    },
    watch: {//监听传入的参数变化   data变化
        'opts.id'(){
           this.spreadContent = this.opts.spreadContent;
            this.fontSize = this.opts.fontSize;
            this.fontColor = this.opts.fontColor;
            this.appChannelVal = this.opts.appChannelName
            this.appChannelCode = this.opts.appChannelCode
        }
    }

}
</script>

<style scoped="true" lang="scss">
    .card-item{
        width:100%;
        padding:10px;
        box-sizing:border-box;
        display:flex;
        .item-text{
            width:200px;
        }
        .item-input{
            width:400px;
        }
        .input-quill{
            width:500px;
        }
    }
    .card-footer{
        width:100%;
        display:flex;
        justify-content: center;
        height:100px;
        align-items: center;
    }
</style>

