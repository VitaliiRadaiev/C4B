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
}