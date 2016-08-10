
$(function(){
	data("../data/goodList.json",".img");
	data("../data/goodList.json",".txt");
	data("../data/goodList.json",".price");
	data("../data/goodList.json",".discount");
	data("../data/goodList.json",".fanNum");
	
})

// ajax动态加载封装
function data(url,targetName){
		$.getJSON(url,function(data){
			var goods = data;
			var idAll = [];
			var srcAll = [];
			var txtAll = [];
			var priceAll = [];
			var discountAll = [];
			var fanNumAll = []
			for(var i in goods){
				idAll.push(goods[i].id);
				srcAll.push(goods[i].src);
				txtAll.push(goods[i].txt);
				priceAll.push(goods[i].price);
				discountAll.push(goods[i].discount);
				fanNumAll.push(goods[i].fanNum);
			}
			var $img = $(".img");
			var $txt = $(".txt");
			var $price = $(".price");
			var $discount = $(".discount");
			var $fanNum = $(".fanNum");
			var len = $img.length;
			for(var j = 0; j < len; j++){
				$img[j].src = srcAll[j];
				$txt[j].innerHTML = txtAll[j];
				$price[j].innerHTML = priceAll[j];
				$discount[j].innerHTML = discountAll[j];
				$fanNum[j].innerHTML = fanNumAll[j];
			}
		})
	}
