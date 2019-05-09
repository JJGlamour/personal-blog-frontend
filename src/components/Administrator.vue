<template>
<div class="content">
   <v-flex xs12 sm12 md12>
        <br>
        <v-card flat>
            <h2>
              博客管理
            <span style="position:absolute;right:0;bottom:0">
              <v-btn small flat round color="indigo" @click="exit">
                <v-icon small>
                  home
                </v-icon>
                <small>
                  退出
                </small>
              </v-btn>
            </span>
            </h2>
        </v-card>
    </v-flex>
  <v-flex xs12 sm12 md12>
    <v-card>
      <div style="text-align:right">
      <small>
        欢迎您：<strong>{{ username }}</strong>
        &nbsp;&nbsp;
        登录状态：<strong :class="status?'green--text':'red--text'">{{status?'在线':'离线'}}</strong>
        &nbsp;&nbsp;
      </small>
      </div>
    </v-card>
  </v-flex>
    <transition name="slide-fade">
    <router-view/>
    </transition>
</div>
</template>
<script>
export default {
    methods: {
        exit: function(){
          //console.log('退出');
          this.$store.commit("del_token");
          this.$router.push('/login');
        }
    },
    data: () => ({
      username: localStorage.getItem('username'),
      status: 1,
      myVal: undefined
    }),
    mounted: function(){
      this.$axios.get('/login?vali=true')
      .catch(err => {
        if(err.response){
          if(err.response.status==401){
            this.$message.error('登录失效,请重新登录');
            this.$router.push('/login');
          }
        }
      })
    },
    created: function(){
      //console.log('上');
      this.myVal = setInterval(() => {
        //console.log('上');
        this.$axios({
          method: 'get',
          url: '/login',
          params: {
            vali: true
          }
        })
        .then(res => {
          this.status = 1;
          //console.log('收到响应');
        })
        .catch(err => {
          //console.log('错误');
          if(err.response){
            if(err.response.status==401){
              this.status = 0;
            }
          };
          clearInterval(this.myVal);
        })
      }, 20000);//20秒验证一次
    },
    beforeDestroy: function(){
      clearInterval(this.myVal);
      //console.log('离开');
    }
}
</script>
<style scoped>
.content{
    text-align: center;
}

.slide-fade{
  position: absolute;left:0;right: 0;
}
.slide-fade-enter-active {
  transition: all 0.1s ease;
}
.slide-fade-leave-active {

  transition: all .1s cubic-bezier(2.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
{
  left:0;right: 0;
  transform: translateX(50px);
  opacity: 0;
}
</style>

