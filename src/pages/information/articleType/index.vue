<template>
    <div class="componentWaper">
        <div id="forHeader">
            <p class="isPageName">
                <span :class="env?'lineSpan1':'lineSpan'">|</span>
                位置：{{$store.state.for_layout.titles}}{{pageName}}
            </p>
            <el-form :inline="true" :model="searchForm" :rules="searchRules" ref="searchForm" class="demo-ruleForm">
                <el-form-item label="栏目名称" prop="name">
                    <el-input v-model="searchForm.name" size='mini'></el-input>
                </el-form-item>
                <el-form-item label="栏目介绍" prop="description">
                    <el-input v-model="searchForm.description" size='mini'></el-input>
                </el-form-item>
                
                <el-form-item>
                    <el-button size="mini"  type="success" @click='search'>查询</el-button>
                    <el-button size="mini"  type="info" @click='rest("searchForm")'>清除</el-button>
                    <el-button size="mini"  type="primary" @click='addArticleType'>新增</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div id="forTable">
            <isTable :inputData="tableInputData" @tableEmit="tableEmit"/>
        </div>
         <el-dialog :title="updateFlag ? '修改文章栏目' : '新增文章栏目'" :visible.sync="dialogFormVisible" :close-on-click-modal='false' :before-close="closeDialog">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" label-position="left" class="demo-ruleForm">
                <el-form-item label="栏目名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="栏目介绍" prop="description">
                    <el-input v-model="ruleForm.description"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input v-model="ruleForm.sort"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-select v-model="ruleForm.columnType" placeholder="请选择">
                        <el-option
                        v-for="item in columnTypeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button size="mini"  type="primary" @click='save("ruleForm")'>保存</el-button>
                    <el-button size="mini"  @click='restForm("ruleForm")'>取消</el-button>
                </el-form-item>
            </el-form>
         </el-dialog>
    </div>
</template>

<script>
    import isTable from '@/components/isTable/isTable';
    import { 
        articleTypeList,
        addArticleType,
        updateArticleType,
        deleteArticleType
    } from '@/api/informationApi';
    let jurisdiction = JSON.parse(sessionStorage.getItem("buttenpremissions"));
    export default {
        components: {
            isTable,
        },
        data() {
            return {
                pageName: '',
                env: null,
                updateFlag: false,
                dialogFormVisible: false,
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
                    name: "",
                    description: ""
                },
                searchRules: {},
                id: '',
                ruleForm: {
                    name: '',
                    description: '',
                    sort: '',
                    columnType: '',
                },
                columnTypeList: [
                    {
                        label: '固定栏目',
                        value: 'fixed_column'
                    },
                    {
                        label: '我的栏目',
                        value: 'my_column'
                    },
                    {
                        label: '推荐栏目',
                        value: 'recommend_coumn'
                    },
                ],
                rules: {
                    name: [{ required: true, message: "请输入", trigger: "blur" }],
                    description: [{ required: true, message: "请输入", trigger: "blur" }],
                    sort: [
                        { required: true, message: "请输入", trigger: "blur" },
                        { pattern: /^[+]{0,1}(\d+)$/, message: "只能输入正整数", trigger: "blur" }
                    ],
                    columnType: [{ required: true, message: "请选择", trigger: "change" }],
                }
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
                if (jurisdiction.indexOf('essay_title_upd') > -1) {
                    this.tableInputData.data.custom.push({
                        text: "修改",
                        type: "warning",
                        size: "small",
                        emit: "edit"
                    });
                }
                if (jurisdiction.indexOf('essay_title_del') > -1) {
                    this.tableInputData.data.custom.push({
                        text: '删除',
                        type: "danger",
                        size: "mini",
                        emit: "delete"
                    });
                }
            },
            //列表数据
            getListData( data = {} ) {
                articleTypeList(data).then(res=> {
                    if(res && res.success) {
                        this.tableInputData.data.list = res.data.list;
                        this.tableInputData.total = res.data.total;
                        this.tableInputData.data.list.forEach(v=> {
                            if(v.columnType == 'fixed_column') {
                                v.columnTypeCN = '固定栏目'
                            }else if(v.columnType == 'my_column') {
                                v.columnTypeCN = '我的栏目'
                            }else if(v.columnType == 'recommend_coumn') {
                                v.columnTypeCN = '推荐栏目'
                            }
                        })
                    }
                    this.tableInputData.data.title = [
                        {
                            title: '文章栏目名',
                            key: 'name',
                            minWidth: '100'
                        },
                        {
                            title: '栏目介绍',
                            key: 'description',
                            minWidth: '100'
                        },
                        {
                            title: '排序',
                            key: 'sort',
                            minWidth: '80'
                        },
                        {
                            title: '栏目类型',
                            key: 'columnTypeCN',
                            minWidth: '100'
                        },
                        {
                            title: '创建人',
                            key: 'creatorName',
                            minWidth: '100'
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
                })
            },
            //新增
            addArticleType() {
                if (jurisdiction.indexOf("essay_title_add") > -1) {
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
            //清楚查询条件
            rest(formName) {
                this.$refs[formName].resetFields();
            },
            //点击修改
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
                    deleteArticleType(id).then(res=> {
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
                            addArticleType(this.ruleForm).then(res=> {
                                if(res && res.success) {
                                    this.restForm('ruleForm');
                                    this.$message.success('保存成功');
                                    this.search();
                                }
                            })
                        } else {
                            //修改
                            let params = Object.assign(this.ruleForm,{
                                id: this.id
                            })
                            updateArticleType(params).then(res=> {
                                if(res && res.success) {
                                    this.restForm('ruleForm');
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
            //取消
            restForm(formName) {
                this.dialogFormVisible = false;
                this.$refs[formName].resetFields();
                this.ruleForm = {
                    name: '',
                    description: '',
                    sort: '',
                    columnType: '',
                }
            },
            //关闭弹窗
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