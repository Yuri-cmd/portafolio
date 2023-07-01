window.addEventListener('scroll', function() {
    let navbar = document.getElementById('navbar');
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
    if (scrollTop > 100) { // Cambia este valor para ajustar el punto en el que se vuelve transparente
      navbar.classList.add('transparent');
    } else {
      navbar.classList.remove('transparent');
    }
});

/**agregar el active */
let navbarItems = document.querySelectorAll('.navbar-nav li a');
navbarItems.forEach(function(item) {
    item.addEventListener('click', function(event) {
      event.preventDefault();
  
      // Remover la clase "active" de todos los elementos
      navbarItems.forEach(function(item) {
        item.classList.remove('active');
      });
  
      // Agregar la clase "active" al elemento seleccionado
      item.classList.add('active');

        let target = document.querySelector(item.getAttribute('href'));
        target.scrollIntoView({
        behavior: 'smooth'
        });
    });
  });

  function toggleMenu() {
    let navbarMenu = document.getElementById("navbarMenu");
    navbarMenu.classList.toggle("open");
  }
  
  document.addEventListener('click', function(event) {
    var navbarCollapse = document.querySelector('.navbar-collapse');
    var navbarToggle = document.querySelector('.navbar-toggle');
    
    if (!navbarCollapse.contains(event.target) && event.target !== navbarToggle) {
      navbarCollapse.classList.remove('open');
    }
  });

window.addEventListener('scroll', function() {
  let scrollButton = document.querySelector('.scroll-up');
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


/**dark mode */
let toggleDarkModeButton = document.getElementById('toggleDarkMode');
let body = document.body;
let switchText = document.getElementById('switch-text');

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  body.classList.toggle('dark-mode');
  switchText.innerHTML = 'Modo light';
  toggleDarkModeButton.checked = true;
} else {
  switchText.innerHTML = 'Modo dark';
  toggleDarkModeButton.checked = false;
}
toggleDarkModeButton.addEventListener('change', function() {
  body.classList.toggle('dark-mode');
  if (toggleDarkModeButton.checked) {
    switchText.innerHTML = 'Modo light';
  } else {
    switchText.innerHTML = 'Modo dark';
  }
});