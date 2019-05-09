import { statSync, stat } from "fs";

const course_article = {
    state: {
        course: {},//包含title,subtitle,author,admire.content，time,字数,分类等等
        paths: [
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
        ],//用于显示导航栏
        //groups: ["学习心得","旅行日记","生活点滴","我的大学","年少有你"],
        groups: ["javascript","mysql","linux","python","vue","vuetify"],
        url:'/course'
    },
    mutations: {
        set_course: function(state,x){
            state.course = x;
        },
        set_paths: function(state,paths){
            state.paths = paths;
        },
        set_groups: function(state,groups){
            state.groups = groups;
        },
        set_url: function(state,url){
            state.url = url;
        }
    }
};
export default course_article;