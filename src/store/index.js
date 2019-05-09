import Vue from 'vue';
import Vuex from 'vuex';
import article_course from './modules/article_course'
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
const moduleDisplay = {
    state: {
        dislpay_course: {},
        display_paths: [
            {
                text: '主页',
                disabled: false,
                href: '/home/mainpage',
            },{
                text: '分类',
                disabled: false,
                href: '/home/mainpage',
            },{
                text: '无标题',
                disabled: true,
            }
        ],//用于显示导航栏
    },
    mutations: {
        set_display_course: function(state,course){
            state.dislpay_course = course;
        },
        set_display_paths: function(state,paths){
            state.display_paths = paths;
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

const store =  new Vuex.Store({
    state: {

    },
    mutations: {

    },
    modules: {
        a: moduleMessage,
        b: moduleAdmin,
        display: moduleDisplay,
        article_course: article_course
    },
    getters:{

    },
    actions: {

    }
});
export default store;