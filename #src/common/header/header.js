{
    let header = document.querySelector('.header'); 
    if(header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('is-scroll', window.pageYOffset > 50);
        })

        
        let menu = document.querySelector('.menu');
        let burger = document.querySelector('.header__burger');
        let btnClose = document.querySelector('.menu__close');

        burger.addEventListener('click', () => {
            menu.classList.add('open');
            document.body.classList.add('lock');
        })
        btnClose.addEventListener('click', () => {
            menu.classList.remove('open');
            document.body.classList.remove('lock');
        })
    }
}
