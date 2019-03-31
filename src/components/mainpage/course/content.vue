<template>
<div class="article">
  <v-layout row>
    <v-flex xs12>
      <v-card>
          <div>
          <v-tabs
              dark
              color="indigo darken-1"
              grow
          >
          <v-tabs-slider color="yellow"></v-tabs-slider>
          <v-tab
           v-for="(title,index) in coursetitles"
           :key="index"
           @click="currentTab=title"
          >
          {{ title }}
          </v-tab>
          </v-tabs>
          </div>
        <v-list three-line v-show="currentTab==='javascript'">
          <template v-for="(item, index) in javascripts">
            <v-divider
              :key="index"
            ></v-divider>
            <v-list-tile
              :key="item.title"
              avatar
              @click="goCourse(item.id)"
            >
              <v-list-tile-avatar>
                <img :src="require('./javascript.jpg')">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>

        <v-list three-line v-show="currentTab==='mysql'">
          <template v-for="(item, index) in mysqls">
            <v-divider
              :key="index"
            ></v-divider>
            <v-list-tile
              :key="item.title"
              avatar
              @click="goCourse(item.id)"
            >
              <v-list-tile-avatar>
                <img :src="require('./mysql.jpg')">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>       
        <v-list three-line v-show="currentTab==='linux'">
          <template v-for="(item, index) in linuxs">
            <v-divider
              :key="index"
            ></v-divider>
            <v-list-tile
              :key="item.title"
              avatar
              @click="goCourse(item.id)"
            >
              <v-list-tile-avatar>
                <img :src="require('./linux.jpg')">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
        <v-list three-line v-show="currentTab==='python'">
          <template v-for="(item, index) in pythons">
            <v-divider
              :key="index"
            ></v-divider>
            <v-list-tile
              :key="item.title"
              avatar
              @click="goCourse(item.id)"
            >
              <v-list-tile-avatar>
                <img :src="require('./python.jpg')">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
        <v-list three-line v-show="currentTab==='vue'">
          <template v-for="(item, index) in vues">
            <v-divider
              :key="index"
            ></v-divider>
            <v-list-tile
              :key="item.title"
              avatar
              @click="goCourse(item.id)"
            >
              <v-list-tile-avatar>
                <img :src="require('./vue.jpg')">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
        <v-list three-line v-show="currentTab==='vuetify'">
          <template v-for="(item, index) in vuetifys">
            <v-divider
              :key="index"
            ></v-divider>
            <v-list-tile
              :key="item.title"
              avatar
              @click="goCourse(item.id)"
            >
              <v-list-tile-avatar>
                <img :src="require('./vuetify.jpg')">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
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
</style>

<script>
export default {
  data: () => ({
    coursetitles: ["javascript","mysql","linux","python","vue","vuetify"],
    javascripts: [{
      avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
      title: 'JavaScript入门教学',
      subtitle: '如何学习JavaScript'
    }],
    mysqls: [
      {
        title: 'MySQL入门教学',
        subtitle: '如何学习MySQL'
      }
    ],
    linuxs: [
      {
        title: 'linux入门教学',
        subtitle: '如何学习Linux'
      }
    ],
    pythons: [{
      title:'python入门教学',
      subtitle: '如何学习python'
    }],
    vues: [
      {
        title: 'vue入门教学',
        subtitle: '如何快速学习vue'
      }
    ],
    vuetifys: [
      {
        title: 'ui框架vuetify的学习',
        subtitle: '如何快速使用ui框架vuetify'
      }
    ],
    others: [],
    currentTab: 'javascript'
  }),
  methods: {
    goCourse: function(id){
      const _this = this;
      _this.$axios({
        method: "GET",
        url: "/course",
        params: {
          courseid: id
        }
      })
      .then(res => {
        let cour = res.data.course;
        //console.log(arti);//测试是否成功获取文章
        _this.$store.commit('set_course',cour);//将数据通过vuex传递到显示界界面
        _this.$router.push('/home/display2');
      })
      .catch(err => {
        _this.$router.push('/home/notfound');
        //应该修改此处设置使得不同状态码显示不同的信息
      })
    }
  },
  created: function(){
    const _this = this;
    _this.$axios({
      method: 'GET',
      url: '/coursetitles'
    })
    .then(res => {
      //console.log(res.data.titles.length);
      let titles = res.data.titles;
      _this.javascripts = titles[0];
      _this.mysqls = titles[1];
      _this.linuxs = titles[2];
      _this.pythons = titles[3];
      _this.vues = titles[4];
      _this.vuetifys = titles[5];
      _this.others = titles[6];
    })
    .catch(err => {
      
    })
  }
}
</script>