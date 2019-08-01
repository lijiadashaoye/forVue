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
                    size="mini"
                    clearable
                    @input="search">
                </el-input>
            </div>
        </div>
        <div class="searchForm">
            <el-form :inline="true" :model="searchForm" class="demo-form-inline">
                <el-form-item label="新闻开始时间">
                    <el-date-picker
                        v-model="searchForm.startTime"
                        type="datetime"
                        size="mini"
                        clearable
                        @change="startTimeSearch"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="新闻结束时间">
                    <el-date-picker
                        v-model="searchForm.endTime"
                        clearable
                        type="datetime"
                        size="mini"
                        @change="endTimeSearch"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
            </el-form>
        </div>
    </div>

    <div id="forTable">
      <isTable
      :inputData="this.$store.state.newsManager.newsMangerList"
      @tableEmit='tableEmit'/>
    </div>

     <!-- 修改/详情信息的dialog -->
    <div class="updata">
        <el-dialog :close-on-click-modal='false' :visible.sync="dialogFormVisible" :before-clos='closeDialog'>
        <newsManager
        :opts='opts'
        :success='success'
        @closeDialog='closeDialog'
        @save='save'/>
        </el-dialog>
    </div>

    <!-- 软广告新闻弹窗 -->
    <el-dialog :title="upDataSoft ? '修改软广告新闻' : '新增软广告新闻'" :visible.sync="softNewsVisible" :close-on-click-modal="false" >
        <el-form :model="softNewsForm" label-position="left" label-width="120px" :rules="rules" ref="ruleForm" class="newsForm">
            <el-form-item label="标题" prop="newsTitle" class="istopItem">
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
                    <div v-else>
                        <el-button>选择图片<br/><span style="font-size:12px;color:red">不能大于2M</span><br/><span style="font-size:12px;color:red">jpg/png/gif/jpeg格式</span></el-button>
                    </div>
                </el-upload>
            </el-form-item>

            <el-form-item label="初始访问量" prop="visitNumber" class="istopItem">
                <el-input v-model="softNewsForm.visitNumber" placeholder="请输入初始访问量" type="number"></el-input>
            </el-form-item>

            <el-form-item label="新闻开始时间" prop="startTime" class="istopItem">
                <el-date-picker
                    v-model="softNewsForm.startTime"
                    type="datetime"
                    :placeholder="new Date().toLocaleDateString() +' '+ ' '+ new Date().toLocaleTimeString()"
                ></el-date-picker>
            </el-form-item>

            <el-form-item label="新闻结束时间" prop="startTime" class="istopItem">
                <el-date-picker
                    v-model="softNewsForm.endTime"
                    type="datetime"
                    :placeholder="new Date().toLocaleDateString() +' '+ ' '+ new Date().toLocaleTimeString()"
                ></el-date-picker>
            </el-form-item>

            <!-- <el-form-item label="产品类型" prop="productType" class="istopItem">
                <el-radio-group v-model="softNewsForm.productRelationListVo[0].productType">
                    <el-radio label="CURRENCY_FUND" class='radio'>货币基金</el-radio>
                    <el-radio label="FINANCING_PRODUCT" class='radio'>理财产品</el-radio>
                    <br/>
                    <el-radio label="PURE_DEPT_FUND" class='radio'>纯债基金</el-radio>
                    <el-radio label="DEPOSIT" class='radio'>存款产品</el-radio>
                </el-radio-group>
            </el-form-item> -->

            <el-form-item label="产品类型" prop="productType" class="istopItem">
                <el-select v-model="softNewsForm.productType" placeholder="请选择产品类型" @change="typeSelect(softNewsForm.productType)">
                  <el-option
                    v-for="(item,index) in channelData"
                    :key="index"
                    :label="item.linkName"
                    :value="item.linkModel">
                  </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="产品名称" prop="linkId" class="istopItem">
                <el-input v-if="inputFlag" v-model="softNewsForm.linkId" placeholder="请输入产品链接"></el-input>
                <el-select
                  v-else
                  @focus="selectFocus(softNewsForm.productType)"
                  v-model="softNewsForm.linkId"
                  v-loadmore='loadmore'
                  filterable
                  clearable
                  remote
                  reserve-keyword
                  :remote-method="fuzzySearch"
                  placeholder="请选择产品名称">
                  <el-option
                    v-for="(item,index) in productNameOpt"
                    :key="index"
                    :label="item.name"
                    :value="item.id">
                    <span style="float: left">{{ item.institutionName }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.name }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer formFoot" >
            <el-button type="primary" @click="send('ruleForm')">确 定</el-button>
            <el-button @click="cancelAdd('ruleForm')">取 消</el-button>
        </div>
    </el-dialog>

    <!-- 置顶 -->
    <el-dialog title="新闻置顶" :visible="isTopVisible" :before-close="handleisTopClose">
        <el-form :model="isTopForm" :rules="isToprules" label-position="left" ref="isTopForm" label-width="120px" class="demo-ruleForm">

            <el-form-item label="是否置顶:" prop="isTop" class="istopItem">
                <el-switch v-model="isTopForm.isTop" active-value="TOP" inactive-value="NOTOP"></el-switch>
            </el-form-item>

            <el-form-item label="置顶开始时间:" prop="topStartTime" class="istopItem">
                <el-date-picker
                    v-model="isTopForm.topStartTime"
                    type="datetime"
                    placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>

            <el-form-item label="置顶结束时间:" prop="topEndTime" class="istopItem">
                <el-date-picker
                    v-model="isTopForm.topEndTime"
                    type="datetime"
                    placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>

            <el-form-item class='isTopBottom'>
                <el-button type="primary" @click="submitForm('isTopForm')" size="mini">确定</el-button>
                <el-button @click="resetForm('isTopForm')" size="mini">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
    <!-- 取消置顶 -->
    <el-dialog :visible.sync="notopVisible" width="30%" :before-close="handleClose">
        <span>确定取消置顶？</span>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="cancelTop">取消置顶</el-button>
            <el-button @click="notopVisible = false">取 消</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import isTable from '../../../components/isTable/isTable';
import { mapActions, mapMutations } from 'vuex';
import { upLoadImg, news_manger_add, news_isTop, news_delete, productUrl_list, productList, news_upData } from "../../../api/setting_use.js";
import newsManager from '../../../components/newsManager';
export default {
    components:{
        isTable,
        newsManager,
    },
    data() {
        return {
            id: '',
            success: false,
            channelData: [],
            inputFlag: false,
            isTopVisible: false,
            notopVisible: false,
            pageName: "",//页面名字
            dialogFormVisible: false,//弹框开关
            softNewsVisible: false,//软广告弹窗开关
            newsTitSearch: "",//搜索新闻标题
            upDataSoft: false,
            isTopForm: {
                isTop: '',
                topEndTime: '',
                topStartTime: ''
            },
            opts: {

            },
            searchForm: {
                startTime: '',
                endTime: ''
            },
            isToprules: {
                isTop:[{ required: true, message: '请选择是否置顶', trigger: 'change' }],
                topEndTime:[{ required: true, message: '请选择结束时间', trigger: 'blur' }],
                topStartTime:[{ required: true, message: '请选择开始时间', trigger: 'blur' }],
            },
            softNewsForm: {
                newsType: '',//新闻类型
                newsTitle: '',//新闻标题
                newsImageUrl: '',//位图
                visitNumber: '',//初始访问量
                startTime: '',//开始时间
                endTime: '',//结束时间
                productType: '',//产品类型
                linkId: '',//产品id
                id: '',
            },
            productNameOpt:[], //产品名称列表
            rules: {
                newsTitle: [{ required: true, message: '请输入新闻标题', trigger: 'blur' }],
                newsImageUrl: [{ required: true, message: '请选择图片', trigger: 'blur' }],
                visitNumber: [{ required: true, message: '请输入初始访问量', trigger: 'blur' }],
                startTime: [{required: true, message: '请选择日期和时间', trigger: 'blur'}],
                productType: [{required: true, message: '请选择产品类型', trigger: 'blur'}],
                linkId: [{required: true, message: '请选择产品名称', trigger: 'blur'}]
            },
            productForm: {
                pageSize: 200,
                pageNum: 1,
                linkLocationEnum: '',
                name: null
            },
        }
    },
    mounted() {
        this.pageName = this.$route.name;
        this.userDo();
        this.getList({
            pageNum: 1,
            pageSize: this.$store.state.newsManager.newsMangerList.pageSize
        });
        productUrl_list().then(res=> {
        if(res && res.success) {
            this.channelData = res.data.list.filter(v=> {
            return v.linkUrl != '' && v.linkUrl != null;
            });
        }
        })
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
                title: "新闻开始时间",
                key: "startTime",
                minWidth: "160",
                sortable: true
            },{
                title: "新闻结束时间",
                key: "endTime",
                minWidth: "160",
                sortable: true
            },{
                title: "是否置顶",
                key: "isTopCN",
                minWidth: "100",
                sortable: true
            },{
                title: "标记",
                key: "signCN",
                minWidth: "80",
            },{
                title: "摘要",
                key: "summary",
                minWidth: "160",
            },{
                title: "创建时间",
                key: "gmtCreated",
                minWidth: "160",
                sortable: true
            },{
                title: "创建人",
                key: "creatorName",
                minWidth: "100",
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
        //取消修改普通新闻
        closeDialog() {
            this.dialogFormVisible = false;
            this.opts = null;
        },
        selectFocus(val) {
            if(val != '') {
                this.productForm.linkLocationEnum = val;
                this.getproList(this.productForm)
            }
        },
        loadmore() {
            if(this.productForm.pageNum < this.productPageCount) {
                this.productForm.pageNum++;
                this.getproList(this.productForm);
            }
        },
        getproList(form) {
            this.productNameOpt = [];
            productList(form).then(res=> {
                if(res && res.success) {
                    this.productPageCount = res.data && Math.ceil(res.data.total/this.productForm.pageSize)
                    if(res.data && res.data != null && res.data != []) {
                        const _res = res.data
                        this.productNameOpt = [...this.productNameOpt,..._res]
                    }
                }
            })
        },
        fuzzySearch(query) {
            if(query!= '' && this.softNewsForm.productType != '') {
                this.productNameOpt = [];
                this.productForm.name = query;
                this.productForm.linkLocationEnum = this.softNewsForm.productType;
                this.getproList(this.productForm)
            } else {
                this.productNameOpt = [];
                this.productForm.name = null;
                this.productForm.linkLocationEnum = this.softNewsForm.productType;
                this.getproList(this.productForm)
            }
        },
        //选择产品类型
        typeSelect(val) {
            this.softNewsForm.linkId = ''
            this.productForm = {
                pageSize: 200,
                pageNum: 1,
                linkLocationEnum: '',
                name: null
            }
            if(val == 'EXTERNAL_LINK') {
                this.inputFlag = true;
            } else {
                this.inputFlag = false;
                this.productForm.linkLocationEnum = val;
                this.getproList(this.productForm)
            }
        },
        //取消置顶按钮
        cancelTop() {
            news_isTop({
                id: this.id,
                topStartTime: new Date(this.isTopForm.topStartTime).getTime(),
                topEndTime: new Date(this.isTopForm.topEndTime).getTime(),
                isTop: this.isTopForm.isTop,
            }).then(res=> {
                if(res && res.success) {
                    this.isTopVisible = false;
                    this.notopVisible = false;
                    this.resetForm('isTopForm')
                    this.getList({
                        pageNum: this.$store.state.newsManager.newsMangerList.pageNum,
                        pageSize: this.$store.state.newsManager.newsMangerList.pageSize
                    })
                }
            })
        },
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
                    this.upDataSoft = false;
                    this.id = '';
                }
            } else {
                //弹出消息提示用户
                this.$alert("您没有这个权限", {
                    confirmButtonText: "确定"
                });
            }
        },
        //关闭置顶dialog
        handleClose() {
            this.notopVisible = false;
            this.resetForm('isTopForm')
        },
        //置顶 X 按钮
        handleisTopClose() {
            this.resetForm('isTopForm')
        },
        //置顶弹框取消按钮
        resetForm(formName) {
            this.isTopVisible = false;
            this.$refs[formName].resetFields();
        },
        //图片上传
        upload(params) {
            const _file = params.file;
            const isLt2M = _file.size / 1024 / 1024 < 2;
            const idJPG = _file.type === "image/jpeg" || "image/gif" || "image/png" || "image/jpg";
            var formData = new FormData();
            formData.append("file", _file);
            if (!idJPG) {
                this.$message.error("只能上传jpg/png/gif/jpeg格式的图片");
                return false;
            }
            if (!isLt2M) {
                this.$message.error("请上传2M以下的图片");
                return false;
            }
            upLoadImg(formData).then(res => {
                if (res && res.success) {
                    this.softNewsForm.newsImageUrl = this.$ImgBaseUrl + res.data;
                }
            });
        },
        //取消添加软广告
        cancelAdd(formName) {
            this.softNewsVisible = false;
            this.$refs[formName].resetFields();
        },
        //确认添加软广告
        send(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    //处理数据
                    var products = [];
                    products[0] = {}
                    products[0].productType = this.softNewsForm.productType;
                    if(this.softNewsForm.productType == 'EXTERNAL_LINK') {
                        products[0].linkUrl = this.softNewsForm.linkId;
                    } else {
                        products[0].linkId = this.softNewsForm.linkId;
                        this.productNameOpt && this.productNameOpt.forEach(item=> {
                        if(this.softNewsForm.linkId == item.id) {
                            products[0].productName = item.name;
                        }
                        })
                    }
                    products[0].modelType = 'NEWSMANAGE'
                    products[0].id = this.softNewsForm.id != null ||  this.softNewsForm.id != '' ? this.softNewsForm.id : '',
                    this.softNewsForm.startTime = new Date(this.softNewsForm.startTime).getTime();
                    this.softNewsForm.endTime = new Date(this.softNewsForm.endTime).getTime();
                    this.softNewsForm.productRelationListVo = products;
                    let obj = this.softNewsForm;
                    obj.id = this.id;

                    if(!this.upDataSoft) {//添加软广告
                        news_manger_add(obj).then(res => {
                            if(res && res.success){
                                this.softNewsVisible = false;
                                this.getList({
                                    pageNum: this.$store.state.newsManager.newsMangerList.pageNum,
                                    pageSize: this.$store.state.newsManager.newsMangerList.pageSize
                                });
                                this.softNewsForm = {
                                    newsType: '',//新闻类型
                                    newsTitle: '',//新闻标题
                                    newsImageUrl: '',//位图
                                    visitNumber: '',//初始访问量
                                    startTime: '',//开始时间
                                    endTime: '',//结束时间
                                    productType: '',//产品类型
                                    linkId: '',//产品id
                                    id: '',
                                }
                            }
                        }).catch(res=> {
                            this.$message({
                                type: "error",
                                message: `${res.message}`
                            });
                        })
                    } else {
                        news_upData(obj).then(res => {
                            if(res && res.success) {
                                this.softNewsVisible = false;
                                this.getList({
                                    pageNum: this.$store.state.newsManager.newsMangerList.pageNum,
                                    pageSize: this.$store.state.newsManager.newsMangerList.pageSize
                                });
                                this.softNewsForm = {
                                    id: '',
                                    newsType: '',//新闻类型
                                    newsTitle: '',//新闻标题
                                    newsImageUrl: '',//位图
                                    visitNumber: '',//初始访问量
                                    startTime: '',//开始时间
                                    endTime: '',//结束时间
                                    productType: '',//产品类型
                                    linkId: '',//产品id
                                }
                            }
                        })
                    }
                } else {
                    return false;
                }
            });
        },
        //置顶
        isTop(data) {
            this.isTopVisible = true;
            this.isTopForm.isTop = data.isTop != null && data.isTop!= '' ? data.isTop : '' ;
            this.isTopForm.topStartTime = data.topStartTime != null && data.topStartTime != '' ? data.topStartTime : '';
            this.isTopForm.topEndTime = data.topEndTime != null && data.topEndTime != '' ? data.topEndTime : '';
            this.id = data.id;
        },
        //删除
        delete(id) {
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                this.$message({
                    type: "success",
                    message: "删除成功!"
                });
                news_delete(id).then(res=> {
                    if(res && res.success) {
                        this.getList({
                            pageNum: this.$store.state.newsManager.newsMangerList.pageNum,
                            pageSize: this.$store.state.newsManager.newsMangerList.pageSize,
                            newsTitle: this.newsTitSearch != null && this.newsTitSearch != '' ? this.newsTitSearch : null,
                            startTime: this.searchForm.startTime != null && this.searchForm.startTime != '' ? new Date(this.searchForm.startTime).getTime() : null,
                            endTime: this.searchForm.endTime != null && this.searchForm.endTime != '' ? new Date(this.searchForm.endTime).getTime() : null,
                        })
                    }
                })
            })
            .catch(() => {
                this.$message({
                    type: "info",
                    message: "已取消删除"
                });
            });
        },
        //修改
        edit(data) {
            // console.log(data)
            if(data.newsType == 'SOFT_NEWS') {
                //修改软广告
                this.upDataSoft = true;
                this.softNewsVisible = true;
                this.dialogFormVisible = false;
                this.id = data.id;
                this.softNewsForm.newsType = data.newsType;
                this.softNewsForm.newsTitle = data.newsTitle;
                this.softNewsForm.newsImageUrl = data.newsImageUrl;
                this.softNewsForm.visitNumber = data.visitNumber;
                this.softNewsForm.startTime = data.startTime;
                this.softNewsForm.endTime = data.endTime;
                this.softNewsForm.productType = data.productRelationListVo[0].productType;
                if(data.productRelationListVo[0].productType == 'EXTERNAL_LINK') {
                    this.inputFlag = true;
                    this.softNewsForm.linkId = data.productRelationListVo[0].linkUrl;
                } else {
                    this.inputFlag = false;
                    this.productForm.linkLocationEnum = data.productRelationListVo[0].productType;
                    this.getproList(this.productForm)
                    this.softNewsForm.linkId = data.productRelationListVo[0].linkId;
                    this.softNewsForm.id = data.productRelationListVo[0].id;
                }
            } else if(data.newsType == 'ORDINARY_NEWS') {
                this.softNewsVisible = false;
                this.dialogFormVisible = true;
                this.opts = data;
            }
        },
        save(data) {
            this.dialogFormVisible = false;
            news_upData(data).then(res=> {
                if(res && res.success) {
                    this.opts = null;
                    this.success = true;
                    this.getList({
                        pageNum: this.$store.state.newsManager.newsMangerList.pageNum,
                        pageSize: this.$store.state.newsManager.newsMangerList.pageSize,
                        newsTitle: this.newsTitSearch != null && this.newsTitSearch != '' ? this.newsTitSearch : null,
                        startTime: this.searchForm.startTime != null && this.searchForm.startTime != '' ? new Date(this.searchForm.startTime).getTime() : null,
                        endTime: this.searchForm.endTime != null && this.searchForm.endTime != '' ? new Date(this.searchForm.endTime).getTime() : null,
                    });
                }
            })
        },
        // 监听表格的操作
        tableEmit(data) {
            switch (data.type) {
                case "regetData": // 分页的emit
                //再次请求列表数据
                    this.getList({
                        pageNum: this.$store.state.newsManager.newsMangerList.pageNum,
                        pageSize: this.$store.state.newsManager.newsMangerList.pageSize,
                        newsTitle: this.newsTitSearch != null && this.newsTitSearch != '' ? this.newsTitSearch : null,
                        startTime: this.searchForm.startTime != null && this.searchForm.startTime != '' ? new Date(this.searchForm.startTime).getTime() : null,
                        endTime: this.searchForm.endTime != null && this.searchForm.endTime != '' ? new Date(this.searchForm.endTime).getTime() : null,
                    });
                break;
                case "edit": // 编辑按钮
                    this.edit(data.data);
                break;
                case "delete": // 删除按钮
                    this.delete(data.data.id);
                break;
                case "isTop": // 置顶
                    this.isTop(data.data);
                break;
            }
        },
        //置顶提交
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if(this.isTopForm.isTop == 'NOTOP' || this.isTopForm.isTop == null) {
                    this.notopVisible = true;
                } else {
                    this.notopVisible = false;
                    if (valid) {
                        news_isTop({
                            id: this.id,
                            topStartTime: new Date(this.isTopForm.topStartTime).getTime(),
                            topEndTime: new Date(this.isTopForm.topEndTime).getTime(),
                            isTop: this.isTopForm.isTop,
                        }).then(res=> {
                            if(res && res.success) {
                                this.isTopVisible = false;
                                console.log(this.isTopVisible)
                                this.resetForm('isTopForm');
                                this.getList({
                                    pageNum: this.$store.state.newsManager.newsMangerList.pageNum,
                                    pageSize: this.$store.state.newsManager.newsMangerList.pageSize,
                                    newsTitle: this.newsTitSearch != null && this.newsTitSearch != '' ? this.newsTitSearch : null,
                                    startTime: this.searchForm.startTime != null && this.searchForm.startTime != '' ? new Date(this.searchForm.startTime).getTime() : null,
                                    endTime: this.searchForm.endTime != null && this.searchForm.endTime != '' ? new Date(this.searchForm.endTime).getTime() : null,
                                })
                            }
                        })
                    } else {
                        return false;
                    }
                }
            });
        },
        //标题搜索
        search() {
            this.$store.state.newsManager.newsMangerList.pageNum = 1;
            this.getList({
                pageNum: this.$store.state.newsManager.newsMangerList.pageNum,
                pageSize: this.$store.state.newsManager.newsMangerList.pageSize,
                newsTitle: this.newsTitSearch != null && this.newsTitSearch != '' ? this.newsTitSearch : null,
                startTime: this.searchForm.startTime != null && this.searchForm.startTime != '' ? new Date(this.searchForm.startTime).getTime() : null,
                endTime: this.searchForm.endTime != null && this.searchForm.endTime != '' ? new Date(this.searchForm.endTime).getTime() : null,
            });
        },
        //开始时间搜索
        startTimeSearch(){
            console.log(new Date(this.searchForm.startTime).getTime())
            this.$store.state.newsManager.newsMangerList.pageNum = 1;
            this.getList({
                pageNum: this.$store.state.newsManager.newsMangerList.pageNum,
                pageSize: this.$store.state.newsManager.newsMangerList.pageSize,
                newsTitle: this.newsTitSearch != null && this.newsTitSearch != '' ? this.newsTitSearch : null,
                startTime: this.searchForm.startTime != null && this.searchForm.startTime != '' ? new Date(this.searchForm.startTime).getTime() : null,
                endTime: this.searchForm.endTime != null && this.searchForm.endTime != '' ? new Date(this.searchForm.endTime).getTime() : null,
            });
        },
        //结束时间搜索
        endTimeSearch(){
            this.$store.state.newsManager.newsMangerList.pageNum = 1;
            this.getList({
                pageNum: this.$store.state.newsManager.newsMangerList.pageNum,
                pageSize: this.$store.state.newsManager.newsMangerList.pageSize,
                newsTitle: this.newsTitSearch != null && this.newsTitSearch != '' ? this.newsTitSearch : null,
                startTime: this.searchForm.startTime != null && this.searchForm.startTime != '' ? new Date(this.searchForm.startTime).getTime() : null,
                endTime: this.searchForm.endTime != null && this.searchForm.endTime != '' ? new Date(this.searchForm.endTime).getTime() : null,
            });
        },
    },
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
        display: flex;
        justify-content: space-between;
        .el-input{
            width:200px;
        }
    }
}
.searchForm{
    width:100%;
    padding:0 20px;
    box-sizing: border-box;
}
.radio{
    margin:4px 4px;
}
.updata{
    width:100%;
    .el-dialog__wrapper>/deep/.el-dialog{
        width:70% !important;
    }
}
.isTopBottom{
    text-align: right;
}
.istopItem{
    height:60px;
}
.newsForm{
    width:100%;
    .el-input{
        width:220px;
    }
}
.itemImg{
    height: 140px;
    img{
        width:120px;
        height:120px;
    }
}
.formFoot{
    text-align: center;
}
</style>
