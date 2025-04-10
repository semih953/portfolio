// Script pour la page veille
document.addEventListener('DOMContentLoaded', function() {
    // Sélection des éléments
    const articlesGrid = document.getElementById('articlesGrid');
    const articleCards = document.querySelectorAll('.article-card');
    const sortFilter = document.getElementById('sortFilter');
    const sourceFilter = document.getElementById('sourceFilter');
    const yearFilter = document.getElementById('yearFilter');
    const resetButton = document.getElementById('resetFilters');
    const articleCount = document.getElementById('articleCount');
    
    // Mettre à jour le compteur d'articles
    function updateArticleCount() {
        const visibleCards = document.querySelectorAll('.article-card:not(.hidden)');
        articleCount.textContent = `(${visibleCards.length} sur ${articleCards.length})`;
    }
    
    // Initialiser le compteur
    updateArticleCount();
    
    // Fonction pour le filtrage et le tri
    function applyFilters() {
        // Récupérer les valeurs des filtres
        const sortValue = sortFilter.value;
        const sourceValue = sourceFilter.value;
        const yearValue = yearFilter.value;
        
        // Variables pour vérifier si on a des résultats
        let hasResults = false;
        
        // Appliquer les filtres à chaque carte
        articleCards.forEach(card => {
            // Récupérer les données de la carte
            const cardDate = card.getAttribute('data-date');
            const cardSource = card.getAttribute('data-source');
            const cardYear = card.getAttribute('data-year');
            const cardNote = parseInt(card.getAttribute('data-note'));
            
            // Vérifier les filtres
            const sourceMatch = sourceValue === 'all' || cardSource === sourceValue;
            const yearMatch = yearValue === 'all' || cardYear === yearValue;
            
            // Appliquer les filtres combinés
            if (sourceMatch && yearMatch) {
                card.classList.remove('hidden');
                hasResults = true;
            } else {
                card.classList.add('hidden');
            }
        });
        
        // Vérifier s'il n'y a pas de résultats pour afficher un message
        const noResultsMessage = document.querySelector('.no-results');
        if (!hasResults) {
            if (!noResultsMessage) {
                const message = document.createElement('div');
                message.className = 'no-results';
                message.innerHTML = `
                    <i class="fas fa-search"></i>
                    <p>Aucun article ne correspond à ces critères.</p>
                    <p>Essayez de modifier vos filtres.</p>
                `;
                articlesGrid.appendChild(message);
            }
        } else {
            // Supprimer le message s'il existe
            if (noResultsMessage) {
                noResultsMessage.remove();
            }
            
            // Trier les cartes visibles
            sortCards(sortValue);
        }
        
        // Mettre à jour le compteur
        updateArticleCount();
    }
    
    // Fonction pour trier les cartes
    function sortCards(sortValue) {
        const cardsArray = Array.from(articleCards).filter(card => !card.classList.contains('hidden'));
        
        // Trier selon le critère sélectionné
        if (sortValue === 'date-desc') {
            cardsArray.sort((a, b) => {
                return new Date(b.getAttribute('data-date')) - new Date(a.getAttribute('data-date'));
            });
        } else if (sortValue === 'date-asc') {
            cardsArray.sort((a, b) => {
                return new Date(a.getAttribute('data-date')) - new Date(b.getAttribute('data-date'));
            });
        } else if (sortValue === 'note-desc') {
            cardsArray.sort((a, b) => {
                return parseInt(b.getAttribute('data-note')) - parseInt(a.getAttribute('data-note'));
            });
        }
        
        // Réorganiser les éléments dans la grille
        cardsArray.forEach(card => {
            articlesGrid.appendChild(card);
        });
    }
    
    // Événements pour les filtres
    sortFilter.addEventListener('change', applyFilters);
    sourceFilter.addEventListener('change', applyFilters);
    yearFilter.addEventListener('change', applyFilters);
    
    // Événement pour réinitialiser les filtres
    resetButton.addEventListener('click', function() {
        sortFilter.value = 'date-desc';
        sourceFilter.value = 'all';
        yearFilter.value = 'all';
        
        // Appliquer les filtres réinitialisés
        applyFilters();
    });
    
    // Trier les cartes par défaut (plus récentes d'abord)
    sortCards('date-desc');
    
    // Animation des cartes au défilement
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    function checkVisibility() {
        articleCards.forEach(card => {
            if (isInViewport(card) && !card.classList.contains('visible')) {
                card.classList.add('visible');
            }
        });
    }
    
    // Ajouter une classe pour les animations
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .article-card.visible {
                opacity: 1;
                transform: translateY(0);
            }
        </style>
    `);
    
    // Vérifier la visibilité au chargement et au défilement
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
    
    console.log("Page veille chargée avec filtres et animations");
});