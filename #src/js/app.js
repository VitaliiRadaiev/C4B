let isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };

let isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));


window.addEventListener('load', function () {

	document.body.classList.add('is-load');

	// ==== ADD PADDING-TOP ================================
	{
		let wrapper = document.querySelector('._padding-top');
		if (wrapper) {
			let header = document.querySelector('.header');
			if (header) {
				const setPedding = () => wrapper.style.paddingTop = header.clientHeight + 'px';
				setPedding();
				let id = setInterval(setPedding, 200);
				setTimeout(() => {
					clearInterval(id);
				}, 1000)
				window.addEventListener('resize', setPedding);
			}

		}
	}
	// ==== AND ADD PADDING-TOP ================================

	@@include('_function.js');
	@@include('forms.js');
	@@include('../common/burger/burger.js');
	@@include('../common/header/header.js');
	@@include('../common/news-list/news-list.js');
	@@include('../common/hero/hero.js');
	@@include('../common/with-decor/with-decor.js');

	@@include('pages/home.js');
	@@include('files/scrollAnimation.js');

	// let wow = new WOW({
	// 	boxClass: '_anim',
	// 	offset: 7,
	// })
	// wow.init();


	let castomLinks = document.querySelectorAll('[data-href]');
	if(castomLinks.length) {
		castomLinks.forEach(link => {
			let src = link.dataset.href;
			link.addEventListener('click', (e) => {
				e.preventDefault();
				e.stopPropagation();
				window.location.href = src;
			})
		})
	}

	let linkToTop = document.querySelector('.link-to-top');
	if(linkToTop) {
		linkToTop.addEventListener('click', (e) => {
			e.preventDefault();
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			})
		})
	}
});

window.addEventListener('DOMContentLoaded', function () {
	if (isMobile.any()) {
		document.body.classList.add('_is-mobile');
	}

	if(isMobile.iOS()) {
		document.body.classList.add('_is-mobile-ios');
	}

	@@include('files/dynamic_adapt.js')
	@@include('../common/form/form.js')
	@@include('../common/popup/popup.js')

	function testWebP(callback) {

		var webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}

	testWebP(function (support) {

		if (support == true) {
			document.querySelector('body').classList.add('webp');
		} else {
			document.querySelector('body').classList.add('no-webp');
		}
	});

	let animAll = document.querySelectorAll('._anim');
	if(animAll.length) {
		animAll.forEach(item => {
			item.setAttribute('data-wow-delay', '0.5s');
		})
	}

	@@include('../common/promo/promo.js');

	let hero = document.querySelector('.hero');
	if(hero) {
		let img = hero.querySelector('.hero__bg img');
		let bg = hero.querySelector('.hero__bg');
		let div = document.createElement('div');
		div.className = 'bg-wrap layer';
		div.append(img);
		hero.classList.add('_parallax');
		div.setAttribute('data-depth', '0.20');
		bg.append(div);
	}

	let textBlock = document.querySelector('.text-block');
	if(textBlock) {
		let bigText = textBlock.querySelector('.big-text');
		if(!bigText) {
			textBlock.classList.add('_first')
		}
	}

	let asideIcons = document.querySelector('#dpsp-floating-sidebar');
	if(asideIcons) {
		let textContentAll = document.querySelectorAll('.text-content');
		if(textContentAll.length) {
			textContentAll.forEach(item => {
				item.classList.add('_pedding-right');
			})
		}
	}

});

