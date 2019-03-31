<template>
<div class="content">
     <v-flex xs12 sm12 md12>
            <br>
            <v-card>
                <h2>博客介绍</h2>
            </v-card>
    </v-flex>
    <v-container fluid grid-list-md>
        <v-layout row wrap align-center justify-center>
            <v-flex xs12 sm6 md6>
                <v-card>
                    <div>爱的开始是一个眼色，爱的最后是无力的苍穹。</div>
                </v-card>
            </v-flex>
            <v-flex xs12 sm6 md6>
                <v-card>
                    众里嫣然通一顾，人间颜色如尘土。
                </v-card>
            </v-flex>
            <v-flex xs12 sm6 md6>
                <v-card color="white">
                    <v-card-title primary-title>
                    <v-layout row wrap>
                        <v-flex xs12 sm12 md12>
                            <v-card>
                                <div class="headline">GJJ</div>
                            </v-card>
                        </v-flex>
                        <v-flex xs12 sm12 md12>
                            <v-card>
                                看清生活的真相仍然喜欢你
                            </v-card>
                        </v-flex>
                    </v-layout>
                    </v-card-title>
                    <v-img
                        :src="require('./images/dog.jpeg')"
                        height=400px
                    >
                    图片即为本人
                    </v-img>
                </v-card>
            </v-flex>
            <br>
            <v-flex xs12 sm12 md12>
                <v-card>
                    既然来了，那就留下点什么吧！
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs12 sm6 md6>
                <v-card>

                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.content{
    text-align: center;
}
.first{
    font-weight: bold;
    font-size: 2vw;
}
</style>

