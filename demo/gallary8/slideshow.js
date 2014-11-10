window.onload = initLinks;

var myPhoto = new Array(
"photo/pic_1h.jpg",
"photo/pic_1v.jpg",
"photo/pic_2h.jpg",
"photo/pic_2v.jpg",
"photo/pic_3h.jpg",
"photo/pic_3v.jpg",
"photo/pic_4h.jpg",
"photo/pic_4v.jpg",
"photo/pic_5h.jpg",
"photo/pic_5v.jpg",
"photo/pic_6h.jpg",
"photo/pic_6v.jpg",
"photo/pic_7h.jpg",
"photo/pic_8h.jpg",
"photo/pic_7v.jpg",
"photo/pic_8v.jpg",
"photo/pic_9h.jpg",
"photo/pic_9v.jpg",
"photo/pic_10h.jpg",
"photo/pic_10v.jpg",
"photo/pic_11v.jpg",
"photo/pic_11h.jpg",
"photo/pic_12v.jpg",
"photo/pic_12h.jpg",
"photo/pic_13v.jpg",
"photo/pic_14v.jpg",
"photo/pic_13h.jpg",
"photo/pic_15v.jpg",
"photo/pic_16v.jpg",
"photo/pic_14h.jpg",
"photo/pic_17v.jpg",
"photo/pic_15h.jpg",
"photo/pic_10h.jpg",
"photo/pic_18v.jpg",
"photo/pic_16h.jpg",
"photo/pic_19v.jpg",
"photo/pic_17h.jpg",
"photo/pic_18h.jpg",
"photo/pic_20v.jpg",
"photo/pic_19h.jpg",
"photo/pic_21v.jpg",
"photo/pic_20h.jpg",
"photo/pic_22v.jpg",
"photo/pic_21h.jpg",
"photo/pic_23v.jpg",
"photo/pic_22h.jpg",
"photo/pic_24v.jpg",
"photo/pic_23h.jpg",
"photo/pic_25v.jpg",
"photo/pic_26v.jpg",
"photo/pic_24h.jpg",
"photo/pic_27v.jpg",
"photo/pic_25h.jpg",
"photo/pic_26h.jpg",
"photo/pic_28v.jpg",
"photo/pic_27h.jpg",
"photo/pic_29v.jpg",
"photo/pic_28h.jpg",
"photo/pic_30v.jpg",
"photo/pic_29h.jpg",
"photo/pic_30h.jpg");


var myText = new Array(
"#1 This is a line of descriptive text that can be placed below the image.",
"#2 Vestibulum dapibus posuere enim.",
"#3 Curabitur vel dui. Donec libero.",
"#4 Ipsum, feugiat a, ultricies sit amet, rutrum at, purus.",
"#5 Nulla iaculis gravida turpis. Integer imperdiet.",
"#6 Aliquam justo nulla, sagittis ac, aliquam in, accumsan quis, tortor.",
"#7 Mauris id ante.",
"#8 Sed eu orci feugiat ante auctor interdum.",
"#9 Aenean auctor consequat tellus.",
"#10 Cras vitae est at quam bibendum aliquet.",
"#11 Nunc ullamcorper orci at mauris.",
"#12 Fusce pharetra, nulla vel tincidunt tristique.",
"#13 Tellus purus porttitor metus, eget sagittis sem sem sit amet nunc.",
"#14 Vivamus nec metus et nunc auctor tristique.",
"#15 Mauris tincidunt.",
"#16 Nisl eget euismod molestie, magna eros tincidunt magna.",
"#17 Et facilisis nisi nunc et eros.",
"#18 Morbi vitae diam vitae elit ultrices placerat.",
"#19 Maecenas magna pede, suscipit vitae, porttitor nec, malesuada sed, pede.",
"#20 Sed lacus leo, ultrices vel.",
"#21 Vivamus nec metus et nunc auctor tristique.",
"#22 Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
"#23 Sed lacus leo, ultrices vel.",
"#24 Et facilisis nisi nunc et eros.",
"#25 Cras vitae est at quam bibendum aliquet.",
"#26 Vestibulum dapibus posuere enim.",
"#27 Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
"#28 Aenean auctor consequat tellus.",
"#29 Fusce pharetra, nulla vel tincidunt tristique.",
"#30 Nisl eget euismod molestie, magna eros tincidunt magna.",
"#31 Mauris tincidunt.",
"#32 Mauris id ante.",
"#33 Morbi vitae diam vitae elit ultrices placerat.",
"#34 Nunc ullamcorper orci at mauris.",
"#35 Class aptent taciti sociosqu ad litora torquent per conubia nostra.",
"#36 Cras et nibh vel arcu tempus elementum.",
"#37 Donec interdum, nisi eget faucibus condimentum.",
"#38 Vivamus nec metus et nunc auctor tristique.",
"#39 Et facilisis nisi nunc et eros.",
"#40 Cras vitae est at quam bibendum aliquet.",
"#41 Vestibulum dapibus posuere enim.",
"#42 Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
"#43 Fusce pharetra, nulla vel tincidunt tristique.",
"#44 Sed lacus leo, ultrices vel.",
"#45 Aenean auctor consequat tellus.",
"#45 Nisl eget euismod molestie, magna eros tincidunt magna.",
"#47 Mauris tincidunt.",
"#48 Mauris id ante.",
"#49 Morbi vitae diam vitae elit ultrices placerat.",
"#50 Nunc ullamcorper orci at mauris.",
"#51 Cras vitae est at quam bibendum aliquet.",
"#52 Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
"#53 Metus et nunc auctor tristique.",
"#54 Sed lacus leo, ultrices vel.",
"#55 Vestibulum dapibus posuere enim.",
"#56 Aenean auctor consequat tellus.",
"#57 Fusce pharetra, nulla vel tincidunt tristique.",
"#58 Vivamus nec metus et nunc auctor tristique.",
"#59 Nisl eget euismod molestie, magna eros tincidunt magna.",
"#60 Mauris tincidunt.",
"#61Mauris id ante.");

var thisPhoto = 0;

function initLinks() {
	document.getElementById("previous").onclick = processPrevious;
	document.getElementById("next").onclick = processNext;
}


function processPrevious() {
	changeOpac(0)
	//opacityFade();
	if (thisPhoto == 0) {
		thisPhoto = myPhoto.length;
	}
	thisPhoto--;
	document.getElementById("myPicture").src = myPhoto[thisPhoto];
	if (document.getElementById("myPicture").src.indexOf("v") != -1)
	{
		document.getElementById("myPicture").style.marginTop = 10 + "px";
	}
	else {
		document.getElementById("myPicture").style.marginTop = 50 + "px";
	}
	document.getElementById('pictureText').innerHTML = myText[thisPhoto];
	opacityShow()
	return false;
}

function processNext() {
	changeOpac(0);
	//opacityFade();
	thisPhoto++;
	if (thisPhoto == myPhoto.length) {
		thisPhoto = 0;
	}
	document.getElementById("myPicture").src = myPhoto[thisPhoto];
	if (document.getElementById("myPicture").src.indexOf("v") != -1)
	{
		document.getElementById("myPicture").style.marginTop = 10 + "px";
	}
	else {
		document.getElementById("myPicture").style.marginTop = 50 + "px";
	}
	document.getElementById('pictureText').innerHTML = myText[thisPhoto];
	opacityShow()
	return false;
}


function opacityFade() {
	timer = 700;
	for(i = 100; i >= 0; i--) {
		setTimeout("changeOpac(" + i + ")",(timer));
		timer=timer+2;
	}
}
function opacityShow() {
	timer = 300;
	for(i = 0; i <= 100; i++) {
		setTimeout("changeOpac(" + i + ")",(timer));
		timer=timer+22;
	}
}

function changeOpac(opacity) {
	var object = document.getElementById('myPicture').style;
	object.opacity = (opacity / 100);
	object.MozOpacity = (opacity / 100);
	object.KhtmlOpacity = (opacity / 100);
	object.filter = "alpha(opacity=" + opacity + ")";
}

