import Vue from 'vue';
import Vuex from 'vuex';
import { stat } from 'fs';
Vue.use(Vuex);

const moduleMessage = {//可以放到另外文件当中
    state: {
        msg: {}
    },
    mutations: {
        receivemsg(state,msg){
            state.msg = msg;
        }
    }
}

const moduleAdmin = {
    state: {
        user: "",
        token: ""
    },
    mutations: {
        set_user(state,user){
            state.user = user;
            localStorage.setItem('username',user)
        },
        set_token(state,token){
            localStorage.setItem('token',token)
            state.token = token;
        },
        del_token(state){
            state.token = "";
            localStorage.removeItem('token');
            localStorage.removeItem('username')
        }
    }
}

const moduleArticleCourse = {
    state: {
        article: {},
        course: {}
    },
    mutations: {
        set_article(state,article){
            state.article = article;//请求某一篇文章
            //console.log('收到文章：'+article.content);
        },
        set_course(state,course){
            state.course = course;
        }
    }
}
const store =  new Vuex.Store({
    state: {

    },
    mutations: {

    },
    modules: {
        a: moduleMessage,
        b: moduleAdmin,
        c: moduleArticleCourse,
    },
    getters:{

    },
    actions: {

    }
});
export default store;