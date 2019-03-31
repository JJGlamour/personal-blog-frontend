<template>
    <div class="text-xs-center">
        <v-btn outline color="indigo" @click="back" round small>返回</v-btn>
    </div>
</template>
<script>
export default {
    methods: {
        back: function(){
            this.$router.go(-1);
        }
    }
}
</script>

