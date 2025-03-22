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

    // Légumes
    { name: "🥕 Carotte", price: 300, category: "legume" },
    { name: "🥒 Concombre", price: 250, category: "legume" },
    { name: "🥬 Épinard", price: 300, category: "legume" },
    { name: "🥦 Brocoli", price: 400, category: "legume" },
    { name: "🥬 Kale", price: 500, category: "legume" },
    { name: "🥗 Roquette", price: 400, category: "legume" },
    { name: "🥒 Courgette", price: 350, category: "legume" },
    { name: "🌶 Poivron rouge", price: 300, category: "legume" },
    { name: "🌶 Poivron jaune", price: 300, category: "legume" },
    { name: "🌶 Poivron vert", price: 300, category: "legume" },
    { name: "🥬 Chou vert", price: 350, category: "legume" },
    { name: "🥬 Chou rouge", price: 350, category: "legume" },
    { name: "🥒 Céleri", price: 250, category: "legume" },
    { name: "🧄 Ail", price: 100, category: "legume" },
    { name: "🧅 Oignon", price: 150, category: "legume" },
    { name: "🌱 Cresson", price: 400, category: "legume" },
    { name: "🥔 Patate douce", price: 350, category: "legume" },
    { name: "🍠 Betterave", price: 400, category: "legume" },

    // Racines et compléments
    { name: "🫚 Gingembre", price: 300, category: "racine" },
    { name: "🟠 Curcuma", price: 300, category: "racine" },
    { name: "🌱 Moringa", price: 500, category: "complement" },
    { name: "🌿 Spiruline", price: 300, category: "complement" },
    { name: "🍃 Chlorelle", price: 350, category: "complement" },
    { name: "🍵 Matcha", price: 600, category: "complement" },
    { name: "🌾 Herbe de blé", price: 500, category: "complement" },

    // Graines et noix
    { name: "🌰 Chia", price: 500, category: "graine" },
    { name: "🌻 Graines de tournesol", price: 400, category: "graine" },
    { name: "🎃 Graines de courge", price: 450, category: "graine" },
    { name: "🥜 Amandes", price: 700, category: "noix" },
    { name: "🥜 Noisettes", price: 750, category: "noix" },
    { name: "🥜 Noix de cajou", price: 800, category: "noix" },
    { name: "🌰 Noix du Brésil", price: 850, category: "noix" },

    // Autres super-aliments
    { name: "🍯 Miel", price: 600, category: "sucrant" },
    { name: "🍁 Sirop d'érable", price: 700, category: "sucrant" },
    { name: "🥥 Lait de coco", price: 500, category: "lait" },
    { name: "🥛 Lait d’amande", price: 600, category: "lait" },
    { name: "🥛 Lait de soja", price: 550, category: "lait" },
    { name: "🥛 Lait de noisette", price: 650, category: "lait" },
    { name: "🥤 Protéines végétales", price: 800, category: "complement" },
    { name: "🍫 Cacao cru", price: 700, category: "complement" },
    { name: "🥥 Beurre de coco", price: 750, category: "complement" },
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ...orderData,
            ingredients: Array.from(selectedIngredients).map(card => card.textContent.trim()),
        }),
    });

    if (!response.ok) {
        throw new Error('Erreur lors de la sauvegarde de la commande.');
    }
}

// Afficher le résumé de la commande
function showOrderSummary(orderData) {
    const summary = document.getElementById('orderSummary');
    summary.innerHTML = `
        <h3>🎉 Commande confirmée !</h3>
        <p>Montant : ${orderData.amount} CFA</p>
        <p>Email : ${orderData.email}</p>
    `;
    summary.classList.remove('hidden');
}

// Réinitialiser le formulaire
function resetForm() {
    document.getElementById('orderForm').reset();
    selectedIngredients.forEach(card => card.classList.remove('selected'));
    selectedIngredients.clear();
    totalPrice = 0;
    updatePriceDisplay();
    checkValidation();
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    setupBanner();
    setupIngredients();
    setupOrderForm();
    document.getElementById('searchBar').addEventListener('input', (e) => {
        displaySearchResults(e.target.value);
    });
});