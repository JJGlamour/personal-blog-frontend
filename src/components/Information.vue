<template>
    <div class="content">
        <v-flex xs12 sm12 md12>
            <br>
            <v-card>
                <h2>个人信息</h2>
            </v-card>
            <br>
        </v-flex>
        <v-head></v-head>
        <v-navigation></v-navigation>
    </div>
</template>
<script>
import vNavigation from './information/navigation.vue'
import vHead from './information/head.vue'
export default {
    components: {
       vNavigation,
       vHead
    }
}
</script>
<style scoped>
.content{
    position: relative;
    text-align: center;
}
.first{
    font-weight: bold;
    font-size: 2vw;
}
</style>
