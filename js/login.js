
$(function(){
	$(".sub").on("click",function(){
		var userPhone = $("#userphone").val();
		var userName = JSON.parse($.cookie("userInfo")).userName;
		var pwd = $("#pwd").val();
		var cPwd = JSON.parse($.cookie("userInfo")).pwd;
		if(userPhone != userName){
			$(".error_tip").eq(0).css("display","block");
		}else{
			$(".error_tip").eq(0).css("display","none");
		}
		if(pwd != cPwd){
			$(".error_tip").eq(1).css("display","block");
		}else{
			$(".error_tip").eq(1).css("display","none");
		}
		if(userPhone === userName && pwd === cPwd){
			cookie();
			window.location.href = "index.html";
		}
	})
	// 页面加载登录框获取焦点
	$("#userphone").focus();	
})
// 创建登录的cookie
		function cookie(){
			var login = {};
			login.userName = "登录加载";
			$.cookie("login",JSON.stringify(login),{expires: 14,path:"/"});
		}