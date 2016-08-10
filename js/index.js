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
	// 次级导航隐藏菜单
	$(".primary-nav-li").on({
		"mouseover": function(){
			$(".primary-nav-li").css("border-right","1px solid #ccc");
			$(this).find(".nav-move").fadeIn(0);
			$(this).find(".nav-move").css({
				"top": $(this).index()*-39,
				"border-left": "none"
			});
			$(this).css({
				"border-bottom": "1px solid #ccc",
				"border-top": "1px solid #ccc",
				"border-right": "1px solid #FFF"
			})
		},
		"mouseout": function(){
			$(".primary-nav-li").css("border-right","1px solid #F00");
			$(this).find(".nav-move").fadeOut(0);
			$(this).css({
				"border-bottom": "none",
				"border-top": "none"
			})
		}
		
	})
//	轮播图右侧广告
	$(".ad1").find("a").append("<img src=" + "../img/primary-main-right1.jpg" + " />");
	$(".ad2").find("a").append("<img src=" + "../img/primary-main-right2.jpg" + " />");
//	轮播图上左右滑动按钮
	$("#j-primary-main-banner").on({
		"mouseover": function(){
			$(".msilde-toggle-btn").fadeIn(0);
		},
		"mouseout": function(){
			$(".msilde-toggle-btn").fadeOut(0);
		}
	})
//	轮播
	$('.ck-slide').ckSlide({
				autoPlay: true
			});
//	快抢倒计时
	var spTimer = setInterval(diffTimer,1000);
		function diffTimer(){
			var date1 = new Date();
			var date2 = new Date(2016,6,5);
			var s,m,h,res;
			res = date2.getTime() - date1.getTime();
			s = parseInt(res/1000)%60;
			s= s > 9 ? s : "0" + s; 
			m = parseInt(res/1000/60)%60;
			m= m > 9 ? m : "0" + m; 
			h = parseInt(res/1000/60/60)%24;
			h= h > 9 ? h : "0" + h; 
			$(".timer-hh").html(h);
			$(".timer-mm").html(m);
			$(".timer-ss").html(s);
			if(res <= 0){
				clearInterval(spTimer);
				$(".timer-hh").html("00");
				$(".timer-mm").html("00");
				$(".timer-ss").html("00");
			}
		};
		diffTimer();
//	专题标题
	$(".ht-t-con").each(function(index){
		var num = index + 1;
		$(this).css("background","url(../img/ht-t-con"+ num +".jpg) no-repeat");
	})
	
//	图片AJAX加载
	// 轮播
	pictureData("../data/lunbo.json",".ck-slide-wrapper");
	// 首屏
	pictureData("../data/shouping.json",".special-con");
	// 专题1蘑菇良品
	pictureData("../data/zhuanti1.json",".sbt1");
	// 专题2品牌站
	pictureData("../data/zhuanti2.json",".sbt2");
	// 专题3潮流女装
	pictureData("../data/zhuanti3.json",".sbt3");
	// 专题4人气女鞋
	pictureData("../data/zhuanti4.json",".sbt4");
	// 专题5男友潮搭
	pictureData("../data/zhuanti5.json",".sbt5");
	// 专题6箱包配饰
	pictureData("../data/zhuanti6.json",".sbt6");
	// 专题7运动瘦身
	pictureData("../data/zhuanti7.json",".sbt7");
	// 专题8时尚美妆
	pictureData("../data/zhuanti8.json",".sbt8");
	// 专题9家居生活
	pictureData("../data/zhuanti9.json",".sbt9");
	// 专题10辣妈潮宝
	pictureData("../data/zhuanti10.json",".sbt10");
	// 专题11吃心绝对
	pictureData("../data/zhuanti11.json",".sbt11");
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
})

// 图片动态加载封装
function pictureData(url,targetName){
	$.getJSON(url,function(data){
		var goods = data;
		var goodsALL = [];
		for(var i in goods){
			goodsALL.push(goods[i].src);
		}
		var $img = $(targetName).find("img");
		var len = $img.length;
		for(var j = 0; j < len; j++){
			$img[j].src = goodsALL[j];
		}
	})
}		
// 删除为登录创建的cookie
function removeCookie(){
	var login = {};
	login.userName = "登录加载";
	$.cookie("login",JSON.stringify(login),{expires: -1,path:"/"});
}
