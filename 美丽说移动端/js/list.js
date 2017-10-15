//改变字体
window.onresize = set;
set();
function set(){
  var windowWidth = document.documentElement.clientWidth;
  // console.log(windowWidth);
  var fontsize = windowWidth / 3.75;
  document.documentElement.style.fontSize = fontsize + "px";
}
//请求分类中的商品
var cat_id = $.getQueryString('cat_id');
function showShop(page) {
  shop.api.fetchHotGoods(page,20,function (response) {
    for (var j = 0; j < response.data.length; j++) {
      var obj = response.data[j];
      $('#shop').append($(fetchGoodsDom(obj)));
    }
  });
}
//热门商品切换
var page = 1;
$('.liuxing')[0].addEventListener('touchend',function () {
  page = 1;
  $('#shop').html('');
  showShop(page);
  for (var i = 0; i < $('.title div span').length; i++){
    $('.title div span')[i].className = '';
  }
  $('.title div span')[0].className = 'cur';
});

$('.rexiao')[0].addEventListener('touchend',function () {
  page = 2;
  $('#shop').html('');
  showShop(page);
  for (var i = 0; i < $('.title span').length; i++){
    $('.title div span')[i].className = '';
  }
  $('.title div span')[1].className = 'cur';
});

$('.shangxin')[0].addEventListener('touchend',function () {
  page = 3;
  $('#shop').html('');
  showShop(page);
  for (var i = 0; i < $('.title span').length; i++){
    $('.title div span')[i].className = '';
  }
  $('.title div span')[2].className = 'cur';
});
showShop(page);

//搜索栏吸顶
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
// 二级标题吸顶
var oTitle = document.querySelector('.title');
var topTitle = getAllTop(oTitle);
var oCatList = document.querySelector('.cat-list');
var topCatList = getAllTop(oCatList);
window.addEventListener('scroll',function(e) {
  var nowTop = document.documentElement.scrollTop || document.body.scrollTop;
  if(nowTop >= (topTitle-48)) {
    oTitle.style.position = 'fixed';
    oTitle.style.top = "0.45rem";
    oTitle.style.zIndex = 999;
    oTitle.style.marginTop = 0;
    oTitle.style.borderTop = "0.01rem solid #eee"
  }else {
    oTitle.style.position = 'relative';
    oTitle.style.top = 0;
    oTitle.style.marginTop = "0.1rem";
    oTitle.style.borderTop = 0;
  }
});

function getAllTop(obj) {
  var allTop = obj.offsetTop;
  while(obj = obj.offsetParent) {
    allTop += obj.offsetTop;
  }
  return allTop;
}

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
