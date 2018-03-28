
import Vue from 'vue';
import App from './App';
import router from './router';
import vuex from 'vuex';
import VueResource from 'vue-resource';/*引入资源请求插件*/

import './assets/js/jquery.min.js';
import './assets/js/bootstrap';

import './assets/ueditor/ueditor.config.js'
import './assets/ueditor/ueditor.all.min.js'
import './assets/ueditor/lang/zh-cn/zh-cn.js'
import './assets/ueditor/ueditor.parse.min.js'




/*使用VueResource插件*/
Vue.use(VueResource);
Vue.config.productionTip = false;
Vue.http.interceptors.push(function(request, next)
{
  //拦截器
  // 跨域携带cookie
  request.credentials = true;
  request.headers.set('Authorization', 'bearer ' + window.localStorage.token);
  next();
});
Vue.http.options.emulateJSON = true;//vue-resource的处理方案
// 使用vuex  vuex像个仓库
Vue.use(vuex);
var store = new vuex.Store(
{//store对象
  state:
    {
      isLogin:window.sessionStorage.isLogin_admin == 'ok'?true:false,
      admin_id:window.sessionStorage.admin_id?window.sessionStorage.admin_id:false,
    },
  mutations:
    {
      switch_dialog(isLogin)
      {//这里的state对应着上面这个states
        state.isLogin = true;
        //你还可以在这里执行其他的操作改变state
      }
    }
});

//配置请求的uri
Vue.prototype.api = `http://lty-main.com`;

/* eslint-disable no-new */
const Vm = new Vue(
  {
    el: '#app',
    router:router,
    store:store,
    components: { App },
    template: '<App/>',
    created:function(){

    }
  });


/**
 * 全局监听的钩子(vue-router的守卫，防御塔，每个路由跳转都要经过这个防御塔)
 * to是要去的地方(obj)
 * from是你从哪来(obj)
 * next是下一步，不执行的话，路由会一直停滞在这，不会跳转
 */
// router.beforeEach(function(to, from, next)
// {
//
//
//    next();
// });









