<template>
  <div id="app" style="height:100%;">
  	<div v-transfer-dom>
      <loading :value="isLoading"></loading>
    </div>
  	<drawer
    :show.sync="drawerVisibility"
    :show-mode="showModeValue"
    :placement="showPlacementValue"
    :drawer-style="{'background-color':'rgb(195, 21, 30)', width: '200px'}">
      <!-- drawer content -->
      
      <!-- main content -->
	  	<view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="55px">
	  		<x-header slot="header"
        style="width:100%;position:absolute;left:0;top:0;z-index:100;background-color: rgb(195, 21, 30);"
        :left-options="leftOptions"
        :title="title"
        :transition="headerTransition"
       >
        	<span v-if="route.path === '/project'" slot="right" @click="showright">
            <x-icon type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
          </span>
	  		</x-header>
		  	<transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')"> 
		    	<router-view class="router-view"></router-view>
		    </transition>
		    <tabbar class="vux-demo-tabbar" icon-class="vux-center" slot="bottom" v-if="isLogin">
		      <tabbar-item  link="/">
		        <span class="iconfont" slot="icon">&#xe6b8;</span>
		        <span slot="label">首页</span>
		      </tabbar-item>
		      <tabbar-item  link="/project">
		        <span class="iconfont" slot="icon">&#xe76a;</span>
		        <span slot="label">项目</span>
		      </tabbar-item>
		      <tabbar-item  link="/add/-1" class="addtag" v-if="canAdd">
		        <span class="iconfont" slot="icon">&#xe7df;</span>
		        <span slot="label">添加</span>
		      </tabbar-item>
		      <tabbar-item link="/messages"  v-bind:badge="unReadCount" >
		        <span class="iconfont" slot="icon">&#xe667;</span>
		        <span slot="label">消息</span>
		      </tabbar-item>
		      <tabbar-item  link="/user">
		        <span class="iconfont" slot="icon">&#xe7d5;</span>
		        <span slot="label">我的</span>
		      </tabbar-item>
		    </tabbar>
	    </view-box>
    </drawer>
  </div>
</template>

<script>
import { Drawer,ViewBox, XHeader,Tabbar,TabbarItem,Loading,TransferDom } from 'vux'
import { mapState,mapActions } from 'vuex'

export default {
  name: 'app',
  directives: {
    TransferDom
  },
  components:{
 
  	Drawer,
  	ViewBox,
  	XHeader,
  	Tabbar, 
  	TabbarItem,
  	Loading
  },
  data(){
  	return {
  		showMenu: false,
  		drawerVisibility: false,
      showModeValue: 'push',
      showPlacementValue: 'right',
      isshow:false,
  	}
  },
  mounted(){
  	this.MsgNum();
  	 
	},
  

  created:function(){
  	
  },
  
  methods:{
  	onShowModeChange (val) {
      /** hide drawer before changing showMode **/
      this.drawerVisibility = false
      setTimeout(one => {
        this.showModeValue = val
      }, 400)
    },
    onPlacementChange (val) {
      /** hide drawer before changing position **/
      this.drawerVisibility = false
      setTimeout(one => {
        this.showPlacementValue = val
      }, 400)
    },
    onClickMore () {
      this.showMenu = true
    },
    changeLocale (locale) {
      this.$i18n.set(locale)
      this.$locale.set(locale)
    },
    
    showright(){
    	
    		this.$store.commit('updateShow9', {show9: true})
    	
    },
   
  },
  computed: {
    ...mapState({
    	route: state => state.route,
      path: state => state.route.path,
      deviceready: state => state.app.deviceready,
    	demoTop: state => state.vux.demoScrollTop,
      isLoading: state => state.vux.isLoading,
      direction: state => state.vux.direction,
      canAdd: state => state.vux.canAdd,
      isLogin: state => state.vux.isLogin,
      unReadCount: state => state.vux.unReadCount,
      show9: state => state.vux.show9,
      
      
    }),
    
    leftOptions () {
      return {
        showBack: this.route.path !== '/'
      }
    },
    rightOptions () {
      return {
        showMore: true
      }
    },
    
    headerTransition () {
      return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left'
      console.log(this.direction);
    },
    title () {
      if (this.route.path === '/') return '首页'
      if (this.route.path === '/project') return '项目中心'
      if (/\target\b/.test(this.route.path)) return '项目详情'
      if (this.route.path === '/messages') return '消息中心'
      if (this.route.path === '/login') return '用户登录'
      if (this.route.path === '/register') return '绑定账号'
      if (this.route.path === '/user') return '用户信息'
      if (/\prodetail\b/.test(this.route.path)) return '项目描述'
      if (/\add\b/.test(this.route.path)) return '添加目标'
      if (/\update\b/.test(this.route.path)) return '变更目标'
      if (this.route.path === '/taglist') return '目标列表'
      if (/\serialtag\b/.test(this.route.path)) return '串联目标'
      return this.componentName ? `Demo/${this.componentName}` : '东钿金融'
    }
    
  },
  
 
  
 
  
}
</script>

<style lang="less">
body {
  background-color: #fbf9fe;
}
html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/tap.less';
@import url("assets/css/sm.min.css");
@import url("assets/css/newstyle.css");

.vux-demo-tabbar .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon,
.vux-demo-tabbar .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label{
	color:#cb0101;
}
.router-view{width: 100%; top: 2.3rem;bottom:2.7rem;}

.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  will-change: transform;
  transition: all 500ms;
  height: 100%;
  top: 46px;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}
.vux-pop-out-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.vux-pop-out-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.vux-pop-in-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.vux-pop-in-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.addtag .iconfont{position:absolute;top:50%;left:50%;margin:-1.6rem 0 0 -1rem;line-height:2rem;color:#fff;background-color:#c8161e;font-size: 1.5rem; font-weight: bold;border-radius: 2rem;box-shadow:1px 1px 5px #333;width: 2rem;height:2rem;text-align:center; display: block;}

.projectMsg{margin-bottom:.5rem;background-color: #fff;padding:.5rem 0;
		p{
			margin-left:1rem;margin-right:1rem; line-height: 1.5rem;
		}
	}
	

</style>
