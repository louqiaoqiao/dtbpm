<template>
  <div>
  	<div class="targetlist">
			 <h1 class="index_tit">通知中心</h1>
				<div class="row" v-for="message in messages">
		    	<span class="item-1">{{message.createTime|day}}</span>
  				<span class="item-2 limit" @click="read(message.id)">{{message.content}}</span>
  				<!--<span class="item-3 blue" >点击阅读</span>-->
		   </div>           
		</div>
  	<div class="targetlist mt05">
  		<h1 class="index_tit">待办事项</h1>
			<div class="box" v-for="target in targets">
				<router-link :to="{ path: '/target/'+ target.id+'/'+target.pid }" :key="target.id" class="blocka">
					<p class="mt05">
						<span class="color-gray">[{{target.createTime|day}}]</span>
						{{target.title}}
					</p>
					<p class="mt05">项目：{{target.project}}</p>
					<p class="mt05">更新：{{target.event}}</p>
				</router-link>
	    </div>
	   
			<p v-if="objcount > 3" class="moreobj">
				<router-link :to="{ path: '/taglist' }">点击查看更多事项<i class="iconfont">&#xe7ec;</i></router-link>
			</p> 
		</div>
  </div>
</template>

<script>
	
import { mapState,mapActions } from 'vuex'

export default {
  name: 'index',
  data () {
    return {
    	targets:[],
    	messages:[],
    	status:0,
    	id:0,
	    pid:0,
	    apiUrl:this.url+'getObjective',
	    messurl:this.url+'getMessage',
	    readmessUrl:this.url+'isReadMessage',
	    isLoginUrl:this.url+'isLogin',
	    objcount:0,
	    msgcount:0,
      
      
    }
  },
  
  mounted(){
  	  
				this.getCustomers()//获取php数据
				this.isLogin();//判断登录
  	   
	},
	
	methods:{
		getCustomers() {
			//获取目标列表
			this.$http.post(this.apiUrl,{ismin:1}).then((response)=>{
				
				  
				 this.targets = response.data.data;
				 this.objcount = response.data.count;
				 
				 //console.log(response.data.count);
				
			    // 响应成功回调
			},(response)=>{
				
			    // 响应错误回调
				   this.$vux.toast.text("连接失败！", 'middle');
			})
			//获取消息列表
			this.$http.post(this.messurl,{status:this.status,ismin:1}).then((response)=>{
				
				 this.messages = response.data.data;
				
			    // 响应成功回调
			},(response)=>{
				
			    
			    // 响应错误回调
				    this.$vux.toast.text("连接失败！", 'middle');
			})
			
				
		},
		
		//点击阅读消息方法
		read(id){
			this.$http.post(this.readmessUrl,{id:id}).then((response)=>{
				
				 
				 this.$vux.toast.show({text: '该消息已读'});
				 // 页面刷新
     		 location.reload();
			    // 响应成功回调
			},(response)=>{
				
			   // 响应错误回调
				 this.$vux.toast.text("连接失败！", 'middle');
			})
		},
		
		...mapActions([
	      
	      'updateReadMsg',
	      
	    ])
		 
		
  },
  computed: {
    ...mapState({
    	
      unReadCount: state => state.vux.unReadCount,
      
    }),
  }
}
</script>

<style>
	.box p{margin:0 1rem}
	.box p.mt05{margin-top: .5rem;}
	.box .row{border-bottom:none;}
	.box{border-bottom: .05rem dashed #ccc;padding-bottom:.5rem;}
	
	.moreobj{text-align: center; line-height: 2rem; font-size: .7rem;}
	
</style>
