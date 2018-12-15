window.onload = function() {
	var menuLoad = loadMenu();
}

function loadMenu() {
	var text = "hc.kf";
	var length = text.length;
	var offsetX = [];
	var offsetY = [];
	var titleWidth;
	var animCharSpeed = 100;

	for (i = 0; i < length; i++) {
		let spanChar = document.createElement("span");
		spanChar.className = "character";
		spanChar.innerHTML = text[i];
		document.getElementById("text").append(spanChar);
		offsetX.push(spanChar.offsetLeft);
		offsetY.push(spanChar.offsetTop);
	}

	var characters = document.getElementsByClassName("character");
	setTitleWidth();
	window.addEventListener("resize", function() {
		document.getElementById("text").addEventListener("transitionend", function() {
			setTitleWidth();
		});
	}, true);

	function setTitleWidth() {
		titleWidth = document.getElementById("text").clientWidth;
		document.getElementsByTagName("header")[0].style.width = titleWidth + 1 + "px";
	}

	for (i = 0; i < characters.length; i++) {
		let randX = Math.random() * window.innerWidth - (window.innerWidth / 2);
		let randY = Math.random() * window.innerHeight - (window.innerHeight / 2);
		let randR = Math.floor(Math.random() * 175 + 75);
		let randG = Math.floor(Math.random() * 175 + 75);
		let randB = Math.floor(Math.random() * 175 + 75);

		characters[i].style.textShadow = "0 0 40px rgb(" + randR + "," + randG + "," + randB + ")";
		characters[i].style.color = "rgba(" + randR + "," + randG + "," + randB + ", 0.4)";

		characters[i].style.position = "absolute";
		characters[i].style.left = (offsetX[i] + randX) + "px";
		characters[i].style.top = (offsetY[i] + randY) + "px";
	}


	var count = 0;
	var finCharCount = 0;

	let animChar = setInterval(function() {
		if (count < characters.length) {
			characters[count].style.webkitTransition = "all 0.5s ease-out";
			characters[count].style.mozTransition = "all 0.5s ease-out";
			characters[count].style.transition = "all 0.5s ease-out";
			characters[count].style.left = offsetX[count] + "px";
			characters[count].style.top = (offsetY[count]) + "px";
			characters[count].style.opacity = "1";
			characters[count].style.color = "rgba(255, 255, 255, 0.4)";
			characters[count].style.textShadow = "0px 0px 0px #222";
			solidifyCharacter(characters[count]);
			count++;
		} else {
			clearInterval(animChar);
		}
	}, animCharSpeed);

	function solidifyCharacter(char) {
		setTimeout(function() {
			char.outerHTML = char.innerHTML;
			finCharCount++;
			if (finCharCount === text.length) {
				text = document.getElementById("text");
				header = document.getElementsByTagName("header")[0];
				text.style.textShadow = "0 0 0 #0a3513";
				header.style.transform = "translateY(-50%)";
				revealHiddenElements();
				document.getElementsByTagName("body")[0].style.overflow = "visible";
				document.getElementById("portfolio").style.display = "block";
				document.getElementsByTagName("footer")[0].style.display = "block";
			}
		}, 500);
	}

	function revealHiddenElements() {
		var hiddenElements = document.getElementsByClassName("hidden");
		for (i = 0; i < hiddenElements.length; i++) {
			hiddenElements[i].style.opacity = 1;
			hiddenElements[i].style.marginTop = "0px";
		}
	}
}