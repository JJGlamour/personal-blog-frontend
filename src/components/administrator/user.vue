<template>
<div>
    <div style="margin-bottom: 10px">
        <v-toolbar color="blue darken-1"  dark flaT>
        <v-btn icon @click="back">
            <v-icon>keyboard_arrow_left</v-icon>
        </v-btn>
        <v-card-title class="title font-weight-regular">注册管理员</v-card-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="show = !show">
            <v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
        </v-btn>
        </v-toolbar>
    </div>
<v-card
    class="mx-auto"
    v-show="show"
>
    <v-form
      ref="form"
      v-model="form"
      class="pa-3 pt-4"
    >
      <v-text-field
        v-model="username"
        box
        color="deep-purple"
        label="username"
        prepend-icon="person"
      ></v-text-field>
       <v-text-field
        v-model="password"
        :rules="[rules.password]"
        box
        prepend-icon="lock"
        color="deep-purple"
        counter="20"
        label="Password"
        style="min-height: 96px"
        :type="passwordshow ? 'text':'password'"
        :append-icon="passwordshow ? 'visibility_off': 'visibility'"
        @click:append="passwordshow=!passwordshow"
      ></v-text-field>
      <v-text-field
        v-model="email"
        :rules="[rules.email]"
        box
        color="deep-purple"
        label="Email address"
        type="email"
        prepend-icon="email"
      ></v-text-field>
      <v-checkbox
        v-model="agreement"
        :rules="[rules.required]"
        color="deep-purple"
      >
        <template slot="label">
          同意&nbsp;
          <a href="#" @click.stop.prevent="dialog = true">管理员手册</a>
        </template>
      </v-checkbox>
    </v-form>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn
        dark
        @click="$refs.form.reset()"
        color="deep-purple accent-4"
        outline
        round
      >
        清除
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="!form"
        :loading="isLoading"
        class="white--text"
        color="deep-purple accent-4"
        depressed
        @click="submit"
        round
      >提交</v-btn>
    </v-card-actions>

        <v-dialog
        v-model="dialog"
        absolute
        max-width="400"
        persistent
        >
        <v-card>
            <v-card-title class="headline grey lighten-3">注册声明</v-card-title>
            <v-card-text>
            本博客管理员仅限于对女同学开放，各位男性同胞请勿扰。谢谢合作！
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
            <v-btn
                flat
                @click="agreement = false, dialog = false"
                outline
                round
            >
                否
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
                round
                class="white--text"
                color="deep-purple accent-4"
                @click="agreement = true, dialog = false"
            >
                是
            </v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
        <v-dialog
            v-model="dialog1"
            absolute
            max-width="400"
            persistent
        >
            <v-card>
                <v-card-title class="headline grey lighten-3">添加成功</v-card-title>
                <v-card-text>
                成功添加管理员，请牢记密码
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    class="white--text"
                    color="deep-purple accent-4"
                    @click="dialog1 = false"
                >
                    了解
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
         <v-dialog
            v-model="dialog2"
            absolute
            max-width="400"
            persistent
        >
            <v-card>
                <v-card-title class="headline grey lighten-3">添加失败</v-card-title>
                <v-card-text>
                此用户名或此邮箱已注册，请重新选择用户名或邮箱
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    class="white--text"
                    color="deep-purple accent-4"
                    @click="dialog2 = false"
                >
                    了解
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
  </v-card>
  <v-user1></v-user1>
</div>
</template>
<script>
import vUser1 from './user1.vue'
export default {
    data: () => ({
        agreement: false,
        dialog: false,
        dialog1: false,
        dialog2: false,
        email: undefined,
        form: false,
        isLoading: false,
        password: undefined,
        passwordshow: false,
        username: undefined,
        rules: {
        email: v => (v || '').match(/@/) || '请输入合理格式的邮箱',
        password: v=> (v && v.length >= 6 && v.length <=20) || '至少需要六个字符,不能超过20个字符',
        required: v => !!v || '必填项目'
        },
        show: true,
    }),
    methods: {
        back: function(){
            this.$router.go(-1)
        },
        submit: function(){
            const _this = this;
            _this.isLoading = true;
            this.$axios({
                method: "POST",
                url: '/adduser',
                data: {
                    //token: localStorage.getItem('token'),//请求拦截里面已经加上了token和username
                    new_username: _this.username,
                    new_password:_this.password,
                    new_email: _this.email
                }
            })
            .then(res => {
                //alert("注册成功");
                //console.log("发送的token:"+res.data.token)
                _this.isLoading = false;
                _this.dialog1 = true;
                _this.$refs.form.reset();
            })
            .catch(err => {
                _this.isLoading = false;
                if(err.response){
                  switch(err.response.status)
                  {
                    case 406:
                      _this.dialog2 = true;
                      break;
                    case 401:
                      _this.$message.error("登录已失效,请重新登录");
                      break;
                    default: 
                      _this.$message.error("服务器内部错误");
                  }
                }
                else{
                  _this.$message.error("服务器未响应");
                }
              
            })
        }
    },
    components: {
        vUser1,
    }
}
</script>