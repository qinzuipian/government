import Vue from 'vue'
import Router from 'vue-router'


// 登录
import login from '@/page/user/login.vue'
// import hoslogin from '@/page/user/hoslogin.vue'
import filetitle from '@/page/user/filetitle.vue'

import app from '@/app.vue'

// 住院系统

import HospitalizationInquiry from '@/page/job/Hospitalization/inquiry'









//修改密码
import password from '@/page/user/password'



Vue.use(Router);


export default new Router({
    routes: [

        // { path: '/', redirect: '/app' },
        {  path: '/', redirect: '/login' },
        { path: '/login', name: 'login', component: login },
        { path: '/password', name: 'password', component: password },
        {
            path: '/app', component: app,
            children: [
                {
                    path: '/', redirect: '/HospitalizationInquiry'
                    //   path: '/', redirect: '/login'
                },
               
                {
                    path: '/HospitalizationInquiry',
                    name: 'HospitalizationInquiry',
                    component: HospitalizationInquiry
                },
                {
                    path: '/filetitle',
                    name: 'filetitle',
                    component: filetitle
                },
              
            
               
            ]
        }

        //

    ]
    
})



