// Script pour la page réalisations
document.addEventListener('DOMContentLoaded', function() {
  // Variables
  const projectCards = document.querySelectorAll('.project-card');
  const loadMoreButton = document.getElementById('load-more');
  
  // Configuration de pagination
  const cardsPerPage = 4;
  let currentPage = 1;
  const totalPages = Math.ceil(projectCards.length / cardsPerPage);
  
  // Initialisation : masquer les projets au-delà de la première page
  projectCards.forEach((card, index) => {
      if (index >= cardsPerPage) {
          card.style.display = 'none';
      }
      // Ajouter une classe visible pour les animations d'entrée
      setTimeout(() => {
          card.classList.add('visible');
      }, 100 * (index % cardsPerPage));
  });
  
  // Mettre à jour l'affichage du bouton de chargement en fonction des pages restantes
  function updateLoadMoreButton() {
      if (currentPage >= totalPages) {
          loadMoreButton.style.display = 'none';
      } else {
          loadMoreButton.style.display = 'flex';
      }
  }
  
  // Initialiser l'état du bouton
  updateLoadMoreButton();
  
  // Gérer le chargement de plus de projets
  loadMoreButton.addEventListener('click', function() {
      loadMoreButton.classList.add('loading');
      
      // Simuler un délai de chargement
      setTimeout(() => {
          const startIndex = currentPage * cardsPerPage;
          const endIndex = Math.min(startIndex + cardsPerPage, projectCards.length);
          
          // Afficher les projets de la page suivante
          for (let i = startIndex; i < endIndex; i++) {
              projectCards[i].style.display = 'flex';
              // Animation d'apparition
              setTimeout(() => {
                  projectCards[i].classList.add('visible');
              }, 100 * (i % cardsPerPage));
          }
          
          currentPage++;
          updateLoadMoreButton();
          loadMoreButton.classList.remove('loading');
      }, 800); // Délai simulé de 800ms
  });
  
  // Vérifier et supprimer les boutons "Voir plus" en double
  const projectFooters = document.querySelectorAll('.project-footer');
  projectFooters.forEach(footer => {
      const buttons = footer.querySelectorAll('.btn-toggle-details');
      if (buttons.length > 1) {
          // Supprimer les boutons supplémentaires, garder seulement le premier
          for (let i = 1; i < buttons.length; i++) {
              buttons[i].remove();
          }
      }
  });
  
  // Gérer l'ouverture/fermeture des cartes de projet
  const toggleButtons = document.querySelectorAll('.btn-toggle-details');
  
  toggleButtons.forEach(button => {
      button.addEventListener('click', function() {
          // Trouver la carte de projet parente
          const projectCard = this.closest('.project-card');
          
          // Basculer la classe "open"
          projectCard.classList.toggle('open');
          
          // Animation fluide
          if (projectCard.classList.contains('open')) {
              // Faire défiler vers la carte si elle est ouverte
              setTimeout(() => {
                  projectCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }, 300);
          }
      });
  });
  
  // Animation au défilement pour les cartes de projet
  function isElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
  }
  
  function handleScrollAnimation() {
      projectCards.forEach(card => {
          if (isElementInViewport(card) && card.style.display !== 'none') {
              card.classList.add('visible');
          }
      });
  }
  
  // Exécuter une fois au chargement
  handleScrollAnimation();
  
  // Puis à chaque défilement
  window.addEventListener('scroll', handleScrollAnimation);
});