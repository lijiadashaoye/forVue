<template>
  <div>
    <div class="formWaper" v-if="!isOk">
      <div style="display:flex;justify-content:space-between;margin-bottom:20px;">
        <div>
          <h4>
            <span class="isPoints">*</span>活动配置
          </h4>
          <el-select filterable v-model="other" placeholder="请选择" multiple>
            <el-option
              v-for="item in otherList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>

        <div>
          <h4>
            <span class="isPoints">*</span>请选显示渠道：
          </h4>
          <el-select filterable v-model="showWay" placeholder="请选择" clearable>
            <el-option
              v-for="tar in qudaoList"
              :key="tar.value"
              :label="tar.label"
              :value="tar.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <!-- 活动栏位管理 -->
      <div v-if="other.includes('1')" class="setBorder">
        <div style="padding-bottom:10px;display:flex;justify-content:space-between;">
          <p class="otherTitle">活动栏位管理</p>

          <div>
            <span>请选择栏位：</span>
            <el-select
              filterable
              multiple
              placeholder="请选择"
              size="mini"
              v-model="selectLanwei"
              @change="selectLanweiFn"
            >
              <el-option
                v-for="item in lanweiList"
                :key="item.ID"
                :label="item.name"
                :value="item.ID"
              ></el-option>
            </el-select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>也可以新增栏位：</span>
            <el-button type="primary" size="mini" plain @click="lanweiForm.show = true">添加新栏位</el-button>
            <el-button
              size="mini"
              icon="el-icon-close"
              type="danger"
              circle
              title="关闭"
              @click="toClose(1)"
            ></el-button>
          </div>
        </div>

        <el-dialog
          title="活动栏位管理"
          :close-on-click-modal="false"
          :visible.sync="lanweiForm.show"
          width="40%"
        >
          <el-form size="small" label-width="120px" ref="lanweiForm" :model="lanweiForm">
            <el-form-item label="ID" prop="ID">
              <el-input v-model="lanweiForm.ID" type="number"></el-input>
            </el-form-item>
            <el-form-item label="栏位名称" prop="name">
              <el-input v-model="lanweiForm.name"></el-input>
            </el-form-item>
            <el-form-item label="平台" prop="pingtai">
              <el-select filterable v-model="lanweiForm.pingtai" placeholder="请选择活动平台">
                <el-option
                  size="mini"
                  v-for="item in pingTaiList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="设备" prop="shebei">
              <el-checkbox-group v-model="lanweiForm.shebei">
                <el-checkbox v-for="(dd,index) of shebeiList" :key="index" :label="dd.label"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>

            <el-form-item label="活动栏位排序" prop="paixu">
              <el-input v-model="lanweiForm.paixu" type="number"></el-input>
            </el-form-item>

            <el-form-item label="资源图片">
              <imgUpload
                v-if="lanweiForm.show"
                :datas="{
                  url:'admin/file/up/market',
                  imgUrl:''
                }"
                @selectImg="sharePageImg('lanwei',$event)"
              />
            </el-form-item>

            <el-form-item label="图片链接">
              <el-input readonly v-model="lanweiForm.imgUrl" type="textarea" :rows="4"></el-input>
            </el-form-item>

            <el-form-item label="图片描述">
              <el-input v-model="lanweiForm.miaoshu" type="textarea" :rows="2" placeholder="请输入内容"></el-input>
            </el-form-item>

            <el-form-item label="是否上架">
              <el-select filterable v-model="lanweiForm.shangjia" placeholder="请选择">
                <el-option
                  size="mini"
                  v-for="item in shangjiaList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div class="editDialogButtons">
            <el-button type="danger" size="mini" @click="closeLanWeiTanKuang(false)">取消</el-button>
            <el-button type="primary" size="mini" @click="closeLanWeiTanKuang(true)">保存</el-button>
          </div>
        </el-dialog>
        <div class="suolueWap">
          <div v-for="tar of pageData.lanwei" :key="tar.ID" class="suolue">
            <p v-if="tar.ID">ID: {{tar.ID}}</p>
            <p v-if="tar.name">栏位名称: {{tar.name}}</p>
            <p v-if="tar.pingtai">平台: {{(pingTaiList.filter(kk=>kk.value==tar.pingtai))[0].label}}</p>
            <p v-if="tar.shebei.length">设备: {{tar.shebei.join('、')}}</p>
            <p v-if="tar.paixu">栏位排序: {{tar.paixu}}</p>
            <p v-if="tar.shangjia">是否上架: {{tar.shangjia=== "YES"?'上架':'下架'}}</p>
            <p v-if="tar.imgUrl">
              图片:
              <img :src="tar.imgUrl" />
            </p>
            <p v-if="tar.miaoshu">图片描述: {{tar.miaoshu}}</p>
            <el-button
              class="suolueBtn"
              size="mini"
              icon="el-icon-close"
              type="light"
              circle
              title="删除"
              @click="toRemoveLanWei(tar.ID)"
            ></el-button>
          </div>
        </div>
      </div>

      <!-- 分享页设置 -->
      <div v-if="other.includes('2')" class="setBorder">
        <div style="padding-bottom:10px;display:flex;justify-content:space-between;">
          <p class="otherTitle">分享页设置</p>
          <div>
            <el-button type="primary" size="mini" plain @click="shareForm.show = true">添加分享页图</el-button>
            <el-button
              size="mini"
              icon="el-icon-close"
              type="danger"
              circle
              title="关闭"
              @click="toClose(2)"
            ></el-button>
          </div>
        </div>

        <el-dialog
          title="分享页设置"
          :close-on-click-modal="false"
          :visible.sync="shareForm.show"
          width="30%"
        >
          <el-form v-model="shareForm" size="small" label-width="80px" label-suffix=":">
            <el-form-item prop="shareWay" label="分享图片" label-width="90px">
              <imgUpload
                v-if="shareForm.show"
                :datas="{
                  url:'admin/file/up/market',
                  imgUrl:''
                }"
                @selectImg="sharePageImg('share',$event)"
              />
            </el-form-item>

            <el-form-item prop="shareWay" label="分享途径" label-width="90px">
              <el-select filterable v-model="shareForm.shareWay" placeholder="请选择">
                <el-option
                  v-for="item in shareList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item prop="title" label="分享标题" label-width="90px">
              <el-input clearable placeholder="请输入" v-model="shareForm.title"></el-input>
            </el-form-item>

            <el-form-item prop="shareText" label="分享内容" label-width="90px">
              <el-input type="textarea" rows="3" placeholder="请输入" v-model="shareForm.shareText"></el-input>
            </el-form-item>

            <el-form-item prop="jumpUrl" label="跳转链接" label-width="90px">
              <el-input clearable placeholder="请输入" v-model="shareForm.jumpUrl"></el-input>
            </el-form-item>
          </el-form>

          <div class="editDialogButtons">
            <el-button type="danger" size="mini" @click="closeShareTanKuang(false)">取消</el-button>
            <el-button type="primary" size="mini" @click="closeShareTanKuang(true)">保存</el-button>
          </div>
        </el-dialog>
        <div class="suolueWap">
          <div v-for="tar of pageData.share" :key="tar.title" class="suolue">
            <p v-if="tar.title">分享标题: {{tar.title}}</p>
            <p v-if="tar.shareWay">分享途径: {{tar.shareWay}}</p>
            <p v-if="tar.shareText">分享内容: {{tar.shareText}}</p>
            <p v-if="tar.jumpUrl">跳转链接: {{tar.jumpUrl}}</p>
            <p v-if="tar.imgUrl">
              图片:
              <img :src="tar.imgUrl" />
            </p>
            <el-button
              class="suolueBtn"
              size="mini"
              icon="el-icon-close"
              type="light"
              circle
              title="删除"
              @click="toRemoveShare(tar.title)"
            ></el-button>
          </div>
        </div>
      </div>

      <!-- 关联产品 -->
      <div v-if="other.includes('3')" class="setBorder">
        <div style="padding-bottom:10px;display:flex;justify-content:space-between;">
          <p class="otherTitle">关联产品</p>
          <div>
            <el-button type="primary" size="mini" plain @click="guanlianForm.show = true">添加关联产品</el-button>
            <el-button
              size="mini"
              icon="el-icon-close"
              type="danger"
              circle
              title="关闭"
              @click="toClose(3)"
            ></el-button>
          </div>
        </div>

        <el-dialog
          title="添加关联产品"
          :close-on-click-modal="false"
          :visible.sync="guanlianForm.show"
          width="50%"
        >
          <el-form v-model="guanlianForm" size="small" label-width="80px" label-suffix=":">
            <el-form-item prop="search" label="搜索产品" label-width="90px">
              <el-input clearable placeholder="请输入" v-model="guanlianForm.search"></el-input>
              <el-button type="primary" size="mini" @click="toSearch(true)">搜索</el-button>
              <el-button type="info" size="mini" @click="toSearch(false)">清除</el-button>
            </el-form-item>
          </el-form>
          <div v-if="forForms[forForms['type']]">
            <forms @tableAct="tableAct" style="with:100%;" :pageData="forForms" />
          </div>
          <div class="editDialogButtons">
            <el-button type="danger" size="mini" @click="closeGuanLianTanKuang(false)">关闭</el-button>
            <el-button type="primary" size="mini" @click="closeGuanLianTanKuang(true)">
              批量使用
              <span v-if="hasSelectNum.length">{{`(${hasSelectNum.length}个)`}}</span>
            </el-button>
          </div>
        </el-dialog>

        <div class="suolueWap">
          <div v-for="tar of pageData.guanlian" :key="tar.num" class="suolue">
            <p v-if="tar.num">序号: {{tar.num}}</p>
            <p v-if="tar.name">名称: {{tar.name}}</p>
            <p v-if="tar.jigou">机构: {{tar.jigou}}</p>
            <p v-if="tar.imgUrl">
              图片:
              <img :src="tar.imgUrl" />
            </p>
            <el-button
              class="suolueBtn"
              size="mini"
              icon="el-icon-close"
              type="light"
              circle
              title="删除"
              @click="toRemoveGuanLian(tar.num)"
            ></el-button>
          </div>
        </div>
      </div>

      <div class="buttons">
        <el-button @click="step('before')" type="primary">上一步</el-button>
        <el-button @click="step()" type="primary" :disabled="isSaveIng">保存</el-button>
        <el-button @click="reset" type="info">重 置</el-button>
      </div>
    </div>
    <hasSuccess @isOver="isOver" v-if="isOk" />
  </div>
</template>
<script>
import imgUpload from "../../../../components/upImg.vue";
import hasSuccess from "../../../../components/success.vue";
import forms from "../../../../components/forms.vue";

export default {
  props: {
    inputData: Object
  },
  components: { imgUpload, hasSuccess, forms },
  data() {
    return {
      isSaveIng: false, // 切换保存按钮的可点击状态
      isOk: false,
      //选择图片使用场景
      otherList: [
        {
          label: "活动栏位",
          value: "1"
        },
        {
          label: "分享页",
          value: "2"
        },

        {
          label: "关联产品",
          value: "3"
        }
      ],
      // 栏位
      lanweiList: [
        {
          ID: "11",
          name: "11",
          pingtai: "",
          shebei: [],
          paixu: "2",
          imgUrl: "",
          miaoshu: "23",
          shangjia: ""
        },
        {
          ID: "12",
          name: "12",
          pingtai: "",
          shebei: [],
          paixu: "23",
          imgUrl: "",
          miaoshu: "234",
          shangjia: ""
        }
      ],
      // 关联
      guanList: [
        {
          value: "a1",
          label: "one"
        },
        {
          value: "a2",
          label: "two"
        },
        {
          value: "a3",
          label: "three"
        }
      ],
      // 分享
      shareList: [
        {
          label: "微信",
          value: "WECHAT"
        },
        {
          label: "朋友圈",
          value: "MOMENTS"
        },
        {
          label: "QQ",
          value: "QQ"
        },
        {
          label: "qq空间",
          value: "QQ_SPACE"
        }
      ],
      // 显示渠道
      qudaoList: [
        {
          label: "H5",
          value: "H5"
        },
        {
          label: "ios",
          value: "IOS"
        },
        {
          label: "Android",
          value: "ANDROID"
        },
        {
          label: "Web",
          value: " WEB"
        }
      ],
      // 设备
      shebeiList: [
        {
          label: "ios",
          value: "ios"
        },
        {
          label: "安卓",
          value: "安卓"
        }
      ],
      // 上架、下架
      shangjiaList: [
        {
          label: "上架",
          value: "YES"
        },
        {
          label: "下架",
          value: "NO"
        }
      ],
      // 平台
      pingTaiList: [
        {
          label: "比财",
          value: "bicai"
        },
        {
          label: "异业",
          value: "yiye"
        }
      ],
      other: [], // 显示是否需要设置的弹窗、分享页
      showWay: "", // 显示渠道
      ////////////////////////////
      pageData: {
        // 当前页面一共生成的数据
        lanwei: [], // 活动栏位
        share: [], // 分享页的数据
        guanlian: [] //关联产品
      },
      ////////////////////////////
      selectLanwei: [], // 通过选择获取的栏位的id组成的数据
      // 栏位管理弹窗
      lanweiForm: {
        show: false,
        ID: "",
        name: "",
        pingtai: "",
        shebei: [],
        paixu: "",
        imgUrl: "",
        miaoshu: "",
        shangjia: ""
      },
      ////////////////////////////
      // 分享页新建表单
      shareForm: {
        show: false,
        shareWay: "",
        title: "",
        shareText: "",
        jumpUrl: "",
        imgUrl: ""
      },
      /////////////////////////
      forForms: {}, // 关联产品查询后的数据列表
      guanlianForm: {
        show: false,
        search: ""
      },
      hasSelectNum: [] // 记录关联产品弹框批量选择的产品
    };
  },
  mounted() {
    // let fromHttp = sessionStorage.getItem("fromHttp");
    // let step2Data = sessionStorage.getItem("step2Data");
    // if (fromHttp && !step2Data) {
    //   // 只是通过点击编辑过来
    //   let fromHttpData = JSON.parse(fromHttp);
    //   //从服务器端接收数据
    //   let shareList111 = fromHttpData.shareList111; // 分享页
    //   let guanList = fromHttpData.guanList; // 关联
    //   this.showWay = fromHttpData.platformType;
    //   if (shareList111.length > 0) {
    //     this.other.push("2");
    //     shareList111.forEach(item => this.addSharePage(item));
    //   }
    // }
    // // 如果编辑过页面，再回到这个页面，数据要继续赋上（新建）
    // else if (step2Data) {
    //   let step2 = JSON.parse(sessionStorage.getItem("step2Data"));
    //   this.other = step2.other;
    //   this.showWay = step2.showWay;
    //   this.tanchuangForm = step2.tanchuangForm;
    //   this.pageData.share = step2.pageData.share;
    // }
  },
  methods: {
    // 关闭活动配置相关模块
    toClose(num) {
      this.other = this.other.filter(tar => tar != num);
      switch (num) {
        case 1:
          this.pageData.lanwei = [];
          this.selectLanwei = [];
          break;
        case 2:
          this.pageData.share = [];
          break;
        case 3:
          this.pageData.guanlian = [];
          break;
      }
    },
    /////////////////////////////////////////////////////////////////
    // 选择已存在的栏位
    selectLanweiFn() {
      this.pageData.lanwei = this.lanweiList.filter(item => {
        if (this.selectLanwei.includes(item.ID)) {
          return item;
        }
      });
    },
    // 栏位选定弹框的关闭、保存
    closeLanWeiTanKuang(type) {
      if (type) {
        let arr = this.pageData.lanwei.map(tar => tar.ID);
        if (arr.length == 0 || !arr.some(kk => kk == this.lanweiForm.ID)) {
          this.pageData.lanwei.push(this.lanweiForm);
          this.lanweiForm = {
            show: false,
            ID: "",
            name: "",
            quyu: "",
            shebei: [],
            paixu: "",
            imgUrl: "",
            miaoshu: "",
            shangjia: "",
            lanweiName: ""
          };
        } else {
          this.$message.error("新增栏位的ID出现重复！");
        }
      } else {
        this.lanweiForm = {
          show: false,
          ID: "",
          name: "",
          quyu: "",
          shebei: [],
          paixu: "",
          imgUrl: "",
          miaoshu: "",
          shangjia: "",
          lanweiName: ""
        };
      }
    },
    // 删除新添加的栏位
    toRemoveLanWei(id) {
      this.pageData.lanwei = this.pageData.lanwei.filter(tar => tar.ID != id);
      this.selectLanwei = this.selectLanwei.filter(tar => tar != id);
    },
    /////////////////////////////////////////////////////////////////
    // 分享页弹框的关闭、保存
    closeShareTanKuang(type) {
      if (type) {
        let arr = this.pageData.share.map(tar => tar.title);
        if (arr.length == 0 || !arr.some(kk => kk == this.shareForm.title)) {
          this.pageData.share.push(this.shareForm);
          this.shareForm = {
            show: false,
            shareWay: "",
            title: "",
            shareText: "",
            jumpUrl: "",
            imgUrl: ""
          };
        } else {
          this.$message.error("分享标题出现重复！");
        }
      } else {
        this.shareForm = {
          show: false,
          shareWay: "",
          title: "",
          shareText: "",
          jumpUrl: "",
          imgUrl: ""
        };
      }
    },
    // 删除新添加的分享页
    toRemoveShare(title) {
      this.pageData.share = this.pageData.share.filter(
        tar => tar.title != title
      );
    },
    /////////////////////////////////////////////////////////////////
    // 关联产品弹框里的表格查询按钮
    toSearch(type) {
      if (type) {
        // 利率表格的数据，假数据
        let forms = {
          checkBox: true, // 前边的单选框
          fenye: true, // 是否需要分页
          pageNum: 0, // 当前页妈
          // 表格头部的蓝点
          titleUp: {
            pointName: "产品列表"
          },
          // 表格头部
          title: [
            {
              prop: "num",
              label: "序号",
              width: "100"
            },
            {
              prop: "name",
              label: "名称",
              width: "100"
            },
            {
              prop: "jigou",
              label: "机构",
              width: "100"
            }
          ],
          handle: [
            // 表格执行的操作
            {
              click: "use", // 使用这个产品
              text: "使用" // 表格操作栏的点击事件
            }
          ],
          // 表格数据
          dataTotal: []
        };

        for (let i = 0; i < 50; i++) {
          forms.dataTotal.push({
            num: i + 1,
            name: "比财大宝",
            jigou: "比财",
            imgUrl:
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563340268661&di=3e6aea9c6560893f2befa12a4fade287&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201610%2F31%2F20161031184439_JfVYm.thumb.700_0.jpeg"
          });
        }
        this.forForms.type = "guanlianchanpin"; // 添加关联产品
        this.$set(this.forForms, "guanlianchanpin", forms);
      } else {
        this.guanlianForm.search = "";
      }
    },
    // 关联产品选中产品
    tableAct(data) {
      if (data.type === "use") {
        this.pageData.guanlian.push(data.data);
        // 选中的产品，就从当前列表中去除
        let zz = JSON.parse(JSON.stringify(this.forForms["guanlianchanpin"]));
        zz.dataTotal = zz.dataTotal.filter(tar => tar.num != data.data.num);
        this.$set(this.forForms, "guanlianchanpin", null);
        this.$nextTick(() => {
          this.$set(this.forForms, "guanlianchanpin", zz);
        });
      }
      if (data.type === "moreSelect") {
        this.hasSelectNum = data.data;
      }
    },
    // 关联产品弹框的关闭、保存
    closeGuanLianTanKuang(type) {
      if (type) {
        if (this.hasSelectNum.length) {
          this.pageData.guanlian = [
            ...this.pageData.guanlian,
            ...this.hasSelectNum
          ];
          let zz = JSON.parse(JSON.stringify(this.forForms.forForms));
          let arr = this.hasSelectNum.map(tar => tar.num);
          arr.forEach(num => {
            zz.dataTotal = zz.dataTotal.filter(tar => tar.num != num);
          });

          this.$set(this.forForms, "forForms", null);
          this.$nextTick(() => {
            this.$set(this.forForms, "forForms", zz);
          });
        } else {
          this.$message.error("请选择批量使用的产品！");
        }
      } else {
        this.guanlianForm = {
          show: false,
          search: ""
        };
      }
      this.hasSelectNum = [];
    },
    // 关联产品的删除
    toRemoveGuanLian(num) {
      this.pageData.guanlian = this.pageData.guanlian.filter(
        tar => tar.num != num
      );
    },
    ///////////////////////////////////////////////////////
    // 栏位、分享页设置的图片上传
    sharePageImg(type, data) {
      switch (type) {
        case "lanwei":
          this.lanweiForm.imgUrl = this.$ImgBaseUrl + data.url;
          break;
        case "share":
          this.shareForm.imgUrl = this.$ImgBaseUrl + data.url;
          break;
      }
    },

    // 重置
    reset() {
      this.$confirm(
        `重置的话，之前的操作活动配置数据将全部清除，是否继续重置？`
      )
        .then(() => {
          this.other = [];
          this.showWay = ""; // 显示渠道
          this.pageData = {
            // 当前页面一共生成的数据
            lanwei: [], // 活动栏位
            share: [], // 分享页的数据
            guanlian: [] //关联产品
          };
          this.selectLanwei = [];
          this.isSaveIng = false;
        })
        .catch(() => {});
    },
    isOver(type) {
      sessionStorage.removeItem("step1Data");
      sessionStorage.removeItem("step2Data");
      if (type === "back") {
        sessionStorage.setItem("page", "活动列表");
        this.$router.push({ name: `activity_list` });
      } else {
        sessionStorage.setItem("page", "创建活动");
        this.$router.push({ name: `activity_create` });
      }
    },
    // 下一步
    step(type) {
      if (type === "before") {
        sessionStorage.setItem("step2Data", JSON.stringify(this.pageData));
        this.$router.push({ name: `activity_create_step1` });
      } else {
        if (this.showWay && this.other.length) {
          let isAllOk = true;
          if (this.other.includes("1") && this.pageData.lanwei.length == 0) {
            isAllOk = false;
          }
          if (this.other.includes("2") && this.pageData.share.length == 0) {
            isAllOk = false;
          }
          if (this.other.includes("3") && this.pageData.guanlian.length == 0) {
            isAllOk = false;
          }
          if (isAllOk) {
            // this.isSaveIng = true;
            console.log(this.pageData);
            // setTimeout(() => {
            //   this.isOk = true;
            // }, 3000);
          } else {
            this.$message.error("请将选择活动配置类数据填写完整！");
          }
        } else {
          this.$message.error("请填写必要的数据！");
        }
      }
    }
  }
};
</script>

<style scoped='true' lang="scss">
.formWaper {
  width: 80%;
  min-width: 600px;
  padding: 20px;
  margin: 0 auto;
  margin-left: 10%;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin: 20px auto;
  padding-left: 60px;
  width: 50%;
}
.actImg {
  display: flex;
  margin-bottom: 30px;
}
.upimg {
  width: 100px;
  height: 100px;
  margin: 0 30px;
  flex-shrink: 0;
}
.urlCheckbox {
  position: absolute;
  left: -90px;
  padding-right: 70px;
}
.otherTitle {
  font-size: 18px;
  font-weight: bold;
}
.otherTitle1 {
  font-size: 12px;
  font-weight: 900;
}
.imgRight {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.toFlexImgRight {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
}
.cre-color {
  color: #ccc;
  line-height: 10px;
  padding-left: 10px;
}
.isPoints {
  font-size: 22px;
  color: red;
  line-height: 12px;
  padding: 0 4px;
  vertical-align: middle;
  justify-content: space-between;
}

#addnewl {
  position: absolute;
  width: 60%;
  height: 800px;
  border: 1px solid gray;
  background: #f1f0f0;
  z-index: 999;
  display: flex;
}
.setBorder {
  border: 1px solid rgb(209, 207, 207);
  padding: 10px 5px;
  border-radius: 3px;
  margin-bottom: 10px;
}
.editDialogButtons {
  display: flex;
  justify-content: center;
}

.suolueWap {
  display: flex;
  flex-wrap: wrap;
}
.suolue {
  width: 180px;
  position: relative;
  margin-right: 5px;
  padding: 5px;
  border-radius: 5px 22px 5px 5px;
  background: rgb(164, 251, 132);
  font-size: 12px;
}
.suolue img {
  width: 100%;
}
.suolueBtn {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
