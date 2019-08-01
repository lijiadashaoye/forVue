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
                        新增
                    </el-button>
                    <el-button
                            type="primary"
                            size="mini"
                            @click="refreshFn"
                    >
                        刷新
                    </el-button>
                    <el-select v-model="platformCode" @change="platformChangeFn">
                        <el-option
                                v-for="item in platformCodeList"
                                :key="item.code"
                                :value="item.code"
                                :label="item.name"
                        >
                        </el-option>
                    </el-select>
                </div>
                <div class="search">
                    <el-input
                            type="text"
                            placeholder="请输入版本名称"
                            prefix-icon="el-icon-search"
                            v-model="versionNo"
                            @input="search">
                    </el-input>
                </div>
            </div>
        </div>

        <div id="forTable">
            <isTable
                    :inputData='this.$store.state.clientVersion.clientVersionList'
                    @tableEmit='tableEmit'
            />
        </div>
        <!-- 修改/详情的弹框 -->
        <div class="form-data">
            <el-dialog :close-on-click-modal='false' :visible.sync="dialogVisible" width="60%" :title="title">
                <el-form ref="form" :model="ruleForm" :rules="rule" label-width="200px" label-position="left">
                    <el-form-item label="app标识">
                        <el-select v-model="ruleForm.appChannelCode">
                            <el-option
                                    v-for="item in appChannelCodeList"
                                    :key="item.code"
                                    :value="item.code"
                                    :label="item.name"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="客户端平台名称" prop="platformCode">
                        <template>
                            <el-radio v-model="ruleForm.platformCode" label="android">安卓</el-radio>
                            <el-radio v-model="ruleForm.platformCode" label="ios">苹果</el-radio>
                        </template>
                    </el-form-item>
                    <el-form-item label="版本号" prop="versionNo">
                        <el-input type="number" v-model="ruleForm.versionNo"></el-input>
                    </el-form-item>
                    <el-form-item label="版本名" prop="versionName">
                        <el-input v-model="ruleForm.versionName"></el-input>
                    </el-form-item>
                    <el-form-item label="渠道" prop="installChannel" v-if="ruleForm.platformCode == 'android'">
                        <el-input v-model="ruleForm.installChannel"></el-input>
                    </el-form-item>
                    <el-form-item label="更新说明" prop="updateInstructions">
                        <el-input type="textarea" rows="4" v-model="ruleForm.updateInstructions"></el-input>
                    </el-form-item>
                    <el-form-item label="更新版本页面" prop="updateVersionPage">
                        <quill-editor
                            v-model="ruleForm.updateVersionPage"
                        ></quill-editor>
                    </el-form-item>
                    <el-form-item label="下载地址" prop="downloadUrl">
                        <el-input v-model="ruleForm.downloadUrl"></el-input>
                    </el-form-item>
                    <el-form-item label="弹框提示背景图" prop="backgroundUrl">
                        <el-upload
                            class="avatar-uploader"
                            action="customize"
                            :show-file-list="false"
                            :http-request="uploadLogo"
                            >
                            <img v-if="ruleForm.backgroundUrl" :src="ruleForm.backgroundUrl" class="avatar">
                            <div v-else>
                                <el-button>选择图片<br/><span style="font-size:12px;color:red">不能大于2M</span><br/><span style="font-size:12px;color:red">jpg/png/gif/jpeg格式</span></el-button>
                            </div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="是否强制更新" prop="forcedUpdate">
                        <template>
                            <el-radio v-model="ruleForm.forcedUpdate" label="YES">是</el-radio>
                            <el-radio v-model="ruleForm.forcedUpdate" label="NO">否</el-radio>
                        </template>
                    </el-form-item>
                    <el-form-item label="审核中" prop="underReview">
                        <template>
                            <el-radio v-model="ruleForm.underReview" label="YES">是</el-radio>
                            <el-radio v-model="ruleForm.underReview" label="NO">否</el-radio>
                        </template>
                    </el-form-item>
                    <el-form-item label="是否弹出更新提示框" prop="hint">
                        <template>
                            <el-radio v-model="ruleForm.hint" label="YES">是</el-radio>
                            <el-radio v-model="ruleForm.hint" label="NO">否</el-radio>
                        </template>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancelFn">取 消</el-button>
                    <el-button type="primary" @click="saveFn('form')">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapMutations } from 'vuex';
    import isTable from '../../../components/isTable/isTable';
    import { clientVersion_del,clientVersion_add,clientVersion_edit }  from '../../../api/setting_use';
    import { upLoadImg } from '../../../api/setting_use.js';

    export default {
        components: {
            isTable
        },
        data() {
            return {
                title: '新增', // 弹框title
                platformCode: 'android', // 客户端code
                platformCodeList: [
                    {
                        code: 'android',
                        name: '安卓'
                    },
                    {
                        code: 'ios',
                        name: '苹果'
                    }
                ], // 客户端列表
                appChannelCodeList: [ // app 标识
                    { code: 'bicai', name: '比财' },
                    { code: 'ancai', name: '安财' }
                ],
                id: '', // 保存id
                dialogVisible: false, // 新增和编辑弹框
                pageName: '',
                versionNo: '', // 版本号
                ruleForm: {
                    updateVersionPage: '',//更新版本页面
                    appChannelCode: 'bicai',
                    appChannelName: '',
                    platformCode: 'android',
                    platformName: '',
                    versionNo: '',
                    versionName: '',
                    installChannel: '',
                    updateInstructions: '',
                    forcedUpdate: 'YES',
                    underReview: 'YES',
                    hint: 'YES',
                    status: '',
                    downloadUrl: '',//下载地址
                    backgroundUrl: '',//图片
                }, // 安卓表单数据
                rule: {
                    platformCode: [
                        { required: true, message: '请选择客户端', trigger: 'change' },
                    ],
                    appChannelCode: [
                        { required: true, message: '请选择app标识', trigger: 'change' },
                    ],
                    downloadUrl: [
                        { required: true, message: '请输入下载地址', trigger: 'blur' },
                    ],
                    versionNo: [
                        { required: true, message: '请输入版本', trigger: 'blur' },
                    ],
                    versionName: [
                        { required: true, message: '请输入内容版本', trigger: 'blur' },
                    ],
                    updateVersionPage: [
                        { required: true, message: '请输入版本页面', trigger: 'change' },
                    ],
                    installChannel: [
                        { required: true, message: '请输入渠道', trigger: 'blur' },
                    ],
                    forcedUpdate: [
                        { required: true, message: '请选择是否强制更新', trigger: 'change' },
                    ],
                    underReview: [
                        { required: true, message: '请选择是否审核中', trigger: 'change' },
                    ],
                    hint: [
                        { required: true, message: '请选择是否弹出更新提示框', trigger: 'change' },
                    ],
                    backgroundUrl: [
                        { required: true, message: '请上传图片', trigger: 'change' },
                    ]
                }, // 验证
            }
        },
        mounted() {
            this.userDo();
            this.pageName = this.$route.name.trim();
            this.getList({
                versionNo: this.versionNo,
                platformCode: this.platformCode
            });
            this.$store.state.clientVersion.clientVersionList.data.title = [
                {
                    title: "App",
                    key: "appChannelName",
                    minWidth: "80"
                },{
                    title: "版本名",
                    key: "versionName",
                    minWidth: "120"
                },{
                    title: "版本号",
                    key: "versionNo",
                    minWidth: "120",
                },{
                    title: "更新说明",
                    key: "updateInstructions",
                    minWidth: "120"
                },{
                    title: "强制更新",
                    key: "forcedUpdateText",
                    minWidth: "80"
                },{
                    title: "审核中",
                    key: "underReviewText",
                    minWidth: "120"
                },{
                    title: "是否弹出更新提示框",
                    key: "hintText",
                    minWidth: "120",
                },{
                    title: "创建时间",
                    key: "gmtCreated",
                    minWidth: "100"
                },{
                    title:"创建人",
                    key:"creatorName",
                    minWidth:"200"
                },{
                    title:"最后修改时间",
                    key:"gmtModified",
                    minWidth:"200"
                },{
                    title: "最后修改人",
                    key: "modifierName",
                    minWidth: "200",
                }
            ]
            if (this.platformCode == 'android') {
                this.$store.state.clientVersion.clientVersionList.data.title.splice(2,0,{
                    title: "渠道",
                    key: "installChannel",
                    minWidth: "120",
                })
            } else {
                this.$store.state.clientVersion.clientVersionList.data.title.splice(2,1)
            }
        },
        methods: {
            ...mapMutations({
                userDo: 'clientVersion/userDo'
            }),
            ...mapActions({
                getList: 'clientVersion/getList'
            }),
            // 搜索
            search() {
                this.getList({
                    versionName: this.versionNo,
                    platformCode: this.platformCode,
                    pageNum: 1,
                    pageSize: this.$store.state.clientVersion.clientVersionList.pageSize
                })
            },
            // 切换客户端
            platformChangeFn() {
                if (this.platformCode == 'android') {
                    this.$store.state.clientVersion.clientVersionList.data.title.splice(2,0,{
                        title: "渠道",
                        key: "installChannel",
                        minWidth: "120",
                    })
                } else {
                    this.$store.state.clientVersion.clientVersionList.data.title.splice(2,1)
                }
                this.getList({
                    versionNo: this.versionNo,
                    platformCode: this.platformCode
                })
            },
            // 详情接口
            infoFn(row) {
                this.title = '编辑'
                this.dialogVisible = true
                this.ruleForm.multilingual = row.multilingual
                this.ruleForm.platformCode = row.platformCode
                this.ruleForm.platformName = row.platformCode
                this.ruleForm.appChannelCode = row.appChannelCode
                this.ruleForm.appChannelName = row.appChannelName
                this.ruleForm.versionNo = row.versionNo
                this.ruleForm.versionName = row.versionName
                this.ruleForm.installChannel = row.installChannel
                this.ruleForm.updateInstructions = row.updateInstructions
                this.ruleForm.forcedUpdate = row.forcedUpdate
                this.ruleForm.underReview = row.underReview
                this.ruleForm.hint = row.hint
                this.ruleForm.status = row.status
                this.ruleForm.backgroundUrl = row.backgroundUrl
                this.ruleForm.downloadUrl = row.downloadUrl
                this.ruleForm.updateVersionPage = row.updateVersionPage
            },
            //跳转到创建页
            addAdverFn() {
                let jurisdiction = JSON.parse(localStorage.getItem("buttenpremissions"));
                if (jurisdiction.indexOf("client_version_add") > -1) {
                    this.id = ''
                    this.ruleForm = {
                        multilingual: 'CN',
                        platformCode: 'android',
                        appChannelCode: 'bicai',
                        versionNo: '',
                        versionName: '',
                        installChannel: '',
                        updateInstructions: '',
                        forcedUpdate: 'YES',
                        underReview: 'YES',
                        hint: 'YES',
                        status: '',
                        backgroundUrl: '',
                        downloadUrl: '',
                        updateVersionPage: ''
                    }, // 安卓表单数据
                        this.dialogVisible = true
                        this.title = '新增'
                } else {
                    //弹出消息提示用户
                    this.$alert("您没有这个权限", {
                        confirmButtonText: "确定"
                    });
                }
            },

            uploadLogo(params){
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
                upLoadImg(formData).then(res=> {
                if(res.success){
                        this.ruleForm.backgroundUrl = this.$ImgBaseUrl + res.data
                    }
                })
            },

            tableEmit(data) {
                switch (data.type) {
                    case "regetData": // 分页的emit
                        this.getList({
                            versionNo: this.versionNo,
                            platformCode: this.platformCode
                        });
                        break;
                    case "edit": // 编辑按钮
                        this.id = data.data.id
                        this.infoFn(data.data)
                        break;
                    case "delete": // 单独删除按钮
                        this.delete(data.data)
                        break;
                    case "detail":
                }
            },
            delete: function (data) {
                this.$confirm('确认要删除'+ data.versionNo + '版本信息吗').then(() => {
                    clientVersion_del({id:data.id}).then((res)=>{
                        if (res.success) {
                            this.$message.success('删除成功')
                        } else {
                            this.$message.error('删除失败')
                        }
                        this.getList({
                            versionNo: this.versionNo,
                            platformCode: this.platformCode
                        })
                    })
                }).catch(()=>{})
            },
            // 刷新
            refreshFn() {
                this.$store.state.clientVersion.clientVersionList.loading = true;
                setTimeout(()=>{
                    this.$store.state.clientVersion.clientVersionList.loading = false;
                    this.getList({
                        versionNo: this.versionNo,
                        platformCode: this.platformCode
                    })
                },1000)
            },
            // 取消
            cancelFn() {
                this.id = ''
                this.ruleForm = {
                    updateVersionPage: '',//更新版本页面
                    appChannelCode: 'bicai',
                    appChannelName: '',
                    platformCode: 'android',
                    platformName: '',
                    versionNo: '',
                    versionName: '',
                    installChannel: '',
                    updateInstructions: '',
                    forcedUpdate: 'YES',
                    underReview: 'YES',
                    hint: 'YES',
                    status: '',
                    downloadUrl: '',//下载地址
                    backgroundUrl: '',//图片
                }, // 安卓表单数据
                    this.dialogVisible = false
            },
            // 安卓保存
            saveFn(form) {
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        let params = {
                            platformCode: this.ruleForm.platformCode,
                            platformName: this.ruleForm.platformCode == 'android' ? '安卓' : '苹果',
                            appChannelCode: this.ruleForm.appChannelCode,
                            appChannelName: this.ruleForm.appChannelCode == 'bicai' ? '比财' : '安财',
                            versionNo: this.ruleForm.versionNo,
                            versionName: this.ruleForm.versionName,
                            updateInstructions: this.ruleForm.updateInstructions,
                            forcedUpdate: this.ruleForm.forcedUpdate,
                            underReview: this.ruleForm.underReview,
                            hint: this.ruleForm.hint,
                            status: this.ruleForm.status,
                            updateVersionPage: this.ruleForm.updateVersionPage,
                            downloadUrl: this.ruleForm.downloadUrl,
                            backgroundUrl: this.ruleForm.backgroundUrl
                        }
                        if (this.ruleForm.platformCode == 'android') {
                            params.installChannel = this.ruleForm.installChannel
                        }
                        if (this.id) {
                            params.id = this.id
                            clientVersion_edit(params).then((res) => {
                                if (res.success) {
                                    this.dialogVisible = false
                                    this.getList({
                                        versionNo: this.versionNo,
                                        platformCode: this.platformCode
                                    })
                                    this.$message.success('编辑成功')
                                } else {
                                    this.$message.success('编辑失败')
                                }
                            })
                        } else {
                            clientVersion_add(params).then((res) => {
                                if (res &&　res.success) {
                                    this.dialogVisible = false
                                    this.getList({
                                        versionNo: this.versionNo,
                                        platformCode: this.platformCode
                                    })
                                    this.$message.success('新增成功')
                                } else {
                                    this.$message.success('新增失败')
                                }
                            })
                        }
                    }
                })
            },

        }
    }
</script>

<style lang="scss" scoped>
    .form-data{
        .el-input{
            width: 400px;
        }
    }
    img{
        width:200px;
        height:200px;
    }
    .adverAdd {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 20px;
        box-sizing: border-box;
        align-items: center;
        .el-select{
            margin-left: 10px;
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
</style>
