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