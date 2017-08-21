<template>
	<div>
		<div class="targetlist">
			<h1 class="index_tit flex">
				<label>串行目标</label>
				<span class="objcount">取得数量：<em>{{sum}}</em>条</span>
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
			   
				<p class="proopt">
				    <span class="start_num">{{target.status|tagstuats}}</span>
				    <span class="start_num">{{target.name}}</span>
			        <span class="start_num">{{target.scheduleTime|day}}</span>   
			 	</p>		  
			</div>
		</div>
	</div>
</template>

<script>
import { Group, Cell } from 'vux'
export default {
    name: 'target',
   
	data () {
	    return {
	      sum:0,
	      mid:0,
	      targets:[],//目标列表
	      getTargetUrl:this.url+'getObjectiveEvent', //获取目标列表url    
	    }
	},
	components: {
		
    	Group,
   		Cell,
		
	},

	 mounted() {
		 this.getTargets()//获取php数据   
		 this.isLogin();
	},
	
    methods:{
	    getTargets(){
	    	this.mid = this.$route.params.mid;
	    	
	    	//获取串联目标列表
	    	this.$http.post(this.getTargetUrl,{mid:this.mid}).then((response)=>{
				
				  
				 this.targets = response.data;
				 this.sum = response.data.length;
				
			    // 响应成功回调
			},(response)=>{
				
			    // 响应错误回调
				this.$vux.toast.text("连接失败！", 'middle');
			})
	    	
	    },  
		
    },
    
}
</script>

<style lang="less">
	.objcount{margin-right:1rem;font-weight: normal;font-size: .5rem;}
	.objcount em{font-style: normal;color:rgb(200, 22, 30); }
</style>