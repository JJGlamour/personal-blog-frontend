<template>
<v-card class="font">
    <div style="margin-bottom: 10px">
        <v-toolbar card color="blue darken-1" dark>
            <v-btn icon @click="back"><v-icon>arrow_back</v-icon></v-btn>
            <v-toolbar-title>教程管理</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
    </div>
<v-layout row wrap>
    <v-flex xs4 sm4 md4>
        <v-btn right color="blue darken -1" dark @click="newFile" round small>新建</v-btn>
    </v-flex>
    <v-flex xs4 sm4 md4>
        <v-btn right color="primary" round small>导入</v-btn>
    </v-flex>
    <v-flex xs12 sm12 md12>
        <v-card style="padding:10px;">
            <v-layout row wrap style="color:red;">
                <v-flex xs3 sm3 md3>
                    <div class="line">
                        <strong>标题</strong>
                    </div>
                </v-flex>
                <v-flex xs2 sm2 md2>
                    <div class="line">
                    <strong>作者</strong>
                    </div>
                </v-flex>
                <v-flex xs2 sm2 md2>
                    <div class="line">
                    <strong>分类</strong>
                    </div>
                </v-flex>
                <v-flex xs3 sm3 md3>
                    <div class="line">
                    <strong>更新时间</strong>
                    </div>
                </v-flex>
                <v-flex xs2 sm2 md2>
                    <div class="line">
                         <strong>操作</strong>
                    </div>
                </v-flex>
            </v-layout>
            <v-layout row wrap v-for="(item,index) in courses" :key="index">
                <v-flex xs3 sm3 md3>
                    <div class="line">
                        <strong>{{item.title}}</strong>
                    </div>
                </v-flex>
                <v-flex xs2 sm2 md2>
                    <div class="line">
                    <strong>{{item.author}}</strong>
                    </div>
                </v-flex>
                <v-flex xs2 sm2 md2>
                    <div class="line">
                    <strong>{{item.group}}</strong>
                    </div>
                </v-flex>
                <v-flex xs3 sm3 md3>
                    <div class="line">
                    <span>{{item.updatetime}}</span>
                    </div>
                </v-flex>
                <v-flex xs2 sm2 md2>
                    <div class="line">
                         <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit(item.id)"></el-button>
                         <el-button type="info" icon="el-icon-download" size="mini" @click="downloadsure(item.id)"></el-button>
                         <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteSure(item.id)"></el-button>
                    </div>
                </v-flex>
            </v-layout>
        </v-card>
        <!-- <v-data-table :headers="headers" :items="courses">
            <template v-slot:items="props">
                <td>{{props.item.id}}</td>
                <td>{{props.item.title}}</td>
                <td>{{props.item.author}}</td>
                <td>{{props.item.updatetime}}</td>
            </template>
        </v-data-table> -->
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
                <v-flex xs1 sm1 md1>
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
#downbutton{
   
}
</style>
<script>

import vCourse1 from './course1.vue'
import vCourse2 from './course2.vue'
export default {
    data: ()=>({
        value:'',
        courses:[],
        groups:[],
        downloaddialog: false,
        downloadid: undefined,
        downloadurl: false,
    }),
    components: {
        vCourse1,
        vCourse2
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
                    text: '新建教程',
                    disabled: false,
                    href: '/home/administrator/course',
                },{
                    text: '无标题',
                    disabled: true,
                    
                }
           ];
           this.$store.commit('set_course',{});
           this.$store.commit('set_groups',this.groups);
           this.$store.commit('set_paths',paths);
           this.$store.commit('set_url','/course');
           this.$router.push('/home/administrator/editmd');
       },
       edit: function(courseid){
           this.$axios({
               method: 'get',
               url :'/course',
               params: {
                   courseid: courseid
               }
           })
           .then(res => {
               let path = [{
                   text: '导航',
                   disabled: false,
                   href: '/home/administrator'
               },{
                   text: '教程',
                   disabled: false,
                   href: '/home/administrator/course'
               },{
                   text: res.data.course.title,
                   disabled: true,
               }];
               this.$store.commit('set_paths',path);
               this.$store.commit('set_groups',this.groups);
               this.$store.commit('set_course',res.data.course);
               this.$store.commit('set_url','/course');
               this.$router.push('/home/administrator/editmd');
           })
       },
       download: function(type){
           this.$axios({
               url: '/course',
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
       }
    },
    created: async function(){
        this.$axios.get('/course?title=true')
        .then(res => {
            this.courses = res.data.courses;
        })
        .catch(() => {
            this.$message.error('信息获取错误');
            return;
        })
        let res = await this.$axios.get('/coursegroups');
        this.groups = res.data.groups;
    }
}
</script>
