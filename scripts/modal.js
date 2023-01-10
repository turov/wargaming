const openModal = document.querySelector('#openModal');
const modal = document.querySelector('.modal');
const closeButton = modal.querySelector('.modal__close-button');

openModal.addEventListener('click', (event) => {
    event.preventDefault();
    modal.classList.add('modal--active');
});

closeButton.addEventListener('click', () => {
    modal.classList.remove('modal--active');
});
