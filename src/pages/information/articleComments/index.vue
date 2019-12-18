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
                    <el-button size="mini"  type="primary" @click='addComment'>新增</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div id="forTable">
            <isTable :inputData="tableInputData" @tableEmit="tableEmit"/>
        </div>
    </div>
</template>

<script>
    import isTable from '@/components/isTable/isTable';
    import { 
        articleCommentList
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
            }
        },
        mounted() {
            this.pageName = this.$route.name;
            this.getListData({
                pageNum: this.tableInputData.pageNum,
                pageSize: this.tableInputData.pageSize
            })
        },
        methods: {
            //获取列表数据
            getListData(data) {
                articleCommentList(data).then(res=> {
                    if(res && res.success) {
                        this.tableInputData.data.list = res.data.list;
                        this.tableInputData.total = res.data.total;
                    }
                })
            },
            //新增
            addComment() {

            },
            //查询
            search() {

            },
            //清除查询条件
            rest(formName) {
                this.$refs[formName].resetFields();
            },

             //操作表单
            tableEmit(data) {
                switch(data.type) {
                    case "regetData":
                        // this.search()
                    break;
                    case "edit":
                        // this.edit(data.data)
                    break;
                    case "delete":
                        // this.delete(data.data.id)
                    break;
                }
            }
        }
    }
</script>

<style>
</style>