<template>
    <div class="main">
        <v-layout align-center row wrap>
            <v-flex xl8 sm8 md8>
                <v-breadcrumbs :items="paths" divider=">"></v-breadcrumbs>
            </v-flex>
            <v-flex xl4 sm4 md4>
                <v-btn icon><v-icon color="pink">favorite</v-icon>4</v-btn>
                <v-btn icon><v-icon color="blue">visibility</v-icon>4</v-btn>
                <v-btn small round color="primary" @click="back">返回</v-btn>
            </v-flex>
            <v-flex xs12 sm12 md12>
                <mavon-editor v-model="ar_co.content" :subfield="false" :defaultOpen="defaultData" :toolbarsFlag="false" :boxShadow="false"/>
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
                id: this.$route.query.id
            }
        })
        .then(res => {
            this.ar_co = res.data.result;
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
