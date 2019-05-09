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
           v-for="(title,index) in coursegroups"
           :key="index"
           @click="currentTab=title"
          >
            <strong class="font">{{ title }}</strong>
          </v-tab>
          </v-tabs>
          </div>
        <v-progress-linear :indeterminate="loading" height="5"></v-progress-linear>
        <v-list v-for="(group,index) in coursegroups" :key="index" v-show="currentTab===index">
          <template v-for="(item,index1) in courses[index]">
            <v-list-tile
              :key="item.title"
              avatar
              @click="goCourse(item.id)"
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
    font-size: 1vw;
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
    coursegroups: [],
    courses: [],
    currentTab: 0,
    loading: false,
  }),
  methods: {
    goCourse: function(id){
      this.loading = true;
      this.$axios({
        method: "GET",
        url: "/course",
        params: {
          courseid: id
        }
      })
      .then(res => {
        let course = res.data.course;
        let paths = [
          {
            text: '教程',
            disabled: false,
            href: '/home/mainpage',
          },{
            text: course.group,
            disabled: false,
            href: '/home/mainpage'
          },{
            text: course.title,
            disabled: true,
          }
        ]
        this.loading = false;
        this.$store.commit('set_display_course',course);//将数据通过vuex传递到显示界界面
        this.$store.commit('set_display_paths',paths);
        this.$router.push('/home/display');
      })
      .catch(err => {
        this.$router.push('/home/notfound');
        
      })
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
      let response = await this.$axios.get('/coursegroups');
      this.coursegroups = await response.data.groups;
      for (let j = 0; j < this.coursegroups.length; j++) {
        this.courses.push([]);
      }
      let response2 = await this.$axios.get('/course?title=true');
      let results = response2.data.courses;
      for (let i = 0; i < results.length; i++) {
        const element = results[i];
        let index = this.indexOf(this.coursegroups,element.group);
        this.courses[index].push(element);
      }
    } catch(e){
      this.$message.error('信息获取错误，请稍后重试');
    }
  }
}
</script>