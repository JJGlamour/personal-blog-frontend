<template>
<div style="text-align:center">
  <v-container grid-list-md title-xs-center>
      <v-layout row wrap justify-center align-center>
          <v-flex xs12 small12 md12>
              <v-card dark color="white">
                <v-progress-linear
                background-color="purple"
                color="blue darken-1"
                :indeterminate="true"
            ></v-progress-linear>
                <h2 style="color:black;">欢迎来到我的博客，你想看的都在这</h2>
                <v-progress-linear
                background-color="purple lighten-3"
                color="blue darken-1"
                :indeterminate="true"
            ></v-progress-linear>
              </v-card>
          </v-flex>
          <v-flex xs12 smll md4 lg4 xl4 v-for="(item,index) in items" :key=index>
              <v-card>
                    <v-hover>
                        <v-card
                        slot-scope="{ hover }"
                        class="mx-auto"
                        color="grey lighten-4"
                        max-width="400"
                        >
                        <v-img
                            :aspect-ratio="16/9"
                            :src="item.imgsrc"
                        >
                            <v-expand-transition>
                                <div
                                    v-if="hover"
                                    class="d-flex transition-fast-in-fast-out blue darken-1 v-card--reveal display-1 white--text"
                                    style="height: 100%;"
                                >
                                    {{ item.desc }}
                                </div>
                            </v-expand-transition>
                        </v-img>
                        <v-card-text
                            class="pt-4"
                            style="position: relative;"
                        >
                            <v-btn
                            absolute
                            color="blue darken-1"
                            class="white--text"
                            fab
                            right
                            top
                            @click="goto(item.path)"
                            >
                                <v-icon>forward</v-icon>
                            </v-btn>
                            <h3 class="display-0 font-weight-light blue--text mb-2" @click="goto(item.path)">{{ item.title }}</h3>
                        </v-card-text>
                        </v-card>
                    </v-hover>
              </v-card>
          </v-flex>
      </v-layout>
  </v-container>
</div>
</template>
<script>
export default {
    data: () => ({
        items: [{
            title: "教程·文章",
            desc: "专注于技术的分享",
            path: "/home/mainpage",
            imgsrc: require('./images/jiaocheng.jpeg')
        },{
            title: "留言部分",
            desc: "说出你想说的话",
            path: "/home/messageboard",
            imgsrc: require('./images/message.jpg')
        },{
            title: "个人信息",
            desc:"爱你哟",
            path: "/home/information",
            imgsrc: require('./images/cute.jpeg')
        },{
            title: "照片馆",
            desc: "记录下生活中那些美好的瞬间",
            path: "/home/imggallery",
            imgsrc: require('./images/imggallery.jpeg')
        },{
            title: "博客简介",
            desc: "与大家分享心得",
            path: "/home/about",
            imgsrc: require('./images/jianjie.jpeg')
        },{
            title: '管理员登录',
            desc: '后台管理',
            path: '/login',
            imgsrc: require('./images/university.jpeg')
        }],
        imgsrc: require('./images/book.jpeg')
    }),
    methods: {
        goto: function(path){
            this.$router.push(path);
        }
    }
}
</script>
<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
}
</style>
