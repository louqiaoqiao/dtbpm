<template>
	<div>
			
		    <div class="usercenter">
		   		<!--<h2 class="tit">用户信息</h2>-->
				<div class="user_form">
					<div class="usename">
						<span>姓名</span>
						<span>{{realName}}</span>
					</div>
					<div>
						<span>手  机</span>
						<span>{{phone}}</span>
					</div>
					<div>
						<span>部门</span>
						<span>{{department}}</span>
					</div>
					
					<p class="user_opt" style="text-align: center;">
			 			
				 		<a @click="exit" style="background:#0894ec;">退出登录</a>
				    </p>
					
					
				</div>
				
		</div> 
	</div>
</template>
<script>
	
	export default {
		name:'userinfo',
		data(){
			return{
				
				phone:'',
				realName:'',
				department:'',
				apiUrl:this.url+'loginOut',
				getUserUrl:this.url+'isLogin'
			}
		},
		mounted() {
	  	 	this.getCustomers();
	  	 	this.isLogin();
		},
		methods:{
			exit(){
				//获取目标列表
			this.$http.get(this.apiUrl).then((response)=>{
				
				  if(response.data.status==1){
				  	
					this.$router.push('/')
				  }
				 
			    // 响应成功回调
			},(response)=>{
				
			    // 响应错误回调
				this.$vux.toast.text("连接失败！", 'middle');
			})
				
			},
			getCustomers() {
			
			this.$http.get(this.getUserUrl).then((response)=>{
				
				  
				 this.phone = response.data.phone;
				 this.realName = response.data.realName;
				 this.department = response.data.department;
				  
				
			    // 响应成功回调
			},(response)=>{
				
			    // 响应错误回调
				    this.$vux.toast.text("连接失败！", 'middle');
			})
			
			
				
		},	

		}
	}
</script>
