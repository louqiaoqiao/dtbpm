<template>
	<div>
		<div class="targetlist">
			<p class="count">取得数量：<em>{{sum}}</em>条</p>
  			<div class="box" v-for="target in targets">
  				<router-link :to="{ path: '/target/'+ target.id+'/'+target.pid }" class="blocka" :key="target.id">
					<p class="mt05">
						<span class="color-gray">[{{target.createTime|day}}]</span>
						{{target.title}}
					</p>
					<p class="mt05">项目：{{target.project}}</p>
					<p class="mt05">更新：{{target.event}}</p>
				</router-link>
	    	</div>	
		</div>
	</div>
</template>

<script>
import { Tab,TabItem,XButton,Confirm,Actionsheet,Group, Cell, CellBox, CellFormPreview,TransferDomDirective as TransferDom } from 'vux'
export default {
    name: 'Target',
    directives: {
	    TransferDom
	  },
    
	data () {
	    return {
	      targets:[],
	      //targets:[{"id":1,"pid":1,"title":"目标1","content":"目标1c1","createTime":null,"status":1,"event":"事件1","eventObject":[{"id":1,"oid":1,"content":"事件1","url":"u1","finishTime":null,"status":-1}]}],
	      apiUrl:this.url+'getObjective',
	      sum:0,
	     
	      
		    
	    }
	},
	
  
	 mounted(){
  	  
		this.getCustomers()//获取php数据
		this.isLogin();//判断登录
  	   
	},
	components: {
		Tab,
		TabItem,
		XButton,
		Confirm,
		Actionsheet, 
		Cell, 
		CellBox, 
		CellFormPreview,
		Group,
		
	},

    methods:{
	 	getCustomers() {
			//获取目标列表
			this.$http.get(this.apiUrl).then((response)=>{
				
				  
				 this.targets = response.data.data
				 this.sum = response.data.data.length;
				  
				
			    // 响应成功回调
			},(response)=>{
				
			    // 响应错误回调
				   this.$vux.toast.text("连接失败！", 'middle');
			})	
		},
	    
		
    }
}
</script>

<style lang="less">
	.projectMsg{margin:.5rem 0; background-color: #fff;padding:.5rem 0;
		p{
			margin:.5rem 1rem 0; line-height: 1.5rem;
		}
	}
	.vux-tab .vux-tab-item.vux-tab-selected{color:#c8161e}
  
	.demo3-slot {
	  text-align: center;
	  padding: 8px 0;
	  color: #888;
	}
	.proopt .yy_btn.primary{background-color:#427fed;margin-left: .2rem;}
	.sub-item {
	  color: #888;
	}
	.slide {
	 
	  overflow: hidden;
	  max-height: 0;
	  transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
	  margin:.5rem 1rem;
		li{line-height: 1.5rem;color:#666;font-size:.6rem;}
	}
	.animate {
	  max-height: 9999px;
	  transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
	  transition-delay: 0s;
	}
</style>