<template>
<v-card>
<div style="margin-bottom: 10px">
    <v-toolbar card color="blue darken-1" dark>
        <v-btn icon @click="back"><v-icon>arrow_back</v-icon></v-btn>
        <v-toolbar-title>编辑资料</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="show = !show">
            <v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
        </v-btn>
    </v-toolbar>
    <v-container fluid v-show="show">
    <v-layout align-center justify-center wrap>
        <v-flex xs12 sm10 md6>
            <v-text-field
            prepend-icon="person"
            box
            label='用户名'
            disabled
            v-model='user.username'
            >
            </v-text-field>
        </v-flex>
        <v-flex xs12 sm10 md6>
            <v-text-field
            prepend-icon="email"
            box
            label='邮箱'
            v-model='user.email'
            >
            </v-text-field>
        </v-flex>
        <v-flex xs12 sm10 md6>
            <v-text-field
            prepend-icon="person"
            box
            label='真实姓名'
            v-model='user.name'
            >
            </v-text-field>
        </v-flex>
        <v-flex xs12 sm10 md6>
            <v-text-field
            prepend-icon="phone"
            box
            label='联系方式'
            v-model='user.tel'
            >
            </v-text-field>
        </v-flex>
        <v-flex xs4 sm4 md6>
            <v-text-field box v-model='user.addtime' label="注册时间" disabled prepend-icon="history">
            </v-text-field>
        </v-flex>
        <v-flex xs4 sm4 md6>
            <v-text-field box v-model='user.last_login_time' label="最后登录的时间" disabled prepend-icon="history">
            </v-text-field>
        </v-flex>
        <v-flex xs4 sm4 md6>
            <v-text-field box v-model='user.last_login_ip' label="最后登录的ip" disabled prepend-icon="place">
            </v-text-field>
        </v-flex>
        <v-flex xs4 sm4 md6>
            <v-text-field box :value="user.role?'超级管理员':'普通管理员'" label="角色" disabled prepend-icon="person_pin">
            </v-text-field>
        </v-flex>
        <v-flex xs4 sm4 md6>
            <v-text-field box v-model='user.login_times' label="登陆次数" disabled prepend-icon="fingerprint">
            </v-text-field>
        </v-flex>
        <v-flex xs4 sm4 md6>
            <v-text-field box :value="user.status?'正常':'停用'" label="当前状态" disabled prepend-icon="sentiment_satisfied_alt">
            </v-text-field>
        </v-flex>
        <v-flex xs12 sm10 md6>
            <v-btn small @click="flush">取消</v-btn>
            <v-btn color="info" small @click="submit">确定</v-btn>
        </v-flex>
    </v-layout>
    </v-container>
</div>
</v-card>
</template>
<style scoped>

</style>
<script>
export default {
    data: () => ({
        show: true,
        user: {}
    }),
    methods: {
        back: function(){
            this.$router.go(-1);
        },
        submit: function(){
            this.$axios({
                url: '/adduser',
                method: 'put',
                data: {
                    new_name: this.user.name,
                    new_email: this.user.email,
                    new_tel: this.user.tel
                }
            })
            .then(res => {
                this.$message.success(res.data.ok);
            })
            .catch(err => {
                if(err.response){
                    switch(err.response.status)
                    {
                        case 401:
                            this.$message.error('登录失效，请重新登录');
                            break;
                        case 406:
                            this.$message.error('该邮箱已存在,请重新选择');
                            break;
                        default:
                            this.$message.error('信息修改错误，请稍后重试');
                    }
                }
                else{
                    this.$message.error('信息修改错误，请稍后重试');
                }
            })
        },
        flush: function(){
            this.$router.go(0);
        }
    },
    created: function(){
        const _this = this;
        _this.$axios({
            method: 'get',
            url: '/adduser',
            params: {
                username: localStorage.getItem('username')
            }
        })
        .then(res => {
            _this.user = res.data.user
        })
        .catch(err => {
            if(err.response){
                _this.$message.error(err.response.data.error);
            }
            else{
                _this.$message.error('信息获取错误，请稍后重试');
            }
        })
    }
}
</script>
