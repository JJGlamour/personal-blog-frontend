<template>
<div class="course">
  <v-layout row>
    <v-flex xs12>
      <v-card>
        <v-error :net="neterror"></v-error>
        <div>
          <v-tabs
              dark
              color="purple lighten-1"
              grow
          >
            <v-tabs-slider color="yellow"></v-tabs-slider>
            <v-tab
              v-for="(title,index) in articletitles"
              :key="index"
              @click="currentTab=title"
            >
            {{ title }}
            </v-tab>
          </v-tabs>
        </div>

        <v-list two-line v-show="currentTab==='学习心得'">
          <template v-for="(item, index) in xxxds">
            <v-list-tile :key="index" avatar ripple @click="goArticle(item.id)"><!--编辑式导航-->
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-list-tile-action-text>{{ item.action }}</v-list-tile-action-text>
                <v-icon color="grey lighten-1">star_border</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider v-if="index + 1 < xxxds.length" :key="`divider-${index}`"></v-divider>
          </template>
        </v-list>

        <v-list two-line v-show="currentTab==='旅行日记'">
          <template v-for="(item, index) in lxrjs">
            <v-list-tile :key="index" avatar ripple @click="goArticle(item.id)"><!--编辑式导航-->
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-list-tile-action-text>{{ item.action }}</v-list-tile-action-text>
                <v-icon color="grey lighten-1">star_border</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider v-if="index + 1 < lxrjs.length" :key="`divider-${index}`"></v-divider>
          </template>
        </v-list>

        <v-list two-line v-show="currentTab==='生活点滴'">
          <template v-for="(item, index) in shdds">
            <v-list-tile :key="index" avatar ripple @click="goArticle(item.id)"><!--编辑式导航-->
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-list-tile-action-text>{{ item.action }}</v-list-tile-action-text>
                <v-icon color="grey lighten-1">star_border</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider v-if="index + 1 < shdds.length" :key="`divider-${index}`"></v-divider>
          </template>
        </v-list>

        <v-list two-line v-show="currentTab==='我的大学'">
          <template v-for="(item, index) in wddxs">
            <v-list-tile :key="index" avatar ripple @click="goArticle(item.id)"><!--编辑式导航-->
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-list-tile-action-text>{{ item.action }}</v-list-tile-action-text>
                <v-icon color="grey lighten-1">star_border</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider v-if="index + 1 < wddxs.length" :key="`divider-${index}`"></v-divider>
          </template>
        </v-list>

        <v-list two-line v-show="currentTab==='年少有你'">
          <template v-for="(item, index) in nsyns">
            <v-list-tile :key="index" avatar ripple @click="goArticle(item.id)"><!--编辑式导航-->
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-list-tile-action-text>{{ item.action }}</v-list-tile-action-text>
                <v-icon color="grey lighten-1">star_border</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider v-if="index + 1 < nsyns.length" :key="`divider-${index}`"></v-divider>
          </template>
        </v-list>

      </v-card>
    </v-flex>
  </v-layout>
</div>
</template>
<style scoped>
.course{
    position: relative;
    width: 100%;
    margin-top: 20px;
}
</style>
<script>
import vError from '../neterror.vue'
export default {
  data: () => ({
    currentTab: '学习心得',
    articletitles: ["学习心得","旅行日记","生活点滴","我的大学","年少有你"],
    xxxds: [
      {
        action: '15min',
        title: '日常感想',
        subtitle: '日常感想'
      }
    ],
    lxrjs: [{}],
    shdds:[{}],
    wddxs:[{}],
    nsyns:[{}],
    others: [{}],
    neterror: false
  }),
  methods: {
    goArticle: function(id){
      const _this = this;
      _this.$axios({
        method: "GET",
        url: "/article",
        params: {
          articleid: id
        }
      })
      .then(res => {
        let arti = res.data.article;
        //console.log(arti);//测试是否成功获取文章
        _this.$store.commit('set_article',arti);//将数据通过vuex传递到显示界界面
        _this.$router.push('/home/display1');
      })
      .catch(err => {
        //_this.$router.push('/home/notfound');
        //应该修改此处设置使得不同状态码显示不同的信息
        _this.neterror = true;
        setTimeout(() => {
          _this.neterror = false;
        }, 4000);
      })
    }
  },
  created: function(){
    const _this = this;
    _this.$axios({
      method: 'GET',
      url: '/articletitles'
    })
    .then(res=> {
      const titles = res.data.titles;
      _this.xxxds = titles[0];
      _this.lxrjs = titles[1];
      _this.shdds = titles[2];
      _this.wddxs = titles[3];
      _this.nsyns = titles[4];
      _this.others = titles[5];
    })
    .catch(err => {
      _this.neterror = true;
      setTimeout(() => {
        _this.neterror = false;
      }, 4000);
    })
  },
  components: {
    vError
  }
}
</script>