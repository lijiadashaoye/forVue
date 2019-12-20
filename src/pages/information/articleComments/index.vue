<template>
    <div class="componentWaper">
        <div id="forHeader">
            <p class="isPageName">
                <span :class="env?'lineSpan1':'lineSpan'">|</span>
                位置：{{$store.state.for_layout.titles}}{{pageName}}
            </p>
            <el-form :inline="true" :model="searchForm" :rules="searchRules" ref="searchForm" class="demo-ruleForm">
                <el-form-item label="评论内容标题" prop="commemtTitle">
                    <el-input v-model="searchForm.commemtTitle" placeholder="请输入" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="评论人昵称" prop="nickname">
                    <el-input v-model="searchForm.nickname" placeholder="请输入" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="评论状态" prop="status">
                    <el-select v-model="searchForm.status" placeholder="请选择" size='mini'>
                        <el-option
                        v-for="(item,ind) in statusList"
                        :key="ind"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>        
                </el-form-item>
                <el-form-item label="评论的内容" prop="content">
                    <el-input v-model="searchForm.content" placeholder="请输入" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="开始时间" prop="startTime">
                    <el-date-picker
                        v-model="searchForm.startTime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        format="yyyy-MM-dd HH:mm:ss"
                        size='mini'
                        placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间" prop="endTime">
                    <el-date-picker
                        v-model="searchForm.endTime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        format="yyyy-MM-dd HH:mm:ss"
                        size='mini'
                        placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button size="mini"  type="success" @click='search'>查询</el-button>
                    <el-button size="mini"  type="info" @click='rest("searchForm")'>清除</el-button>
                    <el-button size="mini"  type="danger" @click='moreDelete'>批量删除</el-button>
                    <el-button size="mini"  type="primary" @click='addComment'>新增</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div id="forTable">
            <isTable :inputData="tableInputData" @tableEmit="tableEmit"/>
        </div>
         <el-dialog :title="updateFlag ? '修改文章标签' : '新增文章标签'" :visible.sync="dialogFormVisible" :close-on-click-modal='false' :before-close="closeDialog">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" label-position="left" class="demo-ruleForm">
                <el-form-item label="被评论的ID" prop="sid">
                    <el-input v-model="ruleForm.sid" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="评论内容标题" prop="commemtTitle">
                    <el-input v-model="ruleForm.commemtTitle" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="评论人ID" prop="creator">
                    <el-input v-model="ruleForm.creator" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="父级评论ID" prop="pid">
                    <el-input v-model="ruleForm.pid" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="评论人昵称" prop="nickname">
                    <el-input v-model="ruleForm.nickname" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="评论人头像" prop="avatar">
                    <el-upload
                        class="avatar-uploader"
                        action="customize"
                        :show-file-list="false"
                        :http-request="uploadavatar"
                        v-loading="avatarLoading"
                        style="width:100%"
                        >
                        <img v-if="ruleForm.avatar" :src="$ImgBaseUrl + ruleForm.avatar" class="avatar" />
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
                <el-form-item label="评论内容" prop="content">
                    <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="ruleForm.content"
                        maxlength="200"
                        show-word-limit
                        >
                    </el-input>
                </el-form-item>
                <el-form-item label="点赞数量" prop="support">
                    <el-input v-model="ruleForm.support" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="点赞数量" prop="type">
                    <el-radio-group v-model="ruleForm.type">
                        <el-radio label="news">新闻评论</el-radio>
                        <el-radio label="product">产品评论</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="save('ruleForm')">保存</el-button>
                    <el-button @click="resetForm('ruleForm')">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="审核状态" :visible.sync="statusVisible" :close-on-click-modal='false' :before-close="closeStatusDialog">
            <el-form :model="statusForm" ref="statusForm" label-width="100px" label-position="left" class="demo-ruleForm">
                <el-form-item label="审核状态">
                    <el-radio-group v-model="statusForm.status">
                        <el-radio label="release">已发布</el-radio>
                        <el-radio label="wait_audited">待审核</el-radio>
                        <el-radio label="withdrawn">已撤回</el-radio>
                        <el-radio label="rejected">已驳回</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input
                        type="textarea"
                        placeholder="请输入"
                        v-model="statusForm.remark"
                        maxlength="200"
                        show-word-limit
                        >
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="saveStatus">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import isTable from '@/components/isTable/isTable';
    import { 
        articleCommentList,
        upLoadImg,
        addArticleComment,
        updateArticleComment,
        deleteArticleComment,
        moreDeleteComment,
        updateCommentStatus
    } from '@/api/informationApi';
    let jurisdiction = JSON.parse(sessionStorage.getItem("buttenpremissions"));
    export default {
        components: {
            isTable
        },
        data() {
            return {
                pageName: '',
                env: null,
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
                statusList: [
                    {
                        label: '已发布',
                        value: 'release'
                    },
                    {
                        label: '待审核',
                        value: 'wait_audited'
                    },
                    {
                        label: '已撤回',
                        value: 'withdrawn'
                    },
                    {
                        label: '已驳回',
                        value: 'rejected'
                    }
                ],
                searchForm: {
                    commemtTitle: '',
                    nickname: '',
                    status: '',
                    content: '',
                    startTime: '',
                    endTime: '',
                },
                searchRules: {},
                updateFlag: false,
                dialogFormVisible: false,
                statusVisible: false,
                avatarLoading: false,
                id: '',
                moreDeleteList: [],
                ruleForm: {
                    avatar: '',
                    sid: '',
                    commemtTitle: '',
                    creator: '',
                    pid: '',
                    nickname: '',
                    content: '',
                    support: '',
                    type: ''
                },
                rules: {
                    avatar: [{ required: true, message: '请上传头像', trigger: 'change'}],
                    sid: [{ required: true, message: '请输入', trigger: 'blur'},{ pattern: /^[+]{0,1}(\d+)$/, message: "只能输入正整数", trigger: "blur" }],
                    commemtTitle: [{ required: true, message: '请输入', trigger: 'blur'}],
                    creator: [{ required: true, message: '请输入', trigger: 'blur'}],
                    pid: [{ required: true, message: '请输入', trigger: 'blur'},{ pattern: /^[+]{0,1}(\d+)$/, message: "只能输入正整数", trigger: "blur" }],
                    nickname: [{ required: true, message: '请输入', trigger: 'blur'}],
                    content: [{ required: true, message: '请输入', trigger: 'blur'}],
                    support: [{ required: true, message: '请输入', trigger: 'blur'},{ pattern: /^[+]{0,1}(\d+)$/, message: "只能输入正整数", trigger: "blur" }],
                    type: [{ required: true, message: '请选择', trigger: 'change'}]
                },
                statusForm: {
                    status: '',
                    remark: '',
                },

            }
        },
        mounted() {
            this.pageName = this.$route.name;
            this.getListData({
                pageNum: this.tableInputData.pageNum,
                pageSize: this.tableInputData.pageSize
            });
            this.userDo();
        },
        methods: {
            //权限认证
            userDo() {
                this.tableInputData.data.custom = [];
                if (jurisdiction.indexOf('essay_discuss_upd') > -1) {
                    this.tableInputData.data.custom.push({
                        text: "修改",
                        type: "warning",
                        size: "small",
                        emit: "edit"
                    });
                }
                if (jurisdiction.indexOf('essay_discuss_upd_status') > -1) {
                    this.tableInputData.data.custom.push({
                        text: '修改评论状态',
                        type: "success",
                        size: "mini",
                        emit: "status"
                    });
                }
                if (jurisdiction.indexOf('essay_discuss_del') > -1) {
                    this.tableInputData.data.custom.push({
                        text: '删除',
                        type: "danger",
                        size: "mini",
                        emit: "delete"
                    });
                }
            },
            //获取列表数据
            getListData(data) {
                articleCommentList(data).then(res=> {
                    if(res && res.success) {
                        this.tableInputData.data.list = res.data.list;
                        this.tableInputData.total = res.data.total;
                        this.tableInputData.data.list.forEach(v=> {
                            if(v.status == 'release') {
                                v.statusCN = '已发布'
                            } else if(v.status == 'wait_audited') {
                                v.statusCN = '待审核'
                            } else if (v.status == 'withdrawn') {
                                v.statusCN = '已撤回'
                            } else if(v.status == 'rejected') {
                                v.statusCN = '已驳回'
                            }
                            if(v.type == 'news') {
                                v.typeCN = '新闻评论'
                            } else if(v.type == 'product') {
                                v.typeCN = '产品评论'
                            }
                        })
                    }
                    this.tableInputData.data.title = [
                        {
                            title: '评论内容标题',
                            key: 'commemtTitle',
                            minWidth: '120',
                        },
                        {
                            title: '评论人昵称',
                            key: 'nickname',
                            minWidth: '100',
                        },
                        {
                            title: '评论人头像',
                            key: 'avatar',
                            minWidth: '100',
                            isImg: true
                        },
                        {
                            title: '审核状态',
                            key: 'statusCN',
                            minWidth: '100',
                        },
                        {
                            title: '评论内容',
                            key: 'content',
                            minWidth: '160',
                        },
                        {
                            title: '备注',
                            key: 'remark',
                            minWidth: '160',
                        },
                        {
                            title: '评论类型',
                            key: 'typeCN',
                            minWidth: '160',
                        },
                        {
                            title: '添加时间',
                            key: 'gmtCreated',
                            minWidth: '160',
                        },
                        {
                            title: '更新时间',
                            key: 'gmtModified',
                            minWidth: '160',
                        },
                    ]
                })
            },
            //新增
            addComment() {
                if (jurisdiction.indexOf("essay_discuss_add") > -1) {
                    this.updateFlag = false;
                    this.dialogFormVisible = true;
                } else {
                    //弹出消息提示用户
                    this.$alert("您没有这个权限", {
                        confirmButtonText: "确定"
                    });
                }
            },
            //查询
            search() {
                let requireData = Object.assign(this.searchForm,{
                    pageNum : this.tableInputData.pageNum,
                    pageSize : this.tableInputData.pageSize
                });
                this.getListData(requireData);
            },
            //清除查询条件
            rest(formName) {
                this.$refs[formName].resetFields();
                this.search();
            },
            //点X关闭弹窗
            closeDialog() {
                this.resetForm('ruleForm');
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
                            moreDeleteComment(obj).then(res=> {
                                if(res && res.success) {
                                    this.$message({
                                        type: "success",
                                        message: "删除成功!"
                                    });
                                    this.search();
                                    this.moreDeleteList = [];
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
            //保存
            save(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(!this.updateFlag) {
                            //新增
                            addArticleComment(this.ruleForm).then(res=> {
                                if(res && res.success) {
                                    this.resetForm('ruleForm');
                                    this.$message.success('保存成功');
                                    this.search();
                                }
                            })
                        } else {
                            //修改
                            let params = Object.assign(this.ruleForm,{
                                id: this.id
                            })
                            updateArticleComment(params).then(res=> {
                                if(res && res.success) {
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
            //修改
            edit(data) {
                this.updateFlag = true;
                this.dialogFormVisible = true;
                this.id = data.id;
                for(var item in this.ruleForm) {
                    this.ruleForm[item] = data[item];
                }
            },
            //更改审核状态
            updateStatus(data) {
                this.statusVisible = true;
                this.statusForm.status = data.status;
                this.statusForm.remark = data.remark;
                this.id = data.id;
            },
            //修改状态保存
            saveStatus() {
                updateCommentStatus({
                    id: this.id,
                    status: this.statusForm.status,
                    remark: this.statusForm.remark
                }).then(res=> {
                    if(res && res.success) {
                        this.$message.success('修改成功')
                        this.statusVisible = false;
                        this.search();
                    }
                })
            },
            //点X关闭状态修改
            closeStatusDialog() {
                this.statusVisible = false;
                this.statusForm = {
                    status: '',
                    remark: '',
                }
            },
            //删除
             delete(id) {
                this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    deleteArticleComment(id).then(res=> {
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
            //取消
            resetForm(formName) {
                this.ruleForm = {
                    avatar: '',
                    sid: '',
                    commemtTitle: '',
                    creator: '',
                    pid: '',
                    nickname: '',
                    content: '',
                    support: '',
                    type: ''
                }
                this.$refs[formName].resetFields();
                this.dialogFormVisible = false
            },
            //上传图片
             uploadavatar(params) {
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
                this.avatarLoading = true;
                upLoadImg(formData).then(res => {
                    if (res && res.success) {
                        this.avatarLoading = false;
                        this.ruleForm.avatar = res.data;
                    }
                });
            },
             //操作表单
            tableEmit(data) {
                switch(data.type) {
                    case "regetData":
                        // this.search()
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
                    case 'status':
                        this.updateStatus(data.data);
                    break;
                }
            }
        }
    }
</script>

<style>
</style>