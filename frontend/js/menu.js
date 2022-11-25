export default function handleHamburger() {
    const hamburgerIconEl = document.querySelector('.mobile-menu-icon');
    const overlayMenuEl = document.querySelector('.overlay-menu');
    const exitMenuEl = document.querySelector('.close');

    hamburgerIconEl.addEventListener('click', (e) => {
        e.preventDefault();
        overlayMenuEl.classList.remove('hidden');
    });
    exitMenuEl.addEventListener('click', (e) => {
        e.preventDefault();
        overlayMenuEl.classList.add('hidden');
    });
  }