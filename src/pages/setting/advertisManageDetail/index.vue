<template>
    <div class="componentWaper">
        <div id="forHeader">
            <h3>
                {{pageName}}
            </h3>
            <el-button class="t-btn" @click="goBack" type="primary">返回</el-button>
        </div>
        <div id="forTable">
            <div class="form-box">
                <el-form ref="ruleForm" :model="ruleForm" labelWidth="200px" label-position="left">
                    <el-form-item label="app标识"
                                  :rules="[
                              { required: true, message: '请选择app标识', trigger: 'change' }
                             ]"
                    >
                        <el-select disabled v-model="ruleForm.appChannelCode">
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
                    >
                        <el-input placeholder="请输入" readonly  v-model="ruleForm.advertisTitle"></el-input>
                    </el-form-item>
                    <el-form-item
                            label="广告副标题"
                            prop="advertisViceTitle"
                            :rules="[
                              { required: true, message: '请输入广告副标题', trigger: 'blur' }
                             ]"
                    >
                        <el-input placeholder="请输入" readonly  v-model="ruleForm.advertisViceTitle"></el-input>
                    </el-form-item>
                    <el-form-item
                            label="广告排序"
                            prop="sort"
                    >
                        <el-input placeholder="请输入" readonly v-model="ruleForm.sort"></el-input>
                    </el-form-item>
                    <el-form-item
                            label="广告显示类型"
                            prop="showType"
                    >
                        <template>
                            <el-radio disabled v-model="ruleForm.showType" label="BANNER">横幅</el-radio>
                            <el-radio disabled v-model="ruleForm.showType" label="INFORMATION">信息流</el-radio>
                        </template>
                    </el-form-item>
                    <el-form-item
                            label="广告可见类型"
                            prop="visualType"
                    >
                        <template>
                            <el-radio-group disabled v-model="ruleForm.visualType">
                                <el-radio label="NO_LIMIT">不限定</el-radio>
                                <el-radio label="LOGIN_USER">登陆用户可见</el-radio>
                                <el-radio label="NO_LOGIN_USER">非登陆用户可见</el-radio>
                            </el-radio-group>
                        </template>
                    </el-form-item>
                    <el-form-item
                            label="广告位置"
                            prop="advertisLocation"
                    >
                        <el-select disabled v-model="ruleForm.advertisLocation" placeholder="请选择">
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
                    >
                        <el-select disabled v-model="ruleForm.advertisType" placeholder="请选择">
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
                    >
                        <el-autocomplete
                                disabled
                                v-model="ruleForm.associatedProducts"
                                :fetch-suggestions="querySearchAsync"
                                placeholder="请输入内容"
                        ></el-autocomplete>
                    </el-form-item>
                    <el-form-item
                            v-if="ruleForm.advertisType == 'CONSULT_PAGE'"
                            label="关联资讯"
                            prop="relatedInformation"
                    >
                        <el-autocomplete
                                disabled
                                v-model="ruleForm.relatedInformation"
                                :fetch-suggestions="querySearchAsync"
                                placeholder="请输入内容"
                        ></el-autocomplete>
                    </el-form-item>
                    <el-form-item
                            v-if="ruleForm.advertisType == 'EXTERNAL_LINK'"
                            label="链接地址"
                            prop="advertisUrl"
                    >
                        <el-input readonly placeholder="请输入" v-model="ruleForm.advertisUrl"></el-input>
                    </el-form-item>
                    <el-form-item
                            prop="advertisImageUrl"
                            label="广告图片"
                    >
                        <img :src="ruleForm.advertisImageUrl" class="avatar">
                    </el-form-item>
                    <el-form-item
                            label="广告开始时间"
                            prop="stratTime"
                    >
                        <el-date-picker
                                readonly
                                v-model="ruleForm.stratTime"
                                type="datetime"
                                placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item
                            label="广告结束时间"
                            prop="endTime"
                    >
                        <el-date-picker
                                readonly
                                v-model="ruleForm.endTime"
                                type="datetime"
                                placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="推广用户">
                    </el-form-item>
                    <el-form-item label="用户选择" prop="spreadUser">
                        <template>
                            <el-radio disabled v-model="ruleForm.spreadUser" label="TOTAL">发送给全部用户</el-radio>
                            <el-radio disabled v-model="ruleForm.spreadUser" label="PORTION">发送给部分用户</el-radio>
                        </template>
                    </el-form-item>
                    <el-form-item label="添加关联组" v-if="ruleForm.spreadUser != 'TOTAL'">
                        <el-select disabled v-model="ruleForm.linkGroup" placeholder="请选择">
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
                            <el-radio disabled v-model="ruleForm.promoteArea" label="PHONE">按手机号归属地</el-radio>
                            <el-radio disabled v-model="ruleForm.promoteArea" label="LOCATION">最后一次登录所在地</el-radio>
                        </template>
                    </el-form-item>
                    <el-form-item label="选择省份" v-if="ruleForm.spreadUser != 'TOTAL'">
                        <el-select disabled v-model="ruleForm.spreadLocation" multiple placeholder="请选择">
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
                            >
                                {{tag.name}}
                            </el-tag>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import { adverdis_detail } from '../../../api/setting_use'
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
            this.pageName = this.$route.name.trim()
            this.infoFn()
            this.relatedInformationList = this.loadAll()
            this.associatedProductsList = this.loadAll()
        },
        methods: {
            // 返回
            goBack() {
                this.$router.back()
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
                        this.ruleForm.stratTime = res.data.stratTime      // 广告开始时间
                        this.ruleForm.endTime = res.data.endTime
                    }
                })
            },
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
    .avatar{
        width: 200px;
        height: 200px;
    }
    .t-btn{
        float: right;
    }
</style>
