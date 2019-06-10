<template>
<div>
<v-card>
    <div style="margin-bottom: 10px">
        <v-toolbar card color="blue darken-1" dark>
            <v-btn icon @click="back"><v-icon>arrow_back</v-icon></v-btn>
            <v-toolbar-title>上传图片</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="show = !show">
                <v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
            </v-btn>
        </v-toolbar>
    </div>
    <div v-show="show">
    <v-container fluid>
        <v-layout wrap row>
            <v-flex xs12 sm12 md12>
                <!--样式问题自己解决-->
                <a href="javascript:;" class="file">选择图片
                    <input 
                    type="file" 
                    name="imgfile" 
                    id="file" 
                    multiple="multiple" 
                    accept="image/*" 
                    @change="update"
                    ref="inputer" 
                />
                </a>

            </v-flex>
            <v-flex xs12 sm12 md12>
                <small class="grey--text">温馨提示：为显示美观，尽量选取长宽比例为16/13的图片(照片大小尽量不超过500k)</small>
            </v-flex>
        </v-layout>
    </v-container>
    <v-form v-model="form" ref="form">
        <v-container fluid>
            
        <v-card v-for="(src,index) in imgsrc" :key="index" color="transparent">
            <div class="eachimg">
                <v-container fluid grid-list-md>
                    <v-layout wrap row align-center>
                        <v-flex xs1 sm1 md1>
                            预览<span><strong>{{ index+1 }}</strong></span>
                        </v-flex>
                        <v-flex xs2 sm2 md2>
                            <v-card>
                                <v-img :src="src" :aspect-ratio="16/12"></v-img>
                            </v-card>
                        </v-flex>
                        <v-flex xs3 sm3 md3>
                            <v-select label="选择分类" :items="groups" v-model="group[index]" :rules="[rules.required]">
                            </v-select>
                        </v-flex>
                        <v-flex xs4 sm4 md4>
                            <v-text-field label='添加照片描述' v-model="remark[index]" :rules="[rules.required]">
                            </v-text-field>
                        </v-flex>
                        <v-flex xs1 sm1 md1>
                            <el-button type="danger" icon="el-icon-delete" circle @click="deleteImg(index)"></el-button>
                        </v-flex>
                        <hr>
                    </v-layout>
                </v-container>
            </div>
        </v-card>
           
        </v-container>
        <v-card>
            <v-card-actions>
                <v-spacer>
                    <v-btn small @click="deleteAll" round>清空<v-icon>clear</v-icon></v-btn>
                    <v-btn 
                    color="info"
                    small
                    round 
                    @click="submitUpload" 
                    :disabled="!form"
                    >
                    上传
                    <v-icon right dark>cloud_upload</v-icon>
                    </v-btn>
                </v-spacer>
            </v-card-actions>
        </v-card>
    </v-form> 
    </div>
</v-card>

  <v-layout row justify-center>
    <v-dialog v-model="submitload" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">上传提示</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap align-center justify-center row>
              <v-flex xs12 sm12 md12>
                <span>上传总数：<strong>{{  all }}</strong>&nbsp;&nbsp;&nbsp;&nbsp;上传成功：<strong>{{ finished }}</strong></span>
              </v-flex>
              <br><br>
              <v-flex xs2 sm2 md2>
                  第{{ uploading }}张：
              </v-flex>
              <v-flex xs10 sm10 md10>
                  <el-progress type="circle" :percentage="progress"></el-progress>
              </v-flex>
              <v-flex xs12 sm12 md12>
                  <small class="grey--text">温馨提示：上传成功后再点击确定</small>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" @click="exit" dark>确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>

<v-edit></v-edit>

</div>
</template>
<style scoped>

</style>
<script>
import vEdit from './img1.vue'
import vMyerror from '../global/myerror.vue'
export default {
    data: () => ({
        groups: ['个人写真','校园春色','我的家乡','其他'],
        //以下两项为用于上传的数据，次序依次对应
        group: [],
        remark: [],
        imgsrc: [],//用于生成图片url实现预览功能
        rules: {
            required: v => !!v || '必填项目'
        },
        form: false,
        submitload: false,
        files: [],
        dialog: false,
        progress: 0,
        all:0,//上传总数
        finished: 0,//已经上传的图片数量
        uploading: 0,
        show: true,
    }),
    methods: {
        back: function(){
            this.$router.go(-1);
        },
        update: function(e){
            let files = e.target.files;
            for (let i = 0; i < files.length; i++) {
                const element = files[i];
                this.files.push(element); //把files保存到一个数组里面，方便进行单个删除操作,不能直接赋值否则得到的files将不是一个数组
            }
            let windowURL = window.URL;
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                this.imgsrc.push(windowURL.createObjectURL(file));
                //生成图片的url，用于实时预览图片
            }
        },
        deleteImg: function(index){
            this.imgsrc.splice(index,1);
            //document.querySelector('input[type=file]').files.splice(index,1);//此种方法错误
            //let files = this.$refs.inputer.files;
            this.files.splice(index,1);
            this.group.splice(index,1);
            this.remark.splice(index,1);
            //console.log(this.formdata.getAll(files[0].name));
        },
        deleteAll: function(){
            this.$refs.form.reset();
            this.imgsrc = [];
            this.files = [];
            this.group = [];
            this.remark = [];
            //console.log("全部清除")
        },
        exit: function(){
            this.submitload = false;
            this.deleteAll();
        },
        submitEach: async function(i){
            if(i >= this.files.length){
                return;
            }
            let formdata = new FormData();
            formdata.append('img',this.files[i]);
            formdata.append('group',this.group[i]);
            formdata.append('remark',this.remark[i]);
            this.uploading = i+1;
            this.progress = 0;
            try{
                await this.$axios({
                    url: '/img',
                    method: 'post',
                    data: formdata,
                    headers: {
                        'Content-Type':'multipart/form-data'
                    },
                    onUploadProgress: ProgressEvent => {
                        if(ProgressEvent.lengthComputable){
                            let num = Math.floor((ProgressEvent.loaded / ProgressEvent.total)  * 100);
                            this.progress = num;
                        }
                    }
                })
            }catch(e){
                this.progress = 0;
                let j = i + 1;
                this.$message.error('第' + j + '张图片上传失败，请注意图片大小');
                return;
            }
            this.finished = i + 1;
            this.submitEach(i+1);
            // .then(res => {
            //     this.finished = i+1;
            //     this.submitEach(i+1);
            // })
            // .catch(err => {
            //     let j = i+1;
            //     //console.log("失败")
            //     this.progress = 0;
            //     if(err.response){
            //         //console.log(err.response);
            //         if(err.response.status==403){
            //             this.$message.error('第'+j+'张图片不符合要求');
            //         }
            //         else if(err.response.status==401){
            //             this.$message.error('登录已失效，请重新登录');
            //         }
            //         else if(err.response.status==413){
            //             this.$message.error('第'+j+"张图片过大,请重新调整大小");
            //         }
            //         else{
            //             this.$message.error('第'+j+'张图片上传失败');
            //         }
            //     }
            //     else{
            //         this.$message.error('上传失败,请检查第'+j+'张图片大小或稍后重试');
            //     }
            // })
        },
        submitUpload: async function(){
            this.all = this.files.length;
            //把上一次上传的记录清空
            this.uploading = 0;
            this.finished = 0;
            this.submitload = true;
            if(this.files.length){
                await this.submitEach(0);
                this.$router.go(0);
            }
        }
    },
    components: {
        vEdit,
        vMyerror
    },
    watch: {
        
    }
}
</script>
<style scoped>
.file {
    position: relative;
    display: inline-block;
    background: #D0EEFF;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: #1E88C7;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
}
.file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
}
.file:hover {
    background: #AADFFD;
    border-color: #78C3F3;
    color: #004974;
    text-decoration: none;
}
.eachimg{
    border: solid 1px grey;
    margin-bottom: 15px;
}
</style>

