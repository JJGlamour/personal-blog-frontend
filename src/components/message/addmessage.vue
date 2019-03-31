<template>
<div>
    <v-btn
      fab
      right
      color="blue darken-3"
      dark
      fixed
      small
      @click.stop="dialog = !dialog"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title
          class="grey lighten-4 py-4 title"
        >
          添加留言
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 align-center justify-space-between>
              <v-layout align-center>
                <v-text-field
                  prepend-icon="notes"
                  placeholder="留言内容"
                  v-model="message.content"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                prepend-icon="account_box"
                placeholder="昵称"
                v-model="message.author"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                prepend-icon="mail"
                placeholder="Email(选填)"
                v-model="message.email"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn  @click="dialog = false" small round>取消</v-btn>
          <v-btn @click="submitmsg" :loading="loading" color="info" small round>发表</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-layout row justify-center>
      <v-dialog v-model="dialog1" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">Warning!</v-card-title>
          <v-card-text>留言内容不能为空</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click="dialog1 = false">了解</v-btn>
            <v-btn color="green darken-1" flat @click="dialog1 = false">关闭</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

</div>
</template>
<script>
export default {
    components: {
      
    },
    data: () => ({
        dialog: false,
        dialog1: false,
        loading: false,
        message: {
          content: '',
          author: '',
          email: '',
         
        }
    }),
    methods: {
      submitmsg: function(){
        const _this = this;
         if(!this.message.content){
           this.dialog1 = true;
           return;
         }
         else{
           this.loading = true;
           this.$axios({
             method: "POST",
             url: "/msg",
             data: {
               author: _this.message.author,
               content: _this.message.content,
               email: _this.message.email
             }
           })
           .then(res => {
             _this.dialog = false;
             _this.message = {};
             _this.loading = false;
             _this.$router.go(0);//留言成功以后重新加载当前页面
           })
           .catch(err => {
             _this.loading = false;
             _this.$message.error("留言失败，请稍后重试");
           })
         }
      }
    }
}
</script>
<style scoped>

</style>

