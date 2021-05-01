// 尝试创建一个可以执行简单动画的函数
		// 参数:
		// 	obj:要执行动画的对象,
		// 	attr:要执行动画的样式,比如:left top width height ,
		// 	target:执行动画的目标位置
		// 	speed:移动的速度（正则向右，负则向左）
		// callback:回调函数，这个函数将会在动画执行完毕以后执行
		function move(obj, attr, target, speed, callback) {
			//关闭上一个定时器
			clearInterval(obj.timer)
				//获取元素目前的位置，关键
			var current = parseInt(getStyle(obj, attr))

			//判断速度的正负值
			//如果从0向1移动，则speed为正
			//如果从1向0移动，则speed为负
			if(current > target) speed *= -1
				//开启一个定时器，用来执行动画效果
				//向执行动画的对象中添加一个timer属性，用来保存它自己的定时器的标识
			obj.timer = setInterval(function() {
				//获取box1的原来的left值
				var oldValue = parseInt(getStyle(obj, attr))
				var newValue = oldValue + speed
					//向左移动时，需要判断newValue是否小于target
					//向右移动时，需要判断newValue是否大于target
				if(
					(speed < 0 && newValue < target) ||
					(speed > 0 && newValue > target)
				)
					newValue = target

				//将新值设置给
				obj.style[attr] = newValue + "px"

				//当元素移动到0px时，使其停止执行动画	
				if(newValue === target) {
					//达到目标，关闭定时器
					clearInterval(obj.timer)
						//动画执行完毕，调用回调函数
					callback && callback()
				}
			}, 30)
		}

		// 定义一个函数,用来获取指定元素的当前的样式
		// 参数:
		// 	obj 要获取样式的元素
		// 	name 要获取的样式名
		function getStyle(obj, name) {
			if(window.getComputedStyle)
				return getComputedStyle(obj, null)[name];
			else
				return obj.currentStyle[name];
		}