<template>
	<div>
		 <actionsheet v-model="showact" :menus="menus" :close-on-clicking-mask="false" show-cancel @on-click-menu="targetUpdate"></actionsheet>
		 <div class="projectMsg">
		 	<h1 class="index_tit">
		 		<i class="iconfont diya" v-if="project.projectType=='抵押'">&#xe601;</i>
    			<i class="iconfont xin" v-else-if="project.projectType=='信用'">&#xe602;</i>
    			<i class="iconfont guo" v-else-if="project.projectType=='过桥'">&#xe634;</i>
    			{{project.title}}
    			
		 	</h1>
		 	<p class="p_row mt05"><span>借款人：{{project.borrower}}</span><span>婚姻状况：{{project.marriage}}</span></p>
		 	<p class="p_row">
		 		<span>借款金额：{{project.money}}</span>
		 		<span>期限：{{project.deadline}}</span>
		 	</p>
		 	<p class="p_row">
		 		<span>负责人：{{project.personName}}</span>
		 		<span>项目状态：{{project.projectStatus|stuats}}</span>
		 	</p>
		 </div>
	    
		<div class="prolist">
			<h1 class="index_tit">法务信息</h1>
        	<div class="prorow" v-for="legal in legals">
		    	<p class="protit">{{legal.title}}</p>
		    	<p class="mt05"><span>类型：</span>{{legal.legalType}}</p>
		    	<p class="mt05"><span>内容：</span>{{legal.content}}</p>
		    	<p class="proopt">
		    		项目创建：<span>{{legal.createTime|day}}</span>   
	       	    </p>
	       	
		    </div> 
		    
		    
	   </div>	
	</div>
</template>

<script>
	
import { Group, Cell, CellBox, CellFormPreview,TransferDomDirective as TransferDom } from 'vux'
export default {
    name: 'Target',
    directives: {
	    TransferDom
	  },
    
	data () {
	    return {
	      pid:0,
	      project:{},
	      legals:[],
	      getProjectUrl:this.url+'getProjectDetail',
	      isLoginUrl:this.url+'isLogin',
	        
	    }
	},
  
	mounted() {
		 this.getProjectDetail()//获取php数据   
		 this.isLogin();//判断登录
		 
	},
	components: {
		
		Cell, 
		CellBox, 
		CellFormPreview,
		Group,
		
	},

    methods:{

	    
	    getProjectDetail(){
	    	this.pid = this.$route.params.pid;
	    	
	    	//获取项目信息
	    	
	    	this.$http.post(this.getProjectUrl,{pid:this.pid}).then((response)=>{
				
				 this.project = response.data.project[0];
				 this.legals = response.data.legal; 
				
			    // 响应成功回调
			},(response)=>{
				
			    // 响应错误回调
				this.$vux.toast.text("连接失败！", 'middle');
			})
	    	
	    },    
		
    }
}
</script>
<style type="text/css">
	.p_row{display: flex;}
	.p_row span{flex: 1;}
</style>

