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
}