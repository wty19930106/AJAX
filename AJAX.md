# AJAX #

**全称：**Asynchronous JavaScript and XML(异步的js与XML)  
**XML：**是一种数据格式。
## Ajax ##
**一种前端与后端的数据交互方式（前后端分离的技术）。**

**不管什么格式，服务器返回来的数据都是字符串。**  

**优点：**

	1.减少服务器压力
		
	2.优化用户体验，无刷新页面就能访问数据
	
	3.使用异步方式与服务器通信，不需要打断用户的操作，具有更加迅速的响应能力。
	
	***不能在本地运行代码,因为后端的文件必须要在服务器下运行。
## 传统数据交互 ##
	<form action="php/post.php" method="post" enctype="application/x-www-form-urlencoded">
		
		用户名：<input type="text" name="user"/>
		密码：<input type="password" name="password"/>
		
		<input type="submit" value="提交"/>
	</form>
## ajax数据交互 ##
	用户名：<input type="text" name="user" id="user"/><span></span><br />
	密码：<input type="password"/>
	<input type="button" value="提交"/>

	$.ajax({
		url:'后端接口地址',
		data:{
			拼接的字段:需要拼接的数据（前端传给后端的数据）
		},
		//当服务器处理完之后返回的结果。
		success:function(data){//回调。
			console.log(data);
		}
	})

	$('#user').blur(function(){
		$.ajax({
			url:'php/get.php',
			data:{
				pname:$('#user').val()
			},
			success:function(data){
				$('span').text(data);
			}
		});
		
	});
## ajax交互模型(实现原理、实现机制) ##
打电话机制:  
1.买部手机  
2.输入电话号码  
3.拨号  
4.等待对方接电话  
5.通话

	var user = document.getElementById('user');
	var span = document.getElementById('span');
	
	user.onblur = function(){
		
		//1.创建一个ajax对象
		
		var ajax = new XMLHttpRequest(); 
		
		//2.填写请求地址
		
		/*
			mothod:使用什么方式请求 
			
			url:请求的地址
			
			boolean：是否异步（默认为true）
			
			
		*/
		ajax.open('get','php/get.php?user='+user.value);
		
		
		//3.发送请求
		
		ajax.send();
		
		//4.等待服务器响应
		
		span.innerHTML = ajax.responseText;
		
		ajax.onload = function(){
			
			//ajax.responseText：后端处理完成之后返回的数据
			//5.通话
			span.innerHTML = ajax.responseText;
			
		}
## practise(get.php) ##
	/*JQ版
		$('#user').blur(function(){
			$.ajax({
				url:'php/get.php',
				data:{
					user:$('#user').val()
				},
				success:function(data){
					$('span').text(data)
				}
			})
		})*/

		//原生JS版 
		var user = document.getElementById('user');
		var span = document.getElementById('span');
		user.onblur=function(){
			const ajax = new XMLHttpRequest();
			ajax.open('get','php/get.php?user='+user.value);
			ajax.send();
			span.innerHTML =ajax.responseText;
			ajax.onload=function(){
				span.innerHTML=ajax.responseText;
			}
		}
### practise(get_json.php) ###
	/*原生JS版 
		var user = document.getElementById('user');
		var span = document.getElementById('span');
	
		user.onblur=function(){
			const ajax = new XMLHttpRequest;
			ajax.open('get','php/get_json.php?user='+user.value);
			ajax.send();
			ajax.onload=function () {
				var data = JSON.parse(ajax.responseText);
				if(data.code){
					user.className = 'red';
				}else{
					user.className = 'green';
				}
				span.innerHTML=data.msg;
			}
		}*/

		//JQ版
		$('#user').blur(function(){
			$.ajax({
				url:'php/get_json.php',
				data:{
					user:$('#user').value,
				},
				dataType:'json',
				success:function(data){
					$('#span').text(data.msg)
				}
			})
		})
## practise(post.php) ##
	/*原生JS版
		var user = document.getElementById('user');
		var span = document.getElementById('span');
		user.onblur=function(){
			const ajax = new XMLHttpRequest;
			ajax.open('post','php/post.php');
			ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			ajax.send('user='+user.value);
			ajax.onload=function(){
				span.innerHTML=ajax.responseText;
			}
		}*/

		//JQ版
		$('#user').blur(function() {
			$.ajax({
				type: 'POST',
				url: 'php/post.php',
				data: {
					user: $('#user').val()
				},
				success: function(data) {
					$('#span').text(data)
				}
			})
		})
## get和post的区别 ##
**post:**

	通过send发送前端数据给后端。
	相对安全（关于用户的信息会用post或传文件的时候）
	体积理论上来说是无限大。（但是后端会做限制）
	在send前设置一个setRequestHeader()请求头
**get：**

	通过浏览器的url来发送数据给后端。
	相对来说就不安全（只要不跟用户信息打交道或者在数据一定范围都可以使用get）
	体积就受浏览器的限制。（不同浏览器有不同的限制）
	不用设置请求头。
## 关于在IE下中文的解析问题 ##
**在IE浏览器下中文会被解析为URL编码格式，容易出问题，所以建议只要val值会出现中文就用encodeURI()转一下。**

**encodeURI(str)：把中文转成URL编码**

**decodeURI('%E5%A6%99')：把URL转成中文编码**

**在ajax里get需要添加encodeURI(),post请求头中有urencoded，所以不需要转编码**

	var user = document.getElementById('user');
	var span = document.getElementById('span');

	
	user.onblur = function(){
		
		const ajax = new XMLHttpRequest;
		
		//在IE浏览器下中文会被解析为URL编码格式，容易出问题，
			所以建议只要val值会出现中文就用encodeURI()转一下。
		ajax.open('get','php/get.php?user='+encodeURI(user.value));
		
		ajax.send();
		/*ajax.open('post','php/post.php');
		
		ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		
		ajax.send('user='+user.value);*/
		
		
		ajax.onload = function(){
			
			span.innerHTML = ajax.responseText;
			
		}
		
		
	}