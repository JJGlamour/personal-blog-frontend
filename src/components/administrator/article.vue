<template>
<v-card class="font">
    <div style="margin-bottom: 10px">
        <v-toolbar card color="blue darken-1" dark>
            <v-btn icon @click="back"><v-icon>arrow_back</v-icon></v-btn>
            <v-toolbar-title>文章管理</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
    </div>
<v-layout row wrap>
    <v-flex xs4 sm4 md4>
        <v-btn right color="blue darken -1" dark @click="newFile" round small>新建</v-btn>
    </v-flex>
    <v-flex xs4 sm4 md4>
        <v-btn right color="primary" round small :loading="importloading" @click="importlog=true">导入</v-btn>
    </v-flex>
    <v-flex xs12 sm12 md12>
        <v-card style="padding:10px;">
            <v-layout row wrap style="color:red;">
                <v-flex xs3 sm3 md3>
                    <div class="line">
                        <strong>标题</strong>
                    </div>
                </v-flex>
                <v-flex xs1 sm1 md1>
                    <div class="line">
                    <strong>作者</strong>
                    </div>
                </v-flex>
                <v-flex xs1 sm1 md1>
                    <div class="line">
                    <strong>分类</strong>
                    </div>
                </v-flex>
                <v-flex xs1 sm1 md1>
                    <div class="line">
                    <strong>浏览量</strong>
                    </div>
                </v-flex>
                <v-flex xs1 sm1 md1>
                    <div class="line">
                    <strong>点赞数</strong>
                    </div>
                </v-flex>
                <v-flex xs2 sm2 md2>
                    <div class="line">
                    <strong>更新时间</strong>
                    </div>
                </v-flex>
                <v-flex xs3 sm3 md3>
                    <div class="line">
                         <strong>操作</strong>
                    </div>
                </v-flex>
            </v-layout>
            <v-layout row wrap v-for="(item,index) in articles" :key="index">
                <v-flex xs3 sm3 md3>
                    <div class="line">
                        <strong>{{item.title}}</strong>
                    </div>
                </v-flex>
                <v-flex xs1 sm1 md1>
                    <div class="line">
                    <strong>{{item.author}}</strong>
                    </div>
                </v-flex>
                <v-flex xs1 sm1 md1>
                    <div class="line">
                    <strong>{{item.group}}</strong>
                    </div>
                </v-flex>
                <v-flex xs1 sm1 md1>
                    <div class="line">
                    <strong>{{item.total_views}}</strong>
                    </div>
                </v-flex>
                <v-flex xs1 sm1 md1>
                    <div class="line">
                    <strong>{{item.like}}</strong>
                    </div>
                </v-flex>
                <v-flex xs2 sm2 md2>
                    <div class="line">
                    <span>{{item.updatetime}}</span>
                    </div>
                </v-flex>
                <v-flex xs3 sm3 md3>
                    <div class="line">
                         <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit(item.id)"></el-button>
                         <el-button type="info" icon="el-icon-download" size="mini" @click="downloadsure(item.id)"></el-button>
                         <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteSure(item.id,index)"></el-button>
                    </div>
                </v-flex>
            </v-layout>
        </v-card>        
    </v-flex>
</v-layout>
<v-dialog width="400" v-model="downloaddialog" persistent>
    <v-card>
        <v-card-title>
            <strong>文档导出为</strong>
        </v-card-title>
        <v-container>
            <v-layout justify-center row wrap align-center>

                <v-flex xs3 sm3 md3>
                    <v-card @click="download('pdf')">
                        <v-img :src='require("../images/pdf.svg")'></v-img>
                    </v-card>
                </v-flex>
                <v-flex xs1 sm1 md1>
                </v-flex>
                <v-flex xs3 sm3 md3>
                    <v-card @click="download('md')">
                        <v-img :src='require("../images/md.svg")'></v-img>
                    </v-card>
                </v-flex>
                <v-flex xs1 sm1 md1>
                </v-flex>
                <v-flex xs3 sm3 md3>
                    <v-card @click="download('word')">
                        <v-img :src='require("../images/word.svg")'></v-img>
                    </v-card>
                </v-flex>

                <v-flex xs3 sm3 md3>
                    <div style="text-align:center">PDF</div>
                </v-flex>
                <v-flex xs1 sm1 md1>
                </v-flex>
                <v-flex xs3 sm3 md3>
                    <div style="text-align:center">MarkDown</div>
                </v-flex>
                <v-flex xs1 sm1 md1>
                </v-flex>
                <v-flex xs3 sm3 md3>
                    <div style="text-align:center">Word</div>
                </v-flex>
            </v-layout>
        </v-container>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small color="green darken -1" flat @click="downloaddialog=false">取消</v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
<v-dialog width="300" v-model="downloadurl" persistent>
    <v-card>
        <v-card-title>
            <strong>
                <a href="" id="ddd" download="">点击下载</a>
            </strong>
        </v-card-title>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small color="blue darken -1" flat @click="downloadurl=false">取消</v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
<v-dialog width="250" v-model="importlog" persistent>
    <v-card>
        <v-card-title>
            <small>目前仅支持导入markdown文件</small>
        </v-card-title>
        <v-container>
            <v-layout justify-center row wrap align-center>
                <v-flex xs2 sm2 md2>
                </v-flex>
                <v-flex xs8 sm8 md8>
                    <v-card>
                        <v-img :src='require("../images/md.svg")'></v-img>
                    </v-card>
                </v-flex>
                <v-flex xs2 sm2 md2>
                </v-flex>
                <v-flex xs2 sm2 md2>
                </v-flex>
                <v-flex xs8 sm8 md8>
                    <br>
                    <a href="javascript:;" class="file">选择文件
                        <input type="file" name="file" id="file" ref="inputer" accept=".md" @change="handleChange"/>
                    </a>
                </v-flex>

            </v-layout>
        </v-container>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small color="green darken -1" flat @click="importlog=false">取消</v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
<v-dialog width="400" v-model="deletedialog" persistent>
    <v-card>
        <v-card-title>
            <strong>删除确认</strong>
        </v-card-title>
        <v-card-text>
            <div>
            <small>标题</small>：{{ deleteindex===undefined?'':articles[deleteindex].title }}
            </div>
            <div>
                <small>作者</small>：{{ deleteindex===undefined?'':articles[deleteindex].author }}
            </div>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small color="red" @click="handleDelete" dark>确定</v-btn>
            <v-btn small color="green darken -1" flat @click="deletedialog=false">取消</v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
</v-card>
</template>
<style scoped>
.line{
    margin-bottom: 20px;

}
.font{
    font-size: 1vw;
}
.font2{
    font-size: 1.5vw;
}
.file {
    position: relative;
    display: inline-block;
    background: #1976D2;
    border: 1px solid #99D3F5;
    border-radius: 20px;
    padding: 5px 25px;
    overflow: hidden;
    color: white;
    font-size: 13px;
    text-decoration: none;
    text-indent: 0;
    line-height: 17px;
}
.file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
}
.file:hover {
    background: #1E88E5;
    border-color: #78C3F3;
    color: white;
    text-decoration: none;
}
</style>
<script>

export default {
    data: ()=>({
        value:'',
        articles: [],
        groups: [],
        downloaddialog: false,
        downloadid: undefined,
        downloadurl: false,
        importlog: false,
        importloading: false,
        deleteid: undefined,
        deleteindex: undefined,
        deletedialog: false
    }),
    components: {
     
    },
    methods: {
        back: function(){
            this.$router.push('/home/administrator/navigation');
        },
       newFile: async function(){
           let paths = [
                {
                    text: '导航',
                    disabled: false,
                    href: '/home/administrator/navigation',
                },{
                    text: '新建文章',
                    disabled: false,
                    href: '/home/administrator/article',
                },{
                    text: '无标题',
                    disabled: true,
                    
                }
           ];
           this.$store.commit('set_groups',this.groups);
           this.$store.commit('set_course',{});
           this.$store.commit('set_paths',paths);
           this.$store.commit('set_url','/article');
           this.$router.push('/home/administrator/editmd');
       },
       edit: async function(articleid){
           this.$axios({
               method: 'get',
               url :'/article',
               params: {
                   id: articleid
               }
           })
           .then(res => {
               let path = [{
                   text: '导航',
                   disabled: false,
                   href: '/home/administrator'
               },{
                   text: '编辑文章',
                   disabled: false,
                   href: '/home/administrator/article'
               },{
                   text: res.data.result.title,
                   disabled: true,
               }];
               this.$store.commit('set_paths',path);
               this.$store.commit('set_groups',this.groups);
               this.$store.commit('set_course',res.data.result);
               this.$store.commit('set_url','/article');
               this.$router.push('/home/administrator/editmd');
           })
       },
       download: function(type){
           this.$axios({
               url: '/article',
               method: 'get',
               params: {
                   idforfile: this.downloadid,
                   filetype: type
               }
           })
           .then(res => {
               let href = res.data.url;
               document.querySelector('#ddd').href = href;
               this.downloaddialog = false;
               this.downloadurl = true;
           })
           .catch(() => {
               this.$message.error('导出失败，请稍后重试');
           })
       },
       downloadsure: function(id){
           this.downloaddialog = true;
           this.downloadid = id;
       },
       handleChange: function(e){
           //console.log(e.target.files[0]);
           this.importlog = false;
           this.importloading = true;
           let formdata = new FormData();
           formdata.append('file',e.target.files[0]);
           formdata.append('filetype', 'md');
           this.$axios({
               url: '/temp',
               method: 'post',
               data: formdata,
               headers: {
                   'Content-Type':'multipart/form-data'
               }
           })
           .then(res => {
               this.importloading = false;
               let path = [{
                   text: '导航',
                   disabled: false,
                   href: '/home/administrator'
               },{
                   text: '文章',
                   disabled: false,
                   href: '/home/administrator/article'
               },{
                   text: res.data.result.title,
                   disabled: true,
               }];
               this.$store.commit('set_paths',path);
               this.$store.commit('set_groups',this.groups);
               this.$store.commit('set_course',res.data.result);
               this.$store.commit('set_url','/article');
               this.$router.push('/home/administrator/editmd');
           })
           .catch(() => {
               this.importloading = false;
               if(err.response){
                   if(err.response.status==403){
                       this.$message.error('文件格式错误，导入失败');
                       return;
                   }
               }
               this.$message.error('文件导入失败，请稍后重试');
           })
       },
       deleteSure: function(id,index){
           this.deleteid = id;
           this.deleteindex = index;
           this.deletedialog= true;
           console.log(this.deleteindex)
       },
       handleDelete: function(){
           this.deletedialog = false;
           // console.log(this.deleteid);
           this.$axios({
               method: 'delete',
               url: '/article',
               params: {
                   id: this.deleteid
               }
           })
           .then(() => {
               this.$message.success("删除成功");
               this.articles.splice(this.deleteindex,1);
           })
           .catch(err => {
               if(err.response){
                   if(err.response.status==401){
                       this.$message.errro('登录失效，请重新登录');
                   }
               }
               else{
                   this.$message.error('删除失败，请稍后重试');
               }
           })
       }
    },
    created: async function(){
        this.$axios.get('/article?title=true')
        .then(res => {
            this.articles = res.data.articles;
        })
        .catch(() => {
            this.$message.error('信息获取错误');
            return;
        })
        let response = await this.$axios.get('/articlegroups');
        this.groups = await response.data.groups;
    }
}
</script>
