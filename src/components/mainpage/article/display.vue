<template>
<div class="main">
    <v-container fluid grid-list-md title-xs-center>
        <v-layout align-center justify-center wrap row>
            <v-flex xs12 sm12 md12 >
                <v-card>
                    <h2>标题：{{ arti.title }}</h2>
                </v-card>
            </v-flex>
            <v-flex xs6 sm6 md6>
                <v-card>
                    <h3>编辑时间：{{ arti.time }}</h3>
                </v-card>
            </v-flex>
            <v-flex xs6 sm6 md6>
                <v-card>
                    <h3>作者： {{ arti.author }}</h3>
                </v-card>
            </v-flex>
            <v-flex xs12 sm12 md12>
                <v-card>
                    <span v-html="arti.content"></span>
                </v-card>
            </v-flex>
            <v-flex xs12 sm12 md12>
                <v-card><span>备注：{{ arti.remark }}</span></v-card>
            </v-flex>
            <v-back></v-back>
        </v-layout>
    </v-container>
</div>
</template>
<style scoped>
.main{
    text-align: center;
}
</style>
<script>
import vBack from '../goback.vue'
export default {
    data: ()=>({
        arti: {
            title: "",
            time: "",
            author: "",
            content: "",
            remark: ""
        }
    }),
    mounted: function(){
        this.arti = this.$store.state.c.article;
    },
    components: {
        vBack
    }
}
</script>
