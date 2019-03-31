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

                <div v-for="(item,index) in items" :key="index">
                    <v-container grid-list-sm fluid v-if="currentTab===item">
                        <v-layout row wrap align-start>
                            
                            <v-flex xs4 sm4 md4 v-for="(src,index) in imgsrc" :key="index">
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
                            <v-flex xs4 sm4 md4 v-for="i in 6">
                                <v-card flat height='250px' v-if="load">
                                <v-progress-circular
                                :size="50"
                                color="primary"
                                indeterminate
                                ></v-progress-circular>
                                </v-card>
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
        pages: [1,1,1,1],
        imgs:[6,1,1,1,],
        currentTab: '个人写真',
        page: 1,
        //request: currentTab+page,
        imgsrc: [],  //图片源
        imgdesc: [],  //每张图片描述
        imgperpage: 6,
        load: false
    }),
    watch: {
        currentTab: function(){
            // let index;
            // for (let i = 0; i < this.items.length; i++) {
            //     const element = this.items[i];
            //     if(val==element){
            //         index = i;
            //         break;
            //     }
            // }
            //获取图片
            this.page = 1;
            //this.imgsrc = [];
            //this.getimg(this.itemseng[index],1);
            
        },
        requestparams: function(){
            //console.log(val);
            let index;
            for (let i = 0; i < this.items.length; i++) {
                const element = this.items[i];
                if(this.currentTab==element){
                    index = i;
                    break;
                }
            }
            this.imgsrc = [];
            this.getimg(this.itemseng[index],this.page);//val==this.page
        }
    },
    created: function(){

    },
    mounted: function(){
        const _this = this;
        _this.$axios({
            url: '/img',
            method: 'get',
            params: {
                itemsforpage: _this.itemseng.toString()
            }
        })
        .then(res => {
            //console.log(res.data)
            let nums = res.data.groupnums;//每种类型图片各自总数
            _this.imgs = nums;
            let pages = [];
            for (let i = 0; i < _this.items.length; i++) {
                let page = Math.ceil(nums[i]/6);//每页显示六张图片
                if(page<=0){
                    page = 1;
                }
                pages.push(page);
            }
            _this.pages = pages;
            _this.getimg(this.itemseng[index],this.page);
        })
        .catch(err => {
            if(err.response){
                _this.$message.error(err.requestparams.data.error);
            }
            else{
                _this.$message.error('图片页码获取出现错误');
            }
        })
        let index;
        for (let i = 0; i < this.items.length; i++) {
            const element = this.items[i];
            if(this.currentTab==element){
                index = i;
                break;
            }
        }
        //必须等获取完图片数量以后才根据序号获取图片
        
    },
    methods:{
        getPerImg: function(group,number,j){
            const _this = this;
            let index;
            for (let i = 0; i < this.itemseng.length; i++) {
                const element = this.itemseng[i];
                if(group==element){
                    index = i;
                    break;
                }
            }
            if(j >= 6){
                return;
            }
            if(number > this.imgs[index]){
                return;
            }
            _this.$axios({
                url: '/img',
                method: 'get',
                responseType: 'arraybuffer',
                params: {
                    group: group,
                    number: number//每张图片索引
                }
            })
            .then(res => {
                let src = 'data:image/png;base64,'+btoa(new Uint8Array(res.data).reduce((data,byte)=>data+String.fromCharCode(byte),''));
                _this.imgsrc.push(src);
                //_this.imgsrc.splice(i,0,src);
                _this.load = false;
                j += 1;
                //console.log("第"+j+"张图片");
                _this.getPerImg(group,number+1,j);//递归调用
            })
            .catch(err => {
                //console.log(err);
                _this.load = false;
                if(err.response){
                    switch(err.response.status)
                    {
                        case 404: 
                            _this.$message.error('404未找到对应资源');
                            break;
                        default:
                            _this.$message.error('服务器资源出现错误，请稍后重试');
                    }
                }
                else{
                    _this.$message.error('服务器资源出现错误，请稍后重试');
                }
            })
        },
        getPerImgDesc: function(group,number,k){
            const _this = this;
            let index;
            for (let i = 0; i < this.itemseng.length; i++) {
                const element = this.itemseng[i];
                if(group==element){
                    index = i;
                    break;
                }
            }
            if(k >= 6){
                return;
            }
            if(number > this.imgs[index]){
                return;
            }
            _this.$axios({
                url: '/img',
                method: 'get',
                params: {
                    group_for_desc: group,
                    number_for_desc: number,
                }
            })
            .then(res => {
                this.imgdesc.push(res.data.remark);
                //this.imgdesc.splice(i,0,res.data.remark)
                k += 1;
                //console.log("第"+k+"张描述");
                _this.getPerImgDesc(group,number+1,k);
            })

            .catch(err => {
                if(err.response){
                    switch(err.response.status)
                    {
                        case 404: 
                            _this.$message.error('404未找到对应资源');
                            break;
                        default:
                            _this.$message.error('服务器资源出现错误，请稍后重试');
                    }
                }
                else{
                    _this.$message.error('服务器资源出现错误，请稍后重试');
                }  
            })
        },
        getimg: function(group,page){
            this.load = true;
            this.imgsrc = [];
            this.imgdesc = [];
            let number = (page-1)*this.imgperpage+1;
            let j = 0;
            let k = 0;
            this.getPerImg(group,number,j);
            this.getPerImgDesc(group,number,k);
           //函数结束
           //loading.close();
           
        }

    },
    computed: {
        requestparams: function(){
            return this.currentTab+this.page;//计算属性只有在它的相关依赖发生改变时才会重新请求值
        }
    }

}
</script>

