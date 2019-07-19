<template>
    <div class="main">
        <v-layout align-center row wrap>
            <v-flex xs4 sm4 md4 style="text-align:left;">
                <v-btn flat @click="back">
                    <v-icon>keyboard_arrow_left</v-icon>返回
                </v-btn>
            </v-flex>
            <v-flex xl8 sm8 md8>
                <v-icon small>timer</v-icon>{{ ar_co.updatetime }}
                <v-btn icon><v-icon small color="pink" @click="like(ar_co)">favorite</v-icon>{{ ar_co.like }}</v-btn>
                &nbsp;
                <v-icon small color="grey">visibility</v-icon>{{ ar_co.total_views }}
            </v-flex>
            <v-flex xs12 sm12 md12>
                <mavon-editor v-model="ar_co.content" :subfield="false" :defaultOpen="defaultData" :toolbarsFlag="false" :boxShadow="false"/>
            </v-flex>
            <v-flex xs12 sm12 md12>
                <div>
                </div>
            </v-flex>
        </v-layout>
        
    </div>
</template>
<style scoped>
.main{
    text-align: center;
    position: relative;
}
</style>
<script>
export default {
    data: ()=>({
        defaultData: "preview",
        value: '',
        ar_co: {}
    }),
    created: function(){
        this.$axios({
            method: "GET",
            url: "/" + this.$route.query.type,
            params: {
                id: this.$route.query.id,
                view: true
            }
        })
        .then(res => {
            this.ar_co = res.data.result;
            //访问量+1
        })
        .catch(err => {
            //this.$router.push('/home/notfound');
            if(err.response){
                if(err.response.status==404){
                    this.$message.error('找不到对应资源');
                    this.$router.push('/home/notfound');
                    return;
                }
            }
            this.$message.error('信息获取错误，请重试');
        })
    },
    methods: {
        back: function(){
            this.$router.go(-1);
        },
        like: function(ar_co){
            let flag = `${ar_co.type}+${ar_co.id}`;
            if(localStorage.getItem(flag)){
                this.$message('已经点过赞了哦');
            }
            else{
                let url = `/${ar_co.type}`
                this.$axios({
                    method: 'put',
                    url: url,
                    params: {
                        id: ar_co.id,
                        like: true
                    }
                })
                .then(() => {
                    ar_co.like += 1;
                    localStorage.setItem(flag,'like');
                })
                .catch( () => {
                    this.$message.error('点赞失败，请稍后重试');
                })
            }
        }
    },
    computed: {
        paths: function(){
           let paths = [
               {
                   text: this.$route.query.type,
                   disabled: false,
                   href: '/home/mainpage'
               },{
                   text: this.ar_co.group,
                   disabled: false,
                   href: "/home/mainpage"
               },{
                   text: this.ar_co.title,
                   disabled: true
               }
           ]
           return paths;
        },
    }
}
</script>
