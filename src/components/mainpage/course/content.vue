<template>
<div class="article">
  <v-layout row>
    <v-flex xs12>
      <div v-for="(item,index) in courses" :key="index" class="card">
        <el-card shadow="hover">
          <div>
            <el-tag>{{ item.group }}</el-tag>
            &nbsp;&nbsp;<span class="title"><a href="javascript:;" @click="goCourse(item.id)">{{ item.title }}</a></span>
          </div>
          <div style="margin:10px;">
            &nbsp;&nbsp;&nbsp;&nbsp;摘要：{{ item.abstract }}
          </div>
          <div>
            <v-icon small>edit</v-icon><small>&nbsp;{{ item.author }}</small>
            &nbsp;&nbsp;
            <v-icon small>timelapse</v-icon><small>&nbsp;{{ item.updatetime }}</small>
            &nbsp;&nbsp;
            <v-icon small>remove_red_eye</v-icon><small>&nbsp;{{ item.total_views }}</small>
            &nbsp;&nbsp;
            <v-icon small>favorite</v-icon><small>&nbsp;{{ item.like }}</small>
            &nbsp;&nbsp;
            <v-icon small>textsms</v-icon><small>&nbsp;{{  }}</small>
          </div>
        </el-card>
      </div>
    </v-flex>
  </v-layout>
</div>
</template>
<style scoped>
.article{
    position: relative;
    width: 100%;
    font-size: 1vw;
}
.font{
  font-size: 1vw;
  margin: 0;
  padding: 0;
}
.card{
  margin-bottom: 10px;
  text-align: left;
}
a{
  color: black;
  text-decoration: none;
}
a:hover{
  color: #1E88E5;
}
</style>

<script>
export default {
  data: () => ({
    currentTab: 0,
    loading: false,
  }),
  methods: {
    goCourse: function(id){
      //模板字符串
      let path = `/home/display?type=course&id=${id}`;
      this.$router.push(path);
    },
  },
  props: {
    courses: {
      type: Array
    }
  },
  created: async function(){

  }
}
</script>