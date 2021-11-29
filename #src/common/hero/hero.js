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
}