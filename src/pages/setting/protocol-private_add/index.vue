<template>
    <div class="componentWaper">


    <div id="forHeader">
      <h3>
        {{pageName}}
      </h3>
    </div>

    <div id="forTable">
      <protocolAddUpt
      :appChannel.sync="this.$store.state.protocol.appChannel"
      @req="req"/>
    </div>


  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import protocolAddUpt from '../../../components/protocolAddUpt';
import { protocol_add } from '../../../api/setting_use.js'
export default {
  props: {},
  components:{
    protocolAddUpt
  },
  data() {
    return {
      pageName: "", // 当前页面名字
    };
  },
  mounted() {
    this.pageName = this.$route.name;
    this.getAppChannel();
  },
  methods: {
    ...mapMutations({
      getAppChannel:'protocol/getAppChannel'
    }),
    req(data){
      let jurisdiction = JSON.parse(localStorage.getItem("buttenpremissions"));
      //有权限  跳转到创建页面
      if (jurisdiction.indexOf("protocol_private_add") > -1) {
        protocol_add(data).then(res=> {
            this.$router.push('/home/setting/protocol-private/list')
        }).catch(()=>{
          this.$message(`${res.message}`, '保存失败', {
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
