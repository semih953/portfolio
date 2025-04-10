// scripts.js

// Gestion de l'indicateur de la barre de navigation
const indicator = document.querySelector('.nav-indicator');
const items = document.querySelectorAll('.nav-item');

// Fonction pour gérer l'indicateur
function handleIndicator(el) {
  // Retirer la classe "is-active" de tous les éléments
  items.forEach(item => {
    item.classList.remove('is-active');
    item.removeAttribute('style');
  });

  // Récupérer les données de l'élément cliqué
  const elementColor = el.dataset.activeColor;

  // Styliser l'indicateur
  indicator.style.width = `${el.offsetWidth}px`;
  indicator.style.backgroundColor = elementColor;
  indicator.style.left = `${el.offsetLeft}px`;

  // Ajouter la classe "is-active" à l'élément cliqué
  el.classList.add('is-active');
  el.style.color = elementColor;
}

// Attacher l'événement de clic à chaque élément
items.forEach((item) => {
  item.addEventListener('click', e => {
    handleIndicator(e.target);
  });
  if (item.classList.contains('is-active')) {
    handleIndicator(item);
  }
});


