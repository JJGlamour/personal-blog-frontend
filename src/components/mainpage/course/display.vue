<template>
<div class="main">
    <v-container fluid grid-list-md title-xs-center>
        <v-layout align-center justify-center wrap row>
            <v-flex xs12 sm12 md12 >
                <v-card>
                    <h2>标题：{{ cour.title }}</h2>
                </v-card>
            </v-flex>
            <v-flex xs6 sm6 md6>
                <v-card>
                    <h3>编辑时间：{{ cour.time }}</h3>
                </v-card>
            </v-flex>
            <v-flex xs6 sm6 md6>
                <v-card>
                    <h3>作者： {{ cour.author }}</h3>
                </v-card>
            </v-flex>
            <v-flex xs12 sm12 md12>
                <v-card>
                    <span v-html="cour.content"></span>
                </v-card>
            </v-flex>
            <v-flex xs12 sm12 md12>
                <v-card><span>备注：{{ cour.remark }}</span></v-card>
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
        cour: {
            title: "",
            time: "",
            author: "",
            content: "",
            remark: ""
        }
    }),
    mounted: function(){
        this.cour = this.$store.state.c.course;
    },
    components: {
        vBack,
    }
}
</script>
