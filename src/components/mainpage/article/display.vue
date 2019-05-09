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
import vBack from '../goback.vue'
export default {
    data: ()=>({
        defaultData: "preview",
        value: ''
    }),
    mounted: function(){
 
        
    },
    methods: {
        back: function(){
            this.$router.go(-1);
        }
    },
    computed: {
        paths: function(){
            return this.$store.state.display.display_paths;
        },
        ar_co: function(){
            //用于判断是文档重新修改还是文档新建
            return this.$store.state.display.dislpay_course;
        }
    }
}
</script>
