// main.js

// Gestion du menu hamburger
const menuToggle = document.querySelector('#menu-toggle');
const navLinks = document.querySelector('#nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('hidden');
});

// Validation du formulaire
const form = document.querySelector('#order-form');
form.addEventListener('submit', (e) => {
    const nameInput = document.querySelector('#name');
    const phoneInput = document.querySelector('#phone');
    if (!nameInput.value.trim() || !phoneInput.value.trim()) {
        alert('Veuillez remplir tous les champs.');
        e.preventDefault();
    }
});

// Animation de sélection des fruits
const fruitButtons = document.querySelectorAll('.fruit-btn');
fruitButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.toggle('selected');
    });
});
