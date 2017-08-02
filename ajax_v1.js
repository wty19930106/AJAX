function ajax(json){
	//默认设置
	let settings={
		url:'',
		data:{},
		type:'get',
		dataType:'string',
		success:function(){},
		error:function(){}
	}
	//有设置走设置，没设置走默认
	Object.assign(settings,json);
	
	var ajax= new XMLHttpRequest;
	
	var arr=[];
	//循环data的每一项将他以'name=xxx'的形式放到数组中
	for(var attr in settings.data){
		arr.push(attr+'='settings.data[attr]);
	}
	//然后在用&拼起来，形成浏览器url能读懂的形式
	settings.data=arr.join('&');
	
	//判断设置的是get还是post，然后分别写两者的方法
	if(settings.type.toLowerCase()=='get'){
		ajax.open('get',settings.url+'?'+settings.data);
		ajax.send();
	}else if(settings.type.toLowerCase()=='post'){
		ajax.open('post',settings.url);
		ajax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		ajax.send(settings.data);
	}else{
		alert('88');
	}
	//onload在IE浏览器下不支持，onreadystatechange在任何浏览器下都支持
	ajax.onreadystatechange=function(){
		//如果执行到了第四步，说明已经上传成功返回回调函数
		if(ajax.readyState==4){
			if(settings.dataType=='string'){
				//如果是字符串
				settings.success(ajax.responseText);
			}else if (settings.dataType=='xml'){
				settings.success(ajax.responseXML);
			}else if(settings.dataType=='json'){
				//如果是标准JSON格式
				settings.success(JSON.parse(ajax.responseText));
			}else{
				settings.success('请核对参数');
			}
		}else{
			//没执行到第四步说明请求失败，查看到第几步和错误状态码
			settings.success({state:ajax.readyState,status:ajax.status});
		}
	}
	
}
