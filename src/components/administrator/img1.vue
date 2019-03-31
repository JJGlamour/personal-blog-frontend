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
            :default-sort = "{prop: 'id', order: 'ascending'}"
            >

                <el-table-column type="selection" width="100" align="center">
                </el-table-column>
                <el-table-column label="编号" width="100" sortable prop="id" align="center">
                    <template slot-scope="scope">{{ scope.row.id }}</template>
                </el-table-column>
                <el-table-column label="图片备注" width="150" sortable prop="id" align="center">
                    <template slot-scope="scope">{{ scope.row.remark}}</template>
                </el-table-column>
                <el-table-column label="图片" width="280" align="center">
                    <template slot-scope="scope"><v-img :aspect-ratio="16/9" :src='scope.row.src'></v-img></template>
                </el-table-column>
                <el-table-column label="上传时间" width="220" prop="date" sortable align="center">
                    <template slot-scope="scope">{{ scope.row.time}}</template>
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
                    v-model="remarks[editId-1]"
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
        imgNums: [],
        pages: [],//为了图片分批次请求使用，但考虑到图片数量不多，可以一次性全部请求
        groupsEng: ['grxz','xycs','wdjx','qt'],
        imgSrc: [],
        date: [],
        remarks: [],
        style: { padding: '11px' },
        gotten_imgs: 0,
        each_get: 10,
        deleteSure: false,
        deleteId: undefined,
        multi: [],
        multiSure: false,
        editSure: false,
        editId: 0,
    }),
    methods: {
        back: function(){
            this.$router.go(-1);
        },
        search: function(item,list){
            for (let i = 0; i< list.length; i++) {
              const element = list[i];
               if(item==element){
                   return i;
               }
            }
            return false;
        },
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
                    group_for_delete: this.groupsEng[this.search(this.group,this.groups)],
                    index_for_delete: id-1,
                }
            })
            .then(res => {
                this.imgSrc.splice(id-1,1);
                this.date.splice(id-1,1);
                this.remarks.splice(id-1,1);
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
                    group_for_edit: this.groupsEng[this.search(this.group,this.groups)],
                    index_for_edit: id-1,
                    new_remark: this.remarks[id-1],
                }
            })
            .then(res => {
                if(res.data){
                    this.$message.success(res.data.ok);
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
            //console.log(this.editId);
            this.editSure = true;
        },
        handleGroup: function(){
            this.gotten_imgs = 0;
            this.imgSrc = [],
            this.date = [],
            this.remarks = [],
            this.threeGet(this.group,this.gotten_imgs+1);
        },
        getImg: function(group,number,k){
            const _this = this;
            let index;
            for (let i = 0; i < this.groups.length; i++) {
                const element = this.groups[i];
                if(group==element){
                    index = i;
                    break;
                }
            }
            if(number > this.imgNums[index]){
                this.$message({
                    message: '已全部加载',
                    type: 'warning'
                })
                return;
            }
            if(k >= this.each_get){
                return;//k表示每次请求之前已经获取的照片数
            }
            _this.$axios({
                url: '/img',
                method: 'get',
                responseType: 'arraybuffer',
                params: {
                    group: this.groupsEng[index],
                    number: number//每张图片索引
                }
            })
            .then(res => {
                let src = 'data:image/png;base64,'+btoa(new Uint8Array(res.data).reduce((data,byte)=>data+String.fromCharCode(byte),''));
                _this.imgSrc.push(src);
                //_this.imgsrc.splice(i,0,src);
                this.gotten_imgs += 1; //从0开始
                //console.log(this.gotten_imgs);
                _this.getImg(group,number+1,++k);//递归调用
            })
            .catch(err => {
                //console.log(err);
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
        getImgRemark: function(group,number,k){
            const _this = this;
            let index;
            for (let i = 0; i < this.groups.length; i++) {
                const element = this.groups[i];
                if(group==element){
                    index = i;
                    break;
                }
            }
            if(k>=this.each_get){
                return;
            }
            if(number > this.imgNums[index]){
                return;
            }
            _this.$axios({
                url: '/img',
                method: 'get',
                params: {
                    group_for_desc: this.groupsEng[index],
                    number_for_desc: number//每张图片索引
                }
            })
            .then(res => {
                _this.remarks.push(res.data.remark);
                //_this.imgsrc.splice(i,0,src);
                _this.getImgRemark(group,number+1,++k);//递归调用
            })
            .catch(err => {
                //console.log(err);
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
            }); 
        },
        getImgDate: function(group,number,k){
            const _this = this;
            let index;
            for (let i = 0; i < this.groups.length; i++) {
                const element = this.groups[i];
                if(group==element){
                    index = i;
                    break;
                }
            }
            if(number > this.imgNums[index]){
                return;
            }
            if(k>=this.each_get){
                return;
            }
            _this.$axios({
                url: '/img',
                method: 'get',
                params: {
                    group_for_date: this.groupsEng[index],
                    number_for_date: number//每张图片索引
                }
            })
            .then(res => {
                _this.date.push(res.data.date);
                //_this.imgsrc.splice(i,0,src);
                _this.getImgDate(group,number+1,++k);//递归调用
            })
            .catch(err => {
                //console.log(err);
                if(err.response){
                    _this.$message.error(err.response.data.error)
                }
                else{
                    _this.$message.error('服务器资源出现错误，请稍后重试');
                }
            }); 
        },
        threeGet: function(group,number){
            this.getImg(group,number,0);
            this.getImgRemark(group,number,0);
            this.getImgDate(group,number,0);
        },
        moreGet: function(){
            this.threeGet(this.group,this.gotten_imgs+1);
        }
    },
    created: function(){
        const _this = this;
        _this.$axios({
            url: '/img',
            method: 'get',
            params: {
                itemsforpage: _this.groupsEng.toString()
            }
        })
        .then(res => {
            //console.log(res.data)
            let nums = res.data.groupnums;//每种类型图片各自总数
            _this.imgNums = nums;
            let pages = [];
            for (let i = 0; i < _this.groups.length; i++) {
                let page = Math.ceil(nums[i]/10);//每次显示10张图片
                if(page<=0){
                    page = 1;
                }
                pages.push(page);
            }
            _this.pages = pages;
            //_this.getimg(this.itemseng[index],this.page);
        })
        .catch(err => {
            if(err.response){
                _this.$message.error(err.response.data.error);
            }
            else{
                _this.$message.error('图片页码获取出现错误');
            }
        });
        this.threeGet(this.group,this.gotten_imgs+1);  
    },
    computed: {
        imgs: function(){
            let array = [];
            for (let i = 0; i < this.date.length; i++) {
                const element = this.date[i];
                let each = {};
                each.id = i+1;
                each.time = element;
                each.src = this.imgSrc[i];
                each.remark = this.remarks[i];
                array.push(each);
            }
            return array;
        }
    }
}
</script>
