<template>
   <div class="componentWaper">


    <div id="forHeader">
      <h3>
        {{pageName}}
      </h3>
    </div>

    <div id="forTable">
      <addBankDetail
      @send="send"/>
    </div>


  </div>
</template>

<script>
import { bank_add } from '../../../api/setting_use.js';
import addBankDetail from '../../../components/addBankDetail';
export default {
  props: {},
  components: {
    addBankDetail
  },
  data() {
    return {
      pageName: "" // 当前页面名字
    };
  },
  created() {
    this.pageName = this.$route.name;
  },
  methods: {
    //向添加
    send(data) {
      let jurisdiction = JSON.parse(localStorage.getItem("buttenpremissions"));
      if (jurisdiction.indexOf("bank_add") > -1) {
        bank_add(data).then(res=>{
          if(res && res.success) {
            this.$router.push(`/home/setting/bank/list`)
          }
        }).catch((res)=> {
          this.$alert(`${res.message}`, '保存失败', {
            confirmButtonText: '确定',
            callback: action => {
              this.$message({
                type: 'error',
                message: `action: ${ res.message }`
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
