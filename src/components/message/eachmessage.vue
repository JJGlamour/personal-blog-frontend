<template>
  <v-layout row wrap>
    <v-flex xs12 sm12 md12>
      <v-card flat>
        <v-card-text>
          <div class="author"><v-icon>face</v-icon><strong>{{ author }}：</strong><br></div><br>
            <div style="text-align:left;">&nbsp;&nbsp;&nbsp;&nbsp;{{ content }}</div>
        </v-card-text>
        
          <div>
            <span class="grey--text">发表于：{{ addtime }}</span>
          </div>
        
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn icon @click="show = !show">
            <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-slide-y-transition>
          <v-card-text v-show="show">
            <v-icon small>email</v-icon>email：{{ email }}
          </v-card-text>
        </v-slide-y-transition>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<style scoped>
.author{
  text-align: left;
}
</style>
<script>
export default {
    props:{//props的东西可以使用内容分发具名slot来实现
        content: {
            type: String
        },
        author: {
            type: String,
            default: '匿名',
        },
        addtime: {
            type: String,
            default: Date()
        },
        email: {
          type: String,
          default: "无"
        }
    },
    data: ()=>({
        show: false
    })
}
</script>

