import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({}) // 这里你可能已经有其他 module
store.registerModule('vux', { // 名字自己定义
  state: {
    demoScrollTop: 0,
    isLoading: false,
    direction: 'forward',
    canAdd:false, //是否可以添加目标
    isLogin:false,
    unReadCount:'',
    show9:false,
  	
  },
	/*getters: {
	  updateShow9: state => {
      return state.show9
    }
	},*/
  
  mutations: {
    updateDemoPosition (state, payload) {
      state.demoScrollTop = payload.top
    },
    updateLoadingStatus (state, payload) { 
      state.isLoading = payload.isLoading
    },
    updateDirection (state, payload) { //组件页面左右切换
      state.direction = payload.direction
    },
    updateCanAdd(state,payload){  //判断是否有添加目标的权限
    	state.canAdd= payload.canAdd;
    	
    },
    updateLoginStatus (state, payload) {
      state.isLogin = payload.isLogin
    },
    updateReadMsg (state, payload) { //更新消息未读数量
      state.unReadCount = payload.unReadCount
    },
    updateShow9 (state, payload) {  //记录项目列表的是否显示侧边栏
      state.show9 = payload.show9
    },
    
   
  },
  actions: {
    updateDemoPosition ({commit}, top) {
      commit({type: 'updateDemoPosition', top: top})
    },
    
  }
})

export default store;


