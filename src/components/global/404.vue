<template>
<div class="html">
<div class="body">
    <h1>Page Not Found</h1>
    <p>你所访问的资源不存在</p>
    <br>
    <v-goback></v-goback>
</div> 
</div>
</template>   
<style scoped>
    .html {
        color: #888;
        display: table;
        font-family: sans-serif;
        height: 100%;
        text-align: center;
        width: 100%;
    }
    .body {
        display: table-cell;
        vertical-align: middle;
        margin: 2em auto;
    }
    h1 {
        color: #555;
        font-size: 2em;
        font-weight: 400;
    }
    p {
        margin: 0 auto;
        width: 280px;
    }
    @media only screen and (max-width: 280px) {
        body, p {
            width: 95%;
        }
        h1 {
            font-size: 1.5em;
            margin: 0 0 0.3em;
          }
    }
</style>
<script>
import vGoback from './goback.vue';//路径写为'goback.vue'将会是错的
export default {
    components: {
        vGoback
    }
}
</script>
