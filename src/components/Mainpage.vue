<template>
  <div class="main">
    <v-container fluid grid-list-md>
      <v-layout justify-center row wrap>
        <v-flex xs12 sm12 md12>
            <div style="text-align:left;">
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                  {{ currentTab }}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="技术文档">技术文档</el-dropdown-item>
                  <el-dropdown-item command="生活笔记">生活笔记</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
        </v-flex>
        <v-flex xs12 sm8 md8 lg8>
          <v-course v-if="currentTab==='技术文档'" :courses="courses"></v-course>
          <v-article v-if="currentTab==='生活笔记'" :articles="articles"></v-article>
        </v-flex>
        <v-flex xs0 sm4 md4 lg4>
          <v-flex xs12 sm12 md12>
            <el-card>
              <v-card-title><strong>站内文档搜索：</strong></v-card-title>
              <el-autocomplete
                v-model="searchInput"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                style="width:80%;"
                :trigger-on-focus="false"
                @select="handleSelect"
              >
                <template slot-scope="{ item }">
                  <div> {{ item.title }}</div>
                  <span class="time">{{ item.updatetime }}</span>
                </template>
              </el-autocomplete>
            </el-card>
          </v-flex>
          <v-flex xs12 sm12 md12>
            <el-card>
              <v-card-title><strong>推荐阅读：</strong></v-card-title>
              
            </el-card>
          </v-flex>
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
li {
  line-height: normal;
  padding: 7px;
}
.time {
  font-size: 12px;
  color: #b4b4b4;
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
    searchInput: '',
    currentTab: '技术文档',
    articles: [],
    courses: []
  }),
  methods: {
    handleCommand: function(item){
      this.currentTab = item;
    },
    querySearch(queryString, cb) {
      //ES6合并数组
      let alls = [...this.courses, ...this.articles];
      let results = queryString ? alls.filter(this.createFilter(queryString)) : alls;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (result) => {
        //匹配字符串包含关键词
        return (result.title.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
        //表示必须匹配字符串首个字符相同
        //return (result.title.toLowerCase().indexOf(queryString.toLowerCase()) ==0 );
      };
    },
    handleSelect: function(item){
      let url = `/home/display?type=${item.type}&id=${item.id}`;
      this.$router.push(url);
    }
  },
  created: async function(){
    try{
      let response = await this.$axios.get('/article?title=true');
      let results = response.data.articles;
      this.articles = results;
    } catch(e){
      this.$message.error('信息获取错误，请稍后重试');
    }
    try{
      let response = await this.$axios.get('/course?title=true');
      let results = response.data.courses;
      this.courses = results;
    } catch(e){
      this.$message.error('信息获取错误，请稍后重试');
    }
  }
}
</script>
<style scoped>
.first{
  font-weight: bold;
  font-size: 2vw;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
