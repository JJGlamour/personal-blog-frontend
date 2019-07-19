<template>
  <v-timeline>
    <v-timeline-item
      color="purple lighten-2"
      fill-dot
      right
    >
      <v-card>
        <v-card-title class="purple lighten-2">
          <v-icon
            dark
            size="42"
            class="mr-3"
          >
            mdi-magnify
          </v-icon>
          <h3 class="display-0 white--text font-weight-light">个人资料</h3>
        </v-card-title>
        <v-container>
          <v-layout>
            <v-flex xs12>
              性别：男。爱好：女。98年生。目前单身。
            </v-flex>
            <v-flex xs1>
              <v-icon size="64">mdi-calendar-text</v-icon>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-timeline-item>

    <v-timeline-item
      color="amber lighten-1"
      fill-dot
      left
      small
    >
      <v-card>
        <v-card-title class="amber lighten-1 justify-end">
          <h3 class="display-0 mr-3 white--text font-weight-light">联系方式</h3>
          <v-icon
            dark
            size="42"
          >mdi-home-outline</v-icon>
        </v-card-title>
        <v-container>
          <v-layout>
            <v-flex xs6 sm6 md4 lg4>
              <div><small>微信</small><v-img :src="require('./wechat.png')" :aspect-ratio="1/1"></v-img></div>
            </v-flex>
            <v-flex xs6 sm6 md4 lg4>
              <div><small>qq</small><v-img :src="require('./qq.png')" :aspect-ratio="1/1"></v-img></div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-timeline-item>

    <v-timeline-item
      color="cyan lighten-1"
      fill-dot
      right
    >
      <v-card>
        <v-card-title class="cyan lighten-1">
          <v-icon
            class="mr-3"
            dark
            size="42"
          >
            mdi-email-outline
          </v-icon>
          <h3 class="display-0 white--text font-weight-light">友情赞助</h3>
        </v-card-title>
        <v-container>
          <v-layout>
            <v-flex xs6 sm4 md4 lg4>
              <div><small>赞助</small><v-img :src="require('./wechatmoney.png')" :aspect-ratio="1/1"></v-img></div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-timeline-item>

    <v-timeline-item
      color="red lighten-1"
      fill-dot
      left
      small
    >
      <v-card>
        <v-card-title class="red lighten-1 justify-end">
          <h3 class="display-0 mr-3 white--text font-weight-light">详细情况</h3>
          <v-icon
            dark
            size="42"
          >
            mdi-account-multiple-outline
          </v-icon>
        </v-card-title>
        <v-container>
          <v-layout>
            <v-flex xs1>
              <v-icon size="64">mdi-server-network</v-icon>
            </v-flex>
            <v-flex xs12>
              偶开天眼觑红尘，可怜身是眼中人。
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-timeline-item>

    <v-timeline-item
      color="green lighten-1"
      fill-dot
      right
    >
      <v-card>
        <v-card-title class="green lighten-1">
          <v-icon
            class="mr-3"
            dark
            size="42"
          >
            mdi-phone-in-talk
          </v-icon>
          <h3 class="display-0 white--text font-weight-light">目前状况</h3>
        </v-card-title>
        <v-container>
          <v-layout>
            <v-flex>
              高校清纯男大学生
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
export default {
    
}
</script>
