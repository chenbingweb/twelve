
	function Swiper(wrap,pointer){
		this.wrap=$(wrap);
		this.pointer=$(pointer);
		this.li=$(wrap).children();
		this.disX=0;//手指按下;
		this.listL=0;//移动时的距离
		this.wrapwidth=this.wrap.parent().get(0).clientWidth;//获取屏幕宽度
		this.len=0;
		this.n=0;//默认为第一个为选中
	}
	Swiper.prototype.init=function(){
		var This=this;
		if(this.li.length>1)
		{
				//创建小圆点
			this.createPointer()
			this.wrap.append(this.wrap.html())//复制子集
			this.len=this.wrap.children().length;//获取子集个数
			this.wrap.css('width',this.len*this.wrapwidth+'px');//设置ul宽度
			//开始滑动
			this.wrap.on('touchstart',function(e){
				This.moveStart(e,this)
			})
			//滑动
			this.wrap.on('touchmove',function(e){
				This.move(e,this)
			})
			//滑动结束
			this.wrap.on('touchend',function(e){
				This.moveEnd(e,this)
			})
		}
		
	}
	//创建小圆点
	Swiper.prototype.createPointer=function(){
		var ele=""
		for(var i=0;i<this.wrap.children().length;i++){
			//默认为第一个激活
				if(i==0)
				{
					ele+='<b class="acitve"></b>'
				}
				else
				{
					ele+='<b></b>'
				}
		}
		this.pointer.append(ele);
	}
	//开始滑动
	Swiper.prototype.moveStart=function(e,obj){
		obj.style.transition = 'none';//清空transition
		var ev=e.originalEvent.changedTouches[0];
		var num = Math.round(obj.offsetLeft / this.wrapwidth);
		console.log(num)
		if(num == 0){
			num = this.len/2;
			obj.style.left = -num * this.wrapwidth + 'px';
		}
		
		if(-num == this.len-1){
			num =this.len/2-1;
			obj.style.left = -num * this.wrapwidth + 'px';
		}

		this.disX = ev.pageX;
		this.listL = obj.offsetLeft;
		
		return false
	}
	//滑动
	Swiper.prototype.move=function(e,obj){
		var ev=e.originalEvent.changedTouches[0];
		obj.style.left = (ev .pageX -this.disX) + this.listL + 'px';
		return false
	}
	//滑动结束
	Swiper.prototype.moveEnd=function(e,obj){
		var num = Math.round(obj.offsetLeft / this.wrapwidth);
		obj.style.transition = '.5s';
		obj.style.left = num * this.wrapwidth + 'px';

		this.pointer.children().removeClass('acitve');
		this.pointer.children().get(-num%this.pointer.children().length).className='acitve'
		n = -num%this.pointer.children().length;

		return false
	}

