<template>
<div>
    <div style="margin-bottom: 10px">
        <v-toolbar card color="blue darken-1" dark>
            <v-btn icon @click="back"><v-icon>arrow_back</v-icon></v-btn>
            <v-toolbar-title>数据统计</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="show = !show">
                <v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
            </v-btn>
        </v-toolbar>
    </div>
</div>
</template>
<script>
export default {
    data: () => ({
        show: true,
    }),
    methods: {
        back: function(){
            this.$router.go(-1);
        }
    }
}
</script>
