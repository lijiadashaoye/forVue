<template>
  <div class="componentWaper">
    <div id="forHeader">
      <h3>
        {{pageName}}
      </h3>
    </div>
    <div id="forTable">
      <bankCardAddUpd
      :list="list"
      @send="send"/>
    </div>
  </div>
</template>

<script>
import bankCardAddUpd from '../../../components/bankCardAddUpd/index';
import { bank_card_add } from '../../../api/setting_use.js';
import { mapActions } from 'vuex';
export default {
  props: {},
  components: {
    bankCardAddUpd
  },
  data() {
    return {
      pageName: "" ,// 当前页面名字
      list: []
    };
  },
  created() {
    this.getList();
    this.list = this.$store.state.bank.bankList.data.list.length > 0 ? 
    this.$store.state.bank.bankList.data.list : 
    JSON.parse(window.sessionStorage.getItem('bankList'));
  },
  mounted() {
    this.pageName = this.$route.name;
  },
  methods: {
    ...mapActions({
      getList: 'bank/getList'
    }),
    
    //点击保存
    send(data) {
      let jurisdiction = JSON.parse(localStorage.getItem("buttenpremissions"));
      //有权限  跳转到创建页面
      if (jurisdiction.indexOf("bank_add") > -1) {
        bank_card_add(data).then(res=> {
          if(res.success){
            this.$router.push(`/home/setting/bank-card/list`)
          }
        }).catch(()=>{
          this.$alert(`${res.message}`, '保存失败', {
            confirmButtonText: '确定',
            callback: action => {
              this.$message({
                type: 'info',
                message: `action: ${ action }`
              });
            }
          });
        })
      } else {
        //弹出消息提示用户
        this.$alert("您没有这个权限", {
          confirmButtonText: "确定"
        });
      } 
    }
  }
};
</script>

<style scoped='true' lang="scss">

</style>
