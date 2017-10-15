//改变字体
window.onresize = set;
set();
function set(){
  var windowWidth = document.documentElement.clientWidth;
  // console.log(windowWidth);
  var fontsize = windowWidth / 3.75;
  document.documentElement.style.fontSize = fontsize + "px";
}
// 搜索栏吸顶
var oSearchBox = document.querySelector('.search-box');
window.addEventListener('scroll',function(e) {
  var nowTop = document.documentElement.scrollTop || document.body.scrollTop;
  if(nowTop > 0) {
    oSearchBox.style.position = 'fixed';
    oSearchBox.style.top = 0;
  }else {
    oSearchBox.style.position = 'relative';
    oSearchBox.style.top = 0;
  }
});
function getAllTop(obj) {
  var allTop = obj.offsetTop;
  while(obj = obj.offsetParent) {
    allTop += obj.offsetTop;
  }
  return allTop;
}

//请求分类中的商品
var cat_id = $.getQueryString('cat_id');
function showShop(page) {
  shop.api.fetchGoodsListByCatId(cat_id, page, 20, function(response){
    console.log(response);
    //如果返回的商品为空，则给出空的提示
    if (response.data.length === 0) {
      var oH1 = document.createElement('h1');
      oH1.innerText = "当前分类下面没有商品";
      document.body.appendChild(oH1);
      return;
    }
    for(var j = 0; j < response.page.page_count; j++){
      $('#ButtonCenter').append($('<span>'+(j+1)+'</span>'));
    }
    for (var i = 0; i < response.data.length; i++) {
      var obj = response.data[i];
      $('#shop').append($(fetchGoodsDom(obj)));
    }
  });
}
showShop(1);

// 回到顶部
function BackToTop(selector) {
  this.dom = null;
  this.selector = selector;
  this.init();
  this.bindEvent();
  this.bindScrollEvent();
}
BackToTop.prototype.init = function() {
  this.dom = document.querySelector(this.selector);
}
BackToTop.prototype.bindScrollEvent = function() {
  var self = this;
  window.onscroll = function(){
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    if (scrollTop > 500) {
      self.dom.style.display = 'block';
    } else {
      self.dom.style.display = 'none';
    }
  }
}
BackToTop.prototype.bindEvent = function() {
  this.dom.onclick = function() {
    scrollAnimate(0, 1000);
  }

  function scrollAnimate(target, timer) {
    var interval = 20;
    var frame = 0;
    var frames = timer / interval;
    var start = document.body.scrollTop || document.documentElement.scrollTop;
    var distance = target - start;
    var timer;
    clearInterval(timer);
    timer = setInterval(function(){
      frame++;
      if (frame >= frames) {
        clearInterval(timer);
      }
      //第一个参数t表示当前帧
      //第二个b表示起始位置
      //第三个c表示变化量
      //第四个d表示总帧数
      document.body.scrollTop = document.documentElement.scrollTop = CubicEaseInOut(frame, start, distance, frames);
    }, interval);

    function CubicEaseInOut(t,b,c,d){
      if ((t/=d/2) < 1) return c/2*t*t*t + b;
      return c/2*((t-=2)*t*t + 2) + b;
    }
  }
}
var backTop = new BackToTop('.back-top');

// 搜索页面跳转
var oSearch = document.querySelector('.search-box');
oSearch.addEventListener('touchend',function () {
  location.href = 'search.html';
})
