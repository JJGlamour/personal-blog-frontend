<template>
    <div class="main">
        <v-layout align-center justify-center row wrap>
            <v-flex xs12 sm12 md12>
                <v-toolbar flat color="blue darken -1" dark>
                    <v-toolbar-title>校园心理微电影</v-toolbar-title>
                </v-toolbar>
            </v-flex>
            <v-flex xs12 sm12 md8>
                <v-card>
                    <br>
                    <video id="media" controls width="100%;"> 
                        <source src="http://47.101.50.208/blogimg/0.mp4">
                    </video>    
                </v-card>
            </v-flex>
            <v-flex xs12 sm12 md12>
                <v-btn icon @click="greet">
                    <v-icon color="pink">
                        favorite
                    </v-icon>
                </v-btn>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
export default {
    data: () => ({

    }),
    methods: {
        greet: function(){
            this.$message.success('爱你哟');
        }
    },
    created: function(){
        console.log('es6获取到顶层对象的一种方法：');
        const tmp = (typeof window !== 'undefined' ? window : ((typeof process === 'object' &&
            typeof require === 'function' && typeof global === 'object') ? global : this))
        console.log(tmp);
        console.log('完毕');
    }
}
</script>

<style>
.main{
    text-align: center;
}
</style>
