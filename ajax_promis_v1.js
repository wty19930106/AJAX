function ajax(json){
	return new Promise(function(resolve,reject){
		let settings={
			url:'',
			method:'get',
			data:{},
			dataType:'string'
		}
		Object.assign(settings,json);
		var ajax = new XMLHttpRequest;
		var arr =[];
		for(var attr in settings.data){
			arr.push(attr+'='+settings.data[attr]);
		}
		settings.data=arr.join('&');
		
		if(settings.method=='get'){
			ajax.open('get',settings.url+'?'+settings.data);
			ajax.send();
		}else if(settings.method=='post'){
			ajax.open('post',settings.url);
		ajax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
			ajax.send(settings.data);
		}else{
			alert('wrong');
		}
		
		ajax.onreadystatechange=function(){
			if(ajax.readyState==4){
				if(settings.dataType=='string'){
					resolve(ajax.responseText);
				}else if(settings.dataType=='xml'){
					resolve(ajax.responseXML);
				}else if(settings.dataType=='json'){
					//resolve(JSON.parse(ajax.responseText));
					resolve(eval('(' + ajax.responseText +')'));
				}else{
					resolve('请核对参数')
				}
			}else{
				reject({state:ajax.readyState,status:ajax.status})
			}
		}
	})
}
