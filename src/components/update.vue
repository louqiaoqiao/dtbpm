<template>
	<div>
		 
		<div class="public_form">
			<!--<h1 class="index_tit">添加目标</h1>-->
			<div class="row" style="margin-top: .5rem;">
                <label>所属项目</label>
                <span class="seltype left">
                	{{project.title}} 
                	<input type="hidden" v-bind:value="pid" v-model="pid" />
                </span>
            </div>
            <div class="row">
                <label>所属目标</label>
                <span class="seltype left" >
                	{{objective.title}} 
                	<input type="hidden" v-bind:value="oid" v-model="oid"  />
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
            
            <p class="p_btn">
            	<input type="submit" class="submit" value="提 交 更 新" @click="addTarget" />
            	
            </p>
           
		</div>
           
        
    </div>
</template>

<script>
	
export default {
  name: 'update',
  data () {
    return {
      project:[], //项目
      objective:[],//主目标
      users:[],//下拉负责人列表
      pid:'', //获取项目id
      oid:'', //获取zhumubiao id
      personId:'',//获取负责人id
      title:'', //目标标题
	  apiUrl:this.url+'getObjectiveData', //负责人列表
	  addTartgetUrl:this.url+'addObjective', //添加目标提交url
	  getMainObject:this.url+'getObjectiveEvent', //获取主目标信息
	  getProject:this.url+'getProjectDetail', //获取项目信息
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
			this.pid = this.$route.params.pid;
			this.oid = this.$route.params.oid;
			
			//负责人列表
			this.$http.get(this.apiUrl).then((response)=>{
				
				 this.users = response.data.user; 
				
			    // 响应成功回调
			},(response)=>{
				
			    // 响应错误回调
				this.$vux.toast.text("连接失败！", 'middle');
			})
			
			//获取项目
			this.$http.post(this.getProject,{pid:this.pid}).then((response)=>{
				
				 this.project = response.data.project[0]; 
				 
				
			    // 响应成功回调
			},(response)=>{
				
			    // 响应错误回调
				this.$vux.toast.text("连接失败！", 'middle');
			})
			
			//获取主目标
			this.$http.post(this.getMainObject,{pid:this.pid,oid:this.oid}).then((response)=>{
				
				 this.objective = response.data[0]; 
				 
				
			    // 响应成功回调
			}, (response)=>{
				
			    // 响应错误回调
				this.$vux.toast.text("连接失败！", 'middle');
			})
			
			
			
		},
		
		addTarget(){
			var pid = this.pid;
			var parentId = this.oid;
			var personId = this.personId;
			var title = this.title;
			if(personId==""){
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
		
			
		
  	},
  
}
</script>

<style scoped>
	
.seltype select{ outline: none;appearance: none; -webkit-appearance: none;height:1.5rem; line-height:1.5rem;width:100%; padding-left:.5rem; background: url(arrow.png) no-repeat center right; background-size: auto 100%;}
</style>