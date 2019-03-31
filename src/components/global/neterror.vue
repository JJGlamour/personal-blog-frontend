<template>
    <v-alert
     color="error"
     icon="warning"
     v-model="net"
     transition="scale-transition"
     >
     网络错误，请稍后重试
    </v-alert>
</template>

<script>
export default {
    props: {
        net: {
            type: Boolean,
            default: false
        }
    }
}
</script>
