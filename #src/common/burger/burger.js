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
}