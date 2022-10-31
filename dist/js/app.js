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

	//SlideToggle
function _slideUp(target, duration = 500) {
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.height = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	window.setTimeout(() => {
		target.style.display = 'none';
		target.style.removeProperty('height');
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
function _slideDown (target, duration = 500) {
	target.style.removeProperty('display');
	let display = window.getComputedStyle(target).display;
	if (display === 'none')
		display = 'block';

	target.style.display = display;
	let height = target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + 'ms';
	target.style.height = height + 'px';
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');
	window.setTimeout(() => {
		target.style.removeProperty('height');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
function _slideToggle (target, duration = 500) {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (window.getComputedStyle(target).display === 'none') {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	}
}
//========================================







//Spollers
function spollerInit() {
	let spollers = document.querySelectorAll("._spoller");
	if (spollers.length > 0) {
		for (let index = 0; index < spollers.length; index++) {
			const spoller = spollers[index];

			if(spoller.classList.contains('_active')) {
				_slideDown(spoller.nextElementSibling);
			}

			spoller.addEventListener("click", function (e) {
				e.preventDefault();
				if (spoller.classList.contains('_spoller-992') && window.innerWidth > 992) {
					return false;
				}
				if (spoller.classList.contains('_spoller-768') && window.innerWidth > 768) {
					return false;
				}
				if (spoller.closest('._spollers').classList.contains('_one')) {
					let curent_spollers = spoller.closest('._spollers').querySelectorAll('._spoller');
					for (let i = 0; i < curent_spollers.length; i++) {
						let el = curent_spollers[i];
						if (el != spoller) {
							el.classList.remove('_active');
							el.parentElement.classList.remove('_active');
							_slideUp(el.nextElementSibling);
						}
					}
				}
				spoller.classList.toggle('_active');
				if(spoller.classList.contains('_active')) {
					spoller.parentElement.classList.add('_active');
				} else {
					spoller.parentElement.classList.remove('_active');
				}
				_slideToggle(spoller.nextElementSibling);
			});
		}
	}
}
spollerInit()
// === // Spollers ==================================================================






function createTabs(containerName = false, triggersName = false, tabsName = false) {
	let container = document.querySelector(`${containerName}`);
	if (container) {
		let allTriggers = container.querySelectorAll(`${triggersName}`);
		let allTabs = container.querySelectorAll(`${tabsName}`);

		if (allTriggers.length) {
			allTriggers.forEach(trigger => {
				trigger.addEventListener('click', (e) => {
					e.preventDefault();
					const id = trigger.getAttribute('href').replace('#', '');

					trigger.classList.add('active');

					allTriggers.forEach(i => {
						if (i == trigger) {
							return
						}
						i.classList.remove('active');
					});

					allTabs.forEach(tab => {
						if (tab.id == id) {
							tab.classList.add('active')
						} else {
							tab.classList.remove('active');
						}
					})

				})
			})
		}

	}
}

//createTabs('.tabs', '.tab-trigger', '.tab-content')


function setSameHeight(items) {
    if(!items.length) return;

    let maxHeight = Math.max(...Array.from(items).map(i => i.clientHeight));
    items.forEach(i => i.style.minHeight = maxHeight + 'px');
}

function setCounterAnim() {
	let couterItems = document.querySelectorAll('[data-counter]');
    if (couterItems) {
        couterItems.forEach(item => {
            let animation = anime({
                targets: item,
                textContent: [0, item.dataset.counter || 0],
                round: 1,
                easing: 'linear',
                autoplay: false,
                duration: 1000
            });
            const observer = new IntersectionObserver(
                entries => {
                    entries.forEach(entry => {
                        if (entry.intersectionRatio >= 0.7) {
                            animation.play();
                            observer.disconnect();
                        }
                    });
                },
                {
                    threshold: 0.7
                }
            );

            observer.observe(item);
        })
    }
}

setCounterAnim();

let anchors = document.querySelectorAll('.anchor');
if(anchors.length) {
	anchors.forEach(anchor => {
		if(!anchor.getAttribute('href').match(/#\w+$/gi)) return;
		
		let id = anchor.getAttribute('href').match(/#\w+$/gi).join('').replace('#', '');
		anchor.addEventListener('click', (e) => {

			let el = document.getElementById(id);
			if(el) {
				e.preventDefault();
				window.scrollTo({
					top: el.offsetTop,
					behavior: 'smooth',
				})
			}

		})
	})
}

function trimString(el, stringLength = 0) {
	let str = el.innerText;
	if(str.length <= stringLength) return;
	el.innerText = [...str].slice(0, stringLength).join('') + '...';
}

function randomInteger(min, max) {
	let rand = min + Math.random() * (max + 1 - min);
	return Math.floor(rand);
};
	// //let btn = document.querySelectorAll('button[type="submit"],input[type="submit"]');
// let forms = document.querySelectorAll('form');
// if (forms.length > 0) {
// 	for (let index = 0; index < forms.length; index++) {
// 		const el = forms[index];
// 		el.addEventListener('submit', form_submit);
// 	}
// }
// function form_submit(e) {
// 	let btn = event.target;
// 	let form = btn.closest('form');
// 	let message = form.getAttribute('data-message');
// 	let error = form_validate(form);
// 	if (error == 0) {
// 		//SendForm
// 		form_clean(form);
// 		if (message) {
// 			popup_open('message-' + message);
// 			e.preventDefault();
// 		}
// 	} else {
// 		let form_error = form.querySelectorAll('._error');
// 		if (form_error && form.classList.contains('_goto-error')) {
// 			_goto(form_error[0], 1000, 50);
// 		}
// 		event.preventDefault();
// 	}
// }
// function form_validate(form) {
// 	let error = 0;
// 	let form_req = form.querySelectorAll('._req');
// 	if (form_req.length > 0) {
// 		for (let index = 0; index < form_req.length; index++) {
// 			const el = form_req[index];
// 			if (!_is_hidden(el)) {
// 				error += form_validate_input(el);
// 			}
// 		}
// 	}
// 	return error;
// }
// function form_validate_input(input) {
// 	let error = 0;
// 	let input_g_value = input.getAttribute('data-value');

// 	if (input.getAttribute("name") == "email" || input.classList.contains("_email")) {
// 		if (input.value != input_g_value) {
// 			let em = input.value.replace(" ", "");
// 			input.value = em;
// 		}
// 		if (email_test(input) || input.value == input_g_value) {
// 			form_add_error(input);
// 			error++;
// 		} else {
// 			form_remove_error(input);
// 		}
// 	} else if (input.getAttribute("type") == "checkbox" && input.checked == false) {
// 		form_add_error(input);
// 		error++;
// 	} else {
// 		if (input.value == '' || input.value == input_g_value) {
// 			form_add_error(input);
// 			error++;
// 		} else {
// 			form_remove_error(input);
// 		}
// 	}
// 	return error;
// }
// function form_add_error(input) {
// 	input.classList.add('_error');
// 	input.parentElement.classList.add('_error');

// 	let input_error = input.parentElement.querySelector('.form__error');
// 	if (input_error) {
// 		input.parentElement.removeChild(input_error);
// 	}
// 	let input_error_text = input.getAttribute('data-error');
// 	if (input_error_text && input_error_text != '') {
// 		input.parentElement.insertAdjacentHTML('beforeend', '<div class="form__error">' + input_error_text + '</div>');
// 	}
// }
// function form_remove_error(input) {
// 	input.classList.remove('_error');
// 	input.parentElement.classList.remove('_error');

// 	let input_error = input.parentElement.querySelector('.form__error');
// 	if (input_error) {
// 		input.parentElement.removeChild(input_error);
// 	}
// }
// function form_clean(form) {
// 	let inputs = form.querySelectorAll('input,textarea');
// 	for (let index = 0; index < inputs.length; index++) {
// 		const el = inputs[index];
// 		el.parentElement.classList.remove('_focus');
// 		el.classList.remove('_focus');
// 		el.value = el.getAttribute('data-value');
// 	}
// 	let checkboxes = form.querySelectorAll('.checkbox__input');
// 	if (checkboxes.length > 0) {
// 		for (let index = 0; index < checkboxes.length; index++) {
// 			const checkbox = checkboxes[index];
// 			checkbox.checked = false;
// 		}
// 	}
// 	let selects = form.querySelectorAll('select');
// 	if (selects.length > 0) {
// 		for (let index = 0; index < selects.length; index++) {
// 			const select = selects[index];
// 			const select_default_value = select.getAttribute('data-default');
// 			select.value = select_default_value;
// 			select_item(select);
// 		}
// 	}
// }

// let viewPass = document.querySelectorAll('.form__viewpass');
// for (let index = 0; index < viewPass.length; index++) {
// 	const element = viewPass[index];
// 	element.addEventListener("click", function (e) {
// 		if (element.classList.contains('_active')) {
// 			element.parentElement.querySelector('input').setAttribute("type", "password");
// 		} else {
// 			element.parentElement.querySelector('input').setAttribute("type", "text");
// 		}
// 		element.classList.toggle('_active');
// 	});
// }


//Select
let selects = document.getElementsByTagName('select');
if (selects.length > 0) {
	selects_init();
}
function selects_init() {
	for (let index = 0; index < selects.length; index++) {
		const select = selects[index];
		select_init(select);
	}
	//select_callback();
	document.addEventListener('click', function (e) {
		selects_close(e);
	});
	document.addEventListener('keydown', function (e) {
		if (e.which == 27) {
			selects_close(e);
		}
	});
}
function selects_close(e) {
	const selects = document.querySelectorAll('.select');
	if (!e.target.closest('.select')) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_body_options = select.querySelector('.select__options');
			select.classList.remove('_active');
			_slideUp(select_body_options, 100);
		}
	}
}
function select_init(select) {
	const select_parent = select.parentElement;
	const select_modifikator = select.getAttribute('class');
	const select_selected_option = select.querySelector('option:checked');
	select.setAttribute('data-default', select_selected_option.value);
	select.style.display = 'none';

	select_parent.insertAdjacentHTML('beforeend', '<div class="select select_' + select_modifikator + '"></div>');

	let new_select = select.parentElement.querySelector('.select');
	new_select.appendChild(select);
	select_item(select);
}
function select_item(select) {
	const select_parent = select.parentElement;
	const select_items = select_parent.querySelector('.select__item');
	const select_options = select.querySelectorAll('option');
	const select_selected_option = select.querySelector('option:checked');
	const select_selected_text = select_selected_option.text;
	const select_type = select.getAttribute('data-type');

	if (select_items) {
		select_items.remove();
	}

	let select_type_content = '';
	if (select_type == 'input') {
		select_type_content = '<div class="select__value icon-select-arrow"><input autocomplete="off" type="text" name="form[]" value="' + select_selected_text + '" data-error="Ошибка" data-value="' + select_selected_text + '" class="select__input"></div>';
	} else {
		select_type_content = '<div class="select__value icon-select-arrow"><span>' + select_selected_text + '</span></div>';
	}

	select_parent.insertAdjacentHTML('beforeend',
		'<div class="select__item">' +
		'<div class="select__title">' + select_type_content + '</div>' +
		'<div class="select__options">' + select_get_options(select_options) + '</div>' +
		'</div></div>');

	select_actions(select, select_parent);
}
function select_actions(original, select) {
	const select_item = select.querySelector('.select__item');
	const select_body_options = select.querySelector('.select__options');
	const select_options = select.querySelectorAll('.select__option');
	const select_type = original.getAttribute('data-type');
	const select_input = select.querySelector('.select__input');

	select_item.addEventListener('click', function () {
		let selects = document.querySelectorAll('.select');
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_body_options = select.querySelector('.select__options');
			if (select != select_item.closest('.select')) {
				select.classList.remove('_active');
				_slideUp(select_body_options, 100);
			}
		}
		_slideToggle(select_body_options, 100);
		select.classList.toggle('_active');
	});

	for (let index = 0; index < select_options.length; index++) {
		const select_option = select_options[index];
		const select_option_value = select_option.getAttribute('data-value');
		const select_option_text = select_option.innerHTML;

		if (select_type == 'input') {
			select_input.addEventListener('keyup', select_search);
		} else {
			if (select_option.getAttribute('data-value') == original.value) {
				select_option.style.display = 'none';
			}
		}
		select_option.addEventListener('click', function () {
			for (let index = 0; index < select_options.length; index++) {
				const el = select_options[index];
				el.style.display = 'block';
			}
			if (select_type == 'input') {
				select_input.value = select_option_text;
				original.value = select_option_value;
			} else {
				select.querySelector('.select__value').innerHTML = '<span>' + select_option_text + '</span>';
				original.value = select_option_value;
				select_option.style.display = 'none';

				let event = new Event("change", {bubbles: true}); 
				original.dispatchEvent(event);
			}
		});
	}
}
function select_get_options(select_options) {
	if (select_options) {
		let select_options_content = '';
		for (let index = 0; index < select_options.length; index++) {
			const select_option = select_options[index];
			const select_option_value = select_option.value;
			if (select_option_value != '') {
				const select_option_text = select_option.text;
				select_options_content = select_options_content + '<div data-value="' + select_option_value + '" class="select__option">' + select_option_text + '</div>';
			}
		}
		return select_options_content;
	}
}
function select_search(e) {
	let select_block = e.target.closest('.select ').querySelector('.select__options');
	let select_options = e.target.closest('.select ').querySelectorAll('.select__option');
	let select_search_text = e.target.value.toUpperCase();

	for (let i = 0; i < select_options.length; i++) {
		let select_option = select_options[i];
		let select_txt_value = select_option.textContent || select_option.innerText;
		if (select_txt_value.toUpperCase().indexOf(select_search_text) > -1) {
			select_option.style.display = "";
		} else {
			select_option.style.display = "none";
		}
	}
}
function selects_update_all() {
	let selects = document.querySelectorAll('select');
	if (selects) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			select_item(select);
		}
	}
}

//Placeholers



window.showValue = (id) => {
	let input = document.getElementById(id);
};
	function burgerHandler() {
    let burger = document.querySelector('.burger');
    if(burger) {
        let span1 = burger.querySelector('span:nth-child(1)');
        let span2 = burger.querySelector('span:nth-child(2)');
        let span3 = burger.querySelector('span:nth-child(3)');
        let span4 = burger.querySelector('span:nth-child(4)');

        return {
            el: burger,
            toggle() {
                span1.classList.toggle('first');
                span2.classList.toggle('second');
                span3.classList.toggle('third');
                span4.classList.toggle('fourth');
            },
            close() {
                span1.classList.remove('first');
                span2.classList.remove('second');
                span3.classList.remove('third');
                span4.classList.remove('fourth');
            },
            open() {
                span1.classList.add('first');
                span2.classList.add('second');
                span3.classList.add('third');
                span4.classList.add('fourth');
            }
        }
    }
};
	{
    let header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('is-scroll', window.pageYOffset > 50);
        })

        window.scroll({
            behavior: 'smooth',
        })


        let menu = document.querySelector('.menu');
        let burger = burgerHandler();


        burger.el.addEventListener('click', () => {
            const lockPaddingValue = window.innerWidth - document.querySelector('body').offsetWidth + 'px';
            if (!menu.classList.contains('open')) {
                menu.classList.add('open');
                header.classList.add('menu-open');
                document.body.classList.add('lock');
                document.body.style.paddingRight = lockPaddingValue;
                burger.open()
            } else {
                menu.classList.remove('open');
                header.classList.remove('menu-open');
                document.body.classList.remove('lock');
                burger.close();
                document.body.style.paddingRight = 0;
            }
        })

        document.addEventListener('keydown', (e) => {
            if (!e.repeat) {
                if (e.key === 'Escape') {
                    const lockPaddingValue = window.innerWidth - document.querySelector('body').offsetWidth + 'px';
                    menu.classList.remove('open');
                    header.classList.remove('menu-open');
                    document.body.classList.remove('lock');
                    burger.close();
                    document.body.style.paddingRight = 0;
                }
            }
        })

        // burger.el.addEventListener('keydown', (e) => {
        //     console.log('test');
        //     if (!e.repeat) {
        //         console.log(e.key);
        //         if (e.key === 'Enter') {
        //             console.log('etst');
        //             const lockPaddingValue = window.innerWidth - document.querySelector('body').offsetWidth + 'px';
        //             if (!menu.classList.contains('open')) {
        //                 menu.classList.add('open');
        //                 header.classList.add('menu-open');
        //                 document.body.classList.add('lock');
        //                 document.body.style.paddingRight = lockPaddingValue;
        //                 burger.open()
        //             } else {
        //                 // menu.classList.remove('open');
        //                 // header.classList.remove('menu-open');
        //                 // document.body.classList.remove('lock');
        //                 // burger.close();
        //                 // document.body.style.paddingRight = 0;
        //             }
        //         }
        //     }
        // })
    }
}
;
	{
    let newsTextAll = document.querySelectorAll('.news-list__text');
    if(newsTextAll.length) {
        newsTextAll.forEach(text => {
            if(text.closest('.big')) {
                trimString(text, 157);
            } else {
                trimString(text, 80);
            }
        })
    }

    let newsTitleAll = document.querySelectorAll('.news-list__title');
    if(newsTitleAll.length) {
        newsTitleAll.forEach(text => {
            if(text.closest('.big')) {
                trimString(text, 50);
            } else {
                trimString(text, 32);
            }
        })
    }
};
	{
    let hero = document.querySelector('.hero');
    if(hero) {
        let bg = hero.querySelector('.hero__bg img');
        let translateValue = 150;
        window.addEventListener('scroll', () => {
            let bottom = hero.getBoundingClientRect().bottom;
            if(!(bottom < 0)) {
                let percent = (hero.clientHeight - bottom) / hero.clientHeight * 100;
                bg.style.transform = `translateY(-${translateValue / 100 * percent}px)`;
            }
        })
    }
};
	let withDecorBoxAll = document.querySelectorAll('.with-decor');
if (withDecorBoxAll.length) {
    let allSvg = {
        "0": `
        <?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg class="svg-dec"
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:xlink="http://www.w3.org/1999/xlink"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   version="1.1"
   id="Ebene_1"
   x="0px"
   y="0px"
   viewBox="0 0 356.5 194.15292"
   xml:space="preserve"
   sodipodi:docname="wabe1.svg"
   width="356.5"
   height="194.15292"
   inkscape:version="1.0.2 (e86c870879, 2021-01-15, custom)"><metadata
   id="metadata3923"><rdf:RDF><cc:Work
       rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type
         rdf:resource="http://purl.org/dc/dcmitype/StillImage" /><dc:title></dc:title></cc:Work></rdf:RDF></metadata><defs
   id="defs3921" /><sodipodi:namedview
   pagecolor="#000000"
   bordercolor="#666666"
   borderopacity="1"
   objecttolerance="10"
   gridtolerance="10"
   guidetolerance="10"
   inkscape:pageopacity="0"
   inkscape:pageshadow="2"
   inkscape:window-width="2880"
   inkscape:window-height="1526"
   id="namedview3919"
   showgrid="false"
   inkscape:zoom="1.96875"
   inkscape:cx="148.8"
   inkscape:cy="73.752917"
   inkscape:window-x="-11"
   inkscape:window-y="1609"
   inkscape:window-maximized="1"
   inkscape:current-layer="Ebene_1" />
<style
   type="text/css"
   id="style2">
	.st0{fill:#000000;}
	.st1{fill:none;stroke:#000000;stroke-width:0.5032;stroke-miterlimit:10;}
	.st2{opacity:0.89;}
	.st3{clip-path:url(#SVGID_00000072992745908237930290000003600883026893786263_);}
	.st4{clip-path:url(#SVGID_00000160167714506765840250000012453453565857875120_);fill:#000000;}
	.st5{opacity:0.16;}
	.st6{clip-path:url(#SVGID_00000146476708079087093190000004173681415366469038_);}
	.st7{clip-path:url(#SVGID_00000138562933361540270720000006531822933578881702_);fill:#000000;}
	.st8{opacity:0.8;}
	.st9{clip-path:url(#SVGID_00000065036630786053480670000005282520946570567046_);}
	.st10{clip-path:url(#SVGID_00000127724572664678408780000000340521738120723590_);fill:#000000;}
	.st11{clip-path:url(#SVGID_00000084515477122339065750000008462154936519410057_);}
	.st12{clip-path:url(#SVGID_00000039110609684999228970000006849808178403089329_);fill:#000000;}
	.st13{clip-path:url(#SVGID_00000181787515173944694380000005222168029623489672_);}
	.st14{clip-path:url(#SVGID_00000150103826554388666650000002583215486114540714_);fill:#000000;}
	.st15{clip-path:url(#SVGID_00000150788394113900894010000010215283462654877875_);}
	.st16{clip-path:url(#SVGID_00000177478635694083120900000008266035374993198720_);fill:#000000;}
	.st17{clip-path:url(#SVGID_00000142174065212853950920000004542173445428662917_);}
	
		.st18{clip-path:url(#SVGID_00000107557469951301770230000012618823457980036030_);fill:none;stroke:#000000;stroke-width:0.5032;stroke-miterlimit:10;}
	.st19{opacity:0.48;}
	.st20{clip-path:url(#SVGID_00000029004309998400166910000000087787569502577314_);}
	.st21{clip-path:url(#SVGID_00000054228803618897539900000006298503179096275357_);fill:#000000;}
	.st22{opacity:0.68;}
	.st23{clip-path:url(#SVGID_00000031928197083581141870000002004110465372158344_);}
	.st24{clip-path:url(#SVGID_00000126323432323708583810000016241862537663955127_);fill:#000000;}
	.st25{clip-path:url(#SVGID_00000174595826131023798630000000648589816513391747_);}
	.st26{clip-path:url(#SVGID_00000018932932406603744220000013747742750310453160_);fill:#000000;}
	.st27{clip-path:url(#SVGID_00000080173298721249178080000014533545151099122601_);}
	.st28{clip-path:url(#SVGID_00000094602338056233019860000016113029030984583327_);fill:#000000;}
	.st29{clip-path:url(#SVGID_00000013874406617024006120000010210095644656933804_);}
	.st30{clip-path:url(#SVGID_00000141416608865644083540000011396931492309325479_);fill:#000000;}
	.st31{clip-path:url(#SVGID_00000059289905464190903590000005753903302199020211_);}
	.st32{clip-path:url(#SVGID_00000030452949395214149100000004276282854588173234_);fill:#000000;}
	.st33{clip-path:url(#SVGID_00000070803335149626977840000013009473107800635537_);}
	
		.st34{clip-path:url(#SVGID_00000149340573924813034860000004538472938865993608_);fill:none;stroke:#000000;stroke-width:0.5032;stroke-miterlimit:10;}
	.st35{clip-path:url(#SVGID_00000002374014689116379640000015913529220424752822_);}
	.st36{clip-path:url(#SVGID_00000098902382200557317830000006732438071526229420_);fill:#000000;}
	.st37{clip-path:url(#SVGID_00000091723169092377798140000000199712948699766459_);}
	.st38{clip-path:url(#SVGID_00000117650551843429101100000016125633119025665670_);fill:#000000;}
	.st39{clip-path:url(#SVGID_00000032623813051577082900000015883268567159736728_);}
	.st40{clip-path:url(#SVGID_00000138562924124481244830000001589855910284681379_);fill:#000000;}
	.st41{clip-path:url(#SVGID_00000078041675443345493920000013075396593619299261_);}
	.st42{clip-path:url(#SVGID_00000007427787800756414130000002854127386781769377_);fill:#000000;}
	.st43{clip-path:url(#SVGID_00000023987683752499943490000013925628891092903812_);}
	.st44{clip-path:url(#SVGID_00000134209383619815572220000008641132711065886092_);fill:#000000;}
	.st45{clip-path:url(#SVGID_00000033359780145551828700000011262459096625829769_);}
	.st46{clip-path:url(#SVGID_00000016769846366367188350000016599985583998738829_);fill:#000000;}
	.st47{clip-path:url(#SVGID_00000040563504858041362850000016861469028584225717_);}
	
		.st48{clip-path:url(#SVGID_00000061462566710956498330000000068425210357879168_);fill:none;stroke:#000000;stroke-width:0.5032;stroke-miterlimit:10;}
	.st49{clip-path:url(#SVGID_00000127035310624768830260000007131561361460817560_);}
	.st50{clip-path:url(#SVGID_00000047775384281076487110000013824109851461086371_);fill:#000000;}
	.st51{clip-path:url(#SVGID_00000041280163803235219280000009717460778013030804_);}
	.st52{clip-path:url(#SVGID_00000006698698239131012640000017454347542264629169_);fill:#000000;}
	.st53{clip-path:url(#SVGID_00000108271625311954028040000012092043559479816586_);}
	.st54{clip-path:url(#SVGID_00000079456035775450105850000009316742952350056608_);fill:#000000;}
	.st55{clip-path:url(#SVGID_00000121251272010508509650000002801510319865477299_);}
	
		.st56{clip-path:url(#SVGID_00000036215950898514975870000008938429941121561505_);fill:none;stroke:#000000;stroke-width:0.5032;stroke-miterlimit:10;}
	.st57{opacity:0.25;}
	.st58{clip-path:url(#SVGID_00000157292137457527277220000003371014564792995255_);}
	.st59{clip-path:url(#SVGID_00000038396148315710433980000008102535039163288504_);fill:#000000;}
	.st60{opacity:0.32;}
	.st61{clip-path:url(#SVGID_00000092422390862413541530000008081708198758221969_);}
	.st62{clip-path:url(#SVGID_00000074441070509713310110000011920977363345930928_);fill:#000000;}
	.st63{clip-path:url(#SVGID_00000150781496956334473950000018417295862770834860_);}
	
		.st64{clip-path:url(#SVGID_00000053542056468431756140000003515387802426334385_);fill:none;stroke:#000000;stroke-width:0.5032;stroke-miterlimit:10;}
	.st65{clip-path:url(#SVGID_00000034060076522855263940000012488392937578966171_);}
	.st66{clip-path:url(#SVGID_00000085210193708251297910000002751938001953964213_);fill:#000000;}
	.st67{clip-path:url(#SVGID_00000171716190509815120600000015386659198806149030_);}
	.st68{clip-path:url(#SVGID_00000172437448959612356260000009667412968725959083_);fill:#000000;}
	.st69{clip-path:url(#SVGID_00000018951118576779842360000006725393733758804905_);}
	.st70{clip-path:url(#SVGID_00000003794455800174413740000005469626791642416819_);fill:#000000;}
	.st71{clip-path:url(#SVGID_00000014593760112213686580000000211871970743586183_);}
	.st72{clip-path:url(#SVGID_00000138543880020511338160000000162895257653293716_);fill:#000000;}
	.st73{clip-path:url(#SVGID_00000122705323257084203560000012558019400431456938_);}
	
		.st74{clip-path:url(#SVGID_00000072972134764642451930000009947720745712291969_);fill:none;stroke:#000000;stroke-width:0.5032;stroke-miterlimit:10;}
	.st75{clip-path:url(#SVGID_00000097459313247183229150000003113355661509941681_);}
	.st76{clip-path:url(#SVGID_00000096772365084706808860000015413964487038795681_);fill:#000000;}
	.st77{clip-path:url(#SVGID_00000109739131571050918940000017591928146127465363_);}
	.st78{clip-path:url(#SVGID_00000046320875924901095040000017194733496488416929_);fill:#000000;}
	.st79{clip-path:url(#SVGID_00000177442365669227095540000004008946409068051589_);}
	.st80{clip-path:url(#SVGID_00000023960764100477789380000014611094435793884324_);fill:#000000;}
	.st81{clip-path:url(#SVGID_00000149346648033422210730000013778752531481264828_);}
	.st82{clip-path:url(#SVGID_00000117667481373763544900000017314107501700611475_);fill:#000000;}
	.st83{clip-path:url(#SVGID_00000012458066278734066160000017681812793349458622_);}
	.st84{clip-path:url(#SVGID_00000026876706283392580670000015796991808704264841_);fill:#000000;}
	.st85{clip-path:url(#SVGID_00000095340882404015201510000006891220686296740793_);}
	.st86{clip-path:url(#SVGID_00000034074524644442740920000009947239326844099468_);fill:#000000;}
	.st87{clip-path:url(#SVGID_00000182487598099069871830000005739959290343497348_);}
	
		.st88{clip-path:url(#SVGID_00000084526828908483610680000006725532859939977894_);fill:none;stroke:#000000;stroke-width:0.5032;stroke-miterlimit:10;}
	.st89{clip-path:url(#SVGID_00000067236208625798609700000006926879211290314641_);}
	.st90{clip-path:url(#SVGID_00000174579749967627788870000001484214881925272963_);fill:#000000;}
	.st91{clip-path:url(#SVGID_00000151508286758746349260000001014944921023630223_);}
	.st92{clip-path:url(#SVGID_00000048482001656349921470000010064911212109003162_);fill:#000000;}
	.st93{clip-path:url(#SVGID_00000094601667462569282750000014352466621263237801_);}
	.st94{clip-path:url(#SVGID_00000183942260751620733510000013923240064679687857_);fill:#000000;}
	.st95{clip-path:url(#SVGID_00000109018581517902317820000013173704898148566664_);}
	.st96{clip-path:url(#SVGID_00000093868612249490395100000014017657898232369822_);fill:#000000;}
	.st97{clip-path:url(#SVGID_00000030466226439107193160000010464321302691083142_);}
	.st98{clip-path:url(#SVGID_00000157296363527313173500000004810018160999973807_);fill:#000000;}
	.st99{clip-path:url(#SVGID_00000096038214455142164490000010981112677325549234_);}
	.st100{clip-path:url(#SVGID_00000119822830287871245090000014255321089856473263_);fill:#000000;}
	.st101{clip-path:url(#SVGID_00000148659768995353981140000008053593346244177053_);}
	.st102{clip-path:url(#SVGID_00000108267063886277081980000000134849322238586003_);fill:#000000;}
	.st103{clip-path:url(#SVGID_00000164474118254205196820000017630032033045929366_);}
	.st104{clip-path:url(#SVGID_00000127731045372872422910000012900203411595839621_);fill:#000000;}
	.st105{clip-path:url(#SVGID_00000114068373063056549200000015341070585908307900_);}
	
		.st106{clip-path:url(#SVGID_00000165192622858717283610000011511213376633219201_);fill:none;stroke:#000000;stroke-width:0.5032;stroke-miterlimit:10;}
	.st107{clip-path:url(#SVGID_00000002374741011462710850000000586048047011377552_);}
	.st108{clip-path:url(#SVGID_00000065043305432517548050000002503757316737899691_);fill:#000000;}
	.st109{clip-path:url(#SVGID_00000018938058433835923480000002255028741981564846_);}
	.st110{clip-path:url(#SVGID_00000183952367250429575060000009214746484039461020_);fill:#000000;}
	.st111{opacity:0.21;}
	.st112{clip-path:url(#SVGID_00000054257830875392220690000017612192459651432598_);}
	.st113{clip-path:url(#SVGID_00000178202947752771405180000006486695702805963173_);fill:#000000;}
	.st114{clip-path:url(#SVGID_00000037694268797203256730000004629678766486585743_);}
	.st115{clip-path:url(#SVGID_00000018925347244513509160000016778803029564196276_);fill:#000000;}
	.st116{clip-path:url(#SVGID_00000152979907740230668200000002927628597546888338_);}
	.st117{clip-path:url(#SVGID_00000154400229765533808690000016643579172593592501_);fill:#000000;}
	.st118{clip-path:url(#SVGID_00000181080749846362107640000001952042515711028411_);}
	.st119{clip-path:url(#SVGID_00000070812067070015772050000007593173023823903377_);fill:#000000;}
	.st120{opacity:0.18;}
	.st121{clip-path:url(#SVGID_00000004522209629229412440000004162149258811385218_);}
	
		.st122{clip-path:url(#SVGID_00000048466443044685496410000015994935343652744325_);fill:none;stroke:#000000;stroke-width:0.5032;stroke-miterlimit:10;}
	.st123{clip-path:url(#SVGID_00000030474267626979131660000006724422538840155807_);}
	.st124{clip-path:url(#SVGID_00000054960533733591056180000013094601271959910828_);fill:#000000;}
	.st125{clip-path:url(#SVGID_00000020395442977995663510000002699437043954188709_);}
	.st126{clip-path:url(#SVGID_00000033366848217644588830000011039593067609163658_);fill:#000000;}
	.st127{clip-path:url(#SVGID_00000157303544129353770230000016609163356386723755_);}
	.st128{clip-path:url(#SVGID_00000026868271575518584530000003886106127089898932_);fill:#000000;}
	.st129{clip-path:url(#SVGID_00000067938730135107563840000017280104665804463241_);}
	
		.st130{clip-path:url(#SVGID_00000078758781307819496380000010625654236606120347_);fill:none;stroke:#000000;stroke-width:0.5032;stroke-miterlimit:10;}
	.st131{clip-path:url(#SVGID_00000174601251396920839780000013287267395774026676_);}
	.st132{clip-path:url(#SVGID_00000156561945027054173160000011614245107752183950_);fill:#000000;}
	.st133{clip-path:url(#SVGID_00000042699239272685345800000003040109599335947171_);}
	.st134{clip-path:url(#SVGID_00000072973188598119103380000000637511641962770343_);fill:#000000;}
	.st135{clip-path:url(#SVGID_00000069379841892840428140000009232412731472166032_);}
	.st136{clip-path:url(#SVGID_00000034793078484597782700000006566660881861899932_);fill:#000000;}
	.st137{clip-path:url(#SVGID_00000011026693734722308900000010259509970523604375_);}
	.st138{clip-path:url(#SVGID_00000052793335945106794440000014230608117806675888_);fill:#000000;}
	.st139{clip-path:url(#SVGID_00000078024459329758001740000015125608033429109905_);}
	.st140{clip-path:url(#SVGID_00000176746284213635606070000007615757545816302736_);fill:#000000;}
	.st141{clip-path:url(#SVGID_00000034777037545040330750000001644355193263294391_);}
	.st142{clip-path:url(#SVGID_00000096755226274709466940000002022363636983651461_);fill:#000000;}
	.st143{clip-path:url(#SVGID_00000099641721905142802150000011716833683354874520_);}
	.st144{clip-path:url(#SVGID_00000016784830559597532500000002464190807599163296_);fill:#000000;}
	.st145{clip-path:url(#SVGID_00000147183880185577797870000001937361967463211652_);}
	.st146{clip-path:url(#SVGID_00000163767475518301094950000014794840016411022984_);fill:#000000;}
	.st147{clip-path:url(#SVGID_00000058591411068150669170000000669558501857482662_);}
	.st148{clip-path:url(#SVGID_00000102516649434028659680000000125920743298751366_);fill:#000000;}
	.st149{clip-path:url(#SVGID_00000130633886282628375630000011984826419173991098_);}
	.st150{clip-path:url(#SVGID_00000095317551039095428730000010759811867019529111_);fill:#000000;}
	.st151{clip-path:url(#SVGID_00000115491625411565845830000016343136573352189588_);}
	.st152{clip-path:url(#SVGID_00000165227583411022946350000004495710445639467905_);fill:#000000;}
	.st153{clip-path:url(#SVGID_00000040544064223202313380000005557165295777239997_);}
	
		.st154{clip-path:url(#SVGID_00000149379348684963709410000005123807902029516989_);fill:none;stroke:#000000;stroke-width:0.5032;stroke-miterlimit:10;}
	.st155{clip-path:url(#SVGID_00000026161777052709925020000016199713415405982593_);}
	.st156{clip-path:url(#SVGID_00000045617476147403618750000006697595026358776976_);fill:#000000;}
	.st157{clip-path:url(#SVGID_00000009549261166899813860000002907521741585824165_);}
	.st158{clip-path:url(#SVGID_00000106142342858579414420000006056711710945258143_);fill:#000000;}
	.st159{clip-path:url(#SVGID_00000096041955784763252690000017841414093215541175_);}
	.st160{clip-path:url(#SVGID_00000153694107141250041060000014937062300196860817_);fill:#000000;}
	.st161{clip-path:url(#SVGID_00000005269197400240307110000004097811948079990680_);}
	.st162{clip-path:url(#SVGID_00000131366216941287059320000014560935769187765666_);fill:#000000;}
	.st163{clip-path:url(#SVGID_00000044148543450515044760000017297670584746992532_);}
	.st164{clip-path:url(#SVGID_00000130630728799862132230000012151349830448060579_);fill:#000000;}
	.st165{clip-path:url(#SVGID_00000049221065006181700230000004265728689505084604_);}
	.st166{clip-path:url(#SVGID_00000016035942303173736520000002724961935413637799_);fill:#000000;}
	.st167{clip-path:url(#SVGID_00000075853089670129765790000005341269805495916982_);}
	
		.st168{clip-path:url(#SVGID_00000038409424121754748380000012853162252555561368_);fill:none;stroke:#000000;stroke-width:0.5032;stroke-miterlimit:10;}
	.st169{clip-path:url(#SVGID_00000045590822781505617070000010699336449846986654_);}
	.st170{clip-path:url(#SVGID_00000032606547163965035250000007532829195677636493_);fill:#000000;}
	.st171{clip-path:url(#SVGID_00000023270295612201675120000016421838906853062573_);}
	.st172{clip-path:url(#SVGID_00000093174386212921493370000013577695458926042781_);fill:#000000;}
	.st173{clip-path:url(#SVGID_00000154426923671514804800000013976008632526014903_);}
	.st174{clip-path:url(#SVGID_00000106144969740422896260000014794717305833509019_);fill:#000000;}
	.st175{clip-path:url(#SVGID_00000038406232087956775330000017020067077295035326_);}
	.st176{clip-path:url(#SVGID_00000018927706560184041460000010537539369100272564_);fill:#000000;}
	.st177{clip-path:url(#SVGID_00000149372880922114708550000009873770103077849491_);}
	.st178{clip-path:url(#SVGID_00000007419998606569357800000012248143051519395975_);fill:#000000;}
	.st179{clip-path:url(#SVGID_00000166656744295659916190000010608952894574437266_);}
	.st180{clip-path:url(#SVGID_00000011026527404750016470000008627641198268534928_);fill:#000000;}
	.st181{clip-path:url(#SVGID_00000076592011808707902890000015022025788400589463_);}
	
		.st182{clip-path:url(#SVGID_00000069360927484869294150000015040910645751263650_);fill:none;stroke:#000000;stroke-width:0.5032;stroke-miterlimit:10;}
	.st183{clip-path:url(#SVGID_00000019667525259502326920000009379318376247962539_);}
	.st184{clip-path:url(#SVGID_00000109020722590674504520000006370625212865149375_);fill:#000000;}
	.st185{clip-path:url(#SVGID_00000160183779866566966000000016024133698290151855_);}
	.st186{clip-path:url(#SVGID_00000049180088060025194630000011075357825824272023_);fill:#000000;}
	.st187{clip-path:url(#SVGID_00000123440434500276408240000014639790946966208168_);}
	.st188{clip-path:url(#SVGID_00000180358614106173253450000011811527143009173428_);fill:#000000;}
	.st189{clip-path:url(#SVGID_00000042695842806445160580000012037026414918529934_);}
	.st190{clip-path:url(#SVGID_00000138543691465644445380000002300002521114004117_);fill:#000000;}
	.st191{clip-path:url(#SVGID_00000031920128310635866420000013710124896382862214_);}
	.st192{clip-path:url(#SVGID_00000047021432245562260150000006679065476571238312_);fill:#000000;}
	.st193{clip-path:url(#SVGID_00000111185956356918582350000014717650624279882660_);}
	.st194{clip-path:url(#SVGID_00000028292632412735207290000016564274019730706334_);fill:#000000;}
	.st195{clip-path:url(#SVGID_00000101789095494728036800000011180053602449869731_);}
	
		.st196{clip-path:url(#SVGID_00000181073203297036672240000011726099280705366914_);fill:none;stroke:#000000;stroke-width:0.5032;stroke-miterlimit:10;}
	.st197{clip-path:url(#SVGID_00000108287276672283030090000005627730164348179899_);}
	.st198{clip-path:url(#SVGID_00000163760228308649214140000000993036110843554178_);fill:#000000;}
	.st199{clip-path:url(#SVGID_00000020362764828931626240000012695914071740309388_);}
	.st200{clip-path:url(#SVGID_00000052069622245162068060000017217351401144121761_);fill:#000000;}
	.st201{clip-path:url(#SVGID_00000043442752978425206330000007943849043199412668_);}
	.st202{clip-path:url(#SVGID_00000001643698722510835280000003621997454173566883_);fill:#000000;}
	.st203{clip-path:url(#SVGID_00000157268492106857000160000015352307501004190854_);}
	.st204{clip-path:url(#SVGID_00000169535039896788934420000018081797857557908109_);fill:#000000;}
	.st205{clip-path:url(#SVGID_00000016791428292862076430000012153553167205833881_);}
	
		.st206{clip-path:url(#SVGID_00000079445859249834045450000007852514536649408410_);fill:none;stroke:#000000;stroke-width:0.5032;stroke-miterlimit:10;}
	.st207{clip-path:url(#SVGID_00000082328542315738529290000002431281779305242780_);}
	.st208{clip-path:url(#SVGID_00000091734115467780722330000017886840961138271889_);fill:#000000;}
	.st209{clip-path:url(#SVGID_00000071545044384529454480000015571557740773015479_);}
	.st210{clip-path:url(#SVGID_00000033342544500759010330000017022817118772460165_);fill:#000000;}
	.st211{clip-path:url(#SVGID_00000151535591415873588330000004192942234154857914_);}
	.st212{clip-path:url(#SVGID_00000049902926713017180150000018030224348467845307_);fill:#000000;}
	.st213{clip-path:url(#SVGID_00000124140007399402299290000008243304422070058156_);}
	.st214{clip-path:url(#SVGID_00000167356020589490891670000002081941511288411564_);fill:#000000;}
	.st215{clip-path:url(#SVGID_00000144335980154623930440000015283712337716959909_);}
	.st216{clip-path:url(#SVGID_00000065763654395729542950000011511523781037148331_);fill:#000000;}
	.st217{clip-path:url(#SVGID_00000179604433841435709550000002936162465230333582_);}
	.st218{clip-path:url(#SVGID_00000169542897402837687700000017143638096159337866_);fill:#000000;}
	.st219{clip-path:url(#SVGID_00000088100163629433587870000004325720267422457247_);}
	.st220{clip-path:url(#SVGID_00000165948817639205715440000007049262252105380500_);fill:#000000;}
	.st221{clip-path:url(#SVGID_00000035491098800455825810000007740080696266603162_);}
	.st222{clip-path:url(#SVGID_00000026862097859717481300000006454526861342228389_);fill:#000000;}
	.st223{clip-path:url(#SVGID_00000065075730719256946680000015628166605477961895_);}
	.st224{clip-path:url(#SVGID_00000088095845702056436710000004588546728129800121_);fill:#000000;}
	.st225{clip-path:url(#SVGID_00000075856786395918590470000017810552046780104371_);}
	.st226{clip-path:url(#SVGID_00000091693511288520105940000012208394216832604821_);fill:#000000;}
	.st227{clip-path:url(#SVGID_00000060027283379480230400000001437901785244602287_);}
	.st228{clip-path:url(#SVGID_00000148649638331080501920000009838302318160868225_);fill:#000000;}
	.st229{clip-path:url(#SVGID_00000031905668273643789640000011047818157219390856_);}
	
		.st230{clip-path:url(#SVGID_00000048463543030540603250000013385310445885797788_);fill:none;stroke:#000000;stroke-width:0.5032;stroke-miterlimit:10;}
	.st231{clip-path:url(#SVGID_00000008134157972344102760000009302639641744014006_);}
	.st232{clip-path:url(#SVGID_00000052090427860084598510000010174617925855544962_);fill:#000000;}
	.st233{clip-path:url(#SVGID_00000011024878306544164210000000511138642927982472_);}
	.st234{clip-path:url(#SVGID_00000139265644639247275760000011163199042139581085_);fill:#000000;}
	.st235{clip-path:url(#SVGID_00000049188265831911317010000009750192078598331313_);}
	.st236{clip-path:url(#SVGID_00000008836968185969141590000003167727911720238246_);fill:#000000;}
	.st237{clip-path:url(#SVGID_00000135670803321285414200000012110547932448440717_);}
	.st238{clip-path:url(#SVGID_00000163067315463649252130000001195817478791378825_);fill:#000000;}
	.st239{clip-path:url(#SVGID_00000050652637606770198190000006973350849231090096_);}
	
		.st240{clip-path:url(#SVGID_00000109002310308431726600000000325043705490258592_);fill:none;stroke:#000000;stroke-width:0.5032;stroke-miterlimit:10;}
	.st241{clip-path:url(#SVGID_00000081622763763330387300000018257323392011227801_);}
	.st242{clip-path:url(#SVGID_00000082335953057321670410000012761100249215996080_);fill:#000000;}
	.st243{clip-path:url(#SVGID_00000178206071584045251260000018063459548804274050_);}
	.st244{clip-path:url(#SVGID_00000005972236070691666530000001887117233751807621_);fill:#000000;}
	.st245{clip-path:url(#SVGID_00000109722501425801882920000018163671184795069849_);}
	.st246{clip-path:url(#SVGID_00000170269283406157414460000010911715676335473585_);fill:#000000;}
	.st247{clip-path:url(#SVGID_00000049223901881765801250000007476224242080421819_);}
	.st248{clip-path:url(#SVGID_00000098215484772934823290000002908750224204804485_);fill:#000000;}
	.st249{clip-path:url(#SVGID_00000080907046257661454700000009822172352929662349_);}
	.st250{clip-path:url(#SVGID_00000035510247344048118700000017263274050727626640_);fill:#000000;}
	.st251{clip-path:url(#SVGID_00000083050403549994883230000001623949147906831258_);}
	.st252{clip-path:url(#SVGID_00000178902541024368170750000002741038677820916865_);fill:#000000;}
	.st253{clip-path:url(#SVGID_00000070810403789382274450000016740686095198022031_);}
	.st254{clip-path:url(#SVGID_00000067931209480440276400000011346648227538353315_);fill:#000000;}
	.st255{clip-path:url(#SVGID_00000060730229378789638540000012472951543597694136_);}
	.st256{clip-path:url(#SVGID_00000182521981182657726870000001022721445292606082_);fill:#000000;}
	.st257{clip-path:url(#SVGID_00000022523113767248801560000007383942368962880917_);}
	
		.st258{clip-path:url(#SVGID_00000143610485695378338030000017973092728719225023_);fill:none;stroke:#000000;stroke-width:0.5032;stroke-miterlimit:10;}
	.st259{clip-path:url(#SVGID_00000076587762460365314020000018087949882570743183_);}
	.st260{clip-path:url(#SVGID_00000001658015281161796690000000587009178224837293_);fill:#000000;}
	.st261{clip-path:url(#SVGID_00000006681816762648886070000011213113607769813660_);}
	.st262{clip-path:url(#SVGID_00000067196412845460318740000000168163508445551512_);fill:#000000;}
	.st263{clip-path:url(#SVGID_00000016050732647530911920000012852826043191506310_);}
	.st264{clip-path:url(#SVGID_00000027570191651977765970000009037420678243404197_);fill:#000000;}
	.st265{clip-path:url(#SVGID_00000181783739219072380280000000585342937245175982_);}
	.st266{clip-path:url(#SVGID_00000075136232236072648750000006342466547575841179_);fill:#000000;}
	.st267{clip-path:url(#SVGID_00000179614236331720047480000001081713610563729033_);}
	.st268{clip-path:url(#SVGID_00000166639647585570718860000004320453721566347669_);fill:#000000;}
	.st269{clip-path:url(#SVGID_00000183946538897632029890000008543332833018093503_);}
	
		.st270{clip-path:url(#SVGID_00000029023373330276290340000011089335756795941514_);fill:none;stroke:#000000;stroke-width:0.5032;stroke-miterlimit:10;}
	.st271{clip-path:url(#SVGID_00000145775321596130595050000007194832646845575844_);}
	.st272{clip-path:url(#SVGID_00000012472558844986793600000002515088495755246501_);fill:#000000;}
	.st273{clip-path:url(#SVGID_00000018935876460179938000000000562297600192863645_);}
	.st274{clip-path:url(#SVGID_00000042728769505076633920000014055399754509455541_);fill:#000000;}
	.st275{clip-path:url(#SVGID_00000108277134983047441660000013701112922927375250_);}
	.st276{clip-path:url(#SVGID_00000123429306563491189060000004841499707171087248_);fill:#000000;}
	.st277{clip-path:url(#SVGID_00000173125699060918268370000016801670970918974113_);}
	.st278{clip-path:url(#SVGID_00000183217157403186554250000012287747365698484657_);fill:#000000;}
	.st279{clip-path:url(#SVGID_00000128464008686635625700000001591661294920912560_);}
	
		.st280{clip-path:url(#SVGID_00000018226269487104995710000016992394620154772378_);fill:none;stroke:#000000;stroke-width:0.5032;stroke-miterlimit:10;}
	.st281{clip-path:url(#SVGID_00000026151914690961626270000007549368087054811052_);}
	.st282{clip-path:url(#SVGID_00000056415793920261570840000013829217876163884972_);fill:#000000;}
	.st283{clip-path:url(#SVGID_00000116915793871436588700000006656480828023549067_);}
	.st284{clip-path:url(#SVGID_00000152262219444435539390000012309909555220427148_);fill:#000000;}
	.st285{clip-path:url(#SVGID_00000085227741502279750030000003465116961263775883_);}
	
		.st286{clip-path:url(#SVGID_00000136370725803374290270000014409067859767244714_);fill:none;stroke:#000000;stroke-width:0.5032;stroke-miterlimit:10;}
	.st287{clip-path:url(#SVGID_00000074419338321918934380000001184073444363650993_);}
	.st288{clip-path:url(#SVGID_00000065791869755744494340000003746278400544580236_);fill:#000000;}
	.st289{clip-path:url(#SVGID_00000174561950434646655620000012712353089509443720_);}
	.st290{clip-path:url(#SVGID_00000072257575512646421310000008904712634905041057_);fill:#000000;}
	.st291{clip-path:url(#SVGID_00000005233177245763357780000018205833199168136874_);}
	.st292{clip-path:url(#SVGID_00000015320438866189937310000005194253920327032484_);fill:#000000;}
	.st293{clip-path:url(#SVGID_00000004520919015326099520000015233198066277966753_);}
	.st294{clip-path:url(#SVGID_00000155144939764301199840000015772003932084944012_);fill:#000000;}
	.st295{fill:none;}
</style>
<path
   class="st0"
   d="m 157.2,19.952917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path4" />
<path
   class="st0"
   d="m 168.3,19.852917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path6" />
<polygon
   class="st1"
   points="257.6,192.6 263.1,202.2 274.2,202.1 279.7,192.5 274.1,182.9 263.1,182.9 "
   id="polygon8"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 173.8,29.452917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path10" />
<path
   class="st0"
   d="m 184.9,29.452917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path12" />
<path
   class="st0"
   d="m 168.2,19.852917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0.1 1.3,0.6 1.3,1.3"
   id="path14" />
<path
   class="st0"
   d="m 190.4,19.852917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path16" />
<polygon
   class="st1"
   points="274.2,202.1 279.8,211.8 290.8,211.7 296.3,202.1 290.7,192.5 279.7,192.5 "
   id="polygon18"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 190.4,19.852917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path20" />
<path
   class="st0"
   d="m 201.5,19.752917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path22" />
<path
   class="st0"
   d="m 190.5,39.052917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path24" />
<path
   class="st0"
   d="m 201.5,39.052917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path26" />
<path
   class="st0"
   d="m 184.9,29.452917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path28" />
<path
   class="st0"
   d="m 207,29.452917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path30" />
<polygon
   class="st1"
   points="290.8,211.7 296.4,221.3 307.4,221.3 312.9,211.7 307.4,202 296.3,202.1 "
   id="polygon32"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 207,29.452917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path34" />
<path
   class="st0"
   d="m 218.1,29.352917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path36" />
<path
   class="st0"
   d="m 207.1,48.652917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path38" />
<path
   class="st0"
   d="m 218.2,48.652917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path40" />
<path
   class="st0"
   d="m 201.5,39.052917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path42" />
<path
   class="st0"
   d="m 223.7,39.052917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path44" />
<polygon
   class="st1"
   points="307.5,221.3 313,230.9 324.1,230.9 329.6,221.2 324,211.6 313,211.7 "
   id="polygon46"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 223.7,38.952917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path48" />
<path
   class="st0"
   d="m 234.7,38.952917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path50" />
<path
   class="st0"
   d="m 223.7,58.252917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path52" />
<path
   class="st0"
   d="m 234.8,58.252917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path54" />
<path
   class="st0"
   d="m 218.1,48.652917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path56" />
<path
   class="st0"
   d="m 240.3,48.552917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path58" />
<polygon
   class="st1"
   points="324.1,230.9 329.7,240.5 340.7,240.5 346.2,230.8 340.7,221.2 329.6,221.3 "
   id="polygon60"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 240.3,48.552917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path62" />
<path
   class="st0"
   d="m 251.4,48.552917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path64" />
<path
   class="st0"
   d="m 240.4,67.852917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path66" />
<path
   class="st0"
   d="m 251.4,67.752917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0.1 1.3,0.6 1.3,1.3"
   id="path68" />
<path
   class="st0"
   d="m 234.8,58.252917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path70" />
<path
   class="st0"
   d="m 256.9,58.152917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0.1 1.3,0.6 1.3,1.3"
   id="path72" />
<polygon
   class="st1"
   points="340.8,240.5 346.3,250.1 357.4,250.1 362.9,240.4 357.3,230.8 346.2,230.8 "
   id="polygon74"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 256.9,58.152917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path76" />
<path
   class="st0"
   d="m 268,58.152917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path78" />
<path
   class="st0"
   d="m 257,77.452917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path80" />
<path
   class="st0"
   d="m 268.1,77.352917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path82" />
<path
   class="st0"
   d="m 251.4,67.852917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path84" />
<path
   class="st0"
   d="m 273.6,67.752917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path86" />
<polygon
   class="st1"
   points="357.4,250.1 362.9,259.7 374,259.6 379.5,250 373.9,240.4 362.9,240.4 "
   id="polygon88"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 273.6,67.752917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path90" />
<path
   class="st0"
   d="m 284.7,67.752917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.2,0.6 1.3,1.3"
   id="path92" />
<path
   class="st0"
   d="m 273.6,87.052917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path94" />
<path
   class="st0"
   d="m 284.7,86.952917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path96" />
<path
   class="st0"
   d="m 268.1,77.352917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path98" />
<path
   class="st0"
   d="m 290.2,77.352917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path100" />
<polygon
   class="st1"
   points="374,259.7 379.6,269.3 390.6,269.2 396.1,259.6 390.6,250 379.5,250 "
   id="polygon102"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 290.2,77.352917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path104" />
<path
   class="st0"
   d="m 301.3,77.352917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.5 1.3,1.3"
   id="path106" />
<path
   class="st0"
   d="m 290.3,96.552917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path108" />
<path
   class="st0"
   d="m 301.4,96.552917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path110" />
<path
   class="st0"
   d="m 284.7,86.952917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path112" />
<path
   class="st0"
   d="m 306.8,86.952917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path114" />
<polygon
   class="st1"
   points="390.7,269.2 396.2,278.9 407.3,278.8 412.8,269.2 407.2,259.6 396.2,259.6 "
   id="polygon116"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 306.9,86.952917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path118" />
<path
   class="st0"
   d="m 317.9,86.852917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0.1 1.3,0.6 1.3,1.3"
   id="path120" />
<path
   class="st0"
   d="m 306.9,106.15292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path122" />
<path
   class="st0"
   d="m 301.3,96.552917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path124" />
<polygon
   class="st1"
   points="407.3,278.8 412.9,288.4 423.9,288.4 429.4,278.8 423.8,269.1 412.8,269.2 "
   id="polygon126"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 140.6,29.552917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0.1 1.3,0.6 1.3,1.3"
   id="path128" />
<path
   class="st0"
   d="m 151.7,29.552917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path130" />
<path
   class="st0"
   d="m 135,19.952917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0.1 1.3,0.6 1.3,1.3"
   id="path132" />
<path
   class="st0"
   d="m 157.2,19.952917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path134" />
<polygon
   class="st1"
   points="241,202.2 246.6,211.8 257.6,211.8 263.1,202.2 257.6,192.6 246.5,192.6 "
   id="polygon136"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 157.2,19.952917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path138" />
<path
   class="st0"
   d="m 168.3,19.852917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path140" />
<path
   class="st0"
   d="m 157.3,39.152917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path142" />
<path
   class="st0"
   d="m 168.3,39.152917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path144" />
<path
   class="st0"
   d="m 151.7,29.552917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path146" />
<path
   class="st0"
   d="m 173.8,29.552917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path148" />
<polygon
   class="st1"
   points="257.7,211.8 263.2,221.4 274.3,221.4 279.8,211.7 274.2,202.1 263.1,202.2 "
   id="polygon150"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 173.8,29.552917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path152" />
<path
   class="st0"
   d="m 184.9,29.452917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path154" />
<path
   class="st0"
   d="m 173.9,48.752917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path156" />
<path
   class="st0"
   d="m 185,48.752917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path158" />
<path
   class="st0"
   d="m 168.3,39.152917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path160" />
<path
   class="st0"
   d="m 190.5,39.152917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path162" />
<polygon
   class="st1"
   points="274.3,221.4 279.9,231 290.9,231 296.4,221.3 290.8,211.7 279.8,211.8 "
   id="polygon164"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 190.5,39.052917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path166" />
<path
   class="st0"
   d="m 201.6,39.052917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path168" />
<path
   class="st0"
   d="m 190.5,58.352917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path170" />
<path
   class="st0"
   d="m 201.6,58.352917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path172" />
<path
   class="st0"
   d="m 185,48.752917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path174" />
<path
   class="st0"
   d="m 207.1,48.652917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path176" />
<polygon
   class="st1"
   points="290.9,231 296.5,240.6 307.5,240.6 313,230.9 307.5,221.3 296.4,221.4 "
   id="polygon178"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 207.1,48.652917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path180" />
<path
   class="st0"
   d="m 218.2,48.652917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path182" />
<path
   class="st0"
   d="m 207.2,67.952917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path184" />
<path
   class="st0"
   d="m 218.3,67.852917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path186" />
<path
   class="st0"
   d="m 201.6,58.352917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path188" />
<path
   class="st0"
   d="m 223.7,58.252917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0.1 1.3,0.6 1.3,1.3"
   id="path190" />
<polygon
   class="st1"
   points="307.6,240.6 313.1,250.2 324.2,250.2 329.7,240.5 324.1,230.9 313.1,230.9 "
   id="polygon192"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 223.8,58.252917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path194" />
<path
   class="st0"
   d="m 234.8,58.252917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path196" />
<path
   class="st0"
   d="m 223.8,77.552917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path198" />
<path
   class="st0"
   d="m 234.9,77.452917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path200" />
<path
   class="st0"
   d="m 218.2,67.952917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path202" />
<path
   class="st0"
   d="m 240.4,67.852917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path204" />
<polygon
   class="st1"
   points="324.2,250.2 329.8,259.8 340.8,259.7 346.3,250.1 340.7,240.5 329.7,240.5 "
   id="polygon206"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 240.4,67.852917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path208" />
<path
   class="st0"
   d="m 251.5,67.852917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path210" />
<path
   class="st0"
   d="m 240.5,87.052917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path212" />
<path
   class="st0"
   d="m 251.5,87.052917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path214" />
<path
   class="st0"
   d="m 234.9,77.452917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path216" />
<path
   class="st0"
   d="m 257,77.452917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path218" />
<polygon
   class="st1"
   points="340.8,259.8 346.4,269.4 357.5,269.3 362.9,259.7 357.4,250.1 346.3,250.1 "
   id="polygon220"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 257,77.452917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path222" />
<path
   class="st0"
   d="m 268.1,77.352917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path224" />
<path
   class="st0"
   d="m 257.1,96.652917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path226" />
<path
   class="st0"
   d="m 268.2,96.652917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path228" />
<path
   class="st0"
   d="m 251.5,87.052917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path230" />
<path
   class="st0"
   d="m 273.7,87.052917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path232" />
<polygon
   class="st1"
   points="357.5,269.3 363,278.9 374.1,278.9 379.6,269.3 374,259.7 363,259.7 "
   id="polygon234"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 273.7,87.052917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path236" />
<path
   class="st0"
   d="m 284.7,86.952917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0.1 1.3,0.6 1.3,1.3"
   id="path238" />
<path
   class="st0"
   d="m 273.7,106.25292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path240" />
<path
   class="st0"
   d="m 284.8,106.25292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path242" />
<path
   class="st0"
   d="m 268.2,96.652917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.2,0.6 1.3,1.3"
   id="path244" />
<path
   class="st0"
   d="m 290.3,96.652917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path246" />
<polygon
   class="st1"
   points="374.1,278.9 379.7,288.5 390.7,288.5 396.2,278.8 390.7,269.2 379.6,269.3 "
   id="polygon248"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 290.3,96.652917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path250" />
<path
   class="st0"
   d="m 301.4,96.552917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path252" />
<path
   class="st0"
   d="m 290.4,115.85292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path254" />
<path
   class="st0"
   d="m 301.4,115.85292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path256" />
<path
   class="st0"
   d="m 284.8,106.25292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path258" />
<path
   class="st0"
   d="m 306.9,106.25292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path260" />
<polygon
   class="st1"
   points="390.8,288.5 396.3,298.1 407.4,298.1 412.9,288.4 407.3,278.8 396.2,278.9 "
   id="polygon262"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 306.9,106.15292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0.1 1.3,0.6 1.3,1.3"
   id="path264" />
<path
   class="st0"
   d="m 301.4,115.85292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path266" />
<polygon
   class="st1"
   points="407.4,298.1 413,307.7 424,307.7 429.5,298 423.9,288.4 412.9,288.4 "
   id="polygon268"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 124,20.052917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path270" />
<path
   class="st0"
   d="m 135.1,19.952917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path272" />
<path
   class="st0"
   d="m 124.1,39.252917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path274" />
<path
   class="st0"
   d="m 135.1,39.252917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path276" />
<path
   class="st0"
   d="m 118.5,29.652917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path278" />
<path
   class="st0"
   d="m 140.6,29.652917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path280" />
<polygon
   class="st1"
   points="224.4,211.9 230,221.5 241.1,221.5 246.5,211.9 241,202.2 229.9,202.3 "
   id="polygon282"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 140.6,29.652917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path284" />
<path
   class="st0"
   d="m 151.7,29.552917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path286" />
<path
   class="st0"
   d="m 140.7,48.852917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path288" />
<path
   class="st0"
   d="m 151.8,48.852917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path290" />
<path
   class="st0"
   d="m 135.1,39.252917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path292" />
<path
   class="st0"
   d="m 157.3,39.252917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path294" />
<polygon
   class="st1"
   points="241.1,221.5 246.6,231.1 257.7,231.1 263.2,221.4 257.6,211.8 246.6,211.9 "
   id="polygon296"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 157.3,39.152917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path298" />
<path
   class="st0"
   d="m 168.3,39.152917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path300" />
<path
   class="st0"
   d="m 157.3,58.452917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path302" />
<path
   class="st0"
   d="m 168.4,58.452917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path304" />
<path
   class="st0"
   d="m 151.8,48.852917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.2,0.6 1.3,1.3"
   id="path306" />
<path
   class="st0"
   d="m 173.9,48.752917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path308" />
<polygon
   class="st1"
   points="257.7,231.1 263.3,240.7 274.3,240.7 279.8,231 274.3,221.4 263.2,221.5 "
   id="polygon310"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 173.9,48.752917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path312" />
<path
   class="st0"
   d="m 185,48.752917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path314" />
<path
   class="st0"
   d="m 174,68.052917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path316" />
<path
   class="st0"
   d="m 185,67.952917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0.1 1.3,0.6 1.3,1.3"
   id="path318" />
<path
   class="st0"
   d="m 168.4,58.452917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path320" />
<path
   class="st0"
   d="m 190.5,58.352917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0.1 1.3,0.6 1.3,1.3"
   id="path322" />
<polygon
   class="st1"
   points="274.4,240.7 279.9,250.3 291,250.3 296.5,240.6 290.9,231 279.8,231 "
   id="polygon324"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 190.5,58.352917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path326" />
<path
   class="st0"
   d="m 201.6,58.352917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path328" />
<path
   class="st0"
   d="m 190.6,77.652917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path330" />
<path
   class="st0"
   d="m 201.7,77.552917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path332" />
<path
   class="st0"
   d="m 185,68.052917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path334" />
<path
   class="st0"
   d="m 207.2,67.952917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path336" />
<polygon
   class="st1"
   points="291,250.3 296.6,259.9 307.6,259.8 313.1,250.2 307.5,240.6 296.5,240.6 "
   id="polygon338"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 207.2,67.952917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path340" />
<path
   class="st0"
   d="m 218.3,67.952917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path342" />
<path
   class="st0"
   d="m 207.3,87.252917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.2,0.6 1.3,1.3"
   id="path344" />
<path
   class="st0"
   d="m 218.3,87.152917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path346" />
<path
   class="st0"
   d="m 201.7,77.552917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path348" />
<path
   class="st0"
   d="m 223.8,77.552917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path350" />
<polygon
   class="st1"
   points="307.6,259.9 313.2,269.5 324.2,269.4 329.7,259.8 324.2,250.2 313.1,250.2 "
   id="polygon352"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 223.8,77.552917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path354" />
<path
   class="st0"
   d="m 234.9,77.452917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path356" />
<path
   class="st0"
   d="m 223.9,96.752917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path358" />
<path
   class="st0"
   d="m 235,96.752917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path360" />
<path
   class="st0"
   d="m 218.3,87.152917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path362" />
<path
   class="st0"
   d="m 240.4,87.152917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path364" />
<polygon
   class="st1"
   points="324.3,269.4 329.8,279 340.9,279 346.4,269.4 340.8,259.8 329.8,259.8 "
   id="polygon366"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 240.5,87.152917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path368" />
<path
   class="st0"
   d="m 251.5,87.052917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0.1 1.3,0.6 1.3,1.3"
   id="path370" />
<path
   class="st0"
   d="m 240.5,106.35292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0.1 1.3,0.6 1.3,1.3"
   id="path372" />
<path
   class="st0"
   d="m 251.6,106.35292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path374" />
<path
   class="st0"
   d="m 234.9,96.752917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path376" />
<path
   class="st0"
   d="m 257.1,96.752917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path378" />
<polygon
   class="st1"
   points="340.9,279 346.5,288.6 357.5,288.6 363,278.9 357.4,269.3 346.4,269.4 "
   id="polygon380"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 257.1,96.752917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path382" />
<path
   class="st0"
   d="m 268.2,96.652917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path384" />
<path
   class="st0"
   d="m 257.2,115.95292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path386" />
<path
   class="st0"
   d="m 268.2,115.95292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path388" />
<path
   class="st0"
   d="m 251.6,106.35292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path390" />
<path
   class="st0"
   d="m 273.7,106.35292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path392" />
<polygon
   class="st1"
   points="357.5,288.6 363.1,298.2 374.2,298.2 379.6,288.5 374.1,278.9 363,279 "
   id="polygon394"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 273.7,106.25292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0.1 1.3,0.6 1.3,1.3"
   id="path396" />
<path
   class="st0"
   d="m 284.8,106.25292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path398" />
<path
   class="st0"
   d="m 273.8,125.55292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path400" />
<path
   class="st0"
   d="m 268.2,115.95292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path402" />
<path
   class="st0"
   d="m 290.4,115.85292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path404" />
<path
   class="st0"
   d="m 290.4,115.85292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path406" />
<path
   class="st0"
   d="m 301.4,115.85292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path408" />
<path
   class="st0"
   d="m 323.5,115.95292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path410" />
<path
   class="st0"
   d="m 306.9,125.65292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path412" />
<path
   class="st0"
   d="m 301.6,135.25292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path414" />
<path
   class="st0"
   d="m 318.2,164.05292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path416" />
<path
   class="st0"
   d="m 318,125.55292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0.1 1.3,0.6 1.3,1.3"
   id="path418" />
<path
   class="st0"
   d="m 307.1,144.75292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path420" />
<path
   class="st0"
   d="m 290.5,154.45292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path422" />
<path
   class="st0"
   d="m 301.6,154.35292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path424" />
<path
   class="st0"
   d="m 323.7,173.35292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path426" />
<path
   class="st0"
   d="m 307.1,183.05292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path428" />
<path
   class="st0"
   d="m 318.2,182.95292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path430" />
<path
   class="st0"
   d="m 290.4,135.15292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path432" />
<path
   class="st0"
   d="m 124.1,39.252917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path434" />
<path
   class="st0"
   d="m 135.2,39.252917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path436" />
<path
   class="st0"
   d="m 124.2,58.552917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path438" />
<path
   class="st0"
   d="m 135.2,58.552917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.5 1.3,1.3"
   id="path440" />
<path
   class="st0"
   d="m 118.6,48.952917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path442" />
<path
   class="st0"
   d="m 140.7,48.852917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path444" />
<polygon
   class="st1"
   points="224.5,231.2 230.1,240.8 241.1,240.8 246.6,231.1 241.1,221.5 230,221.5 "
   id="polygon446"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 140.7,48.852917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0.1 1.3,0.6 1.3,1.3"
   id="path448" />
<path
   class="st0"
   d="m 151.8,48.852917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path450" />
<path
   class="st0"
   d="m 140.8,68.152917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path452" />
<path
   class="st0"
   d="m 151.9,68.052917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path454" />
<path
   class="st0"
   d="m 135.2,58.552917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path456" />
<path
   class="st0"
   d="m 157.4,58.452917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.2,0.6 1.3,1.3"
   id="path458" />
<polygon
   class="st1"
   points="241.2,240.8 246.7,250.4 257.8,250.3 263.3,240.7 257.7,231.1 246.7,231.1 "
   id="polygon460"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 157.4,58.452917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path462" />
<path
   class="st0"
   d="m 168.4,58.452917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path464" />
<path
   class="st0"
   d="m 157.4,77.752917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path466" />
<path
   class="st0"
   d="m 168.5,77.652917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path468" />
<path
   class="st0"
   d="m 151.8,68.152917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path470" />
<path
   class="st0"
   d="m 174,68.052917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path472" />
<polygon
   class="st1"
   points="257.8,250.4 263.4,260 274.4,259.9 279.9,250.3 274.4,240.7 263.3,240.7 "
   id="polygon474"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 174,68.052917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path476" />
<path
   class="st0"
   d="m 185.1,68.052917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path478" />
<path
   class="st0"
   d="m 174.1,87.252917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path480" />
<path
   class="st0"
   d="m 185.1,87.252917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path482" />
<path
   class="st0"
   d="m 168.5,77.652917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path484" />
<path
   class="st0"
   d="m 190.6,77.652917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path486" />
<polygon
   class="st1"
   points="274.5,260 280,269.6 291.1,269.5 296.5,259.9 291,250.3 279.9,250.3 "
   id="polygon488"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 190.6,77.652917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path490" />
<path
   class="st0"
   d="m 201.7,77.552917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path492" />
<path
   class="st0"
   d="m 190.7,96.852917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path494" />
<path
   class="st0"
   d="m 201.8,96.852917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path496" />
<path
   class="st0"
   d="m 185.1,87.252917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path498" />
<path
   class="st0"
   d="m 207.3,87.252917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path500" />
<polygon
   class="st1"
   points="291.1,269.5 296.6,279.1 307.7,279.1 313.2,269.5 307.6,259.9 296.6,259.9 "
   id="polygon502"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 207.3,87.252917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path504" />
<path
   class="st0"
   d="m 218.3,87.152917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0.1 1.3,0.6 1.3,1.3"
   id="path506" />
<path
   class="st0"
   d="m 207.3,106.45292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path508" />
<path
   class="st0"
   d="m 218.4,106.45292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path510" />
<path
   class="st0"
   d="m 201.8,96.852917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path512" />
<path
   class="st0"
   d="m 223.9,96.852917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path514" />
<polygon
   class="st1"
   points="307.7,279.1 313.3,288.7 324.3,288.7 329.8,279 324.3,269.4 313.2,269.5 "
   id="polygon516"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 223.9,96.852917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.5 1.3,1.3"
   id="path518" />
<path
   class="st0"
   d="m 235,96.752917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path520" />
<path
   class="st0"
   d="m 224,116.05292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path522" />
<path
   class="st0"
   d="m 235.1,116.05292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path524" />
<path
   class="st0"
   d="m 218.4,106.45292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path526" />
<path
   class="st0"
   d="m 240.5,106.45292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path528" />
<polygon
   class="st1"
   points="324.4,288.7 329.9,298.3 341,298.3 346.5,288.6 340.9,279 329.9,279.1 "
   id="polygon530"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 240.6,106.35292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.2,0.6 1.3,1.3"
   id="path532" />
<path
   class="st0"
   d="m 251.6,106.35292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path534" />
<path
   class="st0"
   d="m 240.6,125.65292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path536" />
<path
   class="st0"
   d="m 251.7,125.55292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path538" />
<path
   class="st0"
   d="m 235,116.05292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path540" />
<path
   class="st0"
   d="m 257.2,115.95292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path542" />
<polygon
   class="st1"
   points="341,298.3 346.6,307.9 357.6,307.9 363.1,298.2 357.5,288.6 346.5,288.6 "
   id="polygon544"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 257.2,115.95292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path546" />
<path
   class="st0"
   d="m 268.3,115.95292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path548" />
<path
   class="st0"
   d="m 257.3,135.25292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path550" />
<path
   class="st0"
   d="m 268.3,135.15292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0.1 1.3,0.6 1.3,1.3"
   id="path552" />
<path
   class="st0"
   d="m 251.7,125.65292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path554" />
<path
   class="st0"
   d="m 273.8,125.55292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path556" />
<polygon
   class="st1"
   points="357.6,307.9 363.2,317.5 374.2,317.4 379.7,307.8 374.2,298.2 363.1,298.2 "
   id="polygon558"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 273.8,125.55292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path560" />
<path
   class="st0"
   d="m 273.9,144.85292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path562" />
<path
   class="st0"
   d="m 285,144.75292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path564" />
<path
   class="st0"
   d="m 268.3,135.25292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path566" />
<path
   class="st0"
   d="m 290.5,135.15292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.2,0.6 1.3,1.3"
   id="path568" />
<path
   class="st0"
   d="m 290.5,135.15292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path570" />
<path
   class="st0"
   d="m 284.9,144.75292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0.1 1.3,0.6 1.3,1.3"
   id="path572" />
<polygon
   class="st1"
   points="390.9,327 396.5,336.7 407.5,336.6 413,327 407.5,317.4 396.4,317.4 "
   id="polygon574"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 118.6,48.952917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path576" />
<g
   class="st2"
   id="g596"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g594">
		<defs
   id="defs579">
			<rect
   id="SVGID_1_"
   x="212.3"
   y="229.89999"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000042706039551638121840000013698658133326929578_">
			<use
   xlink:href="#SVGID_1_"
   style="overflow:visible"
   id="use581"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000042706039551638121840000013698658133326929578_)"
   id="g592">
			<defs
   id="defs585">
				<rect
   id="SVGID_00000026131293792358130980000001419678415118058891_"
   x="212.3"
   y="229.89999"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000111166239303241588170000010855206545044816046_">
				<use
   xlink:href="#SVGID_00000026131293792358130980000001419678415118058891_"
   style="overflow:visible"
   id="use587"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 214.8,231.2 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000111166239303241588170000010855206545044816046_)"
   id="path590" />
		</g>
	</g>
</g>
<path
   class="st0"
   d="m 118.7,68.152917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path598" />
<path
   class="st0"
   d="m 124.1,58.552917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0.1 1.3,0.6 1.3,1.3"
   id="path600" />
<path
   class="st0"
   d="m 124.2,58.552917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.2,0.6 1.3,1.3"
   id="path602" />
<path
   class="st0"
   d="m 135.2,58.552917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path604" />
<path
   class="st0"
   d="m 135.3,77.752917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path606" />
<path
   class="st0"
   d="m 118.6,68.252917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path608" />
<path
   class="st0"
   d="m 140.8,68.152917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path610" />
<polygon
   class="st1"
   points="224.6,250.5 230.2,260.1 241.2,260 246.7,250.4 241.1,240.8 230.1,240.8 "
   id="polygon612"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 140.8,68.152917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path614" />
<path
   class="st0"
   d="m 151.9,68.152917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path616" />
<path
   class="st0"
   d="m 151.9,87.352917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path618" />
<path
   class="st0"
   d="m 135.3,77.752917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path620" />
<path
   class="st0"
   d="m 157.4,77.752917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path622" />
<polygon
   class="st1"
   points="241.2,260.1 246.8,269.7 257.8,269.6 263.3,260 257.8,250.4 246.7,250.4 "
   id="polygon624"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 157.4,77.752917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path626" />
<path
   class="st0"
   d="m 168.5,77.652917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path628" />
<path
   class="st0"
   d="m 168.6,96.952917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path630" />
<path
   class="st0"
   d="m 151.9,87.352917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path632" />
<path
   class="st0"
   d="m 174.1,87.352917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path634" />
<polygon
   class="st1"
   points="257.9,269.6 263.4,279.2 274.5,279.2 280,269.6 274.4,260 263.4,260 "
   id="polygon636"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 174.1,87.352917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path638" />
<path
   class="st0"
   d="m 185.1,87.252917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0.1 1.3,0.6 1.3,1.3"
   id="path640" />
<path
   class="st0"
   d="m 185.2,106.55292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path642" />
<path
   class="st0"
   d="m 168.5,96.952917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path644" />
<path
   class="st0"
   d="m 190.7,96.952917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path646" />
<polygon
   class="st1"
   points="274.5,279.2 280.1,288.8 291.1,288.8 296.6,279.1 291.1,269.5 280,269.6 "
   id="polygon648"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 190.7,96.952917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path650" />
<path
   class="st0"
   d="m 201.8,96.852917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path652" />
<path
   class="st0"
   d="m 201.8,116.15292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path654" />
<path
   class="st0"
   d="m 185.2,106.55292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path656" />
<path
   class="st0"
   d="m 207.3,106.55292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path658" />
<polygon
   class="st1"
   points="291.2,288.8 296.7,298.4 307.8,298.4 313.3,288.7 307.7,279.1 296.6,279.2 "
   id="polygon660"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 207.3,106.45292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0.1 1.3,0.6 1.3,1.3"
   id="path662" />
<path
   class="st0"
   d="m 218.4,106.45292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path664" />
<path
   class="st0"
   d="m 218.5,125.75292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.5 1.3,1.3"
   id="path666" />
<path
   class="st0"
   d="m 201.8,116.15292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path668" />
<path
   class="st0"
   d="m 224,116.05292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path670" />
<polygon
   class="st1"
   points="307.8,298.4 313.3,308 324.4,308 329.9,298.3 324.3,288.7 313.3,288.7 "
   id="polygon672"
   transform="translate(-107.2,-182.24708)" />
<polygon
   class="st1"
   points="274.6,298.5 280.1,308.1 291.2,308 296.7,298.4 291.1,288.8 280.1,288.8 "
   id="polygon674"
   transform="translate(-107.2,-182.24708)" />
<polygon
   class="st1"
   points="291.2,308.1 296.8,317.7 307.8,317.6 313.3,308 307.8,298.4 296.7,298.4 "
   id="polygon676"
   transform="translate(-107.2,-182.24708)" />
<polygon
   class="st1"
   points="258,308.1 263.5,317.7 274.6,317.7 280.1,308 274.5,298.4 263.4,298.5 "
   id="polygon678"
   transform="translate(-107.2,-182.24708)" />
<polygon
   class="st1"
   points="307.9,317.7 313.4,327.3 324.5,327.2 330,317.6 324.4,308 313.4,308 "
   id="polygon680"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 224,116.05292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path682" />
<path
   class="st0"
   d="m 235,116.05292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path684" />
<path
   class="st0"
   d="m 235.1,135.25292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path686" />
<path
   class="st0"
   d="m 218.5,125.75292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path688" />
<path
   class="st0"
   d="m 240.6,125.65292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path690" />
<polygon
   class="st1"
   points="324.4,308 330,317.6 341,317.5 346.5,307.9 341,298.3 329.9,298.3 "
   id="polygon692"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 240.6,125.65292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path694" />
<path
   class="st0"
   d="m 240.6,144.85292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path696" />
<path
   class="st0"
   d="m 251.7,125.65292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path698" />
<path
   class="st0"
   d="m 251.8,144.85292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path700" />
<path
   class="st0"
   d="m 235.1,135.35292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path702" />
<path
   class="st0"
   d="m 257.2,135.25292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path704" />
<polygon
   class="st1"
   points="341.1,317.6 346.6,327.2 357.7,327.1 363.2,317.5 357.6,307.9 346.6,307.9 "
   id="polygon706"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 257.3,135.25292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.2,0.6 1.3,1.3"
   id="path708" />
<path
   class="st0"
   d="m 257.3,154.35292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.2,0.6 1.3,1.3"
   id="path710" />
<path
   class="st0"
   d="m 268.3,135.25292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path712" />
<path
   class="st0"
   d="m 268.4,154.45292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path714" />
<path
   class="st0"
   d="m 251.7,144.85292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0.1 1.3,0.6 1.3,1.3"
   id="path716" />
<path
   class="st0"
   d="m 273.9,144.85292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path718" />
<polygon
   class="st1"
   points="357.7,327.2 363.3,336.8 374.3,336.7 379.8,327.1 374.2,317.5 363.2,317.5 "
   id="polygon720"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 273.9,144.85292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path722" />
<path
   class="st0"
   d="m 285,144.75292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path724" />
<path
   class="st0"
   d="m 285,164.05292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path726" />
<path
   class="st0"
   d="m 274,183.25292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path728" />
<path
   class="st0"
   d="m 274,163.95292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path730" />
<path
   class="st0"
   d="m 268.5,173.65292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path732" />
<path
   class="st0"
   d="m 268.4,154.45292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path734" />
<polygon
   class="st1"
   points="374.3,336.7 379.9,346.3 390.9,346.3 396.4,336.7 390.9,327.1 379.8,327.1 "
   id="polygon736"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 118.7,68.252917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path738" />
<path
   class="st0"
   d="m 118.7,87.552917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path740" />
<g
   class="st5"
   id="g760"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g758">
		<defs
   id="defs743">
			<rect
   id="SVGID_00000182491927769426340440000017410178929008230079_"
   x="223.39999"
   y="287.79999"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000087383144218873832470000001978534981417448833_">
			<use
   xlink:href="#SVGID_00000182491927769426340440000017410178929008230079_"
   style="overflow:visible"
   id="use745"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000087383144218873832470000001978534981417448833_)"
   id="g756">
			<defs
   id="defs749">
				<rect
   id="SVGID_00000165219693564614085660000007260408905669620635_"
   x="223.39999"
   y="287.79999"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000127760081106831623780000004557240668202735020_">
				<use
   xlink:href="#SVGID_00000165219693564614085660000007260408905669620635_"
   style="overflow:visible"
   id="use751"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 225.9,289.1 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.5 1.3,1.3"
   clip-path="url(#SVGID_00000127760081106831623780000004557240668202735020_)"
   id="path754" />
		</g>
	</g>
</g>
<path
   class="st0"
   d="m 135.3,77.752917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path762" />
<path
   class="st0"
   d="m 152,87.352917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path764" />
<path
   class="st0"
   d="m 140.8,87.352917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0.1 1.3,0.6 1.3,1.3"
   id="path766" />
<path
   class="st0"
   d="m 168.6,96.952917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path768" />
<path
   class="st0"
   d="m 157.4,96.952917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path770" />
<path
   class="st0"
   d="m 185.2,106.55292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path772" />
<path
   class="st0"
   d="m 290,19.552917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path774" />
<path
   class="st0"
   d="m 301,19.552917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path776" />
<polygon
   class="st1"
   points="390.3,192.2 395.9,201.8 406.9,201.8 412.4,192.1 406.9,182.5 395.8,182.6 "
   id="polygon778"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 306.6,29.152917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path780" />
<path
   class="st0"
   d="m 317.7,29.052917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path782" />
<path
   class="st0"
   d="m 301,19.552917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path784" />
<path
   class="st0"
   d="m 323.2,19.452917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path786" />
<polygon
   class="st1"
   points="407,201.8 412.5,211.4 423.6,211.4 429.1,201.7 423.5,192.1 412.5,192.1 "
   id="polygon788"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 323.2,19.452917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path790" />
<path
   class="st0"
   d="m 334.2,19.452917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path792" />
<path
   class="st0"
   d="m 323.2,38.752917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path794" />
<path
   class="st0"
   d="m 334.3,38.652917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path796" />
<path
   class="st0"
   d="m 317.6,29.152917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path798" />
<path
   class="st0"
   d="m 339.8,29.052917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path800" />
<polygon
   class="st1"
   points="423.6,211.4 429.2,221 440.2,220.9 445.7,211.3 440.2,201.7 429.1,201.7 "
   id="polygon802"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 339.8,29.052917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path804" />
<path
   class="st0"
   d="m 339.9,48.352917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path806" />
<path
   class="st0"
   d="m 334.3,38.752917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.5 1.3,1.3"
   id="path808" />
<polygon
   class="st1"
   points="440.3,221 445.8,230.6 456.9,230.5 462.4,220.9 456.8,211.3 445.7,211.3 "
   id="polygon810"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 256.8,19.652917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path812" />
<path
   class="st0"
   d="m 267.8,19.652917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path814" />
<polygon
   class="st1"
   points="357.2,192.3 362.7,201.9 373.8,201.9 379.3,192.2 373.7,182.6 362.6,182.7 "
   id="polygon816"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 273.4,29.252917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path818" />
<path
   class="st0"
   d="m 284.5,29.152917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path820" />
<path
   class="st0"
   d="m 267.8,19.652917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path822" />
<path
   class="st0"
   d="m 290,19.552917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path824" />
<polygon
   class="st1"
   points="373.8,201.9 379.4,211.5 390.4,211.5 395.9,201.8 390.3,192.2 379.3,192.2 "
   id="polygon826"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 290,19.552917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path828" />
<path
   class="st0"
   d="m 301.1,19.552917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path830" />
<path
   class="st0"
   d="m 290.1,38.852917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.2,0.6 1.3,1.3"
   id="path832" />
<path
   class="st0"
   d="m 301.1,38.752917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0.1 1.3,0.6 1.3,1.3"
   id="path834" />
<path
   class="st0"
   d="m 284.5,29.252917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path836" />
<path
   class="st0"
   d="m 306.6,29.152917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path838" />
<polygon
   class="st1"
   points="390.4,211.5 396,221.1 407,221 412.5,211.4 407,201.8 395.9,201.8 "
   id="polygon840"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 306.6,29.152917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path842" />
<path
   class="st0"
   d="m 317.7,29.152917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path844" />
<path
   class="st0"
   d="m 306.7,48.452917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path846" />
<path
   class="st0"
   d="m 317.8,48.352917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path848" />
<path
   class="st0"
   d="m 301.1,38.752917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path850" />
<path
   class="st0"
   d="m 323.2,38.752917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path852" />
<polygon
   class="st1"
   points="407.1,221.1 412.6,230.7 423.7,230.6 429.2,221 423.6,211.4 412.6,211.4 "
   id="polygon854"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 323.3,38.752917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path856" />
<path
   class="st0"
   d="m 334.3,38.652917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0.1 1.3,0.6 1.3,1.3"
   id="path858" />
<path
   class="st0"
   d="m 351,29.152917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path860" />
<path
   class="st0"
   d="m 356.5,38.752917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0.1 1.3,0.6 1.3,1.3"
   id="path862" />
<path
   class="st0"
   d="m 351.1,48.452917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.2,0.6 1.3,1.3"
   id="path864" />
<path
   class="st0"
   d="m 351.2,67.552917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path866" />
<path
   class="st0"
   d="m 334.2,77.152917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path868" />
<path
   class="st0"
   d="m 323.5,77.452917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path870" />
<path
   class="st0"
   d="m 318.1,106.25292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.2,0.6 1.3,1.3"
   id="path872" />
<path
   class="st0"
   d="m 356.4,58.052917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path874" />
<path
   class="st0"
   d="m 323.3,96.552917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path876" />
<path
   class="st0"
   d="m 323.3,57.952917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0.1 1.3,0.6 1.3,1.3"
   id="path878" />
<path
   class="st0"
   d="m 334.4,57.952917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path880" />
<path
   class="st0"
   d="m 317.7,48.352917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0.1 1.3,0.6 1.3,1.3"
   id="path882" />
<path
   class="st0"
   d="m 339.9,48.352917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path884" />
<polygon
   class="st1"
   points="423.7,230.6 429.3,240.2 440.3,240.2 445.8,230.6 440.2,221 429.2,221 "
   id="polygon886"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 339.9,48.352917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path888" />
<path
   class="st0"
   d="m 340,67.552917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path890" />
<path
   class="st0"
   d="m 334.4,57.952917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path892" />
<polygon
   class="st1"
   points="440.3,240.2 445.9,249.8 457,249.8 462.4,240.1 456.9,230.5 445.8,230.6 "
   id="polygon894"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 251.3,29.252917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path896" />
<path
   class="st0"
   d="m 256.8,19.652917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path898" />
<polygon
   class="st1"
   points="340.6,202 346.1,211.6 357.2,211.6 362.7,201.9 357.1,192.3 346.1,192.3 "
   id="polygon900"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 256.8,19.652917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path902" />
<path
   class="st0"
   d="m 234.6,19.752917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0.1 1.3,0.6 1.3,1.3"
   id="path904" />
<path
   class="st0"
   d="m 240.2,29.452917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path906" />
<path
   class="st0"
   d="m 267.8,19.652917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path908" />
<path
   class="st0"
   d="m 256.8,38.952917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path910" />
<path
   class="st0"
   d="m 267.9,38.852917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path912" />
<path
   class="st0"
   d="m 251.3,29.352917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.2,0.6 1.3,1.3"
   id="path914" />
<path
   class="st0"
   d="m 273.4,29.252917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path916" />
<polygon
   class="st1"
   points="357.2,211.6 362.8,221.2 373.8,221.1 379.3,211.5 373.8,201.9 362.7,201.9 "
   id="polygon918"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 273.4,29.252917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path920" />
<path
   class="st0"
   d="m 284.5,29.252917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path922" />
<path
   class="st0"
   d="m 273.5,48.552917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path924" />
<path
   class="st0"
   d="m 284.5,48.452917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path926" />
<path
   class="st0"
   d="m 267.9,38.952917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.5 1.3,1.3"
   id="path928" />
<path
   class="st0"
   d="m 290,38.852917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path930" />
<polygon
   class="st1"
   points="373.9,221.2 379.4,230.8 390.5,230.7 396,221.1 390.4,211.5 379.4,211.5 "
   id="polygon932"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 290,38.852917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path934" />
<path
   class="st0"
   d="m 301.1,38.852917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.5 1.3,1.3"
   id="path936" />
<path
   class="st0"
   d="m 290.1,58.052917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path938" />
<path
   class="st0"
   d="m 301.2,58.052917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path940" />
<path
   class="st0"
   d="m 284.5,48.452917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0.1 1.3,0.6 1.3,1.3"
   id="path942" />
<path
   class="st0"
   d="m 306.7,48.452917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path944" />
<polygon
   class="st1"
   points="390.5,230.7 396.1,240.4 407.1,240.3 412.6,230.7 407,221.1 396,221.1 "
   id="polygon946"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 306.7,48.452917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path948" />
<path
   class="st0"
   d="m 317.8,48.352917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path950" />
<path
   class="st0"
   d="m 306.8,67.652917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.2,0.6 1.3,1.3"
   id="path952" />
<path
   class="st0"
   d="m 317.8,67.652917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path954" />
<path
   class="st0"
   d="m 301.2,58.052917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path956" />
<path
   class="st0"
   d="m 323.3,58.052917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path958" />
<polygon
   class="st1"
   points="407.1,240.3 412.7,249.9 423.7,249.9 429.2,240.3 423.7,230.6 412.6,230.7 "
   id="polygon960"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 323.3,58.052917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path962" />
<path
   class="st0"
   d="m 334.4,57.952917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path964" />
<path
   class="st0"
   d="m 317.8,67.652917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path966" />
<path
   class="st0"
   d="m 339.9,67.652917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path968" />
<polygon
   class="st1"
   points="423.8,249.9 429.3,259.5 440.4,259.5 445.9,249.8 440.3,240.2 429.3,240.3 "
   id="polygon970"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 340,67.552917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path972" />
<path
   class="st0"
   d="m 251.3,29.352917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path974" />
<path
   class="st0"
   d="m 251.4,48.552917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path976" />
<path
   class="st0"
   d="m 256.9,38.952917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path978" />
<polygon
   class="st1"
   points="340.7,221.3 346.2,230.9 357.3,230.8 362.8,221.2 357.2,211.6 346.2,211.6 "
   id="polygon980"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 256.9,38.952917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path982" />
<path
   class="st0"
   d="m 267.9,38.852917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0.1 1.3,0.6 1.3,1.3"
   id="path984" />
<path
   class="st0"
   d="m 256.9,58.152917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0.1 1.3,0.6 1.3,1.3"
   id="path986" />
<path
   class="st0"
   d="m 268,58.152917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path988" />
<path
   class="st0"
   d="m 251.3,48.552917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0.1 1.3,0.6 1.3,1.3"
   id="path990" />
<path
   class="st0"
   d="m 273.5,48.552917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path992" />
<polygon
   class="st1"
   points="357.3,230.8 362.9,240.4 373.9,240.4 379.4,230.8 373.9,221.2 362.8,221.2 "
   id="polygon994"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 273.5,48.552917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path996" />
<path
   class="st0"
   d="m 284.6,48.452917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path998" />
<path
   class="st0"
   d="m 273.6,67.752917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path1000" />
<path
   class="st0"
   d="m 284.6,67.752917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path1002" />
<path
   class="st0"
   d="m 268,58.152917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path1004" />
<path
   class="st0"
   d="m 290.1,58.152917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path1006" />
<polygon
   class="st1"
   points="374,240.4 379.5,250 390.6,250 396.1,240.3 390.5,230.7 379.4,230.8 "
   id="polygon1008"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 290.1,58.152917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path1010" />
<path
   class="st0"
   d="m 301.2,58.052917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path1012" />
<path
   class="st0"
   d="m 284.6,67.752917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path1014" />
<path
   class="st0"
   d="m 306.8,67.752917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path1016" />
<polygon
   class="st1"
   points="390.6,250 396.1,259.6 407.2,259.6 412.7,249.9 407.1,240.3 396.1,240.4 "
   id="polygon1018"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 306.8,67.652917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path1020" />
<path
   class="st0"
   d="m 317.8,67.652917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path1022" />
<polygon
   class="st1"
   points="407.2,259.6 412.8,269.2 423.8,269.2 429.3,259.5 423.8,249.9 412.7,249.9 "
   id="polygon1024"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 251.4,48.552917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path1026" />
<path
   class="st0"
   d="m 256.9,58.252917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path1028" />
<path
   class="st0"
   d="m 256.9,58.252917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path1030" />
<path
   class="st0"
   d="m 268,58.152917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path1032" />
<path
   class="st0"
   d="m 273.6,67.852917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path1034" />
<path
   class="st0"
   d="m 273.6,67.752917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path1036" />
<path
   class="st0"
   d="m 284.6,67.752917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path1038" />
<path
   class="st0"
   d="m 201.9,116.15292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path1040" />
<path
   class="st0"
   d="m 218.5,125.75292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path1042" />
<path
   class="st0"
   d="m 207.3,125.75292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path1044" />
<path
   class="st0"
   d="m 201.8,135.35292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0.1 1.3,0.6 1.3,1.3"
   id="path1046" />
<path
   class="st0"
   d="m 223.8,135.35292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path1048" />
<path
   class="st0"
   d="m 207.4,144.85292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path1050" />
<path
   class="st0"
   d="m 218.5,144.95292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path1052" />
<path
   class="st0"
   d="m 174.2,106.55292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path1054" />
<path
   class="st0"
   d="m 168.7,116.15292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path1056" />
<path
   class="st0"
   d="m 190.5,116.15292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0.1 1.3,0.6 1.3,1.3"
   id="path1058" />
<path
   class="st0"
   d="m 157.6,135.35292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path1060" />
<path
   class="st0"
   d="m 185.3,125.75292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path1062" />
<path
   class="st0"
   d="m 157.6,116.25292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path1064" />
<path
   class="st0"
   d="m 152.1,125.85292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0.1 1.3,0.6 1.3,1.3"
   id="path1066" />
<path
   class="st0"
   d="m 174,125.85292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path1068" />
<path
   class="st0"
   d="m 168.8,135.45292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path1070" />
<path
   class="st0"
   d="m 190.8,135.45292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path1072" />
<path
   class="st0"
   d="m 235.1,135.35292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.5 1.3,1.3"
   id="path1074" />
<path
   class="st0"
   d="m 251.8,144.85292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path1076" />
<path
   class="st0"
   d="m 268.4,154.45292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path1078" />
<path
   class="st0"
   d="m 307.2,163.95292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.2,0.6 1.3,1.3"
   id="path1080" />
<path
   class="st0"
   d="m 290.6,173.55292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path1082" />
<path
   class="st0"
   d="m 301.7,173.55292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path1084" />
<path
   class="st0"
   d="m 307.2,163.95292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path1086" />
<path
   class="st0"
   d="m 307.2,163.95292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path1088" />
<path
   class="st0"
   d="m 301.7,173.55292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path1090" />
<polygon
   class="st1"
   points="407.6,355.8 413.2,365.4 424.2,365.4 429.7,355.8 424.2,346.1 413.1,346.2 "
   id="polygon1092"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 285.1,183.25292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path1094" />
<path
   class="st0"
   d="m 290.6,173.65292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path1096" />
<polygon
   class="st1"
   points="374.4,355.9 380,365.5 391,365.5 396.5,355.9 391,346.2 379.9,346.3 "
   id="polygon1098"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 290.6,173.65292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path1100" />
<path
   class="st0"
   d="m 301.7,173.55292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   id="path1102" />
<path
   class="st0"
   d="m 290.6,192.85292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path1104" />
<path
   class="st0"
   d="m 301.7,192.85292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path1106" />
<path
   class="st0"
   d="m 285.1,183.25292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path1108" />
<polygon
   class="st1"
   points="391.1,365.5 396.6,375.1 407.7,375.1 413.2,365.4 407.6,355.8 396.5,355.9 "
   id="polygon1110"
   transform="translate(-107.2,-182.24708)" />
<path
   class="st0"
   d="m 285.1,183.25292 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   id="path1112" />
<g
   class="st8"
   id="g1132"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g1130">
		<defs
   id="defs1115">
			<rect
   id="SVGID_00000082337697569478858810000007616394395910378911_"
   x="195.60001"
   y="239.7"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000134221835002134240210000011458964343720451237_">
			<use
   xlink:href="#SVGID_00000082337697569478858810000007616394395910378911_"
   style="overflow:visible"
   id="use1117"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000134221835002134240210000011458964343720451237_)"
   id="g1128">
			<defs
   id="defs1121">
				<rect
   id="SVGID_00000173865019864026046400000003749503941875177631_"
   x="195.60001"
   y="239.7"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000013176352428742629310000010694583623817598630_">
				<use
   xlink:href="#SVGID_00000173865019864026046400000003749503941875177631_"
   style="overflow:visible"
   id="use1123"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 198.2,241 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000013176352428742629310000010694583623817598630_)"
   id="path1126" />
		</g>
	</g>
</g>
<g
   class="st2"
   id="g1152"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g1150">
		<defs
   id="defs1135">
			<rect
   id="SVGID_00000047027853211157817100000004892187729155274655_"
   x="206.7"
   y="239.7"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000033338167915468641510000003488449046096678054_">
			<use
   xlink:href="#SVGID_00000047027853211157817100000004892187729155274655_"
   style="overflow:visible"
   id="use1137"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000033338167915468641510000003488449046096678054_)"
   id="g1148">
			<defs
   id="defs1141">
				<rect
   id="SVGID_00000023281027860171843270000007696027073443763387_"
   x="206.7"
   y="239.7"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000146471649875364515920000006789650752813176203_">
				<use
   xlink:href="#SVGID_00000023281027860171843270000007696027073443763387_"
   style="overflow:visible"
   id="use1143"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 209.3,241 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.2,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000146471649875364515920000006789650752813176203_)"
   id="path1146" />
		</g>
	</g>
</g>
<g
   class="st2"
   id="g1172"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g1170">
		<defs
   id="defs1155">
			<rect
   id="SVGID_00000098196745658334139780000017139518869964772764_"
   x="212.3"
   y="249.3"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000021822162208127142210000000456698777990211256_">
			<use
   xlink:href="#SVGID_00000098196745658334139780000017139518869964772764_"
   style="overflow:visible"
   id="use1157"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000021822162208127142210000000456698777990211256_)"
   id="g1168">
			<defs
   id="defs1161">
				<rect
   id="SVGID_00000024720075141080588690000007971360223885686155_"
   x="212.3"
   y="249.3"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000078734745690979592300000012270637179424865684_">
				<use
   xlink:href="#SVGID_00000024720075141080588690000007971360223885686155_"
   style="overflow:visible"
   id="use1163"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 214.8,250.6 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000078734745690979592300000012270637179424865684_)"
   id="path1166" />
		</g>
	</g>
</g>
<g
   class="st2"
   id="g1192"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g1190">
		<defs
   id="defs1175">
			<rect
   id="SVGID_00000069393738426318141880000015926616715851506357_"
   x="206.7"
   y="239.7"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000132782476425542105170000006221387975678684832_">
			<use
   xlink:href="#SVGID_00000069393738426318141880000015926616715851506357_"
   style="overflow:visible"
   id="use1177"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000132782476425542105170000006221387975678684832_)"
   id="g1188">
			<defs
   id="defs1181">
				<rect
   id="SVGID_00000059268231625740564900000011267366583661286789_"
   x="206.7"
   y="239.7"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000029004986372929200860000006596270371602892698_">
				<use
   xlink:href="#SVGID_00000059268231625740564900000011267366583661286789_"
   style="overflow:visible"
   id="use1183"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 209.2,241 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000029004986372929200860000006596270371602892698_)"
   id="path1186" />
		</g>
	</g>
</g>
<g
   class="st2"
   id="g1212"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g1210">
		<defs
   id="defs1195">
			<rect
   id="SVGID_00000129180553500835239270000010181145413119553154_"
   x="207.60001"
   y="231"
   width="22.799999"
   height="19.9" />
		</defs>
		<clipPath
   id="SVGID_00000121959866280245997100000007277716350974250415_">
			<use
   xlink:href="#SVGID_00000129180553500835239270000010181145413119553154_"
   style="overflow:visible"
   id="use1197"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000121959866280245997100000007277716350974250415_)"
   id="g1208">
			<defs
   id="defs1201">
				<rect
   id="SVGID_00000166663493361373642550000015951729384792282017_"
   x="207.60001"
   y="231"
   width="22.799999"
   height="19.9" />
			</defs>
			<clipPath
   id="SVGID_00000112615954681118836000000011087009646043037315_">
				<use
   xlink:href="#SVGID_00000166663493361373642550000015951729384792282017_"
   style="overflow:visible"
   id="use1203"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			
				<polygon
   style="fill:none;stroke:#000000;stroke-width:0.5032;stroke-miterlimit:10"
   points="208,241 213.6,250.6 224.6,250.6 230.1,240.9 224.5,231.3 213.5,231.3 "
   clip-path="url(#SVGID_00000112615954681118836000000011087009646043037315_)"
   id="polygon1206" />
		</g>
	</g>
</g>
<g
   class="st19"
   id="g1232"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g1230">
		<defs
   id="defs1215">
			<rect
   id="SVGID_00000146481273972381690500000015597678744766958980_"
   x="162.5"
   y="239.8"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000134967749921313809220000007956793939279057038_">
			<use
   xlink:href="#SVGID_00000146481273972381690500000015597678744766958980_"
   style="overflow:visible"
   id="use1217"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000134967749921313809220000007956793939279057038_)"
   id="g1228">
			<defs
   id="defs1221">
				<rect
   id="SVGID_00000078759867000500490700000003454183897313707686_"
   x="162.5"
   y="239.8"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000054247974244094162870000005165746181896114617_">
				<use
   xlink:href="#SVGID_00000078759867000500490700000003454183897313707686_"
   style="overflow:visible"
   id="use1223"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 165,241.1 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000054247974244094162870000005165746181896114617_)"
   id="path1226" />
		</g>
	</g>
</g>
<g
   class="st22"
   id="g1252"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g1250">
		<defs
   id="defs1235">
			<rect
   id="SVGID_00000182522684327039700950000013666105369556331153_"
   x="173.5"
   y="239.8"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000108282408905068543250000014443913588319913640_">
			<use
   xlink:href="#SVGID_00000182522684327039700950000013666105369556331153_"
   style="overflow:visible"
   id="use1237"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000108282408905068543250000014443913588319913640_)"
   id="g1248">
			<defs
   id="defs1241">
				<rect
   id="SVGID_00000024685897718961499500000004416000923994938766_"
   x="173.5"
   y="239.8"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000143610222047447908190000008101250245861286587_">
				<use
   xlink:href="#SVGID_00000024685897718961499500000004416000923994938766_"
   style="overflow:visible"
   id="use1243"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 176.1,241.1 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000143610222047447908190000008101250245861286587_)"
   id="path1246" />
		</g>
	</g>
</g>
<g
   class="st22"
   id="g1272"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g1270">
		<defs
   id="defs1255">
			<rect
   id="SVGID_00000154407293877038307510000004712029205318774919_"
   x="179.10001"
   y="249.39999"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000132780121215862860650000014355850466330257555_">
			<use
   xlink:href="#SVGID_00000154407293877038307510000004712029205318774919_"
   style="overflow:visible"
   id="use1257"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000132780121215862860650000014355850466330257555_)"
   id="g1268">
			<defs
   id="defs1261">
				<rect
   id="SVGID_00000047049897451519396700000009432779253524273562_"
   x="179.10001"
   y="249.39999"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000140699096557246055230000010165111630846137774_">
				<use
   xlink:href="#SVGID_00000047049897451519396700000009432779253524273562_"
   style="overflow:visible"
   id="use1263"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 181.6,250.7 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000140699096557246055230000010165111630846137774_)"
   id="path1266" />
		</g>
	</g>
</g>
<g
   class="st22"
   id="g1292"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g1290">
		<defs
   id="defs1275">
			<rect
   id="SVGID_00000026159735622981805410000006692558657760721331_"
   x="190.2"
   y="249.39999"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000126324196935176665260000015858813068087041162_">
			<use
   xlink:href="#SVGID_00000026159735622981805410000006692558657760721331_"
   style="overflow:visible"
   id="use1277"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000126324196935176665260000015858813068087041162_)"
   id="g1288">
			<defs
   id="defs1281">
				<rect
   id="SVGID_00000157308510110301716280000006449160240934990515_"
   x="190.2"
   y="249.39999"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000121247952973921271730000018194872514028881836_">
				<use
   xlink:href="#SVGID_00000157308510110301716280000006449160240934990515_"
   style="overflow:visible"
   id="use1283"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 192.7,250.6 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000121247952973921271730000018194872514028881836_)"
   id="path1286" />
		</g>
	</g>
</g>
<g
   class="st22"
   id="g1312"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g1310">
		<defs
   id="defs1295">
			<rect
   id="SVGID_00000142861347825821323040000006624659065662799003_"
   x="173.5"
   y="239.8"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000069379130742372227160000012788516981345930908_">
			<use
   xlink:href="#SVGID_00000142861347825821323040000006624659065662799003_"
   style="overflow:visible"
   id="use1297"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000069379130742372227160000012788516981345930908_)"
   id="g1308">
			<defs
   id="defs1301">
				<rect
   id="SVGID_00000011031995865208762210000003691967058280766866_"
   x="173.5"
   y="239.8"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000161631931418339724800000008145926844208992673_">
				<use
   xlink:href="#SVGID_00000011031995865208762210000003691967058280766866_"
   style="overflow:visible"
   id="use1303"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 176,241.1 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000161631931418339724800000008145926844208992673_)"
   id="path1306" />
		</g>
	</g>
</g>
<g
   class="st8"
   id="g1332"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g1330">
		<defs
   id="defs1315">
			<rect
   id="SVGID_00000014593781371251519680000016775450066960210361_"
   x="195.7"
   y="239.8"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000113313450023519638380000002721848795722161060_">
			<use
   xlink:href="#SVGID_00000014593781371251519680000016775450066960210361_"
   style="overflow:visible"
   id="use1317"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000113313450023519638380000002721848795722161060_)"
   id="g1328">
			<defs
   id="defs1321">
				<rect
   id="SVGID_00000136396209371150355870000010358472742028728242_"
   x="195.7"
   y="239.8"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000031165965053246146860000005171460969706689418_">
				<use
   xlink:href="#SVGID_00000136396209371150355870000010358472742028728242_"
   style="overflow:visible"
   id="use1323"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 198.2,241 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000031165965053246146860000005171460969706689418_)"
   id="path1326" />
		</g>
	</g>
</g>
<g
   class="st22"
   id="g1352"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g1350">
		<defs
   id="defs1335">
			<rect
   id="SVGID_00000094611383194640725400000005709064179167127949_"
   x="174.39999"
   y="231.10001"
   width="22.799999"
   height="19.9" />
		</defs>
		<clipPath
   id="SVGID_00000132078228043960033270000003203867978245448382_">
			<use
   xlink:href="#SVGID_00000094611383194640725400000005709064179167127949_"
   style="overflow:visible"
   id="use1337"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000132078228043960033270000003203867978245448382_)"
   id="g1348">
			<defs
   id="defs1341">
				<rect
   id="SVGID_00000168112482485953895170000006609933820757032835_"
   x="174.39999"
   y="231.10001"
   width="22.799999"
   height="19.9" />
			</defs>
			<clipPath
   id="SVGID_00000174588955492139703460000010294668105908302503_">
				<use
   xlink:href="#SVGID_00000168112482485953895170000006609933820757032835_"
   style="overflow:visible"
   id="use1343"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			
				<polygon
   style="fill:none;stroke:#000000;stroke-width:0.5032;stroke-miterlimit:10"
   points="174.8,241.1 180.4,250.7 191.4,250.7 196.9,241 191.4,231.4 180.3,231.4 "
   clip-path="url(#SVGID_00000174588955492139703460000010294668105908302503_)"
   id="polygon1346" />
		</g>
	</g>
</g>
<g
   class="st8"
   id="g1372"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g1370">
		<defs
   id="defs1355">
			<rect
   id="SVGID_00000009553935183889402160000013750039803388632736_"
   x="195.7"
   y="239.7"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000074408398814487452980000017665511104719358873_">
			<use
   xlink:href="#SVGID_00000009553935183889402160000013750039803388632736_"
   style="overflow:visible"
   id="use1357"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000074408398814487452980000017665511104719358873_)"
   id="g1368">
			<defs
   id="defs1361">
				<rect
   id="SVGID_00000168115622856748610190000011743389944464220853_"
   x="195.7"
   y="239.7"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000165231754225640151110000009841959167231809979_">
				<use
   xlink:href="#SVGID_00000168115622856748610190000011743389944464220853_"
   style="overflow:visible"
   id="use1363"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 198.2,241 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000165231754225640151110000009841959167231809979_)"
   id="path1366" />
		</g>
	</g>
</g>
<g
   class="st2"
   id="g1392"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g1390">
		<defs
   id="defs1375">
			<rect
   id="SVGID_00000142153584217183249770000005952763124459121085_"
   x="206.7"
   y="239.7"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000085212872110979029690000017542556563177821349_">
			<use
   xlink:href="#SVGID_00000142153584217183249770000005952763124459121085_"
   style="overflow:visible"
   id="use1377"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000085212872110979029690000017542556563177821349_)"
   id="g1388">
			<defs
   id="defs1381">
				<rect
   id="SVGID_00000005970140033009680370000005830084743364980403_"
   x="206.7"
   y="239.7"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000024723381552756568210000001160208841539469241_">
				<use
   xlink:href="#SVGID_00000005970140033009680370000005830084743364980403_"
   style="overflow:visible"
   id="use1383"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 209.3,241 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000024723381552756568210000001160208841539469241_)"
   id="path1386" />
		</g>
	</g>
</g>
<g
   class="st8"
   id="g1412"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g1410">
		<defs
   id="defs1395">
			<rect
   id="SVGID_00000144332943120881525310000008870493975252613045_"
   x="195.7"
   y="259"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000058583889807967741570000015576711816716048022_">
			<use
   xlink:href="#SVGID_00000144332943120881525310000008870493975252613045_"
   style="overflow:visible"
   id="use1397"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000058583889807967741570000015576711816716048022_)"
   id="g1408">
			<defs
   id="defs1401">
				<rect
   id="SVGID_00000057852730752837902520000006257755517576843420_"
   x="195.7"
   y="259"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000138554835812373411040000005382690602480396683_">
				<use
   xlink:href="#SVGID_00000057852730752837902520000006257755517576843420_"
   style="overflow:visible"
   id="use1403"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 198.3,260.3 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000138554835812373411040000005382690602480396683_)"
   id="path1406" />
		</g>
	</g>
</g>
<g
   class="st2"
   id="g1432"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g1430">
		<defs
   id="defs1415">
			<rect
   id="SVGID_00000170960766950864472980000017084548280481719739_"
   x="206.8"
   y="259"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000088835701397740267670000012031919329695219627_">
			<use
   xlink:href="#SVGID_00000170960766950864472980000017084548280481719739_"
   style="overflow:visible"
   id="use1417"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000088835701397740267670000012031919329695219627_)"
   id="g1428">
			<defs
   id="defs1421">
				<rect
   id="SVGID_00000089568921908235757550000009751431460674765717_"
   x="206.8"
   y="259"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000102546085860074644520000016654858528580404112_">
				<use
   xlink:href="#SVGID_00000089568921908235757550000009751431460674765717_"
   style="overflow:visible"
   id="use1423"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 209.3,260.2 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0.1 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000102546085860074644520000016654858528580404112_)"
   id="path1426" />
		</g>
	</g>
</g>
<g
   class="st22"
   id="g1452"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g1450">
		<defs
   id="defs1435">
			<rect
   id="SVGID_00000023966224707486818000000016068341360537876118_"
   x="190.2"
   y="249.39999"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000131367938704414898860000000294601594545610126_">
			<use
   xlink:href="#SVGID_00000023966224707486818000000016068341360537876118_"
   style="overflow:visible"
   id="use1437"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000131367938704414898860000000294601594545610126_)"
   id="g1448">
			<defs
   id="defs1441">
				<rect
   id="SVGID_00000075862233534696996900000001454378075819955587_"
   x="190.2"
   y="249.39999"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000114756211518488256890000000818780802724608444_">
				<use
   xlink:href="#SVGID_00000075862233534696996900000001454378075819955587_"
   style="overflow:visible"
   id="use1443"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 192.7,250.7 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000114756211518488256890000000818780802724608444_)"
   id="path1446" />
		</g>
	</g>
</g>
<g
   class="st2"
   id="g1472"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g1470">
		<defs
   id="defs1455">
			<rect
   id="SVGID_00000042012783711800752760000013617334363775245444_"
   x="212.3"
   y="249.39999"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000031171739832893298610000004486275075927126152_">
			<use
   xlink:href="#SVGID_00000042012783711800752760000013617334363775245444_"
   style="overflow:visible"
   id="use1457"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000031171739832893298610000004486275075927126152_)"
   id="g1468">
			<defs
   id="defs1461">
				<rect
   id="SVGID_00000119838773632277382410000018038290374969000373_"
   x="212.3"
   y="249.39999"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000112634599426800348890000017515460200739940239_">
				<use
   xlink:href="#SVGID_00000119838773632277382410000018038290374969000373_"
   style="overflow:visible"
   id="use1463"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 214.8,250.6 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000112634599426800348890000017515460200739940239_)"
   id="path1466" />
		</g>
	</g>
</g>
<g
   class="st22"
   id="g1492"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g1490">
		<defs
   id="defs1475">
			<rect
   id="SVGID_00000166654063066423752870000013112672677160524978_"
   x="191.10001"
   y="240.7"
   width="22.9"
   height="19.9" />
		</defs>
		<clipPath
   id="SVGID_00000097482455699939761240000000247281986532811705_">
			<use
   xlink:href="#SVGID_00000166654063066423752870000013112672677160524978_"
   style="overflow:visible"
   id="use1477"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000097482455699939761240000000247281986532811705_)"
   id="g1488">
			<defs
   id="defs1481">
				<rect
   id="SVGID_00000032631511205291681590000009303042718088262061_"
   x="191.10001"
   y="240.7"
   width="22.799999"
   height="19.9" />
			</defs>
			<clipPath
   id="SVGID_00000106126632565643230790000009854383836201134507_">
				<use
   xlink:href="#SVGID_00000032631511205291681590000009303042718088262061_"
   style="overflow:visible"
   id="use1483"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			
				<polygon
   style="fill:none;stroke:#000000;stroke-width:0.5032;stroke-miterlimit:10"
   points="191.5,250.7 197,260.3 208.1,260.2 213.6,250.6 208,241 196.9,241 "
   clip-path="url(#SVGID_00000106126632565643230790000009854383836201134507_)"
   id="polygon1486" />
		</g>
	</g>
</g>
<g
   class="st2"
   id="g1512"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g1510">
		<defs
   id="defs1495">
			<rect
   id="SVGID_00000062158606225461834910000013514503785276721342_"
   x="212.3"
   y="249.3"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000083774252608538328880000000461058186383068293_">
			<use
   xlink:href="#SVGID_00000062158606225461834910000013514503785276721342_"
   style="overflow:visible"
   id="use1497"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000083774252608538328880000000461058186383068293_)"
   id="g1508">
			<defs
   id="defs1501">
				<rect
   id="SVGID_00000045577844003265313150000011000196257946688433_"
   x="212.3"
   y="249.3"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000048500114605502579870000012910830314522856111_">
				<use
   xlink:href="#SVGID_00000045577844003265313150000011000196257946688433_"
   style="overflow:visible"
   id="use1503"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 214.8,250.6 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000048500114605502579870000012910830314522856111_)"
   id="path1506" />
		</g>
	</g>
</g>
<g
   class="st2"
   id="g1532"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g1530">
		<defs
   id="defs1515">
			<rect
   id="SVGID_00000047769486662895557510000009666916870282121604_"
   x="212.39999"
   y="268.60001"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000043432142965533413540000006641575964817001396_">
			<use
   xlink:href="#SVGID_00000047769486662895557510000009666916870282121604_"
   style="overflow:visible"
   id="use1517"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000043432142965533413540000006641575964817001396_)"
   id="g1528">
			<defs
   id="defs1521">
				<rect
   id="SVGID_00000106143095470061694810000003335059060322393516_"
   x="212.39999"
   y="268.60001"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000052081695506947307200000004791589256028770706_">
				<use
   xlink:href="#SVGID_00000106143095470061694810000003335059060322393516_"
   style="overflow:visible"
   id="use1523"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 214.9,269.9 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000052081695506947307200000004791589256028770706_)"
   id="path1526" />
		</g>
	</g>
</g>
<g
   class="st2"
   id="g1552"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g1550">
		<defs
   id="defs1535">
			<rect
   id="SVGID_00000142161458644122140120000007672623585050024605_"
   x="206.8"
   y="259"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000166664662748093675400000012256196701138983089_">
			<use
   xlink:href="#SVGID_00000142161458644122140120000007672623585050024605_"
   style="overflow:visible"
   id="use1537"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000166664662748093675400000012256196701138983089_)"
   id="g1548">
			<defs
   id="defs1541">
				<rect
   id="SVGID_00000165939778632296604290000002140222515646646962_"
   x="206.8"
   y="259"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000160157792546985708790000000175242207640462005_">
				<use
   xlink:href="#SVGID_00000165939778632296604290000002140222515646646962_"
   style="overflow:visible"
   id="use1543"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 209.3,260.2 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0.1 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000160157792546985708790000000175242207640462005_)"
   id="path1546" />
		</g>
	</g>
</g>
<g
   class="st2"
   id="g1572"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g1570">
		<defs
   id="defs1555">
			<rect
   id="SVGID_00000082344399191815923920000009454222871401237935_"
   x="207.7"
   y="250.2"
   width="22.9"
   height="19.9" />
		</defs>
		<clipPath
   id="SVGID_00000137121434029024966320000011881371196809082295_">
			<use
   xlink:href="#SVGID_00000082344399191815923920000009454222871401237935_"
   style="overflow:visible"
   id="use1557"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000137121434029024966320000011881371196809082295_)"
   id="g1568">
			<defs
   id="defs1561">
				<rect
   id="SVGID_00000063633494523389587890000005936650662400149402_"
   x="207.7"
   y="250.2"
   width="22.9"
   height="19.9" />
			</defs>
			<clipPath
   id="SVGID_00000018215961645022051910000015004477844343692202_">
				<use
   xlink:href="#SVGID_00000063633494523389587890000005936650662400149402_"
   style="overflow:visible"
   id="use1563"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			
				<polygon
   style="fill:none;stroke:#000000;stroke-width:0.5032;stroke-miterlimit:10"
   points="208.1,260.3 213.6,269.9 224.7,269.8 230.2,260.2 224.6,250.6 213.6,250.6 "
   clip-path="url(#SVGID_00000018215961645022051910000015004477844343692202_)"
   id="polygon1566" />
		</g>
	</g>
</g>
<g
   class="st57"
   id="g1592"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g1590">
		<defs
   id="defs1575">
			<rect
   id="SVGID_00000155869473517352370430000006767806710561846430_"
   x="129.3"
   y="239.89999"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000087405549203672460100000002932985209285327292_">
			<use
   xlink:href="#SVGID_00000155869473517352370430000006767806710561846430_"
   style="overflow:visible"
   id="use1577"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000087405549203672460100000002932985209285327292_)"
   id="g1588">
			<defs
   id="defs1581">
				<rect
   id="SVGID_00000168085947895389438760000000819515101992029586_"
   x="129.3"
   y="239.89999"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000118372714146933921900000014373711722816525720_">
				<use
   xlink:href="#SVGID_00000168085947895389438760000000819515101992029586_"
   style="overflow:visible"
   id="use1583"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 131.8,241.2 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000118372714146933921900000014373711722816525720_)"
   id="path1586" />
		</g>
	</g>
</g>
<g
   class="st60"
   id="g1612"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g1610">
		<defs
   id="defs1595">
			<rect
   id="SVGID_00000151543262007347646950000000575816281479570362_"
   x="140.3"
   y="239.89999"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000132767382600649060550000004583311717449390495_">
			<use
   xlink:href="#SVGID_00000151543262007347646950000000575816281479570362_"
   style="overflow:visible"
   id="use1597"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000132767382600649060550000004583311717449390495_)"
   id="g1608">
			<defs
   id="defs1601">
				<rect
   id="SVGID_00000138561257451794545330000011471275491907245452_"
   x="140.3"
   y="239.89999"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000016795995156769784290000007176277375497715084_">
				<use
   xlink:href="#SVGID_00000138561257451794545330000011471275491907245452_"
   style="overflow:visible"
   id="use1603"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 142.9,241.2 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000016795995156769784290000007176277375497715084_)"
   id="path1606" />
		</g>
	</g>
</g>
<g
   class="st57"
   id="g1632"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g1630">
		<defs
   id="defs1615">
			<rect
   id="SVGID_00000091001314441825807590000007377709420205792156_"
   x="124.6"
   y="221.60001"
   width="22.9"
   height="19.9" />
		</defs>
		<clipPath
   id="SVGID_00000010295335246689944210000015084864834078200230_">
			<use
   xlink:href="#SVGID_00000091001314441825807590000007377709420205792156_"
   style="overflow:visible"
   id="use1617"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000010295335246689944210000015084864834078200230_)"
   id="g1628">
			<defs
   id="defs1621">
				<rect
   id="SVGID_00000145023876879930208190000010922356195223479985_"
   x="124.6"
   y="221.60001"
   width="22.799999"
   height="19.9" />
			</defs>
			<clipPath
   id="SVGID_00000043427062297159137850000007901613533017416330_">
				<use
   xlink:href="#SVGID_00000145023876879930208190000010922356195223479985_"
   style="overflow:visible"
   id="use1623"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			
				<polygon
   style="fill:none;stroke:#000000;stroke-width:0.5032;stroke-miterlimit:10"
   points="125,231.6 130.5,241.2 141.6,241.2 147.1,231.5 141.5,221.9 130.5,222 "
   clip-path="url(#SVGID_00000043427062297159137850000007901613533017416330_)"
   id="polygon1626" />
		</g>
	</g>
</g>
<g
   class="st60"
   id="g1652"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g1650">
		<defs
   id="defs1635">
			<rect
   id="SVGID_00000111186896158420208840000012357362781175807657_"
   x="145.89999"
   y="249.5"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000044158337970978624600000008232872458574816403_">
			<use
   xlink:href="#SVGID_00000111186896158420208840000012357362781175807657_"
   style="overflow:visible"
   id="use1637"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000044158337970978624600000008232872458574816403_)"
   id="g1648">
			<defs
   id="defs1641">
				<rect
   id="SVGID_00000044180059999506998450000004484150336011624879_"
   x="145.89999"
   y="249.5"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000006679930901747375350000014723661625309563838_">
				<use
   xlink:href="#SVGID_00000044180059999506998450000004484150336011624879_"
   style="overflow:visible"
   id="use1643"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 148.4,250.8 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000006679930901747375350000014723661625309563838_)"
   id="path1646" />
		</g>
	</g>
</g>
<g
   class="st19"
   id="g1672"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g1670">
		<defs
   id="defs1655">
			<rect
   id="SVGID_00000050663483645096335280000018103931322893714839_"
   x="157"
   y="249.5"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000165202701620885447540000006296500650229824156_">
			<use
   xlink:href="#SVGID_00000050663483645096335280000018103931322893714839_"
   style="overflow:visible"
   id="use1657"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000165202701620885447540000006296500650229824156_)"
   id="g1668">
			<defs
   id="defs1661">
				<rect
   id="SVGID_00000067938947787396331870000005788495023910197927_"
   x="157"
   y="249.5"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000132777377413426843970000016070450940746392962_">
				<use
   xlink:href="#SVGID_00000067938947787396331870000005788495023910197927_"
   style="overflow:visible"
   id="use1663"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 159.5,250.7 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000132777377413426843970000016070450940746392962_)"
   id="path1666" />
		</g>
	</g>
</g>
<g
   class="st60"
   id="g1692"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g1690">
		<defs
   id="defs1675">
			<rect
   id="SVGID_00000093896938390481113460000013104999755442848662_"
   x="140.3"
   y="239.89999"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000175283583884908739240000016851702281652465072_">
			<use
   xlink:href="#SVGID_00000093896938390481113460000013104999755442848662_"
   style="overflow:visible"
   id="use1677"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000175283583884908739240000016851702281652465072_)"
   id="g1688">
			<defs
   id="defs1681">
				<rect
   id="SVGID_00000029034390239627543180000011765290316440534154_"
   x="140.3"
   y="239.89999"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000124148231171629031830000015489020226971649196_">
				<use
   xlink:href="#SVGID_00000029034390239627543180000011765290316440534154_"
   style="overflow:visible"
   id="use1683"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 142.8,241.2 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000124148231171629031830000015489020226971649196_)"
   id="path1686" />
		</g>
	</g>
</g>
<g
   class="st19"
   id="g1712"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g1710">
		<defs
   id="defs1695">
			<rect
   id="SVGID_00000142161600796518378950000004491254109574236313_"
   x="162.39999"
   y="239.89999"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000062185043626391032460000017415621667614005674_">
			<use
   xlink:href="#SVGID_00000142161600796518378950000004491254109574236313_"
   style="overflow:visible"
   id="use1697"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000062185043626391032460000017415621667614005674_)"
   id="g1708">
			<defs
   id="defs1701">
				<rect
   id="SVGID_00000176734307312895941730000008630033997770800554_"
   x="162.39999"
   y="239.89999"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000096021590192073315590000011969307463796393625_">
				<use
   xlink:href="#SVGID_00000176734307312895941730000008630033997770800554_"
   style="overflow:visible"
   id="use1703"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 165,241.1 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000096021590192073315590000011969307463796393625_)"
   id="path1706" />
		</g>
	</g>
</g>
<g
   class="st60"
   id="g1732"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g1730">
		<defs
   id="defs1715">
			<rect
   id="SVGID_00000159458643449327029110000007760390550217687945_"
   x="141.2"
   y="231.2"
   width="22.799999"
   height="19.9" />
		</defs>
		<clipPath
   id="SVGID_00000004504007603430515830000009837094065394945432_">
			<use
   xlink:href="#SVGID_00000159458643449327029110000007760390550217687945_"
   style="overflow:visible"
   id="use1717"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000004504007603430515830000009837094065394945432_)"
   id="g1728">
			<defs
   id="defs1721">
				<rect
   id="SVGID_00000070080662304578888180000003053811954785052806_"
   x="141.2"
   y="231.2"
   width="22.799999"
   height="19.9" />
			</defs>
			<clipPath
   id="SVGID_00000030446155070098234960000009422052403923767174_">
				<use
   xlink:href="#SVGID_00000070080662304578888180000003053811954785052806_"
   style="overflow:visible"
   id="use1723"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			
				<polygon
   style="fill:none;stroke:#000000;stroke-width:0.5032;stroke-miterlimit:10"
   points="141.6,241.2 147.2,250.8 158.2,250.8 163.7,241.1 158.1,231.5 147.1,231.5 "
   clip-path="url(#SVGID_00000030446155070098234960000009422052403923767174_)"
   id="polygon1726" />
		</g>
	</g>
</g>
<g
   class="st19"
   id="g1752"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g1750">
		<defs
   id="defs1735">
			<rect
   id="SVGID_00000017477630840370491680000011672553320929907080_"
   x="162.5"
   y="239.89999"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000008846754972513371560000016580978943228346256_">
			<use
   xlink:href="#SVGID_00000017477630840370491680000011672553320929907080_"
   style="overflow:visible"
   id="use1737"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000008846754972513371560000016580978943228346256_)"
   id="g1748">
			<defs
   id="defs1741">
				<rect
   id="SVGID_00000111894625958987337860000009541570969800035978_"
   x="162.5"
   y="239.89999"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000027600143953632858040000013953808475735765920_">
				<use
   xlink:href="#SVGID_00000111894625958987337860000009541570969800035978_"
   style="overflow:visible"
   id="use1743"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 165,241.1 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000027600143953632858040000013953808475735765920_)"
   id="path1746" />
		</g>
	</g>
</g>
<g
   class="st22"
   id="g1772"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g1770">
		<defs
   id="defs1755">
			<rect
   id="SVGID_00000051368835385097261870000000317728373496034728_"
   x="173.5"
   y="239.8"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000116201046969483329590000017597381117803957156_">
			<use
   xlink:href="#SVGID_00000051368835385097261870000000317728373496034728_"
   style="overflow:visible"
   id="use1757"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000116201046969483329590000017597381117803957156_)"
   id="g1768">
			<defs
   id="defs1761">
				<rect
   id="SVGID_00000181770676033275752620000009244332923792282551_"
   x="173.5"
   y="239.8"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000166650571176193388040000004561688181030696631_">
				<use
   xlink:href="#SVGID_00000181770676033275752620000009244332923792282551_"
   style="overflow:visible"
   id="use1763"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 176.1,241.1 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000166650571176193388040000004561688181030696631_)"
   id="path1766" />
		</g>
	</g>
</g>
<g
   class="st19"
   id="g1792"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g1790">
		<defs
   id="defs1775">
			<rect
   id="SVGID_00000150103991937207116460000010567293816127209629_"
   x="162.5"
   y="259.10001"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000018229830856151154450000005224687742430909837_">
			<use
   xlink:href="#SVGID_00000150103991937207116460000010567293816127209629_"
   style="overflow:visible"
   id="use1777"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000018229830856151154450000005224687742430909837_)"
   id="g1788">
			<defs
   id="defs1781">
				<rect
   id="SVGID_00000059990673336438823890000006696686959186016159_"
   x="162.5"
   y="259.10001"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000153666874905679328550000010155009525635317144_">
				<use
   xlink:href="#SVGID_00000059990673336438823890000006696686959186016159_"
   style="overflow:visible"
   id="use1783"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 165.1,260.4 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000153666874905679328550000010155009525635317144_)"
   id="path1786" />
		</g>
	</g>
</g>
<g
   class="st22"
   id="g1812"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g1810">
		<defs
   id="defs1795">
			<rect
   id="SVGID_00000051383470014155358360000007928303247166371255_"
   x="173.60001"
   y="259.10001"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000041271743670324186400000009086036525665417865_">
			<use
   xlink:href="#SVGID_00000051383470014155358360000007928303247166371255_"
   style="overflow:visible"
   id="use1797"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000041271743670324186400000009086036525665417865_)"
   id="g1808">
			<defs
   id="defs1801">
				<rect
   id="SVGID_00000075865337268806511980000016618349529320659852_"
   x="173.60001"
   y="259.10001"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000093890741827200303540000005866882111526949787_">
				<use
   xlink:href="#SVGID_00000075865337268806511980000016618349529320659852_"
   style="overflow:visible"
   id="use1803"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 176.1,260.3 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0.1 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000093890741827200303540000005866882111526949787_)"
   id="path1806" />
		</g>
	</g>
</g>
<g
   class="st19"
   id="g1832"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g1830">
		<defs
   id="defs1815">
			<rect
   id="SVGID_00000150795248239844735420000015691977225916032665_"
   x="156.89999"
   y="249.5"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000015342901272387017430000005604507612700365481_">
			<use
   xlink:href="#SVGID_00000150795248239844735420000015691977225916032665_"
   style="overflow:visible"
   id="use1817"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000015342901272387017430000005604507612700365481_)"
   id="g1828">
			<defs
   id="defs1821">
				<rect
   id="SVGID_00000164494846417561520010000007969775719785631618_"
   x="156.89999"
   y="249.5"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000088097927698837792110000007200912300622331799_">
				<use
   xlink:href="#SVGID_00000164494846417561520010000007969775719785631618_"
   style="overflow:visible"
   id="use1823"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 159.5,250.8 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000088097927698837792110000007200912300622331799_)"
   id="path1826" />
		</g>
	</g>
</g>
<g
   class="st22"
   id="g1852"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g1850">
		<defs
   id="defs1835">
			<rect
   id="SVGID_00000036251455838743519900000001932228067530962574_"
   x="179.10001"
   y="249.5"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000111910422231239471850000009610309450188206478_">
			<use
   xlink:href="#SVGID_00000036251455838743519900000001932228067530962574_"
   style="overflow:visible"
   id="use1837"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000111910422231239471850000009610309450188206478_)"
   id="g1848">
			<defs
   id="defs1841">
				<rect
   id="SVGID_00000036957689773490872470000001421781207335360435_"
   x="179.10001"
   y="249.5"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000121254235765651558480000007094617933922455178_">
				<use
   xlink:href="#SVGID_00000036957689773490872470000001421781207335360435_"
   style="overflow:visible"
   id="use1843"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 181.6,250.7 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000121254235765651558480000007094617933922455178_)"
   id="path1846" />
		</g>
	</g>
</g>
<g
   class="st19"
   id="g1872"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g1870">
		<defs
   id="defs1855">
			<rect
   id="SVGID_00000109719075015812484850000004531251154451324070_"
   x="157.89999"
   y="240.8"
   width="22.9"
   height="19.9" />
		</defs>
		<clipPath
   id="SVGID_00000053524553610867582090000007459206266081344137_">
			<use
   xlink:href="#SVGID_00000109719075015812484850000004531251154451324070_"
   style="overflow:visible"
   id="use1857"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000053524553610867582090000007459206266081344137_)"
   id="g1868">
			<defs
   id="defs1861">
				<rect
   id="SVGID_00000005970981200752288910000003836170561965625023_"
   x="157.89999"
   y="240.8"
   width="22.799999"
   height="19.9" />
			</defs>
			<clipPath
   id="SVGID_00000018920522856116916070000008710616926059086493_">
				<use
   xlink:href="#SVGID_00000005970981200752288910000003836170561965625023_"
   style="overflow:visible"
   id="use1863"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			
				<polygon
   style="fill:none;stroke:#000000;stroke-width:0.5032;stroke-miterlimit:10"
   points="158.2,250.8 163.8,260.4 174.9,260.3 180.3,250.7 174.8,241.1 163.7,241.1 "
   clip-path="url(#SVGID_00000018920522856116916070000008710616926059086493_)"
   id="polygon1866" />
		</g>
	</g>
</g>
<g
   class="st22"
   id="g1892"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g1890">
		<defs
   id="defs1875">
			<rect
   id="SVGID_00000117638623799282593780000005182136695773820052_"
   x="179.10001"
   y="249.39999"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000016768538301049193490000011486967708354900656_">
			<use
   xlink:href="#SVGID_00000117638623799282593780000005182136695773820052_"
   style="overflow:visible"
   id="use1877"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000016768538301049193490000011486967708354900656_)"
   id="g1888">
			<defs
   id="defs1881">
				<rect
   id="SVGID_00000128467767673526318580000011772428118486271403_"
   x="179.10001"
   y="249.39999"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000143577853809772954120000018325660698775307960_">
				<use
   xlink:href="#SVGID_00000128467767673526318580000011772428118486271403_"
   style="overflow:visible"
   id="use1883"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 181.6,250.7 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000143577853809772954120000018325660698775307960_)"
   id="path1886" />
		</g>
	</g>
</g>
<g
   class="st22"
   id="g1912"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g1910">
		<defs
   id="defs1895">
			<rect
   id="SVGID_00000148647162666963436030000005550053263829782931_"
   x="190.2"
   y="249.39999"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000122692451363371666070000014879500440677838740_">
			<use
   xlink:href="#SVGID_00000148647162666963436030000005550053263829782931_"
   style="overflow:visible"
   id="use1897"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000122692451363371666070000014879500440677838740_)"
   id="g1908">
			<defs
   id="defs1901">
				<rect
   id="SVGID_00000019674497904938326810000017356586092432546441_"
   x="190.2"
   y="249.39999"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000086684801132252601480000007604397696186134449_">
				<use
   xlink:href="#SVGID_00000019674497904938326810000017356586092432546441_"
   style="overflow:visible"
   id="use1903"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 192.7,250.7 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000086684801132252601480000007604397696186134449_)"
   id="path1906" />
		</g>
	</g>
</g>
<g
   class="st22"
   id="g1932"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g1930">
		<defs
   id="defs1915">
			<rect
   id="SVGID_00000154403985176206912360000014776562409888081293_"
   x="179.10001"
   y="230.3"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000158000984273282883560000017903404860529852050_">
			<use
   xlink:href="#SVGID_00000154403985176206912360000014776562409888081293_"
   style="overflow:visible"
   id="use1917"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000158000984273282883560000017903404860529852050_)"
   id="g1928">
			<defs
   id="defs1921">
				<rect
   id="SVGID_00000082352268112544854300000018252944232165606567_"
   x="179.10001"
   y="230.3"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000160191229904174231950000005873828421301653914_">
				<use
   xlink:href="#SVGID_00000082352268112544854300000018252944232165606567_"
   style="overflow:visible"
   id="use1923"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 181.6,231.6 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000160191229904174231950000005873828421301653914_)"
   id="path1926" />
		</g>
	</g>
</g>
<g
   class="st22"
   id="g1952"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g1950">
		<defs
   id="defs1935">
			<rect
   id="SVGID_00000008107349457412905950000002528064514273193858_"
   x="190.2"
   y="230.3"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000003100196572091981820000009769456279755663507_">
			<use
   xlink:href="#SVGID_00000008107349457412905950000002528064514273193858_"
   style="overflow:visible"
   id="use1937"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000003100196572091981820000009769456279755663507_)"
   id="g1948">
			<defs
   id="defs1941">
				<rect
   id="SVGID_00000108990655833404146170000014431186441458777504_"
   x="190.2"
   y="230.3"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000060740058583128407010000010653488165019950221_">
				<use
   xlink:href="#SVGID_00000108990655833404146170000014431186441458777504_"
   style="overflow:visible"
   id="use1943"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 192.7,231.6 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000060740058583128407010000010653488165019950221_)"
   id="path1946" />
		</g>
	</g>
</g>
<g
   class="st22"
   id="g1972"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g1970">
		<defs
   id="defs1955">
			<rect
   id="SVGID_00000018916239150766024050000000147041364242438280_"
   x="179.2"
   y="268.70001"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000070115960762535650990000006234304025498641835_">
			<use
   xlink:href="#SVGID_00000018916239150766024050000000147041364242438280_"
   style="overflow:visible"
   id="use1957"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000070115960762535650990000006234304025498641835_)"
   id="g1968">
			<defs
   id="defs1961">
				<rect
   id="SVGID_00000019657923963117943080000001602516813936005538_"
   x="179.2"
   y="268.70001"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000168079699534848567860000005061076812534445498_">
				<use
   xlink:href="#SVGID_00000019657923963117943080000001602516813936005538_"
   style="overflow:visible"
   id="use1963"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 181.7,270 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000168079699534848567860000005061076812534445498_)"
   id="path1966" />
		</g>
	</g>
</g>
<g
   class="st22"
   id="g1992"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g1990">
		<defs
   id="defs1975">
			<rect
   id="SVGID_00000132779714674187204410000010113138312100114872_"
   x="190.2"
   y="268.60001"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000041259004030303531860000000105741317317972887_">
			<use
   xlink:href="#SVGID_00000132779714674187204410000010113138312100114872_"
   style="overflow:visible"
   id="use1977"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000041259004030303531860000000105741317317972887_)"
   id="g1988">
			<defs
   id="defs1981">
				<rect
   id="SVGID_00000062906406629660027620000011575394878978718344_"
   x="190.2"
   y="268.60001"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000147925057112393472840000010111526786033601711_">
				<use
   xlink:href="#SVGID_00000062906406629660027620000011575394878978718344_"
   style="overflow:visible"
   id="use1983"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 192.8,269.9 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000147925057112393472840000010111526786033601711_)"
   id="path1986" />
		</g>
	</g>
</g>
<g
   class="st22"
   id="g2012"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g2010">
		<defs
   id="defs1995">
			<rect
   id="SVGID_00000129904663481819485940000018271584586728348073_"
   x="173.60001"
   y="259.10001"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000030481258061511305750000016002802133451695788_">
			<use
   xlink:href="#SVGID_00000129904663481819485940000018271584586728348073_"
   style="overflow:visible"
   id="use1997"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000030481258061511305750000016002802133451695788_)"
   id="g2008">
			<defs
   id="defs2001">
				<rect
   id="SVGID_00000043446470526449811890000014301193740946573472_"
   x="173.60001"
   y="259.10001"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000154387538618227017260000016940415876641691781_">
				<use
   xlink:href="#SVGID_00000043446470526449811890000014301193740946573472_"
   style="overflow:visible"
   id="use2003"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 176.1,260.4 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.5 1.3,1.3"
   clip-path="url(#SVGID_00000154387538618227017260000016940415876641691781_)"
   id="path2006" />
		</g>
	</g>
</g>
<g
   class="st8"
   id="g2032"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g2030">
		<defs
   id="defs2015">
			<rect
   id="SVGID_00000067954290494510773010000015501785068637317779_"
   x="195.7"
   y="259"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000037675313787133581060000009614134980742204041_">
			<use
   xlink:href="#SVGID_00000067954290494510773010000015501785068637317779_"
   style="overflow:visible"
   id="use2017"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000037675313787133581060000009614134980742204041_)"
   id="g2028">
			<defs
   id="defs2021">
				<rect
   id="SVGID_00000154395211507822673680000000598587276584519064_"
   x="195.7"
   y="259"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000026869710880986646000000013389550843409579409_">
				<use
   xlink:href="#SVGID_00000154395211507822673680000000598587276584519064_"
   style="overflow:visible"
   id="use2023"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 198.3,260.3 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000026869710880986646000000013389550843409579409_)"
   id="path2026" />
		</g>
	</g>
</g>
<g
   class="st22"
   id="g2052"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g2050">
		<defs
   id="defs2035">
			<rect
   id="SVGID_00000139995850582768333910000002025965281607167676_"
   x="174.5"
   y="250.3"
   width="22.799999"
   height="19.9" />
		</defs>
		<clipPath
   id="SVGID_00000168824266125217166110000005422614527816740764_">
			<use
   xlink:href="#SVGID_00000139995850582768333910000002025965281607167676_"
   style="overflow:visible"
   id="use2037"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000168824266125217166110000005422614527816740764_)"
   id="g2048">
			<defs
   id="defs2041">
				<rect
   id="SVGID_00000080892247518653490900000003993684430742367657_"
   x="174.5"
   y="250.3"
   width="22.799999"
   height="19.9" />
			</defs>
			<clipPath
   id="SVGID_00000064338778197735232790000018040662667874795705_">
				<use
   xlink:href="#SVGID_00000080892247518653490900000003993684430742367657_"
   style="overflow:visible"
   id="use2043"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			
				<polygon
   style="fill:none;stroke:#000000;stroke-width:0.5032;stroke-miterlimit:10"
   points="174.9,260.4 180.4,270 191.5,269.9 197,260.3 191.4,250.7 180.4,250.7 "
   clip-path="url(#SVGID_00000064338778197735232790000018040662667874795705_)"
   id="polygon2046" />
		</g>
	</g>
</g>
<g
   class="st8"
   id="g2072"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g2070">
		<defs
   id="defs2055">
			<rect
   id="SVGID_00000116218077715072242770000000244181163976797830_"
   x="195.7"
   y="259"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000027604619396767701660000000675413734856231850_">
			<use
   xlink:href="#SVGID_00000116218077715072242770000000244181163976797830_"
   style="overflow:visible"
   id="use2057"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000027604619396767701660000000675413734856231850_)"
   id="g2068">
			<defs
   id="defs2061">
				<rect
   id="SVGID_00000056415439309853857230000000772060919920761005_"
   x="195.7"
   y="259"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000085933925558954673960000018197108940638818193_">
				<use
   xlink:href="#SVGID_00000056415439309853857230000000772060919920761005_"
   style="overflow:visible"
   id="use2063"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 198.3,260.3 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000085933925558954673960000018197108940638818193_)"
   id="path2066" />
		</g>
	</g>
</g>
<g
   class="st2"
   id="g2092"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g2090">
		<defs
   id="defs2075">
			<rect
   id="SVGID_00000006708003851631161410000007529782591343825331_"
   x="206.8"
   y="259"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000142135724174010268560000015274329687065290138_">
			<use
   xlink:href="#SVGID_00000006708003851631161410000007529782591343825331_"
   style="overflow:visible"
   id="use2077"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000142135724174010268560000015274329687065290138_)"
   id="g2088">
			<defs
   id="defs2081">
				<rect
   id="SVGID_00000038415561482716493990000005468913427250945925_"
   x="206.8"
   y="259"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000130612717098583498390000007090422490571566782_">
				<use
   xlink:href="#SVGID_00000038415561482716493990000005468913427250945925_"
   style="overflow:visible"
   id="use2083"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 209.3,260.3 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.5 1.3,1.3"
   clip-path="url(#SVGID_00000130612717098583498390000007090422490571566782_)"
   id="path2086" />
		</g>
	</g>
</g>
<g
   class="st111"
   id="g2112"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g2110">
		<defs
   id="defs2095">
			<rect
   id="SVGID_00000114792893896368823070000003443892833784907421_"
   x="195.8"
   y="278.29999"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000178163829227930180290000017106634240864699571_">
			<use
   xlink:href="#SVGID_00000114792893896368823070000003443892833784907421_"
   style="overflow:visible"
   id="use2097"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000178163829227930180290000017106634240864699571_)"
   id="g2108">
			<defs
   id="defs2101">
				<rect
   id="SVGID_00000091695289633631698020000003120373823216065946_"
   x="195.8"
   y="278.29999"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000098935709013703595580000006360121676542483893_">
				<use
   xlink:href="#SVGID_00000091695289633631698020000003120373823216065946_"
   style="overflow:visible"
   id="use2103"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 198.3,279.5 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0.1 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000098935709013703595580000006360121676542483893_)"
   id="path2106" />
		</g>
	</g>
</g>
<g
   class="st111"
   id="g2132"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g2130">
		<defs
   id="defs2115">
			<rect
   id="SVGID_00000108993155362841315220000004418521198000427437_"
   x="206.89999"
   y="278.20001"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000009582313233166520100000001008568333010945470_">
			<use
   xlink:href="#SVGID_00000108993155362841315220000004418521198000427437_"
   style="overflow:visible"
   id="use2117"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000009582313233166520100000001008568333010945470_)"
   id="g2128">
			<defs
   id="defs2121">
				<rect
   id="SVGID_00000085960415395155834830000017271018783036071358_"
   x="206.89999"
   y="278.20001"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000113348273394263601470000001744457553813329327_">
				<use
   xlink:href="#SVGID_00000085960415395155834830000017271018783036071358_"
   style="overflow:visible"
   id="use2123"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 209.4,279.5 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000113348273394263601470000001744457553813329327_)"
   id="path2126" />
		</g>
	</g>
</g>
<g
   class="st22"
   id="g2152"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g2150">
		<defs
   id="defs2135">
			<rect
   id="SVGID_00000067955050077613415280000012798434742419581057_"
   x="190.2"
   y="268.70001"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000056423099971106425760000006396856378745099929_">
			<use
   xlink:href="#SVGID_00000067955050077613415280000012798434742419581057_"
   style="overflow:visible"
   id="use2137"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000056423099971106425760000006396856378745099929_)"
   id="g2148">
			<defs
   id="defs2141">
				<rect
   id="SVGID_00000033356544069779639420000007507748265355023289_"
   x="190.2"
   y="268.70001"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000153679583038334584160000010937809372454814623_">
				<use
   xlink:href="#SVGID_00000033356544069779639420000007507748265355023289_"
   style="overflow:visible"
   id="use2143"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 192.7,269.9 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0.1 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000153679583038334584160000010937809372454814623_)"
   id="path2146" />
		</g>
	</g>
</g>
<g
   class="st2"
   id="g2172"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g2170">
		<defs
   id="defs2155">
			<rect
   id="SVGID_00000046315581252705948710000009928402599402867370_"
   x="212.39999"
   y="268.60001"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000087392403468255161370000017356782909074775710_">
			<use
   xlink:href="#SVGID_00000046315581252705948710000009928402599402867370_"
   style="overflow:visible"
   id="use2157"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000087392403468255161370000017356782909074775710_)"
   id="g2168">
			<defs
   id="defs2161">
				<rect
   id="SVGID_00000129196446826139404800000010217799600655219132_"
   x="212.39999"
   y="268.60001"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000033343155915832613500000010410755985439073948_">
				<use
   xlink:href="#SVGID_00000129196446826139404800000010217799600655219132_"
   style="overflow:visible"
   id="use2163"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 214.9,269.9 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000033343155915832613500000010410755985439073948_)"
   id="path2166" />
		</g>
	</g>
</g>
<g
   class="st120"
   id="g2192"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g2190">
		<defs
   id="defs2175">
			<rect
   id="SVGID_00000139283460596695275030000001677167112464312960_"
   x="191.10001"
   y="259.89999"
   width="22.9"
   height="19.9" />
		</defs>
		<clipPath
   id="SVGID_00000084515951888000003580000000004738426277982399_">
			<use
   xlink:href="#SVGID_00000139283460596695275030000001677167112464312960_"
   style="overflow:visible"
   id="use2177"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000084515951888000003580000000004738426277982399_)"
   id="g2188">
			<defs
   id="defs2181">
				<rect
   id="SVGID_00000007386142684726143360000010996377545479101086_"
   x="191.10001"
   y="259.89999"
   width="22.799999"
   height="19.9" />
			</defs>
			<clipPath
   id="SVGID_00000147927602040802891560000016608541659907200148_">
				<use
   xlink:href="#SVGID_00000007386142684726143360000010996377545479101086_"
   style="overflow:visible"
   id="use2183"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			
				<polygon
   style="fill:none;stroke:#000000;stroke-width:0.5032;stroke-miterlimit:10"
   points="191.5,269.9 197.1,279.6 208.1,279.5 213.6,269.9 208.1,260.3 197,260.3 "
   clip-path="url(#SVGID_00000147927602040802891560000016608541659907200148_)"
   id="polygon2186" />
		</g>
	</g>
</g>
<g
   class="st2"
   id="g2212"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g2210">
		<defs
   id="defs2195">
			<rect
   id="SVGID_00000099635466258562651150000004318928002290995633_"
   x="212.39999"
   y="268.60001"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000097461061905367830760000001880983160452286643_">
			<use
   xlink:href="#SVGID_00000099635466258562651150000004318928002290995633_"
   style="overflow:visible"
   id="use2197"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000097461061905367830760000001880983160452286643_)"
   id="g2208">
			<defs
   id="defs2201">
				<rect
   id="SVGID_00000068665104383054916950000001152784138522626437_"
   x="212.39999"
   y="268.60001"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000127020963850777972260000011183386872107236523_">
				<use
   xlink:href="#SVGID_00000068665104383054916950000001152784138522626437_"
   style="overflow:visible"
   id="use2203"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 214.9,269.9 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000127020963850777972260000011183386872107236523_)"
   id="path2206" />
		</g>
	</g>
</g>
<g
   class="st5"
   id="g2232"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g2230">
		<defs
   id="defs2215">
			<rect
   id="SVGID_00000148649666136443011950000009404060294046495636_"
   x="212.39999"
   y="287.89999"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000034796567535581099490000014486638077656029330_">
			<use
   xlink:href="#SVGID_00000148649666136443011950000009404060294046495636_"
   style="overflow:visible"
   id="use2217"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000034796567535581099490000014486638077656029330_)"
   id="g2228">
			<defs
   id="defs2221">
				<rect
   id="SVGID_00000143617350542815381620000010515280237819461005_"
   x="212.39999"
   y="287.89999"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000131335536605898171120000003058452483537209780_">
				<use
   xlink:href="#SVGID_00000143617350542815381620000010515280237819461005_"
   style="overflow:visible"
   id="use2223"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 215,289.1 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000131335536605898171120000003058452483537209780_)"
   id="path2226" />
		</g>
	</g>
</g>
<g
   class="st111"
   id="g2252"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g2250">
		<defs
   id="defs2235">
			<rect
   id="SVGID_00000096033977874229031380000007263722523483387777_"
   x="206.89999"
   y="278.29999"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000085240419466248680950000014862813823785694854_">
			<use
   xlink:href="#SVGID_00000096033977874229031380000007263722523483387777_"
   style="overflow:visible"
   id="use2237"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000085240419466248680950000014862813823785694854_)"
   id="g2248">
			<defs
   id="defs2241">
				<rect
   id="SVGID_00000049937700124365679560000016677358265431419015_"
   x="206.89999"
   y="278.29999"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000124867561436211329180000009000924910876929971_">
				<use
   xlink:href="#SVGID_00000049937700124365679560000016677358265431419015_"
   style="overflow:visible"
   id="use2243"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 209.4,279.5 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000124867561436211329180000009000924910876929971_)"
   id="path2246" />
		</g>
	</g>
</g>
<g
   class="st120"
   id="g2272"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g2270">
		<defs
   id="defs2255">
			<rect
   id="SVGID_00000065779051654497633780000014288237481894148531_"
   x="207.8"
   y="269.5"
   width="22.799999"
   height="19.9" />
		</defs>
		<clipPath
   id="SVGID_00000018203552166093678950000013192157162811854270_">
			<use
   xlink:href="#SVGID_00000065779051654497633780000014288237481894148531_"
   style="overflow:visible"
   id="use2257"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000018203552166093678950000013192157162811854270_)"
   id="g2268">
			<defs
   id="defs2261">
				<rect
   id="SVGID_00000085245596708378969030000012773860910948545200_"
   x="207.8"
   y="269.5"
   width="22.799999"
   height="19.9" />
			</defs>
			<clipPath
   id="SVGID_00000085213453822410486620000004493801997965972412_">
				<use
   xlink:href="#SVGID_00000085245596708378969030000012773860910948545200_"
   style="overflow:visible"
   id="use2263"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			
				<polygon
   style="fill:none;stroke:#000000;stroke-width:0.5032;stroke-miterlimit:10"
   points="208.2,279.5 213.7,289.1 224.8,289.1 230.3,279.5 224.7,269.8 213.6,269.9 "
   clip-path="url(#SVGID_00000085213453822410486620000004493801997965972412_)"
   id="polygon2266" />
		</g>
	</g>
</g>
<g
   class="st57"
   id="g2292"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g2290">
		<defs
   id="defs2275">
			<rect
   id="SVGID_00000181048096838089378730000002211242108113928116_"
   x="129.3"
   y="239.89999"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000022528329819586545630000006884581605081791913_">
			<use
   xlink:href="#SVGID_00000181048096838089378730000002211242108113928116_"
   style="overflow:visible"
   id="use2277"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000022528329819586545630000006884581605081791913_)"
   id="g2288">
			<defs
   id="defs2281">
				<rect
   id="SVGID_00000125563558402492739840000014944748604340028601_"
   x="129.3"
   y="239.89999"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000175285146723732200760000014991362708767169435_">
				<use
   xlink:href="#SVGID_00000125563558402492739840000014944748604340028601_"
   style="overflow:visible"
   id="use2283"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 131.8,241.2 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000175285146723732200760000014991362708767169435_)"
   id="path2286" />
		</g>
	</g>
</g>
<g
   class="st60"
   id="g2312"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g2310">
		<defs
   id="defs2295">
			<rect
   id="SVGID_00000097482643171936242600000001186165937675539390_"
   x="140.3"
   y="239.89999"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000164504498319951847220000015983123959555352969_">
			<use
   xlink:href="#SVGID_00000097482643171936242600000001186165937675539390_"
   style="overflow:visible"
   id="use2297"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000164504498319951847220000015983123959555352969_)"
   id="g2308">
			<defs
   id="defs2301">
				<rect
   id="SVGID_00000028314703761477892930000001997770356202091407_"
   x="140.3"
   y="239.89999"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000052802355818893667390000011570795718125165192_">
				<use
   xlink:href="#SVGID_00000028314703761477892930000001997770356202091407_"
   style="overflow:visible"
   id="use2303"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 142.9,241.2 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000052802355818893667390000011570795718125165192_)"
   id="path2306" />
		</g>
	</g>
</g>
<g
   class="st57"
   id="g2332"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g2330">
		<defs
   id="defs2315">
			<rect
   id="SVGID_00000050640864228466348470000008743142735525075101_"
   x="129.3"
   y="220.7"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000021827280215225819170000005164369645977899395_">
			<use
   xlink:href="#SVGID_00000050640864228466348470000008743142735525075101_"
   style="overflow:visible"
   id="use2317"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000021827280215225819170000005164369645977899395_)"
   id="g2328">
			<defs
   id="defs2321">
				<rect
   id="SVGID_00000006690556556134726870000007999735152590759583_"
   x="129.3"
   y="220.7"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000049903509118812374170000010076182095299263668_">
				<use
   xlink:href="#SVGID_00000006690556556134726870000007999735152590759583_"
   style="overflow:visible"
   id="use2323"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 131.8,222 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000049903509118812374170000010076182095299263668_)"
   id="path2326" />
		</g>
	</g>
</g>
<g
   class="st57"
   id="g2352"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g2350">
		<defs
   id="defs2335">
			<rect
   id="SVGID_00000087390684196795271390000012442107821480150925_"
   x="123.8"
   y="230.3"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000127759627342851542580000017482815260309750717_">
			<use
   xlink:href="#SVGID_00000087390684196795271390000012442107821480150925_"
   style="overflow:visible"
   id="use2337"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000127759627342851542580000017482815260309750717_)"
   id="g2348">
			<defs
   id="defs2341">
				<rect
   id="SVGID_00000140701807005524531690000005486812251824335783_"
   x="123.8"
   y="230.3"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000100354844014589729470000001848316243015710133_">
				<use
   xlink:href="#SVGID_00000140701807005524531690000005486812251824335783_"
   style="overflow:visible"
   id="use2343"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 126.4,231.5 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000100354844014589729470000001848316243015710133_)"
   id="path2346" />
		</g>
	</g>
</g>
<g
   class="st60"
   id="g2372"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g2370">
		<defs
   id="defs2355">
			<rect
   id="SVGID_00000090976097765505865640000016023866802386133898_"
   x="145.8"
   y="230.3"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000174563855872167672080000007226100313713431983_">
			<use
   xlink:href="#SVGID_00000090976097765505865640000016023866802386133898_"
   style="overflow:visible"
   id="use2357"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000174563855872167672080000007226100313713431983_)"
   id="g2368">
			<defs
   id="defs2361">
				<rect
   id="SVGID_00000102504762038997293010000004357871244509068207_"
   x="145.8"
   y="230.3"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000073702391635972629070000004997799900923495312_">
				<use
   xlink:href="#SVGID_00000102504762038997293010000004357871244509068207_"
   style="overflow:visible"
   id="use2363"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 148.3,231.5 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000073702391635972629070000004997799900923495312_)"
   id="path2366" />
		</g>
	</g>
</g>
<g
   class="st19"
   id="g2392"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g2390">
		<defs
   id="defs2375">
			<rect
   id="SVGID_00000145060477751250640770000017211888031468945296_"
   x="156.7"
   y="230.3"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000137853917270697835360000009707217102350534585_">
			<use
   xlink:href="#SVGID_00000145060477751250640770000017211888031468945296_"
   style="overflow:visible"
   id="use2377"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000137853917270697835360000009707217102350534585_)"
   id="g2388">
			<defs
   id="defs2381">
				<rect
   id="SVGID_00000003093305058446317630000013497842142059567751_"
   x="156.7"
   y="230.3"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000000197792359181976180000013421216348762810018_">
				<use
   xlink:href="#SVGID_00000003093305058446317630000013497842142059567751_"
   style="overflow:visible"
   id="use2383"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 159.3,231.5 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000000197792359181976180000013421216348762810018_)"
   id="path2386" />
		</g>
	</g>
</g>
<g
   class="st60"
   id="g2412"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g2410">
		<defs
   id="defs2395">
			<rect
   id="SVGID_00000153699382550330976910000005278788452803534752_"
   x="140.3"
   y="220.7"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000158738469788258965860000015526031622347628222_">
			<use
   xlink:href="#SVGID_00000153699382550330976910000005278788452803534752_"
   style="overflow:visible"
   id="use2397"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000158738469788258965860000015526031622347628222_)"
   id="g2408">
			<defs
   id="defs2401">
				<rect
   id="SVGID_00000078039610130206028270000004135120601343765140_"
   x="140.3"
   y="220.7"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000036213767866748897290000011085853218310346387_">
				<use
   xlink:href="#SVGID_00000078039610130206028270000004135120601343765140_"
   style="overflow:visible"
   id="use2403"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 142.9,222 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000036213767866748897290000011085853218310346387_)"
   id="path2406" />
		</g>
	</g>
</g>
<g
   class="st57"
   id="g2432"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g2430">
		<defs
   id="defs2415">
			<rect
   id="SVGID_00000011721620585136357490000017703289397181712791_"
   x="129.3"
   y="259.20001"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000010271703523946637430000003261524329827878585_">
			<use
   xlink:href="#SVGID_00000011721620585136357490000017703289397181712791_"
   style="overflow:visible"
   id="use2417"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000010271703523946637430000003261524329827878585_)"
   id="g2428">
			<defs
   id="defs2421">
				<rect
   id="SVGID_00000084514970685769596870000005429147679307939736_"
   x="129.3"
   y="259.20001"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000097501030078594967960000005809397935637364141_">
				<use
   xlink:href="#SVGID_00000084514970685769596870000005429147679307939736_"
   style="overflow:visible"
   id="use2423"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 131.9,260.5 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000097501030078594967960000005809397935637364141_)"
   id="path2426" />
		</g>
	</g>
</g>
<g
   class="st60"
   id="g2452"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g2450">
		<defs
   id="defs2435">
			<rect
   id="SVGID_00000049221588233952195130000016917044796680364979_"
   x="140.39999"
   y="259.20001"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000026884682576555983220000004165301516776704922_">
			<use
   xlink:href="#SVGID_00000049221588233952195130000016917044796680364979_"
   style="overflow:visible"
   id="use2437"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000026884682576555983220000004165301516776704922_)"
   id="g2448">
			<defs
   id="defs2441">
				<rect
   id="SVGID_00000121999598490127511220000008424519764509443763_"
   x="140.39999"
   y="259.20001"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000070816203210605086100000000456641961822184080_">
				<use
   xlink:href="#SVGID_00000121999598490127511220000008424519764509443763_"
   style="overflow:visible"
   id="use2443"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 142.9,260.4 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0.1 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000070816203210605086100000000456641961822184080_)"
   id="path2446" />
		</g>
	</g>
</g>
<g
   class="st57"
   id="g2472"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g2470">
		<defs
   id="defs2455">
			<rect
   id="SVGID_00000132071771673039413330000003261612553630737804_"
   x="123.8"
   y="249.60001"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000075133686522822473120000017656738137580540304_">
			<use
   xlink:href="#SVGID_00000132071771673039413330000003261612553630737804_"
   style="overflow:visible"
   id="use2457"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000075133686522822473120000017656738137580540304_)"
   id="g2468">
			<defs
   id="defs2461">
				<rect
   id="SVGID_00000132063719041004886720000002203730204402727337_"
   x="123.8"
   y="249.60001"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000158014578965313772780000009565511981212495257_">
				<use
   xlink:href="#SVGID_00000132063719041004886720000002203730204402727337_"
   style="overflow:visible"
   id="use2463"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 126.3,250.9 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000158014578965313772780000009565511981212495257_)"
   id="path2466" />
		</g>
	</g>
</g>
<g
   class="st60"
   id="g2492"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g2490">
		<defs
   id="defs2475">
			<rect
   id="SVGID_00000176749338536554254820000014117920647464922039_"
   x="145.89999"
   y="249.5"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000145047843396971928160000010794819439872092057_">
			<use
   xlink:href="#SVGID_00000176749338536554254820000014117920647464922039_"
   style="overflow:visible"
   id="use2477"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000145047843396971928160000010794819439872092057_)"
   id="g2488">
			<defs
   id="defs2481">
				<rect
   id="SVGID_00000182517142781971804140000002278518125599776923_"
   x="145.89999"
   y="249.5"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000020381346210908623960000017412047562733384638_">
				<use
   xlink:href="#SVGID_00000182517142781971804140000002278518125599776923_"
   style="overflow:visible"
   id="use2483"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 148.4,250.8 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000020381346210908623960000017412047562733384638_)"
   id="path2486" />
		</g>
	</g>
</g>
<g
   class="st57"
   id="g2512"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g2510">
		<defs
   id="defs2495">
			<rect
   id="SVGID_00000057832804633265763770000004764913819966789046_"
   x="124.7"
   y="240.89999"
   width="22.799999"
   height="19.9" />
		</defs>
		<clipPath
   id="SVGID_00000048464038581591660920000005432811455649540537_">
			<use
   xlink:href="#SVGID_00000057832804633265763770000004764913819966789046_"
   style="overflow:visible"
   id="use2497"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000048464038581591660920000005432811455649540537_)"
   id="g2508">
			<defs
   id="defs2501">
				<rect
   id="SVGID_00000095297616750435835740000009886526423119154877_"
   x="124.7"
   y="240.89999"
   width="22.799999"
   height="19.9" />
			</defs>
			<clipPath
   id="SVGID_00000165925155801774872290000015498355964775907501_">
				<use
   xlink:href="#SVGID_00000095297616750435835740000009886526423119154877_"
   style="overflow:visible"
   id="use2503"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			
				<polygon
   style="fill:none;stroke:#000000;stroke-width:0.5032;stroke-miterlimit:10"
   points="125.1,250.9 130.6,260.5 141.7,260.4 147.2,250.8 141.6,241.2 130.5,241.2 "
   clip-path="url(#SVGID_00000165925155801774872290000015498355964775907501_)"
   id="polygon2506" />
		</g>
	</g>
</g>
<g
   class="st60"
   id="g2532"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g2530">
		<defs
   id="defs2515">
			<rect
   id="SVGID_00000058587859317349209510000011216373434963640984_"
   x="145.89999"
   y="249.5"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000013883196312048282620000014494694753657461910_">
			<use
   xlink:href="#SVGID_00000058587859317349209510000011216373434963640984_"
   style="overflow:visible"
   id="use2517"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000013883196312048282620000014494694753657461910_)"
   id="g2528">
			<defs
   id="defs2521">
				<rect
   id="SVGID_00000018925574681858100050000004975018966392101528_"
   x="145.89999"
   y="249.5"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000180357510906258342240000014947909759900543140_">
				<use
   xlink:href="#SVGID_00000018925574681858100050000004975018966392101528_"
   style="overflow:visible"
   id="use2523"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 148.4,250.8 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000180357510906258342240000014947909759900543140_)"
   id="path2526" />
		</g>
	</g>
</g>
<g
   class="st19"
   id="g2552"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g2550">
		<defs
   id="defs2535">
			<rect
   id="SVGID_00000160894535683204243250000014183854369876605572_"
   x="157"
   y="249.5"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000088851276606245433380000017917172447261947827_">
			<use
   xlink:href="#SVGID_00000160894535683204243250000014183854369876605572_"
   style="overflow:visible"
   id="use2537"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000088851276606245433380000017917172447261947827_)"
   id="g2548">
			<defs
   id="defs2541">
				<rect
   id="SVGID_00000183958914234861266660000004868850137734767035_"
   x="157"
   y="249.5"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000119809955909547175330000008035757383845752229_">
				<use
   xlink:href="#SVGID_00000183958914234861266660000004868850137734767035_"
   style="overflow:visible"
   id="use2543"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 159.5,250.8 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000119809955909547175330000008035757383845752229_)"
   id="path2546" />
		</g>
	</g>
</g>
<g
   class="st60"
   id="g2572"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g2570">
		<defs
   id="defs2555">
			<rect
   id="SVGID_00000106119999330787844280000001688094992957767592_"
   x="146"
   y="268.79999"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000116947328588826513520000014218402081292739752_">
			<use
   xlink:href="#SVGID_00000106119999330787844280000001688094992957767592_"
   style="overflow:visible"
   id="use2557"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000116947328588826513520000014218402081292739752_)"
   id="g2568">
			<defs
   id="defs2561">
				<rect
   id="SVGID_00000076563748170904086210000008622094505111325348_"
   x="146"
   y="268.79999"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000145739743382742956070000007354073343903934851_">
				<use
   xlink:href="#SVGID_00000076563748170904086210000008622094505111325348_"
   style="overflow:visible"
   id="use2563"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 148.5,270.1 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.5 1.3,1.3"
   clip-path="url(#SVGID_00000145739743382742956070000007354073343903934851_)"
   id="path2566" />
		</g>
	</g>
</g>
<g
   class="st19"
   id="g2592"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g2590">
		<defs
   id="defs2575">
			<rect
   id="SVGID_00000083070697596859835110000007637653072396911233_"
   x="157.10001"
   y="268.70001"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000018218448832183800300000013829546364767726243_">
			<use
   xlink:href="#SVGID_00000083070697596859835110000007637653072396911233_"
   style="overflow:visible"
   id="use2577"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000018218448832183800300000013829546364767726243_)"
   id="g2588">
			<defs
   id="defs2581">
				<rect
   id="SVGID_00000085218127151445446300000014745213492289591207_"
   x="157.10001"
   y="268.70001"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000093863196084533659210000016137409141864901047_">
				<use
   xlink:href="#SVGID_00000085218127151445446300000014745213492289591207_"
   style="overflow:visible"
   id="use2583"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 159.6,270 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000093863196084533659210000016137409141864901047_)"
   id="path2586" />
		</g>
	</g>
</g>
<g
   class="st60"
   id="g2612"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g2610">
		<defs
   id="defs2595">
			<rect
   id="SVGID_00000011029234187289642830000001002733610602626190_"
   x="140.39999"
   y="259.20001"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000142891675905373829110000002180965004834423180_">
			<use
   xlink:href="#SVGID_00000011029234187289642830000001002733610602626190_"
   style="overflow:visible"
   id="use2597"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000142891675905373829110000002180965004834423180_)"
   id="g2608">
			<defs
   id="defs2601">
				<rect
   id="SVGID_00000141422604670182348840000005888163545933519544_"
   x="140.39999"
   y="259.20001"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000121978204195201218170000015854724327008394165_">
				<use
   xlink:href="#SVGID_00000141422604670182348840000005888163545933519544_"
   style="overflow:visible"
   id="use2603"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 142.9,260.4 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0.1 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000121978204195201218170000015854724327008394165_)"
   id="path2606" />
		</g>
	</g>
</g>
<g
   class="st19"
   id="g2632"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g2630">
		<defs
   id="defs2615">
			<rect
   id="SVGID_00000135677119844301340300000004439139867165716353_"
   x="162.5"
   y="259.10001"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000022530060480619887050000001338921915840885897_">
			<use
   xlink:href="#SVGID_00000135677119844301340300000004439139867165716353_"
   style="overflow:visible"
   id="use2617"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000022530060480619887050000001338921915840885897_)"
   id="g2628">
			<defs
   id="defs2621">
				<rect
   id="SVGID_00000062183282662859247290000004984819264373960067_"
   x="162.5"
   y="259.10001"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000016759728002537694980000018425455327710864804_">
				<use
   xlink:href="#SVGID_00000062183282662859247290000004984819264373960067_"
   style="overflow:visible"
   id="use2623"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 165.1,260.4 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000016759728002537694980000018425455327710864804_)"
   id="path2626" />
		</g>
	</g>
</g>
<g
   class="st60"
   id="g2652"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g2650">
		<defs
   id="defs2635">
			<rect
   id="SVGID_00000027569440878387073170000016565642428747179149_"
   x="141.3"
   y="250.39999"
   width="22.799999"
   height="19.9" />
		</defs>
		<clipPath
   id="SVGID_00000149360987815135471460000015931352477312917676_">
			<use
   xlink:href="#SVGID_00000027569440878387073170000016565642428747179149_"
   style="overflow:visible"
   id="use2637"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000149360987815135471460000015931352477312917676_)"
   id="g2648">
			<defs
   id="defs2641">
				<rect
   id="SVGID_00000134941945577177465710000018018992723330590130_"
   x="141.3"
   y="250.39999"
   width="22.799999"
   height="19.9" />
			</defs>
			<clipPath
   id="SVGID_00000054953890079967633320000013071434146776502694_">
				<use
   xlink:href="#SVGID_00000134941945577177465710000018018992723330590130_"
   style="overflow:visible"
   id="use2643"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			
				<polygon
   style="fill:none;stroke:#000000;stroke-width:0.5032;stroke-miterlimit:10"
   points="141.7,260.5 147.3,270.1 158.3,270 163.8,260.4 158.2,250.8 147.2,250.8 "
   clip-path="url(#SVGID_00000054953890079967633320000013071434146776502694_)"
   id="polygon2646" />
		</g>
	</g>
</g>
<g
   class="st19"
   id="g2672"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g2670">
		<defs
   id="defs2655">
			<rect
   id="SVGID_00000113330948597454717420000000990222440702716293_"
   x="162.60001"
   y="259.10001"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000059296369607477332770000017555684230792111242_">
			<use
   xlink:href="#SVGID_00000113330948597454717420000000990222440702716293_"
   style="overflow:visible"
   id="use2657"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000059296369607477332770000017555684230792111242_)"
   id="g2668">
			<defs
   id="defs2661">
				<rect
   id="SVGID_00000031174545455667673170000013827391754747360385_"
   x="162.60001"
   y="259.10001"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000000219059110147495130000008099447128260445091_">
				<use
   xlink:href="#SVGID_00000031174545455667673170000013827391754747360385_"
   style="overflow:visible"
   id="use2663"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 165.1,260.4 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000000219059110147495130000008099447128260445091_)"
   id="path2666" />
		</g>
	</g>
</g>
<g
   class="st22"
   id="g2692"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g2690">
		<defs
   id="defs2675">
			<rect
   id="SVGID_00000165914869412907505290000001342930714675498920_"
   x="173.60001"
   y="259.10001"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000084497294297566851900000014644104862811498923_">
			<use
   xlink:href="#SVGID_00000165914869412907505290000001342930714675498920_"
   style="overflow:visible"
   id="use2677"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000084497294297566851900000014644104862811498923_)"
   id="g2688">
			<defs
   id="defs2681">
				<rect
   id="SVGID_00000019674794371292981430000010308472999188865690_"
   x="173.60001"
   y="259.10001"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000094586375733715451070000017689007777967867290_">
				<use
   xlink:href="#SVGID_00000019674794371292981430000010308472999188865690_"
   style="overflow:visible"
   id="use2683"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 176.2,260.3 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000094586375733715451070000017689007777967867290_)"
   id="path2686" />
		</g>
	</g>
</g>
<g
   class="st111"
   id="g2712"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g2710">
		<defs
   id="defs2695">
			<rect
   id="SVGID_00000000924500452381028280000000208690885930955963_"
   x="162.60001"
   y="278.39999"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000078021819886633237870000017502271295235813036_">
			<use
   xlink:href="#SVGID_00000000924500452381028280000000208690885930955963_"
   style="overflow:visible"
   id="use2697"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000078021819886633237870000017502271295235813036_)"
   id="g2708">
			<defs
   id="defs2701">
				<rect
   id="SVGID_00000175290879347177344210000007190014961321119886_"
   x="162.60001"
   y="278.39999"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000155868258670087357480000007163741753620207272_">
				<use
   xlink:href="#SVGID_00000175290879347177344210000007190014961321119886_"
   style="overflow:visible"
   id="use2703"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 165.2,279.6 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.2,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000155868258670087357480000007163741753620207272_)"
   id="path2706" />
		</g>
	</g>
</g>
<g
   class="st111"
   id="g2732"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g2730">
		<defs
   id="defs2715">
			<rect
   id="SVGID_00000147915565313502751570000004036462219867996341_"
   x="173.7"
   y="278.29999"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000000926762108009906270000000310777751039919268_">
			<use
   xlink:href="#SVGID_00000147915565313502751570000004036462219867996341_"
   style="overflow:visible"
   id="use2717"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000000926762108009906270000000310777751039919268_)"
   id="g2728">
			<defs
   id="defs2721">
				<rect
   id="SVGID_00000163061378810351058060000011163099338581275049_"
   x="173.7"
   y="278.29999"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000105420288389405782930000013361154916645931953_">
				<use
   xlink:href="#SVGID_00000163061378810351058060000011163099338581275049_"
   style="overflow:visible"
   id="use2723"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 176.2,279.6 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000105420288389405782930000013361154916645931953_)"
   id="path2726" />
		</g>
	</g>
</g>
<g
   class="st19"
   id="g2752"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g2750">
		<defs
   id="defs2735">
			<rect
   id="SVGID_00000013909317158012814100000010569332995787535294_"
   x="157"
   y="268.79999"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000127016275432350121660000010204846911586208156_">
			<use
   xlink:href="#SVGID_00000013909317158012814100000010569332995787535294_"
   style="overflow:visible"
   id="use2737"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000127016275432350121660000010204846911586208156_)"
   id="g2748">
			<defs
   id="defs2741">
				<rect
   id="SVGID_00000068674030576251860200000014754358183992143767_"
   x="157"
   y="268.79999"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000018929686432402989070000013253500359135025337_">
				<use
   xlink:href="#SVGID_00000068674030576251860200000014754358183992143767_"
   style="overflow:visible"
   id="use2743"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 159.6,270 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000018929686432402989070000013253500359135025337_)"
   id="path2746" />
		</g>
	</g>
</g>
<g
   class="st22"
   id="g2772"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g2770">
		<defs
   id="defs2755">
			<rect
   id="SVGID_00000040537693317770605290000001563255680450831264_"
   x="179.2"
   y="268.70001"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000154385314541667992920000008603689290290998949_">
			<use
   xlink:href="#SVGID_00000040537693317770605290000001563255680450831264_"
   style="overflow:visible"
   id="use2757"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000154385314541667992920000008603689290290998949_)"
   id="g2768">
			<defs
   id="defs2761">
				<rect
   id="SVGID_00000124163578621323545700000001390019159728283304_"
   x="179.2"
   y="268.70001"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000015320659299891129610000014582330680982166682_">
				<use
   xlink:href="#SVGID_00000124163578621323545700000001390019159728283304_"
   style="overflow:visible"
   id="use2763"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 181.7,270 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000015320659299891129610000014582330680982166682_)"
   id="path2766" />
		</g>
	</g>
</g>
<g
   class="st120"
   id="g2792"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g2790">
		<defs
   id="defs2775">
			<rect
   id="SVGID_00000069370238062700789400000008396060192742503314_"
   x="158"
   y="260"
   width="22.9"
   height="19.9" />
		</defs>
		<clipPath
   id="SVGID_00000003095000075294399780000014417474588629378714_">
			<use
   xlink:href="#SVGID_00000069370238062700789400000008396060192742503314_"
   style="overflow:visible"
   id="use2777"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000003095000075294399780000014417474588629378714_)"
   id="g2788">
			<defs
   id="defs2781">
				<rect
   id="SVGID_00000060027257276922937470000010644577704109132420_"
   x="158"
   y="260"
   width="22.9"
   height="19.9" />
			</defs>
			<clipPath
   id="SVGID_00000086688944233932852080000011443088778683319719_">
				<use
   xlink:href="#SVGID_00000060027257276922937470000010644577704109132420_"
   style="overflow:visible"
   id="use2783"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			
				<polygon
   style="fill:none;stroke:#000000;stroke-width:0.5032;stroke-miterlimit:10"
   points="158.3,270 163.9,279.6 174.9,279.6 180.4,270 174.9,260.4 163.8,260.4 "
   clip-path="url(#SVGID_00000086688944233932852080000011443088778683319719_)"
   id="polygon2786" />
		</g>
	</g>
</g>
<g
   class="st22"
   id="g2812"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g2810">
		<defs
   id="defs2795">
			<rect
   id="SVGID_00000002382544242787018280000008965144705529031060_"
   x="179.2"
   y="268.70001"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000106111788381550225570000000543387934352253616_">
			<use
   xlink:href="#SVGID_00000002382544242787018280000008965144705529031060_"
   style="overflow:visible"
   id="use2797"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000106111788381550225570000000543387934352253616_)"
   id="g2808">
			<defs
   id="defs2801">
				<rect
   id="SVGID_00000124136892007347506720000004901034345081984439_"
   x="179.2"
   y="268.70001"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000095302342723066937640000010421054933682041737_">
				<use
   xlink:href="#SVGID_00000124136892007347506720000004901034345081984439_"
   style="overflow:visible"
   id="use2803"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 181.7,270 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000095302342723066937640000010421054933682041737_)"
   id="path2806" />
		</g>
	</g>
</g>
<g
   class="st22"
   id="g2832"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g2830">
		<defs
   id="defs2815">
			<rect
   id="SVGID_00000080200510353168403570000012676569806770976188_"
   x="190.3"
   y="268.70001"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000014608981512682077320000001177801791684949131_">
			<use
   xlink:href="#SVGID_00000080200510353168403570000012676569806770976188_"
   style="overflow:visible"
   id="use2817"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000014608981512682077320000001177801791684949131_)"
   id="g2828">
			<defs
   id="defs2821">
				<rect
   id="SVGID_00000158727548026974564640000003222894567234103199_"
   x="190.3"
   y="268.70001"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000175281129018855742560000018248248932155836334_">
				<use
   xlink:href="#SVGID_00000158727548026974564640000003222894567234103199_"
   style="overflow:visible"
   id="use2823"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 192.8,269.9 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000175281129018855742560000018248248932155836334_)"
   id="path2826" />
		</g>
	</g>
</g>
<g
   class="st5"
   id="g2852"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g2850">
		<defs
   id="defs2835">
			<rect
   id="SVGID_00000062188079383093205510000015817473048077096598_"
   x="179.3"
   y="288"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000073691107616929723050000002450534612453269388_">
			<use
   xlink:href="#SVGID_00000062188079383093205510000015817473048077096598_"
   style="overflow:visible"
   id="use2837"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000073691107616929723050000002450534612453269388_)"
   id="g2848">
			<defs
   id="defs2841">
				<rect
   id="SVGID_00000181809358352130240950000009859702783538728582_"
   x="179.3"
   y="288"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000132069428935530600590000011398993336794675111_">
				<use
   xlink:href="#SVGID_00000181809358352130240950000009859702783538728582_"
   style="overflow:visible"
   id="use2843"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 181.8,289.2 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000132069428935530600590000011398993336794675111_)"
   id="path2846" />
		</g>
	</g>
</g>
<g
   class="st5"
   id="g2872"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g2870">
		<defs
   id="defs2855">
			<rect
   id="SVGID_00000070805801235895250440000002937947969312781997_"
   x="190.3"
   y="287.89999"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000134231681885665411120000007012327322580624526_">
			<use
   xlink:href="#SVGID_00000070805801235895250440000002937947969312781997_"
   style="overflow:visible"
   id="use2857"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000134231681885665411120000007012327322580624526_)"
   id="g2868">
			<defs
   id="defs2861">
				<rect
   id="SVGID_00000011021567508820294330000000546476313195433865_"
   x="190.3"
   y="287.89999"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000033345240081005181730000007632945207203831214_">
				<use
   xlink:href="#SVGID_00000011021567508820294330000000546476313195433865_"
   style="overflow:visible"
   id="use2863"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 192.9,289.2 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000033345240081005181730000007632945207203831214_)"
   id="path2866" />
		</g>
	</g>
</g>
<g
   class="st111"
   id="g2892"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g2890">
		<defs
   id="defs2875">
			<rect
   id="SVGID_00000107582143994475758250000017257935691781890739_"
   x="173.7"
   y="278.29999"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000008831098970346502720000005409541746307440015_">
			<use
   xlink:href="#SVGID_00000107582143994475758250000017257935691781890739_"
   style="overflow:visible"
   id="use2877"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000008831098970346502720000005409541746307440015_)"
   id="g2888">
			<defs
   id="defs2881">
				<rect
   id="SVGID_00000173140135378033035500000015463674873572153260_"
   x="173.7"
   y="278.29999"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000133503808086234557450000012077907946412398985_">
				<use
   xlink:href="#SVGID_00000173140135378033035500000015463674873572153260_"
   style="overflow:visible"
   id="use2883"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 176.2,279.6 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000133503808086234557450000012077907946412398985_)"
   id="path2886" />
		</g>
	</g>
</g>
<g
   class="st111"
   id="g2912"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g2910">
		<defs
   id="defs2895">
			<rect
   id="SVGID_00000002351074816919128270000004823990653513210813_"
   x="195.8"
   y="278.29999"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000027599658198998139920000017442720277320510371_">
			<use
   xlink:href="#SVGID_00000002351074816919128270000004823990653513210813_"
   style="overflow:visible"
   id="use2897"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000027599658198998139920000017442720277320510371_)"
   id="g2908">
			<defs
   id="defs2901">
				<rect
   id="SVGID_00000045609231529242599950000005596628916567148958_"
   x="195.8"
   y="278.29999"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000104685785305327076870000008526155548282636690_">
				<use
   xlink:href="#SVGID_00000045609231529242599950000005596628916567148958_"
   style="overflow:visible"
   id="use2903"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 198.3,279.6 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000104685785305327076870000008526155548282636690_)"
   id="path2906" />
		</g>
	</g>
</g>
<g
   class="st120"
   id="g2932"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g2930">
		<defs
   id="defs2915">
			<rect
   id="SVGID_00000047061303299539380800000016432224446877947020_"
   x="174.60001"
   y="269.60001"
   width="22.9"
   height="19.9" />
		</defs>
		<clipPath
   id="SVGID_00000151538183518752751230000015387065780440147584_">
			<use
   xlink:href="#SVGID_00000047061303299539380800000016432224446877947020_"
   style="overflow:visible"
   id="use2917"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000151538183518752751230000015387065780440147584_)"
   id="g2928">
			<defs
   id="defs2921">
				<rect
   id="SVGID_00000066488939918078421600000015610265031692295299_"
   x="174.60001"
   y="269.60001"
   width="22.799999"
   height="19.9" />
			</defs>
			<clipPath
   id="SVGID_00000018931845638487965820000005387658972643171260_">
				<use
   xlink:href="#SVGID_00000066488939918078421600000015610265031692295299_"
   style="overflow:visible"
   id="use2923"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			
				<polygon
   style="fill:none;stroke:#000000;stroke-width:0.5032;stroke-miterlimit:10"
   points="175,279.6 180.5,289.2 191.6,289.2 197.1,279.5 191.5,269.9 180.5,270 "
   clip-path="url(#SVGID_00000018931845638487965820000005387658972643171260_)"
   id="polygon2926" />
		</g>
	</g>
</g>
<g
   class="st111"
   id="g2952"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g2950">
		<defs
   id="defs2935">
			<rect
   id="SVGID_00000163786514087142346940000014134623433740797869_"
   x="195.8"
   y="278.29999"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000134957013679579699700000000306125217631635124_">
			<use
   xlink:href="#SVGID_00000163786514087142346940000014134623433740797869_"
   style="overflow:visible"
   id="use2937"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000134957013679579699700000000306125217631635124_)"
   id="g2948">
			<defs
   id="defs2941">
				<rect
   id="SVGID_00000103227720837573287160000002083318550653964950_"
   x="195.8"
   y="278.29999"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000141418712607972502770000015749592157730611867_">
				<use
   xlink:href="#SVGID_00000103227720837573287160000002083318550653964950_"
   style="overflow:visible"
   id="use2943"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 198.4,279.6 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000141418712607972502770000015749592157730611867_)"
   id="path2946" />
		</g>
	</g>
</g>
<g
   class="st111"
   id="g2972"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g2970">
		<defs
   id="defs2955">
			<rect
   id="SVGID_00000136411707486098466910000002413060105771259555_"
   x="206.89999"
   y="278.20001"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000021800236161374187370000018194898827911853721_">
			<use
   xlink:href="#SVGID_00000136411707486098466910000002413060105771259555_"
   style="overflow:visible"
   id="use2957"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000021800236161374187370000018194898827911853721_)"
   id="g2968">
			<defs
   id="defs2961">
				<rect
   id="SVGID_00000055680315172889915070000012289991404827392405_"
   x="206.89999"
   y="278.20001"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000096749388514203672950000013097032493706726575_">
				<use
   xlink:href="#SVGID_00000055680315172889915070000012289991404827392405_"
   style="overflow:visible"
   id="use2963"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 209.4,279.5 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000096749388514203672950000013097032493706726575_)"
   id="path2966" />
		</g>
	</g>
</g>
<g
   class="st5"
   id="g2992"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g2990">
		<defs
   id="defs2975">
			<rect
   id="SVGID_00000099662858067729919730000007619495880314795170_"
   x="190.3"
   y="287.89999"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000089536499055806032070000009460040098231392945_">
			<use
   xlink:href="#SVGID_00000099662858067729919730000007619495880314795170_"
   style="overflow:visible"
   id="use2977"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000089536499055806032070000009460040098231392945_)"
   id="g2988">
			<defs
   id="defs2981">
				<rect
   id="SVGID_00000132059252234375154470000001457000315595753861_"
   x="190.3"
   y="287.89999"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000183941685391410553000000012048356239781611415_">
				<use
   xlink:href="#SVGID_00000132059252234375154470000001457000315595753861_"
   style="overflow:visible"
   id="use2983"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 192.8,289.2 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000183941685391410553000000012048356239781611415_)"
   id="path2986" />
		</g>
	</g>
</g>
<g
   class="st5"
   id="g3012"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g3010">
		<defs
   id="defs2995">
			<rect
   id="SVGID_00000164492517796484939060000005153595213225390500_"
   x="212.5"
   y="287.89999"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000108998762404863253720000011463609615198086798_">
			<use
   xlink:href="#SVGID_00000164492517796484939060000005153595213225390500_"
   style="overflow:visible"
   id="use2997"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000108998762404863253720000011463609615198086798_)"
   id="g3008">
			<defs
   id="defs3001">
				<rect
   id="SVGID_00000075138075450496524530000018241863016360427675_"
   x="212.5"
   y="287.89999"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000143615661451200736600000001348171172219329944_">
				<use
   xlink:href="#SVGID_00000075138075450496524530000018241863016360427675_"
   style="overflow:visible"
   id="use3003"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 215,289.2 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000143615661451200736600000001348171172219329944_)"
   id="path3006" />
		</g>
	</g>
</g>
<g
   class="st5"
   id="g3032"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g3030">
		<defs
   id="defs3015">
			<rect
   id="SVGID_00000168814646267714988860000010849914853550226611_"
   x="191.2"
   y="279.20001"
   width="22.799999"
   height="19.9" />
		</defs>
		<clipPath
   id="SVGID_00000132766624688396585330000009466765411008402830_">
			<use
   xlink:href="#SVGID_00000168814646267714988860000010849914853550226611_"
   style="overflow:visible"
   id="use3017"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000132766624688396585330000009466765411008402830_)"
   id="g3028">
			<defs
   id="defs3021">
				<rect
   id="SVGID_00000181784423753205552450000014844275730386747022_"
   x="191.2"
   y="279.20001"
   width="22.799999"
   height="19.9" />
			</defs>
			<clipPath
   id="SVGID_00000091711057108929114550000011444802131434580867_">
				<use
   xlink:href="#SVGID_00000181784423753205552450000014844275730386747022_"
   style="overflow:visible"
   id="use3023"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			
				<polygon
   style="fill:none;stroke:#000000;stroke-width:0.5032;stroke-miterlimit:10"
   points="191.6,289.2 197.2,298.8 208.2,298.8 213.7,289.1 208.1,279.5 197.1,279.6 "
   clip-path="url(#SVGID_00000091711057108929114550000011444802131434580867_)"
   id="polygon3026" />
		</g>
	</g>
</g>
<g
   class="st5"
   id="g3052"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g3050">
		<defs
   id="defs3035">
			<rect
   id="SVGID_00000055671633164421324020000012024571349088968610_"
   x="212.5"
   y="287.89999"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000082326938874481816960000001268073114159258763_">
			<use
   xlink:href="#SVGID_00000055671633164421324020000012024571349088968610_"
   style="overflow:visible"
   id="use3037"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000082326938874481816960000001268073114159258763_)"
   id="g3048">
			<defs
   id="defs3041">
				<rect
   id="SVGID_00000079475982096916953220000010976318460959549862_"
   x="212.5"
   y="287.89999"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000101804360809130277300000011524495419196901557_">
				<use
   xlink:href="#SVGID_00000079475982096916953220000010976318460959549862_"
   style="overflow:visible"
   id="use3043"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 215,289.1 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000101804360809130277300000011524495419196901557_)"
   id="path3046" />
		</g>
	</g>
</g>
<g
   class="st5"
   id="g3072"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g3070">
		<defs
   id="defs3055">
			<rect
   id="SVGID_00000151531501795939166450000009459393570193379745_"
   x="223.39999"
   y="307"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000072972882066155106180000015239471440564937634_">
			<use
   xlink:href="#SVGID_00000151531501795939166450000009459393570193379745_"
   style="overflow:visible"
   id="use3057"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000072972882066155106180000015239471440564937634_)"
   id="g3068">
			<defs
   id="defs3061">
				<rect
   id="SVGID_00000012474733196399616120000016557129240391254438_"
   x="223.39999"
   y="307"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000010297479166953189370000016502202958550610846_">
				<use
   xlink:href="#SVGID_00000012474733196399616120000016557129240391254438_"
   style="overflow:visible"
   id="use3063"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 226,308.3 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000010297479166953189370000016502202958550610846_)"
   id="path3066" />
		</g>
	</g>
</g>
<g
   class="st5"
   id="g3092"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g3090">
		<defs
   id="defs3075">
			<rect
   id="SVGID_00000147907019710471196590000016796065379533064099_"
   x="228.89999"
   y="297.60001"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000047743036840895250900000005815112700868939449_">
			<use
   xlink:href="#SVGID_00000147907019710471196590000016796065379533064099_"
   style="overflow:visible"
   id="use3077"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000047743036840895250900000005815112700868939449_)"
   id="g3088">
			<defs
   id="defs3081">
				<rect
   id="SVGID_00000072978996632942800870000001963735011837974961_"
   x="228.89999"
   y="297.60001"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000074405081492533053060000011574254353374608272_">
				<use
   xlink:href="#SVGID_00000072978996632942800870000001963735011837974961_"
   style="overflow:visible"
   id="use3083"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 231.5,298.8 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000074405081492533053060000011574254353374608272_)"
   id="path3086" />
		</g>
	</g>
</g>
<g
   class="st111"
   id="g3112"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g3110">
		<defs
   id="defs3095">
			<rect
   id="SVGID_00000035495294134155982100000011228350811229076652_"
   x="228.89999"
   y="278.10001"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000097467922574080089320000009625435850601510318_">
			<use
   xlink:href="#SVGID_00000035495294134155982100000011228350811229076652_"
   style="overflow:visible"
   id="use3097"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000097467922574080089320000009625435850601510318_)"
   id="g3108">
			<defs
   id="defs3101">
				<rect
   id="SVGID_00000147182581132282017140000015857442785092585645_"
   x="228.89999"
   y="278.10001"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000094576599368996555190000017158766896597138592_">
				<use
   xlink:href="#SVGID_00000147182581132282017140000015857442785092585645_"
   style="overflow:visible"
   id="use3103"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 231.5,279.4 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000094576599368996555190000017158766896597138592_)"
   id="path3106" />
		</g>
	</g>
</g>
<path
   class="st0"
   d="m 124.3,77.852917 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   id="path3114" />
<g
   class="st5"
   id="g3134"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g3132">
		<defs
   id="defs3117">
			<rect
   id="SVGID_00000117661237276598920290000013833074992594598817_"
   x="212.5"
   y="307.10001"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000165943806243359739180000009887762777331418526_">
			<use
   xlink:href="#SVGID_00000117661237276598920290000013833074992594598817_"
   style="overflow:visible"
   id="use3119"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000165943806243359739180000009887762777331418526_)"
   id="g3130">
			<defs
   id="defs3123">
				<rect
   id="SVGID_00000143611748786861505000000011817612555218580392_"
   x="212.5"
   y="307.10001"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000001649612513518240890000004481105948248641191_">
				<use
   xlink:href="#SVGID_00000143611748786861505000000011817612555218580392_"
   style="overflow:visible"
   id="use3125"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 215,308.4 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000001649612513518240890000004481105948248641191_)"
   id="path3128" />
		</g>
	</g>
</g>
<g
   class="st5"
   id="g3154"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g3152">
		<defs
   id="defs3137">
			<rect
   id="SVGID_00000081633781650449906850000010876568406835301040_"
   x="190.3"
   y="307"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000145054561451559021040000016866643644008262805_">
			<use
   xlink:href="#SVGID_00000081633781650449906850000010876568406835301040_"
   style="overflow:visible"
   id="use3139"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000145054561451559021040000016866643644008262805_)"
   id="g3150">
			<defs
   id="defs3143">
				<rect
   id="SVGID_00000168113318826671891810000013938896485212753306_"
   x="190.3"
   y="307"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000008870209379235947340000004753757658492084139_">
				<use
   xlink:href="#SVGID_00000168113318826671891810000013938896485212753306_"
   style="overflow:visible"
   id="use3145"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 192.8,308.3 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000008870209379235947340000004753757658492084139_)"
   id="path3148" />
		</g>
	</g>
</g>
<g
   class="st5"
   id="g3174"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g3172">
		<defs
   id="defs3157">
			<rect
   id="SVGID_00000029014185236578850670000010283125909115931040_"
   x="179.39999"
   y="307.10001"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000121264946665891996010000013155920301151641482_">
			<use
   xlink:href="#SVGID_00000029014185236578850670000010283125909115931040_"
   style="overflow:visible"
   id="use3159"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000121264946665891996010000013155920301151641482_)"
   id="g3170">
			<defs
   id="defs3163">
				<rect
   id="SVGID_00000065033056342330803220000002572445460982185119_"
   x="179.39999"
   y="307.10001"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000049941210681132727250000001774956259465635998_">
				<use
   xlink:href="#SVGID_00000065033056342330803220000002572445460982185119_"
   style="overflow:visible"
   id="use3165"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 181.9,308.4 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000049941210681132727250000001774956259465635998_)"
   id="path3168" />
		</g>
	</g>
</g>
<g
   class="st5"
   id="g3194"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g3192">
		<defs
   id="defs3177">
			<rect
   id="SVGID_00000116930154699275806450000004917125857512478612_"
   x="173.8"
   y="297.60001"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000105389514013401424660000005198680106417480605_">
			<use
   xlink:href="#SVGID_00000116930154699275806450000004917125857512478612_"
   style="overflow:visible"
   id="use3179"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000105389514013401424660000005198680106417480605_)"
   id="g3190">
			<defs
   id="defs3183">
				<rect
   id="SVGID_00000084501105595365913220000000264709578816497050_"
   x="173.8"
   y="297.60001"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000083088219545323160090000003074876214939991440_">
				<use
   xlink:href="#SVGID_00000084501105595365913220000000264709578816497050_"
   style="overflow:visible"
   id="use3185"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 176.3,298.9 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000083088219545323160090000003074876214939991440_)"
   id="path3188" />
		</g>
	</g>
</g>
<g
   class="st5"
   id="g3214"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g3212">
		<defs
   id="defs3197">
			<rect
   id="SVGID_00000102517965540993044530000005538907420252271290_"
   x="162.89999"
   y="297.70001"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000075844765153606058830000013221431750607553946_">
			<use
   xlink:href="#SVGID_00000102517965540993044530000005538907420252271290_"
   style="overflow:visible"
   id="use3199"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000075844765153606058830000013221431750607553946_)"
   id="g3210">
			<defs
   id="defs3203">
				<rect
   id="SVGID_00000049218509233928690220000018053127873910912660_"
   x="162.89999"
   y="297.70001"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000008117811880873580960000009843078539054379429_">
				<use
   xlink:href="#SVGID_00000049218509233928690220000018053127873910912660_"
   style="overflow:visible"
   id="use3205"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 165.4,299 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000008117811880873580960000009843078539054379429_)"
   id="path3208" />
		</g>
	</g>
</g>
<g
   class="st5"
   id="g3234"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g3232">
		<defs
   id="defs3217">
			<rect
   id="SVGID_00000167376218425991524610000017640332275290223774_"
   x="206.89999"
   y="297.60001"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000047043848945544433880000000360916765958899380_">
			<use
   xlink:href="#SVGID_00000167376218425991524610000017640332275290223774_"
   style="overflow:visible"
   id="use3219"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000047043848945544433880000000360916765958899380_)"
   id="g3230">
			<defs
   id="defs3223">
				<rect
   id="SVGID_00000136381127503193179020000003294323575281083542_"
   x="206.89999"
   y="297.60001"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000015336300499411968580000012799061331213654670_">
				<use
   xlink:href="#SVGID_00000136381127503193179020000003294323575281083542_"
   style="overflow:visible"
   id="use3225"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 209.4,298.9 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000015336300499411968580000012799061331213654670_)"
   id="path3228" />
		</g>
	</g>
</g>
<g
   class="st5"
   id="g3254"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g3252">
		<defs
   id="defs3237">
			<rect
   id="SVGID_00000052098283700869694720000014213956930021299127_"
   x="196"
   y="297.70001"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000080893930648333910280000011479476885004395907_">
			<use
   xlink:href="#SVGID_00000052098283700869694720000014213956930021299127_"
   style="overflow:visible"
   id="use3239"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000080893930648333910280000011479476885004395907_)"
   id="g3250">
			<defs
   id="defs3243">
				<rect
   id="SVGID_00000066508865284250459750000013702844731715750065_"
   x="196"
   y="297.70001"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000016061121408677520230000014855725068410352786_">
				<use
   xlink:href="#SVGID_00000066508865284250459750000013702844731715750065_"
   style="overflow:visible"
   id="use3245"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 198.5,299 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000016061121408677520230000014855725068410352786_)"
   id="path3248" />
		</g>
	</g>
</g>
<g
   class="st5"
   id="g3274"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g3272">
		<defs
   id="defs3257">
			<rect
   id="SVGID_00000107547133982611819020000000314178519322850176_"
   x="207.89999"
   y="288.79999"
   width="22.9"
   height="19.9" />
		</defs>
		<clipPath
   id="SVGID_00000002382608990367185300000008202322759106664890_">
			<use
   xlink:href="#SVGID_00000107547133982611819020000000314178519322850176_"
   style="overflow:visible"
   id="use3259"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000002382608990367185300000008202322759106664890_)"
   id="g3270">
			<defs
   id="defs3263">
				<rect
   id="SVGID_00000010995096035759050450000010435337927616741805_"
   x="207.89999"
   y="288.79999"
   width="22.799999"
   height="19.9" />
			</defs>
			<clipPath
   id="SVGID_00000087407066025208214920000005945823191741951413_">
				<use
   xlink:href="#SVGID_00000010995096035759050450000010435337927616741805_"
   style="overflow:visible"
   id="use3265"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			
				<polygon
   style="fill:none;stroke:#000000;stroke-width:0.5032;stroke-miterlimit:10"
   points="208.2,298.8 213.8,308.4 224.9,308.4 230.3,298.7 224.8,289.1 213.7,289.1 "
   clip-path="url(#SVGID_00000087407066025208214920000005945823191741951413_)"
   id="polygon3268" />
		</g>
	</g>
</g>
<g
   class="st57"
   id="g3294"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g3292">
		<defs
   id="defs3277">
			<rect
   id="SVGID_00000078018702637145546960000010087484008301120159_"
   x="123.8"
   y="249.60001"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000075142372852816873570000005418370371551694261_">
			<use
   xlink:href="#SVGID_00000078018702637145546960000010087484008301120159_"
   style="overflow:visible"
   id="use3279"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000075142372852816873570000005418370371551694261_)"
   id="g3290">
			<defs
   id="defs3283">
				<rect
   id="SVGID_00000124866759746032999090000017370082113838482079_"
   x="123.8"
   y="249.60001"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000109010830590654302830000006711764755578112644_">
				<use
   xlink:href="#SVGID_00000124866759746032999090000017370082113838482079_"
   style="overflow:visible"
   id="use3285"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 126.3,250.9 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000109010830590654302830000006711764755578112644_)"
   id="path3288" />
		</g>
	</g>
</g>
<g
   class="st57"
   id="g3314"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g3312">
		<defs
   id="defs3297">
			<rect
   id="SVGID_00000045579302289379578250000009464530534582668465_"
   x="112.6"
   y="249.60001"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000120520766882945078700000001781734152597448635_">
			<use
   xlink:href="#SVGID_00000045579302289379578250000009464530534582668465_"
   style="overflow:visible"
   id="use3299"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000120520766882945078700000001781734152597448635_)"
   id="g3310">
			<defs
   id="defs3303">
				<rect
   id="SVGID_00000147932523013533624820000011850129182235187877_"
   x="112.6"
   y="249.60001"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000008827294240659814730000007847634210495495837_">
				<use
   xlink:href="#SVGID_00000147932523013533624820000011850129182235187877_"
   style="overflow:visible"
   id="use3305"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 115.1,250.9 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000008827294240659814730000007847634210495495837_)"
   id="path3308" />
		</g>
	</g>
</g>
<g
   class="st57"
   id="g3334"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g3332">
		<defs
   id="defs3317">
			<rect
   id="SVGID_00000049915405512581186470000004614552191111060900_"
   x="112.6"
   y="268.79999"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000162354598875007358350000012091649906024073886_">
			<use
   xlink:href="#SVGID_00000049915405512581186470000004614552191111060900_"
   style="overflow:visible"
   id="use3319"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000162354598875007358350000012091649906024073886_)"
   id="g3330">
			<defs
   id="defs3323">
				<rect
   id="SVGID_00000081644656861330594430000004803643230085161898_"
   x="112.6"
   y="268.79999"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000078042169540758785390000001684583452978628763_">
				<use
   xlink:href="#SVGID_00000081644656861330594430000004803643230085161898_"
   style="overflow:visible"
   id="use3325"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 115.1,270 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000078042169540758785390000001684583452978628763_)"
   id="path3328" />
		</g>
	</g>
</g>
<g
   class="st57"
   id="g3354"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g3352">
		<defs
   id="defs3337">
			<rect
   id="SVGID_00000162345483247200135900000011835336154740213658_"
   x="107.2"
   y="259.29999"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000008842025920211247640000011385211474443841410_">
			<use
   xlink:href="#SVGID_00000162345483247200135900000011835336154740213658_"
   style="overflow:visible"
   id="use3339"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000008842025920211247640000011385211474443841410_)"
   id="g3350">
			<defs
   id="defs3343">
				<rect
   id="SVGID_00000036968880632293954090000015170348546637063103_"
   x="107.2"
   y="259.29999"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000100367084605370105260000007268704187327401358_">
				<use
   xlink:href="#SVGID_00000036968880632293954090000015170348546637063103_"
   style="overflow:visible"
   id="use3345"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 109.7,260.5 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0.1 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000100367084605370105260000007268704187327401358_)"
   id="path3348" />
		</g>
	</g>
</g>
<g
   class="st57"
   id="g3374"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g3372">
		<defs
   id="defs3357">
			<rect
   id="SVGID_00000017478412194385759980000017103486351589139595_"
   x="108.1"
   y="250.5"
   width="22.9"
   height="19.9" />
		</defs>
		<clipPath
   id="SVGID_00000026846251330162906300000001518483764023799993_">
			<use
   xlink:href="#SVGID_00000017478412194385759980000017103486351589139595_"
   style="overflow:visible"
   id="use3359"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000026846251330162906300000001518483764023799993_)"
   id="g3370">
			<defs
   id="defs3363">
				<rect
   id="SVGID_00000036253394112421297730000012095072321384241815_"
   x="108.1"
   y="250.5"
   width="22.9"
   height="19.9" />
			</defs>
			<clipPath
   id="SVGID_00000045604603245050895030000014154395760794076306_">
				<use
   xlink:href="#SVGID_00000036253394112421297730000012095072321384241815_"
   style="overflow:visible"
   id="use3365"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			
				<polygon
   style="fill:none;stroke:#000000;stroke-width:0.5032;stroke-miterlimit:10"
   points="108.5,260.5 114.1,270.1 125.1,270.1 130.6,260.5 125.1,250.9 114,250.9 "
   clip-path="url(#SVGID_00000045604603245050895030000014154395760794076306_)"
   id="polygon3368" />
		</g>
	</g>
</g>
<g
   class="st57"
   id="g3394"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g3392">
		<defs
   id="defs3377">
			<rect
   id="SVGID_00000165210175273846520630000005130007971392092803_"
   x="107.2"
   y="259.29999"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000149355671110422490590000015160282054798324627_">
			<use
   xlink:href="#SVGID_00000165210175273846520630000005130007971392092803_"
   style="overflow:visible"
   id="use3379"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000149355671110422490590000015160282054798324627_)"
   id="g3390">
			<defs
   id="defs3383">
				<rect
   id="SVGID_00000066515561051922962500000017076914362214648764_"
   x="107.2"
   y="259.29999"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000034064459632831223350000017060134644784778160_">
				<use
   xlink:href="#SVGID_00000066515561051922962500000017076914362214648764_"
   style="overflow:visible"
   id="use3385"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 109.8,260.5 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000034064459632831223350000017060134644784778160_)"
   id="path3388" />
		</g>
	</g>
</g>
<g
   class="st57"
   id="g3414"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g3412">
		<defs
   id="defs3397">
			<rect
   id="SVGID_00000110433998787401645570000003186336754317086849_"
   x="123.8"
   y="268.79999"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000017510326491627163390000010190602965882497685_">
			<use
   xlink:href="#SVGID_00000110433998787401645570000003186336754317086849_"
   style="overflow:visible"
   id="use3399"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000017510326491627163390000010190602965882497685_)"
   id="g3410">
			<defs
   id="defs3403">
				<rect
   id="SVGID_00000078736625585705165750000003383305352261911206_"
   x="123.8"
   y="268.79999"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000118357209196220826530000011910614623768358799_">
				<use
   xlink:href="#SVGID_00000078736625585705165750000003383305352261911206_"
   style="overflow:visible"
   id="use3405"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 126.4,270.1 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000118357209196220826530000011910614623768358799_)"
   id="path3408" />
		</g>
	</g>
</g>
<g
   class="st57"
   id="g3434"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g3432">
		<defs
   id="defs3417">
			<rect
   id="SVGID_00000034054223999776259420000006538844645544503998_"
   x="129.3"
   y="259.20001"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000144327701516045631130000000491875377405744831_">
			<use
   xlink:href="#SVGID_00000034054223999776259420000006538844645544503998_"
   style="overflow:visible"
   id="use3419"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000144327701516045631130000000491875377405744831_)"
   id="g3430">
			<defs
   id="defs3423">
				<rect
   id="SVGID_00000155117343524023472830000012182886534600992673_"
   x="129.3"
   y="259.20001"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000119080546663422586560000015605678740809878185_">
				<use
   xlink:href="#SVGID_00000155117343524023472830000012182886534600992673_"
   style="overflow:visible"
   id="use3425"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 131.9,260.5 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000119080546663422586560000015605678740809878185_)"
   id="path3428" />
		</g>
	</g>
</g>
<g
   class="st57"
   id="g3454"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g3452">
		<defs
   id="defs3437">
			<rect
   id="SVGID_00000017492904770557173670000006249153044136743356_"
   x="129.3"
   y="259.20001"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000172400110495237789700000011665049573788248210_">
			<use
   xlink:href="#SVGID_00000017492904770557173670000006249153044136743356_"
   style="overflow:visible"
   id="use3439"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000172400110495237789700000011665049573788248210_)"
   id="g3450">
			<defs
   id="defs3443">
				<rect
   id="SVGID_00000079480657323065830770000007629998554161904056_"
   x="129.3"
   y="259.20001"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000174559824366196862410000001947181990176105101_">
				<use
   xlink:href="#SVGID_00000079480657323065830770000007629998554161904056_"
   style="overflow:visible"
   id="use3445"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 131.9,260.5 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000174559824366196862410000001947181990176105101_)"
   id="path3448" />
		</g>
	</g>
</g>
<g
   class="st60"
   id="g3474"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g3472">
		<defs
   id="defs3457">
			<rect
   id="SVGID_00000134216992591847493060000003184258015077919648_"
   x="140.39999"
   y="259.20001"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000180336274278446929070000017364797336377924793_">
			<use
   xlink:href="#SVGID_00000134216992591847493060000003184258015077919648_"
   style="overflow:visible"
   id="use3459"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000180336274278446929070000017364797336377924793_)"
   id="g3470">
			<defs
   id="defs3463">
				<rect
   id="SVGID_00000149371845527977045340000006655466191497147776_"
   x="140.39999"
   y="259.20001"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000096768071746165328560000004632290484366237057_">
				<use
   xlink:href="#SVGID_00000149371845527977045340000006655466191497147776_"
   style="overflow:visible"
   id="use3465"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 142.9,260.5 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.5 1.3,1.3"
   clip-path="url(#SVGID_00000096768071746165328560000004632290484366237057_)"
   id="path3468" />
		</g>
	</g>
</g>
<g
   class="st60"
   id="g3494"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g3492">
		<defs
   id="defs3477">
			<rect
   id="SVGID_00000109733329019895648140000009450745549261531271_"
   x="140.5"
   y="278.39999"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000050645722931362185280000010577887189935052700_">
			<use
   xlink:href="#SVGID_00000109733329019895648140000009450745549261531271_"
   style="overflow:visible"
   id="use3479"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000050645722931362185280000010577887189935052700_)"
   id="g3490">
			<defs
   id="defs3483">
				<rect
   id="SVGID_00000011742634327900656420000014998298969319678618_"
   x="140.5"
   y="278.39999"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000155847522171423934140000012048683591274151853_">
				<use
   xlink:href="#SVGID_00000011742634327900656420000014998298969319678618_"
   style="overflow:visible"
   id="use3485"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 143,279.7 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000155847522171423934140000012048683591274151853_)"
   id="path3488" />
		</g>
	</g>
</g>
<g
   class="st57"
   id="g3514"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g3512">
		<defs
   id="defs3497">
			<rect
   id="SVGID_00000065042277765850442380000016048298715340058807_"
   x="123.8"
   y="268.89999"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000150813033774139309060000012518931629533640066_">
			<use
   xlink:href="#SVGID_00000065042277765850442380000016048298715340058807_"
   style="overflow:visible"
   id="use3499"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000150813033774139309060000012518931629533640066_)"
   id="g3510">
			<defs
   id="defs3503">
				<rect
   id="SVGID_00000173137190594675862730000006905451054104397741_"
   x="123.8"
   y="268.89999"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000092456802567504008440000003822846728245204360_">
				<use
   xlink:href="#SVGID_00000173137190594675862730000006905451054104397741_"
   style="overflow:visible"
   id="use3505"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 126.4,270.1 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.2,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000092456802567504008440000003822846728245204360_)"
   id="path3508" />
		</g>
	</g>
</g>
<g
   class="st60"
   id="g3534"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g3532">
		<defs
   id="defs3517">
			<rect
   id="SVGID_00000150078130807630174460000011734547577600602761_"
   x="146"
   y="268.79999"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000065782143295435069980000009548504798337399954_">
			<use
   xlink:href="#SVGID_00000150078130807630174460000011734547577600602761_"
   style="overflow:visible"
   id="use3519"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000065782143295435069980000009548504798337399954_)"
   id="g3530">
			<defs
   id="defs3523">
				<rect
   id="SVGID_00000088833976825787569060000001071819165109654437_"
   x="146"
   y="268.79999"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000034780270934860353420000004877082759531621286_">
				<use
   xlink:href="#SVGID_00000088833976825787569060000001071819165109654437_"
   style="overflow:visible"
   id="use3525"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 148.5,270.1 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000034780270934860353420000004877082759531621286_)"
   id="path3528" />
		</g>
	</g>
</g>
<g
   class="st57"
   id="g3554"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g3552">
		<defs
   id="defs3537">
			<rect
   id="SVGID_00000180346731883721535270000015171238738319296659_"
   x="124.7"
   y="260.10001"
   width="22.799999"
   height="19.9" />
		</defs>
		<clipPath
   id="SVGID_00000163051707748703048750000007507485319917106614_">
			<use
   xlink:href="#SVGID_00000180346731883721535270000015171238738319296659_"
   style="overflow:visible"
   id="use3539"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000163051707748703048750000007507485319917106614_)"
   id="g3550">
			<defs
   id="defs3543">
				<rect
   id="SVGID_00000035489770265935316260000005389636485867387322_"
   x="124.7"
   y="260.10001"
   width="22.799999"
   height="19.9" />
			</defs>
			<clipPath
   id="SVGID_00000180357075718584078990000016976836933334267023_">
				<use
   xlink:href="#SVGID_00000035489770265935316260000005389636485867387322_"
   style="overflow:visible"
   id="use3545"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			
				<polygon
   style="fill:none;stroke:#000000;stroke-width:0.5032;stroke-miterlimit:10"
   points="125.1,270.1 130.7,279.8 141.7,279.7 147.2,270.1 141.7,260.5 130.6,260.5 "
   clip-path="url(#SVGID_00000180357075718584078990000016976836933334267023_)"
   id="polygon3548" />
		</g>
	</g>
</g>
<g
   class="st60"
   id="g3574"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g3572">
		<defs
   id="defs3557">
			<rect
   id="SVGID_00000147919365743896590950000017385704894771337404_"
   x="146"
   y="268.79999"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000136408407564860501350000011261574029040182459_">
			<use
   xlink:href="#SVGID_00000147919365743896590950000017385704894771337404_"
   style="overflow:visible"
   id="use3559"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000136408407564860501350000011261574029040182459_)"
   id="g3570">
			<defs
   id="defs3563">
				<rect
   id="SVGID_00000121984689071743278740000011479738807962646205_"
   x="146"
   y="268.79999"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000159445515598555057740000016638936734951402675_">
				<use
   xlink:href="#SVGID_00000121984689071743278740000011479738807962646205_"
   style="overflow:visible"
   id="use3565"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 148.5,270.1 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000159445515598555057740000016638936734951402675_)"
   id="path3568" />
		</g>
	</g>
</g>
<g
   class="st19"
   id="g3594"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g3592">
		<defs
   id="defs3577">
			<rect
   id="SVGID_00000005230519182916406370000002592406844058661767_"
   x="157"
   y="268.79999"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000101071548288802026030000015796651374155319960_">
			<use
   xlink:href="#SVGID_00000005230519182916406370000002592406844058661767_"
   style="overflow:visible"
   id="use3579"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000101071548288802026030000015796651374155319960_)"
   id="g3590">
			<defs
   id="defs3583">
				<rect
   id="SVGID_00000016760747990682432530000003386769459070556566_"
   x="157"
   y="268.79999"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000039820955894878590030000000583022121781373108_">
				<use
   xlink:href="#SVGID_00000016760747990682432530000003386769459070556566_"
   style="overflow:visible"
   id="use3585"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 159.6,270 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000039820955894878590030000000583022121781373108_)"
   id="path3588" />
		</g>
	</g>
</g>
<g
   class="st5"
   id="g3614"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g3612">
		<defs
   id="defs3597">
			<rect
   id="SVGID_00000027574740117710828940000010660319923737891237_"
   x="157.10001"
   y="288"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000029743703048082803400000016508760830848575162_">
			<use
   xlink:href="#SVGID_00000027574740117710828940000010660319923737891237_"
   style="overflow:visible"
   id="use3599"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000029743703048082803400000016508760830848575162_)"
   id="g3610">
			<defs
   id="defs3603">
				<rect
   id="SVGID_00000165936883169755574780000017535518583278477472_"
   x="157.10001"
   y="288"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000014610278530695960740000001597055175380823958_">
				<use
   xlink:href="#SVGID_00000165936883169755574780000017535518583278477472_"
   style="overflow:visible"
   id="use3605"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 159.7,289.3 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.2,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000014610278530695960740000001597055175380823958_)"
   id="path3608" />
		</g>
	</g>
</g>
<g
   class="st60"
   id="g3634"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g3632">
		<defs
   id="defs3617">
			<rect
   id="SVGID_00000058573494716589393520000002925626067680735660_"
   x="140.5"
   y="278.5"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000026873072080335687750000014952432470281824180_">
			<use
   xlink:href="#SVGID_00000058573494716589393520000002925626067680735660_"
   style="overflow:visible"
   id="use3619"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000026873072080335687750000014952432470281824180_)"
   id="g3630">
			<defs
   id="defs3623">
				<rect
   id="SVGID_00000151516773203675458270000007267720407183859369_"
   x="140.5"
   y="278.5"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000126281799689986360420000014024921953733866927_">
				<use
   xlink:href="#SVGID_00000151516773203675458270000007267720407183859369_"
   style="overflow:visible"
   id="use3625"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 143,279.7 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000126281799689986360420000014024921953733866927_)"
   id="path3628" />
		</g>
	</g>
</g>
<g
   class="st111"
   id="g3654"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g3652">
		<defs
   id="defs3637">
			<rect
   id="SVGID_00000142860994189249056000000004645431909667637166_"
   x="162.60001"
   y="278.39999"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000109001338943758625390000017328463117418644658_">
			<use
   xlink:href="#SVGID_00000142860994189249056000000004645431909667637166_"
   style="overflow:visible"
   id="use3639"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000109001338943758625390000017328463117418644658_)"
   id="g3650">
			<defs
   id="defs3643">
				<rect
   id="SVGID_00000036219663505255017550000004681265000209804170_"
   x="162.60001"
   y="278.39999"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000016769228247020169420000012550977020022056102_">
				<use
   xlink:href="#SVGID_00000036219663505255017550000004681265000209804170_"
   style="overflow:visible"
   id="use3645"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 165.1,279.7 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000016769228247020169420000012550977020022056102_)"
   id="path3648" />
		</g>
	</g>
</g>
<g
   class="st5"
   id="g3674"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g3672">
		<defs
   id="defs3657">
			<rect
   id="SVGID_00000157992936538370741510000004767058598809665460_"
   x="141.39999"
   y="269.70001"
   width="22.9"
   height="19.9" />
		</defs>
		<clipPath
   id="SVGID_00000169543271333889413730000008640282950984802228_">
			<use
   xlink:href="#SVGID_00000157992936538370741510000004767058598809665460_"
   style="overflow:visible"
   id="use3659"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000169543271333889413730000008640282950984802228_)"
   id="g3670">
			<defs
   id="defs3663">
				<rect
   id="SVGID_00000165232500227387986620000008265873633211587716_"
   x="141.39999"
   y="269.70001"
   width="22.799999"
   height="19.9" />
			</defs>
			<clipPath
   id="SVGID_00000153680075663504673690000010775359522417991815_">
				<use
   xlink:href="#SVGID_00000165232500227387986620000008265873633211587716_"
   style="overflow:visible"
   id="use3665"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			
				<polygon
   style="fill:none;stroke:#000000;stroke-width:0.5032;stroke-miterlimit:10"
   points="141.8,279.7 147.3,289.3 158.4,289.3 163.9,279.7 158.3,270 147.3,270.1 "
   clip-path="url(#SVGID_00000153680075663504673690000010775359522417991815_)"
   id="polygon3668" />
		</g>
	</g>
</g>
<g
   class="st111"
   id="g3694"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g3692">
		<defs
   id="defs3677">
			<rect
   id="SVGID_00000023268741396428381940000013424137426843909548_"
   x="162.60001"
   y="278.39999"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000132079089630567258880000001090779954979240577_">
			<use
   xlink:href="#SVGID_00000023268741396428381940000013424137426843909548_"
   style="overflow:visible"
   id="use3679"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000132079089630567258880000001090779954979240577_)"
   id="g3690">
			<defs
   id="defs3683">
				<rect
   id="SVGID_00000126305344598536120130000009611509012098335670_"
   x="162.60001"
   y="278.39999"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000078731278200415792180000003379945756928179637_">
				<use
   xlink:href="#SVGID_00000126305344598536120130000009611509012098335670_"
   style="overflow:visible"
   id="use3685"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 165.1,279.7 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000078731278200415792180000003379945756928179637_)"
   id="path3688" />
		</g>
	</g>
</g>
<g
   class="st111"
   id="g3714"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g3712">
		<defs
   id="defs3697">
			<rect
   id="SVGID_00000176727533126703182020000004360319738340010392_"
   x="173.7"
   y="278.39999"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000080922739314126038560000015690824200271308434_">
			<use
   xlink:href="#SVGID_00000176727533126703182020000004360319738340010392_"
   style="overflow:visible"
   id="use3699"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000080922739314126038560000015690824200271308434_)"
   id="g3710">
			<defs
   id="defs3703">
				<rect
   id="SVGID_00000078732215702366832610000001741156949088365238_"
   x="173.7"
   y="278.39999"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000135687091638473318890000009419696583665133445_">
				<use
   xlink:href="#SVGID_00000078732215702366832610000001741156949088365238_"
   style="overflow:visible"
   id="use3705"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 176.2,279.6 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000135687091638473318890000009419696583665133445_)"
   id="path3708" />
		</g>
	</g>
</g>
<g
   class="st5"
   id="g3734"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g3732">
		<defs
   id="defs3717">
			<rect
   id="SVGID_00000127006792515444704210000004890049497544002956_"
   x="157.10001"
   y="288"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000005247336227874412230000011915993725758049719_">
			<use
   xlink:href="#SVGID_00000127006792515444704210000004890049497544002956_"
   style="overflow:visible"
   id="use3719"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000005247336227874412230000011915993725758049719_)"
   id="g3730">
			<defs
   id="defs3723">
				<rect
   id="SVGID_00000031189267821849234910000007484080879327759289_"
   x="157.10001"
   y="288"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000083800798845705847430000002145928825811567265_">
				<use
   xlink:href="#SVGID_00000031189267821849234910000007484080879327759289_"
   style="overflow:visible"
   id="use3725"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 159.6,289.3 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000083800798845705847430000002145928825811567265_)"
   id="path3728" />
		</g>
	</g>
</g>
<g
   class="st5"
   id="g3754"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g3752">
		<defs
   id="defs3737">
			<rect
   id="SVGID_00000078010765533026725040000003499127356455456140_"
   x="179.2"
   y="288"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000062872607183506259870000001361588425592903306_">
			<use
   xlink:href="#SVGID_00000078010765533026725040000003499127356455456140_"
   style="overflow:visible"
   id="use3739"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000062872607183506259870000001361588425592903306_)"
   id="g3750">
			<defs
   id="defs3743">
				<rect
   id="SVGID_00000156585571019719797500000009976447384226236320_"
   x="179.2"
   y="288"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000101074911089159903920000017234377022700707772_">
				<use
   xlink:href="#SVGID_00000156585571019719797500000009976447384226236320_"
   style="overflow:visible"
   id="use3745"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 181.8,289.3 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000101074911089159903920000017234377022700707772_)"
   id="path3748" />
		</g>
	</g>
</g>
<g
   class="st5"
   id="g3774"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g3772">
		<defs
   id="defs3757">
			<rect
   id="SVGID_00000073708860922079819510000013776747933712666038_"
   x="158"
   y="279.29999"
   width="22.799999"
   height="19.9" />
		</defs>
		<clipPath
   id="SVGID_00000062874986959047779580000000567655741083638206_">
			<use
   xlink:href="#SVGID_00000073708860922079819510000013776747933712666038_"
   style="overflow:visible"
   id="use3759"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000062874986959047779580000000567655741083638206_)"
   id="g3770">
			<defs
   id="defs3763">
				<rect
   id="SVGID_00000149375913543789063040000003089624553597824927_"
   x="158"
   y="279.29999"
   width="22.799999"
   height="19.9" />
			</defs>
			<clipPath
   id="SVGID_00000054944176257903031790000011761006806787202208_">
				<use
   xlink:href="#SVGID_00000149375913543789063040000003089624553597824927_"
   style="overflow:visible"
   id="use3765"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			
				<polygon
   style="fill:none;stroke:#000000;stroke-width:0.5032;stroke-miterlimit:10"
   points="158.4,289.3 164,298.9 175,298.9 180.5,289.2 174.9,279.6 163.9,279.7 "
   clip-path="url(#SVGID_00000054944176257903031790000011761006806787202208_)"
   id="polygon3768" />
		</g>
	</g>
</g>
<g
   class="st5"
   id="g3794"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g3792">
		<defs
   id="defs3777">
			<rect
   id="SVGID_00000129167913987688743620000010955643194826721727_"
   x="179.3"
   y="288"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000160895988045608110870000005628265096320214956_">
			<use
   xlink:href="#SVGID_00000129167913987688743620000010955643194826721727_"
   style="overflow:visible"
   id="use3779"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000160895988045608110870000005628265096320214956_)"
   id="g3790">
			<defs
   id="defs3783">
				<rect
   id="SVGID_00000147906572841681329500000016175486543316939144_"
   x="179.3"
   y="288"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000160895119557524130020000008960195379907183271_">
				<use
   xlink:href="#SVGID_00000147906572841681329500000016175486543316939144_"
   style="overflow:visible"
   id="use3785"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 181.8,289.2 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000160895119557524130020000008960195379907183271_)"
   id="path3788" />
		</g>
	</g>
</g>
<g
   class="st5"
   id="g3814"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g3812">
		<defs
   id="defs3797">
			<rect
   id="SVGID_00000077300153098189616850000000593202579406438278_"
   x="190.3"
   y="287.89999"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000178175691077768798320000012562152574610640266_">
			<use
   xlink:href="#SVGID_00000077300153098189616850000000593202579406438278_"
   style="overflow:visible"
   id="use3799"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000178175691077768798320000012562152574610640266_)"
   id="g3810">
			<defs
   id="defs3803">
				<rect
   id="SVGID_00000076590910515601876900000016028238486539805114_"
   x="190.3"
   y="287.89999"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000104666421171833650260000018257471052596736901_">
				<use
   xlink:href="#SVGID_00000076590910515601876900000016028238486539805114_"
   style="overflow:visible"
   id="use3805"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 192.9,289.2 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000104666421171833650260000018257471052596736901_)"
   id="path3808" />
		</g>
	</g>
</g>
<g
   class="st5"
   id="g3834"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g3832">
		<defs
   id="defs3817">
			<rect
   id="SVGID_00000022559473891405920300000015812027649425041555_"
   x="174.7"
   y="288.89999"
   width="22.9"
   height="19.9" />
		</defs>
		<clipPath
   id="SVGID_00000085210068470268241800000009191231079306728090_">
			<use
   xlink:href="#SVGID_00000022559473891405920300000015812027649425041555_"
   style="overflow:visible"
   id="use3819"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000085210068470268241800000009191231079306728090_)"
   id="g3830">
			<defs
   id="defs3823">
				<rect
   id="SVGID_00000136394128447613309310000001549153899562456969_"
   x="174.7"
   y="288.89999"
   width="22.9"
   height="19.9" />
			</defs>
			<clipPath
   id="SVGID_00000101793762505270954970000000276191625736042428_">
				<use
   xlink:href="#SVGID_00000136394128447613309310000001549153899562456969_"
   style="overflow:visible"
   id="use3825"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			
				<polygon
   style="fill:none;stroke:#000000;stroke-width:0.5032;stroke-miterlimit:10"
   points="175,298.9 180.6,308.5 191.6,308.5 197.1,298.8 191.6,289.2 180.5,289.3 "
   clip-path="url(#SVGID_00000101793762505270954970000000276191625736042428_)"
   id="polygon3828" />
		</g>
	</g>
</g>
<g
   class="st57"
   id="g3854"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g3852">
		<defs
   id="defs3837">
			<rect
   id="SVGID_00000177475466446533914990000004619833976689057709_"
   x="123.9"
   y="268.89999"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000115488041990462157650000001504725414306057361_">
			<use
   xlink:href="#SVGID_00000177475466446533914990000004619833976689057709_"
   style="overflow:visible"
   id="use3839"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000115488041990462157650000001504725414306057361_)"
   id="g3850">
			<defs
   id="defs3843">
				<rect
   id="SVGID_00000019661831472378156190000000179986447435098261_"
   x="123.9"
   y="268.89999"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000068647557469661519000000007694673693670894991_">
				<use
   xlink:href="#SVGID_00000019661831472378156190000000179986447435098261_"
   style="overflow:visible"
   id="use3845"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 126.4,270.1 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0.1 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000068647557469661519000000007694673693670894991_)"
   id="path3848" />
		</g>
	</g>
</g>
<g
   class="st111"
   id="g3874"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g3872">
		<defs
   id="defs3857">
			<rect
   id="SVGID_00000055707056650192772880000003738322213572941480_"
   x="140.5"
   y="278.39999"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000033343731007548208590000007905034731245684663_">
			<use
   xlink:href="#SVGID_00000055707056650192772880000003738322213572941480_"
   style="overflow:visible"
   id="use3859"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000033343731007548208590000007905034731245684663_)"
   id="g3870">
			<defs
   id="defs3863">
				<rect
   id="SVGID_00000029012330938011140650000013152069625546297984_"
   x="140.5"
   y="278.39999"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000063592935646718578330000016700596982763487423_">
				<use
   xlink:href="#SVGID_00000029012330938011140650000013152069625546297984_"
   style="overflow:visible"
   id="use3865"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 143,279.7 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.8,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000063592935646718578330000016700596982763487423_)"
   id="path3868" />
		</g>
	</g>
</g>
<g
   class="st5"
   id="g3894"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g3892">
		<defs
   id="defs3877">
			<rect
   id="SVGID_00000170956855180314707690000006029333697470049408_"
   x="157.10001"
   y="288"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000097478684423739980250000001413097748791460235_">
			<use
   xlink:href="#SVGID_00000170956855180314707690000006029333697470049408_"
   style="overflow:visible"
   id="use3879"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000097478684423739980250000001413097748791460235_)"
   id="g3890">
			<defs
   id="defs3883">
				<rect
   id="SVGID_00000155848329390301941810000015308714688714450619_"
   x="157.10001"
   y="288"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000132795951009089235180000010005787586169269941_">
				<use
   xlink:href="#SVGID_00000155848329390301941810000015308714688714450619_"
   style="overflow:visible"
   id="use3885"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 159.7,289.3 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.3,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000132795951009089235180000010005787586169269941_)"
   id="path3888" />
		</g>
	</g>
</g>
<g
   class="st5"
   id="g3914"
   transform="translate(-107.2,-182.24708)">
	<g
   id="g3912">
		<defs
   id="defs3897">
			<rect
   id="SVGID_00000023968585929021047050000008324079371893465760_"
   x="146"
   y="288"
   width="2.5"
   height="2.5" />
		</defs>
		<clipPath
   id="SVGID_00000086654249702594664140000003470571286040318894_">
			<use
   xlink:href="#SVGID_00000023968585929021047050000008324079371893465760_"
   style="overflow:visible"
   id="use3899"
   x="0"
   y="0"
   width="100%"
   height="100%" />
		</clipPath>
		<g
   clip-path="url(#SVGID_00000086654249702594664140000003470571286040318894_)"
   id="g3910">
			<defs
   id="defs3903">
				<rect
   id="SVGID_00000160163190639704162360000007610095626918487995_"
   x="146"
   y="288"
   width="2.5"
   height="2.5" />
			</defs>
			<clipPath
   id="SVGID_00000064353884836940359170000013263056622855311803_">
				<use
   xlink:href="#SVGID_00000160163190639704162360000007610095626918487995_"
   style="overflow:visible"
   id="use3905"
   x="0"
   y="0"
   width="100%"
   height="100%" />
			</clipPath>
			<path
   style="fill:#000000"
   d="m 148.6,289.3 c 0,0.7 -0.6,1.3 -1.3,1.3 -0.7,0 -1.3,-0.6 -1.3,-1.3 0,-0.7 0.6,-1.3 1.3,-1.3 0.7,0 1.2,0.6 1.3,1.3"
   clip-path="url(#SVGID_00000064353884836940359170000013263056622855311803_)"
   id="path3908" />
		</g>
	</g>
</g>
<line
   class="st295"
   x1="690.79999"
   y1="20.552919"
   x2="-414.20001"
   y2="20.552919"
   id="line3916" />
</svg>

        `,
        "1": `
        <?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg class="svg-dec"
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   version="1.1"
   id="Ebene_1"
   x="0px"
   y="0px"
   viewBox="0 0 354.99066 315.39999"
   xml:space="preserve"
   sodipodi:docname="wabe2.svg"
   width="354.99066"
   height="315.39999"
   inkscape:version="1.0.2 (e86c870879, 2021-01-15, custom)"><metadata
   id="metadata1753"><rdf:RDF><cc:Work
       rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type
         rdf:resource="http://purl.org/dc/dcmitype/StillImage" /><dc:title></dc:title></cc:Work></rdf:RDF></metadata><defs
   id="defs1751" /><sodipodi:namedview
   pagecolor="#000000"
   bordercolor="#666666"
   borderopacity="1"
   objecttolerance="10"
   gridtolerance="10"
   guidetolerance="10"
   inkscape:pageopacity="0"
   inkscape:pageshadow="2"
   inkscape:window-width="2880"
   inkscape:window-height="1526"
   id="namedview1749"
   showgrid="false"
   inkscape:zoom="1.96875"
   inkscape:cx="167.4"
   inkscape:cy="152.1"
   inkscape:window-x="-11"
   inkscape:window-y="1609"
   inkscape:window-maximized="1"
   inkscape:current-layer="Ebene_1" />
<style
   type="text/css"
   id="style2">
	.st0{fill:#000000;}
	.st1{fill:none;stroke:#000000;stroke-width:0.5032;stroke-miterlimit:10;}
	.st2{fill:none;}
</style>
<path
   class="st0"
   d="m 66.9,1.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path4" />
<path
   class="st0"
   d="M 79.7,1.5 C 79.7,2.3 79,3 78.2,3 77.4,3 76.7,2.3 76.7,1.5 76.7,0.7 77.4,0 78.2,0 c 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path6" />
<path
   class="st0"
   d="m 66.9,23.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.6 1.5,1.5"
   id="path8" />
<path
   class="st0"
   d="m 79.8,23.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path10" />
<path
   class="st0"
   d="m 60.5,12.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path12" />
<path
   class="st0"
   d="m 86.1,12.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path14" />
<polygon
   class="st1"
   points="147.7,116.6 154.1,127.8 166.9,127.7 173.3,116.6 166.8,105.4 154,105.5 "
   id="polygon16"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 86.2,12.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path18" />
<path
   class="st0"
   d="m 99,12.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path20" />
<path
   class="st0"
   d="m 86.2,35 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path22" />
<path
   class="st0"
   d="m 99,35 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path24" />
<path
   class="st0"
   d="m 79.7,23.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.6 1.5,1.5"
   id="path26" />
<path
   class="st0"
   d="m 105.4,23.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path28" />
<polygon
   class="st1"
   points="166.9,127.8 173.3,138.9 186.1,138.9 192.5,127.7 186.1,116.6 173.3,116.6 "
   id="polygon30"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 105.4,23.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path32" />
<path
   class="st0"
   d="m 118.3,23.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.4,0.7 1.5,1.5"
   id="path34" />
<path
   class="st0"
   d="m 105.5,46.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path36" />
<path
   class="st0"
   d="m 118.3,46.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path38" />
<path
   class="st0"
   d="m 99,35 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path40" />
<path
   class="st0"
   d="m 124.7,35 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path42" />
<polygon
   class="st1"
   points="186.2,138.9 192.6,150.1 205.4,150 211.8,138.9 205.4,127.7 192.6,127.7 "
   id="polygon44"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 124.7,35 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path46" />
<path
   class="st0"
   d="m 137.5,35 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.6 1.5,1.5"
   id="path48" />
<path
   class="st0"
   d="m 124.7,57.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path50" />
<path
   class="st0"
   d="m 137.6,57.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path52" />
<path
   class="st0"
   d="m 118.3,46.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path54" />
<path
   class="st0"
   d="m 143.9,46.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path56" />
<polygon
   class="st1"
   points="205.4,150.1 211.9,161.2 224.7,161.2 231.1,150 224.6,138.9 211.8,138.9 "
   id="polygon58"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 143.9,46.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path60" />
<path
   class="st0"
   d="m 144,68.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path62" />
<path
   class="st0"
   d="m 137.5,57.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path64" />
<path
   class="st0"
   d="m 163.2,79.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path66" />
<path
   class="st0"
   d="m 176.1,79.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path68" />
<path
   class="st0"
   d="m 182.5,90.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path70" />
<path
   class="st0"
   d="m 195.3,90.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path72" />
<path
   class="st0"
   d="m 176.1,79.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path74" />
<path
   class="st0"
   d="m 201.7,79.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.6 1.5,1.5"
   id="path76" />
<path
   class="st0"
   d="m 201.7,79.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path78" />
<path
   class="st0"
   d="m 214.6,79.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path80" />
<path
   class="st0"
   d="m 239.9,79.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path82" />
<path
   class="st0"
   d="m 221.1,68.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path84" />
<path
   class="st0"
   d="m 201.8,101.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path86" />
<path
   class="st0"
   d="m 214.6,101.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path88" />
<path
   class="st0"
   d="m 195.3,90.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path90" />
<path
   class="st0"
   d="m 221,90.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path92" />
<polygon
   class="st1"
   points="282.5,194.6 288.9,205.8 301.7,205.7 308.1,194.6 301.7,183.4 288.9,183.4 "
   id="polygon94"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 221,90.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path96" />
<path
   class="st0"
   d="m 233.8,90.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.6 1.5,1.5"
   id="path98" />
<path
   class="st0"
   d="m 259.5,90.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path100" />
<path
   class="st0"
   d="m 221,113 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path102" />
<path
   class="st0"
   d="m 233.9,113 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path104" />
<path
   class="st0"
   d="m 214.6,101.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path106" />
<path
   class="st0"
   d="m 240.2,101.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path108" />
<polygon
   class="st1"
   points="301.8,205.8 308.2,216.9 321,216.9 327.4,205.7 320.9,194.6 308.1,194.6 "
   id="polygon110"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 233.8,68.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path112" />
<polygon
   class="st1"
   points="301.7,183.5 308.1,194.6 320.9,194.6 327.3,183.4 320.9,172.3 308.1,172.3 "
   id="polygon114"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 272.3,90.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path116" />
<path
   class="st0"
   d="m 297.6,90.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path118" />
<polygon
   class="st1"
   points="340.3,205.8 346.7,216.9 359.5,216.9 365.9,205.7 359.5,194.6 346.6,194.6 "
   id="polygon120"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 291.5,79.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path122" />
<polygon
   class="st1"
   points="359.4,194.6 365.9,205.7 378.7,205.7 385,194.5 378.6,183.4 365.8,183.4 "
   id="polygon124"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 240.3,101.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path126" />
<path
   class="st0"
   d="m 253.1,101.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path128" />
<path
   class="st0"
   d="m 278.5,101.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path130" />
<path
   class="st0"
   d="m 291.7,101.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path132" />
<path
   class="st0"
   d="m 278.5,79.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path134" />
<path
   class="st0"
   d="m 240.3,124.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path136" />
<path
   class="st0"
   d="m 253.1,124.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path138" />
<path
   class="st0"
   d="m 233.8,113 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path140" />
<path
   class="st0"
   d="m 259.5,113 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path142" />
<polygon
   class="st1"
   points="321,216.9 327.4,228 340.2,228 346.6,216.9 340.2,205.7 327.4,205.7 "
   id="polygon144"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 259.5,113 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path146" />
<path
   class="st0"
   d="m 272.4,112.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path148" />
<path
   class="st0"
   d="m 259.6,135.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path150" />
<path
   class="st0"
   d="m 272.4,135.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path152" />
<path
   class="st0"
   d="m 253.1,124.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path154" />
<path
   class="st0"
   d="m 278.8,124.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path156" />
<polygon
   class="st1"
   points="340.3,228 346.7,239.2 359.5,239.2 365.9,228 359.5,216.9 346.7,216.9 "
   id="polygon158"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 278.8,124.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path160" />
<path
   class="st0"
   d="m 291.6,124.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path162" />
<path
   class="st0"
   d="m 278.8,146.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path164" />
<path
   class="st0"
   d="m 291.7,146.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path166" />
<path
   class="st0"
   d="m 272.4,135.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path168" />
<path
   class="st0"
   d="m 298,135.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path170" />
<polygon
   class="st1"
   points="359.5,239.2 366,250.3 378.8,250.3 385.2,239.1 378.7,228 365.9,228 "
   id="polygon172"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 298,135.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.6 1.5,1.5"
   id="path174" />
<path
   class="st0"
   d="m 310.9,135.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path176" />
<path
   class="st0"
   d="m 298.1,157.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path178" />
<path
   class="st0"
   d="m 310.9,157.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path180" />
<path
   class="st0"
   d="m 291.6,146.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path182" />
<path
   class="st0"
   d="m 317.3,146.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path184" />
<polygon
   class="st1"
   points="378.8,250.3 385.2,261.5 398,261.4 404.4,250.3 398,239.1 385.2,239.2 "
   id="polygon186"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 317.3,146.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path188" />
<path
   class="st0"
   d="m 317.4,168.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.4,0.7 1.5,1.5"
   id="path190" />
<path
   class="st0"
   d="m 310.9,157.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path192" />
<path
   class="st0"
   d="m 336.6,179.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path194" />
<path
   class="st0"
   d="m 67,23.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path196" />
<path
   class="st0"
   d="m 79.8,23.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path198" />
<path
   class="st0"
   d="m 67,46.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path200" />
<path
   class="st0"
   d="m 79.8,46.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.6 1.5,1.5"
   id="path202" />
<path
   class="st0"
   d="m 60.5,35 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path204" />
<path
   class="st0"
   d="m 86.2,35 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path206" />
<polygon
   class="st1"
   points="147.7,139 154.1,150.1 166.9,150.1 173.3,138.9 166.9,127.8 154.1,127.8 "
   id="polygon208"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 86.2,35 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path210" />
<path
   class="st0"
   d="m 99.1,35 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path212" />
<path
   class="st0"
   d="m 86.3,57.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path214" />
<path
   class="st0"
   d="m 99.1,57.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path216" />
<path
   class="st0"
   d="m 79.8,46.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path218" />
<path
   class="st0"
   d="m 105.5,46.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path220" />
<polygon
   class="st1"
   points="167,150.1 173.4,161.2 186.2,161.2 192.6,150 186.2,138.9 173.4,138.9 "
   id="polygon222"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 105.5,46.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path224" />
<path
   class="st0"
   d="m 118.3,46.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path226" />
<path
   class="st0"
   d="m 105.5,68.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path228" />
<path
   class="st0"
   d="m 118.4,68.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path230" />
<path
   class="st0"
   d="m 99.1,57.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path232" />
<path
   class="st0"
   d="m 124.7,57.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path234" />
<polygon
   class="st1"
   points="186.2,161.2 192.7,172.4 205.5,172.4 211.9,161.2 205.4,150 192.6,150.1 "
   id="polygon236"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 124.7,57.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path238" />
<path
   class="st0"
   d="m 137.6,57.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path240" />
<path
   class="st0"
   d="m 124.8,79.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path242" />
<path
   class="st0"
   d="m 137.6,79.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path244" />
<path
   class="st0"
   d="m 118.3,68.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path246" />
<path
   class="st0"
   d="m 144,68.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path248" />
<polygon
   class="st1"
   points="205.5,172.4 211.9,183.5 224.7,183.5 231.1,172.3 224.7,161.2 211.9,161.2 "
   id="polygon250"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 144,68.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path252" />
<path
   class="st0"
   d="m 144.1,90.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path254" />
<path
   class="st0"
   d="m 156.9,90.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path256" />
<path
   class="st0"
   d="m 137.6,79.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path258" />
<path
   class="st0"
   d="m 163.3,79.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path260" />
<path
   class="st0"
   d="m 163.3,79.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path262" />
<path
   class="st0"
   d="m 176.1,79.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path264" />
<path
   class="st0"
   d="m 163.3,101.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path266" />
<path
   class="st0"
   d="m 176.1,101.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path268" />
<path
   class="st0"
   d="m 156.9,90.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path270" />
<path
   class="st0"
   d="m 182.5,90.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path272" />
<polygon
   class="st1"
   points="244,194.7 250.5,205.8 263.3,205.8 269.6,194.6 263.2,183.5 250.4,183.5 "
   id="polygon274"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 182.5,90.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path276" />
<path
   class="st0"
   d="m 195.4,90.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path278" />
<path
   class="st0"
   d="m 182.6,113 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path280" />
<path
   class="st0"
   d="m 195.4,113 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path282" />
<path
   class="st0"
   d="m 176.1,101.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path284" />
<path
   class="st0"
   d="m 201.8,101.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path286" />
<polygon
   class="st1"
   points="263.3,205.8 269.7,216.9 282.5,216.9 288.9,205.8 282.5,194.6 269.7,194.6 "
   id="polygon288"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 201.8,101.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path290" />
<path
   class="st0"
   d="m 214.6,101.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path292" />
<path
   class="st0"
   d="m 201.8,124.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path294" />
<path
   class="st0"
   d="m 214.7,124.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path296" />
<path
   class="st0"
   d="m 195.4,113 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path298" />
<path
   class="st0"
   d="m 221.1,113 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path300" />
<polygon
   class="st1"
   points="282.6,216.9 289,228.1 301.8,228.1 308.2,216.9 301.7,205.8 288.9,205.8 "
   id="polygon302"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 221.1,113 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path304" />
<path
   class="st0"
   d="m 233.9,113 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path306" />
<path
   class="st0"
   d="m 221.1,135.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path308" />
<path
   class="st0"
   d="m 233.9,135.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path310" />
<path
   class="st0"
   d="m 214.6,124.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path312" />
<path
   class="st0"
   d="m 240.3,124.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path314" />
<polygon
   class="st1"
   points="301.8,228.1 308.2,239.2 321.1,239.2 327.4,228 321,216.9 308.2,216.9 "
   id="polygon316"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 240.3,124.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.6 1.5,1.5"
   id="path318" />
<path
   class="st0"
   d="m 253.2,124.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path320" />
<path
   class="st0"
   d="m 240.4,146.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path322" />
<path
   class="st0"
   d="m 253.2,146.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path324" />
<path
   class="st0"
   d="m 233.9,135.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path326" />
<path
   class="st0"
   d="m 259.6,135.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path328" />
<polygon
   class="st1"
   points="321.1,239.2 327.5,250.4 340.3,250.3 346.7,239.2 340.3,228 327.5,228.1 "
   id="polygon330"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 259.6,135.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path332" />
<path
   class="st0"
   d="m 272.4,135.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path334" />
<path
   class="st0"
   d="m 259.6,157.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path336" />
<path
   class="st0"
   d="m 272.5,157.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path338" />
<path
   class="st0"
   d="m 253.2,146.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path340" />
<path
   class="st0"
   d="m 278.8,146.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.6 1.5,1.5"
   id="path342" />
<polygon
   class="st1"
   points="340.4,250.4 346.8,261.5 359.6,261.5 366,250.3 359.5,239.2 346.7,239.2 "
   id="polygon344"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 278.9,146.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path346" />
<path
   class="st0"
   d="m 291.7,146.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path348" />
<path
   class="st0"
   d="m 278.9,168.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path350" />
<path
   class="st0"
   d="m 291.7,168.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path352" />
<path
   class="st0"
   d="m 272.4,157.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path354" />
<path
   class="st0"
   d="m 298.1,157.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path356" />
<polygon
   class="st1"
   points="359.6,261.5 366,272.7 378.8,272.6 385.2,261.5 378.8,250.3 366,250.3 "
   id="polygon358"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 298.1,157.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path360" />
<path
   class="st0"
   d="m 311,157.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.4,0.6 1.5,1.5"
   id="path362" />
<path
   class="st0"
   d="m 298.2,179.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path364" />
<path
   class="st0"
   d="m 311,179.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path366" />
<path
   class="st0"
   d="m 291.7,168.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path368" />
<path
   class="st0"
   d="m 317.4,168.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path370" />
<polygon
   class="st1"
   points="378.9,272.7 385.3,283.8 398.1,283.8 404.5,272.6 398.1,261.5 385.3,261.5 "
   id="polygon372"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 317.4,168.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path374" />
<path
   class="st0"
   d="m 317.4,191 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path376" />
<path
   class="st0"
   d="m 330.3,191 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path378" />
<path
   class="st0"
   d="m 311,179.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path380" />
<path
   class="st0"
   d="m 336.6,179.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path382" />
<path
   class="st0"
   d="m 336.6,179.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.6 1.5,1.5"
   id="path384" />
<path
   class="st0"
   d="m 336.7,202.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path386" />
<path
   class="st0"
   d="m 330.2,191 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path388" />
<polygon
   class="st1"
   points="417.4,294.9 423.8,306.1 436.6,306.1 443,294.9 436.6,283.7 423.8,283.8 "
   id="polygon390"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 60.6,35 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path392" />
<path
   class="st0"
   d="m 67,46.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path394" />
<path
   class="st0"
   d="m 67,46.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path396" />
<path
   class="st0"
   d="m 79.8,46.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path398" />
<path
   class="st0"
   d="m 79.9,68.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path400" />
<path
   class="st0"
   d="m 86.2,57.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path402" />
<path
   class="st0"
   d="m 86.3,57.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path404" />
<path
   class="st0"
   d="m 99.1,57.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path406" />
<path
   class="st0"
   d="m 86.3,79.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path408" />
<path
   class="st0"
   d="m 99.1,79.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path410" />
<path
   class="st0"
   d="m 79.8,68.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path412" />
<path
   class="st0"
   d="m 105.5,68.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path414" />
<polygon
   class="st1"
   points="167,172.4 173.4,183.6 186.2,183.6 192.6,172.4 186.2,161.2 173.4,161.3 "
   id="polygon416"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 105.5,68.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path418" />
<path
   class="st0"
   d="m 118.4,68.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path420" />
<path
   class="st0"
   d="m 105.6,90.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path422" />
<path
   class="st0"
   d="m 118.4,90.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path424" />
<path
   class="st0"
   d="m 99.1,79.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path426" />
<path
   class="st0"
   d="m 124.8,79.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path428" />
<polygon
   class="st1"
   points="186.3,183.6 192.7,194.7 205.5,194.7 211.9,183.5 205.5,172.4 192.7,172.4 "
   id="polygon430"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 124.8,79.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path432" />
<path
   class="st0"
   d="m 137.6,79.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path434" />
<path
   class="st0"
   d="m 124.8,101.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path436" />
<path
   class="st0"
   d="m 137.7,101.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path438" />
<path
   class="st0"
   d="m 118.4,90.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path440" />
<path
   class="st0"
   d="m 144,90.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path442" />
<polygon
   class="st1"
   points="205.5,194.7 212,205.9 224.8,205.8 231.2,194.7 224.7,183.5 211.9,183.5 "
   id="polygon444"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 144,90.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path446" />
<path
   class="st0"
   d="m 156.9,90.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path448" />
<path
   class="st0"
   d="m 144.1,113.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path450" />
<path
   class="st0"
   d="m 156.9,113.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path452" />
<path
   class="st0"
   d="m 137.6,101.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path454" />
<path
   class="st0"
   d="m 163.3,101.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path456" />
<polygon
   class="st1"
   points="224.8,205.9 231.2,217 244,217 250.4,205.8 244,194.7 231.2,194.7 "
   id="polygon458"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 163.3,101.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path460" />
<path
   class="st0"
   d="m 176.1,101.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path462" />
<path
   class="st0"
   d="m 163.4,124.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path464" />
<path
   class="st0"
   d="m 176.2,124.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path466" />
<path
   class="st0"
   d="m 156.9,113.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path468" />
<path
   class="st0"
   d="m 182.6,113.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path470" />
<polygon
   class="st1"
   points="244.1,217 250.5,228.1 263.3,228.1 269.7,217 263.3,205.8 250.5,205.8 "
   id="polygon472"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 182.6,113.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path474" />
<path
   class="st0"
   d="m 195.4,113 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path476" />
<path
   class="st0"
   d="m 182.6,135.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path478" />
<path
   class="st0"
   d="m 195.4,135.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.6 1.5,1.5"
   id="path480" />
<path
   class="st0"
   d="m 176.2,124.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path482" />
<path
   class="st0"
   d="m 201.8,124.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path484" />
<polygon
   class="st1"
   points="263.3,228.1 269.8,239.3 282.6,239.3 288.9,228.1 282.5,216.9 269.7,217 "
   id="polygon486"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 201.8,124.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path488" />
<path
   class="st0"
   d="m 214.7,124.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path490" />
<path
   class="st0"
   d="m 201.9,146.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path492" />
<path
   class="st0"
   d="m 214.7,146.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path494" />
<path
   class="st0"
   d="m 195.4,135.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path496" />
<path
   class="st0"
   d="m 221.1,135.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path498" />
<polygon
   class="st1"
   points="282.6,239.3 289,250.4 301.8,250.4 308.2,239.2 301.8,228.1 289,228.1 "
   id="polygon500"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 221.1,135.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path502" />
<path
   class="st0"
   d="m 233.9,135.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path504" />
<path
   class="st0"
   d="m 221.1,157.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.6 1.5,1.5"
   id="path506" />
<path
   class="st0"
   d="m 234,157.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path508" />
<path
   class="st0"
   d="m 214.7,146.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path510" />
<path
   class="st0"
   d="m 240.4,146.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.4,0.7 1.5,1.5"
   id="path512" />
<polygon
   class="st1"
   points="301.9,250.4 308.3,261.6 321.1,261.5 327.5,250.4 321,239.2 308.2,239.3 "
   id="polygon514"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 240.4,146.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path516" />
<path
   class="st0"
   d="m 253.2,146.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path518" />
<path
   class="st0"
   d="m 240.4,168.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path520" />
<path
   class="st0"
   d="m 253.2,168.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path522" />
<path
   class="st0"
   d="m 233.9,157.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.6 1.5,1.5"
   id="path524" />
<path
   class="st0"
   d="m 259.6,157.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path526" />
<polygon
   class="st1"
   points="321.1,261.6 327.5,272.7 340.4,272.7 346.7,261.5 340.3,250.4 327.5,250.4 "
   id="polygon528"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 259.6,157.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path530" />
<path
   class="st0"
   d="m 272.5,157.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path532" />
<path
   class="st0"
   d="m 259.7,179.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path534" />
<path
   class="st0"
   d="m 272.5,179.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path536" />
<path
   class="st0"
   d="m 253.2,168.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path538" />
<path
   class="st0"
   d="m 278.9,168.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path540" />
<polygon
   class="st1"
   points="340.4,272.7 346.8,283.9 359.6,283.8 366,272.7 359.6,261.5 346.8,261.5 "
   id="polygon542"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 278.9,168.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path544" />
<path
   class="st0"
   d="m 291.7,168.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.6 1.5,1.5"
   id="path546" />
<path
   class="st0"
   d="m 291.8,191.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path548" />
<path
   class="st0"
   d="m 272.5,179.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path550" />
<path
   class="st0"
   d="m 298.1,179.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path552" />
<path
   class="st0"
   d="m 298.2,179.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path554" />
<path
   class="st0"
   d="m 311,179.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path556" />
<path
   class="st0"
   d="m 298.2,202.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path558" />
<path
   class="st0"
   d="m 311,202.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path560" />
<path
   class="st0"
   d="m 291.7,191.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path562" />
<path
   class="st0"
   d="m 317.4,191.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path564" />
<polygon
   class="st1"
   points="378.9,295 385.3,306.1 398.1,306.1 404.5,294.9 398.1,283.8 385.3,283.8 "
   id="polygon566"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 317.4,191.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.6 1.5,1.5"
   id="path568" />
<path
   class="st0"
   d="m 330.2,191 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path570" />
<path
   class="st0"
   d="m 317.5,213.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path572" />
<path
   class="st0"
   d="m 330.3,213.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path574" />
<path
   class="st0"
   d="m 311,202.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path576" />
<path
   class="st0"
   d="m 336.7,202.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path578" />
<polygon
   class="st1"
   points="398.2,306.1 404.6,317.3 417.4,317.3 423.8,306.1 417.4,294.9 404.6,295 "
   id="polygon580"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 336.7,202.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path582" />
<path
   class="st0"
   d="m 336.7,224.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path584" />
<path
   class="st0"
   d="m 330.3,213.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path586" />
<polygon
   class="st1"
   points="417.4,317.3 423.9,328.4 436.7,328.4 443.1,317.2 436.6,306.1 423.8,306.1 "
   id="polygon588"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 47.8,79.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path590" />
<path
   class="st0"
   d="m 60.7,79.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path592" />
<path
   class="st0"
   d="m 79.9,68.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path594" />
<path
   class="st0"
   d="m 67.1,90.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path596" />
<path
   class="st0"
   d="m 79.9,90.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path598" />
<path
   class="st0"
   d="m 60.6,79.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path600" />
<path
   class="st0"
   d="m 86.3,79.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path602" />
<path
   class="st0"
   d="m 86.3,79.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path604" />
<path
   class="st0"
   d="m 99.2,79.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path606" />
<path
   class="st0"
   d="m 86.4,102 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path608" />
<path
   class="st0"
   d="m 99.2,102 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path610" />
<path
   class="st0"
   d="m 79.9,90.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path612" />
<path
   class="st0"
   d="m 105.6,90.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path614" />
<polygon
   class="st1"
   points="167.1,194.8 173.5,205.9 186.3,205.9 192.7,194.7 186.3,183.6 173.5,183.6 "
   id="polygon616"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 105.6,90.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path618" />
<path
   class="st0"
   d="m 118.4,90.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path620" />
<path
   class="st0"
   d="m 105.6,113.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path622" />
<path
   class="st0"
   d="m 118.5,113.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path624" />
<path
   class="st0"
   d="m 99.2,102 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path626" />
<path
   class="st0"
   d="m 124.8,102 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path628" />
<polygon
   class="st1"
   points="186.3,205.9 192.8,217 205.6,217 212,205.9 205.5,194.7 192.7,194.7 "
   id="polygon630"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 124.9,102 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path632" />
<path
   class="st0"
   d="m 137.7,101.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path634" />
<path
   class="st0"
   d="m 124.9,124.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path636" />
<path
   class="st0"
   d="m 137.7,124.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.6 1.5,1.5"
   id="path638" />
<path
   class="st0"
   d="m 118.4,113.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path640" />
<path
   class="st0"
   d="m 144.1,113.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path642" />
<polygon
   class="st1"
   points="205.6,217 212,228.2 224.8,228.2 231.2,217 224.8,205.8 212,205.9 "
   id="polygon644"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 144.1,113.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path646" />
<path
   class="st0"
   d="m 157,113.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.4,0.7 1.5,1.5"
   id="path648" />
<path
   class="st0"
   d="m 144.2,135.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path650" />
<path
   class="st0"
   d="m 157,135.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path652" />
<path
   class="st0"
   d="m 137.7,124.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path654" />
<path
   class="st0"
   d="m 163.4,124.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path656" />
<polygon
   class="st1"
   points="224.9,228.2 231.3,239.3 244.1,239.3 250.5,228.1 244.1,217 231.3,217 "
   id="polygon658"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 163.4,124.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path660" />
<path
   class="st0"
   d="m 176.2,124.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path662" />
<path
   class="st0"
   d="m 163.4,146.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.6 1.5,1.5"
   id="path664" />
<path
   class="st0"
   d="m 176.3,146.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path666" />
<path
   class="st0"
   d="m 157,135.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path668" />
<path
   class="st0"
   d="m 182.6,135.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path670" />
<polygon
   class="st1"
   points="244.1,239.3 250.6,250.5 263.4,250.4 269.8,239.3 263.3,228.1 250.5,228.2 "
   id="polygon672"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 182.6,135.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path674" />
<path
   class="st0"
   d="m 195.5,135.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path676" />
<path
   class="st0"
   d="m 182.7,157.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path678" />
<path
   class="st0"
   d="m 195.5,157.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path680" />
<path
   class="st0"
   d="m 176.2,146.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.6 1.5,1.5"
   id="path682" />
<path
   class="st0"
   d="m 201.9,146.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path684" />
<polygon
   class="st1"
   points="263.4,250.5 269.8,261.6 282.6,261.6 289,250.4 282.6,239.3 269.8,239.3 "
   id="polygon686"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 201.9,146.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path688" />
<path
   class="st0"
   d="m 214.7,146.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path690" />
<path
   class="st0"
   d="m 201.9,168.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path692" />
<path
   class="st0"
   d="m 214.8,168.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path694" />
<path
   class="st0"
   d="m 195.5,157.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path696" />
<path
   class="st0"
   d="m 221.2,157.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path698" />
<polygon
   class="st1"
   points="282.7,261.6 289.1,272.8 301.9,272.7 308.3,261.6 301.9,250.4 289,250.4 "
   id="polygon700"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 221.2,157.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path702" />
<path
   class="st0"
   d="m 234,157.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path704" />
<path
   class="st0"
   d="m 221.2,180 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path706" />
<path
   class="st0"
   d="m 234,180 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.6 1.5,1.5"
   id="path708" />
<path
   class="st0"
   d="m 214.8,168.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path710" />
<path
   class="st0"
   d="m 240.4,168.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path712" />
<polygon
   class="st1"
   points="301.9,272.8 308.4,283.9 321.2,283.9 327.5,272.7 321.1,261.6 308.3,261.6 "
   id="polygon714"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 240.4,168.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path716" />
<path
   class="st0"
   d="m 253.3,168.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path718" />
<path
   class="st0"
   d="m 240.5,191.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path720" />
<path
   class="st0"
   d="m 253.3,191.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path722" />
<path
   class="st0"
   d="m 234,180 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path724" />
<path
   class="st0"
   d="m 259.7,180 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path726" />
<polygon
   class="st1"
   points="321.2,283.9 327.6,295 340.4,295 346.8,283.8 340.4,272.7 327.6,272.7 "
   id="polygon728"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 259.7,180 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path730" />
<path
   class="st0"
   d="m 272.5,179.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path732" />
<path
   class="st0"
   d="m 259.7,202.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path734" />
<path
   class="st0"
   d="m 272.6,202.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path736" />
<path
   class="st0"
   d="m 253.3,191.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path738" />
<path
   class="st0"
   d="m 291.8,191.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path740" />
<path
   class="st0"
   d="m 279,213.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path742" />
<path
   class="st0"
   d="m 291.8,213.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path744" />
<path
   class="st0"
   d="m 272.5,202.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path746" />
<path
   class="st0"
   d="m 298.2,202.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path748" />
<path
   class="st0"
   d="m 298.2,202.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path750" />
<path
   class="st0"
   d="m 311.1,202.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path752" />
<path
   class="st0"
   d="m 298.3,224.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path754" />
<path
   class="st0"
   d="m 311.1,224.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path756" />
<path
   class="st0"
   d="m 291.8,213.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path758" />
<path
   class="st0"
   d="m 317.5,213.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path760" />
<polygon
   class="st1"
   points="379,317.3 385.4,328.5 398.2,328.4 404.6,317.3 398.2,306.1 385.4,306.1 "
   id="polygon762"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 317.5,213.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path764" />
<path
   class="st0"
   d="m 330.3,213.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.6 1.5,1.5"
   id="path766" />
<path
   class="st0"
   d="m 317.5,235.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path768" />
<path
   class="st0"
   d="m 330.4,235.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path770" />
<path
   class="st0"
   d="m 311.1,224.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path772" />
<path
   class="st0"
   d="m 336.7,224.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path774" />
<polygon
   class="st1"
   points="398.2,328.5 404.7,339.6 417.5,339.6 423.9,328.4 417.4,317.3 404.6,317.3 "
   id="polygon776"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 336.7,224.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path778" />
<path
   class="st0"
   d="m 336.8,246.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path780" />
<path
   class="st0"
   d="m 330.3,235.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path782" />
<polygon
   class="st1"
   points="417.5,339.6 423.9,350.7 436.7,350.7 443.1,339.6 436.7,328.4 423.9,328.4 "
   id="polygon784"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 41.4,90.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path786" />
<path
   class="st0"
   d="m 47.8,79.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.6 1.5,1.5"
   id="path788" />
<path
   class="st0"
   d="m 47.8,79.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path790" />
<path
   class="st0"
   d="m 60.7,79.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path792" />
<path
   class="st0"
   d="m 47.9,102 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path794" />
<path
   class="st0"
   d="m 60.7,102 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path796" />
<path
   class="st0"
   d="m 41.4,90.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path798" />
<path
   class="st0"
   d="m 67.1,90.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path800" />
<polygon
   class="st1"
   points="128.6,194.8 135,206 147.8,205.9 154.2,194.8 147.8,183.6 135,183.6 "
   id="polygon802"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 67.1,90.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path804" />
<path
   class="st0"
   d="m 79.9,90.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.6 1.5,1.5"
   id="path806" />
<path
   class="st0"
   d="m 67.1,113.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path808" />
<path
   class="st0"
   d="m 80,113.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path810" />
<path
   class="st0"
   d="m 60.7,102 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path812" />
<path
   class="st0"
   d="m 86.4,102 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.4,0.7 1.5,1.5"
   id="path814" />
<polygon
   class="st1"
   points="147.9,206 154.3,217.1 167.1,217.1 173.5,205.9 167,194.8 154.2,194.8 "
   id="polygon816"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 86.4,102 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path818" />
<path
   class="st0"
   d="m 99.2,102 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path820" />
<path
   class="st0"
   d="m 86.4,124.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path822" />
<path
   class="st0"
   d="m 99.2,124.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path824" />
<path
   class="st0"
   d="m 79.9,113.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path826" />
<path
   class="st0"
   d="m 105.6,113.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path828" />
<polygon
   class="st1"
   points="167.1,217.1 173.5,228.2 186.4,228.2 192.7,217 186.3,205.9 173.5,205.9 "
   id="polygon830"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 105.6,113.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.6 1.5,1.5"
   id="path832" />
<path
   class="st0"
   d="m 118.5,113.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path834" />
<path
   class="st0"
   d="m 105.7,135.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path836" />
<path
   class="st0"
   d="m 118.5,135.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path838" />
<path
   class="st0"
   d="m 99.2,124.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path840" />
<path
   class="st0"
   d="m 124.9,124.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path842" />
<polygon
   class="st1"
   points="186.4,228.2 192.8,239.4 205.6,239.4 212,228.2 205.6,217 192.8,217.1 "
   id="polygon844"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 124.9,124.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path846" />
<path
   class="st0"
   d="m 137.7,124.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path848" />
<path
   class="st0"
   d="m 124.9,146.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path850" />
<path
   class="st0"
   d="m 137.8,146.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path852" />
<path
   class="st0"
   d="m 118.5,135.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path854" />
<path
   class="st0"
   d="m 144.1,135.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.6 1.5,1.5"
   id="path856" />
<polygon
   class="st1"
   points="205.6,239.4 212.1,250.5 224.9,250.5 231.3,239.3 224.8,228.2 212,228.2 "
   id="polygon858"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 144.2,135.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path860" />
<path
   class="st0"
   d="m 157,135.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path862" />
<path
   class="st0"
   d="m 144.2,157.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path864" />
<path
   class="st0"
   d="m 157,157.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path866" />
<path
   class="st0"
   d="m 137.7,146.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path868" />
<path
   class="st0"
   d="m 163.4,146.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path870" />
<polygon
   class="st1"
   points="224.9,250.5 231.3,261.7 244.1,261.6 250.5,250.5 244.1,239.3 231.3,239.4 "
   id="polygon872"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 163.4,146.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path874" />
<path
   class="st0"
   d="m 176.2,146.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.6 1.5,1.5"
   id="path876" />
<path
   class="st0"
   d="m 163.5,168.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path878" />
<path
   class="st0"
   d="m 176.3,168.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path880" />
<path
   class="st0"
   d="m 157,157.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path882" />
<path
   class="st0"
   d="m 182.7,157.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path884" />
<polygon
   class="st1"
   points="244.2,261.7 250.6,272.8 263.4,272.8 269.8,261.6 263.4,250.5 250.6,250.5 "
   id="polygon886"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 182.7,157.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path888" />
<path
   class="st0"
   d="m 195.5,157.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path890" />
<path
   class="st0"
   d="m 182.7,180 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path892" />
<path
   class="st0"
   d="m 195.6,180 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path894" />
<path
   class="st0"
   d="m 176.3,168.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path896" />
<path
   class="st0"
   d="m 201.9,168.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path898" />
<polygon
   class="st1"
   points="263.4,272.8 269.9,283.9 282.7,283.9 289.1,272.8 282.6,261.6 269.8,261.6 "
   id="polygon900"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 201.9,168.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path902" />
<path
   class="st0"
   d="m 214.8,168.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path904" />
<path
   class="st0"
   d="m 202,191.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path906" />
<path
   class="st0"
   d="m 214.8,191.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.6 1.5,1.5"
   id="path908" />
<path
   class="st0"
   d="m 195.5,180 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path910" />
<path
   class="st0"
   d="m 221.2,180 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path912" />
<polygon
   class="st1"
   points="282.7,283.9 289.1,295.1 301.9,295.1 308.3,283.9 301.9,272.8 289.1,272.8 "
   id="polygon914"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 221.2,180 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path916" />
<path
   class="st0"
   d="m 234,180 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path918" />
<path
   class="st0"
   d="m 221.2,202.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path920" />
<path
   class="st0"
   d="m 234.1,202.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path922" />
<path
   class="st0"
   d="m 214.8,191.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path924" />
<path
   class="st0"
   d="m 240.5,191.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path926" />
<polygon
   class="st1"
   points="302,295.1 308.4,306.2 321.2,306.2 327.6,295 321.2,283.9 308.3,283.9 "
   id="polygon928"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 240.5,191.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path930" />
<path
   class="st0"
   d="m 253.3,191.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path932" />
<path
   class="st0"
   d="m 240.5,213.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path934" />
<path
   class="st0"
   d="m 253.3,213.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path936" />
<path
   class="st0"
   d="m 234.1,202.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path938" />
<path
   class="st0"
   d="m 259.7,202.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path940" />
<polygon
   class="st1"
   points="321.2,306.2 327.6,317.4 340.5,317.3 346.8,306.2 340.4,295 327.6,295.1 "
   id="polygon942"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 259.7,202.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path944" />
<path
   class="st0"
   d="m 272.6,202.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path946" />
<path
   class="st0"
   d="m 259.8,224.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path948" />
<path
   class="st0"
   d="m 272.6,224.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path950" />
<path
   class="st0"
   d="m 253.3,213.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.6 1.5,1.5"
   id="path952" />
<path
   class="st0"
   d="m 279,213.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path954" />
<polygon
   class="st1"
   points="340.5,317.4 346.9,328.5 359.7,328.5 366.1,317.3 359.7,306.2 346.9,306.2 "
   id="polygon956"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 279,213.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path958" />
<path
   class="st0"
   d="m 291.8,213.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path960" />
<path
   class="st0"
   d="m 279,235.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path962" />
<path
   class="st0"
   d="m 291.9,235.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path964" />
<path
   class="st0"
   d="m 272.6,224.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path966" />
<path
   class="st0"
   d="m 298.2,224.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path968" />
<polygon
   class="st1"
   points="359.8,328.5 366.2,339.7 379,339.6 385.4,328.5 378.9,317.3 366.1,317.3 "
   id="polygon970"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 298.3,224.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path972" />
<path
   class="st0"
   d="m 311.1,224.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path974" />
<path
   class="st0"
   d="m 298.3,246.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path976" />
<path
   class="st0"
   d="m 311.1,246.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.6 1.5,1.5"
   id="path978" />
<path
   class="st0"
   d="m 291.8,235.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path980" />
<path
   class="st0"
   d="m 317.5,235.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path982" />
<polygon
   class="st1"
   points="379,339.7 385.4,350.8 398.2,350.8 404.6,339.6 398.2,328.5 385.4,328.5 "
   id="polygon984"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 317.5,235.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path986" />
<path
   class="st0"
   d="m 330.4,235.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path988" />
<path
   class="st0"
   d="m 317.6,258 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path990" />
<path
   class="st0"
   d="m 330.4,258 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path992" />
<path
   class="st0"
   d="m 311.1,246.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path994" />
<path
   class="st0"
   d="m 336.8,246.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path996" />
<polygon
   class="st1"
   points="398.3,350.8 404.7,361.9 417.5,361.9 423.9,350.7 417.5,339.6 404.7,339.6 "
   id="polygon998"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 336.8,246.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path1000" />
<path
   class="st0"
   d="m 336.8,269.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1002" />
<path
   class="st0"
   d="m 330.4,258 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1004" />
<polygon
   class="st1"
   points="417.5,361.9 424,373.1 436.8,373.1 443.2,361.9 436.7,350.7 423.9,350.8 "
   id="polygon1006"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 41.5,90.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1008" />
<path
   class="st0"
   d="m 28.7,113.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1010" />
<path
   class="st0"
   d="m 41.5,113.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1012" />
<path
   class="st0"
   d="m 22.2,102.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1014" />
<path
   class="st0"
   d="m 47.9,102.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1016" />
<path
   class="st0"
   d="m 47.9,102.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path1018" />
<path
   class="st0"
   d="m 60.7,102 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path1020" />
<path
   class="st0"
   d="m 47.9,124.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1022" />
<path
   class="st0"
   d="m 60.8,124.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1024" />
<path
   class="st0"
   d="m 41.5,113.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1026" />
<path
   class="st0"
   d="m 67.2,113.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1028" />
<polygon
   class="st1"
   points="128.7,217.1 135.1,228.3 147.9,228.3 154.3,217.1 147.9,205.9 135,206 "
   id="polygon1030"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 67.2,113.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1032" />
<path
   class="st0"
   d="m 80,113.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1034" />
<path
   class="st0"
   d="m 67.2,135.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1036" />
<path
   class="st0"
   d="m 80,135.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1038" />
<path
   class="st0"
   d="m 60.8,124.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1040" />
<path
   class="st0"
   d="m 86.4,124.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.6 1.5,1.5"
   id="path1042" />
<polygon
   class="st1"
   points="147.9,228.3 154.4,239.4 167.2,239.4 173.5,228.2 167.1,217.1 154.3,217.1 "
   id="polygon1044"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 86.4,124.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path1046" />
<path
   class="st0"
   d="m 99.3,124.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1048" />
<path
   class="st0"
   d="m 86.5,146.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path1050" />
<path
   class="st0"
   d="m 99.3,146.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1052" />
<path
   class="st0"
   d="m 80,135.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1054" />
<path
   class="st0"
   d="m 105.7,135.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1056" />
<polygon
   class="st1"
   points="167.2,239.4 173.6,250.6 186.4,250.5 192.8,239.4 186.4,228.2 173.6,228.3 "
   id="polygon1058"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 105.7,135.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1060" />
<path
   class="st0"
   d="m 118.5,135.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.6 1.5,1.5"
   id="path1062" />
<path
   class="st0"
   d="m 105.7,157.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1064" />
<path
   class="st0"
   d="m 118.6,157.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1066" />
<path
   class="st0"
   d="m 99.3,146.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path1068" />
<path
   class="st0"
   d="m 124.9,146.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path1070" />
<polygon
   class="st1"
   points="186.5,250.6 192.9,261.7 205.7,261.7 212.1,250.5 205.6,239.4 192.8,239.4 "
   id="polygon1072"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 125,146.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1074" />
<path
   class="st0"
   d="m 137.8,146.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1076" />
<path
   class="st0"
   d="m 125,168.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1078" />
<path
   class="st0"
   d="m 137.8,168.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1080" />
<path
   class="st0"
   d="m 118.5,157.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1082" />
<path
   class="st0"
   d="m 144.2,157.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1084" />
<polygon
   class="st1"
   points="205.7,261.7 212.1,272.9 224.9,272.8 231.3,261.7 224.9,250.5 212.1,250.5 "
   id="polygon1086"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 144.2,157.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1088" />
<path
   class="st0"
   d="m 157.1,157.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1090" />
<path
   class="st0"
   d="m 144.3,180.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1092" />
<path
   class="st0"
   d="m 157.1,180.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path1094" />
<path
   class="st0"
   d="m 137.8,168.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1096" />
<path
   class="st0"
   d="m 163.5,168.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1098" />
<polygon
   class="st1"
   points="225,272.8 231.4,284 244.2,284 250.6,272.8 244.2,261.7 231.4,261.7 "
   id="polygon1100"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 163.5,168.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1102" />
<path
   class="st0"
   d="m 176.3,168.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1104" />
<path
   class="st0"
   d="m 163.5,191.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1106" />
<path
   class="st0"
   d="m 176.4,191.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1108" />
<path
   class="st0"
   d="m 157.1,180.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1110" />
<path
   class="st0"
   d="m 182.7,180.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1112" />
<polygon
   class="st1"
   points="244.2,284 250.7,295.1 263.5,295.1 269.9,283.9 263.4,272.8 250.6,272.8 "
   id="polygon1114"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 182.7,180.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.6 1.5,1.5"
   id="path1116" />
<path
   class="st0"
   d="m 195.6,180 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1118" />
<path
   class="st0"
   d="m 182.8,202.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path1120" />
<path
   class="st0"
   d="m 195.6,202.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path1122" />
<path
   class="st0"
   d="m 176.3,191.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1124" />
<path
   class="st0"
   d="m 202,191.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1126" />
<polygon
   class="st1"
   points="263.5,295.1 269.9,306.3 282.7,306.3 289.1,295.1 282.7,283.9 269.9,284 "
   id="polygon1128"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 202,191.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1130" />
<path
   class="st0"
   d="m 214.8,191.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1132" />
<path
   class="st0"
   d="m 202.1,213.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.4,0.7 1.5,1.5"
   id="path1134" />
<path
   class="st0"
   d="m 214.9,213.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1136" />
<path
   class="st0"
   d="m 195.6,202.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path1138" />
<path
   class="st0"
   d="m 221.3,202.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path1140" />
<polygon
   class="st1"
   points="282.8,306.3 289.2,317.4 302,317.4 308.4,306.2 302,295.1 289.2,295.1 "
   id="polygon1142"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 221.3,202.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1144" />
<path
   class="st0"
   d="m 234.1,202.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1146" />
<path
   class="st0"
   d="m 221.3,224.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path1148" />
<path
   class="st0"
   d="m 234.1,224.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path1150" />
<path
   class="st0"
   d="m 214.9,213.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1152" />
<path
   class="st0"
   d="m 240.5,213.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1154" />
<polygon
   class="st1"
   points="302,317.4 308.5,328.6 321.3,328.5 327.6,317.4 321.2,306.2 308.4,306.2 "
   id="polygon1156"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 240.5,213.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1158" />
<path
   class="st0"
   d="m 253.4,213.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path1160" />
<path
   class="st0"
   d="m 240.6,235.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1162" />
<path
   class="st0"
   d="m 253.4,235.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1164" />
<path
   class="st0"
   d="m 234.1,224.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path1166" />
<path
   class="st0"
   d="m 259.8,224.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1168" />
<polygon
   class="st1"
   points="321.3,328.6 327.7,339.7 340.5,339.7 346.9,328.5 340.5,317.4 327.7,317.4 "
   id="polygon1170"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 259.8,224.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1172" />
<path
   class="st0"
   d="m 272.6,224.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1174" />
<path
   class="st0"
   d="m 259.8,246.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path1176" />
<path
   class="st0"
   d="m 272.7,246.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1178" />
<path
   class="st0"
   d="m 253.4,235.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1180" />
<path
   class="st0"
   d="m 279.1,235.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.4,0.7 1.5,1.5"
   id="path1182" />
<polygon
   class="st1"
   points="340.6,339.7 347,350.8 359.8,350.8 366.2,339.6 359.7,328.5 346.9,328.5 "
   id="polygon1184"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 279.1,235.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path1186" />
<path
   class="st0"
   d="m 291.9,235.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1188" />
<path
   class="st0"
   d="m 279.1,258.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1190" />
<path
   class="st0"
   d="m 291.9,258.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.6 1.5,1.5"
   id="path1192" />
<path
   class="st0"
   d="m 272.6,246.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path1194" />
<path
   class="st0"
   d="m 298.3,246.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1196" />
<polygon
   class="st1"
   points="359.8,350.8 366.2,362 379,362 385.4,350.8 379,339.6 366.2,339.7 "
   id="polygon1198"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 298.3,246.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1200" />
<path
   class="st0"
   d="m 311.2,246.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1202" />
<path
   class="st0"
   d="m 298.4,269.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1204" />
<path
   class="st0"
   d="m 311.2,269.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1206" />
<path
   class="st0"
   d="m 291.9,258.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1208" />
<path
   class="st0"
   d="m 317.6,258.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path1210" />
<polygon
   class="st1"
   points="379.1,362 385.5,373.1 398.3,373.1 404.7,361.9 398.3,350.8 385.5,350.8 "
   id="polygon1212"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 317.6,258 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1214" />
<path
   class="st0"
   d="m 330.4,258 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1216" />
<path
   class="st0"
   d="m 317.6,280.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.6 1.5,1.5"
   id="path1218" />
<path
   class="st0"
   d="m 330.5,280.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1220" />
<path
   class="st0"
   d="m 311.2,269.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1222" />
<path
   class="st0"
   d="m 336.8,269.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1224" />
<polygon
   class="st1"
   points="398.3,373.1 404.8,384.3 417.6,384.2 424,373.1 417.5,361.9 404.7,362 "
   id="polygon1226"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 336.9,269.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1228" />
<path
   class="st0"
   d="m 336.9,291.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1230" />
<path
   class="st0"
   d="m 330.4,280.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.6 1.5,1.5"
   id="path1232" />
<polygon
   class="st1"
   points="417.6,384.3 424,395.4 436.8,395.4 443.2,384.2 436.8,373.1 424,373.1 "
   id="polygon1234"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 9.4,102.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1236" />
<path
   class="st0"
   d="m 22.2,102.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1238" />
<path
   class="st0"
   d="m 9.5,124.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1240" />
<path
   class="st0"
   d="m 22.3,124.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1242" />
<path
   class="st0"
   d="m 3,113.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1244" />
<path
   class="st0"
   d="m 28.7,113.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1246" />
<polygon
   class="st1"
   points="90.2,217.2 96.6,228.3 109.4,228.3 115.8,217.1 109.4,206 96.6,206 "
   id="polygon1248"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 28.7,113.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path1250" />
<path
   class="st0"
   d="m 41.5,113.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path1252" />
<path
   class="st0"
   d="m 28.7,135.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1254" />
<path
   class="st0"
   d="m 41.6,135.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1256" />
<path
   class="st0"
   d="m 22.3,124.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1258" />
<path
   class="st0"
   d="m 47.9,124.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1260" />
<polygon
   class="st1"
   points="109.4,228.3 115.9,239.5 128.7,239.5 135.1,228.3 128.6,217.1 115.8,217.2 "
   id="polygon1262"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 47.9,124.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1264" />
<path
   class="st0"
   d="m 60.8,124.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1266" />
<path
   class="st0"
   d="m 48,146.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1268" />
<path
   class="st0"
   d="m 60.8,146.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1270" />
<path
   class="st0"
   d="m 41.5,135.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1272" />
<path
   class="st0"
   d="m 67.2,135.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path1274" />
<polygon
   class="st1"
   points="128.7,239.5 135.1,250.6 147.9,250.6 154.3,239.4 147.9,228.3 135.1,228.3 "
   id="polygon1276"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 67.2,135.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1278" />
<path
   class="st0"
   d="m 80,135.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1280" />
<path
   class="st0"
   d="m 67.2,157.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.6 1.5,1.5"
   id="path1282" />
<path
   class="st0"
   d="m 80.1,157.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1284" />
<path
   class="st0"
   d="m 60.8,146.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1286" />
<path
   class="st0"
   d="m 86.5,146.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1288" />
<polygon
   class="st1"
   points="148,250.6 154.4,261.8 167.2,261.7 173.6,250.6 167.2,239.4 154.3,239.4 "
   id="polygon1290"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 86.5,146.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1292" />
<path
   class="st0"
   d="m 99.3,146.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path1294" />
<path
   class="st0"
   d="m 86.5,169 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1296" />
<path
   class="st0"
   d="m 80.1,157.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path1298" />
<path
   class="st0"
   d="m 105.7,157.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path1300" />
<path
   class="st0"
   d="m 105.7,157.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path1302" />
<path
   class="st0"
   d="m 118.6,157.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1304" />
<path
   class="st0"
   d="m 105.8,180.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1306" />
<path
   class="st0"
   d="m 118.6,180.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1308" />
<path
   class="st0"
   d="m 125,169 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1310" />
<path
   class="st0"
   d="m 125,169 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1312" />
<path
   class="st0"
   d="m 137.8,168.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path1314" />
<path
   class="st0"
   d="m 125,191.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1316" />
<path
   class="st0"
   d="m 137.9,191.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path1318" />
<path
   class="st0"
   d="m 118.6,180.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1320" />
<path
   class="st0"
   d="m 144.2,180.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path1322" />
<polygon
   class="st1"
   points="205.8,284 212.2,295.2 225,295.2 231.4,284 224.9,272.9 212.1,272.9 "
   id="polygon1324"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 144.3,180.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1326" />
<path
   class="st0"
   d="m 157.1,180.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1328" />
<path
   class="st0"
   d="m 144.3,202.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1330" />
<path
   class="st0"
   d="m 157.1,202.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1332" />
<path
   class="st0"
   d="m 137.8,191.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1334" />
<path
   class="st0"
   d="m 163.5,191.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1336" />
<polygon
   class="st1"
   points="225,295.2 231.4,306.3 244.2,306.3 250.6,295.1 244.2,284 231.4,284 "
   id="polygon1338"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 163.5,191.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.6 1.5,1.5"
   id="path1340" />
<path
   class="st0"
   d="m 176.4,191.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1342" />
<path
   class="st0"
   d="m 163.6,213.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path1344" />
<path
   class="st0"
   d="m 176.4,213.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1346" />
<path
   class="st0"
   d="m 157.1,202.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1348" />
<path
   class="st0"
   d="m 182.8,202.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1350" />
<polygon
   class="st1"
   points="244.3,306.3 250.7,317.5 263.5,317.4 269.9,306.3 263.5,295.1 250.7,295.2 "
   id="polygon1352"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 182.8,202.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1354" />
<path
   class="st0"
   d="m 195.6,202.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1356" />
<path
   class="st0"
   d="m 182.8,224.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1358" />
<path
   class="st0"
   d="m 195.7,224.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1360" />
<path
   class="st0"
   d="m 176.4,213.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path1362" />
<path
   class="st0"
   d="m 202,213.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.6 1.5,1.5"
   id="path1364" />
<polygon
   class="st1"
   points="263.5,317.5 270,328.6 282.8,328.6 289.2,317.4 282.7,306.3 269.9,306.3 "
   id="polygon1366"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 202,213.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path1368" />
<path
   class="st0"
   d="m 214.9,213.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1370" />
<path
   class="st0"
   d="m 202.1,235.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1372" />
<path
   class="st0"
   d="m 214.9,235.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1374" />
<path
   class="st0"
   d="m 195.6,224.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1376" />
<path
   class="st0"
   d="m 221.3,224.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1378" />
<polygon
   class="st1"
   points="282.8,328.6 289.2,339.8 302,339.7 308.4,328.6 302,317.4 289.2,317.4 "
   id="polygon1380"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 221.3,224.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1382" />
<path
   class="st0"
   d="m 234.1,224.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.6 1.5,1.5"
   id="path1384" />
<path
   class="st0"
   d="m 221.3,247 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1386" />
<path
   class="st0"
   d="m 234.2,247 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path1388" />
<path
   class="st0"
   d="m 214.9,235.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1390" />
<path
   class="st0"
   d="m 240.6,235.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1392" />
<polygon
   class="st1"
   points="302.1,339.8 308.5,350.9 321.3,350.9 327.7,339.7 321.3,328.6 308.5,328.6 "
   id="polygon1394"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 240.6,235.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1396" />
<path
   class="st0"
   d="m 253.4,235.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1398" />
<path
   class="st0"
   d="m 240.6,258.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path1400" />
<path
   class="st0"
   d="m 253.4,258.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1402" />
<path
   class="st0"
   d="m 234.2,247 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1404" />
<path
   class="st0"
   d="m 259.8,247 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1406" />
<polygon
   class="st1"
   points="321.3,350.9 327.8,362 340.6,362 346.9,350.8 340.5,339.7 327.7,339.7 "
   id="polygon1408"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 259.8,247 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.6 1.5,1.5"
   id="path1410" />
<path
   class="st0"
   d="m 272.7,246.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1412" />
<path
   class="st0"
   d="m 259.9,269.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1414" />
<path
   class="st0"
   d="m 272.7,269.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1416" />
<path
   class="st0"
   d="m 253.4,258.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path1418" />
<path
   class="st0"
   d="m 279.1,258.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1420" />
<polygon
   class="st1"
   points="340.6,362 347,373.2 359.8,373.2 366.2,362 359.8,350.8 347,350.9 "
   id="polygon1422"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 279.1,258.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1424" />
<path
   class="st0"
   d="m 291.9,258.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1426" />
<path
   class="st0"
   d="m 279.1,280.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1428" />
<path
   class="st0"
   d="m 292,280.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1430" />
<path
   class="st0"
   d="m 272.7,269.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1432" />
<path
   class="st0"
   d="m 298.3,269.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.6 1.5,1.5"
   id="path1434" />
<polygon
   class="st1"
   points="359.9,373.2 366.3,384.3 379.1,384.3 385.5,373.1 379,362 366.2,362 "
   id="polygon1436"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 298.4,269.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1438" />
<path
   class="st0"
   d="m 311.2,269.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1440" />
<path
   class="st0"
   d="m 298.4,291.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path1442" />
<path
   class="st0"
   d="m 311.2,291.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path1444" />
<path
   class="st0"
   d="m 291.9,280.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1446" />
<path
   class="st0"
   d="m 317.6,280.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1448" />
<polygon
   class="st1"
   points="379.1,384.3 385.5,395.5 398.3,395.4 404.7,384.3 398.3,373.1 385.5,373.1 "
   id="polygon1450"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 317.6,280.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1452" />
<path
   class="st0"
   d="m 330.5,280.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path1454" />
<path
   class="st0"
   d="m 317.7,302.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1456" />
<path
   class="st0"
   d="m 330.5,302.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1458" />
<path
   class="st0"
   d="m 311.2,291.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path1460" />
<path
   class="st0"
   d="m 336.9,291.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1462" />
<polygon
   class="st1"
   points="398.4,395.5 404.8,406.6 417.6,406.6 424,395.4 417.6,384.3 404.8,384.3 "
   id="polygon1464"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 336.9,291.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1466" />
<path
   class="st0"
   d="m 336.9,313.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path1468" />
<path
   class="st0"
   d="m 330.5,302.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1470" />
<polygon
   class="st1"
   points="417.6,406.6 424.1,417.7 436.9,417.7 443.3,406.6 436.8,395.4 424,395.4 "
   id="polygon1472"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 9.5,124.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1474" />
<path
   class="st0"
   d="m 22.3,124.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1476" />
<path
   class="st0"
   d="m 9.5,146.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.6 1.5,1.5"
   id="path1478" />
<path
   class="st0"
   d="m 22.4,146.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1480" />
<path
   class="st0"
   d="m 3.1,135.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1482" />
<path
   class="st0"
   d="m 28.7,135.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1484" />
<polygon
   class="st1"
   points="90.2,239.5 96.7,250.7 109.5,250.6 115.9,239.5 109.4,228.3 96.6,228.4 "
   id="polygon1486"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 28.7,135.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1488" />
<path
   class="st0"
   d="m 41.6,135.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path1490" />
<path
   class="st0"
   d="m 28.8,157.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1492" />
<path
   class="st0"
   d="m 41.6,157.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1494" />
<path
   class="st0"
   d="m 22.3,146.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.6 1.5,1.5"
   id="path1496" />
<path
   class="st0"
   d="m 48,146.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1498" />
<polygon
   class="st1"
   points="109.5,250.7 115.9,261.8 128.7,261.8 135.1,250.6 128.7,239.5 115.9,239.5 "
   id="polygon1500"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 48,146.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path1502" />
<path
   class="st0"
   d="m 60.8,146.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1504" />
<path
   class="st0"
   d="m 48.1,169 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1506" />
<path
   class="st0"
   d="m 60.9,169 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1508" />
<path
   class="st0"
   d="m 41.6,157.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1510" />
<path
   class="st0"
   d="m 67.3,157.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1512" />
<polygon
   class="st1"
   points="128.8,261.8 135.2,272.9 148,272.9 154.4,261.8 148,250.6 135.2,250.6 "
   id="polygon1514"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 67.3,157.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1516" />
<path
   class="st0"
   d="m 80.1,157.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1518" />
<path
   class="st0"
   d="m 67.3,180.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1520" />
<path
   class="st0"
   d="m 80.1,180.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.6 1.5,1.5"
   id="path1522" />
<path
   class="st0"
   d="m 60.9,169 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1524" />
<path
   class="st0"
   d="m 86.5,169 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path1526" />
<polygon
   class="st1"
   points="148,272.9 154.5,284.1 167.3,284.1 173.6,272.9 167.2,261.8 154.4,261.8 "
   id="polygon1528"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 86.5,169 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1530" />
<path
   class="st0"
   d="m 99.4,191.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1532" />
<path
   class="st0"
   d="m 80.1,180.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1534" />
<path
   class="st0"
   d="m 105.8,180.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1536" />
<path
   class="st0"
   d="m 105.8,180.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path1538" />
<path
   class="st0"
   d="m 118.6,180.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path1540" />
<path
   class="st0"
   d="m 105.8,202.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.6 1.5,1.5"
   id="path1542" />
<path
   class="st0"
   d="m 118.7,202.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1544" />
<path
   class="st0"
   d="m 99.4,191.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1546" />
<path
   class="st0"
   d="m 125.1,191.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.4,0.7 1.5,1.5"
   id="path1548" />
<polygon
   class="st1"
   points="186.6,295.2 193,306.4 205.8,306.3 212.2,295.2 205.7,284 192.9,284.1 "
   id="polygon1550"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 125.1,191.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1552" />
<path
   class="st0"
   d="m 137.9,191.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1554" />
<path
   class="st0"
   d="m 125.1,213.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1556" />
<path
   class="st0"
   d="m 137.9,213.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1558" />
<path
   class="st0"
   d="m 118.6,202.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.6 1.5,1.5"
   id="path1560" />
<path
   class="st0"
   d="m 144.3,202.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.6 1.5,1.5"
   id="path1562" />
<polygon
   class="st1"
   points="205.8,306.4 212.2,317.5 225.1,317.5 231.4,306.3 225,295.2 212.2,295.2 "
   id="polygon1564"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 144.3,202.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path1566" />
<path
   class="st0"
   d="m 157.2,202.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1568" />
<path
   class="st0"
   d="m 144.4,224.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1570" />
<path
   class="st0"
   d="m 157.2,224.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1572" />
<path
   class="st0"
   d="m 137.9,213.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1574" />
<path
   class="st0"
   d="m 163.6,213.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1576" />
<polygon
   class="st1"
   points="225.1,317.5 231.5,328.7 244.3,328.6 250.7,317.5 244.3,306.3 231.5,306.3 "
   id="polygon1578"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 163.6,213.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1580" />
<path
   class="st0"
   d="m 176.4,213.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.6 1.5,1.5"
   id="path1582" />
<path
   class="st0"
   d="m 163.6,235.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1584" />
<path
   class="st0"
   d="m 176.5,235.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path1586" />
<path
   class="st0"
   d="m 157.2,224.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1588" />
<path
   class="st0"
   d="m 182.8,224.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path1590" />
<polygon
   class="st1"
   points="244.3,328.7 250.8,339.8 263.6,339.8 270,328.6 263.5,317.5 250.7,317.5 "
   id="polygon1592"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 183,269.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1594" />
<polygon
   class="st1"
   points="263.7,362.2 270.1,373.4 282.9,373.3 289.3,362.2 282.9,351 270.1,351 "
   id="polygon1596"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 144.5,269.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1598" />
<path
   class="st0"
   d="m 157.4,269.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path1600" />
<polygon
   class="st1"
   points="225.2,362.3 231.7,373.4 244.5,373.4 250.9,362.2 244.4,351.1 231.6,351.1 "
   id="polygon1602"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 163.8,280.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1604" />
<path
   class="st0"
   d="m 176.6,280.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1606" />
<path
   class="st0"
   d="m 157.3,269.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1608" />
<path
   class="st0"
   d="m 144.5,247.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.6 1.5,1.5"
   id="path1610" />
<path
   class="st0"
   d="m 157.3,247.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.6 1.5,1.5"
   id="path1612" />
<path
   class="st0"
   d="m 183,269.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1614" />
<polygon
   class="st1"
   points="244.5,373.4 250.9,384.5 263.7,384.5 270.1,373.3 263.7,362.2 250.9,362.2 "
   id="polygon1616"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 183,269.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path1618" />
<path
   class="st0"
   d="m 157.3,291.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1620" />
<path
   class="st0"
   d="m 183,291.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1622" />
<path
   class="st0"
   d="m 176.6,280.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1624" />
<path
   class="st0"
   d="m 163.8,302.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1626" />
<path
   class="st0"
   d="m 176.6,302.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path1628" />
<polygon
   class="st1"
   points="244.5,395.6 250.9,406.8 263.7,406.8 270.1,395.6 263.7,384.4 250.9,384.5 "
   id="polygon1630"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 176.6,302.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path1632" />
<path
   class="st0"
   d="m 182.9,224.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1634" />
<path
   class="st0"
   d="m 195.7,224.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1636" />
<path
   class="st0"
   d="m 182.9,247 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1638" />
<path
   class="st0"
   d="m 195.7,247 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1640" />
<path
   class="st0"
   d="m 176.4,235.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1642" />
<path
   class="st0"
   d="m 202.1,235.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1644" />
<polygon
   class="st1"
   points="263.6,339.8 270,350.9 282.8,350.9 289.2,339.7 282.8,328.6 270,328.6 "
   id="polygon1646"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 202.1,235.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.6 1.5,1.5"
   id="path1648" />
<path
   class="st0"
   d="m 214.9,235.8 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path1650" />
<path
   class="st0"
   d="m 202.2,258.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1652" />
<path
   class="st0"
   d="m 215,258.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1654" />
<path
   class="st0"
   d="m 195.7,247 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1656" />
<path
   class="st0"
   d="m 221.4,247 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1658" />
<polygon
   class="st1"
   points="282.9,350.9 289.3,362.1 302.1,362.1 308.5,350.9 302.1,339.7 289.3,339.8 "
   id="polygon1660"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 221.4,247 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1662" />
<path
   class="st0"
   d="m 195.7,269.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path1664" />
<path
   class="st0"
   d="m 221.4,269.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1666" />
<path
   class="st0"
   d="m 234.2,247 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1668" />
<path
   class="st0"
   d="m 234.3,269.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.4,0.7 1.5,1.5"
   id="path1670" />
<path
   class="st0"
   d="m 215,258.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1672" />
<path
   class="st0"
   d="m 163.9,258.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1674" />
<path
   class="st0"
   d="m 138.1,258.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1676" />
<path
   class="st0"
   d="m 176.7,258.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1678" />
<path
   class="st0"
   d="m 240.6,258.2 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.6 1.5,1.5"
   id="path1680" />
<polygon
   class="st1"
   points="302.1,362.1 308.6,373.2 321.4,373.2 327.8,362 321.3,350.9 308.5,350.9 "
   id="polygon1682"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 240.6,258.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path1684" />
<path
   class="st0"
   d="m 253.5,258.1 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1686" />
<path
   class="st0"
   d="m 253.5,280.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path1688" />
<path
   class="st0"
   d="m 234.2,269.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1690" />
<path
   class="st0"
   d="m 259.9,269.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1692" />
<path
   class="st0"
   d="m 259.9,269.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1694" />
<path
   class="st0"
   d="m 272.7,269.3 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.6 1.5,1.5"
   id="path1696" />
<path
   class="st0"
   d="m 259.9,291.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1698" />
<path
   class="st0"
   d="m 272.8,291.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1700" />
<path
   class="st0"
   d="m 253.5,280.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path1702" />
<path
   class="st0"
   d="m 279.2,280.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1704" />
<polygon
   class="st1"
   points="340.7,384.4 347.1,395.5 359.9,395.5 366.3,384.3 359.9,373.2 347,373.2 "
   id="polygon1706"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 279.2,280.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1708" />
<path
   class="st0"
   d="m 292,280.4 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1710" />
<path
   class="st0"
   d="m 279.2,302.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1712" />
<path
   class="st0"
   d="m 292,302.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1714" />
<path
   class="st0"
   d="m 272.8,291.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.4,0.7 1.5,1.5"
   id="path1716" />
<path
   class="st0"
   d="m 298.4,291.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1718" />
<polygon
   class="st1"
   points="359.9,395.5 366.3,406.6 379.2,406.6 385.5,395.5 379.1,384.3 366.3,384.3 "
   id="polygon1720"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 298.4,291.6 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1722" />
<path
   class="st0"
   d="m 311.3,291.5 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1724" />
<path
   class="st0"
   d="m 298.5,313.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1726" />
<path
   class="st0"
   d="m 311.3,313.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path1728" />
<path
   class="st0"
   d="m 292,302.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0.1 1.5,0.7 1.5,1.5"
   id="path1730" />
<path
   class="st0"
   d="m 317.7,302.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0.1 1.5,0.7 1.5,1.5"
   id="path1732" />
<polygon
   class="st1"
   points="379.2,406.6 385.6,417.8 398.4,417.8 404.8,406.6 398.4,395.5 385.6,395.5 "
   id="polygon1734"
   transform="translate(-88.6,-103.9)" />
<path
   class="st0"
   d="m 317.7,302.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1736" />
<path
   class="st0"
   d="m 330.5,302.7 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1738" />
<path
   class="st0"
   d="m 311.3,313.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.7 1.5,1.5"
   id="path1740" />
<path
   class="st0"
   d="m 336.9,313.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.9,0 1.5,0.7 1.5,1.5"
   id="path1742" />
<path
   class="st0"
   d="m 337,313.9 c 0,0.8 -0.7,1.5 -1.5,1.5 -0.8,0 -1.5,-0.7 -1.5,-1.5 0,-0.8 0.7,-1.5 1.5,-1.5 0.8,0 1.5,0.6 1.5,1.5"
   id="path1744" />
<line
   class="st2"
   x1="339.79999"
   y1="410.60001"
   x2="339.79999"
   y2="-499.89999"
   id="line1746" />
</svg>

        `,
        "2": `
        <?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg class="svg-dec"
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   version="1.1"
   id="Ebene_1"
   x="0px"
   y="0px"
   viewBox="0 0 399.79007 355.20001"
   xml:space="preserve"
   sodipodi:docname="wabe3.svg"
   width="399.79007"
   height="355.20001"
   inkscape:version="1.0.2 (e86c870879, 2021-01-15, custom)"><metadata
   id="metadata1753"><rdf:RDF><cc:Work
       rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type
         rdf:resource="http://purl.org/dc/dcmitype/StillImage" /><dc:title></dc:title></cc:Work></rdf:RDF></metadata><defs
   id="defs1751" /><sodipodi:namedview
   pagecolor="#000000"
   bordercolor="#666666"
   borderopacity="1"
   objecttolerance="10"
   gridtolerance="10"
   guidetolerance="10"
   inkscape:pageopacity="0"
   inkscape:pageshadow="2"
   inkscape:window-width="2880"
   inkscape:window-height="1526"
   id="namedview1749"
   showgrid="false"
   inkscape:zoom="1.96875"
   inkscape:cx="201.1"
   inkscape:cy="169.7"
   inkscape:window-x="-11"
   inkscape:window-y="1609"
   inkscape:window-maximized="1"
   inkscape:current-layer="Ebene_1" />
<style
   type="text/css"
   id="style2">
	.st0{fill:#000000;}
	.st1{fill:none;stroke:#000000;stroke-width:0.5032;stroke-miterlimit:10;}
	.st2{fill:none;}
</style>
<path
   class="st0"
   d="m 75.4,1.7 c 0,0.9 -0.7,1.7 -1.7,1.7 C 72.8,3.4 72,2.7 72,1.7 72,0.8 72.7,0 73.6,0 c 1,0 1.8,0.8 1.8,1.7"
   id="path4" />
<path
   class="st0"
   d="m 89.8,1.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path6" />
<path
   class="st0"
   d="m 75.4,26.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path8" />
<path
   class="st0"
   d="m 89.9,26.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path10" />
<path
   class="st0"
   d="m 68.1,14.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path12" />
<path
   class="st0"
   d="m 97.1,14.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.7 1.8,1.7"
   id="path14" />
<polygon
   class="st1"
   points="121.4,100.6 128.7,113.1 143.1,113.1 150.3,100.5 143.1,88 128.6,88 "
   id="polygon16"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 97.1,14.2 c 0,0.9 -0.7,1.7 -1.6,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 0.9,0.1 1.7,0.8 1.7,1.7"
   id="path18" />
<path
   class="st0"
   d="m 111.5,14.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path20" />
<path
   class="st0"
   d="m 97.1,39.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path22" />
<path
   class="st0"
   d="m 111.6,39.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path24" />
<path
   class="st0"
   d="m 89.8,26.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path26" />
<path
   class="st0"
   d="m 118.8,26.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path28" />
<polygon
   class="st1"
   points="143.1,113.1 150.4,125.7 164.8,125.6 172,113.1 164.8,100.5 150.3,100.5 "
   id="polygon30"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 118.8,26.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path32" />
<path
   class="st0"
   d="m 133.2,26.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path34" />
<path
   class="st0"
   d="m 118.8,51.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path36" />
<path
   class="st0"
   d="m 133.3,51.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path38" />
<path
   class="st0"
   d="m 111.5,39.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path40" />
<path
   class="st0"
   d="m 140.5,39.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.7 1.8,1.7"
   id="path42" />
<polygon
   class="st1"
   points="164.8,125.7 172.1,138.2 186.5,138.2 193.7,125.6 186.5,113.1 172,113.1 "
   id="polygon44"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 140.5,39.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path46" />
<path
   class="st0"
   d="m 154.9,39.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path48" />
<path
   class="st0"
   d="m 140.5,64.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path50" />
<path
   class="st0"
   d="m 155,64.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path52" />
<path
   class="st0"
   d="m 133.2,51.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path54" />
<path
   class="st0"
   d="m 162.2,51.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path56" />
<polygon
   class="st1"
   points="186.5,138.2 193.8,150.8 208.2,150.7 215.4,138.2 208.2,125.6 193.7,125.6 "
   id="polygon58"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 162.2,51.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path60" />
<path
   class="st0"
   d="m 162.2,77 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path62" />
<path
   class="st0"
   d="m 154.9,64.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path64" />
<path
   class="st0"
   d="m 183.9,89.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path66" />
<path
   class="st0"
   d="m 198.4,89.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path68" />
<path
   class="st0"
   d="m 205.6,102.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path70" />
<path
   class="st0"
   d="m 220.1,102.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path72" />
<path
   class="st0"
   d="m 198.3,89.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path74" />
<path
   class="st0"
   d="m 227.3,89.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1,0 1.8,0.7 1.8,1.7"
   id="path76" />
<path
   class="st0"
   d="m 227.3,89.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path78" />
<path
   class="st0"
   d="m 241.7,89.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path80" />
<path
   class="st0"
   d="m 270.3,89.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path82" />
<path
   class="st0"
   d="m 249.1,77 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path84" />
<path
   class="st0"
   d="m 227.3,114.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path86" />
<path
   class="st0"
   d="m 241.8,114.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path88" />
<path
   class="st0"
   d="m 220,102.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path90" />
<path
   class="st0"
   d="m 249,102.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path92" />
<polygon
   class="st1"
   points="273.3,188.4 280.6,201 295,201 302.2,188.4 295,175.8 280.5,175.8 "
   id="polygon94"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 249,102.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path96" />
<path
   class="st0"
   d="m 263.4,102.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path98" />
<path
   class="st0"
   d="m 292.3,102.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path100" />
<path
   class="st0"
   d="m 249,127.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path102" />
<path
   class="st0"
   d="m 263.5,127.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path104" />
<path
   class="st0"
   d="m 241.7,114.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path106" />
<path
   class="st0"
   d="m 270.7,114.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.7 1.8,1.7"
   id="path108" />
<polygon
   class="st1"
   points="295,201 302.3,213.5 316.7,213.5 323.9,200.9 316.7,188.4 302.2,188.4 "
   id="polygon110"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 263.3,77 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path112" />
<polygon
   class="st1"
   points="295,175.9 302.2,188.4 316.6,188.4 323.8,175.8 316.6,163.3 302.1,163.3 "
   id="polygon114"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 306.8,102.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path116" />
<path
   class="st0"
   d="m 335.3,102.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.7 1.8,1.7"
   id="path118" />
<polygon
   class="st1"
   points="338.4,201 345.6,213.5 360.1,213.5 367.3,200.9 360,188.4 345.6,188.4 "
   id="polygon120"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 328.4,89.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path122" />
<polygon
   class="st1"
   points="360,188.4 367.2,200.9 381.7,200.9 388.9,188.3 381.6,175.8 367.2,175.8 "
   id="polygon124"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 270.7,114.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path126" />
<path
   class="st0"
   d="m 285.1,114.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path128" />
<path
   class="st0"
   d="m 313.8,114.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path130" />
<path
   class="st0"
   d="m 328.6,114.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path132" />
<path
   class="st0"
   d="m 313.8,89.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.7 1.8,1.7"
   id="path134" />
<path
   class="st0"
   d="m 270.7,139.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path136" />
<path
   class="st0"
   d="m 285.2,139.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path138" />
<path
   class="st0"
   d="m 263.4,127.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path140" />
<path
   class="st0"
   d="m 292.4,127.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.7,0.8 1.8,1.7"
   id="path142" />
<polygon
   class="st1"
   points="316.7,213.5 324,226.1 338.4,226.1 345.6,213.5 338.4,200.9 323.9,200.9 "
   id="polygon144"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 292.4,127.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path146" />
<path
   class="st0"
   d="m 306.8,127.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path148" />
<path
   class="st0"
   d="m 292.4,152.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path150" />
<path
   class="st0"
   d="m 306.9,152.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path152" />
<path
   class="st0"
   d="m 285.1,139.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path154" />
<path
   class="st0"
   d="m 314.1,139.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.7,0.7 1.8,1.7"
   id="path156" />
<polygon
   class="st1"
   points="338.4,226.1 345.7,238.6 360.1,238.6 367.3,226 360,213.5 345.6,213.5 "
   id="polygon158"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 314.1,139.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path160" />
<path
   class="st0"
   d="m 328.5,139.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path162" />
<path
   class="st0"
   d="m 314.1,164.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path164" />
<path
   class="st0"
   d="m 328.6,164.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path166" />
<path
   class="st0"
   d="m 306.8,152.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path168" />
<path
   class="st0"
   d="m 335.8,152.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.7,0.8 1.8,1.7"
   id="path170" />
<polygon
   class="st1"
   points="360.1,238.6 367.4,251.2 381.8,251.2 389,238.6 381.7,226 367.3,226 "
   id="polygon172"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 335.8,152.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path174" />
<path
   class="st0"
   d="m 350.2,152.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path176" />
<path
   class="st0"
   d="m 335.8,177.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path178" />
<path
   class="st0"
   d="m 350.3,177.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path180" />
<path
   class="st0"
   d="m 328.5,164.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path182" />
<path
   class="st0"
   d="m 357.4,164.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path184" />
<polygon
   class="st1"
   points="381.8,251.2 389.1,263.7 403.5,263.7 410.7,251.1 403.4,238.6 389,238.6 "
   id="polygon186"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 357.5,164.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path188" />
<path
   class="st0"
   d="m 357.5,190 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path190" />
<path
   class="st0"
   d="m 350.2,177.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path192" />
<path
   class="st0"
   d="m 379.2,202.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path194" />
<path
   class="st0"
   d="m 75.5,26.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path196" />
<path
   class="st0"
   d="m 89.9,26.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path198" />
<path
   class="st0"
   d="m 75.5,52 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path200" />
<path
   class="st0"
   d="m 90,51.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path202" />
<path
   class="st0"
   d="m 68.2,39.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path204" />
<path
   class="st0"
   d="m 97.1,39.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path206" />
<polygon
   class="st1"
   points="121.5,125.7 128.8,138.3 143.2,138.2 150.4,125.7 143.1,113.1 128.7,113.1 "
   id="polygon208"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 97.2,39.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path210" />
<path
   class="st0"
   d="m 111.6,39.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path212" />
<path
   class="st0"
   d="m 97.2,64.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path214" />
<path
   class="st0"
   d="m 111.7,64.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path216" />
<path
   class="st0"
   d="m 89.9,52 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path218" />
<path
   class="st0"
   d="m 118.8,52 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path220" />
<polygon
   class="st1"
   points="143.2,138.3 150.5,150.8 164.9,150.8 172.1,138.2 164.8,125.7 150.4,125.7 "
   id="polygon222"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 118.9,51.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.7,0.8 1.8,1.7"
   id="path224" />
<path
   class="st0"
   d="m 133.3,51.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path226" />
<path
   class="st0"
   d="m 118.9,77.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path228" />
<path
   class="st0"
   d="m 133.4,77 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path230" />
<path
   class="st0"
   d="m 111.6,64.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path232" />
<path
   class="st0"
   d="m 140.5,64.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path234" />
<polygon
   class="st1"
   points="164.9,150.8 172.2,163.4 186.6,163.3 193.8,150.8 186.5,138.2 172.1,138.2 "
   id="polygon236"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 140.6,64.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.7,0.8 1.8,1.7"
   id="path238" />
<path
   class="st0"
   d="m 155,64.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path240" />
<path
   class="st0"
   d="m 140.6,89.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path242" />
<path
   class="st0"
   d="m 155.1,89.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.7,0.8 1.8,1.7"
   id="path244" />
<path
   class="st0"
   d="m 133.3,77.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path246" />
<path
   class="st0"
   d="m 162.2,77.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path248" />
<polygon
   class="st1"
   points="186.6,163.4 193.9,175.9 208.3,175.9 215.5,163.3 208.2,150.8 193.8,150.8 "
   id="polygon250"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 162.3,77 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.7,0.8 1.8,1.7"
   id="path252" />
<path
   class="st0"
   d="m 162.3,102.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path254" />
<path
   class="st0"
   d="m 176.8,102.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.7,0.8 1.8,1.7"
   id="path256" />
<path
   class="st0"
   d="m 155,89.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path258" />
<path
   class="st0"
   d="m 183.9,89.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path260" />
<path
   class="st0"
   d="m 183.9,89.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path262" />
<path
   class="st0"
   d="m 198.4,89.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path264" />
<path
   class="st0"
   d="m 184,114.7 c 0,0.9 -0.7,1.7 -1.6,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.7,0.8 1.7,1.7"
   id="path266" />
<path
   class="st0"
   d="m 198.4,114.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path268" />
<path
   class="st0"
   d="m 176.7,102.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path270" />
<path
   class="st0"
   d="m 205.6,102.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path272" />
<polygon
   class="st1"
   points="230,188.5 237.3,201 251.7,201 258.9,188.4 251.6,175.9 237.2,175.9 "
   id="polygon274"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 205.6,102.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path276" />
<path
   class="st0"
   d="m 220.1,102.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path278" />
<path
   class="st0"
   d="m 205.7,127.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path280" />
<path
   class="st0"
   d="m 220.1,127.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path282" />
<path
   class="st0"
   d="m 198.4,114.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path284" />
<path
   class="st0"
   d="m 227.3,114.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path286" />
<polygon
   class="st1"
   points="251.7,201 258.9,213.6 273.4,213.5 280.6,201 273.3,188.4 258.9,188.4 "
   id="polygon288"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 227.3,114.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path290" />
<path
   class="st0"
   d="m 241.8,114.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path292" />
<path
   class="st0"
   d="m 227.4,139.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path294" />
<path
   class="st0"
   d="m 241.8,139.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path296" />
<path
   class="st0"
   d="m 220.1,127.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path298" />
<path
   class="st0"
   d="m 249,127.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path300" />
<polygon
   class="st1"
   points="273.4,213.6 280.6,226.1 295.1,226.1 302.3,213.5 295,201 280.6,201 "
   id="polygon302"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 249,127.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path304" />
<path
   class="st0"
   d="m 263.5,127.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path306" />
<path
   class="st0"
   d="m 249.1,152.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.7 1.8,1.7"
   id="path308" />
<path
   class="st0"
   d="m 263.5,152.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path310" />
<path
   class="st0"
   d="m 241.8,139.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path312" />
<path
   class="st0"
   d="m 270.7,139.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path314" />
<polygon
   class="st1"
   points="295.1,226.1 302.3,238.7 316.8,238.7 324,226.1 316.7,213.5 302.3,213.5 "
   id="polygon316"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 270.7,139.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path318" />
<path
   class="st0"
   d="m 285.2,139.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path320" />
<path
   class="st0"
   d="m 270.8,164.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path322" />
<path
   class="st0"
   d="m 285.2,164.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path324" />
<path
   class="st0"
   d="m 263.5,152.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path326" />
<path
   class="st0"
   d="m 292.4,152.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path328" />
<polygon
   class="st1"
   points="316.8,238.7 324,251.2 338.5,251.2 345.7,238.6 338.4,226.1 324,226.1 "
   id="polygon330"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 292.4,152.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path332" />
<path
   class="st0"
   d="m 306.9,152.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path334" />
<path
   class="st0"
   d="m 292.5,177.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.7 1.8,1.7"
   id="path336" />
<path
   class="st0"
   d="m 306.9,177.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path338" />
<path
   class="st0"
   d="m 285.2,164.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path340" />
<path
   class="st0"
   d="m 314.1,164.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path342" />
<polygon
   class="st1"
   points="338.5,251.2 345.7,263.8 360.2,263.8 367.4,251.2 360.1,238.6 345.7,238.6 "
   id="polygon344"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 314.1,164.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path346" />
<path
   class="st0"
   d="m 328.6,164.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path348" />
<path
   class="st0"
   d="m 314.2,190 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path350" />
<path
   class="st0"
   d="m 328.6,190 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path352" />
<path
   class="st0"
   d="m 306.9,177.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path354" />
<path
   class="st0"
   d="m 335.8,177.5 c 0,0.9 -0.7,1.7 -1.6,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.7,0.7 1.7,1.7"
   id="path356" />
<polygon
   class="st1"
   points="360.2,263.8 367.4,276.3 381.9,276.3 389.1,263.7 381.8,251.2 367.4,251.2 "
   id="polygon358"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 335.8,177.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path360" />
<path
   class="st0"
   d="m 350.3,177.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path362" />
<path
   class="st0"
   d="m 335.9,202.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path364" />
<path
   class="st0"
   d="m 350.3,202.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path366" />
<path
   class="st0"
   d="m 328.6,190 c 0,0.9 -0.7,1.7 -1.6,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.7,0.8 1.7,1.7"
   id="path368" />
<path
   class="st0"
   d="m 357.5,190 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path370" />
<polygon
   class="st1"
   points="381.9,276.3 389.1,288.9 403.6,288.9 410.8,276.3 403.5,263.7 389.1,263.7 "
   id="polygon372"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 357.5,190 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path374" />
<path
   class="st0"
   d="m 357.6,215.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path376" />
<path
   class="st0"
   d="m 372,215.1 c 0,0.9 -0.7,1.7 -1.6,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.7,0.8 1.7,1.7"
   id="path378" />
<path
   class="st0"
   d="m 350.3,202.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path380" />
<path
   class="st0"
   d="m 379.2,202.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path382" />
<path
   class="st0"
   d="m 379.2,202.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path384" />
<path
   class="st0"
   d="m 379.3,227.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path386" />
<path
   class="st0"
   d="m 372,215.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path388" />
<polygon
   class="st1"
   points="425.3,301.4 432.5,314 447,314 454.2,301.4 446.9,288.8 432.5,288.8 "
   id="polygon390"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 68.3,39.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.7,0.8 1.8,1.7"
   id="path392" />
<path
   class="st0"
   d="m 75.5,52 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path394" />
<path
   class="st0"
   d="m 75.5,52 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path396" />
<path
   class="st0"
   d="m 89.9,52 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path398" />
<path
   class="st0"
   d="m 90,77.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path400" />
<path
   class="st0"
   d="m 97.2,64.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1,0 1.8,0.7 1.8,1.7"
   id="path402" />
<path
   class="st0"
   d="m 97.2,64.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path404" />
<path
   class="st0"
   d="m 111.6,64.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path406" />
<path
   class="st0"
   d="m 97.2,89.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path408" />
<path
   class="st0"
   d="m 111.7,89.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path410" />
<path
   class="st0"
   d="m 90,77.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path412" />
<path
   class="st0"
   d="m 118.9,77.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path414" />
<polygon
   class="st1"
   points="143.3,163.4 150.5,176 164.9,176 172.1,163.4 164.9,150.8 150.4,150.9 "
   id="polygon416"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 118.9,77.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path418" />
<path
   class="st0"
   d="m 133.3,77.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path420" />
<path
   class="st0"
   d="m 118.9,102.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path422" />
<path
   class="st0"
   d="m 133.4,102.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path424" />
<path
   class="st0"
   d="m 111.7,89.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path426" />
<path
   class="st0"
   d="m 140.6,89.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.7 1.8,1.7"
   id="path428" />
<polygon
   class="st1"
   points="165,176 172.2,188.5 186.6,188.5 193.8,175.9 186.6,163.4 172.1,163.4 "
   id="polygon430"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 140.6,89.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path432" />
<path
   class="st0"
   d="m 155,89.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path434" />
<path
   class="st0"
   d="m 140.6,114.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path436" />
<path
   class="st0"
   d="m 155.1,114.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path438" />
<path
   class="st0"
   d="m 133.4,102.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path440" />
<path
   class="st0"
   d="m 162.3,102.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path442" />
<polygon
   class="st1"
   points="186.7,188.5 193.9,201.1 208.3,201.1 215.5,188.5 208.3,175.9 193.8,176 "
   id="polygon444"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 162.3,102.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path446" />
<path
   class="st0"
   d="m 176.7,102.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path448" />
<path
   class="st0"
   d="m 162.3,127.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path450" />
<path
   class="st0"
   d="m 176.8,127.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path452" />
<path
   class="st0"
   d="m 155.1,114.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path454" />
<path
   class="st0"
   d="m 184,114.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.7 1.8,1.7"
   id="path456" />
<polygon
   class="st1"
   points="208.4,201.1 215.6,213.6 230,213.6 237.2,201 230,188.5 215.5,188.5 "
   id="polygon458"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 184,114.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path460" />
<path
   class="st0"
   d="m 198.4,114.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path462" />
<path
   class="st0"
   d="m 184,139.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path464" />
<path
   class="st0"
   d="m 198.5,139.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path466" />
<path
   class="st0"
   d="m 176.8,127.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path468" />
<path
   class="st0"
   d="m 205.7,127.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path470" />
<polygon
   class="st1"
   points="230.1,213.6 237.3,226.2 251.7,226.2 258.9,213.6 251.7,201 237.2,201.1 "
   id="polygon472"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 205.7,127.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path474" />
<path
   class="st0"
   d="m 220.1,127.3 c 0,0.9 -0.7,1.7 -1.6,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.7,0.8 1.7,1.7"
   id="path476" />
<path
   class="st0"
   d="m 205.7,152.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path478" />
<path
   class="st0"
   d="m 220.2,152.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path480" />
<path
   class="st0"
   d="m 198.5,139.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path482" />
<path
   class="st0"
   d="m 227.4,139.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.7 1.8,1.7"
   id="path484" />
<polygon
   class="st1"
   points="251.8,226.2 259,238.7 273.4,238.7 280.6,226.1 273.4,213.6 258.9,213.6 "
   id="polygon486"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 227.4,139.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path488" />
<path
   class="st0"
   d="m 241.8,139.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path490" />
<path
   class="st0"
   d="m 227.4,165 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path492" />
<path
   class="st0"
   d="m 241.9,165 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.7 1.8,1.7"
   id="path494" />
<path
   class="st0"
   d="m 220.2,152.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path496" />
<path
   class="st0"
   d="m 249.1,152.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path498" />
<polygon
   class="st1"
   points="273.5,238.7 280.7,251.3 295.1,251.3 302.3,238.7 295.1,226.1 280.6,226.2 "
   id="polygon500"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 249.1,152.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path502" />
<path
   class="st0"
   d="m 263.5,152.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path504" />
<path
   class="st0"
   d="m 249.1,177.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path506" />
<path
   class="st0"
   d="m 263.6,177.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path508" />
<path
   class="st0"
   d="m 241.9,165 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path510" />
<path
   class="st0"
   d="m 270.8,165 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.7 1.8,1.7"
   id="path512" />
<polygon
   class="st1"
   points="295.2,251.3 302.4,263.8 316.8,263.8 324,251.2 316.8,238.7 302.3,238.7 "
   id="polygon514"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 270.8,164.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path516" />
<path
   class="st0"
   d="m 285.2,164.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path518" />
<path
   class="st0"
   d="m 270.8,190.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path520" />
<path
   class="st0"
   d="m 285.3,190.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.7 1.8,1.7"
   id="path522" />
<path
   class="st0"
   d="m 263.6,177.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path524" />
<path
   class="st0"
   d="m 292.5,177.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path526" />
<polygon
   class="st1"
   points="316.9,263.8 324.1,276.4 338.5,276.4 345.7,263.8 338.5,251.2 324,251.3 "
   id="polygon528"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 292.5,177.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path530" />
<path
   class="st0"
   d="m 306.9,177.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path532" />
<path
   class="st0"
   d="m 292.5,202.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path534" />
<path
   class="st0"
   d="m 307,202.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path536" />
<path
   class="st0"
   d="m 285.3,190.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path538" />
<path
   class="st0"
   d="m 314.2,190.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path540" />
<polygon
   class="st1"
   points="338.6,276.4 345.8,288.9 360.2,288.9 367.4,276.3 360.2,263.8 345.7,263.8 "
   id="polygon542"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 314.2,190 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path544" />
<path
   class="st0"
   d="m 328.6,190 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path546" />
<path
   class="st0"
   d="m 328.7,215.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.7 1.8,1.7"
   id="path548" />
<path
   class="st0"
   d="m 307,202.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path550" />
<path
   class="st0"
   d="m 335.9,202.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path552" />
<path
   class="st0"
   d="m 335.9,202.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path554" />
<path
   class="st0"
   d="m 350.3,202.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path556" />
<path
   class="st0"
   d="m 335.9,227.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path558" />
<path
   class="st0"
   d="m 350.4,227.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path560" />
<path
   class="st0"
   d="m 328.7,215.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path562" />
<path
   class="st0"
   d="m 357.6,215.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path564" />
<polygon
   class="st1"
   points="381.9,301.5 389.2,314 403.6,314 410.8,301.4 403.6,288.9 389.1,288.9 "
   id="polygon566"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 357.6,215.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path568" />
<path
   class="st0"
   d="m 372,215.1 c 0,0.9 -0.7,1.7 -1.6,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.7,0.8 1.7,1.7"
   id="path570" />
<path
   class="st0"
   d="m 357.6,240.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path572" />
<path
   class="st0"
   d="m 372.1,240.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.7 1.8,1.7"
   id="path574" />
<path
   class="st0"
   d="m 350.4,227.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path576" />
<path
   class="st0"
   d="m 379.3,227.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path578" />
<polygon
   class="st1"
   points="403.6,314 410.9,326.6 425.3,326.6 432.5,314 425.3,301.4 410.8,301.5 "
   id="polygon580"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 379.3,227.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path582" />
<path
   class="st0"
   d="m 379.3,252.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path584" />
<path
   class="st0"
   d="m 372.1,240.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path586" />
<polygon
   class="st1"
   points="425.3,326.6 432.6,339.1 447,339.1 454.2,326.5 447,314 432.5,314 "
   id="polygon588"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 53.9,89.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path590" />
<path
   class="st0"
   d="m 68.4,89.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path592" />
<path
   class="st0"
   d="m 90,77.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path594" />
<path
   class="st0"
   d="m 75.6,102.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path596" />
<path
   class="st0"
   d="m 90.1,102.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path598" />
<path
   class="st0"
   d="m 68.3,89.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path600" />
<path
   class="st0"
   d="m 97.3,89.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path602" />
<path
   class="st0"
   d="m 97.3,89.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path604" />
<path
   class="st0"
   d="m 111.7,89.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path606" />
<path
   class="st0"
   d="m 97.3,114.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path608" />
<path
   class="st0"
   d="m 111.8,114.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path610" />
<path
   class="st0"
   d="m 90,102.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path612" />
<path
   class="st0"
   d="m 119,102.3 c 0,0.9 -0.7,1.7 -1.6,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 0.9,0 1.7,0.7 1.7,1.7"
   id="path614" />
<polygon
   class="st1"
   points="143.3,188.6 150.6,201.1 165,201.1 172.2,188.5 165,176 150.5,176 "
   id="polygon616"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 119,102.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path618" />
<path
   class="st0"
   d="m 133.4,102.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path620" />
<path
   class="st0"
   d="m 119,127.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path622" />
<path
   class="st0"
   d="m 133.5,127.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path624" />
<path
   class="st0"
   d="m 111.7,114.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path626" />
<path
   class="st0"
   d="m 140.7,114.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path628" />
<polygon
   class="st1"
   points="165,201.1 172.3,213.7 186.7,213.7 193.9,201.1 186.7,188.5 172.2,188.6 "
   id="polygon630"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 140.7,114.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path632" />
<path
   class="st0"
   d="m 155.1,114.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path634" />
<path
   class="st0"
   d="m 140.7,139.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path636" />
<path
   class="st0"
   d="m 155.2,139.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path638" />
<path
   class="st0"
   d="m 133.4,127.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path640" />
<path
   class="st0"
   d="m 162.4,127.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.7 1.8,1.7"
   id="path642" />
<polygon
   class="st1"
   points="186.7,213.7 194,226.2 208.4,226.2 215.6,213.6 208.4,201.1 193.9,201.1 "
   id="polygon644"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 162.4,127.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path646" />
<path
   class="st0"
   d="m 176.8,127.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path648" />
<path
   class="st0"
   d="m 162.4,152.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path650" />
<path
   class="st0"
   d="m 176.9,152.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.7 1.8,1.7"
   id="path652" />
<path
   class="st0"
   d="m 155.1,139.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path654" />
<path
   class="st0"
   d="m 184.1,139.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path656" />
<polygon
   class="st1"
   points="208.4,226.2 215.7,238.8 230.1,238.8 237.3,226.2 230,213.6 215.6,213.7 "
   id="polygon658"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 184.1,139.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path660" />
<path
   class="st0"
   d="m 198.5,139.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path662" />
<path
   class="st0"
   d="m 184.1,165 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path664" />
<path
   class="st0"
   d="m 198.6,165 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path666" />
<path
   class="st0"
   d="m 176.8,152.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path668" />
<path
   class="st0"
   d="m 205.8,152.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.7,0.7 1.8,1.7"
   id="path670" />
<polygon
   class="st1"
   points="230.1,238.8 237.4,251.3 251.8,251.3 259,238.7 251.7,226.2 237.3,226.2 "
   id="polygon672"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 205.8,152.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path674" />
<path
   class="st0"
   d="m 220.2,152.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path676" />
<path
   class="st0"
   d="m 205.8,177.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path678" />
<path
   class="st0"
   d="m 220.3,177.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.7 1.8,1.7"
   id="path680" />
<path
   class="st0"
   d="m 198.5,165 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path682" />
<path
   class="st0"
   d="m 227.4,165 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path684" />
<polygon
   class="st1"
   points="251.8,251.3 259.1,263.9 273.5,263.9 280.7,251.3 273.4,238.7 259,238.8 "
   id="polygon686"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 227.5,165 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path688" />
<path
   class="st0"
   d="m 241.9,165 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path690" />
<path
   class="st0"
   d="m 227.5,190.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path692" />
<path
   class="st0"
   d="m 242,190.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path694" />
<path
   class="st0"
   d="m 220.2,177.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path696" />
<path
   class="st0"
   d="m 249.1,177.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path698" />
<polygon
   class="st1"
   points="273.5,263.9 280.8,276.4 295.2,276.4 302.4,263.8 295.1,251.3 280.7,251.3 "
   id="polygon700"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 249.2,177.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path702" />
<path
   class="st0"
   d="m 263.6,177.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path704" />
<path
   class="st0"
   d="m 249.2,202.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path706" />
<path
   class="st0"
   d="m 263.7,202.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.7 1.8,1.7"
   id="path708" />
<path
   class="st0"
   d="m 241.9,190.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path710" />
<path
   class="st0"
   d="m 270.8,190.1 c 0,0.9 -0.7,1.7 -1.6,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.7,0.8 1.7,1.7"
   id="path712" />
<polygon
   class="st1"
   points="295.2,276.4 302.5,289 316.9,289 324.1,276.4 316.8,263.8 302.4,263.9 "
   id="polygon714"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 270.9,190.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path716" />
<path
   class="st0"
   d="m 285.3,190.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path718" />
<path
   class="st0"
   d="m 270.9,215.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path720" />
<path
   class="st0"
   d="m 285.4,215.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path722" />
<path
   class="st0"
   d="m 263.6,202.7 c 0,0.9 -0.7,1.7 -1.6,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.7,0.8 1.7,1.7"
   id="path724" />
<path
   class="st0"
   d="m 292.5,202.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path726" />
<polygon
   class="st1"
   points="316.9,289 324.2,301.5 338.6,301.5 345.8,288.9 338.5,276.4 324.1,276.4 "
   id="polygon728"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 292.6,202.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path730" />
<path
   class="st0"
   d="m 307,202.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path732" />
<path
   class="st0"
   d="m 292.6,227.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path734" />
<path
   class="st0"
   d="m 307.1,227.8 c 0,0.9 -0.7,1.7 -1.6,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 0.9,0 1.7,0.7 1.7,1.7"
   id="path736" />
<path
   class="st0"
   d="m 285.3,215.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path738" />
<path
   class="st0"
   d="m 328.7,215.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path740" />
<path
   class="st0"
   d="m 314.3,240.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path742" />
<path
   class="st0"
   d="m 328.8,240.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path744" />
<path
   class="st0"
   d="m 307,227.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path746" />
<path
   class="st0"
   d="m 335.9,227.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path748" />
<path
   class="st0"
   d="m 336,227.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.7 1.8,1.7"
   id="path750" />
<path
   class="st0"
   d="m 350.4,227.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path752" />
<path
   class="st0"
   d="m 336,252.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path754" />
<path
   class="st0"
   d="m 350.5,252.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.7 1.8,1.7"
   id="path756" />
<path
   class="st0"
   d="m 328.7,240.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path758" />
<path
   class="st0"
   d="m 357.6,240.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path760" />
<polygon
   class="st1"
   points="382,326.6 389.3,339.2 403.7,339.2 410.9,326.6 403.6,314 389.2,314.1 "
   id="polygon762"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 357.7,240.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path764" />
<path
   class="st0"
   d="m 372.1,240.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path766" />
<path
   class="st0"
   d="m 357.7,265.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path768" />
<path
   class="st0"
   d="m 372.2,265.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path770" />
<path
   class="st0"
   d="m 350.4,252.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path772" />
<path
   class="st0"
   d="m 379.3,252.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path774" />
<polygon
   class="st1"
   points="403.7,339.2 411,351.7 425.4,351.7 432.6,339.1 425.3,326.6 410.9,326.6 "
   id="polygon776"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 379.4,252.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1,0 1.8,0.7 1.8,1.7"
   id="path778" />
<path
   class="st0"
   d="m 379.4,278 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path780" />
<path
   class="st0"
   d="m 372.1,265.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path782" />
<polygon
   class="st1"
   points="425.4,351.7 432.7,364.3 447.1,364.3 454.3,351.7 447,339.1 432.6,339.2 "
   id="polygon784"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 46.7,102.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path786" />
<path
   class="st0"
   d="m 53.9,89.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path788" />
<path
   class="st0"
   d="m 53.9,89.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path790" />
<path
   class="st0"
   d="m 68.4,89.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path792" />
<path
   class="st0"
   d="m 54,114.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path794" />
<path
   class="st0"
   d="m 68.4,114.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path796" />
<path
   class="st0"
   d="m 46.7,102.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path798" />
<path
   class="st0"
   d="m 75.6,102.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path800" />
<polygon
   class="st1"
   points="100,188.6 107.2,201.2 121.6,201.2 128.8,188.6 121.6,176 107.2,176.1 "
   id="polygon802"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 75.6,102.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path804" />
<path
   class="st0"
   d="m 90.1,102.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path806" />
<path
   class="st0"
   d="m 75.7,127.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path808" />
<path
   class="st0"
   d="m 90.1,127.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path810" />
<path
   class="st0"
   d="m 68.4,114.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path812" />
<path
   class="st0"
   d="m 97.3,114.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path814" />
<polygon
   class="st1"
   points="121.7,201.2 128.9,213.7 143.3,213.7 150.5,201.1 143.3,188.6 128.9,188.6 "
   id="polygon816"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 97.3,114.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path818" />
<path
   class="st0"
   d="m 111.8,114.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path820" />
<path
   class="st0"
   d="m 97.4,140 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path822" />
<path
   class="st0"
   d="m 111.8,140 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path824" />
<path
   class="st0"
   d="m 90.1,127.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path826" />
<path
   class="st0"
   d="m 119,127.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path828" />
<polygon
   class="st1"
   points="143.4,213.7 150.6,226.3 165,226.3 172.2,213.7 165,201.1 150.6,201.2 "
   id="polygon830"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 119,127.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path832" />
<path
   class="st0"
   d="m 133.5,127.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path834" />
<path
   class="st0"
   d="m 119.1,152.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path836" />
<path
   class="st0"
   d="m 133.5,152.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path838" />
<path
   class="st0"
   d="m 111.8,140 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path840" />
<path
   class="st0"
   d="m 140.7,140 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path842" />
<polygon
   class="st1"
   points="165.1,226.3 172.3,238.8 186.7,238.8 193.9,226.2 186.7,213.7 172.3,213.7 "
   id="polygon844"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 140.7,140 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path846" />
<path
   class="st0"
   d="m 155.2,139.9 c 0,0.9 -0.7,1.7 -1.6,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 0.9,0.1 1.7,0.8 1.7,1.7"
   id="path848" />
<path
   class="st0"
   d="m 140.8,165.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path850" />
<path
   class="st0"
   d="m 155.2,165.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path852" />
<path
   class="st0"
   d="m 133.5,152.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path854" />
<path
   class="st0"
   d="m 162.4,152.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path856" />
<polygon
   class="st1"
   points="186.8,238.8 194,251.4 208.4,251.4 215.6,238.8 208.4,226.2 194,226.3 "
   id="polygon858"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 162.4,152.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path860" />
<path
   class="st0"
   d="m 176.9,152.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path862" />
<path
   class="st0"
   d="m 162.5,177.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path864" />
<path
   class="st0"
   d="m 176.9,177.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path866" />
<path
   class="st0"
   d="m 155.2,165.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path868" />
<path
   class="st0"
   d="m 184.1,165.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path870" />
<polygon
   class="st1"
   points="208.5,251.4 215.7,263.9 230.1,263.9 237.3,251.3 230.1,238.8 215.7,238.8 "
   id="polygon872"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 184.1,165.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path874" />
<path
   class="st0"
   d="m 198.6,165 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path876" />
<path
   class="st0"
   d="m 184.2,190.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path878" />
<path
   class="st0"
   d="m 198.6,190.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path880" />
<path
   class="st0"
   d="m 176.9,177.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path882" />
<path
   class="st0"
   d="m 205.8,177.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path884" />
<polygon
   class="st1"
   points="230.2,263.9 237.4,276.5 251.8,276.5 259,263.9 251.8,251.3 237.4,251.4 "
   id="polygon886"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 205.8,177.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path888" />
<path
   class="st0"
   d="m 220.3,177.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path890" />
<path
   class="st0"
   d="m 205.9,202.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.7,0.8 1.8,1.7"
   id="path892" />
<path
   class="st0"
   d="m 220.3,202.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path894" />
<path
   class="st0"
   d="m 198.6,190.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path896" />
<path
   class="st0"
   d="m 227.5,190.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path898" />
<polygon
   class="st1"
   points="251.9,276.5 259.1,289.1 273.5,289 280.7,276.4 273.5,263.9 259.1,263.9 "
   id="polygon900"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 227.5,190.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path902" />
<path
   class="st0"
   d="m 242,190.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path904" />
<path
   class="st0"
   d="m 227.5,215.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path906" />
<path
   class="st0"
   d="m 242,215.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path908" />
<path
   class="st0"
   d="m 220.3,202.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path910" />
<path
   class="st0"
   d="m 249.2,202.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path912" />
<polygon
   class="st1"
   points="273.6,289 280.8,301.6 295.2,301.6 302.4,289 295.2,276.4 280.8,276.5 "
   id="polygon914"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 249.2,202.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path916" />
<path
   class="st0"
   d="m 263.7,202.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path918" />
<path
   class="st0"
   d="m 249.2,227.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path920" />
<path
   class="st0"
   d="m 263.7,227.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path922" />
<path
   class="st0"
   d="m 242,215.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path924" />
<path
   class="st0"
   d="m 270.9,215.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path926" />
<polygon
   class="st1"
   points="295.3,301.6 302.5,314.2 316.9,314.1 324.1,301.5 316.9,289 302.5,289 "
   id="polygon928"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 270.9,215.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path930" />
<path
   class="st0"
   d="m 285.4,215.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path932" />
<path
   class="st0"
   d="m 270.9,240.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path934" />
<path
   class="st0"
   d="m 285.4,240.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path936" />
<path
   class="st0"
   d="m 263.7,227.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path938" />
<path
   class="st0"
   d="m 292.6,227.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path940" />
<polygon
   class="st1"
   points="317,314.1 324.2,326.7 338.6,326.7 345.8,314.1 338.6,301.5 324.2,301.6 "
   id="polygon942"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 292.6,227.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path944" />
<path
   class="st0"
   d="m 307.1,227.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path946" />
<path
   class="st0"
   d="m 292.6,252.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path948" />
<path
   class="st0"
   d="m 307.1,252.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path950" />
<path
   class="st0"
   d="m 285.4,240.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path952" />
<path
   class="st0"
   d="m 314.3,240.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path954" />
<polygon
   class="st1"
   points="338.7,326.7 345.9,339.3 360.3,339.2 367.5,326.6 360.3,314.1 345.9,314.1 "
   id="polygon956"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 314.3,240.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path958" />
<path
   class="st0"
   d="m 328.8,240.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path960" />
<path
   class="st0"
   d="m 314.3,265.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path962" />
<path
   class="st0"
   d="m 328.8,265.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path964" />
<path
   class="st0"
   d="m 307.1,252.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path966" />
<path
   class="st0"
   d="m 336,252.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path968" />
<polygon
   class="st1"
   points="360.4,339.2 367.6,351.8 382,351.8 389.2,339.2 382,326.6 367.6,326.7 "
   id="polygon970"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 336,252.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path972" />
<path
   class="st0"
   d="m 350.5,252.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path974" />
<path
   class="st0"
   d="m 336,278 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path976" />
<path
   class="st0"
   d="m 350.5,278 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path978" />
<path
   class="st0"
   d="m 328.8,265.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path980" />
<path
   class="st0"
   d="m 357.7,265.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path982" />
<polygon
   class="st1"
   points="382.1,351.8 389.3,364.4 403.7,364.3 410.9,351.7 403.7,339.2 389.3,339.2 "
   id="polygon984"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 357.7,265.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path986" />
<path
   class="st0"
   d="m 372.2,265.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path988" />
<path
   class="st0"
   d="m 357.7,290.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path990" />
<path
   class="st0"
   d="m 372.2,290.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path992" />
<path
   class="st0"
   d="m 350.5,278 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path994" />
<path
   class="st0"
   d="m 379.4,278 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path996" />
<polygon
   class="st1"
   points="403.8,364.3 411,376.9 425.4,376.9 432.6,364.3 425.4,351.7 411,351.8 "
   id="polygon998"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 379.4,278 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1000" />
<path
   class="st0"
   d="m 379.4,303.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1002" />
<path
   class="st0"
   d="m 372.2,290.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1004" />
<polygon
   class="st1"
   points="425.5,376.9 432.7,389.5 447.1,389.4 454.3,376.8 447.1,364.3 432.7,364.3 "
   id="polygon1006"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 46.7,102.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1008" />
<path
   class="st0"
   d="m 32.3,127.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1010" />
<path
   class="st0"
   d="m 46.8,127.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path1012" />
<path
   class="st0"
   d="m 25.1,114.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path1014" />
<path
   class="st0"
   d="m 54,114.9 c 0,0.9 -0.7,1.7 -1.6,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 0.9,0.1 1.7,0.8 1.7,1.7"
   id="path1016" />
<path
   class="st0"
   d="m 54,114.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1018" />
<path
   class="st0"
   d="m 68.4,114.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1020" />
<path
   class="st0"
   d="m 54,140 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1022" />
<path
   class="st0"
   d="m 68.5,140 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1024" />
<path
   class="st0"
   d="m 46.8,127.5 c 0,0.9 -0.7,1.7 -1.6,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 0.9,0 1.7,0.8 1.7,1.7"
   id="path1026" />
<path
   class="st0"
   d="m 75.7,127.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1028" />
<polygon
   class="st1"
   points="100.1,213.8 107.3,226.3 121.7,226.3 128.9,213.7 121.7,201.2 107.2,201.2 "
   id="polygon1030"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 75.7,127.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.7 1.8,1.7"
   id="path1032" />
<path
   class="st0"
   d="m 90.1,127.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1034" />
<path
   class="st0"
   d="m 75.7,152.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1036" />
<path
   class="st0"
   d="m 90.2,152.6 c 0,0.9 -0.7,1.7 -1.6,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 0.9,0 1.7,0.7 1.7,1.7"
   id="path1038" />
<path
   class="st0"
   d="m 68.5,140 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path1040" />
<path
   class="st0"
   d="m 97.4,140 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path1042" />
<polygon
   class="st1"
   points="121.8,226.3 129,238.9 143.4,238.9 150.6,226.3 143.4,213.7 128.9,213.8 "
   id="polygon1044"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 97.4,140 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1046" />
<path
   class="st0"
   d="m 111.8,140 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1048" />
<path
   class="st0"
   d="m 97.4,165.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1050" />
<path
   class="st0"
   d="m 111.9,165.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1052" />
<path
   class="st0"
   d="m 90.2,152.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1054" />
<path
   class="st0"
   d="m 119.1,152.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1056" />
<polygon
   class="st1"
   points="143.5,238.9 150.7,251.4 165.1,251.4 172.3,238.8 165.1,226.3 150.6,226.3 "
   id="polygon1058"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 119.1,152.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.7 1.8,1.7"
   id="path1060" />
<path
   class="st0"
   d="m 133.5,152.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1062" />
<path
   class="st0"
   d="m 119.1,177.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1064" />
<path
   class="st0"
   d="m 133.6,177.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1,0 1.8,0.7 1.8,1.7"
   id="path1066" />
<path
   class="st0"
   d="m 111.9,165.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path1068" />
<path
   class="st0"
   d="m 140.8,165.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path1070" />
<polygon
   class="st1"
   points="165.2,251.4 172.4,264 186.8,264 194,251.4 186.8,238.8 172.3,238.9 "
   id="polygon1072"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 140.8,165.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1074" />
<path
   class="st0"
   d="m 155.2,165.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1076" />
<path
   class="st0"
   d="m 140.8,190.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1078" />
<path
   class="st0"
   d="m 155.3,190.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1080" />
<path
   class="st0"
   d="m 133.6,177.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1082" />
<path
   class="st0"
   d="m 162.5,177.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1084" />
<polygon
   class="st1"
   points="186.9,264 194.1,276.5 208.5,276.5 215.7,263.9 208.5,251.4 194,251.4 "
   id="polygon1086"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 162.5,177.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.7 1.8,1.7"
   id="path1088" />
<path
   class="st0"
   d="m 176.9,177.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1090" />
<path
   class="st0"
   d="m 162.5,202.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1092" />
<path
   class="st0"
   d="m 177,202.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.7 1.8,1.7"
   id="path1094" />
<path
   class="st0"
   d="m 155.3,190.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path1096" />
<path
   class="st0"
   d="m 184.2,190.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path1098" />
<polygon
   class="st1"
   points="208.6,276.5 215.8,289.1 230.2,289.1 237.4,276.5 230.2,263.9 215.7,264 "
   id="polygon1100"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 184.2,190.2 c 0,0.9 -0.7,1.7 -1.6,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 0.9,0 1.7,0.8 1.7,1.7"
   id="path1102" />
<path
   class="st0"
   d="m 198.6,190.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1104" />
<path
   class="st0"
   d="m 184.2,215.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1106" />
<path
   class="st0"
   d="m 198.7,215.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path1108" />
<path
   class="st0"
   d="m 177,202.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1110" />
<path
   class="st0"
   d="m 205.9,202.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1112" />
<polygon
   class="st1"
   points="230.3,289.1 237.5,301.6 251.9,301.6 259.1,289 251.9,276.5 237.4,276.5 "
   id="polygon1114"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 205.9,202.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.7 1.8,1.7"
   id="path1116" />
<path
   class="st0"
   d="m 220.3,202.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1118" />
<path
   class="st0"
   d="m 205.9,227.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1120" />
<path
   class="st0"
   d="m 220.4,227.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.7 1.8,1.7"
   id="path1122" />
<path
   class="st0"
   d="m 198.7,215.3 c 0,0.9 -0.7,1.7 -1.6,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 0.9,0.1 1.7,0.8 1.7,1.7"
   id="path1124" />
<path
   class="st0"
   d="m 227.6,215.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path1126" />
<polygon
   class="st1"
   points="252,301.6 259.2,314.2 273.6,314.2 280.8,301.6 273.6,289 259.1,289.1 "
   id="polygon1128"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 227.6,215.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1130" />
<path
   class="st0"
   d="m 242,215.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1132" />
<path
   class="st0"
   d="m 227.6,240.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1134" />
<path
   class="st0"
   d="m 242.1,240.4 c 0,0.9 -0.7,1.7 -1.6,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 0.9,0.1 1.7,0.8 1.7,1.7"
   id="path1136" />
<path
   class="st0"
   d="m 220.4,227.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1138" />
<path
   class="st0"
   d="m 249.3,227.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1140" />
<polygon
   class="st1"
   points="273.6,314.2 280.9,326.8 295.3,326.7 302.5,314.1 295.3,301.6 280.8,301.6 "
   id="polygon1142"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 249.3,227.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.7 1.8,1.7"
   id="path1144" />
<path
   class="st0"
   d="m 263.7,227.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1146" />
<path
   class="st0"
   d="m 249.3,253 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1148" />
<path
   class="st0"
   d="m 263.8,253 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.7 1.8,1.7"
   id="path1150" />
<path
   class="st0"
   d="m 242.1,240.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path1152" />
<path
   class="st0"
   d="m 271,240.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path1154" />
<polygon
   class="st1"
   points="295.3,326.7 302.6,339.3 317,339.3 324.2,326.7 317,314.1 302.5,314.2 "
   id="polygon1156"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 271,240.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1158" />
<path
   class="st0"
   d="m 285.4,240.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1160" />
<path
   class="st0"
   d="m 271,265.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1162" />
<path
   class="st0"
   d="m 285.5,265.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path1164" />
<path
   class="st0"
   d="m 263.8,253 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1166" />
<path
   class="st0"
   d="m 292.7,253 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1168" />
<polygon
   class="st1"
   points="317,339.3 324.3,351.9 338.7,351.8 345.9,339.2 338.7,326.7 324.2,326.7 "
   id="polygon1170"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 292.7,253 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.7 1.8,1.7"
   id="path1172" />
<path
   class="st0"
   d="m 307.1,252.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1174" />
<path
   class="st0"
   d="m 292.7,278.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1176" />
<path
   class="st0"
   d="m 307.2,278.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.7 1.8,1.7"
   id="path1178" />
<path
   class="st0"
   d="m 285.5,265.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.7,0.8 1.8,1.7"
   id="path1180" />
<path
   class="st0"
   d="m 314.4,265.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path1182" />
<polygon
   class="st1"
   points="338.7,351.8 346,364.4 360.4,364.4 367.6,351.8 360.4,339.2 345.9,339.3 "
   id="polygon1184"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 314.4,265.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1186" />
<path
   class="st0"
   d="m 328.8,265.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1188" />
<path
   class="st0"
   d="m 314.4,290.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1190" />
<path
   class="st0"
   d="m 328.9,290.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path1192" />
<path
   class="st0"
   d="m 307.2,278.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.7,0.8 1.8,1.7"
   id="path1194" />
<path
   class="st0"
   d="m 336.1,278.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1196" />
<polygon
   class="st1"
   points="360.4,364.4 367.7,377 382.1,376.9 389.3,364.3 382.1,351.8 367.6,351.8 "
   id="polygon1198"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 336.1,278.1 c 0,0.9 -0.7,1.7 -1.6,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 0.9,0 1.7,0.7 1.7,1.7"
   id="path1200" />
<path
   class="st0"
   d="m 350.5,278 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1202" />
<path
   class="st0"
   d="m 336.1,303.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1204" />
<path
   class="st0"
   d="m 350.6,303.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.7 1.8,1.7"
   id="path1206" />
<path
   class="st0"
   d="m 328.9,290.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1,0.1 1.7,0.8 1.8,1.7"
   id="path1208" />
<path
   class="st0"
   d="m 357.8,290.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path1210" />
<polygon
   class="st1"
   points="382.1,377 389.4,389.5 403.8,389.5 411,376.9 403.8,364.3 389.3,364.4 "
   id="polygon1212"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 357.8,290.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path1214" />
<path
   class="st0"
   d="m 372.2,290.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1216" />
<path
   class="st0"
   d="m 357.8,315.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1218" />
<path
   class="st0"
   d="m 372.3,315.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path1220" />
<path
   class="st0"
   d="m 350.5,303.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1222" />
<path
   class="st0"
   d="m 379.5,303.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1224" />
<polygon
   class="st1"
   points="403.8,389.5 411.1,402.1 425.5,402 432.7,389.4 425.5,376.9 411,376.9 "
   id="polygon1226"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 379.5,303.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.7 1.8,1.7"
   id="path1228" />
<path
   class="st0"
   d="m 379.5,328.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1230" />
<path
   class="st0"
   d="m 372.2,315.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1232" />
<polygon
   class="st1"
   points="425.5,402.1 432.8,414.6 447.2,414.6 454.4,402 447.2,389.4 432.7,389.5 "
   id="polygon1234"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 10.6,115 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path1236" />
<path
   class="st0"
   d="m 25.1,114.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path1238" />
<path
   class="st0"
   d="m 10.7,140.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1240" />
<path
   class="st0"
   d="m 25.1,140.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1242" />
<path
   class="st0"
   d="m 3.4,127.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1244" />
<path
   class="st0"
   d="m 32.3,127.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1246" />
<polygon
   class="st1"
   points="56.7,213.9 63.9,226.4 78.4,226.4 85.6,213.8 78.3,201.2 63.9,201.3 "
   id="polygon1248"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 32.3,127.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1250" />
<path
   class="st0"
   d="m 46.8,127.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1252" />
<path
   class="st0"
   d="m 32.4,152.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path1254" />
<path
   class="st0"
   d="m 46.8,152.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1256" />
<path
   class="st0"
   d="m 25.1,140.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1258" />
<path
   class="st0"
   d="m 54,140.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1260" />
<polygon
   class="st1"
   points="78.4,226.4 85.6,239 100.1,238.9 107.3,226.3 100,213.8 85.6,213.8 "
   id="polygon1262"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 54,140.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path1264" />
<path
   class="st0"
   d="m 68.5,140 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path1266" />
<path
   class="st0"
   d="m 54.1,165.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1268" />
<path
   class="st0"
   d="m 68.5,165.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1270" />
<path
   class="st0"
   d="m 46.8,152.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1272" />
<path
   class="st0"
   d="m 75.7,152.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1274" />
<polygon
   class="st1"
   points="100.1,239 107.3,251.5 121.8,251.5 128.9,238.9 121.7,226.3 107.3,226.4 "
   id="polygon1276"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 75.7,152.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1278" />
<path
   class="st0"
   d="m 90.2,152.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1280" />
<path
   class="st0"
   d="m 75.8,177.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path1282" />
<path
   class="st0"
   d="m 90.2,177.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1284" />
<path
   class="st0"
   d="m 68.5,165.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1286" />
<path
   class="st0"
   d="m 97.4,165.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1288" />
<polygon
   class="st1"
   points="121.8,251.5 129,264.1 143.5,264 150.6,251.4 143.4,238.9 129,238.9 "
   id="polygon1290"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 97.4,165.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path1292" />
<path
   class="st0"
   d="m 111.9,165.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path1294" />
<path
   class="st0"
   d="m 97.5,190.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1296" />
<path
   class="st0"
   d="m 90.2,177.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1298" />
<path
   class="st0"
   d="m 119.1,177.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1300" />
<path
   class="st0"
   d="m 119.1,177.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1302" />
<path
   class="st0"
   d="m 133.6,177.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1304" />
<path
   class="st0"
   d="m 119.2,202.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path1306" />
<path
   class="st0"
   d="m 133.6,202.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1308" />
<path
   class="st0"
   d="m 140.8,190.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1310" />
<path
   class="st0"
   d="m 140.8,190.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1312" />
<path
   class="st0"
   d="m 155.3,190.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path1314" />
<path
   class="st0"
   d="m 140.9,215.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1316" />
<path
   class="st0"
   d="m 155.3,215.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1318" />
<path
   class="st0"
   d="m 133.6,202.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1320" />
<path
   class="st0"
   d="m 162.5,202.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1322" />
<polygon
   class="st1"
   points="186.9,289.2 194.1,301.7 208.6,301.7 215.7,289.1 208.5,276.5 194.1,276.6 "
   id="polygon1324"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 162.5,202.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1326" />
<path
   class="st0"
   d="m 177,202.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1328" />
<path
   class="st0"
   d="m 162.6,228 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.7 1.8,1.7"
   id="path1330" />
<path
   class="st0"
   d="m 177,227.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1332" />
<path
   class="st0"
   d="m 155.3,215.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1334" />
<path
   class="st0"
   d="m 184.2,215.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1336" />
<polygon
   class="st1"
   points="208.6,301.7 215.8,314.3 230.3,314.2 237.4,301.7 230.2,289.1 215.8,289.1 "
   id="polygon1338"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 184.2,215.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1340" />
<path
   class="st0"
   d="m 198.7,215.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path1342" />
<path
   class="st0"
   d="m 184.3,240.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1344" />
<path
   class="st0"
   d="m 198.7,240.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1346" />
<path
   class="st0"
   d="m 177,227.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1348" />
<path
   class="st0"
   d="m 205.9,227.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1350" />
<polygon
   class="st1"
   points="230.3,314.3 237.5,326.8 252,326.8 259.1,314.2 251.9,301.6 237.5,301.7 "
   id="polygon1352"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 205.9,227.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1354" />
<path
   class="st0"
   d="m 220.4,227.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1356" />
<path
   class="st0"
   d="m 206,253.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.7 1.8,1.7"
   id="path1358" />
<path
   class="st0"
   d="m 220.4,253 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1360" />
<path
   class="st0"
   d="m 198.7,240.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1362" />
<path
   class="st0"
   d="m 227.6,240.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1364" />
<polygon
   class="st1"
   points="252,326.8 259.2,339.4 273.7,339.3 280.8,326.8 273.6,314.2 259.2,314.2 "
   id="polygon1366"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 227.6,240.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1368" />
<path
   class="st0"
   d="m 242.1,240.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path1370" />
<path
   class="st0"
   d="m 227.7,265.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1372" />
<path
   class="st0"
   d="m 242.1,265.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1374" />
<path
   class="st0"
   d="m 220.4,253 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1376" />
<path
   class="st0"
   d="m 249.3,253 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1378" />
<polygon
   class="st1"
   points="273.7,339.4 280.9,351.9 295.4,351.9 302.5,339.3 295.3,326.8 280.9,326.8 "
   id="polygon1380"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 249.3,253 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1382" />
<path
   class="st0"
   d="m 263.8,253 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1384" />
<path
   class="st0"
   d="m 249.4,278.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.7 1.8,1.7"
   id="path1386" />
<path
   class="st0"
   d="m 263.8,278.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1388" />
<path
   class="st0"
   d="m 242.1,265.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1390" />
<path
   class="st0"
   d="m 271,265.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1392" />
<polygon
   class="st1"
   points="295.4,351.9 302.6,364.5 317,364.4 324.2,351.9 317,339.3 302.6,339.3 "
   id="polygon1394"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 271,265.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1396" />
<path
   class="st0"
   d="m 285.5,265.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path1398" />
<path
   class="st0"
   d="m 271.1,290.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1400" />
<path
   class="st0"
   d="m 285.5,290.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1402" />
<path
   class="st0"
   d="m 263.8,278.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path1404" />
<path
   class="st0"
   d="m 292.7,278.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1406" />
<polygon
   class="st1"
   points="317.1,364.5 324.3,377 338.7,377 345.9,364.4 338.7,351.9 324.3,351.9 "
   id="polygon1408"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 292.7,278.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1410" />
<path
   class="st0"
   d="m 307.2,278.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1412" />
<path
   class="st0"
   d="m 292.8,303.3 c 0,0.9 -0.7,1.7 -1.6,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 0.9,0 1.7,0.7 1.7,1.7"
   id="path1414" />
<path
   class="st0"
   d="m 307.2,303.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1416" />
<path
   class="st0"
   d="m 285.5,290.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1418" />
<path
   class="st0"
   d="m 314.4,290.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1420" />
<polygon
   class="st1"
   points="338.8,377 346,389.6 360.4,389.5 367.6,377 360.4,364.4 346,364.4 "
   id="polygon1422"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 314.4,290.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1424" />
<path
   class="st0"
   d="m 328.9,290.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path1426" />
<path
   class="st0"
   d="m 314.5,315.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1428" />
<path
   class="st0"
   d="m 328.9,315.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1430" />
<path
   class="st0"
   d="m 307.2,303.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.7 1.8,1.7"
   id="path1432" />
<path
   class="st0"
   d="m 336.1,303.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1434" />
<polygon
   class="st1"
   points="360.5,389.6 367.7,402.1 382.1,402.1 389.3,389.5 382.1,377 367.7,377 "
   id="polygon1436"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 336.1,303.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1438" />
<path
   class="st0"
   d="m 350.6,303.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1440" />
<path
   class="st0"
   d="m 336.2,328.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.7 1.8,1.7"
   id="path1442" />
<path
   class="st0"
   d="m 350.6,328.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1444" />
<path
   class="st0"
   d="m 328.9,315.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1446" />
<path
   class="st0"
   d="m 357.8,315.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1448" />
<polygon
   class="st1"
   points="382.2,402.1 389.4,414.7 403.8,414.6 411,402.1 403.8,389.5 389.4,389.5 "
   id="polygon1450"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 357.8,315.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1452" />
<path
   class="st0"
   d="m 372.3,315.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path1454" />
<path
   class="st0"
   d="m 357.9,340.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1456" />
<path
   class="st0"
   d="m 372.3,340.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1458" />
<path
   class="st0"
   d="m 350.6,328.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.7 1.8,1.7"
   id="path1460" />
<path
   class="st0"
   d="m 379.5,328.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1462" />
<polygon
   class="st1"
   points="403.9,414.7 411.1,427.2 425.5,427.2 432.7,414.6 425.5,402.1 411.1,402.1 "
   id="polygon1464"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 379.5,328.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1466" />
<path
   class="st0"
   d="m 379.6,353.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.7 1.8,1.7"
   id="path1468" />
<path
   class="st0"
   d="m 372.3,340.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1470" />
<polygon
   class="st1"
   points="425.6,427.2 432.8,439.8 447.2,439.7 454.4,427.2 447.2,414.6 432.8,414.6 "
   id="polygon1472"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 10.7,140.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1474" />
<path
   class="st0"
   d="m 25.2,140.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1476" />
<path
   class="st0"
   d="m 10.8,165.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path1478" />
<path
   class="st0"
   d="m 25.2,165.2 c 0,0.9 -0.7,1.7 -1.6,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.7,0.8 1.7,1.7"
   id="path1480" />
<path
   class="st0"
   d="m 3.5,152.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1482" />
<path
   class="st0"
   d="m 32.4,152.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1484" />
<polygon
   class="st1"
   points="56.8,239 64,251.6 78.4,251.5 85.6,238.9 78.4,226.4 64,226.4 "
   id="polygon1486"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 32.4,152.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path1488" />
<path
   class="st0"
   d="m 46.9,152.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path1490" />
<path
   class="st0"
   d="m 32.5,177.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.8 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1492" />
<path
   class="st0"
   d="m 46.9,177.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1494" />
<path
   class="st0"
   d="m 25.2,165.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path1496" />
<path
   class="st0"
   d="m 54.1,165.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1498" />
<polygon
   class="st1"
   points="78.5,251.6 85.7,264.1 100.1,264.1 107.3,251.5 100.1,238.9 85.7,239 "
   id="polygon1500"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 54.1,165.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1502" />
<path
   class="st0"
   d="m 68.6,165.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1504" />
<path
   class="st0"
   d="m 54.2,190.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path1506" />
<path
   class="st0"
   d="m 68.6,190.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1508" />
<path
   class="st0"
   d="m 46.9,177.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1510" />
<path
   class="st0"
   d="m 75.8,177.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1512" />
<polygon
   class="st1"
   points="100.2,264.1 107.4,276.7 121.8,276.6 129,264.1 121.8,251.5 107.4,251.5 "
   id="polygon1514"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 75.8,177.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path1516" />
<path
   class="st0"
   d="m 90.3,177.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path1518" />
<path
   class="st0"
   d="m 75.9,202.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.7,0.8 1.8,1.7"
   id="path1520" />
<path
   class="st0"
   d="m 90.3,202.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1522" />
<path
   class="st0"
   d="m 68.6,190.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path1524" />
<path
   class="st0"
   d="m 97.5,190.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1526" />
<polygon
   class="st1"
   points="121.9,276.7 129.1,289.2 143.5,289.2 150.7,276.6 143.5,264 129.1,264.1 "
   id="polygon1528"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 97.5,190.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1530" />
<path
   class="st0"
   d="m 112,215.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1532" />
<path
   class="st0"
   d="m 90.3,202.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1534" />
<path
   class="st0"
   d="m 119.2,202.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1536" />
<path
   class="st0"
   d="m 119.2,202.9 c 0,0.9 -0.7,1.7 -1.6,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.7,0.7 1.7,1.7"
   id="path1538" />
<path
   class="st0"
   d="m 133.7,202.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path1540" />
<path
   class="st0"
   d="m 119.3,228 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1,0 1.7,0.8 1.8,1.7"
   id="path1542" />
<path
   class="st0"
   d="m 133.7,228 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1544" />
<path
   class="st0"
   d="m 112,215.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path1546" />
<path
   class="st0"
   d="m 140.9,215.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path1548" />
<polygon
   class="st1"
   points="165.3,301.8 172.5,314.3 186.9,314.3 194.1,301.7 186.9,289.1 172.5,289.2 "
   id="polygon1550"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 140.9,215.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1552" />
<path
   class="st0"
   d="m 155.4,215.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1554" />
<path
   class="st0"
   d="m 140.9,240.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1556" />
<path
   class="st0"
   d="m 155.4,240.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1558" />
<path
   class="st0"
   d="m 133.7,228 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1560" />
<path
   class="st0"
   d="m 162.6,228 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1562" />
<polygon
   class="st1"
   points="187,314.3 194.2,326.9 208.6,326.8 215.8,314.3 208.6,301.7 194.2,301.7 "
   id="polygon1564"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 162.6,228 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1566" />
<path
   class="st0"
   d="m 177.1,227.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path1568" />
<path
   class="st0"
   d="m 162.6,253.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1570" />
<path
   class="st0"
   d="m 177.1,253.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1572" />
<path
   class="st0"
   d="m 155.4,240.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path1574" />
<path
   class="st0"
   d="m 184.3,240.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path1576" />
<polygon
   class="st1"
   points="208.7,326.9 215.9,339.4 230.3,339.4 237.5,326.8 230.3,314.2 215.9,314.3 "
   id="polygon1578"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 184.3,240.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1580" />
<path
   class="st0"
   d="m 198.8,240.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1582" />
<path
   class="st0"
   d="m 184.3,265.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path1584" />
<path
   class="st0"
   d="m 198.8,265.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1586" />
<path
   class="st0"
   d="m 177.1,253.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1588" />
<path
   class="st0"
   d="m 206,253.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1590" />
<polygon
   class="st1"
   points="230.4,339.4 237.6,352 252,351.9 259.2,339.4 252,326.8 237.6,326.8 "
   id="polygon1592"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 206.1,303.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path1594" />
<polygon
   class="st1"
   points="252.2,377.2 259.4,389.8 273.8,389.7 281,377.2 273.8,364.6 259.4,364.6 "
   id="polygon1596"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 162.8,303.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1598" />
<path
   class="st0"
   d="m 177.3,303.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1600" />
<polygon
   class="st1"
   points="208.8,377.3 216.1,389.8 230.5,389.8 237.7,377.2 230.5,364.6 216,364.7 "
   id="polygon1602"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 184.5,316 c 0,0.9 -0.7,1.7 -1.6,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.7,0.8 1.7,1.7"
   id="path1604" />
<path
   class="st0"
   d="m 199,316 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path1606" />
<path
   class="st0"
   d="m 177.3,303.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1608" />
<path
   class="st0"
   d="m 162.8,278.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path1610" />
<path
   class="st0"
   d="m 177.3,278.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.7 1.8,1.7"
   id="path1612" />
<path
   class="st0"
   d="m 206.2,303.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1614" />
<polygon
   class="st1"
   points="230.5,389.8 237.8,402.4 252.2,402.3 259.4,389.8 252.2,377.2 237.7,377.2 "
   id="polygon1616"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 206.2,303.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1618" />
<path
   class="st0"
   d="m 177.3,328.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.7 1.8,1.7"
   id="path1620" />
<path
   class="st0"
   d="m 206.2,328.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path1622" />
<path
   class="st0"
   d="m 199,316 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.7,0.8 1.8,1.7"
   id="path1624" />
<path
   class="st0"
   d="m 184.5,341.1 c 0,0.9 -0.7,1.7 -1.6,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.7,0.8 1.7,1.7"
   id="path1626" />
<path
   class="st0"
   d="m 199,341.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1628" />
<polygon
   class="st1"
   points="230.5,414.9 237.8,427.4 252.2,427.4 259.4,414.8 252.2,402.2 237.7,402.3 "
   id="polygon1630"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 199,341.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.7,0.8 1.8,1.7"
   id="path1632" />
<path
   class="st0"
   d="m 206,253.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1634" />
<path
   class="st0"
   d="m 220.5,253 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path1636" />
<path
   class="st0"
   d="m 206,278.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1638" />
<path
   class="st0"
   d="m 220.5,278.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1640" />
<path
   class="st0"
   d="m 198.8,265.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path1642" />
<path
   class="st0"
   d="m 227.7,265.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path1644" />
<polygon
   class="st1"
   points="252.1,352 259.3,364.5 273.7,364.5 280.9,351.9 273.7,339.3 259.3,339.4 "
   id="polygon1646"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 227.7,265.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1648" />
<path
   class="st0"
   d="m 242.2,265.6 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1650" />
<path
   class="st0"
   d="m 227.7,290.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path1652" />
<path
   class="st0"
   d="m 242.2,290.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1654" />
<path
   class="st0"
   d="m 220.5,278.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1656" />
<path
   class="st0"
   d="m 249.4,278.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1658" />
<polygon
   class="st1"
   points="273.8,364.5 281,377.1 295.4,377 302.6,364.5 295.4,351.9 281,351.9 "
   id="polygon1660"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 249.4,278.2 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1662" />
<path
   class="st0"
   d="m 220.5,303.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.7 1.8,1.7"
   id="path1664" />
<path
   class="st0"
   d="m 249.4,303.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1666" />
<path
   class="st0"
   d="m 263.9,278.1 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path1668" />
<path
   class="st0"
   d="m 263.9,303.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1670" />
<path
   class="st0"
   d="m 242.2,290.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path1672" />
<path
   class="st0"
   d="m 184.6,290.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path1674" />
<path
   class="st0"
   d="m 155.6,290.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path1676" />
<path
   class="st0"
   d="m 199.1,290.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path1678" />
<path
   class="st0"
   d="m 271.1,290.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path1680" />
<polygon
   class="st1"
   points="295.5,377.1 302.7,389.6 317.1,389.6 324.3,377 317.1,364.5 302.7,364.5 "
   id="polygon1682"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 271.1,290.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1684" />
<path
   class="st0"
   d="m 285.6,290.7 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1686" />
<path
   class="st0"
   d="m 285.6,315.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1688" />
<path
   class="st0"
   d="m 263.9,303.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1690" />
<path
   class="st0"
   d="m 292.8,303.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1692" />
<path
   class="st0"
   d="m 292.8,303.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1694" />
<path
   class="st0"
   d="m 307.3,303.2 c 0,0.9 -0.7,1.7 -1.6,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 0.9,0.1 1.7,0.8 1.7,1.7"
   id="path1696" />
<path
   class="st0"
   d="m 292.8,328.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1698" />
<path
   class="st0"
   d="m 307.3,328.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-1 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1700" />
<path
   class="st0"
   d="m 285.6,315.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.7 1.8,1.7"
   id="path1702" />
<path
   class="st0"
   d="m 314.5,315.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path1704" />
<polygon
   class="st1"
   points="338.9,402.2 346.1,414.7 360.5,414.7 367.7,402.1 360.5,389.6 346.1,389.6 "
   id="polygon1706"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 314.5,315.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1708" />
<path
   class="st0"
   d="m 329,315.8 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1710" />
<path
   class="st0"
   d="m 314.5,341 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.7 1.8,1.7"
   id="path1712" />
<path
   class="st0"
   d="m 329,340.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1714" />
<path
   class="st0"
   d="m 307.3,328.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1716" />
<path
   class="st0"
   d="m 336.2,328.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1718" />
<polygon
   class="st1"
   points="360.6,414.7 367.8,427.3 382.2,427.2 389.4,414.7 382.2,402.1 367.8,402.1 "
   id="polygon1720"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 336.2,328.4 c 0,0.9 -0.7,1.7 -1.7,1.7 -1,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1722" />
<path
   class="st0"
   d="m 350.7,328.3 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.7,0.8 1.8,1.7"
   id="path1724" />
<path
   class="st0"
   d="m 336.2,353.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1726" />
<path
   class="st0"
   d="m 350.7,353.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1728" />
<path
   class="st0"
   d="m 329,341 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.7 1.8,1.7"
   id="path1730" />
<path
   class="st0"
   d="m 357.9,340.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0.1 1.8,0.8 1.8,1.7"
   id="path1732" />
<polygon
   class="st1"
   points="382.3,427.3 389.5,439.8 403.9,439.8 411.1,427.2 403.9,414.7 389.5,414.7 "
   id="polygon1734"
   transform="translate(-54.9,-86.3)" />
<path
   class="st0"
   d="m 357.9,340.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0.1 1.8,0.8 1.8,1.7"
   id="path1736" />
<path
   class="st0"
   d="m 372.4,340.9 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.7,0.8 1.8,1.7"
   id="path1738" />
<path
   class="st0"
   d="m 350.7,353.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1740" />
<path
   class="st0"
   d="m 379.6,353.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1,0 1.8,0.8 1.8,1.7"
   id="path1742" />
<path
   class="st0"
   d="m 379.6,353.5 c 0,0.9 -0.7,1.7 -1.7,1.7 -0.9,0 -1.7,-0.7 -1.7,-1.7 0,-0.9 0.7,-1.7 1.6,-1.7 1.1,0 1.8,0.8 1.8,1.7"
   id="path1744" />
<line
   class="st2"
   x1="382.80002"
   y1="462.40002"
   x2="382.80002"
   y2="-563.20001"
   id="line1746" />
</svg>

        `,
        "3": `
        <?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg class="svg-dec"
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   version="1.1"
   id="Ebene_1"
   x="0px"
   y="0px"
   viewBox="0 0 326.09052 320.85159"
   xml:space="preserve"
   sodipodi:docname="wabe4.svg"
   width="326.09052"
   height="320.85159"
   inkscape:version="1.0.2 (e86c870879, 2021-01-15, custom)"><metadata
   id="metadata2959"><rdf:RDF><cc:Work
       rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type
         rdf:resource="http://purl.org/dc/dcmitype/StillImage" /><dc:title></dc:title></cc:Work></rdf:RDF></metadata><defs
   id="defs2957" /><sodipodi:namedview
   pagecolor="#000000"
   bordercolor="#666666"
   borderopacity="1"
   objecttolerance="10"
   gridtolerance="10"
   guidetolerance="10"
   inkscape:pageopacity="0"
   inkscape:pageshadow="2"
   inkscape:window-width="2880"
   inkscape:window-height="1526"
   id="namedview2955"
   showgrid="false"
   inkscape:zoom="1.96875"
   inkscape:cx="163.4905"
   inkscape:cy="152.1"
   inkscape:window-x="-11"
   inkscape:window-y="1609"
   inkscape:window-maximized="1"
   inkscape:current-layer="Ebene_1" />
<style
   type="text/css"
   id="style2">
	.st0{fill:#000000;}
	.st1{fill:none;stroke:#000000;stroke-width:0.5032;stroke-miterlimit:10;}
	.st2{fill:none;}
</style>
<path
   class="st0"
   d="m 30.990503,82.9 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path4" />
<path
   class="st0"
   d="m 39.490503,82.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path6" />
<path
   class="st0"
   d="m 30.990503,97.7 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path8" />
<path
   class="st0"
   d="m 39.590503,97.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path10" />
<path
   class="st0"
   d="m 26.690503,90.3 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path12" />
<path
   class="st0"
   d="m 43.790503,90.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path14" />
<polygon
   class="st1"
   points="118.3,194.2 122.5,201.6 131.1,201.6 135.3,194.2 131.1,186.7 122.5,186.8 "
   id="polygon16"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 43.790503,90.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path18" />
<path
   class="st0"
   d="m 52.390503,90.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path20" />
<path
   class="st0"
   d="m 43.890503,105.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0.1 1,0.5 1,1"
   id="path22" />
<path
   class="st0"
   d="m 52.390503,105.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path24" />
<path
   class="st0"
   d="m 39.590503,97.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path26" />
<path
   class="st0"
   d="m 56.690503,97.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path28" />
<polygon
   class="st1"
   points="131.1,201.6 135.4,209 143.9,209 148.2,201.6 143.9,194.2 135.4,194.2 "
   id="polygon30"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 56.690503,97.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path32" />
<path
   class="st0"
   d="m 65.190503,97.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path34" />
<path
   class="st0"
   d="m 56.690503,112.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path36" />
<path
   class="st0"
   d="m 65.190503,112.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path38" />
<path
   class="st0"
   d="m 52.390503,105.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0.1 1,0.5 1,1"
   id="path40" />
<path
   class="st0"
   d="m 69.490503,105.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0.1 1,0.5 1,1"
   id="path42" />
<polygon
   class="st1"
   points="143.9,209 148.2,216.5 156.7,216.5 161,209 156.7,201.6 148.2,201.6 "
   id="polygon44"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 69.490503,105.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path46" />
<path
   class="st0"
   d="m 77.990503,105.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path48" />
<path
   class="st0"
   d="m 69.490503,120 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path50" />
<path
   class="st0"
   d="m 78.090503,120 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path52" />
<path
   class="st0"
   d="m 65.190503,112.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path54" />
<path
   class="st0"
   d="m 82.290503,112.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path56" />
<polygon
   class="st1"
   points="156.8,216.5 161,223.9 169.6,223.9 173.8,216.4 169.6,209 161,209 "
   id="polygon58"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 82.290503,112.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path60" />
<path
   class="st0"
   d="m 82.390503,127.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path62" />
<path
   class="st0"
   d="m 78.090503,120 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path64" />
<path
   class="st0"
   d="m 95.190503,134.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path66" />
<path
   class="st0"
   d="m 103.6905,134.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path68" />
<path
   class="st0"
   d="m 107.9905,142.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path70" />
<path
   class="st0"
   d="m 116.5905,142.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0.1 1,0.5 1,1"
   id="path72" />
<path
   class="st0"
   d="m 103.6905,134.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path74" />
<path
   class="st0"
   d="m 120.7905,134.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path76" />
<path
   class="st0"
   d="m 120.7905,134.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path78" />
<path
   class="st0"
   d="m 129.3905,134.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path80" />
<path
   class="st0"
   d="m 146.2905,134.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path82" />
<path
   class="st0"
   d="m 133.6905,127.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path84" />
<path
   class="st0"
   d="m 120.8905,149.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path86" />
<path
   class="st0"
   d="m 129.3905,149.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path88" />
<path
   class="st0"
   d="m 116.5905,142.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path90" />
<path
   class="st0"
   d="m 133.6905,142.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path92" />
<polygon
   class="st1"
   points="208.1,246.2 212.4,253.6 220.9,253.6 225.2,246.1 220.9,238.7 212.4,238.7 "
   id="polygon94"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 133.6905,142.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0.1 1,0.5 1,1"
   id="path96" />
<path
   class="st0"
   d="m 142.1905,142.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path98" />
<path
   class="st0"
   d="m 159.2905,142.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path100" />
<path
   class="st0"
   d="m 133.6905,157.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path102" />
<path
   class="st0"
   d="m 142.1905,157.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path104" />
<path
   class="st0"
   d="m 129.3905,149.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path106" />
<path
   class="st0"
   d="m 146.4905,149.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path108" />
<polygon
   class="st1"
   points="220.9,253.6 225.2,261 233.8,261 238,253.6 233.7,246.1 225.2,246.1 "
   id="polygon110"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 142.1905,127.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path112" />
<polygon
   class="st1"
   points="220.9,238.7 225.2,246.2 233.7,246.2 238,238.7 233.7,231.3 225.1,231.3 "
   id="polygon114"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 167.8905,142.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path116" />
<path
   class="st0"
   d="m 184.6905,142.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path118" />
<polygon
   class="st1"
   points="246.6,253.6 250.9,261 259.4,261 263.7,253.6 259.4,246.1 250.9,246.1 "
   id="polygon120"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 180.5905,134.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path122" />
<polygon
   class="st1"
   points="259.4,246.1 263.6,253.6 272.2,253.5 276.4,246.1 272.2,238.7 263.6,238.7 "
   id="polygon124"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 146.4905,149.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path126" />
<path
   class="st0"
   d="m 155.0905,149.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0.1 0.9,0.5 1,1"
   id="path128" />
<path
   class="st0"
   d="m 171.9905,149.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0.1 1,0.5 1,1"
   id="path130" />
<path
   class="st0"
   d="m 180.6905,149.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path132" />
<path
   class="st0"
   d="m 171.9905,134.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path134" />
<path
   class="st0"
   d="m 146.4905,164.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path136" />
<path
   class="st0"
   d="m 155.0905,164.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path138" />
<path
   class="st0"
   d="m 142.1905,157.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path140" />
<path
   class="st0"
   d="m 159.2905,157.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path142" />
<polygon
   class="st1"
   points="233.8,261 238.1,268.4 246.6,268.4 250.8,261 246.6,253.6 238,253.6 "
   id="polygon144"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 159.2905,157.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path146" />
<path
   class="st0"
   d="m 167.8905,157.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path148" />
<path
   class="st0"
   d="m 159.3905,172 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path150" />
<path
   class="st0"
   d="m 167.8905,171.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path152" />
<path
   class="st0"
   d="m 155.0905,164.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path154" />
<path
   class="st0"
   d="m 172.1905,164.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path156" />
<polygon
   class="st1"
   points="246.6,268.4 250.9,275.9 259.4,275.8 263.7,268.4 259.4,261 250.9,261 "
   id="polygon158"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 172.1905,164.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path160" />
<path
   class="st0"
   d="m 167.8905,171.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path162" />
<path
   class="st0"
   d="m 210.6905,201.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path164" />
<path
   class="st0"
   d="m 219.1905,201.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path166" />
<path
   class="st0"
   d="m 223.4905,194.2 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path168" />
<path
   class="st0"
   d="m 223.4905,194.2 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path170" />
<path
   class="st0"
   d="m 232.0905,194.2 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path172" />
<path
   class="st0"
   d="m 223.4905,209.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path174" />
<path
   class="st0"
   d="m 232.0905,209.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path176" />
<path
   class="st0"
   d="m 219.1905,201.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path178" />
<path
   class="st0"
   d="m 236.2905,201.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path180" />
<polygon
   class="st1"
   points="310.8,305.5 315.1,313 323.6,313 327.8,305.5 323.6,298.1 315,298.1 "
   id="polygon182"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 236.2905,201.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path184" />
<path
   class="st0"
   d="m 244.8905,201.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path186" />
<path
   class="st0"
   d="m 236.3905,216.5 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path188" />
<path
   class="st0"
   d="m 244.8905,216.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path190" />
<path
   class="st0"
   d="m 232.0905,209.1 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path192" />
<path
   class="st0"
   d="m 249.1905,209.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path194" />
<polygon
   class="st1"
   points="323.6,313 327.9,320.4 336.4,320.4 340.7,312.9 336.4,305.5 327.9,305.5 "
   id="polygon196"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 249.1905,209 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0.1 1,0.5 1,1"
   id="path198" />
<path
   class="st0"
   d="m 249.1905,223.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path200" />
<path
   class="st0"
   d="m 244.8905,216.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path202" />
<path
   class="st0"
   d="m 30.990503,97.7 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path204" />
<path
   class="st0"
   d="m 39.590503,97.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path206" />
<path
   class="st0"
   d="m 31.090503,112.6 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path208" />
<path
   class="st0"
   d="m 39.590503,112.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path210" />
<path
   class="st0"
   d="m 26.790503,105.2 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path212" />
<path
   class="st0"
   d="m 43.890503,105.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path214" />
<polygon
   class="st1"
   points="118.3,209.1 122.6,216.5 131.1,216.5 135.4,209 131.1,201.6 122.6,201.6 "
   id="polygon216"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 43.890503,105.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path218" />
<path
   class="st0"
   d="m 52.390503,105.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path220" />
<path
   class="st0"
   d="m 43.890503,120 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path222" />
<path
   class="st0"
   d="m 52.390503,120 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path224" />
<path
   class="st0"
   d="m 39.590503,112.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path226" />
<path
   class="st0"
   d="m 56.690503,112.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path228" />
<polygon
   class="st1"
   points="131.1,216.5 135.4,223.9 144,223.9 148.2,216.5 143.9,209 135.4,209.1 "
   id="polygon230"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 56.690503,112.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path232" />
<path
   class="st0"
   d="m 65.290503,112.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path234" />
<path
   class="st0"
   d="m 56.690503,127.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path236" />
<path
   class="st0"
   d="m 65.290503,127.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path238" />
<path
   class="st0"
   d="m 52.390503,120 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path240" />
<path
   class="st0"
   d="m 69.490503,120 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path242" />
<polygon
   class="st1"
   points="144,223.9 148.3,231.3 156.8,231.3 161,223.9 156.8,216.5 148.2,216.5 "
   id="polygon244"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 69.490503,120 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path246" />
<path
   class="st0"
   d="m 78.090503,120 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path248" />
<path
   class="st0"
   d="m 69.590503,134.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path250" />
<path
   class="st0"
   d="m 78.090503,134.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path252" />
<path
   class="st0"
   d="m 65.290503,127.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0.1 1,0.5 1,1"
   id="path254" />
<path
   class="st0"
   d="m 82.390503,127.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0.1 1,0.5 1,1"
   id="path256" />
<polygon
   class="st1"
   points="156.8,231.3 161.1,238.8 169.6,238.8 173.9,231.3 169.6,223.9 161.1,223.9 "
   id="polygon258"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 82.390503,127.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path260" />
<path
   class="st0"
   d="m 82.390503,142.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path262" />
<path
   class="st0"
   d="m 90.990503,142.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path264" />
<path
   class="st0"
   d="m 78.090503,134.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path266" />
<path
   class="st0"
   d="m 95.190503,134.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path268" />
<path
   class="st0"
   d="m 95.190503,134.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path270" />
<path
   class="st0"
   d="m 103.7905,134.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path272" />
<path
   class="st0"
   d="m 95.190503,149.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path274" />
<path
   class="st0"
   d="m 103.7905,149.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path276" />
<path
   class="st0"
   d="m 90.890503,142.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path278" />
<path
   class="st0"
   d="m 107.9905,142.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path280" />
<polygon
   class="st1"
   points="182.5,246.2 186.8,253.6 195.3,253.6 199.5,246.2 195.3,238.7 186.7,238.7 "
   id="polygon282"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 107.9905,142.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path284" />
<path
   class="st0"
   d="m 116.5905,142.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path286" />
<path
   class="st0"
   d="m 108.0905,157.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path288" />
<path
   class="st0"
   d="m 116.5905,157.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path290" />
<path
   class="st0"
   d="m 103.7905,149.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path292" />
<path
   class="st0"
   d="m 120.8905,149.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path294" />
<polygon
   class="st1"
   points="195.3,253.6 199.6,261 208.1,261 212.4,253.6 208.1,246.2 199.6,246.2 "
   id="polygon296"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 120.8905,149.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path298" />
<path
   class="st0"
   d="m 129.3905,149.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path300" />
<path
   class="st0"
   d="m 120.8905,164.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path302" />
<path
   class="st0"
   d="m 129.4905,164.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0.1 1,0.5 1,1"
   id="path304" />
<path
   class="st0"
   d="m 116.5905,157.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path306" />
<path
   class="st0"
   d="m 133.6905,157.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path308" />
<polygon
   class="st1"
   points="208.2,261 212.4,268.5 221,268.4 225.2,261 220.9,253.6 212.4,253.6 "
   id="polygon310"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 133.6905,157.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path312" />
<path
   class="st0"
   d="m 142.2905,157.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path314" />
<path
   class="st0"
   d="m 133.6905,172 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path316" />
<path
   class="st0"
   d="m 142.2905,172 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path318" />
<path
   class="st0"
   d="m 129.3905,164.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path320" />
<path
   class="st0"
   d="m 146.4905,164.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path322" />
<polygon
   class="st1"
   points="221,268.5 225.3,275.9 233.8,275.9 238.1,268.4 233.8,261 225.2,261 "
   id="polygon324"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 146.4905,164.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path326" />
<path
   class="st0"
   d="m 155.0905,164.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path328" />
<path
   class="st0"
   d="m 146.5905,179.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path330" />
<path
   class="st0"
   d="m 155.0905,179.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path332" />
<path
   class="st0"
   d="m 142.2905,172 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path334" />
<path
   class="st0"
   d="m 159.3905,172 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path336" />
<polygon
   class="st1"
   points="233.8,275.9 238.1,283.3 246.6,283.3 250.9,275.9 246.6,268.4 238.1,268.4 "
   id="polygon338"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 159.3905,172 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path340" />
<path
   class="st0"
   d="m 167.8905,171.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path342" />
<path
   class="st0"
   d="m 159.3905,186.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path344" />
<path
   class="st0"
   d="m 155.0905,179.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path346" />
<path
   class="st0"
   d="m 197.8905,209.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path348" />
<path
   class="st0"
   d="m 206.4905,209.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path350" />
<path
   class="st0"
   d="m 210.6905,201.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path352" />
<path
   class="st0"
   d="m 210.6905,201.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path354" />
<path
   class="st0"
   d="m 219.2905,201.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0.1 1,0.5 1,1"
   id="path356" />
<path
   class="st0"
   d="m 210.6905,216.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path358" />
<path
   class="st0"
   d="m 219.2905,216.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path360" />
<path
   class="st0"
   d="m 206.3905,209.1 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path362" />
<path
   class="st0"
   d="m 223.4905,209.1 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path364" />
<polygon
   class="st1"
   points="298,313 302.3,320.4 310.8,320.4 315.1,313 310.8,305.5 302.2,305.6 "
   id="polygon366"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 223.5905,209.1 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path368" />
<path
   class="st0"
   d="m 232.0905,209.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path370" />
<path
   class="st0"
   d="m 223.5905,223.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0.1 1,0.5 1,1"
   id="path372" />
<path
   class="st0"
   d="m 232.0905,223.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path374" />
<path
   class="st0"
   d="m 219.2905,216.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path376" />
<path
   class="st0"
   d="m 236.3905,216.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path378" />
<polygon
   class="st1"
   points="310.8,320.4 315.1,327.8 323.6,327.8 327.9,320.4 323.6,313 315.1,313 "
   id="polygon380"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 236.3905,216.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path382" />
<path
   class="st0"
   d="m 244.8905,216.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path384" />
<path
   class="st0"
   d="m 236.3905,231.4 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path386" />
<path
   class="st0"
   d="m 244.9905,231.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0.1 1,0.5 1,1"
   id="path388" />
<path
   class="st0"
   d="m 232.0905,223.9 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path390" />
<path
   class="st0"
   d="m 249.1905,223.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path392" />
<polygon
   class="st1"
   points="323.7,327.8 327.9,335.3 336.5,335.3 340.7,327.8 336.4,320.4 327.9,320.4 "
   id="polygon394"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 249.1905,223.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path396" />
<path
   class="st0"
   d="m 249.1905,238.8 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path398" />
<path
   class="st0"
   d="m 244.8905,231.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path400" />
<path
   class="st0"
   d="m 26.790503,105.2 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path402" />
<path
   class="st0"
   d="m 31.090503,112.6 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path404" />
<path
   class="st0"
   d="m 31.090503,112.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path406" />
<path
   class="st0"
   d="m 39.590503,112.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path408" />
<path
   class="st0"
   d="m 39.590503,127.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path410" />
<path
   class="st0"
   d="m 43.890503,120 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0.1 1,0.5 1,1"
   id="path412" />
<path
   class="st0"
   d="m 43.890503,120 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path414" />
<path
   class="st0"
   d="m 52.390503,120 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path416" />
<path
   class="st0"
   d="m 43.890503,134.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path418" />
<path
   class="st0"
   d="m 52.490503,134.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path420" />
<path
   class="st0"
   d="m 39.590503,127.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path422" />
<path
   class="st0"
   d="m 56.690503,127.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path424" />
<polygon
   class="st1"
   points="131.2,231.4 135.5,238.8 144,238.8 148.2,231.3 144,223.9 135.4,223.9 "
   id="polygon426"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 56.690503,127.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path428" />
<path
   class="st0"
   d="m 65.290503,127.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0.1 1,0.5 1,1"
   id="path430" />
<path
   class="st0"
   d="m 56.790503,142.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path432" />
<path
   class="st0"
   d="m 65.290503,142.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path434" />
<path
   class="st0"
   d="m 52.490503,134.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path436" />
<path
   class="st0"
   d="m 69.590503,134.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path438" />
<polygon
   class="st1"
   points="144,238.8 148.3,246.2 156.8,246.2 161.1,238.8 156.8,231.3 148.3,231.4 "
   id="polygon440"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 69.590503,134.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path442" />
<path
   class="st0"
   d="m 78.090503,134.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path444" />
<path
   class="st0"
   d="m 69.590503,149.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path446" />
<path
   class="st0"
   d="m 78.090503,149.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path448" />
<path
   class="st0"
   d="m 65.290503,142.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path450" />
<path
   class="st0"
   d="m 82.390503,142.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path452" />
<polygon
   class="st1"
   points="156.8,246.2 161.1,253.7 169.7,253.6 173.9,246.2 169.6,238.8 161.1,238.8 "
   id="polygon454"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 82.390503,142.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path456" />
<path
   class="st0"
   d="m 90.890503,142.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path458" />
<path
   class="st0"
   d="m 82.390503,157.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path460" />
<path
   class="st0"
   d="m 90.990503,157.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path462" />
<path
   class="st0"
   d="m 78.090503,149.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path464" />
<path
   class="st0"
   d="m 95.190503,149.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path466" />
<polygon
   class="st1"
   points="169.7,253.6 174,261.1 182.5,261.1 186.7,253.6 182.5,246.2 173.9,246.2 "
   id="polygon468"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 95.190503,149.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path470" />
<path
   class="st0"
   d="m 103.7905,149.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path472" />
<path
   class="st0"
   d="m 95.290503,164.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path474" />
<path
   class="st0"
   d="m 103.7905,164.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path476" />
<path
   class="st0"
   d="m 90.990503,157.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path478" />
<path
   class="st0"
   d="m 108.0905,157.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path480" />
<polygon
   class="st1"
   points="182.5,261.1 186.8,268.5 195.3,268.5 199.6,261 195.3,253.6 186.8,253.6 "
   id="polygon482"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 108.0905,157.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path484" />
<path
   class="st0"
   d="m 116.5905,157.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path486" />
<path
   class="st0"
   d="m 108.0905,172 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path488" />
<path
   class="st0"
   d="m 116.5905,172 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path490" />
<path
   class="st0"
   d="m 103.7905,164.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path492" />
<path
   class="st0"
   d="m 120.8905,164.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path494" />
<polygon
   class="st1"
   points="195.3,268.5 199.6,275.9 208.2,275.9 212.4,268.5 208.1,261 199.6,261.1 "
   id="polygon496"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 120.8905,164.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path498" />
<path
   class="st0"
   d="m 129.4905,164.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path500" />
<path
   class="st0"
   d="m 120.8905,179.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path502" />
<path
   class="st0"
   d="m 129.4905,179.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path504" />
<path
   class="st0"
   d="m 116.5905,172 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path506" />
<path
   class="st0"
   d="m 133.6905,172 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path508" />
<polygon
   class="st1"
   points="208.2,275.9 212.5,283.3 221,283.3 225.2,275.9 221,268.5 212.4,268.5 "
   id="polygon510"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 133.6905,172 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path512" />
<path
   class="st0"
   d="m 142.2905,172 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path514" />
<path
   class="st0"
   d="m 133.7905,186.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path516" />
<path
   class="st0"
   d="m 142.2905,186.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path518" />
<path
   class="st0"
   d="m 129.4905,179.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0.1 1,0.5 1,1"
   id="path520" />
<path
   class="st0"
   d="m 146.5905,179.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path522" />
<polygon
   class="st1"
   points="221,283.3 225.3,290.8 233.8,290.8 238.1,283.3 233.8,275.9 225.3,275.9 "
   id="polygon524"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 146.5905,179.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path526" />
<path
   class="st0"
   d="m 155.0905,179.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path528" />
<path
   class="st0"
   d="m 146.5905,194.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path530" />
<path
   class="st0"
   d="m 155.0905,194.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path532" />
<path
   class="st0"
   d="m 142.2905,186.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path534" />
<path
   class="st0"
   d="m 159.3905,186.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path536" />
<polygon
   class="st1"
   points="233.8,290.8 238.1,298.2 246.7,298.2 250.9,290.7 246.6,283.3 238.1,283.3 "
   id="polygon538"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 159.3905,186.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path540" />
<path
   class="st0"
   d="m 159.3905,201.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path542" />
<path
   class="st0"
   d="m 155.0905,194.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path544" />
<path
   class="st0"
   d="m 180.7905,209.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path546" />
<path
   class="st0"
   d="m 185.0905,216.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path548" />
<path
   class="st0"
   d="m 193.5905,216.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path550" />
<path
   class="st0"
   d="m 180.7905,209.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path552" />
<path
   class="st0"
   d="m 197.8905,209.1 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path554" />
<polygon
   class="st1"
   points="272.3,313 276.6,320.5 285.2,320.4 289.4,313 285.1,305.6 276.6,305.6 "
   id="polygon556"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 197.8905,209.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path558" />
<path
   class="st0"
   d="m 206.4905,209.1 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path560" />
<path
   class="st0"
   d="m 197.8905,224 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path562" />
<path
   class="st0"
   d="m 206.4905,224 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path564" />
<path
   class="st0"
   d="m 193.5905,216.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path566" />
<path
   class="st0"
   d="m 210.6905,216.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path568" />
<polygon
   class="st1"
   points="285.2,320.5 289.5,327.9 298,327.9 302.2,320.4 298,313 289.4,313 "
   id="polygon570"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 210.6905,216.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path572" />
<path
   class="st0"
   d="m 219.2905,216.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path574" />
<path
   class="st0"
   d="m 210.7905,231.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path576" />
<path
   class="st0"
   d="m 219.2905,231.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path578" />
<path
   class="st0"
   d="m 206.4905,224 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path580" />
<path
   class="st0"
   d="m 223.5905,224 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path582" />
<polygon
   class="st1"
   points="298,327.9 302.3,335.3 310.8,335.3 315.1,327.9 310.8,320.4 302.3,320.4 "
   id="polygon584"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 223.5905,224 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path586" />
<path
   class="st0"
   d="m 232.0905,223.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path588" />
<path
   class="st0"
   d="m 223.5905,238.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path590" />
<path
   class="st0"
   d="m 232.1905,238.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path592" />
<path
   class="st0"
   d="m 219.2905,231.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path594" />
<path
   class="st0"
   d="m 236.3905,231.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path596" />
<polygon
   class="st1"
   points="310.9,335.3 315.1,342.7 323.7,342.7 327.9,335.3 323.6,327.8 315.1,327.9 "
   id="polygon598"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 236.3905,231.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path600" />
<path
   class="st0"
   d="m 244.9905,231.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path602" />
<path
   class="st0"
   d="m 236.3905,246.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path604" />
<path
   class="st0"
   d="m 244.9905,246.2 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path606" />
<path
   class="st0"
   d="m 232.0905,238.8 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path608" />
<path
   class="st0"
   d="m 249.1905,238.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path610" />
<polygon
   class="st1"
   points="323.7,342.7 328,350.2 336.5,350.1 340.7,342.7 336.5,335.3 327.9,335.3 "
   id="polygon612"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 249.1905,238.8 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path614" />
<path
   class="st0"
   d="m 249.2905,253.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path616" />
<path
   class="st0"
   d="m 244.9905,246.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0.1 1,0.5 1,1"
   id="path618" />
<path
   class="st0"
   d="m 18.290503,134.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path620" />
<path
   class="st0"
   d="m 26.890503,134.9 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 0.9,0.5 1,1"
   id="path622" />
<path
   class="st0"
   d="m 39.690503,127.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path624" />
<path
   class="st0"
   d="m 31.090503,142.4 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path626" />
<path
   class="st0"
   d="m 39.690503,142.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0.1 1,0.5 1,1"
   id="path628" />
<path
   class="st0"
   d="m 26.790503,134.9 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path630" />
<path
   class="st0"
   d="m 43.890503,134.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path632" />
<path
   class="st0"
   d="m 43.890503,134.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path634" />
<path
   class="st0"
   d="m 52.490503,134.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path636" />
<path
   class="st0"
   d="m 43.990503,149.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path638" />
<path
   class="st0"
   d="m 52.490503,149.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path640" />
<path
   class="st0"
   d="m 39.690503,142.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0.1 1,0.5 1,1"
   id="path642" />
<path
   class="st0"
   d="m 56.790503,142.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0.1 1,0.5 1,1"
   id="path644" />
<polygon
   class="st1"
   points="131.2,246.3 135.5,253.7 144,253.7 148.3,246.2 144,238.8 135.5,238.8 "
   id="polygon646"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 56.790503,142.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0.1 1,0.5 1,1"
   id="path648" />
<path
   class="st0"
   d="m 65.290503,142.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path650" />
<path
   class="st0"
   d="m 56.790503,157.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path652" />
<path
   class="st0"
   d="m 65.390503,157.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path654" />
<path
   class="st0"
   d="m 52.490503,149.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path656" />
<path
   class="st0"
   d="m 69.590503,149.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path658" />
<polygon
   class="st1"
   points="144.1,253.7 148.3,261.1 156.9,261.1 161.1,253.6 156.8,246.2 148.3,246.2 "
   id="polygon660"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 69.590503,149.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path662" />
<path
   class="st0"
   d="m 78.190503,149.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0.1 1,0.5 1,1"
   id="path664" />
<path
   class="st0"
   d="m 69.590503,164.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path666" />
<path
   class="st0"
   d="m 78.190503,164.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path668" />
<path
   class="st0"
   d="m 65.290503,157.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path670" />
<path
   class="st0"
   d="m 82.390503,157.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path672" />
<polygon
   class="st1"
   points="156.9,261.1 161.2,268.5 169.7,268.5 173.9,261.1 169.7,253.6 161.1,253.7 "
   id="polygon674"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 82.390503,157.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path676" />
<path
   class="st0"
   d="m 90.990503,157.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path678" />
<path
   class="st0"
   d="m 82.490503,172 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0.1 1,0.5 1,1"
   id="path680" />
<path
   class="st0"
   d="m 90.990503,172 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path682" />
<path
   class="st0"
   d="m 78.190503,164.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path684" />
<path
   class="st0"
   d="m 95.290503,164.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path686" />
<polygon
   class="st1"
   points="169.7,268.5 174,276 182.5,275.9 186.8,268.5 182.5,261.1 174,261.1 "
   id="polygon688"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 95.290503,164.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path690" />
<path
   class="st0"
   d="m 103.7905,164.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path692" />
<path
   class="st0"
   d="m 95.290503,179.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path694" />
<path
   class="st0"
   d="m 103.8905,179.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path696" />
<path
   class="st0"
   d="m 90.990503,172 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path698" />
<path
   class="st0"
   d="m 108.0905,172 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path700" />
<polygon
   class="st1"
   points="182.6,275.9 186.8,283.4 195.4,283.4 199.6,275.9 195.3,268.5 186.8,268.5 "
   id="polygon702"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 108.0905,172 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path704" />
<path
   class="st0"
   d="m 116.6905,172 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path706" />
<path
   class="st0"
   d="m 108.0905,186.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path708" />
<path
   class="st0"
   d="m 116.6905,186.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path710" />
<path
   class="st0"
   d="m 103.7905,179.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path712" />
<path
   class="st0"
   d="m 120.8905,179.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path714" />
<polygon
   class="st1"
   points="195.4,283.4 199.7,290.8 208.2,290.8 212.5,283.3 208.2,275.9 199.6,275.9 "
   id="polygon716"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 120.8905,179.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path718" />
<path
   class="st0"
   d="m 129.4905,179.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path720" />
<path
   class="st0"
   d="m 120.9905,194.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path722" />
<path
   class="st0"
   d="m 129.4905,194.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path724" />
<path
   class="st0"
   d="m 116.6905,186.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path726" />
<path
   class="st0"
   d="m 133.7905,186.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path728" />
<polygon
   class="st1"
   points="208.2,290.8 212.5,298.2 221,298.2 225.3,290.8 221,283.3 212.5,283.4 "
   id="polygon730"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 133.7905,186.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path732" />
<path
   class="st0"
   d="m 142.2905,186.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path734" />
<path
   class="st0"
   d="m 133.7905,201.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path736" />
<path
   class="st0"
   d="m 142.3905,201.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path738" />
<path
   class="st0"
   d="m 129.4905,194.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path740" />
<path
   class="st0"
   d="m 146.5905,194.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path742" />
<polygon
   class="st1"
   points="221.1,298.2 225.3,305.6 233.9,305.6 238.1,298.2 233.8,290.8 225.3,290.8 "
   id="polygon744"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 146.5905,194.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path746" />
<path
   class="st0"
   d="m 155.1905,194.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path748" />
<path
   class="st0"
   d="m 146.5905,209.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path750" />
<path
   class="st0"
   d="m 155.1905,209.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path752" />
<path
   class="st0"
   d="m 142.2905,201.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path754" />
<path
   class="st0"
   d="m 159.3905,201.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path756" />
<polygon
   class="st1"
   points="233.9,305.6 238.2,313.1 246.7,313.1 251,305.6 246.7,298.2 238.1,298.2 "
   id="polygon758"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 159.3905,201.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path760" />
<path
   class="st0"
   d="m 159.4905,216.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path762" />
<path
   class="st0"
   d="m 167.9905,216.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path764" />
<path
   class="st0"
   d="m 155.1905,209.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path766" />
<path
   class="st0"
   d="m 180.7905,209.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path768" />
<path
   class="st0"
   d="m 172.2905,224 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path770" />
<path
   class="st0"
   d="m 180.8905,224 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path772" />
<path
   class="st0"
   d="m 167.9905,216.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path774" />
<path
   class="st0"
   d="m 185.0905,216.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path776" />
<path
   class="st0"
   d="m 185.0905,216.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path778" />
<path
   class="st0"
   d="m 193.6905,216.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path780" />
<path
   class="st0"
   d="m 185.0905,231.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path782" />
<path
   class="st0"
   d="m 193.6905,231.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path784" />
<path
   class="st0"
   d="m 180.7905,224 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path786" />
<path
   class="st0"
   d="m 197.8905,224 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path788" />
<polygon
   class="st1"
   points="272.4,327.9 276.7,335.3 285.2,335.3 289.5,327.9 285.2,320.5 276.6,320.5 "
   id="polygon790"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 197.9905,224 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path792" />
<path
   class="st0"
   d="m 206.4905,224 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path794" />
<path
   class="st0"
   d="m 197.9905,238.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path796" />
<path
   class="st0"
   d="m 206.4905,238.8 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path798" />
<path
   class="st0"
   d="m 193.6905,231.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path800" />
<path
   class="st0"
   d="m 210.7905,231.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path802" />
<polygon
   class="st1"
   points="285.2,335.3 289.5,342.8 298,342.7 302.3,335.3 298,327.9 289.5,327.9 "
   id="polygon804"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 210.7905,231.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path806" />
<path
   class="st0"
   d="m 219.2905,231.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path808" />
<path
   class="st0"
   d="m 210.7905,246.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path810" />
<path
   class="st0"
   d="m 219.3905,246.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path812" />
<path
   class="st0"
   d="m 206.4905,238.9 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path814" />
<path
   class="st0"
   d="m 223.5905,238.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path816" />
<polygon
   class="st1"
   points="298.1,342.8 302.3,350.2 310.9,350.2 315.1,342.7 310.8,335.3 302.3,335.3 "
   id="polygon818"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 223.5905,238.8 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path820" />
<path
   class="st0"
   d="m 232.1905,238.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path822" />
<path
   class="st0"
   d="m 223.5905,253.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path824" />
<path
   class="st0"
   d="m 232.1905,253.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path826" />
<path
   class="st0"
   d="m 219.2905,246.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path828" />
<path
   class="st0"
   d="m 236.3905,246.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path830" />
<polygon
   class="st1"
   points="310.9,350.2 315.2,357.6 323.7,357.6 328,350.1 323.7,342.7 315.1,342.7 "
   id="polygon832"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 236.4905,246.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path834" />
<path
   class="st0"
   d="m 244.9905,246.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path836" />
<path
   class="st0"
   d="m 236.4905,261.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path838" />
<path
   class="st0"
   d="m 244.9905,261.1 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path840" />
<path
   class="st0"
   d="m 232.1905,253.7 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path842" />
<path
   class="st0"
   d="m 249.2905,253.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path844" />
<polygon
   class="st1"
   points="323.7,357.6 328,365 336.5,365 340.8,357.6 336.5,350.1 328,350.2 "
   id="polygon846"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 249.2905,253.7 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path848" />
<path
   class="st0"
   d="m 249.2905,268.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path850" />
<path
   class="st0"
   d="m 244.9905,261.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path852" />
<path
   class="st0"
   d="m 18.290503,135 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path854" />
<path
   class="st0"
   d="m 18.290503,134.9 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path856" />
<path
   class="st0"
   d="m 26.790503,134.9 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path858" />
<path
   class="st0"
   d="m 18.290503,149.8 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path860" />
<path
   class="st0"
   d="m 26.890503,149.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path862" />
<path
   class="st0"
   d="m 31.090503,142.4 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path864" />
<polygon
   class="st1"
   points="105.6,246.3 109.9,253.7 118.4,253.7 122.6,246.3 118.4,238.8 109.8,238.8 "
   id="polygon866"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 31.090503,142.4 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path868" />
<path
   class="st0"
   d="m 39.690503,142.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path870" />
<path
   class="st0"
   d="m 31.190503,157.2 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path872" />
<path
   class="st0"
   d="m 39.690503,157.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path874" />
<path
   class="st0"
   d="m 26.890503,149.8 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path876" />
<path
   class="st0"
   d="m 43.990503,149.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path878" />
<polygon
   class="st1"
   points="118.4,253.7 122.7,261.1 131.2,261.1 135.5,253.7 131.2,246.3 122.7,246.3 "
   id="polygon880"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 43.990503,149.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path882" />
<path
   class="st0"
   d="m 52.490503,149.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path884" />
<path
   class="st0"
   d="m 43.990503,164.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path886" />
<path
   class="st0"
   d="m 52.490503,164.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path888" />
<path
   class="st0"
   d="m 39.690503,157.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path890" />
<path
   class="st0"
   d="m 56.790503,157.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path892" />
<polygon
   class="st1"
   points="131.2,261.1 135.5,268.6 144.1,268.5 148.3,261.1 144,253.7 135.5,253.7 "
   id="polygon894"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 56.790503,157.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path896" />
<path
   class="st0"
   d="m 65.290503,157.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path898" />
<path
   class="st0"
   d="m 56.790503,172.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path900" />
<path
   class="st0"
   d="m 65.390503,172.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path902" />
<path
   class="st0"
   d="m 52.490503,164.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path904" />
<path
   class="st0"
   d="m 69.590503,164.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path906" />
<polygon
   class="st1"
   points="144.1,268.6 148.4,276 156.9,276 161.1,268.5 156.9,261.1 148.3,261.1 "
   id="polygon908"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 69.590503,164.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path910" />
<path
   class="st0"
   d="m 78.190503,164.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path912" />
<path
   class="st0"
   d="m 69.690503,179.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path914" />
<path
   class="st0"
   d="m 78.190503,179.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path916" />
<path
   class="st0"
   d="m 65.390503,172.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path918" />
<path
   class="st0"
   d="m 82.490503,172.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path920" />
<polygon
   class="st1"
   points="156.9,276 161.2,283.4 169.7,283.4 174,276 169.7,268.5 161.2,268.5 "
   id="polygon922"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 82.490503,172.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path924" />
<path
   class="st0"
   d="m 90.990503,172 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path926" />
<path
   class="st0"
   d="m 82.490503,186.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path928" />
<path
   class="st0"
   d="m 90.990503,186.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path930" />
<path
   class="st0"
   d="m 78.190503,179.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path932" />
<path
   class="st0"
   d="m 95.290503,179.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path934" />
<polygon
   class="st1"
   points="169.7,283.4 174,290.8 182.6,290.8 186.8,283.4 182.5,276 174,276 "
   id="polygon936"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 95.290503,179.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path938" />
<path
   class="st0"
   d="m 103.8905,179.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path940" />
<path
   class="st0"
   d="m 95.290503,194.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path942" />
<path
   class="st0"
   d="m 103.8905,194.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0.1 1,0.5 1,1"
   id="path944" />
<path
   class="st0"
   d="m 90.990503,186.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path946" />
<path
   class="st0"
   d="m 108.0905,186.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path948" />
<polygon
   class="st1"
   points="182.6,290.8 186.9,298.3 195.4,298.2 199.6,290.8 195.4,283.4 186.8,283.4 "
   id="polygon950"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 108.0905,186.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path952" />
<path
   class="st0"
   d="m 116.6905,186.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path954" />
<path
   class="st0"
   d="m 108.1905,201.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path956" />
<path
   class="st0"
   d="m 116.6905,201.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path958" />
<path
   class="st0"
   d="m 103.8905,194.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0.1 1,0.5 1,1"
   id="path960" />
<path
   class="st0"
   d="m 120.9905,194.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0.1 1,0.5 1,1"
   id="path962" />
<polygon
   class="st1"
   points="195.4,298.3 199.7,305.7 208.2,305.7 212.5,298.2 208.2,290.8 199.7,290.8 "
   id="polygon964"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 120.9905,194.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path966" />
<path
   class="st0"
   d="m 129.4905,194.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path968" />
<path
   class="st0"
   d="m 120.9905,209.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path970" />
<path
   class="st0"
   d="m 129.4905,209.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path972" />
<path
   class="st0"
   d="m 116.6905,201.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path974" />
<path
   class="st0"
   d="m 133.7905,201.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path976" />
<polygon
   class="st1"
   points="208.2,305.7 212.5,313.1 221.1,313.1 225.3,305.6 221,298.2 212.5,298.2 "
   id="polygon978"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 133.7905,201.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path980" />
<path
   class="st0"
   d="m 142.3905,201.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0.1 1,0.5 1,1"
   id="path982" />
<path
   class="st0"
   d="m 133.7905,216.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path984" />
<path
   class="st0"
   d="m 142.3905,216.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path986" />
<path
   class="st0"
   d="m 129.4905,209.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path988" />
<path
   class="st0"
   d="m 146.5905,209.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path990" />
<polygon
   class="st1"
   points="221.1,313.1 225.4,320.5 233.9,320.5 238.1,313.1 233.9,305.6 225.3,305.7 "
   id="polygon992"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 146.5905,209.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path994" />
<path
   class="st0"
   d="m 155.1905,209.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path996" />
<path
   class="st0"
   d="m 146.6905,224 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0.1 1,0.5 1,1"
   id="path998" />
<path
   class="st0"
   d="m 155.1905,224 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1000" />
<path
   class="st0"
   d="m 142.3905,216.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1002" />
<path
   class="st0"
   d="m 159.4905,216.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1004" />
<polygon
   class="st1"
   points="233.9,320.5 238.2,327.9 246.7,327.9 251,320.5 246.7,313.1 238.2,313.1 "
   id="polygon1006"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 159.4905,216.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1008" />
<path
   class="st0"
   d="m 167.9905,216.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1010" />
<path
   class="st0"
   d="m 159.4905,231.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1012" />
<path
   class="st0"
   d="m 168.0905,231.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 0.9,0.4 1,1"
   id="path1014" />
<path
   class="st0"
   d="m 155.1905,224 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path1016" />
<path
   class="st0"
   d="m 172.2905,224 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path1018" />
<polygon
   class="st1"
   points="246.7,327.9 251,335.4 259.6,335.4 263.8,327.9 259.5,320.5 251,320.5 "
   id="polygon1020"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 172.2905,224 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1022" />
<path
   class="st0"
   d="m 180.8905,224 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1024" />
<path
   class="st0"
   d="m 172.2905,238.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1026" />
<path
   class="st0"
   d="m 180.8905,238.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1028" />
<path
   class="st0"
   d="m 167.9905,231.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1030" />
<path
   class="st0"
   d="m 185.0905,231.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1032" />
<polygon
   class="st1"
   points="259.6,335.4 263.9,342.8 272.4,342.8 276.6,335.3 272.4,327.9 263.8,327.9 "
   id="polygon1034"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 185.0905,231.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path1036" />
<path
   class="st0"
   d="m 193.6905,231.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1038" />
<path
   class="st0"
   d="m 185.1905,246.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1040" />
<path
   class="st0"
   d="m 193.6905,246.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1042" />
<path
   class="st0"
   d="m 180.8905,238.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1044" />
<path
   class="st0"
   d="m 197.9905,238.9 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1046" />
<polygon
   class="st1"
   points="272.4,342.8 276.7,350.2 285.2,350.2 289.5,342.8 285.2,335.3 276.7,335.4 "
   id="polygon1048"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 197.9905,238.9 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1050" />
<path
   class="st0"
   d="m 206.4905,238.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1052" />
<path
   class="st0"
   d="m 197.9905,253.7 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path1054" />
<path
   class="st0"
   d="m 206.5905,253.7 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1056" />
<path
   class="st0"
   d="m 193.6905,246.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1058" />
<path
   class="st0"
   d="m 210.7905,246.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1060" />
<polygon
   class="st1"
   points="285.3,350.2 289.5,357.6 298.1,357.6 302.3,350.2 298,342.8 289.5,342.8 "
   id="polygon1062"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 210.7905,246.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1064" />
<path
   class="st0"
   d="m 219.3905,246.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1066" />
<path
   class="st0"
   d="m 210.7905,261.2 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1068" />
<path
   class="st0"
   d="m 219.3905,261.1 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0.1 1,0.5 1,1"
   id="path1070" />
<path
   class="st0"
   d="m 206.4905,253.7 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path1072" />
<path
   class="st0"
   d="m 223.5905,253.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1074" />
<polygon
   class="st1"
   points="298.1,357.6 302.4,365.1 310.9,365 315.2,357.6 310.9,350.2 302.3,350.2 "
   id="polygon1076"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 223.5905,253.7 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1078" />
<path
   class="st0"
   d="m 232.1905,253.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1080" />
<path
   class="st0"
   d="m 223.6905,268.6 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1082" />
<path
   class="st0"
   d="m 232.1905,268.6 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1084" />
<path
   class="st0"
   d="m 219.3905,261.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1086" />
<path
   class="st0"
   d="m 236.4905,261.2 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1088" />
<polygon
   class="st1"
   points="310.9,365.1 315.2,372.5 323.7,372.5 328,365 323.7,357.6 315.2,357.6 "
   id="polygon1090"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 236.4905,261.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0.1 1,0.5 1,1"
   id="path1092" />
<path
   class="st0"
   d="m 244.9905,261.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1094" />
<path
   class="st0"
   d="m 236.4905,276 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1096" />
<path
   class="st0"
   d="m 245.0905,276 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1098" />
<path
   class="st0"
   d="m 232.1905,268.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1100" />
<path
   class="st0"
   d="m 249.2905,268.6 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1102" />
<polygon
   class="st1"
   points="323.8,372.5 328,379.9 336.6,379.9 340.8,372.5 336.5,365 328,365 "
   id="polygon1104"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 249.2905,268.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1106" />
<path
   class="st0"
   d="m 249.2905,283.4 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1108" />
<path
   class="st0"
   d="m 244.9905,276 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1110" />
<path
   class="st0"
   d="m 18.290503,149.8 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1112" />
<path
   class="st0"
   d="m 18.290503,149.8 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1114" />
<path
   class="st0"
   d="m 26.890503,149.8 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1116" />
<path
   class="st0"
   d="m 18.390503,164.7 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1118" />
<path
   class="st0"
   d="m 26.890503,164.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1120" />
<path
   class="st0"
   d="m 31.190503,157.3 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1122" />
<polygon
   class="st1"
   points="105.6,261.2 109.9,268.6 118.4,268.6 122.7,261.1 118.4,253.7 109.9,253.7 "
   id="polygon1124"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 31.190503,157.2 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0.1 1,0.5 1,1"
   id="path1126" />
<path
   class="st0"
   d="m 39.690503,157.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1128" />
<path
   class="st0"
   d="m 31.190503,172.1 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1130" />
<path
   class="st0"
   d="m 39.790503,172.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1132" />
<path
   class="st0"
   d="m 26.890503,164.7 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1134" />
<path
   class="st0"
   d="m 43.990503,164.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1136" />
<polygon
   class="st1"
   points="118.5,268.6 122.7,276 131.3,276 135.5,268.6 131.2,261.1 122.7,261.1 "
   id="polygon1138"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 43.990503,164.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1140" />
<path
   class="st0"
   d="m 52.590503,164.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1142" />
<path
   class="st0"
   d="m 43.990503,179.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1144" />
<path
   class="st0"
   d="m 52.590503,179.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1146" />
<path
   class="st0"
   d="m 39.690503,172.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1148" />
<path
   class="st0"
   d="m 56.790503,172.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1150" />
<polygon
   class="st1"
   points="131.3,276 135.6,283.4 144.1,283.4 148.4,276 144.1,268.6 135.5,268.6 "
   id="polygon1152"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 56.790503,172.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1154" />
<path
   class="st0"
   d="m 65.390503,172.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1156" />
<path
   class="st0"
   d="m 56.890503,187 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1158" />
<path
   class="st0"
   d="m 65.390503,186.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path1160" />
<path
   class="st0"
   d="m 52.590503,179.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1162" />
<path
   class="st0"
   d="m 69.690503,179.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1164" />
<polygon
   class="st1"
   points="144.1,283.4 148.4,290.9 156.9,290.8 161.2,283.4 156.9,276 148.4,276 "
   id="polygon1166"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 69.690503,179.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1168" />
<path
   class="st0"
   d="m 78.190503,179.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1170" />
<path
   class="st0"
   d="m 69.690503,194.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1172" />
<path
   class="st0"
   d="m 78.290503,194.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1174" />
<path
   class="st0"
   d="m 65.390503,187 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1176" />
<path
   class="st0"
   d="m 82.490503,186.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path1178" />
<polygon
   class="st1"
   points="157,290.9 161.2,298.3 169.8,298.3 174,290.8 169.7,283.4 161.2,283.4 "
   id="polygon1180"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 82.490503,186.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path1182" />
<path
   class="st0"
   d="m 91.090503,186.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1184" />
<path
   class="st0"
   d="m 82.490503,201.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1186" />
<path
   class="st0"
   d="m 91.090503,201.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1188" />
<path
   class="st0"
   d="m 78.190503,194.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1190" />
<path
   class="st0"
   d="m 95.290503,194.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1192" />
<polygon
   class="st1"
   points="169.8,298.3 174.1,305.7 182.6,305.7 186.9,298.3 182.6,290.8 174,290.8 "
   id="polygon1194"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 95.290503,194.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1196" />
<path
   class="st0"
   d="m 103.8905,194.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path1198" />
<path
   class="st0"
   d="m 95.390503,209.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1200" />
<path
   class="st0"
   d="m 103.8905,209.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1202" />
<path
   class="st0"
   d="m 91.090503,201.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1204" />
<path
   class="st0"
   d="m 108.1905,201.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1206" />
<polygon
   class="st1"
   points="182.6,305.7 186.9,313.1 195.4,313.1 199.7,305.7 195.4,298.2 186.9,298.3 "
   id="polygon1208"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 108.1905,201.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1210" />
<path
   class="st0"
   d="m 116.6905,201.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1212" />
<path
   class="st0"
   d="m 108.1905,216.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path1214" />
<path
   class="st0"
   d="m 116.7905,216.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1216" />
<path
   class="st0"
   d="m 103.8905,209.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1218" />
<path
   class="st0"
   d="m 120.9905,209.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1220" />
<polygon
   class="st1"
   points="195.5,313.1 199.7,320.6 208.3,320.5 212.5,313.1 208.2,305.7 199.7,305.7 "
   id="polygon1222"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 120.9905,209.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1224" />
<path
   class="st0"
   d="m 129.5905,209.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1226" />
<path
   class="st0"
   d="m 120.9905,224.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1228" />
<path
   class="st0"
   d="m 129.5905,224.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1230" />
<path
   class="st0"
   d="m 116.6905,216.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path1232" />
<path
   class="st0"
   d="m 133.7905,216.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path1234" />
<polygon
   class="st1"
   points="208.3,320.6 212.6,328 221.1,328 225.4,320.5 221.1,313.1 212.5,313.1 "
   id="polygon1236"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 133.8905,216.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 0.9,0.5 1,1"
   id="path1238" />
<path
   class="st0"
   d="m 142.3905,216.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1240" />
<path
   class="st0"
   d="m 133.8905,231.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1242" />
<path
   class="st0"
   d="m 142.3905,231.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1244" />
<path
   class="st0"
   d="m 129.5905,224.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1246" />
<path
   class="st0"
   d="m 146.6905,224.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1248" />
<polygon
   class="st1"
   points="221.1,328 225.4,335.4 233.9,335.4 238.2,327.9 233.9,320.5 225.4,320.5 "
   id="polygon1250"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 146.6905,224.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1252" />
<path
   class="st0"
   d="m 155.1905,224 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path1254" />
<path
   class="st0"
   d="m 146.6905,238.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1256" />
<path
   class="st0"
   d="m 155.2905,238.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1258" />
<path
   class="st0"
   d="m 142.3905,231.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1260" />
<path
   class="st0"
   d="m 159.4905,231.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1262" />
<polygon
   class="st1"
   points="234,335.4 238.2,342.8 246.8,342.8 251,335.4 246.7,327.9 238.2,328 "
   id="polygon1264"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 159.4905,231.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1266" />
<path
   class="st0"
   d="m 168.0905,231.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1268" />
<path
   class="st0"
   d="m 159.4905,246.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path1270" />
<path
   class="st0"
   d="m 168.0905,246.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1272" />
<path
   class="st0"
   d="m 155.1905,238.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1274" />
<path
   class="st0"
   d="m 172.2905,238.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1276" />
<polygon
   class="st1"
   points="246.8,342.8 251.1,350.2 259.6,350.2 263.9,342.8 259.6,335.4 251,335.4 "
   id="polygon1278"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 172.3905,238.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1280" />
<path
   class="st0"
   d="m 180.8905,238.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1282" />
<path
   class="st0"
   d="m 172.3905,253.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1284" />
<path
   class="st0"
   d="m 180.8905,253.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path1286" />
<path
   class="st0"
   d="m 168.0905,246.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0.1 1,0.5 1,1"
   id="path1288" />
<path
   class="st0"
   d="m 185.1905,246.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0.1 1,0.5 1,1"
   id="path1290" />
<polygon
   class="st1"
   points="259.6,350.2 263.9,357.7 272.4,357.7 276.7,350.2 272.4,342.8 263.9,342.8 "
   id="polygon1292"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 185.1905,246.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1294" />
<path
   class="st0"
   d="m 193.6905,246.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1296" />
<path
   class="st0"
   d="m 185.1905,261.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1298" />
<path
   class="st0"
   d="m 193.7905,261.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1300" />
<path
   class="st0"
   d="m 180.8905,253.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1302" />
<path
   class="st0"
   d="m 197.9905,253.8 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1304" />
<polygon
   class="st1"
   points="272.5,357.7 276.7,365.1 285.3,365.1 289.5,357.6 285.2,350.2 276.7,350.2 "
   id="polygon1306"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 197.9905,253.7 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path1308" />
<path
   class="st0"
   d="m 206.5905,253.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1310" />
<path
   class="st0"
   d="m 197.9905,268.6 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1312" />
<path
   class="st0"
   d="m 206.5905,268.6 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1314" />
<path
   class="st0"
   d="m 193.6905,261.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1316" />
<path
   class="st0"
   d="m 210.7905,261.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1318" />
<polygon
   class="st1"
   points="285.3,365.1 289.6,372.5 298.1,372.5 302.4,365.1 298.1,357.6 289.6,357.7 "
   id="polygon1320"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 210.8905,261.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1322" />
<path
   class="st0"
   d="m 219.3905,261.2 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1324" />
<path
   class="st0"
   d="m 210.8905,276 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0.1 1,0.5 1,1"
   id="path1326" />
<path
   class="st0"
   d="m 219.3905,276 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1328" />
<path
   class="st0"
   d="m 206.5905,268.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1330" />
<path
   class="st0"
   d="m 223.6905,268.6 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1332" />
<polygon
   class="st1"
   points="298.1,372.5 302.4,379.9 310.9,379.9 315.2,372.5 310.9,365.1 302.4,365.1 "
   id="polygon1334"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 223.6905,268.6 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1336" />
<path
   class="st0"
   d="m 232.1905,268.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1338" />
<path
   class="st0"
   d="m 223.6905,283.5 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1340" />
<path
   class="st0"
   d="m 232.2905,283.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0.1 1,0.5 1,1"
   id="path1342" />
<path
   class="st0"
   d="m 219.3905,276 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1344" />
<path
   class="st0"
   d="m 236.4905,276 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1346" />
<polygon
   class="st1"
   points="311,379.9 315.2,387.4 323.8,387.3 328,379.9 323.8,372.5 315.2,372.5 "
   id="polygon1348"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 236.4905,276 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1350" />
<path
   class="st0"
   d="m 245.0905,276 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1352" />
<path
   class="st0"
   d="m 236.5905,290.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1354" />
<path
   class="st0"
   d="m 245.0905,290.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1356" />
<path
   class="st0"
   d="m 232.2905,283.5 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 0.9,0.4 1,1"
   id="path1358" />
<path
   class="st0"
   d="m 249.3905,283.5 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 0.9,0.4 1,1"
   id="path1360" />
<polygon
   class="st1"
   points="323.8,387.4 328.1,394.8 336.6,394.8 340.9,387.3 336.6,379.9 328.1,379.9 "
   id="polygon1362"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 249.3905,283.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0.1 1,0.5 1,1"
   id="path1364" />
<path
   class="st0"
   d="m 249.3905,298.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1366" />
<path
   class="st0"
   d="m 245.0905,290.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1368" />
<path
   class="st0"
   d="m 18.390503,164.7 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1370" />
<polygon
   class="st1"
   points="92.8,268.6 97.1,276.1 105.6,276 109.9,268.6 105.6,261.2 97.1,261.2 "
   id="polygon1372"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 18.390503,164.7 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1374" />
<path
   class="st0"
   d="m 26.890503,164.7 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1376" />
<path
   class="st0"
   d="m 18.390503,179.6 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1378" />
<path
   class="st0"
   d="m 26.890503,179.6 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1380" />
<path
   class="st0"
   d="m 31.190503,172.1 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path1382" />
<polygon
   class="st1"
   points="105.6,276 109.9,283.5 118.5,283.5 122.7,276 118.4,268.6 109.9,268.6 "
   id="polygon1384"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 31.190503,172.1 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1386" />
<path
   class="st0"
   d="m 39.790503,172.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1388" />
<path
   class="st0"
   d="m 31.190503,187 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1390" />
<path
   class="st0"
   d="m 39.790503,187 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1392" />
<path
   class="st0"
   d="m 26.890503,179.6 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1394" />
<path
   class="st0"
   d="m 43.990503,179.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1396" />
<polygon
   class="st1"
   points="118.5,283.5 122.8,290.9 131.3,290.9 135.5,283.4 131.3,276 122.7,276 "
   id="polygon1398"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 43.990503,179.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path1400" />
<path
   class="st0"
   d="m 52.590503,179.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0.1 1,0.5 1,1"
   id="path1402" />
<path
   class="st0"
   d="m 44.090503,194.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1404" />
<path
   class="st0"
   d="m 39.790503,187 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1406" />
<path
   class="st0"
   d="m 56.890503,187 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1408" />
<path
   class="st0"
   d="m 56.890503,187 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1410" />
<path
   class="st0"
   d="m 65.390503,187 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1412" />
<path
   class="st0"
   d="m 56.890503,201.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path1414" />
<path
   class="st0"
   d="m 65.390503,201.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1416" />
<path
   class="st0"
   d="m 69.690503,194.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1418" />
<path
   class="st0"
   d="m 69.690503,194.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1420" />
<path
   class="st0"
   d="m 78.290503,194.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1422" />
<path
   class="st0"
   d="m 69.690503,209.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1424" />
<path
   class="st0"
   d="m 78.290503,209.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0.1 1,0.5 1,1"
   id="path1426" />
<path
   class="st0"
   d="m 65.390503,201.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path1428" />
<path
   class="st0"
   d="m 82.490503,201.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1430" />
<polygon
   class="st1"
   points="157,305.7 161.3,313.2 169.8,313.2 174,305.7 169.8,298.3 161.2,298.3 "
   id="polygon1432"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 82.490503,201.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1434" />
<path
   class="st0"
   d="m 91.090503,201.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1436" />
<path
   class="st0"
   d="m 82.590503,216.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1438" />
<path
   class="st0"
   d="m 91.090503,216.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1440" />
<path
   class="st0"
   d="m 78.290503,209.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1442" />
<path
   class="st0"
   d="m 95.390503,209.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1444" />
<polygon
   class="st1"
   points="169.8,313.2 174.1,320.6 182.6,320.6 186.9,313.1 182.6,305.7 174.1,305.7 "
   id="polygon1446"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 95.390503,209.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0.1 1,0.5 1,1"
   id="path1448" />
<path
   class="st0"
   d="m 103.8905,209.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1450" />
<path
   class="st0"
   d="m 95.390503,224.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1452" />
<path
   class="st0"
   d="m 103.8905,224.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1454" />
<path
   class="st0"
   d="m 91.090503,216.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1456" />
<path
   class="st0"
   d="m 108.1905,216.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1458" />
<polygon
   class="st1"
   points="182.6,320.6 186.9,328 195.5,328 199.7,320.6 195.4,313.1 186.9,313.1 "
   id="polygon1460"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 108.1905,216.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1462" />
<path
   class="st0"
   d="m 116.7905,216.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1464" />
<path
   class="st0"
   d="m 108.1905,231.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1466" />
<path
   class="st0"
   d="m 116.7905,231.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1468" />
<path
   class="st0"
   d="m 103.8905,224.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1470" />
<path
   class="st0"
   d="m 120.9905,224.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1472" />
<polygon
   class="st1"
   points="195.5,328 199.8,335.4 208.3,335.4 212.5,328 208.3,320.6 199.7,320.6 "
   id="polygon1474"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 120.9905,224.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1476" />
<path
   class="st0"
   d="m 129.5905,224.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1478" />
<path
   class="st0"
   d="m 121.0905,239 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1480" />
<path
   class="st0"
   d="m 129.5905,238.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path1482" />
<path
   class="st0"
   d="m 116.7905,231.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1484" />
<path
   class="st0"
   d="m 133.8905,231.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1486" />
<polygon
   class="st1"
   points="208.3,335.4 212.6,342.9 221.1,342.8 225.4,335.4 221.1,328 212.6,328 "
   id="polygon1488"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 133.8905,231.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1490" />
<path
   class="st0"
   d="m 142.3905,231.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1492" />
<path
   class="st0"
   d="m 133.8905,246.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1494" />
<path
   class="st0"
   d="m 142.4905,246.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1496" />
<path
   class="st0"
   d="m 129.5905,239 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1498" />
<path
   class="st0"
   d="m 146.6905,238.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path1500" />
<polygon
   class="st1"
   points="221.1,342.9 225.4,350.3 234,350.3 238.2,342.8 233.9,335.4 225.4,335.4 "
   id="polygon1502"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 146.6905,238.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path1504" />
<path
   class="st0"
   d="m 155.2905,238.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1506" />
<path
   class="st0"
   d="m 146.6905,253.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1508" />
<path
   class="st0"
   d="m 155.2905,253.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1510" />
<path
   class="st0"
   d="m 142.3905,246.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1512" />
<path
   class="st0"
   d="m 159.4905,246.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1514" />
<polygon
   class="st1"
   points="234,350.3 238.3,357.7 246.8,357.7 251,350.2 246.8,342.8 238.2,342.8 "
   id="polygon1516"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 159.4905,246.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1518" />
<path
   class="st0"
   d="m 168.0905,246.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path1520" />
<path
   class="st0"
   d="m 159.5905,261.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1522" />
<path
   class="st0"
   d="m 168.0905,261.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1524" />
<path
   class="st0"
   d="m 155.2905,253.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1526" />
<path
   class="st0"
   d="m 172.3905,253.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1528" />
<polygon
   class="st1"
   points="246.8,357.7 251.1,365.1 259.6,365.1 263.9,357.7 259.6,350.2 251.1,350.3 "
   id="polygon1530"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 172.3905,253.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1532" />
<path
   class="st0"
   d="m 180.8905,253.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1534" />
<path
   class="st0"
   d="m 172.3905,268.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path1536" />
<path
   class="st0"
   d="m 180.9905,268.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1538" />
<path
   class="st0"
   d="m 168.0905,261.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1540" />
<path
   class="st0"
   d="m 185.1905,261.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1542" />
<polygon
   class="st1"
   points="259.7,365.1 263.9,372.6 272.5,372.5 276.7,365.1 272.4,357.7 263.9,357.7 "
   id="polygon1544"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 185.1905,261.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1546" />
<path
   class="st0"
   d="m 193.7905,261.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1548" />
<path
   class="st0"
   d="m 185.1905,276.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1550" />
<path
   class="st0"
   d="m 193.7905,276.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1552" />
<path
   class="st0"
   d="m 180.8905,268.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path1554" />
<path
   class="st0"
   d="m 197.9905,268.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path1556" />
<polygon
   class="st1"
   points="272.5,372.6 276.8,380 285.3,380 289.6,372.5 285.3,365.1 276.7,365.1 "
   id="polygon1558"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 197.9905,268.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1560" />
<path
   class="st0"
   d="m 206.5905,268.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1562" />
<path
   class="st0"
   d="m 198.0905,283.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1564" />
<path
   class="st0"
   d="m 206.5905,283.5 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1566" />
<path
   class="st0"
   d="m 193.7905,276.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1568" />
<path
   class="st0"
   d="m 210.8905,276.1 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1570" />
<polygon
   class="st1"
   points="285.3,380 289.6,387.4 298.1,387.4 302.4,379.9 298.1,372.5 289.6,372.5 "
   id="polygon1572"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 210.8905,276.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1574" />
<path
   class="st0"
   d="m 219.3905,276 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path1576" />
<path
   class="st0"
   d="m 210.8905,290.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1578" />
<path
   class="st0"
   d="m 219.4905,290.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1580" />
<path
   class="st0"
   d="m 206.5905,283.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1582" />
<path
   class="st0"
   d="m 223.6905,283.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1584" />
<polygon
   class="st1"
   points="298.2,387.4 302.4,394.8 311,394.8 315.2,387.4 310.9,379.9 302.4,380 "
   id="polygon1586"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 223.6905,283.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1588" />
<path
   class="st0"
   d="m 232.2905,283.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1590" />
<path
   class="st0"
   d="m 232.2905,298.3 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1592" />
<path
   class="st0"
   d="m 219.3905,290.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1594" />
<path
   class="st0"
   d="m 236.4905,290.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1596" />
<path
   class="st0"
   d="m 236.4905,290.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1598" />
<path
   class="st0"
   d="m 245.0905,290.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1600" />
<path
   class="st0"
   d="m 236.5905,305.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1602" />
<path
   class="st0"
   d="m 245.0905,305.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path1604" />
<path
   class="st0"
   d="m 232.2905,298.3 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0.1 1,0.5 1,1"
   id="path1606" />
<path
   class="st0"
   d="m 249.3905,298.3 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0.1 1,0.5 1,1"
   id="path1608" />
<polygon
   class="st1"
   points="323.8,402.2 328.1,409.7 336.6,409.7 340.9,402.2 336.6,394.8 328.1,394.8 "
   id="polygon1610"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 249.3905,298.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1612" />
<path
   class="st0"
   d="m 249.3905,313.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1614" />
<path
   class="st0"
   d="m 245.0905,305.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1616" />
<path
   class="st0"
   d="m 18.390503,179.6 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1618" />
<polygon
   class="st1"
   points="92.9,283.5 97.1,290.9 105.7,290.9 109.9,283.5 105.6,276 97.1,276.1 "
   id="polygon1620"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 56.990503,216.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1622" />
<path
   class="st0"
   d="m 52.690503,209.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1624" />
<path
   class="st0"
   d="m 44.190503,209.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1626" />
<path
   class="st0"
   d="m 52.690503,209.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1628" />
<path
   class="st0"
   d="m 44.190503,224.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1630" />
<path
   class="st0"
   d="m 52.690503,224.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1632" />
<path
   class="st0"
   d="m 39.890503,216.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1634" />
<path
   class="st0"
   d="m 56.990503,216.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0.1 1,0.5 1,1"
   id="path1636" />
<polygon
   class="st1"
   points="131.4,320.6 135.7,328 144.2,328 148.5,320.5 144.2,313.1 135.7,313.1 "
   id="polygon1638"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 56.990503,216.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path1640" />
<path
   class="st0"
   d="m 56.990503,231.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1642" />
<path
   class="st0"
   d="m 52.690503,224.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1644" />
<polygon
   class="st1"
   points="144.3,328 148.5,335.4 157.1,335.4 161.3,327.9 157.1,320.5 148.5,320.5 "
   id="polygon1646"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 44.190503,224.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1648" />
<path
   class="st0"
   d="m 52.790503,224.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1650" />
<path
   class="st0"
   d="m 44.190503,239 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1652" />
<path
   class="st0"
   d="m 52.790503,238.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0.1 1,0.5 1,1"
   id="path1654" />
<path
   class="st0"
   d="m 39.890503,231.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1656" />
<path
   class="st0"
   d="m 56.990503,231.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1658" />
<polygon
   class="st1"
   points="131.5,335.4 135.8,342.9 144.3,342.8 148.5,335.4 144.3,328 135.7,328 "
   id="polygon1660"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 56.990503,231.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1662" />
<path
   class="st0"
   d="m 57.090503,246.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1664" />
<path
   class="st0"
   d="m 52.790503,239 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1666" />
<polygon
   class="st1"
   points="144.3,342.9 148.6,350.3 157.1,350.3 161.4,342.8 157.1,335.4 148.6,335.4 "
   id="polygon1668"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 18.390503,179.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1670" />
<path
   class="st0"
   d="m 26.990503,179.6 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1672" />
<path
   class="st0"
   d="m 18.390503,194.4 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1674" />
<path
   class="st0"
   d="m 26.990503,194.4 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1676" />
<path
   class="st0"
   d="m 31.190503,187 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1678" />
<polygon
   class="st1"
   points="105.7,290.9 110,298.3 118.5,298.3 122.8,290.9 118.5,283.5 109.9,283.5 "
   id="polygon1680"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 31.190503,187 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1682" />
<path
   class="st0"
   d="m 39.790503,187 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1684" />
<path
   class="st0"
   d="m 31.290503,201.9 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1686" />
<path
   class="st0"
   d="m 39.790503,201.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1688" />
<path
   class="st0"
   d="m 26.990503,194.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1690" />
<path
   class="st0"
   d="m 44.090503,194.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0.1 1,0.5 1,1"
   id="path1692" />
<polygon
   class="st1"
   points="118.5,298.3 122.8,305.8 131.3,305.8 135.6,298.3 131.3,290.9 122.8,290.9 "
   id="polygon1694"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 44.090503,194.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1696" />
<path
   class="st0"
   d="m 52.690503,209.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1698" />
<path
   class="st0"
   d="m 39.790503,201.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1700" />
<path
   class="st0"
   d="m 56.890503,201.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1702" />
<path
   class="st0"
   d="m 56.890503,201.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path1704" />
<path
   class="st0"
   d="m 65.490503,201.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0.1 1,0.5 1,1"
   id="path1706" />
<path
   class="st0"
   d="m 56.890503,216.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1708" />
<path
   class="st0"
   d="m 65.490503,216.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1710" />
<path
   class="st0"
   d="m 52.590503,209.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1712" />
<path
   class="st0"
   d="m 69.690503,209.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1714" />
<polygon
   class="st1"
   points="144.2,313.2 148.5,320.6 157,320.6 161.3,313.2 157,305.7 148.4,305.8 "
   id="polygon1716"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 69.690503,209.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1718" />
<path
   class="st0"
   d="m 78.290503,209.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1720" />
<path
   class="st0"
   d="m 69.790503,224.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0.1 1,0.5 1,1"
   id="path1722" />
<path
   class="st0"
   d="m 69.790503,238.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1724" />
<path
   class="st0"
   d="m 78.290503,224.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1726" />
<path
   class="st0"
   d="m 65.490503,216.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1728" />
<path
   class="st0"
   d="m 65.490503,231.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1730" />
<path
   class="st0"
   d="m 65.490503,246.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1732" />
<path
   class="st0"
   d="m 82.590503,216.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1734" />
<polygon
   class="st1"
   points="157,320.6 161.3,328 169.8,328 174.1,320.6 169.8,313.2 161.3,313.2 "
   id="polygon1736"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 82.590503,216.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1738" />
<path
   class="st0"
   d="m 91.090503,216.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1740" />
<path
   class="st0"
   d="m 82.590503,231.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1742" />
<path
   class="st0"
   d="m 91.190503,231.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0.1 1,0.5 1,1"
   id="path1744" />
<path
   class="st0"
   d="m 78.290503,224.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path1746" />
<path
   class="st0"
   d="m 95.390503,224.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1748" />
<polygon
   class="st1"
   points="169.9,328 174.1,335.5 182.7,335.5 186.9,328 182.6,320.6 174.1,320.6 "
   id="polygon1750"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 95.390503,224.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1752" />
<path
   class="st0"
   d="m 103.9905,224.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1754" />
<path
   class="st0"
   d="m 95.390503,239 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1756" />
<path
   class="st0"
   d="m 103.9905,239 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1758" />
<path
   class="st0"
   d="m 91.090503,231.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1760" />
<path
   class="st0"
   d="m 108.1905,231.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1762" />
<polygon
   class="st1"
   points="182.7,335.5 187,342.9 195.5,342.9 199.8,335.4 195.5,328 186.9,328 "
   id="polygon1764"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 108.2905,261.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path1766" />
<polygon
   class="st1"
   points="195.6,357.8 199.9,365.2 208.4,365.2 212.7,357.8 208.4,350.4 199.8,350.4 "
   id="polygon1768"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 82.690503,261.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1770" />
<path
   class="st0"
   d="m 91.290503,261.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1772" />
<polygon
   class="st1"
   points="170,357.8 174.2,365.3 182.8,365.3 187,357.8 182.7,350.4 174.2,350.4 "
   id="polygon1774"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 95.490503,268.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1776" />
<path
   class="st0"
   d="m 104.0905,268.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1778" />
<path
   class="st0"
   d="m 91.190503,261.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1780" />
<path
   class="st0"
   d="m 82.690503,246.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1782" />
<path
   class="st0"
   d="m 91.190503,246.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1784" />
<path
   class="st0"
   d="m 108.2905,261.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1786" />
<polygon
   class="st1"
   points="182.8,365.3 187.1,372.7 195.6,372.7 199.9,365.2 195.6,357.8 187.1,357.8 "
   id="polygon1788"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 108.3905,261.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1790" />
<path
   class="st0"
   d="m 91.190503,276 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1792" />
<path
   class="st0"
   d="m 108.3905,276 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1794" />
<path
   class="st0"
   d="m 104.0905,268.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1796" />
<path
   class="st0"
   d="m 95.490503,283.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1798" />
<path
   class="st0"
   d="m 104.0905,283.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1800" />
<polygon
   class="st1"
   points="182.8,380.1 187.1,387.5 195.6,387.5 199.9,380.1 195.6,372.6 187.1,372.6 "
   id="polygon1802"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 104.0905,283.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1804" />
<path
   class="st0"
   d="m 108.2905,231.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0.1 1,0.5 1,1"
   id="path1806" />
<path
   class="st0"
   d="m 116.7905,231.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1808" />
<path
   class="st0"
   d="m 108.2905,246.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1810" />
<path
   class="st0"
   d="m 116.7905,246.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1812" />
<path
   class="st0"
   d="m 103.9905,239 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1814" />
<path
   class="st0"
   d="m 121.0905,239 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1816" />
<polygon
   class="st1"
   points="195.5,342.9 199.8,350.3 208.3,350.3 212.6,342.9 208.3,335.4 199.8,335.4 "
   id="polygon1818"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 121.0905,239 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1820" />
<path
   class="st0"
   d="m 129.5905,238.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path1822" />
<path
   class="st0"
   d="m 121.0905,253.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1824" />
<path
   class="st0"
   d="m 129.6905,253.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1826" />
<path
   class="st0"
   d="m 116.7905,246.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1828" />
<path
   class="st0"
   d="m 133.8905,246.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1830" />
<polygon
   class="st1"
   points="208.4,350.3 212.6,357.7 221.2,357.7 225.4,350.3 221.1,342.9 212.6,342.9 "
   id="polygon1832"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 133.8905,246.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1834" />
<path
   class="st0"
   d="m 116.7905,261.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1836" />
<path
   class="st0"
   d="m 133.8905,261.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1838" />
<path
   class="st0"
   d="m 142.4905,246.4 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1840" />
<path
   class="st0"
   d="m 142.4905,261.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path1842" />
<path
   class="st0"
   d="m 129.5905,253.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1844" />
<path
   class="st0"
   d="m 95.590503,253.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1846" />
<path
   class="st0"
   d="m 78.390503,253.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1848" />
<path
   class="st0"
   d="m 104.1905,253.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1850" />
<path
   class="st0"
   d="m 146.6905,253.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1852" />
<polygon
   class="st1"
   points="221.2,357.7 225.5,365.2 234,365.1 238.3,357.7 234,350.3 225.4,350.3 "
   id="polygon1854"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 146.7905,253.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1856" />
<path
   class="st0"
   d="m 155.2905,253.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1858" />
<path
   class="st0"
   d="m 155.2905,268.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1860" />
<path
   class="st0"
   d="m 142.4905,261.3 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1862" />
<path
   class="st0"
   d="m 159.5905,261.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0.1 1,0.5 1,1"
   id="path1864" />
<path
   class="st0"
   d="m 159.5905,261.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0.1 1,0.5 1,1"
   id="path1866" />
<path
   class="st0"
   d="m 168.0905,261.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1868" />
<path
   class="st0"
   d="m 159.5905,276.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1870" />
<path
   class="st0"
   d="m 168.1905,276.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1872" />
<path
   class="st0"
   d="m 155.2905,268.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1874" />
<path
   class="st0"
   d="m 172.3905,268.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1876" />
<polygon
   class="st1"
   points="246.9,372.6 251.1,380 259.7,380 263.9,372.5 259.6,365.1 251.1,365.1 "
   id="polygon1878"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 172.3905,268.7 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1880" />
<path
   class="st0"
   d="m 180.9905,268.6 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0.1 1,0.5 1,1"
   id="path1882" />
<path
   class="st0"
   d="m 172.3905,283.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1884" />
<path
   class="st0"
   d="m 180.9905,283.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1886" />
<path
   class="st0"
   d="m 168.0905,276.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1888" />
<path
   class="st0"
   d="m 185.1905,276.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1890" />
<polygon
   class="st1"
   points="259.7,380 264,387.4 272.5,387.4 276.8,380 272.5,372.5 264,372.6 "
   id="polygon1892"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 185.2905,276.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1894" />
<path
   class="st0"
   d="m 193.7905,276.1 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1896" />
<path
   class="st0"
   d="m 185.2905,290.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0.1 1,0.5 1,1"
   id="path1898" />
<path
   class="st0"
   d="m 193.7905,290.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1900" />
<path
   class="st0"
   d="m 180.9905,283.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1902" />
<path
   class="st0"
   d="m 198.0905,283.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1904" />
<polygon
   class="st1"
   points="272.5,387.4 276.8,394.9 285.3,394.8 289.6,387.4 285.3,380 276.8,380 "
   id="polygon1906"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 198.0905,283.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1908" />
<path
   class="st0"
   d="m 206.5905,283.5 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1910" />
<path
   class="st0"
   d="m 193.7905,290.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path1912" />
<path
   class="st0"
   d="m 210.8905,290.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path1914" />
<path
   class="st0"
   d="m 210.8905,290.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1916" />
<path
   class="st0"
   d="m 219.4905,290.9 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.5,0 1,0.5 1,1"
   id="path1918" />
<path
   class="st0"
   d="m 232.2905,298.3 c 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0.1 1,0.5 1,1"
   id="path1920" />
<path
   class="st0"
   d="m 232.2905,313.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1922" />
<path
   class="st0"
   d="m 236.5905,305.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1"
   id="path1924" />
<path
   class="st0"
   d="m 236.5905,305.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1926" />
<path
   class="st0"
   d="m 245.0905,305.8 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.4 1,1"
   id="path1928" />
<path
   class="st0"
   d="m 232.2905,313.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1930" />
<path
   class="st0"
   d="m 249.3905,313.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.6 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1932" />
<polygon
   class="st1"
   points="323.9,417.1 328.1,424.5 336.7,424.5 340.9,417.1 336.7,409.7 328.1,409.7 "
   id="polygon1934"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 249.3905,313.2 c 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.5 1,1"
   id="path1936" />
<path
   class="st0"
   d="m 140.3905,112.5 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path1938" />
<path
   class="st0"
   d="m 131.8905,112.5 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path1940" />
<polygon
   class="st1"
   points="238.2,223.8 233.9,216.4 225.4,216.4 221.1,223.8 225.4,231.3 233.9,231.3 "
   id="polygon1942"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 127.5905,105.1 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path1944" />
<path
   class="st0"
   d="m 118.9905,105.1 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path1946" />
<path
   class="st0"
   d="m 131.8905,112.5 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path1948" />
<path
   class="st0"
   d="m 114.7905,112.5 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path1950" />
<polygon
   class="st1"
   points="225.3,216.4 221.1,209 212.5,209 208.3,216.4 212.5,223.8 221.1,223.8 "
   id="polygon1952"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 114.7905,112.5 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path1954" />
<path
   class="st0"
   d="m 114.6905,97.6 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path1956" />
<path
   class="st0"
   d="m 118.9905,105.1 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path1958" />
<path
   class="st0"
   d="m 165.9905,112.5 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,-0.1 -1,-0.5 -1,-1"
   id="path1960" />
<path
   class="st0"
   d="m 157.4905,112.5 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path1962" />
<path
   class="st0"
   d="m 153.1905,105 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path1964" />
<path
   class="st0"
   d="m 144.6905,105.1 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,-0.1 -1,-0.5 -1,-1"
   id="path1966" />
<path
   class="st0"
   d="m 157.4905,112.5 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,-0.1 -1,-0.5 -1,-1"
   id="path1968" />
<path
   class="st0"
   d="m 140.3905,112.5 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path1970" />
<polygon
   class="st1"
   points="251,216.4 246.7,208.9 238.1,208.9 233.9,216.4 238.2,223.8 246.7,223.8 "
   id="polygon1972"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 140.3905,112.5 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path1974" />
<path
   class="st0"
   d="m 131.7905,112.5 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path1976" />
<path
   class="st0"
   d="m 140.3905,97.6 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path1978" />
<path
   class="st0"
   d="m 131.7905,97.6 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path1980" />
<path
   class="st0"
   d="m 144.6905,105 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path1982" />
<path
   class="st0"
   d="m 127.5905,105 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path1984" />
<polygon
   class="st1"
   points="238.1,208.9 233.8,201.5 225.3,201.5 221.1,209 225.3,216.4 233.9,216.4 "
   id="polygon1986"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 127.5905,105.1 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,-0.1 -1,-0.5 -1,-1"
   id="path1988" />
<path
   class="st0"
   d="m 118.9905,105.1 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path1990" />
<path
   class="st0"
   d="m 127.4905,90.2 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path1992" />
<path
   class="st0"
   d="m 118.9905,90.2 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path1994" />
<path
   class="st0"
   d="m 131.7905,97.6 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path1996" />
<path
   class="st0"
   d="m 114.6905,97.6 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path1998" />
<polygon
   class="st1"
   points="225.3,201.5 221,194.1 212.5,194.1 208.2,201.5 212.5,209 221,209 "
   id="polygon2000"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 114.6905,97.6 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2002" />
<path
   class="st0"
   d="m 114.6905,82.8 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2004" />
<path
   class="st0"
   d="m 118.9905,90.2 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2006" />
<path
   class="st0"
   d="m 178.7905,105 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2008" />
<path
   class="st0"
   d="m 170.2905,105 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2010" />
<path
   class="st0"
   d="m 165.9905,112.4 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2012" />
<path
   class="st0"
   d="m 165.9905,112.4 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2014" />
<path
   class="st0"
   d="m 157.4905,112.5 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,-0.1 -1,-0.5 -1,-1"
   id="path2016" />
<path
   class="st0"
   d="m 165.9905,97.6 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2018" />
<path
   class="st0"
   d="m 157.4905,97.6 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2020" />
<path
   class="st0"
   d="m 170.2905,105 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2022" />
<path
   class="st0"
   d="m 153.1905,105 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2024" />
<polygon
   class="st1"
   points="263.8,208.9 259.5,201.5 251,201.5 246.7,208.9 251,216.4 259.5,216.3 "
   id="polygon2026"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 153.1905,105 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2028" />
<path
   class="st0"
   d="m 144.6905,105 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2030" />
<path
   class="st0"
   d="m 153.1905,90.2 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,-0.1 -1,-0.5 -1,-1"
   id="path2032" />
<path
   class="st0"
   d="m 144.5905,90.2 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2034" />
<path
   class="st0"
   d="m 157.4905,97.6 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2036" />
<path
   class="st0"
   d="m 140.3905,97.6 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2038" />
<polygon
   class="st1"
   points="250.9,201.5 246.6,194 238.1,194.1 233.9,201.5 238.1,208.9 246.7,208.9 "
   id="polygon2040"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 140.3905,97.6 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2042" />
<path
   class="st0"
   d="m 131.7905,97.6 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2044" />
<path
   class="st0"
   d="m 140.2905,82.7 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2046" />
<path
   class="st0"
   d="m 131.7905,82.7 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2048" />
<path
   class="st0"
   d="m 144.5905,90.2 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,-0.1 -1,-0.5 -1,-1"
   id="path2050" />
<path
   class="st0"
   d="m 127.4905,90.2 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,-0.1 -1,-0.5 -1,-1"
   id="path2052" />
<polygon
   class="st1"
   points="238.1,194.1 233.8,186.6 225.3,186.6 221,194.1 225.3,201.5 233.8,201.5 "
   id="polygon2054"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 127.4905,90.2 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2056" />
<path
   class="st0"
   d="m 118.9905,90.2 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2058" />
<path
   class="st0"
   d="m 127.4905,75.3 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2060" />
<path
   class="st0"
   d="m 118.9905,75.3 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2062" />
<path
   class="st0"
   d="m 131.7905,82.7 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2064" />
<path
   class="st0"
   d="m 114.6905,82.7 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2066" />
<polygon
   class="st1"
   points="225.3,186.6 221,179.2 212.4,179.2 208.2,186.7 212.5,194.1 221,194.1 "
   id="polygon2068"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 114.6905,82.8 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,-0.1 -1,-0.5 -1,-1"
   id="path2070" />
<path
   class="st0"
   d="m 118.9905,75.3 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2072" />
<path
   class="st0"
   d="m 217.2905,112.4 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2074" />
<path
   class="st0"
   d="m 208.7905,112.4 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2076" />
<path
   class="st0"
   d="m 204.4905,105 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2078" />
<path
   class="st0"
   d="m 195.8905,105 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2080" />
<path
   class="st0"
   d="m 208.7905,112.4 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2082" />
<path
   class="st0"
   d="m 153.1905,119.9 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2084" />
<path
   class="st0"
   d="m 144.5905,119.9 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2086" />
<path
   class="st0"
   d="m 127.5905,119.9 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2088" />
<path
   class="st0"
   d="m 118.9905,119.9 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2090" />
<path
   class="st0"
   d="m 191.5905,97.6 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,-0.1 -1,-0.5 -1,-1"
   id="path2092" />
<path
   class="st0"
   d="m 183.0905,97.6 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2094" />
<path
   class="st0"
   d="m 195.8905,105 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2096" />
<path
   class="st0"
   d="m 178.7905,105 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2098" />
<path
   class="st0"
   d="m 178.7905,105 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2100" />
<path
   class="st0"
   d="m 170.2905,105 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2102" />
<path
   class="st0"
   d="m 178.7905,90.1 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2104" />
<path
   class="st0"
   d="m 170.1905,90.1 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -0.9,-0.4 -1,-1"
   id="path2106" />
<path
   class="st0"
   d="m 183.0905,97.6 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,-0.1 -1,-0.5 -1,-1"
   id="path2108" />
<path
   class="st0"
   d="m 165.9905,97.6 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,-0.1 -1,-0.5 -1,-1"
   id="path2110" />
<polygon
   class="st1"
   points="276.6,201.4 272.3,194 263.7,194 259.5,201.5 263.8,208.9 272.3,208.9 "
   id="polygon2112"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 165.9905,97.6 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2114" />
<path
   class="st0"
   d="m 157.3905,97.6 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2116" />
<path
   class="st0"
   d="m 165.9905,82.7 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2118" />
<path
   class="st0"
   d="m 157.3905,82.7 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2120" />
<path
   class="st0"
   d="m 170.2905,90.1 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2122" />
<path
   class="st0"
   d="m 153.1905,90.1 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2124" />
<polygon
   class="st1"
   points="263.7,194 259.4,186.6 250.9,186.6 246.7,194.1 250.9,201.5 259.5,201.5 "
   id="polygon2126"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 153.1905,90.1 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2128" />
<path
   class="st0"
   d="m 144.5905,90.2 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,-0.1 -1,-0.5 -1,-1"
   id="path2130" />
<path
   class="st0"
   d="m 153.0905,75.3 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2132" />
<path
   class="st0"
   d="m 144.5905,75.3 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2134" />
<path
   class="st0"
   d="m 157.3905,82.7 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2136" />
<path
   class="st0"
   d="m 140.2905,82.7 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2138" />
<polygon
   class="st1"
   points="250.9,186.6 246.6,179.2 238.1,179.2 233.8,186.6 238.1,194.1 246.6,194 "
   id="polygon2140"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 140.2905,82.7 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2142" />
<path
   class="st0"
   d="m 131.7905,82.7 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2144" />
<path
   class="st0"
   d="m 140.2905,67.9 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,-0.1 -1,-0.5 -1,-1"
   id="path2146" />
<path
   class="st0"
   d="m 131.6905,67.9 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2148" />
<path
   class="st0"
   d="m 144.5905,75.3 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2150" />
<path
   class="st0"
   d="m 127.4905,75.3 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2152" />
<polygon
   class="st1"
   points="238,179.2 233.8,171.8 225.2,171.8 221,179.2 225.3,186.6 233.8,186.6 "
   id="polygon2154"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 127.4905,75.3 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2156" />
<path
   class="st0"
   d="m 118.8905,75.3 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2158" />
<path
   class="st0"
   d="m 127.4905,60.4 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2160" />
<path
   class="st0"
   d="m 131.7905,67.9 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,-0.1 -1,-0.5 -1,-1"
   id="path2162" />
<path
   class="st0"
   d="m 242.8905,112.4 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.5,-0.1 -1,-0.5 -1,-1"
   id="path2164" />
<path
   class="st0"
   d="m 234.3905,112.4 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2166" />
<path
   class="st0"
   d="m 230.0905,104.9 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2168" />
<path
   class="st0"
   d="m 221.5905,105 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,-0.1 -1,-0.5 -1,-1"
   id="path2170" />
<path
   class="st0"
   d="m 234.3905,112.4 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.5,-0.1 -1,-0.5 -1,-1"
   id="path2172" />
<path
   class="st0"
   d="m 217.2905,112.4 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2174" />
<polygon
   class="st1"
   points="327.9,216.3 323.6,208.8 315.1,208.8 310.8,216.3 315.1,223.7 323.6,223.7 "
   id="polygon2176"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 217.2905,112.4 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2178" />
<path
   class="st0"
   d="m 208.7905,112.4 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2180" />
<path
   class="st0"
   d="m 217.2905,97.5 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2182" />
<path
   class="st0"
   d="m 208.6905,97.5 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2184" />
<path
   class="st0"
   d="m 221.5905,104.9 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2186" />
<path
   class="st0"
   d="m 204.4905,104.9 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2188" />
<polygon
   class="st1"
   points="315,208.8 310.8,201.4 302.2,201.4 298,208.9 302.2,216.3 310.8,216.3 "
   id="polygon2190"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 204.4905,105 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,-0.1 -1,-0.5 -1,-1"
   id="path2192" />
<path
   class="st0"
   d="m 195.8905,105 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2194" />
<path
   class="st0"
   d="m 204.3905,90.1 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2196" />
<path
   class="st0"
   d="m 195.8905,90.1 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2198" />
<path
   class="st0"
   d="m 208.6905,97.5 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2200" />
<path
   class="st0"
   d="m 191.5905,97.5 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2202" />
<polygon
   class="st1"
   points="302.2,201.4 297.9,194 289.4,194 285.1,201.4 289.4,208.9 297.9,208.9 "
   id="polygon2204"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 191.5905,97.5 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2206" />
<path
   class="st0"
   d="m 183.0905,97.5 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2208" />
<path
   class="st0"
   d="m 191.5905,82.7 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2210" />
<path
   class="st0"
   d="m 183.0905,82.7 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2212" />
<path
   class="st0"
   d="m 195.8905,90.1 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2214" />
<path
   class="st0"
   d="m 178.7905,90.1 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2216" />
<polygon
   class="st1"
   points="289.4,194 285.1,186.6 276.5,186.6 272.3,194 276.6,201.4 285.1,201.4 "
   id="polygon2218"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 178.7905,90.1 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2220" />
<path
   class="st0"
   d="m 170.2905,90.1 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2222" />
<path
   class="st0"
   d="m 178.7905,75.2 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2224" />
<path
   class="st0"
   d="m 170.1905,75.3 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,-0.1 -1,-0.5 -1,-1"
   id="path2226" />
<path
   class="st0"
   d="m 183.0905,82.7 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2228" />
<path
   class="st0"
   d="m 165.9905,82.7 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2230" />
<polygon
   class="st1"
   points="276.5,186.6 272.2,179.1 263.7,179.2 259.5,186.6 263.7,194 272.3,194 "
   id="polygon2232"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 165.9905,82.7 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2234" />
<path
   class="st0"
   d="m 157.3905,82.7 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2236" />
<path
   class="st0"
   d="m 165.8905,67.8 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2238" />
<path
   class="st0"
   d="m 157.3905,67.8 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2240" />
<path
   class="st0"
   d="m 170.1905,75.2 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2242" />
<path
   class="st0"
   d="m 153.0905,75.3 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,-0.1 -1,-0.5 -1,-1"
   id="path2244" />
<polygon
   class="st1"
   points="263.7,179.1 259.4,171.7 250.9,171.7 246.6,179.2 250.9,186.6 259.4,186.6 "
   id="polygon2246"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 153.0905,75.3 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,-0.1 -1,-0.5 -1,-1"
   id="path2248" />
<path
   class="st0"
   d="m 144.5905,75.3 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2250" />
<path
   class="st0"
   d="m 153.0905,60.4 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2252" />
<path
   class="st0"
   d="m 144.5905,60.4 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2254" />
<path
   class="st0"
   d="m 157.3905,67.8 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2256" />
<path
   class="st0"
   d="m 140.2905,67.8 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2258" />
<polygon
   class="st1"
   points="250.9,171.7 246.6,164.3 238,164.3 233.8,171.7 238.1,179.2 246.6,179.2 "
   id="polygon2260"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 140.2905,67.8 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2262" />
<path
   class="st0"
   d="m 131.7905,67.9 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,-0.1 -1,-0.5 -1,-1"
   id="path2264" />
<path
   class="st0"
   d="m 140.2905,53 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2266" />
<path
   class="st0"
   d="m 131.6905,53 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2268" />
<path
   class="st0"
   d="m 144.5905,60.4 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2270" />
<path
   class="st0"
   d="m 127.4905,60.4 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2272" />
<polygon
   class="st1"
   points="238,164.3 233.7,156.9 225.2,156.9 221,164.3 225.2,171.8 233.8,171.7 "
   id="polygon2274"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 127.4905,60.4 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2276" />
<path
   class="st0"
   d="m 127.3905,45.6 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,-0.1 -1,-0.5 -1,-1"
   id="path2278" />
<path
   class="st0"
   d="m 118.8905,45.6 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2280" />
<path
   class="st0"
   d="m 131.6905,53 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2282" />
<path
   class="st0"
   d="m 114.5905,38.1 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2284" />
<path
   class="st0"
   d="m 118.8905,45.6 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,-0.1 -1,-0.5 -1,-1"
   id="path2286" />
<path
   class="st0"
   d="m 268.5905,112.3 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2288" />
<path
   class="st0"
   d="m 259.9905,112.3 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2290" />
<path
   class="st0"
   d="m 255.6905,104.9 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2292" />
<path
   class="st0"
   d="m 247.1905,104.9 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2294" />
<path
   class="st0"
   d="m 259.9905,112.3 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2296" />
<path
   class="st0"
   d="m 242.8905,112.3 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2298" />
<polygon
   class="st1"
   points="353.5,216.2 349.2,208.8 340.7,208.8 336.4,216.3 340.7,223.7 349.2,223.7 "
   id="polygon2300"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 242.8905,112.4 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,-0.1 -1,-0.5 -1,-1"
   id="path2302" />
<path
   class="st0"
   d="m 234.3905,112.4 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,-0.1 -1,-0.5 -1,-1"
   id="path2304" />
<path
   class="st0"
   d="m 242.8905,97.5 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2306" />
<path
   class="st0"
   d="m 234.3905,97.5 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2308" />
<path
   class="st0"
   d="m 247.1905,104.9 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2310" />
<path
   class="st0"
   d="m 230.0905,104.9 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2312" />
<polygon
   class="st1"
   points="340.7,208.8 336.4,201.4 327.8,201.4 323.6,208.8 327.9,216.3 336.4,216.2 "
   id="polygon2314"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 230.0905,104.9 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2316" />
<path
   class="st0"
   d="m 221.4905,104.9 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2318" />
<path
   class="st0"
   d="m 230.0905,90.1 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,-0.1 -1,-0.5 -1,-1"
   id="path2320" />
<path
   class="st0"
   d="m 221.4905,90.1 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2322" />
<path
   class="st0"
   d="m 234.3905,97.5 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2324" />
<path
   class="st0"
   d="m 217.2905,97.5 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2326" />
<polygon
   class="st1"
   points="327.8,201.4 323.5,194 315,194 310.8,201.4 315,208.8 323.6,208.8 "
   id="polygon2328"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 217.2905,97.5 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2330" />
<path
   class="st0"
   d="m 208.6905,97.5 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2332" />
<path
   class="st0"
   d="m 217.1905,82.6 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2334" />
<path
   class="st0"
   d="m 208.6905,82.7 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,-0.1 -1,-0.5 -1,-1"
   id="path2336" />
<path
   class="st0"
   d="m 221.4905,90.1 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,-0.1 -1,-0.5 -1,-1"
   id="path2338" />
<path
   class="st0"
   d="m 204.3905,90.1 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2340" />
<polygon
   class="st1"
   points="315,194 310.7,186.5 302.2,186.5 297.9,194 302.2,201.4 310.7,201.4 "
   id="polygon2342"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 204.3905,90.1 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2344" />
<path
   class="st0"
   d="m 195.8905,90.1 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2346" />
<path
   class="st0"
   d="m 204.3905,75.2 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2348" />
<path
   class="st0"
   d="m 195.7905,75.2 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2350" />
<path
   class="st0"
   d="m 208.6905,82.6 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2352" />
<path
   class="st0"
   d="m 191.5905,82.6 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2354" />
<polygon
   class="st1"
   points="302.1,186.5 297.9,179.1 289.3,179.1 285.1,186.6 289.4,194 297.9,194 "
   id="polygon2356"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 191.5905,82.7 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,-0.1 -1,-0.5 -1,-1"
   id="path2358" />
<path
   class="st0"
   d="m 182.9905,82.7 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2360" />
<path
   class="st0"
   d="m 191.5905,67.8 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2362" />
<path
   class="st0"
   d="m 182.9905,67.8 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2364" />
<path
   class="st0"
   d="m 195.8905,75.2 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2366" />
<path
   class="st0"
   d="m 178.7905,75.2 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2368" />
<polygon
   class="st1"
   points="289.3,179.1 285,171.7 276.5,171.7 272.3,179.1 276.5,186.6 285.1,186.6 "
   id="polygon2370"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 178.7905,75.2 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2372" />
<path
   class="st0"
   d="m 170.1905,75.2 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2374" />
<path
   class="st0"
   d="m 178.6905,60.4 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2376" />
<path
   class="st0"
   d="m 170.1905,60.4 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2378" />
<path
   class="st0"
   d="m 182.9905,67.8 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2380" />
<path
   class="st0"
   d="m 165.8905,67.8 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2382" />
<polygon
   class="st1"
   points="276.5,171.7 272.2,164.3 263.7,164.3 259.4,171.7 263.7,179.1 272.2,179.1 "
   id="polygon2384"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 165.8905,67.8 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2386" />
<path
   class="st0"
   d="m 157.3905,67.8 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2388" />
<path
   class="st0"
   d="m 165.8905,52.9 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2390" />
<path
   class="st0"
   d="m 157.2905,53 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,-0.1 -1,-0.5 -1,-1"
   id="path2392" />
<path
   class="st0"
   d="m 170.1905,60.4 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2394" />
<path
   class="st0"
   d="m 153.0905,60.4 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2396" />
<polygon
   class="st1"
   points="263.6,164.3 259.4,156.8 250.8,156.9 246.6,164.3 250.9,171.7 259.4,171.7 "
   id="polygon2398"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 153.0905,60.4 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2400" />
<path
   class="st0"
   d="m 144.4905,60.4 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2402" />
<path
   class="st0"
   d="m 153.0905,45.5 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2404" />
<path
   class="st0"
   d="m 144.4905,45.5 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2406" />
<path
   class="st0"
   d="m 157.3905,52.9 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2408" />
<path
   class="st0"
   d="m 140.2905,53 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,-0.1 -1,-0.5 -1,-1"
   id="path2410" />
<polygon
   class="st1"
   points="250.8,156.8 246.5,149.4 238,149.4 233.7,156.9 238,164.3 246.6,164.3 "
   id="polygon2412"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 140.2905,53 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,-0.1 -1,-0.5 -1,-1"
   id="path2414" />
<path
   class="st0"
   d="m 131.6905,53 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2416" />
<path
   class="st0"
   d="m 140.1905,38.1 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2418" />
<path
   class="st0"
   d="m 131.6905,38.1 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2420" />
<path
   class="st0"
   d="m 144.4905,45.5 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2422" />
<path
   class="st0"
   d="m 127.3905,45.5 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2424" />
<polygon
   class="st1"
   points="238,149.4 233.7,142 225.2,142 220.9,149.5 225.2,156.9 233.7,156.9 "
   id="polygon2426"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 127.3905,45.5 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2428" />
<path
   class="st0"
   d="m 118.8905,45.6 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,-0.1 -1,-0.5 -1,-1"
   id="path2430" />
<path
   class="st0"
   d="m 127.3905,30.7 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2432" />
<path
   class="st0"
   d="m 118.7905,30.7 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2434" />
<path
   class="st0"
   d="m 131.6905,38.1 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2436" />
<path
   class="st0"
   d="m 114.5905,38.1 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2438" />
<polygon
   class="st1"
   points="225.1,142 220.9,134.6 212.3,134.6 208.1,142 212.4,149.5 220.9,149.4 "
   id="polygon2440"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 114.5905,38.1 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2442" />
<path
   class="st0"
   d="m 114.5905,23.3 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,-0.1 -1,-0.5 -1,-1"
   id="path2444" />
<path
   class="st0"
   d="m 118.8905,30.7 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2446" />
<path
   class="st0"
   d="m 294.1905,112.3 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2448" />
<path
   class="st0"
   d="m 285.6905,112.3 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2450" />
<polygon
   class="st1"
   points="392,223.6 387.7,216.2 379.2,216.2 374.9,223.6 379.2,231.1 387.7,231.1 "
   id="polygon2452"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 281.3905,104.9 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2454" />
<path
   class="st0"
   d="m 272.7905,104.9 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2456" />
<path
   class="st0"
   d="m 285.6905,112.3 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2458" />
<path
   class="st0"
   d="m 268.5905,112.3 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2460" />
<polygon
   class="st1"
   points="379.1,216.2 374.9,208.8 366.3,208.8 362.1,216.2 366.3,223.6 374.9,223.6 "
   id="polygon2462"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 268.5905,112.3 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2464" />
<path
   class="st0"
   d="m 259.9905,112.3 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2466" />
<path
   class="st0"
   d="m 268.4905,97.5 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,-0.1 -1,-0.5 -1,-1"
   id="path2468" />
<path
   class="st0"
   d="m 259.9905,97.5 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,-0.1 -1,-0.5 -1,-1"
   id="path2470" />
<path
   class="st0"
   d="m 272.7905,104.9 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2472" />
<path
   class="st0"
   d="m 255.6905,104.9 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2474" />
<polygon
   class="st1"
   points="366.3,208.8 362,201.3 353.5,201.4 349.2,208.8 353.5,216.2 362,216.2 "
   id="polygon2476"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 255.6905,104.9 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2478" />
<path
   class="st0"
   d="m 247.1905,104.9 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2480" />
<path
   class="st0"
   d="m 255.6905,90 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2482" />
<path
   class="st0"
   d="m 247.1905,90 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2484" />
<path
   class="st0"
   d="m 259.9905,97.5 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,-0.1 -1,-0.5 -1,-1"
   id="path2486" />
<path
   class="st0"
   d="m 242.8905,97.5 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.5,-0.1 -1,-0.5 -1,-1"
   id="path2488" />
<polygon
   class="st1"
   points="353.5,201.3 349.2,193.9 340.7,193.9 336.4,201.4 340.7,208.8 349.2,208.8 "
   id="polygon2490"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 242.8905,97.5 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2492" />
<path
   class="st0"
   d="m 234.3905,97.5 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2494" />
<path
   class="st0"
   d="m 242.8905,82.6 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2496" />
<path
   class="st0"
   d="m 234.2905,82.6 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2498" />
<path
   class="st0"
   d="m 247.1905,90 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2500" />
<path
   class="st0"
   d="m 230.0905,90 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2502" />
<polygon
   class="st1"
   points="340.6,193.9 336.3,186.5 327.8,186.5 323.6,194 327.8,201.4 336.4,201.4 "
   id="polygon2504"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 230.0905,90 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2506" />
<path
   class="st0"
   d="m 221.4905,90.1 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,-0.1 -1,-0.5 -1,-1"
   id="path2508" />
<path
   class="st0"
   d="m 229.9905,75.2 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2510" />
<path
   class="st0"
   d="m 221.4905,75.2 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2512" />
<path
   class="st0"
   d="m 234.2905,82.6 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2514" />
<path
   class="st0"
   d="m 217.1905,82.6 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2516" />
<polygon
   class="st1"
   points="327.8,186.5 323.5,179.1 315,179.1 310.7,186.5 315,194 323.5,193.9 "
   id="polygon2518"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 217.1905,82.6 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2520" />
<path
   class="st0"
   d="m 208.6905,82.6 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2522" />
<path
   class="st0"
   d="m 217.1905,67.8 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,-0.1 -1,-0.5 -1,-1"
   id="path2524" />
<path
   class="st0"
   d="m 208.6905,67.8 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2526" />
<path
   class="st0"
   d="m 221.4905,75.2 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2528" />
<path
   class="st0"
   d="m 204.3905,75.2 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2530" />
<polygon
   class="st1"
   points="315,179.1 310.7,171.7 302.1,171.7 297.9,179.1 302.2,186.5 310.7,186.5 "
   id="polygon2532"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 204.3905,75.2 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2534" />
<path
   class="st0"
   d="m 195.8905,75.2 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2536" />
<path
   class="st0"
   d="m 204.3905,60.3 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2538" />
<path
   class="st0"
   d="m 195.7905,60.3 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2540" />
<path
   class="st0"
   d="m 208.6905,67.8 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,-0.1 -1,-0.5 -1,-1"
   id="path2542" />
<path
   class="st0"
   d="m 191.5905,67.8 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,-0.1 -1,-0.5 -1,-1"
   id="path2544" />
<polygon
   class="st1"
   points="302.1,171.7 297.8,164.2 289.3,164.2 285.1,171.7 289.3,179.1 297.9,179.1 "
   id="polygon2546"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 191.5905,67.8 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2548" />
<path
   class="st0"
   d="m 182.9905,67.8 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2550" />
<path
   class="st0"
   d="m 191.4905,52.9 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2552" />
<path
   class="st0"
   d="m 182.9905,52.9 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2554" />
<path
   class="st0"
   d="m 195.7905,60.3 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2556" />
<path
   class="st0"
   d="m 178.6905,60.3 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2558" />
<polygon
   class="st1"
   points="289.3,164.2 285,156.8 276.5,156.8 272.2,164.3 276.5,171.7 285,171.7 "
   id="polygon2560"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 178.6905,60.4 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,-0.1 -1,-0.5 -1,-1"
   id="path2562" />
<path
   class="st0"
   d="m 170.1905,60.4 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2564" />
<path
   class="st0"
   d="m 178.6905,45.5 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2566" />
<path
   class="st0"
   d="m 170.1905,45.5 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2568" />
<path
   class="st0"
   d="m 182.9905,52.9 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2570" />
<path
   class="st0"
   d="m 165.8905,52.9 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2572" />
<polygon
   class="st1"
   points="276.5,156.8 272.2,149.4 263.6,149.4 259.4,156.8 263.7,164.3 272.2,164.2 "
   id="polygon2574"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 165.8905,52.9 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2576" />
<path
   class="st0"
   d="m 157.2905,52.9 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -0.9,-0.4 -1,-1"
   id="path2578" />
<path
   class="st0"
   d="m 165.8905,38.1 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,-0.1 -1,-0.5 -1,-1"
   id="path2580" />
<path
   class="st0"
   d="m 157.2905,38.1 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2582" />
<path
   class="st0"
   d="m 170.1905,45.5 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2584" />
<path
   class="st0"
   d="m 153.0905,45.5 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2586" />
<polygon
   class="st1"
   points="263.6,149.4 259.3,142 250.8,142 246.6,149.4 250.8,156.8 259.4,156.8 "
   id="polygon2588"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 153.0905,45.5 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2590" />
<path
   class="st0"
   d="m 144.4905,45.5 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2592" />
<path
   class="st0"
   d="m 152.9905,30.6 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2594" />
<path
   class="st0"
   d="m 144.4905,30.7 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,-0.1 -1,-0.5 -1,-1"
   id="path2596" />
<path
   class="st0"
   d="m 157.2905,38.1 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,-0.1 -1,-0.5 -1,-1"
   id="path2598" />
<path
   class="st0"
   d="m 140.1905,38.1 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2600" />
<polygon
   class="st1"
   points="250.8,142 246.5,134.5 238,134.6 233.7,142 238,149.4 246.5,149.4 "
   id="polygon2602"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 140.1905,38.1 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2604" />
<path
   class="st0"
   d="m 131.6905,38.1 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2606" />
<path
   class="st0"
   d="m 131.6905,23.2 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2608" />
<path
   class="st0"
   d="m 144.4905,30.6 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2610" />
<path
   class="st0"
   d="m 127.3905,30.6 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2612" />
<path
   class="st0"
   d="m 127.3905,30.7 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,-0.1 -1,-0.5 -1,-1"
   id="path2614" />
<path
   class="st0"
   d="m 118.7905,30.7 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2616" />
<path
   class="st0"
   d="m 127.3905,15.8 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2618" />
<path
   class="st0"
   d="m 118.7905,15.8 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2620" />
<path
   class="st0"
   d="m 131.6905,23.2 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2622" />
<path
   class="st0"
   d="m 114.5905,23.2 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2624" />
<polygon
   class="st1"
   points="225.1,127.1 220.8,119.7 212.3,119.7 208.1,127.1 212.3,134.6 220.9,134.6 "
   id="polygon2626"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 114.5905,23.2 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2628" />
<path
   class="st0"
   d="m 114.4905,8.4 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2630" />
<path
   class="st0"
   d="m 118.7905,15.8 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2632" />
<path
   class="st0"
   d="m 306.8905,104.9 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2634" />
<path
   class="st0"
   d="m 311.1905,112.4 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,-0.1 -1,-0.5 -1,-1"
   id="path2636" />
<path
   class="st0"
   d="m 319.7905,112.3 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2638" />
<path
   class="st0"
   d="m 311.1905,112.4 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.5,-0.1 -1,-0.5 -1,-1"
   id="path2640" />
<path
   class="st0"
   d="m 319.7905,97.5 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2642" />
<path
   class="st0"
   d="m 311.1905,97.5 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2644" />
<path
   class="st0"
   d="m 324.0905,104.9 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2646" />
<path
   class="st0"
   d="m 306.9905,104.9 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2648" />
<polygon
   class="st1"
   points="417.5,208.8 413.2,201.4 404.7,201.4 400.4,208.8 404.7,216.3 413.3,216.2 "
   id="polygon2650"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 306.9905,104.9 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2652" />
<path
   class="st0"
   d="m 306.8905,90.1 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,-0.1 -1,-0.5 -1,-1"
   id="path2654" />
<path
   class="st0"
   d="m 311.1905,97.5 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2656" />
<polygon
   class="st1"
   points="404.7,201.4 400.4,194 391.9,194 387.6,201.4 391.9,208.8 400.4,208.8 "
   id="polygon2658"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 319.6905,97.5 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2660" />
<path
   class="st0"
   d="m 311.1905,97.5 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2662" />
<path
   class="st0"
   d="m 319.6905,82.6 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2664" />
<path
   class="st0"
   d="m 311.1905,82.6 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2666" />
<path
   class="st0"
   d="m 323.9905,90 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2668" />
<path
   class="st0"
   d="m 306.8905,90 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2670" />
<polygon
   class="st1"
   points="417.5,193.9 413.2,186.5 404.7,186.5 400.4,194 404.7,201.4 413.2,201.4 "
   id="polygon2672"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 306.8905,90 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2674" />
<path
   class="st0"
   d="m 306.8905,75.2 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2676" />
<path
   class="st0"
   d="m 311.1905,82.6 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2678" />
<polygon
   class="st1"
   points="404.6,186.5 400.4,179.1 391.8,179.1 387.6,186.5 391.8,194 400.4,193.9 "
   id="polygon2680"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 311.2905,112.3 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2682" />
<path
   class="st0"
   d="m 306.9905,104.8 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2684" />
<path
   class="st0"
   d="m 298.4905,104.9 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,-0.1 -1,-0.5 -1,-1"
   id="path2686" />
<path
   class="st0"
   d="m 311.2905,112.3 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2688" />
<path
   class="st0"
   d="m 294.1905,112.3 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2690" />
<polygon
   class="st1"
   points="404.8,216.2 400.5,208.7 391.9,208.8 387.7,216.2 392,223.6 400.5,223.6 "
   id="polygon2692"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 294.1905,112.3 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2694" />
<path
   class="st0"
   d="m 285.5905,112.3 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2696" />
<path
   class="st0"
   d="m 294.1905,97.4 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2698" />
<path
   class="st0"
   d="m 294.1905,82.8 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,-0.1 -1,-0.5 -1,-1"
   id="path2700" />
<path
   class="st0"
   d="m 285.5905,97.4 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2702" />
<path
   class="st0"
   d="m 298.4905,104.8 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2704" />
<path
   class="st0"
   d="m 298.4905,90 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2706" />
<path
   class="st0"
   d="m 298.4905,75.2 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2708" />
<path
   class="st0"
   d="m 281.3905,104.9 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,-0.1 -1,-0.5 -1,-1"
   id="path2710" />
<polygon
   class="st1"
   points="391.9,208.7 387.6,201.3 379.1,201.3 374.9,208.8 379.1,216.2 387.7,216.2 "
   id="polygon2712"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 281.3905,104.9 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,-0.1 -1,-0.5 -1,-1"
   id="path2714" />
<path
   class="st0"
   d="m 272.7905,104.9 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2716" />
<path
   class="st0"
   d="m 281.2905,90 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2718" />
<path
   class="st0"
   d="m 272.7905,90 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2720" />
<path
   class="st0"
   d="m 285.5905,97.4 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2722" />
<path
   class="st0"
   d="m 268.4905,97.4 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2724" />
<polygon
   class="st1"
   points="379.1,201.3 374.8,193.9 366.3,193.9 362,201.3 366.3,208.8 374.8,208.8 "
   id="polygon2726"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 268.4905,97.4 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2728" />
<path
   class="st0"
   d="m 259.9905,97.5 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,-0.1 -1,-0.5 -1,-1"
   id="path2730" />
<path
   class="st0"
   d="m 268.4905,82.6 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2732" />
<path
   class="st0"
   d="m 259.9905,82.6 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2734" />
<path
   class="st0"
   d="m 272.7905,90 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2736" />
<path
   class="st0"
   d="m 255.6905,90 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2738" />
<polygon
   class="st1"
   points="366.3,193.9 362,186.5 353.4,186.5 349.2,193.9 353.5,201.4 362,201.3 "
   id="polygon2740"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 255.5905,60.2 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2742" />
<polygon
   class="st1"
   points="353.4,171.5 349.1,164.1 340.5,164.1 336.3,171.6 340.6,179 349.1,179 "
   id="polygon2744"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 281.1905,60.2 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2746" />
<path
   class="st0"
   d="m 272.6905,60.2 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2748" />
<polygon
   class="st1"
   points="379,171.5 374.7,164.1 366.2,164.1 361.9,171.5 366.2,179 374.7,178.9 "
   id="polygon2750"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 268.3905,52.8 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,-0.1 -1,-0.5 -1,-1"
   id="path2752" />
<path
   class="st0"
   d="m 259.7905,52.8 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2754" />
<path
   class="st0"
   d="m 272.6905,60.2 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2756" />
<path
   class="st0"
   d="m 281.1905,75 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2758" />
<path
   class="st0"
   d="m 272.6905,75 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2760" />
<path
   class="st0"
   d="m 255.5905,60.2 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2762" />
<polygon
   class="st1"
   points="366.1,164.1 361.9,156.7 353.3,156.7 349.1,164.1 353.4,171.5 361.9,171.5 "
   id="polygon2764"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 255.5905,60.2 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2766" />
<path
   class="st0"
   d="m 272.6905,45.5 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2768" />
<path
   class="st0"
   d="m 255.5905,45.6 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,-0.1 -1,-0.5 -1,-1"
   id="path2770" />
<path
   class="st0"
   d="m 259.8905,52.8 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2772" />
<path
   class="st0"
   d="m 268.3905,38 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,-0.1 -1,-0.5 -1,-1"
   id="path2774" />
<path
   class="st0"
   d="m 259.7905,38 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.5,-0.1 -1,-0.5 -1,-1"
   id="path2776" />
<polygon
   class="st1"
   points="366.1,149.3 361.9,141.8 353.3,141.9 349.1,149.3 353.4,156.7 361.9,156.7 "
   id="polygon2778"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 259.8905,38 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,-0.1 -1,-0.5 -1,-1"
   id="path2780" />
<path
   class="st0"
   d="m 255.6905,90 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2782" />
<path
   class="st0"
   d="m 247.0905,90 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2784" />
<path
   class="st0"
   d="m 255.6905,75.2 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,-0.1 -1,-0.5 -1,-1"
   id="path2786" />
<path
   class="st0"
   d="m 247.0905,75.2 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2788" />
<path
   class="st0"
   d="m 259.9905,82.6 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2790" />
<path
   class="st0"
   d="m 242.8905,82.6 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2792" />
<polygon
   class="st1"
   points="353.4,186.5 349.1,179 340.6,179.1 336.4,186.5 340.6,193.9 349.2,193.9 "
   id="polygon2794"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 242.8905,82.6 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2796" />
<path
   class="st0"
   d="m 234.2905,82.6 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2798" />
<path
   class="st0"
   d="m 242.7905,67.7 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2800" />
<path
   class="st0"
   d="m 234.2905,67.7 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2802" />
<path
   class="st0"
   d="m 247.0905,75.2 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,-0.1 -1,-0.5 -1,-1"
   id="path2804" />
<path
   class="st0"
   d="m 229.9905,75.2 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,-0.1 -1,-0.5 -1,-1"
   id="path2806" />
<polygon
   class="st1"
   points="340.6,179 336.3,171.6 327.8,171.6 323.5,179.1 327.8,186.5 336.3,186.5 "
   id="polygon2808"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 229.9905,75.2 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2810" />
<path
   class="st0"
   d="m 247.0905,60.3 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2812" />
<path
   class="st0"
   d="m 229.9905,60.3 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2814" />
<path
   class="st0"
   d="m 221.4905,75.2 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2816" />
<path
   class="st0"
   d="m 221.3905,60.3 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2818" />
<path
   class="st0"
   d="m 234.2905,67.7 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2820" />
<path
   class="st0"
   d="m 268.2905,67.7 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2822" />
<path
   class="st0"
   d="m 285.4905,67.7 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2824" />
<path
   class="st0"
   d="m 259.7905,67.7 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2826" />
<path
   class="st0"
   d="m 217.1905,67.7 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2828" />
<polygon
   class="st1"
   points="327.7,171.6 323.5,164.2 314.9,164.2 310.7,171.7 315,179.1 323.5,179.1 "
   id="polygon2830"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 217.1905,67.7 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2832" />
<path
   class="st0"
   d="m 208.5905,67.8 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,-0.1 -1,-0.5 -1,-1"
   id="path2834" />
<path
   class="st0"
   d="m 208.5905,52.9 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2836" />
<path
   class="st0"
   d="m 221.4905,60.3 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2838" />
<path
   class="st0"
   d="m 204.3905,60.3 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2840" />
<path
   class="st0"
   d="m 204.3905,60.3 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2842" />
<path
   class="st0"
   d="m 195.7905,60.3 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2844" />
<path
   class="st0"
   d="m 204.2905,45.5 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,-0.1 -1,-0.5 -1,-1"
   id="path2846" />
<path
   class="st0"
   d="m 195.7905,45.5 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2848" />
<path
   class="st0"
   d="m 208.5905,52.9 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2850" />
<path
   class="st0"
   d="m 216.9905,52.9 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2852" />
<path
   class="st0"
   d="m 191.4905,52.9 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2854" />
<polygon
   class="st1"
   points="302.1,156.8 297.8,149.4 289.3,149.4 285,156.8 289.3,164.2 297.8,164.2 "
   id="polygon2856"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 191.4905,52.9 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2858" />
<path
   class="st0"
   d="m 182.9905,52.9 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2860" />
<path
   class="st0"
   d="m 191.4905,38 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2862" />
<path
   class="st0"
   d="m 182.8905,38.1 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,-0.1 -1,-0.5 -1,-1"
   id="path2864" />
<path
   class="st0"
   d="m 195.7905,45.5 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,-0.1 -1,-0.5 -1,-1"
   id="path2866" />
<path
   class="st0"
   d="m 221.2905,45.2 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2868" />
<path
   class="st0"
   d="m 216.9905,37.8 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2870" />
<path
   class="st0"
   d="m 208.4905,37.8 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2872" />
<path
   class="st0"
   d="m 221.2905,45.2 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2874" />
<polygon
   class="st1"
   points="314.8,149.1 310.5,141.7 302,141.7 297.7,149.1 302,156.6 310.5,156.5 "
   id="polygon2876"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 208.4905,37.8 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2878" />
<path
   class="st0"
   d="m 178.6905,45.5 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,-0.1 -1,-0.5 -1,-1"
   id="path2880" />
<polygon
   class="st1"
   points="289.2,149.4 285,141.9 276.4,141.9 272.2,149.4 276.5,156.8 285,156.8 "
   id="polygon2882"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 178.6905,45.5 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2884" />
<path
   class="st0"
   d="m 170.0905,45.5 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2886" />
<path
   class="st0"
   d="m 178.6905,30.6 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2888" />
<path
   class="st0"
   d="m 170.0905,30.6 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2890" />
<path
   class="st0"
   d="m 182.9905,38 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2892" />
<path
   class="st0"
   d="m 165.8905,38 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2894" />
<polygon
   class="st1"
   points="276.4,141.9 272.1,134.5 263.6,134.5 259.3,142 263.6,149.4 272.2,149.4 "
   id="polygon2896"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 165.8905,38.1 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,-0.1 -1,-0.5 -1,-1"
   id="path2898" />
<path
   class="st0"
   d="m 157.2905,38.1 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2900" />
<path
   class="st0"
   d="m 170.0905,30.6 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2902" />
<path
   class="st0"
   d="m 152.9905,30.6 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2904" />
<path
   class="st0"
   d="m 152.9905,30.6 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2906" />
<path
   class="st0"
   d="m 144.4905,30.6 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2908" />
<path
   class="st0"
   d="m 131.5905,23.2 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2910" />
<path
   class="st0"
   d="m 131.5905,8.4 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,-0.1 -1,-0.5 -1,-1"
   id="path2912" />
<path
   class="st0"
   d="m 127.3905,15.8 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2914" />
<path
   class="st0"
   d="m 127.3905,15.8 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2916" />
<path
   class="st0"
   d="m 118.7905,15.8 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2918" />
<path
   class="st0"
   d="m 127.3905,1 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,-0.1 -1,-0.5 -1,-1"
   id="path2920" />
<path
   class="st0"
   d="m 118.7905,1 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2922" />
<path
   class="st0"
   d="m 131.5905,8.3 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2924" />
<path
   class="st0"
   d="m 114.4905,8.3 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2926" />
<polygon
   class="st1"
   points="225.1,112.2 220.8,104.8 212.3,104.8 208,112.3 212.3,119.7 220.8,119.7 "
   id="polygon2928"
   transform="translate(-92.509497,-103.9)" />
<path
   class="st0"
   d="m 114.4905,8.4 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,-0.1 -1,-0.5 -1,-1"
   id="path2930" />
<path
   class="st0"
   d="m 230.0905,119.7 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2932" />
<path
   class="st0"
   d="m 221.6905,119.8 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2934" />
<path
   class="st0"
   d="m 255.6905,119.7 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2936" />
<path
   class="st0"
   d="m 247.2905,119.8 c 0,-0.5 0.4,-1 1,-1 0.6,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2938" />
<path
   class="st0"
   d="m 281.2905,119.7 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2940" />
<path
   class="st0"
   d="m 272.8905,119.8 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.5,0 -1,-0.5 -1,-1"
   id="path2942" />
<path
   class="st0"
   d="m 306.7905,119.7 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.5,0 -1,-0.4 -1,-1"
   id="path2944" />
<path
   class="st0"
   d="m 298.3905,119.8 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.5 -1,-1"
   id="path2946" />
<path
   class="st0"
   d="m 294.1905,127.1 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.5 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2948" />
<path
   class="st0"
   d="m 285.7905,127.2 c 0,-0.5 0.4,-1 1,-1 0.5,0 1,0.4 1,1 0,0.6 -0.4,1 -1,1 -0.6,0 -1,-0.4 -1,-1"
   id="path2950" />
<line
   class="st2"
   x1="18.390505"
   y1="-151"
   x2="18.390505"
   y2="455.60001"
   id="line2952" />
</svg>

        `,
    }

    withDecorBoxAll.forEach(withDecorBox => {
        let distance = 500;

        if(withDecorBox.clientHeight > distance) {
            let count = Math.floor(withDecorBox.clientHeight / 500);
            let value = 200;
            for(let i = 0; i < count; i++) {
                let el = document.createElement('div');
                el.className = 'svg-deg-wrap';
                el.innerHTML = allSvg[randomInteger(0,3).toString()];
                el.style.top = value + 'px';
                value += distance;
                withDecorBox.append(el);


                window.addEventListener('scroll', () => {
                    let svg = el.querySelector('svg');
                    if(!svg) return;
                    let translateValue = 150;

                    let svgTop = svg.getBoundingClientRect().top;
                    if(svgTop < document.documentElement.clientHeight && svgTop > 0) {
                        let percent = (document.documentElement.clientHeight - svgTop) / document.documentElement.clientHeight * 100;
                         svg.style.transform = `translateY(-${translateValue / 100 * percent}px)`;
                    }
                })
            }
        }
    })
};

	{
    let woodlands = document.querySelector('.woodlands');
    if(woodlands) {
        let img = woodlands.querySelector('.woodlands__img');
        if(img) {
            const setHeight = () => {
                if(document.documentElement.clientWidth > 991.98) {
                    woodlands.style.minHeight = img.clientHeight + 300 + 'px';
                } else {
                    woodlands.style.minHeight = 'auto';
                }
            }

            setHeight();

            window.addEventListener('resize', () => {
                setHeight();
            })
        }
    }
};
	
const animItems = document.querySelectorAll('._anim');

if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll() {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 30;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add('_active');
				setTimeout(() => {
					animItem.style.transitionDelay = '0s';
					animItem.style.transitionDuration = '0.3s';
				}, 500)
			} else {
				if (!animItem.classList.contains('_anim-no-hide')) {
					//	animItem.classList.remove('_active');
				}
			}
		}
	}
	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}

	setTimeout(() => {
		animOnScroll();
	}, 300);
};

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

	// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),position(digi),when(breakpoint)"
// e.x. data-da="item,2,992"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";

(function () {
	let originalPositions = [];
	let daElements = document.querySelectorAll('[data-da]');
	let daElementsArray = [];
	let daMatchMedia = [];
	//Заполняем массивы
	if (daElements.length > 0) {
		let number = 0;
		for (let index = 0; index < daElements.length; index++) {
			const daElement = daElements[index];
			const daMove = daElement.getAttribute('data-da');
			if (daMove != '') {
				const daArray = daMove.split(',');
				const daPlace = daArray[1] ? daArray[1].trim() : 'last';
				const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
				const daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
				const daDestination = document.querySelector('.' + daArray[0].trim())
				if (daArray.length > 0 && daDestination) {
					daElement.setAttribute('data-da-index', number);

					originalPositions[number] = {
						"parent": daElement.parentNode,
						"index": indexInParent(daElement)
					};
			
					daElementsArray[number] = {
						"element": daElement,
						"destination": document.querySelector('.' + daArray[0].trim()),
						"place": daPlace,
						"breakpoint": daBreakpoint,
						"type": daType
					}
					number++;
				}
			}
		}
		dynamicAdaptSort(daElementsArray);


		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daBreakpoint = el.breakpoint;
			const daType = el.type;

			daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
			daMatchMedia[index].addListener(dynamicAdapt);
		}
	}

	function dynamicAdapt(e) {
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daElement = el.element;
			const daDestination = el.destination;
			const daPlace = el.place;
			const daBreakpoint = el.breakpoint;
			const daClassname = "_dynamic_adapt_" + daBreakpoint;

			if (daMatchMedia[index].matches) {
			
				if (!daElement.classList.contains(daClassname)) {
					let actualIndex = indexOfElements(daDestination)[daPlace];
					if (daPlace === 'first') {
						actualIndex = indexOfElements(daDestination)[0];
					} else if (daPlace === 'last') {
						actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
					}
					daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
					daElement.classList.add(daClassname);
				}
			} else {
			
				if (daElement.classList.contains(daClassname)) {
					dynamicAdaptBack(daElement);
					daElement.classList.remove(daClassname);
				}
			}
		}
		//customAdapt();
	}


	dynamicAdapt();

	
	function dynamicAdaptBack(el) {
		const daIndex = el.getAttribute('data-da-index');
		const originalPlace = originalPositions[daIndex];
		const parentPlace = originalPlace['parent'];
		const indexPlace = originalPlace['index'];
		const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
		parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
	}
	
	function indexInParent(el) {
		var children = Array.prototype.slice.call(el.parentNode.children);
		return children.indexOf(el);
	}
	
	function indexOfElements(parent, back) {
		const children = parent.children;
		const childrenArray = [];
		for (let i = 0; i < children.length; i++) {
			const childrenElement = children[i];
			if (back) {
				childrenArray.push(i);
			} else {
				
				if (childrenElement.getAttribute('data-da') == null) {
					childrenArray.push(i);
				}
			}
		}
		return childrenArray;
	}

	function dynamicAdaptSort(arr) {
		arr.sort(function (a, b) {
			if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 }
		});
		arr.sort(function (a, b) {
			if (a.place > b.place) { return 1 } else { return -1 }
		});
	}
	
	function customAdapt() {
		//const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	}
}());
	let formLogin = document.querySelector('#wpforms-form-518');
if(formLogin) {
    let fieldsetBox = document.createElement('fieldset');
    let legend = document.createElement('legend');
    let forgotPasswordLink = document.querySelector('#wpforms-518-field_3-container');

    legend.innerText = 'LogIn';

    fieldsetBox.append(legend);
    fieldsetBox.append(...formLogin.children);
    formLogin.append(fieldsetBox);
    fieldsetBox.append(forgotPasswordLink);
}


let quizForm = document.querySelector('#wpforms-form-525');
if(quizForm) {
    let formPage1 = quizForm.querySelector('.wpforms-page.wpforms-page-1');
    let formPage2 = quizForm.querySelector('.wpforms-page.wpforms-page-2');
    let formPage3 = quizForm.querySelector('.wpforms-page.wpforms-page-3 .wpforms-entry-preview-wrapper');

    if(formPage1) createGroupsByTitles(formPage1);
    if(formPage2) createGroupsByTitles(formPage2);

    let observer = new MutationObserver(mutationRecords => {
        let preview = formPage3.querySelector('.wpforms-entry-preview');
        if(!preview) return;

        let count = 0;
        let elements = [];
    
        let titles = preview.querySelectorAll('.wpforms-entry-preview-label');
        if(titles.length) {
            for(let i = 0; i < titles.length; i++) {
                elements.push([]);
            }
        }
    
    
        preview.children.forEach(item => {
            if(item.classList.contains('wpforms-entry-preview-label')) {
                item.style.display = 'none';
                count++;
                if(!!count) {
                    elements[count-1].push(item);
                }
            } else {
                if(!!count) {
                    elements[count-1].push(item);
                }
            }
        })
        elements.forEach((group, index) => {
            let fieldsetBox = document.createElement('fieldset');
            let legend = document.createElement('legend');
            legend.innerText = titles[index].innerText;
    
            fieldsetBox.append(legend);
            group[0].before(fieldsetBox);
            fieldsetBox.append(...group);
        })
      });
      
      observer.observe(formPage3, {
        childList: true,
      });
}


function createGroupsByTitles(parent) {
    if(!parent) return;

    let count = 0;
    let elements = [];

    let titles = parent.querySelectorAll('.wpforms-field .form-header-h4');
    if(titles.length) {
        for(let i = 0; i < titles.length; i++) {
            elements.push([]);
        }
    }


    parent.children.forEach(item => {
        if(item.classList.contains('wpforms-field-pagebreak')) return;

        let title = item.querySelector('.form-header-h4');
        if(title) {
            item.style.display = 'none';
            count++;
            if(!!count) {
                elements[count-1].push(item);
            }
        } else {
            if(!!count) {
                elements[count-1].push(item);
            }
        }
    })

    elements.forEach((group, index) => {
        let fieldsetBox = document.createElement('fieldset');
        let legend = document.createElement('legend');
        legend.innerText = titles[index].innerText;

        fieldsetBox.append(legend);
        group[0].before(fieldsetBox);
        fieldsetBox.append(...group);
    })
}




let nicknameWrap = document.querySelector('.nickname-class');
let emailWrap = document.querySelector('.email-class');
if(nicknameWrap && emailWrap) {
    nicknameWrap.style.display = 'none';

    let nicknameInput = nicknameWrap.querySelector('input');
    let emailInput = emailWrap.querySelector('input');

    emailInput.addEventListener('input', (e) => {
        nicknameInput.value = e.target.value;
    })
}


function showHideGroupFieldGyCheckbox(checkbox, elements) {
    if(checkbox.checked) {
        elements.forEach(el => {
            el.style.display = 'none';
        })
    } else {
        elements.forEach(el => {
            el.style.display = 'block';
        })
    }

    checkbox.addEventListener('change', (e) => {
        if(e.target.checked) {
            elements.forEach(el => {
                el.style.display = 'none';
            })
        } else {
            elements.forEach(el => {
                el.style.display = 'block';
            })
        }
    })
}

let checkbox1 = document.querySelector('.checkbox-group-1 input[type="checkbox"]');
let groupField1 = document.querySelectorAll('.group-field-1');
if(checkbox1 && groupField1.length) {
    showHideGroupFieldGyCheckbox(checkbox1, groupField1);
}
let checkbox2 = document.querySelector('.checkbox-group-2 input[type="checkbox"]');
let groupField2 = document.querySelectorAll('.group-field-2');
if(checkbox2 && groupField2.length) {
    showHideGroupFieldGyCheckbox(checkbox2, groupField2);
}



let btnSubmit = document.querySelector('#wpforms-submit-525');
if(btnSubmit) {
    let hero = document.querySelector('.hero');
    btnSubmit.addEventListener('click', () => {
        window.scrollTo({
            top: hero ? hero.clientHeight : 0,
            behavior: 'smooth',
        })
    })
}


let page3Previews = document.querySelector('#wpforms-525-field_5-container');
let submitContainer = document.querySelector('.wpforms-submit-container');
if(submitContainer && page3Previews) {
    page3Previews.before(submitContainer);
}


let pagination = document.querySelector('.wpforms-form .wpforms-page-indicator');
let formPage1ButtonContainer = document.querySelector('#wpforms-525-field_3-container .wpforms-pagebreak-left');
let formPage2ButtonContainer = document.querySelector('#wpforms-525-field_6-container .wpforms-pagebreak-left');
let formPage3ButtonContainer = document.querySelector('#wpforms-525-field_5-container .wpforms-pagebreak-left');
if(pagination) {
    let clonePagination1 = pagination.cloneNode(true);
    let clonePagination2 = pagination.cloneNode(true);
    let clonePagination3 = pagination.cloneNode(true);

    if(formPage1ButtonContainer) {
        formPage1ButtonContainer.prepend(clonePagination1);
    }
    if(formPage2ButtonContainer) {
        formPage2ButtonContainer.prepend(clonePagination2);
    }
    if(formPage3ButtonContainer) {
        formPage3ButtonContainer.prepend(clonePagination3);
    }
}




// add mask ===========
let inputs = document.querySelectorAll('#wpforms-form-525 input[type="tel"]');
inputs_init(inputs);

function inputs_init(inputs) {
	if (inputs.length > 0) {
		for (let index = 0; index < inputs.length; index++) {
			const input = inputs[index];
			if (input) {
				//'+7(999) 999 9999'
				//'+38(999) 999 9999'
				//'+375(99)999-99-99'
				input.classList.add('_mask');
				Inputmask('+9{*}', {
					//"placeholder": '',
					clearIncomplete: true,
					clearMaskOnLostFocus: true,
					onincomplete: function () {
						//input_clear_mask(input, input_g_value);
					}
				}).mask(input);
			}
		}
	}
}


let coordinateInputs = document.querySelectorAll('.coordinate-input input');
if(coordinateInputs.length) {
    coordinateInputs.forEach(input => {
        Inputmask('9{*}[.]9{*}', {
            clearIncomplete: true,
            clearMaskOnLostFocus: true,
        }).mask(input);
    })
}

let sizeInput = document.querySelector('.size-mask input');
if(sizeInput) {
    sizeInput.setAttribute('type', 'text');
    Inputmask('9.99', {
        clearIncomplete: true,
        clearMaskOnLostFocus: true,
    }).mask(sizeInput);
}

let grundstucksummerInput = document.querySelector('.grundstucksummer-mask input');
if(grundstucksummerInput) {
    Inputmask({ regex: String.raw `[0-9!#$%&'*+/=?^_{|}~\\-]*` }, {
        clearIncomplete: true,
        clearMaskOnLostFocus: true,
    }).mask(grundstucksummerInput);
}


let strasseInput = document.querySelector('.strasse-mask input');
if(strasseInput) {
    Inputmask('a{*}', {
        clearIncomplete: true,
        clearMaskOnLostFocus: true,
    }).mask(strasseInput);
}

let ortInput = document.querySelector('.ort-mask input');
if(ortInput) {
    Inputmask({ regex: String.raw `[.A-Za-z\s'/_|\\-]*` }, {
        clearIncomplete: true,
        clearMaskOnLostFocus: true,
    }).mask(ortInput);
}




// form page 3 checkbox handlers ==============
let agreementCheckbox = document.querySelector('#wpforms-525-field_74_1');
let buttonSubmit = document.querySelector('#wpforms-submit-525');
if(agreementCheckbox && buttonSubmit) {
    if(!agreementCheckbox.checked) {
        buttonSubmit.setAttribute('disabled', '');
    }

    agreementCheckbox.addEventListener('change', (e) => {
        if(e.target.checked) {
            buttonSubmit.removeAttribute('disabled');
        } else {
            buttonSubmit.setAttribute('disabled', '');
        }
    })
}


// form,  add clicable to circle pagination ==============
let formPages = document.querySelectorAll('#wpforms-form-525 .wpforms-page');
if(formPages.length) {
    let allCirclePagination = document.querySelectorAll('#wpforms-form-525 .wpforms-page-indicator.circles');
    if(allCirclePagination.length) {
        allCirclePagination.forEach(pagin => {
            Array.from(pagin.children).forEach(circle => {
                circle.addEventListener('click', () => {
                    if(circle.classList.contains('wpforms-page-indicator-page-1')) {
                        allCirclePagination.forEach(p => {
                            Array.from(p.children).forEach(c => {
                                if(c.classList.contains('wpforms-page-indicator-page-1')) {
                                    c.classList.add('active');
                                } else {
                                    c.classList.remove('active');
                                }
                            })
                        })

                        formPages.forEach(page => {
                            if(page.classList.contains('wpforms-page-1')) {
                                page.style.display = 'block';
                            } else {
                                page.style.display = 'none';
                            }
                        })
                    } else if(circle.classList.contains('wpforms-page-indicator-page-2')) {
                        allCirclePagination.forEach(p => {
                            Array.from(p.children).forEach(c => {
                                if(c.classList.contains('wpforms-page-indicator-page-2')) {
                                    c.classList.add('active');
                                } else {
                                    c.classList.remove('active');
                                }
                            })
                        })
                        formPages.forEach(page => {
                            if(page.classList.contains('wpforms-page-2')) {
                                page.style.display = 'block';
                            } else {
                                page.style.display = 'none';
                            }
                        })
                    } else if(circle.classList.contains('wpforms-page-indicator-page-3')) {
                        allCirclePagination.forEach(p => {
                            Array.from(p.children).forEach(c => {
                                if(c.classList.contains('wpforms-page-indicator-page-3')) {
                                    c.classList.add('active');
                                } else {
                                    c.classList.remove('active');
                                }
                            })
                        })
                        formPages.forEach(page => {
                            if(page.classList.contains('wpforms-page-3')) {
                                page.style.display = 'block';
                            } else {
                                page.style.display = 'none';
                            }
                        })
                    }
                })
            })
        })
    }
}



// smooth scroll
let headeLogoutIcon = document.querySelector('.header__logout-icon');
if(headeLogoutIcon) {
    headeLogoutIcon.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    })
}
	// ==== Popup form handler====

const popupLinks = document.querySelectorAll('[data-popup="open-popup"]');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('[data-popup="lock-padding"]');

let unlock = true;

const timeout = 800;

if(popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener('click', function(e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		});
	}
}


const popupCloseIcon = document.querySelectorAll('[data-popup="close-popup"]');
if(popupCloseIcon.length > 0) {
	for(let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function(e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupOpen(curentPopup) {
	if(curentPopup && unlock) {
		const popupActive = document.querySelector('.popup.popup--open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add('popup--open');
		curentPopup.addEventListener('click', function(e) {
			if(!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup')); 
			}
		});

	}
}

function popupClose(popupActive, doUnlock = true) {
	if(unlock) {
		popupActive.classList.remove('popup--open');
		if(doUnlock) {
			bodyUnlock();
		}
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('body').offsetWidth + 'px';
	let targetPadding = document.querySelectorAll('[data-popup="add-right-padding"]');
	if(targetPadding.length) {
		for (let index = 0; index < targetPadding.length; index++) {
			const el = targetPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}

	if(lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}

	body.style.paddingRight = lockPaddingValue;
	body.classList.add('overflow-hidden');

	unlock = false;
	setTimeout(function() {
		unlock = true;
	}, timeout);
}

function bodyUnlock() {
	let targetPadding = document.querySelectorAll('[data-popup="add-right-padding"]');

	setTimeout(function() {
		if(targetPadding.length) {
			for (let index = 0; index < targetPadding.length; index++) {
				const el = targetPadding[index];
				el.style.paddingRight = '0px';
			}
		}

		for( let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = '0px';
		}

		body.style.paddingRight = '0px';
		body.classList.remove('overflow-hidden');
	}, timeout);

	unlock = false;
	setTimeout(function() { 
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function(e) {
	if(e.which === 27) {
		const popupActive = document.querySelector('.popup.popup--open');
		popupClose(popupActive);
	}
});

// === Polyfill ===
	(function() {
		if(!Element.prototype.closest) {
			Element.prototype.closest = function(css) {
				var node = this;
				while(node) {
					if(node.matches(css)) return node;
					else node == node.parentElement;
				}
				return null;
			};
		}
	})();

	(function() {
		if(!Element.prototype.matches) {
			Element.prototype.matches = Element.prototype.matchesSelector ||
				Element.prototype.webkitMatchesSelector ||
				Element.prototype.mozMatchesSelector ||
				Element.prototype.mozMatchesSelector;
		}
	})();
// === AND Polyfill ===

// добавление API попапа в глобалную видимость
window.popup = {
	open(id) {
		if (!id) return;

		let popup = document.querySelector(id);

		if (!popup) return;

		popupOpen(popup);
	},
	close(id) {
		if (!id) return;

		let popup = document.querySelector(id);

		if (!popup) return;

		popupClose(popup);
	}
}


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

	{
    let promoBg = document.querySelector('.promo__bg');
    if(promoBg) {
        const setBgWidth = () => {
            let width = ((promoBg.clientHeight + 100) / 100 * 177.77);
            if(width > document.documentElement.clientWidth) {
                promoBg.style.width = width + 'px';
                promoBg.style.height = 'calc(100% + 100px)';
            } else {
                promoBg.style.width = 'calc(100% + 100px)';
                promoBg.style.height = (document.documentElement.clientWidth / 100 * 56.25) + 'px';
            }
        }

        setBgWidth();
       window.addEventListener('resize', setBgWidth);
    }

    let promoTitle = document.querySelector('.promo__title');
    if(promoTitle) {
        let items = promoTitle.querySelectorAll('strong');
        if(items.length) {
            items.forEach(item => {
                item.innerHTML = item.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
            })
        } else {
            promoTitle.innerHTML = promoTitle.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
        }
    }

    let home = document.querySelector('.home-page');
    if(home) {
        let anim1 = anime.timeline({
            easing: 'easeInOutQuad',
            autoplay: false,
        })
        .add({
            targets: '.header__logo',
            translateY: ['-100%', '0%'],
            opacity: [0, 1],
            duration: 600,
            delay: 800,
        })
        .add({
            targets:['.header__burger', '.header__logout'],
            opacity: [0, 1],
            translateY: ['-100%', '0%'],
            delay: (el, i) => 200 * i,
            duration: 400,
        }, '-=200')
        .add({
            targets: '.promo__title .letter',
            opacity: [0, 1],
            translateX: ['-30%', '0%'],
            easing: 'easeInOutQuad',
            duration: 700,
            delay: (el, i) => 30 * (i + 1),
            autoplay: false,
        }, '-=100');

        let anim2 = anime.timeline({
            easing: 'easeInOutQuad',
            autoplay: false,
        })
        .add({
            targets: '.promo-bg',
            scale: [1.1, 1],
            duration: 2000,
            delay: 0,
        })

        let anim3 = anime.timeline({
            easing: 'easeInOutQuad',
            autoplay: false,
        })
        .add({
            targets: '.promo-bg__layer-1 img',
            translateY: ['50px', '0px'],
            duration: 2000,
            delay: 0,
        }).add({
            targets: ['.promo-bg__layer-3 > img', '.promo-bg__dec-1 img', '.promo-bg__dec-2 img', '.promo-bg__dec-3 img', '.promo-bg__dec-4 img', '.promo-bg__dec-5 img',],
            translateY: ['50px', '0px'],
            duration: 2000,
            delay: 0,
        }, '-=1000').add({
            targets: '.promo-bg__layer-2 img',
            translateY: ['50px', '0px'],
            duration: 2000,
            delay: 0,
        }, '-=1500')

        window.addEventListener('load', function () {
            anim1.play();
            anim2.play();
            anim3.play();
        })
    }

    let bottomArrow = document.querySelector('.promo__bottom-arrow');
    if(bottomArrow) {
        let nextEl = bottomArrow.closest('.promo').nextElementSibling;
        bottomArrow.addEventListener('click', () => {
            window.scrollTo({
                top: nextEl.offsetTop,
                behavior: 'smooth',
            })
        })
    }
};

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

