$(function() {
	var box = $('#box');
	box.css('width', window.innerWidth);
	box.css('height', window.innerHeight);
});


window.requestAnimationFrame = (function() {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function( /* function */ callback, /* DOMElement */ element) {
			window.setTimeout(callback, 1000 / 60);
		};
})();

window.cancelAnimationFrame = (function() {
	return window.cancelAnimationFrame ||
		window.webkitCancelAnimationFrame ||
		window.mozCancelAnimationFrame ||
		window.oCancelAnimationFrame ||
		window.msCancelAnimationFrame;
})();



$('.back').click(function() {
	window.location.href = 'http://192.168.1.182:8080'
})

//游戏
var B = 0.5;
var canvasW = window.innerWidth;
var canvasH = canvasW / B;
if (canvasH > window.innerHeight) canvasH = window.innerHeight;
var canvasObj = $('#canvas');
canvasObj.css('margin-top', (window.innerHeight - canvasH) / 2);
canvasObj.attr('width', canvasW);
canvasObj.attr('height', canvasH);
var ca = document.getElementById("canvas");

var ctx = ca.getContext("2d");
var bj1 = new Image();

var player = new Image();
var tu = new Array();
var timeImg = new Image();
var pointsImg = new Image();
var fontSize = parseFloat(document.getElementsByTagName('html')[0].style.fontSize) * 0.7 + 'px';

bj1.src = "images/boy/boyGBack.png";
player.src = "images/boy/boyGame.png";
timeImg.src = 'images/others/gamming/time.png';
pointsImg.src = 'images/others/gamming/score1.png';
ctx.font = fontSize + ' number';

var playerWidth = 210 * B;
var playerHeight = 319 * B;
var timeWidth = 279 * B;
var timeHeight = 88 * B;
var pointsWidth = 234 * B;
var pointsHeight = 88 * B;

var id;
var moveId;
var timer;
var h = 100;
var gk = 1;
var sudu = 1.5;
var percentage = 100;
var chi = 0;
var shi = 0;

var sm = 1;
var bj = bj1;
var moveSpeed = 3;

//游戏数据记录
var gameData = {
	points: 0,
	addTime: 0,
	addSpeed: 0,
	cutSpeed: 0
}

function object() {
	this.x = 0;
	this.y = 0;
	this.l = 11;
	this.image = new Image();
}

var sprite = new object();
//sprite.x=(canvasW - playerWidth)/2;
sprite.x = 0;
sprite.y = canvasH - playerHeight;

sprite.image = player;
// window.addEventListener("deviceorientation", function(event) {
// 	//返回值event.alpha、event.beta、event.gamma
// 	// console.log(event);
// 	// alert(event.alpha);
// 	// alert(event.beta);
// 	// console.log(event.gamma);
// 	var move = event.gamma;
// 	if (move < 0) {
// 		sprite.x = sprite.x - moveSpeed;
// 		console.log(sprite.x);
// 	} else if (move > 0) {
// 		sprite.x = sprite.x + moveSpeed;
// 		console.log(sprite.x);
// 	}
// 	if (sprite.x + playerWidth >= canvasW) sprite.x = canvasW - playerWidth;
// 	else if (sprite.x <= 0) sprite.x = 0;
// }, true);

var timeControl = new Date();
window.addEventListener("deviceorientation", function(event) {
	if (new Date() - timeControl >= 30) {
		var move = event.gamma;
		if (move < 0) {
			sprite.x = sprite.x - moveSpeed;
			console.log(sprite.x);
		} else if (move > 0) {
			sprite.x = sprite.x + moveSpeed;
			console.log(sprite.x);
		}
		if (sprite.x + playerWidth >= canvasW) sprite.x = canvasW - playerWidth;
		else if (sprite.x <= 0) sprite.x = 0;
		timeControl = new Date();
	}
}, true);

// addListener(ca,"mousemove",move);
// addListener(ca, "touchstart", move);
// addListener(ca, "touchmove", move);

var beginTime;
var gameTime = 30;
var remainTime;

function checkTime() {
	var nowTime = new Date();
	remainTime = gameTime - parseInt((nowTime.getTime() - beginTime.getTime()) / 1000);
	if (remainTime >= 10) {
		ctx.fillText(remainTime, 30 + timeWidth * B, 17 + timeHeight * B);
	} else {
		ctx.fillText(remainTime, 37 + timeWidth * B, 17 + timeHeight * B);
	}
}


var cacheCanvas = [],
	cacheCtx = [],
	down = [];
for (var i = 0; i <= 4; i++) {
	down[i] = new Image();
}
down[0].src = 'images/down/girl.png';
down[1].src = 'images/down/+1s.png';
down[2].src = 'images/down/boy.png';
down[3].src = 'images/down/car.png';
down[4].src = 'images/down/love.png';

for (var i = 0; i <= 4; i++) {
	down[i].onload = function() {
		for (var i = 0; i <= 4; i++) {
			cacheCanvas[i] = document.createElement('canvas');
			cacheCtx[i] = cacheCanvas[i].getContext('2d');
			cacheCanvas[i].width = down[i].width * B;
			cacheCanvas[i].height = down[i].height * B;
			cacheCtx[i].drawImage(down[i], 0, 0, down[i].width * B, down[i].height * B)
		}
	}
}



function chansheng() {
	if (shi % h == 0) {
		for (var j = 2 * chi; j < 2 * (chi + 1); j++) {
			tu[j] = new object();
			var k = Math.round(Math.random() * percentage);
			var w;
			if (k < 50) {
				tu[j].image = down[0];
				tu[j].draw = cacheCanvas[0];
				tu[j].q = 1;
				w = 108;
			} else if (k < 77) {
				tu[j].image = down[1];
				tu[j].draw = cacheCanvas[1];
				tu[j].q = '+';
				w = 89;
			} else if (k < 80) {
				tu[j].image = down[2];
				tu[j].draw = cacheCanvas[2];
				tu[j].q = '-';
				w = 102;
			} else if (k < 97) {
				tu[j].image = down[3];
				tu[j].draw = cacheCanvas[3];
				tu[j].q = 2;
				w = 184;
			} else {
				tu[j].image = down[4];
				tu[j].draw = cacheCanvas[4];
				tu[j].q = 3;
				w = 164;
			}

			var range = canvasW - w * B;
			var i = Math.round(Math.random() * range);
			if (j == 2 * chi + 1) {
				while (Math.abs(i - tu[2 * chi].x) < w * B) {
					i = Math.round(Math.random() * range);
				}
			}
			tu[j].x = i;
			tu[j].y = -Math.round(Math.random() * 300);
		}
		chi++;
		// if (chi == 50) chi = 0;
		// console.log(chi);
	}
	shi++;
	// console.log(shi % h)
	// console.log(shi+' '+chi+' '+shi%h)
}


// function sudukongzhi() {
// 	if (remainTime > 10) {
// 		// h = 10;
// 		sudu = 5;
// 	} else if (remainTime > 5) {
// 		// h = 10;
// 		sudu = 20;
// 	} else {
// 		// h = 5;
// 		sudu = 30;
// 	}
// }

function draw() {
	// sudukongzhi();
	chansheng();
	var w, h;
	for (var i = 0; i < tu.length; i++) {
		//吃掉东西规则
		if (jianche(sprite, tu[i])) {
			if (tu[i].q == 1) {
				gameData.points += 1;
				if (gameData.points >= 10 && pointsWidth == 234 * B) {
					pointsImg.src = 'images/others/gamming/score2.png';
					pointsWidth = 271 * B;
				}
			} else if (tu[i].q == 2) {
				moveSpeed += 3;
				gameData.addSpeed++;
			} else if (tu[i].q == '+') {
				gameTime += 1;
				gameData.addTime++;
			} else if (tu[i].q == '-') {
				if (moveSpeed != 3) {
					moveSpeed -= 3;
					gameData.cutSpeed++;
				}
			} else {
				stop();
			}
			tu[i].y += 300;
		} else if (!jianche(sprite, tu[i])) {
			tu[i].y += sudu;
		}

		//掉落东西尺寸控制
		if (tu[i].q == 1) {
			w = 108;
			h = 165;
		} else if (tu[i].q == 2) {
			w = 184;
			h = 71;
		} else if (tu[i].q == '+') {
			w = 89;
			h = 78;
		} else if (tu[i].q == '-') {
			w = 102;
			h = 155;
		} else {
			w = 164;
			h = 170;
		}
		ctx.drawImage(tu[i].draw, tu[i].x, tu[i].y, tu[i].image.width * B, tu[i].image.height * B);
	}
}

function jianche(a, b) {
	var c = a.x - b.x;
	var d = a.y - b.y;
	if (c < b.image.width * B && c > -a.image.width * B && d < b.image.height * B && d > -a.image.height * B) {
		return true;
	} else {
		return false;
	}
}

function addListener(element, e, fn) {
	if (element.addEventListener) {
		element.addEventListener(e, fn, false);
	} else {
		element.attachEvent("on" + e, fn);
	}
}

function move(event) {
	var touch = event.touches[0];
	sprite.x = touch.clientX - playerWidth / 2;
	if (sprite.x + playerWidth >= canvasW) sprite.x = canvasW - playerWidth;
	else if (sprite.x < 0) sprite.x = 0;
	event.preventDefault();
}

function stop() {
	cancelAnimationFrame(id);
	cancelAnimationFrame(moveId);
	$('.getPoints').text(gameData.points);
	$('.addTimes').text(gameData.addTime);
	$('.special').text(gameData.addSpeed);
	$('.withMan').text(gameData.cutSpeed);
	$('#box').css('filter', 'blur(3px)');
	$('.gameOver').show();
}



function game() {
	// sprite.x = sprite.x + moveSpeed;
	// if (sprite.x + playerWidth >= canvasW) {
	// 	sprite.x = canvasW - playerWidth;
	// 	moveSpeed = -moveSpeed
	// } else if (sprite.x <= 0) {
	// 	sprite.x = 0;
	// 	moveSpeed = -moveSpeed;
	// }
	ctx.clearRect(0, 0, canvasW, canvasH);
	ctx.drawImage(timeImg, 20, 10, timeWidth, timeHeight);
	ctx.drawImage(pointsImg, canvasW - 234 * B - 30, 10, pointsWidth, pointsHeight);
	ctx.drawImage(sprite.image, sprite.x, sprite.y, playerWidth, playerHeight);
	checkTime();
	ctx.fillText(gameData.points, canvasW - 55, 17 + pointsHeight * B)
	id = requestAnimationFrame(game);
	draw();
	// document.getElementById("points").innerHTML = gameData.points;
	if (remainTime == 0) {
		stop()
	}
	// console.log(sprite.x)
	timer = new Date();
}


$('.start').click(function() {
	beginTime = new Date()
	$('.beforeGame-boy').remove();
	$('#box').show();
	$('#box').css('filter', 'blur(0)');

	timer = new Date();
	id = requestAnimationFrame(game);
	// interval = setInterval(function() {
	// 	ctx.clearRect(0, 0, canvasW, canvasH);
	// 	ctx.drawImage(timeImg, 20, 10, timeWidth, timeHeight);
	// 	ctx.drawImage(pointsImg, canvasW - 234 * B - 30, 10, pointsWidth, pointsHeight);
	// 	ctx.drawImage(sprite.image, sprite.x, sprite.y, playerWidth, playerHeight);
	// 	checkTime();
	// 	ctx.fillText(gameData.points, canvasW - 55, 17 + pointsHeight * B)
	// 	if (remainTime == 0) {
	// 		stop()
	// 	}
	// 	draw();
	// }, 50);
})

$('.again').click(function() {
	tu = new Array();
	sudu = 1.5;
	chi = 0;
	shi = 0;
	moveSpeed = 3;
	gameData = {
		points: 0,
		addTime: 0,
		addSpeed: 0,
		cutSpeed: 0
	};
	timeControl = new Date();
	gameTime = 30;
	$('.beforeGame-boy').remove();
	$('#box').show();
	$('#box').css('filter', 'blur(0)');
	$('.gameOver').hide();
	beginTime = new Date();
	timer = new Date();
	id = requestAnimationFrame(game);
	// interval = setInterval(function() {
	// 	ctx.clearRect(0, 0, canvasW, canvasH);
	// 	ctx.drawImage(timeImg, 20, 10, timeWidth, timeHeight);
	// 	ctx.drawImage(pointsImg, canvasW - 234 * B - 30, 10, pointsWidth, pointsHeight);
	// 	ctx.drawImage(sprite.image, sprite.x, sprite.y, playerWidth, playerHeight);
	// 	draw();
	// 	// document.getElementById("points").innerHTML = gameData.points;
	// 	ctx.fillText(gameData.points, canvasW - 55, 17 + pointsHeight * B)
	// 	checkTime();
	// 	if (remainTime == 0) {
	// 		stop()
	// 	}
	// }, 50);
})

$('.comeBack').click(function() {
	window.location.href = 'http://192.168.1.182:8080/'
})

// $('.shareFriend').click(function() {
// 	wx.onMenuShareAppMessage({
// 		title: '接汉子啦', // 分享标题
// 		desc: '啦啦啦一起来玩吧', // 分享描述
// 		link: 'http://girlwall.duapp.com/game/index.html', // 分享链接
// 		imgUrl: '', // 分享图标
// 		type: '', // 分享类型,music、video或link，不填默认为link
// 		dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
// 		success: function() {
// 			// 用户确认分享后执行的回调函数
// 			window.history.back(1);
// 		},
// 		cancel: function() {
// 			// 用户取消分享后执行的回调函数
// 		}
// 	});
// })
// $('.share').click(function() {
// 	wx.onMenuShareTimeline({
// 		title: '接汉子啦', // 分享标题
// 		link: 'http://girlwall.duapp.com/game/index.html', // 分享链接
// 		imgUrl: '', // 分享图标
// 		success: function() {
// 			// 用户确认分享后执行的回调函数
// 			window.history.back(1);
// 		},
// 		cancel: function() {
// 			// 用户取消分享后执行的回调函数
// 		}
// 	});
// })