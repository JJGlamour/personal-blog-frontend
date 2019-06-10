<template>
<div class="article">
  <v-layout row>
    <v-flex xs12>
      <v-card>
          <div>
          <v-tabs
              grow
              v-model="currentTab"
          >
          <v-tab
           v-for="(title,index) in articlegroups"
           :key="index"
           @click="currentTab=title"
          >
            <strong class="font">{{ title }}</strong>
          </v-tab>
          </v-tabs>
          </div>
        <v-progress-linear :indeterminate="loading" height="5"></v-progress-linear>
        <v-list v-for="(group,index) in articlegroups" :key="index" v-show="currentTab===index">
          <template v-for="(item,index1) in articles[index]">
            <v-list-tile
              :key="item.title"
              avatar
              @click="goarticle(item.id)"
            >
              <v-list-tile-avatar class="font">
                {{index1+1}}
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title" class="font"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.abstract" class="font"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>

      </v-card>
    </v-flex>
  </v-layout>
</div>
</template>
<style scoped>
.article{
    position: relative;
    width: 100%;
    margin-top: 20px;
}
.font{
  font-size: 1vw;
  margin: 0;
  padding: 0;
}
</style>

<script>
export default {
  data: () => ({
    articlegroups: [],
    articles: [],
    currentTab: 0,
    loading: false,
  }),
  methods: {
    goarticle: function(id){
        this.$router.push('/home/display?'+'type=article'+'&'+"id="+id);
    },
    indexOf: function(array,item){
      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (item==element){
          return i;
        }
      }
      return -1;
    }
  },
  created: async function(){
    try{
      let response = await this.$axios.get('/articlegroups');
      this.articlegroups = await response.data.groups;
      for (let j = 0; j < this.articlegroups.length; j++) {
        this.articles.push([]);
      }
      let response2 = await this.$axios.get('/article?title=true');
      let results = response2.data.articles;
      for (let i = 0; i < results.length; i++) {
        const element = results[i];
        let index = this.indexOf(this.articlegroups,element.group);
        this.articles[index].push(element);
      }
    } catch(e){
      this.$message.error('信息获取错误，请稍后重试');
    }
  }
}
</script>