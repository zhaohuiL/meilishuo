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
$(".search").on('touchstart',function(){
	var Osearch=$(".search-text").val();
	if (Osearch!="") {
		if(!sessionStorage.value) {
					sessionStorage.value = Osearch;
				} else {
					sessionStorage.value += '&' + Osearch;
				}
	}
	
	
	location.href="searchtext.html?search_text="+Osearch;
})
$(".search-text").on('touchstart',function(){
	var arr1=[];
	var arr=sessionStorage.value.split('&');
		for (var i=0;i<arr.length;i++) {
			
			if(arr1.indexOf(arr[i]) == -1){
				arr1.push(arr[i])
			}
			
		}console.log(arr1)
	var str="";
	for(var i=arr1.length-1;i>=0;i--){
			str+=`<li class="historyli">${arr1[i]}</li>`;
			
	}
	$('.search-ul').html(str);
	console.log($('.search-ul li'))
		$('.search-ul li').on('touchstart',function(){
			console.log($(this)[0].innerHTML)
			$(".search-text")[0].value=$(this)[0].innerHTML
		})
})
console.log(sessionStorage.value)
$('.hot-search-body a').on('touchstart',function(){
	console.log($(this))
	location.href="searchtext.html?search_text="+$(this)[0].innerText;
})
$('.his-dele').on('touchstart',function(){
	sessionStorage.value="";
	console.log(sessionStorage.value);
	$('.search-ul').html("");
})
