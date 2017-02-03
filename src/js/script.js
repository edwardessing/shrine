$(document).ready(function() {

/* signature */
	if (typeof console !== 'undefined') {
		console.log("%cEDES, 2014\nDesign & Development: Edward Essing (http://edwardessing.com)", "color: #FFA500; font-weight: bold; font-size: 12px;");
	}

/* duplication fix */
	$('[id]').each(function (i) {
		$('[id="' + this.id + '"]').slice(1).remove();
	});


/* menu */
	$('.menu-link').click(function () {
		$('.menu-link').toggleClass( 'rotate' );
		$('.dropdown').toggleClass( 'active' );
	});

	$(document).mouseup(function (e) {
		var box = $('.dropdown, .menu-link');
		if (!box.is(e.target) // if the target of the click isn't the container...
			&& box.has(e.target).length === 0) // ... nor a descendant of the container
			{
				$('.menu-link').removeClass('rotate');
				box.removeClass('active');
			}
	});

/* post nav */
	$('.post-nav div').hover(function () {
		$(".post-nav a span").toggleClass( 'active' );
	});

	// if($('.post-nav a').length >0 ){
	// 	var	prev = $('.post-nav .prev a')[0],
	// 		next = $('.post-nav .next a')[0];

	// 	$(window).keydown(function(e){
	// 		if (e.which === 37) {
	// 			window.location.href = prev.href;
	// 		} else if (e.which === 39) {
	// 			window.location.href = next.href;
	// 		}
	// 	});
	// }

/* clock */
	$('.clock-toggle').click(function () {
		$(".menu-clock").toggleClass( 'active' );

		if ( $('.clock').hasClass('active') ) {
			$('.clock-toggle').addClass('active-text');
		} else {
			$('.clock-toggle').removeClass('active-text');
		}
	});

	$('.change-skin').click(function() {
		$('#clockface').toggleClass('cf2');
		$('#minute').toggleClass('min2');
		$('#second').toggleClass('sec2');
		$('#hour').toggleClass('hr2');
	});

	var props = 'transform WebkitTransform MozTransform OTransform msTransform'.split(' '),
		prop,
		el = document.createElement('div');

	for(var i = 0, l = props.length; i < l; i++) {
		if(typeof el.style[props[i]] !== 'undefined') {
			prop = props[i];
			break;
		}
	}

/* clock animation */
	function startClock() {
		var angle = 360/60,
			date = new Date(),
			hour = date.getHours() % 12,
			second = date.getSeconds(),
			minute = date.getMinutes() + second / 60,
			hourAngle = (360/12) * hour + (360/(12*60)) * minute;

		if(prop) {
			$('#minute')[0].style[prop] = 'rotate('+angle * minute+'deg)';
			$('#second')[0].style[prop] = 'rotate('+angle * second+'deg)';
			$('#hour')[0].style[prop] = 'rotate('+hourAngle+'deg)';
		}
	}

	var timer = setInterval(function() {
		startClock();
	}, 0.001);

/* home time and date */
	function pad(n) {
	  if (n < 10) {
		return '0' + n.toString();
	  }
	  return n.toString();
	}
	function showTime() {
	  var now = new Date();
	  var value = now.getHours() + ':' + pad(now.getMinutes()) + ':' + pad(now.getSeconds());
	  $('#home-time').text(value);
	}
	function showDate() {
	  var now = new Date();
	  var value = (now.getMonth() + 1) + '.' + now.getDate() + '.' + now.getFullYear();
	  $('#home-date').text(value);
	}

	var timer = setInterval(function() {
	  showTime();
	  showDate();
	}, 500);

// Cross browser addEvent function by John Resig
// http://ejohn.org/blog/flexible-javascript-events/
	function addEvent(obj, type, fn) {
		if (obj.attachEvent) {
			obj['e' + type + fn] = fn;
			obj[type + fn] = function () {
				obj['e' + type + fn](window.event);
			}
			obj.attachEvent('on' + type, obj[type + fn]);
		} else obj.addEventListener(type, fn, false);
	}

	function trigger(action, el){
	  if (document.createEvent) {
		var event = document.createEvent('HTMLEvents');
		event.initEvent(action, true, false);
		el.dispatchEvent(event);
	  } else {
		el.fireEvent('on' + action);
	  }
	}

/* style toggle */
	function switchSize(newSize) {
		var sizes = ['t1', 't2', 't3'].forEach(function (size) {
			$('.container').removeClass(size);
		});

		$('.container').addClass(newSize);
		localStorage.setItem('storedSize', newSize);
	}
	function switchColour(newColour) {
		['gold', 'black', 'white'].forEach(function (colour) {
			$('.container').removeClass(colour);
		});

		$('.container').addClass(newColour);
		localStorage.setItem('storedColour', newColour);
	}
	function switchGrid(newGrid) {
		['pure-u-md-1-1', 'pure-u-md-1-2'].forEach(function (grid) {
			$('.grid').removeClass(grid);
		});

		$('.grid').addClass(newGrid);
		localStorage.setItem('storedGrid', newGrid);
	}
	function switchAlign(newAlign) {
		['left', 'center'].forEach(function (align) {
			$('.container').removeClass(align);
		});

		$('.container').addClass(newAlign);
		localStorage.setItem('storedAlign', newAlign);
	}

	$('.styleSwitch .size').click(function() {
		var value = $(this).val();
		switchSize(value);
	});
	$('.styleSwitch .colour').click(function() {
		var value = $(this).val();
		switchColour(value);
	});
	$('.styleSwitch .grid-edit').click(function() {
		var value = $(this).val();
		switchGrid(value);
	});
	$('.styleSwitch .align').click(function() {
		var value = $(this).val();
		switchAlign(value);
	});

	var storedSize = localStorage.getItem('storedSize');
	var storedColour = localStorage.getItem('storedColour');
	var storedGrid = localStorage.getItem('storedGrid');
	var storedAlign = localStorage.getItem('storedAlign');
	if (storedSize) {
		switchSize(storedSize);
	} else {
		switchSize('t2');
	}
	if (storedColour) {
		switchColour(storedColour);
	} else {
		switchColour('black');
	}
	if (storedGrid) {
		switchGrid(storedGrid);
	} else {
		switchGrid('pure-u-md-1-2');
	}
	if (storedAlign) {
		switchAlign(storedAlign);
	} else {
		switchAlign('center');
	}


/* color variables */
	if ($('.container').hasClass('gold') === true) {
		$('.link').css('color','black');
	} else {
		$('.link').css('color','#B4A03C');
	}

	$('button.colour').click(function () {
		if ($('.container').hasClass('gold') === true) {
			$('.link').css('color','black');
		} else {
			$('.link').css('color','#B4A03C');
		}
	});

/* post icon gradients */

	// Define variable colors
	var back = ["#000000","#FFFFFF","#B4A03C"];

	$('.post-icon').each(function() {

		// First random color
		var rand1 = back[Math.floor(Math.random() * back.length)];
		// Second random color
		var rand2 = back[Math.floor(Math.random() * back.length)];

		var grad = $(this);

		var randomNumber = Math.floor(Math.random() * 100) + 1;

		// Convert Hex color to RGB
		function convertHex(hex,opacity){
		    hex = hex.replace('#','');
		    r = parseInt(hex.substring(0,2), 16);
		    g = parseInt(hex.substring(2,4), 16);
		    b = parseInt(hex.substring(4,6), 16);

			// Add Opacity to RGB to obtain RGBA
		    result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
		    return result;
		}

		// Gradient rules
		grad.css('background-color', convertHex(rand1,randomNumber) );
		grad.css("background-image", "-webkit-gradient(linear, left top, left bottom, color-stop(0%,"+ convertHex(rand1,randomNumber) +"), color-stop(100%,"+ convertHex(rand2,randomNumber) +"))");
		grad.css("background-image", "-webkit-linear-gradient(top,  "+ convertHex(rand1,randomNumber) +" 0%,"+ convertHex(rand2,randomNumber) +" 100%)");
		grad.css("background-image", "-o-linear-gradient(top, "+ convertHex(rand1,randomNumber) +" 0%,"+ convertHex(rand2,randomNumber) +" 100%)");
		grad.css("background-image", "-ms-linear-gradient(top, "+ convertHex(rand1,randomNumber) +" 0%,"+ convertHex(rand2,randomNumber) +" 100%)");
		grad.css("background-image", "linear-gradient(to bottom, "+ convertHex(rand1,randomNumber) +" 0%,"+ convertHex(rand2,randomNumber) +" 100%)");
		grad.css("filter", "progid:DXImageTransform.Microsoft.gradient( startColorstr='"+ convertHex(rand1,randomNumber) +"', endColorstr='"+ convertHex(rand2,randomNumber) +"',GradientType=0 )");

	});

/* script end */
});