<template>
<v-card>
    <v-error :net="neterror"></v-error>
    <div style="margin-bottom: 10px">
        <v-toolbar card color="blue darken-1" dark>
            <v-btn icon @click="back"><v-icon>arrow_back</v-icon></v-btn>
            <v-toolbar-title>写文章</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="show = !show">
                <v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
            </v-btn>
        </v-toolbar>
    </div>
    <v-form v-model="form" ref="form" v-show="show">
        <v-container fluid><!--在layout外面加上container会显示又间距，更加人性化-->
        <v-layout wrap  row>
            <v-flex xs4 sm4 md4>
                <v-card flat> 
                <v-select :items="articletitles" label="选择分类" v-model="new_item" :rules="[rules.required]" box>
                </v-select>
                </v-card>
            </v-flex>
            <v-flex xs4 sm4 md4>
                <v-card flat>
                <v-text-field v-model="new_title" label="文章标题" clearable :rules="[rules.required]" box>
                </v-text-field>
                </v-card>
            </v-flex>
            <v-flex xs4 sm4 md4>
                <v-card flat>
                    <v-text-field v-model="new_author" label="文章作者" clearable :rules="[rules.required]" box>
                    </v-text-field>
                </v-card>
            </v-flex>
            <v-flex xs12 sm12 md12>
                <div style="border:solid 1px grey">
                <v-card flat>
                    <v-textarea v-model="new_content" label="文章内容(html文本格式)" single-line full-width :rules="[rules.required]">
                    </v-textarea>
                </v-card>
                </div>
            </v-flex>
            <v-flex xs6 sm6 md6>
                <v-card flat>
                    <v-text-field v-model="new_abstract" label="文章摘要" :rules="[rules.required]" box>
                    </v-text-field>
                </v-card>
            </v-flex>
            <v-flex xs6 sm6 md6>
                <v-card flat>
                    <v-text-field v-model="new_remark" label="文章备注(选填)" box>
                    </v-text-field>
                </v-card>
            </v-flex>
            <v-btn color="blue darken-1" class="white--text" @click="$refs.form.reset()">
                清空
            </v-btn>
            <v-btn color="blue darken-1" class="white--text" :disabled="!form" @click="addArticle" :loading="addloading"><!--如何实现disabled和form的绑定-->
                提交
            </v-btn>
        </v-layout>
        </v-container>
    </v-form>

    <v-article1></v-article1>
    <v-article2></v-article2>
</v-card>
</template>
<style scoped>

</style>
<script>
import vError from '../global/neterror.vue'
import vArticle1 from './article1.vue'
import vArticle2 from './article2.vue'
export default {
    methods: {
        back: function(){
            this.$router.go(-1);
        },
        addArticle: function(){
            const _this = this;
            _this.addloading = true;
            _this.$axios({
                method: "POST",
                url: '/article',
                data: {
                    group: _this.new_item,
                    title: _this.new_title,
                    abstract: _this.new_abstract,
                    author: _this.new_author,
                    content: _this.new_content,
                    remark: _this.new_remark
                }
            })
            .then(res => {
                _this.addloading = false;
                _this.$message.sucess("添加成功");
            })
            .catch(err => {
                _this.neterror = true;
                _this.addloading = false;
                setTimeout(() => {
                    _this.neterror = false
                }, 4000);
            })
        }
    },
    data: ()=>({
        articletitles: ["学习心得","旅行日记","生活点滴","我的大学","年少有你"], 
        new_item: undefined,
        new_title: undefined,
        new_author: undefined,
        new_content: undefined,
        new_abstract: undefined,
        new_remark: undefined,
        form: false,
        rules: {
            required: v => !!v || '必填项目'
        },
        neterror: false,
        addloading: false,
        show: true,
    }),
    components: {
        vError,
        vArticle1,
        vArticle2
    }
}
</script>
