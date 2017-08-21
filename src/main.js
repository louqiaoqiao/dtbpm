// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import store from './store';
import App from './App'
import qs from 'qs';
import  { LoadingPlugin,ToastPlugin,AjaxPlugin } from 'vux'
import filters from '@/filters';

require('es6-promise').polyfill()

Vue.use(LoadingPlugin)

Vue.use(ToastPlugin)

Vue.use(AjaxPlugin)

FastClick.attach(document.body)


Vue.prototype.url="http://project.dongtianjr.com/wx/" //全局url
//Vue.prototype.url="http://projectstest.dongtianjr.com/public/index.php/wx/" //全局url

Vue.prototype.isLogin = function () { 
	
	//判断是否登录
	this.$http.get(this.url+'isLogin').then((response)=>{
		
	  	var status = response.data.status;
	  	
	  	var auth = response.data.auth;
	  	
	  	if(/\objective\b/.test(auth)==true){ //判断是否有添加目标的权限
	  		
	  		store.commit('updateCanAdd', {canAdd: true})
	  	}else{
	  		
	  		store.commit('updateCanAdd', {canAdd: false})
	  	}
		  	
	  	if(status==1){
	  		
	  		store.commit('updateLoginStatus', {isLogin: true})
	  		
	  	}else{
	  		this.$vux.toast.text('请登录', 'middle');
	  		this.$router.push('/login');
	  		
	  		store.commit('updateLoginStatus', {isLogin: false})
	  		
	  	}
	  	
	    // 响应成功回调
	},(response)=>{
		// 响应错误回调
		this.$vux.toast.text("连接失败！", 'middle');
	})
	
	
}

Vue.prototype.MsgNum = function () { 
	//获取消息未读数量
	this.$http.get(this.url+'getMessage').then((response)=>{
		
		var uncount = response.data.unReadCount;
		var s = uncount.toString(); //转成字符串 vux badge只支持字符串形式
		if(uncount==0){
			s = '';
		}
	  	store.commit('updateReadMsg', {unReadCount: s}); 
	  	
	    // 响应成功回调
	},(response)=>{
		
	    // 响应错误回调
	    this.$vux.toast.text("连接失败！", 'middle');
	})	
}

Vue.config.productionTip = false

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

Vue.config.debug = true

//添加一个请求拦截器
Vue.http.interceptors.request.use((config)=>{
    //在请求发送之前做一些事
    Vue.$vux.loading.show({
		text: '加载中'
	})
    if (config.method === 'post' && config.data.toString() !== '[object FormData]') {
	    config.data = qs.stringify(config.data);
	}
    return config;
    
},(error)=>{
	Vue.$vux.loading.hide();
	
    //当出现请求错误是做一些事
    return Promise.reject(error);
});


//添加一个返回拦截器
Vue.http.interceptors.response.use((response)=>{
    //对返回的数据进行一些处理
     Vue.$vux.loading.hide();
     
     return response;
},(error)=>{
	Vue.$vux.loading.hide();
    //对返回的错误进行一些处理
    return Promise.reject(error);
});




/* eslint-disable no-new */
new Vue({
	store,
  router,
  render: h => h(App)
}).$mount('#app-box')
