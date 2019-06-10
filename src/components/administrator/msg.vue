<template>
<v-card>
    <v-toolbar card color="blue darken-1" dark>
        <v-btn icon @click="back"><v-icon>arrow_back</v-icon></v-btn>
        <v-toolbar-title>编辑留言</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="show = !show">
            <v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
        </v-btn>
    </v-toolbar>
    <el-table 
    ref="multipleTable" 
    :data="msgs" border 
    style="width:100%" 
    @selection-change="handleSelectionChange" 
    v-show="show"
    stripe
    :default-sort = "{prop: 'date', order: 'descending'}"
    >
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>
        <el-table-column label="编号" width="90" sortable prop="id"  align="center">
            <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="作者" width="90" align="center">
            <template slot-scope="scope">{{ scope.row.author}}</template>
        </el-table-column>
        <el-table-column label="编辑时间" width="200" prop="date" sortable align="center">
            <template slot-scope="scope">{{ scope.row.addtime}}</template>
        </el-table-column>
        <el-table-column label="内容" width="300" align="center">
            <template slot-scope="scope">{{ scope.row.content}}</template>
        </el-table-column>
        <el-table-column label="邮箱" width="160" align="center">
            <template slot-scope="scope">{{ scope.row.email}}</template>
        </el-table-column>
        <el-table-column label="点赞数" width="90" align="center">
            <template slot-scope="scope">{{ scope.row.admire}}</template>
        </el-table-column>
        <el-table-column label="操作" fixed='right' align="center">
            <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" type="primary">编辑
                </el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    
    <br>
    <v-card>
        共选中{{multipleSelection.length}}条留言&nbsp;&nbsp;
    <el-button type="danger" size="mini" :disabled="multipleSelection.length==0" @click="multi=true">
        全部删除
    </el-button>
    </v-card>
    <v-dialog v-model="multi" persistent width="500">
        <v-card>
            <v-card-title class="red--text">
                <strong>删除提示:</strong>
            </v-card-title>
            <v-card-text>
                确认删除{{multipleSelection.length}}条留言？
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn  @click="multi=false" small>取消</v-btn>
                <v-btn color="info" @click="multiDelete" small>确定</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-layout row justify-center>
        <v-dialog persistent v-model="makesure" max-width="600px">
            <v-card>
                <v-card-title primary-title class="headline grey lighten-2"><span>删除提示</span></v-card-title>
                <v-card-text>
                    <v-flex xs12 sm12 md12>
                        <span class="grey--text">ID：</span>{{ deletemsg.id }}
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                        <span class="grey--text">内容：</span>{{ deletemsg.content }}
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                        <span class="grey--text">邮箱：</span>{{ deletemsg.email }}
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                        <span class="grey--text">作者：</span>{{ deletemsg.author }}
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                        <span class="grey--text">点赞：</span>{{ deletemsg.admire }}
                    </v-flex>
                    
                </v-card-text>
                <v-card-actions>
                    <small class="red--text">确定删除该留言？</small>
                    <v-spacer></v-spacer>
                    <v-btn color="info" @click="deleteSure(deletemsg.id)" dark small>确定</v-btn>
                    <v-btn  @click="makesure=false" small>取消</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
    <v-layout row justify-center>
        <v-dialog persistent v-model="edit" max-width="600px">
            <v-card>
                
                <v-toolbar color="blue darken-1" dark>
                    <v-toolbar-title>
                        编辑留言
                    </v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-flex xs12 sm12 md12>
                        <v-text-field v-model="editmsg.id" label="ID(不可编辑)" box disabled></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                        <v-text-field v-model="editmsg.content" label="内容" box></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                        <v-text-field v-model="editmsg.email" label="邮箱" box></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                        <v-text-field v-model="editmsg.author" label="作者" box></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                        <v-text-field v-model="editmsg.admire" label="点赞" box></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                        <small class="red--text">必须点击确认以后才会生效</small>
                    </v-flex>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="info" @click="editSure" small>确定</v-btn>
                    <v-btn @click="edit=false" small>取消</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</v-card>
</template>
<script>
export default {
    methods: {
        back: function(){
            this.$router.go(-1);
        },
        handleSelectionChange: function(val){
            this.multipleSelection = val;
        },
        handleEdit: function(index,row){
            //console.log(index,row);
            this.editmsg = row;
            this.edit = true;
        },
        //删除留言以后用于页面删除留言
        tmpdelete: function(id){
            for(let i = 0; i < this.msgs.length; i ++ ){
                const element = this.msgs[i];
                if(element.id === id){
                    this.msgs.splice(i,1);
                    return;
                }
            }
        },
        handleDelete: function(index,row){
            //console.log(index,row.id);
            this.makesure = true;
            this.deletemsg = row;
        },
        deleteSure: function(id){
            this.makesure = false;
            if(id){
                //console.log("请求数据");
                this.$axios({
                    method: 'delete',
                    url: '/msg',
                    params: {
                        msgid: id
                    }
                })
                .then(res => {
                    this.makesure = false;
                    this.tmpdelete(id);
                    this.$message.success(res.data.ok);
                })
                .catch(err => {
                    this.makesure = false;
                    if(err.response){
                        this.$message.error("登录已失效，请重新登录");
                    }
                    else{
                        this.$message.error("服务器错误");
                    }
                })
            }
            else{
                // console.log("未请求数据");
                return;
            }
        },
        multiDelete: function(){
            this.multi = false;
            for (let i = 0; i < this.multipleSelection.length; i++) {
                const element = this.multipleSelection[i];
                this.deleteSure(element.id);
            }
        },
        editSure: function(){
            this.edit = false;
            const _this = this;
            _this.$axios({
                url:'/msg',
                method: 'put',
                data: {
                    id: this.editmsg.id,
                    author: this.editmsg.author,
                    content: this.editmsg.content,
                    email: this.editmsg.email,
                    admire: this.editmsg.admire
                }
            })
            .then(res => {
                //console.log(res.data)
                this.$message.success(res.data.ok);
                //this.$router.go(0);
            })
            .catch(err => {
                if(err.response){
                    this.$message.error(err.response.data.error);
                }
                else{
                    this.$message.error("服务器未响应");
                }
            })
        }
    },
    data: ()=>({
        msgs: [{}],
        multipleSelection: [],
        show: true,
        makesure: false,
        deletemsg: {},
        edit: false,
        editmsg: {},
        multi: false, 
    }),
    mounted: function(){
        const _this = this;
        _this.$axios({
            method: 'get',
            url: '/msg',
        })
        .then(res => {
            _this.msgs = res.data.msgs;
        })
        .catch(err => {
            if(err.response){
                _this.$message.error(err.response.data.error);
            }
            else{
                _this.$message.error("服务器未响应");
            }
        })
    }
}
</script>
