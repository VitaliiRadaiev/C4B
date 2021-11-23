{
    let header = document.querySelector('.header'); 
    if(header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('is-scroll', window.pageYOffset > 50);
        })

        
        let menu = document.querySelector('.menu');
        let burger = burgerHandler();


        burger.el.addEventListener('click', () => {
            const lockPaddingValue = window.innerWidth - document.querySelector('body').offsetWidth + 'px';
            console.log(lockPaddingValue);
            if(!menu.classList.contains('open')) {
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
    }
}
