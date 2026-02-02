function flipCard(card) {
    card.classList.toggle('is-flipped');

    const footer = document.querySelector('.card-footer');
    if (card.classList.contains('is-flipped')) {
        footer.classList.add('is-visible');
    } else {
        footer.classList.remove('is-visible');
    }
}