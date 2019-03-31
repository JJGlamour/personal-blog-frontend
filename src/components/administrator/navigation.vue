<template>
<v-container grid-list-md title-xs-center> <!--加上以后每个卡片之间会有间隔，更加美观   -->
<v-layout row wrap> <!--要在v-flex里面for循环就必须用上wrap属性-->
<v-flex xs6 sm6 md4 v-for="(item,index) in items" :key="index">
    <v-card>
    <v-card-actions>
        <v-btn flat color="blue" block @click="goto(item.path)">{{ item.text }}</v-btn>
    </v-card-actions>
    </v-card>
</v-flex>
</v-layout>
<br>
<v-layout>
<v-flex xs12 sm6 offset-sm3>
    <v-card>
    <v-card-actions>
        <v-btn flat color="blue" block @click="logout">退出登录</v-btn>
    </v-card-actions>
    </v-card>
</v-flex>
</v-layout>
</v-container>
</template>
<script>
export default {
    data: () => ({
        items: [
        {
            text: '教程管理',
            path: '/home/administrator/course'
        },{
            text: '文章管理',
            path: '/home/administrator/article'
        },{
            text: '照片管理',
            path: '/home/administrator/img'
        },
        {
            title: '高贵冷艳',
            text: '留言管理',
            path: '/home/administrator/delmessage'
        },
        {
            text: "用户管理",
            path: '/home/administrator/user'
        },{
            text: "编辑资料",
            path: '/home/administrator/info'
        }]
    }),
    methods: {
        logout: function(){
            //localStorage.removeItem('Authorization');
            this.$store.commit("del_token");
            this.$router.push('/login');
        },
        goto: function(path){
            this.$router.push(path);
            //console.log(path)
        }
    }
}
</script>