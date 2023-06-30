window.addEventListener('scroll', function() {
    var navbar = document.getElementById('navbar');
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
    if (scrollTop > 100) { // Cambia este valor para ajustar el punto en el que se vuelve transparente
      navbar.classList.add('transparent');
    } else {
      navbar.classList.remove('transparent');
    }
});

/**agregar el active */
var navbarItems = document.querySelectorAll('.navbar-nav li a');
navbarItems.forEach(function(item) {
    item.addEventListener('click', function(event) {
      event.preventDefault();
  
      // Remover la clase "active" de todos los elementos
      navbarItems.forEach(function(item) {
        item.classList.remove('active');
      });
  
      // Agregar la clase "active" al elemento seleccionado
      item.classList.add('active');

        var target = document.querySelector(item.getAttribute('href'));
        target.scrollIntoView({
        behavior: 'smooth'
        });
    });
  });

  function toggleMenu() {
    var navbarMenu = document.getElementById("navbarMenu");
    navbarMenu.classList.toggle("open");
  }
window.addEventListener('scroll', function() {
  var scrollButton = document.querySelector('.scroll-up');
  if (window.scrollY > 300) {
    scrollButton.style.display = 'block';
  } else {
    scrollButton.style.display = 'none';
  }
});

document.querySelector('.scroll-up').addEventListener('click', function(e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
  