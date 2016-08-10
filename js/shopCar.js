// 右侧侧边栏
loadHtml("common/rightSidebar.html",".mgj_rightbar");
// 头部
loadHtml("common/header.html","#header");
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
	
	// 获取cookie
	if($.cookie("login")){
		var userName = JSON.parse($.cookie("userInfo")).userName;
		$(".s1").eq(0).html("<span>"+ userName +"</span>").css("color","#F00");
		$(".s1").eq(1).html("<span id='secede' href='javascript:;'>"+ "退出" +"</span>").css("cursor","pointer");
	}
	// 点击退出。删除为登录创建的cookie
	$("#secede").click(function(){
		removeCookie();
		$(".s1").eq(0).html("<a href='regist.html'>注册</a>");
		$(".s1").eq(1).html("<a href='login.html'>登录</a>");
	})
	//验证存储购物信息的cookie是否存储成功
	if($.cookie("carts")){
		$(".hint").css("display","none");
		var counts = JSON.parse($.cookie("carts"));
		for(i in counts){
			var xiaoji = counts[i].nowCost * counts[i].num;
			$(
				"<div class=\"shop-cart\">"
			+		"<div class=\"inp\">"
			+			"<input class=\"inp-inp\" type=\"checkbox\" />"
			+		"</div>"
			+		"<div class=\"goods-i\">"
			+			"<img class=\"i-img\" src=\""+ counts[i].src +"\"/>"
			+			"<a class=\"i-title\">"+ counts[i].title +"</a>"
			+		"</div>"
			+		"<div class=\"goods-m\">"
			+			"<p class=\"m-p\">颜色： <span>"+ counts[i].info +"</span></p>"
			+			"<p class=\"m-p\">尺码： <span>"+ counts[i].size +"</span></p>"
			+		"</div>"
			+		"<div class=\"goods-pic\">"
			+			"<p class=\"pic-c\">"+ counts[i].primeCost +"</p>"
			+			"<p class=\"pic-n\">"+ counts[i].nowCost +"</p>"
			+		"</div>"
			+		"<div class=\"goods-num\">"
			+			"<span class=\"num-les\"></span>"
			+			"<span class=\"nums\">"+ counts[i].num +"</span>"
			+			"<span class=\"num-add\"></span>"
			+		"</div>"
			+		"<div class=\"goods-xj\">"
			+			"<p class=\"sub-total\">"+ xiaoji.toFixed(2) +"</p>"
			+		"</div>"
			+		"<div class=\"goods-del\">"
			+			"<a class=\"delete\">" + "删除" + "</a>"
			+		"</div>"
			+	"</div>"
			).appendTo(".shop-wrap");
		}
		// 加入商品以后，购物车操作		
		$(".quanxuan").each(function(){
			$(this).change(function(){
				if($(this).prop("checked")){
					$(":checkbox").prop("checked",true);
					$(".allgoods").html("(" + $(".shop-cart").length + ")");
					$(".sum").html($(".shop-cart").length);
					toatl();
					$(".pay").css("backgroundColor","#f13e3a");
					checkAll();
					delAll();
				}else{
					$(":checkbox").prop("checked",false);
					$(".allgoods").html("(" + 0 + ")");
					$(".sum").html("0");
					$(".sum-money").html("￥" + "0.00");
					$(".pay").css("backgroundColor","#d8d8d8");
					$(".del-all")
				}
			})
		})
	}
	
})

// 删除为登录创建的cookie
function removeCookie(){
	var login = {};
	login.userName = "登录加载";
	$.cookie("login",JSON.stringify(login),{expires: -1,path:"/"});
}
// 合计封装
function toatl(){
	var $xiaoji = $(".sub-total");
	var $total = $(".sum-money");
	if($xiaoji.length == 1){
		$total.html("￥" + (Number($xiaoji.eq(0).html())).toFixed(2));
	}else{
		$total.html("￥" + (Number($xiaoji.eq(0).html()) + Number($xiaoji.eq(1).html())).toFixed(2));
	}
}
// 增加，减少按钮封装
function checkAll(){
	$(".shop-cart").each(function(){
		// 单价
		var price = Number($(this).find(".pic-n").html());
		//数量
		var goodsNum = Number($(this).find(".nums").html());
		$(this).find(".num-les").on("click",function(){
			goodsNum--;
			$(this).next().html(goodsNum);
			// 小计
			var xiaoji = goodsNum * price;
			// 小计结果
			$(this).parent().next().find(".sub-total").html(xiaoji.toFixed(2));
			if(goodsNum < 2){
				goodsNum = 1;
				$(this).next().html(goodsNum);
				$(this).parent().next().find(".sub-total").html(price);
				toatl();
			}
			toatl();
		})
		$(this).find(".num-add").on("click",function(){
			goodsNum++;
			$(this).prev().html(goodsNum);
			var xiaoji = goodsNum * price;
			$(this).parent().next().find(".sub-total").html(xiaoji.toFixed(2));
			toatl();
		})
	})
}

// 点击全部删除按钮，删除所有的cookie
function removeBuyCookie(){
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
	$.cookie("carts", JSON.stringify(goods), {expires: -1, path: "/"});
}

// 全部删除封装
function delAll(){
	$(".del-all").click(function(){
		removeBuyCookie();			
		$(".hint").css("display","block");
		$(".shop-wrap").remove();
		$(".allgoods").html("(" + 0 + ")");
		$(".sum").html("0");
		$(".sum-money").html("￥" + "0.00");
		$(".pay").css("backgroundColor","#d8d8d8");
	})
}
