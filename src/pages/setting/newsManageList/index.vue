<template>
     <div class="componentWaper">
    <div id="forHeader">
      <h3>{{pageName}}</h3>
      <div class="newsAdd">
        <div class="addBtn">
            <el-button
            type="primary"
            size="mini"
            @click="addNews('ORDINARY_NEWS')"
            >
            新增普通新闻
            </el-button>
            <el-button
            type="primary"
            size="mini"
            @click="addNews('SOFT_NEWS')"
            >
            新增软广告新闻
            </el-button>
        </div>
        <div class="search">
            <el-input
                placeholder="请输入新闻标题"
                prefix-icon="el-icon-search"
                v-model="newsTitSearch"
                @change="search">
            </el-input>
            <el-button type="success" size="mini">查询</el-button>
        </div>
        
      </div>
    </div>

    <div id="forTable">
      <isTable
      :inputData="this.$store.state.newsManager.newsMangerList"
      @tableEmit='tableEmit'/>
    </div>

     <!-- 修改/详情信息的dialog -->
    <el-dialog :close-on-click-modal='false' :visible.sync="dialogFormVisible">
      
    </el-dialog>

    <!-- 软广告新闻弹窗 -->
    <el-dialog title="新增软广告新闻" :visible.sync="softNewsVisible" :close-on-click-modal="false">
        <el-form :model="softNewsForm" label-position="left" label-width="120px" :rules="rules" ref="ruleForm" class="newsForm">
            <el-form-item label="标题" prop="newsTitle">
                <el-input v-model="softNewsForm.newsTitle" placeholder="请输入新闻标题"></el-input>
            </el-form-item>

            <el-form-item label="位图" prop="newsImageUrl" class="itemImg">
                <el-upload
                    class="avatar-uploader"
                    action="customize"
                    :show-file-list="false"
                    :http-request="upload"
                >
                    <img v-if="softNewsForm.newsImageUrl" :src="softNewsForm.newsImageUrl" class="avatar">
                    <el-button v-else>选择图片</el-button>
                </el-upload>
            </el-form-item>

            <el-form-item label="初始访问量" prop="visitNumber">
                <el-input v-model="softNewsForm.visitNumber" placeholder="请输入初始访问量" type="number"></el-input>
            </el-form-item>

            <el-form-item label="新闻开始时间" prop="startTime">
                <el-date-picker
                    v-model="softNewsForm.startTime"
                    type="datetime"
                    :placeholder="new Date().toLocaleDateString() +' '+ ' '+ new Date().toLocaleTimeString()"
                ></el-date-picker>
            </el-form-item>

            <el-form-item label="新闻结束时间" prop="startTime">
                <el-date-picker
                    v-model="softNewsForm.endTime"
                    type="datetime"
                    :placeholder="new Date().toLocaleDateString() +' '+ ' '+ new Date().toLocaleTimeString()"
                ></el-date-picker>
            </el-form-item>

            <el-form-item label="产品类型" prop="productType">
                <el-radio-group v-model="softNewsForm.productRelationListVo[0].productType">
                    <el-radio label="CURRENCY_FUND" class='radio'>货币基金</el-radio>
                    <el-radio label="FINANCING_PRODUCT" class='radio'>理财产品</el-radio>
                    <br/>
                    <el-radio label="PURE_DEPT_FUND" class='radio'>纯债基金</el-radio>
                    <el-radio label="DEPOSIT" class='radio'>存款产品</el-radio>
                </el-radio-group>
            </el-form-item>

            <!-- <el-form-item label="产品名称" prop="productName">
                <el-select v-model="softNewsForm.productRelationListVo[0].productName" placeholder="请选择">
                    <el-option
                    v-for="item in productNameOpt"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item> -->

        </el-form>

        <div slot="footer" class="dialog-footer formFoot" >
            <el-button @click="cancelAdd">取 消</el-button>
            <el-button type="primary" @click="send('ruleForm')">确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import isTable from '../../../components/isTable/isTable';
import { mapActions, mapMutations } from 'vuex';
import { upLoadImg, news_manger_add } from "../../../api/setting_use.js";

export default {
    components:{
        isTable,
    },
    data() {
        return {
            pageName: "",//页面名字
            dialogFormVisible: false,//弹框开关
            softNewsVisible: false,//软广告弹窗开关
            newsTitSearch: "",//搜索新闻标题
            softNewsForm: {
                newsType: '',//新闻类型
                newsTitle: '',//新闻标题
                newsImageUrl: '',//位图
                visitNumber: '',//初始访问量
                startTime: '',//开始时间
                endTime: '',//结束时间
                productRelationListVo:[{
                    productType: '',//产品类型
                    productName: '',//产品名称
                }]
            },
            productNameOpt:[], //产品名称列表
            rules: {
                newsTitle: [{ required: true, message: '请输入新闻标题', trigger: 'blur' }],
                newsImageUrl: [{ required: true, message: '请选择图片', trigger: 'blur' }],
                visitNumber: [{ required: true, message: '请输入初始访问量', trigger: 'blur' }],
                startTime: [{required: true, message: '请选择日期和时间', trigger: 'change'}],
                productType: [{required: true, message: '请选择产品类型', trigger: 'change'}],
                fproductName: [{required: true, message: '请选择产品名称', trigger: 'change'}]
            }
        }
    },
    mounted() {
        this.pageName = this.$route.name;
        this.userDo();
        this.getList();
        this.$store.state.newsManager.newsMangerList.data.title = [
            {
                title: "新闻标题",
                key: "newsTitle",
                minWidth: "120",
            },{
                title: "新闻类型",
                key: "newsTypeCN",
                minWidth: "120",
            },{
                title: "标记",
                key: "signCN",
                minWidth: "120",
            },{
                title: "摘要",
                key: "summary",
                minWidth: "160",
            }
        ]
    },
    methods: {
        ...mapMutations({
            userDo: 'newsManager/userDo'
        }),
        ...mapActions({
            getList: 'newsManager/getList'
        }),
        //点击新增
        addNews(data) {
            let jurisdiction = JSON.parse(localStorage.getItem("buttenpremissions"));
            //有权限  跳转到创建页面
            if (jurisdiction.indexOf("news_manage_add") > -1) {
                if(data == 'ORDINARY_NEWS'){
                    this.$router.push(`/home/setting/news-manage/add`);
                } else if(data == 'SOFT_NEWS') {
                    this.softNewsForm.newsType = 'SOFT_NEWS'
                    this.softNewsVisible = true;
                }
            } else {
                //弹出消息提示用户
                this.$alert("您没有这个权限", {
                    confirmButtonText: "确定"
                });
            }
        },
        //图片上传
        upload(params) {
            const _file = params.file;
            const isLt5M = _file.size / 1024 / 1024 < 5;
            var formData = new FormData();
            formData.append("file", _file);
            if (!isLt5M) {
                this.$message.error("请上传5M以下的图片");
                return false;
            }
            upLoadImg(formData).then(res => {
                if (res.success) {
                this.softNewsForm.newsImageUrl = this.$ImgBaseUrl + res.data;
                }
            });
        },
        //取消添加软广告
        cancelAdd() {

        },
        //确认添加软广告
        send(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.softNewsForm.startTime = this.softNewsForm.startTime.getTime()
                    this.softNewsForm.endTime = this.softNewsForm.endTime.getTime()
                    // console.log(this.softNewsForm)
                    news_manger_add(this.softNewsForm).then(res => {
                        if(res){
                            this.softNewsVisible = false;
                            this.getList();
                        }
                    })
                } else {
                    return false;
                }
            });
        },
        // 监听表格的操作
        tableEmit(data) {
            switch (data.type) {
                case "regetData": // 分页的emit
                //再次请求列表数据
                // this.getProtocolListData({
                //     pageNum: this.$store.state.protocol.protocolList.pageNum,
                //     pageSize: this.$store.state.protocol.protocolList.pageSize
                // });
                break;
                case "edit": // 编辑按钮
                // this.edit(data.data);
                break;
                case "delete": // 删除按钮
                // this.delete(data.data.id);
                break;
                case "detail": // 详情
                // this.detail(data.data);
                break;
            }
        },
        search() {

        }
    }
}
</script>

<style scoped='true' lang="scss">
.newsAdd {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  box-sizing: border-box;
  align-items: center;
  .addBtn{
      display: flex;
      flex-wrap: nowrap;
  }
  .search {
    width: 300px;
    display: flex;
    justify-content: space-between;
    .el-input{
        width:200px;
    }
  }
}
.radio{
    margin:4px 4px;
}
.newsForm{
    width:100%;
    .el-input{
        width:220px;
    }
}
.itemImg{
    img{
        width:120px;
        height:120px;
    }
}
.formFoot{
    text-align: center;
}
</style>
