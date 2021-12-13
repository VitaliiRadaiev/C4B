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
}