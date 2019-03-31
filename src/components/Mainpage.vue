<template>
  <div class="main">
    <!-- <h1>主页</h1> -->
    <hr>
    <div class="columnleft">
      <br>
      <h2><span>文章发表</span></h2>
      
      <v-article></v-article>
    </div>

    <div class="columnright">
      <br>
      <h2><span>各类教程</span></h2>
      <router-view></router-view><!--测试路由嵌套-->
      <v-course></v-course>
    </div>
  </div>
</template>
<style scoped>
.main{
  position: relative;
  text-align: center;
}
.columnleft{
  position: relative;
}
.columnright{
  position: relative;
}
</style>
<script>
import course from './mainpage/course/content.vue';
import article from './mainpage/article/content.vue';
export default {
  components: {
    vCourse: course,
    vArticle: article
  },
  data(){
    return{
    } 
  }
}
</script>
<style scoped>
.first{
  font-weight: bold;
  font-size: 2vw;
}
</style>
