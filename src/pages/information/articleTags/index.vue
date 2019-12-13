<template>
    <div class="componentWaper">
        <div id="forHeader">
            <p class="isPageName">
                <span :class="env?'lineSpan1':'lineSpan'">|</span>
                位置：{{$store.state.for_layout.titles}}{{pageName}}
            </p>
            <el-form :inline="true" :model="searchForm" :rules="searchRules" ref="searchForm" class="demo-ruleForm">
                <el-form-item label="文章栏目名" prop="name">
                    <el-input v-model="searchForm.name" size='mini'></el-input>
                </el-form-item>
                <el-form-item label="类型介绍" prop="description">
                    <el-input v-model="searchForm.description" size='mini'></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button size="mini"  type="success" @click='search'>查询</el-button>
                    <el-button size="mini"  type="info" @click='rest("searchForm")'>清除</el-button>
                    <el-button size="mini"  type="primary" @click='addarticleTags'>新增</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div id="forTable">
            <isTable :inputData="tableInputData" @tableEmit="tableEmit"/>
        </div>
         <el-dialog :title="updateFlag ? '修改文章标签' : '新增文章标签'" :visible.sync="dialogFormVisible" :close-on-click-modal='false' :before-close="closeDialog">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" label-position="left" class="demo-ruleForm">
                <el-form-item label="文章类型名" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="新闻栏目ID" prop="newsTypeId">
                    <el-input v-model="ruleForm.newsTypeId"></el-input>
                </el-form-item>
                <el-form-item label="类型介绍" prop="description">
                    <el-input v-model="ruleForm.description"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click='save("ruleForm")'>保存</el-button>
                    <el-button type="info" @click='restForm("ruleForm")'>取消</el-button>
                </el-form-item>
            </el-form>
         </el-dialog>
    </div>
</template>

<script>
    import isTable from '@/components/isTable/isTable';
    import {
        articleTagsList,
        addArticleTags,
        deleteArticleTag,
        updateArticleTag
    } from '@/api/informationApi'
    let jurisdiction = JSON.parse(sessionStorage.getItem("buttenpremissions"));
    export default {
        components: {
            isTable,
        },
        data() {
            return {
                pageName: '',
                env: null,
                tableInputData: {
                    // 传给table子组件的数据
                    noIndex: true,
                    checkBox: false, // 判断需要不需要添加选择框
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
                searchForm: {
                    name: '',
                    description: ''
                },
                searchRules: {},
                updateFlag: false,
                dialogFormVisible: false,
                id: '',
                ruleForm: {
                    name: '',
                    description: '',
                    newsTypeId: '',
                },
                rules: {
                    name: [{ required: true, message: "请输入", trigger: "blur" }],
                    description: [{ required: true, message: "请输入", trigger: "blur" }],
                    newsTypeId: [
                        { required: true, message: "请输入", trigger: "blur" },
                        { pattern: /^[+]{0,1}(\d+)$/, message: "只能输入正整数", trigger: "blur" }
                    ],
                },
            }
        },
        mounted() {
            this.pageName = this.$route.name;
            this.getListData();
            this.userDo();
        },
        methods: {
            //权限认证
            userDo() {
                this.tableInputData.data.custom = [];
                if (jurisdiction.indexOf('essay_lable_upd') > -1) {
                    this.tableInputData.data.custom.push({
                        text: "修改",
                        type: "warning",
                        size: "small",
                        emit: "edit"
                    });
                }
                if (jurisdiction.indexOf('essay_lable_upd') > -1) {
                    this.tableInputData.data.custom.push({
                        text: '删除',
                        type: "danger",
                        size: "mini",
                        emit: "delete"
                    });
                }
            },
            //获取列表数据
            getListData(data = {}) {
                let requireData = Object.assign(data,{
                    pageNum : this.tableInputData.pageNum,
                    pageSize : this.tableInputData.pageSize
                });
                articleTagsList(data).then(res=> {
                    // console.log(res)
                    if(res && res.success) {
                        this.tableInputData.data.list = res.data.list
                        this.tableInputData.total = res.data.total
                    }
                })
                this.tableInputData.data.title = [
                    {
                        title: '文章类型名',
                        key: 'name',
                        minWidth: '120'
                    },
                    {
                        title: '新闻栏目ID',
                        key: 'newsTypeId',
                        minWidth: '120'
                    },
                    {
                        title: '类型介绍',
                        key: 'description',
                        minWidth: '120'
                    },
                    {
                        title: '创建时间',
                        key: 'gmtCreated',
                        minWidth: '160'
                    },
                    {
                        title: '修改时间',
                        key: 'gmtCodified',
                        minWidth: '160'
                    },
                ]
            },
            //新增
            addarticleTags() {
                if (jurisdiction.indexOf("essay_lable_add") > -1) {
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
                this.getListData(this.searchForm);
            },
            //清楚查询条件
            rest(formName) {
                this.$refs[formName].resetFields()
                this.search();
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
            //删除
            delete(id) {
                this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    deleteArticleTag(id).then(res=> {
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
            //保存
            save(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(!this.updateFlag) {
                            //新增
                            addArticleTags(this.ruleForm).then(res => {
                                if(res && res.success) {
                                    this.$message.success('保存成功');
                                    this.restForm('ruleForm')
                                    this.search();
                                }
                            })
                        } else {
                            //修改
                            let params = Object.assign(this.ruleForm,{
                                id: this.id
                            })
                            updateArticleTag(params).then(res=> {
                                if(res && res.success) {
                                    this.$message.success('保存成功');
                                    this.restForm('ruleForm')
                                    this.search();
                                }
                            })
                        }
                    } else {
                        return false;
                    }
                });
            },
            restForm(formName) {
                this.dialogFormVisible = false;
                this.$refs[formName].resetFields();
                this.ruleForm = {
                    name: '',
                    description: '',
                    newsTypeId: '',
                };
            },
            //关闭弹窗 X
            closeDialog() {
                this.restForm('ruleForm');
            },
            //操作表单
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
                }
            }
        }
    }
</script>

<style>

</style>