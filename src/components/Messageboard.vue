<template>
    <div class="board">
        <v-flex xs12 sm12 md12>
            <br>
            <v-card>
                <h2>留言部分</h2>
            </v-card>
        </v-flex>
        <div>
            <v-add></v-add>
                <div v-for="(msg,index) in messages" :key="index">
                    <v-flex xs12 sm6 md6 offset-sm3>
                        <v-card>
                            <v-message  
                                class="content"
                                :content="msg.content"
                                :author="msg.author"
                                :email="msg.email"
                                :addtime="msg.addtime"
                            />
                            
                            <v-btn 
                                flat 
                                color="pink" 
                                @click="admire(index)" 
                                round
                                small
                            >
                                <v-icon>favorite</v-icon>{{ msg.admire }}
                            </v-btn>
                        </v-card>
                    </v-flex>
                </div>
        </div>
        <v-btn outline color="blue darken-1" @click="getmsg(startid,count)" :loading="loading" round>查看更多</v-btn>
    </div>
</template>
<script>
import vMessage from './message/eachmessage';
import vAdd from './message/addmessage';
import vNeterror from './global/neterror.vue';
export default {
    components:{
        vMessage,
        vAdd,
        vNeterror
    },
    data:()=>({
        loading: false,
        messages: [
        //     {
        //     content: "我们的挣扎与彷徨，其实触及的正是身为人的终极使命：我们到底应该怎样活着。",
        //     author: 'Jack',
        //     email: '88106827@qq.com',
        //     admire: 4//增加时候会有一个warn
        // }
        ],
        startid: 1,//开始获取留言数据id
        count: 4, //每次加载获取的留言条数
    }),
    computed: {
        newmsg: function(){
            let msg = this.$store.state.a.msg;//和有modules时候不一样
            return msg;
        }
    },
    watch: {
        //不能监听this.$store.state.msg: 
        newmsg: function(val){
            this.messages.splice(0,0,val);
            console.log("监听到了新增留言");//下一步就是把数据发送到服务端存储好了
        }
    },
    methods: {
        getmsg: function(startid,count){
            this.loading = true;
            const _this = this;
            this.$axios({
                method: "GET",
                url: '/msg',
                params: {
                    startid: startid,//前端传递startid，则后端从倒数第startid个数据开始获取
                    count: count
                }
            })
            .then(function(response){
                const msgs = response.data.msgs;
                if(!msgs.length){
                    _this.$message({
                        showClose: true,
                        message: '已全部加载'
                    });
                    _this.loading = false;
                    return;
                }
                for(var i=0;i<msgs.length;i++){
                _this.messages.push(msgs[i]);
                _this.loading = false;
            }
            _this.startid += _this.count;
            })
            .catch(function(error){
                //console.log(error.response.status);
                _this.loading = false;
                _this.$message.error("留言获取错误，请稍后重试");
            })
        },
        admire: function(index){
            //console.log(this.messages[index].id);
            const _this = this;
            _this.messages[index].admire ++;
            this.$axios({
                method: 'put',
                url: '/msg',
                params: {
                    admiremsgid: this.messages[index].id
                }//put方法不能params??
            })
            .then(res => {
                console.log("点赞成功");
            })
            .catch(err => {
                _this.$message.error("点赞失败，请稍后重试");
                _this.messages[index].admire --;
            })
        }
    },
    mounted: function(){
        this.getmsg(1,this.count);
    }
}
</script>
<style scoped>
.board{
    text-align: center;
    position: relative;
}
.content{
    margin-top: 10px;
    margin-bottom: 40px; 
}
.first{
    font-weight: bold;
    font-size: 2vw;
}
</style>

