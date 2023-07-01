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

  /** nabvar menu */
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


/**button scroll up */
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

/**validacion de formulario */

document.addEventListener('DOMContentLoaded', function() {
  let form = document.getElementById('contact-form');

  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe de forma predeterminada

    let minLength = 2;
    let maxLength = 30;
    let maxLengthMessage = 250;
    let correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let specialCharsRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    // Aquí puedes acceder a los elementos del formulario y realizar las acciones necesarias, como validaciones o envío de datos al servidor

    // Ejemplo de acceso a los elementos del formulario
    let nameInput = form.elements['name'];
    let emailInput = form.elements['email'];
    let messageInput = form.elements['message'];
    let name = nameInput.value;
    let email = emailInput.value;
    let message = messageInput.value;
    email = email.trim();

    /**validaciones */
    if(name == "" || email == "" || message == ""){
      mostrarError("Todos los campos son requeridos.");
      return false;
    }
    if(name < minLength || name >maxLength){
      mostrarError("El nombre debe tener minimo 2 y maximo 30 caracteres.");
      return false;
    }else if(specialCharsRegex.test(name)){
      mostrarError("El nombre no debe contener caracteres especiales.");
      return false;
    }

    if (!correoRegex.test(email)) {
      mostrarError('El correo electrónico no es válido.');
      return false;
    }

    if(message > maxLengthMessage){
      mostrarError('La descripción debe ser menor a 250 caracteres');
      return false;
    }

    emailjs.sendForm('service_v7v56yb', 'template_e8hahyd', "#contact-form", '4SEvjyy1v7aJnSu6T')
    .then(function(response) {
      swal("Correcto!", "El correo se envio correctamente", "success");
    }, function(error) {
       console.log('FAILED...', error);
    });
  });
});

function mostrarError(mensaje) {
  swal("¡Atención!", mensaje, "info");
}