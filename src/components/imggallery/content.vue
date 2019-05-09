<template>
<div style="text-align:center">
    <v-layout row wrap>
        <v-flex xs12 sm12 md12>
            <v-card flat>
                <v-tabs grow color='blue darken-1' dark>
                    <v-tabs-slider color="yellow"></v-tabs-slider>
                        <v-tab v-for="(item,index) in items" :key="index" @click="currentTab=item">
                            {{ item }}
                        </v-tab>
                </v-tabs>
                <v-progress-linear :indeterminate="loading" height="15"></v-progress-linear>

                <div v-for="(item,index) in items" :key="index">
                    <v-container grid-list-sm fluid v-if="currentTab===item">
                        <v-layout row wrap align-start>
                            <v-flex xs6 sm6 md4 lg4 xl4 v-for="(src,index) in imgsrc" :key="index">
                                <v-hover>
                                    <v-card 
                                        tile 
                                        slot-scope="{ hover }" 
                                        class="mx-auto"
                                        color="grey lighten-4"
                                    >
                                        <v-img :src="src" :aspect-ratio="16/13">
                                            <v-expand-transition>
                                                <div v-if="hover" 
                                                    class="d-flex transition-fast-in-fast-out light indigo lighten-5 v-card--reveal body-2 black--text" 
                                                    style="height: 20px;">
                                                    <div style="text-align:center">{{imgdesc[index]}}</div>
                                                </div>
                                            </v-expand-transition>
                                        </v-img>    
                                    </v-card>
                                </v-hover>
                            </v-flex>
                            <v-flex xs12 sm12 md12>
                                <span><span class="grey--text">当前位置：</span>{{ currentTab }}-第{{ page }}页</span><hr>
                                    <div class="text-xs-center">
                                        <v-pagination
                                        v-model="page"
                                        :length="pages[index]"
                                        :total-visible="7"
                                        ></v-pagination>
                                    </div> 
                                <hr>
                            </v-flex>
                        </v-layout>
                    </v-container>

                </div>
            </v-card>
        </v-flex>
    </v-layout>
</div>
</template>
<script>
export default {
    data: ()=>({
        items: ['个人写真','校园春色','我的家乡','其他'],
        itemseng: ['grxz','xycs','wdjx','qt'],
        currentTab: '个人写真',
        page: 1,
        pages: [1,1,1,1],
        imgnums:[6,1,1,1,],
        imgsrc: [],  //图片源
        imgdesc: [],  //每张图片描述
        imgperpage: 6,
        loading: false
    }),
    watch: {
        currentTab: function(){
            this.page = 1;
        },
        requestparams: async function(){
            //console.log(val);
            let index;
            for (let i = 0; i < this.items.length; i++) {
                const element = this.items[i];
                if(this.currentTab==element){
                    index = i;
                    break;
                }
            }
            this.loading = true;
            this.imgsrc = [];
            this.imgdesc = [];
            for (let i = 0; i < this.imgperpage; i++) {
                await this.getImg(this.itemseng[index],(this.page-1)*6+i+1);               
            }
        }
    },
    created: async function(){
        this.loading = true;
        await this.$axios({
            method: 'get',
            url: '/img',
            params: {
                itemsfornums: this.itemseng.toString()
            }
        })
        .then(res => {
            this.imgnums = res.data.imgnums;
            for (let i = 0; i < this.imgnums.length; i++) {
                const num = this.imgnums[i];
                this.pages[i] = Math.ceil(num/this.imgperpage);
            }  
        })
        .catch(() => {
            this.$message.error('图片信息获取错误，请稍后重试');
            return;
        })  
        for (let i = 0; i < this.imgperpage; i++) {
            await this.getImg(this.itemseng[0],(this.page-1)*6+i+1); 
            
        }
    },
    methods:{
        getImg: async function(group,number){
            const _this = this;
            let index;
            for (let i = 0; i < this.itemseng.length; i++) {
                const element = this.itemseng[i];
                if(group==element){
                    index = i;
                    break;
                }
            }
            await this.$axios({
                method: 'get',
                url: '/img',
                params: {
                    group: group,
                    number: number
                }
            }) 
            .then(res => {
                let img = res.data.img;
                this.imgsrc.push(img.src);
                this.imgdesc.push(img.remark);
                this.loading = false;
                //console.log(res.data.img.date+res.data.img.remark);
            })
            .catch(err => {
                if(err.response){
                    if(err.response.status==404){
                        //console.log('404');
                        this.loading = false;
                    }
                }
                else{
                    this.$message.error('图片获取错误');
                }
            })          
        },
        
    },
    computed: {
        requestparams: function(){
            return this.currentTab+this.page;//计算属性只有在它的相关依赖发生改变时才会重新请求值
        }
    }
}
</script>

