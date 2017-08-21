<template>
	<div>
		<div class="targetlist">
			<!-- <h1 class="index_tit">通知中心</h1>-->
			 
		    <!--<div class="row" style="text-align:center;font-size:1em;color:#cccccc" v-if="sum==0">没有相关记录</div>-->
			
		    <div  v-for="message in messages">
		    	<p class="row" v-if="message.mstatus==0">
		    		<span class="item-1">{{message.createTime|day}}</span>
  					<span class="item-2" @click="read(message.id)">{{message.content}}</span>
		    	</p>
		    	<p class="row" v-else="message.mstatus!=1" style="color: #999;">
		    		<span class="item-1">{{message.createTime|day}}</span>
  					<span class="item-2">{{message.content}}</span>
		    	</p>
  				
		   	</div>
		   	
			       
		    
		</div>	
	</div>
</template>

<script>
	
import { Tab,TabItem,XButton } from 'vux'
import { mapState } from 'vuex'
export default {
    name: 'messages',
	data () {
	    return {
	      index:0,
		  messages:[],
		  messurl:this.url+'getMessage',
		  readmessUrl:this.url+'isReadMessage',
		    
	    }
	},
     
	mounted(){
  	  
		this.getCustomers()//获取php数据
		this.isLogin();//判断登录
  	   
	},
	created: function () {
		 
	},
	components: {
		Tab,
		TabItem,
		XButton
	},

    methods:{
    	onItemClick (index) {
	      this.index = index;
	    },
	    getCustomers() {
			
			//获取消息列表
			this.$http.post(this.messurl,{status:this.status}).then((response)=>{
				
				  
				 this.messages = response.data.data
				 
				
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
		/*...mapActions([
	      
	      'updateReadMsg',
	      
	    ])*/
		
   },
   computed: {
    ...mapState({
    	
      unReadCount: state => state.vux.unReadCount,
      
    }),
  }
}
</script>

<style>
	.vux-tab .vux-tab-item.vux-tab-selected{color:#c8161e}
	
</style>