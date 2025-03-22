// Sauvegarde des recettes
document.getElementById('save-recipe').addEventListener('click', function () {
    const fruits = Array.from(document.getElementById('fruits').selectedOptions).map(opt => opt.value);
    const supplements = Array.from(document.getElementById('supplements').selectedOptions).map(opt => opt.value);

    const recipe = {
        fruits: fruits,
        supplements: supplements
    };

    // Sauvegarde dans le localStorage
    let savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
    savedRecipes.push(recipe);
    localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));

    // Affichage des recettes sauvegardées
    displayRecipes();
});

function displayRecipes() {
    const recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = '';
    const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];

    savedRecipes.forEach((recipe, index) => {
        const li = document.createElement('li');
        li.textContent = `Recette ${index + 1}: ${recipe.fruits.join(', ')} + ${recipe.supplements.join(', ')}`;
        recipeList.appendChild(li);
    });
}

// Affichage initial des recettes
displayRecipes();


// Carte interactive (utilisez une API comme Leaflet ou Google Maps)
const map = L.map('map').setView([48.8566, 2.3522], 13); // Coordonnées de Paris
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Suivi de commande
document.getElementById('scan-qr').addEventListener('click', function () {
    alert("Scannez le QR Code sur votre emballage pour suivre votre commande.");
});


// Base de données des ingrédients
const ingredients = [
    // Fruits
    { name: "🍌 Banane", price: 200, category: "fruit" },
    { name: "🍓 Fraise", price: 500, category: "fruit" },
    { name: "🥭 Mangue", price: 300, category: "fruit" },
    { name: "🥥 Noix de coco", price: 400, category: "fruit" },
    { name: "🍍 Ananas", price: 200, category: "fruit" },
    { name: "🍏 Pomme verte", price: 500, category: "fruit" },
    { name: "🥝 Kiwi", price: 600, category: "fruit" },
    { name: "🍑 Pêche", price: 500, category: "fruit" },
    { name: "🍇 Raisin", price: 500, category: "fruit" },
    { name: "🍉 Pastèque", price: 500, category: "fruit" },
    { name: "🍊 Orange", price: 300, category: "fruit" },
    { name: "🍋 Citron", price: 250, category: "fruit" },
    { name: "🍈 Melon", price: 450, category: "fruit" },
    { name: "🍒 Cerise", price: 700, category: "fruit" },
    { name: "🍐 Poire", price: 400, category: "fruit" },
    { name: "🍏 Pomme rouge", price: 500, category: "fruit" },
    { name: "🍉 Grenade", price: 600, category: "fruit" },
    { name: "🥑 Avocat", price: 700, category: "fruit" },
    { name: "🥥 Açaï", price: 500, category: "fruit" },
    { name: "🍈 Fruit de la passion", price: 600, category: "fruit" },
    { name: "🍉 Baies de Goji", price: 600, category: "fruit" },
    { name: "🫐 Myrtille", price: 700, category: "fruit" },
    { name: "🍓 Framboise", price: 650, category: "fruit" },
    { name: "🍑 Nectarine", price: 550, category: "fruit" },
    { name: "🥭 Papaye", price: 400, category: "fruit" },
    { name: "🥥 Litchi", price: 600, category: "fruit" },
    { name: "🍊 Clémentine", price: 350, category: "fruit" },
    { name: "🍋 Lime", price: 300, category: "fruit" },
    { name: "🍌 Plantain", price: 250, category: "fruit" },
    { name: "🍏 Kaki", price: 600, category: "fruit" },

    // Légumes (idem pour les autres catégories)
];

// Variables globales
let totalPrice = 0;
const selectedIngredients = new Set();
const FLW_PUBLIC_KEY = 'VOTRE_CLE_PUBLIQUE_FLUTTERWAVE';
const BACKEND_URL = 'http://localhost:3000';

// Fonction de recherche
function searchIngredients(query) {
    query = query.toLowerCase();
    return ingredients.filter(ingredient =>
        ingredient.name.toLowerCase().includes(query)
    );
}

// Afficher les résultats de la recherche
function displaySearchResults(query) {
    const results = searchIngredients(query);
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = results.length > 0
        ? results.map(ingredient => `<li>${ingredient.name} - ${ingredient.price} CFA</li>`).join('')
        : '<li>Aucun résultat trouvé.</li>';
}

// Gestion de la sélection des ingrédients
function setupIngredients() {
    document.querySelectorAll('.ingredient-card').forEach(card => {
        card.addEventListener('click', () => {
            const price = parseInt(card.dataset.price);
            if (selectedIngredients.has(card)) {
                card.classList.remove('selected');
                selectedIngredients.delete(card);
                totalPrice -= price;
            } else {
                card.classList.add('selected');
                selectedIngredients.add(card);
                totalPrice += price;
            }
            updatePriceDisplay();
            checkValidation();
        });
    });
}

// Mettre à jour l'affichage du prix
function updatePriceDisplay() {
    document.getElementById('total-price').textContent = totalPrice;
}

// Vérifier la validation (au moins 4 ingrédients)
function checkValidation() {
    const validationMsg = document.getElementById('validationMsg');
    validationMsg.style.display = selectedIngredients.size < 4 ? 'block' : 'none';
}

// Gestion de la bannière
function setupBanner() {
    const bannerImages = document.querySelectorAll('.promo-banner img');
    let currentBannerIndex = 0;

    function cycleBanner() {
        bannerImages[currentBannerIndex].classList.remove('active');
        currentBannerIndex = (currentBannerIndex + 1) % bannerImages.length;
        bannerImages[currentBannerIndex].classList.add('active');
    }

    setInterval(cycleBanner, 5000);
}

// Gestion du formulaire de commande
function setupOrderForm() {
    document.getElementById('orderForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const clientName = document.getElementById('clientName').value;
        const clientEmail = document.getElementById('clientEmail').value;
        const clientPhone = document.getElementById('clientPhone').value;
        const paymentMethod = document.querySelector('input[name="payment"]:checked');

        if (!paymentMethod || selectedIngredients.size < 4) {
            alert('Veuillez compléter tous les champs et sélectionner 4 ingrédients.');
            return;
        }

        try {
            document.querySelector('.payment-processing').classList.remove('hidden');
            await processPayment({
                name: clientName,
                email: clientEmail,
                phone: clientPhone,
                amount: totalPrice,
                method: paymentMethod.value,
            });
        } catch (error) {
            console.error('Erreur lors du traitement de la commande :', error);
            alert('Une erreur est survenue lors du traitement de la commande.');
        } finally {
            document.querySelector('.payment-processing').classList.add('hidden');
        }
    });
}

// Traitement du paiement
async function processPayment(orderData) {
    return new Promise((resolve, reject) => {
        FlutterwaveCheckout({
            public_key: FLW_PUBLIC_KEY,
            tx_ref: `CMD-${Date.now()}`,
            amount: orderData.amount,
            currency: 'XOF',
            payment_options: orderData.method === 'mobile' ? 'mobilemoney' : 'card',
            customer: {
                email: orderData.email,
                name: orderData.name,
                phone_number: orderData.phone,
            },
            callback: async (response) => {
                if (response.status === 'successful') {
                    try {
                        await saveOrderToDatabase(orderData);
                        showOrderSummary(orderData);
                        resetForm();
                        resolve();
                    } catch (error) {
                        reject(error);
                    }
                } else {
                    reject(new Error('Paiement échoué'));
                }
            },
        });
    });
}

// Sauvegarder la commande dans la base de données
async function saveOrderToDatabase(orderData) {
    const response = await fetch(`${BACKEND_URL}/orders`, {
        method: 'POST',
        body: JSON.stringify(orderData),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Erreur lors de l\'enregistrement de la commande.');
    }
    return await response.json();
}

// Affichage du résumé de la commande
function showOrderSummary(orderData) {
    const orderSummary = document.getElementById('order-summary');
    orderSummary.innerHTML = `
        <p>Nom: ${orderData.name}</p>
        <p>Email: ${orderData.email}</p>
        <p>Téléphone: ${orderData.phone}</p>
        <p>Montant payé: ${orderData.amount} CFA</p>
        <p>Ingrédients: ${Array.from(selectedIngredients).join(', ')}</p>
    `;
    orderSummary.classList.remove('hidden');
}

// Réinitialisation du formulaire
function resetForm() {
    document.getElementById('orderForm').reset();
    selectedIngredients.clear();
    totalPrice = 0;
    updatePriceDisplay();
    displayRecipes();
}

// Initialisation des fonctionnalités
setupIngredients();
setupBanner();
setupOrderForm();