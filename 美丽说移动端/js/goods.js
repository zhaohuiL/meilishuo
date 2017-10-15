//得到商品ID
var goods_id = $.getQueryString('goods_id');
console.log(goods_id);

shop.api.fetchGoodsDetail(goods_id, function(response){
    var obj = response.data[0];
    console.log(obj);
    $('#goods_img').attr('src', obj.goods_thumb);
    $('#goods_name').text(obj.goods_name);
    $('#goods_price').text(obj.price);
    $('#goods_desc').text(obj.goods_desc);
    $('#add-to-cart').click(function(){
      //验证用户是否登录，未登录则跳到登录页
      if (!localStorage.token) {
        // location.assign( 'login.html#callbackurl='+location.href);
        location.href = 'login.html#callbackurl='+location.href;
        return;
      }
      console.log('已登录');
      //获取当前商品已经购买的数量
      var goods_number = $('.num')[1].innerText;

      goods_number= goods_number> 0 ? parseInt(goods_number) : 1;//如果已经有了则加1，没有则是第一次购买
      console.log(goods_number)
      shop.api.updateCart(obj.goods_id, goods_number, function(response) {
        //加入购物车了之后把商品ID和对应的数量存储到本地
        shop.base.business.saveGoodsInfoOfCart(goods_id, goods_number);
        location.href = 'cart.html';
      });
    });
});

var ospans1 = document.querySelectorAll("span[class=color]");
console.log(ospans1)
var prev = 0;
for(var i = 0;i < ospans1.length;i++){
	ospans1[i].index = i;
	ospans1[i].addEventListener("touchend",function(){
		ospans1[prev].className = "color";
		prev = this.index;
		this.className = "textcolor"
	})
}

var ospans2 = document.querySelectorAll("span[class=size]");
console.log(ospans2)
var prey = 0;
for(var j = 0;j < ospans2.length;j++){
	ospans2[j].index = j;
	ospans2[j].addEventListener("touchend",function(){
		ospans2[prey].className = "size";
		prey = this.index;
		this.className = "sizecolor"
	})
}

var jian = document.querySelector("span[class=jian]");
var num = document.querySelector("span[class=num]");
var jia = document.querySelector("span[class=jia]");
console.log(jian)
console.log(num)

console.log(jia)
jian.addEventListener("touchend",function(){
	num.innerText=parseInt(num.innerText)-1
	if(num.innerText <= 0){
		num.innerText =0
	}
})
console.log(num.innerText)
jia.addEventListener("touchend",function(){
	num.innerText=parseInt(num.innerText)+1
	if(num.innerText > 10){
		num.innerText = 10
	}
})
