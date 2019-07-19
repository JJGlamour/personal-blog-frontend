<template>
  <v-app id="inspire">
    <v-navigation-drawer
      fixed
      :clipped="$vuetify.breakpoint.mdAndUp"
      app
      v-model="drawer"
    >
      <v-list dense>
        <template v-for="item in items">
          <v-list-tile @click="goto(item.path)" :key="item.text"><!--注意传参数的写法-->
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar
      color="blue darken-1"
      dark
      app
      :clipped-left="$vuetify.breakpoint.mdAndUp"
      fixed
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"><v-icon>menu</v-icon></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">glamour's blog</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <router-link to="/login" style="color:white;"><v-icon>person</v-icon></router-link>
      </v-btn>
    </v-toolbar>
    <v-content>
      <transition name="slide-fade">
      <router-view/>
      </transition><!--用transition 把切换组件页面的容器包含，使得组件切换产生动画-->
    </v-content>
  </v-app>
</template>
<script>
export default {
        data: () => ({
        drawer: null,
        items: [
        { icon: "home",text: "首页",path: "/home/navi"},
        { icon: 'book', 'icon-alt':'book',text: '教程·文章' , path: "/home/mainpage" },
        { icon: 'speaker_notes', text: '留言板',path: '/home/messageboard' },
        { icon: 'perm_media', text: '照片',path:'/home/imggallery' },
        { icon: 'brightness_3',text: '个人信息',path:'/home/information'},
        { icon: 'help', text: '关于本站' ,path: '/home/about'},
        // { icon: 'face', text: '管理员测试',path: '/home/administrator' },
        //{ icon: 'http',text: '登入测试',path: '/login'}
        ]
    }),
    props: {
        source: String
    },
    methods: {
      goto: function(path){
        this.$router.push(path);
      }
    }
}
</script>
<style scoped>
.slide-fade{
  position: absolute;left:0;right: 0;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {

  transition: all .1s cubic-bezier(2.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
{
  left:0;right: 0;
  transform: translateX(50px);
  opacity: 0;
}
.font{
  font-size: 1vw;
  margin: 0;
  padding: 0;
}
</style>
