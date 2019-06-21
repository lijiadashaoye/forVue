<template>
    <el-card class="box-card">
        <!-- 产品类型 -->
        <div slot="header" class="clearfix">
            <!-- 收益日期 -->
            <div class="product-item">
                <span class="item-name">*收益日期:</span>
                <el-date-picker
                    type="date"
                    v-model="rateDate"
                    placeholder="选择日期">
                </el-date-picker>
            </div>
         
            <div class="product-item">
                <span class="item-name">*七日年化:</span>
                <el-input
                    placeholder="请输入内容"
                    v-model="onThe7thOfTheYearYield"
                    type="number"
                    clearable>
                </el-input>
            </div>

            <div class="product-item">
                <span class="item-name">*万份收益:</span>
                <el-input
                    placeholder="请输入内容"
                    v-model="thousandsOfYearsYields"
                    type="number"
                    clearable>
                </el-input>
            </div>

            <div class="product-bottom">
                <el-button @click="save">保存</el-button>
                <el-button>取消</el-button>
            </div>
        </div>
    </el-card>
</template>

<script>
export default {
    name:'yuebaoAddorUpt',
    props:['options'],
    data() {
        return {
            rateDate: new Date(),
            onThe7thOfTheYearYield: "",
            thousandsOfYearsYields: ""
        }
    },
    mounted(){
        if(this.options){
            this.rateDate = this.options.rateDate;
            this.onThe7thOfTheYearYield = this.options.onThe7thOfTheYearYield;
            this.thousandsOfYearsYields = this.options.thousandsOfYearsYields;
        }
    },
    methods:{
        save(){
            if(this.rateDate && this.onThe7thOfTheYearYield && this.thousandsOfYearsYields){
                let obj = {
                    id:this.options ? this.options.id : '',
                    rateDate : this.rateDate,
                    onThe7thOfTheYearYield : this.onThe7thOfTheYearYield,
                    thousandsOfYearsYields : this.thousandsOfYearsYields
                }
                //向父组件传递 obj  父组件发送请求
                this.$emit('reqest',obj)
            }else{
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
        'options.rateDate'(){
           this.rateDate = this.options.rateDate;
        },
        'options.onThe7thOfTheYearYield'(){
            this.onThe7thOfTheYearYield = this.options.onThe7thOfTheYearYield;
        },
        'options.thousandsOfYearsYields'(){
            this.thousandsOfYearsYields = this.options.thousandsOfYearsYields;
        }
    }
}
</script>

<style lang="scss">
.product-item{
    width:100%;
    padding:20px;
    display:flex;
    box-sizing:border-box;
    .item-name{
      width:200px;
      margin-right: 20px;
    }
    .el-input{
        width:220px;
    }
}



.product-bottom{
    width:60%;
    margin-top:50px;
    text-align: center;
}
</style>
