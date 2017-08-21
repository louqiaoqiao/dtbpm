<template>
  <div>
  	 <search
    @result-click="resultClick"
    @on-change="getResult"
    :results="results"
    v-model="pname"
    position="absolute"
    auto-scroll-to-top top="90px"
    @on-focus="onFocus"
    @on-cancel="onCancel"
    @on-submit="onSubmit"
    ref="search"></search>
    <tab active-color="#c8161e" custom-bar-width="2.5rem">
    	<tab-item selected @on-item-click="onItemClick">全部</tab-item>
      <tab-item  @on-item-click="onItemClick">抵押</tab-item>
      <tab-item @on-item-click="onItemClick">信用</tab-item>
      <tab-item @on-item-click="onItemClick">过桥</tab-item>
    </tab>
			<div class="prolist" >
				
				<p class="count">取得数量：<em>{{sum}}</em>条</p>
				
        <div class="prorow" v-for="item in items" v-if="sum!=0">
        	<router-link :to="{ path: '/target/-1/'+item.id }" class="blocka">
			    	<p class="protit p_flex">
			    		<span>
			    			<i class="iconfont diya" v-if="item.ptype=='抵押'">&#xe601;</i>
			    			<i class="iconfont xin" v-else-if="item.ptype=='信用'">&#xe602;</i>
			    			<i class="iconfont guo" v-else-if="item.ptype=='过桥'">&#xe634;</i>
			    			{{item.title}}
			    		</span>
			    		<span class="right">{{item.time|day}}</span>
			    	</p>
			    	<!--<p class="mt05"><span>最新目标：</span>{{item.objective}}</p>-->
			    	<p class="mt05 p_flex"><span>更新：{{item.event}}</span> <span class="right">{{item.name}}</span></p>
			    	
		      </router-link>   
		    </div> 
		    <div style="text-align:center;font-size:1em;color:#cccccc; margin-top:.5rem;" v-if="sum==0" >没有相关记录</div>
	   </div>
	   <div v-transfer-dom>
	      <popup :value="show9" position="right" style="background-color: rgb(195, 21, 30);" @on-hide="changeshow9">
	        <div style="width:100px;">
	        	<group title="项目状态" v-model="status" style="margin-top:20px; font-size:.7rem ;" titleColor="#fff">
				      <radio  :options="prostatus" v-model="status" @on-change="changeStatus" :selected-label-style="{color: 'rgb(200, 22, 30)'}"></radio>
				    </group>
				    <group title="项目类型" titleColor="#fff" >
				      <radio  :options="protype" v-model="type" @on-change="changeType" :selected-label-style="{color: 'rgb(200, 22, 30)'}"></radio>
				    </group>
	        </div>
	      </popup>
	    </div>
	   
  </div>
</template>

<script>
	
import { Radio,Tab,TabItem,Search,Popup, Group, Cell,TransferDom,Scroller } from 'vux'
import { mapState } from 'vuex'

export default {
  name: 'project',
  directives: {
    TransferDom
  },
  data () {
    return {
    
      items: [],    
	    results: [], //搜索结果
	    sum:0,//是否有结果
      pname: '', //搜索项目名
      ptype:0, //抵押或者信用切换
      type:0, //类型，法务，贷后，贷+法
      status:-2, //项目状态，全部，执行中，作废...
      prostatus : [  //用户选择项目状态，全部，执行中，作废...
      
	      {
				  icon: '',
				  key: -2,
				  value: '全部'
				},
				{
				  icon: '',
				  key: 0,
				  value: '执行中'
				},
				{
				  icon: '',
				  key: -1,
				  value: '作废'
				},
				{
				  icon: '',
				  key: 1,
				  value: '已结案'
				},
				{
				  icon: '',
				  key: 2,
				  value: '未结案'
				}
			],
			protype:[  //用户选择类型，全部，贷后，法务
				{
				  icon: '',
				  key: 0,
				  value: '全部'
				},
				{
				  icon: '',
				  key: 1,
				  value: '贷后'
				},
				{
				  icon: '',
				  key: 2,
				  value: '法务'
				},
				{
				  icon: '',
				  key: 3,
				  value: '法+贷'
				},
			],
      
    }
  },
  
	
  mounted(){
  	   
				this.getProject()//获取php数据
				this.isLogin();//判断登录
				
  	   
	},
	components: {
		Tab,
		Radio,
		TabItem,
		Search,
		Popup,
    Group,
    Cell,
		
	},
	computed: {
    ...mapState({
    	
      show9: state => state.vux.show9,
     
      
      
    }),
	},
	activated () {
    document.querySelector('#demo_list_box').scrollTop = this.demoTop
  },
	
	methods:{
		//获取所有项目
		getProject(){
			
			this.$http.post(this.url+'getProject',{pname:this.pname,type:this.type,status:this.status,ptype:this.ptype}).then((response)=>{
				
				 //const data =  response.data
				 this.items = response.data;
				 
				 if(response.data.length>=0){
				 	
				 	this.sum = response.data.length;
				 	
				 }else{
				 	
				 	this.sum = 0;
				 	
				 }
				
			    // 响应成功回调
			},(response)=>{
				
			    // 响应错误回调
				    this.$vux.toast.text("连接失败！", 'middle');
			})
			
			
				
		},
		
		setFocus () {
      this.$refs.search.setFocus()
    },
    resultClick (item) {
    	this.$refs.search.setBlur();
    	this.getProject(JSON.stringify(item));
     
    },
    getResult (val) {
      
      this.results = val ? this.getProject() : []
    },
    onSubmit () {
      this.$refs.search.setBlur();
      this.getProject();  
    },
    changeStatus(value){
    	this.status = value;
    	this.getProject();
    },
    changeType(value){
    	this.type = value;
    	this.getProject();
    },
    onFocus () {
      console.log('on focus')
    },
    onCancel () {
      this.pname="";
      this.$refs.search.setBlur();
      this.getProject();
    },
    onItemClick (index) {
	      this.ptype = index;
	      this.getProject();
	      
	  },
	  changeshow9(){
	  	
	  		this.$store.commit('updateShow9', {show9: false}) //侧边栏隐藏之后修改 
	  },
	  /*...mapActions([
      'updateShow9',
      
    ])*/
  },
   
}

function getResult (val) {
  let rs = []
  for (let i = 0; i < 20; i++) {
    rs.push({
      title: `${val} result: ${i + 1} `,
      other: i
    })
  }
  return rs
 }
</script>
<style lang="less">
	@import '~vux/src/styles/close.less';
	.prorow .p_flex{ display: flex;}
	.prorow .p_flex span{flex:1; vertical-align: middle;}
	.prorow .p_flex span:first-of-type{flex:3;overflow: hidden;text-overflow: ellipsis;
white-space: nowrap;}
	.prorow .p_flex span.right{text-align: right;font-size: .6rem;}
.weui-cells_radio .weui-cell__ft{display: none;}
.popup0 {
  padding-bottom:15px;
  height:200px;
}
.popup1 {
  width:100%;
  height:100%;
}
.popup2 {
  padding-bottom:15px;
  height:400px;
}
.position-vertical-demo {
  background-color: #ffe26d;
  color: #000;
  text-align: center;
  padding: 15px;
}
.position-horizontal-demo {
  position: relative;
  height: 100%;
  .vux-close {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%) scale(4);
    color: #000;
  }
}
@tab-bar-active-color{color:#c8161e}

</style>


