// Script pour la page entreprise
document.addEventListener('DOMContentLoaded', function() {
    // Animation au défilement pour les cartes de mission
    const missionCards = document.querySelectorAll('.mission-card');
    const techIcons = document.querySelectorAll('.tech-icon');
    const companyProfile = document.querySelector('.company-profile');
    const jobCard = document.querySelector('.job-card');
    const testimonialCard = document.querySelector('.testimonial-card');
    
    // Fonction pour vérifier si un élément est visible dans la fenêtre
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Fonction pour ajouter une classe aux éléments visibles
    function handleScrollAnimation() {
        if (companyProfile && isElementInViewport(companyProfile)) {
            companyProfile.classList.add('fade-in');
        }
        
        if (jobCard && isElementInViewport(jobCard)) {
            jobCard.classList.add('slide-in');
        }
        
        missionCards.forEach(card => {
            if (isElementInViewport(card)) {
                card.classList.add('fade-in');
            }
        });
        
        techIcons.forEach((icon, index) => {
            if (isElementInViewport(icon)) {
                setTimeout(() => {
                    icon.classList.add('pop-in');
                }, 100 * index);
            }
        });
        
        if (testimonialCard && isElementInViewport(testimonialCard)) {
            testimonialCard.classList.add('fade-in');
        }
    }
    
    // Ajouter des classes CSS pour les animations
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            @keyframes slideIn {
                from { opacity: 0; transform: translateX(-30px); }
                to { opacity: 1; transform: translateX(0); }
            }
            
            @keyframes popIn {
                0% { opacity: 0; transform: scale(0.5); }
                70% { transform: scale(1.1); }
                100% { opacity: 1; transform: scale(1); }
            }
            
            .company-profile, .mission-card, .testimonial-card {
                opacity: 0;
            }
            
            .job-card {
                opacity: 0;
            }
            
            .tech-icon {
                opacity: 0;
            }
            
            .fade-in {
                animation: fadeIn 0.8s forwards;
            }
            
            .slide-in {
                animation: slideIn 0.8s forwards;
            }
            
            .pop-in {
                animation: popIn 0.5s forwards;
            }
        </style>
    `);
    
    // Exécuter une fois au chargement
    handleScrollAnimation();
    
    // Puis à chaque défilement
    window.addEventListener('scroll', handleScrollAnimation);
    
    // Animation du logo
    const logo = document.querySelector('.company-logo');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(5deg) scale(1.05)';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'rotate(0) scale(1)';
        });
    }
    
    // Compteur pour les statistiques (si on en ajoute plus tard)
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Si on ajoute des statistiques plus tard, on pourra utiliser cette fonction
    // Exemple: animateValue(document.getElementById('counter'), 0, 500, 2000);
    
    console.log("Page entreprise chargée avec des animations améliorées.");
});