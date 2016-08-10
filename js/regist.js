
var userPhone = document.getElementById("userphone");
var passWord = document.getElementById("password");
var conPassword = document.getElementById("con-password");
var valCode = document.getElementById("validateCode");
var mobileReg = /^[1]{1}[3|5|8]{1}[0-9]{1}\d{8}$/;
var pwdReg = /[\u4e00-\u9fa5]/;
var flag1,flag2,flag3,flag4;

$(function(){
	//注册手机验证
	$("#userphone").focus(function(){
		userPhone.placeholder = "";
		$(".error_tip").eq(0).css("display","none");
	});
	$("#userphone").blur(function(){
		if(!mobileReg.test(this.value)){
			$(".error_tip").eq(0).css("display","block");
			$(".error_tip").eq(0).html("请输入正确的手机号码！");
			flag1 = false;
		}else{
			flag1 = true;
		}
	})
	
	// 注册密码验证
	$("#password").focus(function(){
		passWord.placeholder = "";
		$(".error_tip").eq(1).css("display","none");
	})
	$("#password").blur(function(){
		if(!pwdReg.test(this.value) && this.value.length < 6){
			$(".error_tip").eq(1).css("display","block");
			$(".error_tip").eq(1).html("密码长度不得小于6！");
			flag2 = false;
		}else{
			flag2 = true;
		}
	})
	// 验证密码
	$("#con-password").focus(function(){
		conPassword.placeholder = "";
		$(".error_tip").eq(2).css("display","none");
	})
	$("#con-password").blur(function(){
		if(this.value != passWord.value){
			$(".error_tip").eq(2).css("display","block");
			$(".error_tip").eq(2).html("两次密码输入不一致");
			flag3 = false;
		}else{
			flag3 = true;
		}
	})
	// 获取验证码
	$(".getCode").on("click",function(){
		var validateCode = "";
		var count = 0;
		while(count < 4){
			var rand = parseInt(Math.random()*(123-48) + 48); // 获得随机的ASCII编码
			// 获取数字和字母的ASCII编码
			if(rand >=48 && rand <=57 || rand >=65 && rand <=90 || rand >=97 && rand <=122 ){
				validateCode += String.fromCharCode(rand); // 遍历获取的验证码
				count++; // 做++获取4位验证码
			}
		}
		 $(this).html(validateCode); // 把获取的验证码在box中输出
		 $(this).css("fontSize","16px");
	})
	// 填写验证码
	$("#validateCode").focus(function(){
		valCode.placeholder = "";
		$(".error_tip").eq(3).css("display","none");
	})
	$("#validateCode").blur(function(){
		if(this.value != $(".getCode").html()){
			$(".error_tip").eq(3).css("display","block");
			$(".error_tip").eq(3).html("请输出正确的验证码，区分大小写");
			flag4 = false;
		}else{
			flag4 = true;
		}
	})
	// 注册
	$(".sub").on("click",function(){
		if(flag1 && flag2 && flag3 && flag4){
			cookie();
			alert("恭喜您，注册成功,请保存好您的账户和密码！");
			window.location.href = "login.html";
		}else{
			alert("所填信息有误，请您重写填写！");
		}
	})
})
// 创建保存账号的cookie
	function cookie(){
		var userInfo = {};
		userInfo.userName = userPhone.value;
		userInfo.pwd = passWord.value;
		$.cookie("userInfo",JSON.stringify(userInfo),{expires: 14,path:"/"});
	}