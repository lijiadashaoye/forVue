<template>
  <div class="componentWaper">
    <div id="forHeader">
      <h3>
        {{pageName}}
      </h3>
    </div>

    <div id="forTable">
      <memberBlackList
      @send="send"/>
    </div>
  </div>
</template>

<script>
import { black_list_add } from '../../../api/setting_use.js';
import memberBlackList from '../../../components/memberBlackList';
export default {
  props: {},
  components: {
    memberBlackList
  },
  data() {
    return {
      pageName: "" // 当前页面名字
    };
  },
  mounted() {
    this.pageName = this.$route.name;
  },
  methods: {
    send(data) {
      let jurisdiction = JSON.parse(localStorage.getItem("buttenpremissions"));
      //有权限  跳转到创建页面
      if (jurisdiction.indexOf("black_list_add") > -1) {
        black_list_add(data).then(res=> {
          if(res) {
            this.$router.push('/home/member/member-black-list/list')
          }
        }).catch(()=> {
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
    },
  }
};
</script>
<style scoped='true' lang="scss">

</style>
