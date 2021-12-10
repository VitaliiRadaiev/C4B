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
