window.onload = function(){
		var wrap = document.querySelector('#wrap');
		var box = document.querySelector('.box');
		var spans = wrap.getElementsByTagName("span");
		var score = document.querySelector('.score');
		var speed = document.querySelector('.speed');
		var btn = document.querySelector('#btn');
		var speedX = 15;
		var speedY = 0;
		var randomX = parseInt(Math.random() * (wrap.offsetWidth - box.offsetWidth));
		var randomY = parseInt(Math.random() * (wrap.offsetHeight - box.offsetHeight));
		var mX = randomX - randomX % 15;
		var mY = randomY - randomY % 15;
		var timeId = null;
		//蛇的速度
		var vel = 200;
		for(var i = 0;i < spans.length;i++){
			spans[i].style.left = i * 15 + 'px';
		}
		spans[spans.length-1].style.background = "blue";
		btn.onclick = function(){
			clearInterval(timeId);
			for(var i = 0;i < spans.length;i++){
				spans[i].style.left = i * 15 + 'px';
				spans[i].style.top = '0px';
			}
			box.style.left = mX + 'px';
			box.style.top = mY + 'px';
			speedX = 15;
			speedY = 0;
			startGame();
		};
		function startGame(){
			timeId = setInterval(function(){
				var nextX = spans[spans.length-1].offsetLeft + speedX;
				var nextY = spans[spans.length-1].offsetTop + speedY;
				var lastchild = spans[spans.length-1];
				var leftBorder = nextX < 0 ? true:false;
				var rightBorder = nextX + lastchild.offsetWidth > wrap.offsetWidth  ? true:false;
				var topBorder = nextY < 0 ? true:false;
				var bottomBorder = nextY + lastchild.offsetHeight > wrap.offsetHeight ? true:false;
				if(leftBorder || rightBorder || topBorder || bottomBorder){
					speedX = 0;
					speedY = 0;
					clearInterval(timeId);
					alert("GAME OVER!");
				}
				for(var j = 0;j < spans.length-1;j++){
					if(spans[spans.length-1].offsetLeft === spans[j].offsetLeft && spans[spans.length-1].offsetTop === spans[j].offsetTop){
						speedX = 0;
						speedY = 0;
						clearInterval(timeId);
						alert("GAME OVER!");
					}
				}
				if(spans[spans.length-1].offsetLeft === box.offsetLeft && spans[spans.length-1].offsetTop === box.offsetTop){
					var sp = document.createElement('span');
					wrap.insertBefore(sp,spans[0]);
					randomX = parseInt(Math.random() * (wrap.offsetWidth - box.offsetWidth));
					randomY = parseInt(Math.random() * (wrap.offsetHeight - box.offsetHeight));
					score.innerText = parseInt(score.innerText) + 10;
					speed.innerText = parseInt(parseInt(score.innerText)/100 + 1);
					vel = vel - 20 * parseInt(speed.innerText);
					mX = randomX - randomX % 15;
					mY = randomY - randomY % 15;
					box.style.left = mX + 'px';
					box.style.top = mY + 'px';
				}
				if(speedX !== 0 || speedY !== 0){
					console.log(spans.length-1);
					for(var i = 0;i < spans.length-1;i++){
						spans[i].style.left = spans[i+1].offsetLeft + 'px';
						spans[i].style.top = spans[i+1].offsetTop + 'px';
					}
					spans[spans.length-1].style.left = nextX + 'px';
					spans[spans.length-1].style.top = nextY + 'px';
				}
			},vel);
		}
		document.onkeydown = function(){
			if(event.keyCode === 40 && speedY === 0){
				speedX = 0;
				speedY = 15;
			}else if(event.keyCode === 39 && speedX === 0){
				speedX = 15;
				speedY = 0;
			}else if(event.keyCode === 38 && speedY === 0){
				speedX = 0;
				speedY = -15;
			}else if(event.keyCode === 37 && speedX === 0){
				speedX = -15;
				speedY = 0;
			}
		};
};