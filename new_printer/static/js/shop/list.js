$(function (){

	var filter_btn = $('.filter-btn'),
		classify_btn = $('.classify-btn'),
		list_wrap = $('.list-wrap'),
		_kind = list_wrap.attr('data-kind'),
		_node = "<div class='list-box pr'>" + $('.list-box').html() + "</div>";
	
	// 过滤筛选
	filter_btn.on('click',function (){
		var _this = $(this),
			_filter = _this.attr('data-tag'),
			_classify = classify_btn.filter('.active').attr('data-tag');

		clickFocus(_this);

		$.post('getGoods/filter',{
			list_type: _kind,
			filter_type: _filter,
			classify_type: _classify
		},function (e){
			list_wrap.html('');
			for(var i=0;i<e.length;i++){
				list_wrap.append(_node);

				// 添加数据
				$('.list-box').eq(i).find('.goods_img').attr('src',e[i].goods_img);
				$('.list-box').eq(i).find('.goods_downloadNum').text(e[i].goods_downloadNum);
				$('.list-box').eq(i).find('.goods_markNum').text(e[i].goods_markNum);
				$('.list-box').eq(i).find('.goods_name').text(e[i].goods_name);
				$('.list-box').eq(i).find('.goods_price').text(e[i].goods_price);
				if(e[i].goods_mark){
					$('.list-box').eq(i).find('.list-mark-btn').addClass('active');
				}	
			}
		});

	});

	// 风格筛选
	classify_btn.on('click',function (){
		var _this = $(this),
			_classify = _this.attr('data-tag'),
			_filter = filter_btn.filter('.active').attr('data-tag');

		clickFocus(_this);

		$.post('getGoods/classify',{
			list_type: _kind,
			filter_type: _filter,
			classify_type: _classify
		},function (e){
			console.log(e);
		});
		
	});

	// 点击切换效果
	function clickFocus(obj){
		obj.siblings().removeClass('active');
		obj.addClass('active');
	}


})