<template>
	<div>
		 
		 <div class="projectMsg">
		 	<h1 class="index_tit flex">
		 		项目信息
		 		<router-link :to="{ path: '/prodetail/'+pid }" class="lookmore">查看详情</router-link>
		 	</h1>
		 	<div v-for="pro in Project">
		 		<p class="mt05">
		 			<i class="iconfont diya" v-if="pro.projectType=='抵押'">&#xe601;</i>
			    	<i class="iconfont xin" v-else-if="pro.projectType=='信用'">&#xe602;</i>
			    	<i class="iconfont guo" v-else-if="pro.projectType=='过桥'">&#xe634;</i>
			    	{{pro.title}}
			    	
		 		</p>
		 		<p class="pjrow">
		 			<span>立项：{{pro.createTime|day}}</span>
		 			<span>持续：{{pro.lengthOfTime}}天</span>
		 			
		 		</p>
		 		<p class="pjrow">
		 			<span>目标数：{{pro.objectiveCount}}条</span>
		 			<span>更新数：{{pro.eventCount}}条</span>
		 			<span>更新周期(条/周)：{{pro.avgEventCount}}</span>
		 		</p>
		 		
		 	</div>
		 	
		 	
		 </div>
	    
		<div class="targetlist">
			<h1 class="index_tit flex">
				目标列表
				<router-link :to="{ path: '/add/'+pid }" class="lookmore" v-if="canAdd">添加目标</router-link>
			</h1>
			<div class="prorow" v-for="target in targets">
			 	<cell
  :title="target.title"
  is-link
  :border-intent="false"
  :arrow-direction="target.showEvents ? 'up' : 'down'"
  @click.native="target.showEvents=!target.showEvents" class="protit"></cell>
				<div class="slide" :class="target.showEvents?'animate':''">
			    	<ul>
			    		<li v-for="(event,index) in target.eventObject">[{{event.finishTime|day}}]&nbsp;{{event.content}}</li>	
			    	</ul>
			    </div>
			    <p v-if="target.isSerial" class="mt05"><router-link :to="{ path: '/serialtag/'+target.mainId }" class="blue">上级目标：{{target.main}}</router-link></p>
				<p class="proopt">
				    <span class="start_num">{{target.status|tagstuats}}</span>
				    <span class="start_num">{{target.name}}</span>
			        <span class="yy_btn" @click="showPlugin3(target.id)" v-if="target.status==0&&target.allowAddEvent==1" :key="target.id">添加更新</span>
			        <span class="yy_btn primary" @click="optTarget(target.id,target.title)" :key="target.id" v-if="target.status==0&&canAdd">编辑目标</span>    
			  	</p>
			</div>	
		</div>
		<div v-transfer-dom>
	      <confirm v-model="showContent003"
	      show-input
	      title="输入待办事件"
	      @on-cancel="onCancel"
	      @on-confirm="onConfirm"
	     >
	      </confirm>
	    </div>
	     <div v-transfer-dom>
	    	<actionsheet v-model="showact" :menus="menus" :close-on-clicking-mask="false" show-cancel @on-click-menu="targetUpdate"></actionsheet>
	     </div>
	     <div v-transfer-dom>
	      <confirm
	      v-model="confirmOpt"
	      :close-on-confirm="false"
	      title="操作提示"
	      @on-confirm="onConfirm4">
	        <p style="text-align:center;">{{optTip}}</p>
	      </confirm>
	    </div>
	</div>
</template>

<script>

import { Tab,TabItem,XButton,Confirm,Actionsheet,Group, Cell, CellBox, CellFormPreview,TransferDomDirective as TransferDom } from 'vux'
import { mapState } from 'vuex'
export default {
    name: 'target',
    directives: {
	    TransferDom
	  },
    
	data () {
	    return {
	      index:0,
	      evIndex:0,
	      showContent003: false, //显示添加事务框
	      targetId:0,
	      targetTitle:'',
	      status:0,
		  menus: [
			  {
		        label: '目标状态修改',
		        type: 'info',
		        value: 0,
		      }, 
		      {
		        label: '完成',
		        type: 'primary',
		        value: 1,
		      },
		      {
		        label: '变更',
		        type: 'warn',
		        value: 2,
		        
		      },
	      ],
	      showact: false, //目标操作下边弹框
	      id:0,//目标oid
	      pid:0,//项目pid
	      Project:[], //项目信息
	      targets:[],//目标列表
	      getTargetUrl:this.url+'getObjectiveEvent', //获取目标列表url
	      getProjectUrl:this.url+'getProjectDetail', //获取项目url
	      closeTargetUrl:this.url+'closeObjective', //关闭目标url
	      addEventUrl:this.url+'addEvent',//添加事件url
	      isLoginUrl:this.url+'isLogin',
	      confirmOpt:false,
	      optStatus:0,//目标操作状态 1完成 2终止
	      optTip:'确定吗？',
	      
		    
	    }
	},

	 mounted() {
		 this.getTargets()//获取php数据   
		 this.isLogin();
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
//  	onItemClick (index) {
//	      this.index = index;
//	    },
		onCancel () {
	      console.log('on cancel')
	    },
	    onConfirm (msg) {
	      console.log('on confirm')
	      if (msg) {
	        
	       
        	//添加事务
	    	this.$http.post(this.addEventUrl,{oid:this.targetId,content:msg}).then((response)=>{
				 
				this.$vux.toast.show({text: response.data.info});
				if(response.data.status==1){
				 	// 页面刷新
 		 			location.reload();
				}
			    // 响应成功回调
			},(response)=>{
				
			    // 响应错误回调
				this.$vux.toast.text("连接失败！", 'middle');
			})
	    	
	    	
	      }
	    },
	    
	     onConfirm4 (key) {
	     	this.$http.post(this.closeTargetUrl,{oid:this.targetId,status:this.optStatus}).then((response)=>{

					this.$vux.toast.show({text: response.data.info});
					if(response.data.status==1){
					 	 // 页面刷新
 		 				location.reload();
 		 				 this.confirmOpt=false;
					 }
				
			    // 响应成功回调
				},(response)=>{
				
			       // 响应错误回调
				    this.$vux.toast.text("连接失败！", 'middle');
				})
	     
	    },
    	
    	//添加事务
	    showPlugin3 (id) {
	      	this.targetId = id;
	      	this.showContent003 = true;
	     	
	    },
	    
	    //操作目标
	    optTarget(id,title){
	    	
	    	 this.showact = true;
	    	 this.targetId = id;
	    	 this.targetTitle = title;
	    	 
	    	
	    },
	    
	    getTargets(){
	    	this.pid = this.$route.params.pid;
	    	this.id = this.$route.params.oid;
	    	
	    	//获取目标列表
	    	this.$http.post(this.getTargetUrl,{pid:this.pid,oid:this.id}).then((response)=>{
				
				  
				 this.targets = response.data
				 
				
			    // 响应成功回调
			},(response)=>{
				
			    // 响应错误回调
				this.$vux.toast.text("连接失败！", 'middle');
			})
	    	
	    	
	    	
	    	//获取项目信息
	    	this.$http.post(this.getProjectUrl,{pid:this.pid}).then((response)=>{
				
				 this.Project = response.data.project
				  
				
			    // 响应成功回调
			},(response)=>{
				
			    // 响应错误回调
				this.$vux.toast.text("连接失败！", 'middle');
			})
	    	
	    	
	    },
	    
	    //目标更新方法
	    targetUpdate (key) {
	    	
	      	if(key==1||key==2){
	      		this.confirmOpt = true;
	      		this.optStatus = key;
	      	}
	      	if(key==1){
	      		this.optTip='确定完成'+this.targetTitle+'目标?'
	      	}else if(key==2){
	      		var pid = this.pid;
	      		var oid =  this.targetId 
	      		this.$router.push('/update/'+pid+'/'+oid); 
	      		//this.optTip='确定终止'+this.targetTitle+'目标?'
	      	}
	    },
	   
		
    },
    computed: {
    ...mapState({
    	
      canAdd: state => state.vux.canAdd,
      
    }),
    }
}
</script>

<style lang="less">
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
	  margin:0 .8rem;
		li{line-height: 1.5rem;color:#666;font-size:.6rem;}
	}
	.animate {
	  max-height: 9999px;
	  transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
	  transition-delay: 0s;
	}
	.pjrow{display: flex;
		span,a{flex:1}
		a{ text-align: right;}
	}
	.index_tit.flex{display: flex;}
	.index_tit.flex label,.index_tit.flex a{flex: 1;}
	.index_tit.flex a{text-align: right;padding-right:1rem;}
</style>