<template>
    <div class="componentWaper">
        <div id="forHeader">
            <h3 style="margin-bottom:10px">
                {{pageName}}
            </h3>
            <div class="adverAdd">
                <div class="addBtn">
                </div>
                <div class="search">
                    <el-input
                        placeholder="请输入建议内容"
                        prefix-icon="el-icon-search"
                        v-model="keyWords"
                        @input="search">
                    </el-input>
                </div>

            </div>
        </div>

        <div id="forTable">
            <isTable
                :inputData='this.$store.state.proposal.proposalList'
                @tableEmit='tableEmit'
            />
        </div>
        <!-- 转发的弹框 -->
        <el-dialog :close-on-click-modal='false' :visible.sync="dialogVisible" width="60%" title="转发建议">
            <el-form ref="form" :model="ruleForm" :rules="rule" label-width="200px" label-position="left">
                <el-form-item label="邮箱地址" prop="emailAddr">
                    <el-input type="email" v-model="ruleForm.emailAddr"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelFn">取 消</el-button>
                <el-button type="primary" @click="saveFn('form')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { mapActions, mapMutations } from 'vuex';
    import isTable from '../../../components/isTable/isTable';
    import { proposal_del }  from '../../../api/setting_use'

    export default {
        components: {
            isTable
        },
        data() {
            let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
            var testEmailFn = function(rule,value,callBack){
                if (!reg.test(value)) {
                    callBack(new Error('邮箱地址有误'))
                } else {
                    callBack()
                }
            }
            return {
                dialogVisible: false,
                pageName: '',
                keyWords: '', // 建议者账号和内容检索
                ruleForm: {
                    emailAddr: '', // 邮箱地址
                },
                rule: {
                    emailAddr: [
                        { required: true, message: '请输入邮箱地址 ', trigger: 'blur' },
                        { validator: testEmailFn, trigger: 'blur'}
                    ]
                }
            }
        },
        mounted() {
            this.userDo();
            this.pageName = this.$route.name;
            this.getList({
                
            });
            this.$store.state.proposal.proposalList.data.title = [
                {
                    title: "编号",
                    key: "id",
                    minWidth: "80",
                    sortable:true
                },{
                    title: "建议者账号",
                    key: "proposalNumber",
                    minWidth: "120"
                },{
                    title: "建议内容",
                    key: "proposalContent",
                    minWidth: "120",
                },{
                    title: "创建人名称",
                    key: "proposalName",
                    minWidth: "120"
                },{
                    title: "创建人邮箱",
                    key: "proposalMailbox",
                    minWidth: "80"
                },{
                    title: "有效标识",
                    key: "validStatusText",
                    minWidth: "120"
                },{
                    title: "创建时间",
                    key: "gmtCreated",
                    minWidth: "120",
                }
            ]
        },
        methods: {
            ...mapMutations({
                userDo: 'proposal/userDo'
            }),
            ...mapActions({
                getList: 'proposal/getList'
            }),
            // 搜索
            search() {
                this.getList({
                    proposalContent: this.keyWords,
                })
            },
            // 取消
            cancelFn() {
                this.ruleForm.emailAddr = ''
                this.dialogVisible = false
            },
            // 确定
            saveFn(form) {
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        this.dialogVisible = false
                        this.$message.success('转发成功')
                    }
                })
            },
            tableEmit(data) {
                switch (data.type) {
                    case "regetData": // 分页的emit
                        this.getList();
                        break;
                    case "delete": // 单独删除按钮
                        this.delete(data.data.id)
                        break;
                    case "forward": // 转发
                        this.dialogVisible = true
                }
            },
            delete: function (id) {
                this.$confirm("确认要删除吗").then(() => {
                    proposal_del({id:id}).then((res)=>{
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
