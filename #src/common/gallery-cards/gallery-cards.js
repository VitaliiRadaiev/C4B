{
    let galleryCardTextAll = document.querySelectorAll('.gallery-cards__text');
    if(galleryCardTextAll.length) {
        galleryCardTextAll.forEach(text => {
            if(text.closest('.big')) {
                trimString(text, 157);
            } else {
                trimString(text, 80);
            }
        })
    }
}