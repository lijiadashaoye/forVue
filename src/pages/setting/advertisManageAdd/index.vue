<template>
    <div class="componentWaper">
        <div id="forHeader">
            <h3>
                {{pageName}}
            </h3>
        </div>
        <div id="forTable">
            <div class="form-box">
                <el-form ref="ruleForm" :model="ruleForm" labelWidth="200px" label-position="left">
                    <el-form-item label="app标识"
                                  :rules="[
                              { required: true, message: '请选择app标识', trigger: 'change' }
                             ]"
                    >
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
                    <el-form-item
                            label="广告标题"
                            prop="advertisTitle"
                            :rules="[
                              { required: true, message: '请输入广告标题', trigger: 'blur' }
                             ]"
                    >
                        <el-input placeholder="请输入"  v-model="ruleForm.advertisTitle"></el-input>
                    </el-form-item>
                    <el-form-item
                            label="广告副标题"
                            prop="advertisViceTitle"
                            :rules="[
                              { required: true, message: '请输入广告副标题', trigger: 'blur' }
                             ]"
                    >
                        <el-input placeholder="请输入"  v-model="ruleForm.advertisViceTitle"></el-input>
                    </el-form-item>
                    <el-form-item
                            label="广告排序"
                            prop="sort"
                            :rules="[
                              { required: true, message: '请输入广告排序', trigger: 'blur' },
                             ]"
                    >
                        <el-input placeholder="请输入" v-model="ruleForm.sort"></el-input>
                    </el-form-item>
                    <el-form-item
                            label="广告显示类型"
                            prop="showType"
                            :rules="[
                              { required: true, message: '请选择广告显示类型', trigger: 'change' },
                             ]"
                    >
                        <template>
                            <el-radio v-model="ruleForm.showType" label="BANNER">横幅</el-radio>
                            <el-radio :disabled="isAdvertisType" v-model="ruleForm.showType" label="INFORMATION">信息流</el-radio>
                        </template>
                    </el-form-item>
                    <el-form-item
                            label="广告可见类型"
                            prop="visualType"
                            :rules="[
                              { required: true, message: '请选择广告可见类型', trigger: 'change' },
                             ]"
                    >
                        <template>
                            <el-radio-group v-model="ruleForm.visualType">
                                <el-radio label="NO_LIMIT">不限定</el-radio>
                                <el-radio label="LOGIN_USER">登陆用户可见</el-radio>
                                <el-radio label="NO_LOGIN_USER">非登陆用户可见</el-radio>
                            </el-radio-group>
                        </template>
                    </el-form-item>
                    <el-form-item
                            label="广告位置"
                            prop="advertisLocation"
                            :rules="[
                              { required: true, message: '请选择广告位置', trigger: 'change' }
                             ]"
                    >
                        <el-select v-model="ruleForm.advertisLocation" placeholder="请选择">
                            <el-option
                                    v-for="item in advertisLocationList"
                                    :key="item.key"
                                    :label="item.value"
                                    :value="item.key">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item
                            label="广告类型"
                            prop="advertisType"
                            :rules="[
                              { required: true, message: '请选择广告类型', trigger: 'change' }
                             ]"
                    >
                        <el-select v-model="ruleForm.advertisType" placeholder="请选择">
                            <el-option
                                    v-for="item in advertisTypeList"
                                    :key="item.key"
                                    :label="item.value"
                                    :value="item.key">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item
                            v-if="ruleForm.advertisType == 'CURRENCY_FUND' || ruleForm.advertisType == 'FINANCING_PRODUCT' || ruleForm.advertisType == 'PURE_DEPT_FUND' || ruleForm.advertisType == 'DEPOSIT'"
                            label="关联产品"
                            prop="associatedProducts"
                            :rules="[
                              { required: true, message: '请输入关联资讯', trigger: 'change' }
                             ]"
                    >
                        <el-autocomplete
                                v-model="ruleForm.associatedProducts"
                                :fetch-suggestions="querySearchAsync"
                                placeholder="请输入内容"
                                @select="handleSelect"
                        ></el-autocomplete>
                    </el-form-item>
                    <el-form-item
                            v-if="ruleForm.advertisType == 'CONSULT_PAGE'"
                            label="关联资讯"
                            prop="relatedInformation"
                            :rules="[
                              { required: true, message: '请输入关联资讯', trigger: 'change' }
                             ]"
                    >
                        <el-autocomplete
                                v-model="ruleForm.relatedInformation"
                                :fetch-suggestions="querySearchAsync"
                                placeholder="请输入内容"
                                @select="handleSelect"
                        ></el-autocomplete>
                    </el-form-item>
                    <el-form-item
                            v-if="ruleForm.advertisType == 'EXTERNAL_LINK'"
                            label="链接地址"
                            prop="advertisUrl"
                            :rules="[
                              { required: true, message: '请输入链接地址', trigger: 'blur' }
                             ]"
                    >
                        <el-input placeholder="请输入" v-model="ruleForm.advertisUrl"></el-input>
                    </el-form-item>
                    <el-form-item
                            prop="advertisImageUrl"
                            label="广告图片"
                            :rules="[
                              { required: true, message: '请选择图片', trigger: 'change' },
                             ]"
                    >
                        <el-upload
                                class="avatar-uploader"
                                action="customize"
                                :show-file-list="false"
                                :http-request="upload"
                        >
                            <img v-if="ruleForm.advertisImageUrl" :src="ruleForm.advertisImageUrl" class="avatar">
                            <el-button v-else>选择图片</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item
                            label="广告开始时间"
                            prop="stratTime"
                            :rules="[
                              { required: true, message: '请输入广告开始时间', trigger: 'change' }
                             ]"
                    >
                        <el-date-picker
                                v-model="ruleForm.stratTime"
                                type="datetime"
                                placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item
                            label="广告结束时间"
                            prop="endTime"
                            :rules="[
                              { required: true, message: '请输入广告结束时间', trigger: 'change' }
                             ]"
                    >
                        <el-date-picker
                                v-model="ruleForm.endTime"
                                type="datetime"
                                placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="推广用户">
                    </el-form-item>
                    <el-form-item label="用户选择" prop="spreadUser">
                        <template>
                            <el-radio v-model="ruleForm.spreadUser" label="TOTAL">发送给全部用户</el-radio>
                            <el-radio v-model="ruleForm.spreadUser" label="PORTION">发送给部分用户</el-radio>
                        </template>
                    </el-form-item>
                    <el-form-item label="添加关联组" v-if="ruleForm.spreadUser != 'TOTAL'">
                        <el-select v-model="ruleForm.linkGroup" placeholder="请选择">
                            <el-option
                                    v-for="item in linkGroupList"
                                    :key="item.key"
                                    :label="item.name"
                                    :value="item.key">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="推广地区选择" v-if="ruleForm.spreadUser != 'TOTAL'">
                        <template>
                            <el-radio v-model="ruleForm.promoteArea" label="PHONE">按手机号归属地</el-radio>
                            <el-radio v-model="ruleForm.promoteArea" label="LOCATION">最后一次登录所在地</el-radio>
                        </template>
                    </el-form-item>
                    <el-form-item label="选择省份" v-if="ruleForm.spreadUser != 'TOTAL'">
                        <el-select v-model="ruleForm.spreadLocation" multiple placeholder="请选择">
                            <el-option
                                    v-for="item in spreadLocationList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="ruleForm.spreadUser != 'TOTAL'">
                        <div class="tag">
                            <el-tag
                                    v-for="tag in tagsList"
                                    :key="tag.id"
                                    closable
                                    @close="handleClose(tag)"
                            >
                                {{tag.name}}
                            </el-tag>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
            <div class="btn">
                <el-button type="primary" @click="saveFn('ruleForm')">保存</el-button>
                <el-button @click="cancelFn">取消</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {adverdis_add, adverdis_detail, adverdis_edit, upLoadImg} from '../../../api/setting_use'
    export default {
        props: {},
        components: {},
        data() {
            return {
                appChannelCodeList: [ // app 标识
                    { code: '比财', name: '比财' },
                    { code: '安财', name: '安财' }
                ],
                timeout:  null, // 关联延时
                relatedInformationList: [], // 关联资讯假数据
                associatedProductsList: [], // 关联产品假数据
                isAdvertisType: false, // 控制广告类型选择
                tagsList: [],
                pageName: "" ,// 当前页面名字
                list: [],
                spreadLocationList: [ // 地区假数据
                    {id: '0', name: '北京'},
                    {id: '1', name: '上海'},
                    {id: '2', name: '山西'}
                ], // 省份
                linkGroupList: [ // 关联组list
                    {key: 0 , name:'暂无'}
                ],
                advertisTypeList: [
                    {key: 'NOCLOCK', value: '无点击事件'},
                    {key: 'EXTERNAL_LINK', value: '外部连接'},
                    {key: 'CONSULT_PAGE', value: '咨询页'},
                    {key: 'LOGIN_PAGE', value: '登录页'},
                    {key: 'CURRENCY_FUND', value: '货币基金'},
                    {key: 'FINANCING_PRODUCT', value: '理财产品'},
                    {key: 'SHARES_FUND', value: '股票基金'},
                    {key: 'LOAN', value: '贷款'},
                    {key: 'COMPREHENSIVE_PAGE', value: '综合页'},
                    {key: 'NAW_PAGE', value: '新品页'},
                    {key: 'RECOMMEND_PAGE', value: '推荐页'},
                    {key: 'PURE_DEPT_FUND', value: '纯债产品'}
                ],// 广告类型list
                advertisLocationList: [
                    {key: 'BANNER', value: '发现横幅广告'},
                    {key: 'FIND_FINANCING', value: '发现理财圈广告'},
                    {key: 'ADD_FINANCING', value: '新增理财圈列表广告'},
                    {key: 'ADD_RANKING', value: '新增排行榜横幅广告'},
                    {key: 'ADD_SIDE', value: '新增侧边栏Banner'},
                    {key: 'ADD_HOME', value: '新增首页Banner'}
                ],// 广告位置list
                ruleForm: { // 表单数据
                    multilingual: 'CN',       // 多语言
                    advertisTitle: '',      // 标题
                    advertisViceTitle: '',  // 付标题
                    advertisLocation: '',   // 广告位置
                    appChannelCode: '比财',     // 应用渠道code
                    appChannelName: '',     // 应用渠道name
                    advertisType: '',       // 广告类型
                    advertisId: '',       // 广告id
                    sort: '',               // 广告排序
                    visualType: 'NO_LIMIT',       // 广告可见类型
                    showType: 'BANNER',     // 广告显示类型
                    advertisUrl: '',        // 广告跳转链接url
                    relatedInformation: '',        // 缺 关联资讯
                    associatedProducts: '',        // 缺 关联产品
                    spreadUser: 'TOTAL',         // 推广用户(TOTAL:全部用户 PORTION:部分用户)
                    promoteArea: '',        // 推广地区选择
                    spreadLocation: [],     // 推广地区
                    linkGroup: '',          // 关联组
                    advertisImageUrl: '',   // 广告图片地址
                    stratTime: '',          // 广告开始时间
                    endTime: ''             // 广告结束时间
                }
            };
        },
        created() {
        },
        watch:{
            ruleForm: {
                handler() {
                    if (this.ruleForm.advertisLocation == 'ADD_FINANCING') {
                        this.isAdvertisType = false
                    } else {
                        this.isAdvertisType = true
                    }
                    if (this.ruleForm.spreadLocation && this.ruleForm.spreadLocation.length >= 0) {
                        this.tagsList = []
                        for(let i = 0; i < this.spreadLocationList.length; i++){
                            for (let j = 0; j < this.ruleForm.spreadLocation.length; j++){
                                if (this.spreadLocationList[i].id == this.ruleForm.spreadLocation[j]){
                                    let obj = { id : this.spreadLocationList[i].id , name: this.spreadLocationList[i].name}
                                    this.tagsList.push(obj)
                                }
                            }
                        }
                    }
                },
                deep: true
            }
        },
        mounted() {
            if (this.$route.query.id) {
                this.pageName = '编辑广告';
                this.infoFn()
            } else {
                this.pageName = '创建广告';
            }
            this.relatedInformationList = this.loadAll()
            this.associatedProductsList = this.loadAll()
        },
        methods: {
            // 关闭tag
            handleClose(tag) {
                this.ruleForm.spreadLocation.forEach((t,i)=> {
                    if (tag.id == t) {
                        this.ruleForm.spreadLocation.splice(i,1)
                    }
                })
            },
            // 关联资讯数据
            loadAll() {
                return [
                    { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
                    { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
                    { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
                    { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
                    { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
                    { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
                    { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
                    { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
                    { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
                    { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
                    { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
                ]
            },
            // 异步查询 过滤
            querySearchAsync(queryString, cb) {
                var restaurants = this.relatedInformationList;
                var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    cb(results);
                }, 3000 * Math.random());
            },
            createStateFilter(queryString) {
                return (state) => {
                    return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            // 选中资讯
            handleSelect(item) {
                console.log(item)
            },
            //图片上传
            upload(params) {
                const _file = params.file;
                const isLt5M = _file.size / 1024 / 1024 < 5;
                var formData = new FormData();
                formData.append("file", _file);
                if (!isLt5M) {
                    this.$message.error("请上传5M以下的图片");
                    return false;
                }
                upLoadImg(formData).then(res => {
                    if (res.success) {
                        this.ruleForm.advertisImageUrl = this.$ImgBaseUrl + res.data;
                    }
                });
            },
            // 详情
            infoFn() {
                let params = {
                    id: this.$route.query.id
                }
                adverdis_detail(params).then((res) => {
                    if (res.success) {
                        this.ruleForm.multilingual = res.data.multilingual     // 多语言
                        this.ruleForm.advertisTitle = res.data.advertisTitle     // 标题
                        this.ruleForm.advertisViceTitle = res.data.advertisViceTitle   // 付标题
                        this.ruleForm.advertisLocation = res.data.advertisLocation   // 广告位置
                        this.ruleForm.appChannelCode = res.data.appChannelCode     // 应用渠道code
                        this.ruleForm.appChannelName = res.data.appChannelCode     // 应用渠道name
                        this.ruleForm.advertisType = res.data.advertisType       // 广告类型
                        this.ruleForm.sort = res.data.sort               // 广告排序
                        this.ruleForm.visualType = res.data.visualType       // 广告可见类型
                        this.ruleForm.showType = res.data.showType    // 广告显示类型
                        this.ruleForm.advertisUrl = res.data.advertisUrl        // 广告跳转链接url
                        this.ruleForm.relatedInformation = res.data.relatedInformation        // 关联资讯
                        this.ruleForm.associatedProducts = res.data.associatedProducts        // 关联产品
                        this.ruleForm.spreadUser = res.data.spreadUser         // 推广用户(TOTAL:全部用户 PORTION:部分用户)
                        this.ruleForm.promoteArea = res.data.promoteArea     // 推广地区
                        this.ruleForm.spreadLocation = res.data.spreadLocation     // 推广地区
                        this.ruleForm.linkGroup = res.data.linkGroup          // 关联组
                        this.ruleForm.advertisImageUrl = res.data.advertisImageUrl   // 广告图片地址
                        this.ruleForm.stratTime = res.data.stratTime       // 广告开始时间
                        this.ruleForm.endTime = res.data.endTime
                    }
                })
            },
            // 取消
            cancelFn() {
                this.$refs['ruleForm'].resetFields();
                this.$router.back()
            },
            // 保存
            saveFn(ruleForm) {
                this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        var params = {
                            multilingual: this.ruleForm.multilingual,      // 多语言
                            advertisTitle: this.ruleForm.advertisTitle,      // 标题
                            advertisViceTitle: this.ruleForm.advertisViceTitle,  // 付标题
                            appChannelCode: this.ruleForm.appChannelCode,     // 应用渠道code
                            appChannelName: this.ruleForm.appChannelCode,     // 应用渠道name
                            advertisType: this.ruleForm.advertisType,       // 广告类型
                            sort: this.ruleForm.sort,               // 广告排序
                            visualType: this.ruleForm.visualType,       // 广告可见类型
                            advertisLocation: this.ruleForm.advertisLocation,   // 广告位置
                            spreadUser: this.ruleForm.spreadUser,         // 推广用户(TOTAL:全部用户 PORTION:部分用户)
                            advertisImageUrl: this.ruleForm.advertisImageUrl,   // 广告图片地址
                            stratTime: new Date(this.ruleForm.stratTime).getTime(),          // 广告开始时间
                            endTime: new Date(this.ruleForm.endTime).getTime()
                        }
                        if (this.ruleForm.advertisType == 'EXTERNAL_LINK') {
                            params.advertisUrl = this.ruleForm.advertisUrl // 广告跳转链接url
                        } else if ( this.ruleForm.advertisType == 'CONSULT_PAGE') {
                            params.relatedInformation = this.ruleForm.relatedInformation // 关联咨询页
                        } else if ( this.ruleForm.advertisType == 'CURRENCY_FUND' || this.ruleForm.advertisType == 'FINANCING_PRODUCT' || this.ruleForm.advertisType == 'PURE_DEPT_FUND' || this.ruleForm.advertisType == 'DEPOSIT') {
                            params.associatedProducts = this.ruleForm.associatedProducts // 关联产品
                        }
                        if (this.ruleForm.spreadUser != 'TOTAL') {
                            params.linkGroup = this.ruleForm.linkGroup // 关联组
                            params.promoteArea = this.ruleForm.promoteArea // 推广地区选择
                            params.spreadLocation = this.ruleForm.spreadLocation // 省份
                        }
                        if (this.ruleForm.advertisLocation == 'ADD_FINANCING') {
                            params.showType = 'INFORMATION'
                        } else {
                            params.showType = 'BANNER'
                        }
                        if (this.$route.query.id) {
                            params.id = this.$route.query.id
                            adverdis_edit(params).then((res)=>{
                                if (res.success) {
                                    this.$message.success('编辑成功')
                                    this.$router.back()
                                } else {
                                    this.$message.error('编辑失败')
                                }
                            })
                        } else {
                            adverdis_add(params).then((res)=>{
                                if (res.success) {
                                    this.$message.success('新增成功')
                                    this.$router.back()
                                } else {
                                    this.$message.error('新增失败')
                                }
                            })
                        }
                    } else {
                        this.$message.error('有未填的必填项*')
                    }
                });
            }
        }
    };
</script>

<style scoped lang="scss">
    .form-box{
        padding: 20px;
        margin-top: 40px;
        margin-left: 40px;
        .el-input{
            width:400px;
        }
        .el-select{
            width:400px;
        }
        .el-autocomplete{
            width: 400px;
        }
        .tag{
            width: 600px;
            padding: 20px;
            min-height: 200px;
            border:1px solid #ddd;
            .el-tag{
                margin-right: 20px;
            }
        }
    }
    .btn{
        text-align: center;
        .el-button:nth-child(2){
            margin-left: 20px;
        }
    }
    .avatar{
        width: 200px;
        height: 200px;
    }
</style>
