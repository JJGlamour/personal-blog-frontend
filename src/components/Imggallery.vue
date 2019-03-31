<template>
<div>
    <div class="content">
         <v-flex xs12 sm12 md12>
            <br>
            <v-card>
                <h2>照片墙</h2>
            </v-card>
            <br>
        </v-flex>
        
    </div>
    <v-content></v-content>

</div>
</template>

<script>
import vContent from './imggallery/content.vue';

export default {
    components:{
        vContent
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
