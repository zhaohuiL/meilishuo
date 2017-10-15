window.onresize = set;
    set();
    function set() {
      //设计师的实际图600宽，600状态下font-size我们设置的是30px;
      /*
      600 / 30 = windowWidth / x
      x = windowWidth / (600 / 30)
      */
      var windowWidth = document.documentElement.clientWidth;
      var fontsize = windowWidth / (375 / 14);
      document.documentElement.style.fontSize = fontsize + 'px';
    }
console.log($(".search1-header input").val());
var search_text = getQueryString('search_text');
$(".search1-header input")[0].value = search_text;
$('.shaixuan').on("touchstart",function(){
	location.href="searchtext.html?search_text="+$(".search1-header input").val();
})

$.ajax({

    	type:"get",
    	url:"http://h6.duchengjiu.top/shop/api_goods.php",
    	data:{search_text:search_text},
    	success:function(json){
      	var data = json.data;
      	var str="";
      	if (data.length === 0) {
//      str = `未搜索到商品, <span id='second'>5</span>秒后跳回首页`;
//      var timer = setInterval(() => {
//        var second = parseInt($('#second')[0].innerText);
//        $('#second')[0].innerText = --second;
//      }, 1000);
//      setTimeout(() => {
//        clearInterval(timer);
//        location.href = '/';
//      }, 5000);
//      return;
		console.log($('.hot-goods'))
		str=`<div class="no-search">未搜索到商品, <span id='second'>5</span>秒后跳回搜索</div>`;
		$('.hot-goods').html(str);
		var timer = setInterval(() => {
          var second = parseInt($('#second')[0].innerText);
          $('#second')[0].innerText = --second;
        }, 1000);
        setTimeout(() => {
          clearInterval(timer);
          location.href = 'search.html';
        }, 5000);
        return;
      }else{for (var i = 0; i < data.length; i++) {
        var obj = data[i];

        //一件商品的总价
        str += `<div class="cart-hot-goods">
        			<a class="cart-hot-goods-img" href="goods.html?goods_id=${obj.goods_id}">
        				<img src="${obj.goods_thumb}" />
          			<div class="cart-hot-goods-title">
          				${obj.goods_name}
          			</div>
          			<div class="cart-hot-goods-price">
          				¥${obj.price}
          			</div>
              </a>
        		</div>`;

      }

      }
      $('.hot-goods').html(str);
      }
})
$('.retn').on('touchend',function(){
	location.href="search.html"
})
