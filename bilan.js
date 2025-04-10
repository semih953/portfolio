// Script pour la page bilan
document.addEventListener('DOMContentLoaded', function() {
    console.log("Page bilan chargée.");
    
    // Sélection des éléments à animer
    const competenceCards = document.querySelectorAll('.competence-card');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Fonction pour vérifier si un élément est visible dans la fenêtre
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Fonction pour ajouter la classe "visible" aux éléments visibles
    function handleScrollAnimation() {
        // Animation des cartes de compétences
        competenceCards.forEach(card => {
            if (isElementInViewport(card)) {
                card.classList.add('visible');
            }
        });
        
        // Animation des éléments de la timeline
        timelineItems.forEach(item => {
            if (isElementInViewport(item)) {
                item.classList.add('visible');
            }
        });
    }
    
    // Exécuter une fois au chargement pour les éléments visibles initialement
    handleScrollAnimation();
    
    // Ajouter un écouteur d'événement pour le défilement
    window.addEventListener('scroll', handleScrollAnimation);
    
    // Animation pour l'en-tête du bilan
    const bilanHeader = document.querySelector('.bilan-header');
    if (bilanHeader) {
        bilanHeader.classList.add('fade-in');
    }
    
    // Animation des titres de section
    const sectionTitles = document.querySelectorAll('section h3');
    sectionTitles.forEach((title, index) => {
        setTimeout(() => {
            if (index % 2 === 0) {
                title.classList.add('slide-in-left');
            } else {
                title.classList.add('slide-in-right');
            }
        }, 300 * index);
    });
});