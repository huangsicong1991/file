// 右侧侧边栏
loadHtml("common/rightSidebar.html",".mgj_rightbar");
// 头部
loadHtml("common/header.html","#header");
//尾部
loadHtml("common/footer.html","#footer");
// 搜索框
$(function(){
	// 搜索框左部的鼠标移上事件
	$(".selectbox").on({
		"mouseover": function(){
			$(".selectbox").find("ol").fadeIn(0);
		},
		"mouseout": function(){
			$(".selectbox").find("ol").fadeOut(0);
		}
	})
	// 搜索框左部的点击事件
	$(".selectbox").find("ol").find("a").on("click",function(){
		$(".selected").html("搜" + $(this).html());
		$(".selectbox").find("ol").fadeOut(0);
	});
	// 搜索框里面的默认文本随机
	var tsTxtArr = ["阳光沙滩和长裙","简约时尚套装","平底百搭凉鞋"];
	var tsTxt = document.getElementsByClassName("ts-txt")[0];
	tsTxt.placeholder = tsTxtArr[parseInt(Math.random()*3)];
	$(".ts-txt").on("click",function(){
		$(this).attr("placeholder","");
	})
	// 搜索框失去焦点时
	$(".ts-txt").blur(function(){
		tsTxt.placeholder = tsTxtArr[parseInt(Math.random()*3)];
	})
	// 放大镜
	$("#etalage").zoom({
		zoom_area_width: 300,
	    autoplay_interval :3000,
	    small_thumbs : 5,
	    autoplay : true
	});
	
	// 获取cookie
	if($.cookie("login")){
		var userName = JSON.parse($.cookie("userInfo")).userName;
		$(".s1").eq(0).html("<span>"+ userName +"</span>").css("color","#F00");
		$(".s1").eq(1).html("<span id='secede' href='javascript:;'>"+ "退出" +"</span>").css("cursor","pointer");
	}
	// 点击退出。删除为登录创建的cookie
	$("#secede").click(function(){
		removeCookie();
		$(".s1").eq(0).html("<a target='_blank' href='regist.html'>注册</a>");
		$(".s1").eq(1).html("<a target='_blank' href='login.html'>登录</a>");
	})
	
//	 款式选择
	var lable = false;
	$(".small-img").eq(0).on("click",function(){
		lable = true;
		$(this).find("img").addClass("act");
		$(this).siblings(".small-img").find("img").removeClass("act");
		$(this).css("border-color","#333");
		$(".small-img").eq(1).css("border-color","#ccc");
	})
	$(".small-img").eq(1).on("click",function(){
		lable = true;
		$(this).find("img").addClass("act");
		$(this).siblings(".small-img").find("img").removeClass("act");
		$(this).css("border-color","#333");
		$(".small-img").eq(0).css("border-color","#ccc");
	})
	
	//商品添加与减少数量
	var goodsNum = 1;
	$(".num-e").on("click",function(){
		goodsNum++;
		$(".num-num").html(goodsNum);
	})
	$(".num-r").on("click",function(){
		goodsNum--;
		$(".num-num").html(goodsNum);
		if(goodsNum < 2){
			goodsNum = 1;
			$(".num-num").html(goodsNum);
		}
	})
	//	搜索框吸顶废弃
	$(window).scroll(function(){
		var xiDingTop = 1000000;
		var winTop = $(window).scrollTop();
		if(winTop >= xiDingTop){
			$(".xiding").stop().slideDown();
		}else{
			$(".xiding").css("display","none");
		}
	})
	
	// 中间菜单部分
	$(".tabbar-list").find("li").find("a").each(function(){
		$(this).on("click",function(){
			$(this).attr("class","mark2");
			$(this).parent().siblings("li").find("a").attr("class","mark1");
			
		})
	})
	// 吸顶效果
	var fixTop = $(".tools-bar").offset().top;
	$(window).scroll(function(){
		var scrollTop = $(window).scrollTop();
		if(scrollTop >= fixTop){
			$(".shop-name").css({
				"width": "219px",
				"position": "fixed",
				"top": "0"
			})
			$(".tabbar-box,.wrap-menu").css({
				"position": "fixed",
				"top": "0"
			})
		}else{
			$(".shop-name").css({
				"width": "200px",
				"position": "static"
			})
			$(".tabbar-box,.wrap-menu").css({
				"position": "static"
			})
		}
	})
	// 楼梯效果
	// 点击事件
	var flag = false;
	$(".extranav-list li").click(function(){
		flag = true;
		$(this).attr("class","active").siblings("li").attr("class","");
		$(this).find("a").attr("class","style").parent().siblings("li").find("a").attr("class","");
		
		var _top = $(".sub-goods").find("div").eq($(this).index()).offset().top - 120;
		$("html,body").stop().animate({
			scrollTop: _top
		}, 0, function() {
			flag = false;
		});
	})
	// 鼠标滚轮事件
	$(window).scroll(function(){
		if(!flag){
			var _scrollTop = $(window).scrollTop();
			$(".sub-goods div").each(function(){
				if(_scrollTop >= $(this).offset().top - 160){
					$(".extranav-list li").eq($(this).index()).attr("class","active").siblings("li").attr("class","");
					$(".extranav-list li").eq($(this).index()).find("a").attr("class","style").parent().siblings("li").find("a").attr("class","");
				}
			})
		}
	})
	// 购买点击事件
	$(".buy").on("click",function(){
		if($.cookie("carts")){
			window.location.href = "shopCar.html";
		}else{
			alert("请将您需要的的商品加入到购物车!");
		}
	})
	// 点击加入购物车
	$(".in-shopCar").on("click",function(event){
		if(lable){
			buyCookie();
//			console.log(JSON.parse($.cookie("carts")).pic1);
			var flyImg = $(".act").attr("src");
			var flyer = $("<img class=\"u-flyer\" src=\"" + flyImg + "\">");
			flyer.fly({
				start:{
					left:event.clientX,
					top:event.clientY - 20
				},
				end: {
					left: 1330,
					top: 100,
					width: 0,
					height: 0
				}
			});
		}else{
			alert("请选择您需要的款式!");
		}
	})
})


// 删除为登录创建的cookie
function removeCookie(){
	var login = {};
	login.userName = "登录加载";
	$.cookie("login",JSON.stringify(login),{expires: -1,path:"/"});
}

// 创建cookie保存购物信息
function buyCookie(){
	var goodsId = $(".act").attr("id");
	var goodsSrc = $(".act").attr("src");
	var goodsTitle = $(".title-name").html();
	var goodsInfo = $(".act").attr("title");
	var goodsSize = $(".size").html();
	var goodsPrimeCost = $(".moy-past").html();
	var goodsNowCost = $(".moy-now").html();
	var goodsNum = $(".num-num").html();
	var goods = $.cookie("carts") ? JSON.parse($.cookie("carts")) : {};
	if(goodsId in goods){
		goods[goodsId].num++
	} else {
		goods[goodsId] = {
			"id": goodsId,
			"src": goodsSrc,
			"title": goodsTitle,
			"info": goodsInfo,
			"size": goodsSize,
			"primeCost": goodsPrimeCost,
			"nowCost": goodsNowCost,
			"num": goodsNum
		}
	}
	$.cookie("carts", JSON.stringify(goods), {expires: 14, path: "/"});
}
