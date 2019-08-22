<template>
    <div class="componentWaper">
        <div id="forHeader">
            <h3 style="margin-bottom:10px">
                {{pageName}}
            </h3>
            <div class="adverAdd">
                <div class="addBtn">
                    <el-button
                            type="primary"
                            size="mini"
                            @click="addAdverFn"
                    >
                        新增广告
                    </el-button>
                </div>
                <div class="search">
                    <el-input
                            placeholder="请输入广告标题"
                            prefix-icon="el-icon-search"
                            v-model="advertisTitle"
                            size='mini'
                            @input="search">
                    </el-input>
                </div>

            </div>
        </div>

        <div id="forTable">
            <isTable
                :inputData='this.$store.state.advertisManager.advertisMangerList'
                @tableEmit='tableEmit'
            />
        </div>
        <!-- 修改/详情的弹框 -->
        <el-dialog :close-on-click-modal='false' :visible.sync="dialogVisible">

        </el-dialog>
    </div>
</template>

<script>
    import { mapActions, mapMutations } from 'vuex';
    import isTable from '../../../components/isTable/isTable';
    import { adverdis_del }  from '../../../api/setting_use'

    export default {
        components: {
            isTable
        },
        data() {
            return {
                dialogVisible: false,
                pageName: '',
                advertisTitle: '' // 广告关键词
            }
        },
        mounted() {
            this.$store.state.advertisManager.advertisMangerList.pageNum = 1;
            this.userDo();
            this.pageName = this.$route.name;
            this.getList({
                pageSize: this.$store.state.advertisManager.advertisMangerList.pageSize,
                pageNum: this.$store.state.advertisManager.advertisMangerList.pageNum
            });
            this.$store.state.advertisManager.advertisMangerList.data.title = [
                {
                    title: "编号",
                    key: "id",
                    minWidth: "80",
                    sortable:true
                },{
                    title: "广告标题",
                    key: "advertisTitle",
                    minWidth: "120"
                },{
                    title: "广告位置",
                    key: "adverLocText",
                    minWidth: "120",
                },{
                    title: "广告类型",
                    key: "adverTypeText",
                    minWidth: "120"
                },{
                    title: "广告排序",
                    key: "sort",
                    minWidth: "80"
                },{
                    title: "可见类型",
                    key: "visualTypeText",
                    minWidth: "120"
                },{
                    title: "显示类型",
                    key: "showTypeText",
                    minWidth: "120",
                },{
                    title: "App",
                    key: "appChannelName",
                    minWidth: "100"
                },{
                    title:"开始时间",
                    key:"stratTime",
                    minWidth:"200"
                },{
                    title:"结束时间",
                    key:"endTime",
                    minWidth:"200",
                    sortable: true
                },{
                    title: "创建时间",
                    key: "gmtCreated",
                    minWidth: "200",
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
                userDo: 'advertisManager/userDo'
            }),
            ...mapActions({
                getList: 'advertisManager/getList'
            }),
            // 搜索
            search() {
                this.getList({
                    pageSize: 1,
                    pageNum: this.$store.state.advertisManager.advertisMangerList.pageNum,
                    advertisTitle: this.advertisTitle
                })
            },
            //跳转到创建页
            addAdverFn() {
                let jurisdiction = JSON.parse(localStorage.getItem("buttenpremissions"));
                if (jurisdiction.indexOf("advertis_manage_add") > -1) {
                    this.$router.push({
                        path:'/home/setting/advertis-manage/add'
                    })
                } else {
                    //弹出消息提示用户
                    this.$alert("您没有这个权限", {
                        confirmButtonText: "确定"
                    });
                }
            },

            tableEmit(data) {
                switch (data.type) {
                    case "regetData": // 分页的emit
                        this.getList({
                            advertisTitle: this.advertisTitle
                        });
                        break;
                    case "edit": // 编辑按钮
                        this.$router.push({
                            path: '/home/setting/advertis-manage/add',
                            query: {
                                id: data.data.id
                            }
                        })
                        break;
                    case "delete": // 单独删除按钮
                        this.delete(data.data.id)
                        break;
                    case "detail":
                        this.$router.push({
                            path: '/home/setting/advertis-manage/detail',
                            query: {id: data.data.id}
                        })
                }
            },
            delete: function (id) {
                this.$confirm("确认要删除吗").then(() => {
                    adverdis_del({id:id}).then((res)=>{
                        if (res) {
                            this.$message.success('删除成功')
                        } else {
                            this.$message.error('删除失败')
                        }
                        this.getList()
                    })
                }).catch(()=>{})
            }

        }
    }
</script>

<style lang="scss">
    .adverAdd {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 20px;
        box-sizing: border-box;
        align-items: center;
        .search {
            width: 300px;
            display: flex;
            justify-content: space-between;
            .el-input{
                width:200px;
            }
        }
    }
</style>
