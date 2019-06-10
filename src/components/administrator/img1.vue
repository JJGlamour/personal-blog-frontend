<template>
<v-card>
    <div style="margin-bottom: 10px">
        <v-toolbar card color="blue darken-1" dark>
            <v-btn icon @click="back"><v-icon>arrow_back</v-icon></v-btn>
            <v-toolbar-title>图片编辑</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="show = !show">
                <v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
            </v-btn>
        </v-toolbar>
        <div v-show="show" style="text-align:center">
            <el-row :gutter="12">
            <el-col :span="8">
                <el-card shadow="always" :body-style="style">
                    分类：
                    <el-select v-model="group" placeholder="请选择分类" @change="handleGroup">
                        <el-option
                            v-for="item in groups"
                            :key="item"
                            :value="item">
                        </el-option>
                    </el-select>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="hover">
                图片数量：<strong>{{imgNums[search(group,groups)]}}</strong>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="hover">
                图片总数：<strong>{{sum(imgNums)}}</strong>
                </el-card>
            </el-col>
            </el-row>
            <hr>
            <el-table 
            ref="multipleTable" 
            :data="imgs" 
            border 
            style="width:100%" 
            @selection-change="handleSelectionChange" 
            stripe
            :default-sort = "{prop: 'id', order: 'descending'}"
            >
                <el-table-column type="selection" width="80" align="center">
                </el-table-column>
                <el-table-column label="序号" width="80" sortable align="center" type="index">
                </el-table-column>
                <el-table-column label="ID" width="80" sortable prop="id" align="center">
                    <template slot-scope="scope">{{ scope.row.id }}</template>
                </el-table-column>
                <el-table-column label="图片备注" width="150" sortable prop="id" align="center">
                    <template slot-scope="scope">{{ scope.row.remark}}</template>
                </el-table-column>
                <el-table-column label="图片" width="280" align="center">
                    <template slot-scope="scope"><v-img :aspect-ratio="16/9" :src='scope.row.src'></v-img></template>
                </el-table-column>
                <el-table-column label="上传时间" width="220" prop="date" sortable align="center">
                    <template slot-scope="scope">{{ scope.row.date}}</template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
                        <el-button size="mini" type="primary" @click="handleEdit(scope.row.id)">修改备注</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <v-btn outline round color="info" @click="moreGet">查看更多</v-btn>
            <v-btn outline round color='error' @click="multiSure=true" :disabled="multi.length==0">多选删除</v-btn>
        </div>
    </div>
    <v-dialog v-model="deleteSure" persistent width="500">
        <v-card>
            <v-card-title  class="headline grey lighten-2">
                <span>确认删除</span>
            </v-card-title>
            <v-card-text>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <el-button @click="deleteSure=false" type="primary" size="mini">取消</el-button>
                <el-button type="danger" @click="imgDelete(deleteId)" size="mini">确认</el-button>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog v-model="multiSure" persistent width="500">
        <v-card>
            <v-card-title  class="headline grey lighten-2">
                <span>哈哈</span>
            </v-card-title>
            <v-card-text>
                目前不支持同时删除多张图片，还是逐一删除吧
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <el-button type="primary" @click="multiSure=false" size="mini">确认</el-button>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog v-model="editSure" persistent width="450">
        <v-card>
            <v-card-title  class="headline grey lighten-2">
                <span>修改备注</span>
            </v-card-title>
            <v-card-text>
                <small class="red--text">点击确定后才可生效，内容不能为空，字数不超过100</small>
                <br>
                <el-input
                    v-model="editRemark"
                    clearable>
                </el-input>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <el-button type="info" @click="editSure=false" size="mini">取消</el-button>
                <el-button type="primary" @click="imgEdit(editId)" size="mini">确认</el-button>
            </v-card-actions>
        </v-card>
    </v-dialog>
    
</v-card>
</template>
<script>
export default {
    data: () => ({
        show: true,
        groups: ['个人写真','校园春色','我的家乡','其他',],
        group: '个人写真',
        imgNums: [0,0,0,0],//各类图片总数
        pages: [1,1,1,1],//为了图片分批次请求使用，但考虑到图片数量不多，可以一次性全部请求
        groupsEng: ['grxz','xycs','wdjx','qt'],
        imgSrc: [],
        imgDate: [],
        imgRemark: [],
        imgId: [],
        style: { padding: '11px' },
        gotten_imgs: 0,
        each_get: 10,
        deleteSure: false,
        deleteId: undefined,
        multi: [],
        multiSure: false,
        editSure: false,
        editId: 0,
        editRemark: '',
        imgs:[]
    }),
    methods: {
        back: function(){
            this.$router.go(-1);
        },
        //查找元素在数组中的索引
        search: function(item,list){
            for (let i = 0; i< list.length; i++) {
              const element = list[i];
               if(item==element){
                   return i;
               }
            }
            return false;
        },
        //数组总数求和
        sum: function(array){
            let j = 0;
            for (let i = 0; i < array.length; i++) {
                const element = array[i];
                j += element;
            }
            return j;
        },
        handleSelectionChange: function(array){
            this.multi = array;
            //console.log(this.multi);
        },
        handleDelete: function(id){
            //console.log(index,id);
            this.deleteId = id;
            this.deleteSure = true;
        },
        imgDelete: function(id){
            this.deleteSure = false;
            this.$axios({
                method: 'delete',
                url: '/img',
                params: {
                    group: this.groupsEng[this.search(this.group,this.groups)],
                    id: id,
                }
            })
            .then(res => {
                for (let i = 0; i < this.imgs.length; i++) {
                    const element = this.imgs[i];
                    if(element.id==id){
                        this.imgs.splice(i,1);
                        break;
                    }
                }
                this.$message.success('删除成功');
            })
            .catch(err => {
                if(err.response){
                    this.$message.error(err.response.data.error);
                    
                }
                else{
                    this.$message.error('删除失败');
                }
            })
        },
        imgEdit: function(id){
            this.editSure = false;
            this.$axios({
                method: 'put',
                url: '/img',
                data:{
                    group: this.groupsEng[this.search(this.group,this.groups)],
                    id: id,
                    new_remark: this.editRemark
                }
            })
            .then(res => {
                if(res.data){
                    this.$message.success("修改成功");
                    for (let i = 0; i < this.imgs.length; i++) {
                        const element = this.imgs[i];
                        if(element.id==id){
                            this.imgs[i].remark = this.editRemark;
                            break;
                        }
                    }
                }
                else{
                    this.$message({
                        message: '修改失败',
                        type: 'warning'
                    })
                }
            })
            .catch(err => {
                if(err.response){
                    this.$message.error(err.response.data.error);
                }
                else{
                    this.$message.error('信息修改错误');
                }
                this.$router.go(0);
            })
        },
        handleEdit: function(id){
            this.editId = id;
            this.editSure = true;
                for (let i = 0; i < this.imgs.length; i++) {
                    const element = this.imgs[i];
                    if(element.id==id){
                        this.editRemark = element.remark;
                        break;
                    }
                }
        },
        handleGroup: function(){
            this.gotten_imgs = 0;
            this.imgs = [];
            for (let i = 0; i < this.each_get; i++) {
                this.getImg(this.group,this.gotten_imgs+1);
                this.gotten_imgs += 1;
                if(this.gotten_imgs>=this.imgNums[0]){
                        this.$message({
                        message: '已加载完毕',
                        type: 'warning'
                        });
                    return;
                }
            }
        },
        getImg: function(group,number){//group传递的是中文
            const _this = this;
            let index;
            for (let i = 0; i < this.groups.length; i++) {
                const element = this.groups[i];
                if(group==element){
                    index = i;
                    break;
                }
            }
            _this.$axios({
                url: '/img',
                method: 'get',
                params: {
                    group: this.groupsEng[index],
                    number: number//每张图片索引
                }
            })
            .then(res => {
                this.imgs.push(res.data.img);
            })
            .catch(err => {
                if(err.response){
                    switch(err.response.status)
                    {
                        case 404: 
                            _this.$message({
                                message: '已全部加载',
                                type: 'warning'
                            })
                            break;
                        default:
                            _this.$message.error('服务器资源出现错误，请稍后重试');
                    }
                }
                else{
                    _this.$message.error('服务器资源出现错误，请稍后重试');
                }
            });
        },
        moreGet: function(){
            for (let i = 0; i < this.each_get; i++) {
                if(this.gotten_imgs>=this.imgNums[0]){
                        this.$message({
                        message: '已加载完毕',
                        type: 'warning'
                        });
                    return;
                }
                this.getImg(this.group,this.gotten_imgs+1);
                this.gotten_imgs += 1;//异步操作，这个不太严谨

            }
        }
    },
    created: function(){
        const _this = this;
        _this.$axios({
            url: '/img',
            method: 'get',
            params: {
                itemsfornums: _this.groupsEng.toString()
            }
        })
        .then(res => {
            //console.log(res.data)
            let nums = res.data.imgnums;//每种类型图片各自总数
            _this.imgNums = nums;
            let pages = [];
            for (let i = 0; i < _this.groups.length; i++) {
                let page = Math.ceil(nums[i]/this.each_get);//每次显示10张图片
                if(page<=0){
                    page = 1;
                }
                pages.push(page);
            }
            _this.pages = pages;

            for (let i = 0; i < this.each_get; i++) {
                this.getImg(this.groups[0],this.gotten_imgs+1);
                this.gotten_imgs += 1;
                if(this.gotten_imgs>=this.imgNums[0]){
                        this.$message({
                        message: '已加载完毕',
                        type: 'warning'
                        });
                    return;
                }
            }
        })
        .catch(err => {
            if(err.response){
                _this.$message.error(err.response.data.error);
            }
            else{
                _this.$message.error('图片页码获取出现错误');
            }
        });
    },

}
</script>
