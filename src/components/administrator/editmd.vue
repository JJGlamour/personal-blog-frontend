<template>
    <div>
        <v-container fluid>
        <v-layout align-center row wrap>
            <v-flex xl8 sm8 md8>
                <v-breadcrumbs :items="paths" divider=">"></v-breadcrumbs>
            </v-flex>
            <v-flex xl4 sm4 md4>
                <el-dropdown @command="handleCommand">
                <el-button type="primary" >
                    设置<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="setting">文档设置</el-dropdown-item>
                    <el-dropdown-item command="statistics">统计信息</el-dropdown-item>
                    <el-dropdown-item command="exit">退出此页</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>&nbsp;
                <el-button type="primary" @click="submit">发布</el-button>
                <el-button type="info" @click="back">返回</el-button>
            </v-flex>
            <v-flex xs4 sm4 md4>
                <el-input v-model="title" placeholder="标题"></el-input>
            </v-flex>
            <v-flex xs4 sm4 md4>
                <el-select v-model="group" placeholder="分类">
                    <el-option
                    v-for="(item,index) in groups"
                    :key="index"
                    :value="item"
                    >
                    </el-option>
                </el-select>   
            </v-flex>
            <v-flex xs4 sm4 md4>
            </v-flex>
            <v-flex xs12 sm12 md12>
                <br>
                <mavon-editor v-model="value"  @change="changeData"></mavon-editor>
            </v-flex>
        </v-layout>
        </v-container>
        <div style="text-align:left">
            <el-dialog title="文章信息" :visible.sync="setting" width="400px">
            <el-form>
                <el-form-item label="标题">
                    <el-input  auto-complete="off" v-model="title"></el-input>
                </el-form-item>
                <el-form-item label="摘要">
                    <el-input v-model="abstract" type="textarea" :rows="2"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="remark" type="textarea" :rows="2"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="setting=false">确 定</el-button>
            </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        value: undefined,
        title:undefined,
        group: undefined,
        id: undefined,
        remark: undefined,
        abstract: undefined,
        setting: false,
    }),
    methods: {
        getValue: function(value,html){

        },
        handleCommand(command) {
            if(command=='setting'){
                this.setting = true;
            }
        },
        submit: function(){
            if(this.title&&this.group&&this.value&&this.abstract){
                this.$axios({
                    method: 'post',
                    url: this.url,
                    data: {
                        group: this.group,
                        title: this.title,
                        content: this.value,
                        abstract: this.abstract,
                        remark: this.remark,
                        author: localStorage.getItem('username'),
                        id: this.id//id为undefined的时候将不会发送此数据，可以区分修改还是新增
                    }
                })
                .then(res => {
                    this.$message.success('发表成功');
                    this.$store.commit('set_course',{});
                    this.$router.push(this.paths[1].href);
                    
                })
                .catch(() => {
                    console.log('失败');
                })
            }
            else{
                this.$message.error('内容填写不完整');
                return;
            }
        },
        back: function(){
            this.$router.go(-1);
        },
        changeData: function(md,render) {
            console.log(md);
            console.log('**************');
            console.log(render);
        }
    },
    mounted: function(){
        //console.log(this.$store.state.article_course.groups);
        this.value = this.ar_co.content;
        this.title = this.ar_co.title;
        this.group = this.ar_co.group;
        this.remark = this.ar_co.remark;
        this.abstract = this.ar_co.abstract;
        this.id = this.ar_co.id;
    },
    computed: {
        //文章分类
        groups: function(){
            return this.$store.state.article_course.groups;
        },
        //确定显示界面导航条信息
        paths: function(){
            return this.$store.state.article_course.paths;
        },
        //确定上传路径
        url: function(){
            return this.$store.state.article_course.url;
        },
        ar_co: function(){
            //用于判断是文档重新修改还是文档新建
            return this.$store.state.article_course.course;
        }
    },
    watch: {
        ar_co: function(val){
           //监听无效
        }
    }
}
</script>

<style>

</style>
