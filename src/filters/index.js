export default {
  day(value){
	  if(value){
	    return value.slice(0,10)
	  }
	},
	prostuats(value) { //状态转换
    if(value==0){
    	 return "执行中"
    }else if(value==-1){
    	return "作废"
    }else if(value==1){
    	return "已结案"
    }else if(value==2){
    	return "未结案"
	        }
	},
	tagstuats(value) { //状态转换
    if(value==0){
    	 return "执行中"
    }else if(value==-1){
    	return "作废"
    }else if(value==1){
    	return "完成"
    }else if(value==2){
    	return "变更"
    }
	},
  
};
