// Fonction pour activer/désactiver le menu
function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('active');
}

// Fonction pour sélectionner un fruit
function selectFruit(fruit) {
    const fruitElement = event.currentTarget;
    fruitElement.classList.toggle('selected');
    updateSelectedFruits(fruit);
}

// Fonction pour mettre à jour la liste des fruits sélectionnés
function updateSelectedFruits(fruit) {
    const list = document.getElementById('selected-fruits-list');
    const item = document.createElement('li');
    item.textContent = fruit;
    list.appendChild(item);
}

// Fonction pour passer une commande
function placeOrder() {
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    if (!name || !phone) {
        alert('Veuillez remplir tous les champs');
        return;
    }
    alert('Commande passée avec succès !');
}

// Fonction pour activer/désactiver le chatbot
function toggleChat() {
    const chatInterface = document.getElementById('chatbot-interface');
    chatInterface.style.display = chatInterface.style.display === 'block' ? 'none' : 'block';
}