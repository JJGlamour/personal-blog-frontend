<template>
  <div class="main">
    <v-container fluid grid-list-md>
      <v-layout justify-center row wrap>
        <v-flex xs8 sm8 md8 lg8>
          <v-course></v-course>
        </v-flex>
        <v-flex xs4 sm4 md4>
          <v-card style="margin-top:20px;padding:10px;">
            <v-card-title><strong>站内搜索：</strong></v-card-title>
            <el-input
              class="font"
              placeholder="输入搜索内容"
              suffix-icon="el-icon-search"
              v-model="searchInput">
            </el-input>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout justify-center row wrap>
        <v-flex xs8 sm8 md8>
          <v-article></v-article>
        </v-flex>
        <v-flex xs4 sm4 md4>
          <v-card style="margin-top:20px;padding:10px;">
            <v-card-title><strong>推荐阅读：</strong></v-card-title>
              
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<style scoped>
.main{
  position: relative;
  text-align: center;
  font-size: 1vw;
}
.font{
  font-size: 1vw;
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
  data: () => ({
    searchInput: ''
  })
  
}
</script>
<style scoped>
.first{
  font-weight: bold;
  font-size: 2vw;
}
</style>
