<template>
    <div class="componentWaper">
        <div id="forHeader">
            <p class="isPageName">
                <span :class="env?'lineSpan1':'lineSpan'">|</span>
                位置：{{$store.state.for_layout.titles}}{{pageName}}
            </p>
            <el-form :inline="true" :model="searchForm" :rules="searchRules" ref="searchForm" class="demo-ruleForm">
                <el-form-item label="文章标题" prop="title">
                    <el-input v-model="searchForm.title" size='mini'></el-input>
                </el-form-item>
                 <el-form-item label="标签名称" prop="tagName">
                    <el-input v-model="searchForm.tagName" placeholder="请输入" size='mini' ></el-input>
                </el-form-item>
                <el-form-item label="来源" prop="original">
                    <el-select v-model="searchForm.original" placeholder="请选择" clearable filterable size='mini' >
                        <el-option
                        v-for="(item,ind) in originalList"
                        :key="ind"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="发布开始时间" prop="sendTimeStart">
                    <el-date-picker
                        size='mini'
                        v-model="searchForm.sendTimeStart"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="发布结束时间" prop="sendTimeEnd">
                    <el-date-picker
                        size='mini'
                        v-model="searchForm.sendTimeEnd"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button size="mini"  type="success" @click='search'>查询</el-button>
                    <el-button size="mini"  type="info" @click='rest("searchForm")'>清除</el-button>
                    <el-button size="mini"  type="danger" @click='moreDelete'>批量删除</el-button>
                    <el-button size="mini"  type="primary" @click='addArticleContent'>新增</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div id="forTable">
            <isTable :inputData="tableInputData" @tableEmit="tableEmit"/>
        </div>
        <el-dialog :title="updateFlag ? '修改文章' : '新增文章'" :visible.sync="dialogFormVisible" :close-on-click-modal='false' :before-close="closeDialog">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" label-position="left" class="demo-ruleForm">
                <el-form-item label="文章标题" prop="title">
                    <el-input v-model="ruleForm.title" maxlength="20" show-word-limit ></el-input>
                </el-form-item>
                <el-form-item label="封面类型" prop="coverType" @change='changeCoverType'>
                    <el-select v-model="ruleForm.coverType" placeholder="请选择" clearable :disabled="updateFlag">
                        <el-option
                        v-for="(item,ind) in coverTypeList"
                        :key="ind"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文章类型" prop="tagId">
                    <el-select v-model="ruleForm.tagId" placeholder="请选择" clearable filterable >
                        <el-option
                        v-for="(item,ind) in tagIdList"
                        :key="ind"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标签名称" prop="tagName">
                    <el-input v-model="ruleForm.tagName" placeholder="请输入" ></el-input>
                </el-form-item>
                <el-form-item label="来源" prop="original">
                    <el-select v-model="ruleForm.original" placeholder="请选择" clearable filterable >
                        <el-option
                        v-for="(item,ind) in originalList"
                        :key="ind"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文章简介" prop="description">
                    <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="ruleForm.description"
                        maxlength="200"
                        show-word-limit
                        >
                    </el-input>
                </el-form-item>
                <el-form-item label="文章关键字" prop="keywords">
                    <el-input v-model="ruleForm.keywords" placeholder="请输入" ></el-input>
                </el-form-item>
                <el-form-item label="文章内容" prop="content">
                    <editor-bar v-model="ruleForm.content" :url="'admin/file/up/setting'" :isClear="isClear"></editor-bar>
                </el-form-item>
                <el-form-item label="渠道" prop="channelCode">
                    <el-select v-model="ruleForm.channelCode" placeholder="请选择" clearable filterable >
                        <el-option
                        v-for="(item,ind) in channelList"
                        :key="ind"
                        :label="item.value"
                        :value="item.label">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文章时间" prop="articleTime">
                    <el-date-picker
                        v-model="ruleForm.articleTime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="发布时间" prop="sendTime">
                    <el-date-picker
                        v-model="ruleForm.sendTime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="风险提示" prop="riskWarning">
                    <el-input v-model="ruleForm.riskWarning" placeholder="请输入内容"></el-input>
                </el-form-item>

                <el-form-item label="封面图片" v-if='ruleForm.coverType == "single_image" || ruleForm.coverType == "big_image"' prop='coverImage'>
                    <el-upload
                        class="avatar-uploader"
                        action="customize"
                        :show-file-list="false"
                        :http-request="uploadCoverImage"
                        v-loading="coverImageLoading"
                        style="width:100%"
                        >
                        <img v-if="ruleForm.coverImage" :src="$ImgBaseUrl + ruleForm.coverImage" class="avatar" />
                        <div v-else>
                            <el-button>
                            选择图片
                            <br />
                            <span style="font-size:12px;color:red">不能大于2M</span>
                            <br />
                            <span style="font-size:12px;color:red">jpg/png/gif/jpeg格式</span>
                            </el-button>
                        </div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="封面图片" v-if='ruleForm.coverType == "three_image"' prop='newCoverList'>
                    <el-upload
                        class="upload-demo"
                        auto-upload
                        ref="uploadImg"
                        action="https://develop-gateway.bicai365.com/admin/file/up/setting"
                        :headers="myHeaders"
                        :limit="3"
                        :file-list="fileList"
                        :on-success="upImg"
                        :on-remove="handleRemove"
                        :before-upload="beforeAvatarUpload"
                        :on-exceed="exceed"
                        list-type="picture-card"
                    >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="产品类型" prop="productType">
                    <el-select
                        filterable
                        v-model="ruleForm.productType"
                        clearable
                        placeholder="请选择产品类型"
                        @change="typeSelect(ruleForm.productType)"
                    >
                        <el-option
                        v-for="(item,ind) in linkLocationOpt"
                        :key="ind"
                        :label="item.linkName"
                        :value="item.linkModel"
                        >
                        <span style="float: left">{{ item.linkName }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="关联产品" v-if='linkIdFlag' prop="linkId" :rules="{ required: this.linkIdFlag, message: '请选择产品', trigger: 'blur'}">
                    <el-select
                        filterable
                        v-model="ruleForm.linkId"
                        clearable
                        v-loadmore="loadmore"
                        remote
                        reserve-keyword
                        :remote-method="fuzzySearch"
                        placeholder="请选择产品名称"
                    >
                        <el-option
                        v-for="(item,ind) in productOpt"
                        :key="ind"
                        :label="item.name"
                        :value="item.id"
                        >
                        <span style="float: left">{{ item.institutionName }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.name }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="save('ruleForm')">保存</el-button>
                    <el-button @click="resetForm('ruleForm')">取消</el-button>
                </el-form-item>

            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import { 
        articleList, 
        articleTagsList,
        getAppChannel,
        upLoadImg,
        addArticle, 
        deleteArticle, 
        moreDeleteArticle, 
        updateArticle 
    } from '@/api/informationApi';
    import { productUrl_list, productList,} from '@/api/setting_use';
    import isTable from '@/components/isTable/isTable';
    import EditorBar from '@/components/wangEnduit';
    var token = sessionStorage.getItem("token");
    let jurisdiction = JSON.parse(sessionStorage.getItem("buttenpremissions"));

    export default {
        components: {
            isTable,
            EditorBar
        },
        data() {
            var threeImgRuel = (rule, value, callback) => { // 判断手机号是否正确
                if(value.length < 3) {
                    callback(new Error('最少上传三张图片'))
                } else {
                    callback()
                }
            }
            return {
                pageName: '',
                env: null,
                updateFlag: false,
                isClear: true,
                dialogFormVisible: false,
                coverImageLoading: false,
                myHeaders: { Authorization: "Bearer " + token },
                fileList: [],
                linkLocationOpt: [],
                linkIdFlag: true,
                moreDeleteList: [],
                tableInputData: {
                    // 传给table子组件的数据
                    noIndex: true,
                    checkBox: true, // 判断需要不需要添加选择框
                    pageSize: 10, // 分页相关
                    pageNum: 1,
                    total: null,
                    actions: {},
                    data: {
                        list: [], // 给表格的数据
                        quanxian: [], // 记录用户的权限，当前页面显示哪些按钮、表格是否显示操作列
                        title: [], // 给表格表头
                        custom: [] // 给表格按钮数量、类型（编辑、删除等）
                    }
                },
                id: '',
                productId: '',
                ruleForm: {
                    title: '',
                    coverType: '',
                    tagId: '',
                    tagName: '',
                    original: '',
                    description: '',
                    keywords: '',
                    content: '',
                    channelCode: '',
                    articleTime: '',
                    sendTime: '',
                    riskWarning: '',
                    coverImage: '',
                    newCoverList: [],//新闻封面图片
                    productType: '',
                    linkId: ''
                },
                searchForm: {
                    title: '',
                    tagName: '',
                    original: '',
                    sendTimeStart: '',
                    sendTimeEnd: ''
                },
                searchRules: {},
                channelName: '',
                productPageCount: 1,
                productForm: {
                    pageSize: 200,
                    pageNum: 1,
                    linkModel: "",
                    name: null
                },
                productOpt: [], //产品列表
                rules: {
                    title: [{ required: true, message: '请输入文章标题', trigger: 'blur'}],
                    coverType: [{ required: true, message: '请选择封面类型', trigger: 'blur'}],
                    tagId: [{ required: false, message: '请选择文章类型', trigger: 'blur'}],
                    tagName: [{ required: true, message: '请选择标签名称', trigger: 'blur'}],
                    original: [{ required: true, message: '请选择来源', trigger: 'blur'}],
                    description: [{ required: true, message: '请输入文章简介', trigger: 'blur'}],
                    keywords: [{ required: true, message: '请输入文章关键字', trigger: 'blur'}],
                    content: [{ required: true, message: '请输入文章内容', trigger: 'blur'}],
                    channelCode: [{ required: true, message: '请选择渠道', trigger: 'blur'}],
                    articleTime: [{ required: true, message: '请选择文章时间', trigger: 'blur'}],
                    sendTime: [{ required: true, message: '请选择发布时间', trigger: 'blur'}],
                    riskWarning: [{ required: true, message: '请输入风险提示', trigger: 'blur'}],
                    coverImage: [{ required: true, message: '请上传封面图片', trigger: 'blur'}],
                    newCoverList: [{ required: true, message: '请上传封面图片', trigger: 'blur'},{validator: threeImgRuel, trigger: 'change'}],
                    productType: [{ required: true, message: '请选择产品类型', trigger: 'blur'}],
                },
                coverTypeList: [
                    {
                        label: '无图',
                        value: 'no_image'
                    },
                    {
                        label: '单图',
                        value: 'single_image'
                    },
                    {
                        label: '三图',
                        value: 'three_image'
                    },
                    {
                        label: '大图',
                        value: 'big_image'
                    },
                ],
                tagIdList: [],
                originalList: [
                    {
                        label: '作者',
                        value: 'author'
                    },
                    {
                        label: '机构',
                        value: 'organization'
                    },
                ],
                channelList: [],
            }
        },
        mounted() {
            this.pageName = this.$route.name;
            this.env = sessionStorage.getItem("env") === "development";
            this.getChannelData();
            this.getData();
            this.userDo();
            articleTagsList().then(res => {
                if(res && res.success) {
                    // console.log(res)
                    // this.tagIdList = res.data.list
                }
            });
            getAppChannel('channel_type').then(res => {
                if (res && res.success) {
                    this.channelList = res.data
                }
            })
        },
        methods: {
            //权限认证
            userDo() {
                this.tableInputData.data.custom = [];
                if (jurisdiction.indexOf('essay_upd') > -1) {
                    this.tableInputData.data.custom.push({
                        text: "修改",
                        type: "warning",
                        size: "small",
                        emit: "edit"
                    });
                }
                if (jurisdiction.indexOf('essay_del') > -1) {
                    this.tableInputData.data.custom.push({
                        text: '删除',
                        type: "danger",
                        size: "mini",
                        emit: "delete"
                    });
                }
            },
            //查询
            search() {
                this.getData(this.searchForm)
            },
            //清除
            rest(formName) {
                this.$refs[formName].resetFields();
                this.search();
            },
            //列表数据
            getData(data={}) {
                let pageData = {
                    pageNum: this.tableInputData.pageNum,
                    pageSize: this.tableInputData.pageSize
                }
                const requireData = Object.assign(data,pageData)
                articleList(requireData).then(res=> {
                    if(res && res.success) {
                        this.tableInputData.data.list = res.data ? res.data.list : [];
                        this.tableInputData.total = res.data ? res.data.total : null;
                    }
                })
                this.tableInputData.data.list.forEach(v=> {
                    if(v.coverType == 'no_image') {
                        v.coverTypeCN = '无图'
                    } else if(v.coverType == 'single_image') {
                        v.coverTypeCN = '单图'
                    } else if(v.coverType == 'three_image') {
                        v.coverTypeCN = '三图'
                    } else if(v.coverType == 'big_image') {
                        v.coverTypeCN = '大图'
                    }
                    if(v.status == 'release') {
                        v.statusCN = '已发布'
                    } else if(v.status == 'wait_audited') {
                        v.statusCN = '待审核'
                    } else if (v.status == 'withdrawn') {
                        v.statusCN = '已撤回'
                    } else if(v.status == 'rejected') {
                        v.statusCN = '已驳回'
                    }
                })
                this.tableInputData.data.title = [
                    {
                        title: '文章标题',
                        key: 'title',
                        minWidth: '120',
                    },
                    {
                        title: '封面类型',
                        key: 'coverTypeCN',
                        minWidth: '80',
                    },
                    {
                        title: '类型名称',
                        key: 'tagName',
                        minWidth: '100',
                    },
                    {
                        title: '状态',
                        key: 'statusCN',
                        minWidth: '100',
                    },
                    {
                        title: '来源',
                        key: 'original',
                        minWidth: '100',
                    },
                    {
                        title: '文章关键字',
                        key: 'keywords',
                        minWidth: '100',
                    },
                    {
                        title: '渠道',
                        key: 'channelName',
                        minWidth: '100',
                    },
                    {
                        title: '文章时间',
                        key: 'articleTime',
                        minWidth: '160',
                    },
                    {
                        title: '发布时间',
                        key: 'sendTime',
                        minWidth: '160',
                    },
                    {
                        title: '风险提示',
                        key: 'riskWarning',
                        minWidth: '120',
                    },
                    {
                        title: '创建人名称',
                        key: 'creatorName',
                        minWidth: '120',
                    },
                    {
                        title: '创建时间',
                        key: 'gmtCreated',
                        minWidth: '160',
                    },
                    {
                        title: '修改时间',
                        key: 'gmtCodified',
                        minWidth: '160',
                    },

                ]
            },
            //产品类型
            getChannelData() {
                productUrl_list().then(res => {
                    if (res && res.success) {
                        this.linkLocationOpt = res.data.list.filter(v => {
                            return v.linkUrl != "" && v.linkUrl != null;
                        });
                    }
                });
            },
            //点击添加
            addArticleContent() {
                if (jurisdiction.indexOf("essay_add") > -1) {
                    this.updateFlag = false;
                    this.dialogFormVisible = true;
                } else {
                    //弹出消息提示用户
                    this.$alert("您没有这个权限", {
                        confirmButtonText: "确定"
                    });
                }
            },
            //切换封面类型
            changeCoverType() {
                this.ruleForm.newCoverList = [];
            },
            //保存
            save(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.channelList && this.channelList.forEach(v=> {
                            if(this.ruleForm.channelCode == v.label) {
                                this.channelName = v.value
                            }
                        })
                        let productRelationCoListData = {
                            // id: this.updateFlag ? this.productId : null,
                            productType: this.ruleForm.productType,
                            linkId: this.ruleForm.linkId ? this.ruleForm.linkId : null
                        }
                        this.linkLocationOpt && this.linkLocationOpt.forEach(v=> {
                            if(this.ruleForm.productType == v.linkModel) {
                                productRelationCoListData.productName = v.linkName
                                productRelationCoListData.locationId = v.id
                            }
                        })
                        const obj = {
                            id: this.updateFlag ?  this.id : null,
                            title: this.ruleForm.title,
                            coverType: this.ruleForm.coverType,
                            tagId: this.ruleForm.tagId ? this.ruleForm.tagId : 2,
                            tagName: this.ruleForm.tagName,
                            original: this.ruleForm.original,
                            description: this.ruleForm.description,
                            keywords: this.ruleForm.keywords,
                            content: this.ruleForm.content,
                            channelCode: this.ruleForm.channelCode,
                            channelName: this.channelName,
                            articleTime: this.ruleForm.articleTime,
                            sendTime: this.ruleForm.sendTime,
                            riskWarning: this.ruleForm.riskWarning,
                            newCoverList: this.ruleForm.newCoverList,
                            productRelationCoList: [productRelationCoListData]
                        }
                        if(!this.updateFlag) {
                            //新增
                            addArticle(obj).then(res=> {
                                if(res && res.success) {
                                    this.dialogFormVisible = false;
                                    this.resetForm('ruleForm');
                                    this.$message.success('保存成功');
                                    this.search();
                                }
                            })
                        } else {
                            //修改
                            updateArticle(obj).then(res=> {
                                if(res && res.success) {
                                    this.dialogFormVisible = false;
                                    this.resetForm('ruleForm');
                                    this.$message.success('保存成功');
                                    this.search();
                                }
                            })
                        }
                    } else {
                        return false;
                    }
                });
            },
            //点X关闭
            closeDialog() {
                this.resetForm('ruleForm');
            },
            //取消
            resetForm(formName) {
                this.fileList = [];
                this. ruleForm = {
                    title: '',
                    coverType: '',
                    tagId: '',
                    tagName: '',
                    original: '',
                    description: '',
                    keywords: '',
                    content: '',
                    channelCode: '',
                    articleTime: '',
                    sendTime: '',
                    riskWarning: '',
                    coverImage: '',
                    newCoverList: [],//新闻封面图片
                    productType: '',
                    linkId: ''
                };
                this.$refs[formName].resetFields();
                this.dialogFormVisible = false;
            },
            //删除
            delete(id) {
                this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    deleteArticle(id).then(res=> {
                        if(res && res.success) {
                            this.$message({
                                type: "success",
                                message: "删除成功!"
                            });
                            this.search();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
            },
            //批量删除
            moreDelete() {
                if(this.moreDeleteList.length < 1) {
                    this.$alert("请选择删除项", {
                        confirmButtonText: '确定'
                    })
                } else {
                    if (jurisdiction.indexOf('essay_batch_del') > -1) {
                        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                            confirmButtonText: "确定",
                            cancelButtonText: "取消",
                            type: "warning"
                        }).then(() => {
                            let obj = {
                                ids: this.moreDeleteList
                            }
                            console.log(obj)
                            moreDeleteArticle(obj).then(res=> {
                                if(res && res.success) {
                                    this.$message({
                                        type: "success",
                                        message: "删除成功!"
                                    });
                                    this.search();
                                }
                            })
                        });
                    } else {
                        this.$alert("您没有这个权限", {
                            confirmButtonText: "确定"
                        });
                    }
                }
            },
            //修改
            edit(data) {
                console.log(data.productRelationCoList)
                this.updateFlag = true;
                this.dialogFormVisible = true;
                this.id = data.id;
                for(var item in this.ruleForm) {
                    this.ruleForm[item] = data[item];
                }
                if(data.newCoverList.length == 3) {
                    this.fileList = data.newCoverList.map(v => {
                        return {url: this.$ImgBaseUrl + v.coverUrl}
                    })
                } else if(data.newCoverList.length == 1) {
                    this.ruleForm.coverImage = data.newCoverList[0].coverUrl;
                }
                if(data.productRelationCoList.length > 0) {
                    this.productId = data.productRelationCoList[0].id;
                    this.ruleForm.productType = data.productRelationCoList[0].productType;
                    this.typeSelect(data.productRelationCoList[0].productType);
                    this.ruleForm.linkId = data.productRelationCoList[0].linkId;
                }
            },
            //切换产品类型
            typeSelect(val) {
                this.ruleForm.linkId = "";
                this.productForm = {
                    pageSize: 200,
                    pageNum: 1,
                    linkModel: "",
                    name: null
                };
                this.productOpt = [];
                if ( this.ruleForm.productType != "" && this.ruleForm.productType != null && this.ruleForm.productType != "undefined" ) {
                    this.productForm.linkModel = val;
                    this.getproList(this.productForm);
                }
            },
            loadmore() {
                if (this.productForm.pageNum < this.productPageCount) {
                    this.productForm.pageNum++;
                    this.getproList(this.productForm);
                }
            },
            getproList(form) {
                productList(form).then(res => {
                    if (res && res.success) {
                        if(res.data) {
                            this.linkIdFlag = true;
                            this.productPageCount =
                                res.data && Math.ceil(res.data.total / this.productForm.pageSize);
                            if (res.data && res.data.list != null && res.data.list != []) {
                                const _res = res.data.list;
                                this.productOpt = [...this.productOpt, ..._res];
                            }
                        } else {
                            this.linkIdFlag = false;
                        }
                    }
                });
            },
            fuzzySearch(query) {
                if (query != "" && this.ruleForm.productType != "") {
                    this.productOpt = [];
                    this.productForm.linkName = query;
                    this.productForm.linkModel = this.ruleForm.productType;
                    this.getproList(this.productForm);
                } else {
                    this.productOpt = [];
                    this.productForm.linkName = null;
                    this.productForm.linkModel = this.ruleForm.productType;
                    this.getproList(this.productForm);
                }
            },
            //单图   大图  上传
            uploadCoverImage(params) {
                const _file = params.file;
                const isLt2M = _file.size / 1024 / 1024 < 2;
                const idJPG =
                    _file.type === "image/jpeg" ||
                    _file.type === "image/gif" ||
                    _file.type === "image/png" ||
                    _file.type === "image/jpg";
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
                this.coverImageLoading = true;
                this.ruleForm.newCoverList = [];
                upLoadImg(formData).then(res => {
                    if (res && res.success) {
                        this.coverImageLoading = false;
                        this.ruleForm.coverImage = res.data;
                        this.ruleForm.newCoverList.push({coverUrl: res.data})
                    }
                });
            },
            //三图 上传
            upImg(res, file) {
                this.ruleForm.newCoverList.push({ coverUrl: file.response.data });
            },
            //上传限制
            beforeAvatarUpload(_file) {
                const isLt2M = _file.size / 1024 / 1024 < 2;
                const idJPG =
                    _file.type === "image/jpeg" ||
                    _file.type === "image/gif" ||
                    _file.type === "image/png" ||
                    _file.type === "image/jpg";
                if (!idJPG) {
                    this.$message.error("只能上传jpg/png/gif/jpeg格式的图片");
                    return false;
                }
                if (!isLt2M) {
                    this.$message.error("请上传2M以下的图片");
                    return false;
                }
            },
            //删除图片
            handleRemove(file) {
                var url = file.response ? this.$ImgBaseUrl + file.response.data : file.url;
                this.ruleForm.newCoverList.forEach((v, i) => {
                    if (this.$ImgBaseUrl + v.coverUrl == url) {
                    this.ruleForm.newCoverList.splice(i, 1);
                    }
                });
            },
            //上传超过三个
            exceed(file, fileList) {
                if (fileList.length >= 3) {
                    this.$message({
                        message: "最多只能上传3张哦",
                        type: "warning"
                    });
                }
            },
            // upImgChange(file, fileList) {
            //     if (fileList.length == 3) {
            //         this.$refs.uploadImg.$el.children[1].style = "display:none;";
            //     } else {
            //         this.$refs.uploadImg.$el.children[1].style = "display:block;";
            //     }
            // },
            tableEmit(data) {
                switch(data.type) {
                    case "regetData":
                        this.search()
                    break;
                    case "edit":
                        this.edit(data.data)
                    break;
                    case "delete":
                        this.delete(data.data.id)
                    break;
                    case 'moreDelete':
                        let deleteArr = data.data.map(item => item.id);
                        this.moreDeleteList = [...deleteArr];
                    break;
                }
            },
        }
    }
</script>

<style>

</style>