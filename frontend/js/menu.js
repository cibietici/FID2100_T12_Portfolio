export default function handleHamburger() {
    const hamburgerIconEl = document.querySelector('.mobile-menu-icon');
    const overlayMenuEl = document.querySelector('.overlay-menu');
    const exitMenuEl = document.querySelector('.close');

    hamburgerIconEl.addEventListener('click', (event) => {
        event.preventDefault();
        overlayMenuEl.classList.remove('hidden');
    });
    exitMenuEl.addEventListener('click', (event) => {
        event.preventDefault();
        overlayMenuEl.classList.add('hidden');
    });
  }