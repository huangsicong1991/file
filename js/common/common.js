//右侧边栏封装
function loadHtml(url,targetName){
	$.ajax({
		url: url,
		type: 'get',
		async: false,
		success: function(data){
			$(targetName).html(data);
		}
	})
}

$(function(){
	//右侧边栏鼠标滚轮事件
	$(window).scroll(function(){
		var winTop = $(window).scrollTop();
		if(winTop >= 50){
			$(".sidebar-btt").stop().fadeIn(0);
		}else{
			$(".sidebar-btt").stop().fadeOut(0);
		}
	})
	
	//点击回到顶部
	$(".sidebar-btt").click(function(){
		$(window).scrollTop(0);
	})
	
	// 购物车，客户服务，我的小店鼠标移上事件
	$(".s1").on({
		"mousemove": function(){
		$(this).find("#dropInfo").fadeIn(0);
		$(this).find("#shoppingCart").fadeIn(0);
	},
		"mouseout": function(){
			$(this).find("#dropInfo").fadeOut(0);
			$(this).find("#shoppingCart").fadeOut(0);
		}
	})
//	搜索框吸顶效果
	$(window).scroll(function(){
		var xiDingTop = 800;
		var winTop = $(window).scrollTop();
		if(winTop >= xiDingTop){
			$(".xiding").stop().slideDown();
		}else{
			$(".xiding").stop().slideUp();
		}
	})
//	吸顶搜索框样式
	// 搜索框左部的鼠标移上事件
	$(".xd-sp").on({
		"mouseover": function(){
			$(".xd-sp").find("ol").fadeIn(0);
		},
		"mouseout": function(){
			$(".xd-sp").find("ol").fadeOut(0);
		}
	})
	// 搜索框左部的点击事件
	$(".xd-sp").find("ol").find("a").on("click",function(){
		$(".xd-sp-sp").html("搜" + $(this).html());
		$(".xd-sp").find("ol").fadeOut(0);
	})
	// 搜索框里面的默认文本随机
	var ssTxtArr = ["阳光沙滩和长裙","简约时尚套装","平底百搭凉鞋"];
	var ssTxt = document.getElementsByClassName("xd-form-ss")[0];
	ssTxt.placeholder = ssTxtArr[parseInt(Math.random()*3)];
	$(".xd-form-ss").on("click",function(){
		$(this).attr("placeholder","");
	})
	// 搜索框失去焦点时
	$(".xd-form-ss").blur(function(){
		ssTxt.placeholder = ssTxtArr[parseInt(Math.random()*3)];
	})
})
