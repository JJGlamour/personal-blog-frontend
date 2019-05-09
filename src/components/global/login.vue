<template>
<div class="login">
<v-app>
  <v-layout align-center justify-center>
    <v-flex xs11 sm8 md4><!--解决大小屏幕显示问题-->
      <v-card> 
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-toolbar dark color="blue darken-1">
            <v-toolbar-title>BLOG管理员登录</v-toolbar-title>
          </v-toolbar>
          <br>
          <v-text-field
            v-model="name"
            :rules="nameRules"
            label="Name"
            required
            prepend-icon="person"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            :counter="20"
            label="Password"
            required
            :type="passwordshow?'text':'password'"
            prepend-icon="lock"
            :append-icon="passwordshow?'visibility_off':'visibility'"
            @click:append="passwordshow=!passwordshow"
             @keyup.enter="submit"
          ></v-text-field>
          <v-btn
            :disabled="!valid"
            @click="submit"
            color="info"
        
          >
            登录
          </v-btn>
        
         
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
  
</v-app>
</div>
</template>
<script>
import md5 from 'js-md5'
import { mapMutations } from 'vuex';
export default {
  components: {
  },
  data: () => ({
    valid: true,
    neterror: false,
    name: '',
    nameRules: [
      v => !!v || '请填写用户名'
    ],
    password: '',
    passwordshow: false,
    passwordRules: [
      v => !!v || '请填写密码',
      // v => /.+@.+/.test(v) || 'E-mail must be valid'
      v => (v && v.length <= 20) || '密码不能超过20个字符'//如何加一个只能英文或数字输入的筛选器
    ]
  }),

  methods: {
    ...mapMutations(['set_token','set_user']),
    submit () {
      if (this.$refs.form.validate()) {
        const loading = this.$loading({
          text: '正在登录',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)',
        })
        const _this = this;
        this.$axios({
          method: 'POST',
          url: '/login',
          data: {
            name: _this.name,
            password: _this.password//加密传输
          }
        })
        .then(res => {
          loading.close();
          _this.token = res.data.token;  //登陆成功后后端直接返回token
          _this.set_token(_this.token);//将token存入vuex
          _this.set_user(_this.name);
          _this.$router.push('/home/administrator');
          _this.$message.success("登陆成功");
        })
        .catch(err => {
          //console.log(err);
          loading.close();
          if(err.response){
            if(err.response.status==401){
              _this.$message.error("用户名或密码错误");
            }
            else{
              _this.$message.error("服务器出错");
            }
          }
          else{
            _this.$message.error("验证失败");
          }
        })
      }
    },
    clear () {
      this.$refs.form.reset();
    }
  },
}
</script>
<style scoped>
.login{
  text-align: center;
}
</style>
