<template>
	<div>
		<section class="main">
        	<!--手机号密码登录-->
        	<div class="login_form" >
	    		<!--手机号验证码登录-->
    			<p class="input_text">
	    			<i class="icon iconfont">&#xe705;</i><input type="tel" placeholder="请输入手机号" v-model="mobilePhone" >
	    		</p>
	    		<p class="input_text sms_verify">
	    			<i class="icon iconfont">&#xe765;</i><input type="text" placeholder="请输入验证码" v-model="verifyCode">
	    		</p>
	    		<span class="reg-yzm reg-disable" v-if='start'>剩余<countdown slot="value" v-model="time" :start="start" @on-finish="finish2"></countdown>S</span>
	    		<x-button @click.native="send_code()" class="reg-yzm" v-else='start'><span v-if='resend'>重新获取</span><span v-else='resend'>获取验证码</span></x-button>
	    		<p>
					 <x-button @click.native="login()" type="delete" class="submit_btn">登  录</x-button>
	    		</p>
	    		
	    		<!--<p class="clearfix">没有账号?<a href="javascript:;" @click="toreg">马上注册</a></p>-->
	    		
	    	</div>
      </section>
    </div>
    
</template>
<script>


//导入显示提示信息的组件
import  { ToastPlugin,XButton,Countdown } from 'vux'
import { mapState,mapActions } from 'vuex'
export default {
	name:'login',
	components: {
        //登录提示信息
          ToastPlugin,
          XButton,
          Countdown
      },
	data(){
		return {
			mobilePhone:'',//手机号码 ，为了区分第一个手机号所以另取了一个名字
            verifyCode:'',//手机验证码
            start: false,
            resend:false,
            time:60, //设置倒计时初始时间
	        send_code_url:this.url+'sendLoginMsg',
	        login_url:this.url+'login',
	        code:'',
	        
	        
           
		}
	},
	mounted(){
  	
	},
    created: function(){
    	if(this.isLogin){
			this.$vux.toast.text('已登录', 'middle');
	  		this.$router.push('/user');
		}
    },
	methods:{
		 
        send_code (){ //发送验证码方法
        	var mobilePhone = this.mobilePhone;
        	 if(mobilePhone==""){
        	 	
				this.$vux.toast.text('请填写手机号码', 'middle');
            	return false;
            	
            }else if(/^1[3|4|5|7|8][0-9]{9}$/.test(mobilePhone)==false){
            	
            	this.$vux.toast.text('手机号格式不正确', 'middle');
            	return false;
            	
            }else{
            		this.$http.post(this.send_code_url,{mobilePhone:this.mobilePhone}).then((response)=>{
				    // 响应成功回调
					 if(response.data.status == "1"){
			          
			          this.$vux.toast.show({text: '发送成功'});
			          this.start = true;
			          
			        }else{
			        	this.$vux.toast.text(response.data.msg, 'middle');
			        }
				  
				},(response)=>{
					
				    // 响应错误回调
				    this.$vux.toast.text("连接失败！", 'middle');
				    
				    
				})   	
            	
            }
        },
        
        login (){  //手机号验证码登录提交
        	this.code = this.GetQueryString("code");
        	console.log(this.code);
       		var mobilePhone = this.mobilePhone;
            var verifyCode = this.verifyCode;
            if(mobilePhone==""){
				this.$vux.toast.text('请填写手机号码', 'middle');
            	return false;
            }else if(/^1[3|4|5|7|8][0-9]{9}$/.test(mobilePhone)==false){
            	
            	this.$vux.toast.text('手机号格式不正确', 'middle');
            	return false;
            	
            }else if(verifyCode==""){
				
				this.$vux.toast.text('请填写验证码！', 'middle');
				return false;
				
			}else if(/^\d{4}$/.test(verifyCode)==false){
				
				this.$vux.toast.text('验证码格式不正确', 'middle');
				return false;
				
			}else{
				this.$http.post(this.login_url,{mobilePhone:this.mobilePhone,verifyCode:verifyCode,code:this.code}).then((response)=>{
				    // 响应成功回调
					 if(response.data.status == 1){
			            
	       				this.$vux.toast.show({text: '登陆成功'});
					  	//登陆成功
	       				this.$router.push('/'); 
						
			          
			        }else{
			        	this.$vux.toast.text(response.data.msg, 'middle');
			        }
				  
				},(response)=>{
					
				    // 响应错误回调
				    this.$vux.toast.text("连接失败！", 'middle');
				    
				    
				})
	            	
	        }
      },
       finish2 (index) {  //倒计时完成之后的方法
	      this.start = false; //倒计时启动开关
	      this.time = 60; //重设时间
	      this.resend = true; //重新获取验证码
	    },
	    
	    GetQueryString(name){ //获取地址栏参数
		     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		     var r = window.location.search.substr(1).match(reg);
		     if(r!=null)return  unescape(r[2]); return null;
		},
	    
	   ...mapActions([
	      
	      'updateLoginStatus'
	    ])
        
	    
	},
	computed: {
	    ...mapState({
	      isLogin: state => state.vux.isLogin,
	      
	    }),
    }

}
</script>

<style type="text/css">
/***绑定账号***/
.login_form{margin:0 auto;width: 80%; }
.login_form p{width: 100%;margin: 1rem auto;}
.login_form p.input_text{border:1px solid #ccc; background-color:#fff; line-height: 2rem; background-repeat: no-repeat; background-position: 0.5rem 0.2rem; position:relative; }
.login_form p.input_text .iconfont{font-size: 1.4rem;color: #be272e;margin: 0 .5rem;}
.login_form p.input_text input{line-height: 2rem;width: 80%;border:none;}
.login_form p .submit_btn{cursor:pointer;display:inline-block;width: inherit; background-color: #c8151e;color: #fff;line-height: 2.3rem;font-size: .9rem;border-radius: 3px; text-align: center;-webkit-tap-highlight-color:transparent;}
.login_form p.sms_verify{width: 55%; display: inline-block;margin:0 auto;}
.login_form p.sms_verify input{width: inherit;}
.login_form .reg-yzm{width: 35%; background-color: #000;color: #fff; display: inline-block; text-align: center;line-height: 1.8rem;margin-left: 7%;border-radius: 3px;font-size: .7rem;}
.login_form .reg-disable{background-color: #999;}
</style>

