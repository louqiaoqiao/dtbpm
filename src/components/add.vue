<template>
	<div>
		 
		<div class="public_form">
			<!--<h1 class="index_tit">添加目标</h1>-->
			<div class="row" style="margin-top: .5rem;">
                <label>所属项目</label>
                <span class="seltype">
                    
                    <select v-model="pid" >
                        <option value="">请选择</option>
                        <option v-for="project in projects" v-bind:value="project.id">{{project.title}}</option>
                       
                    </select>
                </span>
            </div>
            
            <div class="row">
                <label>负责人</label>
                <span class="seltype">
                    <select v-model="personId">
                        <option value="">请选择</option>
                        <option v-for="user in users" v-bind:value="user.id">{{user.department}}-{{user.realName}}</option>
                    </select>
                </span>
            </div>
            
            <div class="row">
                <label>目标标题</label>
                <span class="srcddz"><input type="text"  placeholder="输入目标" v-model="title"></span>
            </div>
            <!--<div class="row">
                <label>选择所属目标</label>
                <span class="left">
                	<input type="checkbox" v-model="isSubObj" />
                </span>
                
            </div>
            <div class="row" v-if="isSubObj">
                <label>所属目标</label>
                
                <span class="seltype" >
                    <select v-model="parentId">
                        <option value="">请选择</option>
                        <option v-for="objective in objectives" v-bind:value="objective.id">{{objective.title}}</option>
                    </select>
                </span>
            </div>-->
           
            <p class="p_btn">
            	<input type="submit" class="submit" value="添 加 目 标" @click="addTarget" />
            	
            </p>
           
		</div>
           
        
    </div>
</template>

<script>

export default {
  name: 'add',
  data () {
    return {
      projects:[], //下拉所属项目列表
      objectives:[],//下拉主目标列表
      users:[],//下拉负责人列表
      pid:'', //获取项目id
      parentId:'',//获取zhumubiao id
      personId:'',//获取负责人id
      title:'', //目标标题
	  apiUrl:this.url+'getObjectiveData', //获取项目列表，主目标列表，负责人列表url
	  addTartgetUrl:this.url+'addObjective', //添加目标提交url
	  getMainObjectUrl:this.url+'getMainObjectiveDataById',
      isSubObj:false,
      readonly:false,
      
    }
  },
 
  mounted(){
  	  
		this.getCustomers()//获取php数据
		this.isLogin();//判断登录
		
  	   
	},
	
	methods:{
		getCustomers() {
			
			//获取项目列表，主目标列表，负责人列表
			this.$http.get(this.apiUrl).then((response)=>{
				
				 this.projects = response.data.project;
				 this.users = response.data.user; 
				
			    // 响应成功回调
			}, (response)=>{
				
			    // 响应错误回调
				this.$vux.toast.text("连接失败！", 'middle');
			})
			
				
			if(this.$route.params.pid!=-1){
				this.pid = this.$route.params.pid;
				this.getMainObjective();
				
			}
		},
		
		addTarget(){
			var pid = this.pid;
			var parentId = this.parentId;
			var personId = this.personId;
			var title = this.title;
			if(pid==""){
				this.$vux.toast.text('请选择所属项目', 'middle');
			}else if(personId==""){
				this.$vux.toast.text('请选择负责人', 'middle');
			}else if(title==""){
				this.$vux.toast.text('请填写目标标题', 'middle');
			}else{
				this.$http.post(this.addTartgetUrl,{pid:pid,parentId:parentId,personId:personId,title:title}).then((response)=>{
					 
					if(response.data.status==1){
						this.$vux.toast.show({text: '添加成功'});
						this.$router.push('/project');
						
					}
					
				    // 响应成功回调
				},(response)=>{
					
				   // 响应错误回调
				    this.$vux.toast.text("连接失败！", 'middle');
				})
			}
			
		},
		
		getMainObjective(){
			
			var pid = this.pid;
			this.$http.post(this.getMainObjectUrl,{pid:pid}).then((response)=>{
					 
					//if(response.data.status==1){
						
						this.objectives = response.data.objective; 
						
					//}
					
				    // 响应成功回调
				}, (response)=>{
					
				   // 响应错误回调
				    this.$vux.toast.text("连接失败！", 'middle');
			})
		}
				
		
  	},
  	watch: {  
        pid: 'getMainObjective',  
        
    } 
}
</script>

<style scoped>
	
.seltype select{ outline: none;appearance: none; -webkit-appearance: none;height:1.5rem; line-height:1.5rem;width:100%; padding-left:.5rem; background: url(arrow.png) no-repeat center right; background-size: auto 100%;}
</style>