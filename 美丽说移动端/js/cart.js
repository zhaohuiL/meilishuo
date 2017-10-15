$.ajax({
    	type:"get",
    	url:"http://h6.duchengjiu.top/shop/api_goods.php",
    	success:function(json){
      	var data = json.data;
      	var str="";
      	for (var i = 0; i < data.length; i++) {
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
      $('.hot-goods').append(str);
      }
});
$.ajax({
    	type:"get",
    	url:"http://h6.duchengjiu.top/shop/api_cart.php",
    	data:{token: localStorage.token},
    	success:function(json){
    	// console.log(json)
    	var str="";
      	var data = json.data;
      	if (data.length==0) {
      		str = `<div class="empty">
      			<p>您的购物车还空着呢</p>
      			<p>美物这么多,快去看看吧..</p>
      			<span>去逛逛</span>
      		</div>`
      	} else{
      		for (var i = 0; i < data.length; i++) {
        	var obj = data[i];

        //一件商品的总价
	        str += `
	        	<div class="cartbody">
				<div class="cartbodyleft">
					<div class="cart-choose"></div>
				</div>
				<div class="cartbodybottom" id=${obj.goods_id}>
					<img src="${obj.goods_thumb}"/>
				</div>
				<div class="cartbodyright">
					<div class="cartbodyright1">
						${obj.goods_name}
					</div>
					<div class="cartbodyright2">
						<span class="cartspan1" id=${obj.goods_id}>
							¥${obj.goods_price}
						</span>
						<span class="cartspan2">
							${obj.goods_number}
						</span>
					</div>
				</div>
				<div class='cart-delete' style="display: none;"><button>删除</button></div>
				</div>
	        `;

	      }
      	}
	      $('.cartBody').append(str);
	      $(".cartbodybottom").on('touchend',function(){
	        	location.href="goods.html?goods_id="+$(this)[0].id;
	        })
	      var Ochoose=document.querySelectorAll('.cart-choose')
	      for (var i=0;i<Ochoose.length;i++) {
	      	 Ochoose[i].addEventListener("touchend",function(){
	      	 if (this.style.background=="") {
	      	 	this.style.background="url(images/4f618255837f268c2dd9df55b201_88_89.cg.png) no-repeat";
	      		this.style.backgroundSize="cover";
	      	 } else{
	      	 	this.style.background="";
			}

			})
			}
			$(".cart-choose2").on('touchend', function() {
			if(this.style.background == "") {
				this.style.background = "url(images/4f618255837f268c2dd9df55b201_88_89.cg.png) no-repeat";
				this.style.backgroundSize = "cover";
				for (var i=0;i<Ochoose.length;i++) {
	      	 		Ochoose[i].style.background="url(images/4f618255837f268c2dd9df55b201_88_89.cg.png) no-repeat";
					Ochoose[i].style.backgroundSize="cover";

				}
			} else {
				this.style.background = "";
				for (var i=0;i<Ochoose.length;i++) {
					Ochoose[i].style.background="";
					Ochoose[i].style.backgroundSize="";
				}
			}
			});
			// console.log($('.cart-price'));

			$('.cart-delete>button').on('touchend',function(){
				self=this;
			console.log(1)
			var OHide=document.querySelector('.cart-hide');
			if (OHide.style.display=="none") {
				OHide.style.display="block";
			}else if (OHide.style.display=="block") {
				OHide.style.display="none";
			}
			$('.yessa').on('touchend',function(){
				var Parent=self.parentNode.parentNode;
				Parent.parentNode.removeChild(Parent);
				var goods_id=Parent.querySelector('.cartspan1').id;
				var number=0;
				$.ajax({
			        	type:"post",
			        	url:'http://h6.duchengjiu.top/shop/api_cart.php?token='+localStorage.token,
			        	data:{goods_id, number},
			        success:function(json){
			         }
			       });
				OHide.style.display="none";
			});
			$('.nosa').on('touchend',function(){
				OHide.style.display="none";
			})
			});
			$('.empty span').on('touchend',function(){
				location.href="index.html"
			})
    	}
});

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
$(document).on('touchend',function(){
	var sum=0;
	var re1 = /(\d{1,3})+(?:\.\d+)?/g
	for (var i=0;i<$('.cart-choose').length;i++) {
		if ($('.cart-choose')[i].style.background!="") {
				console.log(parseInt($('.cartspan2')[i].innerHTML))
				sum+=(parseInt($('.cartspan1')[i].innerHTML.match(re1))*parseInt($('.cartspan2')[i].innerHTML));
		} else{

		}
		$('.cart-price')[0].innerHTML='¥'+sum+'.00';
	}

})
$('.cart-footer-button').on('touchend',function(){
	console.log(2)
		for (var i=0;i<$('.cart-choose').length;i++) {
			if ($('.cart-choose')[i].style.background=="") {
    				var goods_id = parseInt($('.cartspan1')[i].id);
    				console.log($('.cartspan1')[i].id)
    				var number = 0;
    				$.ajax({
    					type:"post",
    					url:'http://h6.duchengjiu.top/shop/api_cart.php?token=' + localStorage.token,
    					data:{goods_id,number},
    				 success:function(json){
							}
    					});
			}
		}
		location.href="ordercheck.html";
	})

$('.cartnavleft').on('touchend',function(){
	location.href="index.html";
});
$('.cartnavright').on('touchend',function(){
	var Odelete=document.querySelectorAll('.cart-delete');
	for (var i=0;i<Odelete.length;i++) {
		if (Odelete[i].style.display=="none") {
		Odelete[i].style.display="block";
		}else if (Odelete[i].style.display=="block") {
			Odelete[i].style.display="none";
		}
	}


//	console.log($('.cart-delete'))
});
