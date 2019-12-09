<template>
    <div class="componentWaper">
        <div id="forHeader">
            <p class="isPageName">
                <span :class="env?'lineSpan1':'lineSpan'">|</span>
                位置：{{$store.state.for_layout.titles}}{{pageName}}
            </p>
            <el-button size="mini"  type="primary" @click='addArticle'>新增</el-button>
        </div>
        <div id="forTable">
            <isTable :inputData="tableInputData" @tableEmit="tableEmit"/>
        </div>
    </div>
</template>

<script>
 import { articleList } from '../../../api/informationApi';
 import isTable from '../../../components/isTable/isTable';
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
            }
        },
        mounted() {
            this.pageName = this.$route.name;
            this.env = sessionStorage.getItem("env") === "development";
            this.getData({
                pageNum: this.tableInputData.pageNum,
                pageSize: this.tableInputData.pageSize
            })
        },
        methods: {
            getData(data) {
                articleList(data).then(res=> {
                    console.log(res)
                })
            },
            addArticle() {

            },
            tableEmit(data) {

            },
        }
    }
</script>

<style>

</style>