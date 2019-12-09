<template>
    <div class="componentWaper">
        <div id="forHeader">
            <p class="isPageName">
                <span :class="env?'lineSpan1':'lineSpan'">|</span>
                位置：{{$store.state.for_layout.titles}}{{pageName}}
            </p>
            <el-form :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm" label-position="left" class="demo-ruleForm">
                <el-form-item label="会员Id:" prop="memberId">
                    <el-input v-model="ruleForm.memberId" size='mini'></el-input>
                </el-form-item>
                <el-form-item label="登录类型:" prop="loginType">
                    <el-select v-model="ruleForm.loginType" placeholder="请选择" filterable clearable size='mini'>
                        <el-option
                        v-for="item in loginTypeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="设备Id:" prop="deviceId">
                    <el-input v-model="ruleForm.deviceId" size='mini'></el-input>
                </el-form-item>
                <el-form-item label="登录账号:" prop="uuid">
                    <el-input v-model="ruleForm.uuid" size='mini'></el-input>
                </el-form-item>
                <el-form-item label="登录开始时间:" prop="loginStartTime">
                    <el-date-picker
                        v-model="ruleForm.loginStartTime"
                        size='mini'
                        type="datetime"
                        format='yyyy-MM-dd HH:mm:ss'
                        value-format='yyyy-MM-dd HH:mm:ss'
                        placeholder="开始时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="登录结束时间:" prop="loginEndTime">
                    <el-date-picker
                        v-model="ruleForm.loginEndTime"
                        size='mini'
                        type="datetime"
                        format='yyyy-MM-dd HH:mm:ss'
                        value-format='yyyy-MM-dd HH:mm:ss'
                        placeholder="开始时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size='mini' @click="search">查询</el-button>
                    <el-button type="info" @click="resetForm('ruleForm')" size='mini'>清除</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div id="forTable">
            <isTable :inputData="tableInputData" @tableEmit="tableEmit"/>
        </div>
    </div>
</template>

<script>
import isTable from '../../../components/isTable/isTable';
import { login_record_list } from '../../../api/setting_use';
    export default {
        components: {
            isTable
        },
        data() {
            return {
                pageName: '',
                env: null,
                ruleForm: {
                    memberId: '',
                    loginType: '',
                    deviceId: '',
                    uuid: '',
                    loginStartTime: '',
                    loginEndTime: ''
                },
                rules: {},
                loginTypeList: [
                    {
                        label: 'QQ',
                        value: 'QQ'
                    },
                    {
                        label: '微信',
                        value: 'WECHAT'
                    },
                    {
                        label: '谷歌',
                        value: 'GOOGLE'
                    },
                    {
                        label: '脸书',
                        value: 'FACEBOOK'
                    },
                    {
                        label: '推特',
                        value: 'TWITTER'
                    },
                    {
                        label: '苹果',
                        value: 'APPLE'
                    },
                    {
                        label: '一键登录',
                        value: 'ONE_CLICK'
                    },
                    {
                        label: '账号登录',
                        value: 'ACCOUNT_PASSWORD'
                    },
                    {
                        label: '手机验证码',
                        value: 'MOBILE'
                    },
                ],
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
            });
        },
        methods: {
            //查询
            search() {
                let pageObj = {
                    pageNum: this.tableInputData.pageNum,
                    pageSize: this.tableInputData.pageSize
                }
                const searchObj = Object.assign(this.ruleForm,pageObj);
                this.getData(searchObj);
            },
            //清除查询条件
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.getData({
                    pageNum: this.tableInputData.pageNum,
                    pageSize: this.tableInputData.pageSize
                });
            },
            //列表数据
            getData(data) {
                login_record_list(data).then(res=> {
                    if(res && res.success) {
                        this.tableInputData.data.list = res.data.list;
                        this.tableInputData.total = res.data.total;
                        this.tableInputData.data.list.forEach(v=> {
                            if(v.loginType == 'QQ') {
                                v.loginTypeCN = 'QQ'
                            } else if(v.loginType == 'WECHAT'){
                                v.loginTypeCN = '微信'
                            } else if(v.loginType == 'GOOGLE'){
                                v.loginTypeCN = '谷歌'
                            } else if(v.loginType == 'FACEBOOK'){
                                v.loginTypeCN = '脸书'
                            } else if(v.loginType == 'TWITTER'){
                                v.loginTypeCN = '推特'
                            } else if(v.loginType == 'APPLE'){
                                v.loginTypeCN = '苹果'
                            } else if(v.loginType == 'ONE_CLICK'){
                                v.loginTypeCN = '一键登录'
                            } else if(v.loginType == 'ACCOUNT_PASSWORD'){
                                v.loginTypeCN = '账号登录'
                            } else if(v.loginType == 'MOBILE'){
                                v.loginTypeCN = '手机验证码'
                            }
                            if(v.success == 'SUCCESS') {
                                v.successCN = '是'
                            } else {
                                v.successCN = '否'
                            }
                        })
                        this.tableInputData.data.title = [
                            {
                                title: '会员ID',
                                key: 'memberId',
                                minWidth: '100',
                            },
                            {
                                title: '是否在黑名单',
                                key: 'black',
                                minWidth: '100',
                            },
                            {
                                title: '登录类型',
                                key: 'loginTypeCN',
                                minWidth: '100',
                            },
                            {
                                title: 'APP标识码',
                                key: 'appChannelCode',
                                minWidth: '100',
                            },
                            {
                                title: '设备',
                                key: 'platformCode',
                                minWidth: '100',
                            },
                            {
                                title: '是否登录成功',
                                key: 'successCN',
                                minWidth: '100',
                            },
                            {
                                title: '登录账号',
                                key: 'uuid',
                                minWidth: '120',
                            },
                            {
                                title: '设备ID',
                                key: 'deviceId',
                                minWidth: '200',
                            },
                            {
                                title: '设备版本',
                                key: 'deviceVersion',
                                minWidth: '100',
                            },
                            {
                                title: '描述',
                                key: 'description',
                                minWidth: '100',
                            },
                            {
                                title: '登录时间',
                                key: 'gmtCreated',
                                minWidth: '160',
                                sortable: true
                            },
                        ]
                    }
                })
            },
            //表格操作
            tableEmit(data) {
                switch (data.type) {
                    case "regetData": // 分页的emit
                        this.search()
                    break;
                }
            }
        }
    }
</script>

<style>

</style>