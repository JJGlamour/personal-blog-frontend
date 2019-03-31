<template>
    <v-layout>
        <v-flex xs12 sm6 offset-sm3>
            <v-card>
                <v-layout row>
                    <v-flex xs7>
                        <v-card-title primary-title>
                            <div>
                                <div class="headline">Glamour</div>
                                <div><v-icon small>email</v-icon>&nbsp;&nbsp;88106827@qq.com</div>
                                <div><v-icon small>place</v-icon>&nbsp;&nbsp;江苏·南京</div>
                            </div>
                        </v-card-title>
                    </v-flex>
                    <v-flex xs5>
                        <v-img
                        :src="require('../images/head.jpg')"
                        height=125px
                        contain
                        ></v-img>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-flex>
    </v-layout>
</template>
<script>
export default {
    
}
</script>
