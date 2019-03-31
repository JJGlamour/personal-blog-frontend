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
          <h3 class="display-0 mr-3 white--text font-weight-light">兴趣爱好</h3>
          <v-icon
            dark
            size="42"
          >mdi-home-outline</v-icon>
        </v-card-title>
        <v-container>
          <v-layout>
            <v-flex xs12>
              自律的顶端就是享受孤独
            </v-flex>
            <v-flex xs4>
              
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
          <h3 class="display-0 white--text font-weight-light">择偶标准</h3>
        </v-card-title>
        <v-container>
          <v-layout>
            <v-flex
              v-for="n in 3"
              :key="n"
              xs4
            >
              限女性！
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
